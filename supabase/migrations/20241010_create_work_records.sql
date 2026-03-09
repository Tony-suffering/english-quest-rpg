-- 職人の仕事記録テーブル
CREATE TABLE work_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- 職人のID(将来的にはauth.usersと連携)
  site_name TEXT NOT NULL, -- 現場名(例: 墨田区Oビル)
  work_date DATE NOT NULL DEFAULT CURRENT_DATE, -- 施工日
  location_name TEXT, -- 住所テキスト(例: 墨田区業平2-15)
  latitude DECIMAL(10, 8), -- 緯度
  longitude DECIMAL(11, 8), -- 経度
  before_photo_url TEXT NOT NULL, -- ビフォー写真URL
  after_photo_url TEXT NOT NULL, -- アフター写真URL
  memo TEXT, -- メモ(任意)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_work_records_user_id ON work_records(user_id);
CREATE INDEX idx_work_records_work_date ON work_records(work_date DESC);
CREATE INDEX idx_work_records_location ON work_records(latitude, longitude);

-- RLS(Row Level Security)有効化
ALTER TABLE work_records ENABLE ROW LEVEL SECURITY;

-- ポリシー: 自分の記録のみ閲覧・編集可能
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

-- updated_atの自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_work_records_updated_at
  BEFORE UPDATE ON work_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
