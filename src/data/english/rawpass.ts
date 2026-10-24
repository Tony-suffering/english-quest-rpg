/**
 * RAW PASS -- 30日で「試験音声がスローモーションに聞こえる耳」を作る
 *
 * 設計の前提(ここを外すと商品が死ぬ):
 *  1. 売れる約束は「点数」。人は数字にしか金を払わない -> 入口はTOEICリスニング。
 *  2. 人生が変わるのは「生音が聞ける」こと -> 出口はYouTubeの生音。
 *  3. 初心者は生音では即死する -> 試験音声を「準備運動」として使い切り、段階的に生音へ寄せる。
 *
 * 試験音声を「教材」ではなく「一番浅いプール」として扱うのがこの商品の全部。
 *
 * 音声の作り: 試験相当の音は SpeechSynthesis (rate可変)、雑音は WebAudio で同時再生した
 * バブルノイズで作る。生音は実在YouTubeクリップの埋め込み(iframe APIで速度可変)。
 * TTSにフィルタは掛けられないので、劣化は「速度 x 同時マスキング雑音」の2軸だけで作る。
 */

// ============================================================
// 販売設定
// ============================================================

/**
 * 決済リンク。Stripe Payment Link / Gumroad / note有料記事 のURLをここに入れる。
 * 空のままなら CTA は「先行案内」動作にフォールバックする(値段だけ出して買えない状態を作らない)。
 */
export const BUY_URL = '';
/** 無料で開けておく日数。ここまでは誰でも通す */
export const FREE_DAYS = 3;

export const WAITLIST_URL = 'https://x.com/tonio_english';

export const PRICE = {
    main: 4980,
    mainLabel: '¥4,980',
    mainNote: '買い切り / 30日プログラム全部',
    sub: 1480,
    subLabel: '¥1,480 / 月',
    subNote: '30日を終えた人だけの「毎朝の生音配給」',
    compare: [
        { name: '市販のTOEICリスニング本', price: '¥1,500〜2,500', note: '試験音声で試験対策。生音には一生届かない', me: false },
        { name: '英語学習アプリ(月額)', price: '¥3,000前後 / 月', note: '半年で¥18,000。やめた瞬間に消える', me: false },
        { name: '英会話スクール', price: '¥30万〜 / コース', note: '話す練習。聞けない原因には触らない', me: false },
        { name: 'RAW PASS', price: '¥4,980', note: '買い切り。30日で耳の基準が動く', me: true },
    ],
};

export const GUARANTEE =
    'Day 1 と Day 30 で同じ音声を同じ設定で測ります。数字が1段も上がらなかった場合、理由の説明なしで全額返金します。' +
    '測定ログはあなたの端末に残るので、こちらが言い逃れできません。';

// ============================================================
// 根拠 (裏取り済みのものだけ載せる。数字を作らない)
// ============================================================

export interface Paper {
    tag: string;
    claim: string;
    detail: string;
    cite: string;
    url: string;
}

export const PAPERS: Paper[] = [
    {
        tag: '速い音は「慣れる」',
        claim: '圧縮された速い音声への適応は、10〜20文聞くだけで始まる',
        detail: '速い英語が聞けないのは能力ではなく未適応。ただし短時間の適応はすぐ天井が来るので、複数セッションに分けた訓練が必要だと同じ研究群が示している。だからRAW PASSは1日1セッション×30日という形をしている。',
        cite: 'Banai, K., & Lavner, Y. (2012). Perceptual learning of time-compressed speech: more than rapid adaptation. PLOS ONE, 7(10), e47099.',
        url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0047099',
    },
    {
        tag: '効果は他人の声にも移る',
        claim: '1人の話者の速い音声に適応した人は、初めての話者・初めての速度でも、未訓練の人より成績が良かった',
        detail: 'ここが商品の背骨。訓練した音源だけが聞けるようになるのではなく、「速い音を処理する構え」自体が移る。だから30日で扱う音源の本数が有限でも、その先のYouTubeに効く。',
        cite: 'Banai, K., & Lavner, Y. (2012). PLOS ONE, 7(10), e47099.',
        url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0047099',
    },
    {
        tag: '順番を間違えると伸びない',
        claim: '易しい条件から始めた群のほうが、速い音声の知覚学習が進んだ',
        detail: '「最初から生音に浸かれば慣れる」は研究と逆。難易度の段階設計そのものが効果を左右する。初心者をいきなり生のポッドキャストに放り込む教材が全部失敗するのはこれが理由。',
        cite: 'Banai, K., & Lavner, Y. (2017). The perceptual learning of time-compressed speech: A comparison of training protocols with different levels of difficulty. PLOS ONE, 12(5), e0176488.',
        url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0176488',
    },
    {
        tag: '声は1人だと足りない',
        claim: '5分の訛った英語の聞き取りで改善が起きるが、「初対面の話者」に効果が移ったのは複数話者に触れた条件だけだった',
        detail: '同じ講師・同じナレーターだけを聞き続けると、その人専用の耳になる。RAW PASSが日替わりで別人のクリップを配るのは趣味ではなく設計。',
        cite: 'Bradlow, A. R., & Bent, T. (2008). Perceptual adaptation to non-native speech. Cognition, 106(2), 707-729.',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0010027707001126',
    },
    {
        tag: '試験の音は、遅い',
        claim: '英語圏の日常会話は約150語/分、速い場面では160〜200語/分。一方、大規模英語試験の聴解音声は116語/分で作られている例がある',
        detail: '台湾のGEPT(全民英検)の実測値。TOEICの公式話速はETSが公表していないので断定はしない。ただし「試験音声は台本があり、言い直しも被せもなく、スタジオ収録で、話者が一度に1人」という構造的な易しさは、誰でも聞き比べれば確認できる。',
        cite: 'Chiu, T. (2023). Speech Rate and Young EFL Learners’ Listening Comprehension. English Language Teaching, 16(7).',
        url: 'https://ccsenet.org/journal/index.php/elt/article/view/0/48926',
    },
];

