/**
 * 英検1級 毎日10語 -- カレンダー形式の上級語彙
 *
 * /english/everyday-words と同じく「トレーニングのワード(/api/user-words)」に登録できる。
 * ただし Unit制ではなくカレンダー制で、1日10語。好きな語だけ選んで登録する。
 *
 * 例文ルール:
 *   - チョー面白く。でも実際の会話でそのまま使える現実的なシチュ。
 *   - 1文完結、覚えられる長さ。オチがある。
 *   - 「あるある」「自虐」「皮肉」で記憶に残す。
 *   - 訳は日本語で自然に(直訳しない)。
 */

export interface Eiken1DailyWord {
    daySlot: number;     // 1-31 (= day of month)
    month?: string;      // 'YYYY-MM' (default '2026-06')
    en: string;          // 見出し語
    pron: string;        // カタカナ発音
    pos: string;         // 品詞
    ja: string;          // 語義
    example: string;     // 面白い + 使える例文 (EN)
    exampleJa: string;   // 例文の自然な訳
    note: string;        // とにおコメント: いつ・どう使うか / 記憶のフック
}

export interface Eiken1DailyDay {
    date: string;        // YYYY-MM-DD
    theme: string;       // 日本語テーマ
    themeEn: string;     // 英語テーマ
    tagline: string;     // その日の狙い
}

export const EIKEN1_DAILY_DAYS: Record<string, Eiken1DailyDay> = {
    '2026-06-09': {
        date: '2026-06-09', theme: '第一印象を語る形容詞', themeEn: 'First Impressions',
        tagline: '人や物を一言で評する上級形容詞10。"nice" を卒業して、ネイティブが本当に使う語へ。',
    },
    '2026-06-10': {
        date: '2026-06-10', theme: '自分の性格・状態', themeEn: 'About Myself',
        tagline: '自己紹介・近況報告で効く10語。自虐とユーモアで自分を語れるようになる。',
    },
    '2026-06-11': {
        date: '2026-06-11', theme: '困難・逆境', themeEn: 'Hardship & Setbacks',
        tagline: 'ピンチ・苦境・立ち直りを語る10語。ニュースでも人生相談でも使える重め語彙。',
    },
    '2026-06-12': {
        date: '2026-06-12', theme: '性格のクセ', themeEn: 'Personality Quirks',
        tagline: '一筋縄でいかない人を描写する10語。こだわり屋・気まぐれ・潔癖をピンポイントで。',
    },
    '2026-06-13': {
        date: '2026-06-13', theme: 'ネガティブな人物描写', themeEn: 'The Difficult People',
        tagline: 'うざい・ひどい・陰気を上品に毒づく10語。悪口の語彙が一気にプロ級に。',
    },
    '2026-06-14': {
        date: '2026-06-14', theme: '大失敗・修羅場', themeEn: 'Disasters & Drama',
        tagline: '盛大にコケた話を面白く語る10語。"disaster" 一辺倒から脱出する。',
    },
    '2026-06-15': {
        date: '2026-06-15', theme: '雰囲気・ムード', themeEn: 'Atmosphere & Mood',
        tagline: '場の空気・人のオーラを描く10語。穏やか/豪華/切ない、を解像度高く言える。',
    },
    '2026-06-16': {
        date: '2026-06-16', theme: '知性・頭のキレ', themeEn: 'Brains & Wit',
        tagline: '「頭いい」を10通りに言い分ける。賢い/鋭い/博学を、smart 一語から卒業。',
    },
    '2026-06-17': {
        date: '2026-06-17', theme: '食・食い意地', themeEn: 'Food & Cravings',
        tagline: '美味い・ガツガツ・腹ペコを上級語で。グルメも大食いも一語で決まる10語。',
    },
    '2026-06-18': {
        date: '2026-06-18', theme: 'お金・ケチと浪費', themeEn: 'Money & Greed',
        tagline: '倹約から豪遊、極貧から富裕まで。財布の話を上品に毒づく10語。',
    },
    '2026-06-19': {
        date: '2026-06-19', theme: '時間・習慣', themeEn: 'Time & Habits',
        tagline: '絶え間ない/つかの間/差し迫った。時間の流れを精密に言い分ける10語。',
    },
    '2026-06-20': {
        date: '2026-06-20', theme: '議論・口論', themeEn: 'Arguments & Debate',
        tagline: '反論する・なだめる・脱線する。会議や言い争いで効く10語。',
    },
    '2026-06-21': {
        date: '2026-06-21', theme: '恋愛・人間関係', themeEn: 'Love & Relationships',
        tagline: 'ぞっこん/疎遠/仲直り。恋と人付き合いの機微を語る10語。',
    },
    '2026-06-22': {
        date: '2026-06-22', theme: '仕事・職場', themeEn: 'Work & Office',
        tagline: '退屈/勤勉/雑用/迅速化。会社あるあるを上級語で愚痴る10語。',
    },
    '2026-06-23': {
        date: '2026-06-23', theme: '健康・体', themeEn: 'Health & Body',
        tagline: 'だるい/頑健/吐き気/運動不足。体調の話を解像度高く言う10語。',
    },
    '2026-06-24': {
        date: '2026-06-24', theme: '旅・冒険', themeEn: 'Travel & Adventure',
        tagline: '旅への渇望/絶景/秘境。旅行の話が一気にプロっぽくなる10語。',
    },
    '2026-06-25': {
        date: '2026-06-25', theme: '感情の爆発', themeEn: 'Strong Emotions',
        tagline: '激怒/有頂天/意気消沈。angry と happy を捨てて感情を上書きする10語。',
    },
    '2026-06-26': {
        date: '2026-06-26', theme: '嘘・ごまかし', themeEn: 'Lies & Deception',
        tagline: '二枚舌/率直/言い逃れ。嘘とその対義語、人を見抜く10語。',
    },
    '2026-06-27': {
        date: '2026-06-27', theme: '自然・天気', themeEn: 'Nature & Weather',
        tagline: '土砂降り/うだる暑さ/極寒。天気の愚痴が上級語で言える10語。',
    },
    '2026-06-28': {
        date: '2026-06-28', theme: '怠惰・無気力', themeEn: 'Laziness & Apathy',
        tagline: '怠惰/無関心/現状満足。ぐうたらを10通りに言い分ける究極の10語。',
    },
    '2026-06-29': {
        date: '2026-06-29', theme: '野心・成功', themeEn: 'Ambition & Success',
        tagline: '粘り強い/手強い/急上昇。勝ち負け・努力・成功を語る10語。',
    },
    '2026-06-30': {
        date: '2026-06-30', theme: '人生・哲学', themeEn: 'Life & Philosophy',
        tagline: '深遠/つかの間/偶然の幸運。人生をしんみり語って締める月末の10語。',
    },

    // ============================================================
    // 2026-07  July -- 句動詞/熟語を厚めに。会話で即使える上級語。
    // ============================================================
    '2026-07-01': {
        date: '2026-07-01', theme: '句動詞①(必出の基本)', themeEn: 'Phrasal Verbs I',
        tagline: '英検1級 大問1は4問が句動詞。まずは過去問常連の鉄板10。会話でもそのまま使える。',
    },
    '2026-07-02': {
        date: '2026-07-02', theme: '句動詞②(お金が動く)', themeEn: 'Phrasal Verbs: Money',
        tagline: '渋々払う/値上げする/かき集める。金の出入りを語る句動詞10。財布が痛い系。',
    },
    '2026-07-03': {
        date: '2026-07-03', theme: '句動詞③(乗り切る・かわす)', themeEn: 'Dodge & Endure',
        tagline: '何とか凌ぐ/うまく逃げる/受け流す。ピンチ処理の句動詞10。社会人の必須スキル。',
    },
    '2026-07-04': {
        date: '2026-07-04', theme: '句動詞④(対立・取り締まる)', themeEn: 'Conflict & Crackdown',
        tagline: '怒鳴り込む/締め付ける/けしかける。ぶつかり合いを語る句動詞10。ニュース頻出。',
    },
    '2026-07-05': {
        date: '2026-07-05', theme: '句動詞⑤(集中・努力・結論)', themeEn: 'Focus & Effort',
        tagline: '本腰を入れる/的を絞る/要するに。仕事を前に進める句動詞10。会議で効く。',
    },
    '2026-07-06': {
        date: '2026-07-06', theme: 'イディオム(状態・慣用)', themeEn: 'Idioms I',
        tagline: 'ボロボロ/しのび寄る/あふれる。状態を一発で描く慣用表現10。語彙が一気に大人びる。',
    },
    '2026-07-07': {
        date: '2026-07-07', theme: '法律・犯罪', themeEn: 'Crime & Law',
        tagline: '横領/偽証/無罪放免。事件ニュースとドラマで必ず出る重め10語。1級長文の常連。',
    },
    '2026-07-08': {
        date: '2026-07-08', theme: '政治・権力', themeEn: 'Politics & Power',
        tagline: '独裁者/現職/制裁。ニュースの政治面がそのまま読めるようになる10語。',
    },
    '2026-07-09': {
        date: '2026-07-09', theme: '経済・財政', themeEn: 'Economy & Finance',
        tagline: '不況/緊縮/補助金。お金の話を経済記事レベルで語る10語。エッセイにも効く。',
    },
    '2026-07-10': {
        date: '2026-07-10', theme: '生き物・自然界', themeEn: 'Wildlife & Nature',
        tagline: '夜行性/冬眠/共生。ネイチャー番組と1級長文に出る生物系10語。',
    },
    '2026-07-11': {
        date: '2026-07-11', theme: '医療・病気', themeEn: 'Medicine & Illness',
        tagline: '慢性/感染性/良性。病院と健康記事で必ず出る10語。体調トークの解像度が上がる。',
    },
    '2026-07-12': {
        date: '2026-07-12', theme: '不安・心のざわつき', themeEn: 'Unease & Worry',
        tagline: '気が気でない/警戒/不貞腐れ。モヤモヤした心理を精密に言う10語。',
    },
    '2026-07-13': {
        date: '2026-07-13', theme: '人を褒める語', themeEn: 'Praise & Virtue',
        tagline: '気さく/誠実/利他的。"nice" を卒業して人を上手に褒める上級10語。',
    },
    '2026-07-14': {
        date: '2026-07-14', theme: '人をけなす語(上品に)', themeEn: 'Refined Insults',
        tagline: '高慢/無神経/執念深い。悪口を知的に毒づく10語。バレずにディスれる。',
    },
    '2026-07-15': {
        date: '2026-07-15', theme: '論証・説得', themeEn: 'Argument & Proof',
        tagline: '裏付ける/もっともらしい/根拠薄弱。議論を組み立てる10語。ライティング超頻出。',
    },
    '2026-07-16': {
        date: '2026-07-16', theme: '認知・推測', themeEn: 'Perception & Inference',
        tagline: '気づかない/推し量る/憶測。頭の中の働きを言い分ける10語。',
    },
    '2026-07-17': {
        date: '2026-07-17', theme: '量・程度', themeEn: 'Quantity & Degree',
        tagline: '潤沢/わずか/法外。多い少ないを上級語で精密に。"a lot" 卒業の10語。',
    },
    '2026-07-18': {
        date: '2026-07-18', theme: '変化・増減', themeEn: 'Change & Trends',
        tagline: '激減/急増/変動。グラフとニュースの動きを語る10語。データ説明に必須。',
    },
    '2026-07-19': {
        date: '2026-07-19', theme: '時間・順序(続)', themeEn: 'Time & Sequence',
        tagline: '即興/その後の/同時の。出来事の前後を精密に言う10語。6月の時間回の続編。',
    },
    '2026-07-20': {
        date: '2026-07-20', theme: '物言い・口調', themeEn: 'Speech & Tone',
        tagline: '能弁/簡潔/ぶっきらぼう。喋り方を10通りに言い分ける。自分の口調も説明できる。',
    },
    '2026-07-21': {
        date: '2026-07-21', theme: '抽象・思考', themeEn: 'Abstract & Ideas',
        tagline: '仮説/逆説/ニュアンス。考えを語る知的な10語。議論とエッセイの土台。',
    },
    '2026-07-22': {
        date: '2026-07-22', theme: '環境問題', themeEn: 'The Environment',
        tagline: '持続可能/排出/枯渇。1級ライティング鉄板テーマの必須10語。',
    },
    '2026-07-23': {
        date: '2026-07-23', theme: '街・建物', themeEn: 'City & Buildings',
        tagline: '老朽化/渋滞/再開発。都市の風景を語る10語。旅行と社会問題の両方で効く。',
    },
    '2026-07-24': {
        date: '2026-07-24', theme: '性格(続)', themeEn: 'Temperament',
        tagline: '風変わり/衝動的/冷静沈着。6月の性格回の続編。自分と他人を解像度高く描く10語。',
    },
    '2026-07-25': {
        date: '2026-07-25', theme: '成功と転落', themeEn: 'Triumph & Downfall',
        tagline: '躍進/大失態/くじく。上り坂と下り坂を語る10語。サクセスストーリーの語彙。',
    },
    '2026-07-26': {
        date: '2026-07-26', theme: '恐怖・パニック', themeEn: 'Fear & Dread',
        tagline: '戦慄/不吉な予感/縮み上がる。怖さを10段階で言い分ける。ホラーも本番直前も。',
    },
    '2026-07-27': {
        date: '2026-07-27', theme: '喜び・上機嫌', themeEn: 'Joy & Good Cheer',
        tagline: 'ご機嫌/満ち足りた/弾む。"happy" を捨てて幸せを上書きする10語。6月の感情回の正の続編。',
    },
    '2026-07-28': {
        date: '2026-07-28', theme: '音・声', themeEn: 'Sound & Voice',
        tagline: '耳をつんざく/くぐもった/しわがれた。音と声を描く10語。描写力が一段上がる。',
    },
    '2026-07-29': {
        date: '2026-07-29', theme: '光・色・見た目', themeEn: 'Light & Looks',
        tagline: '鮮やか/けばけばしい/くすんだ。視覚の印象を言い分ける10語。描写の解像度が上がる。',
    },
    '2026-07-30': {
        date: '2026-07-30', theme: '賢さと愚かさ', themeEn: 'Wit & Folly',
        tagline: '機転/世渡り上手/だまされやすい。頭の良し悪しを語る10語。6月の知性回の裏テーマ。',
    },
    '2026-07-31': {
        date: '2026-07-31', theme: '名句で締め(ことわざ)', themeEn: 'Idioms to Close',
        tagline: '災い転じて福/とどめの一撃/氷山の一角。会話で一目置かれる慣用句10で7月を締める。',
    },
};

