export default function Loading() {
    const gold = '#D4AF37';
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'radial-gradient(ellipse at center, #1a1917 0%, #050403 75%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
        }}>
            <style>{`
                @keyframes kaiwaLoadPulse {
                    0%, 100% { transform: scale(1);   opacity: 0.6; }
                    50%      { transform: scale(1.15); opacity: 1; }
                }
                @keyframes kaiwaLoadRing {
                    0%   { transform: scale(0.6); opacity: 0; }
                    40%  { opacity: 0.5; }
                    100% { transform: scale(1.1); opacity: 0; }
                }
                @keyframes kaiwaLoadFade {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}</style>

            {/* Ambient orb */}
            <div style={{
                position: 'absolute',
                width: 420,
                height: 420,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${gold}20 0%, ${gold}06 40%, transparent 70%)`,
                filter: 'blur(60px)',
                animation: 'kaiwaLoadPulse 2.4s ease-in-out infinite',
                pointerEvents: 'none',
            }} />

            {/* Expanding ring */}
            <div style={{ position: 'relative', width: 80, height: 80 }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `1px solid ${gold}60`,
                    animation: 'kaiwaLoadRing 2s ease-out infinite',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `1px solid ${gold}40`,
                    animation: 'kaiwaLoadRing 2s ease-out 0.6s infinite',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 10,
                    height: 10,
                    marginLeft: -5,
                    marginTop: -5,
                    borderRadius: '50%',
                    background: gold,
                    boxShadow: `0 0 24px ${gold}cc, 0 0 48px ${gold}55`,
                    animation: 'kaiwaLoadPulse 1.6s ease-in-out infinite',
                }} />
            </div>

            {/* Label */}
            <div style={{
                fontSize: 11,
                letterSpacing: '0.4em',
                color: gold,
                fontWeight: 700,
                textShadow: `0 0 20px ${gold}80`,
                animation: 'kaiwaLoadFade 0.4s ease-out',
            }}>
                OPENING
            </div>
        </div>
    );
}
