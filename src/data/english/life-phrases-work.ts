import type { LifePhrase } from './life-phrases';

export const workPhrases: LifePhrase[] = [
  {
    id: 'life-work-001',
    japanese: '今日残業確定だわ',
    english: [
      "working late tonight",
      "yeah I'm definitely working late tonight",
      "looks like I'm stuck here late tonight, no way around it",
      "I'm working late. again. third time this week. at this point I should just bring a sleeping bag and set up camp under my desk. my boss keeps saying 'just one more thing' like it's a Steve Jobs keynote except nothing revolutionary is happening. we're updating a spreadsheet. a spreadsheet."
    ],
    context: "「残業」にoverworkは重すぎ。日常ではwork late/stay lateが自然。日本語は名詞1つで済むけど、英語は「遅くまで働く」と動詞で言い直す。英語は行為を行為のまま動詞で言う言語。",
    category: 'work',
    subcategory: 'overtime',
    situation: '退勤時間が近づいてきたとき',
  },
  {
    id: 'life-work-002',
    japanese: '上司マジうざい',
    english: [
      "my boss sucks",
      "my boss is so freaking annoying",
      "I seriously can't stand my boss, he's driving me up the wall",
      "my boss is one of those people who sends you an email and then walks over to your desk to ask if you got the email. yes I got it. I got it three seconds ago. I haven't even opened it yet because you're standing here talking to me about the email I haven't read. this is my life now. this is what I trained four years in college for."
    ],
    context: "annoyingは「イラッとさせる」で万能。日本語の「うざい」は存在自体が不快、英語のannoyingは具体的行動にフォーカス。だから英語では理由をセットで言いがち。drive me up the wallは慣用句で「壁を登らせるほどイラつく」。",
    category: 'work',
    subcategory: 'boss',
    situation: '上司に振り回されたあと同僚に愚痴るとき',
  },
  {
    id: 'life-work-003',
    japanese: '会議長すぎ',
    english: [
      "meeting dragged on",
      "that meeting went on way too long",
      "that meeting could've been an email, honestly",
      "we just had a two-hour meeting about something that could have been covered in a three-line email. two hours. I watched the sun move across the sky through the conference room window. Dave brought up the same point four times using slightly different words each time like we wouldn't notice. we noticed, Dave. we all noticed."
    ],
    context: "drag onは「ズルズル長引く」感。could've been an emailは英語圏の定番ジョーク。日本語は「長い」で済むけど英語は「何に対して長いか」まで言う傾向がある。比較対象を出すと一気にネイティブっぽくなる。",
    category: 'work',
    subcategory: 'meeting',
    situation: '無駄に長い会議から戻ってきたとき',
  },
  {
    id: 'life-work-004',
    japanese: '通勤だるすぎ',
    english: [
      "hate the commute",
      "the commute is killing me",
      "I'm so sick of this commute, it drains all my energy",
      "my commute is an hour and fifteen minutes each way. each way. that's two and a half hours a day of just existing in a metal tube with strangers who all look like they've given up on life. which I guess makes sense because I've also given up on life. we're all just standing there marinating in our collective despair."
    ],
    context: "commuteは名詞でも動詞でも使える便利な単語。is killing meは「死ぬほどつらい」の定番。日本語の「だるい」は身体感覚だけど、英語ではkillingやdrainingで「何かに奪われてる」と表現する。受動的な疲労を能動的に描く。",
    category: 'work',
    subcategory: 'commute',
    situation: '朝の満員電車で消耗したとき',
  },
  {
    id: 'life-work-005',
    japanese: '給料日まだかな',
    english: [
      "payday yet?",
      "is it payday yet or what",
      "I keep checking my calendar waiting for payday to come",
      "it's the 18th. payday is the 25th. that's seven more days of pretending I don't need money. I've been eating rice and eggs for three days straight. not because I'm on some diet, just because my bank account has the personality of a ghost town. seven more days. I can do this. I've done harder things. probably."
    ],
    context: "paydayは一語で「給料日」。英語は曜日と同じノリで扱う。Is it X yet?は「まだ来ないの？」の待ちきれない感じ。yet単体で「もう？」の焦燥感を出せるのが英語のコスパの良さ。",
    category: 'work',
    subcategory: 'salary',
    situation: '月末近くで金欠のとき',
  },
  {
    id: 'life-work-006',
    japanese: '有給使いたいけど空気読むと無理',
    english: [
      "can't take time off",
      "I wanna take a day off but the vibe won't let me",
      "I have paid leave piling up but nobody takes it so I can't either",
      "I have like twenty days of paid leave saved up. twenty. that's almost a month of freedom just sitting there collecting dust. but every time I think about using one I look around the office and everyone's grinding away like it's some kind of endurance contest and I think okay maybe next month. I've been saying next month since April."
    ],
    literal: '空気を読むと無理 = "if I read the air, it\'s impossible"',
    context: "「空気読む」は英語に直訳不可。the vibe won't let meが近い。英語にはread the roomがあるけどこれは「場の雰囲気を察しろ」で命令形。日本語の「空気読む」は自分が察する側。この主語の違いが文化の違いそのもの。",
    category: 'work',
    subcategory: 'paid-leave',
    situation: '有給を取りたいけど周りの目が気になるとき',
  },
  {
    id: 'life-work-007',
    japanese: '飲み会めんどくさ',
    english: [
      "don't wanna go",
      "ugh, another work drinking thing",
      "I really don't feel like going to this after-work thing tonight",
      "we have a team dinner tonight. mandatory fun. my favorite kind of fun. I'm going to sit there for three hours nursing one beer while my boss tells the same story about his college rugby days for the nine hundredth time. then I'll miss the last train and spend forty bucks on a cab. this is team building apparently."
    ],
    context: "「飲み会」は英語にない概念。work drinks/after-work thingが近い。mandatory funは「強制的な楽しみ」で皮肉たっぷりの英語表現。日本語の「めんどくさい」はcan't be botheredが一番近いけど、don't feel like itの方が日常的。",
    category: 'work',
    subcategory: 'drinking-party',
    situation: '仕事終わりに飲み会が控えてるとき',
  },
  {
    id: 'life-work-008',
    japanese: 'もう辞めたい',
    english: [
      "I wanna quit",
      "I seriously wanna quit this job",
      "I've had it, I honestly want to just quit and walk out",
      "I want to quit. I've wanted to quit every single day for the past six months. I have a resignation letter saved as a draft on my phone. I update it weekly. it's the most creative writing I've ever done. but then rent is due and my cat needs food and suddenly I'm back at my desk at 9 AM like nothing happened. capitalism wins again."
    ],
    context: "quitは「辞める」の一番カジュアルな言い方。resignはフォーマル。I've had itは「もう限界」の定番フレーズ。日本語は「辞めたい」と願望で止まるけど、英語はwant to quit and walk outまで行動を具体化しがち。",
    category: 'work',
    subcategory: 'quitting',
    situation: '仕事に嫌気がさしたとき',
  },
  {
    id: 'life-work-009',
    japanese: 'プレゼン緊張する',
    english: [
      "nervous about presenting",
      "I'm so nervous about this presentation",
      "I have a presentation coming up and my stomach's already in knots",
      "I have to present in front of thirty people tomorrow. thirty. I've been practicing in front of my mirror and my reflection looks bored. that's not a good sign. I keep forgetting what comes after slide seven. I've rewritten slide seven fourteen times. at this point slide seven is my nemesis. slide seven is winning."
    ],
    context: "stomach's in knotsは「胃が結び目になる」で緊張の身体表現。日本語は「緊張する」と感情を直接言うけど、英語は身体症状で表すことが多い。butterflies in my stomachも定番。体の反応で感情を語るのが英語の癖。",
    category: 'work',
    subcategory: 'presentation',
    situation: 'プレゼンの前日や直前',
  },
  {
    id: 'life-work-010',
    japanese: '締切やばい',
    english: [
      "deadline's coming",
      "the deadline is way too close",
      "the deadline's breathing down my neck and I'm nowhere near done",
      "the deadline is Friday. today is Wednesday. I'm about thirty percent done. thirty. and that's being generous with myself. I keep telling myself I work better under pressure which is a lie I've been repeating since college. I don't work better under pressure. I just panic more efficiently. there's a difference."
    ],
    context: "breathing down my neckは「首筋に息がかかるほど迫ってる」で圧迫感の表現。日本語の「やばい」は状況全体を一語で片付けるけど、英語は「何がどうやばいのか」を描写する。nowhere near doneは「全然終わってない」の強調。",
    category: 'work',
    subcategory: 'deadline',
    situation: '締切が迫ってきたとき',
  },
  {
    id: 'life-work-011',
    japanese: '今日サボりてぇ',
    english: [
      "wanna skip work",
      "I really wanna blow off work today",
      "I don't feel like going in today, I just wanna stay home",
      "my alarm went off at seven and I laid there staring at the ceiling doing the math. if I call in sick that's one sick day gone. but if I go in I'll be miserable for eight hours. eight hours of misery versus one sick day. the math is clear. the math has always been clear. but I'm getting dressed anyway because guilt is a powerful motivator."
    ],
    context: "blow offは「すっぽかす」でカジュアル。call in sickは「電話して病欠する」の定番。日本語の「サボる」はフランス語sabotageが語源だけど、英語のsabotageは破壊工作。skip/blow offの方が軽くてちょうどいい。",
    category: 'work',
    subcategory: 'slacking',
    situation: '朝起きて仕事に行きたくないとき',
  },
  {
    id: 'life-work-012',
    japanese: '社畜だわ俺',
    english: [
      "total corporate slave",
      "I'm basically a corporate drone at this point",
      "I live to work instead of working to live, and I know it",
      "I woke up at six. commuted for an hour. worked for ten hours. commuted back. ate a convenience store bento alone in my apartment. watched thirty minutes of YouTube. fell asleep on the couch. woke up at six. this is not living. this is a very elaborate hamster wheel with fluorescent lighting and a dress code."
    ],
    literal: '社畜 = "company livestock"',
    context: "「社畜」は英語に直訳できない日本独自の概念。corporate slaveは近いけど英語圏ではslaveryの重さがある。droneは「働き蜂」で皮肉っぽい。live to work vs work to liveは英語の有名な対比表現。",
    category: 'work',
    subcategory: 'corporate-life',
    situation: '自分の生活が仕事だけだと気づいたとき',
  },
  {
    id: 'life-work-013',
    japanese: 'クレーム対応疲れた',
    english: [
      "dealing with complaints",
      "I'm so tired of handling complaints all day",
      "I spent the whole day dealing with angry customers and I'm drained",
      "this lady called and yelled at me for forty minutes about something that wasn't even our fault. forty minutes. I just sat there saying 'I understand your frustration' on repeat like a customer service robot. I do not understand her frustration. I understand my own frustration. my frustration is that I am here listening to this."
    ],
    context: "deal withは「対処する」の万能動詞。handleもOK。日本語の「クレーム」は英語のclaimと違って苦情の意味。英語ではcomplaintが正解。claimは「主張・請求」。和製英語トラップの代表格。",
    category: 'work',
    subcategory: 'complaints',
    situation: 'クレーム対応で精神的に疲弊したとき',
  },
  {
    id: 'life-work-014',
    japanese: '転職しようかな',
    english: [
      "thinking about switching",
      "I've been thinking about changing jobs",
      "I've been seriously considering looking for a new job lately",
      "I updated my resume last night. just to see. just as a thought experiment. I'm not really going to send it anywhere. except I already sent it to three places. and I've been checking LinkedIn on my phone in the bathroom at work. which feels like I'm cheating on my company. but my company cheated on me first when they didn't give me a raise."
    ],
    context: "「転職」はchange jobs/switch jobsが自然。英語にはjob-hoppingという語もあるけどネガティブ。日本語は「転職」と中立だけど英語は「今の仕事を辞めて別のに移る」と2ステップで考える。動作を分解する言語。",
    category: 'work',
    subcategory: 'career-change',
    situation: '今の仕事に不満を感じて転職を考え始めたとき',
  },
  {
    id: 'life-work-015',
    japanese: '同僚に恵まれてるわ',
    english: [
      "great coworkers though",
      "honestly I'm lucky to have good coworkers",
      "the job's not perfect but my coworkers make it worth showing up",
      "my coworkers are the only reason I haven't lost my mind. like yesterday when I was drowning in emails, Tanaka just quietly put a coffee on my desk and walked away. no words. just coffee. that's love. that's better than love. my ex never put a coffee on my desk. Tanaka gets me in ways romantic partners never have."
    ],
    context: "I'm lucky toは「恵まれてる」の自然な言い方。blessedも使うけど宗教色が出る。make it worth itは「それだけの価値がある」。日本語の「恵まれる」は受動的だけど英語はI'm luckyと自分主語で言う。感謝も主語は自分。",
    category: 'work',
    subcategory: 'coworkers',
    situation: '同僚のおかげで仕事が楽しいと感じたとき',
  },
  {
    id: 'life-work-016',
    japanese: 'メール返すのめんどい',
    english: [
      "emails piling up",
      "I really don't wanna reply to these emails",
      "I have like fifty unread emails and zero motivation to open any of them",
      "I have a hundred and twelve unread emails. a hundred and twelve. some of them are from last week. some might be important. but opening them means I have to do things and doing things is the exact opposite of what I want right now. I'm going to get another coffee first. that's productive. coffee is basically working."
    ],
    context: "pile upは「積み上がる」で溜まった感じが出る。don't wanna replyが一番素直。日本語の「めんどい」は行動への億劫さだけど、英語はzero motivationと「やる気がない」に変換する方が自然。原因じゃなく状態で語る。",
    category: 'work',
    subcategory: 'email',
    situation: '未読メールが溜まって見たくないとき',
  },
  {
    id: 'life-work-017',
    japanese: 'やっと金曜だ',
    english: [
      "finally Friday",
      "thank God it's Friday",
      "it's finally Friday, I've been waiting for this all week",
      "it's Friday. I made it. I survived another week of pretending to be a functional adult in a professional environment. five whole days of wearing pants and making eye contact and using my indoor voice. now I get two days of being the gremlin I truly am. I'm not leaving my apartment until Monday morning. nobody can make me."
    ],
    context: "TGIFはThank God It's Fridayの略で文化的定番。レストランチェーン名にもなってる。日本語は「やっと」に安堵感を込めるけど、英語はI made it/I survivedと「生き延びた」大げさ表現で同じ感情を出す。",
    category: 'work',
    subcategory: 'weekend',
    situation: '金曜の退勤時間',
  },
  {
    id: 'life-work-018',
    japanese: '月曜がつらい',
    english: [
      "Monday blues",
      "Mondays hit different, and not in a good way",
      "I can already feel the Monday dread creeping in on Sunday night",
      "it's Sunday at 8 PM and I can feel Monday approaching like a storm on the horizon. my body is already rejecting the concept of tomorrow. I haven't ironed my shirt. I haven't packed my bag. I'm just lying here like a starfish absorbing the last few hours of freedom. someone should invent a three-day weekend. permanently."
    ],
    context: "Monday bluesは「月曜の憂鬱」の定番表現。Sunday scariesは日曜夜に月曜を恐れる現象。dreadは「恐怖感」でfearより重い。creep inは「じわじわ忍び寄る」。英語は感情を擬人化して「やってくるもの」として扱う癖がある。",
    category: 'work',
    subcategory: 'monday',
    situation: '日曜夜から月曜にかけての憂鬱',
  },
  {
    id: 'life-work-019',
    japanese: 'あの人仕事できるよね',
    english: [
      "they're really good",
      "that person really knows what they're doing",
      "I gotta hand it to them, they're really good at their job",
      "you know Suzuki from accounting? that person finishes in two hours what takes me an entire day. and it's not like they're rushing either. they're just calm and efficient like some kind of work robot. meanwhile I'm over here accidentally CCing the whole company on a personal email. we are not the same."
    ],
    context: "「仕事できる」はgood at their jobが直球。know what they're doingは「分かってやってる感」が出る。I gotta hand it toは「認めざるを得ない」。日本語は「できる」と能力を言うけど英語は「何をどう上手くやるか」を具体化する。",
    category: 'work',
    subcategory: 'coworkers',
    situation: '仕事ができる同僚について話すとき',
  },
  {
    id: 'life-work-020',
    japanese: '新人に教えるの大変',
    english: [
      "training the new guy",
      "training the new person is exhausting",
      "explaining everything from scratch to the new hire is way more tiring than I expected",
      "I spent three hours today explaining how to use the copy machine. three hours. I didn't even know the copy machine had that many functions. at one point the new hire asked me a question and I didn't know the answer so I just confidently made something up. now I'm the expert on copy machine features that might not exist. this is management."
    ],
    context: "new hire/new guyが「新人」の自然な言い方。rookieはスポーツ寄り。from scratchは「ゼロから」。日本語は「教える」で済むけど英語はtrain/explain/show/walk throughと教え方の種類で動詞が変わる。",
    category: 'work',
    subcategory: 'training',
    situation: '新人教育で疲弊しているとき',
  },
  {
    id: 'life-work-021',
    japanese: '今の仕事向いてないかも',
    english: [
      "not cut out for this",
      "I don't think this job is really for me",
      "honestly I'm starting to think I'm not cut out for this kind of work",
      "I've been doing this job for three years and I still feel like I'm faking it. everyone else seems to know what they're doing and I'm just here nodding along in meetings pretending I understand what's going on. maybe I missed the day they explained everything. maybe that day was a Monday and I was too depressed to pay attention."
    ],
    context: "not cut out forは「向いてない」のど真ん中表現。cut outは「型で切り抜かれた」が語源で「その型に合ってない」。日本語は「向いてない」と方向のメタファーだけど英語は「型抜き」のメタファー。文化によって比喩が違う。",
    category: 'work',
    subcategory: 'career',
    situation: '自分の仕事への適性に疑問を感じたとき',
  },
  {
    id: 'life-work-022',
    japanese: 'ボーナス少なっ',
    english: [
      "bonus was weak",
      "my bonus was a joke this time",
      "I looked at my bonus and honestly thought there was a mistake",
      "my bonus dropped this year. I won't say by how much because it's embarrassing. let's just say I was planning a trip to Okinawa and now I'm planning a trip to the convenience store. for a luxury cup noodle. that's my vacation. a cup noodle with extra toppings. seafood flavor. I deserve seafood flavor at minimum."
    ],
    context: "bonusはそのまま通じる。a jokeは「冗談みたいな額」。日本語は「少なっ」と感嘆で終わるけど、英語はI thought there was a mistakeと具体的リアクションで表す。感情を状況描写に変換するのが英語の表現法。",
    category: 'work',
    subcategory: 'salary',
    situation: 'ボーナスの明細を見たとき',
  },
  {
    id: 'life-work-023',
    japanese: 'また会議入れられた',
    english: [
      "another meeting",
      "they just threw another meeting on my calendar",
      "someone just added another meeting to my schedule without even asking",
      "I had one free hour today. one beautiful hour between two and three where I was going to actually get work done. and then someone booked a meeting right in the middle of it. for what? to discuss the results of the last meeting. we're having meetings about meetings now. it's meetings all the way down."
    ],
    context: "throw/addで「入れる」。without askingが日本語の受動的な怒りを表現。日本語は「入れられた」と受身形で迷惑を表すけど、英語に迷惑の受身はない。代わりにwithout askingで「勝手に」を足して不満を出す。",
    category: 'work',
    subcategory: 'meeting',
    situation: '予定になかった会議がねじ込まれたとき',
  },
  {
    id: 'life-work-024',
    japanese: '定時で帰りたい',
    english: [
      "wanna leave on time",
      "I just wanna clock out on time for once",
      "is it too much to ask to leave work at a normal hour for once",
      "I haven't left on time in three weeks. three weeks. I don't even remember what daylight looks like after 5 PM. my apartment misses me. my couch misses me. the leftover pizza in my fridge is developing its own ecosystem because I'm never home long enough to eat it. I just want to walk out at five like a normal human being."
    ],
    context: "clock outは「退勤する」のカジュアル表現。定時はon timeで十分。日本語の「定時」は固有名詞的に使うけど英語はnormal hour/regular timeと一般的に言う。for onceは「一回くらい」で控えめな願望を表す。",
    category: 'work',
    subcategory: 'overtime',
    situation: '残業が続いて定時退勤に憧れるとき',
  },
  {
    id: 'life-work-025',
    japanese: 'リモートワーク最高',
    english: [
      "remote work rules",
      "working from home is honestly the best",
      "remote work is the greatest thing that ever happened to my career",
      "I'm on a conference call right now with my camera off and I'm still in my underwear. it's 2 PM. I had lunch on my couch watching a cooking show. my productivity is actually higher because I'm not spending two hours commuting or forty minutes pretending to care about Dave's weekend. remote work is the future and the future is wearing no pants."
    ],
    context: "rules/is the bestはカジュアルな最上級表現。work from home(WFH)とremote workは微妙に違う。WFHは家限定、remoteはどこでもOK。日本語は「リモート」で一括りだけど英語では場所の自由度で使い分ける。",
    category: 'work',
    subcategory: 'remote-work',
    situation: '在宅勤務の快適さを実感したとき',
  },
  {
    id: 'life-work-026',
    japanese: '明日のプレゼン資料まだできてない',
    english: [
      "slides aren't done",
      "my presentation slides still aren't done",
      "the presentation is tomorrow and I haven't even finished my slides yet",
      "my presentation is in fourteen hours and I have exactly six slides done out of twenty. six. the first three are just title pages because I was procrastinating by making the design look nice. so really I have three slides of actual content. for a twenty-slide presentation. due tomorrow. I should probably stop counting and start typing."
    ],
    context: "slidesはプレゼン資料の口語。deckもよく使う。still aren'tは「まだできてない」の焦り。日本語は「できてない」と完了の否定だけど、英語はhaven't finished yetと「まだ終わってない」と過程の途中を強調する。",
    category: 'work',
    subcategory: 'presentation',
    situation: 'プレゼン前日に資料が未完成のとき',
  },
  {
    id: 'life-work-027',
    japanese: '仕事終わんない',
    english: [
      "never-ending work",
      "this work just never ends, does it",
      "no matter how much I do, the work just keeps piling up",
      "I finished five tasks today. five. and somehow my to-do list is longer than it was this morning. it's like fighting a hydra. you cut off one task and two more grow in its place. I'm convinced someone is secretly adding things to my list while I'm in the bathroom. that's the only logical explanation. work is infinite. I am not."
    ],
    context: "pile upは「積み上がる」で仕事の増殖感。never endsは直球だけど自然。日本語の「終わんない」は結果の否定だけど、英語はkeeps piling upと「増え続けるプロセス」として描く。静的vs動的の違い。",
    category: 'work',
    subcategory: 'workload',
    situation: '仕事が一向に減らないとき',
  },
  {
    id: 'life-work-028',
    japanese: 'あいつまたサボってる',
    english: [
      "slacking off again",
      "that guy's slacking off again, look at him",
      "he's been on his phone for the past hour pretending to work",
      "Yamada has been 'checking something on his phone' for the past ninety minutes. ninety minutes. I can see his screen from here and that is definitely not a work email. that's a horse racing app. and the worst part is he'll still get the same paycheck as me at the end of the month. meritocracy is a myth."
    ],
    context: "slack offは「サボる」の英語ど真ん中。goof offも使える。pretending toは「フリをする」で具体的行動を描写。日本語の「サボる」は状態だけど英語は「何をして何をしてないか」を細かく描く。証拠を積む言語。",
    category: 'work',
    subcategory: 'slacking',
    situation: '同僚がサボっているのを目撃したとき',
  },
  {
    id: 'life-work-029',
    japanese: '昇給してほしい',
    english: [
      "need a raise",
      "I seriously need a raise at this point",
      "with everything I'm doing, I really think I deserve a raise",
      "I've taken on three extra responsibilities this year. three. I'm basically doing two people's jobs for one person's salary. I rehearsed asking for a raise in the shower this morning. it was very convincing. I had data, I had passion, I had a closing statement. then I got to the office and my boss looked busy so I just said good morning and sat down."
    ],
    context: "raiseは昇給の口語。pay raiseとも。I deserve a raiseは直球の主張。日本語は「してほしい」と希望だけど英語はI deserveと「自分が値する」と権利として主張する。この自己主張の温度差が日英の最大の差。",
    category: 'work',
    subcategory: 'salary',
    situation: '仕事量に対して給料が見合ってないと感じたとき',
  },
  {
    id: 'life-work-030',
    japanese: '電話対応苦手',
    english: [
      "hate phone calls",
      "I'm terrible at handling phone calls",
      "every time the office phone rings, my soul leaves my body for a second",
      "the phone rang and I stared at it for three rings hoping someone else would pick it up. nobody did. so I answered and immediately forgot how to speak like a normal person. I said 'hello this is yes' which is not a sentence. the caller paused. I paused. we were both confused. this is why I went into a career with email."
    ],
    context: "I'm terrible atは「苦手」の自然な言い方。bad atでもOK。日本語の「苦手」は能力の話だけど英語ではterrible/bad/not great atと程度のグラデーションがある。my soul leaves my bodyは大げさだけどネイティブもよく使う誇張表現。",
    category: 'work',
    subcategory: 'phone',
    situation: '仕事の電話に出なきゃいけないとき',
  },
  {
    id: 'life-work-031',
    japanese: '上司に気に入られたい',
    english: [
      "wanna impress the boss",
      "I'm lowkey trying to get on my boss's good side",
      "I've been trying to make a good impression on my boss lately",
      "I brought my boss coffee this morning. not because I'm a nice person but because my performance review is next month and I need every advantage I can get. I also laughed at his joke in the meeting. it wasn't funny. nothing he says is funny. but I laughed like it was peak comedy. I'm not proud of who I'm becoming but I want that promotion."
    ],
    context: "get on someone's good sideは「気に入られる」の定番。brown-noseは「ゴマをする」だけど下品。日本語の「気に入られたい」は受動的だけど英語はget on/make an impressionと自分からアクションを起こす表現になる。",
    category: 'work',
    subcategory: 'boss',
    situation: '上司からの評価を気にしているとき',
  },
  {
    id: 'life-work-032',
    japanese: '今日の仕事終わった感ない',
    english: [
      "doesn't feel done",
      "I left work but it doesn't feel like I'm done",
      "I'm home but my brain's still at the office, I can't switch off",
      "I'm sitting on my couch in my pajamas and my brain is still sending me work notifications. did I reply to that email? did I save that file? is the meeting room booked for tomorrow? I can't turn it off. my body clocked out at six but my brain is working unpaid overtime. somebody tell my brain about labor laws."
    ],
    context: "can't switch offは「切り替えられない」の英語的表現。日本語は「終わった感がない」と感覚で語るけど、英語はmy brain's still at the officeと脳を擬人化して「まだオフィスにいる」と言う。体と脳を分離する発想が英語的。",
    category: 'work',
    subcategory: 'work-life-balance',
    situation: '退勤後も仕事のことが頭から離れないとき',
  },
  {
    id: 'life-work-033',
    japanese: '朝礼だるい',
    english: [
      "morning meetings ugh",
      "the morning meeting is pointless honestly",
      "I don't understand why we need to stand around every morning saying the same things",
      "every morning at 8:45 we gather in a circle and take turns saying what we're going to do today. which is the same thing we do every day. I'm going to answer emails and go to meetings. that's it. that's what I do. I've been saying this for two years. nobody has ever said anything surprising. nobody ever will."
    ],
    context: "「朝礼」は英語圏にない文化。morning meeting/morning standupが近い。pointlessは「意味がない」で強い。日本語は「だるい」と身体感覚で言うけど英語はpointless/waste of timeと論理的に「無意味」と切る。感覚vs論理。",
    category: 'work',
    subcategory: 'routine',
    situation: '毎朝の朝礼にうんざりしているとき',
  },
  {
    id: 'life-work-034',
    japanese: 'エクセルと格闘中',
    english: [
      "fighting with Excel",
      "I've been wrestling with this spreadsheet all day",
      "this Excel file is destroying me, nothing is working the way it should",
      "I've been staring at this spreadsheet for four hours. the formula says error. I don't know what error. it just says error. I deleted a row and suddenly everything turned into hashtags. hashtags everywhere. my spreadsheet looks like a Twitter trending page. I'm a college graduate. I should be able to do this. I cannot do this."
    ],
    context: "wrestle with/fight withは「格闘する」の自然な英語。日本語は「格闘」と名詞だけど英語は動詞で戦いを描く。destroying meは「俺を破壊してる」で大げさだけど日常的。英語は問題を擬人化して敵にするのが好き。",
    category: 'work',
    subcategory: 'desk-work',
    situation: 'エクセル作業で苦戦しているとき',
  },
  {
    id: 'life-work-035',
    japanese: 'お昼何食べよ',
    english: [
      "what's for lunch",
      "what should I get for lunch today",
      "it's the hardest decision of my day and it's only about lunch",
      "it's 11:30 and the lunch question has entered my brain. the ramen place is good but I went there yesterday. the curry place is too far. the convenience store is too sad. the cafeteria is too cafeteria. I've been thinking about this for twenty minutes which is longer than I spent on any actual work task today. priorities."
    ],
    context: "what's for lunch?はランチの定番フレーズ。what should I getは「何にしよう」。日本語は「食べよう」と行為で言うけど英語はgetで「手に入れる」。食べることより入手する過程に焦点。英語は結果より過程を動詞にしがち。",
    category: 'work',
    subcategory: 'lunch',
    situation: 'お昼前に何を食べるか考えるとき',
  },
  {
    id: 'life-work-036',
    japanese: 'PCフリーズした最悪',
    english: [
      "computer froze",
      "my computer just froze, are you kidding me",
      "my computer crashed and I hadn't saved anything in the past hour",
      "my computer froze. right in the middle of me typing. I hadn't saved in forty minutes. forty minutes of work just floating in digital limbo. I'm watching the loading circle spin and praying to every deity I can think of. please come back. I'll be better. I'll save every five minutes. I'll never take you for granted again."
    ],
    context: "freezeは「固まる」、crashは「落ちる」で微妙に違う。freezeは画面が止まる、crashは完全に終了する。are you kidding meは「マジかよ」の定番リアクション。英語はPCを擬人化して「裏切られた」感を出すのが定番。",
    category: 'work',
    subcategory: 'desk-work',
    situation: '作業中にPCがフリーズしたとき',
  },
  {
    id: 'life-work-037',
    japanese: 'この仕事意味あんの',
    english: [
      "what's the point",
      "does any of this even matter honestly",
      "I'm sitting here doing this and genuinely wondering what the point is",
      "I just spent two hours making a report that nobody is going to read. I know nobody's going to read it because nobody read the last one or the one before that. I checked. zero views. I'm basically writing a diary for the company server. an expensive diary that requires color-coded charts and proper formatting. for an audience of zero."
    ],
    context: "what's the pointは「何の意味があるの」で存在意義への疑問。does it matterは「重要か」。日本語は「意味ある？」と短く聞くけど英語はwhat's the pointと「ポイント（要点）は何？」と構造を問う。抽象的な問いを具体化する言語。",
    category: 'work',
    subcategory: 'meaning',
    situation: '仕事の意義を見失ったとき',
  },
  {
    id: 'life-work-038',
    japanese: '今日めっちゃ仕事はかどった',
    english: [
      "super productive today",
      "I was on fire today, got so much done",
      "I had one of those rare days where everything just clicked and I crushed it",
      "I don't know what happened today but I was a machine. I cleared my entire inbox. I finished two reports. I even volunteered for extra work which is something I've literally never done before. I think it was the coffee. or the good night's sleep. or the alignment of the planets. whatever it was I need to bottle it and sell it."
    ],
    context: "on fireは「絶好調」。productiveは「生産性が高い」でビジネス寄り。crushed itは「やり遂げた」のスラング。日本語の「はかどる」は進捗の話だけど英語はon fire/in the zoneと状態を描写する。結果より感覚で語る。",
    category: 'work',
    subcategory: 'productivity',
    situation: '仕事が順調に進んだ日の退勤時',
  },
  {
    id: 'life-work-039',
    japanese: '異動になるかも',
    english: [
      "might get transferred",
      "there's a chance I'm getting transferred",
      "I heard I might be getting moved to a different department soon",
      "my manager casually mentioned a possible transfer yesterday like it was no big deal. just dropped it in between talking about lunch and the weather. excuse me? you're rearranging my entire life and you're sandwiching it between soba noodles and rain? I don't even know if it's a promotion or a demotion. the ambiguity is the worst part."
    ],
    context: "get transferredは「異動になる」。moveも使える。日本語は「異動」で中立だけど英語はtransfer/move/reassignとニュアンスが微妙に違う。there's a chanceは「可能性がある」で不確実さを表す。mightより客観的。",
    category: 'work',
    subcategory: 'career',
    situation: '異動の噂を聞いたとき',
  },
  {
    id: 'life-work-040',
    japanese: '後輩が優秀すぎて焦る',
    english: [
      "junior's too good",
      "the new junior is way too sharp and it's making me nervous",
      "my junior is outperforming me and I'm trying not to panic about it",
      "the person who joined six months after me just solved a problem in thirty minutes that I'd been stuck on for a week. a week. and they did it while eating a sandwich. casually. with one hand. I have five years of experience. five years. and this person is speed-running my entire career while having lunch. I need to either study harder or retire."
    ],
    context: "juniorは後輩だけど英語では年齢より入社時期で使う。outperformは「上回る」でフォーマル。日本語の「焦る」はanxious/nervousだけど、making me nervousの方が「原因が外にある」感じで自然。焦りの原因を外部化する。",
    category: 'work',
    subcategory: 'coworkers',
    situation: '後輩の成長に危機感を感じたとき',
  },
  {
    id: 'life-work-041',
    japanese: '今日の打ち合わせ何も決まらなかった',
    english: [
      "nothing got decided",
      "we had a whole meeting and decided literally nothing",
      "we talked for an hour and walked out with zero decisions made",
      "we had a one-hour meeting with eight people. that's eight person-hours of company time. and the conclusion was 'let's think about it and reconvene next week.' reconvene. to think about it more. we're paying eight people to collectively think about thinking. this company is a philosophy department with a revenue problem."
    ],
    context: "decided nothingとnothing got decidedは同じだけど後者は「何も決まらなかった」と結果にフォーカス。日本語は「決まらなかった」と受動的だけど英語もgot decidedと受動態を使うと同じニュアンスが出る。珍しく日英が一致する構造。",
    category: 'work',
    subcategory: 'meeting',
    situation: '中身のない会議の後',
  },
  {
    id: 'life-work-042',
    japanese: '名刺切らしてた',
    english: [
      "out of business cards",
      "I just realized I'm out of business cards",
      "I went to hand someone my card and realized I'd completely run out",
      "I reached into my card holder in front of a client and it was empty. completely empty. I did that thing where you keep searching the same pocket over and over like cards are going to materialize from another dimension. they did not. I ended up writing my email on a sticky note like some kind of caveman. very professional."
    ],
    context: "run out ofは「切らす」の定番。out ofでもOK。business cardは名刺。日本語の「切らす」は在庫管理的だけど英語はrun outで「走り去る」イメージ。モノが自分から逃げていく感覚。英語は無生物を主語にして動かすのが好き。",
    category: 'work',
    subcategory: 'business',
    situation: '名刺交換の場面で名刺がないことに気づいたとき',
  },
  {
    id: 'life-work-043',
    japanese: '今日ノー残業デーだって嘘だろ',
    english: [
      "no overtime day, right",
      "they're calling it a no-overtime day but nobody actually leaves",
      "it's supposed to be no-overtime day but everyone's still here working anyway",
      "today is officially no-overtime day. the lights are supposed to turn off at six. it's 6:30 and I'm sitting here in the dark typing on my laptop like some kind of office gremlin. half the floor is still here. we're all just pretending the policy exists while simultaneously ignoring it. this is performance art at this point."
    ],
    context: "no-overtime dayは直訳でそのまま通じる。supposed toは「〜のはずなのに」で理想と現実のギャップ。日本語の「嘘だろ」はyou're kidding/no wayだけど、文脈ではsupposed toの方が皮肉が効く。",
    category: 'work',
    subcategory: 'overtime',
    situation: 'ノー残業デーなのに誰も帰らないとき',
  },
  {
    id: 'life-work-044',
    japanese: '報連相ってめんどくないすか',
    english: [
      "too many updates",
      "reporting everything is honestly so tedious",
      "do we really need to report, inform, and consult on every single thing",
      "I just want to do my job. just let me do the thing. but no, first I have to report that I'm going to do the thing, then inform people while I'm doing the thing, then consult about how the thing went after I did the thing. the thing itself takes ten minutes. the reporting about the thing takes an hour. the thing is drowning in meta-thing."
    ],
    literal: '報連相 = "report-contact-consult" (sounds like spinach/ほうれん草)',
    context: "報連相は日本企業の文化で英語に一語で対応する概念がない。keep everyone in the loopが一番近い。英語圏は「必要な人に必要な時だけ」で日本の「全部共有」と真逆。ダジャレ(ほうれん草)も当然通じない。",
    category: 'work',
    subcategory: 'corporate-life',
    situation: '報連相の文化に疲れたとき',
  },
  {
    id: 'life-work-045',
    japanese: '寝坊して遅刻した',
    english: [
      "overslept, was late",
      "I overslept and showed up late to work",
      "I slept through my alarm and walked in twenty minutes late",
      "my alarm went off at seven. I know it went off because I turned it off. apparently I turned it off and went back to sleep without forming a single conscious memory. I woke up at 7:45 and achieved a new personal record for fastest shower and commute. I walked in pretending to be calm but my shirt was inside out. nobody said anything. they knew."
    ],
    context: "oversleepは「寝坊する」の一語完結。sleep through my alarmは「アラームを突き抜けて寝る」で状況が見える。日本語の「寝坊」は名詞で簡潔だけど英語は原因(slept through alarm)と結果(was late)を分けて言う。",
    category: 'work',
    subcategory: 'commute',
    situation: '寝坊して遅刻した日の朝',
  },
  {
    id: 'life-work-046',
    japanese: 'やりがいはあるんだけどね',
    english: [
      "it's rewarding though",
      "I mean the work itself is rewarding, I'll give it that",
      "the job has its problems but I can't deny it's fulfilling in its own way",
      "the pay is bad. the hours are long. my boss is difficult. the commute is painful. but when I finish a project and the client says thank you, something in my chest goes warm for about three seconds. three seconds of warmth per month of suffering. that's the exchange rate. and somehow it's enough to keep me coming back. I might need therapy."
    ],
    context: "rewardingは「やりがいがある」のど真ん中。fulfillはもっと深い充実感。日本語の「やりがい」は名詞だけど英語にはdoable-worthyみたいな一語がない。rewardingは「報われる感」で近いけどお金の報酬も含むので文脈が大事。",
    category: 'work',
    subcategory: 'meaning',
    situation: '仕事の不満を言いつつもやりがいを認めるとき',
  },
  {
    id: 'life-work-047',
    japanese: 'Slack通知止まんないんだけど',
    english: [
      "notifications won't stop",
      "my Slack notifications are completely out of control",
      "I can't get anything done because Slack keeps blowing up every two seconds",
      "I muted one channel and three more started pinging me. it's like whack-a-mole except the moles are coworkers who need things from me. I put my status as 'focusing' and someone DM'd me to ask what I was focusing on. that is the opposite of letting me focus. I'm going to throw my laptop into the ocean. a peaceful, notification-free ocean."
    ],
    context: "blowing upは「鳴りまくる」でスマホ/アプリの通知に使う定番。won't stopは「止まらない」で無生物をwillで擬人化してる。英語は通知を「自分の意思を持った存在」として語るのが面白い。モノに意志がある前提の言語。",
    category: 'work',
    subcategory: 'desk-work',
    situation: '仕事中にチャットの通知が鳴り止まないとき',
  },
  {
    id: 'life-work-048',
    japanese: '二日酔いで仕事つらい',
    english: [
      "hungover at work",
      "I'm so hungover and pretending to function at work",
      "I came to work with a massive hangover and I'm barely holding it together",
      "my head is splitting. my stomach is negotiating its own exit strategy. I'm sitting at my desk wearing sunglasses indoors and nobody has questioned it which means I either look cool or I look so bad that everyone's too scared to say anything. I have a meeting at 10. the fluorescent lights are going to finish what the tequila started."
    ],
    context: "hungoverは「二日酔い」の形容詞。have a hangoverと名詞でも使える。pretending to functionは「機能してるフリ」で社会人の痛みが詰まった表現。日本語は「つらい」で済むけど英語はbarely holding it togetherと崩壊寸前を描く。",
    category: 'work',
    subcategory: 'drinking-party',
    situation: '飲み会の翌日に二日酔いで出社したとき',
  },
  {
    id: 'life-work-049',
    japanese: '今の会社もう3年か',
    english: [
      "three years already",
      "I can't believe I've been here three years already",
      "it just hit me that I've been at this company for three whole years",
      "three years. one thousand and ninety-five days. give or take. that's a lot of mornings of putting on the same badge and walking through the same door and sitting in the same chair. I still remember my first day when I didn't know where the bathroom was. now I know where every bathroom on every floor is. that's growth. that's character development."
    ],
    context: "I can't believe + alreadyは「もうXなの信じられない」で時の流れへの驚き。it just hit meは「今気づいた」の口語。日本語は「もう3年か」と感慨だけど英語はcan't believeと「信じられない」に変換する。感慨を驚きで表現する。",
    category: 'work',
    subcategory: 'career',
    situation: '入社してからの年月に気づいたとき',
  },
  {
    id: 'life-work-050',
    japanese: 'お疲れ様です',
    english: [
      "good work today",
      "great job today, you've earned the rest",
      "thanks for the hard work, let's call it a day",
      "this is the thing about Japanese that breaks English. there's no real equivalent. you can say good work or thanks for today but it's not the same. it doesn't carry that mutual acknowledgment of shared suffering. in English you just say 'see you tomorrow' and walk out. the Japanese version says 'I see your tiredness and I honor it.' English could never."
    ],
    literal: 'お疲れ様です = "you are in a state of honorable tiredness"',
    context: "英語に直訳不可の代表格。good job/good workは上から目線になりがち。thanks for todayが一番フラット。日本語は「共に疲れた」という連帯感を込めるけど英語にはその枠がない。文化が言語を作る証拠。",
    category: 'work',
    subcategory: 'greetings',
    situation: '退勤時の挨拶',
  },
];
