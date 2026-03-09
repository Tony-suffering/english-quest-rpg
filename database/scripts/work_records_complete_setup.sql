-- ========================================
-- 地図表示対応: work_recordsテーブル完全セットアップ
-- ========================================
-- 実行日: 2025-10-14
-- 目的: work_recordsテーブルを作成し、地図表示に必要な設定を行う

-- ========================================
-- 1. work_recordsテーブルの作成（存在しない場合）
-- ========================================

CREATE TABLE IF NOT EXISTS work_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  site_name TEXT NOT NULL,
  work_date DATE NOT NULL DEFAULT CURRENT_DATE,
  location_name TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  before_photo_url TEXT NOT NULL,
  after_photo_url TEXT,  -- NULLを許可
  memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- コメント追加
COMMENT ON TABLE work_records IS '職人の工事記録（地図表示対応）';
COMMENT ON COLUMN work_records.latitude IS '緯度（地図表示に必須）';
COMMENT ON COLUMN work_records.longitude IS '経度（地図表示に必須）';
COMMENT ON COLUMN work_records.after_photo_url IS '施工後写真URL（NULLの場合はbefore_photo_urlを使用）';

-- ========================================
-- 2. 既存データの緯度経度補完
-- ========================================

-- 緯度経度がNULLのレコードに、現場名から推測して位置情報を補完
UPDATE work_records
SET
  latitude = CASE
    WHEN site_name ILIKE '%墨田%' THEN 35.7100
    WHEN site_name ILIKE '%江東%' THEN 35.6732
    WHEN site_name ILIKE '%千代田%' OR site_name ILIKE '%二番町%' THEN 35.6940
    WHEN site_name ILIKE '%豊洲%' THEN 35.6544
    WHEN site_name ILIKE '%押上%' THEN 35.7101
    WHEN site_name ILIKE '%業平%' THEN 35.7080
    WHEN site_name ILIKE '%東陽町%' THEN 35.6709
    ELSE 35.6895
  END,
  longitude = CASE
    WHEN site_name ILIKE '%墨田%' THEN 139.8100
    WHEN site_name ILIKE '%江東%' THEN 139.8170
    WHEN site_name ILIKE '%千代田%' OR site_name ILIKE '%二番町%' THEN 139.7536
    WHEN site_name ILIKE '%豊洲%' THEN 139.7955
    WHEN site_name ILIKE '%押上%' THEN 139.8134
    WHEN site_name ILIKE '%業平%' THEN 139.8107
    WHEN site_name ILIKE '%東陽町%' THEN 139.8206
    ELSE 139.6917
  END
WHERE latitude IS NULL OR longitude IS NULL;

-- ========================================
-- 3. 地図表示用ビュー
-- ========================================

CREATE OR REPLACE VIEW work_records_map_view AS
SELECT
  id,
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  COALESCE(after_photo_url, before_photo_url) as display_photo_url,
  before_photo_url,
  after_photo_url,
  memo,
  created_at
FROM work_records
WHERE
  latitude IS NOT NULL
  AND longitude IS NOT NULL
  AND before_photo_url IS NOT NULL
ORDER BY work_date DESC;

COMMENT ON VIEW work_records_map_view IS '地図表示用の工事記録ビュー（緯度経度・写真必須）';

-- ========================================
-- 4. インデックス作成
-- ========================================

CREATE INDEX IF NOT EXISTS idx_work_records_user_id ON work_records(user_id);
CREATE INDEX IF NOT EXISTS idx_work_records_work_date ON work_records(work_date DESC);
CREATE INDEX IF NOT EXISTS idx_work_records_lat_lng ON work_records(latitude, longitude)
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_work_records_map_display ON work_records(work_date DESC, latitude, longitude)
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- ========================================
-- 5. RLSポリシー
-- ========================================

