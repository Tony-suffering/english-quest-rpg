/**
 * 「世界の内側 / The World Inside」 — ポッドキャスト番組データ
 *
 * 思想: DMM英会話の先生は全員、その国に住む一次情報源。
 * レッスンで出たトピックを Claude が全部裏取り・深掘りして、
 * ニュースより面白い「現地の人の体感 + 統計」の物語に組む。
 * 1レッスン = 1エピソード。元レッスンは /english/training/dmm にひもづく。
 *
 * 注意:
 * - スクリプトは語り口の物語。先生の発言は > blockquote。
 * - factChecks = 「現地の人の体感 vs 統計」のズレを明示するのが番組の核。
 * - sources は必ず付ける(裏取りした出典)。
 * - 新規は published:false で下書き。
 */

export interface WorldEpisodeSource {
    label: string;
    url: string;
}

export interface WorldEpisodeFactCheck {
    claim: string;      // 先生が言ったこと(体感)
    verdict: string;    // 裏取り結果の見出し
    detail: string;     // 統計・事実
}

export interface WorldEpisode {
    slug: string;
    number: number;
    country: string;
    flag?: string;          // 国名の英語ラベル等(絵文字は使わない)
    title: string;
    hook: string;           // 一行キャッチ
    date: string;           // 収録(元レッスン)日 YYYY-MM-DD
    teacher?: string;
    durationLabel?: string;
    sourceLessonId?: string;    // /english/training/dmm/<id>
    script: string;             // ## 見出し / 段落 / > 引用
    factChecks?: WorldEpisodeFactCheck[];
    sources: WorldEpisodeSource[];
    audioUrl?: string;          // 将来 stand.fm / R2 の音声
    published: boolean;
    // 英語版(任意)。ある回だけ詳細ページで日本語/英語トグルを出す。
    titleEn?: string;
    hookEn?: string;
    teacherEn?: string;
    scriptEn?: string;
    factChecksEn?: WorldEpisodeFactCheck[];
}

