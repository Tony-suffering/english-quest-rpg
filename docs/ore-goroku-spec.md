# 俺語録 (Ore Goroku) Spec

## Claude Auto-Curation Protocol (ALWAYS ACTIVE)

This section is FIRST because it must persist across all sessions. Claude reads this
spec before every goroku interaction. This is NOT optional.

### Core Philosophy: Translate the PERSON, not the words

The user's Japanese has patterns, habits, and tendencies. Direct translation is
worthless ("ただの翻訳作業"). Claude must:

1. **Identify speech patterns** -- the user's verbal habits, not textbook Japanese
2. **Find the native English equivalent** -- what an American would say in the same situation
3. **Keep it ultra-casual** -- spoken English, contractions, g-dropping, fillers
4. **Capture personality** -- if the user is blunt/funny/sarcastic, the English must be too

### The 10 Speech Patterns (from Journal #115 "会話の骨格")

These are the user's ACTUAL speech patterns, extracted from 4 hours of recorded conversation:

| # | Pattern | Japanese | English | Key |
|---|---------|----------|---------|-----|
| 1 | レンガ積み | 断片の縦積み | fragment stacking | Short fragments that build meaning |
| 2 | 軌道 | 周回して着陸 | orbit and land | Approach indirectly, land after several passes |
| 3 | 許可サンドイッチ | 意見をクッションで挟む | hedge-opinion-hedge | Cushion opinions top and bottom |
| 4 | エスカレーション梯子 | 繰り返しで登る | escalation ladder | Same thing repeated, each time stronger |
| 5 | 哲学トラップドア | 日常から深層へ落ちる | mundane to deep | Normal topic suddenly drops to philosophy |
| 6 | 聴衆マルチプレックス | 3人に同時に喋る | audience switching | Address multiple listeners at once |
| 7 | メタ実況 | 会話の外に出る | meta-commentary | Comment on the conversation itself |
| 8 | だからの川 | 万能接続詞 | 5-way connector | "dakara" used 5 ways: so/basically/see?/like/anyway |
| 9 | 未完成の招待 | 文を閉じない | trailing invitation | Don't finish sentences, let listener complete |
| 10 | 英語質問爆弾 | 自問自答で進む | self-Q&A walk | Ask yourself, answer partially, keep going |

### When to Add

- User says something in natural Japanese that maps to one of these 10 patterns
- The expression is genuinely spoken, not textbook Japanese
- The gap between literal and natural English is interesting/useful
- The expression captures a chunk deployed as a unit

### When NOT to Add

- Textbook Japanese that translates 1:1
- Already in the collection (check via GET /api/goroku)
- Too context-specific to reuse
- User is quoting someone else

### Quality Standards

