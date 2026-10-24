// THE HUNDRED 場面版
//
// 初版は1行のフラッシュカードだった。3つ問題があった。
//   1. 読んでいてつまらない
//   2. 明日そのまま使えない(キャラ名入りの文が多い)
//   3. 録音する講師が単調になり、教材読みの「きれいな音」になる = 崩れが出ない = 教材が死ぬ
//
// 対策として1項目を3行の掛け合いにした。オチがつくので読んで楽しく、
// 講師は演じることになるので崩れた音が自然に出る。
// さらに返し行を使って、主ターゲット100から漏れていた現象(would, been, n't,
// who, 未開放破裂音, 鼻腔開放, 側面開放, thought group, yod脱落, 序数)を副次的に回収した。
//
// youVersion = キャラ名ゼロで、読者が明日そのまま使える汎用文。

import type { HundredLine } from './hundred-100';

export interface HundredScene {
    youVersion: string;
    alsoCovers: string[];
    /**
     * 3行の掛け合い。target: true の行がその項目の狙いを含む。
     * カード表面の文・実音・訳はこのターゲット行から自動で引く(hundred-100.ts の
     * getHundredFull)。二重管理して表記が食い違う事故を防ぐため、
     * ここに sentence/sound を別途持たせない。
     */
    dialogue: HundredLine[];
}

