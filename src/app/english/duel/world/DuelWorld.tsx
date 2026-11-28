'use client';

/**
 * カードの中庭 — 声を追って、カードを捕まえる場所。カード対戦(/english/duel)のデッキを、耳で集める。
 *
 * 本人(2026-11-27)「すごくいいけど、なんのための場所か、そこでなにがもっと楽しめるのかが全くわからない」。
 * 第1版は、歩いて好きなカードを取るだけだった(対戦のデッキは自動で組まれるので、取る理由が無かった)。
 * この版の遊び:
 * - 水盤の両岸に、声のあるカードが40枚。そのうち1枚が、自分の英文を呼び続ける。英文は画面に出さない。
 * - 声はそのカードの位置から鳴る。遠いと小さく、こもる。近づくと、はっきりする(sound.ts)。
 * - 声をたよりに歩き、「これだ」と思うカードの前で捕まえる。合っていれば自分のもの。ちがえば首を振る。
 * - 目の前のカードの声は R で聞ける(聞き比べ)。どうしても分からなければ H で光の柱。
 * - 20枚捕まえたら奥の魔法陣へ。その20枚がデッキになって、対戦が始まる。
 * - 記録: 耳だけで捕まえた枚数と時間。いちばん良い記録を入口に出す。
 *
 * 入口の説明と上の札は、対戦の最初の画面と同じ日本語/英語の切り替え(duel:lang:v1)。カードの英文と盤上の短い札は英語のまま。
 * 場面は engine.ts(three.js)、質感は textures.ts、音は sound.ts。ここは読み込みと進行と操作盤。
 * 対戦画面との受け渡し: 捕まえた20枚の中身を duel:world:cards:v1 に置いて /english/duel?from=world へ。
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ABILITY_TEXT, DECK_SIZE, ELEMENT_NAMES, RANK_LABELS, autoDeck, toSpec, wordSpec, type CardSpec, type PoolCard, type WordPack } from '@/lib/duel';
import { WORLD_SLOTS, createWorld, type Focus, type WorldHandle } from './engine';
import { createSound, type WorldSound } from './sound';
import { PAL } from './textures';

const DECK_KEY = 'duel:deck:v3';
const WORLD_CARDS_KEY = 'duel:world:cards:v1';
const WORLD_FOUND_KEY = 'duel:world:found:v1';   // 単語対戦の導入で捕まえた言葉(対戦の側で、最初のデッキに先に入れる)
/** 集める枚数。ふだんはデッキ1つ分。単語対戦の導入(pack と goal を渡したとき)は少なくする。描く前に DuelWorld が書き込む */
let GOAL = DECK_SIZE;
const BEST_KEY = 'duel:world:best:v1';
const LANG_KEY = 'duel:lang:v1';   // 対戦の最初の画面と同じ切り替え
const INK = '#1C1917';
const SUB = '#78716C';
const GOLD = '#B8941E';

const TEXT = {
    ja: {
        kicker: 'カード対戦 — 耳で集めるデッキ',
        lead: 'カードの1枚が、自分の英文を呼んでいる。',
        how: ['声は遠いと小さく、こもって聞こえる。近づくほど、はっきりする。', '声のするほうへ歩いて、しゃべっているカードを見つけて捕まえる。', '20枚捕まえたら、その20枚がデッキ。奥の魔法陣で対戦が始まる。'],
        tip: 'イヤホンだと、声が左右どちらから来るか分かる。',
        enter: '入る', skipDeck: '歩かずに対戦へ', best: 'これまでの最高', byEar: '耳だけで', none: 'まだ記録なし',
        keysPc: ['歩く', '走る', '見回す', '捕まえる', '前のカードの声', '光の手がかり'],
        keysTouch: '左の親指で歩く ・ 画面をなぞって見回す ・ 右のボタンで捕まえる',
        calling: 'カードが呼んでいる — 声のするほうへ',
        callingMute: '音を切っている — 波紋の出ているカードを探す',
        done: '20枚そろった — 奥の魔法陣へ',
        caught: '捕まえた', ear: '耳だけ', time: '時間',
        wrong: 'それじゃない。もう一度よく聞いて。', wrongHint: 'それじゃない。H で光の手がかり。',
        got: '捕まえた。', gotHint: '捕まえた(手がかりを使った)。', already: 'それはもう自分のカード。',
        hintOn: '光の柱が立った。', complete: '20枚そろった。奥の魔法陣へ。', need: (n: number) => `あと ${n} 枚。声を追って。`,
        thisOne: 'これだ', hearIt: 'このカードの声', hint: '手がかり', mine: '自分のカード',
        circle: '魔法陣', waiting: 'ライバルが待っている。', carry: (n: number) => `いま ${n} 枚。${GOAL} 枚で挑める。`, challenge: '挑む', goBack: '戻って声を追う。',
        result: (e: number, h: number, t: string) => `耳だけで ${e} 枚 ・ 手がかりで ${h} 枚 ・ ${t}`, newBest: '最高記録',
        closed: '声のあるカードが足りない。', no3d: 'この端末では3Dを描けなかった。', back: 'カード対戦へ戻る', loading: '石を並べている',
        skip: '残りを自動で', sound: ['音あり', '音なし'], exit: '出る',
        lookHint: '画面を押すと見回せる ・ 矢印キーでも向きを変えられる', skipIntro: '押すと飛ばす',
    },
    en: {
        kicker: 'CARD DUEL — A DECK YOU COLLECT BY EAR',
        lead: 'One of your cards is calling out its line.',
        how: ['Far away the voice is faint and muffled. The closer you get, the clearer it is.', 'Walk toward the voice, find the card that is speaking, and catch it.', 'Catch twenty. Those twenty are your deck, and the duel starts in the circle.'],
        tip: 'With earphones you can tell which side the voice comes from.',
        enter: 'ENTER', skipDeck: 'Skip the walk and duel', best: 'Your best', byEar: 'by ear', none: 'No record yet',
        keysPc: ['walk', 'run', 'look', 'catch', "this card's voice", 'a light to follow'],
        keysTouch: 'Left thumb walks · drag to look · the right button catches',
        calling: 'A CARD IS CALLING — FOLLOW THE VOICE',
        callingMute: 'SOUND IS OFF — LOOK FOR THE RIPPLES',
        done: 'TWENTY CAUGHT — WALK INTO THE CIRCLE',
        caught: 'CAUGHT', ear: 'BY EAR', time: 'TIME',
        wrong: 'NOT THAT ONE. LISTEN AGAIN.', wrongHint: 'NOT THAT ONE. PRESS H FOR A LIGHT.',
        got: 'CAUGHT.', gotHint: 'CAUGHT, WITH A LIGHT.', already: 'THAT ONE IS ALREADY YOURS.',
        hintOn: 'A LIGHT IS UP.', complete: 'TWENTY CAUGHT. WALK INTO THE CIRCLE.', need: (n: number) => `${n} TO GO. FOLLOW THE VOICE.`,
        thisOne: 'THIS IS THE ONE', hearIt: "THIS CARD'S VOICE", hint: 'LIGHT', mine: 'YOURS',
        circle: 'THE CIRCLE', waiting: 'The rival is waiting.', carry: (n: number) => `You carry ${n} of ${GOAL} cards.`, challenge: 'CHALLENGE', goBack: 'Go back and follow the voice.',
        result: (e: number, h: number, t: string) => `${e} by ear · ${h} with a light · ${t}`, newBest: 'NEW BEST',
        closed: 'Not enough cards with a voice.', no3d: 'This device could not draw the 3D scene.', back: 'BACK TO THE DUEL', loading: 'SETTING THE STONES',
        skip: 'AUTO-FILL', sound: ['SOUND ON', 'SOUND OFF'], exit: 'EXIT',
        lookHint: 'Click the view to look around · arrow keys also turn', skipIntro: 'CLICK TO SKIP',
    },
};

