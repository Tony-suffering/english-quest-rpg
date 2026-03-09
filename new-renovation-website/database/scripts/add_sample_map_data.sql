-- ========================================
-- 地図表示用サンプルデータ追加
-- ========================================
-- 簡易版: テストデータのみ追加するスクリプト
-- より詳細なセットアップは work_records_map_setup.sql を使用してください

-- 既存のサンプルデータを削除（重複防止）
DELETE FROM work_records WHERE user_id = 'iwasaki-demo';

-- サンプルデータ1: あいおいニッセイ同和損保ビル
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
);

-- サンプルデータ2: 墨田区Oビル
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
);

-- サンプルデータ3: 江東区Mマンション
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
);

-- サンプルデータ4: 豊洲新築マンション
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
);

-- サンプルデータ5: 押上商業施設
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
);

-- サンプルデータ6: 施工後写真なしのテストケース
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
  '東陽町オフィス 床CF張替え（進行中）',
  '2024-10-01',
  '東京都江東区東陽3-1',
  35.6709,
  139.8206,
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
  NULL,  -- 施工後写真なし
  '施工前写真のみ記録。下地調整完了、CF張り準備中。施工後写真は後日追加予定。'
);

-- 結果確認
SELECT
  COUNT(*) as "追加されたレコード数",
  COUNT(CASE WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN 1 END) as "地図表示可能",
  COUNT(CASE WHEN after_photo_url IS NOT NULL THEN 1 END) as "施工後写真あり"
FROM work_records
WHERE user_id = 'iwasaki-demo';

-- 地図表示用データ確認
SELECT
  site_name,
  work_date,
  latitude,
  longitude,
  CASE
    WHEN after_photo_url IS NOT NULL THEN '✅ 施工後あり'
    ELSE '⚠️ 施工前のみ'
  END as "写真状況"
FROM work_records
WHERE user_id = 'iwasaki-demo'
ORDER BY work_date DESC;
