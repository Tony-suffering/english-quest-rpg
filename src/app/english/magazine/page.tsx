'use client';

// 月刊 TOLERANCY — 存在しない英単語を誌名にした英語検死マガジン。
// DMM英会話の実録ミス(kenshi-lessons)を雑誌の体裁でコメディ化し、
// 各コーナーに「で、正解は」を付けて読者が英語を持ち帰れるようにする。
//
// 【ブラウザ編集】
//   - 起動時に /api/magazine から最新号を読む。DB が空なら静的 seed (magazine.ts)。
//   - 右上「編集」トグルで全テキストがその場編集(contentEditable)になる。
//   - 配列(捏造語/観測/クイズ 等)は各項目の「削除」と末尾の「追加」で増減。
//   - 「保存」で /api/magazine に issue まるごと POST → D1 に永続化。
//   保存先は D1 の magazine_issues。型は src/data/english/magazine.ts。

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
    getLatestIssue,
    DEFAULT_CHROME,
    type MagazineIssue,
    type MagazineChrome,
    type FakeWordEntry,
    type AWatchObservation,
    type RallyLine,
    type QuizItem,
} from '@/data/english/magazine';

const PAPER = '#FAF7F0';
const INK = '#171412';
const MUTED = '#6B6257';
const RED = '#B5382D';
const GOLD = '#B8941E';
const LINE = '#E2DACB';
const SERIF = "Georgia, 'Times New Roman', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

// ===================== path ユーティリティ =====================
type Path = (string | number)[];

function getAt(root: unknown, path: Path): unknown {
    return path.reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), root);
}

function setAt(root: unknown, path: Path, value: unknown): unknown {
    if (path.length === 0) return value;
    const [head, ...rest] = path;
    const src = root as Record<string | number, unknown> | unknown[] | undefined;
    const clone: Record<string | number, unknown> | unknown[] = Array.isArray(src)
        ? [...src]
        : { ...(src as Record<string | number, unknown>) };
    (clone as Record<string | number, unknown>)[head] = setAt(src ? (src as Record<string | number, unknown>)[head] : undefined, rest, value);
    return clone;
}

// ===================== 追加テンプレート =====================
const T_coverLine = '新しい見出し';
const T_paragraph = '新しい段落。';
const T_fakeWord: FakeWordEntry = {
    word: 'newword',
    pronunciation: '/njuː.wɜːd/',
    pos: '名詞(※存在しない)',
    fakeDefinition: '存在しない意味。',
    firstSeen: '2026-07-01',
    spoke: '"..."',
    meant: '',
    etymology: '',
    correct: { word: '', example: '', ja: '', tip: '' },
};
const T_observation: AWatchObservation = { date: '07-01', spoke: '"..."', caption: '' };
const T_point = '新しいルール。';
const T_rallyLine: RallyLine = { speaker: 'TONIO', en: '', ja: '' };
const T_idiom = { en: '', ja: '', note: '' };
const T_finding = '新しい所見。';
const T_quiz: QuizItem = { q: '', hint: '', a: '', explain: '' };
const T_nextIssue = '次号の予告。';

// ===================== 編集可能テキスト =====================
function Editable({
    value, editing, onCommit, as = 'span', style, className,
}: {
    value: string;
    editing: boolean;
    onCommit: (v: string) => void;
    as?: keyof React.JSX.IntrinsicElements;
    style?: React.CSSProperties;
    className?: string;
}) {
    const ref = useRef<HTMLElement>(null);

    // 非フォーカス時のみ外部値を反映(入力中はカーソルを飛ばさない)
    useEffect(() => {
        const el = ref.current;
        if (editing && el && document.activeElement !== el && el.innerText !== value) {
            el.innerText = value ?? '';
        }
    });

    if (!editing) {
        return React.createElement(as, { style, className }, value);
    }

    return React.createElement(as, {
        ref,
        className,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onBlur: (e: React.FocusEvent<HTMLElement>) => onCommit(e.currentTarget.innerText),
        style: {
            ...style,
            outline: '1px dashed rgba(181,56,45,0.45)',
            outlineOffset: '2px',
            borderRadius: '2px',
            cursor: 'text',
            minHeight: '1em',
            minWidth: '18px',
        } as React.CSSProperties,
    });
}

