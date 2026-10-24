/**
 * スピークパス 2026-10 全面改訂 — 英検1級 2次面接を「本人の口」で通すための台本庫。
 *
 * 旧版 (speak-eiken1.ts) は「I firmly believe → two main reasons → For these reasons」の
 * 誰が言ってもいい模範を30本なぞる作りだった。覚えても本番の口では持たない。
 *   - 試験官は同じ型を1日に何十本も聞く。人が見えない答えは記憶に残らない。
 *   - 1文が長く抽象的で、本人の英語が一番崩れる形(長い抽象文)をそのまま覚えさせていた。
 *   - 本番は5題から1題を選んで準備1分。30本の丸暗記は当たらない。
 *
 * 新版で覚えるのはスピーチ本文ではなく、どのお題にも持ち込める部品:
 *   1. 実話バンク (STORY_BANK) — 冒頭のつかみ。最後の1文で回収する
 *   2. 実在の事件 (各お題の facts) — 固有名詞と年
 *   3. 本人の口で崩れない短い文 (1文20語以内、主語は複数名詞・I・we・they)
 *   4. 崩れる場所の地図 (traps) — 本人の癖 (english-errors-log) から
 *   5. Q&A の4文 — 結論 → 理由 → 例え/具体 → 締め
 *
 * 旧版のデータは write/master と speak/sheet が使っているので残してある。
 * お題の言い回しは全部自作 (過去問は転載しない。eiken-output-branding)。
 */

export interface StoryHook {
    id: string;
    title: string;        // 日本語の見出し
    en: string;           // そのまま言える3〜4文
    ja: string;
    fits: string[];       // 持ち込めるお題の分野
    pivot: string;        // 冗談を論点に変える1文
}

export interface SpeakFact { label: string; detail: string }
export interface SpeakTrap { where: string; slip: string; right: string }
export interface SpeakAnswer { q: string; a: string; note?: string }
export interface SpeakLine { en: string; ja: string }

export interface SpeakTopic {
    id: string;
    category: string;
    topic: string;
    topicJa: string;
    stance: string;
    hookId: string;
    speech: string;       // 段落は \n\n 区切り
    speechJa: string;
    wordCount: number;
    pivot: string;
    facts: SpeakFact[];
    traps: SpeakTrap[];
    qa: SpeakAnswer[];
    lines: SpeakLine[];
}

// ===================== 試験の形 =====================
export const EXAM_FLOW: { step: string; time: string; what: string; plan: string }[] = [
    { step: '入室・自由会話', time: '約1分', what: '名前の確認と、今日どうやって来たか、仕事、趣味などの雑談', plan: '用意した1本 (SMALL_TALK) で一度笑ってもらう。ここで空気が決まる' },
    { step: 'お題カード', time: '準備1分', what: '社会問題のお題が5つ書かれたカードから1つ選ぶ', plan: '実話バンクから刺さる1本を先に決める。立場は10秒で決める。メモは「実話 / 立場 / 理由2つの事件名」の4行だけ' },
    { step: 'スピーチ', time: '2分', what: '選んだお題について1人で話す', plan: '実話 → 立場 → 理由2つ (各: 主張 → 実在の例 → 意味) → 実話に戻って締める' },
    { step: '質疑応答', time: '約4分', what: 'スピーチの中身や関連する話題について、試験官2人から質問', plan: '4文で返す。反論されたら半分認めてから戻す。笑いは1回だけ' },
];

export const PRINCIPLES: { title: string; body: string }[] = [
    { title: '冒頭に実話を1つ、最後にもう一度', body: '試験官が覚えて帰るのは理由ではなく人。実話で始めて、最後の1文でその実話に戻ると、2分が1本の話になる。笑いは冒頭と締めの2か所まで。' },
    { title: '具体例は実際に起きたこと', body: '「例えば大企業は」ではなく、大阪の病院、名古屋港、トヨタ。固有名詞と年が1つ入るだけで、知っている人の話に聞こえる。' },
    { title: '文は自分の口に合わせて短く', body: '1文20語以内。主語は複数名詞・I・we・they に寄せる。everybody / nobody / it を主語にすると三単現が落ちる。appreciate は受け身で崩れるので使わない。' },
    { title: '立場は1つ、ただし条件つきでいい', body: '中立に逃げると減点される。Yes, but only if... は逃げではなく知性に聞こえる。' },
    { title: 'Q&A は4文', body: '結論1文 → 理由1文 → 例えか具体例1文 → 締め1文。長く話すと崩れる、短いと点が出ない。4文がちょうどいい。' },
    { title: '時間稼ぎは2つだけ', body: "That's a tricky one. と Let me think about that for a second.。That's a good question を毎回言うのは禁止。" },
];

// 時間稼ぎ・切り返し。毎回同じ言い方にならないように、場面ごとに1つだけ持つ。
export const MOVES: { when: string; en: string; ja: string }[] = [
    { when: '考える時間が欲しい', en: "That's a tricky one. Let me think about that for a second.", ja: '難しいですね。少し考えさせてください' },
    { when: '反論された', en: "That's a fair point, and I don't disagree completely. But...", ja: 'もっともです。全部反対ではありません。でも…' },
    { when: '質問が聞き取れなかった', en: 'Sorry, could you say that again? I want to make sure I answer the right question.', ja: 'すみません、もう一度お願いします。正しい質問に答えたいので' },
    { when: '知らない話を聞かれた', en: "I'm not an expert on that, but my honest guess is...", ja: '専門ではありませんが、正直な見立てでは…' },
    { when: '立場を少しゆるめる', en: 'If I had to choose, I would say yes, but only if...', ja: 'どちらかと言えば賛成です。ただし…なら' },
    { when: '話を自分のスピーチに戻す', en: 'That actually goes back to what I said at the beginning.', ja: 'それはまさに最初に言った話に戻ります' },
    { when: '個人の経験を聞かれた', en: "Personally, I'm probably the worst example, but here's what happened to me.", ja: '私は一番悪い例かもしれませんが、実際にあったのは…' },
];

// 最初の自由会話。1本だけ用意して、一度笑ってもらう。
export const SMALL_TALK: SpeakAnswer[] = [
    {
        q: 'How did you get here today?',
        a: 'Last time, I got off the train two stations early and walked for an hour and a half. I arrived soaked in sweat. So today, I took the train all the way here. I have learned my lesson.',
        note: '一次の実話。二次の会場が同じかどうかに関係なく使える',
    },
    {
        q: 'What do you do in your free time?',
        a: 'I talk to English teachers online almost every night. I have done it for more than a hundred nights now. Some nights I connect from a park with just my phone. My neighbors probably think I am talking to myself.',
    },
    {
        q: 'Why are you taking this test?',
        a: 'Because when I grade myself, I always give myself full marks. I needed someone else to measure me. So here I am, being measured.',
        note: '実話バンクの yardstick。短く言い切って終わる',
    },
];

// ===================== 実話バンク =====================
export const STORY_BANK: StoryHook[] = [
    {
        id: 'phone',
        title: 'スマホの電源が切れなかった',
        en: "At the first stage of this exam, I couldn't figure out how to turn off my own phone. I held down the button, and an AI assistant popped up and asked how it could help. In the end, the invigilator took it away. I was the only person in the room who lost their phone.",
        ja: '一次の会場でスマホの電源の切り方が分からず、長押ししたらAIが「何かお手伝いしましょうか」。最後は試験監督に預かられた。教室で1人だけ。',
        fits: ['テクノロジー', 'AI', 'セキュリティ', 'デジタル化', '高齢者とデジタル'],
        pivot: "But that's exactly my point.",
    },
    {
        id: 'watch',
        title: '時間を遅くする100円の時計',
        en: 'The day before the first stage, I bought a watch at a 100-yen shop. I set it to two when the test started. When the test was over, it said three. The clock in the lobby said four twenty. For 100 yen, I got a watch that slows down time.',
        ja: '前日に100円ショップで時計を買った。2時に合わせたら、終わった時に3時。ロビーの時計は4時20分。100円で時間を遅くする時計を手に入れた。',
        fits: ['消費社会', '使い捨て', '品質', '環境', 'ものづくり'],
        pivot: 'It was funny for me. It is less funny for the planet.',
    },
    {
        id: 'walk',
        title: '2駅手前で降りて1時間半歩いた',
        en: 'For the first stage, I was going to arrive two hours early. So I got off the train two stations early and walked. It took an hour and a half. It was October, and I arrived soaked in sweat.',
        ja: '2時間早く着きそうだったので、2駅手前で降りて歩いた。1時間半。10月なのに汗だくで着いた。',
        fits: ['健康', '運動', '都市・車社会', '気候変動'],
        pivot: 'October is not supposed to feel like that.',
    },
    {
        id: 'dmm',
        title: '毎晩、世界のどこかの先生と話している',
        en: 'I talk to English teachers online almost every night. I have done it for more than a hundred nights, with teachers from all over the world. Some nights I connect from a park, with just my phone and no camera.',
        ja: 'ほぼ毎晩、オンラインで英語の先生と話している。100夜以上、世界中の先生と。公園からスマホ1本、カメラなしでつないだ夜もある。',
        fits: ['教育', 'オンライン学習', 'グローバル化', '英語教育', 'リモートワーク'],
        pivot: 'Twenty years ago, that would have been science fiction.',
    },
    {
        id: 'director',
        title: 'AIが書いて、俺が突き返す',
        en: 'I use AI to write English every day. But I do not let it decide. It writes a draft, and I reject the lines that do not sound like me. I am not the writer anymore. I am the director.',
        ja: '毎日AIで英語を書く。でも決めさせない。AIが下書きして、自分らしくない言い回しは突き返す。俺はもう書き手じゃなく、監督だ。',
        fits: ['AI と仕事', '創造性', '教育と AI', '著作権'],
        pivot: 'The machine writes. Someone still has to decide.',
    },
    {
        id: 'yardstick',
        title: '自分で採点すると夢の国に住む',
        en: 'When I grade my own English, I always pass. I live in La La Land. That is why I am taking this test. I needed someone else to measure me.',
        ja: '自分で自分の英語を採点すると、いつも合格。夢の国の住人になる。だからこの試験を受けている。外から測ってくれる人が要った。',
        fits: ['試験', '評価', '教育制度', '自己評価'],
        pivot: 'Nobody likes being measured. But everybody needs it.',
    },
    {
        id: 'spare',
        title: '予備の時計を黙って渡した人',
        en: 'At the first stage, a man realized he had no watch. A woman in the front row handed him her spare watch without saying a word. I was sitting in the back with a broken watch, thinking, give me one too.',
        ja: '一次の会場で、時計を忘れた男性に、一番前の女性が予備の時計を黙って渡した。一番後ろの俺は壊れた時計をしながら、俺にもくれ、と思っていた。',
        fits: ['地域', '助け合い', '準備', 'ボランティア', '社会のつながり'],
        pivot: 'That one quiet moment did more than any rule could.',
    },
    {
        id: 'seat',
        title: '自由席なんで',
        en: 'At the first stage, I asked the man next to an empty seat if I could sit there. He did not even look at me. He just said, it is open seating. Twenty people in one small room, and not one conversation.',
        ja: '一次の会場で、空いた席の隣の男性に座っていいか聞いたら、こっちを見ずに「自由席なんで」。小さな部屋に20人、会話はゼロ。',
        fits: ['都市の孤立', 'コミュニケーション', 'マナー', '地域社会'],
        pivot: 'He was not rude. He was just normal. That is the problem.',
    },
];

