/**
 * 365 English Master -- Month 5 Week 18: 健康と体 (Health and Body)
 * Days 128-134: 70 expressions
 * Month: August 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 5 (2026-08) -- WEEK 18
// ============================================================

export const MONTH5_W18_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 128: 体調が悪い (Feeling Sick)
    // Scene: タケシが二日酔いで居酒屋に登場。みんなが体調の英語を教える夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 128, japanese: '体調悪いんだよね',
        english: [
            'I am not feeling well.',
            'I have been feeling off all day. Something is not right.',
            'Honestly, I have been feeling terrible since this morning. I think I might be coming down with something.',
            "I do not know what is wrong with me but I have been feeling awful since I woke up. Like, not just tired, actually physically terrible. My head hurts, my stomach is doing weird things, and I feel like I could fall asleep standing up. I probably should not even be here right now but I figured if I am going to feel miserable I might as well do it with company. Is that weird?",
        ],
        context: 'feeling off は「なんか調子悪い」の絶妙な表現。日本語では「体調悪い」で全部済むけど、英語では程度に応じてunder the weather(軽い)、feeling off(なんか変)、feeling terrible(かなりヤバい)と使い分ける。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '熱があるみたい',
        english: [
            'I think I have a fever.',
            'I feel hot. I think I might have a fever.',
            'My forehead is burning up. I am pretty sure I have a fever. Does anyone have a thermometer?',
            "Okay, feel my forehead. Does it feel hot to you? Because I feel like I am on fire right now. I do not have a thermometer so I cannot check but I am sweating and shivering at the same time which is never a good sign. The last time I felt like this I ended up having a hundred and two fever and I was in bed for three days. I really hope this is not that again.",
        ],
        context: 'アメリカは華氏(Fahrenheit)で体温を測る。37度C=98.6度F。「38度ある」と言っても通じない。a hundred and two feverは約39度C。have a fever=熱がある。run a fever も同義。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '風邪ひいたっぽい',
        english: [
            'I think I caught a cold.',
            'I might be coming down with a cold. My throat is scratchy.',
            'I have been sneezing all day and my nose is running. I definitely caught something.',
            "I think I am getting sick. It started with a little tickle in my throat yesterday and now my nose will not stop running and I keep sneezing every five minutes. I hate that stage where you are not sick enough to stay home but you are too sick to function like a normal person. Like, I am in this limbo of misery where I just want someone to bring me soup and tell me everything is going to be okay.",
        ],
        context: 'catch a cold は「風邪をひく」。日本語では「ひく」だけど英語では「つかまえる」。coming down with は「〜になりかけている」で、まだ確定していないニュアンス。I have a cold(確定) vs I am coming down with something(まだ怪しい)。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: 'お腹壊した',
        english: [
            'I have a stomachache.',
            'My stomach is killing me. I think I ate something bad.',
            'I have had an upset stomach since lunch. I should not have eaten that leftover sushi.',
            "My stomach is absolutely wrecked right now. I think it was that convenience store sushi I had for lunch. It tasted fine at the time but about two hours later my stomach started making these noises that sounded like a washing machine. I have been running to the bathroom every thirty minutes. Too much information? Sorry. But seriously, do not ever eat day-old sushi. Lesson learned the hard way.",
        ],
        context: 'upset stomach は「お腹の調子が悪い」の最も自然な表現。stomachacheはやや子供っぽい。日本語の「お腹壊した」は直訳できない。my stomach is killingme は「死ぬほど痛い」でかなりカジュアル。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '薬飲んだ？',
        english: [
            'Did you take medicine?',
            'Have you taken anything for it? You should take some medicine.',
            'You look terrible. Have you taken any medicine? I have some ibuprofen in my bag if you need it.',
            "Have you taken anything yet? Because you really look like you need something. I always carry ibuprofen and cold medicine in my bag because I am basically a walking pharmacy at this point. My mom was the same way. She had a pill for everything. Headache? Here. Stomachache? Here. Broken heart? She probably had a pill for that too. Anyway, do you want some? It should kick in within thirty minutes.",
        ],
        context: 'take medicine は「薬を飲む」。英語ではdrink medicineとは言わない。液体の薬でもtake。over-the-counter=市販薬、prescription=処方薬。kick in は「効き始める」でよく使うイディオム。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '無理しないでね',
        english: [
            'Take it easy.',
            'Do not push yourself. Get some rest.',
            'Seriously, do not overdo it. Go home and get some rest. We will be here next week.',
            "Hey, listen. I know you think you are tough and you can power through anything but your body is literally telling you to stop. Go home. Get in bed. Drink something warm. Watch something stupid on Netflix. We are not going anywhere. The bar will still be here tomorrow and next week and the week after that. Your health comes first. Do not be that guy who ends up in the hospital because he refused to rest.",
        ],
        context: '「無理しないで」は日本語特有の優しさがある表現。英語ではtake it easy、do not push yourself、do not overdo it で言い分けるけど、どれも日本語ほどの温かみが出にくい。get some rest が一番近い。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: 'ずっと頭痛い',
        english: [
            'I have a headache.',
            'I have had a headache all day. It will not go away.',
            'This headache has been going on since this morning. No amount of water or coffee is helping.',
            "I have had this dull throbbing headache behind my eyes since like six a.m. and nothing is working. I tried drinking water because everyone always says you are dehydrated. Drank a whole liter. Nothing. Tried coffee because sometimes caffeine helps. Nothing. Took two painkillers. Still nothing. At this point I am convinced there is a tiny construction worker inside my skull jackhammering my brain for fun.",
        ],
        context: 'headache は「頭痛」。migraine=偏頭痛（もっと重い）。日本語では「頭が痛い」の一種類だけど、英語ではdull(鈍い)、throbbing(ズキズキ)、splitting(割れるような)と痛み方を形容詞で表現する文化がある。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '声が出ない',
        english: [
            'I lost my voice.',
            'I can barely talk. I totally lost my voice.',
            'My voice is completely gone. I have been whispering all day and my coworkers think it is hilarious.',
            "I woke up this morning and opened my mouth to say good morning and nothing came out. Like, literally nothing. Just air. My voice is completely gone. I tried to call in sick to work but I could not even talk on the phone so I had to text my boss. He thought I was joking until I sent him a voice message that sounded like a dying frog. I have been drinking hot tea with honey nonstop but so far nothing is working.",
        ],
        context: 'lose my voice は「声が出なくなる」。日本語の「声が枯れる」はmy voice is hoarseで、完全に出ないのとは違う。英語ではvoice is gone(完全)、voice is hoarse(ガラガラ)、voice is cracking(裏返る)と段階がある。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '寒気がする',
        english: [
            'I have the chills.',
            'I keep getting the chills. I cannot stop shivering.',
            'I am wearing three layers and I still have the chills. Can someone turn up the heat?',
            "Is it cold in here or is it just me? Because I am freezing. I have my jacket on, I borrowed Kenji's scarf, and I am still shaking like a leaf. This is definitely the chills, not actual cold. My body cannot figure out if it is hot or cold. One minute I am sweating, the next minute I am shivering. It is like my internal thermostat is completely broken. This is what happens when you ignore a cold for three days.",
        ],
        context: 'the chills は風邪の症状の「寒気」。単にcold(寒い)とは違って、体調不良の震え。goosebumps=鳥肌（寒さや感動）。shiverは「震える」。日本語の「ゾクゾクする」が一番近いのはthe chills。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '早退した',
        english: [
            'I left work early.',
            'I left work early today. I just could not take it anymore.',
            'I ended up leaving the office early because I felt so bad. My boss told me to go home.',
            "I made it to like two p.m. and then I just gave up. I was sitting at my desk pretending to work but I was basically just staring at my screen with glazed eyes. My boss walked by, took one look at me, and was like go home right now before you infect the entire office. I did not even argue. I just grabbed my stuff and left. I do not even remember the train ride home. I think I might have fallen asleep and missed my stop twice.",
        ],
        context: 'leave work early は「早退する」。日本語の「早退」は一語で済むけど、英語では文で説明する。call in sick=病欠の電話をする。take a sick day=病欠を取る。work from home=在宅勤務（体調微妙な時の選択肢）。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 129: 病院で (At the Doctor)
    // Scene: タケシが病院に行った報告。海外で病院に行く時の英語をみんなで練習
    // ────────────────────────────────────────────────────

    {
        daySlot: 129, japanese: '予約を取りたいんですけど',
        english: [
            'I would like to make an appointment.',
            'Hi, I need to see a doctor. Can I make an appointment?',
            'I have been feeling sick for a few days. Could I schedule an appointment as soon as possible?',
            "Hi, I need to make an appointment. I have been feeling really bad for the past three days and it is not getting better. I tried waiting it out but my symptoms are actually getting worse. Is there any availability today or tomorrow? I know it is short notice but I am kind of desperate at this point. If there are no openings with my regular doctor I am happy to see whoever is available. I just need someone to tell me what is wrong.",
        ],
        context: '病院の予約はappointment。レストランはreservation。この使い分けは日本語にはない。make an appointment=予約を入れる。walk-in=予約なしで行く。same-day appointment=当日予約。海外では予約なしで医者に会えないことが多い。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: 'どこが痛いですか？',
        english: [
            'Where does it hurt?',
            'Can you show me where exactly it hurts?',
            'On a scale of one to ten, how bad is the pain? And can you point to where it hurts the most?',
            "Okay, let me take a look. Can you tell me where exactly it hurts? Is it a sharp pain or more of a dull ache? And when did it start? Was it sudden or did it come on gradually? Does it get worse when you move or is it constant? I know these are a lot of questions but the more specific you can be, the easier it is for me to figure out what is going on. Also, any other symptoms? Fever, nausea, dizziness?",
        ],
        context: 'Where does it hurt? は医者の定番フレーズ。日本語の「どこが痛いですか」とほぼ同じ。ただし英語では痛みの種類を聞かれることが多い。sharp(鋭い)、dull(鈍い)、throbbing(ズキズキ)、aching(疼く)。日本語の擬音語のほうが便利。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: 'アレルギーはありますか？',
        english: [
            'Do you have any allergies?',
            'Before I prescribe anything, do you have any drug allergies?',
            'I need to check -- are you allergic to any medications? Penicillin, ibuprofen, anything like that?',
            "Before we go any further I need to ask about allergies. Are you allergic to any medications? Penicillin? Sulfa drugs? Any antibiotics? What about food allergies? I ask because some medications contain ingredients that might trigger a reaction if you have food sensitivities. And have you ever had a bad reaction to any medication in the past? Even something minor like a rash or an upset stomach? Better to know now than find out the hard way.",
        ],
        context: 'allergic to は「〜にアレルギーがある」。drug allergy=薬のアレルギー。日本語では「アレルギー」だけで通じるけど、英語では何に対するアレルギーかを必ず明示する。peanut allergy, shellfish allergy など。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '保険証を見せてください',
        english: [
            'Can I see your insurance card?',
            'Do you have your insurance card with you? I will need to see it.',
            'Before we get started, I will need a copy of your insurance card and a photo ID please.',
            "Hi, welcome. Before we can see you today I am going to need a few things. First, your insurance card, front and back. And a photo ID, a driver's license or passport works. If your insurance has changed since your last visit I will need the new information. And just so you know, depending on your plan there might be a copay today. Do you know what your copay is? If not, I can look it up for you.",
        ],
        context: 'insurance card は「保険証」。日本の国民皆保険とアメリカの民間保険は全然違う。copay=自己負担額、deductible=免責額、premium=保険料。アメリカで病院に行くと最初に聞かれるのが保険の話。medical bill(医療費)が破産原因No.1の国。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '処方箋出しますね',
        english: [
            'I will write you a prescription.',
            'I am going to prescribe something for the pain.',
            'Let me write you a prescription. Take it to the pharmacy downstairs and they will fill it for you.',
            "Okay, so here is what I am going to do. I am writing you a prescription for an antibiotic and something for the pain. Take the antibiotic twice a day with food, that is important, with food, because it can mess up your stomach otherwise. The pain medication is as needed, so only take it when you actually feel bad. Do not take more than two in a twenty-four hour period. Take this to any pharmacy, they should have everything in stock.",
        ],
        context: 'prescription=処方箋。fill a prescription=処方箋を薬に換える（薬局で）。日本では病院と薬局が分かれているのが普通だけど、アメリカの pharmacy は Walgreens や CVS のような大型ドラッグストアに併設されている。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '何か薬飲んでますか？',
        english: [
            'Are you taking any medication?',
            'Are you currently on any medication? Anything I should know about?',
            'Before I prescribe this, are you taking any other medications right now? Including supplements or vitamins.',
            "I need to ask, are you currently taking any medications? Prescription, over-the-counter, supplements, vitamins, herbal remedies, anything at all. I ask because some medications do not mix well with others and I do not want to prescribe you something that is going to interact badly with what you are already taking. A lot of people forget to mention supplements but those can actually cause interactions too. So anything, even if you think it is not important, please let me know.",
        ],
        context: 'be on medication は「薬を服用中」。日本語の「薬飲んでる？」は英語ではAre you on anything?とも言える。drug interaction=薬の飲み合わせ。サプリも含めて聞くのがアメリカの医者の基本。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '注射されるのが怖い',
        english: [
            'I am afraid of needles.',
            'I really hate needles. Can we do something else?',
            'I know this is silly but I have a serious fear of needles. Is there an alternative?',
            "I need to be completely honest with you. I am absolutely terrified of needles. Like, not just a little uncomfortable. Full-on panic mode. The last time I got a shot I almost passed out in the waiting room and they had not even called my name yet. My palms are sweating just talking about it right now. Is there a pill version? Or a liquid? Or literally anything that does not involve a sharp pointy thing going into my arm?",
        ],
        context: 'needle=注射針。shot=注射（カジュアル）、injection=注射（フォーマル）。fear of needles は英語圏でもよくある。trypanophobia=注射恐怖症。pass out=気絶する。日本語の「注射が怖い」はそのままで通じるけどneedlesが自然。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '具合がよくならない',
        english: [
            'I am not getting better.',
            'It has been a week and I still do not feel better.',
            'I took the medicine you prescribed but honestly, I am not seeing any improvement at all.',
            "I came in last week and you gave me those antibiotics and I have been taking them exactly like you said, twice a day with food, and honestly I do not feel any different. If anything, I think I might feel worse. The cough is still there, the fever comes and goes, and now I have this new thing where my ear feels plugged up. Is the medication not working? Should we try something different? I am getting really frustrated because I have already missed a week of work.",
        ],
        context: 'not getting better は「よくならない」。improvement は「改善」。日本語の「効かない」はit is not working。英語では時間経過を伝えるのが重要。It has been a weekと期間を言わないと医者が判断できない。follow-up=経過観察。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '検査の結果はいつ出ますか？',
        english: [
            'When will I get the results?',
            'How long until the test results come back?',
            'I am a bit nervous about the test. When should I expect the results? Can you call me?',
            "So when do I find out the results? Because I am already stressing about it and it has been literally five minutes since you took the blood. I know I need to be patient but my brain does not work that way. I will spend every single day checking my phone waiting for the call. Can you give me a rough timeline? Like, is it a few days or a few weeks? And will you call me either way, even if everything is normal? I do not want to assume no news is good news.",
        ],
        context: 'test results は「検査結果」。blood work=血液検査、lab results=検査結果(正式)。日本語では「結果いつ出ますか」で済むけど、英語ではcome back(返ってくる)というイメージ。no news is good news=便りがないのはいい知らせ。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: 'お大事に',
        english: [
            'Take care.',
            'Take care of yourself. I hope you feel better soon.',
            'Get well soon. And please, do not come back to work until you are actually better.',
            "Seriously, take care of yourself. Do not try to be a hero and come back before you are ready. I know you think the office cannot survive without you but trust me, it can. We managed just fine the last time you were out. Just focus on getting better. Rest, drink fluids, take your medicine, and binge-watch something good on TV. And text me if you need anything. I can drop off food or whatever. Just get better, okay?",
        ],
        context: '「お大事に」は日本語の完璧なフレーズだけど英語には一語の等価がない。Take care、Get well soon、Feel better を組み合わせて使う。Get well soon はカードに書く定番。Hope you feel better soon が一番近い。',
        character: 'kenji', category: 'request', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 130: ダイエット (Diet Talk)
    // Scene: ケンジがダイエットを宣言。みんなが色々言う居酒屋の夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 130, japanese: 'ダイエット始めたんだ',
        english: [
            'I started a diet.',
            'I am on a diet. Started last week, actually.',
            'I finally decided to get serious about my diet. No more late-night ramen runs.',
            "So I made a decision. I am going on a diet. For real this time. I know I say that every three months and it never lasts more than a week but this time is different. I downloaded this app that tracks everything you eat and it showed me that I was eating like thirty-eight hundred calories a day. Thirty-eight hundred. That is almost double what I should be eating. No wonder my pants do not fit anymore. So yeah, starting today, I am a changed man.",
        ],
        context: 'be on a diet は「ダイエット中」。日本語の「ダイエット」は痩せることだけど、英語の diet は「食事内容」全般。I am on a diet=食事制限中。dietだけだと「食習慣」の意味もある。lose weight=痩せる が「ダイエット」の直訳。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '糖質制限してる',
        english: [
            'I am cutting carbs.',
            'I am doing a low-carb diet. No rice, no bread, no pasta.',
            'I have been on a low-carb diet for two weeks now. It is harder than I thought, especially in Japan.',
            "I am cutting carbs. Which sounds easy until you realize that literally everything I love is carbs. Rice? Carbs. Ramen? Carbs. Beer? Carbs. Bread? Carbs. It is like my entire personality is built around carbohydrates. And the worst part is I live in Japan, the land of rice. Every meal comes with rice. You order a salad and they find a way to put rice in it. I am basically fighting my entire culture here. But I am committed. I think. Ask me again in a week.",
        ],
        context: 'carbs は carbohydrates の略で日常会話ではこっちが主流。cut carbs=糖質を減らす。low-carb=低糖質。keto=ケトジェニック(超低糖質)。日本語の「糖質制限」は英語圏でも大流行中で、cut carbsで通じる。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'リバウンドが怖い',
        english: [
            'I am scared of gaining it back.',
            'My biggest fear is gaining all the weight back after I stop.',
            'Every time I diet, I lose weight and then gain it all back. I am tired of the yo-yo effect.',
            "Here is my problem. I can lose weight. I have done it like six times. That part I am actually good at. The problem is keeping it off. Every single time, I get to my goal weight, celebrate by eating a pizza, and then somehow three months later I am back to where I started. It is like my body has a default setting and it keeps resetting to fat. The yo-yo thing is real. My doctor said the key is lifestyle change, not temporary dieting. Easy for him to say. He is skinny.",
        ],
        context: '「リバウンド」は和製英語。英語では gain the weight back か yo-yo dieting。bounce back は「回復する」で意味が違う。weight fluctuation=体重の変動。英語圏でも yo-yo effect は通じるけど、gain it back のほうが自然。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'カロリー気にしてるの？',
        english: [
            'Are you watching your calories?',
            'Wait, are you counting calories now? Since when?',
            'Are you seriously tracking your calories? You? The guy who eats two bowls of rice with every meal?',
            "Hold on. Are you counting calories? You? The man who once ate an entire large pizza by himself and then asked if there was dessert? I do not believe it. Show me the app. Oh wow, you are actually doing it. And you have been logging everything? Even the beer? Wait, you are still drinking beer while counting calories? That is like running a marathon while smoking. But hey, at least you are trying. That is more than I can say for myself.",
        ],
        context: 'watch your calories は「カロリーに気をつける」。count calories=カロリーを計算する。track calories=カロリーを記録する。日本語の「カロリー気にする」は英語ではwatch(注意する)が一番カジュアルで自然。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '最近太った気がする',
        english: [
            'I think I gained weight.',
            'I feel like I have put on a few pounds recently.',
            'I do not know what happened but my clothes are getting tighter. I definitely gained weight.',
            "I am not going to step on a scale because I do not want to know the actual number but I am pretty sure I have gained weight. My jeans that used to fit perfectly now require a ten-minute struggle to button. And I noticed I am avoiding mirrors, which is never a good sign. I think it happened gradually. Like, one extra beer here, one late-night snack there, and suddenly nothing fits anymore. Gravity is winning the war against my waistline.",
        ],
        context: 'gain weight=太る、lose weight=痩せる、put on weight=太る（イギリス寄り）。日本語の「太った」はgot fatだけど、これは超失礼。I gained a little weight、put on a few pounds と控えめに言うのが英語のマナー。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'お菓子がやめられない',
        english: [
            'I cannot stop eating snacks.',
            'I have a serious snacking problem. I just cannot stop.',
            'I know I should stop eating snacks but every time I try, I last about two hours before I cave.',
            "I have tried everything. I stopped buying snacks. That lasted one day before I walked to the convenience store at midnight like a zombie. I tried replacing snacks with fruit. Fruit is fine but it is not a chocolate bar, you know? My brain knows the difference. I tried the thing where you drink water when you are hungry. All that did was make me a well-hydrated person who still wants chips. My willpower when it comes to snacks is literally zero. Negative zero.",
        ],
        context: 'snacking は「おやつを食べること」。munchies=何か食べたい欲求。sweet tooth=甘いもの好き。cave(in)=負けて食べちゃう。日本語の「間食」は英語ではsnacking。snack attack=急にお菓子が食べたくなること。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'チートデイにしよう',
        english: [
            'Let us have a cheat day.',
            'Today is my cheat day. I can eat whatever I want.',
            'I have been so good all week. I deserve a cheat day. Someone order the fried chicken.',
            "You know what, I have been eating salad and grilled chicken for five days straight. Five days. That is the longest I have ever gone without fried food. I think I have earned a cheat day. And before anyone judges me, cheat days are actually scientifically proven to help with dieting. Something about resetting your metabolism. At least that is what I read on the internet and I choose to believe it because it supports what I want to do. So yes, I am ordering the karaage. And the fries. And maybe a beer.",
        ],
        context: 'cheat day はダイエット用語で「食べていい日」。英語でもそのままcheat dayで通じる。cheat meal=一食だけ好きなものを食べる。日本語でも「チートデイ」は定着しているが、英語発の概念。indulge=好きなものを我慢しないで食べる。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '痩せた？なんかスッキリしたね',
        english: [
            'Did you lose weight? You look good.',
            'Have you lost weight? Something about you looks different. In a good way.',
            'Wait, have you been working out or something? You look slimmer. Your face looks thinner too.',
            "Okay, something is different about you and I cannot figure out what it is. Did you lose weight? Get a haircut? New clothes? No? Then what is it? Because you look good. Like, noticeably good. Not that you looked bad before, I just mean something has changed. Oh, the diet? It is working? See, I told you. How much have you lost? Really? That is impressive. Okay now I feel bad about the three donuts I had for breakfast.",
        ],
        context: '「痩せた？」は英語圏では注意が必要。体重の話は超デリケート。You look great!は安全。Have you lost weight?は相手次第で失礼になることも。You look different は無難。日本語では褒め言葉でも英語圏では body shaming になりかねない。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '食べ過ぎた...',
        english: [
            'I ate too much.',
            'I totally overate. I feel so full I might explode.',
            'I cannot believe I ate all of that. I am so stuffed I can barely move.',
            "Why did nobody stop me? I ate like three people's worth of food. I started with the appetizer, then the main, then I said I would just have a bite of dessert and ended up eating the whole thing. My stomach is so full right now that I can feel my heartbeat in my belly. This is the opposite of dieting. This is anti-dieting. I have single-handedly undone an entire week of progress in one meal. I am disgusted with myself but also that cake was incredible.",
        ],
        context: 'stuffed は「お腹パンパン」のカジュアル表現。full は普通の「お腹いっぱい」。bloated=膨れた(不快感あり)。food coma=食べ過ぎて眠くなること。日本語の「食べ過ぎた」は反省込みだけど、英語のI ate too muchは事実報告に近い。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '体重計乗りたくない',
        english: [
            'I do not want to weigh myself.',
            'I refuse to step on a scale right now. Ignorance is bliss.',
            'Do not even mention the scale. I am in denial and I am perfectly happy staying here.',
            "The scale and I are not on speaking terms right now. We had a disagreement last week where it told me a number I did not want to hear and I decided that was the last time. From now on, I am judging my progress by how my clothes fit. If my jeans button, I am doing great. If they do not, I will just buy bigger jeans. Problem solved. The number on the scale is just a number anyway. It does not define me. That is what I tell myself while eating ice cream.",
        ],
        context: 'scale は「体重計」。step on a scale=体重計に乗る。weigh yourself=体重を測る。日本語の「体重計」は英語ではscale一語。bathroom scale=家庭用体重計。ignorance is bliss=知らぬが仏。',
        character: 'lisa', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 131: 運動習慣 (Exercise Habits)
    // Scene: マスターがジム通いを始めたと告白。常連たちの運動事情トーク
    // ────────────────────────────────────────────────────

    {
        daySlot: 131, japanese: 'ジム通い始めた',
        english: [
            'I joined a gym.',
            'I finally signed up for a gym membership. About time, right?',
            'So I actually joined a gym last week. First time in my life. I have no idea what I am doing.',
            "Okay, do not laugh. I joined a gym. Me. Fifty-eight years old and I have never set foot in a gym in my entire life. The closest I have come to exercise is lifting beer glasses every night. But my doctor said my blood pressure is getting too high and I need to start moving more. So I went in, signed up, and just stood there in the middle of the gym floor surrounded by all these machines I do not understand. I felt like a caveman who had been unfrozen and dropped into the future.",
        ],
        context: 'join a gym は「ジムに入会する」。sign up for=登録する。gym membership=ジムの会員権。日本語では「ジムに通い始めた」だけど、英語ではjoin(入会する行為)とgo to the gym(通う行為)を分ける。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '筋トレしてる？',
        english: [
            'Do you work out?',
            'Do you lift weights? You look like you have been working out.',
            'Are you into weight training? I have been thinking about starting but I do not know where to begin.',
            "Have you been working out? Because your arms look different. Like, in a good way. How long have you been at it? And what do you do? Like, is it all weights or do you do cardio too? I want to start but every time I walk into the weight section of the gym I feel completely lost. Everyone else seems to know exactly what they are doing and I am just standing there trying to figure out which end of the dumbbell to hold. Is there a class for absolute beginners?",
        ],
        context: 'work out は「運動する・トレーニングする」。lift weights=ウエイトを上げる。hit the gym=ジムに行く(スラング)。日本語の「筋トレ」はweight training だけど、カジュアルにはlift(ing)だけでも通じる。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '走るの苦手',
        english: [
            'I am not a runner.',
            'Running is not my thing. I get out of breath way too fast.',
            'I tried running last week and I lasted about three minutes before I thought I was going to die.',
            "People who say they love running are lying. Nobody loves running. You know what running is? It is your body suffering while your brain screams at you to stop. I tried the couch to five K program. Day one, run for sixty seconds and walk for ninety. Sixty seconds. I could not even do that. I was gasping like a fish out of water after thirty seconds. My lungs were on fire. My knees were making noises I have never heard before. And the worst part is a seventy-year-old grandmother passed me.",
        ],
        context: 'not my thing は「自分には合わない」「苦手」。日本語の「苦手」は英語ではnot good at(下手)、not my thing(好みじゃない)、I cannot stand(大嫌い)で使い分ける。out of breath=息切れ。cardio=有酸素運動。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '毎朝ストレッチしてる',
        english: [
            'I stretch every morning.',
            'I do a quick stretching routine every morning. It really helps.',
            'The first thing I do when I wake up is stretch for about ten minutes. It makes a huge difference.',
            "I have been doing this morning stretching routine for about six months now and it has completely changed my life. I know that sounds dramatic but I am not exaggerating. Before, I used to wake up feeling stiff and achy and it would take me like an hour to feel normal. Now I roll out of bed, stretch for ten minutes, and I feel like a new person. My back pain is basically gone. My posture is better. I can actually touch my toes for the first time since high school. Ten minutes. That is all it takes.",
        ],
        context: 'stretch は「ストレッチする」。stretching routine=ストレッチの習慣。warm up=ウォームアップ。cool down=クールダウン。日本語の「ストレッチ」はそのまま通じるけど、英語ではflexibility(柔軟性)と結びつけて話すことが多い。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '筋肉痛がヤバい',
        english: [
            'I am so sore.',
            'My muscles are killing me. I can barely walk.',
            'I overdid it at the gym yesterday and now I cannot go up stairs without crying.',
            "I am in so much pain right now. I went to the gym yesterday and the trainer had me do all these squats and lunges and I thought I was fine. I was walking around like everything was normal. And then I woke up this morning and my legs just said no. Getting out of bed was a five-minute operation. Going to the bathroom was an expedition. I had to hold onto the walls like I was on a ship in a storm. They call it DOMS. Delayed onset muscle soreness. I call it regret.",
        ],
        context: 'sore は「筋肉痛の」。日本語の「筋肉痛」は英語では muscle soreness。DOMS(Delayed Onset Muscle Soreness)は翌日以降に来る筋肉痛の正式名称。be sore は「痛い」全般にも使えるけど、運動後の文脈では筋肉痛の意味になる。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '最近サボってる',
        english: [
            'I have been slacking off.',
            'I have not been to the gym in weeks. I keep making excuses.',
            'I was doing so well for a while but lately I have been skipping workouts left and right.',
            "I have not worked out in three weeks. Three. Weeks. It started with one skip because I was tired. Then I skipped the next day because I thought well, I already skipped yesterday so what is one more day. And then it just snowballed. Now it has been three weeks and the thought of going back feels impossible. Like, I would have to start from scratch. My gym bag is just sitting in the corner judging me. Every time I walk past it I feel guilty but not guilty enough to actually go.",
        ],
        context: 'slack off は「サボる」。skip=休む(一回)。fall off the wagon=続けていたことをやめちゃう。日本語の「サボる」はフランス語のsabotage由来だけど、英語のslack offはもっとゆるい「怠ける」のニュアンス。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '歩くだけでも違うよ',
        english: [
            'Even walking helps.',
            'You do not have to run. Just walking makes a difference.',
            'Seriously, even a thirty-minute walk every day can do wonders for your health.',
            "Listen, you do not have to be a gym rat or a marathon runner to be healthy. Just walk. That is it. Walk to the station instead of taking the bus. Take the stairs instead of the elevator. Walk around the block after dinner. My doctor told me that ten thousand steps a day is the magic number but honestly even five thousand is better than sitting on your couch all day. The bar is literally on the floor. Just stand up and move. Your body will thank you.",
        ],
        context: 'make a difference は「効果がある」。do wonders=すごい効果がある。日本語の「歩くだけでも違う」はmake a differenceが完璧な訳。gym rat=ジム通いの人。couch potato=運動しない人。10,000 steps は英語圏でも健康の基準。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: 'ヨガやってみたい',
        english: [
            'I want to try yoga.',
            'I have been thinking about trying yoga. Is it hard?',
            'Everyone keeps telling me to try yoga. They say it is great for stress and flexibility.',
            "So I have been hearing a lot about yoga lately and I am kind of curious. But I am also kind of terrified. I am the least flexible person alive. I cannot touch my toes. I cannot sit cross-legged for more than thirty seconds. My hamstrings are so tight that bending over to tie my shoes is a whole production. But people keep saying yoga changed their life and they look so calm and zen all the time. Is that the yoga or are calm people just attracted to yoga? Either way, I want to try it. Is there a class for people who cannot bend?",
        ],
        context: 'try yoga は「ヨガを試す」。get into yoga=ヨガにハマる。flexible=体が柔らかい。stiff=体が硬い。日本語の「体硬い」は英語ではI am not flexible。inflexible よりnot flexibleの方がカジュアルで自然。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '体力落ちたな...',
        english: [
            'I am out of shape.',
            'I am so out of shape. I used to be able to run without dying.',
            'Man, when did I get this out of shape? I used to play soccer every weekend in my twenties.',
            "I climbed two flights of stairs today and I was breathing like I had just run a marathon. Two flights. Not twenty. Two. I remember when I used to play soccer for ninety minutes straight without stopping. Now I get winded walking to the convenience store. Where did my stamina go? Is this what aging is? Your body just slowly gives up on you one system at a time? My knees creak, my back aches, and I need a nap after grocery shopping. I am forty-five, not eighty-five. What happened?",
        ],
        context: 'out of shape は「体力が落ちた・体型が崩れた」。in shape=健康的。get in shape=体を鍛える。stamina=スタミナ。get winded=息が切れる。日本語の「体力落ちた」は直訳しにくいけど、out of shapeが一番近い。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '一緒にジム行かない？',
        english: [
            'Want to go to the gym with me?',
            'Hey, do you want to be my gym buddy? I need someone to go with.',
            'I always quit when I go alone. Would you be down to go together? We can motivate each other.',
            "Okay, I have a proposition. Come to the gym with me. Before you say no, hear me out. Every time I go alone I last about two weeks before I quit. But I read that people who have a workout partner are like seventy percent more likely to stick with it. You do not have to be good at it. I am terrible. We can be terrible together. We can stand next to each other looking confused at the machines. It will be fun. Well, not fun exactly, but less miserable than going alone.",
        ],
        context: 'gym buddy は「一緒にジムに行く人」。workout partner=トレーニング仲間。be down to=〜する気がある(カジュアル)。accountability partner=サボらないように見張り合う相手。英語圏ではbuddy systemでモチベーションを保つ文化がある。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 132: 睡眠 (Sleep Talk)
    // Scene: みんなが睡眠の質について語り始める。現代人の永遠の悩み
    // ────────────────────────────────────────────────────

    {
        daySlot: 132, japanese: '全然寝れなかった',
        english: [
            'I could not sleep at all.',
            'I barely slept last night. Maybe two hours at most.',
            'I was up all night tossing and turning. I do not know what is wrong with me.',
            "I literally did not sleep. I got into bed at eleven, which is early for me, and I just laid there staring at the ceiling for hours. My brain would not turn off. I kept thinking about work and then I started worrying about not sleeping which made it even harder to sleep. It is like this cruel cycle. The more you try to sleep the more awake you become. I finally dozed off around four and then my alarm went off at six. Two hours. That is not sleep, that is a nap.",
        ],
        context: 'tossing and turning は「寝返りを繰り返す」。直訳は「投げて回って」だけど、眠れない夜の定番表現。doze off=うとうとする。insomnia=不眠症。日本語の「寝れなかった」は英語ではcould not sleep、could not fall asleepの両方OK。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '寝坊した！',
        english: [
            'I overslept!',
            'I overslept this morning. My alarm did not go off.',
            'I cannot believe I overslept. I set three alarms and somehow slept through all of them.',
            "I am so sorry I am late. I overslept. And before you ask, yes I set an alarm. I actually set three alarms. One on my phone, one on my old alarm clock, and I even asked my roommate to wake me up. Somehow I slept through all of them. My phone says the alarm went off at six thirty but I have zero memory of it. My roommate says she knocked on my door and I apparently yelled I am up and then immediately went back to sleep. I am a disaster of a human being.",
        ],
        context: 'oversleep は「寝過ごす」。sleep through the alarm=アラームに気づかず寝続ける。hit snooze=スヌーズを押す。sleep in=ゆっくり寝る（意図的）。oversleepは「事故」、sleep inは「幸せ」。この違いが日本語にはない。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: 'いびきがうるさいって言われた',
        english: [
            'I was told I snore.',
            'My wife says I snore really loud. I do not believe her.',
            'Apparently I snore like a freight train. My partner recorded me and it is honestly terrifying.',
            "So my wife has been complaining about my snoring for years and I always thought she was exaggerating. I mean, how bad could it be? Then last week she recorded me. She played it back and I genuinely thought it was a construction site. That noise was coming from me? It sounded like a chainsaw fighting a lawnmower. I could not believe it. She said she has been sleeping with earplugs for two years. Two years. And she never told me. I felt so bad. I am looking into those anti-snoring things now.",
        ],
        context: 'snore は「いびきをかく」。日本語では「いびき」は名詞だけど、英語では snore が動詞としても使える。sleep apnea=睡眠時無呼吸症候群。heavy snorer=いびきがひどい人。snoring problem は英語圏でも夫婦喧嘩の原因トップクラス。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: 'スマホ見ちゃって寝れない',
        english: [
            'My phone keeps me up.',
            'I stay up way too late scrolling through my phone.',
            'I know I should put my phone down before bed but I always end up scrolling for hours.',
            "Every night I tell myself tonight I am going to bed early. No phone after ten. And every night at one a.m. I am lying in bed watching random videos about people making pottery or ranking the best convenience store sandwiches in Japan. I do not even care about pottery. My brain just latches onto anything that is on the screen and suddenly two hours have vanished. They call it doom scrolling and it is a perfect name because it is literally destroying my sleep and I cannot stop.",
        ],
        context: 'doom scrolling は「目的もなくスマホをスクロールし続ける」こと。2020年頃から定着した新語。screen time=スクリーンを見ている時間。blue light=ブルーライト。put down your phone=スマホを置く。英語圏でも同じ問題が社会問題化している。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '昼寝したい',
        english: [
            'I want to take a nap.',
            'I could really use a nap right now. Even twenty minutes would help.',
            'I am fighting to keep my eyes open. If I do not nap soon I am going to pass out at my desk.',
            "I am running on two hours of sleep and three cups of coffee and my body is shutting down. I can feel it. My eyes are getting heavier, my brain is slowing down, and I keep rereading the same email over and over without actually processing any of it. I need a power nap so badly. Even fifteen minutes. I read that napping for twenty minutes is actually more effective than an extra hour of sleep at night. Is that true? I do not know but I am willing to use any excuse to close my eyes right now.",
        ],
        context: 'power nap は「短い昼寝」。15-20分が理想的とされる。cat nap=ちょっとうとうとする。siesta はスペイン語由来の昼寝。日本語の「昼寝」は英語では nap が最も自然。afternoon nap と言わなくても nap だけでOK。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '夜型なんだよね',
        english: [
            'I am a night owl.',
            'I have always been a night person. I do my best work after midnight.',
            'I cannot function before noon but once the sun goes down I am suddenly full of energy.',
            "I am convinced my body runs on a different timezone from the rest of the world. Everyone says the early bird gets the worm but I am not interested in worms. I am interested in the creative genius that happens at two a.m. when the world is quiet and my brain finally turns on. Every productive thing I have ever done happened after midnight. Mornings are torture. My alarm goes off and my body treats it like a personal attack. I am not lazy, I am just nocturnal. Wrong species, wrong planet.",
        ],
        context: 'night owl は「夜型の人」。early bird=朝型の人。morning person=朝型。The early bird gets the worm=早起きは三文の得。日本語の「夜型」は英語では night owl か night person。chronotype=体内時計のタイプ（科学用語）。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '最近よく夢を見る',
        english: [
            'I have been dreaming a lot.',
            'I keep having weird dreams lately. Every single night.',
            'My dreams have been so vivid recently. I wake up exhausted because it feels like I lived another life.',
            "I do not know what is going on but my dreams lately have been insane. Not nightmares exactly, just really vivid and detailed and bizarre. Last night I dreamed I was teaching English to a room full of penguins in a swimming pool and it felt completely normal in the dream. I woke up confused about where I was and which reality was real. They say vivid dreams mean you are stressed or not sleeping deeply enough. Either way, I feel like I need sleep from my sleep.",
        ],
        context: 'vivid dream は「鮮明な夢」。nightmare=悪夢。lucid dream=明晰夢（夢の中で夢と気づいている）。daydream=空想。日本語の「夢を見る」は英語では have a dream か dream。see a dream は日本語英語で、英語ではhaveを使う。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '目覚ましが鳴らなかった',
        english: [
            'My alarm did not go off.',
            'I swear I set my alarm but it never went off.',
            'My alarm completely failed me this morning. Either that or I turned it off in my sleep.',
            "I am blaming technology for today. My alarm did not go off. Or at least I do not think it did. The thing is, I might have turned it off in my sleep without realizing it. I have done that before. Half-asleep me is basically a different person with completely different priorities than awake me. Awake me wants to be productive and get to work on time. Half-asleep me wants nothing but silence and five more minutes that always turn into two hours. We need to have a serious talk, me and half-asleep me.",
        ],
        context: 'go off は「鳴る」（アラーム）。ring はどちらかというと電話。set an alarm=アラームをセットする。hit snooze=スヌーズを押す。snooze button=スヌーズボタン。日本語の「鳴る」は英語ではgo offが自然。ringだとやや古い。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '寝る前にストレッチすると違う',
        english: [
            'Stretching before bed helps.',
            'I started stretching before bed and I fall asleep so much faster now.',
            'Try doing a light stretch before bed. It sounds silly but it genuinely improved my sleep quality.',
            "You know what changed my sleep completely? Stretching. I know it sounds like one of those boring health tips that everyone ignores but I am serious. I started doing this ten-minute stretching routine before bed about a month ago and the difference is unreal. I used to lie awake for an hour, now I am out within fifteen minutes. I think it relaxes your muscles enough that your body just gives in. My shoulders used to be so tense I could crack them like knuckles. Now they actually feel normal when I lie down.",
        ],
        context: 'sleep quality は「睡眠の質」。bedtime routine=寝る前のルーティン。wind down=リラックスして寝る準備をする。日本語の「寝つきが良くなった」はI fall asleep faster now。sleep hygiene=睡眠衛生（良い睡眠のための習慣）は最近の流行語。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '週末は寝だめする',
        english: [
            'I sleep in on weekends.',
            'I always sleep in on weekends. It is the only time I can catch up on sleep.',
            'Saturdays are my recovery day. I sleep until noon and I refuse to feel guilty about it.',
            "My weekend routine is very simple. Friday night, I set zero alarms. Saturday morning, my body decides when it is done sleeping. Sometimes that is nine a.m. Sometimes that is one p.m. I do not care. I have earned those extra hours. My body has been running on five hours of sleep all week and the weekend is when I collect my debt. I know doctors say you cannot actually catch up on sleep but my body disagrees. That first Saturday morning when you wake up naturally with no alarm? That is what heaven feels like.",
        ],
        context: 'sleep in は「朝ゆっくり寝る（意図的）」。catch up on sleep=寝だめ。sleep debt=睡眠負債。科学的には寝だめは効果がないと言われているが、英語でもcatch up on sleepは普通に使う。日本語の「寝だめ」はsleep in が一番近い。',
        character: 'master', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 133: ストレス (Stress)
    // Scene: 仕事と生活のストレスについて本音トーク。マスターが優しく聞く夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 133, japanese: 'ストレスやばい',
        english: [
            'I am so stressed.',
            'My stress level is through the roof right now.',
            'I am completely stressed out. Work, life, everything is piling up at the same time.',
            "I do not even know where to start. Work is insane. My boss wants three projects done by Friday. My apartment lease is expiring and I have to find a new place. My mom keeps calling asking when I am getting married. My car is making a weird noise that I cannot afford to fix. And I ran out of coffee this morning which honestly might be the thing that finally breaks me. Everything is happening at once and I feel like I am drowning. Is this what a breakdown feels like? Because I think I might be having one.",
        ],
        context: 'stressed out は「ストレスでやられている」。through the roof=限界突破。overwhelmed=圧倒されている。burnt out=燃え尽きた。日本語の「ストレスやばい」は英語ではstressed out が一番カジュアルで近い。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '息抜きが必要',
        english: [
            'I need a break.',
            'I seriously need to take a break and just breathe.',
            'If I do not get some time off soon I am going to lose it. I need to recharge.',
            "I need a break. Not a weekend. Not a day off. A real break. Like, two weeks on a beach somewhere with no phone, no email, no deadlines, and no one asking me for anything. Just me, the ocean, and a stack of books I have been meaning to read for three years. Is that too much to ask? I feel like my brain has been running at full speed for months and it is starting to overheat. You know how your laptop gets hot and the fan starts making noise? That is me. I am the laptop. My fan is broken.",
        ],
        context: 'take a break は「休憩する」。recharge は「充電する」で、人間にも使う。decompress=リラックスする(圧力を抜く)。unwind=くつろぐ。日本語の「息抜き」は直訳できないけど、breather が一番近い。I need a breather。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '愚痴聞いてくれる？',
        english: [
            'Can I vent for a minute?',
            'Do you mind if I vent? I just need to get this off my chest.',
            'I know nobody wants to hear someone complain but I really need to vent. Just for five minutes.',
            "Can I vent? I do not need advice or solutions or someone to tell me it is going to be okay. I just need someone to sit there and listen while I complain about everything for the next ten minutes. Is that cool? Sometimes you just need to let it all out, you know? Like, I keep everything bottled up all week being professional and polite and then I come here and I need to just release all of it before it eats me alive. Think of it as emotional garbage collection. You are my recycling bin tonight.",
        ],
        context: 'vent は「愚痴を言う・不満を吐き出す」。get it off my chest=胸のつかえを取る。bottled up=溜め込んでいる。日本語の「愚痴」は英語ではvent、complain、gripeなど。ventは「吐き出す」で最もカジュアルで前向き。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '考えすぎちゃう',
        english: [
            'I overthink everything.',
            'I know I overthink things but I cannot help it.',
            'My problem is I analyze everything to death. I cannot just let things go.',
            "My brain does not have an off switch. I will be lying in bed at midnight replaying a conversation I had at lunch wondering if I said the wrong thing. Did I come across as rude? Was my joke funny or did they just pity laugh? Should I have said something different? And then I start thinking about conversations from three years ago that nobody else remembers. My brain is like a search engine that only returns embarrassing results. I google something innocent and it brings up every awkward moment I have ever had. I need a firewall for my own thoughts.",
        ],
        context: 'overthink は「考えすぎる」。overanalyze=分析しすぎる。spiral=思考がぐるぐるする。ruminate=反芻する（心理学用語）。日本語の「考えすぎ」は英語ではoverthinkingが定着している。get in your own head=自分で自分を追い込む。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '気分転換に何かしたい',
        english: [
            'I need to do something to clear my head.',
            'I want to do something fun to take my mind off things.',
            'I need a change of pace. Something to break this cycle of work, eat, sleep, repeat.',
            "I feel like I have been stuck in the same loop for months. Wake up, work, come home, stare at my phone, sleep. Repeat. I need to shake things up. I do not know what exactly but something different. Maybe I should take a cooking class. Or go hiking. Or learn to play the guitar. Or adopt a cat. I just need something that has absolutely nothing to do with my job to remind me that I am a human being and not just a work machine. What do you guys do when you feel stuck?",
        ],
        context: 'change of pace は「気分転換」。take my mind off things=嫌なことを忘れる。shake things up=変化をつける。日本語の「気分転換」は英語で一語では表現できない。change of pace、change of scenery(場所を変える)、switch it up(やり方を変える)を使い分ける。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '仕事辞めたい...',
        english: [
            'I want to quit my job.',
            'Honestly? I have been thinking about quitting. I am that fed up.',
            'I fantasize about quitting at least three times a day. The only thing stopping me is rent.',
            "I am not going to lie, I have been thinking about quitting. Not in the dramatic throw your papers in the air and walk out way. More in the quiet, staring at job listings at midnight, updating my resume just in case way. I do not hate my job exactly. I hate what it has turned me into. I used to be fun. I used to have hobbies. Now all I do is work and worry about work and dream about work. That is not living. But then I look at my rent and my bills and I think okay, one more month. And I have been saying that for two years.",
        ],
        context: 'quit my job は「仕事を辞める」。resign はフォーマル。hand in my notice=辞表を出す。fed up=もう限界。burn out=燃え尽きる。日本語の「辞めたい」は願望だけど、英語のI want to quitはかなり強い意思表示に聞こえる。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '深呼吸して',
        english: [
            'Take a deep breath.',
            'Hey, just take a deep breath. It is going to be okay.',
            'Hold on. Stop for a second. Take a deep breath in and slowly let it out. Better?',
            "Hey hey hey, slow down. You are spiraling and I can see it on your face. Let us do this together. Deep breath in through your nose. Hold it. Now let it out slowly through your mouth. One more time. Good. Now, I know everything feels like it is falling apart right now but take it one thing at a time. You cannot solve all your problems tonight. Pick one. The most urgent one. Focus on that. The rest can wait. And in the meantime, you have this bar and you have us. That counts for something, right?",
        ],
        context: 'Take a deep breath は「深呼吸して」。breathe=呼吸する。calm down は場合によっては逆効果（「落ち着けって言われると余計イラつく」問題）。英語圏ではtake a deep breathの方がcalm downより寄り添い感がある。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '最近イライラしやすい',
        english: [
            'I have been irritable lately.',
            'I keep snapping at people for no reason. I think I need help.',
            'I have been so on edge lately. The smallest things set me off and I feel bad about it.',
            "I yelled at a stranger yesterday because they were walking too slowly. On a sidewalk. In public. Who does that? I do, apparently. I have been so irritable lately that everything annoys me. The way my coworker chews, the sound of typing, people talking too loud on the train. Things that never used to bother me are making me want to scream. I know it is not about the chewing or the walking. It is about everything else. But I am taking it out on innocent bystanders and I feel terrible about it.",
        ],
        context: 'irritable は「イライラしやすい」。on edge=神経が張り詰めている。snap at=八つ当たりする。short-tempered=短気。日本語の「イライラ」は擬態語で英語にはない。frustrated、annoyed、irritated で使い分けるけど、どれも「イライラ」の一部しかカバーしない。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '趣味の時間がない',
        english: [
            'I have no time for hobbies.',
            'I used to have hobbies but now I literally have no time for anything.',
            'When is the last time I did something just for fun? I cannot even remember. That is depressing.',
            "Do you guys remember when we used to have free time? Like actual free time where you could just do whatever you wanted without feeling guilty about not doing something else? I used to play guitar. I used to read. I used to watch movies. Now my free time is basically the thirty minutes between getting home and passing out on the couch. And even those thirty minutes I spend scrolling through my phone. I do not even enjoy it. I just do not have the energy to do anything else. When did life become just work and sleep?",
        ],
        context: 'hobby は「趣味」だけど、英語のhobbyはやや堅い。what do you do for fun?=趣味は何？のカジュアル版。pastime=暇つぶし。side project=副業的な趣味。日本語の「趣味」ほど気軽に使える一語が英語にはない。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: 'もう限界かも',
        english: [
            'I think I have reached my limit.',
            'I am at my breaking point. I cannot take much more of this.',
            'Something has to change because I am hitting a wall and I do not know how much longer I can keep going.',
            "I think I am at my limit. And not in the dramatic movie way where the hero dramatically collapses and then gets back up stronger. In the real-life way where you just feel empty and exhausted and you cannot remember the last time you felt genuinely happy. I keep pushing through because that is what you are supposed to do, right? Keep going. Be strong. Do not complain. But what if pushing through is the problem? What if the brave thing is actually admitting you cannot do this anymore and asking for help? Is that weakness or is that wisdom?",
        ],
        context: 'breaking point は「限界点」。at my limit=限界。hit a wall=壁にぶつかる。burn out=燃え尽きる。日本語の「限界」は英語ではbreaking point が最もドラマチック。reach my limit はそのまま通じるが、hit a wall の方が自然に使われる。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 134: 美容 (Beauty and Skincare)
    // Scene: ミナが新しいスキンケアの話を始める。リサも参戦して美容トーク
    // ────────────────────────────────────────────────────

    {
        daySlot: 134, japanese: '肌荒れがひどい',
        english: [
            'My skin is breaking out.',
            'My skin has been so bad lately. I keep getting breakouts.',
            'I do not know what happened but my skin just freaked out. I have breakouts everywhere.',
            "My skin has declared war on me. I woke up three days ago with this massive breakout on my chin and it has been spreading ever since. I have not changed anything. Same skincare routine, same diet, same everything. But my face decided it was time for chaos. I look like a teenager going through puberty. I am twenty-four. This should not be happening anymore. I have tried every product in my bathroom and nothing is working. If anything, I think I made it worse by putting too much stuff on it.",
        ],
        context: 'break out は「肌荒れする・吹き出物ができる」。breakout=吹き出物。acne=ニキビ（医学用語）。pimple=ニキビ（日常語）。日本語の「肌荒れ」は英語ではbreaking outが最もカジュアル。skin issues は肌トラブル全般。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '日焼け止め塗った？',
        english: [
            'Did you put on sunscreen?',
            'Are you wearing sunscreen? The sun is really strong today.',
            'Please tell me you are wearing sunscreen. UV damage is no joke, even on cloudy days.',
            "Wait, you are going outside without sunscreen? In August? Are you trying to turn into a leather bag? I am not being dramatic, UV damage is cumulative. Every single time you go out without sunscreen, it adds up. And it is not just about sunburn, it is about wrinkles and dark spots and skin cancer. I wear SPF fifty every single day. Rain or shine. Winter or summer. My dermatologist said sunscreen is the number one anti-aging product and it costs like ten dollars. Just put it on. Please.",
        ],
        context: 'sunscreen=日焼け止め。SPF=Sun Protection Factor。日本語の「日焼け止め」はsunscreen、sunblock どちらでもOK。apply sunscreen=塗る。reapply=塗り直す。日本は美白文化だけど、英語圏では日焼け止めは「健康のため」という位置づけ。',
        character: 'lisa', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'スキンケアのルーティン教えて',
        english: [
            'What is your skincare routine?',
            'Your skin looks amazing. What is your skincare routine?',
            'Okay, I need your entire skincare routine. Step by step. My skin needs help.',
            "Your skin is literally glowing and I need to know everything you do. And I mean everything. What do you wash your face with? What order do you apply stuff? How many products are we talking? Morning routine and night routine. I have been using the same face wash since college and I am starting to think that might be the problem. My skincare routine is basically wash face and hope for the best. I know I need to do more but there are so many products out there I do not even know where to start.",
        ],
        context: 'skincare routine は「スキンケアのルーティン」。英語でもroutineはそのまま使う。cleanser=洗顔料、toner=化粧水、moisturizer=乳液/保湿剤、serum=美容液。日本語の「化粧水」は英語ではtoner が近いが、概念が微妙に違う。',
        character: 'yuki', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '髪切りたいな',
        english: [
            'I want to get a haircut.',
            'I need a haircut so bad. My hair is getting out of control.',
            'I have not had a haircut in three months and I am starting to look like a wild animal.',
            "I need to find a hairdresser. My hair has reached the point where I cannot do anything with it. It is too long to style and too short to tie back. I am in hair limbo. The problem is I am terrible at explaining what I want. Every time I go to a salon, the stylist asks me what I want and I just say shorter, I guess? And then they ask how short and I panic. I do not know the terminology. What is a layer? What is a bob? I just want to look like a functioning adult. Is that a style?",
        ],
        context: 'get a haircut は「髪を切ってもらう」。cut my hair は「自分で切る」にも聞こえるので注意。trim=少し整える、layer=段を入れる、bangs=前髪（アメリカ英語）、fringe=前髪（イギリス英語）。美容院=salon/hair salon。barber=床屋（主に男性向け）。',
        character: 'takeshi', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'この化粧水いいよ',
        english: [
            'This toner is really good.',
            'You should try this toner. It has been a game changer for my skin.',
            'I switched to this toner last month and my skin has never been better. It is worth every penny.',
            "Okay, you have to try this toner. I know everyone says that about every product but I am serious. I tried like twenty different toners before I found this one and it is the only one that actually made a difference. My dry patches are gone, my skin feels softer, and I swear my pores look smaller. It is a Japanese brand too, which makes sense because Japanese skincare is on another level. The ingredients list is actually readable, no weird chemicals. It is not cheap but honestly, good skincare is an investment.",
        ],
        context: 'toner は英語で「化粧水」に最も近い。ただし英語のtonerは「汚れを落とす」イメージが強く、日本語の「化粧水」の「潤す」ニュアンスとはズレがある。essence=美容液（韓国コスメ影響）。game changer=すごく良い（口語）。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'クマがひどい',
        english: [
            'I have dark circles.',
            'Look at these dark circles under my eyes. I look like a raccoon.',
            'My dark circles are so bad that people keep asking me if I am sick. I just need sleep.',
            "My dark circles have dark circles at this point. I looked in the mirror this morning and genuinely scared myself. I look like I have not slept in a month, which is only slightly exaggerated. I have tried concealer, eye cream, cold spoons, cucumber slices, tea bags, everything the internet told me to do. Nothing works. My coworker asked me today if I was feeling okay and I said yes and she said are you sure because you do not look okay. Thanks. That is exactly what I needed to hear.",
        ],
        context: 'dark circles は「目のクマ」。bags under your eyes=目の下のたるみ。puffy eyes=腫れぼったい目。concealer=コンシーラー。日本語の「クマ」は動物の「熊」と同じ字だけど、英語ではdark circlesで全然違うイメージ。',
        character: 'kenji', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '乾燥肌なんだよね',
        english: [
            'I have dry skin.',
            'My skin is so dry, especially in winter. It gets flaky and itchy.',
            'I have always had dry skin. I go through moisturizer like water. Nothing seems to keep it hydrated.',
            "My skin type is what I call desert mode. It is dry all year round but in winter it reaches a whole new level. I am talking cracked, flaky, itchy, painful dry. My hands look like I am ninety years old. I have tried every moisturizer on the market and my skin just drinks it up and asks for more. Like, I will apply a thick layer of cream and thirty minutes later it is bone dry again. My dermatologist said I need to moisturize while my skin is still damp from the shower. That helps a little but my skin is basically a sponge with no limits.",
        ],
        context: 'dry skin=乾燥肌。oily skin=脂性肌。combination skin=混合肌。sensitive skin=敏感肌。moisturize=保湿する。hydrate=水分を与える。日本語の「乾燥肌」は英語でdry skinでそのまま通じる。flaky=皮がめくれる。',
        character: 'lisa', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'ネイル変えたの気づいた？',
        english: [
            'Did you notice my new nails?',
            'Hey, did you notice I got my nails done? I love this color.',
            'Nobody has noticed my new nails all day and I am personally offended. Look! What do you think?',
            "Okay, I got my nails done yesterday. I have been waving my hands around all day waiting for someone to notice and not a single person has said anything. Not one. I spent two hours at the salon and like eight thousand yen and nobody even looked at my hands. So I am just going to tell you directly. Look at my nails. They are gorgeous. The color is called dusty rose and the design took forever because I wanted these tiny little gold flakes on the ring finger. Cute, right? Please validate my life choices.",
        ],
        context: 'get my nails done は「ネイルをしてもらう」。manicure=手のネイル、pedicure=足のネイル。nail salon=ネイルサロン。gel nails=ジェルネイル。日本語の「ネイル」はそのまま通じるけど、英語ではnails(爪)かnail art(ネイルアート)。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'エステ行きたい',
        english: [
            'I want to go to a spa.',
            'I could really use a spa day. A facial and a massage would be heaven.',
            'I have been so stressed lately. I think I deserve a full spa day. Facial, massage, the works.',
            "I need a spa day. A real one. Not the kind where you put a face mask on at home and call it self-care. I mean a full day at an actual spa where someone pampers me from head to toe. Facial, body scrub, hot stone massage, maybe a seaweed wrap or whatever those fancy treatments are. I want to walk out feeling like a completely different person. Is that expensive? Probably. Do I care? Not today. Today I am investing in my mental health and my mental health requires someone rubbing essential oils on my shoulders.",
        ],
        context: '日本語の「エステ」は和製英語。英語ではspa、beauty salon、aesthetic clinic で意味が分かれる。spa=リラクゼーション、beauty salon=美容施術、dermatologist=皮膚科。facial=フェイシャルエステ。pamper=甘やかす。the works=全部セット。',
        character: 'yuki', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '最近白髪増えた',
        english: [
            'I am getting gray hairs.',
            'I keep finding gray hairs. I pulled out three this morning.',
            'I am officially getting gray hair and I am not sure how I feel about it. Should I dye it?',
            "I found my first gray hair when I was thirty and I thought it was a fluke. Plucked it out and forgot about it. Then I found three more. Then ten. Now I have lost count. My temples are basically silver at this point. My barber asked me if I want to dye it and I could not decide. Part of me thinks gray hair looks distinguished. George Clooney pulls it off. But I am not George Clooney. I am a forty-five year old man with gray hair and a dad bod. Distinguished is probably not the word people would use to describe me.",
        ],
        context: 'gray hair は「白髪」。go gray=白髪になる。dye your hair=髪を染める。silver fox=白髪がかっこいい男性。distinguished=品がある（白髪を褒める時に使う）。日本語の「白髪」は英語ではgray(灰色)。white hairとは普通言わない。',
        character: 'kenji', category: 'shopping', month: '2026-08',
    },
];

// ============================================================
// DAY THEMES -- MONTH 5 (2026-08) -- WEEK 18
// ============================================================

export const MONTH5_W18_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    128: {
        title: '体調が悪い', titleEn: 'Feeling Sick', category: 'feeling',
        scene: 'タケシが二日酔いで居酒屋に登場。みんなが体調の英語を教える夜。',
        keywords: [
            { en: 'fever', ja: '熱', pron: 'フィーヴァー', example: 'I think I have a fever.', note: '日本は摂氏(Celsius)だけどアメリカは華氏(Fahrenheit)。37度C=98.6度F。海外で熱を伝える時に単位を間違えると大変。' },
            { en: 'symptom', ja: '症状', pron: 'シンプトム', example: 'What are your symptoms?', note: '複数形symptomsで使うことが多い。sign=兆候（客観的）、symptom=症状（主観的）。医者に説明する時の必須単語。' },
            { en: 'medicine', ja: '薬', pron: 'メディスン', example: 'Did you take your medicine?', note: '薬を「飲む」はtake。drinkとは言わない。medication=処方薬（フォーマル）。over-the-counter=市販薬。' },
            { en: 'rest', ja: '休む', pron: 'レスト', example: 'You need to get some rest.', note: 'get some rest=ゆっくり休んで。take a rest はやや不自然。bed rest=安静にする。rest up=しっかり休む。' },
            { en: 'contagious', ja: 'うつる', pron: 'コンテイジャス', example: 'Is it contagious?', note: '感染する病気にはcontagious。infectious も同義だが医学用語寄り。日本語の「うつる」の一語で済む便利さは英語にはない。' },
        ],
    },
    129: {
        title: '病院で', titleEn: 'At the Doctor', category: 'request',
        scene: 'タケシが病院に行った報告。海外で病院に行く時の英語をみんなで練習。',
        keywords: [
            { en: 'appointment', ja: '予約（病院）', pron: 'アポイントメント', example: 'I need to make an appointment.', note: '病院=appointment、レストラン=reservation。この使い分けは日本語にない。walk-in=予約なし。same-day=当日予約。' },
            { en: 'prescription', ja: '処方箋', pron: 'プリスクリプション', example: 'The doctor wrote me a prescription.', note: 'fill a prescription=処方箋の薬をもらう。refill=おかわり処方。OTC(Over The Counter)=処方箋なしで買える薬。' },
            { en: 'insurance', ja: '保険', pron: 'インシュランス', example: 'Do you have health insurance?', note: 'health insurance=健康保険。日本は国民皆保険だけど、アメリカでは無保険の人も多い。copay=自己負担額。' },
            { en: 'diagnosis', ja: '診断', pron: 'ダイアグノシス', example: 'What is the diagnosis?', note: '複数形はdiagnoses。misdiagnosis=誤診。second opinion=セカンドオピニオン。日本語でも「セカンドオピニオン」は定着。' },
            { en: 'side effect', ja: '副作用', pron: 'サイドエフェクト', example: 'Are there any side effects?', note: '薬の副作用=side effect。adverse reaction=有害反応（重い副作用）。日本語の「副作用」と同じ概念で覚えやすい。' },
        ],
    },
    130: {
        title: 'ダイエット', titleEn: 'Diet Talk', category: 'social',
        scene: 'ケンジがダイエットを宣言。みんなが色々言う居酒屋の夜。',
        keywords: [
            { en: 'calorie', ja: 'カロリー', pron: 'キャラリー', example: 'How many calories is this?', note: '日本語の「カロリー」と発音が違う。英語は「キャラリー」。count calories=カロリーを数える。calorie deficit=カロリー不足（ダイエット用語）。' },
            { en: 'carb', ja: '炭水化物', pron: 'カーブ', example: 'I am cutting carbs.', note: 'carbohydrate の略。low-carb=低糖質。no-carb=糖質ゼロ。net carbs=正味糖質。日本語の「糖質制限」はcarb restriction。' },
            { en: 'weight', ja: '体重', pron: 'ウェイト', example: 'I need to lose weight.', note: 'gain weight=太る、lose weight=痩せる。weigh=体重を量る。body weight=体重。dead weight=重荷（比喩）。' },
            { en: 'portion', ja: '一人前の量', pron: 'ポーション', example: 'I need to control my portions.', note: 'portion control=量のコントロール。serving size=一食分。helping=盛り。second helping=おかわり。' },
            { en: 'metabolism', ja: '代謝', pron: 'メタバリズム', example: 'My metabolism is really slow.', note: 'boost your metabolism=代謝を上げる。basal metabolic rate=基礎代謝。日本語と概念は同じ。高い=fast、低い=slow。' },
        ],
    },
    131: {
        title: '運動習慣', titleEn: 'Exercise Habits', category: 'social',
        scene: 'マスターがジム通いを始めたと告白。常連たちの運動事情トーク。',
        keywords: [
            { en: 'workout', ja: 'トレーニング', pron: 'ワークアウト', example: 'I need a good workout.', note: 'work out(動詞)=運動する。workout(名詞)=運動・トレーニング。日本語の「トレーニング」よりworkoutの方がカジュアル。' },
            { en: 'cardio', ja: '有酸素運動', pron: 'カーディオ', example: 'I hate cardio but I need it.', note: 'cardiovascular exercise の略。running, cycling, swimming など。筋トレ=weight training/strength training。' },
            { en: 'sore', ja: '筋肉痛の', pron: 'ソアー', example: 'I am so sore today.', note: '筋肉痛=muscle soreness。sore throat=喉が痛い。sore は「痛い」全般に使えるけど運動後の文脈では筋肉痛の意味になる。' },
            { en: 'flexible', ja: '体が柔らかい', pron: 'フレキシブル', example: 'I am not flexible at all.', note: 'flexibility=柔軟性。stretch=ストレッチ。limber=しなやか。体が硬い=stiff, not flexible。' },
            { en: 'stamina', ja: 'スタミナ・体力', pron: 'スタミナ', example: 'I need to build my stamina.', note: '日本語の「スタミナ」とほぼ同じ。endurance=持久力（フォーマル）。build stamina=体力をつける。run out of stamina=スタミナ切れ。' },
        ],
    },
    132: {
        title: '睡眠', titleEn: 'Sleep Talk', category: 'feeling',
        scene: 'みんなが睡眠の質について語り始める。現代人の永遠の悩み。',
        keywords: [
            { en: 'insomnia', ja: '不眠症', pron: 'インソムニア', example: 'I think I have insomnia.', note: '医学的な不眠症。I cannot sleep は日常表現。insomnia は「病気としての不眠」。chronic insomnia=慢性不眠。' },
            { en: 'nap', ja: '昼寝', pron: 'ナップ', example: 'I need a quick nap.', note: 'power nap=短い昼寝(15-20分)。cat nap=ちょっとうとうと。take a nap=昼寝する。nap time=お昼寝の時間。' },
            { en: 'snore', ja: 'いびきをかく', pron: 'スノアー', example: 'My partner snores really loud.', note: '動詞も名詞もsnore。heavy snorer=いびきがひどい人。sleep apnea=睡眠時無呼吸症候群。いびきの擬音は英語ではZzz。' },
            { en: 'alarm', ja: 'アラーム・目覚まし', pron: 'アラーム', example: 'I slept through my alarm.', note: 'go off=鳴る（アラームはgo off）。set an alarm=セットする。hit snooze=スヌーズを押す。sleep through=気づかず寝続ける。' },
            { en: 'drowsy', ja: '眠い・うとうと', pron: 'ドラウジー', example: 'This medicine makes me drowsy.', note: 'sleepy より「眠気でぼんやり」のニュアンス。薬の副作用で眠くなる時によく使う。groggy=寝起きでぼーっとしている。' },
        ],
    },
    133: {
        title: 'ストレス', titleEn: 'Stress', category: 'feeling',
        scene: '仕事と生活のストレスについて本音トーク。マスターが優しく聞く夜。',
        keywords: [
            { en: 'overwhelmed', ja: '圧倒されている', pron: 'オーヴァーウェルムド', example: 'I feel completely overwhelmed.', note: '「やることが多すぎてパンクしそう」。stressed outより強い。日本語の「いっぱいいっぱい」が近い。' },
            { en: 'burnout', ja: '燃え尽き', pron: 'バーンアウト', example: 'I think I am experiencing burnout.', note: '2019年にWHOが正式に定義。burn out(動詞)=燃え尽きる。burnout(名詞)=燃え尽き症候群。日本語でも「バーンアウト」は定着しつつある。' },
            { en: 'vent', ja: '愚痴を言う', pron: 'ヴェント', example: 'I just need to vent for a minute.', note: 'ventilation(換気)と同じ語源。感情を「換気」するイメージ。complain=不満を言う(ネガティブ寄り)、vent=吐き出す(前向き寄り)。' },
            { en: 'cope', ja: '対処する', pron: 'コープ', example: 'How do you cope with stress?', note: 'coping mechanism=対処法。cope with=〜に対処する。deal with も同義だがcopeの方が精神的なニュアンスが強い。' },
            { en: 'deadline', ja: '締め切り', pron: 'デッドライン', example: 'I have three deadlines this week.', note: 'meet a deadline=締め切りに間に合う。miss a deadline=締め切りを逃す。tight deadline=厳しい締め切り。日本語でも「デッドライン」は使うが、英語ほど日常的ではない。' },
        ],
    },
    134: {
        title: '美容', titleEn: 'Beauty and Skincare', category: 'shopping',
        scene: 'ミナが新しいスキンケアの話を始める。リサも参戦して美容トーク。',
        keywords: [
            { en: 'moisturizer', ja: '保湿剤・乳液', pron: 'モイスチャライザー', example: 'I need a good moisturizer.', note: 'moisturize=保湿する。hydrate=水分を与える。日本語の「乳液」は英語ではlotion、「クリーム」はcream。moisturizerは両方を含む広い概念。' },
            { en: 'sunscreen', ja: '日焼け止め', pron: 'サンスクリーン', example: 'Always wear sunscreen.', note: 'SPF(Sun Protection Factor)=紫外線防御力。sunblock も同義。日本は美白文化、欧米は健康のためにsunscreenを塗る。動機が違う。' },
            { en: 'wrinkle', ja: 'シワ', pron: 'リンクル', example: 'I am starting to get wrinkles.', note: 'fine lines=小じわ。crow\'s feet=目尻のシワ。laugh lines=笑いジワ。anti-aging=アンチエイジング。日本語の「シワ」はwrinkleだけで済むが英語は部位別に名前がある。' },
            { en: 'complexion', ja: '肌の色・肌質', pron: 'コンプレクション', example: 'She has a beautiful complexion.', note: 'skin tone=肌の色。complexion は色+質感+状態を含む総合的な「肌」。clear complexion=きれいな肌。dull complexion=くすんだ肌。' },
            { en: 'glow', ja: 'ツヤ・輝き', pron: 'グロウ', example: 'Your skin is glowing today.', note: 'glowing skin=ツヤ肌。radiant=輝いている。dewy=うるおいのある。日本語の「ツヤ肌」は英語ではglowing skinが最も近い。You are glowing は最高の褒め言葉。' },
        ],
    },
};
