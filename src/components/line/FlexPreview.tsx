'use client';

import { CSSProperties, ReactNode } from 'react';

type FlexBox = {
    type: 'box';
    layout: 'vertical' | 'horizontal' | 'baseline';
    contents: FlexComponent[];
    backgroundColor?: string;
    paddingAll?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingStart?: string;
    paddingEnd?: string;
    spacing?: string;
    cornerRadius?: string;
    borderColor?: string;
    borderWidth?: string;
    margin?: string;
    width?: string;
    height?: string;
    alignItems?: string;
    justifyContent?: string;
    flex?: number;
};

type FlexText = {
    type: 'text';
    text: string;
    color?: string;
    size?: string;
    weight?: 'regular' | 'bold';
    align?: 'start' | 'center' | 'end';
    wrap?: boolean;
    margin?: string;
    flex?: number;
};

type FlexImage = {
    type: 'image';
    url: string;
    aspectRatio?: string;
    aspectMode?: 'cover' | 'fit';
    size?: string;
    margin?: string;
};

type FlexButton = {
    type: 'button';
    action: { type: string; label: string; uri?: string; data?: string };
    style?: 'primary' | 'secondary' | 'link';
    color?: string;
    height?: 'sm' | 'md';
    margin?: string;
};

type FlexSeparator = { type: 'separator'; margin?: string; color?: string };
type FlexSpacer = { type: 'spacer'; size?: string };

type FlexComponent = FlexBox | FlexText | FlexImage | FlexButton | FlexSeparator | FlexSpacer;

type FlexBubble = {
    type: 'bubble';
    size?: 'nano' | 'micro' | 'kilo' | 'mega' | 'giga';
    header?: FlexBox;
    hero?: FlexBox | FlexImage;
    body?: FlexBox;
    footer?: FlexBox;
    styles?: { header?: { backgroundColor?: string }; body?: { backgroundColor?: string }; footer?: { backgroundColor?: string } };
};

type FlexCarousel = { type: 'carousel'; contents: FlexBubble[] };

type FlexContainer = FlexBubble | FlexCarousel;

type FlexMessage = {
    type: 'flex';
    altText: string;
    contents: FlexContainer;
};

const SIZE_PX: Record<string, string> = {
    xxs: '10px', xs: '11px', sm: '12px', md: '14px', lg: '16px', xl: '18px', xxl: '20px',
    '3xl': '24px', '4xl': '28px', '5xl': '32px',
};

const SPACING_PX: Record<string, string> = {
    none: '0', xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '16px', xxl: '20px',
};

const BUBBLE_WIDTH: Record<string, string> = {
    nano: '120px', micro: '160px', kilo: '260px', mega: '300px', giga: '380px',
};

function px(value: string | undefined, table: Record<string, string> = SPACING_PX): string | undefined {
    if (!value) return undefined;
    return table[value] ?? value;
}

function textSize(value: string | undefined): string {
    return SIZE_PX[value ?? 'md'] ?? value ?? '14px';
}

function renderText(c: FlexText, key: string | number): ReactNode {
    const style: CSSProperties = {
        color: c.color || '#1c1917',
        fontSize: textSize(c.size),
        fontWeight: c.weight === 'bold' ? 700 : 400,
        textAlign: (c.align as CSSProperties['textAlign']) || 'start',
        whiteSpace: c.wrap ? 'pre-wrap' : 'nowrap',
        overflow: c.wrap ? 'visible' : 'hidden',
        textOverflow: c.wrap ? 'unset' : 'ellipsis',
        marginTop: px(c.margin),
        flex: c.flex,
        lineHeight: 1.4,
        wordBreak: 'break-word',
    };
    return <div key={key} style={style}>{c.text}</div>;
}

function localizeUrl(url: string): string {
    // dev preview 用: 本番URLをローカルパスに書き換え (実送信JSONは触らない)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return url.replace(/^https?:\/\/iwasaki-naisou\.com/, '');
    }
    return url;
}

function renderImage(c: FlexImage, key: string | number): ReactNode {
    const aspectRatio = c.aspectRatio?.replace(':', '/') || '1/1';
    return (
        <div key={key} style={{ marginTop: px(c.margin), width: '100%' }}>
            <div style={{ width: '100%', aspectRatio, overflow: 'hidden', borderRadius: '4px', backgroundColor: '#f5f5f4' }}>
                <img src={localizeUrl(c.url)} alt="" style={{ width: '100%', height: '100%', objectFit: c.aspectMode === 'fit' ? 'contain' : 'cover', display: 'block' }} />
            </div>
        </div>
    );
}

function renderButton(c: FlexButton, key: string | number): ReactNode {
    const isPrimary = c.style === 'primary';
    const bg = c.color || (isPrimary ? '#06C755' : '#ffffff');
    const fg = isPrimary ? '#ffffff' : (c.color || '#06C755');
    const border = isPrimary ? 'none' : `1px solid ${c.color || '#06C755'}`;
    return (
        <div key={key} style={{ marginTop: px(c.margin) }}>
            <div style={{
                padding: c.height === 'sm' ? '6px 12px' : '10px 12px',
                backgroundColor: bg,
                color: fg,
                border,
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 600,
            }}>
                {c.action?.label || '(button)'}
            </div>
        </div>
    );
}

