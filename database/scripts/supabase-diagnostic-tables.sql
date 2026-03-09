-- ========================================
-- AI診断機能用テーブル（AIタクミ診断結果保存）
-- ========================================
-- CRAFTSMAN用Supabase (https://ibmybaxrcgasoxhwrcwb.supabase.co) に実行してください

-- 1. 診断結果テーブル
CREATE TABLE IF NOT EXISTS diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 診断データ
  answers JSONB NOT NULL,
  -- 例: { "choices": { "1": "A", "2": "B", ... }, "free_texts": { "1": "自由回答テキスト" }, "version": "3.0" }

  result_type VARCHAR(50) NOT NULL DEFAULT 'ai_takumi_v3',
  -- 診断バージョン識別用

  result_content TEXT NOT NULL,
  -- OpenAIが生成した診断結果の全文

  -- セッション情報
  session_id VARCHAR(255) NOT NULL,
  -- ブラウザセッション識別用UUID

  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  -- 認証済みユーザーの場合のみ紐付け

  -- メタデータ
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_session_id ON diagnostic_results(session_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_id ON diagnostic_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_created_at ON diagnostic_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_result_type ON diagnostic_results(result_type);

-- RLS (Row Level Security) 有効化
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

-- RLSポリシー: 誰でも挿入可能（匿名診断対応）
CREATE POLICY "Anyone can insert diagnostic results" ON diagnostic_results
  FOR INSERT
  WITH CHECK (true);

-- RLSポリシー: 自分のセッションIDまたはuser_idのデータのみ閲覧可能
CREATE POLICY "Users can view their own results" ON diagnostic_results
  FOR SELECT
  USING (
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
    OR user_id = auth.uid()
  );

-- 2. 診断後の会話テーブル
CREATE TABLE IF NOT EXISTS diagnostic_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 診断結果への参照
  diagnosis_id UUID NOT NULL REFERENCES diagnostic_results(id) ON DELETE CASCADE,

  -- 会話内容
  user_message TEXT NOT NULL,
  ai_response TEXT,
  -- 将来的にAI応答も保存する場合

  -- メタデータ
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_diagnostic_conversations_diagnosis_id ON diagnostic_conversations(diagnosis_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_conversations_timestamp ON diagnostic_conversations(timestamp DESC);

-- RLS有効化
ALTER TABLE diagnostic_conversations ENABLE ROW LEVEL SECURITY;

-- RLSポリシー: 誰でも挿入可能
CREATE POLICY "Anyone can insert conversations" ON diagnostic_conversations
  FOR INSERT
  WITH CHECK (true);

-- RLSポリシー: 親診断結果が閲覧可能なら会話も閲覧可能
CREATE POLICY "Users can view their own conversations" ON diagnostic_conversations
  FOR SELECT
  USING (
    diagnosis_id IN (
      SELECT id FROM diagnostic_results
      WHERE session_id = current_setting('request.headers', true)::json->>'x-session-id'
         OR user_id = auth.uid()
    )
  );

-- 3. 自動更新トリガー（updated_at）
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_diagnostic_results_updated_at
  BEFORE UPDATE ON diagnostic_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 実行後の確認クエリ
-- ========================================
-- SELECT * FROM diagnostic_results ORDER BY created_at DESC LIMIT 10;
-- SELECT * FROM diagnostic_conversations ORDER BY created_at DESC LIMIT 10;
