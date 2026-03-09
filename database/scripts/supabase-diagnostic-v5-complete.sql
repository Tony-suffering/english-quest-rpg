-- ========================================
-- AI診断 Ver.5.0 完全版マイグレーション
-- ========================================
-- 目的：JSONB柔軟設計で今後の変更に完全対応

-- 1. 診断結果テーブル作成（既存の場合はスキップ）
CREATE TABLE IF NOT EXISTS diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 診断データ（JSONB: 完全柔軟設計）
  answers JSONB NOT NULL,
  -- Ver.5.0 構造:
  -- {
  --   "version": "5.0",
  --   "flow_type": "full_diagnostic" | "skip_diagnostic" | "partial" | "detailed_diagnostic",
  --   "initial_concern": "wallpaper" | "flooring" | "barrier_free" | "overall" | "undecided" | "skip",
  --   "core_questions": { "1": "A", "2": "B", "3": "A" },  -- 簡易3問
  --   "detailed_questions": { "4": "B", "5": "A", ... },   -- 詳細10問
  --   "chat_history": [{"role": "user", "content": "...", "timestamp": "..."}],
  --   "result": {
  --     "result_type": "standard" | "ai_generated_detailed",
  --     "recommended_tags": ["クロス", "床材"],
  --     "title": "プラン名",
  --     "description": "説明",
  --     "ai_proposal": "AI生成提案",
  --     "summary": "サマリー"
  --   },
  --   "extracted_needs": {  -- 将来的にAIが抽出
  --     "budget": "100万円くらい",
  --     "timeline": "来月中に",
  --     "family_structure": "夫婦+子供2人"
  --   },
  --   "metadata": {}  -- 任意の追加情報
  -- }

  result_type VARCHAR(50) DEFAULT 'ai_takumi',
  -- 診断タイプ識別用（後方互換性）

  result_content TEXT,
  -- 診断結果の全文（表示用）

  -- Ver.4.0追加カラム
  flow_type VARCHAR(50) DEFAULT 'full_diagnostic',
  -- 'full_diagnostic', 'skip_diagnostic', 'partial', 'detailed_diagnostic'

  initial_concern VARCHAR(100),
  -- 'wallpaper', 'flooring', 'barrier_free', 'overall', 'undecided', 'skip'

  completed_at TIMESTAMP WITH TIME ZONE,
  -- 診断完了時刻（スキップ時はNULL）

  -- セッション情報
  session_id VARCHAR(255),
  -- ブラウザセッション識別用UUID

  user_id UUID,
  -- 認証済みユーザーの場合のみ（auth.usersへの参照は環境により異なるため外部キー制約なし）

  -- Ver.4.0追加: ユーザー連絡先情報
  user_name VARCHAR(100),
  user_phone VARCHAR(20),
  user_email VARCHAR(255),

  -- メタデータ
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. 既存テーブルへのカラム追加（存在しない場合のみ）
ALTER TABLE diagnostic_results
  ADD COLUMN IF NOT EXISTS flow_type VARCHAR(50) DEFAULT 'full_diagnostic',
  ADD COLUMN IF NOT EXISTS initial_concern VARCHAR(100),
  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS user_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS user_phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS user_email VARCHAR(255);

-- 3. インデックス作成
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_session_id ON diagnostic_results(session_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_id ON diagnostic_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_created_at ON diagnostic_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_result_type ON diagnostic_results(result_type);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_flow_type ON diagnostic_results(flow_type);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_initial_concern ON diagnostic_results(initial_concern);

-- 4. JSONB GIN インデックス（高速検索用）
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_answers_gin ON diagnostic_results USING GIN (answers);

-- 5. RLS (Row Level Security) 有効化
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

-- 既存ポリシーを削除（IF EXISTSなので安全）
DROP POLICY IF EXISTS "Anyone can insert diagnostic results" ON diagnostic_results;
DROP POLICY IF EXISTS "Users can view their own results" ON diagnostic_results;

-- 新しいRLSポリシー: 誰でも挿入可能（匿名診断対応）
CREATE POLICY "Anyone can insert diagnostic results" ON diagnostic_results
  FOR INSERT
  WITH CHECK (true);

-- 新しいRLSポリシー: 全て閲覧可能（初期段階ではセキュリティよりデータ収集優先）
-- 本番運用時は適切な制限を追加してください
CREATE POLICY "Users can view their own results" ON diagnostic_results
  FOR SELECT
  USING (true);

-- 6. コメント追加
COMMENT ON TABLE diagnostic_results IS 'AI診断結果保存（Ver.5.0: JSONB柔軟設計）';
COMMENT ON COLUMN diagnostic_results.answers IS 'JSONB: 診断回答・結果・会話履歴など全て保存可能';
COMMENT ON COLUMN diagnostic_results.flow_type IS '診断フロータイプ: full_diagnostic/skip_diagnostic/partial/detailed_diagnostic';
COMMENT ON COLUMN diagnostic_results.initial_concern IS '最初の悩み選択: wallpaper/flooring/barrier_free/overall/undecided/skip';
COMMENT ON COLUMN diagnostic_results.completed_at IS '診断完了時刻（スキップ時はNULL）';

-- 7. 自動更新トリガー（updated_at）
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_diagnostic_results_updated_at ON diagnostic_results;
CREATE TRIGGER update_diagnostic_results_updated_at
  BEFORE UPDATE ON diagnostic_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- データ分析用便利クエリ（コメント解除して実行）
-- ========================================

-- Ver.5.0 データの確認
-- SELECT
--   id,
--   flow_type,
--   initial_concern,
--   answers->>'version' as version,
--   answers->'result'->>'result_type' as result_type,
--   completed_at,
--   created_at
-- FROM diagnostic_results
-- WHERE answers->>'version' = '5.0'
-- ORDER BY created_at DESC;

-- 診断タイプ別の集計
-- SELECT
--   flow_type,
--   COUNT(*) as count,
--   COUNT(user_email) as with_email_count
-- FROM diagnostic_results
-- GROUP BY flow_type
-- ORDER BY count DESC;

-- 悩み別の集計
-- SELECT
--   initial_concern,
--   COUNT(*) as count
-- FROM diagnostic_results
-- WHERE initial_concern IS NOT NULL
-- GROUP BY initial_concern
-- ORDER BY count DESC;

-- 日別の診断数
-- SELECT
--   DATE(created_at) as date,
--   flow_type,
--   COUNT(*) as count
-- FROM diagnostic_results
-- WHERE created_at >= NOW() - INTERVAL '30 days'
-- GROUP BY DATE(created_at), flow_type
-- ORDER BY date DESC, count DESC;

-- ========================================
-- 実行完了メッセージ
-- ========================================
DO $$
BEGIN
  RAISE NOTICE 'AI診断 Ver.5.0 マイグレーション完了！';
  RAISE NOTICE 'テーブル: diagnostic_results (JSONB柔軟設計)';
  RAISE NOTICE '今後の仕様変更はJSONB構造で柔軟対応可能';
END $$;
