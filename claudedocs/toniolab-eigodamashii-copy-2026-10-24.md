# とにおラボに英語魂をそのまま再現する(2026-10-24)

ブランチ: `claude/toniolab-eigodamashii`(english-quest-rpg、main c9fcdb9 から)
取り込み元: `Tony-suffering/iwasaki-naisou-website` の **origin/main**(5926ea4、第147夜)
本人の選択: 「RPG にコピーして置き換え」。重なる URL は英語魂が勝つ、RPG 独自のものは残す、ドメインは触らない、push は指示後。

前段の「一般向けに整理した3画面(今日の練習/教材/記録)」は本人が却下。その実装(`/english/home` `/english/today` `/english/materials` `/english/record` `/english/info`、`src/lib/english/practice`、`tests/`)はこのブランチで削除した。main には残っている(c9fcdb9)。

---

## 1. やったこと

### 取り込み(`git archive origin/main | tar -x`)
- `src/app/english`(英語魂の全ページ)、`src/app/api`(99 route)、`src/app/memoria`
- `src/components` `src/constants` `src/contexts` `src/data` `src/hooks` `src/lib` `src/store` `src/types` `src/utils`
- `public/audio` `public/icons` `public/journal` `public/data` `public/characters` `public/tonio` と、英語アプリが参照している `public/images/*` の個別ファイル(81 件)。会社サイト用の画像・動画は持ち込まない
- 持ち込まなかったもの: `src/middleware.ts`(会社サイトのホワイトリスト型ゲート。入れると toniolab 全体が noindex になる)、`src/pages`、`src/posts`、`src/content`、会社ページ(`/services` 等)

### 置き換え(RPG 側を先に削除してから展開)
- `/english` 配下で両方にあった 51 route(365 anki arena conversation conversation-log dashboard dictation eikaiwa-lab everyday-words expressions fujin-story goroku harvest idiom-list interpret jp-yt jp-yt-v2 lookup mastery mistakes my-phrases native newspaper nihongo note phrases-v2 practice pro quest reflex requiem review rpg-guide service sessions settings speaking-guide story survival **toeic** tokyo52 tonio-words **training** videos vocabulary world-map world-map-6 write writepass xp-guide youtube)+ `layout.tsx` `page.tsx`
  - `/english/toeic` は居酒屋TOEIC(30夜・17サブページ)から英語魂の **TOEIC L&R フル模試(SCOREPASS)** に変わる
  - `/english/training` は RPG の localStorage 版から英語魂の **D1 連携の本体**に変わる
  - `/english/page.tsx` は `/english/training` へ redirect(英語魂と同じ)
- `/api/life-diary` `/api/life-diary-replies` `/api/life-recordings` は英語魂版に(同じ D1)
- `/memoria` は英語魂版に

### 残した RPG 独自のもの(27 route)
5min about coach collection course dmm-open ear grind izakaya-toeic journal(英語側) journey lisque my-log my-training native365 noren print satsu stack story-vocab wanashi yomique、および `/membership` `/journal` `/dev` `/install` などの英語外。

### つなぎ直し
| 何 | どうした | なぜ |
|---|---|---|
| `/english/layout.tsx` | 英語魂版(サイドバー=英語魂、**local-api の fetch shim なし**) | 英語魂のページは本物の `/api/*` を呼ぶ。shim があると全部 localStorage に吸われる |
| `/english/bookmarks`(RPG) | 削除 | shim 前提で `/api/phrases` を叩く。shim を外すと作者の D1 に書き込んでしまう。用途は英語魂の my-phrases 等と重なる |
| `src/lib/local-api.ts` | 削除 | 参照ゼロ |
| `/english/my-training`(RPG) | `/english/training` へ redirect | RPG 版 TrainingClient のラッパー。本体が英語魂の training になったので統合。`my-training/practice`(選択式ドリル)は残る |
| `src/data/english/five-min-data.ts` | 英語魂版。RPG 版は `five-min-data-toniolab.ts` に退避し `/english/5min` だけがそれを読む | 同じパスで型が別物 |
| `src/components/english/ReviewCalendar.tsx` | 英語魂版。RPG 版は `ReviewCalendar365.tsx` に退避し kaiwa だけがそれを読む | props が別物 |
| root `src/app/layout.tsx` | `M_PLUS_Rounded_1c` を追加(英語魂が `--font-mplus-rounded` を使う)。metadata は とにおラボのまま | |
| `next.config.ts` | `iwasaki-naisou.com` を images.remotePatterns に追加 | |
| `src/app/page.tsx`(LP) | 戻り客の遷移先を `/english/training` に。居酒屋TOEIC カードは **TOEIC フル模試**(`/english/toeic`)の説明に差し替え | `/english/toeic/lp` が無くなり 404 だった |
| `manifest` `sitemap` | start_url `/english`、sitemap を英語魂の主要ページに | |

