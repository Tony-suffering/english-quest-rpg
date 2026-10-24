/**
 * Jury Duty -- 5-episode conversation series for Memoria
 * Seven strangers are summoned for jury duty and end up deciding the fate of a man
 * accused of stealing fourteen lawn gnomes from a neighbor's garden. Over five days
 * they go from resentful strangers in the assembly room to a deadlocked jury that
 * has to actually agree on something.
 * 7 characters: Wanda (62F, takes it very seriously, becomes foreperson),
 *   Trevor (29M, desperate to get out of it), Aisha (34F, sharp, reads the evidence closely),
 *   Doug (48M, loud, stubborn, made up his mind on day one), Judge Halloran (60M),
 *   Bailiff Reyes (40M, runs the room), Mei (23F, youngest, quiet but observant)
 * The 5 "days" are 5 stages of one jury-duty week.
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, courtroom jargon mixed with civilian boredom and stubbornness.
 * Format: ~16-18 lines per day per language.
 */

export interface JuryDutyEntry {
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

const generatedAt = new Date('2026-06-14T12:00:00.000Z');

export const juryDutyEntries: JuryDutyEntry[] = [
    // ============================================================
    // DAY 1 (Jun 14) -- THE SUMMONS
    // ============================================================
    {
        id: 'jury-day1',
        date: '2026-06-14',
        title: 'Day 1: The Summons',
        titleJa: 'Day 1: 召喚状',
        content: '陪審員に召喚された見知らぬ7人が、待機室で名前を呼ばれるのを待つ。トレバーは何とか逃れようと必死、ワンダは妙に張り切っている。廷吏のレイエスが場を仕切る。',
        series: 'jury-duty',
        seriesTitle: 'Jury Duty',
        tone: 'humorous',
        tags: ['court', 'jury', 'comedy', 'civic-duty', 'strangers'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Bailiff Reyes: Alright, listen up, everybody. If I called your name, you're in the pool. If I didn't, you wait. Either way, nobody leaves this room without checking with me first. Phones on silent." },
                { speaker: 'male', text: "Trevor: Excuse me -- hi -- so what if you, hypothetically, have a really important thing at work this week? Is there like a form, or a person I talk to, or --" },
                { speaker: 'male', text: "Bailiff Reyes: There's a form. Everybody has a really important thing. Fill out the form. The judge decides. Spoiler: the judge has heard it." },
                { speaker: 'female', text: "Wanda: I, for one, think this is an honor. We are the backbone of the justice system. I brought snacks for the table. I made a little sign-up sheet for who wants what." },
                { speaker: 'male', text: "Doug: A sign-up sheet. We've been here nine minutes." },
                { speaker: 'female', text: "Wanda: Preparation is not a crime, Doug. Oh -- you don't know my name yet. I'm Wanda. I read the entire juror handbook last night. Twice." },
                { speaker: 'male', text: "Doug: Of course you did. I'm Doug. I already know how I feel about all of this, and I haven't even heard the case." },
                { speaker: 'female', text: "Aisha: That's -- that is sort of the whole problem with the system, but okay. I'm Aisha. I'm just hoping it's something quick. In and out." },
                { speaker: 'female', text: "Mei: I'm Mei. This is my first time. I didn't even know you could get summoned at twenty-three." },
                { speaker: 'female', text: "Wanda: Oh, honey, you can get summoned the second you can vote. Sit by me. I have a granola bar with your name on it." },
                { speaker: 'male', text: "Trevor: Okay but realistically -- realistically -- how long does this take? Like a day? I have a flight Thursday. I'm not even supposed to be in the state Thursday." },
                { speaker: 'male', text: "Bailiff Reyes: Could be a day. Could be a week. I've seen a 'quick one' run eleven days. Put it on the form, Trevor." },
                { speaker: 'male', text: "Trevor: How do you know my name?" },
                { speaker: 'male', text: "Bailiff Reyes: It's on the sign-up sheet. Wanda put everybody on the sign-up sheet." },
                { speaker: 'female', text: "Wanda: I like to be organized. You're 'pretzels,' Trevor. I had a feeling about you." },
                { speaker: 'male', text: "Doug: This is going to be a long week. I can feel it in my knees." },
            ],
            japanese: [
                { speaker: 'male', text: "Bailiff Reyes: はい、皆さん聞いてください。名前を呼ばれた人は候補者です。呼ばれなかった人は待機。どちらにせよ、私に確認せずこの部屋を出ないこと。携帯はマナーモードに。" },
                { speaker: 'male', text: "Trevor: すみません -- あの -- もし仮に今週、仕事ですごく大事な用事がある場合は？用紙とか、相談する人とか、そういうのって --" },
                { speaker: 'male', text: "Bailiff Reyes: 用紙はあります。全員すごく大事な用事があるんです。用紙に記入を。判事が決めます。ネタバレ：判事はもう聞き飽きてます。" },
                { speaker: 'female', text: "Wanda: 私はね、これは名誉だと思うの。私たちは司法制度の屋台骨よ。テーブル用にお菓子持ってきたわ。誰が何欲しいか申込シートも作ったの。" },
                { speaker: 'male', text: "Doug: 申込シート。まだ来て9分だぞ。" },
                { speaker: 'female', text: "Wanda: 準備は罪じゃないわよ、ダグ。あら -- まだ名前知らないわね。ワンダよ。昨夜、陪審員ハンドブックを全部読んだの。2回。" },
                { speaker: 'male', text: "Doug: そりゃそうだろうな。俺はダグだ。この件についてもう自分の気持ちは決まってる、まだ事件も聞いてないのにな。" },
                { speaker: 'female', text: "Aisha: それ -- それこそが制度の問題そのものなんだけど、まあいいわ。アイシャです。何か早く終わるやつだといいんだけど。さっと入ってさっと出たい。" },
                { speaker: 'female', text: "Mei: メイです。初めてで。23歳で召喚されることがあるなんて知りませんでした。" },
                { speaker: 'female', text: "Wanda: あら、あなた、投票できる歳になった瞬間から召喚されるのよ。私の隣に座って。あなた用のグラノーラバーがあるの。" },
                { speaker: 'male', text: "Trevor: えっとでも現実的に -- 現実的に -- これどのくらいかかるんですか？1日とか？木曜に飛行機あるんです。木曜は州内にいる予定すらないんです。" },
                { speaker: 'male', text: "Bailiff Reyes: 1日かもしれない。1週間かもしれない。「すぐ終わる」やつが11日かかったのも見ました。用紙に書いて、トレバー。" },
                { speaker: 'male', text: "Trevor: なんで俺の名前知ってるんですか？" },
                { speaker: 'male', text: "Bailiff Reyes: 申込シートに載ってます。ワンダが全員を申込シートに載せたので。" },
                { speaker: 'female', text: "Wanda: 整理整頓が好きなの。あなたは「プレッツェル」よ、トレバー。あなたにはピンとくるものがあったの。" },
                { speaker: 'male', text: "Doug: 長い一週間になるぞ。膝で分かる。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 2 (Jun 15) -- VOIR DIRE
    // ============================================================
    {
        id: 'jury-day2',
        date: '2026-06-15',
        title: 'Day 2: Voir Dire',
        titleJa: 'Day 2: 陪審員選任',
        content: 'ハロラン判事による陪審員選任の質問。トレバーはあの手この手で逃れようとするが見抜かれる。7人がそろって正式に陪審員に選ばれ、ついに事件の概要が明かされる -- 隣家の庭から芝生のノーム14体を盗んだ容疑。',
        series: 'jury-duty',
        seriesTitle: 'Jury Duty',
        tone: 'humorous',
        tags: ['court', 'jury', 'comedy', 'selection', 'judge'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Judge Halloran: Good morning. This is what we call voir dire -- I ask you questions, you answer honestly, and we determine whether you can be fair. It is not a chance to get out of jury duty. I want to be clear about that part." },
                { speaker: 'male', text: "Trevor: Your Honor, I just want to say I have very strong opinions about crime. Very strong. Possibly too strong to be fair, honestly." },
                { speaker: 'male', text: "Judge Halloran: What are your strong opinions, Mr -- Trevor?" },
                { speaker: 'male', text: "Trevor: That it's... bad? Crime is bad. I feel very strongly that it's bad." },
                { speaker: 'male', text: "Judge Halloran: That is the legally correct opinion. You're seated. Nice try." },
                { speaker: 'female', text: "Aisha: Your Honor, genuine question -- before we agree to anything, are we allowed to know what the case actually is?" },
                { speaker: 'male', text: "Judge Halloran: Reasonable. The defendant is charged with the theft of fourteen decorative lawn gnomes from a neighbor's garden, valued in total at three hundred and forty dollars." },
                { speaker: 'male', text: "Doug: Fourteen gnomes. He's guilty. Look at him. Who steals one gnome, let alone fourteen?" },
                { speaker: 'male', text: "Judge Halloran: Sir, you cannot reach a verdict during jury selection. That's -- that is the opposite of the entire process." },
                { speaker: 'female', text: "Wanda: I think it's wonderful that we get to weigh such a serious matter. Every gnome deserves justice. I mean -- the owner does. The owner of the gnomes." },
                { speaker: 'female', text: "Mei: I have a question. Is it weird that I kind of want to know the whole gnome story now? Like, I'm invested." },
                { speaker: 'male', text: "Judge Halloran: That is precisely the correct level of curiosity, and the wrong time to express it. You're all seated. Congratulations -- you are the jury." },
                { speaker: 'male', text: "Trevor: Wait, all of us? Even me? I said I was biased." },
                { speaker: 'male', text: "Judge Halloran: You said crime is bad, Trevor. Everyone here thinks crime is bad. That's why we let them carry phones and vote." },
                { speaker: 'female', text: "Aisha: Fourteen gnomes. Three hundred and forty dollars. Okay. I have so many questions, and apparently five days to ask them." },
                { speaker: 'male', text: "Doug: I don't need five days. I need about five more minutes with that guy's face." },
            ],
            japanese: [
                { speaker: 'male', text: "Judge Halloran: おはようございます。これは陪審員選任、いわゆるvoir direです -- 私が質問し、皆さんは正直に答え、公正な判断ができるか見極めます。陪審義務から逃れる機会ではありません。そこははっきりさせておきたい。" },
                { speaker: 'male', text: "Trevor: 裁判長、ひとつ言わせてください、私は犯罪についてものすごく強い意見を持ってます。ものすごく。正直、公正でいられないほど強いかもしれません。" },
                { speaker: 'male', text: "Judge Halloran: その強い意見とは何ですか、ええと -- トレバーさん？" },
                { speaker: 'male', text: "Trevor: その... 悪いってことです？犯罪は悪い。悪いって、すごく強く感じてます。" },
                { speaker: 'male', text: "Judge Halloran: それは法的に正しい意見です。あなたは選任。いい試みでした。" },
                { speaker: 'female', text: "Aisha: 裁判長、純粋な質問なんですが -- 何かに同意する前に、これが実際どんな事件か知ることは許されますか？" },
                { speaker: 'male', text: "Judge Halloran: もっともです。被告人は、隣家の庭から装飾用の芝生ノーム14体を盗んだ罪に問われています。総額340ドル相当。" },
                { speaker: 'male', text: "Doug: ノーム14体。こいつは有罪だ。顔を見ろ。1体だって誰が盗む、ましてや14体だぞ？" },
                { speaker: 'male', text: "Judge Halloran: あなた、陪審員選任中に評決を出すことはできません。それは -- それは手続き全体の真逆です。" },
                { speaker: 'female', text: "Wanda: こんな重大な問題を判断させてもらえるなんて素晴らしいわ。すべてのノームに正義を。いえ -- 持ち主にね。ノームの持ち主に。" },
                { speaker: 'female', text: "Mei: 質問あります。今ちょっとノームの一部始終を知りたくなってるの変ですか？なんか、もう夢中で。" },
                { speaker: 'male', text: "Judge Halloran: それはまさに正しいレベルの好奇心で、それを表明するには間違ったタイミングです。全員選任。おめでとうございます -- 皆さんが陪審員です。" },
                { speaker: 'male', text: "Trevor: えっ、全員？俺も？偏ってるって言ったのに。" },
                { speaker: 'male', text: "Judge Halloran: あなたは犯罪は悪いと言ったんです、トレバー。ここの全員が犯罪は悪いと思ってる。だから携帯を持たせて投票させてるんです。" },
                { speaker: 'female', text: "Aisha: ノーム14体。340ドル。なるほど。聞きたいことが山ほどある、で、どうやら聞くのに5日あるのね。" },
                { speaker: 'male', text: "Doug: 5日もいらん。あいつの顔とあと5分あればいい。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 3 (Jun 16) -- THE TRIAL
    // ============================================================
    {
        id: 'jury-day3',
        date: '2026-06-16',
        title: 'Day 3: The Trial',
        titleJa: 'Day 3: 公判',
        content: '公判の証言が進む。検察側の証人と被告の弁明が食い違い、芝生のノーム事件の意外な真相が見えてくる。陪審席ではダグが早くも結論を出し、アイシャは細部に引っかかる。',
        series: 'jury-duty',
        seriesTitle: 'Jury Duty',
        tone: 'playful',
        tags: ['court', 'jury', 'comedy', 'testimony', 'evidence'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Bailiff Reyes: Jury's seated. Keep your reactions to yourselves. No gasping, no nodding along, and -- Wanda -- no clapping. We talked about the clapping." },
                { speaker: 'female', text: "Wanda: It was one time. The witness made a very good point." },
                { speaker: 'female', text: "Aisha: Okay, so according to the testimony, the gnomes weren't actually stolen -- they were 'relocated' to the defendant's yard. And he says the neighbor gave them to him." },
                { speaker: 'male', text: "Doug: Sure he did. People give away fourteen gnomes all the time. That's a totally normal neighbor thing to do." },
                { speaker: 'female', text: "Aisha: But that's the thing -- there's a text message. Exhibit C. The neighbor texted, quote, 'take the little men, they creep me out.' That's... that's kind of a gift?" },
                { speaker: 'female', text: "Mei: Wait, she called them 'the little men'? That's so much worse and so much funnier. Why is nobody else writing this down?" },
                { speaker: 'male', text: "Doug: It doesn't matter what she texted. He took them in the middle of the night. Who does yard work at 2 AM? Guilty people, that's who." },
                { speaker: 'female', text: "Aisha: Or people who work two jobs and only had Tuesday night free. We don't actually know yet. That's the whole point of listening to the rest of it." },
                { speaker: 'female', text: "Wanda: I think we should keep an open mind. The defense hasn't even shown the second text yet. There's a second text, I read ahead in the exhibit list." },
                { speaker: 'male', text: "Bailiff Reyes: Wanda, you cannot read ahead in the exhibit list." },
                { speaker: 'female', text: "Wanda: It was sitting right there. I have eyes. I read the handbook, Reyes, I know my rights." },
                { speaker: 'male', text: "Trevor: Hey, real talk, is anyone else kind of into this now? I came in trying to escape and now I need to know what's in the second text." },
                { speaker: 'female', text: "Mei: Right? It's like a true-crime podcast except we're legally part of it." },
                { speaker: 'male', text: "Doug: You're all overthinking fourteen gnomes." },
                { speaker: 'female', text: "Aisha: Doug, with respect, you've said 'guilty' eleven times and we have two more days of testimony. At least let the man finish his side." },
                { speaker: 'male', text: "Doug: ...Fine. I'll listen. But I'm right. I'm telling you now so it's not a surprise later." },
            ],
            japanese: [
                { speaker: 'male', text: "Bailiff Reyes: 陪審着席。リアクションは控えて。息をのまない、うなずかない、それと -- ワンダ -- 拍手しない。拍手の件は話しましたよね。" },
                { speaker: 'female', text: "Wanda: 一度だけよ。証人がすごくいいことを言ったの。" },
                { speaker: 'female', text: "Aisha: えっと、証言によれば、ノームは実際には盗まれてない -- 被告の庭に「移設」されたって。で被告は、隣人がくれたって言ってる。" },
                { speaker: 'male', text: "Doug: そりゃ言うだろうさ。みんなしょっちゅうノーム14体を譲るもんな。ご近所付き合いでごく普通のことだ。" },
                { speaker: 'female', text: "Aisha: でもそこなのよ -- テキストメッセージがあるの。証拠C。隣人が送ってる、引用「あの小さい男たち持ってって、気味が悪いから」。それって... ちょっと贈与じゃない？" },
                { speaker: 'female', text: "Mei: 待って、その人ノームを「小さい男たち」って呼んだの？それ余計ひどいし余計面白い。なんで他に誰もメモ取ってないの？" },
                { speaker: 'male', text: "Doug: 何を送ったかは関係ない。こいつは真夜中に持ち去った。誰が午前2時に庭仕事する？やましい奴だ、それだ。" },
                { speaker: 'female', text: "Aisha: あるいは仕事を掛け持ちしてて火曜の夜しか空いてなかった人。まだ実際には分からないでしょ。それが残りを聞く意味そのものなのよ。" },
                { speaker: 'female', text: "Wanda: 先入観を持たずにいきましょう。弁護側はまだ2通目のテキストすら出してないわ。2通目があるの、証拠リストを先読みしたから。" },
                { speaker: 'male', text: "Bailiff Reyes: ワンダ、証拠リストを先読みしちゃダメです。" },
                { speaker: 'female', text: "Wanda: すぐそこに置いてあったのよ。目があるんだもの。ハンドブック読んだのよ、レイエス、自分の権利は分かってるわ。" },
                { speaker: 'male', text: "Trevor: なあ、正直な話、他にもう夢中になってる人いない？俺、逃げようとして来たのに、今は2通目に何が書いてあるか知りたくてたまらない。" },
                { speaker: 'female', text: "Mei: でしょ？まるで犯罪実録ポッドキャスト、ただし私たちは法的に当事者ってだけで。" },
                { speaker: 'male', text: "Doug: お前ら全員、ノーム14体を考えすぎだ。" },
                { speaker: 'female', text: "Aisha: ダグ、悪いけど、あなた「有罪」って11回言った、で証言はあと2日ある。せめてあの人の言い分を最後まで聞かせてあげて。" },
                { speaker: 'male', text: "Doug: ...分かったよ。聞く。でも俺は正しい。後で驚かないように今言っとくぞ。" },
            ],
            generatedAt,
            tone: 'playful',
        },
    },

    // ============================================================
    // DAY 4 (Jun 17) -- THE DELIBERATION
    // ============================================================
    {
        id: 'jury-day4',
        date: '2026-06-17',
        title: 'Day 4: The Deliberation',
        titleJa: 'Day 4: 評議',
        content: '評議室。ワンダが陪審長に選ばれ、議論を仕切ろうとする。ダグは頑として有罪を譲らず、アイシャが2通目のテキストの存在を突きつける。7人の意見が割れ、評議は紛糾する。',
        series: 'jury-duty',
        seriesTitle: 'Jury Duty',
        tone: 'humorous',
        tags: ['court', 'jury', 'comedy', 'deliberation', 'debate'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Wanda: Alright, as your duly elected foreperson -- thank you, thank you, it was unanimous, mostly -- let's take an initial vote. Show of hands. Who thinks guilty?" },
                { speaker: 'male', text: "Doug: Guilty. Obviously. Can we go home?" },
                { speaker: 'female', text: "Aisha: We cannot 'go home,' Doug, we have to actually agree. And I'm a not-guilty, because of the second text, which everybody keeps forgetting about." },
                { speaker: 'female', text: "Mei: What did the second text say again? I wrote it down but my handwriting got excited." },
                { speaker: 'female', text: "Aisha: The neighbor texted him the next morning: 'I changed my mind, bring the little men back.' He'd already given four of them to his mother. That's not theft, that's a return-policy dispute." },
                { speaker: 'male', text: "Trevor: Okay, see, that changes things for me. You can't gift someone a gnome and then un-gift it. That's not how gnomes work. That's not how gifts work." },
                { speaker: 'male', text: "Doug: So now we're letting him off because the neighbor is indecisive? He still has the gnomes. The man has the gnomes, people." },
                { speaker: 'female', text: "Wanda: Let's keep it civil. Everyone gets a turn. Doug, you had your turn, you've had several turns, it's Mei's turn." },
                { speaker: 'female', text: "Mei: I just think... if my neighbor told me to take her creepy little men and then changed her mind, I would also be confused about whose men they are. Legally." },
                { speaker: 'female', text: "Aisha: That's actually the whole case in one sentence. 'Whose men are they.' That's reasonable doubt right there." },
                { speaker: 'male', text: "Doug: I cannot believe a garden gnome is going to ruin my entire week." },
                { speaker: 'female', text: "Wanda: Doug, can I ask you something, and I mean this kindly -- are you voting guilty because of the evidence, or because you want to be home by six?" },
                { speaker: 'male', text: "Doug: ...That's a low blow, Wanda. That's a very low blow. ...It might be partly the six o'clock thing." },
                { speaker: 'female', text: "Aisha: Then let's actually look at the texts together. All of us. One time. And if you still say guilty after that, fine, we keep talking. But let's look." },
                { speaker: 'male', text: "Doug: ...Fine. Pass me the exhibit. The real one. Not Wanda's pretzel-stained copy." },
                { speaker: 'female', text: "Wanda: That stain is from snacks I generously shared. With this jury. That I am leading." },
            ],
            japanese: [
                { speaker: 'female', text: "Wanda: では、正式に選ばれた陪審長として -- ありがとう、ありがとう、ほぼ全会一致だったわ -- まず初回投票をしましょう。挙手で。有罪だと思う人？" },
                { speaker: 'male', text: "Doug: 有罪。当然だ。もう帰れる？" },
                { speaker: 'female', text: "Aisha: 「帰る」のは無理よ、ダグ、ちゃんと合意しなきゃ。で私は無罪、2通目のテキストのせいでね、みんな忘れ続けてるけど。" },
                { speaker: 'female', text: "Mei: 2通目って何て書いてあったんだっけ？メモしたんだけど、字が興奮しちゃって。" },
                { speaker: 'female', text: "Aisha: 隣人が翌朝こう送ってる。「気が変わった、小さい男たち返して」。彼はもう4体を母親にあげてた。それは窃盗じゃない、返品ポリシーの揉め事よ。" },
                { speaker: 'male', text: "Trevor: なるほど、それは俺の中で話が変わるな。人にノームを贈っといて、贈与を取り消すなんてできない。ノームはそういうもんじゃない。贈り物はそういうもんじゃない。" },
                { speaker: 'male', text: "Doug: で今度は、隣人が優柔不断だからって無罪放免か？こいつはまだノームを持ってるんだぞ。男はノームを持ってるんだ、みんな。" },
                { speaker: 'female', text: "Wanda: 穏やかにいきましょう。全員に順番が回るわ。ダグ、あなたは順番が来た、何回も来た、今はメイの番。" },
                { speaker: 'female', text: "Mei: 私が思うのは... もし自分の隣人に「うちの気味悪い小さい男たち持ってって」と言われて、その後気が変わられたら、私もそれが誰の男たちなのか混乱すると思う。法的に。" },
                { speaker: 'female', text: "Aisha: それ実は事件全体を一文で表してる。「それは誰の男たちなのか」。それこそが合理的な疑いよ。" },
                { speaker: 'male', text: "Doug: 庭のノームに一週間まるごと潰されるなんて信じられん。" },
                { speaker: 'female', text: "Wanda: ダグ、ひとつ聞いていい、悪気はないんだけど -- あなたが有罪に投票するのは証拠のため？それとも6時までに家に帰りたいから？" },
                { speaker: 'male', text: "Doug: ...それは卑怯だぞ、ワンダ。すごく卑怯だ。...一部は6時の件かもしれん。" },
                { speaker: 'female', text: "Aisha: じゃあ実際にテキストを一緒に見ましょう。全員で。一度だけ。それでもまだ有罪って言うなら、いいわ、話を続ける。でもまず見ましょう。" },
                { speaker: 'male', text: "Doug: ...分かった。証拠を渡せ。本物のやつだ。ワンダのプレッツェルの染みが付いたコピーじゃなくてな。" },
                { speaker: 'female', text: "Wanda: あの染みは、私が気前よく分けたお菓子のよ。この陪審にね。私が率いてるこの陪審に。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 5 (Jun 18) -- THE VERDICT
    // ============================================================
    {
        id: 'jury-day5',
        date: '2026-06-18',
        title: 'Day 5: The Verdict',
        titleJa: 'Day 5: 評決',
        content: '評議の末、7人はようやく評決にたどり着く。法廷でワンダが評決を読み上げ、ハロラン判事が締めくくる。一週間をともにした陪審員たちが、解散前に思いがけず別れを惜しむ。',
        series: 'jury-duty',
        seriesTitle: 'Jury Duty',
        tone: 'reflective',
        tags: ['court', 'jury', 'comedy', 'verdict', 'goodbyes'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Judge Halloran: Members of the jury, I'm told you've reached a verdict. Madam Foreperson, would you please stand and read it." },
                { speaker: 'female', text: "Wanda: We have, Your Honor. On the charge of theft of fourteen lawn gnomes, we, the jury, find the defendant... not guilty. On the grounds that you cannot steal what was, and I quote, 'given away because they were creepy.'" },
                { speaker: 'male', text: "Judge Halloran: ...I'm going to allow that phrasing, because it is, regrettably, accurate. The defendant is free to go. He may keep the gnomes." },
                { speaker: 'male', text: "Doug: For the record, I came around. I want everyone to know I came around. The second text got me. I'm a reasonable man." },
                { speaker: 'female', text: "Aisha: You came around on day four after Wanda accused you of just wanting dinner, but yes, Doug, you came around. We're proud of you." },
                { speaker: 'male', text: "Trevor: Hey -- I never caught my flight Thursday. And honestly? I'm not even mad. I'd have missed the whole gnome saga." },
                { speaker: 'female', text: "Mei: This was my first one and I genuinely don't know if they're all this good. Was this a good one? I feel like this was a good one." },
                { speaker: 'male', text: "Bailiff Reyes: Mei, in nineteen years, this is the gnome case. You peaked. It is all downhill from here. Treasure it." },
                { speaker: 'female', text: "Wanda: I just want to say, leading this jury has been one of the great honors of my life, and I will be keeping the sign-up sheet. For my scrapbook." },
                { speaker: 'male', text: "Doug: You're putting us in a scrapbook?" },
                { speaker: 'female', text: "Wanda: You're 'cheese and crackers,' Doug. You always were. Right next to Trevor's pretzels." },
                { speaker: 'female', text: "Aisha: Honestly, I came in wanting in and out, one day, done -- and now I'm a little sad it's over. That's embarrassing to admit in a courthouse." },
                { speaker: 'male', text: "Trevor: Should we, like, exchange numbers? Is that weird? We deliberated together. That has to mean something." },
                { speaker: 'female', text: "Mei: It's not weird. We decided the fate of fourteen gnomes together. We're basically a family now." },
                { speaker: 'male', text: "Judge Halloran: This court thanks you for your service. Truly. Now please clear my courtroom before you start crying in it. People are waiting." },
                { speaker: 'female', text: "Wanda: You heard the judge, jury. Pretzels, cheese and crackers, everybody -- let's go. Granola bars are on me." },
            ],
            japanese: [
                { speaker: 'male', text: "Judge Halloran: 陪審員の皆さん、評決に達したと聞いています。陪審長、お立ちになって読み上げてください。" },
                { speaker: 'female', text: "Wanda: 達しました、裁判長。芝生のノーム14体窃盗の訴因について、我々陪審は、被告人を... 無罪とします。引用するに「気味が悪いから譲られた」ものを盗むことはできない、という理由により。" },
                { speaker: 'male', text: "Judge Halloran: ...その言い回しを認めましょう、なぜなら、残念ながら、正確だからです。被告人は釈放。ノームは所持して構いません。" },
                { speaker: 'male', text: "Doug: 記録のために言うが、俺は考えを改めた。みんなに知っておいてほしい、俺は改めたんだ。2通目のテキストにやられた。俺は理性的な男だ。" },
                { speaker: 'female', text: "Aisha: あなたが改めたのは4日目、ワンダに「ただ夕飯が食べたいだけ」って突かれた後だけどね、でもそう、ダグ、改めたわ。誇らしいわよ。" },
                { speaker: 'male', text: "Trevor: なあ -- 結局木曜の飛行機には乗れなかった。でも正直さ？全然怒ってない。ノーム騒動を丸ごと見逃すところだった。" },
                { speaker: 'female', text: "Mei: 初めてだったから、みんなこんなにいいやつなのか本当に分からない。これっていいやつだった？いいやつだった気がする。" },
                { speaker: 'male', text: "Bailiff Reyes: メイ、19年やってきて、これがあのノーム事件です。あなたは頂点を極めた。ここから先は下り坂だけ。大事にして。" },
                { speaker: 'female', text: "Wanda: 一言だけ言わせて、この陪審を率いたことは人生の大きな名誉のひとつでした、で申込シートは私が保管します。スクラップブック用に。" },
                { speaker: 'male', text: "Doug: 俺たちをスクラップブックに入れるのか？" },
                { speaker: 'female', text: "Wanda: あなたは「チーズとクラッカー」よ、ダグ。ずっとそうだった。トレバーのプレッツェルのすぐ隣。" },
                { speaker: 'female', text: "Aisha: 正直、さっと入ってさっと出て1日で終わり、と思って来たのに -- 今はちょっと終わるのが寂しい。裁判所で認めるのは恥ずかしいけど。" },
                { speaker: 'male', text: "Trevor: 俺たち、連絡先交換しない？変かな？一緒に評議したんだぞ。それって何か意味があるはずだ。" },
                { speaker: 'female', text: "Mei: 変じゃないよ。一緒にノーム14体の運命を決めたんだもん。もうほぼ家族だよ。" },
                { speaker: 'male', text: "Judge Halloran: 当法廷は皆さんの務めに感謝します。心から。さあ法廷で泣き出す前に出てください。人が待ってるので。" },
                { speaker: 'female', text: "Wanda: 判事の言う通りよ、陪審のみんな。プレッツェル、チーズとクラッカー、全員 -- 行きましょう。グラノーラバーは私のおごり。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },
];
