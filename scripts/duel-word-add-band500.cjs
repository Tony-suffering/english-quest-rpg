#!/usr/bin/env node
// 単語パックに、TOEIC 500点帯の55語を足す(2026-11-27)。一度きりの取り込み。
// 語と意味の元は、とにおラボの「頻出310語」(english-quest-rpg の src/data/izakaya-toeic/toeic-words、level: 500 の60語から、もう入っている5語を除いた分)。
// 英文・訳・場面は全部ここで書いた自作(試験問題や市販教材からの転載なし)。声の演出は、英文の型(tone)ごとに決めてある。
// ついでに、もう有る20語に band(点数帯)と cost を入れる。band が章、cost が対戦のコスト(章の中でばらける)。
//   node scripts/duel-word-add-band500.cjs
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'src/data/english/duel-words-toeic.json');
const pack = JSON.parse(fs.readFileSync(P, 'utf8'));

const TONES = {
    DETECTIVE: ['探偵の尋問', 'echo', 'a hard-boiled detective', 'Low, slow and suspicious, treating it as a serious case.'],
    RECEPTION: ['受付の案内', 'coral', 'a polite receptionist', 'Warm, professional, perfectly calm.'],
    GRANDMA: ['おばあちゃんの見立て', 'sage', 'a gentle grandmother', 'Kind, slow, a little amused.'],
    ROBOT: ['ロボットの報告', 'alloy', 'an office robot', 'Flat, even, mechanical rhythm with tiny pauses.'],
    PIRATE: ['海賊の事務連絡', 'ash', 'a gruff pirate captain', 'Rough growl, but businesslike.'],
    BOSS: ['上司の通達', 'echo', 'a humorless manager', 'Cold and flat, no joy at all.'],
    RUMOR: ['社内のうわさ', 'verse', 'a gossiping coworker', 'Low conspiratorial tone, enjoying the gossip.'],
    ANNOUNCE: ['館内アナウンス', 'shimmer', 'a serene announcer', 'Smooth public-announcement voice, perfectly calm.'],
    SALES: ['店員の朗報', 'coral', 'an upbeat salesperson', 'Bright and delighted, customer-service cheer.'],
    WEATHER: ['天気予報', 'nova', 'a cheerful weather presenter', 'Brisk and sunny.'],
    ALIEN: ['宇宙人の報告', 'ballad', 'a polite little alien', 'Careful, curious, slightly stiff.'],
    WIZARD: ['魔法使いのぼやき', 'fable', 'a tired old wizard', 'Weary, dry, with a small sigh.'],
    NEWS: ['ニュースの見出し', 'nova', 'a brisk news anchor', 'Crisp headline delivery, neutral.'],
    SLOW: ['のんびり屋の言い分', 'ballad', 'an earnest, very slow speaker', 'Sincere and unhurried.'],
    DOCTOR: ['医者の診断', 'sage', 'a calm doctor', 'Gentle, clinical, matter-of-fact.'],
    GHOST: ['幽霊の独白', 'sage', 'a resigned ghost', 'Hollow, soft, deadpan.'],
    GENERAL: ['頼りない将軍', 'ash', 'an unsure general', 'Tries to sound confident, not quite managing.'],
    TRAILER: ['映画の予告編', 'onyx', 'a movie trailer narrator', 'Deep and epic, with dramatic pauses between sentences.'],
    ROYAL: ['王の会議', 'fable', 'a solemn royal herald', 'Formal and grave, announcing state business.'],
    COMPLAINT: ['お客様の苦情', 'shimmer', 'an unimpressed customer', 'Cool, polite, dry.'],
    DIARY: ['会社員の日記', 'ballad', 'a deadpan office worker', 'Quiet, dry, like reading a diary.'],
    VILLAIN: ['悪役の決め台詞', 'onyx', 'a grand theatrical villain', 'Booming and proud.'],
    TEACHER: ['先輩の小言', 'shimmer', 'a patient supervisor', 'Polite, but tired of repeating it.'],
    AD: ['通販の売り文句', 'verse', 'a TV shopping host', 'Energetic infomercial pitch.'],
    SPORTS: ['実況中継', 'verse', 'an excited sports commentator', 'Fast, excited play-by-play.'],
    EXCUSE: ['新人の言い訳', 'ballad', 'a sheepish employee', 'Apologetic and a little embarrassed.'],
};

