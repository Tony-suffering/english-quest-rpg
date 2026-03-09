-- あいおいニッセイ同和損保ビル 施工実績追加
-- engineworks.iwasaki@gmail.com用の工事記録
-- 日付: 2025-07-26

INSERT INTO website_projects (
  title,
  category,
  location,
  completion_date,
  description,
  image_url
) VALUES (
  'あいおいニッセイ同和損保ビル 共用通路床T/C貼替工事',
  '店舗・オフィス',
  '東京都千代田区二番町5-6',
  '2025-07-26',
  '共用通路床タイルカーペット貼替工事。既存床材の撤去から下地調整、新規T/C施工まで一貫対応。',
  NULL  -- 写真なし
);

-- 追加したレコードを確認
SELECT * FROM website_projects
WHERE title LIKE '%あいおいニッセイ%'
ORDER BY id DESC
LIMIT 1;
