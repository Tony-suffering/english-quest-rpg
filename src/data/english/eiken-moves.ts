/**
 * MOVES -- 徹底的に磨く24の言い回し。THEME 30 の本当の核。
 *
 * 【これが何か】
 * 30テーマは「的」で、覚える本体はこの24本。どの試験問題が来ても、
 * 答えは ムーブの組み合わせ + テーマから借りた事実 + 小さな新しい具体例 で組める。
 * だから30テーマの全行に「どのムーブを担いでいるか」のタグ(m)が付く。
 * タグ = その行を覚える根拠。タグのない行は存在してはいけない。
 *
 * 【sig について】
 * sig は署名の一行。ここに書いた形をそのまま口に焼き付ける。
 * [X] は差し替え点。vars は同じムーブの別の出だし(詰まったときの逃げ道)。
 *
 * 【分類】
 *   open   = 開く(質問を掴む・枠を作る)
 *   argue  = 論じる(議論の中身を作る)
 *   speak  = 喋る(口語のリズムと絵を作る)
 *   close  = 締める(着地と誠実さ)
 */

export type MoveKind = 'open' | 'argue' | 'speak' | 'close';

export interface Move {
    id: string;
    no: number;
    kind: MoveKind;
    label: string;    // 日本語の呼び名
    en: string;       // 英語の呼び名
    sig: string;      // 署名の一行。これを暗記する
    sigJa: string;
    vars: string[];   // 別の出だし(2つ)
    when: string;     // いつ抜くか
    why: string;      // 覚える根拠。なぜこの一本が試験全体に効くのか
}

