/**
 * DEBATE ROOM — Steven Pinker vs Mehdi Hasan(Al Jazeera English「UpFront」)を、講師と一緒に見ながら学ぶページのデータ。
 *
 * 動画: https://www.youtube.com/watch?v=BkM2wiOwerc(約15分)
 * 英文は YouTube の英語字幕(自動)から起こした。字幕の聞き違い(thorat Arianism → authoritarianism など)は直してある。
 * 引用は各ラウンドの要の一言だけにして、全文は載せない。数字は番組の中で話された数字で、俺が確かめたものではない。
 *
 * 1ラウンド = 攻め(Hasan)と受け(Pinker)の1往復。技の名前は俺が付けた。勝ち負けの判定も俺の見立て。
 * NIJI REVENGE テーマ2(Can poverty ever be eradicated?)の材料。
 */

export interface DebateLine {
    who: 'hasan' | 'pinker';
    t?: number;      // 動画の中で言い始める秒(英語字幕の単語の時刻から取った。数語ずれることがある)
    en: string;
    ja: string;
}

export interface DebatePhrase {
    en: string;
    ja: string;
    use: string;     // 自分の二次・会話でどう使うか
}

export interface DebateRound {
    no: number;
    start: number;          // 秒
    title: string;
    topic: string;          // 何の話か(1行)
    attack: string;         // Hasan の攻め方
    defense: string;        // Pinker の受け方
    lines: DebateLine[];    // 要の一言(短い引用)
    moves: { name: string; who: 'hasan' | 'pinker'; how: string }[];
    phrases: DebatePhrase[];
    verdict: string;        // このラウンドの見立て
    askTeacher: string;     // 一時停止して先生に聞くこと
    sayThis: string;        // とにおが言う一言(英語)
}

export const DEBATE_META = {
    youtubeId: 'BkM2wiOwerc',
    url: 'https://www.youtube.com/watch?v=BkM2wiOwerc',
    show: 'UpFront(Al Jazeera English)',
    title: 'War, poverty and inequality: Is there any good news?',
    pinker: 'Steven Pinker — ハーバードの心理学者。著書『Enlightenment Now(21世紀の啓蒙)』で「世界は良くなっている」とデータで論じた',
    hasan: 'Mehdi Hasan — 番組の司会。相手の前提を崩す、引用を突きつける、数字の物差しを変える、で相手を追い込む',
    oneLine: '楽観の学者が、論破の名手に15分で4つの論点(啓蒙の暗部・貧困・格差・気候変動)を突かれる。どちらも声を荒げない。言葉の選び方だけで殴り合っている。',
};

