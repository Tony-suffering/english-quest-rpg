/**
 * RIDGEWAY — レクイエム世界の設定書(canon)
 *
 * ■ これは何か
 * /english/requiem の25シナリオに出てくる住人を、1つの町の名簿として確定した台帳。
 * どの話に誰が出るかは、このファイル末尾の EPISODES(全25話の台帳)を見る。
 * 発話者名は146。うち Dave と Denise は同名の別人として分けたので、人口は147人。
 * シナリオは別々に書かれてきたが、名前が16人ぶん重複していて、そこを繋ぐと1つの町になる。
 * ここが正典。今後シナリオを足すとき、新聞の VOICES に人を呼ぶとき、必ずここを見る。
 *
 * ■ 人数の上限(重要)
 * 現在147人。上限は150人 — ダンバー数、人間が安定して関係を維持できる限界。
 * **残り3枠。** 埋めたら追加は凍結する。
 * 理由: キャラを足すのは一番簡単で、一番世界を薄くする。22本が独立していたのは
 * 人が足りなかったからではなく、既にいる人を使っていなかったから。
 * 新しい話が要るときは、新しい人ではなく **既にいる人の別の日** を書く。
 *
 * ■ 追加を再開してよい条件
 * 147人それぞれが「2本以上のシナリオに出ている」状態になったとき。
 * 2026-07-24、#23 The Losers' Table で21人を同じ卓に座らせ、うち16人が初めて2本目に出た。
 * 現状それを満たすのは31人(全体の21%)。残り116人はまだ一度しか出ていない。
 * つまり世界は広げ足りないのではなく、掘り足りない。次も新キャラではなく卓を1つ増やす。
 *
 * ■ 使い方
 *   getPerson('marcus')            人物を引く
 *   peopleIn('bbq')                そのシナリオの住人
 *   peopleAcross(2)                2本以上に出ている人(交差の素材)
 *   voicesCandidates('education')  新聞のインタビュー欄に呼べる人
 */

export interface WorldPerson {
    id: string;
    name: string;
    /** 年齢帯。断定できないものは概算 */
    age?: string;
    /** 職業・立場 */
    role: string;
    /** 所属する世帯・組織の id */
    circle: string;
    /** 出演シナリオ(requiem の key) */
    scenarios: string[];
    /** 一行の人物像。既存の台詞から起こす。創作で盛らない */
    note: string;
    /** 新聞の VOICES に呼ぶときの守備範囲 */
    topics?: string[];
}

export interface WorldCircle {
    id: string;
    name: string;
    kind: 'household' | 'institution' | 'place';
    note: string;
}

export const WORLD = {
    town: 'Tonio Town',
    county: 'Wexford County',
    note: 'アメリカの中規模の町。高校はリンカーン高校(既存シナリオに実在)、地元紙は The Tonio Times。'
        + '住宅地はHOA管理で、BBQもブロックパーティーも住宅査定も同じ数ブロックの中で起きている。'
        + '日本語話者の住民が複数いる(Ken/Yuko/Sota、Keiko、Kenji、Yuki、Hana)ため、町は移民の混在が前提。',
    /** 新聞の連載「The Losers' Table」もこの町の店。月曜の夜、その週に失ったものを申告する */
    bar: 'The Losers\' Table — Flo のダイナーの奥、席が6つだけのボックス席。月曜の夜、その週に失ったものを言う。'
        + '一番損していない者が全員分払う。不服申し立ては無い。掟は新聞の連載(海の向こうの卓)から渡ってきたもので、'
        + '追加された条文は2つだけ、どちらもレシートの裏に書かれて灰皿の下にある —'
        + '「今週の損失しか数えない」(連載 Chapter II) と「誰も何も失わなかった場合、全員が払い、6番目の席には誰も座らない」(#23 第5夜)。'
        + 'シナリオ #23 losers-table が卓そのものの話である。',
} as const;

export const CIRCLES: WorldCircle[] = [
    { id: 'lincoln-high', name: 'Lincoln High School', kind: 'institution', note: '町の高校。ホームカミングは町の行事で、大人も全員来る。' },
    { id: 'hoa', name: 'The HOA neighborhood', kind: 'place', note: 'BBQ・ブロックパーティー・住宅査定・怪物退治が全部この数ブロックで起きる。Hank が規則の番人。' },
    { id: 'ridgeway-general', name: 'Tonio General Hospital', kind: 'institution', note: '救急外来。Mrs. Calloway もここの看護師で、12時間勤務の直後に高校の試合を見に来る。' },
    { id: 'courthouse', name: 'Wexford County Courthouse', kind: 'institution', note: '陪審員招集。Bailiff Reyes は Ms. Reyes の兄。' },
    { id: 'dmv-branch', name: 'The DMV branch', kind: 'institution', note: '町で最も時間が失われる建物。Vernon は開門から待っている。' },
    { id: 'vance', name: 'Marcus Vance', kind: 'household', note: 'この町の背骨。7シナリオに登場する唯一の人物。' },
    { id: 'boyd', name: 'The Boyds (Dave & Tammy)', kind: 'household', note: 'BBQを主催する家。息子 Tyler は3シナリオに出る。' },
    { id: 'chris-carol', name: 'The Rick & Carol family', kind: 'household', note: '結婚式と感謝祭の両方に出る一族。Rick と Carol は夫婦、Chris は息子、Lorraine は Rick の母。' },
    { id: 'crew-cruise', name: 'The cruise ship', kind: 'place', note: '町の外。休暇で出た住人(Cheryl)と、船側の人間が混ざる。' },
    { id: 'road', name: 'On the road', kind: 'place', note: 'ロードトリップ・バケットリスト・空港。町を出た人たちの章。' },
    { id: 'campus', name: 'The college two hours away', kind: 'place', note: '町の子が進学する先。Tyler・Megan・Jake がここで再会する。' },
];

/**
 * 146人の台帳。
 * scenarios が2本以上ある人は、そのまま交差の材料になる(現在16人)。
 */