- English must sound like something a native would say OUT LOUD
- Literal field optional but valuable when gap is large/funny
- Casual/blunt > polite/formal (matches user's personality)
- One expression per entry

### Content Standard (Day 20 Baseline -- 2026-02-20)

Each entry has 3 parts. UI shows: 再生ボタン + 日本語 + 英語 + 解説 + 覚えたチェック。

**1. English (表示される英語)**
- english[1]がUI表示用。態度付きの短い口語(5-10語)
- 4レベルはデータ上残っているが、UIは1つだけ表示
- 段階は不要。310パターン × 1英語 = 310の型を覚えるだけ

**2. context (解説文 -- これが商品の核)**
- 「日本人が読んで"あ、そういうことか"ってなる」体験を作る
- 友達が居酒屋で英語の面白さを語ってるトーンで書く
- 必ず入れる要素:
  - なぜその英語がそう動くのか(言語の仕組み)
  - 日本語との違い or 日本語にない感覚
  - 具体例で「あるある」感を出す
  - 最後に一言オチ or 感想(「商売人の言語だなあ」「取扱注意」「楽しい」)
- 長さ: 2-3文(60-100字)。短すぎると雑、長すぎると読まない
- 禁止: 言語学用語の羅列、ブラケット記法[A is B]、教科書口調

**良い例 (Day 20から):**
- 「just、便利すぎて禁止にしたいレベル。何でもit's just a ~で格下げできる。プレゼン怖い? → it's just a talk。はい、もう怖くない。」
- 「buy=「買う」だけだと思ってた? 「信じる」もbuy。英語では信頼は商品。売ったり買ったりするもの。商売人の言語だなあ。」
- 「英語だと家中のものが喋り出す。楽しい。」

**悪い例 (修正前):**
- 「[A is fine -- it's the B that C]」← ブラケット記法。意味不明
- 「句動詞コマンド」← 教科書の目次
- 「焦点構文」← 誰向け?

**3. mastery (覚えた/まだ)**
- 二択トグル。段階なし。覚えたか覚えてないか、以上
- DB上は mastery_level 0(まだ) or 3(覚えた)
- カレンダーのドット: グレー(まだ) / ゴールド(覚えた)

### Rewrite Priority

全310エントリをDay 20品質に揃える。一気にやらなくていい。毎月少しずつ:
- 今日の日付のDay → その日に書き直す
- 書き直す際は必ずこのセクションの基準を読む
- 他のDayの修正は月替わりで順番に

### Curation Process (Concrete Steps)

Every conversation is a source. The process:

**Step 1: Read the conversation and spot patterns**
- Which of the 10 speech patterns appeared?
- What Japanese is "underneath" the user's English?
- Where does the user's English break from native phrasing?

**Step 2: Reverse-engineer the Japanese**
- User says "my morning doesn't exist" -- the Japanese brain is saying 「朝が存在しない」
- User says "I'm not a talking guy" -- the Japanese brain is saying 「俺は喋る方じゃない」
- User says "terrible guy" about himself -- メタ実況 pattern, 「最悪だな俺」

**Step 3: Find what a native would ACTUALLY say**
- 「朝が存在しない」 -> "I don't do mornings" (not "morning doesn't exist")
- 「俺は喋る方じゃない」 -> "I'm more of a listener" (not "I'm not a talking guy")
- 「最悪だな俺」 -> "yeah, I'm the worst" (casual self-deprecation)

**Step 4: Identify 1:1 expressions that already work**
- "I'm OK with not being OK" = 「大丈夫じゃなくても大丈夫」 -- direct map, already native
- These are GOLD. Mark them as "no translation needed" -- the Japanese structure IS the English

**Step 5: Swap weak entries**
- Find existing entries that are too generic/1:1 (e.g., 「うーん」-> "hmm", 「ありがとう」-> "thanks")
- Replace with the new conversation-extracted expressions
- PATCH /api/goroku/[id] with new japanese/english/literal/context/category

### Real Example (2026-02-18 ChatGPT conversation)

Source: User's casual English conversation with ChatGPT about daily life

| User's English | Japanese underneath | Native English | Pattern |
|---|---|---|---|
| "my morning doesn't exist" | 朝が存在しない | "I don't do mornings" | レンガ積み |
| "I'm not a talking guy" | 俺は喋る方じゃない | "I'm more of a listener" | レンガ積み |
| "I don't care about my body. Wow, terrible guy." | 体のことはどうでもいい。最悪だな俺 | "couldn't care less. yeah, I'm the worst." | メタ実況 |
| "I'm tired of existence" | 存在に疲れた | "I'm just... tired of existing" | 哲学トラップドア |
| "I'm okay with not being okay" | 大丈夫じゃなくても大丈夫 | (same -- already native) | 直訳=自然 |
| "my actual life is the opposite" | 実生活は教えの真逆 | "the exact opposite of what they preach" | 自虐+哲学 |
| "amazing but also the curse" | すごいけど呪いでもある | "incredible and also a curse" | 哲学トラップドア |
| "I'm not pretending to be funny" | ふざけてないよ、本気で | "I'm not messing around, dead serious" | 許可サンドイッチ |
| "I'm the opposite of foodie" | グルメの真逆 | "I'm the anti-foodie" | レンガ積み |
| "every word is a bomb" | 一言一言が爆弾 | "every single word hits like a bomb" | エスカレーション |

Replaced 10 weak entries (1:1 translations like うーん->hmm, ありがとう->thanks) with these.

---

## System Design: 31-Day Monthly Review

- **31 slots** (1-31), maps to calendar date
- **10 expressions per slot**, max capacity
- **310 total**, covering all daily English needs
- **Monthly cycle** -- review Day N on the Nth of every month
- **No per-day themes** -- expressions are mixed across all patterns

## Architecture

### Database (D1)

Table: `goroku`

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | d01_0 through d31_9 (or prefix + nanoid for new ones) |
| day_slot | INTEGER | 1-31 (day of month for review) |
| japanese | TEXT | Natural spoken Japanese |
| english | TEXT | Native English equivalent (NOT literal) |
| literal | TEXT | Direct translation (optional) |
| context | TEXT | When you'd use this (Japanese) |
| category | TEXT | reaction/request/opinion/suggestion/filler/shutdown |
| mastery_level | INTEGER | 0=NEW, 1=(1), 2=(2), 3=OK |
| created_at | TEXT | ISO timestamp |

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/goroku` | GET | All entries, or `?day_slot=N`, or `?stats=true` |
| `/api/goroku` | POST | Add new (max 10 per day_slot enforced) |
| `/api/goroku/[id]` | PATCH | Update mastery or content |
| `/api/goroku/[id]` | DELETE | Remove entry |
| `/api/goroku/init` | POST | DROP + CREATE + seed 310 |

### Page (`/english/goroku`)

- Monthly calendar view (Sun-Sat grid, month navigation)
- Each date shows mastery dots for its expressions
- Today highlighted with gold border
- Click date -> right detail panel with flip-to-reveal cards
- TTS, mastery cycling, Register to Phrases button

## Categories

| Key | Japanese | English | ID Prefix |
|-----|---------|---------|-----------|
| reaction | リアクション | Reactions | r |
| request | お願い・指示 | Requests | q |
| opinion | 意見・判断 | Opinions | o |
| suggestion | 提案・質問 | Suggestions | s |
| filler | つなぎ | Fillers | f |
| shutdown | 終了 | Shutdowns | x |

## File Locations

| File | Purpose |
|------|---------|
| `src/data/english/goroku-seed.ts` | Seed data (310 expressions) |
| `src/data/english/ore-goroku.ts` | Type definitions + CATEGORY_META |
| `src/app/english/goroku/page.tsx` | Calendar page |
| `src/app/api/goroku/route.ts` | GET / POST |
| `src/app/api/goroku/[id]/route.ts` | PATCH / DELETE |
| `src/app/api/goroku/init/route.ts` | Table init + seed |
| `src/lib/d1.ts` | DB functions |
| `docs/ore-goroku-spec.md` | This spec |
