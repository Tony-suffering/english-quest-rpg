'use client';

import Link from 'next/link';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';
import { ToeicPart } from '@/data/izakaya-toeic/types';
import { T } from '@/data/izakaya-toeic/theme';

const PART_SHORT: Record<ToeicPart, string> = {
  1: 'P1', 2: 'P2', 3: 'P3', 4: 'P4', 5: 'P5', 6: 'P6', 7: 'P7',
};

// Supplemental character hooks -- these make users care about the person
const CHARACTER_HOOKS: Record<string, {
  tagline: string;
  story: string;
  traits: string[];
}> = {
  master: {
    tagline: '全てを見てきた男',
    story: 'かつてTOEIC満点を連続で叩き出した伝説の講師。突然教壇を降り、路地裏に居酒屋「のれん」を開いた。理由は誰も知らない。ビールを注ぐ手は穏やかだが、一言が刺さる。',
    traits: ['寡黙', '洞察力', '元満点講師'],
  },
  yuki: {
    tagline: '笑いながら泣いてる主人公',
    story: '商社の営業として日々奔走。英語が必要な場面は増える一方なのに、スコアは620で頭打ち。悔しさを毒舌で隠すタイプ。のれんの常連の中で一番リアルに悩んでる。',
    traits: ['負けず嫌い', '毒舌', '努力家'],
  },
  takeshi: {
    tagline: 'ポジティブの暴力',
    story: 'IT企業のPMとして論理的に仕事をこなすが、英語になると壊滅的。でも落ち込まない。間違えても笑い、また挑む。その姿勢が周りを救っていることに本人は気づいていない。',
    traits: ['お調子者', '前向き', 'ムードメーカー'],
  },
  lisa: {
    tagline: 'ネイティブの壁を知る女',
    story: '帰国子女で英語はペラペラ。でもTOEIC特有の「引っ掛け」に何度もハマる。ネイティブ感覚とTOEICは別物だと痛感しながらも、プライドが邪魔して素直に聞けない。',
    traits: ['帰国子女', 'プライド高め', '実は繊細'],
  },
  kenji: {
    tagline: '部下のために戦うおっさん',
    story: '建設畑一筋25年。英語なんて無縁だった。でも会社がグローバル化し、部下の前でTOEICスコアを晒す羽目に。昭和のおっさんが、プライドを捨てて学び直す姿が泣ける。',
    traits: ['不器用', '義理堅い', '部下思い'],
  },
  mina: {
    tagline: '天然リスニングモンスター',
    story: '派遣社員として働きながら、K-POPとNetflixで鍛えた耳だけは異常に強い。リーディングは壊滅的だが、聞き取りだけなら860点のリサすら超える。本人はその凄さに無自覚。',
    traits: ['天然', 'リスニング最強', '無自覚の天才'],
  },
};

function ScoreBar({ current, target, color }: { current: number; target: number; color: string }) {
  const pct = Math.min((current / 990) * 100, 100);
  const targetPct = Math.min((target / 990) * 100, 100);
  return (
    <div style={{ position: 'relative', height: 6, background: T.border, borderRadius: 3, overflow: 'visible' }}>
      <div style={{
        height: '100%', borderRadius: 3,
        background: `linear-gradient(90deg, ${color}40, ${color})`,
        width: `${pct}%`, transition: 'width 0.8s ease',
      }} />
      {current !== target && (
        <div style={{
          position: 'absolute', top: -2, left: `${targetPct}%`,
          width: 2, height: 10, background: color + '60',
          borderRadius: 1,
        }} />
      )}
    </div>
  );
}