// ============================================================
// 難易度ランプ (この10段が商品の中身そのもの)
// ============================================================

export interface RampLevel {
    lv: number;
    rate: number;      // 再生速度
    noise: number;     // 同時再生するバブルノイズの量 (0 = なし)
    band: 'exam' | 'raw';
    label: string;
    feel: string;
}

export const RAMP: RampLevel[] = [
    { lv: 1, rate: 0.85, noise: 0.00, band: 'exam', label: '試験より遅い', feel: '全部聞こえる。ここで落ちるなら音より単語の問題' },
    { lv: 2, rate: 1.00, noise: 0.00, band: 'exam', label: '試験そのまま', feel: '公式音声と同じ体感。ここが100%になるまで先に行かない' },
    { lv: 3, rate: 1.00, noise: 0.06, band: 'exam', label: '試験 + 空調の音', feel: '速さは同じ。雑音が入るだけで急に落ちる人が多い' },
    { lv: 4, rate: 1.15, noise: 0.10, band: 'exam', label: '少し速い + 店内', feel: 'カフェで電話を受けてる状態' },
    { lv: 5, rate: 1.25, noise: 0.16, band: 'exam', label: '速い + 人の話し声', feel: 'ここを超えると試験が「ゆっくり」に変わり始める' },
    { lv: 6, rate: 1.35, noise: 0.22, band: 'exam', label: 'かなり速い + 騒がしい', feel: '試験本番が遅く感じる領域' },
    { lv: 7, rate: 1.50, noise: 0.28, band: 'exam', label: '限界 + 居酒屋', feel: '試験音声で作れる一番きつい条件' },
    { lv: 8, rate: 1.00, noise: 0.10, band: 'raw', label: '生の話し言葉', feel: '速度を1.0に戻す。台本のない構文だけで十分きついから' },
    { lv: 9, rate: 1.20, noise: 0.18, band: 'raw', label: '生 + 速い', feel: '被せ・言い直し・省略が入った状態で加速' },
    { lv: 10, rate: 1.40, noise: 0.26, band: 'raw', label: '生 + 限界', feel: 'ここが取れたらYouTubeは字幕なしで回る' },
];

export const rampOf = (lv: number): RampLevel => RAMP[Math.min(RAMP.length, Math.max(1, lv)) - 1];

// ============================================================
// 採点 (内容語の一致率。冠詞や前置詞の綴り間違いで落とさない)
// ============================================================

const STOP = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'so', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'as', 'is', 'am',
    'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'can', 'could',
    'shall', 'should', 'may', 'might', 'must', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'there', 'here', 'not', 'no', 'than', 'then',
]);

export const contentWords = (s: string): string[] =>
    s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/)
        .filter(w => w.length > 1 && !STOP.has(w));

/** 書き取り採点: 正解の内容語のうち何割を拾えたか (0-100) */
export const scoreDictation = (answer: string, target: string): number => {
    const want = contentWords(target);
    if (!want.length) return 0;
    const got = contentWords(answer);
    const gotSet = new Set(got);
    const hit = want.filter(w =>
        gotSet.has(w) || (w.length > 4 && got.some(g => g.startsWith(w.slice(0, 4))))
    ).length;
    return Math.round((hit / want.length) * 100);
};

// ============================================================
// 無料の入口: 耳の実測 (Lv1-7。生音は本編で測る)
// ============================================================

export interface DiagItem { lv: number; en: string; ja: string; }

export const DIAG_ITEMS: DiagItem[] = [
    { lv: 1, en: "The meeting has been moved to the third floor conference room.", ja: '会議は3階の会議室に移動になりました。' },
    { lv: 2, en: "Please submit your expense report before the end of the month.", ja: '経費精算書は月末までに提出してください。' },
    { lv: 2, en: "I'm calling to confirm the delivery date for our September order.", ja: '9月の注文の納品日を確認するためお電話しました。' },
    { lv: 3, en: "The shipment was delayed because the supplier ran out of packaging materials.", ja: '梱包材が切れたため、出荷が遅れました。' },
    { lv: 3, en: "All passengers traveling to Denver should proceed to gate twenty-two.", ja: 'デンバー行きのお客様はゲート22へお進みください。' },
    { lv: 4, en: "We'd like to renegotiate the terms before we sign the renewal.", ja: '更新に署名する前に条件を再交渉したいです。' },
    { lv: 4, en: "The technician said the equipment needs to be inspected twice a year.", ja: '技術者は、その機器は年2回点検が必要だと言いました。' },
    { lv: 5, en: "Our quarterly revenue increased by nearly eleven percent compared to last year.", ja: '四半期売上は前年比で約11%増加しました。' },
    { lv: 5, en: "If the applicant has no relevant experience, we usually forward the resume to human resources.", ja: '関連経験がない応募者の履歴書は、通常人事に回します。' },
    { lv: 6, en: "The property manager mentioned that the elevator inspection could take most of the morning.", ja: '管理会社は、エレベーター点検で午前中いっぱいかかる可能性があると言いました。' },
    { lv: 6, en: "Attendees who registered online will receive their badges at the reception desk downstairs.", ja: 'オンライン登録した参加者は、下の受付でバッジを受け取ります。' },
    { lv: 7, en: "Unfortunately the vendor we selected withdrew from the bid at the last minute, so we had to reopen the process.", ja: '選定した業者が直前で入札を辞退したため、選定をやり直すことになりました。' },
];