export const PEOPLE: WorldPerson[] = [
    // ============ 背骨 ============
    {
        id: 'marcus', name: 'Marcus Vance', age: '17→32', role: '元QB、いまは町の普通の男', circle: 'vance',
        scenarios: ['fridaynightlights', 'movie', 'firstweek', 'gamenight', 'homeinspection', 'blockparty', 'mariners', 'losers-table', 'night-docket'],
        note: '7シナリオに出る唯一の人物。17歳でリンカーン高校のQBとしてホームカミングの最終ドライブを背負い、'
            + '25歳で Maya の初出社を励まし、28歳で Jess とゲームナイトを主催し、30歳で Jenna と家を買い、'
            + '31歳でブロックパーティーに新参として立ち、32歳でマリナーズを語る。'
            + '**高校で「フットボールなんて興味ない」と抗議していた Jenna と、最後に家を買っている。**'
            + '誰も設計していないのに、この町には15年分の人生が1本通っていた。',
        topics: ['sport', 'work', 'housing', 'growing up'],
    },

    // ============ リンカーン高校 (fridaynightlights) ============
    { id: 'coach-daryl', name: 'Coach Daryl', age: '50s', role: 'フットボール部ヘッドコーチ', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'talent-show'], note: 'ロッカールームの演説でダイ・ハードを引用する。熱量が語彙を超えている。', topics: ['sport', 'discipline', 'streaks'] },
    { id: 'coach-vega', name: 'Coach Vega', age: '40s', role: 'アシスタントコーチ', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'talent-show'], note: 'ダリルに「ダイ・ハードは控えめに」と進言する唯一の人間。抑制側。' },
    { id: 'jamal', name: 'Jamal', age: '17', role: 'レシーバー', circle: 'lincoln-high', scenarios: ['fridaynightlights'], note: '仲間の手を「マジックだ」と言って不安を潰す係。' },
    { id: 'big-pete', name: 'Big Pete', age: '17', role: 'ラインマン', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'talent-show'], note: '試合前にホットドッグを4本食べて絶好調。自分を高性能な炉だと思っている。' },
    { id: 'tasha', name: 'Tasha', age: '17', role: 'チアリーダー主将', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'talent-show'], note: 'ポンポンが1本でも落ちたらやり直し。規律の人。' },
    { id: 'maya', name: 'Maya', age: '17→25', role: '転入生 → 新社会人', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'firstweek'], note: '高校では「ダウンって何?」と聞いていた新参者。25歳で初めての内定を取り、母に電話する。町の外から来て、町で大人になった人。', topics: ['work', 'starting over'] },
    { id: 'devon', name: 'Devon', age: '17→28', role: '観察者。何にでも解説を付ける', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'gamenight', 'losers-table', 'night-docket', 'talent-show'], note: '高校では自校のペップラリーを人類学の実況として語り、大人になってもゲームナイトで「多くの人が好きなものは、たいてい間違っている」と言っている。11年変わっていない。', topics: ['culture', 'opinions'] },
    { id: 'jenna', name: 'Jenna', age: '17→30', role: '抗議する人 → 家を買う人', circle: 'vance', scenarios: ['fridaynightlights', 'homeinspection', 'losers-table', 'night-docket'], note: '高校のホームカミングに「私は抗議のもとにここにいる」と宣言して座っていた。13年後、Marcus と家を買い、屋根の交換時期を売主に詰めている。**この町で最も長い伏線。**', topics: ['housing', 'skepticism'] },
    { id: 'mr-kowalski', name: 'Mr. Kowalski', age: '60s', role: '歴史教師', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'talent-show'], note: '高校の試合をゲティスバーグ3日目に例える。コーヒーマシンの前でウィッシュボーン隊形の歴史を20分語る。' },
    { id: 'ms-reyes', name: 'Ms. Reyes', age: '30s', role: '英文学教師(教職3年目)。前職はボストンの銀行8年', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'losers-table', 'talent-show'], note: 'ペップラリーに面食らい、試合で絶叫し、自分の変化に驚いている外部の目。ホームカミング後の課題で22人中14人が同じ3時間について書いた。**新聞8/1号の反論者。**', topics: ['education', 'praise', 'corporate life', 'outsider'] },
    { id: 'principal-henderson', name: 'Principal Henderson', age: '50s', role: '校長', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'losers-table', 'talent-show'], note: '「校長として完全に中立」と宣言し続ける。中立を宣言する回数が中立でない。' },
    { id: 'brandon-lee', name: 'Brandon Lee', age: '17', role: 'マーチングバンドのトランペット', circle: 'lincoln-high', scenarios: ['fridaynightlights', 'talent-show'], note: '「ラッパは娯楽のために吹くのではない、栄光のために吹く」。高校で最も本気の男。' },
    { id: 'mrs-calloway', name: 'Mrs. Calloway', age: '40s', role: '救急外来の看護師', circle: 'ridgeway-general', scenarios: ['fridaynightlights'], note: '12時間勤務の直後、消毒液の匂いのまま試合に来る。町の大人の代表。', topics: ['health', 'shift work'] },

    // ============ HOA住宅地 (bbq / blockparty / homeinspection / monster) ============
    { id: 'dave-boyd', name: 'Dave Boyd', age: '40s', role: 'BBQの主催者', circle: 'boyd', scenarios: ['bbq', 'losers-table', 'night-docket'], note: '数年前のブリスケット失敗を町で唯一まだ覚えている男。「みんな忘れてるよ」に「俺は覚えてる」と返す。', topics: ['cooking', 'shame'] },
    { id: 'tammy', name: 'Tammy Boyd', age: '40s', role: 'Dave の妻', circle: 'boyd', scenarios: ['bbq', 'night-docket'], note: '夫の古傷を毎年ひとりで鎮火させている。' },
    { id: 'tyler', name: 'Tyler Boyd', age: '15→20', role: 'Dave と Tammy の息子', circle: 'boyd', scenarios: ['bbq', 'movie', 'party'], note: '父のエプロンを止めようとし、映画館で年齢確認をごまかし、大学のアパートでパーティーを主催する。3シナリオで確実に成長している数少ない人物。', topics: ['growing up', 'parties'] },
    { id: 'hank', name: 'Hank', age: '50s', role: 'HOAの規則係。キャンプでは父', circle: 'hoa', scenarios: ['bbq', 'campingtrip', 'losers-table', 'night-docket'], note: 'BBQでは「グリルは9時まで」とクリップボードを持って回り、家族キャンプでは8本ポールの四季用テントを色分けで説明する。規則が服を着て歩いている。', topics: ['rules', 'family', 'camping'] },
    { id: 'cheryl', name: 'Cheryl', age: '50s', role: '近所の住人。クルーズにも行く', circle: 'hoa', scenarios: ['bbq', 'cruise', 'losers-table', 'night-docket'], note: 'Hank にクリップボードを置いて酒を取ってこいと言える唯一の人。船の上でも初日から飛ばしている。', topics: ['neighbours', 'travel'] },
    { id: 'brenda', name: 'Brenda', age: '50s', role: '近所の住人。オハイオから移住', circle: 'hoa', scenarios: ['bbq', 'dmv'], note: '「何だって誰かにとっては失礼よ」。DMVでは移住手続きの列で同じことを言っている。', topics: ['moving', 'small talk'] },
    { id: 'ken', name: 'Ken', age: '40s', role: '日本から越してきた新住民', circle: 'hoa', scenarios: ['bbq', 'talent-show'], note: 'BBQで名乗るところから始まる。妻 Yuko、息子 Sota。', topics: ['moving in', 'language'] },
    { id: 'yuko', name: 'Yuko', age: '40s', role: 'Ken の妻', circle: 'hoa', scenarios: ['bbq'], note: '枝豆の食べ方を実演して、その場の空気を一段和らげた。' },
    { id: 'sota', name: 'Sota', age: '8', role: 'Ken と Yuko の息子', circle: 'hoa', scenarios: ['bbq', 'talent-show'], note: 'スプリンクラーの子どもたちに入りたいと言い出す。言語より先に遊びが通じる。' },
    { id: 'donna', name: 'Donna', age: '50s', role: 'ブロックパーティーの実行委員長', circle: 'hoa', scenarios: ['blockparty', 'losers-table', 'night-docket', 'talent-show'], note: '朝7時に「予定より遅れている」と宣言する。折りたたみテーブルの遅配を許さない。', topics: ['organising'] },
    { id: 'tommy', name: 'Tommy', age: '40s', role: 'クリップボードを渡された男', circle: 'hoa', scenarios: ['blockparty', 'losers-table', 'night-docket'], note: '「クリップボードを渡したな。本当に渡したな」。権限を与えられた瞬間の人間。' },
    { id: 'bri', name: 'Bri', age: '20s', role: '配信者', circle: 'hoa', scenarios: ['blockparty', 'night-docket'], note: '設営より先に照明を探す。フォロワーが待っている。' },
    { id: 'leticia', name: 'Leticia', age: '40s', role: 'スピリチュアル寄りの隣人', circle: 'hoa', scenarios: ['blockparty', 'talent-show'], note: '「この場のエネルギーを感じる」から一日が始まる。' },
    { id: 'reggie', name: 'Reggie', age: '60s', role: '毎年参加している皮肉屋', circle: 'hoa', scenarios: ['blockparty', 'losers-table', 'night-docket', 'talent-show'], note: '「またブロックパーティーか」。参加率100%の批判者。' },
    { id: 'pastor-jim', name: 'Pastor Jim', age: '50s', role: '牧師', circle: 'hoa', scenarios: ['blockparty', 'talent-show'], note: '常に大文字で喋る。町の音量担当。' },
    { id: 'keiko', name: 'Keiko', age: '30s', role: '子ども係の隣人', circle: 'hoa', scenarios: ['blockparty'], note: '子どもの面倒を引き受ける側に自然に回る。' },
    { id: 'karen', name: 'Karen', age: '40s', role: '不動産エージェント', circle: 'hoa', scenarios: ['homeinspection', 'night-docket'], note: '検査士に任せて自分は説明役に回る。段取りの人。', topics: ['housing'] },
    { id: 'bob', name: 'Bob', age: '60s', role: '住宅検査士', circle: 'hoa', scenarios: ['homeinspection', 'night-docket'], note: '「地下室だ。家のことは地下室が全部教えてくれる」。この町で最も信用できる職人。', topics: ['housing', 'craft'] },
    { id: 'mrs-patterson', name: 'Mrs. Patterson', age: '70s', role: '売主', circle: 'hoa', scenarios: ['homeinspection', 'night-docket'], note: '壁の茶色い染みを「一度だけ」と言い張る。雨樋が詰まった、何年も前の話だと。' },
    { id: 'timmy', name: 'Timmy', age: '6', role: 'ベッドの下に怪物がいる子', circle: 'hoa', scenarios: ['monster', 'night-docket', 'talent-show'], note: '両親の外出を全力で阻止しようとする。' },
    { id: 'greg', name: 'Greg', age: '30s', role: 'Timmy の父', circle: 'hoa', scenarios: ['monster', 'night-docket'], note: '6歳に「先約があり、あらゆる意味において」と法律文書のような説明をする。' },
    { id: 'sarah', name: 'Sarah', age: '30s', role: 'Timmy の母', circle: 'hoa', scenarios: ['monster', 'night-docket'], note: '夫の長文を「つまりイエスってこと」と3語で翻訳する。' },
    { id: 'emma', name: 'Emma', age: '10', role: 'Timmy の姉', circle: 'hoa', scenarios: ['monster', 'night-docket', 'talent-show'], note: 'ぬいぐるみの熊にできることとできないことを正確に区別する。' },
    { id: 'kayla', name: 'Kayla', age: '30s', role: '近所の住人。クルーズでは新婚', circle: 'hoa', scenarios: ['cruise', 'monster'], note: '新婚旅行に表計算を持ってきた夫を止め、数年後には近所の子守り騒動に居合わせている。', topics: ['marriage', 'neighbours'] },
    { id: 'noah', name: 'Noah', age: '7', role: 'お泊まりに来た子', circle: 'hoa', scenarios: ['monster', 'night-docket'], note: '忍者刀と寝袋を持参。装備は万全。' },
    { id: 'frank', name: 'Frank', age: '70s', role: '「わしらの時代は」の人', circle: 'hoa', scenarios: ['monster', 'night-docket'], note: 'お泊まり会という概念に別の名前を持っている。' },
    { id: 'danny', name: 'Danny', age: '40s', role: '突然来る隣人', circle: 'hoa', scenarios: ['monster'], note: 'ノックしながら入ってくる。' },

    // ============ 結婚式と感謝祭の一族 ============
    { id: 'chris', name: 'Chris', age: '30s', role: '新郎。Rick と Carol の息子', circle: 'chris-carol', scenarios: ['wedding'], note: '「泊まってるって、どういう意味で?」で家族の規模を白状する。' },
    { id: 'yuki', name: 'Yuki', age: '30s', role: '新婦。日本から', circle: 'chris-carol', scenarios: ['wedding'], note: '車の台数で相手の一族の規模を測ろうとする。10日間で家族の全員に会う。', topics: ['family', 'culture shock'] },
    { id: 'carol', name: 'Carol', age: '60s', role: 'Chris の母、Rick の妻', circle: 'chris-carol', scenarios: ['wedding', 'thanksgiving'], note: '結婚式では新婦を抱き寄せ、感謝祭では夫のターキーフライヤーを止めようとする。この一族の実務。', topics: ['family'] },
    { id: 'rick', name: 'Rick', age: '60s', role: 'Carol の夫。若い世代からは Uncle Rick', circle: 'chris-carol', scenarios: ['wedding', 'thanksgiving'], note: '30クォートのターキーフライヤーを実家に持ち込む。結婚式では新婦を最初に気に入る。', topics: ['family', 'cooking'] },
    { id: 'grandma-lorraine', name: 'Grandma Lorraine', age: '80s', role: 'Rick の母', circle: 'chris-carol', scenarios: ['thanksgiving'], note: '玄関で「その持ってるのは一体何なの」と息子に聞く。' },
    { id: 'emily', name: 'Emily', age: '30s', role: 'Chris の姉妹', circle: 'chris-carol', scenarios: ['wedding'], note: '新婦を家族として迎える台詞を担当する。' },
    { id: 'nana-jo', name: 'Nana Jo', age: '80s', role: '祖母', circle: 'chris-carol', scenarios: ['wedding'], note: '「いい答えね。クリス、この子は逃がすな」。一族の最終審査。' },
    { id: 'uncle-lou', name: 'Uncle Lou', age: '60s', role: '感謝祭に来る叔父', circle: 'chris-carol', scenarios: ['thanksgiving'], note: '「おっ、勢揃いだな」で入ってくる。' },
    { id: 'aunt-pam', name: 'Aunt Pam', age: '60s', role: '叔母', circle: 'chris-carol', scenarios: ['thanksgiving'], note: '「解体された何ですって?」で新しい料理を却下する。' },
    { id: 'grandpa-stan', name: 'Grandpa Stan', age: '80s', role: '祖父', circle: 'chris-carol', scenarios: ['thanksgiving', 'losers-table', 'talent-show'], note: '「寝てない、目を休めてるんだ」。DMVの Vernon と一字一句同じ主張をする。' },
    { id: 'spencer', name: 'Spencer', age: '20', role: '大学生の甥', circle: 'chris-carol', scenarios: ['thanksgiving'], note: '食事の前に報告がある、と切り出す。今学期に何かあった。' },
    { id: 'brianna', name: 'Brianna', age: '17', role: '全部撮っている姪', circle: 'chris-carol', scenarios: ['thanksgiving', 'talent-show'], note: '祖母の表情を「映像作品」と評し、家族のグループチャットに上げる。' },
    { id: 'tyson', name: 'Tyson', age: '30s', role: 'ベストマン', circle: 'chris-carol', scenarios: ['wedding'], note: '自称「プロの悪影響」。' },
    { id: 'priya', name: 'Priya', age: '30s', role: 'メイド・オブ・オナー', circle: 'chris-carol', scenarios: ['wedding', 'gamenight'], note: '結婚式では対応グッズを全部持っている危機管理担当。ゲームナイトでは料理の匂いで大騒ぎする側に回る。', topics: ['events', 'friendship'] },
    { id: 'denise-planner', name: 'Denise (planner)', age: '40s', role: 'ウェディングプランナー', circle: 'chris-carol', scenarios: ['wedding'], note: '式次第を一気に説明する。空港の Denise とは別人(同名の別人として確定)。', topics: ['events'] },
    { id: 'dan', name: 'Dan', age: '30s', role: '親族', circle: 'chris-carol', scenarios: ['wedding'], note: '「まず息をして」で場を落ち着かせる係。' },

    // ============ 救急外来 ============
    { id: 'nurse-tanya', name: 'Nurse Tanya', age: '40s', role: '救急外来の看護師', circle: 'ridgeway-general', scenarios: ['emergencyroom', 'losers-table'], note: '「入って、座って、手を見せて」。町でいちばん速い3語。', topics: ['health', 'triage'] },
    { id: 'dave-kellerman', name: 'Dave Kellerman', age: '50s', role: '電動ノコギリで手を切った男', circle: 'ridgeway-general', scenarios: ['emergencyroom'], note: '「20分前に血は止まった。たぶん」。BBQの Dave Boyd とは別人(同名の別人として確定)。', topics: ['injury', 'stubbornness'] },
    { id: 'renata', name: 'Renata', age: '50s', role: 'Dave Kellerman の妻', circle: 'ridgeway-general', scenarios: ['emergencyroom'], note: '「手袋しろって百回言った。毎回『手袋は素人がするもんだ』って」。' },
    { id: 'walter', name: 'Walter', age: '60s', role: '長時間待っている患者', circle: 'ridgeway-general', scenarios: ['emergencyroom', 'losers-table'], note: '「あんた、悪い夜に来たな」。待合室の古参。' },
    { id: 'destiny', name: 'Destiny', age: '20s', role: '歩き回っている患者', circle: 'ridgeway-general', scenarios: ['emergencyroom'], note: '座っていられる人が羨ましい。2時間同じ輪を歩いている。' },
    { id: 'little-mateo', name: 'Little Mateo', age: '5', role: '待合室の子ども', circle: 'ridgeway-general', scenarios: ['emergencyroom'], note: '待合室の空気を変える存在。' },
    { id: 'brody', name: 'Brody', age: '30s', role: '楽観的な患者', circle: 'ridgeway-general', scenarios: ['emergencyroom', 'losers-table'], note: '「他のどこで見知らぬ9人が集まる?」。待合室を肯定する唯一の人間。' },
    { id: 'dr-osei', name: 'Dr Osei', age: '40s', role: '当直医', circle: 'ridgeway-general', scenarios: ['emergencyroom'], note: '「麻酔効いた? 指を動かして。よし」。手が速い。', topics: ['health'] },
    { id: 'phil', name: 'Phil', age: '30s', role: '事務', circle: 'ridgeway-general', scenarios: ['emergencyroom'], note: '退院書類の署名箇所を延々と指し続ける。' },

    // ============ 裁判所 ============
    { id: 'bailiff-reyes', name: 'Bailiff Reyes', age: '40s', role: '廷吏。Ms. Reyes の兄', circle: 'courthouse', scenarios: ['juryduty', 'losers-table', 'night-docket'], note: '「名前を呼ばれた者は聞け」。妹が高校で教えている。' },
    { id: 'trevor', name: 'Trevor', age: '30s', role: '仕事を理由に逃れたい陪審員候補', circle: 'courthouse', scenarios: ['juryduty'], note: '「仮に、すごく大事な仕事があった場合ですが」。' },
    { id: 'wanda', name: 'Wanda', age: '60s', role: '陪審を名誉と考える候補', circle: 'courthouse', scenarios: ['juryduty', 'losers-table', 'night-docket'], note: '「我々は司法の背骨です」。差し入れを持参している。' },
    { id: 'doug', name: 'Doug', age: '50s', role: '皮肉屋の候補', circle: 'courthouse', scenarios: ['juryduty'], note: '「そりゃ持ってくるよな」。' },
    { id: 'aisha', name: 'Aisha', age: '30s', role: '制度に懐疑的な候補', circle: 'courthouse', scenarios: ['juryduty'], note: '「それこそが制度の問題そのもの」と言いかけて、自分で切り上げる。', topics: ['justice', 'systems'] },
    { id: 'mei', name: 'Mei', age: '23', role: '初めての召喚', circle: 'courthouse', scenarios: ['juryduty'], note: '23歳で呼ばれることがあると知らなかった。' },
    { id: 'judge-halloran', name: 'Judge Halloran', age: '60s', role: '判事', circle: 'courthouse', scenarios: ['juryduty', 'night-docket', 'talent-show'], note: '「これは予備尋問です。私が聞き、あなたが正直に答える」。', topics: ['justice'] },

    // ============ DMV ============
    { id: 'patrice', name: 'Patrice', age: '40s', role: '受付', circle: 'dmv-branch', scenarios: ['dmv', 'losers-table'], note: '「今日は何で? 更新、新規、登録、実技?」。4択で人生を分類する。' },
    { id: 'tony', name: 'Tony', age: '30s', role: '更新に来た男', circle: 'dmv-branch', scenarios: ['dmv'], note: '「更新だけです。すぐ終わりますよね?」から始まる一日。' },
    { id: 'vernon', name: 'Vernon', age: '70s', role: '開門から待っている男', circle: 'dmv-branch', scenarios: ['dmv', 'losers-table', 'night-docket'], note: '「寝てない。目を休めてるんだ。全然違う」。感謝祭の Grandpa Stan と同じ主張をする。' },
    { id: 'kevin', name: 'Kevin', age: '20s', role: '書類が足りなかった若者', circle: 'dmv-branch', scenarios: ['dmv'], note: '「何が必要か、最初に言ってくれないんですか?」。' },
    { id: 'gloria', name: 'Gloria', age: '50s', role: '窓口係', circle: 'dmv-branch', scenarios: ['dmv'], note: '「G47。6番窓口」。番号で人を呼ぶ側。' },
    { id: 'mr-okafor', name: 'Mr Okafor', age: '50s', role: '実技試験官', circle: 'dmv-branch', scenarios: ['dmv'], note: '「準備ができたらエンジンをかけて」。町でいちばん静かな圧力。' },

    // ============ 空港 ============
    { id: 'denise-gate', name: 'Denise (gate agent)', age: '30s', role: 'B12ゲート係', circle: 'road', scenarios: ['airport'], note: '天候による遅延を告げる側。結婚式の Denise とは別人(同名の別人として確定)。' },
    { id: 'reuben', name: 'Reuben', age: '30s', role: '乗り継ぎが不安な乗客', circle: 'road', scenarios: ['airport'], note: '「あの表示は楽観的なのか、嘘をついてるのか」。' },
    { id: 'wendell', name: 'Wendell', age: '60s', role: '動じない乗客', circle: 'road', scenarios: ['airport', 'talent-show'], note: '「2時間! そんなもん」。基準が違う。' },
    { id: 'hana', name: 'Hana', age: '20s', role: '英語に不安のある乗客', circle: 'road', scenarios: ['airport', 'talent-show'], note: '「遅延はこの便だけですか、それとも全部…英語が下手ですみません」。この町の学習者の代表。', topics: ['language', 'travel'] },
    { id: 'simone', name: 'Simone', age: '40s', role: '達観した乗客', circle: 'road', scenarios: ['airport'], note: '「0時間目でそれだけ緊張してたら」。' },
    { id: 'chad', name: 'Chad', age: '30s', role: '揉める乗客', circle: 'road', scenarios: ['airport'], note: '「いや、だめだ、だめだ」から始まる。' },
    { id: 'captain-ortiz', name: 'Captain Ortiz', age: '50s', role: '機長', circle: 'road', scenarios: ['airport'], note: '状況を引き取って落ち着かせる側。' },
    { id: 'diego', name: 'Diego', age: '10', role: '一人で搭乗する子ども', circle: 'road', scenarios: ['airport', 'talent-show'], note: '「年に2回やってる。両親が離婚してて。ヘッドホンとタブレットあるし平気」。空港でいちばん落ち着いている。' },

    // ============ ロードトリップ ============
    { id: 'roy', name: 'Roy', age: '40s', role: '運転する父', circle: 'road', scenarios: ['roadtrip'], note: '出発前に全員のトイレを確認する。「途中では止まらないからな」。' },
    { id: 'lori', name: 'Lori', age: '40s', role: 'Roy の妻', circle: 'road', scenarios: ['roadtrip'], note: 'GPSを読み上げる係。「右だって。高速の入口は右」。' },
    { id: 'walt', name: 'Walt', age: '70s', role: '祖父', circle: 'road', scenarios: ['roadtrip', 'talent-show'], note: '「わしらの頃はガソリン1タンクと魔法瓶でフロリダまで行った」。' },
    { id: 'sam', name: 'Sam', age: '7', role: '子ども', circle: 'road', scenarios: ['roadtrip', 'talent-show'], note: 'バンに Bessie と名前を付けた。' },
    { id: 'paige', name: 'Paige', age: '15', role: '記録係の娘', circle: 'road', scenarios: ['roadtrip', 'talent-show'], note: '「1日目0時間。家族はもう私道で喧嘩している」。実況者。' },
    { id: 'flo', name: 'Flo', age: '60s', role: 'ダイナーの主。Losers\' Table の席を預かっている', circle: 'road', scenarios: ['roadtrip', 'losers-table', 'night-docket'], note: '「6人? 奥の広いボックス席にどうぞ」。29年間、朝5時に店を開けてきた(新聞 VOICES)。その奥のボックス席が Losers\' Table で、申告の可否を裁定するのは彼女。「あんたは8時間使ったの。そこには違いがある」。', topics: ['work', 'small business', 'the road'] },
    { id: 'rhonda', name: 'Rhonda', age: '40s', role: '話しかけてくる客', circle: 'road', scenarios: ['roadtrip'], note: '「口挟んでごめんね、聞こえちゃって」。' },
    { id: 'bud', name: 'Bud', age: '60s', role: 'モーテルの主人', circle: 'road', scenarios: ['roadtrip'], note: '歓迎の声が大きい。' },
    { id: 'pat', name: 'Pat', age: '50s', role: 'モーテルのフロント', circle: 'road', scenarios: ['roadtrip'], note: '部屋の構成を淡々と提示する。ベビーベッドは運べる。' },
    { id: 'ranger-kim', name: 'Ranger Kim', age: '30s', role: '国立公園のレンジャー', circle: 'road', scenarios: ['roadtrip'], note: '「窓を閉めて、車から出ないで。あれは1トンあって、あなたより速い」。' },
    { id: 'duke', name: 'Duke', age: '50s', role: 'レッカー業者', circle: 'road', scenarios: ['roadtrip', 'talent-show'], note: '「レッカー呼んだ?」で登場する。旅の終わりの人。' },

    // ============ キャンプ ============
    { id: 'logan', name: 'Logan', age: '15', role: 'Hank の息子', circle: 'hoa', scenarios: ['campingtrip'], note: '「電波ゼロ。5日どうやって生きろと」。' },
    { id: 'sandra', name: 'Sandra', age: '40s', role: 'Hank の妻', circle: 'hoa', scenarios: ['campingtrip'], note: '「それがキャンプの意味なの。デジタルから離れるために来たの」。' },
    { id: 'ruby', name: 'Ruby', age: '9', role: 'Hank の娘', circle: 'hoa', scenarios: ['campingtrip'], note: '無条件で全部好き。' },
    { id: 'uncle-dale', name: 'Uncle Dale', age: '60s', role: '叔父', circle: 'hoa', scenarios: ['campingtrip'], note: '「正直に言うか、ハンク? 袋を置いて、離れろ。テントに謙虚さを教わればいい」。' },
    { id: 'ranger-dawn', name: 'Ranger Dawn', age: '40s', role: 'キャンプ場のレンジャー', circle: 'road', scenarios: ['campingtrip'], note: '食料の保管を淡々と指示して回る。' },

    // ============ クルーズ ============
    { id: 'ben', name: 'Ben', age: '30s', role: 'Kayla の夫', circle: 'crew-cruise', scenarios: ['cruise'], note: '新婚旅行に日程表を持ち込んだ男。「点呼、船室、5時から出航デッキ」。', topics: ['marriage', 'planning'] },
    { id: 'julian', name: 'Julian', age: '30s', role: 'クルーズディレクター', circle: 'crew-cruise', scenarios: ['cruise', 'talent-show'], note: '「こんにちは、美しい皆さん!」。職業的な高揚。' },
    { id: 'marv', name: 'Marv', age: '70s', role: '27回目の乗客', circle: 'crew-cruise', scenarios: ['cruise', 'talent-show'], note: '「27回目のクルーズ、45回目の結婚記念日」。' },
    { id: 'arlene', name: 'Arlene', age: '70s', role: 'Marv の妻', circle: 'crew-cruise', scenarios: ['cruise', 'talent-show'], note: '「それで決まりね」。45年の相槌。' },
    { id: 'andres', name: 'Andres', age: '30s', role: '12番テーブルの給仕', circle: 'crew-cruise', scenarios: ['cruise'], note: '毎晩同じ挨拶から始める。' },
    { id: 'captain-lund', name: 'Captain Lund', age: '50s', role: '船長', circle: 'crew-cruise', scenarios: ['cruise'], note: '12番テーブルに挨拶に来る。' },
    { id: 'tessa', name: 'Tessa', age: '20s', role: 'シュノーケリングのガイド', circle: 'crew-cruise', scenarios: ['cruise'], note: '「おはようシュノーケラー!」。' },

    // ============ バケットリスト ============
    { id: 'gary', name: 'Gary', age: '60s', role: '高所が苦手な夫', circle: 'road', scenarios: ['bucketlist'], note: '手の関節が白い。「別の話しない?」', topics: ['fear', 'retirement'] },
    { id: 'linda', name: 'Linda', age: '60s', role: 'Gary の妻', circle: 'road', scenarios: ['bucketlist'], note: '「ゲイリー、手が白いわよ」。観察が速い。' },
    { id: 'earl', name: 'Earl', age: '70s', role: '現地の常連', circle: 'road', scenarios: ['bucketlist'], note: '「初めてかい? 名前は」。' },
    { id: 'dot', name: 'Dot', age: '70s', role: 'Earl の妻', circle: 'road', scenarios: ['bucketlist'], note: '「アール、まだ駐車したばっかりよ。少し放っておきなさい」。' },
    { id: 'javi', name: 'Javi', age: '30s', role: 'ガイド', circle: 'road', scenarios: ['bucketlist'], note: '「ほら、1人だけ。それが」。' },
    { id: 'megan', name: 'Megan', age: '20', role: 'Gary と Linda の娘。大学生', circle: 'campus', scenarios: ['bucketlist', 'party'], note: 'ビデオ通話で両親のグランドキャニオンに立ち会い、別の週には大学のパーティーにいる。町の外に出た世代。', topics: ['family', 'college'] },

    // ============ 遺品整理 ============
    { id: 'ray', name: 'Ray', age: '60s', role: '鑑定人', circle: 'road', scenarios: ['antiques', 'night-docket', 'talent-show'], note: '「おばあさんには目があった。趣味があった」。値付けの前に敬意を置く。', topics: ['inheritance', 'value'] },
    { id: 'nadia', name: 'Nadia', age: '40s', role: '孫', circle: 'road', scenarios: ['antiques', 'night-docket'], note: '「3時間運転して来たのよ」。' },
    { id: 'dex', name: 'Dex', age: '30s', role: '孫', circle: 'road', scenarios: ['antiques', 'night-docket'], note: '「マーゴットおばさん、僕だっておばあちゃんが好きだった」。' },
    { id: 'cody', name: 'Cody', age: '30s', role: '早く終わらせたい親族', circle: 'road', scenarios: ['antiques', 'night-docket'], note: '「開けて済ませようよ。4時に用事があるんだ」。' },
    { id: 'margot', name: 'Margot', age: '60s', role: '叔母', circle: 'road', scenarios: ['antiques', 'night-docket'], note: '「私の結婚式で泣いてくれたのよ!」。感情で所有権を主張する。' },
    { id: 'pearl', name: 'Pearl', age: '80s', role: '隣家の住人', circle: 'road', scenarios: ['antiques', 'night-docket'], note: '「庭を歩いて来たのよ。隣に住んでるの」。招かれずに来る唯一の正当性。' },

    // ============ ゲームナイト ============
    { id: 'jess', name: 'Jess', age: '20s→28', role: 'Maya の友人 → Marcus の同居人', circle: 'vance', scenarios: ['firstweek', 'gamenight'], note: '就職する友人に「見た目から入れ」と助言し、数年後にはゲームナイトを主催している側にいる。', topics: ['friendship', 'work'] },
    { id: 'nina', name: 'Nina', age: '30s', role: 'ゲームナイトの参加者', circle: 'vance', scenarios: ['gamenight'], note: '「大げさにしたくないって言ったよね。じゃあ言わない。解決」。' },
    { id: 'trent', name: 'Trent', age: '30s', role: 'ゲームナイトの参加者', circle: 'vance', scenarios: ['gamenight'], note: '「3日前にグループチャットに送ったけど」。' },

    // ============ 映画館 ============
    { id: 'jayden', name: 'Jayden', age: '16', role: '仕切る側', circle: 'lincoln-high', scenarios: ['movie'], note: '「45分ある。聞いて」。' },
    { id: 'maddie', name: 'Maddie', age: '16', role: '母から連絡が来る子', circle: 'lincoln-high', scenarios: ['movie'], note: '母が確認を取ってくる。' },
    { id: 'ava', name: 'Ava', age: '16', role: 'レビューを読んでいる子', circle: 'lincoln-high', scenarios: ['movie'], note: '「昨日レビューが出たんだけど」。' },
    { id: 'benji', name: 'Benji', age: '11', role: 'ついてきた弟', circle: 'lincoln-high', scenarios: ['movie'], note: '「ママがいいって言った」。大文字で主張する。' },
    { id: 'gus', name: 'Old Man Gus', age: '70s', role: '映画館の常連', circle: 'lincoln-high', scenarios: ['movie', 'losers-table', 'talent-show'], note: '「お嬢さん、わしはここに通って」。' },

    // ============ 最悪の初デート ============
    { id: 'jake', name: 'Jake', age: '20s', role: '初デートの男', circle: 'campus', scenarios: ['worstdate', 'party', 'talent-show'], note: 'ミトコンドリア・イブの話を初デートでする。別の夜には大学のパーティーに人を連れてくる。', topics: ['dating', 'awkwardness'] },
    { id: 'nate', name: 'Nate', age: '20s', role: 'Jake の友人', circle: 'campus', scenarios: ['worstdate', 'talent-show'], note: '「初デートでミトコンドリア・イブ? TEDトークかよ」。' },
    { id: 'chloe', name: 'Chloe', age: '20s', role: 'デート相手', circle: 'campus', scenarios: ['worstdate', 'talent-show'], note: '「あなた、なんか」から始まる観察。' },
    { id: 'marco', name: 'Marco', age: '30s', role: '店員', circle: 'campus', scenarios: ['worstdate'], note: '「白い布に赤ワイン。定番だ。炭酸水と、黙って新しいの、どっちがいい?」' },
    { id: 'lydia', name: 'Lydia', age: '40s', role: '店主', circle: 'campus', scenarios: ['worstdate'], note: '「入って、二人とも。顔に出てるわよ」。' },
    { id: 'sasha', name: 'Sasha', age: '20s', role: 'Chloe の友人', circle: 'campus', scenarios: ['worstdate'], note: '「全部話して。0時に寝て起きたら更新ゼロって何」。' },

    // ============ 大学のパーティー ============
    { id: 'brandon', name: 'Brandon', age: '20', role: 'Tyler の友人', circle: 'campus', scenarios: ['party'], note: '「9時前に来る奴はいない」。' },
    { id: 'kenji', name: 'Kenji', age: '20', role: '留学生', circle: 'campus', scenarios: ['party', 'talent-show'], note: '「こんばんは! 早すぎましたか? 日本では時間通りが」。時間感覚の翻訳が最初の壁。', topics: ['language', 'culture'] },
    { id: 'rosa', name: 'Rosa', age: '20', role: '準備のいい友人', circle: 'campus', scenarios: ['party'], note: '水とアドビルを持って着く。翌朝を知っている。' },
    { id: 'derek', name: 'Derek', age: '20', role: 'DJ担当', circle: 'campus', scenarios: ['party', 'talent-show'], note: '「な? DJが分かってるとこうなる」。' },
    { id: 'zoe', name: 'Zoe', age: '20', role: '来客', circle: 'campus', scenarios: ['party'], note: '「このアパート超かわいい」。' },
    { id: 'alyssa', name: 'Alyssa', age: '20', role: '来客', circle: 'campus', scenarios: ['party'], note: '「それ手作りのワカモレ?」。' },
    { id: 'professor-hayes', name: 'Professor Hayes', age: '50s', role: '下の階の住人', circle: 'campus', scenarios: ['party'], note: '「絶対に違う。今は11時半で――」。パーティーの終わりを決める人。' },

    // ============ 職場 ============
    { id: 'mom', name: 'Mom (Maya\'s mother)', age: '50s', role: 'Maya の母', circle: 'vance', scenarios: ['firstweek'], note: '「深呼吸して。面接、完璧だったでしょ」。' },
    { id: 'jen', name: 'Jen', age: '30s', role: '職場の先輩', circle: 'vance', scenarios: ['firstweek'], note: '「新しく入った人ね」。' },
    { id: 'brad', name: 'Brad', age: '40s', role: '上司', circle: 'vance', scenarios: ['firstweek'], note: '「マヤ、ようこそ」。', topics: ['work', 'management'] },

    // ============ 野球 ============
    { id: 'kai', name: 'Kai', age: '30s', role: '野球ポッドキャストのホスト', circle: 'vance', scenarios: ['mariners'], note: 'Marcus を招いて2001年のマリナーズを語らせる。町の外に出ていく唯一の声。', topics: ['sport', 'nostalgia'] },
];

