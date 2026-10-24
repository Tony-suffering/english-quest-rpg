import type { LifePhrase } from './life-phrases';

export const techPhrases: LifePhrase[] = [
  {
    id: 'life-tech-001',
    japanese: '充電ない',
    english: [
      "phone's dying",
      "my phone is about to die on me",
      "I'm at three percent and there's not a charger in sight",
      "my phone just hit three percent. three. every app I open shaves off another one. I am now performing triage on my remaining battery life. do I use it to text someone back or do I save it for maps because I genuinely do not know where I am. the low battery warning is flashing at me like a countdown to complete isolation from modern society. two percent. one. goodbye world."
    ],
    context: "「充電ない」は英語でdying/deadが超自然。my phone diedは「死んだ」だが英語では普通の表現。about to dieは「もうすぐ死ぬ」で緊迫感が出る。日本語は「ない」で状態報告、英語は「死ぬ」で擬人化する文化の違い。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '外出先でスマホの充電が切れそうな時',
  },
  {
    id: 'life-tech-002',
    japanese: 'Wi-Fi繋がらない',
    english: [
      "Wi-Fi's down",
      "the Wi-Fi is not working and I'm losing my mind",
      "I've been trying to connect to the Wi-Fi for ten minutes and it keeps dropping",
      "the Wi-Fi icon has the audacity to show full bars while delivering absolutely zero internet. I have turned the router off and on. I have forgotten the network and rejoined. I have moved closer. I have moved farther. I have considered that maybe the problem is me. it is not me. it is this router that was probably manufactured during the Obama administration. we need a new one but that requires internet to order one."
    ],
    context: "Wi-Fi's downは「Wi-Fiが落ちてる」。keeps droppingは「切れたり繋がったり」。have you tried turning it off and on againはIT界の定番ジョーク。日本語の「繋がらない」は接続失敗だが英語はdownで「落ちた」、droppingで「不安定」と使い分ける。",
    category: 'tech',
    subcategory: 'wifi',
    situation: '家や外出先でWi-Fiが繋がらない時',
  },
  {
    id: 'life-tech-003',
    japanese: 'アプデしたら重くなった',
    english: [
      "update broke it",
      "the latest update made everything slower somehow",
      "I updated the app last night and now it takes twice as long to load anything",
      "they called it an improvement. they said it had exciting new features. what it actually has is a loading screen that I stare at for thirty seconds every time I open it. the old version was fine. it worked. it was fast. but someone in a meeting decided it needed a redesign and now I am watching a spinning circle where my content used to be. I did not ask for this. nobody asked for this."
    ],
    context: "update broke itは「アプデで壊れた」のIT定番。laggy/sluggish/slowは「重い」の英訳。英語の「重い」はheavyではなくslow/laggy。never update on day oneは英語圏の教訓。日本語の「重い」は体感、英語はスピードで表現する。",
    category: 'tech',
    subcategory: 'apps',
    situation: 'アプリやOSをアプデして後悔した時',
  },
  {
    id: 'life-tech-004',
    japanese: '通知多すぎ',
    english: [
      "notification overload",
      "I'm getting way too many notifications from everything",
      "my phone buzzes so often that I've started ignoring every single notification including the important ones",
      "I unlocked my phone this morning and there were sixty-three notifications. sixty-three. I do not have sixty-three things happening in my life. half of them were apps I forgot I installed begging me to come back. the other half were group chats having full conversations at six in the morning. I cleared all of them without reading a single one. if it was important they will text me again. probably."
    ],
    context: "notification fatigue(通知疲れ)は英語の正式な概念。buzzは「ブーッと振動する」。clearedは「全消し」。日本語の「多すぎ」はシンプルだが英語はoverload/bombardment/floodで「攻撃されてる感」を出す。量より質感の違い。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: 'スマホの通知が鳴り止まない時',
  },
  {
    id: 'life-tech-005',
    japanese: 'パスワード忘れた',
    english: [
      "forgot my password",
      "I have no idea what my password is for this thing",
      "I'm locked out of my account because I can't remember which password I used",
      "I have a system for passwords. the system is that I use a different password for everything and remember none of them. I just tried logging in with six different combinations of my cat's name and various years. none of them worked. now I am locked out for thirty minutes because apparently security means punishing the person who owns the account. the reset email went to an address I also cannot access."
    ],
    context: "locked outは「締め出された」でアカウントにもドアにも使う。password resetは「再設定」。security questionは「秘密の質問」だが答えを忘れるのも定番。日本語の「忘れた」は単純だが英語は「忘れたことで起きる連鎖」を語る。",
    category: 'tech',
    subcategory: 'security',
    situation: 'ログインしようとしてパスワードが分からない時',
  },
  {
    id: 'life-tech-006',
    japanese: 'ストレージ足りない',
    english: [
      "no storage left",
      "my phone says storage is full and I can't take any more photos",
      "I need to delete something because my storage is completely full but I can't figure out what's taking up all the space",
      "my phone has two hundred and fifty-six gigabytes and somehow they are all gone. where did they go. I have spent the last hour in settings looking at storage breakdown. apparently other is using forty gigabytes. what is other. nobody knows what other is. it is the Bermuda Triangle of phone storage. I refuse to delete my photos so I guess I just live with a full phone now."
    ],
    context: "storage is fullは「容量いっぱい」。otherカテゴリの謎はiPhoneユーザー全員の悩み。free up spaceは「空き容量を作る」。日本語の「足りない」は不足、英語はfullで「満杯」。視点が逆：日本語は空き側、英語は埋まった側から見る。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '写真撮ろうとしたら容量不足で撮れない時',
  },
  {
    id: 'life-tech-007',
    japanese: '広告うざい',
    english: [
      "ads are so annoying",
      "I swear every other thing I see is an ad now",
      "I can't watch a single video or open any app without being interrupted by an advertisement",
      "I tried to watch a ten-minute video and got four ads. four. two at the beginning. one in the middle right when something interesting was about to happen. and one at the end which is just disrespectful. the internet used to be free and now it is a toll road where every five steps someone jumps in front of you trying to sell protein powder or a mattress. I am not buying your mattress."
    ],
    context: "adsはadvertisementsの略で口語の定番。ad blockerは「広告ブロッカー」。sponsored contentは「PR記事」。unskippableは「スキップできない」。日本語の「うざい」はannoying一択に見えるが英語はintrusiveの方が「邪魔して入ってくる」感が出る。",
    category: 'tech',
    subcategory: 'apps',
    situation: '動画やアプリで広告が出まくる時',
  },
  {
    id: 'life-tech-008',
    japanese: 'バグってる',
    english: [
      "it's bugging out",
      "this app is completely glitching on me right now",
      "something is seriously wrong with this app because nothing is loading correctly and buttons aren't responding",
      "I tapped the button. nothing happened. I tapped it again. the screen froze. I tapped it a third time and the app decided to close itself entirely. I reopened it and now it is showing me yesterday's data in tomorrow's layout with someone else's profile picture. I do not know how software this broken made it through quality assurance. or maybe it did not go through quality assurance. that would explain things."
    ],
    context: "buggy/glitchy/bugging outは「バグってる」の英語。crashは「完全に落ちる」、freezeは「固まる」、lagは「遅延」。英語はバグの種類を細かく分ける。日本語の「バグってる」は万能だが英語はsymptom別に言い分ける文化。",
    category: 'tech',
    subcategory: 'apps',
    situation: 'アプリが変な動きをしている時',
  },
  {
    id: 'life-tech-009',
    japanese: 'サブスク解約したい',
    english: [
      "canceling this subscription",
      "I'm done paying for something I barely even use",
      "I need to cancel this subscription but they've made it almost impossible to find the cancel button",
      "I decided to cancel. simple right. wrong. I clicked account settings. then manage subscription. then a page asking why I want to leave. then a special offer to stay. then another page asking if I am sure. then a final page saying I will lose everything. five screens to cancel something that took one click to start. this is not user experience design. this is emotional manipulation with extra steps."
    ],
    context: "dark patterns(ダークパターン)は「解約しにくいUI設計」の英語。cancel my subscriptionは直球。retention offerは「引き止めオファー」。日本語の「解約したい」は意志表明だが英語はthe process of cancelingの苦労を語りがち。",
    category: 'tech',
    subcategory: 'subscription',
    situation: '使ってないサブスクを解約しようとしている時',
  },
  {
    id: 'life-tech-010',
    japanese: 'スマホ落として画面割れた',
    english: [
      "cracked my screen",
      "I dropped my phone and the screen is completely shattered",
      "my phone slipped out of my hand and now the screen looks like a spider web of cracks",
      "it happened in slow motion. I watched it leave my hand. I watched it rotate in the air. I watched it hit the ground face down. I stood there for three seconds before picking it up because I was not emotionally ready to see the damage. I flipped it over. cracked. of course. the one time I take my case off to clean it. the phone waited for its moment of vulnerability and chose violence."
    ],
    context: "cracked screenは「画面割れ」の定番。shatteredは「粉砕」レベル。spider web of cracksは「蜘蛛の巣状のヒビ」で英語的な描写。screen protectorは「画面保護フィルム」。日本語の「割れた」は結果だが英語はdropped→cracked→damagedのプロセスで語る。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: 'スマホを落として画面にヒビが入った時',
  },
  {
    id: 'life-tech-011',
    japanese: 'アプリの権限要求しすぎ',
    english: [
      "why does it need all that",
      "this app is asking for way too many permissions",
      "I just want to use a flashlight app and it's asking for access to my contacts and my camera and my location",
      "I downloaded a calculator. a calculator. it wants access to my photos. my microphone. my location. my contacts. my calendar. my soul probably. what is a calculator going to do with my photo library. am I being dramatic. possibly. but I also do not trust an app that needs to know where I am in order to do basic math. permission denied. all of them. denied."
    ],
    context: "permissionsは「権限」。access to〜は「〜へのアクセス」。data privacyは「データプライバシー」。英語圏でもover-permissioning(権限要求しすぎ)は大きな話題。日本語の「しすぎ」は英語のway too manyで対応。ask forは「要求する」でdemandより穏やか。",
    category: 'tech',
    subcategory: 'apps',
    situation: 'アプリをインストールして権限リクエストが大量に来た時',
  },
  {
    id: 'life-tech-012',
    japanese: '既読つけたくない',
    english: [
      "avoiding the read receipt",
      "I need to read this message without them knowing I read it",
      "I'm going to read this from the notification preview so it doesn't show that I've seen it yet",
      "there is a message sitting there that I am not emotionally prepared to deal with. but I also need to know what it says. so I am going to use the ancient technique of pulling down the notification shade just enough to read the preview without actually opening the app. this is not avoidance. this is strategic information gathering. I will respond when I have formulated the perfect reply. which might be never."
    ],
    context: "read receiptsは「既読表示」。left on readは「既読スルー」。notification previewから読むテクニックは万国共通。seen/readは英語アプリの既読表示。日本語の「つけたくない」は既読マークの制御、英語はavoiding the read receiptとシステムを回避する表現。",
    category: 'tech',
    subcategory: 'messaging',
    situation: 'メッセージを読みたいけど既読をつけたくない時',
  },
  {
    id: 'life-tech-013',
    japanese: 'QRコード読み取れない',
    english: [
      "QR won't scan",
      "my camera refuses to pick up this QR code",
      "I've been pointing my phone at this QR code from every possible angle and it still won't scan",
      "the QR code is right there. my camera is pointing directly at it. the distance is correct. the lighting is fine. and yet my phone is looking at this black and white square like it has never seen one before in its life. I have tried closer. farther. tilted. straight on. at this point the people behind me in line are watching me fight a piece of paper and I have lost all dignity."
    ],
    context: "scan/read a QR codeは「QRコードを読み取る」。won't scanは「読めない」。pick upは「認識する」のカジュアル版。英語ではQR code自体は日本より遅れて普及した(コロナで一気に広まった)。日本語の「読み取れない」は機能的だが英語は体験を描写する。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '店のQRコード決済やメニューが読み取れない時',
  },
  {
    id: 'life-tech-014',
    japanese: '二段階認証めんどくさい',
    english: [
      "two-factor is annoying",
      "two-factor authentication is necessary but incredibly tedious",
      "I understand why two-factor exists but having to grab my phone every single time I log in is exhausting",
      "I am trying to log into my own account on my own computer in my own house and the system is asking me to prove I am me. it sent a code to my phone. my phone is in the other room. I walk to get it. the code expires in thirty seconds. I walk faster. I type it in. incorrect. it sent a new one. I am now in a race against time to prove my own identity to a website that I visit every single day."
    ],
    context: "2FA/two-factor authenticationは「二段階認証」。tediousは「面倒だが必要」のニュアンスでannoyingより大人。one-time codeは「ワンタイムコード」。日本語の「めんどくさい」は感情直球だが英語はI understand why but構文で合理性を認めつつ文句を言う。",
    category: 'tech',
    subcategory: 'security',
    situation: 'ログインの度に二段階認証を求められる時',
  },
  {
    id: 'life-tech-015',
    japanese: 'タブ開きすぎ',
    english: [
      "too many tabs",
      "I have so many tabs open my browser is begging for mercy",
      "I looked at my browser and I have forty-seven tabs open and I'm afraid to close any of them",
      "my browser tabs have gotten so small that I cannot read what any of them say. they are just tiny colored squares stretching across the top of my screen like a pixelated rainbow of poor decisions. each one represents something I was going to read later. later never came. closing them feels like giving up on the person I was when I opened them. so they stay. all forty-seven of them. forever."
    ],
    context: "tab hoarder(タブ溜め込み族)は英語のネットスラング。my browser is struggling/laggingは「ブラウザが重い」。英語ではtab management(タブ管理)が話題になるほど。日本語の「開きすぎ」は量の話、英語はブラウザの悲鳴として擬人化する。",
    category: 'tech',
    subcategory: 'computer',
    situation: 'ブラウザのタブが大量に開いている時',
  },
  {
    id: 'life-tech-016',
    japanese: 'データ通信制限かかった',
    english: [
      "hit my data cap",
      "my data got throttled and everything is painfully slow now",
      "I used up all my mobile data and now my internet speed is basically unusable until next month",
      "I thought I had plenty of data left. I did not. apparently streaming one movie on the train used the rest of my monthly allowance and now my phone is operating at a speed that makes dial-up internet look futuristic. pages load one pixel at a time. images appear like they are being painted by a very slow artist. I cannot even complain about it online because the complaint would take forty minutes to post."
    ],
    context: "throttled(速度制限される)はISP用語だが口語でも使う。data capは「データ上限」。unlimited planは「無制限プラン」(実は制限あり)。日本語の「制限かかった」は受動、英語はgot throttledで「やられた」感が出る。速度制限は万国共通の苦しみ。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '月末にデータ通信量の上限に達した時',
  },
  {
    id: 'life-tech-017',
    japanese: 'このアプリ個人情報抜きすぎ',
    english: [
      "total privacy nightmare",
      "this app is collecting way more personal data than it needs to",
      "I read the privacy policy for the first time and I am genuinely concerned about how much data this app is harvesting",
      "I made the mistake of actually reading the privacy policy. nobody reads the privacy policy. there is a reason nobody reads it. because it says things like we may share your data with our partners and affiliates which is corporate for we are selling your information to everyone. my location. my browsing habits. my contacts. they know more about me than I know about myself and I agreed to all of it by clicking a blue button."
    ],
    context: "data harvesting(データ収穫)は「個人情報を大量収集する」。privacy policy(プラポリ)を読む人は英語圏でも1%以下。terms of service(利用規約)も同じ。日本語の「抜きすぎ」は強い言い方だが英語はcollecting/harvestingで農業メタファーを使う。",
    category: 'tech',
    subcategory: 'security',
    situation: 'アプリの権限やデータ収集に不安を感じた時',
  },
  {
    id: 'life-tech-018',
    japanese: 'Bluetooth繋がらない',
    english: [
      "Bluetooth won't pair",
      "my Bluetooth is being impossible right now",
      "I've been trying to pair my headphones for five minutes and they just refuse to connect",
      "I turned Bluetooth on. I turned the headphones on. they found each other. they refused to connect. I turned everything off and on again. they found each other again. they refused again. I deleted the device. re-paired it. it connected for two seconds. then disconnected. I am now holding two pieces of technology worth a combined five hundred dollars that cannot perform the simple task of talking to each other."
    ],
    context: "pair/pairingは「ペアリング」。won't connect/refuses to pairは接続拒否。Bluetooth troubleshooting(BT問題解決)は英語圏でもmeme化するほどの定番ストレス。日本語の「繋がらない」は結果報告、英語は「試した手順」を全部列挙して怒りを積み上げる。",
    category: 'tech',
    subcategory: 'devices',
    situation: 'ワイヤレスイヤホンやスピーカーが接続できない時',
  },
  {
    id: 'life-tech-019',
    japanese: 'バックアップ取ってなかった',
    english: [
      "no backup",
      "I never backed anything up and now it's all gone",
      "my phone died and I just realized I haven't backed up my photos or anything in over a year",
      "the phone is dead. not sleeping. dead. and all my photos from the last fourteen months are in there. birthdays. trips. that one sunset that was so perfect I took thirty photos of it. all of it exists only on a device that will not turn on. I thought iCloud was handling this. it was not handling this. the free five gigabytes ran out apparently and nobody told me. actually they did tell me. I ignored it."
    ],
    context: "back up(動詞)とbackup(名詞)の違いに注意。cloud storageは「クラウド保存」。the free tier ran outは「無料枠が終わった」。日本語の「取ってなかった」は後悔、英語はI thought X was handling itで「他力本願の裏切り」を表現する。",
    category: 'tech',
    subcategory: 'data',
    situation: 'デバイスが壊れてバックアップがないことに気づいた時',
  },
  {
    id: 'life-tech-020',
    japanese: 'AIに聞いた方が早い',
    english: [
      "just ask the AI",
      "honestly it's faster to just ask ChatGPT at this point",
      "I was going to Google it but asking AI gives me a straight answer without scrolling through ten blog posts",
      "I used to Google things. I would type a question and get ten blue links to websites that all say the same thing buried under three paragraphs of someone's life story and fourteen ads. now I ask an AI and get the answer in four seconds. it might be slightly wrong but at least it respects my time. the internet became a maze of SEO content and AI became the shortcut through the maze. ironic that AI is fixing a problem AI partly created."
    ],
    context: "just Google itの後継がjust ask AI/ask ChatGPT。SEO content(検索最適化記事)は英語圏で嫌われている。straight answerは「直球の答え」。英語の情報検索文化がGoogle→AI移行中なのは日本と同じ。hallucination(AIの嘘)もすでに英語の一般語。",
    category: 'tech',
    subcategory: 'ai',
    situation: '何か調べようとしてAIを使った方が早いと思った時',
  },
  {
    id: 'life-tech-021',
    japanese: 'スクショ撮って送る',
    english: [
      "sending a screenshot",
      "let me just screenshot this and send it to you",
      "it's easier if I just take a screenshot and send it instead of trying to explain what I'm looking at",
      "I have been trying to describe this error message for three minutes using words and getting nowhere. you do not understand what I mean. I do not understand what I mean. language has failed us. so I am going to take a picture of the screen and send it because a screenshot is worth a thousand words of confused technical description. there. look at it. that. that is what I have been trying to say."
    ],
    context: "screenshotは動詞としても使える(I'll screenshot it)。send a pic of my screenとも言う。a picture is worth a thousand wordsは英語のことわざがそのまま機能する場面。日本語の「スクショ」は英語screenshotの短縮の逆輸入。",
    category: 'tech',
    subcategory: 'messaging',
    situation: '状況を説明するよりスクショの方が早い時',
  },
  {
    id: 'life-tech-022',
    japanese: 'フリーWi-Fi怖い',
    english: [
      "sketchy public Wi-Fi",
      "I don't trust free Wi-Fi at all honestly",
      "I know I shouldn't connect to random public Wi-Fi but sometimes I have no choice and it makes me nervous",
      "the coffee shop Wi-Fi is called FREE_WIFI_CONNECT and that is already suspicious. it could be fine. it could also be someone sitting in the corner intercepting every password I type. I connected anyway because my data is throttled and I need to check my email. I am essentially gambling my digital identity for the privilege of reading spam. if my bank account gets hacked I will know exactly when and where it happened."
    ],
    context: "sketchy(怪しい)/shady(胡散臭い)はフリーWi-Fi評価の定番。man-in-the-middle attackは「中間者攻撃」だが一般人はhacker stealingぐらいの認識。VPNは英語圏では普及度が日本より高い。日本語の「怖い」は感情、英語はsketchy(見た目の怪しさ)で表現する。",
    category: 'tech',
    subcategory: 'wifi',
    situation: 'カフェや公共施設のフリーWi-Fiに接続する時',
  },
  {
    id: 'life-tech-023',
    japanese: 'アカウント乗っ取られた',
    english: [
      "got hacked",
      "someone hacked my account and I'm freaking out",
      "I just noticed my account is posting things I didn't write and I think someone got into it",
      "I woke up to seventeen messages from people asking if I was okay. I did not know why. then I checked my account and apparently I had been promoting cryptocurrency in my sleep. my profile picture was changed to a cartoon ape. my bio now says DM for investment opportunities. whoever did this also followed eight hundred accounts I have never seen. I have been turned into a spam bot against my will and I need help."
    ],
    context: "got hackedは「乗っ取られた」の一般表現。compromisedはフォーマル版。phishingは「フィッシング詐欺」。account recoveryは「アカウント復旧」。日本語の「乗っ取り」は乗り物メタファー、英語のhackは「侵入」メタファー。被害の語り方が構造的に違う。",
    category: 'tech',
    subcategory: 'security',
    situation: 'SNSやメールアカウントが乗っ取られた時',
  },
  {
    id: 'life-tech-024',
    japanese: 'ワイヤレス充電遅い',
    english: [
      "wireless charging is slow",
      "this wireless charger takes absolutely forever",
      "I put my phone on the wireless charger an hour ago and it has gone up maybe fifteen percent",
      "I bought a wireless charger because I thought it would be convenient. it is convenient in the sense that I do not have to plug anything in. it is inconvenient in the sense that my phone charges at the speed of continental drift. I put it on at midnight at forty percent. I woke up at seven. sixty-eight percent. a wired charger would have finished this in an hour and gone to sleep itself."
    ],
    context: "wireless/Qi chargingは「ワイヤレス充電」。takes foreverは「永遠にかかる」の定番誇張表現。trickle chargeは「チョロチョロ充電」。fast chargingとの対比で不満が強まる。日本語の「遅い」は形容詞1語、英語はtakes foreverで時間の長さを強調する。",
    category: 'tech',
    subcategory: 'devices',
    situation: 'ワイヤレス充電器に置いたのに全然増えない時',
  },
  {
    id: 'life-tech-025',
    japanese: 'ダークモード派',
    english: [
      "dark mode everything",
      "I use dark mode on literally every app I have",
      "the first thing I do on any new app is find the dark mode setting because light mode burns my eyes",
      "light mode is an act of violence against my retinas. I do not understand how people use white screens in the dark. it is like staring into a flashlight. every app I download gets immediately switched to dark mode. my phone is dark. my laptop is dark. my browser is dark. when a website does not have a dark mode option I take it as a personal insult and I leave. the sun and I have an understanding."
    ],
    context: "dark modeは「ダークモード」でそのまま通じる。light mode/dark mode論争は英語圏でも宗教戦争レベル。burns my eyesは「目が焼ける」で大袈裟だが口語では普通。日本語の「派」は所属表明、英語はI'm a dark mode person/dark mode gang。",
    category: 'tech',
    subcategory: 'apps',
    situation: 'アプリの設定について話している時',
  },
  {
    id: 'life-tech-026',
    japanese: '既読スルーされた',
    english: [
      "left on read",
      "they totally left me on read and it's been hours",
      "I can see they read my message three hours ago and they still have not replied to me",
      "the blue check marks appeared at two seventeen in the afternoon. it is now eight forty-five in the evening. six and a half hours of silence. I have considered every possible explanation. they are busy. they forgot. their phone died. they moved to another country. they are composing a response so thoughtful it requires six hours of drafting. the most likely explanation is they just do not want to respond and I need to accept that."
    ],
    context: "left on readは「既読スルー」の完璧な英訳でSNS世代の必須語彙。blue ticks/check marksは既読マーク。ghostingは「突然音信不通になる」で既読スルーの究極版。日本語の「された」は受動態だが英語もleft on readで「放置された」の受動感がある。",
    category: 'tech',
    subcategory: 'messaging',
    situation: 'メッセージが既読になったのに返信が来ない時',
  },
  {
    id: 'life-tech-027',
    japanese: 'Siri全然使えない',
    english: [
      "Siri is useless",
      "Siri never understands what I'm actually asking for",
      "I asked Siri a simple question and it gave me a web search result instead of an actual answer",
      "I said set a timer for ten minutes. Siri heard set a rhymer for tin mittens. I do not know what tin mittens are and neither does Siri but it tried to search for them anyway. this happens every single time. I speak clearly. I speak slowly. I speak like I am talking to someone who is learning my language for the first time. and still Siri interprets my words like a game of telephone played by robots."
    ],
    context: "voice assistant(音声アシスタント)への不満は英語圏でもミーム化。misheard/misinterpretedは「聞き間違い」。I didn't ask for thatは「それ頼んでない」。日本語の「使えない」は能力否定、英語はnever understandsで理解力を責める。人間と同じ怒り方。",
    category: 'tech',
    subcategory: 'ai',
    situation: '音声アシスタントが全然役に立たない時',
  },
  {
    id: 'life-tech-028',
    japanese: 'アプリ課金したくない',
    english: [
      "not paying for that",
      "I refuse to pay for an app that should be free",
      "they want me to pay a monthly subscription for features that used to be free and I am not doing it",
      "this app was free for two years. I used it every day. I recommended it to friends. I left a five star review. and now they want four dollars a month for the thing that I was already doing for free. four dollars. that is forty-eight dollars a year for an app that tells me the weather. I can look outside and tell you the weather for free. the audacity of turning a free feature into a subscription should be studied in business school."
    ],
    context: "freemiumは「基本無料+有料機能」のビジネスモデル用語。paywall(有料の壁)も定着。the audacityは「図々しさ」で怒りの表現。used to be freeは「前は無料だった」の黄金フレーズ。日本語の「したくない」は意志、英語はrefuse toで強い拒否になる。",
    category: 'tech',
    subcategory: 'subscription',
    situation: 'アプリの有料化や課金誘導にイラッとした時',
  },
  {
    id: 'life-tech-029',
    japanese: 'スマホ依存かも',
    english: [
      "might be addicted",
      "I think I'm genuinely addicted to my phone at this point",
      "I picked up my phone without thinking and realized I had no reason to and that worries me a little",
      "I checked my screen time report this week. seven hours a day. seven. that is basically a full-time job of looking at a rectangle. I pick up my phone and I do not even know why. there is nothing to check. I checked everything thirty seconds ago. but my hand just reaches for it automatically like a reflex. I put it in another room. I walked to that room. my phone has a gravitational pull that science cannot explain."
    ],
    context: "phone addiction/screen addictionは社会問題として英語でも頻出。screen timeは「画面時間」でiPhoneの機能名でもある。doom scrollingは「ネガティブ記事を延々見る」。日本語の「依存かも」の「かも」は自覚の曖昧さ、英語はI think I might beで同じヘッジができる。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: 'スマホを触りすぎている自分に気づいた時',
  },
  {
    id: 'life-tech-030',
    japanese: '迷惑メール多すぎ',
    english: [
      "drowning in spam",
      "my inbox is ninety percent spam at this point",
      "I get more emails from companies I don't remember signing up for than from actual human beings",
      "I opened my email this morning. one hundred and twelve new messages. two were from humans. the rest were from every company I have ever interacted with plus several I have never heard of in my life. unsubscribe buttons do not work. they just confirm that your email is active and invite more spam. my inbox is not a communication tool anymore. it is a graveyard of promotional offers for things I bought once three years ago."
    ],
    context: "spamは「迷惑メール」の世界共通語。unsubscribeは「配信停止」だが効果は疑問。inbox zeroは「受信箱ゼロ」の生産性用語。日本語の「多すぎ」は量の報告、英語はdrowning in(溺れる)で身体的メタファーを使う。",
    category: 'tech',
    subcategory: 'email',
    situation: 'メールを開いたらスパムだらけの時',
  },
  {
    id: 'life-tech-031',
    japanese: 'パソコン重い',
    english: [
      "computer's so slow",
      "my laptop is running like it's giving up on life",
      "everything on my computer takes about three times longer than it should and I'm losing patience",
      "I clicked on a folder. the spinning wheel appeared. I waited. and waited. the wheel kept spinning like it was meditating. I opened task manager to see what was using all the resources and task manager itself took forty seconds to open. that is when you know things are bad. when the tool you use to diagnose the problem is also affected by the problem. I might need a new computer. I definitely need a new computer."
    ],
    context: "slow/sluggish/lagging(重い)はスペック不足の英語。spinning wheel(くるくる)はMacのbeach ball of death。task managerは「タスクマネージャー」。日本語の「重い」は体感の1語、英語はslow/laggy/unresponsiveで症状別に表現する。",
    category: 'tech',
    subcategory: 'computer',
    situation: 'パソコンの動作が遅くてイライラする時',
  },
  {
    id: 'life-tech-032',
    japanese: 'SNS疲れた',
    english: [
      "social media burnout",
      "I'm so tired of social media and everything about it",
      "I think I need to take a break from all social media because it's starting to affect my mood",
      "I used to open Instagram and feel happy. now I open it and feel like everyone is living a better life than me while I sit here in sweatpants eating cereal at three in the afternoon. every post is someone's vacation or promotion or engagement. the algorithm has decided I need to see everyone succeeding while I am doing nothing. I am going to delete the app. I will reinstall it in three days but for those three days I will be free."
    ],
    context: "social media fatigue/burnoutは「SNS疲れ」の正式な英語。comparison trap(比較の罠)は心理学用語。digital detoxは「デジタルデトックス」。日本語の「疲れた」は肉体的にも精神的にも使えるがburnoutは精神的な消耗に特化。",
    category: 'tech',
    subcategory: 'sns',
    situation: 'SNSを見るのがしんどくなった時',
  },
  {
    id: 'life-tech-033',
    japanese: 'ネットの回線速度遅すぎ',
    english: [
      "internet is crawling",
      "my internet speed is absolutely pathetic right now",
      "I just ran a speed test and my download speed is so low that it honestly feels like a personal attack",
      "I am paying for what the internet company calls high-speed broadband. they define high-speed differently than I do. a video takes thirty seconds to buffer. a webpage loads in stages like it is a photograph developing in a darkroom. I ran a speed test and the number that came back was so low that I laughed. I am paying eighty dollars a month for an internet connection that my phone's data beats easily."
    ],
    context: "buffering(読み込み中)はネット遅延の代名詞。speed testは回線速度測定。broadbandは「ブロードバンド」だが速度は契約次第。日本語の「遅すぎ」は不満の直球、英語はcrawling(這う速度)/pathetic(情けない)で擬人化して馬鹿にする。",
    category: 'tech',
    subcategory: 'wifi',
    situation: 'ネットが遅くて動画が止まる時',
  },
  {
    id: 'life-tech-034',
    japanese: '着信拒否にしたい',
    english: [
      "blocking this number",
      "I'm about to block this number right now",
      "if this number calls me one more time I am adding it straight to my block list",
      "this number has called me four times today. four. I do not know who they are. I did not answer. they did not leave a voicemail. they just call and hang up like some kind of telephonic ghost. I googled the number and twelve people on a forum say it is a scam. one person says it is a pharmacy. I do not know who to believe but I do know I am blocking it. if it was the pharmacy they can email me."
    ],
    context: "block a numberは「着信拒否」。spam callは「迷惑電話」。robocallは「自動音声電話」で英語圏の社会問題。do not call listは「電話拒否リスト」(政府運営)。日本語の「拒否」は能動的、英語のblockは「壁を作る」イメージ。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '知らない番号から何度も電話がかかってくる時',
  },
  {
    id: 'life-tech-035',
    japanese: 'それChatGPTに書かせたでしょ',
    english: [
      "ChatGPT wrote this",
      "this has AI written all over it honestly",
      "I can tell this was generated by AI because it sounds way too clean and nobody actually writes like this",
      "the sentence structure is too perfect. the paragraphs are too balanced. nobody uses the word furthermore in casual conversation. and there is that specific AI tone where everything sounds confident and helpful but says nothing specific. it is like reading a press release written by a very polite robot. I am not judging. I use it too. but at least change a few words so it does not sound like a Wikipedia article gained sentience."
    ],
    context: "AI-generated content(AI生成コンテンツ)の見分け方は英語圏で大議論中。too polished/too cleanは「綺麗すぎる」のAI判定基準。sounds like ChatGPTは2024年以降の新しい英語表現。日本語の「書かせた」は使役、英語はwrote it/generated itで道具扱い。",
    category: 'tech',
    subcategory: 'ai',
    situation: '友達の文章がAI生成っぽいと気づいた時',
  },
  {
    id: 'life-tech-036',
    japanese: 'アップデート終わらない',
    english: [
      "update is stuck",
      "this update has been going for an hour and it's still not done",
      "my computer started updating when I turned it on this morning and it has been stuck at seventy percent for thirty minutes",
      "I turned on my laptop because I needed to do something urgently. Windows had other plans. updating. do not turn off your computer. one of forty-seven. one of forty-seven. I did not agree to this. I did not schedule this. my laptop decided on its own that right now during the most inconvenient moment possible was the perfect time to reinvent itself. I am watching a progress bar move like a glacier while my deadline approaches."
    ],
    context: "Windows updateの強制アップデートは英語圏のミーム。stuck at X percentは「X%で止まった」。do not turn off your computerはWindowsの有名メッセージ。日本語の「終わらない」は待ちの表現、英語はstuck(詰まった)で物理的に動かないイメージ。",
    category: 'tech',
    subcategory: 'computer',
    situation: 'PCのアップデートが終わらなくて使えない時',
  },
  {
    id: 'life-tech-037',
    japanese: '写真フォルダ整理しなきゃ',
    english: [
      "need to sort my photos",
      "my photo library is a complete disaster that I keep avoiding",
      "I have over ten thousand photos on my phone and at least half of them are screenshots and duplicates I'll never look at",
      "my camera roll is a timeline of chaos. there are fifteen identical selfies from when I was trying to get the right angle. forty screenshots of memes I will never look at again. twelve pictures of a menu I photographed once. six photos of my cat that are basically the same photo. and somewhere buried in there are the actual memories I want to keep. organizing this would take an entire weekend. so I will not."
    ],
    context: "camera rollは「カメラロール」。photo library/galleryは「写真フォルダ」。duplicateは「重複写真」。storage清掃でphoto cleanupは定番。日本語の「整理しなきゃ」は義務感、英語はI need to but I won'tの構文で「やらなきゃだけどやらない」を正直に言う。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: 'スマホの写真が多すぎて整理が必要な時',
  },
  {
    id: 'life-tech-038',
    japanese: 'ネットで見たけどほんと？',
    english: [
      "is that actually true",
      "I saw it online but I'm not sure if it's legit",
      "I read something on the internet that seems too wild to be real and I need someone to confirm it",
      "someone on Twitter said that dolphins sleep with one eye open. I have no idea if that is true. it sounds true enough to repeat at a dinner party but also fake enough to be embarrassing if someone fact-checks me. this is the fundamental problem with the internet. everything sounds plausible. nothing is verified. and I am building my entire worldview on posts written by people whose qualifications I have never checked."
    ],
    context: "fact-checkは「ファクトチェック」で2020年代の最重要語彙。source?(ソースは?)は英語でも同じツッコミ。misinformation(誤情報)とdisinformation(偽情報)は区別される。日本語の「ほんと？」は確認、英語はlegit(正当)で信頼性を問う。",
    category: 'tech',
    subcategory: 'internet',
    situation: 'ネットで見た情報の真偽が気になる時',
  },
  {
    id: 'life-tech-039',
    japanese: '充電器持ってきてない',
    english: [
      "forgot my charger",
      "I left my charger at home and my phone's already at thirty percent",
      "I just realized I don't have my charger with me and I'm going to be out all day with a dying phone",
      "I am sitting in a coffee shop with thirty-two percent battery and no charger. I have nine hours until I get home. that is roughly three percent per hour if I do not touch my phone. but I will touch my phone because I am a human being in the twenty-first century and going nine hours without a phone is basically time travel. I am now rationing my battery like a survivalist rationing water in a desert."
    ],
    context: "left my charger at homeは「充電器忘れた」の鉄板。battery anxiety(充電不安)は英語で命名されるほど現代病。power bank(モバイルバッテリー)は救世主。日本語の「持ってきてない」は事実報告、英語はrationing(配給制)で戦時中メタファーを使う。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '外出先で充電器を忘れたことに気づいた時',
  },
  {
    id: 'life-tech-040',
    japanese: '勝手にアプリ更新すんな',
    english: [
      "stop auto-updating",
      "I hate when apps update themselves without asking me",
      "I opened an app and everything looks completely different because it auto-updated and now I can't find anything",
      "I opened the app this morning and it was like walking into my apartment after someone rearranged all the furniture without telling me. the button that was on the bottom is now on the top. the menu is in a different place. there is a new feature I did not ask for covering half the screen. I just want to use the thing the way I was using it yesterday. I do not want innovation. I want consistency."
    ],
    context: "auto-updateは「自動更新」。UI changed without warningは英語圏でも大きな不満。UX redesignへの反発はEvery Twitter updateで証明済み。日本語の「すんな」は命令、英語はI hate when/stop doingで禁止を表現する。",
    category: 'tech',
    subcategory: 'apps',
    situation: 'アプリが勝手に更新されてUIが変わった時',
  },
  {
    id: 'life-tech-041',
    japanese: 'ポイント貯めるの忘れた',
    english: [
      "forgot to scan my points",
      "I completely forgot to scan my loyalty card and now those points are gone forever",
      "I paid first and then remembered I was supposed to scan my rewards card and now the cashier says they can't add the points after",
      "I spend my entire life collecting points. coffee points. drugstore points. grocery points. airline miles. my wallet is fifty percent plastic loyalty cards. and the one time I actually have a purchase large enough to matter I forget to scan the card. the points are gone. they cannot be recovered. it is like watching coins fall into a storm drain. you know exactly how much you lost and there is nothing you can do."
    ],
    context: "loyalty card/rewards card/points cardは「ポイントカード」。scanは「読み取る」。forgot to tapも使う。英語圏のポイント文化は日本ほど過密ではないがrewards programは一般的。日本語の「貯めるの忘れた」は蓄積の中断、英語はforgot to scanで動作の欠如。",
    category: 'tech',
    subcategory: 'apps',
    situation: '会計後にポイントカードを出し忘れた時',
  },
  {
    id: 'life-tech-042',
    japanese: '検索履歴消したい',
    english: [
      "clearing my history",
      "I need to delete my search history immediately",
      "I just realized someone might see my search history and there are some things in there that require context",
      "my search history from the last hour reads like the diary of someone having a medical crisis. I googled a weird symptom. then another. then another. then I googled is it normal to google symptoms. then I googled how to stop googling symptoms. then I googled the original symptom one more time just to be sure. if anyone sees this they will think I am either very sick or very unwell mentally. possibly both. clearing everything now."
    ],
    context: "clear/delete history(履歴消す)は必須スキル。incognito mode(シークレットモード)は「最初からこっちで検索しろ」の話。browsing historyは「閲覧履歴」。日本語の「消したい」は意志、英語はneed to deleteで緊急性が出る。内容次第で切迫度が変わる表現。",
    category: 'tech',
    subcategory: 'internet',
    situation: '検索履歴を見られたくない時',
  },
  {
    id: 'life-tech-043',
    japanese: 'オンライン会議の背景気にする',
    english: [
      "fixing my background",
      "I need to find a clean spot for my video call background",
      "my room is a disaster so I'm spending more time picking a virtual background than preparing for the actual meeting",
      "the meeting starts in three minutes. my room looks like a tornado hit it. there are clothes on the chair. dishes on the desk. something suspicious on the shelf that I do not want to identify on camera. I could clean. or I could use a virtual background. I chose the virtual background. now I look like I am sitting on a beach which is arguably more suspicious than the mess but at least it is intentional."
    ],
    context: "virtual backgroundは「バーチャル背景」。Zoomの背景問題はコロナ以降の英語圏あるある。my room is a messは「部屋が汚い」のカジュアル表現。blurは「ぼかし」で妥協案。日本語の「気にする」は心配、英語はspending time on itで行動に出る。",
    category: 'tech',
    subcategory: 'apps',
    situation: 'オンライン会議の前に部屋が汚いことに気づいた時',
  },
  {
    id: 'life-tech-044',
    japanese: 'フォント変えたら全部崩れた',
    english: [
      "font broke everything",
      "I changed one font and the entire layout fell apart",
      "I thought changing the font would be a quick tweak but now nothing is aligned and everything looks terrible",
      "I changed one thing. one. I swapped the font from Arial to something slightly more interesting. and the entire page shifted like a building whose foundation cracked. buttons overlapping text. margins that no longer margin. a header that is now somehow behind the image it is supposed to be above. I have learned a valuable lesson today. fonts are not cosmetic. fonts are structural. and I have destroyed the structure."
    ],
    context: "layout broke/fell apartは「レイアウトが崩れた」。cascading issues(連鎖的な問題)はまさにCSS(Cascading Style Sheets)の名前通り。font rendering(フォント描画)は環境で変わる。日本語の「崩れた」は視覚的な崩壊、英語もfell apart(バラバラになる)で同じ。",
    category: 'tech',
    subcategory: 'computer',
    situation: 'デザインやドキュメントのフォントを変えて崩れた時',
  },
  {
    id: 'life-tech-045',
    japanese: '新しいスマホに移行めんどい',
    english: [
      "dreading the phone transfer",
      "switching to a new phone sounds great until you remember the data transfer",
      "I got a new phone and now I have to figure out how to move everything over without losing anything",
      "I have a shiny new phone in one hand and my entire digital life trapped inside the old phone in the other. photos. apps. passwords. settings I customized over three years. two-factor authentication codes that are tied to the old device. one wrong move and I lose access to half my accounts. phone upgrades should be exciting but instead I am performing surgery on my digital identity with no training and no safety net."
    ],
    context: "data transfer/migrationは「データ移行」。setup processは「初期設定」。transfer your dataは「データ引き継ぎ」。日本語の「めんどい」は面倒の略、英語はdreading(怖がる)でこれからの苦労への恐怖を表現。hassleは「面倒事」のカジュアル版。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '新しいスマホを買ったけどデータ移行が面倒な時',
  },
  {
    id: 'life-tech-046',
    japanese: 'AIの回答嘘だった',
    english: [
      "the AI lied to me",
      "the AI gave me a completely wrong answer and I believed it",
      "I trusted the AI response without checking and it turned out to be totally inaccurate",
      "ChatGPT told me something with such confidence that I repeated it in a conversation like it was a fact. then someone pulled out their phone and fact-checked me in real time and it was wrong. completely wrong. the AI made it up. and it did not even hesitate. it said it with the same tone it uses for things that are actually true. I was publicly corrected by a person holding the evidence of my gullibility. never again. probably."
    ],
    context: "hallucination(幻覚)はAIが嘘をつく現象の公式用語。confabulation(作話)とも言う。confidently wrongは「自信満々に間違う」でAIの特徴を完璧に表現。日本語の「嘘」はシンプルだが英語はmade it up/fabricatedで「作り話」のニュアンスを出す。",
    category: 'tech',
    subcategory: 'ai',
    situation: 'AIの回答を鵜呑みにして間違えた時',
  },
  {
    id: 'life-tech-047',
    japanese: 'スマホカメラのシャッター音うるさい',
    english: [
      "shutter sound is so loud",
      "the camera shutter sound on my phone is embarrassingly loud",
      "I tried to take a discreet photo and my phone made a shutter noise that the entire room heard",
      "I was in a quiet restaurant trying to photograph my food like a normal person in the twenty-first century. my phone made a noise like a paparazzi camera from the nineteen nineties. every single person looked at me. the waiter looked at me. a child at the next table looked at me. I could not explain that I was just taking a photo of pasta because by that point the damage to my reputation was already done."
    ],
    context: "日本のスマホはシャッター音必須(盗撮防止)だが英語圏は消せる。discretely/sneakilyは「こっそり」。shutter soundの文化差は日本特有の面白いトピック。英語圏の人にはwhy can't you turn it off?が最初の反応。法律の違いが技術仕様に出る珍しいケース。",
    category: 'tech',
    subcategory: 'smartphone',
    situation: '静かな場所でスマホで写真を撮ろうとした時',
  },
  {
    id: 'life-tech-048',
    japanese: 'キャッシュレスしか使えない',
    english: [
      "cashless only",
      "this place only takes cashless payments and I only have cash",
      "I walked into a store that doesn't accept cash and I'm standing here holding physical money like it's the wrong century",
      "I am holding ten thousand yen in my hand. real money. paper. issued by the government. legal tender. and this store will not accept it. they want me to tap my phone or wave a card. I have spent my whole life being told cash is king and now cash is apparently a peasant that is not welcome in certain establishments. the future arrived and it did not bring my wallet."
    ],
    context: "cashless/contactless paymentは「キャッシュレス決済」。tap to payは「タッチ決済」。cash is kingは英語のことわざ(現金最強)だが今は皮肉で使われる。日本は現金社会から急にキャッシュレスに変わった。英語圏(特に北欧)は先行。",
    category: 'tech',
    subcategory: 'payment',
    situation: '現金しか持ってないのにキャッシュレス限定の店に入った時',
  },
  {
    id: 'life-tech-049',
    japanese: 'アルゴリズムに見透かされてる',
    english: [
      "the algorithm knows me",
      "the algorithm is showing me exactly what I was just thinking about",
      "I was literally just talking about buying new shoes and now every ad on my phone is for shoes",
      "I mentioned sushi once. once. in a text message. not out loud. in a text. and now every ad on every platform is Japanese restaurants. Instagram shows me sushi reels. YouTube recommends sushi making videos. Google is suggesting sushi restaurants near me. either the algorithm is reading my messages or it has achieved a level of predictive intelligence that should terrify us all. I am going to mention yachts and see what happens."
    ],
    context: "the algorithm(アルゴリズム)は英語圏で擬人化されて語られる。targeted ads(ターゲット広告)は仕組みの名前。is my phone listening to me?は英語圏の定番陰謀論。日本語の「見透かされてる」は洞察のメタファー、英語はknows meで親密さの気持ち悪さを表現。",
    category: 'tech',
    subcategory: 'internet',
    situation: '自分の行動がアルゴリズムに完璧に予測されていると感じた時',
  },
  {
    id: 'life-tech-050',
    japanese: 'ネットない生活とか無理',
    english: [
      "can't live without internet",
      "I genuinely do not know how people survived without the internet",
      "the internet went down for two hours yesterday and I realized I have no idea how to function without it",
      "the internet went out. for two hours. and in those two hours I discovered that I do not know the answer to anything without Google. I do not know how to cook without a recipe app. I do not know what the weather is without checking. I do not know how to be bored without scrolling. two hours without internet and I regressed fifty years socially. our grandparents built houses. I could not figure out what to do with my hands."
    ],
    context: "internet went down/outは「ネット落ちた」。digital native(デジタルネイティブ)世代はネットなし生活を経験していない。FOMO(Fear Of Missing Out)は「取り残される恐怖」。日本語の「無理」は不可能宣言、英語はcan't function withoutで機能停止を表現する。",
    category: 'tech',
    subcategory: 'internet',
    situation: 'ネットが使えなくて何もできない時',
  },
];
