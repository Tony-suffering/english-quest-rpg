-- あいおいニッセイ同和損保ビル 工事記録追加
-- before_photo_url が NOT NULL のため、ダミー画像URLを使用

INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  before_photo_url,
  after_photo_url,
  work_description
) VALUES (
  'fa08c261-d909-47c1-880a-7f49f6dd9558',
  'あいおいニッセイ同和損保ビル',
  '2025-07-26',
  '東京都千代田区二番町5-6',
  35.6646912,
  139.7360896,
  'https://placehold.co/800x600?text=No+Photo',  -- ダミー画像
  'https://placehold.co/800x600?text=No+Photo',  -- ダミー画像
  '共用通路床T/C貼替工事'
);

-- 確認
SELECT * FROM work_records
WHERE site_name = 'あいおいニッセイ同和損保ビル'
ORDER BY created_at DESC
LIMIT 1;
