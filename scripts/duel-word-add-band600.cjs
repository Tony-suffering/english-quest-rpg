#!/usr/bin/env node
// 単語パックに、TOEIC 600点帯の57語を足す(2026-11-27)。一度きりの取り込み。作りは duel-word-add-band500.cjs と同じ。
// 語と意味の元は、とにおラボの頻出310語(level: 600 のうち未収録の分)。英文・訳・場面は全部ここで書いた自作。
//   node scripts/duel-word-add-band600.cjs
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'src/data/english/duel-words-toeic.json');
const pack = JSON.parse(fs.readFileSync(P, 'utf8'));
const BAND = 600;

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
    DOCTOR: ['医者の診断', 'sage', 'a calm doctor', 'Gentle, clinical, matter-of-fact.'],
    GHOST: ['幽霊の独白', 'sage', 'a resigned ghost', 'Hollow, soft, deadpan.'],
    GENERAL: ['頼りない将軍', 'ash', 'an unsure general', 'Tries to sound confident, not quite managing.'],
    TRAILER: ['映画の予告編', 'onyx', 'a movie trailer narrator', 'Deep and epic, with dramatic pauses between sentences.'],
    ROYAL: ['王の会議', 'fable', 'a solemn royal herald', 'Formal and grave, announcing state business.'],
    COMPLAINT: ['お客様への説明', 'shimmer', 'an unbothered merchant', 'Cool, polite, dry.'],
    DIARY: ['会社員の日記', 'ballad', 'a deadpan office worker', 'Quiet, dry, like reading a diary.'],
    VILLAIN: ['悪役の決め台詞', 'onyx', 'a grand theatrical villain', 'Booming and proud.'],
    TEACHER: ['先輩の小言', 'shimmer', 'a patient supervisor', 'Polite, but tired of repeating it.'],
    AD: ['通販の売り文句', 'verse', 'a TV shopping host', 'Energetic infomercial pitch.'],
    SPORTS: ['実況中継', 'verse', 'an excited sports commentator', 'Fast, excited play-by-play.'],
    EXCUSE: ['新人の言い訳', 'ballad', 'a sheepish employee', 'Apologetic and a little embarrassed.'],
};

