# Changelog

## 2026-02-28

### Card Points System
- **DB**: `phrase_mastery.card_points` column — gacha sparks accumulate per phrase
- **Card ranks**: NORMAL(0) / BRONZE(10) / SILVER(50) / GOLD(150) / HOLOGRAPHIC(500) / LEGENDARY(1000)
- **Visual**: Review card border, glow, shimmer based on rank; HOLO+ gets animated gradient overlay
- **API**: `review-count` POST accepts `phrase_id`, threads it through gacha roll to accumulate card_points
- **Mastery API**: Returns `cardPoints` map alongside mastery and lastLeveled

### Double Up
- **New API**: `POST /api/sparks/double` — server-side 50/50 coin toss
- **Mechanic**: After gacha reveal (BONUS+), 3-sec countdown to accept DOUBLE? bet
- **Chain**: Up to 3x (x2 -> x4 -> x8), each 50/50
- **Risk**: Win = double SP+card_points; Lose = that roll's SP+card_points to zero
- **UI**: Coin toss animation, win particles, lose fade-out, chain dots

### XP Guide v3
- Roadmap: Phases 3(gacha), 4(daily level), 5(card system), 6(double-up) marked DONE
- New sections: Card Rank table, Double-Up chain table with rules
- Bonus System section marked LIVE

## 2026-02-21

### Goroku: Complete 310-entry 7-Pillar Curriculum Rewrite
- **Full rewrite**: All 310 expressions replaced with systematic English-speaking curriculum
- **7 pillars**: 骨格(50) / 動詞(50) / 小語(50) / 音(40) / メタファー(40) / 会話武器(40) / 文化OS(40)
- Each entry teaches a specific structural difference between English and Japanese
- context field: 130-200+ chars Japanese with bilingual examples, izakaya-friend tone
- english[3]: stream-of-consciousness monologue with humor, g-dropping, personality
- Mixed pillars per day (no per-day themes), 10 entries per day across 31 days
- Header updated: "7-Pillar English Speaking Curriculum"
- Quality baseline: Day 20 standard applied to all 310 entries

### Goroku Day 21: Context rewrite to Day 20 quality
- All 10 Day 21 context fields rewritten from bare labels to izakaya-friend tone
- Added slot/slotHints to entry 6 (I don't do routines -> I don't do ~)
- Examples: "hit rock bottomは底の底。bottomが既に底なのにrockで岩底まで掘り下げる"

### Fix: Goroku "Phrases" button registration
- **Bug**: Registration posted to `/api/user-phrases` (wrong table), phrases calendar reads from `/api/phrases`
- **Fix**: Changed POST target to `/api/phrases` with correct field mapping (english, japanese, category, date)
- Duplicate check now reads from `/api/phrases` (english field) instead of `/api/user-phrases` (phrase field)
- Registered entries appear on today's date in the Phrases calendar

## 2026-02-20

### Journal #123: AIをコーチングしたら94%の現実が見えた
- Deep research entry: note.com strategy beyond articles 011-016
- Core data: 94% revenue to top 1,000 creators (UCL 2025), tweet half-life 43 min, 3% free-to-paid conversion
- Thesis: "name your framework" -- articles die, named frameworks survive (Lindy effect)
- Academic sources: Ariely (zero-price effect), Prelec (pain of paying), Strauss/Yang/Mazzucato (power law)
- Full englishSummary (Pro, 11 sections) + conversationData (Memoria, ~45 lines)
- Featured entry, readTime: 12

### 俺語録 v6: Speaking Patterns Overhaul + Content Standard
- **UI rewrite**: Removed flip-to-reveal mechanic, adopted phrases-page style
  - Flat card list: play button (left) + Japanese + English + context + learned toggle (right)
  - All content always visible, no reveal needed
  - TTS on play button, 1 tap to hear English
- **Binary mastery**: Removed 4-level progression, now 0 (not learned) / 3 (learned)
  - Calendar dots: gray (not learned) / gold (learned)
  - Learned entries get opacity 0.6
  - Circular checkbox toggle replaces numbered mastery button
- **English display**: Always shows `english[1]` (attitude-level short phrase)
  - 4-level data preserved in DB but UI only uses level 1
  - Subtitle changed: "31-Day Monthly Review" -> "310 Speaking Patterns"
- **Content standard (Day 20 baseline)**: New quality benchmark for all 310 entries
  - context field = the product core: izakaya-friend tone, real linguistic insight, humor
  - Good: "just、便利すぎて禁止にしたいレベル。" Bad: "[A is B]" bracket notation
  - Spec updated: `docs/ore-goroku-spec.md` "Content Standard" section
  - Gradual rollout: rewrite each day's entries when that calendar day comes
- **Removed**: flip state, previewLevel, LEVEL_LABELS, registerToPhrase, Show All/Hide All
- Day 20 entries rewritten 7 times to reach final quality standard

### note.com Articles 011-016: App Feature Series
- **011**: 英語学習アプリを1人で作った。まだ喋れない (全体像、コードあり)
- **012**: 自分の口癖を310個集めたら、英語の問題じゃなかった (俺語録)
- **013**: 単語帳に10人のキャラと恋愛サブプロットを入れた (Word Review)
- **014**: 4歳児の英語が一番聞き取りやすかった (Memoria)
- **015**: 学校で禁止されたumが、英語で一番大事な単語だった (Speaking)
- **016**: 英語は2語でいい (4段階レベル)
- All unpublished, added to `src/data/english/note-articles.ts`
- Series style: story-driven, no code (except 011), self-deprecating endings
- Cross-references: 012 ending → 013 callback (もともこもない), 014 → article 004 reference
- **NEW**: Premium-level article about the complete English learning system
  - Mixed audience: engineers (code/architecture) + English learners (methodology)
  - Covers: Word Review (scenario system), 俺語録 (4-level reverse mapping), Memoria (native conversation), Speaking Guide (6-step method from Pellegrino), technical architecture (D1/API)
  - 5 code examples showing design decisions (parseGorokuEnglish, prefixMap, findExpressionLineIndex, API constraints, data structure)
  - Self-deprecating narrative arc: built everything, still can't speak
  - Follows note.com style: 「」禁止, short sentences, data as punchlines
- Added as ID '011' in `src/data/english/note-articles.ts` (unpublished)

## 2026-02-19

### 俺語録 v5: 4-Level Evolution System + REQUIEM Content
- **NEW SYSTEM**: `english` field evolved from `string` to `string[]` (4 levels)
  - Level 0 (NEW): 2-5 word core punch
  - Level 1: 5-10 words with attitude/personality
  - Level 2: 10-20 word full spoken sentence
  - Level 3 (REQUIEM): 20-40+ word spoken passage -- user's voice as native English speaker
- **Content**: All 310 entries rewritten with 4-level English (1,240 total pieces)
  - Fragment stacking, self-deprecation, g-dropping, cultural mash-ups
  - Every Level 3 is a mini-monologue that sounds like the user talking at a bar
  - File grew from 391 lines to 1,940 lines
