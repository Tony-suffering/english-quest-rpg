-- あいおいニッセイ同和損保ビル 工事記録追加
-- スクリーンショットに表示されているカラムのみ使用

INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude
) VALUES (
  'fa08c261-d909-47c1-880a-7f49f6dd9558',
  'あいおいニッセイ同和損保ビル 共用通路床T/C貼替工事',
  '2025-07-26',
  '東京都千代田区二番町5-6',
  35.6646912,
  139.7360896
);

-- 確認
SELECT * FROM work_records
WHERE site_name LIKE '%あいおいニッセイ%'
ORDER BY created_at DESC
LIMIT 1;
