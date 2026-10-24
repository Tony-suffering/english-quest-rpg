/**
 * 月刊 TOLERANCY — 存在しない英単語を雑誌名にした、英語検死マガジン。
 *
 * DMM英会話で毎晩生産される「存在しない英語」を、雑誌の体裁で供養する。
 * ネタ元は kenshi-lessons.ts / DMM検死レポート。笑いながら読むと
 * 正しい英語だけが手元に残る構造にする(各コーナーに正解ボックス必須)。
 *
 * 追記ルール:
 * - 1号 = MagazineIssue 1件。新しい号は配列の先頭に足す。
 * - 捏造語は初出日と実際の発言をセットで記録(証拠主義)。
 * - すべてのコメディに「で、正解は」を付ける。笑いだけで終わらせない。
 */

export interface FakeWordEntry {
    word: string;           // 捏造語そのもの
    pronunciation: string;  // それっぽい発音記号(架空)
    pos: string;            // 品詞表記(※存在しない を含める)
    fakeDefinition: string; // もし存在したらこういう意味、という架空の語義(笑いどころ)
    firstSeen: string;      // 初出 YYYY-MM-DD
    spoke: string;          // 実際の発言(証拠)
    meant: string;          // 言いたかったこと
    etymology: string;      // 捏造の経緯(編集長の脳内)
    correct: {
        word: string;       // 実在する正しい単語
        example: string;    // 正しい例文
        ja: string;         // 例文の日本語
        tip: string;        // 覚え方
    };
}

export interface AWatchObservation {
    date: string;       // MM-DD
    spoke: string;      // 実際の発言
    caption: string;    // 観測所コメント
}

export interface RallyLine {
    speaker: 'TONIO' | 'TEACHER';
    en: string;
    ja: string;
}

export interface QuizItem {
    q: string;          // 問題(編集長が実際に言った崩れた英語)
    hint?: string;
    a: string;          // 正解の一文
    explain: string;    // 一言解説
}

// 誌面の固定ラベル/見出し類(コーナー名・英語サブ・注釈・奥付など)。
// これらも含めて「全部」ブラウザ編集できるようにするためのデータ。
// 古いデータに chrome が無い場合は DEFAULT_CHROME で埋める。
export interface MagazineChrome {
    topBarLabel: string;        // 表紙上部の英語ラベル
    masthead: string;           // 誌名ロゴ(アスタリスクは別)
    mastheadNote: string;       // 誌名脇の注釈
    priceLeft: string;          // 価格帯 左
    priceRight: string;         // 価格帯 右
    editorsNoteKicker: string;  // 巻頭言 kicker
    editorsNoteSign: string;    // 巻頭言 署名
    fakeKicker: string;         // 捏造語大全 kicker
    fakeTitle: string;          // 捏造語大全 タイトル
    fakeSub: string;            // 捏造語大全 サブ
    aWatchKicker: string;
    aWatchTitle: string;
    aWatchSub: string;
    rallyKicker: string;
    rallyIdiomsTitle: string;   // 「このラリーから盗む3表現」
    autopsyKicker: string;
    quoteLabel: string;         // 「Quote of the Month」
    quizKicker: string;
    quizTitle: string;
    quizSub: string;
    nextIssueLabel: string;     // 「次号予告 — Next Issue」
    colophonLeft: string;
    colophonRight: string;
}

export interface MagazineIssue {
    vol: number;
    issueDate: string;      // YYYY-MM
    coverDate: string;      // 表紙の英語表記
    coverLines: string[];   // 表紙の特集見出し
    chrome?: MagazineChrome; // 誌面の固定ラベル類(任意 / 無ければ DEFAULT_CHROME)
    editorsNote: {
        title: string;
        paragraphs: string[];
    };
    fakeWords: FakeWordEntry[];
    aWatch: {
        intro: string;
        observations: AWatchObservation[];
        rule: { title: string; points: string[] };
    };
    rally: {
        title: string;
        intro: string;
        lines: RallyLine[];
        idioms: { en: string; ja: string; note: string }[];
    };
    autopsy: {
        title: string;
        date: string;
        spoke: string;
        findings: string[];
        correct: { en: string; ja: string };
        verdict: string;
    };
    quote: {
        en: string;
        ja: string;
        by: string;
        editorNote: string;
    };
    quiz: QuizItem[];
    nextIssue: string[];
}

