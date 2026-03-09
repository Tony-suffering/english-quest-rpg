-- ============================================
-- シンプルなデータベーススキーマ
-- ============================================

-- ============================================
-- 1. 基本関数
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. 仕事記録テーブル（メイン）
-- ============================================

CREATE TABLE work_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  site_name TEXT NOT NULL,
  work_date DATE NOT NULL DEFAULT CURRENT_DATE,
  location_name TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  before_photo_url TEXT NOT NULL,
  after_photo_url TEXT NOT NULL,
  memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_work_records_user_id ON work_records(user_id);
CREATE INDEX idx_work_records_work_date ON work_records(work_date DESC);
CREATE INDEX idx_work_records_location ON work_records(latitude, longitude);

-- RLS (Row Level Security)
ALTER TABLE work_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records"
  ON work_records FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own records"
  ON work_records FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own records"
  ON work_records FOR UPDATE
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own records"
  ON work_records FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

-- トリガー
CREATE TRIGGER update_work_records_updated_at
  BEFORE UPDATE ON work_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- コメント
COMMENT ON TABLE work_records IS '職人の仕事記録（ビフォー・アフター写真付き）';