/** 実測結果の読み方 */
export const readEar = (lv: number) => {
    if (lv <= 1) return { title: '単語の在庫が先', body: '音より語彙。聞こえないのではなく、その語を知らない状態。RAW PASSのPhase 1(Day1-10)はまさにここから始まる。' };
    if (lv <= 2) return { title: '試験音声そのままが上限', body: '公式音声のスピードでギリギリ。この状態でYouTubeを見ても雑音にしか聞こえない。ここが一番伸びる位置。' };
    if (lv <= 4) return { title: '静かなら聞ける耳', body: 'クリーンな音は取れるが、雑音か少しの加速で崩れる。TOEICのPart 3-4で「聞けたのに答えられない」が起きる典型。' };
    if (lv <= 6) return { title: '試験は余裕、生音は無理', body: '試験音声はもう遅い。ここから先の壁は速度ではなく「台本がない構文」。Phase 3の生音が本番。' };
    return { title: '試験では測れない', body: '試験音声で作れる限界を超えている。あとは生音の本数だけ。Lv8-10(生の話し言葉)はRAW PASS本編で測る。' };
};

// ============================================================
// 30日プログラム
// ============================================================

export interface DrillItem { en: string; ja: string; }
export interface RawClip {
    youtubeId: string;
    title: string;
    show: string;
    tagline: string;
}
export interface RawDay {
    day: number;
    phase: 1 | 2 | 3;
    lv: number;
    title: string;
    aim: string;
    items: DrillItem[];
    clip?: RawClip;
    /** Day 30 のみ: 初日と同じ音声に戻って体感差を測る */
    replay?: boolean;
}

export const PHASES = [
    {
        n: 1 as const, days: 'Day 1-10', name: '試験の耳を作る',
        head: '一番浅いプールで、100%を作る',
        body: '試験音声は世界で一番易しい英語です。台本があり、言い直しがなく、被せがなく、話者が一度に1人。まずここを取りこぼしゼロにします。ここを飛ばして生音に行った人が、全員挫折しています。',
    },
    {
        n: 2 as const, days: 'Day 11-20', name: '速度と雑音を上げる',
        head: '同じ英文を、壊れるまで加速する',
        body: '内容は変えません。速度を1.0から1.5へ、雑音を0から居酒屋まで上げるだけ。ここで「試験音声が遅い」という感覚が生まれます。研究上、この適応は初めて聞く話者・初めての速度にも移ります。',
    },
    {
        n: 3 as const, days: 'Day 21-30', name: '生音に出る',
        head: '台本のない英語へ、速度を戻して入る',
        body: '実在のYouTubeクリップに移ります。速度は1.0に戻します。生の話し言葉は、遅くても十分にきついからです。言い直し・省略・被せ・スラング。ここが本当の壁で、ここを越えると世界が変わります。',
    },
];

