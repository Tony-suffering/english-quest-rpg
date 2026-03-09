-- ============================================
-- Craftyプラットフォーム 完全データベーススキーマ
-- ============================================

-- ============================================
-- 1. 基本関数定義
-- ============================================

-- updated_at自動更新関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. ユーザー管理テーブル
-- ============================================

-- 職人プロフィール拡張テーブル (auth.usersと1対1)
CREATE TABLE craftsmen_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE, -- auth.usersへの参照
  display_name TEXT NOT NULL, -- 表示名
  company_name TEXT, -- 会社名
  profession TEXT, -- 職種(内装、電気、配管等)
  experience_years INTEGER, -- 経験年数
  bio TEXT, -- 自己紹介
  avatar_url TEXT, -- プロフィール画像URL
  phone TEXT, -- 電話番号
  location_area TEXT, -- 活動エリア(例: 東京都墨田区)
  latitude DECIMAL(10, 8), -- 本拠地緯度
  longitude DECIMAL(11, 8), -- 本拠地経度
  is_active BOOLEAN DEFAULT true, -- アクティブ状態
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE craftsmen_profiles IS '職人プロフィール情報';

-- ============================================
-- 3. 仕事記録関連テーブル
-- ============================================

-- 職人の仕事記録テーブル
CREATE TABLE work_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- 職人のID(将来的にはUUIDに統一)
  site_name TEXT NOT NULL, -- 現場名(例: 墨田区Oビル)
  work_date DATE NOT NULL DEFAULT CURRENT_DATE, -- 施工日
  location_name TEXT, -- 住所テキスト(例: 墨田区業平2-15)
  latitude DECIMAL(10, 8), -- 緯度
  longitude DECIMAL(11, 8), -- 経度
  before_photo_url TEXT NOT NULL, -- ビフォー写真URL
  after_photo_url TEXT NOT NULL, -- アフター写真URL
  memo TEXT, -- メモ(任意)
  work_type TEXT, -- 工事種類(クロス、床、天井等)
  area_sqm DECIMAL(10, 2), -- 施工面積(㎡)
  work_hours DECIMAL(5, 2), -- 作業時間
  materials_used TEXT[], -- 使用材料リスト
  tags TEXT[], -- タグ(検索用)
  is_public BOOLEAN DEFAULT false, -- 公開設定
  likes_count INTEGER DEFAULT 0, -- いいね数
  views_count INTEGER DEFAULT 0, -- 閲覧数
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE work_records IS '職人の仕事記録（ビフォー・アフター写真付き）';

-- 作業記録の写真テーブル (複数写真対応)
CREATE TABLE work_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_record_id UUID NOT NULL REFERENCES work_records(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  photo_type TEXT CHECK (photo_type IN ('before', 'progress', 'after', 'detail')),
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE work_photos IS '仕事記録の複数写真管理';

-- ============================================
-- 4. プロジェクト管理テーブル
-- ============================================

-- プロジェクト(案件)テーブル
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL, -- プロジェクト作成者
  title TEXT NOT NULL, -- プロジェクト名
  description TEXT, -- 説明
  client_name TEXT, -- クライアント名
  site_address TEXT, -- 現場住所
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12, 2), -- 予算
  status TEXT CHECK (status IN ('planning', 'in_progress', 'completed', 'cancelled')) DEFAULT 'planning',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE projects IS 'プロジェクト（案件）管理';

-- プロジェクトメンバーテーブル (多対多)
CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  craftsman_id UUID NOT NULL,
  role TEXT CHECK (role IN ('owner', 'member', 'viewer')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE project_members IS 'プロジェクトメンバー（多対多）';

-- プロジェクトタスクテーブル
CREATE TABLE project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to UUID, -- 担当職人
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'done')) DEFAULT 'todo',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  due_date DATE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE project_tasks IS 'プロジェクト内のタスク管理';

-- ============================================
-- 5. スケジュール管理テーブル
-- ============================================

-- スケジュール(カレンダー)テーブル
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  craftsman_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  schedule_type TEXT CHECK (schedule_type IN ('work', 'meeting', 'off', 'other')) DEFAULT 'work',
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN DEFAULT false,
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE schedules IS '職人のスケジュール（カレンダー）';

-- ============================================
-- 6. チャット・コミュニケーションテーブル
-- ============================================

-- チャットルームテーブル
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  room_type TEXT CHECK (room_type IN ('direct', 'group', 'project')) DEFAULT 'direct',
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE chat_rooms IS 'チャットルーム';

