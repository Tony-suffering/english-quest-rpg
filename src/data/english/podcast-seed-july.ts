/**
 * Podcast Harvest -- July 2026 (Day 1-10, batch 1)
 * Real short JRE Clips, all NEW guests (no repeats from May/June).
 * Phrases hand-picked from each clip's actual auto-sub transcript.
 * Verified via oembed: author_name = "JRE Clips".
 */

import type { PodcastSource, PodcastEntry } from './podcast-seed';

const SOURCE_07_01: PodcastSource = {
    date: '2026-07-01',
    show: 'JRE Clips',
    title: 'Taylor Sheridan on Landman and Being Prolific',
    youtubeId: 'r8WF2B-Q2aM',
    url: 'https://www.youtube.com/watch?v=r8WF2B-Q2aM',
    tagline: 'Yellowstone等を量産する脚本家が「なぜ全部当てられるのか」を語る回。少人数チームの効率化と、ハリウッドの無駄な会議文化をぶった斬る大人のビジネス英語。',
};

const SOURCE_07_02: PodcastSource = {
    date: '2026-07-02',
    show: 'JRE Clips',
    title: 'Jeff Ross on Touring with Charlie Sheen',
    youtubeId: 'mvNxGZvl0ZA',
    url: 'https://www.youtube.com/watch?v=mvNxGZvl0ZA',
    tagline: 'ロースト名人ジェフ・ロスがチャーリー・シーンの崩壊ツアーに同行した裏話。コメディ現場の即興と「スベる/客をあしらう」業界スラングの宝庫。',
};

const SOURCE_07_03: PodcastSource = {
    date: '2026-07-03',
    show: 'JRE Clips',
    title: 'Michael Jai White on the Original Cut of Spawn',
    youtubeId: 'o-E76Uku138',
    url: 'https://www.youtube.com/watch?v=o-E76Uku138',
    tagline: '俳優マイケル・ジェイ・ホワイトが映画スポーンの幻の編集版を語る回。作品批評の語彙(台無し・複雑化・白紙委任)が自然に学べる。',
};

const SOURCE_07_04: PodcastSource = {
    date: '2026-07-04',
    show: 'JRE Clips',
    title: 'Eddie Bravo on Celebrity Death Conspiracies',
    youtubeId: '0zJanbPPFDk',
    url: 'https://www.youtube.com/watch?v=0zJanbPPFDk',
    tagline: '陰謀論で有名なエディ・ブラボーが芸能人の死を語る回。「ズバリ的中」「胡散臭い」「全部デタラメ」など、半信半疑で噂を転がす口語が連発。',
};

const SOURCE_07_05: PodcastSource = {
    date: '2026-07-05',
    show: 'JRE Clips',
    title: 'Donnell Rawlings on Katt Williams and Comedians Exposing Each Other',
    youtubeId: 'sr286nWowQU',
    url: 'https://www.youtube.com/watch?v=sr286nWowQU',
    tagline: 'コメディアンのドネル・ローリングスが「最近のポッドキャストは暴露ばかり」と斬る回。talk shit / has beef / where is the lie など本音トークの語彙。',
};

const SOURCE_07_06: PodcastSource = {
    date: '2026-07-06',
    show: 'JRE Clips',
    title: 'Greg Fitzsimmons Was Pranked by a Cop in Alaska',
    youtubeId: 'PInKQBQoA3M',
    url: 'https://www.youtube.com/watch?v=PInKQBQoA3M',
    tagline: 'コメディアンが旅先アラスカでドラッグ所持の車に同乗してしまう実話。警察とのやり取り(逮捕状・路肩に停める・信じない)の生きた英語。',
};

const SOURCE_07_07: PodcastSource = {
    date: '2026-07-07',
    show: 'JRE Clips',
    title: 'Matt Damon on Saving Private Ryan and Steven Spielberg Being a Masterful Filmmaker',
    youtubeId: 'fWLgS1F30XY',
    url: 'https://www.youtube.com/watch?v=fWLgS1F30XY',
    tagline: 'マット・デイモンがプライベート・ライアンとスピルバーグの天才性を語る回。映画好きの感嘆(名作・没頭・職人技)と制作の裏話。',
};

const SOURCE_07_08: PodcastSource = {
    date: '2026-07-08',
    show: 'JRE Clips',
    title: 'Ben Affleck on How a Real Bank Robbery Shaped a Scene in The Town',
    youtubeId: 'ITWgkNl6t0E',
    url: 'https://www.youtube.com/watch?v=ITWgkNl6t0E',
    tagline: 'ベン・アフレックがザ・タウンの銀行強盗シーンの取材秘話を語る回。犯罪現場のリアルな口語(乗り換え車・見て見ぬふり)が学べる。',
};

const SOURCE_07_09: PodcastSource = {
    date: '2026-07-09',
    show: 'JRE Clips',
    title: 'Martial Arts Pioneer Benny "The Jet" Urquidez on Fighting in No Rules Competitions',
    youtubeId: '8xBsTynPpg0',
    url: 'https://www.youtube.com/watch?v=8xBsTynPpg0',
    tagline: '伝説の格闘家ベニー・ザ・ジェットが無差別級・ノールール時代を語る回。格闘の現場英語と「手痛い洗礼」「ダビデとゴリアテ」等の比喩。',
};

const SOURCE_07_10: PodcastSource = {
    date: '2026-07-10',
    show: 'JRE Clips',
    title: 'Cheryl Hines on the Most Disturbing Part of the Backlash Against RFK Jr.',
    youtubeId: 'AJHIGTXAUJI',
    url: 'https://www.youtube.com/watch?v=AJHIGTXAUJI',
    tagline: '女優シェリル・ハインズが夫RFK Jr.バッシングの渦中を語る回。「誰が本物か分かる」「警戒を怠るな」など、裏切りと信頼の大人の語彙。',
};