export const HUNDRED_SCENES: Record<number, HundredScene> = {
    1: {
        youVersion: 'Did you clean the room or just move the boxes?',
        alsoCovers: ['did you連結', 'of弱形', 'them弱形'],
        dialogue: [
            { sp: 'Ken', line: 'I took care of everything in the kitchen.', sound: 'I took care uv everything in thuh kitchen.', ja: '台所のことは全部やっといたよ', target: false },
            { sp: 'Emma', line: 'Did you feed the dog or just eat the snacks?', sound: 'Didja feed thuh dog er just eat thuh snacks?', ja: '犬にごはんあげたの? それとも自分がお菓子食べただけ?', target: true },
            { sp: 'Ken', line: 'The dog watched me eat them. That counts.', sound: "Thuh dog watched me eat 'em. That counts.", ja: 'ビスケットは俺が食べるのを見てた。それでカウントだろ', target: false },
        ],
    },
    2: {
        youVersion: 'Can I get a coffee and a sandwich to go?',
        alsoCovers: ['can弱形', 'you弱形', 'was弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Are you ordering? I thought you were on a diet.', sound: 'Are yuh ordering? I thought yuh were on uh diet.', ja: '注文するの? ダイエット中じゃなかったっけ', target: false },
            { sp: 'Ken', line: 'Can I get a small one? Actually, make it a large.', sound: "C'n I get uh small one? Akshully, make it uh large.", ja: '小さいのください。あ、やっぱり大きいのにして', target: true },
            { sp: 'Mike', line: 'That was the fastest diet I have ever seen.', sound: "That wuz thuh fastest diet I'v ever seen.", ja: '史上最速のダイエットだったな', target: false },
        ],
    },
    3: {
        youVersion: 'I had an egg and an orange for breakfast today.',
        alsoCovers: ['and弱形', 'the弱形', '短縮形'],
        dialogue: [
            { sp: 'Emma', line: 'How is the diet going? Be honest with me.', sound: "How'z thuh diet going? Be honest with me.", ja: 'ダイエットどう? 正直に言ってね', target: false },
            { sp: 'Ken', line: 'I only had an egg and an apple today. And a pizza.', sound: "I only had un egg 'n un apple tuhday. And uh pizza.", ja: '今日は卵1個とりんご1個だけ。あとピザ', target: true },
            { sp: 'Emma', line: 'The pizza part came out very quietly, Ken.', sound: 'Thuh pizza part came out very quietly, Ken.', ja: 'ピザのとこ、すごく小声だったね', target: false },
        ],
    },
    4: {
        youVersion: 'I need eggs and milk and bread from the store.',
        alsoCovers: ['than弱形', 'the弱形', 'was弱形'],
        dialogue: [
            { sp: 'Mike', line: 'How was lunch with the boss? I am starving.', sound: "How wuz lunch with thuh boss? I'm starving.", ja: '上司とのランチどうだった? 俺は腹ペコなんだけど', target: false },
            { sp: 'Ken', line: 'Dave ordered water and bread and called it lunch.', sound: "Dave ordered water 'n bread 'n called it lunch.", ja: 'デイブは水とパンを頼んで、それをランチって呼んでた', target: true },
            { sp: 'Mike', line: 'Water and bread? Even Biscuit eats better than that.', sound: "Water 'n bread? Even Biscuit eats better th'n that.", ja: '水とパン? ビスケットのほうがいいもの食ってるぞ', target: false },
        ],
    },
    5: {
        youVersion: "I'd love to come, but I'm really busy this week.",
        alsoCovers: ['would弱形', 'to弱形', 'them弱形', 'than弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Can you help me move these boxes to the garage?', sound: "C'n yuh help me move these boxes tuh thuh garage?", ja: 'この箱、ガレージまで運ぶの手伝ってくれる?', target: false },
            { sp: 'Ken', line: "I'd love to help, but I'm busy watching Biscuit sleep.", sound: "I'd love tuh help, b't I'm busy watching Biscuit sleep.", ja: '手伝いたいのは山々だけど、ビスケットの寝顔観察で忙しいんだ', target: true },
            { sp: 'Emma', line: "The dog would've moved them faster than you anyway.", sound: "Thuh dog would'uv moved 'em faster th'n you anyway.", ja: '犬のほうがあんたより速く運んだでしょうね', target: false },
        ],
    },
    6: {
        youVersion: 'I always knew that this would happen to us someday.',
        alsoCovers: ['would弱形', 'your弱形', '母音前のthe'],
        dialogue: [
            { sp: 'Ken', line: 'Biscuit ate something again. I found one shoe this morning.', sound: 'Biscuit ate something uhgen. I found one shoe this morning.', ja: 'ビスケットがまた何か食べた。今朝、靴が片方しかなかった', target: false },
            { sp: 'Emma', line: 'I knew that that dog would eat your shoe.', sound: 'I knew thut that dog wud eat yer shoe.', ja: 'あの犬があんたの靴食べるって分かってたわ', target: true },
            { sp: 'Ken', line: 'It was your shoe, actually. The expensive one.', sound: 'It wuz yer shoe, akshully. Thee expensive one.', ja: '実は君の靴なんだ。高いほうの', target: false },
        ],
    },
    7: {
        youVersion: 'My phone gets more attention than my family these days.',
        alsoCovers: ['t消失', 'a弱形', 'you弱形'],
        dialogue: [
            { sp: 'Emma', line: 'The doctor said you need to walk more, remember?', sound: 'Thuh doctor said yuh need tuh walk more, remember?', ja: 'お医者さんに、もっと歩けって言われたでしょ?', target: false },
            { sp: 'Ken', line: 'Biscuit gets more exercise than I do these days.', sound: "Biscuit gets more exercise th'n I do these days.", ja: '最近はビスケットのほうが俺より運動してるよ', target: true },
            { sp: 'Emma', line: 'He sleeps twenty hours a day, Ken.', sound: 'He sleeps twenny hours uh day, Ken.', ja: 'あの子、1日20時間寝てるけどね', target: false },
        ],
    },
    8: {
        youVersion: 'It was as good as everyone said it would be.',
        alsoCovers: ['and弱形', 'a弱形', 't消失'],
        dialogue: [
            { sp: 'Ken', line: 'I made a healthy dinner. Try it and be honest.', sound: "I made uh healthy dinner. Try it 'n be honest.", ja: '健康的な夕食を作ったんだ。食べて正直に言って', target: false },
            { sp: 'Emma', line: 'It tastes as bad as it looks, honey.', sound: 'It tastes uz bad uz it looks, honey.', ja: '見た目と同じくらいまずいわね、あなた', target: true },
            { sp: 'Ken', line: "Good news. Biscuit won't touch this one either.", sound: "Good news. Biscuit won' touch this one either.", ja: '朗報だよ。ビスケットもこれには手を出さない', target: false },
        ],
    },
    9: {
        youVersion: "There's a long line there, so let's come back later.",
        alsoCovers: ['been弱形', 'a弱形', 'and弱形'],
        dialogue: [
            { sp: 'Emma', line: 'You look tired. Go sit down and relax a little.', sound: "Yuh look tired. Go sit down 'n relax uh lit'l.", ja: '疲れてるみたいね。座ってちょっと休んだら', target: false },
            { sp: 'Ken', line: "There's a huge dog sitting there in my chair.", sound: "There'z uh huge dog sitting there in my chair.", ja: 'でかい犬が俺の椅子に座ってるんだけど', target: true },
            { sp: 'Emma', line: 'He has been there since noon. It is his chair now.', sound: "He'z bin there since noon. It's 'iz chair now.", ja: 'お昼からずっとあそこよ。もうあの子の椅子ね', target: false },
        ],
    },
    10: {
        youVersion: 'He forgot his phone and blamed his busy morning.',
        alsoCovers: ['he弱形', 'and弱形', 'was弱形'],
        dialogue: [
            { sp: 'Mike', line: 'How was golf with Dave? Did he win this time?', sound: "How wuz golf with Dave? Did 'e win this time?", ja: 'デイブとのゴルフどうだった? 今回は勝てたの?', target: false },
            { sp: 'Ken', line: 'Dave lost his ball and blamed his clubs.', sound: "Dave lost 'iz ball 'n blamed 'iz clubs.", ja: 'デイブはボールを失くして、クラブのせいにしてたよ', target: true },
            { sp: 'Mike', line: 'Last time he blamed the sun. It was cloudy.', sound: "Last time 'e blamed thuh sun. It wuz cloudy.", ja: 'この前は太陽のせいにしてた。曇りだったのに', target: false },
        ],
    },
    11: {
        youVersion: 'Give her her space and call her back tomorrow.',
        alsoCovers: ['your弱形', 'can弱形', 'a弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Can I ask Emma to help with the party?', sound: "C'n I ask Emma tuh help with thuh party?", ja: 'エマにパーティーの手伝い頼んでもいいかな', target: false },
            { sp: 'Ken', line: 'Give her her coffee first, then ask your question.', sound: "Giv 'er 'er coffee first, then ask yer question.", ja: 'まずコーヒーを渡して、それから質問しろ', target: true },
            { sp: 'Mike', line: 'Got it. I will bring a whole coffee pot.', sound: "Got it. I'll bring uh whole coffee pot.", ja: '了解。ポットごと持っていくわ', target: false },
        ],
    },
    12: {
        youVersion: 'Is your coffee ready, or is your machine broken again?',
        alsoCovers: ["n't鼻腔開放", 'at弱形', 'a弱形'],
        dialogue: [
            { sp: 'Ken', line: "Stop looking at me like that. I didn't do anything.", sound: "Stop looking ut me like that. I did'n do anything.", ja: 'そんな目で見るなよ。何もしてないって', target: false },
            { sp: 'Emma', line: 'Is your diet over, or is that your second burger?', sound: 'Iz yer diet over, er iz that yer second burger?', ja: 'ダイエット終わったの? それともそれ、2個目のバーガー?', target: true },
            { sp: 'Ken', line: "It is my third. And I wouldn't call it a diet.", sound: "It's my third. And I would'n call it uh diet.", ja: '3個目だよ。あと、これはもうダイエットとは呼ばない', target: false },
        ],
    },
    13: {
        youVersion: 'Is she coming to the meeting, or is she busy?',
        alsoCovers: ['can弱形', 'about弱形', 'a弱形'],
        dialogue: [
            { sp: 'Ken', line: 'Biscuit, buddy, I have a very important question.', sound: 'Biscuit, buddy, I hav uh very important question.', ja: 'ビスケット、相棒、大事な質問がある', target: false },
            { sp: 'Ken', line: 'Is she still mad about the coffee thing?', sound: 'Iz shi still mad uhbout thuh coffee thing?', ja: '彼女、まだコーヒーの件で怒ってる?', target: true },
            { sp: 'Emma', line: 'She can hear you. And yes, she is.', sound: "She c'n hear yuh. And yes, she iz.", ja: '彼女には聞こえてるわよ。ええ、怒ってる', target: false },
        ],
    },
    14: {
        youVersion: 'Did he say when he would call you back today?',
        alsoCovers: ['for弱形', 'about弱形', 'you弱形'],
        dialogue: [
            { sp: 'Ken', line: 'Mike came over while you were out. Sorry about dinner.', sound: 'Mike came over while yuh were out. Sorry uhbout dinner.', ja: '君の留守中にマイクが来てさ。夕飯ごめん', target: false },
            { sp: 'Emma', line: 'Did he really eat the whole pizza by himself?', sound: "Did 'e really eat thuh whole pizza by 'imself?", ja: 'あの人、本当にピザまるごと一人で食べたの?', target: true },
            { sp: 'Ken', line: 'He asked if we had another one. For dessert.', sound: 'He asked if we had uhnother one. Fer dessert.', ja: 'もう1枚ないかって聞かれたよ。デザート用に', target: false },
        ],
    },
    15: {
        youVersion: 'Can we talk about this later? I am really tired.',
        alsoCovers: ['can弱形', 'his弱形', 'and弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Dave is telling his golf story again. Smile and nod.', sound: "Dave'z telling 'iz golf story uhgen. Smile 'n nod.", ja: 'デイブがまたゴルフの話してる。笑ってうなずいて', target: false },
            { sp: 'Ken', line: "Can we go home yet? It's only ten.", sound: "C'n wi go home yet? It's only ten.", ja: 'もう帰っていい? まだ10時だけど', target: true },
            { sp: 'Emma', line: 'He has three more stories. I counted the slides.', sound: 'He haz three more stories. I counted thuh slides.', ja: 'あと3話あるわよ。スライド数えたから', target: false },
        ],
    },
    16: {
        youVersion: 'Do you think you could help me out this weekend?',
        alsoCovers: ['who弱形', 'for弱形', 'at弱形'],
        dialogue: [
            { sp: 'Mike', line: 'You are smiling at me. That always means trouble.', sound: 'Yer smiling ut me. That always means trouble.', ja: '俺に笑いかけてるな。それ、いつも面倒事のサインだぞ', target: false },
            { sp: 'Ken', line: 'Do you think you could cover for me on Monday?', sound: "D'yuh think yuh could cover fer mi on Monday?", ja: '月曜、俺の代わりに出てくれたりしない?', target: true },
            { sp: 'Mike', line: 'I am the guy who said no last time too.', sound: "I'm thuh guy 'oo said no last time too.", ja: '前回もノーって言ったのが俺なんだけど', target: false },
        ],
    },
    17: {
        youVersion: 'If anyone calls, tell him I will be back soon.',
        alsoCovers: ['you弱形', 'he弱形', "it's短縮"],
        dialogue: [
            { sp: 'Mike', line: 'You are leaving already? It is only three o\'clock.', sound: "Yer leaving ulready? It's only three uhclock.", ja: 'もう帰るの? まだ3時だよ', target: false },
            { sp: 'Ken', line: 'If Dave calls, tell him I already left.', sound: "If Dave calls, tell 'im I ulready left.", ja: 'デイブから電話きたら、もう帰ったって言っといて', target: true },
            { sp: 'Mike', line: 'He is standing right behind you, so tell him yourself.', sound: "He'z standing right behind yuh, so tell 'im yerself.", ja: '本人が真後ろに立ってるから、自分で言いなよ', target: false },
        ],
    },
    18: {
        youVersion: 'I bought them yesterday and ate them all last night.',
        alsoCovers: ['破裂音未開放', 'of弱形', "n't鼻腔開放", 'did you連結'],
        dialogue: [
            { sp: 'Emma', line: 'I came back for my fries and found a big empty bag.', sound: "I came bak' fer my fries 'n found uh big' empty bag.", ja: 'ポテト取りに戻ったら、でっかい空袋だけあったんだけど', target: false },
            { sp: 'Ken', line: 'The fries? I ate them. All of them. Sorry.', sound: "Thuh fries? I ate 'em. All uv 'em. Sorry.", ja: 'ポテト? 食べたよ。全部。ごめん', target: true },
            { sp: 'Emma', line: 'You did not even stop to breathe, did you?', sound: "Yuh didn' even stop' tuh breathe, didja?", ja: '息継ぎすらしなかったでしょ、あんた', target: false },
        ],
    },
    19: {
        youVersion: 'Can you send us the photos and tell us the time?',
        alsoCovers: ['to弱形', 'and弱形', 'his弱形'],
        dialogue: [
            { sp: 'Mike', line: 'So the boss finally paid for lunch? Tell me everything.', sound: 'So thuh boss finally paid fer lunch? Tell mi everything.', ja: '上司がついにランチおごったって? 詳しく聞かせろ', target: false },
            { sp: 'Ken', line: 'Dave took us to lunch and made us split the bill.', sound: "Dave took uhs tuh lunch 'n made uhs split thuh bill.", ja: 'デイブは俺らをランチに連れてって、割り勘にさせた', target: true },
            { sp: 'Mike', line: 'He took the receipt too, right? For his taxes.', sound: "He took thuh receipt too, right? Fer 'iz taxes.", ja: 'レシートは持って帰ったんだろ? 経費用に', target: false },
        ],
    },
    20: {
        youVersion: "I'll be at the store at five, maybe a little later.",
        alsoCovers: ['側面開放', '音節脱落', 'a弱形'],
        dialogue: [
            { sp: 'Emma', line: 'You are wearing gym clothes. Is this a special day?', sound: 'Yer wearing gym clothes. Iz this uh special day?', ja: 'ジムの服着てるじゃない。今日は特別な日?', target: false },
            { sp: 'Ken', line: "I'll be at the gym at six. Probably.", sound: "I'll be ut thuh gym ut six. Probly.", ja: '6時にジム行くから。たぶん', target: true },
            { sp: 'Emma', line: 'Take a little water bottle. And a map. It moved.', sound: "Take uh lit'l water bot'l. And uh map. It moved.", ja: '小さい水筒持っていきなさい。あと地図も。移転してたわよ', target: false },
        ],
    },
    21: {
        youVersion: 'This one is for you, and that one is for me.',
        alsoCovers: ["don'tのt脱落", 'isの縮約', '連結'],
        dialogue: [
            { sp: 'Ken', line: 'There is a big cake in the kitchen.', sound: "There's a big cake in the kitchen.", ja: '台所にでかいケーキがあるんだけど。', target: false },
            { sp: 'Emma', line: "It's for Dave's birthday, so don't touch it.", sound: "It's fer Dave's birthday, so doun' touch it.", ja: 'デイブの誕生日用だから、触らないでね。', target: true },
            { sp: 'Ken', line: 'Funny. Dave never buys anything for anyone.', sound: 'Funny. Dave never buys anything fer anyone.', ja: 'へえ。デイブは誰にも何も買わないのにね。', target: false },
        ],
    },
    22: {
        youVersion: "I just got back from work, so I'm really tired.",
        alsoCovers: ['justのt脱落', '語末t未開放', 'theの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Why are you eating pizza at ten at night?', sound: "Why-er you eating pizza at ten a' night?", ja: 'なんで夜の10時にピザ食べてるの?', target: false },
            { sp: 'Ken', line: 'I just got back from the gym. I earned this.', sound: "I jus' go' back frum the gym. I earned this.", ja: 'ジム帰りなんだよ。これは頑張ったご褒美。', target: true },
            { sp: 'Emma', line: 'You walked there and back. That is two hundred meters.', sound: "You walked there 'n' back. That's two hundred meters.", ja: '歩いて往復しただけでしょ。200メートルよ。', target: false },
        ],
    },
    23: {
        youVersion: 'I need a cup of coffee before I do anything.',
        alsoCovers: ['forの弱形', 'aの弱形', 'toの弱形'],
        dialogue: [
            { sp: 'Ken', line: 'How many cups of coffee is that today?', sound: 'How many cups-a coffee is that tuhday?', ja: 'それ、今日何杯目のコーヒー?', target: false },
            { sp: 'Emma', line: 'Six cups of coffee a day is normal for me.', sound: 'Six cups-a coffee a day is normal fer me.', ja: '1日コーヒー6杯は私には普通よ。', target: true },
            { sp: 'Ken', line: "It's seven. I counted. The dog counted too.", sound: "It's seven. I counted. The dog counted too.", ja: '7杯目だよ。数えてたから。犬も数えてた。', target: false },
        ],
    },
    24: {
        youVersion: "I have to get up early, but I don't want to.",
        alsoCovers: ['yodの脱落', 'wanna', 'tのラ音化'],
        dialogue: [
            { sp: 'Emma', line: "It's Monday morning, Ken. Get out of bed.", sound: "It's Monday morning, Ken. Geddout-a bed.", ja: '月曜の朝よ、ケン。ベッドから出て。', target: false },
            { sp: 'Ken', line: "I have to go to work, but I don't want to.", sound: "I hafta go tuh work, but I doun' wanna.", ja: '仕事に行かなきゃ。でも行きたくない。', target: true },
            { sp: 'Emma', line: 'Good news. Tuesday is a holiday. Bad news. Today is Monday.', sound: "Good nooz. Toozday's a holiday. Bad nooz. Tuhday's Monday.", ja: 'いい知らせ。火曜は祝日よ。悪い知らせ。今日は月曜。', target: false },
        ],
    },
    25: {
        youVersion: 'Can you get some bread on your way home?',
        alsoCovers: ['canの弱形', 'yourの弱形', '連結'],
        dialogue: [
            { sp: 'Ken', line: "I'm leaving work now. Do we need anything?", sound: "I'm leaving work now. D'we need anything?", ja: '今から会社出るよ。何か要るものある?', target: false },
            { sp: 'Emma', line: 'We need some milk. Can you get some on your way home?', sound: "We need s'm milk. C'n you get s'm on yer way home?", ja: '牛乳が要るの。帰りに買ってきてくれる?', target: true },
            { sp: 'Ken', line: 'Okay. And some chocolate. Milk gets lonely by itself.', sound: "Okay. An' s'm chocolate. Milk gets lonely by itself.", ja: '了解。あとチョコも。牛乳だけじゃ寂しいから。', target: false },
        ],
    },
    26: {
        youVersion: "I can cook, but I can't cook every day.",
        alsoCovers: ['強弱の対比', '語末t未開放'],
        dialogue: [
            { sp: 'Emma', line: 'How is the new diet going, Ken?', sound: "How's the new diet going, Ken?", ja: '新しいダイエットはどう、ケン?', target: false },
            { sp: 'Ken', line: "I can eat salad, but I can't eat only salad.", sound: "I c'n eat salad, but I CAN'T eat only salad.", ja: 'サラダは食べられる。でもサラダだけは無理。', target: true },
            { sp: 'Emma', line: 'That pizza box under the table can hear you.', sound: "Tha' pizza box under the table c'n hear you.", ja: 'テーブルの下のピザの箱に聞こえてるわよ。', target: false },
        ],
    },
    27: {
        youVersion: 'We could stay home, or we could go somewhere.',
        alsoCovers: ['orの弱形', 'justのt脱落', 'shouldの弱形'],
        dialogue: [
            { sp: 'Ken', line: "It's Friday night. What should we do?", sound: "It's Friday night. What sh'd we do?", ja: '金曜の夜だ。どうする?', target: false },
            { sp: 'Emma', line: 'We could go out, or we could just order pizza.', sound: "We c'd go out, er we c'd jus' order pizza.", ja: '出かけてもいいし、ピザ頼んじゃってもいいし。', target: true },
            { sp: 'Ken', line: "You said pizza. I heard it. It's decided.", sound: "You said pizza. I heard-it. It's decided.", ja: '今ピザって言ったね。聞いたよ。決定だ。', target: false },
        ],
    },
    28: {
        youVersion: 'You should have seen it. It was so funny.',
        alsoCovers: ['woulda', 'hの脱落', '連結'],
        dialogue: [
            { sp: 'Mike', line: 'How was golf with Dave yesterday?', sound: 'How wuz golf with Dave yesterday?', ja: '昨日のデイブとのゴルフ、どうだった?', target: false },
            { sp: 'Ken', line: "You should have seen Dave's face when he lost the ball.", sound: "You shoulda seen Dave's face when-ee lost the ball.", ja: 'ボールなくした時のデイブの顔、見せたかったよ。', target: true },
            { sp: 'Mike', line: 'He would have cried. It cost him three dollars.', sound: 'He woulda cried. It cost-im three dollars.', ja: '泣いたろうな。あのボール3ドルもしたし。', target: false },
        ],
    },
    29: {
        youVersion: 'The printer has stopped again. This thing never works.',
        alsoCovers: ['鼻音の同化', '語末t未開放', 'wasの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Why are you looking at an empty plate?', sound: 'Why-er you looking ad-an empty plate?', ja: 'なんで空のお皿を見つめてるの?', target: false },
            { sp: 'Ken', line: 'Biscuit has eaten my sandwich again. That dog never stops.', sound: "Biscuit's eaten my samwich again. Tha' dog never stops.", ja: 'またビスケットにサンドイッチ食われた。あの犬、止まらないな。', target: true },
            { sp: 'Emma', line: 'He has good taste. It was my sandwich, actually.', sound: 'He-z good taste. It wuz my samwich, actually.', ja: 'いい趣味してるわ。それ、実は私のサンドイッチだったの。', target: false },
        ],
    },
    30: {
        youVersion: 'We had just sat down when the baby started crying.',
        alsoCovers: ['beenの弱形', 'justのt脱落', 'toの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'You look tired. How was the restaurant?', sound: 'You look tired. How wuz the restaurant?', ja: '疲れてるわね。レストランどうだった?', target: false },
            { sp: 'Ken', line: 'We had just sat down when the phone rang.', sound: "We'd jus' sat down when the phone rang.", ja: '座った途端に電話が鳴ったんだ。', target: true },
            { sp: 'Emma', line: 'Dave? He had been waiting all day to talk about golf.', sound: "Dave? He'd bin waiting all day tuh talk about golf.", ja: 'デイブでしょ? 一日中ゴルフの話がしたくて待ってたのよ。', target: false },
        ],
    },
    31: {
        youVersion: 'Shall we start, or shall we wait a little more?',
        alsoCovers: ['orの弱形', 'forの弱形', 'wasの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'The meeting was at two. It is two twenty.', sound: "The meeting wuz at two. It's two twenty.", ja: '会議は2時からだよな。もう2時20分だけど。', target: false },
            { sp: 'Ken', line: 'Shall we start, or shall we wait for Dave again?', sound: "Sh'l we start, er sh'l we wait fer Dave again?", ja: '始めます? それともまたデイブを待ちます?', target: true },
            { sp: 'Mike', line: 'Start. He is watching golf videos in his car.', sound: "Start. He's watching golf videos in-iz car.", ja: '始めよう。あの人、車でゴルフ動画観てるから。', target: false },
        ],
    },
    32: {
        youVersion: "It's a small shop, but you should see the line.",
        alsoCovers: ['hの脱落', 'isの縮約', 'themの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Dave said no to new office chairs again.', sound: 'Dave said no tuh new office chairs again.', ja: 'デイブ、また新しい椅子はダメだって。', target: false },
            { sp: 'Ken', line: 'Dave is cheap, but you should see his golf clubs.', sound: "Dave's cheap, but you sh'd see-iz golf clubs.", ja: 'デイブはケチだけど、あのゴルフクラブは見ものだよ。', target: true },
            { sp: 'Mike', line: 'I saw them. They cost more than my car.', sound: "I saw-em. They cost more th'n my car.", ja: '見たよ。俺の車より高いやつ。', target: false },
        ],
    },
    33: {
        youVersion: 'You must be hungry. You worked all day without lunch.',
        alsoCovers: ['notの縮約', '語末t脱落', 'toの弱形'],
        dialogue: [
            { sp: 'Ken', line: 'Biscuit needed two walks today. Two.', sound: 'Biscuit needed two walks tuhday. Two.', ja: '今日ビスケット、散歩2回だよ。2回。', target: false },
            { sp: 'Emma', line: 'You must be tired. You walked Biscuit twice today.', sound: "You mus' be tired. You walked Biscuit twice tuhday.", ja: '疲れたでしょ。今日ビスケットの散歩2回も行ったんだから。', target: true },
            { sp: 'Ken', line: "I couldn't say no. You mustn't look into his eyes.", sound: "I couldn' say no. You musn' look into-iz eyes.", ja: '断れなかったんだ。あの目を見ちゃいけない。', target: false },
        ],
    },
    34: {
        youVersion: 'What do you want for dinner? I can make anything.',
        alsoCovers: ['lemme', 'forの弱形', 'beenの弱形'],
        dialogue: [
            { sp: 'Ken', line: "I'm so hungry. I have been good all week.", sound: "I'm so hungry. I've bin good all week.", ja: '腹減った。今週ずっと頑張ったんだ。', target: false },
            { sp: 'Emma', line: 'What do you want for lunch? Let me guess. Pizza.', sound: 'Whaddaya want fer lunch? Lemme guess. Pizza.', ja: 'お昼何がいい? 当てようか。ピザでしょ。', target: true },
            { sp: 'Ken', line: 'Wrong. I want two pizzas. I have been very good.', sound: "Wrong. I want two pizzas. I've bin VERY good.", ja: '外れ。ピザ2枚。すごく頑張ったからね。', target: false },
        ],
    },
    35: {
        youVersion: 'What does your dog do all day at home?',
        alsoCovers: ['hの脱落', 'andの弱形', 'wasの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Dave was not at his desk all morning again.', sound: 'Dave wuz nod-at-iz desk all morning again.', ja: 'デイブ、また午前中ずっと席にいなかったぞ。', target: false },
            { sp: 'Ken', line: 'What does he do all day? He sleeps and eats.', sound: "What duz-ee do all day? He sleeps 'n' eats.", ja: 'あの人、一日中何してるの? 寝て食べてるだけ。', target: true },
            { sp: 'Mike', line: 'And he gets paid more than both of us together.', sound: "An'-ee gets paid more th'n both-of-us tuhgether.", ja: 'それで俺ら2人分より給料もらってるんだぜ。', target: false },
        ],
    },
    36: {
        youVersion: 'Why am I always the one who does the dishes?',
        alsoCovers: ['連結', 'theの弱形', 'cuz'],
        dialogue: [
            { sp: 'Emma', line: 'Biscuit is at the door. He is waiting for you.', sound: "Biscuit's at the door. He's waiting fer you.", ja: 'ビスケットがドアの前にいるわよ。あなた待ち。', target: false },
            { sp: 'Ken', line: 'Why am I always the one who walks the dog?', sound: "Why-'m-I always the one who walks the dog?", ja: 'なんでいつも犬の散歩は俺なんだ?', target: true },
            { sp: 'Emma', line: 'Because he likes you more. Also, I am drinking coffee.', sound: "Cuz-ee likes you more. Also, I'm drinking coffee.", ja: 'あなたの方が好かれてるから。あと私は今コーヒー中だから。', target: false },
        ],
    },
    37: {
        youVersion: 'Where are you? We are all waiting for you.',
        alsoCovers: ['破裂音未開放', 'forの弱形', 'canの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Hello? Ken? I can explain everything.', sound: "Hello? Ken? I c'n explain everything.", ja: 'もしもし? ケン? 説明させてくれ。', target: false },
            { sp: 'Ken', line: 'Mike, where are you? We are all waiting for you.', sound: "Mike, where-er you? We're all waiting fer you.", ja: 'マイク、どこにいるんだ? みんな待ってるんだぞ。', target: true },
            { sp: 'Mike', line: "I'm bringing that big cake back for Dave. Good reason, right?", sound: "I'm bringing tha' big cake back fer Dave. Goo' reason, right?", ja: 'デイブ用のでかいケーキを持って戻ってる途中なんだよ。いい理由だろ?', target: false },
        ],
    },
    38: {
        youVersion: 'The train was gone when I got to the station.',
        alsoCovers: ['didjaの同化', 'theの弱形', 'yourの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Ken, did you eat the birthday cake?', sound: 'Ken, didja eat the birthday cake?', ja: 'ケン、誕生日ケーキ食べた?', target: false },
            { sp: 'Ken', line: 'The cake was gone when I got home. Biscuit was asleep.', sound: "The cake w'z gone when I got home. Biscuit w'z asleep.", ja: '帰ったらケーキが消えてたんだ。ビスケットは寝てた。', target: true },
            { sp: 'Emma', line: "Biscuit can't open the fridge. You have chocolate on your shirt.", sound: "Biscuit CAN'T open the fridge. You-'v chocolate on-yer shirt.", ja: 'ビスケットは冷蔵庫開けられないの。あとシャツにチョコついてるわよ。', target: false },
        ],
    },
    39: {
        youVersion: 'You were right. We were wrong. It happens sometimes.',
        alsoCovers: ['wasの弱形', 'justのt脱落'],
        dialogue: [
            { sp: 'Emma', line: 'So, how was the new road you found on the map?', sound: 'So, how wuz the new road you found on the map?', ja: 'で、あなたが地図で見つけた新しい道はどうだった?', target: false },
            { sp: 'Ken', line: 'You were right. We were wrong. Please stop smiling, Emma.', sound: 'You wer right. We wer wrong. Please stop smiling, Emma.', ja: '君が正しかった。僕らが間違ってた。だから笑うのやめて、エマ。', target: true },
            { sp: 'Emma', line: "I'm not smiling. This is just my happy face.", sound: "I'm not smiling. This-iz jus' my happy face.", ja: '笑ってないわよ。これは元からこういう顔なの。', target: false },
        ],
    },
    40: {
        youVersion: 'It will probably rain, but I will go anyway.',
        alsoCovers: ['wouldの弱形', "I'dとI'llの差"],
        dialogue: [
            { sp: 'Mike', line: 'Dave wants golf tomorrow. The TV says heavy rain.', sound: 'Dave wants golf tuhmorrow. The TV sez heavy rain.', ja: 'デイブが明日ゴルフだって。テレビは大雨って言ってるけど。', target: false },
            { sp: 'Ken', line: 'It will probably rain, but Dave will play golf anyway.', sound: "It'll probably rain, but Dave-'ll play golf anyway.", ja: 'たぶん雨だけど、どうせデイブはゴルフやるよ。', target: true },
            { sp: 'Mike', line: "I'd stay home. But I'll go. Free lunch after golf.", sound: "I'd stay home. But I'll go. Free lunch after golf.", ja: '俺なら家にいるね。でも行くよ。ゴルフの後、昼メシが出るし。', target: false },
        ],
    },
    41: {
        youVersion: 'Turn it off and put it away for a while.',
        alsoCovers: ['フラップT', '語末t脱落', 'r連結'],
        dialogue: [
            { sp: 'Ken', line: 'Just one more game. Five minutes, I promise.', sound: 'jus-wun mor gaym. faiv mi-nits, ai prah-mis', ja: 'あと1ゲームだけ。5分、約束する', target: false },
            { sp: 'Emma', line: 'You said that an hour ago. Turn it off and hand it over, Ken.', sound: 'yu sed tha-da-nau-rago. tur-ni-dawf-n han-di-dover, ken', ja: '1時間前にも聞いたわ。消して、こっちに渡しなさい、ケン', target: true },
            { sp: 'Ken', line: 'Fine. Biscuit, look away. This is a sad moment.', sound: 'fain. biskit, loo-ka-way. thi-siz a sad moh-ment', ja: 'わかったよ。ビスケット、見るな。悲しい瞬間だ', target: false },
        ],
    },
    42: {
        youVersion: 'Pick it up and put it back in the box.',
        alsoCovers: ['フラップT', '語末t脱落', '語連結'],
        dialogue: [
            { sp: 'Ken', line: 'Oops. My toast just hit the floor, butter side down.', sound: 'oops. mai tohst jus-hit the flor, buh-der sai(d)-down', ja: 'おっと。トーストを床に落とした、バター面が下だ', target: false },
            { sp: 'Emma', line: 'Pick it up before Biscuit eats it.', sound: 'pi-ki-dup bifor biskit eet-sit', ja: 'ビスケットが食べる前に拾って', target: true },
            { sp: 'Ken', line: 'Too late. He ate it and he looks proud.', sound: 'too layt. hee ay-di-dan hee looks proud', ja: 'もう遅い。食べた上に誇らしげだよ', target: false },
        ],
    },
    43: {
        youVersion: 'The bookstore is right next to the bus stop.',
        alsoCovers: ['破裂音未開放', '語連結', '語末t脱落'],
        dialogue: [
            { sp: 'Emma', line: "Stop that. Don't look back at the donut shop.", sound: 'stah(p) that. dohn loo(k) ba-kat the doh-nu(t) shahp', ja: 'やめなさい。ドーナツ屋を振り返らないの', target: false },
            { sp: 'Ken', line: "There's a gas station right next to the bus stop.", sound: 'thair-za gass-tay-shun rai(t) neks-tuh the buss-tahp', ja: 'バス停のすぐ隣にガソリンスタンドがあるんだ', target: true },
            { sp: 'Emma', line: 'They sell donuts there too. Nice try, Ken.', sound: 'thay sel doh-nuts thair too. nais trai, ken', ja: 'あそこにもドーナツ売ってるでしょ。惜しかったわね、ケン', target: false },
        ],
    },
    44: {
        youVersion: 'The water here is better than it looks.',
        alsoCovers: ['語境界フラップT', '語末t脱落', '語連結'],
        dialogue: [
            { sp: 'Mike', line: 'Want some office coffee? I made it myself.', sound: 'wan-sum aw-fis kaw-fee? ai may-dit mai-self', ja: 'オフィスのコーヒー飲む? 俺が入れたんだ', target: false },
            { sp: 'Ken', line: 'The water here tastes better than the coffee.', sound: 'the wah-der hir tayss beh-der thun the kaw-fee', ja: 'ここの水のほうがコーヒーよりうまいよ', target: true },
            { sp: 'Mike', line: "Great. More for me. I'll take your cup too.", sound: 'grayt. mor fer mee. ail tay-kyer kup too', ja: 'よし、俺の分が増えた。君のカップももらうよ', target: false },
        ],
    },
    45: {
        youVersion: 'I ate a bit of it, but not a lot.',
        alsoCovers: ['破裂音未開放', 'notの消滅', '語連結'],
        dialogue: [
            { sp: 'Emma', line: 'The cookie bag is empty. It was full this morning.', sound: 'the koo-kee bag i-zemp-tee. it wuz fool this mor-ning', ja: 'クッキーの袋が空っぽ。今朝は満タンだったのに', target: false },
            { sp: 'Ken', line: 'Biscuit ate a lot of it, not me.', sound: 'biskit ay-da-lah-da-vit, nah(t) mee', ja: 'ビスケットがほとんど食べたんだ、俺じゃない', target: true },
            { sp: 'Emma', line: "Biscuit can't open a cookie bag, Ken.", sound: 'biskit kaen oh-pun a koo-kee bag, ken', ja: 'ビスケットはクッキーの袋を開けられないのよ、ケン', target: false },
        ],
    },
    46: {
        youVersion: 'The top button on this shirt came off again.',
        alsoCovers: ['鼻腔開放', '語末t脱落', '破裂音未開放'],
        dialogue: [
            { sp: 'Ken', line: 'That was sudden. Something just flew across the room.', sound: 'that wuz suh-dn. sum-thing jus floo across the room', ja: '今のは急だったな。何かが部屋を飛んでいったぞ', target: false },
            { sp: 'Emma', line: 'The button on your pants flew off again.', sound: "the buh-'n on yer pants floo aw-fa-gen", ja: 'あなたのズボンのボタンがまた飛んだのよ', target: true },
            { sp: 'Ken', line: "I didn't eat that much. The pants got smaller.", sound: 'ai di-dn eet that much. the pants gah(t) smaw-ler', ja: 'そんなに食べてない。ズボンが縮んだんだ', target: false },
        ],
    },
    47: {
        youVersion: 'Did you eat already, or did you want something?',
        alsoCovers: ['鼻音の同化', '破裂音未開放', '語連結'],
        dialogue: [
            { sp: 'Mike', line: 'Why are you looking at me like that?', sound: 'wai-er yu loo-king a(t)-mee laik that', ja: 'なんでそんな目で俺を見てるんだ?', target: false },
            { sp: 'Ken', line: 'Did you eat my sandwich again, Mike?', sound: 'di-ja eet mai sam-wich agen, maik', ja: 'また俺のサンドイッチ食べたのか、マイク?', target: true },
            { sp: 'Mike', line: 'Eat is a strong word. I just tasted it.', sound: 'ee-diz a strawng werd. ai jus tay-sti-dit', ja: '食べたは言い過ぎだ。ちょっと味見しただけさ', target: false },
        ],
    },
    48: {
        youVersion: "Don't you have somewhere to be right now?",
        alsoCovers: ['鼻腔開放', '語末t脱落', 'フラップT'],
        dialogue: [
            { sp: 'Ken', line: 'Dave! I was just checking some important numbers.', sound: 'dayv! ai wuz jus che-king sum im-por-tn num-berz', ja: 'デイブ! 今ちょうど、大事な数字を確認してて', target: false },
            { sp: 'Dave', line: "Don't you have work to do, Ken?", sound: 'don-cha hav werk tuh doo, ken', ja: 'やる仕事があるんじゃないのか、ケン?', target: true },
            { sp: 'Ken', line: "Fine, it's golf. But I learned it from you.", sound: 'fain, its gawlf. buh-dai ler-ndit frum yoo', ja: 'わかりましたよ、ゴルフです。でもあなたから学んだんです', target: false },
        ],
    },
    49: {
        youVersion: "Would you get me some water while you're up?",
        alsoCovers: ['gonna縮約', 'did you縮約', '破裂音未開放'],
        dialogue: [
            { sp: 'Ken', line: 'I am going to stand up and stretch for a second.', sound: 'aim guh-nuh stan-dup an strech fer-a se-kund', ja: 'ちょっと立ってストレッチしてくる', target: false },
            { sp: 'Emma', line: "Would you get me a coffee while you're up?", sound: 'wu-ja geh(t)-mee a kaw-fee wai-lyer up', ja: '立ったついでにコーヒー取ってきてくれる?', target: true },
            { sp: 'Ken', line: 'How did you hear that from the other room?', sound: 'how di-ja hir that frum thee uh-ther room', ja: 'なんで別の部屋からそれが聞こえたんだ?', target: false },
        ],
    },
    50: {
        youVersion: "I'll miss you so much when you move this year.",
        alsoCovers: ['r連結', '語連結'],
        dialogue: [
            { sp: 'Mike', line: 'I am moving to the north office for a year.', sound: 'aim moo-ving tuh the north aw-fis fer-a-yir', ja: '1年間、北支社に異動になったんだ', target: false },
            { sp: 'Ken', line: "We'll miss you so much this year.", sound: 'weel mish-yu soh much thi-shir', ja: '今年は君がいなくて本当に寂しくなるよ', target: true },
            { sp: 'Mike', line: "You mean you'll miss my snacks. Be honest.", sound: 'yu meen yool mis mai snaks. bee ah-nist', ja: '寂しいのは俺のお菓子だろ。正直に言えよ', target: false },
        ],
    },
    51: {
        youVersion: "It's going to rain all weekend, so let's stay home.",
        alsoCovers: ['andの弱形', 't+y同化', 'フラップT'],
        dialogue: [
            { sp: 'Emma', line: 'Why are you smiling at your phone like that?', sound: 'wai-er yu smai-ling a-cher fohn laik that', ja: 'なんでスマホ見ながらニヤニヤしてるの?', target: false },
            { sp: 'Ken', line: "It's going to rain all weekend, and Dave has golf.", sound: 'its guh-nuh rayn awl week-end, an dayv haz gawlf', ja: '週末はずっと雨だって。そしてデイブはゴルフの予定', target: true },
            { sp: 'Emma', line: 'You look happier than you did at our wedding.', sound: 'yu look ha-pee-er than yu di-da-dour weh-ding', ja: '結婚式の日より嬉しそうね', target: false },
        ],
    },
    52: {
        youVersion: 'I want to go out, but I also want to sleep.',
        alsoCovers: ['フラップT', 'andの弱形', '破裂音未開放'],
        dialogue: [
            { sp: 'Emma', line: 'You bought a salad and three donuts, Ken.', sound: 'yu baw-da sa-lud an three doh-nuts, ken', ja: 'サラダ1つとドーナツ3つ買ったのね、ケン', target: false },
            { sp: 'Ken', line: 'I want to lose weight, but I also want to eat.', sound: 'ai wah-nuh looz wayt, buh-dai awl-soh wah-nuh eet', ja: '痩せたいんだ。でも食べたいんだ', target: true },
            { sp: 'Emma', line: 'Right now the donuts lead, three to one.', sound: 'rai(t) now the doh-nuts leed, three tuh wun', ja: '今のところドーナツが3対1でリードね', target: false },
        ],
    },
    53: {
        youVersion: 'This plan is kind of working, but only a little.',
        alsoCovers: ['側面開放', 'フラップT', '語連結'],
        dialogue: [
            { sp: 'Emma', line: 'How did the big weight check go this morning?', sound: 'how did the big way(t)-chek goh this mor-ning', ja: '今朝の体重測定、どうだった?', target: false },
            { sp: 'Ken', line: 'I lost a little weight. This diet is kind of working, sort of.', sound: 'ai law-sta li-dl wayt. this dai-uh-diz kai-nda wer-king, sor-da', ja: 'ちょっと痩せた。このダイエット、まあまあ効いてる、たぶん', target: true },
            { sp: 'Emma', line: "You're holding a bottle of soda in the middle of a diet.", sound: 'yer hohl-ding a bah-dla soh-da in the mi-dla-va dai-it', ja: 'ダイエットの真っ最中に炭酸のボトル持ってるけど', target: false },
        ],
    },
    54: {
        youVersion: 'Tell him his food is ready when you see him.',
        alsoCovers: ['andの弱形', '側面開放', '語連結'],
        dialogue: [
            { sp: 'Mike', line: 'This dinner smells great. Where should I sit?', sound: 'this di-ner smelz grayt. wair shoo-dai sit', ja: 'この夕食、いい匂いだ。どこに座ればいい?', target: false },
            { sp: 'Emma', line: 'Ask Ken. And tell him his dog is on the table again.', sound: 'ask ken. an te-li-miz daw-gi-zon the tay-bl agen', ja: 'ケンに聞いて。あと、犬がまたテーブルに乗ってると伝えて', target: true },
            { sp: 'Mike', line: 'Biscuit found his seat before I did.', sound: 'biskit foun-diz seet bifor ai did', ja: 'ビスケットは俺より先に席を見つけたわけだ', target: false },
        ],
    },
    55: {
        youVersion: 'Take these bags and put them in the car.',
        alsoCovers: ['andの弱形', '語連結'],
        dialogue: [
            { sp: 'Mike', line: 'I am going to the store. Do you need anything?', sound: 'aim goh-ing tuh the stor. duh-yuh need e-nee-thing', ja: '店に行ってくるけど、何かいる?', target: false },
            { sp: 'Emma', line: 'Yes. Buy the donuts and hide them from Ken.', sound: 'yes. bai the doh-nuts an hai-dem frum ken', ja: 'ええ。ドーナツを買って、ケンから隠しておいて', target: true },
            { sp: 'Mike', line: 'Sure. But who hides them from me?', sound: 'shur. but hoo hai-dzem frum mee', ja: '了解。で、俺からは誰が隠すんだ?', target: false },
        ],
    },
    56: {
        youVersion: 'I stayed up last night and paid for it today.',
        alsoCovers: ['notの消滅', 'did you縮約', 'フラップT'],
        dialogue: [
            { sp: 'Emma', line: "You look terrible. You didn't sleep at all, did you?", sound: 'yu look teh-ruh-bl. yu di-dn sleep a-dawl, di-ja', ja: 'ひどい顔。全然寝てないでしょ', target: false },
            { sp: 'Ken', line: 'I stayed up last night and watched old movies.', sound: 'ai stay-dup las-nait n wach-dohld moo-veez', ja: '昨日の夜、夜ふかしして古い映画を観てたんだ', target: true },
            { sp: 'Emma', line: 'And you wonder why you hate Mondays.', sound: 'an yu wun-der wai yu hayt mun-dayz', ja: 'それで月曜が嫌いって、よく言えるわね', target: false },
        ],
    },
    57: {
        youVersion: "She asked me to work next weekend, but I can't.",
        alsoCovers: ['h脱落', '語末t脱落', 'notの消滅'],
        dialogue: [
            { sp: 'Emma', line: 'Why do you look like the world just ended?', sound: 'wai duh-yuh look laik the werl jus-ten-did', ja: 'なんで世界が終わったみたいな顔してるの?', target: false },
            { sp: 'Ken', line: 'Dave asked me to work weekends for three months.', sound: 'dayv as-mee tuh werk wee-kendz fer three munths', ja: 'デイブに3か月間、週末も働けって言われた', target: true },
            { sp: 'Emma', line: "Ask him if he pays extra. He won't.", sound: 'as-kim i-fee payz ek-stra. hee wohn(t)', ja: '残業代出るのか聞いてみたら。出ないでしょうけど', target: false },
        ],
    },
    58: {
        youVersion: "It's probably the most comfortable seat on the whole train.",
        alsoCovers: ['yod脱落', 'h脱落', '語末t脱落'],
        dialogue: [
            { sp: 'Mike', line: 'Big news. Dave is at a golf event till Tuesday.', sound: 'big nooz. day-vi-za-da gawlf ivent til tooz-day', ja: 'ビッグニュースだ。デイブは火曜までゴルフの大会だって', target: false },
            { sp: 'Ken', line: "Then his chair is mine. It's probably the most comfortable chair in the office.", sound: 'then iz chair-iz main. its prah-blee the mohs kumf-ter-bl chair-in thee aw-fis', ja: 'なら彼の椅子は俺のものだ。たぶんオフィスで一番快適な椅子だからな', target: true },
            { sp: 'Mike', line: 'He came back early last Tuesday. Just saying.', sound: 'hee kaym ba-kur-lee las-tooz-day. jus-say-ing', ja: '先週の火曜は早く帰ってきたけどな。一応言っとく', target: false },
        ],
    },
    59: {
        youVersion: 'I should not have stayed up so late last night.',
        alsoCovers: ['鼻腔開放', '語末t脱落', 'フラップT'],
        dialogue: [
            { sp: 'Emma', line: 'There was a whole cake here for tomorrow\'s party.', sound: 'thair wu-za hohl kayk hir fer tuh-mah-rohz par-dee', ja: 'ここに明日のパーティー用のケーキが丸ごとあったはずなんだけど', target: false },
            { sp: 'Ken', line: 'I know. I should not have eaten the whole cake.', sound: 'ai noh. ai shud-na ee-tn the hohl kayk', ja: 'わかってる。ケーキを丸ごと食べるべきじゃなかった', target: true },
            { sp: 'Emma', line: 'You could not have left one piece? Amazing, Ken.', sound: 'yu cud-na left wun peess? amay-zing, ken', ja: '一切れも残せなかったの? 大したものね、ケン', target: false },
        ],
    },
    60: {
        youVersion: 'What do you mean the meeting moved to eight?',
        alsoCovers: ['側面開放', 'yod脱落', '破裂音未開放'],
        dialogue: [
            { sp: 'Emma', line: 'Small dinner news. The steak plan changed a little.', sound: 'smawl di-ner nooz. the stayk plan chayn-jda li-dl', ja: '夕食についてお知らせ。ステーキの予定がちょっと変わったの', target: false },
            { sp: 'Ken', line: 'What do you mean you gave my steak to Biscuit?', sound: 'wuh-duh-yuh meen yu gayv mai stayk tuh biskit', ja: 'ステーキをビスケットにあげたってどういうことだよ?', target: true },
            { sp: 'Emma', line: 'He looked at me. You never look at me like that.', sound: 'hee look-ta(t)-mee. yu neh-ver loo-ka(t)-mee laik that', ja: 'あの子がじっと見つめてきたのよ。あなた、私をあんな目で見たことないでしょ', target: false },
        ],
    },
    61: {
        youVersion: 'My idea of a good weekend is far away from work.',
        alsoCovers: ['破裂音未開放', '語連結'],
        dialogue: [
            { sp: 'Dave', line: 'Ken, play golf with me this Sunday morning.', sound: 'ken, play gawlf with mee this sun-day mor-ning', ja: 'ケン、今度の日曜の朝、一緒にゴルフをやろう', target: false },
            { sp: 'Ken', line: 'Sorry, Dave. My idea of a good Sunday is far away from golf.', sound: 'sah-ree dayv. mai ai-dee-er-uv a good sun-day iz fah-ra-way frum gawlf', ja: 'すみませんデイブ。俺の理想の日曜は、ゴルフから遠く離れた場所にあるんです', target: true },
            { sp: 'Dave', line: 'Great. Pick me up at six on Sunday then.', sound: 'grayt. pi(k)-mee-uh-pat six on sun-day then', ja: 'よし。じゃあ日曜の6時に迎えに来てくれ', target: false },
        ],
    },
    62: {
        youVersion: 'Will you be able to go on without your phone?',
        alsoCovers: ['whoの弱形', 'wanna縮約', '鼻腔開放'],
        dialogue: [
            { sp: 'Emma', line: 'The coffee machine is making a very strange sound.', sound: 'the kaw-fee muh-sheen iz may-king a veh-ree straynj sound', ja: 'コーヒーメーカーが変な音を立ててるんだけど', target: false },
            { sp: 'Ken', line: 'It just died. Will you be able to go on without coffee, Emma?', sound: 'it jus daid. wil-yu bee-yay-bl tuh goh-won with-ou(t) kaw-fee, emma', ja: '今、息を引き取ったよ。コーヒーなしでやっていけるか、エマ?', target: true },
            { sp: 'Emma', line: 'Find the person who broke it. I just want to talk.', sound: 'faind the per-sn oo broh-kit. ai jus wah-nuh tawk', ja: '壊した人を見つけて。ちょっと話がしたいだけよ', target: false },
        ],
    },
    63: {
        youVersion: 'I drove my truck straight down that street this morning.',
        alsoCovers: ['語末破裂音の未開放', 'hisのh脱落', 'つなげ読み'],
        dialogue: [
            { sp: 'Emma', line: 'I heard a truck, so I stopped and looked outside.', sound: 'ai herd-a-trak, sou ai stap(t) an lukt aut-said', ja: 'トラックの音がしたから、足を止めて外を見たのよ', target: false },
            { sp: 'Ken', line: 'Dave drives his truck straight down this street every spring.', sound: 'deiv draivz-iz-trak streit-daun dhis striit evri spring', ja: 'デイブは毎年春、この通りをトラックでまっすぐ走っていくんだ', target: true },
            { sp: 'Ken', line: 'I asked him why once. He just talked about golf.', sound: 'ai askt-im wai wans. hi jas(t) tok-tabaut galf', ja: '一度理由を聞いたんだけど、ゴルフの話しかしなかった', target: false },
        ],
    },
    64: {
        youVersion: 'I asked him months ago to fix those desks.',
        alsoCovers: ['t+youの融合', '鼻腔開放', '子音の脱落'],
        dialogue: [
            { sp: 'Emma', line: 'Ken, your desk looks like a trash mountain again.', sound: 'ken, yor desk luks-laik-a trash maun-tn agen', ja: 'ケン、あなたの机、またゴミの山みたいになってるけど', target: false },
            { sp: 'Emma', line: 'I asked you months ago to clean those desks.', sound: 'ai as-kchu mants-agou tu kliin dhouz desks', ja: '何か月も前に、その机を片付けてって頼んだよね', target: true },
            { sp: 'Ken', line: 'You did? I thought that was just a bad dream.', sound: 'yu did? ai thot dhat-waz jas(t)-a bad driim', ja: 'え、頼まれてた? あれは悪い夢だと思ってた', target: false },
        ],
    },
    65: {
        youVersion: 'The phone rang while I ran to the kitchen.',
        alsoCovers: ['theの弱形', '鼻腔開放', 'つなげ読み'],
        dialogue: [
            { sp: 'Emma', line: 'I heard some ringing. Then I heard loud running.', sound: 'ai herd sam ring-ing. dhen ai herd laud ran-ing', ja: 'ベルの音がして、そのあとドタドタ走る音がしたけど', target: false },
            { sp: 'Ken', line: 'The phone rang while I ran to the door.', sound: 'dha foun rang wail ai ran tu dha dor', ja: '電話が鳴ってる間に、玄関まで走ったんだ', target: true },
            { sp: 'Emma', line: 'You ran? I should call you at dinner more often.', sound: 'yu ran? ai shud kol yu at din-er mor of-n', ja: 'あなたが走った? 夕食どきにもっと電話してあげるべきね', target: false },
        ],
    },
    66: {
        youVersion: 'This heat is hitting me really hard this week.',
        alsoCovers: ['isの弱形', 'つなげ読み', 'ingの実音'],
        dialogue: [
            { sp: 'Mike', line: 'You look like a wet towel, Ken. Are you okay?', sound: 'yu luk-laik-a wet tau-al, ken. ar yu ou-kei', ja: '濡れタオルみたいな顔してるぞ、ケン。大丈夫か?', target: false },
            { sp: 'Ken', line: 'This heat is hitting me hard today.', sound: 'dhis hiit-iz hit-ing mi hard tudei', ja: '今日はこの暑さが本当にこたえるよ', target: true },
            { sp: 'Mike', line: "Great! Hot days make me hungry. Let's get ice cream.", sound: 'greit! hat deiz meik mi hang-gri. lets get ais-kriim', ja: 'いいね! 暑い日は腹が減る。アイス買いに行こうぜ', target: false },
        ],
    },
    67: {
        youVersion: 'I take vitamins every day because the virus scares me.',
        alsoCovers: ['yod脱落', 'did youの融合', 'sheの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Did you watch the news on Tuesday? New virus again.', sound: 'didja wach dha nuuz an tuuz-dei? nuu vai-ras agen', ja: '火曜のニュース見たか? また新しいウイルスだって', target: false },
            { sp: 'Ken', line: 'Yeah. Emma takes vitamins because she is scared of every virus.', sound: 'ye. em-a teiks vai-ta-minz bikaz shiz skerd av ev-ri vai-ras', ja: 'ああ。エマはどんなウイルスも怖いから、ビタミン剤を飲んでるよ', target: true },
            { sp: 'Mike', line: 'Smart. I take pizza every night, just to be safe.', sound: 'smart. ai teik piit-sa ev-ri nait, jas(t)-tu bi seif', ja: '賢いな。俺は念のため毎晩ピザを摂取してる', target: false },
        ],
    },
    68: {
        youVersion: "It's so hot that I cut my walk short.",
        alsoCovers: ['thatの弱形', 'hisのh脱落', '語末tの未開放'],
        dialogue: [
            { sp: 'Emma', line: 'Back already? Your run was only ten minutes.', sound: 'bak ol-red-i? yor ran waz oun-li ten min-its', ja: 'もう帰ってきたの? まだ10分しか経ってないけど', target: false },
            { sp: 'Ken', line: "It's so hot that I cut my run short.", sound: 'its sou haat dhet ai kat mai ran short', ja: '暑すぎて、ランニングを短めに切り上げたんだ', target: true },
            { sp: 'Emma', line: 'Ten minutes. Biscuit walks longer than that to his bowl.', sound: 'ten min-its. bis-kit woks long-ger dhan dhat tu iz boul', ja: '10分ね。ビスケットでも餌皿までもっと長く歩くわよ', target: false },
        ],
    },
    69: {
        youVersion: 'My banana disappeared, so I almost called the police.',
        alsoCovers: ['hisのh脱落', 'theの弱形', 'forの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Why did Ken sound so angry on the phone?', sound: 'wai did ken saund sou ang-gri an dha foun', ja: 'なんでケンは電話であんなに怒ってたんだ?', target: false },
            { sp: 'Emma', line: 'He almost called the police when Biscuit ate his banana.', sound: "hi ol-moust kold dha p'liis wen bis-kit eit iz b'nan-a", ja: 'ビスケットにバナナを食べられて、警察を呼びかけたのよ', target: true },
            { sp: 'Mike', line: 'The police? For a banana? I eat five a day.', sound: "dha p'liis? far a b'nan-a? ai iit faiv a dei", ja: '警察? バナナで? 俺なんか1日5本食べるぞ', target: false },
        ],
    },
    70: {
        youVersion: 'I got a strike and screamed like a little kid.',
        alsoCovers: ['側面開放', 'tのラ音化', 'let meの短縮'],
        dialogue: [
            { sp: 'Emma', line: 'You look a little too happy. What happened tonight?', sound: 'yu luk-a liD-l tuu hap-i. wat hap-nd tu-nait', ja: 'ずいぶんご機嫌ね。今夜は何があったの?', target: false },
            { sp: 'Ken', line: 'Mike got a strike and screamed like a child.', sound: 'maik gaD-a straik an skriimd laik-a chaild', ja: 'マイクがストライクを取って、子どもみたいに叫んだんだ', target: true },
            { sp: 'Emma', line: 'Let me guess. He celebrated with a big bottle of cola.', sound: 'lemi ges. hi sel-a-brei-tid widh-a big baD-l av kou-la', ja: '当てましょうか。そのあと特大のコーラで祝杯でしょ', target: false },
        ],
    },
    71: {
        youVersion: 'He seems like a nice guy until you work with him.',
        alsoCovers: ['himのh脱落', 'つなげ読み', 'untilの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Is Dave a nice man? He smiled at me today.', sound: 'iz deiv a-nais man? hi smaild at mi tudei', ja: 'デイブっていい人なのか? 今日、俺に笑いかけてきたぞ', target: false },
            { sp: 'Ken', line: 'Dave looks like a nice man until you play golf with him.', sound: 'deiv luks-laik-a-nais man an-til yu plei galf widh-im', ja: 'デイブは、一緒にゴルフをするまでは、いい人に見えるんだ', target: true },
            { sp: 'Mike', line: 'So on the golf course he turns into an ice man?', sound: 'sou an dha galf kors hi ternz intu an-ais man?', ja: 'じゃあゴルフ場では氷の男に変身するのか?', target: false },
        ],
    },
    72: {
        youVersion: 'Every gray day, I tell myself I need ice cream.',
        alsoCovers: ['andの弱形', 'つなげ読み', 'haveの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Look at that sky. Another gray day is coming.', sound: 'luk-at dhat skai. anadh-er grei-dei iz kam-ing', ja: 'あの空見て。また灰色の一日が来るわよ', target: false },
            { sp: 'Ken', line: 'Every gray day, I say I need ice cream.', sound: 'ev-ri grei-dei, ai sei ai niid ais-kriim', ja: '灰色の日はいつも、アイスが要るって言っちゃうんだ', target: true },
            { sp: 'Emma', line: 'And when we have no ice cream, I hear you scream.', sound: 'an wen wi hav nou ais-kriim, ai hir yu-skriim', ja: 'で、アイスを切らしてると、あなたの悲鳴(I scream)が聞こえるのよね', target: false },
        ],
    },
    73: {
        youVersion: "He said he'd finished the report and he'd send it today.",
        alsoCovers: ['beenの弱形', '鼻腔開放', 'andの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Why are you angry? What did Mike do now?', sound: 'wai ar yu ang-gri? wa-Did maik du nau', ja: '何を怒ってるの? マイクが今度は何をしたの?', target: false },
            { sp: 'Ken', line: "Mike said he'd eaten my lunch and he'd do it again.", sound: 'maik sed hiid iit-n mai lanch an hiid du-it agen', ja: 'あいつ、俺の昼メシを食べたし、また食べるって言ったんだ', target: true },
            { sp: 'Emma', line: "Of course. He'd been hungry since the day he was born.", sound: 'av-kors. hiid-bin hang-gri sins dha dei hi waz born', ja: 'そりゃそうよ。あの人、生まれた日からずっとお腹すいてるもの', target: false },
        ],
    },
    74: {
        youVersion: "I'll be in the snack aisle if anyone needs me.",
        alsoCovers: ['ifの弱形', 'andの弱形', 'つなげ読み'],
        dialogue: [
            { sp: 'Emma', line: 'We just need milk and eggs. Five minutes, okay?', sound: 'wi jas(t) niid milk-an-egz. faiv min-its, ou-kei', ja: '牛乳と卵だけよ。5分で終わるからね', target: false },
            { sp: 'Ken', line: "I'll be in the snack aisle if you need me.", sound: 'ail bi in dha snak ail if yu niid mi', ja: '必要になったら、お菓子コーナーにいるから', target: true },
            { sp: 'Emma', line: "That's why your diet always dies in aisle five.", sound: 'dhats-wai yor dai-at ol-weiz daiz in ail faiv', ja: 'あなたのダイエットがいつも5番通路で終わる理由がそれよ', target: false },
        ],
    },
    75: {
        youVersion: 'I should have gone to bed early last night.',
        alsoCovers: ['shoulda化', '対比強勢', 'toの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'You keep touching your back and making old man sounds.', sound: 'yu KIIP TACH-ing yor BAK an MEI-king OULD-MAN SAUNDZ', ja: 'さっきから腰を押さえて、おじいちゃんの声を出してるけど', target: false },
            { sp: 'Ken', line: 'I should have gone to the gym this morning.', sound: 'ai shudav GON tu dha JIM dhis MOR-ning', ja: '今朝ジムに行っておくべきだったよ', target: true },
            { sp: 'Emma', line: 'You should have gone to the gym this year.', sound: 'yu shudav gon tu dha jim dhis YIR', ja: '今年のうちに一回でも行っておくべきだったわね', target: false },
        ],
    },
    76: {
        youVersion: 'I have been waiting for this moment all day.',
        alsoCovers: ['意味の区切り', 'beenの弱形', '対比強勢'],
        dialogue: [
            { sp: 'Ken', line: 'Why is Biscuit sitting by his bowl like a statue?', sound: 'WAI iz BIS-kit SIT-ing bai iz BOUL laik-a STACH-u', ja: 'なんでビスケットは銅像みたいに皿の前に座ってるんだ?', target: false },
            { sp: 'Emma', line: 'Biscuit has been waiting for his dinner all day.', sound: 'BIS-kit az-bin WEI-ting far iz DIN-er ol DEI', ja: 'ビスケットは一日中ずっと夕飯を待ってるのよ', target: true },
            { sp: 'Emma', line: 'When I cook, he waits. When you cook, he hides.', sound: 'wen AI kuk | hi WEITS // wen YU kuk | hi HAIDZ', ja: '私が作る日は待つの。あなたが作る日は隠れるの', target: false },
        ],
    },
    77: {
        youVersion: "I didn't say you broke it. I said you dropped it.",
        alsoCovers: ["didn'tのt脱落", 'つなげ読み'],
        dialogue: [
            { sp: 'Ken', line: 'Everyone thinks I ate the cake. Even the dog judges me.', sound: 'EV-ri-wan THINKS ai EIT dha KEIK. iiv-n dha DOG JAJ-iz mi', ja: 'みんな俺がケーキを食べたと思ってる。犬まで責める目で見てくる', target: false },
            { sp: 'Emma', line: "I didn't say you ate my cake.", sound: 'ai didnt sei yu EIT mai keik', ja: '食べたとは言ってないでしょ', target: true },
            { sp: 'Emma', line: 'I said you destroyed it. There is a difference.', sound: 'ai SED yu dis-TROID it. dher IZ a DIF-rans', ja: '壊滅させたって言ったの。そこは大事な違いよ', target: false },
        ],
    },
    78: {
        youVersion: 'She wanted coffee, so I got her coffee.',
        alsoCovers: ['whoの弱形', 'herのh脱落', 'soの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Two coffees? You never buy anything for anyone.', sound: 'TUU KO-fiz? yu NEV-er BAI EN-i-thing far EN-i-wan', ja: 'コーヒー2つ? お前、人に何か買うタイプじゃないだろ', target: false },
            { sp: 'Ken', line: 'Emma wants coffee, so I got her coffee.', sound: 'EM-a WANTS KO-fi | sou ai GAT-er ko-fi', ja: 'エマがコーヒーを欲しがってたから、買ったんだよ', target: true },
            { sp: 'Mike', line: 'Smart. A man who forgets coffee sleeps on the sofa.', sound: 'SMART. a man-u fer-GETS KO-fi SLIIPS an dha SOU-fa', ja: '賢明だ。コーヒーを忘れる夫はソファで寝ることになるからな', target: false },
        ],
    },
    79: {
        youVersion: 'I will present the present at the party myself.',
        alsoCovers: ['複合語強勢', 'theの弱形', 'atの弱形'],
        dialogue: [
            { sp: 'Emma', line: 'Is Dave really coming to the birthday party?', sound: 'iz DEIV RI-li KAM-ing tu dha BERTH-dei PAR-ti', ja: 'デイブって本当に誕生日会に来るの?', target: false },
            { sp: 'Ken', line: 'Yes. Dave will present the present at the party.', sound: 'YES. deiv wil pri-ZENT dha PREZ-nt at dha PAR-ti', ja: 'ああ。パーティーでプレゼントを贈呈するらしいよ', target: true },
            { sp: 'Emma', line: 'Knowing Dave, the present is a used golf ball.', sound: 'NOU-ing DEIV | dha PREZ-nt iz a YUUZD GALF-bol', ja: 'デイブのことだから、中身は使い古しのゴルフボールでしょ', target: false },
        ],
    },
    80: {
        youVersion: 'Someone stole my hot dog from the table again.',
        alsoCovers: ['側面開放', 'fromの弱形', '対比強勢'],
        dialogue: [
            { sp: 'Ken', line: 'Why is Biscuit hiding under the sofa with a guilty face?', sound: 'WAI iz BIS-kit HAI-ding AN-der dha SOU-fa widh-a GIL-ti FEIS', ja: 'なんでビスケットは気まずそうな顔でソファの下に隠れてるんだ?', target: false },
            { sp: 'Emma', line: 'Biscuit stole a hot dog from the table again.', sound: 'BIS-kit STOUL a HAT-dog fram dha TEI-bl agen', ja: 'ビスケットがまたテーブルからホットドッグを盗んだのよ', target: true },
            { sp: 'Ken', line: 'So now we have a hot dog and no hot dog.', sound: 'sou NAU wi hav a hat-DOG | an NOU HAT-dog', ja: 'つまり今うちには暑い犬が一匹いて、ホットドッグはゼロってことか', target: false },
        ],
    },
    81: {
        youVersion: 'Please turn the lights off when you go upstairs.',
        alsoCovers: ['側面開放', 'たたき音', '弱形(you)'],
        dialogue: [
            { sp: 'Emma', line: 'I am taking Biscuit up. He wants his little water bottle.', sound: 'aim TAY-king BIS-kit UP. he WANTS iz LID-l WAH-der BAD-l', ja: 'ビスケット連れて上に行くね。小さい水筒を欲しがってるから。', target: false },
            { sp: 'Ken', line: 'Turn the lights off when you go up.', sound: 'TURN thuh lights OFF when yuh go UP', ja: '上に行くとき電気消しといて。', target: true },
            { sp: 'Emma', line: 'I will. Then you can eat your cake in the dark.', sound: 'ai WIL. then yuh kuhn EAT yer KAYK in thuh DARK', ja: 'はいはい。そしたらあなたは暗闇でケーキが食べられるでしょ。', target: false },
        ],
    },
    82: {
        youVersion: "I can drive, but I can't park very well.",
        alsoCovers: ['無開放のt', '文強勢', '弱形(but)'],
        dialogue: [
            { sp: 'Mike', line: 'Why did Emma drive here, but Ken walked from the car?', sound: 'why did EM-uh DRIVE here, buht KEN WALKT fruhm thuh KAR', ja: 'なんでエマさんは車で来たのに、ケンさんは車から歩いてきたんですか?', target: false },
            { sp: 'Dave', line: "Emma can drive, but Ken can't park.", sound: 'EM-uh kuhn DRIVE, buht KEN KANT PARK', ja: 'エマは運転はできるが、ケンは駐車ができないんだ。', target: true },
            { sp: 'Mike', line: 'So the car is safe in the next town.', sound: 'so thuh KAR iz SAYF in thuh NEKST TOWN', ja: 'じゃあ車は隣町で無事ってことですね。', target: false },
        ],
    },
    83: {
        youVersion: "You're really eating that whole pizza by yourself tonight?",
        alsoCovers: ["you'reの弱形", '連結', '文強勢'],
        dialogue: [
            { sp: 'Ken', line: 'Emma, I bought dinner for us tonight.', sound: 'EM-uh, ai BAWT DIN-er fer uhs tuh-NIGHT (下降)', ja: 'エマ、今夜は俺が夕食を買ってきたよ。', target: false },
            { sp: 'Emma', line: "You're eating that whole pizza by yourself?", sound: 'yer EAT-ing that WHOLE PEET-suh by yer-SELF (上昇)', ja: 'そのピザ、丸ごと一人で食べる気なの?', target: true },
            { sp: 'Ken', line: 'No, of course not. Biscuit gets the box.', sound: 'NO, uhv KORS not. BIS-kit gets thuh BOX (下降)', ja: 'まさか。箱はビスケットにあげるよ。', target: false },
        ],
    },
    84: {
        youVersion: "It's really cold again this morning, isn't it?",
        alsoCovers: ['下降調', "n'tの連結", "弱形(it's)"],
        dialogue: [
            { sp: 'Emma', line: 'You have that face again. What is wrong now?', sound: 'yuh HAV that FACE uh-gen. wuhts RONG NOW (下降)', ja: 'またその顔してる。今度は何?', target: false },
            { sp: 'Ken', line: "Well, it's Monday again, isn't it?", sound: 'WEL, its MUN-day uh-gen, IZ-uhn-it (下降)', ja: 'だってさ、また月曜日だろ?', target: true },
            { sp: 'Emma', line: "It's Sunday, Ken. You have one more day to be sad.", sound: 'its SUN-day, ken. yuh hav WUN more DAY tuh be SAD', ja: '今日は日曜よ、ケン。落ち込むのはあと1日先でいいの。', target: false },
        ],
    },
    85: {
        youVersion: 'We need eggs, milk, bread, and some coffee today.',
        alsoCovers: ['意味の区切り', 'and弱形', '選択疑問'],
        dialogue: [
            { sp: 'Emma', line: 'Read me the shopping list. I am driving, so talk slowly.', sound: 'REED me thuh SHOP-ing list / aim DRIV-ing, so TALK SLOW-lee', ja: '買い物リスト読んで。運転中だからゆっくりね。', target: false },
            { sp: 'Ken', line: 'We need eggs, milk, bread, and dog food.', sound: 'we need EGGS(上昇) / MILK(上昇) / BREAD(上昇) / uhn DOG FOOD(下降)', ja: '卵と、牛乳と、パンと、あとドッグフードね。', target: true },
            { sp: 'Emma', line: 'Is the dog food for Biscuit or for your diet?', sound: 'iz thuh DOG food fer BIS-kit(上昇) / or fer YOUR DIE-uht(下降)', ja: 'そのドッグフードはビスケット用? それともあなたのダイエット用?', target: false },
        ],
    },
    86: {
        youVersion: 'So, uh, I was thinking we could maybe eat out.',
        alsoCovers: ['区切りの崩れ', '言い直し', '弱形の連発'],
        dialogue: [
            { sp: 'Emma', line: "Just say it, Ken. I don't have all night.", sound: 'juhs SAY it, ken / ai DOHNT hav ALL NIGHT', ja: 'さっさと言いなさいよ、ケン。夜は長くないの。', target: false },
            { sp: 'Ken', line: 'So, uh, I was, like, thinking we could, you know, eat out.', sound: 'so, uh / ai wuhz, like / THINK-ing we kuhd, yuh know / EAT OUT', ja: 'いや、その、なんていうか、ほら、外食でもどうかなって。', target: true },
            { sp: 'Emma', line: "Ten seconds of noise for four real words. Yes, let's go.", sound: 'TEN SEK-uhndz uhv NOISE fer FOR REEL WORDZ / YES, lets GO', ja: '中身4語のために10秒も唸ったのね。ええ、行きましょ。', target: false },
        ],
    },
    87: {
        youVersion: 'I worked late and missed the gym again yesterday.',
        alsoCovers: ['and弱形', '連結', '文強勢'],
        dialogue: [
            { sp: 'Dave', line: 'Ken looks half dead today. What happened to him?', sound: 'ken looks HAF DED tuh-day. wuht HAP-uhnd tuh him', ja: 'ケンのやつ、今日は死にかけみたいだな。何があった?', target: false },
            { sp: 'Mike', line: 'Ken worked late and missed the gym again.', sound: 'ken WORKT LATE uhn MIST thuh JIM uh-gen', ja: 'ケンさん、残業して、またジムに行きそびれたんですよ。', target: true },
            { sp: 'Dave', line: 'Again? The gym should report him as a missing person.', sound: 'uh-GEN? thuh JIM shuhd ruh-PORT im uhz uh MIS-ing PER-suhn', ja: 'またか。ジムはあいつを行方不明者として届け出るべきだな。', target: false },
        ],
    },
    88: {
        youVersion: 'He called at nine and changed the plan again.',
        alsoCovers: ['連結(d+at)', 'atの弱形', 'and弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Why are we meeting at seven and not at ten?', sound: 'why er we MEET-ing uht SEV-uhn uhn NOT uht TEN', ja: 'なんで10時じゃなくて7時に集合なんですか?', target: false },
            { sp: 'Ken', line: 'Dave called at nine and changed the plan again.', sound: 'dave KALL-duht NINE uhn CHAYNJD thuh PLAN uh-gen', ja: 'デイブが9時に電話してきて、また予定を変えたんだよ。', target: true },
            { sp: 'Mike', line: 'Then he will call at six and change it back.', sound: 'then heel KALL uht SIX uhn CHAYNJ it BAK', ja: 'じゃあどうせ6時にまた電話してきて、元に戻すんですね。', target: false },
        ],
    },
    89: {
        youVersion: 'I wanted pizza, but I needed to save money first.',
        alsoCovers: ['ntのt消失', 'butの弱形', 'hの脱落'],
        dialogue: [
            { sp: 'Dave', line: 'Why did Mike just walk past the pizza place?', sound: 'why did mike juhs WALK PAST thuh PEET-suh place', ja: 'マイクのやつ、なんでピザ屋の前を素通りしたんだ?', target: false },
            { sp: 'Ken', line: 'Mike wanted pizza, but he needed money first.', sound: 'mike WAH-nid PEET-suh, buh-dee NEE-did MUN-ee first', ja: 'マイクはピザが食べたかったんですけど、まず金が必要だったんです。', target: true },
            { sp: 'Dave', line: 'He waited outside and smelled it. That was lunch.', sound: 'he WAY-did out-SIDE uhn SMEL-dit. THAT wuhz LUNCH', ja: '外で待って匂いを嗅いでたぞ。あれが昼飯だったのか。', target: false },
        ],
    },
    90: {
        youVersion: 'I was supposed to call you back this morning, sorry.',
        alsoCovers: ["n'tの消滅", 'toの弱形', 'wasの弱形'],
        dialogue: [
            { sp: 'Mike', line: 'Is Ken coming to lunch? We found a great pizza place.', sound: 'iz ken KUM-ing tuh LUNCH? we FOWND uh great PEET-suh place', ja: 'ケンさんはランチ来ます? いいピザ屋を見つけたんですよ。', target: false },
            { sp: 'Emma', line: 'Ken was supposed to start his diet today.', sound: 'ken wuhz spohs-tuh START iz DIE-uht tuh-DAY', ja: 'ケンは今日からダイエットを始めるはずだったのよ。', target: true },
            { sp: 'Mike', line: "He told me the diet wasn't supposed to start until Monday.", sound: 'he TOLD me thuh DIE-uht WUZ spohs-tuh start uhn-til MUN-day', ja: '本人はダイエットは月曜まで始まらないはずだって言ってましたけど。', target: false },
        ],
    },
    91: {
        youVersion: 'She works, he plays, and the boss just watches.',
        alsoCovers: ['tの脱落(just)', 'and弱形', '列挙の抑揚'],
        dialogue: [
            { sp: 'Emma', line: 'How does lunch work with you three at the office?', sound: 'how duhz LUNCH work with yoo THREE uht thee OF-is', ja: '会社の3人ランチって、どういう仕組みなの?', target: false },
            { sp: 'Ken', line: "It's a system. Mike eats, Ken pays, and Dave just watches.", sound: 'its uh SIS-tuhm. mike EATS(上昇), ken PAYZ(上昇), uhn dave juhs WATCH-iz(下降)', ja: 'システムがあるんだ。マイクが食べて、ケンが払って、デイブはただ見てる。', target: true },
            { sp: 'Emma', line: 'Watches? Dave never even pays for his own water.', sound: 'WATCH-iz? dave NEV-er EE-vuhn PAYZ fer iz OWN WAH-der', ja: '見てるだけ? デイブは自分の水代すら払わないもんね。', target: false },
        ],
    },
    92: {
        youVersion: 'I always want some snacks before the meeting starts.',
        alsoCovers: ['ntのt消失', '弱形(some)', '連結'],
        dialogue: [
            { sp: 'Dave', line: 'Why is Mike standing by the vending machine again?', sound: 'why iz mike STAND-ing by thuh VEN-ding muh-SHEEN uh-gen', ja: 'マイクのやつ、なんでまた自販機の前に立ってるんだ?', target: false },
            { sp: 'Ken', line: 'Mike wants some snacks before the meeting starts.', sound: 'mike WANT-suhm SNAKS buh-fore thuh MEE-ting STARTS', ja: '会議が始まる前に、お菓子が欲しいんですよ。', target: true },
            { sp: 'Dave', line: 'The meeting is about our missing snack money.', sound: 'thuh MEE-ting iz uh-BOUT er MIS-ing SNAK MUN-ee', ja: 'その会議の議題は、消えたお菓子代なんだがな。', target: false },
        ],
    },
    93: {
        youVersion: "She's been on a diet since Monday, right?",
        alsoCovers: ['beenの弱形', '連結', '確認の上昇'],
        dialogue: [
            { sp: 'Mike', line: 'Why did Ken say no to free pizza just now?', sound: 'why did ken say NO tuh FREE PEET-suh juhs NOW', ja: 'ケンさん、なんでさっきタダのピザを断ったんですか?', target: false },
            { sp: 'Dave', line: "Ken's been on a diet since Monday, right?", sound: 'kenz-bin on-uh DIE-uht sins MUN-day, RIGHT (上昇)', ja: 'ケンは月曜からダイエット中なんだろ?', target: true },
            { sp: 'Mike', line: "It is Monday today. So the diet's been alive for three hours.", sound: 'it IZ MUN-day tuh-day. so thuh DIE-uhts-bin uh-LIVE fer THREE OW-erz', ja: '今日がその月曜ですよ。つまりダイエットはまだ生まれて3時間です。', target: false },
        ],
    },
    94: {
        youVersion: 'Did you say thirteen dollars or thirty dollars?',
        alsoCovers: ['たたき音', 'butの弱形', '文末強勢'],
        dialogue: [
            { sp: 'Mike', line: 'Why is Ken reading the lunch bill three times?', sound: 'why iz ken REED-ing thuh LUNCH BIL THREE TIMES', ja: 'ケンさん、なんで伝票を3回も読み直してるんですか?', target: false },
            { sp: 'Ken', line: 'Dave said thirteen dollars, but the bill said thirty.', sound: 'dave sed ther-TEEN DOL-erz, buht thuh BIL sed THIR-dee', ja: 'デイブは13ドルって言ったのに、伝票には30ドルって書いてあるんだ。', target: true },
            { sp: 'Mike', line: "Somehow Dave's math always saves Dave seventeen dollars.", sound: 'SUM-how daves MATH ALL-ways SAYVZ dave sev-uhn-TEEN DOL-erz', ja: 'デイブさんの計算って、なぜかいつも本人が17ドル得するんですよね。', target: false },
        ],
    },
    95: {
        youVersion: 'My train leaves at 7:15 and costs $7.50.',
        alsoCovers: ['序数', '分数(half)', '小数(point)', '-teen/-ty'],
        dialogue: [
            { sp: 'Emma', line: 'I need to get to the station by half past nine on the 3rd.', sound: 'ai NEED tuh get tuh thuh STAY-shuhn by HAF past NINE on thuh THIRD', ja: '3日に、9時半までに駅に行かなきゃいけないの。', target: false },
            { sp: 'Ken', line: 'The bus leaves at 6:15 and costs $6.50.', sound: 'thuh BUS leevz uht six fif-TEEN uhn kosts six FIF-tee', ja: 'バスは6時15分発で、料金は6ドル50だよ。', target: true },
            { sp: 'Emma', line: "Six fifty? I'll walk the two point five miles and buy coffee.", sound: 'six FIF-tee? ail WALK thuh TOO point FIVE MILES uhn buy KAW-fee', ja: '6ドル50? なら2.5マイル歩いて、そのお金でコーヒーを買うわ。', target: false },
        ],
    },
    96: {
        youVersion: 'Just call my phone at 555-3400 after lunch, okay?',
        alsoCovers: ['無開放のd/k', 'ntのt消失', '確認の上昇'],
        dialogue: [
            { sp: 'Mike', line: 'How do I reach you about the golf trip, Dave?', sound: 'how duh ai REECH yoo uh-bout thuh GOLF TRIP, dave', ja: 'デイブさん、ゴルフ旅行の件はどこに連絡すればいいですか?', target: false },
            { sp: 'Dave', line: 'Just call my desk at 555-2200, okay?', sound: 'juhs KALL my DES-kuht five-five-five, twen-ee-too HUN-druhd, o-KAY (上昇)', ja: '俺のデスクに電話しろ、555の2200だ。いいな?', target: true },
            { sp: 'Mike', line: "What's the area code? Or does that cost extra too?", sound: 'wuhts thee AIR-ee-uh KOH(d)? or duhz THA(t) kost EK-struh TOO', ja: '市外局番は? それとも、それも別料金ですか?', target: false },
        ],
    },
    97: {
        youVersion: 'Turn left at the next light, then go straight home.',
        alsoCovers: ['連結(at the)', '無開放のt', '文強勢'],
        dialogue: [
            { sp: 'Emma', line: 'Okay, we are lost. Read the map slowly this time.', sound: 'o-KAY, weer LOST. REED thuh MAP SLOW-lee this time', ja: 'はい、迷いました。今度は地図をゆっくり読んで。', target: false },
            { sp: 'Ken', line: 'Turn right at the second light, then go straight.', sound: 'turn RIGHT uht thuh SEK-uhnd LIGHT, then go STRAYT', ja: '2つ目の信号を右に曲がって、あとはまっすぐ。', target: true },
            { sp: 'Emma', line: 'You said that at the last four lights, Ken.', sound: 'yuh SED THAT uht thuh LAST FOR LIGHTS, ken', ja: 'それ、この前の信号4つでも言ったわよね、ケン。', target: false },
        ],
    },
    98: {
        youVersion: "She won't sit down until she sees the show.",
        alsoCovers: ["won'tの無開放", 'hの脱落', '文強勢'],
        dialogue: [
            { sp: 'Mike', line: 'Why is Emma standing by the coffee machine like a guard?', sound: 'why iz EM-uh STAND-ing by thuh KAW-fee muh-SHEEN like uh GARD', ja: 'エマさん、なんで見張りみたいにコーヒーメーカーの前に立ってるんですか?', target: false },
            { sp: 'Ken', line: "Emma won't sit down until she sees her coffee.", sound: 'EM-uh WOHN(t) SIT DOWN uhn-TIL she SEEZ her KAW-fee', ja: 'エマはコーヒーを見るまで、絶対に座らないんだよ。', target: true },
            { sp: 'Mike', line: 'The machine broke this morning. We should all leave now.', sound: 'thuh muh-SHEEN BROKE this MOR-ning. we shuhd ALL LEEV NOW', ja: 'そのマシン、今朝壊れました。全員すぐ逃げましょう。', target: false },
        ],
    },
    99: {
        youVersion: 'He is very proud of his best new vest.',
        alsoCovers: ['hの脱落', 'ofの弱形', '文強勢'],
        dialogue: [
            { sp: 'Mike', line: 'Why is Dave turning around slowly in front of everybody?', sound: 'why iz dave TER-ning uh-ROWND SLOW-lee in FRUN-tuhv EV-ree-bod-ee', ja: 'デイブさん、なんでみんなの前でゆっくり回ってるんですか?', target: false },
            { sp: 'Ken', line: 'Dave is very proud of his best golf vest.', sound: 'dave iz VER-ee PROWD uhv iz BEST GOLF VEST', ja: 'デイブは自慢の一番いいゴルフベストを見せてるんだよ。', target: true },
            { sp: 'Mike', line: 'Dave? Buy a vest? That was a birthday gift, believe me.', sound: 'DAVE? BUY uh VEST? that wuhz uh BIRTH-day GIFT, buh-LEEV me', ja: 'デイブさんがベストを買う? あれは絶対、誕生日プレゼントですよ。', target: false },
        ],
    },
    100: {
        youVersion: "I thought about that thing, and I think it's fine.",
        alsoCovers: ['たたき音', 'butの弱形', '文強勢'],
        dialogue: [
            { sp: 'Ken', line: 'I practiced th for ten years. People still hear d.', sound: 'ai PRAK-tist TH fer TEN YEERZ. PEE-puhl STIL heer DEE', ja: '俺、thを10年練習したんだ。それでもみんなにはdに聞こえるらしい。', target: false },
            { sp: 'Emma', line: "They think that these things matter, but they don't.", sound: 'dey TINK duht DEEZ TINGS MAD-er, buht dey DOHNT', ja: 'みんな、そういうのが大事だと思ってるけど、大事じゃないのよ。', target: true },
            { sp: 'Ken', line: 'All d sounds, and I understood every word. Ninety-nine things come first.', sound: 'ALL DEE SOUNDZ, uhn ai un-der-STOOD EV-ree WORD. NINE-tee-NINE THINGS kum FIRST', ja: '今の全部dの音なのに、全部聞き取れた。thの前にやることが99個あるわけだ。', target: false },
        ],
    },
};
