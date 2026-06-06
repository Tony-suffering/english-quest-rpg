// 修羅場英会話 — Survival Conversation Simulator (v3)
// 実戦の高圧状況で「崩れた英語のまま生き残る」分岐型会話。
// 思想: 完璧な英語じゃなく、恥をかいても通じればいい。話すより、その場を切り抜ける。
//
// データはワークフロー(survival-english-v3)が生成。下記2本は手書きの見本兼フォールバック。

export type OptionTag = 'good' | 'awkward' | 'bad';
export type Outcome = 'survived' | 'awkward' | 'failed';

export interface SurvivalOption {
    text_en: string;   // プレイヤーの選択肢(英語)
    tag: OptionTag;    // good=自然に切り抜ける / awkward=変だが通じる / bad=事故る
    reply_ja: string;  // この選択のニュアンス・何が起きるか
    next: string;      // 次ノードid
}

export interface SurvivalNode {
    id: string;
    speaker: string;     // 相手 (例: 係員 / 医師 / 隣人)
    line_en: string;     // 相手のセリフ(リアルな口語・崩れ込み)
    line_ja: string;     // 和訳
    tonio?: string;      // とにおの一言コーチング
    options?: SurvivalOption[]; // 無ければ終端
    outcome?: Outcome;          // 終端ノードの結果
}

export interface SurvivalScenario {
    id: string;
    domain: string;      // 空港 / 病院 / レストラン / 職場 / ご近所 / 緊急 など
    title: string;       // 日本語タイトル
    premise: string;     // 状況設定(日本語)
    difficulty: number;  // 1-3
    start: string;       // 開始ノードid
    nodes: SurvivalNode[];
    keyExpressions: { en: string; ja: string; note: string }[];
}