// 対戦中の表示は日本語になった(2026-11-27、向こうの窓)。カードの札の言葉は DuelGame.tsx の ABILITY_NAME_JA / ABILITY_JA / ELEMENT_JA と同じにする。
// 向こうを直したら、ここも同じ言葉に直す(向こうは export していないので写してある)。
const ABILITY_NAME_JA: Record<string, string> = { HEAL: '回復', STRIKE: '一撃', WARD: '守護', INSIGHT: 'ひらめき', RUSH: '速攻', NONE: '' };
const ABILITY_JA: Record<string, string> = {
    HEAL: '出したとき、自分のリーダーの体力を 2 回復する。',
    STRIKE: '出したとき、相手のいちばん攻撃の高いユニットに 2 ダメージ。',
    WARD: '相手は、先にこのユニットを攻撃しなければならない。',
    INSIGHT: '出したとき、カードを1枚引く。',
    RUSH: '出したターンに攻撃できる。',
};
const ELEMENT_JA: Record<string, string> = { flame: '炎', aqua: '水', wind: '風', earth: '土', thunder: '雷' };

const CSS = `
@keyframes world-chant { 0% { color: #A8A29E; text-shadow: none; } 45% { color: #B8941E; text-shadow: 0 0 14px rgba(246,200,95,0.9); } 100% { color: #1C1917; text-shadow: none; } }
@keyframes world-rise-c { 0% { transform: translate(-50%, 14px); opacity: 0; } 100% { transform: translate(-50%, 0); opacity: 1; } }
@keyframes world-rise { 0% { transform: translateY(14px); opacity: 0; } 100% { transform: none; opacity: 1; } }
@keyframes world-title { 0% { opacity: 0; letter-spacing: 0.9em; } 18% { opacity: 1; } 78% { opacity: 1; } 100% { opacity: 0; letter-spacing: 0.42em; } }
@keyframes world-toast { 0% { transform: translate(-50%, 10px); opacity: 0; } 12%,82% { transform: translate(-50%, 0); opacity: 1; } 100% { transform: translate(-50%, -8px); opacity: 0; } }
@keyframes world-white { 0%,45% { opacity: 0; } 100% { opacity: 1; } }
@keyframes world-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.55); } 50% { box-shadow: 0 0 0 10px rgba(212,175,55,0); } }
@keyframes world-wave { 0% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } 100% { transform: scaleY(0.25); } }
`;

function load<T>(key: string, fallback: T): T {
    try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
}
function save(key: string, value: unknown) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* 残せなくても歩ける */ }
}
const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

interface Entry { raw: PoolCard; spec: CardSpec; art?: string; voice?: string }
interface Stats { ear: number; hint: number; miss: number; auto: number }
interface Best { ear: number; sec: number }

