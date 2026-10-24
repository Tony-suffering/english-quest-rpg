# とにおラボ 公開版 リリース候補(2026-10-24)

対象リポジトリ: `english-quest-rpg`(toniolab.com) / ブランチ `claude/toniolab-release-candidate`
英語魂(iwasaki-naisou-website)は **1行も変更していない**。

---

## 0. 最初に確認したこと(実コードの根拠つき)

| 確認項目 | 結果 |
|---|---|
| 同一リポか別リポか | **別リポ・別デプロイ**。toniolab.com = `Desktop/フォルダ/english-quest-rpg`、英語魂 = `iwasaki-naisou-website`。どちらも Vercel(`x-vercel-id` ヘッダで確認)。Cloudflare はDNS/CDNのみ |
| 共有しているもの | 実行時のコード共有は無し(2026-03に「iwasaki の英語アプリを丸ごとコピー」した履歴があるだけ)。D1(`iwasaki-phrases`)だけを RPG 側の4つの API route が REST で読んでいた(`training-init`, `life-diary`, `life-diary-replies`, `life-recordings`) |
| とにおラボの保存方式 | `/english/layout.tsx` が `installLocalApi()` で `window.fetch` を差し替え、`/api/*` を全部 localStorage(`tl_*`)で受ける。**学習データはすべて端末内**。認証なし、middleware なし |
| 既存の学習・復習・記録 | 日本語→英語の想起+自己評価の画面は 百日課程(2値の「言えた」)、practice(Again/Good/Easy、自分で登録した表現のみ)、jp-yt-v2(2値)。**curated な教材で3段階評価+間隔復習をするものは無かった**。記録は 365/my-training/quest など8か所以上の別キーに散在 |
| 無料・有料 | 学習機能は全部無料・登録不要。有料は note メンバーシップ(¥100/月表記)、コーチング、1対1サービス(¥5,000)。課金処理はサイト内に無い(外部noteへの導線) |
| 作業ツリー | RPG は `main` でクリーン(`tsconfig.tsbuildinfo` のみ変更)。ブランチを切って作業。iwasaki 側の worktree も変更なし |
| 公開画面の説明と実装の差 | サイドバー・初回説明・manifest が「英語魂 / EIGODAMASHII」のまま(root の metadata は とにおラボ)。`/english/home` の「13本のアプリ」には作者個人のエラー帳(mistakes)が混在。`/api/training-init` は作者の D1(phrases/phrase_mastery/phrase_links 約1万行)を**無認証で返す**が UI からは使われていない |

## 1. 採用・統合・移動・除外