export default function CharactersPage() {
  // All characters always expanded (no accordion)
  const expandedId = '__all__';

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Hero header */}
      <div style={{
        padding: '40px 20px 32px',
        textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <Link href="/english/izakaya-toeic" style={{
          fontSize: 11, color: T.textMuted, textDecoration: 'none',
          display: 'inline-block', marginBottom: 16,
        }}>
          {'<'} 居酒屋TOEIC
        </Link>

        <div style={{
          display: 'inline-block',
          padding: '3px 14px',
          background: T.goldBg,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: 3,
          marginBottom: 14,
        }}>
          CAST
        </div>

        <h1 style={{
          fontSize: 'clamp(22px, 6vw, 32px)',
          fontWeight: 900,
          margin: '0 0 4px',
          letterSpacing: -0.5,
        }}>
          <span style={{ color: T.textMuted, fontWeight: 400, fontSize: '0.55em', letterSpacing: 2, display: 'block', marginBottom: 6 }}>
            REGULARS
          </span>
          のれんの常連たち
        </h1>

        <p style={{
          fontSize: 13, color: T.textSub, maxWidth: 400, margin: '12px auto 0', lineHeight: 1.8,
        }}>
          路地裏の居酒屋「のれん」に夜な夜な集まる6人。
          <br />
          それぞれの事情を抱えて、今日もTOEICと向き合う。
        </p>
      </div>

      {/* Character cards */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {IZAKAYA_CHARACTERS.map((char, i) => {
            const hook = CHARACTER_HOOKS[char.id];
            const isExpanded = true;
            const isMaster = char.id === 'master';

            return (
              <div
                key={char.id}
                style={{
                  position: 'relative',
                  padding: 0,
                  background: T.surface,
                  borderRadius: 16,
                  border: `1px solid ${isExpanded ? char.color + '50' : T.border}`,
                  transition: 'all 0.25s ease',
                  boxShadow: `0 8px 32px ${char.color}15`,
                  overflow: 'hidden',
                  animation: `izk-slideup 0.4s ease ${i * 0.07}s both`,
                }}
              >
                {/* Color accent top bar */}
                <div style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${char.color}, ${char.color}40)`,
                }} />

                <div style={{ padding: '16px 20px' }}>
                  {/* Top row: avatar + name + score */}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    {/* Initial badge */}
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${char.color}18, ${char.color}08)`,
                      border: `2.5px solid ${char.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 900, fontSize: 20, color: char.color,
                      flexShrink: 0,
                      boxShadow: isExpanded
                        ? `0 0 20px ${char.color}30, inset 0 0 12px ${char.color}10`
                        : `0 2px 8px ${char.color}10`,
                      transition: 'box-shadow 0.3s ease',
                    }}>
                      {char.initial}
                    </div>

                    {/* Name + job */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>
                          {char.name}
                        </span>
                        <span style={{ fontSize: 11, color: T.textMuted }}>{char.age}歳</span>
                      </div>
                      <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>
                        {char.job}
                      </div>
                      {hook && (
                        <div style={{
                          fontSize: 11, color: char.color, fontWeight: 600,
                          marginTop: 4, fontStyle: 'italic',
                        }}>
                          -- {hook.tagline}
                        </div>
                      )}
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 22, fontWeight: 900, color: char.color,
                        lineHeight: 1,
                      }}>
                        {char.currentScore}
                      </div>
                      <div style={{ fontSize: 9, color: T.textMuted, marginTop: 2, letterSpacing: 1 }}>
                        {isMaster ? 'PERFECT' : 'CURRENT'}
                      </div>
                      {!isMaster && (
                        <div style={{ fontSize: 10, color: T.textMuted, marginTop: 1 }}>
                          target {char.targetScore}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Score bar */}
                  <div style={{ marginTop: 12 }}>
                    <ScoreBar current={char.currentScore} target={char.targetScore} color={char.color} />
                  </div>

                  {/* Personality traits pills */}
                  {hook && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {hook.traits.map(trait => (
                        <span key={trait} style={{
                          padding: '3px 10px',
                          background: char.color + '10',
                          color: char.color,
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 20,
                          border: `1px solid ${char.color}18`,
                          letterSpacing: 0.5,
                        }}>
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expanded detail */}
                  {isExpanded && hook && (
                    <div style={{
                      marginTop: 16, paddingTop: 16,
                      borderTop: `1px solid ${T.border}`,
                      animation: 'izk-fadein 0.3s ease',
                    }}>
                      {/* Story */}
                      <p style={{
                        fontSize: 13, color: T.textSub, lineHeight: 1.85,
                        margin: '0 0 16px',
                      }}>
                        {hook.story}
                      </p>

                      {/* Catchphrase */}
                      <div style={{
                        padding: '14px 16px',
                        background: `linear-gradient(135deg, ${char.color}06, ${char.color}03)`,
                        borderRadius: 10,
                        marginBottom: 16,
                        borderLeft: `3px solid ${char.color}`,
                      }}>
                        <div style={{
                          fontSize: 9, color: char.color, fontWeight: 700,
                          marginBottom: 6, letterSpacing: 2,
                        }}>
                          CATCHPHRASE
                        </div>
                        <div style={{
                          fontSize: 14, color: T.text, lineHeight: 1.6, fontWeight: 600,
                        }}>
                          {char.catchphrase}
                        </div>
                        <div style={{
                          fontSize: 12, color: T.textMuted, fontStyle: 'italic', marginTop: 6,
                        }}>
                          &quot;{char.catchphraseEn}&quot;
                        </div>
                      </div>

                      {/* TOEIC strengths & weaknesses */}
                      <div style={{ display: 'flex', gap: 12 }}>
                        {char.strongPoints.length > 0 && (
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: 9, color: T.green, fontWeight: 700,
                              marginBottom: 6, letterSpacing: 2,
                            }}>
                              STRONG
                            </div>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {char.strongPoints.map(p => (
                                <span key={p} style={{
                                  padding: '3px 8px', background: T.green + '12',
                                  color: T.green, fontSize: 10, fontWeight: 700, borderRadius: 4,
                                }}>
                                  {PART_SHORT[p]}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {char.weakPoints.length > 0 && (
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: 9, color: T.red, fontWeight: 700,
                              marginBottom: 6, letterSpacing: 2,
                            }}>
                              WEAK
                            </div>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {char.weakPoints.map(p => (
                                <span key={p} style={{
                                  padding: '3px 8px', background: T.red + '12',
                                  color: T.red, fontSize: 10, fontWeight: 700, borderRadius: 4,
                                }}>
                                  {PART_SHORT[p]}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Personality description from original data */}
                      <div style={{
                        marginTop: 14, padding: '10px 14px',
                        background: T.bgSecondary,
                        borderRadius: 8,
                        fontSize: 12, color: T.textMuted, lineHeight: 1.7,
                        fontStyle: 'italic',
                      }}>
                        {char.personality}
                      </div>
                    </div>
                  )}

                  {/* Expand hint */}
                  <div style={{
                    textAlign: 'center', marginTop: 10,
                    fontSize: 10, color: T.textMuted,
                    transition: 'opacity 0.2s',
                    opacity: isExpanded ? 0 : 0.6,
                  }}>
                    tap to read story
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: 40,
          padding: '32px 24px',
          background: `linear-gradient(135deg, #FFFBEB, ${T.surface})`,
          borderRadius: 16,
          border: `1px solid ${T.goldBorder}`,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 9, color: T.gold, fontWeight: 700,
            letterSpacing: 3, marginBottom: 10,
          }}>
            STORY BEGINS
          </div>
          <p style={{
            fontSize: 14, color: T.textSub, lineHeight: 1.8,
            margin: '0 0 20px',
          }}>
            6人の常連が集まる居酒屋「のれん」。
            <br />
            マスターの一言から、TOEICの夜が始まる。
          </p>
          <Link href="/english/izakaya-toeic/episodes/ep-001" style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: `linear-gradient(135deg, ${T.gold}, #B8960F)`,
            color: '#fff',
            borderRadius: 10,
            fontWeight: 800,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: `0 4px 20px ${T.gold}40`,
            letterSpacing: 0.5,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}>
            Episode 1 を始める
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes izk-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes izk-slideup {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
