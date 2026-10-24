import type { LifePhrase } from './life-phrases';

export const schoolPhrases: LifePhrase[] = [
  {
    id: 'life-school-001',
    japanese: 'テスト全然勉強してない',
    english: [
      "didn't study",
      "I literally haven't studied at all for this test",
      "the test is tomorrow and I haven't opened my textbook once, not even once",
      "the test is in twelve hours. I know nothing. I've known about this test for three weeks and I chose to spend those three weeks doing everything except studying. I watched an entire TV series. I reorganized my room. I learned how to make bread. actual bread. from scratch. but chapter seven of biology? no idea what's in there. could be anything."
    ],
    context: "haven't studied at allのat allが「マジで一切」を強調。日本語の「全然」はat all/not even a littleで対応。英語では試験前の「勉強してない」自慢は世界共通。not onceは「一度も」で回数ゼロを強調する英語テクニック。",
    category: 'school',
    subcategory: 'test',
    situation: 'テスト前日に現実を直視したとき',
  },
  {
    id: 'life-school-002',
    japanese: '赤点やばい',
    english: [
      "gonna fail",
      "I'm so close to failing it's not even funny",
      "if I bomb this next test I'm officially failing the class",
      "I'm currently at 58 percent. the passing grade is 60. two percent. my entire academic future depends on two percent. that's like one question on the final. one. if I guess right on one question I pass. if I guess wrong I fail. my education has been reduced to a coin flip. this is fine. everything is fine. I'm going to cry in the bathroom now."
    ],
    context: "bombは「大失敗する」のスラング。failは「落ちる/不合格」。日本語の「赤点」は英語にない概念。failing gradeかbelow passingが近い。it's not even funnyは「笑えないレベル」で深刻さを出す。my future depends on〜は大げさだけど学生には本気。",
    category: 'school',
    subcategory: 'test',
    situation: '成績がギリギリのとき',
  },
  {
    id: 'life-school-003',
    japanese: '宿題終わらない',
    english: [
      "homework never ends",
      "I can't finish this homework, there's too much",
      "I've been working on this assignment for three hours and I'm not even halfway done",
      "this homework is infinite. I finish one problem and three more appear like some kind of academic hydra. it's now midnight. I started at eight. the kitchen table is covered in papers and eraser shavings and my will to live. tomorrow I have to turn this in and pretend I understood what I was doing. I did not understand what I was doing. at any point."
    ],
    context: "assignmentは宿題やレポートの広い呼び方。homeworkは家でやる課題限定。hydraはギリシャ神話の「首切っても生えてくる怪物」で英語では「終わらないもの」の比喩に使う。日本語の「終わらない」は英語ではnever-ending/endlessと「永遠」に誇張される。",
    category: 'school',
    subcategory: 'homework',
    situation: '大量の宿題に追われてるとき',
  },
  {
    id: 'life-school-004',
    japanese: '受験つらすぎ',
    english: [
      "entrance exams suck",
      "studying for entrance exams is actual torture",
      "I've been grinding for months and I still don't feel ready at all",
      "I wake up at six. I study until midnight. every day. weekends too. my social life is dead. my hobbies are dead. the only thing alive is this stack of practice tests that keeps growing. my friends who aren't taking exams are out having fun and posting about it online while I'm here memorizing dates from the Edo period. this better be worth it."
    ],
    context: "entrance examsは「入試」。grindingは「ひたすら勉強/作業する」のスラング。actual tortureは「文字通り拷問」の誇張。日本語の「受験」は人生の一大イベントだけど英語圏の試験文化は国によって温度差が大きい。better be worth itは「これで報われないと許さない」。",
    category: 'school',
    subcategory: 'exam',
    situation: '受験勉強に追い詰められてるとき',
  },
  {
    id: 'life-school-005',
    japanese: '部活キツい',
    english: [
      "practice is brutal",
      "club practice is killing me lately",
      "I can barely walk after today's practice, my whole body is screaming",
      "our coach decided today was a good day to run us into the ground. we did sprints. then more sprints. then this thing he calls 'character building' which is just even more sprints but he yells motivational quotes at you while you're dying. my legs have filed a formal complaint. they want to be reassigned to a different body. one that doesn't play sports."
    ],
    context: "practiceは「練習」。brutalは「残酷な/キツい」。日本語の「部活」は英語にない概念。club activitiesが正式だけど日常ではpracticeかtraining。run someone into the groundは「限界まで追い込む」。英語は体のパーツが抗議する擬人化が好き。",
    category: 'school',
    subcategory: 'club',
    situation: '部活の練習で体が限界のとき',
  },
  {
    id: 'life-school-006',
    japanese: 'あの先生の授業眠い',
    english: [
      "class is boring",
      "that teacher's class puts me straight to sleep",
      "I physically cannot stay awake in that class, it's like a lullaby",
      "this teacher has a superpower and it's not teaching. it's the ability to make any topic, no matter how interesting, sound like a bedtime story. the room is warm. the lights are dim. his voice is a monotone hum. I've tried everything. coffee. energy drinks. pinching myself. nothing works. I'm going to have to start standing in the back of the room like a security guard."
    ],
    context: "puts me to sleepは「寝かしつける」。lullabyは「子守唄」。日本語の「眠い」は自分の状態だけど、英語は原因(先生)を主語にしてher class puts me to sleepと言える。英語は原因にフォーカスする他動詞表現が得意。monotoneは「一本調子」。",
    category: 'school',
    subcategory: 'teacher',
    situation: '退屈な授業で意識が飛びそうなとき',
  },
  {
    id: 'life-school-007',
    japanese: '学校サボりたい',
    english: [
      "wanna skip",
      "I really wanna skip school today",
      "I have zero motivation to go to school, I just want to stay home and do nothing",
      "it's 7 AM and I'm doing the mental math. if I skip today that's my third absence this month. but also today is double math. two hours of math. back to back. in a room with no windows. taught by a man who thinks enthusiasm means speaking louder. the math is mathing and the answer is stay home. I'll say I have a stomachache. classic. timeless. undefeated."
    ],
    context: "skipは「サボる/飛ばす」。play hookyはアメリカ英語で「ずる休みする」のやや古い表現。日本語の「サボる」はフランス語sabotage由来。英語のskipはもっとカジュアルで罪悪感が薄い。I'll say I have a stomachacheは仮病の世界共通テクニック。",
    category: 'school',
    subcategory: 'attendance',
    situation: '朝起きて学校に行きたくないとき',
  },
  {
    id: 'life-school-008',
    japanese: '塾めんどくさい',
    english: [
      "cram school ugh",
      "I really don't want to go to cram school",
      "school just ended and now I have to go to another school, this is insane",
      "regular school ends at three-thirty. then I get on a train and go to another school. a bonus school. a school after school. I sit in another classroom with another teacher doing more problems until eight PM. then I go home, eat dinner, do homework from both schools, and sleep for five hours. whoever invented this system clearly hated children."
    ],
    context: "cram schoolは「詰め込み学校」→「塾」。英語圏では塾の概念が薄いのでafter-school tutoring/prep schoolとも言う。a school after schoolの繰り返しが「もう一個学校」の異常さを強調。英語は同じ語の反復でインパクトを出すテクニックがある。",
    category: 'school',
    subcategory: 'cram-school',
    situation: '学校のあとに塾に行くのが嫌なとき',
  },
  {
    id: 'life-school-009',
    japanese: '留年しそう',
    english: [
      "might repeat",
      "I'm seriously at risk of being held back a year",
      "my grades are so bad I might actually have to repeat this entire year",
      "so I ran the numbers. and the numbers are bad. I need an 85 on the final to pass. the highest I've scored all year is a 62. I would need to essentially become a different person in the next two weeks. like an academic superhero transformation. the odds are not in my favor. the odds are actually laughing at me. I can hear them laughing from here."
    ],
    context: "be held backは「留年する」。repeatでも通じる。日本語の「留年」は名詞一語だけど英語はbe held back a year/repeat a yearと文で言う。ran the numbersは「数字を計算した」のビジネス寄り表現だけど学生の成績計算にも使う。the odds are not in my favorは映画的。",
    category: 'school',
    subcategory: 'grades',
    situation: '成績が危機的な状況のとき',
  },
  {
    id: 'life-school-010',
    japanese: '卒業したくない',
    english: [
      "don't wanna graduate",
      "I'm not ready to graduate, it's too soon",
      "everyone's excited about graduation but I'm over here panicking about the real world",
      "graduation is in two months and I'm having a crisis. school has problems, sure. but at least the problems are structured. pass the test. write the paper. show up. the real world has no syllabus. nobody tells you what the assignment is. you just wake up and figure it out. every day. forever. that sounds significantly worse than homework. I'll take homework over adulthood any day."
    ],
    context: "not readyは「準備ができてない」。the real worldは「社会/現実世界」で学生が使う定番フレーズ。日本語の「したくない」はdon't wanna/not ready toで温度差がある。syllabusは「授業計画」。英語では学校を構造化された安全地帯として語るのが共感を呼ぶ。",
    category: 'school',
    subcategory: 'graduation',
    situation: '卒業が近づいて不安になってるとき',
  },
  {
    id: 'life-school-011',
    japanese: '就活しんどい',
    english: [
      "job hunting sucks",
      "the whole job hunting process is absolutely draining",
      "I've sent out like fifty applications and heard back from exactly two, both rejections",
      "job hunting is like dating but worse. you spend hours making yourself look good on paper. you show up to the interview in your best suit pretending to be passionate about spreadsheets. they say 'we'll be in touch' which means 'we won't be in touch.' and then you do it again. and again. fifty times. it's a full-time job finding a job. the irony is crushing."
    ],
    context: "job huntingは「就活」。drainingは「精神を消耗させる」。日本語の「しんどい」は肉体+精神の両方を含むけど英語はdraining(精神)/exhausting(肉体)で使い分ける。we'll be in touchは「連絡する」の社交辞令。英語圏でも就活のしんどさは共通。",
    category: 'school',
    subcategory: 'job-hunting',
    situation: '就活で連敗中のとき',
  },
  {
    id: 'life-school-012',
    japanese: '資格の勉強つまらない',
    english: [
      "studying is dull",
      "studying for certifications is mind-numbingly boring",
      "I need this certification for my career but the material is putting me to sleep",
      "I'm studying for a certification that my company says I need. the textbook is four hundred pages of the most aggressively boring content ever produced by humans. I've read the same page six times and I still don't know what it says. it's like the words are actively resisting being absorbed by my brain. whoever wrote this textbook has never experienced joy and it shows."
    ],
    context: "certificationは「資格」。mind-numbinglyは「頭が痺れるほど」の副詞。日本語の「つまらない」はboring/dullだけどmind-numbingは「脳が機能停止するレベル」で強い。actively resistingで教科書が意志を持って抵抗してる擬人化。英語は無生物を擬人化するのが得意。",
    category: 'school',
    subcategory: 'certification',
    situation: '資格試験の勉強に飽きたとき',
  },
  {
    id: 'life-school-013',
    japanese: '英語の勉強続かない',
    english: [
      "can't keep it up",
      "I keep starting and stopping with English studying",
      "I've restarted my English studies about fifteen times now and it never sticks",
      "January first: new year new me, I'm going to study English every day. January seventh: okay every other day is fine too. January fifteenth: once a week is realistic. February first: wait I was studying English? the cycle repeats annually. I have seven half-finished textbooks, three unused apps, and a Duolingo owl that has given up on me. the owl. gave up. on me."
    ],
    context: "it never sticksは「定着しない/続かない」。stickは「くっつく」→「習慣が定着する」。日本語の「続かない」は英語でcan't keep it up/can't stick with itで「粘着力がない」イメージ。Duolingoの通知が来なくなる=フクロウに見放された、は英語学習者の共通ネタ。",
    category: 'school',
    subcategory: 'english',
    situation: '何度も英語の勉強を挫折してるとき',
  },
  {
    id: 'life-school-014',
    japanese: '暗記ムリ',
    english: [
      "can't memorize",
      "my brain straight up refuses to memorize things",
      "I've read this same list twenty times and I still can't remember any of it",
      "memorization is my kryptonite. I can remember every word to a song I heard once in 2019 but I cannot remember a single vocabulary word from the list I've been staring at for an hour. my brain has storage space. it just allocates it to completely useless information. like the phone number from a pizza commercial in 2005. that I remember. French irregular verbs? gone."
    ],
    context: "kryptoniteは「弱点」(スーパーマンの弱点の鉱石)。英語の日常会話では「致命的弱点」の意味で使う。allocateは「割り当てる」でPCメモリの比喩。日本語の「ムリ」は英語でcan't/refuse toだけど、my brain refusesと脳を別人格にすると自虐感が増す。",
    category: 'school',
    subcategory: 'study',
    situation: '暗記科目に絶望してるとき',
  },
  {
    id: 'life-school-015',
    japanese: 'レポート書けない',
    english: [
      "can't write this",
      "I've been staring at a blank page for an hour",
      "this report is due tomorrow and all I have is my name at the top of the page",
      "the cursor is blinking. mocking me. I've typed and deleted the first sentence nine times. nothing sounds right. I googled 'how to start a report' and the first result said 'begin with a strong thesis statement' which is helpful if you have a thesis. I do not have a thesis. I do not have anything. I have a name, a date, and an existential crisis. that's my report so far."
    ],
    context: "staring at a blank pageは「白紙を見つめてる」で作文できない定番描写。cursorが点滅してmockingしてる(馬鹿にしてる)のは英語のwriter's block(書けない病)あるある。日本語の「書けない」はcan't writeだけど、blank pageが映像的に絶望感を出す。",
    category: 'school',
    subcategory: 'report',
    situation: 'レポートの締切が迫ってるのに手が進まないとき',
  },
  {
    id: 'life-school-016',
    japanese: '集中できない',
    english: [
      "can't focus",
      "I cannot focus to save my life right now",
      "I've been trying to concentrate for the past hour but my brain just won't cooperate",
      "I sat down to study at two. it's now three-thirty and I've accomplished nothing. in that time I've checked my phone twelve times, gotten up for water three times, rearranged my pens by color, and contemplated the meaning of existence. my attention span is currently shorter than a goldfish and I'm not even exaggerating. actually I might be. I already forgot what I was talking about."
    ],
    context: "to save my lifeは「命がかかっても」→「どうしても」。日本語の「できない」はcan'tで直訳OKだけど、to save my lifeをつけると「致命的にダメ」に格上げ。attention span of a goldfishは「金魚並みの集中力」で英語の定番自虐。科学的根拠はないけどネタとして定着。",
    category: 'school',
    subcategory: 'study',
    situation: '勉強しようとしても気が散るとき',
  },
  {
    id: 'life-school-017',
    japanese: '同級生に会いたくない',
    english: [
      "avoiding classmates",
      "I really don't want to run into old classmates",
      "nothing makes me more anxious than the possibility of bumping into someone from school",
      "I was at the grocery store and I saw someone who looked like a guy from my class. I immediately turned around and went to a different aisle. I don't even know if it was actually him. but the risk was too high. what would we talk about? 'So what are you doing now?' 'Oh you know, the same nothing I was doing in school.' I'd rather hide behind the cereal boxes. safer there."
    ],
    context: "run intoは「偶然会う」。bump intoも同じ。日本語の「会いたくない」は英語でdon't want to seeだけどrun intoの方が「街中でバッタリ」の不意打ち感が出る。what would we talk aboutは「何話すの」で気まずさの核心。英語では近況報告の気まずさは共通体験。",
    category: 'school',
    subcategory: 'classmate',
    situation: '地元で同級生に遭遇したくないとき',
  },
  {
    id: 'life-school-018',
    japanese: 'ノート取るの追いつかない',
    english: [
      "can't keep up",
      "the teacher is going way too fast, I can't keep up",
      "I'm writing as fast as I can but the board is already three slides ahead of me",
      "this professor lectures like he's being chased. he puts up a slide, reads it in fifteen seconds, and moves on. I'm still copying the title when he's already on the next concept. my notes look like hieroglyphics. future me is going to open this notebook and think 'what language is this?' it's the language of panic. that's what it is. speed writing under duress."
    ],
    context: "keep upは「ついていく」。日本語の「追いつかない」と構造が同じ。like he's being chasedは「追われてるみたいに」で先生のスピードを表現。hieroglyphicsは「象形文字」で読めない字のこと。under duressは「強制下で」の法律用語だけどユーモアとして日常でも使う。",
    category: 'school',
    subcategory: 'class',
    situation: '授業のスピードについていけないとき',
  },
  {
    id: 'life-school-019',
    japanese: 'グループワーク嫌い',
    english: [
      "hate group work",
      "group projects are my worst nightmare",
      "every time we have a group project I end up doing everything myself",
      "group project. two words that strike fear into the hearts of anyone who has ever done one. because here's how it always goes: four people. one does all the work. one disappears completely. one shows up at the last minute to 'help' by changing the font. and one asks 'so when is this due?' the day before it's due. every single time. the group project curse is unbreakable."
    ],
    context: "group projectは「グループ課題」。worst nightmareは「最悪の悪夢」。日本語の「嫌い」はhateで直訳OKだけど、英語ではmy worst nightmareの方が感情の深さが出る。end up doing everything myselfは「結局全部自分がやる」で世界共通の悩み。",
    category: 'school',
    subcategory: 'class',
    situation: 'グループ課題を押し付けられたとき',
  },
  {
    id: 'life-school-020',
    japanese: '読書感想文書けない',
    english: [
      "book report blank",
      "I have no idea what to write for this book report",
      "I read the whole book and I still have no opinions about it, none at all",
      "I have to write a book report. step one: have thoughts about the book. I don't have thoughts about the book. I read it. words went in. nothing came out. the teacher wants me to write about themes and symbolism and character development. I just want to write 'it was fine, things happened, the end.' but apparently that's not enough for a passing grade. so now I'm on the internet looking up what other people thought."
    ],
    context: "book reportは「読書感想文」。have no opinionsは「意見がない」。日本語の「書けない」は内容が浮かばない意味だけど英語ではhave nothing to sayと「言うことがない」方向で表現。things happenedは「いろいろあった」の究極に中身のない要約で笑いを取る技。",
    category: 'school',
    subcategory: 'homework',
    situation: '読書感想文の課題に詰まったとき',
  },
  {
    id: 'life-school-021',
    japanese: '先生に当てられたくない',
    english: [
      "don't call on me",
      "please don't call on me, please don't call on me",
      "I'm avoiding eye contact with the teacher hoping they won't pick me to answer",
      "the teacher is looking around the room for someone to answer the question. I know the answer. I actually know it this time. but my body won't let me raise my hand because what if I'm wrong? so instead I'm doing the thing where I look down at my notebook very intensely like I'm deep in thought. very scholarly. very focused. absolutely not panicking. not even a little."
    ],
    context: "call on someoneは「指名する」。英語の授業でも先生に当てられる恐怖は同じ。避ける方法も世界共通: 目を合わせない、ノートを見つめる。even though I know the answerでも手を挙げられない、は英語でもintroverted(内向的)あるある。",
    category: 'school',
    subcategory: 'class',
    situation: '授業中に先生と目を合わせないようにしてるとき',
  },
  {
    id: 'life-school-022',
    japanese: '提出物忘れた',
    english: [
      "forgot to submit",
      "I completely forgot to turn in my assignment",
      "I did the homework, it's done, it's finished, but it's sitting on my desk at home",
      "the homework is done. I did it. I'm actually proud of it. it's some of my best work. it's also on my kitchen table three miles from here because I'm a genius who does the homework but forgets to bring it to school. the teacher doesn't believe me. 'I did it but I left it at home' is apparently the oldest excuse in the book. but this time it's true. for once it's actually true."
    ],
    context: "turn inは「提出する」。submitはフォーマル寄り。日本語の「忘れた」はforgotで直訳OK。the oldest excuse in the bookは「昔からある言い訳」。英語ではthe dog ate my homeworkが一番有名な宿題言い訳。言い訳が事実でも信じてもらえない皮肉。",
    category: 'school',
    subcategory: 'homework',
    situation: '宿題をやったのに提出を忘れたとき',
  },
  {
    id: 'life-school-023',
    japanese: '勉強のやり方がわからない',
    english: [
      "don't know how",
      "I don't even know how to study properly",
      "everyone seems to know how to study except me, I'm just staring at pages",
      "here's my study method: open textbook. read paragraph. realize I wasn't actually reading. re-read paragraph. get distracted. check phone. feel guilty. close phone. read paragraph again. retain nothing. repeat for two hours. call it studying. this can't be right. other people seem to actually absorb information when they study. I'm just performing the physical act of studying without any of the actual learning."
    ],
    context: "study properlyは「ちゃんと勉強する」。日本語の「やり方がわからない」はdon't know howで直訳OK。performing the act of studying without learningは「学習なしの勉強ごっこ」。英語では「行為と成果の乖離」をperform X without Yで表現する構文が効く。",
    category: 'school',
    subcategory: 'study',
    situation: '勉強の効率の悪さに悩んでるとき',
  },
  {
    id: 'life-school-024',
    japanese: '一夜漬けする',
    english: [
      "all-nighter time",
      "looks like I'm pulling an all-nighter again",
      "the test is tomorrow morning and I'm about to cram an entire semester into one night",
      "it's eleven PM. the test is at nine AM. I have ten hours and about three months of material to learn. the coffee is brewed. the desk is clear. the will to live is questionable. but this is what I do. I wait until the last possible moment and then try to download an entire course into my brain in one session. has it ever worked? no. will I do it differently next time? also no."
    ],
    context: "pull an all-nighterは「徹夜する」の定番。cramは「詰め込む」で一夜漬けのまさにそれ。日本語の「一夜漬け」はcramming/last-minute studyingで表現。downloadは脳をPCに見立てた比喩。英語では脳=コンピュータの比喩が2020年代に完全定着。",
    category: 'school',
    subcategory: 'study',
    situation: 'テスト前夜に徹夜覚悟を決めたとき',
  },
  {
    id: 'life-school-025',
    japanese: '成績表見たくない',
    english: [
      "scared of grades",
      "I'm genuinely afraid to look at my grades",
      "my report card arrived and it's been sitting unopened on my desk for two days",
      "the report card is in my bag. I can feel its energy. negative energy. dark energy. the energy of bad decisions and skipped homework. I could open it. I should open it. but there's this thing called self-preservation and it's telling me that what I don't know can't hurt me. which is objectively false but emotionally very convincing. maybe I'll open it tomorrow. or next year."
    ],
    context: "report cardは「成績表」。afraidはscaredよりフォーマル。日本語の「見たくない」は英語でdon't want to look/afraid to lookで恐怖のレベルが変わる。what you don't know can't hurt youは「知らぬが仏」に近い英語の慣用句。self-preservationは「自己防衛本能」。",
    category: 'school',
    subcategory: 'grades',
    situation: '成績表を開ける勇気がないとき',
  },
  {
    id: 'life-school-026',
    japanese: '教科書高すぎ',
    english: [
      "textbooks cost too much",
      "why are textbooks so insanely expensive",
      "I just spent my entire grocery budget on two textbooks and I want to scream",
      "one textbook. one. eighty dollars. for something I'll use for four months and then never open again. the professor wrote it himself which means I can't even buy a used copy because he changed three pages from last year's edition. three pages. eighty dollars for three new pages. that's almost twenty-seven dollars per page of new content. I could print money cheaper than this."
    ],
    context: "insanely expensiveは「狂ったように高い」。日本語の「高すぎ」はtoo expensive/overpriced。教科書の値段問題はアメリカでは特に深刻で、大学の教科書が1冊200ドル超えることも。the professor wrote it himselfは教授が自分の本を買わせる問題で英語圏の大学あるある。",
    category: 'school',
    subcategory: 'expenses',
    situation: '教科書の値段に絶句したとき',
  },
  {
    id: 'life-school-027',
    japanese: '授業中に寝てた',
    english: [
      "slept in class",
      "I fell asleep in class and the teacher saw me",
      "I woke up to the teacher standing right next to my desk and the whole class staring at me",
      "I was doing so well. I made it to the forty-minute mark without falling asleep. a personal record for this class. then the lights went off for a presentation and it was over. the darkness. the warmth. the soft hum of the projector. I was gone. apparently I was out for twenty minutes and at one point I made a noise. a sleep noise. in a silent classroom. the embarrassment will outlive me."
    ],
    context: "fell asleep in classは「授業中に寝落ちた」。日本語の「寝てた」は英語ではwas sleeping/dozed offで継続か一瞬かのニュアンスが変わる。made a noiseは「音を出した」で寝言やいびきのこと。the embarrassment will outlive meは「恥ずかしさが俺より長生きする」の秀逸な自虐。",
    category: 'school',
    subcategory: 'class',
    situation: '授業中に寝て恥ずかしい思いをしたとき',
  },
  {
    id: 'life-school-028',
    japanese: 'プレゼン発表したくない',
    english: [
      "hate presenting",
      "I would rather do literally anything than present in front of the class",
      "my presentation is tomorrow and I've already considered faking my own disappearance",
      "public speaking is listed as the number one fear in most surveys. above death. above spiders. I understand this statistically. I understand it personally. I have a five-minute presentation tomorrow and I've been practicing in my room and even my mirror looks disappointed. five minutes. three hundred seconds. I've counted. I'm going to stand up there, forget everything I practiced, and improvise my way to a C minus."
    ],
    context: "public speakingは「人前で話すこと」。number one fearは実際の調査結果。日本語の「したくない」はdon't wantだけど、would rather do anythingは「何だってまし」で嫌悪の度合いが強い。fake my own disappearanceは「失踪を偽装する」で逃亡願望のユーモア。",
    category: 'school',
    subcategory: 'presentation',
    situation: '発表の順番が近づいて緊張してるとき',
  },
  {
    id: 'life-school-029',
    japanese: '数学意味わからん',
    english: [
      "math makes no sense",
      "I genuinely do not understand a single thing about math",
      "the teacher explains it and everyone nods and I'm sitting there like it's a foreign language",
      "at some point in math class I fell behind. I don't know when exactly. maybe fifth grade. and I've been pretending to understand ever since. now we're doing calculus and I'm still not sure about fractions. the teacher writes something on the board and asks 'does everyone follow?' and I nod. I don't follow. I haven't followed since long division. but I nod. we all nod."
    ],
    context: "makes no senseは「意味不明」。日本語の「意味わからん」はI don't get itが口語的。fell behindは「遅れを取った」。does everyone follow?は「皆ついてきてる？」の確認。followは「理解する」の意味もある。we all nodは「全員わかったふり」で共犯関係のユーモア。",
    category: 'school',
    subcategory: 'subject',
    situation: '数学の授業で完全に置いていかれたとき',
  },
  {
    id: 'life-school-030',
    japanese: '文化祭準備楽しい',
    english: [
      "festival prep is fun",
      "getting ready for the school festival is the best part",
      "I'm way more motivated to work on festival stuff than actual schoolwork",
      "we're building a haunted house for the school festival and I'm having the time of my life. we've been staying after school until seven every day this week cutting cardboard and painting walls and arguing about where to put the fake spider. this is the first time school has felt fun in months. real teamwork. real creativity. no grades, no tests, just vibes. why can't all of school be like this."
    ],
    context: "school festivalは「文化祭」。英語圏のschool fairやcareerとはだいぶ違うけどfestivalが一番近い。having the time of my lifeは「人生最高の時間」。日本語の「楽しい」はfunだけど、the best partやhaving the time of my lifeの方が熱量が伝わる。",
    category: 'school',
    subcategory: 'event',
    situation: '文化祭の準備に没頭してるとき',
  },
  {
    id: 'life-school-031',
    japanese: '先生にバレた',
    english: [
      "teacher caught me",
      "the teacher totally caught me and I'm done for",
      "I thought I was being sneaky but the teacher saw everything and now I'm in trouble",
      "I was texting under my desk. classic move. phone on my lap, eyes down, tiny little thumb movements. foolproof. except it wasn't foolproof because the teacher walked right up behind me without making a sound like some kind of educational ninja and said 'interesting message?' in front of the entire class. I looked up. thirty faces staring at me. the teacher smiling. game over."
    ],
    context: "caught meは「見つかった/バレた」。got caughtも同じ。日本語の「バレた」は英語でcaught/busted/found out。being sneakyは「コソコソしてる」。educational ninjaは先生を忍者に例える英語的ユーモア。game overはゲーム用語が日常に入った例。",
    category: 'school',
    subcategory: 'class',
    situation: '授業中にスマホを触ってバレたとき',
  },
  {
    id: 'life-school-032',
    japanese: '友達とカンニングの相談',
    english: [
      "thinking about cheating",
      "I know I shouldn't but I'm thinking about cheating on this one",
      "my friend and I are having a very strategic discussion about seating arrangements for the test",
      "we're not saying the word 'cheating.' we're saying 'collaborative information sharing during a timed assessment.' it sounds better that way. my friend is good at math. I'm good at English. we sit next to each other. the answers flow naturally. like osmosis. educational osmosis. is it ethical? no. am I going to do it anyway? the jury is still out. the jury being my conscience. which is losing."
    ],
    context: "cheatingは「カンニング/不正」。英語のcheatは試験以外にも恋愛(浮気)でも使う。collaborative information sharingは官僚語で言い換える自虐。日本語の「カンニング」は和製英語。英語ではcheating on a test。osmosisは「浸透」で理科用語をネタに使う。",
    category: 'school',
    subcategory: 'test',
    situation: 'テスト前に友達とズルを企んでるとき',
  },
  {
    id: 'life-school-033',
    japanese: '学校行きたくない',
    english: [
      "don't wanna go",
      "I just really don't want to go to school today",
      "there's not a single thing happening at school today that I want to be part of",
      "every morning there's a moment. a very small moment. right after my alarm goes off. where I think 'what if I just didn't go?' and for about three seconds it feels like a real option. a beautiful option. then reality kicks in and I drag myself out of bed because apparently education is important or whatever. but those three seconds of freedom? those are the best three seconds of my day."
    ],
    context: "don't want to goはシンプルだけど重い。drag myself out of bedは「自分を引きずり出す」で嫌々感が物理的。or whateverは「とかなんとか」で投げやりなニュアンス。日本語の「行きたくない」は英語でも毎朝の葛藤として語られる世界共通テーマ。",
    category: 'school',
    subcategory: 'attendance',
    situation: '朝、学校に行く意味を見失ったとき',
  },
  {
    id: 'life-school-034',
    japanese: '図書館で勉強するふり',
    english: [
      "pretend studying",
      "I'm at the library pretending to study",
      "I've been sitting in the library for two hours looking productive but doing absolutely nothing",
      "I'm at a table in the library. textbook open. notebook out. pen in hand. highlighter ready. earphones in. I look like the most dedicated student on campus. I look like I should be on a university brochure. in reality I've been reading the same page for forty-five minutes while thinking about what to eat for dinner. but if anyone walks by, they'll see a scholar. appearance is everything. substance is optional."
    ],
    context: "pretendは「ふりをする」。lookとappearの違い: lookは見た目、appearはもう少しフォーマル。日本語の「ふり」はpretend/act likeで対応。appearance is everythingは「外見が全て」で見た目だけ整えてる皮肉。substanceは「中身」。英語はこの外見と中身の対比ジョークが好き。",
    category: 'school',
    subcategory: 'study',
    situation: '図書館の雰囲気だけ楽しんでるとき',
  },
  {
    id: 'life-school-035',
    japanese: '推薦もらいたい',
    english: [
      "want a recommendation",
      "I really need a good recommendation from this teacher",
      "I've been sucking up to my teacher for three months hoping for a recommendation letter",
      "I need a recommendation letter from Professor Tanaka. so I've been a model student for exactly twelve weeks. front row. nodding vigorously at everything she says. asking questions I already know the answer to just to seem engaged. laughing at her jokes that aren't funny. I'm basically performing a one-person show called 'the ideal student' and the only audience member who matters hasn't noticed yet."
    ],
    context: "recommendation letterは「推薦状」。sucking upは「ゴマすり」のスラング。日本語の「もらいたい」は英語でneed/wantだけど、recommendation letterの文脈ではneedの方が切実。model studentは「模範生」。performingは「演じてる」で偽りの自分を自虐する。",
    category: 'school',
    subcategory: 'recommendation',
    situation: '先生に推薦をもらうために頑張ってるとき',
  },
  {
    id: 'life-school-036',
    japanese: '休み時間短すぎ',
    english: [
      "break's too short",
      "ten minutes between classes is a joke",
      "by the time I get to the bathroom and back the break is already over",
      "ten-minute break. sounds reasonable right? wrong. it takes three minutes to walk to the bathroom. two minutes to wait in line. one minute in the bathroom. three minutes to walk back. that's nine minutes. I have sixty seconds to exist as a human being before the next class starts. sixty seconds to check my phone, drink water, and recover from the trauma of the previous class. it's not enough."
    ],
    context: "breakは「休み時間」。a jokeは「冗談/話にならない」。日本語の「短すぎ」はtoo shortで直訳OK。英語では時間を数字で分解して「物理的に無理」を証明するのが説得力のあるユーモア。exist as a human beingは「人間として存在する」の大げさ表現。",
    category: 'school',
    subcategory: 'break',
    situation: '休み時間が足りなすぎるとき',
  },
  {
    id: 'life-school-037',
    japanese: '席替え緊張する',
    english: [
      "seat change anxiety",
      "the seat change is today and I'm actually nervous",
      "our seating arrangement is getting shuffled and my entire social comfort depends on the outcome",
      "today is seat reassignment day. this is bigger than any test. this determines who I sit next to for the next three months. best case: next to my friend by the window. worst case: front row next to the teacher's pet with no escape route. there's no studying for this. no preparation. it's pure luck. my entire daily happiness for the next ninety days comes down to a random draw."
    ],
    context: "seat changeは「席替え」。shuffledは「シャッフルされる」。日本語の「席替え」は日本の学校文化特有だけど、英語でもseating arrangementの変更は理解される。depends on the outcomeは「結果次第」。comfort zoneは英語では「安全圏」の意味で日常的に使う。",
    category: 'school',
    subcategory: 'class',
    situation: '席替え当日にドキドキしてるとき',
  },
  {
    id: 'life-school-038',
    japanese: '卒業式泣きそう',
    english: [
      "gonna cry at graduation",
      "I'm definitely going to cry at the ceremony",
      "I keep telling myself I won't cry at graduation but I know that's a complete lie",
      "I've been practicing not crying for a week. I've watched sad movies to build up immunity. I've told myself a hundred times that it's just a ceremony and it's not that deep. but I know the moment they play that song and my friend looks at me, it's over. the floodgates are opening. I'm going to be that person. the one ugly crying in the fourth row. and honestly? I've made peace with it."
    ],
    context: "gonna cryは「泣きそう」。floodgatesは「水門」→「涙があふれ出す」。ugly cryingは「号泣(不格好な泣き方)」でSNSで定着した表現。日本語の「泣きそう」は予感だけど、英語はI know it's comingと確信して語る方が共感を呼ぶ。made peace with itは「受け入れた」。",
    category: 'school',
    subcategory: 'graduation',
    situation: '卒業式を前に感傷的になってるとき',
  },
  {
    id: 'life-school-039',
    japanese: 'オンライン授業サボれる',
    english: [
      "easy to skip online",
      "online classes are so easy to slack off in",
      "I'm technically in class right now but my camera is off and I'm making breakfast",
      "I'm logged into class. my microphone is muted. my camera is off. my status says 'active' but I'm in bed. I set my name to display on the screen so the teacher thinks I'm paying attention. I'm watching a cooking video on my phone. occasionally I unmute to say 'I agree' at random intervals. this is what education looks like in the digital age. the future is here and it's horizontal."
    ],
    context: "slack offは「サボる/手を抜く」。camera offは「カメラオフ」でオンライン授業あるある。technically in classのtechnicallyは「厳密には」で実態との乖離を示す。日本語の「サボれる」は可能形。英語ではeasy to skip/can totally slack offで可能性を示す。",
    category: 'school',
    subcategory: 'online',
    situation: 'オンライン授業で楽をしてるとき',
  },
  {
    id: 'life-school-040',
    japanese: '進路決まらない',
    english: [
      "no clue about my future",
      "I have absolutely no idea what I want to do with my life",
      "everyone seems to have their future figured out and I'm just standing here completely lost",
      "the career counselor asked me what I want to do after graduation and I said 'I'm keeping my options open' which is a polite way of saying 'I have no plan.' my friend wants to be a doctor. my other friend is going into law. I want to go home and take a nap. that's as far ahead as I can see. my five-year plan is surviving the next five hours."
    ],
    context: "no clueは「全くわからない」。figure outは「解明する/見つける」。keeping my options openは「選択肢を残してる」の体裁の良い言い回し。日本語の「決まらない」はcan't decideだけど、have no ideaの方が「そもそも候補すらない」感が出る。five-year planは就活の定番質問。",
    category: 'school',
    subcategory: 'career',
    situation: '進路の話題を振られて困るとき',
  },
  {
    id: 'life-school-041',
    japanese: '体育の授業だるい',
    english: [
      "PE is the worst",
      "I did not sign up for this level of physical activity",
      "it's eight in the morning and we're running laps, who decided this was a good idea",
      "PE at eight AM should be classified as cruel and unusual punishment. we're running laps around the field in the cold and the teacher is standing there in a tracksuit sipping coffee telling us to pick up the pace. sir, you pick up the pace. you haven't moved in twenty minutes. I'm one lap away from lying down on the grass and pretending to have a medical emergency. hamstring. very sudden."
    ],
    context: "PEはphysical educationの略で「体育」。cruel and unusual punishmentは「残虐で異常な刑罰」でアメリカ憲法の引用をジョークに使う高等テク。pick up the paceは「ペース上げろ」。日本語の「だるい」は身体の重さだけど英語は精神的な嫌悪(the worst)で表現しがち。",
    category: 'school',
    subcategory: 'subject',
    situation: '朝一の体育に絶望してるとき',
  },
  {
    id: 'life-school-042',
    japanese: '試験範囲広すぎ',
    english: [
      "too much material",
      "the exam covers way too much material",
      "I looked at the exam scope and my soul left my body for a second",
      "the exam covers chapters one through twelve. twelve chapters. that's the entire textbook. the entire thing. what was the point of having individual tests during the semester if the final just covers everything anyway? it's like a video game boss that combines all the previous bosses into one mega boss. except I barely beat the individual bosses. some of them I definitely lost to."
    ],
    context: "coversは「範囲に含む」。my soul left my bodyは「魂が抜けた」で日本語の「魂抜けた」とほぼ同じ。video game boss比喩は英語の若者言葉で定番。日本語の「広すぎ」はtoo broad/too muchで表現。mega bossは「最終ボス」のゲーム語だけど日常でも使われる。",
    category: 'school',
    subcategory: 'test',
    situation: '試験範囲を見て絶望したとき',
  },
  {
    id: 'life-school-043',
    japanese: '奨学金返済きつい',
    english: [
      "loan payments hurt",
      "student loan payments are eating me alive",
      "I'm going to be paying off my student loans until I'm fifty at this rate",
      "I graduated three years ago and I still owe more than I borrowed. how is that possible? interest. that's how. interest is the financial equivalent of a horror movie villain that never dies. I pay five hundred a month and most of it goes to interest. the actual loan amount barely moves. at this rate I'll pay off my student loans right around the time I need to start saving for my funeral."
    ],
    context: "student loanは「奨学金/学生ローン」。日本語の「奨学金」は返済不要の意味もあるが英語のscholarship(返済不要)とloan(要返済)は完全に別物。eating me aliveは「生きたまま食われる」→「苦しめる」。interestは「利子」で金融ホラーの比喩が効く。",
    category: 'school',
    subcategory: 'loan',
    situation: '奨学金の返済に苦しんでるとき',
  },
  {
    id: 'life-school-044',
    japanese: 'やっと夏休み',
    english: [
      "finally summer break",
      "summer break is finally here and I'm free",
      "I survived another semester and I'm not touching a textbook for at least a month",
      "it's over. it's actually over. the last exam is done. I walked out of that building and the sun hit my face and I felt something I haven't felt in months. freedom. sweet, beautiful freedom. no homework. no deadlines. no pretending to understand thermodynamics. just two months of doing absolutely nothing productive and being completely fine with it. this is the dream. I'm living the dream."
    ],
    context: "finally hereは「やっと来た」。survivedは「生き延びた」で学期を生存ゲームに例える。I'm not touching a textbookは「教科書に触らない」宣言。日本語の「やっと」はfinally/at lastで解放感を出す。英語ではthe sun hit my faceのように感覚描写で解放を表現するのが文学的。",
    category: 'school',
    subcategory: 'vacation',
    situation: '夏休み初日の開放感に浸ってるとき',
  },
  {
    id: 'life-school-045',
    japanese: 'この教科いつ使うの',
    english: [
      "when will I use this",
      "when am I ever going to use this in real life",
      "someone please explain to me how knowing the mitochondria is the powerhouse of the cell helps me pay rent",
      "I'm learning about the Krebs cycle right now. the Krebs cycle. I'm going to be an accountant. when in my accounting career will someone walk into my office and ask me about the Krebs cycle? never. the answer is never. but here I am, memorizing it anyway, because the education system decided that everyone needs to know everything regardless of whether it's relevant to anything they'll ever do."
    ],
    context: "when will I use thisは学生の永遠の問い。the mitochondria is the powerhouse of the cellは英語圏のミーム。誰もが暗記させられたけど使わない知識の代表。日本語の「いつ使う」は英語でも全く同じ不満。regardless ofは「〜に関わらず」で理不尽さを表現。",
    category: 'school',
    subcategory: 'subject',
    situation: '実生活に役立たない科目を勉強してるとき',
  },
  {
    id: 'life-school-046',
    japanese: '写し忘れたからノート見せて',
    english: [
      "can I see your notes",
      "hey can I borrow your notes? I missed that part",
      "I zoned out for like ten minutes and now I have no idea what happened, can I see your notebook?",
      "so I may have accidentally daydreamed through the entire second half of class. I was there physically. my pen was in my hand. but my brain was somewhere else. somewhere nice. a beach maybe. anyway the teacher apparently covered something important and my notebook has a drawing of a cat where the notes should be. so if you could just let me photograph your notes real quick that would save my academic career. no pressure."
    ],
    context: "can I borrow your notesは「ノート貸して」の定番。zoned outは「ボーッとしてた」。daydreamは「白昼夢/ぼんやり空想」。日本語の「見せて」は英語でcan I see/let me borrowでカジュアルに頼む。save my academic careerは大げさだけど切実な借りノート文化。",
    category: 'school',
    subcategory: 'class',
    situation: '授業中にぼんやりしてノートが空白のとき',
  },
  {
    id: 'life-school-047',
    japanese: '塾の先生の方がわかりやすい',
    english: [
      "tutor explains better",
      "my tutor explains things way better than my actual teacher",
      "I understand more in one hour at cram school than a whole week of regular class",
      "my school teacher spent three classes explaining this concept and I understood nothing. zero. my cram school teacher explained it in fifteen minutes and now I get it. fifteen minutes. what was my school teacher doing for those three classes? I think there's a direct relationship between how much someone gets paid and how well they explain things. or maybe my school teacher is just bad at this. both theories hold up."
    ],
    context: "explains betterは「説明がうまい」。tutorは「個別指導の先生」。日本語の「わかりやすい」はeasy to understand/explains wellで表現。直接関係(direct relationship)はデータ分析用語だけど日常の推論にも使う。both theories hold upは「どっちの仮説も成り立つ」。",
    category: 'school',
    subcategory: 'cram-school',
    situation: '学校の授業と塾を比較してるとき',
  },
  {
    id: 'life-school-048',
    japanese: '勉強する意味がわからない',
    english: [
      "what's the point",
      "I genuinely don't see the point of studying anymore",
      "someone please give me one good reason why I should keep studying because I'm running out of motivation",
      "I've been studying for eighteen years. eighteen. and every year someone tells me 'this is important for your future.' my future. I'm IN the future now. this IS the future that past studying was supposed to prepare me for. and I still don't feel prepared. so either the studying didn't work or the future is just always going to feel unprepared. either way, what was the point. I'm having a crisis."
    ],
    context: "what's the pointは「何の意味があるの」。see the pointは「意義を理解する」。日本語の「意味がわからない」はdon't see the point/don't understandで温度差が出る。I'm IN the futureは「もう未来にいる」の時制トリック。英語は時制操作でユーモアを作るのが得意。",
    category: 'school',
    subcategory: 'motivation',
    situation: '勉強のモチベーションが完全に切れたとき',
  },
  {
    id: 'life-school-049',
    japanese: 'テスト返却怖い',
    english: [
      "scared of the results",
      "I'm dreading getting my test back",
      "the teacher is handing back tests and my heart rate is through the roof right now",
      "the teacher has the tests. she's handing them back one by one. face down. that's never a good sign. face down means 'prepare yourself.' she's getting closer to my row. my palms are sweating. I can feel my heartbeat in my ears. she puts mine on my desk. I leave it face down. I'm not ready. I need a moment. I need several moments. I need a time machine. let me go back and study."
    ],
    context: "dreading/scaredは「怖い/恐れてる」。through the roofは「天井突き抜けるほど高い」→「心拍数が異常」。face downは「裏返し」で点数が悪いテストの返し方。英語圏でも成績返却の恐怖は共通。my palms are sweatingはエミネムの8 Mileでも有名なフレーズ。",
    category: 'school',
    subcategory: 'test',
    situation: 'テストが返却されるのを待ってるとき',
  },
  {
    id: 'life-school-050',
    japanese: '学生のうちにもっと遊べばよかった',
    english: [
      "should've had more fun",
      "I really should've enjoyed my student days more",
      "looking back, I wish I'd spent less time stressing and more time actually living",
      "everyone told me 'enjoy it while it lasts' and I thought they were being dramatic. they were not being dramatic. school was hard but at least it was hard with structure and summer breaks and friends in the same building. now it's just hard. all the time. with no summer break. and my friends are scattered across three different cities. if I could go back I'd worry less and stay out later. but that's what everyone says. that's the trap."
    ],
    context: "should've/wish I hadは後悔の定番。enjoy it while it lastsは「あるうちに楽しめ」の大人の忠告。日本語の「よかった」は英語のshould have/wish I hadで仮定法過去。that's the trapは「それが罠」で全員が同じ後悔をするパターンへのメタツッコミ。",
    category: 'school',
    subcategory: 'nostalgia',
    situation: '社会人になって学生時代を振り返るとき',
  },
];
