import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const accountId = 'k1Zw56y2FNiZaFcOP7Rs2Q';
        // User needs to provide the real API token.
        // I will use process.env here so it works once they set it.
        const apiToken = process.env.CLOUDFLARE_API_TOKEN;

        if (!apiToken || apiToken === 'your-api-token-here') {
            return NextResponse.json({ error: 'Missing Cloudflare API Token configuration' }, { status: 500 });
        }

        // Step 1: Get Direct Upload URL
        const uploadUrlResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v2/direct_upload`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                },
            }
        );

        const uploadUrlData = await uploadUrlResponse.json();

        if (!uploadUrlData.success) {
            console.error('Failed to get upload URL:', uploadUrlData);
            return NextResponse.json({ error: 'Failed to get upload URL', details: uploadUrlData }, { status: 500 });
        }

        const { uploadURL, id } = uploadUrlData.result;

        // Step 2: Upload file to Direct Upload URL
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const uploadResponse = await fetch(uploadURL, {
            method: 'POST',
            body: uploadFormData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
            console.error('Failed to upload file:', uploadResult);
            return NextResponse.json({ error: 'Failed to upload file', details: uploadResult }, { status: 500 });
        }

        const accountHash = 'k1Zw56y2FNiZaFcOP7Rs2Q';
        const imageUrl = `https://imagedelivery.net/${accountHash}/${id}/public`;

        return NextResponse.json({
            success: true,
            url: imageUrl,
            id: id,
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            error: 'Upload failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
