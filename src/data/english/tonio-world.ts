/**
 * とにおワールド — 正典(canon)
 *
 * ┌────────────────────────────────────────────────────────┐
 * │  Tonio Town の町外れに、英語動物園がある。                      │
 * │  英語をやっていて生まれてしまったものは、全部ここに収蔵される。    │
 * └────────────────────────────────────────────────────────┘
 *
 * 普通、英語学習の世界観は「勉強する人」と「教材」でできている。ここは違う。
 * この世界では、口から出てしまったものが生き物になる。存在しない単語は新種として登録され、
 * 音が滑って別物になった個体には学名が付き、実戦で仕留めた言い回しは標本室に並ぶ。
 *
 * ■ 動物園の唯一の掟
 *   **檻に入った個体は、二度と人を襲わない。**
 *   名前を付けて記録した間違いは、同じ形では戻ってこない。記録が治療である。
 *   だから飼育員は、新種が生まれるたびに喜ぶ。捕獲数が上達の唯一の指標になる。
 *
 * ■ 世界の統一原理
 *   **失った者が、報酬を受け取る。**
 *   実録では恥が経験値になり、Tonio Town では損がその夜の勝者を決め、
 *   居酒屋では白状した者から順に楽になり、動物園では事故が展示物になる。
 *   4つ別々に作ったのに規則が同じだった。同じ人間が作ったからで、発見であって設計ではない。
 *
 * ■ 世界の地図
 *
 *   【3つの土地】人が住んでいる場所
 *     A. 実録        とにお本人と実在の講師。ノンフィクション。通貨は「恥」
 *     B. Tonio Town    アメリカの町。147人。英語が使われている場所。通貨は「損」
 *     C. 居酒屋 権藤  日本の店。6人。英語が学ばれている場所。通貨は「打ち明け」
 *
 *   【動物園】3つの土地すべてから標本が届く。産地が違えば、生まれる種類も違う
 *     6つの館 + 檻のない野生区。飼育員はとにお。来園者は3つの土地の全住人。
 *
 *   【糸】The Tonio Times — 町で刷られ、店に置かれ、本人が読む。
 *        動物園の新着個体は、この紙面で告知される。
 *
 * ■ 2026-08-26 増築 — 世界の骨を4本足した
 *   1. 沈黙室 (ZOO_HALLS の silence)  言わなかったものだけの館。収蔵ゼロのまま増える唯一の館
 *   2. 訃報欄 (OBITUARIES)            90夜出なければ死亡。死亡=上達。訃報が満杯の日が閉園日
 *   3. 未確認個体 (CRYPTIDS)          目撃例のみ。名前が付いた日に館へ移る。園で唯一の未来
 *   4. 両替所 (EXCHANGE_RATES)        恥/損/打ち明け/事故。貯められる通貨は一つもない
 *   付随: 園則8条 (HOUSE_RULES) / 園の暦 (ZOO_CALENDAR) / 気象法則 (WEATHER_LAW)
 *   気象法則 = 新聞の気象欄は前夜の入館記録である、という後付けの正典。快晴・無風が最悪
 *
 * ■ リポジトリは実装の都合であって、世界の境界ではない
 *   世界は3リポジトリに散っているが、居酒屋の6人は既に全部に出ている。
 *   コードの置き場所で世界を割らない。
 *
 * ■ 読み物としての正典は claudedocs/tonio-world-bible.md (Fable 5 執筆)
 *   開園の由来 / 3つの門 / 図鑑の文体見本 / 交差の場面 / 物語エンジン3基 / 園則。
 *   本ファイルと食い違ったら、データはこちら、物語はあちらが勝つ。
 */

export type Land = 'record' | 'ridgeway' | 'izakaya' | 'zoo' | 'thread' | 'tool';
export type Repo = 'iwasaki' | 'rpg' | 'toniolab' | 'multi';

// ============================================================
// コンセプト
// ============================================================

