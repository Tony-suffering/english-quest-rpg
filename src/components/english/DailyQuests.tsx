'use client';

// ─── 3-tier daily quest panel ──────────────────────────────
// MUST (easy) → NORMAL (medium) → FINAL (day complete)
// Concept: make it obvious what to do, make it feel good to do it.

const gold = '#D4AF37';
const green = '#10B981';

export type QuestTier = 'must' | 'normal' | 'final';

interface DailyQuestsProps {
    listenCount: number;
    registerCount: number;
    mastered: number;
    totalForDay: number;
    completedTiers: Set<QuestTier>;
    onDismiss: () => void;
    dismissed: boolean;
}

interface QuestSpec {
    tier: QuestTier;
    label: string;
    labelEn: string;
    title: string;
    hint: string;
    colorBar: string;
}

const SPECS: QuestSpec[] = [
    {
        tier: 'must',
        label: 'かんたん',
        labelEn: 'MUST',
        title: '3つ聴いて、1つ登録',
        hint: 'まずはこれだけ。ここで今日はもう勝ち。',
        colorBar: gold,
    },
    {
        tier: 'normal',
        label: 'ふつう',
        labelEn: 'NORMAL',
        title: '5つ聴いて、3つ登録',
        hint: 'これができたら、完全に「やる人」側の人間。',
        colorBar: '#E8B923',
    },
    {
        tier: 'final',
        label: 'ラスボス',
        labelEn: 'FINAL',
        title: '今日の10個、全部マスター',
        hint: '全部倒したら、明日のお前は確実に1段上。',
        colorBar: green,
    },
];

function ringProgress(current: number, total: number, color: string) {
    const pct = Math.min(1, current / total);
    const complete = current >= total;
    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontWeight: 700,
            color: complete ? color : '#78716C',
            fontFamily: 'Georgia, serif',
        }}>
            <span style={{ fontSize: 15, color: complete ? color : '#57534E' }}>{current}</span>
            <span style={{ color: '#A8A29E', fontSize: 11 }}>/ {total}</span>
        </div>
    );
}

function QuestRow({
    spec, listenReq, listenCur, regReq, regCur, masterReq, masterCur, done,
}: {
    spec: QuestSpec;
    listenReq?: number;
    listenCur?: number;
    regReq?: number;
    regCur?: number;
    masterReq?: number;
    masterCur?: number;
    done: boolean;
}) {
    const listenPct = listenReq ? Math.min(100, ((listenCur || 0) / listenReq) * 100) : 100;
    const regPct = regReq ? Math.min(100, ((regCur || 0) / regReq) * 100) : 100;
    const masterPct = masterReq ? Math.min(100, ((masterCur || 0) / masterReq) * 100) : 100;
    const totalPct = masterReq !== undefined ? masterPct : (listenPct + regPct) / 2;

    return (
        <div style={{
            position: 'relative',
            padding: '12px 14px 14px',
            background: done
                ? `linear-gradient(135deg, ${spec.colorBar}18, ${spec.colorBar}06)`
                : '#fff',
            border: done
                ? `1px solid ${spec.colorBar}60`
                : '1px solid #E7E5E4',
            borderLeft: `3px solid ${spec.colorBar}`,
            borderRadius: 8,
            transition: 'all 0.5s ease',
        }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        fontWeight: 800,
                        color: spec.colorBar,
                        background: `${spec.colorBar}15`,
                        padding: '3px 7px',
                        borderRadius: 3,
                    }}>
                        {spec.labelEn}
                    </span>
                    <span style={{ fontSize: 11, color: '#78716C', fontWeight: 600 }}>
                        {spec.label}
                    </span>
                </div>
                {done ? (
                    <div style={{
                        fontSize: 10, fontWeight: 800, color: spec.colorBar,
                        letterSpacing: '0.15em',
                    }}>
                        ✓ CLEAR
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {listenReq !== undefined && ringProgress(Math.min(listenCur || 0, listenReq), listenReq, gold)}
                        {regReq !== undefined && ringProgress(Math.min(regCur || 0, regReq), regReq, green)}
                        {masterReq !== undefined && ringProgress(Math.min(masterCur || 0, masterReq), masterReq, spec.colorBar)}
                    </div>
                )}
            </div>

            {/* Title */}
            <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#1C1917',
                marginBottom: 4,
                lineHeight: 1.4,
            }}>
                {spec.title}
            </div>

            {/* Progress bar */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: 3,
                background: '#F5F5F4',
                borderRadius: 2,
                overflow: 'hidden',
                marginBottom: 6,
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${totalPct}%`,
                    background: `linear-gradient(90deg, ${spec.colorBar}, ${spec.colorBar}dd)`,
                    borderRadius: 2,
                    transition: 'width 0.6s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
                    boxShadow: totalPct > 0 ? `0 0 8px ${spec.colorBar}60` : 'none',
                }} />
            </div>

            {/* Hint */}
            <div style={{
                fontSize: 10,
                color: '#A8A29E',
                lineHeight: 1.5,
                fontStyle: 'italic',
            }}>
                {spec.hint}
            </div>
        </div>
    );
}

export default function DailyQuests({
    listenCount, registerCount, mastered, totalForDay,
    completedTiers, onDismiss, dismissed,
}: DailyQuestsProps) {
    if (dismissed) return null;

    const mustDone = completedTiers.has('must') || (listenCount >= 3 && registerCount >= 1);
    const normalDone = completedTiers.has('normal') || (listenCount >= 5 && registerCount >= 3);
    const finalDone = completedTiers.has('final') || (totalForDay > 0 && mastered >= totalForDay);
    const allDone = mustDone && normalDone && finalDone;

    return (
        <div style={{
            marginBottom: 16,
            padding: '14px 14px 16px',
            background: '#fff',
            border: '1px solid #E7E5E4',
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                        fontSize: 9,
                        letterSpacing: '0.3em',
                        fontWeight: 800,
                        color: gold,
                        background: `${gold}15`,
                        padding: '3px 8px',
                        borderRadius: 3,
                    }}>
                        TODAY
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#1C1917' }}>
                        今日の3クエスト
                    </span>
                </div>
                <button
                    onClick={onDismiss}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#D6D3D1',
                        fontSize: 16,
                        cursor: 'pointer',
                        padding: '0 4px',
                        lineHeight: 1,
                    }}
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            {/* Quest stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <QuestRow
                    spec={SPECS[0]}
                    listenReq={3} listenCur={listenCount}
                    regReq={1} regCur={registerCount}
                    done={mustDone}
                />
                <QuestRow
                    spec={SPECS[1]}
                    listenReq={5} listenCur={listenCount}
                    regReq={3} regCur={registerCount}
                    done={normalDone}
                />
                <QuestRow
                    spec={SPECS[2]}
                    masterReq={totalForDay || 10} masterCur={mastered}
                    done={finalDone}
                />
            </div>

            {/* Footer */}
            <div style={{
                fontSize: 10,
                color: '#A8A29E',
                textAlign: 'center',
                marginTop: 12,
                fontStyle: 'italic',
            }}>
                {allDone
                    ? '全部クリアしたのか…お前、マジで化け物。'
                    : mustDone
                        ? '次行くか？無理しなくていいぞ、MUST終えただけで今日の勝ちだ。'
                        : 'まずはMUSTだけでOK。それ終えたら今日は勝ち確。'}
            </div>
        </div>
    );
}
