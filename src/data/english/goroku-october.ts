/**
 * 俺語録カレンダー — 2026年10月から、1日5個。
 *
 * 【材料はどこから来ているか】
 * 本人が実際に打った日本語だけを種にしている。
 * 「臨機応変」「厳選」「踏まえて」「しょぼい」のような語は、
 * **教材から拾ってきた語ではなく、本人の口から出た語**なので、覚える動機が最初からある。
 * 逆に「わかる?」のような、訳しても英語にならない相槌は入れない。
 *
 * 【場面は DMM だけではない】
 * 覚えるのは「本人が使う言葉」であって「レッスンで使う言葉」ではない。
 * 最初の版は use 欄が全部レッスンの場面になっていたが、それだと、
 * **レッスンが無い日は1個も使えない語になってしまう。**
 * 場面は5つに分けた。どれか1つに寄らないよう、月全体の配分を verify が見張る。
 *   dmm       DMMのレッスン中
 *   directing 人やAIに指示を出す時。本人が一番よく喋る場面
 *   writing   note記事、英検の答案、自分の文を読み返す時
 *   job       内装の仕事。現場、業者、客先
 *   daily     ひとりごと、家族、日常
 *
 * 【1日の中身】
 * 5個。1日1テーマに寄せてよい(その場面がまとまっているほうが実際に使える)。
 * ただし月全体では、口の使い方(cat)も場面(scene)も偏らせない。
 *
 * 【note との差】
 * ja は単語ではなく、本人が実際に言う形の1文。単語だけ覚えても口からは出ない。
 */

export type GorokuCat = 'judge' | 'push' | 'hedge' | 'lesson' | 'mood';
export type GorokuScene = 'dmm' | 'directing' | 'writing' | 'job' | 'daily';

export const GOROKU_CATS: { id: GorokuCat; ja: string; en: string; fg: string; bg: string }[] = [
    { id: 'judge', ja: '判定', en: 'JUDGE', fg: '#9A7B16', bg: '#FEF9E7' },
    { id: 'push', ja: '詰め', en: 'PUSH', fg: '#B45309', bg: '#FEF3C7' },
    { id: 'hedge', ja: 'ぼかす', en: 'HEDGE', fg: '#0F766E', bg: '#CCFBF1' },
    { id: 'lesson', ja: 'レッスン', en: 'LESSON', fg: '#1D4ED8', bg: '#DBEAFE' },
    { id: 'mood', ja: '気分', en: 'MOOD', fg: '#9D174D', bg: '#FCE7F3' },
];

/** その語を実際に使う場所。DMMに限らない */
export const GOROKU_SCENES: { id: GorokuScene; ja: string; note: string }[] = [
    { id: 'directing', ja: '指示', note: '人やAIに指示を出す時。本人が一番よく喋る場面' },
    { id: 'writing', ja: '書く', note: 'note記事、英検の答案、自分の文を読み返す時' },
    { id: 'job', ja: '仕事', note: '内装の現場、業者、客先' },
    { id: 'daily', ja: '日常', note: 'ひとりごと、家族、雑談' },
    { id: 'dmm', ja: 'DMM', note: 'レッスン中に撃つ' },
];

export interface GorokuOctEntry {
    /** 覚える核になる日本語。本人が使う語 */
    key: string;
    cat: GorokuCat;
    /** どこで使うか。レッスンとは限らない */
    scene: GorokuScene;
    /** 本人が実際に言う形の1文。核の語を必ず含む */
    ja: string;
    /** ネイティブがそのまま口に出す形 */
    en: string;
    /** なぜその英語か。直訳との差 */
    note: string;
    /** その場面の中の、どの瞬間か */
    use: string;
}

export interface GorokuOctDay {
    day: number;
    theme: string;
    entries: GorokuOctEntry[];
}

