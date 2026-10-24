'use client';

/**
 * TOPIC 100 -- 20の弾で100トピックを撃つ。
 *
 * 既存の /english/write と /english/speak は「1トピック=1模範解答」構造で、
 * トピックを増やすほど暗記量が線形に増えて破綻する。ここはその逆で、
 * 覚える対象を20本のエンジン(論拠)に固定し、100トピックを「的」として並べる。
 *
 * 画面は4つ:
 *   SPINE   100行。暗記の本体。各行をそのままトレーニング(/api/phrases)へ流す
 *   MAP     10x10の制覇マップ。マスをクリックすると的の詳細が開く
 *   DRILL   転用ドリル。お題とヴァースだけ見て自分で撃ち、あとから答え合わせ
 *   PROGRAM 100日。20ヴァース x 5周。紙に書く周から始め、最後は紙を離す
 */

import { useEffect, useMemo, useState } from 'react';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';
import { SpineView, ProgramView } from '@/components/english/Topic100Spine';
import {
    DOMAINS, ENGINES, TOPIC_100,
    ENGINE_BY_ID, ENGINE_COVERAGE, CARD_BY_NO, DOMAIN_BY_ID,
    type Topic, type Engine, type TopicCard,
} from '@/data/english/eiken-topic100';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const BODY = '#44403C';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAF8F2';

const STORAGE_KEY = 'topic100-progress-v1';

type View = 'spine' | 'map' | 'drill' | 'program';

/** 0 未着手 / 1 読んだ / 2 声に出して言えた / 3 別のお題に転用できた */
type Level = 0 | 1 | 2 | 3;
type Progress = Record<number, Level>;

const LEVELS: { level: Level; label: string; short: string; bg: string; fg: string; border: string }[] = [
    { level: 0, label: '未着手', short: '未', bg: '#fff', fg: FAINT, border: LINE },
    { level: 1, label: '読んだ', short: '読', bg: '#FEF9E7', fg: DEEPGOLD, border: '#EBD9A0' },
    { level: 2, label: '声に出して言えた', short: '言', bg: '#FDF2CE', fg: DEEPGOLD, border: GOLD },
    { level: 3, label: '別のお題に転用できた', short: '撃', bg: '#D1FAE5', fg: DEEPGREEN, border: GREEN },
];

export default function Topic100Page() {
    const [view, setView] = useState<View>('spine');
    const [progress, setProgress] = useState<Progress>({});
    const [loaded, setLoaded] = useState(false);
    const [openNo, setOpenNo] = useState<number | null>(null);
    const [openEngine, setOpenEngine] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setProgress(JSON.parse(raw));
        } catch {
            // 保存が読めなくても教材としては成立するので、空のまま進める
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch {
            // 保存できない環境(プライベートモード等)でも表示は続ける
        }
    }, [progress, loaded]);

    const setLevel = (no: number, level: Level) =>
        setProgress((p) => ({ ...p, [no]: level }));

    const counts = useMemo(() => {
        const c = [0, 0, 0, 0];
        for (const t of TOPIC_100) c[progress[t.no] ?? 0]++;
        return c;
    }, [progress]);

    const openTopic = openNo != null ? TOPIC_100.find((t) => t.no === openNo) ?? null : null;

    return (
        <div style={{ minHeight: '100vh', background: PAPER }}>
            <EikenOutputNav active="topic100" />

            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '28px 16px 0' }}>
                <Hero counts={counts} />
                <ViewTabs view={view} setView={setView} />
            </div>

            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '20px 16px 40px' }}>
                {view === 'map' && (
                    <MapView progress={progress} onOpen={(no) => { setOpenNo(no); setOpenEngine(null); }} />
                )}
                {view === 'spine' && (
                    <SpineView onOpenTopic={(no) => setOpenNo(no)} />
                )}
                {view === 'program' && <ProgramView />}
                {view === 'drill' && (
                    <DrillView progress={progress} setLevel={setLevel} />
                )}
            </div>

            {openTopic && (
                <TopicPanel
                    topic={openTopic}
                    level={progress[openTopic.no] ?? 0}
                    setLevel={(l) => setLevel(openTopic.no, l)}
                    onClose={() => setOpenNo(null)}
                    onEngine={(id) => setOpenEngine(id)}
                />
            )}
            {openEngine && ENGINE_BY_ID[openEngine] && (
                <EnginePanel engine={ENGINE_BY_ID[openEngine]} onClose={() => setOpenEngine(null)} />
            )}

            <EikenOutputDisclaimer />
        </div>
    );
}