## 2. 検証

| 確認 | 結果 |
|---|---|
| 型チェック | 1,138 エラー。差分で見ると、取り込みで壊れた RPG 独自ページ(5min / kaiwa / my-training)の 11 件は上の退避・redirect で解消。残りは両リポに元からあるもの(framer-motion の Variants、データ型、英語魂の `english/journal` の `englishSummary`。`src/data/journal.ts` は iwasaki origin/main とバイト一致) |
| HTTP(dev) | `/english`→307→`/english/training`、training / goroku / newspaper / nihongo / memoria / writepass / consult / consult/inbox / reading / training/dmm = 200。`/api/phrases` = 200(RPG 本番と同じ `CLOUDFLARE_API_TOKEN` で作者の D1 に到達)。消したもの(`/english/home` `/english/bookmarks` `/english/toeic/lp`)= 404(LP のリンクは直した) |
| 画面 | `/english/training` が英語魂そのもの(カレンダー、カード、Lv.1 種 SEED、XP/REPS/SPARKS、TIME ATTACK)で D1 の実データを表示。サイドバーは英語魂(とにおGO Lv193 など作者の進捗がそのまま出る)。`/english/goroku`(英語筋トレ)、`/memoria`(エゴの罠シリーズ)も表示。RPG 独自の `/english/5min` と `/english/izakaya-toeic/kaiwa` も表示 |
| 本番との比較 | iwasaki-naisou.com/english/training と同じ UI。**hydration error(#418)は本番 iwasaki でも出ている**(既存)。移植側も同じ |
| 本番ビルド | `npm run build` 成功(Compiled successfully in 2.2min、静的ページ 506/506、exit 0、警告のみ)。dev サーバーを止めてから実行 |
| 取り込みの忠実さ | 展開した各ファイルは iwasaki origin/main の blob と行末(CRLF)以外一致(`src/data/journal.ts` と `src/data/english` 60件で確認)。コミット時に LF へ正規化される |

## 3. プレビュー

```bash
npm --prefix "C:/Users/thaat/Desktop/フォルダ/english-quest-rpg/.claude/worktrees/eigodamashii" run dev
```
http://localhost:3000/english/training(= 英語魂)。launch.json の `toniolab-eigo-dev`。

## 4. 未確認・注意

1. **英語魂の API 99 本が toniolab.com でも無認証で動く**(読み・書き・削除)。iwasaki 本番も `SITE_GATE_PASSWORD` 未設定で同じ状態。toniolab は会社サイトのゲート(middleware)を持ち込んでいないので、これが「そのまま」。作者の D1 は両サイトから同じものが見える
2. toniolab.com の既存利用者の端末データ(居酒屋TOEIC の進捗 `izakaya_toeic_*`、RPG 版 training の `quest-mastery` 等)は端末に残るが、それを読むページが無くなる(`/english/toeic/*`、`/english/training` RPG 版)。消してはいない
3. `public` は 190MB(うち英語魂から約 115MB)。Vercel のデプロイサイズは iwasaki 本番(324MB)より小さいので問題ないはず。未計測
4. 英語魂の `/english/journal` `/english/pro` `/english/note` と RPG の `/journal` `/membership` は同じ `@/data/journal` を読む。RPG の `/journal` ページは英語魂側のジャーナルデータで表示されるようになる(同じ作者の同じ連載なので中身は同系統)。見た目の崩れは未確認
5. iwasaki が更新されたら、同じ手順(`git archive origin/main` → 同名 route 削除 → 展開 → 退避2件)で再コピーする。自動同期は無い

## 5. 反映と戻し

反映(指示後): `cd english-quest-rpg && git checkout main && git merge --no-ff claude/toniolab-eigodamashii && git push origin main`。戻すなら Vercel の Instant Rollback か `git revert -m 1 <merge>`。
