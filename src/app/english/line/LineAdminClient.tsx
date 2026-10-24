'use client';

import { useEffect, useMemo, useState } from 'react';
import { FlexPreview } from '@/components/line/FlexPreview';
import { LINE_TEMPLATES } from '@/data/line-templates';
import LineCalendar from './LineCalendar';

const CATEGORY_LABEL: Record<string, string> = {
    wanted: '指名手配',
    clinic: 'クリニック',
    death: '死因',
    lies: '嘘',
    toeic: 'TOEIC',
    syndrome: '症候群',
    intro: '前置き',
    misc: 'その他',
};

const CATEGORY_COLOR: Record<string, string> = {
    wanted: '#1c1917',
    clinic: '#7F1D1D',
    death: '#991B1B',
    lies: '#7C3AED',
    toeic: '#0891B2',
    syndrome: '#9A3412',
    intro: '#525252',
    misc: '#888888',
};

interface Item {
    id: number;
    type: string;
    title: string;
    body: string | null;
    status: string;
    rating: number | null;
    priority: number;
    sent_at: string | null;
    created_at: string;
    updated_at: string;
}

type TabKey = 'broadcast' | 'todo' | 'note' | 'calendar';

const TABS: { key: TabKey; label: string }[] = [
    { key: 'calendar', label: 'カレンダー' },
    { key: 'broadcast', label: '配信' },
    { key: 'todo', label: 'TODO' },
    { key: 'note', label: 'メモ' },
];

const TODO_TYPES = new Set(['todo', 'problem', 'idea']);

const TYPE_COLOR: Record<string, string> = {
    broadcast: '#0891B2',
    todo: '#9A3412',
    problem: '#9A3412',
    idea: '#9A3412',
    note: '#525252',
};

const STATUS_LABEL: Record<string, string> = {
    open: '未着手',
    done: '完了',
    sent: '配信済',
    rated: '評価済',
};


