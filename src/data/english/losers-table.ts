/**
 * The Losers' Table -- 5-episode conversation series for Memoria (Requiem #23)
 *
 * ■ これは新しい物語ではない
 * 既存22シナリオの住人を、1つのテーブルに座らせただけの話である。新キャラはゼロ。
 * 舞台は requiem-world.ts の WORLD.bar に既に書いてある店 --
 * 「席が6つだけの店。月曜の夜、その週に失ったものを言う。一番損していない者が全員分払う」。
 * town-state.ts の FESTIVALS は scenario:'losers-table' を毎週月曜の行事として参照しているが、
 * その中身は今まで存在しなかった。ここがその中身である。
 *
 * ■ 融合しているもの
 *  - 新聞の連載「The Losers' Table」(newspaper.ts / 全3章) の house rule をそのまま輸入する。
 *    連載の卓は海の向こうの街で、Ito と Mrs Aoki の卓。掟だけがTONIO TOWNに渡ってきた。
 *  - 店主は Flo。新聞の VOICES で「29年ハイウェイ沿いのダイナーを開けてきた」と答えている人。
 *    ロードトリップ(#20)で1回しか出ていない人を、町の側に引き戻す。
 *  - 5晩の卓には、これまで一度も同じ場面に立ったことのない人間だけを座らせる。
 *    RELATIONS の 'echo'(別のシナリオで同じことを言っている者どうし)を、実際に会わせる:
 *      第2夜 Grandpa Stan × Vernon  -- 「寝てない。目を休めてるんだ」
 *      第3夜 Hank × Donna           -- クリップボードを持つ者どうし
 *      第4夜 Reggie × Jenna         -- 抗議しながら毎回来る者どうし
 *      第2夜 Brody × Walter         -- 待合室を肯定する男と、待合室の古参
 *
 * ■ 月曜の掟を5晩に伸ばした理由(作中の理由)
 * 7月最終週だけ、卓は5晩連続で開いた。何かが毎日無くなった週だったから。
 * 火曜、誰も何も失わなかった時点で卓は閉じ、月曜だけに戻る。
 *
 * ■ 町の物理法則の扱い
 * town-state.ts の文法気象は「実際に起きた誤り」にしか使えない(捏造禁止)。
 * だからこの5晩に超常現象は起こさない。第4夜で Devon が「最近この町の天気はおかしい」と
 * 言い出し、全員に黙らされる -- 町の物理は作中では「変な奴の説」の位置に置いてある。
 *
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK, fillers, false starts.
 * Format: ~18-22 lines per night per language.
 */

