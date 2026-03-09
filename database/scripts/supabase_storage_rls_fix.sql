-- ===================================================
-- Storage RLS ポリシー修正（写真アップロードエラー対応）
-- ===================================================
-- 実行日: 2025-10-14
-- 問題: 写真アップロード時に RLS エラーが発生
-- エラー: "new row violates row-level security policy"

-- ===================================================
-- 1. work-photos バケットの確認と作成
-- ===================================================

-- バケット情報を確認
SELECT id, name, public FROM storage.buckets WHERE name = 'work-photos';

-- バケットが存在しない場合は作成（既に存在する場合はエラーが出るが問題なし）
INSERT INTO storage.buckets (id, name, public)
VALUES ('work-photos', 'work-photos', false)
ON CONFLICT (id) DO NOTHING;

-- ===================================================
-- 2. 既存のStorageポリシーを削除
-- ===================================================

DROP POLICY IF EXISTS "Users can upload their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own work photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view work photos" ON storage.objects;

-- 追加: 別名のポリシーも削除
DROP POLICY IF EXISTS "Authenticated users can upload work photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read work photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update work photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete work photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view work photos" ON storage.objects;

-- ===================================================
-- 3. 新しいStorageポリシーを作成（シンプル版）
-- ===================================================

-- 3-1. INSERT: 認証済みユーザーが写真をアップロード
-- シンプル版: 認証されていれば誰でもwork-photosバケットにアップロード可能
CREATE POLICY "Authenticated users can upload work photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'work-photos'
);

-- 3-2. SELECT: 認証済みユーザーが写真を閲覧
CREATE POLICY "Authenticated users can read work photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'work-photos'
);

-- 3-3. UPDATE: 認証済みユーザーが写真を更新
CREATE POLICY "Authenticated users can update work photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'work-photos'
)
WITH CHECK (
  bucket_id = 'work-photos'
);

-- 3-4. DELETE: 認証済みユーザーが写真を削除
CREATE POLICY "Authenticated users can delete work photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'work-photos'
);

-- ===================================================
-- 4. オプション: より厳密なポリシー（ユーザーIDごとに制限）
-- ===================================================

-- 注意: 以下のポリシーは、ファイルパスに user_id が含まれる場合のみ使用してください
-- 例: work-photos/{user_id}/photo.jpg

-- DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
-- CREATE POLICY "Users can upload to own folder"
-- ON storage.objects
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (
--   bucket_id = 'work-photos' AND
--   (storage.foldername(name))[1] = auth.uid()::text
-- );

-- ===================================================
-- 5. 確認クエリ
-- ===================================================

-- バケット情報を確認
SELECT
  id,
  name,
  public,
  created_at
FROM storage.buckets
WHERE name = 'work-photos';

-- Storageポリシーを確認
SELECT
  policyname,
  tablename,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;

-- ===================================================
-- 完了メッセージ
-- ===================================================
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Storage RLS ポリシー修正完了！';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ work-photos バケット確認・作成';
  RAISE NOTICE '✅ 既存ポリシーを削除';
  RAISE NOTICE '✅ 新しいポリシーを作成（4つ）';
  RAISE NOTICE '========================================';
  RAISE NOTICE '次のステップ:';
  RAISE NOTICE '1. ブラウザをリフレッシュ';
  RAISE NOTICE '2. /record-work で工事記録を作成';
  RAISE NOTICE '3. 写真アップロードを試す';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'ポリシー内容:';
  RAISE NOTICE '- INSERT: 認証済みユーザーが写真をアップロード可能';
  RAISE NOTICE '- SELECT: 認証済みユーザーが写真を閲覧可能';
  RAISE NOTICE '- UPDATE: 認証済みユーザーが写真を更新可能';
  RAISE NOTICE '- DELETE: 認証済みユーザーが写真を削除可能';
  RAISE NOTICE '========================================';
END $$;
