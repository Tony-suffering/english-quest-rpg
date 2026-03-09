-- 匿名ユーザーでもwork_recordsにアクセス可能にする（開発用）

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Users can view own records" ON work_records;
DROP POLICY IF EXISTS "Users can insert own records" ON work_records;
DROP POLICY IF EXISTS "Users can update own records" ON work_records;
DROP POLICY IF EXISTS "Users can delete own records" ON work_records;

-- 全員がアクセス可能なポリシーを作成
CREATE POLICY "Anyone can view records"
  ON work_records FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert records"
  ON work_records FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update records"
  ON work_records FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete records"
  ON work_records FOR DELETE
  USING (true);
