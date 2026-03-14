'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const T = {
    bg: '#F0EFE9',
    surface: '#FFFFFF',
    text: '#1C1917',
    textSub: '#57534E',
    textMuted: '#A8A29E',
    gold: '#D4AF37',
    green: '#10B981',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316',
    red: '#EF4444',
    shadow: '0 2px 8px rgba(0,0,0,0.06)',
    shadowMd: '0 4px 16px rgba(0,0,0,0.08)',
};

const CHAKRA_STAGES = [
    { name: 'SEED', ja: '種', color: '#DC2626', desc: '初めて出会ったフレーズ。まだ覚えてない。' },
    { name: 'SPARK', ja: '芽', color: '#EA580C', desc: '1回レビューした。芽が出た状態。' },
    { name: 'FORGE', ja: '鍛', color: '#CA8A04', desc: '2回レビュー。鍛えてる最中。' },
    { name: 'OWN', ja: '得', color: '#16A34A', desc: '3回レビュー。自分のものになりつつある。' },
    { name: 'VOICE', ja: '声', color: '#2563EB', desc: '4回レビュー。声に出して使える。' },
    { name: 'VISION', ja: '研', color: '#4F46E5', desc: '5回レビュー。場面が見える。' },
    { name: 'CROWN', ja: '極', color: '#7C3AED', desc: '6回レビュー。完全にマスター。' },
];

const CARD_RANKS = [
    { name: 'NORMAL', color: '#78716C', gp: '0' },
    { name: 'RARE', color: '#3B82F6', gp: '50' },
    { name: 'SUPER RARE', color: '#8B5CF6', gp: '150' },
    { name: 'EPIC', color: '#F59E0B', gp: '400' },
    { name: 'ULTRA RARE', color: '#EF4444', gp: '800' },
    { name: 'LEGENDARY', color: '#D4AF37', gp: '1500' },
];

interface SectionProps {
    title: string;
    sub: string;
    children: React.ReactNode;
    accent?: string;
}

function Section({ title, sub, children, accent = T.gold }: SectionProps) {
    return (
        <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 4, height: 24, backgroundColor: accent, borderRadius: 2 }} />
                <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: 0 }}>{title}</h2>
            </div>
            <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20, paddingLeft: 16, letterSpacing: '0.05em' }}>{sub}</p>
            {children}
        </div>
    );
}

interface NavCardProps {
    href: string;
    title: string;
    desc: string;
    tag?: string;
    tagColor?: string;
    number?: string;
}

function NavCard({ href, title, desc, tag, tagColor = T.gold, number }: NavCardProps) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: T.surface,
                borderRadius: 14,
                padding: '20px 20px',
                boxShadow: T.shadow,
                border: '1px solid #E7E5E4',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = T.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = T.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                {number && (
                    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 11, color: T.textMuted, fontWeight: 600, letterSpacing: '0.1em' }}>
                        {number}
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{title}</span>
                    {tag && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: tagColor, backgroundColor: tagColor + '15', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.1em' }}>
                            {tag}
                        </span>
                    )}
                </div>
                <p style={{ fontSize: 12, color: T.textSub, margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
        </Link>
    );
}