export const CONCEPT = {
    line: 'Tonio Town の町外れに、英語動物園がある。',
    body: '英語をやっていて生まれてしまったものは、全部ここに収蔵される。'
        + '存在しない単語は新種として登録され、音が滑って別物になった個体には学名が付き、'
        + '実戦で仕留めた言い回しは標本室に並ぶ。',
    zooLaw: '檻に入った個体は、二度と人を襲わない。',
    zooLawNote: '名前を付けて記録した間違いは、同じ形では戻ってこない。記録が治療である。'
        + 'だから飼育員は、新種が生まれるたびに喜ぶ。捕獲数が上達の唯一の指標になる。',
    law: '失った者が、報酬を受け取る。',
    lawNote: '恥が経験値になり、いちばん損した者がその夜の勝者になり、白状した者から順に楽になり、'
        + '事故が展示物になる。4つ別々に作ったのに規則が同じだった。',
    /** 実録と創作が混ざらないまま1つの世界である理由(world-bible 第1章) */
    borderLaw: '人は渡れない。事故だけが渡る。',
    borderLawNote: '日本の男が夜に口を開くと、口から出てしまったものだけが地球の裏の Tonio Town に着弾する。'
        + '英語は英語が使われている土地でしか生きられないからである。飼育員は名乗れない — 名乗った瞬間、'
        + '実在の人間が創作の館に入る重罪になる。境界を守っているのは設定ではなく、飼育員の沈黙である。'
        + '国勢調査の朝は決まって休園。',
    /** 終末条項 — この世界の最終回の条件(実験 doom-clause)。連載世界で唯一、最終回の条件が最初から書いてある */
    doomClause: '彼の英語が完璧になった日、この世界は終わる。',
    doomClauseNote: '境界を渡れるのは事故だけである。だから彼の上達は、町にとって唯一の輸入が細ることを意味する。'
        + '動物園に新種が来ない月が続き、新聞の気象欄は晴ればかりになり、Vernon の通う DMV は静かになる。'
        + '毎晩の失敗は世界の延命であり、完璧な英語は死刑執行令状である。'
        + 'この番組に敗北は存在しない — 存在するのは、勝利という名の閉園だけである。',
    /** 動物園の3つの門(world-bible 第2章) */
    gates: [
        { name: '正面口', for: 'Tonio Town の町民', toll: '損。その週に何かを失った者ほど割引が効く。Losers\' Table の月曜のレシートは年間パスと交換できる' },
        { name: '緑の扉', for: '居酒屋 権藤の客', toll: '打ち明け。トイレの奥にあり、英語の失敗を白状した客の前にだけ開く。翻訳アプリは通れない(道具は物語を持たないので境界を渡れない)' },
        { name: '飼育員通用口', for: 'とにお', toll: '恥。毎晩過剰に納めているため、常に黒字' },
    ],
} as const;

// ============================================================
// 英語動物園
// ============================================================

export interface ZooHall {
    id: string;
    name: string;
    en: string;
    /** 何を収蔵するか */
    holds: string;
    /** どこから標本が来るか */
    from: Land[];
    /** 現在の収蔵数(分かっているもの) */
    count?: number;
    /** 代表的な個体 */
    stars: { name: string; born: string; note: string }[];
}