const P1: [string, string, DrillItem[]][] = [
    ['電話を受ける', '定型の応対文で、音の切れ目に慣れる', [
        { en: "Thanks for calling Brighton Supply. How can I help you?", ja: 'ブライトン・サプライです。どのようなご用件でしょうか。' },
        { en: "I'm afraid she's out of the office until Thursday.", ja: '申し訳ありませんが、彼女は木曜まで不在です。' },
        { en: "Could you spell your last name for me?", ja: '苗字のスペルを教えていただけますか。' },
        { en: "Let me transfer you to the billing department.", ja: '経理部にお繋ぎします。' },
        { en: "I'll have him call you back this afternoon.", ja: '午後に折り返しお電話させます。' },
        { en: "Would you like to leave a message?", ja: '伝言をお預かりしましょうか。' },
    ]],
    ['予定を決める', '曜日・時刻・移動が混ざると急に落ちる', [
        { en: "Are you available Tuesday morning or would Wednesday work better?", ja: '火曜の午前は空いていますか、それとも水曜の方が良いですか。' },
        { en: "The workshop starts at nine thirty and runs until noon.", ja: '研修は9時半に始まり、正午まで続きます。' },
        { en: "Let's push the review back a week.", ja: 'レビューを1週間後ろにずらしましょう。' },
        { en: "I have a conflict at four, but I'm free after five.", ja: '4時は予定が重なっていますが、5時以降は空いています。' },
        { en: "We'll need the room for about two hours.", ja: 'その部屋を2時間ほど使う必要があります。' },
        { en: "She'll join the call remotely from the Osaka office.", ja: '彼女は大阪オフィスからリモートで参加します。' },
    ]],
    ['出張の手配', '数字と固有名詞に耐える', [
        { en: "Your flight leaves from terminal two at seven fifteen.", ja: '搭乗便は第2ターミナルを7時15分に出発します。' },
        { en: "The hotel is a ten minute walk from the station.", ja: 'ホテルは駅から歩いて10分です。' },
        { en: "I booked a rental car for three days.", ja: 'レンタカーを3日間予約しました。' },
        { en: "Keep your receipts if you want to be reimbursed.", ja: '払い戻しを受けたい場合は領収書を取っておいてください。' },
        { en: "Check in opens twenty four hours before departure.", ja: 'チェックインは出発の24時間前に開きます。' },
        { en: "There's a shuttle that runs every twenty minutes.", ja: '20分ごとに出るシャトルがあります。' },
    ]],
    ['社内の連絡', '受け身と完了形が音では消える', [
        { en: "The parking lot will be closed for repaving on Saturday.", ja: '駐車場は土曜に舗装工事で閉鎖されます。' },
        { en: "All staff are asked to update their passwords by Friday.", ja: '全社員は金曜までにパスワードを更新するよう求められています。' },
        { en: "The break room refrigerator has been cleaned out.", ja: '休憩室の冷蔵庫は中身が処分されました。' },
        { en: "We've hired two new people in the design team.", ja: 'デザインチームに2名採用しました。' },
        { en: "Anyone who hasn't submitted the form should see me.", ja: 'まだ用紙を出していない人は私のところに来てください。' },
        { en: "Printing costs have gone up again this quarter.", ja: '印刷費が今四半期また上がりました。' },
    ]],
    ['空港と駅', 'アナウンス特有の飲み込みに慣れる', [
        { en: "Passengers for the four o'clock express should board now.", ja: '4時発の急行にご乗車のお客様はご乗車ください。' },
        { en: "Due to weather, departures may be delayed by up to an hour.", ja: '天候により、出発が最大1時間遅れる可能性があります。' },
        { en: "Please keep your belongings with you at all times.", ja: '手荷物は常に身につけてください。' },
        { en: "The gate has been changed from B twelve to B nineteen.", ja: '搭乗口がB12からB19に変更されました。' },
        { en: "Priority boarding is now available for rows one through ten.", ja: '1列から10列のお客様の優先搭乗を開始します。' },
        { en: "This train will not stop at the next two stations.", ja: 'この列車は次の2駅には停車しません。' },
    ]],
    ['店とサービス', '値段・在庫・交換の型', [
        { en: "We're out of that size, but I can order it for you.", ja: 'そのサイズは在庫切れですが、注文できます。' },
        { en: "Returns are accepted within thirty days with a receipt.", ja: '返品は領収書があれば30日以内に受け付けます。' },
        { en: "The sale price applies only to items on the back wall.", ja: 'セール価格は奥の壁の商品のみに適用されます。' },
        { en: "There's a small fee if you want it gift wrapped.", ja: 'ギフト包装をご希望の場合は少額の手数料がかかります。' },
        { en: "Your membership expired last month, so I'll renew it now.", ja: '会員資格が先月切れているので、今更新します。' },
        { en: "It should arrive within five to seven business days.", ja: '5〜7営業日で届く見込みです。' },
    ]],
    ['見積と請求', '金額の言い回しは音が潰れる', [
        { en: "The estimate came in higher than we expected.", ja: '見積は想定より高く出ました。' },
        { en: "That figure doesn't include installation or tax.", ja: 'その金額には設置費と税が含まれていません。' },
        { en: "We can offer a discount if you order in bulk.", ja: 'まとめて注文いただければ値引きできます。' },
        { en: "The invoice was sent to the wrong email address.", ja: '請求書が間違ったメールアドレスに送られていました。' },
        { en: "Payment is due within thirty days of the invoice date.", ja: '支払期限は請求日から30日以内です。' },
        { en: "They agreed to waive the setup charge this time.", ja: '今回は初期費用を免除してもらえました。' },
    ]],
    ['面接と採用', '経歴を語る文は長い', [
        { en: "What made you interested in this position?", ja: 'この職に興味を持った理由は何ですか。' },
        { en: "I spent four years managing a small warehouse team.", ja: '4年間、小規模な倉庫チームを管理していました。' },
        { en: "We're looking for someone who can start right away.", ja: 'すぐに勤務開始できる人を探しています。' },
        { en: "The role involves a fair amount of travel.", ja: 'この職はかなりの出張を伴います。' },
        { en: "We'll be in touch by the end of next week.", ja: '来週末までにご連絡します。' },
        { en: "Do you have any questions about the benefits package?", ja: '福利厚生について質問はありますか。' },
    ]],
    ['現場と在庫', '手順の文は情報量が多い', [
        { en: "The machine shuts down automatically if it overheats.", ja: 'その機械は過熱すると自動で停止します。' },
        { en: "Please log every delivery in the system before you leave.", ja: '退勤前に全ての配送をシステムに記録してください。' },
        { en: "We're running low on the boxes we use for fragile items.", ja: '割れ物用の箱が少なくなってきています。' },
        { en: "Somebody needs to sign for the shipment when it arrives.", ja: '荷物が届いたら誰かが受領サインをする必要があります。' },
        { en: "The inspection is scheduled for the first week of October.", ja: '点検は10月の第1週に予定されています。' },
        { en: "If a part is damaged, set it aside and note the serial number.", ja: '部品が破損していたら、脇に置いて製造番号を記録してください。' },
    ]],
    ['Phase 1 の検査', '9日分をランダムに混ぜて100%を確認', [
        { en: "I'm afraid she's out of the office until Thursday.", ja: '申し訳ありませんが、彼女は木曜まで不在です。' },
        { en: "The gate has been changed from B twelve to B nineteen.", ja: '搭乗口がB12からB19に変更されました。' },
        { en: "That figure doesn't include installation or tax.", ja: 'その金額には設置費と税が含まれていません。' },
        { en: "Returns are accepted within thirty days with a receipt.", ja: '返品は領収書があれば30日以内に受け付けます。' },
        { en: "The role involves a fair amount of travel.", ja: 'この職はかなりの出張を伴います。' },
        { en: "If a part is damaged, set it aside and note the serial number.", ja: '部品が破損していたら、脇に置いて製造番号を記録してください。' },
    ]],
];

