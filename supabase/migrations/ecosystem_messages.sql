-- エコシステム会話テーブル
-- キャラクター同士の確率的な会話を保存

CREATE TABLE IF NOT EXISTS ecosystem_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL,
  character TEXT NOT NULL CHECK (character IN ('jijii', 'anya', 'takumi')),
  message TEXT NOT NULL,
  parent_id UUID REFERENCES ecosystem_messages(id) ON DELETE SET NULL,
  trigger TEXT,  -- 外部トリガー（NHKニュース等）
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_ecosystem_thread_id ON ecosystem_messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_ecosystem_created_at ON ecosystem_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ecosystem_character ON ecosystem_messages(character);

-- RLS (Row Level Security)
ALTER TABLE ecosystem_messages ENABLE ROW LEVEL SECURITY;

-- 読み取りは誰でも可能
CREATE POLICY "Allow read access" ON ecosystem_messages
  FOR SELECT USING (true);

-- 挿入は認証不要（n8nからのアクセス用）
CREATE POLICY "Allow insert access" ON ecosystem_messages
  FOR INSERT WITH CHECK (true);

-- コメント
COMMENT ON TABLE ecosystem_messages IS 'キャラクター間のエコシステム会話';
COMMENT ON COLUMN ecosystem_messages.thread_id IS '会話スレッドID';
COMMENT ON COLUMN ecosystem_messages.character IS '発言キャラクター (jijii/anya/takumi)';
COMMENT ON COLUMN ecosystem_messages.parent_id IS '返信先メッセージID';
COMMENT ON COLUMN ecosystem_messages.trigger IS '外部トリガー（NHK等）';
