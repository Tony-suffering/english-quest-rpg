'use client';

import { useState } from 'react';
import Link from 'next/link';

type Status = 'done' | 'active' | 'next' | 'planned';

interface Task {
    id: string;
    title: string;
    detail: string;
    status: Status;
    link?: string;
}

interface Phase {
    id: string;
    title: string;
    goal: string;
    tasks: Task[];
}

const STATUS_META: Record<Status, { label: string; color: string; bg: string; border: string }> = {
    done: { label: '完了', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
    active: { label: '作業中', color: '#D4AF37', bg: '#FFFBEB', border: '#FDE68A' },
    next: { label: '次', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
    planned: { label: '予定', color: '#78716C', bg: '#F5F5F4', border: '#E7E5E4' },
};

// ── 現状のRPGシステム全体像 ──────────────────────────────────
// Training: パズルボードバトル + ガチャ + カード進化 + 録音 ← メインエンジン
// Requiem: シナリオ付きワードレビュー（6シナリオ、各50語）
// Arena: クイズバトル + 5v5カードバトル + ブラックジャック
// Card Preview: カードコレクション（3Dチルト、ランク、BST、レーダーチャート）
// World Map: ステージマーカー + ルート + バッジシステム
// XP Guide: 進化システム説明
// Fujin Story: パズルボード勝利→AI会話生成
// Goroku: 俺語録（日常表現カレンダー）

const PHASES: Phase[] = [
    {
        id: '0',
        title: '現状の棚卸し -- 既に動いてるもの',
        goal: '何ができてて何が足りないか正直に把握する。嘘つかない。',
        tasks: [
            {
                id: '0-1', status: 'done',
                title: 'Training: パズルボードバトル',
                detail: '2x2/3x3/4x4グリッド、ボス戦（10種）、シナジーシステム（属性/ランク/BST/SP）、GP獲得。月別リセット。',
                link: '/english/training',
            },
            {
                id: '0-2', status: 'done',
                title: 'Training: 9段階ガチャ',
                detail: '凡→PHANTOM。確変/激熱/神モード。パチンコ風演出。GPでカードレベルアップ。',
            },
            {
                id: '0-3', status: 'done',
                title: 'カード進化システム',
                detail: 'EGG→MASTER 7段階チャクラ。NORMAL→LEGENDARY 6段階ランク。BST種族値(6ステータス)。属性5種。',
            },
            {
                id: '0-4', status: 'done',
                title: 'Requiem: シナリオワードレビュー',
                detail: '6シナリオ(party/monster/mariners/movie/gamenight/antiques)。各50語。カレンダーUI。完了チェック。',
                link: '/english/requiem',
            },
            {
                id: '0-5', status: 'done',
                title: 'Arena: クイズ + 5v5カードバトル',
                detail: 'クイズ4種(意味/逆引き/穴埋め/リスニング)。5v5で4軸比較(属性/BST/チャクラ/SP)。',
                link: '/english/arena',
            },
            {
                id: '0-6', status: 'done',
                title: 'カードコレクション',
                detail: '3Dチルト、ホロ効果、レーダーチャート、フレーバーテキスト100種。ソート/フィルター。',
                link: '/english/training/card-preview',
            },
            {
                id: '0-7', status: 'done',
                title: 'XP ガイド（基本説明）',
                detail: '進化段階、カードランク、プレイヤーレベル、ガチャ確率、チェインモード。',
                link: '/english/xp-guide',
            },
            {
                id: '0-8', status: 'done',
                title: '会話ガチャ (Fujin Story)',
                detail: 'パズルボード勝利→AI会話自動生成→表現抽出。ストーリーギャラリー。',
                link: '/english/fujin-story',
            },
        ],
    },
    {
        id: 'A',
        title: 'World Map -- タウンマップ',
        goal: '「今どこにいて、次どこ行くか」が一目でわかる。ポケモンのタウンマップ。',
        tasks: [
            {
                id: 'A1', status: 'done',
                title: 'ドットマトリクス世界地図',
                detail: 'D3ズーム/パン対応。木目調テクスチャ。日本中心。',
                link: '/english/world-map',
            },
            {
                id: 'A2', status: 'done',
                title: 'ステージマーカー6個',
                detail: '東京→LA→シアトル→NYC→ロンドン→パリ。完了=緑/現在=金パルス/ロック=灰色。',
            },
            {
                id: 'A3', status: 'done',
                title: 'ルート線 + ステージ詳細カード',
                detail: '曲線パス3状態。タップで詳細（シナリオ名、進捗バー、Trainingリンク）。',
            },
            {
                id: 'A4', status: 'done',
                title: 'ジムバッジシステム',
                detail: '6種バッジ（火/幽霊/野球/映画/サイコロ/王冠）。コレクションパネル。',
            },
            {
                id: 'A5', status: 'planned',
                title: 'ステージ解放演出',
                detail: '新ステージ解放時のアニメーション。ルートが金色に光って次の都市が出現。',
            },
        ],
    },
    {
        id: 'B',
        title: 'Quest -- 冒険モード（ポケモンのストーリー）',
        goal: 'Questページがない=RPGの根幹がない。フレーズに出会い→捕まえ→育てるループ。',
        tasks: [
            {
                id: 'B1', status: 'done',
                title: 'Quest冒険ページ新規作成',
                detail: 'ステージ選択→シナリオ導入→フレーズとのエンカウント→クイズで捕獲→ジムリーダー戦。/english/quest。',
                link: '/english/quest',
            },
            {
                id: 'B2', status: 'done',
                title: 'エンカウントシステム',
                detail: '草むら風UI。フレーズが「Wild phrase appeared!」で出現。4択クイズで捕獲。正解=GET。',
            },
            {
                id: 'B3', status: 'done',
                title: 'ジムリーダー戦',
                detail: 'シナリオキャラがジムリーダー。5問中3問正解→バッジGET。不正解→再挑戦。',
            },
            {
                id: 'B4', status: 'next',
                title: '捕獲演出',
                detail: 'フレーズGET時のアニメーション。カードが光ってコレクションに追加される演出。',
            },
        ],
    },
    {
        id: 'C',
        title: 'RPG説明書 -- 遊び方ガイド',
        goal: '初めて来た人が30秒で「あ、こうやって遊ぶのね」とわかる。ポケモンの冒頭説明。',
        tasks: [
            {
                id: 'C1', status: 'done',
                title: 'RPGガイドページ新規作成',
                detail: 'ゲームの全体像、遊び方フロー、各ページの役割を1ページで説明。7セクション。',
                link: '/english/rpg-guide',
            },
            {
                id: 'C2', status: 'done',
                title: 'ゲームループ図解',
                detail: 'Quest(捕まえる)→Training(育てる)→Arena(戦う)→World Map(進む) の循環を視覚的に。',
            },
            {
                id: 'C3', status: 'next',
                title: '初回オンボーディング',
                detail: '初アクセス時: 「冒険に出る→フレーズを捕まえる→毎日鍛える→英語の神になる」30秒ガイド。',
            },
        ],
    },
    {
        id: 'D',
        title: 'ゲームループ接続',
        goal: '各ページがバラバラじゃなく、ポケモンみたいに自然につながる。',
        tasks: [
            {
                id: 'D1', status: 'planned',
                title: 'Quest→Training自動遷移',
                detail: 'QuestでGETしたフレーズが即Trainingに出現。「新しいカードを手に入れた!」',
            },
            {
                id: 'D2', status: 'planned',
                title: 'Training→Arena連携',
                detail: 'カードが育ったら「バトルに挑戦!」のCTA。強くなった実感。',
            },
            {
                id: 'D3', status: 'planned',
                title: 'Arena→World Map進捗反映',
                detail: 'バトル勝利でステージ進捗が進む。マップが塗り替わっていく達成感。',
            },
            {
                id: 'D4', status: 'planned',
                title: 'ミニマップ（全ページ共通）',
                detail: 'Training/Quest/Arenaの上部に「Stage 3 / シアトル / 23/50」のミニステータス。',
            },
        ],
    },
    {
        id: 'E',
        title: 'コンテンツ拡充',
        goal: 'Stage 7-10のシナリオ追加。全10ステージ500語。',
        tasks: [
            {
                id: 'E1', status: 'planned',
                title: 'Stage 7-10: 新シナリオ4本',
                detail: '高校初日/ベビーシャワー/同窓会/給料交渉。各50語+Memoria+Expressions。',
            },
            {
                id: 'E2', status: 'planned',
                title: 'ジムリーダーキャラ設定',
                detail: '各ステージに個性的なジムリーダー。属性タイプ持ち。勝利条件も異なる。',
            },
        ],
    },
    {
        id: 'F',
        title: 'Everyday Words -- 根拠のある英単語帳',
        goal: '初心者向け。realizeレベルから。市販の単語帳とは全く違う角度。楽しくて使える。',
        tasks: [
            {
                id: 'F1', status: 'done',
                title: 'UIリデザイン: カレンダー→単語帳スタイル',
                detail: 'ユニット型ナビ + 単語カード展開 + 進捗バー + カテゴリフィルター + TTS再生。',
                link: '/english/everyday-words',
            },
            {
                id: 'F2', status: 'active',
                title: 'コンテンツ全面書き換え: 内装用語→汎用初心者向け',
                detail: '現データ5000語が内装専門(attic/vestibule/wainscoting)。realizeレベルの日常語に入替。頻度+日本人あるある視点。',
            },
            {
                id: 'F3', status: 'next',
                title: '「なぜこの語？」根拠セクション追加',
                detail: '各単語に「日本人が知らない理由」「ネイティブ使用頻度」「よくある間違い」を追加。市販にない角度。',
            },
            {
                id: 'F4', status: 'planned',
                title: 'ゲーミフィケーション要素',
                detail: 'ユニットクリアで称号/バッジ。連続学習ストリーク。RPG本体との連携（単語→カード化）。',
            },
        ],
    },
];

export default function StrategyPage() {
    const [expandedPhase, setExpandedPhase] = useState<string | null>('F');

    const totalTasks = PHASES.reduce((sum, p) => sum + p.tasks.length, 0);
    const doneTasks = PHASES.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0);
    const activeTasks = PHASES.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'active').length, 0);
    const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '24px' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1C1917', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                        RPG Strategy
                    </h1>
                    <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.6 }}>
                        English Quest RPG のロードマップ。ポケモンモデルで英語学習をゲーム化する。
                        このページ自体がソースコード -- ステータス更新 = 進捗反映。
                    </p>
                    <div style={{
                        marginTop: '12px', padding: '10px 14px', backgroundColor: '#FFFBEB',
                        border: '1px solid #FDE68A', borderRadius: '8px',
                        fontSize: '12px', color: '#92400E', lineHeight: 1.6,
                    }}>
                        現在の課題: Everyday Wordsの中身が内装用語5000語 → 初心者向けrealizeレベルに全面書き換え中。
                        根拠のある英単語帳 = 市販と全く違う角度。
                    </div>
                </div>

                {/* Overall progress */}
                <div style={{
                    background: 'linear-gradient(135deg, #1C1917, #292524)',
                    borderRadius: '16px', padding: '20px 24px', marginBottom: '24px',
                    border: '1px solid rgba(212,175,55,0.1)',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px' }}>OVERALL</span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '700' }}>{doneTasks} done</span>
                            <span style={{ fontSize: '12px', color: '#D4AF37', fontWeight: '700' }}>{activeTasks} active</span>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: '600' }}>{totalTasks} total</span>
                        </div>
                    </div>
                    <div style={{ height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%', width: `${progressPct}%`, borderRadius: '4px',
                            background: 'linear-gradient(90deg, #10B981, #D4AF37)',
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: '900', color: '#FAFAF9', marginTop: '8px' }}>
                        {progressPct}%
                    </div>
                </div>

                {/* Phases */}
                {PHASES.map(phase => {
                    const isExpanded = expandedPhase === phase.id;
                    const phaseDone = phase.tasks.filter(t => t.status === 'done').length;
                    const phaseTotal = phase.tasks.length;
                    const phaseActive = phase.tasks.some(t => t.status === 'active');
                    const phasePct = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;

                    return (
                        <div key={phase.id} style={{
                            marginBottom: '12px', borderRadius: '14px', overflow: 'hidden',
                            border: phaseActive ? '1px solid rgba(212,175,55,0.3)' : '1px solid #E7E5E4',
                            backgroundColor: '#fff',
                            boxShadow: phaseActive ? '0 2px 12px rgba(212,175,55,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                        }}>
                            <button
                                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                                style={{
                                    width: '100%', padding: '16px 20px', border: 'none', cursor: 'pointer',
                                    backgroundColor: 'transparent', textAlign: 'left',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <span style={{
                                            fontSize: '12px', fontWeight: '900', color: '#D4AF37',
                                            width: '24px', height: '24px', borderRadius: '6px',
                                            backgroundColor: 'rgba(212,175,55,0.1)', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                        }}>{phase.id}</span>
                                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#1C1917' }}>{phase.title}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#78716C', marginLeft: '32px' }}>{phase.goal}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '12px', fontWeight: '700', color: phasePct === 100 ? '#10B981' : '#78716C' }}>
                                        {phaseDone}/{phaseTotal}
                                    </span>
                                    <span style={{ fontSize: '14px', color: '#A8A29E', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                                        &#9660;
                                    </span>
                                </div>
                            </button>

                            <div style={{ padding: '0 20px', marginBottom: isExpanded ? '0' : '12px' }}>
                                <div style={{ height: '4px', borderRadius: '2px', backgroundColor: '#F5F5F4', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', width: `${phasePct}%`, borderRadius: '2px',
                                        backgroundColor: phasePct === 100 ? '#10B981' : '#D4AF37',
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                            </div>

                            {isExpanded && (
                                <div style={{ padding: '8px 20px 16px' }}>
                                    {phase.tasks.map(task => {
                                        const sm = STATUS_META[task.status];
                                        return (
                                            <div key={task.id} style={{
                                                display: 'flex', gap: '12px', padding: '10px 0',
                                                borderTop: '1px solid #F5F5F4',
                                            }}>
                                                <span style={{
                                                    fontSize: '10px', fontWeight: '700', padding: '2px 8px',
                                                    borderRadius: '4px', backgroundColor: sm.bg,
                                                    color: sm.color, border: `1px solid ${sm.border}`,
                                                    whiteSpace: 'nowrap', height: 'fit-content', marginTop: '2px',
                                                }}>
                                                    {sm.label}
                                                </span>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
                                                        fontSize: '13px', fontWeight: '600',
                                                        color: task.status === 'done' ? '#A8A29E' : '#1C1917',
                                                        textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                                    }}>
                                                        {task.id}: {task.title}
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: '#78716C', marginTop: '2px', lineHeight: 1.5 }}>
                                                        {task.detail}
                                                    </div>
                                                    {task.link && (
                                                        <Link href={task.link} style={{
                                                            fontSize: '11px', color: '#D4AF37', textDecoration: 'none',
                                                            fontWeight: 600, marginTop: '4px', display: 'inline-block',
                                                        }}>
                                                            {task.link} →
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Game Flow Diagram */}
                <div style={{
                    marginTop: '24px', padding: '20px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #1C1917, #292524)',
                    border: '1px solid rgba(212,175,55,0.15)',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '16px' }}>
                        GAME LOOP
                    </div>
                    {[
                        { step: 'Quest', desc: 'フレーズを捕まえる', color: '#EF4444', icon: '1' },
                        { step: 'Training', desc: 'カードを育てる', color: '#D4AF37', icon: '2' },
                        { step: 'Arena', desc: 'バトルで試す', color: '#3B82F6', icon: '3' },
                        { step: 'World Map', desc: '次のステージへ進む', color: '#10B981', icon: '4' },
                    ].map((item, i) => (
                        <div key={i}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                                <div style={{
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    backgroundColor: item.color, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontSize: '12px', fontWeight: 900,
                                }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#FAFAF9' }}>{item.step}</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginLeft: '8px' }}>{item.desc}</span>
                                </div>
                            </div>
                            {i < 3 && (
                                <div style={{ marginLeft: '14px', height: '16px', borderLeft: '2px dashed rgba(255,255,255,0.15)' }} />
                            )}
                        </div>
                    ))}
                    <div style={{
                        marginTop: '12px', padding: '8px 12px',
                        backgroundColor: 'rgba(212,175,55,0.1)', borderRadius: '6px',
                        fontSize: '11px', color: '#D4AF37', textAlign: 'center',
                    }}>
                        ↑ ループ ↑
                    </div>
                </div>

                {/* Legend */}
                <div style={{
                    marginTop: '16px', padding: '16px 20px', borderRadius: '12px',
                    backgroundColor: '#fff', border: '1px solid #E7E5E4',
                }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {Object.entries(STATUS_META).map(([key, m]) => (
                            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: '700', padding: '2px 8px',
                                    borderRadius: '4px', backgroundColor: m.bg, color: m.color,
                                    border: `1px solid ${m.border}`,
                                }}>{m.label}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '10px', lineHeight: 1.6 }}>
                        更新: src/app/english/strategy/page.tsx
                    </div>
                </div>
            </div>
        </div>
    );
}
