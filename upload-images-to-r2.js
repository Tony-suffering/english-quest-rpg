const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '.r2-config.json'), 'utf8'));

const s3Client = new S3Client({
    region: 'auto',
    endpoint: config.r2.endpoint,
    credentials: {
        accessKeyId: config.r2.accessKeyId,
        secretAccessKey: config.r2.secretAccessKey,
    },
});

const images = [
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_hero_craftsman_1769935013019.png',
        name: 'blog_hero_craftsman.png'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_ambiance_lighting_1769935034550.png',
        name: 'blog_ambiance_lighting.png'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_fresh_wall_1769935054896.png',
        name: 'blog_fresh_wall.png'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_trustworthy_pro_1769935073118.png',
        name: 'blog_trustworthy_pro.png'
    },
    {
        path: 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_taking_photo_1769935089960.png',
        name: 'blog_taking_photo.png'
    }
];

async function uploadImages() {
    for (const img of images) {
        try {
            const fileContent = fs.readFileSync(img.path);
            await s3Client.send(new PutObjectCommand({
                Bucket: config.r2.bucketName,
                Key: img.name,
                Body: fileContent,
                ContentType: 'image/png',
            }));
            const publicUrl = `${config.r2.publicUrl}/${img.name}`;
            console.log(`UPLOADED: ${img.name} -> ${publicUrl}`);
        } catch (error) {
            console.error(`FAILED: ${img.name}`, error);
        }
    }
}

uploadImages();
