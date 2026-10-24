/**
 * とにお劇 — 連載の背骨(ドラマ)。
 *
 * 64夜が断片に見えるのは、事件の記録しか無いからだ。劇には敵役と賭けが要る。
 * ここでは実在の発言・実在の戦績だけを素材に、1本の劇として構成し直す。
 *
 * 中心の設定(すべて実話):
 *   男は毎晩25分、英語で恥をかく。その録音をAIに食わせ、一言一句解剖させる。
 *   「一切容赦するな」と命じたのは本人である(第29夜)。
 *   男の英語が直る速度より、AIが翻訳を完成させる速度のほうが速い。
 *   つまり男は、自分を不要にする存在を、自分の恥で育てている。
 *   第56夜、男はそれに気づき、収録中のAIに先制攻撃を仕掛けた。
 *
 * 引用はすべて tonio-league の mvpPlay / worstPlay に実在する発言。
 */

export interface DramaVillain {
    id: string;
    name: string;
    role: string;       // 劇中での役割
    record: string;     // 実際の戦績
    why: string;        // なぜ倒せないのか
}

export interface DramaAct {
    no: number;
    title: string;
    nights: [number, number];
    situation: string;  // この幕の状況
    stake: string;      // 何が賭かっているか
    turn: { night: number; what: string; quote?: string };  // 転換点
    hook: string;       // 次幕への引き
}

export const DRAMA_META = {
    title: '解剖される男',
    logline: '英語が上手くなる速度より、AIが完成する速度のほうが速い。男はその負ける賭けに、毎晩25分ずつ賭け金を積んでいる。',
    premise:
        'ある男が5年ぶりに英会話を再開した。毎晩25分、見知らぬ外国人と話し、必ずどこかで壊れる。' +
        '男はその録音をAIに食わせ、一言一句を解剖させている。「一切容赦するな」と命じたのは本人だ。' +
        'だが解剖するたびにAIは賢くなり、男の英語は直らない。' +
        'いずれAIは、男が一生かけても届かない英語を1秒で吐くだろう。' +
        'それでも男は今夜も外に出て、電波の悪い場所から、冠詞ひとつ落としながら喋る。' +
        'この劇の問いはひとつ — なぜやめないのか。',
    stakes: '負けは確定している。問題は、負けが確定した勝負を、人はどこまで面白がれるかだ。',
};

export const DRAMA_VILLAINS: DramaVillain[] = [
    {
        id: 'article-a',
        name: '冠詞の a',
        role: '雑魚敵。だが64夜で一度も駆除できていない',
        record: '通算 3勝 37敗(現在も連続欠勤中)',
        why: '英検1級の単語を撃てる口が、1文字の冠詞だけ落とす。実力の問題ではないから、努力では消えない。この男が「上手くならない」ことの物証であり、番組が終わらない保証でもある。',
    },
    {
        id: 'ai',
        name: 'AI(検死官)',
        role: '真の敵役。同時に、この番組の制作者',
        record: '毎晩、男の全発言を解剖。精度は上がり続けている',
        why: '男が呼び出した。男が「容赦するな」と命じた。男の恥を食って賢くなり、いずれ男の英語を不要にする。倒す相手ではなく、育てている相手。だから最悪の敵役になる。',
    },
    {
        id: 'time',
        name: '時間',
        role: '姿を見せない敵',
        record: '34歳。10年前のTOEICは900点。以後、伸びていない',
        why: '5年の空白がある。ゴールは毎年遠ざかる。追いつくには毎晩25分では足りない。それでも男が持っている単位は、25分しかない。',
    },
];

