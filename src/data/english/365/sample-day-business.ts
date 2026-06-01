/**
 * PROOF DAY — 「仕事の電話が鳴り止まない夜」 (Work calls that won't stop)
 * ============================================================================
 * 300例文プロダクトの「レシピ」実証バッチ。docs/izakaya-300-master-plan.md 参照。
 *
 * この10個は1つの連続シーン:
 *   金曜の夜、ユキ(商社営業)の携帯が鳴り止まない。クライアントが納期を前倒ししろと。
 *   居酒屋の常連たちが「その英語、こう言え」と寄ってたかって help する。
 *   マスター(元TOEIC講師)が要所で核心を刺す。タケシは1個盛大に間違える。
 *
 * DUOとの差(なぜ価値があるか):
 *   - 全部「実際に職場で言う」高頻度チャンク。かつ TOEIC Part3/4・英検2級の頻出。
 *   - 4レジスター: Core(試験で○) / Vibe(リアル口語) / Scene(その場の一言) / Back(相手の返し)
 *   - context = 日本語↔英語のズレを刺す注釈 (DUOに無い)
 *   - キャラが連続劇で喋る = 「誰が・なぜ」で記憶に残る
 *   - exam タグはユキの口癖「それ、テストに出るやつ？」で笑いとして届ける
 *   - youglish = 実ネイティブ音声を大量に (TTS棒読みではない)
 *
 * 既存 MASTER_EXPRESSIONS には未マージ (壊さないため)。レシピ承認後に Day 化して投入。
 */
import type { MasterExpression } from './master-expressions';