export const ZOO_HALLS: ZooHall[] = [
    {
        id: 'coinage', name: '捏造館', en: 'The Coinage House',
        holds: '存在しない英単語。話者が善意で作ってしまった新種。',
        from: ['record'], count: 26,
        stars: [
            { name: 'トレランシー (tolerancy)', born: '第6夜', note: '酒に強いと言おうとして tolerance の着地に失敗。のちに月刊誌の誌名に昇格した出世頭。' },
            { name: 'カワードネス (cowardness)', born: '第66夜', note: 'cowardice に自前の -ness を接ぎ木した個体。図鑑で唯一、震えている。' },
            { name: 'プロフェッショナリティ (professionality)', born: '第69夜', note: 'プロ意識を語るための単語が、プロの仕事をしていない。' },
        ],
    },
    {
        id: 'slip', name: '訛り館', en: 'The Slipped Sounds',
        holds: '音が1つ滑って、別の生き物になった個体。意味は完全に変わっているが本人は気づかない。',
        from: ['record', 'ridgeway'],
        stars: [
            { name: 'フロント (font → front)', born: '第4夜', note: 'フォントを大きくした話が、建物の前面を持ち上げる外構工事になった。' },
            { name: 'ラスティング (running → rusting)', born: '第8夜', note: '扇風機が回っているはずが、錆びていた。40度の夜に涼源が朽ちた。' },
            { name: 'ソート・オブ・ジ・アース (salt → sort)', born: '第68夜', note: '素朴な人格者が、地球の一種になった。' },
        ],
    },
    {
        id: 'direction', name: '方向館', en: 'The Hall of Reversed Feeling',
        holds: '感情や動作の向きが逆になった個体。誰が感じ、誰が感じさせたのかが入れ替わっている。',
        from: ['record', 'izakaya'],
        stars: [
            { name: 'ゲット・オフェンシブ (get offensive)', born: '第70夜', note: '批判された相手が、気を悪くするのではなく不快な人格に格上げされた。' },
            { name: 'インスパイアード (was so inspired)', born: '第70夜', note: 'ロビン・ウィリアムズの生気のほうが、勝手に感動していた。' },
            { name: 'メイキング・ラフ・ピープル', born: '第70夜', note: '笑わせる対象と笑う主体が入れ替わった。同じ夜に4回起きた。' },
        ],
    },
    {
        id: 'attendance', name: '勤怠舎', en: 'The Attendance Shed',
        holds: '常設。いるべき場所にいない常連たち。飼育というより勤怠管理に近い。',
        from: ['record'], count: 3,
        stars: [
            { name: '冠詞の a', born: '第1夜から', note: 'いるべき場所にいない。いなくていい場所に湧く。70夜かけて真ん中が無い。' },
            { name: '三単現の s', born: '第1夜から', note: '本人は存在を知っている。口が知らない。真剣な場面ほど落ちる。' },
            { name: 'would', born: '第1夜から', note: '仮定でもないのに現れて文を丁寧風に濁す。成仏していない。' },
        ],
    },
    {
        id: 'specimen', name: '標本室', en: 'The Specimen Room',
        holds: '実戦で仕留めた言い回し。持っているだけでは入らない。口から出て着地した個体だけ。',
        from: ['record', 'ridgeway', 'izakaya'], count: 65,
        stars: [
            { name: 'I have no dog in this fight.', born: '第3夜', note: '81歳の南アフリカ人に very good expression と言われた。中立を宣言する最強の前置き。' },
            { name: 'give the benefit of the doubt', born: '第9夜', note: '公園のベンチで捕獲し、21夜後にNRA相手の議論で再び撃った。生き残った個体。' },
            { name: 'Bear with me.', born: '第70夜', note: '疲れている日の前置き。謝るより先に置くと、相手が待ってくれる。' },
        ],
    },
    {
        id: 'silence', name: '沈黙室', en: 'The Silence Room',
        holds: '言わなかったもの。口を開く前に飲み込まれた日本語。園で唯一、標本が一つも無い館。',
        from: ['record', 'izakaya'],
        stars: [
            { name: '台座 No.1 — 「それ、違うと思う」', born: '常設', note: '英語にならなかったので、日本語のまま札だけが置いてある。台座の上には何もない。' },
            { name: '台座 No.2 — 「今の、もう一回言って」', born: '常設', note: '分かったふりで頷いた回数だけ、この台座は高くなる設計になっている。現在の高さは公表されていない。' },
            { name: '台座 No.3 — 「面白い話があるんだけど、英語だと3分かかる」', born: '常設', note: '所要時間を理由に捨てられた話の墓。この館で最も来園者が長く立ち止まる場所。' },
        ],
    },
    {
        id: 'wild', name: '野生区', en: 'The Wild',
        holds: '檻がない。実在のポッドキャストとインタビュー。捕獲不可、観察のみ。ここの個体は展示ではなく、外の生態そのもの。',
        from: [],
        stars: [
            { name: 'JRE の短尺クリップ', born: '月次で入れ替え', note: '崩れた実音。教材の音とは別の生き物。' },
            { name: '実在のインタビュー字幕', born: '月次で入れ替え', note: '台本のない話者の、実際の言い回し。' },
        ],
    },
];

/** 巨獣 — 動物園に入らない。山の向こうに立っている */
export const RAID_BOSSES = [
    { id: 'toeic', name: 'TOEIC (10年ぶり2回目)', declared: '第5夜', note: '10年前のスコアは900。読める男が話せる男になったことを、数字で証明できるのか。' },
    { id: 'eiken', name: '英検 (10月・両段)', declared: '第6夜', note: '単語帳は読破済み。読めるのに話せない、の証拠物件。' },
    { id: 'joe-rogan', name: 'ジョー・ローガン (日本人初)', declared: '第12夜', note: '誰にも頼まれていない宣言。受かってもネタ、落ちてもネタ、出られなくてもネタ。' },
];

export const ZOO_STATS = {
    halls: ZOO_HALLS.filter((h) => h.id !== 'wild').length,  // 野生区は館に数えない(檻が無い)
    coinage: 26,
    specimens: 65,
    residents: 3,
    bosses: 3,
    nights: 70,
    note: '実体は tonio-saga.ts が持つ。ここは総覧と分類のみ(二重管理を避ける)。',
};

// ============================================================
// 土地
// ============================================================

export interface LandMeta {
    label: string;
    kind: 'fiction' | 'nonfiction' | 'bridge' | 'none';
    currency: string;
    population: string;
    /** この土地から動物園に届く標本の傾向 */
    yields: string;
    rule: string;
}