| 現在の機能 | 方針 | 統合先 / 置き場 | 理由 |
|---|---|---|---|
| 百日課程(`/english/course`) | **3. 統合**(中身を採用、ページは残す) | 今日の練習の既定教材。good 評価は `course:learned` にも足す | 1,000表現が頻度順・日本語・メモ付き。既存ページの海図と進捗はそのまま |
| 英会話マスター365 | 1. 既存を使う + 教材として接続 | 教材一覧(deck `m365`)、ページは従来どおり | 3,650表現、1日本語に4英語。ページの独自進捗(`master-365-mastery` 等)には触らない |
| 日本語から学ぶ / ひとこと英語帳(俺語録) | 1 + 教材として接続 | 教材一覧(deck `nihongo` / `goroku`) | 同じ練習体験に流せる静的教材 |
| 自分で登録した表現(`my-training-phrases`, `rpg_custom_phrases`) | 1 + 教材として接続 | 教材一覧(deck `mine`、登録がある人だけ表示) | 既存の登録ボタンを活かす |
| 耳の診断(`/english/ear`) | 4. 標準画面から外す(任意に) | 玄関の小リンク + 教材「読む・聞く」 | 開始条件にしない。`ear:result` は読まない |
| Daily Training / Practice Drills(`/english/my-training`) | 1. 既存 | 教材「ほかの練習ツール」+ 365のサブ目次 | 選択式ドリルは別物として残す |
| 旧 `/english/practice`(Again/Good/Easy) | 5. 未掲載で残置 | リンクなし | `tl_mastery` 互換のため改変せず。新しい流れが代替 |
| `/english/training`(ガチャ・7段階・GOD GRID・TIME ATTACK・XP/REPS/SPARKS) | 4. 詳細・追加機能へ | 教材「ほかの練習ツール」の最後 | 通常の練習画面には出さない。データは従来キーのまま |
| `/english/dashboard` | 4. 置き換え(ページは残す) | 新 `/english/record` が記録の正面 | 旧ダッシュボードは XP/レベル中心 |
| 英作文・英検(`/english/write`, `/english/writepass`)/ 居酒屋TOEIC | 1. 既存 | 教材「試験対策」。中にいる時だけサイドバーに目次 | 会話練習と区別して選べる |
| 新聞(`/english/newspaper`)/ Movie Harvest | 1. 既存 | 教材「読む・聞く」 | |
| 作者の学習記録(`/english/grind`, `/english/my-log`) | 読み物へ | 案内ページ「読み物」(grind のみ)。目次からは外す | 作者が SEO 付きで公開している記事。利用者の記録ではないと明記 |
| `/english/mistakes`, `/english/satsu`, `/english/journey`, `/english/sessions` | 5. 個人用として分離 | リンクなし + `noindex, nofollow`(layout.tsx 追加) | 作者の誤り帳・note統計・私的な会話音源。URL は作者用に残す |
| `/english/strategy`, `/english/dashboard-v2`(+ `dashboard-backlog.ts`) | 5. **削除** | — | 開発ロードマップ/バックログ。運営用。git で戻せる |
| `/api/training-init` | 5. **削除** | — | 作者の D1 を無認証で配信。UI は shim が受けるので誰も使っていない。英語魂側に同名 route は無く影響なし |
| `/english/journal`, `/english/pro`, `/memoria`, `/english/requiem`, DMM公開レッスン, note一覧 | 読み物へ | 案内ページ「読み物」 | 毎日の練習画面と同じ重さで並べない |
| コーチング / メンバーシップ / TONIO STACK / 1対1サービス | 案内へ | 案内ページ「講座・サービス」 | 料金・条件は変更していない |
| 旧 WelcomeFlow(英語魂の5画面説明) | 5. 削除 | — | 初回に説明を強制しない。`tl_welcome_seen` は互換のため立てる |
| 旧 `/english/home` の「13本のアプリ」 | 整理 | 教材「ほかの練習ツール(実験版)」に11本(個人用を除外) | |

## 2. 新しい画面構成

```
/english/home       今日の練習(玄関)  … 練習をはじめる / 続きから / 今日はここまで。いまの教材、今日・復習待ち・連続
/english/today      練習の本体         … 日本語 → 英語を見る(音声) → すぐ言えた/少し迷った/出てこなかった → 次へ → 今日はここまで
/english/materials  教材               … 会話の表現(百日課程=おすすめ / 365 / 日本語から学ぶ / ひとこと英語帳 / 自分の表現)、試験対策、読む・聞く、ほかの練習ツール(折りたたみ)
/english/record     記録               … 今日 / 復習待ち / 連続 / 最後の日、最近7日、復習する表現、教材ごとの枚数、詳しい履歴(折りたたみ)
/english/info       使い方・案内       … 使い方、保存と音声のこと、サイト説明、読み物、講座・サービス、設定、問い合わせ
```
- PC: 左サイドバー = 上の3つ + 「いま使っている教材」(TOEIC/365/ライトパス/百日課程の中にいる時だけ目次) + そのほか(案内・設定・ホーム画面に追加)
- スマホ: 上にブランド+メニュー、下に3タブ(今日の練習/教材/記録)。横スクロール無し(実測 scrollWidth 375 = innerWidth)
- 先生が生徒に渡す URL: `https://www.toniolab.com/english/today?deck=course`(初回は自動で5問)

## 3. 主な変更箇所と、英語魂への影響を防いだ方法

**英語魂への波及ゼロの根拠**: 別リポ・別デプロイ。今回の変更は english-quest-rpg の branch にだけ入っている。共有しているのは D1 だけだが、新機能は D1 を読みも書きもしない(全部 localStorage)。削除した `/api/training-init` は D1 を読むだけの route で、英語魂側のコードはこれを呼んでいない(英語魂の `TrainingClient.tsx` の fallback は自サイトの同名 route を指し、そこに route は存在しない)。