export const DEBATE_ROUNDS: DebateRound[] = [
    {
        no: 1, start: 4, title: '開幕 — 世界は燃えているのに「素晴らしい」?',
        topic: '司会が世界の暗いニュースを並べ、ピンカーの本の一文をぶつける',
        attack: '暗い事実を4つ(権威主義の台頭・難民・核の危機・気候変動)並べてから、相手の本の「楽観的な一文」を引用して落差を見せる。',
        defense: '「どの物差しで測っても良くなっている」と一般論で受け、具体の物差し(寿命・教育・安全・戦死)を4つ即答で並べる。',
        lines: [
            { who: 'hasan', t: 7.4, en: 'We live in a world in which authoritarianism is on the rise ... and yet you come along with your new much-discussed book.', ja: '権威主義が台頭する世界に生きているのに、あなたは話題の新刊を引っさげてやって来た。' },
            { who: 'pinker', t: 35.1, en: 'Any aspect of human well-being that you measure has shown an increase.', ja: '人間の幸福のどの面を測っても、上がっている。' },
            { who: 'pinker', t: 38.7, en: 'We live longer, more of us go to school, life is safer, fewer of us die in wars.', ja: '寿命は延び、学校に行く人は増え、暮らしは安全になり、戦争で死ぬ人は減った。' },
        ],
        moves: [
            { name: '落差の演出', who: 'hasan', how: '暗い事実を先に積んでから、相手の明るい言葉を読む。読まれた側は弁解から入らされる。' },
            { name: '4つ並べて即答', who: 'pinker', how: '抽象(幸福)で受けて、すぐ具体を4つ。短い文を同じ形で並べると、反論の隙が無い。' },
        ],
        phrases: [
            { en: '... is on the rise', ja: '〜が増えている、台頭している', use: '二次の入りで現状を言う(Poverty in rich countries is on the rise.)' },
            { en: 'and yet', ja: 'それなのに', use: '事実を並べたあと、相手の主張との落差を突く一言' },
            { en: 'Any aspect of ... that you measure', ja: '〜のどの面を測っても', use: '自分の主張を広く言い切るとき' },
        ],
        verdict: '互角。司会は舞台を作り、ピンカーは4つの事実で立った。',
        askTeacher: 'Do you feel the world is getting better or worse?',
        sayThis: 'Pinker starts with four simple facts: we live longer, more of us go to school, life is safer, and fewer of us die in wars.',
    },
    {
        no: 2, start: 86, title: '啓蒙の暗部 — 「時系列が違う」',
        topic: '啓蒙時代は奴隷制・植民地主義の時代でもあった、という批判',
        attack: '「批判者はこう言っている」と第三者の声を借り、さらに哲学者の差別発言(カント・ロック・ヒューム・ヴォルテール)を名指しで4つ並べる。',
        defense: '最初は「それは誤りだ、時系列が違う」と全否定。名指しを並べられると「人には暗部があった」と人は認めて、「私が掲げるのは人ではなく考えだ」と線を引く。',
        lines: [
            { who: 'pinker', t: 110.3, en: "That's false. I do take it into account, and it's anachronistic. The chronology is wrong.", ja: 'それは誤りだ。考慮している。時代錯誤だし、時系列が違う。' },
            { who: 'pinker', t: 115.5, en: 'Slavery has existed since civilization has existed.', ja: '奴隷制は文明と同じだけ古い。' },
            { who: 'pinker', t: 194.3, en: "Absolutely a dark side to these people. ... What I'm holding up are the ideas.", ja: 'この人たちには確かに暗部があった。私が掲げているのは、考えのほうだ。' },
        ],
        moves: [
            { name: '第三者の声を借りる', who: 'hasan', how: 'Critics say / Some scholars say で始めると、司会自身は攻撃していない形のまま攻められる。' },
            { name: '時系列で崩す', who: 'pinker', how: '「Aが原因でBが起きた」には「BはAより前からあった」で返す。因果の向きを時間で切る。' },
            { name: '人と考えを分ける', who: 'pinker', how: '相手の言う事実(差別した人がいた)は認め、守る対象を人から考えに移す。認めた分だけ信用が増える。' },
        ],
        phrases: [
            { en: "That's false. I do take it into account.", ja: 'それは違う。ちゃんと考えに入れている。', use: '「考慮していない」と言われたときの即答(do で強める)' },
            { en: 'The chronology is wrong.', ja: '時系列が違う。', use: '因果の主張を時間の順番で崩す' },
            { en: 'Absolutely. ... But what I\'m holding up is ...', ja: 'その通り。でも私が掲げているのは……', use: '相手の事実を認めてから、守る範囲を絞る' },
        ],
        verdict: 'ピンカーの勝ち。全否定から部分的な承認に移ったのが効いた。',
        askTeacher: 'Is it fair to judge historical figures by today\'s standards?',
        sayThis: 'I like how he admitted the dark side of those people, but kept defending the ideas.',
    },
    {
        no: 3, start: 229, title: 'つまみ食い疑惑 — 「完全に間違っている」',
        topic: '結論が先で、データは後から都合のいいものを選んだのでは、という批判',
        attack: '相手の肩書きを持ち上げてから(very prominent, well-credentialed scientist)、「でも本は論証ではなく論争文だ」と落とす。',
        defense: '一言で全否定(Totally wrong. That\'s just dead wrong.)。それから「何が幸福か(寿命・病死・暴力死)は誰でも合意している。それを全部グラフにしただけだ」と、選んでいない根拠を示す。',
        lines: [
            { who: 'hasan', t: 254.1, en: 'Some say you cherry-pick data to justify that conclusion. What do you say to them?', ja: '結論を正当化するためにデータをつまみ食いしている、と言う人もいる。どう答える?' },
            { who: 'pinker', t: 258.2, en: "Totally wrong. That's just dead wrong.", ja: '完全に間違いだ。まったくの見当違いだ。' },
            { who: 'pinker', t: 261.9, en: 'We all agree on what human well-being consists of — like life expectancy, like death from disease.', ja: '人間の幸福が何でできているかは、誰でも合意している。寿命、病気による死。' },
        ],
        moves: [
            { name: '持ち上げてから落とす', who: 'hasan', how: '相手を褒めてから批判すると、批判が個人攻撃に聞こえない。' },
            { name: '短く全否定 → 根拠', who: 'pinker', how: '最初の3語で否定を言い切り、間を空けずに理由を出す。否定だけで止めると感情に見える。' },
        ],
        phrases: [
            { en: 'cherry-pick', ja: '(都合のいいものだけ)つまみ食いする', use: '相手のデータの選び方を疑うとき' },
            { en: "That's just dead wrong.", ja: 'まったくの見当違いだ。', use: '強い否定。二次では Totally wrong より I strongly disagree の方が安全' },
            { en: 'What do you say to them?', ja: 'その人たちに何て答える?', use: '批判を第三者に言わせて相手に返す質問' },
        ],
        verdict: 'ピンカーの勝ち。ただし「全部グラフにした」は検証できないので、司会は次の論点で数字そのものを突く。',
        askTeacher: 'How can we tell if someone is cherry-picking data?',
        sayThis: 'He answered in three words first — "Totally wrong" — and then gave his reason. I want to answer like that.',
    },
    {
        no: 4, start: 271, title: '貧困の物差し — 「定義は恣意的だ、それでも向きは下」',
        topic: '極度の貧困(1日1.90ドル以下)は1990年の20億人から2015年の7億人に減った、という本の数字',
        attack: '相手の数字を正確に読み上げてから、「でもその物差し自体が恣意的だと言う学者が大勢いる」と物差しを攻める。別の学者の数字(40億人が貧困)をぶつける。',
        defense: '「定義が恣意的なのは当たり前だ」と相手の前提を先に認め、「どこに線を引いても向きは下だ」と、物差しを変えても結論が変わらないと返す。',
        lines: [
            { who: 'hasan', t: 304, en: 'There are numerous studies and a number of scholars who dispute that poverty measure as arbitrary, as inaccurate.', ja: 'その貧困の物差しを、恣意的で不正確だと異を唱える研究や学者がたくさんいる。' },
            { who: 'pinker', t: 326.7, en: 'Of course the definition of extreme poverty is going to be arbitrary. If you make it higher, more people will be in poverty.', ja: 'もちろん極度の貧困の定義は恣意的だ。線を高くすれば、貧困の人は増える。' },
            { who: 'pinker', t: 335.4, en: 'No matter what cutoff you set, the direction is down.', ja: 'どこで線を引いても、向きは下だ。' },
        ],
        moves: [
            { name: '物差しを攻める', who: 'hasan', how: '数字の中身ではなく、数字を作る定義を疑う。数字が正しくても議論が揺らぐ。' },
            { name: '前提を先に認める', who: 'pinker', how: 'Of course ~ で相手の言い分を自分から言ってしまう。相手の攻撃が「当たり前のこと」に縮む。' },
            { name: '向きで答える', who: 'pinker', how: '量(何人)ではなく向き(増えたか減ったか)で勝負する。物差しが変わっても向きは変わらない、と言えれば強い。' },
        ],
        phrases: [
            { en: 'arbitrary', ja: '恣意的な、勝手に決めた', use: '基準や線引きを疑うとき' },
            { en: 'No matter what cutoff you set, the direction is down.', ja: 'どこで線を引いても、向きは下だ。', use: 'テーマ2の譲歩の後にそのまま使える' },
            { en: 'Of course ... is going to be ...', ja: 'もちろん〜なのは当然だ', use: '相手の前提を先に認めて、攻撃を小さくする' },
        ],
        verdict: 'ピンカーの勝ち。物差しの話を「向き」の話に戻した。',
        askTeacher: 'Where would you draw the poverty line in your country?',
        sayThis: 'His best line was: "No matter what cutoff you set, the direction is down."',
    },
    {
        no: 5, start: 333, title: '数か割合か — 「大事なのは割合だ」',
        topic: '1日5ドルの線で見ると、1981年から貧困の人は10億人増えている、という別の学者の数字',
        attack: '線を5ドルに上げて「人数は10億人増えた」と、相手の主張と逆向きの数字を出す。さらに「あなたも本で人数を使っている」と矛盾を突く。',
        defense: '「その間に世界の人口が数十億人増えた。大事なのは割合だ」と分母を持ち出す。矛盾を突かれると「最も広く受け入れられた定義では人数も減っている。でも主眼は割合だ」と順位を付けて答える。',
        lines: [
            { who: 'hasan', t: 344.3, en: 'A billion people have been added to the number of people on that poverty measure since 1981.', ja: 'その物差しでは、1981年から貧困の人が10億人増えている。' },
            { who: 'pinker', t: 362.4, en: "Billions of people have been added to the world as a whole. What's relevant is the proportion.", ja: '世界全体で数十億人増えた。大事なのは割合だ。' },
            { who: 'hasan', t: 365.6, en: 'You also use absolute numbers in your book.', ja: 'あなたも本で人数を使っている。' },
            { who: 'pinker', t: 375.8, en: 'The absolute numbers have declined as well, but the main point is the proportion.', ja: '人数も減っている。でも要点は割合だ。' },
        ],
        moves: [
            { name: '逆向きの数字', who: 'hasan', how: '同じデータの別の切り口(線を上げる)で、逆の結論を出す。' },
            { name: '矛盾の指摘', who: 'hasan', how: '「あなた自身も〜している」は短くて効く。相手は言い分の順位を言わされる。' },
            { name: '分母を出す', who: 'pinker', how: '人数が増えた、には「全体も増えた」。割合で見ると話が逆になる。' },
        ],
        phrases: [
            { en: "What's relevant is the proportion.", ja: '大事なのは割合だ。', use: 'テーマ2の1点目。人数ではなく割合で語る' },
            { en: 'as a whole', ja: '全体として', use: '部分の数字に、全体の数字で返すとき' },
            { en: '... as well, but the main point is ...', ja: '〜もそうだ。でも要点は〜だ', use: '突かれた矛盾を認めつつ、論点の順位を言う' },
        ],
        verdict: '引き分け。分母の返しは強いが、「人数も使った」と突かれた所で少し後退した。',
        askTeacher: 'Which matters more to you — the number of poor people, or the percentage?',
        sayThis: 'Hasan caught him using absolute numbers in his own book. That was a sharp move.',
    },
    {
        no: 6, start: 393, title: '線を6倍に — 「それはかなり極端な定義変更だ」',
        topic: 'ハーバードの開発経済学者 Lant Pritchett は「貧困線は1日12〜15ドルにすべきだ」と言っている',
        attack: '相手の同僚(同じハーバード)の名前を出して、専門家の声で物差しを書き換える。「その本の議論は崩れるのでは?」と短い疑問で終える。',
        defense: '「6倍にするのはかなり極端な定義変更だ」と、変更の大きさに名前を付ける。「専門家にも反対はいる」には「いる。でも幅広い推計で絵は同じだ」と認めてから返す。',
        lines: [
            { who: 'hasan', t: 397.5, en: 'When you make that simple statistical change, the entire picture of poverty changes, and the arguments in your book basically fall apart, do they not?', ja: 'その単純な統計上の変更をすると、貧困の絵は丸ごと変わり、本の議論は崩れる。違いますか?' },
            { who: 'pinker', t: 412.3, en: "That's a rather extreme redefinition. That's multiplying by a factor of six.", ja: 'それはかなり極端な定義変更だ。6倍にしている。' },
            { who: 'pinker', t: 430.9, en: 'Yes, some do, but ... over a wide range of estimates, the picture is the same.', ja: 'いる。でも、幅広い推計で絵は同じだ。' },
        ],
        moves: [
            { name: '相手の陣地の専門家', who: 'hasan', how: '相手の同僚・同じ大学の人を引く。「素人の批判」として退けられない。' },
            { name: '付加疑問で締める', who: 'hasan', how: '..., do they not? / ..., isn\'t it? で終えると、相手は yes か no を言わされる。' },
            { name: '変更に名前を付ける', who: 'pinker', how: '相手の操作を a rather extreme redefinition と呼ぶ。「6倍」と数字で言うと、極端さが見える。' },
            { name: 'Yes, some do, but', who: 'pinker', how: '反対者の存在は認め、結論が揺れない範囲(a wide range of estimates)を示す。' },
        ],
        phrases: [
            { en: "That's a rather extreme redefinition.", ja: 'それはかなり極端な定義の変更だ。', use: '相手が言葉や基準をずらしたとき' },
            { en: 'by a factor of six', ja: '6倍に', use: '倍率を言うとき(by a factor of ten = 10倍)' },
            { en: 'Yes, some do, but ...', ja: 'そういう人もいる。でも……', use: '「反対する人もいる」と言われたときの即答' },
            { en: '..., do they not?', ja: '〜ではないですか?', use: '相手に yes / no を迫る締め' },
        ],
        verdict: 'ピンカーの勝ち。極端さに名前を付けて、議論を元の物差しに引き戻した。',
        askTeacher: 'Do you think $2 a day is a fair line for extreme poverty?',
        sayThis: 'I want to steal "Yes, some do, but" — admit it first, then push back.',
    },
    {
        no: 7, start: 454, title: '情に訴える — 「その人はあなたの顔を見て笑うだろう」',
        topic: '1日1.91ドルで暮らす人に「あなたは極度の貧困じゃない」と言ったら?',
        attack: '数字の議論から、人の顔に切り替える。「北米の中流の学者が」「その人に」「文句を言うなと言ったら」と場面を絵にして、笑われる結末で締める。',
        defense: '「でもその人を20年前と比べたら」と時間の比較に戻す。飢餓死・感染症死の数を並べ、「一番悪い人だけ選べば、良くないに決まっている」と相手の選び方を逆に指摘する。',
        lines: [
            { who: 'hasan', t: 447.9, en: 'If you go to someone living on $1.91 a day and say, "Well, you\'re not in extreme poverty," he or she would probably laugh in your face.', ja: '1日1.91ドルで暮らす人に「あなたは極度の貧困じゃない」と言ったら、たぶん面と向かって笑われる。' },
            { who: 'pinker', t: 458.8, en: 'But if you compared that person to the situation twenty years ago ...', ja: 'でもその人を20年前の状況と比べたら……' },
            { who: 'pinker', t: 475.1, en: "If you cherry-pick the people who are worst off, they're not gonna be very well off.", ja: '一番悪い人だけを選べば、暮らし向きが良くないのは当然だ。' },
        ],
        moves: [
            { name: '数字を顔に変える', who: 'hasan', how: '統計の議論で劣勢になったら、1人の人物の場面に切り替える。聞き手の感情が動く。' },
            { name: '時間で比べる', who: 'pinker', how: '「今その人がどうか」ではなく「20年前と比べてどうか」に軸を戻す。' },
            { name: '相手の技を返す', who: 'pinker', how: 'ラウンド3で自分が言われた cherry-pick を、ここで相手に返した。' },
        ],
        phrases: [
            { en: 'laugh in your face', ja: '面と向かって笑う', use: '相手の主張が現場では通じないと言うとき' },
            { en: 'If you compared ... to ... twenty years ago', ja: '20年前と比べれば', use: 'テーマ2の譲歩(前進は本物だ)の根拠' },
            { en: 'the worst off', ja: '一番暮らし向きの悪い人たち', use: 'the better off / the worse off とセットで' },
        ],
        verdict: '司会の勝ち。場面の力は強く、ピンカーの返しは正しいが冷たく聞こえた。',
        askTeacher: 'If you met someone living on two dollars a day, what would you say to them?',
        sayThis: 'This is where Hasan won, I think. He turned the numbers into a real person.',
    },
    {
        no: 8, start: 475, title: '格差 — 「それ自体は幸福の一面ではない」',
        topic: '世界銀行・IMF も格差を問題視している。格差は殺人・収監・乳児死亡・心の病と結びつく、という研究がある',
        attack: '権威ある機関の名前を並べ(World Bank, IMF)、本(The Spirit Level)を挙げ、さらに「1970年代から300本の論文」と数で押す。',
        defense: '「その本の主張は検証されて否定された」と1本ずつ崩し、数で押されると「格差は他の多くのもの(経済の発展・教育・女性の権利)とも相関する。問題は相関ではなく因果だ」と、論文の数を論点から外す。',
        lines: [
            { who: 'pinker', t: 505.3, en: 'For one thing, the claims of The Spirit Level have been evaluated and shown to be false.', ja: 'まず、その本の主張は検証され、誤りだと示されている。' },
            { who: 'pinker', t: 548.2, en: 'The question is not whether there\'s a first-order correlation, but whether you can show it to be causal.', ja: '問題は相関があるかではなく、因果だと示せるかだ。' },
            { who: 'hasan', t: 554.3, en: 'Causation and correlation, as you know, is a real problem — and some say that\'s a problem in your book.', ja: '因果と相関は、ご存じの通り本当に厄介だ。そしてそれはあなたの本の問題でもある、と言う人がいる。' },
        ],
        moves: [
            { name: '権威を並べる', who: 'hasan', how: '機関名と論文の本数で、「あなた1人対世界」の構図を作る。' },
            { name: 'For one thing', who: 'pinker', how: '反論を「まず1つ目に」と番号付きで始めると、まだ続きがあると聞こえる。' },
            { name: '相関と因果', who: 'pinker', how: '「AとBが一緒に起きる」には「Cが両方を起こしているかもしれない」。数の多さを無効にできる。' },
            { name: '武器を奪い返す', who: 'hasan', how: '相手が使った「相関と因果」を、そのまま相手の本に向けた。' },
        ],
        phrases: [
            { en: 'For one thing, ...', ja: 'まず1つには', use: '反論の1つ目(二次の質疑でそのまま使える)' },
            { en: 'correlation is not causation', ja: '相関は因果ではない', use: '「AだからB」と言われたときの定番の返し' },
            { en: 'not whether ..., but whether ...', ja: '〜かどうかではなく、〜かどうかだ', use: '論点を言い換えて、相手の土俵から出る' },
        ],
        verdict: '司会の勝ち。ピンカーの「相関と因果」を、そのままピンカーの本に返した一撃が効いた。',
        askTeacher: 'Is inequality itself a problem, or only poverty?',
        sayThis: 'Pinker said correlation isn\'t causation, and Hasan used the same point against his book. Brilliant.',
    },
    {
        no: 9, start: 557, title: '靴とジーンズ — 「それは藁人形だ」',
        topic: '本の「雇う側も雇われる側も同じ靴、同じ携帯、同じテレビ」という一文 vs 米国の上位1%と下位1%の寿命差15年',
        attack: '相手の本の軽い一文と、重い数字(寿命の差15年)を並べて、「でも心配ない、同じ靴を履いている」と皮肉でまとめる。',
        defense: '「心配するなとは言っていない。起きた前進を認めよう、と言っているだけだ」と言い分を言い直す。「上位1%を早死にさせれば格差は縮む。それが進歩か?」と、格差を目標にする考えの極端な帰結を示す。司会に藁人形だと言われると「格差を問題の中心に置くと、そういう帰結になる」と返す。',
        lines: [
            { who: 'hasan', t: 585.4, en: 'And you tell us, "Don\'t worry, they have the same shoes and jeans."', ja: 'そしてあなたは言う。「心配ない、同じ靴とジーンズを履いている」と。' },
            { who: 'pinker', t: 591.1, en: "It's not the insinuation. It's: let's appreciate the progress that has happened. It doesn't mean there are no more problems to be solved.", ja: 'そういう含みではない。起きた前進を認めよう、ということだ。解くべき問題がもう無いという意味ではない。' },
            { who: 'pinker', t: 622.5, en: 'The goal should not be reducing inequality — as if, if we got the top 1% to die earlier, that would be progress.', ja: '目標は格差を縮めることではない。上位1%を早死にさせたら進歩だ、ということになってしまう。' },
            { who: 'hasan', t: 631.6, en: "I think that's a straw man.", ja: 'それは藁人形(わら人形論法)だと思う。' },
            { who: 'pinker', t: 640.2, en: 'Those are two very different ways of stating these.', ja: 'それは2つのまったく違う言い方だ。' },
        ],
        moves: [
            { name: '軽い一文 × 重い数字', who: 'hasan', how: '相手の文の軽さと、事実の重さを並べると、相手が冷たく見える。' },
            { name: '含みを否定して言い直す', who: 'pinker', how: 'It\'s not the insinuation. It\'s ... で、相手の解釈を外し、自分の言い分を短く言い直す。' },
            { name: '極端な帰結', who: 'pinker', how: '「その目標を真面目に追うと、こうなる」と極端な例を出して、目標の立て方そのものを疑わせる。' },
            { name: '藁人形の指摘', who: 'hasan', how: '相手が極端な例を出したら「誰もそんなことは言っていない(straw man)」で切る。' },
        ],
        phrases: [
            { en: "It's not the insinuation.", ja: 'そういう含みではない。', use: '言っていないことを言ったことにされたとき' },
            { en: "Let's appreciate the progress that has happened.", ja: '起きた前進を認めよう。', use: 'テーマ2の譲歩' },
            { en: "It doesn't mean there are no more problems to be solved.", ja: 'もう問題が無いという意味ではない。', use: '前進を言ったあと、楽観しすぎに見えないための1文' },
            { en: "That's a straw man.", ja: 'それは藁人形論法だ。', use: '相手が自分の主張を極端にゆがめたとき' },
        ],
        verdict: '司会の勝ち。寿命15年の数字の前で、「同じ靴」の一文は守りきれなかった。ただしピンカーの「前進を認めよう、問題が無いとは言っていない」は、そのまま盗める。',
        askTeacher: 'Is it fair to say rich and poor people live similar lives today because they have the same phones?',
        sayThis: 'I want to use his line: "Let\'s appreciate the progress, but it doesn\'t mean there are no more problems to be solved."',
    },
    {
        no: 10, start: 640, title: '気候変動 — 「その2つは別の話だ」',
        topic: '「人類は取り返しのつかない生態系の自殺に向かってはいない」という本の一文 vs NASA の元科学者 James Hansen の警告',
        attack: '権威ある科学者の強い言葉(文明の織物を脅かす)を引き、相手の文を「軽率だ」と評する。「現場の人はみんな頭を抱えている、流れは悪い方向だ」と現場の声で押す。',
        defense: '「その点は Hansen と完全に同意する」と相手の権威を自分の側に引き込む。「流れが悪い」には「流れが悪いことと、何をしても無駄なことは別の話だ」と、相手の文を2つに割る。',
        lines: [
            { who: 'pinker', t: 670.3, en: 'There, I agree completely with Jim Hansen. He would say the exact same thing.', ja: 'そこは Jim Hansen に完全に同意する。彼もまったく同じことを言うだろう。' },
            { who: 'hasan', t: 734.4, en: "The trend is in the wrong direction. Things aren't getting better.", ja: '流れは悪い方向だ。良くなっていない。' },
            { who: 'pinker', t: 737, en: "The trend is in the wrong direction, but that doesn't mean that nothing could work. Those are two different statements.", ja: '流れは悪い方向だ。でも、それは何をしても無駄だという意味ではない。その2つは別の話だ。' },
        ],
        moves: [
            { name: '権威を引き込む', who: 'pinker', how: '相手が引いた専門家に「私も同意見だ」と言うと、権威が自分の側に移る。' },
            { name: '相手の文を2つに割る', who: 'pinker', how: '「悪い流れ」と「打つ手が無い」は別の主張だ、と分ける。前半を認めて、後半だけ否定できる。' },
        ],
        phrases: [
            { en: 'I agree completely with ... He would say the exact same thing.', ja: '〜に完全に同意する。彼もまったく同じことを言うだろう。', use: '相手が引いた権威を、自分の味方にする' },
            { en: "That doesn't mean that ...", ja: 'だからといって〜ということにはならない', use: '相手の事実を認めつつ、結論だけ否定する' },
            { en: 'Those are two different statements.', ja: 'それは2つの別の話だ。', use: '相手が2つの主張を混ぜたとき' },
        ],
        verdict: 'ピンカーの勝ち。今夜の番組で一番盗める技(文を2つに割る)。',
        askTeacher: 'Are you optimistic or pessimistic about climate change?',
        sayThis: 'My favorite move: "The trend is in the wrong direction, but that doesn\'t mean nothing could work. Those are two different statements."',
    },
    {
        no: 11, start: 742, title: '条件付きの楽観 — 「確率はゼロよりかなり大きい」',
        topic: '楽観の根拠は何か。気候変動に勝てる確率は?',
        attack: '「楽観の根拠は?」と根拠を迫り、「確率で言うと?」と数字で答えさせようとする(nail you down = 逃げ場を無くす)。',
        defense: '「これは容赦なく楽観的な本ではない、現実的な本だ」と自分の立場を言い直し、「条件付きで楽観していい」と条件を付ける。確率を迫られると「ゼロよりかなり大きい」とだけ答え、数字は出さない。',
        lines: [
            { who: 'pinker', t: 746.9, en: "This is not a relentlessly optimistic book. It's a realistic book.", ja: 'これは容赦なく楽観的な本ではない。現実的な本だ。' },
            { who: 'pinker', t: 753.6, en: 'We can be conditionally optimistic — that is, if we take these steps.', ja: '条件付きで楽観していい。つまり、こういう手を打てば。' },
            { who: 'hasan', t: 765.3, en: "Since we're trying to nail you down on this ...", ja: 'この点ではっきりさせたいので……' },
            { who: 'pinker', t: 777.2, en: 'I think the probability is significantly greater than zero.', ja: '確率は、ゼロよりかなり大きいと思う。' },
            { who: 'hasan', t: 781.4, en: 'How much greater than zero?', ja: 'ゼロよりどれくらい大きい?' },
        ],
        moves: [
            { name: 'ラベルを貼り替える', who: 'pinker', how: '「楽観的な本」というラベルを「現実的な本」に貼り替える。言葉1つで立場が変わる。' },
            { name: '条件を付ける', who: 'pinker', how: '「楽観していい、もし〜なら」。条件を付けると、外れても嘘にならない。' },
            { name: '数字を迫る', who: 'hasan', how: '「どれくらい?」と数字を迫り、曖昧な答えを曖昧なまま見せる。' },
            { name: '数字を出さない', who: 'pinker', how: '迫られても数字を出さない。出した数字は次の攻撃の的になる。' },
        ],
        phrases: [
            { en: 'We can be conditionally optimistic.', ja: '条件付きで楽観していい。', use: 'テーマ2の1文目・結論' },
            { en: "It's not a ... book. It's a realistic book.", ja: '〜な本ではない。現実的な本だ。', use: '貼られたラベルを貼り替える' },
            { en: 'nail someone down', ja: '(人を)はっきりさせる、逃げ場を無くす', use: '曖昧な答えをする相手に' },
            { en: 'significantly greater than zero', ja: 'ゼロよりかなり大きい', use: '確率や可能性を、数字を出さずに言う' },
        ],
        verdict: '司会の勝ち。「どれくらい?」に答えられなかった所で、楽観の根拠が薄く見えた。',
        askTeacher: 'Is "conditionally optimistic" a strong position, or just a safe one?',
        sayThis: 'When Hasan asked "How much greater than zero?", Pinker had no number. That was his weakest moment.',
    },
    {
        no: 12, start: 785, title: '締め — 「誰がゼロと言った?」',
        topic: '書評家も「藁人形を立てて大きな主張をしている」と言っている / 気候学者でもないのに',
        attack: '書評(New York Times, Guardian など)の名前を並べて「みんなそう言っている」。最後は「心理学者が気候変動を語る資格は?」と専門外を突く。',
        defense: '「誰がゼロと言った?」と相手の言い換えを指摘。資格を問われると「危機は解決できるかもしれない、というのは大きな主張ではない」と、自分の主張を小さく言い直す。',
        lines: [
            { who: 'pinker', t: 801.7, en: "Who's saying zero? Nobody's saying zero.", ja: '誰がゼロと言った? 誰も言っていない。' },
            { who: 'pinker', t: 828.4, en: "It's not true that we're not doing anything about it.", ja: '何もしていない、というのは事実ではない。' },
            { who: 'hasan', t: 865.4, en: "How does that make you qualified to make these kinds of sweeping claims when you're not a climate scientist yourself?", ja: '気候学者でもないあなたが、こんな大きな主張をする資格がどこにある?' },
            { who: 'pinker', t: 875, en: "The idea that it's possible that we will solve a crisis is not a sweeping claim.", ja: '危機を解決できるかもしれない、という考えは大きな主張ではない。' },
        ],
        moves: [
            { name: '書評を並べる', who: 'hasan', how: '有名な媒体の名前を並べると「世論」の形になる。' },
            { name: '言い換えを指摘', who: 'pinker', how: 'Who\'s saying ~? で、相手が自分の主張を勝手に強めたことを示す。' },
            { name: '資格を問う', who: 'hasan', how: '中身ではなく、話す人の資格を問う。最後の一撃に多い。' },
            { name: '主張を小さく言い直す', who: 'pinker', how: '大きな主張だと言われたら、主張を最小の形に言い直す。小さい主張は崩せない。' },
        ],
        phrases: [
            { en: "Who's saying that? Nobody's saying that.", ja: '誰がそんなこと言った? 誰も言っていない。', use: '相手が自分の主張を勝手に強めたとき' },
            { en: 'sweeping claims', ja: '大ざっぱで大きな主張', use: '相手の一般化を批判するとき' },
            { en: "It's not true that ...", ja: '〜というのは事実ではない', use: '相手の前提を1文で否定する' },
        ],
        verdict: '引き分け。最後の資格の質問には、ピンカーは主張を小さくしてかわした。',
        askTeacher: 'Who won the debate, in your opinion?',
        sayThis: 'In my opinion, Pinker won on the numbers, but Hasan won on the human side.',
    },
];