/** 2026-10-01 から1日5個 */
export const GOROKU_OCTOBER: GorokuOctDay[] = [
    {
        day: 1, theme: '評価を一言で落とす',
        entries: [
        {
            key: 'しょぼい', cat: 'judge', scene: 'directing',
            ja: 'それ、ちょっとしょぼくない?',
            en: 'That\'s a bit weak, isn\'t it?',
            note: 'cheap は値段、poor は品質。weak は「中身が足りない」で、人ではなく出来に当たる。しょぼいの一番近い温度。',
            use: '俺が出した案が薄い時。1行で突き返せる',
        },
        {
            key: 'いまいち', cat: 'judge', scene: 'writing',
            ja: 'いまいちピンとこないんだよな',
            en: 'It\'s not really clicking for me.',
            note: 'not good だと評価になる。click は「噛み合う」なので、悪いとは言わずに手応えの無さだけを出せる。',
            use: 'note記事を読み返して、書けてはいるが刺さらない時',
        },
        {
            key: '中身ゼロ', cat: 'judge', scene: 'directing',
            ja: '言ってることは中身ゼロだよね',
            en: 'There\'s nothing actually in it.',
            note: 'empty は器の話。nothing in it で「開けたら何も入っていない」。actually が皮肉を1枚足す。',
            use: '抽象語だけの提案を戻す時',
        },
        {
            key: '締まりがいい', cat: 'judge', scene: 'writing',
            ja: 'この言い方、締まりがいいね',
            en: 'That\'s a clean way to end it.',
            note: '締まる = 終わり方が決まる。beautiful ではなく clean。無駄が無いという意味の褒め方。',
            use: '記事や答案の結びが決まった時。人にも自分にも言える',
        },
        {
            key: '当たり前すぎる', cat: 'judge', scene: 'directing',
            ja: 'それは当たり前すぎる',
            en: 'That\'s too obvious to be worth saying.',
            note: 'obvious だけだと事実の指摘。to be worth saying を足して「言う価値が無い」まで運ぶ。',
            use: '勧められた語彙が平凡な時',
        },
        ],
    },
    {
        day: 2, theme: '詰める',
        entries: [
        {
            key: '根拠', cat: 'push', scene: 'directing',
            ja: 'それ、根拠あるの?',
            en: 'What are you basing that on?',
            note: 'Do you have evidence? は詰問。base A on B で「何に乗せて言ってるのか」を聞く形になり、角が立たない。',
            use: 'なぜその語かを出させる時。動詞選びで毎回使う',
        },
        {
            key: '詰めが甘い', cat: 'push', scene: 'directing',
            ja: 'ちょっと詰めが甘いね',
            en: 'You stopped one step short.',
            note: 'sloppy は雑。stopped one step short は「あと一歩で止まった」で、方向は合っていたと認めている。',
            use: '惜しい成果物を戻す時',
        },
        {
            key: '話が早い', cat: 'push', scene: 'job',
            ja: '話が早くて助かる',
            en: 'Good, that saves us a lot of back and forth.',
            note: 'quick では速さの話になる。back and forth(往復)を省けたという言い方が、実際の助かり方に合う。',
            use: '現場で業者と話が通った時',
        },
        {
            key: '腑に落ちない', cat: 'push', scene: 'dmm',
            ja: 'まだ腑に落ちないんだよな',
            en: 'It still doesn\'t quite sit right with me.',
            note: 'understand の否定ではない。sit right = 座りが悪い。理屈はわかったが納得していない状態。',
            use: '直された理由に納得しきれていない時',
        },
        {
            key: '要するに', cat: 'push', scene: 'dmm',
            ja: '要するにこういうこと?',
            en: 'So basically, this is what you are saying?',
            note: 'In short は書き言葉。So basically で相手の話を1回畳んで確認する。会話の主導権が戻る。',
            use: '長い説明のあと',
        },
        ],
    },
    {
        day: 3, theme: '任せる・ぼかす',
        entries: [
        {
            key: 'そっちで決めて', cat: 'hedge', scene: 'directing',
            ja: 'そこはそっちで決めていいよ',
            en: 'Your call on that one.',
            note: 'Up to you より短くて軽い。call は判定という意味。丸投げに聞こえない委任。',
            use: '細部を任せる時',
        },
        {
            key: '臨機応変', cat: 'hedge', scene: 'directing',
            ja: 'そこは臨機応変にやって',
            en: 'Just play it by ear there.',
            note: 'flexible は形容詞で人を評する語。play it by ear は「その場で耳で合わせる」で、行動として言える。',
            use: '型は渡した上で、外れてもいいと伝える時',
        },
        {
            key: 'とりあえず', cat: 'hedge', scene: 'job',
            ja: 'とりあえずこれで行こう',
            en: 'Let\'s just go with this for now.',
            note: 'for now が本体。「今は」と付けるだけで、決定が仮のものになる。',
            use: '仮で決めて現場を進める時',
        },
        {
            key: 'ざっくり', cat: 'hedge', scene: 'directing',
            ja: 'ざっくりでいいよ',
            en: 'Rough is fine.',
            note: 'roughly は副詞なので文が要る。Rough is fine. の3語で、精度を落としていいと伝わる。',
            use: '精度を落としていいと伝える時',
        },
        {
            key: '出たとこ勝負', cat: 'hedge', scene: 'dmm',
            ja: '出たとこ勝負でいい',
            en: 'We\'ll wing it.',
            note: 'wing it = 準備なしでやる。improvise より口語で、開き直りの軽さがある。',
            use: '教材を用意せずにレッスンに入る時',
        },
        ],
    },
    {
        day: 4, theme: 'レッスンが荒れた日',
        entries: [
        {
            key: 'バタバタ', cat: 'lesson', scene: 'dmm',
            ja: 'ちょっとバタバタしてて',
            en: 'Sorry, things got a bit hectic.',
            note: 'busy だと自慢に聞こえる時がある。hectic は自分が振り回された側になる。',
            use: '遅れて入った時',
        },
        {
            key: '追い出された', cat: 'lesson', scene: 'dmm',
            ja: '事務所を追い出されちゃって',
            en: 'I got kicked out of my office.',
            note: 'asked to leave は硬い。kicked out は自嘲で、笑い話として渡せる。',
            use: '第105夜の実話。そのまま使える',
        },
        {
            key: '電波が悪い', cat: 'lesson', scene: 'dmm',
            ja: 'ちょっと電波が悪いかも',
            en: 'My connection\'s a bit shaky.',
            note: 'bad connection でも通じるが、shaky は「揺れている」で、切れる前の状態を正確に指す。',
            use: '音が途切れ始めた時',
        },
        {
            key: '聞こえてる', cat: 'lesson', scene: 'dmm',
            ja: '聞こえてます?',
            en: 'Can you still hear me?',
            note: 'still が効く。「まだ」を入れると、切れかけている自覚が伝わって相手が動きやすい。',
            use: '固まった時',
        },
        {
            key: '巻きで', cat: 'lesson', scene: 'dmm',
            ja: 'ちょっと巻きでお願いします',
            en: 'Could we speed through this a bit?',
            note: 'hurry は焦らせる。speed through は「この部分を早送りで」なので、失礼になりにくい。',
            use: '残り時間が足りない時',
        },
        ],
    },
    {
        day: 5, theme: '気が乗らない',
        entries: [
        {
            key: 'めんどくさい', cat: 'mood', scene: 'daily',
            ja: '正直めんどくさい',
            en: 'Honestly, I cannot be bothered.',
            note: 'lazy は自分を怠け者と決める語。cannot be bothered は「その手間に見合わない」という判断になる。',
            use: 'やる気が出ない日の独り言',
        },
        {
            key: '気が乗らない', cat: 'mood', scene: 'dmm',
            ja: '今日は気が乗らないな',
            en: 'I\'m just not feeling it today.',
            note: 'not motivated は説明的。not feeling it は理由を言わずに済むのが利点。',
            use: '調子が出ない日の入り',
        },
        {
            key: '億劫', cat: 'mood', scene: 'daily',
            ja: '動くのが億劫でさ',
            en: 'I can\'t make myself get up.',
            note: '億劫に対応する1語は無い。make myself で「自分を動かせない」と割ると出る。',
            use: '家から出ていない話',
        },
        {
            key: 'だるい', cat: 'mood', scene: 'dmm',
            ja: 'なんかだるい',
            en: 'I feel kind of sluggish.',
            note: 'tired は眠い。sluggish は動きが鈍い方で、だるいに近い。',
            use: '体調の雑談',
        },
        {
            key: '後回し', cat: 'mood', scene: 'directing',
            ja: 'それは後回しでいい',
            en: 'That can wait.',
            note: 'postpone は手続きの語。That can wait. は判断そのもので、2語で終わる。',
            use: '優先順位を伝える時',
        },
        ],
    },
    {
        day: 6, theme: '切り返す',
        entries: [
        {
            key: 'むしろ', cat: 'push', scene: 'writing',
            ja: 'むしろ逆だと思う',
            en: 'If anything, it is the other way around.',
            note: 'On the contrary は硬い。If anything は「どちらかと言えば」で、否定を柔らかくくるむ。',
            use: '英検の答案で反対側に振る時',
        },
        {
            key: '逆に', cat: 'push', scene: 'daily',
            ja: '逆にそれが良かった',
            en: 'That\'s exactly what made it work.',
            note: 'On the contrary ではない。日本語の「逆に」は転換の合図で、内容は「それこそが」。',
            use: '失敗が結果的に効いた話',
        },
        {
            key: '別に', cat: 'hedge', scene: 'dmm',
            ja: '別にそこまでじゃない',
            en: 'It\'s not that big a deal.',
            note: 'not special ではない。that big a deal で「言うほどのことではない」。謙遜にも突き放しにも使える。',
            use: '褒められた時',
        },
        {
            key: 'とはいえ', cat: 'push', scene: 'writing',
            ja: 'とはいえ限界はあるよ',
            en: 'That said, there\'s a limit.',
            note: 'However は書き言葉。That said は口から出る逆接で、直前を一度認めてから戻す。',
            use: '自分の主張に保険をかける時',
        },
        {
            key: 'どうせ', cat: 'mood', scene: 'daily',
            ja: 'どうせ誰も見ないでしょ',
            en: 'Nobody is going to look at it anyway.',
            note: 'anyway が「どうせ」。文末に置くだけで諦めの色がつく。',
            use: '作ったものを自嘲する時',
        },
        ],
    },
    {
        day: 7, theme: '絞る',
        entries: [
        {
            key: '厳選', cat: 'push', scene: 'directing',
            ja: '厳選して5個にして',
            en: 'Cut it down to the five best.',
            note: 'select carefully は指示として弱い。Cut it down で「削れ」と言い切るのが実際の意味。',
            use: '候補が多すぎる時',
        },
        {
            key: '片っ端から', cat: 'judge', scene: 'job',
            ja: '片っ端から試した',
            en: 'I went through every single one.',
            note: 'one by one は順番の話。every single one は「1つ残らず」で、量の圧が出る。',
            use: '調べ尽くした量を伝える時',
        },
        {
            key: '目星', cat: 'judge', scene: 'job',
            ja: 'だいたい目星はついてる',
            en: 'I\'ve got a pretty good idea which one.',
            note: 'guess ではない。good idea which one で「どれかは絞れている」という中間状態を出せる。',
            use: '原因の当たりがついている時',
        },
        {
            key: '落としどころ', cat: 'push', scene: 'job',
            ja: '落としどころを探そう',
            en: 'Let\'s find something we can both live with.',
            note: 'compromise は譲る側の語。live with は「飲み込める線」で、双方の話になる。',
            use: '客と意見が割れた時',
        },
        {
            key: 'キリがない', cat: 'judge', scene: 'directing',
            ja: 'やり出したらキリがない',
            en: 'Once you start, there\'s no end to it.',
            note: 'endless は形容詞。no end to it のほうが、途中で止める判断の話に持っていける。',
            use: '直しを打ち切る時',
        },
        ],
    },
    {
        day: 8, theme: '説明を切る',
        entries: [
        {
            key: '説明はいい', cat: 'push', scene: 'directing',
            ja: '説明はいいから結論',
            en: 'Skip the setup, just give me the answer.',
            note: 'explanation ではなく setup(前振り)。何が要らないかを正確に指せる。',
            use: '前置きが長い時',
        },
        {
            key: 'ぐだぐだ', cat: 'push', scene: 'directing',
            ja: 'ぐだぐだ言わずにやって',
            en: 'Quit going back and forth and just do it.',
            note: 'ぐだぐだ = 決まらずに往復している状態。going back and forth がそのまま当たる。',
            use: '決断を促す時',
        },
        {
            key: '一言で', cat: 'push', scene: 'directing',
            ja: '一言で言うと?',
            en: 'Give it to me in one line.',
            note: 'In a word は語の話。in one line なら1文で言えと言える。',
            use: '要約を求める時',
        },
        {
            key: '前置き', cat: 'push', scene: 'dmm',
            ja: '前置き長いって',
            en: 'You are taking too long to get to it.',
            note: 'get to it = 本題に着く。長さではなく到着の遅さを指すのが自然。',
            use: '雑談が伸びた時',
        },
        {
            key: 'で、結局', cat: 'push', scene: 'job',
            ja: 'で、結局どうなの?',
            en: 'Okay, so where does that leave us?',
            note: 'So what? は喧嘩になる。where does that leave us なら、同じ催促でも一緒に困っている形になる。',
            use: '話が一周した時',
        },
        ],
    },
    {
        day: 9, theme: '質を測る',
        entries: [
        {
            key: 'そこそこ', cat: 'judge', scene: 'directing',
            ja: 'そこそこ良いと思う',
            en: 'It\'s decent enough.',
            note: 'good では褒めすぎ。decent enough は「合格ではある」の位置で、そこそこにちょうど乗る。',
            use: '悪くはない案への反応',
        },
        {
            key: '割に合わない', cat: 'judge', scene: 'job',
            ja: 'それ、割に合わないよ',
            en: 'It\'s not worth what it takes.',
            note: 'not worth it だけだと価値の話。what it takes を足すと、かかる手間との比較になる。',
            use: '手間の重い仕事を断る時',
        },
        {
            key: '想像以上', cat: 'mood', scene: 'daily',
            ja: '想像以上にきつかった',
            en: 'That was rougher than I had bargained for.',
            note: 'than I expected は平板。bargain for は「見込んで引き受けた」で、覚悟の外だったと言える。',
            use: 'しんどかった経験の話',
        },
        {
            key: '意外と', cat: 'judge', scene: 'directing',
            ja: '意外といけるね',
            en: 'That actually works.',
            note: 'surprisingly は驚きが主役。actually を動詞の前に置くだけで「思ったより」が出る。',
            use: '試してうまくいった時',
        },
        {
            key: '拍子抜け', cat: 'mood', scene: 'daily',
            ja: 'ちょっと拍子抜けした',
            en: 'It was kind of an anticlimax.',
            note: 'disappointed は落胆。anticlimax は「盛り上がったのに何も起きなかった」で、拍子抜けの構造が同じ。',
            use: '身構えていたが何も無かった時',
        },
        ],
    },
    {
        day: 10, theme: '先生に投げる',
        entries: [
        {
            key: '直して', cat: 'lesson', scene: 'dmm',
            ja: '今の、直してもらえます?',
            en: 'Could you fix what I just said?',
            note: 'correct me は硬い。fix what I just said なら、直す対象を文単位で指定できる。',
            use: '言い切った直後に頼む',
        },
        {
            key: '自然', cat: 'lesson', scene: 'dmm',
            ja: 'これって自然に聞こえます?',
            en: 'Does that sound natural to you?',
            note: 'Is this correct? だと正誤の話になる。sound natural なら、正しいが不自然な場合も拾える。',
            use: '自分の言い回しを検品する時',
        },
        {
            key: 'ネイティブなら', cat: 'lesson', scene: 'dmm',
            ja: 'ネイティブならどう言います?',
            en: 'How would you actually say that?',
            note: 'As a native speaker は相手を分類する言い方。actually を入れれば同じ意味が短く出る。',
            use: '言い換えを引き出す時',
        },
        {
            key: '他の言い方', cat: 'lesson', scene: 'dmm',
            ja: '他の言い方だとどうなります?',
            en: 'Is there another way to put it?',
            note: 'paraphrase は学術語。put it が口語の「言い方」。',
            use: '1つの表現に頼りたくない時',
        },
        {
            key: 'きつい', cat: 'lesson', scene: 'dmm',
            ja: 'これってきつく聞こえますか?',
            en: 'Does that come across as harsh?',
            note: 'come across as = 相手にどう届くか。rude ではなく harsh にすると、失礼ではなく強すぎるかを聞ける。',
            use: '強めの意見を出したあと',
        },
        ],
    },
    {
        day: 11, theme: '前提を置く',
        entries: [
        {
            key: '踏まえて', cat: 'push', scene: 'directing',
            ja: 'そこを踏まえて考えて',
            en: 'Keep that in mind and take it from there.',
            note: 'considering は前置詞で、指示にならない。keep in mind + take it from there の2段で「踏まえて進めろ」になる。',
            use: '条件を渡してから任せる時',
        },
        {
            key: '前提が違う', cat: 'push', scene: 'job',
            ja: '前提が違うと思う',
            en: 'I think we are starting from different assumptions.',
            note: 'premise は論文語。starting from で「出発点が違う」と言えば会話に乗る。',
            use: '話が噛み合わない時',
        },
        {
            key: 'そもそも', cat: 'push', scene: 'writing',
            ja: 'そもそもの話だけど',
            en: 'Going back a step, though.',
            note: 'originally は時間の話。go back a step は議論の位置を戻す動きで、そもそもに近い。',
            use: '議論を根本に戻す時',
        },
        {
            key: '一応', cat: 'hedge', scene: 'directing',
            ja: '一応やっておいた',
            en: 'I went ahead and did it, just in case.',
            note: 'just in case が「一応」。went ahead で、頼まれる前に動いたことまで出る。',
            use: '頼まれる前にやっておいた報告',
        },
        {
            key: '念のため', cat: 'hedge', scene: 'job',
            ja: '念のため確認だけど',
            en: 'Just to be sure.',
            note: '3語で終わる。for confirmation のような名詞化をやめるだけで一気に口語になる。',
            use: '確認を挟む時',
        },
        ],
    },
    {
        day: 12, theme: 'やらかす',
        entries: [
        {
            key: 'やらかした', cat: 'mood', scene: 'daily',
            ja: 'またやらかした',
            en: 'I messed it up again.',
            note: 'failed は重い。mess up は日常の失敗で、笑い話にできる範囲に収まる。',
            use: 'ミスの報告',
        },
        {
            key: 'うっかり', cat: 'mood', scene: 'directing',
            ja: 'うっかり消しちゃった',
            en: 'I deleted it by accident.',
            note: 'carelessly は自分を責める副詞。by accident なら事故として置ける。',
            use: 'データを飛ばした話',
        },
        {
            key: '元も子もない', cat: 'judge', scene: 'writing',
            ja: 'それじゃ元も子もない',
            en: 'Then the whole thing was pointless.',
            note: 'meaningless は意味の話。pointless は目的の話で、元も子もないの向きに合う。',
            use: '手段が目的を壊している時',
        },
        {
            key: '見切り発車', cat: 'judge', scene: 'job',
            ja: '見切り発車だった',
            en: 'We started before we were ready.',
            note: '対応する熟語は無い。before we were ready と分解すると、そのまま通じる。',
            use: '準備不足を認める時',
        },
        {
            key: '自業自得', cat: 'mood', scene: 'daily',
            ja: 'まあ自業自得だね',
            en: 'Well, I brought that on myself.',
            note: 'deserve it は他人に言うと刺さる。bring on myself は自分専用にすると angle が優しい。',
            use: '自分のミスを引き受ける時',
        },
        ],
    },
    {
        day: 13, theme: '時間の扱い',
        entries: [
        {
            key: '潮時', cat: 'judge', scene: 'job',
            ja: 'そろそろ潮時かな',
            en: 'Might be about time to call it.',
            note: 'call it = 切り上げる。time to quit だと投げ出しに聞こえるが、call it は判断になる。',
            use: 'やめ時の話',
        },
        {
            key: 'いまさら', cat: 'judge', scene: 'daily',
            ja: 'いまさら遅いよ',
            en: 'It\'s a bit late for that now.',
            note: 'too late は断罪。a bit late にすると、呆れ半分の温度になる。',
            use: '手遅れを指摘する時',
        },
        {
            key: 'せっかく', cat: 'hedge', scene: 'daily',
            ja: 'せっかくだからやろう',
            en: 'We\'re here, so let\'s do it.',
            note: 'せっかく に対応する語は無い。状況(We are here)を先に言えば、同じ気持ちが出る。',
            use: 'ついでに踏み込む時',
        },
        {
            key: 'ついでに', cat: 'push', scene: 'directing',
            ja: 'ついでにこれもやって',
            en: 'While you\'re at it, do this too.',
            note: 'While you are at it が「ついでに」の定型。頼み事を軽くする効果がある。',
            use: '追加を頼む時',
        },
        {
            key: '先延ばし', cat: 'mood', scene: 'daily',
            ja: '先延ばしにしてただけ',
            en: 'I was just putting it off.',
            note: 'procrastinate は硬い。put off が口語で、just を足すと自嘲になる。',
            use: 'やっていない理由',
        },
        ],
    },
    {
        day: 14, theme: '人を評する',
        entries: [
        {
            key: '頼りになる', cat: 'judge', scene: 'dmm',
            ja: 'あの人は頼りになる',
            en: 'You can count on them.',
            note: 'reliable は履歴書の語。count on は実際に頼った経験がある言い方になる。',
            use: '講師を褒める時',
        },
        {
            key: '口だけ', cat: 'judge', scene: 'daily',
            ja: 'あの人は口だけ',
            en: 'They\'re all talk.',
            note: 'all talk で完結する。and no action まで言うと説明的になるので足さない。',
            use: '言うだけの人の話',
        },
        {
            key: '抜け目ない', cat: 'judge', scene: 'job',
            ja: '抜け目ないね',
            en: 'Nothing gets past them.',
            note: 'shrewd は硬く、少し悪い含みがある。Nothing gets past は褒めのまま使える。',
            use: '察しのいい相手の話',
        },
        {
            key: 'マイペース', cat: 'judge', scene: 'daily',
            ja: 'あの人はマイペースだから',
            en: 'They go at their own pace.',
            note: 'my pace は和製英語。at their own pace が正しい形。',
            use: '急かしても無駄な人の話',
        },
        {
            key: '空気読む', cat: 'push', scene: 'daily',
            ja: '空気読んでよ',
            en: 'Read the room.',
            note: '英語にもある表現。日本語の空気を読むとほぼ同じ使い方で、そのまま置き換わる数少ない例。',
            use: '場違いな発言のあと',
        },
        ],
    },
    {
        day: 15, theme: '量と程度',
        entries: [
        {
            key: 'もれなく', cat: 'push', scene: 'directing',
            ja: 'もれなく全部入れて',
            en: 'Every single one, no gaps.',
            note: 'without omission は硬い。no gaps を足すと、抜けを許さない圧が出る。',
            use: '網羅を頼む時',
        },
        {
            key: 'ひたすら', cat: 'mood', scene: 'writing',
            ja: 'ひたすら書いてた',
            en: 'I just kept writing, nonstop.',
            note: 'continuously は説明。kept -ing + nonstop で、単調さまで伝わる。',
            use: '作業量を伝える時',
        },
        {
            key: 'なんとなく', cat: 'hedge', scene: 'dmm',
            ja: 'なんとなくわかる',
            en: 'I sort of get it.',
            note: 'somehow ではない。sort of が「なんとなく」の位置で、わかっていない側にも寄れる。',
            use: '半分だけ理解した時',
        },
        {
            key: 'さすがに', cat: 'push', scene: 'directing',
            ja: 'さすがにそれは無理',
            en: 'Even I can\'t do that.',
            note: 'さすがに は Even 構文で出る。主語を自分にすると、限界の告白になる。',
            use: '要求を断る時',
        },
        {
            key: 'いちいち', cat: 'push', scene: 'directing',
            ja: 'いちいち聞かないで',
            en: 'You don\'t have to check with me on every little thing.',
            note: 'every little thing が「いちいち」。長いが、これ以上短くすると冷たくなる。',
            use: '確認が多すぎる時',
        },
        ],
    },
    {
        day: 16, theme: '雑談の在庫',
        entries: [
        {
            key: '蒸し暑い', cat: 'lesson', scene: 'dmm',
            ja: '今日は蒸し暑くてね',
            en: 'It\'s really muggy today.',
            note: 'humid は気象語。muggy が体感で、会話の入りに向く。',
            use: '天気の話',
        },
        {
            key: '止まってた', cat: 'lesson', scene: 'dmm',
            ja: '電車が止まってて',
            en: 'The trains were down.',
            note: 'stopped だと一時停止。were down が「止まっていた」状態を指す。',
            use: '遅れた理由',
        },
        {
            key: '寝てない', cat: 'lesson', scene: 'dmm',
            ja: '昨日ほとんど寝てない',
            en: 'I barely slept last night.',
            note: 'could not sleep は不眠。barely slept なら、単に寝る時間が無かった側も言える。',
            use: '疲れている理由',
        },
        {
            key: '混んでた', cat: 'lesson', scene: 'dmm',
            ja: 'どこも混んでた',
            en: 'Everywhere was packed.',
            note: 'crowded でも通じるが、packed のほうが口語で強い。',
            use: '出かけた話',
        },
        {
            key: '久しぶり', cat: 'lesson', scene: 'dmm',
            ja: '久しぶりに外に出た',
            en: 'That\'s the first time I have been out in a while.',
            note: 'after a long time は直訳。in a while が自然な「久しぶり」。',
            use: '近況',
        },
        ],
    },
    {
        day: 17, theme: '断る',
        entries: [
        {
            key: '気持ちだけ', cat: 'hedge', scene: 'job',
            ja: '気持ちだけもらっとく',
            en: 'I appreciate the thought.',
            note: 'No thanks は切る。appreciate the thought は、断りつつ相手を立てる定型。',
            use: '親切を辞退する時',
        },
        {
            key: '遠慮しとく', cat: 'hedge', scene: 'daily',
            ja: '今日は遠慮しとく',
            en: 'I\'ll pass today.',
            note: 'decline は硬い。pass は2文字で断れて、角も立たない。',
            use: '誘いを断る時',
        },
        {
            key: '無理しないで', cat: 'hedge', scene: 'dmm',
            ja: '無理しないでいいよ',
            en: 'Don\'t push it.',
            note: 'Do not overwork は説教。push it なら、相手の裁量を残せる。',
            use: '先生が延長しようとした時',
        },
        {
            key: 'また今度', cat: 'hedge', scene: 'job',
            ja: 'また今度でいい?',
            en: 'Can we do it another time?',
            note: 'next time は次回を約束してしまう。another time は日付を決めずに逃げられる。',
            use: '日を改めたい時',
        },
        {
            key: '気が引ける', cat: 'mood', scene: 'daily',
            ja: 'ちょっと気が引ける',
            en: 'I feel a bit bad about it.',
            note: 'hesitate は動作。feel bad about で、遠慮の中身が申し訳なさだと出る。',
            use: '厚意を受け取りにくい時',
        },
        ],
    },
    {
        day: 18, theme: '仕組みを語る',
        entries: [
        {
            key: '型', cat: 'judge', scene: 'writing',
            ja: '型さえあれば書ける',
            en: 'Once you have the frame, you can write it.',
            note: 'pattern だと模様。frame が枠組みで、CORE 5 の説明にそのまま使える。',
            use: '自分のやり方を説明する時',
        },
        {
            key: '使い回す', cat: 'judge', scene: 'writing',
            ja: '同じのを使い回してる',
            en: 'I just reuse the same one.',
            note: 'recycle は資源の語。reuse が正確で、just が省力の開き直りを足す。',
            use: '手の内を明かす時',
        },
        {
            key: '網羅的', cat: 'push', scene: 'directing',
            ja: '網羅的にやりたい',
            en: 'I want it to cover everything.',
            note: 'comprehensive は形容詞で重い。cover everything が動詞で、意図として言える。',
            use: '抜けの無さを求める時',
        },
        {
            key: '逆算', cat: 'judge', scene: 'job',
            ja: 'ゴールから逆算した',
            en: 'I worked backwards from the end.',
            note: 'reverse calculation は数学。work backwards が発想の順序を指す。',
            use: '段取りの説明',
        },
        {
            key: '手抜き', cat: 'judge', scene: 'writing',
            ja: 'そこは手抜きしてる',
            en: 'I cut corners there.',
            note: 'lazy とは違う。cut corners は「わざと省いた」で、判断としての手抜きになる。',
            use: '正直に言う時',
        },
        ],
    },
    {
        day: 19, theme: '温度を出す',
        entries: [
        {
            key: 'ぶっちゃけ', cat: 'mood', scene: 'daily',
            ja: 'ぶっちゃけ疲れた',
            en: 'Honestly, I\'m done.',
            note: 'I am done で「もう終わり」。tired より重く、本音を出す時の言い方。',
            use: '限界の申告',
        },
        {
            key: '地味にしんどい', cat: 'mood', scene: 'job',
            ja: '地味にしんどいんだよね',
            en: 'It\'s quietly exhausting.',
            note: '地味に = 目立たないが効く。quietly を副詞で足すと、そのニュアンスが出る。',
            use: '大変さが伝わりにくい作業の話',
        },
        {
            key: '助かる', cat: 'mood', scene: 'directing',
            ja: 'それは助かる',
            en: 'That\'s a big help.',
            note: 'Thank you とは別の役割。help を名詞で使うと、感謝ではなく効用の話になる。',
            use: '提案をもらった時',
        },
        {
            key: '気が楽', cat: 'mood', scene: 'daily',
            ja: 'だいぶ気が楽になった',
            en: 'That takes a lot off my mind.',
            note: 'relieved は状態。take off my mind は「降ろした」動きで、直前の変化を指せる。',
            use: '問題が片付いた時',
        },
        {
            key: 'もやもや', cat: 'mood', scene: 'writing',
            ja: 'まだもやもやしてる',
            en: 'It\'s still bugging me.',
            note: 'unclear は理解の話。bug me は「引っかかって離れない」で、感情に寄る。',
            use: '納得していない時',
        },
        ],
    },
    {
        day: 20, theme: '因果を言う',
        entries: [
        {
            key: 'だから', cat: 'push', scene: 'directing',
            ja: 'だからそう言ったのに',
            en: 'That\'s what I was trying to tell you.',
            note: 'I told you so は勝ち誇る。was trying to tell にすると、伝わらなかった側の悔しさになる。',
            use: '忠告が無視された後',
        },
        {
            key: '案の定', cat: 'judge', scene: 'job',
            ja: '案の定こうなった',
            en: 'Sure enough, here we are.',
            note: 'as expected は予測の的中。Sure enough は「やっぱり」で、諦めの色が入る。',
            use: '悪い予感が当たった時',
        },
        {
            key: 'どっちみち', cat: 'judge', scene: 'writing',
            ja: 'どっちみち同じでしょ',
            en: 'It comes out the same either way.',
            note: 'anyway では弱い。either way が「どちらの道でも」で、二択の無意味さを指す。',
            use: '選択に意味が無い時',
        },
        {
            key: '結局', cat: 'judge', scene: 'daily',
            ja: '結局やることは変わらない',
            en: 'In the end, nothing about the work changes.',
            note: 'after all は「なんだかんだ言って」。In the end のほうが、結論としての結局に合う。',
            use: '議論を畳む時',
        },
        {
            key: 'その割に', cat: 'push', scene: 'directing',
            ja: 'その割に成果ないよね',
            en: 'Not a lot to show for it, though.',
            note: 'show for it = 費やした分の見返り。日本語の「割に」がこれ1つで出る。',
            use: '労力と結果が合わない時',
        },
        ],
    },
    {
        day: 21, theme: '意見を置く',
        entries: [
        {
            key: '個人的には', cat: 'hedge', scene: 'writing',
            ja: '個人的にはこっちかな',
            en: 'Personally, I\'d go with this one.',
            note: 'In my opinion は答案語。Personally + would go with が会話の形。',
            use: '2択で選ぶ時。答案でも使える',
        },
        {
            key: '違うと思う', cat: 'push', scene: 'dmm',
            ja: 'そこは違うと思う',
            en: 'I\'d disagree with you there.',
            note: 'You are wrong は宣告。would disagree + there で、範囲を限定した反対になる。',
            use: '部分的に反対する時',
        },
        {
            key: '一理ある', cat: 'judge', scene: 'dmm',
            ja: 'まあ一理あるね',
            en: 'Fair point, actually.',
            note: 'You are right だと全面降伏。Fair point は「そこは認める」で、譲る範囲を絞れる。',
            use: '反論を一部受け入れる時',
        },
        {
            key: '賛成しかねる', cat: 'push', scene: 'writing',
            ja: 'そこは賛成しかねる',
            en: 'I can\'t quite get behind that.',
            note: 'cannot agree は強い。get behind は「後ろについて支える」なので、支持できないという柔らかい否定になる。',
            use: '丁寧に反対する時',
        },
        {
            key: 'どちらかといえば', cat: 'hedge', scene: 'dmm',
            ja: 'どちらかといえば反対かな',
            en: 'If I had to pick, I\'d say no.',
            note: 'rather は比較。If I had to pick で「選ばされるなら」と、態度を保留したまま答えられる。',
            use: '旗色を鮮明にしたくない時',
        },
        ],
    },
    {
        day: 22, theme: '量産する',
        entries: [
        {
            key: '量産', cat: 'judge', scene: 'writing',
            ja: 'これはもう量産できる',
            en: 'I can turn these out now.',
            note: 'mass-produce は工場。turn out が「次々に出す」で、個人の作業に合う。',
            use: '型が固まった時',
        },
        {
            key: '手順', cat: 'push', scene: 'directing',
            ja: '手順にしちゃえばいい',
            en: 'Just turn it into a routine.',
            note: 'systematize は硬い。routine にすると、毎回同じ手順で回すという意味が出る。',
            use: '面倒を仕組みで潰す時',
        },
        {
            key: 'まとめて', cat: 'push', scene: 'directing',
            ja: 'まとめてやっちゃおう',
            en: 'Let\'s knock them all out at once.',
            note: 'knock out = 片付ける。all at once と組むと、一気にやる勢いが出る。',
            use: '作業を束ねる時',
        },
        {
            key: '使い勝手', cat: 'judge', scene: 'job',
            ja: '使い勝手が悪いんだよ',
            en: 'It\'s awkward to use.',
            note: 'inconvenient は状況。awkward は「手に馴染まない」で、道具の評価に合う。',
            use: '道具の不満',
        },
        {
            key: '回せる', cat: 'judge', scene: 'writing',
            ja: 'これで回せるでしょ',
            en: 'This is enough to keep it running.',
            note: 'operate は運用。keep it running が「回し続ける」で、日本語の回すに近い。',
            use: '最低限が揃った時',
        },
        ],
    },
    {
        day: 23, theme: '期待を下げる',
        entries: [
        {
            key: '期待しないで', cat: 'hedge', scene: 'directing',
            ja: 'あんまり期待しないで',
            en: 'Don\'t get your hopes up.',
            note: 'Do not expect much でも通じるが、get your hopes up が定型で自然。',
            use: '見せる前の予防線',
        },
        {
            key: '保証はない', cat: 'hedge', scene: 'job',
            ja: 'うまくいく保証はない',
            en: 'No promises it will work.',
            note: 'no guarantee は契約語。No promises が会話での言い方。',
            use: '客に確約できない時',
        },
        {
            key: '気休め', cat: 'hedge', scene: 'daily',
            ja: '気休めだけどね',
            en: 'It\'s not much comfort, I know.',
            note: 'comfort が「気休め」。I know を足すと、自分でわかっている分だけ誠実に聞こえる。',
            use: '慰めにならない話をした後',
        },
        {
            key: '焼け石に水', cat: 'judge', scene: 'writing',
            ja: '焼け石に水だよ',
            en: 'It barely makes a dent.',
            note: 'a drop in the ocean は量の話。make a dent は「へこませる」で、効果の無さを指す。',
            use: '対策が足りない時',
        },
        {
            key: '五分五分', cat: 'hedge', scene: 'job',
            ja: '五分五分かな',
            en: 'It could go either way.',
            note: 'fifty-fifty でも通じるが、could go either way のほうが会話で自然。',
            use: '見通しを聞かれた時',
        },
        ],
    },
    {
        day: 24, theme: '詰まった時',
        entries: [
        {
            key: '出てこない', cat: 'lesson', scene: 'dmm',
            ja: '言葉が出てこない',
            en: 'The word\'s not coming to me.',
            note: 'I forgot は忘却。not coming to me なら「知っているのに出ない」状態を正確に言える。',
            use: '単語が出ない時',
        },
        {
            key: 'なんて言う', cat: 'lesson', scene: 'dmm',
            ja: 'なんて言うんでしたっけ',
            en: 'What\'s the word for that again?',
            note: 'again が効く。一度習ったという含みが入るので、先生の反応が変わる。',
            use: '復習の合図になる',
        },
        {
            key: '説明しにくい', cat: 'lesson', scene: 'dmm',
            ja: '説明しにくいんですけど',
            en: 'It\'s hard to put into words, but...',
            note: 'difficult to explain は説明の技術の話。put into words なら、概念が言葉になりにくいと言える。',
            use: '抽象的な話に入る前',
        },
        {
            key: '通じて', cat: 'lesson', scene: 'dmm',
            ja: '通じてますか?',
            en: 'Is that making sense?',
            note: 'Do you understand? は相手を試す形。Is that making sense? なら責任が自分の説明側に残る。',
            use: '長く話した後',
        },
        {
            key: '言い直す', cat: 'lesson', scene: 'dmm',
            ja: '言い直します',
            en: 'Let me start that over.',
            note: 'say again は繰り返し。start over は作り直しで、間違えた文を捨てられる。',
            use: '途中で崩れた時',
        },
        ],
    },
    {
        day: 25, theme: '距離を取る',
        entries: [
        {
            key: 'まあいいや', cat: 'hedge', scene: 'daily',
            ja: 'まあいいや',
            en: 'Never mind, it\'s fine.',
            note: 'forget it は突き放す。Never mind + it is fine で、こだわらないだけになる。',
            use: '追及をやめる時',
        },
        {
            key: 'どうでもいい', cat: 'mood', scene: 'directing',
            ja: '正直どうでもいい',
            en: 'Honestly, I don\'t care either way.',
            note: 'I do not care だけだと冷たい。either way を足すと、どちらでも構わないという中立になる。',
            use: '選択を委ねる時',
        },
        {
            key: '関係ない', cat: 'push', scene: 'writing',
            ja: 'それは関係ないでしょ',
            en: 'That\'s beside the point.',
            note: 'not related は事実の話。beside the point は「論点の外」で、議論の中で使える。',
            use: '話がずれた時',
        },
        {
            key: '放っておく', cat: 'hedge', scene: 'directing',
            ja: '放っておけばいい',
            en: 'Just leave it alone.',
            note: 'ignore は無視。leave it alone は「手を出さない」で、判断としての放置になる。',
            use: '手を入れない方がいい時',
        },
        {
            key: '深追い', cat: 'judge', scene: 'job',
            ja: '深追いはしない',
            en: 'I\'m not going to chase it.',
            note: 'pursue は硬い。chase が「追いかける」で、やめる判断が見える。',
            use: '切り上げる時',
        },
        ],
    },
    {
        day: 26, theme: '気づく',
        entries: [
        {
            key: '心当たり', cat: 'judge', scene: 'job',
            ja: '心当たりはある',
            en: 'I\'ve got a pretty good idea what it is.',
            note: 'I have an idea だと思いつき。pretty good idea what it is で、当たりがついている状態になる。',
            use: '原因を聞かれた時',
        },
        {
            key: '引っかかる', cat: 'push', scene: 'directing',
            ja: 'そこが引っかかるんだよな',
            en: 'That\'s the part that bothers me.',
            note: 'the part が効く。全体ではなく1点だけが気になると言える。',
            use: '違和感を指す時',
        },
        {
            key: '腹落ち', cat: 'mood', scene: 'dmm',
            ja: 'やっと腹落ちした',
            en: 'It finally clicked.',
            note: 'understood は結果。click は「噛み合った瞬間」で、腹落ちの体感に合う。',
            use: '納得できた時',
        },
        {
            key: '見落とし', cat: 'mood', scene: 'directing',
            ja: '完全に見落としてた',
            en: 'That went right past me.',
            note: 'I missed it は事務的。went right past me は「素通りされた」で、悔しさが出る。',
            use: '抜けを指摘された時',
        },
        {
            key: '気のせい', cat: 'hedge', scene: 'daily',
            ja: '気のせいかも',
            en: 'Maybe it\'s just me.',
            note: 'imagination は空想。just me が「自分だけかもしれない」で、日本語の気のせいに近い。',
            use: '自信の無い指摘の前',
        },
        ],
    },
    {
        day: 27, theme: '強く出る',
        entries: [
        {
            key: '言い切る', cat: 'push', scene: 'writing',
            ja: 'そこは言い切っていい',
            en: 'You can just say it flat out.',
            note: 'assert は硬い。flat out が「留保なしで」で、言い切るの温度に合う。',
            use: '答案の書き方。断定に振る時',
        },
        {
            key: '押し切る', cat: 'push', scene: 'job',
            ja: 'もう押し切ろう',
            en: 'Let\'s just push it through.',
            note: 'force は暴力的。push through は「通し切る」で、決定の話になる。',
            use: '議論を打ち切る時',
        },
        {
            key: '譲れない', cat: 'push', scene: 'job',
            ja: 'ここは譲れない',
            en: 'This part isn\'t up for discussion.',
            note: 'cannot compromise は交渉語。not up for discussion は、議題から外すという強い言い方。',
            use: '線を引く時',
        },
        {
            key: '無理やり', cat: 'judge', scene: 'writing',
            ja: '無理やり入れた感がある',
            en: 'It feels forced in.',
            note: 'forcibly は副詞で硬い。feels forced in なら、収まりの悪さとして言える。',
            use: '語彙をねじ込んだ文への感想',
        },
        {
            key: '強気', cat: 'push', scene: 'directing',
            ja: 'もう少し強気でいい',
            en: 'You can be bolder than that.',
            note: 'aggressive は攻撃的。bold は「思い切りがいい」で、褒め方向に振れる。',
            use: '遠慮している相手に',
        },
        ],
    },
    {
        day: 28, theme: '続けるかやめるか',
        entries: [
        {
            key: '惰性', cat: 'mood', scene: 'daily',
            ja: '惰性でやってる',
            en: 'I\'m only doing it out of habit now.',
            note: 'inertia は物理語。out of habit が「習慣だから」で、惰性の中身になる。',
            use: '続ける理由を聞かれた時',
        },
        {
            key: '続かない', cat: 'mood', scene: 'daily',
            ja: 'たぶん続かない',
            en: 'I doubt I\'ll keep it up.',
            note: 'cannot continue は能力の話。doubt I will keep it up は予測で、自嘲に寄る。',
            use: '新しい習慣の話',
        },
        {
            key: '割り切る', cat: 'judge', scene: 'job',
            ja: 'そこは割り切ってる',
            en: 'I\'ve made my peace with that.',
            note: 'accept は受け入れ。make peace with は「折り合いをつけた」で、割り切るの過程が入る。',
            use: '妥協を説明する時',
        },
        {
            key: '切り上げる', cat: 'lesson', scene: 'dmm',
            ja: '今日はここで切り上げよう',
            en: 'Let\'s call it here for today.',
            note: 'finish は終了。call it は自分たちで区切るという判断になる。',
            use: 'レッスンの終わりに',
        },
        {
            key: 'やめどき', cat: 'judge', scene: 'writing',
            ja: 'やめどきが難しい',
            en: 'The hard part is knowing when to stop.',
            note: 'when to quit だと投げ出し。when to stop なら、区切りの判断の話になる。',
            use: '引き際の話',
        },
        ],
    },
    {
        day: 29, theme: '比べる',
        entries: [
        {
            key: '段違い', cat: 'judge', scene: 'directing',
            ja: '段違いに良い',
            en: 'It\'s on a completely different level.',
            note: 'much better では差が出ない。different level なら、比べる土俵が違うところまで言える。',
            use: '質の差を言う時',
        },
        {
            key: '大差ない', cat: 'judge', scene: 'directing',
            ja: '大差ないよ',
            en: 'There\'s not much in it.',
            note: 'almost the same は近さ。not much in it は競技の言い方で、差が僅かだと出る。',
            use: '2案が拮抗している時',
        },
        {
            key: 'ましな方', cat: 'judge', scene: 'job',
            ja: 'まだましな方だよ',
            en: 'It\'s the lesser of the two.',
            note: 'better は良い方。lesser は「悪さが小さい方」で、ましなの後ろ向きさが出る。',
            use: 'どちらも良くない時',
        },
        {
            key: '見劣りする', cat: 'judge', scene: 'writing',
            ja: 'ちょっと見劣りするね',
            en: 'It doesn\'t quite hold up next to the others.',
            note: 'inferior は断罪。hold up next to は「並べると持ちこたえない」で、比較の中の話になる。',
            use: '並べて評価する時',
        },
        {
            key: '桁が違う', cat: 'judge', scene: 'job',
            ja: '桁が違うよ',
            en: 'That\'s a whole other order of magnitude.',
            note: 'ten times more では足りない。order of magnitude が桁そのもの。',
            use: '数字の差を強調する時',
        },
        ],
    },
    {
        day: 30, theme: '締める',
        entries: [
        {
            key: 'これで行こう', cat: 'push', scene: 'directing',
            ja: 'もうこれで行こう',
            en: 'Let\'s just go with this.',
            note: 'decide は宣言。go with this なら、他も見た上で選んだという含みが残る。',
            use: '決定する時',
        },
        {
            key: '形になった', cat: 'mood', scene: 'writing',
            ja: 'やっと形になった',
            en: 'It\'s finally taking shape.',
            note: 'completed は完成。taking shape は途中で、まだ動いている感じが出る。',
            use: '進捗の報告',
        },
        {
            key: '詰めるだけ', cat: 'judge', scene: 'job',
            ja: 'あとは詰めるだけ',
            en: 'It\'s just the details from here.',
            note: 'finalize は硬い。just the details で、山を越えたと伝わる。',
            use: '終盤の報告',
        },
        {
            key: '一段落', cat: 'mood', scene: 'daily',
            ja: '一段落ついた',
            en: 'That\'s one thing off the list.',
            note: 'settled は決着。off the list なら、まだ他が残っている現実も入る。',
            use: '区切りがついた時',
        },
        {
            key: '悪くない', cat: 'judge', scene: 'directing',
            ja: '悪くないね',
            en: 'Not bad at all, actually.',
            note: 'good では褒めすぎ。Not bad at all + actually が、日本語の悪くないの温度。',
            use: '出来を評価する時',
        },
        ],
    },
    {
        day: 31, theme: '振り返る',
        entries: [
        {
            key: '思ったより', cat: 'mood', scene: 'writing',
            ja: '思ったより進んだ',
            en: 'I got further than I thought I would.',
            note: 'more than expected は量。got further は距離で、進捗の話に合う。',
            use: '月末の振り返り',
        },
        {
            key: '手応え', cat: 'mood', scene: 'dmm',
            ja: 'ちょっと手応えあった',
            en: 'That one actually felt like something.',
            note: 'response は反応。felt like something が「何かが起きた感触」で、手応えに近い。',
            use: 'うまくいった回の話',
        },
        {
            key: '遠回り', cat: 'mood', scene: 'daily',
            ja: 'だいぶ遠回りした',
            en: 'I took the long way around on that.',
            note: 'detour は迂回路。the long way around は選択の結果で、自嘲に使える。',
            use: '試行錯誤の話',
        },
        {
            key: '積み上がる', cat: 'judge', scene: 'writing',
            ja: '少しずつ積み上がってる',
            en: 'It\'s slowly adding up.',
            note: 'accumulate は硬い。add up が「積み上がる」で、努力の話に合う。',
            use: '継続の実感',
        },
        {
            key: 'まだまだ', cat: 'judge', scene: 'daily',
            ja: 'まだまだだね',
            en: 'Still a long way to go.',
            note: 'not enough は不足。a long way to go は距離で、前向きさを残せる。',
            use: '締めの一言',
        },
        ],
    },
];

export const GOROKU_OCT_MONTH = '2026-10';
export const GOROKU_OCT_TOTAL = GOROKU_OCTOBER.reduce((n, d) => n + d.entries.length, 0);