- **API**: D1 lib updated to store/retrieve english as JSON array
  - `addGoroku` accepts `string[] | string`, stores as JSON
  - `getAllGoroku` / `getGorokuByDaySlot` parse JSON on read
  - `updateGoroku` handles array serialization
  - Backward-compatible: legacy single strings auto-duplicate to 4 levels
- **UI**: Card display shows mastery-level-appropriate English
  - Level progression strip: 4-segment bar showing evolution
  - Click segments to preview different levels
  - Mastery cycling auto-updates displayed level
  - TTS speaks current level's English
- **DB re-init required**: `POST /api/goroku/init` to load new 4-level seed data

### 俺語録 v4: UI/UX Overhaul + Seed Sync
- **Rewritten**: `src/app/english/goroku/page.tsx` -- Significant UI/UX improvements
  - Auto-selects today on page load
  - Category filter pills in detail panel (filter by reaction/opinion/filler/etc.)
  - Keyboard navigation: left/right arrows to switch days, Space to flip all
  - Category-colored mastery dots in calendar cells (not all same gray)
  - Mini progress bars per calendar day
  - Progress bar in header showing overall mastery
  - Wider detail panel (420px), scroll-to-top on day switch
  - Better card design: category badges with colored bg, border mastery badges
  - Better typography/spacing throughout
- **Synced**: `src/data/english/goroku-seed.ts` -- 23 conversation-extracted expressions
  - Replaced generic entries in days 20-26, 28-29 with real ChatGPT conversation extractions
  - Spiritual/philosophical: "I'm the watcher, not the content", "die before you die", "I'm aware of being aware"
  - Self-description: "I don't do mornings", "I'm more of a listener", "I'm the anti-foodie"
  - Existential: "I'm just... tired of existing", "I'm OK with not being OK"
  - Source: User's actual English conversations with ChatGPT (2026-02-18)
  - Seed file now matches D1 database state

## 2026-02-18

### 俺語録 v3: Calendar UI + Real Speech Patterns
- **Philosophy**: Translate the PERSON, not the words. Based on Journal #115's 10 speech patterns
  - No per-day themes -- expressions are mixed across all patterns
  - Every expression extracted from actual journals/conversations
  - 10 patterns: レンガ積み, 軌道, 許可サンドイッチ, エスカレーション梯子, 哲学トラップドア, etc.
- **Rewritten**: `src/data/english/goroku-seed.ts` -- 310 expressions from real speech, no DAY_THEMES
  - Pulled from: curry-wars, soba-neuroscience, ai-english-practice, writing-deflation, voice-skeleton, boiled-in-evil, quon-chocolate, margin-philosophy journals
  - Includes user's actual phrases: "殺意が湧いた", "もともこもない", "知らんけど", "全然だめ", etc.
- **Rebuilt**: `src/app/english/goroku/page.tsx` -- Monthly calendar UI (Sun-Sat grid)
  - Month navigation with prev/next arrows, Today button
  - Weekday headers with Sun(red)/Sat(blue) coloring
  - Mastery dots per date, click to open right detail panel
  - Flip-to-reveal cards, TTS, mastery cycling, Register to Phrases
- **Updated**: `docs/ore-goroku-spec.md` -- Curation protocol at TOP, 10 speech patterns table, no themes

### Journal #122: そば1杯の神経科学
- **Created**: `src/data/journal/2026/soba-neuroscience-entry.ts`
  - Topic: 気分が悪いときにそばを食ったら直った。28本の論文で7つのメカニズムを調査
  - 10 chapters: トリプトファン裏口入学、迷走神経、すする物理学、血糖回復、コンフォートフード(再現性問題)、腸内細菌(長期)、食べる儀式、タイムライン、正直な評価、結論
  - englishSummary: 11 sections, podcast-style, simple vocabulary for comprehension
  - conversationData: male/female dialogue, casual tone
- **Modified**: `src/data/journal/2026/02-february.ts` -- Registered entry #122

### English Journal → Pro (Rename + Concept Change)
- **Concept**: englishSummary is now "Pro" -- dense, fast, professional-level spoken monologue (comedian/TV host style)
  - Short (2-3 sections, ~3 min), packed with idioms, long clause chains, no hand-holding
  - Memoria = natural conversation (accessible), Pro = concentrated performance (advanced)
- **Modified**: `src/components/EnglishSidebar.tsx` -- '英語ジャーナル' → 'Pro'
- **Modified**: `src/app/english/journal/page.tsx` -- heading/labels: 'English Journal' → 'Pro', 'articles' → 'episodes'
- **Modified**: `src/app/english/journal/[id]/page.tsx` -- 'Back to Journal' → 'Back to Pro', 'Article' → 'Episode', 'Journal #' → 'Pro #'
- **Modified**: `src/app/english/journal/055/page.tsx` -- 'Journal #055' → 'Pro #055'
- **Modified**: `docs/english-journal-spec.md` -- Updated spec: podcast-style → performance-style, added Pro-specific rules

### Completion Buttons (Pro + Memoria)
- **Modified**: `src/app/english/journal/[id]/page.tsx` -- Added 'MARK AS COMPLETED' button
  - localStorage key: `pro_${id}_completed`
  - Gold border + bg when completed, toggle on/off
- **Modified**: `src/app/memoria/[id]/page.tsx` -- Added 'MARK AS COMPLETED' button
  - localStorage key: `memoria_${id}_completed`
  - Theme-aware styling, only shows when conversation exists

## 2026-02-17

### Journal #121: AIと英会話して疲れた
- **Created**: `src/data/journal/2026/ai-english-practice-entry.ts`
  - Topic: ChatGPTと1時間英会話 -- AI躾け、翻訳ラグ、酒で英語が変わる、ロハス記事の自己体現
  - 9 chapters: AI英会話、5分で地獄、AIを躾ける、環境が変わると英語が変わる、酒と翻訳ラグ、ロハスだった、オートパイロット、完璧主義の解毒、構造分析の限界
  - englishSummary: 8 sections, podcast-style
  - conversationData: 7 entries (male/female dialogue), casual tone
- **Modified**: `src/data/journal/2026/02-february.ts` -- Registered entry #121

### Phrases V2: Scenario-Based Flashcard UI (Test)
- **Created**: `src/app/english/phrases-v2/page.tsx` (~1242 lines)
  - Removed calendar entirely -- replaced with scenario-based navigation
  - Scenario pills: horizontal scrollable nav from `DAY_PROLOGUES` data (9 scenarios)
  - Large centered flashcard as primary interaction (not squeezed into sidebar)
  - 3-dot mastery indicator: gold (0-2) / emerald (3), click to cycle
  - iOS-style segmented control for mastery filtering (All / 0 / 1 / 2)
  - Collapsible scenario info panel (setting + characters)
  - List view toggle for browsing phrases
  - Keyboard shortcuts: ArrowLeft/Right (nav), Space (mark mastery)
  - Auto-advance after mastery mark (400ms)
  - All existing features preserved: TTS, VoiceRecorder, YouGlish, Edit/Delete, Add phrase, Vocab modal
- **Modified**: `src/components/EnglishSidebar.tsx` -- Added "フレーズ V2" nav link

## 2026-02-16

