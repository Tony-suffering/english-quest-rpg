-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Users can view their own diagnostic results" ON diagnostic_results;

-- 新しいポリシー: 全員が全ての診断結果を閲覧可能（管理画面用）
CREATE POLICY "Anyone can view all diagnostic results"
  ON diagnostic_results
  FOR SELECT
  USING (true);

-- 挿入ポリシーはそのまま維持
