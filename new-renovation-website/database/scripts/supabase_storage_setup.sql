-- =============================================
-- ストレージバケット用ポリシー設定
-- =============================================
-- 注意: バケット自体はUIから作成する必要があります
-- Storage → New bucket → 名前: "work-photos"

-- work-photos バケットのRLSポリシー

-- 1. 誰でも公開写真を閲覧可能
CREATE POLICY "Public work photos are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'work-photos');

-- 2. 認証済みユーザーは自分のフォルダにアップロード可能
CREATE POLICY "Users can upload their own work photos"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'work-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 3. 認証済みユーザーは自分の写真を更新可能
CREATE POLICY "Users can update their own work photos"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'work-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- 4. 認証済みユーザーは自分の写真を削除可能
CREATE POLICY "Users can delete their own work photos"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'work-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
);
