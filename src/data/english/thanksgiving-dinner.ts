/**
 * Thanksgiving Dinner -- 5-day conversation series for Memoria
 * Three generations crammed into Grandma Lorraine's dining room for Thanksgiving.
 * A deep-fried turkey threat, a surprise vegan, a fresh divorce, and a casserole nobody asked for.
 * 8 characters: Grandma Lorraine (74F host), Rick (48M son), Carol (46F daughter-in-law),
 *   Aunt Pam (52F daughter), Spencer (19M grandson), Brianna (16F granddaughter),
 *   Uncle Lou (55M Pam's ex), Grandpa Stan (76M husband)
 * May 25 - May 29, 2026
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, passive-aggressive family warmth, talking over each other.
 * ~16-18 lines per day per language.
 */

export interface ThanksgivingDinnerEntry {
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

const generatedAt = new Date('2026-05-25T12:00:00.000Z');

export const thanksgivingDinnerEntries: ThanksgivingDinnerEntry[] = [
    // ============================================================
    // DAY 1 (May 25) -- THE ARRIVALS
    // ============================================================
    {
        id: 'thanksgiving-day1',
        date: '2026-05-25',
        title: 'Day 1: The Arrivals',
        titleJa: 'Day 1: 到着',
        content: '30年同じ家でサンクスギビングを開くローレンばあちゃんの家に家族が続々到着。リックが今年は七面鳥を油で揚げると宣言してばあちゃん絶句。スペンサーは大学からヴィーガンになって帰ってきたが誰にも言ってなかった。',
        series: 'thanksgiving',
        seriesTitle: 'Thanksgiving Dinner',
        tone: 'humorous',
        tags: ['thanksgiving', 'family', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Grandma Lorraine: There they are! Come in, come in, get out of the cold -- and Rick, honey, what on earth is that giant metal pot in your trunk?" },
                { speaker: 'male', text: "Rick: That, Mom, is a turkey fryer. Thirty quarts. I've been watching videos all month. This year we are deep-frying the bird." },
                { speaker: 'female', text: "Grandma Lorraine: Absolutely not. In MY house we roast the turkey, the way we have for thirty-two years, the way my mother did before me." },
                { speaker: 'female', text: "Carol: Rick, I told you to leave it home. Lorraine, I'm so sorry -- hi, happy Thanksgiving, I brought a deconstructed green bean casserole, I'll explain it later." },
                { speaker: 'female', text: "Aunt Pam: A deconstructed what? Carol, it's a casserole. The whole point is that it's all in one dish." },
                { speaker: 'female', text: "Carol: It's the same flavors, Pam, it's just -- the beans are blanched separately, the crispy onions are a garnish, the mushroom cream is a little quenelle on the side --" },
                { speaker: 'female', text: "Aunt Pam: A quenelle. Okay. Mom, is the wine open? I'm asking for me." },
                { speaker: 'female', text: "Grandma Lorraine: It's only four o'clock, Pam." },
                { speaker: 'female', text: "Aunt Pam: And I have been divorced for six weeks, Mom, so the wine is open. I'll get it myself." },
                { speaker: 'female', text: "Brianna: I'm filming all of this, by the way. Grandma's face when Dad said deep-fryer -- that was content. That's going in the family group chat." },
                { speaker: 'male', text: "Spencer: Hey, um -- before we get to the food, I should probably mention something. So, this semester, I kind of -- I went vegan. Like, fully. A while ago, actually." },
                { speaker: 'female', text: "Carol: You went WHAT? Spencer, honey, I have been cooking for two days. Two days. There is bacon in the brussels sprouts." },
                { speaker: 'male', text: "Spencer: I know, and I'm not trying to make it a thing, I just -- I didn't want to sit down and surprise everybody, so I'm telling you now. I'll eat sides. It's fine. Mostly sides aren't a problem, right?" },
                { speaker: 'female', text: "Aunt Pam: The sides all have butter, the gravy has turkey in it, and the rolls have egg. Welcome home, sweetie." },
                { speaker: 'male', text: "Uncle Lou: Hey, hey, the whole gang's here! Pam. You look -- you look really good. Divorce agrees with you. That came out wrong. Happy Thanksgiving, everybody." },
                { speaker: 'female', text: "Aunt Pam: Why is he here. Mom. Why is my ex-husband in your living room." },
                { speaker: 'female', text: "Grandma Lorraine: Lou has nowhere else to go, Pam, and it is Thanksgiving, and we do not turn people away in this house. Now everybody wash your hands, dinner is at six." },
                { speaker: 'male', text: "Grandpa Stan: ...Is it dinner?" },
            ],
            japanese: [
                { speaker: 'female', text: "Grandma Lorraine: 来たわね！入って入って、寒いから早く -- それでリック、あんた、トランクに積んでるあの巨大な金属の鍋は一体なんなの？" },
                { speaker: 'male', text: "Rick: あれはね、母さん、七面鳥のフライヤーだよ。30クォート。今月ずっと動画を見てたんだ。今年は鳥を油で揚げる。" },
                { speaker: 'female', text: "Grandma Lorraine: 絶対にダメ。私の家では七面鳥はオーブンで焼くの、32年間ずっとそうしてきたし、その前は私の母がそうしてた。" },
                { speaker: 'female', text: "Carol: リック、家に置いてきてって言ったでしょ。ローレン、本当にごめんなさい -- こんにちは、ハッピーサンクスギビング。脱構築したインゲンのキャセロールを持ってきたの、後で説明するわ。" },
                { speaker: 'female', text: "Aunt Pam: 脱構築した何ですって？キャロル、キャセロールよ。全部ひとつの皿に入ってるのが意味なんだから。" },
                { speaker: 'female', text: "Carol: 味は同じよ、パム、ただね -- インゲンは別で湯通しして、カリカリオニオンは飾り、マッシュルームクリームは横に小さなクネルにして --" },
                { speaker: 'female', text: "Aunt Pam: クネルね。はいはい。母さん、ワインは開いてる？自分のために聞いてるの。" },
                { speaker: 'female', text: "Grandma Lorraine: まだ4時よ、パム。" },
                { speaker: 'female', text: "Aunt Pam: で、私は離婚して6週間なの、母さん。だからワインは開いてる。自分で取ってくる。" },
                { speaker: 'female', text: "Brianna: ちなみに全部撮ってるから。お父さんがフライヤーって言ったときのおばあちゃんの顔 -- あれは映像作品。家族のグループチャットに上げる。" },
                { speaker: 'male', text: "Spencer: ねえ、あの -- 食事の話になる前に、ひとつ言っといたほうがいいことがあって。今学期、僕、ちょっと -- ヴィーガンになったんだ。完全に。実はけっこう前から。" },
                { speaker: 'female', text: "Carol: 何になったって？スペンサー、お母さん2日かけて料理したのよ。2日。芽キャベツにベーコン入ってるのよ。" },
                { speaker: 'male', text: "Spencer: わかってる、大事にするつもりはないんだ、ただ -- 席についてみんなを驚かせたくなかったから、今言ってるんだよ。サイドを食べるから。大丈夫。だいたいサイドなら問題ないでしょ？" },
                { speaker: 'female', text: "Aunt Pam: サイドは全部バター入ってるし、グレイビーには七面鳥が入ってるし、ロールパンには卵。おかえりなさい、坊や。" },
                { speaker: 'male', text: "Uncle Lou: やあやあ、みんな揃ってるな！パム。きみ -- すごく元気そうだ。離婚が似合ってるよ。言い方が悪かった。みんな、ハッピーサンクスギビング。" },
                { speaker: 'female', text: "Aunt Pam: なんで彼がいるの。母さん。なんで私の元夫があなたのリビングにいるの。" },
                { speaker: 'female', text: "Grandma Lorraine: ルーは他に行くところがないのよ、パム、それにサンクスギビングだもの、この家では人を追い返したりしない。さあみんな手を洗って、夕食は6時よ。" },
                { speaker: 'male', text: "Grandpa Stan: ...夕食か？" },
            ],
            generatedAt,
            tone: 'humorous',
        },
    },

