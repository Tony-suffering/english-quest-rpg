# 居酒屋TOEIC -- シーン画像生成プロンプト

## 共通スタイルプロンプト (全画像に付与)

```
Warm-toned anime illustration, izakaya interior lighting, soft amber glow, cozy atmosphere. Semi-realistic manga style with detailed backgrounds. No text or speech bubbles.
```

## 出力設定

- Model: DALL-E 3
- Size: 1792x1024 (cinematic widescreen)
- Quality: standard
- Format: WebP (変換後)
- 保存先: `public/izakaya-scenes/ep-XXX/`

---

## Episode 1: ユキ、昇進がかかってる

### 1. opening.webp (story[0])
```
A narrow rain-soaked Tokyo alley at night. A small traditional izakaya with a warm glowing noren curtain hanging in the doorway. Puddles reflect the golden light from inside. The sign is wooden and weathered.
```

### 2. yuki-arrives.webp (story[2])
```
A young Japanese woman (28, professional attire slightly disheveled) sits alone at a wooden izakaya counter. She grips a beer glass with both hands, looking down. Behind the counter, an older man silently polishes a glass. The lighting is warm amber.
```

### 3. takeshi-entrance.webp (story[17])
```
A soaking wet young Japanese man (35, casual clothes, big grin) bursts through an izakaya door curtain. Water droplets fly everywhere. Two people at the counter look startled. Dynamic action pose, comedic energy.
```

### 4. kenji-arrives.webp (story[30])
```
A middle-aged Japanese man (45, construction company executive, tired face) quietly enters an izakaya. He sits at the far end of the counter, avoiding eye contact. The atmosphere is contemplative.
```

### 5. three-laugh.webp (story[41])
```
Three people sitting at an izakaya counter laugh together -- a young woman, an enthusiastic young man, and a quiet middle-aged man. The bartender behind the counter has the faintest smile. Warm golden lighting, a moment of genuine connection.
```

### 6. indirect-answer.webp (story[43])
```
A concept illustration split in two panels. Left panel: a direct arrow from question to answer (labeled DIRECT). Right panel: a curved, natural-flowing path from question to response (labeled INDIRECT). Izakaya aesthetic with wood textures and warm tones. Minimal, clean diagram style.
```

---

## キャラクターの外見リファレンス (全エピソード共通)

### マスター（権藤）58歳
```
A stoic Japanese man in his late 50s. Short gray hair, slightly weathered face. Wearing a traditional izakaya master outfit -- dark happi coat or simple dark shirt with sleeves rolled up. Calm, piercing eyes. Minimal expressions but carries wisdom. Behind an izakaya counter.
```

### ユキ 28歳
```
A young Japanese woman, 28 years old. Professional appearance but with edge -- sharp eyes, slightly messy hair from a long work day. Business casual attire. Expressive face that shifts between frustrated, determined, and vulnerable. Sits at izakaya counter.
```

### タケシ 35歳
```
A Japanese man, 35 years old, IT worker vibe. Slightly rumpled casual clothes, always grinning or animated. Round face, friendly eyes. The most expressive character -- hands always gesturing. Enthusiastic energy. Often soaking wet or disheveled.
```

### ケンジ 45歳
```
A Japanese man, 45 years old, construction company executive. Sturdy build, slightly graying at temples. Wears a suit but loosens his tie at the izakaya. Reserved demeanor, avoids eye contact. When he does smile, it's small but real.
```

### リサ 32歳
```
A Japanese woman, 32 years old, returnee (kikokushijo). Stylish, modern fashion. Confident posture. Foreign marketing company vibe. Sometimes shows frustration when her English advantage doesn't translate to TOEIC scores.
```

### ミナ 24歳
```
A young Japanese woman, 24 years old. Cute, slightly spacey expression. Casual clothes. Natural "airhead" vibe but surprisingly sharp when it comes to listening. Often tilts her head. The youngest regular at the izakaya.
```

---

## Episode 2-30 テンプレート

各エピソードに5-6枚のシーン画像を配置。パターン:

1. **オープニング** -- シーンの場面設定 (narration行に配置)
2. **キャラ登場** -- 新キャラが入ってくる/感情変化の瞬間
3. **コメディ** -- 笑えるシーン (タケシの失敗、ケンジの反応など)
4. **クライマックス** -- 核心を突くマスターの一言の直前
5. **学び** -- TOEIC概念の図解 (パラフレーズマップ、トラップパターンなど)
6. **エンディング** -- エピソード締めの余韻

---

## 使い方

```bash
# Episode 1の画像生成
OPENAI_API_KEY=sk-xxx node scripts/generate-scene-images.mjs --episode 1

# 全エピソード一括
OPENAI_API_KEY=sk-xxx node scripts/generate-scene-images.mjs --episode all
```

生成後:
1. `public/izakaya-scenes/ep-001/` に画像が保存される
2. `src/data/izakaya-toeic/episodes/ep-001.ts` の該当story行に `sceneImage` を追加:
   ```typescript
   { speaker: 'narration', japanese: '...', sceneImage: 'ep-001/opening.webp' }
   ```
3. ページリロードで自動表示

---

## コスト見積もり

| 項目 | 数量 | 単価 | 合計 |
|------|------|------|------|
| DALL-E 3 (standard, 1792x1024) | 6枚/ep x 30ep = 180枚 | $0.080 | $14.40 |
| WebP変換 (ローカル) | 180枚 | 無料 | $0 |
| **合計** | | | **$14.40** |

1エピソードずつ追加していけば、月$2-3程度。
