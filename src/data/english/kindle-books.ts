/**
 * Kindle 出版企画データ
 *
 * 「日本人英語事件簿」シリーズ Vol.1〜Vol.5
 * 各巻は note-articles.ts の既存記事から chapter として参照する
 */

export type KindleBookStatus = 'planning' | 'editing' | 'review' | 'submitted' | 'published';

export interface KindleChapter {
    number: number;
    title: string;
    sourceArticleId: string;
    originalTitle: string;
    why: string;
}

export interface KindlePart {
    name: string;
    description: string;
    chapters: KindleChapter[];
}

export interface KindleBook {
    id: string;
    vol: number;
    title: string;
    subtitle: string;
    author: string;
    series: string;
    price: number;
    royalty: 35 | 70;
    status: KindleBookStatus;
    estimatedPages: number;
    estimatedChars: number;
    targetReader: string;
    positioning: string;
    categories: string[];
    keywords: string[];
    coverUrl?: string;
    asin?: string;
    publishedAt?: string;
    foreword: string;
    parts: KindlePart[];
    afterword: string;
    editorNotes: string[];
}

export const kindleBooks: KindleBook[] = [
    {
        id: 'vol-1',
        vol: 1,
        title: '日本人英語事件簿 第1巻',
        subtitle: '恥とあきらめの英会話 ── 警視庁・英語事犯対策課、本日5名を全国指名手配',
        author: 'とにお',
        series: '日本人英語事件簿シリーズ',
        price: 500,
        royalty: 70,
        status: 'planning',
        estimatedPages: 200,
        estimatedChars: 119000,
        targetReader: 'TOEIC 600〜900 の「勉強したのに喋れない大人」、英語に挫折経験のある社会人',
        positioning: '英語教材ではない。読み物。事件簿という設定の上で、自分の英会話の恥を笑うための本',
        categories: ['語学', 'エッセイ・コラム', '人文・思想'],
        keywords: ['日本人英語', '英会話', 'TOEIC', '警視庁', '絶滅危惧種', '保険', '嘘翻訳'],
        foreword: `私は警視庁・英語事犯対策課の捜査官、とにおです。

我々が追っている犯罪は、殺人でも詐欺でもない。「日本人英語事犯」と呼ばれる、極めて巧妙で、極めて日常的な事件群です。Fine Thank You And You? 過失致死。クッション語密造。過剰丁寧詐欺。Could You Please 不法投棄。──TOEIC 900 を持っている、そんな人間ほど現場で死ぬ。

本書は、私が 15 年間、現場で目撃してきた事件の捜査資料です。容疑者はあなたかもしれない。私かもしれない。新宿駅前で「I'm fine, thank you. And you?」と反射で答えた瞬間、人は皆、共犯者になる。

この本に「英語の正解」は出てきません。出てくるのは、「恥」と「あきらめ」だけです。完璧に話そうとして死ぬ全国民の代わりに、私は事件現場をひとつずつ晒します。読み終わる頃、あなたは犯人でも被害者でもなく、捜査官側に立っているはずです。

笑ってください。それが本書のすべての目的です。

警視庁・英語事犯対策課 とにお`,
        parts: [
            {
                name: '第一部 「警視庁・英語事犯対策課、発足」',
                description: 'Wanted / Breaking / 事件現場系。世界観の導入。',
                chapters: [
                    { number: 1, title: '本書を捜査資料として開いた者へ', sourceArticleId: '135', originalTitle: '俺の商品、「恥とあきらめの英会話」だった', why: '本のテーマ宣言。商品定義回。冒頭で読者と契約' },
                    { number: 2, title: '警視庁・英語事犯対策課、本日5名を全国指名手配', sourceArticleId: '128', originalTitle: '警視庁・英語事犯対策課、本日5名を全国指名手配', why: '世界観の核。Fine Thank You 過失致死など5名の容疑者紹介' },
                    { number: 3, title: 'X 始めた。日本人英語の事件現場を毎日晒す警察になる', sourceArticleId: '133', originalTitle: 'X始めた。日本人英語の事件現場を毎日晒す警察になる', why: '警察ごっこの原点。なぜ事件簿という設定なのか' },
                    { number: 4, title: '朝7時の正気とは何か ── LINE 速報、本日の容疑者', sourceArticleId: '130', originalTitle: '俺の LINE 登録すると、これが毎朝届く', why: '警視庁速報・絶滅危惧種図鑑・遺言書。世界観の幅' },
                    { number: 5, title: '新宿駅前事件 ── TOEIC 900 の男が会議で完全に死んだ', sourceArticleId: '111', originalTitle: 'TOEIC900の俺、会議で外国人部長に詰められて、完全に死んだ', why: '一級事件現場。読者の共感点' },
                    { number: 6, title: 'コンビニのつけ麺に涙を落とした夜の供述調書', sourceArticleId: '088', originalTitle: '15年間ひとりで英語を勉強して、現場で泣いた日の話', why: '自虐エッセイ。事件簿に温度を入れる' },
                    { number: 7, title: '容疑者「Fine Thank You And You?」── 学校で植え付けられた反射', sourceArticleId: '015', originalTitle: '英会話で固まる人に足りないのは、学校で禁止された um だけ', why: '容疑者プロファイリング。um禁止の犯罪性' },
                    { number: 8, title: '容疑者「完璧主義」── 完璧を目指すほど伝わらない逆説', sourceArticleId: '004', originalTitle: '英語は下手な方が伝わる -- 完璧を目指すほど伝わらなくなる科学的な理由', why: '完璧主義事犯。MLB データで起訴' },
                    { number: 9, title: '容疑者「止まる男」── 八村塁、止まらなかっただけで NBA 7年', sourceArticleId: '017', originalTitle: '八村塁の英語は上手くない。ただ止まらないだけ -- それが最強だった', why: '止まる罪 vs 止まらない無罪。判例' },
                ],
            },
            {
                name: '第二部 「日本人英語クリニック」',
                description: 'Clinic / 症候群 / 絶滅危惧種系。読者を診断する章。',
                chapters: [
                    { number: 10, title: '日本人英語クリニック、本日も満員', sourceArticleId: '064', originalTitle: '英語を話せないんじゃない。日本語でも何も言えてない。', why: 'クリニック導入。診断は「日本語が空っぽ」' },
                    { number: 11, title: '症候群 #1 「I have got 違和感症候群」', sourceArticleId: '112', originalTitle: 'I have got = I have って教えた中学の先生、お前のせいで俺は10年違和感を抱えた', why: '症状名つき診断回。中学英語の後遺症' },
                    { number: 12, title: '症候群 #2 「thinkin\' 偽装症候群」', sourceArticleId: '056', originalTitle: '英語の「thinkin\'」をやめた。理由が意外すぎる', why: 'ネイティブ偽装の罪。診断と処方' },
                    { number: 13, title: '症候群 #3 「単語 5,000 個失語症」', sourceArticleId: '068', originalTitle: '英単語5000個覚えて、何も言えない。ダンバー数が教える語彙の真実', why: '語彙至上主義の病理' },
                    { number: 14, title: '絶滅危惧種図鑑 ── 瞬間英作文おじさん', sourceArticleId: '040', originalTitle: '瞬間英作文、15年やって気づいた。俺が育てたのは英語脳じゃなくて翻訳マシンだった', why: '絶滅危惧種カード型エッセイ' },
                    { number: 15, title: '絶滅危惧種図鑑 ── OPEN が読めない契約者', sourceArticleId: '086', originalTitle: 'OPENが読めなかった男が契約書にサインした話', why: '看板から契約書まで。日本人英語の縮図' },
                    { number: 16, title: '重症患者の特例治療 ── 同時通訳者は20分で死ぬ', sourceArticleId: '087', originalTitle: '同時通訳者は20分で死ぬ', why: '病院の上限を見せる。希望と絶望' },
                    { number: 17, title: 'クリニック処方箋 ── 自分の日本語を全部英語にする', sourceArticleId: '108', originalTitle: '自分の日本語を全部英語にする、という発想がなぜ今まで誰もやらなかったのか考えたら、答えが出た', why: '第二部の出口。次部への橋渡し' },
                ],
            },
            {
                name: '第三部 「英会話保険・捜査資料」',
                description: '保険 / 嘘翻訳 / quote / メタ系。事件簿世界の総決算。',
                chapters: [
                    { number: 18, title: '英会話保険、新プラン受付開始', sourceArticleId: '129', originalTitle: '英会話保険、新プラン受付開始', why: '保険商品の世界観。Fine Thank You 特約 ¥2,500 ほか' },
                    { number: 19, title: '業界全員が嘘をついている ── 捜査本部の見立て', sourceArticleId: '089', originalTitle: '英語業界の全員が嘘をついている', why: '業界批判の捜査資料。コーチ・スクール・YouTube' },
                    { number: 20, title: '業界全員が、実はすごい ── 反証としての捜査追補', sourceArticleId: '090', originalTitle: '英語業界の全員が、実はすごい', why: '公平性の演出。ソース付きで全員を擁護' },
                    { number: 21, title: '中道宣言 ── 闇でも光でもない、弦が鳴る場所', sourceArticleId: '091', originalTitle: '英語業界の中道 -- 闇でも光でもない、弦が鳴る場所', why: '三部作の閉じ。仏教的中道' },
                    { number: 22, title: '出口戦略 ── 英語で稼ぐ方法、ほぼ全部ゴミ', sourceArticleId: '106', originalTitle: '英語で金を稼ぐ方法、ほぼ全部ゴミだと気づいたので、俺の出口戦略を正直に書く', why: '捜査官の本音。読者へのメタ提言' },
                    { number: 23, title: 'パチンコは嫌いだ ── 英語学習の設計甘さを訴える', sourceArticleId: '018', originalTitle: 'パチンコが嫌いだ！（英語学習の話ですｗｗｗ）', why: 'コメディ章。設計の甘さの罪' },
                    { number: 24, title: '風呂掃除と英語 ── TOEIC 900 がカビに負けている', sourceArticleId: '081', originalTitle: '風呂掃除について本気で考えてみた', why: '自虐の極北。読者を救う' },
                    { number: 25, title: 'なんで死んではいけないんだろう、と思いながら英語を勉強している', sourceArticleId: '074', originalTitle: 'なんで死んではいけないんだろう、と思いながら英語を勉強している', why: '哲学エッセイ。本書を閉じる重み' },
                ],
            },
        ],
        afterword: `ここまで読んでくれて、ありがとう。

「日本人英語事件簿」第1巻、いかがでしたか。あなたが何人の容疑者に心当たりがあったか、私は知りません。でも、5人以上当てはまった人は、たぶん自首しなくていい。日本中の同志に、もう一度言います。**恥とあきらめは、英会話の最高の燃料です。**

第2巻では、いよいよ「日本人英語クリニック」専門病棟の症例集に踏み込みます。am禁止症候群、Could You Please 過剰投与、aとtheの一生 ── ぜんぶ診ます。

第3巻は嘘翻訳カードの世界、第4巻は絶滅危惧種図鑑、第5巻は英語業界そのものの解剖。

我々の捜査は、まだ始まったばかりです。容疑者は今夜も日本のどこかで「Fine Thank You And You?」と叫んでいる。

警視庁・英語事犯対策課 とにお`,
        editorNotes: [
            'トーン統一: 全章を「捜査官の供述」「事件ファイル」「診断書」「保険約款」のいずれかの体裁に編集加筆',
            '章間ブリッジ: 各章冒頭に「事件ファイル No.◯◯」スタンプ、末尾に「次の容疑者」予告を入れる',
            'Kindle 仕様: 横書き推奨 (LINE / TOEIC / X / MLB の混在対応)',
            '読了体験: 第一部=世界観に没入 → 第二部=自分も容疑者と気づく → 第三部=笑いながら救われる',
            'note との差別化: note は単発、Kindle は事件簿の連続性。各章末「次の容疑者」予告で引っ張る',
            'イラスト/図版: WANTEDポスター風扉絵、診断書、保険約款表、絶滅危惧種カードを章扉に',
        ],
    },
    {
        id: 'vol-2',
        vol: 2,
        title: '日本人英語事件簿 第2巻',
        subtitle: '日本人英語クリニック 症例集 ── am禁止症候群、Could You Please 過剰投与、ほか22症例',
        author: 'とにお',
        series: '日本人英語事件簿シリーズ',
        price: 500,
        royalty: 70,
        status: 'planning',
        estimatedPages: 180,
        estimatedChars: 108000,
        targetReader: 'Vol.1 で「自分も容疑者だ」と気づいた読者',
        positioning: '症状名つき診断 25 症例。Vol.1 のクリニックパートを全1冊に拡張',
        categories: ['語学', 'エッセイ・コラム'],
        keywords: ['日本人英語', '症候群', '英会話', '診断', 'TOEIC', 'クリニック', 'ユーモア'],
        foreword: '(Vol.1 出版後、Vol.2 着手時に執筆)',
        parts: [],
        afterword: '',
        editorNotes: ['元記事候補: 003, 015, 020, 021, 028, 029, 030, 057, 060, 080, 092, 105, 113'],
    },
    {
        id: 'vol-3',
        vol: 3,
        title: '日本人英語事件簿 第3巻',
        subtitle: '絶滅危惧種図鑑 ── 日本人英語の生態系',
        author: 'とにお',
        series: '日本人英語事件簿シリーズ',
        price: 500,
        royalty: 70,
        status: 'planning',
        estimatedPages: 180,
        estimatedChars: 108000,
        targetReader: 'Vol.1〜2 を読んだリピーター',
        positioning: '瞬間英作文おじさん、TOEIC満点さん、語彙厨、ネイティブ偽装っ子、留学帰り勢など',
        categories: ['語学', 'エッセイ・コラム'],
        keywords: ['日本人英語', '絶滅危惧種', '英会話', 'TOEIC', '生態系', 'ユーモア'],
        foreword: '',
        parts: [],
        afterword: '',
        editorNotes: ['元記事候補: 040, 062, 069, 077, 078, 079, 082, 092, 099, 113, 124, 125'],
    },
    {
        id: 'vol-4',
        vol: 4,
        title: '日本人英語事件簿 第4巻',
        subtitle: '嘘翻訳カード ── 日本人が信じてきた偽情報のすべて',
        author: 'とにお',
        series: '日本人英語事件簿シリーズ',
        price: 500,
        royalty: 70,
        status: 'planning',
        estimatedPages: 180,
        estimatedChars: 108000,
        targetReader: '英語学習の常識をひっくり返したい層',
        positioning: 'I have got = I have、Fine Thank You And You?、Let\'s Enjoy English ほか嘘翻訳の系譜',
        categories: ['語学', 'エッセイ・コラム'],
        keywords: ['日本人英語', '嘘翻訳', '英会話', '中学英語', 'ユーモア'],
        foreword: '',
        parts: [],
        afterword: '',
        editorNotes: ['元記事候補: 011, 012, 056, 080, 089, 108, 112, 119'],
    },
    {
        id: 'vol-5',
        vol: 5,
        title: '日本人英語事件簿 第5巻',
        subtitle: '捜査官の手記 ── なぜ俺は警察ごっこを始めたのか',
        author: 'とにお',
        series: '日本人英語事件簿シリーズ',
        price: 500,
        royalty: 70,
        status: 'planning',
        estimatedPages: 200,
        estimatedChars: 120000,
        targetReader: 'シリーズ完走読者・個人開発者・コンテンツ作家',
        positioning: '自伝・哲学・開発記録系の総決算。RPG/Tonio Life/居酒屋TOEIC の3商品の裏側',
        categories: ['エッセイ・コラム', '人文・思想', 'ビジネス'],
        keywords: ['個人開発', '英語学習', 'コンテンツ', '自伝', 'バイブコーディング'],
        foreword: '',
        parts: [],
        afterword: '',
        editorNotes: ['元記事候補: 048, 074, 094, 095, 096, 097, 098, 100, 109, 110, 122, 126, 127, 131, 134'],
    },
];