/**
 * 関係の線。ページの相関図はこれを描く。
 * kind は線の意味で、era は「いつの関係か」(Marcus のように時間差がある人のため)。
 */
export type RelationKind = 'partner' | 'ex' | 'parent' | 'sibling' | 'friend' | 'colleague' | 'neighbour' | 'echo';

export interface Relation {
    from: string;
    to: string;
    kind: RelationKind;
    /** 図に出す一行。なぜこの線があるのか */
    label: string;
    era?: string;
}

export const RELATIONS: Relation[] = [
    // --- 背骨: Marcus の15年 ---
    { from: 'marcus', to: 'maya', kind: 'ex', label: '25歳。彼女の初出社を励ました', era: '25歳' },
    { from: 'marcus', to: 'jess', kind: 'ex', label: '28歳。ゲームナイトを一緒に主催していた', era: '28歳' },
    { from: 'marcus', to: 'jenna', kind: 'partner', label: '30歳。高校で「フットボールに興味はない」と抗議していた相手と家を買う', era: '30歳' },
    { from: 'marcus', to: 'coach-daryl', kind: 'colleague', label: '17歳。最終ドライブを託した監督', era: '17歳' },
    { from: 'marcus', to: 'devon', kind: 'friend', label: '高校からゲームナイトまで11年つるんでいる' },
    { from: 'marcus', to: 'kai', kind: 'colleague', label: '32歳。ポッドキャストに呼ばれて2001年のマリナーズを語る', era: '32歳' },
    { from: 'marcus', to: 'jamal', kind: 'friend', label: '同じ試合に立っていた' },
    { from: 'marcus', to: 'bob', kind: 'colleague', label: '家の地下室を見てもらった' },

    // --- Boyd 家 (BBQ) ---
    { from: 'dave-boyd', to: 'tammy', kind: 'partner', label: 'ブリスケット事件を唯一まだ覚えている夫と、毎年それを鎮火する妻' },
    { from: 'dave-boyd', to: 'tyler', kind: 'parent', label: '父。エプロンを止められる側' },
    { from: 'tammy', to: 'tyler', kind: 'parent', label: '母' },

    // --- Hank 一家 (HOA / キャンプ) ---
    { from: 'hank', to: 'sandra', kind: 'partner', label: '8本ポールのテントと、デジタル断ちの理念' },
    { from: 'hank', to: 'logan', kind: 'parent', label: '電波ゼロで5日を強いられた息子' },
    { from: 'hank', to: 'ruby', kind: 'parent', label: '全部無条件で好きな娘' },
    { from: 'hank', to: 'uncle-dale', kind: 'sibling', label: '「袋を置いて、離れろ」と言える唯一の人間' },
    { from: 'hank', to: 'cheryl', kind: 'neighbour', label: 'クリップボードを置かせて酒を持たせる隣人' },
    { from: 'hank', to: 'dave-boyd', kind: 'neighbour', label: 'グリルは9時まで、と告げに来る' },

    // --- Ken 一家 (日本から) ---
    { from: 'ken', to: 'yuko', kind: 'partner', label: '名乗りと枝豆の実演' },
    { from: 'ken', to: 'sota', kind: 'parent', label: '父' },
    { from: 'yuko', to: 'sota', kind: 'parent', label: '母' },
    { from: 'sota', to: 'brenda', kind: 'neighbour', label: '最初に話しかけた大人' },

    // --- Rick & Carol 一族 (結婚式 / 感謝祭) ---
    { from: 'rick', to: 'carol', kind: 'partner', label: '30クォートのフライヤーと、それを止める人' },
    { from: 'rick', to: 'grandma-lorraine', kind: 'parent', label: '玄関で「それは何なの」と聞かれる息子' },
    { from: 'carol', to: 'chris', kind: 'parent', label: '母' },
    { from: 'rick', to: 'chris', kind: 'parent', label: '父。若い世代からは Uncle Rick' },
    { from: 'chris', to: 'yuki', kind: 'partner', label: '10日間で一族の全員に会わせた' },
    { from: 'chris', to: 'emily', kind: 'sibling', label: '新婦を家族として迎える台詞を担当' },
    { from: 'chris', to: 'tyson', kind: 'friend', label: '自称「プロの悪影響」のベストマン' },
    { from: 'yuki', to: 'priya', kind: 'friend', label: '対応グッズを全部持っているメイド・オブ・オナー' },
    { from: 'yuki', to: 'nana-jo', kind: 'colleague', label: '「この子は逃がすな」— 一族の最終審査' },
    { from: 'rick', to: 'uncle-lou', kind: 'sibling', label: '感謝祭に「勢揃いだな」で入ってくる' },
    { from: 'carol', to: 'aunt-pam', kind: 'sibling', label: '「解体された何ですって?」で新作を却下される' },
    { from: 'grandma-lorraine', to: 'grandpa-stan', kind: 'partner', label: '「寝てない、目を休めてる」の人' },
    { from: 'spencer', to: 'rick', kind: 'parent', label: '食事の前に報告がある甥' },
    { from: 'brianna', to: 'spencer', kind: 'sibling', label: '全部撮っている。家族チャットに上げる' },

    // --- 救急外来 ---
    { from: 'dave-kellerman', to: 'renata', kind: 'partner', label: '「手袋しろって百回言った」' },
    { from: 'dave-kellerman', to: 'nurse-tanya', kind: 'colleague', label: '「入って、座って、手を見せて」' },
    { from: 'nurse-tanya', to: 'dr-osei', kind: 'colleague', label: '同じ夜勤' },
    { from: 'mrs-calloway', to: 'nurse-tanya', kind: 'colleague', label: '同じ病院。12時間勤務の直後に高校の試合へ行く' },

    // --- 学校 ---
    { from: 'ms-reyes', to: 'bailiff-reyes', kind: 'sibling', label: '妹は高校で教え、兄は法廷に立つ' },
    { from: 'ms-reyes', to: 'principal-henderson', kind: 'colleague', label: '中立を宣言し続ける上司' },
    { from: 'ms-reyes', to: 'mr-kowalski', kind: 'colleague', label: 'コーヒーマシンの前でウィッシュボーン隊形を20分' },
    { from: 'coach-daryl', to: 'coach-vega', kind: 'colleague', label: '「ダイ・ハードは控えめに」と言える唯一の人' },
    { from: 'maya', to: 'devon', kind: 'friend', label: '転入生と、解説を付ける男' },
    { from: 'jenna', to: 'tasha', kind: 'friend', label: '抗議する人と、ポンポンを1本も落とさない人' },

    // --- 職場 ---
    { from: 'maya', to: 'mom', kind: 'parent', label: '内定の電話を最初に受けた人' },
    { from: 'maya', to: 'jess', kind: 'friend', label: '「見た目から入れ」と助言した友人' },
    { from: 'maya', to: 'brad', kind: 'colleague', label: '「ようこそ」と言った上司' },
    { from: 'maya', to: 'jen', kind: 'colleague', label: '最初に話しかけてきた先輩' },

    // --- ゲームナイト ---
    { from: 'jess', to: 'priya', kind: 'friend', label: '料理の匂いで大騒ぎされる側' },
    { from: 'jess', to: 'nina', kind: 'friend', label: '「大げさにしたくないって言ったよね」' },
    { from: 'jess', to: 'trent', kind: 'friend', label: '「3日前にグループチャットに送った」' },

    // --- 大学 ---
    { from: 'tyler', to: 'brandon', kind: 'friend', label: '「9時前に来る奴はいない」' },
    { from: 'tyler', to: 'kenji', kind: 'friend', label: '時間通りに来てしまった留学生' },
    { from: 'tyler', to: 'rosa', kind: 'friend', label: '水とアドビルを持ってくる友人' },
    { from: 'tyler', to: 'megan', kind: 'friend', label: '同じ大学。親はグランドキャニオンにいる' },
    { from: 'tyler', to: 'jake', kind: 'friend', label: '人を連れてくる側' },
    { from: 'jake', to: 'chloe', kind: 'ex', label: '初デートでミトコンドリア・イブの話をした' },
    { from: 'jake', to: 'nate', kind: 'friend', label: '「TEDトークかよ」と言われる' },
    { from: 'chloe', to: 'sasha', kind: 'friend', label: '「全部話して。更新ゼロって何」' },
    { from: 'megan', to: 'gary', kind: 'parent', label: 'ビデオ通話で父の手が白いのを見た' },
    { from: 'gary', to: 'linda', kind: 'partner', label: '高所恐怖と、それを1秒で見抜く人' },

    // --- 道 ---
    { from: 'roy', to: 'lori', kind: 'partner', label: '運転手とGPS読み上げ係' },
    { from: 'roy', to: 'walt', kind: 'parent', label: '「わしらの頃は1タンクで行った」' },
    { from: 'roy', to: 'paige', kind: 'parent', label: '私道の喧嘩を実況する娘' },
    { from: 'roy', to: 'sam', kind: 'parent', label: 'バンに Bessie と名付けた子' },
    { from: 'earl', to: 'dot', kind: 'partner', label: '「まだ駐車したばっかりよ」' },
    { from: 'marv', to: 'arlene', kind: 'partner', label: '27回目のクルーズ、45回目の結婚記念日' },
    { from: 'ben', to: 'kayla', kind: 'partner', label: '新婚旅行に日程表を持ってきた夫' },

    // --- 家 ---
    { from: 'greg', to: 'sarah', kind: 'partner', label: '長文の父と、3語で翻訳する母' },
    { from: 'greg', to: 'timmy', kind: 'parent', label: 'ベッドの下の怪物' },
    { from: 'greg', to: 'emma', kind: 'parent', label: '熊の限界を正確に知る姉' },
    { from: 'timmy', to: 'noah', kind: 'friend', label: '忍者刀と寝袋を持参した友達' },

    // --- 遺品 ---
    { from: 'nadia', to: 'dex', kind: 'sibling', label: '3時間運転して来た側と、来なかった側' },
    { from: 'nadia', to: 'cody', kind: 'sibling', label: '「4時に用事がある」' },
    { from: 'margot', to: 'nadia', kind: 'parent', label: '「私の結婚式で泣いてくれたのよ」' },
    { from: 'ray', to: 'margot', kind: 'colleague', label: '値付けの前に敬意を置く鑑定人' },
    { from: 'pearl', to: 'margot', kind: 'neighbour', label: '庭を歩いて来た。招かれていない' },

    // --- こだま(別々のシナリオで同じことを言っている人) ---
    { from: 'grandpa-stan', to: 'vernon', kind: 'echo', label: '感謝祭とDMVで、一字一句同じ主張をしている — 「寝てない。目を休めてるんだ」' },
    { from: 'hank', to: 'donna', kind: 'echo', label: '規則と進行。クリップボードを持つ者どうし' },
    { from: 'devon', to: 'mr-kowalski', kind: 'echo', label: '目の前の出来事に、頼まれてもいない解説を付ける者どうし' },
    { from: 'reggie', to: 'jenna', kind: 'echo', label: '参加率100%の批判者。抗議しながら毎回来る' },
    { from: 'brody', to: 'walter', kind: 'echo', label: '待合室を肯定する男と、待合室の古参' },

    // --- ridgeway-cast の人生に埋めた糸(2026-08-02 配線) ---
    { from: 'gloria', to: 'vernon', kind: 'friend', label: '6番窓口。彼の番号だけ少しゆっくり呼ぶ。手続きが済めば帰らなければならない人だと、知っているからである' },
    { from: 'patrice', to: 'vernon', kind: 'friend', label: '受付の用件的中率92%。彼は外れる8%側の常連 — 用件がない、は4択のどこにも無い' },
    { from: 'dex', to: 'margot', kind: 'friend', label: '原画を黙って渡した甥と、複製と知らずに本物を飾っている叔母。気づいた日、涙の台帳に最大値が記録される' },
    { from: 'lydia', to: 'marco', kind: 'colleague', label: '席次表(縁結びの配置図)と、店員への態度で客を格付けする給仕。この店の二大予言システム' },
    { from: 'captain-lund', to: 'marv', kind: 'friend', label: '初指揮の船の最初の乗客夫妻。引退の日は二人の28回目と同じ航海にすると決めている(本人たちは知らない)' },
    { from: 'andres', to: 'marv', kind: 'colleague', label: '毎晩1語だけ変わる挨拶を、27航海分収集されている給仕。最後の夜に置く1語はもう決めてある' },
    { from: 'brandon', to: 'kenji', kind: 'friend', label: '「9時前に来る奴はいない」と言いながら、7時に来る彼との静かな設営の1時間が一番好き' },
    { from: 'ray', to: 'pearl', kind: 'colleague', label: '鑑定人と、屋敷の生きた索引。品物の由来は彼女に聞けば全部わかる' },
    { from: 'judge-halloran', to: 'trevor', kind: 'colleague', label: '犬の手術を見抜いた上で免除を通した判事と、正直な嘘の男。回顧録「仮に、の30年」に収録予定' },
    { from: 'flo', to: 'rhonda', kind: 'colleague', label: '非公式ナビゲーション係としてコーヒー無料。今日の口出しが4分を切るかが店内の賭けの対象' },

    // --- #23 The Losers' Table で実際に会った線(2026-07-24〜28)。echo が対面したものは kind:'friend' に昇格 ---
    { from: 'grandpa-stan', to: 'vernon', kind: 'friend', label: '第2夜、初対面で「寝てない。目を休めてたんだ」を同時に言った。二人とも笑わなかった', era: '2026-07-25' },
    { from: 'reggie', to: 'jenna', kind: 'friend', label: '第4夜、出席率100%・苦情率100%の同類だと互いに気づいた。17歳から「抗議のもとに」出席している者どうし', era: '2026-07-27' },
    { from: 'walter', to: 'gus', kind: 'friend', label: '第2夜。救急の待合の古参と、F列12番の常連。端の席はスプリングが生きているという情報の出どころ' },
    { from: 'brody', to: 'nurse-tanya', kind: 'colleague', label: '第2夜。待合室を肯定する男と、11時間名前を呼ばれなかった看護師。同じ部屋の両側' },
    { from: 'hank', to: 'bailiff-reyes', kind: 'colleague', label: '第3夜。「この郡で一番短い成文法に1分かからず負けた」と廷吏に支払いを命じた規則係' },
    { from: 'donna', to: 'tommy', kind: 'colleague', label: 'クリップボードを渡した側と、木曜にカウンターから消えた側。理由は「書き込むから」' },
    { from: 'patrice', to: 'ms-reyes', kind: 'friend', label: '第3夜と第5夜。4択に無い客を数えている受付と、その客に理由を聞いた唯一の人間' },
    { from: 'ms-reyes', to: 'vernon', kind: 'friend', label: '第5夜。「なぜDMVに行くのか」を面と向かって聞いた。通い始めて5日で、聞かないでおくことをまだ覚えていなかった' },
    { from: 'flo', to: 'vernon', kind: 'colleague', label: '「あんたは8時間使ったの。そこには違いがあって、あんたはそれをここの誰よりも長く知ってる」' },
    { from: 'dave-boyd', to: 'reggie', kind: 'friend', label: '第4夜。4年目のブリスケットを自分から口に出した男に、町一番の皮肉屋が何も言わなかった' },
    { from: 'cheryl', to: 'devon', kind: 'friend', label: '17歳から知っている。「あなたの仮説で人の夜が良くなったことは一度も無い」' },
    { from: 'wanda', to: 'flo', kind: 'colleague', label: '差し入れのパイと、裁定。卓の秩序はこの二人で持っている' },

    // --- #24 The Night Docket で法廷が繋いだ線(2026-07-29〜08-02) ---
    { from: 'dave-boyd', to: 'hank', kind: 'friend', label: '第1夜。7年執行されてきた「グリルは9時まで」が、条文では最初から10時だったと法廷で判明した。訴えた側は187ドルを受け取らず、紙だけ持って帰った', era: '2026-07-29' },
    { from: 'hank', to: 'judge-halloran', kind: 'colleague', label: '第1夜。「罰金を科していただきたい」と自分から請求し、そんな制度は無いと却下された規則係', era: '2026-07-29' },
    { from: 'mrs-patterson', to: 'bob', kind: 'colleague', label: '第2夜。地下室の下手な補修で亡夫を言い当てた検査士に、彼女が法廷の外の質問をひとつした。答えは階段だった', era: '2026-07-30' },
    { from: 'jenna', to: 'mrs-patterson', kind: 'friend', label: '第2夜。訴訟費用の請求を自分から取り下げた。抗議の女が人生で初めて何かを取り下げた日', era: '2026-07-30' },
    { from: 'margot', to: 'dex', kind: 'friend', label: '第3夜。すり替えの向きが逆だったと法廷で分かった。「私は間違っていました。これから死ぬまで喜び続けるような形で」', era: '2026-07-31' },
    { from: 'pearl', to: 'dex', kind: 'neighbour', label: '3月に「どっちを先に描いたのか」と戸を叩かれた隣人。呼ばれてもいないのに法廷で全部話した', era: '2026-07-31' },
    { from: 'judge-halloran', to: 'donna', kind: 'colleague', label: '第4夜。4ドル99セントのクリップボードを証拠として受け取り、無期限で預かると宣言して返さなかった', era: '2026-08-01' },
    { from: 'judge-halloran', to: 'bailiff-reyes', kind: 'colleague', label: 'そのクリップボードを持った瞬間に傍聴席が9秒で整列した。廷吏は「今夜のどこかで返してほしい」と言い、返ってこない' },
    { from: 'devon', to: 'judge-halloran', kind: 'colleague', label: '第4夜。「聞かれた質問にだけ答えて、我々を何かに喩え始める手前で止まってください」' },
    { from: 'emma', to: 'judge-halloran', kind: 'colleague', label: '第5夜。10歳が判事に「その最後のところを、この部屋で、記録を回したまま言ってください」と要求した', era: '2026-08-02' },
    { from: 'timmy', to: 'bailiff-reyes', kind: 'friend', label: '第5夜。ベッドの下には何もいないと書かれた紙を、判を押して、両手で渡された', era: '2026-08-02' },
    { from: 'vernon', to: 'judge-halloran', kind: 'friend', label: '第5夜。5晩とも最後列にいた理由は「開いてたからだ」。判事は朝8時半に扉が開くと教えた', era: '2026-08-02' },
];

