-- ========================================
-- 既存データの緯度経度補完スクリプト
-- ========================================
-- 目的: 緯度経度がNULLのwork_recordsレコードに対して、
--       現場名や住所から推測した緯度経度を自動補完する

-- 実行前の状態確認
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE '緯度経度補完スクリプト開始';
  RAISE NOTICE '========================================';
END $$;

-- 補完前の統計
SELECT
  '補完前' as "タイミング",
  COUNT(*) as "全レコード数",
  COUNT(CASE WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN 1 END) as "緯度経度あり",
  COUNT(CASE WHEN latitude IS NULL OR longitude IS NULL THEN 1 END) as "緯度経度なし"
FROM work_records;

-- ========================================
-- 緯度経度補完処理
-- ========================================

-- 現場名や住所から推測して緯度経度を補完
UPDATE work_records
SET
  latitude = CASE
    -- 千代田区
    WHEN (site_name ILIKE '%千代田%' OR location_name ILIKE '%千代田%') THEN 35.6940
    WHEN (site_name ILIKE '%二番町%' OR location_name ILIKE '%二番町%') THEN 35.6937
    WHEN (site_name ILIKE '%神田%' OR location_name ILIKE '%神田%') THEN 35.6910

    -- 墨田区
    WHEN (site_name ILIKE '%墨田%' OR location_name ILIKE '%墨田%') THEN 35.7100
    WHEN (site_name ILIKE '%業平%' OR location_name ILIKE '%業平%') THEN 35.7080
    WHEN (site_name ILIKE '%押上%' OR location_name ILIKE '%押上%') THEN 35.7101
    WHEN (site_name ILIKE '%両国%' OR location_name ILIKE '%両国%') THEN 35.6970

    -- 江東区
    WHEN (site_name ILIKE '%江東%' OR location_name ILIKE '%江東%') THEN 35.6732
    WHEN (site_name ILIKE '%豊洲%' OR location_name ILIKE '%豊洲%') THEN 35.6544
    WHEN (site_name ILIKE '%東陽町%' OR location_name ILIKE '%東陽町%') THEN 35.6709
    WHEN (site_name ILIKE '%木場%' OR location_name ILIKE '%木場%') THEN 35.6720
    WHEN (site_name ILIKE '%門前仲町%' OR location_name ILIKE '%門前仲町%') THEN 35.6713

    -- 中央区
    WHEN (site_name ILIKE '%中央%' OR location_name ILIKE '%中央%') THEN 35.6704
    WHEN (site_name ILIKE '%銀座%' OR location_name ILIKE '%銀座%') THEN 35.6717
    WHEN (site_name ILIKE '%日本橋%' OR location_name ILIKE '%日本橋%') THEN 35.6828

    -- 港区
    WHEN (site_name ILIKE '%港区%' OR location_name ILIKE '%港区%') THEN 35.6585
    WHEN (site_name ILIKE '%六本木%' OR location_name ILIKE '%六本木%') THEN 35.6627
    WHEN (site_name ILIKE '%赤坂%' OR location_name ILIKE '%赤坂%') THEN 35.6741

    -- 新宿区
    WHEN (site_name ILIKE '%新宿%' OR location_name ILIKE '%新宿%') THEN 35.6938

    -- 渋谷区
    WHEN (site_name ILIKE '%渋谷%' OR location_name ILIKE '%渋谷%') THEN 35.6617

    -- 品川区
    WHEN (site_name ILIKE '%品川%' OR location_name ILIKE '%品川%') THEN 35.6092

    -- 台東区
    WHEN (site_name ILIKE '%台東%' OR location_name ILIKE '%台東%') THEN 35.7101
    WHEN (site_name ILIKE '%浅草%' OR location_name ILIKE '%浅草%') THEN 35.7123
    WHEN (site_name ILIKE '%上野%' OR location_name ILIKE '%上野%') THEN 35.7141

    -- その他東京都内
    WHEN (site_name ILIKE '%東京%' OR location_name ILIKE '%東京%') THEN 35.6895

    -- デフォルト: 東京駅周辺
    ELSE 35.6895
  END,
  longitude = CASE
    -- 千代田区
    WHEN (site_name ILIKE '%千代田%' OR location_name ILIKE '%千代田%') THEN 139.7536
    WHEN (site_name ILIKE '%二番町%' OR location_name ILIKE '%二番町%') THEN 139.7433
    WHEN (site_name ILIKE '%神田%' OR location_name ILIKE '%神田%') THEN 139.7710

    -- 墨田区
    WHEN (site_name ILIKE '%墨田%' OR location_name ILIKE '%墨田%') THEN 139.8100
    WHEN (site_name ILIKE '%業平%' OR location_name ILIKE '%業平%') THEN 139.8107
    WHEN (site_name ILIKE '%押上%' OR location_name ILIKE '%押上%') THEN 139.8134
    WHEN (site_name ILIKE '%両国%' OR location_name ILIKE '%両国%') THEN 139.7941

    -- 江東区
    WHEN (site_name ILIKE '%江東%' OR location_name ILIKE '%江東%') THEN 139.8170
    WHEN (site_name ILIKE '%豊洲%' OR location_name ILIKE '%豊洲%') THEN 139.7955
    WHEN (site_name ILIKE '%東陽町%' OR location_name ILIKE '%東陽町%') THEN 139.8206
    WHEN (site_name ILIKE '%木場%' OR location_name ILIKE '%木場%') THEN 139.8082
    WHEN (site_name ILIKE '%門前仲町%' OR location_name ILIKE '%門前仲町%') THEN 139.7957

    -- 中央区
    WHEN (site_name ILIKE '%中央%' OR location_name ILIKE '%中央%') THEN 139.7714
    WHEN (site_name ILIKE '%銀座%' OR location_name ILIKE '%銀座%') THEN 139.7645
    WHEN (site_name ILIKE '%日本橋%' OR location_name ILIKE '%日本橋%') THEN 139.7744

    -- 港区
    WHEN (site_name ILIKE '%港区%' OR location_name ILIKE '%港区%') THEN 139.7514
    WHEN (site_name ILIKE '%六本木%' OR location_name ILIKE '%六本木%') THEN 139.7291
    WHEN (site_name ILIKE '%赤坂%' OR location_name ILIKE '%赤坂%') THEN 139.7365

    -- 新宿区
    WHEN (site_name ILIKE '%新宿%' OR location_name ILIKE '%新宿%') THEN 139.7034

    -- 渋谷区
    WHEN (site_name ILIKE '%渋谷%' OR location_name ILIKE '%渋谷%') THEN 139.7040

    -- 品川区
    WHEN (site_name ILIKE '%品川%' OR location_name ILIKE '%品川%') THEN 139.7303

    -- 台東区
    WHEN (site_name ILIKE '%台東%' OR location_name ILIKE '%台東%') THEN 139.7798
    WHEN (site_name ILIKE '%浅草%' OR location_name ILIKE '%浅草%') THEN 139.7965
    WHEN (site_name ILIKE '%上野%' OR location_name ILIKE '%上野%') THEN 139.7744

    -- その他東京都内
    WHEN (site_name ILIKE '%東京%' OR location_name ILIKE '%東京%') THEN 139.6917

    -- デフォルト: 東京駅周辺
    ELSE 139.6917
  END