-- チャットルーム参加者テーブル
CREATE TABLE chat_room_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  craftsman_id UUID NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE chat_room_members IS 'チャットルーム参加者';

-- チャットメッセージテーブル
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  message_text TEXT,
  message_type TEXT CHECK (message_type IN ('text', 'image', 'file', 'location')) DEFAULT 'text',
  attachment_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  reply_to UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE chat_messages IS 'チャットメッセージ';

-- ============================================
-- 7. フィード・SNS機能テーブル
-- ============================================

-- 投稿テーブル (Twitter風)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT CHECK (post_type IN ('text', 'work_share', 'question', 'tip')) DEFAULT 'text',
  work_record_id UUID REFERENCES work_records(id) ON DELETE SET NULL,
  media_urls TEXT[],
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE posts IS 'SNS投稿（Twitter風フィード）';

-- いいねテーブル
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  target_type TEXT CHECK (target_type IN ('post', 'work_record', 'comment')) NOT NULL,
  target_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

COMMENT ON TABLE likes IS 'いいね機能';

-- コメントテーブル
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL,
  target_type TEXT CHECK (target_type IN ('post', 'work_record')) NOT NULL,
  target_id UUID NOT NULL,
  content TEXT NOT NULL,
  reply_to UUID REFERENCES comments(id) ON DELETE SET NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE comments IS 'コメント機能';

-- フォローテーブル
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

COMMENT ON TABLE follows IS 'フォロー関係';

-- ============================================
-- 8. 通知テーブル
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  notification_type TEXT CHECK (notification_type IN (
    'like', 'comment', 'follow', 'mention',
    'project_invite', 'task_assigned', 'message'
  )) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  link_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE notifications IS '通知管理';

-- ============================================
-- 9. ストレージ管理テーブル
-- ============================================

-- ファイルメタデータテーブル
CREATE TABLE file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER, -- bytes
  file_type TEXT,
  storage_path TEXT NOT NULL, -- Supabase Storage path
  public_url TEXT,
  related_type TEXT, -- 'work_record', 'project', 'chat', etc.
  related_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE file_uploads IS 'ファイルアップロード管理';

-- ============================================
-- インデックス作成
-- ============================================

-- craftsmen_profiles
CREATE INDEX idx_craftsmen_profiles_user_id ON craftsmen_profiles(user_id);
CREATE INDEX idx_craftsmen_profiles_location ON craftsmen_profiles(latitude, longitude);

-- work_records
CREATE INDEX idx_work_records_user_id ON work_records(user_id);
CREATE INDEX idx_work_records_work_date ON work_records(work_date DESC);
CREATE INDEX idx_work_records_location ON work_records(latitude, longitude);
CREATE INDEX idx_work_records_tags ON work_records USING gin(tags);

-- work_photos
CREATE INDEX idx_work_photos_work_record_id ON work_photos(work_record_id);

-- projects
CREATE INDEX idx_projects_creator_id ON projects(creator_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_dates ON projects(start_date, end_date);

-- project_members
CREATE INDEX idx_project_members_project_id ON project_members(project_id);
CREATE INDEX idx_project_members_craftsman_id ON project_members(craftsman_id);

-- project_tasks
CREATE INDEX idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX idx_project_tasks_assigned_to ON project_tasks(assigned_to);

-- schedules
CREATE INDEX idx_schedules_craftsman_id ON schedules(craftsman_id);
CREATE INDEX idx_schedules_datetime ON schedules(start_datetime, end_datetime);
CREATE INDEX idx_schedules_project_id ON schedules(project_id);

-- chat_rooms
CREATE INDEX idx_chat_rooms_project_id ON chat_rooms(project_id);

-- chat_room_members
CREATE INDEX idx_chat_room_members_room_id ON chat_room_members(room_id);
CREATE INDEX idx_chat_room_members_craftsman_id ON chat_room_members(craftsman_id);

-- chat_messages
CREATE INDEX idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX idx_chat_messages_sender_id ON chat_messages(sender_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at DESC);

-- posts
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_tags ON posts USING gin(tags);

-- likes
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_target ON likes(target_type, target_id);

-- comments
CREATE INDEX idx_comments_target ON comments(target_type, target_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);

-- follows
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);

-- notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- file_uploads
CREATE INDEX idx_file_uploads_uploader_id ON file_uploads(uploader_id);
CREATE INDEX idx_file_uploads_related ON file_uploads(related_type, related_id);

-- ============================================
-- RLS (Row Level Security) ポリシー
-- ============================================

