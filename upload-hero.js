const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function uploadToCloudflare() {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
        console.error('Cloudflare credentials not found');
        process.exit(1);
    }

    // TODO: Set the path to the image you want to upload
    const imagePath = 'path/to/your/image.png';

    if (!fs.existsSync(imagePath)) {
        console.error('Please set a valid image path in the script');
        process.exit(1);
    }

    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`
            },
            body: formData
        }
    );

    const result = await response.json();

    if (result.success) {
        console.log('Upload successful!');
        console.log('Image ID:', result.result.id);
        console.log('Image URL:', result.result.variants[0]);
        return result.result.id;
    } else {
        console.error('Upload failed:', result.errors);
        process.exit(1);
    }
}

uploadToCloudflare().catch(console.error);