WHERE
  (latitude IS NULL OR longitude IS NULL)
  AND (site_name IS NOT NULL OR location_name IS NOT NULL);

-- 補完後の統計
SELECT
  '補完後' as "タイミング",
  COUNT(*) as "全レコード数",
  COUNT(CASE WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN 1 END) as "緯度経度あり",
  COUNT(CASE WHEN latitude IS NULL OR longitude IS NULL THEN 1 END) as "緯度経度なし（手動対応必要）"
FROM work_records;

-- ========================================
-- 補完できなかったレコードの確認
-- ========================================

-- まだ緯度経度がNULLのレコードを表示
SELECT
  id,
  site_name,
  location_name,
  work_date,
  '⚠️ 手動で緯度経度を設定してください' as "対応"
FROM work_records
WHERE latitude IS NULL OR longitude IS NULL
ORDER BY work_date DESC;

-- ========================================
-- 完了メッセージ
-- ========================================

DO $$
DECLARE
  補完数 INTEGER;
  残数 INTEGER;
BEGIN
  SELECT COUNT(*) INTO 補完数
  FROM work_records
  WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

  SELECT COUNT(*) INTO 残数
  FROM work_records
  WHERE latitude IS NULL OR longitude IS NULL;

  RAISE NOTICE '========================================';
  RAISE NOTICE '緯度経度補完完了！';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ 地図表示可能: % レコード', 補完数;

  IF 残数 > 0 THEN
    RAISE NOTICE '⚠️ 要手動対応: % レコード', 残数;
    RAISE NOTICE '※ 上記のレコードは現場名・住所が不明なため自動補完できませんでした';
    RAISE NOTICE '※ 手動で緯度経度を設定してください:';
    RAISE NOTICE '   UPDATE work_records SET latitude = XX.XXXX, longitude = XXX.XXXX WHERE id = ''xxx'';';
  ELSE
    RAISE NOTICE '✅ 全レコードに緯度経度が設定されました！';
  END IF;

  RAISE NOTICE '========================================';
END $$;

-- ========================================
-- 地図表示用クイックチェック
-- ========================================

-- 地図に表示されるレコードの一覧
SELECT
  site_name as "現場名",
  work_date as "施工日",
  location_name as "住所",
  latitude as "緯度",
  longitude as "経度",
  CASE
    WHEN after_photo_url IS NOT NULL THEN '✅'
    ELSE '⚠️ 施工前のみ'
  END as "写真"
FROM work_records
WHERE latitude IS NOT NULL AND longitude IS NOT NULL
ORDER BY work_date DESC;
