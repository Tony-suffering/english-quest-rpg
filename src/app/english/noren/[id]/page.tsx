'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Footprints, Mountain, BookOpen,
  ChevronRight, Lightbulb, AlertTriangle, Flame, PenLine,
} from 'lucide-react';
import {
  SAMPLE_NORENS, BADGE_CONFIG, DRIVE_CONFIG,
  getNorenNickname, setNorenNickname,
  getWalkingNorens, startWalking, isWalking,
  addUserFootprint, getUserFootprints, getMergedFootprints,
  getUserMilestone, setUserMilestone, calculateUserBadge,
  type Noren, type Walker, type Footprint, type Milestone,
} from '@/data/noren';

// ─── Constants ─────────────────────────────────────────────

const C = {
  gold: '#D4AF37', goldLight: '#FFFBEB', goldDark: '#B8962E',
  emerald: '#10B981', emeraldLight: '#ECFDF5',
  s50: '#FAFAF9', s100: '#F5F5F4', s200: '#E7E5E4', s300: '#D6D3D1',
  s400: '#A8A29E', s500: '#78716C', s600: '#57534E', s700: '#44403C',
  s800: '#292524', s900: '#1C1917', white: '#FFFFFF',
} as const;

const FP_STYLE: Record<Footprint['type'], { color: string; bg: string; border: string; label: string }> = {
  breakthrough: { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', label: '突破' },
  struggle:     { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', label: '苦戦' },
  tip:          { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', label: 'コツ' },
};

const FP_ICON: Record<Footprint['type'], React.ReactNode> = {
  breakthrough: <Flame size={13} />,
  struggle:     <AlertTriangle size={13} />,
  tip:          <Lightbulb size={13} />,
};

// ─── Story week grouping ────────────────────────────────────

interface StoryWeek {
  weekNum: number;       // 1-based display week number
  startDate: Date;       // Monday of this ISO week
  footprints: Footprint[];
}

function getISOWeekKey(date: Date): string {
  // Returns "YYYY-WW" for grouping
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-${String(weekNo).padStart(2, '0')}`;
}

function getMondayOfISOWeek(isoKey: string): Date {
  const [year, week] = isoKey.split('-').map(Number);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayOfWeek = jan4.getUTCDay() || 7;
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - (dayOfWeek - 1) + (week - 1) * 7);
  return monday;
}

function groupFootprintsByWeek(footprints: Footprint[]): StoryWeek[] {
  if (footprints.length === 0) return [];

  // Sort chronologically oldest first
  const sorted = [...footprints].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group by ISO week key
  const map = new Map<string, Footprint[]>();
  for (const fp of sorted) {
    const key = getISOWeekKey(new Date(fp.date));
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(fp);
  }

  // Convert to sorted StoryWeek array
  const keys = Array.from(map.keys()).sort();
  return keys.map((key, idx) => ({
    weekNum: idx + 1,
    startDate: getMondayOfISOWeek(key),
    footprints: map.get(key)!,
  }));
}

function formatMonthDay(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function formatWeekStart(date: Date): string {
  return `${date.getMonth() + 1}月${date.getDate()}日〜`;
}

// ─── Badge ─────────────────────────────────────────────────

function Badge({ level }: { level: string }) {
  const cfg = BADGE_CONFIG[level as keyof typeof BADGE_CONFIG];
  if (!cfg) return null;
  return (
    <span style={{
      display: 'inline-block', padding: '4px 8px', fontSize: '10px',
      fontWeight: 700, letterSpacing: '0.06em', color: cfg.color,
      backgroundColor: cfg.bg, borderRadius: '4px', lineHeight: 1,
    }}>
      {cfg.label}
    </span>
  );
}

// ─── Walker dot ────────────────────────────────────────────

function WalkerDot({ walker }: { walker: Walker }) {
  const cfg = BADGE_CONFIG[walker.badge];
  return (
    <div title={walker.nickname} style={{
      width: '28px', height: '28px', borderRadius: '50%',
      backgroundColor: cfg.bg, border: `2px solid ${cfg.color}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '12px', fontWeight: 700, color: cfg.color, flexShrink: 0,
    }}>
      {walker.nickname.charAt(0)}
    </div>
  );
}