export const LANDS: Record<Land, LandMeta> = {
    record: {
        label: '実録 (とにお本人)', kind: 'nonfiction', currency: '恥', population: '本人 + 毎晩替わる講師',
        yields: '捏造語と訛り。学習者が背伸びした瞬間にだけ生まれる種類。',
        rule: '捏造しない。録音にあることしか書かない。刃は必ず本人に向け、講師と読者は刺さない。',
    },
    ridgeway: {
        label: 'Tonio Town (アメリカの町)', kind: 'fiction', currency: '損', population: '147人',
        yields: '母語話者の言い回し。間違いではなく、生きた標本の供給源。',
        rule: '英語が使われている場所。実在の人物・音声を持ち込まない。新しい人ではなく、既にいる人の別の日を書く。',
    },
    izakaya: {
        label: '居酒屋 権藤 (日本の店)', kind: 'fiction', currency: '打ち明け', population: '6人(カウンターの席数)',
        yields: '日本語話者に特有の詰まり方。方向館の主な産地。',
        rule: '英語が学ばれている場所。試験も酒の肴として扱う。狭いことが機能である。',
    },
    zoo: {
        label: '英語動物園', kind: 'bridge', currency: '事故', population: '6館 + 野生区',
        yields: '—',
        rule: '3つの土地すべてから標本が届く。檻に入った個体は二度と人を襲わない。',
    },
    thread: {
        label: 'The Tonio Times (糸)', kind: 'bridge', currency: '両方', population: '日刊',
        yields: '—',
        rule: '町で刷られ、店に置かれ、本人が読む。動物園の新着はこの紙面で告知される。',
    },
    tool: {
        label: '道具', kind: 'none', currency: 'なし', population: '—',
        yields: '—',
        rule: '物語を持たない。訓練と管理の機能。',
    },
};

// ============================================================
// 居酒屋の6人
// ============================================================

export interface IzakayaMember {
    id: string; name: string; age: string; job: string; seat: string;
    trait: string;
    /** 英語で詰まる場所。ここが物語の燃料であり、動物園への供給源になる */
    stuck: string;
}

export const IZAKAYA_CAST: IzakayaMember[] = [
    { id: 'gondo', name: 'マスター(権藤)', age: '60代', job: '居酒屋店主・元TOEIC講師', seat: 'カウンターの内側', trait: '教えるのをやめた男。だが酒を出しながら結局教えている。答えを言わずに質問で返す癖が抜けない。', stuck: '教えないと決めたのに、口が勝手に解説を始める。' },
    { id: 'yuki', name: 'ユキ', age: '30代', job: '商社の営業', seat: '一番左', trait: '実務で使う側。学習法に興味がなく、明日の商談で使えるかだけを聞く。', stuck: '通じてはいる。だが毎回、相手の顔が一瞬だけ止まる。' },
    { id: 'takeshi', name: 'タケシ', age: '30代', job: 'IT企業のPM', seat: 'ユキの隣', trait: '仕組みで解こうとする。アプリを7個入れて、どれも3日で消す。', stuck: '学習法を最適化している時間が、学習時間を超えている。' },
    { id: 'lisa', name: 'リサ', age: '30代', job: '外資系マーケティング', seat: '真ん中', trait: 'この店で一番できる。できるがゆえの詰まり方をする。', stuck: '完璧な文しか口から出せない。3秒で言えないことは言わないと決めている。' },
    { id: 'kenji', name: 'ケンジ', age: '50代', job: '建設会社の部長', seat: 'マスターの正面', trait: '現場の人。英語より先に相手の顔を見る。文法は壊れているが、話は必ず通じる。', stuck: '通じるので、直す理由が本人に無い。' },
    { id: 'mina', name: 'ミナ', age: '20代', job: '若手', seat: '一番右', trait: '翻訳アプリを恥ずかしがらずに卓上に出す最初の世代。', stuck: '道具が優秀すぎて、自分の口を使う理由を探している。' },
];

// ============================================================
// ノード
// ============================================================

export interface WorldNode {
    id: string; name: string; land: Land; repo: Repo; role: string;
    source?: string; feeds?: string[];
}