export const SAMPLE_WORK_DAY: MasterExpression[] = [
    {
        daySlot: 1, japanese: 'すみません、ちょっとこの電話出ないと',
        english: [
            'Excuse me, I have to take this call.',
            'Sorry — gotta take this real quick.',
            'Sorry guys, it is the client. Give me one sec.',
            'Go ahead, go ahead. We are not going anywhere.',
        ],
        jaTranslations: [
            'すみません、この電話に出ないといけません。',
            'ごめん、ちょっとだけこれ出るわ。',
            'ごめんみんな、クライアントだ。ちょっとだけ。',
            'どうぞどうぞ。俺らどこも行かないから。',
        ],
        context: '日本語は「出ないと（いけない）」と言い切らないのが普通。英語は have to take this と理由をハッキリ言う。take a call=電話に出る。answer the phone より自然で、ビジネスでは take this が定番。電話を「取る」の take。',
        character: 'yuki', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 2', eiken: '準2級' },
        youglish: 'I have to take this',
    },
    {
        daySlot: 1, japanese: 'すぐかけ直してもいいですか？',
        english: [
            'Can I call you back?',
            'Can I call you right back?',
            'I am in the middle of something — can I call you back in five?',
            'Sure, no rush. Whenever works.',
        ],
        jaTranslations: [
            'かけ直してもいいですか？',
            'すぐかけ直してもいい？',
            '今ちょっと立て込んでて -- 5分後にかけ直してもいい？',
            'もちろん、急がないよ。いつでも大丈夫。',
        ],
        context: 'call back = かけ直す。right back で「すぐに」。日本語の「すぐ」を soon と訳しがちだが、電話では right back が自然。in five = in five minutes(5分後)。ネイティブは minutes を省く。',
        character: 'yuki', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 3', eiken: '準2級' },
        youglish: 'can I call you right back',
    },
    {
        daySlot: 1, japanese: 'その件、追って連絡します',
        english: [
            'I will let you know later.',
            'Let me get back to you on that.',
            'I do not have an answer right now — can I get back to you on that?',
            'Of course. Take your time.',
        ],
        jaTranslations: [
            '後でお知らせします。',
            'その件、追って連絡します。',
            '今すぐは答えられなくて -- 追って連絡してもいい？',
            'もちろん。ゆっくりで大丈夫。',
        ],
        context: '「追って連絡します」= get back to you。日本語の「追って」の曖昧な保留感をそのまま英語にできる魔法のフレーズ。TOEIC Part3の電話・会議で死ぬほど出る。I will tell you later より圧倒的にビジネス的。',
        character: 'yuki', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 3 頻出', eiken: '2級' },
        youglish: 'get back to you on that',
    },
    {
        daySlot: 1, japanese: '上司に確認してみます',
        english: [
            'I will ask my boss.',
            'Let me check with my boss.',
            'I cannot promise anything yet — let me run it by my boss.',
            'Fair enough. Just keep me posted.',
        ],
        jaTranslations: [
            '上司に聞いてみます。',
            '上司に確認してみます。',
            'まだ約束はできないので -- 上司に通してみます。',
            'なるほど。進展あったら教えてね。',
        ],
        context: 'run it by someone = （判断を仰ぐため）人に通す・相談する。ask より「決裁を仰ぐ」ニュアンスで、これぞ日本の稟議文化の英語版。keep me posted = 随時報告して。ビジネスメールの締めでも頻出。',
        character: 'yuki', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 3', eiken: '2級' },
        youglish: 'run it by my boss',
    },
    {
        daySlot: 1, japanese: 'それで大丈夫です（その時間でOK）',
        english: [
            'That is fine.',
            'That works for me.',
            'Monday at ten? Yeah, that works for me.',
            'Great, I will send a calendar invite.',
        ],
        jaTranslations: [
            'それで結構です。',
            'それで大丈夫です。',
            '月曜10時？うん、それで大丈夫。',
            'では、カレンダーの招待を送りますね。',
        ],
        context: '日程調整の「それで大丈夫」= That works for me。OK や fine でも通じるが、works は「（予定が）成立する・回る」感があって最もビジネス的。TOEICの日程変更問題はこの一言の聞き取り勝負。',
        character: 'lisa', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 3 頻出', eiken: '準2級' },
        youglish: 'that works for me',
    },
    {
        daySlot: 1, japanese: '少し予定が押してます',
        english: [
            'We are a little late.',
            'We are running a bit behind.',
            'Heads up — we are running a bit behind on the project.',
            'Okay. How much more time do you need?',
        ],
        jaTranslations: [
            '少し遅れています。',
            '少し予定が押してます。',
            '一応共有 -- プロジェクト、少し押してます。',
            'わかった。あとどれくらい必要？',
        ],
        context: 'run behind = 予定より遅れている（進行が後ろにずれる）。late より「スケジュールが押す」感が出る。Heads up = 前もって一言（共有）。日本の「一応共有しておくと」にぴったり。TOEIC Part4のアナウンスで頻出。',
        character: 'takeshi', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 4', eiken: '2級' },
        youglish: 'running a bit behind',
    },
    {
        daySlot: 1, japanese: 'これ手伝ってもらえますか？',
        english: [
            'Can you help me with this?',
            'Could you give me a hand with this?',
            'I am drowning here — could you give me a hand with this?',
            'Yeah, of course. What do you need?',
        ],
        jaTranslations: [
            'これ手伝ってもらえますか？',
            'これ、ちょっと手を貸してもらえる？',
            'もう溺れそうで -- これ手を貸してもらえる？',
            'うん、もちろん。何が必要？',
        ],
        context: 'give someone a hand = 手を貸す。help より口語的で温かい。日本語の「手を貸す」と発想が同じなのが面白い(hand=手)。I am drowning = 仕事に溺れてる、の定番比喩。英検2級の会話文・TOEIC Part3頻出。',
        character: 'yuki', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 3', eiken: '2級' },
        youglish: 'give me a hand with this',
    },
    {
        daySlot: 1, japanese: 'それ、私がやっておきます',
        english: [
            'I will do it.',
            'I will take care of it.',
            'Do not worry about that one — I will take care of it.',
            'You are a lifesaver. Thanks.',
        ],
        jaTranslations: [
            '私がやります。',
            'それ、私がやっておきます。',
            'それは気にしないで -- 私がやっておくから。',
            '助かる、ほんと。ありがとう。',
        ],
        context: 'take care of it = （責任持って）対応しておく。do it より「任せて、面倒みとく」の頼れる感。You are a lifesaver = 「命の恩人＝めっちゃ助かる」の定番お礼。ありがとうのバリエはTOEICでも英検でも刺さる。',
        character: 'lisa', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 2', eiken: '準2級' },
        youglish: 'I will take care of it',
    },
    {
        daySlot: 1, japanese: 'すっかり忘れてました',
        english: [
            'I forgot.',
            'It slipped my mind.',
            'Oh no — I am so sorry, it completely slipped my mind.',
            'It happens. Just send it over when you can.',
        ],
        jaTranslations: [
            '忘れていました。',
            'うっかり忘れてました。',
            'うわ -- 本当にすみません、すっかり頭から抜けてました。',
            'よくあることだよ。できる時に送って。',
        ],
        context: 'slip one\'s mind = うっかり忘れる（自分の頭から「滑り落ちた」）。I forgot は直接的すぎて言い訳に聞こえる。slipped my mind は「うっかり」感で角が立たない、大人の英語。タケシは "I slipped my mind" と言って『お前がどこに滑ったんだ』とマスターに突っ込まれる。正しくは It slipped my mind。',
        character: 'takeshi', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 2', eiken: '2級' },
        youglish: 'it slipped my mind',
    },
    {
        daySlot: 1, japanese: '大丈夫、よくあることだよ',
        english: [
            'It is okay.',
            'No worries, it happens.',
            'Hey, relax. No worries — it happens to everyone.',
            '...See? You handled all of that in English. That is the test right there.',
        ],
        jaTranslations: [
            '大丈夫です。',
            '気にしないで、よくあるよ。',
            'ほら、落ち着いて。気にすんな -- 誰にでもあることだ。',
            '...な？今の全部英語でさばいただろ。それがテストだよ。',
        ],
        context: 'No worries = 気にしないで(豪・英で特に多用、今や世界標準のカジュアル)。it happens = よくあること。日本語の「よくあるよ」の慰めにドンピシャ。マスターの締め: 試験対策の本質は、この一連を「その場で英語で回せるか」。点数はその影。',
        character: 'master', category: 'work', month: 'SAMPLE',
        exam: { toeic: 'Part 2', eiken: '準2級' },
        youglish: 'no worries it happens',
    },
];
