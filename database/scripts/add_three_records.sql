-- 3件の工事記録を追加
-- engineworks.iwasaki@gmail.com (fa08c261-d909-47c1-880a-17d91629fb54)

-- 1. 日原ビル5階 (2025.07.27)
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude
) VALUES (
  'fa08c261-d909-47c1-880a-17d91629fb54',
  '日原ビル5階 床T/C貼替工事',
  '2025-07-27',
  '東京都中央区日本橋茅場町1-5-2',
  35.6803,
  139.7788
);

-- 2. 共同ビル4階トイレブース更新 (2025.09.28)
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude
) VALUES (
  'fa08c261-d909-47c1-880a-17d91629fb54',
  '共同ビル4階トイレブース更新 4階男子トイレブース更新',
  '2025-09-28',
  '東京都中央区日本橋室町4-1-5',
  35.6872,
  139.7761
);

-- 3. 日原ビル2階 (2025.07.03)
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude
) VALUES (
  'fa08c261-d909-47c1-880a-17d91629fb54',
  '日原ビル2階 床T/C貼替工事',
  '2025-07-03',
  '東京都中央区日本橋茅場町1-5-2',
  35.6803,
  139.7788
);

-- 確認
SELECT
  id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude
FROM work_records
WHERE user_id = 'fa08c261-d909-47c1-880a-17d91629fb54'
ORDER BY work_date DESC;