-- craftsmen_profiles
ALTER TABLE craftsmen_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON craftsmen_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON craftsmen_profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON craftsmen_profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- work_records
ALTER TABLE work_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own records"
  ON work_records FOR SELECT
  USING (user_id = current_setting('app.user_id', true) OR is_public = true);

CREATE POLICY "Users can insert own records"
  ON work_records FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own records"
  ON work_records FOR UPDATE
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own records"
  ON work_records FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

-- work_photos
ALTER TABLE work_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Work photos viewable with work record"
  ON work_photos FOR SELECT
  USING (
    work_record_id IN (
      SELECT id FROM work_records
      WHERE user_id = current_setting('app.user_id', true) OR is_public = true
    )
  );

-- projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects viewable by members"
  ON projects FOR SELECT
  USING (
    creator_id = auth.uid() OR
    id IN (SELECT project_id FROM project_members WHERE craftsman_id = auth.uid())
  );

CREATE POLICY "Project creators can update"
  ON projects FOR UPDATE
  USING (creator_id = auth.uid());

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  WITH CHECK (creator_id = auth.uid());

-- schedules
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own schedules"
  ON schedules FOR SELECT
  USING (craftsman_id = auth.uid());

CREATE POLICY "Users can manage own schedules"
  ON schedules FOR ALL
  USING (craftsman_id = auth.uid());

-- chat_messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room members can view messages"
  ON chat_messages FOR SELECT
  USING (
    room_id IN (
      SELECT room_id FROM chat_room_members WHERE craftsman_id = auth.uid()
    )
  );

CREATE POLICY "Room members can send messages"
  ON chat_messages FOR INSERT
  WITH CHECK (
    room_id IN (
      SELECT room_id FROM chat_room_members WHERE craftsman_id = auth.uid()
    )
  );

-- posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public posts viewable by everyone"
  ON posts FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can manage own posts"
  ON posts FOR ALL
  USING (author_id = auth.uid());

-- notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================
-- トリガー (自動更新)
-- ============================================

-- トリガー適用
CREATE TRIGGER update_craftsmen_profiles_updated_at
  BEFORE UPDATE ON craftsmen_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_records_updated_at
  BEFORE UPDATE ON work_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_tasks_updated_at
  BEFORE UPDATE ON project_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at
  BEFORE UPDATE ON schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_rooms_updated_at
  BEFORE UPDATE ON chat_rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ビュー (便利なクエリ)
-- ============================================

-- 職人の統計ビュー (型変換対応)
CREATE OR REPLACE VIEW craftsmen_stats AS
SELECT
  cp.user_id,
  cp.display_name,
  COALESCE(COUNT(DISTINCT wr.id), 0)::INTEGER as total_works,
  COALESCE(COUNT(DISTINCT p.id), 0)::INTEGER as total_projects,
  COALESCE(COUNT(DISTINCT f.follower_id), 0)::INTEGER as followers_count,
  COALESCE(COUNT(DISTINCT f2.following_id), 0)::INTEGER as following_count
FROM craftsmen_profiles cp
LEFT JOIN work_records wr ON cp.user_id::text = wr.user_id
LEFT JOIN projects p ON cp.user_id = p.creator_id
LEFT JOIN follows f ON cp.user_id = f.following_id
LEFT JOIN follows f2 ON cp.user_id = f2.follower_id
GROUP BY cp.user_id, cp.display_name;

-- プロジェクト進捗ビュー
CREATE OR REPLACE VIEW project_progress AS
SELECT
  p.id as project_id,
  p.title,
  p.status,
  COUNT(pt.id) as total_tasks,
  COUNT(pt.id) FILTER (WHERE pt.status = 'done') as completed_tasks,
  CASE
    WHEN COUNT(pt.id) > 0
    THEN ROUND((COUNT(pt.id) FILTER (WHERE pt.status = 'done')::DECIMAL / COUNT(pt.id)) * 100, 2)
    ELSE 0
  END as progress_percentage
FROM projects p
LEFT JOIN project_tasks pt ON p.id = pt.project_id
GROUP BY p.id, p.title, p.status;

-- ============================================
-- サンプルデータ挿入 (開発用)
-- ============================================

-- デモユーザープロフィール (auth.usersが存在する場合のみ)
-- INSERT INTO craftsmen_profiles (user_id, display_name, company_name, profession, experience_years, location_area)
-- VALUES
--   ('demo_user_uuid', '岩崎 太郎', '岩崎内装', '内装職人', 30, '東京都墨田区')
-- ON CONFLICT (user_id) DO NOTHING;