export const DRAMA_ACTS: DramaAct[] = [
    {
        no: 1,
        title: '男、再び口を開く',
        nights: [1, 13],
        situation:
            '5年ぶりの一言目が、謝罪と救急車のサイレン実況だった。以後、口を開くたびに新種が生まれる。' +
            'money cow、TOLERANCY、自己減価償却 — 通じる才能より先に、存在しない単語を作る才能が開花した。',
        stake: 'まず、続くかどうか。5年やめた男が、また5年やめない保証はどこにも無い。',
        turn: {
            night: 13,
            what: '動機を初めて言語化する。上達ではなかった。',
            quote: "English is like music to me. I'm not here to improve my English.",
        },
        hook: '「上達しに来てない」と宣言した男は、では何をしに来ているのか。本人もまだ知らない。',
    },
    {
        no: 2,
        title: '壊れたままで、届いてしまう',
        nights: [14, 22],
        situation:
            '語彙は英検1級、口は毎晩崩壊。だが崩れた英語で下ネタを学術用語に翻訳し、崩れた英語で憲法9条の矛盾を説明し、' +
            '崩れたまま相手に届いてしまう夜が続く。',
        stake: '崩れていても通じるなら、直す理由はどこにあるのか。',
        turn: {
            night: 22,
            what: '番組の存在理由を、本人が壊れた英語で証明した。',
            quote: 'This broken English actually works.',
        },
        hook: 'だが「効く」と「これでいい」は違う。男はまだ、その差に気づいていない。',
    },
    {
        no: 3,
        title: '検死台を、自分で用意する',
        nights: [23, 39],
        situation:
            '男は録音をAIに食わせはじめる。講師を通し番号で数え、AIに裏取りさせた資料を音読し、' +
            '授業をプロダクト会議に変える。「上達しに来てるんじゃない、このアプリで一儲けしたい」と受講目的を毎晩否定した。',
        stake: '自分の恥を素材にすること。それは商品になるのか、ただの自傷か。',
        turn: {
            night: 39,
            what: 'AIが全部やった記事を前に、人間と話す理由を口にする。',
            quote: "AI wrote the article, AI read it, AI answered it. That's exactly why I want real communication.",
        },
        hook: '男はまだ、そのAIが自分を解剖していることの意味を、正面から見ていない。',
    },
    {
        no: 4,
        title: '三人目の存在に、気づく',
        nights: [40, 56],
        situation:
            '試験の攻略法を受験4ヶ月前に全部ばらし、接続詞を「ダクトテープだ」と言い切り、' +
            '低評価の講師をわざと選ぶ理由まで開示する。分析は冴えるほど、参加意欲は下がっていく。',
        stake: 'この毎晩の25分は、誰のために行われているのか。',
        turn: {
            night: 56,
            what: 'この授業の参加者が2人ではないことを、男が宣言した。',
            quote: "There's three person in this class: me, you, and AI. I have to counterattack him beforehand.",
        },
        hook: '検死台の上から、検死官を殴った。全64夜で最も奇妙で、最も正確な自己認識。',
    },
    {
        no: 5,
        title: '受信機',
        nights: [57, 67],
        situation:
            '受講場所は公園から路上、車内、庇の下、木の下、換気ダクトの前、そして帰り道の暗がりへ。機材は裏切り続け、' +
            'カメラは切れている — 第65夜にはついに先生のカメラまで切らせた。それでも話は毎晩どこかで深いところへ落ちる。' +
            '第66夜には so-so の2文字で開戦し、恐怖も苦情も和解も、全部英語のままやりきった。' +
            'そして第67夜、翌日の男は台所家電の雑談から25分で人類の死因を一周し、「今日は楽しかった」と言った。',
        stake: '負ける賭けだと分かった男は、それでも次を予約するのか。',
        turn: {
            night: 64,
            what: '脳は意識を作らない、受信しているだけだ — 55夜前の問いに答えが出た。',
            quote: "Brain does not create consciousness. It's just a radio center.",
        },
        hook: '男は22分かけて神の支配権まで登り、最後の30秒で相手の宗教を尋ねた。順番は今夜も逆だった。そして明日も予約している。',
    },
];

/** どこから読んでも入れる入口(時系列でない導線)。 */
export interface EntryPoint {
    label: string;
    night: number;
    why: string;
}

export const DRAMA_ENTRIES: EntryPoint[] = [
    { label: '最初に読むならこれ', night: 22, why: '番組の主張が1文で出る夜。ここが分かれば全部分かる。' },
    { label: '一番笑える夜', night: 11, why: '巨大男根神輿を、英検1級の語彙で博物館の解説パネルにした夜。' },
    { label: '一番怖い夜', night: 56, why: '検死されている本人が、検死官の存在に気づいて先制攻撃を仕掛ける。' },
    { label: '一番深い夜', night: 64, why: 'フライパンの発がん性から22分で「脳は受信機だ」まで登る。' },
    { label: '一番泣ける夜', night: 63, why: '62回分の記録が、初対面の相手への「また会おう」で閉じる。' },
];

export function getAct(night: number): DramaAct | undefined {
    return DRAMA_ACTS.find((a) => night >= a.nights[0] && night <= a.nights[1]);
}