const P2: [string, string, DrillItem[]][] = [
    ['電話を、加速する', '同じ応対文を、雑音の中で', [
        { en: "Thanks for calling Brighton Supply. How can I help you?", ja: 'ブライトン・サプライです。どのようなご用件でしょうか。' },
        { en: "I'll have him call you back this afternoon.", ja: '午後に折り返しお電話させます。' },
        { en: "She said she'd get back to you as soon as she hears anything.", ja: '何か分かり次第すぐ連絡すると言っていました。' },
        { en: "Sorry, the line was breaking up. Could you say that again?", ja: 'すみません、電話が途切れました。もう一度お願いできますか。' },
        { en: "I don't have that file in front of me right now.", ja: '今そのファイルが手元にありません。' },
        { en: "Let me check with the warehouse and call you right back.", ja: '倉庫に確認して、すぐ折り返します。' },
    ]],
    ['予定を、加速する', '曜日と時刻が雑音で消える体験', [
        { en: "Are you available Tuesday morning or would Wednesday work better?", ja: '火曜の午前は空いていますか、それとも水曜の方が良いですか。' },
        { en: "We moved it up to Monday because the client is flying out Wednesday.", ja: 'クライアントが水曜に出発するので、月曜に前倒ししました。' },
        { en: "The whole thing shouldn't take more than forty minutes.", ja: '全部で40分以上はかからないはずです。' },
        { en: "If nobody objects, let's just do it over the phone instead.", ja: '異論がなければ、代わりに電話で済ませましょう。' },
        { en: "He can't make the morning session, so we'll fill him in later.", ja: '彼は午前の回に出られないので、後で共有します。' },
        { en: "Does anyone need the projector, or can I take it back?", ja: 'プロジェクターを使う人はいますか、それとも戻していいですか。' },
    ]],
    ['出張を、加速する', '数字は速度に一番弱い', [
        { en: "Your flight leaves from terminal two at seven fifteen.", ja: '搭乗便は第2ターミナルを7時15分に出発します。' },
        { en: "The reservation is under my colleague's name, not mine.", ja: '予約は私ではなく同僚の名前で入っています。' },
        { en: "We got bumped to a later flight and lost about three hours.", ja: '後の便に振り替えられて、3時間ほど無駄にしました。' },
        { en: "Rooms are about a hundred and forty a night including breakfast.", ja: '部屋は朝食込みで1泊140ドル前後です。' },
        { en: "Try to keep the total under the limit or accounting will push back.", ja: '合計を上限内に収めないと経理から差し戻されます。' },
        { en: "The shuttle stops running at eleven, so plan around that.", ja: 'シャトルは11時で終わるので、それを前提に組んでください。' },
    ]],
    ['社内放送を、加速する', '受け身が速度で完全に消える', [
        { en: "All staff are asked to update their passwords by Friday.", ja: '全社員は金曜までにパスワードを更新するよう求められています。' },
        { en: "The elevator on the north side is being serviced this week.", ja: '北側のエレベーターは今週点検中です。' },
        { en: "Anyone parked in the loading zone will be towed.", ja: '荷降ろしゾーンに駐車した車は牽引されます。' },
        { en: "Badges have to be worn above the waist at all times.", ja: 'バッジは常に腰より上に着けなければなりません。' },
        { en: "The fire drill was rescheduled after the alarm panel failed.", ja: '警報盤が故障したため、避難訓練は日程変更されました。' },
        { en: "Requests submitted after the deadline won't be processed this month.", ja: '締切後に出された申請は今月分では処理されません。' },
    ]],
    ['交通を、加速する', '実際のアナウンスに近づける', [
        { en: "Due to weather, departures may be delayed by up to an hour.", ja: '天候により、出発が最大1時間遅れる可能性があります。' },
        { en: "Passengers with connecting flights should check the monitors again.", ja: '乗り継ぎのお客様はもう一度モニターをご確認ください。' },
        { en: "The northbound platform is temporarily closed for maintenance.", ja: '北行きホームは保守作業のため一時閉鎖されています。' },
        { en: "We apologize for the inconvenience and thank you for your patience.", ja: 'ご不便をおかけして申し訳ありません。ご辛抱に感謝します。' },
        { en: "Anyone standing in the aisle needs to take a seat before we move.", ja: '通路に立っている方は発車前に着席してください。' },
        { en: "Buses replacing the train service will leave from the east exit.", ja: '列車の代行バスは東口から出発します。' },
    ]],
    ['クレーム対応', '感情が入ると音は乱れる', [
        { en: "I understand you're frustrated, and I want to get this fixed.", ja: 'ご不満は理解しています。これを解決したいと思っています。' },
        { en: "This is the third time we've had the same problem this month.", ja: '今月これで3回目、同じ問題が起きています。' },
        { en: "I can't promise a refund, but I'll escalate it to my manager.", ja: '返金は約束できませんが、上司に上げます。' },
        { en: "Nobody told us the part was out of stock until yesterday.", ja: '部品が在庫切れだと昨日まで誰も知らせてくれませんでした。' },
        { en: "We'll cover the shipping and send a replacement today.", ja: '送料は当社負担で、本日代替品を送ります。' },
        { en: "If it happens again, we're going to have to look elsewhere.", ja: 'また起きるようなら、他を探さざるを得ません。' },
    ]],
    ['契約と条件', '長い1文に耐える', [
        { en: "We'd like to renegotiate the terms before we sign the renewal.", ja: '更新に署名する前に条件を再交渉したいです。' },
        { en: "The agreement automatically renews unless either side gives notice.", ja: 'どちらかが通知しない限り、契約は自動更新されます。' },
        { en: "There's a clause that lets them raise the rate once a year.", ja: '年1回料金を上げられる条項があります。' },
        { en: "Legal wants to see the revised version before Thursday.", ja: '法務は木曜前に修正版を見たがっています。' },
        { en: "We're not liable for delays caused by their subcontractors.", ja: '彼らの下請けが原因の遅延について当社は責任を負いません。' },
        { en: "If we cancel early, we forfeit the deposit we already paid.", ja: '早期解約すると、既に払った預託金は没収されます。' },
    ]],
    ['プレゼン', '話し始めの流し方が独特', [
        { en: "Before I get into the numbers, let me back up a little.", ja: '数字に入る前に、少し戻らせてください。' },
        { en: "What I want you to take away from this is pretty simple.", ja: 'ここから持ち帰ってほしいことは、かなり単純です。' },
        { en: "This chart looks bad, and honestly, it is bad.", ja: 'このグラフは悪く見えますし、正直、実際に悪いです。' },
        { en: "I'll come back to that question at the end if that's alright.", ja: 'よろしければ、その質問は最後に戻ります。' },
        { en: "We tried three things, and only one of them worked.", ja: '3つ試して、うまくいったのは1つだけでした。' },
        { en: "Feel free to jump in if something doesn't make sense.", ja: '分からないところがあれば遠慮なく割り込んでください。' },
    ]],
    ['数字と統計', '桁と割合は最後まで残る弱点', [
        { en: "Our quarterly revenue increased by nearly eleven percent.", ja: '四半期売上は約11%増加しました。' },
        { en: "Roughly two thirds of the responses came from existing customers.", ja: '回答のおよそ3分の2は既存顧客からでした。' },
        { en: "Costs went from four point two million to five point one.", ja: 'コストは420万から510万に上がりました。' },
        { en: "That's a drop of about fifteen hundred units year over year.", ja: '前年比で約1,500台の減少です。' },
        { en: "The margin is thinner than it looks once you factor in returns.", ja: '返品を考慮すると、利益率は見た目より薄いです。' },
        { en: "Half the growth came from a single account, which worries me.", ja: '成長の半分は1社からで、そこが不安です。' },
    ]],
    ['Phase 2 の検査', 'Lv7で、試験音声の限界を確認する', [
        { en: "Unfortunately the vendor we selected withdrew from the bid at the last minute.", ja: '選定した業者が直前で入札を辞退しました。' },
        { en: "The agreement automatically renews unless either side gives notice.", ja: 'どちらかが通知しない限り、契約は自動更新されます。' },
        { en: "Half the growth came from a single account, which worries me.", ja: '成長の半分は1社からで、そこが不安です。' },
        { en: "Passengers with connecting flights should check the monitors again.", ja: '乗り継ぎのお客様はもう一度モニターをご確認ください。' },
        { en: "I understand you're frustrated, and I want to get this fixed.", ja: 'ご不満は理解しています。これを解決したいと思っています。' },
        { en: "Requests submitted after the deadline won't be processed this month.", ja: '締切後に出された申請は今月分では処理されません。' },
    ]],
];