ALTER TABLE work_records ENABLE ROW LEVEL SECURITY;

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Users can view own records" ON work_records;
DROP POLICY IF EXISTS "Users can insert own records" ON work_records;
DROP POLICY IF EXISTS "Users can update own records" ON work_records;
DROP POLICY IF EXISTS "Users can delete own records" ON work_records;
DROP POLICY IF EXISTS "Users can manage own records" ON work_records;
DROP POLICY IF EXISTS "Public can view map records" ON work_records;
DROP POLICY IF EXISTS "Demo records are public" ON work_records;

-- 新しいポリシー
CREATE POLICY "Users can manage own records"
  ON work_records
  FOR ALL
  USING (user_id = current_user OR user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id = current_user OR user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Public can view map records"
  ON work_records
  FOR SELECT
  USING (
    latitude IS NOT NULL
    AND longitude IS NOT NULL
    AND before_photo_url IS NOT NULL
  );

CREATE POLICY "Demo records are public"
  ON work_records
  FOR SELECT
  USING (user_id = 'iwasaki-demo');

-- ========================================
-- 6. 便利な関数
-- ========================================

CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL, lon1 DECIMAL,
  lat2 DECIMAL, lon2 DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
  earth_radius DECIMAL := 6371;
  dlat DECIMAL;
  dlon DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  a := sin(dlat/2) * sin(dlat/2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dlon/2) * sin(dlon/2);
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  RETURN earth_radius * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION calculate_distance IS '2地点間の距離を計算（Haversine公式、km単位）';

CREATE OR REPLACE FUNCTION estimate_coordinates(address_text TEXT)
RETURNS TABLE(lat DECIMAL, lng DECIMAL) AS $$
BEGIN
  RETURN QUERY
  SELECT
    CASE
      WHEN address_text ILIKE '%墨田%' OR address_text ILIKE '%業平%' OR address_text ILIKE '%押上%' THEN 35.7100::DECIMAL
      WHEN address_text ILIKE '%江東%' OR address_text ILIKE '%豊洲%' THEN 35.6732::DECIMAL
      WHEN address_text ILIKE '%千代田%' OR address_text ILIKE '%二番町%' THEN 35.6940::DECIMAL
      ELSE 35.6895::DECIMAL
    END as lat,
    CASE
      WHEN address_text ILIKE '%墨田%' OR address_text ILIKE '%業平%' OR address_text ILIKE '%押上%' THEN 139.8100::DECIMAL
      WHEN address_text ILIKE '%江東%' OR address_text ILIKE '%豊洲%' THEN 139.8170::DECIMAL
      WHEN address_text ILIKE '%千代田%' OR address_text ILIKE '%二番町%' THEN 139.7536::DECIMAL
      ELSE 139.6917::DECIMAL
    END as lng;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION estimate_coordinates IS '住所テキストから緯度経度を推測（簡易版）';

-- ========================================
-- 7. updated_at自動更新トリガー
-- ========================================

CREATE OR REPLACE FUNCTION update_work_records_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_work_records_updated_at ON work_records;

CREATE TRIGGER update_work_records_updated_at
  BEFORE UPDATE ON work_records
  FOR EACH ROW
  EXECUTE FUNCTION update_work_records_updated_at();

-- ========================================
-- 8. サンプルデータ追加
-- ========================================

-- 既存のデモデータを削除
DELETE FROM work_records WHERE user_id = 'iwasaki-demo';

-- サンプルデータ1
INSERT INTO work_records (
  user_id, site_name, work_date, location_name, latitude, longitude,
  before_photo_url, after_photo_url, memo
) VALUES (
  'iwasaki-demo',
  'あいおいニッセイ同和損保ビル 共用通路床T/C貼替',
  '2024-07-26',
  '東京都千代田区二番町5-6',
  35.6937, 139.7433,
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  '大規模オフィスビルの共用通路における床タイルカーペット全面貼替工事。既存T/C撤去後、下地調整を行い、防炎性能・耐久性に優れた新規タイルカーペットを施工。約180㎡。ビル管理会社様・テナント様との綿密な調整のもと、営業時間外の夜間作業で実施し、翌営業日に支障なく完工。'
);

-- サンプルデータ2
INSERT INTO work_records (
  user_id, site_name, work_date, location_name, latitude, longitude,
  before_photo_url, after_photo_url, memo
) VALUES (
  'iwasaki-demo',
  '墨田区Oビル 会議室クロス張替え',
  '2024-06-15',
  '東京都墨田区業平2-15',
  35.7080, 139.8107,
  'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
  'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800',
  'オフィスビル会議室のクロス全面張替え。サンゲツSP9000シリーズ使用。下地補修をしっかり行い、ジョイント部も綺麗に仕上がった。約60㎡、工期3日間。'
);

-- サンプルデータ3
INSERT INTO work_records (
  user_id, site_name, work_date, location_name, latitude, longitude,
  before_photo_url, after_photo_url, memo
) VALUES (
  'iwasaki-demo',
  '江東区Mマンション リビング床貼替え',
  '2024-08-20',
  '東京都江東区豊洲3-4',
  35.6544, 139.7955,
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'マンションリビング床のフローリング貼替え。既存CF撤去後、東リのフロアタイル施工。お客様に大変喜んでいただけた。約25㎡、工期2日間。'
);

-- サンプルデータ4
INSERT INTO work_records (
  user_id, site_name, work_date, location_name, latitude, longitude,
  before_photo_url, after_photo_url, memo
) VALUES (
  'iwasaki-demo',
  '豊洲新築マンション 内装仕上げ工事',
  '2024-09-10',
  '東京都江東区豊洲5-6-15',
  35.6558, 139.7966,
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800',
  '新築マンションの内装仕上げ。クロス・床・建具すべて施工。大工さん、電気屋さんとの連携もスムーズで予定通り完工。約80㎡、工期1週間。'
);

-- サンプルデータ5
INSERT INTO work_records (
  user_id, site_name, work_date, location_name, latitude, longitude,
  before_photo_url, after_photo_url, memo
) VALUES (
  'iwasaki-demo',
  '押上商業施設 飲食店舗改装工事',
  '2024-05-22',
  '東京都墨田区押上1-1',
  35.7101, 139.8134,
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  '商業施設内の飲食店改装。防炎クロス、厨房周りの不燃材施工。保健所検査も無事通過。営業中の施設だったため夜間作業で対応。約45㎡、工期5日間。'
);

-- サンプルデータ6（施工後写真なし）
INSERT INTO work_records (
  user_id, site_name, work_date, location_name, latitude, longitude,
  before_photo_url, after_photo_url, memo
) VALUES (
  'iwasaki-demo',
  '東陽町オフィス 床CF張替え（進行中）',
  '2024-10-01',
  '東京都江東区東陽3-1',
  35.6709, 139.8206,
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
  NULL,
  '施工前写真のみ記録。下地調整完了、CF張り準備中。施工後写真は後日追加予定。'
);

-- ========================================
-- 9. 統計確認
-- ========================================

SELECT
  COUNT(*) as total_records,
  COUNT(CASE WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN 1 END) as map_ready_records,
  COUNT(CASE WHEN after_photo_url IS NOT NULL THEN 1 END) as records_with_after_photo,
  MIN(work_date) as oldest_record,
  MAX(work_date) as newest_record
FROM work_records;

-- ========================================
-- 完了メッセージ
-- ========================================

DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE '地図表示セットアップ完了！';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ work_recordsテーブル作成';
  RAISE NOTICE '✅ 緯度経度補完ロジック適用';
  RAISE NOTICE '✅ 地図表示用ビュー作成';
  RAISE NOTICE '✅ インデックス最適化';
  RAISE NOTICE '✅ RLSポリシー設定';
  RAISE NOTICE '✅ 便利な関数追加';
  RAISE NOTICE '✅ サンプルデータ追加（6件）';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'フロントエンドで work_records_map_view を使用';
  RAISE NOTICE 'クエリ例: SELECT * FROM work_records_map_view;';
  RAISE NOTICE '========================================';
END $$;
