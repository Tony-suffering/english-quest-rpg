import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const BEEP_COLOR = "#00ff41"; // Matrix-like green or sci-fi green
const ALERT_COLOR = "#ff3333";

// Inline Icons to avoid build issues
const Icons = {
    AlertTriangle: ({ color, size }: { color: string; size: number }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    ),
    CheckCircle: ({ color, size }: { color: string; size: number }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
        </svg>
    ),
    Crosshair: ({ color, size }: { color: string; size: number }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="22" y1="12" x2="18" y2="12" />
            <line x1="6" y1="12" x2="2" y2="12" />
            <line x1="12" y1="6" x2="12" y2="2" />
            <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
    ),
    Zap: ({ color, size }: { color: string; size: number }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    Activity: ({ color, size }: { color: string; size: number }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
};

export const GridOverlay: React.FC = () => {
    return (
        <AbsoluteFill style={{
            backgroundImage: `linear-gradient(${BEEP_COLOR}33 1px, transparent 1px), linear-gradient(90deg, ${BEEP_COLOR}33 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            opacity: 0.2,
            zIndex: 10
        }} />
    );
};

export const ScanLine: React.FC<{ progress: number }> = ({ progress }) => {
    const { width } = useVideoConfig();
    const x = interpolate(progress, [0, 1], [0, width]);

    return (
        <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 20 }}>
            <div style={{
                position: 'absolute',
                left: x,
                top: 0,
                bottom: 0,
                width: 2,
                backgroundColor: BEEP_COLOR,
                boxShadow: `0 0 20px ${BEEP_COLOR}, 0 0 10px white`
            }} />
            <div style={{
                position: 'absolute',
                left: x - 50, // Trailing gradient
                top: 0,
                bottom: 0,
                width: 50,
                background: `linear-gradient(90deg, transparent, ${BEEP_COLOR}33)`
            }} />
        </AbsoluteFill>
    );
};

export const Marker: React.FC<{
    x: number;
    y: number;
    label: string;
    status: 'scanning' | 'alert' | 'fixed';
    delay: number;
}> = ({ x, y, label, status, delay }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animate appearance
    const appearFrame = delay * fps;
    if (frame < appearFrame) return null;

    const opacity = Math.min(1, (frame - appearFrame) / 10);

    // Status colors
    const color = status === 'fixed' ? BEEP_COLOR : ALERT_COLOR;
    const Icon = status === 'fixed' ? Icons.CheckCircle : Icons.AlertTriangle;

    return (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)',
            zIndex: 30,
            opacity
        }}>
            {/* Target Reticle */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 60,
                height: 60,
                border: `1px solid ${color}`,
                borderRadius: '50%',
                animation: 'spin 4s linear infinite'
            }}>
                <Icons.Crosshair size={60} color={color} />
            </div>

            {/* Connecting Line */}
            <div style={{
                position: 'absolute',
                left: 30,
                top: 30,
                width: 50,
                height: 2,
                backgroundColor: color,
                transform: 'rotate(-45deg)',
                transformOrigin: '0 0'
            }} />

            {/* Label Box */}
            <div style={{
                position: 'absolute',
                left: 70,
                top: -10,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: `1px solid ${color}`,
                padding: '8px 16px',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minWidth: 200,
                backdropFilter: 'blur(4px)'
            }}>
                <Icon size={20} color={color} />
                <span style={{
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                }}>
                    {status === 'fixed' ? `RESOLVED: ${label}` : `DETECTED: ${label}`}
                </span>
            </div>
        </div>
    );
};

export const SidebarStats: React.FC<{ damageLevel: number; status: string }> = ({ damageLevel, status }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 300,
            zIndex: 40,
            fontFamily: 'monospace'
        }}>
            <h1 style={{ color: BEEP_COLOR, fontSize: 24, margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icons.Zap size={24} color={BEEP_COLOR} />
                NEURAL ENGINE v1.0
            </h1>

            <div style={{ marginBottom: 20 }}>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>SYSTEM STATUS</div>
                <div style={{ color: 'white', fontSize: 18, borderBottom: `1px solid ${BEEP_COLOR}`, paddingBottom: 5 }}>
                    {status}
                </div>
            </div>

            <div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>DEGRADATION LEVEL</div>
                <div style={{ display: 'flex', alignItems: 'end', gap: 10 }}>
                    <span style={{ fontSize: 48, color: damageLevel > 50 ? ALERT_COLOR : BEEP_COLOR, fontWeight: 'bold' }}>
                        {damageLevel.toFixed(0)}%
                    </span>
                    <Icons.Activity size={30} color={damageLevel > 50 ? ALERT_COLOR : BEEP_COLOR} />
                </div>
            </div>
        </div>
    );
};