export interface LosersTableEntry {
    id: string;
    date: string;
    title: string;
    titleJa: string;
    content: string;
    series: string;
    seriesTitle: string;
    conversation: {
        english: Array<{ speaker: 'male' | 'female'; text: string }>;
        japanese: Array<{ speaker: 'male' | 'female'; text: string }>;
        generatedAt: Date;
        tone: string;
    };
    tone: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const generatedAt = new Date('2026-07-24T12:00:00.000Z');

export const losersTableEntries: LosersTableEntry[] = [
    // ============================================================
    // NIGHT 1 (Jul 24) -- THE HOUSE RULE
    // Flo / Marcus / Vernon / Wanda / Reggie / Ms. Reyes
    // ============================================================
    {
        id: 'losers-day1',
        date: '2026-07-24',
        title: 'Night 1: The House Rule',
        titleJa: '第1夜: 家の掟',
        content: 'フローのダイナーの奥、席が6つだけのボックス席。その週に失ったものを申告し、一番損していない者が全員分払う。レイエス先生が初めて6番目の席に座り、掟を教わる。ヴァーノンはDMVで8時間失ったと主張し、却下される。マーカスは勝った議論に負ける。そして先生は「今週は何も失っていません」と言いかけて、自分が何を失ったかに気づく。',
        series: 'losers-table',
        seriesTitle: "The Losers' Table",
        tone: 'humorous',
        tags: ['ridgeway', 'losers-table', 'crossover', 'comedy', 'small town'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Flo: Booth's open. Six seats, same as it has been for twenty-nine years. Take one before somebody's cousin turns up." },
                { speaker: 'male', text: "Reggie: I would like it on the record that I did not want to come tonight." },
                { speaker: 'female', text: "Flo: Reggie, you have said that every week for four years. At this point it is just how you say hello." },
                { speaker: 'male', text: "Marcus: Ms. Reyes, you took the sixth seat. That means you go last, and you are not allowed to pass." },
                { speaker: 'female', text: "Ms. Reyes: Nobody mentioned that the seating came with consequences." },
                { speaker: 'female', text: "Wanda: There is one rule and it is short. You say what you lost this week. Then we decide who lost the least, and that person pays for everybody." },
                { speaker: 'male', text: "Reggie: And there is no appeal. She is going to tell you there is no appeal. She spends her free time at the courthouse." },
                { speaker: 'female', text: "Wanda: I sit on juries, Reggie. I am not a judge. Also I brought a pie, so watch your tone." },
                { speaker: 'male', text: "Vernon: I will go first. Eight hours at the DMV on Tuesday. Whole day, gone." },
                { speaker: 'female', text: "Wanda: Vernon, you do not have any business at the DMV. You have not had business there since March." },
                { speaker: 'male', text: "Vernon: I have a chair there." },
                { speaker: 'female', text: "Flo: Docked. You cannot claim time you went out looking for, hon. That is a purchase." },
                { speaker: 'male', text: "Marcus: All right, me. There is a sign-up sheet for the block party, and Donna has had my name on the wrong line for two years. Newcomers at the bottom. So this week I finally said something." },
                { speaker: 'male', text: "Reggie: And?" },
                { speaker: 'male', text: "Marcus: She agreed with me, apologized, and moved me one line further down. I am thirty-one. I own a house on that street." },
                { speaker: 'male', text: "Reggie: So you lost an argument you won. That is not bad for a man who has never lost anything in his life." },
                { speaker: 'female', text: "Ms. Reyes: I think I have to pass, actually. It has been a good week. Quiet. I finished the summer reading list, the copier is working, I have not lost anything at all except -- " },
                { speaker: 'female', text: "Flo: There it is. Keep going." },
                { speaker: 'female', text: "Ms. Reyes: I assigned a personal essay after the Homecoming game last fall. Fourteen out of twenty-two students wrote about the same three hours. And they have written about that game in every single assignment since. In June I asked for a persuasive essay and I got the fourth quarter again, twenty-two times. I have lost my syllabus. Not the paper. The thing itself. They are not going to give it back." },
                { speaker: 'female', text: "Wanda: That is a loss." },
                { speaker: 'male', text: "Reggie: That is the biggest one at this table and she almost sat there and said nothing." },
                { speaker: 'female', text: "Flo: Then Reggie is not paying tonight. Vernon is." },
                { speaker: 'male', text: "Vernon: I lost eight hours." },
                { speaker: 'female', text: "Flo: You spent eight hours. There is a difference, and you have known it longer than anybody here." },
            ],
            japanese: [
                { speaker: 'female', text: "Flo: ボックス席、開いてるよ。席は6つ、29年間ずっと同じ。誰かの親戚が来る前に座っときな。" },
                { speaker: 'male', text: "Reggie: 記録に残しておいてほしいんだが、俺は今夜、来たくなかった。" },
                { speaker: 'female', text: "Flo: レジー、それ4年間毎週言ってるよ。もうあんたの挨拶でしょ。" },
                { speaker: 'male', text: "Marcus: レイエス先生、6番目の席に座りましたね。それ、順番が最後で、パスできない席です。" },
                { speaker: 'female', text: "Ms. Reyes: 座席に罰則が付いてるとは誰も言ってくれませんでした。" },
                { speaker: 'female', text: "Wanda: 掟はひとつ、それも短いの。今週失ったものを言う。それから、一番損してない人を決めて、その人が全員分払う。" },
                { speaker: 'male', text: "Reggie: で、不服申し立ては無い。この人は必ず「不服申し立ては無い」って言うぞ。暇さえあれば裁判所にいる人だからな。" },
                { speaker: 'female', text: "Wanda: 私は陪審員よ、レジー。判事じゃない。あとパイ持ってきたから、口の利き方に気をつけて。" },
                { speaker: 'male', text: "Vernon: わしから行く。火曜、DMVで8時間。丸一日、消えた。" },
                { speaker: 'female', text: "Wanda: ヴァーノン、あなたDMVに用事なんて無いでしょ。3月から一件も無いはずよ。" },
                { speaker: 'male', text: "Vernon: あそこには椅子がある。" },
                { speaker: 'female', text: "Flo: 減点。自分から出向いて取りに行った時間は損失に数えないの。それは買い物だよ。" },
                { speaker: 'male', text: "Marcus: じゃあ俺。ブロックパーティーの申込用紙、ドナが俺の名前を2年間ずっと違う行に書いてる。新参は一番下って欄。で、今週やっと言ったんです。" },
                { speaker: 'male', text: "Reggie: それで?" },
                { speaker: 'male', text: "Marcus: 同意してくれて、謝ってくれて、俺の名前をもう1行下げた。31歳ですよ。その通りに家を持ってるんですけどね。" },
                { speaker: 'male', text: "Reggie: 勝った議論に負けたわけだ。人生で何も失ったことのない男にしては上出来じゃないか。" },
                { speaker: 'female', text: "Ms. Reyes: 私はパスさせてください。いい一週間だったので。静かで。夏の課題図書リストも仕上げたし、コピー機も直ったし、失ったものなんて何も -- " },
                { speaker: 'female', text: "Flo: はい出た。続けて。" },
                { speaker: 'female', text: "Ms. Reyes: 去年の秋、ホームカミングの試合のあとに自由作文を出したんです。22人中14人が、同じ3時間について書いた。それ以来、どの課題でもあの試合のことを書いてくる。6月に説得文を課したら、また第4クォーターが22枚。私、シラバスを失ったんです。紙じゃなくて、中身のほうを。あの子たちはもう返してくれません。" },
                { speaker: 'female', text: "Wanda: それは立派な損失ね。" },
                { speaker: 'male', text: "Reggie: この卓で一番デカい損失だ。しかもこの人、黙って座って帰るところだったぞ。" },
                { speaker: 'female', text: "Flo: じゃあ今夜レジーは払わない。ヴァーノンだよ。" },
                { speaker: 'male', text: "Vernon: わしは8時間失った。" },
                { speaker: 'female', text: "Flo: あんたは8時間使ったの。そこには違いがあって、あんたはそれをここの誰よりも長く知ってる。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // NIGHT 2 (Jul 25) -- TWO MEN WHO ARE NOT ASLEEP
    // Vernon / Grandpa Stan / Walter / Brody / Old Man Gus / Nurse Tanya
    // ============================================================
    {
        id: 'losers-day2',
        date: '2026-07-25',
        title: 'Night 2: Two Men Who Are Not Asleep',
        titleJa: '第2夜: 寝ていない二人',
        content: 'この町の「待つ」専門家が6人そろった夜。DMVのヴァーノンと、感謝祭のスタンじいちゃんが初対面で、一字一句同じ台詞を同時に言う。救急外来のウォルターとブロディ、映画館のガス、そして12時間勤務明けのターニャ看護師。誰が一番時間を失ったかを競ううちに、この6人が今月だけで1年分の労働時間を待合室で失っていたことが判明する。',
        series: 'losers-table',
        seriesTitle: "The Losers' Table",
        tone: 'humorous',
        tags: ['ridgeway', 'losers-table', 'crossover', 'waiting', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Flo: Six again. Word travels. Stan, you are not from this side of town." },
                { speaker: 'male', text: "Grandpa Stan: Lorraine told me to go be social. She used the word social like it was a chore on a list." },
                { speaker: 'male', text: "Walter: Sit down before somebody takes it. You want the end seat, by the way. The end seat has the good springs." },
                { speaker: 'male', text: "Brody: See, this is what I keep telling people. Where else do nine strangers end up in one room on purpose? Nowhere. This is the last one." },
                { speaker: 'male', text: "Walter: There are six of us, Brody." },
                { speaker: 'male', text: "Brody: Six is still nine short of nobody." },
                { speaker: 'female', text: "Nurse Tanya: I have been on shift for twelve hours and that sentence made less sense the longer it went." },
                { speaker: 'male', text: "Vernon: I was not asleep. I was resting my eyes." },
                { speaker: 'male', text: "Grandpa Stan: I was not asleep. I was resting my eyes." },
                { speaker: 'female', text: "Flo: ...You two said that at the same time." },
                { speaker: 'male', text: "Walter: Word for word. Do you two know each other?" },
                { speaker: 'male', text: "Vernon: No." },
                { speaker: 'male', text: "Grandpa Stan: Never seen him." },
                { speaker: 'male', text: "Walter: That is worse. That is much worse." },
                { speaker: 'male', text: "Old Man Gus: Can I go? Because mine is short and I would like it taken seriously. Tuesday matinee. Row F, seat twelve. Somebody was in it." },
                { speaker: 'female', text: "Nurse Tanya: Did you say something?" },
                { speaker: 'male', text: "Old Man Gus: Say what? It is not my seat. I have sat in it four days a week since 1998 and it is not my seat. I sat in row G and I could not tell you one thing that happened in that movie." },
                { speaker: 'male', text: "Walter: Six hours in the emergency room on Monday, and at the end of it a very polite young doctor told me it was a muscle." },
                { speaker: 'female', text: "Nurse Tanya: Was it a muscle?" },
                { speaker: 'male', text: "Walter: It was a muscle. That is the part I cannot get over." },
                { speaker: 'female', text: "Nurse Tanya: Mine is going to sound like nothing. Eleven hours, and not one person used my name. Not the patients, not the families. I was 'nurse' from seven at night to six in the morning. It is on the badge. It is right there." },
                { speaker: 'male', text: "Brody: Okay, but on the bright side -- " },
                { speaker: 'female', text: "Flo: Brody. Not tonight." },
                { speaker: 'male', text: "Brody: I had a great week. Truly. Nothing went wrong at all." },
                { speaker: 'male', text: "Walter: Then you are paying, and none of us are going to feel bad about it." },
                { speaker: 'male', text: "Grandpa Stan: Add it up, though. Six hours, eight hours, eleven, twelve. This table has spent more time waiting this month than most people spend working." },
                { speaker: 'male', text: "Vernon: And every one of us showed up on time for it." },
            ],
            japanese: [
                { speaker: 'female', text: "Flo: 今夜も6人。話が回るのが早いね。スタン、あんたこっち側の人間じゃないだろ。" },
                { speaker: 'male', text: "Grandpa Stan: ローレンに「少しは人と会ってきなさい」と言われてな。用事リストの1項目みたいな言い方だった。" },
                { speaker: 'male', text: "Walter: 取られる前に座れ。ちなみに端の席がいいぞ。端はスプリングが生きてる。" },
                { speaker: 'male', text: "Brody: な、いつも言ってるだろ。赤の他人が9人、わざわざ同じ部屋に集まる場所が他にあるか? 無い。ここが最後だよ。" },
                { speaker: 'male', text: "Walter: 6人だよ、ブロディ。" },
                { speaker: 'male', text: "Brody: 6人でも、ゼロよりは9人に近い。" },
                { speaker: 'female', text: "Nurse Tanya: 12時間勤務明けなんだけど、その文、後半になるほど意味が分からなくなったわ。" },
                { speaker: 'male', text: "Vernon: 寝てない。目を休めてたんだ。" },
                { speaker: 'male', text: "Grandpa Stan: 寝てない。目を休めてたんだ。" },
                { speaker: 'female', text: "Flo: ...あんたたち、今、同時に言ったよ。" },
                { speaker: 'male', text: "Walter: 一字一句な。二人、知り合いか?" },
                { speaker: 'male', text: "Vernon: いや。" },
                { speaker: 'male', text: "Grandpa Stan: 見たこともない。" },
                { speaker: 'male', text: "Walter: そっちのほうが怖いわ。だいぶ怖い。" },
                { speaker: 'male', text: "Old Man Gus: わしから行っていいか。短いが、真面目に扱ってほしい。火曜の昼興行。F列12番。誰か座ってた。" },
                { speaker: 'female', text: "Nurse Tanya: 何か言ったの?" },
                { speaker: 'male', text: "Old Man Gus: 何をだ。わしの席じゃない。1998年から週4で座ってるが、わしの席じゃないんだ。G列に座って、その映画の内容は一つも覚えとらん。" },
                { speaker: 'male', text: "Walter: 月曜、救急で6時間。最後にえらく丁寧な若い医者が来て、「筋肉ですね」と言った。" },
                { speaker: 'female', text: "Nurse Tanya: 筋肉だったの?" },
                { speaker: 'male', text: "Walter: 筋肉だった。そこがどうしても飲み込めん。" },
                { speaker: 'female', text: "Nurse Tanya: 私のは何でもないみたいに聞こえると思う。11時間、誰ひとり私の名前を使わなかった。患者さんも、ご家族も。夜7時から朝6時までずっと「看護師さん」。名札に書いてあるのに。すぐそこにあるのに。" },
                { speaker: 'male', text: "Brody: いや、でも明るい面を見れば -- " },
                { speaker: 'female', text: "Flo: ブロディ。今夜はやめときな。" },
                { speaker: 'male', text: "Brody: 俺、今週最高だったんだよ。マジで。何ひとつ問題が無かった。" },
                { speaker: 'male', text: "Walter: じゃあお前が払いだ。誰も気の毒だとは思わん。" },
                { speaker: 'male', text: "Grandpa Stan: しかし足してみろ。6時間、8時間、11、12。この卓は今月、たいていの人間が働く時間より長く待ってるぞ。" },
                { speaker: 'male', text: "Vernon: しかも全員、それに遅刻せず行っとる。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // NIGHT 3 (Jul 26) -- CLIPBOARD NIGHT
    // Hank / Donna / Tommy / Bailiff Reyes / Patrice / Principal Henderson
    // ============================================================
    {
        id: 'losers-day3',
        date: '2026-07-26',
        title: 'Night 3: Clipboard Night',
        titleJa: '第3夜: クリップボードの夜',
        content: 'この町でリストを持つ側の人間が6人。HOAのハンク、ブロックパーティーのドナ、権限を渡されたトミー、廷吏のレイエス、DMVの受付パトリス、そして中立を宣言し続けるヘンダーソン校長。ハンクは「様式が完璧すぎて受理せざるを得なかった苦情」を失い、パトリスは的中率92%を失う。廷吏は「裁判所は物を失わない、記録する」と主張して、支払いを命じられる。',
        series: 'losers-table',
        seriesTitle: "The Losers' Table",
        tone: 'humorous',
        tags: ['ridgeway', 'losers-table', 'crossover', 'rules', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Flo: Every one of you walked in holding a clipboard. All six. I want that noted." },
                { speaker: 'female', text: "Donna: Mine is a schedule, not a clipboard." },
                { speaker: 'male', text: "Hank: It is on a clipboard, Donna." },
                { speaker: 'female', text: "Donna: The schedule is the object. The clipboard is the container." },
                { speaker: 'male', text: "Principal Henderson: I want to say up front that I am completely neutral on this." },
                { speaker: 'male', text: "Bailiff Reyes: Nobody asked you anything yet." },
                { speaker: 'male', text: "Hank: I will start, because mine has been bothering me since Thursday. Somebody filed a complaint about a fence. Perfect form. Every box filled in, correct date, signature, the whole thing. Cleanest filing I have received in nine years." },
                { speaker: 'female', text: "Patrice: What is the problem?" },
                { speaker: 'male', text: "Hank: There is no fence. I drove Alder Court twice. There is no fence, and the address on the form is between two houses that are next to each other." },
                { speaker: 'male', text: "Tommy: So you rejected it." },
                { speaker: 'male', text: "Hank: I accepted it. The form was perfect. That is what I lost. Nine years, and I have always been able to tell myself that if the paperwork is right, the thing is real." },
                { speaker: 'female', text: "Donna: Folding tables. Confirmed for the ninth, then confirmed again for the ninth, then moved to the morning of the ninth. I have run this block party for eleven years and I have never once had the tables in advance." },
                { speaker: 'male', text: "Tommy: I lost the clipboard." },
                { speaker: 'female', text: "Donna: You did not lose it. I took it back." },
                { speaker: 'male', text: "Tommy: You handed it to me. In front of people. You said, and I am quoting you, 'Tommy, you are on tables.' And then on Thursday it was just gone off my counter." },
                { speaker: 'female', text: "Donna: Because you were writing things on it." },
                { speaker: 'female', text: "Patrice: Mine is a number. I have been at that front desk eleven years and I can guess why somebody is walking in before they open their mouth. Renewal, new license, registration, road test. Ninety-two percent. I keep count." },
                { speaker: 'male', text: "Bailiff Reyes: And?" },
                { speaker: 'female', text: "Patrice: And there is a man who has been coming in twice a week since spring and he is not any of the four. There is no box on my form for a person who does not want anything. He has taken my ninety-two down to eighty-eight and I have started dreading the door." },
                { speaker: 'male', text: "Bailiff Reyes: I have nothing. The court does not lose things. The court files them." },
                { speaker: 'male', text: "Hank: Then you are paying." },
                { speaker: 'male', text: "Bailiff Reyes: On what grounds?" },
                { speaker: 'male', text: "Hank: On the grounds that the rule of this table is one sentence long and you just tried to argue your way around it. That is the shortest statute in this county and you lost to it in under a minute." },
                { speaker: 'male', text: "Bailiff Reyes: I would like to appeal." },
                { speaker: 'female', text: "Flo: There is no appeal, hon." },
                { speaker: 'male', text: "Principal Henderson: And I want to say that I remain completely neutral on that ruling." },
            ],
            japanese: [
                { speaker: 'female', text: "Flo: あんたたち全員クリップボード持って入ってきたね。6人とも。それ、記録しといて。" },
                { speaker: 'female', text: "Donna: これは進行表よ。クリップボードじゃない。" },
                { speaker: 'male', text: "Hank: クリップボードに挟まってるだろ、ドナ。" },
                { speaker: 'female', text: "Donna: 本体は進行表。クリップボードは容器。" },
                { speaker: 'male', text: "Principal Henderson: 最初に申し上げておきますが、私はこの件について完全に中立です。" },
                { speaker: 'male', text: "Bailiff Reyes: まだ誰もあんたに何も聞いてない。" },
                { speaker: 'male', text: "Hank: 俺から行く。木曜からずっと引っかかってるんだ。フェンスについての苦情が1件出された。様式が完璧だった。全部の欄が埋まって、日付も正しくて、署名もある。9年で一番きれいな届出だ。" },
                { speaker: 'female', text: "Patrice: 何が問題なの?" },
                { speaker: 'male', text: "Hank: フェンスが無い。アルダー・コートを2回走った。フェンスは無いし、書いてある住所は、隣り合った2軒の「あいだ」なんだ。" },
                { speaker: 'male', text: "Tommy: じゃあ却下したのか。" },
                { speaker: 'male', text: "Hank: 受理した。様式が完璧だったから。それが俺の失ったものだよ。9年間ずっと、書類さえ正しければ中身も実在すると自分に言い聞かせてこられたんだ。" },
                { speaker: 'female', text: "Donna: 折りたたみテーブル。9日で確定、もう一度9日で確定、そのあと9日の朝に変更。11年この行事を仕切ってるけど、テーブルが前日までに届いたことは一度も無い。" },
                { speaker: 'male', text: "Tommy: 俺はクリップボードを失った。" },
                { speaker: 'female', text: "Donna: 失ってない。私が回収したの。" },
                { speaker: 'male', text: "Tommy: 渡しただろ。人前で。あんたはこう言ったんだ、原文のまま言うぞ、「トミー、テーブル担当ね」。で木曜、カウンターから消えてた。" },
                { speaker: 'female', text: "Donna: あなたがそれに色々書き込むからよ。" },
                { speaker: 'female', text: "Patrice: 私のは数字。あの受付に11年いて、入ってきた人が口を開く前に用件が分かるの。更新、新規、登録、実技。的中率92%。ちゃんと数えてる。" },
                { speaker: 'male', text: "Bailiff Reyes: それで?" },
                { speaker: 'female', text: "Patrice: それで、春から週2で来てる男の人がいて、その人は4つのどれでもない。「何も欲しくない人」の欄が、私の用紙には無いの。おかげで92が88まで落ちて、私、ドアが開くのが怖くなってきた。" },
                { speaker: 'male', text: "Bailiff Reyes: 俺は何も無い。裁判所は物を失わない。記録するだけだ。" },
                { speaker: 'male', text: "Hank: じゃああんたが払いだ。" },
                { speaker: 'male', text: "Bailiff Reyes: 根拠は。" },
                { speaker: 'male', text: "Hank: この卓の掟は一文しかない。あんたはその一文を言葉で回避しようとした。この郡で一番短い成文法に、1分かからず負けたわけだ。" },
                { speaker: 'male', text: "Bailiff Reyes: 不服申し立てをしたい。" },
                { speaker: 'female', text: "Flo: 不服申し立ては無いんだよ。" },
                { speaker: 'male', text: "Principal Henderson: そしてその裁定についても、私は完全に中立であることを申し添えます。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // NIGHT 4 (Jul 27, Monday) -- THE PROTEST VOTE
    // Reggie / Jenna / Marcus / Dave Boyd / Devon / Cheryl
    // ============================================================
    {
        id: 'losers-day4',
        date: '2026-07-27',
        title: 'Night 4: The Protest Vote',
        titleJa: '第4夜: 抗議のもとに出席する者たち',
        content: '本来の月曜。レジーとジェナ -- 文句を言いながら出席率100%の二人が、初めて同じ卓に着く。デイヴ・ボイドが数年ぶりにブリスケットの話を自分から口に出し、町一番の皮肉屋レジーが何も言わない。そしてジェナが「この町に興味は無い」という自分の立場を失う。マーカスはそれを黙って見ている。',
        series: 'losers-table',
        seriesTitle: "The Losers' Table",
        tone: 'humorous',
        tags: ['ridgeway', 'losers-table', 'crossover', 'marcus', 'jenna'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Flo: Monday. The real one. Everybody else this week was a rehearsal." },
                { speaker: 'male', text: "Devon: Can I say something about the week before we start? Something has been off in this town. Little things. The mail, the buses, the way people are talking. I have a theory." },
                { speaker: 'female', text: "Cheryl: No." },
                { speaker: 'male', text: "Devon: You have not heard it." },
                { speaker: 'female', text: "Cheryl: Devon, I have known you since you were seventeen and you have never once had a theory that made anybody's evening better." },
                { speaker: 'male', text: "Reggie: I would like it on the record that I did not want to come tonight." },
                { speaker: 'female', text: "Jenna: I am here under protest." },
                { speaker: 'male', text: "Reggie: ...What did you just say?" },
                { speaker: 'female', text: "Jenna: I said I am here under protest. I have been saying it since I was seventeen. What." },
                { speaker: 'male', text: "Marcus: Oh, this is going to be a long night." },
                { speaker: 'male', text: "Reggie: How many of these have you been to?" },
                { speaker: 'female', text: "Jenna: All of them." },
                { speaker: 'male', text: "Reggie: Right. Same. Every single one, complaining the whole way in." },
                { speaker: 'female', text: "Cheryl: The two of you have a hundred percent attendance record and a hundred percent complaint record. Somebody should study that." },
                { speaker: 'male', text: "Devon: That is actually what my theory -- " },
                { speaker: 'female', text: "Cheryl: No." },
                { speaker: 'male', text: "Dave Boyd: I have got one. It is old and I know the rule about old ones, so tell me if it does not count. The brisket." },
                { speaker: 'female', text: "Flo: Which brisket, hon." },
                { speaker: 'male', text: "Dave Boyd: You know which one. Four years ago. I served it. Eleven pounds, twelve hours, and it came off that grill gray. Everybody at this table has told me at some point that nobody remembers it." },
                { speaker: 'female', text: "Cheryl: Nobody does remember it, Dave." },
                { speaker: 'male', text: "Dave Boyd: This week I found the receipt in a drawer. And I stood in my kitchen and I did the math on the meat, and I realized I have thought about it at least once a day for four years. That is what I lost. Four years. I would like it back." },
                { speaker: 'male', text: "Reggie: ..." },
                { speaker: 'female', text: "Cheryl: Reggie. Nothing? You have had a comment ready for every single thing said in this town since 1987." },
                { speaker: 'male', text: "Reggie: I have got nothing." },
                { speaker: 'female', text: "Jenna: Then I will go. Mine is that I do not care about this town. That is the position. I have held it since high school and I have been very consistent about it. And this week the county put up a notice about the Route 9 crossing, and I read it twice, and then I called the county." },
                { speaker: 'male', text: "Marcus: You called the county." },
                { speaker: 'female', text: "Jenna: I was on hold for forty minutes. Under protest. So that is what I lost -- the position. Fifteen years, gone in one phone call, and I am the one who made the call." },
                { speaker: 'female', text: "Flo: Devon pays." },
                { speaker: 'male', text: "Devon: I have not even said mine." },
                { speaker: 'female', text: "Flo: You have been talking all night and you have not lost a thing. That is how it works." },
                { speaker: 'male', text: "Devon: ...Fair enough." },
                { speaker: 'male', text: "Marcus: That is the first time I have heard him agree with anybody in eleven years." },
            ],
            japanese: [
                { speaker: 'female', text: "Flo: 月曜。本物のほう。今週の他の夜は全部リハーサルだよ。" },
                { speaker: 'male', text: "Devon: 始める前に今週のことで一つ言っていい? この町、最近どこかおかしい。細かいことなんだけど。郵便とか、バスとか、人の喋り方とか。仮説がある。" },
                { speaker: 'female', text: "Cheryl: 却下。" },
                { speaker: 'male', text: "Devon: まだ聞いてないだろ。" },
                { speaker: 'female', text: "Cheryl: デヴォン、17歳のときから知ってるけど、あなたの仮説で人の夜が良くなったことは一度も無いの。" },
                { speaker: 'male', text: "Reggie: 記録に残しておいてほしいんだが、俺は今夜、来たくなかった。" },
                { speaker: 'female', text: "Jenna: 私は抗議のもとにここにいます。" },
                { speaker: 'male', text: "Reggie: ...今なんて言った?" },
                { speaker: 'female', text: "Jenna: 抗議のもとにここにいる、と言いました。17歳から言ってます。何か。" },
                { speaker: 'male', text: "Marcus: ああ、これは長い夜になるな。" },
                { speaker: 'male', text: "Reggie: あんた、これに何回来てる?" },
                { speaker: 'female', text: "Jenna: 全部。" },
                { speaker: 'male', text: "Reggie: だろうな。俺も同じだ。一回も欠かさず、毎回文句を言いながら入ってくる。" },
                { speaker: 'female', text: "Cheryl: 二人とも出席率100%で苦情率100%。誰か研究したほうがいいわよ。" },
                { speaker: 'male', text: "Devon: それがまさに俺の仮説の -- " },
                { speaker: 'female', text: "Cheryl: 却下。" },
                { speaker: 'male', text: "Dave Boyd: 俺、一個ある。古い話だ。古いのは駄目ってルールは知ってる。駄目なら言ってくれ。ブリスケットだ。" },
                { speaker: 'female', text: "Flo: どのブリスケットだい。" },
                { speaker: 'male', text: "Dave Boyd: どれかは分かってるだろ。4年前。俺はあれを出した。5キロ、12時間、そしてグリルから灰色で出てきた。この卓の全員が、いつかの時点で「誰も覚えてない」と俺に言ってる。" },
                { speaker: 'female', text: "Cheryl: 実際、誰も覚えてないわよ、デイヴ。" },
                { speaker: 'male', text: "Dave Boyd: 今週、引き出しからあのときのレシートが出てきた。で、台所に立って肉の値段を計算して、気づいたんだ。俺は4年間、最低でも1日1回はあれのことを考えてる。それが失ったものだ。4年。返してほしい。" },
                { speaker: 'male', text: "Reggie: ..." },
                { speaker: 'female', text: "Cheryl: レジー。何も無いの? あなた1987年以降この町で誰かが言ったこと全部に一言用意してきた人でしょ。" },
                { speaker: 'male', text: "Reggie: 何も無い。" },
                { speaker: 'female', text: "Jenna: じゃあ私。私の立場は「この町に興味が無い」です。高校からずっとこれで、一貫してきた。で今週、郡がルート9の踏切について告知を出して、私はそれを2回読んで、郡に電話した。" },
                { speaker: 'male', text: "Marcus: 郡に電話したのか。" },
                { speaker: 'female', text: "Jenna: 保留40分。抗議のもとに。というわけで、失ったのは立場。15年が電話1本で消えて、しかもかけたのは私。" },
                { speaker: 'female', text: "Flo: デヴォンが払い。" },
                { speaker: 'male', text: "Devon: 俺まだ自分の言ってないんだけど。" },
                { speaker: 'female', text: "Flo: 一晩中喋ってて、何ひとつ失ってないだろ。そういう仕組みなの。" },
                { speaker: 'male', text: "Devon: ...ごもっとも。" },
                { speaker: 'male', text: "Marcus: こいつが誰かに同意したの、11年で初めて聞いた。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // NIGHT 5 (Jul 28) -- THE NIGHT NOBODY LOST ANYTHING
    // Marcus / Ms. Reyes / Wanda / Vernon / Hank + the empty sixth seat
    // ============================================================
    {
        id: 'losers-day5',
        date: '2026-07-28',
        title: 'Night 5: The Night Nobody Lost Anything',
        titleJa: '第5夜: 誰も何も失わなかった夜',
        content: '5晩続いた週の最後。快晴で、静かで、誰も申告するものが無い。掟は「一番損していない者が払う」だが、全員が何も失っていない場合の規定が無い。6番目の席は空いたままで、誰も座らない。ヴァーノンが、なぜ自分が毎日DMVに行くのかを初めて口にする。レイエス先生がレシートの裏に新しい条文を書き、卓は月曜だけに戻る。',
        series: 'losers-table',
        seriesTitle: "The Losers' Table",
        tone: 'introspective',
        tags: ['ridgeway', 'losers-table', 'crossover', 'quiet', 'vernon'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Flo: Five nights in a row. That has never happened here." },
                { speaker: 'female', text: "Wanda: Something was going around. Every day this week, somebody lost something." },
                { speaker: 'male', text: "Hank: And tonight?" },
                { speaker: 'female', text: "Ms. Reyes: Nothing. I have been trying since I parked the car. I have got nothing." },
                { speaker: 'male', text: "Marcus: Same. Good week. Boring week." },
                { speaker: 'male', text: "Hank: Zero complaints filed. First time since I took the job." },
                { speaker: 'female', text: "Wanda: I did not even burn the crust." },
                { speaker: 'male', text: "Vernon: Nothing here either." },
                { speaker: 'female', text: "Flo: Well. Nobody thought about this part." },
                { speaker: 'female', text: "Ms. Reyes: What happens if nobody lost anything?" },
                { speaker: 'female', text: "Flo: The rule says the one who lost the least pays for everybody. If nobody lost anything, then everybody lost the least." },
                { speaker: 'male', text: "Hank: So everybody pays." },
                { speaker: 'female', text: "Flo: Everybody pays." },
                { speaker: 'male', text: "Marcus: That is the most expensive good week I have ever had." },
                { speaker: 'female', text: "Ms. Reyes: Can I ask something? Vernon. You go to the DMV every week and you have no business there. Nobody at this table will say it to your face, so I am going to, because I have only been coming here for five days and I have not learned not to yet." },
                { speaker: 'male', text: "Vernon: Go ahead." },
                { speaker: 'female', text: "Ms. Reyes: Why?" },
                { speaker: 'male', text: "Vernon: Because they call your number. That is all. Somebody looks at a piece of paper with you on it and says it out loud, and for a second there is a chair with your name on it and a person expecting you." },
                { speaker: 'male', text: "Marcus: Vernon." },
                { speaker: 'male', text: "Vernon: I am not asking anybody to feel anything about it. I am saying that this is the only table in this town where the honest answer to 'what did you lose' is allowed to be 'nothing yet.' That is why I come. Both places." },
                { speaker: 'female', text: "Wanda: Nobody take the sixth seat tonight." },
                { speaker: 'male', text: "Hank: Nobody was going to." },
                { speaker: 'female', text: "Ms. Reyes: Flo, do you have a pen? I want to write this down while it is true." },
                { speaker: 'female', text: "Flo: Back of the receipt. That is where the last one went. Put it under the ashtray when you are finished." },
                { speaker: 'female', text: "Ms. Reyes: 'If nobody lost anything, everybody pays, and nobody sits in the sixth seat.'" },
                { speaker: 'female', text: "Flo: Booth is back to Mondays. Go home, all of you. It was a good week and I am not going to let you sit here and ruin it." },
            ],
            japanese: [
                { speaker: 'female', text: "Flo: 5晩連続。ここでは一度も無かったことだよ。" },
                { speaker: 'female', text: "Wanda: 何か流行ってたのよ。今週は毎日、誰かが何かを失ってた。" },
                { speaker: 'male', text: "Hank: で、今夜は。" },
                { speaker: 'female', text: "Ms. Reyes: 何も。車を停めたときからずっと探してるんですけど、何も出てこない。" },
                { speaker: 'male', text: "Marcus: 俺も。いい一週間だった。退屈な一週間。" },
                { speaker: 'male', text: "Hank: 苦情の届出ゼロ。この役に就いてから初めてだ。" },
                { speaker: 'female', text: "Wanda: パイの生地すら焦がしてないわ。" },
                { speaker: 'male', text: "Vernon: こっちも何も無い。" },
                { speaker: 'female', text: "Flo: さて。この場合のことは誰も考えてなかったね。" },
                { speaker: 'female', text: "Ms. Reyes: 誰も何も失わなかったら、どうなるんですか。" },
                { speaker: 'female', text: "Flo: 掟は「一番損してない者が全員分払う」。誰も何も失ってないなら、全員が一番損してないことになる。" },
                { speaker: 'male', text: "Hank: つまり全員が払う。" },
                { speaker: 'female', text: "Flo: 全員が払う。" },
                { speaker: 'male', text: "Marcus: 人生で一番高くついた「いい一週間」だ。" },
                { speaker: 'female', text: "Ms. Reyes: 一つ聞いていいですか。ヴァーノンさん。毎週DMVに行って、用事は無い。この卓の誰も面と向かって聞かないので、私が聞きます。まだ5日しか通ってなくて、聞かないでおくことを覚えてないので。" },
                { speaker: 'male', text: "Vernon: どうぞ。" },
                { speaker: 'female', text: "Ms. Reyes: なぜですか。" },
                { speaker: 'male', text: "Vernon: 番号を呼ぶからだ。それだけだよ。自分の載った紙を誰かが見て、それを声に出す。その一瞬だけ、自分の名前の付いた椅子と、自分を待ってる人間がいる。" },
                { speaker: 'male', text: "Marcus: ヴァーノン。" },
                { speaker: 'male', text: "Vernon: 誰にも同情してくれとは言っとらん。わしが言ってるのは、「何を失った」の正直な答えが「まだ何も」で許される卓は、この町でここだけだということだ。だから来る。どっちの場所にもな。" },
                { speaker: 'female', text: "Wanda: 今夜は誰も6番目の席に座らないで。" },
                { speaker: 'male', text: "Hank: 誰も座る気は無かったよ。" },
                { speaker: 'female', text: "Ms. Reyes: フロさん、ペンありますか。本当のうちに書いておきたいので。" },
                { speaker: 'female', text: "Flo: レシートの裏。前のもそこに書いた。書き終わったら灰皿の下に置いときな。" },
                { speaker: 'female', text: "Ms. Reyes: 「誰も何も失わなかった場合、全員が払い、6番目の席には誰も座らない」" },
                { speaker: 'female', text: "Flo: ボックス席は月曜だけに戻す。帰りな、全員。いい一週間だったんだから、ここに座って台無しにさせやしないよ。" },
            ],
            generatedAt,
            tone: 'introspective',
        },
    },
];
