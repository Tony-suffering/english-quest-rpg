# DMM 365

その日 集めた英語表現を カレンダー形式で管理。 DMM やった日 / やらない日 どちらも記録できる。

## URL

`/english/training/dmm365` (これだけ)

## 機能

1. **月カレンダー** — 各日に「今日集めた表現の数」と DMMバッジ (lesson あれば)
2. **日クリック → 単体ビュー** — 下に展開
   - **表現タブ**: その日の英語表現を きれいに並べる (英語大、 日本語小、 番号 01/02/03...)
     - クリックで inline edit
     - hover で × ボタン
     - 「+ 表現を追加」 / 「Excel から貼り付け」
   - **DMM会話タブ**: DMM lesson # 入力 + その日の transcript 一覧 (link to /training/dmm/[id])

3. **status state machine 無し**。 表現リスト + DMM紐付け、 ただそれだけ

## Excel から一括 import

```
npm run dmm365:import:dry  # 確認
npm run dmm365:import       # 本番投入
```

`Desktop/管理.xlsx` の DMM シート想定。

## API

```
GET  /api/dmm365                             全 sessions + stats
GET  /api/dmm365?init=true                   テーブル init
POST /api/dmm365/sessions                    session 作成 (reuse_if_date_exists OK)
GET  /api/dmm365/sessions/:id                session 詳細 (with ammo)
PUT  /api/dmm365/sessions/:id                session update
DELETE /api/dmm365/sessions/:id              session delete
POST /api/dmm365/sessions/:id/ammo           ammo 追加 (単一 or items[])
POST /api/dmm365/sessions/:id?action=sync-to-phrases  /training の phrases に sync
PUT  /api/dmm365/ammo/:id                    ammo update
DELETE /api/dmm365/ammo/:id                  ammo delete
POST /api/dmm365/ammo/reorder                sort_order bulk 更新
GET  /api/dmm365/export?format=json|csv      バックアップ
POST /api/dmm365/import                      JSON 復元
```

## DB schema

```sql
dmm365_sessions (id, session_number, date, teacher, title, notes, ...)
  -- session_number は DMM lesson # (任意、 DMM やらない日は null/0)

dmm365_ammo (id, session_id, sort_order, english, japanese, source, status, correction, reaction_note, ...)
  -- status/correction/reaction_note は schema には残ってるが UI では使わない (将来用)
```

## AI 機能について

AI (翻訳・解説・抽出) は **Claude Code のチャットで対応**。 アプリは pure data store。

例:
- 「この日本語 4つ 英語にして dmm365 に追加」 → Claude が訳して直接 API 叩いて投入
- 「screenshot のExcel JSON 化して」 → Claude が解析して登録分まで一気に
- 「この表現 nuance 教えて」 → Claude が解説

## 既存 /training/dmm との関係

- `/training/dmm` = DMM 会話の transcript ダンプ管理 (生徒/講師の往復、 native書き換え、 engaged書き換え)
- `/training/dmm365` = 日々の表現リスト (DMM やる日 / やらない日 両方)
- 同じ日付の dmm_conversations は dmm365 カレンダーの DMM会話タブ から見える
