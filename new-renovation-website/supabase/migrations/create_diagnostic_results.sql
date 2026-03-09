-- 診断結果保存テーブル
CREATE TABLE IF NOT EXISTS diagnostic_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 診断回答（Q1〜Q10のA/B）
  answers JSONB NOT NULL,

  -- AI生成の診断結果
  result_type TEXT,
  result_content TEXT NOT NULL,

  -- オプション: ユーザー識別（セッションIDまたはメールアドレス）
  session_id TEXT,
  user_email TEXT,

  -- メタ情報
  user_agent TEXT,
  ip_address INET
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_created_at ON diagnostic_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_session_id ON diagnostic_results(session_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_email ON diagnostic_results(user_email);

-- RLS (Row Level Security) 設定
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

-- 全員が自分のセッションIDの診断結果を挿入可能
CREATE POLICY "Anyone can insert their own diagnostic results"
  ON diagnostic_results
  FOR INSERT
  WITH CHECK (true);

-- 自分のセッションIDの診断結果のみ閲覧可能
CREATE POLICY "Users can view their own diagnostic results"
  ON diagnostic_results
  FOR SELECT
  USING (session_id = current_setting('app.session_id', true) OR session_id IS NULL);