export default function LineAdminClient({ initialItems }: { initialItems: Item[] }) {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [tab, setTab] = useState<TabKey>('calendar');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Item | null>(null);
    const [form, setForm] = useState({
        type: 'todo',
        title: '',
        body: '',
        status: 'open',
        rating: null as number | null,
        sent_at: '',
    });

    const [selectedTemplateId, setSelectedTemplateId] = useState(LINE_TEMPLATES[0].id);
    const [flexInput, setFlexInput] = useState(JSON.stringify(LINE_TEMPLATES[0].messages, null, 2));
    const [broadcastTitle, setBroadcastTitle] = useState(LINE_TEMPLATES[0].label);
    const [sending, setSending] = useState(false);
    const [sendResult, setSendResult] = useState<string | null>(null);
    const [editorOpen, setEditorOpen] = useState(false);

    // カレンダーから配信タブへ飛ぶ際の prefill (テンプレ id + 日付)
    const [broadcastPrefill, setBroadcastPrefill] = useState<{ date: string; templateId: string } | null>(null);

    const applyTemplate = (id: string) => {
        const tpl = LINE_TEMPLATES.find(t => t.id === id);
        if (!tpl) return;
        setSelectedTemplateId(id);
        setFlexInput(JSON.stringify(tpl.messages, null, 2));
        setBroadcastTitle(tpl.label);
        setSendResult(null);
    };

    // prefill が来たら一度だけ反映してクリア
    useEffect(() => {
        if (tab !== 'broadcast' || !broadcastPrefill) return;
        if (broadcastPrefill.templateId) {
            applyTemplate(broadcastPrefill.templateId);
        }
        setBroadcastPrefill(null);
    }, [tab, broadcastPrefill]);

    const handleSwitchToBroadcast = (date: string, templateId?: string) => {
        setBroadcastPrefill({ date, templateId: templateId ?? '' });
        setTab('broadcast');
    };

    const parsedMessages = useMemo(() => {
        try {
            const parsed = JSON.parse(flexInput);
            if (!Array.isArray(parsed)) return { ok: false, error: 'JSONは配列で', messages: [] as any[] };
            return { ok: true, messages: parsed as any[], error: null };
        } catch (e) {
            return { ok: false, error: String((e as Error).message), messages: [] as any[] };
        }
    }, [flexInput]);

    const filteredItems = useMemo(() => {
        if (tab === 'calendar') return [] as Item[];
        return items.filter(it => {
            if (tab === 'broadcast') return it.type === 'broadcast';
            if (tab === 'todo') return TODO_TYPES.has(it.type);
            if (tab === 'note') return it.type === 'note';
            return true;
        });
    }, [items, tab]);

    const tabCounts = useMemo(() => ({
        calendar: items.filter(it => it.type === 'broadcast').length,
        broadcast: items.filter(it => it.type === 'broadcast').length,
        todo: items.filter(it => TODO_TYPES.has(it.type)).length,
        note: items.filter(it => it.type === 'note').length,
    }), [items]);

    const refresh = async () => {
        const res = await fetch('/api/line-admin/items');
        const data = await res.json();
        if (data.success) setItems(data.items);
    };

    const startCreate = () => {
        setEditing(null);
        const defaultType = tab === 'note' ? 'note' : tab === 'todo' ? 'todo' : 'broadcast';
        setForm({
            type: defaultType,
            title: '',
            body: '',
            status: defaultType === 'broadcast' ? 'sent' : 'open',
            rating: null,
            sent_at: '',
        });
        setShowForm(true);
    };

    const startEdit = (item: Item) => {
        setEditing(item);
        setForm({
            type: item.type,
            title: item.title,
            body: item.body ?? '',
            status: item.status,
            rating: item.rating,
            sent_at: item.sent_at ?? '',
        });
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.title.trim()) return;
        const payload = {
            type: form.type,
            title: form.title.trim(),
            body: form.body.trim() || null,
            status: form.status,
            priority: 2,
            rating: form.rating,
            sent_at: form.sent_at || null,
        };
        if (editing) {
            await fetch(`/api/line-admin/items/${editing.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch('/api/line-admin/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        }
        setShowForm(false);
        await refresh();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('削除しますか?')) return;
        await fetch(`/api/line-admin/items/${id}`, { method: 'DELETE' });
        await refresh();
    };

    const handleQuickStatus = async (item: Item, newStatus: string) => {
        await fetch(`/api/line-admin/items/${item.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        await refresh();
    };

    const handleQuickRating = async (item: Item, newRating: number) => {
        await fetch(`/api/line-admin/items/${item.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: newRating, status: 'rated' }),
        });
        await refresh();
    };

    type SendTarget = 'dry' | 'test' | 'broadcast';

    const handleSend = async (mode: SendTarget) => {
        if (!parsedMessages.ok) {
            setSendResult(`JSON エラー: ${parsedMessages.error}`);
            return;
        }
        if (mode === 'broadcast' && !confirm(`全友だちに配信する? (${parsedMessages.messages.length}件・取消不可)`)) return;
        setSending(true);
        setSendResult(null);
        try {
            const res = await fetch('/api/line-broadcast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: parsedMessages.messages,
                    dryRun: mode === 'dry',
                    target: mode === 'broadcast' ? 'broadcast' : 'test',
                    title: broadcastTitle.trim() || null,
                }),
            });
            const data = await res.json();
            if (data.success) {
                if (mode === 'dry') setSendResult('dry-run OK (LINE には送られていない)');
                else if (mode === 'test') setSendResult('テスト送信 OK → LINE アプリ確認 (記録されない)');
                else setSendResult(`本配信成功 #${data.item?.id}`);
                if (mode === 'broadcast') {
                    setBroadcastTitle('');
                    await refresh();
                }
            } else {
                setSendResult(`失敗: ${data.error || res.status}`);
            }
        } catch (e) {
            setSendResult(`エラー: ${String(e)}`);
        } finally {
            setSending(false);
        }
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px', backgroundColor: '#fafaf9', minHeight: '100vh' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1c1917', letterSpacing: '0.05em' }}>LINE 管理</h1>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', borderBottom: '1px solid #e7e5e4', paddingBottom: '8px' }}>
                {TABS.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: tab === t.key ? '#1c1917' : '#ffffff',
                            color: tab === t.key ? '#ffffff' : '#525252',
                            fontSize: '13px',
                            fontWeight: tab === t.key ? 600 : 400,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        {t.label}
                        <span style={{
                            fontSize: '10px',
                            backgroundColor: tab === t.key ? '#525252' : '#f5f5f4',
                            color: tab === t.key ? '#ffffff' : '#888888',
                            padding: '2px 6px',
                            borderRadius: '10px',
                        }}>{tabCounts[t.key]}</span>
                    </button>
                ))}
                {tab !== 'calendar' && (
                    <button
                        onClick={startCreate}
                        style={{
                            marginLeft: 'auto',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#16A34A',
                            color: '#ffffff',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        + 追加
                    </button>
                )}
            </div>

            {tab === 'calendar' && (
                <LineCalendar items={items} onSwitchToBroadcast={handleSwitchToBroadcast} />
            )}

            {tab === 'broadcast' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#1c1917' }}>テンプレート</h2>
                                <span style={{ fontSize: '10px', color: '#888' }}>{LINE_TEMPLATES.length} 種類</span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {LINE_TEMPLATES.map(tpl => {
                                    const active = selectedTemplateId === tpl.id;
                                    const color = CATEGORY_COLOR[tpl.category];
                                    return (
                                        <button
                                            key={tpl.id}
                                            onClick={() => applyTemplate(tpl.id)}
                                            title={tpl.description}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '20px',
                                                border: active ? `1px solid ${color}` : '1px solid #e7e5e4',
                                                backgroundColor: active ? color : '#ffffff',
                                                color: active ? '#ffffff' : '#525252',
                                                fontSize: '12px',
                                                fontWeight: active ? 600 : 400,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '9px',
                                                padding: '1px 5px',
                                                borderRadius: '8px',
                                                backgroundColor: active ? 'rgba(255,255,255,0.2)' : color,
                                                color: '#ffffff',
                                                fontWeight: 600,
                                            }}>{CATEGORY_LABEL[tpl.category]}</span>
                                            {tpl.label}
                                            <span style={{ fontSize: '10px', opacity: 0.7 }}>{tpl.version}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '14px' }}>
                            <input
                                value={broadcastTitle}
                                onChange={e => setBroadcastTitle(e.target.value)}
                                placeholder="配信タイトル"
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d6d3d1', fontSize: '13px', marginBottom: '10px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => handleSend('dry')}
                                    disabled={sending || !parsedMessages.ok}
                                    style={{
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #d6d3d1',
                                        backgroundColor: '#ffffff',
                                        color: '#525252',
                                        cursor: sending || !parsedMessages.ok ? 'not-allowed' : 'pointer',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        opacity: sending || !parsedMessages.ok ? 0.5 : 1,
                                    }}
                                >
                                    dry-run
                                </button>
                                <button
                                    onClick={() => handleSend('test')}
                                    disabled={sending || !parsedMessages.ok}
                                    style={{
                                        padding: '10px 18px',
                                        borderRadius: '8px',
                                        border: '1px solid #06C755',
                                        backgroundColor: '#ffffff',
                                        color: '#06C755',
                                        cursor: sending || !parsedMessages.ok ? 'not-allowed' : 'pointer',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        opacity: sending || !parsedMessages.ok ? 0.5 : 1,
                                    }}
                                >
                                    自分だけに送信
                                </button>
                                <button
                                    onClick={() => handleSend('broadcast')}
                                    disabled={sending || !parsedMessages.ok}
                                    style={{
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: '#06C755',
                                        color: '#ffffff',
                                        cursor: sending || !parsedMessages.ok ? 'not-allowed' : 'pointer',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        opacity: sending || !parsedMessages.ok ? 0.5 : 1,
                                        boxShadow: sending || !parsedMessages.ok ? 'none' : '0 2px 4px rgba(6,199,85,0.3)',
                                    }}
                                >
                                    {sending ? '送信中...' : '全員に配信'}
                                </button>
                                <button
                                    onClick={() => setEditorOpen(o => !o)}
                                    style={{
                                        marginLeft: 'auto',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        border: '1px solid #d6d3d1',
                                        backgroundColor: '#ffffff',
                                        color: '#525252',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                    }}
                                >
                                    {editorOpen ? 'JSON 閉じる' : 'JSON 編集'}
                                </button>
                                {sendResult && (
                                    <div style={{ width: '100%', fontSize: '12px', color: sendResult.startsWith('失敗') || sendResult.startsWith('エラー') || sendResult.startsWith('JSON') ? '#DC2626' : '#16A34A', marginTop: '4px' }}>
                                        {sendResult}
                                    </div>
                                )}
                            </div>
                            {!parsedMessages.ok && (
                                <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '8px' }}>JSON エラー: {parsedMessages.error}</p>
                            )}
                        </div>

                        {editorOpen && (
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '14px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h2 style={{ fontSize: '13px', fontWeight: 600 }}>Flex JSON</h2>
                                    <span style={{ fontSize: '10px', color: '#888' }}>テンプレを選択 → ここで微調整</span>
                                </div>
                                <textarea
                                    value={flexInput}
                                    onChange={e => setFlexInput(e.target.value)}
                                    rows={20}
                                    spellCheck={false}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: parsedMessages.ok ? '1px solid #d6d3d1' : '1px solid #DC2626',
                                        fontSize: '11px',
                                        fontFamily: 'monospace',
                                        resize: 'vertical',
                                        backgroundColor: '#fafaf9',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ position: 'sticky', top: '16px', alignSelf: 'start' }}>
                        <div style={{
                            backgroundColor: '#1c1917',
                            borderRadius: '32px',
                            padding: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        }}>
                            <div style={{
                                backgroundColor: '#7B92A6',
                                borderRadius: '24px',
                                padding: '14px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                minHeight: '500px',
                                maxHeight: '720px',
                                overflowY: 'auto',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 6px',
                                    color: '#ffffff',
                                    fontSize: '11px',
                                    opacity: 0.85,
                                }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#1c1917', fontWeight: 700 }}>居</div>
                                    <span>居酒屋TOEIC</span>
                                </div>
                                {parsedMessages.ok ? (
                                    <FlexPreview messages={parsedMessages.messages} />
                                ) : (
                                    <div style={{ padding: '24px', textAlign: 'center', color: '#ffffff', fontSize: '12px' }}>
                                        JSON 直して
                                    </div>
                                )}
                            </div>
                        </div>
                        <p style={{ fontSize: '10px', color: '#888', textAlign: 'center', marginTop: '8px' }}>
                            LINE 送信プレビュー (実機の見え方とほぼ一致)
                        </p>
                    </div>
                </div>
            )}

            {showForm && (
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>
                        {editing ? `編集 #${editing.id}` : '新規追加'}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                            <label style={{ fontSize: '11px', color: '#888' }}>種別</label>
                            <select
                                value={form.type}
                                onChange={e => setForm({ ...form, type: e.target.value })}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d6d3d1', fontSize: '13px' }}
                            >
                                <option value="broadcast">配信</option>
                                <option value="todo">TODO</option>
                                <option value="note">メモ</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: '11px', color: '#888' }}>状態</label>
                            <select
                                value={form.status}
                                onChange={e => setForm({ ...form, status: e.target.value })}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d6d3d1', fontSize: '13px' }}
                            >
                                {form.type === 'broadcast' ? (
                                    <>
                                        <option value="sent">配信済</option>
                                        <option value="rated">評価済</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="open">未着手</option>
                                        <option value="done">完了</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ fontSize: '11px', color: '#888' }}>タイトル</label>
                        <input
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="例: TOEIC×現実 Carousel"
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d6d3d1', fontSize: '13px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ fontSize: '11px', color: '#888' }}>本文</label>
                        <textarea
                            value={form.body}
                            onChange={e => setForm({ ...form, body: e.target.value })}
                            rows={5}
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d6d3d1', fontSize: '12px', fontFamily: 'monospace', resize: 'vertical' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setShowForm(false)}
                            style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d6d3d1', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '13px' }}
                        >
                            キャンセル
                        </button>
                        <button
                            onClick={handleSave}
                            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#1c1917', color: '#ffffff', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                        >
                            {editing ? '更新' : '追加'}
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tab !== 'calendar' && filteredItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px', color: '#a8a29e', fontSize: '13px' }}>
                        まだアイテムが無い
                    </div>
                )}

                {filteredItems.map(item => (
                    <div
                        key={item.id}
                        style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e7e5e4',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                padding: '2px 8px',
                                borderRadius: '4px',
                                backgroundColor: TYPE_COLOR[item.type] || '#525252',
                                color: '#ffffff',
                            }}>
                                {TODO_TYPES.has(item.type) ? 'TODO' : item.type.toUpperCase()}
                            </span>
                            <span style={{ fontSize: '11px', color: '#888' }}>
                                {STATUS_LABEL[item.status] || item.status}
                            </span>
                            {item.rating !== null && (
                                <span style={{ fontSize: '11px', color: '#D4AF37' }}>
                                    {'★'.repeat(item.rating)}
                                </span>
                            )}
                            <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#a8a29e' }}>
                                #{item.id} · {(item.sent_at || item.created_at).slice(0, 10)}
                            </span>
                        </div>

                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1c1917' }}>
                            {item.title}
                        </div>

                        {item.body && (
                            <pre style={{
                                fontSize: '11px',
                                color: '#525252',
                                whiteSpace: 'pre-wrap',
                                fontFamily: item.type === 'broadcast' ? 'monospace' : 'inherit',
                                margin: 0,
                                maxHeight: '100px',
                                overflow: 'auto',
                                backgroundColor: '#fafaf9',
                                padding: '8px',
                                borderRadius: '6px',
                            }}>
                                {item.body.slice(0, 400)}{item.body.length > 400 ? '\n...' : ''}
                            </pre>
                        )}

                        <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => startEdit(item)}
                                style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '4px', border: '1px solid #d6d3d1', backgroundColor: '#ffffff', cursor: 'pointer' }}
                            >
                                編集
                            </button>
                            {item.type === 'broadcast' && (
                                <>
                                    {[1, 2, 3, 4, 5].map(r => (
                                        <button
                                            key={r}
                                            onClick={() => handleQuickRating(item, r)}
                                            style={{
                                                padding: '4px 8px',
                                                fontSize: '11px',
                                                borderRadius: '4px',
                                                border: '1px solid #d6d3d1',
                                                backgroundColor: item.rating === r ? '#D4AF37' : '#ffffff',
                                                color: item.rating === r ? '#ffffff' : '#525252',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {r}★
                                        </button>
                                    ))}
                                </>
                            )}
                            {TODO_TYPES.has(item.type) && item.status !== 'done' && (
                                <button
                                    onClick={() => handleQuickStatus(item, 'done')}
                                    style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '4px', border: 'none', backgroundColor: '#16A34A', color: '#ffffff', cursor: 'pointer' }}
                                >
                                    完了
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: '11px', borderRadius: '4px', border: '1px solid #fee2e2', backgroundColor: '#ffffff', color: '#dc2626', cursor: 'pointer' }}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
