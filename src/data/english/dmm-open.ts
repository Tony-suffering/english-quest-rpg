/**
 * DMM英会話 無料公開 — 1レッスンの音源・原稿・一行ずつの解説
 *
 * 公開ページ: /english/dmm-open (一覧) / /english/dmm-open/[slug] (1レッスン)
 *
 * 書き方の約束:
 *   - 原稿 (original) は書き起こしのまま。言いよどみも崩れも直さない
 *   - 直し (fix) とネイティブの言い方 (native) は別の欄。直しは「本人の語彙で言えたはずの形」、
 *     native は「本人が持っていなかった言い方」
 *   - 講師の名前は出さない (録音にも無い)
 *   - 物語 (story) の事実は録音にあることだけ。盛らない
 *   - 音源は note の記事に貼ってある。サイトには音声ファイルを置かない
 */
import { LINES_0924 } from './dmm-open-0924-lines';

export interface OpenLine {
    role: 'student' | 'teacher';
    original: string;
    /** 本人の語彙のまま、文法だけ直した形 */
    fix: string | null;
    /** ネイティブならこう言う (本人が持っていなかった言い方) */
    native: string | null;
    /** native の中の新しい部品 */
    chunk: string | null;
    /** 解説 (日本語)。空なら出さない */
    note: string;
    /** 講師の発言から盗む形 */
    pick: string | null;
    pickNote: string | null;
    /** 話の中身の豆知識 */
    know: string | null;
    /** その夜の山場 */
    star: boolean;
}

export interface StorySection {
    heading: string;
    paragraphs: string[];
}

export interface OpenLesson {
    slug: string;
    date: string;
    minutes: number;
    title: string;
    catchcopy: string;
    /** 音源を貼った note の記事。未設定なら音源の欄は出さない */
    noteUrl?: string;
    story: StorySection[];
    /** 講師が置いていった、持ち帰る英語 */
    takeaways: { en: string; ja: string }[];
    lines: OpenLine[];
}

export const OPEN_SERIES = {
    title: '英語が本当にペラペラに話せるようになる唯一の方法を、俺が本気で教えます。',
    subtitle: 'TOEIC900点、英検1級を目指す芸人のDMM英会話。音源・原稿、無料公開。',
    method: [
        '方法は1つしかない。毎晩しゃべる。録音する。全部書き起こす。1行ずつ直す。直した形を、次の夜に使う。',
        '教材を何冊買っても、しゃべった25分の中で言えなかった1文は、自分の口からは出てこない。言えなかった1文を、次の夜に言えるようにする。それを毎晩くり返すだけだ。',
        'このページには、ある1晩の25分が全部ある。俺の崩れた英語も、講師の言葉も、1行ずつの直しも。自分の英語でも同じことができる。',
    ],
};