// 誌面ラベルの既定値。号データに chrome が無い時のフォールバックにも使う。
export const DEFAULT_CHROME: MagazineChrome = {
    topBarLabel: 'The English Autopsy Monthly',
    masthead: 'TOLERANCY',
    mastheadNote: 'この単語は英語に存在しません。編集長が2026年7月19日に発明しました。 正しくは tolerance。存在しない単語に月刊を名乗らせるのが本誌の編集方針です。',
    priceLeft: 'Published from a DMM Eikaiwa classroom, nightly',
    priceRight: '定価 0円(税込) — 恥は別売り',
    editorsNoteKicker: "Editor's Note — 巻頭言",
    editorsNoteSign: '— 編集長 Tonio(英検1級勉強中 / 冠詞は初級)',
    fakeKicker: 'Feature — 創刊特集',
    fakeTitle: '捏造語大全',
    fakeSub: 'The Fabricated Dictionary — 編集長が発明した、英語に存在しない単語たち。初出日と実際の発言を添えて供養する。',
    aWatchKicker: 'Serial — 連載',
    aWatchTitle: '観測日誌「a」',
    aWatchSub: 'The Article Watch — 冠詞 a の出席状況を観測する。生息地は「形容詞+可算名詞」の直前。',
    rallyKicker: 'Rally of the Month — 今月のベストラリー',
    rallyIdiomsTitle: 'このラリーから盗む3表現',
    autopsyKicker: 'Autopsy Room — 検死室',
    quoteLabel: 'Quote of the Month',
    quizKicker: "Reader's Exam — 巻末試験",
    quizTitle: 'あなたは編集長と同じ穴に落ちるか',
    quizSub: 'すべて編集長が実際に落ちた穴である。声に出して正解してから開くこと。',
    nextIssueLabel: '次号予告 — Next Issue',
    colophonLeft: 'TOLERANCY — a word that does not exist',
    colophonRight: '発行: 恥とあきらめの英会話編集部',
};

