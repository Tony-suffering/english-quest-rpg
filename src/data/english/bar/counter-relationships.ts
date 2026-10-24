/**
 * Counter Relationships — hidden links between pairs of regulars.
 * The apprentice notices these threads over many nights at the counter.
 * None are ever confirmed by the customers themselves; only suspected.
 * Unlocked gradually by night count, from 20 up to 500.
 */

export interface CounterRelationship {
    id: string;
    partyA: string;
    partyB: string;
    surfaceBehavior: string;
    hiddenLink: string;
    evidence: string;
    unlockAfterNights: number;
}

export const COUNTER_RELATIONSHIPS: CounterRelationship[] = [
    {
        id: "rel-fountain-pen-and-mourning",
        partyA: "万年筆の男",
        partyB: "喪服の女",
        surfaceBehavior: "二人は決して目を合わせない。座る席も、いつも対角線上に離れている。",
        hiddenLink: "かつて籍を入れていた夫婦ではないか。離婚届に判を押した日のことを、二人とも言葉にしない。",
        evidence: "女が注文を書き付けた筆跡と、男がつけた伝票の筆跡が、同じ癖で「ノ」が撥ねている。",
        unlockAfterNights: 20,
    },
    {
        id: "rel-salaryman-and-college-girl",
        partyA: "灰色のスーツの男",
        partyB: "分厚い文庫本の女子学生",
        surfaceBehavior: "男は娘と同じ年頃の学生に一度も話しかけない。学生も、男がいる日は席を一つ空ける。",
        hiddenLink: "疎遠になった父と娘。互いに気付いているが、名乗り出る勇気がどちらにもない。",
        evidence: "男が会計のとき財布から落とした写真の中の少女が、いま目の前で文庫を閉じた顔と同じだった。",
        unlockAfterNights: 35,
    },
    {
        id: "rel-two-suits-split",
        partyA: "紺のスーツの紳士",
        partyB: "革ジャンの無精髭",
        surfaceBehavior: "隣同士になっても一言も交わさない。会計は必ず別々に頼み、先に立ったほうが相手を見ずに出ていく。",
        hiddenLink: "二十年前に一緒に小さな会社を興し、金のことで袂を分かった共同経営者だったのではないか。",
        evidence: "二人とも、胸ポケットに同じ古いロゴの入った万年筆を差したままにしている。",
        unlockAfterNights: 50,
    },
    {
        id: "rel-perfume-and-scarf",
        partyA: "白い襟のブラウスの女",
        partyB: "深緑のマフラーの男",
        surfaceBehavior: "雨の夜、二人が同時に来店するとどちらかが早々にグラスを空けて席を立つ。",
        hiddenLink: "かつて関係のあった男女。切り出したのがどちらだったかは、もう本人たちにも曖昧だろう。",
        evidence: "女がつけている香水と、男のマフラーに残った香りが、同じ甘い花の系統だった。",
        unlockAfterNights: 80,
    },
    {
        id: "rel-silent-siblings",
        partyA: "黒縁眼鏡の痩せた男",
        partyB: "赤いピアスの女",
        surfaceBehavior: "顔立ちはどこか似ているのに、会話どころか会釈もしない。注文の声のトーンが妙に揃う。",
        hiddenLink: "もう何年も口をきいていない実の兄妹。母の葬儀以来、互いの番号を着信拒否にしたままなのだろう。",
        evidence: "二人が同じ日に注文した煮物を、同じ順番で——先に大根、次に人参——口へ運んだ。",
        unlockAfterNights: 120,
    },
    {
        id: "rel-teacher-and-student",
        partyA: "白髪の痩身の老人",
        partyB: "くたびれたジャケットの中年",
        surfaceBehavior: "老人が来るとき、中年の男は決まって俯き、早口で会計を済ませて帰っていく。",
        hiddenLink: "かつての師弟。若き日の中年が、老人の研究を無断で自分の名で発表したのではないか。",
        evidence: "老人が古い学会誌を捲ったとき、中年の肩が、聞こえるはずのないページの音に一瞬跳ねた。",
        unlockAfterNights: 170,
    },
    {
        id: "rel-bought-out-rival",
        partyA: "仕立てのいい紳士",
        partyB: "くすんだ前掛けの職人",
        surfaceBehavior: "紳士は職人にだけは決して乾杯を差し出さない。職人は紳士がいる晩、酒量が倍になる。",
        hiddenLink: "同じ町内で同じ商売をしていた商売敵。紳士の家が職人の店を地上げ同然に買い取ったのだろう。",
        evidence: "職人の前掛けの裾に、もう存在しないはずの屋号の刺繍がかすかに残っていた。",
        unlockAfterNights: 220,
    },
    {
        id: "rel-unwritten-loan",
        partyA: "いつも札で払う男",
        partyB: "端数まできっちり小銭で払う男",
        surfaceBehavior: "札の男は小銭の男に時折グラスを奢ろうとするが、小銭の男は無言で首を振って断る。",
        hiddenLink: "書類を交わさずに大金を貸した側と、返すあてのないまま借りた側。証文がない分、二人とも口を閉ざしている。",
        evidence: "札の男が何気なく呟いた金額と、小銭の男が伝票をじっと見つめる秒数が、きっかり同じだった。",
        unlockAfterNights: 300,
    },
    {
        id: "rel-unspoken-first-love",
        partyA: "銀髪に結い上げた婦人",
        partyB: "背筋の伸びた白髪の紳士",
        surfaceBehavior: "二人は一度もこちらを向いて話さない。それでも婦人が先に店を出ると、紳士のグラスが少しだけ傾く。",
        hiddenLink: "六十年前、言い出せないまま別々の道を行った初恋の相手同士。いまさら口にできる言葉は、もうないのだろう。",
        evidence: "店のラジオが昭和の古い流行歌を流した瞬間、婦人が小さく口ずさみ、紳士の指が卓上で止まった。",
        unlockAfterNights: 400,
    },
    {
        id: "rel-half-siblings-unknown",
        partyA: "左手薬指にだけ指輪をしない女",
        partyB: "右手の薬指に古い指輪を嵌めた男",
        surfaceBehavior: "互いにまったくの他人として振る舞い、挨拶も会釈もない。不思議と同じ銘柄の煙草を吸う。",
        hiddenLink: "父を同じくする異母兄妹。本人たちは互いの存在すら知らないまま、同じカウンターに並んでいる。",
        evidence: "二人の指輪はデザインが対になっており、父と思しき男の形見を分けた片割れにしか見えなかった。",
        unlockAfterNights: 500,
    },
];

export function getUnlockedRelationships(totalNights: number): CounterRelationship[] {
    return COUNTER_RELATIONSHIPS.filter((rel) => rel.unlockAfterNights <= totalNights);
}