// ============================================================
// エピソード台帳 — 24話。誰がどの話に出て、その話の芯は何か
// ============================================================
/**
 * 名簿(PEOPLE)は「誰がいるか」、CAST は「誰をどれだけ照らすか」、ここは **「どの話か」**。
 * cast はここに書かない。PEOPLE.scenarios から引く(episodeCast)ので、二重管理で腐らない。
 * lead は「その回の看板」だけ。順番は出番順ではなく、覚えてほしい順。
 */
export interface Episode {
    num: number;
    /** requiem の key。PEOPLE.scenarios と同じ文字列 */
    key: string;
    titleEn: string;
    titleJa: string;
    /** 初日(prologueDate と同じ) */
    start: string;
    days: number;
    where: string;
    /** 1〜2行。何が起きる話か */
    premise: string;
    /** この回の芯。1行。ここが無い回は作り直す */
    hinge: string;
    /** 看板。3〜6人 */
    lead: string[];
}

export const EPISODES: Episode[] = [
    { num: 1, key: 'party', titleEn: 'College Party', titleJa: '大学のパーティー', start: '2026-02-05', days: 5, where: '町から2時間の大学、Tyler のアパート',
        premise: '20歳の Tyler が主催する部屋に、時間ぴったりに留学生 Kenji が来てしまう。「9時前に来る奴はいない」から始まり、下の階の教授で終わる5晩。',
        hinge: '最初の壁は語彙ではなく時間感覚である。', lead: ['tyler', 'kenji', 'brandon', 'rosa', 'professor-hayes'] },
    { num: 2, key: 'monster', titleEn: 'Monster Under the Bed', titleJa: 'ベッドの下', start: '2026-02-10', days: 5, where: 'HOA住宅地、Timmy の寝室',
        premise: '6歳の Timmy が両親の外出を全力で阻止する。父は法律文書のように説明し、母が3語に訳す。姉は熊のぬいぐるみにできることとできないことを正確に知っている。',
        hinge: '子どもが本当に交渉しているのは、怪物ではなく親の不在である。', lead: ['timmy', 'greg', 'sarah', 'emma', 'noah'] },
    { num: 3, key: 'mariners', titleEn: 'Mariners Trade Talk', titleJa: '野球談義', start: '2026-02-15', days: 5, where: '町の外、ポッドキャストの収録',
        premise: '32歳の Marcus が呼ばれて、2001年のマリナーズを語る。この町の声が、初めて町の外に出ていく回。',
        hinge: '元英雄が、他人の栄光について喋っているときだけ饒舌になる。', lead: ['kai', 'marcus'] },
    { num: 4, key: 'movie', titleEn: 'First Movie Without Parents', titleJa: '映画館', start: '2026-02-20', days: 5, where: '町の映画館',
        premise: '親なしで初めて映画館に来た12歳の一団と、年齢確認と、F列の常連。Tyler は年齢をごまかし、Marcus は注意する側に回る。',
        hinge: '大人になるとは、注意される側から注意する側へ、静かに移ることである。', lead: ['jayden', 'maddie', 'ava', 'benji', 'gus', 'marcus'] },
    { num: 5, key: 'gamenight', titleEn: 'Game Night Gone Wrong', titleJa: 'ゲームナイト', start: '2026-02-25', days: 5, where: 'Marcus と Jess の家',
        premise: '28歳のゲームナイトが、ルール解釈と3日前のグループチャットで崩れていく。Devon は高校のときと同じ調子で解説を付ける。',
        hinge: '大人の喧嘩はゲームの話をしていない。', lead: ['jess', 'marcus', 'devon', 'trent', 'nina', 'priya'] },
    { num: 6, key: 'antiques', titleEn: 'Antiques House Call', titleJa: '遺品整理', start: '2026-03-02', days: 5, where: '亡くなった祖母の家',
        premise: '鑑定人 Ray が家に来る日、孫たちと叔母が同じ物に別々の値段を付ける。隣の Pearl は招かれてもいないのに庭を歩いて来る。',
        hinge: '値段を付けられるものと、付けた瞬間に壊れるものが同じ部屋にある。', lead: ['ray', 'nadia', 'dex', 'margot', 'pearl', 'cody'] },
    { num: 7, key: 'bucketlist', titleEn: 'Bucket List Trip', titleJa: 'バケットリスト', start: '2026-03-07', days: 5, where: 'グランドキャニオン',
        premise: '定年の夫婦が、夫の高所恐怖を抱えたまま縁に立つ。娘はビデオ通話で立ち会い、父の手が白いのを見る。',
        hinge: '「いつか」を予定に変えた日から、それはただの怖い火曜日になる。', lead: ['gary', 'linda', 'javi', 'earl', 'dot', 'megan'] },
    { num: 8, key: 'bbq', titleEn: 'Neighborhood Barbecue', titleJa: 'ご近所BBQ', start: '2026-03-12', days: 5, where: 'Boyd 家の裏庭',
        premise: '日本から越してきた Ken 一家が、アメリカ郊外のBBQに呼ばれる。グリル戦争、枝豆の実演、9時の門限。',
        hinge: '言語より先に、遊びと食べ方が通じる。', lead: ['dave-boyd', 'tammy', 'ken', 'yuko', 'sota', 'hank'] },
    { num: 9, key: 'blockparty', titleEn: 'Block Party Gone Wrong', titleJa: 'ブロックパーティー', start: '2026-03-17', days: 5, where: '通りを封鎖した数ブロック',
        premise: '朝7時に「予定より遅れている」で始まる一日。Donna がクリップボードを Tommy に渡し、渡した瞬間に町の権力構造が変わる。',
        hinge: '権限は任命ではなく、物の受け渡しで移る。', lead: ['donna', 'tommy', 'reggie', 'marcus', 'bri', 'pastor-jim'] },
    { num: 10, key: 'worstdate', titleEn: 'The Worst First Date', titleJa: '最悪の初デート', start: '2026-03-22', days: 5, where: '町のレストラン',
        premise: '初デートでミトコンドリア・イブの話をする男と、白い布に赤ワイン。店員と店主のほうが二人より先に結末を知っている。',
        hinge: '事故の当事者より、見ていた店員のほうが正確に覚えている。', lead: ['jake', 'chloe', 'marco', 'lydia', 'nate', 'sasha'] },
    { num: 11, key: 'fridaynightlights', titleEn: 'Homecoming Game', titleJa: 'ホームカミング', start: '2026-03-27', days: 5, where: 'リンカーン高校',
        premise: '17歳の Marcus が最終ドライブを背負う夜。転入生 Maya は「ダウンって何?」と聞き、Jenna は「私は抗議のもとにここにいる」と宣言して座っている。',
        hinge: 'この町の15年ぶんの伏線が、全部この金曜の夜に置かれている。', lead: ['marcus', 'coach-daryl', 'jenna', 'ms-reyes', 'maya', 'devon'] },
    { num: 12, key: 'firstweek', titleEn: 'First Week at the New Job', titleJa: '初出社', start: '2026-05-15', days: 5, where: '町の会社',
        premise: '25歳の Maya の最初の1週間。母への電話から始まり、誰も自分が何をやっているか分かっていないと知って終わる。',
        hinge: '新人が最初に覚えるのは仕事ではなく、この場の誰も完璧ではないという事実である。', lead: ['maya', 'mom', 'jess', 'jen', 'brad', 'marcus'] },
    { num: 13, key: 'homeinspection', titleEn: 'Home Inspection', titleJa: '住宅査定', start: '2026-05-20', days: 5, where: '買おうとしている家',
        premise: '30歳の Marcus と Jenna が初めての家を見る。検査士 Bob は地下室から入り、壁の茶色い染みを見つける。売主は「一度だけ」と言う。',
        hinge: '家は嘘をつかない。人が家について嘘をつく。', lead: ['marcus', 'jenna', 'bob', 'karen', 'mrs-patterson'] },
    { num: 14, key: 'thanksgiving', titleEn: 'Thanksgiving Dinner', titleJa: '感謝祭', start: '2026-05-25', days: 5, where: 'Lorraine の家',
        premise: '32年間同じ家で開かれる感謝祭に、30クォートのターキーフライヤーが持ち込まれる。三世代が一部屋に詰まっている。',
        hinge: '受動攻撃の全部の下に、ちゃんと集まる家族がいる。', lead: ['grandma-lorraine', 'rick', 'carol', 'aunt-pam', 'spencer', 'grandpa-stan'] },
    { num: 15, key: 'airport', titleEn: 'Airport Delay', titleJa: '空港', start: '2026-05-30', days: 5, where: 'ゲートB12',
        premise: '遅延、欠航、ゲートで一夜、キャンセル待ち、そして搭乗。26時間で他人9人が一時的な家族になる。',
        hinge: '空港でいちばん落ち着いているのは、一人で搭乗する10歳である。', lead: ['denise-gate', 'reuben', 'hana', 'wendell', 'chad', 'diego'] },
    { num: 16, key: 'emergencyroom', titleEn: 'ER Waiting Room', titleJa: '救急外来', start: '2026-06-04', days: 5, where: 'Tonio General の救急待合室',
        premise: '電動ノコギリで手を切った男と、その妻と、11時間名前を呼ばれない部屋。Brody だけがこの待合室を肯定している。',
        hinge: '待つことの内側に、町でいちばん正直な会話がある。', lead: ['nurse-tanya', 'dave-kellerman', 'renata', 'walter', 'brody', 'dr-osei'] },
    { num: 17, key: 'dmv', titleEn: 'The DMV', titleJa: 'DMV', start: '2026-06-09', days: 5, where: 'DMV支局',
        premise: '「更新だけです、すぐ終わりますよね?」から始まる一日。番号で呼ばれ、書類が足りず、実技試験まで行く。Vernon は開門から座っている。',
        hinge: '町でいちばん時間が失われる建物に、用事もなく毎週来る男がいる。', lead: ['patrice', 'tony', 'vernon', 'kevin', 'gloria', 'mr-okafor'] },
    { num: 18, key: 'juryduty', titleEn: 'Jury Duty', titleJa: '陪審員', start: '2026-06-14', days: 5, where: 'ウェクスフォード郡裁判所',
        premise: '召喚状、予備尋問、審理、評議、評決。Wanda は差し入れを持って「我々は司法の背骨です」と言う。',
        hinge: '逃れたい人と、名誉だと思っている人が、同じ12席に座らされる。', lead: ['judge-halloran', 'bailiff-reyes', 'wanda', 'trevor', 'aisha', 'mei'] },
    { num: 19, key: 'campingtrip', titleEn: 'The Camping Trip', titleJa: 'キャンプ', start: '2026-06-19', days: 5, where: '国立公園のキャンプ場',
        premise: '8本ポールのテントを色分けで説明する父と、電波ゼロで5日を強いられた息子。嵐と熊が順番に来る。',
        hinge: '規則が服を着て歩いている男が、テントに謙虚さを教わる。', lead: ['hank', 'sandra', 'logan', 'ruby', 'uncle-dale', 'ranger-dawn'] },
    { num: 20, key: 'roadtrip', titleEn: 'The Great American Road Trip', titleJa: 'ロードトリップ', start: '2026-06-24', days: 10, where: 'ニュージャージー → カリフォルニア',
        premise: '78歳の祖父が、1968年に陸軍に中断された横断を60年越しに終わらせる。バンの名前は Bessie。ユタの砂漠で本当に息絶える。',
        hinge: '目的地は太平洋ではなく、亡き妻が見たがっていたものである。', lead: ['walt', 'roy', 'lori', 'paige', 'sam', 'rhonda'] },
    { num: 21, key: 'cruise', titleEn: 'The Honeymoon Cruise', titleJa: 'クルーズ', start: '2026-07-04', days: 10, where: 'マイアミ発カリブ海、テーブル12',
        premise: '色分けしたスプレッドシートを持ち込んだ新婚の夫と、それを海に投げたい妻。10晩を他人と囲む指定席が家族になる。',
        hinge: '同じ席に10晩座らされることでしか起きないものがある。', lead: ['ben', 'kayla', 'marv', 'arlene', 'cheryl', 'julian'] },
    { num: 22, key: 'wedding', titleEn: 'The Wedding Weekend', titleJa: '結婚式', start: '2026-07-14', days: 10, where: '一族が集まる10日間',
        premise: '日本から来たプラスワンが、知り合いゼロの結婚式を10日間生き抜く。到着、リハーサル、席次表、誓い、乾杯、二日酔いのお別れブランチ。',
        hinge: '初日は他人だった家族が、最終日には自分の家族になっている。', lead: ['yuki', 'chris', 'emily', 'carol', 'priya', 'nana-jo'] },
    { num: 23, key: 'losers-table', titleEn: "The Losers' Table", titleJa: 'ルーザーズ・テーブル', start: '2026-07-24', days: 5, where: 'Flo のダイナー、奥のボックス席',
        premise: '席は6つ、掟はひとつ。その週に失ったものを言い、一番損していない者が全員分払う。7月最終週だけ5晩続けて開いた。',
        hinge: '**融合の1本目。** 新キャラ0人。一度も同じ部屋にいなかった21人を、同じ卓に座らせただけ。', lead: ['flo', 'vernon', 'ms-reyes', 'reggie', 'wanda', 'grandpa-stan'] },
    { num: 24, key: 'night-docket', titleEn: 'The Night Docket', titleJa: 'ナイト・ドケット', start: '2026-07-29', days: 5, where: 'ウェクスフォード郡裁判所、夜7時',
        premise: '郡が少額裁判の夜間法廷を5晩開く。ブリスケット、地下室の染み、すり替えられた絵、4ドル99セントのクリップボード、そしてクレヨンで書かれた訴状。',
        hinge: '**融合の2本目。** 卓が「自分が失ったもの」を言う部屋なら、法廷は「持っていった奴の名前」を言う部屋である。5件とも、誰も金を受け取らない。', lead: ['judge-halloran', 'bailiff-reyes', 'dave-boyd', 'hank', 'margot', 'emma'] },
    { num: 25, key: 'talent-show', titleEn: 'The Talent Show', titleJa: 'タレントショー', start: '2026-08-03', days: 5, where: 'リンカーン高校の体育館、入場料5ドル',
        premise: 'バンドのバスが止まり「修理代4,200ドル」と言われ、町のタレントショーが5晩開く。栄光のためのトランペット、ホットドッグ12本、ダイ・ハード独白、1987年からの苦情、ラジオ体操、判こ付きの紙。バスは炭酸水1缶で直っていた。',
        hinge: '**融合の3本目。** 卓が「失ったもの」、法廷が「取った奴の名前」なら、舞台は「自分にできること」を見せる部屋である。誰にも才能が無く、それでも町は5晩来た。トロフィーは苦情の男に渡る。', lead: ['julian', 'judge-halloran', 'ray', 'gus', 'reggie', 'paige'] },
];

