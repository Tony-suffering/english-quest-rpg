/**
 * The DMV -- 5-episode conversation series for Memoria
 * Tony comes to renew his driver's license and gets sucked into the bureaucratic
 * black hole of the Department of Motor Vehicles. Over five visits he meets the
 * regulars: a seen-it-all window clerk, a transferring retiree, a terrified
 * teenager taking his road test, an old man waging war over a vanity plate.
 * 7 characters: Gloria (52F window clerk), Tony (33M renewing), Brenda (60F transfer),
 *   Kevin (17M first license), Mr Okafor (45M supervisor), Patrice (28F greeter/number desk),
 *   Vernon (70M vanity-plate complaint)
 * The 5 "days" are 5 episodes of one long license-renewal ordeal.
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, false starts, bureaucratic jargon vs civilian frustration.
 * Format: ~16-18 lines per day per language.
 */

export interface DmvRenewalEntry {
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

const generatedAt = new Date('2026-06-09T12:00:00.000Z');

export const dmvRenewalEntries: DmvRenewalEntry[] = [
    // ============================================================
    // DAY 1 (Jun 09) -- TAKE A NUMBER
    // ============================================================
    {
        id: 'dmv-day1',
        date: '2026-06-09',
        title: 'Day 1: Take a Number',
        titleJa: 'Day 1: 番号札を取って',
        content: 'トニーが運転免許の更新にDMVへ。受付のパトリスから番号G47を渡されるが、いま呼ばれているのはG12。2時間待ちが確定し、待合の常連たちと顔見知りになっていく。',
        series: 'dmv-renewal',
        seriesTitle: 'The DMV',
        tone: 'humorous',
        tags: ['dmv', 'bureaucracy', 'comedy', 'waiting', 'errands'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Patrice: Morning. What are you here for today -- renewal, new license, registration, road test?" },
                { speaker: 'male', text: "Tony: Just a renewal. It should be quick, right? It's just a renewal." },
                { speaker: 'female', text: "Patrice: Mm. Take this. You're G47. We're currently serving G12." },
                { speaker: 'male', text: "Tony: ...G12. And I'm G47. So that's, what, thirty-five people?" },
                { speaker: 'female', text: "Patrice: Thirty-five numbers. Some of them won't show, so it moves faster than it looks. Have a seat anywhere that's open." },
                { speaker: 'male', text: "Tony: Anywhere that's open. Right. There is one seat. It's next to a man who is asleep." },
                { speaker: 'female', text: "Vernon: I'm not asleep. I'm resting my eyes. Big difference. I've been here since they opened the doors." },
                { speaker: 'male', text: "Tony: Since they opened? What number are you?" },
                { speaker: 'female', text: "Vernon: Oh, I don't have a number. I'm not here for service. I'm here for justice. They rejected my plate. 'GR8GUY.' They said it could be read as offensive." },
                { speaker: 'female', text: "Brenda: Honey, everything is offensive to somebody. I moved here from Ohio and I have been trying to transfer my license for three days. Three days." },
                { speaker: 'male', text: "Tony: Three days? For a transfer?" },
                { speaker: 'female', text: "Brenda: Every time I come in, I'm missing one document. One. They tell me which one is missing only after I've waited two hours to reach the window. It's a system." },
                { speaker: 'male', text: "Kevin: Wait, so they don't tell you what you need up front?" },
                { speaker: 'female', text: "Brenda: They cannot, sweetheart. That would be helpful. Who are you?" },
                { speaker: 'male', text: "Kevin: Kevin. I'm here for my road test. I'm seventeen. I think I'm gonna throw up." },
                { speaker: 'female', text: "Brenda: You'll be fine. Sit down. We're all in this together now -- welcome to the longest wait of your life." },
            ],
            japanese: [
                { speaker: 'female', text: "Patrice: おはようございます。本日はどのご用件ですか -- 更新、新規、登録、路上試験？" },
                { speaker: 'male', text: "Tony: 更新だけです。すぐ終わりますよね？更新だけなんで。" },
                { speaker: 'female', text: "Patrice: ふーん。これどうぞ。あなたはG47。ただいまG12をお呼びしています。" },
                { speaker: 'male', text: "Tony: ...G12。で俺がG47。ってことは、えっと、35人？" },
                { speaker: 'female', text: "Patrice: 35番分です。来ない人もいるので、見た目より早く進みます。空いてる席にどうぞ。" },
                { speaker: 'male', text: "Tony: 空いてる席に。はい。1席あります。寝てる男性の隣です。" },
                { speaker: 'female', text: "Vernon: 寝てない。目を休めてるんだ。全然違う。開門したときからここにいるんだぞ。" },
                { speaker: 'male', text: "Tony: 開門から？番号は何番ですか？" },
                { speaker: 'female', text: "Vernon: いや、番号は持ってない。手続きで来たんじゃない。正義のために来たんだ。ナンバープレートを却下されてな。「GR8GUY」。不快に読まれる可能性があるとさ。" },
                { speaker: 'female', text: "Brenda: あなた、何だって誰かには不快なのよ。私オハイオから引っ越してきて、免許の移管を3日やってるの。3日よ。" },
                { speaker: 'male', text: "Tony: 3日？移管で？" },
                { speaker: 'female', text: "Brenda: 来るたびに書類が1個足りないの。1個。しかも足りないのがどれかは、2時間並んで窓口に着いてからしか教えてくれない。これはもう仕組みよ。" },
                { speaker: 'male', text: "Kevin: えっ、じゃあ何が必要か最初に教えてくれないんですか？" },
                { speaker: 'female', text: "Brenda: 教えられないのよ、坊や。それじゃ親切になっちゃうでしょ。あなた誰？" },
                { speaker: 'male', text: "Kevin: ケビンです。路上試験で来ました。17歳です。吐きそうです。" },
                { speaker: 'female', text: "Brenda: 大丈夫よ。座って。もう私たち運命共同体ね -- 人生で一番長い待ち時間へようこそ。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 2 (Jun 10) -- THE WRONG FORM
    // ============================================================
    {
        id: 'dmv-day2',
        date: '2026-06-10',
        title: 'Day 2: The Wrong Form',
        titleJa: 'Day 2: 間違った用紙',
        content: 'ついにトニーが窓口へ。クラークのグロリアは、トニーが記入したのが間違った用紙で、しかも住所証明が足りないと淡々と告げる。出直しが確定する。',
        series: 'dmv-renewal',
        seriesTitle: 'The DMV',
        tone: 'humorous',
        tags: ['dmv', 'bureaucracy', 'comedy', 'paperwork', 'clerk'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Gloria: G47. Window six. Let's go, hon, I don't have all day -- well, I do, technically, but you don't. What do you need?" },
                { speaker: 'male', text: "Tony: License renewal. I filled out the whole form. Here. I even did the part in the gray box, and the gray box says do not write in the gray box." },
                { speaker: 'female', text: "Gloria: Yeah, that's the wrong form. This is the DL-44. You want the DL-44A. The A is the renewal." },
                { speaker: 'male', text: "Tony: They look identical." },
                { speaker: 'female', text: "Gloria: They are identical except for the A. That's how we get you. Okay -- and I'm gonna need proof of residency. Two documents, dated within ninety days." },
                { speaker: 'male', text: "Tony: I brought my old license. It has my address on it." },
                { speaker: 'female', text: "Gloria: Your license is the thing we're verifying. We can't verify a thing using the thing. A utility bill, a bank statement, a lease -- something that came in the mail." },
                { speaker: 'male', text: "Tony: Nothing comes in the mail anymore. It's all online." },
                { speaker: 'female', text: "Gloria: I hear that fifty times a day, and the answer's the same: print it out. A printed PDF counts. We are nothing if not reasonable." },
                { speaker: 'male', text: "Tony: So I waited two hours to find out I have to come back." },
                { speaker: 'female', text: "Gloria: You waited two hours to find out exactly what to bring. Last guy figured it out on visit four. You're ahead of the curve." },
                { speaker: 'female', text: "Brenda: He's a fast learner, Gloria. Go easy on him. He's new." },
                { speaker: 'female', text: "Gloria: Oh, hi Brenda. Did you bring the proof of insurance this time, or are we doing this dance again?" },
                { speaker: 'female', text: "Brenda: ...I brought the proof of insurance. I did not bring the second form of ID." },
                { speaker: 'female', text: "Gloria: Brenda." },
                { speaker: 'female', text: "Brenda: I know, Gloria. I know. Don't say it. I'll see you Thursday." },
            ],
            japanese: [
                { speaker: 'female', text: "Gloria: G47番。6番窓口。さあ来て、一日中はないのよ -- まあ厳密にはあるけど、あなたにはない。ご用件は？" },
                { speaker: 'male', text: "Tony: 免許の更新です。全部記入しました。これです。グレーの枠のとこも書きました、グレーの枠には「書き込まないでください」って書いてあったけど。" },
                { speaker: 'female', text: "Gloria: ええ、それ間違った用紙ね。これはDL-44。あなたが欲しいのはDL-44A。Aが更新用なの。" },
                { speaker: 'male', text: "Tony: 見た目同じじゃないですか。" },
                { speaker: 'female', text: "Gloria: Aの違いだけで全部同じよ。そうやって引っかけるの。はい -- それと住所証明が要る。書類2点、90日以内の日付のもの。" },
                { speaker: 'male', text: "Tony: 古い免許持ってきました。住所が載ってます。" },
                { speaker: 'female', text: "Gloria: その免許こそ私たちが確認しようとしてる物なの。その物を使ってその物は確認できないのよ。公共料金の請求書、銀行の明細、賃貸契約 -- 郵便で届いた何か。" },
                { speaker: 'male', text: "Tony: もう郵便なんて何も来ないですよ。全部オンラインで。" },
                { speaker: 'female', text: "Gloria: 一日に50回聞くわ、で答えはいつも同じ。印刷して。印刷したPDFでいいの。これでも筋は通してるのよ。" },
                { speaker: 'male', text: "Tony: つまり2時間並んで、出直さなきゃいけないって分かっただけ。" },
                { speaker: 'female', text: "Gloria: 2時間並んで、何を持ってくればいいか正確に分かったの。前の人は4回目で気づいたわよ。あなた先行ってる方。" },
                { speaker: 'female', text: "Brenda: この子飲み込み早いわよ、グロリア。優しくしてあげて。新人なんだから。" },
                { speaker: 'female', text: "Gloria: あら、こんにちはブレンダ。今日は保険証明持ってきた？それともまたこのダンスやる？" },
                { speaker: 'female', text: "Brenda: ...保険証明は持ってきた。2点目の身分証は持ってこなかった。" },
                { speaker: 'female', text: "Gloria: ブレンダ。" },
                { speaker: 'female', text: "Brenda: 分かってる、グロリア。分かってる。言わないで。木曜にまた来るわ。" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 3 (Jun 11) -- THE EYE TEST
    // ============================================================
    {
        id: 'dmv-day3',
        date: '2026-06-11',
        title: 'Day 3: The Eye Test',
        titleJa: 'Day 3: 視力検査',
        content: '書類をそろえて出直したトニー。今度は視力検査でつまずく。1行目から読めず軽くパニック。隣ではケビンが路上試験前で震えている。',
        series: 'dmv-renewal',
        seriesTitle: 'The DMV',
        tone: 'playful',
        tags: ['dmv', 'bureaucracy', 'comedy', 'eye-test', 'nerves'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Gloria: Okay, NOW you've got the right form, the right documents -- look at you. Growth. Step up to the machine, put your forehead on the rest, and read me line four." },
                { speaker: 'male', text: "Tony: Line four. Okay. It's, um... E? F? There's definitely a P. And then it gets kind of... soft." },
                { speaker: 'female', text: "Gloria: Soft." },
                { speaker: 'male', text: "Tony: Like the letters are there but they're keeping their distance from me emotionally." },
                { speaker: 'female', text: "Gloria: That's line four. People your age usually clear line six. When did you last get your eyes checked?" },
                { speaker: 'male', text: "Tony: I -- okay, define 'last.' Recently-ish. There was a thing. I've been meaning to." },
                { speaker: 'female', text: "Gloria: So never. That's fine. You pass at line four, barely, but I'm putting a corrective-lenses restriction on the license. You drive with glasses now. Welcome to your thirties." },
                { speaker: 'male', text: "Tony: I'm thirty-three. I didn't agree to this." },
                { speaker: 'female', text: "Gloria: Nobody agrees to it, hon. It just happens to you in a government building under bad lighting." },
                { speaker: 'male', text: "Kevin: Mr Tony? Is the eye test hard? I have to do it before my road test and I already feel like I can't see." },
                { speaker: 'male', text: "Tony: It's not hard, Kevin, it's -- okay, it's a little hard. But you're seventeen. Your eyes are brand new. You'll smoke it." },
                { speaker: 'male', text: "Kevin: My hands are shaking. Look. Is that normal? Examiner's gonna be in my car. Judging every move. Watching me parallel park." },
                { speaker: 'male', text: "Tony: Hey. Look at me. Everybody in this room has failed at something today, including me, ten minutes ago, with my own eyeballs. You're gonna be fine." },
                { speaker: 'male', text: "Kevin: ...Okay. Okay. That actually helped." },
                { speaker: 'female', text: "Gloria: That was almost touching. Now both of you move along, I've got a line out the door and Vernon is filming me again." },
                { speaker: 'female', text: "Vernon: For the record! For when this goes to the board!" },
            ],
            japanese: [
                { speaker: 'female', text: "Gloria: よし、今度は正しい用紙、正しい書類 -- 見違えたわ。成長ね。機械の前に立って、おでこを台に乗せて、4行目を読んで。" },
                { speaker: 'male', text: "Tony: 4行目。はい。えっと... E？F？Pは確実にある。で、そこから先が、なんか... ぼやけてくる。" },
                { speaker: 'female', text: "Gloria: ぼやける。" },
                { speaker: 'male', text: "Tony: 文字はあるんだけど、俺と感情的に距離を取ってる感じで。" },
                { speaker: 'female', text: "Gloria: それが4行目よ。あなたの歳ならふつう6行目までいけるの。最後に目を検査したのいつ？" },
                { speaker: 'male', text: "Tony: 俺 -- えっと「最後」の定義は。最近っぽい時。いろいろあって。ずっと行こうとは思ってて。" },
                { speaker: 'female', text: "Gloria: つまり一度もないのね。いいわ。4行目でギリ合格、でも免許に矯正レンズの条件を付けるわよ。これからメガネで運転ね。30代へようこそ。" },
                { speaker: 'male', text: "Tony: 33ですけど。こんなの同意してません。" },
                { speaker: 'female', text: "Gloria: 誰も同意なんてしないのよ。役所の建物の悪い照明の下で、勝手に降りかかってくるの。" },
                { speaker: 'male', text: "Kevin: トニーさん？視力検査って難しいですか？路上試験の前にやらなきゃで、もう見えない気がしてて。" },
                { speaker: 'male', text: "Tony: 難しくないよ、ケビン、それは -- まあ、ちょっと難しい。でも君は17だ。目が新品だ。楽勝だよ。" },
                { speaker: 'male', text: "Kevin: 手が震えてます。見て。これ普通ですか？試験官が車に乗ってくるんですよ。一挙手一投足を見られて。縦列駐車も見られて。" },
                { speaker: 'male', text: "Tony: おい。俺を見ろ。この部屋の全員が今日なにかしら失敗してる、俺も含めて、10分前に、自分の眼球で。君は大丈夫だ。" },
                { speaker: 'male', text: "Kevin: ...はい。はい。今のけっこう効きました。" },
                { speaker: 'female', text: "Gloria: ちょっと感動的だったわね。さあ二人とも進んで、ドアの外まで列ができてるの、それにバーノンがまた私を撮影してる。" },
                { speaker: 'female', text: "Vernon: 記録のためだ！これが委員会にかかったときのためにな！" },
            ],
            generatedAt,
            tone: 'playful',
        },
    },

    // ============================================================
    // DAY 4 (Jun 12) -- THE ROAD TEST
    // ============================================================
    {
        id: 'dmv-day4',
        date: '2026-06-12',
        title: 'Day 4: The Road Test',
        titleJa: 'Day 4: 路上試験',
        content: '監督官のオカフォー氏がケビンの路上試験を担当する。緊張で珍プレー続出のケビン。一方トニーは写真撮影の列で待ちながら、戻ってきたケビンの結果を固唾をのんで見守る。',
        series: 'dmv-renewal',
        seriesTitle: 'The DMV',
        tone: 'humorous',
        tags: ['dmv', 'bureaucracy', 'comedy', 'road-test', 'supervisor'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Mr Okafor: Kevin? I'm Mr Okafor, I'll be your examiner. Take a breath. I'm not here to fail you, I'm here to see if you can drive. Those are different things." },
                { speaker: 'male', text: "Kevin: Yes sir. Thank you sir. Should I -- do I start the car now, or do you say when?" },
                { speaker: 'male', text: "Mr Okafor: Start the car whenever you're ready. And Kevin? Adjust your mirrors before you pull out. That's a free point. I just gave you a point." },
                { speaker: 'male', text: "Kevin: Mirrors. Right. Okay. ...The wipers are on. Why are the wipers on. It's not raining." },
                { speaker: 'male', text: "Mr Okafor: Take your time. Find the wipers. There is no clock on this. There's a clock, but I'm not telling you about it." },
                { speaker: 'male', text: "Tony: How's he doing out there? I can see the car. It hasn't moved in four minutes." },
                { speaker: 'female', text: "Patrice: Sir, you're in line for the photo. Please face forward. You'll get your turn." },
                { speaker: 'male', text: "Tony: I know, I know, I just -- that kid was shaking earlier. I'm invested now. We've all been waiting together for four days." },
                { speaker: 'female', text: "Patrice: ...The car's moving. Okay, it's moving. He's signaling. Good signal." },
                { speaker: 'male', text: "Tony: He's signaling! Look at him go! Okay, that's a wide turn, that's a really wide turn -- come on, Kevin, tighten it up --" },
                { speaker: 'female', text: "Patrice: Sir." },
                { speaker: 'male', text: "Tony: Sorry. Sorry. Facing forward." },
                { speaker: 'male', text: "Mr Okafor: ...Alright, Kevin, bring it back in, nice and slow, park it in the same spot you started. No, you've got room. You've got tons of room. Stop apologizing and park." },
                { speaker: 'male', text: "Kevin: Did I pass? I clipped the cone. I definitely clipped the cone. I felt it." },
                { speaker: 'male', text: "Mr Okafor: You tapped the cone. Tapping is a deduction, not a fail. You signaled, you checked your blind spot, you didn't panic when the wipers betrayed you. Kevin -- you passed." },
                { speaker: 'male', text: "Kevin: I PASSED? Tony, I passed! Did you hear that?" },
                { speaker: 'male', text: "Tony: I heard it, kid! I'm so proud and I barely know you!" },
            ],
            japanese: [
                { speaker: 'male', text: "Mr Okafor: ケビン？オカフォーです、試験官を務めます。深呼吸して。落とすために来たんじゃない、運転できるか見に来たんだ。それは別物だよ。" },
                { speaker: 'male', text: "Kevin: はい。ありがとうございます。あの -- 今エンジンかけますか、それとも合図を待ちますか？" },
                { speaker: 'male', text: "Mr Okafor: 準備ができたらいつでもかけて。それとケビン？発進する前にミラーを調整して。それ無料の点だよ。今1点あげた。" },
                { speaker: 'male', text: "Kevin: ミラー。はい。よし。...ワイパーが動いてる。なんでワイパーが動いてるんだ。雨降ってないのに。" },
                { speaker: 'male', text: "Mr Okafor: ゆっくりでいい。ワイパー探して。これに時間制限はない。あるけど、君には言わない。" },
                { speaker: 'male', text: "Tony: あの子どうなってる？車見えるんだ。4分動いてない。" },
                { speaker: 'female', text: "Patrice: お客様、写真の列に並んでます。前を向いてください。順番は来ますから。" },
                { speaker: 'male', text: "Tony: 分かってる、分かってる、ただ -- あの子さっき震えてたんだ。もう感情移入しちゃって。みんなで4日間一緒に待ったんだよ。" },
                { speaker: 'female', text: "Patrice: ...車動いた。よし、動いてる。ウインカー出してる。いいウインカー。" },
                { speaker: 'male', text: "Tony: ウインカー出してる！いいぞ！おっと、曲がりが大きい、めっちゃ大きい -- 頼むケビン、もっと小さく曲がれ --" },
                { speaker: 'female', text: "Patrice: お客様。" },
                { speaker: 'male', text: "Tony: すみません。すみません。前向きます。" },
                { speaker: 'male', text: "Mr Okafor: ...よし、ケビン、ゆっくり戻して、スタートした場所と同じ所に停めて。いや、スペースはある。たっぷりある。謝るのやめて停めて。" },
                { speaker: 'male', text: "Kevin: 受かりましたか？コーンかすりました。絶対かすった。感触ありました。" },
                { speaker: 'male', text: "Mr Okafor: コーンに軽く触れただけ。接触は減点であって不合格じゃない。ウインカー出して、死角も確認して、ワイパーに裏切られてもパニックにならなかった。ケビン -- 合格だ。" },
                { speaker: 'male', text: "Kevin: 受かった？トニー、受かりました！聞きました？" },
                { speaker: 'male', text: "Tony: 聞いたよ坊主！すごく誇らしい、ほとんど君のこと知らないのに！" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 5 (Jun 13) -- SMILE FOR THE CAMERA
    // ============================================================
    {
        id: 'dmv-day5',
        date: '2026-06-13',
        title: 'Day 5: Smile for the Camera',
        titleJa: 'Day 5: カメラに笑顔を',
        content: 'ついにトニーの写真撮影。最悪の出来栄えに固まる。バーノンのナンバープレート問題にもようやく決着がつき、4日間をともにした待合の面々が別れの挨拶を交わす。',
        series: 'dmv-renewal',
        seriesTitle: 'The DMV',
        tone: 'reflective',
        tags: ['dmv', 'bureaucracy', 'comedy', 'photo', 'goodbyes'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Patrice: Okay, Tony, last step. Stand on the line, chin up, and look at the little camera, not at me. No big smile -- they don't allow teeth anymore. Just a neutral, pleasant -- and we're done." },
                { speaker: 'male', text: "Tony: Wait, that's it? Can I see it? I want to see it before it's on a card for eight years." },
                { speaker: 'female', text: "Patrice: ...You can see it." },
                { speaker: 'male', text: "Tony: Oh, no. No no no. My eyes are half closed. I look like I'm being woken up against my will. Can we do it again?" },
                { speaker: 'female', text: "Patrice: We cannot do it again. That's the one. That's you until 2034." },
                { speaker: 'male', text: "Tony: I waited four days for the worst photo ever taken of a human being." },
                { speaker: 'female', text: "Gloria: Everybody's license photo is a hostage photo, hon. Mine looks like a mugshot from 1987. It's tradition. You're official now." },
                { speaker: 'male', text: "Mr Okafor: Vernon. Good news and bad news. The board reviewed your plate. 'GR8GUY' is denied -- but they approved 'GR8GUY1.' Apparently the one makes it personal, not offensive." },
                { speaker: 'female', text: "Vernon: ...I'll take it. Four months of fighting and I'll take the one. That's a win. That's basically a win." },
                { speaker: 'female', text: "Brenda: Gloria. Gloria, look at me. I have the insurance, I have the second ID, I have the proof of residency, I have it ALL. Process me. Process me right now before I lose something." },
                { speaker: 'female', text: "Gloria: ...Brenda. It's all here. Everything's here. Day four, but you did it. You're a resident. Welcome home." },
                { speaker: 'female', text: "Brenda: I could cry. I'm not going to, in a DMV, but I could." },
                { speaker: 'male', text: "Kevin: Guys -- I came back to show you. Look. Real license. My photo's terrible too, Tony, if it helps." },
                { speaker: 'male', text: "Tony: It does help, actually. Let me see -- oh, yeah, that's rough. We match. Honestly? This place was miserable and I'm weirdly gonna miss it." },
                { speaker: 'female', text: "Gloria: Don't get sentimental in my line. But -- yeah. You people weren't the worst. Now get out of my DMV. All of you. I mean it. Lovingly." },
                { speaker: 'male', text: "Tony: See you in eight years, Gloria. Try not to change a thing." },
            ],
            japanese: [
                { speaker: 'female', text: "Patrice: はい、トニー、最後の手順。線の上に立って、あごを上げて、小さいカメラを見て、私じゃなくて。大きい笑顔はダメ -- 今は歯を見せるの禁止なの。自然で感じのいい感じで -- はい終わり。" },
                { speaker: 'male', text: "Tony: えっ、それだけ？見られますか？8年間カードに載る前に見たいんですけど。" },
                { speaker: 'female', text: "Patrice: ...見られますよ。" },
                { speaker: 'male', text: "Tony: ああ、ダメだ。ダメダメダメ。目が半分閉じてる。無理やり起こされてる人みたいだ。もう一回いけますか？" },
                { speaker: 'female', text: "Patrice: もう一回はできません。これで確定。2034年までこれがあなたです。" },
                { speaker: 'male', text: "Tony: 4日待って、人類史上最悪の写真を撮られた。" },
                { speaker: 'female', text: "Gloria: 免許の写真なんてみんな人質写真よ。私のなんて1987年の手配写真みたい。伝統なの。これであなたも正式な人ね。" },
                { speaker: 'male', text: "Mr Okafor: バーノン。いい知らせと悪い知らせだ。委員会が君のプレートを審査した。「GR8GUY」は却下 -- でも「GR8GUY1」は承認された。1を付けると、不快じゃなくて個人的になるらしい。" },
                { speaker: 'female', text: "Vernon: ...それでいい。4ヶ月戦って、1付きで手を打つ。勝ちだ。実質勝ちだ。" },
                { speaker: 'female', text: "Brenda: グロリア。グロリア、私を見て。保険ある、2点目の身分証ある、住所証明ある、全部あるの。手続きして。何か失くす前に今すぐ手続きして。" },
                { speaker: 'female', text: "Gloria: ...ブレンダ。全部そろってる。全部ここにある。4日目だけど、やったわね。あなたは住民よ。おかえりなさい。" },
                { speaker: 'female', text: "Brenda: 泣きそう。DMVでは泣かないけど、でも泣きそう。" },
                { speaker: 'male', text: "Kevin: みんな -- 見せに戻ってきました。これ。本物の免許。俺の写真もひどいですよ、トニー、慰めになるなら。" },
                { speaker: 'male', text: "Tony: 実際なるよ。見せて -- うわ、ほんとひどいな。おそろいだ。正直さ？ここ最悪だったのに、なぜか寂しくなりそうだ。" },
                { speaker: 'female', text: "Gloria: 私の列でセンチメンタルにならないで。でも -- まあね。あなたたち最悪じゃなかった。さあ私のDMVから出てって。全員。本気よ。愛を込めて。" },
                { speaker: 'male', text: "Tony: 8年後にまた、グロリア。何ひとつ変わらないでくれよ。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },
];