export const OPEN_LESSONS: OpenLesson[] = [
    {
        slug: '2026-09-24',
        date: '2026-09-24',
        minutes: 25,
        title: '8日前に切れた1文を、最初の1文で言い切った夜',
        catchcopy:
            '講師のお母さんが入院したと聞いた夜、俺の最後の1文は「your mom is very... I... I...」で回線ごと切れた。8日後、東京の車道を歩きながら、挨拶のすぐあとに聞いた。お母さん、大丈夫? 話はそこから給食の牛乳、ハリー・ポッターの寄宿学校、ひきこもりへ転がって、最後に俺は、自分は教室でいじめる側だったかもしれないと言った。',
        story: [
            {
                heading: '8日前、俺の英語は回線ごと切れた',
                paragraphs: [
                    '9月16日の夜。いつもの講師が、画面の向こうで少し疲れた顔をしていた。お母さんが入院したという。心拍数がおかしくて、原因はまだ分からない。医者の話はいつもはっきりしない。講師はそれを doctors seem to talk in circles half the time と言った。医者は半分くらい、同じところをぐるぐる回って話をはぐらかす。',
                    '俺は何か言わなきゃと思った。心配してる、お大事に。それを英語で。出てきたのはこれだ。',
                    'your mom is very... I... I...',
                    'そこで回線が切れた。比喩じゃなく、本当に切れた。レッスンはそのまま終わった。TOEIC900点を目指している男の励ましの言葉は、全文で「あなたのお母さんはとても……私は……私は……」だった。',
                ],
            },
            {
                heading: '8日後、車道を歩きながら',
                paragraphs: [
                    '9月24日。俺は東京の車道を、公園に向かって歩いていた。モバイル回線で、音声だけでつないだ。後ろを車がびゅんびゅん通る。',
                    '講師は Did you have a good Silver Week? と聞いてきた。シルバーウィーク、どこか行った? どこにも行ってない。I\'m kind of an indoor kid。インドア派なので、祝日も平日も関係ない。',
                    'そして、挨拶もそこそこに聞いた。your mom is okay?',
                    '文法はめちゃくちゃだ。でも8日間ずっと言いたかったのは、この1文だった。答えは she left the hospital yesterday。昨日、退院した。',
                ],
            },
            {
                heading: 'おめでとう、じゃないらしい',
                paragraphs: [
                    'うれしくて、口から出たのは Congratulations だった。言った瞬間に、何かが引っかかった。日本語なら「退院おめでとう」でいい。でも英語の congratulations は、試験に受かった、結婚した、みたいに本人が何かを成し遂げたときの言葉だ。',
                    '俺はその場で聞いた。Is that "congratulation"? これ、言い方違うよね?',
                    '講師は Probably not "congratulations" と言って、すぐに I understand the sentiment と付け足した。気持ちは伝わってるよ。言葉を直す前に、まず気持ちを受け取ってくれた。それから、こういうときは It must be a relief だと教えてくれた。ほっとしたでしょう。',
                    '俺は such a relief で返した。',
                ],
            },
            {
                heading: '8日前の言葉を、8日後に返す',
                paragraphs: [
                    'それから、診断はどうだったのかを聞いた。そのとき口から出たのが talking in circles だった。8日前に講師が言った「医者は話をはぐらかす」。I remember、覚えてるよ、と言ってから、その言葉を使った。',
                    'この夜で一番よかったのは、たぶんここだ。相手が置いていった言葉を、相手の話の続きで返す。ちゃんと聞いていたという証拠として、これ以上のものは無い。',
                    '原因は甲状腺の働きすぎで、それが心拍数を上げていた。今は薬で抑えている。8日間の入院で一番きついのは退屈で、講師は仕事を減らして、そばにいた。keep her company。',
                ],
            },
            {
                heading: '病院食から、給食の牛乳へ',
                paragraphs: [
                    '病院食はどうだった? から話が転がり始めた。日本の給食の話だ。配膳は当番制。人気のおかずの日はおかわりの争奪戦で、みんな早食いして、最後はじゃんけんで決める。飲み物は全員牛乳。乳糖が合わない子も牛乳。水は無い。',
                    '俺はこれを英語で説明するのに、たぶん3分かかった。途中で homeless person が並んでるみたいな感じ、とまで言った。',
                    '講師は寄宿学校の出身で、ご飯は全部学校で食べていた。学校の売店は tuck shop と言うらしい。人生で初めて聞いた単語だった。',
                ],
            },
            {
                heading: 'ハリー・ポッターと、逃げ場の無い部屋',
                paragraphs: [
                    '寄宿学校と聞いて、俺の頭に浮かんだのはハリー・ポッターだ。そのまま聞いた。イギリスではみんな寄宿学校に行くの? 答えは、5%くらい。レアだった。ただ、私立の多くは寮が必須で、家が学校のすぐ近くでも寮に入る。講師は13歳から。義理の兄弟は8歳からだったそうだ。',
                    '8歳で親から離れるのはさすがに早くない? と俺は言った。講師は、年齢より子どもの性格次第だと返した。寄宿学校でひどい目に遭った知り合いも何人かいる。',
                    '俺が there\'s no escape、逃げ場が無いよね、と言うと、講師はそれを絵にして返した。you can\'t run home to mommy and daddy。ママとパパのところへは逃げ帰れない。',
                ],
            },
            {
                heading: '最後に、俺はいじめる側だったかもしれない',
                paragraphs: [
                    '話は教室そのものへ降りていった。毎日同じ子と8時間、9時間。30人も40人も1つの部屋に詰める形は、100年くらい前に始まったものだ。講師によると、イギリスではホームスクーリングがまた増えている。友だちも、体操をやっている娘を家で教えているそうだ。',
                    '俺は、日本には学校に行けなくなった子を指す hikikomori という言葉があると説明した。講師は karoshi は知っていたけど、hikikomori は知らなかった。13歳から16歳まで家にいて、独学でITをやっていた親友の話もした。',
                    'そして、言うつもりのなかったことを言った。あの教室で、俺はいじめる側だったかもしれない。当時は何も考えていなかった。振り返ると、ああいう部屋は普通じゃない。',
                    '講師の結論はこうだった。子どもの強みと弱みを分かったうえで、その子が一番よく育つ場所を探す。That\'s not always an easy choice. それは、いつも簡単な選択じゃない。',
                    'そこで25分が終わった。Cheers, bye。',
                ],
            },
            {
                heading: 'この夜に残ったもの',
                paragraphs: [
                    '文法は相変わらずだ。I\'m fully understand と言ったし(understand の前に I\'m はいらない)、a very bad news とも言った(news に a は付かない)。それも全部、下の原稿に1行ずつ残してある。',
                    'でも、この夜に俺が一番覚えて帰ったのは文法じゃない。8日前に切れた1文を、最初の1文で言い切れたことだ。',
                ],
            },
        ],
        takeaways: [
            { en: 'I understand the sentiment.', ja: '気持ちは伝わってるよ。言葉がずれていても、先に気持ちを受け取る1文' },
            { en: 'It must be a relief.', ja: 'ほっとしたでしょう。相手の気持ちを推し量る must' },
            { en: 'Your mind can take you to dark places.', ja: '頭が勝手に悪いほうへ連れていく' },
            { en: 'Keep her company.', ja: 'そばにいて相手をする' },
            { en: 'By hospital standards, it was pretty good.', ja: '病院にしては、かなり良かった' },
            { en: 'There would always be a tuck shop.', ja: '学校には必ず売店があった(tuck shop = 英国・南アの学校の売店)' },
            { en: 'You can\'t run home to mommy and daddy.', ja: 'ママとパパのところへは逃げ帰れない' },
            { en: 'That\'s not always an easy choice.', ja: 'それは、いつも簡単な選択じゃない' },
        ],
        lines: LINES_0924,
    },
];

export function getOpenLesson(slug: string): OpenLesson | undefined {
    return OPEN_LESSONS.find((l) => l.slug === slug);
}
