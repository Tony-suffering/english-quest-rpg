import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Img,
    Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/ZenKakuGothicNew";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import React from "react";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { GoldenLineTransition } from "./Transition";

// Load fonts
const { fontFamily: zenKaku } = loadFont();
const { fontFamily: spaceGrotesk } = loadSpaceGrotesk();

export const renovationSchema = z.object({
    beforeImage: z.string(),
    afterImage: z.string(),
    title: z.string(),
    price: z.string(),
    features: z.array(z.string()),
    accentColor: zColor(),
});

export const RenovationReveal: React.FC<z.infer<typeof renovationSchema>> = ({
    beforeImage,
    afterImage,
    title,
    price,
    features,
    accentColor = "#D4AF37", // Gold
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Timing configuration
    const transitionStart = 60; // Start transition at 2 seconds
    const textStart = 100; // Start text reveal at ~3.3 seconds

    // 1. Ken Burns Effect for Images (Subtle Zoom)
    const zoom = interpolate(frame, [0, durationInFrames], [1, 1.1]);

    // 2. Text Animations
    const titleOpacity = spring({
        frame: frame - textStart,
        fps,
        config: { damping: 200 },
    });

    const priceOpacity = spring({
        frame: frame - textStart - 10,
        fps,
        config: { damping: 200 },
    });

    const priceY = interpolate(priceOpacity, [0, 1], [20, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            {/* Layer 1: Before Image (Black & White) */}
            <AbsoluteFill>
                <div style={{
                    width: '100%',
                    height: '100%',
                    filter: 'grayscale(100%) brightness(0.8)',
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center'
                }}>
                    <Img src={beforeImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Before Label */}
                <div style={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    fontFamily: spaceGrotesk,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 30,
                    letterSpacing: '0.2em',
                    fontWeight: 300,
                    opacity: interpolate(frame, [0, 20, transitionStart, transitionStart + 20], [0, 1, 1, 0])
                }}>
                    BEFORE
                </div>
            </AbsoluteFill>

            {/* Layer 2: After Image (Color) - Revealed by mask */}
            <AbsoluteFill>
                <GoldenLineTransition
                    progress={frame - transitionStart}
                    color={accentColor}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center center'
                    }}>
                        <Img src={afterImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </GoldenLineTransition>
            </AbsoluteFill>

            {/* Layer 3: Text Overlay */}
            <AbsoluteFill style={{
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'
            }}>
                {/* Main Title Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: 120,
                    left: 60,
                    opacity: titleOpacity,
                    transform: `translateY(${interpolate(titleOpacity, [0, 1], [40, 0])}px)`
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 15
                    }}>
                        <h1 style={{
                            fontFamily: zenKaku,
                            color: 'white',
                            fontSize: 60,
                            fontWeight: 700,
                            margin: 0,
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            letterSpacing: '0.05em',
                        }}>
                            {title}
                        </h1>
                        <div style={{ height: 2, width: 100, backgroundColor: accentColor }} />
                        <ul style={{
                            display: 'flex',
                            gap: 20,
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            fontFamily: zenKaku,
                            color: '#E5E5E5',
                            fontSize: 24
                        }}>
                            {features.map((feature, i) => (
                                <li key={i}>• {feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Price Tag (Premium Style) */}
                <div style={{
                    position: 'absolute',
                    top: 60,
                    right: 60,
                    opacity: priceOpacity,
                    transform: `translateY(${priceY}px)`
                }}>
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        padding: '20px 40px',
                        border: `1px solid ${accentColor}`,
                        backdropFilter: 'blur(10px)',
                        borderRadius: 4
                    }}>
                        <div style={{
                            fontFamily: zenKaku,
                            color: '#AAAAAA',
                            fontSize: 18,
                            marginBottom: 5,
                            textAlign: 'right'
                        }}>
                            参考施工価格
                        </div>
                        <div style={{
                            fontFamily: spaceGrotesk,
                            color: 'white',
                            fontSize: 48,
                            fontWeight: 700,
                            letterSpacing: '-0.02em'
                        }}>
                            {price}
                        </div>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
