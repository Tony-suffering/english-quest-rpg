-- あいおいニッセイ同和損保ビルの座標を正確な位置に更新
-- 千代田区二番町5-6 の正確な座標

UPDATE work_records
SET
  latitude = 35.6886,
  longitude = 139.7440,
  updated_at = NOW()
WHERE site_name LIKE '%あいおいニッセイ%';

-- 確認
SELECT
  id,
  site_name,
  location_name,
  latitude,
  longitude,
  work_date
FROM work_records
WHERE site_name LIKE '%あいおいニッセイ%';
