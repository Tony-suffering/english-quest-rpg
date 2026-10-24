'use client';

/** 紙のページ用の印刷ボタン。これだけがクライアント側に要る部分 */
export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            style={{
                fontSize: '11px', border: 'none', borderRadius: '8px', padding: '6px 14px',
                background: '#1C1917', color: '#fff', fontWeight: 900, cursor: 'pointer',
            }}
        >
            印刷
        </button>
    );
}