// 編集モードで出す小ボタン
function MiniBtn({ onClick, children, tone = 'ink' }: { onClick: () => void; children: React.ReactNode; tone?: 'ink' | 'red' | 'green' }) {
    const bg = tone === 'red' ? RED : tone === 'green' ? '#10B981' : INK;
    return (
        <button
            onClick={onClick}
            style={{
                cursor: 'pointer', backgroundColor: bg, color: '#fff', border: 'none',
                borderRadius: '4px', padding: '4px 10px', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.5px', lineHeight: 1.4,
            }}
        >
            {children}
        </button>
    );
}

export default function MagazinePage() {
    const [draft, setDraft] = useState<MagazineIssue>(() => getLatestIssue());
    const [editing, setEditing] = useState(false);
    const [pass, setPass] = useState('');
    const [status, setStatus] = useState<string>('');
    const [loaded, setLoaded] = useState(false);

    // 起動時に DB の最新号を読む(無ければ seed のまま)
    useEffect(() => {
        let alive = true;
        fetch('/api/magazine', { cache: 'no-store' })
            .then((r) => r.json())
            .then((json) => {
                if (alive && json?.issue) setDraft(json.issue as MagazineIssue);
            })
            .catch(() => { /* seed で成立させる */ })
            .finally(() => { if (alive) setLoaded(true); });
        return () => { alive = false; };
    }, []);

    const mutate = (path: Path, value: unknown) => {
        setDraft((prev) => setAt(prev, path, value) as MagazineIssue);
    };
    const addItem = (path: Path, template: unknown) => {
        const arr = (getAt(draft, path) as unknown[]) ?? [];
        mutate(path, [...arr, structuredClone(template)]);
    };
    const removeItem = (path: Path, index: number) => {
        const arr = (getAt(draft, path) as unknown[]) ?? [];
        mutate(path, arr.filter((_, i) => i !== index));
    };

    // 指定 path のテキストを編集可能に。styleは元の見た目をそのまま渡す。
    const E = (path: Path, style?: React.CSSProperties, as: keyof React.JSX.IntrinsicElements = 'span') => (
        <Editable
            value={String(getAt(draft, path) ?? '')}
            editing={editing}
            onCommit={(v) => mutate(path, v)}
            as={as}
            style={style}
        />
    );

    // 誌面ラベル(chrome)を編集可能に。未設定なら DEFAULT_CHROME にフォールバック。
    const EC = (key: keyof MagazineChrome, style?: React.CSSProperties, as: keyof React.JSX.IntrinsicElements = 'span') => (
        <Editable
            value={String(getAt(draft, ['chrome', key]) ?? DEFAULT_CHROME[key] ?? '')}
            editing={editing}
            onCommit={(v) => mutate(['chrome', key], v)}
            as={as}
            style={style}
        />
    );

    const save = async () => {
        setStatus('保存中…');
        try {
            const res = await fetch('/api/magazine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ issue: draft, pass }),
            });
            const json = await res.json();
            if (json.success) {
                setStatus('保存しました');
                setTimeout(() => setStatus(''), 2500);
            } else {
                setStatus('失敗: ' + (json.error || 'unknown'));
            }
        } catch (err) {
            setStatus('失敗: ' + String(err));
        }
    };

    const reload = async () => {
        setStatus('再読込中…');
        try {
            const json = await fetch('/api/magazine', { cache: 'no-store' }).then((r) => r.json());
            if (json?.issue) setDraft(json.issue as MagazineIssue);
            setStatus('');
        } catch {
            setStatus('');
        }
    };

    const issue = draft;
    const vol3 = String(issue.vol).padStart(3, '0');

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#EDEAE2', padding: '0 0 80px', fontFamily: SANS }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .mag-dropcap::first-letter { float: left; font-family: ${SERIF}; font-weight: 700;
                    font-size: 3.2em; line-height: 0.8; padding: 5px 8px 0 0; color: ${RED}; }
                .mag-quiz-btn { transition: all 0.15s ease; }
                .mag-quiz-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.10); }
            `}} />

            {/* Toolbar */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 5, backgroundColor: INK, color: '#fff',
                padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
            }}>
                <div style={{ fontSize: '13px', letterSpacing: '1px' }}>
                    月刊 TOLERANCY — Vol. {vol3}
                    {editing && <span style={{ color: '#D4AF37', marginLeft: '10px', fontWeight: 700 }}>編集モード</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    {status && <span style={{ fontSize: '12px', color: '#D4AF37' }}>{status}</span>}
                    {editing && (
                        <>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="パスワード(任意)"
                                style={{
                                    fontSize: '12px', padding: '6px 10px', borderRadius: '6px',
                                    border: '1px solid #444', backgroundColor: '#2a2622', color: '#fff', width: '140px',
                                }}
                            />
                            <button onClick={reload} style={{
                                cursor: 'pointer', backgroundColor: 'transparent', color: '#fff', border: '1px solid #555',
                                borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 600,
                            }}>元に戻す</button>
                            <button onClick={save} style={{
                                cursor: 'pointer', backgroundColor: '#10B981', color: '#fff', border: 'none',
                                borderRadius: '8px', padding: '7px 18px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
                            }}>保存</button>
                        </>
                    )}
                    <button
                        onClick={() => { if (editing) { void reload(); } setEditing((v) => !v); }}
                        style={{
                            cursor: 'pointer', backgroundColor: editing ? '#555' : '#D4AF37', color: editing ? '#fff' : INK,
                            border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
                        }}
                    >
                        {editing ? '編集を終える' : '編集'}
                    </button>
                    <Link href="/english/magazine/cards" style={{
                        color: INK, backgroundColor: '#D4AF37', textDecoration: 'none', borderRadius: '8px',
                        padding: '7px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
                    }}>
                        シェア用カード (note/X用)
                    </Link>
                </div>
            </div>

            {!loaded && (
                <div style={{ maxWidth: '880px', margin: '0 auto', padding: '6px 24px', fontSize: '11px', color: MUTED }}>
                    最新の内容を読み込み中…
                </div>
            )}

            {/* ===================== COVER ===================== */}
            <div style={{
                maxWidth: '880px', margin: '0 auto', backgroundColor: PAPER,
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            }}>
                <div style={{ padding: 'clamp(28px, 6vw, 64px) clamp(20px, 6vw, 72px) clamp(24px, 4vw, 48px)', borderBottom: `1px solid ${LINE}` }}>
                    {/* Top bar */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        fontSize: '10px', letterSpacing: '2.5px', color: MUTED, textTransform: 'uppercase',
                        borderBottom: `2px solid ${INK}`, paddingBottom: '10px', marginBottom: 'clamp(20px, 4vw, 40px)',
                    }}>
                        {EC('topBarLabel')}
                        <span>Vol. {vol3} — {E(['coverDate'])}</span>
                    </div>

                    {/* Masthead */}
                    <h1 style={{
                        fontFamily: SERIF, fontWeight: 700, margin: 0,
                        fontSize: 'clamp(44px, 11vw, 110px)', letterSpacing: '-0.02em', lineHeight: 0.95, color: INK,
                    }}>
                        {EC('masthead')}<span style={{ color: RED }}>*</span>
                    </h1>
                    <div style={{ marginTop: '14px', fontSize: '12px', color: MUTED, lineHeight: 1.7 }}>
                        <span style={{ color: RED, fontWeight: 700 }}>*</span> {EC('mastheadNote')}
                    </div>

                    {/* Cover lines */}
                    <div style={{ marginTop: 'clamp(24px, 4vw, 44px)', borderTop: `1px solid ${LINE}` }}>
                        {issue.coverLines.map((line, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '16px', alignItems: 'baseline',
                                padding: '13px 0', borderBottom: `1px solid ${LINE}`,
                            }}>
                                <span style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 700, color: RED, minWidth: '28px' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {E(['coverLines', i], { fontFamily: SERIF, fontSize: 'clamp(14px, 2.4vw, 18px)', fontWeight: 700, color: INK, lineHeight: 1.5, flex: 1 })}
                                {editing && <MiniBtn tone="red" onClick={() => removeItem(['coverLines'], i)}>削除</MiniBtn>}
                            </div>
                        ))}
                        {editing && (
                            <div style={{ padding: '10px 0' }}>
                                <MiniBtn tone="green" onClick={() => addItem(['coverLines'], T_coverLine)}>+ 見出しを追加</MiniBtn>
                            </div>
                        )}
                    </div>

                    {/* Price bar */}
                    <div style={{
                        marginTop: '22px', display: 'flex', justifyContent: 'space-between',
                        fontSize: '10px', letterSpacing: '1.5px', color: MUTED, textTransform: 'uppercase',
                    }}>
                        {EC('priceLeft')}
                        {EC('priceRight')}
                    </div>
                </div>

                {/* ===================== EDITOR'S NOTE ===================== */}
                <Section kickerEl={EC('editorsNoteKicker')} titleEl={E(['editorsNote', 'title'])}>
                    {issue.editorsNote.paragraphs.map((p, i) => (
                        <div key={i} style={{ position: 'relative', marginBottom: '20px' }}>
                            {E(['editorsNote', 'paragraphs', i],
                                { fontFamily: SERIF, fontSize: '15px', lineHeight: 2.1, color: INK, display: 'block' },
                                'p')}
                            {editing && (
                                <div style={{ marginTop: '4px' }}>
                                    <MiniBtn tone="red" onClick={() => removeItem(['editorsNote', 'paragraphs'], i)}>段落を削除</MiniBtn>
                                </div>
                            )}
                        </div>
                    ))}
                    {editing && <div style={{ marginBottom: '18px' }}><MiniBtn tone="green" onClick={() => addItem(['editorsNote', 'paragraphs'], T_paragraph)}>+ 段落を追加</MiniBtn></div>}
                    <div style={{ textAlign: 'right', fontFamily: SERIF, fontSize: '13px', color: MUTED, fontStyle: 'italic' }}>
                        {EC('editorsNoteSign')}
                    </div>
                </Section>

                {/* ===================== FAKE DICTIONARY ===================== */}
                <Section kickerEl={EC('fakeKicker')} titleEl={EC('fakeTitle')} subEl={EC('fakeSub')}>
                    {issue.fakeWords.map((w, i) => (
                        <div key={i} style={{
                            borderTop: i === 0 ? `2px solid ${INK}` : `1px solid ${LINE}`,
                            padding: '26px 0',
                        }}>
                            {editing && (
                                <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                                    <MiniBtn tone="red" onClick={() => removeItem(['fakeWords'], i)}>この語を削除</MiniBtn>
                                </div>
                            )}
                            {/* headword */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '12px' }}>
                                {E(['fakeWords', i, 'word'], { fontFamily: SERIF, fontSize: 'clamp(26px, 4.5vw, 36px)', fontWeight: 700, color: INK, letterSpacing: '-0.01em' })}
                                {E(['fakeWords', i, 'pronunciation'], { fontFamily: SERIF, fontSize: '14px', color: MUTED })}
                                {E(['fakeWords', i, 'pos'], {
                                    fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#fff',
                                    backgroundColor: RED, borderRadius: '3px', padding: '3px 8px',
                                })}
                            </div>

                            {E(['fakeWords', i, 'fakeDefinition'], { fontFamily: SERIF, fontSize: '15px', lineHeight: 1.9, color: INK, display: 'block', margin: '14px 0 4px' }, 'p')}

                            <div style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.9, marginTop: '10px' }}>
                                <div><b style={{ color: INK }}>初出</b> — {E(['fakeWords', i, 'firstSeen'])}、DMM英会話。実際の発言: {E(['fakeWords', i, 'spoke'], { fontFamily: SERIF, fontStyle: 'italic' })}</div>
                                <div><b style={{ color: INK }}>言いたかったこと</b> — {E(['fakeWords', i, 'meant'])}</div>
                                <div><b style={{ color: INK }}>語源</b> — {E(['fakeWords', i, 'etymology'])}</div>
                            </div>

                            <CorrectBox>
                                {E(['fakeWords', i, 'correct', 'word'], { fontFamily: SERIF, fontSize: '16px', fontWeight: 700, color: INK, display: 'block' }, 'div')}
                                {E(['fakeWords', i, 'correct', 'example'], { fontFamily: SERIF, fontSize: '14.5px', color: INK, marginTop: '6px', display: 'block' }, 'div')}
                                {E(['fakeWords', i, 'correct', 'ja'], { fontSize: '12.5px', color: MUTED, marginTop: '2px', display: 'block' }, 'div')}
                                {E(['fakeWords', i, 'correct', 'tip'], { fontSize: '12px', color: '#166534', marginTop: '8px', lineHeight: 1.8, display: 'block' }, 'div')}
                            </CorrectBox>
                        </div>
                    ))}
                    {editing && <div style={{ paddingTop: '20px' }}><MiniBtn tone="green" onClick={() => addItem(['fakeWords'], T_fakeWord)}>+ 捏造語を追加</MiniBtn></div>}
                </Section>

                {/* ===================== A WATCH ===================== */}
                <Section kickerEl={EC('aWatchKicker')} titleEl={EC('aWatchTitle')} subEl={EC('aWatchSub')}>
                    {E(['aWatch', 'intro'], { fontFamily: SERIF, fontSize: '14.5px', lineHeight: 2, color: INK, display: 'block', margin: '0 0 24px' }, 'p')}
                    <div style={{ borderLeft: `2px solid ${RED}`, marginLeft: '6px' }}>
                        {issue.aWatch.observations.map((o, i) => (
                            <div key={i} style={{ padding: '0 0 24px 24px', position: 'relative' }}>
                                <span style={{
                                    position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px',
                                    borderRadius: '50%', backgroundColor: RED,
                                }} />
                                {E(['aWatch', 'observations', i, 'date'], { fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: RED, display: 'block' }, 'div')}
                                {E(['aWatch', 'observations', i, 'spoke'], { fontFamily: SERIF, fontSize: '17px', fontStyle: 'italic', color: INK, margin: '4px 0', display: 'block' }, 'div')}
                                {E(['aWatch', 'observations', i, 'caption'], { fontSize: '12.5px', color: MUTED, lineHeight: 1.8, display: 'block' }, 'div')}
                                {editing && <div style={{ marginTop: '6px' }}><MiniBtn tone="red" onClick={() => removeItem(['aWatch', 'observations'], i)}>削除</MiniBtn></div>}
                            </div>
                        ))}
                    </div>
                    {editing && <div style={{ margin: '4px 0 20px 30px' }}><MiniBtn tone="green" onClick={() => addItem(['aWatch', 'observations'], T_observation)}>+ 観測を追加</MiniBtn></div>}
                    <CorrectBox titleEl={E(['aWatch', 'rule', 'title'])}>
                        {issue.aWatch.rule.points.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: INK, lineHeight: 1.9, marginBottom: '6px' }}>
                                <span style={{ color: '#166534', fontWeight: 700 }}>{i + 1}.</span>
                                {E(['aWatch', 'rule', 'points', i], { flex: 1 })}
                                {editing && <MiniBtn tone="red" onClick={() => removeItem(['aWatch', 'rule', 'points'], i)}>削除</MiniBtn>}
                            </div>
                        ))}
                        {editing && <div style={{ marginTop: '8px' }}><MiniBtn tone="green" onClick={() => addItem(['aWatch', 'rule', 'points'], T_point)}>+ ルールを追加</MiniBtn></div>}
                    </CorrectBox>
                </Section>

                {/* ===================== BEST RALLY ===================== */}
                <Section kickerEl={EC('rallyKicker')} titleEl={E(['rally', 'title'])}>
                    {E(['rally', 'intro'], { fontFamily: SERIF, fontSize: '14.5px', lineHeight: 2, color: INK, display: 'block', margin: '0 0 26px' }, 'p')}
                    {issue.rally.lines.map((l, i) => (
                        <div key={i} style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: l.speaker === 'TONIO' ? 'flex-start' : 'flex-end',
                            marginBottom: '18px',
                        }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: l.speaker === 'TONIO' ? GOLD : RED, marginBottom: '5px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {l.speaker === 'TONIO' ? 'TONIO(編集長)' : 'TEACHER(講師)'}
                                {editing && (
                                    <button
                                        onClick={() => mutate(['rally', 'lines', i, 'speaker'], l.speaker === 'TONIO' ? 'TEACHER' : 'TONIO')}
                                        style={{ cursor: 'pointer', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', border: `1px solid ${LINE}`, background: '#fff', color: MUTED }}
                                    >話者を交代</button>
                                )}
                                {editing && <MiniBtn tone="red" onClick={() => removeItem(['rally', 'lines'], i)}>削除</MiniBtn>}
                            </div>
                            <div style={{
                                maxWidth: '85%', padding: '14px 18px', borderRadius: '2px',
                                backgroundColor: '#fff', border: `1px solid ${LINE}`,
                                borderLeft: l.speaker === 'TONIO' ? `3px solid ${GOLD}` : undefined,
                                borderRight: l.speaker === 'TEACHER' ? `3px solid ${RED}` : undefined,
                            }}>
                                {E(['rally', 'lines', i, 'en'], { fontFamily: SERIF, fontSize: '15.5px', color: INK, lineHeight: 1.7, display: 'block' }, 'div')}
                                {E(['rally', 'lines', i, 'ja'], { fontSize: '12px', color: MUTED, marginTop: '5px', display: 'block' }, 'div')}
                            </div>
                        </div>
                    ))}
                    {editing && <div style={{ marginBottom: '18px' }}><MiniBtn tone="green" onClick={() => addItem(['rally', 'lines'], T_rallyLine)}>+ セリフを追加</MiniBtn></div>}
                    <CorrectBox titleEl={EC('rallyIdiomsTitle')}>
                        {issue.rally.idioms.map((idm, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                {E(['rally', 'idioms', i, 'en'], { fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: INK })}
                                {E(['rally', 'idioms', i, 'ja'], { fontSize: '12.5px', color: MUTED, marginLeft: '10px' })}
                                {E(['rally', 'idioms', i, 'note'], { fontSize: '12px', color: '#166534', marginTop: '2px', lineHeight: 1.7, display: 'block' }, 'div')}
                                {editing && <div style={{ marginTop: '4px' }}><MiniBtn tone="red" onClick={() => removeItem(['rally', 'idioms'], i)}>削除</MiniBtn></div>}
                            </div>
                        ))}
                        {editing && <MiniBtn tone="green" onClick={() => addItem(['rally', 'idioms'], T_idiom)}>+ 表現を追加</MiniBtn>}
                    </CorrectBox>
                </Section>

                {/* ===================== AUTOPSY ===================== */}
                <Section kickerEl={EC('autopsyKicker')} titleEl={E(['autopsy', 'title'])}>
                    <div style={{
                        backgroundColor: '#fff', border: `1px solid ${LINE}`, borderTop: `3px solid ${INK}`,
                        padding: '22px 24px',
                    }}>
                        <div style={{ fontSize: '10px', letterSpacing: '2px', color: MUTED, textTransform: 'uppercase' }}>
                            Exhibit A — {E(['autopsy', 'date'])}
                        </div>
                        {E(['autopsy', 'spoke'], { fontFamily: SERIF, fontSize: 'clamp(17px, 3vw, 21px)', fontStyle: 'italic', color: RED, margin: '10px 0 0', lineHeight: 1.6, display: 'block' }, 'div')}
                    </div>
                    <div style={{ margin: '22px 0 0' }}>
                        {issue.autopsy.findings.map((f, i) => (
                            <div key={i} style={{ margin: '0 0 14px' }}>
                                <p style={{ fontFamily: SERIF, fontSize: '14.5px', lineHeight: 2, color: INK, margin: 0 }}>
                                    <b style={{ color: MUTED, fontSize: '12px', letterSpacing: '1px', marginRight: '8px' }}>所見{i + 1}</b>
                                    {E(['autopsy', 'findings', i])}
                                </p>
                                {editing && <div style={{ marginTop: '4px' }}><MiniBtn tone="red" onClick={() => removeItem(['autopsy', 'findings'], i)}>削除</MiniBtn></div>}
                            </div>
                        ))}
                        {editing && <MiniBtn tone="green" onClick={() => addItem(['autopsy', 'findings'], T_finding)}>+ 所見を追加</MiniBtn>}
                    </div>
                    <CorrectBox>
                        {E(['autopsy', 'correct', 'en'], { fontFamily: SERIF, fontSize: '16.5px', fontWeight: 700, color: INK, display: 'block' }, 'div')}
                        {E(['autopsy', 'correct', 'ja'], { fontSize: '12.5px', color: MUTED, marginTop: '4px', display: 'block' }, 'div')}
                        {E(['autopsy', 'verdict'], { fontSize: '12.5px', color: '#166534', marginTop: '10px', lineHeight: 1.8, display: 'block' }, 'div')}
                    </CorrectBox>
                </Section>

                {/* ===================== QUOTE ===================== */}
                <div style={{
                    padding: 'clamp(40px, 7vw, 72px) clamp(20px, 6vw, 72px)',
                    borderBottom: `1px solid ${LINE}`, backgroundColor: '#F3EFE5', textAlign: 'center',
                }}>
                    <div style={{ fontSize: '10px', letterSpacing: '3px', color: MUTED, textTransform: 'uppercase', marginBottom: '22px' }}>
                        {EC('quoteLabel')}
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 3.6vw, 30px)', fontWeight: 700, color: INK, lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
                        “{E(['quote', 'en'])}”
                    </div>
                    {E(['quote', 'ja'], { fontFamily: SERIF, fontSize: '14px', color: MUTED, marginTop: '16px', display: 'block' }, 'div')}
                    <div style={{ fontSize: '12px', color: INK, fontWeight: 600, marginTop: '18px' }}>— {E(['quote', 'by'])}</div>
                    {E(['quote', 'editorNote'], { fontSize: '11.5px', color: MUTED, marginTop: '8px', display: 'block' }, 'div')}
                </div>

                {/* ===================== QUIZ ===================== */}
                <Section kickerEl={EC('quizKicker')} titleEl={EC('quizTitle')} subEl={EC('quizSub')}>
                    {issue.quiz.map((q, i) => (
                        <QuizCard key={i} item={q} index={i} editing={editing} E={E} onRemove={() => removeItem(['quiz'], i)} />
                    ))}
                    {editing && <div style={{ paddingTop: '16px' }}><MiniBtn tone="green" onClick={() => addItem(['quiz'], T_quiz)}>+ 問題を追加</MiniBtn></div>}
                </Section>

                {/* ===================== NEXT ISSUE / COLOPHON ===================== */}
                <div style={{ padding: 'clamp(28px, 5vw, 48px) clamp(20px, 6vw, 72px) clamp(36px, 6vw, 56px)' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '3px', color: RED, fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                        {EC('nextIssueLabel')}
                    </div>
                    {issue.nextIssue.map((n, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${LINE}` }}>
                            {E(['nextIssue', i], { fontFamily: SERIF, fontSize: '14.5px', color: INK, lineHeight: 1.8, flex: 1 })}
                            {editing && <MiniBtn tone="red" onClick={() => removeItem(['nextIssue'], i)}>削除</MiniBtn>}
                        </div>
                    ))}
                    {editing && <div style={{ marginTop: '10px' }}><MiniBtn tone="green" onClick={() => addItem(['nextIssue'], T_nextIssue)}>+ 予告を追加</MiniBtn></div>}
                    <div style={{
                        marginTop: '34px', paddingTop: '18px', borderTop: `2px solid ${INK}`,
                        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
                        fontSize: '10px', letterSpacing: '1.5px', color: MUTED, textTransform: 'uppercase',
                    }}>
                        {EC('colophonLeft')}
                        {EC('colophonRight')}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===================== 共通パーツ =====================