### Journal #120: ウェブサイトを公開するまでの全工程
- **Created**: `src/data/journal/2026/cloudflare-deployment-guide-entry.ts`
  - Topic: toniolab.com deployment full walkthrough -- educational/systematic, beginner-focused
  - 9 chapters: deployment basics, Vercel vs Cloudflare, Workers vs Pages, CI/CD + GitHub Actions, D1 database, Worker secrets, size limits (3 MiB), DNS + custom domains, troubleshooting (6 real errors)
  - englishSummary: 11 sections, podcast-style
  - conversationData: 36 turns EN+JA, casual tone
- **Modified**: `src/data/journal/2026/02-february.ts` -- Registered entry #120

## 2026-02-15

### Journal #119: 222ファイルの引っ越しとハンマーの独り言
- **Created**: `src/data/journal/2026/migration-and-hammer-entry.ts`
  - Topic: toniolab.com migration (222 files, 12 type errors, Windows deploy failure) + Adyashanti hammer metaphor
  - 10 chapters: migration, type errors, deploy failure, hammer metaphor, 99.9% thought universe, flow state = ego death, St. John of the Cross, raw suffering, deploy failed (spiritual edition), 222 files zero enlightenment
  - englishSummary: 9 sections, podcast-style
  - conversationData: 40 turns EN+JA, melancholic tone
- **Modified**: `src/data/journal/2026/02-february.ts` -- Registered entry #119

### Note Page Redesign
- **Modified**: `src/app/english/note/page.tsx` -- Full redesign of article management page
  - Stats header: article count, published/draft breakdown, total character count
  - Article list (280px -> 320px): preview text, read time, dot+text status badges, hover states
  - Preview area: subtitle with left border accent, note.com link button for published articles
  - Article footer: character count + estimated read time
  - Empty content state for draft articles
  - Gold accent line in header, unified transitions (0.15s ease)
- **Modified**: `src/data/english/note-articles.ts` -- Added article 006 (draft, empty content)
  - Title: 英語学習システムを作った男、まだ喋れない
  - Subtitle: これから頑張ります

## 2026-02-14

### Scenario 042: First Movie Without Parents (Feb 20-24)
- **Created**: `src/data/english/movie-night.ts` -- Memoria conversation data (5 days, 8 characters)
  - Characters: Jayden(12M), Maddie(12F), Tyler C.(12M), Ava(12F), Benji(11M), Mrs. Chen(42F), Marcus(17M), Old Man Gus(70M)
  - Series: `movie-night`, IDs: `movie-day1` to `movie-day5`
  - Group conversation: tween slang, anxiety humor, generational clash, film nerd vs normie tension
- **Created**: `src/data/english/movie-expressions.ts` -- 75 expressions (15/day x 5 days)
  - Mix of tween slang ("that's cap", "it's giving"), movie theater language, old man expressions
  - Exports: MOVIE_EXPRESSIONS, MOVIE_DAY_IDS, findMovieExpressionLineIndex
- **Created**: `scripts/seed-day42-sentences.mjs` -- 50 Word Review sentences (executed, 50/50 success)
  - 50 unique idioms added to `scripts/used-idioms.json` (393 -> 443 total)
  - Story arc: arrival -> previews -> mid-movie chaos -> climax drama -> after credits
- **Modified**: `src/data/english/day-prologues.ts` -- Added prologue for '2026-02-20'
- **Modified**: `src/app/memoria/page.tsx` -- Registered movieNightEntries
- **Modified**: `src/app/memoria/[id]/page.tsx` -- Added movie- prefix handler + character colors
- **Modified**: `src/app/english/expressions/page.tsx` -- Added 'movie' SeriesKey + SERIES_CONFIG
- Complete 3-piece set: Word Review + Memoria + Expressions

### Journal #118: noteに投稿した -- いっつもなにもできないの1ページ目
- **Created**: `src/data/journal/2026/note-launch-entry.ts`
  - note.com初投稿の記録。英語構造分析5本シリーズの1本目を公開
  - fancy_dahlia8212問題: 自動生成URLは覚えてもらえない
  - ヘッダー画像なし = 存在しないのと同じ
  - 毎日投稿しないと死ぬ（noteのアルゴリズム的に）
  - Claudeからの3つのアドバイス: URL変更、ヘッダー画像、毎日投稿
  - 140字プロフィール完成: "自分でも実験中"
  - 「」永久禁止ルール確立（AI臭の原因）
- **Modified**: `src/data/journal/2026/02-february.ts` -- Added import and registration
- Full englishSummary (9 sections, podcast-style) + conversationData (43/43 bilingual turns)
- readTime: 10, featured: true

### Style Rule: 「」永久禁止
- note記事・マークダウンで「」を使わない。AI臭の原因。
- 英語の引用は "" か > blockquote で。日本語は括弧なしで書く。

### note.com Article Management System
- **Created**: `src/data/english/note-articles.ts` -- NoteArticle type + 5-article series
  - 001: "ネイティブの英語を構造分析したら学習システムができた" (intro + 7 rules + hook)
  - 002: "ネイティブは23秒かけて2行分の情報を喋る" (Mark Prior/Alana Rizzo deep dive)
  - 003: "英語と日本語の情報転送速度は同じ" (Pellegrino 39 bits/sec)
  - 004: "非ネイティブの英語はネイティブより明確" (Rojas analysis + clarity > speed)
  - 005: "教科書英語と本物の英語の差を埋めるシステムを作った" (system reveal + OSS)
- **Created**: `src/app/english/note/page.tsx` -- Article management/preview page with markdown rendering
- **Modified**: `src/components/EnglishSidebar.tsx` -- Added "note記事" to tools section
- **Created**: `docs/english-business-strategy.md` -- Open source evangelist strategy
- **Created**: `docs/note-articles/01-hajimemashite.md` -- Draft reference (content moved to data file)

### Journal #117: 気づきについての気づき -- 常にそれだけ
- **Created**: `src/data/journal/2026/awareness-of-awareness-entry.ts`
  - Core thesis: awareness of awareness, always just that -- every teaching reduces to this
  - Yamaga Naoki (ku-haku.jp): awakened teacher on suicide/bhakti + Ramana's "Who am I?"
  - Awakened speech vs device speech: same words, different source (silence vs device)
  - "Something is always here" -- content changes, the fact of presence doesn't
  - Bugs/kids = awareness without meta; adults = meta creates cage AND exit
  - Nick Castellanos release: real-time demo of thought arising without owner
  - Ego runs on past DB; no data = no trigger (cricket player test)
  - Suffering = DB running queries against the present; "half-awake hell" in real time
  - "Whatever" all the way down: device's turn never comes
  - Time exists only inside thought; "now" creates the time it points at
  - Socrates's last words: "Life was the disease. I just got cured." (Asclepius offering)
  - Ramana's "Where would I go?" -- same spot, 2400 years apart, India and Greece
  - Philosophy = thought asking until it hits its own wall; Socrates said "I don't know", Ramana went silent, I laughed
  - Ending: "tired. aware of being tired. tired."
