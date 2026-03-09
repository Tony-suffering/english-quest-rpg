-- ========================================
-- AI診断 Ver.5.0 シンプル版（初期セットアップ用）
-- ========================================
-- Supabaseの環境によらず動作する最小構成

-- 既存テーブルを削除（クリーンスタート）
DROP TABLE IF EXISTS diagnostic_results CASCADE;

-- 1. 診断結果テーブル作成
CREATE TABLE diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 診断データ（JSONB: 完全柔軟設計）
  answers JSONB NOT NULL,

  result_type VARCHAR(50) DEFAULT 'ai_takumi',
  result_content TEXT,

  -- 診断フロー情報
  flow_type VARCHAR(50) DEFAULT 'full_diagnostic',
  initial_concern VARCHAR(100),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- セッション情報
  session_id VARCHAR(255),
  user_id UUID,

  -- ユーザー連絡先情報
  user_name VARCHAR(100),
  user_phone VARCHAR(20),
  user_email VARCHAR(255),

  -- メタデータ
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. インデックス作成
CREATE INDEX idx_diagnostic_results_session_id ON diagnostic_results(session_id);
CREATE INDEX idx_diagnostic_results_user_id ON diagnostic_results(user_id);
CREATE INDEX idx_diagnostic_results_created_at ON diagnostic_results(created_at DESC);
CREATE INDEX idx_diagnostic_results_result_type ON diagnostic_results(result_type);
CREATE INDEX idx_diagnostic_results_flow_type ON diagnostic_results(flow_type);
CREATE INDEX idx_diagnostic_results_initial_concern ON diagnostic_results(initial_concern);
CREATE INDEX idx_diagnostic_results_answers_gin ON diagnostic_results USING GIN (answers);

-- 3. RLS (Row Level Security) 有効化
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

-- RLSポリシー: 誰でも挿入可能
CREATE POLICY "Anyone can insert" ON diagnostic_results
  FOR INSERT
  WITH CHECK (true);

-- RLSポリシー: 全て閲覧可能（開発初期段階）
CREATE POLICY "Anyone can view" ON diagnostic_results
  FOR SELECT
  USING (true);

-- RLSポリシー: 全て更新可能（開発初期段階）
CREATE POLICY "Anyone can update" ON diagnostic_results
  FOR UPDATE
  USING (true);

-- 4. 自動更新トリガー
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

-- 5. コメント追加
COMMENT ON TABLE diagnostic_results IS 'AI診断結果保存（Ver.5.0: JSONB柔軟設計）';
COMMENT ON COLUMN diagnostic_results.answers IS 'JSONB: 診断回答・結果・会話履歴など全て保存可能';

-- ========================================
-- テスト用サンプルデータ挿入
-- ========================================
INSERT INTO diagnostic_results (
  answers,
  result_type,
  result_content,
  flow_type,
  initial_concern,
  session_id
) VALUES (
  '{
    "version": "5.0",
    "flow_type": "full_diagnostic",
    "initial_concern": "wallpaper",
    "core_questions": {"1": "A", "2": "B", "3": "A"},
    "result": {
      "result_type": "standard",
      "recommended_tags": ["クロス", "壁紙"],
      "summary": "テストデータ"
    }
  }'::jsonb,
  'full_diagnostic',
  'テスト診断結果',
  'full_diagnostic',
  'wallpaper',
  'test-session-' || gen_random_uuid()::text
);

-- ========================================
-- 確認クエリ
-- ========================================
SELECT
  id,
  flow_type,
  initial_concern,
  answers->>'version' as version,
  created_at
FROM diagnostic_results
ORDER BY created_at DESC
LIMIT 5;

-- 完了メッセージ
SELECT '✅ AI診断 Ver.5.0 セットアップ完了！' as message;
