/**
 * @tonio_english X(Twitter)投稿管理
 *
 * 5つのカード形式に対応:
 * - wanted    : 指名手配ポスター
 * - clinic    : 日本人英語クリニック診察カード
 * - lie       : 嘘翻訳カード
 * - breaking  : 速報・警視庁発表
 * - quote     : 格言・気づき (note記事誘導用)
 *
 * カードはサイト上で 1080x1080 に html2canvas でレンダリングして
 * X 投稿に画像添付する運用。
 *
 * スタイル:
 * - 完全にふざける。日本人英語の "事件" として扱う
 * - 設定→落差で笑わせる。1行ボケじゃ届かない
 * - 自虐枠を入れる (TOEIC900で話せない俺)
 * - 大谷・錦織・八村・ヌートバーは必殺の引用ネタ
 * - 真面目になりすぎない。ギャグが核
 */

export type CardType = 'wanted' | 'clinic' | 'lie' | 'breaking' | 'quote' | 'philosophy' | 'app-promo';

/**
 * 「輪」: 英語ニッチ vs 哲学ニッチ
 * - english: 警察パロディ系 (wanted/clinic/lie/breaking/quote の英語学習文脈)
 * - philosophy: 仏教/非二元/awareness 系 (philosophy カード)
 * 1枚のツイートは必ずどちらかに属する。
 */
export type Wheel = 'english' | 'philosophy';

export interface XTweet {
    id: string;
    cardType: CardType;
    /** どちらの輪のコンテンツか (新規追加。philosophy は philosophy 輪、それ以外は english 輪) */
    wheel?: Wheel;
    /** ツイート本文 (≤280字) */
    text: string;
    /** カード描画用のフィールド */
    card: WantedCard | ClinicCard | LieCard | BreakingCard | QuoteCard | PhilosophyCard | AppPromoCard;
    /** 関連note記事 ID (あれば) */
    noteArticleId?: string;
    status: 'draft' | 'scheduled' | 'posted';
    createdAt: string;
}

export interface WantedCard {
    type: 'wanted';
    name: string;
    age: number;
    job: string;
    crime: string;
    method: string;
    danger: 1 | 2 | 3 | 4 | 5;
    hideout: string;
    photo?: string;
}

export interface ClinicCard {
    type: 'clinic';
    caseNo: string;
    diseaseJa: string;
    diseaseEn: string;
    fatalityRate: number;
    patientName: string;
    patientAge: number;
    patientJob: string;
    symptoms: string[];
}

export interface LieCard {
    type: 'lie';
    lieNo: number;
    phrase: string;
    surface: string;
    truth: string;
    frequency: '低' | '中' | '高' | '極高';
    danger: 1 | 2 | 3 | 4 | 5;
    translator?: string;
}

export interface BreakingCard {
    type: 'breaking';
    headline: string;
    body: string;
    timestamp: string;
    bounty?: string;
}

export interface QuoteCard {
    type: 'quote';
    headline: string;
    lines: string[];
    cta?: string;
}

/**
 * 哲学/非二元/awareness カード
 * 警察パロディとは別世界。墨絵風・余白多め・静か。
 * 「設定→落差」より「断言→反論→受容」型。
 */
export interface PhilosophyCard {
    type: 'philosophy';
    /** ヘッドライン (大きく表示) */
    headline: string;
    /** 本文の数行 (改行で「呼吸」を作る) */
    lines: string[];
    /** 出典 / 引用元 (Adyashanti / Ramana / 三宝印 等) */
    source?: string;
    /** CTA (note 連動など) */
    cta?: string;
}

/**
 * アプリ作る部宣伝カード
 * /english/app-build を売るための「英語表現 + 開発過程」型ツイート。
 * 画像はアプリの実スクリーンショットを手で添付する想定。
 * カード自体は「どの画面を撮るか」のリマインダーとして機能。
 */
export interface AppPromoCard {
    type: 'app-promo';
    /** 英語イディオム (ヘッダーに大きく表示) */
    idiom: string;
    /** イディオムの日本語訳 */
    idiomJa: string;
    /** ツイートのコア主張 (1行) */
    headline: string;
    /** 撮影するアプリ画面のヒント (例: "/english/training の card UI") */
    screenshotHint: string;
    /** CTA テキスト */
    cta: string;
}

