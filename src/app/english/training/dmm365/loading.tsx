// dmm365 専用 loading -- 親 (training/loading.tsx) を override して minimal placeholder
export default function Dmm365Loading() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#fafaf9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#78716c',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{
                    width: 36,
                    height: 36,
                    border: '3px solid #e7e5e4',
                    borderTop: '3px solid #D4AF37',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                }} />
                <div style={{ fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>
                    DMM 365
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