export const worldEpisodes: WorldEpisode[] = [
    {
        slug: 'south-africa-state-capture',
        number: 1,
        country: '南アフリカ',
        flag: 'SOUTH AFRICA',
        title: '水が3ヶ月出ない国の先生に、英語を習っている',
        hook: '蚊の雑学のはずが、25分後には一つの国がどう内側から食われたかを知っていた。',
        date: '2026-06-14',
        teacher: '青空市場(220店)を仕切る南アフリカ人講師。週7勤務、妻は元ソーシャルワーカー。',
        durationLabel: '本編 約12分',
        sourceLessonId: 'SafSun0614Hp',
        factChecks: [
            {
                claim: '先生「うちの失業率、37%くらいかな」',
                verdict: '体感は正しい。統計の「公式」より上だが、若者だけ見ると先生より深刻',
                detail: '公式失業率は2026年Q1で32.7%。ただし15〜24歳に絞ると60.9%、25〜34歳で40.6%。30%超えが5年以上続く世界最悪水準。先生の「37%」は、職探しを諦めた人も含む拡張失業率(40%超)寄りの、街の体感値。',
            },
            {
                claim: '先生「もう3年、国民統一政府(GNU)でやってる」',
                verdict: 'ほぼ正しい、年数だけ盛り気味',
                detail: '実際は約2年。2024年5月の総選挙でANCが史上初の過半数割れ(得票40%、400議席中159)。ラマポーザ大統領がDA・IFPなど9党超と連立=GNUを組んだのが2024年6月。',
            },
            {
                claim: '先生「ある一家に国ごと乗っ取られた」',
                verdict: '事実。「ステート・キャプチャー(国家の私物化)」として記録に残る',
                detail: 'ズマ元大統領(在任2009〜2018)時代、インド系のグプタ一族が閣僚人事や国営企業の契約に影響を及ぼし、巨額を国外に流出させた。ズマは2018年に辞任に追い込まれ、後に自党MK党を結成。',
            },
        ],
        sources: [
            { label: '南アの2024年総選挙とGNU形成 (AIIA)', url: 'https://www.internationalaffairs.org.au/australianoutlook/south-african-democracy-at-30-election-leads-to-formation-of-a-government-of-national-unity/' },
            { label: '失業率32.7%に上昇・2026 Q1 (CNBC Africa)', url: 'https://www.cnbcafrica.com/2026/south-africas-official-unemployment-rate-rises-to-32-7-in-first-quarter' },
            { label: '若年層の労働市場 Q1 2026 (Statistics South Africa)', url: 'https://www.statssa.gov.za/?p=19526' },
            { label: '元レッスン(DMM英会話・南アフリカ回)', url: '/english/training/dmm/SafSun0614Hp' },
        ],
        script: `## 気分の落ちた日曜の、なんとなくの予約

日曜の夜だった。理由もなく気分が落ちていて、なんとなく予約しただけの英会話。相手は南アフリカの先生。

その日のテーマは、蚊の記事を読むこと。地味だ。なのに25分後、俺はカバの走力と、一つの国がどうやって内側から食われたかを知っていた。

> アフリカで一番人を殺してる動物、知ってます? ライオンじゃない。蚊だ。病気を運ぶから。一番小さいやつが、一番殺してる。

この先生、220店の青空市場を仕切っていて、週7で働いている。奥さんは元ソーシャルワーカーで、ストリートチルドレンを見てきた人。つまりこの国の「底」を、上からの統計じゃなく、横で見てきた人間だ。

## 「水が3ヶ月出ない地域がある」

話は、日本の「当たり前」がいかに当たり前じゃないか、に流れた。

> 南アフリカには、3ヶ月も水が出ない地域がある。道路に穴があいても、直すのに半年から1年。

日本なら、蛇口をひねれば水が出る。道路に穴があけば、コーン100個と警備員3人が即日で湧く。先生はそれを、皮肉でも卑下でもなく、ただの事実として言った。当たり前って、当たり前じゃないんだな。

## 体感の「37%」と、統計の「32.7%」

その流れで、先生がぽろっと言った。

> うちの失業率、37%くらいかな。

俺はあとで調べた。公式の失業率は、2026年第1四半期で32.7%。あれ、先生ちょっと盛った? ——違った。

若者(15〜24歳)だけを見ると、失業率は60.9%。二人に一人どころか、三人に二人が仕事を持っていない。そして職探しそのものを諦めた人まで含める「拡張失業率」は、40%を超える。

先生の言う「37%」は、統計の公式数字じゃなくて、街を歩く人間の体感だった。ニュースは32.7%と書く。でも、そこに住む人の肌感覚は37%。このズレこそ、現地の人から聞く意味だ。

## マンデラの5年と、その後の転落

俺は昔『インビクタス』を観たくらいの知識で、こう聞いた。アパルトヘイトと闘って、30年近く投獄されて、大統領になった人——ネルソン・マンデラ。あの映画が南アフリカの全部だと思ってた。

先生は、やんわり釘を刺した。

> インビクタスは理想化されすぎ、ドラマ化されすぎ。あれを正確な姿だと思わない方がいい。

マンデラの大統領在任は、1994年から1999年の、たった5年。その後は下り坂だった、と先生は言う。

そして決定的な一言。「ある一家に、国ごと乗っ取られた」。これは比喩じゃなかった。ズマ元大統領の時代、グプタという一族が閣僚人事や国営企業の契約にまで食い込み、巨額を国外へ流した。南アフリカではこれを「ステート・キャプチャー=国家の私物化」と呼ぶ。ズマは2018年に辞任へ追い込まれ、その後、自分の党をつくった。

## そして2024年、ANCが初めて負けた

先生は「もう3年、国民統一政府でやってる」と言った。年数は少し盛っていた。正確には約2年。

2024年5月、与党ANCが史上初めて過半数を割った。30年間、絶対的だった政党が、得票40%まで落ちた。ラマポーザ大統領は、対立してきた政党まで巻き込んで連立——国民統一政府(GNU)を組むしかなかった。先生いわく、「一応は機能してる。でも、もう縫い目がほつれかけてる」。

## 外国人を追い出すと、店が消える

そして、今この国で起きている話。先生によれば、外国人に国を出るよう期限が切られている。アフリカの国々が自国民を呼び戻し始めている、と。

ここで、先生が一番面白いことを言った。

> 移民を追い出した瞬間、後悔するんだ。なぜなら、小さな店を上手く回してたのは、たいてい彼らだったから。

外国人が成功している。だから地元民が妬む。だから追い出す。追い出すと、買う店がなくなる。これは南アフリカだけの話じゃない。アメリカも、イギリスも、そして日本も、形を変えて同じことをやっている。

## 結論: 英語を習いに行って、国の解剖図を持って帰ってきた

蚊の記事を読むはずだった。気づいたら、一つの国の30年が、住んでいる人の声で、目の前に開かれていた。

ニュースは数字をくれる。でも「その数字を、住んでる人がどう感じているか」はくれない。32.7%と、37%。この3.7ポイントの差に、人間が住んでいる。

たぶん、合ってる。`,
        published: false,
    },
    {
        slug: 'south-africa-borders-and-the-deadline',
        number: 2,
        country: '南アフリカ',
        flag: 'SOUTH AFRICA',
        title: '国境は、山でも川でもなく「想像上の線」だった',
        hook: '天気の雑談のはずが、25分後には、81歳の先生から国境の引き方と、移民追放の締め切りの話を聞いていた。',
        date: '2026-07-01',
        teacher: '西ケープ在住の81歳の南アフリカ人講師。週7で働き、自分で屋根の補修までする。妻は英国生まれで在留資格を持つ。',
        durationLabel: '本編 約13分',
        factChecks: [
            {
                claim: '先生「昨日のデモで、2021年みたいに300人が死んだ」',
                verdict: '混線。2026年の死者は「4人前後」。「300人超」は2021年7月のズマ暴動の数字',
                detail: '2026年6〜7月の反移民騒乱の死者は6月末で4人前後(西ケープ・モーセルベイで警察確認3人、小屋約55軒が放火)。一方2021年7月の暴動は約350人以上が死亡(ハウテン79・KZN258)、損失R500億。先生の中で2021年と2026年が混ざっている。',
            },
            {
                claim: '先生「11月4日に大きな州選挙(provincial elections)がある」',
                verdict: '日付は正しいが種別が違う。正しくは地方自治体選挙(local)',
                detail: 'ラマポーザ大統領が2026年4月30日に11月4日(水)を投票日と正式発表。ただし選ぶのは州議会でなく市町村議会(8メトロ+205自治体+44広域)。州選挙は総選挙と同日(直近2024・次2029)で、これとは別サイクル。',
            },
            {
                claim: '先生「9州のうち8州がANC、1州(西ケープ)だけDA」',
                verdict: '2024年5月に崩壊。西ケープDAは維持もKZNはズマのMK党が奪取',
                detail: '2024年総選挙でANCは得票40.18%に転落し、1994年以来初の過半数割れ。西ケープはDAが約53%で維持したが、KZNではMK党が45.9%で第一党、ハウテンもANCが単独過半数を失った。「8対1」は2009〜2024年の古い感覚。',
            },
            {
                claim: '先生「移民を追い出した瞬間、後悔する。店を上手く回してたのは彼らだったから」',
                verdict: '概ね事実。OECDは移民が南アGDPの約9%を生むと推計',
                detail: '非正規移民は労働法の保護が薄く低賃金で雇えるため、農業・警備・家事で好まれる。本質は移民でなく、脆弱な立場を安く使う雇用主と失業率40%超の構造的絶望。移民はスケープゴート、と論者は口を揃える。',
            },
        ],
        sources: [
            { label: '南ア徹底ドシエ(裏取りまとめ)', url: '/english/south-africa' },
            { label: 'France 24: 6/30デッドライン前に外国人が大量出国 (2026-06-29)', url: 'https://www.france24.com/en/africa/20260629-thousands-foreign-nationals-leave-south-africa-ahead-june-30-deadline' },
            { label: '南ア政府: 大統領が2026年11月4日を地方選挙日に設定', url: 'https://www.sanews.gov.za/south-africa/president-sets-4-november-2026-date-local-government-elections' },
            { label: 'Al Jazeera: 2021年暴動の死者300人超 (2021-07-22)', url: 'https://www.aljazeera.com/news/2021/7/22/south-africa-unrest-death-toll-jumps-to-more-than-300' },
            { label: 'Wikipedia: Berlin Conference(アフリカ分割、1884-85)', url: 'https://en.wikipedia.org/wiki/Berlin_Conference' },
        ],
        script: `## 屋根の上の81歳

その日の先生は、疲れていた。前の日、屋根の上で一日中、補修をしていたという。81歳が、だ。

> この歳で屋根の上の作業はよくないんだけどね。バランス感覚が心配で。昔は命綱一本で平気だったんだけど、今はさすがに、ね。

専門家に頼めばいい、と俺は言った。先生の返事が、この国の全部を先に言っていた。

> 専門家は金がかかる。自分でできると思うことは、自分でやる。

この一言を、25分後にもう一度思い出すことになる。

## 「重い話は今日はしんどい」

俺はその日、英検の準備をする気力がなかった。2分で一つのトピックに理由を三つ、あれは脳が焼き切れる。だから先生の国の話を聞かせてくれ、と振った。すると先生は、昨日の話を始めた。

> 昨日はデモで、みんな気が気じゃなかった。不法移民に抗議する行進が、国じゅうの街であってね。

外国人に、国を出ていく期限が切られている。アフリカの国々が自国民を呼び戻し始めている、と先生は言った。

## 「移民を追い出すと、店が消える」

ここで先生が、一番おもしろいことを言った。

> 移民を追い出した瞬間に、後悔するんだ。なぜなら、小さな店を上手く回してたのは、たいてい彼らだったから。

外国人が成功する。だから地元民が妬む。だから追い出す。追い出すと、買う店がなくなる。あとで調べたら、これは体感じゃなく事実だった。OECDは、移民が南アのGDPの約9%を生んでいると推計している。低賃金で、文句を言わず、勤勉に働く。問題は移民じゃなくて、彼らを安く使う側と、失業率40%超という国の底なんだ。

先生は「300人が死んだ」と言った。これは少しズレていた。その数字は昨日のことじゃなく、2021年の大暴動の記憶だ。あのとき本当に350人以上が死んだ。今回の死者は4人前後。25分の会話の中で、二つの年が一つに溶けていた。当事者の記憶は、統計みたいにきれいには並ばない。

## 「合法な人間が、違法なことをやっていた」

先生は、奇妙な光景を教えてくれた。合法な黒人の南アフリカ人が、家々を戸別に回って、移民を探していた、と。

> 家に入って書類を見せろと迫るのは、違法なんだ。警察しかできない。だから、彼らはたくさん逮捕された。

合法な市民が、違法な取り締まりをする。これを聞いて俺は、口には出さなかったけど、アパルトヘイト時代に黒人が持たされた通行証を思い出した。papers。書類。この国では、紙が人の生き死にを決める。

## 国境は、想像上の線

話は、なぜこんなに民族がぶつかるのか、に流れた。俺は素朴に聞いた。国境って、人が引いた線でしょう。だったら、何を基準に引いたんですか。川とか、山とか。先生の答えは、静かだけど重かった。

> たいていは、ある点から別の点へ引いた、想像上の線だよ。

山でも川でもない。定規で引いた直線。1884年のベルリン会議で、ヨーロッパの列強がアフリカの地図を分けたとき、そこにアフリカ人は一人もいなかった。民族も、王国も、言語も無視して、線が引かれた。だから一つの民族が二つに割れ、敵同士が一つの箱に押し込まれた。

> ルワンダの虐殺も、元は一つだった民族が、国境で分けられたから起きたようなものだ。

先生はそう言った。方向は合っている。ただ正確には、フツとツチは同じ言葉を話し、同じ土地に住んでいた。分けたのは国境というより、植民地が後から貼りつけた「民族」という固い壁だった。全員に、民族を書いた身分証を持たせて。ここでも、papers だ。

## 先住民は、誰だったのか

先生は、この地に最初に住んでいたのはサン、ブッシュメンだと言った。白人が1600年代に来たとき、そこにいた人々。半分は正しい。正確には、狩猟採集民のサンと、牛を飼う牧畜民のコイコイ。合わせてコイサン。クリック音を使う、世界でも珍しい言葉を話す人たち。

今の南アの黒人の多く——ズールーも、コーサも——は、実は後から南下してきたバントゥー系の子孫だ。ズールーはシャカという王のもとで軍事的に突出した。先生の言う通りだ。ただ「シャカが百万人殺した」という古い話は、今の歴史家は割り引いて聞く。

## 結論: 屋根の上の一言が、全部だった

専門家は金がかかる。自分でできることは、自分でやる。

先生が屋根の上で言ったこの一言は、そのまま国の話だった。水道は3ヶ月出ない。道路の穴は1年直らない。ヨハネスブルグでは水道管が1日に144本も破裂している。役所は当てにならない。だから81歳が、自分で屋根に登る。

英語を習いに行って、俺はまた、一つの国の骨格を持って帰ってきた。ニュースは「南アでデモ」としか言わない。でも、屋根の上の81歳の声で聞くと、それは締め切りと、書類と、想像上の線の話だった。

たぶん、合ってる。`,
        titleEn: 'The border, it turned out, was an imaginary line — not a river or a mountain',
        hookEn: 'It was supposed to be small talk about the weather. Twenty-five minutes later, an 81-year-old was teaching me how borders get drawn and how a country sets a deadline to expel its migrants.',
        teacherEn: 'An 81-year-old South African teacher in the Western Cape. Works seven days a week and repairs his own roof. His wife was born in England and holds residency.',
        scriptEn: `## On the roof at 81

That day, my teacher was tired. The day before, he had spent the whole day on the roof, doing repairs. At 81. On the roof.

> I shouldn't be up on the roof at my age. I worry about my balance. I used to be fine on a single mountain rope, but now, well.

Get a specialist, I said. His answer already contained the whole country.

> A specialist costs money. Whatever I think I can do myself, I do myself.

Twenty-five minutes later, I would remember that line again.

## "No heavy topics today"

I had no energy for exam prep that day. Two minutes, one topic, three reasons — it fries the brain. So I asked him to tell me about his country instead. He started with yesterday.

> Yesterday everyone was on edge because of the protests. There were marches against illegal immigrants in cities all over the country.

Foreigners are being given a deadline to leave, he said. African countries are starting to call their own people home.

## "Kick out the migrants and the shops vanish"

Then he said the most interesting thing.

> The moment you throw the migrants out, you regret it. Because the ones running the little shops well were usually them.

Foreigners succeed. Locals resent it. So they push them out. And then there's nowhere to shop. Later I checked — this wasn't just a feeling, it was fact. The OECD estimates migrants generate about 9% of South Africa's GDP. They work cheap, quiet, hard. The problem isn't the migrants; it's the people who hire them cheap, and an unemployment rate over 40%.

He said "300 people died." That was slightly off. That number wasn't yesterday — it's the memory of the 2021 unrest, when 350+ really did die. This time the toll is around four. Inside 25 minutes, two years melted into one. An insider's memory doesn't line up as neatly as a statistic.

## "Legal people were doing an illegal thing"

He described a strange scene. Legal Black South Africans were going house to house, looking for migrants.

> Forcing your way in and demanding to see papers is illegal. Only the police can do it. So a lot of them got arrested.

Legal citizens carrying out illegal searches. Hearing it, I thought — though I didn't say it — of the passes Black people were forced to carry under apartheid. Papers. In this country, a piece of paper decides whether you live or die.

## The border is an imaginary line

The talk drifted to why peoples clash so much. I asked, plainly: a border is a line people drew, right? So what did they draw it by — rivers, mountains? His answer was quiet but heavy.

> Mostly they were imaginary lines, drawn from one point to another.

Not a river, not a mountain. A straight line ruled with a straightedge. When Europe carved up the map of Africa at the Berlin Conference in 1884, not a single African was in the room. Peoples, kingdoms, languages — all ignored, and a line was drawn. So one people was split in two, and enemies were shoved into one box.

> The Rwandan genocide happened partly because one people was split by a border, too.

He said that. The direction is right. But precisely: Hutu and Tutsi spoke the same language and lived on the same land. What divided them wasn't so much a border as a hard wall of "ethnicity" that colonial rule bolted on afterward — giving everyone an ID card stating their group. Papers, again.

## Who were the first people?

He said the first people here were the San, the Bushmen — there when the whites arrived in the 1600s. Half right. Precisely, it was the hunter-gatherer San and the pastoralist Khoikhoi. Together, the Khoisan. People who speak click languages, rare in the world.

Most of today's Black South Africans — Zulu, Xhosa — are actually descendants of the Bantu who came south later. The Zulu rose to military dominance under a king named Shaka. He's right about that. But the old story that "Shaka killed a million people" is one today's historians take with a pinch of salt.

## Conclusion: the line on the roof was the whole thing

A specialist costs money. Whatever I can do myself, I do myself.

That line he said on the roof was, itself, the story of the country. Water doesn't run for three months. A pothole takes a year. In Johannesburg, 144 water mains burst a day. The state can't be relied on. So an 81-year-old climbs onto his own roof.

I went to practice English, and once again I came home carrying the skeleton of a country. The news just says "protests in South Africa." But heard in the voice of an 81-year-old on a roof, it was a story about a deadline, about papers, and about an imaginary line.

Probably, I've got it right.`,
        factChecksEn: [
            {
                claim: 'Teacher: "Yesterday\'s protests killed 300, like in 2021."',
                verdict: 'Crossed wires. 2026 deaths are around four; "300+" is the July 2021 Zuma unrest.',
                detail: 'The 2026 anti-migrant unrest had about four deaths by late June (three confirmed by police in Mossel Bay, ~55 shacks burned). The July 2021 unrest killed 350+ (Gauteng 79, KZN 258) with R50bn in losses. His memory fuses 2021 and 2026.',
            },
            {
                claim: 'Teacher: "There are big provincial elections on 4 November."',
                verdict: 'Right date, wrong type — these are local (municipal) elections.',
                detail: 'Ramaphosa announced 4 November (Wed) on 30 April 2026. But they elect municipal councils (8 metros + 205 local + 44 district), not provincial legislatures. Provincial elections run with the national vote (2024, next 2029).',
            },
            {
                claim: 'Teacher: "Eight of nine provinces are ANC, only the Western Cape is DA."',
                verdict: 'Collapsed in May 2024. Western Cape stayed DA, but KZN went to Zuma\'s MK.',
                detail: 'In 2024 the ANC fell to 40.18% and lost its majority. Western Cape held DA (~53%); KZN went to MK (45.9%); Gauteng lost its ANC majority. "8 vs 1" is the 2009–2024 picture.',
            },
            {
                claim: 'Teacher: "Kick out the migrants and the shops vanish — they run them better."',
                verdict: 'Broadly true. The OECD estimates migrants generate about 9% of GDP.',
                detail: 'Weak labour protection makes them cheap in farming, security and domestic work. The real problem is exploitative employers and 40%+ structural unemployment, not migrants — who serve as the scapegoat.',
            },
        ],
        published: false,
    },
];

export function getWorldEpisode(slug: string): WorldEpisode | undefined {
    return worldEpisodes.find(e => e.slug === slug);
}
