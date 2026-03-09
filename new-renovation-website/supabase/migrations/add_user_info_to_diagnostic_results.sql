-- diagnostic_resultsテーブルに個人情報カラムを追加

ALTER TABLE diagnostic_results
ADD COLUMN IF NOT EXISTS user_name TEXT,
ADD COLUMN IF NOT EXISTS user_phone TEXT,
ADD COLUMN IF NOT EXISTS user_email TEXT;

-- インデックスを追加（検索用）
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_name ON diagnostic_results(user_name);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_phone ON diagnostic_results(user_phone);
CREATE INDEX IF NOT EXISTS idx_diagnostic_results_user_email ON diagnostic_results(user_email);

COMMENT ON COLUMN diagnostic_results.user_name IS '利用者の氏名';
COMMENT ON COLUMN diagnostic_results.user_phone IS '利用者の電話番号';
COMMENT ON COLUMN diagnostic_results.user_email IS '利用者のメールアドレス';