/** 全体の見立てと、テーマ2への持ち帰り */
export const DEBATE_TAKEAWAYS = {
    score: 'ピンカー 5勝、司会 4勝、引き分け 3。数字の論点はピンカー、人と場面の論点は司会。',
    hasanKit: [
        '第三者の声を借りる(Critics say / Some scholars say)',
        '相手の文を読み上げてから、重い事実と並べる',
        '物差しを変えて、逆向きの数字を出す',
        '数字を1人の人物の場面に変える',
        '相手の武器(相関と因果)を、そのまま相手に返す',
        '付加疑問で yes / no を迫る(..., do they not?)',
    ],
    pinkerKit: [
        '短く否定してから、すぐ根拠(Totally wrong. ... We all agree on ...)',
        '相手の前提を先に認める(Of course the definition is going to be arbitrary.)',
        '量ではなく向きで答える(the direction is down)',
        '分母を出す(What\'s relevant is the proportion.)',
        '相手の文を2つに割る(Those are two different statements.)',
        'ラベルを貼り替える(not an optimistic book — a realistic book)',
    ],
    forTheme2: [
        '1文目に使う — We can be conditionally optimistic.',
        '1点目(貧困は相対的)の裏付け — What\'s relevant is the proportion. / No matter what cutoff you set, the direction is down.',
        '譲歩 — Let\'s appreciate the progress that has happened. It doesn\'t mean there are no more problems to be solved.',
        '質疑で「でも○○の人はまだ貧しい」と言われたら — The trend is in the wrong direction for them, but that doesn\'t mean nothing could work. Those are two different statements.',
        '質疑で「専門家も反対している」と言われたら — Yes, some do, but over a wide range of estimates, the picture is the same.',
    ],
};

/** 先生と見るときの進め方 */
export const DEBATE_HOWTO = [
    'チャットに動画のリンクを貼る。画面共有でこのページを見せる',
    '「再生」で1ラウンドだけ流す(長くても1分半)。終わったら止める',
    '「このラウンドで言う一言」を言ってから、「先生に聞くこと」を聞く',
    '先生の答えに1往復だけ返して、次のラウンドへ。25分なら4〜5ラウンドで足りる',
    '最後に Who won the debate, in your opinion? と聞いて締める',
];
