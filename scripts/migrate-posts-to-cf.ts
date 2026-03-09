
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load env
dotenv.config({ path: '.env.local' });

const POSTS_DIR = path.join(process.cwd(), 'src', 'posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    console.error('❌ Missing Cloudflare credentials');
    process.exit(1);
}

// Reuse upload logic (simplified integration)
async function uploadBuffer(buffer: Buffer, filename: string): Promise<string> {
    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v2/direct_upload`;
    const formData = new FormData();
    formData.append('requireSignedURLs', 'false');

    // 1. Get URL
    const urlRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` },
        body: formData
    });
    const urlData = await urlRes.json();
    if (!urlData.success) throw new Error('Failed to get upload URL');

    const uploadURL = urlData.result.uploadURL;

    // 2. Upload
    const uploadFormData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' }); // Defaulting to png for simplicity
    uploadFormData.append('file', blob, filename);

    const uploadRes = await fetch(uploadURL, {
        method: 'POST',
        body: uploadFormData
    });
    const uploadResult = await uploadRes.json();
    if (!uploadResult.success) throw new Error('Upload failed');

    const publicUrl = uploadResult.result.variants.find((v: string) => v.endsWith('/public'))
        || uploadResult.result.variants[0];
    return publicUrl;
}

async function migrate() {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

    for (const file of files) {
        const filePath = path.join(POSTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(content);
        const { image } = parsed.data;

        if (!image) {
            console.log(`Skipping ${file} (no image)`);
            continue;
        }

        if (image.includes('imagedelivery.net')) {
            console.log(`Skipping ${file} (already Cloudflare)`);
            continue;
        }

        console.log(`\nProcessing ${file}...`);
        console.log(`  Current Image: ${image}`);

        try {
            let buffer: Buffer | null = null;
            let filename = `migrated-${path.basename(image)}`;

            if (image.startsWith('http')) {
                // Remote fetch
                console.log('  Fetching remote image...');
                const res = await fetch(image);
                if (!res.ok) throw new Error(`Failed to fetch ${image}`);
                const arrayBuffer = await res.arrayBuffer();
                buffer = Buffer.from(arrayBuffer);
            } else {
                // Local file (w/o leading slash)
                const relativePath = image.startsWith('/') ? image.slice(1) : image;
                const localPath = path.join(PUBLIC_DIR, relativePath);

                if (fs.existsSync(localPath)) {
                    console.log('  Reading local file...');
                    buffer = fs.readFileSync(localPath);
                } else {
                    console.warn(`  ⚠️ Local file not found: ${localPath}`);
                    continue;
                }
            }

            if (buffer) {
                console.log('  Uploading to Cloudflare...');
                const cfUrl = await uploadBuffer(buffer, filename);
                console.log(`  ✅ Uploaded: ${cfUrl}`);

                // Update Markdown
                parsed.data.image = cfUrl;
                const newContent = matter.stringify(parsed.content, parsed.data);
                fs.writeFileSync(filePath, newContent);
                console.log('  📄 Updated markdown file');
            }

        } catch (e: any) {
            console.error(`  ❌ Failed to migrate ${file}: ${e.message}`);
        }
    }
}

migrate();
