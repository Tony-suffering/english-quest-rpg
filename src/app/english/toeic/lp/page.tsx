'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IZAKAYA_CHARACTERS, charIcon } from '@/data/izakaya-toeic/characters';

/* ── Design Tokens ── */
const G = '#D4AF37';
const G_BG = '#FFFBEB';
const G_BORDER = 'rgba(212,175,55,0.25)';
const EM = '#10B981';
const BG = '#FAFAF9';
const SURFACE = '#FFFFFF';
const TEXT = '#1C1917';
const TEXT_SUB = '#57534E';
const TEXT_MUTED = '#78716C';
const BORDER = '#E7E5E4';
const SHADOW = '0 2px 8px rgba(28,25,23,0.06)';
const SHADOW_MD = '0 4px 16px rgba(28,25,23,0.08)';
const FONT = 'system-ui, -apple-system, sans-serif';

const CHAR_TAGLINES: Record<string, string> = {
  master: '全てを見てきた男',
  yuki: '笑いながら泣いてる主人公',
  takeshi: 'ポジティブの暴力',
  lisa: 'ネイティブの壁を知る女',
  kenji: '部下のために戦うおっさん',
  mina: '天然リスニングモンスター',
};

const CHAR_HOOKS: Record<string, string> = {
  master: 'TOEIC満点の男が、なぜ居酒屋をやってるのか。その秘密は第30夜で明かされる。',
  yuki: '620点。中途半端が一番つらい。昇進がかかってる。もう後がない。',
  takeshi: 'いつもニコニコ。でもこいつの笑顔には裏がある。',
  lisa: '帰国子女でTOEIC 860。高い？ 帰国子女にしては低い。それがリサの傷。',
  kenji: '高卒叩き上げ52歳。娘の外国人の彼氏と、ビールを飲みたかっただけ。',
  mina: 'K-POPとNetflixで育った天然。ある秘密が発覚した夜、カウンターが凍る。',
};

const WEEKS = [
  { week: 1, title: 'Part 2 -- カウンターに座る', sub: '間接応答・WH疑問文・提案/申し出', color: G },
  { week: 2, title: 'Part 3 -- 常連になる', sub: 'パラフレーズ・3人会話・先読み', color: EM },
  { week: 3, title: 'Part 4 -- 一人で聞ける', sub: 'アナウンス・留守電・グラフィック', color: '#3B82F6' },
  { week: 4, title: '総合力 -- 聞くから使うへ', sub: 'パラフレーズ発話・音変化・スピーキング', color: '#8B5CF6' },
  { week: 5, title: '卒業 -- マスターが認めた夜', sub: '試験前夜・秘密・卒業', color: G },
];

const EPISODE1_LINES = [
  { speaker: 'narration', text: '金曜日、午後9時。路地裏の居酒屋「のれん」。雨が降り始めている。' },
  { speaker: 'yuki', text: 'マスター、生ビール。', mood: '手が少し震えている' },
  { speaker: 'master', text: '寒いか。', mood: '静かにビールを注ぎ始める' },
  { speaker: 'yuki', text: '別に。' },
  { speaker: 'yuki', text: '海外営業部、落ちた。' },
  { speaker: 'master', text: 'トーイック。' },
  { speaker: 'yuki', text: '800必要なの。今620。来月もう一回受けられるけど...180点上げるとか、無理でしょ普通。' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
        <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: TEXT, flex: 1 }}>{q}</span>
        <span style={{
          fontSize: 18, color: TEXT_MUTED, transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0,
        }}>+</span>
      </div>
      <div style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, opacity 0.3s', opacity: open ? 1 : 0 }}>
        <p style={{ fontFamily: FONT, fontSize: 14, color: TEXT_SUB, lineHeight: 1.9, margin: 0, paddingBottom: 20 }}>{a}</p>
      </div>
    </div>
  );
}

