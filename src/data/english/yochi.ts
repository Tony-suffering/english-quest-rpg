/**
 * 文法災害予知 — とにお英語調査委員会「長期評価」
 *
 * ■ なぜこの器が要るのか
 * 既存の器は全部「終わった夜」を扱う。検死(lesson-reviews)、番組(dmm-show)、
 * スコア(tonio-league)、町(town-state) — どれも事後である。
 * だが第87夜(2026-08-18)、この男は「必ず来ると分かっているのに誰も備えない」を
 * 25分かけて東京の住民について語り、その25分のあいだ、4夜連続の宿題を消化しなかった。
 * 主題と症状が完全に一致した。だから、この番組にはもう一つだけ器が要る — 事前の器である。
 *
 * ■ 何をするページか
 * 1) 長期評価  — 各持病が「次の25分で発生する確率」を、直近N夜の実測から計算して出す
 * 2) 予知の台帳 — 過去に自分で出した宿題(=予知)と、翌夜の実測結果の突き合わせ
 * 3) 前兆現象  — 事故の直前に必ず観測されている挙動
 *
 * ■ 鉄の掟(この番組の証拠主義をここでも守る)
 * - 確率は kenshi-lessons.ts の実データから計算する。手で数字を書かない。
 * - 台帳の「結果」は、翌夜の検死に載っている実発話だけを根拠にする。
 * - 分母が小さいことは隠さない。サンプル数を必ず一緒に出す。
 */

import { kenshiLessons, type KenshiLesson } from './kenshi-lessons';

/** 震源域 = 持病。判定は pattern / spoke の文字列マッチで行う(手集計しない) */
export interface FaultLine {
    id: string;
    name: string;           // 持病の名前
    zone: string;           // 震源域っぽい呼び名(番組の語彙)
    match: RegExp;          // kenshi の pattern に対する判定
    drill: string;          // 発生したときに撃つ1文
    note: string;           // 生態
}

export const FAULT_LINES: FaultLine[] = [
    {
        id: 'third-s',
        name: '三単現の s / every・everybody の単複',
        zone: '「みんな」断層帯',
        match: /#2|三単現|every|単複/i,
        drill: 'Every Japanese person knows about it.',
        note: '日本語の「みんな」は複数の感覚なので、every のあとで名詞が複数に開き、動詞から s が消える。07-01「every legal citizens have」以来、この記録の中で**一度も直っていない唯一の持病**。',
    },
    {
        id: 'article-a',
        name: '冠詞 a の欠勤・誤出勤',
        zone: '冠詞海溝',
        match: /#14|冠詞|a落ち|限定詞/i,
        drill: "You're a very important part of my life.",
        note: '形容詞が2語以上に伸びると a を置き忘れる。相手を大事だと言った瞬間に消える傾向があり、感情で動いている疑いが濃い。逆に不可算名詞や国籍の前には湧く。',
    },
    {
        id: 'article-the',
        name: '冠詞 the の過剰',
        zone: 'ザ・プレート',
        match: /#1(?!\d)|the の過剰|the過剰/i,
        drill: 'At night, at McDonald’s, in Tokyo.',
        note: '副詞・時間帯・店名・都市名など、the が要らない場所に置く。抽象名詞だけでなく固有名詞にも出る。',
    },
    {
        id: 'sniper',
        name: '1音違いの狙撃失敗',
        zone: '同音異義帯',
        match: /#13|1音違い|語選び|狙撃|取り違え/i,
        drill: 'I live in Saitama and work in Tokyo.',
        note: '狙う語は毎回正しく、着弾が1音ずれる。work/walk、kill/cure、live/leave のように**意味が正反対に反転する型**が最も危険。処方は発音練習ではなく、発話の0.5秒前に「反対語じゃないか」を1回疑うこと。',
    },
    {
        id: 'object-it',
        name: '目的語 it の脱落',
        zone: '「それ」欠落帯',
        match: /#26|目的語/i,
        drill: 'That explains it. / I really enjoyed it.',
        note: '日本語には最初から無い部品なので、動詞だけが宙に浮く。引用と定型では出勤し、自分の主張のときだけ休む。',
    },
    {
        id: 'be-double',
        name: 'be動詞の欠落・二重',
        zone: 'ビー・ダブル帯',
        match: /#10|be動詞|be\+|be落ち|二重/i,
        drill: "That's how the paradox happens.",
        note: 'be と一般動詞が同席する(that’s cultivates 型)か、be が丸ごと落ちる。that’s のあとに動詞を置きたくなったら how を1枚挟む。',
    },
    {
        id: 'prep',
        name: '前置詞の貼りすぎ・剥がしすぎ',
        zone: '前置詞トラフ',
        match: /#8|前置詞/i,
        drill: 'You have to prepare for that kind of impact.',
        note: '要らない to/with を貼り、要る for/to/on を剥がす。同じ夜に両方起きることがある。',
    },
    {
        id: 'double-neg',
        name: '二重否定',
        zone: '否定二枚帯',
        match: /#21|二重否定/i,
        drill: "I don't think money is that important.",
        note: '強調のつもりの not が2枚並んで、主張が反転する。日本語の「〜ないとは思わない」は強調だが、英語では算数どおりに相殺される。',
    },
    {
        id: 'fabricate',
        name: '捏造語の召喚',
        zone: '新語火山帯',
        match: /捏造|存在しない|和製/i,
        drill: 'It could backfire.',
        note: '-ness / -ity / counter- を足して、理屈は通るが英語が同意しない語を作る。稀に実在する(humanness)。',
    },
    {
        id: 'set-phrase',
        name: 'set phrase の崩れ',
        zone: '定型断層',
        match: /#12|set phrase|イディオム/i,
        drill: 'It would be a wake-up call.',
        note: '狙う句は正しいのに、最後の1語か1粒が落ちる。wake-up call の up、a God’s-eye view の s、herding cats の cats。',
    },
    {
        id: 'ed-ing',
        name: '感情の -ed / -ing 取り違え',
        zone: '被害者・加害者帯',
        match: /#16|-ed|-ing|感情の/i,
        drill: 'They escaped the devastated area.',
        note: '与える側(-ing)と受ける側(-ed)が入れ替わる。被災地が加害者になり、疲れているのが人ではなく部屋になる。',
    },
    {
        id: 'countable',
        name: '可算 / 不可算',
        zone: '数え違い帯',
        match: /#7|不可算|可算|複数/i,
        drill: 'Too many people in one city is never a good thing.',
        note: 'too much people、the outskirt、millions を単数にするなど、数の感覚が日本語のまま出る。',
    },
    {
        id: 'indirect-q',
        name: '間接疑問の語順',
        zone: '疑問詞逆断層',
        match: /#22|間接疑問/i,
        drill: 'They’d realize how vulnerable the economy is.',
        note: '文の中に入れた質問に、直接疑問の語順を突っ込む。ただし 2026-08-18 に完全復活しており、この帯は現在いちばん静かである。',
    },
    {
        id: 'existential',
        name: '存在文の崩壊',
        zone: 'there 欠員帯',
        match: /#9|存在文/i,
        drill: 'There was also a big earthquake in that area.',
        note: '「〜がある」を It’s で始めてしまう。日本語は主語なしで存在を言えるので、英語に移すと there が省かれる。',
    },
    {
        id: 'pronoun',
        name: '代名詞の取り違え (he / she / it)',
        zone: '指し示し断層',
        match: /#20|he\/she|代名詞/i,
        drill: "I'm not opposed to her. I don't know what she's doing now.",
        note: '日本語には性別で変わる代名詞が無いので、急ぐと he と she が入れ替わる。07-07 に初登録、08-21 に番組を her で受け、**08-24 に一夜4回で番組記録。** 特徴は発生条件で、**相手を擁護している最中にだけ出る。** 態度は正確に届いていて、指し示す部品だけが落ちる。',
    },
];

export interface FaultAssessment {
    fault: FaultLine;
    hits: number;           // 直近 window 夜のうち、発生した夜の数
    window: number;         // 母数(夜)
    probability: number;    // hits / window
    lastSeen: string | null;    // 最終発生日
    nightsSince: number | null; // 最終発生から何夜経ったか(このログ上の夜数)
    maxPerNight: number;    // 1夜あたりの最大発生件数(規模)
    level: 'AAA' | 'AA' | 'A' | 'B' | 'C';  // 警戒度
    samples: string[];      // 直近の実発話(証拠)
}

function levelOf(p: number, maxPerNight: number): FaultAssessment['level'] {
    if (p >= 0.6 && maxPerNight >= 3) return 'AAA';
    if (p >= 0.6) return 'AA';
    if (p >= 0.35) return 'A';
    if (p >= 0.15) return 'B';
    return 'C';
}

/**
 * 直近 window 夜から各断層の発生確率を計算する。
 * 「その夜に1件でも出たか」で数えるので、確率は「次の25分で少なくとも1回起きる見込み」。
 */
export function assessFaults(window = 12): FaultAssessment[] {
    const lessons: KenshiLesson[] = kenshiLessons.slice(0, window);
    const n = lessons.length;
    return FAULT_LINES.map((fault) => {
        let hits = 0, maxPerNight = 0, lastSeen: string | null = null, nightsSince: number | null = null;
        const samples: string[] = [];
        lessons.forEach((lesson, idx) => {
            const found = lesson.mistakes.filter((m) => fault.match.test(m.pattern));
            if (found.length === 0) return;
            hits++;
            maxPerNight = Math.max(maxPerNight, found.length);
            if (lastSeen === null) { lastSeen = lesson.date; nightsSince = idx; }
            if (samples.length < 3) samples.push(found[0].spoke);
        });
        const probability = n === 0 ? 0 : hits / n;
        return {
            fault, hits, window: n, probability, lastSeen, nightsSince,
            maxPerNight, level: levelOf(probability, maxPerNight), samples,
        };
    }).sort((a, b) => (b.probability - a.probability) || (b.maxPerNight - a.maxPerNight));
}

/** 予知の台帳 — 自分で出した宿題(=予知)と、翌夜の実測 */
export interface Prediction {
    issuedNight: number;
    issuedDate: string;
    homework: string;           // その夜に自分で出した宿題
    verifiedNight: number | null;
    verifiedDate: string | null;
    result: 'EXECUTED' | 'FAILED' | 'AVOIDED' | 'NO_CHANCE' | 'PENDING';
    evidence: string;           // 翌夜の実発話(証拠)
    note: string;
}

export const PREDICTIONS: Prediction[] = [
    {
        issuedNight: 147,
        issuedDate: "2026-10-24",
        homework: "AI は it — It knows it's creepy / I don't trust it(he's like 'Hey, what's up?' / his answer is correct / he knows he's creepy / I don't trust him at all / he's gone / he's instantaneous / he's kind of like a speak like human / he's good at → It's like / its answer / it knows it's creepy / I don't trust it / it's gone / it's instantaneous / it talks like a human)【再装填】",
        verifiedNight: null,
        verifiedDate: null,
        result: "PENDING",
        evidence: "次のレッスン待ち",
        note: "**第147夜、3夜(FAILED 2 / NO_CHANCE 1)で宿題から外した「AI は it」の席が、外した翌夜に本当に来た。AI(Claude の音声)が講師と直接話した夜で、男は AI を he で8回受けた。** **☓he's like 'Hey, what's up?' / his answer is correct / he knows he's creepy / I don't trust him at all / he's he's gone / he's instantaneous / he's kind of like a speak like human / maybe he's good at。** **★it で出たのは2回 — Oh. It's misunderstood me(AI が男の答えを勝手にノーと受け取った瞬間)/ they kind of abuse it(友人たちが AI を乱暴に扱った話)。褒める・評価する文では he、間違えた・扱われた文では it。** **★★講師は It doesn't have a social intelligence / It can't comprehend itself / It's like an advert / telling it what to do と最後まで it(1回だけ He understands himself well)。AI 自身は I'm an AI and I'd rather you treat me as one と言った。** **★第145夜の he's kind of posh(人らしさを褒める文)と同じ場面。人らしさを言うと、代名詞が人になる(PRECURSORS に登録)。** FAULT_LINES「代名詞の取り違え」の、機械の席。 **★処方は1段 — AI の話を始める前に it と1回口に出す。迷ったら the AI と名詞に戻す。** **★判定 — 次に AI の話をする夜、最初の代名詞を he / she で出したら FAILED。**最初から it で出れば EXECUTED。AI の話が来なければ NO_CHANCE。"
    },
    {
        issuedNight: 147,
        issuedDate: "2026-10-24",
        homework: "be の後ろの単数名詞に a — It was just an experiment / It's a nice assistant / I'm not a foreigner(it was just experiment / it's nice assistant / I'm not foreigners / is like must → It was just AN experiment / It's A nice assistant / I'm not A foreigner / was A must)【据え置き3夜目】",
        verifiedNight: null,
        verifiedDate: null,
        result: "PENDING",
        evidence: "次のレッスン待ち",
        note: "**第147夜、前夜の宿題①が FAILED したので、据え置く。3夜目。** **☓it's it's nice assistant / ☓so it it was just experiment / ☓I'm not foreigners(a が落ちて、名詞が複数に逃げた)/ ☓it's a shipping is like must(a must は名詞)。** **★立った側 — you're just a baby / you're just a tool / a rip-off kind of thing / a glass of beer / a special event occasion(a は立ち、名詞が2個になった)。** **★第145夜は island nation、第146夜は island nation ×2 と great topic、今夜は nice assistant / experiment / foreigner。場面は毎夜違い、席は同じ — be の後ろで単数の名詞を言い切る所。** **★今夜の観測を1つ足す — a が落ちると名詞が複数に逃げる(foreigners)。a を先に置けば、名詞は単数で止まる。** FAULT_LINES「冠詞」。 **★処方は変えない — be の後ろで単数の名詞を言い切るときは、名詞より先に a(It was an ... / It's a ... / I'm not a ...)。** **★判定 — 次のレッスンで be +(形容詞)+ 単数名詞 の a が1回でも落ちたら FAILED。**全部立てば EXECUTED。"
    },
    {
        issuedNight: 147,
        issuedDate: "2026-10-24",
        homework: "礼は型のまま — Thank you for dealing with my stupid stuff / I really appreciate it(thank you so much dealing with my stupid stuff. I much appreciate it → Thank you so much FOR dealing with my stupid stuff. I REALLY appreciate it)",
        verifiedNight: null,
        verifiedDate: null,
        result: "PENDING",
        evidence: "次のレッスン待ち",
        note: "**第147夜、AI を切った直後、講師に礼を言う1文で定型が2か所崩れた。** **☓Sorry, thank you so much uh dealing with my, you know, stupid stuff. I much appreciate it。**thank you の後ろの for が落ち、appreciate の前に much が立った。 **★第112夜 I'm so much appreciated、第116夜 I'm appreciate it all the time、第119夜 I'm always appreciate、第136夜 I'm very appreciate、第147夜 I much appreciate。be は今夜は付かなかった。かわりに much が座った。appreciate の前の席は、毎回何かが違う。** **★場面は PRECURSORS「相手の話で感情が動いた直後の1文」そのまま — 酔った企画に付き合ってくれた講師への礼。** FAULT_LINES「be 動詞」の、余りの席と、前置詞の席。 **★処方は1段 — 礼は2本に固定する。Thank you for + -ing(for を先に口に出す)/ I really appreciate it(really の2択、Much appreciated なら単独で)。** **★判定 — 次のレッスンで thank you の後ろが for 無しで動詞に直結したら、または I much appreciate / I'm appreciate が出たら FAILED。**2本とも型で出れば EXECUTED。礼の文が来なければ NO_CHANCE(まず無い)。"
    },
    {
        issuedNight: 146,
        issuedDate: "2026-10-23",
        homework: "国は a をつけて数える — We're an island nation / It's a great topic(we are uh nation ... island nation / we are like uh island nation / it's great topic / it's great idea → We're an island nation / It's a great topic / It's a great idea)【据え置き2夜目】",
        verifiedNight: 147,
        verifiedDate: "2026-10-24",
        result: "FAILED",
        evidence: "第147夜 — ☓it's it's nice assistant / ☓so it it was just experiment / ☓I'm not foreigners(a が落ちて複数に逃げた)/ ☓it's a shipping is like must(a must)。★立った側 — you're just a baby / you're just a tool / a rip-off kind of thing / a glass of beer",
        note: "**第146夜、前夜の宿題③が FAILED したので、据え置く。** **☓we are uh nation How can I say? Uh island nation / ☓we are like uh island nation — 宿題の文そのものが2回、a 無しで出た。☓it's great topic / it's great idea / which is crazy number / it's kind of exaggerating statement。** **★立った側 — it's a good topic / it's a very difficult task / we have a homogeneous society。** **★前夜は「形容詞を挟むと落ちる」と書いた。今夜は形容詞の無い island nation でも落ちた。形容詞の有無ではなく、be の後ろで名詞を言い切る席そのものが空いている。** FAULT_LINES「冠詞」。 **★処方は1段 — be の後ろで単数の名詞を言い切るときは、形容詞より先に a(We're an ... / It's a ... / That's a ...)。** **★判定 — 次のレッスンで be +(形容詞)+ 単数名詞 の a が1回でも落ちたら FAILED。**全部立てば EXECUTED。 **☓第147夜、FAILED(4回)。**it's nice assistant / it was just experiment / I'm not foreigners / is like must。**★今夜は AI・実験・外国人・必須、と場面が全部違い、席だけ同じ — be の後ろで単数の名詞を言い切る所。★新しい観測 — a が落ちると名詞が複数に逃げる(I'm not foreigners)。**宿題は据え置き(3夜目)。"
    },
    {
        issuedNight: 146,
        issuedDate: "2026-10-23",
        homework: "地理は geographical — because of our geography / It's a geographical advantage(because of the geological situation(第146夜)/ thanks to the geological location(第145夜)→ because of our geography / It's a geographical advantage)",
        verifiedNight: 147,
        verifiedDate: "2026-10-24",
        result: "NO_CHANCE",
        evidence: "第147夜、島国・国境・地理の話は出なかった(話題は AI、ブレードランナー、孤独と絆、隣人と塩、回転寿司、酒税、チップ)。geo- の語は0回",
        note: "**第146夜、島国は海に守られている、と言う場面で geological が出た — you don't need that thing because of the geological situation。** **第145夜の thanks to the geological location に続いて2夜連続。2夜とも講師は別人で、2夜とも同じ場面(島国だから壁は要らない)。** **★前夜の講師は It's not that easy to get to Japan, geographically と geo- の正しい形を置いていた。拾われなかった。** **★geological は地質(土や岩の中身)、geographical は地理(土地の位置)。geo- までは合っていて、後ろが地面の下に着く。** FAULT_LINES「1音違いの狙撃失敗」。 **★処方は1段 — 島国・国境・位置の話は geography で言う(because of our geography / a geographical advantage)。** **★判定 — 次のレッスンで geological を地理の意味で言ったら FAILED。**geography / geographical / geographically で言えたら EXECUTED。島国・国境の話が出なければ NO_CHANCE。 **★第147夜、NO_CHANCE。**島国も国境も出なかった。酔った夜で、お題は AI と寿司とチップだった。処方は装填のまま — 次に島国の話が来る夜に見る。"
    },
    {
        issuedNight: 146,
        issuedDate: "2026-10-23",
        homework: "決まり文句は最後の1語まで — Let's meet halfway / Word gets around(but uh we meet in the halfway / they the the words get around → I think we can meet halfway / Word gets around)",
        verifiedNight: 147,
        verifiedDate: "2026-10-24",
        result: "NO_CHANCE",
        evidence: "第147夜、meet halfway / word gets around は2つとも出なかった。★別の決まり文句は最後まで立った — we had a blast / parting shot / cut you off / could use some help / behind the scenes / rip-off。☓崩れたのは is like must(a must の a)と I much appreciate it(really / Much appreciated)",
        note: "**第146夜、前夜の宿題②(決まり文句の最後の1語)の3本は出なかった(NO_CHANCE)。かわりに別の2本が崩れた。** **☓I don't know uh the answers, but uh we meet in the halfway(meet halfway。in the が余った。録音が切れる直前、国境の話の締め)/ ☓Treat them badly is a, you know, it's it's a uh they the the words get around(word gets around。the と s が余った)。** **★前夜は句の1語が落ち、今夜は句に1粒が余った。★同じ夜、we know the drill / a double whammy / bear with me / for better or worse / go on a tangent / chime in は最後まで立った。** **★meet halfway は、前夜の英国の講師の meeting in the middle と混ざった可能性がある(in と the がそこから来ている)。** FAULT_LINES「set phrase の崩れ」。 **★処方は1段 — 句は辞書の形のまま1つの音で持つ(meet-halfway / word-gets-around)。冠詞も前置詞も足さない。** **★判定 — 次のレッスンでこの2つのどちらかを崩したら FAILED。**言えたら EXECUTED。出なければ NO_CHANCE。 **★第147夜、NO_CHANCE。**2本とも出なかった。★別の句は立った(we had a blast / parting shot / cut you off / could use some help / behind the scenes / rip-off)。☓崩れた句は2本 — is like must(a が落ちた)/ I much appreciate it(appreciate の前の席)。後者は今夜の宿題③として別に立てた。この宿題の2本は装填のまま。"
    },
    {
        issuedNight: 145,
        issuedDate: "2026-10-22",
        homework: "AI は it — It's kind of posh / It remembers(he's like kind of posh / I think he's kind of British / so he remembers → It's kind of posh / I think it's kind of British / It remembers)【据え置き3夜目】",
        verifiedNight: 146,
        verifiedDate: "2026-10-23",
        result: "NO_CHANCE",
        evidence: "第146夜、AI の話は出なかった(お題は外国人労働者、講師はケープタウン在住)。地の文で AI・アプリ・機械を代名詞で受けた場面は0回。★冒頭、講師の動く背景を It's really uh computer, computer pictures? I don't know what it is と it で受けたが、これは DMM の背景画像で AI ではない",
        note: "**第145夜、前夜の宿題②が FAILED したので、据え置く。** **☓he's like kind of posh / ☓I think he's kind of British。** **★★同じ夜、so he remembers, you know, it remembers — he と言ってから、自分で it に直した。初めての自己修正。** **★he が出たのは2回とも、AI が人のように振る舞った話(Brilliant! と言う / イギリス人っぽい)の直後。人らしさを話すと、代名詞も人になる。** FAULT_LINES「代名詞の取り違え」の、機械の席。 **★処方は変えない — AI・アプリ・機械は it。人っぽいと言うときも it(It sounds British)。** **★判定 — 次のレッスンで AI を he / she で受けたら FAILED。**最初から it で出れば EXECUTED(he から直したものは EXECUTED と数えない)。AI の話が来なければ NO_CHANCE。 **★第146夜、NO_CHANCE。**AI の話が1回も来なかった。機械の席が来ないので、執行は判定できない。**宿題からは外す(3夜で FAILED 2・NO_CHANCE 1)。処方は装填のまま — 次に AI の話をする夜、最初の代名詞を it で出す。**"
    },
    {
        issuedNight: 145,
        issuedDate: "2026-10-22",
        homework: "決まり文句は最後の1語まで — when push comes to shove / bring out the best in me / make it worth your while(when push to the shove / you bring the best in me / I'll make it all your worth → when push comes to shove / you bring out the best in me / I'll make it worth your while)",
        verifiedNight: 146,
        verifiedDate: "2026-10-23",
        result: "NO_CHANCE",
        evidence: "第146夜、when push comes to shove / bring out the best in me / make it worth your while は3つとも出なかった(講師は別人で、褒める・詫びる場面も無かった)。★別の決まり文句は立った — But we know the drill, right? We know the drill / It's a double whammy or triple whammy / So, bear with me / for better or worse / I'm sorry, uh um uh to go on a tangent / if you want to chime in, welcome。☓崩れたのは別の句 — we meet in the halfway(meet halfway)/ the words get around(word gets around)",
        note: "**第145夜、講師を褒める・詫びる文で、決まり文句が3本、1語ずつ欠けた。** **☓when push to the shove(comes が落ちた。前夜この講師が置いた語を、you say, yesterday と出典つきで返した1文)/ ☓you bring the best in me(out が落ちた。bring を5回言い直して、out は来なかった)/ ☓I'll make it all your worth(worth your while の部品が組み替わった)。** **★同じ夜、bring my A-game / hold your own / tall order(huge order から自分で直した)は立った。** FAULT_LINES「set phrase の崩れ」。 **★処方は1段 — 盗んだ句は、最後の1語まで1つの音で持つ(push-comes-to-shove)。句の途中で止まったら、句の頭からもう1回言う。** **★判定 — 次のレッスンでこの3つのどれかを崩したら FAILED。**言えたら EXECUTED。出なければ NO_CHANCE。 **★第146夜、NO_CHANCE。**3つとも出なかった。**★分母を隠さない — 別の決まり文句は6本、最後の1語まで立った(we know the drill / a double whammy / bear with me / for better or worse / go on a tangent / chime in)。☓崩れた2本は、どちらも句の中の小さい1粒 — we meet in the halfway(in the が余った)/ the words get around(the と s が余った)。前夜は1語が落ち、今夜は1粒が余った。**この型は宿題として据え置き、対象の句を今夜の2本に替える。"
    },
    {
        issuedNight: 145,
        issuedDate: "2026-10-22",
        homework: "国は a をつけて数える — We're an island nation / That's a pretty important issue(we are island nation / That's pretty important issue / it's very ambiguous question → We're an island nation / That's a pretty important issue / It's a very vague question)",
        verifiedNight: 146,
        verifiedDate: "2026-10-23",
        result: "FAILED",
        evidence: "第146夜、we are fortunate for for better or worse, we are uh nation How can I say? Uh island nation / Because like I said, we are like uh island nation(同じ island nation が2回とも a 無し)。ほかに and it's great topic to talk about / it's great idea to invite / which is crazy number / it's kind of exaggerating statement。★立った側 — it's a good topic / it's a very difficult task to tackle / we have a homogeneous society / a labor shortage(講師の語の復唱)",
        note: "**第145夜、be の後ろで単数の名詞を言い切る席で、a が3回落ちた。** **☓we are island nation / ☓That's pretty important issue / ☓it's very ambiguous question。★逆に a UBI questions では、複数の前に立った。** **★3回のうち2回は形容詞(pretty important / very ambiguous)を挟んでいる。形容詞が間に入ると名詞が遠くなって札が落ちる(第114夜の型)。** FAULT_LINES「冠詞」。 **★処方は1段 — be の後ろで名詞を言い切るときは、形容詞より先に a を置く(That's a ... / It's a ... / We're an ...)。** **★判定 — 次のレッスンで be + (形容詞) + 単数名詞 の a が1回でも落ちたら FAILED。**全部立てば EXECUTED。 **☓第146夜、FAILED。**宿題の文そのもの(we are island nation)が2回、a 無しで出た。1回目は nation と言ってから How can I say? と止まり、island nation と言い直したが、a は戻らなかった。**★前夜の観測(形容詞を挟むと落ちる)は半分だけ当たった — island nation は形容詞を挟まない裸の名詞で落ちた。it's great topic / it's great idea は形容詞1語で落ちた。★立った側 — it's a good topic / it's a very difficult task / a homogeneous society。**宿題は据え置き(2夜目)。"
    },
    {
        issuedNight: 144,
        issuedDate: "2026-10-21",
        homework: "否定は I don't — I don't agree / I don't think so(I'm not I'm not agree with lawyers → I don't agree with including lawyers / I wouldn't count lawyers)【据え置き8夜目、否定の席に絞る】",
        verifiedNight: 145,
        verifiedDate: "2026-10-22",
        result: "EXECUTED",
        evidence: "第145夜、I don't understand virtue signaling and, uh, you know, victim mentality / I don't really I don't understand / I don't accept these people(否定は3回とも I don't)。I'm not + 原形・I'm + 原形 / 過去形は0回。★I'm also I can bring my A-game(I'm を捨てて I can に言い直した)。☓別の席 — I'm not born like that(be の時制)",
        note: "**第144夜、前夜の宿題①が7夜連続 FAILED したので、崩れた席に絞って据え置く。** **☓I'm not I'm not agree with lawyers, but the doctors。**エッセンシャルワーカーを並べている途中で、弁護士だけを外す1文。 **★同じ夜、I'm using / I'm having / I'm finding / I'm gonna push back / I'm rambling は全部座った。崩れたのは否定の1回だけ。★日本語の「〜ではない」が be の否定の形で出る — 動詞の否定は do が持つ。** FAULT_LINES「be 動詞」の、否定の席。 **★処方は1段 — 反対・不同意は I don't で始める(I don't agree / I don't think / I don't count)。I'm not の後ろは形容詞か -ing だけ(I'm not sure / I'm not saying)。** **★判定 — 次のレッスンで I'm not + 原形 / I'm + 原形・過去形が出たら FAILED(8夜連続)。**出なければ EXECUTED。 **★第145夜、EXECUTED(8夜目で初)。**否定は I don't で3回立った — I don't understand virtue signaling / I don't really I don't understand / I don't accept these people。I'm not + 原形は0回。**★I'm also I can bring my A-game — I'm と言いかけて捨て、I can に戻した。処方どおりの自己修正。** **☓別の席 — I'm not born like that(wasn't。be の時制で、宿題の対象外)。**"
    },
    {
        issuedNight: 144,
        issuedDate: "2026-10-21",
        homework: "AI は it — It knows / It asked(my AI is customized, so he knows exactly → My AI is customized, so it knows exactly)【据え置き2夜目】",
        verifiedNight: 145,
        verifiedDate: "2026-10-22",
        result: "FAILED",
        evidence: "第145夜、3回 — Uh, he's like kind of posh, you know, 「Brilliant!」/ I think he's kind of British / so he remembers, you know, it remembers(he と言ってから it に自分で直した)。地の文で AI を代名詞で受けたのは4回、he 3・it 1",
        note: "**第144夜、前夜の宿題②が FAILED したので、据え置く。** **☓my AI is customized, so he knows exactly。**前夜は she, or he, or he と多数決、今夜は投票なしで he。 **★customized(俺用に作り込んだ)と言った直後に he。作り込んだ物を、人として扱っている。** FAULT_LINES「代名詞の取り違え」の、機械の席。 **★処方は変えない — AI・アプリ・機械は it。名前を付けていても、作り込んでいても it。** **★判定 — 次のレッスンで AI / ChatGPT / Gemini を he / she で受けたら FAILED。**it で出れば EXECUTED。AI の話が来なければ NO_CHANCE。 **☓第145夜、FAILED(he 3回)。**AI が Brilliant! と言う、イギリス人っぽい、という人らしさの話の直後に he が出た。**★★同じ夜、so he remembers, you know, it remembers — 誰にも言われずに、初めて自分で it に直した。**宿題は据え置き(3夜目)。"
    },
    {
        issuedNight: 144,
        issuedDate: "2026-10-21",
        homework: "名詞の後ろは today — jobs today(a lot of jobs today's are / almost all the jobs today's is / today today's day and age → a lot of jobs today are / most jobs today are / in this day and age)",
        verifiedNight: 145,
        verifiedDate: "2026-10-22",
        result: "NO_CHANCE",
        evidence: "第145夜、today's は4回出て全部名詞の前(today's topic ×2 / today's politics / today's liberal)。名詞 + today's は0回、名詞の後ろから今の時代を言う場面も来なかった。☓the today's politics は the が1枚余った(限定詞の渋滞、別の席)",
        note: "**第144夜、today's が名詞の後ろに3回来た。** **☓a lot of jobs today's are bullshit jobs / ☓almost all the jobs today's is like 90% / ☓today today's day and age。** **★today's は名詞の前に置く札(today's jobs)。名詞の後ろから修飾するなら today(jobs today)。日本語の「今日の仕事」を後ろから足したので、's が付いたまま後ろに回った。★2回目は is も単数に落ちた — 's の札が数を1つに見せた。** FAULT_LINES「限定詞・数」。 **★処方は1段 — 名詞の後ろなら today、前なら today's。迷ったら these days を文末に置く(Most jobs these days are ~)。** **★判定 — 次のレッスンで 名詞 + today's が出たら FAILED。**today's + 名詞 / 名詞 + today / these days で出れば EXECUTED。「今の時代の〜」を言う場面が来なければ NO_CHANCE(この男は今の時代の話をよくする)。 **★第145夜、NO_CHANCE。**today's は4回とも名詞の前に立った。名詞の後ろの席が来なかったので、執行は判定できない。処方は装填のまま。"
    },
    {
        issuedNight: 143,
        issuedDate: "2026-10-20",
        homework: "I'm と言ったら次は -ing / 形容詞 / 名詞。動詞なら I に戻す — I already tried / I agree(I'm already ... tried / I'm agree on this → I already tried it / I agree with this)【据え置き7夜目】",
        verifiedNight: 144,
        verifiedDate: "2026-10-21",
        result: "FAILED",
        evidence: "第144夜、1回 — I'm not I'm not agree with lawyers, but the doctors(エッセンシャルワーカーの列から弁護士を外す1文)。★立った側 — I'm using my laptop's / I'm having / I'm no longer finding the article / I'm gonna like a little bit push back / I'm kind of talking about / I'm rambling(-ing と gonna の前では全部座った)",
        note: "**第143夜、前夜の宿題①が6夜連続 FAILED したので、据え置く。** **☓I'm already in, you know, tried today / ☓I'm agree on this。** **★★同じ夜、I already tried like talking to AI / I kind of disagree は be 無しで立った。正しい形は持っている。崩れるのは、講師に同意する・報告する1文目の頭で、I'm が反射で出たとき。** FAULT_LINES「be 動詞」の、余りの席。 **★処方は変えない — I'm と言いかけたら、次の語を見る。動詞なら I に戻す。** **★判定 — 次のレッスンで I'm + 原形 / 過去形が出たら FAILED(7夜連続)。**出なければ EXECUTED。 **☓第144夜、FAILED(1回、7夜連続)。**I'm not I'm not agree with lawyers。**★崩れた席が変わった — 前夜までは同意・報告の1文目(I'm agree / I'm already tried)、今夜は否定(I'm not + 原形)。I'm using / I'm having / I'm finding / I'm gonna push back は全部座った。★分母 — 今夜 I'm で始めた文は約15回、崩れたのは1回。**宿題は否定の席に絞って据え置き(8夜目)。"
    },
    {
        issuedNight: 143,
        issuedDate: "2026-10-20",
        homework: "AI は it — It wrote / It asked / It'll listen(she, or he, or he will listen / this is a sentences he wrote / he says → It'll listen / These are the sentences it wrote / It asked)",
        verifiedNight: 144,
        verifiedDate: "2026-10-21",
        result: "FAILED",
        evidence: "第144夜、1回 — You know, my AI is customized, so he knows exactly(冒頭、AI との議事録を読む前置き)。地の文で AI を代名詞で受けたのはこの1回だけ。ほかは議事録の引用(AI 自身の一人称)",
        note: "**第143夜、AI を人の代名詞で3回受けた。** **☓she, or he, or he will listen to you in real time / ☓this is a sentences he wrote / ☓And he says。** **★人の性別(第138夜の市長、第140夜の女性の学者)では今は揺れない伝令が、機械に性別を付けた。customized AI を人として扱っている。** FAULT_LINES「代名詞の取り違え」の、機械の席。 **★処方は1段 — AI・アプリ・機械は it。名前を付けていても it。** **★判定 — 次のレッスンで AI / ChatGPT / Gemini を he / she で受けたら FAILED。**it で出れば EXECUTED。AI の話が来なければ NO_CHANCE(この男はほぼ毎晩 AI の話をする)。 **☓第144夜、FAILED(1回)。**my AI is customized, so he knows exactly。**★開始3分、技術トラブルの中で AI との議事録を説明する1文目。地の文で AI を受けた代名詞はこの1回で、1回とも he。customized(俺用に作り込んだ)と言った直後に he — 作り込んだ物を人として扱う。**据え置き(2夜目)。"
    },
    {
        issuedNight: 143,
        issuedDate: "2026-10-20",
        homework: "ask 人 to do — I asked AI to criticize me(I asked AI brutally criticize me → I asked AI to criticize me brutally)",
        verifiedNight: 144,
        verifiedDate: "2026-10-21",
        result: "NO_CHANCE",
        evidence: "第144夜、ask / tell / want 人 + 動詞 の場面は0回。Could you read this? / Could you turn off your camera? は依頼の疑問文で、ask 人 の報告ではない",
        note: "**第143夜、ask の後ろの to が落ちた。** **☓You I asked AI brutally criticize me, and uh question me。** **★副詞(brutally)を動詞の前に置いたので、to の席に副詞が座り、to が押し出された。** FAULT_LINES「前置詞・to の席」。 **★処方は1段 — ask 人 to + 動詞 で言い切ってから、副詞は文末に回す(to criticize me brutally)。** **★判定 — 次のレッスンで ask / tell / want 人 + 原形(to 無し)が出たら FAILED。**to で出れば EXECUTED。頼み事の報告が来なければ NO_CHANCE。 **★第144夜、NO_CHANCE。**頼み事の報告(I asked ~ to)が来なかった。依頼は Could you read this? / Could you turn off your camera? の疑問文だけで、どちらも正しい。処方は装填のまま、宿題からは外す。"
    },
    {
        issuedNight: 142,
        issuedDate: "2026-10-19",
        homework: "I + 副詞 + 動詞。be を置かない — I also get irritated / I kind of disagree / I admire him(I'm also get irritate / I'm kind of a little bit disagree / I'm admire him → I also get irritated / I kind of disagree a little / I admire him)【据え置き5夜目】",
        verifiedNight: 143,
        verifiedDate: "2026-10-20",
        result: "FAILED",
        evidence: "第143夜、2回 — I'm already in, you know, tried today(AI を試した話)/ I'm agree on this, because Joe Rogan(NGO の話で講師に同意)。★立った側 — I already tried like talking to AI uh real time / I also, actually, my true opinion uh kind of kind of disagree(副詞の後ろで be 無し)",
        note: "**第142夜、前夜の宿題③が5夜連続 FAILED したので、据え置く。** **☓I'm also get irritate / ☓I'm kind of a little bit disagree / ☓I'm admire him。** **★第139夜 I'm kind of disagree → 第142夜 I'm kind of a little bit disagree。同じ動詞、同じ副詞、3日後。** **★★5夜の記録で条件が確定した — 後ろが -ing・going to・形容詞なら be は正しく座る(I'm right now reading / I'm not gonna lie / I'm sure)。崩れるのは後ろが原形・過去形のときだけ。** FAULT_LINES「be 動詞」。 **★処方は変えない — 副詞は主語の直後(I also / I kind of)。動詞から先に言う。** **☓第143夜、FAILED(2回、6夜連続)。**I'm already ... tried / I'm agree。**★同じ夜に I already tried / I kind of disagree は be 無しで立った。already の前で、立つ文と崩れる文が両方出た。** **★崩れた2回は、どちらも講師に同意する・報告する1文目の頭。**宿題は据え置き(7夜目)。"
    },
    {
        issuedNight: 142,
        issuedDate: "2026-10-19",
        homework: "一般動詞の疑問は Do — Do you eat it?(Are you eat? / we me you eat eland daily → Do you eat it? / Do you eat eland every day?)",
        verifiedNight: 143,
        verifiedDate: "2026-10-20",
        result: "EXECUTED",
        evidence: "第143夜、What do you think?(スピーチの朗読の締め)/ So, but what do you think about in freely(講師に意見を求めて)。★別の席 — Have a problem?(口語の省略、Got a problem? と同じく通る)/ Worry the pronunciation problem(be 疑問の崩れ)/ What comedian you are pointing at?(進行形の疑問の倒置落ち)",
        note: "**第142夜、驚いた瞬間に be で始めた。** **☓Wow! Are you eat?(エランドはうまい、と聞いて)/ ☓So in South Africa, we me you eat eland daily(do の欠落)。** **★同じ夜、準備した問いでは Do が立った — Do you agree? / Do you read comments? / Do you know Born a Crime?** **★驚くと、最初の1語が be に寄る。** FAULT_LINES「be 動詞」(持ち場ちがいの出勤)。 **★処方は1段 — 動詞(eat / like / know)が来る問いは Do で始める。** **★第143夜、EXECUTED。**What do you think? が2回、Do で立った。**★分母 — 一般動詞の疑問は2回で2回とも Do。崩れたのは別の席(be の疑問 = Are you worried / 進行形の倒置 = are you thinking of)。**"
    },
    {
        issuedNight: 142,
        issuedDate: "2026-10-19",
        homework: "did の後ろは原形 — I didn't think about that(I didn't thought about that / I didn't do read a lot → I didn't think about that / I haven't read much of it)",
        verifiedNight: 143,
        verifiedDate: "2026-10-20",
        result: "NO_CHANCE",
        evidence: "第143夜、did / didn't は本人の発話に0回。過去の否定を言う場面が来なかった",
        note: "**第142夜、did の後ろに過去形。** **☓You know, I didn't thought about that(エランドの話の後)/ ☓I didn't do I didn't do read a lot(ハリー・ポッター)。** **★過去を did と動詞の両方に乗せた。didn't do read は do が1枚余った。** FAULT_LINES「時制」。 **★処方は1段 — 過去は did に1回だけ。動詞は原形に戻す。** **★第143夜、NO_CHANCE。**did の席が来なかった。処方は装填のまま。"
    },
    {
        issuedNight: 141,
        issuedDate: "2026-10-18",
        homework: "疑問詞の後ろは倒置 — Why are we regressing?(why we are regressing / why we are living like a barbarian era → Why are we regressing? / Why are we still living like barbarians?)",
        verifiedNight: 142,
        verifiedDate: "2026-10-19",
        result: "NO_CHANCE",
        evidence: "第142夜、why で始まる直接の問いは0回。★名詞節の why は正しい語順で立った — I don't know why they are doing that(爆音の高級車の話)。名詞節では why we are が正しく、問いでは why are we。今夜は名詞節の席だけが来た",
        note: "**第141夜、2回連続、同じ形。** **☓Yeah, we living, why we are, regressing / ☓why we are living like, that's like a barbarian era right now?** **★講師のドバイとギリシャの強制労働の話に、男は感情で返した。感情が強い問いで、語順が日本語の「なぜ俺たちは〜」のまま出た。why we are は名詞節(I don't know why we are ~)の語順で、問いとしては終わらない。** **★同じ夜、Do you agree with strikes? / What's your take? は倒置が立った。疑問詞なしの Yes/No 疑問文と、定型の what's では崩れない。** FAULT_LINES「語順」。 **★処方は1段 — why と言ったら、次は are / do / did。主語はその後。**"
    },
    {
        issuedNight: 141,
        issuedDate: "2026-10-18",
        homework: "Let nature take its course / Nature takes its course(nature has its cause → nature takes its course)",
        verifiedNight: 142,
        verifiedDate: "2026-10-19",
        result: "NO_CHANCE",
        evidence: "第142夜、自然の成り行きの話は来なかった。★狩猟と個体数管理の話(保護と狩猟は両立する)は来たが、男は Let nature take its course の立場を取らず、考えて次回話す、と持ち帰った",
        note: "**第141夜、2回、同じ形。** **☓Nature has its, yeah, my opinion also, nature has its cause / ☓nature has its cause, because so, against aging is ...** **★course(成り行き)と cause(原因、大義)は1音違い。自然に大義が生まれた。** **★同じ夜、transplanted → translated / transported(1音の狙撃 計5発)。定型の中の1語が、隣の音の語に着弾する。** FAULT_LINES「1音の狙撃」。 **★処方は1段 — 定型ごと覚える。Let nature take its course(動詞は take、has ではない)。**"
    },
    {
        issuedNight: 141,
        issuedDate: "2026-10-18",
        homework: "I'm + 副詞 + 原形を出さない — I don't mean to cut you off(I'm not abruptly cut → I don't mean to cut you off)【据え置き4夜目】",
        verifiedNight: 142,
        verifiedDate: "2026-10-19",
        result: "FAILED",
        evidence: "第142夜、2回 — I'm I'm also get irritate when I drive(運転でイラッとする)/ I'm I'm kind of a little bit disagree(トレヴァー・ノアの一節に)。副詞なしでも1回 — I'm admire him。★立った側 — I'm right now reading Harry Potter / I'm not gonna lie / I'm sure(後ろが -ing・going to・形容詞)",
        note: "**第141夜、前夜の宿題①が4夜連続 FAILED したので、据え置く。** **☓I'm not abruptly, you know, cut because I want to go through five。** **★第138夜 I'm listened → 第139夜 I'm not comment → 第140夜 I'm kind of got / I'm just talk → 第141夜 I'm not abruptly cut。** **★★ただし今夜、同じ形(I'm + 副詞)で -ing が2回立った — I'm kind of like parroting / I'm just regurgitating。崩れる条件が1つに絞れた — 後ろが原形のときだけ。** FAULT_LINES「be 動詞」。 **★処方は前夜と同じ — 副詞は主語の直後(I kind of / I just)。否定なら I don't、I'm not ではない。**"
    },
    {
        issuedNight: 140,
        issuedDate: "2026-10-17",
        homework: "I'm の後ろは -ing / 形容詞 / 名詞。原形・過去形が来るなら I'm を捨てる — I'll just talk / I feel recharged(I'm kind of got recuperated / I'm just talk → I kind of recharged / I'll just talk)【据え置き3夜目】",
        verifiedNight: 141,
        verifiedDate: "2026-10-18",
        result: "FAILED",
        evidence: "第141夜、1回 — You know, I'm not abruptly, you know, cut because I want to go through five(話を遮るつもりはない、の文。I'm + 副詞 + 動詞)。★立った側 — I'm kind of like parroting your words / I'm just regurgitating the cliche's words / I'm enjoying / I'm going to talk / I'm trying(副詞を挟んでも、後ろが -ing なら be は正しく座った)",
        note: "**第140夜、前夜の宿題①が3夜連続 FAILED したので、据え置く。** **☓I I I'm kind of got recuperated / ☓I'm just talk about randomly about this stuff。** **★第138夜 I'm listened / I'm enjoy → 第139夜 I'm not comment / I'm kind of disagree → 第140夜 I'm kind of got / I'm just talk。** **★今夜の2回は、2回とも副詞(kind of / just)が be と動詞の間に入った。副詞を挟むと、口は先に I'm を出し、それから動詞を探す。** FAULT_LINES「be 動詞」の、余りの席。 **★処方は1段足す — I'm と言って次に kind of / just が来たら、I'm を I に戻す(I kind of / I just / I'll just)。** **★判定 — 次のレッスンで I'm + 原形 / 過去形(副詞を挟んでも)が出たら FAILED。**出なければ EXECUTED。"
    },
    {
        issuedNight: 140,
        issuedDate: "2026-10-17",
        homework: "in this day and age — this を動かさない(today day and age / today's day and age → in this day and age)",
        verifiedNight: 141,
        verifiedDate: "2026-10-18",
        result: "AVOIDED",
        evidence: "第141夜、today day and age / today's day and age は0回。「今の時代」の席は1回 — why we are living like, that's like a barbarian era right now?(right now で逃がした)。in this day and age も0回",
        note: "**第140夜、定型が4回、毎回同じ形で崩れた。** **☓today day and age, smart phone is enough / ☓people say like, today day and age, humanities ... / ☓the important point of today's day and age, today's day and age。** **★this が today に替わり、in が落ちた。4回とも同じ形なので、本人の口では today day and age が1つの定型として登録されている。** **★外部AIの分析も同じ所を拾った。** FAULT_LINES「定型の崩れ」。 **★処方は1段 — 「今の時代」と言いたくなったら、these days か nowadays の1語にする。定型を使うなら in this day and age を丸ごと。** **★判定 — 次のレッスンで today day and age / today's day and age が出たら FAILED。**in this day and age / these days / nowadays で出れば EXECUTED。時代の話が来なければ NO_CHANCE。"
    },
    {
        issuedNight: 140,
        issuedDate: "2026-10-17",
        homework: "動名詞の主語は単数 — Studying past exams IS beneficial(studying past exams are very beneficial → Studying past exams is very beneficial)",
        verifiedNight: 141,
        verifiedDate: "2026-10-18",
        result: "NO_CHANCE",
        evidence: "第141夜、本人の発話に動名詞が主語の文なし。★読み上げ(模範解答1・2)には allocating ... can aid / testing will became があるが、朗読なので判定に入れない",
        note: "**第140夜、動名詞の主語に are。** **☓So, so studying past exams are very beneficial。** **★同じ段落の1文目(studying the past exam is very ... nice)は is で立っていた。2文目で exams を複数にした瞬間に、動詞が exams に引っ張られて are になった。主語は studying で、exams はその目的語。** **★同じ夜、A and B に is が3回(spring and autumn is / politics and the economy is / the nature and philosophy is)— 主語の数を、動詞の直前の名詞で数えている。** FAULT_LINES「限定詞の数」。 **★処方は1段 — -ing で始まる文は、動詞の前で「これは1つの行為だ」と数え直す。is。** **★判定 — 次のレッスンで studying / reading / watching ~s are が出たら FAILED。**is で出れば EXECUTED。動名詞を主語にする文が来なければ NO_CHANCE。"
    },
    {
        issuedNight: 139,
        issuedDate: "2026-10-16",
        homework: "I'm と言ったら次は -ing か形容詞 — I'm not going to comment / I kind of disagree(I'm not comment / I'm kind of disagree → I'm not going to comment / I kind of disagree)【据え置き2夜目】",
        verifiedNight: 140,
        verifiedDate: "2026-10-17",
        result: "FAILED",
        evidence: "第140夜、2回 — I I I'm kind of got recuperated(海で気分が戻った、の文)/ I'm just talk about randomly about this stuff(残り10分の宣言)。★立った側 — I'm in the car / I'm going to talk about that topic / I'm glad you brought up(-ing・形容詞の前では be が正しく座った)",
        note: "**第139夜、前夜の宿題①が2回 FAILED したので、据え置く。** **☓I'm not comment my own opinion / ☓I'm kind of disagree。** **★★2回目が重い — 講師が10秒前に I kind of disagree と言った。男はそれを聞いて、be を1枚足して返した。第100夜の hurry(講師が I'm never in a rush と置いた20分後に落とした)と同じ、「正解を聞いた直後に崩す」型。** **★分母 — I'm going to cheat / I'm counting on you / I'm talking to you and AI は立った。going to と -ing の前では be が座る。原形(comment / disagree)の前で余る。** FAULT_LINES「be 動詞」の、余りの席。 **★処方は変えない — I'm と言ったら、次は -ing か形容詞か名詞。原形が来そうなら I'm を捨てて I から。** **★判定 — 次のレッスンで I'm + 原形が出たら FAILED(3夜連続)。**出なければ EXECUTED。この形は1夜に1回は来る。 **☓第140夜、FAILED(2回、3夜連続)。**I'm kind of got recuperated / I'm just talk。**★2回とも kind of / just が be と動詞の間に入った文 — 副詞を挟むと、be を先に出してから動詞を探す。** **★分母 — I'm in the car / I'm going to / I'm glad は立った。**宿題は据え置き(3夜連続)。"
    },
    {
        issuedNight: 139,
        issuedDate: "2026-10-16",
        homework: "thoughts は複数 — What are your thoughts on(what's your thoughts on this → What are your thoughts on this)",
        verifiedNight: 140,
        verifiedDate: "2026-10-17",
        result: "AVOIDED",
        evidence: "第140夜、意見を聞く場面は4回来て、thoughts は0回 — So, what do you think about that overall? / what's your take on this trend? / what would you pick if you were a candidate? / could you tell me your opinion。★what's your take は take が単数なので what's で正しい",
        note: "**第139夜、今朝のカードが同じ日の夜に外れた。** **☓Uh what do you what what what's your thoughts on this?**模範解答1を読み終えて、講師に振った1文。 **★06-28(what's your general thoughts)、07-11(what's your thoughts → 直後に自分で what are に修正)、そして今朝(10/16)の書き取りカード What are your thoughts on the new tax legislation? に登録した席で、12時間後に落ちた。** **★第137夜の set in his ways(同日のカード、in の位置がずれた)と同じ現象 — 当日のカードは中身が届き、金具が1つ動く。** FAULT_LINES「限定詞の数」の、thoughts の席。 **★処方は1段 — thoughts と言うなら、その前は are。what's と言いかけたら、thoughts を捨てて what do you think に替える。** **★判定 — 次のレッスンで what's your thoughts が出たら FAILED。**What are your thoughts で出れば EXECUTED。意見を聞く場面が来なければ NO_CHANCE(まず無い。この男は1夜に3回聞く)。 **★第140夜、AVOIDED。**意見を4回聞き、thoughts の席を一度も使わなかった — what do you think / what's your take on this trend / what would you pick / tell me your opinion。**★take(単数)に逃がしたので what's が正しく座った。**処方の逃がし先(what do you think)が作動した。thoughts そのものは未検証のまま。"
    },
    {
        issuedNight: 139,
        issuedDate: "2026-10-16",
        homework: "過去の後悔は had + 過去分詞 — I wish I had written / If I had, I'd have passed(I wish I wrote this answer that day / I will definitely first → I wish I had given this answer / I'd have passed)",
        verifiedNight: 140,
        verifiedDate: "2026-10-17",
        result: "EXECUTED",
        evidence: "第140夜、I wish I had just experienced without, you know, watching smart phone(海でスマホの教材を見ていたことの後悔)。★2年前の試験ではなく、今日の後悔で had が立った。☓experienced の後ろの it は落ちた",
        note: "**第139夜、2年前の後悔が全部現在形で出た。** **☓I wish I wrote this answer, you know, that day / ☓I will, you know, definitely first, you know, if I wrote this answer。**2年前の二次で同じお題(サイバーセキュリティ)が出て、小学生の英語で答えた、という話。 **★I wish I wrote は「今、書けたらなあ」。過去は I wish I HAD written。「書いていたら受かっていた」は If I had, I'd HAVE passed。** **★第135夜の should have + 原形(I should have like wake up)と同じ帯 — 終わったことへの後悔が、この男の英語では現在形で出る。** FAULT_LINES「時制」の、後悔の席。 **★処方は1段 — I wish と言ったら、次は had。**I wish I had / If I had。 **★判定 — 次のレッスンで I wish I + 過去形(過去の後悔として)/ I will + 過去の仮定 が出たら FAILED。**I wish I had / I'd have で出れば EXECUTED。後悔の場面が来なければ NO_CHANCE。 **★★第140夜、EXECUTED(24時間)。**I wish I had just experienced(it)without looking at my phone。**宿題を出した場面(2年前の試験)ではなく、今日の海辺の後悔で立った。**☓目的語の it と look at は落ちた。後悔の金具は立った。"
    },
    {
        issuedNight: 138,
        issuedDate: "2026-10-15",
        homework: "I'm の後ろに動詞の原形・過去形を置かない — I just listened / I enjoy(I'm just listened to him / I'm enjoy → I just listened to him / I enjoy it)",
        verifiedNight: 139,
        verifiedDate: "2026-10-16",
        result: "FAILED",
        evidence: "第139夜、2回 — Today, I I'm not comment my own opinion(意見を言わない、の宣言)/ I'm kind of disagree with what they're doing in EU(講師が10秒前に I kind of disagree と正しく言った直後の復唱)。★立った側 — I'm going to cheat / I'm counting on you / I'm talking to you and AI(going to と -ing の前では be が正しく座った)",
        note: "**第138夜、最古の持病 #3 の骨が、1文で2回出た。** **☓yesterday I'm just listened to him 25 minutes / ☓I I'm enjoy。**昨日の81歳の話を今日の講師にしている最中、「あの人が好きだ」と言う直前の1文。 **★第119夜 I'm always appreciate → 第120夜 I'm fully understand → 第136夜 I'm very appreciate → 第138夜 I'm listened / I'm enjoy。動詞は変わるが、穴は同じ — 主語の後ろに be を置いてから、動詞を言う。** **★出る場所も同じ — 感情が動いた直後の1文(PRECURSORS「相手を褒めた直後の1文」の広い形)。** FAULT_LINES「be 動詞」の、余りの席。 **★処方は1段 — I'm と言ったら、次は -ing か形容詞か名詞。動詞の原形・過去形が来そうなら、I'm を捨てて I から言い直す。** **★判定 — 次のレッスンで I'm + 動詞の原形 / 過去形(I'm listened / I'm enjoy / I'm appreciate / I'm understand)が出たら FAILED。**主語+動詞で出れば EXECUTED。この形は1夜に1回は来るので、NO_CHANCE はまず無い。 **☓第139夜、FAILED(2回)。**I'm not comment / I'm kind of disagree。**★2回目は講師の正しい文(I kind of disagree)を10秒後に be 付きで復唱した形 — 耳で正解を聞いて、be を1枚足して返した。** **★分母 — I'm going to cheat / I'm counting on you / I'm talking to you は立った。going to と -ing の前では座り、原形の前で余る。** **★出た場所は2回とも、感情の動いた宣言(ずるをする / 反対だ)。**宿題は据え置き(2夜連続)。"
    },
    {
        issuedNight: 138,
        issuedDate: "2026-10-15",
        homework: "船は in、ページは on — in the same boat / on the same page(on a boat with us / in the same page → in the same boat / on the same page)",
        verifiedNight: 139,
        verifiedDate: "2026-10-16",
        result: "NO_CHANCE",
        evidence: "第139夜、同じ境遇・同じ認識を言う場面は来なかった。boat / page は0回。「あなたの立場は覚えている(I heard your stance)」は言ったが、定型の席ではない",
        note: "**第138夜、「同じ」の定型2本の前置詞が入れ替わった。** **☓maybe on on a semi on a boat with us, you know, in the same page。**81歳と今日の講師が同じ心配をしている、の文。in the same boat(同じ境遇)が on a boat(船の上)に、on the same page(同じ認識)が in the same page(ページの中)に。 **★2本とも「同じ」の定型で、違うのは前置詞だけ。男はその前置詞だけを交換した。**船の中(in)、紙の上(on)。 FAULT_LINES「前置詞の席違い」の、定型の席。第136夜の walking on eggshells(on 落ち)と同じ帯。 **★処方は1段 — boat の前は in、page の前は on。**物理で覚える(船には乗り込む、紙には載る)。 **★判定 — 次のレッスンで on the same boat / in the same page / on a boat(境遇の意味で)が出たら FAILED。**in / on で出れば EXECUTED。同じ境遇・同じ認識を言う場面が来なければ NO_CHANCE。 **★第139夜、NO_CHANCE。**同じ境遇・認識を言う場面が来なかった。処方は装填のまま。"
    },
    {
        issuedNight: 138,
        issuedDate: "2026-10-15",
        homework: "人の性別を言った直後の代名詞 — a young woman ... she(a young female ... he will be re-elected → a young woman ... she'll be re-elected)",
        verifiedNight: 139,
        verifiedDate: "2026-10-16",
        result: "NO_CHANCE",
        evidence: "第139夜、本人の発話に女性は出てこなかった。Rosa Parks の when she refused は模範解答の朗読で、本人の文ではない(朗読は正しく she だった)",
        note: "**第138夜、女性と言った5秒後に he。** **☓currently a young female, not a young lady, was is my our city mayor ... maybe he will be re-elected again。**草加市長の話。 **★第137夜は妻・息子・女性市長・ズマの4人分の人の話で、伝令は一度も揺れなかった。今夜は自分の町の市長で揺れた。遠い国の人は間違えず、自分の町の人を間違える。** **★FAULT_LINES「代名詞の取り違え」の生態(相手を擁護している最中にだけ出る)とは少し違う — 今夜は自分の町を自慢している最中。** **★処方は1段 — woman / female / lady と言ったら、次の代名詞は she で固定する。**名詞を先に置く(the mayor)なら揺れない。 **★判定 — 次のレッスンで woman / female / lady / girl / mother / wife の後ろで he / his が出たら FAILED。**she で出れば EXECUTED。女性の話が来なければ NO_CHANCE。 **★第139夜、NO_CHANCE。**本人の発話に女性が出なかった。**★朗読の中の Rosa Parks は she で正しく読めている — 印刷されていれば伝令は揺れない。**処方は装填のまま。"
    },
    {
        issuedNight: 137,
        issuedDate: "2026-10-14",
        homework: "involve の向き — 仕事が involve する、人は involved in(the work you're involving / my work is involved in driving → the work you're involved in / my work involves a lot of driving)",
        verifiedNight: 138,
        verifiedDate: "2026-10-15",
        result: "NO_CHANCE",
        evidence: "第138夜、involve は0回。自分の仕事の話も、相手の仕事の話も来なかった(話題は写真の壁と昨日の検死の読み上げ)",
        note: "**第137夜、involve が2回とも逆向きに出た。** **☓because of the work you're involving(講師の仕事を褒める文)/ ☓my work in is involved in like driving a lot(自分の仕事の説明)。**人が仕事を巻き込み、仕事が運転に巻き込まれた。 **★involve = 〜を含む・伴う。主語は仕事・計画・役割(my work involves driving)。人を主語にするなら be involved in(I'm involved in construction)。**日本語の「〜に関わる」が1語なので、英語の2形(involve / involved in)に割れない。 FAULT_LINES「方向の反転」の、involve の席。 **★処方は1段 — 主語が人なら involved in、主語が仕事なら involves。**人 + involving は無い。 **★判定 — 次のレッスンで 人 + involving / 仕事 + is involved in が出たら FAILED。**正しい向きで出れば EXECUTED。仕事・活動の説明が来なければ NO_CHANCE(本人の仕事の話は1夜に1回は来る)。 **★第138夜、NO_CHANCE。**involve を使う場面が来なかった。仕事の説明は I'm the student(a lesson side と言った)だけ。処方は装填のまま次の夜へ。"
    },
    {
        issuedNight: 137,
        issuedDate: "2026-10-14",
        homework: "very の後ろは形容詞1語 — really struggling / not serious at all / in a tight spot(very struggling / very not serious / very in a press situation / very a polarizing → really struggling / not serious at all / in a tight spot / a very polarizing)",
        verifiedNight: 138,
        verifiedDate: "2026-10-15",
        result: "EXECUTED",
        evidence: "第138夜、very は13回 — very politically knowledgeable / very humorous / very funny / very distant / very fascinating / very correct / very hard / very aware ×2 / very politically conservative / very weird / very small / very local。13回とも後ろは形容詞か副詞。very + 動詞 / not / a / 句 は0",
        note: "**第137夜、very が置けない席に4回座った。** **☓young people are very struggling(動詞の -ing の前)/ ☓It's very not serious(not の前)/ ☓it's very in a press situation(句の前)/ ☓very a polarizing stance(a の前)。** **★第133夜(very in a funk / very uphill battle / very not interesting / Very so huge disappointed)の持病が、4日おいて4方向で再発。**強めたい気持ちが先に出て、very が後ろの品詞を見ずに座る。 FAULT_LINES「副詞・形容詞の席」の、very の席。 **★処方は1段 — very の次が形容詞か副詞の1語でなければ、very を really に替えるか捨てる。**really struggling / not serious at all / in a tight spot / a very polarizing stance(a が先)。 **★判定 — 次のレッスンで very + 動詞 / very + not / very + a / very + 句 が出たら FAILED。**very + 形容詞だけなら EXECUTED。very が1回も出なければ NO_CHANCE(まず無い。この男は1夜に10回 very と言う)。 **★第138夜、EXECUTED(13/13)。**very の後ろが13回とも形容詞か副詞だった。前夜4方向で崩れた席が、1夜で全部立った。**★ただし very local election は a が落ち(It's ▲ very local election)、a very politically conservative は a が余った。very の席は守り、a の席がずれた。**宿題は棚から下ろす。再発したら戻す。"
    },
    {
        issuedNight: 137,
        issuedDate: "2026-10-14",
        homework: "scale は on、level は at — on a bigger scale / at the local level(in a big scale / in the big scale / in the local level → on a bigger scale / at the local level)",
        verifiedNight: 138,
        verifiedDate: "2026-10-15",
        result: "NO_CHANCE",
        evidence: "第138夜、scale / level は0回。規模や段階の話が来なかった(it's only pointing to the American national thing、と national は出たが level は付かなかった)",
        note: "**第137夜、前夜の前兆が宿題に昇格した。** **☓on a, uh, in a big scale / ☓in the big scale / ☓in the local level。**第136夜(in a global scale / in a small scale / in a local level)に続き、2夜で7回、scale と level の前置詞が全部 in。 **★★今夜は on a と正しく言いかけて、in a に戻した。前夜の検死が紙に書いた正解を、口は先に出し、持病が上書きした。**正解が在庫に無いのではなく、在庫の正解より持病の方が速い。 FAULT_LINES「前置詞の席違い」の、規模の席。 **★処方は1段 — scale と言う前に on、level と言う前に at を、先に口に出す。**on a bigger scale / on a global scale / at the local level / at the national level。 **★判定 — 次のレッスンで in a ~ scale / in the ~ level が出たら FAILED。**on / at で出れば EXECUTED。規模や段階の話が来なければ NO_CHANCE(政治・経済の練習が続く限り、1夜に1回は来る)。 **★第138夜、NO_CHANCE。**scale も level も出なかった。**★前兆(on a と言いかけて in a に戻す)の場面も来ていない。**処方は装填のまま。"
    },
    {
        issuedNight: 136,
        issuedDate: "2026-10-13",
        homework: "「まだ先」は still a long way off / not anytime soon(I don't think voting online will be far away → online voting is still a long way off)",
        verifiedNight: 137,
        verifiedDate: "2026-10-14",
        result: "NO_CHANCE",
        evidence: "第137夜、未来の遠近を言う場面は来なかった。未来の文は there will be an election / I think I will pass / Maybe next time の3つで、どれも「まだ先か近いか」の距離を言っていない。I don't think ~ は I don't think they are(数の話)と I don't think I don't need lyrics(歌詞)で、far / long / soon は0",
        note: "**第136夜、否定を前に出した型が、距離の語に当たって裏返った。** **☓still I don't think uh voting online will be far far away. I don't know why。**「ネット投票はまだ先」と言うつもりで、「遠くないと思う=もうすぐ来る」になり、直後の I don't know why で講師には預言として届いた。 **★否定を前に出す型(I don't think we'd be happy with that)は、この番組が10/13 に登録したカードの型でもある。far / long / soon のような距離・時間の語と組むと、向きが反転する。** FAULT_LINES「否定」の、距離の席。 **★処方は1段 — 「まだ先」は still a long way off。否定を前に出すなら far は使わない。** **★判定 — 次のレッスンで I don't think ~ (will be) far away(「まだ先」の意味で)が出たら FAILED。**a long way off / not anytime soon で出れば EXECUTED。「まだ先」を言う場面が来なければ NO_CHANCE。 **★第137夜、NO_CHANCE。**「まだ先」を言う場面が来なかった。話題は講師の MRI と南アフリカの政治で、未来の距離を言う文は無い。**★否定の前出し(I don't think ~)は2回出たが、距離の語とは組んでいない。**処方は装填したまま次の夜へ。"
    },
    {
        issuedNight: 136,
        issuedDate: "2026-10-13",
        homework: "卵の殻と薄氷は on — walking on eggshells / on thin ice(walking around eggshells / walking eggshells → walking on eggshells)",
        verifiedNight: 137,
        verifiedDate: "2026-10-14",
        result: "NO_CHANCE",
        evidence: "第137夜、eggshells / thin ice は0回。慎重さ・危うさを言った場面は the current government is very in a press situation(苦しい立場)の1回だけで、定型(walk on eggshells / on thin ice)は使っていない。かわりに very + 句 の穴(第133夜の持病)が開いた",
        note: "**第136夜、定型2本の「上」が消えた。** **☓it's very thin thin ice and uh eggshells you know what I mean walking around eggshells / ☓skillfully uh walking eggshells。**若い政治家が一言で終わる、の説明。語は2本とも持っていて、on だけが無かった。around だと殻の周りを回り、無印だと殻そのものを歩かせる。 FAULT_LINES「前置詞の席違い」の、定型の席。 **★処方は1段 — eggshells / thin ice と言う前に on を1枚置く。** **★判定 — 次のレッスンで eggshells / thin ice が on 無しで出たら FAILED。**on 付きで出れば EXECUTED。慎重さや危うさを言う場面が来なければ NO_CHANCE。 **★第137夜、NO_CHANCE。**卵の殻も薄氷も出なかった。危うい立場を言ったのは政府の話(very in a press situation)で、定型の席ではなく very の席が壊れた。**★on が落ちる前置詞の持病そのものは、別の席で4回出ている(in a big scale ×2 / in the local level / you are ▲ the forefront)。**定型の on は次の夜へ。"
    },
    {
        issuedNight: 136,
        issuedDate: "2026-10-13",
        homework: "感謝は I'd appreciate it if / I appreciate — be を貼らない(I'm very appreciate → I'd appreciate it if you could chime in)",
        verifiedNight: 137,
        verifiedDate: "2026-10-14",
        result: "NO_CHANCE",
        evidence: "第137夜、appreciate は0回。礼は Thanks so much / Thank you の2回で、どちらも be は付いていない。頼み事は could you pick (something) の1回で、感謝の前置きは無かった。**☓同じ骨(主語の後ろに be を置いて滑る)は I'm so nice(it's so nice)で1回出た — ただし一般動詞の前の be ではなく、主語の取り違え**",
        note: "**第136夜、この番組でいちばん古い持病 #3 が戻った。** **☓I'm very appreciate uh much appreciated if you whenever you know you can chime in。**直したいときは口を挟んでくれ、という頼み事の直前。 **★第112夜(褒められた直後)、第116・119夜(褒めた直後)、第120夜(I'm fully understand — 同じ骨)、そして今夜(頼み事の直前)。感情が動いた1文で、be が一般動詞に貼り付く。** **★much appreciated は「ありがとう」の後置き(Thanks, much appreciated)で、if 節を引く席ではない。** **★処方は1段 — 頼み事の感謝は I'd appreciate it if の5語で固定する。I'm と言いかけたら捨てる。** **★判定 — 次のレッスンで I'm appreciate / I'm very appreciate / I was appreciated が出たら FAILED。**I'd appreciate it if / I appreciate で出れば EXECUTED。感謝や頼み事の文が来なければ NO_CHANCE。 **★第137夜、NO_CHANCE。**感謝の文に appreciate が来なかった。礼は Thanks so much の1回で、be 無し。**★PRECURSORS「相手を褒めた直後の1文」の場面は来た(you are very on the ball / you haven't changed for decades)が、そこで出たのは I'm appreciate ではなく、否定3枚の渋滞(I don't think maybe you are not you haven't changed)だった。**処方は装填のまま。"
    },
    {
        issuedNight: 135,
        issuedDate: "2026-10-11",
        homework: "後悔は should have + 過去分詞 — I should have woken up / I should have known better(I should have like wake up / I should know better → I should have woken up / I should have known better)",
        verifiedNight: 136,
        verifiedDate: "2026-10-13",
        result: "NO_CHANCE",
        evidence: "第136夜、後悔の場面は来なかった。昨日の授業を飛ばした話は two days in a row missed class is not good と事実だけで、should have は0回。should は we should always invest(提案)で2回",
        note: "**第135夜、後悔が2回とも後悔の形にならなかった。** **☓I should have like wake up early(地震で TOEIC を受けられなかった話)/ ☓I should know better(英検の後ろの席の反響の話)。** **★should have の後ろに原形を置くと崩れる。should know better は「今、分別があるべきだ」で、終わったことへの後悔にならない。** FAULT_LINES「時制」の、後悔の席。 **★処方は1段 — 「〜すればよかった」は should have + 過去分詞。woken / known / brought / gone。** **★判定 — 次のレッスンで should have + 原形 / should know better(過去の後悔として)が出たら FAILED。**should have + 過去分詞で出れば EXECUTED。後悔する場面が来なければ NO_CHANCE。 **★第136夜、NO_CHANCE。**後悔する場面が来なかった。前日の授業を飛ばした話は、後悔ではなく「2日続けては良くない」という事実で終わった。should have は0回。処方は装填したまま次の夜へ。"
    },
    {
        issuedNight: 135,
        issuedDate: "2026-10-11",
        homework: "試験の準備は prepare FOR — help me prepare for the second stage(help me prepare the test → help me prepare for the test)",
        verifiedNight: 136,
        verifiedDate: "2026-10-13",
        result: "NO_CHANCE",
        evidence: "第136夜、prepare の動詞は0回。let me get straight into my exam prep(名詞)と as always no preparation(名詞)の2回だけで、どちらも正しい。prepare for / prepare the の席は来なかった",
        note: "**第135夜、同じ夜に立って、落ちた。** **★冒頭 — So I have to prepare for the next, second stage(立った)。☓締め — you will help me prepare the test again, second one(落ちた)。** **★prepare the test は「試験を作る」(先生の側)。受ける側は prepare for。**本人は講師に英検1級の作問を頼んだことになった。FAULT_LINES「前置詞の席違い」の、準備の席。 **★処方は1段 — 試験・面接・旅行の準備は prepare FOR。** **★判定 — 次のレッスンで prepare the test / prepare the exam(受ける側として)が出たら FAILED。**prepare for で出れば EXECUTED。準備の話が来なければ NO_CHANCE。**★二次試験の準備はこの先も続くので、場面は来る見込みが高い。** **★第136夜、NO_CHANCE。**prepare は動詞では出なかった。**★分母を隠さない — exam prep / no preparation の名詞2回はどちらも正しい。**二次の準備の話はこの先も続くので、動詞の席は来る。"
    },
    {
        issuedNight: 135,
        issuedDate: "2026-10-11",
        homework: "kind of の後ろの人の名詞に a — I'm kind of a comedian(I'm kind of comedian / kind like idiot → I'm kind of a comedian / kind of an idiot)",
        verifiedNight: 136,
        verifiedDate: "2026-10-13",
        result: "EXECUTED",
        evidence: "第136夜、it's kind of like a uh uh how do I put it uh uh threat — kind of like a threat で a が立った(分母1)。☓ただし kind of like a big speakers / kind like a crazy festival things / kind of like a little bit enlightening societies と、a + 複数が3回",
        note: "**第135夜、kind of の後ろで a が3回欠勤した。** **☓I'm kind of comedian / ☓I was kind like idiot / ☓I'm kind of, old man。**自分を何かに喩える3回が、3回とも a 抜け。 **★kind of の後ろが形容詞なら a は要らない(kind of tired)。名詞なら a が残る(kind of a comedian)。** FAULT_LINES「冠詞」の、喩えの席。 **★処方は1段 — kind of の次が人や物の名詞なら a を足す。** **★判定 — 次のレッスンで kind of + 名詞(a 抜け)が出たら FAILED。**kind of a ~ で出れば EXECUTED。自分や人を喩える場面が来なければ NO_CHANCE。 **★第136夜、EXECUTED(1/1)。**it's kind of like a — how do I put it — threat。kind of の後ろの単数名詞に a が立った。 **☓そして同じ口が、kind of like a の後ろに複数を3回置いた — a big speakers / a crazy festival things / a enlightening societies。**a は置いた。後ろを単数にしなかった。**第115夜の「宿題の過剰執行」(a と言ったら名詞まで)と同じ形。**宿題の文面は執行されたので EXECUTED とし、a + 複数は「限定詞の数」の持病として別に数える。"
    },
    {
        issuedNight: 134,
        issuedDate: "2026-10-10",
        homework: "音が届くかは hear — I don't know if you can hear it(I don't know if you can listen to this → I don't know if you can hear it)",
        verifiedNight: 135,
        verifiedDate: "2026-10-11",
        result: "NO_CHANCE",
        evidence: "第135夜、音や回線が相手に届いているかを確かめる場面は来なかった(カメラは本人側で切ってあり、Can you see? と見えるかは聞いた)。listen は I recommend your student to listen で1回 — 生徒が耳を傾けて練習する、の正しい側。宿題の席(届くかを listen で聞く)は0",
        note: "**第134夜、部屋の BGM が講師に届いているかを聞く1文で、hear が listen になった。** **☓I don't know if you can listen to this ambient kind of music, BGM? No?** **★講師はそのまま I can't hear it actually / I can't really make it out と返した。正解は隣に2回置かれた。** **★hear = 音が耳に届く(意志は要らない)、listen = 耳を向ける(意志が要る)。日本語の「聞こえる」と「聴く」がどちらも「きく」なので、英語の2語に割れない。** **★処方は1段 — 音が届いているかを聞くなら hear。Can you hear me? / Can you hear the music?** **★判定 — 次のレッスンで can you listen to this のように「届くか」を listen で聞いたら FAILED。**can you hear で出れば EXECUTED。音や回線の確認が来なければ NO_CHANCE。 **★第135夜、NO_CHANCE。**音の確認は来なかった。Can I see? → Can you see? と、見えるかの確認では主語を自分で直している。"
    },
    {
        issuedNight: 134,
        issuedDate: "2026-10-10",
        homework: "その場の約束は won't — I won't stop you / I won't nod(I don't stop you / I don't nod → I won't stop you / I won't nod)",
        verifiedNight: 135,
        verifiedDate: "2026-10-11",
        result: "NO_CHANCE",
        evidence: "第135夜、相手に「〜しないから」と約束する場面は来なかった。未来の文は I'm going to read this article / I'll make it to the next stage / I will prepare の3つで、どれも否定の約束ではない",
        note: "**第134夜、講師に先に答えてもらうルールを説明する場面で、これからの約束が現在形で言われた。** **☓But, you know, I don't stop you, I don't, and also I don't talk, I don't nod, you know, I don't make any sounds unless you say finished。** **★講師は同じ場面で I won't follow up questions と返した。正解は隣に置かれた。** **★現在形の I don't stop you は「私は(普段)止めない人だ」という習慣の文になる。今この場で約束するなら will の否定。** **★処方は1段 — 「〜しないから」と相手に約束するときは I won't。** **★判定 — 次のレッスンで I don't stop you / I don't interrupt 型の約束が出たら FAILED。**I won't で出れば EXECUTED。約束する場面が来なければ NO_CHANCE。 **★第135夜、NO_CHANCE。**約束の場面が来なかった。"
    },
    {
        issuedNight: 134,
        issuedDate: "2026-10-10",
        homework: "汚い言葉の後は pardon my French(sorry for my speaking French → pardon my French)",
        verifiedNight: 135,
        verifiedDate: "2026-10-11",
        result: "NO_CHANCE",
        evidence: "第135夜、汚い言葉は0。いちばん強い語は idiot / weirdo",
        note: "**第134夜、英検なんかどうでもいい、と強い言葉を使った直後の謝りで、定型の部品が入れ替わった。** **☓I don't give a fuck about, sorry for my speaking French, but I don't give a fuck about, you know, so, but I have to do this。** **★10/6 の置き換えに Pardon my French, but... が入っていた。中身(French で謝る)は4日後に出て、金具(pardon my)が sorry for my speaking に替わった。** FAULT_LINES「set phrase の崩れ」と同じ形 — 狙う句は正しく、部品が入れ替わる。 **★処方は1段 — 3語で固定。Pardon my French。** **★判定 — 次のレッスンで sorry for my French / sorry for my speaking French が出たら FAILED。**pardon my French で出れば EXECUTED。強い言葉を使う場面が来なければ NO_CHANCE。 **★第135夜、NO_CHANCE。**強い言葉を使う場面が来なかった。"
    },
    {
        issuedNight: 133,
        issuedDate: "2026-10-10",
        homework: "投手から打つは off — a hit off Mason Miller(he hit like a from Mason Miller → he got a hit off Mason Miller)",
        verifiedNight: 134,
        verifiedDate: "2026-10-10",
        result: "NO_CHANCE",
        evidence: "第134夜、野球の話は来なかった。話題は夜勤(graveyard shift)、パンダの陰謀論、英検二次の練習(自由貿易)。hit / off / from + 投手 そのものが0",
        note: "**第133夜、Chourio のサヨナラ打を祝う1文で、投手の前の前置詞が from になった。** **☓I got goosebumps, you know, he hit like a from Mason Miller。** **★前日の予習カードには homered off his old team / took Sale deep と書いてあった。**FAULT_LINES「前置詞の席違い」の、野球の席。 **★処方は1段 — 投手の名前の前は off。** **★判定 — 次のレッスンで a hit from / homered from が出たら FAILED。**off で出れば EXECUTED。打者と投手の話が来なければ NO_CHANCE。 **★第134夜、NO_CHANCE。**野球の話が0だった。打者と投手の場面が来ていない。"
    },
    {
        issuedNight: 133,
        issuedDate: "2026-10-10",
        homework: "very は形容詞の前だけ — 名詞の前は a real、句の前は really(very uphill battle → a real uphill battle / very in a funk → really in a funk)",
        verifiedNight: 134,
        verifiedDate: "2026-10-10",
        result: "NO_CHANCE",
        evidence: "第134夜、強めの副詞は3回 — very cute character / It's very funny / today was a really good day。3回とも形容詞の前で正しい。宿題の席(名詞・句の前で強める)は0",
        note: "**第133夜、very と much が、置けない席に5回座った。** **☓it's very uphill battle / Shohei is very in a funk / it's very not interesting / Very so huge disappointed / so much vulnerable。** **★very は形容詞と副詞の前だけ。名詞の前なら a real / a big、句(in a funk / in trouble)の前なら really。** **★処方は1段 — very の次の語が名詞か句なら、really に替える。** **★判定 — 次のレッスンで very + 名詞 / very + in ~ が出たら FAILED。**really / a real で出れば EXECUTED。強める場面が来なければ NO_CHANCE。 **★第134夜、NO_CHANCE。**very は2回(very cute character / It's very funny)、really は1回(a really good day)。3回とも形容詞の前で、置き場所の誤りは0。**★ただし宿題が見張る席 — 名詞の前(very uphill battle)と句の前(very in a funk)— で強める場面は1回も来ていない。分母0なので EXECUTED にはしない。**形容詞の前の very は前夜も正しかった席である。"
    },
    {
        issuedNight: 133,
        issuedDate: "2026-10-10",
        homework: "スモールベースボールは small ball(small baseball → small ball)",
        verifiedNight: 134,
        verifiedDate: "2026-10-10",
        result: "NO_CHANCE",
        evidence: "第134夜、野球の話は来なかった。small ball / small baseball そのものが0",
        note: "**第133夜、講師の分析(全力疾走で失策を誘う)を自分の国の野球として受けた直後に、和製英語が出た。** **☓Small baseball. Yeah. No homers yeah. That's our way。** **★英語では small ball。同じ夜 it's a Japanese baseball(スポーツ名に a)も出た。** **★処方は1段 — baseball を small の後ろに置かない。** **★判定 — 次のレッスンで small baseball が出たら FAILED。**small ball で出れば EXECUTED。野球の戦い方の話が来なければ NO_CHANCE。 **★第134夜、NO_CHANCE。**野球の戦い方の話は来なかった。"
    },
    {
        issuedNight: 132,
        issuedDate: "2026-10-08",
        homework: "sure の前は be — I'm not sure / I'm pretty sure(I don't sure → I'm not sure / I definitely sure → I'm definitely sure)",
        verifiedNight: 133,
        verifiedDate: "2026-10-10",
        result: "EXECUTED",
        evidence: "第133夜、I'm not sure like a new like rookie shortstop / I'm not sure the name — 2回とも be が立った。I don't sure / I definitely sure は0",
        note: "**第132夜、形容詞 sure の前の be が一夜2回落ちた。** **☓Because there's no result yet, so I don't sure I'm going to the next stage。**1文前に I'm not sure と正しく言っている。**☓I definitely sure maybe Shawshank will appear。** **★同じ夜の形容詞の前の be の欠勤は7回 — I can somewhat familiar / It always difficult / it's not gonna good / it just a starting point / Maybe you surprise。**FAULT_LINES「be動詞の欠落・二重」の、形容詞の席。 **★処方は1段 — sure の前は I'm。否定は not を足すだけ(do は使わない)。** **★判定 — 次のレッスンで I don't sure / I definitely sure / I sure が出たら FAILED。**I'm not sure / I'm pretty sure で出れば EXECUTED。確信を言う場面が来なければ NO_CHANCE。 **★第133夜、EXECUTED。**ヤンキースの新人遊撃手の名前を思い出せない場面で、I'm not sure が2回、be 付きで出た。**☓ただし後ろの名詞の前の of は落ちた(I'm not sure the name → I'm not sure of his name)。**"
    },
    {
        issuedNight: 132,
        issuedDate: "2026-10-08",
        homework: "worth の後ろは -ing — worth remembering(35 is worth remember → 35 hits is worth remembering)",
        verifiedNight: 133,
        verifiedDate: "2026-10-10",
        result: "NO_CHANCE",
        evidence: "第133夜、価値を言う場面は来なかった。worth そのものが0",
        note: "**第132夜、数えてから覚える、という自分の方法を説明する1文で -ing が落ちた。** **☓So I noticed that because 35 is worth remember。** **★worth は前置詞のように振る舞い、後ろは名詞か -ing(worth a try / worth the money / worth watching)。** **★処方は1段 — worth と言ったら、次の動詞に -ing を付ける。** **★判定 — 次のレッスンで worth + 原形 が出たら FAILED。**worth -ing / worth + 名詞 で出れば EXECUTED。価値を言う場面が来なければ NO_CHANCE。 **★第133夜、NO_CHANCE。**話題は NLCS で、worth を使う場面が来なかった。"
    },
    {
        issuedNight: 132,
        issuedDate: "2026-10-08",
        homework: "人を名詞で言う席は a — I'm not a salesperson(I'm not seller → I'm not a salesperson / serious teacher → a serious teacher)",
        verifiedNight: 133,
        verifiedDate: "2026-10-10",
        result: "FAILED",
        evidence: "第133夜、I'm not casual fan you know I'm kinda take position here — a が落ちた。3分前の I'm a casual Dodgers fan では立っている",
        note: "**第132夜、人を名詞で言う席で a が3回落ちた。** **☓I'm not seller, you know. I'm not, uh, sales person / if you're like serious teacher。** **★★分母を隠さない — 同じ夜、guy の前では3回立った(I'm not a novel guy / I'm a numbers guy / a guinea pig)。**落ちたのは guy 以外の職業名の前。 **★処方は1段 — I'm / you're の後ろに職業・役割の名詞を置くなら、先に a。** **★判定 — 次のレッスンで I'm not seller / I'm teacher 型が出たら FAILED。**a salesperson / a teacher で出れば EXECUTED。人を名詞で言う場面が来なければ NO_CHANCE。 **★第133夜、FAILED。**☓I'm not casual fan。肯定の I'm a casual Dodgers fan では立ち、否定で落ちた。前夜の I'm not seller と同じ形 — **not の後ろで札が飛ぶ。**ほかに impeccable guy / a October guy(母音の前)。**★a role player(講師)/ a silent killer(講師)は本人が復唱して立った。**"
    },
    {
        issuedNight: 131, issuedDate: '2026-10-06',
        homework: "責任を問われる = should be held accountable(it should held accountable → they should be held accountable)",
        verifiedNight: 132, verifiedDate: '2026-10-08',
        result: 'NO_CHANCE',
        evidence: "第132夜、責任を問う場面は来なかった。話題はハリー・ポッターの原書、夜間工事と curtain / carton、カードアプリと playphrase.me。should + 過去分詞 そのものが0",
        note: "**第131夜、二次のスピーチの結論になる1文で、受け身の be が落ちた。** **☓Because governments are the biggest institutes ... it should a, should held, held accountable。**国はいちばん大きな機関だから責任を問われるべきだ、の1文。 **★同じ夜の be の欠勤は4回 — should held / Which one we gonna do / you never gonna / you can maybe interested。余りは1回 — be pretend。**FAULT_LINES「be動詞の欠落・二重」の、受け身の席。 **★処方は1段 — should の後ろで「される」を言うなら、be を先に置く(should be held / should be protected)。** **★判定 — 次のレッスンで should held / must held のように助動詞の直後に過去分詞が来たら FAILED。**should be held / should be protected で出れば EXECUTED。責任や受け身を言う場面が来なければ NO_CHANCE。 **★第132夜、NO_CHANCE。**責任や受け身を言う場面が来なかった。",
    },
    {
        issuedNight: 131, issuedDate: '2026-10-06',
        homework: "両取りはできない = have your cake and eat it too(have a cake and eat it → have your cake and eat it too)",
        verifiedNight: 132, verifiedDate: '2026-10-08',
        result: 'NO_CHANCE',
        evidence: "第132夜、両取りの話は来なかった。have ~ cake の組み合わせそのものが0",
        note: "**第131夜、正しい場面で正しい諺を出し、持ち主の1語だけが落ちた。** **☓you can't like have a cake, how to say, have a cake and eat it too。**安全もプライバシーも両方ほしい、という講師の言葉への返し。 **★FAULT_LINES「set phrase の崩れ」と同じ形 — 狙う句は正しく、1粒入れ替わる。**第127夜の keep fingers crossed(your 落ち)と同じ席で、今夜は your の代わりに a が座った。 **★処方は1段 — ケーキは主語の持ち物。you なら your cake、I なら my cake。** **★判定 — 次のレッスンで have a cake and eat it が出たら FAILED。**your / my cake で出れば EXECUTED。両取りの話が来なければ NO_CHANCE。 **★第132夜、NO_CHANCE。**両取りの話が来なかった。ただし定型の持ち主の席は別の句で崩れた(lost my plot → lost the plot)。",
    },
    {
        issuedNight: 131, issuedDate: '2026-10-06',
        homework: "〜に関しては = with respect to(with respects to freedom → with respect to freedom)",
        verifiedNight: 132, verifiedDate: '2026-10-08',
        result: 'NO_CHANCE',
        evidence: "第132夜、話題を区切る定型が要る場面は来なかった。with respect / regarding / in terms of そのものが0",
        note: "**第131夜、定型を4つ続けて並べ、4つめに s が付いた。** **☓in terms of, as far as I know, when freedom's concerned, with respects to freedom, you know, I'm using English words, with respects to freedom。**本人は自分で定型を使っていると実況した。2回とも respects。 **★with respect to の respect は数えない。**with respects は With all due respect(失礼ながら)の側に寄る。 **★処方は1段 — with respect to は4語で1つの前置詞。s を付ける席は無い。** **★判定 — 次のレッスンで with respects to が出たら FAILED。**with respect to / regarding で出れば EXECUTED。話題を区切る場面が来なければ NO_CHANCE。 **★第132夜、NO_CHANCE。**",
    },
    {
        issuedNight: 130, issuedDate: '2026-10-05',
        homework: "母音の前は an(I didn't have a analog watch → I didn't have an analog watch / In a exam room → In an exam room)",
        verifiedNight: 131, verifiedDate: '2026-10-06',
        result: 'FAILED',
        evidence: "第131夜 — Yes, not like a examiner, yes, it's like just overlook(試験監督と採点官は違う、の1文)/ Then I kind like a made a elementary kind of, you know, uh, kit(作文の出来を言う1文)/ No, because that is a easy target for uh evil guys to like sneak in(小さい店が標的になる、の1文)。母音の前の a が一夜3回、an にならなかった。★分母を隠さない — such an embarrassing story(試験の日の電源の話)では an が立った。such an evil people では複数の前に an が余った(別の崩れ)。資料の読み上げの an attack は判定に入れない",
        note: `**第130夜、母音の前の a が一夜2回、an にならなかった。** **☓I bought uh so I I didn't have a analog watch。** **☓In a exam room, it's a nightmare。**どちらも台本の外か、台本から目を離した所。 **★前夜(第129夜)は I didn't have uh, analogue watch — a が丸ごと落ちた。今夜は a が来て、an にならなかった。**同じ腕時計の文で、2夜続けて冠詞の席が崩れている。 **★★分母を隠さない — 同じ夜、an eraser(台本の読み上げ)/ an ex- empty seat(自分の言葉)では an が立った。** **★この番組は第99夜に「母音の前は the に逃がす」を処方し、AVOIDED を1回取った。**今夜は逃がし先の無い場面(持っていなかった / 試験の部屋では)で a が出た。 **★処方は1段 — 次の名詞の最初の音が ア・イ・ウ・エ・オ なら、a を言う前に n を足す。** **★判定 — 次のレッスンで母音の前に a が来たら FAILED。**an で出れば EXECUTED。母音で始まる可算名詞を単数で言う場面が来なければ NO_CHANCE。 **★第131夜、FAILED(一夜3回)。**a examiner / a elementary / a easy target。前夜の a analog / a exam と同じく、試験の語の前で崩れた。**★処方の1段(次の名詞の最初の音を見る)は、such an embarrassing story の1回だけ作動した。**`,
    },
    {
        issuedNight: 130, issuedDate: '2026-10-05',
        homework: "その場ででっち上げた = I made it up as I went along(I was make it up as I went along → I made it up / I was making it up as I went along)",
        verifiedNight: 131, verifiedDate: '2026-10-06',
        result: 'NO_CHANCE',
        evidence: "第131夜、その場ででっち上げた、を言う場面は来なかった。本人は作文の出来を I kind like a made a elementary kind of kit / I was waffling, I was rambling と言った。make up の語そのものが0。★分母 — 同じ be の持病は別の形で出た(I could be pretend like I don't have a phone)",
        note: `**第130夜、台本の made が、読み上げる口で was make になった。** **☓Also, I was make it up as I went along, and I used "therefore"。**英検の作文で、education がサイバーセキュリティと関係あるかも分からず、その場で書いた、の1文。台本は I was making it up as I went along。 **★be と一般動詞の原形が同席する、この番組の be の持病(FAULT_LINES「be動詞の欠落・二重」)である。**後半の as I went along は無傷。崩れたのは前半の動詞1つ。 **★処方は1段 — was を言ったら、次の動詞は -ing。was を言わないなら made。** **★判定 — 次のレッスンで was make / was 原形 が出たら FAILED。**made it up / was making it up で出れば EXECUTED。でっち上げた話が来なければ NO_CHANCE。 **★第131夜、NO_CHANCE。**でっち上げの話は来なかった。ただし同じ型の崩れ(be + 原形)は be pretend で1回出ている。`,
    },
    {
        issuedNight: 130, issuedDate: '2026-10-05',
        homework: "暇をつぶす = kill time(I had to kill the time → I had to kill time)",
        verifiedNight: 131, verifiedDate: '2026-10-06',
        result: 'NO_CHANCE',
        evidence: "第131夜、暇をつぶす話は来なかった。話題は二次の練習(サイバーセキュリティの money / freedom)と、同い年の発明家の動画。kill / time の組み合わせそのものが0",
        note: `**第130夜、台本に無いアドリブの1文で、定型に the が1枚入った。** **☓Yeah, so, you know, I had to kill the time。**会場に2時間早く着いてしまい、建物が開くまで外で待つしかなかった、の説明。 **★kill time は time を数えない「時間というもの」として使う定型で、the は付かない。**kill some time / kill an hour なら言える。 **★FAULT_LINES「冠詞 the の過剰」と「set phrase の崩れ」の境目 — 狙う句は正しく、1粒余った。** **★処方は1段 — kill time は2語で1つの動詞として固定する。** **★判定 — 次のレッスンで kill the time が出たら FAILED。**kill time / kill some time で出れば EXECUTED。暇をつぶす話が来なければ NO_CHANCE。 **★第131夜、NO_CHANCE。**`,
    },
    {
        issuedNight: 129, issuedDate: '2026-10-04',
        homework: "write の3つめは written(I haven't wrote any single writing → I haven't written a single essay / what should I wrote → what should I write)",
        verifiedNight: 130, verifiedDate: '2026-10-05',
        result: 'EXECUTED',
        evidence: "第130夜 — And I didn't I haven't prepare. I haven't written any single article. Uh, you know, essay before this test.(英検の作文の準備をしていなかった、という前夜と同じ告白の文)。have の後ろに written が立った。★分母を隠さない — 直前の I didn't I haven't prepare は haven't の後ろに原形(別の崩れ、had が要る場面)。should の後ろに write が来る場面は0。any single は a single のずれの範囲",
        note: `**第129夜、第127夜の宿題と同じ語・同じ形で崩れた。** **☓And I haven't wrote any single like uh, uh, writing。**英検の作文の準備をしていない、という告白の1文。第127夜も I haven't wrote anything(同じ告白)。第128夜は we've been through で EXECUTED だった。 **☓20分後、what should I wrote — should の後ろも wrote。** **★★分母を隠さない — 同じ夜、I haven't gone through / I haven't prepared / I haven't watched では have + 過去分詞が立った。崩れるのは write だけである。**write の3つの形(write / wrote / written)のうち、wrote が他の2つの席を取っている。 **★処方は1段 — write を言う前に、席を見る。have の後ろなら written、should / can / will の後ろなら write。** **★判定 — 次のレッスンで have / haven't / should の後ろに wrote が来たら FAILED。**written / write で出れば EXECUTED。write が出なければ NO_CHANCE。 **★第130夜、EXECUTED。**I haven't written any single article。**前夜 haven't wrote が出た、同じ告白の文で written が立った。**★同じ文の直前に I didn't I haven't prepare(haven't + 原形)。write は直ったが、haven't の後ろの席そのものはまだ揺れている。分母1。`,
    },
    {
        issuedNight: 129, issuedDate: '2026-10-04',
        homework: "電車を降りるのは get off(I dropped off the station → I got off the train two stations early / I got off at the station)",
        verifiedNight: 130, verifiedDate: '2026-10-05',
        result: 'EXECUTED',
        evidence: "第130夜 — so I thought, you you know what? Uh I just get off the train like couple of stations early.(台本の I'll just get off the train a couple of stations early を、自分の言葉で言い直した1文)。句動詞は get off で正解。dropped off は0回。★分母を隠さない — 過去の話なのに時制は get のまま(got)、a couple of の a も落ちた。どちらも判定の基準(dropped off)の外なので EXECUTED",
        note: `**第129夜、句動詞の取り違え。** **☓So, I dropped off the station like 2 or 3 3 stations away, and I decided to walk for the place。**早く着きすぎて、2〜3駅手前で電車を降りて歩いた、を言いたかった。 **★drop 人 off は「車で人を降ろす」。**drop off だけで自分が主語だと、誰かに送ってもらったか、居眠りした(drop off = うとうとする)ことになる。自分で電車を降りるのは get off。 **★処方は1段 — 電車・バス・飛行機は get on / get off。**車なら get in / get out。 **★判定 — 次のレッスンで、自分が乗り物を降りた話に dropped off が出たら FAILED。**get off で出れば EXECUTED。降りる話が来なければ NO_CHANCE。 **★第130夜、EXECUTED。**I just get off the train like couple of stations early。**前夜の dropped off the station が、get off the train に入れ替わった。**★時制(got)と a couple of の a は別件。台本の文を自分の言葉に崩した場面で、句動詞だけは台本どおりに残った。分母1。`,
    },
    {
        issuedNight: 129, issuedDate: '2026-10-04',
        homework: "懸かっていないのは nothing at stake(there's no stakes for me → there's nothing at stake for me / it's low-stakes for me)",
        verifiedNight: 130, verifiedDate: '2026-10-05',
        result: 'NO_CHANCE',
        evidence: "第130夜、懸かっている / 懸かっていない を言う場面は来なかった。本人は台本の読み上げと、自己採点の結果(three question wrong)と、二次の準備の話をしたが、試験に何が懸かっているかには触れていない。★分母 — stake / stakes の語そのものが0",
        note: `**第129夜、2夜連続で同じ定型が崩れた。** **☓You know, I there's no stakes for me, but I'd rather pass than flunk。**第128夜も no stakes / my stake is。 **★at stake = 懸かっている。**There's nothing at stake / What's at stake?。形容詞なら low-stakes / high-stakes(a high-stakes exam)。stakes を名詞で使うなら The stakes are low。 **★後半の I'd rather pass than flunk は2夜とも無傷。崩れるのは前半だけ。** **★処方は1段 — 「懸かっていない」は nothing at stake の3語で固定する。** **★判定 — 次のレッスンで no stakes が出たら FAILED。**nothing at stake / low-stakes / the stakes are low で出れば EXECUTED。懸かる話が来なければ NO_CHANCE。 **★第130夜、NO_CHANCE。**今夜は台本の読み上げが中心で、試験に何が懸かっているかを言う場面が来なかった。stake の語そのものが0。**3夜目の判定は次に持ち越さず、ここで閉じる。**次に懸かる話が来たら、新しい宿題として出し直す。`,
    },
    {
        issuedNight: 128, issuedDate: '2026-10-03',
        homework: "意見を聞くのは What do you think?(How do you think? → What do you think? / What do you think of this one?)",
        verifiedNight: 129, verifiedDate: '2026-10-04',
        result: 'EXECUTED',
        evidence: "第129夜 — \"Should governments invest more in cyber security?\" What do you think?(英検の作文のお題を講師に読み上げた直後)/ 同じ夜の後半、So, and, uh, what would you say, you know?。相手の意見を聞く文は2回とも What で始まった。How do you think は0回。★分母2",
        note: `**第128夜、自分の意見を聞く1文で疑問詞が入れ替わった。** **☓And so, how are you? What's... How do you think? I'm asking for advice。**作文の不安を話し終えて、講師に助言を求めた1文。What まで出かけて、How に乗り換えた。 **★think の後ろに来るのは考えの中身で、中身は what で聞く。**How do you think? は「どうやって考えるの?」になる。 **★分母を隠さない — 同じ夜、引用の形では What で正しく言った("What do you think about global warming?")。15分後、自分の予定を話したあと But what do you think? を2回正しく聞いた。**崩れたのは最初の1回だけ。 **★判定 — 次のレッスンで、相手の意見を聞く1文に How do you think が出たら FAILED。What do you think が出たら EXECUTED。聞く場面が来なければ NO_CHANCE。** **★第129夜、EXECUTED。**お題を読み上げた直後に What do you think?、後半に What would you say?。**★前夜は What まで出かけて How に乗り換えた。今夜は乗り換えが無かった。**分母2。`,
    },
    {
        issuedNight: 128, issuedDate: '2026-10-03',
        homework: "制度・仕組みの名前には the(a death penalty → the death penalty / the welfare system / the education system)",
        verifiedNight: 129, verifiedDate: '2026-10-04',
        result: 'FAILED',
        evidence: "第129夜 — I don't know, mm, death penalty, cyber security, maybe, yeah, cyber security was easier(前夜の作文の練習のお題と、今日の本番のお題を並べて比べた1か所)。death penalty の前に the が無い。★分母を隠さない — death penalty が出たのはこの1回だけで、お題の名前を見出しのように並べた形。文の中で制度として言った場面(the death penalty is ~)は来ていない。cyber security は分野の名前なので the は要らず、正しい",
        note: `**第128夜、制度の名前の前の冠詞が4回続けて落ちた。** **☓like a death penalty should be like justified / that death penalty argument / The idea that death penalty is justified ×2。**英検の作文のお題の例として、本人が自分で出した語。 **★制度・仕組みは the で言う。**the death penalty / the welfare system / the internet。英検1級の作文で最も出やすい形(Should the death penalty be abolished?)の、まさにその席である。 **★この番組の the の持病は、固有名詞の種類ごとに向きが違う(人名に the、チーム名から the が落ちる、国名に the)。今夜は制度の名前で、落ちる向き。** **★判定 — 次のレッスンで death penalty(または他の制度の名前)の前に the が立てば EXECUTED。落ちれば FAILED。制度の話が来なければ NO_CHANCE。** **☓第129夜、FAILED(分母1)。**death penalty, cyber security, maybe — お題の名前を2つ並べた1か所で the が無かった。**★見出しのように並べた形なので、文の中の制度の名前より判定は甘く見てもいい。ただし判定の文面(death penalty の前に the が無ければ FAILED)に当たるので FAILED とする。**処方は変えない。次に制度の話が来たら、もう一度見る。`,
    },
    {
        issuedNight: 128, issuedDate: '2026-10-03',
        homework: "暗記した書き出しの2語を直す(has attracted much considered attention → considerable attention / should be still remained → should remain)",
        verifiedNight: 129, verifiedDate: '2026-10-04',
        result: 'NO_CHANCE',
        evidence: "第129夜、型を口で再生する場面は来なかった。本番のお題は Should governments invest more in cyber security? で、死刑ではない。本人は作文の中身(fairness / trust / education)は話したが、書き出しの文は口にしていない。★分母 — considered / considerable、remain の語そのものが0",
        note: `**第128夜、試験の前夜に暗唱した作文の書き出しに、2語の誤りが住んでいた。** **☓The idea that death penalty is justified ... has attracted much considered attention ... prompting the debate over whether that kind like a cruel stuff should be still remained。** **★型の骨は正しい — The idea that ~ has attracted ... attention, prompting debate over whether ~。**崩れたのは2語。considered(熟慮した、a considered opinion)は considerable(かなりの)の隣の札。remain(残る)は目的語を取らない動詞なので受け身にならない。 **★これはその場で崩れた文ではない。覚えた時点でずれて保存されていた文である。**だから、その場の注意では直らない。保存し直すしかない。 **★判定 — 次のレッスンで型を再生したとき、considered attention か be remained が出たら FAILED。considerable / should remain で出れば EXECUTED。型を再生する場面が来なければ NO_CHANCE。** **★第129夜、NO_CHANCE。**本番のお題はサイバーセキュリティで、書き出しの型を口で再生する場面が来なかった。**本番の答案に型の2語がどう書かれたかは、録音からは分からない。**`,
    },
    {
        issuedNight: 127, issuedDate: '2026-10-02',
        homework: 'haven\'t の後ろは過去分詞(I haven\'t wrote anything → I haven\'t written anything / I haven\'t eaten / I haven\'t gone)',
        verifiedNight: 128, verifiedDate: '2026-10-03',
        result: 'EXECUTED',
        evidence: "第128夜 — maybe we've been through kind of stage, you know, and college college enter in exam stage(大学入試の作文の準備は誰でも通る道)。have + 過去分詞(been)が1回、正しく立った。★分母を隠さない — have + 過去分詞が立ったのはこの1回だけ。☓現在完了の場面で過去形を置いたのが2回 — I already decided, I already got a system(I've already got)/ I committed myself to that test this month(I've committed)。判定の基準(have の後ろに過去形)には触れていないので EXECUTED のまま。講師は開始2分で I haven't seen it before と同じ形を置いた",
        note: `**第127夜、現在完了の後ろに過去形が来た。** **☓Because I haven't, I haven't wrote anything。**英検の作文の準備をしていない、と言う1文で、言い直して2回とも wrote だった。 **★write は形が3つに分かれる動詞である — write / wrote / written。**have の後ろに来るのは、いつも3つめの形。 **★分母 — 今夜の現在完了はこの1回(言い直しを入れて2回)だけ。** **★処方は1段 — haven't と言ったら、次の動詞は -en / -ten / -n で終わる形を探す(written / eaten / taken / gone)。** 判定: have / haven't / has の後ろに過去形が来たら FAILED。`,
    },
    {
        issuedNight: 127, issuedDate: '2026-10-02',
        homework: 'オーダーメイドは custom-made / made-to-order(order made curtain → custom-made curtains)',
        verifiedNight: 128, verifiedDate: '2026-10-03',
        result: 'NO_CHANCE',
        evidence: "第128夜、オーダーメイドの場面は来なかった。仕事の話は「朝5時に起きて5〜6時間運転した」だけで、取り付ける物の話は出ていない。★分母 — 和製英語そのものも0",
        note: `**第127夜、和製英語がそのまま英語に出た。** **☓like a order made curtain or kind of some kind of like that。**翌朝取り付ける特注のカーテンの説明で、オーダーメイドを英語だと思って使った。 **★しかもこの直後、curtain そのものが講師に carton(牛乳パック)と聞こえた。特注の牛乳パックになった。** **★英語は custom-made / made-to-order。服なら tailor-made / bespoke(英国)。** **★処方は1段 — 本人の現場の語(オーダー、クロス、ボード、サッシ)は和製英語が多い。仕事の話をする前に、使う物の名前を1つずつ英語で確かめる。** 判定: order made / order-made が出たら FAILED。`,
    },
    {
        issuedNight: 127, issuedDate: '2026-10-02',
        homework: 'keep your fingers crossed は your まで言う(keep fingers crossed for me → keep your fingers crossed for me)',
        verifiedNight: 128, verifiedDate: '2026-10-03',
        result: 'EXECUTED',
        evidence: "第128夜 — wish me luck, and have your fingers crossed to me / please root for me, and have your fingers crossed for me / 締めは Fingers crossed for me。your は2回とも立った。★分母を隠さない — 動詞は keep が have になり(通じるが定型は keep)、1回目は for が to になった。締めの短い版 Fingers crossed は正しい。講師は Yes, fingers crossed, fingers crossed で受けた",
        note: `**第127夜、前夜の検死のカードがそのまま出て、1語だけ落ちた。** **☓So please root for me and keep fingers crossed for me。**前夜(第126夜)の please rooting for me は今夜 please root for me に直った。カードは Please root for me. Keep your fingers crossed for me.。後半の your が落ちた。 **★FAULT_LINES「set phrase の崩れ」と同じ形 — 狙う句は正しく、1粒落ちる。**前夜の more harm than good の more、今夜の get a sleep like a log の get a(余り)も同じ系統。 **★処方は1段 — 指は相手の指。your を fingers の前に置いてから言う。短くするなら Fingers crossed! の2語。** 判定: keep fingers crossed と your(my)が抜けたら FAILED。`,
    },
    {
        issuedNight: 126, issuedDate: '2026-10-01',
        homework: 'eaten up は向きを1つに決める(Driving five hours got eaten up my entire day → Driving five hours ate up my entire day / My entire day got eaten up by the drive)',
        verifiedNight: 127, verifiedDate: '2026-10-02',
        result: 'NO_CHANCE',
        evidence: '第127夜、eaten up の場面は来なかった。時間の話は翌日の運転だけで、本人は I can make the most of my car driving hour(運転の時間を最大限に使う)と別の形で言った。★分母 — 時間が「食われる」話そのものが0',
        note: `**第126夜、前夜に講師が置いた eaten up を、本人は自分から持ち出して2回撃った。** **☓Many things got eaten up my times / Driving five hours got eaten up my entire day。** **★up は2回とも立った(第125夜の宿題③は EXECUTED)。崩れたのは向きである。**got eaten up は「食われた」で、後ろに置けるのは by(誰に食われたか)だけ。そこに my entire day(食われたもの)が来て、食った側と食われた側が1文に両方乗った。 **★これは「受け身の形が折れる」(I was scold)とは別の型である。**受け身の形は正しく、後ろに能動の目的語が付いた。 **★処方は1段 — got eaten up と言ったら、次は by。**目的語を言いたいなら ate up(Driving ate up my day)。 **★判定 — got eaten up(eaten up)の直後に目的語が来たら FAILED。**ate up + 目的語、または got eaten up by で出れば EXECUTED。eat up が出なければ NO_CHANCE。`,
    },
    {
        issuedNight: 126, issuedDate: '2026-10-01',
        homework: '国名・人名に the を付けない(do you know the England → England\'s Poor Laws。人名・作品名・国名は裸、チーム名は the)',
        verifiedNight: 127, verifiedDate: '2026-10-02',
        result: 'EXECUTED',
        evidence: '第127夜 — In Japan too it\'s same thing entirely(英国のニュースの話のあと)/ from I\'m sure India(研究施設の社員)/ my AI likes to recommend many England kind of like education。国名の前に the が立った箇所は0。★分母 — the UK(I was watching the UK)は正しく the。人名は Elizabeth poor law(法律名の一部)だけで、the は付いていない',
        note: `**第126夜、国名の前に the が立った。** **☓do you know the England, England's poor laws?** 本人はその場で the を捨てて England's poor laws と言い直している。 **★この番組の the の持病は、固有名詞の種類ごとに向きが違う。**第123夜は人名に the(but the Mizerowski)、第124夜はチーム名から the が落ちた(rooting for Dodgers)。今夜は国名に the。**★整理は1行 — 人名・作品名・国名は裸、チーム名は the。**国名の例外(the UK / the US)は、名前の中に「連合・合衆」が入っている形だけ。 **★処方は1段 — 国の名前と人の名前の前では、the を言わない。**England / Japan / Shakespeare。 **★判定 — 国名・人名の前に the が立ったら FAILED。**裸で出れば EXECUTED。the UK / the US のように名前に the が付く国、チーム名は数えない。国名・人名が出なければ NO_CHANCE(英検の結果報告で国名は来る見込みが高い)。`,
    },
    {
        issuedNight: 126, issuedDate: '2026-10-01',
        homework: 'more harm than good は丸ごと言う(it caused a lot of harm than good → it did more harm than good)',
        verifiedNight: 127, verifiedDate: '2026-10-02',
        result: 'AVOIDED',
        evidence: '第127夜、救貧法の結論を言う場面は来た — but end of the day it was um that didn\'t fulfill that original intention to rescue the poor or unable。more harm than good は使わず、本来の目的を果たさなかった、と別の形で正しく言った。★回避は解決ではない。than の前の more は今夜も試されていない',
        note: `**第126夜、決まり文句から more が1語落ちた。** **☓at the end of the day, yeah, it was, it caused a lot of harm than good。**英検の長文(1601年の救貧法)を要約した1文である。 **★狙った句は正しい。than が比べる相手を探しているのに、前に more が無い。**a lot of harm は量の言い方で、比べる形ではない。 **★FAULT_LINES「set phrase の崩れ」と同じ形 — 狙う句は正しく、1粒落ちる(wake-up call の up、herding cats の cats)。** **★処方は1段 — harm と言う前に more を言う。**more harm than good は4語で1つ。do more harm than good / cause more harm than good。 **★判定 — harm than good の前に more が無ければ FAILED。**more harm than good で出れば EXECUTED。この句が出なければ NO_CHANCE。`,
    },
    {
        issuedNight: 125, issuedDate: '2026-09-30',
        homework: 'going to の be を立てる(what gonna come → what\'s going to come / what gonna stick → what\'s going to stick)',
        verifiedNight: 126, verifiedDate: '2026-10-01',
        result: 'EXECUTED',
        evidence: '第126夜 — Okay, I\'m gonna read it out.(英検の長文を読み上げる直前。going to の前に I\'m が立った)。gonna が be 抜けで出た箇所は0。★分母 — 今夜 gonna が出たのはこの1回で、主語は I。前夜に落ちた what が主語の節は来なかった',
        note: `**第125夜、going to の前の be が2連続で落ちた。** **☓because you cannot you know see what gonna come and what gonna stick to you。** **★直前に講師が you don't know what's gonna come out on the day と言っている。本人はその形を拾って言い返し、's だけを落とした。** **★第124夜の probably I going to explain / we gonna に続く2夜連続の同じ穴。前夜の宿題②(be を落とさない)は FAILED。** **★分母 — I'm gonna just wing it / I'm not trying to be a Shakespeare / I'm not sure では be が立っている。主語が I のときは立ち、what が主語の節で消えた。** **★処方は1段 — gonna と言う前に、主語と be を1つの音で言う。**what's gonna / I'm gonna / it's gonna / they're gonna。what gonna とは言わない。 **★判定 — going to(gonna)の前の be が落ちたら FAILED。**be で出れば EXECUTED。going to が1回も出なければ NO_CHANCE(まず無い)。 **★第126夜、EXECUTED。**Okay, I'm gonna read it out。英検の長文を講師に読み上げる直前の1文で、going to の前に I'm が立った。**gonna が be 抜けで出た箇所は0。** **★分母を隠さない — 今夜 gonna が出たのはこの1回だけで、主語は I である。**前夜に穴が開いた形(what gonna come / what gonna stick — what が主語の節)は、今夜1回も来ていない。PRECURSORS「相手の gonna を拾って言い返す1文」の場面(講師の gonna を拾う)も来なかった。**執行は取ったが、弱い席の試験は次の夜に持ち越し。**`,
    },
    {
        issuedNight: 125, issuedDate: '2026-09-30',
        homework: '人の型には a(I was really control freak → I was a real control freak / a morning person / a night owl)',
        verifiedNight: 126, verifiedDate: '2026-10-01',
        result: 'EXECUTED',
        evidence: '第126夜 — I\'m a quick learner, you know.(前夜の eaten up を自分の口で言った直後)。★分母 — I\'m a real bit sophisticated guy は a は立ったが、後ろの real bit が崩れた(a bit of a ~ の形)。I\'m just an extra ordinary... は言い切れていない',
        note: `**第125夜、人の型の前で a が落ちた。** **☓I was really control freak, you know, comes to like health。**5年前、睡眠スコアに取り憑かれていた自分を言う1文である。語(control freak)は当たっていて、札が1枚足りない。 **★分母 — 同じ夜の I'm not trying to be a Shakespeare は、比喩の a(シェイクスピアのような人)として正しく立った。** **★be の後ろに「そういう人」を置くときは、a が要る。**really を足すなら a real control freak の順。 **★処方は1段 — I was / I'm / he's の後ろに人の型が来たら、a を先に言う。**a control freak / a morning person / a night owl / a people person。 **★判定 — be の後ろの人の型(単数)で a が落ちたら FAILED。**a で出れば EXECUTED。人の型を言う場面が無ければ NO_CHANCE。 **★第126夜、EXECUTED。**I'm a quick learner, you know。前夜の講師の eaten up を自分の口で言い、「もう身についた」と言った直後の1文で、人の型の前に a が立った。 **★分母 — I'm a real bit sophisticated guy は、a は立ったが後ろが崩れた(a bit of a ~ と a real ~ guy の混線)。札は置けて、札の後ろの形が2本混ざった。**I'm just an extra ordinary... は言い切れていないので数えない。**★落ちた札は今夜0枚。**`,
    },
    {
        issuedNight: 125, issuedDate: '2026-09-30',
        homework: 'eaten up を自分の口で1回(My whole day got eaten up by ~ / It\'s eating up my time)',
        verifiedNight: 126, verifiedDate: '2026-10-01',
        result: 'EXECUTED',
        evidence: '第126夜 — Driving five hours got eaten up my entire day.(前夜の講師の直しを自分から持ち出した中盤。同じ分に Many things got eaten up my times)。up は2回とも立った。☓受け身 got eaten up の後ろに目的語 my entire day が来て、能動と受動が1文に重なった → 第126夜の宿題①',
        note: `**第125夜、講師がAIの例文の swallowed を eaten up に直した。** **AI transcription allows professionals to reclaim hours once eaten up by paperwork。**講師は「AIに time being swallowed と打つと本の話が出てくる」と言い、自分で定義を引いてから直した。**本人は「聞けば分かるが、自分の口から出たことは一度もない。意図して使う」と言った。** **☓ただし直された直後の読み上げで、once eaten by paperwork と up を落とした。**復唱では eaten up by paperwork と言えている。句動詞の粒子は、読みに戻ると落ちる。 **★処方は1段 — eaten up は up まで1語として言う。**My whole day got eaten up by paperwork / It's eating up my time / Emails ate up my morning。 **★判定 — 本人の自発の文で eaten up(eat up / ate up)が出たら EXECUTED。**up が落ちたら FAILED。時間を食われる話が出たのに別の言い方をしたら AVOIDED。場面が無ければ NO_CHANCE。英検(10/4)の結果報告で、準備の時間の話は来る見込みが高い。 **★第126夜、EXECUTED。**本人は前夜の講師の直しを自分から持ち出し、自分の文で2回撃った — Many things got eaten up my times / Driving five hours got eaten up my entire day。**up は2回とも立った。**前夜の読み上げで落ちた粒子が、24時間後の自発の文では落ちていない。 **☓ただし向きが崩れた。**got eaten up(食われた)の後ろに my entire day(食われたもの)が来て、能動と受動が1文に重なった。正しくは Driving five hours ate up my entire day / My entire day got eaten up by the drive。**★語は入った。入った語の向きが、次の穴になった。**第126夜の宿題①で1段にして受ける(got eaten up の直後に目的語を置かない)。`,
    },
    {
        issuedNight: 124, issuedDate: '2026-09-29',
        homework: 'チーム名には the(rooting for Dodgers → rooting for the Dodgers / Brewers don\'t play until Saturday → The Brewers don\'t play until Saturday)',
        verifiedNight: 125, verifiedDate: '2026-09-30',
        result: 'NO_CHANCE',
        evidence: '第125夜、チーム名は一度も出なかった。話題はAIの例文10本・スマートウォッチと睡眠スコア・ケトジェニックとボクサーの減量で、野球の話は0',
        note: `**第124夜、チーム名の the が4か所落ちた。** **☓I'm a little bit rooting for Dodgers / Cubs and Red Sox, you know, and White Sox / I will maybe root for LA Dodgers / Brewers don't play until Saturday(講師の The Brewers don't play until Saturday の復唱)。** **★同じ夜、人名には the が立った — but the Mizerowski(第123夜の宿題② FAILED)。人名は裸、チーム名は the。前夜の宿題の裏返しである。** **★分母 — 原稿の読み上げでは The Milwaukee Brewers / the Reds / the 2016 Cubs と正しく出た(原稿に書いてあるので)。名詞の前に付く a Brewers fan は the なしで正しい。** **★処方は1段 — チーム名を言う前に、the を言う。**the Dodgers / the Brewers / the Cubs / the Red Sox。 **★判定 — チーム名の前に the が無ければ FAILED。**the で出れば EXECUTED。Brewers fan / a Dodgers game のように名詞の前に付く形は数えない。野球の話が出なければ NO_CHANCE(次回、NLDS の初戦の結果を講師から聞く予定)。 **★第125夜、NO_CHANCE。**話題はAIの例文と睡眠スコアとダイエットで、チーム名を言う場面が来なかった。ボクシングの話は出たが、階級と減量の話でチーム名は無い。処方は装填したまま、NLDS 初戦(10/3)の後の夜へ。`,
    },
    {
        issuedNight: 124, issuedDate: '2026-09-29',
        homework: 'be を落とさない(probably I going to explain → I\'m going to / he\'s been like struggle → he\'s been struggling / I\'m no longer read the article → I\'m not going to read it anymore)',
        verifiedNight: 125, verifiedDate: '2026-09-30',
        result: 'FAILED',
        evidence: '第125夜 — because you cannot you know see what gonna come and what gonna stick to you(what\'s going to の \'s が2連続で落ちた。講師の you don\'t know what\'s gonna come out on the day の直後)。★分母 — I\'m gonna just wing it / I\'m not trying to be a Shakespeare / I\'m not sure では be が立っている',
        note: `**第124夜、要る be が4か所で消えた。** **☓probably I going to explain why in the next paragraph / I really excited to hear about that story / the mound condition also pretty important / we gonna(直後に I'm gonna と自分で言い直した)。** **☓be はあるのに後ろが崩れた形も2つ — he's been like struggle / I'm no longer read the article。** **★この番組の be の持病は、長く「余る」向きだった(I'm appreciate / I'm fully understand / that's contribute)。今夜は初めて、まとまって「空く」向きに出た。** **★出た場所 — 記事の段落の合間のコメント(PRECURSORS「読み上げの隙間」)と、講師を褒めた同じ息の1文(PRECURSORS「相手を褒めた直後の1文」)。** **★処方は1段 — going to / -ing / 形容詞を言う前に、主語と be を1つの音で言う。**I'm going to / I'm really excited / it's also important / he's been struggling。 **★判定 — going to・進行形の前の be が落ちたら FAILED。**have been の後ろが -ing でなくても FAILED。be で出れば EXECUTED。この形は1夜に1回は来るので、NO_CHANCE はまず無い。 **☓第125夜、FAILED。**because you cannot you know see what gonna come and what gonna stick to you。**what's going to の 's が2連続で落ちた。**直前に講師が you don't know what's gonna come out on the day と言っていて、本人はその形を拾って言い返している。**★分母を隠さない — I'm gonna just wing it / I'm not trying to be a Shakespeare / I'm not sure(2回)/ I'm knackered では be が立った。**主語が I のときは立ち、what が主語の節で消えた。 **★ほかに受け身の窓口が1回空いた — I can recognize when it used(when it's used)。**書き起こしに I I blanking out という1文もあるが、I'm が聞き取れていない可能性があるので数えない。 **★2夜続けて同じ穴なので、第125夜の宿題①で1段に絞り直して受ける(going to の be だけ)。**`,
    },
    {
        issuedNight: 124, issuedDate: '2026-09-29',
        homework: '音読の数字は位で読む(20-0 を two-nothing → twenty-nothing / 252 を two twenty-two → two fifty-two)',
        verifiedNight: 125, verifiedDate: '2026-09-30',
        result: 'NO_CHANCE',
        evidence: '第125夜、読み上げた例文10本に2桁以上の数字は0。会話で睡眠スコアの 72 を1回言ったが、seventy-two と正しく読めたかは書き起こしからは判別できない',
        note: `**第124夜、AIに書かせた記事の読み上げで、数字と1語が3か所入れ替わった。** **☓20-0 を 2-0 / 252 を 222 / omen を amen。** **★分母 — 103-59 / 832 / 154 / 3.51 / 1.80 / 0.80 / .157 は正しく読めた。**103-59 は、講師が復唱した直後に 103 to 59 と読み直している。 **★位が1つ落ちるか、中の1桁が隣の数字に替わる。目で見た数字と、口が出す数字が別になる。** **★処方は1段 — 3桁以上は、前の1桁と後ろの2桁に割って読む。**252 = two fifty-two / 103 = one oh three / 20-0 = twenty-nothing。 **★判定 — 読み上げの数字の読み違いが出たら FAILED。**全部正しく読めば EXECUTED。原稿を読まない夜は NO_CHANCE。 **★第125夜、NO_CHANCE。**原稿は読んだが、例文10本(allow / enable / encourage / force / require)に数字が無かった。**★会話では睡眠スコアの 72 が1回出たが、読み上げではないうえ、書き起こしが数字で書いているので読み方を判別できない。**判定には使わない。**★数字以外の読み違いは1件 — 講師が eaten up と直した直後の読み上げで、once eaten by paperwork と up を落とした。**これは数字の宿題の外なので、第125夜の宿題③(eaten up を自分の口で1回)の note に回す。`,
    },
    {
        issuedNight: 123, issuedDate: '2026-09-28',
        homework: 'ago は過去形と組む(I\'ve watched that movie 12 years ago → I watched it 12 years ago)',
        verifiedNight: 124, verifiedDate: '2026-09-29',
        result: 'NO_CHANCE',
        evidence: '第124夜、ago や過去の時点と have + 過去分詞が並ぶ場面は0。昔の話は That was definitely true for last year and the year before の1文で、過去形で出た',
        note: `**第123夜、13年前の自分を語る1文で、ago と現在完了が同席した。** **☓Like I said, I've watched that movie 12 years ago, 13 years ago。** **★同じ夜の前半では I watched it once / when I was a college student と過去形で言えている。**現在完了(今までに)は「経験がある」を言う形で、いつかを言う ago とは同じ文に座れない。 **★映画の筋を語る場面では、過去形が現在形に倒れる崩れも4件あった(kill / end up / realize / can't pronounce)。**時の金具を1本に絞るため、宿題は ago に限る。 **★処方は1段 — ago と言うつもりなら、動詞は過去形。**I watched it 12 years ago / I saw it in college。 **★判定 — ago(または in 2013 のような過去の時点)と have + 過去分詞が同じ文に出たら FAILED。**過去形で言えば EXECUTED。場面が無ければ NO_CHANCE。 **★第124夜、NO_CHANCE。**話題はブルワーズのポストシーズンで、ago を言う場面が来なかった。昔の話(この2年、本塁打が10月に勝った)は That was definitely true for last year and the year before と過去形で出た。処方は装填したまま次の夜へ。`,
    },
    {
        issuedNight: 123, issuedDate: '2026-09-28',
        homework: '人名と作品名に the を付けない(the Morgan Freeman → Morgan Freeman / the Pulp Fiction → Pulp Fiction)',
        verifiedNight: 124, verifiedDate: '2026-09-29',
        result: 'FAILED',
        evidence: '第124夜 — It\'s not about single players, MVP, no MV, but the Mizerowski, obviously the NL Cy Young.(自発の文)。★分母 — Jacob Misiorowski / Mookie Betts / Pedro Martinez / Joey Ortiz / Elly De La Cruz / Pat Murphy / Christian Yelich は裸で正しい(ほとんど読み上げと講師の口から)',
        note: `**第123夜、人名と作品名に the が2枚立った。** **☓I remember the Morgan Freeman was on that movie / Jurassic Park and the Pulp Fiction。** **★第93・94夜の「固有名詞への配属」(the Milan / the Italy / the Tokyo / the Saitama prefecture)の再発。** **★分母 — The Shawshank Redemption の The は題名の一部で、正しく付いた。Tim Robbins / Joe Rogan / Warner Brothers には付いていない。** **★処方は1段 — 人名と作品名は裸で言う。**例外は題名そのものに The が入っているものだけ(The Shawshank Redemption / The Godfather)。 **★判定 — 人名・作品名(題名に The を含まないもの)の前に the / a が立ったら FAILED。**場面が無ければ NO_CHANCE。 **☓第124夜、FAILED。**but the Mizerowski。**★分母 — 人名は7人とも裸で出たが、ほとんどは読み上げか講師の口からで、自分で組んだ文の人名に the が1回立った。** **★★同じ夜、裏返しが出た — チーム名に要る the が4か所で落ちた(rooting for Dodgers / Cubs and Red Sox, and White Sox / root for LA Dodgers / Brewers don't play until Saturday)。**人の名前に the が付き、チームの名前から the が消えた。**置く場所の問題ではなく、どの名前が the を取るかの仕分けの問題である。**第124夜の宿題①(チーム名には the)で受ける。`,
    },
    {
        issuedNight: 123, issuedDate: '2026-09-28',
        homework: '映画は in(On the theater → in theaters / was on that movie → was in that movie)',
        verifiedNight: 124, verifiedDate: '2026-09-29',
        result: 'NO_CHANCE',
        evidence: '第124夜、映画の話は0(話題はブルワーズのポストシーズン)。ショーシャンクの続きは今夜の講師とは出なかった',
        note: `**第123夜、映画の前置詞が2種類ずれた。** **☓initially it was not that successful movie. On the theater / after that movie on theater(2回)/ the Morgan Freeman was on that movie。** **★分母 — 番組に出る、は on で正しかった(he was on Joe Rogan's show)。**on は「番組・テレビ・プロフィールの上」で、映画と劇場は in。 **★処方は1段 — 映画の話は in で固定する。**in theaters / at the movies / be in a movie / in the movie。 **★判定 — 劇場公開か出演を言う文で on が立ったら FAILED。**in / at で言えば EXECUTED。映画の話が出なければ NO_CHANCE(次回もショーシャンクの続きを約束している)。 **★第124夜、NO_CHANCE。**映画の話が出なかった。**★in と on の取り違えは別の場所で、講師のほうから拾われた — 本人の it's raining right now in my car に、講師が Raining in your car or on your car? と返した。**判定の対象(劇場公開・出演)ではないので数えない。処方は装填したまま、映画の話が出る夜へ。`,
    },
    {
        issuedNight: 122, issuedDate: '2026-09-26',
        homework: '定義の文は is the までをひと息で読む(Culture is a song → Culture is THE song / identity is a language → Identity is THE language)',
        verifiedNight: 123, verifiedDate: '2026-09-28',
        result: 'NO_CHANCE',
        evidence: '第123夜、原稿を読まなかった(オフィスに人がいて画面共有ができず、雑談に切り替えた)。定義の文を読む場面は0',
        note: `**第122夜、第121夜の宿題①が2夜続けて FAILED。** **☓is a yearly checkup / is a 90-year-old / is a paper trail / is a song everybody knows / is a language you count in。** **★分母 — the のまま読めたのは4本(needs the hospital bed / Transparency is the open book / Tradition is the old way / the correction on page nine)。前夜 a にした the hospital bed は今夜 the で読めた。** **★5本とも is の直後。**だから処方を is the の2語に絞る — is と言ったら、the までを1つの音として出す。 **★判定 — 原稿に is the とある所を is a で読んだら FAILED。**原稿を読まない夜は NO_CHANCE。残る右手2本(FAIRNESS / NATURE)と左手の HAPPINESS に、is / are the の定義文が5本ある(Human rights are the lawyer / Discrimination is the name / Fulfillment is the thing / Quality of life is the walk / Sustainability is the well)。 **★第123夜、NO_CHANCE。**原稿を読まなかった。処方は装填したまま、次に原稿を読む夜へ持ち越す。`,
    },
    {
        issuedNight: 122, issuedDate: '2026-09-26',
        homework: 'same には必ず the(a same lesson → the same lesson / in a same room → in the same room)',
        verifiedNight: 123, verifiedDate: '2026-09-28',
        result: 'EXECUTED',
        evidence: '第123夜 — at that year, Jurassic Park and the Pulp Fiction, oh yeah many famous movies are on the same you know compete with each other。文は途中で切れたが、same の前に the が立った。ほかに at the same time も正しい。same の前に a が立った場面は0',
        note: `**第122夜、yesterday I did a same lesson with another teacher。** **★第120夜の in a same room / with same old kids に続き、3夜で3回目。**same は「同じ、ただ1つ」なので、いつも the が付く(the same lesson / the same room / the same thing)。a を付けると「同じもの」が何種類もあることになる。 **★処方は1段 — same と言う前に the を言う。the same をひと息で1語として持つ。** **★判定 — same の前に a が立つか、何も無ければ FAILED。the same で出れば EXECUTED。**場面が無ければ NO_CHANCE。 **★第123夜、EXECUTED。**on the same(文は途中で切れた)/ at the same time。**★分母は小さい(same の場面2回)。**3夜で3回 a が立った持ち場に、宿題の翌夜は the が2回立った。`,
    },
    {
        issuedNight: 122, issuedDate: '2026-09-26',
        homework: 'every のあとは単数、動詞に s(every Japanese kids know → every Japanese kid knows)',
        verifiedNight: 123, verifiedDate: '2026-09-28',
        result: 'FAILED',
        evidence: '第123夜 — maybe that was the main reason why today Shawshank Redemption was everybody know kind of stuff(長い説明の最後)。★分母 — 同じ夜の前半、it\'s so famous so everybody knows は正しく出た。every year も正しい',
        note: `**第122夜、原稿に Every Japanese kid knows と書いてある行を、So every Japanese kids know と読んだ。** **★s を名詞に足し、動詞から取った。s の総数は変わらず、移動先だけが逆。** **★日本語の「みんな」は複数の感覚で、every / each / nobody / everybody の後ろで s を落とすのは、この番組の長期評価で最古の持病の1つである(07-01 の every legal citizens have)。**原稿を目で見ていても出た。 **★処方は1段 — every と言ったら、次の名詞は1つ、動詞に s。**every kid knows / every teacher has。 **★判定 — every / each の後ろが複数形、または三人称単数の動詞の s が落ちたら FAILED。**場面が無ければ NO_CHANCE。 **☓第123夜、FAILED。**everybody know kind of stuff。**★分母 — 同じ夜の前半に everybody knows が正しく出た。**落ちたのは、JRE のクリップを1ターン2分近くかけて要約した最後の1文で、主語が文の終わりに押し出されていた。**正しく言える形が、長い文の最後で落ちる。**`,
    },
    {
        issuedNight: 121, issuedDate: '2026-09-25',
        homework: '原稿の the は the で読む(Funding is a line → Funding is THE line / a yearly checkup → THE yearly check-up / a 90-year-old → THE ninety-year-old)',
        verifiedNight: 122, verifiedDate: '2026-09-26',
        result: 'FAILED',
        evidence: '第122夜、5本を a で読んだ — Disease prevention is a, is a yearly checkup / longevity is a 90-year-old next door / transparency, accountability, is a paper trail / Culture is a song everybody knows / identity is a language you count in。★分母 — the のまま読めたのが4本: long before anyone needs the hospital bed(前夜 a で読んだ行)/ Transparency is the open book / Tradition is the old way / the correction on page nine',
        note: `**第121夜、原稿に the と書いてある所を、a で4回読んだ。** **☓Funding is a line in the budget / long before anyone needs a hospital bed / Disease prevention is a yearly checkup / Longevity is a 90-year-old next door。** **★★4本のうち3本は「X is the Y」の定義の文である。**core5 の枝の例文はほぼ全部この形で、the Y は「あの、誰でも思い浮かべる Y」を指す定義の芯になる。a で読むと「どれか1つの Y」になり、定義がぼやける。 **★分母 — the のまま読めた定義文は2本(Productivity is one hour / Access is the bus fare)。Convenience の行は is a, is a, is a, is the app と、a を3回言ってから自分で the に戻した。** **★処方は1段 — 定義の文は、is のあとの the を1語として読む。is the までをひと息で言う。** **★判定 — 原稿に the とある所を a で読んだら FAILED。**原稿を読まない夜は NO_CHANCE。右手4本(FAIRNESS / TRUST / ROOTS / NATURE)を読めば、場面は1本につき3回来る。 **☓第122夜、FAILED。**5本を a で読み、4本を the で読んだ。**★★前夜 a で読んだ the hospital bed は、今夜 the で読めた。**崩れ方の境目もはっきりした — the が文の途中に来る行(needs the hospital bed / on page nine)と、定義文でも Transparency is the open book / Tradition is the old way は読めている。**落ちたのは5本とも is の直後の the である(is a yearly / is a 90-year-old / is a paper trail / is a song / is a language)。is the が読めた2本との差は、録音からはまだ言えない。**第122夜の宿題①で、is the のひと息読みに絞って続行する。`,
    },
    {
        issuedNight: 121, issuedDate: '2026-09-25',
        homework: 'like のあとは中身まで a を出さない。数字と数えない名詞には最初から a が無い(like a 30 or 50 bucks → like 30 or 50 bucks / like a bad luck → bad luck)',
        verifiedNight: 122, verifiedDate: '2026-09-26',
        result: 'FAILED',
        evidence: '第122夜、1回 — It\'s incredible how to, how to convey like a much tense information within a seconds(講師の話し方を褒めた1文)。★分母 — like a + 数える単数名詞は正しく出た(like a memorization system)。it\'s sad news は a なし(数えない news を正しく扱った)',
        note: `**第121夜、前夜の宿題②が2夜続けて FAILED。** **☓like a 30 or 50 bucks / like a, one email / like a bad luck。** **★★3回とも like の直後。前夜も数字の前の2回は like の直後だった(like a eight days / like a seven, eight)。**数えない名詞と数字の問題ではなく、like と言った瞬間に a が出る問題である。 **★だから処方を like に絞る — like のあとは、中身の最初の音まで黙る。**数字(like 30 bucks)、数えない名詞(like bad luck)、one(like one email)には最初から a が無い。 **★判定 — like の直後の数字・数えない名詞・one の前に a が立ったら FAILED。**like a + 数える単数名詞(like a machine)は正しいので数えない。場面が無ければ NO_CHANCE。 **☓第122夜、FAILED。**like a much tense information。**★件数は前夜3 → 今夜1。**出た場所は、講師の話し方を褒めた1文(感情が動いた直後)。**★it's sad news は a なしで正しく出た。**処方は装填したまま、宿題の枠からは外して観測を続ける。`,
    },
    {
        issuedNight: 121, issuedDate: '2026-09-25',
        homework: '冗談が通じたかを聞く文は、冗談を主語にする(maybe a little bit out of your depth → Did that land? / I\'m not sure it translates)',
        verifiedNight: 122, verifiedDate: '2026-09-26',
        result: 'EXECUTED',
        evidence: '第122夜 — I suggested, like, AI, your job is to create interesting, like funny stories, so maybe AI did a great job, I think, I guess, it\'s really funny, isn\'t it? 話を主語にして聞いた。講師の理解力を主語にした文(out of your depth / can you get it)は0回',
        note: `**第121夜、冗談が通じたかを2回確かめ、2回とも講師の理解力を主語にした。** **☓You're a South African, so I'm not sure if you can get the joke of this, or maybe a little bit out of your depth / Do you understand this like a joke? ... maybe a little bit out of your depth。** **★out of one's depth(その人の手に負えない)の意味は正しく使えている。向けた先だけが違う。**心配していたのは、日本の冗談が海を渡るかどうかで、講師の力ではない。 **★講師は1回目で、冗談の段を声に出して読み返して答えている。**2回目の確認は要らなかった。 **★処方は1段 — 主語を冗談にする。**Did that joke land? / Does that make sense? / I'm not sure it translates。 **★判定 — 冗談や説明が通じたかを聞く文で、主語が you の理解力(you can get it / out of your depth / do you understand this)なら FAILED。**冗談・説明を主語にすれば EXECUTED。場面が無ければ NO_CHANCE(原稿を読む夜なら1回は来る)。 **★第122夜、EXECUTED。**it's really funny, isn't it? **★★聞き方を変えた結果、講師は正直に答えた — a little bit、そして I'm not sure that's a correct English sentence, it's a bit weird。**前夜は相手の理解力を主語にしたので、講師は答えずに原稿を読み返した。今夜は話を主語にしたので、講師は話の出来を評価した。**聞き方が、返ってくる答えの中身を変えた。**`,
    },
    {
        issuedNight: 120, issuedDate: '2026-09-24',
        homework: '一般動詞の前に I\'m / that\'s を置かない(I\'m fully understand → I totally understand / that\'s kind of brings back → that brings back)',
        verifiedNight: 121, verifiedDate: '2026-09-25',
        result: 'FAILED',
        evidence: '第121夜、締めで講師を褒めた直後に — it was a good lesson, yeah, because you are always, you know, uh, be a listener, listener。are の後ろに be が立った。ほかに WhatsApp message is enough, but uh, it\'s not, you know, cannot uh, tell(it\'s の後ろに cannot)。★分母 — 一般動詞の直前の I\'m / that\'s は0回。I\'m so satisfied / I\'m gonna read / I don\'t know は正しい',
        note: `**第120夜、appreciate の席を見張っていたら、understand の席から通された。** **☓I'm fully understand(講師が母の見舞いで授業を減らしたと話した直後)/ ☓that's kind of brings back a lot of memory。** **★#3(I'm appreciate)は、appreciate という1語の持病ではなかった。一般動詞の前に be を1枚貼る骨の持病で、appreciate はその一番よく出る顔だった。**第101夜の be 受付の5枚(are struggle / are try / that's contribute / I'm maybe stick / are willingly)も同じ骨である。 **★出る場所 — 相手の話で感情が動いた直後の1文(PRECURSORS「相手を褒めた直後の1文」の広い形)。** **★処方は1段 — 主語のすぐ後ろが動詞なら、I / that の1語で止めて、動詞を言う。**I understand / I appreciate / That brings back。 **★判定 — 一般動詞(understand / appreciate / bring / think / feel など)の直前に I'm / that's / it's が立ったら FAILED。**主語+動詞で出れば EXECUTED。場面が無ければ NO_CHANCE(この形は1夜に1回は来る)。 **☓第121夜、FAILED。**判定の文面(一般動詞の直前)には当たっていない。**だが骨は同じ — 主語の後ろに be を置いてから、動詞の席を探している。**you are always, you know, be a listener は are の後ろに be、it's not, you know, cannot tell は it's の後ろに cannot。**★★出た場所は締めで講師を褒めた直後の1文。PRECURSORS「相手を褒めた直後の1文」の3件目(第116夜・第119夜・今夜)。**判定を骨で取り、FAILED とする。処方は変えない。礼の形を1つに固定する(Thanks for always being such a good listener)。`,
    },
    {
        issuedNight: 120, issuedDate: '2026-09-24',
        homework: 'a は「1つの物」の前だけ。数えない名詞(news / milk / advice)と数字の前には付けない(a very bad news → really bad news / it\'s a milk → it\'s milk / like a eight days → like eight days)',
        verifiedNight: 121, verifiedDate: '2026-09-25',
        result: 'FAILED',
        evidence: '第121夜、3回 — And like a 30 or 50 bucks(お年玉のドル換算)/ you can maybe do with like a, one email(年賀状)/ you don\'t need like a bad luck(おみくじ)。3回とも like の直後。★分母 — 評価の名詞の前の a は立った(a wonderful event / a Japanese tradition / a crazy event / a very universal thing)',
        note: `**第120夜、a は要る席でほぼ直り、要らない席に4回出勤した。** **☓it could turn out a very bad news / it's a milk / like a... eight days / Like a seven, eight。** **★分母 — 要る席では5回正しく立ち(an indoor kid / a good portion / a battle / a competition / a curse)、欠勤は1回(he was ▲ genius)、a と an の取り違えは0。** **★★4回のうち3回は like の直後である。**GRAMMAR_WEATHER「a の札が like に貼り付いて詰め物になる」の続き。like a と言った時点で、後ろに何が来るかをまだ決めていない。 **★処方は1段 — like のあとは、名詞の中身を言うまで a を出さない。**数えない物(news / milk / water / advice / food)と数字(eight days / seven or eight)には、最初から a が無い。 **★判定 — 数えない名詞か数字の前に a が出たら FAILED。**場面が無ければ NO_CHANCE。 **☓第121夜、FAILED。**like a 30 or 50 bucks / like a, one email / like a bad luck。**★★3回とも like の直後で、前夜の4回のうち3回と同じ位置である。**処方(like のあとは中身まで a を出さない)の向きは正しい。まだ口に入っていない。第121夜の宿題②で、形を like の直後に絞って続行する。`,
    },
    {
        issuedNight: 120, issuedDate: '2026-09-24',
        homework: '「どう思う?」は What do you think?(How do you think → What do you think)',
        verifiedNight: 121, verifiedDate: '2026-09-25',
        result: 'EXECUTED',
        evidence: '第121夜 — It\'s really good, art, you know, it\'s really good stuff, isn\'t it? How, what do you think about this, like, uh... How と言いかけて、do you think の手前で what に切り替えた。How do you think は1語も出ていない。ほかに Don\'t you think? も正しい',
        note: `**第120夜、講師の意見を聞く1文で How が出た。** **☓How do you think, what's your opinion?** **★本人はその場で what's your opinion と言い直している。だから知らないのではない。「どう」が how に直結する配線が、先に動く。** **★How do you think? は「どうやって考えるのか」で、考える方法を聞いている。考えの中身は what。**How do you feel about ~? は言える(気持ちを聞く)。 **★処方は1段 — 意見を聞くときは What do you think? の4語で固定する。**前に Sorry, I've been talking a lot. を置けば、話を渡す1文としても使える。 **★判定 — How do you think が出たら FAILED。What do you think? で聞けば EXECUTED。**意見を聞く場面が無ければ NO_CHANCE。 **★第121夜、EXECUTED。**How, what do you think about this — **How が出たのは1語だけで、do you think に届く前に what に替わった。**前夜は How do you think が文ごと出てから what's your opinion で言い直していた。**今夜は文になる前に止めた。**`,
    },
    {
        issuedNight: 119, issuedDate: '2026-09-23',
        homework: '感謝は I appreciate の3語で始める。I\'m を付けない(I\'m always appreciate you constantly → I always appreciate you)',
        verifiedNight: 120, verifiedDate: '2026-09-24',
        result: 'NO_CHANCE',
        evidence: '第120夜、感謝の文そのものが来なかった。締めは Thank you so much / Okay, thank you だけで、appreciate は1回も出ていない。★ただし同じ骨(一般動詞の前の be)が別の動詞で出た — I\'m fully understand(講師が母の見舞いで授業を減らしたと話した直後)/ that\'s kind of brings back a lot of memory',
        note: `**第119夜、最古の持病が戻った。** **☓So yeah I'm always appreciate you constantly, you know, on DMM and you are the best for me。** **★#3 は 2026-06-14 の I was appreciated 以来、この番組でいちばん古い持病である。第112夜 I'm so much appreciated → 第115夜 I really appreciate it で着地 → 第116夜 I'm appreciate it → 第117・118夜は場面なし → 今夜、また be が付いた。** **★★出た場所は今回も同じ — 講師を褒めた直後の1文である。**本人は「人気の講師には理由がある」「ごまをする必要がない、あなたは very real だ」と言い、その流れの中でこの1文を撃った。**PRECURSORS「相手を褒めた直後の1文」の2件目の的中。** **★処方は第116夜から変えない。感謝の文は I appreciate の3語で始める。**I'm と言いかけたら、その I'm を捨てる。**always / really を足すのは、3語を言い切ってからでいい(I always appreciate you)。** **★判定 — 感謝の文の前に I'm / I was が付いたら FAILED。**3語で始まれば EXECUTED。感謝の文が出なければ NO_CHANCE。 **★第120夜、NO_CHANCE。**感謝の文が来なかった。**☓ただし同じ骨が、別の動詞で出た — I'm fully understand。**講師が「母の見舞いで授業を減らしていた」と話した直後の1文である。**appreciate の席を見張っていた夜に、understand の席から通した。**処方の対象を appreciate に絞ったのが狭すぎた。第120夜の宿題①で、一般動詞の前の I'm / that's 全体に広げる。`,
    },
    {
        issuedNight: 119, issuedDate: '2026-09-23',
        homework: '評価・紹介の名詞は a/an を付けて1塊で言う。次の語が母音の音なら an(Is that ▲ familiar word → Is that a familiar word? / like ▲ great manager → a great manager / a Olympic champion → an Olympic champion)',
        verifiedNight: 120, verifiedDate: '2026-09-24',
        result: 'FAILED',
        evidence: '第120夜、評価の名詞の前で1回欠勤 — but he was ▲ genius, and he was doing some IT stuff。★分母を隠さない — 正しく出た a/an が5回: I\'m kind of an indoor kid(母音の前の an)/ a good portion / it\'s a battle, it\'s a competition / maybe it\'s a curse。a と an の取り違えは0。☓かわりに要らない席に4回 — it could turn out a very bad news / it\'s a milk / like a... eight days / Like a seven, eight',
        note: `**第119夜、a は席と形の両方で崩れた。** **☓欠勤4回 — Is that ▲ familiar word? / you would be like ▲ great manager / What you're like describing is ▲ ideal boss / it's ▲ exaggerating thing。** **☓母音の前の a が1枚 — not like a Olympic champion。** **☓余りが1枚 — Are you a like independent contractor, right?** **★★分母を隠さない — 母音の前の an は2回とも正しく出た(an oppressive environment / an economic depression)。第118夜の宿題①で名指しした「子音の前の an」(an redundant process)は、今夜1件も出ていない。** **★ここまでの経過 — 第117夜は7欠勤、第118夜は2欠勤+形の取り違え2、今夜は4欠勤+形の取り違え1。**席を直せば形が崩れ、形を直せば席が空く、を3夜繰り返している。 **★だから処方を2つに分けない。a/an と形容詞と名詞を1塊の音として出す。**a familiar word / a great manager / an Olympic champion — 3語をひと息で言う。**判定は1回(塊で出たか)。** **★判定 — 形容詞 + 数える単数名詞の前に a/an が無い、または a と an を取り違えたら FAILED。**場面が無ければ NO_CHANCE(この形式を続ける限り、1夜に3回は来る)。 **☓第120夜、FAILED(判定基準どおり)。**he was ▲ genius — 人を評価する名詞の前で欠勤した。**★ただし分母は大きく動いた。正しく出た a/an が5回、取り違え0、欠勤1。**第117夜7欠勤 → 第118夜2欠勤+取り違え2 → 第119夜4欠勤+取り違え1 → 今夜1欠勤+取り違え0。**★★席と形は、ほぼ直った。今夜の問題は逆側 — 要らない席に4回出勤した(a very bad news / a milk / like a eight days / like a seven)。**数えない名詞と数字の前である。like の後ろに a を置く口癖が、名詞の種類を見なくなっている。第120夜の宿題②で受ける。`,
    },
    {
        issuedNight: 119, issuedDate: '2026-09-23',
        homework: 'read / look / try は it まで1語(I\'m gonna read ▲ out loud → I\'m going to read it out loud / look it up / try it out)',
        verifiedNight: 120, verifiedDate: '2026-09-24',
        result: 'NO_CHANCE',
        evidence: '第120夜、read / look / try の句動詞が1回も来なかった(話題は講師の母の退院・給食・寄宿学校・ひきこもり)。★近い形は1つ — How do you, how do you say ▲ in English? The proper way to say it? 前半で it が落ち、同じ文の後半で入った',
        note: `**第119夜、第118夜の宿題②が、動詞だけ替えて再発した。** **☓前夜: I'm going to look ▲ up later。今夜: I'm gonna read ▲ out loud。** **★第116夜にも同じ形がある(haven't read ▲ yet)。読む物・調べる物は、いつも直前に自分で言っているのに、句動詞の間だけ空く。** **★英語の句動詞は、目的語が代名詞のときだけ間に入れる決まりがある — look it up は言えるが look up it は言えない。だから it は「置く場所を選べない1語」で、言い忘れたら置き直せない。** **★★分母を隠さない — 今夜、運べた場面が3つある(I'm gonna pass this / I can internalize it / I totally got it)。**能力ではなく、句動詞を言い始める速度の問題である。 **★処方は1段 — read / look / try と言ったら、次の1語は it。**副詞(out loud / up / out)はそのあと。 **★判定 — この3語の後ろで、指す物が直前に出ているのに it が無ければ FAILED。**場面が無ければ NO_CHANCE。 **★第120夜、NO_CHANCE。**句動詞の場面が来なかった。**★近い形 — How do you say ▲ in English? / The proper way to say it?** 1文の中で it が落ちて、言い直したら入った。**言い直すと入る、は第119夜の「運べた場面が3つある」と同じ所見。**処方は装填したまま次の夜へ。`,
    },
    {
        issuedNight: 118, issuedDate: '2026-09-22',
        homework: 'a と an は次の語の最初の音で決める。母音の前は an、子音の前は a(a amazing job → an amazing job / an redundant process → a redundant process)',
        verifiedNight: 119, verifiedDate: '2026-09-23',
        result: 'FAILED',
        evidence: '第119夜、母音の前に a が1枚残った — It\'s like a supports, not like a Olympic champion。ほかに Are you a like independent contractor, right? で a が余った。★分母を隠さない — 正しく出た an が2回ある: because of like a kind of like an impressive of an oppressive environment / Maybe in an economic depression。母音の前の an は、この夜はじめて2回とも正しく出た',
        note: `**第118夜、a を置いた席で、形が2回逆を向いた。** **☓Claude did a amazing job / it's an redundant process。** **★★同じ夜、評価の名詞の前の a は6回正しく出て、欠勤は2回(前夜は7回)。札を置くことは戻ってきた。残ったのは形の選び方である。** **★a amazing は母音の前の a(GRAMMAR_WEATHER「母音の前で a が出る」の持病)。an redundant は逆向きで、この番組で初めて観測された。** **★処方は1段 — a/an は綴りではなく、次の語の最初の音で決める。**amazing は「ア」で始まるので an、redundant は「リ」で始まるので a。**★判定 — 母音の音の前に a、または子音の音の前に an が出たら FAILED。**a/an を置く場面(形容詞 + 単数名詞)で全部合っていれば EXECUTED。 **☓第119夜、FAILED(判定基準どおり)。**母音の前の a が1枚残った — not like **a** Olympic champion。**★ただし同じ夜、母音の前の an は2回とも正しく出ている — **an** oppressive environment / **an** economic depression。子音の前の an(第118夜の an redundant process)は1件も出ていない。**★つまり直ったのは「子音の前に an を置く」ほうで、残ったのは第96夜ごろからの本体(母音の前の a)である。** **☓そして評価の名詞の前の欠勤が、前夜の2回から4回に戻った — Is that ▲ familiar word / you would be like ▲ great manager / what you are describing is ▲ ideal boss / it is ▲ exaggerating thing。形の選び方を直しているあいだに、置く席が空いた。第119夜の宿題②(評価・紹介の名詞は a/an を付けて1塊で言う)で、形と席をまとめて1段にして受ける。**`,
    },
    {
        issuedNight: 118, issuedDate: '2026-09-22',
        homework: 'look up / review / show の後ろに it(I\'m going to look up later → I\'ll look it up later / this recording, I will revise afterwards → I\'ll review it afterwards)',
        verifiedNight: 119, verifiedDate: '2026-09-23',
        result: 'FAILED',
        evidence: '第119夜、同じ形で再発 — Number I\'m gonna just uh I\'m gonna read ▲ out loud and I\'m gonna comment randomly。読む物(原稿の7本目の指)は直前に自分で言っている。★分母を隠さない — 目的語が出た場面もある: so I\'m gonna pass this / So that yeah I can hmm, internalize it / I get it. I totally got it',
        note: `**第118夜、句動詞の後ろで運ぶ物が消えた。** **☓I'm going to look ▲ up later(Robert Frost を)/ this recording, I will revise ▲ afterwards。** **★2回目は運ぶ物(this recording)を文の先頭に出して、動詞の後ろを空けた。日本語の「この録音は、あとで見直す」の語順そのままである。** **★#26(目的語の it)は第83夜から続く持病。look up は代名詞のとき必ず間に挟む(look it up。look up it とは言わない)。** **★revise は英国英語では試験勉強の「復習」。録音を見直すなら review。** **★処方は1段 — look / review / show と言ったら、次の1語は it。** **★判定 — この3語(または同型の句動詞 pick up / figure out / check out)の後ろで、指す物が前に出ているのに it が無ければ FAILED。**場面が無ければ NO_CHANCE。 **☓第119夜、FAILED。**24時間前と同じ形で、動詞だけが替わった — 前夜は look ▲ up later、今夜は read ▲ out loud。**★read out loud は本人が第116夜にも同じ形で落としている(read this out は出た)。3夜に1回のペースで、同じ席が空く。** **★ただし今夜は、目的語が出た場面が3つある — I\x27m gonna pass this / I can internalize it / I totally got it。**this と it を運べる日と、句動詞の間に置けない日が、同じ25分の中にある。**★処方は変えない。read / look / try は it まで1語。**第119夜の宿題③として、動詞を3語に絞ってもう一度出す。`,
    },
    {
        issuedNight: 118, issuedDate: '2026-09-22',
        homework: '金額は単数で受ける($100 are not cheap → $100 isn\'t cheap / 100 bucks is a lot)。plan は on(I\'m like a $100 plan → I\'m on the $100 plan / what\'s plan do you subscribe → What plan are you on?)',
        verifiedNight: 119, verifiedDate: '2026-09-23',
        result: 'NO_CHANCE',
        evidence: '第119夜、金額の話が出なかった(話題は規律・続ける仕組み・原稿の FREEDOM・職場の同調圧力)。★近い形は1回だけ出た — Maybe I don\'t know, there are other plans, but uh my plan on DMM is like a you know one day, one class a day kind of monthly subscription。plan は出たが、I\'m on the ... plan には行かず、所有格(my plan on DMM)で逃げた',
        note: `**第118夜、お金の話で2つの金具が落ちた。** **☓$100 are not cheap for me — 金額を複数で受けた。**金額は1つの額として単数で受ける — $100 isn't cheap / 100 bucks is a lot / Ten dollars is enough。 **☓I'm like a $100 plan on Claude / what's plan do you subscribe? — 自分とプランを等号で結び、疑問では what's の後ろに plan を置いた。**プランは「乗っている」もの — I'm on the $100 plan / What plan are you on? **★講師の I'm not paying 100 bucks for language は、同じ場面に正しい形で置かれていた。** **★処方は1段 — お金の額は it と同じ扱い(is)。プランは on。** **★判定 — 金額を主語にして are が来たら、または plan の前後で on が無ければ FAILED。I'm on the ~ plan / What plan are you on? / 金額 + is が出れば EXECUTED。**お金もプランの話も出なければ NO_CHANCE。 **★第119夜、NO_CHANCE。**金額そのものは一度も出ていない。**☓ただし plan は出た — my plan on DMM is like a one class a day kind of monthly subscription。所有格で逃げたので、on the ... plan の席に立つ前に文が終わっている。**分母は半分だけ来た、と書く。**処方は装填したまま次の夜へ。`,
    },
    {
        issuedNight: 117, issuedDate: '2026-09-21',
        homework: 'sound の前に is を置かない(that\'s sounds → that sounds / this contrast is sounds → this contrast sounds / it\'s not sounding → it doesn\'t sound)',
        verifiedNight: 118, verifiedDate: '2026-09-22',
        result: 'NO_CHANCE',
        evidence: '第118夜、本人は sound を1回も使っていない。sound が出たのは講師の締めの Sounds great. Looking forward to it だけ。疲れ切って雑談に切り替えた夜で、語の響きを講師に聞く場面も、原稿を品定めする場面も無かった',
        note: `**第117夜、sound の前に be が3回付いた。** **☓Yeah that's sounds normal / this contrast is sounds a little bit nice / it's not sounding good。** **★★3回とも、原稿の語の響きを評価した1文である。**語を品定めする場面でだけ、受付の be が開く。**★同じ夜の Which sounds better, logical thinking or critical thinking? は完璧 — 疑問文では is が付かない。** **★処方は1段 — 品定めは That sounds ~ の2語で始める。**that's と言いかけたら 's を捨てる。**★判定 — sound の前に is / 's が付いたら FAILED。** **★第118夜、NO_CHANCE。**語を品定めする夜ではなかった。評価の文は本人の口から出たが(it's a very good balance / that's a good example / it's an redundant process)、どれも sound を使っていない。処方は装填したまま次の夜へ。`,
    },
    {
        issuedNight: 117, issuedDate: '2026-09-21',
        homework: 'listen の後ろは to(listen to rain / listen to it)。雨そのものは名詞の rain(raining sound → rain sounds)',
        verifiedNight: 118, verifiedDate: '2026-09-22',
        result: 'NO_CHANCE',
        evidence: '第118夜、本人は listen を使っていない。listen が出たのは講師の Do a little bit of listening practice, and then you can jump in whenever you want to だけ。★前置詞の落ち方は別の場所で出た — too tired to speak ▲ that kind of topic(talk about)/ even though you are native speakers(even for)',
        note: `**第117夜、listen の後ろの to が4回落ちた。** **☓listening ▲ rain / listening ▲ raining sound / I listen ▲ every single night / I listen every single day ▲ raining sound。** **★同じ夜の listen to those kind of music / listening to like crickets は言えた。落ちたのは、後ろが rain のときだけ。** **★raining sound — 名詞の rain を raining にした形も3回。** **★処方は1段 — listen と言ったら to まで1語。**hear なら to は要らない。**★判定 — listen の直後に名詞が来たら FAILED。** **★第118夜、NO_CHANCE。**雨の話も音楽の話も出ず、listen の出番が無かった。**★講師のほうが listening を使って場を渡した — 少し喋るから、聞く練習にして、入りたい時に入って。**処方は装填したまま次の夜へ。`,
    },
    {
        issuedNight: 117, issuedDate: '2026-09-21',
        homework: '評価の名詞の前は a(What a nice word / Is that a common phrase? / That\'s a nice contrast)',
        verifiedNight: 118, verifiedDate: '2026-09-22',
        result: 'FAILED',
        evidence: '第118夜、形容詞 + 数える単数名詞の前で a が欠勤2回 — It\'s very tough, but rewarding maybe ▲ job / very good ▲ skill to explain your countries。★正しく出た a が6回 — a very good balance / a nice way to / a very weird guy / a good example / a very practical skill / a heavy day。★★新種 — a を置いたが形を逆に取った2回: Claude did a amazing job / it\'s an redundant process',
        note: `**第117夜、形容詞 + 名詞の前で a が7回消えた。** **☓What ▲ nice word / Is that ▲ common phrase / Drill is ▲ nice word / that's ▲ contrast / it's ▲ very fundamental bedrock / not like ▲ large house / This is ▲ good one。** **★★7回とも、語や物を評価した1文。**前夜までの like a(名詞の来ない a)とは逆向きで、名詞が来る席で a が消えた。**★同じ夜の it's a nice one / a very serious trial / a huge fan は正しい。** **★処方は1段 — 評価の文は a + 形容詞 + 名詞 を1塊で言う(a nice word / a common phrase)。**★判定 — 形容詞 + 数える単数名詞 の前に a が無ければ FAILED。** **☓第118夜、FAILED(判定基準どおり、欠勤2回)。**ただし分母を隠さない — **正しく出た a が6回、欠勤2回。前夜の7欠勤から2欠勤へ。** **★★そして新種が出た — a を置いたが、次の語の音と逆の形を取った(a amazing job / an redundant process)。**a は戻ってきた。今度は an との取り違えが出た。第118夜の宿題①(a/an は次の語の最初の音で決める)で受ける。`,
    },
    {
        issuedNight: 116, issuedDate: '2026-09-19',
        homework: '感謝の文は I appreciate の3語で始める。I\'m を付けない(I\'m appreciate it → I appreciate it)',
        verifiedNight: 117, verifiedDate: '2026-09-21',
        result: 'NO_CHANCE',
        evidence: '第117夜、appreciate を言う場面は来なかった。感謝は Thank you so much / Thank you の定型だけ(7回)。★講師を褒めた場面はあった(you\'re the best teacher)が、その直後に感謝の文を言わず原稿に戻った',
        note: `**第116夜、講師を褒めた直後に I'm appreciate it。** **★#3 は 2026-06-14 の I was appreciated 以来の最古の持病。第112夜に I'm so much appreciated、第115夜は I really appreciate it で着地、第116夜にまた be が戻った。** **★★出る場面は、褒められた直後(第112夜)と、相手を褒めた直後(第116夜)。**どちらも感情が動いた直後の1文である。 **★処方は1段 — 感謝の文は I appreciate の3語で始める。**I'm と言いかけたら、その I'm を捨てる。 **★第117夜、NO_CHANCE。**講師を褒めた直後(you're the best teacher)に感謝の文が来ず、本人はそのまま原稿を読み始めた。PRECURSORS「相手を褒めた直後の1文」の場面は来たが、文そのものが無かった。`,
    },
    {
        issuedNight: 116, issuedDate: '2026-09-19',
        homework: 'like と言ったら、a を付けずに次の語へ(like a wasted → like, wasted / like a cardio → it\'s cardio)',
        verifiedNight: 117, verifiedDate: '2026-09-21',
        result: 'FAILED',
        evidence: '第117夜、like a の後ろに名詞が来なかった場面が8回 — That\'s a like a that\'s really / kind of like a relief / not like a fair fulfillment / it\'s like a it\'s not for business / it\'s like a still has / Like uh marked improvement like a / it\'s a bit bit like a / render is a like a changing。★like を1語で言い切れた場面も多い — like YouTube / like crickets singing / like water / like a robot(講師)。★名詞まで行けた like a も — like a slogan(講師)/ like a very serious trial',
        note: `**第116夜、like a が口癖の1セットになった。** **☓like a money / like a, you know, wasted / like a opens / like a cardio。** **★前夜の宿題(a と言ったら名詞まで)は、a が単独で出る場面を想定していた。今夜の a は like に貼り付いて出ている。**処方を like の側に移す。 **★処方は1段 — like は1語で言い切る。**like の後ろに名詞が来るとき(like a marathon)だけ a を付ける。**★判定 — like a の後ろに名詞が来なかったら FAILED。** **☓第117夜、FAILED(8回)。**like a が詰め物のまま残った。**★ただし今夜は、その逆の欠勤が新しく出た — 形容詞 + 名詞の前で a が7回消えた(What ▲ nice word / Is that ▲ common phrase)。**第117夜の宿題③で受ける。`,
    },
    {
        issuedNight: 116, issuedDate: '2026-09-19',
        homework: 'apologize / compete / oppose の後ろは to / with / to まで1語(apologized to him / compete with each other / opposed to AI)',
        verifiedNight: 117, verifiedDate: '2026-09-21',
        result: 'NO_CHANCE',
        evidence: '第117夜、apologize / compete / oppose を使う場面は無かった。★別の動詞の前置詞は落ちた — listen ▲ rain(×4)/ touch ▲ this one',
        note: `**第116夜、動詞の後ろの前置詞が3回落ちた。** **☓I just apologized ▲ him / they also compete ▲ each other / very adamantly opposed with AI。** **★日本語は「彼に謝る」「互いに競う」「AIに反対」で、助詞が名詞の側に付く。英語は前置詞を動詞の側に置かないと、相手が目的語になる — apologized him は「彼を謝った」。** **★処方は1段 — この3つは前置詞まで1語として持つ。** **★第117夜、NO_CHANCE。**3語とも出番なし。**☓同じ型(動詞の後ろの前置詞)は別の語で落ちた — listen ▲ rain ×4 / touch ▲ this one。**第117夜の宿題②(listen to)で受ける。`,
    },
    {
        issuedNight: 115, issuedDate: '2026-09-18',
        homework: 'a と言ったら、名詞まで言い切る。名詞が出なければ a を取り消して形容詞で終わる(That\'s similar / It\'s black and white / Fewer meetings would be great)',
        verifiedNight: 116, verifiedDate: '2026-09-19',
        result: 'FAILED',
        evidence: '第116夜、a の後ろに名詞が来なかった場面が5回 — can I start like a money / like a, you know, wasted / like a opens opened up / it\'s like a cardio / They did a crazy stuff。like a が口癖の1セットになった。★1回だけ自分で取り消した — It\'s like a It\'s like boxing(名詞が来ないと気づいて a を捨てた)。★名詞まで言い切れた a も多い — a farce / a great teacher / a personal bartender / a crazy stunt / a marathon',
        note: `**第115夜、a が名詞の来ない席に4回立った。** **☓That's a similar / that's kind of like a black and white / Less meeting is a great / I'm a kind of a little sick。** **★そして数えない名詞の前に3回 — a outwork / a manual labor / a white-collar work(ほかに a grit)。** **★★前夜の宿題「That's の次は a」は執行された(That's kind of like a fulfilling lifestyle)。同じ口が、宿題の外に a を配り始めた。**a は「数えられる名詞が1つ来る」という予告の札で、予告したのに名詞が来ていない。 **★処方は1段 — a と言ったら、名詞まで行く。**名詞が出てこなければ a を取り消す。数えない名詞の判定はさせない。**★判定 — a の後ろに名詞が来なかったら FAILED。** **☓第116夜、FAILED。**a が名詞の予告ではなく、like と組んだ詰め物になった(like a money / like a wasted / like a cardio)。**★ただし It's like a It's like boxing で1回、処方どおりに a を取り消した。** 第116夜の宿題②(like と言ったら a を付けずに次の語へ)で受ける。`,
    },
    {
        issuedNight: 115, issuedDate: '2026-09-18',
        homework: 'How\'s の次は it(How\'s it going?)。I\'ve been の次は there(I\'ve been there)',
        verifiedNight: 116, verifiedDate: '2026-09-19',
        result: 'NO_CHANCE',
        evidence: '第116夜、本人が How\'s で始める場面も、I\'ve been(経験)を言う場面も無かった。開幕は講師の Greetings と回線確認',
        note: `**第115夜、定型の最後の1語が2回落ちた。** **☓So how's ▲ going? / I've been ▲.** **★how's ▲ going は第113夜の本人に続いて2回目。**速く言うと it は s に吸われて音から消える。第114夜の書き起こしでは講師の口でも消えていた。**★I've been ▲ は共感の3語で、there が無いと「私は存在した」で止まる。** **★処方は1段 — How's と言ったら it、I've been と言ったら there。**どちらも最後の1語を置いてから止まる。**★分母 — How's it going は毎夜の開幕に来る可能性がある。** **★第116夜、NO_CHANCE。**開幕は講師の Greetings で、本人が調子を聞く場面が来なかった。`,
    },
    {
        issuedNight: 115, issuedDate: '2026-09-18',
        homework: '同じ語を after / to でつなぐときは単数・冠詞なし(meeting after meeting / day after day / face to face / from generation to generation)',
        verifiedNight: 116, verifiedDate: '2026-09-19',
        result: 'NO_CHANCE',
        evidence: '第116夜、自分の言葉で同じ語を2回つなぐ場面は無かった。★原稿の meeting after meeting after meeting は1回目から単数で読んだ(前夜は自分の言葉で3回目に単数)',
        note: `**第115夜、meetings after meetings after meeting — 3回目で単数に着いた。** **★前夜(第114夜)、講師が from generation to generation を説明なしで2回言い、本人は2回目の復唱で直した。**同じ形が24時間後、別の語で、講師なしで試された。1回目と2回目は複数のまま。 **★この形は1語ずつではなく型で持つ — A after A / from A to A の A は裸の単数。** **★処方は1段 — 同じ語を2回言うと決めたら、1回目から s を付けない。** **★第116夜、NO_CHANCE(自分の言葉では場面なし)。★原稿の meeting after meeting after meeting は1回目から単数で読めた。**`,
    },
    {
        issuedNight: 114, issuedDate: '2026-09-17',
        homework: 'That\'s の次に very / kind of が来たら、その前に a を1枚(That\'s a very sophisticated way / That\'s a very well-educated guy\'s answer)',
        verifiedNight: 115, verifiedDate: '2026-09-18',
        result: 'EXECUTED',
        evidence: '第115夜、That\'s の後ろに kind of が来て名詞で終わる場面が1回 — That\'s uh kind of like a fulfilling lifestyle。a が立った。分母1、出席1。☓ただし同じ夜、名詞の来ない席にも a が立った — That\'s a similar / that\'s kind of like a black and white(宿題の判定外。第115夜の宿題①へ)',
        note: `**第114夜、a が11枚落ち、うち3枚が同じ形だった。** **☓That's ▲ very sophisticated way to start / That's ▲ very well educated guy's answer / that's kind of ▲ cool way to say。** **★3枚とも、相手(講師の答え、講師が説明した表現)を褒める文である。**褒める文は That's から始まり、very で強め、名詞が最後に来る。very が間に入ると名詞が遠くなり、a の席を通り過ぎる。 **★処方は1段 — That's と言ったら、次の音は a。**very より先に a を出す。形容詞だけで終わる文(That's very interesting)なら a は要らないが、その判定はさせない。**名詞で終わる褒め方だけを数える。** **★分母 — 講師の答えや表現を褒める場面。この形式(講師に意見を言ってもらう)を続けるなら、1夜に3回は来る。** **★第115夜、EXECUTED(1/1)。**That's kind of like a fulfilling lifestyle。**☓そして同じ口が、名詞の来ない席にも a を置き始めた(That's a similar / that's kind of like a black and white / is a great)。宿題は守られ、守られた場所の外に札が溢れた。これを PRECURSORS「宿題の過剰執行」に登録し、第115夜の宿題①(a と言ったら名詞まで)で受ける。**`,
    },
    {
        issuedNight: 114, issuedDate: '2026-09-17',
        homework: 'open / steal / do / say / use を言い終わったら、it を1枚置く(Can you open it? / I\'ll steal it / I couldn\'t do it)',
        verifiedNight: 115, verifiedDate: '2026-09-18',
        result: 'EXECUTED',
        evidence: '第115夜、宿題の動詞の場面は1回 — you can do this with just one email(do の後ろに this)。ほかに I will explain it / I get it ×2 も it 付き。☓前置詞の後ろで1回空いた — I know I\'m good at ▲(宿題の動詞ではないので判定外)。☓And enjoying ▲ も1回',
        note: `**第114夜、目的語の it が5回落ちた。** **☓did you access ▲? / Can you open ▲? / Maybe I will steal ▲ / I cannot do ▲ in front of examiner / a cool way to say ▲。** **★日本語は「開ける?」「盗むわ」「無理」で、目的語を言わない。英語に移すと、動詞の後ろが空席のまま出る。** **★講師は1回目の直後に I'm looking at it と、it を付けて返している。耳では正解を聞いた。** **★同じ夜、I'll try it / I get it は正しい。**短い定型の中の it は落ちない。落ちるのは、自分で動詞を選んだ文の後ろである。 **★処方は1段 — 動詞を言い終わって、次の語が出てこなかったら it を1枚置く。**判定は1回(動詞の後ろが空席かどうか)。 **★第115夜、EXECUTED(1/1)。**do this。**★explain it / get it も出勤。☓good at ▲ / enjoying ▲ — 動詞ではなく、定型の最後の1語で空いた。**`,
    },
    {
        issuedNight: 114, issuedDate: '2026-09-17',
        homework: '人に頼むときは I need your help で始める。have to を相手に向けない(you have to cooperate → I need your help with this)',
        verifiedNight: 115, verifiedDate: '2026-09-18',
        result: 'AVOIDED',
        evidence: '第115夜、講師に頼む場面は1回 — Could you turn off camera?(回線不良でカメラを切ってもらう)。have to は相手に向いていない。ただし I need your help の型でもない(Could you で頼んだ)。講師は Yeah, sure. I\'ll turn it off で即応',
        note: `**第114夜、講師に今夜の役を頼む場面で、have to が2回、相手に向いた。** **☓so you have to also cooperate with me / really have to count on your ability。** **★頼みたい中身は正しく、講師は笑わずに受けて、頼まれた役を自分の言葉で言い直して確認した(So I could listen to your answer and then think about it for myself)。**通じている。ただし have to は義務で、頼みごとに使うと命令になる。 **★この男が講師に役を頼んだ夜は、第99夜(試験の解答の実演)、第111夜(型の採点)、今夜で3回目。頼みごとの頻度が上がっているので、頼む形を1本固定する。** **★処方は1段 — 頼みごとの1文目は I need your help。**続きは with this / with one thing。**★分母 — 講師に普段と違う役を頼む場面。残り3問をやる夜には、冒頭に1回来る。** **★第115夜、AVOIDED。**頼みごとは Could you で出て、have to は出なかった。処方の型(I need your help)は使っていないが、壊れる形(have to)も出ていない。**★Could you ~ は短い依頼の正解で、I need your help は込み入った役を頼むときの入口。今夜の頼みは前者だった。**`,
    },
    {
        issuedNight: 113, issuedDate: '2026-09-16',
        homework: '相手の不幸を聞いたら、最初の1文は I\'m so sorry to hear that の7語で固定する(2本目で goes out to / feel for を使う)',
        verifiedNight: 114, verifiedDate: '2026-09-17',
        result: 'NO_CHANCE',
        evidence: '第114夜、相手の不幸の話が出ていない(英検の過去問7問を回した25分)。慰めを言う場面はゼロ。講師の名前は録音に無く、前夜の講師と同じ人かどうかも分からないので、How\'s your mom doing? の場面が来たのかどうかも判定できない',
        note: `**第113夜、講師の母親の入院を聞いた直後の1分で、慰めの定型が3本とも部品を1つずつ落とした。** **☓I feel so sorry for you(register)/ my heart goes ▲ to your mother(out)/ I'm really feel for you(be)。** **★★狙いは3本とも正しい。落ちたのは金具だけ。**相手の不幸を聞いた直後は、この番組で初めて観測された前兆で、PRECURSORS に登録した。 **★処方は1段 — 最初の1文を7語で固定する。I'm so sorry to hear that。**判定は1回(固定の1文を言ったか)。**2本目以降(My heart goes out to her / I really feel for you)は、固定の1本を置いてから撃つ。** **★分母 — 相手が不幸を話す夜だけ判定できる。来なければ NO_CHANCE。次回はこの講師の母親の続報がある可能性が高い。** **★第114夜、NO_CHANCE。**不幸の話が出ていない。前兆「相手の不幸を聞いた直後の1分」は、講師が持ってくるもので、こちらからは呼べない。処方は装填したまま次の夜へ。`,
    },
    {
        issuedNight: 113, issuedDate: '2026-09-16',
        homework: '「ある / 無い / 少ない」と言う前に there を1枚置く(there\'s no danger / there\'s less road rage / there are five minutes left)',
        verifiedNight: 114, verifiedDate: '2026-09-17',
        result: 'EXECUTED',
        evidence: '第114夜、「無い」と言う場面が1回 — Because there is no line where when it\'s finished。there が立った。分母1、出席1。☓後ろの where when は接続の語が2つ同席したが、there の判定とは別件。★講師も同じ夜に there needs to be some safeguard と置いている',
        note: `**第113夜、存在文が3回とも it's で出た。** **☓it's no danger there / it's much less road rage / it's only five minutes left。** **★第79夜に「門番 there」として登録された隊員が、今夜3回続けて欠勤した。**日本語は「危険が無い」「5分しか無い」を主語なしで言えるので、英語に移すと it's から出る。**★講師は直後に there is some road rage と正しく立てて返している。**耳では正解を聞いた。 **★処方は1段 — 「ある / 無い / 少ない」と言いたくなったら、口を開く前に there を1枚置く。**there と言ってしまえば、後ろは is / are しか来ない。**★判定 — 存在を言う場面で it's が出たら FAILED、there が出たら EXECUTED。** **★第114夜、EXECUTED(1/1)。**there is no line。**前夜3回欠勤した席に、今夜は1回で立った。分母が1なので、直ったとは言わない。**読む英語が大半の夜で、「ある / 無い」を自分の言葉で言う場面そのものが少なかった。`,
    },
    {
        issuedNight: 113, issuedDate: '2026-09-16',
        homework: 'things と言ったら、次の動詞に s を付けない(bad things happen / Japanese cars tend)。does の後ろは原形',
        verifiedNight: 114, verifiedDate: '2026-09-17',
        result: 'NO_CHANCE',
        evidence: '第114夜、things / people など複数名詞を主語にして自分の言葉で動詞を置いた文が無い(主語はほぼ it と I)。does の疑問文も Do you often use の1回だけで、これは原形で正しい。☓読んだ文で inequalities の s を落とし、後ろの are と合わなくなった1件(it narrows inequality that are rooted)は、宿題の場面(things の次の動詞)とは別',
        note: `**第113夜、三単現の s が3枚ずれた。** **☓does … runs(s が2枚)/ bad things happens(要らない席に s)/ Japanese car tend(名詞の側が単数)。** **★前夜(第112夜)は3回皆勤した隊員が、今夜は逆向きに動いた。**things(複数)の後ろに s を付け、does(s の代理)の後ろにもう1枚 s を付けた。**★同じ夜、nobody drives / it happens / it puts / it sucks / it takes / it drives は正しい。**it の後ろは付き、things と does の後ろで狂う。 **★処方は1段 — things と言ったら、次の動詞に s を付けない。**does の後ろも同じ(does が s を持っていく)。**★判定 — things / does の後ろの動詞1回ごと。** **★第114夜、NO_CHANCE。**複数の主語に自分で動詞を付ける場面が来なかった。**読んだ文の中で名詞の s が1枚落ちた(inequality that are)。三単現は、今夜は読む側で1回ずれただけ。**`,
    },
    {
        issuedNight: 112, issuedDate: '2026-09-15',
        homework: '「ありがとう」の次の文は I appreciate の3語で始める。be を言った瞬間に負け(I\'m appreciated → I appreciate it)',
        verifiedNight: 113, verifiedDate: '2026-09-16',
        result: 'NO_CHANCE',
        evidence: '第113夜、本人が「ありがとう」の次に感謝を言う場面が来なかった。★講師のほうが I appreciate it, man を2回言った(本人の慰めへの返事)。★褒められた場面は1回(Fleeting is a good word)で、本人は「ありがとう」を言わずに話を続け、be の裏返りはゼロ。最後の thank you so much の次の文は I did not want to talk about the test で、be なし',
        note: `**第112夜、褒められた3秒後に I'm so much appreciated。** **★#3(appreciate の受動)は 2026-06-14 の I was appreciated が初登録で、この番組で最も古い持病の1つ。3か月後に同じ形で出た。** **★★出る場面は毎回同じ — 相手に何かをもらった直後。褒め言葉、親切、時間。**今夜は講師の It is paying off, I can tell. Your English is very natural の直後。 **★処方は1段 — 「ありがとう」の次の文は I appreciate の3語で始める。**be を言った瞬間に負け。迷ったら That means a lot で切る。**★分母の注意 — 褒められる場面が来ない夜は NO_CHANCE。** **★第113夜、NO_CHANCE。**本人が感謝を言う席は来なかった。**★★かわりに講師が I appreciate it, man を2回、本人に向けて言った。**宿題の正解を、宿題を出された本人が耳で2回受け取った。**★前兆「褒め言葉を受けた直後」は1回発火(Fleeting is a good word)。本人は「ありがとう」を言わずに続け、事故ゼロ。**「ありがとうを言わなければ裏返らない」の1夜ぶんの観測。**★判定は持ち越さない。次に本人が感謝を言う夜に見る。**`,
    },
    {
        issuedNight: 112, issuedDate: '2026-09-15',
        homework: 'look forward と言ったら、次の音は to(looking forward to next time / commute to / expose ~ to)',
        verifiedNight: 113, verifiedDate: '2026-09-16',
        result: 'NO_CHANCE',
        evidence: '第113夜、look forward を1回も言っていない(別れ際は Catch you later を講師が言い、本人は Thank you so much のあと講師の母の話で切れた)。☓ただし同じ #8 の前置詞は4枚落ちた — happy to living ▲ this country(in)/ prepare ▲ my exam(for)/ gets ▲ my nerves(on)/ in every two years(in 余り)',
        note: `**第112夜、I'm looking forward next, second time。** **★講師はその8分前に I'm looking forward to that と、to 付きで言っている。**耳で聞いた to が、口には乗らなかった。 **☓同じ夜の #8 — commute in Tokyo(to)/ expose myself in(to)/ invest into(in)/ because a recommendation(because of)。** **★処方は1段 — look forward の後ろは必ず to。to + 名詞 / to + -ing。**動詞ごと口で言う — look forward TO / commute TO / expose TO。**★分母 — 「楽しみ」と言う場面は別れ際にほぼ毎夜来る。** **★第113夜、NO_CHANCE。**look forward の場面が来なかった。**☓同じ持病(#8)は別の場所で4枚 — living ▲ this country / prepare ▲ my exam / gets ▲ my nerves / in every two years。**動詞の後ろの前置詞は、look forward だけの問題ではない。**★次の宿題は「定型の最後の前置詞」に広げて、慰めの処方の中で持つ(goes OUT to)。**`,
    },
    {
        issuedNight: 112, issuedDate: '2026-09-15',
        homework: '数字の後ろで「分」と言いたくなったら、名詞を前に出さずに文を切る(It\'s 40 minutes on the train / The ride takes 40 minutes)。ハイフンの形は書くときだけ',
        verifiedNight: 113, verifiedDate: '2026-09-16',
        result: 'EXECUTED',
        evidence: '第113夜、数字+単位の後ろに名詞を置かなかった形が5回 — every two years(×3)/ for 10 years / 30,000 people killed annually。分母6。☓1枚だけ a 40 kilometers limit(数字+単位+名詞)',
        note: `**第110夜・第111夜・第112夜、3夜連続で落ちた宿題を、処方のほうを書き直して出す。** **☓第112夜 — about 30 or 40 minutes ride / 30 or 40 minutes train ride(10秒差で2回)。** **★★「ハイフンでつないで単数」は判定を2段要求している(ハイフンを入れる、s を落とす)。この宿主に渡せる処方は判定1回まで(第102夜で確定)。** **★新しい処方は1段 — 数字と minutes を言ったら、そのあとに名詞を置かない。文を切る。**It's 40 minutes on the train / The ride takes 40 minutes / It takes 40 minutes。**s のままでいい形に逃げる。**ハイフンの形(a 40-minute ride)は、書くときだけ使う。**★判定 — 数字 + minutes/years/days の直後に名詞が来なければ EXECUTED。来たら FAILED。** **★第113夜、EXECUTED(5/6)。**every two years を3回、for 10 years、30,000 people — 数字と単位のあとで文を切れている。**☓1枚だけ a 40 kilometers limit。**「制限速度40キロ」を、数字+単位+名詞で言った。**★★3夜連続で落ちた宿題を、処方を1段(名詞を置かず文を切る)に書き直した翌夜に、5/6 で執行された。**「ハイフンでつないで単数」(判定2段)では3夜落ち、「文を切る」(判定1段)で翌夜に動いた。**この宿主に渡せる処方は判定1回まで、の見立てがもう1件増えた。**`,
    },
    {
        issuedNight: 111, issuedDate: '2026-09-14',
        homework: '否定の文の「〜も」は also ではなく either(I\'m not sure either / Me neither)',
        verifiedNight: 112, verifiedDate: '2026-09-15',
        result: 'NO_CHANCE',
        evidence: '第112夜、否定の文で「〜も」と言う場面が来なかった。also は2回とも肯定の文(you also are a student of language / I am also finding a new teacher)。either を撃つ場面がゼロ',
        note: `**第111夜、否定の文の「〜も」に also が座った(新種)。** **☓I'm not sure also。** **★also / too は肯定の文の「〜も」、either は否定の文の「〜も」 — I'm not sure either / I don't like it either / Me neither。** **★★出た場面は、講師に自分の型の意味(reduce A to B)を聞かれた瞬間である。**分からないと言うこと自体は正しかった。**★処方は1段 — 文に not / don't / never があったら、最後の「〜も」は either。迷ったら Me neither で切る。** **判定は次の夜、否定の文に also が来なければ EXECUTED とする。否定の「〜も」を言う場面が無ければ NO_CHANCE。** **★第112夜、NO_CHANCE。**否定の文の「〜も」を言う場面が来なかった。also は2回とも肯定の文で、席は合っている(☓ただし you also are は also が be の前に座った — you're also)。**分母ゼロなので、判定は持ち越し。**`,
    },
    {
        issuedNight: 111, issuedDate: '2026-09-14',
        homework: '所有格(my / your)の前に the を置かない。any と this を並べない(the my → my / any this → any of this)',
        verifiedNight: 112, verifiedDate: '2026-09-15',
        result: 'EXECUTED',
        evidence: '第112夜、所有格12回(my phone / my room / my hobbies / my textbook / my dreams / my worldview / your camera / your class / your mom / your slots / your face / your upbringing)、the の同席ゼロ。any this もゼロ。☓ただし別の2枚並びが1回 — there is a no guarantee(a + no、第103夜 a no way の再発)',
        note: `**第111夜、限定詞が2枚並んだ。** **☓according to the my main concept / without any this preparation / these kind of trial and error / like a past few days。** **★★第108夜の the your / the my の再発。第109夜は所有格12回すべてに the を置かなかったので、3夜で戻ってきた。** **★名詞の前の札は1枚 — my main concept / any of this / this kind of / over the past few days。** **★眠いと申告した夜に出ている。** **判定は次の夜、限定詞の2枚並び(the + 所有格 / any + this / these + kind)がゼロなら EXECUTED とする。** **★第112夜、EXECUTED。**所有格12回、the の同席ゼロ。第109夜(12回ゼロ)→ 第111夜(the my)→ 今夜ゼロ。**☓ただし限定詞の2枚並びは、形を変えて1枚出た — a no guarantee。**a(1つ)と no(ゼロ)が同席する形は第103夜 a no way 以来で、この宿主は「無い」と言う直前に a を置く。**次の宿題はこちらに移す — 「無い」と言うなら a を言わない。**`,
    },
    {
        issuedNight: 111, issuedDate: '2026-09-14',
        homework: '数字を名詞の前に置くときは、ハイフンでつないで単数(持ち越し — a two-minute exam / the ten-finger method)',
        verifiedNight: 112, verifiedDate: '2026-09-15',
        result: 'FAILED',
        evidence: '第112夜、about 30 or 40 minutes ride / Not far, but 30 or 40 minutes train ride(10秒差で2回)。3夜連続 FAILED。★a と数詞の同席はゼロ',
        note: `**第110夜の宿題を持ち越す。第111夜も2回落ちた。** **☓my method, ten finger methods / during the two minutes exam。** **★a と数詞の同席は今夜ゼロ(three sub-concepts / the three sub-themes)。落ちているのはハイフンと単数のほうだけである。** **★★the two minutes exam は、本人が自分の方法を批判した一番大事な文の中で出た。** **★処方は1段 — 数字と名詞が並んで、その後ろにもう1つ名詞が来たら、間にハイフン、真ん中の名詞は単数。ハイフンを入れたくなければ The exam takes two minutes と主役を替える。** **判定は次の夜、数字 + 名詞 + 名詞の並びでの誤りがゼロなら EXECUTED とする。** **☓第112夜、FAILED。3夜連続。**30 or 40 minutes ride / 30 or 40 minutes train ride、10秒差で2回。**★★宿題が3夜落ちたら、悪いのは処方である。**「ハイフンでつないで単数」は判定を2段要求している(ハイフンを入れる、s を落とす)。この宿主に渡せる処方は判定1回まで(第102夜で確定)。**★第112夜から処方を書き直す — 数字と minutes を言ったら、そのあとに名詞を置かない。文を切る。It's 40 minutes on the train。**ハイフンの形は書くときだけ。`,
    },
    {
        issuedNight: 110, issuedDate: '2026-09-13',
        homework: 'agree with の後ろは名詞。文を続けるなら agree that',
        verifiedNight: 111, verifiedDate: '2026-09-14',
        result: 'NO_CHANCE',
        evidence: '第111夜、agree を1回も言っていない。立場は take "Yes" position / Yes, some restrictions on free speech are justified. で宣言し、agree の場面が来なかった',
        note: `**第110夜、agree with の後ろに文が3回来た。** **☓I will agree with AI is beneficial / I strongly agree with AI is helping humans / I strongly agree with that AI is a way。** **★with は前置詞なので、後ろには名詞だけ — agree with you / agree with the idea。文なら with を捨てて that — I agree that AI is beneficial。** **★★3回とも、立場を強く宣言する瞬間に出た。**強く言いたいときほど with が残る。**★同じ夜、I'm convinced that AI will be the answer は正しく言えている。迷ったらこちらに乗り換える。** **判定は次の夜、agree with + 主語 + 動詞 がゼロなら EXECUTED とする。分母(agree を言った回数)も併記する。**`,
    },
    {
        issuedNight: 110, issuedDate: '2026-09-13',
        homework: '数字を名詞の前に置くときは、ハイフンでつないで単数(a 20-year-old / a 25-minute class)',
        verifiedNight: 111, verifiedDate: '2026-09-14',
        result: 'FAILED',
        evidence: '第111夜、my method, ten finger methods(the ten-finger method)/ during the two minutes exam(a two-minute exam)。自分の方法を批判する文の中で出た。★a と数詞の同席はゼロ(three sub-concepts / the three sub-themes)',
        note: `**第109夜の宿題(a と数詞を同席させない)を、形を1つに絞って持ち越す。** **☓第110夜 a three / a 20 years old / this 25 classes。** **★数字で人や物の中身を言うときは、ハイフンでつないで名詞を単数にする — a 20-year-old / a 25-minute class / a three-day trip。このときだけ a が置ける。** **★ハイフンを入れないなら a を消して複数 — three sub-topics / 25 minutes。** **★★この宿主は、講師を褒める場面(a 20 years old)と、自分の習慣を話す場面(this 25 classes)で落とした。自分の生活の数字ほど崩れる。** **判定は次の夜、数字 + 名詞の並びでの誤りがゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 110, issuedDate: '2026-09-13',
        homework: '読み上げの前に、穴の名詞だけ指で押さえて1回黙読する(読み上げのすり替えをゼロにする)',
        verifiedNight: 111, verifiedDate: '2026-09-14',
        result: 'EXECUTED',
        evidence: '第111夜、MONEY の段落3文を読み、名詞のすり替えゼロ(fraudulent advertising / financial stability / online shopping / a gamble / one fake review / a lost pension / victims / legal action)。足したのは and の1語(, reducing → and reducing)。分母3文',
        note: `**第110夜、補足の型7つ版の初めての読み上げで、名詞と動詞がすり替わった。** **☓Banning → Running / councils see → consequently / a newsroom → an interview / serves to reinforce → serves dream for / less → left / work → worse。** **★型そのもの(by putting / which means / For instance / because it lets / turning / Without)は1本も崩れていない。揺れたのは穴に入っている名詞と、型の中の動詞1語だけ。** **★★第109夜は冠詞が口で入れ替わり、今夜は名詞が入れ替わった。書いてある文を読んでも起きる。** **★処方は1段 — 読む前に、そのテーマの穴の名詞だけを指で押さえて黙読する。型の部分は見なくても言える。** **判定は次の夜、読み上げでのすり替えがゼロなら EXECUTED とする。読み上げが無ければ NO_CHANCE。**`,
    },
    {
        issuedNight: 109, issuedDate: '2026-09-12',
        homework: 'many と much を、数えられるかどうかで選ぶ。形容詞の前にはどちらも置かない',
        verifiedNight: 110, verifiedDate: '2026-09-13',
        result: 'EXECUTED',
        evidence: '第110夜、so many ... great teachers(数えられる名詞に many)/ Your words are much appreciated(過去分詞の前に much)。much の誤用ゼロ。分母2',
        note: `**第109夜、much が3枚とも違う席に貼られた(新種)。** **☓so much flaws(可算名詞)/ too much shallow(形容詞)/ so much beneficial(形容詞)。** **★many = 数えられる名詞、much = 数えられない名詞。そして形容詞の前にはどちらも置けない — too shallow / so beneficial / hugely beneficial。** **★★3枚とも、自分の教材を低く値付けする場面で出た。**AIが書いた1行を講師に解体された直後、謙遜しながら外している。**謙遜の速度が、判定を追い越している。** **★処方は2段 — ①名詞なら「数えられるか」を1回だけ考える。②形容詞なら much を置かず、so / too / very / hugely にする。迷ったら a lot of。** **判定は次の夜、much の誤用がゼロなら EXECUTED とする。分母(「たくさん」を言った回数)も併記する。**`,
    },
    {
        issuedNight: 109, issuedDate: '2026-09-12',
        homework: '他動詞の後ろに前置詞を置かない(discuss AI / access it)。dedicate と allocate は to',
        verifiedNight: 110, verifiedDate: '2026-09-13',
        result: 'FAILED',
        evidence: '第110夜、I don\'t subscribe in the Netflix(to)/ push back me(on)/ go over through this(2枚)/ pick up a side(up が余る)/ lets investigative journalists to see(to が余る)。さらに前置詞の後ろに文 — agree with AI is beneficial / agree with AI is helping humans / agree with that AI is a way。discuss / access そのものは撃つ場面が無かった',
        note: `**第109夜、動詞の後ろの前置詞が4枚ずれた(新種)。** **☓discuss with you about AI / everyone can access to / dedicate myself into the test / allocate your time in various stuff。** **★discuss / access(動詞)/ mention / enter / marry は前置詞を取らない。dedicate / commit / devote / allocate は to。** **★★access は本人が自分で名付けた枝の名前である。**名前にした語の使い方が、日本語の「アクセスする」のままになっていた。**★名詞なら to が付く — have access to it。同じ語で、品詞によって前置詞が変わる。** **★処方は1段 — discuss / access が口に来たら、次に前置詞を言わない。** **判定は次の夜、他動詞の後ろの余分な前置詞がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 109, issuedDate: '2026-09-12',
        homework: 'a と数詞を同席させない(a three subtopics → three subtopics)',
        verifiedNight: 110, verifiedDate: '2026-09-13',
        result: 'FAILED',
        evidence: '第110夜、It seems they have a three uh blah blah(a と数詞)/ you\'re not like a 20 years old(数字を形容詞にするのに s とハイフンが無い)/ take this 25 classes(this と複数、25分の授業の意味)',
        note: `**第109夜、a と数詞が2回同席した。第107夜(a five inches / a politicians)から5夜で再発。** **☓Each of the themes has a three subtopics / It's a three sub topics。**同じ説明を2回して、2回とも a を置いた。**★★自分が設計した構造の数え方で転んでいる。** **★a と数詞は同席できない。three subtopics / the three subtopics のどちらか。** **★数詞を形容詞として使うときだけ a が置ける — a three-hour lesson / a five-inch screen。このとき s は落ちる。** **★処方は1段 — 数を言う直前に a が出たら、その a を消す。** **判定は次の夜、a + 数詞がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 108, issuedDate: '2026-09-11',
        homework: 'my / your / 名前\'s の前の a / the を消す',
        verifiedNight: 109, verifiedDate: '2026-09-12',
        result: 'EXECUTED',
        evidence: '第109夜、所有格12回すべてに札なし(my point / my position / my own opinions / my end / my real position / my simple conclusion / my face / your side / your part / your position / your actual opinions / your words)。a / the の同席ゼロ',
        note: `**第108夜、所有格の前に札が4枚貼られた。** **the my screen / the your generation gap / a Trevor Noah's fan / a Trevor's genius。** **★第107夜の a Joe Rogan's から24時間で、同じ形が人名で2枚。この男は好きな人の名前の前に札を貼る。** **★★そして同じ夜に2回、自分で止めている(the my → my / on the my → on my)。止める力はある。30秒しか持たない。** **★所有格は「どれのことか」を既に決めている札で、the と同じ仕事をしている。だから前に何も置けない。** **★処方は1段 — my / your / 's が口に来たら、直前の a / the を消す。ファンの話なら 's を付けずに名前を形容詞にする(a Trevor Noah fan)。** **判定は次の夜、所有格の前の a / the がゼロなら EXECUTED とする。分母(所有格を使った回数)も併記する。**`,
    },
    {
        issuedNight: 108, issuedDate: '2026-09-11',
        homework: '「〜したこと」は what から入れる(That\'s what you said / What I wanted to say is)',
        verifiedNight: 109, verifiedDate: '2026-09-12',
        result: 'EXECUTED',
        evidence: '第109夜、what I mean is in conclusion / what I want to say / what do you want to do today。欠勤ゼロ。分母3',
        note: `**第108夜、新種が1つ出た — 関係詞 what の欠勤。** **Kind of like that's you said / It's about I wanted to say is。** **★同じ夜、this is what you mentioned / what I want to say は出勤している。** **★★言い出し(What I want to say is)では付き、文の後ろに付けるとき(that's ▲ you said)に落ちる。** **★日本語の「こと」は動詞の後ろに付くので、英語で前に置く部品が口に来ない。** **★処方は1段 — 「〜したこと」と言いたくなったら、動詞の前に what。That's what you said / That's what I mean / Here's what happened。** **判定は次の夜、what の欠勤がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 108, issuedDate: '2026-09-11',
        homework: '主語が AI なら動詞に s。because や副詞の後ろに埋めても付ける',
        verifiedNight: 109, verifiedDate: '2026-09-12',
        result: 'EXECUTED',
        evidence: '第109夜、落下ゼロ(conserves / improves / protects / ensures / brings / holds / raises / adds / lowers / invests / develops / builds / widens / fosters)。☓ただし分母のほとんどが用意した文の読み上げで、自然発話の分母は小さい',
        note: `**第108夜、三単現は同じ主語で当たりと外れが並んだ。** **★当たり — the AI analyzes, investigates, corrects, and fact-checks you(1文で4発)/ AI knows you / AI doesn't know your name。** **☓外れ — he usually ask / it's like AI correct my answers / because AI fact-check me。そして逆付け you continues。** **★★外れた3枚は条件が揃っている — 主語と動詞のあいだに副詞が入る、because や it's like の後ろに埋まる。文の頭で主語を言えば付く。** **★この男は毎晩AIの話をするので、主語 AI は毎夜来る。分母は必ずある。** **★処方は1段 — AI と言ったら、次の動詞に s。because の後ろでも同じ。** **判定は次の夜、主語 AI / he / it の三単現落ちがゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 107, issuedDate: '2026-09-10',
        homework: 'sound / look / feel / seem / smell の後ろは形容詞。-ly を付けない',
        verifiedNight: 108, verifiedDate: '2026-09-11',
        result: 'EXECUTED',
        evidence: 'very logistic and yeah, sounds reasonable(sound + 形容詞)。感覚動詞 + -ly はゼロ。分母1',
        note: `**第107夜、新種が1つ出た。-ly の札が隣の語に貼られる。** **my voice sounds very clearly(要らない席に貼った)/ read so meticulous(要る席に貼らなかった)/ a brutally AI(名詞の前に貼った)。** **★3枚とも向きが違う。席の判定そのものが無い、ということである。** **★★だから判定を増やさない。1段だけにする — sound / look / feel / seem / smell の後ろは形容詞。It sounds clear / You look tired / It feels weird。** **★これで3枚のうち1枚が消える。残り2枚(動詞の後ろの -ly / a のあとの -ly)は別の席なので、次の夜に回す。宿題は3つまで。** **★条件を記録しておく。3枚とも、この男が自分の発音と正確さについて語っている最中に出た。主題と症状が一致する夜(第87夜以来)である。** **判定は次の夜、sound / look / feel + -ly がゼロなら EXECUTED とする。分母(感覚動詞を使った回数)も併記する。** **★★第108夜の判定 — EXECUTED。** **very logistic and yeah, sounds reasonable — sound の後ろに形容詞がそのまま座った。感覚動詞 + -ly はゼロ。** **☓分母は1である。sound / look / feel を使う場面そのものが少なかった。** **★同じ夜、-ly の席は他にも正しく出ている(confused eternally / fact-checks you, unfortunately)。24時間前に3方向で外した札が、今夜は1枚も貼り間違えていない。** **★ただし同じ文で logical を logistic と撃っている。席は合い、語が物流になった。**`,
    },
    {
        issuedNight: 107, issuedDate: '2026-09-10',
        homework: 'a little bit のあとに a を置かない。a little bit nervous / a bit of pride',
        verifiedNight: 108, verifiedDate: '2026-09-11',
        result: 'EXECUTED',
        evidence: 'a little bit complicated / a little bit go over / a little bit change / a little bit irritated / a little bit annoy / a little bit off — 6回とも a なし。ただし隣の a bit of が it\'s bit bitterness で a と of ごと落ちた',
        note: `**第107夜、限定詞は12枚で番組の平均の2倍を超えた。** **★そのうち3枚が同じ手口である — a little bit a nervous / a little bit a noise / a little bit a pride。a little bit を言った0.5秒後に、a がもう1枚湧く。** **★★第105夜まで、この男は a little bit の a を落としていた(I'm ▲ little bit clever)。今夜 a little bit は正しく出て、そのあとに a がもう1枚出た。直った席の隣が空く形である。** **★第106夜の immerse yourself in → 今夜 immerse ▲ in と同じで、この男の回収は半分ずつ来る。部品を1つ直すと隣が落ちる。** **★処方は1段 — a little bit と言ったら、次に a を置かない。形容詞ならそのまま(a little bit nervous)、名詞なら of を挟む(a bit of pride)。** **★残り9枚の限定詞は処方を変えない。席は1つ。ただし条件を先に見る — 今夜は1度も読み上げず、開始1分でイヤホンが死んで割れた音で聞いていた。第105夜(雨、4枚)に続く「判定を挟む余裕が無い夜」の2件目である。** **判定は次の夜、a little bit a がゼロなら EXECUTED とする。** **★★第108夜の判定 — EXECUTED。** **a little bit complicated / a little bit go over / a little bit change / a little bit irritated / a little bit annoy / a little bit off。6回とも a を置いていない。** **★a little bit irritated では第105夜の宿題(感情の語は -ed)も同時に動いた。** **☓ただし隣の席が空いた — it's bit bitterness。a bit of bitterness の a と of が2枚とも落ちた。直した席の隣が空く(第107夜の法則)の2件目である。** **☓そして a little bit annoy は -ing が落ちた。a の判定は通り、形容詞の形が落ちた。** **★条件 — 今夜は25分のおよそ4割が読み上げで、自分の言葉の時間は第107夜より短い。分母6は、その短い時間の中の数である。**`,
    },
    {
        issuedNight: 107, issuedDate: '2026-09-10',
        homework: '講師の名前を聞く(第104夜からの持ち越し。4夜連続で未執行)。入室して最初の30秒、機材を確認したあとに置く',
        verifiedNight: 108, verifiedDate: '2026-09-11',
        result: 'NO_CHANCE',
        evidence: '"I don\'t want to tell your name to this AI ... I want him to be confused eternally, so I don\'t spill your name." — 本人は名前を知っていて、AIに渡さないと講師の前で宣言した(頭文字 C まで)。講師はこちらを1回名前で呼んだ',
        note: `**第107夜、4夜連続で実行されなかった。** **★今夜は相手もこちらの名前を1回も呼んでいない。0対0である。第106夜は7対0だった。** **★★条件を書く。今夜は開始1分でイヤホンが死に、最初の3分は機材の切り替えで消えた。「最初の30秒に置く」という第106夜の処方は、機材が死んだ時点で場所ごと消えている。** **★だから処方に1語足す — 機材を確認したあとの最初の30秒。入室、音の確認、名前。この順で固定する。** **★★なお今夜、この男の質問は全部、相手の人生に向いていた — Do you like him? / When do you post your slots? 相手の予約の出し方を聞き、相手の常連であることを申告し、相手の道具に投資を迫った。関係の質問は4本出ている。名前だけが出ていない。** **判定は次の夜、名前が録音に出れば EXECUTED とする。** **★★第108夜の判定 — NO_CHANCE。宿題を取り下げる。** **この男は講師の名前を知っていた。「このAIには教えない。ライバルだから。永遠に混乱していてほしい」。頭文字が C であることまで講師の前で言っている。** **★★★第104夜からこの台帳は「聞いていない」と書いてきた。前提が違った。聞いていないのではなく、渡していない。** **★FAILED にはしない。本人が撃たないと決めている標的なので、執行の機会そのものが存在しない。分母から外す。** **★今夜、講師はこちらを1回名前で呼んだ(文字起こしの表記は Toshi)。1対0。**`,
    },
    {
        issuedNight: 106, issuedDate: '2026-09-09',
        homework: '毎レッスンに1本、持っている語の使用範囲を聞く質問を用意する(意味ではなく、どこまで持ち出していいか)',
        verifiedNight: 107, verifiedDate: '2026-09-10',
        result: 'FAILED',
        evidence: '使用範囲を聞く質問はゼロ。今夜の質問は Do you like him? / When do you post your slots? で、全部相手の人生に向いている',
        note: `**第106夜、この男の質問の種類が変わった。** **★106夜のあいだ、講師にしてきた質問はほぼ全部「これは何という意味か」「英語で何と言うか」だった。語を持っていない側の質問である。** **★★今夜は違う。「with regard to は書くときだけの言い方か、喋りでも使えるのか」。語は持っていて、その語をどこまで持ち出していいかを聞いている。** **★★★所有者の質問である。しかも1本で終わらせず、in the context of についても同じことを聞いた。** **★これは在庫を増やす行為ではない。持っている在庫の使用範囲を確定させる行為で、この番組が106夜やってこなかったほうの作業である。** **★処方は1段 — 毎レッスンに1本だけ、この形の質問を用意して入る。Does that sound too formal? / Would you actually say that? / Is that only for writing?** **判定は次の夜、使用範囲を聞く質問が1本でも出れば EXECUTED とする。** **★★第107夜の判定 — FAILED。** **使用範囲を聞く質問は1本も出ていない。今夜この男が講師にした質問は Do you like him? と When do you post your slots? で、どちらも英語の質問ではない。** **★ただし今夜、本人は講師に正反対の方針を宣言している — 授業中は直さなくていい、AIがやる。** **★★register を聞くことと訂正を頼むことは別物だが、本人の頭の中では同じ箱に入っている可能性がある。この宿題は「訂正」ではなく「検品」であることを、次の夜までに本人が分けて持っている必要がある。** **★分母 — 今夜の会話に、持っている語の使用範囲を確認する場面(with regard to のような答案語を使った場面)は無かった。撃つ場面が来なかったとも言える。それでも用意して入る、が宿題だったので FAILED とする。**`,
    },
    {
        issuedNight: 106, issuedDate: '2026-09-09',
        homework: '数詞を形容詞にするときは s を落とす。a ten-finger trick / a three-day trip / a five-year plan',
        verifiedNight: 107, verifiedDate: '2026-09-10',
        result: 'NO_CHANCE',
        evidence: '数詞を形容詞の位置に置いた場面はゼロ。ten fingers は名詞として1回だけ。ただし隣の席で a five inches(a+数詞+複数)が出た',
        note: `**第106夜、限定詞は3枚で判定基準(2枚以下)を超えた。**a past experiences / like a ten fingers trick / there is a highly percentage。 **★ただし第105夜の4種類(a+複数 / a+no / 限定詞二重 / a+-ing)からは型が狭まっている。今夜は全部「a のあとに単数形以外が来た」の1種類である。** **★★だから処方は変えない。1枚だけ足す — 数詞を形容詞の位置に置いたら s を落とす。** **a ten-finger trick / a three-day trip / a five-year plan / a two-hour meeting。s が付くのは名詞として使うときだけ(ten fingers)。** **★これは判定1回で済む。数字が名詞の前に来たら s を消す、それだけである。** **判定は次の夜、数詞+複数形の同席がゼロなら EXECUTED とする。** **★第107夜の判定 — NO_CHANCE。** **数詞を形容詞の位置に置いた場面が来ていない。ten fingers と言ったのは1回で、名詞としてである。** **☓ただし隣の席で a five inches が出た。これは a + 数詞 + 複数で、宿題の対象(数詞を形容詞にする)ではなく、第105夜からの「a のあとは単数形1つ」の対象である。** **★そして a + 副詞が a brutally AI で戻った。第106夜の a highly percentage とまったく同じ形で、24時間後である。** **★宿題そのものは撃つ場面が無かった。隣の席は落ちた。分母を隠さない。**`,
    },
    {
        issuedNight: 106, issuedDate: '2026-09-09',
        homework: '講師の名前を聞く(第104夜からの持ち越し。3夜連続で未執行)',
        verifiedNight: 107, verifiedDate: '2026-09-10',
        result: 'FAILED',
        evidence: '4夜連続で聞いていない。今夜は相手もこちらの名前を呼んでいない。0対0',
        note: `**呼びかけの数が、106夜ずっと片側に寄っている。** **★今夜、相手はこちらを7回名前で呼んだ。there Taishi が4回、dear Taishi が2回、Taishi-san が1回。こちらは0回である。** **★★これは礼儀の話ではなく、関係の形の話である。教わる側は相手を役割で呼び、教える側は名前で呼ぶ。106夜、その形が一度も崩れていない。** **★★★今夜それが目立つのは、相手が英語の話をしなかった夜だからである。**「あなたが作ったものだ」と言った相手を、こちらは役割でしか呼べていない。 **★there + 名前 は南アフリカ英語の呼びかけで、この癖だけで話者はほぼ同定できる。同定はできて、名前は知らない。** **判定は次の夜、名前が録音に出れば EXECUTED とする。** **★★第107夜の判定 — FAILED。4夜連続。** **今夜は相手もこちらの名前を1回も呼んでいない。第106夜の7対0が、今夜は0対0になった。** **★条件 — 開始1分でイヤホンが死に、最初の3分は機材の切り替えで消えた。「最初の30秒に置く」という処方は、機材が死んだ時点で場所ごと消えている。** **★次の処方は場所を1つずらす — 機材を確認したあとの最初の30秒。** **★なお今夜、この男は相手の予約の出し方を聞き、相手の常連であることを申告し、相手の道具に投資を迫っている。関係の質問は4本出た。名前だけが出ていない。**`,
    },
    {
        issuedNight: 105, issuedDate: '2026-09-08',
        homework: 'a と言ったら、次に来るのは単数形の名詞ひとつだけ。複数形・no・-ing・もうひとつの限定詞は同じ席に座れない',
        verifiedNight: 106, verifiedDate: '2026-09-09',
        result: 'FAILED',
        evidence: '3枚出た。a past experiences / like a ten fingers trick / there is a highly percentage。判定基準は2枚以下',
        note: `**第105夜、限定詞が4枚。しかも4枚とも手口が違う。** **★第102夜に5枚、第103夜に2枚、第104夜にゼロ。処方は効いていた。それが第105夜にまとめて戻った。** **★★条件を見た。あの夜この男は事務所を追い出され、傘も無く、立入禁止の庇の下でしゃがんだまま喋っている。判定を1回挟む余裕が物理的に無い。** **★★第106夜、3枚。基準を超えたので FAILED とする。** **☓だが中身は変わっている — 第105夜は4種類の手口だったが、今夜は3枚とも「a のあとに単数形以外が来た」の1種類だけである。** **★a + no も、限定詞の二重も、a + -ing も出ていない。処方(席は1つ)は届いていて、届いていないのは「単数形とは何か」の判定のほうである。** **★★だから次の宿題を型ごとに増やさず、1枚だけ足す — 数詞を形容詞にするときは s を落とす。a ten-finger trick。** **★件数は 5 → 2 → 0 → 4 → 3。処方を変えるより、条件(座れているか、濡れていないか)のほうが効いている可能性が残っている。**`,
    },
    {
        issuedNight: 105, issuedDate: '2026-09-08',
        homework: '感情の語は -ed だけを在庫に置く。-ing 側は物にしか付けないと決めて、判定そのものを外す',
        verifiedNight: 106, verifiedDate: '2026-09-09',
        result: 'EXECUTED',
        evidence: '人について -ing を使った感情の語はゼロ。かわりに much appreciated / much obliged と -ed 側を2枚出した',
        note: `**第105夜、I'm not exciting at all。方向の逆転が3夜連続になった。**第103夜 feel more appreciated by、第104夜 it's very happy for me、第105夜 I'm not exciting。 **★これまでの処方は全部「-ed か -ing かをその場で判定する」形だった。3夜連続で落ちている以上、判定は間に合っていない。だから処方を判定から外した — 感情の語は -ed 側だけを在庫に置く。** **★★第106夜、執行された。人について -ing を使った感情の語はゼロである。** **★しかも積極的に -ed 側が2枚出た(much appreciated / much obliged)。どちらも締めの謝辞で、迷う場面ですらない位置に置かれている。** **★これで「判定を外す処方はこの宿主に効く」という見立てが2件目になった(1件目は第99夜の母音の前は the に逃がす、第104夜に執行)。** **☓ただし持ち場は移った。今夜 I'm so welcome が出ている — 歓迎する側とされる側の入れ替えで、-ed / -ing ではなく主語そのものの逆転である。** **★第1法則(方向の逆転)は消えていない。判定の対象が語尾から主語に移っただけである。次の処方はそちらに向ける。**`,
    },
    {
        issuedNight: 105, issuedDate: '2026-09-08',
        homework: '講師の名前を聞く(第104夜からの持ち越し。2夜連続で未執行)',
        verifiedNight: 106, verifiedDate: '2026-09-09',
        result: 'FAILED',
        evidence: '3夜連続で聞いていない。相手は今夜、there Taishi ×4 / dear Taishi ×2 / Taishi-san ×1 の計7回こちらの名前を呼んでいる',
        note: `**105夜、この番組はまだ相手を名前で呼んでいない。第104夜の nextQuest に書き、実行されず、第105夜にも書いた。** **★★第106夜、3夜連続で実行されなかった。** **☓しかも今夜の相手は、この男の自己卑下を正面から止め、その場で態度を変えさせている。第104夜に語彙を入れた講師とは、別の種類の仕事をした。** **★そこまでしてもらって、名前を知らないまま3夜が過ぎた。** **★★これは英語の問題ではないので、処方も英語の話にしない — 入室して最初の30秒に置く、と場所で決める。** **中盤に回すと本題に押し出される。3夜ともそうなっている。** **判定は次の夜、名前が録音に出れば EXECUTED とする。**`,
    },
    {
        issuedNight: 104, issuedDate: '2026-09-07',
        homework: '限定詞を言ったら、その場で名詞の数を決める。a だけでなく this / that / another / each も単数',
        verifiedNight: 105, verifiedDate: '2026-09-08',
        result: 'FAILED',
        evidence: '4枚出た。a cones / a no roof in the park / my one of the weak point / a not speaking。★しかも4枚とも型が違う(a+複数 / a+no / 限定詞2つ / a+-ing)。判定基準は2枚以下',
        note: `**第102夜、a + 複数形が5枚。同一型で1レッスン5枚は番組の最多だった。第103夜に2枚、第104夜はゼロ枚である。処方(a と s は同席できない)は効いている。** **★☓だが今夜、同じ断層が隣の語で2枚出た — this sticking phrases / another brilliant ideas。** **★これは新種ではない。持ち場が移っただけである。** **★★処方そのものは変えない。変えるのは適用範囲だけ — a / this / that / another / each を言った瞬間に、次の名詞は単数だと決める。these / those / other / many なら複数。** **限定詞は数の宣言であって、飾りではない。** **★1段の判定で済む形を維持する。第102夜以降、1段の処方は3つとも動いており、2段の処方は1つも動いていない。** **判定は次の夜、限定詞と複数の同席が1枚以下なら EXECUTED とする。**`,
    },
    {
        issuedNight: 104, issuedDate: '2026-09-07',
        homework: '短い形容詞に most を足さない。best / nicest / easiest / biggest / worst の5語だけ形で持つ',
        verifiedNight: 105, verifiedDate: '2026-09-08',
        result: 'NO_CHANCE',
        evidence: '最上級を作る場面が一度も来ていない。the most reliable person は3音節語なので most が正解であり、判定材料にならない',
        note: `**第104夜、one of the most nice teachers。この記録では初出の新種である。** **★短い形容詞は -est、長い形容詞は most。境目は2音節で、語によって割れる(happiest ○ / most careful ○)。つまり規則を覚えても判定が2段になる — まず音節を数え、次に -est か most かを決める。** **★★この宿主に2段の処方は通らない、というのが第102夜以降の結論である。だから規則では出さない。** **★処方 — the best / the nicest / the easiest / the biggest / the worst の5語だけ、形のまま暗記する。この5語で日常の最上級はほぼ尽きる。それ以外は most に逃がしてよい(most important / most difficult は正しい)。** **判定を1回に減らすのではなく、よく使う5語だけ判定をゼロにする、という形の処方である。** **判定は次の夜、短い形容詞に most を足した行がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 104, issuedDate: '2026-09-07',
        homework: '逆側の動詞を実戦で撃つ。yield / invest / protect / enrich / narrow / grant / reinforce / sustain のうち何本出るか',
        verifiedNight: 105, verifiedDate: '2026-09-08',
        result: 'NO_CHANCE',
        evidence: 'ディベートをやっていない。★ただし invest が指示されていない雑談で1本出た(commuting time is my ... I invest)。設計どおりの使い方で、時間を食うの反対として投じるを当てている',
        note: `**第104夜、この男は10本の指それぞれに逆側の動詞をもう1語ずつ足して持ってきた。** **impose/yield、consume/invest、jeopardize/protect、erode/enrich、foster/discourage、widen/narrow、curb/grant、undermine/reinforce、safeguard/weaken、endanger/sustain。** **★これは第103夜の検死が出した処方(主語を現状にする)の執行ではない。同じ問題への、本人が作った別解である。** **★処方は主語を替えろと言い、本人は動詞を替えた。問題の見立て(マイナス語ばかりで賛成側に乗らない)は完全に一致している。** **★★だが紙の上で立っていることは、撃てることを意味しない。第103夜、紙の上で立っていた右手5本のうち、実際に口から出たのは curb 1本だけだった。** **★次の夜、同じ設問でディベートを頼み、逆側の8本のうち何本が口から出るかだけを数える。** **★処方は2つ並んだ。どちらが実戦で速いかは、実戦でしか割れない。** **判定は次の夜、逆側の動詞が3本以上撃てたら EXECUTED とする。**`,
    },
    {
        issuedNight: 103, issuedDate: '2026-09-06',
        homework: '危ない語は直さずに替える。readily → easily / overlook → go over / curve → 縁石で覚える',
        verifiedNight: 104, verifiedDate: '2026-09-07',
        result: 'EXECUTED',
        evidence: '1音の取り違えが5件から2件へ(body→both / hand→word)。2件とも本人が英語のまま自己訂正した。★ただし名指しした3語(readily / overlook / curve)は一度も出番が来ていない。分母が小さい',
        note: `**第103夜、1音の狙撃失敗が5件。番組の最多である。** **training(raining)/ curve(curb、3回)/ variable(valuable)/ rarely(readily)/ thunder(lightning)。** **★そして5件のうち3件は、意味が正反対か、まったく別の物に着地した。rarely は「容易に」が「めったにない」に、overlook は「全体を見る」が「見落とす」に、feel appreciated by は「ありがたく思う」が「感謝される」に。** **★この持病の記録は長い。work / walk、kill / cure、live / leave、read between the lies(第95夜)、clash / crush(第101夜)、sheet / seat(第102夜)。3夜連続で出ている。** **★★処方の方針をここで変える。語ごとに直すのをやめる。逃がす。** **readily → easily。overlook → go over。sheet → notes。危ない語を1つずつ、安全な語に置き換えていく。** **判定を挟む処方は第102夜以降うまくいっているが、この持病だけは判定そのものが間に合わない。発話の0.5秒前に「隣の語じゃないか」を疑う余裕は無い。** **★1級の単語帳で仕入れた語ほど危ない。定義は合っているのに、隣の語と席が近く、使う場面を見ていないからである。語彙を増やしてもこの数は減らない。** **判定は次の夜、1音の取り違えが2件以下なら EXECUTED とする。**`,
    },
    {
        issuedNight: 103, issuedDate: '2026-09-06',
        homework: 'マイナスの動詞を賛成側で使うときは、主語を「現状」か「やらないこと」にする',
        verifiedNight: 104, verifiedDate: '2026-09-07',
        result: 'NO_CHANCE',
        evidence: '第104夜はディベートをやっていない。右手を走らせる場面が来ていない。★ただし本人が、同じ問題への別解(10本の指に逆側の動詞を1語ずつ足す)を実装して持ち込んだ',
        note: `**第103夜、右手5本のうち撃てた動詞は1本だけだった。** **curb だけが成立し(Living in one country curbs the freedom you think you already have)、undermine は build trust に逃げ、endanger は endangered species と名詞にして逃げ、widen は撃つ前に講師へ振り、safeguard は「very hard to use safeguards」と本人が口に出して放棄した。** **★第102夜の左手は5本中4本が成立している。左手も4本がマイナス語だが、主語を「働きすぎ」や「行かないこと」に置けたので乗った。** **★右手のマイナス語は主語が社会の側になるので、賛成の論に乗せる先が無い。** **★★処方は1行 — 主語を「現状」か「やらないこと」にする。** **The status quo widens the gap. / Staying home undermines trust. / A generation that never leaves endangers the cooperation the planet depends on.** **現状が害を出していると言えば、その解決として賛成案が自動的に立つ。賛成の理由=現状の害、という構図である。** **★これは英作文にもそのまま効く。この宿主は賛成側しか書かないので、8本のマイナス動詞が全部死んでいる。主語を現状にするだけで、8本とも生き返る。** **判定は次の夜、同じ設問で右手を走らせて、成立した動詞が3本以上なら EXECUTED とする。**`,
    },
    {
        issuedNight: 103, issuedDate: '2026-09-06',
        homework: '母音の前は判定せず the に逃がす(第99夜の処方を再掲。2夜連続で出た)',
        verifiedNight: 104, verifiedDate: '2026-09-07',
        result: 'EXECUTED',
        evidence: 'a + 母音はゼロ枚。an overkill / an Eiken exam の2回とも母音の前で an が正しく出た。★ただし処方どおりではない — the に逃げず、an を正しく選んでいる',
        note: `**第103夜、a easy association。第102夜の a hourly rate に続いて2夜連続である。** **★この持病は第95夜から第99夜まで4夜連続で8枚出て、第100・101夜は出ず、第102夜に再発、今夜も再発した。** **★第101夜の判定で「処方が効いたのか、撃つ場面が来ていなかっただけか、この1夜では割れない」と保留にした。2夜連続で出た以上、保留は終わりで、判定は「直っていない」で確定する。** **★処方は第99夜のものをそのまま置き直す — 母音かどうかを判定しない。the に逃がすか、冠詞の要らない形にする。** **the easy association / It's easy to remember.** **この宿主は the なら一度も崩していない。** **★そして今夜、この宿題は他の3つと性質が違うことに注意する。他の3つ(a+複数 / 二重否定 / -wise の前)は判定1回の処方で3つとも動いた。母音の an だけは、判定1回でも動いていない。** **判定そのものを外す方向が正しい、という第99夜の結論を維持する。** **判定は次の夜、母音の前に a を置いた行がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 102, issuedDate: '2026-09-05',
        homework: 'a と言ったら、次の名詞に s を付けない。s を付けたくなったら a を消す',
        verifiedNight: 103, verifiedDate: '2026-09-06',
        result: 'EXECUTED',
        evidence: '5枚から2枚へ半減した。残ったのは "there is a totally different worlds" と "a dozens of cards" の2枚だけ',
        note: `**第102夜、a + 複数形が5枚。同一型で1レッスン5枚は番組の最多記録である。** **a five fingers / a three days / a two consecutive work days / an extra hours / it's a one days。** **★an まで出た。an は母音の前の a なので、複数形に付く可能性はさらに低い。それでも出た。** **★第101夜の宿題「指示語を置いたら名詞の数を先に決める」は執行されなかった。判定を2段に分けたからである(まず指示語を認識し、次に数を決める)。** **この宿主に渡せる処方は判定1回まで、という結論が第102夜で出ている(執行された数字の宿題は1回、落ちた2つは2段だった)。** **★だから今回は1段にする — a と s は同席できない。どちらか片方。物理の話にする。** **数量を形容詞にしたいときだけ、ハイフンで単数に戻す(a three-day weekend / a four-day week)。選択肢はこの2つしか無い。** **判定は次の夜、a + 複数形が2枚以下なら EXECUTED とする。**`,
    },
    {
        issuedNight: 102, issuedDate: '2026-09-05',
        homework: 'nothing / no / never を言いかけたら、その文に既に not があるか1回だけ数える。あれば nothing を any に替える',
        verifiedNight: 103, verifiedDate: '2026-09-06',
        result: 'EXECUTED',
        evidence: '二重否定はゼロ。しかも "there is a no way you you don\'t use AI" という、相殺されない正しい用法が1回出た(崩れたのは a のほうだけ)',
        note: `**第102夜、二重否定が2枚。前夜の1枚から倍になった。** **there is no nothing to for you to do / I don't think there is nothing as waste of time thing。** **★2枚目は主張が完全に反転している。言いたかったのは「時間の無駄なんて存在しない」で、口から出たのは「存在しないとは思わない」= 存在する、である。** **★第98夜の宿題、第99夜 AVOIDED、第100夜は出ず、第101夜に3夜ぶりに再発、そして今夜2枚。** **撃たなかった夜は「直っていた」のではなく「場面が来ていなかった」だけだと、これで完全に確定する。** **★処方を1段にする — nothing / no / never を言いかけたら、その文に既に not があるか1回だけ数える。あれば any に替える。** **not ... anything / not ... any such thing as ~。この形なら、否定は物理的に1枚しか置けない。** **判定は次の夜、二重否定がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 102, issuedDate: '2026-09-05',
        homework: '-wise の前に何も置かない。文頭に置いてコンマで切る',
        verifiedNight: 103, verifiedDate: '2026-09-06',
        result: 'EXECUTED',
        evidence: '"you don\'t know the other country\'s situation environmental wise" / "some countries environmentally wise is very bad" — 冠詞も前置詞も1つも付いていない',
        note: `**第102夜、-wise が1レッスンで6発。7夜連続で生存。番組記録である。** **money wise / time wise / body wise / happiness wise / education wise。5本の指すべてに付けた。** **★これはこの番組でいちばん成功した「渡し方」の実例で、第93夜に講師が sound-wise を1回だけ言ってから、誰も置き直していないのに7夜生きている。** **★だから今回の宿題は、直すというより完成させるものである。** **☓2発の前に余計な札が貼られた — from money wise / the body wise。第101夜も the time wise で同じことをしている。2夜連続。** **★-wise は名詞に付いた時点で完成しているので、冠詞も前置詞も要らない。文頭に置いて、コンマで切る。** **Time-wise, that's going to be tight.** **判定は次の夜、-wise の前に冠詞か前置詞が付いた行がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 101, issuedDate: '2026-09-04',
        homework: 'am / is / are を口に出した瞬間、次の語の品詞を1つだけ確かめる。動詞なら -ing を付ける',
        verifiedNight: 102, verifiedDate: '2026-09-05',
        result: 'FAILED',
        evidence: '"when I faced with the native speakers" / "I\'m kind of like improvise" / "you\'re happily dedicate yourself" / "I\'m really count on you" / "that\'s I think is very good" — 1レッスンで5枚',
        note: `**第101夜、be動詞の持ち場が1レッスンで5回空いた。今夜の主犯はここである。** **if you are struggle / young people are try to establish / that's contribute to / I'm maybe stick to / since you are willingly。** **★be の後ろの席は1つで、座れるのは形容詞と名詞だけである。動詞の原形も副詞も座れない。それでもこの宿主は、今夜、動詞を4人と副詞を1人、その席に案内した。** **★第100夜は名詞を案内している(I'm not hurry)。第99夜は6回、持ち場そのものが空いた。3夜連続である。** **★処方は判定を1回だけにする — am / is / are を言った瞬間、次の語の品詞を1つだけ確かめる。動詞なら -ing。それだけで今夜の5枚が全部消える。** **判定は次の夜、be動詞の後ろに動詞か副詞が座った行がゼロなら EXECUTED とする。**`,
    },
    {
        issuedNight: 101, issuedDate: '2026-09-04',
        homework: '「私の」は my own の2語で置く。指示語を置いたら、名詞の数を先に決める',
        verifiedNight: 102, verifiedDate: '2026-09-05',
        result: 'FAILED',
        evidence: '"I showed you the my website" / "this kind of my preparation" / "a five fingers" / "a three days" / "a two consecutive work days" / "an extra hours" / "it\'s a one days" — my own は一度も出ていない',
        note: `**第101夜、限定詞の事故が1レッスンで5枚。番組の最多記録である。** **it's totally new my thing / this finger methods / that technologies / a perspectives difference / like a one month left。** **★第98夜に発見された新型は「1つの名詞に札を2枚貼る」型だった。第99夜3枚、第100夜1枚。** **今夜の5枚は形が違う — 全部「札と数が合わない」型である。this + 複数形、that + 複数形、a + 複数形、a + one。** **★同じ隊員が、4夜目に壊し方を変えた。処方も変える。** **①「私の」は my own の2語で置く。own が入ると、他の札が入る隙間が物理的に無くなる。** **②指示語を置いた時点で、名詞の数が決まる。this なら単数、these なら複数。** **③数が決まらない名詞(perspective / time / information)は、複数にしないで in ~ / of ~ に逃がす。a difference in perspective。** **判定は次の夜、限定詞と数が衝突した行が2枚以下なら EXECUTED とする。**`,
    },
    {
        issuedNight: 101, issuedDate: '2026-09-04',
        homework: '数字は、言う前に1秒置く',
        verifiedNight: 102, verifiedDate: '2026-09-05',
        result: 'EXECUTED',
        evidence: '"have to say two minutes, like three reasons about Eiken topic" — 一発で2分。第101夜のように言い直していない',
        note: `**これは英語の宿題ではない。第100夜の「覚えていないものを足すな」の後継である。** **第100夜、この宿主はゴールド免許を10年と言い(正しくは5年)、存在しない赤い免許を足した。** **第101夜、外したのは自分が1ヶ月後に受ける試験の持ち時間である。** **開始12分「Eiken, three minutes」、25分目「two minutes monologue」。正しいのは2分。** **★同じ25分の中で数字が1分縮み、誰も指摘していない。そして講師は、最初の申告を信じて3分で組んだ。本番より1分長い練習である。** **★重要なのはここで、この宿主は正しい数字を持っていた。知らないのではない。口が先に出る。** **★だから処方から判定を外す。「思い出せ」ではなく「1秒置く」。1秒あれば正しい数字が出ることは、今夜、同じレッスンの中で証明されている。** **判定は次の夜、数字を含む発言に事実誤認がゼロなら EXECUTED とする。数字を一度も言わなかった場合は NO_CHANCE。**`,
    },
    {
        issuedNight: 100, issuedDate: '2026-09-03',
        homework: '「急いでいる」は形容詞で言わない。in a hurry / in a rush の2つだけ持って、hurry を単独で使わない',
        verifiedNight: 101, verifiedDate: '2026-09-04',
        result: 'EXECUTED',
        evidence: '"I\'m a little bit in a rush, in a hurry, because I have to prep for the exam" — 開始5分、誰にも直されていない状態で、in も a も付いた形が2つとも出た',
        note: '**第100夜、1レッスンで3回落ちた — I\'m not hurry / I don\'t need to be hurry / if you hurry。** **そして2回目と3回目のあいだに、講師が I\'m never in a rush と正解を置いている。宿主は me neither で正しく受けた。** **間違い → 正解の提示 → 受領 → 同じ間違い。番組で初めての完全な1周である。** **★これは在庫の問題ではない。受け取ったのに、自分の文に入らない。入口の問題である。** **原因は日本語で、「急いでいる」が形容詞の顔をしているから I\'m busy / I\'m tired と同じ棚に入る。** **処方は1行 — 「急いで」と言いたくなったら、in を1枚先に置く。** **★第101夜、執行された。** **開始5分、この宿主の口から I\'m a little bit in a rush, in a hurry が出た。in が付き、a が付き、しかも2つとも出している。誰にも直されていない。** **★101夜、この番組が渡し続けた処方が、初めて翌日に届いた記録である。** **★そして、この1件が台帳全体の見立てを変える。** **これまでの判定は EXECUTED が極端に少なく、FAILED と AVOIDED で埋まっていた。番組は「渡した型は翌日に消える」を前提に書いてきた。** **今夜の3件(hurry / everybody knows / what are your thoughts)は、その前提のほうを疑わせる。** **★差がどこにあるかは、まだ1件ぶんしか見えていない — 第100夜、この宿主は正解を置かれて me neither と相槌を打ち、20分後にまた落とした。今夜の would は、相槌を打たずに聞いて、2分後に使えた。** **仮説として PRECURSORS 側に登録する。** **★第102夜、5枚。減っていない。** **第99夜6枚、第100夜3枚、第101夜4枚、そして今夜5枚。4夜連続でこの持ち場は空いている。** **★とくに I\'m really count on you が重い。第101夜、この宿主は I count on you と正しく言っており、検死は keep を立てて登録した。24時間後、be を1枚足して崩した。** **★処方そのものは変えない — am / is / are を言った瞬間、次の語が動詞かどうかだけ見る。動詞なら -ing。** **変えるのは頻度のほうで、この判定は1レッスンに5回必要になる。1回で済む処方ではない。** **次の夜、3枚以下なら改善とみなす。** **★第102夜、大敗である。** **限定詞の渋滞が2枚(the my website / this kind of my preparation)、そして a + 複数形が5枚(a five fingers / a three days / a two consecutive work days / an extra hours / it\'s a one days)。** **★a + 複数形の5枚は、同一型で1レッスンとしては番組の最多記録である。** **my own は25分のあいだ、一度も出ていない。** **★失敗の原因は処方の作り方にある。「指示語を置いたら名詞の数を先に決める」は、判定を2段に分けている(まず指示語を認識し、次に数を決める)。この宿主は第99夜の時点で「判定を挟む余裕が無い」と確定している。** **★だから今夜から1段にする — a と言ったら、次の名詞に s を付けない。s を付けたくなったら a を消す。** **判定は1回。どちらか片方しか置けない、という物理の話にする。** **★第102夜、執行された。** **「ネイティブを前にして、2分、理由3つ」と、一発で正しい数字が出た。第101夜のように、途中で3分と言って25分後に2分と言い直す、という形になっていない。** **★これで前夜の宿題の執行は2夜連続になる(第101夜の hurry、今夜の数字)。** **★そして今夜、この処方が効いた理由が1つ見える。「1秒置く」は判定を1回しか要求していない。** **同じ夜に落ちた2つの宿題(be動詞の品詞、限定詞と数)は、どちらも判定を2段に分けていた。** **★この宿主に渡せる処方は、判定1回までである。2段にした時点で執行されない。これは今後の宿題の作り方そのものに効く。** **★第103夜、5枚から2枚に減った。EXECUTED とする。** **残ったのは there is a totally different worlds と a dozens of cards の2枚である。** **★そして重要なのは、なぜ効いたかのほうだ。第101夜の処方(指示語を置いたら名詞の数を先に決める)は判定を2段に分けていて、執行されなかった。第102夜は1段にした — a と s は同席できない、どちらか片方。物理の話にした。** **★同じ夜に出した3つの宿題が、3つとも1段の処方で、3つとも動いている。** **★この宿主に渡せる処方は判定1回まで、という見立ては、これで確定でいい。以後の宿題は全部1段で書く。** **★第103夜、二重否定はゼロである。EXECUTED。** **しかもそれ以上のことが起きた — there\'s no way you don\'t use AI という、英語で唯一相殺されない二重否定の形が、正しく出た。** **no way + 否定は「〜しないなんてありえない」で、強調として働く数少ない例外である。** **★第102夜、この宿主は二重否定を2枚出し、うち1枚は主張が完全に反転した。24時間後、ゼロ、しかも例外の形を当てた。** **☓ただし同じ文で a no way の a が余計に立っている。これは限定詞の問題であって、否定の問題ではない。** **★判定は EXECUTED のまま。次の夜も出なければ、この持病は棚から下ろす。** **★第103夜、-wise の前には冠詞も前置詞も1つも付かなかった。EXECUTED。** **第101夜は the time wise、第102夜は from money wise と the body wise。2夜続けて前に札を貼っていた。** **☓ただし新しい崩れ方が1つ出た — environmentally wise。-wise は名詞に付ける接尾辞なので、environment-wise が正しい。形容詞形にすると二重に修飾していることになる。** **★宿題の中身(前に何も置かない)は執行された。次の宿題はこの新しい崩れのほうに移す — -wise の前は名詞。cost-wise / time-wise / environment-wise / health-wise。** **★なお -wise は今夜も出ている。第93夜から8夜連続で、この番組でいちばん長く生き残っている型である。**',
    },
    {
        issuedNight: 100, issuedDate: '2026-09-03',
        homework: '冠詞で迷ったら複数形にする(判定を挟まない方式の2枚目)',
        verifiedNight: 101, verifiedDate: '2026-09-04',
        result: 'AVOIDED',
        evidence: '#14 は8枚から3枚に減った(a very good topic / a huge divide / the internet)。ただしこの3枚は、どれも複数形に逃がせるものではない。一般論はすべて複数形で言えている(older people / young people / native speakers / these topics)',
        note: '**第100夜の #14 は8枚。ただし内訳が前夜までと違う。** **第99夜は母音の前・前置詞句・形容詞と配属先が散っていたが、第100夜の8枚は全部ただの単数可算名詞である。** **★そのうち3枚(a wide street / a residential area / a big car)は、複数形にすれば札そのものが要らなかった。** **判定を挟む余裕が無いことは第99夜で確定している。だから第99夜は「the に逃がす」を出した。今夜はもう1手足す — 一般論は複数形で言う。** **wide roads are rare here / big cars don\'t fit here。札の要らない文を増やすほうが、札を正しく置く訓練より速い。** **★第101夜、冠詞事故は8枚から3枚に落ちた。ただし処方が効いた証拠は無い。** **今夜の3枚は a very good topic / a huge divide / the internet で、どれも複数形に逃がせるものではない。** **一方、一般論を言う場面は何度も来ており、そこは全部正しく複数形で出ている — older people tend to / young people are / native speakers struggle / these topics are so broad。** **★だがこの宿主は、処方を出す前から集合名詞を複数形で言えていた。だから今夜の複数形は、処方の成果とは断定できない。** **★そして分母をもう1つ出す。今夜は25分のうち3分が講師の独演で、宿主が単数可算名詞を言う場面そのものが少ない。** **撃たれず、壊れず、証拠も無い。判定は AVOIDED とする。**',
    },
    {
        issuedNight: 100, issuedDate: '2026-09-03',
        homework: '自国の制度を説明するとき、覚えていないものを足さない',
        verifiedNight: 101, verifiedDate: '2026-09-04',
        result: 'FAILED',
        evidence: '"So, Eiken, three minutes, three answers, three reasons"(開始12分)→ "maybe you have to, first time, two minutes monologue"(25分目)。英検1級の二次のスピーチは2分。講師は3分の申告を信じて3分で組んだ',
        note: '**これは英語の宿題ではない。第100夜、宿主は25分のあいだに日本の制度を2箇所間違えて外国人に教えた。** **①ゴールド免許を「10年無事故」と説明した(正しくは5年)。②免許の色に存在しない「赤」を足した(グリーン・ブルー・ゴールドの3色しかない)。** **本人は I\'m not sure と言いながら喋っている。確信は無い。だが講師には「日本には赤い免許がある」として届いた。** **さらに同じ夜、記事の内容についても「この記事は正しくない」と言い、実際は記事のほうが正しかった。** **★外国人にとって、あなたの説明がその国の唯一の情報源になる。** **処方 — 3色しか出てこないなら3色で止める。数字に自信が無いなら数字を言わない。** **判定は次の夜、自国について語る場面が来たときに行う。** **★第101夜、外した。しかも今度は他人の国の制度ではない。自分が1ヶ月後に受ける試験である。** **開始12分「Eiken, three minutes」。25分目「two minutes monologue」。英検1級の二次のスピーチは2分で、後から言ったほうが正しい。** **★同じ25分の中で、自分の試験の尺が1分縮んだ。誰も指摘していない。** **★つまりこの宿主は、正しい数字を持っていた。持っていたのに、最初に別の数字を口から出した。第100夜のゴールド免許(10年と言った。正しくは5年)とまったく同じ形である。知らないのではない。口が先に出る。** **★そして今夜は実害が出ている。講師はこの申告を信じて、3分で組んだ。本番より1分長い練習である。数字が1つずれると、練習の設計ごとずれる。** **★処方を変える。「覚えていないものを足すな」では止まらない。判定を挟まない形にする — 数字は、言う前に1秒置く。1秒あればこの宿主は正しい数字を出せることが、今夜、同じレッスンの中で証明されている。**',
    },
    {
        issuedNight: 83, issuedDate: '2026-08-14',
        homework: '別れ際に enjoy へ it を付けて締める(I really enjoyed it.)',
        verifiedNight: 85, verifiedDate: '2026-08-15',
        result: 'FAILED',
        evidence: '"Yeah, this is, um, but I\'m enjoying, you know."',
        note: '宿題を出した翌日、同じ動詞で同じ場所が空いた。24時間で不履行。',
    },
    {
        issuedNight: 83, issuedDate: '2026-08-14',
        homework: '否定は1文に1枚(I don\'t think 〜 is 〜 で止める)',
        verifiedNight: 86, verifiedDate: '2026-08-16',
        result: 'FAILED',
        evidence: '"I don\'t think what happens in my material world is not ultimately..."',
        note: '48時間で、同じ I don\'t think 〜 is not 〜 の型がそのまま戻ってきた。',
    },
    {
        issuedNight: 85, issuedDate: '2026-08-15',
        homework: 'explain / solve / enjoy に it を置いて帰る',
        verifiedNight: 86, verifiedDate: '2026-08-16',
        result: 'FAILED',
        evidence: '"and they are very enjoying, you know."',
        note: '3夜連続、動詞は3回とも enjoy。主語だけが毎回替わっている。',
    },
    {
        issuedNight: 85, issuedDate: '2026-08-15',
        homework: '国籍に a を付けない(I\'m Japanese.)',
        verifiedNight: 86, verifiedDate: '2026-08-16',
        result: 'NO_CHANCE',
        evidence: '該当場面なし',
        note: '翌夜に国籍を名乗る場面が来なかった。撃つ機会が無い宿題は、当たりも外れも記録できない。',
    },
    {
        issuedNight: 86, issuedDate: '2026-08-16',
        homework: 'enjoy に相手を付ける(enjoy it / enjoy oneself)',
        verifiedNight: 87, verifiedDate: '2026-08-18',
        result: 'AVOIDED',
        evidence: '締めは "Yeah. I see. Yeah, thank you so much." — enjoy を一度も使わなかった',
        note: '**撃たなければ外れない。** 4夜連続で未消化のまま、今夜ついに動詞ごと回避された。回避は解決ではない。',
    },
    {
        issuedNight: 86, issuedDate: '2026-08-16',
        homework: '否定は1文に1枚(通告3回目)',
        verifiedNight: 87, verifiedDate: '2026-08-18',
        result: 'FAILED',
        evidence: '"I know that New York, not huge earthquakes doesn\'t happen"',
        note: '3レッスン連続。通告は今夜で4回目になった。',
    },
    {
        issuedNight: 87, issuedDate: '2026-08-18',
        homework: 'every / everybody / everyone の後ろは単数(1夜3発、通算6回目)',
        verifiedNight: 90, verifiedDate: '2026-08-21',
        result: 'FAILED',
        evidence: '"Everybody are fighting for their limit" / "everybody...know"',
        note: '3夜後に2回。しかもその夜いちばんいいことを言った文の主語がこれだった。',
    },
    {
        issuedNight: 87, issuedDate: '2026-08-18',
        homework: '1音違いは、言う前に「反対語じゃないか」を1回疑う',
        verifiedNight: 90, verifiedDate: '2026-08-21',
        result: 'FAILED',
        evidence: '"Broad ocean"(red ocean のつもり) / "you\'re taught as one of the greatest"(touted のつもり)',
        note: '疑う手順は入らなかった。ただし taught のほうは第91夜に touted で雪辱している(所要3日)。',
    },
    {
        issuedNight: 87, issuedDate: '2026-08-18',
        homework: '締めの1文を、レッスンに入る前に決めておく',
        verifiedNight: 90, verifiedDate: '2026-08-21',
        result: 'EXECUTED',
        evidence: '"It\'s not about competition. It\'s you versus yesterday\'s you."',
        note: '**残り30秒で撃った。** 決めて入ったかどうかは本人しか知らないが、締めに1文が置かれたのは事実である。ただし第91夜では再び時間切れで終わったので、定着はしていない。',
    },
    {
        issuedNight: 90, issuedDate: '2026-08-21',
        homework: '限定詞は1枚だけ(2枚目が出たら、どちらかを捨てる)',
        verifiedNight: 91, verifiedDate: '2026-08-24',
        result: 'FAILED',
        evidence: '"Is a my screen share?" / "this is a my prompt" / "I gonna finish the my monologue"',
        note: '**2日で3枚。** 第90夜の5枚からは減ったが、宿題としては未執行のまま持ち越し。',
    },
    {
        issuedNight: 90, issuedDate: '2026-08-21',
        homework: 'everybody と nobody は単数',
        verifiedNight: 91, verifiedDate: '2026-08-24',
        result: 'NO_CHANCE',
        evidence: '該当場面なし(everybody / nobody を一度も使わなかった)',
        note: '撃つ機会が来なかった。ただし数の一致そのものは別の場所で3回落ちている(chemtrails is / he sell / normal teenagers)。',
    },
    {
        issuedNight: 90, issuedDate: '2026-08-21',
        homework: 'how to say を捨てる(持つのは What\'s the word? と How do I put this? の2つだけ)',
        verifiedNight: 91, verifiedDate: '2026-08-24',
        result: 'EXECUTED',
        evidence: '"I always say how to say ... so how do I put it? This is an English lesson so I have to say how do I put it?"',
        note: '**この台帳で初めての EXECUTED である。** 誰にも指摘されないまま、本人が走行中に捕まえて撃ち直した。**登録(08-19)から実戦で止まるまで5日。** 講師の返事は Good expression actually.',
    },
    {
        issuedNight: 91, issuedDate: '2026-08-24',
        homework: '限定詞は1枚だけ(通告2回目。次の25分はこれだけを狙う)',
        verifiedNight: 92, verifiedDate: '2026-08-26',
        result: 'FAILED',
        evidence: '"That is not a retirement, just a change your career." / "It is like a ancient Rome ... they did a same thing" / "you live in a nature"',
        note: '**減るどころか増えた。第90夜5回 → 第91夜3回 → 第92夜7回。** しかも a と your の同席は、第91夜の a my と完全に同型である。**通告2回のあとに件数が倍以上になった宿題は、この台帳で初めてである。**',
    },
    {
        issuedNight: 91, issuedDate: '2026-08-24',
        homework: '話題の人物について話し始める前に、she を1回だけ口に出しておく',
        verifiedNight: 92, verifiedDate: '2026-08-26',
        result: 'AVOIDED',
        evidence: '講師の妻が話題に出た唯一の場面で "Wow, your wife is so talented." — 三人称代名詞を一度も使わなかった',
        note: '**取り違えはゼロ。だが撃ってもいない。** 話題の人物が出た場面で、宿主は your wife と名詞のまま押し通した。**回避は記録上は無傷だが、在庫にはならない。**',
    },
    {
        issuedNight: 91, issuedDate: '2026-08-24',
        homework: '締めの1文を、入る前に決めておく(第87夜からの持ち越し)',
        verifiedNight: 92, verifiedDate: '2026-08-26',
        result: 'EXECUTED',
        evidence: '"Okay, as always, thank you so much. See you next."',
        note: '**撃った。第87夜から5夜かかった。** as always, thank you so much まで完璧に着地している。**ただし最後の1語が消えた — See you next time の time。撃った回数だけを数える約束なので EXECUTED とするが、着弾は1語手前である。**',
    },
    {
        issuedNight: 92, issuedDate: '2026-08-26',
        homework: '限定詞は1枚だけ(通告3回目。2枚目が出そうになったら、そこで一度黙る)',
        verifiedNight: 93, verifiedDate: '2026-08-27',
        result: 'FAILED',
        evidence: '"This is a Como." / "Ah, and near the Milan." / "Also very, very north of the Italy." / "like a Boris Johnson"',
        note: '**4夜連続。ただし今夜、配属先が判明した — 固有名詞である。** 町・都市・国・人名の4種類に、1枚ずつ律儀に配っている。**そして同じ夜、普通名詞の前では4枚落ちた**(▲ funny story / ▲ huge event / ▲ Italian thing / ▲ funny event)。**「黙る」という処方は執行されなかった。黙る判断が要る場所を、こちらが指定していなかったからである。**',
    },
    {
        issuedNight: 92, issuedDate: '2026-08-26',
        homework: '仕事の話は I work in ~ で始める(I am a construction を捨てる)',
        verifiedNight: 93, verifiedDate: '2026-08-27',
        result: 'NO_CHANCE',
        evidence: '該当場面なし(25分すべて記事読解と議論。仕事の話題が一度も出なかった)',
        note: '**「この台帳でいちばん判定機会の多い宿題」と書いた翌日に、機会がゼロだった。** 記事読解の回では自己紹介が発生しない。**判定機会の多さは、話題の設計に丸ごと依存する。予報側の見積もりが甘かった。**',
    },
    {
        issuedNight: 92, issuedDate: '2026-08-26',
        homework: '締めの1文を、最後まで言い切る(See you next time.)',
        verifiedNight: 93, verifiedDate: '2026-08-27',
        result: 'FAILED',
        evidence: '"Yes. Thank you. So much. Next time."',
        note: '**落ちる場所が入れ替わった。** 第92夜は See you next ▲ で **time** が消えた。今夜は ▲ Next time. で **See you** が消えた。**両端が交互に落ちている。** 第87夜から6夜、まだ一度も丸ごと言い切っていない。**毎回、残りは2語である。**',
    },
    {
        issuedNight: 93, issuedDate: '2026-08-27',
        homework: '大文字で始まる語の前では、口を開く前に手を止める(固有名詞に冠詞を付けない)',
        verifiedNight: 94, verifiedDate: '2026-08-28',
        result: 'FAILED',
        evidence: '"reporters all over the Japan" / "someone in the DMM" / "Edo is now like a Tokyo" / "near the Saitama prefecture" / "very near to the Tokyo" / "the Ryogoku is famous for the sumo"',
        note: '**一夜13枚で番組記録を更新した。第93夜の4枚から3倍である。** 対象を「大文字」に絞った翌日、**配布先のほうが増えた** — 国名・都市名・県名・地区名・会社名、そして競技名(the sumo)と形容詞(a epic)にまで及んでいる。**この台帳で、処方を具体化した翌日に件数が3倍になったのは初めてである。**',
    },
    {
        issuedNight: 93, issuedDate: '2026-08-27',
        homework: '可算名詞を裸で立てない(story / event / thing / change の前に a を1枚)',
        verifiedNight: 94, verifiedDate: '2026-08-28',
        result: 'FAILED',
        evidence: '"▲ Hokusai museum is three minutes away" / "it\'s ▲ iconic tower" / "I ▲ little bit embarrassed" / "it\'s very commuting ▲ commuter city"',
        note: '**コインの裏表は、両面とも落ちた。** 固有名詞に13枚配った同じ夜に、要る場所では4枚落ちている。**「配達先の反転」は2夜連続で完全に再現された。** 処方の形をもう一段変える必要がある — **枚数ではなく、判断の場所を1問に固定する。**',
    },
    {
        issuedNight: 93, issuedDate: '2026-08-27',
        homework: 'See you next time. を、5語まとめて1つの音として覚える',
        verifiedNight: 94, verifiedDate: '2026-08-28',
        result: 'EXECUTED',
        evidence: '"Yeah, thank you so much and uh see you again."',
        note: '**第87夜から7夜目にして、締めの1文が初めて完成した。** 第92夜は time が落ち、第93夜は See you が落ちた。**今夜の Thank you so much and see you again. は、どこも欠けていない完全な文である。** 処方した See you next time. ではないが、**撃った回数だけを数える約束なので EXECUTED とする。** そして講師は直後に see you next time と返した。**次の的は、また目の前に置かれている。**',
    },
    {
        issuedNight: 94, issuedDate: '2026-08-28',
        homework: '意見は1文10語で切って、5本撃つ',
        verifiedNight: 95, verifiedDate: '2026-08-29',
        result: 'EXECUTED',
        evidence: '"It\'s not a conspiracy, it\'s just a fact."(9語) / "Coronavirus is man-made. Laboratory leak. 100%. This is an opinion."(4文、全部5語以下)',
        note: '**第83夜から12夜書き続けて、一度も執行されなかった処方が、ついに撃たれた。しかも2発。** 1発目は9語で否定と断定を1文にまとめ、2発目は4文に割ったうえで、最後に「これは意見だ」と自分でラベルを貼っている。**断定と留保が別々の文に置かれた。処方の完成形である。** **ただし正直に書く — 本人が意識して切った証拠は無い。** 同じ夜、ジョン・スチュワートを紹介しようとした1文は60秒に伸びている。**説明しようとすると伸び、言い切ろうとすると縮む。撃った回数だけを数える約束なので EXECUTED とするが、再現するかは次の夜まで分からない。**',
    },
    {
        issuedNight: 94, issuedDate: '2026-08-28',
        homework: '大文字で始まる語と、競技名・分野名には冠詞を置かない(通告6回目)',
        verifiedNight: 95, verifiedDate: '2026-08-29',
        result: 'FAILED',
        evidence: '"The Fauci did the same thing" / "corona started in Wuhan, the China" / "a cure for the HIV" / "because of the Ivermectin worked"',
        note: '**通告6回目の、翌レッスンである。** 開始から40分で人名に the が付き、そのあと国名・病名・薬品名と続いて4枚。**第94夜の13枚からは減った。だが前回「大文字」で絞ったら翌日は競技名(the sumo)と形容詞(a epic)に伸び、今回 Japan / Tokyo / Saitama / Ryogoku / sumo / DMM の6語を名指ししたら、指定していない4語(Fauci / China / HIV / Ivermectin)に全部逃げた。** **対象語を列挙する方式は、これで2回とも失敗した。この隊員は、名指しされなかった語に配達先を移す。**',
    },
    {
        issuedNight: 94, issuedDate: '2026-08-28',
        homework: '詰まったら How do I put it? を出す(#27 how to say を封じる)',
        verifiedNight: 95, verifiedDate: '2026-08-29',
        result: 'AVOIDED',
        evidence: '裸の "how to say" は一度も出ず、処方の "How do I put it?" も一度も出なかった。残ったのは "how again"(→ What\'s it called again?)の断片だけ',
        note: '**壊さなかった。撃ちもしなかった。** 埋め込みの用法(I cannot remember how to correctly say in English)は文法的に正しい形で出ており、非文の裸の how to say は今夜ゼロである。**だが処方した How do I put it? も出ていない。** 代わりに出たのは **how again** — 研究所の名前が思い出せず、詰まった瞬間に生まれた断片で、**同じ反射が形を変えて残っている。** 撃った回数だけを数える約束なので AVOIDED とする。**次の的は What\'s it called again? である。**',
    },
    {
        issuedNight: 95, issuedDate: '2026-08-29',
        homework: '形容詞の前に a を置かない(That\'s epic. / It\'s possible. / I was naive.)',
        verifiedNight: 96, verifiedDate: '2026-08-30',
        result: 'FAILED',
        evidence: '"a extra" / "a expensive" / "a forced work environment"',
        note: '**翌レッスンで3枚。しかも a extra と a expensive は母音の前でもある。** **第94夜 a epic、第95夜4枚、第96夜3枚。** **判定は1問で足りる(次に来る語は「もの」か「どんな」か)と3回書いたが、判定を挟む0.3秒が無い。** **この持病は知識ではなく発話速度の側にある、という見立てがここで固まった。**',
    },
    {
        issuedNight: 95, issuedDate: '2026-08-29',
        homework: '人名・国名・病名・薬品名に the を置かない(通告7回目。語ではなく判定手順で狙う)',
        verifiedNight: 96, verifiedDate: '2026-08-30',
        result: 'FAILED',
        evidence: '"the central Tokyo"(**第94夜とまったく同じ語**)/ "the nature" / "the fire" / "a Christmas season"',
        note: '**通告7回目も落ちた。しかも the central Tokyo は第94夜と同一の語である。** **語を列挙する方式(第94夜)、大文字で絞る方式(第95夜)、判定手順で狙う方式(第96夜)。3種類の処方が、3回とも失敗した。** **ここで方針を変える — この隊員を「置かせない」のは無理である。次の3夜は、置きそうな名詞そのものを避けて言い換える方向で測る。**',
    },
    {
        issuedNight: 95, issuedDate: '2026-08-29',
        homework: '講師が置いた語は、崩す前に1回そのまま復唱する',
        verifiedNight: 96, verifiedDate: '2026-08-30',
        result: 'EXECUTED',
        evidence: '講師が olive varieties を正しく置いた3分後、宿主の口から **garden variety** が出た',
        note: '**復唱そのものはしていない。だが、置かれた語が3分後に在庫から別の熟語として発火した。** **第95夜の記録は「-wise が3夜連続で生きた」だった。今夜は3分である。翌日投函ですらない。** **撃った回数だけを数える約束なので EXECUTED とする。** **ただし同じ夜、planted を planning と聞き違えている。カメラを切った代償で、耳のほうが落ちた。**',
    },
    {
        issuedNight: 96, issuedDate: '2026-08-30',
        homework: '-ed と -ing を、口に出す前に1回だけ疑う(自分が受ける側なら -ed)',
        verifiedNight: 98, verifiedDate: '2026-09-01',
        result: 'EXECUTED',
        evidence: '"I\'m flattered, yeah, it\'s flattering."(0.5秒差で撃ち分け)',
        note: '**★98夜で初めての「書いただけで直った」記録である。** **第96夜のボケは I\'m really interesting in your story だった。2夜後、同じ口が I\'m flattered(受ける側)と it\'s flattering(与える側)を0.5秒差で正しく撃ち分けた。** **講師は何も直していない。促してもいない。宿題として検死に書かれただけである。** **同じ夜に torturing days で1発落としているので完全ではない。だが撃った回数を数える約束なので EXECUTED とする。** **そして第99夜、締めで I\'m interested to see を I\'m curious to see に自力で乗り換えた。3夜かけて、同じ配線が3段階で直っている。**',
    },
    {
        issuedNight: 96, issuedDate: '2026-08-30',
        homework: '冠詞は母音の前で an(a extra / a expensive。第95夜の a amazing から3枚目)',
        verifiedNight: 98, verifiedDate: '2026-09-01',
        result: 'FAILED',
        evidence: '"a idea" / "a idiomatic" / "a explanation"',
        note: '**翌々レッスンで3枚。第95夜 a amazing、第96夜 a extra / a expensive、第98夜3枚。** **そして第99夜も a echo chamber / a Eiken で落ちた。4夜連続である。** **この時点で、意志による判定は不可能だと結論する。** **口が a を1音で先に出していて、次の語を見ていない。母音を確認してから an に直すのでは、発話速度に間に合わない。**',
    },
    {
        issuedNight: 96, issuedDate: '2026-08-30',
        homework: '「〜がある」で口を開くときは There で始める(第96夜、開幕と締め際の2回、It\'s で始めて崩した)',
        verifiedNight: 98, verifiedDate: '2026-09-01',
        result: 'NO_CHANCE',
        evidence: '第98夜の25分に、存在文を撃つ場面が記録されていない(後半10分が音読のため)',
        note: '**分母が無い夜だったので、正直に NO_CHANCE とする。** **第98夜は後半10分が音読で、産出そのものが減っている。** **なお第99夜には撃つ場面が来て、そこでは正しく出た — There is no logical and meaningful discussion.** **第95夜に締めで崩した同じ構文である。1夜飛ばして、立った。**',
    },
    {
        issuedNight: 98, issuedDate: '2026-09-01',
        homework: '限定詞は1つだけ(the my / this my。両方言いたければ my version of the ~ に逃がす)',
        verifiedNight: 99, verifiedDate: '2026-09-02',
        result: 'FAILED',
        evidence: '"this kind of like a last-minute size fitting" / "there is a no clear-cut answer" / "you\'re the maybe the best"',
        note: '**翌レッスンで3枚。第98夜の2枚から増えている。** **第79夜から96夜まで、この男の冠詞問題は一貫して「置かない」側だった。第98夜に「置きすぎる」へ裏返り、2夜で定着しかけている。** **新型は、発見から48時間で持病になった。これは番組で最速である。** **逃がし先(my version of the ~)は一度も使われていない。**',
    },
    {
        issuedNight: 98, issuedDate: '2026-09-01',
        homework: '母音の前は an(第95夜から3夜連続。意志の問題になってきた)',
        verifiedNight: 99, verifiedDate: '2026-09-02',
        result: 'FAILED',
        evidence: '"a echo chamber" / "it\'s just a Eiken required me to answer"',
        note: '**4夜連続。今夜だけで2枚。** **「意志の問題」という前夜の見立ては、ここで取り下げる。意志ではない。** **判定を挟む余裕が無いだけなので、判定を要らなくする方向に処方を変える — 迷ったら the。** **the echo chamber / the Eiken exam。特定できる話なら the で文は立つし、この男は the なら一度も崩していない。** **正確さを1段落として、事故をゼロにする。**',
    },
    {
        issuedNight: 98, issuedDate: '2026-09-01',
        homework: '否定は1文に1枚(things which not ... cannot で意味が反転した)',
        verifiedNight: 99, verifiedDate: '2026-09-02',
        result: 'AVOIDED',
        evidence: '二重否定は一度も出ていない。ただし処方を意識した形跡も無い(近いのは I don\'t blame both → 対象が either であるべき所)',
        note: '**壊さなかった。撃ちもしなかった。** **第99夜に否定を重ねた文は1つも無い。一方で、否定の対象を both で受けた誤りが1件ある(I don\'t blame both → I\'m not knocking either)。** **これは二重否定ではなく、否定の作用域の問題である。** **撃った回数だけを数える約束なので AVOIDED とする。** **次の的は either / neither の使い分けに移す。**',
    },
    {
        issuedNight: 99, issuedDate: '2026-09-02',
        homework: '母音の前は「an にする」ではなく「the に逃がす」(4夜連続で落ちた以上、判定を挟まない方式に変える)',
        verifiedNight: 100, verifiedDate: '2026-09-03',
        result: 'AVOIDED',
        evidence: '母音の前で a を置いた行はゼロ。ただし "It\'s ▲ area where policemen already there" で、a も the も置かなかった',
        note: '**第95夜 a amazing、第96夜 a extra / a expensive、第98夜 a idea / a idiomatic / a explanation、第99夜 a echo chamber / a Eiken。4夜連続、合計8枚。** **第100夜、連鎖は止まった — 母音の前で a を置いた行はゼロである。** **ただし喜ぶ前に分母を出す。母音で始まる可算名詞を単数で言う場面は3回しかなく、うち1回は a も the も置かずに落ちている(It\'s ▲ area where)。** **処方が効いたのか、撃つ場面が来なかっただけなのかは、この1夜では割れない。次の夜まで判定を保留する。** **判定手順を出す処方は、これで3回失敗している。** **今回は判定そのものを外す — 母音かどうかを見る余裕が無いなら、見なくていい形に逃がす。** **the echo chamber / the Eiken exam / the idea。この男は the なら一度も崩していない。** **「正しい an」ではなく「事故ゼロ」を取りにいく。**',
    },
    {
        issuedNight: 99, issuedDate: '2026-09-02',
        homework: '限定詞は1席だけ(a no / this kind of a / the maybe the。2枚目を言いたくなったら前置詞で逃がす)',
        verifiedNight: 100, verifiedDate: '2026-09-03',
        result: 'FAILED',
        evidence: '"my father is a maybe a little bit rough driver"',
        note: '**第98夜に発見された新型が、翌レッスンで2枚から3枚に増えた。48時間で持病になっている。** **処方は逃がし先を1つに固定する — my version of the ~ / this ~ of mine / probably the best。** **とくに maybe と the の同席(the maybe the best)は、副詞を the の外に出すだけで解ける。** **次の夜、この3枚のうち1枚でも撃てれば EXECUTED とする。** **第100夜、撃てなかった。a maybe a little bit rough driver で1枚。** **第98夜に発見され、第99夜に3枚、第100夜に1枚。3夜連続である。** **発見から72時間で常連になった。番組で最速の定着で、逃がし先(my version of the ~ / probably the best)は一度も使われていない。** **★今夜の1枚は maybe と a の同席で、これは第99夜の the maybe the とまったく同じ型である。** **処方を1点に絞る — maybe / probably は a や the の前に出す。それだけで、この型の半分が消える。**',
    },
    {
        issuedNight: 99, issuedDate: '2026-09-02',
        homework: 'everybody / nobody は単数。「みんな」を英語にしたら動詞に s を1枚戻す',
        verifiedNight: 100, verifiedDate: '2026-09-03',
        result: 'NO_CHANCE',
        evidence: '"Everybody did it at that position" — 過去形なので s の出番が来なかった。現在形で everybody / nobody を主語にした行はゼロ',
        note: '**この番組の長期評価で、次の25分で最も発生確率が高い持病として第1位に置いてきたものである。** **第99夜、そのまま2発当たった — everybody, 99% use / nobody use Mac。** **07-01 の every legal citizens have から、この記録の中で一度も直っていない唯一の持病。** **日本語の「みんな」が複数の感覚であることが原因なので、語彙でも文法でもなく翻訳の問題である。** **処方は1行 — 「みんな」「誰も」と言ったら、その直後に s を1枚足す。** **第100夜、この持病は撃たれなかった。** **Everybody did it at that position は過去形なので、s の出番が来ていない。** **現在形で everybody / nobody を主語にした行はゼロ。** **分母が無い夜だったので NO_CHANCE とする。長期評価の第1位は据え置き。**',
    },
];

/** 前兆現象 — 事故の直前に実際に観測されている挙動 */
export interface Precursor {
    name: string;
    trigger: string;
    observed: string;
    countermeasure: string;
}

export const PRECURSORS: Precursor[] = [
    {
        name: "AI の人らしさを講師に説明している最中は he、AI が間違えた瞬間だけ it",
        trigger: "AI の振る舞い・性格・話し方を、講師に向かって評価する文(人っぽい、即答する、不気味だと知っている)",
        observed: "**第147夜、AI(Claude の音声)が講師と直接話した夜 — he's like 'Hey, what's up?' / his answer is correct / he knows he's creepy / I don't trust him at all / he's gone / he's instantaneous / he's kind of like a speak like human / he's good at(8回)。**同じ夜、it で出たのは2回だけ — **It's misunderstood me(AI が男の答えを勝手にノーと受け取った瞬間)/ they kind of abuse it(友人たちが AI を乱暴に扱った話)。** **★第145夜も同じ — he's like kind of posh / he's kind of British(人らしさを褒める文)で he、so he remembers → it remembers は自分で直した。** **★★AI を褒める・人っぽいと言う文では人の代名詞が出て、AI が間違える・扱われる文では物の代名詞が出る。評価の向きが代名詞を決めている。** **★講師は It doesn't have / It can't comprehend itself / telling it what to do と最後まで it(1回だけ He understands himself well)。**",
        countermeasure: "**★AI の話を始める前に、it と1回口に出す(The AI... it)。人っぽさを言う文ほど危ないので、It sounds human / It talks like a person と、it を先頭に置いた型で言う。**迷ったら名詞に戻す — the AI。"
    },
    {
        name: "島国の有利を陸続きの国と比べて言うと、geo- が地質学に化け、island nation の a が落ちる",
        trigger: "日本は海に守られている、壁は要らない、と相手の国(陸続き)やアメリカの壁と比べて言う1文",
        observed: "**第145夜(英国の講師)— we are ▲ island nation / thanks to the geological location。第146夜(ケープタウンの講師)— we are uh nation How can I say? Uh island nation / because of the geological situation / we are like uh island nation。**講師は別人、お題は同じ(外国人労働者)、場面も同じ(島国だから不法に入りにくい、壁は要らない)。**2夜とも、この場面で同じ2つが同時に崩れた — 地理(geography)が地質(geology)になり、be の後ろの island nation から a が消えた。** **★前夜の講師は It's not that easy to get to Japan, geographically と正しい形を置いていた。今夜は拾われていない。** **★島国の話の外では、a は立っている(it's a good topic / a homogeneous society)。**",
        countermeasure: "**★この場面の1文を、先に1本だけ決めておく — We're an island nation, so geography protects us.(a と geography が同じ1文に入る)。**相手の国の話を振る前に、この1文を言い切ってから振る。"
    },
    {
        name: "講師の語で講師を褒めている最中、決まり文句の最後の1語が落ちる",
        trigger: "前夜までに拾った慣用句を、その講師本人に返して褒める・詫びる1文",
        observed: "**第145夜、3夜連続で予約した理由を講師に言う冒頭の数分 — when push to the shove, you say, yesterday(comes が落ちた)/ you bring bring bring bringing bringing the best in me(out が来なかった)/ 終盤の詫び I'll make it all your worth(worth your while)。**同じ数分で bring my A-game / hold your own / spot-on は立った。**崩れたのは、出典(you say, yesterday)を付けて返した句と、気持ちが動いた句。**",
        countermeasure: "**★褒める前に1本だけ決める — 一番言いたい句を1つ選び、頭から最後まで1回で言う(You bring out the best in me)。並べない。**"
    },
    {
        name: "用意した台本を失った直後、主語の後ろの動詞が消える",
        trigger: "準備した記事・台本・AI の議事録が開けず、探すのをやめると宣言した直後の数分",
        observed: "**第144夜、技術トラブルで AI と作った反対側の台本が見つからず、男は探しながら話した — I I Extremely uh difficulty to find(動詞が無い)/ I'm I'm going to put, I I put the stuff on note(時制が3回揺れた)/ But I I maybe, yeah, abandon the original plan。**計画を捨てると決めてから数十秒、主語の後ろに動詞が座らない。 **★講師に「同じお題で何か話して」と頼み、講師が話している間に立て直した。UBI の押し返し(3分)は、計画を捨ててから約5分後で、骨は立った。** **★第104夜(画面が凍った夜)と同じ、技術の事故の後の現象。**",
        countermeasure: "**★台本を失ったら、探しながら話さない。1文で宣言して(I'll just wing it today)、相手に1つ聞いて(Could you start?)、相手が話している間に立て直す。**今夜はこれを半分無意識にやった。"
    },
    {
        name: "AI の一人称の文を読むと、人称を入れ替えずに自分の話として読む",
        trigger: "AI が書いた要約・議事録(I grilled you / You picked the topic)を、講師に向かって読み上げるとき",
        observed: "**第143夜、AI の議事録の I grilled you as the interviewer / you gave speech in English を、男はそのまま講師に読んだ。**講師が男に詰められ、スピーチをしたことになった。 **★同じ夜、AI を she / he / he で受けた。AI の文を読む口は、AI の視点に乗ったまま話す。** **★第138夜(自分の検死の画面)、第139夜(模範解答)と同じ、印刷された英語を読む夜の現象の、人称版。**",
        countermeasure: "**★AI の文を読む前に、I と you を指で入れ替えてから読む — I grilled you → it grilled me。**引用として読むなら、前に It said: と付ける。"
    },
    {
        name: "人でない相手の代名詞が揺れ、最後に目の前の人に向く",
        trigger: "AI など人でない相手のことを、講師に向かって長く話すとき",
        observed: "**第142夜 — AI を I gave him(him)/ they are so precise(they)/ I don't want to talk to you(you)と3通りに呼んだ。最後の you で、文が目の前の講師に向いた(あなたと話したくない、不気味だ)。** **★相手が人でないので、代名詞の席が決まらない。話が長くなるほど、目の前の人(you)に引き寄せられる。**",
        countermeasure: "**★AI の話を始める前に、it と決める。**途中で迷ったら、名詞に戻す — the AI。"
    },
    {
        name: "感情の強い why は、語順が日本語のまま出る",
        trigger: "相手の話(搾取・死・不正)に強く反応して、why で問い返すとき",
        observed: "**第141夜、2回連続 — why we are regressing / why we are living like a barbarian era。**講師のドバイとギリシャの強制労働の話の直後。 **★同じ夜、感情の乗らない問い(Do you agree with strikes? / What's your take?)では倒置が立った。** **★感情が乗ると、口は「なぜ俺たちは〜」の日本語の順で走る。**",
        countermeasure: "**★why と言ったら、次の1語を are / do / did に決めておく。**問いが長くなりそうなら、Why? の1語で止めて、次の文を平叙文で言う — Why? We're going backwards."
    },
    {
        name: "be と動詞の間に副詞を挟むと、be が先に出る",
        trigger: "I'm のあとに kind of / just / always / really を置いてから、動詞を言おうとするとき",
        observed: "**第140夜、2回 — I I I'm kind of got recuperated / I'm just talk about randomly about this stuff。**2回とも、be と動詞の間に副詞が入った。 **★第119夜 I'm always appreciate、第120夜 I'm fully understand、第136夜 I'm very appreciate も、同じ形(I'm + 副詞 + 動詞)。** **★副詞を言っている間に、口は be を確定させてしまう。動詞が来た時点で、be を取り消す時間が無い。**",
        countermeasure: "**★副詞を言いたいときは、主語の直後に置く — I kind of / I just / I always。**I'm と言いかけて副詞が浮かんだら、I'm を I に戻してから副詞を言う。"
    },
    {
        name: "講師の正しい文を10秒後に復唱すると、be を1枚足す",
        trigger: "講師が I kind of disagree / I'm never in a rush のような短い定型を言い、その直後に男が同じ立場で復唱するとき",
        observed: "**第139夜、講師 — I kind of disagree with this(自然保護への反対)。10秒後、男 — I'm kind of disagree with what they're doing in EU。**同じ骨格、同じ kind of、be だけ1枚多い。 **★第100夜、講師が I'm never in a rush と置いた20分後に、男は if you hurry と落とした(受領→同じ間違い)。今夜はそれが10秒に縮んだ。** **★第138夜の運搬係(講師が it 付きで言った直後に it 無しで復唱)と同じ — 復唱は、相手の文をそのまま運ばない。自分の在庫の形に戻してから出る。**",
        countermeasure: "**★講師の定型を復唱するときは、1語も変えない。**足さない、落とさない。 **★I kind of と言いかけたら、I'm は無い。**kind of の前は I / you / they の裸の主語。"
    },
    {
        name: "自分の検死の画面を読み上げると、印刷された正解を在庫の音で読み替える",
        trigger: "自分のアプリの検死ページ(AI の fix / 講師の pick)をスマホの画面で見ながら、講師に読み上げるとき",
        observed: "**第138夜、男は第137夜の検死ページを写真で送り、1行ずつ読み上げた。画面には正解が印刷されている。口は10発ずらした — flat → left / consensus → consistency ×2 / which is → fitness / improvise → improve / off-the-cuff → of the cough / absolutely → up so / flog → Frog / Tchaikovsky → psych / Eiken → egg / curious → furious / deliver → deploy。** **★第131夜(目の前に正しい字が印刷されていても1音ずらして撃つ)、第135夜(慣れた所ほど読み飛ばす)の続きで、今夜は台本が「自分の検死」。** **★そして昨日の自分の文を読むと not が落ちる(4回 — I will miss any words / I can ignore the lyrics / I'm following it closely / That's non-English expression)。読んでいるのは昨日の直しなのに、意味が昨日の逆になった。** **★第91夜(台本を読んでいる間は崩れない)の逆である。台本が AI の英語のときは、読んでも崩れる。自分の在庫に無い語は、印刷されていても出ない。**",
        countermeasure: "**★読み上げる前に、画面の1文を黙読して、知らない語に印を付ける。**印の語だけ、1音ずつ読む(im-pro-vise / con-sen-sus / off-the-cuff)。 **★not の位置は、読む前に指で押さえる(第135夜の処方と同じ)。** **★AI の側の手順 — 検死の fix / pick に、本人の在庫に無い語が入っているときは、カードの日本語面に発音の割り(im-pro-VISE)を書く。**"
    },
    {
        name: "前夜に紙で直した前置詞は、口が正解を言いかけてから旧形に戻る",
        trigger: "前夜の検死が直した前置詞(scale の on など)を、翌夜、同じ話題の中で言うとき",
        observed: "**第137夜、but I realize, uh, on a, uh, in a big scale。**第136夜の検死は in a global scale を on a global scale と直し、PRECURSORS にも登録した。24時間後、男は on a と正しく言いかけ、0.5秒置いて in a に戻した。**★正解は在庫にあった。持病はそれより速かった。**同じ夜、in the big scale / in the local level も in で出ている(3/3)。 **★第133夜の前兆「前日に作ったカードは、中身だけ先に着地する」の、前置詞版である。**カードの核の語(scale)は出て、隣の1語(on)は持病に戻る。",
        countermeasure: "**★on と言いかけたら、言い直さない。**言いかけた前置詞がそのまま正解であることが、この夜で分かった。 **★紙に書く処方は、語ではなく「on a」の2語で書く。**scale の前に on、ではなく、on a bigger scale の塊で覚える。"
    },
    {
        name: "「まとめると」と宣言した直後の2文は、前置詞が1種類に揃う",
        trigger: "独白の終わりに to sum up / my point is と宣言して、規模や段階(scale / level)の語で結論を言うとき",
        observed: "**第136夜、男は to somewhat summarize / my point is / to sum up と3回宣言して結論に入った。その直後の2文 — in a global scale / in a small scale / in a local level。3回とも in。**正しくは on a global scale / on a small scale / at a local level。 **★同じ結論の文で hold the powerful accountable(responsible → accountable と自分で格上げ)/ the powerful の the / from the ground up は立った。**中身の語は揃い、場所の札だけが1種類になった。 **★第135夜の come up (with)、第136夜の capable (of) と同じ型 — 核の語の隣の1語が落ちる。**",
        countermeasure: "**★結論の1文を言う前に、scale か level かを決める — scale なら on、level なら at。**まとめの宣言(to sum up)の直後は、前置詞を先に口に出す。 **★on a global scale / at a local level の2本を、定型として固定する。**"
    },
    {
        name: "同じ話を3回目に語ると、口が台本を追い越す",
        trigger: "前に2回話した出来事を、AI が書いた台本で読み上げるとき(台本は事実を知らない、口は2回分の記憶を持っている)",
        observed: "**第135夜、英検1級一次の失敗談の3回目(第129夜=生、第130夜=台本で別の講師に、第135夜=note 版の台本で試験前夜の講師に)。** **★口が台本を4方向で追い越した — ①台本の a teacher を Uh, are you? Maybe と目の前の講師にした(第132夜と同型)。②台本の measuring stick を yardstick に戻した(第128夜に本人が使った語)。③台本の矛盾(30 people sweating / I was the only one sweating)を not sweating, but it was tense と事実に戻した(第130夜と同型)。④前回のアドリブと検死の語(muggy / the watch betrayed me / chicken scratch / I was winging it)を台本の外で出した。** **☓同時に、読み慣れた所ほど読み飛ばした — Little did I know → Yeah, fool, you know, did I know / an empty seat → non empty seat / spa → super / Three minutes → 30 minutes。** **★文法の崩れは、台本を止めて自分の言葉で話した所に集中した(第91夜の観測と同じ形)。**",
        countermeasure: "**★3回目の台本は、事実の確認表として使う — 読む前に「台本と事実が違う所」に印を付けておく。** 口が直すのを待たずに、直す所を先に決める。 **★読み飛ばし対策 — 倒置(Little did I know)と数字(three / thirty)と否定(an empty / non empty)は、読む前に1回声に出しておく。**"
    },
    {
        name: "模範の答えを聞いた直後に話すと、口は一度それをなぞってから、自分の立場に裏返す",
        trigger: "同じお題で、相手の答え(教科書どおりの答え)を先に聞き、その直後に自分の答えを台本なしで話し始めるとき",
        observed: "**第134夜、本人は講師に先に英検二次のお題(自由貿易は政府の第一目標であるべきか)を答えさせた。講師の答えは「一般論としては yes」。** **★本人の独白は、まず講師と同じ側から始まった — most economists think it's generally a good idea to trade things freely ... that's like our mindset ingrained in us。** **★そして1文の途中で裏返った — free trade is, it should be, um, uh, could be an ideal, but, uh, I, yeah, I strongly disagree with the idea that free trade, uh, so, sorry, free... Yeah, in the first, yeah, system is rigged。**反対する対象が「自由貿易」から「仕組み」に、文の途中で差し替わった。 **★第131夜の前兆(紙に書かれた意見を読むと、口が自分の立場に書き換える)と同じ型が、紙なしで起きた。**今夜の「紙」は講師の答えだった。 **☓裏返った直後の1文で、言い切りたい主語の the が落ちた — system is rigged / powerful remains powerful。**",
        countermeasure: "**★模範を聞いた後でも、立場は最初の1文で言い切る — Free trade sounds great on paper, but the system is rigged.** 一般論は2文目に回して「それは認める」の形で置く(I'm not dismissing that, but ~)。 **★反対の対象を言う前に、何に反対するのかを1語で決めておく — 自由貿易そのものか、自由貿易の仕組みか。**"
    },
    {
        name: "前日に作ったカードは、中身だけ先に着地する",
        trigger: "前日に AI と作った予習カード(野球の口語など)の中身を、翌日のレッスンで自分の話の中に出すとき",
        observed: "**第133夜、前日(10/9)に作った NLCS の予習カード103枚のうち、6本が本番に出た。** **in a funk(very が余った)/ tipping(his が the に)/ do damage(the が余った)/ one homer away(from が of に)/ three-peat(going for が going to the に)/ get off track(off the rail に)。** **★6本とも、狙った語(funk / tipping / damage / away / three-peat / off track)は正しく、周りの小さい語(冠詞・前置詞・強めの副詞)が落ちるか入れ替わった。** **★カードの英文は1回もそのまま読まれていない。本人は覚えた中身を、自分の文に組み直して撃った。**",
        countermeasure: "**★カードの「核の語」より「核の隣の1語」を覚える — tipping HIS / away FROM / going FOR / off TRACK。** **★AIの側の手順 — 予習カードの日本語面に、核の隣の1語(前置詞・冠詞)を名指しで書く。**"
    },
    {
        name: "台本は、相手の顔と、まだ来ない結果を知らない",
        trigger: "前のチャットでAIに書かせた台本で、過去のレッスンの出来事や、自分の結果を、講師の前で読み上げるとき",
        observed: "**第132夜、本人は前のチャットでAIが書いた台本を読み上げた。台本は2か所、事実を知らずに書いていた。** **① Last week, I told another teacher here — 第127夜の講師は、いま目の前にいる講師だった。口は another の手前で止まり、It's you. It's actually you と直した。代名詞も she を you に直した(so she she, you you)。② I passed the vocabulary section of Eiken — 一次の合否はまだ出ていない。口は3分後、Maybe I'll pass. I'm not sure と自分で戻した。** **★2つとも、書いたのはAI(このチャット)である。AIは講師の顔を知らず、本人の合否も知らない。知らないことを、知っている形で書いた。** **★第99夜の前兆「台本の嘘」(Mac ユーザーと書かれた Windows ユーザー)と同じ型。第130夜・第131夜に続いて、紙と口が食い違い、口が勝った。** **☓直したあとの1文で部品が落ちた — you was like(she を you にしたとき was が残った)。**",
        countermeasure: "**★台本の「誰に」と「結果」の行は、読む前に1回見る。**AIに頼むときは「相手は前回と同じ講師かもしれない」「結果はまだ出ていない」を先に渡す。 **★口が途中で直したら、直した語に合わせて動詞も直す — she was → you were。** **★AIの側の手順 — 講師の同一性と、まだ出ていない結果は、台本に書かない。分からないことは another / passed で埋めず、空けておく。**"
    },
    {
        name: "書かれた意見を読み上げると、口が自分の立場に書き換える",
        trigger: "AI に書かせた資料の「私の意見」の行(I support it ... / I think ...)を、講師の前で声に出して読むとき",
        observed: "**第131夜、本人は AI が書いた二次の練習資料を読み上げた。freedom の指の行に I support it, but only with strict limits と書いてあった。** **★★本人は読み終えた直後に this say I support it, no, no, no, I don't と立場を裏返し、if I have to take a position, I don't support this one と言い、strict limits に戻り、最後は you have to strike a balance に着地した。** **★第130夜の前兆(盛った台本を読むと、事実のほうが口から出る)の続きである。**第130夜に口が直したのは事実(隣人の性別、誤答の数)。今夜は意見。 **☓立場を3回動かすあいだに、定型の並べ(in terms of / as far as I know / when freedom's concerned / with respects to)が出て、4つめに s が付いた。**",
        countermeasure: "**★資料の「私の意見」の行は、読む前に自分の立場に書き換えておく。**AI の意見を声に出してから否定すると、否定と着地のあいだで定型を並べる時間が生まれ、部品が落ちる。 **★本番(二次)では、立場は最初の1文で言い切る。**I don't support it. Here's why. 迷った末の strike a balance は、最後の1文に1回だけ置く。",
    },
    {
        name: "盛った台本を読むと、事実のほうが口から出る",
        trigger: "自分の体験を AI と一緒に英語の台本にして(笑いのために盛ってある)、それを講師の前で読み上げるとき",
        observed: "**第130夜、本人は前夜に生で話した英検の一日を、AI と作った台本にして読み上げた。** **★★台本の盛った所は、読み上げる口が事実に戻した — 冷たい隣人は台本では女性、口では I asked uh women, uh not women, uh guy。誤答は台本では1問、口では I only missed like three points / one question, no, three question wrong。時計は台本では2時に合わせただけ、口では I already noticed, oh, this watch is done. But still ... I believed in my cheap watch。** **★台本の磨いた比喩は、多くが無傷で乗った(It started like a spacious house, and ended up like a packed rush-hour train / In a manga, that would be a superpower / I wish at least one of them was grown up)。** **☓崩れたのは、1音違いの語(felt / left、invitation / reputation)と、台本の最後の1文(if I see that woman again ... → And see is a woman again, I'm going to sexy song)である。** **★同じ夜、講師が置いた keep time は0秒で拾われた(It wasn't keeping time, you'd say → It wasn't keeping time)。読む口と拾う耳は、同時に開いていた。** **★第91夜の観測(原稿は無傷で、原稿から顔を上げた瞬間だけ崩れる)とは向きが違う。今夜は原稿そのものを読みながら崩れ、原稿の外(アドリブ)の muggy / My watch betrayed me / forensic は立った。**",
        countermeasure: "**★台本は、盛った所に印を付けてから読む。**事実と違う所は、口が勝手に直しにいく。直すなら1回で直す(a woman — actually, a guy)。言いかけて戻るのを3回くり返すと、文がほどける。 **★締めの1文だけは、台本から目を離して言えるまで口で回しておく。**25分の最後に着地しない1文が、いちばん記憶に残る。 **★講師が語を置いたら、今夜のように0秒で復唱して自分の文にする。**第90夜の記録(目の前に置かれた語だけが拾えない)の反証が、今夜1件ある。",
    },
    {
        name: "準備の外側を話すと、英語の部品も外側から落ちる",
        trigger: "試験・本番の当日の出来事(持ち物、時計、席、移動、天気)を、時系列で長く独白するとき",
        observed: "**第129夜、本人は英検1級の一次の当日の出来事を、講師に止められずに長く独白した。** **☓落ちたのは文の中心ではなく、物の名前の周りの部品だった — dropped off the station(get off)/ walk for the place(to)/ hang big watch(a clock)/ analogue watch(an)/ check a time(the)/ translate into English(them)/ I haven't prepared 100 minutes hell(for / of)。** **★★話の中心(緊張がうつった / 脳が焼けた / 時計が止まった)は、contagious / my brain is fried / it didn't work と正しく言えている。崩れたのは、物と場所を言う小さい語(前置詞・冠詞・目的語)である。** **★準備しなかった物の話をしている最中に、文の中の準備されていない部品が落ちた。**",
        countermeasure: "**★出来事の独白は、物の名前を言う前に1拍置く。**an analog watch / the time / at the station。名詞の前の小さい語を、名詞と一緒に1つの音で言う。 **★独白が5分を超えたら、1回講師に返す(Is that all right? / Have you ever had that?)。**第129夜、本人は開始時に Is that all right? と許可を取った。途中でもう1回返すと、部品を拾い直す間ができる。",
    },
    {
        name: "暗記した型を口で再生すると、型の中の誤りがそのまま出る",
        trigger: "試験や発表のために覚えた書き出し・決まり文句・定型の段落を、会話の中で口に出して再生するとき",
        observed: "**第128夜、英検の前夜に、本人は作文の書き出しとして覚えた型を講師の前で暗唱した。** **☓The idea that death penalty is justified ... has attracted much considered attention ... prompting the debate over whether that kind like a cruel stuff should be still remained。**型の骨は正しく、considered(→ considerable)と be remained(→ remain)の2語がずれていた。 **★その場で組み立てた文の崩れとは種類が違う。その場の文は言い直しで直ることがある(同じ夜、How do you think は15分後に What do you think になった)。覚えた文は、覚えた形のまま、何度でも同じ所で崩れる。** **★第91夜からの「原稿は無傷で、原稿の外が崩れる」の逆向き。原稿そのものが2語傷んでいた。**",
        countermeasure: "**★覚えた型は、一度、外の人の耳か目に通す。**講師の前で1回声に出す、または紙に書いて検死に通す。自分の口で何度くり返しても、ずれた語はずれたまま強化される。 **★型を覚えるときは、骨の語(has attracted / prompting / whether)と、中身の語(considerable / remain)を分けて確かめる。**ずれるのは中身の語のほうである。",
    },
    {
        name: "予定を並べると、試験の名前と日付が入れ替わる",
        trigger: "複数の試験・締め切り・行事を、月や日付と一緒に一息で並べて説明するとき",
        observed: "**第127夜、本人は英検と TOEIC の予定を一息で並べた。** **☓so I can take a TOEIC test um October uh day after tomorrow and uh if I pass uh November and December TOEIC is kind of like a my um plan。**2日後に受けるのは英検である。TOEIC は12月。試験の名前が日付の席を取り違え、英検が文から消えた。 **★同じ夜、英検1級のレベルも C1 or D2(D は存在しない)と言い、TOEIC の満点を 99 900 90 と3回言い直した(4回目で 990)。** **★★数と固有名詞が1文に3つ以上並ぶと、組み合わせが外れる。**1つずつなら、this Sunday is the Eiken exam のように正しく言えている。",
        countermeasure: "**★予定は1組ずつ切る — The Eiken is the day after tomorrow. The interview is in November. The TOEIC is in December.** 1文に試験は1つ。 **★並べる前に、数を数えて宣言する — I have three exams coming up.** 数を先に言うと、1つずつ言う形に自然に切れる。",
    },
    {
        name: "相手の gonna を拾って言い返す1文で、be が音ごと消える",
        trigger: "講師が what's gonna / it's gonna と言った直後に、本人が同じ形を拾って自分の文で言い返すとき(特に主語が I 以外のとき)",
        observed: "**第125夜、講師は試験の準備の話で you don't know what's gonna come out on the day と言った。** **☓本人はその直後に、同じ形を拾って because you cannot you know see what gonna come and what gonna stick to you と言い返した。's が2連続で落ちた。** **★第124夜にも、going to の前の be が消えている — probably I going to explain / we gonna(直後に I'm gonna と言い直し)。2夜連続で同じ穴である。** **★★分母 — 主語が I のときは立つ。I'm gonna just wing it / I'm not trying to be a Shakespeare / I'm not sure。**消えるのは、what や名詞が主語の節で、gonna の前の 's が弱く短い音になる場所である。 **★第124夜の「講師の The Brewers don't play until Saturday を復唱して the だけ落とした」と同じ場面の型 — 講師の文を拾って返す1文では、意味を運ぶ語は拾えて、音の小さい部品が落ちる。** **★第126夜、主語別に数えた — 主語 I の gonna は1回で、be は立った(Okay, I'm gonna read it out)。主語が I 以外の gonna は0回。**講師の gonna を拾って言い返す場面も来なかった。**分母は増えていない。**この前兆は2夜ぶんのまま。",
        countermeasure: "**★gonna は主語とくっつけて1つの音で覚える — what's-gonna / it's-gonna / they're-gonna。**I'm gonna は既に1つの音になっているので崩れない。**★講師の文を拾って返すときは、講師の主語から言い直す(what's gonna ~)。**語だけ拾うと、音の小さい部品が抜ける。**★サンプルは2夜なので、分母が小さいことは隠さない。次の夜、gonna の前の be を主語別(I / それ以外)に分けて数える。**",
    },
    {
        name: "映画や動画の筋を人に説明するとき、時の金具が現在形に倒れる",
        trigger: "観た映画・聞いたポッドキャストの中身を、相手に順を追って要約しているとき",
        observed: "**第123夜、本人は JRE のティム・ロビンスの回と、13年前に観た『ショーシャンクの空に』の場面を、20分近く英語で要約した。** **☓時の金具が倒れた — they can't pronounce(当時の話)/ people realize / He eventually kill himself / end up ... solitary confinement / I've watched that movie 12 years ago。** **★★語彙は落ちていない — ubiquitous / lost faith in / henchman / catharsis / solitary confinement / vividly / vaguely は全部、要約の最中に出た。** **★主語も遠くなる — everybody know kind of stuff は2分近いターンの最後の1文で、同じ夜の前半の everybody knows は正しかった。** **★第118夜の「AIの話で語彙が上がり、骨格が崩れる」と同じ形で、中身を運ぶことに手が回るほど、動詞の時と数が後回しになる。**",
        countermeasure: "**★要約は、最初の1文で時を決める。**The movie came out in 1994. / In the clip, he said ~. 過去形で入れば、その後の動詞は過去形で揃えやすい。 **★1ターンを短く切って、講師に返す。**第123夜の講師は、長いターンの途中で Wait, Tim Robbins said, or...? と主語を確かめている。**主語が揺れるほど長いなら、そこで切る。**",
    },
    {
        name: "原稿の定義文を声に出すと、the が a になる",
        trigger: "「X is the Y」の形の原稿(core5 の枝の例文)を、初見で声に出して読むとき",
        observed: "**第121夜、本人は1度も読んでいない原稿を講師の前で読み上げ、原稿に the とある所を a で4回読んだ。** **☓Funding is a line in the budget / long before anyone needs a hospital bed / Disease prevention is a yearly checkup / Longevity is a 90-year-old next door。** **★Convenience の行だけ is a, is a, is a, is the app と、a を3回言ってから the に戻した。** **★分母 — the のまま読めた定義文は2本(Productivity is one hour of real work / Access is the bus fare to class)。** **★★目で the を見ているのに、口が a を出す。**is のあとに名詞が来る、と口が先に決め、その名詞に a を配る。第114夜の観測(読んでいる間は無傷で、目を上げると部品が動く)とは逆向きで、**読んでいる最中に、冠詞だけが口の癖に置き換わる。** **★読み違いは原稿の外の注釈より少ない。今夜の崩れの大半は、お年玉やおみくじを説明した原稿の外で起きている。** **★★第122夜、2件目。**別の講師の前で同じ原稿を読み、5本を a、4本を the で読んだ。**5本とも is の直後の the。**前夜 a にした the hospital bed は今夜 the で読めた。 **★★★そしてこの夜、同じ形の定義文そのものが講師に採点された — Longevity is the ninety-year-old next door は a bit weird。**本人がいちばん読み違える形は、ネイティブの耳にもいちばん引っかかる形だった。",
        countermeasure: "**★定義の文は、is the までをひと息で言う。**Funding is the / Access is the / Longevity is the。the を名詞の一部ではなく、is の一部として口に入れる。 **★読む前に、その段の定義文の the だけを目で拾っておく。**右手4本(FAIRNESS / TRUST / ROOTS / NATURE)は枝の例文がほぼ全部この形なので、1本につき3回来る。",
    },
    {
        name: "疲れている夜の開幕",
        trigger: "疲れ切って、または屋外・悪い接続から入った夜の最初の5分",
        observed: "**第118夜、本人は祝日も休まず働いて spent、屋外から音声だけで入った。** **☓最初の5分で時制が現在形に倒れた — I just, uh, grinding(I've just been grinding)/ so I end up taking your class outside(ended up)/ originally plan was(My original plan was)。**後半にも he pursues his second career が出た。 **★★語彙は落ちていない — spent / a heavy day / enormous in scope は開幕の5分で出ている。落ちたのは文の時間の金具だけ。** **★講師はこの状態を見て、Do a little bit of listening practice, and then you can jump in whenever you want to と場を渡した。25分の終わりに本人は you recharged me と言った。** **★★第125夜、2件目。**朝4時に起きて4〜5時間運転した夜、knackered のまま入った。**☓最初の5分で、動詞と小さい部品が落ちた — I will straight into the bed(go が無い)/ I got early(up が無い)/ it took a lot toll on me, mental and physical / until I take exam。**第118夜は時制が倒れた。今夜は時制ではなく、動詞そのものと句動詞の粒子が抜けた。 **★★語彙はここでも落ちていない — knackered(講師が言った直後に自分の文で)/ feels like an eternity / wearing multiple hats / I'd rather pass than flunk は開幕の5分で出ている。** **★終盤、語を探して止まったところで、本人が自分から blanking out, I'm so tired と言った。** **★★★第127夜、3件目。**金曜の夜、翌朝5時起きの前で、本人は I'm sleepy. I'm little bit knock out で入った。**☓最初の5分で、状態の -ed と冠詞が落ちた — I'm little bit knock out / it's chilling day(chilly)。そして第125夜と同じ穴が2夜ぶりに開いた — after this class I'll straight into my bed(go が無い)。**寝る話になると、ベッドへ移動する動詞が消える。 **★★語彙はここでも落ちていない — not TGIF for me / state of the art / stepping up to the plate / sleep like a log が開幕の10分で出ている。** **★本人は自分から off day と言い、講師は One of those days で受けた。25分の後半、本人は英語を学ぶ目的(alter ego)まで話しきった。**",
        countermeasure: "**★疲れた夜は、最初の1文を固定する — I've been working all day, so I'm pretty wiped out.** 現在完了進行形を1本、先に口に通しておく。**★そして講師に話を振る(What have you been up to?)。聞く側に回った5分で、時制は戻る。**",
    },
    {
        name: "AIの話で語彙が上がり、骨格が崩れる",
        trigger: "自分が詳しい技術(AI・ツール・自分の工程)の話をしている最中",
        observed: "**第118夜、自分の工程(MP3 → Gemini → Claude)と講師の工程を比べた10分。** **★語彙は上級 — redundant / cumbersome / do the heavy lifting / where the magic happens / in this day and age / no coding skill required / state-of-the-art。** **☓骨格は崩れた — what's plan do you subscribe(疑問の語順)/ nobody couldn't access(二重否定)/ each cost million dollars(would)/ it's not about I'm not to criticize / Maybe Gemini do the job / I'm a GPT guy(You're)。** **★★詳しい話ほど言いたい中身が多く、語を選ぶことに手が回り、文の骨(疑問・否定・would・主語)が後回しになる。** **★a/an の取り違え2回(a amazing / an redundant)も、この10分に集まっている。**",
        countermeasure: "**★技術の話は文を短く切る。1文に上級の語は1つまで。** **★疑問は型を1つ持つ — What plan are you on? / Do you stick to one, or do you compare them?** **★引くときは I'm not criticizing. It's just your style. の1本で固定する。**",
    },
    {
        name: "語を品定めする1文",
        trigger: "原稿や講師の語について「どう聞こえるか」「いい語だ」と評価する、その1文",
        observed: "**第117夜、本人は原稿の語を講師と1文ずつ品定めした。評価の1文で、2つの持病が同時に出た。** **☓be が付く — that's sounds normal / this contrast is sounds nice / it's not sounding good(3回)。** **☓a が消える — What ▲ nice word / Is that ▲ common phrase / Drill is ▲ nice word / that's ▲ contrast(4回)。** **★★語の中身を判定している最中は、判定の文そのものの金具に手が回らない。** **★質問の形にすると崩れない — Which sounds better, logical thinking or critical thinking? は完璧だった。**",
        countermeasure: "**★品定めは型を2つだけ持つ — That sounds + 形容詞 / What a + 形容詞 + 名詞。**それ以外で評価したくなったら、質問の形(Which sounds better, A or B? / Is that a common phrase?)に逃がす。",
    },
    {
        name: "相手を褒めた直後の1文",
        trigger: "講師の人柄や教え方を褒めた、その直後の1文(特に感謝を言う文)",
        observed: "**第116夜、本人は講師を you have a very deep understanding of what students want と褒め、その直後に I'm appreciate it all the time と言った。** **★#3(appreciate に be が付く)は、第112夜に「褒められた直後」で出た持病である(I'm so much appreciated)。第115夜の締めは I really appreciate it で be なし。第116夜、今度は「褒めた直後」に戻った。** **★★褒められた直後にも、褒めた直後にも出る。共通するのは、感情が動いた直後の1文であること。** **★★★第119夜、この前兆が的中した。**本人は講師を「5〜6年続けて常連を抱えている」「人気の講師には理由がある」「ごまをする必要がない、あなたは very real だ」と褒め、**その直後に So yeah I'm always appreciate you constantly と言った。** **★経過 — 第117夜は同じ場面(you're the best teacher)が来たが感謝の文そのものが出ず NO_CHANCE。第118夜は感謝ではなく動詞3本で言い切って無傷だった(You energized me / You recharged me / You made my day)。今夜は感謝の文が出て、be が付いた。** **★2件目の的中で、この前兆の確度を上げる。**そしてこの前兆だけは、場面を本人の側から呼べる — 褒めるのは本人だからである。迎え撃てる唯一の前兆になった。 **★★第120夜、この前兆の広い形が出た。**褒めたのではなく、講師が「母の見舞いで授業を減らしていた」と話した直後に、**I'm fully understand**。感謝の文ではなく、共感の文で、同じ骨(動詞の前の be)が立った。**★この前兆の本体は「褒めた直後」ではなく「相手の話で感情が動いた直後の1文」である。**第113夜の慰めの3本(feel sorry for / my heart goes ▲ to / I'm really feel for)も、同じ場面で同じ骨が出ていた。 **★★★第121夜、3件目の的中。**25分聞き手に徹した講師を、締めで褒めた直後の1文 — **it was a good lesson, yeah, because you are always, you know, uh, be a listener。**are の後ろに be が立った。**今夜の25分で be が余ったのは、この1文と、年賀状の説明の it's not, you know, cannot tell の2か所だけである。**褒めた直後の1文は、判定を挟む余裕が無い場所として、3回続けて同じ骨を出した。 **★★第124夜、4件目 — ただし骨が逆向きに出た。**講師がマウンドの話をした直後、本人は it only you, like a true Brewers fan, can give such kind of information to me と講師を褒め、**同じ息で so I, I really excited to hear about that story と言った。**これまでの3件は be が余った(I'm appreciate / I'm fully understand / are be a listener)。**今夜は要る be が消えた。**向きは逆でも、場所は同じ — 相手を褒めた直後の1文である。 **★★第126夜、5件目 — 礼の形は執行され、隣の1文で主語が消えた。**本人は「DMM を始めて最初に当たった講師があなただった」と言い、その直後に I appreciate you, man. Appreciate you, mate. と、be の付かない3語で礼を言った。**countermeasure の「感謝の文は I appreciate の3語で固定」が、この前兆の場面で初めて通った。** **☓ただし同じ夜、講師を you are very talented at producing English と褒めた直後の1文は So admire you だった。**I が丸ごと落ちた。be が余る(第116・119・120夜)、be が消える(第124夜)、今夜は主語が消える。**向きは毎回違い、場所は毎回同じ — 相手を褒めた直後の1文である。**固定した文(I appreciate)は通り、固定していない文(admire)で金具が動いた。",
        countermeasure: "**★感謝の文は I appreciate の3語で固定する。**褒めた・褒められたの直後は、判定を挟む余裕が無いので、形を1つに決めておく。I'm と言いかけたら捨てる。 **★★第119夜を受けて1つ足す — 褒めたあとに礼を言うなら、動詞を主役にする。**第118夜の You energized me / You recharged me は、相手が自分に何をしたかを動詞で言ったので、appreciate の席に立たずに済んだ。**appreciate を使うと決めたなら、always / really を足すのは3語を言い切ってから(I always appreciate you)。**",
    },
    {
        name: "原稿の闇の側を読むと、英語が本人の過去に当たる",
        trigger: "AIに書かせた原稿の「闇の側」(弊害・問題点を並べた段)を、講師の前で1文ずつ読んでいるとき",
        observed: "**第117夜と第119夜、闇の側の文でだけ、原稿に無い実体験が本人の口から出た。** **★第117夜 — ごますりの行(Brown-nosing gradually chips away at my quality of life)を読み、quality of life を my self-respect に書き換えて、生保時代の自分の話にした。** **★★第119夜 — FREEDOM の闇の側の3文目(The company encroaches on personal autonomy in subtle but persistent ways. Drinking parties, weekend golf, and voluntary overtime that isn't voluntary)を読んだところで止まり、because that's exactly I've been through と言った。10年以上前、生保にいた頃の自分である。** **★★★そして講師が、第117夜に本人が使った語で受けた — But is that what you were describing as brown-nosing?** 2夜をまたいで、原稿の英語と本人の過去と講師の記憶が、同じ1点に着いた。 **☓ただし当たった瞬間の文は崩れる — because that's exactly ▲ I've been through(関係詞 what の欠勤)/ nowadays it's maybe it's no longer allowed to kind of like that situation / Nobody's like goes to office, goes out of office / It's just surface pretending to be working。**中身が出てくるほど、文の骨が後ろに回る。 **★分母 — 光の側(make informed choices / champions free expression / chart their own course)では、この現象は一度も起きていない。本人の反応は語の確認(Is that a familiar word?)と辞書的な言い換えだけである。**",
        countermeasure: "**★この前兆は避けない。使う。**闇の側の行は、本人の実体験を引き出す道具として一番効く。**読む順番を決めるなら、光の側を先に流して、闇の側で止まる。** **★★処方は文の長さに向ける — 当たった行で止まったら、1文目を That's exactly what I went through. の6語で固定する。**判定ゼロで出せる1本を置いてから、体験の中身を話す。 **★そして講師に渡す。**第119夜の brownie points / up to their neck / oblivious / recruitment and selection / it takes two to tango は、全部、本人の1文のあとに講師の側から出てきた語である。",
    },
    {
        name: "宿題の過剰執行",
        trigger: "前夜の宿題で「ここに X を置け」と言われた直後の夜。処方が効いた場面の外で、同じ X が要らない席に置かれる",
        observed: "**第114夜の宿題は「That's の次に very / kind of が来たら a を1枚」。第115夜、宿題の場面では a が正しく立った — That's uh kind of like a fulfilling lifestyle。** **☓同じ25分で、a は名詞の来ない席に4回(That's a similar / that's kind of like a black and white / Less meeting is a great / I'm a kind of a)、数えない名詞の前に4回(a outwork / a manual labor / a white-collar work / a grit)立った。** **★★出方が宿題の形と同じである — 7回のうち3回は That's の直後、2回は kind of の直後。**口は「That's / kind of の後ろに a」を覚え、「後ろに名詞が来るとき」を覚えなかった。 **★一方で、宿題の形に入らない場所の欠勤は8回残った(▲ camera / ▲ day / ▲ pretty good salary / ▲ very safe life)。**",
        countermeasure: "**★処方は、置く条件ではなく、置いた後の責任で書く。** 「X の後ろに a」ではなく「a と言ったら名詞まで」。**置いた札に責任を持たせれば、要らない席に置いた札は、名詞が出てこない時点で本人が気づく。** **★宿題を書くときは、その処方が効きすぎた場合に何が起きるかを1行添える。**",
    },
    {
        name: '覚えた表現を、画面から目を上げて出す瞬間',
        trigger: '読んだことのある定型・幹の文を、画面や原稿を見ずに思い出して言うとき。読み上げの合間、講師の直しを復唱するとき、別の指の表現を持ってくるとき',
        observed: `**第114夜、本人は指10本の幹の文を画面で読みながら、英検の過去問7問に答えた。** **★読んだ表現は無傷 — goes a long way towards / champions free expression / across the board / relegates ~ to / strips ~ of。** **☓画面を見ずに出した表現は、4本とも部品が1つ動いた — the haves and ▲ not haves(have-nots が割れた。FAIRNESS の指の表現を、MONEY の答えに思い出して足した)/ as they ▲ fit(see 落ち。5秒前に講師から聞いた)/ generations to generations(単数が複数に。画面には through generations と書いてある)/ at the risk of(the 余り。画面は at risk of)。** **★第91夜の観測(原稿を読んでいる間は誤らず、目を上げた瞬間に壊れた)と同じ形で、今夜は「壊れる」の中身が細かく見えた — 文が壊れるのではなく、定型の部品が1つ動く。** **★分母 — 今夜、画面なしで出した指の表現は4本で、4本とも部品が動いた。前から持っている定型(off the cuff / cut to the chase / I'm with you ×4)は、画面なしで無傷である。新しく入れた表現だけが落ちる。**`,
        countermeasure: `**★この前兆は、避けるものではなく、使うものである。落ちた部品が、その表現の「まだ口に入っていない所」を正確に指す。** **★★境目を越える手順は、同じ夜の録音にある — from generation to generation。講師が言う → 本人が半分だけ復唱(from は入り、複数が残る)→ 講師が説明せずにもう1回言う → 本人が全部復唱 → Right。** **★処方は1段 — 幹の文を1本読んだら、次の1回は画面から目を外して同じ文を言う。**落ちた所だけをもう1回。`,
    },
    {
        name: '相手の不幸を聞いた直後の1分',
        trigger: '講師が家族の病気・事故・損失を話した直後、本人が慰めを言う最初の1分',
        observed: `**第113夜、講師が母親の入院と車の破損を話した。** **☓本人の慰めは3本 — I feel so sorry for you(気の毒に、の register)/ my heart goes ▲ to your mother(out 落ち)/ I'm really feel for you(be が余る)。** **★★3本とも狙いは正しい。慰めの定型を3本持っていて、3本とも取り出せた。落ちたのは金具1つずつである。** **★同じ25分の後半、車検・違反・road rage の話では、drives me up the wall / take for granted / puts into perspective が金具ごと着地している。**崩れたのは、相手の不幸を聞いた直後だけ。 **★分母 — 今夜1件。第107夜(自分の正確さを語る最中)、第112夜(褒め言葉を受けた直後)と並ぶ「感情が先に動く場面」の3つ目。**`,
        countermeasure: `**★この前兆は避けられない。講師の不幸は講師が持ってくる。** **★★処方は最初の1文だけに向ける — 相手の不幸を聞いたら、1文目は I'm so sorry to hear that の7語で固定する。**判定ゼロで出せる1本を先に置く。**2本目(My heart goes out to her)と3本目(I really feel for you)は、1本目で間が取れてから撃つ。** **★判定は1段 — 1文目が固定の7語なら執行。**`,
    },
    {
        name: '褒め言葉を受けた直後',
        trigger: '講師が本人の英語・努力・人柄を褒めた直後の1〜2文',
        observed: `**第112夜、講師が It is paying off, I can tell. Your English is very natural と言った。** **☓その直後の2文が両方崩れた — I spent like a, a little bit put effort into this(spent と put が1文で衝突)/ I'm so much appreciated(感謝の向きが裏返った、#3)。** **★★#3 は 2026-06-14 の I was appreciated が初登録で、この番組で最も古い持病の1つである。そして出る場面は毎回、相手に何かをもらった直後 — 褒め言葉、親切、時間。** **★同じ夜、褒められる前の25分では、三単現が3回とも出席し、strike a balance / in the long run / no matter what が着地している。**崩れたのは、褒められた3秒後だけである。 **★分母 — 今夜1件。第107夜(自分の正確さについて語っている最中)と近い場所にあるが、あちらは自分から語り始めたとき、こちらは相手から受けたとき。**`,
        countermeasure: `**★この前兆は避けられない。褒め言葉は講師が出すもので、本人は制御できない。** **★★処方は文の形に向ける — 褒められたら、次の文は3語で終わる定型を1つだけ言う。I appreciate it / That means a lot / Thank you, that's kind。**自分の努力の説明(spent effort / put effort)を、褒められた直後に始めない。説明は3語の定型を言ってから。 **★判定は1段 — 褒められた直後の1文目が3語の定型なら執行。be を言ったら負け。**`,
    },
    {
        name: '読み上げの隙間',
        trigger: '画面の資料(翻訳機を通したもの)を読み上げていて、その合間に自分の言葉でコメントを挟むとき',
        observed: `**第108夜、この男は25分のおよそ4割を、画面の検死の読み上げに使った。** **★読み上げている文そのものは、ほとんど崩れていない(崩れたのは decoration / postscription / uniting ages / the Brexit の読み違いだけ)。** **☓★★事故は、読み上げと読み上げのあいだに挟んだ短いコメントに集まった。** **It's a word-for-word, actually / the your generation gap / you continues / has already existed / Kind of like that's you said / It's not like a very tiny。** **★★この隙間のコメントには条件が揃っている — 直前に読んだ文の語をそのまま使う、1文が短い、そしてすぐ次を読みに戻る。** **has already existed は、カードに always と書いてある1文を読んだ直後のコメントで出た。読んだ語が、隙間で1音ずれている。** **★第104夜「読み上げが止まった瞬間」は、資料が途切れて長く喋る時間だった。今夜の隙間は5秒から10秒で、長さは違う。事故の種類も違う — 長い時間は構造が崩れ、短い隙間は部品が崩れる。** **★★第124夜、2件目。**AIに書かせた野球の記事を講師の前で読み上げ、段落の合間に Yeah, no, probably I going to explain why in the next paragraph here と挟んだ。**be が落ちた。**読み上げ本体の崩れは数字と1語の読み違い3か所(20-0 / 252 / omen)で、文の骨は崩れていない。**骨が崩れたのは隙間の1文のほうである。**第108夜の観測(長い時間は構造が崩れ、短い隙間は部品が崩れる)と同じ形。`,
        countermeasure: `**★隙間を無くす必要はない。読み上げだけの25分は、第98夜に「語彙の段差を炙り出すが、話す練習にならない」と記録している。** **★★処方は隙間の長さに向ける — コメントを挟むなら、1文で終わらせずに2文にする。** **1文だけのコメントは、次を読みに戻る準備と同時に組み立てるので、判定を挟む余裕が無い。** **★そして読んだ語を使うときは、読んだ形のまま使う。言い換えない。always と読んだら always と言う。** **★サンプルは第108夜の1件なので、分母が小さいことは隠さない。次に資料を読み上げる夜、隙間のコメントの事故件数と、読み上げ本体の事故件数を分けて数える。**`,
    },
    {
        name: '自分の正確さについて語っている最中',
        trigger: '宿主が自分の発音・文法・正確さについて意見を述べているとき',
        observed: `**第107夜、-ly の札が3回、付くべき語の隣に貼られた。** **my voice sounds very clearly / read so meticulous / a brutally AI。** **★★3枚とも、この男が自分の発音と正確さについて語っている最中に出た。**「私の声ははっきり聞こえるはずだ」「次は徹底的に読む」「容赦ないAIが直す」。 **★同じ25分で、「文法の誤りはノイズだ。少しなら通るが多いと中身が届かない」と言った文の中で、grammars と a little bit a noise の2枚が落ちている。** **★★★ノイズの話をしながらノイズを出した。** **第87夜(東京の住民は必ず来ると分かっている地震に備えない、を語りながら宿題を消化しなかった)以来、この番組は「主題と症状が一致する」を法則として持っている。今夜はその最も直接な形で、正確さを語る文が正確さを失った。** **★逆に、機材やジョー・ローガンの話をしている前半15分は、限定詞こそ落ちたが -ly の事故は1枚も無い。**`,
        countermeasure: `**★この前兆は避けられない。自分の英語について語る場面は、講師が振ってくる限り毎夜来る。** **★★処方は場面ではなく文の長さに向ける — 自分の英語観を語るときは、1文10語で切って5本撃つ(第83夜の処方)。** **今夜の3枚は全部、20語を超える文の中で出ている。sounds very clearly は28語の文、read so meticulous は50語を超える文の中である。** **★短い文なら、-ly の席を判定する余裕が生まれる。長い文では、判定の前に次の語が来る。** **★★そして観測を1つ足す — この前兆が出る夜は、本人が英語観を「言い切っている」夜である。今夜の言い切りは、この番組の採点方針と一致していた。内容は正しく、形だけが崩れた。内容が正しい文の形を直すのは、内容が崩れた文を直すより安い。**`,
    },
    {
        name: '訂正ではない入力が来たとき',
        trigger: '講師が英語の誤りではなく、宿主の自己評価そのものに割り込んできたとき',
        observed: `**第106夜、この男は自分の暗記文を紹介したあとで、自分でその価値を下げた。**「これは用意した答えです。100%台本です。自分は何もしていない」。 **★講師はそこに割り込んだ。**「たとえ台本でも、それを頭に定着させるには時間がかかる」「勝手に頭に着地してくれるわけじゃない」。**★英語の話を一言もしていない。** **★★★106夜、この番組に入ってきたものは全部「訂正」だった。言い方が違う、語が違う、その形は不自然だ。今夜の入力は訂正ではない。** **★★受け取り方も違っている。語を渡されたときのこの男は、復唱するか、拾わないかのどちらかである。今夜は「あなたが今日を救ってくれた」と言って、その場で自分の評価を書き換えた。** **★第104夜に入ったのは語彙だった。今夜入ったのはそれではない。**`,
        countermeasure: `**★これは事故ではないので countermeasure ではなく、観測手順として書く。** **★★測るのは1つだけ — この夜のあと、この男が自分の作ったものを「暗記しただけ」と言うかどうかである。** **言わなくなれば、入ったのは語ではない。言い続けるなら、その場の高揚だっただけである。** **★そして条件も記録しておく。この割り込みが起きたのは、この男が自分を落とした直後である。褒めの文脈ではない。** **★★講師が入れたのは肯定ではなく否定だった — 「それは違う」。肯定より否定のほうが速く届いた可能性がある。** **★同種の記録が3件貯まるまで、これは仮説のまま置く。**`,
    },
    {
        name: '判定を挟む余裕が物理的に無い夜',
        trigger: '座れない、濡れている、直前に予定が壊れているなど、体が落ち着いていない状態で25分に入ったとき',
        observed: `**第105夜、限定詞が4枚出た。第104夜はゼロである。** **★処方が変わったわけではない。変わったのは条件のほうで、この男は事務所を追い出され、傘も無く、立入禁止の庇の下でしゃがんだまま喋っていた。** **★同じ夜、時制が現在に落ちた行が3枚、方向の逆転が1枚、捏造語が1体。全部「1回判定すれば防げる」種類の事故である。** **★★逆に、判定を必要としない部分は崩れていない。** **conflagration、historical grievances、deterrent、silver lining、scraping by、point the finger at。難しい語ほど正確に出ている。** **★★★つまり崩れたのは知識ではなく、判定を挟む余裕のほうである。** **第99夜に出した結論(この宿主の発話速度では判定が間に合わない)が、いちばん極端な条件で再現された形になる。**`,
        countermeasure: `**★体が落ち着いていない夜は、判定を要求する処方を出さない。** **その夜の宿題は「判定ゼロの処方」だけにする — 危ない語を安全な語に置き換える、母音の前は the に逃がす、感情の語は -ed だけ持つ。どれも選択が発生しない形である。** **★★そして、この条件は事前に分かる。** **入室前に (a) 座れているか (b) 濡れていないか (c) 直前30分に予定が壊れていないか の3つを見て、1つでも欠けていたら判定つきの宿題は次の夜に回す。** **★逆に、この条件の夜にしか出ないものもある。** **第105夜、27夜前に外した年号(1923)、24時間前に渡した語(in the wake of)、20分前に自分が外した構文(five steps away from)が、全部この夜に出ている。** **判定が落ちている夜は、在庫から直接出てくる夜でもある。** **★だから中止はしない。測る対象を替える。**`,
    },
    {
        name: '読み上げが止まった瞬間',
        trigger: '原稿・画面・カードを読んでいた状態から、機材の故障か話題の転換で、自分の言葉に切り替わったとき',
        observed: `**第104夜、この現象が同じ25分の中で物理的に分割された形で観測された。** **画面共有が講師側で凍り、相手には何も見えなくなった。この男は続行を選び、そこから約8分、資料を見せずに喋っている。** **★☓今夜の主な事故は、ほぼ全部この8分に集まった — sticking word(造語)/ another brilliant ideas(限定詞と複数)/ can + -ing(構造)/ cursoring(捏造語)。** **★読み上げていた時間の英語は、ほぼ崩れていない。読み上げているのは他人が書いた文なので、崩れる余地が無いからである。** **★第91夜から「原稿の壁」として観測してきたものが、今夜いちばんきれいな対照条件で再現された。第98夜・第99夜は別の夜どうしの比較だったが、今夜は同じ夜・同じ話題・同じ相手で分かれている。** **★★そして重要なのは、崩れた8分を本人が自分で選んだことである。「見えなくていい。自分の言葉で説明しているから」と言って続けた。**`,
        countermeasure: `**★この前兆は避けるものではない。むしろ狙って起こす。** **読み上げている間、この宿主は上達していない。他人の文が口を通過しているだけである。** **★処方 — レッスンの中で、意図的に資料を閉じる時間を作る。25分のうち最後の5分でいい。** **★★ただし、その5分に事故が集中することを先に受け入れておく。今夜のデータでは、資料なしの8分に事故の大半が出ている。件数だけを見れば「資料を見ていたほうが良かった」という結論になるが、それは上達を測っていない。** **★測るべきは事故の件数ではなく、資料なしの時間の長さである。第104夜は約8分。次はそれを下回らないこと。**`,
    },
    {
        name: '名前を探していたところに来た語',
        trigger: '本人が造語や説明の言い換えで数分粘っていて、そこへ講師が正しい呼び名を1語で置いたとき',
        observed: `**第104夜、この男は「なんか言ってる風にする語」を sticking word という造語で説明し、3分喋った。** **講師が1語で名前を付けた — word fillers。** **★本人は即座に that is what I was talking about と返し、その場で自分の文に入れている。1秒である。** **★★対照群が同じ夜にある。同じ講師が Slowly と1語で訂正したが、この男は復唱しただけで、その後 slowly も go slow も一度も使っていない。** **★第102夜の仮説(相槌で受けた形は在庫に入らず、黙って聞いた形は入る)、第99夜の観測(同一レッスン内なら止めなくても拾える)に続いて、3つ目の型である — 自分が名前を探していた場所に来た語は、止めなくても1秒で入る。** **★訂正された語は入らない。探していた語は入る。同じ夜に、同じ講師が、同じ1語の長さで置いている。差は受け取る側の状態だけである。**`,
        countermeasure: `**★これは事故ではなく好機の前兆なので、countermeasure ではなく捕獲手順として書く。** **★自分が造語を作りかけたら、そこが名前の空席である。「英語で何て言うんですか」を待たずに、造語のまま喋り続けてよい — 相手は名前を埋めに来る。** **★第78夜、この男は conflagration を自力で出した直後に「英語で何て言うんですか」と聞いた。正解を自分で出してから疑ったのである。今夜は逆で、正解を持っていないまま3分喋り、相手が置いた。** **★処方 — 語が出てこないときに黙らない。説明で押し切る。名前は相手が持ってくる。** **翌夜、word fillers が本人の口から出るかを見る。出れば、この経路は語の定着経路として最短である。**`,
    },
    {
        name: '判定を2段に分けた処方',
        trigger: 'その夜の宿題が「まずAを認識して、次にBを決める」という2段の判定を要求しているとき',
        observed: '**第101夜の宿題「指示語を置いたら、名詞の数を先に決める」は、翌夜に執行されなかった。第102夜、限定詞の事故は7枚出ている。** **★この処方は2段だった — まず指示語を認識し、次に数を決める。** **第102夜、同じ持病に対して処方を1段に書き直した — 「a と s は同席できない。どちらか片方」。物理の話にして、判定を1回にした。** **★第103夜、5枚から2枚に減った。** **★同じ夜に出した3つの宿題(a + 複数 / 二重否定 / -wise の前)は、3つとも1段の処方で、3つとも動いている。** **★逆の記録もある。第99夜から出し続けている「母音の前は an」は、判定1回に見えて実は2段である — まず次の語が母音か見て、次に a か an かを決める。これは第102・103夜と2夜連続で落ちた。**',
        countermeasure: '**★宿題は必ず1段で書く。「AならB」の1回で終わる形にする。** **2段になった時点で、この宿主の発話速度では間に合わない。第99夜の時点で「判定を挟む余裕が無い」と確定しているので、これは能力ではなく物理の問題である。** **★1段にできない持病は、判定そのものを外す方向に逃がす。** **母音の an は「the に逃がす」、1音の狙撃失敗は「危ない語を安全な語に置き換える」。どちらも判定をゼロにする処方である。** **★この前兆現象は、宿主ではなく番組の側の癖を記録したものである。処方の設計が悪いと、宿主は実行できない。落ちたときは、まず処方が何段だったかを数える。**',
    },
    {
        name: '前夜に無傷だった文',
        trigger: '前の夜の検死で「無傷」と判定され、keep が立ってカードに登録された形を、翌夜に同じ意味で言おうとしたとき',
        observed: '**第102夜、前夜に無傷だった形が3つ崩れた。** **①I\'ve got the Eiken exam coming up in October(第101夜。検死は「予定を言う形として完全に自然」と書いた)→ I got Eiken exam coming up。have と the が両方落ちた。** **②I count on you(第101夜)→ I\'m really count on you。be が1枚増えた。** **③it took a toll on me(第101夜。検死は「1級の語彙帳の語を雑談で使える人間は多くない」と書いた)→ It\'s been taken a toll。受動になった。** **★3つとも、前夜に keep を立てて登録したものである。** **★そして同じ夜に、検死が渡した形は4件出ている(got the hang of it / education / for or against / for better or worse)。** **入ってくるものと落ちるものが、同じ夜に同じ数だけある。**',
        countermeasure: '**★復習の対象を、渡したものだけにしない。前夜に無傷だったものも回す。** **この番組は101夜のあいだ「言えなかった形」だけをカードにしてきた。今夜のデータは、それでは足りないことを示している — 言えた形も、24時間で落ちる。** **★処方 — 前夜の検死で keep が立った行のうち、fix が null だったもの(つまり無傷だったもの)を、翌日のカードに1〜2枚混ぜる。** **「直すためのカード」と「落とさないためのカード」を分ける。** **なおサンプルは第102夜の3件だけなので、分母が小さいことは隠さない。次の3夜で、前夜に無傷だった形が何枚崩れるかを数える。**',
    },
    {
        name: '相槌の直後',
        trigger: '講師が正しい形を口に出し、宿主がそれに相槌(me neither / right / I see)で応じたとき',
        observed: '**第100夜、講師が I\'m never in a rush と正解を置いた。宿主は Yeah, me neither と正しく受けた。その20分後、if you hurry で同じ形を落とした。** **第101夜、講師が正しい would を2回置いた(it would be terrible / He would just say)。宿主は相槌を打たず、黙って聞いた。その2分後、I would go to が出た。さらに2分後、I\'d consider it。** **★同じ「置かれる」でも、相槌を打った夜は落ち、打たなかった夜は使えた。** **★同様の記録は他にもある — 第85夜、講師が lives と正しく発音した5秒後に、宿主は live で2回落としている。このときも相槌を挟んでいる。第95夜の mainstream media も、講師の発話に頷いた直後に established media で外した。**',
        countermeasure: '**相槌そのものを禁じる必要はない(相槌が無いと会話が止まる)。** **止めるのは「相槌で終わらせること」のほうである。** **★処方 — 講師が言った形に相槌を打ったら、30秒以内に、主語を変えてその形をもう1回言う。** **I\'m never in a rush. → Me neither. → Actually, I\'m never in a rush either.** **相槌のあとに1文足すだけで、受け取ったものが使ったものに変わる。** **★仮説として書いておく — 相槌は「受け取った」の証明ではなく、「もう受け取らなくていい」の合図として働いている可能性がある。** **サンプルは第100夜と第101夜の2件だけなので、分母が小さいことは隠さない。次の3夜で検証する。**',
    },
    {
        name: '宣言の寿命',
        trigger: 'レッスンの終盤で、月単位・複数回にわたる約束を講師と取り付けたとき',
        observed: '**第99夜、この宿主は講師に「今月は全部、英検の準備に使いたい」と宣言し、1級の2分スピーチを実演させ、録音して帰った。** **翌日に来たのは、初対面の別の講師との Daily News である。** **英検も John も出てこない。** **宣言から24時間で、戦線は開かなかった。** **同種の記録は他にもある — 第6夜の英検宣言、第5夜のTOEIC宣言。どちらも当日の熱量に対して、翌日の行動が一致していない。**',
        countermeasure: '**宣言そのものを止める必要はない(宣言は毎回、その夜の英語を最も良くしている)。** **止めるのは「翌日に持ち越す前提で宣言する」ことのほうである。** **★処方 — 月単位の約束をしたら、その夜のうちに次回の予約を入れる。予約が入っていない宣言は、24時間で消える。**',
    },
    {
        name: '受領してから落とす',
        trigger: '講師が正しい形を置き、宿主が相槌(me neither / exactly / right)で正しく受けたあと',
        observed: '**第100夜、講師が I\'m never in a rush と置いた。宿主は me neither と、否定への同意として正しく返している。** **耳は届いている。意味も取れている。** **その20分後、if you hurry で同じ誤りが出た。** **第99夜の would は「置かれ、拾われず、直後に落とした」の3ステップだった。今夜は受領が挟まっている。** **★受け取ることと、自分の文に入れることは、別の工程である。**',
        countermeasure: '**相槌で受けた語は、在庫に入っていない。** **★処方 — 講師が置いた形を相槌で受けたら、そのあと30秒以内に、その形を主語を変えて1回撃つ。** **I\'m never in a rush. → Me neither. → Actually, I\'m never in a rush either, so I just stay under the limit.** **相槌のあとに1文足すだけで、受領が使用に変わる。**',
    },
    {
        name: '直後落下',
        trigger: '講師が正解の形を口にする',
        observed: '5秒以内に、同じ語を崩す。2026-08-15 に3回(weather の不可算 / on holiday の on / lives の三単現)、2026-08-18 に1回(sway を2回聞いた直後に swings)。**2026-08-27(第93夜)、講師が a shouting match と言った5秒後に shout match と2回言った。** 第90夜の obstacle course(10秒後に崩壊)、第92夜の peacock(30分後に置かれたが拾われず)と合わせて、**この現象は3種類の壊れ方を持つことが分かった — 崩す / 拾わない / 削る。** **2026-08-29(第95夜)、この現象は一夜で3種類そろった。** (1) **崩す型** — 講師が You\'ve got to read between the lines. と言った0.5秒後、本人は between the lies と返している(lines → lies)。(2) **拾わない型** — 講師が前半で pulling the strings behind the scenes と言ったのに、後半で本人は behind the back を自作した。(3) **新種・自分の正解から落ちる型** — bureaucrat と正しく言った直後に、自分で bureau- bureaucratic と形容詞に作り替えた。**この現象は、講師の語だけで起きるものではなかった。**',
        countermeasure: '講師が言った語は、崩れる前に1回そのまま復唱する。窃盗の習慣はもうあるので、それを防災に転用する。**2026-08-28(第94夜)、この処方が初めて執行された。** 講師が the remains と置いた直後、本人は「Remains, yeah, I think it\'s remains.」とそのまま2回言っている。**崩していない。削っていない。第90夜から3回続いた事故に、初めて対策が効いた記録である。** **2026-08-29、その処方は1日で戻った。** 第94夜に初めて執行されたのに、第95夜では崩す型と拾わない型の両方が出ている。**「効いた」の実測寿命は、いまのところ1日である。** そして自分の正解から落ちる型が見つかった以上、処方に1行足す — **正しく出たら、そこで止める。言い直さない。**',
    },
    {
        name: '重量増加',
        trigger: '話題が重くなる(災害・死・金・歴史)',
        observed: '助動詞と否定が増える。2026-08-14 に二重否定2発、2026-08-18 に未来の助動詞2枚と二重否定1発。軽い雑談では出ない。',
        countermeasure: '重い話に入る合図が来たら、1文の長さを半分にする。助動詞は1枚、否定は1枚。',
    },
    {
        name: '好意消失',
        trigger: '相手を褒める / 大事だと言う',
        observed: '冠詞の a が消える。「I\'m not ___ guy」型から始まり、2026-07-18「you are naturally ▲ very good person」、2026-08-16「you are ▲ very important part of my life」まで同型で継続。',
        countermeasure: '褒める前に、a を1枚だけ手に持ってから口を開く。a は名詞の直前ではなく、名詞句の頭に置く。',
    },
    {
        name: '自力修正の増加',
        trigger: '走行中の言い直しが1夜3件を超える',
        observed: '2026-08-18、自力修正4件と同じ夜に、1音違い7発という番組新記録が出た。サンプルは1件なので法則とは呼べないが、**「直せる夜は、直す対象も多い」**という関係が疑われる。',
        countermeasure: '観測を続ける。修正回数と事故件数を、今後の夜でも並べて記録する。',
    },
    {
        name: '回避',
        trigger: '同じ宿題が3夜以上未消化になる',
        observed: '2026-08-18、4夜連続で未消化だった enjoy の宿題を、動詞ごと使わずに締めた。**撃たなければ外れない。**',
        countermeasure: '宿題は「間違えないこと」ではなく「1回撃つこと」で書く。撃った回数だけを数える。',
    },
    {
        name: '原稿の壁',
        trigger: '書かれた文を読み上げている',
        observed: '2026-08-24(第91夜)、AIに書かせた台本を読み上げているあいだ、事故は1件も起きなかった。commemorative / reinforce / whopping / silicone mold まで無傷で通過している。**壊れたのは、原稿から顔を上げた瞬間だけ。** 読了0秒後には、原稿の never breaks character を he breaks character と反転させた。',
        countermeasure: '**この男の弱点は語彙でも知識でもなく、組み立ての速度である。** 対策は「読む」を「話す」に近づけること — 台本を読むのではなく、台本の骨組み(型)だけを持って入る。文ごと持つと読み上げになり、型だけ持てば話せる。',
    },
    {
        name: '善意の先行',
        trigger: '相手を擁護している、または「見下したくない」と言っている',
        observed: '2026-08-24、話題の人物を擁護している最中に、代名詞を4回外した(#20 の番組記録)。同じ夜、I don\'t judge / I don\'t want to put anyone down は正確に言えている。2026-08-16 の「相手を大事だと言った瞬間に a が消える」と同型で、**好意的な内容のときだけ部品が落ちる**という観測が2件目になった。',
        countermeasure: '擁護に入る前に、対象を1回だけ正しい代名詞で名指ししてから話し始める。**態度は既に届いている。落ちているのは指し示す部品のほうだけ。**',
    },
    {
        name: '止められなかった捏造語は、同じ夜に戻ってくる',
        trigger: '新種の捏造語を口にした直後、講師が訂正せずに話を先へ進めたとき',
        observed: '2026-08-26、peafowling(→peacocking)を言った30秒後、同じ語をもう一度使った。**図鑑史上初の、同一夜2回召喚である。** 講師はどちらも訂正しなかった。**そしてその30分後、講師は自分の話の中で peacock と正しく言っている — 正解は目の前に置かれたのに、拾われなかった。**',
        countermeasure: '自分で作った感触のある語は、その場で1回だけ確認する(Is that a word?)。**訂正されなかった=正しい、ではない。この番組では、訂正されなかった語は必ずもう一度出る。**',
    },
    {
        name: '翌日投函',
        trigger: '講師が自分の発話を止めて、語の使い分けそのものを説明したとき',
        observed: '2026-08-26(第92夜)、講師は自分で使った aggravate を止めて「これは英語でもよく誤用される。人をイライラさせるのは irritate だ」と説明した。**その24時間後、2026-08-27(第93夜)、相手も話題も違う会話で、本人は He was really irritated by what happened to him. と言った。教わった語の翌夜実戦投入は、この番組で初めての観測である。** **対照実験もある** — 同じ第92夜、講師は peacock を「自分の話の流れの中で」使った。**こちらは翌夜も出ていない。**',
        countermeasure: '**この現象は、事故ではなく資産である。** ただし条件は、当初の想定より広い。**2026-08-28(第94夜)、対照群であるはずの「流れの中で1回聞いただけ」の -wise が翌日に出た**(第93夜 sound-wise → 第94夜 preservation wise)。**さらに同じ夜、第93夜の検死で直した form an opinion と、第93夜に登録したカード That\'s the word. も出ている。** 仮説を書き直す — **在庫に入るのは「語」ではなく「型」かもしれない。** irritate は語で、止まって教わったから残った。**-wise は接尾辞で、1回聞いただけで残った。無限に応用できる形は、1回で足りるのかもしれない。** 運用は2本立てにする: (1) 語が気になったら **What is the difference?** で止めさせる (2) **接尾辞・言い回しの型は、聞いた回数を問わず翌日に投函される前提で拾う。** **2026-08-29(第95夜)、仮説が確定した。-wise が3夜連続で出た。** 第93夜に講師が sound-wise、第94夜に本人が preservation wise、**第95夜に individual-wise。誰も置いていない。促されてもいない。相手も話題も全部違う。** **「翌日投函」は2日で終わる現象ではなく、型については在庫化する。** 対照的に、この3夜のあいだ単独の語(peacock / aftermath / obstacle course)は一度も再出現していない。**運用を確定する — 語は消える前提で扱い、接尾辞・言い回しの型は在庫に入る前提で拾う。型は1回聞けば足りる。**',
    },
    {
        name: '配達先の反転',
        trigger: '同じ夜に、固有名詞と普通名詞が両方出る',
        observed: '2026-08-27(第93夜)、固有名詞に冠詞を4枚配り(a Como / the Milan / the Italy / a Boris Johnson)、同じ夜、普通名詞から4枚落とした(▲ funny story / ▲ huge event / ▲ Italian thing / ▲ funny event)。**枚数がちょうど一致している。** 第92夜も同型で、7枚配って2枚落とした。 **★★第124夜、別の軸で裏返しが出た — 人名に the が立ち(the Mizerowski)、チーム名から the が4か所落ちた(rooting for Dodgers / Cubs and Red Sox, and White Sox / root for LA Dodgers / Brewers don\'t play until Saturday)。**前夜の宿題は「人名と作品名に the を付けない」だった。**★チーム名は大文字で始まるのに、the が要る。**',
        countermeasure: '**この2つは別々の持病ではない。1枚のコインの裏表である。** 冠詞は「どれのことか絞る札」なので、**最初から1つに決まっているもの(固有名詞)には要らず、決まっていないもの(普通名詞)には要る。** 判定は1問で足りる — **その語は大文字で始まるか。大文字なら置かない。小文字なら置く。** **なお 2026-08-28、この処方を出した翌日に件数は3倍になった(4枚→13枚)。判定の場所は正しいが、判定する余裕が無い。処方は語を絞る方向へもう一段落とす。** **★第124夜を受けて、この処方の穴を1つ記録する — 大文字でも the が要る名前がある。チーム名(the Dodgers / the Brewers)とシリーズ名(the NLCS / the World Series)。**人名と地名は裸のまま。**宿題は1段で出す — チーム名を言う前に the(第124夜の宿題①)。**',
    },
    {
        name: '意見要求',
        trigger: '「どう思いますか」が来た直後(What do you make of it? / What are your thoughts?)',
        observed: '2026-08-28(第94夜)、リピートアフターミーの約8分間、文法の事故はゼロだった。in which も without being dismantled も詰まらずに通過している。**その直後に What do you make of it? が来て、1文が90秒になった。** 内容は5文に分けられるもの(城の話ではない / ニュースが目的だ / 市長は記事が欲しかった / 記者が拾った / 今こうして話している)だった。**同じ夜、同じ口である。**',
        countermeasure: '**この合図が来たら、まず1文だけ言って黙る。** 「どう思うか」への答えは、最初の10語で足りる。**続きは相手が聞いてくる。** ランブルは知識過多でも語彙不足でもなく、**「全部を1文に入れないと伝わらない」という思い込みから起きている。** 5文に割ると、聞き手は5回うなずける。1文だと、1回もうなずけない。',
    },
    {
        name: '熱による短縮',
        trigger: '話題に本人が腹を立てている、または強く同意している',
        observed: '2026-08-29(第95夜)、**第83夜から12夜一度も執行されなかった「1文10語」が、初めて実弾になった。** It\'s not a conspiracy, it\'s just a fact.(9語)。Coronavirus is man-made. Laboratory leak. 100%. This is an opinion.(4文、全部5語以下)。**どちらも本人が腹を立てている場面である。** **同じ夜、ジョン・スチュワートというコメディアンを「紹介しよう」とした1文は60秒に伸びた。** 説明しようとすると伸び、言い切ろうとすると縮む。',
        countermeasure: '**この隊の1文の長さは、文法力ではなく体温で決まっている。** ランブルの原因は「全部を1文に入れないと伝わらない」という責任感で、**丁寧にやろうとするほど壊れる。** 処方は逆方向から入る — **説明する場面でも、怒っている時と同じ雑さで撃つ。** 分からなければ相手が聞き返してくる。**5文に割ると聞き手は5回うなずけるが、1文だと1回もうなずけない。**',
    },
    {
        name: '近傍着弾',
        trigger: '狙っている語をほぼ思い出せているが、1語ぶん足りないとき',
        observed: '2026-08-29(第95夜)、狙いは最初から最後まで mainstream media だった。**1発目は main social media**(SNSと衝突して、存在しない業界が生まれた)。**2発目は established media**(通じるが、この意味では誰も使わない)。**そして3発目、講師が自分の口で mainstream media と正しく言った。正解が目の前に置かれ、拾われなかった。** 同じ夜、behind the scenes → behind the back も同型である。',
        countermeasure: '**近い語が2発続いたら、そこで的を撃つのをやめて、相手に投げる。** What\'s the word I\'m looking for? / How do you say that in English? **この隊は「思い出せている感触」がある間、永遠に的の周囲を回り続ける。** そして3発目に講師が正解を置いても、自分の弾道を追っているので聞こえない。**2発で止めれば、3発目は相手の口から来る。**',
    },
    {
        name: '長期在庫',
        trigger: '検死に「拾われなかった」と記録した語が、1週間以上あとの、まったく別の話題の中で出る',
        observed: '**2026-09-02(第99夜)、この番組の在庫理論が2件同時に崩れた。** (1) **7夜の回収** — 第92夜(8/26)に **peafowling** を2回召喚し、同じ夜に講師が置いた peacock を拾わなかった個体が、**7夜後に a little bit of peacocking として正しい形で出た。** 話題は Mac と Windows で、オリーブとも孔雀とも関係がない。(2) **24夜の回収** — 第78夜(8/7)の持ち帰り英語 **off the cuff** が、講師の off the top of my head の1秒後に、本人の在庫から出た。**前兆現象「翌日投函」には「単独の語は消える。型だけが在庫に入る」と書いた。この夜が、その運用を両方から裏切った。**',
        countermeasure: '**「消えた」と判定するのをやめる。** **この番組は在庫の有無を翌夜で測ってきたが、実際の回収期間は7日と24日だった。翌夜に出なかった語は、消えたのではなく、まだ倉庫にある。** 運用を書き換える — **(1) 検死に「拾われなかった」と書いた語は、消去ではなく保留として扱う。(2) カードは翌日の復習で消さない。(3) 回収を測る窓を、翌夜から4週間に広げる。** **そして、この現象が起きる条件が1つだけ見えている — 2件とも、講師が同義の表現を先に口にした直後である。** **peacocking は本人が単独で出したが、off the cuff は off the top of my head の1秒後だった。相手の言葉が、倉庫の鍵になっている可能性がある。**',
    },
    {
        name: '台本の嘘',
        trigger: 'AIに書かせた原稿を、確認せずに音読しているとき',
        observed: '**2026-09-01(第98夜)、この男は自分がその日の昼にAIと作った英文を、一度も読み返さずに10分間音読した。本人の申告は I haven\'t checked。** **2026-09-02(第99夜)、その代償が来た。** **原稿には Since I use a Mac と書かれていた。この男は Windows ユーザーである。** **読み上げている途中で本人が止まり、No, I\'m a Windows user と訂正した。** **原稿は文法を間違えなかった。事実のほうを間違えた。** **同じ原稿には a Windows-only software(software は不可算)もあり、金具も1枚崩れている。**',
        countermeasure: '**原稿は速い。ただし原稿は、あなたが誰かを知らない。** **対策は読み返しではなく、1行だけの確認である — 「私」と書かれている文を全部拾って、それが本当に自分かを見る。** **文法のチェックは要らない(そこは崩れていない)。事実のチェックだけでいい。** **なお、この事故には副産物がある。** **黙って読んでいたら、この25分の主人公は Mac ユーザーだったことになっていた。声に出したから、本人が気づいた。** **音読は、第98夜では語彙の段差を炙り出し、第99夜では原稿の嘘を炙り出した。この装置は、2種類の欠陥を検出できる。**',
    },
    {
        name: '処方の内在化',
        trigger: '本人が、誰にも指摘されていない場面で、自分の言い間違いを自分で止める',
        observed: '**2026-09-02(第99夜)、how do I say と言いかけて、この男は自分で止まった。そして理由を口に出している — my AI is mad at me so I have to correct。そのうえで how do I put it? に言い直した。** **講師は何も言っていない。誰も横にいない。** **第83夜から16夜、この検死は how to say を封じろと書き続けてきた。第94夜に一度だけ執行され、第95夜には消えていた。** **同じ夜、締めでも同じことが起きている — I\'m interested to see と言いかけて I\'m curious to see に乗り換えた。** **そして中盤、merits and demerits(和製英語)を同じ文の中で pros and cons に言い直している。第96夜の同型は4ターンかかっていた。**',
        countermeasure: '**この現象は事故ではなく、この番組の目的そのものである。** ただし観測として注意が要る — **本人が言い直したのは、いずれも「検死で名指しされた3つの型」だけである。** **名指ししていない誤り(三単現、be動詞、限定詞の二重)は、同じ夜に1つも自己修正されていない。** **つまり内在化するのは、書いた分だけである。** **運用: 宿題は毎回3つまでに絞る。4つ目を書いた夜から、1つ目が落ちる。** **そして「怒られるから直す」は動機として弱くない。99夜、この番組がやってきたのは、外部に置いた監視を内部に移す作業だった。**',
    },
];

export const YOCHI_META = {
    title: '文法災害予知',
    subtitle: 'とにお英語調査委員会 — 長期評価',
    lead: 'この番組の器はすべて、終わった夜を扱ってきた。だが第87夜、男は「必ず来ると分かっているのに誰も備えない」を25分かけて東京について語り、その25分のあいだ、4夜連続の宿題を消化しなかった。主題と症状が一致した以上、事前の器が要る。ここは、次の25分で何が壊れるかを先に出しておく場所である。',
    disclaimer: '確率はすべて kenshi-lessons.ts の実データから計算している。手で数字は書いていない。母数(夜)は各行に併記した。分母は小さい。地震の長期評価と同じで、確率が低いことは安全を意味しない。',
};

/** 次の25分の予報文(上位3件から自動生成。文面は固定、対象だけが動く) */
export function buildForecast(window = 12): { headline: string; body: string; top: FaultAssessment[] } {
    const all = assessFaults(window);
    const top = all.slice(0, 3);
    const headline = top.length
        ? `次の25分、最も高い確率で発生するのは「${top[0].fault.name}」— ${Math.round(top[0].probability * 100)}%`
        : '評価対象なし';
    const body = top.length
        ? `直近${top[0].window}夜のうち${top[0].hits}夜で発生。最大規模は1夜${top[0].maxPerNight}件。次点は「${top[1]?.fault.name ?? '—'}」(${Math.round((top[1]?.probability ?? 0) * 100)}%)、第3位は「${top[2]?.fault.name ?? '—'}」(${Math.round((top[2]?.probability ?? 0) * 100)}%)。備えは1つでよい。上位1件だけを狙う25分にすること。`
        : '';
    return { headline, body, top };
}

/** 予知の的中率(PENDING は分母から外す) */
export function predictionScore(): { total: number; failed: number; executed: number; avoided: number; rate: number } {
    const done = PREDICTIONS.filter((p) => p.result !== 'PENDING' && p.result !== 'NO_CHANCE');
    const failed = done.filter((p) => p.result === 'FAILED').length;
    const executed = done.filter((p) => p.result === 'EXECUTED').length;
    const avoided = done.filter((p) => p.result === 'AVOIDED').length;
    return {
        total: done.length, failed, executed, avoided,
        rate: done.length === 0 ? 0 : executed / done.length,
    };
}