function Section({ kicker, kickerEl, title, titleEl, sub, subEl, children }: {
    kicker?: string; kickerEl?: React.ReactNode; title?: string; titleEl?: React.ReactNode;
    sub?: string; subEl?: React.ReactNode; children: React.ReactNode;
}) {
    const hasSub = subEl != null || sub != null;
    return (
        <div style={{ padding: 'clamp(32px, 6vw, 56px) clamp(20px, 6vw, 72px)', borderBottom: `1px solid ${LINE}` }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: RED, fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>
                {kickerEl ?? kicker}
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 4.5vw, 38px)', fontWeight: 700, color: INK, margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                {titleEl ?? title}
            </h2>
            {hasSub && (
                <p style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.9, margin: '0 0 26px', maxWidth: '560px' }}>{subEl ?? sub}</p>
            )}
            {!hasSub && <div style={{ height: '18px' }} />}
            {children}
        </div>
    );
}

// 「で、正解は」ボックス — 全コメディの着地点。笑いだけで終わらせない装置。
function CorrectBox({ title = 'で、正解は', titleEl, children }: { title?: string; titleEl?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div style={{
            marginTop: '18px', backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2',
            borderLeft: '3px solid #10B981', padding: '16px 20px',
        }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#166534', textTransform: 'uppercase', marginBottom: '10px' }}>
                {titleEl ?? title}
            </div>
            {children}
        </div>
    );
}

function QuizCard({ item, index, editing, E, onRemove }: {
    item: QuizItem;
    index: number;
    editing: boolean;
    E: (path: Path, style?: React.CSSProperties, as?: keyof React.JSX.IntrinsicElements) => React.ReactNode;
    onRemove: () => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderTop: index === 0 ? `2px solid ${INK}` : `1px solid ${LINE}`, padding: '20px 0' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: RED }}>Q{index + 1}</span>
                <div style={{ flex: 1 }}>
                    {editing && (
                        <div style={{ marginBottom: '8px', textAlign: 'right' }}>
                            <MiniBtn tone="red" onClick={onRemove}>この問題を削除</MiniBtn>
                        </div>
                    )}
                    {E(['quiz', index, 'q'], { fontFamily: SERIF, fontSize: '15px', color: INK, lineHeight: 1.9, display: 'block' }, 'div')}
                    {(editing || item.hint) && (
                        <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '4px' }}>
                            ヒント: {E(['quiz', index, 'hint'])}
                        </div>
                    )}
                    {editing ? (
                        <div style={{
                            marginTop: '12px', backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2',
                            borderLeft: '3px solid #10B981', padding: '12px 16px',
                        }}>
                            {E(['quiz', index, 'a'], { fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: INK, display: 'block' }, 'div')}
                            {E(['quiz', index, 'explain'], { fontSize: '12px', color: '#166534', marginTop: '6px', lineHeight: 1.8, display: 'block' }, 'div')}
                        </div>
                    ) : !open ? (
                        <button
                            className="mag-quiz-btn"
                            onClick={() => setOpen(true)}
                            style={{
                                marginTop: '12px', cursor: 'pointer', backgroundColor: INK, color: '#fff',
                                border: 'none', borderRadius: '2px', padding: '8px 20px',
                                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                            }}
                        >
                            正解を開く
                        </button>
                    ) : (
                        <div style={{
                            marginTop: '12px', backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2',
                            borderLeft: '3px solid #10B981', padding: '12px 16px',
                        }}>
                            <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: INK }}>{item.a}</div>
                            <div style={{ fontSize: '12px', color: '#166534', marginTop: '6px', lineHeight: 1.8 }}>{item.explain}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
