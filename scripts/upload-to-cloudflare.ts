import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function uploadToCloudflare(filePath: string) {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
        console.error('❌ Error: CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN not set in .env.local');
        process.exit(1);
    }

    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: File not found at ${filePath}`);
        process.exit(1);
    }

    console.log(`🚀 Preparing to upload: ${filePath}`);

    try {
        // Use v1 endpoint for direct server-side upload
        const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`;

        const uploadFormData = new FormData();
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
        const fileBlob = new Blob([fileBuffer], { type: mimeType });

        uploadFormData.append('file', fileBlob, fileName);

        console.log('📤 Uploading image directly...');
        const uploadRes = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
            body: uploadFormData
        });

        const uploadResult = await uploadRes.json();

        if (!uploadResult.success) {
            throw new Error(`Upload failed: ${JSON.stringify(uploadResult.errors)}`);
        }

        const variants = uploadResult.result.variants as string[];
        const publicUrl = variants.find(v => v.endsWith('/public')) || variants[0];

        console.log('\n✅ Upload Successful!');
        console.log(`📸 Image URL: ${publicUrl}`);
        fs.writeFileSync('upload_result.txt', publicUrl);

        return publicUrl;

    } catch (error: any) {
        console.error('❌ Upload failed:', error.message);
        process.exit(1);
    }
}

// CLI Entry point
const targetFile = process.argv[2];
if (!targetFile) {
    console.log('Usage: npx tsx scripts/upload-to-cloudflare.ts <path-to-image>');
    process.exit(0);
}

uploadToCloudflare(targetFile);