新規:
- `src/lib/english/practice/engine.ts` 復習エンジン。Leitner 5箱(1/3/7/14/30日、`types/review.ts` の定数を共有)× SM-2 ease。**ローカル日付**で日を切る(既存 `srs-engine.ts` は UTC で日本では朝9時に日が変わるため再利用しなかった)。評価は good=箱+1 / hard=箱-1(ease-0.15) / again=箱1・明日
- `src/lib/english/practice/decks.ts` 教材台帳と遅延読み込み(365 は 6.9MB なので選んだ時だけ import)
- `src/lib/english/practice/tts.ts` 端末の音声合成。非対応なら理由を表示してボタン無効
- `src/components/english/public/{ui,PublicTabBar}.tsx`
- `src/app/english/{today,materials,record,info}/`、`home/layout.tsx` 他の metadata
- `tests/practice-engine.test.mts`(6本、`npx tsx` で実行)

変更:
- `src/app/english/home/page.tsx` 玄関を書き直し / `src/app/english/layout.tsx` WelcomeFlow 削除、下タブ追加 / `src/components/EnglishSidebar.tsx` 再構成・改名
- `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts`, `public/manifest.json`, `install/page.tsx`: 名称を「とにおラボ / TONIO LAB」に統一、URL は `src/lib/site.ts` の定数から
- `src/app/page.tsx` 練習データがある人も `/english/home` へ / `settings/page.tsx` リセット対象に新キーを追加 / `world-map-6` の消えたリンク先を修正

削除: `src/app/api/training-init/`, `src/app/english/strategy/`, `src/app/english/dashboard-v2/`, `src/data/english/dashboard-backlog.ts`, `public/robots.txt`, `public/sitemap.xml`(route 版と衝突し dev で500。本番は route 版が出ていた)

## 4. 保存データの保全・移行

- 新キーは `tonio-practice:cards` / `tonio-practice:state` / `tonio-practice:log` の3つだけ。既存キーは **読むだけ**(`course:learned`, `my-training-phrases`, `rpg_custom_phrases`)
- 例外は `course:learned`(百日課程の「言えた」集合)に good のとき **足すだけ**。配列でない値が入っていたら触らない
- 読めない保存値は `<key>.backup-<時刻>` に退避してから上書き(元データを失わない)。テストで確認
- 二度押しは同じカードを一度しか数えない。日付はローカルで切る。進行中のセットは保存され「続きから」で再開
- 移行は不要(新規キー)。初期化もしない。作者の履歴を初期データとして複製していない(全教材は静的データ、記録は空から)
- 教材 ID は中身の文字列から作る(`c1000:<英語>`, `m365:<day>:<日本語>` 等)。並び替え・追加で既存記録とずれない
- 設定画面の「進捗リセット」(利用者が押した時だけ)に新キーを追加

## 5. 実際に確認した内容と結果

| 確認 | 方法 | 結果 |
|---|---|---|
| 型チェック | `npx tsc --noEmit` | 新規・書き直しファイルにエラー 0。残りは既存のもの(LP の framer-motion Variants、d3 の型) |
| エンジンの単体テスト | `npx tsx tests/practice-engine.test.mts` | 6/6 通過(ローカル日付・月跨ぎ、評価→間隔、セット構成、他キー不変・二度押し、壊れた値の退避、連続日数) |
| 新規状態で短い練習を開始・完了 | 内蔵ブラウザ、`localhost:3000`(保存データなし) | 5問の新規セット → 英語表示・メモ・3ボタン → 「今日はここまで」で内訳と出てこなかった表現2つを表示 |
| キーボード操作 | Enter で表示、1/2/3 で評価 | 動作。フォーカス表示は `focus-visible` の金色アウトライン |
| 再読み込み・再訪 | `/english/home`, `/english/record` を再表示 | 玄関は「今日はここまで」状態、記録は今日5問・連続1日・最近7日の今日に 5 |
| 途中でやめて続き | `127.0.0.1:3000` で2問評価後に離脱 → 玄関 | 「残り3問 / 続きから」→ `/english/today` が 3/5 から再開 |
| 既存データの保全 | 旧キー(`course:learned`, `master-365-mastery`, `quest-mastery`, `365-checkin-streak`)を入れてから練習 | 3キーは完全一致で不変。`course:learned` は `["come on"]` → `["come on","you know"]`(good の1件だけ追加) |
| 教材の切替・先生用URL | `/english/today?deck=m365&extra=1` | 365 を遅延読み込みして「英会話マスター365 ・ Day 1 / はじめまして」から開始。URL の query は開始後に消える |
| スマホ | 375×812 で `/english/home`, `/english/record`, `/english/izakaya-toeic/kaiwa` | 下タブ表示、`scrollWidth === innerWidth`(横スクロール無し)、サイドバーは -260px に収納、既存の365ページも表示 |
| PC | 1280×800 | 左サイドバーに3項目、居酒屋TOEIC の中では目次ブロック |
| 除外の確認 | curl | `/english/strategy`, `/english/dashboard-v2`, `/api/training-init` = 404。`/english/mistakes` に `noindex, nofollow`。`/english/home`, `/install` に「英語魂」0件 |
| robots / sitemap / manifest | curl | route 版が配信され、名称・start_url が とにおラボ。公開5画面と教材を sitemap に掲載 |
| コンソール・サーバーログ | read_console_messages / preview_logs | エラーなし |
| 本番ビルド | `npm run build` | 下記「ビルド結果」 |

