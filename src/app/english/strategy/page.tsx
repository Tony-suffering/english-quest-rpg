'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ── 戦略データ ───────────────────────────────────────────────
// このファイルを更新 = 戦略が更新される
// ステータス: done / active / next / planned

type Status = 'done' | 'active' | 'next' | 'planned';

interface Task {
    id: string;
    title: string;
    detail: string;
    status: Status;
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

const PHASES: Phase[] = [
    {
        id: 'A',
        title: 'World Map をゲームのハブにする',
        goal: '「今どこにいて、次どこ行くか」が一目でわかる。ポケモンのタウンマップ。',
        tasks: [
            {
                id: 'A1', status: 'done',
                title: '世界地図の表示（D3 + TopoJSON）',
                detail: 'map-4ベースの木目調ワールドマップ。ズーム・パン対応。',
            },
            {
                id: 'A2', status: 'done',
                title: 'ステージマーカー10個配置',
                detail: 'Tokyo→LA→London→...→Mt.Everest。完了/現在/ロック3状態。',
            },
            {
                id: 'A3', status: 'done',
                title: 'ルート線（ステージ間の接続）',
                detail: '曲線パス。完了=緑実線、進行中=金点線アニメ、ロック=灰色。',
            },
            {
                id: 'A4', status: 'done',
                title: 'ステージ詳細カード',
                detail: 'ホバー/タップで都市名、ハック説明、進捗バー、コアワード表示。',
            },
            {
                id: 'A5', status: 'active',
                title: 'ジムバッジシステム',
                detail: 'ステージクリア（全フレーズGET）でバッジ獲得。マップ上に表示。クリア条件を明確に。',
            },
            {
                id: 'A6', status: 'next',
                title: 'ステージ解放演出',
                detail: '新ステージ解放時のアニメーション。ルートが金色に光って次の都市が出現。',
            },
            {
                id: 'A7', status: 'planned',
                title: 'ミニマップ（他ページに埋め込み）',
                detail: 'Training/Questページの上部に小さいマップ進捗バーを表示。現在地の意識を常に。',
            },
        ],
    },
    {
        id: 'B',
        title: 'Collection を図鑑にする',
        goal: '「全部集めたい」欲を刺激する。未GETはシルエット、ステージ別表示。',
        tasks: [
            {
                id: 'B1', status: 'done',
                title: 'カード表示（3Dチルト、ランク、BST）',
                detail: 'NORMAL→LEGENDARY 6段階。ホログラフィック効果。レーダーチャート。',
            },
            {
                id: 'B2', status: 'done',
                title: 'ダッシュボード（統計）',
                detail: '総カード数、SP合計、ランク分布バー、レアカウント、最高ランクカード。',
            },
            {
                id: 'B3', status: 'done',
                title: 'threshold修正（Training側と一致）',
                detail: '250/100/50/20/5 に統一。',
            },
            {
                id: 'B4', status: 'next',
                title: '未GETカードのシルエット表示',
                detail: 'ポケモン図鑑の「???」。全1000フレーズを表示、GETしてないものは暗転。',
            },
            {
                id: 'B5', status: 'planned',
                title: 'ステージ別グループ化',
                detail: 'Stage 1: 15/100 GET のようにセクション分け。各ステージのハックタイトル付き。',
            },
            {
                id: 'B6', status: 'planned',
                title: 'フィルター強化（属性・チャクラ・ステージ）',
                detail: '属性相性の視覚化。チャクラレベル別フィルター追加。',
            },
        ],
    },
    {
        id: 'C',
        title: 'Quest ↔ Training ループの強化',
        goal: '「もっとGETしたい」「もっとTrainingしたい」の循環を作る。',
        tasks: [
            {
                id: 'C1', status: 'planned',
                title: 'Training上部にステージ進捗サマリー',
                detail: '「Stage 3: HAVEの魔法 — 23/100 GET [続きへ]」みたいなCTA。',
            },
            {
                id: 'C2', status: 'planned',
                title: 'Quest完了時の報酬演出',
                detail: 'ステージ全GET → バッジ獲得演出 → 「次のステージが解放された！」',
            },
            {
                id: 'C3', status: 'planned',
                title: '初回オンボーディング（30秒）',
                detail: '初アクセス時: 「フレーズをGET → 毎日Training → 英語の神になる」の3ステップ説明。',
            },
        ],
    },
    {
        id: 'D',
        title: 'コンテンツ拡充',
        goal: 'Stage 4-10に実フレーズを追加。1000フレーズ完成。',
        tasks: [
            {
                id: 'D1', status: 'planned',
                title: 'Stage 4: DO/MAKE（100フレーズ）',
                detail: 'doは「行動」、makeは「変化を生む」。日常会話の40%。',
            },
            {
                id: 'D2', status: 'planned',
                title: 'Stage 5-10（各100フレーズ）',
                detail: 'PUT/TAKE, GO/COME, Filler Magic, Question Hacks, Emotion Express, Final.',
            },
        ],
    },
];

// ── Component ─────────────────────────────────────────────────
export default function StrategyPage() {
    const [expandedPhase, setExpandedPhase] = useState<string | null>('A');

    const totalTasks = PHASES.reduce((sum, p) => sum + p.tasks.length, 0);
    const doneTasks = PHASES.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0);
    const activeTasks = PHASES.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'active').length, 0);
    const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '24px' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1C1917', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                        RPG Strategy
                    </h1>
                    <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.6 }}>
                        ポケモンモデルに基づくロードマップ。このページ自体がソースコードなので、タスクのステータスを更新すれば進捗が反映される。
                    </p>
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
                            {/* Phase header */}
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

                            {/* Phase progress bar */}
                            <div style={{ padding: '0 20px', marginBottom: isExpanded ? '0' : '12px' }}>
                                <div style={{ height: '4px', borderRadius: '2px', backgroundColor: '#F5F5F4', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', width: `${phasePct}%`, borderRadius: '2px',
                                        backgroundColor: phasePct === 100 ? '#10B981' : '#D4AF37',
                                        transition: 'width 0.3s ease',
                                    }} />
                                </div>
                            </div>

                            {/* Tasks */}
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
                                                <div>
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
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Legend */}
                <div style={{
                    marginTop: '24px', padding: '16px 20px', borderRadius: '12px',
                    backgroundColor: '#fff', border: '1px solid #E7E5E4',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#A8A29E', letterSpacing: '1px', marginBottom: '10px' }}>STATUS</div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {Object.entries(STATUS_META).map(([key, m]) => (
                            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: '700', padding: '2px 8px',
                                    borderRadius: '4px', backgroundColor: m.bg, color: m.color,
                                    border: `1px solid ${m.border}`,
                                }}>{m.label}</span>
                                <span style={{ fontSize: '11px', color: '#78716C' }}>
                                    {key === 'done' ? '完了' : key === 'active' ? '今やってる' : key === 'next' ? '次にやる' : 'いつかやる'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A8A29E', marginTop: '12px', lineHeight: 1.6 }}>
                        更新方法: src/app/english/strategy/page.tsx の PHASES 配列のステータスを変更
                    </div>
                </div>
            </div>
        </div>
    );
}