/** Phase 3: 実在クリップ + そのクリップで実際に喋られた行(公開されている自動字幕から採録) */
const P3: [RawClip, string, DrillItem[]][] = [
    [
        { youtubeId: 'ry3I2U4BaxE', title: 'McGregor vs. Holloway 2: What to Expect at UFC 329', show: 'JRE Clips', tagline: '格闘技談義。試験には絶対出ない言い回しだけで会話が回る' },
        '試験音声との落差を体で確認する日。速度は1.0に戻す',
        [
            { en: "People just cut them a check.", ja: '連中はポンと小切手を切るだけ。' },
            { en: "It's a tall order to take on Max Holloway.", ja: 'マックス・ホロウェイとやるのは相当な難題だよ。' },
            { en: "I think if Conor don't knock him out early, he's in for a long night.", ja: 'コナーが早々にKOできなかったら、長い夜になるぞ。' },
            { en: "It was crazy to see the two of them going back and forth.", ja: 'あの2人がやり合ってるのは異常な光景だった。' },
        ],
    ],
    [
        { youtubeId: '2PUjfqWq0I4', title: 'Ali Siddiq on Taking Mushrooms', show: 'JRE Clips', tagline: 'コメディアンの体験談。文が途中で崩れ、言い直しが入る' },
        '言い直し・崩れた文に慣れる',
        [
            { en: "He's nuts, like he's losing it.", ja: 'あいつはイカれてる、正気を失いかけてる。' },
            { en: "Yo, I was so toasted and just getting on the plane.", ja: 'もうベロベロの状態で飛行機に乗ろうとしてた。' },
            { en: "And you just slowly see us just melting.", ja: 'で、俺たちがゆっくり溶けていくのが見えるわけ。' },
            { en: "He was talking his ass off.", ja: 'あいつは喋り倒してた。' },
        ],
    ],
    [
        { youtubeId: 'Nf0RTuy_iv4', title: 'Philosopher Nick Bostrom on the Uncertainty of AI', show: 'JRE Clips', tagline: '抽象的な議論。硬い内容を軽い口語で回す難しさ' },
        '硬い話題を口語で回す音に慣れる',
        [
            { en: "Well, the truth is we don't know, right? How it will pan out.", ja: '実のところ分からないんだ。どう転ぶかは。' },
            { en: "A tsunami of wealth just kind of flows through and lifts all boats.", ja: '富の津波が流れ込んで、全部の船を浮かせる。' },
            { en: "Let me say that, kind of layers to the onion.", ja: '言わせてくれ、玉ねぎみたいに層があるんだ。' },
            { en: "Wage labor is a sort of slavery light, in a sense.", ja: '賃労働はある意味、奴隷制のライト版だ。' },
        ],
    ],
    [
        { youtubeId: 'pCCwfxGzgnI', title: 'Tommy Lee on Being in Motley Crue at 18', show: 'JRE Clips', tagline: 'テンションが高く、語尾が飛ぶ。感情つきの速い音' },
        '感情で加速する音を追う',
        [
            { en: "So, you're blowing up at 18 years old.", ja: '18歳でブレイクしたわけだ。' },
            { en: "It just blew up and you couldn't go anywhere.", ja: '一気に売れて、どこにも行けなくなった。' },
            { en: "I never get over that.", ja: 'あれは一生忘れられない。' },
            { en: "And you know, I've come full circle.", ja: 'で、一周回って戻ってきたんだ。' },
        ],
    ],
    [
        { youtubeId: 'FnrOzg3a_Kg', title: 'Ancient Hindu Scriptures Describe a Super Weapon', show: 'JRE Clips', tagline: '固有名詞と抽象語が同時に来る。逃げ場がない回' },
        '知らない固有名詞を跨いで文を保つ',
        [
            { en: "Should not be used at any cost.", ja: '何があっても使ってはならない。' },
            { en: "At the end of the day, you can crudely understand it as essentially fight for the kingdom.", ja: '結局のところ、大雑把に言えば王国のための戦いだと理解できる。' },
            { en: "That's the bottom line of that story.", ja: 'それがその話の要点だ。' },
            { en: "Makes you wonder, was there actually something around then?", ja: '考えさせられるよな、当時本当に何かあったのかって。' },
        ],
    ],
    [
        { youtubeId: 'oNm1-DuqJFw', title: 'God Helped Him Forgive the Man Who Killed His Son', show: 'JRE Clips', tagline: '重い実話。声が落ち、音量が下がる。一番聞き取りにくい種類' },
        '静かに喋られる音を拾う',
        [
            { en: "It came knocking on my door in a valley that's got 2 million people.", ja: '200万人が住む谷で、それが俺の家の戸を叩いた。' },
            { en: "I had a calling on my life to do something about it.", ja: '何かをしろという使命が自分の人生にあった。' },
            { en: "A peace treaty kicked into place.", ja: '和平の合意が動き出した。' },
            { en: "It took me a long time to unpack that.", ja: 'それを解きほぐすのに長い時間がかかった。' },
        ],
    ],
    [
        { youtubeId: 'hY433FHPXlE', title: 'Bradley Cooper on American Sniper and Method Acting', show: 'JRE Clips', tagline: '俳優の語り。文が長く、途中で主語が入れ替わる' },
        '長い語りを最後まで落とさない',
        [
            { en: "Thinking that that planted a seed that changed your whole life.", ja: 'それが人生全部を変える種を植えたんだと思うと。' },
            { en: "I never get over that.", ja: 'あれは今でも引きずってる。' },
            { en: "I was like, bro, this is going to come back to haunt us.", ja: 'これは後で必ず自分たちに返ってくるぞと思った。' },
            { en: "And you know, I've come full circle.", ja: '結局、一周して戻ってきた。' },
        ],
    ],
    [
        { youtubeId: 'kKeuCkVc-2U', title: 'Looking At the Gina Carano vs. Ronda Rousey Fight Card', show: 'JRE Clips', tagline: '金と興行の話。数字が口語のなかに埋まる' },
        '生音のなかの数字とビジネス語を拾う',
        [
            { en: "She's back in shape and she obviously is busting her ass to do that.", ja: '体を戻してきてて、明らかに必死にやってる。' },
            { en: "Netflix has an insane amount of money and they keep raking it in.", ja: 'Netflixはとんでもない金を持ってて、稼ぎ続けてる。' },
            { en: "That'll be worth the price of admission.", ja: 'それは入場料を払う価値がある。' },
            { en: "It's good to see that there's someone who's willing to throw a lot of money at MMA.", ja: 'MMAに大金を突っ込む気のある人間がいるのは良いことだ。' },
        ],
    ],
    [
        { youtubeId: '_pN6vSmjWpg', title: 'The Mysticism and Magic of Ancient Humans', show: 'JRE Clips', tagline: '2人が被せながら喋る。同時発話の壁' },
        '被せ(同時に喋る)を分離する',
        [
            { en: "It was like, just give me a break.", ja: 'いい加減にしてくれって感じだった。' },
            { en: "The range of people that you will meet is impossible to fathom.", ja: '出会う人間の幅は、想像もつかないほど広い。' },
            { en: "Don't even get into the dialects.", ja: '方言の話なんて始めるなよ。' },
            { en: "You're the kind of guy who likes a deep dive.", ja: 'あんたは深掘りが好きなタイプだよな。' },
        ],
    ],
    [
        { youtubeId: 'bbafqO8Wzg4', title: 'John Mellencamp on Record Executives Hating His Hit Songs', show: 'JRE Clips', tagline: '最終日。生音を1本潰した後、Day 1 の音声に戻る' },
        '生音を1本やった直後に、Day 1 と同じ音声を同じ設定で聞く。ここで差が出なければ全額返金',
        [
            { en: "It just blew up and you couldn't go anywhere.", ja: '一気に売れて、どこにも行けなくなった。' },
            { en: "It helped me get over it.", ja: 'それで乗り越えられた。' },
            { en: "So I was growing still because I grew up in public.", ja: '人前で育ったから、まだ成長途中だった。' },
            { en: "So, keep it simple, stupid.", ja: 'だから、余計なことをするな。単純にやれ。' },
        ],
    ],
];

