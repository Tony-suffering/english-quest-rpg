/**
 * English Stories -- DMMレッスンを「TTSで読むと面白いコメディ」に再構成。
 * 多声(narrator / tonio=US / teacher=UK)で読み上げる前提。
 * とにおのレベル(自然な口語+学べるイディオム)で、笑えて勉強になる。
 */

export type Speaker = 'narrator' | 'tonio' | 'teacher';

export interface StorySegment {
    speaker: Speaker;
    en: string;
    ja: string;
}

export interface StoryExpression {
    en: string;
    ja: string;
    note: string;
}

export interface Story {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    source: string;
    segments: StorySegment[];
    expressions: StoryExpression[];
}

export const SPEAKER_META: Record<Speaker, { label: string; color: string; bg: string }> = {
    narrator: { label: 'NARRATOR', color: '#9A7B16', bg: '#FEF9E7' },
    tonio:    { label: 'TONIO',    color: '#0D9488', bg: '#F0FDFA' },
    teacher:  { label: 'TEACHER',  color: '#2563EB', bg: '#EFF6FF' },
};

export const STORIES: Story[] = [
    {
        id: 'the-man-with-no-agenda',
        title: 'The Man With No Agenda',
        subtitle: '議題なき男、1時間で資本主義を論破する (2026-06-26 のDMMより)',
        date: '2026-06-26',
        source: '台風の命名・$5.7兆の環境破壊・資本主義とエゴを語った回',
        segments: [
            { speaker: 'narrator', en: "This is a story about a man who joined an English lesson with no agenda. By the end, he had renamed every hurricane, overthrown capitalism, and solved death.", ja: "これは、議題なしで英会話レッスンに参加した男の話だ。終わる頃には、彼は全てのハリケーンを改名し、資本主義を転覆させ、死を解決していた。" },
            { speaker: 'tonio', en: "I'm not here with an agenda. I just enjoy talking to you. No pressure, no script.", ja: "議題があって来たわけじゃない。ただ君と話すのが好きなんだ。プレッシャーも台本もなし。" },
            { speaker: 'narrator', en: "He then spoke for sixty minutes without taking a breath, or a side.", ja: "そして彼は、息もつかず、立場も決めず、60分喋り続けた。" },
            { speaker: 'teacher', en: "So, it's raining in Japan? We've been hearing about a cyclone coming in.", ja: "それで、日本は雨かい? サイクロンが来てるって聞いてるよ。" },
            { speaker: 'tonio', en: "Typhoon, cyclone, hurricane. Honestly? Same storm. Different passport. It's just labels.", ja: "台風、サイクロン、ハリケーン。正直? 同じ嵐だ。パスポートが違うだけ。ただのラベルさ。" },
            { speaker: 'teacher', en: "A meteorologist would fight you to the death on that one.", ja: "気象学者なら、それについて死ぬ気で君と戦うだろうね。" },
            { speaker: 'tonio', en: "Here's what gets me. You give your storms human names. Katrina. We just give ours a number.", ja: "俺が引っかかるのはここだ。君らは嵐に人間の名前をつける。カトリーナとか。俺たちはただ番号をつける。" },
            { speaker: 'narrator', en: "A storm named Karen sounds like she wrecked the city on purpose. Typhoon 16 sounds like it filed the paperwork first.", ja: "「カレン」という名の嵐は、わざと街を壊したように聞こえる。「台風16号」は、先に書類を提出したように聞こえる。" },
            { speaker: 'teacher', en: "Right. So what would you like to look at today, Taishi?", ja: "なるほど。それで今日は何を見ようか、タイシ?" },
            { speaker: 'tonio', en: "Nothing. No test. I want it on the fly. A script kills the momentum, and the vibe just dies.", ja: "何も。テストはなし。即興でいきたい。台本はノリを殺すし、空気が死ぬんだ。" },
            { speaker: 'narrator', en: "He requested zero structure. He was then handed a five-point-seven trillion dollar problem.", ja: "彼は構造ゼロを要求した。そして、5.7兆ドルの問題を手渡された。" },
            { speaker: 'teacher', en: "This article puts a dollar value on the damage each person does to the planet.", ja: "この記事は、各人が地球に与える損害をドル換算するんだ。" },
            { speaker: 'tonio', en: "The top one percent. Private jet owners. Doing irreversible damage. Disgusting.", ja: "トップ1%。プライベートジェットの所有者。取り返しのつかない損害を与えてる。最低だ。" },
            { speaker: 'narrator', en: "Then he read the next line, and the villain got a little closer.", ja: "そして次の行を読み、悪役の距離が少し縮まった。" },
            { speaker: 'tonio', en: "...the top ten percent of global consumers. Oh. That's most of Japan. That's me. With the air conditioning on.", ja: "…グローバル消費者のトップ10%。あ。それは日本のほとんど。俺だ。エアコンつけたまま。" },
            { speaker: 'teacher', en: "And there's the catch. Some suggest a pollution tax to change behavior.", ja: "そこが落とし穴だ。行動を変えるために汚染税を、という案もある。" },
            { speaker: 'tonio', en: "But a tax just makes the planet a menu. The rich pay more and order the expensive dish. It prices the damage. It doesn't stop it.", ja: "でも税は、地球をただのメニューにする。金持ちは多く払って高い皿を頼む。損害に値段をつけるだけ。止めはしない。" },
            { speaker: 'narrator', en: "For one whole sentence, he was an economist. Then he remembered he hates economics.", ja: "まる一文の間、彼はエコノミストだった。そして、自分が経済学を嫌いだったことを思い出した。" },
            { speaker: 'tonio', en: "I don't support capitalism at all.", ja: "俺は資本主義をまったく支持しない。" },
            { speaker: 'narrator', en: "Said the man currently building an app to sell.", ja: "と、今まさに売るためのアプリを作っている男は言った。" },
            { speaker: 'teacher', en: "If capitalism is wrong, what's the alternative? Communism?", ja: "資本主義が間違いなら、代案は? 共産主義?" },
            { speaker: 'tonio', en: "No, communism is terrible too. Have you read Ayn Rand? I haven't. But I'll look it up.", ja: "いや、共産主義もひどい。アイン・ランドは読んだ? 俺は読んでない。でも、調べとくよ。" },
            { speaker: 'narrator', en: "He will not look it up. This is the seventh thing he has promised to look up tonight.", ja: "彼は調べない。これは今夜「調べとく」と約束した7つ目のことだ。" },
            { speaker: 'tonio', en: "At the end of the day, it all boils down to ego. We're not family-first or country-first. We should be universe-first.", ja: "結局のところ、全てはエゴに行き着く。家族第一でも国家第一でもない。宇宙第一であるべきなんだ。" },
            { speaker: 'teacher', en: "Universe-first. Bold platform. Bit hard to canvass for.", ja: "宇宙第一。大胆な公約だね。ちょっと票は集めにくそうだ。" },
            { speaker: 'tonio', en: "You can't take it with you. So grabbing everything while you're alive? Spiritually, that's backwards.", ja: "あの世には持っていけない。だから生きてるうちに全部つかむ? 精神的に、それは逆だ。" },
            { speaker: 'narrator', en: "He had solved greed, death, and the climate. He had not solved the air conditioning, which was still on.", ja: "彼は強欲と死と気候を解決した。エアコンは解決しなかった。まだついていた。" },
            { speaker: 'teacher', en: "Anyway. Don't damage the environment, if you can help it. Think about it next time you travel. Bye bye.", ja: "ともかく。できれば環境を壊さないように。次の旅行で考えてみて。じゃあね。" },
            { speaker: 'narrator', en: "And so the man with no agenda logged off, having fixed the entire universe, except his own footprint. A philosopher. Allegedly. Universe-first.", ja: "そうして議題なき男はログオフした。全宇宙を直して、自分の足跡だけは直さずに。哲学者だ。たぶん。宇宙第一の。" },
        ],
        expressions: [
            { en: "it's just labels", ja: 'ただのラベルだ、呼び方の違いにすぎない', note: "違いを一蹴する時。\"It's just semantics.\"(ただの言葉の問題)と同系。台風=ハリケーン論争を3語で終わらせる。" },
            { en: 'fight you to the death on that', ja: 'それについては死ぬ気で反論する', note: '大げさに強く反対する冗談。"I\'ll fight you on that." の強調版。真剣な議論を茶化す時に。' },
            { en: 'on the fly', ja: 'その場で、即興で', note: '準備なしでやる。"do it on the fly"。台本(script)の対義。会議でも使える。' },
            { en: 'kill the momentum', ja: '勢い・ノリを殺す', note: '流れを止める。"That killed the momentum." 会話にもプロジェクトにも。the vibe dies(空気が死ぬ)とセットで。' },
            { en: 'the villain got closer', ja: '悪役の距離が縮まった(=実は自分が加害者)', note: '責める相手が実は自分、というオチの型。"The problem is closer than I\'d like to admit." で応用。' },
            { en: "it prices the damage, it doesn't stop it", ja: '損害に値段をつけるだけで、止めはしない', note: '"A, not B" の対句で皮肉を効かせる型。汚染税批判の核。短く言い切るほど刺さる。' },
            { en: 'boil down to ~', ja: '結局〜に行き着く、煮詰めると〜だ', note: '"It all boils down to ego." 複雑な話を一語に煮詰める。"It\'s all about" より知的で説得力がある。' },
            { en: "I'll look it up", ja: '調べとくよ', note: '知ったかぶりからの上品な撤退。便利だが、たいてい調べない(あるある)。会話を止めずに次へ進める。' },
            { en: "you can't take it with you", ja: 'あの世には持っていけない', note: '死んだら財産は持っていけない、の決まり文句。"with you" で終わる。"as you go" 等を足すと崩れる。' },
            { en: 'at the end of the day', ja: '結局のところ', note: '締め・要点に入る前の定型の前置き。多用は注意だが、ネイティブの会話の呼吸として自然。' },
            { en: 'a bold platform', ja: '大胆な公約・主張', note: 'platform=政治家の公約・主義。"hard to canvass for"(票集めしにくい)と合わせ、壮大な主張を政治ジョークで切り返すと知的。' },
            { en: 'with the air conditioning still on', ja: 'エアコンをつけたまま', note: '立派なことを言いながら矛盾した行動を、一言添えて落とす型。"...all while the AC was on." で自虐オチに。' },
            { en: 'log off', ja: 'ログオフする、(オンラインを)切る', note: 'オンラインレッスン・会議を終える。"log off / log on"。物語やレッスンの幕引きに。' },
        ],
    },
    {
        id: 'the-man-who-reinvented-homework',
        title: 'The Man Who Reinvented Homework',
        subtitle: '宿題を再発明した男 (2026-06-25 のDMMより)',
        date: '2026-06-25',
        source: '手書き英作文アプリ・JRE textbook・AIと謝罪を語った回',
        segments: [
            { speaker: 'narrator', en: "This is a story about a man with a TOEIC score of 900. On paper, he is fluent.", ja: "TOEIC900点の男の話だ。紙の上では、彼は流暢である。" },
            { speaker: 'narrator', en: "Off paper, when a tourist says excuse me, he pretends to take a phone call.", ja: "紙を離れると、観光客に「すみません」と言われた瞬間、電話がかかってきたフリをする。" },
            { speaker: 'tonio', en: "I have a 900. Reading, writing, grammar, all good. Speaking, listening, eye contact... we're still negotiating.", ja: "900点ある。読む・書く・文法はバッチリ。喋る・聞く・アイコンタクト…そこは今も交渉中だ。" },
            { speaker: 'narrator', en: "He recently came back to English. Not for love. Not for growth. For money.", ja: "彼は最近、英語に戻ってきた。愛のためでも、成長のためでもない。金のためだ。" },
            { speaker: 'tonio', en: "I don't need to improve. I can already watch Joe Rogan and laugh before the subtitles do.", ja: "上達はいらない。もうジョー・ローガンを、字幕より先に笑える。" },
            { speaker: 'narrator', en: "His teacher? A British man. In a field. With cows.", ja: "彼の先生は? イギリス人の男。野原で。牛と。" },
            { speaker: 'teacher', en: "Sorry, I'm knackered. Big day with the cows and the vet. I was herding them yesterday, but I draw the line at grabbing the bull by the horns.", ja: "すまん、クタクタでね。牛と獣医で大忙しだ。昨日は追ってたけど、牛の角を掴むのはさすがに線を引くよ。" },
            { speaker: 'narrator', en: "One man is dodging a live bull. The other is dodging a barista. Same fear, different farm.", ja: "一方は本物の雄牛をかわし、もう一方はバリスタをかわす。同じ恐怖、違う牧場。" },
            { speaker: 'tonio', en: "So, I'm building an app. With AI. It's going to be huge.", ja: "それでアプリを作ってるんだ。AIで。絶対デカくなる。" },
            { speaker: 'narrator', en: "Brace yourself for the concept. You write English by hand, on paper, and then you take a photo of it.", ja: "コンセプトに心の準備を。英語を手で、紙に書いて、それを写真に撮る。" },
            { speaker: 'teacher', en: "That's actually quite clever. I've honestly never heard of anything like it.", ja: "それ、実はかなり賢いよ。正直、そんなの聞いたことない。" },
            { speaker: 'narrator', en: "Nobody had the heart to tell him he had just invented homework.", ja: "彼がたった今、宿題を発明しただけだと、誰も言い出す勇気がなかった。" },
            { speaker: 'tonio', en: "My niche is handwriting. Anyone can build an app in a day, so I need an edge. My edge is paper.", ja: "ニッチは手書きだ。今や誰でも一日でアプリを作れる。だから強みがいる。俺の強みは紙だ。" },
            { speaker: 'narrator', en: "His edge, against the entire tech industry, is paper.", ja: "テック業界全体を相手にした彼の強みは、紙、である。" },
            { speaker: 'narrator', en: "He also built a second app. A private one. It has a single, beautiful purpose.", ja: "彼はもう一つアプリを作った。非公開の。たった一つの、美しい目的を持つ。" },
            { speaker: 'tonio', en: "It listens to me speak English and writes a report on how bad it was.", ja: "俺が英語を喋るのを聞いて、それがどれだけひどかったかのレポートを書くんだ。" },
            { speaker: 'narrator', en: "He coded a robot to bully him. And he pays for the server himself.", ja: "彼は自分をいじめるロボットをコードした。しかもサーバー代は自腹だ。" },
            { speaker: 'narrator', en: "His textbook is not Oxford. It's Joe Rogan. His vocabulary teacher is a comedian named Joey Diaz.", ja: "教科書はオックスフォードじゃない。ジョー・ローガンだ。語彙の先生はジョーイ・ディアスというコメディアン。" },
            { speaker: 'tonio', en: "From one Joey Diaz clip, I learned came back positive, a cat and mouse game, and take my lumps.", ja: "ジョーイ・ディアスのクリップ1本で、「陽性だった」「いたちごっこ」「甘んじて受ける」を覚えた。" },
            { speaker: 'teacher', en: "We don't say take my lumps in Britain. We say take it on the chin. You get hit, you carry on.", ja: "イギリスでは take my lumps とは言わない。take it on the chin だ。殴られても、続ける。" },
            { speaker: 'narrator', en: "So he is now fluent in two registers: standardized testing, and beating a drug test.", ja: "というわけで彼は、二つの語法にペラペラだ。標準試験と、薬物検査のすり抜け方に。" },
            { speaker: 'tonio', en: "People say AI will replace us. But AI is still a little off sometimes. Trust me, I'm the expert on being off.", ja: "AIが俺たちに取って代わると言う。でもAIはまだ時々ズレてる。信じてくれ、ズレに関しては俺が専門家だ。" },
            { speaker: 'narrator', en: "Then, for one entire second, he became a philosopher.", ja: "そして、まるまる一秒、彼は哲学者になった。" },
            { speaker: 'tonio', en: "Humans fix the AI. The AI fixes the humans. Nobody is driving. It's bonkers. What an era.", ja: "人間がAIを直す。AIが人間を直す。誰もハンドルを握ってない。イカれてる。なんて時代だ。" },
            { speaker: 'narrator', en: "He saved his deepest insight for the subject of apologies.", ja: "彼は最も深い洞察を、謝罪の話のために取っておいた。" },
            { speaker: 'tonio', en: "We Japanese are professionals at apologizing. We don't just say sorry. We say my heart goes out to the family.", ja: "我々日本人は謝罪のプロだ。ただ「ごめん」とは言わない。「ご家族に心を寄せます」と言う。" },
            { speaker: 'teacher', en: "Funny thing, they say AI apologizes better than people now. Says a lot about people.", ja: "面白いことに、今やAIの方が人より上手く謝るらしい。人間について多くを物語ってるね。" },
            { speaker: 'tonio', en: "Okay. I'm tired. Let's call it a night.", ja: "よし。疲れた。今日はこれで切り上げよう。" },
            { speaker: 'narrator', en: "And so he logged off. TOEIC 900. Cannot order a coffee. Building a paper empire, one photo at a time.", ja: "そうして彼はログオフした。TOEIC900点。コーヒーは注文できない。紙の帝国を、一枚ずつ築いている。" },
            { speaker: 'narrator', en: "A legend. Allegedly. On paper.", ja: "伝説だ。たぶん。紙の上では。" },
        ],
        expressions: [
            { en: 'on paper', ja: '理屈の上では、書類上は', note: '「実際は別だが建前/数字上は」。冒頭とラストで bookend(対句)として使ってる。現実とのギャップを出す定番。' },
            { en: 'pretend to take a phone call', ja: '電話がかかってきたフリをする', note: '気まずさから逃げる仕草の鉄板。pretend to + 動詞原形=〜するフリをする。' },
            { en: "we're still negotiating", ja: '(冗談で)まだ交渉中=うまくいってない', note: '出来てないことを「交渉中」と言ってぼかすユーモア。My body and the gym are still negotiating. のように応用可。' },
            { en: 'knackered', ja: '(英)クタクタ、ヘトヘト', note: '英国口語で「超疲れた」。exhausted の砕けた版。米なら beat / wiped。' },
            { en: 'draw the line at ~', ja: '〜だけはやらない、一線を引く', note: 'ここまではやるが、それ以上はやらない、の境界。I draw the line at ~ing。牛は追うが角は掴まない、のオチに。' },
            { en: "grab the bull by the horns", ja: '困難に正面から立ち向かう', note: '雄牛の角を掴む=逃げずに本気で取り組む。本物の牛とかけたダジャレで使われてる。' },
            { en: 'an edge', ja: '強み、優位性', note: 'have an edge=他より一歩有利。competitive edge(競争優位)で頻出。' },
            { en: "nobody had the heart to tell him", ja: '誰も彼に言い出す勇気がなかった', note: '本当のこと(残酷な事実)を可哀想で言えない、の定型。have the heart to ~=〜する心の余裕/非情さがある。' },
            { en: 'came back positive', ja: '(検査が)陽性だった', note: '結果が come/return back +結果。came back negative=陰性。検査の定番。' },
            { en: 'take it on the chin', ja: '甘んじて受ける、潔く耐える', note: '英: take it on the chin / 米: take my lumps。批判や痛手を逃げずに受け止め前へ。' },
            { en: 'a little off', ja: '少しズレてる、何か変', note: 'off=正常からのズレ。This tastes a little off / He seems off today。自虐オチにも使える。' },
            { en: 'bonkers', ja: 'イカれてる、ありえない', note: 'crazy のおどけた版(英寄り)。状況や数字が無茶苦茶な時。' },
            { en: 'my heart goes out to ~', ja: '〜に心を寄せる、お悔やみ申し上げる', note: '哀悼・同情の定型。直訳の I feel sad より大人で温かい。' },
            { en: 'call it a night', ja: '今日はこれで切り上げる', note: '夜の作業/集まりを終える定番。昼なら call it a day。' },
        ],
    },
];

export function getStory(id: string): Story | null {
    return STORIES.find(s => s.id === id) || null;
}
