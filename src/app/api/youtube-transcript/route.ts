import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/');
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const videoId = searchParams.get('videoId');

        if (!videoId) {
            return NextResponse.json({ error: 'No videoId provided' }, { status: 400 });
        }

        // Validate videoId format (11 chars, alphanumeric + - _)
        if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
            return NextResponse.json({ error: 'Invalid videoId format' }, { status: 400 });
        }

        const { YoutubeTranscript } = await import('youtube-transcript-plus');

        let segments: { id: number; text: string; offset: number; duration: number }[] = [];

        try {
            const transcript = await YoutubeTranscript.fetchTranscript(videoId);

            if (transcript && transcript.length > 0) {
                segments = transcript.map((seg, i) => ({
                    id: i,
                    text: decodeHtmlEntities(seg.text || ''),
                    // youtube-transcript-plus returns offset/duration in seconds (float)
                    offset: Math.round((seg.offset || 0) * 1000),
                    duration: Math.round((seg.duration || 0) * 1000),
                }));
            }
        } catch (transcriptErr) {
            // No transcript available - return empty array (not 500)
            console.log(`No transcript available for ${videoId}:`, transcriptErr);
        }

        return NextResponse.json({
            videoId,
            segments,
            total: segments.length,
        });
    } catch (error: unknown) {
        console.error('YouTube transcript error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to fetch transcript', message }, { status: 500 });
    }
}
