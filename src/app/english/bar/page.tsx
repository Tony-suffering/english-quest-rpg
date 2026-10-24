'use client';

/**
 * 居酒屋の無言給仕 (Silent Bartender)
 *
 * プロット: 権藤マスターが倒れた。お前が代打で一夜限りカウンターに立つ。
 *          条件はひとつ ── 声を出すな。
 *
 * 構成:
 *   - ゲームループ本体（このファイル）
 *   - データ: /data/english/bar/* (customers, roasts, boss, narrative, achievements)
 *   - ライブラリ: /lib/english/bar/* (night-builder, voice-calibration, storage)
 *   - 視覚部品: /components/english/bar/* (CustomerPortrait, CounterAmbience,
 *              GondoBust, StatsPanel, NightResultSummary)
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CUSTOMERS } from '@/data/english/bar/customers';
import { pickBoss } from '@/data/english/bar/boss-customers';
import type { Customer, NightPhase } from '@/data/english/bar/types';
import { pickPhaseTransition, MILESTONE_INTRO_BEATS } from '@/data/english/bar/narrative';
import { getActiveMilestone } from '@/data/english/bar/milestones';
import MilestoneOverlay from '@/components/english/bar/MilestoneOverlay';
import { maybeFlicker, type DreamFlicker } from '@/data/english/bar/dream-sequences';
import { getSeasonalCustomers } from '@/data/english/bar/seasonal-customers';
import {
    useCharacter,
    isLisaNightEligible,
    pickRoastFor,
    pickEndingFor,
    getIntroBeatFor,
} from '@/lib/english/bar/character';
import CharacterSelect from '@/components/english/bar/CharacterSelect';
import { phaseOf } from '@/lib/english/bar/night-builder';
import { calibrateMicNoise } from '@/lib/english/bar/voice-calibration';
import {
    loadStats, recordNight, type PlayerStats, type NightResult,
} from '@/lib/english/bar/storage';
import { findNewlyUnlocked, type Achievement } from '@/data/english/bar/achievements';
import {
    MODES, getMode, buildNightForMode, type GameMode, type GameModeId,
} from '@/lib/english/bar/modes';
import {
    getNewlyUnlockedFragment, getUnlockedFragments,
    type GondoFragment,
} from '@/data/english/bar/gondo-fragments';
import { getUnlockedBarFragments } from '@/data/english/bar/bar-fragments';
import { getRevealedSecrets } from '@/data/english/bar/bar-secrets';
import { todaysBirthdays } from '@/data/english/bar/regulars-birthday';
import { pickClosingMonologue } from '@/data/english/bar/closing-monologues';
import { todaysSeasonTurn } from '@/data/english/bar/season-turn-beats';
import { getUnlockedEpisodes } from '@/data/english/bar/training-episodes';
import { getCurrentPersona } from '@/data/english/bar/persona-titles';
import { todaysObservation } from '@/data/english/bar/daily-observations';
import { thisMonthScene } from '@/data/english/bar/monthly-scenes';
import { todaysFestival } from '@/data/english/bar/festival-nights';
import { todaysObservances } from '@/data/english/bar/yearly-anniversaries';
import CustomerPortrait from '@/components/english/bar/CustomerPortrait';
import CounterAmbience from '@/components/english/bar/CounterAmbience';
import GondoBust from '@/components/english/bar/GondoBust';
import StatsPanel from '@/components/english/bar/StatsPanel';
import DeepStats from '@/components/english/bar/DeepStats';
import CustomerAtlas from '@/components/english/bar/CustomerAtlas';
import NightResultSummary from '@/components/english/bar/NightResultSummary';
import ModeSelect from '@/components/english/bar/ModeSelect';
import GondoJournal from '@/components/english/bar/GondoJournal';
import FragmentUnlockToast from '@/components/english/bar/FragmentUnlockToast';
import CardDeck from '@/components/english/bar/CardDeck';
import TutorialFlow from '@/components/english/bar/TutorialFlow';
import AudioToggle from '@/components/english/bar/AudioToggle';
import KeyboardHelp from '@/components/english/bar/KeyboardHelp';
import VisualPrefsToggle from '@/components/english/bar/VisualPrefsToggle';
import InstallGate from '@/components/english/bar/InstallGate';
import { prepareCustomerWithMemory } from '@/lib/english/bar/memory-integration';
import { recordOutcome } from '@/lib/english/bar/memory';
import { copyShareText } from '@/lib/english/bar/share';
import { buildNightWithContinuity } from '@/lib/english/bar/night-builder-v2';
import { getWeekendCustomers } from '@/data/english/bar/weekend-customers';
import { getDayOfWeekRegulars } from '@/data/english/bar/day-of-week-regulars';
import { collectLedger } from '@/data/english/bar/moral-ledger';
import { getUnlockedLetters } from '@/data/english/bar/gondo-letters';
import { pickTonightWeather, applyWeatherBias, type WeatherBeat } from '@/data/english/bar/weather';
import { pickServiceTip } from '@/data/english/bar/service-tips';
import { collectMoments, type NightMoment } from '@/data/english/bar/night-moments';
import {
    useAmbientAudio, useAudioToggle,
    playClink, playSoftChime, playStingDown,
    playFootsteps, playNorenFlap, playIceDrop,
    playPaperCrumple, playGlassSet,
} from '@/lib/english/bar/ambient-audio';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════
type Phase = 'intro' | 'stats' | 'journal' | 'calibrating' | 'enter' | 'listening' | 'decide' | 'reacting' | 'phase-shift' | 'failed' | 'ended';

// ═══════════════════════════════════════════════════════════
// Color palette — warm paper / wooden izakaya counter, light theme
// ═══════════════════════════════════════════════════════════
const C = {
    bg: '#FAF6EC',
    bgDeep: '#F2ECD8',
    card: '#FFFFFF',
    cardHover: '#FFF8E1',
    border: '#E5DCC0',
    borderBright: '#C8A45C',
    amber: '#B8860B',
    amberDim: '#8B6508',
    amberBg: '#FFF5D1',
    red: '#B91C1C',
    green: '#047857',
    text: '#1C1917',
    textDim: '#57534E',
    textFaint: '#A8A29E',
};

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════
function shuffleCustomerCards(customer: Customer): { cards: string[]; correctIdx: number } {
    const correct = customer.cards[0];
    const rest = customer.cards.slice(1);
    const shuffled = [...rest].sort(() => Math.random() - 0.5);
    const insertAt = Math.floor(Math.random() * (shuffled.length + 1));
    shuffled.splice(insertAt, 0, correct);
    return { cards: shuffled, correctIdx: insertAt };
}

// ═══════════════════════════════════════════════════════════
// Voice watchdog — uses calibrated per-room threshold
//
// Holds the onSpeak handler in a ref so callers can pass a
// frequently-changing closure (e.g. one that reads idx) without
// causing the effect to tear down and re-acquire the mic on
// every customer change.
// ═══════════════════════════════════════════════════════════
function useVoiceWatchdog(active: boolean, threshold: number, onSpeak: () => void) {
    const streamRef = useRef<MediaStream | null>(null);
    const ctxRef = useRef<AudioContext | null>(null);
    const rafRef = useRef<number | null>(null);
    const onSpeakRef = useRef(onSpeak);

    // Keep the latest handler in a ref — does not retrigger the effect.
    useEffect(() => { onSpeakRef.current = onSpeak; }, [onSpeak]);

    useEffect(() => {
        if (!active) return;
        let cancelled = false;

        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
                streamRef.current = stream;
                const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
                const ctx = new Ctx();
                ctxRef.current = ctx;
                const src = ctx.createMediaStreamSource(stream);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 512;
                src.connect(analyser);
                const data = new Uint8Array(analyser.fftSize);

                let above = 0;
                const SUSTAIN_FRAMES = 6;

                const tick = () => {
                    if (cancelled) return;
                    analyser.getByteTimeDomainData(data);
                    let peak = 0;
                    for (let i = 0; i < data.length; i++) {
                        const v = Math.abs(data[i] - 128);
                        if (v > peak) peak = v;
                    }
                    if (peak > threshold) above++; else above = 0;
                    if (above >= SUSTAIN_FRAMES) {
                        onSpeakRef.current();
                        return;
                    }
                    rafRef.current = requestAnimationFrame(tick);
                };
                rafRef.current = requestAnimationFrame(tick);
            } catch {
                // mic denied — game still works without jump scare
            }
        })();

        return () => {
            cancelled = true;
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            streamRef.current?.getTracks().forEach(t => t.stop());
            if (ctxRef.current && ctxRef.current.state !== 'closed') ctxRef.current.close().catch(() => {});
            streamRef.current = null;
            ctxRef.current = null;
        };
    }, [active, threshold]);
}

// ═══════════════════════════════════════════════════════════
// Typewriter hook
// ═══════════════════════════════════════════════════════════
function useTypewriter(text: string, speedMs: number, active: boolean): { shown: string; done: boolean } {
    const [shown, setShown] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!active) { setShown(''); setDone(false); return; }
        setShown('');
        setDone(false);
        let i = 0;
        const id = setInterval(() => {
            i++;
            setShown(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setDone(true);
            }
        }, speedMs);
        return () => clearInterval(id);
    }, [text, speedMs, active]);

    return { shown, done };
}

// ═══════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════
export default function SilentBarPage() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [night, setNight] = useState<Customer[]>([]);
    const [idx, setIdx] = useState(0);
    const [shuffled, setShuffled] = useState<{ cards: string[]; correctIdx: number } | null>(null);
    const [picked, setPicked] = useState<number | null>(null);
    const [success, setSuccess] = useState(0);
    const [failed, setFailed] = useState(0);
    const [roast, setRoast] = useState('');
    const [timer, setTimer] = useState(0);
    const { character, setCharacter } = useCharacter();
    // Intro beat recomputes if the character flips (無名 ↔ リサ) on the intro screen.
    const [introBeat, setIntroBeat] = useState<string>(() => getIntroBeatFor('default'));
    const lisaEligible = stats ? isLisaNightEligible(stats) : false;
    // If the player lands on intro without Lisa-eligibility, make sure the
    // persisted choice cannot leak a Lisa run into a non-Lisa night.
    useEffect(() => {
        if (!lisaEligible && character === 'lisa') setCharacter('default');
    }, [lisaEligible, character, setCharacter]);
    const [threshold, setThreshold] = useState(35);
    const [bossAdded, setBossAdded] = useState(false);
    const [phaseShiftText, setPhaseShiftText] = useState<string>('');
    const [endedResult, setEndedResult] = useState<NightResult | null>(null);
    const [endedStats, setEndedStats] = useState<PlayerStats | null>(null);
    const [endedUnlocks, setEndedUnlocks] = useState<Achievement[]>([]);
    const [selectedModeId, setSelectedModeId] = useState<GameModeId>('normal');
    const [newFragment, setNewFragment] = useState<GondoFragment | null>(null);
    const [tutorialDone, setTutorialDone] = useState(false);
    const [lettersOpen, setLettersOpen] = useState(false);
    const [endedMoments, setEndedMoments] = useState<NightMoment[]>([]);
    const [endedMonologue, setEndedMonologue] = useState<string | null>(null);
    const [tonightWeather] = useState<WeatherBeat>(() => pickTonightWeather());
    const [milestoneSeen, setMilestoneSeen] = useState(false);
    const [flicker, setFlicker] = useState<DreamFlicker | null>(null);
    const currentMode: GameMode = getMode(selectedModeId);
    const { enabled: audioEnabled } = useAudioToggle();

    // ─── Load stats on mount ───
    useEffect(() => {
        setStats(loadStats());
    }, []);

    // ─── Intro beat: milestone morning-after pool gets a ~50% shot
    //     when stats.totalNights - 1 is a milestone key. Otherwise fall
    //     back to the character's regular intro beat pool. ───
    useEffect(() => {
        const milestoneKey = stats ? stats.totalNights - 1 : -1;
        const pool = MILESTONE_INTRO_BEATS[milestoneKey];
        if (pool && pool.length > 0 && Math.random() < 0.5) {
            setIntroBeat(pool[Math.floor(Math.random() * pool.length)]);
        } else {
            setIntroBeat(getIntroBeatFor(character));
        }
    }, [character, stats]);

    // ─── Entrance cue: noren flap → footsteps in → soft chime ───
    useEffect(() => {
        if (phase !== 'enter') return;
        if (!audioEnabled) return;
        playNorenFlap();
        playFootsteps('enter');
        playSoftChime();
    }, [phase, audioEnabled]);

    // ─── Ambient audio (opt-in, phase-tinted) ───
    const audioPhase: 'early' | 'peak' | 'late' | 'closing' | 'idle' = (() => {
        const c = night[idx];
        if (!c || phase === 'intro' || phase === 'stats' || phase === 'journal' || phase === 'calibrating' || phase === 'failed' || phase === 'ended') {
            return 'idle';
        }
        return phaseOf(c);
    })();
    useAmbientAudio({ enabled: audioEnabled, phase: audioPhase });

    // ─── Mic watchdog (only during listening/decide, and when mode allows) ───
    const active = (phase === 'listening' || phase === 'decide') && currentMode.micEnabled;
    const handleSpeak = useCallback(() => {
        if (phase !== 'listening' && phase !== 'decide') return;
        // Pick roast context: first-customer / late-game / generic
        const total = night.length;
        const ctx = idx === 0 ? 'first-customer'
            : (total > 0 && idx >= total - 2) ? 'late-game'
                : 'generic';
        setRoast(pickRoastFor(character, ctx).jp);
        setPhase('failed');
    }, [phase, idx, night.length, character]);
    useVoiceWatchdog(active, threshold, handleSpeak);

    const cur = night[idx] ?? null;
    const curPrepared = cur ? prepareCustomerWithMemory(cur) : null;
    const { shown: typed, done: typedDone } = useTypewriter(
        curPrepared?.line ?? '',
        35,
        phase === 'listening' || phase === 'decide' || phase === 'reacting'
    );

    // ─── Start the night: calibrate (if mic mode) → build (by mode) → begin ───
    const startNight = useCallback(async () => {
        const fresh = loadStats();
        setStats(fresh);
        const mode = getMode(selectedModeId);
        if (mode.micEnabled) {
            setPhase('calibrating');
            const t = await calibrateMicNoise();
            setThreshold(t);
        } else {
            // Speakeasy: no calibration needed
            setThreshold(9999);
        }

        // Weekend customers get merged in on Fri/Sat JST; seasonal based on JST month;
        // day-of-week regulars add texture keyed to today's JST weekday.
        const roster = applyWeatherBias(
            [
                ...CUSTOMERS,
                ...getWeekendCustomers(),
                ...getSeasonalCustomers(),
                ...getDayOfWeekRegulars(),
            ],
            tonightWeather,
        );
        const pool = buildNightWithContinuity(roster, fresh, mode);
        setNight(pool);
        setIdx(0);
        setSuccess(0);
        setFailed(0);
        setPicked(null);
        setRoast('');
        setBossAdded(false);
        setEndedResult(null);
        setEndedStats(null);
        setEndedUnlocks([]);
        setEndedMoments([]);
        setNewFragment(null);
        setMilestoneSeen(false);
        setFlicker(null);
        setShuffled(shuffleCustomerCards(pool[0]));
        // Roll a flicker if the first customer is already in closing phase.
        if (phaseOf(pool[0]) === 'closing') {
            setFlicker(maybeFlicker());
        }
        setPhase('enter');
        // Single ice drop to mark the start of the night.
        if (audioEnabled) playIceDrop();
        setTimeout(() => setPhase('listening'), 900);
    }, [selectedModeId, audioEnabled]);

    // ─── listening → decide when typewriter done ───
    useEffect(() => {
        if (phase === 'listening' && typedDone) {
            setPhase('decide');
            setTimer(currentMode.decideSeconds);
        }
    }, [phase, typedDone, currentMode.decideSeconds]);

    // ─── decide countdown ───
    useEffect(() => {
        if (phase !== 'decide') return;
        if (timer <= 0) {
            setFailed(f => f + 1);
            setPicked(-1);
            if (cur) recordOutcome(cur.id, 'timeout');
            setPhase('reacting');
            return;
        }
        const id = setTimeout(() => setTimer(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [phase, timer, cur]);

    // ─── Card pick ───
    const pickCard = (i: number) => {
        if (phase !== 'decide' || !shuffled) return;
        setPicked(i);
        const correct = i === shuffled.correctIdx;
        if (correct) {
            setSuccess(s => s + 1);
            playClink();
            // Glass touches wood once the reaction lands.
            if (audioEnabled) setTimeout(() => playGlassSet(), 220);
        } else {
            setFailed(f => f + 1);
            playStingDown();
            if (audioEnabled) playPaperCrumple();
        }
        if (cur) recordOutcome(cur.id, correct ? 'served' : 'failed');
        setPhase('reacting');
    };

    // ─── Advance after reacting ───
    useEffect(() => {
        if (phase !== 'reacting') return;
        const id = setTimeout(() => {
            const nextIdx = idx + 1;
            const curPhase = cur ? phaseOf(cur) : 'peak';
            const nextCustomer = night[nextIdx];
            const nextPhase = nextCustomer ? phaseOf(nextCustomer) : null;

            // End-of-regulars: consider injecting a boss per mode policy
            if (!nextCustomer) {
                if (!bossAdded && currentMode.bossPolicy !== 'never') {
                    const boss = currentMode.bossPolicy === 'always'
                        ? pickBoss({ successSoFar: Math.max(success, 4), failedSoFar: 0, busted: false })
                        : pickBoss({ successSoFar: success, failedSoFar: failed, busted: false });
                    if (boss) {
                        setBossAdded(true);
                        setNight(n => [...n, boss]);
                        setIdx(nextIdx);
                        setShuffled(shuffleCustomerCards(boss));
                        setPicked(null);
                        // Boss always lands in closing — roll a flicker.
                        if (phaseOf(boss) === 'closing') setFlicker(maybeFlicker());
                        setPhaseShiftText(pickPhaseTransition('closing') + ' ── 特別な客だ');
                        setPhase('phase-shift');
                        return;
                    }
                }
                setPhase('ended');
                return;
            }

            // Phase transition between sections
            if (nextPhase && nextPhase !== curPhase) {
                setIdx(nextIdx);
                setShuffled(shuffleCustomerCards(nextCustomer));
                setPicked(null);
                if (nextPhase === 'closing') setFlicker(maybeFlicker());
                setPhaseShiftText(pickPhaseTransition(nextPhase));
                setPhase('phase-shift');
                return;
            }

            // Normal next customer
            setIdx(nextIdx);
            setShuffled(shuffleCustomerCards(nextCustomer));
            setPicked(null);
            if (nextPhase === 'closing') setFlicker(maybeFlicker());
            setPhase('enter');
            setTimeout(() => setPhase('listening'), 900);
        }, 3400);
        return () => clearTimeout(id);
    }, [phase, idx, night, cur, success, failed, bossAdded]);

    // ─── Auto-clear a dream flicker after its duration ───
    useEffect(() => {
        if (!flicker) return;
        const id = setTimeout(() => setFlicker(null), flicker.duration);
        return () => clearTimeout(id);
    }, [flicker]);

    // ─── phase-shift: show transition text briefly, then resume play ───
    useEffect(() => {
        if (phase !== 'phase-shift') return;
        const id = setTimeout(() => {
            setPhase('enter');
            setTimeout(() => setPhase('listening'), 900);
        }, 2400);
        return () => clearTimeout(id);
    }, [phase]);

    // ─── On ended or failed, record the night exactly once ───
    const didRecord = useRef(false);
    useEffect(() => {
        if ((phase !== 'ended' && phase !== 'failed') || didRecord.current) return;
        didRecord.current = true;
        const busted = phase === 'failed';
        // Include customers seen up to (and including) the current one.
        const customerIdsSeen = night.slice(0, idx + 1).map(c => c.id);
        // Per-mood success/fail tally for THIS night. Walk only the customers
        // we actually interacted with: success+failed count (busted excluded).
        const interacted = night.slice(0, success + failed);
        const moodOutcomes: NightResult['moodOutcomes'] = {};
        interacted.forEach((c, i) => {
            const wasSuccess = i < success;
            const rec = moodOutcomes[c.mood] ?? { success: 0, failed: 0 };
            if (wasSuccess) rec.success += 1; else rec.failed += 1;
            moodOutcomes[c.mood] = rec;
        });
        const result: NightResult = {
            timestamp: Date.now(),
            success,
            failed,
            busted,
            customerIdsSeen,
            moodOutcomes,
        };
        const before = stats ?? loadStats();
        const prevNights = before.totalNights;
        const after = recordNight(result);
        const newly = findNewlyUnlocked(before).length === 0
            ? after.unlockedAchievementIds
                .filter(id => !before.unlockedAchievementIds.includes(id))
                .map(id => findNewlyUnlocked(after).find(a => a.id === id))
                .filter((a): a is Achievement => !!a)
            : findNewlyUnlocked(after);
        setEndedResult(result);
        setEndedStats(after);
        setEndedUnlocks(newly);
        // Check for newly unlocked Gondo fragment
        setNewFragment(getNewlyUnlockedFragment(after, prevNights));
        // Collect memorable moment callouts
        const servedIds = night.slice(0, success).map(c => c.id);
        const failedIds = night.slice(0, failed + success).slice(success).map(c => c.id);
        setEndedMoments(collectMoments({
            servedIds,
            failedIds,
            allIds: night.map(c => c.id),
            result,
        }));
        const monologue = pickClosingMonologue(after.totalNights);
        setEndedMonologue(monologue ? monologue.body : null);
    }, [phase, night, idx, success, failed, stats]);

    // Reset record guard when starting fresh
    useEffect(() => {
        if (phase === 'intro' || phase === 'calibrating') {
            didRecord.current = false;
        }
    }, [phase]);

    // ═══════════════════════════════════════════════════════════
    // Renders
    // ═══════════════════════════════════════════════════════════
    // First-time player: show tutorial before intro
    if (phase === 'intro' && stats !== null && stats.totalNights === 0 && !tutorialDone) {
        return (
            <div style={pageStyle} data-bar-scope>
                <TutorialFlow onComplete={() => setTutorialDone(true)} />
            </div>
        );
    }

    if (phase === 'intro') {
        return (
            <div style={pageStyle} data-bar-scope>
                <div style={{ maxWidth: 540, width: '100%', textAlign: 'center', padding: '0 16px', boxSizing: 'border-box' }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: C.amberDim, fontWeight: 800, marginBottom: 16 }}>
                        ONE NIGHT ONLY
                    </div>
                    <h1 style={{
                        fontSize: 30, fontWeight: 900, color: C.text,
                        margin: '0 0 20px', letterSpacing: -0.5, lineHeight: 1.3,
                    }}>
                        居酒屋の<br />無言給仕
                    </h1>
                    <p style={{
                        fontSize: 13, color: C.textDim, lineHeight: 1.9,
                        margin: '0 0 20px', fontStyle: 'italic',
                    }}>
                        {introBeat}
                    </p>
                    <div style={{
                        fontSize: 11, color: C.amberDim, fontWeight: 700,
                        letterSpacing: 2, marginBottom: 20,
                    }}>
                        {tonightWeather.label} ── <span style={{
                            color: C.textDim, fontWeight: 500, fontStyle: 'italic',
                        }}>{tonightWeather.beat}</span>
                    </div>
                    {(() => {
                        const bdays = todaysBirthdays();
                        if (bdays.length === 0) return null;
                        return (
                            <div style={{
                                fontSize: 10, color: C.textFaint, fontStyle: 'italic',
                                lineHeight: 1.6, marginBottom: 16,
                                letterSpacing: 1,
                            }}>
                                今夜、{bdays.map(b => b.regularName).join('・')} の誕生日。
                                <br />
                                <span style={{ color: C.textFaint, fontSize: 9 }}>
                                    そのことは、本人以外は口にしない。
                                </span>
                            </div>
                        );
                    })()}
                    {(() => {
                        const turn = todaysSeasonTurn();
                        if (!turn) return null;
                        return (
                            <div style={{
                                fontSize: 10, color: C.amberDim, fontStyle: 'italic',
                                lineHeight: 1.7, marginBottom: 16,
                                letterSpacing: 1,
                                fontFamily: "'Noto Serif JP', serif",
                            }}>
                                <strong style={{ color: C.amber, letterSpacing: 3 }}>{turn.turnName}</strong>
                                <br />
                                <span style={{ color: C.textDim, whiteSpace: 'pre-wrap' }}>{turn.body}</span>
                            </div>
                        );
                    })()}
                    {(() => {
                        const obs = todaysObservation();
                        return (
                            <div style={{
                                background: C.card, border: `1px dashed ${C.border}`,
                                borderRadius: 10, padding: '10px 14px',
                                marginBottom: 16,
                                fontSize: 11, color: C.textDim,
                                lineHeight: 1.7,
                                fontFamily: "'Noto Serif JP', serif",
                            }}>
                                <div style={{
                                    fontSize: 9, letterSpacing: 3, color: C.amberDim,
                                    fontWeight: 800, marginBottom: 6,
                                }}>
                                    今日の気づき
                                </div>
                                <div>{obs.prompt}</div>
                            </div>
                        );
                    })()}
                    {stats && stats.totalNights >= 5 && (() => {
                        const m = thisMonthScene();
                        return (
                            <div style={{
                                fontSize: 10, color: C.textFaint, fontStyle: 'italic',
                                lineHeight: 1.7, marginBottom: 16,
                                letterSpacing: 1,
                                fontFamily: "'Noto Serif JP', serif",
                            }}>
                                <strong style={{ color: C.amberDim, letterSpacing: 2 }}>{m.monthLabel}</strong>
                                <br />
                                <span style={{ color: C.textFaint, whiteSpace: 'pre-wrap' }}>{m.recurringElement}</span>
                            </div>
                        );
                    })()}
                    {stats && (() => {
                        const festival = todaysFestival(stats.totalNights);
                        if (!festival) return null;
                        return (
                            <div style={{
                                fontSize: 11, color: C.amberDim, fontStyle: 'italic',
                                lineHeight: 1.7, marginBottom: 16,
                                letterSpacing: 1,
                                background: C.amberBg,
                                border: `1px dashed ${C.amber}`,
                                borderRadius: 10,
                                padding: '10px 14px',
                                fontFamily: "'Noto Serif JP', serif",
                            }}>
                                <strong style={{ color: C.amber, letterSpacing: 3 }}>{festival.festivalName}</strong>
                                <br />
                                <span style={{ color: C.textDim, whiteSpace: 'pre-wrap' }}>{festival.specialTouch}</span>
                            </div>
                        );
                    })()}
                    {stats && stats.totalNights >= 2 && (
                        <div style={{
                            fontSize: 10, color: C.textDim, fontStyle: 'italic',
                            lineHeight: 1.6, maxWidth: '80ch',
                            margin: '0 auto 18px',
                        }}>
                            {pickServiceTip(Number(
                                new Date(Date.now() + 9 * 60 * 60 * 1000)
                                    .toISOString().slice(0, 10).replace(/-/g, '')
                            ))}
                        </div>
                    )}
                    <p style={{ fontSize: 13, color: C.textDim, lineHeight: 1.9, margin: '0 0 28px' }}>
                        条件はひとつ ── <strong style={{ color: C.amber }}>声を出すな</strong>。<br />
                        客の英語を読み取り、正しいカードを差し出せ。
                    </p>

                    <div style={{
                        background: C.card, border: `1px solid ${C.border}`,
                        borderRadius: 12, padding: '16px 18px', marginBottom: 18,
                        textAlign: 'left', fontSize: 12, lineHeight: 1.8, color: C.textDim,
                    }}>
                        <div style={{ color: C.amber, fontWeight: 800, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>
                            RULES
                        </div>
                        <div>・客の英語を読み取る（音声なし、字幕のみ）</div>
                        <div>・5秒以内にカードを1枚タップ</div>
                        <div>・<strong style={{ color: C.red }}>声を出したら権藤が出る</strong></div>
                        <div>・夜が進むにつれて客が変わる（early → peak → late → closing）</div>
                    </div>

                    {stats && stats.totalNights > 0 && (
                        <>
                            <div style={{
                                display: 'flex', gap: 8, marginBottom: 10, justifyContent: 'center',
                                fontSize: 11, color: C.textDim, flexWrap: 'wrap',
                            }}>
                                <span>{stats.totalNights} 夜</span>
                                <span>•</span>
                                <span>{stats.lifetimeArigatou} ありがとう</span>
                                <span>•</span>
                                <span>{stats.seenCustomerIds.length} 人に会った</span>
                                <span>•</span>
                                <span>{stats.unlockedAchievementIds.length} 称号</span>
                            </div>
                            {stats.lastNight && (
                                <div style={{
                                    fontSize: 10, color: C.textFaint, marginBottom: 10,
                                    textAlign: 'center',
                                }}>
                                    昨夜: {stats.lastNight.busted ? '声を出した' : `${stats.lastNight.success} / ${stats.lastNight.success + stats.lastNight.failed}`}
                                </div>
                            )}
                            {(() => {
                                const persona = getCurrentPersona(stats);
                                if (!persona) return null;
                                return (
                                    <div style={{
                                        fontSize: 10, color: C.amberDim, marginBottom: 16,
                                        textAlign: 'center', letterSpacing: 2,
                                        fontWeight: 700,
                                    }}>
                                        — {persona.title} —
                                    </div>
                                );
                            })()}
                        </>
                    )}

                    {/* Character selector — only on Lisa-eligible nights (every 7th). */}
                    {lisaEligible && (
                        <div style={{ marginBottom: 16, textAlign: 'left' }}>
                            <div style={{
                                fontSize: 10, letterSpacing: 3, color: C.amberDim,
                                fontWeight: 800, marginBottom: 8,
                            }}>
                                今夜のカウンター
                            </div>
                            <CharacterSelect
                                character={character}
                                onSelect={setCharacter}
                                lisaUnlocked={true}
                            />
                        </div>
                    )}

                    {/* Mode selector */}
                    <div style={{ marginBottom: 16, textAlign: 'left' }}>
                        <ModeSelect
                            selected={selectedModeId}
                            onSelect={(id) => setSelectedModeId(id as GameModeId)}
                            stats={stats ? { totalNights: stats.totalNights } : undefined}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => { void startNight(); }}
                            style={{
                                padding: '14px 32px', borderRadius: 10,
                                background: C.amber, color: C.bgDeep, border: 'none',
                                fontSize: 13, fontWeight: 900, letterSpacing: 2, cursor: 'pointer',
                                minHeight: 44,
                            }}
                        >
                            暖簾をくぐる
                        </button>
                        {stats && stats.totalNights > 0 && (
                            <>
                                <button
                                    onClick={() => setPhase('stats')}
                                    style={{
                                        padding: '14px 20px', borderRadius: 10,
                                        background: 'transparent', color: C.textDim,
                                        border: `1px solid ${C.border}`,
                                        fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
                                        minHeight: 44,
                                    }}
                                >
                                    これまでの夜
                                </button>
                                {getUnlockedFragments(stats).length > 0 && (
                                    <button
                                        onClick={() => setPhase('journal')}
                                        style={{
                                            padding: '14px 20px', borderRadius: 10,
                                            background: 'transparent', color: C.textDim,
                                            border: `1px solid ${C.border}`,
                                            fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
                                            minHeight: 44,
                                        }}
                                    >
                                        権藤の手帳
                                    </button>
                                )}
                                <Link
                                    href="/english/bar/codex"
                                    style={{
                                        padding: '14px 20px', borderRadius: 10,
                                        background: 'transparent', color: C.amberDim,
                                        border: `1px dashed ${C.amber}`,
                                        fontSize: 12, fontWeight: 700, letterSpacing: 1,
                                        minHeight: 44,
                                        textDecoration: 'none',
                                        display: 'inline-flex', alignItems: 'center',
                                    }}
                                >
                                    CODEX
                                </Link>
                            </>
                        )}
                    </div>
                    {stats && getUnlockedLetters(stats).length > 0 && (
                        <div style={{ marginTop: 14 }}>
                            <button
                                onClick={() => setLettersOpen(true)}
                                style={{
                                    padding: '8px 14px', borderRadius: 999,
                                    background: 'transparent',
                                    color: C.amberDim,
                                    border: `1px dashed ${C.border}`,
                                    fontSize: 10, fontWeight: 700, letterSpacing: 2,
                                    cursor: 'pointer', minHeight: 32,
                                    fontStyle: 'italic',
                                }}
                            >
                                権藤からの手紙 ({getUnlockedLetters(stats).length}通)
                            </button>
                        </div>
                    )}

                    <div style={{ fontSize: 10, color: C.textFaint, marginTop: 16 }}>
                        {currentMode.micEnabled
                            ? 'マイク許可が出たら2秒ほど静かに ── 店の騒音を測定する。'
                            : '密やかモード。マイク無しで puzzle のみ。'}
                    </div>
                </div>

                {lettersOpen && stats && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="権藤からの手紙"
                        onClick={() => setLettersOpen(false)}
                        style={{
                            position: 'fixed', inset: 0,
                            background: 'rgba(28, 25, 23, 0.55)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 100, padding: 16, boxSizing: 'border-box',
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: C.card,
                                border: `1px solid ${C.borderBright}`,
                                borderRadius: 14,
                                maxWidth: 480, width: '100%',
                                maxHeight: '80vh', overflowY: 'auto',
                                padding: '20px 22px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                            }}
                        >
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', marginBottom: 18,
                            }}>
                                <div style={{
                                    fontSize: 10, letterSpacing: 4, fontWeight: 800,
                                    color: C.amberDim,
                                }}>
                                    権藤からの手紙
                                </div>
                                <button
                                    onClick={() => setLettersOpen(false)}
                                    aria-label="閉じる"
                                    style={{
                                        background: 'transparent', border: 'none',
                                        color: C.textDim, fontSize: 18, cursor: 'pointer',
                                        padding: '4px 8px', lineHeight: 1,
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            {getUnlockedLetters(stats).map((letter) => (
                                <div key={letter.id} style={{
                                    marginBottom: 20, paddingBottom: 16,
                                    borderBottom: `1px dashed ${C.border}`,
                                }}>
                                    <div style={{
                                        fontSize: 13, fontWeight: 800,
                                        color: C.text, marginBottom: 8,
                                        fontFamily: "'Noto Serif JP', serif",
                                    }}>
                                        {letter.title}
                                    </div>
                                    <div style={{
                                        fontSize: 12, lineHeight: 1.9,
                                        color: C.textDim, whiteSpace: 'pre-line',
                                        fontFamily: "'Noto Serif JP', serif",
                                    }}>
                                        {letter.body}
                                    </div>
                                </div>
                            ))}
                            <div style={{
                                textAlign: 'right', fontSize: 10,
                                color: C.textFaint, fontStyle: 'italic',
                                marginTop: -4,
                            }}>
                                ── 権藤
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (phase === 'stats' && stats) {
        return (
            <div style={{ ...pageStyle, alignItems: 'flex-start', paddingTop: 40 }} data-bar-scope>
                <div style={{ width: '100%', maxWidth: 540, padding: '0 12px', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                        <button onClick={() => setPhase('intro')} style={{
                            background: 'transparent', border: `1px solid ${C.border}`,
                            padding: '10px 16px', borderRadius: 999, color: C.textDim,
                            fontSize: 11, fontWeight: 700, cursor: 'pointer',
                            minHeight: 44,
                        }}>
                            ← 戻る
                        </button>
                        <Link href="/english/bar/codex" style={{
                            background: C.amberBg, border: `1px solid ${C.amber}`,
                            padding: '10px 16px', borderRadius: 999, color: C.amberDim,
                            fontSize: 11, fontWeight: 800, cursor: 'pointer',
                            minHeight: 44, letterSpacing: 2,
                            display: 'inline-flex', alignItems: 'center',
                            textDecoration: 'none',
                        }}>
                            CODEX 見習いの記録 →
                        </Link>
                    </div>
                    <DeepStats stats={stats} />
                    <div style={{ height: 24 }} />
                    <StatsPanel stats={stats} />
                    <div style={{ height: 24 }} />
                    <CustomerAtlas stats={stats} />
                    {(() => {
                        const ledger = collectLedger(stats);
                        if (ledger.length === 0) return null;
                        return (
                            <>
                                <div style={{ height: 24 }} />
                                <div style={{
                                    background: C.card,
                                    border: `1px solid ${C.border}`,
                                    borderRadius: 12,
                                    padding: '16px 18px',
                                }}>
                                    <div style={{
                                        fontSize: 9, letterSpacing: 3, fontWeight: 800,
                                        color: C.amberDim, marginBottom: 12,
                                    }}>
                                        店の記憶
                                    </div>
                                    {ledger.map((item) => (
                                        <div key={item.id} style={{ marginBottom: 12 }}>
                                            <div style={{
                                                fontSize: 12, fontWeight: 700,
                                                color: C.text, marginBottom: 4,
                                                fontStyle: 'italic',
                                                fontFamily: "'Noto Serif JP', serif",
                                            }}>
                                                {item.title}
                                            </div>
                                            <div style={{
                                                fontSize: 11, lineHeight: 1.8,
                                                color: C.textDim, fontStyle: 'italic',
                                                whiteSpace: 'pre-line',
                                                fontFamily: "'Noto Serif JP', serif",
                                            }}>
                                                {item.body}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        );
                    })()}
                </div>
            </div>
        );
    }

    if (phase === 'journal' && stats) {
        return (
            <div style={{ ...pageStyle, alignItems: 'flex-start', paddingTop: 40 }} data-bar-scope>
                <div style={{ width: '100%', maxWidth: 540, padding: '0 12px', boxSizing: 'border-box' }}>
                    <button onClick={() => setPhase('intro')} style={{
                        background: 'transparent', border: `1px solid ${C.border}`,
                        padding: '10px 16px', borderRadius: 999, color: C.textDim,
                        fontSize: 11, fontWeight: 700, cursor: 'pointer', marginBottom: 16,
                        minHeight: 44,
                    }}>
                        ← 戻る
                    </button>
                    <GondoJournal
                        unlockedFragments={getUnlockedFragments(stats)}
                        unlockedBarFragments={getUnlockedBarFragments(stats)}
                        revealedSecrets={getRevealedSecrets(stats.totalNights)}
                        trainingEpisodes={getUnlockedEpisodes(stats.totalNights)}
                    />
                </div>
            </div>
        );
    }

    if (phase === 'calibrating') {
        return (
            <div style={pageStyle} data-bar-scope>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: C.amberDim, fontWeight: 800, marginBottom: 14 }}>
                        CALIBRATING
                    </div>
                    <div style={{ fontSize: 18, color: C.textDim, fontStyle: 'italic' }}>
                        店の騒音を測っています...静かに。
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'failed') {
        return (
            <>
                <GondoBust roastJp={roast} onContinue={() => { void startNight(); }} />
                <style>{keyframes}</style>
            </>
        );
    }

    if (phase === 'ended' && endedResult && endedStats) {
        const ending = pickEndingFor(
            character,
            endedResult.success,
            endedResult.failed,
            endedResult.success + endedResult.failed,
        );
        const activeMilestone = getActiveMilestone(endedStats);
        const showMilestone =
            activeMilestone !== null &&
            !milestoneSeen &&
            endedStats.totalNights === activeMilestone.nights;
        return (
            <div style={{ ...pageStyle, alignItems: 'flex-start', paddingTop: 40 }} data-bar-scope>
                {showMilestone && (
                    <MilestoneOverlay
                        milestone={activeMilestone}
                        onDismiss={() => setMilestoneSeen(true)}
                    />
                )}
                <FragmentUnlockToast fragment={newFragment} onDismiss={() => setNewFragment(null)} />
                <div style={{ width: '100%', maxWidth: 540, padding: '0 12px', boxSizing: 'border-box' }}>
                    <div
                        role="status"
                        aria-live="polite"
                        aria-label="一夜の結果"
                        style={{ textAlign: 'center', marginBottom: 20 }}
                    >
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.amberDim, fontWeight: 900, marginBottom: 14 }}>
                            閉店 5:00 AM
                        </div>
                        <div style={{
                            fontSize: 22, fontWeight: 900, color: C.amber,
                            marginBottom: 10, lineHeight: 1.4,
                        }}>
                            {ending.title}
                        </div>
                        <div style={{
                            fontSize: 13, color: C.textDim, lineHeight: 1.8,
                            fontStyle: 'italic',
                            maxWidth: 440, margin: '0 auto 20px',
                        }}>
                            {ending.body}
                        </div>
                    </div>

                    <NightResultSummary result={endedResult} stats={endedStats} newlyUnlocked={endedUnlocks} />

                    {endedMoments.length > 0 && (
                        <div style={{
                            marginTop: 16, padding: '14px 16px',
                            background: C.card, border: `1px solid ${C.border}`,
                            borderRadius: 12,
                        }}>
                            <div style={{
                                fontSize: 9, letterSpacing: 3, fontWeight: 800,
                                color: C.amberDim, marginBottom: 10,
                            }}>
                                この夜の覚え書き
                            </div>
                            {endedMoments.map(m => (
                                <div key={m.id} style={{
                                    fontSize: 12, lineHeight: 1.8,
                                    color: C.textDim, marginBottom: 4,
                                    fontFamily: "'Noto Serif JP', serif",
                                }}>
                                    — {m.text}
                                </div>
                            ))}
                        </div>
                    )}

                    {endedMonologue && (
                        <div style={{
                            marginTop: 16, padding: '18px 20px',
                            background: C.bgDeep, border: `1px dashed ${C.borderBright}`,
                            borderRadius: 12, textAlign: 'center',
                        }}>
                            <div style={{
                                fontSize: 9, letterSpacing: 3, fontWeight: 800,
                                color: C.amberDim, marginBottom: 10,
                            }}>
                                権藤、暖簾を畳みながら
                            </div>
                            <div style={{
                                fontSize: 13, lineHeight: 1.9,
                                color: C.text, fontStyle: 'italic',
                                whiteSpace: 'pre-wrap',
                                fontFamily: "'Noto Serif JP', serif",
                            }}>
                                「{endedMonologue}」
                            </div>
                        </div>
                    )}

                    {(() => {
                        const obs = todaysObservances(endedStats.totalNights);
                        if (obs.length === 0) return null;
                        return (
                            <div style={{
                                marginTop: 16, padding: '16px 18px',
                                background: C.card, border: `1px dashed ${C.border}`,
                                borderRadius: 12,
                            }}>
                                <div style={{
                                    fontSize: 9, letterSpacing: 3, fontWeight: 800,
                                    color: C.amberDim, marginBottom: 10,
                                }}>
                                    今夜、気づいたこと
                                </div>
                                {obs.map(o => (
                                    <div key={o.id} style={{
                                        fontSize: 12, lineHeight: 1.9,
                                        color: C.textDim, marginBottom: 6,
                                        fontFamily: "'Noto Serif JP', serif",
                                    }}>
                                        <strong style={{ color: C.amberDim }}>
                                            {o.label}
                                        </strong>
                                        <br />
                                        {o.gondosObservance}
                                    </div>
                                ))}
                            </div>
                        );
                    })()}

                    <div style={{ textAlign: 'center', marginTop: 20, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => { void startNight(); }} style={{
                            padding: '14px 28px', borderRadius: 10, background: C.amber,
                            color: C.bgDeep, border: 'none', fontSize: 12, fontWeight: 900,
                            letterSpacing: 2, cursor: 'pointer', minHeight: 44,
                        }}>
                            もう一晩
                        </button>
                        <button
                            onClick={async () => {
                                const ok = await copyShareText({
                                    result: endedResult,
                                    modeLabel: currentMode.label,
                                    totalNights: endedStats.totalNights,
                                    perfectNight: !endedResult.busted && endedResult.success >= 5 && endedResult.failed === 0,
                                });
                                if (ok) alert('コピーしました');
                            }}
                            style={{
                                padding: '14px 20px', borderRadius: 10, background: 'transparent',
                                color: C.textDim, border: `1px solid ${C.border}`, fontSize: 12,
                                fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
                                minHeight: 44,
                            }}
                        >
                            結果をコピー
                        </button>
                        <Link href="/english" style={{
                            padding: '14px 20px', borderRadius: 10, background: 'transparent',
                            color: C.textDim, border: `1px solid ${C.border}`, fontSize: 12,
                            fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
                            textDecoration: 'none', display: 'inline-flex',
                            alignItems: 'center', minHeight: 44, boxSizing: 'border-box',
                        }}>
                            店を出る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'phase-shift') {
        return (
            <div style={pageStyle} data-bar-scope>
                <div style={{
                    textAlign: 'center', padding: 24, maxWidth: 480,
                    animation: 'slidein 0.6s ease-out',
                }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: C.amberDim, fontWeight: 800, marginBottom: 14 }}>
                        TIME PASSES
                    </div>
                    <div style={{
                        fontSize: 17, color: C.text, lineHeight: 1.8,
                        fontFamily: "'Noto Serif JP', serif",
                    }}>
                        {phaseShiftText}
                    </div>
                </div>
                <style>{keyframes}</style>
            </div>
        );
    }

    // ─── Playing phases: enter / listening / decide / reacting ───
    if (!cur) return null;
    const isCorrect = picked === shuffled?.correctIdx;
    const reactionText = picked !== null && picked >= 0
        ? (isCorrect ? cur.reaction.success : cur.reaction.failure)
        : '';
    const curNightPhase: NightPhase = phaseOf(cur);

    return (
        <div style={pageStyle} data-bar-scope>
            <style>{keyframes}</style>
            <AudioToggle />
            <VisualPrefsToggle />
            <KeyboardHelp />
            <InstallGate />

            {/* Top status strip */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 12px', fontSize: 10, letterSpacing: 1, fontWeight: 800,
                color: C.textDim, background: C.bg,
                borderBottom: `1px solid ${C.border}`,
                zIndex: 10, gap: 6, flexWrap: 'nowrap',
            }}>
                <span style={{ whiteSpace: 'nowrap' }}>{idx + 1}/{night.length}</span>
                <span style={{ color: C.amber, whiteSpace: 'nowrap' }}>● 無言</span>
                <span style={{ whiteSpace: 'nowrap' }}>{success} / {failed}</span>
            </div>

            {/* Ambient strip (clock + bottle wall + menu) */}
            <div style={{ width: '100%', maxWidth: 560, margin: '36px 0 0', padding: '0 12px' }}>
                <CounterAmbience phase={curNightPhase} customerIdx={idx} />
            </div>

            {/* Customer block */}
            <div style={{
                maxWidth: 560, width: '100%', padding: '16px 12px 0',
                animation: phase === 'enter' ? 'slidein 0.6s ease-out' : undefined,
                boxSizing: 'border-box',
            }}>
                {/* Portrait + name */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    marginBottom: 16,
                }}>
                    <CustomerPortrait
                        mood={cur.mood}
                        name={cur.name}
                        state={
                            phase === 'decide' || phase === 'listening' ? 'waiting'
                                : phase === 'reacting' && isCorrect ? 'served'
                                    : phase === 'reacting' ? 'refused'
                                        : 'idle'
                        }
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            display: 'inline-block', padding: '3px 10px',
                            background: C.amberBg, color: C.amber,
                            border: `1px solid ${C.amber}55`,
                            borderRadius: 999, fontSize: 9, letterSpacing: 3, fontWeight: 900,
                        }}>
                            {cur.name}
                        </div>
                        <div style={{
                            fontSize: 11, color: C.textFaint, marginTop: 4, letterSpacing: 1,
                        }}>
                            {cur.tag}
                        </div>
                        {cur.beat && (
                            <div style={{
                                fontSize: 10, color: C.textDim, marginTop: 6,
                                fontStyle: 'italic', lineHeight: 1.5,
                            }}>
                                {cur.beat}
                            </div>
                        )}
                    </div>
                </div>

                {/* Line (subtitle) */}
                <div
                    role="status"
                    aria-live="polite"
                    aria-label={phase === 'reacting' ? 'customer reaction' : 'customer is speaking'}
                    style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 14, padding: '20px 18px',
                    marginBottom: 20,
                    minHeight: 110,
                    fontSize: 16, fontWeight: 500, lineHeight: 1.7,
                    color: C.text,
                    fontFamily: "'Iowan Old Style', 'Georgia', serif",
                    overflowWrap: 'break-word', wordBreak: 'normal',
                    hyphens: 'auto',
                }}>
                    {phase === 'reacting' ? (
                        <div style={{
                            color: isCorrect ? C.green : C.red,
                            fontStyle: 'italic',
                        }}>
                            {reactionText}
                        </div>
                    ) : (
                        <>
                            {flicker && (
                                <div style={{
                                    fontSize: 11,
                                    fontStyle: 'italic',
                                    color: C.amberDim,
                                    opacity: 0.72,
                                    marginBottom: 10,
                                    lineHeight: 1.6,
                                    letterSpacing: 1,
                                }}>
                                    {flicker.text}
                                </div>
                            )}
                            <span>{typed}</span>
                            {!typedDone && <span style={{
                                display: 'inline-block', width: 8, height: 18,
                                background: C.amber, marginLeft: 4, verticalAlign: 'middle',
                                animation: 'blink 0.8s infinite',
                            }} />}
                        </>
                    )}
                </div>

                {/* Timer ring (sized to mode.decideSeconds) */}
                {phase === 'decide' && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {Array.from({ length: currentMode.decideSeconds }, (_, i) => (
                                <div key={i} style={{
                                    width: Math.max(24, Math.min(48, 200 / currentMode.decideSeconds)),
                                    height: 5, borderRadius: 2,
                                    background: i < timer ? C.amber : C.border,
                                    transition: 'background 0.3s',
                                }} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Cards — delegated to CardDeck component */}
                {shuffled && (phase === 'decide' || phase === 'listening' || phase === 'enter' || phase === 'reacting') && (
                    <div style={{ marginBottom: 30 }}>
                        <CardDeck
                            cards={shuffled.cards}
                            onPick={pickCard}
                            disabled={phase !== 'decide'}
                            picked={picked != null && picked >= 0 ? picked : null}
                            correctIdx={shuffled.correctIdx}
                            phase={phase === 'decide' ? 'decide'
                                : phase === 'reacting' ? 'reacting'
                                    : phase === 'enter' ? 'enter'
                                        : 'listening'}
                        />
                    </div>
                )}

                {phase === 'reacting' && picked === -1 && (
                    <div style={{
                        background: '#FEF2F2',
                        border: `1.5px solid ${C.red}`,
                        borderRadius: 10, padding: '14px 16px',
                        fontSize: 13, color: C.textDim,
                        marginBottom: 30, textAlign: 'center', fontStyle: 'italic',
                    }}>
                        時間切れ。客は黙って出て行った。
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Styles + keyframes
// ═══════════════════════════════════════════════════════════
const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: C.bg,
    color: C.text,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    padding: '20px 0 40px',
};

const keyframes = `
@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
@keyframes slidein {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes shakein {
    0%   { transform: translateX(-8px); }
    25%  { transform: translateX(8px); }
    50%  { transform: translateX(-5px); }
    75%  { transform: translateX(5px); }
    100% { transform: translateX(0); }
}
`;
