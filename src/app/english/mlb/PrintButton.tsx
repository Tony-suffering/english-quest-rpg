'use client';

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            style={{
                backgroundColor: '#D4AF37', color: '#1A1A1A', border: 'none', borderRadius: '8px',
                padding: '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px',
            }}
        >
            印刷 / PDF保存
        </button>
    );
}