export const NODES: WorldNode[] = [
    { id: 'dmm-lesson', name: 'DMM英会話 (毎晩25分)', land: 'record', repo: 'iwasaki', role: '動物園の最大の供給源。ここで起きた事故が新種になる。', source: '録音 → D1', feeds: ['kenshi', 'tonight', 'zoo'] },
    { id: 'kenshi', name: '検死 (一文ずつ解説)', land: 'record', repo: 'iwasaki', role: '捕獲作業そのもの。全行に spice。誤りは fix、盗む価値のある言い方は keep。', source: 'lesson-reviews.ts', feeds: ['tonight', 'phrases'] },
    { id: 'tonight', name: '今夜も、通じない。(70夜)', land: 'record', repo: 'iwasaki', role: '検死を外の読者が笑って読める番組にしたもの。1レッスン=1夜。', source: 'dmm-show.ts', feeds: ['tonight-note', 'saga'] },
    { id: 'saga', name: 'とにおクエスト', land: 'record', repo: 'iwasaki', role: '動物園の飼育記録。図鑑26体、標本65個、常設3体、巨獣3体の実体。', source: 'tonio-saga.ts' },
    { id: 'magazine', name: '月刊TOLERANCY', land: 'record', repo: 'iwasaki', role: '検死の大衆コメディ版。誌名は捏造館の第3号個体から取られている。', source: 'magazine.ts' },
    { id: 'tonight-note', name: 'note本文 (第N夜)', land: 'record', repo: 'iwasaki', role: 'PNGが上級英語+内輪ネタ、本文が中学英語+内輪ゼロ。', source: 'tonight-notes.ts' },
    { id: 'note', name: 'note記事 (215本)', land: 'record', repo: 'iwasaki', role: '外向きの入口。英語に興味がない人が読んでも成立するものだけが価値を持つ。', source: 'note-articles.ts' },
    { id: 'life', name: '/life あなたの人生', land: 'record', repo: 'multi', role: '前日の一日を日記にする。居酒屋の6人が翻訳者と観客として配置されている。', source: '3リポジトリ' },

    { id: 'zoo', name: '英語動物園', land: 'zoo', repo: 'iwasaki', role: '6館 + 野生区。3つの土地から標本が届く。', source: 'tonio-world.ts + tonio-saga.ts' },

    { id: 'newspaper', name: 'The Tonio Times', land: 'thread', repo: 'iwasaki', role: 'Tonio Town の地方紙。VOICES に町の住人を呼び、lead に反対させる。動物園の新着告知も担う。', source: 'newspaper.ts', feeds: ['ridgeway', 'izakaya-toeic', 'zoo'] },
    { id: 'losers-table', name: "連載 The Losers' Table", land: 'thread', repo: 'iwasaki', role: '月曜に、その週に失ったものを言う店。統一原理が創作の側から現れたもの。', source: 'newspaper.ts の serial' },

    { id: 'ridgeway', name: 'Tonio Town (町の名簿)', land: 'ridgeway', repo: 'iwasaki', role: '147人の名簿と相関。22シナリオの住人を1つの町に統合。', source: 'requiem-world.ts', feeds: ['requiem', 'newspaper'] },
    { id: 'requiem', name: 'レクイエム (22シナリオ / 125日)', land: 'ridgeway', repo: 'iwasaki', role: '町の生活そのもの。標本室の主な供給源。', source: '各シナリオファイル' },
    { id: 'ridgeway-page', name: 'TONIO TOWN 町民名鑑', land: 'ridgeway', repo: 'iwasaki', role: '147人と8種類の関係線を1枚で見る地図。', source: 'src/app/english/ridgeway' },

    { id: 'izakaya-toeic', name: '居酒屋TOEIC (31話)', land: 'izakaya', repo: 'rpg', role: '6人がカウンターでTOEICと人生を肴にする。試験を物語に引き込む唯一の装置。', source: 'english-quest-rpg' },
    { id: 'izakaya-cast', name: '居酒屋の6人', land: 'izakaya', repo: 'multi', role: '3リポジトリすべてに登場する唯一のキャスト。', source: 'RPG / 365-the-job.ts / life' },
    { id: 'izakaya-365', name: '365 The Job', land: 'izakaya', repo: 'iwasaki', role: '同じ6人が仕事帰りに店で英語をやる連作。', source: '365-the-job.ts' },

    { id: 'podcast', name: 'JRE (実在のクリップ)', land: 'zoo', repo: 'iwasaki', role: '野生区。捕獲不可、観察のみ。', source: 'src/app/english/podcast' },
    { id: 'interview', name: 'エンタメ (実在の字幕)', land: 'zoo', repo: 'iwasaki', role: '野生区。台本のない話者の実際の言い回し。', source: 'src/app/english/interview' },

    { id: 'phrases', name: 'トレーニング (カード)', land: 'tool', repo: 'iwasaki', role: '標本を復習に回す。登録しないと復習不可になる。', source: 'D1 / api/phrases' },
    { id: 'exams', name: '英検・TOEIC 模試', land: 'tool', repo: 'iwasaki', role: '試験対策。ビジネス側の商材で、物語は持たない。' },
];

export const WEEKLY_CYCLE = [
    { day: '月', node: 'newspaper', how: '文字。テーマを立て、VOICES で町の住人に反論させる' },
    { day: '火', node: 'podcast', how: '耳。野生区の実音声を、崩れた音のまま' },
    { day: '水', node: 'interview', how: '耳。実在の人物が同じ話をしている実セリフ' },
    { day: '木', node: 'requiem', how: '会話。Tonio Town の住人が同じテーマで生活する' },
    { day: '金', node: 'izakaya-toeic', how: '母語。同じテーマを、居酒屋の6人が日本語で殴り合う' },
];