export const EIKEN1_DAILY_WORDS: Eiken1DailyWord[] = [
    // ============================================================
    // 2026-06-09  Day: First Impressions
    // ============================================================
    {
        daySlot: 9, month: '2026-06', en: 'urbane', pron: 'アーベイン', pos: 'adj', ja: '洗練された、都会的で物腰の上品な',
        example: "He's so urbane he can make ordering a hot dog sound like fine dining.",
        exampleJa: '彼は洗練されすぎて、ホットドッグの注文すら高級レストランみたいに聞こえる。',
        note: '都会的で上品・そつがない。"sophisticated" の格上。紳士的な物腰の人に。反対は uncouth(無作法)。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'punctilious', pron: 'パンクティリアス', pos: 'adj', ja: '形式・礼儀にやかましい、几帳面すぎる',
        example: "He's so punctilious about email etiquette that 'Hi' instead of 'Dear' ruins his day.",
        exampleJa: '彼はメールの礼儀に細かすぎて、「Dear」じゃなく「Hi」だと一日が台無しになる。',
        note: '細部・礼儀作法に過剰にこだわる。"meticulous" より「うるさい」寄りで、堅苦しさが出る。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'nonchalant', pron: 'ナンシャラント', pos: 'adj', ja: '平然とした、無頓着な',
        example: "She stayed nonchalant even when the waiter accidentally set her sleeve on fire.",
        exampleJa: 'ウェイターにうっかり袖を燃やされても、彼女は平然としてた。',
        note: '動じない・どうでもよさげな態度。フランス語由来でおしゃれ。クールを装う人に。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'gregarious', pron: 'グリゲアリアス', pos: 'adj', ja: '社交的な、群れたがる',
        example: "My grandma is more gregarious than I am — she has more group chats than me.",
        exampleJa: 'うちのばあちゃん、俺より社交的。グループチャットの数で負けてる。',
        note: '"sociable" の格上版。パーティ好き・人懐っこい人に。内向的な自分との対比で使うと面白い。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'ephemeral', pron: 'イフェメラル', pos: 'adj', ja: '儚い、一瞬で消える',
        example: "My motivation to go to the gym is ephemeral — it dies between the parking lot and the door.",
        exampleJa: 'ジムに行くやる気は儚い。駐車場とドアの間で死ぬ。',
        note: '美しいが消えやすいもの。桜・流行・やる気。詩的にも自虐的にも使える。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'cathartic', pron: 'カサーティック', pos: 'adj', ja: '心が浄化される、スッキリする',
        example: "Deleting his number was weirdly cathartic. Blocking him was even better.",
        exampleJa: '彼の番号を消すのは妙にスッキリした。ブロックはもっと良かった。',
        note: '溜まった感情を吐き出してスッキリ。泣く・叫ぶ・断捨離の感想に。名詞は catharsis。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'visceral', pron: 'ヴィセラル', pos: 'adj', ja: '本能的な、腹の底からの',
        example: "I have a visceral reaction to people who chew with their mouth open.",
        exampleJa: '口を開けて噛む人には、腹の底から生理的に無理な反応が出る。',
        note: '理屈抜きの本能的反応・嫌悪。"gut feeling" の形容詞。強い好き嫌いに。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'grandiloquent', pron: 'グランディロクェント', pos: 'adj', ja: '大言壮語の、仰々しく話す',
        example: "His grandiloquent speech about teamwork was just to announce we were out of coffee.",
        exampleJa: 'チームワークについての仰々しい大演説は、ただ「コーヒー切れた」の告知だった。',
        note: '中身に対して言葉が大げさ。"bombastic" の親戚。気取った話し方・大演説をする人に。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'venerable', pron: 'ヴェネラブル', pos: 'adj', ja: '尊敬すべき、由緒ある',
        example: "This venerable diner has survived three recessions and one very persistent raccoon.",
        exampleJa: 'この由緒ある食堂は、3度の不況と1匹のしつこいアライグマを生き延びた。',
        note: '長年の歴史で敬意を集める。人・組織・老舗に。"respected and old"。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-06', en: 'quintessential', pron: 'クィンテッセンシャル', pos: 'adj', ja: '典型的な、まさに〜そのもの',
        example: "Forgetting why you walked into a room is the quintessential adult experience.",
        exampleJa: '何しに来たか忘れるのは、まさに大人の典型的な経験。',
        note: '"the most typical example of" を一語で。「〜の鑑」。最高にそれっぽい例えに。',
    },

    // ============================================================
    // 2026-06-10  Day: About Myself
    // ============================================================
    {
        daySlot: 10, month: '2026-06', en: 'procrastinate', pron: 'プロクラスティネイト', pos: 'v', ja: '先延ばしにする',
        example: "I don't procrastinate. I just give my future self exciting surprises.",
        exampleJa: '俺は先延ばしにしてない。未来の自分にワクワクするサプライズをあげてるだけ。',
        note: 'やるべき事を後回し。学習者の鉄板自虐。"I keep procrastinating" は超頻出。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'ambivalent', pron: 'アンビヴァレント', pos: 'adj', ja: 'どっちつかずの、相反する感情の',
        example: "I'm ambivalent about my birthday — free cake, but one year closer to the void.",
        exampleJa: '誕生日には複雑な気持ち。ケーキはタダだけど、虚無に1年近づく。',
        note: '賛成も反対もある板挟み。"mixed feelings" の知的版。"ambivalent about ~"。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'phlegmatic', pron: 'フレグマティック', pos: 'adj', ja: '冷静沈着な、何事にも動じない',
        example: "My cat stays completely phlegmatic during a fire drill but loses it over a cucumber.",
        exampleJa: 'うちの猫は火災訓練では完全に動じないのに、きゅうり一本で取り乱す。',
        note: '感情を表に出さず落ち着いてる。"calm" の文語版。古代の四体液説由来の1級語。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'indefatigable', pron: 'インディファティガブル', pos: 'adj', ja: '疲れを知らない、不屈の',
        example: "My grandma is indefatigable — she out-shopped, out-walked, and out-talked all of us.",
        exampleJa: 'うちのばあちゃんは疲れを知らない。買い物も歩きもおしゃべりも全員に勝った。',
        note: 'いくらやっても疲れない・粘り強い。"tireless" の格上。働き者・努力家に。1級頻出。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'insufferable', pron: 'インサファラブル', pos: 'adj', ja: '鼻持ちならない、我慢ならない',
        example: "He's insufferable after the gym — one workout and suddenly he's a certified nutritionist.",
        exampleJa: 'ジムの後の彼は鼻持ちならない。一回運動しただけで急に公認栄養士気取り。',
        note: '我慢できないほど嫌味・偉そう。"unbearable" の人物版。うざい奴の上位表現。1級頻出。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'impeccable', pron: 'インペッカブル', pos: 'adj', ja: '完璧な、非の打ち所がない',
        example: "Her timing is impeccable — she always calls the second I sit down to eat.",
        exampleJa: '彼女のタイミングは完璧。俺が食べようと座った瞬間に必ず電話してくる。',
        note: '欠点ゼロ。服装・マナー・タイミングを褒める/皮肉る時。"impeccable taste"。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'flabbergasted', pron: 'フラバガスティッド', pos: 'adj', ja: '仰天した、あんぐりした',
        example: "I was flabbergasted when my 'quick' IKEA shelf took four hours and two arguments.",
        exampleJa: '「すぐ終わる」はずのIKEAの棚が4時間と喧嘩2回かかって、あんぐりした。',
        note: '音からして面白い。"very surprised" の最上級コミカル版。語感で覚える。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'exacerbate', pron: 'イグザサベイト', pos: 'v', ja: '悪化させる',
        example: "Googling your symptoms only exacerbates the panic. Now I apparently have six diseases.",
        exampleJa: '症状をググると不安が悪化するだけ。今や6つの病気持ちらしい。',
        note: '状況をさらに悪くする。"make worse" の格上。ニュース・健康・問題で頻出。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'circumspect', pron: 'サーカムスペクト', pos: 'adj', ja: '用心深い、慎重な',
        example: "I'm circumspect about 'free' trials — they smell like a future 3 a.m. cancellation panic.",
        exampleJa: '「無料」トライアルには慎重だ。未来の午前3時の解約パニックの匂いがする。',
        note: '周りをよく見て慎重に動く。"cautious" の格上。発言・判断の慎重さに。1級頻出。',
    },
    {
        daySlot: 10, month: '2026-06', en: 'windfall', pron: 'ウィンドフォール', pos: 'n', ja: '棚ぼた、思いがけない授かり物',
        example: "Finding twenty bucks in my old winter coat is the only windfall my budget can rely on.",
        exampleJa: '古い冬コートで20ドル発見。それが俺の家計が頼れる唯一の棚ぼた。',
        note: '思いがけない臨時収入・幸運。元は「風で落ちた果実」。"unexpected gain"。1級頻出。',
    },

    // ============================================================
    // 2026-06-11  Day: Hardship & Setbacks
    // ============================================================
    {
        daySlot: 11, month: '2026-06', en: 'indomitable', pron: 'インドミタブル', pos: 'adj', ja: '不屈の、何があっても屈しない',
        example: "Her indomitable will got her through grad school, two moves, and assembling IKEA furniture.",
        exampleJa: '彼女の不屈の意志は、大学院も2回の引っ越しもIKEA家具の組み立ても乗り越えさせた。',
        note: '何があっても屈しない。"indomitable spirit/will" が定番。逆境を語る1級頻出語。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'audacious', pron: 'オーデイシャス', pos: 'adj', ja: '大胆な、ふてぶてしい',
        example: "It's audacious to bring a single sad salad to a barbecue and expect respect.",
        exampleJa: 'BBQに寂しいサラダ一品持ってきて敬意を期待するとは、大胆だな。',
        note: '怖いもの知らず・図々しい。良くも悪くも。"bold" の強い版。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'banal', pron: 'バナル', pos: 'adj', ja: 'ありふれた、陳腐な',
        example: "My weekend was gloriously banal: laundry, snacks, and ignoring every notification.",
        exampleJa: '週末は最高に陳腐だった。洗濯、間食、全通知の無視。',
        note: '平凡で面白みがない・陳腐。"boring/clichéd" の格上。批評・自虐に。1級頻出。発音「バナル/ベイナル」。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'euphoria', pron: 'ユーフォリア', pos: 'n', ja: '多幸感、ハイな気分',
        example: "The euphoria of finding your phone after you were sure you lost it is unmatched.",
        exampleJa: '失くしたと確信したスマホが見つかった時の多幸感は、比類なき。',
        note: '絶頂の幸福感。恋・勝利・安堵。ドラマのタイトルでも有名。形容詞 euphoric。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'scapegoat', pron: 'スケープゴート', pos: 'n', ja: '身代わり、責任を押し付けられる人',
        example: "Every group project has one scapegoat and four people who were 'too busy.'",
        exampleJa: 'グループ課題には必ず生贄が一人と、「忙しすぎる」4人がいる。',
        note: '罪を着せられる人。職場・政治・家族で。動詞でも使える(「〜を生贄にする」)。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'vindicate', pron: 'ヴィンディケイト', pos: 'v', ja: '潔白を証明する、汚名をそそぐ',
        example: "I felt completely vindicated when the 'haunted' noise turned out to be the cat.",
        exampleJa: '「幽霊の」物音が猫だと判明して、完全に潔白が証明された気分だった。',
        note: '疑いが晴れる・正しさが証明される。「ほら言ったろ」の知的版。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'ostensible', pron: 'オステンシブル', pos: 'adj', ja: '表向きの、うわべの',
        example: "The ostensible reason was 'an important meeting.' The real reason was free donuts.",
        exampleJa: '表向きの理由は「重要な会議」。本当の理由はタダのドーナツ。',
        note: '本音と建前の「建前」。副詞 ostensibly も頻出。皮肉に最適。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'garrulous', pron: 'ギャルラス', pos: 'adj', ja: 'おしゃべりな、話が止まらない',
        example: "My barber is so garrulous I now know his entire family's medical history.",
        exampleJa: '床屋がおしゃべりすぎて、今や彼の一族の病歴を全部知ってる。',
        note: '際限なく喋る。"talkative" の強い文語版。タクシー・床屋あるある。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'innocuous', pron: 'イノキュアス', pos: 'adj', ja: '無害な、当たり障りのない',
        example: "It started as an innocuous question and somehow ended in a full family feud.",
        exampleJa: '当たり障りのない質問で始まって、なぜか一族の大確執で終わった。',
        note: '害がない・無難。"harmless" の格上。「無害に見えて実は」の前振りにも。',
    },
    {
        daySlot: 11, month: '2026-06', en: 'peruse', pron: 'ペルーズ', pos: 'v', ja: 'じっくり読む、吟味する',
        example: "I perused the menu for ten whole minutes and still ordered the same thing as always.",
        exampleJa: 'メニューを丸10分吟味して、結局いつもと同じものを頼んだ。',
        note: '「ざっと見る」と誤用されがちだが本来は「精読・吟味」。レストラン・書類で。',
    },

    // ============================================================
    // 2026-06-12  Day: Personality Quirks
    // ============================================================
    {
        daySlot: 12, month: '2026-06', en: 'clandestine', pron: 'クランデスティン', pos: 'adj', ja: '秘密の、内密の',
        example: "We held a clandestine meeting in the break room to plan the boss's surprise party.",
        exampleJa: '上司のサプライズパーティを企てるため、休憩室で秘密会議を開いた。',
        note: 'こっそり行う。スパイ・密会・サプライズ。"secret" のスリリング版。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'fastidious', pron: 'ファスティディアス', pos: 'adj', ja: '潔癖な、好みがうるさい',
        example: "He's so fastidious about coffee that he side-eyes anyone using instant.",
        exampleJa: '彼はコーヒーに潔癖すぎて、インスタント使う奴を横目で睨む。',
        note: '細かいことにうるさい・きれい好き。"picky" の上品版。こだわり屋に。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'magnanimous', pron: 'マグナニマス', pos: 'adj', ja: '度量の大きい、寛大な',
        example: "How magnanimous of you to let me have the last slice you didn't even want.",
        exampleJa: 'どうせ要らない最後の一切れを譲ってくれるとは、なんて寛大なんだ。',
        note: '心が広い・気前がいい。皮肉でも本気でも。勝者の余裕にも。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'precarious', pron: 'プリケアリアス', pos: 'adj', ja: '不安定な、危なっかしい',
        example: "My work-life balance is as precarious as a full coffee cup on a moving train.",
        exampleJa: '俺のワークライフバランスは、走る電車の満タンのコーヒーカップ並みに危うい。',
        note: 'グラグラで危うい。経済・足場・関係に。"unstable" の文語版。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'surreptitious', pron: 'サレプティシャス', pos: 'adj', ja: 'こっそりした、ひそかな',
        example: "She took a surreptitious bite of cake before announcing she was 'on a diet.'",
        exampleJa: '「ダイエット中」と宣言する前に、彼女はこっそりケーキを一口かじった。',
        note: '人目を盗んで。"surreptitious glance"(盗み見)。clandestine より行動寄り。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'ebullient', pron: 'エビュリエント', pos: 'adj', ja: '元気いっぱいの、陽気で沸き立つような',
        example: "She's so ebullient that even her out-of-office reply somehow has three exclamation points.",
        exampleJa: '彼女は陽気すぎて、不在通知の自動返信にすらなぜかビックリマークが3つ付いてる。',
        note: '喜びとエネルギーが沸き立つように溢れる。"lively/enthusiastic" の格上。テンション高い人に。1級頻出。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'zealous', pron: 'ゼラス', pos: 'adj', ja: '熱心な、熱狂的な',
        example: "He's a zealous recycler — he'll fish your bottle out of the trash and lecture you.",
        exampleJa: '彼は熱心なリサイクラー。君のボトルをゴミから拾って説教してくる。',
        note: '度を越して熱心。"enthusiastic" の強い版。信者・推し活にも。名詞 zeal。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'juxtapose', pron: 'ジャクスタポーズ', pos: 'v', ja: '並べて対比する',
        example: "Nothing juxtaposes my life like my gym selfie sitting right next to my pizza order.",
        exampleJa: 'ジムの自撮りとピザの注文履歴ほど、俺の人生を対比させるものはない。',
        note: '対照的な物を並べる。アート・写真・議論で。知的でおしゃれ。名詞 juxtaposition。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'capricious', pron: 'カプリシャス', pos: 'adj', ja: '気まぐれな、移り気な',
        example: "The weather here is capricious — it can't decide between spring and the apocalypse.",
        exampleJa: 'ここの天気は気まぐれ。春なのか終末なのか決めかねてる。',
        note: 'コロコロ変わる。天気・人・運に。"moody/fickle" の文語版。',
    },
    {
        daySlot: 12, month: '2026-06', en: 'didactic', pron: 'ダイダクティック', pos: 'adj', ja: '教訓的な、説教くさい',
        example: "Every kids' movie is secretly didactic — even the one about a talking sponge.",
        exampleJa: '子供向け映画はどれも密かに教訓的。喋るスポンジの話でさえ。',
        note: '教え込もうとする。本・映画・人の口調に。やや皮肉で「説教くさい」。',
    },

    // ============================================================
    // 2026-06-13  Day: The Difficult People
    // ============================================================
    {
        daySlot: 13, month: '2026-06', en: 'egregious', pron: 'イグリージャス', pos: 'adj', ja: '目に余る、とんでもなくひどい',
        example: "Putting ketchup on a perfectly good steak is an egregious crime in my house.",
        exampleJa: '完璧なステーキにケチャップは、我が家では目に余る犯罪だ。',
        note: '「とんでもなくひどい」。ミス・違反を強調。"egregious error" は頻出。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'obfuscate', pron: 'オブファスケイト', pos: 'v', ja: 'わざとわかりにくくする、煙に巻く',
        example: "Terms and conditions are designed to obfuscate the part where they take your soul.",
        exampleJa: '利用規約は、魂を奪う部分をわざと分かりにくくするよう作られてる。',
        note: '煙に巻く・ぼかす。政治家・契約書に。"clarify"(明確化)の正反対。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'sycophant', pron: 'シコファント', pos: 'n', ja: 'おべっか使い、ゴマすり',
        example: "The office sycophant laughs at the boss's jokes before he even finishes them.",
        exampleJa: '社内のゴマすり野郎は、上司のジョークが終わる前に笑う。',
        note: 'へつらう人。"yes-man" の知的版。職場あるある。形容詞 sycophantic。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'truculent', pron: 'トラキュレント', pos: 'adj', ja: '喧嘩腰の、攻撃的な',
        example: "He gets truculent the moment anyone dares to question his parallel parking.",
        exampleJa: '縦列駐車に文句を言われた瞬間、彼は喧嘩腰になる。',
        note: 'すぐ突っかかる。"aggressive/hostile" の文語版。怒りっぽい人に。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'ineffable', pron: 'イネファブル', pos: 'adj', ja: '言葉にできない、筆舌に尽くしがたい',
        example: "The ineffable joy of a Friday afternoon nap simply cannot be put into words.",
        exampleJa: '金曜午後の昼寝の、言葉にできない喜びは表現しようがない。',
        note: '良くも悪くも言葉を超える感覚。"indescribable" の美しい版。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'lugubrious', pron: 'ルーグーブリアス', pos: 'adj', ja: '陰気な、もの悲しい',
        example: "He sent a lugubrious text just because the pizza place closed twenty minutes early.",
        exampleJa: 'ピザ屋が20分早く閉まっただけで、彼は陰気なメッセージを送ってきた。',
        note: '大げさに暗い・湿っぽい。音が面白いので少しコミカルに使える。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'perfunctory', pron: 'パーファンクトリー', pos: 'adj', ja: 'おざなりの、形だけの',
        example: "He gave the dishes a perfunctory rinse and proudly called it 'deep cleaning.'",
        exampleJa: '彼は皿をおざなりにゆすいで、それを誇らしげに「大掃除」と呼んだ。',
        note: '心がこもってない・やっつけ。挨拶・仕事・謝罪に。"half-hearted" の格上。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'sanguine', pron: 'サングィン', pos: 'adj', ja: '楽観的な、前向きな',
        example: "I'm weirdly sanguine about Monday — mostly because I'm in denial that it exists.",
        exampleJa: '月曜には妙に楽観的。主に、その存在を否認してるから。',
        note: '根拠は薄いが前向き。"optimistic" の文語版。投資・見通しの話で頻出。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'taciturn', pron: 'タシターン', pos: 'adj', ja: '無口な、寡黙な',
        example: "My dad is completely taciturn until you mention the price of gas back in 1985.",
        exampleJa: 'うちの親父は完全に無口。1985年のガソリン価格の話をするまでは。',
        note: 'あまり喋らない。"quiet/reserved" の文語版。寡黙な人物描写に。',
    },
    {
        daySlot: 13, month: '2026-06', en: 'vex', pron: 'ヴェックス', pos: 'v', ja: '悩ませる、イライラさせる',
        example: "Nothing vexes me more than a Wi-Fi bar that's completely full but does nothing.",
        exampleJa: '満タンなのに何もしないWi-Fiのバーほど、俺をイライラさせるものはない。',
        note: '地味に苛立たせる。"vexing problem"(やっかいな問題)。短くて使いやすい。',
    },

    // ============================================================
    // 2026-06-14  Day: Disasters & Drama
    // ============================================================
    {
        daySlot: 14, month: '2026-06', en: 'quagmire', pron: 'クワグマイア', pos: 'n', ja: '泥沼、抜け出せない苦境',
        example: "One 'quick' group chat about dinner turned into a three-day logistical quagmire.",
        exampleJa: '夕飯についての「ちょっとした」グループチャットが、3日間の泥沼に化した。',
        note: 'ハマって動けない状況。政治・戦争・人間関係に。"mess" の重い版。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'recalcitrant', pron: 'リカルシトラント', pos: 'adj', ja: '反抗的な、言うことを聞かない',
        example: "My printer is recalcitrant — it senses deadlines and immediately chooses violence.",
        exampleJa: 'うちのプリンターは反抗的。締切を察知して即座に暴力を選ぶ。',
        note: '頑固で扱いにくい。人・機械・子供に。"stubborn" の強い版。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'winsome', pron: 'ウィンサム', pos: 'adj', ja: '愛嬌のある、人好きのする',
        example: "He talked his way out of the parking ticket with one winsome smile. Unfair.",
        exampleJa: '彼は愛嬌のある笑顔ひとつで駐車違反を免れた。不公平だ。',
        note: '魅力的で憎めない。子供・笑顔に。"charming" の古風で温かい版。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'acrimonious', pron: 'アクリモーニアス', pos: 'adj', ja: '辛辣な、とげとげしい',
        example: "Their acrimonious debate over the AC temperature nearly ended the entire road trip.",
        exampleJa: 'エアコンの温度を巡る辛辣な論争で、ドライブ旅行は終わりかけた。',
        note: '敵意むき出し。離婚・交渉・口論に。"acrimonious divorce" は鉄板。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'bombastic', pron: 'ボンバスティック', pos: 'adj', ja: '大げさな、仰々しい',
        example: "His bombastic wedding toast lasted longer than the marriage probably will.",
        exampleJa: '彼の仰々しい結婚の乾杯挨拶は、たぶん結婚生活より長かった。',
        note: '中身ないのに大言壮語。スピーチ・宣伝に。曲名でも有名で記憶に残る。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'cantankerous', pron: 'キャンタンカラス', pos: 'adj', ja: '気難しい、怒りっぽい',
        example: "Our cantankerous neighbor yells at clouds and confiscates any frisbee that lands nearby.",
        exampleJa: 'うちの気難しい隣人は雲に怒鳴り、近くに落ちたフリスビーを没収する。',
        note: '偏屈で扱いにくい。頑固ジジイ系。音が面白く印象に残る。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'debacle', pron: 'デバークル', pos: 'n', ja: '大失敗、総崩れ',
        example: "The surprise party was a debacle — we successfully surprised the wrong guy entirely.",
        exampleJa: 'サプライズパーティは大失敗。みごとに完全な別人を驚かせた。',
        note: '派手にコケる。イベント・計画・試合に。"disaster" のフランス語系格上。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'effusive', pron: 'イフュースィブ', pos: 'adj', ja: '大げさに感情を表す、べた褒めの',
        example: "She was so effusive about my haircut that now I'm genuinely suspicious of it.",
        exampleJa: '彼女が俺の散髪をべた褒めしすぎて、逆に本気で怪しんでる。',
        note: '感謝・賞賛があふれ出る。"effusive praise/thanks"。やりすぎ感も出せる。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'nefarious', pron: 'ネフェアリアス', pos: 'adj', ja: '極悪な、邪悪な',
        example: "My cat sat directly on my keyboard with clearly nefarious intentions.",
        exampleJa: 'うちの猫が、明らかに極悪な意図でキーボードのど真ん中に座った。',
        note: '悪役にぴったり。"nefarious plot/scheme"。冗談めかすと最高に使える。',
    },
    {
        daySlot: 14, month: '2026-06', en: 'quixotic', pron: 'クィクソティック', pos: 'adj', ja: '非現実的な、夢ばかりの',
        example: "My quixotic plan to 'reply to all emails by Friday' failed by 9 a.m. Monday.",
        exampleJa: '「金曜までに全メール返信」という非現実的な計画は、月曜の朝9時に破綻した。',
        note: 'ドン・キホーテ由来。理想は高いが無謀。発音は「クィクソティック」、綴りに注意。',
    },

    // ============================================================
    // 2026-06-15  Day: Atmosphere & Mood
    // ============================================================
    {
        daySlot: 15, month: '2026-06', en: 'placid', pron: 'プラシッド', pos: 'adj', ja: '穏やかな、波立たない',
        example: "The lake was perfectly placid until my uncle proudly fired up the jet ski.",
        exampleJa: '湖は完璧に穏やかだった。おじが得意げにジェットスキーをぶん回すまでは。',
        note: '水面・気質が静かで落ち着いた。"calm" の文語版。湖・性格・表情に。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'brazen', pron: 'ブレイズン', pos: 'adj', ja: '厚かましい、ずうずうしい',
        example: "It takes brazen confidence to bring leftovers to a potluck and label them 'homemade.'",
        exampleJa: '残り物を持ち寄りパーティに出して「手作り」と表示するには、厚かましい自信が要る。',
        note: '恥知らずに堂々。"brazen lie"(ぬけぬけとした嘘)。悪びれない態度に。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'convoluted', pron: 'コンヴォルーティッド', pos: 'adj', ja: '込み入った、ややこしい',
        example: "His excuse was so convoluted it had a prologue, three plot twists, and a sequel.",
        exampleJa: '彼の言い訳は込み入りすぎて、プロローグと3つのどんでん返しと続編が付いてた。',
        note: '複雑で分かりにくい。話・手続き・筋に。"complicated" の格上。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'demure', pron: 'ディミュア', pos: 'adj', ja: '控えめな、しとやか(ぶった)',
        example: "She acted demure during the interview, then crushed everyone at karaoke that night.",
        exampleJa: '面接では控えめに振る舞い、その夜カラオケで全員を蹴散らした。',
        note: '慎ましい(ぶる)。最近SNSでミーム化。本性とのギャップで笑える。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'vehement', pron: 'ヴィーメント', pos: 'adj', ja: '激しい、熱烈な(主張・反対が)',
        example: "He's a vehement believer that cereal is technically a soup. We no longer invite him.",
        exampleJa: '彼はシリアルは厳密にはスープだと激しく信じ込んでる。もう招待してない。',
        note: '主張・反対・感情が激烈。"vehement denial/opposition" が定番。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'histrionic', pron: 'ヒストリオニック', pos: 'adj', ja: '芝居がかった、わざとらしい',
        example: "My roommate's histrionic reaction to one small spider could honestly win an Oscar.",
        exampleJa: 'ルームメイトの小さなクモ一匹への芝居がかった反応は、正直オスカー取れるレベル。',
        note: 'わざとらしく大げさ。"dramatic" の文語・心理学用語版。大騒ぎする人に。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'languid', pron: 'ラングィッド', pos: 'adj', ja: 'けだるい、物憂げな',
        example: "Sundays are for languid mornings and firmly pretending the laundry doesn't exist.",
        exampleJa: '日曜はけだるい朝と、洗濯物の存在をきっぱり無視するためにある。',
        note: 'ゆったり気だるい。良い意味の怠惰。夏・休日・午後の空気に。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'sumptuous', pron: 'サンプチュアス', pos: 'adj', ja: '豪華な、贅を尽くした',
        example: "The hotel breakfast was so sumptuous I genuinely considered moving in permanently.",
        exampleJa: 'ホテルの朝食が豪華すぎて、本気で永住を検討した。',
        note: '食事・内装が贅沢で豪華。"luxurious/lavish"。"sumptuous feast/decor" が定番。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'ostentatious', pron: 'オステンテイシャス', pos: 'adj', ja: '見栄を張った、これ見よがしの',
        example: "His ostentatious new watch beeps louder than it ever needs to. On purpose, obviously.",
        exampleJa: '彼の見栄っ張りな新しい時計は、必要以上に大きく鳴る。明らかにわざと。',
        note: '富や知識をひけらかす。"showy" の格上。成金・自慢屋に最適。',
    },
    {
        daySlot: 15, month: '2026-06', en: 'wistful', pron: 'ウィストフル', pos: 'adj', ja: '物思いにふける、切なくなる',
        example: "I get wistful looking at old photos — mostly mourning my long-gone metabolism.",
        exampleJa: '昔の写真を見ると切なくなる。主に、とうに失われた代謝を悼んで。',
        note: '過去を懐かしむ甘いせつなさ。"nostalgic" の繊細版。回顧の場面に。',
    },

    // ============================================================
    // 2026-06-16  Day: Brains & Wit
    // ============================================================
    {
        daySlot: 16, month: '2026-06', en: 'astute', pron: 'アステュート', pos: 'adj', ja: '抜け目ない、鋭い',
        example: "It was astute of him to bring snacks to a meeting nobody wanted to attend.",
        exampleJa: '誰も出たくない会議に菓子を持参するとは、彼も抜け目ない。',
        note: '状況を見抜いて賢く立ち回る。"astute observation/businessman"。clever より「実利的な賢さ」。1級頻出。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'erudite', pron: 'エルダイト', pos: 'adj', ja: '博学な、学識のある',
        example: "He sounds erudite until you realize every fact came from the same podcast.",
        exampleJa: '博学そうに聞こえるが、よく聞くと知識は全部同じポッドキャスト由来だ。',
        note: '本をたくさん読んで深い知識がある。"learned/scholarly"。物知り顔の人に皮肉でも。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'sagacious', pron: 'サゲイシャス', pos: 'adj', ja: '賢明な、洞察力に富む',
        example: "My grandpa gave the sagacious advice to 'just turn it off and on again.' It worked.",
        exampleJa: 'じいちゃんが「とりあえず電源切って入れ直せ」という賢明な助言をくれた。効いた。',
        note: '経験に裏打ちされた知恵。"wise" の格上・文語。老賢人・名君に。名詞 sagacity。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'perspicacious', pron: 'パースピケイシャス', pos: 'adj', ja: '明敏な、見抜く力のある',
        example: "She's perspicacious enough to tell I'm lying before I've finished saying 'I'm fine.'",
        exampleJa: '彼女は明敏すぎて、俺が「大丈夫」を言い終える前に嘘だと見抜く。',
        note: '物事の本質をすばやく見抜く。"sharp/insightful" の最上級。観察眼の鋭さに。長くて見栄えのする1級語。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'cogent', pron: 'コージェント', pos: 'adj', ja: '説得力のある、筋の通った',
        example: "He made a surprisingly cogent argument for why pizza counts as a balanced meal.",
        exampleJa: 'ピザが栄養バランスの取れた食事である理由を、彼は意外なほど筋を通して論じた。',
        note: '論理が明快で人を納得させる。"cogent argument/reason"。議論・プレゼンの褒め言葉に。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'lucid', pron: 'ルーシッド', pos: 'adj', ja: '明晰な、わかりやすい',
        example: "I have exactly one lucid thought per day, usually right before I fall asleep.",
        exampleJa: '俺の明晰な思考は1日にきっかり1回、たいてい寝落ちする直前にやってくる。',
        note: '頭が冴えて筋道立っている/説明が明快。"lucid explanation"、"lucid dream"(明晰夢)も。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'discerning', pron: 'ディサーニング', pos: 'adj', ja: '目の肥えた、識別力のある',
        example: "My cat is a discerning eater — she rejects the expensive food and licks the floor.",
        exampleJa: 'うちの猫は目が肥えてる。高い餌は拒否して床を舐める。',
        note: '違いや良し悪しを見分ける目を持つ。"discerning taste/eye"。グルメ・審美眼に。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'shrewd', pron: 'シュルード', pos: 'adj', ja: '抜け目ない、機を見るに敏な',
        example: "Buying snacks right before a sale ends is not shrewd; it's just panic with extra steps.",
        exampleJa: 'セール終了直前に菓子を買うのは抜け目ないとは言わない。手の込んだパニックだ。',
        note: '損得勘定が鋭く、ずる賢いニュアンスも。"shrewd businessman/investor"。発音は「シュルード」。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'pragmatic', pron: 'プラグマティック', pos: 'adj', ja: '現実的な、実利を重んじる',
        example: "I'm pragmatic about my dreams — I'd love to travel, but the couch is right here.",
        exampleJa: '俺は夢に現実的だ。旅行はしたいが、ソファはここにある。',
        note: '理想より実用・結果を取る。"pragmatic approach/decision"。idealistic の対義語として頻出。',
    },
    {
        daySlot: 16, month: '2026-06', en: 'precocious', pron: 'プリコーシャス', pos: 'adj', ja: '早熟な、ませた',
        example: "My niece is so precocious she negotiated her bedtime like a seasoned union rep.",
        exampleJa: 'うちの姪は早熟すぎて、寝る時間を熟練の労組代表みたいに交渉してきた。',
        note: '子供が年齢に不相応に賢い・ませてる。"precocious child/talent"。才能の早咲きにも。',
    },

    // ============================================================
    // 2026-06-17  Day: Food & Cravings
    // ============================================================
    {
        daySlot: 17, month: '2026-06', en: 'delectable', pron: 'ディレクタブル', pos: 'adj', ja: '実においしい、美味な',
        example: "The cake looked delectable in the photo and arrived looking deeply apologetic.",
        exampleJa: 'ケーキは写真では美味そうだったのに、届いたら平謝りしてるような見た目だった。',
        note: '"delicious" の上品・文語版。料理・スイーツを褒める時。皮肉にも使える。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'voracious', pron: 'ヴォレイシャス', pos: 'adj', ja: '食欲旺盛な、貪欲な',
        example: "He's a voracious reader of menus and a reluctant reader of everything else.",
        exampleJa: '彼はメニューに関しては貪欲な読書家だが、それ以外は読むのを渋る。',
        note: '食欲・欲求がすさまじい。食だけでなく "voracious reader/appetite"。比喩で頻出。1級頻出。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'insatiable', pron: 'インセイシャブル', pos: 'adj', ja: '飽くなき、満たされない',
        example: "My insatiable need for snacks has survived every diet I've ever announced loudly.",
        exampleJa: '俺の飽くなき間食欲は、声高に宣言したあらゆるダイエットを生き延びてきた。',
        note: 'どれだけ与えても満足しない。"insatiable appetite/curiosity"。欲望全般に使える。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'palatable', pron: 'パラタブル', pos: 'adj', ja: '口に合う、まずまずの',
        example: "My cooking is palatable, which is a polite way of saying nobody asks for seconds.",
        exampleJa: '俺の料理は口に合う程度。要は誰もおかわりを頼まないってことの婉曲表現だ。',
        note: '美味とは言わないが「食える」。比喩で「(案などが)受け入れられる」にも。"palatable solution"。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'succulent', pron: 'サキュレント', pos: 'adj', ja: 'みずみずしくジューシーな',
        example: "He described his burnt toast as 'succulent.' We were all very worried.",
        exampleJa: '彼は焦げたトーストを「ジューシー」と評した。全員、本気で心配した。',
        note: '果汁・肉汁たっぷり。"succulent steak/fruit"。多肉植物(サボテン)も succulent。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'ravenous', pron: 'ラヴェナス', pos: 'adj', ja: '腹ペコの、ガツガツした',
        example: "I get ravenous around 3 p.m. and start eyeing my coworker's lunch like a hawk.",
        exampleJa: '午後3時頃に腹ペコになって、同僚の弁当をタカみたいに狙い始める。',
        note: '"very hungry" の強い文語版。"ravenous appetite"。狼のようにガツガツした空腹に。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'savory', pron: 'セイヴォリー', pos: 'adj', ja: '香ばしい、塩気のきいた(甘くない)',
        example: "I'm a savory person — give me chips over chocolate any day of the week.",
        exampleJa: '俺はしょっぱい派。いつだってチョコよりポテチだ。',
        note: '甘くない、塩・うま味系の味。"sweet" の対。"savory snacks/dish"。日常会話で超実用。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'epicurean', pron: 'エピキュリアン', pos: 'adj', ja: '美食家の、食道楽の',
        example: "His epicurean standards crumble instantly the moment free office pizza appears.",
        exampleJa: '彼の美食家ぶった基準は、オフィスのタダピザが現れた瞬間に即崩壊する。',
        note: '食や快楽を洗練して追求する。"epicurean tastes"。グルメ気取りを皮肉るのに最適。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'gluttonous', pron: 'グラトナス', pos: 'adj', ja: '大食いの、食い意地の張った',
        example: "It was a gluttonous weekend — I treated the all-you-can-eat buffet as a personal challenge.",
        exampleJa: '食い意地の張った週末だった。食べ放題を個人的な挑戦として受けて立った。',
        note: '節度なくむさぼる。七つの大罪の一つ gluttony の形容詞。自虐で笑いに変えられる。',
    },
    {
        daySlot: 17, month: '2026-06', en: 'rancid', pron: 'ランシッド', pos: 'adj', ja: '(油などが)腐敗した、悪臭のする',
        example: "The 'mystery' container in the back of the fridge had gone gloriously rancid.",
        exampleJa: '冷蔵庫の奥の「正体不明」容器は、みごとに腐り果てていた。',
        note: '油・バターが酸化して腐ったにおい。"rancid butter/oil"。比喩で「胸くそ悪い」にも。',
    },

    // ============================================================
    // 2026-06-18  Day: Money & Greed
    // ============================================================
    {
        daySlot: 18, month: '2026-06', en: 'frugal', pron: 'フルーガル', pos: 'adj', ja: '倹約家の、つましい',
        example: "I'm frugal — I reuse the same tea bag until it's basically just hot water with a memory.",
        exampleJa: '俺は倹約家だ。同じティーバッグを、ほぼ「記憶を持つお湯」になるまで使い回す。',
        note: '無駄遣いせず質素。ケチよりポジティブ。"frugal lifestyle"。倹約自慢に。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'lavish', pron: 'ラヴィッシュ', pos: 'adj', ja: '気前のいい、ふんだんな',
        example: "He's lavish with compliments and weirdly stingy with the actual restaurant bill.",
        exampleJa: '彼はお世辞は気前よくふりまくのに、実際の店の勘定には妙にケチだ。',
        note: '惜しみなく与える/贅沢な。動詞で "lavish ~ on …"(〜を…に浴びせる)も。"lavish praise/party"。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'destitute', pron: 'デスティテュート', pos: 'adj', ja: '極貧の、無一文の',
        example: "Three days before payday I'm not broke, I'm 'temporarily destitute with style.'",
        exampleJa: '給料日3日前、俺は無一文じゃない。「一時的に上品に困窮してる」だけだ。',
        note: '生活手段を失った極度の貧困。"poor" の最も重い語。ニュース・社会問題で頻出。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'affluent', pron: 'アフルエント', pos: 'adj', ja: '裕福な、豊かな',
        example: "We grew up in an affluent neighborhood — affluent meaning everyone else, not us.",
        exampleJa: 'うちは裕福な地区で育った。裕福ってのは、うち以外の全員のことだけど。',
        note: '"wealthy" の文語版。"affluent society/area"。個人より社会・地域の豊かさに使われがち。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'parsimonious', pron: 'パーシモーニアス', pos: 'adj', ja: 'ケチな、しみったれた',
        example: "My boss is so parsimonious he rations the office printer paper like it's wartime.",
        exampleJa: 'うちの上司はケチすぎて、オフィスのコピー用紙を戦時中みたいに配給制にしてる。',
        note: '度を越したケチ。"stingy" の最上級・文語。けなし言葉。名詞 parsimony。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'lucrative', pron: 'ルークラティブ', pos: 'adj', ja: '儲かる、実入りのいい',
        example: "I discovered a lucrative side hustle: returning things I impulsively bought online.",
        exampleJa: '実入りのいい副業を発見した。衝動買いしたものをネットで返品することだ。',
        note: '利益が大きい。"lucrative business/deal/career"。ビジネス・キャリアの話で超頻出。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'extravagant', pron: 'エクストラヴァガント', pos: 'adj', ja: '浪費的な、度を越した',
        example: "Calling a fancy coffee an 'investment in productivity' is my favorite extravagant lie.",
        exampleJa: '高級コーヒーを「生産性への投資」と呼ぶのが、俺のお気に入りの浪費的な嘘だ。',
        note: '金・表現が過剰。"extravagant spending/claim/gift"。浪費にも誇張にも使える。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'thrifty', pron: 'スリフティ', pos: 'adj', ja: '倹約の、やりくり上手な',
        example: "Being thrifty means I have forty almost-empty shampoo bottles I refuse to throw out.",
        exampleJa: 'やりくり上手ってのは、捨てるのを拒否したほぼ空のシャンプー40本を持ってるってことだ。',
        note: '上手に節約する。frugal とほぼ同義でポジティブ。"thrifty shopper"。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'opulent', pron: 'オピュレント', pos: 'adj', ja: '豪奢な、富にあふれた',
        example: "The hotel lobby was so opulent I was scared to sit down in my discount sneakers.",
        exampleJa: 'ホテルのロビーが豪奢すぎて、激安スニーカーで座るのが怖かった。',
        note: '見るからにゴージャスで贅沢。"opulent mansion/lifestyle"。sumptuous の仲間。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-06', en: 'insolvent', pron: 'インソルベント', pos: 'adj', ja: '支払い不能の、債務超過の',
        example: "My houseplant budget went insolvent the moment I discovered the rare ones.",
        exampleJa: 'レアな品種を見つけた瞬間、俺の観葉植物予算は支払い不能に陥った。',
        note: '借金を返せない財務状態。"insolvent company"。bankrupt の一歩手前の法律・経済用語。',
    },

    // ============================================================
    // 2026-06-19  Day: Time & Habits
    // ============================================================
    {
        daySlot: 19, month: '2026-06', en: 'perennial', pron: 'ペレニアル', pos: 'adj', ja: '絶え間ない、毎年恒例の',
        example: "'I'll start Monday' is my perennial promise to a body that stopped believing me years ago.",
        exampleJa: '「月曜から始める」は、何年も前に俺を信じなくなった体への、毎年恒例の約束だ。',
        note: '何度も繰り返し続く・多年生の。"perennial problem/favorite"。園芸では「多年草」。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'sporadic', pron: 'スポラディック', pos: 'adj', ja: '散発的な、ときどきの',
        example: "My gym attendance is sporadic, which is a kind word for 'twice, in January.'",
        exampleJa: '俺のジム通いは散発的だ。「1月に2回」の優しい言い換えだけど。',
        note: '不規則にときどき起こる。"sporadic outbreaks/efforts"。継続できてない自分にぴったり。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'incessant', pron: 'インセサント', pos: 'adj', ja: 'ひっきりなしの、絶え間ない',
        example: "The incessant ticking of that clock made me consider a life of crime against clocks.",
        exampleJa: 'あの時計のひっきりなしのチクタク音で、時計相手の犯罪人生を本気で検討した。',
        note: '止まらず続いて(うっとうしい)。"incessant noise/rain/complaints"。否定的なものに。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'imminent', pron: 'イミネント', pos: 'adj', ja: '差し迫った、今にも起きそうな',
        example: "The moment a deadline feels imminent, my apartment becomes suspiciously, deeply clean.",
        exampleJa: '締切が差し迫った瞬間、俺の部屋は怪しいほど徹底的にきれいになる。',
        note: '悪いことが今にも起こりそう。"imminent danger/threat/collapse"。緊迫感を出す。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'belated', pron: 'ビレイティッド', pos: 'adj', ja: '遅ればせの、遅れてきた',
        example: "Happy belated birthday — I remembered on time and then my phone did not.",
        exampleJa: '遅ればせながら誕生日おめでとう。俺はちゃんと覚えてたのに、スマホが覚えてなかった。',
        note: '時機を逃した。"belated birthday/apology/thanks" が定番。遅れたお祝い・謝罪に必須。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'perpetual', pron: 'パーペチュアル', pos: 'adj', ja: '永続的な、絶え間ない',
        example: "I live in a perpetual state of 'I'll deal with that tab later.' I have 200 tabs.",
        exampleJa: '俺は「あのタブは後で処理する」という永続状態で生きてる。タブは200個ある。',
        note: 'いつまでも途切れず続く。"perpetual motion/state/cycle"。incessant より中立・恒久的。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'intermittent', pron: 'インターミテント', pos: 'adj', ja: '断続的な、とぎれとぎれの',
        example: "Our Wi-Fi is intermittent, which means it works perfectly until I actually need it.",
        exampleJa: 'うちのWi-Fiは断続的だ。つまり、本当に必要になるまでは完璧に動く。',
        note: 'ついたり消えたりを繰り返す。"intermittent rain/connection"。"intermittent fasting"(断食)も流行語。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'fleeting', pron: 'フリーティング', pos: 'adj', ja: 'つかの間の、はかない',
        example: "I had a fleeting moment of motivation this morning. I waved at it as it left.",
        exampleJa: '今朝つかの間のやる気が訪れた。去っていくそれに手を振った。',
        note: '一瞬で過ぎ去る。"fleeting moment/glance/fame"。ephemeral の日常版。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'tardy', pron: 'ターディ', pos: 'adj', ja: '遅刻の、のろい',
        example: "I'm never late; I'm just consistently, reliably, professionally tardy.",
        exampleJa: '俺は遅刻なんかしない。ただ一貫して、信頼できるほど、プロ級に遅れてくるだけだ。',
        note: '時間に遅れる・動きが遅い。"tardy" は学校の遅刻でよく使う。late のやや堅い語。',
    },
    {
        daySlot: 19, month: '2026-06', en: 'protracted', pron: 'プロトラクティッド', pos: 'adj', ja: '長引いた、引き延ばされた',
        example: "Our 'quick' goodbye at the door turned into a protracted forty-minute second conversation.",
        exampleJa: '玄関での「ちょっとした」別れの挨拶が、40分の長引く二次会と化した。',
        note: '必要以上に長く続く。"protracted negotiations/dispute/illness"。交渉・紛争で頻出。',
    },

    // ============================================================
    // 2026-06-20  Day: Arguments & Debate
    // ============================================================
    {
        daySlot: 20, month: '2026-06', en: 'rebut', pron: 'リバット', pos: 'v', ja: '反論する、論駁する',
        example: "I tried to rebut my mom's point, but she just raised one eyebrow and I folded.",
        exampleJa: '母の主張に反論しようとしたが、片眉を上げられただけで俺は白旗を上げた。',
        note: '相手の主張に証拠を挙げて反論する。"rebut an argument/claim"。名詞 rebuttal も頻出。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'refute', pron: 'リフュート', pos: 'v', ja: '論破する、反証する',
        example: "It's hard to refute someone who ends every sentence with 'trust me, I read it somewhere.'",
        exampleJa: '何でも「信じて、どっかで読んだから」で締める奴を論破するのは難しい。',
        note: '誤りを証明して退ける。rebut より「完全に打ち負かす」寄り。"refute a theory"。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'concede', pron: 'コンシード', pos: 'v', ja: '(しぶしぶ)認める、譲歩する',
        example: "I'll concede that you were right, but only because I'm too tired to keep arguing.",
        exampleJa: '君が正しかったと認めるよ。ただし、言い争いを続けるのに疲れすぎてるからってだけだ。',
        note: '負けや相手の正しさを認める。"concede defeat/a point"。選挙の「敗北宣言」も concede。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'digress', pron: 'ダイグレス', pos: 'v', ja: '脱線する、本題からそれる',
        example: "Let me explain the recipe — but first, and I will digress wildly, let me tell you about my uncle.",
        exampleJa: 'レシピを説明するよ。でもその前に、盛大に脱線するけど、おじの話をさせてくれ。',
        note: '話が本筋から逸れる。"but I digress"(脱線したね)は会話の定番フレーズ。名詞 digression。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'contentious', pron: 'コンテンシャス', pos: 'adj', ja: '議論を呼ぶ、争いを好む',
        example: "Pineapple on pizza remains the most contentious issue at every family dinner.",
        exampleJa: 'ピザのパイナップルは、毎度の家族の夕食で最も議論を呼ぶ問題のままだ。',
        note: '意見が割れてもめる/けんか腰の。"contentious issue/debate"。政治・社会ニュースで頻出。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'equivocal', pron: 'イクィヴォカル', pos: 'adj', ja: 'あいまいな、どっちつかずの',
        example: "His equivocal 'we'll see' is how I knew the answer was a very confident no.",
        exampleJa: '彼のあいまいな「考えとくよ」で、答えが超自信満々のノーだと分かった。',
        note: 'わざと曖昧で言質を取らせない。"equivocal answer/response"。動詞 equivocate(言葉を濁す)も。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'vociferous', pron: 'ヴォシフェラス', pos: 'adj', ja: '声高な、やかましく主張する',
        example: "He's a vociferous critic of my parking — for a man who has never once parked correctly.",
        exampleJa: '彼は俺の駐車を声高に批判する。一度もまともに駐車できたことのない男のくせに。',
        note: '大声で激しく意見を述べる。"vociferous opposition/protest/supporter"。うるさい主張に。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'placate', pron: 'プラケイト', pos: 'v', ja: 'なだめる、機嫌を取る',
        example: "I tried to placate the angry cat with treats. The cat took the treats and stayed angry.",
        exampleJa: '怒った猫をおやつでなだめようとした。猫はおやつを取り、怒ったままだった。',
        note: '怒り・不満を鎮める。"placate an angry customer"。クレーム対応・交渉で頻出。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'dogmatic', pron: 'ドグマティック', pos: 'adj', ja: '独断的な、頭ごなしの',
        example: "He's dogmatic about toast — one specific shade of brown or it's 'technically a failure.'",
        exampleJa: '彼はトーストに独断的だ。特定の一色の茶色じゃないと「厳密には失敗」らしい。',
        note: '自説を絶対視して譲らない。"dogmatic view/approach"。融通の利かない人に。名詞 dogma。',
    },
    {
        daySlot: 20, month: '2026-06', en: 'concur', pron: 'コンカー', pos: 'v', ja: '同意する、意見が一致する',
        example: "After two hours of debate, we finally concurred that nobody actually wanted to cook.",
        exampleJa: '2時間の議論の末、誰も本当は料理したくないという点でついに意見が一致した。',
        note: '"agree" のフォーマル版。"I concur"。会議・法廷・論文で。判事の「同意意見」も concur。',
    },

    // ============================================================
    // 2026-06-21  Day: Love & Relationships
    // ============================================================
    {
        daySlot: 21, month: '2026-06', en: 'smitten', pron: 'スミトゥン', pos: 'adj', ja: 'ぞっこんの、一目惚れの',
        example: "He's so smitten he laughs at her jokes a full two seconds before she finishes them.",
        exampleJa: '彼はぞっこんすぎて、彼女のジョークが終わる丸2秒前から笑ってる。',
        note: '恋に落ちて夢中。"smitten with/by someone"。古語 smite(打つ)の過去分詞。かわいい恋の語。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'estranged', pron: 'エストレインジド', pos: 'adj', ja: '疎遠になった、仲たがいした',
        example: "I'm currently estranged from my alarm clock after the betrayal it pulled this morning.",
        exampleJa: '今朝の裏切り以来、俺は目覚まし時計と現在疎遠中だ。',
        note: '親しかった相手と関係が断絶。"estranged wife/father/family"。家族・夫婦の不和に頻出。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'infatuation', pron: 'インファチュエイション', pos: 'n', ja: 'のぼせ上がり、一時の夢中',
        example: "My infatuation with that productivity app lasted exactly as long as the free trial.",
        exampleJa: 'あの生産性アプリへの俺ののぼせ上がりは、無料体験期間ぴったりで終わった。',
        note: '理性を失った一時的な熱中。本物の愛より浅い。"a passing infatuation"。動詞 infatuated。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'platonic', pron: 'プラトニック', pos: 'adj', ja: 'プラトニックな、友愛の',
        example: "My relationship with the corner store clerk is purely platonic but deeply meaningful.",
        exampleJa: '角のコンビニ店員との関係は純粋にプラトニックだが、深い意味がある。',
        note: '恋愛感情のない友情。"platonic friendship/relationship"。哲学者プラトン由来。日常で実用。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'reconcile', pron: 'レコンサイル', pos: 'v', ja: '和解する、折り合いをつける',
        example: "We finally reconciled after the great argument about which way the toilet paper goes.",
        exampleJa: 'トイレットペーパーの向きを巡る大論争の末、俺たちはついに和解した。',
        note: '仲直りする/(矛盾を)両立させる。"reconcile with someone"、"reconcile A with B"。人間関係・帳簿照合にも。1級頻出。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'fickle', pron: 'フィクル', pos: 'adj', ja: '移り気な、気まぐれな',
        example: "My appetite is fickle — I crave sushi for a week, then never want to see it again.",
        exampleJa: '俺の食欲は移り気だ。一週間寿司を欲しがり、その後二度と見たくなくなる。',
        note: '心や好みがコロコロ変わる。"fickle heart/fans/weather"。capricious の日常版。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'aloof', pron: 'アルーフ', pos: 'adj', ja: 'よそよそしい、打ち解けない',
        example: "My cat acts aloof all day, then sits on my keyboard the second I look busy.",
        exampleJa: 'うちの猫は一日中よそよそしいくせに、俺が忙しそうにした瞬間キーボードに座る。',
        note: '距離を置いて冷たい・超然とした。"keep/stay aloof"、"aloof manner"。クールな人や猫に。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'enamored', pron: 'エナモード', pos: 'adj', ja: '惚れ込んだ、心酔した',
        example: "I'm utterly enamored with my new noise-cancelling headphones and slightly less with people.",
        exampleJa: '新しいノイキャンヘッドホンに完全に惚れ込んでる。人間にはちょっとだけ惚れ込まなくなった。',
        note: '人・物にすっかり夢中。"enamored of/with"。やや古風でロマンチック。物への熱中にも使える。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'amicable', pron: 'アミカブル', pos: 'adj', ja: '友好的な、円満な',
        example: "We reached an amicable agreement: he gets the armrest, I get to complain about it forever.",
        exampleJa: '俺たちは円満な合意に達した。彼が肘掛けを取り、俺は永遠にそれに文句を言う権利を得る。',
        note: '争わず友好的に。"amicable divorce/agreement/split"。acrimonious(辛辣)の対義語。1級頻出。',
    },
    {
        daySlot: 21, month: '2026-06', en: 'besotted', pron: 'ビソティッド', pos: 'adj', ja: '夢中になった、のぼせ上がった',
        example: "He's so besotted with his new puppy that human conversation now bores him completely.",
        exampleJa: '彼は新しい子犬に夢中すぎて、今や人間との会話が完全に退屈らしい。',
        note: 'のめり込んで理性を失う。"besotted with someone"。smitten より「のぼせ・盲目」感が強い。',
    },

    // ============================================================
    // 2026-06-22  Day: Work & Office
    // ============================================================
    {
        daySlot: 22, month: '2026-06', en: 'tedious', pron: 'ティーディアス', pos: 'adj', ja: '退屈な、うんざりするほど単調な',
        example: "Filling out expense reports is so tedious I'd rather just pay the company myself.",
        exampleJa: '経費精算はうんざりするほど単調で、いっそ自分が会社に払いたいくらいだ。',
        note: '長くて退屈・面倒。"tedious task/process/meeting"。boring より「だらだら続く面倒さ」。1級頻出。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'diligent', pron: 'ディリジェント', pos: 'adj', ja: '勤勉な、入念な',
        example: "I'm diligent about replying to emails — I read them instantly and reply in nine business days.",
        exampleJa: '俺はメール返信に勤勉だ。即座に読んで、9営業日後に返す。',
        note: 'こつこつ真面目に努力する。"diligent worker/student"、"diligent research"。褒め言葉の定番。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'redundant', pron: 'リダンダント', pos: 'adj', ja: '余剰の、重複した、(英)解雇された',
        example: "Half the meeting was redundant — we agreed in minute one and discussed it for fifty more.",
        exampleJa: '会議の半分は余計だった。1分目で合意したのに、さらに50分話し合った。',
        note: '不要に重複/(英)人員整理で解雇。"redundant information"、"made redundant"(リストラ)。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'meticulous', pron: 'メティキュラス', pos: 'adj', ja: '几帳面な、細心の',
        example: "She's meticulous about her desk and a complete tornado about literally everything else.",
        exampleJa: '彼女は机には几帳面なのに、それ以外の何もかもに関しては完全に竜巻だ。',
        note: '細部まで注意深い(ポジティブ)。"meticulous attention to detail"。punctilious より中立・褒め寄り。1級頻出。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'delegate', pron: 'デレゲイト', pos: 'v', ja: '(仕事・権限を)委任する',
        example: "I've learned to delegate — mostly by delegating tasks to a future, more responsible me.",
        exampleJa: '俺は委任を覚えた。主に、未来のもっと責任感ある自分にタスクを委任することで。',
        note: '仕事を人に振る。マネジメント必須語。"delegate tasks/authority"。名詞 delegate は「代表者」。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'mundane', pron: 'マンデイン', pos: 'adj', ja: '平凡な、ありふれた、世俗の',
        example: "My most mundane skill — finding the start of the tape roll — gets zero recognition at work.",
        exampleJa: '俺の最も平凡な特技、テープの端を見つける能力は、職場でまったく評価されない。',
        note: '退屈なほど日常的・俗世の。"mundane tasks/details/life"。banal の親戚で日常頻出。1級頻出。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'expedite', pron: 'エクスペダイト', pos: 'v', ja: '早める、迅速に処理する',
        example: "Nothing expedites my work like an email that says 'just following up on this.'",
        exampleJa: '「念のため再度確認です」というメールほど、俺の仕事を迅速化させるものはない。',
        note: '手続き・処理をスピードアップ。"expedite the process/shipping/request"。ビジネスで頻出。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'menial', pron: 'ミーニアル', pos: 'adj', ja: '単調で雑用の、つまらない',
        example: "I was hired for 'strategy' and spend my days on menial tasks like fixing the printer.",
        exampleJa: '「戦略」のために雇われたのに、毎日プリンター直しみたいな雑用に費やしてる。',
        note: '低く見られがちな単純労働。"menial job/task/work"。やや見下した響きがあるので使い所に注意。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'competent', pron: 'コンピテント', pos: 'adj', ja: '有能な、きちんとこなせる',
        example: "I look most competent in meetings where I have absolutely no idea what's happening.",
        exampleJa: '俺が一番有能に見えるのは、何が起きてるか皆目わからない会議だ。',
        note: '十分な能力がある(「優秀」ではなく「ちゃんとできる」)。"competent/incompetent"。評価の中核語。',
    },
    {
        daySlot: 22, month: '2026-06', en: 'arduous', pron: 'アーデュアス', pos: 'adj', ja: '骨の折れる、困難な',
        example: "The most arduous part of my job is pretending the Monday meeting couldn't have been an email.",
        exampleJa: '俺の仕事で一番骨が折れるのは、月曜の会議がメールで済んだはずだと思わないふりをすることだ。',
        note: '多大な労力を要する。"arduous task/journey/process"。tough/hard の文語版。1級頻出。',
    },

    // ============================================================
    // 2026-06-23  Day: Health & Body
    // ============================================================
    {
        daySlot: 23, month: '2026-06', en: 'lethargic', pron: 'レサージック', pos: 'adj', ja: '無気力な、だるい',
        example: "I feel lethargic until exactly 11 p.m., when my brain suddenly wants to start a business.",
        exampleJa: '夜11時きっかりまでだるいのに、その瞬間、脳が急に起業したがる。',
        note: 'エネルギーがなく動く気力がない。"feel lethargic"。食後・寝不足・天気の悪い日に。名詞 lethargy。1級頻出。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'robust', pron: 'ロバスト', pos: 'adj', ja: '頑健な、たくましい',
        example: "My immune system is robust until exactly one day before a vacation I've been planning.",
        exampleJa: '俺の免疫は頑健だ。計画してた休暇のちょうど1日前までは。',
        note: '体・システム・経済が丈夫で強い。"robust health/economy/system/debate"。汎用性が高い1級頻出語。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'frail', pron: 'フレイル', pos: 'adj', ja: 'か弱い、虚弱な',
        example: "I look frail carrying one grocery bag, then heroically refuse to make a second trip.",
        exampleJa: '食料品の袋一つでか弱く見えるのに、二往復だけは英雄的に拒否する。',
        note: '弱々しく壊れそう。"frail elderly/health"。高齢・病弱の人に使われがち。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'queasy', pron: 'クィージー', pos: 'adj', ja: 'むかつく、吐き気がする',
        example: "Reading in a moving car makes me queasy, but I keep doing it out of pure stubbornness.",
        exampleJa: '走る車で本を読むと気持ち悪くなるのに、純粋な意地で読み続ける。',
        note: '吐き気・胸のむかつき。乗り物酔い・不安にも。"feel queasy"。比喩で「不安でそわそわ」も。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'sedentary', pron: 'セデンタリー', pos: 'adj', ja: '座りがちの、運動不足の',
        example: "My lifestyle is so sedentary my smartwatch sends me texts that feel genuinely concerned.",
        exampleJa: '俺の生活は座りがちすぎて、スマートウォッチが本気で心配してそうな通知を送ってくる。',
        note: 'ほとんど座って動かない。"sedentary lifestyle/job"。健康記事で超頻出。デスクワーク自虐に。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'invigorating', pron: 'インヴィゴレイティング', pos: 'adj', ja: '元気づける、爽快な',
        example: "A cold shower is invigorating, they say. They have clearly never met my willpower.",
        exampleJa: '冷水シャワーは爽快らしい。そいつらは明らかに俺の意志力に会ったことがない。',
        note: '活力を与えてくれる。"invigorating walk/air/shower"。動詞 invigorate。さわやかな刺激に。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'ailment', pron: 'エイルメント', pos: 'n', ja: '(軽い)病気、不調',
        example: "My most common ailment is 'phone neck' from looking down at it for nine straight hours.",
        exampleJa: '俺の最も一般的な不調は、9時間ぶっ通しで見下ろすことによる「スマホ首」だ。',
        note: '深刻でない病気・持病。"minor ailment/common ailments"。disease より軽い・日常的。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'sluggish', pron: 'スラギッシュ', pos: 'adj', ja: '動きの鈍い、不活発な',
        example: "My laptop and I are both sluggish in the morning and need the exact same amount of coffee.",
        exampleJa: '俺のノートPCも俺も朝は動きが鈍く、必要なコーヒーの量がまったく同じだ。',
        note: '反応・動きがのろい。体・経済・機械に。"sluggish economy/start/performance"。lethargic の仲間。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'brittle', pron: 'ブリトル', pos: 'adj', ja: 'もろい、折れやすい',
        example: "My patience gets brittle the moment someone says 'real quick' before a long question.",
        exampleJa: '長い質問の前に「ちょっとだけ」と言われた瞬間、俺の忍耐はもろくなる。',
        note: '硬いが割れやすい。骨・髪・氷に。"brittle bones/nails"。比喩で「もろい関係・神経」も。',
    },
    {
        daySlot: 23, month: '2026-06', en: 'convalesce', pron: 'コンバレス', pos: 'v', ja: '(病後に)養生する、回復する',
        example: "After a tiny cold, I convalesce dramatically on the couch like a Victorian poet.",
        exampleJa: 'ちょっとした風邪のあと、俺はビクトリア朝の詩人みたいに大げさにソファで養生する。',
        note: '病気・手術のあとゆっくり療養する。"convalesce at home"。名詞 convalescence。やや文語。',
    },

    // ============================================================
    // 2026-06-24  Day: Travel & Adventure
    // ============================================================
    {
        daySlot: 24, month: '2026-06', en: 'wanderlust', pron: 'ワンダーラスト', pos: 'n', ja: '旅への強い憧れ、放浪癖',
        example: "My wanderlust is powerful right up until I remember packing, airports, and other humans.",
        exampleJa: '俺の旅への憧れは強烈だ。荷造りと空港と他人の存在を思い出すまでは。',
        note: '遠くへ旅したい衝動。ドイツ語由来でSNS頻出。"wanderlust" は写真キャプションの定番。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'sojourn', pron: 'ソジャーン', pos: 'n', ja: '(一時的な)滞在',
        example: "My 'brief sojourn' in the bookstore lasted three hours and cost a concerning amount.",
        exampleJa: '書店での「短い滞在」は3時間に及び、不安になる額がかかった。',
        note: '一時的に他所に留まること。"a brief sojourn abroad"。やや文語で旅行記向き。動詞でも使う。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'treacherous', pron: 'トレチャラス', pos: 'adj', ja: '危険な、油断ならない、裏切りの',
        example: "The hotel's 'scenic shortcut' turned out to be a treacherous goat path with a nice view.",
        exampleJa: 'ホテルの「景色のいい近道」は、眺めはいいが油断ならないヤギの道だった。',
        note: '見た目以上に危険/信用できない。"treacherous roads/conditions"、"treacherous friend"(裏切り者)。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'scenic', pron: 'シーニック', pos: 'adj', ja: '景色のいい、眺めのよい',
        example: "We took the scenic route, which is travel-speak for 'we are extremely lost but it's pretty.'",
        exampleJa: '俺たちは景色のいいルートを行った。旅行用語で「めちゃ迷ってるけど綺麗」って意味だ。',
        note: '風景が美しい。"scenic route/view/spot"。"the scenic route" は遠回りの定番表現。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'serene', pron: 'セリーン', pos: 'adj', ja: '静かで穏やかな、安らかな',
        example: "The beach was serene at dawn — for ten whole minutes before the tour buses arrived.",
        exampleJa: '夜明けのビーチは安らかだった。観光バスが来るまでの丸10分間は。',
        note: '波風のない静けさ・心の平穏。"serene lake/smile/expression"。placid の仲間で美しい1級語。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'bustling', pron: 'バスリング', pos: 'adj', ja: 'にぎわう、ごった返す',
        example: "The market was so bustling I lost my friend, found a snack, and stopped looking for my friend.",
        exampleJa: '市場がにぎわいすぎて友達を見失い、軽食を見つけ、友達を探すのをやめた。',
        note: '人や活気でごった返す。"bustling city/market/street"。動詞 bustle。にぎやかな雑踏に。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'remote', pron: 'リモート', pos: 'adj', ja: '人里離れた、辺鄙な',
        example: "We booked a remote cabin 'to disconnect' and spent the first hour hunting for Wi-Fi.",
        exampleJa: '「デジタルデトックス」のために人里離れた山小屋を予約し、最初の1時間Wi-Fi探しに費やした。',
        note: '中心から遠く隔たった。"remote village/area/island"。「リモートワーク」の remote と同語。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'picturesque', pron: 'ピクチャレスク', pos: 'adj', ja: '絵のように美しい',
        example: "The village was so picturesque it felt rude to photograph it with my smudged phone camera.",
        exampleJa: 'その村は絵のように美しくて、指紋だらけのスマホカメラで撮るのが失礼に思えた。',
        note: '一枚の絵のような美しさ。"picturesque village/scenery/cottage"。観光地の鉄板形容詞。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'itinerary', pron: 'アイティネラリー', pos: 'n', ja: '旅程、旅行計画',
        example: "My friend made a minute-by-minute itinerary. My only item said 'eat things, see stuff.'",
        exampleJa: '友達は分刻みの旅程を組んだ。俺の項目は「色々食う、色々見る」だけだった。',
        note: '旅のスケジュール表。"detailed itinerary/travel itinerary"。旅行の手配で必須語。',
    },
    {
        daySlot: 24, month: '2026-06', en: 'quaint', pron: 'クェイント', pos: 'adj', ja: '古風で趣のある、こぢんまりと魅力的な',
        example: "The cafe was charmingly quaint, meaning tiny, slightly crooked, and out of everything good.",
        exampleJa: 'そのカフェは魅力的に古風だった。つまり狭くて、少し傾いてて、いいものは全部売り切れてた。',
        note: '古めかしくて可愛らしい。"quaint village/shop/custom"。褒めつつ「小さくて時代遅れ」の皮肉も。',
    },

    // ============================================================
    // 2026-06-25  Day: Strong Emotions
    // ============================================================
    {
        daySlot: 25, month: '2026-06', en: 'irate', pron: 'アイレイト', pos: 'adj', ja: '激怒した、かんかんに怒った',
        example: "I become irate the instant a website logs me out for being 'inactive' for ninety seconds.",
        exampleJa: '90秒「操作なし」でログアウトさせるサイトに、俺は瞬時に激怒する。',
        note: '"very angry" の格上。"irate customer"(怒り狂った客)はクレーム対応の定番。1級頻出。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'elated', pron: 'イレイティッド', pos: 'adj', ja: '大喜びの、有頂天の',
        example: "I was elated to find a parking spot, then spent twenty minutes failing to fit into it.",
        exampleJa: '駐車スペースを見つけて有頂天になり、その後20分かけて入れるのに失敗した。',
        note: '飛び上がるほど嬉しい。"elated/thrilled"。良い知らせ・成功に。名詞 elation。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'despondent', pron: 'ディスポンデント', pos: 'adj', ja: '意気消沈した、失意の',
        example: "I get despondent every Sunday at 6 p.m. when the weekend quietly betrays me.",
        exampleJa: '毎週日曜の午後6時、週末が静かに俺を裏切る瞬間に意気消沈する。',
        note: '希望を失って落ち込む。"despondent over/about"。depressed の文語版。深い落胆に。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'livid', pron: 'リヴィッド', pos: 'adj', ja: '激怒した、真っ青になった',
        example: "She was livid when someone ate her clearly labeled lunch from the office fridge.",
        exampleJa: '名前をはっきり書いた弁当を社内冷蔵庫から食われて、彼女は激怒した。',
        note: '怒りで顔色が変わるほど激しい。"absolutely livid"。元は「鉛色・青黒い」で、怒り・打撲の両方に。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'jubilant', pron: 'ジュビラント', pos: 'adj', ja: '歓喜にあふれた、大喜びの',
        example: "The whole office was jubilant when the meeting got cancelled with thirty seconds to spare.",
        exampleJa: '会議が開始30秒前に中止になり、オフィス全体が歓喜にあふれた。',
        note: '勝利・吉報に沸き立つ喜び。"jubilant crowd/fans"。スポーツ・選挙の歓喜に。elated より集団的。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'forlorn', pron: 'フォーローン', pos: 'adj', ja: 'わびしい、見捨てられて寂しい',
        example: "One forlorn fry sat at the bottom of the bag, and honestly, I related to it deeply.",
        exampleJa: '袋の底に一本のわびしいポテトが残ってて、正直、深く共感した。',
        note: '孤独で哀れな様子。"forlorn figure/expression/hope"。人にも物にも使える詩的な語。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'indignant', pron: 'インディグナント', pos: 'adj', ja: '憤慨した、(不当さに)腹を立てた',
        example: "My cat looked deeply indignant that dinner arrived a full four minutes behind schedule.",
        exampleJa: '夕飯が予定より丸4分遅れたことに、うちの猫は深く憤慨した顔をしていた。',
        note: '不公平・不当な扱いへの正当な怒り。"indignant at/about"。名詞 indignation。1級頻出。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'crestfallen', pron: 'クレストフォールン', pos: 'adj', ja: 'がっくりした、しょげ返った',
        example: "He was crestfallen to learn the 'all-you-can-eat' had a strict and very real time limit.",
        exampleJa: '「食べ放題」に厳格で実在する時間制限があると知って、彼はがっくりきた。',
        note: '期待が外れてしょんぼり。元は鶏のトサカ(crest)が垂れる様子。失望をユーモラスに描ける。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'seething', pron: 'シージング', pos: 'adj', ja: '煮えくり返る、内心激高した',
        example: "I smiled politely while seething internally at the person reclining their seat into my knees.",
        exampleJa: '座席を俺の膝まで倒してきた人に、丁寧に微笑みながら内心は煮えくり返っていた。',
        note: '表に出さず怒りが沸騰する。動詞 seethe。"seething with rage/anger"。静かな激怒に最適。',
    },
    {
        daySlot: 25, month: '2026-06', en: 'ecstatic', pron: 'エクスタティック', pos: 'adj', ja: '有頂天の、無我夢中の',
        example: "I was ecstatic to find money in my coat — it was a receipt, but for two seconds, joy.",
        exampleJa: 'コートで金を見つけて有頂天になった。レシートだったけど、2秒間は歓喜だった。',
        note: '最高潮の喜び。"absolutely ecstatic"。elated よりさらに強い。euphoria の形容詞 euphoric の仲間。',
    },

    // ============================================================
    // 2026-06-26  Day: Lies & Deception
    // ============================================================
    {
        daySlot: 26, month: '2026-06', en: 'duplicitous', pron: 'デュープリシタス', pos: 'adj', ja: '二枚舌の、裏表のある',
        example: "My scale is duplicitous — kind in the morning, brutally honest after dinner.",
        exampleJa: 'うちの体重計は二枚舌だ。朝は優しく、夕食後は残酷なほど正直になる。',
        note: '表向きと裏で言うことが違う。"duplicitous behavior"。名詞 duplicity。裏切り者に。1級頻出。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'candid', pron: 'キャンディッド', pos: 'adj', ja: '率直な、ありのままの',
        example: "Can I be candid? Your 'homemade' cookies have a barcode-shaped dent on the bottom.",
        exampleJa: '率直に言っていい? 君の「手作り」クッキー、底にバーコード型のへこみがあるよ。',
        note: '包み隠さず正直。"candid opinion/conversation"、"candid photo"(自然なスナップ)。前向きな正直さ。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'devious', pron: 'ディーヴィアス', pos: 'adj', ja: '腹黒い、よこしまな、遠回しの',
        example: "My cat has a devious plan every morning: knock one item off the shelf to summon me.",
        exampleJa: 'うちの猫は毎朝よこしまな計画を持ってる。棚から物を一つ落として俺を召喚するのだ。',
        note: 'ずる賢く陰険。"devious scheme/plan/mind"。冗談めかして使うと面白い。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'disingenuous', pron: 'ディスインジェニュアス', pos: 'adj', ja: '不誠実な、(知ってて)とぼけた',
        example: "It's disingenuous to ask 'oh, you cut your hair?' when you clearly haven't noticed at all.",
        exampleJa: '明らかに全然気づいてないのに「あ、髪切った?」と聞くのは不誠実だ。',
        note: '本心を隠して誠実なふり。"disingenuous question/argument"。genuine の否定形。建前を見抜く語。1級頻出。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'evasive', pron: 'イヴェイシブ', pos: 'adj', ja: '言い逃れの、はぐらかす',
        example: "He got evasive the second I asked who finished the cake I was 'saving for later.'",
        exampleJa: '「後で食べようと取っといた」ケーキを誰が平らげたか聞いた瞬間、彼は言葉を濁し始めた。',
        note: '質問を避けてはっきり答えない。"evasive answer/about"。動詞 evade。追及をかわす態度に。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'blatant', pron: 'ブレイタント', pos: 'adj', ja: 'あからさまな、ぬけぬけとした',
        example: "Taking a 'sick day' to attend a concert is a blatant lie I fully respect, by the way.",
        exampleJa: 'コンサートのために「病欠」を取るのはあからさまな嘘だが、ちなみに全面的に尊敬する。',
        note: '隠す気もないほど露骨。"blatant lie/disregard/attempt"。悪事や嘘の露骨さを強調。1級頻出。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'furtive', pron: 'ファーティブ', pos: 'adj', ja: 'こそこそした、人目を盗んだ',
        example: "I shot a furtive glance at my phone during the meeting and made direct eye contact with my boss.",
        exampleJa: '会議中こっそりスマホを盗み見たら、上司とばっちり目が合った。',
        note: '見つからないようこっそり。"furtive glance/movement"。surreptitious の仲間。盗み見・隠し事に。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'deceitful', pron: 'ディシートフル', pos: 'adj', ja: '人を欺く、ごまかしの',
        example: "Snooze buttons are deceitful little machines that promise rest and deliver only chaos.",
        exampleJa: 'スヌーズボタンは人を欺く小さな機械だ。休息を約束して混沌だけをよこす。',
        note: '人をだまそうとする。"deceitful behavior/practices"。動詞 deceive、名詞 deceit。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'forthright', pron: 'フォースライト', pos: 'adj', ja: '単刀直入な、率直な',
        example: "My grandma is refreshingly forthright — she told me my haircut 'will probably grow back.'",
        exampleJa: 'うちのばあちゃんは清々しいほど単刀直入だ。俺の散髪を「たぶんまた伸びるよ」と言った。',
        note: '遠回しにせずズバッと言う。"forthright manner/answer"。candid の仲間で、はっきりした物言いに。',
    },
    {
        daySlot: 26, month: '2026-06', en: 'conniving', pron: 'コナイヴィング', pos: 'adj', ja: 'ずる賢い、悪事を企む',
        example: "My dog gave a conniving look, then 'accidentally' herded me toward the treat cabinet.",
        exampleJa: 'うちの犬がずる賢い目つきをして、「うっかり」俺をおやつ棚へと誘導した。',
        note: '裏で陰謀を巡らす。動詞 connive(黙認・共謀する)。"conniving" は悪役の常套句。',
    },

    // ============================================================
    // 2026-06-27  Day: Nature & Weather
    // ============================================================
    {
        daySlot: 27, month: '2026-06', en: 'torrential', pron: 'トレンシャル', pos: 'adj', ja: '土砂降りの、奔流のような',
        example: "It was sunny when I left, so naturally I walked into torrential rain with no umbrella.",
        exampleJa: '出る時は晴れてたから、当然のように傘なしで土砂降りに突っ込んだ。',
        note: '滝のような激しい雨。"torrential rain/downpour"。梅雨・台風の描写に必須。1級頻出。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'balmy', pron: 'バーミー', pos: 'adj', ja: '(気候が)穏やかで心地よい',
        example: "It was a balmy evening, perfect for a walk, so I admired it thoroughly from my window.",
        exampleJa: '穏やかで心地よい夕暮れで散歩に最適だったから、窓から存分に眺めた。',
        note: '暖かく快適な気候。"balmy evening/weather/breeze"。夏の宵にぴったりの心地よさ。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'arid', pron: 'アリッド', pos: 'adj', ja: '乾燥した、不毛の',
        example: "My houseplant survives my arid apartment purely out of spite at this point.",
        exampleJa: 'うちの観葉植物は、もはや意地だけで俺の乾燥しきった部屋を生き延びてる。',
        note: '雨が少なく乾ききった。"arid climate/desert/region"。比喩で「無味乾燥な」も。地理ニュースで頻出。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'tempestuous', pron: 'テンペスチュアス', pos: 'adj', ja: '大荒れの、激しい',
        example: "The weather was tempestuous, much like the group chat deciding where to eat.",
        exampleJa: '天気は大荒れだった。どこで食べるか決めるグループチャットと同じくらいに。',
        note: '嵐のように荒れ狂う。天気にも感情・関係にも。"tempestuous relationship/affair"。tempest(嵐)の形容詞。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'sweltering', pron: 'スウェルタリング', pos: 'adj', ja: 'うだるように暑い',
        example: "It was so sweltering that my ice cream became a beverage in under ninety seconds.",
        exampleJa: 'うだるような暑さで、俺のアイスは90秒足らずで飲み物になった。',
        note: '蒸し暑くて汗だくになる暑さ。"sweltering heat/summer/day"。真夏の描写に。動詞 swelter。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'frigid', pron: 'フリジッド', pos: 'adj', ja: '極寒の、冷淡な',
        example: "The office AC keeps it so frigid in July that I bring a winter coat to a summer job.",
        exampleJa: 'オフィスのエアコンが7月でも極寒に保つから、夏の仕事に冬コートを持参してる。',
        note: '凍えるほど寒い/態度が冷たい。"frigid temperatures/air"、"frigid stare"(冷たい視線)。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'tranquil', pron: 'トランクィル', pos: 'adj', ja: '静穏な、もの静かな',
        example: "The morning was tranquil until the neighbor decided 7 a.m. was leaf-blower o'clock.",
        exampleJa: '朝は静穏だった。隣人が午前7時を「落ち葉ブロワーの時間」と決めるまでは。',
        note: '波風のない静けさ。"tranquil scene/atmosphere/setting"。serene の仲間。名詞 tranquility。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'gusty', pron: 'ガスティ', pos: 'adj', ja: '突風の吹く、風の強い',
        example: "It was so gusty my umbrella turned inside out and briefly became modern art.",
        exampleJa: '突風が強すぎて傘が裏返り、一瞬モダンアートになった。',
        note: '不規則な強風が吹く。"gusty winds/conditions"。名詞 gust(一陣の突風)。天気予報の定番語。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'scorching', pron: 'スコーチング', pos: 'adj', ja: '焼けつくような、猛烈に暑い',
        example: "The pavement was so scorching I watched a pigeon hop like it regretted having feet.",
        exampleJa: '舗道が焼けつくように熱くて、ハトが足があることを後悔してるみたいに跳ねてた。',
        note: '肌が焼けるほど暑い。"scorching heat/sun/day"。sweltering より「直射でジリジリ」寄り。',
    },
    {
        daySlot: 27, month: '2026-06', en: 'overcast', pron: 'オーバーキャスト', pos: 'adj', ja: '(空が)どんより曇った',
        example: "The sky was overcast all day, perfectly matching my motivation and general life plan.",
        exampleJa: '空は一日中どんより曇ってて、俺のやる気と人生設計全般に完璧にマッチしてた。',
        note: '雲が空一面を覆う。"overcast sky/day/skies"。cloudy の天気予報用フォーマル版。',
    },

    // ============================================================
    // 2026-06-28  Day: Laziness & Apathy
    // ============================================================
    {
        daySlot: 28, month: '2026-06', en: 'indolent', pron: 'インドレント', pos: 'adj', ja: '怠惰な、もの臭い',
        example: "I'm not indolent, I'm 'conserving energy' for a heroic moment that has yet to arrive.",
        exampleJa: '俺は怠惰なんじゃない。まだ訪れていない英雄的瞬間のために「エネルギーを温存」してるんだ。',
        note: '労を惜しんでだらける。"indolent lifestyle"。lazy の文語版。優雅な怠惰のニュアンスも。1級頻出。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'apathetic', pron: 'アパセティック', pos: 'adj', ja: '無関心な、やる気のない',
        example: "I'm passionately apathetic about which restaurant we pick, until you pick the wrong one.",
        exampleJa: 'どの店にするかには情熱的に無関心だ。君が間違った店を選ぶまでは。',
        note: '関心も意欲も湧かない。"apathetic about/toward"。名詞 apathy。政治的無関心などにも。1級頻出。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'complacent', pron: 'コンプレイサント', pos: 'adj', ja: '現状に甘んじた、自己満足の',
        example: "I got complacent after one good week of habits and immediately undid all of it on Saturday.",
        exampleJa: '良い習慣が1週間続いて慢心し、土曜に即座に全部台無しにした。',
        note: '満足しきって努力をやめる(危険な)状態。"complacent attitude"、"grow complacent"。警告でよく使う。1級頻出。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'listless', pron: 'リストレス', pos: 'adj', ja: '気だるい、何もする気が起きない',
        example: "I spent a listless afternoon opening the fridge, finding nothing new, and closing it again.",
        exampleJa: '気だるい午後を、冷蔵庫を開け、何も新しいものがなく、また閉めることに費やした。',
        note: '活気や興味を失ってだらり。"listless mood/afternoon"。lethargic に近いが「無関心さ」も含む。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'slothful', pron: 'スロースフル', pos: 'adj', ja: '不精な、ものぐさな',
        example: "On slothful Sundays, walking to the other room for the charger counts as my cardio.",
        exampleJa: 'もの臭い日曜は、充電器を取りに隣の部屋まで歩くのが俺の有酸素運動だ。',
        note: '極度に怠惰。七つの大罪 sloth(怠惰)の形容詞。動物のナマケモノも sloth。重い怠惰に。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'inert', pron: 'イナート', pos: 'adj', ja: '不活発な、惰性で動かない',
        example: "After a big lunch, I become completely inert, like furniture that occasionally sighs.",
        exampleJa: '大盛りの昼食のあと、俺は完全に不活発になる。たまにため息をつく家具みたいに。',
        note: '自力では動かない・反応しない。化学では「不活性」。"inert gas"、比喩で「ぐったり動かない」。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'idle', pron: 'アイドル', pos: 'adj', ja: '何もしていない、遊んでいる',
        example: "My gym membership has been idle so long the staff probably think I moved away.",
        exampleJa: '俺のジム会員証は長らく遊んでて、スタッフはたぶん俺が引っ越したと思ってる。',
        note: '稼働せず遊休状態。"idle hands/machine"、"sit idle"。エンジンの「アイドリング」も同語。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'lackadaisical', pron: 'ラカデイジカル', pos: 'adj', ja: '気の抜けた、いいかげんな',
        example: "His lackadaisical approach to deadlines means 'urgent' and 'next month' feel identical to him.",
        exampleJa: '締切への彼のいいかげんな姿勢では、「緊急」と「来月」が同じに感じるらしい。',
        note: '熱意も注意もなくだらだら。"lackadaisical attitude/effort"。長くて面白い語感の1級語。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'torpid', pron: 'トーピッド', pos: 'adj', ja: '鈍くて不活発な、麻痺したような',
        example: "The whole office goes torpid right after lunch, running purely on coffee and false hope.",
        exampleJa: 'オフィス全体が昼食直後に鈍くなり、コーヒーと根拠なき希望だけで動いてる。',
        note: '動きも頭も鈍麻した状態。冬眠動物の状態にも。名詞 torpor。lethargic の最上級。',
    },
    {
        daySlot: 28, month: '2026-06', en: 'stagnant', pron: 'スタグナント', pos: 'adj', ja: '停滞した、よどんだ',
        example: "My to-do list has been stagnant for weeks; the top item now feels like an ancient ruin.",
        exampleJa: '俺のToDoリストは何週間も停滞してる。一番上の項目はもはや古代遺跡みたいだ。',
        note: '流れず動かず腐る。"stagnant water/economy/career"。水・経済・人生の停滞に。動詞 stagnate。1級頻出。',
    },

    // ============================================================
    // 2026-06-29  Day: Ambition & Success
    // ============================================================
    {
        daySlot: 29, month: '2026-06', en: 'tenacious', pron: 'テナシャス', pos: 'adj', ja: '粘り強い、執念深い',
        example: "I'm tenacious about exactly one thing: finding the absolute cheapest way to get free shipping.",
        exampleJa: '俺がただ一つ粘り強いのは、送料無料の最安ルートを見つけることだ。',
        note: '簡単に諦めず食らいつく。"tenacious spirit/effort"。名詞 tenacity。粘りの褒め言葉。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'resilient', pron: 'リジリエント', pos: 'adj', ja: '立ち直りの早い、回復力のある',
        example: "My houseplant is more resilient than I am — it bounces back from total neglect by Friday.",
        exampleJa: 'うちの観葉植物は俺より回復力がある。完全放置から金曜には復活する。',
        note: '逆境や失敗から跳ね返る。"resilient economy/person/material"。近年のビジネス頻出語。名詞 resilience。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'formidable', pron: 'フォーミダブル', pos: 'adj', ja: '手強い、恐るべき、堂々たる',
        example: "My grandma is a formidable opponent at cards and shows absolutely no mercy to children.",
        exampleJa: 'うちのばあちゃんはトランプでは手強い相手で、子供にも一切容赦しない。',
        note: '圧倒されるほど強い・立派。"formidable opponent/challenge/reputation"。畏怖を込めた称賛。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'prolific', pron: 'プロリフィック', pos: 'adj', ja: '多作の、次々と生み出す',
        example: "I'm a prolific maker of to-do lists and a tragically rare finisher of them.",
        exampleJa: '俺はToDoリストの多作な作り手で、悲しいほど稀な完遂者だ。',
        note: '作品・成果を大量に生む。"prolific writer/artist/scorer"。創作・スポーツの活躍に。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'dogged', pron: 'ドギッド', pos: 'adj', ja: '粘り強い、不屈の',
        example: "Through dogged determination, I finished the series in one weekend and regretted nothing.",
        exampleJa: '不屈の決意で、俺は週末ひとつでそのシリーズを完走し、何一つ後悔しなかった。',
        note: '頑として諦めない。"dogged determination/persistence/pursuit"。dog(犬)が獲物に食らいつく様子から。発音は「ドギッド」と2音節。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'relentless', pron: 'リレントレス', pos: 'adj', ja: '容赦ない、絶え間ない',
        example: "My phone's relentless 'storage almost full' notifications have become my main life coach.",
        exampleJa: 'スマホの容赦ない「ストレージ残りわずか」通知が、俺の主たるライフコーチになった。',
        note: '休みなく執拗に続く。"relentless pressure/pursuit/attack"。良くも悪くも止まらない勢いに。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'eminent', pron: 'エミネント', pos: 'adj', ja: '著名な、卓越した',
        example: "I'm an eminent expert in knowing which couch cushion is the comfiest in any given room.",
        exampleJa: '俺はどの部屋でも一番座り心地のいいソファクッションを見抜く、卓越した専門家だ。',
        note: 'その分野で名声・地位が高い。"eminent scientist/scholar"。imminent(差し迫った)と綴り混同注意。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'meteoric', pron: 'ミティオリック', pos: 'adj', ja: '急上昇の、彗星のごとき',
        example: "My houseplant's meteoric rise ended the moment I proudly told everyone how well it was doing.",
        exampleJa: 'うちの観葉植物の急成長は、調子がいいと得意げに皆に言った瞬間に終わった。',
        note: '流れ星のように急激な。"meteoric rise/career"。成功・出世の急上昇に。落下の速さも暗示。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'thriving', pron: 'スライヴィング', pos: 'adj', ja: '繁盛している、活気にあふれた',
        example: "I have a thriving collection of half-read books and zero plans to ever finish any of them.",
        exampleJa: '俺は読みかけの本の繁盛したコレクションを持ってて、どれも読み終える計画はゼロだ。',
        note: '勢いよく成長・繁栄。"thriving business/community/ecosystem"。動詞 thrive(栄える)。',
    },
    {
        daySlot: 29, month: '2026-06', en: 'accomplished', pron: 'アコンプリッシュト', pos: 'adj', ja: '熟達した、多芸多才な',
        example: "She's an accomplished pianist, chef, and athlete. I'm an accomplished afternoon napper.",
        exampleJa: '彼女は熟達したピアニストでシェフでアスリート。俺は熟達した昼寝の達人だ。',
        note: '技能を磨き上げた・立派な。"accomplished musician/writer"。動詞 accomplish の形容詞。皮肉でも使える。',
    },

    // ============================================================
    // 2026-06-30  Day: Life & Philosophy
    // ============================================================
    {
        daySlot: 30, month: '2026-06', en: 'profound', pron: 'プロファウンド', pos: 'adj', ja: '深遠な、深い',
        example: "At 3 a.m. I have profound thoughts about the universe; by 9 a.m. I can't find my keys.",
        exampleJa: '午前3時には宇宙について深遠なことを考えるのに、午前9時には鍵が見つからない。',
        note: '知性・感情の深さ。"profound impact/effect/silence/insight"。浅薄(superficial)の対。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'introspective', pron: 'イントロスペクティブ', pos: 'adj', ja: '内省的な、自分を見つめる',
        example: "I get deeply introspective every time a playlist ends and I'm left alone with my thoughts.",
        exampleJa: 'プレイリストが終わって自分の思考と二人きりになるたび、俺は深く内省的になる。',
        note: '自分の内面を見つめる。"introspective mood/person/lyrics"。名詞 introspection。物思いの語。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'transient', pron: 'トランジエント', pos: 'adj', ja: 'つかの間の、移ろいやすい',
        example: "Happiness from a clean room is transient — it lasts until I take off one single sock.",
        exampleJa: '片付いた部屋の幸福はつかの間だ。靴下を片方脱ぐまでしかもたない。',
        note: '一時的で長続きしない。"transient nature/feeling/population"。ephemeral の知的版。名詞でも(通行人)。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'existential', pron: 'エグジステンシャル', pos: 'adj', ja: '存在に関わる、実存的な',
        example: "Choosing what to watch can trigger a full existential crisis about how I spend my one life.",
        exampleJa: '何を観るか選ぶだけで、たった一度の人生の使い方について完全な実存的危機に陥る。',
        note: '存在の意味に関わる。"existential crisis/threat/question"。哲学用語だが日常でも「実存的危機」が定番。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'contemplative', pron: 'コンテンプラティブ', pos: 'adj', ja: '瞑想的な、思索にふける',
        example: "I look contemplative staring out the train window, but I'm just rehearsing an old argument.",
        exampleJa: '電車の窓を眺めて思索的に見えるが、実は昔の口喧嘩を脳内で再演してるだけだ。',
        note: '静かに深く考え込む。"contemplative mood/silence/expression"。動詞 contemplate(熟考する)。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'mortality', pron: 'モータリティ', pos: 'n', ja: '死すべき運命、死亡率',
        example: "Nothing reminds me of my own mortality like groaning out loud when I bend down for a sock.",
        exampleJa: '靴下を取りに屈んで思わず声が出る瞬間ほど、自分の死すべき運命を実感することはない。',
        note: '人が必ず死ぬこと/死亡率。"sense of mortality"、"infant mortality"(乳児死亡率)。哲学にも統計にも。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'epiphany', pron: 'エピファニー', pos: 'n', ja: '突然のひらめき、悟り',
        example: "I had an epiphany in the shower, forgot it by the towel, and have been haunted ever since.",
        exampleJa: 'シャワー中にひらめきがあったが、タオルまでに忘れ、以来ずっと心残りだ。',
        note: '本質を突然理解する瞬間。"have an epiphany"、"a sudden epiphany"。気づき・覚醒の語。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'serendipity', pron: 'セレンディピティ', pos: 'n', ja: '偶然の幸運な発見',
        example: "True serendipity is reaching into an old bag and finding snacks you forgot you ever bought.",
        exampleJa: '本物の偶然の幸運とは、古いカバンに手を入れて、買ったことすら忘れた菓子を見つけることだ。',
        note: '思いがけず良いものに出会う幸運。"by serendipity"。英語で「最も美しい語」によく選ばれる。形容詞 serendipitous。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'poignant', pron: 'ポイニャント', pos: 'adj', ja: '胸を打つ、心に染みる',
        example: "There's something poignant about the last fry going cold while everyone insists they're full.",
        exampleJa: '全員が満腹だと言い張る中で最後のポテトが冷めていくのには、どこか胸を打つものがある。',
        note: '切なく心に響く。"poignant moment/reminder/story"。発音は「ポイニャント」(g は無音)。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-06', en: 'inevitable', pron: 'インエヴィタブル', pos: 'adj', ja: '避けられない、必然の',
        example: "It's inevitable: the moment my food arrives, someone will call needing 'just one quick thing.'",
        exampleJa: '避けられない。料理が届いた瞬間、誰かが「ちょっとだけ」と電話してくる。',
        note: '何をしても起こる運命。"inevitable outcome/consequence/result"。"the inevitable"(避けられない事態)。1級頻出。',
    },

    // ============================================================
    // 2026-07-01  Phrasal Verbs I (必出の基本)
    // ============================================================
    {
        daySlot: 1, month: '2026-07', en: 'gear up', pron: 'ギア・アップ', pos: 'phr v', ja: '準備する、態勢を整える',
        example: "Everyone's gearing up for the meeting while I'm still gearing up to find the meeting link.",
        exampleJa: 'みんな会議に向けて態勢を整えてる横で、俺はまだ会議リンクを探す態勢を整えてる。',
        note: '本番に向けて準備する。"gear up for ~"。"prepare" より臨戦態勢のニュアンス。1級大問1常連。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'butt in', pron: 'バット・イン', pos: 'phr v', ja: '口を挟む、割り込む',
        example: "Sorry to butt in, but you've been describing the wrong movie for ten minutes.",
        exampleJa: '口を挟んで悪いけど、君、10分間ずっと違う映画の話してるよ。',
        note: '会話に割り込む。"Sorry to butt in, but ~" は丁寧な前置きとして会話で超実用。1級頻出句動詞。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'stand in', pron: 'スタンド・イン', pos: 'phr v', ja: '代役を務める、代わりに入る',
        example: "I stood in for the host and somehow ended up agreeing to host next year too.",
        exampleJa: '司会の代役をやったら、なぜか来年の司会も引き受けてた。',
        note: '人の代わりを務める。"stand in for ~"。名詞 stand-in は「代役」。仕事で使える。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'bow out', pron: 'バウ・アウト', pos: 'phr v', ja: '身を引く、辞退する',
        example: "I bowed out of the karaoke contest the moment I heard the others could actually sing.",
        exampleJa: '他の連中が本当に歌えると分かった瞬間、カラオケ大会から身を引いた。',
        note: '潔く退く・辞退する。"bow out of ~"。負け戦から上品に撤退する時に。1級頻出。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'fire away', pron: 'ファイア・アウェイ', pos: 'phr v', ja: '(質問などを)どんどん始める',
        example: "\"Can I ask you something?\" \"Fire away — unless it's about my gym membership.\"",
        exampleJa: '「ちょっと聞いていい？」「どうぞどんどん。ジムの会員権の話じゃなければね」',
        note: '「遠慮なくどうぞ」。質問を促す返事として会話で即使える。命令形 "Fire away!" が定番。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'hail from', pron: 'ヘイル・フロム', pos: 'phr v', ja: '〜の出身である',
        example: "She hails from a tiny town where the biggest news is a new vending machine.",
        exampleJa: '彼女は、最大のニュースが新しい自販機という小さな町の出身だ。',
        note: '"come from" の少しフォーマルな版。自己紹介や人物紹介で品が出る。1級語彙。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'tag along', pron: 'タグ・アロング', pos: 'phr v', ja: '(おまけで)ついて行く',
        example: "I only tagged along for the food and ended up being the designated driver.",
        exampleJa: 'メシ目当てでついて行っただけなのに、結局は運転手役にされた。',
        note: '誘われて/勝手についていく。"tag along with ~"。遠慮がちな同行のニュアンス。会話頻出。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'goof off', pron: 'グーフ・オフ', pos: 'phr v', ja: 'サボる、ダラダラする',
        example: "I planned to study all weekend but goofed off so professionally I deserve a certificate.",
        exampleJa: '週末ずっと勉強する予定が、あまりにプロ級にサボったので表彰されるべきだ。',
        note: 'やるべき事をせずダラける。アメリカ口語で超日常的。自虐に最適。1級でも出る。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'butter up', pron: 'バター・アップ', pos: 'phr v', ja: 'お世辞を言う、ゴマをする',
        example: "He buttered up the boss so hard I could practically hear the toast.",
        exampleJa: '彼が上司にゴマをすりまくるので、トーストの音が聞こえてきそうだった。',
        note: '機嫌をとろうとおだてる。"butter A up"。バターを塗るイメージで覚える。1級頻出句動詞。',
    },
    {
        daySlot: 1, month: '2026-07', en: 'clam up', pron: 'クラム・アップ', pos: 'phr v', ja: '黙り込む、貝になる',
        example: "He talks nonstop until you ask who he likes — then he clams up instantly.",
        exampleJa: '彼は喋りっぱなしなのに、好きな人を聞いた途端に貝になる。',
        note: '急に口を閉ざす。clam(二枚貝)が殻を閉じるイメージ。"clam up" で覚えやすい。1級語。',
    },

    // ============================================================
    // 2026-07-02  Phrasal Verbs: Money
    // ============================================================
    {
        daySlot: 2, month: '2026-07', en: 'fork out', pron: 'フォーク・アウト', pos: 'phr v', ja: '(渋々)大金を払う',
        example: "I had to fork out a fortune for a phone screen I cracked walking out of the shop.",
        exampleJa: '店を出た瞬間に割ったスマホ画面に、大金を渋々払うはめになった。',
        note: '不本意ながら高い金を払う。"fork out (money) for ~"。痛い出費の愚痴に最適。1級熟語頻出。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'dish out', pron: 'ディッシュ・アウト', pos: 'phr v', ja: '(気前よく/むやみに)配る、与える',
        example: "He dishes out advice like free samples but never takes any himself.",
        exampleJa: '彼は試食品みたいにアドバイスを配りまくるが、自分では一切受け取らない。',
        note: 'お金・批判・助言などをどんどん与える。"dish out criticism/advice"。1級頻出。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'jack up', pron: 'ジャック・アップ', pos: 'phr v', ja: '(値段を)つり上げる',
        example: "The cafe jacked up the prices and quietly shrank the cake. I noticed both.",
        exampleJa: 'カフェは値段をつり上げ、こっそりケーキを小さくした。両方バレてるぞ。',
        note: '価格を急に大きく上げる。"jack up the price"。ニュースでも会話でも使う。1級語彙。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'bail out', pron: 'ベイル・アウト', pos: 'phr v', ja: '(金銭的に)救済する、肩代わりする',
        example: "My savings exist purely to bail out my past self's terrible decisions.",
        exampleJa: '俺の貯金は、過去の自分のひどい決断を救済するためだけに存在している。',
        note: '困っている人/企業を金で救う。"bail out a company"。名詞 bailout は経済ニュース必須。1級頻出。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'crank out', pron: 'クランク・アウト', pos: 'phr v', ja: '量産する、次々作り出す',
        example: "He cranks out excuses faster than the printer cranks out pages.",
        exampleJa: '彼は、プリンターが紙を吐き出すより速く言い訳を量産する。',
        note: '機械的に大量生産する。記事・製品・言い訳など。やや皮肉が混じる。1級語。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'drum up', pron: 'ドラム・アップ', pos: 'phr v', ja: '(支持・客などを)かき集める',
        example: "We drummed up support for the party until everyone realized they had to cook.",
        exampleJa: 'パーティーへの賛同をかき集めたが、全員が料理担当だと気づくまでの話だった。',
        note: '宣伝・勧誘で支持や商売を盛り上げる。"drum up business/support"。ビジネス頻出。1級語彙。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'rope in', pron: 'ロープ・イン', pos: 'phr v', ja: '(嫌がる人を)引き込む、駆り出す',
        example: "I went to help for five minutes and got roped into the whole weekend move.",
        exampleJa: '5分手伝うつもりが、週末の引っ越し丸ごとに駆り出された。',
        note: '半ば強引に巻き込む。"get roped into ~"(巻き込まれる)が会話で頻出。1級熟語。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'tack on', pron: 'タック・オン', pos: 'phr v', ja: '(追加で)付け足す、上乗せする',
        example: "The hotel tacked on a 'resort fee' for a pool I never even saw.",
        exampleJa: 'ホテルは、見たことすらないプールの「リゾート料金」を上乗せしてきた。',
        note: '後から余計に加える。料金・条件・一言など。"tack on a fee"。請求の不満トークに。1級語。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'pan out', pron: 'パン・アウト', pos: 'phr v', ja: 'うまくいく、結果が出る',
        example: "My plan to save money by cooking didn't pan out — I now own 14 sauces.",
        exampleJa: '自炊で節約する計画はうまくいかなかった。今や14種類のソースの持ち主だ。',
        note: '計画などが結局うまく運ぶ。否定形 "didn\'t pan out"(不発に終わった)が特に頻出。1級語彙。',
    },
    {
        daySlot: 2, month: '2026-07', en: 'parcel out', pron: 'パーセル・アウト', pos: 'phr v', ja: '小分けにして配る、分配する',
        example: "Mom parcels out the good snacks like state secrets, one per person.",
        exampleJa: '母は、いいお菓子を国家機密みたいに一人一個ずつ小分けして配る。',
        note: '少しずつ公平に分け与える。仕事・遺産・お菓子など。"parcel out tasks"。1級語。',
    },

    // ============================================================
    // 2026-07-03  Dodge & Endure (乗り切る・かわす)
    // ============================================================
    {
        daySlot: 3, month: '2026-07', en: 'tide over', pron: 'タイド・オーバー', pos: 'phr v', ja: '(難局を)一時的にしのがせる',
        example: "This snack should tide me over until dinner — said five minutes before dinner.",
        exampleJa: 'この軽食で夕飯までしのげるはず。夕飯の5分前にそう言った。',
        note: '当面のピンチを乗り切らせる。"tide someone over (until ~)"。お金・食料で頻出。1級熟語。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'stave off', pron: 'ステイヴ・オフ', pos: 'phr v', ja: '(危機などを)食い止める、防ぐ',
        example: "I drink coffee to stave off sleep and then lie awake at 3 a.m. regretting it.",
        exampleJa: '眠気を食い止めるためにコーヒーを飲み、午前3時に目が冴えて後悔する。',
        note: '迫る悪い事を当面くい止める。"stave off hunger/a crisis/defeat"。1級長文・大問1頻出。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'shrug off', pron: 'シュラッグ・オフ', pos: 'phr v', ja: '受け流す、軽くあしらう',
        example: "She shrugged off the criticism but remembered every word for nine years.",
        exampleJa: '彼女は批判を軽く受け流したが、その全部を9年間覚えていた。',
        note: '気にしない素振りで受け流す。"shrug off criticism/a defeat"。肩をすくめるイメージ。1級頻出。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'wriggle out of', pron: 'リグル・アウト・オブ', pos: 'phr v', ja: '(義務などから)うまく逃れる',
        example: "He always wriggles out of doing dishes by suddenly remembering an 'urgent call.'",
        exampleJa: '彼はいつも「急ぎの電話」を突然思い出して、皿洗いからうまく逃れる。',
        note: '責任・約束から身をよじって逃げる。"wriggle out of ~ing"。ずる賢さのニュアンス。1級熟語(過去複数回出題)。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'worm out of', pron: 'ワーム・アウト・オブ', pos: 'phr v', ja: '(うまく)言い逃れる、逃れる',
        example: "Don't try to worm out of it — I have screenshots and a very good memory.",
        exampleJa: '言い逃れようとするな。スクショもあるし記憶力もいいんだ。',
        note: '巧妙に責任を回避する。"worm out of ~"。wriggle out of の親戚で、よりずる賢い。1級語。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'bottle up', pron: 'ボトル・アップ', pos: 'phr v', ja: '(感情を)抑え込む、ため込む',
        example: "He bottled up his feelings for years, then cried at a phone commercial.",
        exampleJa: '彼は何年も感情をため込み、ある日スマホのCMで泣いた。',
        note: '怒り・悲しみを内に抑え込む。"bottle up emotions"。健康・心理の話で頻出。1級語彙。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'mull over', pron: 'マル・オーバー', pos: 'phr v', ja: 'じっくり考える、熟考する',
        example: "I mulled over the menu for ten minutes and ordered the exact thing I always get.",
        exampleJa: 'メニューを10分じっくり考えて、いつも頼むやつをそのまま注文した。',
        note: 'あれこれ時間をかけて検討する。"mull over a decision/an offer"。"think over" の格上。1級頻出。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'pore over', pron: 'ポア・オーバー', pos: 'phr v', ja: '(熱心に)読み込む、精査する',
        example: "I pored over the contract for an hour and still signed the part that ruins me.",
        exampleJa: '契約書を1時間熟読したのに、結局自分を破滅させる条項にサインした。',
        note: '書類・本を食い入るように読む。"pore over documents"。pour(注ぐ)と混同注意。1級頻出句動詞。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'ferret out', pron: 'フェレット・アウト', pos: 'phr v', ja: '(苦労して)探り出す、突き止める',
        example: "My mom can ferret out the truth faster than any detective on TV.",
        exampleJa: 'うちの母は、テレビのどの探偵より速く真実を探り出せる。',
        note: '隠れた情報・真実を執念で掘り出す。ferret(フェレット)が穴を掘るイメージ。1級語彙。',
    },
    {
        daySlot: 3, month: '2026-07', en: 'peter out', pron: 'ピーター・アウト', pos: 'phr v', ja: '次第に消える、立ち消えになる',
        example: "Our group chat's New Year resolutions petered out by January 4th.",
        exampleJa: 'グループチャットの新年の抱負は、1月4日には立ち消えになった。',
        note: '勢い・量がだんだん尽きて終わる。"interest/energy/conversation petered out"。1級頻出句動詞。',
    },

    // ============================================================
    // 2026-07-04  Conflict & Crackdown (対立・取り締まる)
    // ============================================================
    {
        daySlot: 4, month: '2026-07', en: 'lay into', pron: 'レイ・イントゥ', pos: 'phr v', ja: '激しく非難する、食ってかかる',
        example: "She laid into me for being late, conveniently forgetting she invited me yesterday for today.",
        exampleJa: '彼女は遅刻した俺を激しく責めたが、昨日「今日来て」と誘ったことは都合よく忘れていた。',
        note: '言葉で猛烈に攻撃する。"lay into someone"。"criticize harshly" の口語版。1級語彙。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'bear down on', pron: 'ベア・ダウン・オン', pos: 'phr v', ja: '(脅威が)迫る、圧力をかける',
        example: "The deadline bore down on us while we argued about the font for the title.",
        exampleJa: '締め切りが迫ってくる中、俺たちはタイトルのフォントで言い争っていた。',
        note: '危険・期限などが重くのしかかる。"a storm/deadline bearing down on ~"。1級長文頻出。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'clamp down on', pron: 'クランプ・ダウン・オン', pos: 'phr v', ja: '厳しく取り締まる',
        example: "The library clamped down on noise, so now we whisper our snack opinions.",
        exampleJa: '図書館が騒音を厳しく取り締まったので、今やお菓子の感想もひそひそ声だ。',
        note: '規則違反などを強権で抑え込む。"clamp down on crime/spending"。ニュース必須。1級頻出。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'barge into', pron: 'バージ・イントゥ', pos: 'phr v', ja: '(乱暴に)突入する、押し入る',
        example: "My cat barges into every video call like he's the keynote speaker.",
        exampleJa: 'うちの猫は、自分が基調講演者みたいにあらゆるビデオ会議に乱入してくる。',
        note: '無遠慮に押し入る/割り込む。"barge into a room/meeting"。失礼な登場に。1級語彙。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'hem in', pron: 'ヘム・イン', pos: 'phr v', ja: '取り囲む、身動きを封じる',
        example: "I was hemmed in by shopping bags and had to negotiate my way out of my own couch.",
        exampleJa: '買い物袋に囲まれて、自分のソファから脱出するのに交渉が必要だった。',
        note: '物理的/状況的に囲んで自由を奪う。"hemmed in by ~"。受け身で頻出。1級語。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'cordon off', pron: 'コードン・オフ', pos: 'phr v', ja: '(立入禁止に)封鎖する',
        example: "Mom cordoned off the freshly mopped floor like it was a crime scene.",
        exampleJa: '母は、モップがけしたての床を事件現場みたいに封鎖した。',
        note: '危険区域などをロープ等で立入禁止にする。"cordon off the area"。事件報道で頻出。1級語彙。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'egg on', pron: 'エッグ・オン', pos: 'phr v', ja: 'けしかける、あおる',
        example: "Nobody actually wanted the karaoke battle, but the crowd egged us on.",
        exampleJa: '誰も本気でカラオケ対決なんて望んでなかったのに、客がけしかけてきた。',
        note: '悪い事・無謀な事をするよう煽る。"egg someone on"。卵とは無関係(古語 edge 由来)。1級熟語。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'palm off', pron: 'パーム・オフ', pos: 'phr v', ja: 'だまして押し付ける、ごまかして渡す',
        example: "He tried to palm off his old phone as 'vintage' for triple the price.",
        exampleJa: '彼は自分の古いスマホを「ビンテージ」と称して3倍の値段で押し付けようとした。',
        note: '粗悪品/厄介事を偽って人に渡す。"palm off A on/onto B"。詐欺的なニュアンス。1級頻出。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'carry off', pron: 'キャリー・オフ', pos: 'phr v', ja: '(難しい事を)やってのける、成功させる',
        example: "She carried off the speech flawlessly, even after her notes blew into the pond.",
        exampleJa: 'メモが池に飛んでいった後でさえ、彼女はスピーチを見事にやってのけた。',
        note: '困難な事をうまく成し遂げる。"carry it off"。pull off の同義。賞を「さらう」意味も。1級語。',
    },
    {
        daySlot: 4, month: '2026-07', en: 'run against', pron: 'ラン・アゲンスト', pos: 'phr v', ja: '(選挙などで)対立候補になる、敵対する',
        example: "He ran against his own brother for class president and lost the family group chat too.",
        exampleJa: '彼は学級委員長選で実の兄に対抗して立候補し、家族グループチャットでも負けた。',
        note: '選挙・競争で人に対抗する。"run against an opponent"。政治記事頻出。1級語彙。',
    },

    // ============================================================
    // 2026-07-05  Focus & Effort (集中・努力・結論)
    // ============================================================
    {
        daySlot: 5, month: '2026-07', en: 'knuckle down', pron: 'ナックル・ダウン', pos: 'phr v', ja: '本腰を入れて取り組む',
        example: "I'll knuckle down right after I reorganize my desk, my files, and my entire life.",
        exampleJa: '机とファイルと人生まるごと整理し終えたら、すぐ本腰を入れるよ。',
        note: '真剣に集中して取りかかる。"knuckle down to work/studying"。先延ばしの反対。1級熟語。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'zero in on', pron: 'ゼロ・イン・オン', pos: 'phr v', ja: '(一点に)狙いを定める、集中する',
        example: "In a buffet of 50 dishes, my nephew zeroes in on the one bowl of plain rice.",
        exampleJa: '50品のビュッフェで、甥っ子は白米一杯だけに狙いを定める。',
        note: '標的・問題点に的を絞る。"zero in on the problem/a target"。会議でも狩りでも使う。1級語彙。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'boil down to', pron: 'ボイル・ダウン・トゥ', pos: 'phr v', ja: '要するに〜に尽きる',
        example: "Every argument with my brother boils down to who controlled the remote in 2009.",
        exampleJa: '兄との口論はすべて、2009年に誰がリモコンを握っていたかに尽きる。',
        note: '複雑な話の核心を一言で。"It all boils down to ~"。要約の決め台詞。1級頻出句動詞。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'hinge on', pron: 'ヒンジ・オン', pos: 'phr v', ja: '〜次第である、〜にかかっている',
        example: "My whole morning hinges on whether the one working elevator decides to show up.",
        exampleJa: '俺の朝はすべて、唯一動くエレベーターが現れる気になるかどうかにかかっている。',
        note: '成否が一点に左右される。"hinge on ~"。hinge=蝶番。"depend on" の格上。1級語彙。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'face up to', pron: 'フェイス・アップ・トゥ', pos: 'phr v', ja: '(現実に)正面から向き合う',
        example: "I finally faced up to the fact that the plant I've been watering is plastic.",
        exampleJa: 'ずっと水をやってた観葉植物がプラスチック製だという事実に、ついに向き合った。',
        note: '逃げずに困難・現実を受け入れる。"face up to reality/responsibility"。1級語彙。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'beef up', pron: 'ビーフ・アップ', pos: 'phr v', ja: '強化する、増強する',
        example: "They beefed up security so much that even the regulars need three forms of ID.",
        exampleJa: '警備をあまりに強化したので、常連客でさえ3種類の身分証が必要になった。',
        note: '人員・防御・内容を増やして強くする。"beef up security/the team"。ビジネス頻出。1級熟語。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'iron out', pron: 'アイアン・アウト', pos: 'phr v', ja: '(問題を)解決する、調整する',
        example: "We still need to iron out who actually booked the hotel — because no one did.",
        exampleJa: 'ホテルを実際に誰が予約したのか、まだ調整が必要だ。誰もしてなかったからだ。',
        note: '細かい問題・食い違いをならして解決。"iron out the details/differences"。アイロンのイメージ。1級頻出。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'put in for', pron: 'プット・イン・フォー', pos: 'phr v', ja: '(正式に)申請する、願い出る',
        example: "I put in for a day off and immediately three crises appeared out of nowhere.",
        exampleJa: '休暇を申請した途端、どこからともなく3つの危機が現れた。',
        note: '休暇・昇進・払い戻しなどを正式に願い出る。"put in for leave/a transfer"。職場で実用。1級語彙。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'burn out', pron: 'バーン・アウト', pos: 'phr v', ja: '燃え尽きる、消耗しきる',
        example: "I burned out planning a relaxing vacation. The spreadsheet had four tabs.",
        exampleJa: 'リラックスする休暇の計画で燃え尽きた。スプレッドシートはタブ4枚あった。',
        note: '働きすぎ等で心身が尽きる。名詞 burnout は現代の必須語。"burn out from overwork"。1級頻出。',
    },
    {
        daySlot: 5, month: '2026-07', en: 'vouch for', pron: 'ヴァウチ・フォー', pos: 'phr v', ja: '(人物・品質を)保証する、請け合う',
        example: "I can vouch for the restaurant's food, but absolutely not for its parking.",
        exampleJa: 'あの店の料理は保証できるが、駐車場については一切請け合えない。',
        note: '人柄・事実を太鼓判で保証する。"vouch for someone/something"。推薦・身元保証で実用。1級頻出。',
    },

    // ============================================================
    // 2026-07-06  Idioms I (状態・慣用)
    // ============================================================
    {
        daySlot: 6, month: '2026-07', en: 'in tatters', pron: 'イン・タターズ', pos: 'idiom', ja: 'ボロボロの、台無しの',
        example: "My weekend plans were in tatters the second my phone said 'storage full.'",
        exampleJa: 'スマホが「ストレージがいっぱい」と言った瞬間、週末の計画はボロボロになった。',
        note: '計画・評判・服が完全に崩れた状態。"plans/reputation in tatters"。tatter=ぼろ切れ。1級長文頻出。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'creep up on', pron: 'クリープ・アップ・オン', pos: 'phr v', ja: '(知らぬ間に)忍び寄る',
        example: "Monday creeps up on me every single week as if it's a brand-new idea.",
        exampleJa: '月曜は毎週、まるで斬新なアイデアみたいに俺に忍び寄ってくる。',
        note: '時間・老い・眠気などが気づかぬうちに迫る。"age/sleep creeps up on you"。1級語彙。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'breeze in', pron: 'ブリーズ・イン', pos: 'phr v', ja: '(さっそうと/平然と)入ってくる',
        example: "He breezed in two hours late like he was doing us a favor by arriving at all.",
        exampleJa: '彼は2時間遅れで平然と現れ、来ただけありがたく思えと言わんばかりだった。',
        note: '気軽に・悪びれず颯爽と登場する。"breeze in/into ~"。遅刻者の図々しさに皮肉で。1級語。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'brim over with', pron: 'ブリム・オーバー・ウィズ', pos: 'phr v', ja: '〜であふれんばかりだ',
        example: "She brims over with energy at 6 a.m., which should honestly be illegal.",
        exampleJa: '彼女は朝6時にエネルギーであふれんばかりで、正直それは違法であるべきだ。',
        note: '感情・活力が満ちあふれる。"brim over with enthusiasm/joy"。brim=縁。詩的にも使える。1級語彙。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'bunch up', pron: 'バンチ・アップ', pos: 'phr v', ja: '(一か所に)固まる、寄り集まる',
        example: "Everyone bunched up by the one fan in the room and called it 'teamwork.'",
        exampleJa: '全員が部屋で唯一の扇風機の前に固まり、それを「チームワーク」と呼んだ。',
        note: '人や物がぎゅっと密集する。"bunch up together"。バスを待つ人やしわにも。1級語。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'fan out', pron: 'ファン・アウト', pos: 'phr v', ja: '(扇状に)散開する、広がる',
        example: "The kids fanned out across the buffet with the precision of a military operation.",
        exampleJa: '子供たちは軍事作戦並みの精度で、ビュッフェ中に扇状に散開した。',
        note: '中心から扇形に分かれて広がる。"the searchers fanned out"。捜索・配置で頻出。1級語彙。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'beef about', pron: 'ビーフ・アバウト', pos: 'phr v', ja: '(しつこく)不平を言う、ぼやく',
        example: "He beefs about the weather as if complaining will personally offend the sky.",
        exampleJa: '彼は天気にぼやくが、まるで文句を言えば空が個人的に傷つくかのようだ。',
        note: '小さな事にぶつぶつ文句を言う。"beef about ~"。名詞 beef は「不満・もめ事」。口語的。1級語。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'dote on', pron: 'ドウト・オン', pos: 'phr v', ja: '(盲目的に)溺愛する、可愛がる',
        example: "My grandparents dote on the dog so much I've quietly accepted being the second favorite.",
        exampleJa: '祖父母が犬を溺愛しすぎて、俺はそっと「二番目に好かれてる存在」を受け入れた。',
        note: '甘やかすほど可愛がる。"dote on a child/grandchild"。盲目的な愛のニュアンス。1級頻出句動詞。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'rifle through', pron: 'ライフル・スルー', pos: 'phr v', ja: '(乱暴に)あさる、引っかき回して探す',
        example: "I rifled through three drawers for the charger that was in my hand the whole time.",
        exampleJa: 'ずっと手に持っていた充電器を、引き出し3つ引っかき回して探した。',
        note: '物を乱暴にかき回して探す。"rifle through a bag/drawers"。慌てた捜索に。1級語彙。',
    },
    {
        daySlot: 6, month: '2026-07', en: 'root around', pron: 'ルート・アラウンド', pos: 'phr v', ja: '(手探りで)探し回る、ほじくる',
        example: "I rooted around the fridge for ten minutes and emerged with a single sad pickle.",
        exampleJa: '冷蔵庫を10分手探りで探し回り、しなびたピクルス一切れを手に出てきた。',
        note: '中をかき回してあれこれ探す。"root around in/for ~"。豚が鼻でほじるイメージ。1級語。',
    },

    // ============================================================
    // 2026-07-07  Crime & Law (法律・犯罪)
    // ============================================================
    {
        daySlot: 7, month: '2026-07', en: 'embezzle', pron: 'エンベズル', pos: 'v', ja: '横領する、着服する',
        example: "He embezzled the office snack fund, and honestly that's the most serious crime of all.",
        exampleJa: '彼はオフィスのお菓子代を横領した。正直、それこそ最も重い罪だ。',
        note: '預かった金を着服する。"embezzle funds"。名詞 embezzlement。汚職ニュース必須。1級長文頻出。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'perjury', pron: 'パージャリー', pos: 'n', ja: '偽証(罪)',
        example: "Claiming you 'only had one slice' of that whole cake is basically perjury.",
        exampleJa: 'あのホールケーキを「一切れだけ食べた」と主張するのは、ほぼ偽証罪だ。',
        note: '宣誓した上での嘘。"commit perjury"。法廷ドラマ頻出。動詞は perjure oneself。1級語彙。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'extortion', pron: 'イクストーション', pos: 'n', ja: '恐喝、ゆすり',
        example: "Charging me for extra sauce feels less like business and more like extortion.",
        exampleJa: '追加ソースに金を取るのは、商売というよりゆすりに近い。',
        note: '脅して金品を奪う事。"extortion racket"。動詞 extort(ゆすり取る)。事件報道で頻出。1級語。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'larceny', pron: 'ラーセニー', pos: 'n', ja: '窃盗(罪)',
        example: "Taking the last fry off my plate without asking is petty larceny in my book.",
        exampleJa: '俺の皿から最後のポテトを断りなく取るのは、俺の中では軽窃盗罪だ。',
        note: '他人の財物を盗む罪。"petty larceny"(軽窃盗)。theft の法律用語版。1級長文・大問1頻出。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'acquit', pron: 'アクウィット', pos: 'v', ja: '無罪とする、放免する',
        example: "The jury acquitted me of eating the leftovers due to a complete lack of evidence.",
        exampleJa: '残り物を食べた件で、陪審は完全な証拠不十分により俺を無罪とした。',
        note: '裁判で無罪を言い渡す。"be acquitted of ~"。convict(有罪)の対義語。名詞 acquittal。1級頻出。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'incarcerate', pron: 'インカーサレイト', pos: 'v', ja: '投獄する、収監する',
        example: "I incarcerate my phone in another room to study, then visit it every six minutes.",
        exampleJa: '勉強のためスマホを別室に収監するが、6分ごとに面会に行く。',
        note: '刑務所に閉じ込める。"be incarcerated"。imprison の格上。名詞 incarceration。1級語彙。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'illicit', pron: 'イリシット', pos: 'adj', ja: '違法の、不正な',
        example: "My illicit second breakfast is technically just breakfast happening twice.",
        exampleJa: '俺の違法な二度目の朝食は、厳密には朝食が二回起きてるだけだ。',
        note: '法・規則・道徳に反する。"illicit drugs/affair/trade"。illegal より「こっそり」感。1級頻出。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'coerce', pron: 'コアース', pos: 'v', ja: '強要する、無理強いする',
        example: "I was coerced into karaoke by peer pressure and one very persuasive aunt.",
        exampleJa: '同調圧力と、めちゃくちゃ口のうまい叔母にカラオケを強要された。',
        note: '脅し・圧力で無理やりさせる。"coerce someone into ~ing"。名詞 coercion。1級長文頻出。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'abscond', pron: 'アブスコンド', pos: 'v', ja: '(金品を持って)逃亡する、持ち逃げする',
        example: "My friend absconded with the aux cord and played the same song for an hour.",
        exampleJa: '友達がAUXケーブルを持ち逃げして、1時間同じ曲をかけ続けた。',
        note: 'こっそり(しばしば金を持って)逃げる。"abscond with the funds"。やや文語で1級らしい語。',
    },
    {
        daySlot: 7, month: '2026-07', en: 'culpable', pron: 'カルパブル', pos: 'adj', ja: '責めを負うべき、有罪の',
        example: "We're all culpable for the missing cookies, but only the dog looks guilty.",
        exampleJa: '消えたクッキーは全員に責任があるが、罪悪感のある顔をしてるのは犬だけだ。',
        note: '非難・処罰に値する。"culpable for ~"。名詞 culpability。"to blame" の堅い版。1級語彙。',
    },

    // ============================================================
    // 2026-07-08  Politics & Power (政治・権力)
    // ============================================================
    {
        daySlot: 8, month: '2026-07', en: 'despot', pron: 'デスポット', pos: 'n', ja: '専制君主、暴君',
        example: "My little sister rules the TV remote like a despot with a tiny iron fist.",
        exampleJa: '妹は、小さな鉄の拳を持つ暴君みたいにテレビのリモコンを支配している。',
        note: '絶対権力を握る独裁者。形容詞 despotic。tyrant の同義。歴史・政治長文で頻出。1級語。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'autocrat', pron: 'オートクラット', pos: 'n', ja: '独裁者、専制君主',
        example: "Our group project had one autocrat, four spectators, and zero democracy.",
        exampleJa: '俺たちのグループ課題には独裁者が一人、傍観者が四人、民主主義はゼロだった。',
        note: '独断で全てを決める支配者。形容詞 autocratic、名詞 autocracy(独裁政治)。政治記事頻出。1級語彙。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'incumbent', pron: 'インカンベント', pos: 'n/adj', ja: '現職(の)、在職者',
        example: "As the incumbent napper of this couch, I have squatter's rights.",
        exampleJa: 'このソファの現職の昼寝担当として、俺には占有権がある。',
        note: '今その職にある人。"the incumbent president"。"It is incumbent on you to ~"(義務がある)も1級頻出。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'demagogue', pron: 'デマゴーグ', pos: 'n', ja: '扇動政治家、デマゴーグ',
        example: "The group chat demagogue can turn 'where to eat' into a heated three-day debate.",
        exampleJa: 'グループチャットの扇動家は、「どこで食べる」を3日に及ぶ激論に変えられる。',
        note: '大衆の感情を煽って力を得る政治家。日本語「デマ」の語源。やや軽蔑的。1級長文頻出。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'coup', pron: 'クー', pos: 'n', ja: 'クーデター、大成功',
        example: "Getting the last parking spot during a festival is a genuine logistical coup.",
        exampleJa: '祭りの最中に最後の駐車スペースを取るのは、まさに兵站学上の大成功だ。',
        note: '政権転覆(coup d\'etat)。発音は「クー」(pは無音)。「あっと言わせる大手柄」の意味も。1級語彙。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'sanction', pron: 'サンクション', pos: 'n/v', ja: '制裁、(公式に)認可する',
        example: "Mom imposed economic sanctions on my allowance after the 'mystery' phone bill.",
        exampleJa: '「謎の」電話代の後、母は俺の小遣いに経済制裁を科した。',
        note: '要注意の対義語ペア。複数形 sanctions=制裁、動詞=認可する。文脈で真逆。1級超頻出。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'partisan', pron: 'パーティザン', pos: 'adj/n', ja: '党派心の強い、熱烈な支持者',
        example: "Family game night gets so partisan that we now need a neutral referee — the cat.",
        exampleJa: '家族のゲーム大会は党派色が強すぎて、今や中立の審判が要る。猫だ。',
        note: '特定の党派・側に偏った。"partisan politics"。対義語 nonpartisan/bipartisan。政治記事必須。1級語。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'dissident', pron: 'ディシデント', pos: 'n/adj', ja: '反体制派(の)、異議を唱える人',
        example: "I'm the family dissident who insists pineapple belongs on pizza.",
        exampleJa: '俺は、パイナップルはピザに乗るべきだと主張する一家の反体制派だ。',
        note: '政府・体制に公然と反対する人。"political dissident"。形容詞 dissident voices。1級長文頻出。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'propaganda', pron: 'プロパガンダ', pos: 'n', ja: '(政治的)宣伝、プロパガンダ',
        example: "My friend's vacation photos are basically propaganda for a country I now must visit.",
        exampleJa: '友達の旅行写真は、もはや俺が絶対行くべき国へのプロパガンダだ。',
        note: '偏った情報で世論を操作する宣伝。通例ネガティブ。"state propaganda"。1級・準1頻出。',
    },
    {
        daySlot: 8, month: '2026-07', en: 'totalitarian', pron: 'トータリテリアン', pos: 'adj', ja: '全体主義の',
        example: "Our household has a totalitarian rule: shoes off, or you answer to Grandma.",
        exampleJa: 'うちには全体主義的な掟がある。靴を脱げ、さもなくばばあちゃんに釈明しろ。',
        note: '個人より国家が全てを統制する。"totalitarian regime/state"。名詞 totalitarianism。1級長文頻出。',
    },

    // ============================================================
    // 2026-07-09  Economy & Finance (経済・財政)
    // ============================================================
    {
        daySlot: 9, month: '2026-07', en: 'recession', pron: 'リセッション', pos: 'n', ja: '景気後退、不況',
        example: "My wallet has been in a personal recession since I discovered food delivery apps.",
        exampleJa: 'フードデリバリーアプリを覚えてから、俺の財布は個人的な不況に突入している。',
        note: '経済全体の縮小。"economic recession"。depression(恐慌)より軽い。経済記事・1級ライティング必須。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'austerity', pron: 'オーステリティ', pos: 'n', ja: '緊縮(財政)、耐乏',
        example: "I declared a week of austerity, then 'accidentally' bought concert tickets.",
        exampleJa: '一週間の緊縮を宣言したのに、「うっかり」ライブのチケットを買った。',
        note: '支出を厳しく切り詰める事。"austerity measures"(緊縮策)。形容詞 austere(質素な)。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'monopoly', pron: 'モノポリー', pos: 'n', ja: '独占、専売',
        example: "My cat holds a complete monopoly on the warmest spot in the entire house.",
        exampleJa: 'うちの猫は、家中で一番暖かい場所を完全に独占している。',
        note: '市場を一社が支配する状態。"have a monopoly on ~"。動詞 monopolize。経済長文頻出。1級語彙。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'subsidy', pron: 'サブシディ', pos: 'n', ja: '補助金、助成金',
        example: "My parents' 'food subsidy' is the only reason my fridge isn't a museum of condiments.",
        exampleJa: '親の「食費補助金」のおかげで、俺の冷蔵庫が調味料博物館にならずに済んでいる。',
        note: '政府などが出す援助金。"government subsidy"。動詞 subsidize(助成する)。政策長文頻出。1級語。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'inflation', pron: 'インフレーション', pos: 'n', ja: 'インフレ、物価上昇',
        example: "Thanks to inflation, my childhood snack now costs the same as a small spaceship.",
        exampleJa: 'インフレのおかげで、子供の頃のお菓子が今や小型宇宙船と同じ値段だ。',
        note: '物価が継続的に上がる事。対義語 deflation。"rising inflation"。経済の基本だが1級長文必須。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'deficit', pron: 'デフィシット', pos: 'n', ja: '赤字、不足',
        example: "I'm running a serious sleep deficit that no weekend can possibly repay.",
        exampleJa: '俺は深刻な睡眠の赤字を抱えていて、どんな週末でも返済不可能だ。',
        note: '収入より支出が多い状態。"budget/trade deficit"。対義語 surplus(黒字)。睡眠など比喩でも。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'collateral', pron: 'コラテラル', pos: 'n/adj', ja: '担保、付随的な',
        example: "I offered my dignity as collateral when I begged for the last dumpling.",
        exampleJa: '最後の餃子を懇願したとき、俺は尊厳を担保に差し出した。',
        note: '借金の担保。"put up ~ as collateral"。"collateral damage"(巻き添え被害)も頻出。1級語彙。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'default', pron: 'ディフォルト', pos: 'v/n', ja: '(債務を)不履行にする、初期設定',
        example: "My default response to 'we should hang out soon' is enthusiastic agreement and zero follow-up.",
        exampleJa: '「近いうち遊ぼう」への俺のデフォルト反応は、熱烈な同意とゼロの行動だ。',
        note: '借金の返済不履行、IT用語の「初期設定」も同語。"default on a loan"。文脈で意味が割れる。1級頻出。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'remittance', pron: 'リミタンス', pos: 'n', ja: '送金(額)',
        example: "My monthly remittance to the coffee shop should honestly qualify me for shareholder status.",
        exampleJa: 'カフェへの毎月の送金額は、正直、俺を株主資格に値させるべきだ。',
        note: '(特に海外への)送金。"send a remittance"。動詞 remit(送金する/免除する)。経済長文頻出。1級語。',
    },
    {
        daySlot: 9, month: '2026-07', en: 'fiscal', pron: 'フィスカル', pos: 'adj', ja: '財政の、会計の',
        example: "My fiscal year resets every time I see a 'limited time only' label.",
        exampleJa: '俺の会計年度は、「期間限定」の表示を見るたびにリセットされる。',
        note: '国・組織の財政に関する。"fiscal year/policy/deficit"。financial よりお堅い公式語。1級超頻出。',
    },

    // ============================================================
    // 2026-07-10  Wildlife & Nature (生き物・自然界)
    // ============================================================
    {
        daySlot: 10, month: '2026-07', en: 'nocturnal', pron: 'ノクターナル', pos: 'adj', ja: '夜行性の',
        example: "I'm fully nocturnal on weekends and deeply confused about it every Monday.",
        exampleJa: '週末は完全に夜行性になり、毎週月曜にそのことで激しく混乱する。',
        note: '夜に活動する。"nocturnal animals"。対義語 diurnal(昼行性)。自分の生活にも使える。1級頻出。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'dormant', pron: 'ドーマント', pos: 'adj', ja: '休眠中の、活動を休止した',
        example: "My motivation lies dormant all year and erupts violently every December 31st.",
        exampleJa: '俺のやる気は一年中休眠していて、毎年12月31日に激しく噴火する。',
        note: '一時的に活動を止めている。"dormant volcano/account"。火山・種子・能力に。1級長文頻出。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'symbiotic', pron: 'シンビオティック', pos: 'adj', ja: '共生の、相互依存の',
        example: "My phone and I have a symbiotic relationship: it dies, and so does my will to socialize.",
        exampleJa: 'スマホと俺は共生関係だ。バッテリーが切れると、俺の社交意欲も切れる。',
        note: '互いに利益を得る関係。"symbiotic relationship"。名詞 symbiosis。ビジネス比喩でも使う。1級語彙。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'predatory', pron: 'プレダトリー', pos: 'adj', ja: '捕食性の、食い物にする',
        example: "Seagulls at the beach have a predatory interest in my fries that borders on a heist.",
        exampleJa: 'ビーチのカモメは俺のポテトに捕食者並みの関心を示し、ほぼ強盗だ。',
        note: '獲物を捕らえる。比喩で「人を食い物にする」。"predatory lending"(略奪的融資)。名詞 predator。1級頻出。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'migratory', pron: 'マイグラトリー', pos: 'adj', ja: '渡りの、移動性の',
        example: "My family is migratory at parties — we drift together toward the snack table every time.",
        exampleJa: 'うちの家族はパーティーで渡り鳥みたいだ。毎回そろってお菓子テーブルへ移動する。',
        note: '季節移動する。"migratory birds"。動詞 migrate、名詞 migration(移住/渡り)。生物・社会長文頻出。1級語。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'hibernate', pron: 'ハイバネイト', pos: 'v', ja: '冬眠する、活動を停止する',
        example: "I plan to hibernate all winter, surviving purely on soup and questionable decisions.",
        exampleJa: 'スープと怪しい決断だけで生き延びながら、冬の間ずっと冬眠する予定だ。',
        note: '冬眠する。人が「引きこもる」意味でも使える。名詞 hibernation。PCの「休止状態」も同語。1級頻出。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'terrestrial', pron: 'テレストリアル', pos: 'adj', ja: '陸生の、地球の',
        example: "After a long flight I feel barely terrestrial, like I left half my soul at the gate.",
        exampleJa: '長いフライトの後は、ゲートに魂を半分置いてきたみたいに、辛うじて地上の存在だ。',
        note: '陸上に住む/地球の。"terrestrial animals"。対義語 aquatic(水生)、extraterrestrial(地球外の=ET)。1級語彙。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'camouflage', pron: 'カモフラージュ', pos: 'n/v', ja: '偽装、カモフラージュ(する)',
        example: "My to-do list is excellent camouflage for the fact that I'm doing absolutely nothing.",
        exampleJa: '俺のToDoリストは、実は全く何もしていないという事実の見事なカモフラージュだ。',
        note: '周囲に紛れて隠す事。動詞でも使う。"camouflage one\'s feelings"。生物・軍事長文頻出。1級語。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'herbivore', pron: 'ハービヴォア', pos: 'n', ja: '草食動物',
        example: "I claim to be a herbivore until someone fires up a barbecue nearby.",
        exampleJa: '近くで誰かがバーベキューを始めるまでは、俺は草食動物を自称している。',
        note: '草食動物。対義語 carnivore(肉食)、omnivore(雑食)。形容詞 herbivorous。生態系長文頻出。1級語彙。',
    },
    {
        daySlot: 10, month: '2026-07', en: 'parasite', pron: 'パラサイト', pos: 'n', ja: '寄生虫、寄生する人',
        example: "My houseplant is basically a parasite that gives nothing back but mild guilt.",
        exampleJa: 'うちの観葉植物は、ほぼ寄生虫だ。見返りはわずかな罪悪感だけ。',
        note: '宿主に寄生する生物/たかる人。形容詞 parasitic、対概念 host(宿主)。生物・社会批評で頻出。1級語。',
    },

    // ============================================================
    // 2026-07-11  Medicine & Illness (医療・病気)
    // ============================================================
    {
        daySlot: 11, month: '2026-07', en: 'chronic', pron: 'クロニック', pos: 'adj', ja: '慢性の、常習的な',
        example: "I have chronic 'I'll start Monday' syndrome, and Monday is a mythical creature.",
        exampleJa: '俺は慢性の「月曜から始める」症候群で、その月曜は伝説上の生き物だ。',
        note: '長く続く。対義語 acute(急性の)。"chronic pain/illness"。「常習的な」の比喩も。1級超頻出。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'contagious', pron: 'コンテイジャス', pos: 'adj', ja: '伝染性の、うつりやすい',
        example: "Yawning is so contagious that I just yawned typing the word 'yawn.'",
        exampleJa: 'あくびは伝染性が強すぎて、「あくび」という単語を打っただけで今あくびが出た。',
        note: '接触でうつる。笑い・あくび・熱意など比喩でも。"contagious laughter"。infectious と類義。1級頻出。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'malignant', pron: 'マリグナント', pos: 'adj', ja: '悪性の、悪意のある',
        example: "There's a malignant pile of laundry in my room that grows when I'm not looking.",
        exampleJa: '俺の部屋には悪性の洗濯物の山があって、見ていない隙に成長する。',
        note: '(腫瘍が)悪性の。対義語 benign(良性)。「悪意に満ちた」意味も。"malignant tumor"。医療長文頻出。1級語。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'benign', pron: 'ビナイン', pos: 'adj', ja: '良性の、無害な、優しい',
        example: "His comment seemed benign until I replayed it in bed at 2 a.m.",
        exampleJa: '彼のコメントは無害に思えたが、午前2時にベッドで再生したら違った。',
        note: '良性/害のない/温厚な。対義語 malignant。"benign tumor"、"benign smile"。発音「ビナイン」。1級頻出。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'terminal', pron: 'ターミナル', pos: 'adj/n', ja: '末期の、終点(の)',
        example: "I have a terminal case of opening the fridge every ten minutes expecting new food.",
        exampleJa: '俺は、10分ごとに冷蔵庫を開けて新しい食べ物を期待する末期症状を患っている。',
        note: '(病気が)末期の、終末の。"terminal illness"。空港の「ターミナル」も同語。重い文脈で頻出。1級語彙。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'remission', pron: 'リミッション', pos: 'n', ja: '(病気の)寛解、小康',
        example: "My gym motivation goes into remission roughly 48 hours after I buy new sneakers.",
        exampleJa: '俺のジムへのやる気は、新しいスニーカーを買って約48時間後に寛解(休眠)する。',
        note: '症状が一時的に治まる事。"go into remission"、"in remission"。癌の話で頻出。医療長文必須。1級語。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'immunity', pron: 'イミュニティ', pos: 'n', ja: '免疫、免除',
        example: "After years of family drama, I've developed total immunity to passive-aggressive sighs.",
        exampleJa: '長年の家族のいざこざで、俺は嫌味なため息に対する完全な免疫を獲得した。',
        note: '病気への抵抗力/責任の免除。"build immunity"、"diplomatic immunity"(外交特権)。形容詞 immune。1級頻出。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'fracture', pron: 'フラクチャー', pos: 'n/v', ja: '骨折、ひび、亀裂(が入る)',
        example: "Our friendship suffered a minor fracture over who paused the movie to talk.",
        exampleJa: '俺たちの友情は、誰が喋るために映画を止めたかで軽い亀裂が入った。',
        note: '骨折/ひび、関係・組織の「亀裂」も。"hairline fracture"、"a fractured relationship"。1級語彙。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'inflammation', pron: 'インフラメーション', pos: 'n', ja: '炎症',
        example: "Stepping on a tiny brick causes inflammation in both my foot and my mood.",
        exampleJa: '小さなブロックを踏むと、足と機嫌の両方に炎症が起きる。',
        note: '体の炎症。動詞 inflame、形容詞 inflamed。"reduce inflammation"。健康記事頻出。1級語。',
    },
    {
        daySlot: 11, month: '2026-07', en: 'dehydration', pron: 'ディハイドレーション', pos: 'n', ja: '脱水(症状)',
        example: "I ignored mild dehydration all day because the water bottle was four steps too far.",
        exampleJa: '水筒が4歩ばかり遠かったので、一日中軽い脱水を無視していた。',
        note: '体の水分不足。動詞 dehydrate、形容詞 dehydrated。対義語 hydrate(水分補給する)。健康長文頻出。1級語彙。',
    },

    // ============================================================
    // 2026-07-12  Unease & Worry (不安・心のざわつき)
    // ============================================================
    {
        daySlot: 12, month: '2026-07', en: 'apprehensive', pron: 'アプリヘンシブ', pos: 'adj', ja: '不安な、気がかりな',
        example: "I'm always apprehensive when a waiter says 'I'll be honest about this dish.'",
        exampleJa: 'ウェイターが「この料理、正直に言いますね」と言うと、俺はいつも不安になる。',
        note: '悪い事が起きそうで心配。"apprehensive about ~"。名詞 apprehension。漠然とした不安に。1級頻出。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'exasperated', pron: 'イグザスパレイティッド', pos: 'adj', ja: 'うんざりした、いらいらした',
        example: "She gave an exasperated sigh that could power a small wind turbine.",
        exampleJa: '彼女は、小型風力タービンを回せそうなほどのうんざりしたため息をついた。',
        note: '我慢の限界でイライラ。"exasperated by/with ~"。動詞 exasperate、名詞 exasperation。1級語彙。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'disgruntled', pron: 'ディスグラントルド', pos: 'adj', ja: '不満そうな、むくれた',
        example: "My cat gave me a disgruntled look for daring to sit in my own chair.",
        exampleJa: '自分の椅子に座る勇気を出しただけで、猫が俺に不満そうな視線を向けた。',
        note: '扱いに不満でむっとした。"disgruntled customer/employee"。クレーム記事頻出。1級頻出。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'wary', pron: 'ウェアリー', pos: 'adj', ja: '用心深い、警戒した',
        example: "I'm wary of any recipe that starts with 'it's basically impossible to mess up.'",
        exampleJa: '「まず失敗しようがない」で始まるレシピは、全部警戒している。',
        note: '危険・だましを警戒する。"wary of ~"。cautious と類義。weary(疲れた)と混同注意。1級頻出。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'bewildered', pron: 'ビウィルダード', pos: 'adj', ja: '当惑した、まごついた',
        example: "I stood bewildered in the cereal aisle facing forty nearly identical boxes.",
        exampleJa: 'ほぼ同じシリアルの箱40種を前に、俺はシリアル売り場で当惑して立ち尽くした。',
        note: '混乱して訳が分からない。動詞 bewilder、名詞 bewilderment。confused の格上。1級語彙。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'flustered', pron: 'フラスタード', pos: 'adj', ja: '動揺した、慌てふためいた',
        example: "I got so flustered introducing myself that I forgot my own name for a hot second.",
        exampleJa: '自己紹介であまりに慌てて、一瞬自分の名前を忘れた。',
        note: '焦って落ち着きを失う。動詞 fluster。"get flustered"。プレッシャー場面に。1級頻出。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'restless', pron: 'レストレス', pos: 'adj', ja: '落ち着かない、そわそわした',
        example: "I get restless after twenty minutes of relaxing, as if leisure has a deadline.",
        exampleJa: 'リラックスして20分すると落ち着かなくなる。まるで休息に締め切りがあるみたいに。',
        note: 'じっとしていられない。"a restless night"(眠れない夜)。名詞 restlessness。1級語彙。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'agitated', pron: 'アジテイティッド', pos: 'adj', ja: '動揺した、いら立った',
        example: "He gets visibly agitated when the loading bar freezes at 99 percent.",
        exampleJa: '読み込みバーが99%で止まると、彼は目に見えて動揺する。',
        note: '不安・怒りで興奮した状態。動詞 agitate(かき乱す/扇動する)、名詞 agitation。1級頻出。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'perturbed', pron: 'パターブド', pos: 'adj', ja: '困惑した、心を乱された',
        example: "I was deeply perturbed to learn my 'lucky' socks have been odd the whole time.",
        exampleJa: '俺の「勝負」靴下がずっと左右ちぐはぐだったと知って、深く心を乱された。',
        note: '不安・困惑で平静を失う。動詞 perturb。"perturbed by ~"。やや文語で1級らしい語。',
    },
    {
        daySlot: 12, month: '2026-07', en: 'fretful', pron: 'フレットフル', pos: 'adj', ja: '気をもむ、ぐずる',
        example: "I get fretful before trips, packing for three possible climates and one imaginary emergency.",
        exampleJa: '旅行前は気をもんで、3通りの気候と1つの架空の緊急事態に備えて荷造りする。',
        note: 'くよくよ気に病む/(子が)ぐずる。動詞 fret(やきもきする)。"Don\'t fret."(心配するな)も会話で実用。1級語。',
    },

    // ============================================================
    // 2026-07-13  Praise & Virtue (人を褒める語)
    // ============================================================
    {
        daySlot: 13, month: '2026-07', en: 'affable', pron: 'アファブル', pos: 'adj', ja: '愛想のいい、気さくな',
        example: "Our mailman is so affable I've considered inviting him to family dinner.",
        exampleJa: 'うちの郵便配達員はあまりに気さくで、家族の夕食に招こうかと考えたほどだ。',
        note: '話しやすく感じのいい。"an affable host"。friendly の上品版。人物描写で頻出。1級語彙。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'congenial', pron: 'コンジーニアル', pos: 'adj', ja: '気の合う、感じのいい',
        example: "We found a congenial little cafe where nobody judges you for staying four hours.",
        exampleJa: '4時間居座っても誰も白い目で見ない、感じのいい小さなカフェを見つけた。',
        note: '気心が合う/居心地のいい。人にも環境にも。"congenial atmosphere/company"。1級頻出。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'conscientious', pron: 'コンシエンシャス', pos: 'adj', ja: '良心的な、念入りな',
        example: "She's so conscientious she apologized to a chair after bumping into it.",
        exampleJa: '彼女はあまりに良心的で、椅子にぶつかった後その椅子に謝った。',
        note: '責任感が強く丁寧。"a conscientious worker"。conscience(良心)から。仕事の評価で頻出。1級語彙。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'benevolent', pron: 'ベネヴォレント', pos: 'adj', ja: '慈悲深い、善意の',
        example: "My grandma is a benevolent dictator: unlimited snacks, zero say in the thermostat.",
        exampleJa: 'うちのばあちゃんは慈悲深い独裁者だ。お菓子は無制限、エアコンの権利はゼロ。',
        note: '人に親切で寛大。"benevolent leader/smile"。名詞 benevolence。対義語 malevolent(悪意ある)。1級頻出。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'altruistic', pron: 'アルトルイスティック', pos: 'adj', ja: '利他的な、無私の',
        example: "I made an altruistic offer to finish the cake so no one else would have to suffer.",
        exampleJa: '誰も苦しまずに済むよう、俺はケーキを食べ切るという利他的な申し出をした。',
        note: '自分を犠牲に他人を思う。名詞 altruism。対義語 egoistic/selfish。倫理長文頻出。1級語彙。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'gracious', pron: 'グレイシャス', pos: 'adj', ja: '丁寧で寛大な、優雅な',
        example: "She was gracious about my burnt dinner, eating it like it was a five-star meal.",
        exampleJa: '彼女は焦げた俺の夕飯にも寛大で、五つ星の料理みたいに食べてくれた。',
        note: '礼儀正しく思いやりがある。"a gracious host"、"gracious in defeat"(負けて潔い)。1級頻出。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'personable', pron: 'パーソナブル', pos: 'adj', ja: '感じがよく好感の持てる',
        example: "He's so personable that even the self-checkout machine seems to like him.",
        exampleJa: '彼はあまりに好感が持てるので、セルフレジの機械まで彼を気に入ってるようだ。',
        note: '人当たりがよく魅力的。面接・人物評で頻出。"a personable young man"。1級語彙。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'unassuming', pron: 'アンアスーミング', pos: 'adj', ja: '出しゃばらない、控えめな',
        example: "The most unassuming guy in the room turned out to run three companies.",
        exampleJa: '部屋で一番控えめな男が、実は3社を経営していると判明した。',
        note: '偉ぶらず謙虚。"an unassuming manner"。modest と類義、好意的な語。人物描写で頻出。1級頻出。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'scrupulous', pron: 'スクルーピュラス', pos: 'adj', ja: '几帳面で誠実な、良心的な',
        example: "She's scrupulous about splitting the bill down to the last yen, including tax.",
        exampleJa: '彼女は割り勘を税込みで最後の1円まで几帳面に分ける。',
        note: '細部まで正直で丁寧。対義語 unscrupulous(悪辣な)。"scrupulous about ~"。1級長文頻出。',
    },
    {
        daySlot: 13, month: '2026-07', en: 'amiable', pron: 'エイミアブル', pos: 'adj', ja: '愛想のいい、温和な',
        example: "He stayed amiable even while assembling furniture, which proves he's not human.",
        exampleJa: '彼は家具の組み立て中でさえ温和なままで、それは彼が人間でない証拠だ。',
        note: '感じがよく親しみやすい。affable と近い。"an amiable smile"。amicable(関係が友好的)と区別。1級語彙。',
    },

    // ============================================================
    // 2026-07-14  Refined Insults (人をけなす語)
    // ============================================================
    {
        daySlot: 14, month: '2026-07', en: 'obnoxious', pron: 'オブノクシャス', pos: 'adj', ja: '不快な、鼻につく',
        example: "He has an obnoxious habit of narrating the movie you're both clearly watching.",
        exampleJa: '彼には、二人とも明らかに観てる映画を実況するという鼻につく癖がある。',
        note: 'ひどく不快でうざい。"obnoxious behavior"。annoying の強い版。人・態度に。1級頻出。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'abrasive', pron: 'アブレイシブ', pos: 'adj', ja: '(態度が)とげとげしい、無神経な',
        example: "His feedback is helpful but so abrasive it leaves a mark.",
        exampleJa: '彼のフィードバックは役立つが、とげとげしすぎて傷跡が残る。',
        note: '人当たりが荒く不快。元は「研磨剤(の)」。"an abrasive manner"。職場の人物評で頻出。1級語彙。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'pompous', pron: 'ポンパス', pos: 'adj', ja: '尊大な、もったいぶった',
        example: "He gave a pompous toast about 'the journey' before announcing we ran out of plates.",
        exampleJa: '彼は「旅路」についてもったいぶった乾杯の挨拶をした後、皿が尽きたと告げた。',
        note: '自分を偉く見せようとする。"pompous speech"。grandiose と類義。気取り屋に。1級頻出。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'condescending', pron: 'コンディセンディング', pos: 'adj', ja: '見下した、恩着せがましい',
        example: "He explained how doors work in a tone so condescending I almost forgot.",
        exampleJa: '彼はドアの仕組みをあまりに見下した口調で説明したので、俺は危うく忘れかけた。',
        note: '相手を格下扱いする。動詞 condescend。"a condescending tone"。上から目線に。1級超頻出。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'callous', pron: 'キャラス', pos: 'adj', ja: '冷淡な、無情な',
        example: "It's callous to eat the last slice in front of everyone, yet here we are.",
        exampleJa: 'みんなの前で最後の一切れを食べるのは無情だ。だがこうなっている。',
        note: '他人の苦痛に無関心。"a callous remark"。元は「皮膚が硬くなった」。冷血さに。1級語彙。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'vindictive', pron: 'ヴィンディクティブ', pos: 'adj', ja: '執念深い、復讐心の強い',
        example: "My grandma plays cards with the vindictive focus of someone settling a decade-old score.",
        exampleJa: 'うちのばあちゃんは、10年来の恨みを晴らす人の執念深い集中力でトランプをやる。',
        note: '仕返しをしたがる。"a vindictive streak"。vengeful と類義。revenge と同根。1級頻出。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'petulant', pron: 'ペチュラント', pos: 'adj', ja: '不機嫌な、駄々をこねる',
        example: "I get petulant when the Wi-Fi drops, sighing like a betrayed Victorian widow.",
        exampleJa: 'Wi-Fiが切れると俺は不機嫌になり、裏切られたビクトリア朝の未亡人みたいにため息をつく。',
        note: '子供っぽくむくれて怒る。"a petulant tone"。childish と類義。名詞 petulance。1級語彙。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'churlish', pron: 'チャーリッシュ', pos: 'adj', ja: '無愛想な、失礼な',
        example: "It would be churlish to refuse free cake, so I accepted out of pure politeness — three times.",
        exampleJa: 'タダのケーキを断るのは失礼だから、純粋な礼儀で受け取った。3回。',
        note: '無作法でぶっきらぼう。"It would be churlish to ~"(〜するのは失礼だろう)は定番表現。1級頻出。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'overbearing', pron: 'オーバーベアリング', pos: 'adj', ja: '横柄な、高圧的な',
        example: "The overbearing tour guide rushed us past the view to keep to a schedule no one liked.",
        exampleJa: '高圧的なツアーガイドは、誰も気に入らないスケジュールを守るため絶景を急いで通過させた。',
        note: '人を威圧して従わせる。"an overbearing boss/parent"。domineering と類義。1級語彙。',
    },
    {
        daySlot: 14, month: '2026-07', en: 'supercilious', pron: 'スーパシリアス', pos: 'adj', ja: '横柄な、人を見下した',
        example: "The waiter gave my order a supercilious glance, as if I'd ordered crayons.",
        exampleJa: 'ウェイターは、まるで俺がクレヨンでも注文したみたいに、横柄な一瞥を投げた。',
        note: '鼻にかけて見下す。"a supercilious smile"。眉(supercilium)を上げる仕草が語源。1級長文頻出。',
    },

    // ============================================================
    // 2026-07-15  Argument & Proof (論証・説得)
    // ============================================================
    {
        daySlot: 15, month: '2026-07', en: 'substantiate', pron: 'サブスタンシエイト', pos: 'v', ja: '(証拠で)裏付ける、立証する',
        example: "He couldn't substantiate his claim that he 'always wins,' so we checked the scoreboard.",
        exampleJa: '彼は「いつも勝つ」という主張を裏付けられなかったので、俺たちは得点板を確認した。',
        note: '証拠で正しさを示す。"substantiate a claim/allegation"。ライティング超頻出。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'corroborate', pron: 'コロボレイト', pos: 'v', ja: '(別の証拠で)裏付ける、確証する',
        example: "Three witnesses and one very smug dog corroborated that I tripped over nothing.",
        exampleJa: '3人の目撃者と1匹のしたり顔の犬が、俺が何もないところで転んだと裏付けた。',
        note: '別の証拠・証言で支持する。"corroborate a story/evidence"。法廷・論文で頻出。1級語彙。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'plausible', pron: 'プローザブル', pos: 'adj', ja: 'もっともらしい、ありそうな',
        example: "'The cat ate my charger' sounded plausible until I remembered I don't own a cat.",
        exampleJa: '「猫が充電器を食べた」はもっともらしく聞こえたが、俺は猫を飼ってないと思い出した。',
        note: '一見筋が通って信じられる。"a plausible excuse"。対義語 implausible。論証長文頻出。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'tenuous', pron: 'テニュアス', pos: 'adj', ja: '(根拠が)薄弱な、希薄な',
        example: "My grasp of the plot was tenuous since I'd been on my phone the whole movie.",
        exampleJa: '映画の間ずっとスマホを見てたので、筋への理解は希薄だった。',
        note: '弱く頼りない。"a tenuous connection/link/grip"。証拠・関係が薄い時に。1級長文頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'fallacious', pron: 'ファレイシャス', pos: 'adj', ja: '誤った、論理的に間違った',
        example: "His fallacious logic was: it's free, therefore I must take twelve.",
        exampleJa: '彼の誤った論理はこうだ。タダだ、ゆえに12個取らねばならない。',
        note: '推論・信念が誤っている。名詞 fallacy(誤った論法)。"a fallacious argument"。論理学・1級頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'rebuttal', pron: 'リバトル', pos: 'n', ja: '反論、反証',
        example: "My only rebuttal to 'you snore' was a confident denial and zero evidence.",
        exampleJa: '「いびきかいてる」への俺の唯一の反論は、自信満々の否定と、証拠ゼロだった。',
        note: '相手の主張への反論。動詞 rebut。"offer a rebuttal"。ディベート・ライティング頻出。1級語彙。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'premise', pron: 'プレミス', pos: 'n', ja: '前提、根拠',
        example: "This whole trip is built on the shaky premise that we'll 'figure out parking later.'",
        exampleJa: 'この旅行全体が、「駐車は後で何とかなる」という危うい前提の上に建っている。',
        note: '議論の出発点となる仮定。"on the premise that ~"。複数形 premises は「敷地・構内」。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'undermine', pron: 'アンダーマイン', pos: 'v', ja: '(徐々に)損なう、弱体化させる',
        example: "Nothing undermines a serious apology like a poorly timed yawn.",
        exampleJa: '間の悪いあくびほど、真剣な謝罪を台無しにするものはない。',
        note: '土台を密かに崩す。"undermine confidence/authority/an argument"。じわじわ弱める。1級超頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'coherent', pron: 'コヒーレント', pos: 'adj', ja: '首尾一貫した、筋の通った',
        example: "Before coffee, my sentences are less coherent and more interpretive jazz.",
        exampleJa: 'コーヒー前の俺の文は、首尾一貫というより即興ジャズに近い。',
        note: '論理が筋道立っている。対義語 incoherent。"a coherent argument/plan"。名詞 coherence。1級頻出。',
    },
    {
        daySlot: 15, month: '2026-07', en: 'ambiguous', pron: 'アンビギュアス', pos: 'adj', ja: '曖昧な、多義的な',
        example: "Her 'maybe' was so ambiguous it could have meant yes, no, or 'ask me in 2027.'",
        exampleJa: '彼女の「たぶん」は曖昧すぎて、イエスともノーとも「2027年に聞いて」とも取れた。',
        note: '複数に解釈できて不明確。名詞 ambiguity。"an ambiguous answer"。対義語 unambiguous。1級超頻出。',
    },

    // ============================================================
    // 2026-07-16  Perception & Inference (認知・推測)
    // ============================================================
    {
        daySlot: 16, month: '2026-07', en: 'oblivious', pron: 'オブリヴィアス', pos: 'adj', ja: '(周りに)気づかない、無頓着な',
        example: "He walked through the surprise party completely oblivious, looking for the remote.",
        exampleJa: '彼はサプライズパーティーの中をまったく気づかず通り抜け、リモコンを探していた。',
        note: '周囲の事に全く気づかない。"oblivious to/of ~"。マイペースな人に。1級頻出。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'cognizant', pron: 'コグニザント', pos: 'adj', ja: '(〜を)認識している、自覚している',
        example: "I'm fully cognizant that I have work to do; that's exactly why I'm cleaning the oven.",
        exampleJa: 'やるべき仕事があるのは完全に自覚している。だからこそ俺はオーブンを掃除している。',
        note: '事実をはっきり認識している。"cognizant of ~"。aware の格上、ややフォーマル。1級語彙。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'surmise', pron: 'サーマイズ', pos: 'v', ja: '推測する、推し量る',
        example: "From the burnt smell, I surmised that dinner had entered its final form.",
        exampleJa: '焦げた匂いから、夕飯が最終形態に入ったと推測した。',
        note: '限られた手がかりから推し量る。"surmise that ~"。guess の文語版。名詞でも使う。1級長文頻出。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'infer', pron: 'インファー', pos: 'v', ja: '推論する、(暗に)読み取る',
        example: "From her one-word replies, I inferred that 'fine' did not, in fact, mean fine.",
        exampleJa: '彼女の一言返信から、「大丈夫」は実は大丈夫じゃないと推論した。',
        note: '情報から論理的に結論を導く。名詞 inference。imply(暗示する側)と区別。読解設問で超頻出。1級必須。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'conjecture', pron: 'コンジェクチャー', pos: 'n/v', ja: '憶測、推測(する)',
        example: "Whether the leftovers are still good is pure conjecture at this point.",
        exampleJa: '残り物がまだ食えるかは、この時点では完全な憶測だ。',
        note: '確証なき推測。"pure conjecture"、"a matter of conjecture"。speculation と類義。1級長文頻出。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'presume', pron: 'プリズーム', pos: 'v', ja: '(根拠を持って)推定する、決めてかかる',
        example: "I presumed the silence meant agreement; it actually meant everyone had left.",
        exampleJa: '沈黙は同意だと推定したが、実際は全員もう帰っていた。',
        note: '確からしいと仮定する。"presume that ~"、"innocent until proven guilty"の presume。assume より根拠あり。1級頻出。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'perceptive', pron: 'パーセプティブ', pos: 'adj', ja: '洞察力のある、勘の鋭い',
        example: "My dog is weirdly perceptive — he knows it's vet day before I even grab the keys.",
        exampleJa: 'うちの犬は妙に勘が鋭い。俺が鍵を取る前から病院の日だと分かっている。',
        note: '物事の本質をよく見抜く。"a perceptive observation"。動詞 perceive、名詞 perception。1級語彙。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'intuitive', pron: 'インテュイティブ', pos: 'adj', ja: '直感的な、直観でわかる',
        example: "She has an intuitive sense for which line at the store will betray her.",
        exampleJa: '彼女は、店のどのレジが自分を裏切るかを直感的に見抜く力がある。',
        note: '理屈でなく直感でわかる。"intuitive design"(直感的な操作)。名詞 intuition(直感)。1級頻出。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'deduce', pron: 'ディデュース', pos: 'v', ja: '(論理で)推定する、結論を導く',
        example: "From the empty wrapper hidden in the trash, I deduced the culprit lacked subtlety.",
        exampleJa: 'ゴミに隠された空の包み紙から、犯人は繊細さに欠けると推定した。',
        note: '前提から論理的に結論する(演繹)。名詞 deduction。シャーロックの推理。infer と近い。1級頻出。',
    },
    {
        daySlot: 16, month: '2026-07', en: 'skeptical', pron: 'スケプティカル', pos: 'adj', ja: '懐疑的な、疑ってかかる',
        example: "I'm skeptical of any gym that's 'just five minutes away' but somehow never visited.",
        exampleJa: '「たった5分」なのに、なぜか一度も行ってないジムは全部疑ってかかる。',
        note: '簡単に信じず疑う。"skeptical about/of ~"。名詞 skepticism、人 skeptic。批判的思考で頻出。1級語彙。',
    },

    // ============================================================
    // 2026-07-17  Quantity & Degree (量・程度)
    // ============================================================
    {
        daySlot: 17, month: '2026-07', en: 'ample', pron: 'アンプル', pos: 'adj', ja: '十分な、たっぷりの',
        example: "I gave myself ample time to get ready and still left the house wearing one sock.",
        exampleJa: '準備にたっぷり時間を取ったのに、結局靴下片方で家を出た。',
        note: '必要以上に十分。"ample time/space/evidence"。enough の上品版。1級頻出。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'scarce', pron: 'スケアス', pos: 'adj', ja: '乏しい、希少な',
        example: "Patience becomes incredibly scarce the moment a website asks me to 'verify I'm human.'",
        exampleJa: 'サイトに「人間であることを確認」と言われた瞬間、忍耐は猛烈に乏しくなる。',
        note: '量が足りず手に入りにくい。"scarce resources"。名詞 scarcity(欠乏)。"make oneself scarce"(姿を消す)も。1級頻出。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'abundant', pron: 'アバンダント', pos: 'adj', ja: '豊富な、ありあまる',
        example: "Excuses are abundant; the actual gym visits, less so.",
        exampleJa: '言い訳はありあまるが、実際のジム通いはそうでもない。',
        note: 'たくさんある。"abundant resources/evidence"。名詞 abundance、動詞 abound。対義語 scarce。1級語彙。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'meager', pron: 'ミーガー', pos: 'adj', ja: '乏しい、貧弱な',
        example: "My meager cooking skills peak at 'successfully boiled water' on a good day.",
        exampleJa: '俺の乏しい料理スキルは、調子のいい日で「湯を沸かすのに成功」が頂点だ。',
        note: '量・質が不十分で貧弱。"a meager salary/portion"。やや否定的。1級長文頻出。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'copious', pron: 'コーピアス', pos: 'adj', ja: 'おびただしい、大量の',
        example: "I took copious notes in the meeting and understood exactly none of them later.",
        exampleJa: '会議で大量のメモを取ったが、後で一つも理解できなかった。',
        note: '非常に多い。"copious notes/amounts/tears"。abundant と類義のフォーマル語。1級頻出。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'negligible', pron: 'ネグリジブル', pos: 'adj', ja: 'ごくわずかな、無視できる',
        example: "The difference between my 'clean' room and 'messy' room is statistically negligible.",
        exampleJa: '俺の「きれいな」部屋と「散らかった」部屋の差は、統計的に無視できる。',
        note: '小さすぎて考慮に値しない。"a negligible amount/effect"。動詞 neglect と同根。1級語彙。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'exorbitant', pron: 'イグゾービタント', pos: 'adj', ja: '法外な、途方もない',
        example: "Airport water costs an exorbitant amount, as if it were bottled by hand from a glacier.",
        exampleJa: '空港の水は法外な値段だ。まるで氷河から手作業で詰めたみたいに。',
        note: '(値段が)常識外れに高い。"exorbitant prices/fees"。outrageous と類義。1級頻出。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'paltry', pron: 'ポールトリー', pos: 'adj', ja: 'わずかな、取るに足りない',
        example: "After all that hype, the 'huge' portion was a paltry three fries on a giant plate.",
        exampleJa: 'あれだけ煽っておいて、「特大」の盛りは巨大な皿にポテト3本という貧弱さだった。',
        note: '少なすぎて情けない。"a paltry sum"。軽蔑的。meager と類義だが侮蔑度が高い。1級長文頻出。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'profuse', pron: 'プロフュース', pos: 'adj', ja: 'おびただしい、大量の',
        example: "He offered profuse apologies for being late, then was late again the next day.",
        exampleJa: '彼は遅刻に大量の謝罪を並べ、翌日また遅刻した。',
        note: 'あふれるほど多い。"profuse apologies/sweating"。副詞 profusely(しきりに)。1級語彙。',
    },
    {
        daySlot: 17, month: '2026-07', en: 'scanty', pron: 'スキャンティ', pos: 'adj', ja: '乏しい、不十分な',
        example: "The evidence for my 'I'll wake up early' theory remains extremely scanty.",
        exampleJa: '「早起きする」という俺の理論を裏付ける証拠は、依然として極めて乏しい。',
        note: '必要量に足りない。"scanty evidence/clothing"。scant とも。meager と類義。1級頻出。',
    },

    // ============================================================
    // 2026-07-18  Change & Trends (変化・増減)
    // ============================================================
    {
        daySlot: 18, month: '2026-07', en: 'dwindle', pron: 'ドゥウィンドル', pos: 'v', ja: '次第に減る、先細る',
        example: "My weekend motivation dwindles in direct proportion to how comfortable the couch is.",
        exampleJa: '週末のやる気は、ソファの快適さに正比例して先細っていく。',
        note: 'だんだん少なくなる。"dwindling resources/numbers"。"dwindle away"。グラフ・資源で頻出。1級語彙。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'escalate', pron: 'エスカレイト', pos: 'v', ja: 'エスカレートする、激化する',
        example: "A debate over the best pizza topping escalated into a four-hour family standoff.",
        exampleJa: '最高のピザの具をめぐる議論が、4時間に及ぶ家族の対立に発展した。',
        note: '段階的に悪化・拡大する。"escalate into ~"。名詞 escalation。対立・費用の増大に。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'plummet', pron: 'プラメット', pos: 'v', ja: '急落する、真っ逆さまに落ちる',
        example: "My productivity plummets the instant my phone buzzes with literally anything.",
        exampleJa: '何であれスマホが震えた瞬間、俺の生産性は急落する。',
        note: '価格・気温・士気などが急降下。"prices plummeted"。plunge と類義。データ説明で頻出。1級語彙。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'surge', pron: 'サージ', pos: 'v/n', ja: '急増する、押し寄せる',
        example: "Demand for ice cream surges the second the weather hits 'mildly warm.'",
        exampleJa: '天気が「ほんのり暖かい」に達した瞬間、アイスの需要が急増する。',
        note: '勢いよく増える/うねり。"a surge in demand"、"prices surged"。plummet の対義。経済長文頻出。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'fluctuate', pron: 'フラクチュエイト', pos: 'v', ja: '変動する、上下する',
        example: "My confidence fluctuates wildly between 'I can do anything' and 'who let me out.'",
        exampleJa: '俺の自信は「何でもできる」と「誰が俺を外に出した」の間で激しく変動する。',
        note: '不規則に上がり下がりする。"prices/temperatures fluctuate"。名詞 fluctuation。データ記述で頻出。1級語彙。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'deteriorate', pron: 'ディティアリオレイト', pos: 'v', ja: '悪化する、劣化する',
        example: "Our group chat's plans deteriorate from 'let's travel' to 'maybe a coffee' within hours.",
        exampleJa: 'グループチャットの計画は数時間で「旅行しよう」から「コーヒーでも」へと悪化する。',
        note: '状態が次第に悪くなる。"health/conditions/relations deteriorate"。名詞 deterioration。1級超頻出。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'proliferate', pron: 'プロリファレイト', pos: 'v', ja: '急増する、はびこる',
        example: "Streaming services have proliferated to the point where I pay to scroll, not watch.",
        exampleJa: '配信サービスが急増しすぎて、俺は観るためでなくスクロールするために金を払っている。',
        note: '急速に増殖・拡散する。"weapons/apps proliferate"。名詞 proliferation。科学・社会長文頻出。1級語彙。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'taper', pron: 'テイパー', pos: 'v', ja: '次第に細る、先細りになる',
        example: "His enthusiasm tapered off the moment the project required actual effort.",
        exampleJa: 'プロジェクトに実際の労力が必要になった瞬間、彼の熱意は先細っていった。',
        note: '徐々に減少・縮小する。"taper off"(次第に減る)が頻出。訓練量を「漸減する」意味も。1級語。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'accelerate', pron: 'アクセラレイト', pos: 'v', ja: '加速する、早める',
        example: "Nothing accelerates my cleaning like a friend texting 'I'm five minutes away.'",
        exampleJa: '友達の「あと5分で着く」というメッセージほど、俺の掃除を加速させるものはない。',
        note: '速度・進行を速める。"accelerate growth/the process"。対義語 decelerate。名詞 acceleration。1級頻出。',
    },
    {
        daySlot: 18, month: '2026-07', en: 'oscillate', pron: 'オシレイト', pos: 'v', ja: '(気持ちなどが)揺れ動く、振動する',
        example: "I oscillate between 'I should save money' and 'but it's on sale' several times a day.",
        exampleJa: '俺は一日に何度も「節約すべき」と「でもセールだし」の間で揺れ動く。',
        note: '二つの状態の間を行き来する。"oscillate between A and B"。気持ち・意見にも物理にも。1級語彙。',
    },

    // ============================================================
    // 2026-07-19  Time & Sequence (時間・順序 続)
    // ============================================================
    {
        daySlot: 19, month: '2026-07', en: 'impromptu', pron: 'インプロンプチュ', pos: 'adj/adv', ja: '即興の、その場の',
        example: "What started as 'one quick song' turned into an impromptu two-hour living room concert.",
        exampleJa: '「一曲だけ」が、即興の2時間リビングコンサートになった。',
        note: '準備なしのその場限り。"an impromptu speech/party"。spontaneous と類義。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'premature', pron: 'プリマチュア', pos: 'adj', ja: '時期尚早の、早すぎる',
        example: "Celebrating before the food arrives is premature; the kitchen can still betray you.",
        exampleJa: '料理が来る前に喜ぶのは時期尚早だ。厨房はまだ君を裏切れる。',
        note: '本来より早すぎる。"premature celebration/conclusion"。早産の medical 用法も。副詞 prematurely。1級語彙。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'simultaneous', pron: 'サイマルテイニアス', pos: 'adj', ja: '同時の、同時に起こる',
        example: "My talent is the simultaneous loss of my keys, phone, and will to leave the house.",
        exampleJa: '俺の特技は、鍵とスマホと外出する意志を同時に失うことだ。',
        note: '複数が同時に起こる。"simultaneous translation"(同時通訳)。副詞 simultaneously。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'subsequent', pron: 'サブシクエント', pos: 'adj', ja: 'その後の、続いて起こる',
        example: "The first pancake was a disaster; all subsequent pancakes pretended not to know it.",
        exampleJa: '一枚目のパンケーキは大惨事で、その後のパンケーキは全員それを知らないふりをした。',
        note: '〜の後に続く。"subsequent events/years"。対義語 previous。副詞 subsequently(その後)。1級超頻出。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'prolonged', pron: 'プロロングド', pos: 'adj', ja: '長引く、長期にわたる',
        example: "After a prolonged staring contest, the cat won and I gave up my warm seat.",
        exampleJa: '長引くにらめっこの末、猫が勝ち、俺は暖かい席を明け渡した。',
        note: '通常より長く続く。"prolonged exposure/drought"。動詞 prolong(長引かせる)。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'momentary', pron: 'モーメンタリー', pos: 'adj', ja: 'つかの間の、瞬間的な',
        example: "I had a momentary feeling of being organized, and then I opened my closet.",
        exampleJa: '一瞬、自分が整理整頓できてる気がしたが、クローゼットを開けた。',
        note: 'ごく短時間の。"a momentary lapse"(一瞬の気の緩み)。副詞 momentarily。1級語彙。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'overdue', pron: 'オーバーデュー', pos: 'adj', ja: '期限の過ぎた、遅れている',
        example: "This haircut is so overdue that strangers have started offering me hair ties.",
        exampleJa: 'この散髪はあまりに遅れていて、見知らぬ人がヘアゴムをくれ始めた。',
        note: '期日を過ぎている。"an overdue book/payment"、"long overdue"(待ちわびた)。図書館・請求で実用。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'recurrent', pron: 'リカレント', pos: 'adj', ja: '繰り返し起こる、再発する',
        example: "I have a recurrent dream where I ace an exam I definitely did not study for.",
        exampleJa: '俺には、絶対勉強してない試験で満点を取る夢が繰り返し出てくる。',
        note: '何度も繰り返す。"a recurrent theme/problem"。動詞 recur、名詞 recurrence。recurring とも。1級語彙。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'chronological', pron: 'クロノロジカル', pos: 'adj', ja: '年代順の、時系列の',
        example: "I told the story in chronological order, which somehow made it three times longer.",
        exampleJa: '話を時系列順に語ったら、なぜか3倍長くなった。',
        note: '時間の順に並んだ。"in chronological order"。名詞 chronology(年表)。chrono=時間。1級頻出。',
    },
    {
        daySlot: 19, month: '2026-07', en: 'concurrent', pron: 'コンカレント', pos: 'adj', ja: '同時に起こる、並行する',
        example: "I'm running three concurrent group chats and losing all of them simultaneously.",
        exampleJa: '俺は3つのグループチャットを並行して進め、同時に全部を見失っている。',
        note: '同時並行で起こる。"concurrent tasks/sessions"。simultaneous と類義。副詞 concurrently。1級語彙。',
    },

    // ============================================================
    // 2026-07-20  Speech & Tone (物言い・口調)
    // ============================================================
    {
        daySlot: 20, month: '2026-07', en: 'articulate', pron: 'アーティキュレット', pos: 'adj/v', ja: '明瞭に話す、はっきり表現する',
        example: "I'm extremely articulate in the shower and completely useless in actual meetings.",
        exampleJa: '俺はシャワー中は超能弁で、実際の会議では完全に役立たずだ。',
        note: '考えを言葉で明確に表せる。形容詞「アーティキュレット」/動詞「アーティキュレイト」で発音が変わる。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'eloquent', pron: 'エロクエント', pos: 'adj', ja: '雄弁な、説得力のある',
        example: "He gave an eloquent argument for why we absolutely needed a third pizza.",
        exampleJa: '彼は、3枚目のピザがなぜ絶対に必要かについて雄弁な論を展開した。',
        note: '感動的で説得力ある話し方。名詞 eloquence。"an eloquent speech"。スピーチ評で頻出。1級語彙。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'succinct', pron: 'サクシンクト', pos: 'adj', ja: '簡潔な、要を得た',
        example: "My boss asked for a succinct summary, so I sent six paragraphs and an apology.",
        exampleJa: '上司に簡潔な要約を求められたので、6段落と謝罪を送った。',
        note: '無駄なく短くまとまった。"a succinct answer"。concise と類義。報告・要約の評価で頻出。1級語。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'verbose', pron: 'ヴァーボース', pos: 'adj', ja: '冗長な、くどい',
        example: "His texts are so verbose that 'ok' arrives as four scrolling paragraphs.",
        exampleJa: '彼のメッセージは冗長すぎて、「了解」が4段落のスクロールで届く。',
        note: '言葉数が多すぎてくどい。"a verbose explanation"。succinct の対義。名詞 verbosity。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'blunt', pron: 'ブラント', pos: 'adj', ja: 'ぶっきらぼうな、率直すぎる',
        example: "My grandma's blunt review of my haircut could be used in courtrooms as evidence.",
        exampleJa: 'うちのばあちゃんの俺の散髪へのぶっきらぼうな評価は、法廷で証拠に使えるレベルだ。',
        note: '遠慮なく単刀直入。"To be blunt, ~"(率直に言うと)。刃物が「鈍い」意味も。1級語彙。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'tactful', pron: 'タクトフル', pos: 'adj', ja: '気配りのある、如才ない',
        example: "She was tactful enough to call my burnt cookies 'rustic' instead of 'charcoal.'",
        exampleJa: '彼女は気配り上手で、俺の焦げたクッキーを「炭」でなく「素朴」と呼んでくれた。',
        note: '相手を傷つけない言い回しができる。名詞 tact(機転)。対義語 tactless。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'glib', pron: 'グリブ', pos: 'adj', ja: '口先だけの、調子のいい',
        example: "His glib 'trust me, I've done this before' is always the start of a disaster.",
        exampleJa: '彼の調子のいい「任せて、前にもやった」は、いつも大惨事の幕開けだ。',
        note: '滑らかだが誠実さに欠ける話し方。"a glib salesman"。ネガティブな含み。1級長文頻出。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'terse', pron: 'タース', pos: 'adj', ja: 'そっけない、簡潔な',
        example: "Her terse 'fine.' carried more emotional damage than a full paragraph could.",
        exampleJa: '彼女のそっけない「いいよ。」は、一段落分よりも多くの精神的ダメージを運んできた。',
        note: '短く愛想がない。"a terse reply"。簡潔さと冷淡さの両ニュアンス。blunt と近い。1級語彙。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'brusque', pron: 'ブラスク', pos: 'adj', ja: '無愛想な、つっけんどんな',
        example: "The brusque barista took my order like I'd personally ruined her morning.",
        exampleJa: '無愛想なバリスタは、まるで俺が彼女の朝を台無しにしたみたいに注文を取った。',
        note: '早口でぶっきらぼう、感じが悪い。"a brusque manner"。発音「ブラスク」。abrupt と類義。1級頻出。',
    },
    {
        daySlot: 20, month: '2026-07', en: 'outspoken', pron: 'アウトスポークン', pos: 'adj', ja: '歯に衣着せぬ、率直な',
        example: "My aunt is so outspoken that family dinners come with a built-in commentary track.",
        exampleJa: 'うちの叔母は歯に衣着せなさすぎて、家族の夕食には実況解説が標準装備されている。',
        note: '意見をはっきり臆せず言う。"an outspoken critic"。frank と類義、勇気のニュアンス。1級語彙。',
    },

    // ============================================================
    // 2026-07-21  Abstract & Ideas (抽象・思考)
    // ============================================================
    {
        daySlot: 21, month: '2026-07', en: 'abstract', pron: 'アブストラクト', pos: 'adj/n', ja: '抽象的な、概要',
        example: "'I'll deal with it later' is an abstract concept that never quite becomes concrete.",
        exampleJa: '「後で何とかする」は、決して具体化しない抽象的な概念だ。',
        note: '具体でなく観念的。対義語 concrete。論文の「要旨(abstract)」も同語。1級・アカデミック頻出。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'hypothetical', pron: 'ハイポセティカル', pos: 'adj', ja: '仮定の、仮説の',
        example: "\"Hypothetically, if I ate your leftovers...\" \"That's not hypothetical, that's a confession.\"",
        exampleJa: '「仮にだけど、もし俺が君の残り物を食べたら…」「それ仮定じゃなくて自白だよ」',
        note: '事実でなく仮の。"a hypothetical situation"、"Hypothetically, ~"。名詞 hypothesis(仮説)。1級頻出。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'empirical', pron: 'エンピリカル', pos: 'adj', ja: '経験に基づく、実証的な',
        example: "I have empirical evidence that toast lands butter-side down — I've tested it tragically often.",
        exampleJa: 'トーストはバター面を下に落ちるという実証的証拠が俺にはある。悲劇的なほど何度も検証した。',
        note: '観察・実験に基づく。"empirical evidence/data"。理論(theoretical)の対。科学長文頻出。1級語彙。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'paradox', pron: 'パラドックス', pos: 'n', ja: '逆説、矛盾',
        example: "The paradox of my life: too tired to do anything, too restless to actually rest.",
        exampleJa: '俺の人生の逆説。何かするには疲れすぎ、本当に休むにはそわそわしすぎ。',
        note: '矛盾するようで真理を突く表現。形容詞 paradoxical。"It\'s a paradox that ~"。1級長文頻出。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'dichotomy', pron: 'ダイコトミー', pos: 'n', ja: '二分、対立する二項',
        example: "There's a clear dichotomy in my fridge: things I'll definitely eat, and science experiments.",
        exampleJa: '俺の冷蔵庫には明確な二分がある。絶対食べる物と、科学実験だ。',
        note: '正反対の二つへの分割。"a false dichotomy"(誤った二分法)。"the dichotomy between A and B"。1級語彙。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'nuance', pron: 'ニュアンス', pos: 'n', ja: '微妙な差異、ニュアンス',
        example: "The nuance between 'I'm coming' and 'I'm leaving now' has ended several friendships.",
        exampleJa: '「向かってる」と「今出る」の微妙な差が、いくつもの友情を終わらせてきた。',
        note: '言葉・意味の微妙な違い。形容詞 nuanced(機微に富む)。"subtle nuance"。翻訳・批評で頻出。1級頻出。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'paradigm', pron: 'パラダイム', pos: 'n', ja: '枠組み、模範、典型',
        example: "Discovering naps could be 'strategic' caused a complete paradigm shift in my weekends.",
        exampleJa: '昼寝が「戦略的」になりうると気づき、俺の週末は完全なパラダイムシフトを起こした。',
        note: '物の見方の枠組み。"a paradigm shift"(根本的転換)が頻出。発音「パラダイム」。学術長文必須。1級語彙。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'rationale', pron: 'ラショナール', pos: 'n', ja: '論理的根拠、理由づけ',
        example: "My rationale for buying the gadget was 'it was on sale,' which explains everything I own.",
        exampleJa: 'そのガジェットを買った根拠は「セールだったから」で、それは俺の全所持品を説明している。',
        note: '行動・決定の背後にある論拠。"the rationale behind/for ~"。reason より体系的。1級長文頻出。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'construe', pron: 'コンストルー', pos: 'v', ja: '(〜と)解釈する、受け取る',
        example: "Silence after my joke can be construed as either deep thought or deep regret.",
        exampleJa: '俺のジョークの後の沈黙は、深い思索とも深い後悔とも解釈できる。',
        note: '言動をある意味に解釈する。"construe ~ as ..."、"be wrongly construed"。interpret の格上。1級語彙。',
    },
    {
        daySlot: 21, month: '2026-07', en: 'connotation', pron: 'コノテーション', pos: 'n', ja: '言外の意味、含み',
        example: "The word 'fine' carries a connotation that ranges from 'okay' to 'we need to talk.'",
        exampleJa: '「fine」という語は、「大丈夫」から「話がある」まで及ぶ含みを持っている。',
        note: '辞書的意味の外にある含意。対は denotation(明示的意味)。"negative/positive connotation"。1級頻出。',
    },

    // ============================================================
    // 2026-07-22  The Environment (環境問題)
    // ============================================================
    {
        daySlot: 22, month: '2026-07', en: 'sustainable', pron: 'サステイナブル', pos: 'adj', ja: '持続可能な',
        example: "My sleep schedule is many things, but 'sustainable' is absolutely not one of them.",
        exampleJa: '俺の睡眠スケジュールは色々だが、「持続可能」だけは絶対に違う。',
        note: '環境・資源を損なわず続けられる。"sustainable development/energy"。名詞 sustainability。1級ライティング鉄板。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'emission', pron: 'イミッション', pos: 'n', ja: '排出(物)、放出',
        example: "The emission of dramatic sighs in this house has reached an all-time high.",
        exampleJa: 'この家における大げさなため息の排出量は、過去最高に達した。',
        note: '(ガスなどの)排出。"carbon/greenhouse gas emissions"。動詞 emit。環境長文・作文で超頻出。1級必須。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'conservation', pron: 'コンサベーション', pos: 'n', ja: '保護、保全、節約',
        example: "I practice energy conservation by refusing to get up and turn off the light.",
        exampleJa: '俺は、立ち上がって電気を消すのを拒むことでエネルギー節約を実践している。',
        note: '自然・資源の保護/節約。"wildlife/energy conservation"。動詞 conserve。環境長文必須。1級頻出。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'depletion', pron: 'ディプリーション', pos: 'n', ja: '枯渇、消耗',
        example: "Snack depletion in this household happens faster than any official report can track.",
        exampleJa: 'この家のお菓子の枯渇は、どんな公式報告も追えない速さで起こる。',
        note: '資源などが使い尽くされる事。"resource/ozone depletion"。動詞 deplete。環境長文頻出。1級語彙。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'renewable', pron: 'リニューアブル', pos: 'adj', ja: '再生可能な',
        example: "My motivation is sadly not renewable; once it's gone, it's gone until next Monday.",
        exampleJa: '俺のやる気は残念ながら再生可能ではない。一度尽きたら次の月曜まで戻らない。',
        note: '使っても再生する。"renewable energy"(太陽光・風力など)。対義語 nonrenewable。1級作文超頻出。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'biodiversity', pron: 'バイオダイバーシティ', pos: 'n', ja: '生物多様性',
        example: "The biodiversity inside my forgotten lunchbox is genuinely concerning to science.",
        exampleJa: '俺が忘れた弁当箱の中の生物多様性は、科学的に本気で憂慮すべきレベルだ。',
        note: '生物種の多様さ。"loss of biodiversity"。bio(生命)+diversity。環境・生態長文頻出。1級語彙。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'contamination', pron: 'コンタミネーション', pos: 'n', ja: '汚染、混入',
        example: "Cross-contamination between my sweet and savory snacks is a tragedy I refuse to discuss.",
        exampleJa: '甘いお菓子としょっぱいお菓子の交差汚染は、語るのも拒む悲劇だ。',
        note: '有害物の混入・汚染。動詞 contaminate。"water/food contamination"。科学・環境長文頻出。1級語彙。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'ecosystem', pron: 'エコシステム', pos: 'n', ja: '生態系',
        example: "My desk has its own fragile ecosystem of cables, mugs, and one suspicious crumb.",
        exampleJa: '俺の机には、ケーブルとマグカップと怪しいパンくず一個から成る、繊細な生態系がある。',
        note: '生物と環境が作る系。"a fragile ecosystem"、ビジネスの「エコシステム」も。環境長文必須。1級頻出。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'deforestation', pron: 'ディフォレステーション', pos: 'n', ja: '森林伐採',
        example: "The deforestation of my snack cupboard happens every Sunday around midnight.",
        exampleJa: '俺のお菓子棚の森林伐採は、毎週日曜の深夜頃に起きる。',
        note: '森林の破壊。"deforestation of the rainforest"。動詞 deforest。1級ライティング鉄板テーマ。',
    },
    {
        daySlot: 22, month: '2026-07', en: 'pollutant', pron: 'ポリュータント', pos: 'n', ja: '汚染物質',
        example: "The biggest pollutant in our group chat is the friend who only sends one-word replies.",
        exampleJa: 'うちのグループチャットの最大の汚染物質は、一言返信しかしない友達だ。',
        note: '環境を汚す物質。"air/water pollutants"。動詞 pollute、名詞 pollution。環境長文頻出。1級語彙。',
    },

    // ============================================================
    // 2026-07-23  City & Buildings (街・建物)
    // ============================================================
    {
        daySlot: 23, month: '2026-07', en: 'dilapidated', pron: 'ディラピデイティッド', pos: 'adj', ja: '老朽化した、荒れ果てた',
        example: "We stayed in a 'charming' cottage that was just a dilapidated shed with good lighting.",
        exampleJa: '俺たちは「趣のある」コテージに泊まったが、実は照明だけ立派な老朽化した小屋だった。',
        note: '建物が古びて崩れかけた。"a dilapidated building"。run-down の格上。旅行・都市長文頻出。1級語彙。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'congested', pron: 'コンジェスティッド', pos: 'adj', ja: '混雑した、渋滞した',
        example: "The road was so congested that a snail overtook us and didn't even look back.",
        exampleJa: '道があまりに渋滞してて、カタツムリに追い抜かれた。振り返りもせずに。',
        note: '交通・場所が詰まった、鼻づまりも。"congested roads"。名詞 congestion(渋滞)。都市問題長文頻出。1級頻出。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'derelict', pron: 'デレリクト', pos: 'adj', ja: '放置された、廃墟の',
        example: "There's a derelict vending machine on my street that's been 'out of order' since the Ice Age.",
        exampleJa: 'うちの通りには、氷河期からずっと「故障中」の放置された自販機がある。',
        note: '見捨てられ荒廃した。"a derelict factory/building"。abandoned と類義。都市描写で頻出。1級語彙。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'renovate', pron: 'レノベイト', pos: 'v', ja: '改装する、修復する',
        example: "We renovated the kitchen, which mostly meant arguing about tile colors for two months.",
        exampleJa: 'キッチンを改装したが、それは大体タイルの色で2ヶ月言い争うことを意味した。',
        note: '古い建物を新しく直す。名詞 renovation。"renovate an old house"。不動産・旅行で頻出。1級頻出。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'demolish', pron: 'デモリッシュ', pos: 'v', ja: '取り壊す、粉砕する',
        example: "I demolished an entire pizza and then claimed I was 'just having a slice.'",
        exampleJa: '俺はピザ一枚を丸ごと粉砕しておいて、「一切れだけ食べた」と主張した。',
        note: '建物を破壊する/(食べ物を)平らげる口語も。名詞 demolition。"demolish a building"。1級語彙。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'infrastructure', pron: 'インフラストラクチャー', pos: 'n', ja: 'インフラ、社会基盤',
        example: "Our trip's entire infrastructure collapsed when one person's phone died mid-navigation.",
        exampleJa: '一人のスマホがナビ中に切れた瞬間、旅行のインフラ全体が崩壊した。',
        note: '道路・電力など社会の基盤。"aging infrastructure"。日本語「インフラ」の元。社会・経済長文必須。1級頻出。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'sprawling', pron: 'スプロウリング', pos: 'adj', ja: '広がった、無秩序に拡大した',
        example: "The sprawling outlet mall is so big I once parked and never found my car again.",
        exampleJa: '広大なアウトレットモールは大きすぎて、一度駐車したら二度と自分の車を見つけられなかった。',
        note: '無計画に広がった。"urban sprawl"(都市の無秩序な拡大)が頻出。動詞 sprawl(大の字に寝そべる)。1級語彙。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'vacant', pron: 'ヴェイカント', pos: 'adj', ja: '空いている、空席の、うつろな',
        example: "He had a vacant stare during the lecture, fully present in body but on vacation in spirit.",
        exampleJa: '彼は講義中うつろな目をしていた。体は完全に出席、精神は休暇中だった。',
        note: '空の/うわの空の。"a vacant seat/lot"、"a vacant expression"。名詞 vacancy(空室)。1級頻出。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'refurbish', pron: 'リファービッシュ', pos: 'v', ja: '改装する、再生する',
        example: "I 'refurbished' my old phone, meaning I wiped the screen and called it new.",
        exampleJa: '俺は古いスマホを「再生」した。つまり画面を拭いて新品と呼んだ。',
        note: '古い物をきれいに整え直す。"a refurbished laptop"(再生品)。renovate と類義。1級語彙。',
    },
    {
        daySlot: 23, month: '2026-07', en: 'residential', pron: 'レジデンシャル', pos: 'adj', ja: '住宅の、居住用の',
        example: "Our quiet residential street transforms into a stadium whenever the neighbor's team wins.",
        exampleJa: '隣人のチームが勝つたびに、うちの静かな住宅街はスタジアムに変貌する。',
        note: '人が住む地域の。"a residential area/district"。対は commercial(商業の)。名詞 resident(住民)。1級頻出。',
    },

    // ============================================================
    // 2026-07-24  Temperament (性格 続)
    // ============================================================
    {
        daySlot: 24, month: '2026-07', en: 'eccentric', pron: 'エクセントリック', pos: 'adj', ja: '風変わりな、奇抜な',
        example: "My eccentric uncle waters his plants on a strict schedule but forgets our names.",
        exampleJa: '風変わりな叔父は、植物には厳密なスケジュールで水をやるのに、俺たちの名前は忘れる。',
        note: '常識から外れて変わっている。好意的にも使う。"an eccentric genius"。名詞 eccentricity。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'flamboyant', pron: 'フランボヤント', pos: 'adj', ja: '派手な、華やかな',
        example: "His flamboyant entrance included a cape, sunglasses, and absolutely no reason.",
        exampleJa: '彼の派手な登場には、マントとサングラス、そして何の理由もなかった。',
        note: '人目を引く華やかさ・大げさな振る舞い。"a flamboyant style"。服装・性格に。1級語彙。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'impulsive', pron: 'インパルシブ', pos: 'adj', ja: '衝動的な、向こう見ずな',
        example: "My impulsive haircut decision lasted thirty minutes; the regret lasted three months.",
        exampleJa: '俺の衝動的な散髪の決断は30分続いた。後悔は3ヶ月続いた。',
        note: '深く考えず勢いで行動する。"an impulsive purchase"(衝動買い)。名詞 impulse(衝動)。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'headstrong', pron: 'ヘッドストロング', pos: 'adj', ja: '頑固な、強情な',
        example: "He's too headstrong to use a map, so we've now seen every wrong turn in the city.",
        exampleJa: '彼は強情すぎて地図を使わないので、俺たちは街中のあらゆる曲がり間違いを見てきた。',
        note: '人の言うことを聞かず我を通す。"a headstrong child"。stubborn と類義。1級語彙。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'spontaneous', pron: 'スポンテイニアス', pos: 'adj', ja: '自発的な、行き当たりばったりの',
        example: "We took a spontaneous road trip and immediately spent an hour deciding where to go.",
        exampleJa: '俺たちは行き当たりばったりのドライブに出て、即座に行き先決めで1時間費やした。',
        note: '計画なしに自然と起こる。"a spontaneous decision"。名詞 spontaneity。impulsive より好意的。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'temperamental', pron: 'テンペラメンタル', pos: 'adj', ja: '気まぐれな、むらっ気のある',
        example: "Our old printer is so temperamental it only works when complimented out loud.",
        exampleJa: 'うちの古いプリンターは気まぐれすぎて、声に出して褒めた時だけ動く。',
        note: '気分屋で当てにならない(人・機械)。"a temperamental engine"。名詞 temperament(気質)。1級語彙。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'easygoing', pron: 'イージーゴーイング', pos: 'adj', ja: 'おおらかな、のんきな',
        example: "He's so easygoing he'd shrug off a meteor as 'a bit of bad luck.'",
        exampleJa: '彼はおおらかすぎて、隕石でさえ「ちょっと運が悪いね」で受け流すだろう。',
        note: '細かい事を気にせず穏やか。"an easygoing personality"。laid-back と類義。好意的。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'level-headed', pron: 'レベルヘッディッド', pos: 'adj', ja: '冷静な、分別のある',
        example: "In a crisis, she stays level-headed while I'm busy panicking about the wrong thing.",
        exampleJa: '危機の時、彼女は冷静なままで、俺は見当違いのことでパニックに忙しい。',
        note: '取り乱さず判断できる。"a level-headed response"。calm and sensible のニュアンス。人物評で頻出。1級語彙。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'reserved', pron: 'リザーブド', pos: 'adj', ja: '控えめな、内気な',
        example: "He's reserved until karaoke starts, then becomes a completely different, louder person.",
        exampleJa: '彼はカラオケが始まるまでは控えめだが、その後は全く別の、声のでかい人間になる。',
        note: '感情をあまり表に出さない。"a reserved manner"。shy より上品。"reserved seat"(予約席)とは別義。1級頻出。',
    },
    {
        daySlot: 24, month: '2026-07', en: 'hot-tempered', pron: 'ホットテンパード', pos: 'adj', ja: '短気な、怒りっぽい',
        example: "My hot-tempered uncle once argued with a self-checkout machine and lost.",
        exampleJa: '短気な叔父は、一度セルフレジと口論して負けた。',
        note: 'すぐカッとなる。"a hot-tempered boss"。対義語 even-tempered(温厚な)。quick-tempered とも。1級語彙。',
    },

    // ============================================================
    // 2026-07-25  Triumph & Downfall (成功と転落)
    // ============================================================
    {
        daySlot: 25, month: '2026-07', en: 'setback', pron: 'セットバック', pos: 'n', ja: '挫折、後退',
        example: "Running out of coffee at 7 a.m. is less of a setback and more of a national emergency.",
        exampleJa: '朝7時にコーヒーが切れるのは、挫折というより国家的緊急事態だ。',
        note: '進行を妨げる障害・後退。"a major setback"、"suffer a setback"。obstacle と類義。1級頻出。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'triumph', pron: 'トライアンフ', pos: 'n/v', ja: '勝利、大成功',
        example: "Assembling the furniture without leftover screws felt like the greatest triumph of my decade.",
        exampleJa: '余ったネジなしで家具を組み立てられたのは、この10年で最大の勝利に感じた。',
        note: '大きな成功・勝利。形容詞 triumphant(勝ち誇った)。"a great triumph"、"triumph over ~"。1級語彙。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'fiasco', pron: 'フィアスコ', pos: 'n', ja: '大失敗、大失態',
        example: "The surprise party turned into a fiasco when we surprised the wrong neighbor.",
        exampleJa: 'サプライズパーティーは、間違った隣人を驚かせた時点で大失態と化した。',
        note: '惨めで滑稽な失敗。"a complete fiasco"。debacle(6月既出)と近い。1級長文頻出。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'breakthrough', pron: 'ブレイクスルー', pos: 'n', ja: '大躍進、突破口',
        example: "My biggest breakthrough this year was realizing the printer was just unplugged.",
        exampleJa: '今年の俺の最大の躍進は、プリンターが単に電源抜けてただけと気づいたことだ。',
        note: '行き詰まりを破る進展。"a major/scientific breakthrough"、"make a breakthrough"。科学・交渉長文頻出。1級頻出。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'milestone', pron: 'マイルストーン', pos: 'n', ja: '画期的な出来事、節目',
        example: "Finally folding the laundry the same day I washed it was a personal milestone.",
        exampleJa: '洗濯した当日にちゃんとたたんだのは、個人的な節目だった。',
        note: '重要な段階・記念碑的事件。"reach a milestone"。元は里程標。人生・プロジェクトで頻出。1級語彙。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'downfall', pron: 'ダウンフォール', pos: 'n', ja: '没落、破滅(の原因)',
        example: "My downfall is always the 'just one more episode' button at one in the morning.",
        exampleJa: '俺の破滅の原因は、いつも午前1時の「あと一話だけ」ボタンだ。',
        note: '失墜・転落、またその原因。"his downfall"、"be one\'s downfall"。栄枯盛衰の長文で頻出。1級頻出。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'prosper', pron: 'プロスパー', pos: 'v', ja: '繁栄する、成功する',
        example: "Houseplants prosper in my friend's care and stage a dramatic collapse in mine.",
        exampleJa: '観葉植物は友達の手では繁栄し、俺の手では劇的に崩れ落ちる。',
        note: '経済的・全般的に栄える。形容詞 prosperous、名詞 prosperity(繁栄)。"prosper as ~"。1級語彙。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'flourish', pron: 'フラリッシュ', pos: 'v', ja: '繁栄する、生き生きと育つ',
        example: "My excuses flourish under pressure while my actual plans quietly wither.",
        exampleJa: 'プレッシャー下で俺の言い訳は生き生きと育ち、実際の計画は静かに枯れる。',
        note: '勢いよく栄える/(植物が)よく育つ。"businesses/arts flourish"。thrive と類義。1級頻出。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'thwart', pron: 'スウォート', pos: 'v', ja: '阻止する、くじく',
        example: "My diet plans were thwarted by a single, strategically placed box of donuts.",
        exampleJa: '俺のダイエット計画は、戦略的に置かれた一箱のドーナツによって阻止された。',
        note: '計画・企てを妨げ失敗させる。"thwart a plan/an attempt"。foil と類義。1級長文頻出。',
    },
    {
        daySlot: 25, month: '2026-07', en: 'founder', pron: 'ファウンダー', pos: 'v', ja: '失敗に終わる、頓挫する',
        example: "Our band foundered after one rehearsal because nobody could agree on a name.",
        exampleJa: '俺たちのバンドは、誰もバンド名で合意できず、一回のリハで頓挫した。',
        note: '計画が挫折する/船が沈没する。名詞 founder(創設者)と同綴り別義に注意。"the talks foundered"。1級語彙。',
    },

    // ============================================================
    // 2026-07-26  Fear & Dread (恐怖・パニック)
    // ============================================================
    {
        daySlot: 26, month: '2026-07', en: 'dread', pron: 'ドレッド', pos: 'v/n', ja: '(ひどく)恐れる、不安',
        example: "I dread the moment a group photo is taken and everyone immediately asks to retake it.",
        exampleJa: '集合写真が撮られて、全員が即座に撮り直しを求めるあの瞬間が、俺は怖い。',
        note: '将来の事を強く恐れる。"dread ~ing"、"a sense of dread"。fear より「気が重い」感。1級頻出。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'trepidation', pron: 'トレピデーション', pos: 'n', ja: '不安、おののき',
        example: "I opened my bank app with the trepidation of someone defusing a bomb.",
        exampleJa: '爆弾を解除する人並みの不安を抱えて、銀行アプリを開いた。',
        note: '不安げな恐れ・身震い。"with trepidation"(おそるおそる)。フォーマルで1級らしい語。1級長文頻出。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'foreboding', pron: 'フォアボーディング', pos: 'n/adj', ja: '不吉な予感',
        example: "A sense of foreboding washed over me when the teacher said 'put your books away.'",
        exampleJa: '先生が「教科書をしまって」と言った瞬間、不吉な予感が俺を襲った。',
        note: '悪い事が起きそうな直感。"a sense of foreboding"。形容詞でも(foreboding clouds)。1級語彙。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'paranoia', pron: 'パラノイア', pos: 'n', ja: '被害妄想、過度の疑心',
        example: "After one suspicious email, my paranoia made me distrust even my own grandma's texts.",
        exampleJa: '一通の怪しいメールの後、被害妄想のせいで、ばあちゃんのメッセージすら疑い始めた。',
        note: '根拠のない強い猜疑心・不安。形容詞 paranoid。"mild paranoia"。心理・社会長文頻出。1級頻出。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'phobia', pron: 'フォビア', pos: 'n', ja: '恐怖症',
        example: "I've developed a mild phobia of the phone ringing, since it's never good news.",
        exampleJa: '電話が鳴ることへの軽い恐怖症ができた。いい知らせだったためしがないからだ。',
        note: '特定対象への病的恐怖。"a phobia of ~"。claustrophobia(閉所)など接尾辞 -phobia。1級語彙。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'petrified', pron: 'ペトリファイド', pos: 'adj', ja: '(恐怖で)すくんだ、石のように固まった',
        example: "I was petrified during the horror movie, mostly because my friend kept grabbing my arm.",
        exampleJa: 'ホラー映画の間、俺は恐怖で固まっていた。大半は友達が腕を掴み続けたせいだが。',
        note: '怖くて身動きできない。動詞 petrify(石化させる/怖がらせる)。"petrified of ~"。terrified の強調版。1級頻出。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'jittery', pron: 'ジタリー', pos: 'adj', ja: '神経質な、そわそわした',
        example: "Three coffees in, I was so jittery I could hear colors and taste sounds.",
        exampleJa: 'コーヒー3杯で、俺はそわそわしすぎて色が聞こえ、音が味わえた。',
        note: '緊張・カフェインで落ち着かない。"feel jittery"。名詞 the jitters(神経過敏)。会話で実用。1級語彙。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'harrowing', pron: 'ハロウイング', pos: 'adj', ja: '痛ましい、身の毛もよだつ',
        example: "Watching my phone slide toward the toilet in slow motion was a harrowing experience.",
        exampleJa: 'スマホがスローモーションでトイレへ滑っていくのを見るのは、身の毛もよだつ経験だった。',
        note: '非常に苦痛・恐怖を伴う。"a harrowing experience/ordeal"。動詞 harrow。災害・体験談で頻出。1級語彙。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'panic-stricken', pron: 'パニックストリックン', pos: 'adj', ja: 'パニックに陥った、恐慌状態の',
        example: "I went panic-stricken realizing I'd replied 'love you' to my boss instead of my mom.",
        exampleJa: '母じゃなく上司に「愛してる」と返信したと気づき、俺はパニックに陥った。',
        note: '恐怖で取り乱した。"-stricken"=「〜に襲われた」(grief-stricken など)。1級長文頻出。',
    },
    {
        daySlot: 26, month: '2026-07', en: 'daunting', pron: 'ドーンティング', pos: 'adj', ja: '気のくじけるような、手強い',
        example: "Replying to 47 unread messages is a daunting task I'll bravely postpone forever.",
        exampleJa: '未読47件に返信するのは気のくじける作業で、俺は勇敢に永遠に先延ばしする。',
        note: 'ひるむほど困難・威圧的。"a daunting task/challenge"。動詞 daunt、"undaunted"(ひるまない)。1級頻出。',
    },

    // ============================================================
    // 2026-07-27  Joy & Good Cheer (喜び・上機嫌)
    // ============================================================
    {
        daySlot: 27, month: '2026-07', en: 'gleeful', pron: 'グリーフル', pos: 'adj', ja: '大喜びの、うれしそうな',
        example: "My nephew was gleeful when the cake fell on the floor — five-second rule, his words.",
        exampleJa: 'ケーキが床に落ちた時、甥っ子は大喜びだった。「5秒ルール」だと、彼は言った。',
        note: '無邪気にはしゃぐ喜び。"a gleeful grin"。名詞 glee。子供のいたずら心にも。1級語彙。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'exhilarated', pron: 'イグジラレイティッド', pos: 'adj', ja: '爽快な、ウキウキした',
        example: "I felt exhilarated after the hike until I remembered we still had to hike back.",
        exampleJa: 'ハイキングの後は爽快な気分だったが、帰りもまた歩くんだと思い出した。',
        note: '興奮して元気いっぱい。動詞 exhilarate、形容詞 exhilarating(爽快な)。スポーツ・冒険に。1級頻出。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'blissful', pron: 'ブリスフル', pos: 'adj', ja: '至福の、この上なく幸せな',
        example: "There's a blissful five minutes after the alarm where Monday hasn't fully registered yet.",
        exampleJa: 'アラームの後、月曜だとまだ完全に認識していない至福の5分間がある。',
        note: 'うっとりするほど幸せ。名詞 bliss(至福)。"blissful ignorance"(知らぬが仏)も頻出。1級語彙。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'overjoyed', pron: 'オーバージョイド', pos: 'adj', ja: '大喜びの、有頂天の',
        example: "My dog is overjoyed every time I come home, even if I just stepped out for the mail.",
        exampleJa: 'うちの犬は俺が帰るたびに大喜びする。郵便を取りに出ただけでも。',
        note: '喜びでいっぱい。"overjoyed at/to ~"。delighted の強調版。素直な喜びに。1級頻出。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'gratified', pron: 'グラティファイド', pos: 'adj', ja: '満足した、うれしく思う',
        example: "I was quietly gratified that my 'random' advice turned out to be completely right.",
        exampleJa: '俺の「適当な」アドバイスが完全に正しかったと判明し、密かに満足した。',
        note: '望みがかなって満足。動詞 gratify、名詞 gratification。"instant gratification"(即時の満足)も頻出。1級語彙。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'buoyant', pron: 'ボイヤント', pos: 'adj', ja: '快活な、上向きの、浮力のある',
        example: "She stayed buoyant even after the picnic was rained out, calling it 'free hydration.'",
        exampleJa: 'ピクニックが雨で流れても彼女は快活なままで、それを「無料の水分補給」と呼んだ。',
        note: '明るく沈まない/(市場が)上向きの。"a buoyant mood/economy"。名詞 buoyancy(浮力)。1級頻出。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'content', pron: 'コンテント', pos: 'adj', ja: '満足した、満ち足りた',
        example: "I'm perfectly content doing nothing, which my to-do list finds deeply offensive.",
        exampleJa: '俺は何もしないことに完全に満足していて、ToDoリストはそれを深く侮辱と感じている。',
        note: '今あるもので満ち足りた。形容詞は「コンテント」、名詞「中身」は「コンテント」と発音注意。"content with ~"。1級頻出。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'upbeat', pron: 'アップビート', pos: 'adj', ja: '明るい、前向きな',
        example: "He stayed upbeat after losing, insisting second-to-last is 'basically a podium.'",
        exampleJa: '彼は負けても前向きで、ビリから二番目は「ほぼ表彰台」だと言い張った。',
        note: '楽観的で元気な。"an upbeat mood/tone"。対義語 downbeat。話し方・雰囲気に。1級語彙。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'giddy', pron: 'ギディー', pos: 'adj', ja: '浮かれた、目がくらむような',
        example: "I got giddy finding money in an old coat — three coins, but still a financial miracle.",
        exampleJa: '古いコートで金を見つけて浮かれた。硬貨3枚だが、それでも財政的奇跡だ。',
        note: '興奮で浮かれた/めまいがする。"giddy with excitement"。子供っぽい高揚感に。1級語彙。',
    },
    {
        daySlot: 27, month: '2026-07', en: 'jovial', pron: 'ジョヴィアル', pos: 'adj', ja: '陽気な、上機嫌の',
        example: "My uncle gets jovial at gatherings and insists on retelling the same story every year.",
        exampleJa: '叔父は集まりで陽気になり、毎年同じ話を語り直すと言い張る。',
        note: '愛想よく快活な。"a jovial host"。merry と類義、特に社交の場で。1級頻出。',
    },

    // ============================================================
    // 2026-07-28  Sound & Voice (音・声)
    // ============================================================
    {
        daySlot: 28, month: '2026-07', en: 'deafening', pron: 'デフニング', pos: 'adj', ja: '耳をつんざく、耳をろうする',
        example: "The silence after my joke was more deafening than any concert I've ever attended.",
        exampleJa: '俺のジョークの後の沈黙は、行ったどんなライブよりも耳をつんざくものだった。',
        note: '聞こえなくなるほど大きい。"deafening noise"、皮肉で"deafening silence"。動詞 deafen。1級語彙。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'shrill', pron: 'シュリル', pos: 'adj', ja: '甲高い、けたたましい',
        example: "The smoke alarm's shrill beep is how my toast announces it has become a tragedy.",
        exampleJa: '煙探知機の甲高い音は、俺のトーストが悲劇になったことの告知方法だ。',
        note: '耳障りに高く鋭い音。"a shrill voice/whistle"。けたたましさに。1級長文頻出。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'muffled', pron: 'マフルド', pos: 'adj', ja: 'くぐもった、押し殺した',
        example: "I heard a muffled argument through the wall and learned more than I ever wanted to.",
        exampleJa: '壁越しにくぐもった口論が聞こえ、知りたくもないことまで知ってしまった。',
        note: '布などで覆われ不明瞭。動詞 muffle(包んで音を抑える)。"a muffled sound/voice"。1級語彙。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'raspy', pron: 'ラスピー', pos: 'adj', ja: 'しわがれた、ざらついた',
        example: "After cheering all game, my raspy voice made me sound like a retired movie villain.",
        exampleJa: '試合中ずっと叫んだ後、しわがれ声のせいで引退した映画の悪役みたいになった。',
        note: '声がかすれてざらつく。"a raspy voice"。名詞 rasp。風邪・歌いすぎの後に。1級語彙。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'melodious', pron: 'メロディアス', pos: 'adj', ja: '美しい音色の、旋律の美しい',
        example: "The bird outside is melodious at 5 a.m. in a way I cannot fully appreciate yet.",
        exampleJa: '外の鳥は朝5時に美しい音色で鳴くが、俺はまだそれを十分に味わえない。',
        note: '心地よく音楽的。"a melodious voice"。名詞 melody。tuneful と類義。1級頻出。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'boisterous', pron: 'ボイスタラス', pos: 'adj', ja: '騒々しい、にぎやかな',
        example: "Our quiet dinner turned boisterous the second the board game came out.",
        exampleJa: '静かな夕食は、ボードゲームが出てきた瞬間に騒々しくなった。',
        note: '元気で騒がしい(特に集団)。"a boisterous crowd/party"。否定的すぎず活気の意も。1級語彙。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'hoarse', pron: 'ホース', pos: 'adj', ja: '(声が)かれた、しわがれた',
        example: "I went hoarse explaining the rules, and we still played the entire game wrong.",
        exampleJa: 'ルール説明で声がかれたのに、結局ゲームを最後まで間違って遊んだ。',
        note: '声がかすれて出にくい。"a hoarse voice"、"shout oneself hoarse"。horse(馬)と同音。1級頻出。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'resonant', pron: 'レゾナント', pos: 'adj', ja: '響き渡る、共鳴する',
        example: "His resonant laugh fills the whole room and occasionally sets off car alarms.",
        exampleJa: '彼の響き渡る笑い声は部屋中を満たし、時々車の警報を鳴らす。',
        note: '深く響く/心に訴える。"a resonant voice"。動詞 resonate(共鳴する/心に響く)、名詞 resonance。1級語彙。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'clamor', pron: 'クラマー', pos: 'n/v', ja: '騒ぎ立てる声、(やかましく)要求する',
        example: "There was a clamor for second helpings, but mysteriously none for doing the dishes.",
        exampleJa: 'おかわりを求める騒ぎは起きたが、皿洗いを求める声は不思議となかった。',
        note: '群衆の騒がしい要求・叫び。"clamor for ~"(やかましく要求する)。形容詞 clamorous。1級長文頻出。',
    },
    {
        daySlot: 28, month: '2026-07', en: 'murmur', pron: 'マーマー', pos: 'n/v', ja: 'つぶやき、ざわめき、小声で言う',
        example: "A murmur of disapproval spread through the room when I suggested splitting the bill evenly.",
        exampleJa: '割り勘を等分にしようと提案したら、不満のざわめきが部屋に広がった。',
        note: '低く小さな声/さざめき。"a murmur of ~"、"murmur something"。whisper と類義。1級語彙。',
    },

    // ============================================================
    // 2026-07-29  Light & Looks (光・色・見た目)
    // ============================================================
    {
        daySlot: 29, month: '2026-07', en: 'vivid', pron: 'ヴィヴィッド', pos: 'adj', ja: '鮮やかな、生き生きとした',
        example: "I have a vivid memory of where I left my keys; it is unfortunately completely fictional.",
        exampleJa: '俺は鍵を置いた場所を鮮明に覚えている。残念ながらそれは完全に架空だ。',
        note: '色・記憶・描写が鮮明。"a vivid color/memory/dream"。副詞 vividly。描写力アップに。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'dazzling', pron: 'ダズリング', pos: 'adj', ja: 'まばゆい、目もくらむような',
        example: "Her dazzling smile distracted everyone from the fact that the cake was clearly store-bought.",
        exampleJa: '彼女のまばゆい笑顔が、ケーキが明らかに市販品だという事実から全員の気をそらした。',
        note: '光・才能が目を奪うほど。動詞 dazzle(目をくらませる/魅了する)。"a dazzling performance"。1級語彙。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'gaudy', pron: 'ゴーディー', pos: 'adj', ja: '派手で趣味の悪い、けばけばしい',
        example: "He wore a gaudy holiday sweater so bright it qualified as its own light source.",
        exampleJa: '彼は、自前の光源と言えるほど明るいけばけばしいホリデーセーターを着ていた。',
        note: '派手すぎて下品。"gaudy decorations"。flashy より否定的。tasteful の対。1級語彙。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'drab', pron: 'ドラブ', pos: 'adj', ja: '冴えない、単調で地味な',
        example: "My drab gray hoodie has been to weddings, funerals, and one accidental job interview.",
        exampleJa: '俺の冴えない灰色パーカーは、結婚式と葬式と、一度うっかり面接にも行った。',
        note: '色・生活が地味で退屈。"a drab office/color"。dull と類義。気分を下げる単調さ。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'translucent', pron: 'トランスルーセント', pos: 'adj', ja: '半透明の、透き通った',
        example: "After skipping breakfast and sleep, my skin had achieved a faintly translucent quality.",
        exampleJa: '朝食と睡眠を抜いた後、俺の肌はうっすら半透明の質感を獲得していた。',
        note: '光を通すが向こうは見えない。transparent(透明)と区別。"translucent glass"。科学・描写で頻出。1級語彙。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'luminous', pron: 'ルミナス', pos: 'adj', ja: '光り輝く、夜光の',
        example: "The luminous hands on my watch glow brightly all night and tell time poorly all day.",
        exampleJa: '腕時計の夜光の針は一晩中明るく光り、日中は下手くそに時を告げる。',
        note: '自ら光を放つ/明るく輝く。"luminous paint/eyes"。名詞 luminosity。bright の詩的版。1級語彙。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'murky', pron: 'マーキー', pos: 'adj', ja: '濁った、不明瞭な、うさんくさい',
        example: "The rules of the game got so murky that we just made up a winner and went home.",
        exampleJa: 'ゲームのルールがあまりに不明瞭になったので、適当に勝者を決めて帰った。',
        note: '濁って暗い/真相が曖昧。"murky water"、"murky details/past"。比喩で「うさんくさい」。1級長文頻出。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'radiant', pron: 'レイディアント', pos: 'adj', ja: '輝く、晴れやかな',
        example: "She looked radiant at the party, while I looked like I'd fought the weather and lost.",
        exampleJa: '彼女はパーティーで輝いて見え、俺は天気と戦って負けたみたいに見えた。',
        note: '幸福・健康で輝く/光・熱を放つ。"a radiant smile"、"radiant heat"。名詞 radiance。1級頻出。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'dingy', pron: 'ディンジー', pos: 'adj', ja: 'うす汚れた、薄暗い',
        example: "We ate at a dingy little diner that, against all odds, had the best food in town.",
        exampleJa: 'うす汚れた小さな食堂で食べたが、予想に反して町一番の味だった。',
        note: '薄暗く薄汚い。"a dingy room/alley"。発音「ディンジー」(g は柔らかい)。drab と類義。1級語彙。',
    },
    {
        daySlot: 29, month: '2026-07', en: 'iridescent', pron: 'イリデセント', pos: 'adj', ja: '虹色に輝く、玉虫色の',
        example: "The oily puddle was weirdly iridescent, the most beautiful thing in the parking lot.",
        exampleJa: '油の浮いた水たまりが妙に虹色に輝いて、駐車場で一番きれいだった。',
        note: '見る角度で色が変わる。"iridescent feathers/bubbles"。シャボン玉・玉虫など。描写語。1級語彙。',
    },

    // ============================================================
    // 2026-07-30  Wit & Folly (賢さと愚かさ)
    // ============================================================
    {
        daySlot: 30, month: '2026-07', en: 'ingenious', pron: 'インジーニアス', pos: 'adj', ja: '独創的な、巧妙な',
        example: "I devised an ingenious system to remember my password, then forgot the system.",
        exampleJa: 'パスワードを覚える独創的なシステムを考案し、そのシステムを忘れた。',
        note: '発想が巧みで賢い(物・案)。名詞 ingenuity(創意工夫)。genius と同根、発音「インジーニアス」。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'savvy', pron: 'サヴィー', pos: 'adj/n', ja: '世渡り上手の、精通した',
        example: "My grandma is more tech-savvy than me; she found a setting I didn't know existed.",
        exampleJa: 'うちのばあちゃんは俺よりテックに精通してる。存在も知らない設定を見つけた。',
        note: '実践的に賢い・抜け目ない。"tech-savvy"、"business savvy"。名詞でも(political savvy)。口語的だが1級語。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'naive', pron: 'ナイーブ', pos: 'adj', ja: '世間知らずの、お人よしの',
        example: "It was naive of me to think 'one episode before bed' was a realistic plan.",
        exampleJa: '「寝る前に一話だけ」が現実的な計画だと思ったのは、世間知らずだった。',
        note: '純真すぎて世慣れていない。日本語「ナイーブ(繊細)」とズレ注意。"naive of you to ~"。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'gullible', pron: 'ガリブル', pos: 'adj', ja: 'だまされやすい、信じやすい',
        example: "I'm gullible enough to believe 'this meeting could have been an email' every single time.",
        exampleJa: '俺は「この会議はメールで済んだ」を毎回信じるくらいだまされやすい。',
        note: '何でも真に受ける。"gullible enough to ~"。naive と近いが「カモにされる」感が強い。1級語彙。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'foolhardy', pron: 'フールハーディー', pos: 'adj', ja: '無謀な、向こう見ずな',
        example: "It was foolhardy to trust a recipe titled 'easiest cake ever' with that many steps.",
        exampleJa: 'あれだけ工程がある「世界一簡単なケーキ」というレシピを信じたのは無謀だった。',
        note: '危険を顧みず無鉄砲。reckless と類義だが「勇気はあるが愚か」のニュアンス。1級語彙。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'inept', pron: 'イネプト', pos: 'adj', ja: '無能な、不器用な',
        example: "I'm so inept at small talk that I once wished a waiter 'happy birthday' for no reason.",
        exampleJa: '俺は雑談が下手すぎて、一度なぜかウェイターに「誕生日おめでとう」と言った。',
        note: '技量がなく下手。"socially/politically inept"。名詞 ineptitude。competent(6月既出)の対。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'witty', pron: 'ウィッティー', pos: 'adj', ja: '機知に富んだ、当意即妙の',
        example: "I think of the perfect witty comeback exactly three hours after the conversation ends.",
        exampleJa: '完璧で気の利いた切り返しを思いつくのは、会話が終わってきっかり3時間後だ。',
        note: '頭の回転が速く面白い。名詞 wit(機知)。"a witty remark"。humorous より知的な笑い。1級語彙。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'sensible', pron: 'センシブル', pos: 'adj', ja: '分別のある、賢明な',
        example: "The sensible choice was to sleep early; I instead reorganized my entire bookshelf at 2 a.m.",
        exampleJa: '賢明な選択は早く寝ることだったが、代わりに午前2時に本棚を全部整理した。',
        note: '良識的で理にかなう。"a sensible decision"。sensitive(敏感な)と混同注意。実用頻度高い1級語。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'absurd', pron: 'アブサード', pos: 'adj', ja: 'ばかげた、不条理な',
        example: "It's absurd how much I'll plan a trip and then pack everything in a panicked ten minutes.",
        exampleJa: 'あれだけ旅行を計画して、結局パニックの10分で全部詰め込むのはばかげている。',
        note: '理屈に合わずばかばかしい。名詞 absurdity、副詞 absurdly。ridiculous と類義。1級頻出。',
    },
    {
        daySlot: 30, month: '2026-07', en: 'obtuse', pron: 'オブテュース', pos: 'adj', ja: '(わざと)鈍い、理解の遅い',
        example: "He played obtuse about whose turn it was to pay until the waiter just stared at him.",
        exampleJa: '彼は誰が払う番かわざと鈍いふりをしたが、ウェイターにじっと見つめられるまでだった。',
        note: '理解が鈍い/わざと察しが悪い。"deliberately obtuse"。鈍角(an obtuse angle)も同語。1級語彙。',
    },

    // ============================================================
    // 2026-07-31  Idioms to Close (名句で締め・ことわざ)
    // ============================================================
    {
        daySlot: 31, month: '2026-07', en: 'a blessing in disguise', pron: 'ア・ブレッシング・イン・ディスガイズ', pos: 'idiom', ja: '災い転じて福、不幸に見えて実は幸運',
        example: "Missing that train was a blessing in disguise — it had no air conditioning anyway.",
        exampleJa: 'あの電車に乗り遅れたのは災い転じて福だった。どうせ冷房がなかったんだ。',
        note: '一見不運が結局よい結果に。"turn out to be a blessing in disguise"。エッセイ・会話で品が出る。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'the last straw', pron: 'ザ・ラスト・ストロー', pos: 'idiom', ja: '我慢の限界、堪忍袋の緒が切れる一押し',
        example: "The dishwasher breaking was the last straw in a week that had already gone fully sideways.",
        exampleJa: '食洗機が壊れたのが、すでに完全に崩れていた一週間のとどめの一撃だった。',
        note: '積もった不満の限界点。由来は "the straw that broke the camel\'s back"(ラクダの背を折る最後の藁)。会話頻出。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'bite the bullet', pron: 'バイト・ザ・ブレット', pos: 'idiom', ja: '(嫌な事を)覚悟を決めてやる、歯を食いしばる',
        example: "I finally bit the bullet and replied to the email I'd been dreading for three weeks.",
        exampleJa: 'ついに覚悟を決めて、3週間恐れていたメールに返信した。',
        note: '避けられない苦痛を覚悟して受け入れる。"bite the bullet and ~"。麻酔なし手術で弾を噛んだ故事。実用度高い。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'cut corners', pron: 'カット・コーナーズ', pos: 'idiom', ja: '手を抜く、近道をして質を落とす',
        example: "He cut corners assembling the shelf, and now it leans like it's deep in thought.",
        exampleJa: '彼は棚の組み立てで手を抜き、今やその棚は物思いにふけるみたいに傾いている。',
        note: '時間・金を惜しんで雑にやる。"cut corners on ~"。否定的。ビジネス・品質の話で頻出。1級らしい慣用句。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'on thin ice', pron: 'オン・シン・アイス', pos: 'idiom', ja: '危ない橋を渡って、際どい状況で',
        example: "I'm on thin ice with my plant; one more missed watering and our relationship is over.",
        exampleJa: '俺は観葉植物との関係が際どい。あと一回水やりを忘れたら、俺たちの仲は終わりだ。',
        note: '危険・信用を失う寸前の状態。"be/skate on thin ice"。薄氷を踏む。会話・ニュースで頻出。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'the tip of the iceberg', pron: 'ザ・ティップ・オブ・ジ・アイスバーグ', pos: 'idiom', ja: '氷山の一角',
        example: "The missing socks are just the tip of the iceberg of chaos inside that drawer.",
        exampleJa: '消えた靴下は、その引き出しの中の混沌の、氷山の一角にすぎない。',
        note: '見えている問題は全体のごく一部。"just the tip of the iceberg"。問題の深刻さを示す定番。1級長文頻出。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'a double-edged sword', pron: 'ア・ダブルエッジド・ソード', pos: 'idiom', ja: '諸刃の剣、長所も短所もあるもの',
        example: "Working from home is a double-edged sword: no commute, but the fridge is always right there.",
        exampleJa: '在宅勤務は諸刃の剣だ。通勤はないが、冷蔵庫が常にすぐそこにある。',
        note: '利点と欠点が表裏一体。"~ is a double-edged sword"。ライティングで賛否を述べる時に強い。1級頻出。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'the elephant in the room', pron: 'ジ・エレファント・イン・ザ・ルーム', pos: 'idiom', ja: '誰もが気づいて触れない問題',
        example: "We chatted for an hour, ignoring the elephant in the room: nobody had booked the venue.",
        exampleJa: '俺たちは1時間雑談し、部屋の中の象を無視し続けた。誰も会場を予約していなかったのだ。',
        note: '明白なのに皆が避ける厄介な話題。"address the elephant in the room"。会議・人間関係で頻出。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'jump on the bandwagon', pron: 'ジャンプ・オン・ザ・バンドワゴン', pos: 'idiom', ja: '時流に乗る、勝ち馬に乗る',
        example: "I jumped on the bandwagon and bought the trendy gadget everyone forgot about a month later.",
        exampleJa: '俺は時流に乗って流行りのガジェットを買い、一ヶ月後にはみんなが忘れていた。',
        note: '流行・多数派に便乗する。やや皮肉。"jump/climb on the bandwagon"。社会・マーケ長文で頻出。',
    },
    {
        daySlot: 31, month: '2026-07', en: 'a wake-up call', pron: 'ア・ウェイクアップ・コール', pos: 'idiom', ja: '警鐘、目を覚まさせる出来事',
        example: "Seeing my screen-time report was a real wake-up call, which I bravely ignored by scrolling more.",
        exampleJa: 'スクリーンタイムの記録を見たのは本物の警鐘で、俺は勇敢にもさらにスクロールして無視した。',
        note: '危機を自覚させる契機。"serve as a wake-up call"。元はホテルのモーニングコール。社説・スピーチで頻出。',
    },
];
