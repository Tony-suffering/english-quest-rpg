'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
    BridgeItem, Choice, Part34Set, Part6Set, Part7Set, Passage as PassageT, QExplain, SetExplain,
    ToeicBridge, ToeicExplain, ToeicGlossary, ToeicTest,
} from '@/data/english/toeic-types';
import { TOEIC_TESTS } from '@/data/english/toeic-tests';
import { appendAnswerEvent, clearTestSession, loadGuesses, saveGuesses } from '@/lib/toeic-doctor';
import ToeicGraphic from './ToeicGraphic';
import ToeicExplainView, { BridgeBox, GlossBox, QView } from './ToeicExplainView';
import ToeicWeakness from './ToeicWeakness';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E2D5';
const PAPER = '#FFFFFF';
const RED = '#DC2626';

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text.replace(/\n+/g, '. '));
    u.lang = 'en-US';
    u.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}
function stopSpeak() {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;
const READ_SIZE_KEY = 'toeic-read-size';
const READ_SIZE_LABEL = ['標準', '大', '特大'];

/* ================================================================
   Document renderers -- Part 7 の文書をタイプ別に描き分ける
   ================================================================ */

const DOC_FONT = 'Georgia, "Times New Roman", serif';

/** 本文の行長の上限。1行が長すぎると次の行の頭を見失う */
const PROSE_WIDTH = '36em';

/**
 * 地の文(メール本文・記事・掲示など)を読める形で組む。
 *
 * 空行で段落に割り、段落間に間隔を入れる。段落の中の改行は原文どおり残すので、
 * 住所や署名のような改行に意味がある行も崩れない。行長は PROSE_WIDTH で止める。
 */
function Prose({ text, fontSize, align }: { text: string; fontSize: string; align?: 'left' | 'center' }) {
    const paras = text.split(/\n\s*\n/).filter(p => p.trim() !== '');
    return (
        <div style={{
            fontSize, lineHeight: 1.85, color: '#292524', fontFamily: DOC_FONT, textAlign: 'left',
            maxWidth: PROSE_WIDTH, margin: align === 'center' ? '0 auto' : undefined,
        }}>
            {paras.map((p, i) => (
                <p key={i} style={{ margin: i === 0 ? 0 : '0.9em 0 0', whiteSpace: 'pre-line' }}>{p}</p>
            ))}
        </div>
    );
}

function docCategory(type?: string): string {
    const t = (type || '').toLowerCase();
    if (t.includes('mail')) return 'email';
    if (t.includes('chat') || t.includes('text-message')) return 'chat';
    if (t.includes('form')) return 'form';
    if (t === 'sign' || t.includes('notice')) return 'sign';
    if (t.includes('web')) return 'web';
    if (t.includes('article')) return 'article';
    if (t.includes('schedule')) return 'schedule';
    if (t.includes('review')) return 'review';
    if (t.includes('report')) return 'report';
    return 'plain';
}

/** To:/From:/Cc:/Date:/Subject: のヘッダー行を本文から切り出す */
function splitEmailHeader(body: string): { fields: [string, string][]; rest: string } {
    const lines = body.split('\n');
    const fields: [string, string][] = [];
    let i = 0;
    for (; i < lines.length; i++) {
        const m = lines[i].match(/^(To|From|Cc|Date|Subject)\s*:\s*(.*)$/i);
        if (m) { fields.push([m[1], m[2]]); continue; }
        if (lines[i].trim() === '' && fields.length > 0) { i++; break; }
        break;
    }
    if (fields.length < 2) return { fields: [], rest: body };
    return { fields, rest: lines.slice(i).join('\n') };
}

function EmailDoc({ body, fontSize }: { body: string; fontSize: string }) {
    const { fields, rest } = splitEmailHeader(body);
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', overflow: 'hidden', marginBottom: '10px' }}>
            {fields.length > 0 && (
                <div style={{ background: '#F6F4EC', borderBottom: `1px solid ${LINE}`, padding: '10px 14px' }}>
                    {fields.map(([k, v], i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', padding: '2px 0', alignItems: 'baseline' }}>
                            <span style={{ flexShrink: 0, width: '58px', fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{k}:</span>
                            <span style={{ fontSize: '12.5px', fontWeight: k.toLowerCase() === 'subject' ? 700 : 500, color: INK, wordBreak: 'break-word' }}>{v}</span>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ padding: '15px 16px' }}><Prose text={rest} fontSize={fontSize} /></div>
        </div>
    );
}

const CHAT_COLORS = ['#FEF9E7', '#ECFDF5', '#F1F0EE', '#EDF4FB'];
const CHAT_BORDERS = ['#EADFB8', '#C9EBDC', '#DDDAD4', '#CFE0EF'];

function ChatDoc({ body, fontSize }: { body: string; fontSize: string }) {
    const blocks = body.split(/\n\s*\n/);
    const speakerIdx: Record<string, number> = {};
    let nextIdx = 0;
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFBF7', padding: '12px 10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {blocks.map((block, bi) => {
                const m = block.match(/^(.+?)\s*[\(\[](\d{1,2}:\d{2}\s*[AP]\.?M\.?)[\)\]]\s*:?\s*([\s\S]*)$/);
                if (!m) {
                    return <div key={bi} style={{ fontSize: '11px', color: SUB, textAlign: 'center', whiteSpace: 'pre-line' }}>{block}</div>;
                }
                const name = m[1].trim();
                if (!(name in speakerIdx)) { speakerIdx[name] = nextIdx; nextIdx = (nextIdx + 1) % CHAT_COLORS.length; }
                const ci = speakerIdx[name];
                return (
                    <div key={bi}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px', marginBottom: '2px', paddingLeft: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: INK }}>{name}</span>
                            <span style={{ fontSize: '10px', color: SUB }}>{m[2]}</span>
                        </div>
                        <div style={{ background: CHAT_COLORS[ci], border: `1px solid ${CHAT_BORDERS[ci]}`, borderRadius: '4px 12px 12px 12px', padding: '8px 12px', fontSize, lineHeight: 1.65, color: '#292524', whiteSpace: 'pre-line' }}>
                            {m[3].trim()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function CheckBox({ checked }: { checked: boolean }) {
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '14px', height: '14px', borderRadius: '3px', margin: '0 2px', verticalAlign: '-2px',
            border: `1.5px solid ${checked ? DEEPGOLD : '#B4AD99'}`,
            background: checked ? GOLD : '#fff',
            color: '#fff', fontSize: '10px', fontWeight: 900, lineHeight: 1,
        }}>{checked ? '✓' : ''}</span>
    );
}

/** [X] / [ ] をチェックボックスに置換して描画 */
function lineWithCheckboxes(line: string, key: number, style: React.CSSProperties) {
    const parts = line.split(/(\[X\]|\[ \])/);
    if (parts.length === 1) return <div key={key} style={style}>{line || ' '}</div>;
    return (
        <div key={key} style={style}>
            {parts.map((p, i) => p === '[X]' ? <CheckBox key={i} checked /> : p === '[ ]' ? <CheckBox key={i} checked={false} /> : <span key={i}>{p}</span>)}
        </div>
    );
}

function FormDoc({ heading, body, fontSize }: { heading?: string; body: string; fontSize: string }) {
    const lines = body.split('\n');
    const out: React.ReactNode[] = [];
    let tableBuf: string[][] = [];
    const flushTable = (key: string) => {
        if (tableBuf.length === 0) return;
        const rows = tableBuf;
        tableBuf = [];
        out.push(
            <div key={key} style={{ overflowX: 'auto', margin: '8px 0' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12px' }}>
                    <tbody>
                        {rows.map((cells, ri) => (
                            <tr key={ri}>
                                {cells.map((c, ci) => (
                                    <td key={ci} style={{
                                        border: `1px solid ${LINE}`, padding: '5px 8px', color: INK,
                                        fontWeight: ri === 0 ? 800 : 500, background: ri === 0 ? '#F6F4EC' : '#fff',
                                        whiteSpace: 'nowrap',
                                    }}>{renderCheckSpans(c)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    lines.forEach((raw, i) => {
        const line = raw.replace(/\s+$/, '');
        // | で区切られた表
        if (/^\s*\|.*\|\s*$/.test(line)) {
            tableBuf.push(line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(s => s.trim()));
            return;
        }
        flushTable(`t${i}`);
        // 罫線
        if (/^-{5,}\s*$/.test(line)) { out.push(<hr key={i} style={{ border: 'none', borderTop: `1px dashed ${LINE}`, margin: '8px 0' }} />); return; }
        // 桁揃えの行(2連スペース2箇所以上)は等幅で
        const mono = (line.match(/\S {2,}\S/g) || []).length >= 2;
        // 全部大文字の見出し行
        const isCaps = /^[A-Z0-9 &'.,()\/—-]+$/.test(line) && /[A-Z]{3}/.test(line);
        // Label: value
        const lm = !mono && line.match(/^([A-Za-z][\w'’ .\/()-]{1,40}):\s*(.*)$/);
        const base: React.CSSProperties = {
            fontSize: mono ? '11.5px' : fontSize, lineHeight: 1.7, color: '#292524',
            fontFamily: mono ? 'ui-monospace, "Cascadia Mono", Consolas, monospace' : undefined,
            whiteSpace: mono ? 'pre' : 'pre-wrap',
            overflowX: mono ? 'auto' : undefined,
        };
        if (isCaps) {
            out.push(<div key={i} style={{ ...base, fontWeight: 800, letterSpacing: '0.5px', textAlign: 'center', color: INK }}>{line}</div>);
        } else if (lm) {
            out.push(
                <div key={i} style={base}>
                    <span style={{ fontWeight: 800, color: INK }}>{lm[1]}: </span>
                    <span style={{ borderBottom: lm[2] ? `1px solid #D8D2C0` : 'none' }}>{renderCheckSpans(lm[2])}</span>
                </div>
            );
        } else {
            out.push(lineWithCheckboxes(line, i, base));
        }
    });
    flushTable('tEnd');
    return (
        <div style={{ border: `1.5px solid #C9C4B5`, borderRadius: '6px', background: '#FFFEFA', padding: '14px 14px', marginBottom: '10px', boxShadow: `inset 0 0 0 3px #fff, inset 0 0 0 4px ${LINE}` }}>
            {heading && <div style={{ fontSize: '13px', fontWeight: 800, color: INK, textAlign: 'center', borderBottom: `2px solid ${INK}`, paddingBottom: '7px', marginBottom: '9px' }}>{heading}</div>}
            {out}
        </div>
    );
}

function renderCheckSpans(text: string): React.ReactNode {
    const parts = text.split(/(\[X\]|\[ \])/);
    if (parts.length === 1) return text;
    return parts.map((p, i) => p === '[X]' ? <CheckBox key={i} checked /> : p === '[ ]' ? <CheckBox key={i} checked={false} /> : <span key={i}>{p}</span>);
}

function SignDoc({ heading, body, fontSize }: { heading?: string; body: string; fontSize: string }) {
    return (
        <div style={{ border: `2px solid ${INK}`, borderRadius: '10px', background: '#fff', padding: '5px', marginBottom: '10px' }}>
            <div style={{ border: `1px solid #B4AD99`, borderRadius: '6px', padding: '16px 16px', textAlign: 'center' }}>
                {heading && <div style={{ fontSize: '13px', fontWeight: 900, color: INK, letterSpacing: '1px', marginBottom: '10px' }}>{heading}</div>}
                <Prose text={body} fontSize={fontSize} align="center" />
            </div>
        </div>
    );
}

function WebDoc({ heading, body, fontSize }: { heading?: string; body: string; fontSize: string }) {
    const lines = body.split('\n');
    let url = '';
    let tabs: string[] = [];
    const rest: string[] = [];
    for (const line of lines) {
        const t = line.trim();
        if (!url && /^(https?:\/\/|www\.)\S+$/.test(t)) { url = t; continue; }
        if (tabs.length === 0 && (/^\[ .+ \]/.test(t) || (t.includes('|') && t.length < 90 && !/\d{1,2}:\d{2}/.test(t) && t.split('|').length >= 3))) {
            tabs = t.includes('[') ? (t.match(/\[\s*([^\]]+?)\s*\]/g) || []).map(s => s.replace(/[\[\]]/g, '').trim()) : t.split('|').map(s => s.trim()).filter(Boolean);
            continue;
        }
        rest.push(line);
    }
    return (
        <div style={{ border: `1px solid #C9C4B5`, borderRadius: '10px', background: '#fff', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{ background: '#EDEBE3', borderBottom: `1px solid ${LINE}`, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    {[0, 1, 2].map(i => <span key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9C4B5' }} />)}
                </span>
                <span style={{ flex: 1, background: '#fff', border: `1px solid ${LINE}`, borderRadius: '99px', padding: '3px 12px', fontSize: '11px', color: SUB, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {url || 'www.example.com'}
                </span>
            </div>
            {tabs.length > 0 && (
                <div style={{ display: 'flex', gap: '2px', padding: '8px 10px 0', borderBottom: `1px solid ${LINE}`, overflowX: 'auto' }}>
                    {tabs.map((tab, i) => (
                        <span key={i} style={{
                            fontSize: '11px', fontWeight: i === tabs.length - 1 ? 800 : 600, whiteSpace: 'nowrap',
                            color: i === tabs.length - 1 ? INK : SUB,
                            background: i === tabs.length - 1 ? '#fff' : '#F6F4EC',
                            border: `1px solid ${LINE}`, borderBottom: i === tabs.length - 1 ? '1px solid #fff' : `1px solid ${LINE}`,
                            borderRadius: '7px 7px 0 0', padding: '4px 11px', marginBottom: '-1px',
                        }}>{tab}</span>
                    ))}
                </div>
            )}
            <div style={{ padding: '15px 16px' }}>
                {heading && <div style={{ fontSize: '14.5px', fontWeight: 800, color: INK, marginBottom: '9px' }}>{heading}</div>}
                <Prose text={rest.join('\n').trim()} fontSize={fontSize} />
            </div>
        </div>
    );
}

function ArticleDoc({ heading, body, fontSize }: { heading?: string; body: string; fontSize: string }) {
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFBF7', padding: '18px 18px', marginBottom: '10px' }}>
            {heading && (
                <div style={{ fontFamily: DOC_FONT, fontSize: '17px', fontWeight: 700, color: INK, lineHeight: 1.35, borderBottom: `2px solid ${INK}`, paddingBottom: '9px', marginBottom: '12px', maxWidth: PROSE_WIDTH }}>
                    {heading}
                </div>
            )}
            <Prose text={body} fontSize={fontSize} />
        </div>
    );
}

function ScheduleDoc({ heading, body, fontSize }: { heading?: string; body: string; fontSize: string }) {
    const lines = body.split('\n');
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFBF7', padding: '14px 16px', marginBottom: '10px' }}>
            {heading && <div style={{ fontSize: '13px', fontWeight: 800, color: INK, textAlign: 'center', borderBottom: `1px solid ${LINE}`, paddingBottom: '8px', marginBottom: '8px' }}>{heading}</div>}
            <div style={{ fontFamily: DOC_FONT }}>
                {lines.map((line, i) => {
                    const isSlot = /^\s*\d{1,2}:\d{2}/.test(line) || /^(Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|June|July|August|September|October|November|December|January|February|March|April|May)\b.*—/.test(line);
                    return (
                        <div key={i} style={{
                            fontSize, lineHeight: 1.7, color: '#292524', whiteSpace: 'pre-wrap',
                            fontWeight: isSlot ? 700 : 400,
                            marginTop: isSlot && i > 0 ? '7px' : 0,
                        }}>{line || ' '}</div>
                    );
                })}
            </div>
        </div>
    );
}

function PlainDoc({ heading, body, fontSize, label }: { heading?: string; body: string; fontSize: string; label?: string }) {
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFBF7', padding: '16px 18px', marginBottom: '10px' }}>
            {label && <div style={{ fontSize: '9px', fontWeight: 800, color: GOLD, letterSpacing: '1.5px', marginBottom: '6px' }}>{label}</div>}
            {heading && <div style={{ fontSize: '14px', fontWeight: 700, color: INK, whiteSpace: 'pre-line', borderBottom: `1px solid ${LINE}`, paddingBottom: '9px', marginBottom: '10px', fontFamily: DOC_FONT, maxWidth: PROSE_WIDTH }}>{heading}</div>}
            <Prose text={body} fontSize={fontSize} />
        </div>
    );
}

function DocView({ p, fontSize, kindLabel }: { p: PassageT; fontSize: string; kindLabel?: string }) {
    const cat = docCategory(p.type);
    const typeTag = p.type ? p.type.toUpperCase() : '';
    return (
        <div>
            {kindLabel && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '2px 0 5px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: DEEPGOLD, letterSpacing: '1px', borderRadius: '4px', padding: '2px 8px' }}>{kindLabel}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: SUB, letterSpacing: '1px' }}>{typeTag}</span>
                </div>
            )}
            {cat === 'email' ? <EmailDoc body={p.body} fontSize={fontSize} />
                : cat === 'chat' ? <ChatDoc body={p.body} fontSize={fontSize} />
                    : cat === 'form' ? <FormDoc heading={p.heading} body={p.body} fontSize={fontSize} />
                        : cat === 'sign' ? <SignDoc heading={p.heading} body={p.body} fontSize={fontSize} />
                            : cat === 'web' ? <WebDoc heading={p.heading} body={p.body} fontSize={fontSize} />
                                : cat === 'article' ? <ArticleDoc heading={p.heading} body={p.body} fontSize={fontSize} />
                                    : cat === 'schedule' ? <ScheduleDoc heading={p.heading} body={p.body} fontSize={fontSize} />
                                        : <PlainDoc heading={p.heading} body={p.body} fontSize={fontSize} />}
        </div>
    );
}

/* ================================================================
   Page
   ================================================================ */

export default function ToeicBooklet({ test, explain, glossary, bridge }: {
    test: ToeicTest;
    /** 市販問題集水準の解説編。ある回だけ「解答解説」が詳解になる */
    explain?: ToeicExplain;
    /** 解説編が無い回のための語注。弱点レポートの単語抽出に使う */
    glossary?: ToeicGlossary;
    /** つながらない語。ある回だけ本文の横に「直訳 → 実際」が出る */
    bridge?: ToeicBridge;
}) {
    const t = test;
    const ANSWERS_KEY = `toeic-${test.id}-answers`;
    const hasListening = t.part1.length > 0;
    const [answers, setAnswers] = useState<Record<number, string>>({});
    /**
     * 勘フラグ (診断用の自己申告)。「根拠なくマークした」問題に付ける。
     * 正解でもフラグ付きなら診断側で「まぐれ」として実力から除く。
     */
    const [guesses, setGuesses] = useState<Set<number>>(new Set());
    const [graded, setGraded] = useState(false);
    const [reveal, setReveal] = useState(false);
    /**
     * 全訳モード。解答解説とは別に持つ。
     * 解説(reveal)は正解と外し方まで出してしまうので、「解く前に訳だけ確かめたい」
     * 「解いた直後に訳だけ突き合わせたい」に使えない。訳と語の解説だけを切り出す。
     */
    const [showJp, setShowJp] = useState(false);
    const [showScripts, setShowScripts] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    /** Part 6/7 の長文の文字サイズ。0=標準 1=大 2=特大 */
    const [readSize, setReadSize] = useState(0);

    // 解説データ (市販問題集水準の詳解)。無い回では従来の note だけを出す。
    // 設問番号 -> その設問の解説と、属するセットの解説 (語注・本文訳の参照用)
    const explainByNo = useMemo(() => {
        const m = new Map<number, { set: SetExplain; q: QExplain }>();
        (explain?.sets || []).forEach(s => s.questions.forEach(q => m.set(q.no, { set: s, q })));
        return m;
    }, [explain]);
    const hasExplain = explainByNo.size > 0;

    /**
     * つながらない語。セットのキー ("p7-147-148") そのままで引く。
     * Part 1/2/5 はセット単位の枠が誌面に無いので、そのセットの最後の設問番号でも引けるようにする。
     */
    const bridgeByKey = useMemo(
        () => new Map((bridge?.sets || []).map(s => [s.key, s.items])),
        [bridge],
    );
    const bridgeByLastNo = useMemo(() => {
        const m = new Map<number, BridgeItem[]>();
        (bridge?.sets || []).forEach(s => {
            const last = Number(s.key.split('-').pop());
            if (Number.isFinite(last)) m.set(last, s.items);
        });
        return m;
    }, [bridge]);
    const hasBridge = bridgeByKey.size > 0;

    useEffect(() => {
        try {
            const s = localStorage.getItem(ANSWERS_KEY);
            if (s) setAnswers(JSON.parse(s));
            const r = localStorage.getItem(READ_SIZE_KEY);
            if (r) setReadSize(Math.min(2, Math.max(0, Number(r) || 0)));
        } catch { /* noop */ }
        setGuesses(loadGuesses(test.id));
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => { window.removeEventListener('resize', check); stopSpeak(); };
    }, []);

    const select = useCallback((no: number, label: string) => {
        // 解答イベントを時刻付きで残す。診断 (時間配分・塗り絵検出) の生データになる
        appendAnswerEvent(test.id, no, label);
        setAnswers(prev => {
            const next = { ...prev, [no]: label };
            try { localStorage.setItem(ANSWERS_KEY, JSON.stringify(next)); } catch { /* noop */ }
            return next;
        });
    }, [ANSWERS_KEY, test.id]);

    const toggleGuess = useCallback((no: number) => {
        setGuesses(prev => {
            const next = new Set(prev);
            if (next.has(no)) next.delete(no); else next.add(no);
            saveGuesses(test.id, next);
            return next;
        });
    }, [test.id]);

    const score = useMemo(() => {
        let l = 0, r = 0;
        t.answerKey.forEach(k => {
            if (answers[k.no] === k.answer) { if (k.no <= 100) l++; else r++; }
        });
        return { l, r, total: l + r };
    }, [answers, t]);

    const reset = () => {
        setAnswers({});
        setGuesses(new Set());
        setGraded(false);
        try { localStorage.removeItem(ANSWERS_KEY); } catch { /* noop */ }
        clearTestSession(test.id);
        stopSpeak();
    };

    const showMark = graded || reveal;
    const anchorTop = isMobile ? '108px' : '70px';
    /** Part 6/7 の本文サイズ。設問・選択肢は変えず、読む量が多いところだけ大きくする */
    const docFontSize = `${(isMobile ? 14.5 : 14) + readSize * 1.5}px`;

    const cycleReadSize = () => {
        setReadSize(prev => {
            const next = (prev + 1) % 3;
            try { localStorage.setItem(READ_SIZE_KEY, String(next)); } catch { /* noop */ }
            return next;
        });
    };

    /**
     * 勘フラグ。マーク済みの設問にだけ出す。
     * 診断 (SCOREPASS ドクター) がまぐれ正解を実力から除くための自己申告で、
     * 付けても採点は変わらない。
     */
    const GuessChip = ({ no }: { no: number }) => {
        if (answers[no] == null) return null;
        const on = guesses.has(no);
        return (
            <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button onClick={() => toggleGuess(no)}
                    title="根拠なくマークした問題に付ける。診断でまぐれ正解を実力から除くための自己申告"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        border: `1px solid ${on ? '#F59E0B' : LINE}`, borderRadius: '99px',
                        background: on ? '#FFFBEB' : 'transparent', color: on ? '#B45309' : '#B4AD99',
                        fontSize: '10px', fontWeight: 800, padding: '3px 10px', cursor: 'pointer', letterSpacing: '0.5px',
                    }}>
                    <span style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        border: `1.5px solid ${on ? '#F59E0B' : '#C9C4B5'}`,
                        background: on ? '#F59E0B' : 'transparent',
                    }} />
                    勘で答えた
                </button>
            </div>
        );
    };

    // ---- shared choice renderer ----
    const ChoiceList = ({ no, choices, answer }: { no: number; choices: Choice[]; answer: string }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6px' : '4px', marginTop: '6px' }}>
            {choices.map(c => {
                const chosen = answers[no] === c.label;
                const isCorrect = answer === c.label;
                let bg = '#fff', bd = LINE, col = INK, ring = 'transparent';
                if (chosen) { ring = GOLD; bg = '#FEF9E7'; }
                if (showMark && isCorrect) { bg = '#ECFDF5'; bd = GREEN; col = '#065F46'; }
                if (showMark && chosen && !isCorrect) { bg = '#FEF2F2'; bd = RED; col = '#991B1B'; }
                return (
                    <button key={c.label} onClick={() => select(no, c.label)}
                        className="choice-row"
                        style={{
                            display: 'flex', alignItems: 'flex-start', gap: '9px', textAlign: 'left',
                            padding: isMobile ? '10px 11px' : '7px 10px', borderRadius: '9px', cursor: 'pointer',
                            minHeight: isMobile ? '44px' : undefined,
                            border: `1px solid ${bd}`, background: bg, boxShadow: chosen ? `0 0 0 1.5px ${ring}` : 'none',
                            transition: 'all 0.1s',
                        }}>
                        <span style={{
                            flexShrink: 0, width: '21px', height: '21px', borderRadius: '50%', marginTop: '1px',
                            border: `1.5px solid ${showMark && isCorrect ? GREEN : showMark && chosen && !isCorrect ? RED : chosen ? GOLD : '#C9C4B5'}`,
                            color: showMark && isCorrect ? GREEN : showMark && chosen && !isCorrect ? RED : chosen ? DEEPGOLD : SUB,
                            fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: chosen && !showMark ? '#fff' : 'transparent',
                        }}>{c.label}</span>
                        <span style={{ fontSize: isMobile ? '14px' : '13.5px', lineHeight: 1.55, color: col }}>{c.text}</span>
                    </button>
                );
            })}
            <GuessChip no={no} />
        </div>
    );

    const Explain = ({ note }: { note?: string }) => (
        reveal && note ? (
            <div style={{ marginTop: '6px', fontSize: isMobile ? '12px' : '11.5px', lineHeight: 1.75, color: SUB, background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '8px 11px' }}>
                {note}
            </div>
        ) : null
    );

    /**
     * 全訳モードの本文訳。本文のすぐ下に出す。
     * 解説編(SetExplainBlock)にも同じ訳が入っているが、あちらは設問を全部抜けた先にあり、
     * 「この段落は何を言っているのか」を本文を見ながら確かめる用途には遠すぎる。
     */
    const JpBody = ({ firstNo }: { firstNo?: number }) => {
        if (!showJp || firstNo == null) return null;
        const jp = explainByNo.get(firstNo)?.set?.bodyJp;
        if (!jp) return null;
        return (
            <div style={{
                border: `1px solid ${GREEN}55`, background: '#F5FDFA', borderRadius: '10px',
                padding: '11px 14px', marginBottom: '10px',
            }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: DEEPGREEN, letterSpacing: '1px', marginBottom: '6px' }}>全訳</div>
                <div style={{ fontSize: isMobile ? '13px' : '12.5px', lineHeight: 1.95, color: '#292524', whiteSpace: 'pre-line' }}>
                    {jp.replace(/【\d+】/g, '')}
                </div>
            </div>
        );
    };

    /** 全訳モードの設問訳。設問文と選択肢の日本語だけ。正解は伏せたまま */
    const JpQ = ({ no }: { no: number }) => {
        if (!showJp) return null;
        const q = explainByNo.get(no)?.q;
        if (!q) return null;
        return (
            <div style={{ marginTop: '6px', fontSize: isMobile ? '12.5px' : '12px', lineHeight: 1.7, color: SUB, background: '#F5FDFA', border: `1px solid ${GREEN}44`, borderRadius: '8px', padding: '7px 11px' }}>
                {q.questionJp && <div style={{ color: INK, fontWeight: 600, marginBottom: '3px' }}>{q.questionJp}</div>}
                {q.choices.map(c => (
                    <div key={c.label} style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ flexShrink: 0 }}>({c.label})</span><span>{c.jp}</span>
                    </div>
                ))}
            </div>
        );
    };

    /** つながらない語。全訳モードでも解説モードでも出す (正解には触れないので伏せる必要が無い) */
    const SetBridge = ({ setKey, no }: { setKey?: string; no?: number }) => {
        if (!showJp && !reveal) return null;
        const items = setKey ? bridgeByKey.get(setKey) : no != null ? bridgeByLastNo.get(no) : undefined;
        return <BridgeBox items={items} isMobile={isMobile} />;
    };

    /**
     * セット単位の詳解 (市販問題集の解説編相当)。解説データがある回でだけ出す。
     * 解説データのキー (例 "p3-32-34") と set.range ("32-34") は形が違うので、
     * 先頭の設問番号から explainByNo 経由で解説セットを引く。
     */
    const SetExplainBlock = ({ range, meta }: {
        range: string;
        meta: { no: number; question?: string; choices: Choice[]; answer: string }[];
    }) => {
        void range;
        const firstNo = meta[0]?.no;
        const set = firstNo != null ? explainByNo.get(firstNo)?.set : undefined;
        if (!set) return null;
        return (
            <div style={{ marginTop: '12px', borderTop: `2px solid ${GREEN}55`, paddingTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: DEEPGREEN, letterSpacing: '1px', marginBottom: '8px' }}>
                    解説 ・ Questions {range}
                </div>
                <ToeicExplainView set={set} meta={meta} isMobile={isMobile} />
            </div>
        );
    };

    const PlayBtn = ({ text, label = '音声' }: { text: string; label?: string }) => (
        <button onClick={() => speak(text)} className="no-print"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', border: `1px solid ${LINE}`, background: '#fff', color: SUB, borderRadius: '99px', padding: isMobile ? '6px 13px' : '4px 12px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '9px' }}>{'▶'}</span> {label}
        </button>
    );

    const PartHeader = ({ id, tag, title, jp, dir }: { id: string; tag: string; title: string; jp: string; dir: string }) => (
        <div id={id} style={{ marginTop: '34px', scrollMarginTop: anchorTop }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '0.5px' }}>{tag}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: DEEPGOLD }}>{title}</span>
                <span style={{ fontSize: '11px', color: SUB }}>{jp}</span>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '11.5px', lineHeight: 1.6, color: SUB, fontStyle: 'italic', background: '#F6F4EC', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 11px' }}>
                <b style={{ color: INK, fontStyle: 'normal' }}>Directions: </b>{dir}
            </p>
        </div>
    );

    // id は弱点レポートからの飛び先。全 Part がこれを通るので、ここ1箇所で足りる
    const QNo = ({ no }: { no: number }) => (
        <span id={`q${no}`} style={{ display: 'inline-flex', minWidth: '30px', height: '22px', alignItems: 'center', justifyContent: 'center', background: INK, color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: 800, padding: '0 6px', scrollMarginTop: anchorTop }}>{no}</span>
    );

    // Part 6 passage with numbered blanks (§NNN§) -- e-mail はヘッダー分離
    const Part6Passage = ({ set }: { set: Part6Set }) => {
        const isEmail = docCategory(set.passageType) === 'email';
        const { fields, rest } = isEmail ? splitEmailHeader(set.passage) : { fields: [] as [string, string][], rest: set.passage };
        const parts = rest.split(/§(\d+)§/);
        const bodyNode = (
            <div style={{ fontSize: docFontSize, lineHeight: 2.05, color: '#292524', whiteSpace: 'pre-line', fontFamily: DOC_FONT, maxWidth: PROSE_WIDTH }}>
                {parts.map((p, i) => i % 2 === 1
                    ? <span key={i} style={{ display: 'inline-block', minWidth: '54px', textAlign: 'center', borderBottom: `2px solid ${GOLD}`, color: DEEPGOLD, fontWeight: 800, fontFamily: 'sans-serif', fontSize: '12px', margin: '0 2px' }}>({p})</span>
                    : <span key={i}>{p}</span>)}
            </div>
        );
        if (fields.length > 0) {
            return (
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', overflow: 'hidden', marginBottom: '10px' }}>
                    <div style={{ background: '#F6F4EC', borderBottom: `1px solid ${LINE}`, padding: '10px 14px' }}>
                        {fields.map(([k, v], i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', padding: '2px 0', alignItems: 'baseline' }}>
                                <span style={{ flexShrink: 0, width: '58px', fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{k}:</span>
                                <span style={{ fontSize: '12.5px', fontWeight: k.toLowerCase() === 'subject' ? 700 : 500, color: INK, wordBreak: 'break-word' }}>{v}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '13px 14px' }}>{bodyNode}</div>
                </div>
            );
        }
        return (
            <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFBF7', padding: '14px 16px', marginBottom: '10px' }}>
                {bodyNode}
            </div>
        );
    };

    const Listen34 = ({ set, kind }: { set: Part34Set; kind: 'conversation' | 'talk' }) => (
        <div style={{ marginTop: '18px', borderTop: `1px dashed ${LINE}`, paddingTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}44`, borderRadius: '6px', padding: '3px 9px' }}>
                    Questions {set.range}
                </span>
                <span style={{ fontSize: '11px', color: SUB }}>{kind === 'conversation' ? '会話' : (set.talkType || 'トーク')} ・ {set.context}</span>
                <PlayBtn text={set.transcript} label="読み上げ" />
                {set.graphic && (
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', background: GREEN, borderRadius: '5px', padding: '2px 7px', letterSpacing: '0.5px' }}>GRAPHIC</span>
                )}
            </div>
            {/* 図表は設問の前。音声は図の値を言わないので、図を見ないと解けない */}
            {set.graphic && (
                <div style={{ marginBottom: '12px' }}>
                    <ToeicGraphic graphic={set.graphic} />
                </div>
            )}
            <JpBody firstNo={set.questions[0]?.no} />
            <SetBridge setKey={`${kind === 'conversation' ? 'p3' : 'p4'}-${set.range}`} />
            {set.questions.map(q => (
                <div key={q.no} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <QNo no={q.no} />
                        <span style={{ fontSize: isMobile ? '14px' : '13.5px', fontWeight: 600, color: INK, lineHeight: 1.5, paddingTop: '1px' }}>{q.question}</span>
                    </div>
                    <ChoiceList no={q.no} choices={q.choices} answer={q.answer} />
                    <JpQ no={q.no} />
                    {!explainByNo.has(q.no) && <Explain note={q.note} />}
                </div>
            ))}
            {reveal && <SetExplainBlock range={set.range}
                meta={set.questions.map(q => ({ no: q.no, question: q.question, choices: q.choices, answer: q.answer }))} />}
        </div>
    );

    const Part7Block = ({ set }: { set: Part7Set }) => (
        <div style={{ marginTop: '26px', borderTop: `2px solid ${LINE}`, paddingTop: '18px' }}>
            <div style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 800, color: '#fff', background: DEEPGOLD, borderRadius: '6px', padding: '4px 11px', marginBottom: '12px' }}>
                {set.intro}
            </div>
            {set.passages.map((p, i) => (
                <DocView key={i} p={p} fontSize={docFontSize}
                    kindLabel={set.passages.length > 1 ? `DOCUMENT ${i + 1} / ${set.passages.length}` : undefined} />
            ))}
            <JpBody firstNo={set.questions[0]?.no} />
            <SetBridge setKey={`p7-${set.range}`} />
            {/* 本文と設問の境目。ここが無いと文書の続きに見えて読み飛ばす */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', margin: '18px 0 12px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '2px', flexShrink: 0 }}>設問 {set.range}</span>
                <span style={{ flex: 1, height: '1px', background: LINE }} />
            </div>
            {set.questions.map(q => (
                <div key={q.no} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <QNo no={q.no} />
                        <span style={{ fontSize: isMobile ? '14px' : '13.5px', fontWeight: 600, color: INK, lineHeight: 1.5, paddingTop: '1px' }}>{q.question}</span>
                    </div>
                    <ChoiceList no={q.no} choices={q.choices} answer={q.answer} />
                    <JpQ no={q.no} />
                    {!explainByNo.has(q.no) && <Explain note={q.note} />}
                </div>
            ))}
            {reveal && <SetExplainBlock range={set.range}
                meta={set.questions.map(q => ({ no: q.no, question: q.question, choices: q.choices, answer: q.answer }))} />}
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#EDEBE3', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <style>{`
                @page { size: A4 portrait; margin: 12mm 12mm; }
                @media print {
                    html, body { background: #fff !important; }
                    .no-print { display: none !important; }
                    .booklet { box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; padding: 0 !important; }
                    .part-block { break-inside: auto; }
                    .qcard { break-inside: avoid; }
                    .section-break { break-before: page; }
                }
                .choice-row:hover { border-color: ${GOLD} !important; }
                .hscroll { scrollbar-width: none; -ms-overflow-style: none; }
                .hscroll::-webkit-scrollbar { display: none; }
            `}</style>

            {/* ===== TOP TOOLBAR ===== */}
            <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(28,25,23,0.97)', color: '#fff', padding: isMobile ? '8px 10px' : '12px 20px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '14px' : '16px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>SCORE<span style={{ color: '#fff' }}>PASS</span></span>
                        <span className="hscroll" style={{ display: 'flex', gap: '2px', overflowX: 'auto', maxWidth: isMobile ? '120px' : 'none' }}>
                            {TOEIC_TESTS.map(x => {
                                const active = t.id === x.id;
                                return (
                                    <a key={x.n} href={x.href} title={x.reading ? 'Reading' : 'Full'} style={{ flexShrink: 0, fontSize: '10px', fontWeight: 800, textDecoration: 'none', borderRadius: '5px', padding: '3px 7px', color: active ? INK : '#C9C0AC', background: active ? GOLD : 'transparent', border: `1px solid ${active ? GOLD : '#4b4641'}` }}>{x.n}</a>
                                );
                            })}
                        </span>
                        {!isMobile && <span style={{ fontSize: '10px', color: '#C9C0AC' }}>{hasListening ? 'TOEIC L&R 形式 フル模試' : 'TOEIC L&R 形式 リーディング模試'}</span>}
                    </div>
                    {/* minWidth:0 が無いと、flex アイテムが中身の幅より縮めず overflowX が効かない
                        (ボタンが1つ増えるたびにページ全体が横に伸びる) */}
                    <div className="hscroll" style={{ display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'nowrap', minWidth: 0 }}>
                        {!graded
                            ? <button onClick={() => { setGraded(true); stopSpeak(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={btnStyle(GOLD, INK, false, isMobile)}>採点する</button>
                            : <button onClick={() => setGraded(false)} style={btnStyle('#57534E', '#fff', false, isMobile)}>採点を隠す</button>}
                        {hasExplain && <button onClick={() => setShowJp(v => !v)} title={hasBridge ? '本文の全訳と「つながらない語」を出す' : '本文の全訳を出す'} style={btnStyle(showJp ? GREEN : '#3F3B38', '#fff', false, isMobile)}>{showJp ? '全訳ON' : '全訳'}</button>}
                        <button onClick={() => setReveal(v => !v)} style={btnStyle(reveal ? GREEN : '#3F3B38', '#fff', false, isMobile)}>{reveal ? '解説ON' : '解答解説'}</button>
                        {hasListening && <button onClick={() => setShowScripts(v => !v)} style={btnStyle('#3F3B38', '#fff', false, isMobile)}>スクリプト</button>}
                        <button onClick={() => window.open(`/english/toeic/print${t.id.endsWith('01') ? '' : `?test=${t.id.replace(/\D/g, '')}`}`, '_blank')} style={btnStyle('#fff', INK, false, isMobile)}>印刷 / PDF</button>
                        <button onClick={reset} style={btnStyle('transparent', '#C9C0AC', true, isMobile)}>リセット</button>
                    </div>
                </div>
                {/* part jump nav */}
                <div className="hscroll" style={{ maxWidth: '900px', margin: '8px auto 0', display: 'flex', gap: '6px', alignItems: 'center', overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: '2px' }}>
                    {hasListening && (
                        <>
                            <a href="#p1" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', fontSize: '12px', fontWeight: 900, color: INK, background: '#fff', textDecoration: 'none', borderRadius: '7px', padding: isMobile ? '7px 12px' : '5px 12px', letterSpacing: '0.5px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                                LISTENING <span style={{ fontSize: '10px', fontWeight: 700, color: SUB }}>1-100</span>
                            </a>
                            {['p2', 'p3', 'p4'].map(id => (
                                <a key={id} href={`#${id}`} style={{ fontSize: '11px', fontWeight: 700, color: '#C9C0AC', textDecoration: 'none', border: '1px solid #4b4641', borderRadius: '6px', padding: isMobile ? '6px 10px' : '3px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>{id.toUpperCase()}</a>
                            ))}
                        </>
                    )}
                    <a href="#p5" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', fontSize: '12px', fontWeight: 900, color: INK, background: GOLD, textDecoration: 'none', borderRadius: '7px', padding: isMobile ? '7px 12px' : '5px 12px', letterSpacing: '0.5px', boxShadow: '0 0 0 1px rgba(255,255,255,0.2)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        READING <span style={{ fontSize: '10px', fontWeight: 800, color: DEEPGOLD }}>101-200</span>
                    </a>
                    {['p6', 'p7'].map(id => (
                        <a key={id} href={`#${id}`} style={{ fontSize: '11px', fontWeight: 700, color: '#C9C0AC', textDecoration: 'none', border: '1px solid #4b4641', borderRadius: '6px', padding: isMobile ? '6px 10px' : '3px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}>{id.toUpperCase()}</a>
                    ))}
                    <a href="#scripts" style={{ fontSize: '11px', fontWeight: 700, color: '#C9C0AC', textDecoration: 'none', border: '1px solid #4b4641', borderRadius: '6px', padding: isMobile ? '6px 10px' : '3px 9px', whiteSpace: 'nowrap', flexShrink: 0 }}>解答</a>
                    {graded && (
                        <a href="#weak" style={{ fontSize: '11px', fontWeight: 800, color: INK, background: GREEN, textDecoration: 'none', border: `1px solid ${GREEN}`, borderRadius: '6px', padding: isMobile ? '6px 10px' : '3px 9px', whiteSpace: 'nowrap', flexShrink: 0 }}>弱点</a>
                    )}
                    <button onClick={cycleReadSize} title="Part 6/7 の本文の文字サイズ"
                        style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#C9C0AC', background: 'transparent', border: '1px solid #4b4641', borderRadius: '6px', padding: isMobile ? '6px 10px' : '3px 9px', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer' }}>
                        本文 {READ_SIZE_LABEL[readSize]}
                    </button>
                </div>
            </div>

            {/* ===== SCORE BAR (after grading) ===== */}
            {graded && (() => {
                const cards = hasListening
                    ? [
                        { label: 'Listening', v: score.l, max: 100 },
                        { label: 'Reading', v: score.r, max: 100 },
                        { label: '合計', v: score.total, max: 200 },
                    ]
                    : [{ label: 'Reading', v: score.r, max: 100 }];
                const denom = hasListening ? 200 : 100;
                return (
                    <div className="no-print" style={{ background: '#fff', borderBottom: `1px solid ${LINE}` }}>
                        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '14px 16px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {cards.map(s => (
                                <div key={s.label} style={{ flex: 1, minWidth: '96px', textAlign: 'center', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 6px' }}>
                                    <div style={{ fontSize: '22px', fontWeight: 900, color: INK }}>{s.v}<span style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}> / {s.max}</span></div>
                                    <div style={{ fontSize: '10px', color: SUB, letterSpacing: '1px' }}>{s.label} 正答</div>
                                </div>
                            ))}
                            <div style={{ fontSize: '11px', color: SUB, flexBasis: '100%', textAlign: 'center' }}>
                                正答率 {Math.round((score.total / denom) * 100)}%。緑=正解 / 赤=あなたの誤答。「解答解説」で各問の解説が出ます。
                            </div>
                            <a href="#weak" style={{ flexBasis: '100%', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: INK, background: GOLD, textDecoration: 'none', borderRadius: '8px', padding: '10px 14px' }}>
                                弱点レポートを見る -- 落とした型と単語
                            </a>
                            <a href="/english/toeic/doctor" style={{ flexBasis: '100%', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: '#fff', background: DEEPGREEN, textDecoration: 'none', borderRadius: '8px', padding: '10px 14px' }}>
                                診断書を見る -- 時間か、知識か (SCOREPASS ドクター)
                            </a>
                        </div>
                    </div>
                );
            })()}

            {/* ===== BOOKLET ===== */}
            <div className="booklet" style={{ maxWidth: '900px', margin: isMobile ? '10px auto' : '18px auto', background: PAPER, boxShadow: '0 8px 40px rgba(0,0,0,0.12)', borderRadius: '4px', padding: isMobile ? '20px 13px 60px' : '40px 48px 70px' }}>
                {/* cover */}
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${INK}`, paddingBottom: '18px' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>
                        <span style={{ color: GOLD }}>SCORE</span>PASS
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: SUB, marginTop: '4px' }}>
                        {hasListening
                            ? <>TOEIC&reg; L&amp;R 形式 フル模試 &mdash; 200問 (Listening 100 / Reading 100)</>
                            : <>TOEIC&reg; L&amp;R 形式 リーディング模試 &mdash; 100問 (Part 5&ndash;7)</>}
                    </div>
                    <div style={{ fontSize: '11px', color: SUB, marginTop: '8px' }}>
                        {t.title.replace(/.*(\d\d)$/, 'Test $1')} ・ {hasListening ? '制限時間の目安: Listening 約45分 / Reading 75分' : '制限時間の目安: 75分'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginTop: '14px', fontSize: '11px', color: SUB, flexWrap: 'wrap' }}>
                        <span>氏名 __________________</span>
                        <span>日付 ____________</span>
                        <span>点数 ______ / {hasListening ? 200 : 100}</span>
                    </div>
                </div>

                {/* ===== LISTENING ===== */}
                {hasListening && (
                <div className="part-block">
                    <div style={{ marginTop: '26px', background: INK, color: '#fff', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '2px' }}>LISTENING TEST</span>
                        <span style={{ fontSize: '11px', color: '#C9C0AC' }}>No. 1 - 100</span>
                    </div>

                    {/* PART 1 */}
                    <PartHeader id="p1" tag="PART 1" title="写真描写問題" jp="Photographs ・ 6問" dir="For each question, look at the picture and choose the statement (A)-(D) that best describes it. (In the real test the statements are heard, not printed.)" />
                    {t.part1.map(q => (
                        <div key={q.no} className="qcard" style={{ marginTop: '16px', display: isMobile ? 'block' : 'flex', gap: '16px' }}>
                            <div style={{ flexShrink: 0, width: isMobile ? '100%' : '240px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <QNo no={q.no} /><PlayBtn text={q.transcript} label="4文を聞く" />
                                </div>
                                <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', overflow: 'hidden', background: '#fff', aspectRatio: '4/3' }}
                                    dangerouslySetInnerHTML={{ __html: q.svg || '' }} />
                            </div>
                            <div style={{ flex: 1, marginTop: isMobile ? '10px' : 0 }}>
                                <ChoiceList no={q.no} choices={q.statements} answer={q.answer} />
                                <JpQ no={q.no} />
                                <SetBridge no={q.no} />
                                {reveal && explainByNo.has(q.no) ? (
                                    <div style={{ marginTop: '8px' }}>
                                        <QView q={explainByNo.get(q.no)!.q} choices={q.statements} answer={q.answer} isMobile={isMobile} />
                                    </div>
                                ) : reveal ? (
                                    <div style={{ marginTop: '6px', fontSize: isMobile ? '12px' : '11.5px', color: SUB, lineHeight: 1.7, background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 10px' }}><b style={{ color: INK }}>写真:</b> {q.sceneDescription}<br />{q.note}</div>
                                ) : null}
                            </div>
                        </div>
                    ))}

                    {/* PART 2 */}
                    <PartHeader id="p2" tag="PART 2" title="応答問題" jp="Question-Response ・ 25問" dir="Choose the best response (A)-(C) to each question or statement. (In the real test these are heard, not printed.)" />
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px 24px', marginTop: '12px' }}>
                        {t.part2.map(q => (
                            <div key={q.no} className="qcard" style={{ paddingBottom: '10px', borderBottom: `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <QNo no={q.no} />
                                    <span style={{ fontSize: isMobile ? '13.5px' : '13px', fontWeight: 600, color: INK, lineHeight: 1.4, flex: 1 }}>{q.prompt}</span>
                                    <PlayBtn text={`${q.prompt}. (A) ${q.responses[0]?.text} (B) ${q.responses[1]?.text} (C) ${q.responses[2]?.text}`} label="" />
                                </div>
                                <ChoiceList no={q.no} choices={q.responses as Choice[]} answer={q.answer} />
                                <JpQ no={q.no} />
                                <SetBridge no={q.no} />
                                {reveal && explainByNo.has(q.no) ? (
                                    <div style={{ marginTop: '8px' }}>
                                        <QView q={explainByNo.get(q.no)!.q} choices={q.responses as Choice[]} answer={q.answer} isMobile={isMobile} />
                                    </div>
                                ) : (!explainByNo.has(q.no) && <Explain note={q.note} />)}
                            </div>
                        ))}
                    </div>

                    {/* PART 3 */}
                    <PartHeader id="p3" tag="PART 3" title="会話問題" jp="Conversations ・ 39問 (13セット)" dir="Choose the best answer to each question based on the conversation." />
                    {t.part3.map(s => <div key={s.no} className="qcard"><Listen34 set={s} kind="conversation" /></div>)}

                    {/* PART 4 */}
                    <PartHeader id="p4" tag="PART 4" title="説明文問題" jp="Talks ・ 30問 (10セット)" dir="Choose the best answer to each question based on the talk." />
                    {t.part4.map(s => <div key={s.no} className="qcard"><Listen34 set={s} kind="talk" /></div>)}
                </div>
                )}

                {/* ===== READING ===== */}
                <div className={hasListening ? 'part-block section-break' : 'part-block'}>
                    <div style={{ marginTop: '32px', background: DEEPGOLD, color: '#fff', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '2px' }}>READING TEST</span>
                        <span style={{ fontSize: '11px', color: '#FBE7B8' }}>No. 101 - 200</span>
                    </div>

                    {/* PART 5 */}
                    <PartHeader id="p5" tag="PART 5" title="短文穴埋め問題" jp="Incomplete Sentences ・ 30問" dir="Choose the word or phrase (A)-(D) that best completes the sentence." />
                    {t.part5.map(q => (
                        <div key={q.no} className="qcard" style={{ marginTop: '14px' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <QNo no={q.no} />
                                <span style={{ fontSize: isMobile ? '14px' : '13.5px', color: INK, lineHeight: 1.65, paddingTop: '1px' }}>{q.sentence}</span>
                            </div>
                            <div style={{ marginLeft: isMobile ? 0 : '38px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '6px' : '4px 14px', marginTop: '6px' }}>
                                    {q.choices.map(c => choiceInlineFactory(q.no, q.answer, showMark, answers, select, isMobile)(c))}
                                </div>
                                <GuessChip no={q.no} />
                                <JpQ no={q.no} />
                                <SetBridge no={q.no} />
                                {reveal && explainByNo.has(q.no) ? (
                                    <div style={{ marginTop: '8px' }}>
                                        <QView q={explainByNo.get(q.no)!.q} choices={q.choices} answer={q.answer} isMobile={isMobile} />
                                    </div>
                                ) : reveal ? (
                                    <div style={{ marginTop: '6px', fontSize: isMobile ? '12px' : '11.5px', color: SUB, lineHeight: 1.75, background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '8px 11px' }}><b style={{ color: DEEPGOLD }}>[{q.tag}]</b> {q.note}</div>
                                ) : null}
                            </div>
                        </div>
                    ))}

                    {/* PART 6 */}
                    <PartHeader id="p6" tag="PART 6" title="長文穴埋め問題" jp="Text Completion ・ 16問 (4セット)" dir="Choose the word, phrase, or sentence (A)-(D) that best completes each text." />
                    {t.part6.map(set => (
                        <div key={set.no} className="qcard" style={{ marginTop: '26px', borderTop: `2px solid ${LINE}`, paddingTop: '18px' }}>
                            <div style={{ display: 'inline-block', fontSize: '11.5px', fontWeight: 800, color: '#fff', background: DEEPGOLD, borderRadius: '6px', padding: '4px 11px', marginBottom: '12px' }}>
                                {set.intro}
                            </div>
                            <Part6Passage set={set} />
                            <JpBody firstNo={set.questions[0]?.no} />
                            <SetBridge setKey={`p6-${set.range}`} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', margin: '18px 0 12px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '2px', flexShrink: 0 }}>設問 {set.range}</span>
                                <span style={{ flex: 1, height: '1px', background: LINE }} />
                            </div>
                            {set.questions.map(q => (
                                <div key={q.no} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <QNo no={q.no} />
                                        {q.type === 'sentence' && <span style={{ fontSize: '10px', color: SUB, fontStyle: 'italic' }}>(文選択)</span>}
                                    </div>
                                    <ChoiceList no={q.no} choices={q.choices} answer={q.answer} />
                                    <JpQ no={q.no} />
                                    {!explainByNo.has(q.no) && <Explain note={q.note} />}
                                </div>
                            ))}
                            {reveal && <SetExplainBlock range={set.range}
                                meta={set.questions.map(q => ({ no: q.no, choices: q.choices, answer: q.answer }))} />}
                        </div>
                    ))}

                    {/* PART 7 */}
                    <PartHeader id="p7" tag="PART 7" title="読解問題" jp="Reading ・ 54問 (1つの文書 29 / 複数の文書 25)" dir="Read the texts and choose the best answer (A)-(D) to each question." />
                    <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 800, color: SUB, letterSpacing: '1px' }}>SINGLE PASSAGES ・ 147-175</div>
                    {t.part7single.map(s => <div key={`s${s.no}`} className="qcard"><Part7Block set={s} /></div>)}
                    <div style={{ marginTop: '22px', fontSize: '12px', fontWeight: 800, color: SUB, letterSpacing: '1px' }}>MULTIPLE PASSAGES ・ 176-200</div>
                    {t.part7multiple.map(s => <div key={`m${s.no}`} className="qcard"><Part7Block set={s} /></div>)}
                </div>

                {/* ===== 弱点レポート (採点後) ===== */}
                {graded && (
                    <ToeicWeakness test={t} explain={explain} glossary={glossary} answers={answers} isMobile={isMobile} anchorTop={anchorTop} />
                )}

                {/* ===== ANSWER KEY + SCRIPTS ===== */}
                <div id="scripts" className="section-break" style={{ marginTop: '36px', scrollMarginTop: anchorTop }}>
                    <div style={{ background: INK, color: '#fff', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', fontWeight: 900, letterSpacing: '1px' }}>ANSWER KEY ・ 解答一覧</div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(10, 1fr)', gap: '4px', marginTop: '12px' }}>
                        {t.answerKey.map(k => {
                            const ok = answers[k.no] === k.answer;
                            const done = answers[k.no] != null;
                            return (
                                <div key={k.no} style={{ border: `1px solid ${LINE}`, borderRadius: '6px', padding: '4px 2px', textAlign: 'center', background: graded && done ? (ok ? '#ECFDF5' : '#FEF2F2') : '#fff' }}>
                                    <div style={{ fontSize: '9px', color: SUB }}>{k.no}</div>
                                    <div style={{ fontSize: '13px', fontWeight: 800, color: graded && done ? (ok ? GREEN : RED) : INK }}>{k.answer}</div>
                                </div>
                            );
                        })}
                    </div>

                    {showScripts && (
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '10px' }}>LISTENING SCRIPTS ・ リスニング台本</div>
                            <ScriptBlock title="Part 1 ・ 写真描写" items={t.part1.map(q => ({ head: `No. ${q.no}`, body: q.transcript }))} />
                            <ScriptBlock title="Part 2 ・ 応答" items={t.part2.map(q => ({ head: `No. ${q.no}`, body: `${q.prompt}\n(A) ${q.responses[0]?.text}\n(B) ${q.responses[1]?.text}\n(C) ${q.responses[2]?.text}` }))} />
                            <ScriptBlock title="Part 3 ・ 会話" items={t.part3.map(s => ({ head: `Q ${s.range} (${s.context})`, body: s.transcript }))} />
                            <ScriptBlock title="Part 4 ・ 説明文" items={t.part4.map(s => ({ head: `Q ${s.range} (${s.talkType})`, body: s.transcript }))} />
                        </div>
                    )}
                </div>

                {/* ===== DISCLAIMER ===== */}
                <div style={{ marginTop: '30px', background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '6px' }}>ご利用にあたって</div>
                    <p style={{ margin: 0, fontSize: '10.5px', lineHeight: 1.85, color: SUB }}>
                        本テストは英語学習者向けの非公式・自主制作のオリジナル模試です。TOEIC&reg; の実施団体 Educational Testing Service (ETS) および国際ビジネスコミュニケーション協会 (IIBC) とは一切関係がなく、これらの団体が監修・公認・推奨するものではありません。掲載している問題文・本文・リスニング台本・図はすべて当サービスが独自に作成したオリジナルであり、実際の試験問題(いわゆる過去問)を転載・複製したものではありません。TOEIC は ETS の登録商標です。スコアはあくまで自己採点の正答数であり、公式スコアの換算・保証をするものではありません。
                    </p>
                </div>
            </div>
        </div>
    );
}

function btnStyle(bg: string, fg: string, ghost = false, mobile = false): React.CSSProperties {
    return {
        padding: mobile ? '8px 13px' : '7px 14px', borderRadius: '8px', border: ghost ? '1px solid #5b554f' : 'none',
        background: bg, color: fg, fontSize: '12px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
    };
}

// inline choice used by Part 5 (2-col compact / mobile 1-col)
function choiceInlineFactory(
    no: number, answer: string, showMark: boolean,
    answers: Record<number, string>, select: (no: number, label: string) => void,
    isMobile: boolean,
) {
    return (c: Choice) => {
        const chosen = answers[no] === c.label;
        const isCorrect = answer === c.label;
        let bg = '#fff', bd = LINE, col = INK;
        if (chosen) { bg = '#FEF9E7'; bd = GOLD; }
        if (showMark && isCorrect) { bg = '#ECFDF5'; bd = GREEN; col = '#065F46'; }
        if (showMark && chosen && !isCorrect) { bg = '#FEF2F2'; bd = RED; col = '#991B1B'; }
        return (
            <button key={c.label} onClick={() => select(no, c.label)} className="choice-row"
                style={{ display: 'flex', alignItems: 'center', gap: '7px', textAlign: 'left', padding: isMobile ? '9px 11px' : '5px 9px', minHeight: isMobile ? '42px' : undefined, borderRadius: '8px', border: `1px solid ${bd}`, background: bg, cursor: 'pointer' }}>
                <span style={{ flexShrink: 0, fontSize: '11px', fontWeight: 800, color: showMark && isCorrect ? GREEN : chosen ? DEEPGOLD : SUB }}>({c.label})</span>
                <span style={{ fontSize: isMobile ? '13.5px' : '12.5px', color: col }}>{c.text}</span>
            </button>
        );
    };
}

function ScriptBlock({ title, items }: { title: string; items: { head: string; body: string }[] }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: DEEPGOLD, marginBottom: '6px' }}>{title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((it, i) => (
                    <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '8px', padding: '9px 12px', background: '#fff' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, marginBottom: '3px' }}>{it.head}</div>
                        <div style={{ fontSize: '12px', lineHeight: 1.7, color: '#292524', whiteSpace: 'pre-line' }}>{it.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
