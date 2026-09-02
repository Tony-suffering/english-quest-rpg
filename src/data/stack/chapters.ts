import type { Chapter } from './types';

/**
 * 全10章。
 *
 * コードは iwasaki-naisou-website / english-quest-rpg で実際に動いているものを
 * そのまま載せている。教材用に短くした箇所はあるが、動かないコードは1行も無い。
 *
 * free: true の章は note の無料部分に出す。残りは有料。
 */
export const CHAPTERS: Chapter[] = [
    {
        no: 1,
        slug: "naze-jibun-de-tsukuru",
        title: "なぜ自分で作るのか",
        lead: "市販の英語アプリが自分に合わない理由は、機能じゃなくて持ち主が違うから。",
        goal: "何を作るのか、なぜ買わずに作るのかが自分の言葉で言える",
        time: "読むだけ。15分",
        free: true,
        why: [
            "英語アプリは山ほどある。金を払えば明日から使える。それでも自分で建てる理由は一つで、市販のアプリは「自分がどこで詰まったか」を持っていないからだ。",
            "アプリが持っているのは、そのアプリが用意した単語と、そのアプリが決めた出題順だけ。俺が昨日のレッスンで言えなかった一文も、10回やって10回とも同じ場所で詰まった冠詞も、どこにも記録されない。次の日には無かったことになる。",
            "自分で建てると、詰まった場所がそのまま資産になる。データベースに1行入る。1年経つと、その1行が1万行になっている。1万行あると、自分がどういう英語で死ぬのかが数字で見える。ここまで来ると、それはもう英語アプリじゃなくて自分のカルテだ。",
            "だからこの教材はアプリの作り方を教えるものじゃない。自分のカルテを毎日1行ずつ増やす装置の建て方を教える。",
        ],
        steps: [
            {
                heading: "作るものを一文で決める",
                body: [
                    "最初にやることは環境構築じゃない。何を作るかを一文で書くこと。長い企画書はいらない。むしろ書くと動かなくなる。",
                    "俺の一文はこれだった。「今日言えなかった英語を1個ずつ貯めて、忘れる前に出してくる箱」。これだけ。単語帳アプリでも、AIコーチでも、ゲームでもない。箱だ。",
                    "一文が決まると、いま作らなくていいものが全部見える。ログイン画面はいらない。使うのは自分1人だから。他人と競うランキングもいらない。デザインも後でいい。要るのは箱と、箱に入れる口と、箱から出す口だけ。",
                ],
                code: [
                { file: "紙かメモ帳。コードじゃない", lang: "text", code: `作るもの（一文）:
  ___________________________________ を
  ___________________________________ する箱

作らないもの（3つ以上書く）:
  - ログイン
  - 他人とのランキング
  -
  -`, note: "ここが埋まらないうちに Next.js を入れると、必ず途中で何を作っていたか分からなくなる。" },
                ],
            },
            {
                heading: "毎日触るものだけが育つ",
                body: [
                    "自作アプリが死ぬ理由はバグじゃない。使わなくなるからだ。だから設計の基準は「機能が多いか」ではなく「明日も開くか」になる。",
                    "明日も開かせる条件は身も蓋もなくて、開いた瞬間にやることが1つだけ表示されていること。選択肢を出すと人は選ばない。俺のアプリは開くとカードが1枚出る。それを見て、言えたか言えなかったかを押す。それだけ。",
                    "機能を足したくなったら、その機能が「今日1枚めくる」の邪魔をしないか先に考える。邪魔をするなら足さない。これは我慢の話じゃなくて、邪魔をした機能は結局アプリごと殺すからだ。",
                ],
            },
            {
                heading: "全体の見取り図",
                body: [
                    "これから建てるものは3つの部品でできている。それ以上でも以下でもない。",
                    "一つ目が画面。ブラウザで見るところ。二つ目が保管庫。データベース。三つ目がその2つをつなぐ配管。API と呼ばれるやつ。",
                    "難しく見えるのは名前のせいで、やっていることは「画面が保管庫に取りに行って、持って帰って、並べる」だけ。この教材の残り9章は全部この一文の詳細でしかない。",
                ],
                code: [
                { file: "全体像", lang: "text", code: `  [ 画面 ]            ブラウザで見るところ
     |  fetch('/api/phrases')
     v
  [ 配管 ]            API route。SQL を投げる係
     |  SELECT * FROM phrases
     v
  [ 保管庫 ]          データベース。ここだけが本物`, note: "保管庫だけが本物。画面と配管は何度でも捨てて建て直していい。" },
                ],
            },
        ],
        traps: [
            { symptom: "何を作るか決まらないまま3日経った", cause: "一文が長すぎる。機能を列挙しはじめている", fix: "名詞1個まで削る。「箱」「カード」「記録」のどれかで言い切る" },
            { symptom: "既にあるアプリの方が良く見えてきて手が止まる", cause: "完成品と自分の1日目を比べている", fix: "比較対象を「昨日の自分のアプリ」に変える。市販品には一生勝てないし勝つ必要もない" },
        ],
        done: [
            "作るものが一文で書けた",
            "作らないものが3つ以上書けた",
            "画面・配管・保管庫の3部品構成が説明できる",
        ],
    },
    {
        no: 2,
        slug: "utsuwa-wo-tateru",
        title: "器を建てて、URL を世に出す",
        lead: "初日にやることは機能じゃない。自分の URL を1本、世界に生やすこと。",
        goal: "https://自分のなにか.vercel.app が他人のスマホでも開く",
        time: "30分から1時間",
        free: true,
        why: [
            "最初の日に機能を作ろうとすると必ず折れる。1日目に必要なのは動く機能じゃなくて、自分の名前がついた URL が実在するという事実だ。",
            "URL が生えると何が変わるかというと、翌日から作業が「開発」じゃなくて「更新」になる。ゼロから作るのは重いが、既にあるものを直すのは軽い。この差が3日目に効く。",
            "道具は Next.js を使う。理由は、画面とデータベースへの配管を1つのフォルダの中で書けるからだ。分けると管理する場所が2つになって、個人が1人でやるには重い。",
        ],
        steps: [
            {
                heading: "土台を1個作る",
                body: [
                    "ターミナルを開いて1行打つ。質問が出るので答える。全部デフォルトでいい。TypeScript は Yes、App Router も Yes にする。",
                    "終わると自分のパソコンの中にフォルダが1個できている。この時点で中身は空っぽの家だが、家は建っている。",
                ],
                code: [
                { file: "ターミナル", lang: "bash", code: `npx create-next-app@latest my-english-app`, note: "名前は後から変えられる。悩む時間がもったいない。" },
                { file: "ターミナル", lang: "bash", code: `cd my-english-app
npm run dev`, note: "http://localhost:3000 が開けば家は建っている。" },
                ],
            },
            {
                heading: "中身を全部消して、自分の1行を書く",
                body: [
                    "create-next-app が用意した初期画面はきれいだが、自分のものじゃない。全部消す。消すのが一番効く。",
                    "src/app/page.tsx を開いて、中身を捨てて、自分のアプリの名前を1行書く。これで家が自分のものになる。",
                ],
                code: [
                { file: "src/app/page.tsx", lang: "tsx", code: `export default function Home() {
    return (
        <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
            <h1>俺の英語箱</h1>
            <p>まだ何も入っていない。</p>
        </main>
    );
}`, note: "CSS は後でいい。今日は文字が出れば勝ち。" },
                ],
            },
            {
                heading: "世に出す",
                body: [
                    "GitHub にリポジトリを1個作って、そこに上げる。次に Vercel にログインして、そのリポジトリを選ぶ。ボタンを押す。終わり。",
                    "1分ほどで URL が出る。スマホで開く。ここで一回止まっていい。これが今日の成果で、これ以上のことは今日はやらない。",
                ],
                code: [
                { file: "ターミナル", lang: "bash", code: `git init
git add -A
git commit -m "first"
git branch -M main
git remote add origin https://github.com/自分の名前/my-english-app.git
git push -u origin main`, note: "このあと vercel.com で Import。設定はいじらない。" },
                ],
            },
        ],
        traps: [
            { symptom: "npm run dev でエラーが大量に出る", cause: "Node のバージョンが古い", fix: "node -v で 20 以上か確認する。古ければ Node を入れ直す" },
            { symptom: "Vercel のビルドは通るのに画面が真っ白", cause: "page.tsx で export default を書き忘れている", fix: "export default function が1個あるか確認する" },
            { symptom: "git push で認証を聞かれて進めない", cause: "パスワード認証は廃止されている", fix: "GitHub の Personal Access Token を作ってパスワード欄に貼る" },
        ],
        done: [
            "自分のスマホで自分の URL が開いた",
            "家族か友達に URL を送って、開いたと言われた",
            "git push すると Vercel が勝手に更新するのを確認した",
        ],
    },
    {
        no: 3,
        slug: "data-no-okiba",
        title: "データの置き場を決める",
        lead: "localStorage で始めると必ず1回全部消える。最初からデータベースにする。",
        goal: "Cloudflare D1 のデータベースが1個でき、API トークンが手元にある",
        time: "30分",
        free: false,
        why: [
            "最初は localStorage で十分に見える。ブラウザの中に保存できるし、コードも3行で済む。実際3日目までは幸せだ。",
            "死ぬのは4日目以降で、理由は3つある。スマホで入れたデータがパソコンで見えない。ブラウザのキャッシュを消したら全部消える。そして一番きついのが、iPhone の Safari は容量が足りないと勝手に捨てる。",
            "半年貯めた自分の英語が、ある朝いきなり空になる。この事故を1回やると二度とアプリを開かなくなる。だから最初からデータベースにする。手間は1時間しか変わらない。",
            "D1 を選ぶ理由は、無料枠が個人には使い切れないほど広いことと、SQLite と同じ SQL がそのまま書けることの2つ。サーバーを立てる必要も、金を払う必要も、当面ない。",
        ],
        steps: [
            {
                heading: "データベースを1個作る",
                body: [
                    "Cloudflare のアカウントを作って、ダッシュボードから Workers & Pages を開き、D1 を選んで Create database を押す。名前を決めて作る。それだけ。",
                    "できたら Database ID という長い文字列が表示される。これを控えておく。あとで使う。",
                ],
                code: [
                { file: "控えるもの", lang: "text", code: `Account ID   : ダッシュボード右側に出ている
Database ID  : D1 のデータベース詳細ページに出ている
API Token    : 次のステップで作る`, note: "この3つが揃うと、どこからでもデータベースを触れる。" },
                ],
            },
            {
                heading: "API トークンを作る",
                body: [
                    "My Profile から API Tokens を開いて、Create Token。テンプレートは使わず Custom token にして、権限は D1 の Edit だけ付ける。",
                    "出てきたトークンは一度しか表示されない。その場でコピーして、プロジェクトの .env.local に貼る。",
                ],
                code: [
                { file: ".env.local", lang: "bash", code: `CLOUDFLARE_ACCOUNT_ID=ここにアカウントID
CLOUDFLARE_API_TOKEN=ここにトークン
CLOUDFLARE_DATABASE_ID=ここにデータベースID`, note: ".env.local は .gitignore に入っているか必ず確認する。GitHub に上げたら他人が自分のデータベースを消せる。" },
                ],
            },
            {
                heading: "配管の口を1個だけ書く",
                body: [
                    "データベースを触る関数を1個だけ作る。SQL を渡すと結果が返ってくる、それだけの関数。以降この教材で出てくるデータベース操作は全部これを通る。",
                    "下のコードは俺のアプリで今も動いているものをそのまま持ってきた。書き換えているのは何もない。",
                ],
                code: [
                { file: "src/lib/d1.ts", lang: "ts", code: `const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;

interface D1Result<T> {
    results: T[];
    success: boolean;
}

interface D1Response<T> {
    result: D1Result<T>[];
    success: boolean;
    errors: { message: string }[];
}

export async function executeQuery<T>(
    sql: string,
    params: (string | number | null)[] = []
): Promise<D1Result<T>> {
    if (!CLOUDFLARE_API_TOKEN) {
        throw new Error('CLOUDFLARE_API_TOKEN is not set');
    }

    const response = await fetch(
        \`https://api.cloudflare.com/client/v4/accounts/\${CLOUDFLARE_ACCOUNT_ID}/d1/database/\${DATABASE_ID}/query\`,
        {
            method: 'POST',
            headers: {
                'Authorization': \`Bearer \${CLOUDFLARE_API_TOKEN}\`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql, params }),
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        throw new Error(\`D1 API error: \${await response.text()}\`);
    }

    const data: D1Response<T> = await response.json();
    if (!data.success) {
        throw new Error(\`D1 query failed: \${data.errors.map(e => e.message).join(', ')}\`);
    }

    return data.result[0];
}`, note: "cache: no-store を外すと、書き換えたのに古い値が返ってきて半日溶かす。" },
                ],
            },
        ],
        traps: [
            { symptom: "CLOUDFLARE_API_TOKEN is not set と出る", cause: ".env.local を作った後に開発サーバーを再起動していない", fix: "一度 Ctrl+C で止めて npm run dev をやり直す。環境変数は起動時にしか読まれない" },
            { symptom: "ローカルでは動くのに Vercel で 500 になる", cause: ".env.local は GitHub に上がらないので Vercel 側には無い", fix: "Vercel の Settings > Environment Variables に同じ3つを手で入れる" },
            { symptom: "書き換えたのに古いデータが返ってくる", cause: "fetch がキャッシュしている", fix: "cache: 'no-store' が付いているか確認する" },
        ],
        done: [
            "D1 のデータベースが1個ある",
            ".env.local に3つの値が入っていて、.gitignore に守られている",
            "Vercel 側にも同じ環境変数を入れた",
        ],
    },
    {
        no: 4,
        slug: "table-wo-hitotsu",
        title: "テーブルを1つだけ作る",
        lead: "列は4つでいい。増やしたくなるが、増やすと使わなくなる。",
        goal: "phrases テーブルができて、手で1行入っている",
        time: "20分",
        free: false,
        why: [
            "データベース設計と聞くと構えるが、個人アプリでやることは「表を1枚作る」だけだ。Excel のシートを1枚作るのと変わらない。",
            "難しいのは設計じゃなくて我慢の方で、作りはじめると列を足したくなる。難易度、品詞、出典、タグ、お気に入り。全部いま思いつくが、全部いらない。",
            "列を足すと入力が重くなる。入力が重いと入れなくなる。入れないとデータが貯まらない。データが貯まらないとアプリの意味が消える。だから最初は4列でいい。足すのは、その列が無くて実際に困った日でいい。",
            "俺のアプリは1万行を超えているが、いまだに主要な列は5つしかない。",
        ],
        steps: [
            {
                heading: "表を1枚作る",
                body: [
                    "Cloudflare の D1 ダッシュボードにコンソールがある。そこに SQL を貼って実行する。ターミナルは要らない。",
                    "列の意味はこうだ。id はその行の名札。english が英語、japanese が日本語、date はいつ入れたか。以上。",
                ],
                code: [
                { file: "D1 コンソール", lang: "sql", code: `CREATE TABLE IF NOT EXISTS phrases (
    id         TEXT PRIMARY KEY,
    english    TEXT NOT NULL,
    japanese   TEXT NOT NULL,
    category   TEXT NOT NULL,
    date       TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);`, note: "category は「どのジャンルか」。無くてもいいが、後でここが効いてくる。" },
                ],
            },
            {
                heading: "手で1行入れる",
                body: [
                    "アプリを作る前に、手で1行入れておく。理由は、次の章で画面に出す時に「空っぽだから出ないのか、バグで出ないのか」が分からなくなるからだ。",
                    "中身は何でもいい。今日のレッスンで言えなかった一文を入れるのが一番いい。",
                ],
                code: [
                { file: "D1 コンソール", lang: "sql", code: `INSERT INTO phrases (id, english, japanese, category, date)
VALUES ('test001', 'I should have said that.', 'それ言えばよかった。', 'daily', '2026-09-02');`, note: "入れたら SELECT * FROM phrases; で見えるか確認する。" },
                ],
            },
            {
                heading: "型を1個決めておく",
                body: [
                    "TypeScript を使っているので、この表の形を型として書いておく。書いておくと、以降タイプミスをエディタが止めてくれる。",
                    "ここをサボると、後で japanese を japanse と打って30分溶かす。実話。",
                ],
                code: [
                { file: "src/lib/d1.ts", lang: "ts", code: `export interface Phrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
    created_at?: string;
}`, note: "表の列と1対1で対応させる。ずれたら必ず後で刺さる。" },
                ],
            },
        ],
        traps: [
            { symptom: "no such table: phrases と出る", cause: "CREATE TABLE を実行したデータベースと、アプリが見ているデータベースが違う", fix: ".env.local の DATABASE_ID が、コンソールを開いているデータベースの ID と一致しているか見る" },
            { symptom: "UNIQUE constraint failed: phrases.id", cause: "同じ id で2回入れようとしている", fix: "id は毎回違う文字列にする。次章で自動生成するので手入力は今日だけ" },
            { symptom: "列を足したくて手が止まる", cause: "完成形を先に作ろうとしている", fix: "足すのは後でできる。ALTER TABLE で1行。いま止まる方が損" },
        ],
        done: [
            "phrases テーブルがある",
            "手で入れた1行が SELECT で見える",
            "Phrase 型が書けている",
        ],
    },
    {
        no: 5,
        slug: "yomu",
        title: "読む。保管庫から画面へ",
        lead: "画面はデータベースを直接触らない。あいだに配管を1本通す。",
        goal: "手で入れた1行が、自分の URL の画面に出る",
        time: "40分",
        free: false,
        why: [
            "ここが山場で、ここを越えると残りは全部同じ形の繰り返しになる。",
            "画面から直接データベースを触りたくなるが、絶対にやらない。画面のコードはブラウザに丸見えなので、API トークンを書いた瞬間に他人が自分のデータベースを消せるようになる。",
            "だから間に1枚挟む。API route と呼ばれる。役割は「ブラウザから頼まれたらデータベースに行って、持って帰って渡す」。トークンはこの中にだけ置く。ブラウザには渡さない。",
        ],
        steps: [
            {
                heading: "取ってくる関数を書く",
                body: [
                    "前章の executeQuery を使って、全部の行を取る関数を1個書く。SQL は1行。",
                ],
                code: [
                { file: "src/lib/d1.ts", lang: "ts", code: `export async function getAllPhrases(): Promise<Phrase[]> {
    const result = await executeQuery<Phrase>(
        'SELECT * FROM phrases ORDER BY date DESC, id ASC'
    );
    return result.results;
}`, note: "新しい順に並べている。ORDER BY を書かないと順番は保証されない。" },
                ],
            },
            {
                heading: "配管を1本通す",
                body: [
                    "src/app/api/phrases/route.ts というファイルを作る。この場所に置くと、それだけで /api/phrases という URL ができる。設定ファイルはいらない。",
                    "下は俺のアプリで動いている本物。try で囲んで、失敗したら 500 を返す。この形を全部の API で使い回す。",
                ],
                code: [
                { file: "src/app/api/phrases/route.ts", lang: "ts", code: `import { NextResponse } from 'next/server';
import { getAllPhrases } from '@/lib/d1';

export async function GET() {
    try {
        const phrases = await getAllPhrases();
        return NextResponse.json({ phrases, success: true });
    } catch (error) {
        console.error('Error fetching phrases:', error);
        return NextResponse.json(
            { error: 'Failed to fetch phrases', success: false },
            { status: 500 }
        );
    }
}`, note: "success を必ず返すのがコツ。画面側が「取れたのか失敗したのか」を1行で判定できる。" },
                ],
            },
            {
                heading: "配管だけ先に確認する",
                body: [
                    "画面を作る前に、配管が生きているかブラウザで直接確認する。開発サーバーを動かしたまま、アドレスバーに /api/phrases と打つ。",
                    "JSON が出れば配管は通っている。ここで確認しておくと、画面に出なかった時に「配管かデザインか」で悩まなくて済む。",
                ],
                code: [
                { file: "ブラウザ", lang: "text", code: `http://localhost:3000/api/phrases

こう返ってくれば成功:
{"phrases":[{"id":"test001","english":"I should have said that.", ... }],"success":true}`, note: "500 が返るならデータベース側。空配列なら行が入っていない。" },
                ],
            },
            {
                heading: "画面に出す",
                body: [
                    "最後に画面。ブラウザ側で動くコードなので先頭に use client を書く。開いた時に1回だけ取りに行って、返ってきたら並べる。",
                ],
                code: [
                { file: "src/app/page.tsx", lang: "tsx", code: `'use client';

import { useEffect, useState } from 'react';

interface Phrase {
    id: string;
    english: string;
    japanese: string;
}

export default function Home() {
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/phrases')
            .then(r => r.json())
            .then(d => { if (d.success) setPhrases(d.phrases); })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <main style={{ padding: 40 }}>読み込み中</main>;

    return (
        <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
            <h1>俺の英語箱</h1>
            <p>{phrases.length} 個</p>
            {phrases.map(p => (
                <div key={p.id} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: 700 }}>{p.english}</div>
                    <div style={{ color: '#666', fontSize: 14 }}>{p.japanese}</div>
                </div>
            ))}
        </main>
    );
}`, note: "key={p.id} を忘れると React が警告を出す。id を主キーにしておいた理由がここ。" },
                ],
            },
        ],
        traps: [
            { symptom: "画面が「読み込み中」から動かない", cause: "fetch が失敗して finally まで行っていないか、例外が握り潰されている", fix: "ブラウザの開発者ツールの Network で /api/phrases のステータスを見る" },
            { symptom: "ブラウザのコンソールに CLOUDFLARE_API_TOKEN が見える", cause: "環境変数の名前に NEXT_PUBLIC_ を付けている", fix: "即座に外す。NEXT_PUBLIC_ が付いた変数はブラウザに全部渡る。トークンは作り直す" },
            { symptom: "Vercel に上げたら 500", cause: "本番側の環境変数が未設定", fix: "Vercel の Environment Variables を確認して、入れたら Redeploy する" },
        ],
        done: [
            "/api/phrases が JSON を返す",
            "手で入れた1行が画面に出ている",
            "Vercel 側でも同じ画面が出る",
        ],
    },
    {
        no: 6,
        slug: "kaku",
        title: "書く。入れる口を作る",
        lead: "D1 のコンソールで入れているうちは続かない。3秒で入る口を作る。",
        goal: "スマホから英語を1個足せる",
        time: "40分",
        free: false,
        why: [
            "読めるようになると次に欲しくなるのが入れる口で、ここの出来がアプリの寿命を決める。",
            "理由は単純で、英語を「あ、これ言えなかった」と思う瞬間は歩いている時か風呂上がりで、パソコンの前じゃない。その場で入らないものは翌朝には忘れている。",
            "だから入力欄は2つまで。英語と日本語。カテゴリも日付も自動で埋める。選ばせない。選ばせた瞬間に3秒が15秒になって、15秒かかるものは使われない。",
        ],
        steps: [
            {
                heading: "入れる関数を書く",
                body: [
                    "取る時と同じで、まず SQL を投げる関数を1個。id は毎回違う文字列がいるので nanoid を入れる。",
                ],
                code: [
                { file: "ターミナル", lang: "bash", code: `npm install nanoid` },
                { file: "src/lib/d1.ts", lang: "ts", code: `export async function addPhrase(p: Phrase): Promise<Phrase> {
    await executeQuery(
        \`INSERT INTO phrases (id, english, japanese, category, date)
         VALUES (?, ?, ?, ?, ?)\`,
        [p.id, p.english, p.japanese, p.category, p.date]
    );
    return p;
}`, note: "値を ? にして params で渡す。文字列を直接つなぐと、短縮形のアポストロフィを含む英語で必ず壊れる。" },
                ],
            },
            {
                heading: "同じ配管に POST を足す",
                body: [
                    "新しいファイルは作らない。さっきの route.ts に POST を書き足すだけで /api/phrases が書き込みも受けるようになる。",
                    "下は俺のアプリのものを、この教材用に少しだけ削ったもの。必須項目が無い時に 400 を返すところは削っていない。ここを削ると空行がデータベースに貯まる。",
                ],
                code: [
                { file: "src/app/api/phrases/route.ts", lang: "ts", code: `import { nanoid } from 'nanoid';
import { addPhrase } from '@/lib/d1';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { english, japanese } = body;

        if (!english) {
            return NextResponse.json(
                { error: 'Missing required fields', success: false },
                { status: 400 }
            );
        }

        const now = new Date();
        const date = \`\${now.getFullYear()}-\${String(now.getMonth() + 1).padStart(2, '0')}-\${String(now.getDate()).padStart(2, '0')}\`;

        const phrase = await addPhrase({
            id: nanoid(8),
            english,
            japanese: japanese || '',
            category: body.category || 'daily',
            date,
        });

        return NextResponse.json({ phrase, success: true }, { status: 201 });
    } catch (error) {
        console.error('Error adding phrase:', error);
        return NextResponse.json(
            { error: 'Failed to add phrase', success: false },
            { status: 500 }
        );
    }
}`, note: "日付を new Date().toISOString() で作ると UTC になって、夜に入れた分が前日になる。手で組む方が安全。" },
                ],
            },
            {
                heading: "3秒で入る口",
                body: [
                    "画面に入力欄を2つと、ボタンを1個置く。送ったら即座に一覧の先頭に足す。サーバーの返事を待って画面を作り直すと遅く感じる。",
                ],
                code: [
                { file: "src/app/page.tsx", lang: "tsx", code: `const [en, setEn] = useState('');
const [ja, setJa] = useState('');

async function add() {
    if (!en.trim()) return;
    const res = await fetch('/api/phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ english: en, japanese: ja }),
    });
    const d = await res.json();
    if (d.success) {
        setPhrases(prev => [d.phrase, ...prev]);
        setEn('');
        setJa('');
    }
}`, note: "成功したら入力欄を空にする。空にしないと連続で入れられない。" },
                ],
            },
        ],
        traps: [
            { symptom: "I'm や don't を入れると 500 になる", cause: "SQL に文字列を直接つないでいる", fix: "? と params 方式に直す。これは SQL インジェクションの防止も兼ねる" },
            { symptom: "夜に入れた分の日付が前日になっている", cause: "toISOString() で UTC の日付を使っている", fix: "getFullYear / getMonth / getDate で手で組む" },
            { symptom: "同じものを何度も入れてしまう", cause: "重複チェックが無い", fix: "入れる前に SELECT で english の一致を見る。俺のアプリは重複なら duplicate: true を返して静かに無視する" },
        ],
        done: [
            "スマホから1個足せた",
            "足した瞬間に一覧の先頭に出る",
            "アポストロフィ入りの英語が壊れずに入る",
        ],
    },
    {
        no: 7,
        slug: "sawatta-kaisu",
        title: "触った回数を数える。ここでアプリになる",
        lead: "貯めるだけなら Excel でいい。回数を数えた瞬間に、これは道具になる。",
        goal: "カードをめくるたびに回数が1増えて、保存される",
        time: "1時間",
        free: false,
        why: [
            "ここまでで作ったものは、まだ入れて並べるだけの箱だ。Excel でもできる。",
            "アプリになるのは、1個ずつの語が「自分に何回触られたか」を持ちはじめた瞬間だ。回数を持つと、まだ触っていない語が特定できる。特定できると、出す順番を決められる。順番が決まると、それは学習装置になる。",
            "重要なのは、回数を別の表に置くこと。phrases に列を足したくなるが、分けた方がいい。理由は、英語そのものは変わらないが回数は毎日変わるからだ。変わるものと変わらないものを一緒にすると、後で必ず絡まる。",
        ],
        steps: [
            {
                heading: "回数の表を作る",
                body: [
                    "phrase_mastery という表を1枚。どの語が何回か、それだけ。",
                ],
                code: [
                { file: "D1 コンソール", lang: "sql", code: `CREATE TABLE IF NOT EXISTS phrase_mastery (
    phrase_id     TEXT PRIMARY KEY,
    mastery_level INTEGER NOT NULL DEFAULT 0,
    updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);`, note: "phrase_id を主キーにすると、1つの語に1行しか作れなくなる。二重計上が構造的に起きない。" },
                ],
            },
            {
                heading: "無ければ作る、あれば足す",
                body: [
                    "ここが個人アプリで一番よく間違えるところ。「もうあるか」を先に調べて、無ければ INSERT、あれば UPDATE、と書くと、押した瞬間に2回走って壊れる。",
                    "SQLite には1文でどっちもやる書き方がある。ON CONFLICT。これを使う。俺のアプリもこれで動いている。",
                ],
                code: [
                { file: "src/lib/d1.ts", lang: "ts", code: `export async function setMastery(phraseId: string, level: number): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        \`INSERT INTO phrase_mastery (phrase_id, mastery_level, updated_at)
         VALUES (?, ?, ?)
         ON CONFLICT(phrase_id) DO UPDATE SET
           mastery_level = ?,
           updated_at = ?\`,
        [phraseId, level, now, level, now]
    );
}

export async function getMasteryMap(): Promise<Record<string, number>> {
    try {
        const result = await executeQuery<{ phrase_id: string; mastery_level: number }>(
            'SELECT * FROM phrase_mastery'
        );
        const map: Record<string, number> = {};
        result.results.forEach(m => { map[m.phrase_id] = m.mastery_level; });
        return map;
    } catch {
        return {};
    }
}`, note: "getMasteryMap が try で囲んで空を返すのは、表がまだ無い時にアプリ全体を落とさないため。" },
                ],
            },
            {
                heading: "上限を決める",
                body: [
                    "回数は無限に増やさない。上限を決める。俺は6にしている。6回触ったらその語は「反射になった」扱いで、通常の出題から外れる。",
                    "上限が無いと、既に完璧な語ばかり回数が伸びて、苦手な語が永遠に埋もれる。上限は手抜きじゃなくて、埋もれ防止の装置だ。",
                ],
                code: [
                { file: "src/app/api/mastery/route.ts", lang: "ts", code: `const MAX_LEVEL = 6;

export async function POST(request: Request) {
    try {
        const { phraseId, current } = await request.json();
        if (!phraseId) {
            return NextResponse.json({ success: false }, { status: 400 });
        }
        const next = Math.min((current ?? 0) + 1, MAX_LEVEL);
        await setMastery(phraseId, next);
        return NextResponse.json({ level: next, success: true });
    } catch (error) {
        console.error('Error updating mastery:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}`, note: "Math.min で上限を切る。画面側でも切るが、サーバー側で切らないと必ず抜ける。" },
                ],
            },
        ],
        traps: [
            { symptom: "1回押したのに2増える", cause: "React の StrictMode で開発時に2回走っているか、ボタンの多重押下", fix: "送信中フラグを立ててボタンを無効化する。それでも増えるならサーバー側で日時を見て弾く" },
            { symptom: "回数が保存されない", cause: "ON CONFLICT の対象列が主キーになっていない", fix: "phrase_id が PRIMARY KEY か確認する。ただの列だと ON CONFLICT が効かない" },
            { symptom: "得意な語ばかり出てくる", cause: "上限を設けていない", fix: "MAX_LEVEL を決めて、到達した語を出題から外す" },
        ],
        done: [
            "カードを押すと回数が増える",
            "ページを再読み込みしても回数が残っている",
            "6回で止まる",
        ],
    },
    {
        no: 8,
        slug: "dasu-junban",
        title: "出す順番を決める",
        lead: "ランダムは楽だが、ランダムだと一生出てこない語ができる。",
        goal: "開くと「いま一番弱い語」が出てくる",
        time: "40分",
        free: false,
        why: [
            "順番の決め方でアプリの性格が決まる。ここが自作の一番おいしいところで、市販アプリでは絶対に変えられない部分だ。",
            "ランダムは実装が1行で済むが、1万件あると同じ語に次に会うのが数十日後になる。忘却より遅い。",
            "間隔反復のちゃんとしたアルゴリズムもあるが、個人の1本目には重い。俺が使っているのはもっと雑で、「触った回数が少ない順。同じ回数なら古い順」。これだけで、放置された語が必ず先頭に来る。",
            "雑なやり方の強みは、途中で気に入らなければ2行で変えられることだ。凝った実装は変えるのが怖くなって、結局そのまま使い続けることになる。",
        ],
        steps: [
            {
                heading: "弱い順に並べる",
                body: [
                    "回数の表と語の表をくっつけて並べ替える。まだ1回も触っていない語は回数の行が無いので、COALESCE で 0 として扱う。",
                ],
                code: [
                { file: "src/lib/d1.ts", lang: "ts", code: `export async function getWeakestPhrases(limit = 20): Promise<Phrase[]> {
    const result = await executeQuery<Phrase>(
        \`SELECT p.*
           FROM phrases p
           LEFT JOIN phrase_mastery m ON m.phrase_id = p.id
          WHERE COALESCE(m.mastery_level, 0) < 6
       ORDER BY COALESCE(m.mastery_level, 0) ASC,
                p.date ASC
          LIMIT ?\`,
        [limit]
    );
    return result.results;
}`, note: "LEFT JOIN なので、一度も触っていない語も落ちずに残る。ここを普通の JOIN にすると新品の語が全部消える。" },
                ],
            },
            {
                heading: "弱い順のまま出すと飽きる",
                body: [
                    "完全に弱い順だと毎日同じ並びになって飽きる。弱い順に20件だけ取って、その20件の中でシャッフルする。",
                    "「弱いものから」と「毎日ちょっと違う」が両立する。これで十分もつ。",
                ],
                code: [
                { file: "src/app/page.tsx", lang: "tsx", code: `function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [a[i], a[r]] = [a[r], a[i]];
    }
    return a;
}`, note: "元の配列を書き換えないように [...arr] でコピーする。書き換えると React が変化に気付かない。" },
                ],
            },
            {
                heading: "1枚ずつ出す",
                body: [
                    "一覧をやめて、1枚ずつにする。ここが「箱」と「トレーニング」の分かれ目で、一覧は眺めて終わるが、1枚ずつは手が動く。",
                    "英語だけ見せて、押したら日本語を出す。合っていたら回数を1増やして次へ。それだけ。",
                ],
                code: [
                { file: "src/app/train/page.tsx", lang: "tsx", code: `const [i, setI] = useState(0);
const [open, setOpen] = useState(false);
const card = queue[i];

async function ok() {
    await fetch('/api/mastery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phraseId: card.id, current: mastery[card.id] ?? 0 }),
    });
    setOpen(false);
    setI(n => n + 1);
}

if (!card) return <main style={{ padding: 40 }}>今日の分は終わり。</main>;`, note: "queue を使い切ったら終わりにする。無限に続くと終わりが来なくて、終わりが無いと明日開かない。" },
                ],
            },
        ],
        traps: [
            { symptom: "一度も触っていない語が1つも出てこない", cause: "JOIN が LEFT JOIN になっていない", fix: "LEFT JOIN にして COALESCE で 0 を補う" },
            { symptom: "毎日まったく同じ並びで飽きる", cause: "弱い順のまま出している", fix: "上位20件を取ってからシャッフルする" },
            { symptom: "終わりが来なくて疲れる", cause: "キューを無限に補充している", fix: "1日の枚数を決めて、使い切ったら終了画面を出す" },
        ],
        done: [
            "開くと一番触っていない語が出る",
            "1枚ずつめくれる",
            "使い切ると終了画面が出る",
        ],
    },
    {
        no: 9,
        slug: "keiki",
        title: "記録を計器にする",
        lead: "数字を出すのは簡単。難しいのは、その数字に根拠を持たせること。",
        goal: "自分の実力を、嘘のつけない数字で1つ出せる",
        time: "1時間",
        free: false,
        why: [
            "ここまで来ると数字を出したくなる。総数、連続日数、レベル。出すと嬉しいし、実際モチベーションになる。",
            "ただし、ここに落とし穴がある。俺は自分のアプリのレベルを「触った回数の累積」で計算していた。回数が増えればレベルが上がる。Lv.100 まで行って「英語の神」という称号が出た。",
            "それを見て気付いた。1万語あるうち、完成しているのは229語で2.2%。平均レベルは4.7。この状態で「英語の神」と表示されている。この数字は何も証明していない。ただの飾りだった。",
            "飾りと計器の違いは、下がるかどうかだ。積み上げた分だけ増える数字は、努力の記録であって実力の記録じゃない。実力の数字は、放置すれば下がらないといけない。",
            "だから軸を2本に割った。この章はその話をする。",
        ],
        steps: [
            {
                heading: "2本に割る",
                body: [
                    "1本目は距離。触った回数の累積。これは下がらないし、下げる必要もない。走った分は走った分だ。",
                    "2本目が実力。いま何ができるか。これは所持している語の状態から毎回計算し直す。だから何もしなければ変わらないし、語を増やして手を付けなければ比率として下がる。",
                    "大事なのは、この2本を1つの数字に混ぜないこと。混ぜた瞬間に、どちらの意味も消える。",
                ],
                code: [
                { file: "src/data/rank-system.ts", lang: "ts", code: `// 距離。触った回数の累積。上限なし
export function xpForLevel(lv: number): number {
    if (lv <= 1) return 0;
    return Math.floor(13 * Math.pow(lv, 2.3));
}

export function levelFromXP(totalXP: number): number {
    let lv = 1;
    while (xpForLevel(lv + 1) <= totalXP) lv++;
    return lv;
}`, note: "2.3乗にすると、序盤はぽんぽん上がって後半は重くなる。線形だと後半が退屈で、3乗だと後半が絶望する。" },
                ],
            },
            {
                heading: "実力の根拠は1本だけにする",
                body: [
                    "実力の数字を作る時、複数の要素を重み付けで足したくなる。触った回数×0.5 + 録音×0.8、みたいに。これは絶対にやらない。",
                    "重みは自分で決めた数字なので、根拠を聞かれた時に答えられない。答えられない数字は飾りに戻る。",
                    "根拠は1本にする。俺は「録音があって、かつ自分で例文を書いた語の数」にした。これは事実であって解釈じゃない。3,127語ある、と言い切れる。",
                ],
                code: [
                { file: "src/data/rank-system.ts", lang: "ts", code: `export interface Meters {
    voiced: number;        // 録音がある語
    owned: number;         // 録音 + 自分の例文がある語。ランクはこれだけで決まる
    reflex: number;        // 触った回数が上限に達した語
    total: number;
    voicedNoLink: number;  // 録音はあるが例文が無い。次に埋める在庫
}

export function countMeters(
    items: { touches: number; hasRec: boolean; hasLink: boolean }[]
): Meters {
    let voiced = 0, owned = 0, reflex = 0, voicedNoLink = 0;
    for (const it of items) {
        if (it.hasRec) voiced++;
        if (it.hasRec && it.hasLink) owned++;
        if (it.hasRec && !it.hasLink) voicedNoLink++;
        if (it.touches >= 6) reflex++;
    }
    return { voiced, owned, reflex, total: items.length, voicedNoLink };
}`, note: "派生済みのレベル値から逆算せず、生のデータを数える。派生から逆算すると必ず水増しされる。" },
                ],
            },
            {
                heading: "区切りを外から借りる",
                body: [
                    "「3,127語ある」だけだと、それが凄いのかどうか分からない。段位に変えるには区切りがいるが、その区切りを自分で決めると、また根拠のない数字になる。",
                    "だから外から借りる。語彙研究には昔から使われている目安があって、1,000語族で話し言葉の約8割、3,000語族で日常会話の約95%、8,000から9,000語族で辞書なしで新聞が読める、という帯がある。この帯をそのまま段位の境目にした。",
                    "ただし正直に書いておくべきことが1つある。この数字は「最頻語から順に」という前提の話で、自分が貯めた語は頻度順じゃない。だから「あなたは95%理解できる」とは言えない。言えるのは「3,000語族に相当する量に到達した」まで。この但し書きを画面に出しておく。出しておかないと、他人に売った時に嘘になる。",
                ],
                code: [
                { file: "src/data/rank-system.ts", lang: "ts", code: `export const RANK_TIERS = [
    { key: 'E',   owned: 0,    label: '入口',   basis: 'まだ自分の文が無い' },
    { key: 'D',   owned: 250,  label: '足場',   basis: '最頻250語帯。用が足りる最低ライン' },
    { key: 'C',   owned: 500,  label: '土台',   basis: '最頻500語帯。会話の骨が組める' },
    { key: 'B',   owned: 1000, label: '実用',   basis: '1,000語族。話し言葉のおよそ8割を占める帯' },
    { key: 'A',   owned: 2000, label: '自立',   basis: '2,000語族。一般テキストの8割強を占める帯' },
    { key: 'S',   owned: 3000, label: '手中',   basis: '3,000語族。日常会話のおよそ95%を占める帯' },
    { key: 'SS',  owned: 5000, label: '読破',   basis: '5,000語族。一般書籍・雑誌が読み通せる帯' },
    { key: 'SSS', owned: 8000, label: '無辞書', basis: '8,000-9,000語族。新聞と小説を辞書なしで読む帯' },
];`, note: "basis をデータに持たせて画面に出す。根拠を隠すと、自分でも半年後に理由を忘れる。" },
                ],
            },
            {
                heading: "「あと N 語」で終わらせない",
                body: [
                    "段位を出すと「次まであと1,873語」と表示できる。ここで終わると、まだ半分飾りだ。1,873語をどうやって埋めるのかが書いていない。",
                    "手元のデータを引き算すると、次の一手が出てくる。録音はしたが例文を書いていない語が1,731ある。つまり新しく単語を覚えなくても、そこに文を書くだけで段位はほぼ次まで届く。",
                    "ここまで出して、はじめて数字が道具になる。見て気持ちよくなるものから、見たら手が動くものに変わる。",
                ],
                code: [
                { file: "画面に出る文", lang: "text", code: `RANK S / 手中
自分の文にした語 3,127 / 所持 10,338
3,000語族。日常会話のおよそ95%を占める帯

次は SS / 読破        あと 1,873 語

次の一手 --- 録音済みで自分の文が無い語が 1,731 語ある。
             ここに文を1本書くたび RANK が1語ぶん動く`, note: "在庫が尽きたら「新しい語を入れないと動かない」に切り替わる。次にやることが常に1行で出る状態を保つ。" },
                ],
            },
        ],
        traps: [
            { symptom: "画面ごとにレベルの数字が違う", cause: "同じ計算式を複数のファイルにコピーしていて、片方だけ直した", fix: "計算式を1ファイルに集めて、全画面がそこから import する。俺はこれで Lv.100 の上限が片方だけ残っていた" },
            { symptom: "数字は綺麗だが見ても何もしたくならない", cause: "結果しか出していない", fix: "在庫を出す。「あと N」ではなく「いま手元に N ある」に変える" },
            { symptom: "実力の数字が絶対に下がらない", cause: "累積で計算している", fix: "毎回データから計算し直す形にする。保存した値を足していく形にしない" },
        ],
        done: [
            "距離の数字と実力の数字が別々に出ている",
            "実力の数字の根拠が1本で説明できる",
            "画面に「次の一手」が具体的な数で出ている",
        ],
    },
    {
        no: 10,
        slug: "mainichi-mawasu",
        title: "毎日回す。壊れる場所と直し方",
        lead: "完成はしない。毎日1個ずつ直すものになる。それでいい。",
        goal: "壊れても翌日また開ける状態",
        time: "運用の話",
        free: false,
        why: [
            "自作アプリは完成しない。使い続けるかぎり毎日どこかが気に入らなくなって、直す。これは失敗じゃなくて正常な状態だ。",
            "危ないのは壊れた時で、壊れて1日開かないと、2日目は開かなくなる。だから直すことより、壊れた時に何が起きたか3分で分かる状態を作る方が大事になる。",
            "この章は機能を作らない。壊れる場所と、壊れた時に見る順番を決める。",
        ],
        steps: [
            {
                heading: "見る順番を決めておく",
                body: [
                    "画面が動かない時、闇雲に触ると悪化する。順番を固定する。",
                    "まずブラウザの Network で API のステータスコードを見る。500 なら中、404 ならファイルの置き場所、200 なのに出ないなら画面側。この3分岐で原因の9割は決まる。",
                ],
                code: [
                { file: "壊れた時の手順", lang: "text", code: `1. ブラウザの開発者ツール > Network で /api/... のステータスを見る

   500  -> サーバー側。ターミナルのログにスタックトレースが出ている
   404  -> route.ts の場所が違う。フォルダ名が URL になる
   200  -> データは来ている。画面側の問題。返ってきた JSON を console.log で見る

2. 500 だった場合、ターミナルの一番上の行だけ読む
   だいたい「XXX is not set」か「no such table」か「no such column」`, note: "下まで全部読まない。一番上の1行に原因が書いてある。" },
                ],
            },
            {
                heading: "よく壊れる4か所",
                body: [
                    "1年やって、壊れる場所はほぼ決まっていることが分かった。新しい壊れ方はめったに来ない。",
                    "環境変数、キャッシュ、日付、そして同じロジックの二重管理。この4つで体感9割だ。",
                ],
                code: [
                { file: "常連4種", lang: "text", code: `環境変数     本番に入れ忘れ / 追加後に再起動していない
             -> ローカルOK・本番だけ500 なら真っ先にここ

キャッシュ   書き換えたのに古い値が返る
             -> fetch に cache: 'no-store' が付いているか

日付         夜に入れた分が前日になる / 月末に消える
             -> toISOString() を使っていないか。UTC は日本より9時間前

二重管理     画面ごとに数字が違う
             -> 同じ計算式が2か所にある。1か所に集めて import する`, note: "4つ全部、機能を足した日ではなく直した日に出る。" },
                ],
            },
            {
                heading: "データだけは守る",
                body: [
                    "コードは何度捨ててもいい。GitHub にあるし、最悪もう一度書けばいい。取り返しがつかないのはデータの方だけだ。",
                    "D1 にはエクスポートがある。月に1回、手で落として置いておく。これだけでいい。自動化しようとして結局やらないより、月1回手で落とす方が確実に残る。",
                ],
                code: [
                { file: "ターミナル", lang: "bash", code: `npx wrangler d1 export <データベース名> --remote --output=backup-2026-09.sql`, note: "落としたファイルは Google Drive でも Dropbox でもいい。パソコンの中だけに置かない。" },
                ],
            },
            {
                heading: "足す時のルールを1つだけ持つ",
                body: [
                    "毎日直していると、必ず作り直したくなる日が来る。全部消して綺麗に建て直したくなる。ここで建て直すと、たいてい戻ってこない。",
                    "だからルールを1つ持つ。既にあるものは壊さない。改善は必ず足す側でやる。気に入らない画面も、消さずに新しい画面を隣に作って、良かった方を残す。",
                    "このルールがあると、失敗しても昨日の状態がそのまま残る。残っていれば明日も開ける。開いていれば、いつか良くなる。",
                ],
            },
        ],
        traps: [
            { symptom: "ローカルでは動くのに本番だけ 500", cause: "環境変数が本番に無い", fix: "Vercel の Environment Variables を見る。入れた後は Redeploy が要る" },
            { symptom: "Cannot find module './102.js' のような、書いた覚えのないファイルが無いと言われる", cause: "npm run dev を動かしたまま npm run build を走らせた。両方が .next という同じフォルダに書くので、本番ビルドが開発中のファイルを上書きする", fix: "開発サーバーを止めて .next を丸ごと消し、npm run dev をやり直す。コードは1行も悪くない。ビルドの確認は開発サーバーを止めてからやる" },
            { symptom: "3日空けたら開かなくなった", cause: "壊れていることより、開く理由が無くなっている", fix: "開いた瞬間にやることが1つだけ出る状態に戻す。機能を減らす方向で直す" },
            { symptom: "作り直したくなった", cause: "設計が気に入らない。よくある", fix: "消さずに隣に作る。データの表はそのまま使い回せる。画面だけ新しくする" },
        ],
        done: [
            "壊れた時に見る順番が決まっている",
            "データベースのバックアップを1回落とした",
            "今日も開いた",
        ],
    },
];

export function getChapter(slug: string): Chapter | undefined {
    return CHAPTERS.find(c => c.slug === slug);
}

export const FREE_CHAPTERS = CHAPTERS.filter(c => c.free);
export const PAID_CHAPTERS = CHAPTERS.filter(c => !c.free);
