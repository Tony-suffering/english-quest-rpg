/**
 * Cloudflare Images Upload Script
 * 画像をCloudflare Imagesにアップロードする
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

// 設定
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID; // Cloudflare Account ID
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN; // 環境変数から取得

const images = [
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_hero_craftsman_1769935013019.png',
        name: 'blog_hero_craftsman'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_ambiance_lighting_1769935034550.png',
        name: 'blog_ambiance_lighting'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_fresh_wall_1769935054896.png',
        name: 'blog_fresh_wall'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_trustworthy_pro_1769935073118.png',
        name: 'blog_trustworthy_pro'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_taking_photo_1769935089960.png',
        name: 'blog_taking_photo'
    }
];

async function uploadImage(imagePath, imageName) {
    if (!API_TOKEN) {
        console.error('❌ CLOUDFLARE_API_TOKEN環境変数が設定されていません');
        console.log('\n設定方法:');
        console.log('$env:CLOUDFLARE_API_TOKEN="your-api-token-here"');
        return null;
    }

    if (!fs.existsSync(imagePath)) {
        console.error(`❌ ファイルが見つかりません: ${imagePath}`);
        return null;
    }

    console.log(`\n📤 アップロード中: ${imageName}`);
    console.log(`   ファイル: ${path.basename(imagePath)}`);

    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));
    form.append('id', imageName);

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.cloudflare.com',
            port: 443,
            path: `/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
            method: 'POST',
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${API_TOKEN}`
            }
        }, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result.success) {
                        console.log(`✅ アップロード成功！`);
                        console.log(`   URL: ${result.result.variants[0]}`);
                        resolve(result.result);
                    } else {
                        console.error(`❌ エラー: ${JSON.stringify(result.errors)}`);
                        reject(new Error(JSON.stringify(result.errors)));
                    }
                } catch (e) {
                    console.error(`❌ レスポンス解析エラー: ${e.message}`);
                    console.error(`   レスポンス: ${data}`);
                    reject(e);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`❌ リクエストエラー: ${e.message}`);
            reject(e);
        });

        form.pipe(req);
    });
}

async function main() {
    console.log('🚀 Cloudflare Images アップロードツール\n');
    console.log(`Account ID: ${ACCOUNT_ID}`);
    console.log(`アップロード数: ${images.length}枚\n`);

    const results = [];

    for (const img of images) {
        try {
            const result = await uploadImage(img.path, img.name);
            if (result) {
                results.push({
                    name: img.name,
                    url: result.variants[0],
                    id: result.id
                });
            }
        } catch (error) {
            console.error(`失敗: ${img.name}`);
        }

        // レート制限を避けるため1秒待機
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 アップロード結果\n');

    results.forEach((r, i) => {
        console.log(`${i + 1}. ${r.name}`);
        console.log(`   URL: ${r.url}`);
        console.log('');
    });

    if (results.length > 0) {
        console.log('✅ 全てのアップロードが完了しました！');
    } else {
        console.log('❌ アップロードに失敗しました');
    }
}

main().catch(console.error);
