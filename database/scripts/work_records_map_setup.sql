-- ========================================
-- 地図表示対応: work_recordsテーブル完全セットアップ
-- ========================================
-- 実行日: 2025-10-14
-- 目的: 工事記録を地図上に正しく表示するための包括的セットアップ

-- ========================================
-- 1. テーブル構造の確認と修正
-- ========================================

-- after_photo_urlをNULL許可に変更（施工前のみでも記録可能に）
ALTER TABLE work_records
ALTER COLUMN after_photo_url DROP NOT NULL;

-- コメント追加
COMMENT ON COLUMN work_records.latitude IS '緯度（地図表示に必須）';
COMMENT ON COLUMN work_records.longitude IS '経度（地図表示に必須）';
COMMENT ON COLUMN work_records.after_photo_url IS '施工後写真URL（NULLの場合はbefore_photo_urlを使用）';

-- ========================================
-- 2. 既存データの緯度経度補完
-- ========================================

-- 東京都内の主要エリアの緯度経度（既存データに位置情報がない場合の補完用）
-- 墨田区周辺: 35.7100, 139.8100
-- 江東区周辺: 35.6732, 139.8170
-- 千代田区周辺: 35.6940, 139.7536

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
    ELSE 35.6895 -- デフォルトは東京駅周辺
  END,
  longitude = CASE
    WHEN site_name ILIKE '%墨田%' THEN 139.8100
    WHEN site_name ILIKE '%江東%' THEN 139.8170
    WHEN site_name ILIKE '%千代田%' OR site_name ILIKE '%二番町%' THEN 139.7536
    WHEN site_name ILIKE '%豊洲%' THEN 139.7955
    WHEN site_name ILIKE '%押上%' THEN 139.8134
    WHEN site_name ILIKE '%業平%' THEN 139.8107
    WHEN site_name ILIKE '%東陽町%' THEN 139.8206
    ELSE 139.6917 -- デフォルトは東京駅周辺
  END
WHERE latitude IS NULL OR longitude IS NULL;

-- ========================================
-- 3. 地図表示用のビュー作成
-- ========================================

-- 地図表示用の最適化されたビュー
CREATE OR REPLACE VIEW work_records_map_view AS
SELECT
  id,
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  -- after_photo_urlがNULLの場合はbefore_photo_urlを使用
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
-- 4. 地理情報インデックスの最適化
-- ========================================

-- 既存のインデックスを削除して再作成（より効率的に）
DROP INDEX IF EXISTS idx_work_records_location;

-- 空間インデックス（PostGIS拡張がある場合）
-- CREATE EXTENSION IF NOT EXISTS postgis;
-- ALTER TABLE work_records ADD COLUMN geom GEOMETRY(Point, 4326);
-- UPDATE work_records SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;
-- CREATE INDEX idx_work_records_geom ON work_records USING GIST(geom);

-- PostGISがない場合の代替インデックス
CREATE INDEX idx_work_records_lat_lng ON work_records(latitude, longitude)
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- 複合インデックス（地図表示でよく使うクエリ用）
CREATE INDEX idx_work_records_map_display ON work_records(work_date DESC, latitude, longitude)
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- ========================================
-- 5. サンプルデータの追加（テスト用）
-- ========================================

-- あいおいニッセイ同和損保ビル施工実績
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  before_photo_url,
  after_photo_url,
  memo
)
VALUES (
  'iwasaki-demo',
  'あいおいニッセイ同和損保ビル 共用通路床T/C貼替',
  '2024-07-26',
  '東京都千代田区二番町5-6',
  35.6937,
  139.7433,
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  '大規模オフィスビルの共用通路における床タイルカーペット全面貼替工事。既存T/C撤去後、下地調整を行い、防炎性能・耐久性に優れた新規タイルカーペットを施工。約180㎡。ビル管理会社様・テナント様との綿密な調整のもと、営業時間外の夜間作業で実施し、翌営業日に支障なく完工。'
)
ON CONFLICT DO NOTHING;

-- 墨田区Oビル クロス張替え
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  before_photo_url,
  after_photo_url,
  memo
)
VALUES (
  'iwasaki-demo',
  '墨田区Oビル 会議室クロス張替え',
  '2024-06-15',
  '東京都墨田区業平2-15',
  35.7080,
  139.8107,
  'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
  'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=800',
  'オフィスビル会議室のクロス全面張替え。サンゲツSP9000シリーズ使用。下地補修をしっかり行い、ジョイント部も綺麗に仕上がった。約60㎡、工期3日間。'
)
ON CONFLICT DO NOTHING;

