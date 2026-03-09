const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const CLIENT_ID = 'M3VpTkZ0YVRGdHZmVUdWWTRadng6MTpjaQ';
const CLIENT_SECRET = 'xVwL2k-QcHpYg_j-wLzI812cr1GkB2xE1UMp45dNggxFe3xh5j';
const CALLBACK_URL = 'http://127.0.0.1:3000/callback';

const client = new TwitterApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
    CALLBACK_URL,
    { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
);

fs.writeFileSync('temp_twitter_auth.json', JSON.stringify({ codeVerifier, state }));
fs.writeFileSync('auth_url_utf8.txt', url, 'utf8');

console.log('Saved to auth_url_utf8.txt');