    // ============================================================
    // DAY 2 (May 26) -- THE KITCHEN
    // ============================================================
    {
        id: 'thanksgiving-day2',
        date: '2026-05-26',
        title: 'Day 2: The Kitchen',
        titleJa: 'Day 2: キッチン',
        content: 'キッチンは戦場。ローレンは七面鳥に塩水処理をし、リックは裏庭でフライヤーを設置しようとして全員に止められる。キャロルは料理を実況解説し、パムはワイン片手に本音を連発する。',
        series: 'thanksgiving',
        seriesTitle: 'Thanksgiving Dinner',
        tone: 'energetic',
        tags: ['thanksgiving', 'family', 'comedy', 'kitchen'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Grandma Lorraine: Pam, hand me that bucket -- careful, careful, the turkey's been sitting in the brine since yesterday morning and it is heavy." },
                { speaker: 'female', text: "Aunt Pam: Mom, you brine this thing for, what, eighteen hours? I've never understood it. It's salt water. The turkey is dead. It doesn't care." },
                { speaker: 'female', text: "Grandma Lorraine: It cares, Pam. Trust me. Thirty-two years of moist turkey. You don't argue with results." },
                { speaker: 'male', text: "Rick: Speaking of results -- I'm setting the fryer up in the backyard. Carol, can you grab the propane? It's by the garage." },
                { speaker: 'female', text: "Carol: Rick, nobody agreed to the fryer. We talked about this in the car for forty minutes." },
                { speaker: 'male', text: "Rick: We didn't agree NOT to do it. There's a difference. Look, I've got the bird, I've got three gallons of peanut oil, and I've got -- I've got a real, genuine vision here." },
                { speaker: 'female', text: "Brianna: Dad, I looked it up, and turkey fryers cause something like a thousand fires every Thanksgiving. I'm just saying. For the video, that would actually be incredible. But also you might die." },
                { speaker: 'male', text: "Spencer: Can I help with anything that doesn't have meat in it? I feel kind of useless just standing here." },
                { speaker: 'female', text: "Carol: Spencer, honey, you could -- okay, you could do the cranberry sauce, that's just cranberries and sugar and orange. That one's all you. That's a vegan win." },
                { speaker: 'male', text: "Spencer: See, that's great, thank you, that's -- that's all I wanted, just one thing I can actually eat." },
                { speaker: 'female', text: "Aunt Pam: You know what nobody asked me? Nobody asked me how I'm doing. Six weeks divorced, I'm chopping celery in my childhood kitchen, and not one person has said, Pam, how are you holding up." },
                { speaker: 'female', text: "Grandma Lorraine: Pam, how are you holding up." },
                { speaker: 'female', text: "Aunt Pam: I'm great. I'm fantastic. Why is HE basting things. Lou. Lou, put down my mother's turkey baster." },
                { speaker: 'male', text: "Uncle Lou: I'm just trying to help, Pam. I always did the basting. Twenty-six years, every Thanksgiving, I did the basting. Old habits, you know? It's -- it's a little hard being here, honestly." },
                { speaker: 'female', text: "Aunt Pam: Oh, it's hard for YOU. That's -- okay. Mom, the wine." },
                { speaker: 'male', text: "Rick: Okay, I am taking the bird outside, this is happening, somebody bring me a lighter --" },
                { speaker: 'female', text: "Grandma Lorraine: Richard. You put my turkey down right now. Nobody is frying anything in my backyard. Brianna, stop filming and go get your grandfather, he's been asleep since two." },
                { speaker: 'male', text: "Grandpa Stan: ...I'm not asleep, I'm resting my eyes. There's a difference." },
            ],
            japanese: [
                { speaker: 'female', text: "Grandma Lorraine: パム、そのバケツ取って -- 気をつけて、気をつけて、七面鳥は昨日の朝から塩水に漬けてるから重いのよ。" },
                { speaker: 'female', text: "Aunt Pam: 母さん、これ何時間漬けるの、18時間？昔から意味がわからない。ただの塩水よ。七面鳥はもう死んでる。気にしないわよ。" },
                { speaker: 'female', text: "Grandma Lorraine: 気にするのよ、パム。信じて。32年間しっとりした七面鳥。結果には逆らえないの。" },
                { speaker: 'male', text: "Rick: 結果といえば -- フライヤーを裏庭に設置するよ。キャロル、プロパン取ってきてくれる？ガレージのそば。" },
                { speaker: 'female', text: "Carol: リック、誰もフライヤーに同意してないわよ。車の中で40分話し合ったでしょ。" },
                { speaker: 'male', text: "Rick: やらないことに同意したわけでもない。そこが違う。いいか、鳥はある、ピーナッツオイル3ガロンもある、それに -- 本物の、ちゃんとしたビジョンがあるんだ。" },
                { speaker: 'female', text: "Brianna: お父さん、調べたんだけど、七面鳥フライヤーって毎年サンクスギビングに千件くらい火事を起こしてるよ。一応言っとくね。動画的には最高だけど。でもお父さん死ぬかも。" },
                { speaker: 'male', text: "Spencer: 肉が入ってないやつで何か手伝える？ただ突っ立ってると役立たずな気がして。" },
                { speaker: 'female', text: "Carol: スペンサー、あなたは -- そうだ、クランベリーソースをやって、あれはクランベリーと砂糖とオレンジだけだから。あれは完全にあなた担当。ヴィーガンの勝利よ。" },
                { speaker: 'male', text: "Spencer: ほら、それいいね、ありがとう、それが -- それだけが欲しかったんだ、自分が実際に食べられるものをひとつ。" },
                { speaker: 'female', text: "Aunt Pam: 誰も私に聞かなかったわよね？誰も私の調子を聞かなかった。離婚して6週間、子供の頃のキッチンでセロリを刻んでて、誰ひとり、パム、大丈夫？って言わなかった。" },
                { speaker: 'female', text: "Grandma Lorraine: パム、大丈夫？" },
                { speaker: 'female', text: "Aunt Pam: 最高。絶好調。なんで彼が肉に汁かけてるの。ルー。ルー、母さんのターキーベイスター置いて。" },
                { speaker: 'male', text: "Uncle Lou: 手伝おうとしてるだけだよ、パム。いつも汁かけは僕がやってた。26年間、毎年サンクスギビング、汁かけは僕の担当だった。昔からの癖でね。正直、ここにいるのはちょっとつらいんだ。" },
                { speaker: 'female', text: "Aunt Pam: あら、あなたがつらいの。それは -- はいはい。母さん、ワイン。" },
                { speaker: 'male', text: "Rick: よし、鳥を外に持っていく、これは決定だ、誰かライター持ってきて --" },
                { speaker: 'female', text: "Grandma Lorraine: リチャード。今すぐ私の七面鳥を置きなさい。私の裏庭では誰も何も揚げない。ブリアナ、撮影をやめておじいちゃんを呼んできて、2時からずっと寝てるから。" },
                { speaker: 'male', text: "Grandpa Stan: ...寝てない、目を休めてるんだ。それは違う。" },
            ],
            generatedAt,
            tone: 'energetic',
        },
    },

    // ============================================================
    // DAY 3 (May 27) -- THE DINNER TABLE
    // ============================================================
    {
        id: 'thanksgiving-day3',
        date: '2026-05-27',
        title: 'Day 3: The Dinner Table',
        titleJa: 'Day 3: 食卓',
        content: 'ついに全員が食卓に着く。感謝の言葉を順に述べる流れでルーが余計なことを言い、パムが爆発寸前に。スペンサーは食べられる物を必死に探し、ブリアナは撮影を続ける。グランパが完璧な一言を放つ。',
        series: 'thanksgiving',
        seriesTitle: 'Thanksgiving Dinner',
        tone: 'reflective',
        tags: ['thanksgiving', 'family', 'comedy', 'dinner'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Grandma Lorraine: All right, everyone, sit, sit -- and before we eat, we are going around the table and each saying one thing we're thankful for. Like we always do." },
                { speaker: 'female', text: "Aunt Pam: Do we have to? Mom. We're all tired. The turkey's getting cold. The roasted turkey, I should say, because we did not fry it." },
                { speaker: 'male', text: "Rick: We came so close. The fryer is still in the backyard. The window has not closed on the fryer." },
                { speaker: 'female', text: "Grandma Lorraine: The window is closed, Rick. I'll start. I'm thankful that for one more year, every chair at this table is full. That's it. That's all I need." },
                { speaker: 'male', text: "Uncle Lou: That's beautiful, Lorraine. I'll go. I'm thankful that even though Pam and I didn't work out, I still get to be part of this family, because honestly you people are the only family I've --" },
                { speaker: 'female', text: "Aunt Pam: Nope. No. We are NOT doing the divorce at the table. Lou, I swear, if you bring up the marriage one more time --" },
                { speaker: 'female', text: "Brianna: For the record, I'm filming, and this is the best Thanksgiving we've ever had. By a lot. Nobody do anything different." },
                { speaker: 'male', text: "Spencer: Um, I'll go, I'll go -- I'm thankful for, uh, the cranberry sauce, which I made, and which is the only thing on this entire table I can eat, so -- I'm leaning on it pretty hard." },
                { speaker: 'female', text: "Carol: Spencer, that's not true, the salad is vegan -- wait, no, I put parmesan on the salad. Okay. The cranberry sauce and the bread. The bread is fine. Is the bread fine?" },
                { speaker: 'male', text: "Spencer: The rolls have egg, Mom. You said that yesterday." },
                { speaker: 'female', text: "Carol: Right. The cranberry sauce. Spencer, I'm so sorry, I'm thankful for you and I have completely failed you, both at once." },
                { speaker: 'female', text: "Aunt Pam: You want to know what I'm thankful for? I'm thankful that I finally know what it feels like to not walk on eggshells in my own house. Six weeks. Six weeks and I sleep like a baby." },
                { speaker: 'male', text: "Uncle Lou: ...I never meant to make you feel like that, Pam." },
                { speaker: 'female', text: "Aunt Pam: I know you didn't, Lou. That's the worst part. You never meant to. Nobody ever means to." },
                { speaker: 'female', text: "Grandma Lorraine: Okay. Okay. Let's just -- let's eat. Stan? You haven't said yours. What are you thankful for, dear?" },
                { speaker: 'male', text: "Grandpa Stan: I'm thankful that I am seventy-six years old, and I have learned that the best thing to do at this table is keep my mouth full and my opinions empty. Pass the potatoes." },
                { speaker: 'female', text: "Brianna: Grandpa just won Thanksgiving. That's the video. I'm done. That's the whole video." },
                { speaker: 'female', text: "Grandma Lorraine: Eat, everyone. Please. Before I start crying into the gravy." },
            ],
            japanese: [
                { speaker: 'female', text: "Grandma Lorraine: さあみんな、座って、座って -- 食べる前に、テーブルを一周して、感謝してることをひとつずつ言うのよ。いつもどおりにね。" },
                { speaker: 'female', text: "Aunt Pam: やらなきゃダメ？母さん。みんな疲れてるのよ。七面鳥が冷めちゃう。ローストした七面鳥ね、揚げなかったんだから。" },
                { speaker: 'male', text: "Rick: あと一歩だったのに。フライヤーはまだ裏庭にある。フライヤーのチャンスはまだ閉じてない。" },
                { speaker: 'female', text: "Grandma Lorraine: チャンスは閉じたのよ、リック。私から始めるわ。もう一年、このテーブルの椅子が全部埋まってることに感謝してる。それだけ。それだけで十分。" },
                { speaker: 'male', text: "Uncle Lou: 美しいよ、ローレン。僕も言うよ。パムと僕はうまくいかなかったけど、それでもこの家族の一員でいられることに感謝してる。正直、きみたちが僕の唯一の家族 --" },
                { speaker: 'female', text: "Aunt Pam: ダメ。やめて。食卓で離婚の話はしないの。ルー、本当に、もう一度結婚のことを持ち出したら --" },
                { speaker: 'female', text: "Brianna: 念のため言っとくけど、私は撮影中で、これは今までで最高のサンクスギビング。ぶっちぎりで。誰も何も変えないで。" },
                { speaker: 'male', text: "Spencer: あの、僕が言うよ、言うよ -- 僕が感謝してるのは、えっと、クランベリーソース、僕が作ったやつで、このテーブルで僕が食べられる唯一のものだから -- かなり頼りにしてる。" },
                { speaker: 'female', text: "Carol: スペンサー、それは違うわ、サラダはヴィーガンよ -- 待って、違う、サラダにパルメザンかけた。そうね。クランベリーソースとパンね。パンは大丈夫。パンは大丈夫よね？" },
                { speaker: 'male', text: "Spencer: ロールパンには卵が入ってるよ、お母さん。昨日自分で言ってたじゃない。" },
                { speaker: 'female', text: "Carol: そうね。クランベリーソースね。スペンサー、本当にごめんなさい、あなたに感謝してるのに、完全にあなたを見捨ててしまった、同時に両方やってる。" },
                { speaker: 'female', text: "Aunt Pam: 私が何に感謝してるか知りたい？自分の家で気を遣わなくていいのがどんな感じか、やっとわかったことに感謝してる。6週間。6週間、ぐっすり眠れてる。" },
                { speaker: 'male', text: "Uncle Lou: ...そんなふうに感じさせるつもりはなかったんだ、パム。" },
                { speaker: 'female', text: "Aunt Pam: わかってるわよ、ルー。それが一番つらいの。あなたはそのつもりがなかった。誰もそのつもりはないのよ。" },
                { speaker: 'female', text: "Grandma Lorraine: はい。はい。とにかく -- 食べましょう。スタン？あなたまだ言ってない。何に感謝してるの、あなた？" },
                { speaker: 'male', text: "Grandpa Stan: 私は76歳になって、この食卓で一番いいのは、口を食べ物でいっぱいにして、意見は空っぽにしておくことだと学んだ。それに感謝してる。ポテト取ってくれ。" },
                { speaker: 'female', text: "Brianna: おじいちゃんが今サンクスギビングで優勝した。これが動画。もう終わり。これが動画の全部。" },
                { speaker: 'female', text: "Grandma Lorraine: 食べて、みんな。お願い。私がグレイビーに泣き出す前に。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },

    // ============================================================
    // DAY 4 (May 28) -- THE FOOTBALL & THE FALLOUT
    // ============================================================
    {
        id: 'thanksgiving-day4',
        date: '2026-05-28',
        title: 'Day 4: The Football & The Fallout',
        titleJa: 'Day 4: フットボールとその後',
        content: '食後、リビングでフットボール観戦。リックがついにフライヤーを点火し小さな火柱を上げる。パムとルーがキッチンで本音をぶつけ合い、思いがけず素直な会話に。ブリアナが全部撮っていたことが判明する。',
        series: 'thanksgiving',
        seriesTitle: 'Thanksgiving Dinner',
        tone: 'playful',
        tags: ['thanksgiving', 'family', 'comedy', 'football'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Rick: Game's on, everybody's full, Mom's doing dishes -- this is my window. The fryer window is open again." },
                { speaker: 'female', text: "Brianna: Dad, the bird is already cooked. We ate the bird. There is no bird to fry. What are you going to fry?" },
                { speaker: 'male', text: "Rick: I bought a second turkey, Brianna. A small one. For science. For the experience. Get the camera, this is going to be good either way." },
                { speaker: 'female', text: "Brianna: Okay, that is genuinely the most unhinged thing you've ever said, and I am one hundred percent filming it." },
                { speaker: 'male', text: "Uncle Lou: Rick, buddy, listen -- I've done this. You have to dry the turkey completely, because if there's any water, the oil -- whoa. Whoa, whoa, whoa. Back up, everybody back up." },
                { speaker: 'male', text: "Rick: It's fine, it's fine -- okay, that's a bigger flame than the videos. That is a significantly bigger flame than the videos." },
                { speaker: 'female', text: "Aunt Pam: MOM. The backyard is on fire. Your son set the backyard on fire. I'm not even surprised, I just want it on the record that I'm not surprised." },
                { speaker: 'female', text: "Grandma Lorraine: RICHARD. I told you. I told you in this very house. Get the hose, get the hose, oh for heaven's sake --" },
                { speaker: 'male', text: "Grandpa Stan: ...Now THAT woke me up." },
                { speaker: 'female', text: "Aunt Pam: Lou. Hey. In the kitchen. Just -- come here a second. I want to say something and I only want to say it once." },
                { speaker: 'male', text: "Uncle Lou: Okay. Yeah. Whatever you need, Pam." },
                { speaker: 'female', text: "Aunt Pam: I'm not angry at you. Not really. I was angry at how long I let it go on, and that's not -- that's not your thing to carry. I just needed to say that out loud, to your face, one time." },
                { speaker: 'male', text: "Uncle Lou: That means a lot. It does. And for what it's worth -- you basting that turkey today, swatting my hand away? That felt more normal than the last two years of our marriage. I mean that as a compliment. I think." },
                { speaker: 'female', text: "Aunt Pam: ...It kind of did, didn't it. Don't make it weird, Lou." },
                { speaker: 'male', text: "Uncle Lou: Too late, I already made it weird, I always make it weird, that's the whole thing." },
                { speaker: 'female', text: "Brianna: So, fun fact, I've been filming this entire kitchen conversation from the hallway, and honestly? It was really sweet. I'm not going to post it. But I'm keeping it." },
                { speaker: 'female', text: "Aunt Pam: Brianna. Delete that. -- Actually. No. Keep it. Just don't put it in the group chat." },
                { speaker: 'female', text: "Grandma Lorraine: The fire is out, the grass is fine, the second turkey is gone forever, and I am going to lie down. Rick, the fryer goes in the trash tomorrow." },
            ],
            japanese: [
                { speaker: 'male', text: "Rick: 試合が始まった、みんな満腹、母さんは皿洗い中 -- 今がチャンスだ。フライヤーのチャンスがまた開いた。" },
                { speaker: 'female', text: "Brianna: お父さん、鳥はもう調理済みだよ。鳥は食べちゃった。揚げる鳥がない。何を揚げるつもり？" },
                { speaker: 'male', text: "Rick: 二羽目の七面鳥を買ったんだ、ブリアナ。小さいやつ。科学のために。経験のために。カメラ持ってこい、どっちに転んでもいい絵になる。" },
                { speaker: 'female', text: "Brianna: うん、それは正真正銘お父さんが今まで言った中で一番イカれてる発言で、私は百パーセント撮影するから。" },
                { speaker: 'male', text: "Uncle Lou: リック、なあ、聞けよ -- これやったことあるんだ。七面鳥を完全に乾かさないとダメだぞ、水分があると油が -- うわっ。うわうわうわ。下がれ、みんな下がれ。" },
                { speaker: 'male', text: "Rick: 大丈夫、大丈夫 -- いや、動画より炎がでかい。動画よりかなりでかい炎だ。" },
                { speaker: 'female', text: "Aunt Pam: 母さん。裏庭が燃えてる。あなたの息子が裏庭に火をつけた。別に驚いてもないけど、驚いてないってことだけは記録に残しておきたい。" },
                { speaker: 'female', text: "Grandma Lorraine: リチャード。言ったでしょ。このまさにこの家で言ったでしょ。ホース持ってきて、ホース、もう、なんてことなの --" },
                { speaker: 'male', text: "Grandpa Stan: ...今ので目が覚めたな。" },
                { speaker: 'female', text: "Aunt Pam: ルー。ねえ。キッチンに。ちょっと -- 来て。言いたいことがあって、一度だけ言いたいの。" },
                { speaker: 'male', text: "Uncle Lou: わかった。ああ。なんでも言ってくれ、パム。" },
                { speaker: 'female', text: "Aunt Pam: あなたに怒ってるわけじゃない。本当は。あんなに長く続けさせた自分に怒ってたの、それは -- それはあなたが背負うことじゃない。ただ一度、面と向かって声に出して言いたかった。" },
                { speaker: 'male', text: "Uncle Lou: それはすごく嬉しいよ。本当に。それと、参考までに -- きみが今日七面鳥に汁をかけて、僕の手を払いのけたとき？あれは結婚生活の最後の2年よりずっと普通に感じた。褒め言葉のつもりだよ。たぶん。" },
                { speaker: 'female', text: "Aunt Pam: ...ちょっとそう感じたかもね。変な空気にしないでよ、ルー。" },
                { speaker: 'male', text: "Uncle Lou: 手遅れだ、もう変な空気にした、いつも変な空気にする、それが僕なんだ。" },
                { speaker: 'female', text: "Brianna: あのさ、ちょっとした事実なんだけど、私このキッチンの会話を全部廊下から撮ってて、正直、すごくいい話だった。投稿はしないよ。でも取っておく。" },
                { speaker: 'female', text: "Aunt Pam: ブリアナ。それ消して。-- やっぱり。いいわ。取っておいて。ただグループチャットには上げないで。" },
                { speaker: 'female', text: "Grandma Lorraine: 火は消えた、芝生は無事、二羽目の七面鳥は永遠に消えた、で、私は横になるわ。リック、フライヤーは明日ゴミ箱行きよ。" },
            ],
            generatedAt,
            tone: 'playful',
        },
    },

    // ============================================================
    // DAY 5 (May 29) -- LEFTOVERS & GOODBYES
    // ============================================================
    {
        id: 'thanksgiving-day5',
        date: '2026-05-29',
        title: 'Day 5: Leftovers & Goodbyes',
        titleJa: 'Day 5: 残り物とお別れ',
        content: '翌朝、ローレンが残り物をタッパーに詰めて全員に持たせる。スペンサーは来年は事前に言うと約束し、リックはフライヤーを諦める。みんなが帰り支度をする中、グランパが心に残る一言を残す。',
        series: 'thanksgiving',
        seriesTitle: 'Thanksgiving Dinner',
        tone: 'reflective',
        tags: ['thanksgiving', 'family', 'bittersweet', 'leftovers'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Grandma Lorraine: Okay, I packed everybody a container -- Rick, this one's turkey and stuffing, Pam, yours has extra pie, and Spencer, honey, yours is just cranberry sauce and bread. I'm sorry. I tried." },
                { speaker: 'male', text: "Spencer: Grandma, that's -- honestly that's more than I expected, and next year, I promise, I'll call you a week ahead and we'll figure it out together. I should have given everybody a heads-up. That part's on me." },
                { speaker: 'female', text: "Grandma Lorraine: We'll figure it out, sweetheart. I've got a whole year to learn what a vegan eats. I'll watch the videos, the way Rick watched his fryer videos." },
                { speaker: 'male', text: "Rick: Low blow, Mom. I'm a changed man. The fryer is in the trash. I watched it go in the truck this morning. A part of me went with it." },
                { speaker: 'female', text: "Brianna: I edited the video down to four minutes. I left out the fire, I left out the kitchen thing with Aunt Pam, and I left out Grandpa snoring. It's just everybody laughing. That's the cut." },
                { speaker: 'female', text: "Aunt Pam: Wait, you left the good stuff out? The fire was the best part. Brianna, the fire was cinema." },
                { speaker: 'female', text: "Brianna: The fire was for me. The four-minute version is for the group chat. There's a difference, Aunt Pam." },
                { speaker: 'male', text: "Uncle Lou: Well -- I should head out. Lorraine, thank you. Really. I know it's complicated, me being here, and you let me come anyway, and that's -- that's the kindest thing anybody's done for me all year." },
                { speaker: 'female', text: "Grandma Lorraine: You're family, Lou. Divorce papers don't change thirty years. You come next year too. I mean that." },
                { speaker: 'female', text: "Aunt Pam: ...He can come. I'm saying it so Mom doesn't have to ask. Lou, you can come. Just text me first so it's not a whole surprise thing again." },
                { speaker: 'male', text: "Uncle Lou: I will text you first. I will absolutely text you first. Thank you, Pam." },
                { speaker: 'female', text: "Carol: Lorraine, before we go -- I want you to know, next year I'm bringing a normal green bean casserole. One dish. Everything in it. The way it's supposed to be." },
                { speaker: 'female', text: "Grandma Lorraine: Now THAT is what I'm thankful for. Carol, come here." },
                { speaker: 'female', text: "Brianna: I got that on camera too. The casserole surrender. That's going in the group chat for sure." },
                { speaker: 'female', text: "Aunt Pam: Mom, thank you. For the food, for the wine, for asking how I'm holding up even though I made you do it. It helped. It actually helped." },
                { speaker: 'female', text: "Grandma Lorraine: That's what the table is for, Pam. Every chair full, once a year. That's the whole thing. Now everybody drive safe and text me when you get home." },
                { speaker: 'male', text: "Grandpa Stan: ...You know, I slept through most of it. But I woke up enough times to see this whole family in one room, and let me tell you -- that's the only thing worth waking up for." },
                { speaker: 'female', text: "Brianna: ...Okay. THAT'S the video. Grandpa, you did it again. I'm not editing another second." },
            ],
            japanese: [
                { speaker: 'female', text: "Grandma Lorraine: はい、みんなにタッパーを詰めたわ -- リック、これは七面鳥とスタッフィング、パム、あなたのはパイ多め、で、スペンサー、あなたのはクランベリーソースとパンだけ。ごめんなさい。頑張ったのよ。" },
                { speaker: 'male', text: "Spencer: おばあちゃん、それは -- 正直、思ってたより多いよ、それに来年は約束する、一週間前に電話して、一緒に考えよう。みんなに前もって言っておくべきだった。そこは僕の責任だ。" },
                { speaker: 'female', text: "Grandma Lorraine: 一緒に考えましょう、坊や。ヴィーガンが何を食べるか学ぶのに一年あるもの。動画を見るわ、リックがフライヤーの動画を見たみたいにね。" },
                { speaker: 'male', text: "Rick: ひどい一撃だね、母さん。僕は変わった男だ。フライヤーはゴミ箱の中。今朝トラックに積まれるのを見届けたよ。僕の一部も一緒に行った。" },
                { speaker: 'female', text: "Brianna: 動画を4分に編集したよ。火事は外した、パムおばさんとのキッチンの件も外した、おじいちゃんのいびきも外した。みんなが笑ってるだけ。それが完成版。" },
                { speaker: 'female', text: "Aunt Pam: 待って、いいところを外したの？火事が一番よかったのに。ブリアナ、あの火事は映画だったわよ。" },
                { speaker: 'female', text: "Brianna: 火事は私用。4分版はグループチャット用。違うのよ、パムおばさん。" },
                { speaker: 'male', text: "Uncle Lou: さて -- そろそろ行くよ。ローレン、ありがとう。本当に。僕がここにいるのは複雑だってわかってる、それでも来させてくれた、それは -- 今年誰かが僕にしてくれた一番優しいことだ。" },
                { speaker: 'female', text: "Grandma Lorraine: あなたは家族よ、ルー。離婚届で30年は変わらない。来年も来なさい。本気で言ってるのよ。" },
                { speaker: 'female', text: "Aunt Pam: ...来てもいいわよ。母さんが頼まなくて済むように私が言うの。ルー、来てもいい。ただまた丸ごとサプライズにならないように、先に連絡して。" },
                { speaker: 'male', text: "Uncle Lou: 先に連絡するよ。絶対に先に連絡する。ありがとう、パム。" },
                { speaker: 'female', text: "Carol: ローレン、帰る前に -- 知っておいてほしいの、来年は普通のインゲンのキャセロールを持ってくる。ひとつの皿。全部その中に。本来あるべき形でね。" },
                { speaker: 'female', text: "Grandma Lorraine: それこそ私が感謝してることよ。キャロル、こっちに来て。" },
                { speaker: 'female', text: "Brianna: それもカメラに撮ったよ。キャセロールの降伏。あれは絶対グループチャット行き。" },
                { speaker: 'female', text: "Aunt Pam: 母さん、ありがとう。料理も、ワインも、私が言わせたとはいえ大丈夫かって聞いてくれて。助かった。本当に助かったの。" },
                { speaker: 'female', text: "Grandma Lorraine: 食卓ってそのためにあるのよ、パム。年に一度、椅子が全部埋まる。それが全部。さあみんな安全に運転して、着いたら連絡してね。" },
                { speaker: 'male', text: "Grandpa Stan: ...あのな、私はほとんど寝てた。でも何度か目を覚まして、この家族全員がひとつの部屋にいるのを見た、言っておくが -- それだけが目を覚ます価値のあることだ。" },
                { speaker: 'female', text: "Brianna: ...よし。これが動画。おじいちゃん、またやったね。もう一秒も編集しない。" },
            ],
            generatedAt,
            tone: 'reflective',
        },
    },
];