export default function EnglishHomePage() {
    const [stats, setStats] = useState({ phrases: 0, mastered: 0, xp: 0, level: 0 });

    useEffect(() => {
        // Load stats from localStorage
        try {
            const playerStats = JSON.parse(localStorage.getItem('tl_player_stats') || '{}');
            const mastery = JSON.parse(localStorage.getItem('tl_mastery') || '{}');
            const phrases = JSON.parse(localStorage.getItem('tl_phrases') || '[]');
            const totalXp = playerStats.total_xp || 0;
            const level = Math.min(100, Math.floor(Math.sqrt(totalXp / 100)));
            const masteredCount = Object.values(mastery).filter((m: unknown) => (m as { level: number }).level >= 6).length;
            setStats({ phrases: phrases.length, mastered: masteredCount, xp: totalXp, level });
        } catch {}
    }, []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: T.bg, padding: '32px 20px 80px' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>

                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ fontSize: 11, letterSpacing: '0.3em', color: T.gold, fontWeight: 700, marginBottom: 8 }}>
                        ENGLISH QUEST RPG
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 300, color: T.text, margin: '0 0 12px', lineHeight: 1.5 }}>
                        英語フレーズを<span style={{ fontWeight: 700 }}>捕まえて</span>、
                        <span style={{ fontWeight: 700 }}>育てて</span>、
                        <span style={{ fontWeight: 700 }}>戦わせる</span>。
                    </h1>
                    <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>
                        これは英語学習アプリじゃない。<br />
                        英語フレーズがカードになって、レビューするたびに進化するRPG。<br />
                        毎日触るだけで、勝手に強くなる。
                    </p>
                </div>

                {/* Stats bar */}
                {stats.xp > 0 && (
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 48,
                        padding: '16px 24px', backgroundColor: T.surface, borderRadius: 12,
                        boxShadow: T.shadow, border: '1px solid #E7E5E4',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: T.gold }}>{stats.level}</div>
                            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.1em' }}>LEVEL</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: T.green }}>{stats.phrases}</div>
                            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.1em' }}>PHRASES</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: T.purple }}>{stats.mastered}</div>
                            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.1em' }}>MASTERED</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 22, fontWeight: 700, color: T.blue }}>{stats.xp.toLocaleString()}</div>
                            <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.1em' }}>XP</div>
                        </div>
                    </div>
                )}

                {/* ── HOW IT WORKS ── */}
                <Section title="遊び方" sub="HOW IT WORKS -- 3ステップで始められる">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            {
                                step: '1',
                                title: 'フレーズを捕まえる',
                                desc: 'Questで新しい英語フレーズに出会う。「捕まえる」を押すとトレーニングデッキに追加される。10カテゴリ、各25フレーズ。合計250フレーズ。',
                                link: '/english/quest',
                                linkText: 'Quest を開く',
                                color: T.green,
                            },
                            {
                                step: '2',
                                title: 'トレーニングでレビューする',
                                desc: 'デッキに入ったフレーズをレビュー。日本語を見て英語を思い出す。正解するとスロットマシンが回って、XP・スパーク・カードポイントを獲得。連続正解でチェーンボーナス。フィーバーモードに突入するとさらに倍率アップ。',
                                link: '/english/training',
                                linkText: 'トレーニングを開く',
                                color: T.gold,
                            },
                            {
                                step: '3',
                                title: 'カードが進化する',
                                desc: 'レビューするたびにチャクラレベルが上がる（SEED → CROWN）。同時にスロットで獲得したカードポイント（GP）でカードランクも上がる（NORMAL → LEGENDARY）。最終的に全カードをCROWN + LEGENDARYにするのが目標。',
                                link: '/english/training/card-preview',
                                linkText: 'カードコレクション',
                                color: T.purple,
                            },
                        ].map((item) => (
                            <div key={item.step} style={{
                                backgroundColor: T.surface, borderRadius: 14, padding: 20,
                                boxShadow: T.shadow, border: '1px solid #E7E5E4',
                                borderLeft: `4px solid ${item.color}`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '50%', backgroundColor: item.color,
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 14, fontWeight: 700,
                                    }}>
                                        {item.step}
                                    </div>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{item.title}</span>
                                </div>
                                <p style={{ fontSize: 13, color: T.textSub, margin: '0 0 12px', lineHeight: 1.8, paddingLeft: 40 }}>
                                    {item.desc}
                                </p>
                                <div style={{ paddingLeft: 40 }}>
                                    <Link href={item.link} style={{
                                        fontSize: 12, fontWeight: 600, color: item.color,
                                        textDecoration: 'none', letterSpacing: '0.05em',
                                    }}>
                                        {item.linkText} →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── TRAINING DETAIL ── */}
                <Section title="トレーニング詳細" sub="TRAINING -- レビュー画面でできること">
                    <div style={{
                        backgroundColor: T.surface, borderRadius: 14, padding: 24,
                        boxShadow: T.shadow, border: '1px solid #E7E5E4',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {[
                                {
                                    title: 'スロットマシン',
                                    desc: 'レビュー成功するたびにスロットが回る。MISS / BONUS / GREAT / SUPER / MEGA / LEGENDARY の6段階。連続正解でリーチ演出。30回MISSが続くと天井（ピティカウンター）が発動して確率アップ。',
                                    color: T.gold,
                                },
                                {
                                    title: 'パズルバトル',
                                    desc: 'ドラクエ風のボス戦。フレーズを正解すると攻撃。エレメント相性（火・水・雷・風・地）でダメージ倍率が変わる。10体のボスを倒すとクリア。S/A/B/C/Dの5段階グレード評価。',
                                    color: T.red,
                                },
                                {
                                    title: 'マリオランナー',
                                    desc: '横スクロールランナー。フレーズを正解するとキャラが走る。不正解だと敵に当たる。8つのマイルストーン。GODモードに到達すると全エフェクト解放。',
                                    color: T.blue,
                                },
                                {
                                    title: 'チェーン / フィーバー',
                                    desc: '連続正解するとチェーンが積み上がる。チェーン5で倍率2x、10で3x。フィーバーモードに入ると画面が光って全ボーナスが加算。切れたらリセット。',
                                    color: T.orange,
                                },
                            ].map((item) => (
                                <div key={item.title}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
                                        <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{item.title}</span>
                                    </div>
                                    <p style={{ fontSize: 12, color: T.textSub, margin: 0, lineHeight: 1.8, paddingLeft: 16 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* ── CARD SYSTEM ── */}
                <Section title="カードシステム" sub="CARD EVOLUTION -- 2つの成長軸">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {/* Chakra levels */}
                        <div style={{
                            backgroundColor: T.surface, borderRadius: 14, padding: 20,
                            boxShadow: T.shadow, border: '1px solid #E7E5E4',
                        }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 12 }}>
                                CHAKRA LEVEL（レビュー回数）
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {CHAKRA_STAGES.map((s, i) => (
                                    <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: s.color }} />
                                        <span style={{ fontSize: 11, fontWeight: 700, color: s.color, width: 52 }}>{s.name}</span>
                                        <span style={{ fontSize: 10, color: T.textMuted, width: 16 }}>{s.ja}</span>
                                        <span style={{ fontSize: 10, color: T.textSub, flex: 1 }}>Lv.{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: 11, color: T.textMuted, marginTop: 12, lineHeight: 1.6 }}>
                                1日1レベルまで。毎日来る理由を作る設計。
                            </p>
                        </div>

                        {/* Card ranks */}
                        <div style={{
                            backgroundColor: T.surface, borderRadius: 14, padding: 20,
                            boxShadow: T.shadow, border: '1px solid #E7E5E4',
                        }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 12 }}>
                                CARD RANK（カードポイント GP）
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {CARD_RANKS.map((r) => (
                                    <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: r.color }} />
                                        <span style={{ fontSize: 11, fontWeight: 700, color: r.color, flex: 1 }}>{r.name}</span>
                                        <span style={{ fontSize: 10, color: T.textMuted }}>{r.gp}+ GP</span>
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: 11, color: T.textMuted, marginTop: 12, lineHeight: 1.6 }}>
                                スロットで獲得したGPで自動的にランクアップ。
                            </p>
                        </div>
                    </div>
                </Section>

                {/* ── MAIN FEATURES ── */}
                <Section title="メインコンテンツ" sub="MAIN FEATURES -- 毎日使うもの">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                        <NavCard
                            href="/english/5min"
                            title="5min 英会話"
                            desc="1日5分で始める英会話入門。5つのフレーズと1つの会話シーンを毎日こなす。全30日で150フレーズが身につく。初心者はここから。"
                            tag="BEGINNER"
                            tagColor={T.green}
                            number="00"
                        />
                        <NavCard
                            href="/english/quest"
                            title="Quest（冒険）"
                            desc="新しいフレーズに出会う場所。10カテゴリ x 25フレーズ。「捕まえる」を押すとトレーニングデッキに追加。"
                            tag="START HERE"
                            tagColor={T.green}
                            number="01"
                        />
                        <NavCard
                            href="/english/training"
                            title="トレーニング"
                            desc="デッキのフレーズをレビュー。スロットマシン + パズルバトル + マリオランナー。メインの遊び場。"
                            tag="CORE"
                            tagColor={T.gold}
                            number="02"
                        />
                        <NavCard
                            href="/english/dashboard"
                            title="ダッシュボード"
                            desc="XP推移グラフ、レビューヒートマップ、ピティカウンター、チャクラ分布。自分の成長を可視化。"
                            number="03"
                        />
                        <NavCard
                            href="/english/training/card-preview"
                            title="カードコレクション"
                            desc="捕まえたフレーズがカードとして表示。3Dチルトエフェクト。チャクラレベルとカードランクで見た目が変わる。"
                            number="04"
                        />
                        <NavCard
                            href="/english/arena"
                            title="WORD ARENA"
                            desc="4つの難易度、4つの出題形式。制限時間内に正解してランキングを競う。ボス戦あり。"
                            number="05"
                        />
                        <NavCard
                            href="/english/goroku"
                            title="俺語録"
                            desc="310個の日本語表現を自然な英語に変換。カレンダーUIで毎日10個ずつ。TTS読み上げ対応。"
                            number="06"
                        />
                    </div>
                </Section>

                {/* ── LISTENING & SPEAKING ── */}
                <Section title="聴く / 話す" sub="LISTENING & SPEAKING -- 耳と口を鍛える" accent={T.blue}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                        <NavCard
                            href="/memoria"
                            title="Memoria（メモリア）"
                            desc="ネイティブ会話を聴くリスニング練習。7つのシナリオ、40人以上のキャラクター。日英対訳付き。TTS再生。"
                            tag="LISTENING"
                            tagColor={T.blue}
                        />
                        <NavCard
                            href="/english/requiem"
                            title="Requiem（レクイエム）"
                            desc="シナリオ別の単語復習。1シナリオ = 50単語 x 5日間。会話文脈の中で単語を覚え直す。"
                        />
                        <NavCard
                            href="/english/pro"
                            title="Pro（プロの解説）"
                            desc="ジャーナルエントリーから抽出した英語表現を深掘り解説。各回4-6個の表現を実例付きで教える。"
                        />
                        <NavCard
                            href="/english/conversation"
                            title="日常会話マスター"
                            desc="日常シーンの会話パターンを学ぶ。実際のネイティブ表現を場面別に整理。"
                        />
                        <NavCard
                            href="/english/eikaiwa-lab"
                            title="英会話Lab"
                            desc="DMM英会話の15レッスンプラン。ChatGPTコピー機能で予習ワークフロー。セッションログ記録。"
                        />
                    </div>
                </Section>

                {/* ── TOOLS ── */}
                <Section title="ツール / リファレンス" sub="TOOLS -- 辞書・分析・練習" accent={T.green}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                        <NavCard
                            href="/english/tonio-words"
                            title="TONIO WORDS"
                            desc="10,000語ブラウザ。レベル別に単語を探索。Talk Modeで会話練習。"
                        />
                        <NavCard
                            href="/english/vocabulary"
                            title="ボキャブラリー"
                            desc="自分で追加した単語・フレーズの管理。マスタリーレベルで進捗を追跡。"
                        />
                        <NavCard
                            href="/english/everyday-words"
                            title="日常英単語"
                            desc="毎日5単語ずつ学ぶ。200日分のコンテンツ。類義語・例文付き。"
                        />
                        <NavCard
                            href="/english/nihongo"
                            title="日本語から学ぶ"
                            desc="日本語の表現から英語への変換パターンを学ぶ。日本語脳から英語脳への橋渡し。"
                        />
                        <NavCard
                            href="/english/self-master"
                            title="セルフマスター"
                            desc="自分で話す練習。トピック別のスピーキング課題。録音して振り返り。"
                        />
                        <NavCard
                            href="/english/speaking-guide"
                            title="スピーキングガイド"
                            desc="ネイティブの音声構造を分析した7つのルールと10の会話パターン。D3ビジュアライゼーション付き。"
                        />
                    </div>
                </Section>

                {/* ── DEV STATUS ── */}
                <Section title="開発状況" sub="DEV STATUS -- 現在の進捗" accent={T.textMuted}>
                    <div style={{
                        backgroundColor: T.surface, borderRadius: 14, padding: 24,
                        boxShadow: T.shadow, border: '1px solid #E7E5E4',
                    }}>
                        <p style={{ fontSize: 13, color: T.textSub, lineHeight: 2, margin: '0 0 16px' }}>
                            このアプリはまだ<span style={{ fontWeight: 700, color: T.gold }}>全体の10分の1</span>もできてない。<br />
                            毎日何かが増える。毎日何かが壊れる。毎日何かが直る。<br />
                            完成を待ってたら永遠に喋れない。だから今のまま公開してる。
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {[
                                { label: 'Training', done: true },
                                { label: 'Quest', done: true },
                                { label: 'Slot Machine', done: true },
                                { label: 'Puzzle Battle', done: true },
                                { label: 'Mario Runner', done: true },
                                { label: 'Arena', done: true },
                                { label: 'Memoria', done: true },
                                { label: 'Requiem', done: true },
                                { label: 'Card Collection', done: true },
                                { label: 'Dashboard', done: true },
                                { label: 'Goroku', done: true },
                                { label: 'Pro', done: true },
                                { label: 'Eikaiwa Lab', done: true },
                                { label: 'Speaking Guide', done: true },
                                { label: 'World Map', done: true },
                                { label: 'Voice Lab', done: false },
                                { label: 'AI Tutor', done: false },
                                { label: 'Multiplayer', done: false },
                                { label: 'Guild System', done: false },
                                { label: 'Achievement', done: false },
                                { label: 'Story Mode', done: false },
                                { label: 'PvP Battle', done: false },
                                { label: 'Leaderboard', done: false },
                                { label: 'Daily Quest', done: false },
                            ].map((item) => (
                                <span key={item.label} style={{
                                    fontSize: 10, padding: '4px 10px', borderRadius: 6,
                                    backgroundColor: item.done ? T.green + '12' : '#F5F5F4',
                                    color: item.done ? T.green : T.textMuted,
                                    fontWeight: 600, letterSpacing: '0.03em',
                                    border: `1px solid ${item.done ? T.green + '30' : '#E7E5E4'}`,
                                }}>
                                    {item.done ? 'LIVE' : 'SOON'} {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid #E7E5E4' }}>
                    <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 8 }}>
                        ENGLISH QUEST RPG -- TONIO LAB
                    </div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>
                        Built with Vibe Coding + Claude AI
                    </div>
                </div>
            </div>
        </div>
    );
}