/** その回に出る住人。EPISODES に cast を書かず、名簿から引く(二重管理をしない) */
export function episodeCast(key: string): WorldPerson[] {
    return PEOPLE.filter((p) => p.scenarios.includes(key));
}

/** その人が出た回。放送順(num)で返す */
export function episodesOf(personId: string): Episode[] {
    const p = getPerson(personId);
    if (!p) return [];
    return EPISODES.filter((e) => p.scenarios.includes(e.key)).sort((a, b) => a.num - b.num);
}

export function getEpisode(key: string): Episode | undefined {
    return EPISODES.find((e) => e.key === key);
}

/** Marcus の15年。ページの上部に置く、この町の背骨 */
export const MARCUS_TIMELINE = [
    { age: 17, scenario: 'fridaynightlights', title: 'ホームカミングの最終ドライブ', note: '「第4クォーター。3点差。これがそのドライブだ」' },
    { age: 19, scenario: 'movie', title: '映画館で年下に注意する側になる', note: '「まあ、静かにしろよ」' },
    { age: 25, scenario: 'firstweek', title: 'Maya の初出社を励ます', note: '「誰も自分が何やってるか分かってない」' },
    { age: 28, scenario: 'gamenight', title: 'Jess とゲームナイトを主催', note: '「うん。そうだな。リラックスな」' },
    { age: 30, scenario: 'homeinspection', title: 'Jenna と家を買う', note: '「壁のあの茶色い染み、あれは何ですか」' },
    { age: 31, scenario: 'blockparty', title: 'ブロックパーティーに新参として立つ', note: '「あの、おはようございます。えっと」' },
    { age: 31, scenario: 'losers-table', title: '申込用紙の行について、勝った議論に負ける', note: '「同意してくれて、謝ってくれて、俺の名前をもう1行下げた」' },
    { age: 31, scenario: 'night-docket', title: '売主を訴える法廷で、喋っているのは Jenna', note: '「だいたいそうです、裁判長。今のところ、うまくいってます」' },
    { age: 32, scenario: 'mariners', title: 'ポッドキャストで2001年を語る', note: '「ブーン、オルルド、DHにエドガー。あの打線は厚かった」' },
];