// [語, 品詞, 意味, 型, 画風, 英文, 訳, 場面]
const W = [
    ['claim', 'verb', '主張する、請求する', 'DETECTIVE', 'PENCIL SKETCH', 'You claim you were at home, but your shoes claim otherwise.', '家にいたと君は主張する。だが君の靴は、ちがうと主張している。', 'A detective points a magnifying glass at the very muddy shoes of a nervous suspect sitting on a clean living-room sofa.'],
    ['accommodate', 'verb', '収容する、対応する', 'RECEPTION', 'ART NOUVEAU', 'This hotel can accommodate two hundred guests, or one dragon.', 'このホテルは200名様を収容できます。あるいは、ドラゴン1頭。', 'A grand hotel lobby where a smiling receptionist greets a huge dragon squeezing through the front door with a small suitcase.'],
    ['sensible', 'adjective', '分別のある、賢明な', 'GRANDMA', 'GOUACHE', 'Be sensible, dear. Nobody fights a dragon before breakfast.', '分別を持ちなさい。朝ごはんの前にドラゴンと戦う人はいないよ。', 'A grandmother sets a breakfast plate in front of a young knight in full armor who is itching to leave, a dragon visible through the kitchen window.'],
    ['verify', 'verb', '確認する、検証する', 'ROBOT', 'PIXEL ART', 'Please verify that you are human. Barking is not accepted.', 'あなたが人間であることを確認してください。吠えるのは受け付けません。', 'A dog wearing a business suit sits at a computer terminal while a security robot points sternly at the screen.'],
    ['negotiate', 'verb', '交渉する', 'PIRATE', 'RUBBER HOSE', 'We do not negotiate with seagulls. They always want the fries.', 'カモメとは交渉しない。あいつらは必ずポテトを要求する。', 'A pirate captain sits with arms crossed at a table facing a row of determined seagulls staring at a basket of fries.'],
    ['adequate', 'adjective', '十分な、適切な', 'BOSS', 'MINIMAL FLAT', 'Your work is adequate. That is the nicest thing I have ever said.', '君の仕事は、まあ十分だ。これは私が今までに言った中で、いちばんの褒め言葉だ。', 'A stone-faced boss hands a very small ribbon to an employee who is crying tears of joy.'],
    ['vendor', 'noun', '業者、売り手', 'RUMOR', 'LOW POLY', 'The new vendor delivers on time, but only by catapult.', '新しい業者は納期を守る。ただし、投石機でしか届けない。', 'Cardboard boxes fly through the air toward an office building, launched from a medieval catapult, while office workers duck.'],
    ['itinerary', 'noun', '旅程、日程表', 'ANNOUNCE', 'SHOWA RETRO', "Today's itinerary: breakfast, the haunted castle, lunch, and regret.", '本日の旅程です。朝食、幽霊の出る城、昼食、そして後悔。', 'A cheerful tour guide with a little flag leads nervous tourists toward a dark haunted castle, holding a schedule sheet.'],
    ['facilitate', 'verb', '促進する、円滑にする', 'SALES', 'POP ART', 'This coffee will facilitate your meeting. The second cup will end it.', 'このコーヒーは会議を円滑にします。2杯目は、会議を終わらせます。', 'A barista serves a giant cup of coffee to a sleepy meeting table; one attendee who already drank it is vibrating with wide eyes.'],
    ['fluctuate', 'verb', '変動する', 'WEATHER', 'BAUHAUS', "Prices fluctuate daily. So does my boss's mood.", '価格は毎日変動する。上司の機嫌も同じだ。', 'A zigzag price chart on the wall is mirrored by a boss whose face switches between a happy mask and an angry mask.'],
    ['protocol', 'noun', '手順、規定', 'ALIEN', 'SYNTHWAVE', 'According to protocol, we must greet the humans before taking their snacks.', '規定によれば、おやつをいただく前に、まず人類にあいさつをしなければならない。', 'Small aliens stand beside a picnic blanket reading a thick manual, while one of them reaches toward a bag of chips.'],
    ['depreciation', 'noun', '価値の低下、減価償却', 'WIZARD', 'LINOCUT', 'Even a magic wand suffers depreciation. Mine now only makes toast.', '魔法の杖にも価値の低下はある。わしの杖は、もうトーストしか作れん。', 'An old wizard points his worn wand dramatically and a single slice of toast pops out of the tip.'],
    ['resume', 'verb', '再開する', 'NEWS', 'ORIGAMI', 'The meeting will resume as soon as someone finds the manager under the paperwork.', '部長が書類の山の下から見つかりしだい、会議を再開します。', 'A mountain of paper covers a meeting table with one hand sticking out of it, while colleagues dig with shovels.'],
    ['comply', 'verb', '従う、応じる', 'SLOW', 'COLORED PENCIL', 'I always comply with the rules. I just read them very slowly.', '規則にはいつも従っています。ただ、読むのがとても遅いだけです。', 'A sloth in office clothes calmly reads an enormous rulebook at a desk while an alarm bell rings and coworkers run past.'],
    ['consent', 'noun', '同意、承諾', 'DOCTOR', 'WOODCUT', 'I need your consent before I remove the sword from your head.', '頭の剣を抜く前に、あなたの同意が必要です。', 'A doctor holds out a clipboard and pen to a knight who sits calmly on the exam table with a sword stuck through his helmet.'],
    ['dispose', 'verb', '処分する', 'GHOST', 'UKIYO-E', 'Please dispose of your old armor properly. The lake is not a trash can.', '古い鎧は正しく処分してください。湖はごみ箱ではありません。', 'An annoyed lake spirit rises from the water holding rusty pieces of armor, glaring at a guilty knight on the shore.'],
    ['viable', 'adjective', '実行可能な', 'GENERAL', 'SUMI-E', 'Running away is still a viable option, sir.', '逃げるというのも、まだ実行可能な選択肢です、閣下。', 'A tiny army faces a gigantic monster; an advisor whispers to the general and points discreetly backward.'],
    ['candidate', 'noun', '候補者', 'TRAILER', 'MONOCHROME MANGA', 'Three candidates. One job. Zero idea what the job is.', '候補者は3人。仕事は1つ。その仕事が何なのかは、誰も知らない。', 'Three nervous people in suits sit in a waiting room under a single spotlight, facing a mysterious closed door.'],
    ['applicant', 'noun', '応募者', 'RECEPTION', 'CHIBI', 'The next applicant has nine lives of work experience.', '次の応募者は、9回ぶんの人生の職歴をお持ちです。', 'A cat wearing a tie sits at a job interview and slides a very thick stack of papers toward impressed interviewers.'],
    ['shareholder', 'noun', '株主', 'ROYAL', 'STAINED GLASS', 'The shareholders demand answers. Also, more cookies at the meeting.', '株主の皆さまは説明を求めています。あと、総会のクッキーの増量も。', 'An angry crowd of elderly shareholders waves empty cookie plates at a sweating speaker on a podium.'],
    ['representative', 'noun', '担当者、代表者', 'COMPLAINT', 'FELT CRAFT', 'Please hold. A representative will ignore you shortly.', 'そのままお待ちください。まもなく担当者が、あなたを無視します。', 'A skeleton covered in cobwebs sits in an armchair still holding a telephone to its ear, musical notes floating from the receiver.'],
    ['intern', 'noun', 'インターン、実習生', 'RUMOR', 'CYBERPUNK NEON', 'The intern fixed the server by turning the whole building off and on again.', 'インターンは、ビルごと電源を入れ直してサーバーを直した。', 'A proud young intern pulls a giant power lever while every window of a tall office building flickers dark and bright.'],
    ['colleague', 'noun', '同僚', 'DIARY', 'SCREEN PRINT', 'My colleague is a cat. He attends every meeting and contributes nothing, like everyone else.', '私の同僚は猫だ。会議には毎回出るが、何も貢献しない。みんなと同じだ。', 'A cat sits upright in an office chair at a meeting table among bored human coworkers, a laptop open in front of it.'],
    ['recruit', 'verb', '採用する、募集する', 'VILLAIN', 'ART DECO', 'I do not recruit minions. They apply.', '手下は採用しない。向こうから応募してくるのだ。', 'A villain lounges on a throne while a very long line of small creatures waits, each holding a sheet of paper.'],
    ['distribute', 'verb', '配布する', 'TEACHER', 'IMPRESSIONIST', 'Please distribute these flyers. Not to the pigeons this time.', 'このチラシを配ってください。今回は、ハトにではなく。', 'A young employee in a park hands out leaflets to a flock of pigeons, each pigeon holding one in its beak.'],
    ['calculate', 'verb', '計算する', 'ROBOT', 'VAPORWAVE', 'I have calculated your chances of leaving on time. Please sit down.', '定時で帰れる確率を計算しました。どうぞ、お座りください。', 'A robot holding a long printout blocks the office door in front of a tired worker who already has a coat and bag on.'],
    ['eliminate', 'verb', '取り除く、排除する', 'AD', 'STICKER BOMB', 'This spray will eliminate ninety-nine percent of Mondays.', 'このスプレーは、月曜日の99パーセントを除去します。', 'A grinning salesperson sprays a wall calendar and one column of days dissolves into sparkles.'],
    ['complimentary', 'adjective', '無料の', 'ANNOUNCE', 'ROCOCO', 'Breakfast is complimentary. The dragon insurance is not.', '朝食は無料です。ドラゴン保険は、無料ではありません。', 'An elegant hotel breakfast buffet with happy guests, while a dragon peeks in through the tall window behind them.'],
    ['consecutive', 'adjective', '連続した', 'SPORTS', 'KABUKI POSTER', 'He has now lost for nine consecutive days, and the crowd loves him for it.', '彼はこれで9日連続の負けです。そして観客は、そんな彼が大好きです。', 'A tired wrestler lies face down in the ring while the crowd cheers wildly and throws flowers.'],
    ['exclusive', 'adjective', '限定の、独占的な', 'SALES', 'NEON SIGN', 'This offer is exclusive to members, and to anyone who asks nicely.', 'この特典は会員限定です。あと、感じよく頼んだ人にも。', 'A huge bouncer at a velvet rope melts into a smile as a tiny grandmother offers him a plate of cookies.'],
    ['extensive', 'adjective', '広範な、大規模な', 'DETECTIVE', 'NATURALIST FIELD NOTES', 'After extensive research, we found the missing pen. It was behind his ear.', '広範な調査の結果、なくなったペンを発見しました。彼の耳の後ろにありました。', 'A research team stands before walls of charts and maps, all pointing at a confused man with a pen tucked behind his ear.'],
    ['prevalent', 'adjective', '広く見られる、普及している', 'NEWS', 'EXPRESSIONIST', 'Yawning is now prevalent in every meeting room in the country.', 'あくびは今や、全国すべての会議室で広く見られます。', 'A meeting room where every person yawns widely at the same time, including the portrait hanging on the wall.'],
    ['inevitable', 'adjective', '避けられない', 'VILLAIN', 'SEINEN GEKIGA', 'Resistance is useless. The Monday meeting is inevitable.', '抵抗は無駄だ。月曜の会議は、避けられない。', 'A dark overlord in a cape points down a corridor at office workers fleeing from a gigantic rolling calendar.'],
    ['formidable', 'adjective', '手ごわい', 'SPORTS', 'SHOJO MANGA', 'Our next opponent is formidable. She is seven years old and never gets tired.', '次の対戦相手は手ごわい。7歳で、決して疲れません。', 'An exhausted adult chess master slumps at the board across from a grinning little girl bouncing in her chair.'],
    ['versatile', 'adjective', '万能の、多才な', 'AD', 'PATENT DIAGRAM', 'This versatile tool opens bottles, cuts paper, and ends arguments.', 'この万能ツールは、びんを開け、紙を切り、口論を終わらせます。', 'A pocket multi-tool with dozens of unfolded gadgets, shown in the center, with two tiny arguing figures falling silent beside it.'],
    ['bring about', 'phrase', '引き起こす、もたらす', 'WIZARD', 'EMAKI SCROLL', 'One small typo can bring about the end of a kingdom.', '小さな打ちまちがい1つが、王国の終わりをもたらすことがある。', 'A horrified scribe stares at his scroll while, outside the window, an army marches confidently in the wrong direction.'],
    ['carry out', 'phrase', '実行する', 'GENERAL', 'OIL PAINTING', 'We will carry out the plan at dawn. Or after coffee, whichever is later.', '計画は夜明けに実行する。あるいはコーヒーのあと。どちらか遅いほうだ。', 'Sleepy soldiers in a command tent hold coffee mugs while a yawning general leans on the map table at sunrise.'],
    ['follow up', 'phrase', '追って連絡する、後で確認する', 'GHOST', 'DOUBLE EXPOSURE', 'I will follow up on that email. I have been dead for a century, but I will follow up.', 'あのメールの件は、追って連絡します。死んで100年になりますが、追って連絡します。', 'A translucent ghost in an old suit types at a dusty computer in an abandoned office full of cobwebs.'],
    ['look into', 'phrase', '調べる、調査する', 'DETECTIVE', 'CRAYON', 'We will look into the missing cake. Please stop licking the evidence.', '消えたケーキの件は調査します。証拠をなめるのは、やめてください。', 'A detective writes in a notepad next to an empty cake stand while his assistant licks frosting off a plate.'],
    ['as of', 'phrase', '〜の時点で、〜付で', 'NEWS', 'POLAROID', 'As of today, the office dog is officially the manager.', '本日付で、オフィスの犬が正式に部長になりました。', 'A dog wearing a tie sits proudly in a big executive chair while the office staff applaud around the desk.'],
    ['deteriorate', 'verb', '悪化する', 'DOCTOR', 'CHARCOAL', 'Your condition will deteriorate if you keep reading emails at midnight.', '夜中にメールを読み続けると、症状は悪化しますよ。', 'A doctor examines a hollow-eyed office worker who sits in bed at night lit only by the glow of a phone.'],
    ['approximately', 'adverb', 'およそ、約', 'ROBOT', 'MECHA', 'The repair will take approximately five minutes, or three weeks.', '修理には、およそ5分、または3週間かかります。', 'A repair robot shrugs next to a broken elevator with parts scattered everywhere, a crowd waiting with crossed arms.'],
    ['relatively', 'adverb', '比較的', 'TEACHER', 'TAPESTRY', 'The dragon is relatively friendly. It only burned one village.', 'あのドラゴンは比較的おとなしい。焼いた村は、1つだけだ。', 'A guide proudly introduces a smiling dragon to worried villagers, with one smoking ruin far in the background.'],
    ['oversee', 'verb', '監督する', 'RUMOR', 'NIHONGA', 'A parrot was hired to oversee the project. It repeats every deadline.', 'プロジェクトの監督に、オウムが雇われた。締め切りを全部、くり返してくる。', 'A colorful parrot perches above a construction site wearing a tiny hard hat, squawking down at tired workers.'],
    ['incur', 'verb', '(費用や罰を)負う、被る', 'PIRATE', 'GREEK POTTERY', 'Any sailor who sings off-key will incur a fine of two gold coins.', '音を外して歌った船乗りは、金貨2枚の罰金を負う。', 'A captain holds out a jar while an embarrassed singing sailor drops two coins into it, the crew covering their ears.'],
    ['discretion', 'noun', '裁量、判断', 'BOSS', 'CUBIST', "Lunch breaks are at the manager's discretion, and the manager is never hungry.", '昼休みは部長の裁量で決まる。そして部長は、決して腹が減らない。', 'A stern manager sits like a statue at his desk while starving employees clutch lunchboxes and stare at the wall clock.'],
    ['waive', 'verb', '免除する、放棄する', 'SALES', 'RETRO 50S AD', 'We will waive the delivery fee if you carry the piano yourself.', 'ピアノをご自分で運んでいただければ、配送料は免除します。', 'A smiling shop clerk waves goodbye as a customer staggers out of the store carrying a grand piano on his back.'],
    ['brochure', 'noun', 'パンフレット、案内書', 'COMPLAINT', 'KIRIE PAPERCUT', 'The brochure promised a quiet beach. It did not mention the penguin parade.', 'パンフレットには、静かなビーチとありました。ペンギンの行進のことは、書いてありませんでした。', 'A sunbather on a beach towel holds a folded leaflet while a loud marching band of penguins parades around her.'],
    ['attachment', 'noun', '添付ファイル', 'EXCUSE', 'LINE ART', 'I forgot the attachment again. Please enjoy this empty email.', 'また添付を忘れました。この空っぽのメールを、お楽しみください。', 'An office worker peers into a large open envelope that has nothing inside, turning it upside down and shaking it.'],
    ['flyer', 'noun', 'チラシ', 'RUMOR', 'STENCIL STREET ART', 'Someone put a flyer on the dragon. It now has many customers.', '誰かがドラゴンにチラシを貼った。おかげで、お客がたくさん来ている。', 'A sleeping dragon with a paper notice stuck to its side, and a long patient queue of villagers waiting in front of it.'],
    ['newsletter', 'noun', '社内報、会報', 'DIARY', 'WASHI COLLAGE', 'Nobody reads the company newsletter, so I hid my resignation in it.', '社内報は誰も読まない。だから私は、そこに辞表を隠した。', 'An employee tiptoes out of the office with a suitcase while the boss drops an unread folded bulletin into the bin.'],
    ['pamphlet', 'noun', '小冊子、しおり', 'WIZARD', 'BAROQUE', 'Read the safety pamphlet before you open the cursed box. Too late, I see.', '呪いの箱を開ける前に、安全のしおりを読むのだ。…手遅れか。', 'An apprentice holds an open glowing box with tentacles pouring out while a wizard beside him holds a small booklet and covers his face.'],
    ['yield', 'verb', '生み出す、もたらす', 'AD', 'BOTANICAL PLATE', 'This magic bean will yield one giant pumpkin and several lawsuits.', 'この魔法の豆は、巨大なかぼちゃ1個と、訴訟を数件生み出します。', 'A farmer stands proudly beside a house-sized pumpkin that has crushed the neighbor\'s fence, the neighbors arriving with briefcases.'],
    ['allocate', 'verb', '割り当てる', 'ROYAL', 'BYZANTINE ICON', 'The king will allocate half the budget to cake. The other half is also for cake.', '王は、予算の半分をケーキに割り当てる。残りの半分もケーキだ。', 'A king divides a pile of gold into two heaps with his scepter, a towering cake beside each heap, the treasurer fainting.'],
    ['pertain', 'verb', '関係する', 'TEACHER', 'MOSAIC', 'Your question does not pertain to this meeting, but yes, the cat is mine.', 'ご質問は、この会議には関係ありません。ですが、ええ、その猫は私のです。', 'A presenter stands at a whiteboard with a cat sitting on top of his head while an attendee raises a hand.'],
];
const COSTS = [1, 2, 3, 2, 1, 4, 2, 3, 5, 2, 1, 3, 2, 4, 3];
const ABILS = ['NONE', 'RUSH', 'NONE', 'INSIGHT', 'WARD', 'NONE', 'HEAL', 'STRIKE', 'NONE', 'RUSH', 'WARD', 'NONE', 'INSIGHT', 'STRIKE', 'HEAL'];