export default function IzakayaToeicLP() {
  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: FONT }}>

      {/* ====== HERO ====== */}
      <section style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '60px 20px',
        textAlign: 'center', background: `linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 40%, ${BG} 100%)`,
        position: 'relative',
      }}>
        <div style={{
          padding: '4px 16px', background: 'rgba(212,175,55,0.12)',
          border: `1px solid ${G_BORDER}`, borderRadius: 20,
          fontSize: 10, fontWeight: 700, color: G, letterSpacing: 3, marginBottom: 24,
        }}>
          TOEIC LISTENING -- 全30話の連続ドラマ
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.4, maxWidth: 600 }}>
          TOEIC学習アプリの中に<br />
          <span style={{ color: G }}>全30話の連続ドラマ</span>を<br />
          入れた。
        </h1>

        <p style={{ fontSize: 15, color: TEXT_SUB, maxWidth: 420, margin: '0 auto 32px', lineHeight: 2 }}>
          居酒屋で酒を飲みながらTOEICを勉強する。
          <br />しかも泣ける。
          <br />何を言ってるかわからないと思うが、俺もわからない。
        </p>

        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
          {[
            { value: '30', label: '話' },
            { value: '6', label: '人のキャラ' },
            { value: '0', label: '円' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 32, fontWeight: 900, color: G }}>{s.value}</div>
              <div style={{ fontSize: 11, color: TEXT_MUTED, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <Link href="/english/toeic/episodes/ep-001" style={{
          display: 'inline-block', padding: '14px 40px', background: G, color: '#fff',
          borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none',
          boxShadow: SHADOW_MD,
        }}>
          第1夜を始める
        </Link>

        <p style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 10 }}>
          登録不要 -- ブラウザだけで始められます
        </p>

        <div style={{ position: 'absolute', bottom: 24, fontSize: 11, color: `${TEXT_MUTED}80`, letterSpacing: 1 }}>
          SCROLL
          <div style={{ textAlign: 'center', marginTop: 4, fontSize: 14 }}>v</div>
        </div>
      </section>

      {/* ====== PROBLEM ====== */}
      <section style={{ padding: '80px 20px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 3, marginBottom: 12, textAlign: 'center' }}>
          THE PROBLEM
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', margin: '0 0 32px', lineHeight: 1.6 }}>
          単語帳を買って3日で飽きた<br />
          全員に告ぐ。
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            'TOEIC参考書を買って本棚に飾ったことがある。',
            'アプリを入れて通知を切ったことがある。',
            '金フレを3周して満足して忘れたことがある。',
            'リスニングを聞き流して寝落ちしたことがある。',
            'スタディサプリの無料期間だけで消したことがある。',
          ].map((line, i) => (
            <div key={i} style={{
              padding: '14px 18px', background: SURFACE, borderRadius: 10,
              border: `1px solid ${BORDER}`, fontSize: 14, color: TEXT_SUB, lineHeight: 1.7,
            }}>
              {line}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32, padding: '24px', background: G_BG, borderRadius: 14,
          border: `1px solid ${G_BORDER}`, textAlign: 'center',
        }}>
          <p style={{ fontSize: 18, fontWeight: 800, color: TEXT, margin: '0 0 8px', lineHeight: 1.6 }}>
            勉強が続かない理由はシンプル。
          </p>
          <p style={{ fontSize: 22, fontWeight: 900, color: G, margin: 0 }}>
            つまらないから。
          </p>
        </div>
      </section>

      {/* ====== SOLUTION ====== */}
      <section style={{ padding: '80px 20px', background: SURFACE }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 10, color: EM, fontWeight: 700, letterSpacing: 3, marginBottom: 12, textAlign: 'center' }}>
            THE SOLUTION
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', margin: '0 0 12px', lineHeight: 1.6 }}>
            面白ければ続く。<br />
            気になれば次を開く。
          </h2>
          <p style={{ fontSize: 14, color: TEXT_SUB, textAlign: 'center', margin: '0 0 36px', lineHeight: 1.9 }}>
            マスターの秘密が気になったら、第30夜まで止まらない。
            <br />勉強させられてることに気づかない。これが設計。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: '物語の中で自然にTOEIC問題が出る', body: 'ケンジがパチスロの知識でPart 7を解く。マスターがビールで前置詞を教える。ミナがK-POPの歌詞で文法を覚える。全部、物語の中で起きる。' },
              { title: '居酒屋だから緊張しない', body: '教室じゃなくて飲み屋。酒が入ると心理的バリアが下がる。居酒屋の会話は短い、くだけてる、本音。実際の英会話と同じ構造。' },
              { title: '6人全員が壊れる夜がある', body: 'ある人は泣く。ある人は怒る。ある人は笑顔の仮面が剥がれる。一番泣けるのは、一番弱そうに見えてた人が立ち上がる夜。' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '20px 24px', background: BG, borderRadius: 14,
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.8 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CHARACTERS ====== */}
      <section style={{ padding: '80px 20px', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 3, marginBottom: 12, textAlign: 'center' }}>
          THE REGULARS
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, textAlign: 'center', margin: '0 0 8px' }}>
          のれんの常連たち
        </h2>
        <p style={{ fontSize: 13, color: TEXT_MUTED, textAlign: 'center', margin: '0 0 36px' }}>
          6人の事情。6つのスコア。1つの居酒屋。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {IZAKAYA_CHARACTERS.map(char => (
            <div key={char.id} style={{
              display: 'flex', gap: 16, padding: '20px', background: SURFACE,
              borderRadius: 14, border: `1px solid ${BORDER}`, boxShadow: SHADOW,
              alignItems: 'flex-start',
            }}>
              <img
                src={charIcon(char.id)}
                alt={char.name}
                style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: `2px solid ${char.color}`, objectFit: 'cover', flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{char.name.split('（')[0]}</span>
                  <span style={{ fontSize: 11, color: char.color, fontWeight: 700 }}>
                    {char.currentScore}点
                  </span>
                  <span style={{ fontSize: 11, color: TEXT_MUTED }}>
                    {char.age}歳 / {char.job.split('（')[0]}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: char.color, fontWeight: 700, fontStyle: 'italic', marginBottom: 6 }}>
                  {CHAR_TAGLINES[char.id]}
                </div>
                <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.7 }}>
                  {CHAR_HOOKS[char.id]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== EPISODE 1 PREVIEW ====== */}
      <section style={{ padding: '80px 20px', background: SURFACE }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 3, marginBottom: 12, textAlign: 'center' }}>
            EPISODE 1 PREVIEW
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', margin: '0 0 8px' }}>
            第1夜。ユキ、昇進がかかってる
          </h2>
          <p style={{ fontSize: 13, color: TEXT_MUTED, textAlign: 'center', margin: '0 0 28px' }}>
            この第1夜の一言が、第30夜で全て回収される。
          </p>

          <div style={{
            background: '#1C1917', borderRadius: 16, padding: '24px 20px',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {EPISODE1_LINES.map((line, i) => {
              if (line.speaker === 'narration') {
                return (
                  <div key={i} style={{ fontSize: 13, color: '#A8A29E', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7 }}>
                    {line.text}
                  </div>
                );
              }
              const char = IZAKAYA_CHARACTERS.find(c => c.id === line.speaker);
              const isLeft = line.speaker === 'yuki';
              return (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  flexDirection: isLeft ? 'row' : 'row-reverse',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: char?.color || '#666', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff',
                  }}>
                    {char?.initial || '?'}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#78716C', marginBottom: 3 }}>
                      {char?.name.split('（')[0]}
                    </div>
                    <div style={{
                      padding: '10px 14px', borderRadius: 12,
                      background: isLeft ? '#292524' : '#2D2520',
                      border: isLeft ? '1px solid #3D3835' : `1px solid ${G}30`,
                      fontSize: 14, color: '#E7E5E4', lineHeight: 1.6,
                    }}>
                      {line.text}
                    </div>
                    {line.mood && (
                      <div style={{ fontSize: 10, color: '#57534E', marginTop: 3, fontStyle: 'italic' }}>
                        {line.mood}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 12, color: '#78716C', fontStyle: 'italic' }}>
                ...この続きは、のれんの中で。
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/english/toeic/episodes/ep-001" style={{
              display: 'inline-block', padding: '12px 32px', background: G, color: '#fff',
              borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: 'none',
              boxShadow: SHADOW_MD,
            }}>
              第1夜を読む
            </Link>
          </div>
        </div>
      </section>

      {/* ====== IZAKAYA PART 5 EXAMPLE ====== */}
      <section style={{ padding: '80px 20px', maxWidth: 560, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: EM, fontWeight: 700, letterSpacing: 3, marginBottom: 12, textAlign: 'center' }}>
          HOW IT TEACHES
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', margin: '0 0 28px', lineHeight: 1.5 }}>
          居酒屋でTOEIC Part 5を解く狂気
        </h2>

        <div style={{
          background: SURFACE, borderRadius: 14, border: `1px solid ${BORDER}`,
          padding: '24px', boxShadow: SHADOW,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14, color: TEXT_SUB, lineHeight: 1.8 }}>
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 700, color: TEXT }}>マスター:</span>{' '}
              前置詞は料理と同じ。in、on、at。入れる、乗せる、そこにある。
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 700, color: '#92400E' }}>ケンジ:</span>{' '}
              枝豆はinの皿にあるのか、onの皿にあるのか。
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 700, color: TEXT }}>マスター:</span>{' '}
              枝豆は<span style={{ color: G, fontWeight: 700 }}>in</span>だ。皿の中。
              醤油は<span style={{ color: EM, fontWeight: 700 }}>on</span>だ。枝豆の上にかかってる。
              お前は<span style={{ color: '#3B82F6', fontWeight: 700 }}>at</span>だ。カウンターにいるだけだ。
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 700, color: '#8B5CF6' }}>ミナ:</span>{' '}
              じゃあ好きな人への気持ちは。
            </p>
            <p style={{ margin: 0, fontStyle: 'italic', color: TEXT_MUTED }}>
              全員黙る。
            </p>
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 700, color: TEXT }}>マスター:</span>{' '}
              ......<span style={{ color: G, fontWeight: 700 }}>in</span>だな。中にしまっておけ。
            </p>
          </div>

          <div style={{
            marginTop: 20, padding: '14px 18px', background: G_BG,
            borderRadius: 10, border: `1px solid ${G_BORDER}`,
            fontSize: 13, fontWeight: 700, color: G, textAlign: 'center', lineHeight: 1.6,
          }}>
            TOEIC Part 5が居酒屋の会話になった瞬間、二度と忘れない。
          </div>
        </div>
      </section>

      {/* ====== 30-DAY STRUCTURE ====== */}
      <section style={{ padding: '80px 20px', background: SURFACE }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 10, color: G, fontWeight: 700, letterSpacing: 3, marginBottom: 12, textAlign: 'center' }}>
            30 NIGHTS
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, textAlign: 'center', margin: '0 0 8px' }}>
            のれん30夜
          </h2>
          <p style={{ fontSize: 13, color: TEXT_MUTED, textAlign: 'center', margin: '0 0 32px' }}>
            第1夜で張った伏線が第30夜で回収される。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {WEEKS.map((w, i) => (
              <div key={w.week}>
                {i > 0 && <div style={{ width: 2, height: 16, background: BORDER, margin: '0 auto' }} />}
                <div style={{
                  padding: '18px 20px', background: BG, borderRadius: 12,
                  border: `1px solid ${BORDER}`, borderLeft: `3px solid ${w.color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, color: w.color,
                      background: `${w.color}12`, padding: '2px 10px', borderRadius: 10,
                    }}>
                      {w.week <= 4 ? `WEEK ${w.week}` : 'FINAL'}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: TEXT }}>{w.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_MUTED, marginTop: 4 }}>{w.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 24, padding: '16px 20px', background: G_BG,
            borderRadius: 12, border: `1px solid ${G_BORDER}`,
            textAlign: 'center', fontSize: 13, color: TEXT_SUB, lineHeight: 1.8,
          }}>
            1話15-20分。通勤電車で読める。
            <br />30日で150フレーズ。気づいたらリスニングが変わってる。
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section style={{ padding: '80px 20px', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, textAlign: 'center', margin: '0 0 32px' }}>
          よくある質問
        </h2>
        <FAQItem q="本当に無料？" a="全話無料。登録も不要。ブラウザで今すぐ読める。" />
        <FAQItem q="TOEICの何が対象？" a="Part 2のリスニング中心。Part 3-7も各話に自然に含まれる。" />
        <FAQItem q="英会話マスター365との違いは？" a="居酒屋トーイックはTOEIC対策特化の30夜ドラマ。英会話マスター365は日常会話フレーズの在庫づくり。目的が違う。併用もできる。" />
        <FAQItem q="1日何分かかる？" a="1話15-20分。通勤電車やお風呂で読める量。" />
        <FAQItem q="物語読むだけで点数上がるの？" a="物語で出会って、各話のTOEIC問題で練習して、毎日5フレーズを覚える。30日で150フレーズ。読むだけじゃなくて、解いて覚える設計になってる。" />
        <FAQItem q="途中からでも始められる？" a="第1夜から順番に読んでほしい。伏線がある。飛ばすともったいない。" />
      </section>

      {/* ====== FINAL CTA ====== */}
      <section style={{
        padding: '80px 20px', textAlign: 'center',
        background: `linear-gradient(180deg, ${BG} 0%, #FEF3C7 100%)`,
      }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: TEXT_SUB, margin: '0 0 8px', lineHeight: 1.8 }}>
          のれんをくぐるかどうかは、あなた次第。
        </p>
        <p style={{ fontSize: 13, color: TEXT_MUTED, fontStyle: 'italic', margin: '0 0 28px' }}>
          マスターが言ってた。のれんは、くぐりたい人だけがくぐる。
        </p>

        <Link href="/english/toeic/episodes/ep-001" style={{
          display: 'inline-block', padding: '16px 48px', background: G, color: '#fff',
          borderRadius: 12, fontWeight: 800, fontSize: 16, textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(212,175,55,0.3)',
        }}>
          第1夜を始める
        </Link>

        <p style={{ fontSize: 12, color: TEXT_MUTED, marginTop: 12 }}>
          少なくとも、ケンジのパチスロの話は面白い。
        </p>
      </section>

      <style>{`
        @keyframes izk-lp-fade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