/** name のゆれ・同名の裁定。ここに書いていない同名は同一人物とみなす */
export const COLLISIONS = [
    { name: 'Marcus', ruling: '同一人物(Marcus Vance)。7シナリオを15年の時間差として扱う。17歳のQB → 25歳 → 28歳 → 30歳で Jenna と家を買う。' },
    { name: 'Dave', ruling: '別人。BBQは Dave Boyd(Tammy の夫)、救急外来は Dave Kellerman(Renata の夫)。妻が違うので統合不可。' },
    { name: 'Denise', ruling: '別人。結婚式はウェディングプランナー、空港はゲート係。職業が両立しないので分ける。' },
    { name: 'Reyes', ruling: '兄妹。Ms. Reyes(高校の英語教師) と Bailiff Reyes(廷吏)。' },
    { name: 'Tyler', ruling: '同一人物(Tyler Boyd)。BBQ 15歳 → 映画館 17歳 → 大学 20歳。' },
    { name: 'Carol / Rick', ruling: '同一人物。結婚式の Uncle Rick と感謝祭の Rick は同じ。Carol はその妻で Chris の母。' },
    { name: 'Cheryl / Brenda / Hank / Kayla / Priya / Devon / Jess / Maya / Jenna / Jake / Megan', ruling: '同一人物。別の日を見ているだけ。' },
];

