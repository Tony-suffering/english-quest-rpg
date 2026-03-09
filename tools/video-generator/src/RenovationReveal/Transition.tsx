import React from "react";
import { AbsoluteFill, spring, useVideoConfig } from "remotion";

export const GoldenLineTransition: React.FC<{
    children: React.ReactNode;
    progress: number;
    color: string;
}> = ({ children, progress, color }) => {
    const { fps, width } = useVideoConfig();

    // Animation logic
    const spr = spring({
        frame: progress,
        fps,
        config: {
            damping: 200,
            mass: 0.5,
        },
    });

    // Calculate mask position
    // We want a diagonal wipe from bottom-left to top-right
    // Using clip-path for performance
    const percentage = spr * 150; // Go beyond 100% to ensure full clearance

    // The line thickness
    const lineWidth = 4;

    // Create the golden line effect
    // It moves slightly ahead of the mask
    const linePos = percentage;

    return (
        <AbsoluteFill>
            {/* The Masked Content */}
            <AbsoluteFill
                style={{
                    clipPath: `polygon(
            ${percentage - 20}% -20%, 
            ${percentage + 20}% 120%, 
            -20% 120%, 
            -20% -20%
          )`,
                }}
            >
                {children}
            </AbsoluteFill>

            {/* The Golden Line */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '0',
                    width: '100%',
                    height: '140%',
                    pointerEvents: 'none',
                    // Create a diagonal line using gradient
                    background: `linear-gradient(
                105deg, 
                transparent calc(50% - ${lineWidth}px), 
                ${color} 50%, 
                transparent calc(50% + ${lineWidth}px)
            )`,
                    // Move the line across the screen
                    transform: `translateX(${interpolateLine(percentage, width)}px)`,
                    opacity: progress < 0 || progress > 40 ? 0 : 1, // Hide when not active
                    filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))'
                }}
            />
        </AbsoluteFill>
    );
};

// Helper to map 0-100 percentage to pixel translation
function interpolateLine(percent: number, width: number) {
    // Rudimentary mapping to match the diagonal movement
    // Adjust logic if using different angle
    return (percent / 100) * width * 1.5 - (width * 0.25);
}