// ===================== お題 =====================
export const SPEAK_TOPICS: SpeakTopic[] = [
    {
        id: 'cybersecurity',
        category: 'テクノロジー',
        topic: 'Should governments spend more public money on cybersecurity?',
        topicJa: '政府はサイバーセキュリティにもっと公金を使うべきか',
        stance: 'Yes — and the money should go to people, not just to technology',
        hookId: 'phone',
        speech: "Before I begin, I have a confession. At the first stage of this exam, I couldn't figure out how to turn off my own phone. I held down the button, and an AI assistant popped up and asked how it could help. In the end, the invigilator took it away. So you're about to hear a speech on cybersecurity from the weakest link in Japan.\n\nBut that's exactly my point. I believe governments should invest more in cybersecurity, and they should spend that money on people, not just on technology. I have two reasons.\n\nFirst, cyberattacks are no longer just about stolen passwords. They stop real life. In 2022, a hospital in Osaka was hit by ransomware, and it couldn't accept new emergency patients for weeks. A year later, an attack shut down the container terminals at the Port of Nagoya for about two days. When a hospital or a port goes down, it's not a company's problem anymore. It's a public problem, and public problems need public money.\n\nSecond, attackers don't come in through the front door. They come in through the smallest door. In 2022, Toyota had to stop all of its factories in Japan for a day, because one of its suppliers was hacked. Small companies and local governments simply can't afford security experts. If governments don't help them, the whole system is only as strong as its weakest link.\n\nSo yes, governments should invest more. But firewalls alone aren't enough. They need to train people, support small businesses, and make security a part of basic education. And honestly, they could start with me. Thank you.",
        speechJa: '始める前に告白があります。この試験の一次で、私は自分のスマホの電源の切り方が分かりませんでした。ボタンを長押ししたらAIアシスタントが出てきて、何かお手伝いしましょうかと聞いてきました。結局、試験監督に預かられました。つまり、これから日本で一番弱い環だった人間がサイバーセキュリティの話をします。\n\nでも、それこそが私の言いたいことです。政府はサイバーセキュリティにもっと投資すべきで、そのお金は技術だけでなく人に使うべきです。理由は2つです。\n\n1つ目。サイバー攻撃は、もうパスワードを盗むだけの話ではありません。現実の生活を止めます。2022年、大阪の病院がランサムウェアに襲われ、何週間も新しい救急患者を受け入れられませんでした。翌年には攻撃で名古屋港のコンテナターミナルが約2日間止まりました。病院や港が止まれば、それはもう一企業の問題ではありません。公の問題で、公の問題には公のお金が要ります。\n\n2つ目。攻撃者は正面玄関からは入りません。一番小さな扉から入ってきます。2022年、トヨタは取引先1社がハッキングされたせいで、国内の全工場を1日止めました。中小企業や地方自治体には、セキュリティの専門家を雇う余裕がありません。政府が助けなければ、仕組み全体の強さは一番弱い環で決まってしまいます。\n\nだから、政府はもっと投資すべきです。ただし防火壁だけでは足りません。人を育て、中小企業を支え、セキュリティを基礎教育の一部にすべきです。正直に言えば、まず私から始めてもらってもいいくらいです。ありがとうございました。',
        wordCount: 265,
        pivot: "But that's exactly my point.",
        facts: [
            { label: '大阪急性期・総合医療センター', detail: '2022年10月、ランサムウェア攻撃で電子カルテが使えなくなり、救急の受け入れなどを停止。全面復旧は翌年1月' },
            { label: '名古屋港', detail: '2023年7月、ランサムウェアでコンテナターミナルのシステムが止まり、搬出入が約2日半止まった' },
            { label: 'トヨタと小島プレス工業', detail: '2022年3月、取引先の小島プレス工業がサイバー攻撃を受け、トヨタは国内14工場の稼働を1日停止' },
        ],
        traps: [
            { where: 'a hospital in Osaka', slip: 'hospital in Osaka (a が落ちる)', right: 'a hospital' },
            { where: "it couldn't accept", slip: "it can't accept (過去の話で現在形に戻る)", right: "couldn't" },
            { where: 'one of its suppliers was hacked', slip: 'were hacked (suppliers につられる)', right: 'one が主語なので was' },
            { where: 'the whole system is only as strong as', slip: 'the whole system only as strong (is が落ちる)', right: 'is を言う' },
            { where: 'a part of basic education', slip: 'the basic education (抽象名詞に the)', right: '冠詞なし' },
        ],
        qa: [
            { q: "Shouldn't companies be responsible for their own security?", a: 'Big companies, absolutely. Toyota can afford its own security team. But the supplier that got hacked was a much smaller company. Asking a small business to fight professional hackers on its own is like asking a corner shop to hire its own police force.', note: '例えで1回だけ笑いを取る' },
            { q: "Is it acceptable for governments to monitor people's communications for security reasons?", a: "That's where I'd draw the line. If the government can read everything, then the government becomes the biggest security risk. I think they should guard the doors, not read the letters. Any monitoring should need a court's approval.", note: 'guard the doors, not read the letters が決め台詞。スピーチの door と重なる' },
            { q: 'Should Japan be allowed to stop attackers before they strike?', a: "In limited cases, yes. If someone is about to shut down a hospital, waiting politely doesn't make sense. But it has to be strictly controlled, because in cyberspace it's really hard to tell who's behind an attack. You don't want to punch the wrong guy." },
            { q: 'Will AI make cyberattacks more dangerous?', a: "In the short term, yes. Scam emails used to be easy to spot, because the Japanese was terrible. Now AI writes perfect Japanese, so that warning sign is gone. It's an arms race, and I'd rather governments didn't show up late.", note: '日本語の詐欺メールの話は日本人の試験官にすぐ伝わる' },
            { q: 'What can ordinary people do?', a: "Three boring things. Use different passwords, update your phone, and don't click on links from a delivery company you never ordered from. And learn how to turn off your phone. I'm still working on that one.", note: '冒頭の実話を試験官が拾ってくれた時の回収' },
            { q: 'Budgets are limited. Is cybersecurity really a priority?', a: "I'd say it's one of the cheapest priorities. Prevention is almost always cheaper than recovery. A fire extinguisher costs a lot less than rebuilding the house. And when a hospital stops taking patients, the cost isn't just money." },
        ],
        lines: [
            { en: 'the weakest link', ja: '一番弱い環。仕組みの弱点を人や部品に言うとき' },
            { en: 'only as strong as its weakest link', ja: '一番弱い所で全体の強さが決まる。組織・制度の話全般に使える' },
            { en: "That's where I'd draw the line.", ja: 'そこから先は認めない。反論の線引きを1文で言う' },
            { en: 'Prevention is almost always cheaper than recovery.', ja: '予防は回復より安い。予算の質問への万能の返し' },
            { en: "It's an arms race.", ja: 'いたちごっこ。技術・規制の話で使える' },
        ],
    },
    {
        id: 'nuclear-power-japan',
        category: '環境・エネルギー',
        topic: 'Should nuclear power play a bigger role in Japan\'s energy future?',
        topicJa: '日本のエネルギーの将来で、原子力はもっと大きな役割を担うべきか',
        stance: 'Yes, but with conditions: restart only the reactors that pass strict safety checks, and grow renewables at the same time',
        hookId: 'walk',
        speech: "Before I begin, I have a confession. On the day of the first exam, I was going to arrive two hours early. So I got off two stations early and walked for an hour and a half. It was October, but it felt like August. By the time I found my seat, I looked like I had swum here.\n\nBut that's exactly my point. Our summers are getting longer, and we need clean power to survive them. I believe Japan should restart its nuclear plants, but only the ones that pass strict safety checks. I have two reasons.\n\nFirst, Japan has almost no energy of its own. We import nearly all of our oil, gas and coal from overseas. In 2022, after Russia invaded Ukraine, energy prices jumped, and electricity bills in Japan went up sharply. A country that buys almost all its fuel from abroad is always one war away from a crisis. Nuclear power can't solve that alone, but it can make us less fragile.\n\nSecond, we have made a promise on climate. In 2020, Japan promised to reach net zero emissions by 2050. Solar and wind are growing, but they stop when the sun goes down or the wind dies. Nuclear plants produce almost no carbon while they run. Without them, we will keep burning gas and coal, and keep heating the planet.\n\nOf course, we can never forget Fukushima. In 2011, the tsunami caused one of the worst nuclear accidents in history. That's why safety must come first, and local people must have a real voice. So my answer is yes, with conditions. Restart carefully, and invest in renewables at the same time. Otherwise, every October will feel like my walk to this exam. Thank you.",
        speechJa: "始める前に、ひとつ告白がある。一次試験の日、会場に2時間早く着きそうだった。だから2駅手前で降りて、1時間半歩いた。10月なのに8月みたいだった。席に着いたころには、泳いで来たみたいな姿になっていた。\n\nでも、それこそが言いたいことだ。夏はどんどん長くなっていて、それを生き延びるにはクリーンな電力が要る。日本は原発を再稼働すべきだと思う。ただし、厳しい安全審査に通ったものだけだ。理由は2つある。\n\n1つ目。日本には自前のエネルギーがほとんどない。石油もガスも石炭も、ほぼ全部を海外から輸入している。2022年、ロシアがウクライナに侵攻したあと、エネルギー価格が跳ね上がり、日本の電気代も大きく上がった。燃料をほぼ全部外国から買う国は、いつも戦争ひとつで危機に陥る。原子力だけでそれは解決できないが、もろさを減らすことはできる。\n\n2つ目。日本は気候について約束をしている。2020年、日本は2050年までに温室効果ガスの排出を実質ゼロにすると約束した。太陽光と風力は伸びているが、日が沈んだり風がやんだりすれば止まる。原発は動いている間、炭素をほとんど出さない。原発がなければ、ガスと石炭を燃やし続け、地球を温め続けることになる。\n\nもちろん、福島を忘れることは決してできない。2011年、津波は史上最悪級の原発事故を引き起こした。だからこそ安全が最優先で、地元の人たちが本当の発言権を持たなければならない。だから答えは「イエス、ただし条件つき」だ。慎重に再稼働し、同時に再生可能エネルギーに投資する。そうしなければ、毎年の10月が、俺の試験会場までの散歩みたいになる。ありがとうございました。",
        wordCount: 290,
        pivot: "But that's exactly my point.",
        facts: [
            { label: '福島第一原発事故', detail: '2011年3月、東日本大震災の津波で福島第一原子力発電所が事故を起こした。史上最悪級の原子力事故とされる' },
            { label: '日本のエネルギー輸入依存', detail: '日本は石油・天然ガス・石炭のほぼすべてを海外からの輸入に頼っている' },
            { label: 'ロシアのウクライナ侵攻とエネルギー価格', detail: '2022年2月のロシアによるウクライナ侵攻のあと、世界のエネルギー価格が高騰し、日本の電気料金も大きく上がった' },
            { label: '2050年カーボンニュートラル宣言', detail: '2020年10月、菅首相(当時)が2050年までに温室効果ガス排出を実質ゼロにすると宣言した' },
            { label: '原発の発電時の排出', detail: '原子力発電は運転中に二酸化炭素をほとんど排出しない' },
        ],
        traps: [
            { where: 'I looked like I had swum here', slip: 'I looked like I swim here（過去完了が現在に戻る）', right: 'I had swum here' },
            { where: 'Japan has almost no energy of its own', slip: 'Japan have almost no energy（三単現の s が落ちる）', right: 'Japan has' },
            { where: 'one war away from a crisis', slip: 'one war away from crisis（a が落ちる）', right: 'from a crisis' },
            { where: 'one of the worst nuclear accidents', slip: 'one of the worst nuclear accident（複数の s が落ちる）', right: 'accidents' },
            { where: 'safety must come first', slip: 'the safety must come first（抽象名詞に the を付ける）', right: 'safety must come first' },
            { where: 'local people must have a real voice', slip: 'local people must have real voice（a が落ちる）', right: 'a real voice' },
        ],
        qa: [
            { q: 'After Fukushima, how can you trust nuclear power again?', a: "Honestly, I don't trust it blindly. I trust strict checks, and I think the checks after 2011 became much tougher. It's like flying after a plane crash. We don't stop flying, but we demand better pilots and better inspections.", note: '反論。「盲信はしない」で入ると誠実に聞こえる' },
            { q: 'Why not just invest in renewable energy instead?', a: 'We should invest in renewables, and a lot. But solar panels sleep at night, and Japan has limited flat land. Nuclear can fill the gap while renewables grow. I see it as a bridge, not the final destination.', note: '二者択一を「橋」の比喩でかわす' },
            { q: 'What should Japan do with nuclear waste?', a: "That's the hardest question, and I don't think Japan has a good answer yet. We still don't have a final disposal site for high-level waste. So any town that accepts it should get real benefits and a real say. Honestly, we're living in a house without a toilet, and we need to build one.", note: '「トイレのないマンション」は日本でよく使われる比喩。難所は認めて立場は崩さない' },
            { q: 'Would you be happy to live near a nuclear plant?', a: "Happy is a strong word, but I could accept it. If it passed strict checks and the evacuation plans were realistic, I would live there. I already live in Japan, where earthquakes are part of the furniture. One more risk with a strict manager doesn't scare me much.", note: '個人質問。ウィットはここで1回' },
            { q: 'How do you think Japan\'s energy mix will look in 20 years?', a: 'I think renewables will be the biggest part. Nuclear will still be there, but probably as a supporting player. Batteries and better power grids will make the biggest difference. In 20 years, I hope the main debate is about storage, not about fear.', note: '未来予測。主役と脇役で整理' },
        ],
        lines: [
            { en: 'is always one war away from a crisis', ja: '戦争ひとつで危機に陥る状態。依存・もろさを言う時に、war を shock や bad harvest に替えて使える' },
            { en: "can't solve that alone, but it can make us less fragile", ja: '万能ではないが役に立つ、と条件つきで支持する時の型' },
            { en: "I see it as a bridge, not the final destination.", ja: '過渡期の手段として支持する時。原発以外にも、制度や技術全般に使える' },
            { en: "So my answer is yes, with conditions.", ja: '中立に逃げずに条件つき賛成を言い切る締めの一文' },
            { en: "I don't trust it blindly. I trust strict checks.", ja: '反論を受けた時、盲信していないと示しつつ立場を守る' },
        ],
    },
    {
        id: 'climate-government-or-individual',
        category: '環境・エネルギー',
        topic: 'Is fighting climate change mainly the responsibility of governments or individuals?',
        topicJa: '気候変動と戦うのは、主に政府の責任か、個人の責任か',
        stance: 'Mainly governments, because rules and prices change behavior far more than good intentions, and the individual\'s key job is to vote',
        hookId: 'watch',
        speech: "Before I begin, I have a confession. The day before this exam, I bought an analog watch at a 100-yen shop. During the test, it kept slowing down. At 4:20, it said three o'clock. So I'm probably the only person here who has literally made time go slower.\n\nBut that's exactly my point. I bought that watch because it was cheap and easy, not because I'm a bad person. Most people make choices like that every day. That's why I believe fighting climate change is mainly the job of governments. Individuals matter, but rules matter more. I have two reasons.\n\nFirst, people change when the rules change. For years, Japanese shoppers took free plastic bags without thinking. Then in July 2020, the government made stores charge for them. Very quickly, many people started carrying their own bags. Nobody gave a speech about saving the ocean. A few yen did the job.\n\nSecond, the biggest emissions don't come from our kitchens. They come from power plants, factories and cars. A single person can't build a wind farm or rebuild a power grid. Only governments can set carbon targets, fund clean energy and make companies report their emissions. The ozone layer is a good example. In 1987, countries signed the Montreal Protocol and phased out the chemicals that were destroying it. Today, the ozone layer is slowly healing. That happened because of a treaty, not because people gave up hairspray on their own.\n\nSo individuals still have one important job. We vote, and we choose the leaders who make the rules. If the rules are good enough, even my 100-yen watch will start to feel guilty. Thank you.",
        speechJa: "始める前に、ひとつ告白がある。この試験の前日、100円ショップでアナログの腕時計を買った。試験中、その時計はどんどん遅れていった。4時20分に、3時を指していた。だから、ここで文字どおり時間を遅くした人間は、たぶん俺だけだ。\n\nでも、それこそが言いたいことだ。あの時計を買ったのは、安くて手軽だったからで、俺が悪人だからじゃない。たいていの人は毎日そういう選択をしている。だから、気候変動と戦うのは主に政府の仕事だと思う。個人も大事だが、ルールのほうがもっと大事だ。理由は2つある。\n\n1つ目。ルールが変わると人は変わる。何年も、日本の買い物客は何も考えずに無料のレジ袋を受け取っていた。それが2020年7月、政府が店にレジ袋の有料化を義務づけた。すぐに、多くの人がマイバッグを持ち歩くようになった。海を守ろうと演説した人は誰もいない。数円がその仕事をした。\n\n2つ目。いちばん大きな排出は台所から出ているわけじゃない。発電所、工場、車から出ている。1人の人間には風力発電所も建てられないし、送電網も作り直せない。炭素の目標を決め、クリーンエネルギーに資金を出し、企業に排出量を報告させられるのは政府だけだ。オゾン層がいい例だ。1987年、各国はモントリオール議定書に署名し、オゾン層を壊していた化学物質を段階的に廃止した。今、オゾン層はゆっくり回復している。それは条約のおかげで、人々が自発的にヘアスプレーをやめたからじゃない。\n\nだから、個人にもひとつ大事な仕事が残っている。投票して、ルールを作るリーダーを選ぶことだ。ルールが十分よければ、俺の100円の時計でさえ、罪悪感を感じ始めるだろう。ありがとうございました。",
        wordCount: 276,
        pivot: "But that's exactly my point.",
        facts: [
            { label: 'レジ袋有料化', detail: '2020年7月1日から、日本ですべての小売店にプラスチック製レジ袋の有料化が義務づけられた。その後マイバッグを持参する人が大きく増えた' },
            { label: 'モントリオール議定書', detail: '1987年に採択された国際条約。フロンなどオゾン層を破壊する物質を段階的に廃止した' },
            { label: 'オゾン層の回復', detail: '国連などの評価で、オゾン層はゆっくり回復しつつあるとされている(2023年の科学評価報告)' },
            { label: 'フロンとスプレー', detail: 'かつてフロン(CFC)はヘアスプレーなどのスプレー缶に使われていた' },
            { label: '排出源', detail: '温室効果ガスの大部分は発電・産業・運輸から出ている' },
        ],
        traps: [
            { where: 'I bought an analog watch', slip: 'I bought a analog watch（母音の前で an にならない）', right: 'an analog watch' },
            { where: 'Most people make choices like that', slip: 'Most people makes choices（三単現の s を付けてしまう）', right: 'Most people make' },
            { where: 'Nobody gave a speech', slip: 'Nobody give a speech（過去形が現在に戻る）', right: 'Nobody gave' },
            { where: 'The ozone layer is a good example', slip: 'Ozone layer is good example（the と a が両方落ちる）', right: 'The ozone layer is a good example' },
            { where: 'the chemicals that were destroying it', slip: 'the chemicals that was destroy it（be+原形）', right: 'that were destroying it' },
        ],
        qa: [
            { q: 'Doesn\'t that let individuals off the hook?', a: "No, it gives individuals a different job. Our biggest power is not our shopping bag but our vote. One person's recycling saves a little, but one good law changes millions of people at once. I'd rather be one voter in a good system than one hero in a bad one.", note: '反論。役割を「買い物」から「投票」に移す' },
            { q: 'Do you personally do anything to reduce your carbon footprint?', a: "Yes, I walk a lot, sometimes too much. Before this exam, I walked for an hour and a half from two stations away. It was good for the planet, but not so good for my shirt. Small habits matter, but I don't pretend they will save the world.", note: 'ウィットはここ。walk の実話を短く借りる' },
            { q: 'What if governments simply don\'t act?', a: 'Then citizens and companies have to push them. Young people around the world have marched for climate action, and that pressure has changed some policies. Companies can also move first, because investors now care about emissions. But in the end, someone has to turn that pressure into law.' },
            { q: 'Should Japan introduce a higher carbon tax?', a: "I think so, but slowly and fairly. A carbon tax is the plastic bag fee on a national scale. People and companies will find cheaper, cleaner ways when carbon costs money. The key is to give some of the money back to low-income families.", note: 'スピーチの例をそのまま拡大して使い回す' },
            { q: 'Are you optimistic about the future of the climate?', a: 'Cautiously optimistic. The ozone layer shows that the world can fix a global problem when it really tries. Solar power has become much cheaper in the last 20 years. The technology is ready, and now we need the rules to catch up.', note: '未来予測。スピーチの事実に戻して説得力を出す' },
        ],
        lines: [
            { en: 'Individuals matter, but rules matter more.', ja: '個人か制度かを問うお題全般で、立場を1文で言い切る型' },
            { en: 'A few yen did the job.', ja: '小さなきっかけが大きな結果を出した、と言う時。主語を入れ替えて使える' },
            { en: "That happened because of a treaty, not because people gave up hairspray on their own.", ja: 'not because ... on their own で「自発的にではない」を言う型' },
            { en: "I'd rather be one voter in a good system than one hero in a bad one.", ja: '制度の重要性を言う決めゼリフ。教育・労働などにも流用可' },
            { en: "The technology is ready, and now we need the rules to catch up.", ja: '技術と制度のずれを言う時の締め。AI やデジタル化のお題にも使える' },
        ],
    },
    {
        id: 'aging-society-support',
        category: '社会',
        topic: 'Should the Japanese government do more to support its aging population?',
        topicJa: '日本政府は高齢化する人々への支援をもっと増やすべきか',
        stance: 'Yes, and not just with money: as services go digital, the government must provide people who help older citizens',
        hookId: 'phone',
        speech: "Before I begin, I have a confession. At the first stage of this exam, I couldn't figure out how to turn off my own phone. I held down the button, and an AI assistant kept asking how it could help me. In the end, the invigilator took my phone away. I was the only person in the room. And I'm not even old yet.\n\nBut that's exactly my point. If a man who builds his own apps can lose a fight with his phone, imagine someone who is 85. I believe the government should do more for elderly people, especially as Japan goes digital. I have two reasons.\n\nFirst, Japan has the oldest population of any major country. Nearly 30 percent of our people are 65 or older. Yet more and more services now assume that people carry a smartphone. In December 2024, Japan stopped issuing new paper health insurance cards and moved to the My Number card. For many older people, that was not convenience. It was stress. When a system goes digital, the government has to make sure older people aren't left at the door.\n\nSecond, the biggest problem for many older people isn't money. It's loneliness. In 2021, Japan appointed a minister in charge of loneliness and isolation. That shows the government already knows the problem. But a minister in Tokyo can't knock on doors in every town. Local governments need staff and volunteers who visit, call and help with simple things, like setting up a phone.\n\nSo yes, the government should do more. Not just more money, but more people. Technology should make life easier for older people, not make them feel stupid. Trust me, I know exactly how that feels. Thank you.",
        speechJa: "始める前に、ひとつ告白がある。この試験の一次で、自分のスマホの電源の切り方が分からなかった。ボタンを長押ししたら、AIアシスタントが何度も「何かお手伝いしましょうか」と聞いてきた。結局、試験監督にスマホを預かられた。教室で俺1人だけだ。しかも、俺はまだ年寄りでもない。\n\nでも、それこそが言いたいことだ。自分でアプリを作っている男がスマホとの戦いに負けるなら、85歳の人を想像してほしい。政府は高齢者のためにもっと多くのことをすべきだと思う。特に日本がデジタル化していく中ではなおさらだ。理由は2つある。\n\n1つ目。日本は主要国の中で最も高齢化した国だ。人口の30%近くが65歳以上だ。それなのに、スマホを持っていることを前提にしたサービスがどんどん増えている。2024年12月、日本は紙の健康保険証の新規発行をやめ、マイナンバーカードに移行した。多くの高齢者にとって、それは便利さではなかった。ストレスだった。仕組みがデジタルになる時、政府は高齢者が入口で取り残されないようにしなければならない。\n\n2つ目。多くの高齢者にとって最大の問題はお金ではない。孤独だ。2021年、日本は孤独・孤立対策の担当大臣を置いた。政府が問題を分かっている証拠だ。でも、東京にいる大臣が全国の町のドアをノックすることはできない。自治体には、訪ねて、電話して、スマホの設定みたいな簡単なことを手伝う職員とボランティアが必要だ。\n\nだから答えはイエス、政府はもっとやるべきだ。お金だけじゃなく、人を増やすことだ。テクノロジーは高齢者の暮らしを楽にするべきで、自分を馬鹿だと感じさせるべきじゃない。信じてほしい、その気持ちは俺がいちばんよく知っている。ありがとうございました。",
        wordCount: 287,
        pivot: "But that's exactly my point.",
        facts: [
            { label: '日本の高齢化率', detail: '日本は65歳以上の割合が約29%(2024年時点)で、主要国の中で最も高い' },
            { label: '紙の健康保険証の新規発行停止', detail: '2024年12月2日、紙の健康保険証の新規発行が終了し、マイナンバーカードを保険証として使う「マイナ保険証」を基本とする仕組みに移行した' },
            { label: '孤独・孤立対策担当大臣', detail: '2021年2月、日本政府は孤独・孤立対策の担当大臣を任命した(英国に次ぐ例として話題になった)' },
        ],
        traps: [
            { where: 'an AI assistant', slip: 'a AI assistant（母音の前で an にならない）', right: 'an AI assistant' },
            { where: 'Japan has the oldest population', slip: 'Japan has oldest population（the が落ちる）', right: 'the oldest population' },
            { where: 'that people carry a smartphone', slip: 'everyone have a smartphone（everyone 主語で三単現が崩れる。people 主語に逃がす）', right: 'people carry a smartphone' },
            { where: 'The government already knows the problem', slip: 'the government already know（三単現の s が落ちる）', right: 'knows' },
            { where: 'the biggest problem ... isn\'t money. It\'s loneliness.', slip: "It's the loneliness（抽象名詞に the を付ける）", right: "It's loneliness" },
            { where: 'the invigilator took my phone away', slip: 'the invigilator take my phone away（過去と現在が混ざる）', right: 'took' },
        ],
        qa: [
            { q: 'Japan already spends a lot on social security. Can it really afford to do more?', a: "Money is tight, I agree. That's why I'm asking for smarter help, not just bigger checks. A volunteer who visits once a week can prevent a hospital stay that costs far more. Prevention is the cheapest medicine.", note: '反論。財源の話を「予防が安い」に変える' },
            { q: 'Shouldn\'t families take care of their own elderly parents?', a: 'Families should help, and most of them want to. But many children live far away, and many older people have no children at all. If we rely only on families, the weakest people fall through the cracks. Families can be the first line, but not the only line.' },
            { q: 'Do you think older people should be forced to go digital?', a: "Encouraged, yes. Forced, no. Digital tools can be wonderful, but there should always be a human option at the counter. A phone that asks how it can help me is not the same as a person who actually helps me.", note: 'ウィット1回。フックの AI アシスタントに戻す' },
            { q: 'What can young people do to help the elderly?', a: 'They can share the one thing they have plenty of, which is digital skills. A 20-minute lesson on video calls can connect a grandmother with her grandchildren. Some towns already run smartphone classes for seniors with young volunteers. Small help like that builds bridges between generations.' },
            { q: 'How will Japan\'s aging society change in the next 20 years?', a: 'The number of very old people, over 85, will keep growing. So care workers and home visits will become even more important. I think robots and AI will help with heavy lifting and monitoring. But the human part of care, like conversation, will become more valuable, not less.', note: '未来予測。技術と人の役割分担で締める' },
        ],
        lines: [
            { en: "That was not convenience. It was stress.", ja: '短い2文の対比で強調する型。主語と名詞を入れ替えて何にでも使える' },
            { en: "aren't left at the door", ja: '取り残されない、の比喩。デジタル格差・教育格差のお題に' },
            { en: "Not just more money, but more people.", ja: '解決策が予算だけではないと言う締め。福祉・教育・防災に流用可' },
            { en: "Prevention is the cheapest medicine.", ja: '予防が一番安い、という決めゼリフ。医療・防災・セキュリティにも' },
            { en: 'Families can be the first line, but not the only line.', ja: '個人や家族の責任を認めつつ、公的支援を主張する型' },
        ],
    },
    {
        id: 'foreign-workers-japan',
        category: '仕事・経済',
        topic: 'Should Japan accept more foreign workers to deal with its labor shortage?',
        topicJa: '人手不足に対応するため、日本は外国人労働者をもっと受け入れるべきか',
        stance: 'Yes, but as neighbors and not as cheap labor: fair pay, language support and the freedom to change jobs',
        hookId: 'dmm',
        speech: "Before I begin, I have a confession. For more than 130 nights, I've talked with English teachers from all over the world for 25 minutes. Some nights, I joined from a park bench with just my phone and no camera. So my teachers have heard a lot from me, but they've never seen my face.\n\nBut that's exactly my point. People from other countries are already part of my daily life, and they're already part of Japan's. I believe Japan should accept more foreign workers. But we have to welcome them as neighbors, not just as workers. I have two reasons.\n\nFirst, Japan simply doesn't have enough workers. Our working-age population has been shrinking since the 1990s. Care homes, farms and construction sites can't find enough staff. In 2023, the number of foreign workers in Japan passed two million for the first time. Many convenience stores and factories would struggle without them. This isn't a future plan. It's already happening.\n\nSecond, if we only treat them as cheap labor, they won't stay. For years, the Technical Intern Training Program was criticized for low pay and poor treatment. In most cases, interns couldn't even change employers. The government finally decided to replace it with a new system, which is planned to start in 2027. That's a good step, but laws aren't enough. Foreign workers need Japanese classes, fair pay, and real support for their families.\n\nSo yes, Japan should accept more foreign workers. Other countries are competing for the same people, so we have to be a place they want to choose. My teachers choose to spend 25 minutes with a faceless man every night, so I know it's possible. Thank you.",
        speechJa: "始める前に、ひとつ告白がある。130夜以上、世界中の英語の先生と毎晩25分話してきた。公園のベンチから、スマホ1本でカメラなしでつないだ夜もある。だから先生たちは俺の話はたくさん聞いているけど、顔は一度も見たことがない。\n\nでも、それこそが言いたいことだ。外国の人たちはもう俺の毎日の一部で、日本の毎日の一部でもある。日本は外国人労働者をもっと受け入れるべきだと思う。ただし、労働者としてだけではなく、隣人として迎えなければならない。理由は2つある。\n\n1つ目。日本には単純に働き手が足りない。生産年齢人口は1990年代から減り続けている。介護施設も農場も建設現場も、十分な人手を見つけられない。2023年、日本で働く外国人労働者の数は初めて200万人を超えた。多くのコンビニや工場は、彼らなしではやっていけないだろう。これは将来の計画ではない。もう起きていることだ。\n\n2つ目。安い労働力としてしか扱わなければ、彼らは残らない。何年もの間、技能実習制度は低賃金とひどい待遇で批判されてきた。ほとんどの場合、実習生は勤め先を変えることすらできなかった。政府はようやくそれを新しい制度に置き換えることを決め、2027年に始まる予定だ。いい一歩だが、法律だけでは足りない。外国人労働者には日本語の授業と、公正な賃金と、家族への本当の支援が必要だ。\n\nだから答えはイエス、日本は外国人労働者をもっと受け入れるべきだ。ほかの国も同じ人材を奪い合っているから、日本は彼らが選びたくなる場所にならなければならない。俺の先生たちは毎晩、顔のない男と25分過ごすことを選んでくれている。だから、それはできるはずだ。ありがとうございました。",
        wordCount: 281,
        pivot: "But that's exactly my point.",
        facts: [
            { label: '生産年齢人口の減少', detail: '日本の15〜64歳人口は1990年代半ば(1995年ごろ)をピークに減り続けている' },
            { label: '外国人労働者200万人突破', detail: '2023年10月末時点で、日本の外国人労働者数が初めて200万人を超えた(厚生労働省の届出状況)' },
            { label: '技能実習制度への批判', detail: '技能実習制度は低賃金・劣悪な待遇・原則として転籍(勤め先の変更)ができないことなどで国内外から批判されてきた' },
            { label: '育成就労制度への移行', detail: '2024年に法律が成立し、技能実習制度を廃止して新しい「育成就労」制度に置き換えることが決まった。2027年に開始予定' },
        ],
        traps: [
            { where: 'from a park bench', slip: 'from park bench（a が落ちる）', right: 'from a park bench' },
            { where: 'they\'ve never seen my face', slip: 'they never see my face（現在完了・過去が現在に崩れる）', right: "they've never seen" },
            { where: 'the number of foreign workers ... passed two million', slip: 'the number of foreign workers were passed（be+過去形、主語の数の混乱）', right: 'the number ... passed' },
            { where: 'Japan simply doesn\'t have enough workers', slip: "Japan simply don't have（三単現が崩れる）", right: "doesn't" },
            { where: 'was criticized for low pay and poor treatment', slip: 'was criticize for the low pay（過去分詞が落ちる、抽象名詞に the）', right: 'was criticized for low pay' },
            { where: 'a faceless man', slip: 'faceless man（a が落ちる）', right: 'a faceless man' },
        ],
        qa: [
            { q: 'Some people worry that more foreign workers will increase crime. What do you think?', a: "I understand the worry, but I don't think the evidence supports it. Problems usually grow when people are isolated, underpaid and treated as outsiders. So the answer is better support, not fewer people. A neighbor who feels welcome has every reason to protect the neighborhood.", note: '反論。偏見を否定しつつ相手を見下さない' },
            { q: 'Wouldn\'t it be better to use robots and AI instead?', a: 'We should use both. Robots can lift heavy things and AI can do paperwork. But robots still can\'t hold an elderly person\'s hand or work on a muddy construction site very well. Technology can reduce the gap, but it can\'t close it alone.' },
            { q: 'Should foreign workers be allowed to bring their families?', a: "Yes, at least for skilled workers who stay long term. If we ask people to leave their families for years, we're asking them to live half a life. People who live with their families are more likely to settle down and stay. A worker with a family here becomes a neighbor, not a visitor." },
            { q: 'Have your online teachers changed how you see foreign workers?', a: "Definitely. Every night, I see that people from very different countries share the same worries about rent, family and work. My teachers have corrected my grammar more times than I can count. If they can be that patient with me, Japan can be a little more patient with them.", note: '個人的経験。ウィットはここ' },
            { q: 'Do you think Japan will become a multicultural society?', a: "In some ways, it already is. In big cities, many convenience store staff and care workers come from abroad. I think the change will spread to smaller towns over the next 20 years. The real question is not whether it happens, but whether we're ready for it.", note: '未来予測。whether で問いを言い換えて締める' },
        ],
        lines: [
            { en: "This isn't a future plan. It's already happening.", ja: '問題が遠い話ではないと言う短文の対比。人口・気候・AI のお題に' },
            { en: 'We have to welcome them as neighbors, not just as workers.', ja: 'A as B, not just as C で立場を一段深くする型' },
            { en: "Technology can reduce the gap, but it can't close it alone.", ja: '技術万能論への反論の型。教育・医療・介護に流用可' },
            { en: "So the answer is better support, not fewer people.", ja: 'X ではなく Y が解決策、と言い切る締め' },
            { en: "The real question is not whether it happens, but whether we're ready for it.", ja: '未来予測の質問を論点に変える万能の締め' },
        ],
    },
    {
        id: 'tests-real-ability',
        category: '教育',
        topic: 'Do standardized tests really measure what people can do?',
        topicJa: '標準化されたテストは人の本当の力を測れるか',
        stance: 'Not fully, but a fair yardstick beats no yardstick, as long as the test makes you use the skill',
        hookId: 'yardstick',
        speech: 'I\'d like to start by grading myself. In my own head, my English is perfect. My jokes land, and my grammar is clean. That\'s the problem with grading yourself. You end up living in La La Land. I needed someone outside my head to measure me.\n\nBut that\'s exactly my point. Standardized tests don\'t measure everything people can do. But they measure something we can\'t measure ourselves, and that\'s worth a lot. The real question is not whether to test, but what to test. I have two reasons.\n\nFirst, people train for whatever the test counts. The most popular TOEIC test in Japan has no speaking section at all. So there are office workers with high scores who freeze on a phone call. That\'s not because the test is a lie. It\'s because they trained for the test, not for the phone call. An economist named Charles Goodhart pointed out something like this. When a measure becomes a target, it stops being a good measure.\n\nSecond, without a common test, we judge people by impressions, and impressions are not fair. In 2019, Japan planned to use private English tests in university entrance exams. Then the education minister said students should take them according to their means. People were angry, because students with money in big cities had an easier path. The plan was postponed. The anger wasn\'t against testing. It was against an unfair yardstick.\n\nSo tests don\'t measure real ability perfectly. But a fair test that makes you use the skill gets very close. This interview is a good example. You can\'t fake two minutes of speaking. And after today, I\'ll finally know if I live in La La Land, or just visit on weekends. Thank you.',
        speechJa: 'まず自分で自分を採点させてほしい。頭の中では、俺の英語は完璧だ。冗談はウケるし、文法はきれいだ。これが自己採点の問題だ。夢の国に住むことになる。頭の外にいる誰かに測ってほしかった。\n\nでも、それこそが言いたいことだ。標準化されたテストは人ができることを全部は測れない。でも、自分では測れないものを測ってくれるし、それには大きな価値がある。本当の問いは「テストをするかどうか」ではなく「何をテストするか」だ。理由は2つある。\n\n1つ目。人はテストが数えるものに合わせて練習する。日本でいちばん受けられているTOEICにはスピーキングがまったくない。だから高得点なのに電話一本で固まる会社員がいる。テストが嘘だからではない。電話のためではなく、テストのために練習したからだ。経済学者のチャールズ・グッドハートがこういうことを指摘している。指標が目標になると、それは良い指標でなくなる。\n\n2つ目。共通のテストがなければ、人は印象で判断され、印象は公平ではない。2019年、日本は大学入試に民間の英語試験を使う予定だった。そこで文部科学大臣が「身の丈に合わせて」受ければいいと言った。人々は怒った。お金があって都会に住む生徒のほうが有利だったからだ。計画は延期された。怒りはテストそのものに向いていたのではない。不公平な物差しに向いていた。\n\nだから、テストは本当の力を完璧には測れない。でも、実際にその技能を使わせる公平なテストなら、かなり近くまで行ける。この面接がいい例だ。2分間しゃべるのはごまかせない。そして今日が終われば、俺が夢の国に住んでいるのか、週末に遊びに行っているだけなのか、やっと分かる。ありがとうございました。',
        wordCount: 288,
        pivot: 'But that\'s exactly my point.',
        facts: [
            { label: 'TOEIC L&Rにスピーキングなし', detail: '日本で最も受験者の多いTOEIC Listening & Reading Testはリスニングとリーディングのみ。スピーキングとライティングは別試験(TOEIC S&W)' },
            { label: 'グッドハートの法則', detail: '英国の経済学者チャールズ・グッドハートが1975年に示した考え。「指標が目標になると良い指標でなくなる」という言い回しは後に人類学者マリリン・ストラザーンが一般化したもので、スピーチでは something like this とぼかしている' },
            { label: '英語民間試験の延期(2019)', detail: '2019年10月、萩生田光一文部科学大臣が「身の丈に合わせて」と発言し批判が集中。経済格差・地域格差への懸念から、同年11月1日に大学入学共通テストへの英語民間試験導入の延期が発表された' },
            { label: '英検1級二次のスピーチ', detail: '英検1級の二次試験は面接形式で、5つのトピックから1つ選び約2分のスピーチを行う' },
        ],
        traps: [
            { where: 'An economist named Charles Goodhart', slip: 'Economist named Charles Goodhart（An が落ちる）', right: 'An economist named Charles Goodhart' },
            { where: 'When a measure becomes a target', slip: 'When measure become target（a と三単現が両方落ちる）', right: 'When a measure becomes a target' },
            { where: 'a fair test that makes you use the skill', slip: 'fair test that make you use the skill', right: 'a fair test that makes you use the skill' },
            { where: 'The plan was postponed.', slip: 'The plan postponed.（be 動詞が落ちる）', right: 'The plan was postponed.' },
            { where: 'impressions are not fair', slip: 'the impression is not fair（抽象名詞に the を付ける）', right: 'impressions are not fair' },
        ],
        qa: [
            { q: 'Aren\'t test scores just a measure of how well someone prepares for tests?', a: 'Partly, but a good test makes preparing and real ability the same thing. If a test makes you speak for two minutes, the only way to prepare is to speak. It\'s like a driving test, you can\'t pass it by reading about cars. So the answer is better tests, not fewer tests.', note: '反論を半分認めてから「良いテストは準備=実力になる」に引き戻す' },
            { q: 'Should universities stop using entrance exams and look at the whole person instead?', a: 'I think they should add to exams, not replace them. Interviews and essays show things a test can\'t, like curiosity. But "the whole person" can quietly turn into "the person with the best connections." A common exam is boring, but it\'s the one place where a farmer\'s kid and a doctor\'s kid get the same questions.', note: '公平さの論点をスピーチの2つ目の理由と接続' },
            { q: 'What do you think tests can never measure?', a: 'Whether someone keeps going after they fail. A test is a photo, but ability is more like a video. I\'ve failed things more than once, and the failing taught me more than the passing. Hopefully, this test is about to teach me nothing.', note: 'ウィット枠。最後の1文で自分に刃を向ける' },
            { q: 'Do you think AI will change the way we test people?', a: 'Yes, and it will make some tests useless overnight. If an AI can write the essay, an essay written at home measures the AI, not the student. So I think speaking tests and live interviews will become more important. In a strange way, AI is making the oldest test, talking face to face, the most modern one.', note: '未来予測。面接という今の場を肯定して終わる' },
            { q: 'Are Japanese people too focused on test scores?', a: 'In some areas, yes, especially English. Many people chase a TOEIC number and never try a real conversation. It\'s like collecting gym memberships instead of going to the gym. A score should be a receipt for the skill, not a replacement for it.', note: '比喩で締める' },
        ],
        lines: [
            { en: 'The real question is not whether to X, but what to X.', ja: '論点のすり替えを宣言する型。賛否を問う全てのお題で使える' },
            { en: 'When a measure becomes a target, it stops being a good measure.', ja: '評価・ノルマ・KPI系のお題全般に効く一文' },
            { en: 'That\'s not because X is a lie. It\'s because ...', ja: '相手を全否定せずに原因をずらす' },
            { en: 'The anger wasn\'t against X. It was against Y.', ja: '世論の反発の「本当の的」を言い当てる' },
            { en: 'A score should be a receipt for the skill, not a replacement for it.', ja: '数字と中身の関係を言う比喩。資格・学歴・数値目標に転用できる' },
        ],
    },
    {
        id: 'english-earlier-japan',
        category: '教育',
        topic: 'Should English education in Japan start at an earlier age?',
        topicJa: '日本の英語教育はもっと早い年齢から始めるべきか',
        stance: 'Yes to earlier, but only if it means more speaking time, not just more years',
        hookId: 'dmm',
        speech: 'For more than 130 nights, I\'ve talked with a teacher from another country every single night. One night, I joined the lesson from a park, on my phone, with the camera off. My teacher was on another continent, and I was sitting next to a pigeon. Honestly, the pigeon was the better listener.\n\nBut that\'s exactly my point. Starting English earlier is fine. But age is not the main problem in Japan. The problem is that students hear about English much more than they use it. So my answer is yes to earlier, but only if it means more speaking. I have two reasons.\n\nFirst, years alone don\'t create speakers. For decades, Japanese students studied English for six years in junior high and high school. Many of them still can\'t order a coffee in English. In 2020, English became an official subject for fifth and sixth graders. That\'s a good step. But if we just move the same grammar drills down to younger kids, we\'ll get the same result, only earlier.\n\nSecond, the tools for real speaking are already in the classroom. Under the GIGA School program, almost every elementary and junior high student in Japan got a computer or a tablet. Those devices can connect a child in Akita to a real person in another country in a few seconds. I know, because I do it every night. Talking to the world has never been cheaper.\n\nSo yes, start earlier, but start louder. Give children ten minutes of real conversation, not ten more pages of word lists. Ten-year-olds aren\'t scared of mistakes yet. Let\'s use that before they grow up and end up like me, talking to pigeons. Thank you.',
        speechJa: '130夜以上、俺は毎晩欠かさず外国の講師と話している。ある夜は公園から、スマホで、カメラを切ってレッスンに入った。講師は別の大陸にいて、俺はハトの隣に座っていた。正直、聞き上手だったのはハトのほうだった。\n\nでも、それこそが言いたいことだ。英語を早く始めるのはいい。でも日本の一番の問題は年齢ではない。問題は、生徒が英語を「使う」より英語「について聞く」ほうがずっと多いことだ。だから答えは、早くするのは賛成、ただしそれが話す時間を増やすことを意味するなら、だ。理由は2つある。\n\n1つ目。年数だけでは話せる人は育たない。何十年もの間、日本の生徒は中学と高校で6年間英語を勉強してきた。それでも多くの人が英語でコーヒー1杯も頼めない。2020年、英語は小学5・6年生の正式な教科になった。いい一歩だ。でも、同じ文法ドリルを年下の子に下ろすだけなら、同じ結果がもっと早く出るだけだ。\n\n2つ目。本物の会話の道具はもう教室にある。GIGAスクール構想で、日本のほぼすべての小中学生がパソコンかタブレットを手にした。その端末は、秋田の子どもを数秒で外国の生身の人間につなげられる。俺は毎晩それをやっているから知っている。世界と話すのがこれほど安かった時代はない。\n\nだから、早く始めよう。ただし、声を出して始めよう。子どもに単語リストをあと10ページではなく、本物の会話を10分あげよう。10歳の子はまだ間違いを怖がらない。その子たちが大人になって、俺みたいにハトに話しかける人間になる前に、それを生かそう。ありがとうございました。',
        wordCount: 281,
        pivot: 'But that\'s exactly my point.',
        facts: [
            { label: '小学校英語の教科化(2020)', detail: '2020年度から新学習指導要領が全面実施され、小学5・6年生で外国語(英語)が正式な教科に、3・4年生で外国語活動が始まった' },
            { label: '中高6年間の英語', detail: '従来、日本の生徒は中学3年・高校3年の計6年間英語を学ぶのが一般的だった(高校は義務教育ではないが進学率はほぼ全員)' },
            { label: 'GIGAスクール構想', detail: '小中学生に1人1台の端末を配備する文部科学省の施策。2019年に始まり、コロナ禍で前倒しされ2021年度にほぼ全国で配備された' },
        ],
        traps: [
            { where: 'on another continent', slip: 'in another continent（前置詞が in になる）', right: 'on another continent' },
            { where: 'an official subject', slip: 'official subject（an が落ちる）', right: 'an official subject' },
            { where: 'a real person in another country', slip: 'real person in another country（a が落ちる）', right: 'a real person' },
            { where: 'Ten-year-olds aren\'t scared of mistakes yet.', slip: 'Ten-year-olds not scared（be 動詞が落ちる）', right: 'Ten-year-olds aren\'t scared' },
        ],
        qa: [
            { q: 'Some people say children should master Japanese first. What do you think?', a: 'I understand the worry, but I don\'t think it\'s one or the other. Many children around the world grow up with two languages and do fine in both. Ten minutes of English a day doesn\'t steal anything from Japanese. A brain is not a suitcase that gets full.', note: '二者択一を崩して、比喩で締める' },
            { q: 'Where will schools find enough teachers who can speak English?', a: 'That\'s the real bottleneck, and it\'s why I talked about online lessons. Japan doesn\'t need a fluent teacher in every classroom. It needs a teacher who can run the conversation, and a screen that connects to a speaker. The teacher becomes the director, not the whole cast.', note: '現実的な制約を認め、スピーチの2つ目の理由で解く' },
            { q: 'Is English really necessary for every Japanese person?', a: 'Not for every job, no. But English is the door to most of the information on the internet. Without it, you\'re reading the world through someone else\'s translation. You don\'t have to live in the house, but you should have the key.', note: '全員必要かへの譲歩+鍵の比喩' },
            { q: 'Won\'t AI translation make learning English unnecessary?', a: 'It will make some tasks unnecessary, like reading a menu abroad. But a conversation through a translator is like hugging someone through a window. You get the information, but you lose the person. I use AI every day, and I still talk to real teachers every night.', note: 'AIを自分で使っている人間の言葉として言う' },
            { q: 'What was the hardest part of your online lessons?', a: 'Honestly, the first ten nights. I was so afraid of mistakes that I said almost nothing. Then I realized my teachers had heard every possible mistake already, and mine were not special. After that, I started having fun, and my English started moving.', note: 'ウィット枠。間違いが「特別じゃない」と気づいた話' },
        ],
        lines: [
            { en: 'Start earlier, but start louder.', ja: '「賛成、ただし中身を変えて」を一言で言う' },
            { en: 'Students hear about X much more than they use it.', ja: '知識と実践のずれを言う型。教育・金融リテラシー等にも使える' },
            { en: 'If we just move X down to Y, we\'ll get the same result, only earlier.', ja: '形だけの改革への反論' },
            { en: 'The teacher becomes the director, not the whole cast.', ja: '人の役割が変わる話(AI・オンライン化)に転用できる' },
            { en: 'You don\'t have to live in the house, but you should have the key.', ja: '「全員に必要か」と聞かれたときの譲歩+主張' },
        ],
    },
    {
        id: 'throwaway-culture',
        category: '環境・エネルギー',
        topic: 'Should governments take action against our throwaway culture?',
        topicJa: '政府は使い捨て文化に対して手を打つべきか',
        stance: 'Yes, because consumers cannot fix it alone when the price tag hides the real cost',
        hookId: 'watch',
        speech: 'The day before the first stage of this exam, I bought a watch at a 100-yen shop. During the exam, I set it to two o\'clock. When the real time was four twenty, my watch said three. So I may be the only person in Japan who has bought a machine that slows down time. For one hundred yen.\n\nBut that\'s exactly my point. Cheap things are not really cheap. Someone pays the difference, later, somewhere else. I believe governments should act against throwaway culture, because consumers can\'t see the real cost on the price tag. I have two reasons.\n\nFirst, a low price often hides a human cost. In 2013, a building called Rana Plaza collapsed in Bangladesh. More than a thousand garment workers died. They were making clothes for well-known Western brands. One shopper can\'t inspect a factory on the other side of the world. But governments can make companies check their factories and report.\n\nSecond, rules that put disposal into the price actually work, and Japan has proof. Since 2001, the Home Appliance Recycling Law has made people pay a recycling fee. You pay it when you throw away a TV, a fridge, a washing machine or an air conditioner. People don\'t love that fee. But it changes how we think. When you know you\'ll pay to throw something away, you think twice before you buy it. The same idea could work for clothes.\n\nSo yes, governments should act. Not by shaming shoppers, but by putting the real cost back on the price tag. My 100-yen watch looked like a bargain. In the end, it stole eighty minutes from me during an exam. That\'s the most expensive hundred yen I\'ve ever spent. Thank you.',
        speechJa: 'この試験の一次の前日、俺は100円ショップで腕時計を買った。試験中、2時に合わせた。本当の時刻が4時20分のとき、俺の時計は3時を指していた。だから俺は、日本でただ一人、時間を遅くする機械を買った人間かもしれない。100円で。\n\nでも、それこそが言いたいことだ。安いものは本当は安くない。差額は誰かが、後で、どこか別の場所で払っている。俺は、政府は使い捨て文化に対して手を打つべきだと思う。消費者は値札から本当のコストを見られないからだ。理由は2つある。\n\n1つ目。安い値段はしばしば人の犠牲を隠している。2013年、バングラデシュでラナ・プラザというビルが崩壊した。千人を超える縫製労働者が亡くなった。彼らは有名な欧米ブランドの服を作っていた。1人の買い物客が地球の反対側の工場を調べることはできない。でも政府なら、企業に工場を確認させて報告させることができる。\n\n2つ目。捨てるコストを値段に入れるルールは実際に機能するし、日本にはその証拠がある。2001年から、家電リサイクル法によって、人はリサイクル料金を払うことになっている。テレビ、冷蔵庫、洗濯機、エアコンを捨てるときに払う。誰もあの料金が好きではない。でも、考え方は変わる。捨てるのにお金がかかると分かっていれば、買う前に一度考える。同じ考え方は服にも使えるはずだ。\n\nだから、そう、政府は動くべきだ。買い物客を責めるのではなく、本当のコストを値札に戻すことで。俺の100円の時計はお買い得に見えた。結局、試験中に俺から80分を盗んだ。人生で一番高い100円だった。ありがとうございました。',
        wordCount: 287,
        pivot: 'But that\'s exactly my point.',
        facts: [
            { label: 'ラナ・プラザ崩壊(2013)', detail: '2013年4月24日、バングラデシュ・ダッカ近郊サバールの縫製工場ビル「ラナ・プラザ」が崩壊し、1,100人以上(1,134人)が死亡。欧米の衣料ブランド向けの製品を作っていた。スピーチでは more than a thousand とぼかしている' },
            { label: '家電リサイクル法(2001施行)', detail: '2001年4月施行。テレビ・冷蔵庫(冷凍庫)・洗濯機(衣類乾燥機)・エアコンの4品目について、排出時に消費者がリサイクル料金を負担する' },
            { label: 'EUの売れ残り衣料廃棄禁止(Q&Aのみ)', detail: 'EUのエコデザイン規則(ESPR, 2024年発効)で、大企業による売れ残り衣類・靴の廃棄を禁止することが決まった(適用は2026年から)。Q&Aでは has agreed to stop とだけ言い、日付は言わない' },
            { label: '衣料チェーンの古着回収(Q&Aのみ)', detail: 'ユニクロなど日本の大手衣料チェーンは店頭で古着の回収を行っている。Q&Aでは some big clothing chains とぼかしている' },
        ],
        traps: [
            { where: 'a 100-yen shop', slip: '100-yen shop（a が落ちる）', right: 'a 100-yen shop' },
            { where: 'a machine that slows down time', slip: 'machine that slow down time（a と三単現が落ちる）', right: 'a machine that slows down time' },
            { where: 'a building called Rana Plaza', slip: 'building called Rana Plaza', right: 'a building called Rana Plaza' },
            { where: 'an air conditioner', slip: 'a air conditioner（母音の前で an にならない）', right: 'an air conditioner' },
            { where: 'governments can make companies check their factories', slip: 'make companies to check（make の後に to を入れる）', right: 'make companies check' },
            { where: 'it stole eighty minutes from me', slip: 'it steals / it was steal（過去と現在が混ざる、be+原形）', right: 'it stole' },
        ],
        qa: [
            { q: 'Isn\'t it unfair to poor people if cheap goods become more expensive?', a: 'That\'s a fair concern, and I don\'t want to tax anyone\'s only winter coat. But cheap things that break quickly are often more expensive over time. Families with less money end up buying the same thing three times. A rule that makes things last longer actually protects them.', note: '最も強い反論を正面から受けて、逆に味方にする' },
            { q: 'Shouldn\'t consumers take responsibility for their own choices?', a: 'They should, but they can only choose with the information they have. A T-shirt doesn\'t come with a photo of the factory. Asking shoppers to fix the system alone is like asking passengers to fix the airplane. Governments set the rules, and then consumers can make real choices.', note: '飛行機の比喩で役割分担を言う' },
            { q: 'What could Japan do specifically about clothing waste?', a: 'It could copy its own appliance law and make brands responsible for collecting old clothes. Some big clothing chains in Japan already collect used clothes in their stores. The government could turn that from a nice idea into a rule. Good behavior is easier when it\'s the default, not a favor.', note: 'スピーチの2つ目の理由を服に具体化' },
            { q: 'Do you personally try to avoid throwaway products?', a: 'I try, but my record is not great. I just told you I bought a watch for a hundred yen. The lesson I learned is to buy fewer things, but better things. Next time, I\'ll spend a little more and get a watch that respects time.', note: 'ウィット枠。冒頭の時計にもう一度だけ触れる' },
            { q: 'Will throwaway culture get better or worse in the future?', a: 'In the short term, probably worse, because online shopping makes buying so easy. But pressure from young people and from big markets like the EU will push companies to change. The EU has already agreed to stop large companies from destroying unsold clothes. Once a big market changes the rules, companies often change everywhere, because one standard is cheaper than two.', note: '未来予測。短期は悪化、長期は改善と時間軸を分ける' },
        ],
        lines: [
            { en: 'Cheap things are not really cheap. Someone pays the difference.', ja: '価格と隠れたコストの話全般(環境・労働・食)' },
            { en: 'Asking X to fix the system alone is like asking passengers to fix the airplane.', ja: '個人責任論への反論。政府の役割を問うお題で使える' },
            { en: 'Not by shaming X, but by Y.', ja: '「どうやって」を対比で言う。賛成の中身を絞る' },
            { en: 'Good behavior is easier when it\'s the default, not a favor.', ja: '仕組みで行動を変える話(ナッジ・制度設計)' },
            { en: 'Buy fewer things, but better things.', ja: '消費・環境のお題で個人の結論を言う一文' },
        ],
    },
    {
        id: 'urban-isolation',
        category: '社会',
        topic: 'Is modern city life making people more isolated?',
        topicJa: '現代の都市生活は人をより孤立させているか',
        stance: 'Yes, cities make isolation easy, but community has not died; it shows up when people are given a reason and are ready',
        hookId: 'seat',
        speech: 'On exam day, I didn\'t know the seats were open. I asked the man next to me. He didn\'t even look at me. He said, "It\'s open seating." Three words, and that was the whole conversation. In a big city, that almost counts as a friendship.\n\nBut that\'s exactly my point. City life does make people more isolated. But it doesn\'t kill community. It just makes it quiet. I believe the answer is not to blame people, but to give them chances and places to connect. I have two reasons.\n\nFirst, isolation in Japan is now a policy problem, not just a feeling. In 2021, Japan appointed a minister in charge of loneliness, following the UK. A law on loneliness followed in 2024. Today, close to forty percent of Japanese households are just one person. When a government needs a minister for loneliness, it\'s not about bad manners anymore. It\'s about how we live.\n\nSecond, community is still there. It shows up when there\'s a reason. After the 2011 earthquake, the kanji of the year was kizuna, which means bonds. Strangers drove across the country to help. I saw it on exam day too. A woman in the front row had a spare watch. A man near her had forgotten his. She handed it to him without a word. She was just ready.\n\nSo yes, cities make it easy to be alone. But that one room had both. A man who wouldn\'t look at me, and a woman who came with a spare. The difference wasn\'t the city. It was being ready. As for me, I sat in the back row, wearing a slow 100-yen watch. I couldn\'t ask for her spare. Technically, I already had one. Thank you.',
        speechJa: '試験の日、俺は席が自由席だと知らなかった。隣の男性に聞いた。彼は俺を見もしなかった。ただ「自由席ですよ」と言っただけ。3語で、それが会話のすべてだった。大都会なら、あれはほぼ友情と言っていい。\n\nでも、それこそが言いたいことだ。都市生活は確かに人をより孤立させる。でも、つながりを殺しはしない。静かにするだけだ。答えは人を責めることではなく、つながる機会と場所を与えることだと思う。理由は2つある。\n\n1つ目。日本では孤立はもう気分の問題ではなく、政策の問題だ。2021年、日本はイギリスに続いて孤独・孤立を担当する大臣を置いた。2024年には孤独・孤立対策の法律も施行された。今、日本の世帯の4割近くが一人暮らしだ。政府が孤独担当の大臣を必要とするなら、それはもうマナーの問題ではない。暮らし方の問題だ。\n\n2つ目。つながりはまだそこにある。理由があれば姿を現す。2011年の震災の後、その年の漢字は「絆」だった。見知らぬ人たちが国を横断して助けに来た。俺はそれを試験の日にも見た。一番前の席の女性が予備の腕時計を持っていた。近くの男性は時計を忘れていた。彼女は何も言わずにそれを渡した。ただ、備えていただけだ。\n\nだから、そう、都市は一人でいることを簡単にする。でも、あの1つの部屋には両方がいた。俺を見ようともしない男性と、予備を持ってきた女性。違いは都市ではなかった。備えているかどうかだった。ちなみに俺は一番後ろの席で、遅れる100円の腕時計をしていた。予備を貸してとは頼めなかった。一応、もう1本持っていたので。ありがとうございました。',
        wordCount: 289,
        pivot: 'But that\'s exactly my point.',
        facts: [
            { label: '孤独・孤立担当大臣(2021)', detail: '2021年2月、日本は坂本哲志氏を孤独・孤立対策担当大臣に任命した。イギリスは2018年1月に孤独担当大臣を置いており、日本はそれに続いた' },
            { label: '孤独・孤立対策推進法(2024施行)', detail: '2023年に成立し、2024年4月1日に施行された' },
            { label: '単独世帯の割合', detail: '2020年の国勢調査で、一般世帯のうち単独世帯(一人暮らし)は約38%で、世帯類型として最多。スピーチでは close to forty percent とぼかしている' },
            { label: '2011年の今年の漢字「絆」', detail: '東日本大震災(2011年3月11日)の年、日本漢字能力検定協会の「今年の漢字」は「絆」だった。全国から多くのボランティアが被災地に入った' },
        ],
        traps: [
            { where: 'a minister in charge of loneliness', slip: 'minister in charge of loneliness（a が落ちる）', right: 'a minister in charge of loneliness' },
            { where: 'Community is still there. It shows up', slip: 'The community is still there. It show up（the の付けすぎと三単現の崩れ）', right: 'Community is still there. It shows up' },
            { where: 'A woman in the front row had a spare watch.', slip: 'Woman in front row had spare watch（a と the が全部落ちる）', right: 'A woman in the front row had a spare watch.' },
            { where: 'A man near her had forgotten his.', slip: 'A man forget his / A man was forget（過去完了が崩れる、be+原形）', right: 'A man near her had forgotten his.' },
            { where: 'close to forty percent of Japanese households are just one person', slip: 'Japanese household is one person（複数の s が落ちて動詞もずれる）', right: 'close to forty percent of Japanese households are' },
        ],
        qa: [
            { q: 'Isn\'t loneliness a personal problem rather than a government problem?', a: 'It starts as a personal problem, but it becomes a public one very fast. Lonely people tend to get sick more and need more care, and that costs everyone. Japan decided it was serious enough to need a minister. Waiting until loneliness becomes a hospital bill is the most expensive way to deal with it.', note: '個人の問題→公共の問題への橋をお金で架ける' },
            { q: 'Are rural areas better for community than cities?', a: 'In some ways, yes, because people know each other\'s names. But they also know each other\'s business, and some young people leave because of that. Cities give people freedom, and the countryside gives people connection. The best place is probably a city with a little bit of village inside it.', note: '田舎を美化せず両面を言う' },
            { q: 'Does social media make us more connected or more isolated?', a: 'Both, depending on how we use it. It\'s good for keeping in touch, but bad at replacing real meetings. A thousand likes can\'t hand you a spare watch. Social media should be the invitation, not the party.', note: 'ウィット枠。スピーチの予備の時計を再利用' },
            { q: 'What can individuals do to build community?', a: 'Be ready, like the woman in the front row. Carry a little extra, a spare pen, a spare umbrella, or just a spare minute. Most people are happy to help, but they wait for a reason. If you\'re the one who\'s ready, you become the reason.', note: 'スピーチの結論「備え」を行動に落とす' },
            { q: 'Do you think the man who said "It\'s open seating" was being rude?', a: 'Not really, he was probably just nervous, like the rest of us in that room. Exam days don\'t bring out the best conversation skills. Strictly speaking, he answered my question perfectly. He just gave me the information and kept the friendship for himself.', note: '冒頭の人物を見下さずに笑いに変える。刃は自分の期待のほうに向ける' },
        ],
        lines: [
            { en: 'It doesn\'t kill X. It just makes it quiet.', ja: '「なくなった」論への反論。伝統・文化・つながり系のお題で使える' },
            { en: 'When a government needs a minister for X, it\'s not about Y anymore.', ja: '個人の問題が社会問題になったことを示す型' },
            { en: 'X should be the invitation, not the party.', ja: '道具(SNS・アプリ・オンライン)の正しい位置づけを言う' },
            { en: 'Most people are happy to help, but they wait for a reason.', ja: 'ボランティア・地域・助け合いのお題で使える' },
            { en: 'The difference wasn\'t X. It was Y.', ja: '原因を言い直して結論を締める' },
        ],
    },
    {
        id: 'ai-jobs-japan',
        category: 'テクノロジー',
        topic: "Will AI take away more jobs than it creates?",
        topicJa: 'AIは生む仕事より奪う仕事のほうが多いか',
        stance: "No, not in Japan. Japan has too few workers, not too few jobs. But the new jobs will be about directing AI, not doing what it does",
        hookId: 'director',
        speech: "Let me tell you how I write English these days. An AI writes the first draft, and I send it back. Too stiff. Too polite. Try again. Then my teachers online fix what the AI and I both missed. So I'm not really a writer anymore. I'm a director with a very fast, very obedient actor.\n\nThat's why I don't think AI will take away more jobs than it creates, at least not in Japan. But the new jobs will look a lot like mine. I have two reasons.\n\nFirst, Japan's problem is not too few jobs. It's too few workers. Our working-age population has been shrinking since the mid-1990s. In April 2024, a new limit on overtime hit the trucking industry, and companies started to worry about who would deliver the packages. People call it the 2024 problem. A country like this doesn't need fewer workers. It needs each worker to do more, and AI can help with that.\n\nSecond, AI is fast, but it doesn't know what's good. Since ChatGPT came out in November 2022, anyone can get a decent draft in seconds. But a draft is not a decision. Someone still has to say, this part is wrong, this part is boring, and this part could get us sued. That judgement is the new job. The people who lose are not the ones replaced by AI. They're the ones who stop checking its work.\n\nSo no, I'm not afraid of AI taking my job. I'm a little afraid of it taking my job title. A year ago, I was a learner. Today, I'm a director. Thank you.",
        speechJa: '最近の僕の英語の書き方を話させてほしい。AIが下書きを書き、僕が突き返す。硬すぎ。丁寧すぎ。やり直し。そのあとオンラインの先生たちが、AIと僕の両方が見落とした所を直す。だから僕はもう書き手じゃない。すごく速くて、すごく素直な役者を抱えた監督だ。\n\nだから僕は、AIが生む仕事より奪う仕事のほうが多いとは思わない。少なくとも日本では。ただし新しい仕事は、僕の仕事にかなり似た形になる。理由は2つある。\n\n1つ目。日本の問題は仕事が少ないことではない。働く人が少ないことだ。生産年齢人口は1990年代半ばから減り続けている。2024年4月には残業の上限規制がトラック業界に適用され、企業は誰が荷物を運ぶのかを心配し始めた。「2024年問題」と呼ばれている。こういう国に必要なのは働き手を減らすことではない。1人1人がもっとこなせることで、AIはそれを手伝える。\n\n2つ目。AIは速いが、何が良いかは分からない。2022年11月にChatGPTが出てから、誰でも数秒でそこそこの下書きが手に入る。でも下書きは決定ではない。ここは間違い、ここは退屈、ここは訴えられるかもしれない、と誰かが言わなければならない。その判断が新しい仕事だ。負けるのはAIに置き換えられた人ではない。AIの仕事をチェックするのをやめた人だ。\n\nだから、AIに仕事を奪われるのは怖くない。肩書きを奪われるのは少し怖い。1年前、僕は学習者だった。今日、僕は監督だ。ありがとうございました。',
        wordCount: 270,
        pivot: "But that's exactly where the new jobs are.",
        facts: [
            { label: '生産年齢人口の減少', detail: '日本の生産年齢人口(15〜64歳)は1990年代半ばにピークを迎え、以後減少が続いている' },
            { label: '物流の2024年問題', detail: '2024年4月からトラックドライバーに時間外労働の上限規制が適用され、輸送力不足が懸念された。通称「2024年問題」' },
            { label: 'ChatGPT公開', detail: 'OpenAIのChatGPTは2022年11月に一般公開された' },
        ],
        traps: [
            { where: 'a director with a very fast, very obedient actor', slip: 'director with very fast actor（a が2か所落ちる）', right: 'a director ... a very fast, very obedient actor' },
            { where: 'a new limit on overtime', slip: 'new limit on overtime（a が落ちる）', right: 'a new limit on overtime' },
            { where: "AI is fast, but it doesn't know what's good", slip: "AI don't know（三単現の崩れ）", right: "it doesn't know" },
            { where: 'Someone still has to say', slip: 'someone still have to say（三単現の崩れ）', right: 'Someone still has to say' },
            { where: 'has been shrinking since the mid-1990s', slip: 'is shrink since（現在完了が崩れて be+原形）', right: 'has been shrinking since' },
            { where: 'A year ago, I was a learner', slip: 'A year ago, I am learner（過去と現在が混ざる・a が落ちる）', right: 'I was a learner' },
        ],
        qa: [
            { q: "What about people who lose their jobs, like call center workers?", a: "Some of them will lose their jobs, and we shouldn't pretend otherwise. That's why retraining should be paid for by the companies that save money with AI. Call center staff already know what an angry customer sounds like, and an AI doesn't. They're the right people to supervise the system, not the first people to fire.", note: '痛みを認めてから、失う側を「監督役の候補」に置き直す' },
            { q: "Isn't directing AI a skill that only a few people will have?", a: "I don't think so. It's closer to driving than to programming. It looks scary at first, but I learned it by arguing with an AI every night about one word. If I can do it, millions of office workers can.", note: '自分を下げて「誰でもできる」の証拠にする' },
            { q: "Do you think AI will replace English teachers?", a: "It will replace some lessons, but not the teachers. An AI can correct my grammar at three in the morning. But it can't notice that I'm tired and make me laugh. My best lessons were the nights a teacher went off the script.", note: '実体験(DMM)で答える個人質問' },
            { q: "Should the government tax companies that replace workers with AI?", a: "I don't think a robot tax is a good idea, at least for now. It would punish the companies that make Japan more productive. Taxing AI is like taxing calculators because accountants got faster. Normal taxes should pay for retraining instead.", note: '反対の立場を比喩1つで片付ける' },
            { q: "Where do you think AI will be in twenty years?", a: "I think it'll be like electricity. People will stop talking about it, because it'll be everywhere. Twenty years ago, we said we were going on the internet, and now we just say we're checking something. The interesting question won't be who uses AI, but who can still check it.", note: '未来予測。最後に本論(チェックする人)へ戻す' },
        ],
        lines: [
            { en: "A draft is not a decision.", ja: '下書きは決定ではない。AI・会議・計画、何にでも使える締め' },
            { en: "The problem is not too few jobs. It's too few workers.", ja: '「AではなくBが問題」の型。少子高齢化系のお題全般で使える' },
            { en: "The people who lose are not the ones replaced by it. They're the ones who stop checking it.", ja: '技術の負け組を定義し直す一文' },
            { en: "I'm not afraid of it taking my job. I'm a little afraid of it taking my job title.", ja: '恐れを笑いに変える締め。自分ネタで刃を自分に向ける' },
            { en: "It's closer to driving than to programming.", ja: '「難しそうに見えるが誰でも覚えられる」の比喩' },
        ],
    },
    {
        id: 'social-media-children',
        category: '倫理・法',
        topic: "Should governments restrict children's use of social media?",
        topicJa: '政府は子どものSNS利用を規制すべきか',
        stance: "Yes, but the rules should land on the companies, not on the kids or their parents",
        hookId: 'phone',
        speech: "At the first stage of this exam, I lost a fight with my own phone. I couldn't turn it off. I held down the button, and an AI assistant woke up and kept asking how it could help. The invigilator took it away. I was the only one in the room.\n\nSo I'm a grown man, and a phone beat me in an exam room. Now imagine a twelve-year-old against an app built by thousands of engineers. That's why I believe governments should restrict social media for children. But the rules should target the companies, not the kids. I have two reasons.\n\nFirst, this is not a fair fight. These apps are designed to keep people scrolling. Adults struggle with that, and children have even less chance. In 2023, the US Surgeon General warned that social media could harm the mental health of young people. When a product can hurt children, we don't leave it to the children to say no. We don't do that with alcohol or cigarettes.\n\nSecond, rules only work when they land on the right people. In 2024, Australia passed a law that bans children under sixteen from having social media accounts. The fines go to the platforms, not to the families. Compare that with Toyoake, a city in Aichi. In 2025, it asked residents to keep their free-time phone use to about two hours a day. There was no penalty, so it was more of a message than a rule. A message is nice. But a twelve-year-old doesn't read city ordinances.\n\nSo yes, governments should step in, and they should put the burden on the companies. Parents can't win this fight alone. I couldn't even win it in a quiet classroom. Thank you.",
        speechJa: 'この試験の一次で、僕は自分のスマホとの戦いに負けた。電源が切れなかった。ボタンを長押ししたら、AIアシスタントが起きて「何かお手伝いしましょうか」と聞き続けた。試験監督に取り上げられた。部屋で僕1人だけだった。\n\nつまり、大の大人が試験会場でスマホに負けたわけだ。では12歳の子どもと、何千人ものエンジニアが作ったアプリの勝負を想像してほしい。だから僕は、政府は子どものSNS利用を規制すべきだと考える。ただし規制の対象は子どもではなく企業であるべきだ。理由は2つある。\n\n1つ目。これは公平な戦いではない。こういうアプリは、人をスクロールさせ続けるように設計されている。大人でも苦労するし、子どもにはもっと勝ち目がない。2023年、アメリカの公衆衛生局長官は、SNSが若者のメンタルヘルスを害しうると警告した。子どもを傷つけうる商品について、断るのを子どもに任せたりはしない。酒やタバコでもそうはしない。\n\n2つ目。ルールは正しい相手に向けられたときにしか効かない。2024年、オーストラリアは16歳未満のSNSアカウント保有を禁じる法律を成立させた。罰金を払うのは家庭ではなくプラットフォームだ。これを愛知県の豊明市と比べてほしい。2025年、豊明市は住民に、余暇のスマホ利用を1日2時間程度にするよう呼びかけた。罰則はなく、ルールというよりメッセージだった。メッセージは結構だ。でも12歳は市の条例を読まない。\n\nだから、政府は介入すべきで、その負担は企業に負わせるべきだ。親だけではこの戦いに勝てない。僕は静かな教室ですら勝てなかった。ありがとうございました。',
        wordCount: 288,
        pivot: "Now imagine a twelve-year-old against an app built by thousands of engineers.",
        facts: [
            { label: '米公衆衛生局長官の勧告', detail: '2023年5月、米国の公衆衛生局長官(Surgeon General)がSNSと若者のメンタルヘルスに関する勧告を出し、害のリスクを警告した' },
            { label: 'オーストラリアの16歳未満SNS禁止法', detail: '2024年11月にオーストラリア議会が16歳未満のSNSアカウント保有を禁じる法律を可決(2025年12月施行)。罰金の対象はプラットフォーム企業で、子どもや親には罰則がない' },
            { label: '豊明市のスマホ条例', detail: '愛知県豊明市が2025年に、仕事や学校以外のスマホ利用を1日2時間以内の目安とするよう促す条例を制定。罰則はない' },
        ],
        traps: [
            { where: 'an AI assistant woke up', slip: 'a AI assistant / AI assistant（an が崩れる）', right: 'an AI assistant' },
            { where: 'an app built by thousands of engineers', slip: 'a app（母音の前の a）', right: 'an app' },
            { where: 'a twelve-year-old doesn\'t read city ordinances', slip: "twelve-year-old don't read（a 脱落+三単現）", right: "a twelve-year-old doesn't read" },
            { where: 'Toyoake, a city in Aichi', slip: 'Toyoake, city in Aichi（a が落ちる）', right: 'a city in Aichi' },
            { where: 'I was the only one in the room', slip: "I'm the only one（過去の話に現在が混ざる）", right: 'I was the only one' },
            { where: 'These apps are designed to keep people scrolling', slip: 'These apps designed to（be 動詞の脱落）', right: 'These apps are designed' },
        ],
        qa: [
            { q: "Isn't this the parents' job, not the government's?", a: "It's both, but parents are outnumbered. One parent against an app that updates every week isn't a fair fight. It's like asking parents to test every bottle in a shop for poison. We make rules for the shop, and then parents can do the rest.", note: '親の責任論を、店と毒の比喩で企業側に戻す' },
            { q: "Children can lie about their age. How would you enforce a ban?", a: "Some children will get around it, and that's fine. A law doesn't need to be perfect to work. Plenty of teenagers drink before twenty, but the drinking age still changes what's normal. The point is to make the default safer, not to catch every kid.", note: '「抜け穴がある」反論への定番の返し' },
            { q: "Doesn't social media also help children, for example kids who feel lonely?", a: "Yes, and that's why I'd regulate the design, not just the age. Chatting with a friend online is not the problem. The problem is the endless feed that decides what you see next. Let kids keep the chat, and take away the slot machine.", note: 'ウィット枠。条件つき賛成で知的に見せる' },
            { q: "How do you manage your own phone use?", a: "Badly, if I'm honest. But one trick works for me. I go for long walks and keep the apps closed. If an adult needs tricks like that, children need real rules.", note: '個人質問。自虐から本論へ戻す' },
            { q: "Do you think Japan will follow Australia?", a: "I think Japan will move slowly, but it will move. Japan usually waits to see what works in other countries first. Australia is basically running the experiment for all of us. If the results are good, I'd expect Japan to follow within a few years.", note: '未来予測。断定しすぎず、でも立場は出す' },
        ],
        lines: [
            { en: "This is not a fair fight.", ja: '個人 vs 企業・国の構図を一言で示す' },
            { en: "The rules should land on the companies, not on the kids.", ja: '規制の向き先を指定する。環境・消費系のお題にも流用可' },
            { en: "A law doesn't need to be perfect to work.", ja: '「抜け道がある」反論への返し' },
            { en: "Let them keep the chat, and take away the slot machine.", ja: '良い部分は残し、依存の仕組みだけ取る、の比喩' },
            { en: "A message is nice. But a twelve-year-old doesn't read city ordinances.", ja: '罰則のない呼びかけの限界を突く型' },
        ],
    },
    {
        id: 'four-day-week',
        category: '仕事・経済',
        topic: "Should Japanese companies adopt a four-day work week?",
        topicJa: '日本企業は週休3日制を導入すべきか',
        stance: "Yes, as an option for jobs that can be measured by results, not as one rule for every job",
        hookId: 'dmm',
        speech: "For more than a hundred and thirty nights, I've had a twenty-five-minute English lesson with teachers from all over the world. One night, I joined from a park, on my phone, with the camera off. My teacher was in another country. Nobody could see where I was. And the lesson worked just fine.\n\nThat's why I think Japanese companies should offer a four-day work week, at least for jobs where results can be measured. The question is not how long people sit at their desks. It's what they finish. I have two reasons.\n\nFirst, the experiments are already in, and the results are good. In 2019, Microsoft Japan gave its staff Fridays off for one month. It reported that productivity per employee went up by about forty percent. In 2022, around sixty companies in the UK tried a four-day week for six months, and most of them decided to keep it. People don't get lazy when they get a day back. They get focused.\n\nSecond, Japan needs this to keep its workers. We have fewer young people every year, and they can choose where they work. In April 2025, the Tokyo Metropolitan Government started letting its own staff work four days a week. When a huge public employer does that, private companies can't say it's impossible anymore. If they don't offer flexibility, someone else will.\n\nOf course, nurses and convenience store staff can't work from a park. So the four-day week should be a choice, not one rule for every job. But for the rest of us, it's time to measure work by results. My lessons are only twenty-five minutes long, and nobody has ever asked me where I was sitting. Thank you.",
        speechJa: '130夜以上、僕は毎晩、世界中の講師と25分の英語レッスンを受けてきた。ある夜は公園から、スマホで、カメラを切ってつないだ。講師は別の国にいた。僕がどこにいるかは、誰にも見えなかった。それでもレッスンは何の問題もなく成り立った。\n\nだから僕は、日本企業は週休3日制を選べるようにすべきだと思う。少なくとも成果で測れる仕事については。問題は机に何時間座っているかではない。何を仕上げたかだ。理由は2つある。\n\n1つ目。実験の結果はもう出ていて、良い結果だ。2019年、日本マイクロソフトは1か月間、社員の金曜日を休みにした。社員1人あたりの生産性は約40%上がったと報告された。2022年には、イギリスの約60社が6か月間週4日勤務を試し、そのほとんどが継続を決めた。人は1日返してもらっても怠けない。集中するのだ。\n\n2つ目。日本は働き手を引き止めるためにこれが必要だ。若者は毎年減っていて、彼らは働く場所を選べる。2025年4月、東京都は自らの職員に週4日勤務を認め始めた。巨大な公的雇用主がそれをやるなら、民間企業はもう「無理だ」とは言えない。柔軟さを提供しなければ、他の誰かが提供する。\n\nもちろん、看護師やコンビニの店員は公園から働けない。だから週休3日は選択肢であるべきで、全職種に一律のルールではない。でも残りの僕たちについては、成果で仕事を測る時だ。僕のレッスンはたった25分で、どこに座っているのかと聞かれたことは一度もない。ありがとうございました。',
        wordCount: 283,
        pivot: "And the lesson worked just fine. That's the whole point.",
        facts: [
            { label: '日本マイクロソフトの週勤4日実験', detail: '2019年8月、日本マイクロソフトが「ワークライフチョイス チャレンジ2019夏」で金曜を休業日にした。社員1人あたりの売上(生産性)が前年同月比で約40%増えたと発表した' },
            { label: 'イギリスの週4日勤務の大規模試行', detail: '2022年6月から約6か月、イギリスの61社が週4日勤務を試行し、終了後に大半(56社)が継続を決めた' },
            { label: '東京都の週休3日', detail: '東京都は2025年4月から、職員がフレックスタイム制を使って週休3日を選べる制度を始めた' },
        ],
        traps: [
            { where: 'a twenty-five-minute English lesson', slip: 'twenty-five-minute English lesson（a が落ちる）', right: 'a twenty-five-minute English lesson' },
            { where: 'I joined from a park', slip: 'I joined from park（a が落ちる）', right: 'from a park' },
            { where: 'When a huge public employer does that', slip: 'a huge public employer do that（三単現の崩れ）', right: 'does that' },
            { where: 'most of them decided to keep it', slip: 'most of them decide to keep it（過去と現在が混ざる）', right: 'decided' },
            { where: 'the pigeon never complained', slip: 'the pigeon never complain（過去形が落ちる）', right: 'never complained' },
        ],
        qa: [
            { q: "Wouldn't a four-day week hurt customer service?", a: "Not if companies rotate the days off. The office can stay open five days, even if each person works four. Restaurants have always done this, because the chef doesn't work every day, but the restaurant does. It's a scheduling problem, not a reason to say no.", note: '反論を「シフトの問題」に縮める' },
            { q: "Doesn't remote work make people lonely?", a: "It can, so I wouldn't make it all or nothing. Two or three days in the office is enough to keep a team together. My lessons are all online, but I still feel close to some of my teachers. Connection comes from talking, not from sitting in the same building.", note: '個人体験(DMM)で反論をかわす' },
            { q: "Isn't it unfair to workers who can't work remotely, like nurses?", a: "It is unfair, and that's why they need a different deal. Nurses may not get a four-day week, but they can get shorter shifts or higher pay. Fairness doesn't mean the same deal for every job. It means a fair deal for every job.", note: '不公平を認めた上で定義を言い直す' },
            { q: "Would you personally want a four-day week?", a: "I'd love one, but I'd probably spend the extra day studying English. That's the funny thing about free time. People don't waste it, they spend it on what they really care about. For me, that means arguing with my teachers about idioms.", note: 'ウィット枠。単語オタクの自虐' },
            { q: "Will the four-day week become normal in Japan?", a: "I think it'll be common in big companies within about ten years. The labor shortage will force it. Companies used to compete with salaries, and now they're starting to compete with time. Once a few big names do it, the rest will have to follow.", note: '未来予測。人手不足で論拠をつなぐ' },
        ],
        lines: [
            { en: "The question is not how long people work. It's what they finish.", ja: '時間より成果、の型。教育・働き方系で使える' },
            { en: "People don't get lazy when they get a day back. They get focused.", ja: '「怠ける」反論を先回りでつぶす' },
            { en: "It's a scheduling problem, not a reason to say no.", ja: '反論を実務の問題に縮める万能の返し' },
            { en: "If they don't offer it, someone else will.", ja: '競争の圧力を一言で示す' },
            { en: "Companies used to compete with salaries. Now they compete with time.", ja: '変化を対比で言い切る' },
        ],
    },
    {
        id: 'ai-education-yardstick',
        category: '教育',
        topic: "Will AI do more harm than good in education?",
        topicJa: 'AIは教育に益より害をもたらすか',
        stance: "No, more good than harm, but only if schools keep a human yardstick. AI can be the tutor, but it can't be the judge",
        hookId: 'yardstick',
        speech: "I'm taking this exam for a simple reason. When I grade myself, I live in La La Land. In my head, my English is beautiful. Then I listen to a recording of my lessons, and La La Land closes for the day. I need a yardstick from outside. That's why I'm here, sweating in front of both of you.\n\nI believe AI will do more good than harm in education. But only if schools keep that outside yardstick. I have two reasons.\n\nFirst, AI gives every student a private tutor. For most of history, only rich families could afford one. Now a student in a small town can ask a question at midnight and get a patient answer. In July 2023, Japan's education ministry published guidelines on generative AI in schools. It didn't ban AI. It tried to teach students how to use it. I think that was the right call.\n\nSecond, the real danger is not cheating. It's flattery. AI tools tend to be very polite. Ask one about your essay, and it often starts with praise. Students who only listen to AI will move to La La Land and never leave. In January 2023, New York City's public schools blocked ChatGPT. A few months later, they lifted the ban. Blocking didn't work. So the answer is better testing, not banning. We need more speaking tests, more handwritten work, and more questions in the room, like this one.\n\nSo yes, let students learn with AI. But keep a human in the room to measure what they really know. AI can be the tutor. It just can't be the judge. And today, the judges are you. Please be gentle. Thank you.",
        speechJa: '僕がこの試験を受ける理由は単純だ。自分で自分を採点すると、僕は夢の国に住んでしまう。頭の中では僕の英語は美しい。そこでレッスンの録音を聞くと、夢の国はその日は閉園になる。外からの物差しが要る。だから僕は今ここで、お2人の前で汗をかいている。\n\nAIは教育にとって害より益のほうが大きいと思う。ただし、学校がその外の物差しを手放さない場合に限る。理由は2つある。\n\n1つ目。AIはすべての生徒に家庭教師をつける。歴史の大半で、家庭教師を雇えたのは裕福な家庭だけだった。今は地方の小さな町の生徒でも、真夜中に質問して辛抱強い答えをもらえる。2023年7月、文部科学省は学校での生成AI利用に関するガイドラインを出した。禁止はしなかった。生徒に使い方を教えようとした。正しい判断だったと思う。\n\n2つ目。本当の危険はカンニングではない。お世辞だ。AIはとても礼儀正しい傾向がある。作文について聞くと、たいてい褒めることから始める。AIの言うことだけを聞く生徒は夢の国に移り住み、二度と出てこない。2023年1月、ニューヨーク市の公立学校はChatGPTをブロックした。数か月後、その禁止を解除した。ブロックは効かなかった。だから答えは禁止ではなく、より良い試験だ。スピーキングテストを増やし、手書きの課題を増やし、この場のような対面の質問を増やすべきだ。\n\nだから、生徒にはAIで学ばせればいい。ただし、本当に何が分かっているかを測る人間を部屋に残すこと。AIは家庭教師にはなれる。でも審判にはなれない。そして今日の審判はお2人だ。お手柔らかに。ありがとうございました。',
        wordCount: 281,
        pivot: "But that's exactly why AI can't be the judge.",
        facts: [
            { label: '文部科学省の生成AIガイドライン', detail: '2023年7月、文部科学省が「初等中等教育段階における生成AIの利用に関する暫定的なガイドライン」を公表した。一律禁止ではなく、適切な活用と情報活用能力の育成を求める内容' },
            { label: 'ニューヨーク市公立学校のChatGPT遮断と解除', detail: '2023年1月、ニューヨーク市教育局が学校の端末・ネットワークでChatGPTへのアクセスをブロックし、同年5月に解除した' },
        ],
        traps: [
            { where: 'for a simple reason', slip: 'for simple reason（a が落ちる）', right: 'for a simple reason' },
            { where: 'a recording of my lessons', slip: 'recording of my lessons（a が落ちる）', right: 'a recording' },
            { where: 'AI gives every student a private tutor', slip: 'AI give every student private tutor（三単現の崩れ+a 脱落）', right: 'AI gives every student a private tutor' },
            { where: 'Japan\'s education ministry', slip: "the Japan's education ministry（the の付けすぎ）", right: "Japan's education ministry" },
            { where: 'Blocking didn\'t work', slip: "Blocking don't work（過去の話が現在形に戻る）", right: "Blocking didn't work" },
            { where: 'the real danger is not cheating. It\'s flattery', slip: 'the cheating / the flattery（抽象名詞への the の付けすぎ）', right: 'not cheating. It\'s flattery' },
        ],
        qa: [
            { q: "Won't students just use AI to do their homework?", a: "Some will, and homework as we know it may not survive. But that tells us something about the homework. If an AI can finish it in ten seconds, it was probably testing the wrong thing. Schools should move the thinking into the classroom and use homework for practice.", note: '反論を「宿題の設計ミス」に置き換える' },
            { q: "Should AI be used to grade students' work?", a: "For spelling and simple grammar, yes, it saves teachers a lot of time. But not for the final grade. A machine can count mistakes, but it can't tell when a student took a brave risk. I'd let AI be the assistant referee, not the referee.", note: 'ウィット枠。本論の「審判」比喩を続ける' },
            { q: "How do you use AI in your own learning?", a: "I use it every day, mainly to argue with. It writes a sentence, and I tell it why I don't like it. That argument teaches me more than the answer does. But I never let it tell me how good I am.", note: '個人質問。directorの実話で本論に戻す' },
            { q: "Could AI widen the gap between rich and poor students?", a: "It could, if only some schools have good devices and teachers who know how to use them. The tool itself is cheap, and that's the good news. The expensive part is the teacher who can guide students. So governments should spend money on training teachers, not just on tablets.", note: '格差論に「道具ではなく教員」で答える' },
            { q: "Will teachers still be needed in twenty years?", a: "Yes, but their job will look different. They'll spend less time explaining and more time asking questions. A good teacher will be more like a coach than a textbook. Textbooks never got me out of La La Land, but my teachers did.", note: '未来予測。冒頭の La La Land で締める' },
        ],
        lines: [
            { en: "When I grade myself, I live in La La Land.", ja: '自己評価の甘さを一言で。試験・評価系のお題のつかみ' },
            { en: "The real danger is not X. It's Y.", ja: '論点をずらして知的に見せる型' },
            { en: "AI can be the tutor. It just can't be the judge.", ja: '役割分担で立場を言い切る。医療・法律系にも流用可' },
            { en: "If an AI can finish it in ten seconds, it was testing the wrong thing.", ja: '課題・試験の設計を問い直す一文' },
            { en: "I'd let it be the assistant referee, not the referee.", ja: '補助はOK、最終判断はNG、の比喩' },
        ],
    },
];

export function getHook(id: string): StoryHook | undefined {
    return STORY_BANK.find((h) => h.id === id);
}

export const SPEAK_CATEGORIES = Array.from(new Set(SPEAK_TOPICS.map((t) => t.category)));
