-- =============================================
-- 最小限のテーブル構成
-- =============================================

-- 1. 職人プロフィールテーブル
CREATE TABLE public.craftsmen_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    company_name TEXT,
    profession TEXT,
    experience_years INTEGER DEFAULT 0,
    bio TEXT,
    phone TEXT,
    location_area TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 工事記録テーブル
CREATE TABLE public.work_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    site_name TEXT NOT NULL,
    work_date DATE DEFAULT CURRENT_DATE,
    location_name TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    before_photo_url TEXT NOT NULL,
    after_photo_url TEXT NOT NULL,
    memo TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RLS (Row Level Security) 設定
-- =============================================

ALTER TABLE public.craftsmen_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_records ENABLE ROW LEVEL SECURITY;

-- craftsmen_profiles ポリシー
CREATE POLICY "Anyone can view profiles"
ON public.craftsmen_profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.craftsmen_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.craftsmen_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- work_records ポリシー
CREATE POLICY "Anyone can view work records"
ON public.work_records FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own work records"
ON public.work_records FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own work records"
ON public.work_records FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own work records"
ON public.work_records FOR DELETE
USING (auth.uid() = user_id);

-- =============================================
-- インデックス
-- =============================================

CREATE INDEX idx_craftsmen_profiles_user_id ON public.craftsmen_profiles(user_id);
CREATE INDEX idx_work_records_user_id ON public.work_records(user_id);
CREATE INDEX idx_work_records_created_at ON public.work_records(created_at DESC);

-- =============================================
-- トリガー: updated_at自動更新
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_craftsmen_profiles_updated_at BEFORE UPDATE
ON public.craftsmen_profiles FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_records_updated_at BEFORE UPDATE
ON public.work_records FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