// [語, 品詞, 意味, 型, 画風, 英文, 訳, 場面]
const W = [
    ['revenue', 'noun', '収益', 'NEWS', 'ISOMETRIC', 'Revenue doubled this year. So did the number of meetings about revenue.', '収益は今年、2倍になった。収益についての会議の数も、2倍になった。', 'A rising bar chart glows on a big screen while identical meeting rooms full of people multiply into the distance.'],
    ['substantial', 'adjective', 'かなりの、相当な', 'SALES', 'RETRO 50S AD', 'We offer a substantial discount to customers who stop asking for discounts.', '値引きを求めるのをやめたお客様には、かなりの値引きをいたします。', 'A beaming shopkeeper hands an enormous coupon to a customer who is covering his own mouth with both hands.'],
    ['initiative', 'noun', '自発性、主導権', 'BOSS', 'CONSTRUCTIVIST POSTER', 'Show some initiative. But ask me first.', '自発性を見せなさい。ただし、先に私に聞くこと。', 'A boss points heroically forward while an employee freezes mid-stride with one hand raised to ask permission.'],
    ['implement', 'verb', '導入する、実行する', 'ROBOT', 'COMIC BOOK', 'We will implement the new system on Monday and blame it by Tuesday.', '新しいシステムは月曜に導入します。火曜には、そのせいにします。', 'Office workers proudly unveil a giant shiny machine; beside it the same workers all point accusing fingers at it.'],
    ['specify', 'verb', '明示する、具体的に述べる', 'COMPLAINT', 'FAIRY TALE ENGRAVING', 'You asked for a horse. You did not specify that it should be alive.', '馬を、とのご注文でした。生きていること、とは明示されていませんでした。', 'A calm merchant presents a wooden rocking horse to a furious knight in full armor.'],
    ['oversight', 'noun', '見落とし、監督', 'EXCUSE', 'STORYBOOK', "Leaving the dragon's cage open was a small oversight.", 'ドラゴンの檻を開けっぱなしにしたのは、ちょっとした見落としでした。', 'A sheepish zookeeper stands beside a wide-open cage while a dragon flies away over a distant smoking town.'],
    ['proficient', 'adjective', '堪能な、熟練した', 'RUMOR', 'MINIMAL FLAT', 'She is proficient in five languages and silent in all of them during meetings.', '彼女は5か国語に堪能だ。そして会議中は、そのすべてで黙っている。', 'A woman sits silently at a meeting table with five empty speech bubbles above her, while everyone else talks.'],
    ['amend', 'verb', '改正する、修正する', 'ROYAL', 'ILLUMINATED MANUSCRIPT', 'The king wishes to amend the law. Bedtime is now after dessert.', '王は、法の改正を望んでおられる。就寝時間は、デザートのあとになる。', 'A child king in an oversized crown stamps a scroll while ministers bow and a servant carries in a cake.'],
    ['lease', 'noun', '賃貸借契約', 'GHOST', 'GOTHIC', 'The lease clearly says no pets, no parties, and no hauntings after ten.', '契約書には、はっきり書いてあります。ペット禁止、宴会禁止、夜10時以降の心霊現象禁止。', 'A landlord holds up a document to a group of guilty-looking ghosts floating in an old apartment.'],
    ['merger', 'noun', '合併', 'NEWS', 'BAUHAUS', 'After the merger, the two companies now share one office and one stapler.', '合併のあと、2つの会社は、1つのオフィスと1つのホチキスを共有している。', 'Two groups of office workers in different colored uniforms play tug-of-war over a single stapler.'],
    ['procurement', 'noun', '調達、仕入れ', 'PIRATE', 'WOODCUT', 'Procurement is what we call it now. We used to call it treasure hunting.', '今では調達と呼んでいる。昔は、宝探しと呼んでいたがな。', 'Pirates wearing neckties carry a treasure chest through an office corridor, one of them checking a clipboard.'],
    ['benchmark', 'noun', '基準、指標', 'SPORTS', 'LINE ART', 'Our benchmark is simple: be slightly better than the office plant.', 'うちの基準は単純だ。オフィスの観葉植物より、少しだけましであること。', 'An employee and a potted plant sit at neighboring desks under a scoreboard, the plant wearing a tiny medal.'],
    ['naive', 'adjective', '世間知らずな、甘い', 'GRANDMA', 'WATERCOLOR', 'It is naive to think the cat will share the fish.', '猫が魚を分けてくれると思うのは、甘いよ。', 'A hopeful child holds out an empty plate toward a cat that hugs a large fish protectively.'],
    ['leverage', 'verb', '活用する', 'VILLAIN', 'FILM NOIR', 'We must leverage our greatest strength: nobody knows what we do.', '我々の最大の強みを活用するのだ。我々が何をしているのか、誰も知らない、という強みを。', 'Shadowy executives lean over a table under a single hanging lamp, surrounded by blank charts.'],
    ['proprietor', 'noun', '店主、経営者', 'RECEPTION', 'GOUACHE', 'The proprietor of this inn is a bear, so please compliment the honey.', 'この宿の主人は熊です。ですから、はちみつを褒めてください。', 'A large bear in an apron stands behind an inn counter proudly holding a jar of honey while nervous guests applaud.'],
    ['delegate', 'verb', '任せる、委任する', 'BOSS', 'POP ART', 'A good manager knows how to delegate. A great one delegates that too.', '良い管理職は、任せ方を知っている。偉大な管理職は、それすら人に任せる。', 'A manager lies in a hammock handing a folder to an assistant, who passes it along a long chain of people.'],
    ['revamp', 'verb', '一新する、改修する', 'AD', 'VAPORWAVE', 'We decided to revamp the website. It is now the same, but blue.', 'ウェブサイトを一新することにしました。前と同じですが、青くなりました。', 'Designers proudly unveil a computer screen that looks exactly like the old one beside it, only in blue.'],
    ['concur', 'verb', '同意する、意見が一致する', 'ROYAL', 'BYZANTINE ICON', 'The council members concur. They have no idea what they agreed to.', '評議員は全員、同意している。何に同意したのかは、誰も分かっていない。', 'A row of solemn robed council members nod together, every one of them fast asleep.'],
    ['turnover', 'noun', '離職率、売上高', 'RUMOR', 'RISOGRAPH', 'Staff turnover is high here. The last manager left during his welcome speech.', 'ここは離職率が高い。前の部長は、就任のあいさつの途中で辞めた。', 'A man walks away from a podium mid-speech carrying a box of belongings while the staff watch in confusion.'],
    ['insolvency', 'noun', '支払い不能、倒産', 'WIZARD', 'ART NOUVEAU', 'The wizard declared insolvency after turning all his gold into butterflies.', 'その魔法使いは、金貨をすべて蝶に変えてしまったあと、破産を申し立てた。', 'A wizard stares into an empty treasure chest as golden butterflies flutter out of the window.'],
    ['supervisor', 'noun', '上司、監督者', 'DIARY', 'COLORED PENCIL', 'My supervisor says I have potential. He has said it for eleven years.', '上司は、私には将来性があると言う。11年間、そう言い続けている。', 'A graying employee sits at the same small desk under piles of old calendars while a supervisor gives a thumbs up.'],
    ['spokesperson', 'noun', '広報担当者', 'NEWS', 'SEINEN GEKIGA', 'A spokesperson for the dragon said the village was already on fire.', 'ドラゴンの広報担当者は、村はもとから燃えていた、と述べた。', 'A small lizard in a suit speaks at a podium full of microphones while a dragon looks innocent behind it, smoke rising.'],
    ['accountant', 'noun', '会計士', 'TRAILER', 'PULP COVER', 'In a world of chaos, one accountant dares to ask for the receipts.', '混沌の世界で、ひとりの会計士が、あえて領収書を求める。', 'A heroic accountant holds a calculator like a shield against a tornado of flying papers.'],
    ['executive', 'noun', '重役、幹部', 'RUMOR', 'OIL PAINTING', 'The executives held a retreat to discuss why nobody likes retreats.', '重役たちは合宿を開いた。なぜ誰も合宿が好きではないのかを、話し合うために。', 'Executives in suits sit awkwardly on logs around a campfire in the woods, one standing at a flip chart.'],
    ['stakeholder', 'noun', '利害関係者', 'GENERAL', 'DOUBLE EXPOSURE', 'We must inform every stakeholder, including the ghost in the basement.', '利害関係者の全員に知らせなければならない。地下室の幽霊も含めて。', 'A manager with a clipboard waves from the basement stairs to a friendly ghost holding a coffee mug.'],
    ['attorney', 'noun', '弁護士', 'DETECTIVE', 'CHARCOAL', 'As his attorney, I advise my client to stay silent. He is a parrot and repeats everything.', '弁護士として、依頼人には黙秘を勧めます。彼はオウムで、何でもくり返してしまうので。', 'A lawyer in a courtroom gently holds the beak of a parrot perched on the witness stand.'],
    ['revise', 'verb', '修正する、改訂する', 'TEACHER', 'CRAYON', 'Please revise the report. This time, try including some facts.', '報告書を修正してください。今回は、事実もいくつか入れてみましょう。', 'A supervisor hands back a report that is entirely covered with doodles of dragons to a smiling employee.'],
    ['terminate', 'verb', '終了する、打ち切る', 'ROBOT', 'MECHA', 'Your free trial will terminate in three seconds. Thank you for your loyalty.', '無料お試し期間は、3秒後に終了します。ご愛顧ありがとうございました。', 'A robot waves goodbye as a trapdoor opens under a surprised customer sitting on a sofa.'],
    ['accumulate', 'verb', 'たまる、蓄積する', 'GRANDMA', 'PENCIL SKETCH', 'Dust and unread emails accumulate at exactly the same speed.', 'ほこりと未読メールは、まったく同じ速さでたまっていく。', 'A desk buried in thick dust and cobwebs, its computer screen overflowing with a pile of envelopes.'],
    ['anticipate', 'verb', '予期する、見込む', 'GENERAL', 'SUMI-E', 'We did not anticipate that the enemy would simply go home.', '敵がそのまま家に帰るとは、予期していなかった。', 'A fully armed army stands on a battlefield watching tiny enemy figures stroll away into the sunset.'],
    ['distinguish', 'verb', '区別する、見分ける', 'DOCTOR', 'SURREAL', 'I can no longer distinguish Monday from Thursday, doctor.', '先生、もう月曜と木曜の区別がつきません。', 'A patient lies on a couch holding up two identical melting calendars while a doctor takes notes.'],
    ['enhance', 'verb', '高める、向上させる', 'AD', 'STICKER BOMB', 'These glasses enhance your vision and make you look like you read books.', 'この眼鏡は視力を高め、さらに、本を読む人のように見せてくれます。', 'A salesperson places glasses on a gorilla, who instantly looks scholarly and holds a thick book.'],
    ['confidential', 'adjective', '機密の、内密の', 'RUMOR', 'SCREEN PRINT', 'This is strictly confidential, so I have only told the whole office.', 'これは極秘だ。だから、オフィスの全員にしか話していない。', 'One office worker whispers into an ear, starting a chain of whisperers that loops around the whole office back to him.'],
    ['considerable', 'adjective', 'かなりの、相当な', 'NEWS', 'NATURALIST FIELD NOTES', 'The picnic caused considerable damage to the ant economy.', 'そのピクニックは、アリの経済に、かなりの損害を与えた。', 'A tiny ant city in the grass lies partly crushed under a giant picnic basket, ants surveying the damage.'],
    ['feasible', 'adjective', '実行可能な', 'WIZARD', 'TAROT CARD', 'Flying to work by broom is feasible, but parking is a nightmare.', 'ほうきで通勤するのは、実行可能だ。ただ、止める場所が悪夢だ。', 'A wizard hovers on a broom above a parking lot completely packed with other brooms.'],
    ['explicit', 'adjective', '明確な、はっきりした', 'TEACHER', 'SYNTHWAVE', 'My instructions were explicit: do not press the red button. Which one did you press?', '指示は明確だったはずだ。赤いボタンは押すな、と。で、どれを押した?', 'A supervisor covers her face while an employee keeps one finger on a glowing red button, alarms flashing in a lab.'],
    ['incidental', 'adjective', '付随的な、ついでの', 'PIRATE', 'UKIYO-E', 'The treasure is the goal. Any singing along the way is incidental.', '目的は宝だ。道中の歌は、ついでのものにすぎん。', 'Pirates row a boat singing happily while their stern captain points at a treasure map.'],
    ['inadvertent', 'adjective', 'うっかりの、不注意による', 'EXCUSE', 'CYBERPUNK NEON', 'It was an inadvertent mistake. I only replied to all four thousand people.', 'うっかりしたミスでした。4千人の全員に、返信しただけです。', 'A horrified worker at a computer watches thousands of glowing envelopes fly out toward a vast crowd.'],
    ['pertinent', 'adjective', '関連のある、適切な', 'DETECTIVE', 'MONOCHROME MANGA', 'Please share only pertinent details. I do not need to know about your cat.', '関連のある事柄だけを、お話しください。猫の話は結構です。', 'A tired detective rests his head on his hand while a witness eagerly shows him dozens of cat photographs.'],
    ['account for', 'phrase', '(割合を)占める、説明する', 'NEWS', 'LOW POLY', 'Snacks account for ninety percent of our office budget.', 'おやつが、うちのオフィスの予算の90パーセントを占めている。', 'A pie chart almost entirely one color stands beside a mountain of snacks while an accountant stares in shock.'],
    ['figure out', 'phrase', '理解する、解き明かす', 'ALIEN', 'PSYCHEDELIC 60S', 'We have studied humans for years and still cannot figure out Mondays.', '我々は人類を何年も研究してきた。それでも、月曜日というものが理解できない。', 'Aliens peer through a window at gloomy commuters shuffling to work, scribbling notes in confusion.'],
    ['keep track of', 'phrase', '記録する、把握する', 'DIARY', 'EXPRESSIONIST', "I keep track of every coffee I drink. Today's number is not safe to say.", '飲んだコーヒーは、全部記録している。今日の数は、口に出せるものではない。', 'A jittery worker stands before a wall covered in tally marks beside a tall tower of empty coffee cups.'],
    ['take effect', 'phrase', '効き始める、効力を発する', 'WIZARD', 'KAWAII PASTEL', 'The sleeping spell will take effect in ten seconds, so please sit down first.', '眠りの呪文は、10秒で効き始める。だから先に、座っておくように。', 'A wizard casts sparkles at a yawning knight standing on a ladder while helpers rush to place cushions below.'],
    ['prior to', 'phrase', '〜より前に', 'ANNOUNCE', 'VINTAGE TRAVEL POSTER', 'Please remove your armor prior to entering the swimming pool.', 'プールにお入りになる前に、鎧をお脱ぎください。', 'A lifeguard blows a whistle and points at a knight in full armor standing on the diving board.'],
    ['respectively', 'adverb', 'それぞれ', 'SPORTS', 'GREEK POTTERY', 'The tortoise and the hare finished first and last, respectively.', 'カメとウサギは、それぞれ1位と最下位でゴールした。', 'A tortoise breaks the finish tape while a hare sleeps under a tree far behind, animals cheering.'],
    ['substantially', 'adverb', '大幅に、かなり', 'WEATHER', 'PAPER DIORAMA', 'Rainfall will increase substantially today, so bring a boat.', '本日の雨量は、大幅に増える見込みです。ボートをお持ちください。', 'A smiling weather presenter stands in a studio with water up to her waist while a commuter rows past behind her.'],
    ['alternatively', 'adverb', 'あるいは、その代わりに', 'GENERAL', 'EMAKI SCROLL', 'We could attack at dawn. Alternatively, we could all have breakfast.', '夜明けに攻撃することもできます。あるいは、みんなで朝食にすることも。', 'A soldier offers his general a choice, holding a sword in one hand and a pan of eggs in the other.'],
    ['eligible', 'adjective', '資格のある、対象となる', 'RECEPTION', 'ROCOCO', 'You are eligible for a free upgrade, because nobody else wanted the haunted room.', '無料でお部屋を格上げできます。幽霊の出る部屋を、ほかに誰も希望されなかったので。', 'A receptionist hands an ornate key to a tired traveler while a ghost waves from the top of a grand staircase.'],
    ['correspondence', 'noun', '通信、やり取りの文書', 'GHOST', 'LINOCUT', 'All correspondence with the owl must be sent before midnight.', 'フクロウとのやり取りは、すべて真夜中までに送ること。', 'An owl wearing a postal cap stamps letters at a tiny desk by candlelight, a clock near midnight behind it.'],
    ['memorandum', 'noun', '社内連絡文書、メモ', 'BOSS', 'ORIGAMI', 'The memorandum about wasting paper was forty pages long.', '紙の無駄づかいについての社内文書は、40ページあった。', 'An employee holds a very thick stack of paper next to a printer that is still printing more.'],
    ['directory', 'noun', '名簿', 'RUMOR', 'POLAROID', 'The staff directory lists forty employees and one very confident raccoon.', '社員名簿には、従業員40名と、やけに自信のあるアライグマ1匹が載っている。', 'An open binder of staff portrait photos, one of which shows a raccoon wearing a tie and smiling.'],
    ['receipt', 'noun', '領収書、レシート', 'PIRATE', 'RUBBER HOSE', 'No receipt, no refund. Those are the rules of the sea.', '領収書がなければ、返金もない。それが海の掟だ。', 'A pirate shopkeeper stands with arms crossed at a dockside stall while a sailor with a broken compass searches his pockets.'],
    ['endorse', 'verb', '推薦する、支持する', 'AD', 'ART DECO', 'Nine out of ten dragons endorse this fire insurance.', 'ドラゴン10頭のうち9頭が、この火災保険を推薦しています。', 'A line of dragons give thumbs up beside a tiny insurance salesman, while one dragon looks away.'],
    ['tangible', 'adjective', '目に見える、具体的な', 'BOSS', 'CUBIST', 'We need tangible results, not another beautiful chart.', '必要なのは、目に見える成果だ。きれいなグラフは、もういらない。', 'A boss pushes away a huge ornately framed chart that a proud employee presents like a painting.'],
    ['consolidate', 'verb', '統合する', 'ROYAL', 'TAPESTRY', 'The two kingdoms will consolidate their armies and their lunch menus.', '2つの王国は、軍隊と、昼食の献立を統合する。', 'Two kings shake hands while soldiers in two different colors share one long lunch table.'],
    ['alleviate', 'verb', '和らげる、軽減する', 'DOCTOR', 'NIHONGA', 'This tea will alleviate your stress. Quitting your job would also work.', 'このお茶で、ストレスは和らぎます。仕事を辞めても、同じ効果があります。', 'A doctor hands a steaming cup of tea to a frazzled office worker whose hair stands on end.'],
    ['forthcoming', 'adjective', '近く予定されている', 'ANNOUNCE', 'IMPRESSIONIST', 'Details of the forthcoming party are secret, especially from the boss whose party it is.', '近く予定されているパーティーの詳細は、秘密です。とくに、主役である部長には。', 'Employees hide balloons and a cake behind their backs as a suspicious boss walks past.'],
];
const COSTS = [2, 1, 3, 2, 4, 1, 3, 2, 5, 3, 2, 4, 1, 3, 2];
const ABILS = ['RUSH', 'NONE', 'WARD', 'NONE', 'STRIKE', 'INSIGHT', 'NONE', 'HEAL', 'NONE', 'RUSH', 'NONE', 'WARD', 'HEAL', 'INSIGHT', 'STRIKE'];

const styles = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/english/duel-styles.json'), 'utf8')).map(s => s.name));
let n = pack.cards.length, added = 0;
W.forEach(([word, pos, ja, tone, style, line, lineJa, scene], i) => {
    if (pack.cards.some(c => c.word === word)) return;
    if (!TONES[tone]) throw new Error('型が無い ' + tone);
    if (!styles.has(style)) throw new Error('画風が無い ' + style);
    if (!line.toLowerCase().includes(word.split(' ')[0])) throw new Error('英文に語が無い ' + word);
    const [toneJa, voice, who, direction] = TONES[tone];
    n++;
    pack.cards.push({ id: 'tw' + String(n).padStart(3, '0'), word, pos, ja, level: 2, band: BAND, cost: COSTS[i % COSTS.length], ability: ABILS[i % ABILS.length], tone, toneJa, style, line, lineJa, scene,
        voice: { voice, who, direction: `${direction} Stress '${word}'.` } });
    added++;
});
fs.writeFileSync(P, JSON.stringify(pack, null, 2) + '\n');
const by = {};
for (const c of pack.cards) by[c.band] = (by[c.band] || 0) + 1;
console.log(`足した ${added} 語。合計 ${pack.cards.length} 語。点数帯ごと:`, by);
