
import fetch from 'node-fetch';

const webhookUrl = process.argv[2];

if (!webhookUrl) {
    console.error('Error: Please provide the Webhook URL as an argument.');
    console.log('Usage: npx tsx scripts/test-webhook.ts https://your-n8n-webhook-url');
    process.exit(1);
}

const payload = {
    event: 'test_manual',
    title: 'Test Blog Post from Local Script',
    slug: 'test-post',
    image_url: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/480e383c-dc94-4d8d-6886-b0cc59ebae00/public'
};

console.log('🚀 Sending test payload to:', webhookUrl);
console.log('📦 Payload:', JSON.stringify(payload, null, 2));

async function sendWebhook() {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const text = await response.text();
        console.log(`✅ Status: ${response.status}`);
        console.log(`📝 Response: ${text}`);

        if (response.ok) {
            console.log('\n✨ Success! Check your n8n Executions log now.');
            console.log('If you see this execution in n8n but NO image in LINE, the issue is in your n8n "HTTP Request" node settings.');
            console.log('If you DO NOT see this execution in n8n, the Webhook URL is wrong or n8n is not active.');
        } else {
            console.log('\n❌ Failed. n8n returned an error.');
        }

    } catch (error) {
        console.error('\n❌ Network Error:', error);
    }
}

sendWebhook();
