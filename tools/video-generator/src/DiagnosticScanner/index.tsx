import { AbsoluteFill, useVideoConfig, useCurrentFrame, Img, interpolate, spring } from "remotion";
import React from "react";
import { z } from "zod";
import { GridOverlay, ScanLine, Marker, SidebarStats } from "./HUD";

// Schema for input data
export const diagnosticSchema = z.object({
    beforeImage: z.string(),
    afterImage: z.string(),
    scanPoints: z.array(z.object({
        x: z.number(),
        y: z.number(),
        label: z.string(),
    })),
});

export const DiagnosticScanner: React.FC<z.infer<typeof diagnosticSchema>> = ({
    beforeImage,
    afterImage,
    scanPoints
}) => {
    const frame = useCurrentFrame();
    const { fps, width, height, durationInFrames } = useVideoConfig();

    // Timeline
    const scanDuration = 90; // 3 seconds
    // const processStart = 90;
    // const processDuration = 30; // 1 second
    const resolveStart = 120; // 4 seconds

    // Phase logic
    const isScanning = frame < resolveStart;

    // Scan Animation
    const scanProgress = (frame % scanDuration) / scanDuration;

    // Damage Level Counter
    const damageLevel = interpolate(
        frame,
        [0, scanDuration],
        [0, 85],
        { extrapolateRight: 'clamp' }
    );

    // Glitch/Resolve Effect
    const resolveProgress = spring({
        frame: frame - resolveStart,
        fps,
        config: { damping: 10 }
    });

    const glitch = interpolate(resolveProgress, [0, 0.2, 0.4, 1], [0, 10, 0, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', overflow: 'hidden' }}>

            {/* Background Image Layer */}
            <AbsoluteFill style={{
                transform: `translateX(${glitch * (Math.random() - 0.5) * 50}px)`,
                filter: isScanning ? 'brightness(0.5) contrast(1.2)' : 'none'
            }}>
                {/* Toggle between Before and After based on phase */}
                {isScanning ? (
                    <Img src={beforeImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <AbsoluteFill style={{ opacity: resolveProgress }}>
                        <Img src={afterImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </AbsoluteFill>
                )}
            </AbsoluteFill>

            {/* UI Overlay Layer */}
            <GridOverlay />

            {isScanning && (
                <ScanLine progress={scanProgress} />
            )}

            {/* Markers */}
            {scanPoints.map((point, i) => (
                <Marker
                    key={i}
                    x={point.x}
                    y={point.y}
                    label={point.label}
                    status={isScanning ? 'alert' : 'fixed'}
                    delay={i * 0.5} // Stagger appearances
                />
            ))}

            {/* Sidebar Stats */}
            <SidebarStats
                damageLevel={isScanning ? damageLevel : 0}
                status={isScanning ? "SCANNING..." : "ALL SYSTEMS NOMINAL"}
            />

            {/* Scan overlay color tint */}
            {isScanning && (
                <AbsoluteFill style={{
                    backgroundColor: '#00ff41',
                    mixBlendMode: 'overlay',
                    opacity: 0.1
                }} />
            )}

            {/* Reconstructing Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'monospace',
                fontSize: 60,
                color: 'white',
                backgroundColor: 'black',
                padding: '20px 40px',
                opacity: interpolate(frame, [resolveStart - 10, resolveStart, resolveStart + 10], [0, 1, 0]),
                zIndex: 100
            }}>
                {'>'} RECONSTRUCTING...
            </div>

        </AbsoluteFill>
    );
};