// ============================================================
// ヒーロー
// ============================================================

function Hero({ counts }: { counts: number[] }) {
    const done = counts[2] + counts[3];
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '22px 20px', marginBottom: '14px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>
                TOPIC <span style={{ color: GOLD }}>100</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: DEEPGOLD, marginTop: '4px', letterSpacing: '0.5px' }}>
100行を暗記して、100トピックを撃つ
            </div>
            <p style={{ margin: '12px 0 0', fontSize: '12.5px', lineHeight: 2, color: BODY }}>
                模範解答を100本覚えるのは無理だし、覚えても出題が1ミリずれた瞬間に使えない。だから暗記する対象を裏返す。
                覚えるのは<strong style={{ color: INK }}>100行</strong>。20ヴァース × 5行で、1行はそれ単体で読み書きに使える中身のある文になっている。
                100のトピックは暗記対象ではなく、その行を撃つ<strong style={{ color: INK }}>的</strong>だ。1題につきどのヴァースを抜くかが2つ指定してあるので、100行が入った時点で100題すべてに口が動く。
            </p>
            <p style={{ margin: '10px 0 0', fontSize: '12.5px', lineHeight: 2, color: BODY }}>
                どのヴァースも <strong style={{ color: INK }}>掴み → 仕組み → 証拠 → 着地 → 刺し</strong> の同じ5拍で並ぶ。
                同じ拍が20回来るので、意味より先に拍が体に入る。5行目の「刺し」は毎回わざと笑える形にしてあって、そこが引っかかりになる。
                100行は通しで約10分。読んで終わりにしないよう、各行はそのままトレーニングのカードに流し込める。
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: FAINT, fontWeight: 800, letterSpacing: '1px' }}>制覇率</div>
                <div style={{ flex: 1, minWidth: '160px', height: '8px', background: '#F5F1E6', borderRadius: '999px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${counts[3]}%`, background: GREEN }} />
                    <div style={{ width: `${counts[2]}%`, background: GOLD }} />
                    <div style={{ width: `${counts[1]}%`, background: '#EBD9A0' }} />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 900, color: INK }}>{done}<span style={{ color: FAINT, fontWeight: 700 }}> / 100</span></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                {LEVELS.slice(1).map((l) => (
                    <div key={l.level} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.border, display: 'inline-block' }} />
                        <span style={{ fontSize: '10.5px', color: SUB }}>{l.label} {counts[l.level]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ViewTabs({ view, setView }: { view: View; setView: (v: View) => void }) {
    const tab = (key: View, label: string, sub: string) => {
        const on = view === key;
        return (
            <button
                key={key}
                onClick={() => setView(key)}
                style={{
                    flex: 1, padding: '10px 6px', borderRadius: '12px', cursor: 'pointer',
                    border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                    background: on ? '#FEF9E7' : '#fff', textAlign: 'center', transition: 'all 0.15s',
                }}
            >
                <div style={{ fontSize: '12.5px', fontWeight: 900, color: on ? DEEPGOLD : SUB }}>{label}</div>
                <div style={{ fontSize: '10px', color: FAINT, marginTop: '2px' }}>{sub}</div>
            </button>
        );
    };
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {tab('spine', '100行', '暗記の本体')}
            {tab('map', '制覇マップ', '100の的')}
            {tab('drill', '転用ドリル', '別の的で撃つ')}
            {tab('program', '100日', '紙と口の順番')}
        </div>
    );
}

// ============================================================
// MAP
// ============================================================

function MapView({ progress, onOpen }: { progress: Progress; onOpen: (no: number) => void }) {
    return (
        <div>
            <SectionNote>
                横1行が1ジャンル、1マスが1トピック。金は覚えた印、緑は「別のお題に転用できた」印。
                濃い枠のマスは3層の答え(満点/生身/一撃)まで書いてある的。それ以外のマスも、開けば撃つべきエンジン2本が指定されている。
            </SectionNote>
            {DOMAINS.map((d) => {
                const topics = TOPIC_100.filter((t) => t.domain === d.id);
                return (
                    <div key={d.id} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '12px 14px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '9px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{d.label}</span>
                            <span style={{ fontSize: '10px', color: FAINT, fontFamily: 'Georgia, serif', letterSpacing: '0.5px' }}>{d.en}</span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.7, marginBottom: '10px' }}>{d.hint}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '5px' }}>
                            {topics.map((t) => {
                                const lv = LEVELS[progress[t.no] ?? 0];
                                const hasCard = !!CARD_BY_NO[t.no];
                                return (
                                    <button
                                        key={t.no}
                                        onClick={() => onOpen(t.no)}
                                        title={t.ja}
                                        style={{
                                            aspectRatio: '1', borderRadius: '8px', cursor: 'pointer',
                                            background: lv.bg, color: lv.fg,
                                            border: hasCard ? `2px solid ${lv.border === LINE ? GOLD : lv.border}` : `1px solid ${lv.border}`,
                                            fontSize: '11px', fontWeight: 900, fontFamily: 'Georgia, serif',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'all 0.12s',
                                        }}
                                    >
                                        {t.no}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ============================================================
// DRILL -- 転用ドリル
// ============================================================

function DrillView({ progress, setLevel }: { progress: Progress; setLevel: (no: number, l: Level) => void }) {
    const [current, setCurrent] = useState<Topic>(TOPIC_100[0]);
    const [revealed, setRevealed] = useState(false);
    const [onlyUnfinished, setOnlyUnfinished] = useState(true);

    const pool = useMemo(() => {
        const p = onlyUnfinished ? TOPIC_100.filter((t) => (progress[t.no] ?? 0) < 3) : TOPIC_100;
        return p.length ? p : TOPIC_100;
    }, [onlyUnfinished, progress]);

    const next = () => {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        setCurrent(pick);
        setRevealed(false);
    };

    const card = CARD_BY_NO[current.no];
    const engines = current.engines.map((id) => ENGINE_BY_ID[id]).filter(Boolean) as Engine[];

    return (
        <div>
            <SectionNote>
                お題とエンジン名だけを見て、まず自分で60秒話す。英文は伏せてある。
                話し終えてから開いて、自分が撃った弾と突き合わせる。これが「覚えた弾が別の的でも撃てるか」の検査で、
                ここを通ったトピックだけが緑になる。
            </SectionNote>

            <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '16px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: GOLD }}>
                        No.{current.no}
                    </span>
                    <span style={{ fontSize: '10.5px', color: FAINT }}>{DOMAIN_BY_ID[current.domain].label}</span>
                </div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: INK, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>
                    {current.en}
                </div>
                <div style={{ fontSize: '12px', color: SUB, marginTop: '6px' }}>{current.ja}</div>

                <div style={{ marginTop: '16px' }}>
                    <Label>抜く弾</Label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {engines.map((e) => (
                            <span key={e.id} style={{
                                fontSize: '11.5px', fontWeight: 900, color: DEEPGOLD, background: '#FEF9E7',
                                border: `1px solid #EBD9A0`, borderRadius: '999px', padding: '4px 11px',
                            }}>
                                {String(e.no).padStart(2, '0')} {e.label}
                            </span>
                        ))}
                    </div>
                </div>

                {!revealed ? (
                    <button
                        onClick={() => setRevealed(true)}
                        style={{
                            marginTop: '18px', width: '100%', padding: '13px', borderRadius: '12px', cursor: 'pointer',
                            border: 'none', background: INK, color: '#fff', fontSize: '13px', fontWeight: 900, letterSpacing: '1px',
                        }}
                    >
                        話し終えた。答えを開く
                    </button>
                ) : (
                    <div style={{ marginTop: '16px' }}>
                        {engines.map((e) => (
                            <div key={e.id} style={{ marginBottom: '12px' }}>
                                <Tier label={`${String(e.no).padStart(2, '0')} ${e.label} の弾`} color={GOLD} en={e.ammo} ja={e.ammoJa} />
                            </div>
                        ))}
                        {card && (
                            <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                                <Label>この的には3層の答えがある</Label>
                                <div style={{ fontSize: '12px', color: BODY, lineHeight: 1.9, marginTop: '4px' }}>
                                    立場: {card.stanceJa}
                                </div>
                                <div style={{ fontSize: '12px', color: INK, lineHeight: 1.9, marginTop: '6px', fontStyle: 'italic' }}>
                                    {card.blade}
                                </div>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '6px', marginTop: '14px', flexWrap: 'wrap' }}>
                            {LEVELS.slice(1).map((l) => (
                                <button
                                    key={l.level}
                                    onClick={() => { setLevel(current.no, l.level); next(); }}
                                    style={{
                                        flex: 1, minWidth: '110px', padding: '10px 8px', borderRadius: '10px', cursor: 'pointer',
                                        border: `1px solid ${l.border}`, background: l.bg, color: l.fg, fontSize: '11.5px', fontWeight: 900,
                                    }}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                    onClick={next}
                    style={{
                        padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
                        border: `1px solid ${LINE}`, background: '#fff', color: INK, fontSize: '12px', fontWeight: 900,
                    }}
                >
                    次の的へ
                </button>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: SUB, cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={onlyUnfinished}
                        onChange={(ev) => setOnlyUnfinished(ev.target.checked)}
                    />
                    まだ緑になっていない的だけ出す
                </label>
            </div>
        </div>
    );
}

// ============================================================
// パネル(トピック / エンジン)
// ============================================================

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(28,25,23,0.35)', zIndex: 60,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 12px', overflowY: 'auto',
            }}
        >
            <div
                onClick={(ev) => ev.stopPropagation()}
                style={{ background: '#fff', borderRadius: '16px', maxWidth: '760px', width: '100%', padding: '22px 20px', border: `1px solid ${LINE}` }}
            >
                {children}
            </div>
        </div>
    );
}

function TopicPanel({
    topic, level, setLevel, onClose, onEngine,
}: {
    topic: Topic; level: Level; setLevel: (l: Level) => void; onClose: () => void; onEngine: (id: string) => void;
}) {
    const card: TopicCard | undefined = CARD_BY_NO[topic.no];
    const engines = topic.engines.map((id) => ENGINE_BY_ID[id]).filter(Boolean) as Engine[];
    const d = DOMAIN_BY_ID[topic.domain];

    return (
        <Overlay onClose={onClose}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 900, color: GOLD }}>No.{topic.no}</span>
                <span style={{ fontSize: '10.5px', color: FAINT }}>{d.label}</span>
                <button
                    onClick={onClose}
                    style={{ marginLeft: 'auto', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '11px', color: SUB, fontWeight: 800 }}
                >
                    閉じる
                </button>
            </div>

            <div style={{ fontSize: '18px', fontWeight: 800, color: INK, lineHeight: 1.55, fontFamily: 'Georgia, serif' }}>{topic.en}</div>
            <div style={{ fontSize: '12.5px', color: SUB, marginTop: '6px' }}>{topic.ja}</div>

            <div style={{ marginTop: '16px' }}>
                <Label>この的に抜く弾</Label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {engines.map((e) => (
                        <button
                            key={e.id}
                            onClick={() => onEngine(e.id)}
                            style={{
                                fontSize: '11.5px', fontWeight: 900, color: DEEPGOLD, background: '#FEF9E7', cursor: 'pointer',
                                border: '1px solid #EBD9A0', borderRadius: '999px', padding: '5px 12px',
                            }}
                        >
                            {String(e.no).padStart(2, '0')} {e.label}
                        </button>
                    ))}
                </div>
            </div>

            {card ? (
                <div style={{ marginTop: '18px' }}>
                    <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px', padding: '11px 13px', marginBottom: '12px' }}>
                        <Label>立場</Label>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: INK, lineHeight: 1.6 }}>{card.stance}</div>
                        <div style={{ fontSize: '11.5px', color: SUB, marginTop: '3px' }}>{card.stanceJa}</div>
                    </div>

                    <Tier label="満点版 / 減点されない形" color={GOLD} en={card.exam} ja={card.examJa} />
                    <Tier label="生身版 / 実際に口から出る形" color="#A8A29E" en={card.human} ja={card.humanJa} />

                    <div style={{ background: '#ECFDF5', border: `1px solid ${GREEN}`, borderRadius: '12px', padding: '13px 15px', marginTop: '12px' }}>
                        <Label>一撃 / 試験官が顔を上げる一行</Label>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: DEEPGREEN, lineHeight: 1.7, fontFamily: 'Georgia, serif' }}>
                            {card.blade}
                        </div>
                        <div style={{ fontSize: '11.5px', color: SUB, marginTop: '5px', lineHeight: 1.8 }}>{card.bladeJa}</div>
                        <div style={{ fontSize: '11px', color: BODY, marginTop: '9px', lineHeight: 1.9, borderTop: `1px solid #A7F3D0`, paddingTop: '8px' }}>
                            {card.bladeNote}
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <Label>追い討ちへの返し</Label>
                        {card.counters.map((c, i) => (
                            <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '12px', padding: '11px 13px', marginTop: '7px' }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 800, color: INK, lineHeight: 1.6 }}>{c.q}</div>
                                <div style={{ fontSize: '12.5px', color: BODY, lineHeight: 1.9, marginTop: '6px' }}>{c.a}</div>
                                <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.8, marginTop: '4px' }}>{c.aJa}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ marginTop: '18px' }}>
                    <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px', padding: '13px 15px' }}>
                        <div style={{ fontSize: '12px', color: BODY, lineHeight: 2 }}>
                            この的には3層の答えをまだ書いていない。だが答えを配らないほうが本来の使い方で、
                            上の2本のエンジンを開いて [X] をこのお題に差し替え、そのまま声に出せば1本のスピーチになる。
                            それができたかどうかを下のボタンで記録する。
                        </div>
                    </div>
                    {engines.map((e) => (
                        <div key={e.id} style={{ marginTop: '12px' }}>
                            <Tier label={`${String(e.no).padStart(2, '0')} ${e.label}`} color={GOLD} en={e.ammo} ja={e.ammoJa} />
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '18px', borderTop: `1px solid ${LINE}`, paddingTop: '14px' }}>
                <Label>この的の状態</Label>
                <div style={{ display: 'flex', gap: '6px', marginTop: '7px', flexWrap: 'wrap' }}>
                    {LEVELS.map((l) => (
                        <button
                            key={l.level}
                            onClick={() => setLevel(l.level)}
                            style={{
                                flex: 1, minWidth: '90px', padding: '9px 6px', borderRadius: '10px', cursor: 'pointer',
                                border: level === l.level ? `2px solid ${l.border === LINE ? INK : l.border}` : `1px solid ${LINE}`,
                                background: level === l.level ? l.bg : '#fff',
                                color: level === l.level ? l.fg : SUB,
                                fontSize: '11px', fontWeight: 900,
                            }}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>
        </Overlay>
    );
}

function EnginePanel({ engine, onClose }: { engine: Engine; onClose: () => void }) {
    const cover = ENGINE_COVERAGE[engine.id] ?? [];
    return (
        <Overlay onClose={onClose}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 900, color: GOLD }}>
                    {String(engine.no).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 900, color: INK }}>{engine.label}</span>
                <span style={{ fontSize: '11px', color: FAINT, fontFamily: 'Georgia, serif' }}>{engine.en}</span>
                <button
                    onClick={onClose}
                    style={{ marginLeft: 'auto', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '11px', color: SUB, fontWeight: 800 }}
                >
                    閉じる
                </button>
            </div>
            <div style={{ fontSize: '11.5px', color: SUB, marginTop: '8px', lineHeight: 1.8 }}>{engine.when}</div>
            <div style={{ fontSize: '11px', color: DEEPGREEN, marginTop: '6px', fontWeight: 800 }}>100題中 {cover.length} 題に効く</div>
            <div style={{ marginTop: '14px' }}>
                <Tier label="覚える弾" color={GOLD} en={engine.ammo} ja={engine.ammoJa} />
                <Tier label="生身で言うと" color="#A8A29E" en={engine.human} />
                <Tier label="一撃" color={GREEN} en={engine.blade} />
                <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px', marginTop: '10px' }}>
                    <Label>差し替え</Label>
                    <div style={{ fontSize: '11.5px', color: BODY, lineHeight: 1.8 }}>{engine.swap}</div>
                </div>
            </div>
        </Overlay>
    );
}

// ============================================================
// 小物
// ============================================================

function Label({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '5px' }}>
            {children}
        </div>
    );
}

function SectionNote({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 15px', marginBottom: '12px' }}>
            <p style={{ margin: 0, fontSize: '11.5px', lineHeight: 2, color: BODY }}>{children}</p>
        </div>
    );
}

function Tier({ label, color, en, ja }: { label: string; color: string; en: string; ja?: string }) {
    return (
        <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: '12px', marginTop: '12px' }}>
            <Label>{label}</Label>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.95, color: INK }}>{en}</p>
            {ja && <p style={{ margin: '7px 0 0', fontSize: '11.5px', lineHeight: 1.95, color: SUB }}>{ja}</p>}
        </div>
    );
}