ビルド結果: `npm run build` 成功(Compiled successfully in 63s、静的ページ 324/324 生成、exit 0)。dev サーバーを止めてから実行(同時実行は .next を壊すため)

## 6. プレビューの見方

```bash
npm --prefix "C:/Users/thaat/Desktop/フォルダ/english-quest-rpg" run dev
```
- http://localhost:3000/english/home (今日の練習) → 練習をはじめる
- http://localhost:3000/english/materials / /english/record / /english/info
- 新規利用者として試すなら、別オリジン http://127.0.0.1:3000/english/home を使う(localStorage が別になるので、いまのデータを消さずに済む)
- Claude の内蔵ブラウザ(Code タブの Browser ペイン)の `localhost:3000` には今回の検証データ(5問分)が残っている。消したい場合は「設定 → 進捗リセット」

## 7. 未確認事項と公開前の残作業

1. **Vercel の環境変数 `NEXT_PUBLIC_SITE_URL` が iwasaki-naisou.com のまま**(live の `og:url` が `https://iwasaki-naisou.com`)。メタデータはコード側で `src/lib/site.ts` に固定して回避したが、他の用途もあるので Vercel 側で `https://www.toniolab.com` に直すべき(私からは変更していない)
2. 実機の音声合成(iOS Safari / Android Chrome)は未確認。内蔵ブラウザでは対応判定のみ確認。非対応端末向けの文言は実装済み
3. `/api/life-*`(メンバーシップの Life)は書込・削除に認証がない、`/membership/life/admin` は無ゲート、`/voice-lab` は平文パスワード。既存の会員機能・運営機能で今回の範囲外のため未変更。公開前に別途対処を推奨
4. 365 の遅延読み込みは dev で 6.9MB のモジュール。本番ビルドでは圧縮されるが、初回の切替に数秒かかる端末があり得る(読み込み中表示あり)
5. 日付切替の実機確認(23:59→0:00 をまたいだセット)は単体テストのみ。評価時刻の日付で記録する設計
6. 「ほかの練習ツール」に残した実験版11本の中身の品質は今回未監査(リンクのみ)
7. 百日課程の YouTube クリップ(554表現)は外部リンク(別タブ)として任意表示。埋め込みはしていない

## 8. 本番反映と戻し方

反映(本人の指示があってから):
```bash
cd "C:/Users/thaat/Desktop/フォルダ/english-quest-rpg"
git checkout main
git merge --no-ff claude/toniolab-release-candidate
git push origin main        # Vercel が自動デプロイ
```
DNS の変更は不要(toniolab.com は既にこのプロジェクト)。

戻し方:
- Vercel ダッシュボード → Deployments → 直前のデプロイを「Promote / Instant Rollback」(数十秒)
- または `git revert -m 1 <merge commit>` して push
- 利用者の端末データは新キーだけなので、戻しても既存キーは無傷。新キー `tonio-practice:*` は旧版では読まれないだけ

## 判断の記録

- **3段階評価と Leitner の対応**: すぐ言えた=good(箱+1)、少し迷った=hard(箱-1、早めに再出題)、出てこなかった=again(箱1、明日)。4段階(easy)は出さない。「正解判定はしていません」を画面に明記
- **1セット**: 復習は最大10、新規は1日5。初回は復習が無いので5問で終わる。「もう1セット」で新規は1日20まで
- **全教材の復習を1本に**: 教材を切り替えても、期限が来た復習は教材をまたいで出す(新規だけ選んだ教材から)
- **旧 practice を残した理由**: `tl_mastery` 互換を壊さないため。未掲載
- **grind / my-log を noindex にしなかった理由**: 作者が意図して SEO 付きで公開している記事と判断。「作者の記録、あなたの記録ではない」と注記して読み物に置いた
- **ダークな大きい箱を使わなかった**: サイトの規約(白・stone・金・緑、ダーク背景禁止)に合わせた