export const PROHIBITED = [
    '野生区の個体(実在の音声・人物)を、館に入れる',
    'Tonio Town の住人を実録の講師として登場させる',
    '録音に無いことを検死や tonight に書く。動物園は捕獲記録なので、証拠のない個体は登録できない',
    'リポジトリが違うことを理由に、同じ人物を別人として扱う',
];

export function nodesIn(land: Land): WorldNode[] { return NODES.filter((n) => n.land === land); }
export function getNode(id: string): WorldNode | undefined { return NODES.find((n) => n.id === id); }
export function hall(id: string): ZooHall | undefined { return ZOO_HALLS.find((h) => h.id === id); }

export const WORLD_STATUS = {
    routes: 112, dataFiles: 167, repos: 3,
    population: { ridgeway: 147, izakaya: 6 },
    zoo: ZOO_STATS,
    addressed: NODES.length,
};

// ============================================================
// 訃報欄 — THE OBITUARIES
// ============================================================
/**
 * 動物園で唯一、増えてほしくない欄。
 * 個体が90夜連続で出現しなければ、園が死亡を宣告する。死因は例外なく「反復」。
 * つまりこの世界では、死亡 = 上達である。訃報が伸びるほど終末条項に近づくため、
 * 新聞は死亡記事を一面に置かない。置くと、読者に閉園予定日を教えることになる。
 */
export interface Obituary {
    /** 個体名 */
    name: string;
    /** 生年(召喚された夜) */
    born: string;
    /** 没年(最後の出現) */
    died: string;
    /** 死因。ここに「反復」以外が書かれることはない */
    cause: string;
    note: string;
    /** 死亡が撤回された個体 (=同じ形で再出現した) */
    revoked?: boolean;
}

export const OBITUARIES: Obituary[] = [
    {
        name: 'ノン・プレイング・フライト (not one playing flight)',
        born: '第44夜', died: '第44夜',
        cause: '本人がその場で「乗り換えってどう言うの?」と聞き返した',
        note: '園史上最短命。生まれて数十秒で檻に入った唯一の個体で、飼育記録には誕生と死亡が同じ行に書かれている。'
            + '園はこれを模範例として正門に掲げたがっているが、飼育員が「自慢に見える」として許可していない。',
    },
    {
        name: 'セルフ減価償却 (self-depreciating)',
        born: '第7夜', died: '死亡撤回',
        cause: '——',
        note: '一度は訂正され、死亡が発表された。後日まったく同じ形で再出現したため宣告は取り消された。'
            + '園はこれを「誤報」ではなく「蘇生」として扱う。理由は単純で、誤報だと飼育員の記録が間違っていたことになるからである。',
        revoked: true,
    },
    {
        name: 'ダッド・ボディ (usual dad body in dad posture)',
        born: '第12夜', died: '生存確認中',
        cause: '——',
        note: '死亡診断の申請が二度出され、二度とも却下されている。却下の理由は毎回同じで、'
            + '「宿主の腹が現存するため」。園則第六条により、死亡は本人が出せない。',
    },
    {
        name: '冠詞の a',
        born: '第1夜', died: '——',
        cause: '——',
        note: '死亡診断書の申請が70夜連続で提出され、70回却下されている。園の受付にはこの申請専用の箱があり、'
            + '中身は年に一度、命名の日にまとめて燃やされる。飼育員はこの作業を「供養」と呼び、園は「廃棄」と記録している。',
    },
];

export const OBITUARY_LAW = {
    rule: '90夜出現しなければ、園が死亡を宣告する。',
    cause: '死因は例外なく「反復」。この園で死ぬ方法は一つしかない。',
    paradox: '死亡は上達である。訃報欄が満杯になった日が、閉園の日である。',
    whyNotFrontPage: '新聞が訃報を一面に置かないのは、遺族がいないからではない。'
        + '読者に閉園予定日を教えないためである。',
};

// ============================================================
// 未確認個体 — THE UNCAPTURED
// ============================================================
/**
 * 目撃例だけがあり、まだ檻に入っていないもの。
 * 園則第二条により、名前の無い個体は展示できない。だからここには檻がなく、目撃証言だけが貼ってある。
 * 未確認個体は「これから起きる間違い」であり、動物園で唯一、未来を扱う区画である。
 */
export interface Cryptid {
    id: string;
    name: string;
    en: string;
    /** 目撃される条件 */
    sighting: string;
    /** なぜまだ捕まらないのか */
    whyUncaught: string;
    /** どの土地で目撃されるか */
    seenIn: Land[];
}