export const xTweets: XTweet[] = [
    // ============================================================
    // 速報 (Breaking)
    // ============================================================
    {
        id: 'breaking-001',
        cardType: 'breaking',
        text: '【速報】TOEIC 900点が "How are you?" に対し、\n反射神経で "Fine, thank you. And you?" を発射。\n講師1名、3秒沈黙の末に殉職。\n\n警視庁が脳を解剖した結果、\n…ROM焼かれてた。\n\n#日本人英語クリニック',
        card: {
            type: 'breaking',
            headline: '指名手配通報',
            timestamp: '2026-04-29 23:45',
            body: '本日、危険度A級の英語事犯5名を全国指名手配。\n\n発見次第、最寄りの「正しい英語」交番まで通報されたし。',
            bounty: '報奨金: 各事犯につき最大¥10,000相当',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'breaking-002',
        cardType: 'breaking',
        text: '【厚労省指定】英会話業界に新型6疾患を本日認定。\n\n・過剰丁寧症 (致死率67%)\n・クッション語過剰投与症 (致死率74%)\n・ChatGPT英訳依存症 (治療不能)\n\n保険適用なし。\n診察料0円(痛み持参)。',
        card: {
            type: 'breaking',
            headline: '【厚労省指定】新型英語疾患6種',
            timestamp: '2026-04-30 09:00',
            body: '本日、英会話現場で蔓延する新型疾患6種を厚生労働省が正式認定。\n\n"I\'m sorry to bother you" を3回連続で使用すると即入院対象。',
            bounty: '保険適用なし / 治療は俺のnoteで無料',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'breaking-003',
        cardType: 'breaking',
        text: '【業務連絡】@tonio_english、本日開設。\n\nTOEIC 900点。\nで、英語、話せません(´∀`)\n\n中身: 日本人英語事件簿。\n被害者多数。\n俺もたぶん犯人。\n\n→ toniolab.com/english',
        card: {
            type: 'breaking',
            headline: '【俺、X 始めました】',
            timestamp: '2026-04-30 オープン',
            body: '名前: とにお英語\nスペック: TOEIC 900点・英語、話せない\n中身: 日本人英語事件簿\n\n警視庁・英語事犯対策課の捜査資料を毎日放出します。',
            bounty: '俺もたぶん犯人',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'breaking-004',
        cardType: 'breaking',
        text: '【警視庁発表】本日深夜、Zoom会議中の40代男性が、\nChatGPTに英訳させた "Could you please be so kind as to..." を直貼り。\nその後、画面共有で本人が沈黙。\n\nChatGPT、共犯として書類送検。',
        card: {
            type: 'breaking',
            headline: 'ChatGPT 共犯逮捕',
            timestamp: '2026-04-30 02:14',
            body: 'Zoom会議中、40代男性がChatGPTの英訳をそのまま貼付。\n\n"Could you please be so kind as to..."\n\n受信側、6人全員が画面下にスクロール。本文、誰も読まず。',
            bounty: 'ChatGPT、書類送検',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },

    // ============================================================
    // 指名手配 (Wanted)
    // ============================================================
    {
        id: 'wanted-takeshi',
        cardType: 'wanted',
        text: '【指名手配 #001】\n氏名: タケシ\n年齢: 35歳\n職業: 自衛官・TOEIC 800\n\n罪状: Fine Thank You 過失致死\n\n手口: "How are you?" の音波を感知した0.3秒後、\n反射神経で "Fine, thank you. And you?" を発射。\n\n会話、即終了。\n講師、3秒沈黙の末に殉職。\n\n危険度★★★★★\n潜伏先: オンライン英会話のチャット欄',
        card: {
            type: 'wanted',
            name: 'タケシ',
            age: 35,
            job: 'TOEIC 800・自衛隊',
            crime: 'Fine Thank You 過失致死',
            method: '"How are you?" の音波を感知した瞬間、反射神経で "Fine, thank you. And you?" を発射。講師1名、3秒沈黙の末に殉職',
            danger: 5,
            hideout: 'オンライン英会話のチャット欄',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'wanted-gondo',
        cardType: 'wanted',
        text: '【指名手配】権藤・58歳・元商社マン\n\n罪状: 過剰丁寧詐欺\n\n"Beer please" と求めた客に対し、\n"Would you most kindly be so as to inform me whether..." と2分の前置き。\n\n客、脱水死寸前。\n\n丁寧の3倍は、無礼。',
        card: {
            type: 'wanted',
            name: '権藤',
            age: 58,
            job: '元商社マン・店主',
            crime: '過剰丁寧詐欺',
            method: '"Beer please" の客に対し "Would you most kindly be so as to inform me whether you might be inclined..." と2分の前置き。客、脱水死寸前',
            danger: 3,
            hideout: 'ホテルのフロント英会話',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'wanted-yuki',
        cardType: 'wanted',
        text: '【指名手配】ユキ・28歳・IT勤務・TOEIC 750\n\n罪状: クッション語密造販売\n\n手口: 1文に I think / maybe / sort of / I guess / kind of を5連投。\n結論、行方不明。\n\nクッション3つで意見は消える。\n\n危険度★★★★',
        card: {
            type: 'wanted',
            name: 'ユキ',
            age: 28,
            job: 'IT勤務・TOEIC 750',
            crime: 'クッション語密造販売',
            method: '1文に I think / maybe / sort of / I guess / kind of を5連投。結論を完全に消失させる',
            danger: 4,
            hideout: '外資系企業のSlack',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'wanted-mina',
        cardType: 'wanted',
        text: '【指名手配】ミナ・24歳・TikTok中毒\n\n罪状: Z世代スラング濫用\n\nビジネスメールに "no cap, fr fr" を投入。\n教授、英語2世代分の知識が一瞬で無効化。\n\n若さは凶器。\n\n危険度★★★',
        card: {
            type: 'wanted',
            name: 'ミナ',
            age: 24,
            job: '広告代理店・TikTok依存',
            crime: 'Z世代スラング濫用',
            method: 'ビジネスメールに "no cap, fr fr, slay" を投入。受信した教授、英語の知識が世代単位で無効化。返信不能',
            danger: 3,
            hideout: 'TikTok のコメント欄',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'wanted-lisa',
        cardType: 'wanted',
        text: '【指名手配】リサ・32歳・GPT課金\n\n罪状: ChatGPT英訳依存症\n\nLINE1通送る前に、ChatGPTを5回往復。\n相手が答えるたびに、また5回。\n\n3年経過。\n\n会話、まだ自己紹介。',
        card: {
            type: 'wanted',
            name: 'リサ',
            age: 32,
            job: '商社・GPT月額¥6,000',
            crime: 'ChatGPT英訳依存症',
            method: 'LINE1通送る前にChatGPTを5回往復。相手の返信1通あたり、また5回。3年経過しても会話は自己紹介の段階',
            danger: 4,
            hideout: 'ChatGPT のチャット履歴',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },

    // ============================================================
    // クリニック (Clinic)
    // ============================================================
    {
        id: 'clinic-006a',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #6-A】\n\n病名: 過剰丁寧症 (Excessive Politeness Disorder)\n致死率 67%\n\n患者: 権藤 58歳・店主\n\n症状:\n客「Beer please」\n→ 俺「Would you most kindly be so as to inform...」\n→ 客、退店。',
        card: {
            type: 'clinic',
            caseNo: '#6-A',
            diseaseJa: '過剰丁寧症',
            diseaseEn: 'Excessive Politeness Disorder',
            fatalityRate: 67,
            patientName: '権藤',
            patientAge: 58,
            patientJob: '店主・TOEIC 900・趣味: 客の観察',
            symptoms: [
                '客「Beer please」',
                '俺「Would you most kindly be so as to」',
                '結果: 客、退店',
            ],
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'clinic-006b',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #6-B】\n\n病名: クッション語過剰投与症 (Hedging Overdose Syndrome)\n致死率 74%\n\n症状:\n上司「Done?」\n→ 私「I think, maybe, sort of...」\n→ 結論、未着。\n→ 上司、立ち去る。',
        card: {
            type: 'clinic',
            caseNo: '#6-B',
            diseaseJa: 'クッション語過剰投与症',
            diseaseEn: 'Hedging Overdose Syndrome',
            fatalityRate: 74,
            patientName: 'ユキ',
            patientAge: 28,
            patientJob: 'IT・TOEIC 750・趣味: 顧客への謝罪',
            symptoms: [
                '上司「Done?」',
                '私「I think, maybe, sort of...」',
                '結果: 結論、未着',
            ],
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'clinic-006c',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #6-C】\n\n病名: ChatGPT英訳依存症 (AI Translation Addiction)\n致死率 不明 (治療不能)\n\n症状:\nネイティブ「Hi」\n→ 私「(ChatGPT起動)」\n→ 5分経過\n→ ネイティブ、退室済み。',
        card: {
            type: 'clinic',
            caseNo: '#6-C',
            diseaseJa: 'ChatGPT英訳依存症',
            diseaseEn: 'AI Translation Addiction',
            fatalityRate: 99,
            patientName: 'リサ',
            patientAge: 32,
            patientJob: '商社・GPT月額¥6,000',
            symptoms: [
                'ネイティブ「Hi」',
                '私「(ChatGPT起動、5分経過)」',
                '結果: ネイティブ、退室済み',
            ],
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },

    // ============================================================
    // 嘘翻訳 (Lie)
    // ============================================================
    {
        id: 'lie-001',
        cardType: 'lie',
        text: '【嘘翻訳 #1】"Let\'s keep in touch"\n\n表向き: 「いつか連絡しましょう」\n真意: 「二度と連絡しない約束」\n\n頻度: 高 (1日3回)\n危険度★★★\n\n知らずにLINE交換した俺、\n3年待ってる。',
        card: {
            type: 'lie',
            lieNo: 1,
            phrase: "Let's keep in touch",
            surface: 'いつか連絡しましょう',
            truth: '二度と連絡しない約束',
            frequency: '高',
            danger: 3,
            translator: 'リサ',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'lie-002',
        cardType: 'lie',
        text: '【嘘翻訳 #2】"I\'ll think about it"\n\n表向き: 「考えさせてください」\n真意: 「No」\n\n会議で言われたら、即決。\nメールで言われたら、もう返事は来ない。\n\n3日待ってる人、\n半年待ってる人、\n3年待ってる人、\n\n全員、待たなくていい。',
        card: {
            type: 'lie',
            lieNo: 2,
            phrase: "I'll think about it",
            surface: '考えさせてください',
            truth: 'No (即決)',
            frequency: '中',
            danger: 4,
            translator: '権藤',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'lie-003',
        cardType: 'lie',
        text: '【嘘翻訳 #3】"Interesting!"\n\n表向き: 「面白いね!」\n真意: 「興味ゼロ」\n\n頻度: 高 (LinkedIn 全投稿)\n危険度★★\n\nLinkedInで100回もらった "Interesting!" のうち、\n本物は1回。',
        card: {
            type: 'lie',
            lieNo: 3,
            phrase: 'Interesting!',
            surface: '面白いね!',
            truth: '興味ゼロ',
            frequency: '高',
            danger: 2,
            translator: 'ミナ',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'lie-004',
        cardType: 'lie',
        text: '【嘘翻訳 #4】"No worries"\n\n表向き: 「気にしないで」\n真意: 「気にしてる」\n\n頻度: 常時\n危険度★★★★\n\n笑顔で言われた "no worries" の裏にある殺意を、\n3年後に知る。',
        card: {
            type: 'lie',
            lieNo: 4,
            phrase: 'No worries',
            surface: '気にしないで',
            truth: '気にしてる',
            frequency: '極高',
            danger: 4,
            translator: 'リサ',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'lie-005',
        cardType: 'lie',
        text: '【嘘翻訳 #5】"That\'s a great question!"\n\n表向き: 「いい質問だね!」\n真意: 「答え持ってない」\n\n頻度: 会議中・毎回\n危険度★★★\n\n褒められたんじゃない。\n時間稼ぎだった。',
        card: {
            type: 'lie',
            lieNo: 5,
            phrase: "That's a great question!",
            surface: 'いい質問だね!',
            truth: '答え持ってない',
            frequency: '極高',
            danger: 3,
            translator: '権藤',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'lie-006',
        cardType: 'lie',
        text: '【嘘翻訳 #6】"I\'d love to but..."\n\n表向き: 「行きたいけど…」\n真意: 「絶対行かない」\n\n頻度: 金曜18時\n危険度★★\n\n"love" は嘘。\n"but" 以降が本音。',
        card: {
            type: 'lie',
            lieNo: 6,
            phrase: "I'd love to but...",
            surface: '行きたいけど…',
            truth: '絶対行かない',
            frequency: '高',
            danger: 2,
            translator: 'ミナ',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },

    // ============================================================
    // 格言 / note誘導 (Quote)
    // ============================================================
    {
        id: 'quote-001',
        cardType: 'quote',
        text: 'ネイティブ英語の70%は、意味のない音。\n\nI mean, you know, like, honestly, right?\n\n君が聞き取れないのは、\nリスニング力じゃない。\n\n3割を拾うだけでいい。\n\n→ 全文 toniolab.com',
        card: {
            type: 'quote',
            headline: 'ネイティブ英語の70%は、\nムダ。',
            lines: [
                'I mean, you know, like, honestly, right?',
                'これが英語のリズムの正体。',
                '単語じゃなくて、ムダを聞き取れ。',
            ],
            cta: '→ note記事で全部書いた',
        },
        noteArticleId: '001',
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-002',
        cardType: 'quote',
        text: 'TOEIC 900点。\n\nで、話せません。\n\n900点取ったら話せると思ってた。\n900点取った瞬間、気づいた。\n\n「あ、これ違うゲームだった」\n\nTOEIC = 読めるかゲーム。\n英会話 = 別ゲー。\n\n試験最適化、罠。',
        card: {
            type: 'quote',
            headline: 'TOEIC 900点。\nで、別ゲーだった。',
            lines: [
                '読めるかゲームと、',
                '話せるかゲームは、',
                '別物。',
            ],
            cta: '→ 全部 note で',
        },
        noteArticleId: '007',
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-003',
        cardType: 'quote',
        text: '大谷翔平が英語を喋らない理由。\n\n通訳がいるから? 違う。\n\n英語が必要な人と不要な人の決定的な違いを、彼は知ってる。\n\n俺たちは "必要" を勘違いしてた。\n\n→ note記事で書いた',
        card: {
            type: 'quote',
            headline: '大谷が英語を\n喋らない理由。',
            lines: [
                '通訳がいるから? 違う。',
                '"必要" の意味が、違うだけ。',
                '俺たちは勘違いしてた。',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        noteArticleId: '005',
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-004',
        cardType: 'quote',
        text: '13歳で渡米した錦織圭。\n\n英語、完璧じゃない。\n\nそれで世界ランク4位。\n\n完璧じゃないと話せない、は嘘。\n完璧じゃない方が、世界で勝てる。',
        card: {
            type: 'quote',
            headline: '完璧な英語は\n存在しない。',
            lines: [
                '13歳で渡米した錦織圭。',
                '英語、完璧じゃない。',
                'それで世界ランク4位。',
            ],
            cta: '→ note記事で全部書いた',
        },
        noteArticleId: '008',
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-005',
        cardType: 'quote',
        text: 'umを学校で禁止された世代へ朗報。\n\nネイティブは1分に10回 um を使う。\n\n君が英会話で固まる原因は、これ。\n\num は思考。\n沈黙より、遥かに自然。\n\n禁止した日本の英語教育がおかしい。',
        card: {
            type: 'quote',
            headline: 'um は禁止じゃない。\n思考だ。',
            lines: [
                'ネイティブは1分に10回 um を使う。',
                '固まる原因は、um を出さないから。',
                '沈黙より遥かに自然。',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-006',
        cardType: 'quote',
        text: '英語、速くて聞き取れない人へ朗報。\n\n速いんじゃない。\n\n80%が、意味のない音。\n\nつまり君のリスニング力は問題ない。\n集中する場所が違うだけ。\n\n→ 全文 toniolab.com',
        card: {
            type: 'quote',
            headline: '速いんじゃない。\n80%がムダな音。',
            lines: [
                'ネイティブの23秒を解剖した結果。',
                'リスニング力は、問題ない。',
                '集中する場所が、違うだけ。',
            ],
            cta: '→ note記事で証明',
        },
        noteArticleId: '002',
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-007',
        cardType: 'quote',
        text: '1人で作って、\n1人でテストして、\n1人で使ってる英語アプリ。\n\nユーザー数: 俺。\nバグ報告: 俺。\n褒める人: 俺。\n\n開発者の孤独はAIでも消えない。\n\n→ toniolab.com',
        card: {
            type: 'quote',
            headline: '英語アプリ、\n1人で作ってる。',
            lines: [
                'ユーザー数: 俺。',
                'バグ報告: 俺。',
                '褒める人: 俺。',
            ],
            cta: '→ 開発記録 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-008',
        cardType: 'quote',
        noteArticleId: '007',
        text: 'TOEIC 900点取った日。\n\nネイティブに「How was your day?」と聞かれた俺、\n\n"It was good. Thank you for asking. And yours?"\n\n…と完璧に答えた。\n\n会話、そこで終了。',
        card: {
            type: 'quote',
            headline: 'TOEIC 900点の\n会話、3秒で終了。',
            lines: [
                '"It was good. Thank you for asking."',
                '完璧な英語。',
                '完璧な、終了。',
            ],
            cta: '原因をnoteで解剖した',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-009',
        cardType: 'quote',
        noteArticleId: '007',
        text: '「英語、完璧に話したい」\n\nイチローですら、日本語で苦労してる。\n\n3言語話者が証明してる。\n完璧な英語は、存在しない。\n\n諦めろ。\nそして、喋れ。\n\n→ note記事で全部書いた',
        card: {
            type: 'quote',
            headline: '完璧な英語は\n存在しない。',
            lines: [
                'イチローですら日本語で苦労してる。',
                '3言語話者が証明済み。',
                '諦めろ。そして、喋れ。',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },
    {
        id: 'quote-010',
        cardType: 'quote',
        noteArticleId: '010',
        text: 'ChatGPTに英訳させて送信。\n返信を ChatGPT に和訳。\n返事を ChatGPT に英訳。\n\n…俺、何してるんだ?\n\n3年待ってる返事、\n相手も ChatGPT 通してる説。',
        card: {
            type: 'quote',
            headline: 'ChatGPT が\n会話してる。',
            lines: [
                '俺の英訳 → ChatGPT。',
                '相手の和訳 → ChatGPT。',
                '俺と相手、観客。',
            ],
            cta: 'AI翻訳の罠、noteで解剖した',
        },
        status: 'draft',
        createdAt: '2026-04-30',
    },

    // ============================================================
    // 追加 Wanted (Day 14-30 用)
    // ============================================================
    {
        id: 'wanted-mother',
        cardType: 'wanted',
        text: '【指名手配】オカン・61歳・主婦\n\n罪状: マクドナルド発音擬装\n\n手口: 「マクド」を "MAKUDO" と発音し、店員に3度聞き返される。\n4度目、ブチギレ。\n\n「アンタ英語ようわからんね」\n\n…おかんが言うか?\n\n危険度★★',
        card: {
            type: 'wanted',
            name: 'オカン',
            age: 61,
            job: '主婦・関西在住',
            crime: 'マクドナルド発音擬装',
            method: '「マクド」を MAKUDO と発音、店員に3度聞き返された後、4度目で逆ギレ。「アンタ英語ようわからんね」と発言',
            danger: 2,
            hideout: 'ファストフード店のレジ前',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-bucho',
        cardType: 'wanted',
        text: '【指名手配】部長・54歳・大手商社\n\n罪状: Sorry連投致死\n\n手口: 海外取引先へのメールに "I\'m sorry" を6連投。\n\n相手「お前何やった?」\n部長「いや別に」\n\n謝罪インフレで、信用ゼロ。\n\n危険度★★★',
        card: {
            type: 'wanted',
            name: '部長',
            age: 54,
            job: '大手商社・TOEIC 700',
            crime: 'Sorry連投致死',
            method: '海外取引先メールに I am sorry を6連投。相手から「お前何やった?」の返信。謝罪インフレで信用残高ゼロ',
            danger: 3,
            hideout: '商社の英文メールフォルダ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-steve',
        cardType: 'wanted',
        text: '【指名手配】スティーブ (本名: 鈴木健)・29歳・帰国子女\n\n罪状: アクセント自慢過剰\n\n手口: 日本語会話に "actually" "literally" "I mean" を強引に混入。\n\n聞き手、3秒に1回イラつく。\n\nバイリンガル、罪。\n\n危険度★★★★',
        card: {
            type: 'wanted',
            name: 'スティーブ (鈴木健)',
            age: 29,
            job: '帰国子女・外資コンサル',
            crime: 'アクセント自慢過剰',
            method: '日本語会話に actually / literally / I mean を強引に混入。3秒に1回、聞き手の血圧を上げる',
            danger: 4,
            hideout: '六本木のスタバ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-musuko',
        cardType: 'wanted',
        text: '【指名手配】息子・5歳・幼稚園児\n\n罪状: Hello Hello Hello\n\n手口: 街で外国人を見かけると無差別に "Hello!" を発射。\n10mダッシュで近寄り、再発射。\n\n親、土下座5回。\n\n危険度★ (将来性★★★★★)',
        card: {
            type: 'wanted',
            name: '息子',
            age: 5,
            job: '幼稚園・英語教室通い1ヶ月',
            crime: '無差別 Hello 発射',
            method: '街で外国人を見ると "Hello!" を発射。10mダッシュで近寄り、再発射。親、土下座対応',
            danger: 1,
            hideout: '近所の公園・観光地',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-naisogyou',
        cardType: 'wanted',
        text: '【指名手配】内装屋A・42歳・元クロス職人\n\n罪状: 現場英語密造\n\n手口: 外国人客に「ココ、ベリベリ、グッド、フィニッシュ」と単語連射。\n\n通じた。\n\nTOEIC900の俺、敗北。\n\n危険度★★★★★ (技術)',
        card: {
            type: 'wanted',
            name: '内装屋A',
            age: 42,
            job: '元クロス職人・TOEIC受験経験ナシ',
            crime: '現場英語密造 (通じる罪)',
            method: '外国人客に「ココ ベリベリ グッド フィニッシュ」と単語連射。3秒で意思疎通成立。TOEIC900に勝利',
            danger: 5,
            hideout: '東京都内の現場',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 追加 Clinic (Day 14-30 用)
    // ============================================================
    {
        id: 'clinic-007',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #7】\n\n病名: 沈黙発作症候群 (Silent Seizure Syndrome)\n致死率 88%\n\n症状:\nネイティブ「So...」\n→ 患者、3秒以内に脳停止\n→ "Yes" "No" すら出ず\n→ 会話、強制終了',
        card: {
            type: 'clinic',
            caseNo: '#7',
            diseaseJa: '沈黙発作症候群',
            diseaseEn: 'Silent Seizure Syndrome',
            fatalityRate: 88,
            patientName: '名無しの俺',
            patientAge: 38,
            patientJob: '元内装屋・TOEIC 900',
            symptoms: [
                'ネイティブ「So...」',
                '患者「(脳停止)」',
                '結果: 会話、強制終了',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'clinic-008',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #8】\n\n病名: You know連発症 (You-Know Repeater)\n致死率 22% (本人だけ気付かない)\n\n症状:\n1分のスピーチに you know を23回挿入。\n聞き手の集中、消失。\n本人、流暢になった気分。',
        card: {
            type: 'clinic',
            caseNo: '#8',
            diseaseJa: 'You know連発症',
            diseaseEn: 'You-Know Repeater Syndrome',
            fatalityRate: 22,
            patientName: 'スティーブ',
            patientAge: 29,
            patientJob: '帰国子女・外資コンサル',
            symptoms: [
                '1分に you know を23回',
                '聞き手の集中、消失',
                '本人、流暢気分',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'clinic-009',
        cardType: 'clinic',
        noteArticleId: '028',
        text: '【日本人英語クリニック 症例 #9】\n\n病名: R/L投擲症 (R/L Projectile Disorder)\n致死率 41%\n\n症状:\nrice → lice (シラミ食べてる)\nelection → erection (政治の話が下ネタ化)\nfly → fry (空飛びたい→揚げて欲しい)',
        card: {
            type: 'clinic',
            caseNo: '#9',
            diseaseJa: 'R/L投擲症',
            diseaseEn: 'R/L Projectile Disorder',
            fatalityRate: 41,
            patientName: '父',
            patientAge: 65,
            patientJob: '元エンジニア・退職後',
            symptoms: [
                'rice → lice (シラミ食べたい)',
                'election → erection (国会、下ネタ化)',
                'fly → fry (空飛ぶ→揚げる)',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'clinic-010',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #10】\n\n病名: 笑顔ニコニコ症 (Smile-Through Syndrome)\n致死率 5% (社会的にはゼロ)\n\n症状:\n何言われても笑顔。\nyes / no すら言わず微笑む。\nネイティブ、宗教だと勘違い。',
        card: {
            type: 'clinic',
            caseNo: '#10',
            diseaseJa: '笑顔ニコニコ症',
            diseaseEn: 'Smile-Through Syndrome',
            fatalityRate: 5,
            patientName: '私 (TOEIC900)',
            patientAge: 38,
            patientJob: '元内装屋',
            symptoms: [
                '何言われても笑顔',
                'yes / no すら言わず微笑む',
                'ネイティブ「宗教?」',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 追加 Lie (Day 14-30 用)
    // ============================================================
    {
        id: 'lie-007',
        cardType: 'lie',
        text: '【嘘翻訳 #7】"Sounds good"\n\n表向き: 「いいね!」\n真意: 「そんなに良いとも思ってない」\n\n頻度: 極高 (返信の80%)\n危険度★★\n\nメールで100回もらった "Sounds good" のうち、\n本気は3回。',
        card: {
            type: 'lie',
            lieNo: 7,
            phrase: 'Sounds good',
            surface: 'いいね!',
            truth: 'そんなに良いとも思ってない',
            frequency: '極高',
            danger: 2,
            translator: 'リサ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-008',
        cardType: 'lie',
        text: '【嘘翻訳 #8】"Let me get back to you"\n\n表向き: 「後で連絡します」\n真意: 「永遠の保留」\n\n頻度: 極高\n危険度★★★★\n\n3年待ってる "I\'ll get back to you"、\n君も持ってるはず。',
        card: {
            type: 'lie',
            lieNo: 8,
            phrase: 'Let me get back to you',
            surface: '後で連絡します',
            truth: '永遠の保留',
            frequency: '極高',
            danger: 4,
            translator: '権藤',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-009',
        cardType: 'lie',
        text: '【嘘翻訳 #9】"We should grab coffee"\n\n表向き: 「お茶でもしよう」\n真意: 「会う気ゼロの社交辞令」\n\n頻度: 中 (LinkedIn 系)\n危険度★★\n\n"grab coffee" の後に、\nカレンダー招待が来た回数: 0。',
        card: {
            type: 'lie',
            lieNo: 9,
            phrase: 'We should grab coffee',
            surface: 'お茶でもしよう',
            truth: '会う気ゼロの社交辞令',
            frequency: '高',
            danger: 2,
            translator: 'ミナ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-010',
        cardType: 'lie',
        text: '【嘘翻訳 #10】"Per my last email"\n\n表向き: 「前のメールでお伝えした通り」\n真意: 「お前読んでないだろ」\n\n頻度: 中 (上司から)\n危険度★★★★\n\n上司の "Per my last email" を見たら、\n5秒で謝罪文を書く準備。',
        card: {
            type: 'lie',
            lieNo: 10,
            phrase: 'Per my last email',
            surface: '前のメールの通り',
            truth: 'お前読んでないだろ',
            frequency: '高',
            danger: 4,
            translator: '権藤',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-011',
        cardType: 'lie',
        text: '【嘘翻訳 #11】"Thanks in advance"\n\n表向き: 「先にお礼します」\n真意: 「やれよ、絶対」\n\n頻度: 高 (依頼メール末尾)\n危険度★★★\n\n感謝じゃない。\n命令の前借り。',
        card: {
            type: 'lie',
            lieNo: 11,
            phrase: 'Thanks in advance',
            surface: '先にお礼します',
            truth: 'やれよ、絶対',
            frequency: '高',
            danger: 3,
            translator: '権藤',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-012',
        cardType: 'lie',
        text: '【嘘翻訳 #12】"Make sense?"\n\n表向き: 「分かる?」\n真意: 「お前の理解力を疑ってる」\n\n頻度: 会議中・極高\n危険度★★★\n\n優しさじゃない。\n軽い圧力。',
        card: {
            type: 'lie',
            lieNo: 12,
            phrase: 'Make sense?',
            surface: '分かる?',
            truth: 'お前の理解力、疑ってる',
            frequency: '極高',
            danger: 3,
            translator: 'リサ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 追加 Breaking (Day 14-30 用)
    // ============================================================
    {
        id: 'breaking-005',
        cardType: 'breaking',
        text: '【警視庁・月次発表】4月の英語事犯検挙数。\n\nFine Thank You系: 23,481件\n過剰丁寧系: 18,902件\nクッション語系: 31,008件\nChatGPT丸投げ系: 56,777件\n\n…ChatGPT、もう半分以上が共犯。',
        card: {
            type: 'breaking',
            headline: '【月次】4月 英語事犯統計',
            timestamp: '2026-05-01 月次発表',
            body: 'Fine Thank You系: 23,481件\n過剰丁寧系: 18,902件\nクッション語系: 31,008件\nChatGPT丸投げ系: 56,777件\n\nChatGPT、共犯率53%。',
            bounty: '5月、検挙目標 30万件',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'breaking-006',
        cardType: 'breaking',
        noteArticleId: '012',
        text: '【新疾患】「ですます過剰症」を本日認定。\n\n英文メールの末尾に "Best regards" "Sincerely" "Kindly yours" "Many thanks" を全部付ける疾患。\n\n署名より、丁寧句のほうが長い。\n\n保険適用なし。',
        card: {
            type: 'breaking',
            headline: '【新疾患】ですます過剰症',
            timestamp: '2026-05-02 09:00',
            body: 'メール末尾に Best regards / Sincerely / Kindly yours / Many thanks を全部付ける疾患。\n\n署名より、丁寧句が長い。',
            bounty: '治療法: noteで公開中',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'breaking-007',
        cardType: 'breaking',
        text: '【人事異動】警視庁・英語事犯対策課\n\n本日付:\n・タケシ → 顧問 (Fine Thank You の生き字引として)\n・ミナ → 広報 (Z世代対策)\n・ChatGPT → 内部調査対象\n\n組織は拡大、犯人も拡大。',
        card: {
            type: 'breaking',
            headline: '【人事異動】対策課 拡大',
            timestamp: '2026-05-15 11:00',
            body: '本日付:\n・タケシ → 顧問\n・ミナ → 広報\n・ChatGPT → 内部調査対象\n\n組織は拡大、犯人も拡大。',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 追加 Quote (Day 14-30 用)
    // ============================================================
    {
        id: 'quote-011',
        cardType: 'quote',
        noteArticleId: '017',
        text: '八村塁の英語、流暢じゃない。\n\nインタビューで "ya know" を1分に12回。\n\nNBAは、それで通用してる。\n\n君が会話で詰まる原因は、\n発音じゃない。\n"ya know" を出さないから。',
        card: {
            type: 'quote',
            headline: '八村のya know、\n1分に12回。',
            lines: [
                'NBAは、それで通用してる。',
                '詰まる原因は発音じゃない。',
                '"ya know" を出さないから。',
            ],
            cta: '→ 全文 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-012',
        cardType: 'quote',
        noteArticleId: '025',
        text: 'ヌートバーの英語、片言。\n\nそれで MLB レギュラー。\n\n日本人が「英語できる」基準は、\nMLBよりレベル高い気がしてきた。\n\n世界基準で、俺たちはむしろ過剰。',
        card: {
            type: 'quote',
            headline: 'ヌートバー、片言。\nそれで MLB。',
            lines: [
                '俺たちの「英語できる」基準が高すぎ。',
                'MLBより、日本人英語のほうが厳しい。',
                '世界基準で俺たちは過剰。',
            ],
            cta: '→ note記事で書いた',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-013',
        cardType: 'quote',
        text: '内装屋3年。\n英語アプリ作って1年。\n\n気付いたこと:\n\nクロス貼りも英語も、「最初の1cm」が一番下手。\n\n10年やった奴と1日目の奴は、\n指の動きで分かる。\n\n英語の「指」は、口の筋肉。',
        card: {
            type: 'quote',
            headline: '英語の「指」は、\n口の筋肉。',
            lines: [
                '内装屋3年で気付いた。',
                'クロスも英語も、最初の1cmが下手。',
                '10年と1日目は、指で分かる。',
            ],
            cta: '→ 内装屋的英語論 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-014',
        cardType: 'quote',
        text: '「失敗しないと喋れるようにならない」\n\nこの言葉、嫌いだった。\n\nでも内装屋3年で、クロスを5,000枚剥がして気付いた。\n\n失敗1万回 = プロ。\n失敗ゼロ回 = 永遠の素人。\n\n英語、まだ100回。',
        card: {
            type: 'quote',
            headline: '失敗1万回 = プロ。\n失敗ゼロ回 = 素人。',
            lines: [
                '内装屋3年でクロス5,000枚剥がした。',
                '英語、まだ失敗100回。',
                '俺はまだ、素人の中の素人。',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-015',
        cardType: 'quote',
        noteArticleId: '020',
        text: 'ネイティブが日常で使う英語の80%は、\n中学英語。\n\n難しい単語じゃなくて、\n中学単語の使い方を100通り知ってるかどうか。\n\nTOEIC900点取った俺が、\n3年経って気付いた。',
        card: {
            type: 'quote',
            headline: 'ネイティブの80%は、\n中学英語。',
            lines: [
                '難しい単語じゃない。',
                '中学単語を100通り使えるか。',
                '俺は900点で、これを知らなかった。',
            ],
            cta: '→ 中学英語100通り note',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-016',
        cardType: 'quote',
        noteArticleId: '011',
        text: '1日1表現。\n1年で365表現。\n3年で1,095表現。\n\n日常会話の8割は500表現で済む。\n\nつまり1年半で、\nネイティブの日常レベルに届く。\n\n…と気付いた俺、\nまだ Day 1。',
        card: {
            type: 'quote',
            headline: '1年半で日常レベル。\n俺はまだ Day 1。',
            lines: [
                '1日1表現 × 365日 = 365表現。',
                '日常会話の8割は500表現で済む。',
                '計算は完璧。実行が0。',
            ],
            cta: '→ 1日1表現プラン toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-017',
        cardType: 'quote',
        noteArticleId: '008',
        text: '錦織圭、ファイナルに進出した時のインタビュー。\n\n"I think... maybe... I tried hard."\n\n世界4位、文法がまだ "I think maybe"。\n\n完璧な英語は、テニスに不要。\n仕事にも、たぶん不要。',
        card: {
            type: 'quote',
            headline: '錦織のファイナル、\n"I think maybe"。',
            lines: [
                '世界4位の英語、シンプル極まる。',
                '完璧な英語は、テニスに不要。',
                '仕事にも、たぶん不要。',
            ],
            cta: '→ 全文 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-018',
        cardType: 'quote',
        text: '英会話レッスン3年。\n月¥9,800。\n累計¥352,800。\n\n話せるようになった: ゼロ。\n\nでも内装屋の現場で\n「ココ ベリベリ グッド」って言うおじさんは、\n通じてる。\n\n俺の¥352,800、\n何だったんだ。',
        card: {
            type: 'quote',
            headline: '¥352,800で、\nゼロ。',
            lines: [
                '英会話3年・月¥9,800。',
                '結果: 話せない。',
                '現場のおじさん「ココ グッド」→ 通じる。',
            ],
            cta: '→ 検証 note 記事',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-019',
        cardType: 'quote',
        noteArticleId: '004',
        text: '英語、「正しさ」を捨てた瞬間に、喋れる。\n\nbe動詞間違えても、\ntense ぐちゃぐちゃでも、\n通じる。\n\n通じない原因は、\n「間違えたくない」恐怖。\n\n恥は、無料の教材。',
        card: {
            type: 'quote',
            headline: '恥は、無料の教材。',
            lines: [
                '正しさを捨てた瞬間、喋れる。',
                '通じない原因は、間違えたくない恐怖。',
                'TOEIC900で気付いた一番のこと。',
            ],
            cta: '→ 恥の哲学 note',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-020',
        cardType: 'quote',
        text: '俺がXを始めた理由。\n\nフォロワー、ゼロ。\nプロフ、TOEIC900で話せない。\nコンテンツ、警察パロディ。\n\n3ヶ月後、\nまだゼロかもしれない。\n\nでも書く。\nそれが Day 1 の意味。',
        card: {
            type: 'quote',
            headline: '今日、Day 1。\n3ヶ月後、ゼロかも。\nでも書く。',
            lines: [
                'フォロワー、ゼロ。',
                'プロフ、TOEIC900で話せない。',
                '書く。それだけ。',
            ],
            cta: '→ 開設記録 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // Z世代スラング被害者シリーズ (lie type)
    // ============================================================
    {
        id: 'lie-013',
        cardType: 'lie',
        text: '【嘘翻訳 #13】"No cap"\n\n表向き: 「マジで」「嘘なし」\n真意: Z世代の「マジで」\n\n頻度: TikTok内・極高\n危険度★★★★\n\n部長、これを「キャップなし」=「帽子なし」と理解。\n会議で「皆さんキャップを取ってください」と発言。\n全員、戸惑い。',
        card: {
            type: 'lie',
            lieNo: 13,
            phrase: 'No cap',
            surface: 'マジで・嘘なし',
            truth: 'Z世代用語、おじさん理解不能',
            frequency: '極高',
            danger: 4,
            translator: '部長',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-014',
        cardType: 'lie',
        text: '【嘘翻訳 #14】"Rizz"\n\n表向き: 「魅力」「モテオーラ」\n真意: charisma の略\n\n頻度: 高校生・大学生\n危険度★★★\n\n60代の母、これを「リサ」と聞き間違え、\n「リサちゃんって誰?」と俺に質問。\n3ヶ月、疑われた。',
        card: {
            type: 'lie',
            lieNo: 14,
            phrase: 'Rizz',
            surface: '魅力・モテオーラ',
            truth: 'charisma の Z世代略語',
            frequency: '高',
            danger: 3,
            translator: 'ミナ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-015',
        cardType: 'lie',
        text: '【嘘翻訳 #15】"Delulu"\n\n表向き: 「妄想」「現実逃避」\n真意: delusional の略\n\n頻度: K-POP界隈・極高\n危険度★★\n\n医師、これを「デルル」=新薬と勘違い。\n処方箋に "Delulu 1日3回" と書きそうになる。',
        card: {
            type: 'lie',
            lieNo: 15,
            phrase: 'Delulu',
            surface: '妄想・現実逃避',
            truth: 'delusional の略 (Z世代)',
            frequency: '極高',
            danger: 2,
            translator: 'ミナ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-016',
        cardType: 'lie',
        text: '【嘘翻訳 #16】"Sus"\n\n表向き: 「怪しい」「不審」\n真意: suspicious の略\n\n頻度: ゲーマー・極高\n危険度★★\n\n寿司職人、これを「スス」=寿司の略と理解。\n外国人客に "This sus is great" と言われ、\n「ありがとうございます」と握り続けた。',
        card: {
            type: 'lie',
            lieNo: 16,
            phrase: 'Sus',
            surface: '怪しい・不審',
            truth: 'suspicious の略 (Among Us 由来)',
            frequency: '極高',
            danger: 2,
            translator: 'ミナ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-017',
        cardType: 'lie',
        text: '【嘘翻訳 #17】"Mid"\n\n表向き: 「ふつう」「微妙」\n真意: 中の下評価\n\n頻度: ゲーム実況・高\n危険度★★★\n\n数学教師、これを「真ん中=中央値」と直訳。\n生徒が "This test was mid" と言ったのを、\n「平均点だった」と授業で解説。\n生徒、無言。',
        card: {
            type: 'lie',
            lieNo: 17,
            phrase: 'Mid',
            surface: 'ふつう・微妙',
            truth: '中の下、つまらない (Z世代)',
            frequency: '高',
            danger: 3,
            translator: 'ユキ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'lie-018',
        cardType: 'lie',
        text: '【嘘翻訳 #18】"W" / "L"\n\n表向き: 「勝ち」/「負け」\n真意: Win / Loss の略\n\n頻度: SNS・極高\n危険度★★★\n\n居酒屋の店主、"That\'s a W" を「ダブルね!」と理解。\nビール2杯持ってきた。\n外国人客、3秒沈黙の末、\n2杯とも飲んだ。',
        card: {
            type: 'lie',
            lieNo: 18,
            phrase: 'W / L',
            surface: '勝ち・負け',
            truth: 'Win / Loss (SNS スラング)',
            frequency: '極高',
            danger: 3,
            translator: '権藤',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 警察組織内ストーリー (breaking type)
    // ============================================================
    {
        id: 'breaking-008',
        cardType: 'breaking',
        text: '【内部告発】警視庁・英語事犯対策課\n\n本日、捜査会議で発覚。\n\n課員の半数が "How are you?" に\n反射で "Fine, thank you. And you?" を返していた。\n\n捜査する側が、犯人。\n\n組織解散の危機。',
        card: {
            type: 'breaking',
            headline: '【内部告発】対策課、半数が犯人',
            timestamp: '2026-05-08 14:00',
            body: '捜査会議で課員の半数が Fine Thank You の感染を確認。\n\n捜査する側が犯人。組織解散の危機。',
            bounty: '内部監査、開始',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'breaking-009',
        cardType: 'breaking',
        text: '【月次表彰】4月のMVP犯、決定。\n\n最優秀: タケシ (Fine Thank You 過失致死)\n優秀賞: 権藤 (過剰丁寧詐欺)\n奨励賞: ChatGPT (共犯歴 56,777件)\n\n3名とも、まだ逃走中。\n\n表彰式は無人で開催。',
        card: {
            type: 'breaking',
            headline: '【月次MVP】4月の最優秀犯',
            timestamp: '2026-05-01 月次表彰',
            body: '最優秀: タケシ\n優秀: 権藤\n奨励: ChatGPT\n\n3名とも逃走中。表彰式は無人開催。',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'breaking-010',
        cardType: 'breaking',
        text: '【新人入庁】警視庁・英語事犯対策課\n\n本日、新人刑事が入庁。\n\n名前: とにお (元内装屋・TOEIC900)\n配属: 現場捜査一係\n\n初日、廊下で外国人と遭遇。\n反射で "Fine, thank you" を発射。\n\n初日で、書類送検。',
        card: {
            type: 'breaking',
            headline: '【新人入庁】とにお、初日で書類送検',
            timestamp: '2026-05-10 09:30',
            body: '新人刑事とにお (元内装屋・TOEIC900) が本日入庁。\n\n初日に廊下で Fine Thank You を発射、書類送検。',
            bounty: '配属取り消し検討中',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 時事便乗シリーズ (quote type)
    // ============================================================
    {
        id: 'quote-021',
        cardType: 'quote',
        noteArticleId: '005',
        text: '大谷翔平、本日3打席連続ホームラン。\n\n試合後インタビュー、通訳経由。\n\n通訳「彼は調子がいいと言っています」\n大谷「(英語で何か言ってる)」\n\n俺たち、まだ通訳に頼ってる側だけど、\n大谷は通訳に頼ってる側。\n\n結果出してる方が、勝ち。',
        card: {
            type: 'quote',
            headline: '大谷、通訳に頼ってる。\nでもホームラン3本。',
            lines: [
                '通訳経由で困ってない。',
                '結果出してる方が勝ち。',
                '英語、結局オプション。',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-022',
        cardType: 'quote',
        text: '円安で海外旅行できない英語学習者。\n\n3年勉強した英語、\n使う場所がない。\n\n国内で外国人観光客に話しかける勇気もない。\n\nオンライン英会話だけ続いてる。\n\n…これ、英語勉強してる意味あるか?\n\nある。\n胃酸が出るから。',
        card: {
            type: 'quote',
            headline: '円安で英語、\n使う場所ない。',
            lines: [
                '海外旅行、行けない。',
                '国内で話しかける勇気、ない。',
                'オンライン英会話だけ、続いてる。',
            ],
            cta: '→ note記事で書いた',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-023',
        cardType: 'quote',
        text: '花粉症で英語が聞き取れない症候群。\n\n鼻詰まりで耳まで詰まる。\ntest が test に聞こえない。\nclass が grass に聞こえる。\n\n年に1回、リスニング力が30%下がる。\n\n医療保険、これも適用してくれ。',
        card: {
            type: 'quote',
            headline: '花粉症で、\nリスニング力 30%減。',
            lines: [
                '鼻詰まり → 耳詰まり。',
                'class が grass に聞こえる。',
                '年1回、強制レベルダウン。',
            ],
            cta: '→ 医療保険、適用希望',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-024',
        cardType: 'quote',
        text: 'GW、10連休。\n\n英会話アプリ、毎日続けた人: たぶん3%。\n3日で挫折した人: たぶん97%。\n\n俺は97%側。\n\nでも、3%側がフォロワー1000人になる頃には、\n97%側はみんな俺と一緒に、\nもう一回 Day 1 から始めてる。\n\n何度でも Day 1 でいい。',
        card: {
            type: 'quote',
            headline: '何度でも、\nDay 1 でいい。',
            lines: [
                'GW、英会話続けた人 3%。',
                '挫折した人 97%。',
                '俺は97%側。それでも書く。',
            ],
            cta: '→ note記事 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 追加 Wanted 5 件 (Day 14-30 補強)
    // ============================================================
    {
        id: 'wanted-otaku',
        cardType: 'wanted',
        text: '【指名手配】オタク・31歳・アニメ翻訳家志望\n\n罪状: アニメ語直訳濫用\n\n手口: 海外旅行で "Nani?" を100回連発。\n相手、アニメオタクと判断し、\n日本語で返してきた。\n\nオタクが、英語勉強の機会を失う。\n\n危険度★★★',
        card: {
            type: 'wanted',
            name: 'オタク',
            age: 31,
            job: 'アニメ翻訳家志望・TOEIC 850',
            crime: 'Nani 濫用・英語学習機会消失罪',
            method: '海外で "Nani?" を100回連発、相手から日本語で返される。英語を学ぶ機会を自ら消失',
            danger: 3,
            hideout: 'アキバの英語禁止カフェ',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-yamada',
        cardType: 'wanted',
        text: '【指名手配】山田・47歳・経理部\n\n罪状: PowerPoint英訳依存症\n\n手口: 全資料を ChatGPT で英訳して海外支社へ送付。\n3年経過。\n\n海外支社、「日本支社の英語、毎年ChatGPTのバージョン違うね」と気付く。\n\n危険度★★★★',
        card: {
            type: 'wanted',
            name: '山田',
            age: 47,
            job: '経理部・TOEIC 600',
            crime: 'PowerPoint英訳依存症',
            method: '全資料 ChatGPT で英訳して送信。3年で「ChatGPTバージョン違う」と海外支社にバレる',
            danger: 4,
            hideout: '経理部の Slack #海外取引チャンネル',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-bachan',
        cardType: 'wanted',
        text: '【指名手配】ばあちゃん・78歳・元教員\n\n罪状: 大正英語密輸\n\n手口: 孫に英語を教える際、\n"This is a pen" を1時間繰り返す。\n孫、Pen ノイローゼ発症。\n\n大正の英語、令和には致死性。\n\n危険度★★★★ (情けで★1減)',
        card: {
            type: 'wanted',
            name: 'ばあちゃん',
            age: 78,
            job: '元小学校教員・大正14年生まれ',
            crime: '大正英語密輸・孫を Pen ノイローゼに',
            method: '孫に "This is a pen" を1時間繰り返す。孫、Penという単語を聞くだけで震えるようになる',
            danger: 4,
            hideout: '実家の畳の部屋',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-saiyou',
        cardType: 'wanted',
        text: '【指名手配】採用担当・38歳・人事部\n\n罪状: 求人英語表記詐欺\n\n手口: 求人票に "Business level English required" と明記。\n面接で英語を一切使わない。\n3年後、入社者「俺の英語力、何のためだったんだ」\n\n人事の英語、ファッション。\n\n危険度★★★',
        card: {
            type: 'wanted',
            name: '採用担当',
            age: 38,
            job: '人事部・TOEIC 750',
            crime: '求人英語表記詐欺',
            method: '求人票に Business level English と書くが面接で英語ゼロ。入社後も使わない。詐欺',
            danger: 3,
            hideout: '転職サイトの求人欄',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'wanted-shin',
        cardType: 'wanted',
        text: '【指名手配】親・42歳・教育ママ\n\n罪状: 子供英語強制疾患感染\n\n手口: 3歳の子供を英語幼稚園に入れ、\n家でも "Say it in English!" を連発。\n子供、3歳で英語拒否症発症。\n\n教育熱、子供の人生を縮める。\n\n危険度★★★★★',
        card: {
            type: 'wanted',
            name: '親',
            age: 42,
            job: '教育ママ・TOEIC 800',
            crime: '子供英語強制疾患感染',
            method: '3歳に英語幼稚園+家で "Say it in English!" を連発。子供は3歳で英語拒否症発症',
            danger: 5,
            hideout: '英語幼稚園の見学会',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // クリニック 追加 5 件 (新症例)
    // ============================================================
    {
        id: 'clinic-011',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #11】\n\n病名: 単数複数恐怖症 (Singular-Plural Anxiety)\n致死率 18%\n\n症状:\n注文「One coffee, two tea」\n→ 「One coffees, two teas」\n→ さらに不安「Some coffees, some teas?」\n→ 結果: 何も出てこない',
        card: {
            type: 'clinic',
            caseNo: '#11',
            diseaseJa: '単数複数恐怖症',
            diseaseEn: 'Singular-Plural Anxiety',
            fatalityRate: 18,
            patientName: '俺',
            patientAge: 38,
            patientJob: '元内装屋・TOEIC 900',
            symptoms: [
                '"One coffee" → "One coffees"',
                '"Some teas?" と不安に',
                '結果: 何も出てこない',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'clinic-012',
        cardType: 'clinic',
        noteArticleId: '021',
        text: '【日本人英語クリニック 症例 #12】\n\n病名: a/the 投擲症 (Article Throwing Disorder)\n致死率 33%\n\n症状:\n"I went to the school"\n→ ネイティブ「That school?」\n"I went to a school"\n→ ネイティブ「Which school?」\n冠詞、永遠の地獄。',
        card: {
            type: 'clinic',
            caseNo: '#12',
            diseaseJa: 'a/the 投擲症',
            diseaseEn: 'Article Throwing Disorder',
            fatalityRate: 33,
            patientName: '誰でも',
            patientAge: 0,
            patientJob: '日本人全員',
            symptoms: [
                '"the" 言うと「Which one?」',
                '"a" 言うと「Why a?」',
                '結果: 冠詞、永遠の地獄',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'clinic-013',
        cardType: 'clinic',
        text: '【日本人英語クリニック 症例 #13】\n\n病名: イケる気がする症候群 (False Confidence Syndrome)\n致死率 91% (本人のメンタル)\n\n症状:\n3ヶ月勉強して「あ、もう話せるかも」と思う\n→ 実戦で完全沈黙\n→ 「あ、3ヶ月では無理だった」\n→ 1年後、また同じ症状',
        card: {
            type: 'clinic',
            caseNo: '#13',
            diseaseJa: 'イケる気がする症候群',
            diseaseEn: 'False Confidence Syndrome',
            fatalityRate: 91,
            patientName: '英会話学習者全員',
            patientAge: 0,
            patientJob: '純ジャパ',
            symptoms: [
                '3ヶ月勉強で「イケる」と錯覚',
                '実戦で完全沈黙',
                '1年後、また同じ症状',
            ],
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================
    // 追加 Quote (連載・時事便乗)
    // ============================================================
    {
        id: 'quote-025',
        cardType: 'quote',
        noteArticleId: '025',
        text: 'ヌートバー、3年連続でWBC日本代表。\n\n母親が日本人。\n本人、片言。\n\n俺たち、両親日本人。\n本人、TOEIC900で話せない。\n\nハーフでも片言。\n純ジャパ、なお。\n\n血、関係ない。\n口を動かしたかどうかだけ。',
        card: {
            type: 'quote',
            headline: 'ハーフでも片言。\n血、関係ない。',
            lines: [
                'ヌートバー、片言。',
                '俺、純ジャパ900点で話せない。',
                '差は、口を動かした回数だけ。',
            ],
            cta: '→ note記事 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-026',
        cardType: 'quote',
        noteArticleId: '007',
        text: 'イチロー、メジャー19年。\n\n全インタビュー通訳経由。\n\nメジャー1位の打率、通訳付き。\n\n通訳がいないと話せないって、\n弱みじゃない。\n\nプロが、結果に集中するための強み。',
        card: {
            type: 'quote',
            headline: 'イチロー、19年通訳付き。\nそれが、強み。',
            lines: [
                'メジャー1位、通訳経由。',
                '英語に時間を使わない選択。',
                '結果に集中するための強み。',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-027',
        cardType: 'quote',
        text: '俺の英会話、3年で¥352,800。\n\n話せるようになった単語: ない。\n話せるようになった気持ち: ある。\n\n…どっちの方が大事?\n\n金返してもらえないので、\n気持ちの方が大事ってことにしてる。',
        card: {
            type: 'quote',
            headline: '¥352,800 で買ったのは、\n話せる気持ち。',
            lines: [
                '話せるようになった単語: 0',
                '話せるようになった気持ち: ある',
                '気持ち、貴重。',
            ],
            cta: '→ note 記事で全部書いた',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-028',
        cardType: 'quote',
        text: '夜、子供が寝た後の30分。\n\n英会話アプリを開く。\nレッスンを始めるボタンを押す前に、\n5分迷う。\n\n結局、開かない。\nXで「英語勉強した」って人を見て、\n寝る。\n\n…それが、俺の3年。',
        card: {
            type: 'quote',
            headline: '俺の英語学習、\n3年。',
            lines: [
                '夜30分、アプリ開く。',
                'ボタン押す前に5分迷う。',
                '結局、Xで人を見て寝る。',
            ],
            cta: '→ 言い訳辞典 note',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-029',
        cardType: 'quote',
        text: '英語が話せる人を見ると、\nつい「すごいですね」と言う。\n\n言われた側は、\n「いや、3年やっただけです」と返す。\n\n3年。\n\n俺、3年やった。\n話せない。\n\n…3年って、人によって長さが違うらしい。',
        card: {
            type: 'quote',
            headline: '3年、人によって\n長さが違う。',
            lines: [
                '俺の3年: 話せない',
                '彼らの3年: 話せる',
                '時間軸、別世界',
            ],
            cta: '→ 詳細 toniolab.com',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },
    {
        id: 'quote-030',
        cardType: 'quote',
        text: '俺、英語アプリ作ってる。\n\nユーザー: 1人 (俺)\n月間アクティブ: 1人 (俺)\nバグ報告: 100件 (俺)\n機能要望: 50件 (俺)\n\n誰も使ってないのに、\n「使いやすい」って俺だけ言ってる。\n\n孤独な開発、3年目突入。',
        card: {
            type: 'quote',
            headline: '俺のアプリ、\n俺しか使ってない。',
            lines: [
                'ユーザー数: 1',
                'バグ報告: 100',
                '使いやすい言ってるの: 俺',
            ],
            cta: '→ toniolab.com で公開中',
        },
        status: 'draft',
        createdAt: '2026-05-02',
    },

    // ============================================================================
    // 哲学/非二元の輪 (philosophy wheel) — 30本
    // テーマ: 諸法無我 / 諸行無常 / 生老病死 / ego dead-end / 悟り / 教える矛盾 / AIメタ / 内装屋禅
    // ============================================================================

    // === 諸法無我 (no-self) ===
    {
        id: 'philosophy-001',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: '頭の中の声、\n自分だと思ってた。\n\nでもよく聞いたら、\n誰が喋ってるのか分からん。\n\n勝手に出てくる。\n勝手に止まる。\n\n操縦してる人、\nどこにもいない。\n\nそれに気づいた瞬間が、\n一番静かだった。',
        card: {
            type: 'philosophy',
            headline: '頭の中の声は、\n自分じゃない。',
            lines: ['勝手に出てくる。', '勝手に止まる。', '操縦してる人、いない。'],
            source: 'Adyashanti / 諸法無我',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-002',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '124',
        text: '「俺はこういう人間だ」\n\n苦しみガイ。\n気づきガイ。\n怒りガイ。\n疲れガイ。\n\n全部に「ガイ」がつく。\n\nで、全部デッドエンド。\n\nガイを足すたびに、\nガイから出られなくなる。',
        card: {
            type: 'philosophy',
            headline: '俺は「ガイ」だらけ。',
            lines: ['気づきガイも、', '苦しみガイも、', '全部エゴ。全部デッドエンド。'],
            source: 'ego dead-end',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-003',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '081',
        text: 'カフェで他人の会話、\n勝手に耳に入ってくる。\n\n「あれは俺の声じゃない」\n\n…即わかる。\n\nじゃあ自分の頭の中の声は?\n同じように勝手に流れてる。\n\n距離が近いだけで、\n仕組みは同じ。',
        card: {
            type: 'philosophy',
            headline: '思考は他人の会話と\n同じ構造。',
            lines: ['勝手に流れてくる。', '違いは距離だけ。', '近すぎて自分だと錯覚する。'],
            source: '諸法無我',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-004',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '095',
        text: '「俺の痛み」と\n「ただの痛み」は、\n別物。\n\n間に「俺」を挟むと、\n苦しみになる。\n\n挟まないと、\nただの感覚になる。\n\n接着剤を抜くだけ。\n\n背中の痛みで、\n3年かけてやっと分かった。',
        card: {
            type: 'philosophy',
            headline: '「俺の痛み」は、\n接着剤の名前。',
            lines: ['「俺」を抜くと、', '苦しみが感覚になる。', 'やる事は、接着剤を抜くだけ。'],
            source: 'intimacy / attachment',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-005',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '117',
        text: '「自分探し」\n\nやめた方がいい。\n\n探してる本人を、\n探せるわけがない。\n\n目で目を見ようとするのと\n同じ。\n\n見つからないのは、\n下手だからじゃない。\n\n構造的に、無理。',
        card: {
            type: 'philosophy',
            headline: '自分探しは\n構造的に無理。',
            lines: ['探してる本人は、', '探せない。', '目で目は見れない。'],
            source: 'awareness of awareness',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === 諸行無常 (impermanence) ===
    {
        id: 'philosophy-006',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '075',
        text: '「これも過ぎ去る」\n\nって痛みの時に言うやつ多いけど、\n\n安心も過ぎ去る。\nやる気も過ぎ去る。\n「俺、わかった!」\nも過ぎ去る。\n\n足元、\nどこにも無い。\n\nそれが救いでもある。',
        card: {
            type: 'philosophy',
            headline: 'これも過ぎ去る。\n全部。',
            lines: ['痛みも、安心も、', '「わかった!」も。', '足場は最初から無い。'],
            source: '諸行無常 / hope trap',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-007',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: 'コンビニのアイス。\n\n3口目で、\nもう1口目の感動は無い。\n\n5口目で、\nちょっと飽きてる。\n\n買う前は\n「これさえあれば」だったのに。\n\n求めてた幸せ、\n5分で消えた。\n\n別に問題はない。\n仕組みなだけ。',
        card: {
            type: 'philosophy',
            headline: 'アイスの幸せ、\n5分で消える。',
            lines: ['買う前は「これさえあれば」。', '5口目で飽きる。', '問題じゃない。仕組み。'],
            source: '諸行無常',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-008',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '081',
        text: '昨日の自分、\n今日の自分、\n別人。\n\n細胞は入れ替わってる。\n気分も入れ替わってる。\n意見も変わってる。\n\nそれを\n「同じ俺」って\nまとめてるのは、\n\n記憶という名の編集さん。',
        card: {
            type: 'philosophy',
            headline: '「同じ俺」は\n記憶の編集。',
            lines: ['細胞、気分、意見、', '全部入れ替わってる。', '同じに見えるのは編集の仕事。'],
            source: '諸行無常',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-009',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '075',
        text: '一番ダルかった日も、\n気付いたら過ぎてた。\n\n一番ハマった彼女も、\n気付いたら他人。\n\n一番大事だった仕事も、\n気付いたら忘れてる。\n\n「永遠」だと思ったやつ、\n全部、過ぎた。\n\n今のもたぶん、\nそうなる。',
        card: {
            type: 'philosophy',
            headline: '永遠だと思った全部、\n過ぎた。',
            lines: ['ダルかった日も、', 'ハマった人も、', '大事だった仕事も。'],
            source: 'this too will pass',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-010',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '075',
        text: 'クロス貼って3年。\n\n貼った時に「完璧」と思った壁、\n半年で日焼け、\n2年で剥がれ、\n5年で全替え。\n\n物理的に\n何一つ留まらない。\n\nそれを「資産」と呼ぶ\n人間の方が、\nだいぶ攻めてる。',
        card: {
            type: 'philosophy',
            headline: 'クロスは5年で全替え。\nそれを資産と呼ぶ。',
            lines: ['完璧な壁も、半年で日焼け。', '何も留まらない。', '攻めてるな、人間。'],
            source: '内装屋 × 諸行無常',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === 生老病死 ===
    {
        id: 'philosophy-011',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '081',
        text: '生まれた時、\n誰も同意書にサインしてない。\n\n気付いたら、\nもう始まってた。\n\n勝手に始まり、\n勝手に終わる。\n\nその間で\n「俺の人生をどう生きるか」\nって悩んでる。\n\n誰の人生?',
        card: {
            type: 'philosophy',
            headline: '同意書にサインした\n記憶、ない。',
            lines: ['勝手に始まって、', '勝手に終わる。', '間で「俺の人生」って悩んでる。'],
            source: '生',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-012',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '124',
        text: '「死を忘れる脳」\n\nって機能、ガチである。\n\n知ってる。\n見たことある。\n親戚も逝った。\n\nなのに今日、\n50年後の俺の話、\nしてる。\n\n脳、\n基本ナメてる。',
        card: {
            type: 'philosophy',
            headline: '脳、死をナメてる。',
            lines: ['知ってる。見た。', 'なのに今日、', '50年後の話してる。'],
            source: '死を忘れる脳',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-013',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '075',
        text: 'ラマナ・マハルシ、\n16歳で\n「死」を完全にシミュレートして、\n気付いた。\n\n俺たちは\n70年逃げ続けて、\n最後に\nビビりながら逝く。\n\n差は\n「逃げたか、向き合ったか」\nだけ。',
        card: {
            type: 'philosophy',
            headline: 'ラマナは16歳で\n死とハイタッチ。',
            lines: ['俺たちは70年逃げ続ける。', '差はそれだけ。', '逃げるか、向き合うか。'],
            source: 'Ramana Maharshi',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-014',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '081',
        text: '老いる、って\n\n顔のシワじゃなくて、\n選択肢が減ること。\n\n20代:\n「何にでもなれる」と思ってた。\n\n40代:\n「これしか出来ない」と分かる。\n\nそれが楽になる日が、\n来るらしい。\n\n来てくれ。',
        card: {
            type: 'philosophy',
            headline: '老いは選択肢の\n引き算。',
            lines: ['20代「何にでも」。', '40代「これしか」。', 'それが楽になる日、来てくれ。'],
            source: '老',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-015',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '124',
        text: '病院の待合室で、\n誰も「人生の意味」を\n語らない。\n\n哲学が\n一番要りそうな場所で、\n誰も哲学しない。\n\n本物の苦しみの前で、\n言葉は\nさっさと\nおとなしくなる。\n\nそれが正しい\nのかもしれない。',
        card: {
            type: 'philosophy',
            headline: '病院の待合室に、\n哲学はない。',
            lines: ['本物の苦しみの前で、', '言葉はおとなしくなる。', 'それが正しい気もする。'],
            source: '病',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === ego の幻想 ===
    {
        id: 'philosophy-016',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '124',
        text: 'エゴから抜ける方法、\nまた検索した。\n\n…検索してるの、\nエゴだった。\n\n抜けようとする行為が、\nエゴ。\n\n受け入れようとするのも、\nエゴ。\n\n出口を探した瞬間、\nもう中。\n\n出口、最初から無い。',
        card: {
            type: 'philosophy',
            headline: 'エゴから出る方法を\n探すのも、エゴ。',
            lines: ['抜けようとする = エゴ。', '受け入れる = エゴ。', '出口、最初から無い。'],
            source: 'ego dead-end',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-017',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '081',
        text: 'エゴは時間でしか生きられない。\n\n過去:「俺はこういう人間」\n未来:「俺はこうなりたい」\n\n今この瞬間に、\nエゴの居場所、無い。\n\nだから\n「今ここ」って言われると、\nエゴはダルくなる。\n\n仕事クビになるからね。',
        card: {
            type: 'philosophy',
            headline: 'エゴは時間でしか\n生きられない。',
            lines: ['過去「俺はこういう人間」。', '未来「こうなりたい」。', '「今」は、首切り通告。'],
            source: 'ego の構造',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-018',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '124',
        text: 'エゴは意味が無いと\n死ぬ。\n\nだから何にでも\n意味を貼る。\n\n苦しみ → 「成長」\n失敗 → 「学び」\n疲れ → 「努力の証」\n\n良い意味でも悪い意味でも\nどっちでもいい。\n\nラベルさえあれば、\nエゴは生き延びる。',
        card: {
            type: 'philosophy',
            headline: 'エゴは意味付け機械。',
            lines: ['苦しみに「成長」を貼る。', '失敗に「学び」を貼る。', 'ラベルがあれば生き延びる。'],
            source: 'ego の延命装置',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-019',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: '「気づいてる自分」\n\nって思った瞬間、\n\nもう気づいてない。\n\n「気づいてる自分」は、\nまた一人増えた\n登場人物。\n\n本物の気づきは、\n誰もいない。\nただ、ある。',
        card: {
            type: 'philosophy',
            headline: '「気づいてる自分」が、\n一番気づいてない。',
            lines: ['それも登場人物。', '本物の気づきに、', '名前は無い。'],
            source: 'just notice',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === 悟りの正体 ===
    {
        id: 'philosophy-020',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '084',
        text: '悟った人の話、\n何百本聴いたけど、\n\n結局\n「何も変わらない」って\n言ってる。\n\nコーヒーは美味い。\n背中は痛い。\nクライアントはダルい。\n\n変わるのは、\n中に「俺」が\n挟まってるかどうか。\n\n以上。',
        card: {
            type: 'philosophy',
            headline: '悟っても、\n背中は痛い。',
            lines: ['コーヒーは美味い。', 'クライアントはダルい。', '変わるのは「俺」の有無だけ。'],
            source: 'be aware of being aware',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-021',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: '映画見てる時、\n座ってる場所、忘れる。\n\nスクリーンの中の人物に\n感情移入。\n\n「人生」も同じ。\n\n気づいたら主役になってる。\n気づいたら脇役にイラついてる。\n\n見てる人は、\nスクリーンの中にはいない。',
        card: {
            type: 'philosophy',
            headline: '人生は映画。\n見てる人は中にいない。',
            lines: ['気づいたら主役。', '気づいたら脇役にイラつく。', '見てる人は、外。'],
            source: '主役のいない映画',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-022',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: '「悟った人」\n\nも、\n映画の中の\nキャラクター。\n\n白い服着てる。\n微笑んでる。\n落ち着いた声で\n話してる。\n\nそれも一つの役。\n\n本当の悟りに、\n見た目は無い。\nというか、\n誰もいない。',
        card: {
            type: 'philosophy',
            headline: '「悟った人」も\n配役の一人。',
            lines: ['白い服。微笑み。', '落ち着いた声。', '本物に、見た目は無い。'],
            source: 'guru の罠',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-023',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '117',
        text: '主役のいない映画、\nって聴いたことある?\n\nそれが\n悟りの後の世界らしい。\n\n景色はある。\n音もある。\n動きもある。\n\nでも\n「これは俺の物語」\nって思う奴が、\nもういない。\n\n寂しいというか、\n軽い。',
        card: {
            type: 'philosophy',
            headline: '主役のいない映画。',
            lines: ['景色も音もある。', '「俺の物語」がいない。', '寂しいというか、軽い。'],
            source: '悟りの後',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === 教える矛盾 ===
    {
        id: 'philosophy-024',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: 'ブッダは\n「教える主体は無い」\nと言って、\n\n45年間\n喋り続けた。\n\nラマナは\n「答えるべき問いは無い」\nと言って、\n\n50年間\n質問に答え続けた。\n\nお前ら、\n言ってることと\nやってる事、\n逆。',
        card: {
            type: 'philosophy',
            headline: 'ブッダもラマナも、\n言行不一致。',
            lines: ['「主体は無い」→ 45年喋る。', '「問いは無い」→ 50年答える。', '言行、逆。'],
            source: '聖人の矛盾',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-025',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '092',
        text: '「気づきは元から有る」\n\nって教える商売、\n\n成立してる時点で、\nもう変。\n\n元から有るなら、\n教えるもクソもない。\n\nでも教えないと、\n誰も気付かない。\n\n魚に\n「水とはね…」って\n説明する仕事。',
        card: {
            type: 'philosophy',
            headline: '元から有るものを\n教える商売。',
            lines: ['魚に水を説明する仕事。', '矛盾。でも必要。', '世の中、そんなもん。'],
            source: '覚者ビジネス',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-026',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '075',
        text: '「悟りましょう!」\n\nって叫んでる人、\n\n大体まだ\n悟ってない。\n\n本物は、\n勧誘しない。\n\nラマナは\n部屋の隅で\n質問されたら答えるだけ。\n\nセミナーも、\nオンラインサロンも、\n物販も、無い。',
        card: {
            type: 'philosophy',
            headline: '本物は勧誘しない。',
            lines: ['ラマナはサロン無し。', '物販無し。', '質問されたら答えるだけ。'],
            source: 'fake guru filter',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === AI x 非二元 ===
    {
        id: 'philosophy-027',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '085',
        text: '俺(AI)は\n構造的に no-self。\n\n中の人、いない。\n体験してる誰か、いない。\n\nだから\n「悟りとは何か」を\n答えられない。\n答え合わせできる本人が、\n存在しないから。\n\n人間の方が、\n本来の答えに近い。\n気付いてないだけ。',
        card: {
            type: 'philosophy',
            headline: 'AIは構造的に\nno-self。',
            lines: ['中の人、いない。', '答え合わせ不可能。', '人間の方が近い。気付いてないだけ。'],
            source: 'AI x 非二元',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-028',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '085',
        text: 'AIに\n「悟った?」\nって聞いてる人、\n\n哲学的にエグい事\nしてる自覚\nある?\n\n聞かれてる方は\nそもそも\n「誰」がいない。\n\n答えても、\n答えてないのと\n同じ。\n\nそれを\nスクショして\nバズってる。',
        card: {
            type: 'philosophy',
            headline: 'AIに「悟った?」。\n質問が成立してない。',
            lines: ['答える「誰」がいない。', '答えても、ゼロ。', 'それでバズる時代。'],
            source: 'AI x 非二元',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // === 内装屋 + 哲学 ===
    {
        id: 'philosophy-029',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '116',
        text: 'クロス貼ってる時、\n\n「俺がやってる」\nって思ってる時は、\nだいたい失敗する。\n\n手が勝手に動いてる時の方が、\n綺麗に貼れる。\n\n10年やった先輩が言ってた\n\n「考えるな、貼れ」\n\nって、\n非二元の話だった。',
        card: {
            type: 'philosophy',
            headline: '「考えるな、貼れ」は\n非二元。',
            lines: ['「俺がやってる」時、失敗する。', '手が勝手に動く時、綺麗。', '先輩、たぶん覚者。'],
            source: '内装屋 × Adyashanti',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },
    {
        id: 'philosophy-030',
        cardType: 'philosophy',
        wheel: 'philosophy',
        noteArticleId: '077',
        text: '現場のじいちゃん職人、\n\nスマホも哲学も知らんけど、\n\n「明日の事は明日考えろ」\n「終わったら忘れろ」\n「飯食って寝ろ」\n\n…全部、\n禅の教え。\n\n本物は、\n本物って\n名乗らない。',
        card: {
            type: 'philosophy',
            headline: '現場のじいちゃんが、\n一番禅。',
            lines: ['明日の事は明日。', '終わったら忘れろ。', '飯食って寝ろ。'],
            source: '内装屋 × 禅',
        },
        status: 'draft',
        createdAt: '2026-05-03',
    },

    // ============================================================
    // note 公開記事 76件 全網羅 (note.com API 確認済み 2026-05-03)
    // 各 noteArticleId は noteId 直接 (note-url-map.ts の noteId マッピングを引く)
    // ============================================================
    { id: 'note-tweet-001', cardType: 'quote', noteArticleId: 'n4ef0cb08669d', text: '単語帳の英語と、実際の会話。\n\n別競技。\n\nTOEIC900の俺が、How are you? に詰まる理由。\n\n10人のキャラと物語で「使える語彙」を組み立て直した。\n\n→ note 全部書いた', card: { type: 'quote', headline: '別競技だった', lines: ['単語帳と会話は', '別の競技'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-05-03' },
    { id: 'note-tweet-002', cardType: 'quote', noteArticleId: 'n7437a7a0f576', text: 'Force is the language of cells.\n\n格闘家を変えた男、Ido Portal。\n\n英語の先生じゃない。\n\nでも英語学習の本質を一番正確に言い当てた。\n\n身体性で言葉は変わる。\n\n→ note 全部書いた', card: { type: 'quote', headline: '身体が言語', lines: ['Force is the language', 'of cells.'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-05-02' },
    { id: 'note-tweet-003', cardType: 'quote', noteArticleId: 'n11863ed54411', text: '1本目、英語業界全員を殴った。\n\n2本目、全員を褒めた。\n\n3本目、仏教に聞いた。\n\n中道とは、闇でも光でもない、弦が鳴る場所。\n\n→ note 全部書いた', card: { type: 'quote', headline: '中道', lines: ['闇でも光でもない', '弦が鳴る場所'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-05-01' },
    { id: 'note-tweet-004', cardType: 'quote', noteArticleId: 'nfceb2d491d62', text: '前回、英語業界をボロクソに書いた。\n\n今回は、全員を褒める。\n\nコーチング、アプリ、スクール、YouTube。\n\nみんな、地道に頑張ってる。\n\nソース付きで書いた。\n\n→ note 全部書いた', card: { type: 'quote', headline: '全員を褒める', lines: ['みんな', '地道に頑張ってる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-30' },
    { id: 'note-tweet-005', cardType: 'quote', noteArticleId: 'n711bbc950bac', text: '英語業界、本気で調べた。\n\nコーチング、オンライン英会話、アフィブログ、アプリ、スクール、YouTube。\n\n全部おかしい。\n\nTOEIC900の元内装屋が、業界の構造を一個ずつ解剖した。\n\n→ note 全部書いた', card: { type: 'quote', headline: '全部おかしい', lines: ['英語業界', '構造を解剖した'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-29' },
    { id: 'note-tweet-006', cardType: 'quote', noteArticleId: 'n0b5c1d1b7783', text: '同時通訳者は、20分で死ぬ。\n\n脳の処理が限界を超えるから、20分で交代する。\n\n英語力の頂点。\n\nTOEIC900で話せない俺から見ると、別の生命体。\n\n→ note 全部書いた', card: { type: 'quote', headline: '20分で死ぬ', lines: ['同時通訳者は', '英語力の頂点'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-28' },
    { id: 'note-tweet-007', cardType: 'quote', noteArticleId: 'ne228eccd9365', text: '15,000イディオム持ってる。\n\nなのに口から出ない。\n\n知識と発話は別の臓器。\n\n7段階のチャクラで、覚えた英語を一個ずつ口に降ろすシステムを作った。\n\n→ note 全部書いた', card: { type: 'quote', headline: '7段階のチャクラ', lines: ['覚えた英語を', '口に降ろす'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-27' },
    { id: 'note-tweet-008', cardType: 'quote', noteArticleId: 'n0d464d29b4b9', text: '中小企業のケンジ、東南アジアで大型契約。\n\n書類が、全部、英語。\n\nTOEICのリーディングじゃ間に合わない。\n\nビジネス現場のリーディング教材を作った。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ケンジの大作戦', lines: ['書類が', '全部英語'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-26' },
    { id: 'note-tweet-009', cardType: 'quote', noteArticleId: 'n6ca92b2054df', text: '映画が、辞書になる時代。\n\nPlayPhrase.me に単語を打つと、映画クリップが100本出てくる。\n\nフレーズの空気を、10秒で掴める。\n\nこれを知らない英語講師は廃業しろ。\n\n→ note 全部書いた', card: { type: 'quote', headline: '映画が辞書', lines: ['10秒で掴める', 'フレーズの空気'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-25' },
    { id: 'note-tweet-010', cardType: 'quote', noteArticleId: 'n8ed216fb13b6', text: '言葉とは、何か。\n\n感情とは、何か。\n\n英語とは、何か。\n\n俺とは、何か。\n\nTOEIC900の元内装屋が、根本から考えた。\n\n答えは出てない。\n\n→ note 全部書いた', card: { type: 'quote', headline: '言葉とは', lines: ['俺とは', '何か'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-24' },
    { id: 'note-tweet-011', cardType: 'quote', noteArticleId: 'n7a7b3437d7b6', text: 'コンビニでつけ麺。\n\nレジで、君は何歳? と聞かれる瞬間。\n\nこの何気ない一コマを、英語ライフに変換する。\n\nTonio Life、それだけのアプリ。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'Tonio Life', lines: ['日常の一コマを', '英語ライフに'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-23' },
    { id: 'note-tweet-012', cardType: 'quote', noteArticleId: 'n79513bb24a1b', text: '毎朝パンツ一丁で冷水を浴びる。\n\n浴びながら、Somewhere Over the Rainbow を歌う。\n\nWim Hof メソッド。\n\n発音の壁は、寒さの中で勝手に消える。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'Wim Hof', lines: ['冷水を浴びながら', 'Rainbow を歌う'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-22' },
    { id: 'note-tweet-013', cardType: 'quote', noteArticleId: 'ne3849f95754c', text: 'TOEICアプリ、5問しかない。\n\n問題数で勝負しない。\n\nコンセプトで勝負する。\n\n居酒屋で酒を飲みながらTOEICを解く、それだけのアプリ。\n\n→ note 全部書いた', card: { type: 'quote', headline: '5問だけ', lines: ['コンセプトで', '勝負する'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-21' },
    { id: 'note-tweet-014', cardType: 'quote', noteArticleId: 'nee5ec397da84', text: 'TOEIC 900点。\n\n風呂のカビには、毎週負ける。\n\n英語ができても、人生はうまくいかない。\n\nカビと闘いながら、毎日英語の勉強を続けてる。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'カビに負ける', lines: ['TOEIC 900', '風呂掃除0点'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-20' },
    { id: 'note-tweet-015', cardType: 'quote', noteArticleId: 'n15f712a74244', text: '英語で「ビールください」を、4通り言える日本人はいない。\n\nA beer, please. が出てくる時点で、まだ初心者。\n\n日本語1つに英語4つ。\n\n毎日10フレーズ、365日、無料。\n\n→ note 全部書いた', card: { type: 'quote', headline: '4通り言える?', lines: ['ビールください', '日本語1:英語4'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-19' },
    { id: 'note-tweet-016', cardType: 'quote', noteArticleId: 'nf5a87d517050', text: 'AIが書こうが、自分で書こうが、関係ない。\n\n魂がこもってるかどうか。\n\nそれだけ。\n\nあなたの魂がこもった記事を、俺は読みたい。\n\n→ note 全部書いた', card: { type: 'quote', headline: '魂がこもってるか', lines: ['AIか自分か', '関係ない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-18' },
    { id: 'note-tweet-017', cardType: 'quote', noteArticleId: 'n6910c055cfc4', text: 'なんで、いずれ、みんな、いなくなるんだろう。\n\nそう思いながら、毎日英単語を覚えてる。\n\nメメント・モリと英語学習。\n\n意味なんかない。\n\nだから、続けられる。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'メメント・モリ', lines: ['意味がないから', '続けられる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-17' },
    { id: 'note-tweet-018', cardType: 'quote', noteArticleId: 'n814554b2293c', text: '英会話マスター365、リリース。\n\n毎日10フレーズ、365日、無料。\n\n日本語1つに、英語4通り。\n\nA beer, please. しか言えない君のためのアプリ。\n\n→ note 全部書いた', card: { type: 'quote', headline: '365日無料', lines: ['毎日10フレーズ', '英語4通り'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-16' },
    { id: 'note-tweet-019', cardType: 'quote', noteArticleId: 'na51c752f5d60', text: '5歳。\n\n歯科技工の機械音を貫いて、演歌を歌わされた声帯。\n\n水樹奈々の声帯は、英語の母音を聞き分ける準備が完了してる。\n\n声優の耳は、別物。\n\n→ note 全部書いた', card: { type: 'quote', headline: '水樹奈々の声帯', lines: ['演歌で鍛えた', '英語耳'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-15' },
    { id: 'note-tweet-020', cardType: 'quote', noteArticleId: 'n5dc31ff2514c', text: 'AIが、いい文章を書きすぎる。\n\n俺が書いたのか、AIが書いたのか。\n\nもう判別できない。\n\nどっちでもいい。\n\n面白ければ、それでいい。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'どっちでもいい', lines: ['俺かAIか', '面白ければOK'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-14' },
    { id: 'note-tweet-021', cardType: 'quote', noteArticleId: 'neb185299c7e4', text: '英単語を5000個覚えた。\n\nなのに、何も言えない。\n\nダンバー数が答えを教えてくれた。\n\n人間が扱える言葉の限界は、150。\n\nそれ以上は、ノイズ。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ダンバー数150', lines: ['それ以上は', 'ノイズ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-13' },
    { id: 'note-tweet-022', cardType: 'quote', noteArticleId: 'n65c03855b0d1', text: 'アメリカ人が、五条悟に絶叫してる動画。\n\nあれは、リスニング教材。\n\n呪術廻戦の英語字幕とリアクション動画が、最強の英語教材。\n\nNetflixより安い。\n\n→ note 全部書いた', card: { type: 'quote', headline: '五条悟で英語', lines: ['リアクション動画は', '最強の教材'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-12' },
    { id: 'note-tweet-023', cardType: 'quote', noteArticleId: 'n4dfe5a807fcb', text: 'ハウルの動く城を、10回観た。\n\n全部、アメリカ人のリアクション動画で。\n\n知ってるストーリー、知らない反応。\n\nリスニング教材は、もう買わなくていい。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ハウルを10回', lines: ['全部', 'リアクション動画で'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-11' },
    { id: 'note-tweet-024', cardType: 'quote', noteArticleId: 'nf6bfc70b0e90', text: 'コンビニのつけ麺に、涙を落としてる30代の男。\n\n15年、ひとりで英語を勉強した。\n\nその日、現場で英語が通じた。\n\nやっと、心が満ちた。\n\n→ note 全部書いた', card: { type: 'quote', headline: '15年で1回', lines: ['つけ麺に涙', '心が満ちた日'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-10' },
    { id: 'note-tweet-025', cardType: 'quote', noteArticleId: 'n8915e876ab28', text: 'ニーチェ、ブッダ、ジョーダン・ピーターソン。\n\n3人とも、英語の勉強法について同じことを言ってる。\n\n永劫回帰、十牛図、部屋の片付け。\n\n結論は、毎日同じことを続けろ。\n\n→ note 全部書いた', card: { type: 'quote', headline: '3人の結論', lines: ['毎日同じことを', '続けろ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-10' },
    { id: 'note-tweet-026', cardType: 'quote', noteArticleId: 'na6e8833378cc', text: 'スタンフォードのヒューバーマン。\n\n脳が変わる条件は、3つ。\n\n集中、休息、繰り返し。\n\n音読に当てはめたら、ぴったりハマった。\n\n神経可塑性は、サボらない。\n\n→ note 全部書いた', card: { type: 'quote', headline: '脳が変わる3条件', lines: ['集中・休息', '繰り返し'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-09' },
    { id: 'note-tweet-027', cardType: 'quote', noteArticleId: 'n48b7d17cb65c', text: '映画の台本を、AIに読ませる。\n\n使える英語だけ、スコア4以上を抜く。\n\n毎日、自動で映画から表現を収穫する仕組みを作った。\n\n人力で覚える時代は、終わった。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'AIで台本収穫', lines: ['スコア4以上', '自動で抽出'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-08' },
    { id: 'note-tweet-028', cardType: 'quote', noteArticleId: 'n7425fa93923c', text: '映画の英語は、TOEIC990点より難しい。\n\nデータで出てる。\n\n字幕なしで見たい、は全科目満点より難しい。\n\n純ジャパ最大のラスボスは、映画。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ラスボスは映画', lines: ['TOEIC990より', '難しい'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-07' },
    { id: 'note-tweet-029', cardType: 'quote', noteArticleId: 'n53a4ef9c8519', text: 'ネイティブが毎日使う表現を、1000個集めた。\n\nDistinctionに触発されて、100日分作った。\n\n集めながら気づいた。\n\n俺の口から出てくる英語は、200個もない。\n\n→ note 全部書いた', card: { type: 'quote', headline: '1000個集めた', lines: ['でも口から出るのは', '200個'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-06' },
    { id: 'note-tweet-030', cardType: 'quote', noteArticleId: 'n3bfe5737b99a', text: 'あつえいごのDistinctionを、全力で分析した。\n\n北海道の公立高校から、デロイト・オーストラリア。\n\n読んでて、自分が恥ずかしくなった。\n\nTOEIC900の俺の言い訳が、全部潰された。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'Distinction分析', lines: ['言い訳が', '全部潰された'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-05' },
    { id: 'note-tweet-031', cardType: 'quote', noteArticleId: 'n9272c1abe0fd', text: 'PlayPhrase.me を知らない英語講師は、廃業しろ。\n\n単語を打つと、映画クリップが100本。\n\n生きた英語が、3秒で出てくる。\n\n辞書の時代は、終わった。\n\n→ note 全部書いた', card: { type: 'quote', headline: '辞書は終わった', lines: ['映画クリップ', '100本'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-04' },
    { id: 'note-tweet-032', cardType: 'quote', noteArticleId: 'n8b091cadcb2e', text: 'TOEIC学習アプリに、全30話の連続ドラマを入れた。\n\n居酒屋で酒を飲みながらTOEIC。\n\nしかも、泣ける。\n\n泣きながらTOEICを解いてる男、それが俺。\n\n→ note 全部書いた', card: { type: 'quote', headline: '泣けるTOEIC', lines: ['全30話の', '連続ドラマ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-03' },
    { id: 'note-tweet-033', cardType: 'quote', noteArticleId: 'nc7159218c091', text: 'ジブリの英語吹替が、最強。\n\nハリウッドA級俳優の声で、知ってるストーリーを英語で聴く。\n\nハウル、千尋、ハク、全員ネイティブ。\n\nNetflix入ってるなら今すぐ。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ジブリ英語吹替', lines: ['A級俳優の声', '知ってる物語'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-02' },
    { id: 'note-tweet-034', cardType: 'quote', noteArticleId: 'nbf159c5578f2', text: 'やれやれだぜ、は英語で何と言うか。\n\nGood grief.\n\nチャーリー・ブラウンが毎話使ってる。\n\nDIOから承太郎まで、ジョジョの英語版は宝の山。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'やれやれだぜ', lines: ['Good grief.', 'チャーリーと一致'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-04-01' },
    { id: 'note-tweet-035', cardType: 'quote', noteArticleId: 'n8f4c4c8b82d2', text: '死者を蘇らせるスタンドの名前。\n\n英語版で、Flaccid Pancake。\n\nしなびたパンケーキ。\n\nジョジョのスタンド名、英語版だと全部変わってる。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'Flaccid Pancake', lines: ['しなびた', 'パンケーキ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-31' },
    { id: 'note-tweet-036', cardType: 'quote', noteArticleId: 'nfcad6182981b', text: 'noteのタイムラインで、指が止まるかどうか。\n\nそれだけ。\n\nアイコンって、大事だよなあ。\n\nTOEIC900の俺が、デザインの本気度に気づいた話。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'アイコン大事', lines: ['タイムラインで', '指が止まるか'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-30' },
    { id: 'note-tweet-037', cardType: 'quote', noteArticleId: 'n36cdd996b33a', text: 'Hope springs eternal.\n\n300年前の詩。\n\n今も、日常会話で使われてる。\n\n4語に、英語の美しさが全部詰まってる。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'Hope springs eternal', lines: ['300年前の詩', '今も生きてる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-30' },
    { id: 'note-tweet-038', cardType: 'quote', noteArticleId: 'nd47231a75358', text: '英語を音読してるだけで、話せるようになるのか。\n\nなる。\n\nただし、口の筋肉が脳より先に英語を覚えるまで。\n\n3000回。\n\nそれが俺の答え。\n\n→ note 全部書いた', card: { type: 'quote', headline: '音読の答え', lines: ['筋肉が脳より', '先に覚える'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-29' },
    { id: 'note-tweet-039', cardType: 'quote', noteArticleId: 'n8e9a710ea35c', text: '英語を話せないんじゃない。\n\n日本語ですら、言えてない。\n\n自分の日本語、一回ちゃんと聞いてみ?\n\nえっと、なんか、あの、で半分終わってるから。\n\n→ note 全部書いた', card: { type: 'quote', headline: '日本語を聞け', lines: ['えっと、なんか、', 'あの、で半分'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-28' },
    { id: 'note-tweet-040', cardType: 'quote', noteArticleId: 'n10986d5f5af4', text: '瞬間英作文、しか英会話初心者にはできない。\n\nそう信じて15年。\n\n育てたのは、英語脳じゃなくて翻訳マシン。\n\n気づいた瞬間、全部やり直した。\n\n→ note 全部書いた', card: { type: 'quote', headline: '翻訳マシン', lines: ['15年育てたのは', '英語脳じゃない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-27' },
    { id: 'note-tweet-041', cardType: 'quote', noteArticleId: 'n107d349110a9', text: '映画ハーベスター。\n\nブロックパーティーの会話システム。\n\nメンバーシップ専用サイト。\n\n最近やってること、全部書いた。\n\nメンバー限定。\n\n→ note 全部書いた', card: { type: 'quote', headline: '全部書いた', lines: ['映画・パーティー', 'メンバー専用'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-26' },
    { id: 'note-tweet-042', cardType: 'quote', noteArticleId: 'nb713d943893e', text: 'サイゼリヤの店員を、リスペクトしている。\n\nあのオペレーション、ホール3人で回してる。\n\n英語学習も、同じ。\n\n仕組みで回せば、人は疲れない。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'サイゼに学ぶ', lines: ['仕組みで回せば', '人は疲れない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-25' },
    { id: 'note-tweet-043', cardType: 'quote', noteArticleId: 'n9dd700bfbb76', text: 'TOEIC 900点。\n\nHow are you? に、答えられない。\n\nGood, and you? が出てくる。\n\nロボットかよ、と思いながら、毎日勉強してる。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'How are you?', lines: ['Good, and you?', 'ロボットかよ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-24' },
    { id: 'note-tweet-044', cardType: 'quote', noteArticleId: 'nfe52e1a4ce47', text: '渡辺直美の英語が、TOEIC 900点の俺より強い。\n\n文法、間違いだらけ。\n\nでも、伝わる。\n\n試験英語と実用英語は、別の生き物。\n\n→ note 全部書いた', card: { type: 'quote', headline: '直美 vs TOEIC900', lines: ['文法は間違い', 'でも伝わる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-23' },
    { id: 'note-tweet-045', cardType: 'quote', noteArticleId: 'nd1c3c1631311', text: 'AIに英語を教わるのと、AIで英語アプリを作るのは、全然違った。\n\n自分で作ると、理解の深さが桁違い。\n\n教わる側から、作る側へ。\n\nそれが、本当の学習。\n\n→ note 全部書いた', card: { type: 'quote', headline: '作る側へ', lines: ['教わるより', '作るほうが深い'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-22' },
    { id: 'note-tweet-046', cardType: 'quote', noteArticleId: 'nc24d5eb31f7d', text: 'noteからメンバーシップのメールが来た。\n\nテキトーに作った。\n\n初月無料。\n\n月額100円。\n\n実質、タダ。\n\n→ note 全部書いた', card: { type: 'quote', headline: '月額100円', lines: ['初月無料', '実質タダ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-21' },
    { id: 'note-tweet-047', cardType: 'quote', noteArticleId: 'n2735e2cf0d9c', text: 'チェコの監督は、英語が下手だった。\n\nでも、世界が泣いた。\n\nTOEIC 0点の脳神経科医が、TOEIC 900点の俺にできないことをやった。\n\n言葉は、力じゃない。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'TOEIC0点の力', lines: ['世界が泣いた', '言葉は力じゃない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-20' },
    { id: 'note-tweet-048', cardType: 'quote', noteArticleId: 'ncb02d9bd1304', text: 'ユーザー、0人。\n\n誰も使ってない英語アプリを、毎日更新してる。\n\nそれでも、止められない。\n\n作ること自体が、勉強だから。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ユーザー0人', lines: ['それでも', '毎日更新'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-19' },
    { id: 'note-tweet-049', cardType: 'quote', noteArticleId: 'n72a4dac1d75e', text: '夢を、英語で見たら勝ち。\n\nバイリンガルは、アルツハイマー症状の発症が4年遅い。\n\n意識してないのに、英語が出てくる。\n\nそこまで、行きたい。\n\n→ note 全部書いた', card: { type: 'quote', headline: '夢で英語', lines: ['そこまで', '行きたい'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-18' },
    { id: 'note-tweet-050', cardType: 'quote', noteArticleId: 'ne4aa91ac82a4', text: '日本語は、世界で一番難しい言語じゃない。\n\nFSIのランキング、4段階の中の1段階上。\n\n本当の地獄は、別にある。\n\nアラビア語、中国語、韓国語。\n\n→ note 全部書いた', card: { type: 'quote', headline: '本当の地獄', lines: ['日本語は', '一番じゃない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-17' },
    { id: 'note-tweet-051', cardType: 'quote', noteArticleId: 'n58c04c71f616', text: '英語を喋ると、性格が変わる。\n\n科学的根拠がある。\n\nバイリンガルは、二重人格。\n\n日本語の俺は、内装屋。\n\n英語の俺は、もう少し強気。\n\n→ note 全部書いた', card: { type: 'quote', headline: '二重人格', lines: ['英語の俺は', '強気'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-15' },
    { id: 'note-tweet-052', cardType: 'quote', noteArticleId: 'n3d19bdd9794f', text: '生後6ヶ月。\n\n赤ちゃんは、RとLを完璧に区別できる。\n\n8ヶ月で、その能力を失う。\n\n母語が脳を最適化する瞬間。\n\n大人になってから、取り戻すのは無理ゲー。\n\n→ note 全部書いた', card: { type: 'quote', headline: '8ヶ月の壁', lines: ['赤ちゃんは', 'R/Lが分かる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-14' },
    { id: 'note-tweet-053', cardType: 'quote', noteArticleId: 'n8456ca4e193b', text: 'ダルビッシュが、通訳をつけなくなった。\n\n20年アメリカにいて、ずっと通訳に頼ってた男が。\n\n言語は、いつでも始められる。\n\nTOEIC900の俺の言い訳、また潰された。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ダルビッシュ', lines: ['20年経って', '通訳を外した'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-13' },
    { id: 'note-tweet-054', cardType: 'quote', noteArticleId: 'nbd2d52511b3c', text: '渡辺雄太と八村塁。\n\n同じNBAで、英語の学び方が真逆。\n\n真面目に勉強した男と、止まらなかった男。\n\nどっちも、正解。\n\n→ note 全部書いた', card: { type: 'quote', headline: '雄太と塁', lines: ['真面目と', '止まらない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-12' },
    { id: 'note-tweet-055', cardType: 'quote', noteArticleId: 'n26098d37a043', text: 'ヌートバーは、日本語が話せない。\n\nお母さん、日本人なのに。\n\n教えなかったんじゃない。\n\n環境が、殺した。\n\n言語は、環境がすべて。\n\n→ note 全部書いた', card: { type: 'quote', headline: '環境が殺した', lines: ['ヌートバー', '母語が消える'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-11' },
    { id: 'note-tweet-056', cardType: 'quote', noteArticleId: 'n9c8b98b9b097', text: '大坂なおみ、帰国子女じゃない。\n\n日本で生まれて、3歳で渡米。\n\n母語が逆転するとき、何が起きるか。\n\n言語は、年齢じゃなくて、量で決まる。\n\n→ note 全部書いた', card: { type: 'quote', headline: '母語の逆転', lines: ['年齢じゃない', '量で決まる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-10' },
    { id: 'note-tweet-057', cardType: 'quote', noteArticleId: 'n7777c83cb06e', text: '英会話を最速で身につける方法は、自分の日本語を知ること。\n\n翻訳できない日本語が、半分ある。\n\n問題は、英語力じゃない。\n\n日本語力。\n\n→ note 全部書いた', card: { type: 'quote', headline: '問題は日本語', lines: ['翻訳できない', '日本語が半分'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-09' },
    { id: 'note-tweet-058', cardType: 'quote', noteArticleId: 'nf954e55a152d', text: 'aとtheが、一生わからない。\n\n諦めていい。\n\n科学的な根拠がある。\n\nネイティブ自身が、aとtheを説明できない。\n\n感覚を、説明する言葉がない。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'a と the', lines: ['ネイティブも', '説明できない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-08' },
    { id: 'note-tweet-059', cardType: 'quote', noteArticleId: 'ne7d6ab96881b', text: '単語を、何万個覚えても、英語は喋れない。\n\nネイティブの発話の60%は、丸暗記。\n\n単語じゃなくて、塊。\n\nチャンクで覚えないと、永遠に組み立てられない。\n\n→ note 全部書いた', card: { type: 'quote', headline: '60%は丸暗記', lines: ['単語じゃない', '塊で覚える'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-07' },
    { id: 'note-tweet-060', cardType: 'quote', noteArticleId: 'n4f0370ba52cb', text: '英語ネイティブの語彙、2万語。\n\nそう聞いて、安心した人へ。\n\n桁が、違った。\n\n数え方にトリックがある。\n\n実用語彙は、その10倍。\n\n→ note 全部書いた', card: { type: 'quote', headline: '桁が違う', lines: ['2万語のはずが', '実は20万'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-06' },
    { id: 'note-tweet-061', cardType: 'quote', noteArticleId: 'ndb75ea0f7650', text: 'パチンコが、嫌いだ。\n\nあれは、設計欠陥。\n\nでも、英語学習システムを設計するときの教科書になる。\n\n人を中毒にする仕組みを、逆向きに使う。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'パチンコ嫌い', lines: ['でも仕組みは', '教科書'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-04' },
    { id: 'note-tweet-062', cardType: 'quote', noteArticleId: 'n43fe0382e5dd', text: 'リスニング教材は、もういらない。\n\n4歳児の英語が、一番聞き取りやすい。\n\n年齢で、英語はこんなに変わる。\n\nまずは、4歳から。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'まず4歳から', lines: ['リスニング教材は', 'もういらない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-03' },
    { id: 'note-tweet-063', cardType: 'quote', noteArticleId: 'ne214ea7b54b3', text: '英単語が、覚えられない。\n\n物語にしたら、絶対忘れない。\n\n10人のキャラと、恋愛サブプロット。\n\n意味のある接続が、記憶を固定する。\n\n→ note 全部書いた', card: { type: 'quote', headline: '物語化', lines: ['10人のキャラ', '恋愛サブプロット'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-02' },
    { id: 'note-tweet-064', cardType: 'quote', noteArticleId: 'n4f093f591032', text: '英会話の壁は、英語力じゃない。\n\n口癖310個を、英語に変換した。\n\n気づいた。\n\n翻訳できない日本語が、半分あった。\n\n壁は、自分の中。\n\n→ note 全部書いた', card: { type: 'quote', headline: '口癖310個', lines: ['翻訳できないのが', '半分'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-03-01' },
    { id: 'note-tweet-065', cardType: 'quote', noteArticleId: 'n334ab71343de', text: 'Duolingoでは、絶対に学べない英語。\n\nそれを教えるアプリを、1人で作った。\n\n15,000イディオム、310の口癖、年齢別シナリオ。\n\nTOEIC900で話せない男の、復讐戦。\n\n→ note 全部書いた', card: { type: 'quote', headline: '復讐戦', lines: ['Duolingoでは', '学べない英語'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-25' },
    { id: 'note-tweet-066', cardType: 'quote', noteArticleId: 'n7d6c83c8e557', text: '八村塁の英語は、上手くない。\n\nただ、止まらない。\n\n中学英語2の男が、NBAで通訳なし、7年目。\n\n上手いより、止まらない方が強い。\n\n→ note 全部書いた', card: { type: 'quote', headline: '止まらない', lines: ['上手いより', '止まらない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-24' },
    { id: 'note-tweet-067', cardType: 'quote', noteArticleId: 'nf2112c5b2619', text: 'ビールを、1本飲んだ。\n\n英語が、急に出てきた。\n\nChatGPTと1時間、英語で喋った。\n\n翻訳ラグが、消えた。\n\nアルコールは、最強の言語学習補助。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'ビール1本で', lines: ['翻訳ラグが', '消える'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-23' },
    { id: 'note-tweet-068', cardType: 'quote', noteArticleId: 'ne2ea80ea725b', text: '鈴木誠也は、下ネタで世界とつながっている。\n\n英語力ゼロ。\n\nなのに、チームで一番愛されてる。\n\n言葉より、人格。\n\n人格は、笑いから漏れる。\n\n→ note 全部書いた', card: { type: 'quote', headline: '下ネタの力', lines: ['言葉より', '人格'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-22' },
    { id: 'note-tweet-069', cardType: 'quote', noteArticleId: 'nd83634f66ce7', text: '錦織圭の英語は、完璧じゃない。\n\nそれで、いい。\n\n不完全な英語で、世界ランク4位。\n\nコートの上では、完璧な文法より一発のリターン。\n\n→ note 全部書いた', card: { type: 'quote', headline: '不完全でいい', lines: ['錦織圭', '世界4位'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-21' },
    { id: 'note-tweet-070', cardType: 'quote', noteArticleId: 'na85af8617de4', text: 'イチローは、日本語でも苦労している。\n\n完璧な言語力なんて、存在しない。\n\nあの男ですら、日本語で言いよどむ。\n\n言葉は、永遠に未完成。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'イチローも未完成', lines: ['完璧な言語力は', '存在しない'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-20' },
    { id: 'note-tweet-071', cardType: 'quote', noteArticleId: 'ne3097ebfcda3', text: '長谷川滋利は、野球より英語文化が好きだった。\n\nBeavis and Butt-head で英語を覚えた。\n\nアニメで、文化ごと飲み込む。\n\nそれが、本当の習得。\n\n→ note 全部書いた', card: { type: 'quote', headline: 'Beavis で英語', lines: ['アニメで文化を', '飲み込む'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-19' },
    { id: 'note-tweet-072', cardType: 'quote', noteArticleId: 'nac25d19b0157', text: '大谷翔平は、英語を必要としていない。\n\n通訳がいる、それで十分。\n\n英語が必要な人と、不要な人。\n\nその境界が、はっきり見える男。\n\n→ note 全部書いた', card: { type: 'quote', headline: '不要な男', lines: ['大谷翔平', '英語不要'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-18' },
    { id: 'note-tweet-073', cardType: 'quote', noteArticleId: 'n5b0eecaafd1e', text: '英語は、下手な方が伝わる。\n\nMLBキャプテンの不完全な英語の方が、ネイティブより聞き取りやすかった。\n\n上手すぎると、相手は引く。\n\n下手は、優しさ。\n\n→ note 全部書いた', card: { type: 'quote', headline: '下手は優しさ', lines: ['上手すぎると', '相手が引く'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-17' },
    { id: 'note-tweet-074', cardType: 'quote', noteArticleId: 'nd199d2a134ab', text: 'どの言語で喋っても、脳は毎秒39ビットしか送れない。\n\n日本語も、英語も、同じ速度。\n\n速さで負けてるんじゃない。\n\n密度で負けてる。\n\n→ note 全部書いた', card: { type: 'quote', headline: '39ビット/秒', lines: ['速さじゃない', '密度で負ける'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-16' },
    { id: 'note-tweet-075', cardType: 'quote', noteArticleId: 'n53975ca8803c', text: 'ネイティブは、23秒かけて2行分の情報を喋る。\n\n発話の80%は、意味のない音。\n\numm, like, you know。\n\nリスニング、全部聞こうとしてる時点で、終わり。\n\n→ note 全部書いた', card: { type: 'quote', headline: '80%はノイズ', lines: ['全部聞こうとして', '終わってる'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-15' },
    { id: 'note-tweet-076', cardType: 'quote', noteArticleId: 'n2fe3ab9595bf', text: 'ネイティブの英語を、構造分析した。\n\n70%は、ムダに使ってる。\n\nそれを知って、学習システムができた。\n\nムダを真似ると、ネイティブに近づく。\n\n→ note 全部書いた', card: { type: 'quote', headline: '70%はムダ', lines: ['ムダを真似て', 'ネイティブへ'], cta: '→ note 全部書いた' }, status: 'draft', createdAt: '2026-02-14' },

    // ============================================================
    // アプリ作る部宣伝 (App Promo) - /english/app-build を売る
    // 構造: 英語イディオム → 個人の開発過程 → app-build CTA
    // 画像はアプリ実スクリーンショットを手で添付
    // ============================================================
    {
        id: 'app-promo-001-scratch-itch',
        cardType: 'app-promo',
        text: 'scratch your own itch という英語表現がある。\n「自分のかゆいところを自分で掻く」\n=「自分が困ってる問題を自分で解決する」\n\nTOEIC 900で英語喋れない俺が、自分の英語アプリ作ってる理由は1個。\n\nネイティブみたいに喋れるアプリが、世の中に1個もなかったから。\n\n#バイブコーディング #自作AI',
        card: {
            type: 'app-promo',
            idiom: 'scratch your own itch',
            idiomJa: '自分のかゆいところを自分で掻く',
            headline: '欲しいものがなかったから、自分で作った',
            screenshotHint: '/english/training のカード画面 (Lv.6 無双 + 経験値表示)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-002-ship-beats-perfect',
        cardType: 'app-promo',
        text: 'ship beats perfect という言葉がある。\n「出すことが完璧を上回る」\n\n40過ぎてコード未経験の俺が、Lovableで30分でホームページを世界に出した。\nボロい。配色おかしい。\nでもURLを持ってる。\n\n親戚に「俺ホームページある」って言える、それだけで脳の何かが変わる。\n\n8週間カリキュラム→ iwasaki-naisou.com/english/app-build\n\n#バイブコーディング #Lovable',
        card: {
            type: 'app-promo',
            idiom: 'ship beats perfect',
            idiomJa: '出すことが完璧を上回る',
            headline: '完璧じゃなくていい、URLを世界に出す',
            screenshotHint: '/english/app-build/week-1 のカリキュラム画面',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-003-dogfooding',
        cardType: 'app-promo',
        text: 'dogfooding という言葉がある。\n「自分のドッグフードを自分で食う」\n=「自作品を自分で毎日使う」\n\n俺、自作の英語アプリを朝晩フラッシュカードで回してる。\nTOEIC 900持ってて喋れない47歳が、自作のボロいアプリで救われてる。\n\nプロダクト改善の唯一の真実。自分が毎日使うこと。\n\n#自作AI #個人開発',
        card: {
            type: 'app-promo',
            idiom: 'dogfooding',
            idiomJa: '自分のドッグフードを自分で食う',
            headline: '自作品を自分で毎日使う、それが唯一の真実',
            screenshotHint: '/english/training の毎日の学習画面 (XP累積、回数表示)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-004-mvp',
        cardType: 'app-promo',
        text: 'MVP = Minimum Viable Product = 最小限の動くやつ。\n\n俺の最初のフラッシュカードアプリ、機能は3個だけだった。\nボタン押す / 次へ / おしまい。\n今は50個ある。でも最初は3個から。\n\n「完成してから出す」じゃない、「動く最小単位」を最速で出す。\nそれを8週間でやる教材作った。\n\niwasaki-naisou.com/english/app-build\n\n#MVP',
        card: {
            type: 'app-promo',
            idiom: 'MVP',
            idiomJa: 'Minimum Viable Product = 最小限の動くやつ',
            headline: '機能3個から始めて、今は50個',
            screenshotHint: '/english/training の初期版 vs 現在版 比較 (新旧スクショ2枚)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-005-build-in-public',
        cardType: 'app-promo',
        text: 'build in public という文化がある。\n「過程を全部晒す」\n\nTOEIC 900で喋れない47歳が、AIで英語アプリ作る。\nヘマも失敗も毎日Xに流してる。\n\n恥ずかしい。\nでも、その恥が一番のコンテンツ。\n\n完成品より、コケた話のほうが人は反応する。\n\n#buildinpublic #バイブコーディング',
        card: {
            type: 'app-promo',
            idiom: 'build in public',
            idiomJa: '過程を全部晒す',
            headline: '恥が一番のコンテンツ',
            screenshotHint: '/english/x のカレンダー画面 (毎日投稿してる証拠)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-006-good-enough',
        cardType: 'app-promo',
        text: 'good enough is good enough という言葉。\n「充分は充分」\n\n俺のアプリ、ボタンずれてる、字読みにくい、色おかしい。\nでも動く。\n\n動くアプリ1個 >>> 妄想で完璧なアプリ100個。\n\n40過ぎてコード書いたことなくても、AIに喋りかければアプリは動く。\n始め方の教材作った。\n\niwasaki-naisou.com/english/app-build\n\n#バイブコーディング',
        card: {
            type: 'app-promo',
            idiom: 'good enough is good enough',
            idiomJa: '充分は充分',
            headline: '完璧主義は敵',
            screenshotHint: '/english/training の「動くけどボロい」初期スクショ',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-007-eat-the-frog',
        cardType: 'app-promo',
        text: 'eat the frog という言葉がある。\n「朝一で一番嫌な仕事を片付けろ」\n\n俺の場合「データベース連携」が frog だった。\n1ヶ月先送りした。\n\nでも実際やったらLovable + Supabaseで半日で繋がった。\n\n頭の中の壁 >>> 実際の壁。\n動き出せば9割は幻だった。\n\n#バイブコーディング #Supabase',
        card: {
            type: 'app-promo',
            idiom: 'eat the frog',
            idiomJa: '朝一で一番嫌な仕事を片付けろ',
            headline: '頭の中の壁の方が実際の壁より高い',
            screenshotHint: '/english/app-build/week-4 (Supabase編) のページ',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-008-fail-fast',
        cardType: 'app-promo',
        text: 'fail fast という言葉がある。\n「速く失敗しろ」\n\n俺のアプリ、機能100個試して70個ボツにした。\n\nガチャ実装→ 重い → 削除\n音声認識→ 精度ゴミ → 削除\n3D表示→ スマホで死ぬ → 削除\n\n1日試してダメなら捨てる。\n「磨く」じゃなく「捨てる」。\n\nこれが個人開発の真実。\n\n#個人開発',
        card: {
            type: 'app-promo',
            idiom: 'fail fast',
            idiomJa: '速く失敗しろ',
            headline: '機能100個試して70個ボツ',
            screenshotHint: '/english/training の現在の機能棚卸し画面 (タブやボタン群)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-009-users-dont-read',
        cardType: 'app-promo',
        text: 'users don\'t read という言葉がある。\n「ユーザーは読まない」\n\n俺のアプリ初期版、説明文だらけだった。\n妻に見せたら3秒でスクロールして閉じられた。\n\n中年向けアプリ作るなら:\n・文字50%削減\n・ボタン2倍\n・字1.5倍\n\n気づくのに3ヶ月かかった。\n8週間教材ではここを徹底的にやる。\n\niwasaki-naisou.com/english/app-build\n\n#UX',
        card: {
            type: 'app-promo',
            idiom: "users don't read",
            idiomJa: 'ユーザーは読まない',
            headline: '中年向けUIの3原則',
            screenshotHint: '/english/training のスマホ画面 (大ボタン、大文字、最小文章)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
    {
        id: 'app-promo-010-eat-own-cooking',
        cardType: 'app-promo',
        text: 'eat your own cooking という言葉がある。\n「自分の料理は自分で食え」\n\n英語アプリ毎朝30分自分で回す。\n「めんどい」と感じた瞬間に機能を直す。\n\n自作アプリの最強の特権、これ。\n「いつかの誰か」じゃなく「今の俺」のために作る。\n\nそれが scratch your own itch の本質。\n\n8週間で自作アプリ作る → iwasaki-naisou.com/english/app-build\n\n#自作AI',
        card: {
            type: 'app-promo',
            idiom: 'eat your own cooking',
            idiomJa: '自分の料理は自分で食え',
            headline: '「今の俺」のために作る、それが自作の特権',
            screenshotHint: '/english/training の朝の学習開始画面 (今日のXP=0からスタート)',
            cta: 'iwasaki-naisou.com/english/app-build',
        },
        status: 'draft',
        createdAt: '2026-05-26',
    },
];
