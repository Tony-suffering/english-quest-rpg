-- ===================================================
-- RLS ポリシー修正（プロフィール更新エラー対応）
-- ===================================================
-- 実行日: 2025-10-14
-- 問題: プロフィール更新時に RLS エラーが発生
-- 原因: auth.uid() の取得方法が正しくない可能性

-- ===================================================
-- 1. craftsmen_profiles の既存ポリシーを削除
-- ===================================================

DROP POLICY IF EXISTS "Users can insert their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON craftsmen_profiles;

-- ===================================================
-- 2. 新しいポリシーを作成（auth.uid() を直接使用）
-- ===================================================

-- INSERT: 認証済みユーザーが自分のプロフィールを作成
CREATE POLICY "Users can insert their own profile"
ON craftsmen_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- SELECT: 認証済みユーザーが自分のプロフィールを閲覧
CREATE POLICY "Users can view their own profile"
ON craftsmen_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- UPDATE: 認証済みユーザーが自分のプロフィールを更新
CREATE POLICY "Users can update their own profile"
ON craftsmen_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: 認証済みユーザーが自分のプロフィールを削除
CREATE POLICY "Users can delete their own profile"
ON craftsmen_profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ===================================================
-- 3. work_records の既存ポリシーを削除
-- ===================================================

DROP POLICY IF EXISTS "Users can insert their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can view their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can update their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can delete their own work records" ON work_records;

-- 地図表示用のポリシーも削除（もし存在すれば）
DROP POLICY IF EXISTS "Users can manage own records" ON work_records;
DROP POLICY IF EXISTS "Public can view map records" ON work_records;
DROP POLICY IF EXISTS "Demo records are public" ON work_records;

-- ===================================================
-- 4. 新しいポリシーを作成
-- ===================================================

-- INSERT: 認証済みユーザーが自分の工事記録を作成
CREATE POLICY "Users can insert their own work records"
ON work_records
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- SELECT: 認証済みユーザーが自分の工事記録を閲覧
CREATE POLICY "Users can view their own work records"
ON work_records
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- UPDATE: 認証済みユーザーが自分の工事記録を更新
CREATE POLICY "Users can update their own work records"
ON work_records
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- DELETE: 認証済みユーザーが自分の工事記録を削除
CREATE POLICY "Users can delete their own work records"
ON work_records
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ===================================================
-- 5. 確認クエリ
-- ===================================================

-- テーブルの RLS 状態を確認
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE tablename IN ('craftsmen_profiles', 'work_records')
ORDER BY tablename;

-- 設定されたポリシーを確認
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename IN ('craftsmen_profiles', 'work_records')
ORDER BY tablename, policyname;

-- ===================================================
-- 完了メッセージ
-- ===================================================
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'RLS ポリシー修正完了！';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ craftsmen_profiles: 4つのポリシー';
  RAISE NOTICE '✅ work_records: 4つのポリシー';
  RAISE NOTICE '========================================';
  RAISE NOTICE '次のステップ:';
  RAISE NOTICE '1. ブラウザをリフレッシュ';
  RAISE NOTICE '2. プロフィール更新を試す';
  RAISE NOTICE '3. 工事記録作成を試す';
  RAISE NOTICE '========================================';
END $$;
