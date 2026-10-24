/**
 * Customer Reading Signs - Silent Bartender observational catalog.
 * Eighteen tells the apprentice learns to read in silence, each bound
 * to one of nine customer states. Cues are physical, falsifiable, and
 * paired with a false-positive note so the reader never grows certain
 * too early. Ordered by ascending unlock night.
 */

export interface CustomerReadingSign {
    id: string;
    whatSignals:
        | 'tired'
        | 'lying'
        | 'grieving'
        | 'happy'
        | 'angry'
        | 'trying-to-leave'
        | 'wanting-to-talk'
        | 'performing'
        | 'scared';
    physicalCue: string;
    falsePositive: string;
    apprenticesLearning: string;
    unlockAfterNights: number;
}

export const CUSTOMER_READING_SIGNS: CustomerReadingSign[] = [
    {
        id: 'read-shoulders-dropped',
        whatSignals: 'tired',
        physicalCue: '肩の位置が、カウンターの水平よりも、指一本ぶん下がっている。座った瞬間ではなく、三分ほど経ってから落ちる。',
        falsePositive: '疲れているのか、ただ肩が凝っているだけなのか、一見では見分けられない。',
        apprenticesLearning: '権藤さんが「今日はおしぼり熱めに」と言った客が、まさにその肩だった夜に覚えた。',
        unlockAfterNights: 5,
    },
    {
        id: 'read-glass-supported',
        whatSignals: 'wanting-to-talk',
        physicalCue: 'グラスの持ち方が、握るのではなく、下から支える形に変わる。指先がガラスに触れたまま離れない。',
        falsePositive: 'ただ手が冷たくて温めているだけのこともある。冬場は特に当てにならない。',
        apprenticesLearning: '一度、黙って下げてしまった客を翌週まで後悔した夜に、この形を覚えた。',
        unlockAfterNights: 10,
    },
    {
        id: 'read-laugh-half-beat-late',
        whatSignals: 'performing',
        physicalCue: '笑い声が、相手の話の句点より半拍遅れる。笑う前に一度、息を吸い直す音が混じる。',
        falsePositive: '単純に話を聞き取れていない、耳が遠い客の可能性もある。',
        apprenticesLearning: '同伴の相手が先に帰ったあと、急に笑わなくなった客を見て、逆算して気づいた。',
        unlockAfterNights: 15,
    },
    {
        id: 'read-focus-third-sip',
        whatSignals: 'tired',
        physicalCue: '目の焦点が合うまで、一杯目が残り三分の一になるまでかかる。それまで品書きの同じ行を往復している。',
        falsePositive: '老眼で小さい字が読めないだけ、ということも多い。',
        apprenticesLearning: '「疲れた顔」を読み違えた夜、権藤さんが「顔じゃねえ、目だ」と一言だけ言った。',
        unlockAfterNights: 20,
    },
    {
        id: 'read-story-detail-overload',
        whatSignals: 'lying',
        physicalCue: '話の中で、聞かれてもいない時刻・場所・人数を立て続けに添える。特に「正確な数字」が三つ以上続く。',
        falsePositive: '記憶力が良くて几帳面な客は、素のままでこう話す。',
        apprenticesLearning: '裏取りができた客の話と、そうでない客の話を並べて聞き比べた二十夜で、違いが見えた。',
        unlockAfterNights: 30,
    },
    {
        id: 'read-coat-never-off',
        whatSignals: 'trying-to-leave',
        physicalCue: '上着を脱がない。座っても袖を通したまま、片肘だけカウンターに置く。',
        falsePositive: '店内が寒い、ただそれだけの夜もある。',
        apprenticesLearning: 'この姿勢の客に二杯目を勧めて断られた夜、「最初から帰る人だった」と気づいた。',
        unlockAfterNights: 40,
    },
    {
        id: 'read-smile-reaches-eyes',
        whatSignals: 'happy',
        physicalCue: '笑ったとき、頬の筋肉より先に目尻の皺が動く。口だけで笑うのではなく、まばたきの回数が減る。',
        falsePositive: '酔いが回っているだけで、目尻が緩んで見えることがある。',
        apprenticesLearning: '嬉しいふりを見抜けなかった客と、本物の客を連続で見た週に、差がはっきりした。',
        unlockAfterNights: 50,
    },
    {
        id: 'read-napkin-folded-tight',
        whatSignals: 'angry',
        physicalCue: '紙おしぼりの袋を、細く細く折り続ける。話の声は穏やかでも、指だけが止まらない。',
        falsePositive: '手持ち無沙汰なだけの客も、同じ動きをすることがある。',
        apprenticesLearning: '穏やかに話していた客が最後に伝票を叩いた夜、折り畳まれた袋の長さに気づいた。',
        unlockAfterNights: 65,
    },
    {
        id: 'read-seat-chosen-corner',
        whatSignals: 'grieving',
        physicalCue: '空いている席の中で、一番壁に近い角を選ぶ。背中を二方向から守れる席にだけ座る。',
        falsePositive: 'もともと人見知りで、いつもその席に座る常連もいる。',
        apprenticesLearning: '喪服ではない喪中の客を二度見送ったあと、座る席の選び方に共通点があると気づいた。',
        unlockAfterNights: 85,
    },
    {
        id: 'read-first-order-too-fast',
        whatSignals: 'performing',
        physicalCue: '品書きを見ずに、座った三秒以内に注文する。それも、この店にない銘柄を一度口にしてから言い直す。',
        falsePositive: 'ただの常連で、本当に決めている客も同じ速さで注文する。',
        apprenticesLearning: '別の店の癖を持ち込んでいる客を、権藤さんが静かに見送った夜に学んだ。',
        unlockAfterNights: 105,
    },
    {
        id: 'read-breath-held-before-answer',
        whatSignals: 'lying',
        physicalCue: '当たり障りのない質問に答える前、息を一拍止める。言葉が出た瞬間に、その息をまとめて吐く。',
        falsePositive: '考える癖のある客も、同じように息を止めてから話し始める。',
        apprenticesLearning: '嘘と思った客が本当のことを言っていた一夜で、この癖は判断材料ではないと知った。',
        unlockAfterNights: 130,
    },
    {
        id: 'read-glass-emptied-but-stays',
        whatSignals: 'wanting-to-talk',
        physicalCue: 'グラスが空になっても、氷だけを回し続ける。お代わりを頼まないのに席を立たない時間が十分を超える。',
        falsePositive: '支払いのタイミングを計りかねているだけの客もいる。',
        apprenticesLearning: '黙って次を出したら「それ、頼んでない」と言われた夜と、出さずに後悔した夜の差で覚えた。',
        unlockAfterNights: 160,
    },
    {
        id: 'read-check-exits-twice',
        whatSignals: 'scared',
        physicalCue: '座ってから最初の十分で、出入口の方を二度以上確認する。二度目は、音もしていないのに振り向く。',
        falsePositive: '連れを待っているだけ、ということも珍しくない。',
        apprenticesLearning: '翌日に警察が来た客の最初の夜、確認の回数が多かったことを後から思い出した。',
        unlockAfterNights: 200,
    },
    {
        id: 'read-pays-exact-change',
        whatSignals: 'trying-to-leave',
        physicalCue: '会計前から、財布ではなくポケットに小銭を準備している。一円単位で端数まで揃っている。',
        falsePositive: '几帳面な性格の客は、来店時から毎回そうしている。',
        apprenticesLearning: '「今夜で最後」と告げた常連が、いつもと違って小銭で払った夜に、その意味に気づいた。',
        unlockAfterNights: 250,
    },
    {
        id: 'read-voice-half-tone-higher',
        whatSignals: 'happy',
        physicalCue: '普段の話し声より、半音だけ高い位置で言葉が出る。笑っていなくても、語尾が上がる。',
        falsePositive: '風邪の引き始めや、喉の乾きでも声は上がる。',
        apprenticesLearning: '孫が生まれたと後日聞いた客の、その前の週の声を思い出して、一人で答え合わせをした。',
        unlockAfterNights: 300,
    },
    {
        id: 'read-chopsticks-untouched',
        whatSignals: 'grieving',
        physicalCue: '突き出しに箸をつけない。割りもせず、揃えたまま器の縁に置いたまま一時間が過ぎる。',
        falsePositive: 'その日の献立が本当に口に合わないだけ、という場合もある。',
        apprenticesLearning: '同じ客の、同じ箸の置き方を二度見た月に、それが季節の問題ではないと気づいた。',
        unlockAfterNights: 380,
    },
    {
        id: 'read-jaw-set-between-sips',
        whatSignals: 'angry',
        physicalCue: '一口飲むごとに、奥歯を噛みしめる音が微かに鳴る。顎の輪郭が、飲むたびに一瞬だけ張る。',
        falsePositive: '歯の治療中で、単純に片側で飲んでいるだけのこともある。',
        apprenticesLearning: '静かな客ほど怖いと権藤さんに言われた夜、その音を初めて「聞こえる」ようになった。',
        unlockAfterNights: 480,
    },
    {
        id: 'read-pulse-at-collar',
        whatSignals: 'scared',
        physicalCue: '首筋、鎖骨のすぐ上の脈が、襟の線に合わせて見えるほど打つ。話の内容とは関係なく、速い。',
        falsePositive: '店に駆け込んできた直後や、階段を上がってきた直後は、誰でもこうなる。',
        apprenticesLearning: '命の話を一言もしなかった客を翌朝のニュースで知った夜、襟元だけは覚えていた。',
        unlockAfterNights: 600,
    },
];

export function getKnownReadings(totalNights: number): CustomerReadingSign[] {
    return CUSTOMER_READING_SIGNS.filter(
        (sign) => sign.unlockAfterNights <= totalNights,
    );
}
