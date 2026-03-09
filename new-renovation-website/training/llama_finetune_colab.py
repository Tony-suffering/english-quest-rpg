"""
Llama 3.2 ファインチューニングスクリプト（Google Colab用）
タクミキャラクター学習用

使い方:
1. Google Colab で新規ノートブック作成
2. GPU ランタイムを選択（T4 無料）
3. このスクリプトをセルにコピペして実行
4. 訓練完了後、モデルを Hugging Face にアップロード
"""

# ===== セル1: 環境セットアップ =====
# Unsloth（高速ファインチューニングライブラリ）をインストール
!pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
!pip install --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes

# ===== セル2: データ準備 =====
from datasets import load_dataset
import json

# Google Colab にファイルをアップロードする
from google.colab import files
print("📤 takumi_training_data.jsonl をアップロードしてください")
uploaded = files.upload()

# データセット読み込み
dataset = load_dataset('json', data_files='takumi_training_data.jsonl', split='train')
print(f"✅ データセット読み込み完了: {len(dataset)} 件")

# ===== セル3: モデル読み込み =====
from unsloth import FastLanguageModel
import torch

max_seq_length = 2048  # タクミの応答は短いので2048で十分
dtype = None  # Auto detection
load_in_4bit = True  # 4bit量子化でメモリ節約

# Llama 3.2 3B モデル（軽量版）
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/Llama-3.2-3B-Instruct",  # 3B = 軽量、Colab T4 で動作
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)

print("✅ Llama 3.2 3B モデル読み込み完了")

# ===== セル4: LoRA設定 =====
# LoRA = Low-Rank Adaptation（効率的なファインチューニング手法）
model = FastLanguageModel.get_peft_model(
    model,
    r = 16,  # LoRA attention dimension
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj",
                      "gate_proj", "up_proj", "down_proj"],
    lora_alpha = 16,
    lora_dropout = 0,  # 0 = 最適化済み
    bias = "none",
    use_gradient_checkpointing = "unsloth",  # メモリ節約
    random_state = 3407,
    use_rslora = False,
    loftq_config = None,
)

print("✅ LoRA 設定完了")

# ===== セル5: データフォーマット変換 =====
def formatting_prompts_func(examples):
    """会話データをLlamaフォーマットに変換"""
    texts = []
    for messages in examples['messages']:
        text = tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=False
        )
        texts.append(text)
    return {"text": texts}

dataset = dataset.map(formatting_prompts_func, batched=True)
print("✅ データフォーマット変換完了")

# ===== セル6: トレーニング =====
from trl import SFTTrainer
from transformers import TrainingArguments

trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = max_seq_length,
    dataset_num_proc = 2,
    packing = False,  # タクミの応答は短いのでPackingなし
    args = TrainingArguments(
        per_device_train_batch_size = 2,  # バッチサイズ
        gradient_accumulation_steps = 4,  # 実効バッチ = 2*4=8
        warmup_steps = 5,
        num_train_epochs = 3,  # エポック数（3回で十分）
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(),
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit",
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 3407,
        output_dir = "outputs",
        save_strategy = "epoch",  # エポックごとに保存
    ),
)

print("🚀 トレーニング開始...")
trainer_stats = trainer.train()
print("✅ トレーニング完了！")

# ===== セル7: モデル保存（ローカル） =====
model.save_pretrained("takumi_llama_lora")
tokenizer.save_pretrained("takumi_llama_lora")
print("✅ モデルを takumi_llama_lora に保存しました")

# ===== セル8: Hugging Face にアップロード（オプション） =====
# Hugging Face にログインしてモデルを共有
# model.push_to_hub("your-username/takumi-llama-3.2-3b", token="hf_xxxxx")
# tokenizer.push_to_hub("your-username/takumi-llama-3.2-3b", token="hf_xxxxx")

# ===== セル9: テスト推論 =====
FastLanguageModel.for_inference(model)  # 推論モード

test_messages = [
    {"role": "system", "content": "あなたはイワサキ内装のAI職人「タクミ」です。"},
    {"role": "user", "content": "猫の爪研ぎで壁がボロボロです"}
]

inputs = tokenizer.apply_chat_template(
    test_messages,
    tokenize=True,
    add_generation_prompt=True,
    return_tensors="pt"
).to("cuda")

outputs = model.generate(
    input_ids=inputs,
    max_new_tokens=128,
    temperature=0.8,
    top_p=0.9,
    do_sample=True
)

response = tokenizer.decode(outputs[0], skip_special_tokens=True)
print("🤖 タクミの応答:")
print(response)

# ===== セル10: GGUF形式で保存（Ollama用） =====
# Ollamaで使うためにGGUF形式に変換
model.save_pretrained_gguf("takumi_llama_gguf", tokenizer, quantization_method="q4_k_m")
print("✅ GGUF形式で保存完了（Ollama用）")

# ダウンロード
from google.colab import files
!zip -r takumi_llama_gguf.zip takumi_llama_gguf
files.download('takumi_llama_gguf.zip')
print("📥 takumi_llama_gguf.zip をダウンロードしてください")
