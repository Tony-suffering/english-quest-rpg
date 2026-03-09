-- =============================================
-- ストレージポリシー（最小限）
-- =============================================
-- 前提: UIで "work-photos" バケットを作成済み

-- 1. 誰でも写真を閲覧可能
CREATE POLICY "Anyone can view work photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'work-photos');

-- 2. 認証済みユーザーは自分のフォルダにアップロード可能
CREATE POLICY "Users can upload their own photos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'work-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 3. 認証済みユーザーは自分の写真を削除可能
CREATE POLICY "Users can delete their own photos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'work-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
);
