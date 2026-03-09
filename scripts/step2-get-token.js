const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const CLIENT_ID = 'M3VpTkZ0YVRGdHZmVUdWWTRadng6MTpjaQ';
const CLIENT_SECRET = 'xVwL2k-QcHpYg_j-wLzI812cr1GkB2xE1UMp45dNggxFe3xh5j';
const CALLBACK_URL = 'http://127.0.0.1:3000/callback';

const client = new TwitterApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

async function main() {
    // ファイルからURLを読み込む
    const redirectUri = fs.readFileSync('url.txt', 'utf8').trim();

    try {
        const data = JSON.parse(fs.readFileSync('temp_twitter_auth.json', 'utf8'));
        const { codeVerifier, state: savedState } = data;

        const urlObj = new URL(redirectUri);
        const code = urlObj.searchParams.get('code');
        const state = urlObj.searchParams.get('state');

        console.log('Code:', code);
        console.log('State from URL:', state);
        console.log('Saved State:', savedState);

        if (!code || !state) throw new Error('No code/state in URL');
        if (state !== savedState) {
            console.warn('State mismatch warning! Trying anyway...');
            // throw new Error('State mismatch!'); 
        }

        const { accessToken, refreshToken, expiresIn } = await client.loginWithOAuth2({
            code,
            codeVerifier,
            redirectUri: CALLBACK_URL,
        });

        console.log('\n✅ SUCCEEDED!');

        const envContent = `TWITTER_ACCESS_TOKEN=${accessToken}\nTWITTER_REFRESH_TOKEN=${refreshToken}\n`;
        fs.writeFileSync('.env.twitter', envContent);
        console.log('Saved tokens to .env.twitter');

        // Clean up
        fs.unlinkSync('temp_twitter_auth.json');
        fs.unlinkSync('url.txt');

    } catch (e) {
        console.error('Error:', e);
    }
}

main();