-- 江東区Mマンション リフォーム
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  before_photo_url,
  after_photo_url,
  memo
)
VALUES (
  'iwasaki-demo',
  '江東区Mマンション リビング床貼替え',
  '2024-08-20',
  '東京都江東区豊洲3-4',
  35.6544,
  139.7955,
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  'マンションリビング床のフローリング貼替え。既存CF撤去後、東リのフロアタイル施工。お客様に大変喜んでいただけた。約25㎡、工期2日間。'
)
ON CONFLICT DO NOTHING;

-- 豊洲新築マンション 内装工事
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  before_photo_url,
  after_photo_url,
  memo
)
VALUES (
  'iwasaki-demo',
  '豊洲新築マンション 内装仕上げ工事',
  '2024-09-10',
  '東京都江東区豊洲5-6-15',
  35.6558,
  139.7966,
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800',
  '新築マンションの内装仕上げ。クロス・床・建具すべて施工。大工さん、電気屋さんとの連携もスムーズで予定通り完工。約80㎡、工期1週間。'
)
ON CONFLICT DO NOTHING;

-- 押上商業施設 店舗改装
INSERT INTO work_records (
  user_id,
  site_name,
  work_date,
  location_name,
  latitude,
  longitude,
  before_photo_url,
  after_photo_url,
  memo
)
VALUES (
  'iwasaki-demo',
  '押上商業施設 飲食店舗改装工事',
  '2024-05-22',
  '東京都墨田区押上1-1',
  35.7101,
  139.8134,
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  '商業施設内の飲食店改装。防炎クロス、厨房周りの不燃材施工。保健所検査も無事通過。営業中の施設だったため夜間作業で対応。約45㎡、工期5日間。'
)
ON CONFLICT DO NOTHING;

-- ========================================
-- 6. RLSポリシーの更新（地図表示用）
-- ========================================

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Users can view own records" ON work_records;
DROP POLICY IF EXISTS "Users can insert own records" ON work_records;
DROP POLICY IF EXISTS "Users can update own records" ON work_records;
DROP POLICY IF EXISTS "Users can delete own records" ON work_records;

-- 新しいポリシー: 自分の記録は全権限
CREATE POLICY "Users can manage own records"
  ON work_records
  FOR ALL
  USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- 公開ポリシー: 地図表示用（latitude, longitudeがあるレコードは誰でも閲覧可能）
CREATE POLICY "Public can view map records"
  ON work_records
  FOR SELECT
  USING (
    latitude IS NOT NULL
    AND longitude IS NOT NULL
    AND before_photo_url IS NOT NULL
  );

-- デモユーザーのレコードは誰でも閲覧可能
CREATE POLICY "Demo records are public"
  ON work_records
  FOR SELECT
  USING (user_id = 'iwasaki-demo');

-- ========================================
-- 7. 便利な関数の作成
-- ========================================

-- 緯度経度から距離を計算する関数（km単位）
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL, lon1 DECIMAL,
  lat2 DECIMAL, lon2 DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
  earth_radius DECIMAL := 6371; -- 地球の半径（km）
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

-- 住所から緯度経度を推測する関数（簡易版）
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
-- 8. 統計情報の確認
-- ========================================

-- 地図表示可能なレコード数
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
  RAISE NOTICE '地図表示対応セットアップ完了！';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ テーブル構造を最適化';
  RAISE NOTICE '✅ 既存データの緯度経度を補完';
  RAISE NOTICE '✅ 地図表示用ビューを作成';
  RAISE NOTICE '✅ インデックスを最適化';
  RAISE NOTICE '✅ サンプルデータを追加（5件）';
  RAISE NOTICE '✅ RLSポリシーを更新';
  RAISE NOTICE '✅ 便利な関数を作成';
  RAISE NOTICE '========================================';
  RAISE NOTICE '次のステップ: フロントエンドで work_records_map_view を使用';
  RAISE NOTICE 'クエリ例: SELECT * FROM work_records_map_view;';
  RAISE NOTICE '========================================';
END $$;