function renderSeparator(c: FlexSeparator, key: string | number): ReactNode {
    return <div key={key} style={{ marginTop: px(c.margin), height: '1px', backgroundColor: c.color || '#e7e5e4' }} />;
}

function renderSpacer(c: FlexSpacer, key: string | number): ReactNode {
    const h = SPACING_PX[c.size || 'md'] || c.size || '8px';
    return <div key={key} style={{ height: h }} />;
}

function renderBox(c: FlexBox, key: string | number): ReactNode {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: c.layout === 'horizontal' || c.layout === 'baseline' ? 'row' : 'column',
        alignItems: c.layout === 'baseline' ? 'baseline' : (c.alignItems as CSSProperties['alignItems']) || 'stretch',
        justifyContent: (c.justifyContent as CSSProperties['justifyContent']) || 'flex-start',
        gap: px(c.spacing),
        backgroundColor: c.backgroundColor,
        padding: px(c.paddingAll),
        paddingTop: px(c.paddingTop),
        paddingBottom: px(c.paddingBottom),
        paddingLeft: px(c.paddingStart),
        paddingRight: px(c.paddingEnd),
        borderRadius: px(c.cornerRadius),
        border: c.borderWidth ? `${px(c.borderWidth)} solid ${c.borderColor || '#e7e5e4'}` : undefined,
        marginTop: px(c.margin),
        flex: c.flex,
        width: c.width,
        height: c.height,
    };
    return (
        <div key={key} style={style}>
            {c.contents.map((child, i) => renderComponent(child, i))}
        </div>
    );
}

function renderComponent(c: FlexComponent, key: string | number): ReactNode {
    switch (c.type) {
        case 'text': return renderText(c, key);
        case 'image': return renderImage(c, key);
        case 'button': return renderButton(c, key);
        case 'separator': return renderSeparator(c, key);
        case 'spacer': return renderSpacer(c, key);
        case 'box': return renderBox(c, key);
        default: return null;
    }
}

function renderBubble(b: FlexBubble, key: string | number): ReactNode {
    const width = BUBBLE_WIDTH[b.size || 'mega'] || '300px';
    const sectionStyle = (bg?: string): CSSProperties => ({
        backgroundColor: bg || '#ffffff',
    });
    return (
        <div key={key} style={{
            width,
            minWidth: width,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #e7e5e4',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {b.header && (
                <div style={sectionStyle(b.styles?.header?.backgroundColor || b.header.backgroundColor)}>
                    {renderBox({ ...b.header, paddingAll: b.header.paddingAll || 'lg' }, 'h')}
                </div>
            )}
            {b.hero && (
                <div>
                    {b.hero.type === 'image' ? renderImage(b.hero, 'hero') : renderBox(b.hero, 'hero')}
                </div>
            )}
            {b.body && (
                <div style={sectionStyle(b.styles?.body?.backgroundColor || b.body.backgroundColor)}>
                    {renderBox({ ...b.body, paddingAll: b.body.paddingAll || 'lg', backgroundColor: undefined }, 'b')}
                </div>
            )}
            {b.footer && (
                <div style={sectionStyle(b.styles?.footer?.backgroundColor || b.footer.backgroundColor)}>
                    {renderBox({ ...b.footer, paddingAll: b.footer.paddingAll || 'lg', backgroundColor: undefined }, 'f')}
                </div>
            )}
        </div>
    );
}

function renderTextMessage(text: string, key: number): ReactNode {
    return (
        <div key={key} style={{
            padding: '10px 14px',
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid #e7e5e4',
            maxWidth: '320px',
            fontSize: '14px',
            color: '#1c1917',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.5,
            wordBreak: 'break-word',
        }}>
            {text}
        </div>
    );
}

export function FlexPreview({ messages, transparent = true }: { messages: any[]; transparent?: boolean }) {
    return (
        <div style={{
            backgroundColor: transparent ? 'transparent' : '#7B92A6',
            padding: transparent ? 0 : '16px',
            borderRadius: transparent ? 0 : '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: transparent ? 0 : '200px',
        }}>
            {messages.map((msg, idx) => {
                if (!msg || typeof msg !== 'object') return null;
                if (msg.type === 'text') return renderTextMessage(msg.text || '', idx);
                if (msg.type === 'flex') {
                    const container: FlexContainer | undefined = msg.contents;
                    if (!container) return null;
                    if (container.type === 'bubble') {
                        return <div key={idx}>{renderBubble(container, 0)}</div>;
                    }
                    if (container.type === 'carousel') {
                        return (
                            <div key={idx} style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                                {container.contents.map((bubble, i) => renderBubble(bubble, i))}
                            </div>
                        );
                    }
                }
                return null;
            })}
        </div>
    );
}

export type { FlexMessage, FlexContainer, FlexBubble, FlexCarousel };
