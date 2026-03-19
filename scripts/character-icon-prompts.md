# 居酒屋TOEIC キャラアイコン生成プロンプト

## 共通指定

全キャラ共通のスタイル指定。最初に1人作って、残り5人を同じスタイルで生成する。

```
Style: anime-inspired portrait icon, bust shot, circular crop friendly,
soft cel-shading, warm izakaya lighting (amber/gold tones),
simple dark background (#1C1917), consistent art style across all 6 characters.
No text. No logos. Clean lines. Semi-realistic anime (進撃の巨人/ヴィンランド・サガ寄り、ワンピースほどデフォルメしない).
Resolution: 512x512, PNG, transparent or dark bg.
```

---

## 1. マスター（権藤） -- Master Gondo

```
A weathered Japanese man, age 58. Short salt-and-pepper hair, neatly combed back.
Deep-set wise eyes with crow's feet. Slight stubble. Calm, knowing expression --
the look of someone who has seen everything. Wearing a dark indigo Japanese
work apron (作務衣/samue) over a plain white shirt. Subtle gold accent lighting
from below (as if from an izakaya counter). Gravitas. Quiet strength.
Theme color: #78716C (warm gray/stone)
```

**性格メモ**: 寡黙、洞察力、元TOEIC満点講師。口数少ないが核心を突く。妻を亡くし一人で店を切り盛り。

---

## 2. ユキ -- Yuki

```
A sharp-looking Japanese woman, age 28. Shoulder-length black hair with a slight wave,
often tucked behind one ear. Intelligent eyes with a hint of frustration/determination.
Slight smirk -- the kind of person who hides pain behind sarcasm. Business casual:
a fitted blazer over a simple top. Earrings (small gold studs). She looks tired
but refuses to give up. Protagonist energy.
Theme color: #D4AF37 (gold)
```

**性格メモ**: 商社営業、毒舌、負けず嫌い。TOEIC 620で頭打ち。商談で頭真っ白になったトラウマ。

---

## 3. タケシ -- Takeshi

```
A friendly Japanese man, age 35. Slightly messy short hair, natural and unstyled.
Round face with an easy, genuine smile. Slightly thick eyebrows. The kind of face
that makes you feel better just looking at it. Casual tech worker look: simple
crew-neck t-shirt or hoodie. Glasses (thin black frames, slightly nerdy).
His smile hides the fact that he cries alone at home practicing English.
Theme color: #3B82F6 (blue)
```

**性格メモ**: IT企業PM、お調子者、ムードメーカー。英語は壊滅的だが絶対に落ち込まない。ポジティブは天性じゃなく選択。

---

## 4. リサ -- Lisa

```
A stylish Japanese woman, age 32. Long straight hair, well-maintained.
Sharp features, high cheekbones. Confident posture but eyes that betray
a hint of insecurity. Fashionable: foreign-capital marketing professional look,
slightly Western-influenced style. Light makeup. She looks like she belongs
in LA, not a back-alley izakaya. But here she is.
Theme color: #EC4899 (pink)
```

**性格メモ**: 帰国子女（LA育ち）、英語ペラペラだがTOEIC 860。プライド高いが実は繊細。英語力が錆びていることに気づき始めている。

---

## 5. ケンジ -- Kenji

```
A tough-looking Japanese man, age 45. Tanned, weathered skin from years
of outdoor construction work. Buzz cut or very short hair. Strong jaw.
Deep worry lines on forehead. He looks intimidating but his eyes are kind --
the eyes of a father. Wearing a simple polo shirt or work shirt with
rolled-up sleeves. Thick hands. The face of a man who would do anything
for his team. Slightly uncomfortable, like he doesn't belong in a classroom.
Theme color: #92400E (brown/amber)
```

**性格メモ**: 建設会社部長、高卒叩き上げ25年。TOEIC 480を部下の前で読み上げられた。娘が作った単語カードが待ち受け。

---

## 6. ミナ -- Mina

```
A young Japanese woman, age 24. Slightly messy bob cut or medium-length hair
with a casual vibe. Round, innocent face. Big eyes with a slightly spaced-out,
dreamy expression -- the "天然" look. Wearing casual clothes: oversized sweater
or simple t-shirt. Small earbuds visible (one ear). She looks like she's always
listening to something. Unassuming. The kind of person you'd underestimate.
Theme color: #8B5CF6 (purple)
```

**性格メモ**: 派遣社員、K-POP/Netflix育ち。リスニング満点495だが本人は無自覚。リーディング235。正社員の話が来ている。

---

## バッチ生成用（1プロンプトで6人）

全員を1枚のシートで生成したい場合:

```
Character lineup sheet, 6 anime-style bust portraits in a row, consistent art style.
Semi-realistic anime (Attack on Titan / Vinland Saga style, not overly cartoonish).
Warm amber izakaya lighting. Dark background. Each character clearly distinct.

Left to right:
1) 58yo man, salt-pepper hair combed back, wise eyes, izakaya apron, calm (gray theme)
2) 28yo woman, shoulder-length black hair, sharp eyes, blazer, determined smirk (gold theme)
3) 35yo man, messy hair, round face, big smile, glasses, hoodie (blue theme)
4) 32yo woman, long straight hair, stylish, confident but insecure eyes (pink theme)
5) 45yo man, buzz cut, tanned, construction worker build, kind eyes, polo shirt (brown theme)
6) 24yo woman, bob cut, round face, dreamy expression, earbuds, oversized sweater (purple theme)

Style: soft cel-shading, clean lines, 512x512 each, circular crop friendly.
```

---

## 使い方

1. 上のプロンプトを画像生成AIに入れる
2. 生成された画像を `public/characters/` に保存:
   - `master.png`
   - `yuki.png`
   - `takeshi.png`
   - `lisa.png`
   - `kenji.png`
   - `mina.png`
3. コード側で `initial` の代わりに `<img>` を表示するように変更

## テーマカラー一覧

| キャラ | カラー | HEX |
|--------|--------|-----|
| マスター | Stone/Gray | #78716C |
| ユキ | Gold | #D4AF37 |
| タケシ | Blue | #3B82F6 |
| リサ | Pink | #EC4899 |
| ケンジ | Brown | #92400E |
| ミナ | Purple | #8B5CF6 |
