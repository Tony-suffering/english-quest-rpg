const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '.r2-config.json'), 'utf8'));

console.log('Endpoint:', config.r2.endpoint);

const s3Client = new S3Client({
    region: 'auto',
    endpoint: config.r2.endpoint,
    credentials: {
        accessKeyId: config.r2.accessKeyId,
        secretAccessKey: config.r2.secretAccessKey,
    },
});

async function testUpload() {
    const imgPath = 'C:/Users/thaat/.gemini/antigravity/brain/1f629e99-8392-4f1c-becd-4fa6e2944a70/blog_hero_craftsman_1769935013019.png';
    const key = 'test-image-001.png';

    try {
        console.log('Reading file...');
        const fileContent = fs.readFileSync(imgPath);
        console.log('Uploading...');
        await s3Client.send(new PutObjectCommand({
            Bucket: config.r2.bucketName,
            Key: key,
            Body: fileContent,
            ContentType: 'image/png',
        }));
        console.log('SUCCESS');
    } catch (error) {
        console.error('ERROR DETAILS:', error);
    }
}

testUpload();