export const MOVES: Move[] = [
    // ============ open 開く ============
    {
        id: 'reframe', no: 1, kind: 'open', label: '掴み直し', en: 'Reframe',
        sig: "So we are really asking [X]. Okay.",
        sigJa: "つまり本当の問いは[X]ですね。よし。",
        vars: ["So the question underneath this is [X].", "Let me say the question back. [X]. Right?"],
        when: "全問の1行目。お題を自分の言葉で言い直す",
        why: "応答の採点は「質問を理解したか」から始まる。この一行がその合図になり、しかも考える時間を3秒買う。全30テーマの冒頭で同じ形が使えるので、1本で30回働く",
    },
    {
        id: 'define', no: 2, kind: 'open', label: '語の定義から入る', en: 'Define The Word',
        sig: "Depends what we mean by [X]. Half the argument is people answering two different questions.",
        sigJa: "[X]で何を指すか次第だ。議論の半分は、別々の問いに答えている人同士でできている。",
        vars: ["Before I pick a side, what does [X] mean here?", "The word [X] is doing a lot of work in that question."],
        when: "success / fair / necessary / happiness 型の抽象語が入ったお題",
        why: "抽象語を含むお題は毎回必ず出る。定義を先に置くと、以降の主張が全部「その定義の上で」正当化され、反論も定義に付き合わされる。守りと攻めを同時にやる一行",
    },
    {
        id: 'concede-pivot', no: 3, kind: 'open', label: '認めてから returns', en: 'Concede Then Pivot',
        sig: "That is a fair worry. It is just not what the numbers show.",
        sigJa: "もっともな心配だ。ただ、数字はそう出ていない。",
        vars: ["I get the fear. The data just points the other way.", "Half true. And the half that is true is not the half that matters."],
        when: "Q&Aで反論されたとき。潰さずに一度抱えてから返す",
        why: "追加質問は必ず4問来る。全部にこの形で入れば、喧嘩腰にならずに毎回自分の側へ戻れる。Q&Aの10点をこの一本が支える",
    },

    // ============ argue 論じる ============
    {
        id: 'who-pays', no: 4, kind: 'argue', label: '誰が払うか', en: 'Who Pays',
        sig: "Somebody always eats the cost, and it is usually not the people writing the policy.",
        sigJa: "誰かが必ず負担を飲む。そしてそれは、たいてい政策を書いている人ではない。",
        vars: ["The average person does not exist. Somebody specific pays.", "Fine. Now tell me who absorbs the damage."],
        when: "政策・規制・税・変化のお題ほぼ全部",
        why: "どんな総論賛成の議論も、この一問で一段深くなる。30テーマ中10本以上で主砲になる、単発で最も守備範囲の広い弾",
    },
    {
        id: 'compare', no: 5, kind: 'argue', label: '何と比べて', en: 'Compared To What',
        sig: "Compared to what? Not compared to perfect. Compared to what we would actually get instead.",
        sigJa: "何と比べて？ 完璧とじゃない。実際に代わりに手に入るものと比べてだ。",
        vars: ["It loses to a system that does not exist.", "Show me the replacement, then we can talk."],
        when: "「〜は不十分だ/欠陥がある」型の批判に返すとき",
        why: "批判は必ず理想と比較してくる。比較対象を現実に引き戻すだけで議論の主導権が返ってくる。防御の弾として全テーマ共通で効く",
    },
    {
        id: 'tried', no: 6, kind: 'argue', label: 'もう試されている', en: 'Already Tried',
        sig: "We do not have to guess. Somebody already ran this experiment.",
        sigJa: "推測は要らない。誰かがもうこの実験を走らせている。",
        vars: ["This stopped being a thought experiment years ago.", "Go and look. The results are in."],
        when: "仮説論争(できるか/うまくいくか)を実例論争に引き下ろすとき",
        why: "理屈で戦うと相手の理屈と引き分けになる。実例を一つ置けば、相手は実例で返すしかなくなる。最も安全に点が取れる論法で、国名を差し替えれば全分野で使える",
    },
    {
        id: 'scale', no: 7, kind: 'argue', label: '規模が正体を変える', en: 'Scale Changes It',
        sig: "A campfire and a forest fire are the same chemistry. Nobody calls them the same problem.",
        sigJa: "焚き火と山火事は同じ化学反応だ。同じ問題だと呼ぶ人はいない。",
        vars: ["Past a certain size, more of a thing becomes a different thing.", "Nine listeners in a bar. Two million online. Not the same act."],
        when: "「昔からあった」への返し。SNS・監視・グローバル化",
        why: "「昔からあった」は最頻出の反論で、これ一本で毎回無効化できる。比喩が絵になっているので、数字を忘れても主張が立つ",
    },
    {
        id: 'speed', no: 8, kind: 'argue', label: '方向ではなく速度', en: 'Speed Not Direction',
        sig: "It is not the direction that worries me. It is the speed.",
        sigJa: "怖いのは方向じゃない。速度だ。",
        vars: ["The last time this happened, people got a whole life to adjust.", "Fine in a century. Brutal in a decade."],
        when: "技術・自動化・社会変化。全否定せず留保を付けたいとき",
        why: "賛成でも反対でもない第三の立ち位置を3秒で作れる。試験官の「単純すぎる二択」の印象を消し、追加質問も速度の話に誘導できる",
    },
    {
        id: 'counted', no: 9, kind: 'argue', label: '数えた数字に従う', en: 'What Gets Counted',
        sig: "People do not follow the goal. They follow the number you count.",
        sigJa: "人は目標には従わない。数えると決めた数字に従う。",
        vars: ["Announce the measure and you have announced the behaviour.", "The score went up. The thing it stood for went down."],
        when: "評価・報酬・テスト・ランキング・KPIのお題",
        why: "教育とビジネスのお題で必ず一度は撃てる。制度批判が「意図が悪い」ではなく「構造がそうなる」になるので、大人の議論に聞こえる",
    },
    {
        id: 'undo', no: 10, kind: 'argue', label: '取り消しボタン', en: 'The Undo Button',
        sig: "Every other mistake comes with an undo button. This one does not.",
        sigJa: "他の失敗には取り消しボタンが付いている。これには付いていない。",
        vars: ["A mistake you can fix is a setback. This kind is something else.", "Forever you can undo. This you cannot."],
        when: "死刑・環境・遺伝子・絶滅。不可逆なものすべて",
        why: "倫理系の重いお題で、道徳論に入らずに立場を立てられる唯一の弾。道徳論は追及されると崩れるが、可逆性の議論は崩しようがない",
    },
    {
        id: 'both-true', no: 11, kind: 'argue', label: '両方とも本当', en: 'Both Are True',
        sig: "Both of those are true at the same time. The question is which problem we would rather have.",
        sigJa: "その両方が同時に本当だ。問いは、どちらの問題なら抱えられるかだ。",
        vars: ["Nobody here is lying. The two things just both happen.", "It does the good thing and the harm. Same tool, same day."],
        when: "賛否が拮抗するお題の掴み。Q&Aで対立を解くとき",
        why: "堂々巡りの議論を一段上から閉じられる。両論併記(減点)と違い、最後に必ず片側へ降りる形なので安全。Q&Aで最も頻繁に使う",
    },
    {
        id: 'feel-vs-fact', no: 12, kind: 'argue', label: '体感と数字のずれ', en: 'Feeling vs Numbers',
        sig: "The numbers went down and the feeling went up. Both are real, but only one is the world.",
        sigJa: "数字は下がり、体感は上がった。どちらも本物だが、世界のほうは片方だけだ。",
        vars: ["We are not living through more of it. We are watching all of it.", "You cannot tell people their gut is wrong. But you can show them the graph."],
        when: "犯罪・治安・病気・若者論。「みんな感じている」への返し",
        why: "世論と事実がずれるお題は毎回出る。世論を馬鹿にせずに(「体感も本物」)事実側へ立てるので、感じの悪さゼロで数字を出せる",
    },
    {
        id: 'trust-infra', no: 13, kind: 'argue', label: '信頼はインフラ', en: 'Trust Is Plumbing',
        sig: "Trust takes decades to build and an afternoon to lose.",
        sigJa: "信頼は築くのに数十年、失うのに半日しかかからない。",
        vars: ["Trust is like plumbing. Nobody thanks you for it until it fails.", "You can be completely right and still lose the room."],
        when: "報道・政治・医療・ワクチン・企業。制度の話を人間の話に戻すとき",
        why: "「正しさ」の議論を「信じてもらえるか」の議論に移す一本。科学や制度のお題で、知識で勝負せずに一段深い所へ降りられる",
    },
    {
        id: 'middle-years', no: 14, kind: 'argue', label: '間の二十年', en: 'The Twenty Years In The Middle',
        sig: "I am fine with the ending. I am worried about the twenty years in the middle, because that is where people live.",
        sigJa: "結末には賛成だ。心配なのは間の二十年で、人間はそこに住んでいる。",
        vars: ["Long term, it works out. People do not live in the long term.", "Being right about the destination does not plan the journey."],
        when: "「長期的には良い」型の議論すべて。自動化・脱炭素・改革",
        why: "賛成しながら最も鋭い留保を付けられる。楽観にも悲観にも与しない位置が一行で取れて、その後の具体例(炭鉱町)に直結する",
    },
    {
        id: 'switch', no: 15, kind: 'argue', label: '誰がスイッチを握るか', en: 'Who Holds The Switch',
        sig: "Before you build the switch, ask what happens when the other side holds it.",
        sigJa: "スイッチを作る前に、それを向こう側が握った日のことを考えろ。",
        vars: ["The rule outlives the people who wrote it.", "Written for the worst man. Used on the ordinary one."],
        when: "規制・検閲・監視・緊急権限。権力を作るお題",
        why: "権力系のお題は「賛成/反対」より「誰が運用するか」で答えるほうが一段深い。左右どちらの試験官にも刺さる中立の深さが出る",
    },
    {
        id: 'future-bill', no: 16, kind: 'argue', label: '未来からの借金', en: 'A Loan From The Future',
        sig: "It is not a saving. It is a loan from people who cannot vote yet.",
        sigJa: "それは節約じゃない。まだ投票できない人たちからの借金だ。",
        vars: ["The bill did not disappear. It changed whose name is on it.", "Cheap today because somebody else pays later."],
        when: "先送り・年金・国債・環境・インフラ",
        why: "「今は安い」の正体を一行で暴ける。世代の話に接続するので、環境からも財政からも家族からも同じ一本で入れる",
    },

    // ============ speak 喋る ============
    {
        id: 'echo', no: 17, kind: 'speak', label: '同じ形で二度打つ', en: 'The Echo',
        sig: "We asked for workers. We got people.",
        sigJa: "労働力を頼んだ。人間が来た。",
        vars: ["We wanted [X]. We built [Y].", "They promised [X]. They delivered [Y]."],
        when: "主張の山場。文法を単純に保ったまま強く聞こえさせたいとき",
        why: "同じ構文の反復は、詰まり防止の保険と、ネイティブの喋りのリズムを同時に作る。難しい語彙ゼロで「うまい」と思わせる、発音/流暢さの点に直接効く唯一のムーブ",
    },
    {
        id: 'one-number', no: 18, kind: 'speak', label: '数字は一発だけ', en: 'One Big Round Number',
        sig: "Rich countries send about two hundred billion in aid. The people who left send home about three times that.",
        sigJa: "豊かな国の援助は約二千億ドル。国を出た人たちの仕送りはその約三倍。",
        vars: ["Close to two hundred people. Some after twenty years.", "That is a city. Every year."],
        when: "証拠を置くとき。1スピーチに数字は1〜2発まで",
        why: "数字を並べると覚えられず、間違えると一番痛い。「一発だけ、丸めて、比較付きで」の型なら暗記も安全も両立する。外しても about が保険になる",
    },
    {
        id: 'picture', no: 19, kind: 'speak', label: '絵にする', en: 'Make It A Picture',
        sig: "That is not a statistic. That is a city, disappearing, every year.",
        sigJa: "それは統計じゃない。都市がひとつ、毎年、消えているということだ。",
        vars: ["Put it in one street and look again.", "Three weeks of party. Forty years of maintenance."],
        when: "抽象論が2文続いたら必ず。数字を出した直後が最適",
        why: "試験官は一日中抽象論を聞いている。絵が出た瞬間だけ顔が上がる。「具体例を言え」という採点基準を、例の暗記ではなく変換の型で満たせる",
    },
    {
        id: 'rename', no: 20, kind: 'speak', label: '名前を付け替える', en: 'Rename It',
        sig: "It is not charity. It is a customer list.",
        sigJa: "慈善じゃない。顧客名簿だ。",
        vars: ["That is not caution. That is a choice nobody wants to sign.", "Not a safety net. A filter."],
        when: "議論の核心を一撃で見せたいとき。ジョークの土台にもなる",
        why: "「Xではない。Yだ。」は、長い分析を6語に圧縮する型。ジョークの大半はこの形から作れるので、笑いの再現性がここから出る",
    },
    {
        id: 'self-joke', no: 21, kind: 'speak', label: '自分から笑う', en: 'Laugh At Yourself First',
        sig: "I have nothing to hide, and I would still rather you did not read my search history.",
        sigJa: "やましいことは何もない。それでも検索履歴だけは読まないでほしい。",
        vars: ["I believed that for years, so I am allowed to laugh at it.", "Ask me when it is my salary. I become an economist too."],
        when: "説教くさくなりそうな瞬間。環境・健康・道徳系のお題",
        why: "他人を撃つ笑いは事故るが、自分を撃つ笑いは事故らない。先に自分を降ろすと、直後の主張が説教ではなく分析として通る。試験で唯一安全な笑いの型",
    },

    // ============ close 締める ============
    {
        id: 'own-cost', no: 22, kind: 'close', label: '代償を自分で言う', en: 'Own The Cost',
        sig: "That is a real cost, and I am not going to pretend it away.",
        sigJa: "それは本物の代償だ。無かったふりはしない。",
        vars: ["My side has to prove more here, and that is fair.", "If you cannot accept that price, you belong on the other side."],
        when: "自説の一番痛い所に、聞かれる前に自分で触れるとき",
        why: "弱点は必ず突かれる。先に自分で言えば、突かれる質問が一つ消え、誠実さの印象が全採点観点に波及する。上級者にしか出せない一手が一行で買える",
    },
    {
        id: 'land-short', no: 23, kind: 'close', label: '短く着地する', en: 'Land Short',
        sig: "Forever you can undo.",
        sigJa: "一生なら、取り消せる。",
        vars: ["Do it properly or do not do it.", "I care that we do it."],
        when: "スピーチと各回答の最後の一文。6語以内",
        why: "長い結論は尻すぼみに聞こえ、短い結論は確信に聞こえる。「最後だけ短く」は準備で作れる数少ない印象操作で、2分の時間管理の保険にもなる(短い結論はいつでも打てる)",
    },
    {
        id: 'my-story', no: 24, kind: 'close', label: '自分の話を一枚', en: 'The Personal Card',
        sig: "I should say, this one is not abstract for me.",
        sigJa: "先に言っておくと、これは俺にとって抽象的な話じゃない。",
        vars: ["I watched this happen to my own family.", "I am not neutral here, and I would rather admit it."],
        when: "1スピーチに1回まで。導入か結論で",
        why: "面接で最も差がつく瞬間は、暗記が体温に変わる瞬間。実話を1つ固定しておけば、仕事・家族・教育・自動化のどのお題からでも同じ話に降りられる",
    },
];

export const MOVE_BY_ID: Record<string, Move> =
    Object.fromEntries(MOVES.map((m) => [m.id, m]));

export const MOVE_KINDS: { kind: MoveKind; label: string; note: string }[] = [
    { kind: 'open', label: '開く', note: '質問を掴む・枠を作る' },
    { kind: 'argue', label: '論じる', note: '議論の中身。13本' },
    { kind: 'speak', label: '喋る', note: '口語のリズムと絵' },
    { kind: 'close', label: '締める', note: '着地と誠実さ' },
];