const glass: React.CSSProperties = {
    background: 'rgba(255,253,246,0.86)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(212,175,55,0.65)', borderRadius: 16, boxShadow: '0 10px 30px rgba(60,40,10,0.18)', color: INK,
};
const key: React.CSSProperties = { display: 'inline-block', minWidth: 22, textAlign: 'center', padding: '2px 7px', borderRadius: 6, border: '1px solid #D6D3D1', background: '#fff', fontWeight: 900, fontSize: 11, color: INK, marginRight: 6 };

export default function DuelWorld({ pack, goal, exitHref }: { pack?: WordPack; goal?: number; exitHref?: string } = {}) {
    GOAL = goal || DECK_SIZE;
    const outHref = exitHref || '/english/duel';
    const [entries, setEntries] = useState<Entry[] | null>(null);
    const [failed, setFailed] = useState(false);
    const [deckIds, setDeckIds] = useState<string[]>([]);
    const [focus, setFocus] = useState<Focus>(null);
    const [stage, setStage] = useState<'gate' | 'intro' | 'walk' | 'leave'>('gate');
    const [soundOn, setSoundOn] = useState(true);
    const [locked, setLocked] = useState(false);
    const [touch, setTouch] = useState(false);
    const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
    const [stick, setStick] = useState<{ x: number; y: number } | null>(null);
    const [mounted, setMounted] = useState(false);
    const [lang, setLang] = useState<'ja' | 'en'>('ja');
    const [target, setTarget] = useState<string | null>(null);
    const [hinted, setHinted] = useState(false);
    const [stats, setStats] = useState<Stats>({ ear: 0, hint: 0, miss: 0, auto: 0 });
    const [sec, setSec] = useState(0);
    const [best, setBest] = useState<Best | null>(null);
    const [newBest, setNewBest] = useState(false);
    const [no3d, setNo3d] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const world = useRef<WorldHandle | null>(null);
    const sound = useRef<WorldSound | null>(null);
    const entriesRef = useRef<Entry[]>([]);
    const deckRef = useRef<string[]>([]);
    const focusRef = useRef<Focus>(null);
    const stageRef = useRef(stage);
    const targetRef = useRef<string | null>(null);
    const hintedRef = useRef(false);
    const missRef = useRef(0);
    const statsRef = useRef<Stats>({ ear: 0, hint: 0, miss: 0, auto: 0 });
    const soundOnRef = useRef(true);
    const startAt = useRef(0);
    const toastId = useRef(1);
    const langRef = useRef<'ja' | 'en'>('ja');

    stageRef.current = stage;
    langRef.current = lang;
    const t0 = TEXT[lang];
    // 単語対戦の導入: 枚数と行き先の言い方を差し替える
    const t = pack ? { ...t0,
        done: lang === 'ja' ? `${GOAL}つの言葉を取り戻した — 奥の魔法陣へ` : `${GOAL} WORDS WON BACK — WALK INTO THE CIRCLE`,
        complete: lang === 'ja' ? `${GOAL}つの言葉を取り戻した。奥の魔法陣へ。` : `${GOAL} WORDS WON BACK. WALK INTO THE CIRCLE.`,
        back: lang === 'ja' ? '単語対戦へ戻る' : 'BACK TO WORD DUEL',
        kicker: lang === 'ja' ? '沈黙の塔 — はじまりの中庭' : 'THE TOWER OF SILENCE — THE FIRST COURT',
        lead: lang === 'ja' ? '封じられた言葉の1つが、あなたを呼んでいる。' : 'One of the sealed words is calling you.',
        how: lang === 'ja' ? ['声は遠いと小さく、こもって聞こえる。近づくほど、はっきりする。', '声のするほうへ歩いて、しゃべっているカードを見つけて捕まえる。', `${GOAL}つ取り戻したら、奥の魔法陣へ。そこから、あなたの戦いが始まる。`] : ['Far away the voice is faint and muffled. The closer you get, the clearer it is.', 'Walk toward the voice, find the card that is speaking, and catch it.', `Win back ${GOAL} words, then walk into the circle. Your fight begins there.`],
        skipDeck: lang === 'ja' ? '歩かずに先へ進む' : 'Skip the walk',
    } : t0;

    const say = (text: string) => { const id = toastId.current++; setToast({ id, text }); setTimeout(() => setToast(x => x && x.id === id ? null : x), 2600); };
    const bump = (k: keyof Stats) => { statsRef.current = { ...statsRef.current, [k]: statsRef.current[k] + 1 }; setStats(statsRef.current); };

    // ── 読み込み: 絵と声の一覧、山 ──
    useEffect(() => {
        setMounted(true);
        setTouch(window.matchMedia('(pointer: coarse)').matches);
        setLang(load<'ja' | 'en'>(LANG_KEY, 'ja') === 'en' ? 'en' : 'ja');
        setBest(load<Best | null>(BEST_KEY, null));
        let gone = false;
        (async () => {
            let art: Record<string, string> = {};
            try {
                const m = await fetch('/duel/art/manifest.json', { cache: 'no-store' }).then(r => r.json()) as { keys: string[]; v: number };
                art = Object.fromEntries((m.keys || []).map(k => [k, `/duel/art/${k}.webp?v=${m.v}`]));
            } catch { /* 絵が無ければ模様で描く */ }
            let voice: Record<string, string> = {};
            try {
                const m = await fetch('/duel/voice/manifest.json', { cache: 'no-store' }).then(r => r.json()) as { ids: string[]; v: number };
                voice = Object.fromEntries((m.ids || []).map(k => [k, `/duel/voice/${k}.mp3?v=${m.v}`]));
            } catch { /* 下で「声が足りない」になる */ }
            try {
                // 単語対戦の導入では、同梱の単語パックを使う(通信しない)。ふだんは自分のカード
                const packSpec = new Map((pack?.cards || []).map((c, i) => [c.id, wordSpec(c, i)]));
                const raws = pack ? pack.cards.map(c => ({ id: c.id, english: c.line, category: packSpec.get(c.id)!.element, card_no: null, points: 0, mastery: 0 }) as PoolCard)
                    : ((await fetch('/api/phrases/duel-pool').then(r => r.json()))?.cards || []) as PoolCard[];
                if (gone) return;
                const all = raws.map(raw => { const spec = packSpec.get(raw.id) || toSpec(raw); return { raw, spec, voice: voice[spec.id], art: art[`card-${spec.id}`] || art[`${spec.element}-${spec.ability.toLowerCase()}`] || art[spec.element] }; });
                // 呼べるのは、演じた声のあるカードだけ。毎回ちがう40枚を、ばらばらの位置に立てる
                const voiced = all.filter(e => e.voice);
                if (voiced.length < GOAL) { setFailed(true); return; }
                const picked = voiced.map(e => ({ e, r: Math.random() })).sort((a, b) => a.r - b.r).slice(0, WORLD_SLOTS).map(x => x.e);
                entriesRef.current = picked;
                (window as unknown as { __worldArt?: Record<string, string> }).__worldArt = art;
                setEntries(picked);
            } catch { if (!gone) setFailed(true); }
        })();
        return () => { gone = true; };
    }, []);

    // 時計(呼び声が始まってから、20枚そろうまで)
    useEffect(() => {
        if (stage !== 'walk' || deckIds.length >= GOAL) return;
        const id = setInterval(() => { if (startAt.current) setSec((Date.now() - startAt.current) / 1000); }, 500);
        return () => clearInterval(id);
    }, [stage, deckIds.length]);

    const setDeck = useCallback((next: string[]) => {
        deckRef.current = next;
        setDeckIds(next);
        world.current?.setTaken(next);
    }, []);

    /** 次の1枚が呼びはじめる。残りが無いか、20枚そろっていたら止む */
    const nextCall = useCallback(() => {
        const list = entriesRef.current, have = deckRef.current;
        const rest = list.filter(e => !have.includes(e.spec.id));
        hintedRef.current = false; setHinted(false); missRef.current = 0;
        world.current?.setHint(null);
        if (have.length >= GOAL || !rest.length) {
            targetRef.current = null; setTarget(null);
            sound.current?.stopCall();
            world.current?.setCalling(null);
            return;
        }
        const e = rest[Math.floor(Math.random() * rest.length)];
        const idx = list.indexOf(e), at = world.current?.cardXZ(idx);
        targetRef.current = e.spec.id; setTarget(e.spec.id);
        world.current?.setCalling(idx, !soundOnRef.current);
        if (at && e.voice) sound.current?.call(e.voice, at.x, at.z);
    }, []);

    const finish = useCallback(() => {
        const s = statsRef.current, time = startAt.current ? (Date.now() - startAt.current) / 1000 : 0;
        setSec(time);
        sound.current?.full();
        say(TEXT[langRef.current].complete);
        if (s.auto > 0) return;   // 自動で埋めた回は記録にしない
        const old = load<Best | null>(BEST_KEY, null);
        if (!old || s.ear > old.ear || (s.ear === old.ear && time < old.sec)) {
            const b = { ear: s.ear, sec: Math.round(time) };
            save(BEST_KEY, b); setBest(b); setNewBest(true);
        }
    }, []);

    const challenge = useCallback(() => {
        const ids = deckRef.current;
        save(DECK_KEY, ids);
        if (pack) save(WORLD_FOUND_KEY, ids);
        else save(WORLD_CARDS_KEY, ids.map(id => entriesRef.current.find(e => e.spec.id === id)?.raw).filter(Boolean));
        setStage('leave');
        sound.current?.full();
        if (document.pointerLockElement) document.exitPointerLock();
        world.current?.playChallenge(() => { window.location.href = `${outHref}?from=world`; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const act = useCallback(() => {
        if (stageRef.current !== 'walk') return;
        const f = focusRef.current, tx = TEXT[langRef.current];
        if (!f) return;
        const deck = deckRef.current;
        if (f.kind === 'rival') {
            if (deck.length === GOAL) challenge();
            else { sound.current?.deny(); say(tx.need(GOAL - deck.length)); }
            return;
        }
        const e = entriesRef.current[f.index];
        if (!e) return;
        if (deck.includes(e.spec.id)) { say(tx.already); return; }
        if (e.spec.id !== targetRef.current) {
            missRef.current++;
            bump('miss');
            sound.current?.deny();
            world.current?.shake(f.index);
            say(missRef.current >= 2 && !hintedRef.current ? tx.wrongHint : tx.wrong);
            return;
        }
        // 当たり
        bump(hintedRef.current ? 'hint' : 'ear');
        say(hintedRef.current ? tx.gotHint : tx.got);
        const next = [...deck, e.spec.id];
        setDeck(next);
        world.current?.pulse(f.index);
        sound.current?.take();
        sound.current?.stopCall();
        world.current?.setCalling(null);
        world.current?.setHint(null);
        targetRef.current = null; setTarget(null);
        if (next.length >= GOAL) finish();
        else setTimeout(() => { if (stageRef.current === 'walk') nextCall(); }, 1100);
    }, [challenge, setDeck, nextCall, finish]);

    /** 目の前のカードの声を聞く(聞き比べ) */
    const hear = useCallback(() => {
        const f = focusRef.current;
        const e = f?.kind === 'card' ? entriesRef.current[f.index] : null;
        if (e?.voice) sound.current?.hear(e.voice);
    }, []);

    const hint = useCallback(() => {
        if (stageRef.current !== 'walk' || !targetRef.current || hintedRef.current) return;
        hintedRef.current = true; setHinted(true);
        world.current?.setHint(entriesRef.current.findIndex(e => e.spec.id === targetRef.current));
        say(TEXT[langRef.current].hintOn);
    }, []);

    // ── 場面を建てる ──
    useEffect(() => {
        if (!entries || !canvasRef.current) return;
        const art = (window as unknown as { __worldArt?: Record<string, string> }).__worldArt || {};
        const snd = createSound();
        sound.current = snd;
        let h: WorldHandle;
        try {
            h = createWorld(canvasRef.current, {
            cards: entries.map(e => ({ spec: e.spec, art: e.art })),
            art: { rival: art['leader-rival'], you: art['leader-you'], back: art['card-back'] },
            low: window.matchMedia('(pointer: coarse)').matches,
            onFocus: f => { focusRef.current = f; setFocus(f); },
            onAct: () => act(),
            onHear: () => hear(),
            onHint: () => hint(),
            onStep: run => { if (stageRef.current === 'walk') snd.step(run); },
            onLock: setLocked,
            onPose: (x, z, yaw) => snd.setListener(x, z, yaw),
            });
        } catch {
            sound.current = null;
            setNo3d(true);
            return;
        }
        h.setTaken(deckRef.current);
        world.current = h;
        if (process.env.NODE_ENV !== 'production') {
            const w = window as unknown as { __world?: WorldHandle; __worldSound?: WorldSound; __worldTarget?: () => { id: string | null; index: number } };
            w.__world = h; w.__worldSound = snd;
            w.__worldTarget = () => ({ id: targetRef.current, index: entriesRef.current.findIndex(e => e.spec.id === targetRef.current) });
        }
        return () => { h.dispose(); snd.stop(); world.current = null; sound.current = null; };
    }, [entries, act, hear, hint]);

    const enter = () => {
        sound.current?.start();
        setStage('intro');
        world.current?.playIntro(() => {
            setStage('walk');
            startAt.current = Date.now();
            nextCall();
            if (!window.matchMedia('(pointer: coarse)').matches) world.current?.lock();
        });
    };
    const skipIntro = () => { if (stage === 'intro') world.current?.skipCine(); };

    const toggleSound = () => setSoundOn(v => {
        const on = !v;
        soundOnRef.current = on;
        sound.current?.setOn(on);
        const idx = entriesRef.current.findIndex(e => e.spec.id === targetRef.current);
        if (idx >= 0) world.current?.setCalling(idx, !on);   // 音を切ったら、波紋を遠くからも見えるようにする
        return on;
    });
    /** 残りを自動で埋める(歩く時間が無いとき)。この回は記録にしない */
    const autoFill = () => {
        const have = deckRef.current;
        const rest = entriesRef.current.filter(e => !have.includes(e.spec.id)).map(e => e.spec);
        const add = autoDeck(rest).slice(0, GOAL - have.length).map(c => c.id);
        statsRef.current = { ...statsRef.current, auto: statsRef.current.auto + add.length }; setStats(statsRef.current);
        setDeck([...have, ...add]);
        nextCall();
        finish();
    };
    const pickLang = (l: 'ja' | 'en') => { setLang(l); save(LANG_KEY, l); };

    // ── 親指の操作(スマホ) ──
    const stickBase = useRef<{ id: number; cx: number; cy: number } | null>(null);
    const onStick = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.type === 'pointerdown') {
            const r = e.currentTarget.getBoundingClientRect();
            stickBase.current = { id: e.pointerId, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
            e.currentTarget.setPointerCapture(e.pointerId);
        }
        const b = stickBase.current;
        if (!b || b.id !== e.pointerId) return;
        if (e.type === 'pointerup' || e.type === 'pointercancel') { stickBase.current = null; setStick(null); world.current?.setMove(0, 0); return; }
        let x = (e.clientX - b.cx) / 52, y = (e.clientY - b.cy) / 52;
        const m = Math.hypot(x, y);
        if (m > 1) { x /= m; y /= m; }
        setStick({ x, y });
        world.current?.setMove(x, -y, m > 1.25);
    };

    if (!mounted) return null;

    const fe = focus?.kind === 'card' ? entries?.[focus.index] : null;
    const inDeck = !!fe && deckIds.includes(fe.spec.id);
    const full = deckIds.length >= GOAL;
    const walking = stage === 'walk';
    const pal = fe ? (PAL[fe.spec.element] || PAL.flame) : PAL.flame;
    const words = fe ? fe.spec.text.split(' ') : [];
    const step = Math.min(0.14, 1.1 / Math.max(1, words.length));
    const narrow = typeof window !== 'undefined' && window.innerWidth < 640;
    const status = full ? t.done : !target ? '' : soundOn ? t.calling : t.callingMute;
    const langBtn = (
        <div style={{ display: 'inline-flex', padding: 3, borderRadius: 999, border: '1px solid #E7E5E4', background: '#fff' }}>
            {(['ja', 'en'] as const).map(l => (
                <button key={l} data-lang={l} onClick={() => pickLang(l)} style={{ border: 'none', cursor: 'pointer', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 900, letterSpacing: 1, background: lang === l ? 'linear-gradient(135deg, #F6C85F, #B8941E)' : 'transparent', color: lang === l ? '#fff' : SUB }}>{l === 'ja' ? '日本語' : 'English'}</button>
            ))}
        </div>
    );

    return createPortal(
        <div id="duel-world-root" style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden', background: 'linear-gradient(180deg, #FDF3DC 0%, #F6E7C6 100%)', userSelect: 'none', WebkitUserSelect: 'none', fontFamily: 'inherit' }}>
            <style>{CSS}</style>
            <canvas ref={canvasRef} onClick={skipIntro} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', touchAction: 'none', cursor: walking && !locked ? 'grab' : 'default' }} />

            {/* 3D が描けない端末 */}
            {no3d && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14, background: 'linear-gradient(180deg, #FDF3DC 0%, #F6E7C6 100%)' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{t.no3d}</div>
                    <a href={outHref} style={{ fontSize: 13, fontWeight: 800, color: GOLD }}>{t.back}</a>
                </div>
            )}

            {/* 読み込み中 / 失敗 */}
            {!entries && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, letterSpacing: 6, color: GOLD }}>{failed ? t.closed : t.loading}</div>
                    {failed && <a href={outHref} style={{ fontSize: 13, fontWeight: 800, color: INK }}>{t.back}</a>}
                </div>
            )}

            {/* 入口の札: ここが何の場所か */}
            {entries && stage === 'gate' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 14, overflowY: 'auto', background: 'linear-gradient(180deg, rgba(255,251,235,0.25), rgba(255,251,235,0.55))' }}>
                    <div style={{ ...glass, maxWidth: 560, width: '100%', padding: narrow ? '20px 18px' : '30px 40px', textAlign: 'center', animation: 'world-rise .7s ease-out', margin: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2.5, color: GOLD, textAlign: 'left' }}>{t.kicker}</div>
                            {langBtn}
                        </div>
                        <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: narrow ? 28 : 38, letterSpacing: 3, color: INK }}>The Card Grounds</div>
                        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', margin: '10px 0 14px' }} />
                        <div style={{ fontSize: narrow ? 17 : 20, fontWeight: 800, lineHeight: 1.5, color: INK }}>{t.lead}</div>
                        <div style={{ margin: '14px auto 0', maxWidth: 440, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 9 }}>
                            {t.how.map((line, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #F6C85F, #B8941E)', color: '#fff', fontSize: 12, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</span>
                                    <span style={{ fontSize: 14, lineHeight: 1.6, color: '#44403C' }}>{line}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ margin: '14px 0 4px', fontSize: 12, color: '#047857', fontWeight: 800 }}>{t.tip}</div>
                        <div style={{ margin: '10px 0 16px', fontSize: 11.5, color: SUB, lineHeight: 2.2 }}>
                            {touch ? t.keysTouch : (
                                <>
                                    <span style={key}>W</span><span style={key}>A</span><span style={key}>S</span><span style={key}>D</span>{t.keysPc[0]} &nbsp; <span style={key}>SHIFT</span>{t.keysPc[1]} &nbsp; <span style={key}>MOUSE</span>{t.keysPc[2]}<br />
                                    <span style={key}>E</span>{t.keysPc[3]} &nbsp; <span style={key}>R</span>{t.keysPc[4]} &nbsp; <span style={key}>H</span>{t.keysPc[5]}
                                </>
                            )}
                        </div>
                        <button data-act="enter" onClick={enter} style={{ border: 'none', background: 'linear-gradient(135deg, #F6C85F, #B8941E)', color: '#fff', fontWeight: 900, fontSize: 16, letterSpacing: 4, borderRadius: 14, padding: '13px 46px', cursor: 'pointer', boxShadow: '0 8px 22px rgba(184,148,30,0.45)' }}>{t.enter}</button>
                        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 11.5 }}>
                            <span style={{ color: SUB }}>{t.best}: <b style={{ color: INK }}>{best ? `${t.byEar} ${best.ear} / ${GOAL} ・ ${clock(best.sec)}` : t.none}</b></span>
                            <a href={outHref} style={{ fontWeight: 800, color: SUB, letterSpacing: 1 }}>{t.skipDeck}</a>
                        </div>
                    </div>
                </div>
            )}

            {/* 空撮のあいだの題 */}
            {stage === 'intro' && (
                <div onClick={skipIntro} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, pointerEvents: 'auto' }}>
                    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(22px, 4.6vw, 52px)', color: '#fff', letterSpacing: '0.42em', textAlign: 'center', paddingLeft: '0.42em', textShadow: '0 2px 18px rgba(90,60,10,0.75), 0 0 2px rgba(90,60,10,0.9)', animation: 'world-title 9.5s ease-in-out forwards' }}>THE CARD GROUNDS</div>
                    <div style={{ fontSize: 'clamp(12px, 1.8vw, 18px)', fontWeight: 800, letterSpacing: 4, color: '#fff', textShadow: '0 1px 10px rgba(60,40,10,0.95)', animation: 'world-title 9.5s ease-in-out forwards' }}>{lang === 'ja' ? '声を追え' : 'FOLLOW THE VOICE'}</div>
                    <div style={{ position: 'absolute', bottom: 28, fontSize: 11, fontWeight: 900, letterSpacing: 3, color: '#fff', textShadow: '0 1px 6px rgba(60,40,10,0.9)' }}>{t.skipIntro}</div>
                </div>
            )}

            {/* 歩いているあいだの操作盤 */}
            {entries && (walking || stage === 'leave') && (
                <>
                    {/* 上: いま何をする時間か、どこまで進んだか */}
                    <div data-hud="top" style={{ ...glass, position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', padding: '8px 16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, maxWidth: 'calc(100vw - 24px)', borderColor: full ? '#10B981' : 'rgba(212,175,55,0.65)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: narrow ? 11 : 12.5, fontWeight: 900, letterSpacing: narrow ? 0.5 : 1.5, color: full ? '#047857' : INK, whiteSpace: 'nowrap' }}>
                            {target && soundOn && (
                                <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center', height: 14 }}>
                                    {[0, 1, 2, 3].map(i => <span key={i} style={{ width: 3, height: 14, borderRadius: 2, background: GOLD, animation: `world-wave ${0.7 + i * 0.13}s ease-in-out ${i * 0.09}s infinite` }} />)}
                                </span>
                            )}
                            {status}
                        </div>
                        <div style={{ display: 'flex', gap: 3 }}>
                            {Array.from({ length: GOAL }).map((_, i) => {
                                const e = entries.find(x => x.spec.id === deckIds[i]);
                                const c = e ? (PAL[e.spec.element] || PAL.flame)[1] : null;
                                return <div key={i} style={{ width: narrow ? 11 : 15, height: narrow ? 16 : 21, borderRadius: 3, background: c || 'rgba(120,113,108,0.16)', border: c ? '1px solid rgba(255,255,255,0.9)' : '1px solid rgba(120,113,108,0.25)', boxShadow: c ? `0 0 8px ${c}` : undefined, transition: 'background .25s' }} />;
                            })}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.5, color: SUB, display: 'flex', gap: 12 }}>
                            <span>{t.caught} <b style={{ color: INK }}>{deckIds.length} / {GOAL}</b></span>
                            <span>{t.ear} <b style={{ color: '#047857' }}>{stats.ear}</b></span>
                            <span>{t.time} <b style={{ color: INK }}>{clock(sec)}</b></span>
                        </div>
                    </div>
                    {/* 右上: ボタン */}
                    {walking && (
                        <div style={{ position: 'absolute', top: narrow ? 100 : 12, right: 12, display: 'flex', gap: 6 }}>
                            {!full && <button data-act="auto" onClick={autoFill} style={{ ...glass, borderRadius: 10, padding: '8px 12px', fontSize: 11, fontWeight: 900, letterSpacing: 1, cursor: 'pointer' }}>{t.skip}</button>}
                            <button data-act="sound" onClick={toggleSound} style={{ ...glass, borderRadius: 10, padding: '8px 12px', fontSize: 11, fontWeight: 900, letterSpacing: 1, cursor: 'pointer' }}>{t.sound[soundOn ? 0 : 1]}</button>
                            <a href={outHref} style={{ ...glass, borderRadius: 10, padding: '8px 12px', fontSize: 11, fontWeight: 900, letterSpacing: 1, textDecoration: 'none' }}>{t.exit}</a>
                        </div>
                    )}
                    {/* 照準 */}
                    {walking && <div style={{ position: 'absolute', left: '50%', top: '50%', width: 6, height: 6, margin: -3, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 0 1.5px rgba(60,40,10,0.45)', pointerEvents: 'none' }} />}

                    {/* いま前にあるカード */}
                    {walking && fe && (
                        <div key={fe.spec.id} data-hud="card" style={{ ...glass, position: 'absolute', left: '50%', ...(touch ? { top: narrow ? 146 : 110 } : { bottom: 26 }), transform: 'translateX(-50%)', width: 'min(720px, calc(100vw - 24px))', padding: narrow ? '12px 14px' : '16px 24px 14px', textAlign: 'center', animation: 'world-rise-c .28s ease-out', pointerEvents: 'none', borderColor: inDeck ? '#10B981' : 'rgba(212,175,55,0.65)' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', fontSize: 10, fontWeight: 900, letterSpacing: 2, marginBottom: 8 }}>
                                <span style={{ color: pal[2] }}>{lang === 'ja' ? ELEMENT_JA[fe.spec.element] : ELEMENT_NAMES[fe.spec.element]}</span>
                                <span style={{ color: SUB }}>{RANK_LABELS[fe.spec.rank]}</span>
                                <span style={{ color: '#047857' }}>{lang === 'ja' ? 'コスト' : 'COST'} {fe.spec.cost}</span>
                                <span style={{ color: '#1D4ED8' }}>{lang === 'ja' ? '攻撃' : 'ATK'} {fe.spec.atk}</span>
                                <span style={{ color: '#B91C1C' }}>{lang === 'ja' ? '体力' : 'HP'} {fe.spec.hp}</span>
                                {inDeck && <span style={{ color: '#047857' }}>{t.mine}</span>}
                            </div>
                            <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontSize: narrow ? 19 : fe.spec.text.length > 70 ? 22 : 27, lineHeight: 1.35 }}>
                                {words.map((w, i) => <span key={i} style={{ display: 'inline-block', marginRight: '0.28em', color: '#A8A29E', animation: `world-chant .55s ease-out ${0.3 + i * step}s forwards` }}>{w}</span>)}
                            </div>
                            {fe.spec.ability !== 'NONE' && <div style={{ fontSize: 12, color: '#57534E', marginTop: 8 }}><b style={{ color: pal[2], letterSpacing: 1 }}>{lang === 'ja' ? ABILITY_NAME_JA[fe.spec.ability] : fe.spec.ability}</b> {lang === 'ja' ? ABILITY_JA[fe.spec.ability] : ABILITY_TEXT[fe.spec.ability]}</div>}
                            {!touch && (
                                <div style={{ marginTop: 10, fontSize: 11, color: SUB, fontWeight: 800, letterSpacing: 1 }}>
                                    {!inDeck && !full && <><span style={key}>E</span>{t.thisOne} &nbsp;&nbsp; </>}
                                    <span style={key}>R</span>{t.hearIt}
                                    {!inDeck && !full && !hinted && <> &nbsp;&nbsp; <span style={key}>H</span>{t.hint}</>}
                                </div>
                            )}
                        </div>
                    )}
                    {walking && focus?.kind === 'rival' && (
                        <div data-hud="circle" style={{ ...glass, position: 'absolute', left: '50%', ...(touch ? { top: narrow ? 146 : 110 } : { bottom: 26 }), transform: 'translateX(-50%)', width: 'min(580px, calc(100vw - 24px))', padding: '16px 22px', textAlign: 'center', animation: 'world-rise-c .28s ease-out', pointerEvents: 'none' }}>
                            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: GOLD }}>{t.circle}{newBest && full ? ` — ${t.newBest}` : ''}</div>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: narrow ? 20 : 26, margin: '6px 0' }}>{full ? t.waiting : t.carry(deckIds.length)}</div>
                            {full && <div style={{ fontSize: 13, fontWeight: 800, color: '#047857', marginBottom: 6 }}>{t.result(stats.ear, stats.hint, clock(sec))}</div>}
                            <div style={{ fontSize: 11, color: SUB, fontWeight: 800, letterSpacing: 1.5 }}>
                                {full ? (touch ? t.challenge : <><span style={key}>E</span>{t.challenge}</>) : t.goBack}
                            </div>
                        </div>
                    )}

                    {/* PC: 手引き */}
                    {walking && !touch && !fe && focus?.kind !== 'rival' && (
                        <div style={{ position: 'absolute', left: 14, bottom: 14, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#fff', textShadow: '0 1px 5px rgba(60,40,10,0.95)' }}>
                            {locked ? <>WASD {t.keysPc[0]} · SHIFT {t.keysPc[1]} · E {t.keysPc[3]} · R {t.keysPc[4]} · H {t.keysPc[5]}</> : t.lookHint}
                        </div>
                    )}

                    {/* スマホ: 親指 */}
                    {walking && touch && (
                        <>
                            <div onPointerDown={onStick} onPointerMove={onStick} onPointerUp={onStick} onPointerCancel={onStick}
                                style={{ position: 'absolute', left: 18, bottom: 22, width: 124, height: 124, borderRadius: '50%', background: 'rgba(255,253,246,0.4)', border: '2px solid rgba(255,255,255,0.85)', boxShadow: '0 4px 14px rgba(60,40,10,0.25)', touchAction: 'none' }}>
                                <div style={{ position: 'absolute', left: '50%', top: '50%', width: 54, height: 54, margin: -27, borderRadius: '50%', background: 'linear-gradient(135deg, #FFF8DC, #F6C85F)', border: '2px solid #fff', transform: `translate(${(stick?.x || 0) * 36}px, ${(stick?.y || 0) * 36}px)`, pointerEvents: 'none' }} />
                            </div>
                            <div style={{ position: 'absolute', right: 16, bottom: 26, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
                                {!full && target && !hinted && <button data-act="hint" onClick={hint} style={{ ...glass, borderRadius: 999, padding: '10px 18px', fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>{t.hint}</button>}
                                {fe && <button data-act="hear" onClick={hear} style={{ ...glass, borderRadius: 999, padding: '10px 18px', fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>{t.hearIt}</button>}
                                {((fe && !inDeck && !full) || focus?.kind === 'rival') && (
                                    <button data-act="take" onClick={act} style={{ border: '2px solid #fff', borderRadius: 999, width: 104, height: 104, fontSize: 14, fontWeight: 900, letterSpacing: 1, color: '#fff', background: 'linear-gradient(135deg, #F6C85F, #B8941E)', boxShadow: '0 8px 20px rgba(60,40,10,0.35)', animation: 'world-pulse 1.6s ease-in-out infinite' }}>
                                        {focus?.kind === 'rival' ? (full ? t.challenge : `${deckIds.length} / ${GOAL}`) : t.thisOne}
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {toast && <div key={toast.id} data-hud="toast" style={{ ...glass, position: 'absolute', left: '50%', top: narrow ? 146 : 112, padding: '10px 20px', fontSize: 12.5, fontWeight: 900, letterSpacing: 1.5, color: GOLD, whiteSpace: 'nowrap', animation: 'world-toast 2.6s ease-out forwards', pointerEvents: 'none', zIndex: 5 }}>{toast.text}</div>}
                </>
            )}

            {/* 対戦へ: 白く飛ぶ */}
            {stage === 'leave' && <div style={{ position: 'absolute', inset: 0, background: '#FFFBEB', animation: 'world-white 3.4s ease-in forwards', pointerEvents: 'none' }} />}
        </div>,
        document.body,
    );
}