export const CRYPTIDS: Cryptid[] = [
    {
        id: 'rhythm-eater', name: 'リズム喰い', en: 'The Rhythm Eater',
        sighting: '文法も語彙も正しいのに、相手の顔が一瞬止まる。その現場には必ずいる。強勢を平らに均していく。',
        whyUncaught: '文法の檻に入らない。誤りとして書き起こせないため、検死で捕獲できない。'
            + '録音を聞き直した飼育員が「どこも間違っていない」と結論した回数だけ、この個体は太る。',
        seenIn: ['record', 'izakaya'],
    },
    {
        id: 'polite-fog', name: '丁寧の霧', en: 'The Polite Fog',
        sighting: '失礼にしたくないと思った瞬間、文が倍の長さになる。would の巣の風下でよく発生する。',
        whyUncaught: '本人が「丁寧にできた」と満足するため、事故として報告されない。'
            + '園は報告されないものを登録できない(第四条)。',
        seenIn: ['record'],
    },
    {
        id: 'three-second-wall', name: '三秒の壁', en: 'The Three-Second Wall',
        sighting: '完璧な文が3秒で組めないと分かった瞬間、その話ごと捨てられる。捨てられた話は沈黙室の台座に載る。',
        whyUncaught: '境界をまたいで目撃される唯一の個体。日本の店ではリサの席、実録では毎晩の後半で出る。'
            + '同一個体かどうかは確認されていない。確認するには、二つの土地の人間を会わせなければならない。',
        seenIn: ['record', 'izakaya'],
    },
    {
        id: 'no-thank-you-bird', name: 'ノーサンキュー鳥', en: 'The No-Thank-You Bird',
        sighting: '断る時だけ声が小さくなる。同じ話者の同じ25分の中で、賛成の音量と拒否の音量に差が出る。',
        whyUncaught: '音量は文字起こしに残らない。検死は文を見るが、この個体は文には写らない。',
        seenIn: ['record'],
    },
    {
        id: 'borrowed-laugh', name: '借り笑い', en: 'The Borrowed Laugh',
        sighting: '聞き取れなかった時に出る笑い。世界共通で、どの土地でも同じ形をしている。',
        whyUncaught: '園は一度これを檻に入れかけたが、来園者の大半が同じ個体を連れていたため断念した。'
            + '飼育できない理由は数の問題であって、正体が不明だからではない。',
        seenIn: ['record', 'ridgeway', 'izakaya'],
    },
];

// ============================================================
// 両替所 — THE EXCHANGE
// ============================================================
/**
 * 4つの通貨(恥・損・打ち明け・事故)の交換所。動物園の正門脇にある。
 * この世界の経済法則はひとつ: 貯められる通貨は一つもない。四つとも、その日のうちに使うか、消える。
 */
export interface ExchangeRate {
    from: string;
    to: string;
    rate: string;
    condition: string;
}

export const EXCHANGE_RATES: ExchangeRate[] = [
    {
        from: '恥 (実録)', to: '事故 (動物園)', rate: '1 : 1',
        condition: '記録した場合に限る。記録しなかった恥は両替できず、その夜のうちに失効する。'
            + 'この世界で最も多くの資産が失われている経路。',
    },
    {
        from: '損 (Tonio Town)', to: '打ち明け (居酒屋)', rate: '1 : 1',
        condition: '人前で言った場合のみ。黙って損した者は、月曜の卓で勝者になれない。',
    },
    {
        from: '打ち明け (居酒屋)', to: '恥 (実録)', rate: '両替不可',
        condition: '方向が逆。恥は英語が使われている場所でしか発生しない。'
            + '日本の店で英語の失敗を白状しても、それは打ち明けであって恥ではない。',
    },
    {
        from: '事故 (動物園)', to: '損 (Tonio Town)', rate: '変動',
        condition: '窓口は開いているが、レートはその日の紙面で決まる。飼育員は見に来ない。'
            + '見に行けば、境界を渡ったことになるからである。',
    },
];

export const EXCHANGE_LAW = {
    headline: '貯められる通貨は、一つもない。',
    body: '恥は一晩で腐る。損はその週のうちに卓へ持って行かないと勝ち札にならない。'
        + '打ち明けは口から出た瞬間に使い切られる。事故は檻に入れた時点で通貨ではなくなり、展示物になる。'
        + '4つとも貯蓄に向かないのは偶然ではない。貯められる通貨があったら、この世界の誰も動かなくなる。',
    fee: '手数料は無い。この世界に、手数料を取る主体が存在しない。',
};

