-- 内田樹AIフィードバック収集テーブル
-- Purpose: 継続的Fine-Tuningのためのユーザーフィードバック保存

-- テーブル作成
CREATE TABLE IF NOT EXISTS uchida_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- フィードバック内容
  question TEXT NOT NULL,
  response TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),

  -- メタデータ
  model_version VARCHAR(20) NOT NULL DEFAULT 'v1.0',
  session_id VARCHAR(100),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- タイムスタンプ
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- 追加メタデータ（オプション）
  response_time_ms INTEGER, -- 応答時間
  topic VARCHAR(50), -- 質問トピック（労働、教育、武道など）
  user_agent TEXT -- ブラウザ情報
);

-- インデックス作成（クエリ高速化）
CREATE INDEX idx_uchida_feedback_created_at ON uchida_feedback(created_at DESC);
CREATE INDEX idx_uchida_feedback_model_version ON uchida_feedback(model_version);
CREATE INDEX idx_uchida_feedback_rating ON uchida_feedback(rating);
CREATE INDEX idx_uchida_feedback_user_id ON uchida_feedback(user_id);

-- RLS (Row Level Security) 設定
ALTER TABLE uchida_feedback ENABLE ROW LEVEL SECURITY;

-- ポリシー: 誰でもフィードバックを投稿可能
CREATE POLICY "Anyone can insert feedback"
  ON uchida_feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

-- ポリシー: 自分のフィードバックのみ閲覧可能
CREATE POLICY "Users can view own feedback"
  ON uchida_feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ポリシー: 管理者は全フィードバック閲覧可能
-- （管理者ロールを設定している場合）
CREATE POLICY "Admins can view all feedback"
  ON uchida_feedback
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM craftsmen_profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- コメント
COMMENT ON TABLE uchida_feedback IS '内田樹AI継続的Fine-Tuning用フィードバックテーブル';
COMMENT ON COLUMN uchida_feedback.question IS 'ユーザーの質問';
COMMENT ON COLUMN uchida_feedback.response IS 'AIの回答';
COMMENT ON COLUMN uchida_feedback.rating IS '1-5の評価（5が最高）';
COMMENT ON COLUMN uchida_feedback.model_version IS '使用したモデルバージョン（例: v1.0）';
COMMENT ON COLUMN uchida_feedback.session_id IS 'セッション識別子';
COMMENT ON COLUMN uchida_feedback.user_id IS 'ユーザーID（認証済みの場合）';
COMMENT ON COLUMN uchida_feedback.response_time_ms IS '応答時間（ミリ秒）';
COMMENT ON COLUMN uchida_feedback.topic IS '質問トピック（労働、教育、武道など）';

-- ビュー: 低評価フィードバック（改善候補）
CREATE OR REPLACE VIEW uchida_improvement_candidates AS
SELECT
  id,
  question,
  response,
  rating,
  model_version,
  created_at,
  topic
FROM uchida_feedback
WHERE rating <= 3
ORDER BY created_at DESC;

-- ビュー: 週次集計
CREATE OR REPLACE VIEW uchida_weekly_summary AS
SELECT
  model_version,
  DATE_TRUNC('week', created_at) AS week_start,
  COUNT(*) AS total_feedback,
  AVG(rating) AS avg_rating,
  COUNT(CASE WHEN rating <= 2 THEN 1 END) AS low_rated_count,
  COUNT(CASE WHEN rating >= 4 THEN 1 END) AS high_rated_count
FROM uchida_feedback
WHERE created_at >= NOW() - INTERVAL '90 days'
GROUP BY model_version, DATE_TRUNC('week', created_at)
ORDER BY week_start DESC, model_version;

-- 関数: トピック自動抽出
CREATE OR REPLACE FUNCTION extract_topic(question_text TEXT)
RETURNS VARCHAR(50)
LANGUAGE plpgsql
AS $$
BEGIN
  -- キーワードベースのトピック抽出
  IF question_text ~* '(労働|仕事|働く|キャリア)' THEN
    RETURN '労働';
  ELSIF question_text ~* '(教育|学校|大学|学び)' THEN
    RETURN '教育';
  ELSIF question_text ~* '(武道|合気道|稽古|身体)' THEN
    RETURN '武道';
  ELSIF question_text ~* '(哲学|思想|レヴィナス|ラカン)' THEN
    RETURN '思想';
  ELSIF question_text ~* '(社会|政治|経済|格差)' THEN
    RETURN '社会';
  ELSE
    RETURN 'その他';
  END IF;
END;
$$;

-- トリガー: 自動トピック抽出
CREATE OR REPLACE FUNCTION set_topic_on_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.topic IS NULL THEN
    NEW.topic := extract_topic(NEW.question);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_topic
BEFORE INSERT ON uchida_feedback
FOR EACH ROW
EXECUTE FUNCTION set_topic_on_insert();

-- サンプルデータ（開発用）
-- INSERT INTO uchida_feedback (question, response, rating, model_version, topic)
-- VALUES
--   ('労働の本質とは何ですか？', '労働とは、自己を贈与する行為です...', 5, 'v1.0', '労働'),
--   ('教育の目的は？', '教育とは、世代を超えた知の継承です...', 4, 'v1.0', '教育'),
--   ('合気道の意義を教えてください', '合気道は...', 3, 'v1.0', '武道');