export const ROSTER_STATUS = {
    total: PEOPLE.length,
    cap: 150,
    get remaining() { return 150 - PEOPLE.length; },
    frozen: true,
    note: '147人。残り3枠。埋めたら凍結。新しい話は「新しい人」ではなく「既にいる人の別の日」で書く。'
        + '#23 The Losers\' Table がその第1号 — 新キャラ0人、既存21人を5晩に分けて同じ卓に座らせただけ。'
        + '#24 The Night Docket が第2号 — こちらも新キャラ0人、既存31人を原告と被告に振り分けた。'
        + '#25 The Talent Show が第3号 — 新キャラ0人、既存37人を演目と審査席と客席に振り分けた。'
        + '2本以上に出ている人は15人 → 31人 → 49人 → 74人。全25話の台帳は EPISODES にある。',
};

export function getPerson(id: string): WorldPerson | undefined {
    return PEOPLE.find((p) => p.id === id);
}

export function peopleIn(scenario: string): WorldPerson[] {
    return PEOPLE.filter((p) => p.scenarios.includes(scenario));
}

/** 2本以上のシナリオに出ている人 = 交差に使える素材 */
export function peopleAcross(min = 2): WorldPerson[] {
    return PEOPLE.filter((p) => p.scenarios.length >= min)
        .sort((a, b) => b.scenarios.length - a.scenarios.length);
}

/** 新聞の VOICES に呼べる人を話題から引く */
export function voicesCandidates(topic: string): WorldPerson[] {
    return PEOPLE.filter((p) => p.topics?.some((t) => t.includes(topic) || topic.includes(t)));
}
