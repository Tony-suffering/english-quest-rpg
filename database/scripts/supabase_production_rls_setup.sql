-- ===================================================
-- 本番環境対応 Row Level Security (RLS) 設定
-- Supabase SQL Editor で実行してください
-- プロジェクト: iwasaki-naisou-website
-- 作成日: 2025-10-14
-- ===================================================

-- ===================================================
-- 1. テーブルのRLSを有効化
-- ===================================================

ALTER TABLE IF EXISTS craftsmen_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS work_records ENABLE ROW LEVEL SECURITY;

-- ===================================================
-- 2. craftsmen_profiles テーブルのRLSポリシー
-- ===================================================

-- 既存ポリシーを削除（エラーが出ても問題なし）
DROP POLICY IF EXISTS "Users can insert their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON craftsmen_profiles;
DROP POLICY IF EXISTS "Public can view all profiles" ON craftsmen_profiles;

-- 2-1. INSERT: 認証済みユーザーが自分のプロフィールを作成
CREATE POLICY "Users can insert their own profile"
ON craftsmen_profiles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

-- 2-2. SELECT: 認証済みユーザーが自分のプロフィールを閲覧
CREATE POLICY "Users can view their own profile"
ON craftsmen_profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
);

-- 2-3. SELECT: 一般公開されたプロフィールは誰でも閲覧可能（必要に応じて有効化）
-- 注意: 公開プロフィール機能を実装する場合のみ有効化してください
-- CREATE POLICY "Public can view all profiles"
-- ON craftsmen_profiles
-- FOR SELECT
-- TO public
-- USING (true);

-- 2-4. UPDATE: 認証済みユーザーが自分のプロフィールを更新
CREATE POLICY "Users can update their own profile"
ON craftsmen_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2-5. DELETE: 認証済みユーザーが自分のプロフィールを削除
CREATE POLICY "Users can delete their own profile"
ON craftsmen_profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ===================================================
-- 3. work_records テーブルのRLSポリシー
-- ===================================================

-- 既存ポリシーを削除
DROP POLICY IF EXISTS "Users can insert their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can view their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can update their own work records" ON work_records;
DROP POLICY IF EXISTS "Users can delete their own work records" ON work_records;

-- 3-1. INSERT: 認証済みユーザーが自分の工事記録を作成
CREATE POLICY "Users can insert their own work records"
ON work_records
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

-- 3-2. SELECT: 認証済みユーザーが自分の工事記録を閲覧
CREATE POLICY "Users can view their own work records"
ON work_records
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
);

-- 3-3. UPDATE: 認証済みユーザーが自分の工事記録を更新
CREATE POLICY "Users can update their own work records"
ON work_records
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 3-4. DELETE: 認証済みユーザーが自分の工事記録を削除
CREATE POLICY "Users can delete their own work records"
ON work_records
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ===================================================
-- 4. Storageバケットのポリシー設定
-- ===================================================

-- work-photosバケットが存在することを確認
-- ※バケットが存在しない場合は、Supabase Dashboard > Storage で作成してください

-- 既存ポリシーを削除
DROP POLICY IF EXISTS "Users can upload their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view work photos" ON storage.objects;

-- 4-1. INSERT: 認証済みユーザーが自分の写真をアップロード
CREATE POLICY "Users can upload their own work photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'work-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 4-2. SELECT: 認証済みユーザーが自分の写真を閲覧
CREATE POLICY "Users can view their own work photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'work-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 4-3. SELECT: 一般公開（必要に応じて有効化）
-- 注意: 写真を一般公開する場合のみ有効化してください
-- CREATE POLICY "Public can view work photos"
-- ON storage.objects
-- FOR SELECT
-- TO public
-- USING (
--   bucket_id = 'work-photos'
-- );

-- 4-4. UPDATE: 認証済みユーザーが自分の写真を更新
CREATE POLICY "Users can update their own work photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'work-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'work-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 4-5. DELETE: 認証済みユーザーが自分の写真を削除
CREATE POLICY "Users can delete their own work photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'work-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- ===================================================
-- 5. 設定確認クエリ
-- ===================================================

-- 5-1. テーブルのRLS状態を確認
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE tablename IN ('craftsmen_profiles', 'work_records')
ORDER BY tablename;

-- 5-2. 設定されたポリシーを確認
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

-- 5-3. Storageポリシーを確認
-- 注意: storage.policies ビューが存在しない場合があるため、
-- pg_policies から storage.objects テーブルのポリシーを確認します
SELECT
  schemaname,
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;

-- ===================================================
-- 実行後の確認項目
-- ===================================================

/*
✅ 確認項目:

1. RLS有効化確認:
   - craftsmen_profiles テーブル: rowsecurity = true
   - work_records テーブル: rowsecurity = true

2. ポリシー確認:
   - craftsmen_profiles: 4つのポリシー (INSERT, SELECT, UPDATE, DELETE)
   - work_records: 4つのポリシー (INSERT, SELECT, UPDATE, DELETE)
   - storage.objects: 5つのポリシー (work-photos用)

3. 動作確認:
   - http://localhost:3001/craftsman/register で新規登録
   - http://localhost:3001/record-work で工事記録作成
   - 写真アップロード機能のテスト
   - ブラウザコンソールでエラーがないか確認

4. セキュリティ確認:
   - 別のユーザーのデータにアクセスできないことを確認
   - 未認証状態では操作できないことを確認
   - 認証済みユーザーは自分のデータのみ操作できることを確認
*/

-- ===================================================
-- トラブルシューティング
-- ===================================================

/*
❌ エラー: "new row violates row-level security policy"

原因: RLSポリシーが正しく設定されていない、または auth.uid() が null

解決策:
1. ユーザーが正しくログインしているか確認
2. user_id カラムに auth.uid() の値が正しく設定されているか確認
3. ブラウザコンソールで以下を実行して確認:
   const { data: { user } } = await supabase.auth.getUser()
   console.log('Current user:', user)

❌ エラー: "permission denied for table craftsmen_profiles"

原因: テーブルの権限が不足している

解決策:
GRANT ALL ON craftsmen_profiles TO authenticated;
GRANT ALL ON work_records TO authenticated;

❌ エラー: Storage upload失敗

原因: work-photos バケットが存在しない、またはポリシーが未設定

解決策:
1. Supabase Dashboard > Storage でバケット作成
2. このSQLファイルのStorageポリシー部分を再実行
*/

-- ===================================================
-- 本番環境デプロイ前のチェックリスト
-- ===================================================

/*
□ 環境変数の確認:
  - NEXT_PUBLIC_SUPABASE_URL が正しく設定されている
  - NEXT_PUBLIC_SUPABASE_ANON_KEY が正しく設定されている

□ RLS設定の確認:
  - すべてのテーブルでRLSが有効化されている
  - すべての必要なポリシーが作成されている
  - Storageポリシーが設定されている

□ セキュリティテスト:
  - 別ユーザーのデータアクセス拒否を確認
  - 未認証アクセス拒否を確認
  - 認証済みユーザーの正常動作を確認

□ 機能テスト:
  - ユーザー登録が正常に動作
  - プロフィール作成・更新が正常に動作
  - 工事記録作成・更新が正常に動作
  - 写真アップロードが正常に動作

□ パフォーマンステスト:
  - クエリ速度が許容範囲内
  - 大量データでの動作確認

□ ログ確認:
  - エラーログがないことを確認
  - 不審なアクセスログがないことを確認
*/