export const SURVIVAL_SCENARIOS: SurvivalScenario[] = [
    {
        id: 'airport-rebook',
        domain: '空港',
        title: '乗り継ぎ便が欠航、カウンターで再予約',
        premise: '海外の空港。乗り継ぎ便がいきなり欠航。カウンターには長蛇の列。あなたの番が来た。英語で再予約を勝ち取れ。',
        difficulty: 2,
        start: 'n1',
        nodes: [
            {
                id: 'n1', speaker: '係員',
                line_en: "Next! Okay, what can I do for you?",
                line_ja: "次の方！はい、どうされました？",
                tonio: "焦って完璧な文を作ろうとするな。まず状況を一発で渡す。",
                options: [
                    { text_en: "My connecting flight got canceled. I need to get rebooked.", tag: 'good', reply_ja: "状況+要求を一文で。これが一番強い。", next: 'n2' },
                    { text_en: "Um... flight... no fly... problem...", tag: 'awkward', reply_ja: "単語の羅列。通じるが相手が探りに来る。それでもいい。", next: 'n2b' },
                    { text_en: "Sorry to bother you, I was wondering if it might be possible to perhaps...", tag: 'bad', reply_ja: "丁寧すぎて長い。列が詰まってる時は逆効果。要点を先に。", next: 'n2c' },
                ],
            },
            {
                id: 'n2', speaker: '係員',
                line_en: "Got it. Let me see... the next available is at 9 PM. Does that work?",
                line_ja: "了解。ええと…次に空いてるのは午後9時。それで大丈夫？",
                tonio: "ここで黙ると押し切られる。希望があるなら言え。",
                options: [
                    { text_en: "Is there anything earlier? I have a meeting I can't miss.", tag: 'good', reply_ja: "理由を添えて交渉。理由があると人は動く。", next: 'n3' },
                    { text_en: "Yeah, that works. Thank you.", tag: 'awkward', reply_ja: "受け入れる。楽だが妥協。生存はする。", next: 'win' },
                ],
            },
            {
                id: 'n2b', speaker: '係員',
                line_en: "Your flight was canceled? Let me check your booking. Passport, please.",
                line_ja: "便が欠航？予約確認するね。パスポート出して。",
                tonio: "単語だけでも相手はプロ、汲んでくれる。恥じる必要ゼロ。",
                options: [
                    { text_en: "Here. I need new flight, today.", tag: 'good', reply_ja: "崩れてても要求が明確なら勝ち。todayが効く。", next: 'n3' },
                ],
            },
            {
                id: 'n2c', speaker: '係員',
                line_en: "...Sir, there's a line. What do you need?",
                line_ja: "…お客様、列が。要件は何ですか？",
                tonio: "ほら急かされた。次は結論から。",
                options: [
                    { text_en: "Right, sorry. My flight's canceled, I need a rebooking.", tag: 'good', reply_ja: "立て直し成功。結論先出し。", next: 'n2' },
                ],
            },
            {
                id: 'n3', speaker: '係員',
                line_en: "Hmm, there's a 5 PM but it's a different airline. I can try to put you on standby. Want me to?",
                line_ja: "5時のがあるけど別の航空会社。スタンバイで入れてみようか？",
                options: [
                    { text_en: "Yes please, that'd be a huge help.", tag: 'good', reply_ja: "感謝で締めると相手が頑張ってくれる。", next: 'win' },
                    { text_en: "Standby? No, I want a confirmed seat.", tag: 'awkward', reply_ja: "強気。通ることもあるが、無い袖は振れない。9時に戻されがち。", next: 'win2' },
                ],
            },
            { id: 'win', speaker: '係員', line_en: "Done. You're confirmed. Gate 22. Have a good one!", line_ja: "完了。確定したよ。22番ゲート。良い旅を！", outcome: 'survived', tonio: "切り抜けた。完璧じゃない英語で、ちゃんと結果を取った。これが本番。" },
            { id: 'win2', speaker: '係員', line_en: "...Okay, the 9 PM it is then. Here's your new boarding pass.", line_ja: "…じゃあ9時で。新しい搭乗券どうぞ。", outcome: 'awkward', tonio: "生き残りはした。ただ強気が裏目。理由を添えて頼む方が得することも多い。" },
        ],
        keyExpressions: [
            { en: "I need to get rebooked.", ja: "予約を取り直したい", note: "rebook=予約し直す。get rebooked で『取り直してもらう』。空港の魔法の一言。" },
            { en: "Is there anything earlier?", ja: "もっと早いのある？", note: "交渉の基本。anything earlier/cheaper/closer で応用無限。" },
            { en: "That'd be a huge help.", ja: "すごく助かる", note: "頼んだ後に添えると相手の本気度が上がる。thank you より人間味。" },
        ],
    },
    {
        id: 'er-checkin',
        domain: '病院',
        title: '救急外来、症状を伝える',
        premise: '旅行中に腹痛が悪化。救急外来(ER)の受付。痛みで頭が回らない。それでも症状を伝えて診てもらえ。',
        difficulty: 3,
        start: 'e1',
        nodes: [
            {
                id: 'e1', speaker: '受付',
                line_en: "Hi, what brings you in today?",
                line_ja: "こんにちは、今日はどうされました？",
                tonio: "『何が原因で来たか』を聞かれてる。痛い場所と『いつから』を渡せ。",
                options: [
                    { text_en: "I have really bad stomach pain. It started this morning.", tag: 'good', reply_ja: "場所+程度+いつから。医療の鉄板テンプレ。", next: 'e2' },
                    { text_en: "Pain. Here. Stomach. Very bad.", tag: 'awkward', reply_ja: "単語+指差し。緊急時はこれで十分。恥より生存。", next: 'e2' },
                ],
            },
            {
                id: 'e2', speaker: '看護師',
                line_en: "Okay. On a scale of one to ten, how bad is the pain?",
                line_ja: "わかりました。1から10で、痛みはどのくらい？",
                tonio: "ERの定番質問。数字で返すだけでいい。これは絶対覚えとけ。",
                options: [
                    { text_en: "Like an eight. It's sharp, and it's getting worse.", tag: 'good', reply_ja: "数字+痛みの質(sharp)+悪化中。完璧。", next: 'e3' },
                    { text_en: "Very very pain. Ten. Ten!", tag: 'awkward', reply_ja: "伝わる。トリアージは上がる。文法は二の次。", next: 'e3' },
                ],
            },
            {
                id: 'e3', speaker: '看護師',
                line_en: "Any allergies? Are you on any medication?",
                line_ja: "アレルギーは？何か薬は飲んでる？",
                tonio: "命に関わる質問。分からなければ『ない』か『分からない』を即答。黙るのが一番危険。",
                options: [
                    { text_en: "No allergies. I'm not taking anything.", tag: 'good', reply_ja: "簡潔に否定。これで通る。", next: 'ewin' },
                    { text_en: "I don't know... I don't have my papers.", tag: 'awkward', reply_ja: "正直でOK。分からないと言える方が安全。", next: 'ewin' },
                ],
            },
            { id: 'ewin', speaker: '看護師', line_en: "Alright, take a seat. A doctor will see you shortly. You did good.", line_ja: "では座って待ってて。すぐ先生が診ます。よく伝えられたよ。", outcome: 'survived', tonio: "痛みの中で、要点だけ渡して診察にこぎつけた。崩れてても、生き残れば勝ち。" },
        ],
        keyExpressions: [
            { en: "It started this morning.", ja: "今朝から始まった", note: "症状を伝える起点。started + 時 で『いつから』。医者が必ず欲しがる情報。" },
            { en: "On a scale of one to ten...", ja: "1から10で言うと", note: "ERで100%聞かれる。聞き取れれば数字を返すだけ。最重要リスニング。" },
            { en: "It's getting worse.", ja: "悪化してる", note: "get worse=悪くなる。getting worse で進行中。逆は getting better。" },
        ],
    },
];