// もう有る20語: 点数帯を入れる(元の一覧に有る語はその値、無い語はここで決めた)。コストは今までどおり(level)
const BAND_OLD = { postpone: 500, submit: 500, invoice: 500, warranty: 500, inventory: 500, confirm: 500, deadline: 500, refund: 500, available: 500,
    mandatory: 600, renew: 600, extend: 600, agenda: 600, 'in charge of': 600, tentative: 700, defective: 700, promptly: 700, temporarily: 700, reimburse: 800, 'on behalf of': 800 };
for (const c of pack.cards) {
    if (BAND_OLD[c.word]) { c.band = BAND_OLD[c.word]; if (!c.cost) c.cost = c.level; }
}
const styles = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/english/duel-styles.json'), 'utf8')).map(s => s.name));
let n = pack.cards.length, added = 0;
W.forEach(([word, pos, ja, tone, style, line, lineJa, scene], i) => {
    if (pack.cards.some(c => c.word === word)) return;
    if (!TONES[tone]) throw new Error('型が無い ' + tone);
    if (!styles.has(style)) throw new Error('画風が無い ' + style);
    if (!line.toLowerCase().includes(word.split(' ')[0])) throw new Error('英文に語が無い ' + word);
    const [toneJa, voice, who, direction] = TONES[tone];
    n++;
    pack.cards.push({ id: 'tw' + String(n).padStart(3, '0'), word, pos, ja, level: 1, band: 500, cost: COSTS[i % COSTS.length], ability: ABILS[i % ABILS.length], tone, toneJa, style, line, lineJa, scene,
        voice: { voice, who, direction: `${direction} Stress '${word}'.` } });
    added++;
});
pack.titleJa = '仕事の必須語';
pack.note = '1枚が1語。英文は全部自作(試験の過去問や市販教材からの転載なし)。語と意味と点数帯の元は、とにおラボの頻出310語。pos は品詞で、カードの属性になる(動詞=flame、名詞=earth、形容詞=wind、副詞=thunder、熟語=aqua)。band は TOEIC の点数帯で、章になる。cost は対戦のコスト。tone は英文の型。';
fs.writeFileSync(P, JSON.stringify(pack, null, 2) + '\n');
const by = {};
for (const c of pack.cards) by[c.band] = (by[c.band] || 0) + 1;
console.log(`足した ${added} 語。合計 ${pack.cards.length} 語。点数帯ごと:`, by);