export const magazineIssues: MagazineIssue[] = [
    {
        vol: 1,
        issueDate: '2026-07',
        coverDate: 'JULY 2026',
        chrome: DEFAULT_CHROME,
        coverLines: [
            '創刊特集「捏造語大全」— 編集長が発明した英単語、全4語を初公開',
            '連載 観測日誌「a」— 冠詞、本日も欠席。観測史上最長の4日連続',
            '今月のベストラリー — 豚は汗をかかない',
            '検死室 — are tend、24日ぶり2度目の完全再発',
        ],
        editorsNote: {
            title: '創刊のことば',
            paragraphs: [
                '本誌は、DMM英会話で毎晩生産される「存在しない英語」を供養する月刊誌である。編集長(俺)は英検1級の単語帳を読み、square peg in a round hole を実戦投入できる男だ。その同じ口が、冠詞の a を4日連続で落とし、存在しない単語を月に1個のペースで発明している。',
                '語彙は上級、冠詞は初級。この標高差こそが本誌の資源であり、日本人英語学習者の共有財産だと編集部は考える。あなたが落ちる穴には、だいたい先に編集長が落ちている。底から手を振っているので、安心して縁を歩いてほしい。',
                'なお誌名の TOLERANCY は、編集長が2026年7月19日に発明した英単語である。英語には存在しない。存在しないものに月刊を名乗らせる。それが本誌の編集方針だ。',
            ],
        },
        fakeWords: [
            {
                word: 'consentment',
                pronunciation: '/kənˈsent.mənt/',
                pos: '名詞(※存在しない)',
                fakeDefinition: '存在しない同意。役所の窓口で3時間待たされた末に取得できる、誰の許可でもない何か。',
                firstSeen: '2026-07-11',
                spoke: '"You need the consentment..."',
                meant: 'consent(同意)',
                etymology: 'consent に -ment を足して高級感を出そうとした。consent 自体がすでに名詞だったことは、発明の3日後に判明した。',
                correct: {
                    word: 'consent',
                    example: 'You need the patient\'s consent before sharing the data.',
                    ja: 'データを共有する前に、患者の同意が要る。',
                    tip: 'consent は名詞と動詞が同形。-ment は不要。agree → agreement のノリを consent に持ち込まない。',
                },
            },
            {
                word: 'mixation',
                pronunciation: '/mɪkˈseɪ.ʃən/',
                pos: '名詞(※存在しない)',
                fakeDefinition: '存在しない混合。カクテルシェイカーの中で発生するが、注いだ瞬間に消滅する。',
                firstSeen: '2026-07-15',
                spoke: '"...the mixation of cultures..."',
                meant: 'mixture / mix(混合)',
                etymology: 'mix + -ation。「動詞に -ation を付ければだいたい名詞になる」という編集長の仮説の犠牲者。仮説は棄却された。',
                correct: {
                    word: 'mixture / mix',
                    example: 'The city is a mixture of old and new cultures.',
                    ja: 'その街は新旧の文化が混ざり合っている。',
                    tip: '「文化のミックス」は a mix / mixture of cultures。動詞のまま cultures mix と言ってもいい。-ation は封印。',
                },
            },
            {
                word: 'tolerancy',
                pronunciation: '/ˈtɒl.ər.ən.si/',
                pos: '名詞(※存在しない・本誌誌名)',
                fakeDefinition: '存在しない耐性。主に酒の席で発生し、翌朝には消えている。',
                firstSeen: '2026-07-19',
                spoke: '"I\'m tolerant... I\'m extra tolerancy with alcohol."',
                meant: 'tolerance(耐性)/「酒に強い」',
                etymology: 'tolerant(形容詞)まで正しく言えていたのに、名詞化の着地で tolerance を踏み外し -y に着地。捏造語シリーズ第3弾にして、本誌の誌名に昇格。',
                correct: {
                    word: 'tolerance',
                    example: 'I have a pretty high tolerance for alcohol.',
                    ja: '酒にはかなり強いほうだ。',
                    tip: '「酒に強い」は have a high tolerance for alcohol 一択。形容詞は tolerant、名詞は tolerance。I\'m strong with alcohol は和製直訳。',
                },
            },
            {
                word: 'brain consuming',
                pronunciation: '/breɪn kənˈsjuː.mɪŋ/',
                pos: '形容詞(※存在しない)',
                fakeDefinition: '存在しない消耗。脳が第三者に食べられている状態を指すが、食べているのはだいたい自分。',
                firstSeen: '2026-07-01',
                spoke: '"It\'s brain consuming."',
                meant: 'mentally draining(精神的に消耗する)',
                etymology: 'time-consuming(時間を食う)からの類推で brain を接続。発言の直後、本人の口から mentally taxing という正解が出た。知ってるなら最初から出せ、と当時の検死報告書にある。',
                correct: {
                    word: 'mentally draining',
                    example: 'Dealing with customer complaints is mentally draining.',
                    ja: 'クレーム対応は精神的にごっそり削られる。',
                    tip: 'drain は「排水で吸い出す」。mentally draining / exhausting / taxing の3枚を回す。time-consuming の brain 版は作れない。',
                },
            },
        ],
        aWatch: {
            intro: '当観測所は2026年7月、冠詞 a の連続欠席を観測した。a は「形容詞+可算名詞」の直前という定位置に生息するが、編集長の口内では絶滅が危惧されている。以下、観測記録。',
            observations: [
                {
                    date: '07-16',
                    spoke: '"I\'m not political guy."',
                    caption: 'a、欠席。編集長は政治に疎いだけでなく、冠詞にも疎いことが判明。',
                },
                {
                    date: '07-17',
                    spoke: '"You are outgoing guy."',
                    caption: 'a、欠席2日目。講師を社交的と褒めながら、冠詞との社交を拒否。',
                },
                {
                    date: '07-18',
                    spoke: '"You are naturally very good person."',
                    caption: 'a、欠席3日目。この日の編集長はほろ酔い。しかし当観測所の記録では、素面でも出席率に有意差なし。',
                },
                {
                    date: '07-19',
                    spoke: '"It\'s very good idea."',
                    caption: 'a、欠席4日目。観測史上最長を更新。なお同日「a private students」として突然出席したが、複数形の s と衝突事故を起こした。出ても事故。',
                },
            ],
            rule: {
                title: '観測所より: a の生態',
                points: [
                    '数えられる名詞の単数には a が必須。That\'s a very good idea. — 形容詞が何枚挟まっても a は消えない。',
                    'a と複数の s は同居できない。a private students は不可。private students(複数)か a private student(単数)か、言う前に決める。',
                    '「You are ___ person / guy」「It\'s ___ idea / thing」の型で最も欠席しやすい。この2型だけ見張れば出席率は劇的に上がる。',
                ],
            },
        },
        rally: {
            title: '豚は汗をかかない',
            intro: '2026年7月19日、猛暑の話題にて。編集長が仕込んでいたイディオムを投げたところ、講師が豆知識で応じ、編集長が皮肉で締めた。本誌が「今月のベストラリー」に認定した60秒である。',
            lines: [
                {
                    speaker: 'TONIO',
                    en: 'In this heat, you just sweat like a pig. You sweat profusely.',
                    ja: 'この暑さだと、豚みたいに汗だくになる。滝のように汗が出る。',
                },
                {
                    speaker: 'TEACHER',
                    en: 'Funny thing is, pigs don\'t actually sweat — that\'s why they wallow in the mud.',
                    ja: '面白いことに、豚は実際には汗をかけないんだ。だから泥浴びをする。',
                },
                {
                    speaker: 'TONIO',
                    en: 'So pigs will sweat... when pigs fly.',
                    ja: 'じゃあ豚が汗をかくのは…豚が空を飛んだ時だね。',
                },
            ],
            idioms: [
                {
                    en: 'sweat like a pig',
                    ja: '豚のように汗だくになる',
                    note: '豚は汗をかけないので、実は矛盾した慣用句。この矛盾ごと会話のネタになる。',
                },
                {
                    en: 'when pigs fly',
                    ja: '豚が空を飛んだらね(=絶対にない)',
                    note: '相手の楽観を茶化す定番の皮肉。Will he apologize? — Yeah, when pigs fly.',
                },
                {
                    en: 'wallow in the mud',
                    ja: '泥の中で転げ回る',
                    note: 'wallow in self-pity(自己憐憫に浸る)への応用が利く。浸かって出てこないイメージ。',
                },
            ],
        },
        autopsy: {
            title: '症例: are tend — be動詞挿入症の完全再発',
            date: '2026-07-19',
            spoke: '"People are tend to be shy... shy away from new technology."',
            findings: [
                '初発は2026年6月25日「some people are tend to」。約1ヶ月の潜伏期間を経て、同一の型で完全再発した。',
                'tend は一般動詞である。be動詞の直後に一般動詞を置くスペースは英語に存在しないが、患者は「主語の直後にとりあえず are を置くと安心する」という日本人特有の症状を示す。',
                '特筆すべきは、崩壊した骨格の内側で shy away from(尻込みして避ける)という上級句動詞が正しく機能していた点である。内臓は健康、骨格だけが事故。本誌が繰り返し指摘する「標高差」の典型例。',
            ],
            correct: {
                en: 'People tend to shy away from new technology.',
                ja: '人は新しい技術を避けたがるものだ。',
            },
            verdict: '死因: be動詞の過剰投与。処方: tend / agree / belong など一般動詞の前では be を完全断酒。People tend to... と10回口に出して退院。',
        },
        quote: {
            en: 'It doesn\'t matter if you make mistakes — what matters is if you\'re understood.',
            ja: 'ミスするかどうかは問題じゃない。伝わるかどうかが全てだ。',
            by: '常連英国人講師(在ベトナム)',
            editorNote: '編集部注: 本誌はこの言葉に全面的に甘えて成立している。',
        },
        quiz: [
            {
                q: '「酒には強いほうだ」— 編集長は "I\'m extra tolerancy with alcohol" と言った。正しくは?',
                hint: '名詞は tolerance。「高い耐性を持つ」と組む。',
                a: 'I have a pretty high tolerance for alcohol.',
                explain: 'have a high tolerance for〜 が定型。tolerancy は本誌の誌名であって英語ではない。',
            },
            {
                q: '「それ、すごくいいアイデアだ」— 編集長は "It\'s very good idea" と言った。何が欠席している?',
                a: 'That\'s a very good idea.',
                explain: 'a が欠席。可算名詞 idea の前の a は、形容詞が何枚挟まっても消えない。',
            },
            {
                q: '「みんな日々の生活でしんどさを抱えてる」— "Everyone deal with difficulty..." の誤りは?',
                a: 'Everyone deals with hardships in their daily life.',
                explain: 'everyone は単数扱い。三単現の s を付ける。every / everyone の後は反射で s。',
            },
            {
                q: '「SNSからは距離を置いてる」— "I stay away with social media" の前置詞は?',
                a: 'I stay away from social media.',
                explain: '離れる = away from。with だと「SNSと連れ立って何かから離れる」謎の同盟が結成される。',
            },
            {
                q: '「週末はオフィスのネットワークに入れない」— "I cannot access to my office network" の誤りは?',
                hint: 'listen to とは真逆のペア。',
                a: 'I can\'t access my office network on weekends.',
                explain: '動詞の access は他動詞なので直結。to が要るのは名詞の時だけ(access to the internet)。listen to(to必須)と正反対のペアで覚える。',
            },
        ],
        nextIssue: [
            '観測日誌「a」— 5日連続欠席なるか。観測所は既に確信している',
            '捏造語第5弾 — 誕生を編集部は確信をもって予告する(単語は未定、誕生だけが確定)',
            '特集「be動詞の過剰在庫」— was born から始まった全事故の系譜',
        ],
    },
];

export function getLatestIssue(): MagazineIssue {
    return magazineIssues[0];
}

export function getIssue(vol: number): MagazineIssue | undefined {
    return magazineIssues.find((i) => i.vol === vol);
}
