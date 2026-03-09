-- work_records テーブルの写真URL NOT NULL制約を削除
-- 写真なしでも投稿できるようにする

ALTER TABLE work_records
  ALTER COLUMN before_photo_url DROP NOT NULL,
  ALTER COLUMN after_photo_url DROP NOT NULL;

-- 確認：テーブル構造を表示
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'work_records'
  AND column_name IN ('before_photo_url', 'after_photo_url');