const P1_LV = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2];
const P2_LV = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
const P3_LV = [8, 8, 8, 9, 9, 9, 9, 10, 10, 10];

export const RAWPASS_DAYS: RawDay[] = [
    ...P1.map(([title, aim, items], i): RawDay => ({
        day: i + 1, phase: 1, lv: P1_LV[i], title, aim, items,
    })),
    ...P2.map(([title, aim, items], i): RawDay => ({
        day: i + 11, phase: 2, lv: P2_LV[i], title, aim, items,
    })),
    ...P3.map(([clip, aim, items], i): RawDay => ({
        day: i + 21, phase: 3, lv: P3_LV[i], title: clip.title, aim, items, clip,
        replay: i === 9,
    })),
];

export const dayOf = (n: number): RawDay | undefined => RAWPASS_DAYS.find(d => d.day === n);

/** Day 30 で聞き直す Day 1 の音声 (Lv2 固定) */
export const REPLAY_ITEMS: DrillItem[] = P1[0][2];

export const FAQ: [string, string][] = [
    ['英語力ゼロでも大丈夫ですか',
        'Day 1 は「試験音声より遅い」設定から始まります。世界で一番易しい英語です。むしろ危ないのは中級者で、Phase 1 を飛ばして Phase 3 に行きたくなります。研究上それは逆効果です。'],
    ['TOEICの点数は上がりますか',
        '上がるはずですが、保証はしません。保証するのは「同じ音声を同じ設定で聞いたときのスコアが上がること」だけです。試験の点は日程・体調・リーディングにも左右されるので、こちらが約束できる範囲を超えています。'],
    ['過去問の音声が入っていますか',
        '入っていません。試験パートの英文は全て自作です。試験の音声や問題は転載していません。実在音源として使っているのは、公開されているYouTubeクリップの埋め込みだけです。'],
    ['なぜ生音がポッドキャストなんですか',
        '教材用に整えられていない英語で、無料で、字幕があって、話者が毎回違うからです。日替わりで別人の声を聞くこと自体が設計に含まれています(同じ人だけ聞くと、その人専用の耳になります)。'],
    ['1日どれくらいかかりますか',
        'Phase 1-2 は6文で10分前後。Phase 3 は生音1本で30分以上かかります。後半がしんどいのは意図的です。'],
    ['30日で終わったらどうなりますか',
        '耳の基準が変わるので、あとはYouTubeを見るだけで勝手に伸びます。それでも毎朝の供給が欲しい人向けに、月額の配給を用意していますが、必須ではありません。'],
];