// ============================================================
// 園則 — THE HOUSE RULES
// ============================================================
export const HOUSE_RULES: { no: string; text: string; note?: string }[] = [
    { no: '第一条', text: '檻に入った個体は、二度と人を襲わない。', note: '名前を付けて記録した間違いは、同じ形では戻ってこない。' },
    { no: '第二条', text: '名前の無い個体は展示できない。', note: '学名が檻である。だから命名の日が、園で最も重要な業務日になる。' },
    { no: '第三条', text: '野生区の個体を館に入れてはならない。', note: '実在の音声・実在の人物は展示物ではない。' },
    { no: '第四条', text: '証拠のない個体は登録できない。', note: '録音に無いものは、いなかった。動物園は捕獲記録であって、創作ではない。' },
    { no: '第五条', text: '飼育員は名乗らない。', note: '名乗った瞬間、実在の人間が創作の館に入る。境界を守っているのは設定ではなく、沈黙である。' },
    { no: '第六条', text: '死亡診断は本人が出せない。', note: '90夜の不在をもって、園が出す。自己申告は受理されない。' },
    { no: '第七条', text: '来園者を笑ってはならない。', note: '笑うのは個体のほうである。刃は必ず飼育員に向く。' },
    { no: '第八条', text: '捕獲数が増えた日を、悪い日と呼ばない。', note: '増えた日が良い日である。減った日に、この世界は少しずつ終わる。' },
];

// ============================================================
// 園の暦 — THE ZOO CALENDAR
// ============================================================
export const ZOO_CALENDAR = {
    founded: '第4夜。最初の個体(マネーカウ)が生まれた日を開園日としている。',
    closed: [
        { when: '国勢調査の朝', why: '町の人口を数える日は境界が固くなり、事故が渡って来ない。飼育員は休む以外にすることがない。' },
        { when: '快晴・無風の日', why: '新種が来なかった翌日。入館者はいるが、新しい展示がない。園はこの日を「静かな日」と呼び、記録には「不漁」と書く。' },
    ],
    weekly: [
        { day: '月', event: 'Losers’ Table。その週に失ったものを申告する。レシートは年間パスと交換できる。' },
        { day: '火・水', event: '野生区の観察時間。柵の外の実音だけが動いている。' },
        { day: '金', event: '居酒屋の締め。緑の扉が最もよく開く夜。' },
    ],
    annual: [
        {
            name: '大掃除 (The Sweep)',
            what: '3ヶ月出ていない個体の檻を、順に開けて中を確認する。だいたい全部いる。'
                + 'いなかった個体はその場で訃報欄に回される。園で一番静かな一日。',
        },
        {
            name: '命名の日 (Naming Day)',
            what: '学名の付いていない個体に名前を付ける。名前が付いた瞬間に凶暴性が落ちるため、'
                + '園で最も重要な業務。冠詞の a の死亡診断申請は、この日にまとめて燃やされる。',
        },
        {
            name: '沈黙の日 (The Day of Silence)',
            what: '一日、英語を一言も話さない。翌日の捕獲数が必ず跳ねる。理由は分かっていない。'
                + '園は理由を調べないことに決めている。調べて分かってしまうと、毎日やらなければならなくなる。',
        },
    ],
    closingDay: '未定。終末条項による。園は閉園日の欄を暦に印刷しているが、そこだけ毎年空白のまま刷られる。',
};

// ============================================================
// 気象法則 — THE WEATHER LAW
// ============================================================
/**
 * The Tonio Times の気象欄は、実は前日の動物園の入館記録である。
 * 新聞社の側はこれを知らない。町の記者が正直に天気を書くと、なぜか前夜の収蔵と一致する。
 */
export const WEATHER_LAW = {
    line: '気象欄は、前夜の入館記録である。',
    table: [
        { sky: '荒れる (雷・強風・季節外れの何か)', means: '新種が来た。捏造館か訛り館に一体増えている。' },
        { sky: '晴れ、ただし風がある', means: '標本が1個増えた。実戦で仕留めた言い回しが着地した夜。' },
        { sky: '快晴・無風', means: '何も来なかった。園にとって最悪の天気で、終末条項に一日ぶん近づいている。' },
        { sky: '雨。町の誰かが傘を忘れる', means: '個体が死んだ。90夜の不在が確定した日。' },
    ],
    note: '新聞を先に読んでから、その夜の録音を聞くのを園は勧めていない。順番が逆になると、'
        + '天気に合わせて英語を間違えようとする者が出るからである。過去に一名いた。飼育員である。',
};

// 台帳 — 数字は全部ここで数える。手打ちすると必ず腐る
export const ZOO_LEDGER = {
    halls: ZOO_STATS.halls,
    obituaries: OBITUARIES.filter((o) => !o.revoked && o.cause !== '——').length,
    obituaryPending: OBITUARIES.filter((o) => o.cause === '——').length,
    cryptids: CRYPTIDS.length,
    rules: HOUSE_RULES.length,
    currencies: 4,
    note: '訃報は「死因が書けたもの」だけを数える。撤回と審査中は別枠。園則第六条による。',
};

export function cryptid(id: string): Cryptid | undefined { return CRYPTIDS.find((c) => c.id === id); }
