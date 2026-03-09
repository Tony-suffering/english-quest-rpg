-- =============================================
-- 完全リセット: すべてのテーブルとデータを削除
-- =============================================
-- ⚠️ 警告: このSQLは既存のデータをすべて削除します
-- 実行前に必ずバックアップを取ってください

-- すべてのテーブルを強制削除（CASCADE）
DROP TABLE IF EXISTS public.file_uploads CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.follows CASCADE;
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.likes CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.chat_messages CASCADE;
DROP TABLE IF EXISTS public.chat_room_members CASCADE;
DROP TABLE IF EXISTS public.chat_rooms CASCADE;
DROP TABLE IF EXISTS public.schedules CASCADE;
DROP TABLE IF EXISTS public.project_tasks CASCADE;
DROP TABLE IF EXISTS public.project_members CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.work_photos CASCADE;
DROP TABLE IF EXISTS public.work_records CASCADE;
DROP TABLE IF EXISTS public.craftsmen_profiles CASCADE;

-- ビューを削除
DROP VIEW IF EXISTS public.craftsmen_stats CASCADE;
DROP VIEW IF EXISTS public.project_progress CASCADE;

-- 関数を削除
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- =============================================
-- 新規作成: 必要最小限のテーブル
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
    avatar_url TEXT,
    phone TEXT,
    location_area TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_active BOOLEAN DEFAULT true,
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
    work_type TEXT,
    area_sqm NUMERIC,
    work_hours NUMERIC,
    materials_used TEXT[],
    tags TEXT[],
    is_public BOOLEAN DEFAULT true,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 投稿テーブル
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type TEXT DEFAULT 'text' CHECK (post_type IN ('text', 'work_share', 'question', 'tip')),
    work_record_id UUID REFERENCES public.work_records(id) ON DELETE SET NULL,
    media_urls TEXT[],
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. いいねテーブル
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('post', 'work_record', 'comment')),
    target_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, target_type, target_id)
);

-- 5. コメントテーブル
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('post', 'work_record')),
    target_id UUID NOT NULL,
    content TEXT NOT NULL,
    reply_to UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. フォローテーブル
CREATE TABLE public.follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- =============================================
-- RLS (Row Level Security) 設定
-- =============================================

ALTER TABLE public.craftsmen_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- craftsmen_profiles ポリシー
CREATE POLICY "Public profiles are viewable by everyone"
ON public.craftsmen_profiles FOR SELECT
USING (is_active = true);

CREATE POLICY "Users can insert their own profile"
ON public.craftsmen_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.craftsmen_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- work_records ポリシー
CREATE POLICY "Public work records are viewable by everyone"
ON public.work_records FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can insert their own work records"
ON public.work_records FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own work records"
ON public.work_records FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own work records"
ON public.work_records FOR DELETE
USING (auth.uid() = user_id);

-- posts ポリシー
CREATE POLICY "Public posts are viewable by everyone"
ON public.posts FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can insert their own posts"
ON public.posts FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
ON public.posts FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts"
ON public.posts FOR DELETE
USING (auth.uid() = author_id);

-- likes ポリシー
CREATE POLICY "Likes are viewable by everyone"
ON public.likes FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own likes"
ON public.likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
ON public.likes FOR DELETE
USING (auth.uid() = user_id);

-- comments ポリシー
CREATE POLICY "Comments are viewable by everyone"
ON public.comments FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own comments"
ON public.comments FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments"
ON public.comments FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments"
ON public.comments FOR DELETE
USING (auth.uid() = author_id);

-- follows ポリシー
CREATE POLICY "Follows are viewable by everyone"
ON public.follows FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own follows"
ON public.follows FOR INSERT
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follows"
ON public.follows FOR DELETE
USING (auth.uid() = follower_id);

-- =============================================
-- インデックス作成
-- =============================================

CREATE INDEX idx_craftsmen_profiles_user_id ON public.craftsmen_profiles(user_id);
CREATE INDEX idx_work_records_user_id ON public.work_records(user_id);
CREATE INDEX idx_work_records_created_at ON public.work_records(created_at DESC);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_likes_user_id ON public.likes(user_id);
CREATE INDEX idx_comments_target ON public.comments(target_type, target_id);
CREATE INDEX idx_follows_follower ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);

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

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE
ON public.posts FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE
ON public.comments FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 完了メッセージ
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '✅ データベースのリセットと再作成が完了しました！';
    RAISE NOTICE '📝 次のステップ:';
    RAISE NOTICE '   1. Authentication → Settings → "Confirm email" を OFF にする';
    RAISE NOTICE '   2. http://localhost:3001/craftsman/register で新規登録を試す';
END $$;
