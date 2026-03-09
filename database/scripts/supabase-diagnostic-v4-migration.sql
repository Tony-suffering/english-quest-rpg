-- ========================================
-- AI診断 Ver.4.0 マイグレーション
-- ========================================
-- 目的：診断フロー改善（3問コア + 雑談 + スキップ対応）

-- 1. diagnostic_results テーブルに新カラム追加
ALTER TABLE diagnostic_results
  ADD COLUMN IF NOT EXISTS flow_type VARCHAR(50) DEFAULT 'full_diagnostic',
  -- 'full_diagnostic': 通常診断, 'skip_diagnostic': 診断スキップ, 'partial': 途中離脱

  ADD COLUMN IF NOT EXISTS initial_concern VARCHAR(100),
  -- 最初の選択肢: 'wallpaper', 'flooring', 'barrier_free', 'overall', 'undecided', 'skip'

  ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;
  -- 診断完了時刻（スキップの場合はNULL）

-- 2. インデックス追加
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_flow_type ON diagnostic_results(flow_type);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_initial_concern ON diagnostic_results(initial_concern);

-- 3. answers JSONB 構造の拡張（既存のJSONB構造はそのまま）
-- Ver.4.0 の answers 構造例:
-- {
--   "version": "4.0",
--   "initial_concern": "wallpaper",
--   "core_questions": {
--     "1": "A",  // 3問のコア質問のみ
--     "2": "B",
--     "3": "A"
--   },
--   "chat_insights": {
--     // 雑談から得られた追加情報（任意）
--     "budget_mentioned": "100万円くらい",
--     "timeline": "来月中に",
--     "family_structure": "夫婦+子供2人"
--   },
--   "skipped": false
-- }

-- 4. コメント追加
COMMENT ON COLUMN diagnostic_results.flow_type IS '診断フロータイプ: full_diagnostic/skip_diagnostic/partial';
COMMENT ON COLUMN diagnostic_results.initial_concern IS '最初の悩み選択: wallpaper/flooring/barrier_free/overall/undecided/skip';
COMMENT ON COLUMN diagnostic_results.completed_at IS '診断完了時刻（スキップ時はNULL）';

-- ========================================
-- 実行後の確認クエリ
-- ========================================
-- Ver.4.0 データの確認
-- SELECT
--   id,
--   flow_type,
--   initial_concern,
--   answers->>'version' as version,
--   completed_at,
--   created_at
-- FROM diagnostic_results
-- WHERE answers->>'version' = '4.0'
-- ORDER BY created_at DESC;