const ENTRIES_07_01: PodcastEntry[] = [
    { daySlot: 1, month: '2026-07', expression: "how the hell do you do it", contextBefore: "You're running a gigantic ranch and you have about 48 TV shows.", target: "How the hell do you do it? I don't understand it.", contextAfter: "Every time a new show pops up, I say to my wife, how is he doing this?", note: "感嘆まじりの「どうやってんの?」。the hell を挟むと驚き・呆れが乗る。日本人は How do you do it? と平板に言いがちだが、口語はこの hell 入りが普通。職場ではhellを抜く。", rank: 'S' },
    { daySlot: 1, month: '2026-07', expression: "pops up", contextBefore: "I don't understand it.", target: "Every time a new Taylor Sheridan show pops up, I say to my wife, how is he doing this?", contextAfter: "Where does he have the time?", note: "pop up=ひょっこり現れる。新作・通知・問題などが「ポンと出てくる」時に万能。appear より軽くて口語的。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "freezing our asses off", contextBefore: "There's not a producer. We haven't seen anybody in a week.", target: "We're freezing our asses off at 7 below zero in northern Utah.", contextAfter: "And I'm like, guys, we could just take off to Hawaii.", note: "freeze one's ass off=クソ寒い。very cold の体感マシマシ版。暑い時は sweat one's ass off。下品なので会議では It was freezing. に。", rank: 'S' },
    { daySlot: 1, month: '2026-07', expression: "promoted from within", contextBefore: "I've got PAs that are now first ADs. I've got camera operators that are now directors.", target: "We've promoted from within.", contextAfter: "So everyone understands the way we do it.", note: "promote from within=内部昇格させる。外部から雇わず身内を引き上げる、というビジネス頻出フレーズ。チーム作りの話でそのまま使える。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "meetings upon meetings", contextBefore: "These people will have meetings upon meeting upon meeting.", target: "They'll have a tone meeting where a whole bunch of people sit around and talk about the tone of the script.", contextAfter: "What, you didn't read the thing?", note: "X upon X upon X=Xに次ぐXに次ぐX。うんざりするほど積み重なる感じ。日本人の「会議また会議」をこの型で言える。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "a reason for their existence", contextBefore: "And this is also networks. They love this stuff.", target: "So that they can have a reason for their existence, all these middle management people.", contextAfter: "They want to do a prop show and tell.", note: "「存在意義/居場所の言い訳」を皮肉る言い方。仕事してるフリの中間管理職を斬る時の定番。justify their existence も同義。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "streamlined it", contextBefore: "How about I just make the decision?", target: "So we just streamlined it and made it so efficient.", contextAfter: "Typically a TV show will prep for 12 weeks. We do it in four.", note: "streamline=無駄を削って効率化する。手続き・工程・組織に使う大人のビジネス動詞。日本人は make it efficient と言いがちだが streamline 一語で済む。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "once it gets going", contextBefore: "When they first start out it's chaos and there's a lot of network involvement.", target: "But then once it gets going, they go, oh, you guys know what you're doing.", contextAfter: "Leave me alone.", note: "once it gets going=軌道に乗ったら/動き出したら。プロジェクトや勢いが乗る瞬間を表す。once が「いったん〜したら」。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "you don't miss", contextBefore: "We're there from the beginning now.", target: "You don't miss. You don't miss with the writing, you don't miss with the storylines.", contextAfter: "You don't have any duds.", note: "miss=外す・失敗する。You don't miss は「お前は絶対外さない」という最高の褒め言葉。スポーツでもビジネスでも使える。", rank: 'A' },
    { daySlot: 1, month: '2026-07', expression: "chase my tail", contextBefore: "I went to Billy Bob before I wrote a word. I said, if you don't do this, I'm not going to do it.", target: "Because I'm not going to chase my tail.", contextAfter: "He goes, well, what is it?", note: "chase one's (own) tail=堂々巡りで空回りする。犬が自分の尻尾を追う絵から。忙しいのに前に進まない状態。spin one's wheels も近い。", rank: 'S' },
];

const ENTRIES_07_02: PodcastEntry[] = [
    { daySlot: 2, month: '2026-07', expression: "wing it", contextBefore: "He decided to do this whirlwind tour. The first one he did,", target: "he tried to go and just wing it.", contextAfter: "Torpedo of truth. The winging it one did not work.", note: "wing it=ぶっつけ本番でやる/即興でしのぐ。準備なしで臨む時の定番。日本人は do it without preparation と説明しがちだが、ネイティブは wing it 一発。", rank: 'S' },
    { daySlot: 2, month: '2026-07', expression: "bounce stuff off of", contextBefore: "But when he started doing it with comics, it actually worked.", target: "He would have someone to bounce stuff off of.", contextAfter: "And they knew how to be entertaining.", note: "bounce ideas/stuff off (someone)=人に考えをぶつけて反応をもらう。壁打ち相手にする感じ。会議で Can I bounce something off you? は超実用。", rank: 'S' },
    { daySlot: 2, month: '2026-07', expression: "keep the flow going", contextBefore: "They knew how to be entertaining", target: "and keep the flow going.", contextAfter: "And then you got into those stories and it was amazing.", note: "keep the flow going=流れ・勢いを切らさない。会話・イベント・作業の途切れない感じ。keep it going だけでも使う。", rank: 'A' },
    { daySlot: 2, month: '2026-07', expression: "turned around", contextBefore: "And then you got into those stories and it was amazing.", target: "Yeah, it totally turned around.", contextAfter: "The first one I did was in Atlantic City.", note: "turn around=形勢が好転する/立て直る。業績・試合・状況が悪い所から上向く時の定番。turnaround は名詞で「V字回復」。", rank: 'A' },
    { daySlot: 2, month: '2026-07', expression: "staring me down", contextBefore: "I walk into his dressing room an hour before.", target: "Chuck Zito is literally staring me down, going, don't be too mean to my guy.", contextAfter: "They're just trying to scare me.", note: "stare someone down=睨みつけて威圧する。down が「相手をひるませる」方向性を出す。ただ見るの look じゃなく敵意のある凝視。", rank: 'A' },
    { daySlot: 2, month: '2026-07', expression: "bombing", contextBefore: "I need a hazmat suit too because", target: "he'd been bombing for like a week, every single night.", contextAfter: "I'm going to come out and say, I heard there's a bomb scare.", note: "bomb=(芸・プレゼンが)大スベりする。コメディ/発表の文脈で必須。日本語の「ウケる」の逆。逆に大ウケは killed it / crushed it。", rank: 'S' },
    { daySlot: 2, month: '2026-07', expression: "something's wrong with the scoreboard", contextBefore: "He's always like, winning, winning. So I said,", target: "if you're winning, something's wrong with the scoreboard.", contextAfter: "Old Jeff with hair, winning.", note: "「勝ってるなら得点板が壊れてる」=お前が勝ってるわけない、という捻ったツッコミ。ロースト(毒舌いじり)のセンス。決まり文句ではなく機転の効いた一言。", rank: 'A' },
    { daySlot: 2, month: '2026-07', expression: "off the cuff", contextBefore: "Russell did a few.", target: "Well, Russell's really good off the cuff.", contextAfter: "Russell's great working the crowd.", note: "off the cuff=即興で/準備なしで。袖口(cuff)にメモを書く昔の習慣から。wing it が動詞なら off the cuff は副詞的。an off-the-cuff remark で「思いつきの一言」。", rank: 'S' },
    { daySlot: 2, month: '2026-07', expression: "working the crowd", contextBefore: "Russell's really good off the cuff.", target: "Russell's great working the crowd.", contextAfter: "Russell interviewed him.", note: "work the crowd/room=その場の客や人々を上手くあしらって沸かせる。営業・パーティー・舞台で使う。work が「巧みに扱う」の意味。", rank: 'A' },
    { daySlot: 2, month: '2026-07', expression: "news to me", contextBefore: "I don't remember anyone else but me,", target: "so that's news to me that Russell did.", contextAfter: "Yeah, Russell did a few. At least one I know of.", note: "(That's) news to me=初耳だ/聞いてないよ。皮肉っぽく「そんなの知らなかった」と返す定番。日本人は I didn't know that と言いがちだが、これの方が会話的。", rank: 'S' },
];

const ENTRIES_07_03: PodcastEntry[] = [
    { daySlot: 3, month: '2026-07', expression: "something to say", contextBefore: "I have movies that have their body count,", target: "but also have a little bit of something to say.", contextAfter: "You know what I miss? Spawn.", note: "have something to say=(作品などに)言いたいこと・メッセージがある。中身のある作品を評する時の言い回し。逆は it has nothing to say。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "drove me up a wall", contextBefore: "He started throwing special effects in there that was really killing the story.", target: "Which kind of drove me up a wall.", contextAfter: "You didn't even see why my character wanted to get back.", note: "drive someone up a/the wall=イライラさせる/気が狂いそうにさせる。annoy の強烈版。家族や同僚のクセに使うことも多い。", rank: 'S' },
    { daySlot: 3, month: '2026-07', expression: "carte blanche", contextBefore: "Bob Shaye liked that version.", target: "He just gave the director carte blanche to add whatever he wanted.", contextAfter: "And the director was a special effects guy.", note: "give carte blanche=白紙委任する/好き放題やらせる。フランス語由来でビジネス・芸術の話で知的に響く。a free hand も同義。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "killing the story", contextBefore: "He started throwing special effects in there", target: "that was really killing the story.", contextAfter: "It drove me up a wall.", note: "kill=台無しにする/ぶち壊す。kill the mood(空気を壊す), kill the vibe も同型。逆に kill it は「最高にうまくやる」。文脈で真逆になる。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "got all convoluted", contextBefore: "People that knew Spawn were fine with it. But for me,", target: "the story got all convoluted.", contextAfter: "But people love it.", note: "convoluted=ひねくれて複雑・込み入った。話・手続き・コードが「無駄にややこしい」時の上級語。complicated より否定的で知的。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "a thing for its time", contextBefore: "But people love it.", target: "I think it was a thing for its time.", contextAfter: "But unfortunately I saw a version that made you care about it.", note: "a thing for its time=当時としては良かった/時代の産物だ。今見ると古いが当時は通用した、という距離の置き方。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "escaped the zeitgeist", contextBefore: "There's all these superhero films, but Spawn was unique.", target: "I don't understand how Spawn sort of escaped the zeitgeist.", contextAfter: "You don't ever hear about Spawn anymore.", note: "zeitgeist=時代の空気・潮流(独語由来)。escape the zeitgeist で「時代の話題から外れる/語られなくなる」。教養を感じさせる上級表現。", rank: 'S' },
    { daySlot: 3, month: '2026-07', expression: "go hard", contextBefore: "What do you want, a breakfast cereal like Spawn-Os?", target: "Come on, man. Let's go hard like the cartoon.", contextAfter: "See if you can find a clip from Spawn.", note: "go hard=本気で/容赦なく振り切ってやる。中途半端の逆。go hard or go home(やるなら本気で)はジムでも頻出。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "made its money back", contextBefore: "But that was a big hit. I think so.", target: "I mean, it made its money back.", contextAfter: "It was very popular. Everyone was talking about it.", note: "make its money back=制作費・投資を回収する。映画・事業の採算の話で必須。break even(トントン)とセットで覚えると強い。", rank: 'A' },
    { daySlot: 3, month: '2026-07', expression: "get brought up", contextBefore: "It's weird to me", target: "that even the comic book Spawn doesn't get brought up anymore.", contextAfter: "Every now and then I drive by a comic book store.", note: "bring up=話題に出す。受け身 get brought up で「話題に上る」。日本人は be talked about と言いがちだが get brought up が自然。", rank: 'A' },
];

const ENTRIES_07_04: PodcastEntry[] = [
    { daySlot: 4, month: '2026-07', expression: "spot on", contextBefore: "Eddie, you got to feel good because", target: "you were spot on on the Epstein stuff.", contextAfter: "How long ago? Six, seven years ago?", note: "spot on=ズバリ的中/ドンピシャ。予想・指摘・モノマネが完璧な時。英国寄りだが米国でも通用。exactly right の口語版。", rank: 'S' },
    { daySlot: 4, month: '2026-07', expression: "you called it", contextBefore: "I see that on YouTube.", target: "Like, you called it.", contextAfter: "I see those videos all the time now. Eddie Bravo was right.", note: "call it=(先に)言い当てる/予言する。結果がその通りになった時に You called it!(言った通りだ)。I called it. は「ほら言ったでしょ」。", rank: 'S' },
    { daySlot: 4, month: '2026-07', expression: "out the window", contextBefore: "When that heroin kicks in, your writing gets a little wacky.", target: "The writing goes out the window.", contextAfter: "I think whoever killed Chris Cornell...", note: "go out the window=(計画・常識などが)すっ飛ぶ/ご破算になる。窓から放り投げる絵。My diet went out the window. のように日常で多用。", rank: 'S' },
    { daySlot: 4, month: '2026-07', expression: "kicked in", contextBefore: "Even with that letter, the writing on the bottom isn't the same.", target: "That's when the heroin kicked in, dog.", contextAfter: "Tell him, Joey.", note: "kick in=(薬・効果・制度が)効き始める/作動する。The coffee finally kicked in. のように使う。日本人は started to work と言いがちだが kicked in が自然。", rank: 'A' },
    { daySlot: 4, month: '2026-07', expression: "look into", contextBefore: "You got to", target: "look into the Chris Cornell stuff.", contextAfter: "They murdered that dude.", note: "look into=ちゃんと調べる/掘り下げる。check より深く調査するニュアンス。I'll look into it.(こっちで調べとく)は仕事でも頻出。", rank: 'A' },
    { daySlot: 4, month: '2026-07', expression: "squirrely", contextBefore: "It's not a documentary if you've got actors pretending to do roles.", target: "It gets a little squirrely.", contextAfter: "That letter is kind of weird.", note: "squirrely=胡散臭い/落ち着かない/怪しい。リスのそわそわ感から。話や人が「どこか信用できない」時のくだけた形容詞。", rank: 'S' },
    { daySlot: 4, month: '2026-07', expression: "total BS", contextBefore: "The one I don't know.", target: "This could be total BS, but...", contextAfter: "We know Chester and Chris Cornell were really good friends.", note: "BS=bullshit(でたらめ)の婉曲。total BS で「完全にデタラメ」。自分の話に予防線を張る前置きにも使う。会議では nonsense に置換。", rank: 'A' },
    { daySlot: 4, month: '2026-07', expression: "that's what I'm hearing", contextBefore: "They were all involved in some project. That might be nothing, but", target: "that's what I'm hearing.", contextAfter: "I'm hearing that they were all involved in some project.", note: "that's what I'm hearing=そう聞いてる(断定は避ける)。噂・伝聞を「自分の意見じゃないけど」と距離を置いて伝える大人の言い回し。", rank: 'A' },
    { daySlot: 4, month: '2026-07', expression: "I'm listening", contextBefore: "That as a conspiracy, with his track record,", target: "I'm listening.", contextAfter: "No, but it is weird that Cornell did that.", note: "I'm listening=(興味を持って)聞く耳はあるよ/続けて。半信半疑でも面白そうな話に乗る時の相づち。I'm all ears も同義でより乗り気。", rank: 'A' },
    { daySlot: 4, month: '2026-07', expression: "makes you want to", contextBefore: "He said it's the best experience he's ever had. He's never topped it.", target: "Makes you want to try it.", contextAfter: "Makes you think, maybe.", note: "(It) makes you want to ~=〜したくなる/そそられる。主語 it を省くのが口語的。It makes me want to cry. など感情にも使える便利型。", rank: 'B' },
];

const ENTRIES_07_05: PodcastEntry[] = [
    { daySlot: 5, month: '2026-07', expression: "talk shit about", contextBefore: "The only way I can find myself interesting is", target: "if I talk shit about people.", contextAfter: "They're going away from being funny.", note: "talk shit about=悪口を言う/けなす。SNS時代の必須スラング。日本人は say bad things と言いがちだが、これが自然。下品なので職場では talk badly about に。", rank: 'S' },
    { daySlot: 5, month: '2026-07', expression: "don't give a shit about", contextBefore: "Especially as a stand-up comedian,", target: "they don't give a shit about being funny no more.", contextAfter: "Are those days over?", note: "not give a shit about=どうでもいい/全く気にしない。care の強烈版。婉曲なら don't give a damn、丁寧なら don't really care。no more は二重否定の口語(正式には anymore)。", rank: 'S' },
    { daySlot: 5, month: '2026-07', expression: "those days are over", contextBefore: "They don't care about being funny anymore.", target: "Are those days over?", contextAfter: "No, those people that do that are almost always not very talented.", note: "those days are over=ああいう時代はもう終わった。古き良き(or 悪しき)時代の終焉を語る定番。The good old days are over. の形でよく出る。", rank: 'A' },
    { daySlot: 5, month: '2026-07', expression: "the only exception", contextBefore: "Those people are almost always not very talented.", target: "The only exception to that is Katt.", contextAfter: "What Katt was doing was different.", note: "the only exception (to that)=唯一の例外。一般論を述べた後に「ただし1つだけ別」と付け足す型。with the exception of ~ で「〜を除いて」。", rank: 'A' },
    { daySlot: 5, month: '2026-07', expression: "no disrespect", contextBefore: "I'm coming from this place.", target: "No disrespect to Katt, but...", contextAfter: "Who asked you?", note: "no disrespect (to)=失礼を承知で/けなすつもりはないけど。批判の前に置くクッション。言われた側は none taken(気にしてないよ)で返す。", rank: 'S' },
    { daySlot: 5, month: '2026-07', expression: "who asked you", contextBefore: "No disrespect to Katt, but like...", target: "Who asked you?", contextAfter: "Shannon Sharpe did, when he did that podcast.", note: "Who asked you?=誰が聞いた?(=頼んでない/余計なお世話)。強めのツッコミだが仲間内のいじりでも使う。トーンで冗談か本気かが決まる。", rank: 'A' },
    { daySlot: 5, month: '2026-07', expression: "has beef", contextBefore: "He's got a sheet of paper, he's got questions,", target: "and people he has beef with.", contextAfter: "What do you do with those truths?", note: "have beef (with)=揉めてる/確執がある。have a problem with の口語。squash the beef で「手打ちにする/仲直りする」。", rank: 'S' },
    { daySlot: 5, month: '2026-07', expression: "ride with him", contextBefore: "The connection they have with Katt is like...", target: "They ride with him.", contextAfter: "They say, where is the lie?", note: "ride with (someone)=味方する/とことん付き合う。信頼して付いていく感じ。I ride with you. で「お前を信じてる」。やや若者寄りだが広く通じる。", rank: 'A' },
    { daySlot: 5, month: '2026-07', expression: "where is the lie", contextBefore: "They ride with him. They say,", target: "where is the lie in all this stuff?", contextAfter: "But I'm just trying to understand what the purpose is.", note: "Where is the lie?=どこが嘘?(=全部本当だろ)。痛いほど figured を肯定する反語の決まり文句。ネット発だが会話でも定着。", rank: 'S' },
    { daySlot: 5, month: '2026-07', expression: "what do we do with", contextBefore: "You expose these people to say what?", target: "What do we do with this information?", contextAfter: "Hollywood is never going to change.", note: "What do we do with ~?=これをどうしろと?/この情報の使い道は?。暴露や事実を突きつけられて「で、結局どうなる」と問う型。", rank: 'A' },
];

const ENTRIES_07_06: PodcastEntry[] = [
    { daySlot: 6, month: '2026-07', expression: "save it for the podcast", contextBefore: "I started to tell you a story and you had heard it and you said,", target: "save it for the podcast.", contextAfter: "All right, so I go to Alaska in October.", note: "save it for ~=〜まで取っておく/今は言うな。Save it for later. で「後にして」。Save it. 単独だと「言い訳はいい/黙れ」と少しキツくなる。", rank: 'A' },
    { daySlot: 6, month: '2026-07', expression: "a quick day trip", contextBefore: "I hear adventure. I'm like, that sounds like more than I want.", target: "I was just looking for like a quick day trip.", contextAfter: "And so the guy picks me up.", note: "day trip=日帰り旅行。泊まらず行って帰る外出。go on a day trip。日本人は one-day trip と言いがちだが英語は day trip。", rank: 'B' },
    { daySlot: 6, month: '2026-07', expression: "the indoors is victory to me", contextBefore: "I'm not like you. I don't want to be outside.", target: "I love the indoors. The indoors is victory to me.", contextAfter: "And so the guy picks me up in a big pickup.", note: "決まり文句ではなく本人の機転。「インドアこそ我が勝利」と大げさに言ってインドア派を笑いに変えるセンス。自分のキャラを一言で立てる言い回し。", rank: 'A' },
    { daySlot: 6, month: '2026-07', expression: "warm up to him", contextBefore: "He was a really good guy.", target: "And I started to warm up to him.", contextAfter: "And then this police siren goes off behind us.", note: "warm up to (someone)=だんだん打ち解ける/好きになる。最初は距離があったが慣れてくる過程。warm up to an idea で「案が段々良く思えてくる」。", rank: 'S' },
    { daySlot: 6, month: '2026-07', expression: "pulling over", contextBefore: "This police siren goes off behind us.", target: "So he starts pulling over and he goes, this is bad.", contextAfter: "I go, you didn't do anything.", note: "pull over=車を路肩に停める。警察に止められる時の必須語。Pull over! は「車を停めろ」。自分が停まるのも他人を停めるのも pull over。", rank: 'A' },
    { daySlot: 6, month: '2026-07', expression: "out of instinct", contextBefore: "I cover it with a piece of paper, which I don't even know why I'm doing.", target: "I just did it out of instinct.", contextAfter: "And the cop goes, what are you hiding?", note: "out of instinct=とっさに/本能的に。out of + 感情/動機 で「〜から(の行動)」。out of habit(癖で), out of fear(怖くて)も同型。", rank: 'A' },
    { daySlot: 6, month: '2026-07', expression: "license and registration", contextBefore: "The cop walks up and he goes,", target: "license and registration.", contextAfter: "And the guy says, open my glove compartment.", note: "license and registration=免許証と車検証。アメリカの交通検問の決まり文句。これと glove compartment(ダッシュボードの小物入れ)はドライブ英語の常識。", rank: 'B' },
    { daySlot: 6, month: '2026-07', expression: "outstanding warrants", contextBefore: "The cop comes back and he goes,", target: "do you realize you have two outstanding felony warrants?", contextAfter: "And the guy goes, yeah, just yeah.", note: "outstanding=未処理の/未払いの(優れたの意味とは別)。outstanding warrant=未執行の逮捕状, outstanding balance=未払い残高。ニュース・事務で頻出。", rank: 'A' },
    { daySlot: 6, month: '2026-07', expression: "I'm not buying your story", contextBefore: "I said, I met this guy 20 minutes ago, I'm a comedian.", target: "And he goes, I'm not buying your story.", contextAfter: "Because you say you're a comedian and you haven't said anything funny.", note: "not buy (something)=(話・言い訳を)信じない。I don't buy it. で「信じないね」。日本人は believe で組み立てがちだが buy が自然で口語的。", rank: 'S' },
    { daySlot: 6, month: '2026-07', expression: "feeling any effects", contextBefore: "He goes, how are you feeling?", target: "Are you feeling any effects from the fentanyl?", contextAfter: "I go, yeah, I feel very weird right now.", note: "feel the effects (of)=効果・影響を感じる。薬・疲労・景気など何にでも。feeling any effects? は「効いてきてる?」。", rank: 'B' },
];

const ENTRIES_07_07: PodcastEntry[] = [
    { daySlot: 7, month: '2026-07', expression: "lost in the thing you love", contextBefore: "That's what everybody really wants in life.", target: "To be lost in the thing you love, to have a purpose.", contextAfter: "Watching someone with true purpose is hypnotic.", note: "be lost in ~=〜に没頭して我を忘れる。lost が「夢中」のポジティブ用法。get lost in a book(本に没頭)。日本人は concentrate on と言いがちだが lost in は感情がこもる。", rank: 'A' },
    { daySlot: 7, month: '2026-07', expression: "the central preoccupation of my life", contextBefore: "He's like, luggage is", target: "the central preoccupation of my life.", contextAfter: "Guy's a luggage salesman and he loves it.", note: "preoccupation=頭から離れない関心事・こだわり。the central preoccupation of my life で大げさに「人生の中心」。真面目にもネタにも使える上級語。", rank: 'A' },
    { daySlot: 7, month: '2026-07', expression: "if I had the means", contextBefore: "He goes, well, if you know,", target: "if I had the means, sir.", contextAfter: "And he opens up this trunk and music plays.", note: "the means=(目的を果たす)資力・手段。if I had the means=もし金/手立てがあれば。afford より上品でフォーマル。a means to an end(目的のための手段)も頻出。", rank: 'A' },
    { daySlot: 7, month: '2026-07', expression: "bangers", contextBefore: "Oh god, that is amazing.", target: "You guys have been in some bangers, man.", contextAfter: "Saving Private Ryan, that opening, the storming of the beach.", note: "banger=大ヒット作/名曲・名作。元は音楽スラングだが映画・ゲームにも拡大。複数で連発の名作群。日本語の「神回・名作」に近い。", rank: 'S' },
    { daySlot: 7, month: '2026-07', expression: "I came late", contextBefore: "I remember reading the script.", target: "I came late because he shot it chronologically, and I'm only in the last act.", contextAfter: "He told me on set...", note: "come late (to)=遅れて加わる/後から登場する。撮影・プロジェクト・会話に途中参加する時。come late to the party で「乗り遅れる/今頃気づく」。", rank: 'B' },
    { daySlot: 7, month: '2026-07', expression: "cut all of that out", contextBefore: "There was all this dialogue written. Stephen goes,", target: "I cut all of that out.", contextAfter: "No talking for the first 27 minutes of this movie.", note: "cut out=(編集・予定から)丸ごと削る。映像・文章・無駄な工程に。Let's cut that out. で「それは省こう」。Cut it out! は「やめろ」と別の決まり文句。", rank: 'A' },
    { daySlot: 7, month: '2026-07', expression: "you're into it", contextBefore: "These guys are puking. You can just hear it, and then just boom,", target: "and you're into it.", contextAfter: "Also they did this incredible cinema-changing thing.", note: "be into it=のめり込む/一気に引き込まれる。be into ~ は趣味にも(I'm into jazz=ジャズにハマってる)。ここでは「観客が物語に入り込む」。", rank: 'A' },
    { daySlot: 7, month: '2026-07', expression: "cinema-changing", contextBefore: "They did this incredible,", target: "cinema-changing, open the shutter all the way, skip the bleach process.", contextAfter: "Nobody had ever done it.", note: "X-changing=Xを変えてしまうほどの。game-changing(状況を一変させる)の応用。名詞+changing で「〜を塗り替える」と自由に作れる便利型。", rank: 'A' },
    { daySlot: 7, month: '2026-07', expression: "nobody had ever done it", contextBefore: "You get that feeling that you're adrenalized,", target: "and nobody had ever done it.", contextAfter: "The master of the thing understood how to use the tools.", note: "nobody had ever done it=誰も今までやったことがなかった。前代未聞を強調する型。過去完了 had ever done が「その時点まで一度も」を出す。", rank: 'B' },
    { daySlot: 7, month: '2026-07', expression: "that's just masterful", contextBefore: "The master understood how to use the tools, combined with the great idea.", target: "That's just masterful.", contextAfter: "Like, the best of the best.", note: "masterful=見事な/熟練の極み。職人芸を称える上級の褒め言葉。a masterful performance。just を添えると「もう、見事としか」のニュアンス。", rank: 'A' },
];

const ENTRIES_07_08: PodcastEntry[] = [
    { daySlot: 8, month: '2026-07', expression: "sat down with", contextBefore: "I went down through all the prisons out there,", target: "sat down and talked to guys who robbed trucks and banks, and sat down with the FBI guys.", contextAfter: "And I was like, what are they like?", note: "sit down with=腰を据えてじっくり話す/取材する。ただ会うより「ちゃんと向き合って聞く」感じ。I sat down with him for an hour. のように使う。", rank: 'A' },
    { daySlot: 8, month: '2026-07', expression: "coming out of (a job)", contextBefore: "One time, we were", target: "coming out of this thing, we robbed this truck.", contextAfter: "We had the mask, we got the switch car.", note: "this thing=(あえてぼかして)その仕事/ヤマ。犯罪・案件を具体名を避けて言う口語。come out of ~ は「〜を終えて出てくる」。", rank: 'A' },
    { daySlot: 8, month: '2026-07', expression: "pulled up", contextBefore: "We drove around the corner and whatever, we pulled up,", target: "we get out with guns, the mask, the whole thing.", contextAfter: "And we look over and it's this cop sitting there.", note: "pull up=(車で)乗りつける/停まる。pull over(路肩に寄せる)と違い、目的地に到着して停まる感じ。He pulled up in a Ferrari. のように使う。", rank: 'A' },
    { daySlot: 8, month: '2026-07', expression: "the switch car", contextBefore: "We had the mask,", target: "we got the switch car, we drove around the corner.", contextAfter: "We pulled up and we look over.", note: "switch car=(逃走用の)乗り換え車。犯罪映画でおなじみの語。switch が「切り替え」。getaway car(逃走車)とセットで覚えると犯罪英語に強くなる。", rank: 'B' },
    { daySlot: 8, month: '2026-07', expression: "doing construction duty", contextBefore: "And it's this cop sitting there", target: "doing construction duty.", contextAfter: "Right then, he looked at us, we looked at him.", note: "do ~ duty=〜の任務に就いている。construction duty=工事現場の警備。jury duty(陪審義務), guard duty(警備当番)など on/do + duty の形が頻出。", rank: 'B' },
    { daySlot: 8, month: '2026-07', expression: "looked the other way", contextBefore: "He looked at us, we looked at him,", target: "he looked the other way.", contextAfter: "He didn't want to end up on the wall at the VFW.", note: "look the other way=見て見ぬふりをする/黙認する。物理的に視線を逸らす意味と、不正を見逃す比喩の両方。turn a blind eye も同義。", rank: 'S' },
    { daySlot: 8, month: '2026-07', expression: "end up on the wall at the VFW", contextBefore: "He looked the other way. Why?", target: "He didn't want to end up on the wall at the VFW.", contextAfter: "These guys with full automatic weapons, masks on.", note: "VFW=戦没・退役軍人会館。その壁に写真が飾られる=殉職して英雄として祀られる、の含意。end up=結局〜という結果になる。文化前提が要る粋な一言。", rank: 'A' },
    { daySlot: 8, month: '2026-07', expression: "straight from research", contextBefore: "It's a great moment in the movie.", target: "But that's straight from research.", contextAfter: "I always loved that story.", note: "straight from ~=〜そのまま/直接から。straight from research=取材したまま脚色なし。straight from the source(本人・大元から直接)も頻出。", rank: 'A' },
    { daySlot: 8, month: '2026-07', expression: "I'm putting that in the movie", contextBefore: "All right, I was like,", target: "I'm putting that in the movie.", contextAfter: "And it's a great moment in the town.", note: "put X in ~=Xを(作品・予定などに)入れる。現在進行形 I'm putting で「もう入れると決めた」確定感。実体験を作品に採り入れる時の自然な言い方。", rank: 'B' },
    { daySlot: 8, month: '2026-07', expression: "that's exactly what it would have been", contextBefore: "Why do you think he did it?", target: "And that's exactly what it would have been.", contextAfter: "That guy's picture would have been up on the wall.", note: "that's exactly what it would have been=まさにそうなってたはず。仮定の結果を強く肯定する型。would have been が「(もしそうなら)〜だっただろう」。", rank: 'A' },
];

const ENTRIES_07_09: PodcastEntry[] = [
    { daySlot: 9, month: '2026-07', expression: "found a way to win", contextBefore: "You were fighting Thais when you had no training like that, getting low-kicked,", target: "and still found a way to win.", contextAfter: "It's pretty crazy.", note: "find a way to ~=何とかして〜する/活路を見出す。逆境でも手段を見つける感じ。find a way to win はスポーツ・ビジネスの王道フレーズ。", rank: 'A' },
    { daySlot: 9, month: '2026-07', expression: "a rude awakening", contextBefore: "When I first got kicked in the legs, my eyes bugged out.", target: "It was a rude awakening, but it was the best thing that ever happened to me.", contextAfter: "Because he took me to the streets.", note: "a rude awakening=手痛い目覚め/厳しい現実を思い知ること。甘い見通しが砕かれる瞬間。get a rude awakening の形で多用。", rank: 'S' },
    { daySlot: 9, month: '2026-07', expression: "the best thing that ever happened to me", contextBefore: "It was a rude awakening, but", target: "it was the best thing that ever happened to me.", contextAfter: "Because he took me to the streets.", note: "the best thing that ever happened to me=人生で一番良かった事。一見ピンチが結果的に最高だった、という turnaround の語り口で頻出。逆は the worst thing。", rank: 'B' },
    { daySlot: 9, month: '2026-07', expression: "took me to the streets", contextBefore: "It was the best thing that ever happened to me.", target: "Because he took me to the streets.", contextAfter: "When he started kneeing my face, I said, oh, you want to fight that way?", note: "take (someone) to the streets=実戦/路上の喧嘩レベルに引きずり込む。きれいな型ではなく泥臭い本気の領域へ、の比喩。street-smart(世渡りに長けた)とも繋がる。", rank: 'A' },
    { daySlot: 9, month: '2026-07', expression: "you want to fight that way?", contextBefore: "When he started kneeing my face, I said,", target: "oh, you want to fight that way? Okay.", contextAfter: "I didn't understand it. I just thought, all right.", note: "you want to ~?=そういう手で来るわけね?(=受けて立つ)。挑発に応じる時の決まり文句。Oh, it's like that? も同じノリ。", rank: 'A' },
    { daySlot: 9, month: '2026-07', expression: "no rules, no nothing", contextBefore: "We went to Hawaii and it was", target: "no rules, no weight divisions, no nothing.", contextAfter: "There were four of us left after we fought five, six times.", note: "no nothing=何もかも無し(強調の二重否定)。文法的には正しくないが口語で勢いを出す常套句。no money, no nothing のように連ねる。", rank: 'A' },
    { daySlot: 9, month: '2026-07', expression: "believe it or not", contextBefore: "My brother Arnold was calling me the world champion. And actually,", target: "believe it or not, there were four of us left.", contextAfter: "We fought a couple more times on Sunday.", note: "believe it or not=信じられないかもしれないが。意外な事実の前置き。文頭でも文末でも置ける。日本人の「マジで/嘘みたいだけど」に当たる便利な枕。", rank: 'B' },
    { daySlot: 9, month: '2026-07', expression: "David and Goliath", contextBefore: "This guy is 245 pounds, 6'3. I told Blinky,", target: "they want to see David and Goliath.", contextAfter: "They want to see me fight him.", note: "David and Goliath=小が大に挑む構図(聖書由来)。圧倒的格差の対決の定番比喩。an underdog(格下/番狂わせを狙う側)とセットで覚えると強い。", rank: 'A' },
    { daySlot: 9, month: '2026-07', expression: "knock him out", contextBefore: "I said, Blinky, if you don't", target: "knock him out, you're not going to win.", contextAfter: "Because they kind of want to keep him up.", note: "knock out=ノックアウトする/気絶させる(KO)。格闘の基本語。比喩で knock it out of the park=大成功させる。a knockout は名詞でKO/絶世の美人。", rank: 'B' },
    { daySlot: 9, month: '2026-07', expression: "got him tired", contextBefore: "You could pick them up and throw them around, so", target: "I got him tired.", contextAfter: "I pinned him on the ground.", note: "get someone + 形容詞=相手を〜の状態にする。got him tired=相手を疲れさせた。get them angry / get it done(やり遂げる)など使役 get の超実用パターン。", rank: 'A' },
];

const ENTRIES_07_10: PodcastEntry[] = [
    { daySlot: 10, month: '2026-07', expression: "predicting exactly what we're dealing with", contextBefore: "The proper meshing of the military machinery with our peaceful goals.", target: "He was predicting exactly what we're dealing with right now.", contextAfter: "There's a machine that wants to go to war.", note: "deal with=対処する/直面している。what we're dealing with=今まさに抱えている問題。日本人は face を使いがちだが deal with が口語の主役。", rank: 'A' },
    { daySlot: 10, month: '2026-07', expression: "on the wrong side of that", contextBefore: "There's more money in war than anything.", target: "That's scary to be on the wrong side of that.", contextAfter: "I've seen some stuff I don't want to know.", note: "on the wrong side of ~=〜の不利な側/敵に回る立場。on the wrong side of history(歴史の負け組)が有名。逆は on the right side。", rank: 'S' },
    { daySlot: 10, month: '2026-07', expression: "the most disturbing thing", contextBefore: "For you personally going through all of it,", target: "what was the most disturbing thing?", contextAfter: "I was worried about Bobby's safety.", note: "disturbing=ゾッとする/心がざわつく。scary が単純な怖さなら disturbing は「後を引く不快・動揺」。a disturbing video など重い話題で頻出。", rank: 'A' },
    { daySlot: 10, month: '2026-07', expression: "change their attitude about me", contextBefore: "Everything changed, and it was interesting to watch", target: "people change their attitude about me.", contextAfter: "That I'm not the person they thought I was.", note: "change one's attitude (about/toward)=態度・見方を変える。手のひら返しを描写する時に。attitude は「姿勢・態度」で日本語の「アティチュード」より広い。", rank: 'B' },
    { daySlot: 10, month: '2026-07', expression: "I'm still the same person", contextBefore: "They think I'm not the person they thought I was,", target: "which is strange because I'm still the same person.", contextAfter: "So that was, and still is, very strange.", note: "I'm still the same person=私は何も変わってない。周囲の評価だけ変わった時の定番の反論。アイデンティティを守る素直な一言。", rank: 'B' },
    { daySlot: 10, month: '2026-07', expression: "you find out who's real", contextBefore: "It's good for someone to betray you like that.", target: "Yeah, but you find out who's real.", contextAfter: "See who rises to the top.", note: "find out who's real=誰が本物(の味方)か分かる。逆境で真の友が見える、という人生訓フレーズ。who your real friends are も同型。", rank: 'S' },
    { daySlot: 10, month: '2026-07', expression: "rises to the top", contextBefore: "You find out who's real.", target: "See who rises to the top.", contextAfter: "Yeah, it's true. It's painful, though.", note: "rise to the top=頭角を現す/真価を発揮して上に来る。Cream rises to the top.(本物は自然と上がる)という諺が背景。出世・実力の文脈で使う。", rank: 'A' },
    { daySlot: 10, month: '2026-07', expression: "get in line", contextBefore: "People assume things that aren't true. It's like, okay,", target: "get in line.", contextAfter: "But it's different. I did not expect politics to be such a part of my life.", note: "Get in line.=列に並べ=お前だけじゃない/順番待ちしろ。不満や批判が殺到する時に「文句あるなら並んで」と突き放す皮肉。", rank: 'S' },
    { daySlot: 10, month: '2026-07', expression: "have your guard up", contextBefore: "You walk into a room and look at people, like, that guy's sweating for no reason.", target: "You have to have your guard up for the kooks.", contextAfter: "Yeah, a lot of kooks.", note: "have/keep your guard up=警戒を怠らない/身構える。ボクシングのガードから。逆は let your guard down(油断する)。kook=変人・危ない奴。", rank: 'S' },
    { daySlot: 10, month: '2026-07', expression: "assume things", contextBefore: "People that don't know you,", target: "they assume things that aren't true.", contextAfter: "It's like, okay, get in line.", note: "assume=(確かめずに)決めつける/思い込む。assume things で「勝手に色々決めつける」。Don't assume.(決めつけるな)は会話で頻出の戒め。", rank: 'A' },
];

export const JULY_SOURCE_BY_DATE: Record<string, PodcastSource> = {
    [SOURCE_07_01.date]: SOURCE_07_01,
    [SOURCE_07_02.date]: SOURCE_07_02,
    [SOURCE_07_03.date]: SOURCE_07_03,
    [SOURCE_07_04.date]: SOURCE_07_04,
    [SOURCE_07_05.date]: SOURCE_07_05,
    [SOURCE_07_06.date]: SOURCE_07_06,
    [SOURCE_07_07.date]: SOURCE_07_07,
    [SOURCE_07_08.date]: SOURCE_07_08,
    [SOURCE_07_09.date]: SOURCE_07_09,
    [SOURCE_07_10.date]: SOURCE_07_10,
};

export const JULY_SEEDS: PodcastEntry[] = [
    ...ENTRIES_07_01,
    ...ENTRIES_07_02,
    ...ENTRIES_07_03,
    ...ENTRIES_07_04,
    ...ENTRIES_07_05,
    ...ENTRIES_07_06,
    ...ENTRIES_07_07,
    ...ENTRIES_07_08,
    ...ENTRIES_07_09,
    ...ENTRIES_07_10,
];
