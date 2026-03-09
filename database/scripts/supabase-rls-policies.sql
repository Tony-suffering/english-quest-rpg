-- ===================================================
-- Row Level Security (RLS) ポリシー設定
-- Supabase SQL Editor で実行してください
-- ===================================================

-- craftsmen_profiles テーブルのRLSを有効化
ALTER TABLE craftsmen_profiles ENABLE ROW LEVEL SECURITY;

-- 既存のポリシーを削除（エラーが出ても問題なし）
DROP POLICY IF EXISTS "Users can insert their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON craftsmen_profiles;

-- 1. INSERT ポリシー: 認証済みユーザーが自分のプロフィールを作成
CREATE POLICY "Users can insert their own profile"
ON craftsmen_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. SELECT ポリシー: 認証済みユーザーが自分のプロフィールを閲覧
CREATE POLICY "Users can view their own profile"
ON craftsmen_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. UPDATE ポリシー: 認証済みユーザーが自分のプロフィールを更新
CREATE POLICY "Users can update their own profile"
ON craftsmen_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. DELETE ポリシー: 認証済みユーザーが自分のプロフィールを削除
CREATE POLICY "Users can delete their own profile"
ON craftsmen_profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ===================================================
-- 追加: work_records テーブルのRLS設定（必要に応じて）
-- ===================================================

ALTER TABLE work_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can view their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can update their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can delete their own work records" ON work_records;

CREATE POLICY "Users can insert their own work records"
ON work_records
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own work records"
ON work_records
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own work records"
ON work_records
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own work records"
ON work_records
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ===================================================
-- 確認: 設定されたポリシーを表示
-- ===================================================

SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('craftsmen_profiles', 'work_records')
ORDER BY tablename, policyname;