- **Modified**: `src/data/journal/2026/02-february.ts` -- Added import and registration
- Full englishSummary (12 sections, podcast-style) + conversationData (46/46 bilingual turns)
- readTime: 14, featured: true

## 2026-02-13

### Journal #116: 装置は俺じゃない -- Adyashanti and the Empty Niche
- **Created**: `src/data/journal/2026/adyashanti-empty-niche-entry.ts`
  - Adyashanti vs Eckhart Tolle: note.com 3件 vs 専用ハッシュタグ+16冊翻訳
  - Why Tolle sells (Oprah bomb, title marketing, entry-level depth)
  - Ego dissolution asymmetry: positive functions dissolve, negative stays
  - "The device is not me" -- meaning-making device still running, but not identified with
  - Adya as accidental English teacher: slow speech, short sentences, constant rephrasing = Rojas model
  - Punchline: "study that arrives nowhere" accidentally arrives somewhere
- **Expanded**: 3 new sections appended
  - "The Power of Now の本当の意味" -- "now" as death sentence for the device, Japanese title as genius-level lie
  - "逃げ場がない" -- fire/flood rebirth, self-immolation as ego (choosing = "I"), samsara cycle
  - "エリ、エリ、レマ、サバクタニ" -- Christ's cry as device completely breaking, katakana desert humor
  - New ending: "笑いは悟りを導かない。でも苦しみを忘れさせるヘロインにはなる。" + meta-loop
- **Modified**: `src/data/journal/2026/02-february.ts` -- Added import and registration
- Full englishSummary (15 sections, podcast-style) + conversationData (70 bilingual turns)
- readTime: 12 -> 16

## 2026-02-12

### Journal #115 Expansion: Cage/Ego/Adyashanti Dimension
- **Modified**: `src/data/journal/2026/voice-skeleton-entry.ts` -- Appended 7 new sections to conversation markdown
  - "型 = 檻" -- patterns as invisible cages
  - "大人が外国語を学ぶ本当の意味" -- adult language learning as cage-recognition (vs child multilinguals who never see their cages)
  - "アジャシャンティの問い" -- observing speech patterns from outside, second language as mirror
  - "ビジネスの皮肉" -- selling "cage wallpaper" (English wallpaper on Japanese cage walls)
  - "「完敗」は思考停止" -- "I don't know" > "I lost" (Adyashanti)
  - "「わからない」を楽しむ" -- cage with a window = better airflow
  - "更新された発見" -- updated discovery table (patterns -> prisons)
