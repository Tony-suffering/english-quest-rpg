-- あいおいニッセイ同和損保ビル 工事記録追加
-- 正しい user_id を使用: fa08c261-d909-47c1-880a-17d91629fb54

INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude
) VALUES (
  'fa08c261-d909-47c1-880a-17d91629fb54',
  'あいおいニッセイ同和損保ビル 共用通路床T/C貼替工事',
  '2025-07-26',
  '東京都千代田区二番町5-6',
  35.6646912,
  139.7360896
);

-- 確認
SELECT
  w.*,
  u.email
FROM work_records w
JOIN auth.users u ON w.user_id = u.id
WHERE w.site_name LIKE '%あいおいニッセイ%'
ORDER BY w.created_at DESC
LIMIT 1;