// ─── Story entry ────────────────────────────────────────────

function StoryEntry({ footprint, isLast }: { footprint: Footprint; isLast: boolean }) {
  const s = FP_STYLE[footprint.type];
  const noteUrl = (footprint as any).noteUrl as string | undefined;

  return (
    <div style={{
      display: 'flex', gap: '20px',
      paddingBottom: '16px', paddingTop: '16px',
      borderBottom: isLast ? 'none' : `1px solid ${C.s100}`,
    }}>
      {/* Date column */}
      <div style={{
        width: '36px', flexShrink: 0,
        fontSize: '12px', color: C.s400,
        fontWeight: 600, paddingTop: '2px',
        letterSpacing: '0.02em',
      }}>
        {formatMonthDay(footprint.date)}
      </div>

      {/* Content column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Name + badges row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          flexWrap: 'wrap', marginBottom: '8px',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: C.s800 }}>
            {footprint.nickname}
          </span>
          <Badge level={footprint.badge} />
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            fontSize: '11px', fontWeight: 700, color: s.color,
            backgroundColor: s.bg, border: `1px solid ${s.border}`,
            borderRadius: '4px', padding: '2px 6px', lineHeight: 1,
          }}>
            {FP_ICON[footprint.type]} {s.label}
          </span>
        </div>

        {/* Footprint text */}
        <div style={{ fontSize: '14px', lineHeight: 1.7, color: C.s800 }}>
          {footprint.text}
        </div>

        {/* Note link */}
        {noteUrl && (
          <a
            href={noteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', color: '#2563EB', textDecoration: 'none',
              marginTop: '6px', fontWeight: 600,
            }}
          >
            noteで詳しく <ChevronRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Story week block ───────────────────────────────────────

function StoryWeekBlock({ week }: { week: StoryWeek }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Week header divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '4px',
      }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: C.s200 }} />
        <span style={{
          fontSize: '11px', fontWeight: 700, color: C.s400,
          letterSpacing: '0.1em', whiteSpace: 'nowrap',
        }}>
          WEEK {week.weekNum} -- {formatWeekStart(week.startDate)}
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: C.s200 }} />
      </div>

      {/* Entries */}
      <div>
        {week.footprints.map((fp, i) => (
          <StoryEntry
            key={fp.id}
            footprint={fp}
            isLast={i === week.footprints.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Milestone node ────────────────────────────────────────

function MilestoneNode({
  milestone, isFirst, isLast, walkersHere, footprintsHere, totalMilestones,
}: {
  milestone: Milestone; isFirst: boolean; isLast: boolean;
  walkersHere: Walker[]; footprintsHere: Footprint[]; totalMilestones: number;
}) {
  const hasFP = footprintsHere.length > 0;
  const hasW = walkersHere.length > 0;

  return (
    <div style={{
      display: 'flex', gap: '24px', position: 'relative',
      paddingBottom: isLast ? '0' : '40px',
    }}>
      {/* Vertical line + node */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '40px', flexShrink: 0, position: 'relative',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: isLast ? `3px solid ${C.gold}` : `2px solid ${hasW ? C.emerald : C.s300}`,
          backgroundColor: isLast ? C.goldLight : (hasW ? C.emeraldLight : C.white),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: 800,
          color: isLast ? C.gold : (hasW ? C.emerald : C.s500),
          position: 'relative', zIndex: 2,
        }}>
          {milestone.step}
        </div>
        {!isLast && (
          <div style={{ flex: 1, width: '2px', backgroundColor: C.s200, minHeight: '20px' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: '4px', minWidth: 0 }}>
        <div style={{
          fontSize: '16px', fontWeight: 700, color: C.s900,
          marginBottom: '4px', lineHeight: 1.4,
        }}>
          {milestone.title}
        </div>
        <div style={{
          fontSize: '14px', color: C.s600, lineHeight: 1.6,
          marginBottom: (hasW || hasFP) ? '14px' : '0',
        }}>
          {milestone.description}
        </div>

        {hasW && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: hasFP ? '12px' : '0', flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: '12px', color: C.s500, fontWeight: 600, marginRight: '4px' }}>
              {walkersHere.length}人がここにいる
            </span>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {walkersHere.map(w => <WalkerDot key={w.id} walker={w} />)}
            </div>
          </div>
        )}

        {hasFP && (
          <div>
            {footprintsHere.map(fp => {
              const s = FP_STYLE[fp.type];
              return (
                <div key={fp.id} style={{
                  padding: '12px 16px', background: s.bg,
                  borderLeft: `3px solid ${s.border}`,
                  borderRadius: '0 8px 8px 0', marginBottom: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '11px', fontWeight: 700, color: s.color,
                    }}>
                      {FP_ICON[fp.type]} {s.label}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: C.s700 }}>
                      {fp.nickname}
                    </span>
                    <Badge level={fp.badge} />
                    <span style={{ fontSize: '11px', color: C.s400, marginLeft: 'auto' }}>
                      {fp.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: 1.7, color: C.s800 }}>
                    {fp.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Walker row (trail registry) ───────────────────────────

function WalkerRow({ walker, totalMilestones }: { walker: Walker; totalMilestones: number }) {
  const cfg = BADGE_CONFIG[walker.badge];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '14px',
      padding: '16px 0', borderBottom: `1px solid ${C.s100}`,
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        backgroundColor: cfg.bg, border: `2px solid ${cfg.color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 700, color: cfg.color,
        flexShrink: 0, marginTop: '2px',
      }}>
        {walker.nickname.charAt(0)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', color: C.s900 }}>
            {walker.nickname}
          </span>
          <Badge level={walker.badge} />
        </div>
        <div style={{
          display: 'flex', gap: '16px', fontSize: '12px', color: C.s500,
          marginBottom: walker.note ? '6px' : '0', flexWrap: 'wrap',
        }}>
          <span>{walker.daysWalking}日目</span>
          <span>地点 <span style={{ fontWeight: 700, color: C.s700 }}>{walker.currentMilestone}</span>/{totalMilestones}</span>
          <span>共有 <span style={{ fontWeight: 700, color: C.gold }}>{walker.sharedCount}</span></span>
          <span>学び <span style={{ fontWeight: 700, color: C.emerald }}>{walker.learnedCount}</span></span>
        </div>
        {walker.note && (
          <div style={{ fontSize: '13px', color: C.s600, lineHeight: 1.5, fontStyle: 'italic' }}>
            {walker.note}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────

export default function NorenGoalPathPage() {
  const params = useParams();
  const id = params?.id as string;
  const noren = SAMPLE_NORENS.find(n => n.id === id);

  const [walking, setWalking] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [showNicknamePrompt, setShowNicknamePrompt] = useState(false);
  const [toast, setToast] = useState('');

  // Footprint form state
  const [fpText, setFpText] = useState('');
  const [fpType, setFpType] = useState<'breakthrough' | 'struggle' | 'tip'>('tip');
  const [fpMilestone, setFpMilestone] = useState(1);
  const [fpNoteUrl, setFpNoteUrl] = useState('');
  const [userFootprints, setUserFootprints] = useState<Footprint[]>([]);
  const [currentMilestoneStep, setCurrentMilestoneStep] = useState(0);

  useEffect(() => {
    if (!id) return;
    setWalking(isWalking(id));
    const saved = getNorenNickname();
    if (saved) setNickname(saved);
    // Load user footprints and milestone from localStorage
    const storedMilestone = getUserMilestone(id);
    setCurrentMilestoneStep(storedMilestone);
    setFpMilestone(storedMilestone > 0 ? storedMilestone : 1);
    setUserFootprints(getUserFootprints(id));
  }, [id]);

  const handleSetNickname = () => {
    const trimmed = nicknameInput.trim();
    if (!trimmed) return;
    setNorenNickname(trimmed);
    setNickname(trimmed);
    setShowNicknamePrompt(false);
    doStartWalking(trimmed);
  };

  const doStartWalking = (name?: string) => {
    const displayName = name || nickname;
    if (!displayName) { setShowNicknamePrompt(true); return; }
    if (!id) return;
    startWalking(id);
    setWalking(true);
    setToast(`${displayName}、この道を歩き始めた。`);
    setTimeout(() => setToast(''), 3000);
  };

  // ── 404 ─────────────────────────────────────────────────

  if (!noren) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Noto Sans JP', sans-serif", color: C.s600,
      }}>
        <div style={{ fontSize: '64px', fontWeight: 200, color: C.s300, marginBottom: '16px' }}>
          404
        </div>
        <div style={{ fontSize: '18px', marginBottom: '24px' }}>
          この道は見つかりませんでした
        </div>
        <Link href="/english/noren" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '12px',
          background: C.s900, color: C.white,
          textDecoration: 'none', fontSize: '14px', fontWeight: 600,
        }}>
          <ArrowLeft size={16} /> のれん一覧に戻る
        </Link>
      </div>
    );
  }

  // ── Data ────────────────────────────────────────────────

  const milestones = noren.goalMilestones ?? [];
  const walkers = noren.walkers ?? [];
  const footprints = getMergedFootprints ? getMergedFootprints(noren.id) : (noren.footprints ?? []);
  const totalMs = milestones.length;
  const sortedWalkers = [...walkers].sort((a, b) => b.currentMilestone - a.currentMilestone);

  const walkersAt = (step: number) => walkers.filter(w => w.currentMilestone === step);
  const footprintsAt = (step: number) =>
    footprints.filter(f => f.milestoneStep === step)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const storyWeeks = groupFootprintsByWeek(footprints);

  // ── Footprint submit ────────────────────────────────────

  const handleSubmitFootprint = () => {
    const text = fpText.trim();
    if (!text || !id) return;
    addUserFootprint(id, {
      milestoneStep: fpMilestone,
      text,
      type: fpType,
      noteUrl: fpNoteUrl.trim() || undefined,
    });
    setUserFootprints(getUserFootprints(id));
    setFpText('');
    setFpNoteUrl('');
    setToast('足跡を残した。');
    setTimeout(() => setToast(''), 3000);
  };

  const handleAdvanceMilestone = (step: number) => {
    if (!id) return;
    setCurrentMilestoneStep(step);
    setUserMilestone(id, step);
    setFpMilestone(step);
  };

  // ── Render ──────────────────────────────────────────────

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${C.s50} 0%, ${C.white} 50%)`,
      fontFamily: "'Noto Sans JP', sans-serif",
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── Header ──────────────────────────────────── */}

        <Link href="/english/noren" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '13px', color: C.s500, textDecoration: 'none', marginBottom: '32px',
        }}>
          <ArrowLeft size={14} /> のれん一覧
        </Link>

        <div style={{ marginBottom: '32px' }}>
          {/* Drive tag */}
          {noren.drive && (() => {
            const dCfg = DRIVE_CONFIG[noren.drive];
            return (
              <span style={{
                display: 'inline-block', fontSize: '10px', fontWeight: 800,
                color: dCfg.color, letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {dCfg.labelEn} -- {dCfg.label}
              </span>
            );
          })()}
          <h1 style={{
            fontSize: '28px', fontWeight: 800, color: C.s900,
            letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.3,
          }}>
            {noren.name}
          </h1>
          <p style={{
            fontSize: '15px', color: C.s600, margin: '0 0 16px', lineHeight: 1.6,
          }}>
            {noren.subtitle || noren.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: C.s600 }}>
            <span>
              <span style={{ fontWeight: 700, color: C.s900 }}>{walkers.length}</span>人が歩いてる
            </span>
            <span style={{ color: C.s300 }}>/</span>
            <span>
              今日<span style={{ fontWeight: 700, color: C.emerald, marginLeft: '4px' }}>{noren.activeToday}</span>人
            </span>
          </div>
        </div>

        {/* ── Walk button / nickname prompt / status ── */}

        {!walking && !showNicknamePrompt && (
          <button
            onClick={() => doStartWalking()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px', borderRadius: '12px', border: 'none',
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
              color: C.white, fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.03em',
              boxShadow: '0 4px 14px rgba(212,175,55,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              marginBottom: '40px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(212,175,55,0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(212,175,55,0.3)';
            }}
          >
            <Footprints size={18} /> この道を歩く
          </button>
        )}

        {showNicknamePrompt && (
          <div style={{
            background: C.s50, border: `1px solid ${C.s200}`,
            borderRadius: '14px', padding: '24px', marginBottom: '40px',
          }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: C.s900, marginBottom: '6px' }}>
              なんて呼ばれたい？
            </div>
            <div style={{ fontSize: '13px', color: C.s500, marginBottom: '16px' }}>
              ニックネームを決めてから歩き出す
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={nicknameInput}
                onChange={e => setNicknameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSetNickname()}
                placeholder="ニックネーム"
                maxLength={12}
                style={{
                  flex: 1, padding: '12px 16px', border: `1px solid ${C.s300}`,
                  borderRadius: '10px', fontSize: '14px', outline: 'none', background: C.white,
                }}
              />
              <button
                onClick={handleSetNickname}
                disabled={!nicknameInput.trim()}
                style={{
                  padding: '12px 20px', borderRadius: '10px', border: 'none',
                  background: C.s900, color: C.white, fontSize: '14px', fontWeight: 700,
                  cursor: nicknameInput.trim() ? 'pointer' : 'not-allowed',
                  opacity: nicknameInput.trim() ? 1 : 0.4,
                }}
              >
                決定
              </button>
            </div>
          </div>
        )}

        {walking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '8px',
              background: C.goldLight, border: `1px solid ${C.gold}33`,
              fontSize: '13px', fontWeight: 600, color: C.gold,
            }}>
              <Footprints size={14} /> 歩いてる
            </div>
            {totalMs > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {milestones.map((ms) => (
                  <button
                    key={ms.step}
                    title={ms.title}
                    onClick={() => handleAdvanceMilestone(ms.step)}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%', border: 'none',
                      background: currentMilestoneStep === ms.step ? C.gold : C.s200,
                      color: currentMilestoneStep === ms.step ? C.white : C.s500,
                      fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.15s',
                    }}
                  >
                    {ms.step}
                  </button>
                ))}
                <span style={{ fontSize: '12px', color: C.s500, marginLeft: '4px' }}>
                  {currentMilestoneStep > 0 ? `Step ${currentMilestoneStep}/${totalMs}` : `0/${totalMs}`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Toast ─────────────────────────────────── */}

        {toast && (
          <div style={{
            position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
            padding: '14px 28px', borderRadius: '12px', background: C.s900, color: C.white,
            fontSize: '15px', fontWeight: 600, boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: 1000, animation: 'fadeInDown 0.3s ease',
          }}>
            {toast}
          </div>
        )}

        {/* ── Footprint Form (only when walking) ────── */}

        {walking && (
          <div style={{
            background: C.white, border: `1px solid ${C.s200}`,
            borderRadius: '16px', padding: '24px', marginBottom: '40px',
          }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <PenLine size={16} color={C.s500} />
              <span style={{
                fontSize: '13px', fontWeight: 700, color: C.s500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                足跡を残す
              </span>
            </div>

            {/* Type selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {(['breakthrough', 'struggle', 'tip'] as const).map((t) => {
                const s = FP_STYLE[t];
                const selected = fpType === t;
                return (
                  <button
                    key={t}
                    onClick={() => setFpType(t)}
                    style={{
                      flex: 1, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
                      border: `1px solid ${selected ? s.border : C.s200}`,
                      background: selected ? s.bg : C.white,
                      color: selected ? s.color : C.s500,
                      fontSize: '13px', fontWeight: 700,
                      transition: 'all 0.15s',
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Text input */}
            <textarea
              rows={3}
              value={fpText}
              onChange={e => setFpText(e.target.value)}
              placeholder="何があった？何に気づいた？"
              style={{
                width: '100%', padding: '12px 14px',
                border: `1px solid ${C.s200}`, borderRadius: '10px',
                fontSize: '14px', lineHeight: 1.6, resize: 'vertical',
                outline: 'none', fontFamily: "'Noto Sans JP', sans-serif",
                color: C.s800, background: C.white, boxSizing: 'border-box',
              }}
            />

            {/* Milestone selector */}
            {totalMs > 0 && (
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '12px', color: C.s500, fontWeight: 600, marginBottom: '8px' }}>
                  マイルストーン
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {milestones.map((ms) => (
                    <button
                      key={ms.step}
                      title={ms.title}
                      onClick={() => setFpMilestone(ms.step)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                        background: fpMilestone === ms.step ? C.gold : C.s100,
                        color: fpMilestone === ms.step ? C.white : C.s600,
                        fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.15s',
                      }}
                    >
                      {ms.step}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Note URL input */}
            <div style={{ marginTop: '14px' }}>
              <input
                type="url"
                value={fpNoteUrl}
                onChange={e => setFpNoteUrl(e.target.value)}
                placeholder="https://note.com/..."
                style={{
                  width: '100%', padding: '10px 14px',
                  border: `1px solid ${C.s200}`, borderRadius: '10px',
                  fontSize: '13px', outline: 'none',
                  color: C.s700, background: C.white, boxSizing: 'border-box',
                  fontFamily: "'Noto Sans JP', sans-serif",
                }}
              />
            </div>

            {/* Submit button */}
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleSubmitFootprint}
                disabled={!fpText.trim()}
                style={{
                  padding: '10px 24px', borderRadius: '10px', border: 'none',
                  background: fpText.trim() ? C.gold : C.s200,
                  color: fpText.trim() ? C.s900 : C.s400,
                  fontSize: '14px', fontWeight: 700,
                  cursor: fpText.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.15s',
                }}
              >
                足跡を残す
              </button>
            </div>
          </div>
        )}

        {/* ── STORY (primary) ───────────────────────── */}

        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <BookOpen size={18} color={C.s500} />
            <span style={{
              fontSize: '13px', fontWeight: 700, color: C.s500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              STORY
            </span>
          </div>

          <div style={{
            background: C.white, border: `1px solid ${C.s200}`,
            borderRadius: '16px', padding: '28px 28px 4px',
          }}>
            {storyWeeks.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '40px 0',
                color: C.s400, fontSize: '14px',
              }}>
                まだ足跡はない。最初の一歩を残そう。
              </div>
            ) : (
              storyWeeks.map(week => (
                <StoryWeekBlock key={week.weekNum} week={week} />
              ))
            )}
          </div>
        </div>

        {/* ── Section separator ─────────────────────── */}

        <div style={{
          height: '1px', backgroundColor: C.s100,
          marginBottom: '56px', marginTop: '-32px',
        }} />

        {/* ── The Path (secondary) ──────────────────── */}

        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Mountain size={18} color={C.s500} />
            <span style={{
              fontSize: '13px', fontWeight: 700, color: C.s500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              THE PATH
            </span>
          </div>

          <div style={{
            background: C.white, border: `1px solid ${C.s200}`,
            borderRadius: '16px', padding: '32px 28px',
          }}>
            {milestones.map((ms, i) => (
              <MilestoneNode
                key={ms.step}
                milestone={ms}
                isFirst={i === 0}
                isLast={i === milestones.length - 1}
                walkersHere={walkersAt(ms.step)}
                footprintsHere={footprintsAt(ms.step)}
                totalMilestones={totalMs}
              />
            ))}
          </div>
        </div>

        {/* ── Walkers ──────────────────────────────── */}

        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Footprints size={18} color={C.s500} />
            <span style={{
              fontSize: '13px', fontWeight: 700, color: C.s500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              WALKERS
            </span>
            <span style={{ fontSize: '13px', color: C.s400, marginLeft: '4px' }}>
              {walkers.length}
            </span>
          </div>

          <div style={{
            background: C.white, border: `1px solid ${C.s200}`,
            borderRadius: '16px', padding: '4px 24px',
          }}>
            {sortedWalkers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: C.s400, fontSize: '14px' }}>
                まだ誰もこの道を歩いていない
              </div>
            ) : (
              sortedWalkers.map(w => (
                <WalkerRow key={w.id} walker={w} totalMilestones={totalMs} />
              ))
            )}
          </div>
        </div>

        {/* ── Bottom ───────────────────────────────── */}

        <div style={{
          borderTop: `1px solid ${C.s200}`, padding: '28px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <Link href="/english/noren" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '14px', color: C.s500, textDecoration: 'none', fontWeight: 600,
          }}>
            <ArrowLeft size={16} /> のれん一覧に戻る
          </Link>
          {noren.linkedContent && (
            <Link href={noren.linkedContent} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '10px',
              background: C.s900, color: C.white,
              textDecoration: 'none', fontSize: '14px', fontWeight: 600,
            }}>
              <BookOpen size={16} /> この道の教材 <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