- **Modified**: englishSummary -- 6 new sections (Patterns Are Prisons, Why Adult Language Learning Hits Different, The Adyashanti Question, The Business Irony, 'I Don't Know' Beats 'I Lost', Updated Discovery)
- **Modified**: conversationData -- 16 new dialogue turns (english + japanese) covering cage/ego/wallpaper/Adyashanti themes
- readTime: 18 -> 25 (JP), 15 -> 22 (EN)

### Day 041 Word Review: Mariners Trade Talk (Feb 15-19, indices 450-499)
- **Created**: `scripts/seed-day41-sentences.mjs` -- 50 spoken-dialogue sentences (Marcus + Kai podcast)
  - 5-episode arc: trade breakdown, prospect evaluation, roster fit, rival analysis, predictions
  - All words embedded naturally into baseball podcast tangents (beret, copper shark, BDNF, gerbil, etc.)
  - 50 unique idioms added (total: 391 used), zero duplicates
  - All 50 word meanings fixed (most were empty or had example sentences as definitions)
- **Modified**: `src/data/english/day-prologues.ts` -- Added '2026-02-15' prologue for Mariners Trade Talk
- **Modified**: `scripts/used-idioms.json` -- 343 -> 391 idioms

## 2026-02-10

### Mariners Trade Talk Memoria Series (Scenario 041, Feb 15-19)
- **Source**: The Cards Talker #11 (Japanese podcast, ~2 hours) -- reimagined as native English podcast
  - NOT a translation -- rewritten from scratch using speech patterns from Journals #110-112
  - g-dropping, fillers, clause adhesives, right-branching, chunk-based speech
- **Created**: `src/data/english/mariners-trade-talk.ts` -- 5 Memoria entries (mariners-day1 to day5, Feb 15-19)
  - 2 characters: Marcus (host, Cardinals fan, male) and Kai (guest, Mariners superfan, male)
  - ~30 English + ~30 Japanese dialogue lines per day
  - Day 1: The Deal -- trade announcement, Kai's origin story (2001 Ichiro/116 wins), 80 vs 120 point evaluation
  - Day 2: The Offseason -- B+ grade, Naylor extension, Ferrell, outfield logjam, pitching depth, AL West
  - Day 3: The Perfect Fit -- leadoff role, T-Mobile Park, health, L/R splits, $5.8M salary, clubhouse
  - Day 4: The Next Generation -- Emerson prospect, 3-way trade mechanics (Rays mediator), Williamson story, Dipoto-Angels feud
  - Day 5: Building the Future -- Seinche (switch-pitcher), Gilbert extension, 2027 payroll crisis, Kirby trade possibility, World Series dream
- **Created**: `src/data/english/mariners-trade-expressions.ts` -- 75 podcast expressions (15/day x 5 days)
  - MarinersExpression interface, MARINERS_DAY_IDS, findMarinersExpressionLineIndex()
  - Expressions from actual dialogue: "rough around the edges", "the bones are there", "Cinderella fit", "sky-high", etc.
- **Modified**: `src/app/memoria/page.tsx` -- Import + register mariners entries in allEntries
- **Modified**: `src/app/memoria/[id]/page.tsx` -- Import + mariners entries + CHARACTER_COLORS (Marcus: red, Kai: blue)
- **Modified**: `src/app/english/expressions/page.tsx` -- Added 'mariners' to SeriesKey, SERIES_CONFIG entry with speaker colors, day labels, deep-link function

### Journal #114: QUON Chocolate -- Material Design
- **Created**: `src/data/journal/2026/quon-chocolate-entry.ts`
  - Title: "素材を変えただけで10倍になった -- 久遠チョコレートと設計の話"
  - id: '114', date: '2026-02-10', featured: true, readTime: 13
  - Arc: Note article -> 16,000 yen wage -> bread hell -> chocolate forgiveness -> powder lab (destruction as work) -> leaving the system -> English is the same (test=bread, recitation=chocolate) -> ability deflation -> "go home" -> taxes callback
  - Full 3-layer content: conversation (JP markdown, 11 sections), englishSummary (12 sections podcast-style), conversationData (~80 turns EN+JA)
  - Source: Kamata Takahide's Note article on QUON Chocolate + deep research
  - Connected to Journal #113 (writing deflation, zero-ownership, English recitation)
- **Modified**: `src/data/journal/2026/02-february.ts` -- Added quonChocolateEntry import and registration

### Journal #113: Writing Deflation
- **Created**: `src/data/journal/2026/writing-deflation-entry.ts`
  - Title: "書く能力のデフレ -- AIで誰でもうまく書ける時代に、誰が読むのか"
  - id: '113', date: '2026-02-10', featured: true, readTime: 15
  - Arc: writing deflation -> everyone wants to be read -> expression is ego -> zombie -> really listen -> English recitation is fun -> bath/pachinko/work -> Chopin/echoing -> Sadhguru (body=earth, mind=garbage, creation=imitation) -> zero-ownership -> taxes joke
  - Full 3-layer content: conversation (JP markdown, 17+ sections), englishSummary (15 sections podcast-style), conversationData (~80+ turns EN+JA)
  - Note.com analysis embedded: DR92, TOEIC-dominated, speaking niche empty
  - Sadhguru research: 30+ direct quotes on borrowed existence, post-enlightenment expression
- **Modified**: `src/data/journal/2026/02-february.ts` -- Added writingDeflationEntry import and registration

### Bookmarks Selective Batch Registration
- **Modified**: `src/app/english/saved/page.tsx` -- Replaced "Register All" with selective batch registration
  - Added `selectedIds` state (Set) for tracking which phrases are checked
  - Added checkbox to each unsynced phrase card (gold highlight when selected)
  - Added "Select All / Deselect All" toggle button in batch registration header
  - Button now shows selected count: "Register (3)" instead of "Register All"
  - `syncSelectedPhrases()` only registers checked phrases, not all unsynced
  - Registered phrases are automatically removed from selection

### Memoria Speech Spec (Deep Structure)
- **Created**: `docs/memoria-speech-spec.md` -- 7 structural rules for native English dialogue
  - Rule 1: Information density (60%+ function words per utterance)
  - Rule 2: Cognitive markers (um/uh/false starts every 5-8 lines)
  - Rule 3: Clause chain length (30%+ utterances with 4+ adhesive connectors)
  - Rule 4: g-dropping variability (70-80%, not uniform 100%)
  - Rule 5: Turn length variation (20%+ short, 20%+ long)
  - Rule 6: Repetition/reformulation (key points stated 2-3x)
  - Rule 7: Cross-turn building (20%+ turns reference previous speaker)
  - Full before/after examples showing decorated writing vs. deep structure
  - Quality checklist with red flags
- **Modified**: `docs/english-journal-spec.md` -- Section E expanded: conversationData must pass all 7 structural rules, added voice role details (male=longer turns, female=more short turns), added red flags for conversationData
- **Modified**: `docs/word-review-spec.md` -- Section B (Memoria) expanded: mandatory reference to speech spec, 7-point structural requirements inline, updated generation steps

## 2026-02-09

### Journal #109: Suffering Right Here -- Major Rewrite
- **Rewritten**: `src/data/journal/2026/suffering-right-here-entry.ts`
  - Title: "今ここにあるsuffering -- 苦の三層と、半分覚めた者の地獄"
  - Added 5 new sections: Ego's Survival Hardware, Three Layers of Suffering (dukkha), Half-Awake Hell paradox, Eli Eli Lema Sabachthani, Enjoy Your Suffering
  - Buddhist framework: dukkha-dukkha (direct pain), viparinama-dukkha (impermanence), sankhara-dukkha (existential dissatisfaction / "chronic back pain")
  - Middle Hell concept: half-awake worse than asleep (suffering concentrated, no escape routes, self still present)
  - Four Noble Truths as cosmic joke (desire to end suffering IS suffering)
  - Ending: "enjoy your suffering" irony, "the space around suffering can increase"
  - All three content sections rewritten: conversation (JP markdown), englishSummary (13 sections), conversationData (26 dialogue pairs EN+JP)
  - readTime: 10 -> 14, englishSummary readTime: 9 -> 13
  - Added tags: '仏教', '四諦', '三苦'

### Scenario 040: Monster Under the Bed (words 400-449, Feb 10-14)
- **Created**: `scripts/seed-day40-sentences.mjs` -- 50 sentences, all spoken dialogue
  - Story: 4-year-old Timmy's Friday night terror. Parents go out, babysitter Kayla arrives, best friend Noah sleeps over, pillow fort is built, Uncle Danny makes everything worse with ghost stories, Mom comes home and explains how eyes work in the dark
  - 8 characters: Timmy(4M), Mom/Sarah(32F,ER nurse), Dad/Greg(35M,lawyer), Emma(8F,science nerd), Grandpa Frank(68M,retired plumber), Noah(4M), Kayla(16F,babysitter), Uncle Danny(30M,conspiracy theorist)
  - 50 new idioms (scared stiff, jump out of one's skin, the coast is clear, make a beeline for, etc.)
  - 20 meaning fixes (inattentive, spanker, gig, patronize, forks, cryptic, trite, concurrent, etc.)
- **Swapped**: Word positions 400-449 (Feb 10-14) with 1950-1999 (Jul 15-19) so Monster content appears on Feb 10-14
  - Three-step swap to avoid UNIQUE constraint on phrase column (A->temp, B->A, temp->B)
  - Fixed corrupted meaning for archaeology (was "テスト" from debugging)
- **Modified**: `src/data/english/day-prologues.ts` -- Added 2026-02-10 prologue (Monster Under the Bed)
- **Modified**: `scripts/used-idioms.json` -- 293 -> 343 idioms
- **Modified**: `docs/word-review-spec.md` -- Updated progress tracker, added Memoria + Expressions as mandatory deliverables
- **Created**: `src/data/english/monster-under-bed.ts` -- 5 Memoria entries (monster-day1 to monster-day5, Feb 10-14)
  - ~30 dialogue lines per day in English + Japanese, 8 characters with distinct voice patterns
  - Timmy(simple fragments), Greg(big words), Emma(scientific), Danny(conspiracy), Frank(folksy)
- **Created**: `src/data/english/monster-expressions.ts` -- 75 casual expressions (15/day x 5 days)
  - MONSTER_DAY_IDS mapping, findMonsterExpressionLineIndex() helper for deep-links
- **Modified**: `src/app/memoria/page.tsx` -- Import + register Monster entries in allEntries
- **Modified**: `src/app/memoria/[id]/page.tsx` -- Import + Monster CHARACTER_COLORS (8 chars) + monster- ID lookup
- **Modified**: `src/app/english/expressions/page.tsx` -- Multi-series support with series selector tabs
  - SERIES_CONFIG data-driven architecture: series label, expressions, speakers, day labels, deep-link functions
  - College Party (existing) + Monster Under the Bed (new) selectable via gold tabs
  - Dynamically swaps all data (expressions, speaker colors, day labels, totals) on series switch

### English Journal -- Light Mode + UI Overhaul
- **Rewritten**: `src/app/english/journal/page.tsx` -- Light mode, improved UI/UX
  - Removed dark mode (gradient #0a0a0a/#111 -> #FAFAF9), removed Tailwind classes -> inline styles
  - Removed Lucide icon imports (ArrowLeft, Play, BookOpen, Clock)
  - Play mode: dropdown replaced with pill-button toggle bar (MANUAL/AUTO/SHUFFLE)
  - Article cards: show date (formatDate), track count (calculated from paragraphs), read time
  - Fallback thumbnail: serif entry ID on stone-100 bg when no heroImage
  - Gold border hover effect on article cards
  - Header shows total article + track count
- **Modified**: `src/app/english/journal/[id]/page.tsx` -- Removed dark mode, switched to light theme
  - Background: #0a0a0a -> #FAFAF9 (stone-50), cards: #1a1a1a -> #fff with borders
  - Text: #fff -> #1C1917 (stone-900), secondary: #666 -> #78716C (stone-500)
  - Play button icons changed from black fill to white fill (visible on gold background)
  - Added Save button (★/☆) to the "now playing" display at the top
  - Save button shows "Save"/"Saved" label with gold highlight when active
  - Removed emoji characters from SHUFFLE option text

### Speaking Complete Guide -- /100h Page Rewrite
- **Rewritten**: `src/app/100h/page.tsx` - Complete transformation from "100 Hour Immersion Challenge" to self-contained speaking textbook
  - Clean textbook aesthetic with sticky TOC sidebar (220px desktop, floating FAB on mobile)
  - IntersectionObserver for scroll-tracking active section in TOC
  - "Listening first" emphasis at Part 1 opening -- can't speak if you can't hear
  - Part 1: Why Japanese speakers can't speak (SOV->SVO bottleneck, brain database mismatch, feedback loop)
  - Part 2: Change your goal (natives sacrifice clarity for speed, Hasegawa model with real interview quotes, Rojas model, 3 levels)
  - Part 3: 6-Step Method with expandable chunk tables (~50 phrases), contraction table, practice boxes
  - Part 4: Conversation Survival Guide (emergency phrases, 200ms response window, echo/fragment/redirect)
  - Part 5: Theory Background (Pellegrino 39 bits/sec, stress-timing, head-initial) -- collapsed by default
  - Fully self-contained (no journal references, no external data files), inline styles, no framer-motion
  - Hasegawa Shigetoshi (Angels) as the Japanese success model: "grammar is broken but he never stops, personality comes through"
  - Closing chapter: "最後に: 最も大事なこと" -- philosophical capstone on repetition, emotion, and muscle memory
    - やぶさかではない example (even native speakers find new words awkward at first)
    - いおっプあく alien language thought experiment (emotion dissolves strangeness)
    - Mother tongue as borrowed words -- all language is learned through repetition
    - Speaking as body work, not head work: muscle training until unnaturalness disappears
  - Omake: "覚者と言語学が同じことを言っている" -- philosophical bonus connecting language acquisition to meditation insights (Adyashanti/Tolle). All words are borrowed, thoughts are not the self -- linguistics and awakened teachers reach the same conclusion from opposite directions. Self-aware personality tangent closing ("長谷川さんモデルに従って、人格で許してもらうスタイル")
  - Gold (#D4AF37) for key concepts, Emerald (#10B981) for practice items
- **Modified**: `src/components/EnglishSidebar.tsx` - Changed '100時間チャレンジ' to 'スピーキングガイド'

### Journal #112: Miguel Rojas's English Is Easier to Understand Than a Native's
- **Created**: `src/data/journal/2026/miguel-rojas-english-entry.ts`
  - Deep analysis of 30+ actual Rojas interview quotes vs native speaker patterns from #110
  - Ch.1: Repetition scaffold pattern ("I'm thinking about X, I'm thinking about Y") vs native ellipsis
  - Ch.2: "feel like" as grammatically-valid processing runway (not filler)
  - Ch.3: Five things Rojas doesn't do (vowel killing, function word swallowing, g-dropping, infinite chaining, filler flooding)
  - Ch.4: "a sign of relief" -- accidental poetry from vocabulary limitations
  - Ch.5: Spanish advantage is syntactic (SVO/head-initial/right-branching), not just phonemic
  - Ch.6: Two-mode brain: chunk mode (native-level) vs construction mode (Spanish-influenced)
  - Ch.7: Cultural metaphor absorption (Jordan/Pippen analogy used naturally)
  - Ch.8: Side-by-side comparison of Alana Rizzo (flow) vs Rojas (blocks)
  - Ch.9: "Rojas Model" for Japanese learners -- clarity first, speed later
  - Pellegrino 39 bits/sec applied to individual speaker strategies
  - englishSummary: 12 sections, podcast-style
  - conversationData: 19-line English/Japanese dialogue
- **Modified**: `src/data/journal/2026/02-february.ts` - Added miguelRojasEnglishEntry at top of array

### Journal #111: How to Actually Speak Fluently - Practical Method
- **Created**: `src/data/journal/2026/speaking-method-entry.ts`
  - Practical 6-step method derived from #110's structural analysis
  - Step 1: Memorize 50 starter chunks (fire first, think later)
  - Step 2: Right-branching training (SV + append + append)
  - Step 3: Kill vowels - contractions as default (gonna/wanna/hafta/gotta/kinda)
  - Step 4: Rhythm-only shadowing (stress beats, mumble the rest)
  - Step 5: Switch inner monologue to English (free daily practice)
  - Step 6: 1-minute speech drills (don't stop rule)
  - Theory-to-practice bridge table mapping #110 analysis to concrete methods
  - englishSummary: 9 sections, podcast-style
  - conversationData: 12-line English/Japanese dialogue
- **Modified**: `src/data/journal/2026/02-february.ts` - Added speakingMethodEntry at top of array

### Journal #110: Why Americans Don't Breathe - Dodgers Podcast Speech Analysis
- **Created**: `src/data/journal/2026/dodgers-speech-analysis-entry.ts`
  - Structural dissection of 37-minute Dodgers Territory podcast (Alana Rizzo, Clint Pacas, Katie Woo, Mark Prior)
  - Two-layer analysis: surface (stress-timing, function word reduction, clause chaining, -ing dominance) then self-doubt layer challenging each claim
  - Key insights: schwa/vowel reduction > stress-timing as root cause, head-initial syntax physically enables infinite chaining, fluency-depth inverse correlation (Alana=high fluency/low thought vs Mark Prior=low fluency/high thought), connected speech reduces articulation cost (physics, not culture), redundancy as Shannon error-correction
  - Pellegrino et al. 2011 data: all languages converge at ~39 bits/sec despite different syllable rates
  - Japanese CAN chain continuously (Sanma etc.) but at higher grammatical cost than English
  - Agile vs Waterfall metaphor for speaking philosophy
  - englishSummary: 14 sections, podcast-style
  - conversationData: 16-line English/Japanese dialogue
- **Modified**: `src/data/journal/2026/02-february.ts` - Added dodgersSpeechAnalysisEntry at top of array

## 2026-02-08

### Journal #109: Suffering Right Here - Research-Based Rewrite
- **Created/Rewritten**: `src/data/journal/2026/suffering-right-here-entry.ts`
  - Deep research on Adyashanti (Falling into Grace, The End of Your World, The Way of Liberation) and Sadhguru (Inner Engineering, Isha talks)
  - Grounded in specific teachings: Adyashanti's "two components of suffering" (mental + emotional), "three levels of awakening" (head/heart/gut), "egoic trance" (99% of humanity), ego "addicted to suffering"
  - Grounded in specific teachings: Sadhguru's chemical feedback loop (thought -> chemical -> sensation -> reinforcement), "suffer memory and imagination", "90% of suffering is mental", "reactivity is enslavement"
  - Core thesis: thought identification is harmless; suffering begins when thought ignites the emotional body and the body cannot distinguish imagination from reality
  - englishSummary: 10 sections, podcast-style, with specific book references and quotes
  - conversationData: 16-line English/Japanese dialogue referencing specific frameworks from both teachers
  - conversation: Full Japanese markdown with quoted teachings from Falling into Grace, Inner Engineering, and talks
- **Modified**: `src/data/journal/2026/02-february.ts` - Added sufferingRightHereEntry at top of array

### Expressions Page Overhaul
- **Modified**: `src/data/english/party-expressions.ts`
  - Added `PARTY_DAY_IDS` mapping (day number -> memoria ID)
  - Added `findExpressionLineIndex()` helper for deep-linking to specific conversation lines
- **Modified**: `src/app/memoria/[id]/page.tsx`
  - Added `?line=X` deep-link support: URLs like `/memoria/party-day1?line=5&autoplay=true` now jump to specific lines
  - Extended autoplay useEffect to read and apply line parameter
- **Overhauled**: `src/app/english/expressions/page.tsx` - Complete rewrite from static table to interactive learning tool
  - DB Integration: Fetches `GET /api/user-phrases` on mount, builds dedup Set for instant registration check
  - One-Click Vocab Registration: +Vocab button per expression -> `POST /api/user-phrases` (type: slang, source: College Party Recap Day X)
  - Batch Registration: "Register All" button with sequential POSTs and live progress indicator (e.g., "12/45...")
  - Progress Stats Header: X/75 registered with progress bar, per-day mini indicators (D1-D5 with individual bars)
  - Memoria Play Button: Each expression links to `/memoria/party-dayN?line=X&autoplay=true` using `findExpressionLineIndex()`
  - Speaker Filter: 10 speaker filter chips with assigned colors, combinable with day filter
  - Expandable Row Detail: Click to expand showing full example sentence, English meaning, play/register buttons
  - Bug Fix: Replaced `useState(() => {...})` side effect with proper `useEffect` + cleanup for resize listener
  - 409 (already exists) handled gracefully on registration
  - Green flash feedback on successful registration (2s)
  - Registration status shown as green dot (registered) or grey dot (unregistered)

### US States Map - "American Discovery"
- **Created**: `src/data/us-states-10m.json` - US states TopoJSON from us-atlas CDN (50 states + DC)
- **Created**: `src/data/state-vibes.ts` - Rich English learning data for all 50 states + DC + default fallback
  - `StateExpression` type: `{ en, ja, example }` per expression
  - 5 culturally authentic expressions per state (260 total), each with Japanese meaning and example sentence
  - Examples: Texas "Fixin' to" (〜するところ), Alaska "Cheechako" (新参者), Louisiana "Lagniappe" (おまけ)
  - Export: `STATE_DATA` record + `getStateVibe()` function
- **Created**: `src/app/english/us-map/page.tsx` - Interactive US map with slide-out lesson panel
  - `geoAlbersUsa()` projection with Alaska/Hawaii insets, null guard for pathGenerator
  - 3-color map visualization: unvisited (#E8E5DE) / in-progress (#F6C85F) / complete (#D4AF37)
  - Slide-out 420px lesson panel with state vibe, cultural description, and 5 expressions
  - Per-expression mastery tracking with checkbox toggle, progress bar (5 segments)
  - TTS integration for example sentences (Web Speech API)
  - Hover tooltip showing state name, vibe, and 5 progress dots
  - "Mark All Learned" / "Reset Progress" bulk actions, "Next" navigation
  - Mission target indicator, zoom (1-8x), pan controls
  - Rank system: Newcomer -> Tourist -> Road Tripper -> Explorer -> Adventurer -> Pioneer -> Pathfinder -> All-American
  - localStorage persistence (`us-map-conquest`) with `Record<string, boolean[]>` structure
  - Excludes territories (American Samoa, Guam, CNMI, Puerto Rico, USVI)
  - +Vocab button per expression -> registers word to `/english/vocabulary` via `POST /api/user-phrases` (type: expression, source: US Map)
  - +Phrase button per expression -> registers example sentence to `/english/phrases` via `POST /api/phrases` (category: daily, today's date)
  - Success feedback shows "OK" in green for 2 seconds
- **Modified**: `src/components/EnglishSidebar.tsx` - Added "US States" link after Conquest (Map 6)

### Memoria Player Fixes
- **Fixed**: Character names now extracted from text (e.g., "Tyler: Yo..." shows "Tyler" as speaker, not "Takumi")
- **Fixed**: TTS no longer reads character names and stage directions - only the dialogue is spoken
- **Added**: Bookmark (star) and +Vocab buttons to the current line display at top of player
- **Changed**: Voice selector labels from "Anya/Takumi" to "Female/Male" (generic)
- Character-specific colored avatars (first letter of name) for College Party entries
- Falls back to Takumi/Anya icons for journal/lab entries that don't have name prefixes

### Journal Edits
- **Journal #100** (`election-ritual-entry.ts`): Removed all name-drops (ひろゆき, 成田悠輔) across englishSummary, conversationData, and markdown body. Replaced with generic alternatives (ネットの論客, any internet pundit)
- **Journal #108** (`election-debate-entry.ts`): Softened aggressive language throughout. Title "You Wrote It Yourself, Idiot" -> "You Wrote It Yourself". Removed explicit insults (うざい死ねかす -> イラっとすることだらけ, むかつく -> 悔しい, 馬鹿 -> 人)

### College Party Recap (Memoria Series)
- **Created**: `src/data/english/college-party-recap.ts` - 5-day pure conversation series using all 10 College Party characters
  - Day 1: The Setup (pre-party prep), Day 2: It's Going Down (party kicks off), Day 3: Peak Hours (noise complaint, beer pong, DJ battle), Day 4: After Midnight (wind-down, Tyler-Alyssa moment), Day 5: The Morning After (cleanup, group chat)
  - Integrated into Memoria system with `party-` prefix routing
  - Full Japanese translations for all 5 days (~194 lines) - casual college-age Japanese with character-specific voices
- **Created**: `src/data/english/party-expressions.ts` - 75 slang/expressions (15/day x 5 days) with Japanese/English meanings, speaker attribution, and example sentences
- **Created**: `src/app/english/expressions/page.tsx` - Expression browser page with search, day filter chips, responsive layout, speaker color-coding
- **Modified**: `src/app/memoria/page.tsx` - Added partyMemoriaEntries integration
- **Modified**: `src/app/memoria/[id]/page.tsx` - Added `party-` prefix routing for static party entries

### Sidebar Reorganization
- **Modified**: `src/components/EnglishSidebar.tsx`
  - Moved ボキャブラリー, デイリーフレーズ, ブックマーク, メモリア, 英語ジャーナル, YouTube directly under レクイエム
  - Promoted 英語ジャーナル from subItems to navItems
  - Added スラング表現集 (`/english/expressions`) to navItems

## 2026-02-07

### English Journal System Overhaul - Spec & Content
- **Created**: `docs/english-journal-spec.md` - Master spec for English journal content
  - Podcast-style rules (not essay): contractions, fillers, g-dropping, fragment sentences
  - Before/after examples showing essay-to-podcast transformation
  - EnglishSummary format guidelines (sections, paragraphs as TTS tracks, casual headings)
  - ConversationData guidelines, generation workflow, quality checklist
  - Rule: ALL entries get `englishSummary` (no exceptions)
- **Added `englishSummary`** to 10 journal entries (podcast-style, following new spec):
  - Entry 065: `tts-analysis-entry.ts` - "The Day I Rebuilt Everything"
  - Entry 066: `belx-pickles-entry.ts` - "Why 78-Yen Pickles Taste This Good"
  - Entry 067: `ai-english-learning-entry.ts` - "I Asked AI to Build an English Learning System"
  - Entry 068: `meta-english-practice-entry.ts` - "When the AI Couldn't Understand 'English Practice'"
  - Entry 071: `critical-thinking-hiroyuki-entry.ts` - "The Ego Trap of Critical Thinking"
  - Entry 095: `intimacy-attachment-entry.ts` - "The Difference Between Holding On and Being Close"
  - Entry 096: `margin-philosophy-entry.ts` - "The War on Margins"
  - Entry 097: `boiled-in-evil-entry.ts` - "I'm Being Simmered in Evil"
  - Entry 098: `wbc-insurance-chaos-entry.ts` - "I Was Told to Translate 'All of It'"
  - Entry 999: `puppy-test-entry.ts` - "I Met a Puppy and Now I Can't Focus"
  - Entry 092: `just-notice-entry.ts` - "Just Notice -- The Ouroboros of Awareness"
  - Entry 093: `lucid-dream-youtubers-entry.ts` - "Lucid Dream YouTubers and Enlightenment"
- Note: `deep-critique-remainder.ts` is a content fragment (not standalone entry), skipped
- All 42 journal entries now have `englishSummary` (0 missing)

### Scenario 008 Content - College Party
- **Files**: `src/data/english/day-prologues.ts`, `scripts/seed-day008-sentences.mjs`, `scripts/used-idioms.json`
- Added Scenario 008 prologue: "College Party" (20M, Tyler) with 10 characters at date key `2026-02-05`
- Characters: Tyler(20M,host/introvert), Brandon(21M,party animal), Alyssa(20F,crush), Derek(22M,DJ), Megan(19F,freshman), Professor Hayes(55M,neighbor), Zoe(20F,social media), Jake(21M,frat bro), Kenji(20M,exchange student), Rosa(20F,designated driver)
- 50 spoken-dialogue sentences with speaker field, g-dropping, grammar breaks
- 50 new unique idioms (total used: ~293)
- 46 word meanings fixed (empty/incorrect meanings corrected)
- Fixed prologue date key bug: `2026-01-06` -> `2026-02-05` (dayIndex 35 = Feb 5, scenario group 7)

### Words Per Day: 50 -> 10
- **Files**: `src/app/english/word-review/[date]/page.tsx`, `src/app/english/word-review/page.tsx`, `src/data/english/day-prologues.ts`
- Changed `WORDS_PER_DAY` from 50 to 10 (1 scenario = 50 words = 5 calendar days)
- Added `getScenarioPrologueDate()` helper to look up prologue by scenario group (all 5 days of a scenario show the same prologue)
- Recalculated prologue date keys (e.g., old Feb 7 -> new Jul 5 for words 1850-1899)
- ~1,500 days (2026-01 ~ 2030) to cover all 15,000+ words
- Updated spec document with new day/scenario calculations

### Day 039 Content - First Salary Negotiation
- **Files**: `src/data/english/day-prologues.ts`, `scripts/seed-day39-sentences.mjs`, `scripts/used-idioms.json`
- Added Day 039 prologue: "First Salary Negotiation" (23F, Maya) with 10 characters
- Characters: Maya(23F), Jen(24F), Brad(35M), HR Karen(42F), Dad(52M), Mom(50F), Uncle Ray(48M), Tasha(23F), Mike(27M), Grandma Dotty(78F)
- 50 spoken-dialogue sentences with speaker field, g-dropping, grammar breaks
- 50 new unique idioms (total used: ~200)
- 32 word meanings fixed (empty/incorrect meanings corrected)
- All sentences follow updated spec: spoken only, character voices, no narration

### Word Review - Register Buttons (+Phrases / +Idiom)
- **Files**: `src/app/english/word-review/[date]/page.tsx`, `src/app/english/word-review/page.tsx`
- Added **+Phrases** button (gold) next to review sentences -> registers to `/english/phrases` via `POST /api/phrases`
- Added **+Idiom** button (pink) next to idioms -> registers to `/english/vocabulary` via `POST /api/user-phrases`
- Both buttons open a date picker popup before registering
- Success feedback shows "OK" in green for 2 seconds
- Buttons appear in both word list items and Now Playing / review panel sections

### Word Review Date Page - Now Playing Actions
- **File**: `src/app/english/word-review/[date]/page.tsx`
- Added mastery button, VoiceRecorder, and +Vocab button to Now Playing section
- Same functionality as the word list items, accessible from the top player area

### Phrases Page - Edit Functionality
- **Files**: `src/app/english/phrases/page.tsx`, `src/app/api/phrases/[id]/route.ts`
- Added `PATCH /api/phrases/[id]` API endpoint for updating english/japanese text
- Added Edit button in both list view and calendar detail view
- Edit modal with textarea fields for English and Japanese
- Immediate UI update on save

### CSS Fix
- **File**: `src/app/globals.css`
- Fixed `\\:` -> `\:` in Tailwind class selectors (print:hidden, lg:fixed, lg:hidden, lg:pl-64)

### Day Prologue System
- **Files**: `src/data/english/day-prologues.ts`, `src/app/english/word-review/[date]/page.tsx`
- Added prologue/introduction system for daily word review themes
- Each day gets a title, setting description, and character list
- Displayed as a collapsible section at the top of the date page
- Prologues for Day 037 (Baby Shower) and Day 038 (Class Reunion) included

### Word Meaning Fixes
- Fixed missing or incorrect meanings for words in the user_phrases table

### Word Review Master Spec
- **File**: `docs/word-review-spec.md`
- Consolidated all scattered specs into one master document
- Includes: style rules, age/gender rules, scenario calendar (Day 001-059), prologue system, idiom management, generation workflow, seed script format, progress tracker
- This is the single source of truth for all word review content generation

### Phrases Page - Expandable Right Sidebar
- **File**: `src/app/english/phrases/page.tsx`
- Right sidebar now toggleable between 320px (default) and 540px (expanded) with smooth transition
- Added "Wide/Narrow" toggle button with chevron icon in the header bar
- Calendar area adjusts automatically when sidebar expands/collapses
- Phrase card buttons reorganized into two rows:
  - Row 1: Mastery button + VoiceRecorder + category badge
  - Row 2: YG / +Vocab (left) + Edit / Del (right) with clear colored backgrounds
- Edit button now styled with blue background (#EFF6FF) and border, clearly visible
- Del button now styled with red background (#FEF2F2) and border, clearly visible
- Hover effects on all action buttons for better interactivity
