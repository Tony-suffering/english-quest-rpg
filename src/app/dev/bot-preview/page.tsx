'use client';

import { useState, useMemo } from 'react';
import { findNode, pickEntryFromText, pickRandomEntry } from '@/lib/bot-engine';
import { CHARACTER_LABEL, BotNode } from '@/data/bot/types';
import { ENTRY_NODE_IDS, SKIT_NODES } from '@/data/bot/skits';

interface ChatLine {
    id: string;
    side: 'bot' | 'user';
    nodeId?: string;
    character?: string;
    text: string;
    quickReplies?: { label: string; nextNodeId: string }[];
}

const CHARACTER_BG: Record<string, string> = {
    gondo: '#FFFBEB',
    yuki: '#EFF6FF',
    takeshi: '#F5F3FF',
    lisa: '#FDF2F8',
    kenji: '#ECFDF5',
    mina: '#FFF7ED',
    system: '#F5F5F4',
};

function nodeToChatLine(node: BotNode): ChatLine {
    const label = CHARACTER_LABEL[node.character];
    const text = label
        ? [label, ...node.lines.map(l => `「${l}」`)].join('\n')
        : node.lines.join('\n');
    return {
        id: `${node.id}-${Date.now()}-${Math.random()}`,
        side: 'bot',
        nodeId: node.id,
        character: node.character,
        text,
        quickReplies: node.quickReplies,
    };
}

export default function BotPreviewPage() {
    const [lines, setLines] = useState<ChatLine[]>([
        nodeToChatLine(pickRandomEntry(String(Date.now()))),
    ]);
    const [input, setInput] = useState('');

    const stats = useMemo(() => ({
        total: SKIT_NODES.length,
        entries: ENTRY_NODE_IDS.length,
    }), []);

    const pushUser = (text: string) => {
        setLines(prev => [...prev, { id: `u-${Date.now()}`, side: 'user', text }]);
    };
    const pushBot = (node: BotNode) => {
        setLines(prev => [...prev, nodeToChatLine(node)]);
    };

    const handleQuickReply = (nextNodeId: string, label: string) => {
        pushUser(label);
        if (nextNodeId === 'random') {
            pushBot(pickRandomEntry(String(Date.now())));
            return;
        }
        const node = findNode(nextNodeId);
        if (node) pushBot(node);
    };

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        pushUser(text);
        pushBot(pickEntryFromText(text));
        setInput('');
    };

    const handleRandom = () => {
        pushUser('(別のネタ)');
        pushBot(pickRandomEntry(String(Date.now())));
    };

    const handleReset = () => {
        setLines([nodeToChatLine(pickRandomEntry(String(Date.now())))]);
    };

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-xl mx-auto px-4 py-6">
                <div className="flex items-center mb-4">
                    <div>
                        <h1 className="text-lg font-medium text-stone-800 tracking-wider">居酒屋 LINE bot プレビュー</h1>
                        <p className="text-xs text-stone-500">{stats.total} ノード / {stats.entries} エントリー</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                        <button onClick={handleRandom} className="text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100">ランダム</button>
                        <button onClick={handleReset} className="text-xs px-3 py-1.5 rounded-lg bg-stone-800 text-white hover:bg-stone-700">リセット</button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-4 min-h-[60vh] mb-4">
                    <div className="space-y-3">
                        {lines.map(line => (
                            <div key={line.id} className={line.side === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                                <div
                                    className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border border-stone-100"
                                    style={{
                                        backgroundColor: line.side === 'user' ? '#06C755' : (line.character ? CHARACTER_BG[line.character] : '#F5F5F4'),
                                        color: line.side === 'user' ? '#fff' : '#44403C',
                                    }}
                                >
                                    <pre className="whitespace-pre-wrap font-sans">{line.text}</pre>
                                    {line.quickReplies && line.quickReplies.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {line.quickReplies.map((qr, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleQuickReply(qr.nextNodeId, qr.label)}
                                                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-stone-300 hover:bg-stone-50 text-stone-700"
                                                >
                                                    {qr.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder="自由入力でテスト (例: 疲れた / 会議 / 年齢)"
                        className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-stone-400"
                    />
                    <button onClick={handleSend} className="px-5 py-2.5 text-sm rounded-xl bg-stone-800 text-white hover:bg-stone-700">送信</button>
                </div>

                <div className="mt-6 text-xs text-stone-500 space-y-1">
                    <p>このページはローカル simulator。実 LINE 送信なし</p>
                    <p>本番: LINE のクイックリプライボタン → /api/line-webhook で同じ flow が動く</p>
                </div>
            </div>
        </div>
    );
}
