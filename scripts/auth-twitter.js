const { TwitterApi } = require('twitter-api-v2');
const readline = require('readline');

// ユーザーから提供されたキー
const CLIENT_ID = 'M3VpTkZ0YVRGdHZmVUdWWTRadng6MTpjaQ';
const CLIENT_SECRET = 'xVwL2k-QcHpYg_j-wLzI812cr1GkB2xE1UMp45dNggxFe3xh5j';

// Twitter Developer Portalで設定したCallback URLと同じである必要があります
// ここでは一般的なローカル開発用URLを指定します
const CALLBACK_URL = 'http://127.0.0.1:3000/callback';

const client = new TwitterApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    console.log('Twitter OAuth 2.0 認証スクリプト');
    console.log('-----------------------------------');

    // 1. 認証URLを生成
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
        CALLBACK_URL,
        { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    );

    console.log('1. 以下のURLをブラウザで開いて、コルクじじいのアカウントで認証してください:');
    console.log('\n', url, '\n');
    console.log('※ 注意: Developer Portalで設定したCallback URLが正しいか確認してください。');
    console.log('   設定されているURL: ' + CALLBACK_URL);
    console.log('   (設定が違う場合は、スクリプト内のCALLBACK_URLを書き換える必要があります)');

    console.log('2. 認証後、ブラウザのアドレスバーに表示されたURL全体をコピーして、ここに貼り付けてください:');

    rl.question('> ', async (redirectUri) => {
        try {
            // URLからcodeとstateを抽出
            const urlObj = new URL(redirectUri);
            const code = urlObj.searchParams.get('code');
            const receivedState = urlObj.searchParams.get('state');

            if (!code || !receivedState) {
                console.error('エラー: URLにコードまたはstateが含まれていません。');
                process.exit(1);
            }

            if (receivedState !== state) {
                console.error('エラー: stateが一致しません。セキュリティ上の問題・またはURLの手打ちミスの可能性があります。');
                process.exit(1);
            }

            // 3. アクセストークンを取得
            const { client: loggedClient, accessToken, refreshToken, expiresIn } = await client.loginWithOAuth2({
                code,
                codeVerifier,
                redirectUri: CALLBACK_URL,
            });

            console.log('\n-----------------------------------');
            console.log('✅ 認証成功！以下の情報を .env.local に保存してください。\n');
            console.log(`TWITTER_CLIENT_ID=${CLIENT_ID}`);
            console.log(`TWITTER_CLIENT_SECRET=${CLIENT_SECRET}`);
            console.log(`TWITTER_ACCESS_TOKEN=${accessToken}`);
            console.log(`TWITTER_REFRESH_TOKEN=${refreshToken}`);
            console.log('\n-----------------------------------');
            console.log('※ TWITTER_REFRESH_TOKEN があれば、アクセストークンが切れても自動更新できます。');

        } catch (e) {
            console.error('認証エラー:', e);
        } finally {
            rl.close();
        }
    });
}

main();
