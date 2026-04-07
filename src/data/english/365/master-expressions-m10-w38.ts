// Month 10 Week 38: 外国を知る / Learning About Other Cultures
// Days 278-284, 70 expressions total

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Keywords per Day
// ============================================================
const DAY_278_KEYWORDS: KeyWord[] = [
  { en: 'etiquette', ja: 'マナー・礼儀作法', pron: 'ET-ih-ket', example: 'Table etiquette varies by country.', note: 'フランス語由来。日本語の「エチケット」とほぼ同じ' },
  { en: 'slurp', ja: 'ズルズル音を立てて食べる', pron: 'SLURP', example: 'In Japan, you can slurp noodles.', note: '日本では良いマナーだけど海外ではNG。文化差の代表例' },
  { en: 'utensils', ja: '食器・カトラリー', pron: 'yoo-TEN-sulz', example: 'Which utensils should I use?', note: 'fork, knife, spoonの総称。箸はchopsticks' },
  { en: 'rude', ja: '失礼な', pron: 'ROOD', example: 'Is it rude to eat with my hands?', note: 'impoliteよりカジュアル。日常会話で頻出' },
  { en: 'customary', ja: '慣習的な', pron: 'KUS-tuh-mair-ee', example: 'It is customary to tip in the US.', note: 'custom(習慣)の形容詞形。usualより格式がある' },
];

const DAY_279_KEYWORDS: KeyWord[] = [
  { en: 'bow', ja: 'お辞儀する', pron: 'BAO', example: 'Japanese people bow when they greet.', note: '発音注意。bow(弓)はBOH。お辞儀はBAO' },
  { en: 'handshake', ja: '握手', pron: 'HAND-shayk', example: 'A firm handshake is important in business.', note: 'firmは「しっかりした」。弱い握手はdead fish handshakeと言われる' },
  { en: 'gesture', ja: 'ジェスチャー・身振り', pron: 'JES-chur', example: 'That gesture means different things in different countries.', note: '同じジェスチャーでも国で意味が変わる。OKサインとか' },
  { en: 'formal', ja: 'フォーマルな・堅い', pron: 'FOR-mul', example: 'German greetings tend to be more formal.', note: '対義語はcasual/informal。日本の敬語文化に近い概念' },
  { en: 'cheek kiss', ja: '頬にキス', pron: 'CHEEK KIS', example: 'In France, people do cheek kisses.', note: '何回やるかは地域で違う。1回、2回、3回とバラバラ' },
];

const DAY_280_KEYWORDS: KeyWord[] = [
  { en: 'punctual', ja: '時間に正確な', pron: 'PUNK-choo-ul', example: 'Japanese trains are extremely punctual.', note: 'on timeよりフォーマル。日本人は世界的に見てpunctualな国民' },
  { en: 'flexible', ja: '柔軟な', pron: 'FLEK-sih-bul', example: 'Some cultures are more flexible about time.', note: '時間だけじゃなく考え方にも使える万能語' },
  { en: 'deadline', ja: '締め切り', pron: 'DED-line', example: 'Missing a deadline is a big deal here.', note: 'dead + line。元は「これを超えたら死ぬ線」が語源' },
  { en: 'laid-back', ja: 'のんびりした', pron: 'LAYD BAK', example: 'The work culture there is pretty laid-back.', note: 'relaxedのカジュアル版。南国のイメージ' },
  { en: 'rushing', ja: '急いでいる', pron: 'RUSH-ing', example: 'Why is everyone always rushing?', note: 'hurryingと同義。日本の通勤ラッシュはrush hourそのまま' },
];

const DAY_281_KEYWORDS: KeyWord[] = [
  { en: 'household', ja: '世帯・家庭', pron: 'HAUS-hohld', example: 'In some countries, three-generation households are normal.', note: 'familyより「一つ屋根の下」感が強い' },
  { en: 'extended family', ja: '大家族・親戚', pron: 'ek-STEN-did FAM-uh-lee', example: 'I grew up in an extended family.', note: '核家族はnuclear family。extended=広がった' },
  { en: 'independence', ja: '独立・自立', pron: 'in-deh-PEN-dens', example: 'Americans value independence from a young age.', note: '18歳で家を出るのが当たり前の文化。日本とは大きく違う' },
  { en: 'elder', ja: '年長者', pron: 'EL-dur', example: 'Respecting elders is important in Asian cultures.', note: 'olderより敬意がある。elderlyは「高齢の」' },
  { en: 'upbringing', ja: '育ち・しつけ', pron: 'UP-bring-ing', example: 'Your upbringing shapes your values.', note: 'bring up(育てる)の名詞形。「育ちがいい」はgood upbringing' },
];

const DAY_282_KEYWORDS: KeyWord[] = [
  { en: 'faith', ja: '信仰・信念', pron: 'FAYTH', example: 'People of different faiths live together here.', note: 'religionより個人的な響き。beliefに近い' },
  { en: 'spiritual', ja: 'スピリチュアルな・精神的な', pron: 'SPIR-ih-choo-ul', example: 'Japan has a very spiritual culture.', note: '宗教的というより「精神性がある」ニュアンス。日本の神道的感覚に近い' },
  { en: 'tolerance', ja: '寛容さ', pron: 'TOL-ur-uns', example: 'Tolerance for different views is essential.', note: 'tolerate(我慢する)の名詞形。多文化社会のキーワード' },
  { en: 'sacred', ja: '神聖な', pron: 'SAY-krid', example: 'This place is sacred to the local people.', note: 'holyと似てるがsacredの方が広い。神社仏閣にも使える' },
  { en: 'secular', ja: '世俗的な・非宗教的な', pron: 'SEK-yoo-lur', example: 'Japan is mostly a secular society.', note: 'sacredの対義語。宗教と関係ない、の意味。日本は典型的なsecular社会' },
];

const DAY_283_KEYWORDS: KeyWord[] = [
  { en: 'sarcasm', ja: '皮肉・嫌味', pron: 'SAR-kaz-um', example: 'British humor is full of sarcasm.', note: '日本語の皮肉より日常的に使われる。特にイギリス英語' },
  { en: 'punchline', ja: 'オチ', pron: 'PUNCH-line', example: 'The punchline caught me off guard.', note: 'ジョークの最後の決め台詞。日本の「オチ」とほぼ同じ' },
  { en: 'deadpan', ja: '無表情で言う', pron: 'DED-pan', example: 'He delivered the joke completely deadpan.', note: '顔色一つ変えずにボケる芸風。日本のシュールに近い' },
  { en: 'offensive', ja: '不快な・攻撃的な', pron: 'uh-FEN-siv', example: 'That joke might be offensive in some cultures.', note: 'rudeより強い。文化によって何がoffensiveかが全然違う' },
  { en: 'witty', ja: '機知に富んだ', pron: 'WIT-ee', example: 'She always has a witty comeback.', note: 'funnyより知的な笑い。頭の回転が速い感じ' },
];

const DAY_284_KEYWORDS: KeyWord[] = [
  { en: 'split the bill', ja: '割り勘にする', pron: 'SPLIT thuh BIL', example: 'In the US, people often split the bill.', note: '日本の割り勘文化は海外から見ると独特。go Dutchとも言う' },
  { en: 'treat', ja: 'おごる', pron: 'TREET', example: 'Let me treat you to dinner.', note: 'It is my treat.で「おごりだよ」。日本の先輩文化と関連' },
  { en: 'haggle', ja: '値切る', pron: 'HAG-ul', example: 'You can haggle at the market.', note: 'bargainとも言う。日本ではあまりしないけど海外の市場では普通' },
  { en: 'taboo', ja: 'タブー', pron: 'tuh-BOO', example: 'Talking about salary is taboo in Japan.', note: '英語ではtuh-BOOと後ろにアクセント。日本語のタブーとは発音が違う' },
  { en: 'generous', ja: '気前のいい', pron: 'JEN-ur-us', example: 'He is very generous with tips.', note: 'お金だけでなく時間や気持ちにも使える。褒め言葉' },
];

// ============================================================
// Day Themes
// ============================================================
export const MONTH10_W38_DAY_THEMES: Record<number, {
  title: string;
  titleEn: string;
  category: string;
  scene: string;
  keywords: KeyWord[];
}> = {
  278: { title: '食事のマナー', titleEn: 'Table Manners Abroad', category: 'social', scene: '海外出張帰りの常連が「フォークの持ち方で怒られた話」を披露。大将が各国の食事マナーを解説し始める。', keywords: DAY_278_KEYWORDS },
  279: { title: '挨拶の違い', titleEn: 'Different Greetings', category: 'greeting', scene: 'フランス帰りのOLが頬キスの話をして店内騒然。大将が「日本のお辞儀は実は世界的に見ると珍しい」と語り出す。', keywords: DAY_279_KEYWORDS },
  280: { title: '時間感覚', titleEn: 'Sense of Time', category: 'social', scene: '「5分前行動」が当たり前の日本人常連と、南米出身の客が待ち合わせ時間で揉めた話で盛り上がる。', keywords: DAY_280_KEYWORDS },
  281: { title: '家族の形', titleEn: 'Family Structures', category: 'social', scene: '三世代同居の常連と、18歳で家を出たアメリカ人客が「家族の距離感」について熱く語り合う夜。', keywords: DAY_281_KEYWORDS },
  282: { title: '宗教と価値観', titleEn: 'Religion and Values', category: 'social', scene: '初詣もクリスマスもやる日本の不思議さに外国人客が驚き、大将が「日本人の宗教観は世界一ゆるい」と持論を展開。', keywords: DAY_282_KEYWORDS },
  283: { title: 'ユーモアの違い', titleEn: 'Humor Across Cultures', category: 'social', scene: 'イギリス人客の皮肉が日本人常連に伝わらず微妙な空気に。大将が「笑いのツボは国で全然違う」とフォローを入れる。', keywords: DAY_283_KEYWORDS },
  284: { title: 'お金の話', titleEn: 'Talking About Money', category: 'social', scene: '割り勘か奢りかで揉める常連たち。大将が「アメリカでは割り勘が普通、日本の先輩文化は独特だよ」と仲裁する。', keywords: DAY_284_KEYWORDS },
};

// ============================================================
// Day 278: 食事のマナー (Table Manners Abroad)
// ============================================================
const DAY_278: MasterExpression[] = [
  {
    daySlot: 278,
    japanese: 'この国ではどう食べるのが正解？',
    english: [
      'How should I eat this?',
      'What is the right way to eat this here?',
      'I have no idea what the proper way to eat this is in this country.',
      "Honestly, just watch what everyone else is doing and copy that. You'll be fine.",
    ],
    context: '日本語の「正解」は英語ではright wayやproper way。「正解」って単語がない分、right/proper/correctで回す感覚を覚えよう。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: '音を立てて食べちゃダメなの？',
    english: [
      'No slurping here?',
      'Am I not supposed to make noise while eating?',
      'Wait, so making noise while eating is actually considered rude here?',
      "Yeah, no slurping here. Takes some getting used to, right?",
    ],
    context: '日本では麺をすする音はOKだけど、海外ではrude。「音を立てる」はmake noiseが自然。slurpは具体的な擬音語。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: 'チップってどれくらい払うの？',
    english: [
      'How much should I tip?',
      'What is the standard tip here?',
      'I never know how much to tip when I go abroad. Is there a standard amount?',
      "Usually fifteen to twenty percent. When in doubt, just go with twenty and you're golden.",
    ],
    context: 'チップ文化がない日本人にとって「いくら払うべき」は切実な問題。tipは動詞にもなる。How much should I tip?が一番シンプル。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: '食べ残すのが礼儀って本当？',
    english: [
      'Leave food on the plate?',
      'Is it polite to leave food on your plate?',
      'I heard that in some countries, leaving food on your plate is actually the polite thing to do.',
      "That's true in some places, yeah. Just leave a tiny bit and you're showing respect.",
    ],
    context: '「もったいない」文化の日本人には衝撃。leave food on the plateで「残す」。finishは「完食する」。clean your plateとも言う。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: '左手で食べたら怒られた',
    english: [
      'Got scolded for using my left hand.',
      'They told me not to eat with my left hand.',
      'I ate with my left hand and someone actually corrected me about it.',
      "Oh man, that's a big one in some cultures. At least they told you nicely though.",
    ],
    context: '中東やインドでは左手は不浄の手。got scoldedは「怒られた」のカジュアル表現。correctedは「注意された」のやんわり版。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: '全部おいしいって言わなきゃいけない感じ',
    english: [
      'Gotta say everything is good.',
      'I feel like I have to compliment every single dish.',
      'There is this unspoken rule that you have to say everything tastes amazing.',
      "Right? A simple 'this is delicious' goes a long way. They really wanna hear it.",
    ],
    context: '日本は「黙って食べる=おいしい」でも通じるけど、海外では言葉にしないとダメ。complimentは「褒める」。praiseよりカジュアル。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: 'お皿を持ち上げちゃダメなんだ',
    english: [
      'Do not lift the plate.',
      'You are not supposed to pick up your plate here.',
      'I just found out that lifting your plate to your mouth is bad manners in some countries.',
      "Yeah, that's totally a Japan thing. Here you just leave it on the table and lean in a bit.",
    ],
    context: '日本ではお椀を持つのがマナーだけど、西洋ではNG。lift/pick upで「持ち上げる」。bring it to your mouthは「口に運ぶ」。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: 'ナイフとフォークの使い方がわからない',
    english: [
      'Cannot figure out the fork and knife.',
      'I have no idea how to use a knife and fork properly.',
      'I keep switching hands with my fork and knife and people keep noticing.',
      "Don't overthink it. Just hold 'em however feels natural and nobody'll care.",
    ],
    context: '箸文化で育つと意外と苦労する。American styleとContinental styleで持ち方が違う。switchは「切り替える」。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: '食事中にスマホ触るのってアリ？',
    english: [
      'Can I check my phone?',
      'Is it okay to use your phone during a meal?',
      'I was not sure if checking my phone at the table would be considered rude or not.',
      "I'd keep it in your pocket, honestly. People here think it's pretty rude at the table.",
    ],
    context: '日本のスマホ食事文化は海外では微妙。scrollは「スクロールする」。crosses a lineは「一線を越える」の比喩表現。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 278,
    japanese: '食前に何か言うのが普通？',
    english: [
      'Do you say something before eating?',
      'Is there something you say before a meal?',
      'I am used to saying itadakimasu, but I do not know if there is an equivalent here.',
      "Not always. Some families say grace, but most people just dig in. Wait for the host to start.",
    ],
    context: '「いただきます」に相当する表現が英語にはない。say graceは食前の祈り。bon appetitはフランス語由来で「召し上がれ」。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
];

// ============================================================
// Day 279: 挨拶の違い (Different Greetings)
// ============================================================
const DAY_279: MasterExpression[] = [
  {
    daySlot: 279,
    japanese: 'ハグされてびっくりした',
    english: [
      'The hug surprised me.',
      'I was not expecting a hug at all.',
      'Someone hugged me when we met and I totally froze up.',
      "Ha, the statue pose! Don't worry, you'll get used to it. Just hug 'em back next time.",
    ],
    context: 'ハグ文化のない日本人あるある。froze upは「固まった」。caught off guardは「不意を突かれた」。英語では身体接触の挨拶が多い。',
    character: 'yuki',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: 'お辞儀って海外では通じないの？',
    english: [
      'Bowing does not work abroad?',
      'Do people not understand bowing outside Japan?',
      'I bowed to someone and they just looked confused. Does bowing not translate?',
      "People usually get it if they know you're Japanese. Most just smile and go for a handshake instead.",
    ],
    context: '反射的にお辞儀してしまう日本人あるある。instinctivelyは「本能的に」。translateは「通じる」の意味でも使える。',
    character: 'takeshi',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: '名前で呼んでいいの？',
    english: [
      'Can I use your first name?',
      'Is it okay to call you by your first name?',
      'I was not sure if I should use their first name or their last name.',
      "Oh yeah, totally fine. Actually, people might think it's weird if you DON'T use their first name.",
    ],
    context: '日本の名字+さん文化 vs 海外のファーストネーム文化。go by first namesは「下の名前で呼び合う」。way too familiarは「馴れ馴れしすぎる」。',
    character: 'lisa',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: 'How are you? に本当のこと言っちゃった',
    english: [
      'Answered how are you honestly.',
      'I actually told them how I was really feeling.',
      'Someone asked how are you and I gave them a real answer instead of just saying fine.',
      "Ha, classic mistake. Just say 'good, you?' and keep walking. Nobody actually wants the real answer.",
    ],
    context: 'How are you?は質問じゃなくて挨拶。日本語の「お元気ですか」とは全然違う。roughは「つらい」。move onは「先に進む」。',
    character: 'kenji',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: '頬にキスされて固まった',
    english: [
      'Froze when they kissed my cheek.',
      'They went for a cheek kiss and I completely froze.',
      'Someone leaned in for a cheek kiss and I had no idea what to do.',
      "The cheek kiss thing is so awkward at first! You kinda just lean in and go with it.",
    ],
    context: 'フランスのビズ(la bise)文化。leaned inは「身を乗り出す」。which side firstは地域によって違うので本当に混乱する。',
    character: 'mina',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: '握手の力加減がわからない',
    english: [
      'How hard do I squeeze?',
      'I never know how firm my handshake should be.',
      'I shook their hand but I could tell it was either too soft or too firm.',
      "Just match their grip. Not too tight, not too limp. You'll figure it out after a few tries.",
    ],
    context: '握手文化がない日本人には力加減が難しい。calibrationは「感覚の調整」。dead fish handshakeはふにゃっとした弱い握手のこと。',
    character: 'yuki',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: '目を見て話すのが苦手',
    english: [
      'Eye contact is hard for me.',
      'I am not used to making so much eye contact.',
      'Maintaining eye contact during a conversation feels really intense to me.',
      "You don't have to stare 'em down. Just look at their eyes every few seconds and you're good.",
    ],
    context: '日本では目を合わせすぎるのは失礼。海外では目をそらすと不誠実に見える。maintainは「維持する」。intenseは「強烈な」。',
    character: 'takeshi',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: 'バイバイの仕方も違うんだ',
    english: [
      'Even goodbyes are different.',
      'I did not realize saying goodbye was so different too.',
      'The way people say goodbye here takes forever compared to Japan.',
      "Oh, the long goodbye! Yeah, just start moving toward the door and keep waving.",
    ],
    context: '日本の「じゃあね」は一瞬で終わるけど、欧米のgoodbyeは長い。the door/parking lotの段階的さよならは文化あるある。',
    character: 'master',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: '「元気？」って聞かれすぎ',
    english: [
      'Everyone keeps asking how I am.',
      'People ask how are you like ten times a day.',
      'Every single person I pass asks me how I am doing and it feels excessive.',
      "Just rotate between 'good,' 'not bad,' and 'can't complain.' That's all you need.",
    ],
    context: '英語圏のHow are you連発文化。go about our dayは「日常を過ごす」。running out ofは「尽きてきた」。日本のアイコンタクト挨拶との差。',
    character: 'lisa',
    category: 'greeting',
    month: '2027-01',
  },
  {
    daySlot: 279,
    japanese: '自己紹介で何を言えばいいかわからない',
    english: [
      'What do I say about myself?',
      'I never know what to say in self-introductions.',
      'When people ask me to introduce myself, I always blank on what to say.',
      "Just say your name and one fun fact about yourself. Keep it light, nobody's expecting a speech.",
    ],
    context: '日本の自己紹介はテンプレ的。英語圏ではパーソナルな情報を出す。blankは「頭が真っ白になる」。how much to shareは「どこまで話すか」。',
    character: 'kenji',
    category: 'greeting',
    month: '2027-01',
  },
];

// ============================================================
// Day 280: 時間感覚 (Sense of Time)
// ============================================================
const DAY_280: MasterExpression[] = [
  {
    daySlot: 280,
    japanese: '5分前行動って海外にはないの？',
    english: [
      'No five-minutes-early rule?',
      'Other countries do not have the five-minutes-early thing?',
      'I just realized that the whole arriving five minutes early thing is a very Japanese concept.',
      "For parties, showing up a little late is actually expected. On time is basically early here.",
    ],
    context: '日本の5分前行動は世界的に見ると異常なレベル。showedは「現れた」。the host was still getting dressedが文化差のリアルさを出す。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '「すぐ行く」の「すぐ」が全然すぐじゃない',
    english: [
      'Their soon is not soon.',
      'When they say I will be right there, they do not mean it.',
      'I learned the hard way that soon means something totally different here.',
      "Welcome to the club. 'Five minutes' means anywhere from twenty to an hour around here.",
    ],
    context: '「すぐ」の時間感覚は文化で全く違う。figure of speechは「表現方法」で、文字通りの意味じゃないこと。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '遅刻しても誰も怒らない',
    english: [
      'Nobody gets mad about being late.',
      'People are late and nobody even cares.',
      'I was shocked that nobody reacted when someone showed up thirty minutes late.',
      "That's just the vibe here. Thirty minutes late is barely late in some places.",
    ],
    context: '日本の時間厳守文化 vs 海外のゆるさ。apologize profuselyは「ひたすら謝る」。strolled inは「のんびり入ってきた」。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '昼休みが2時間って長すぎない？',
    english: [
      'A two-hour lunch break?',
      'Is a two-hour lunch break really normal here?',
      'I cannot wrap my head around taking a two-hour lunch break every day.',
      "Sounds crazy, but they actually come back refreshed. Maybe they're onto something.",
    ],
    context: '日本の短い昼休み vs ヨーロッパのゆったり文化。cannot wrap my head aroundは「理解できない」。guiltは日本人特有の「罪悪感」。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '電車が遅れても誰も気にしない',
    english: [
      'Train is late and nobody cares.',
      'The train was delayed and not a single person complained.',
      'The train was twenty minutes late and everyone just shrugged like it was normal.',
      "Twenty minutes? That's nothing. Try London, where delays are basically a lifestyle.",
    ],
    context: '日本の鉄道の正確さは世界一。shruggedは「肩をすくめた」。behind scheduleは「遅れている」。different worldが文化差を端的に表す。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '会議が時間通りに始まらない',
    english: [
      'Meetings never start on time.',
      'The meeting was supposed to start at ten but did not start until ten fifteen.',
      'I keep showing up to meetings on time only to sit there waiting for everyone else.',
      "Yep, that's standard. Grab a coffee and chat, it'll start when it starts.",
    ],
    context: 'trickle inは「ポツポツ来る」。get startedは「始めよう」。日本の会議文化は開始時間に全員着席が基本。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '約束の時間がだいたいすぎる',
    english: [
      'The time is so vague.',
      'The plans are way too vague for me.',
      'When someone says let us meet around noon, I do not know if that means twelve or one.',
      "Just text 'em when you're heading out. Around noon means noon-ish, don't stress it.",
    ],
    context: '「だいたい」の時間感覚。aroundは「頃」。日本人はspecific time(具体的な時間)を求めがち。rangeは「幅」。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: 'シエスタって本当にあるの？',
    english: [
      'Is siesta a real thing?',
      'Do people actually take siestas?',
      'I could not believe that shops actually close in the middle of the day for a nap.',
      "Oh, it's very real. Once you nap through a hot afternoon, you'll never wanna go back.",
    ],
    context: 'シエスタはスペインや南欧の昼寝文化。shuts downは「閉まる」。brutalは「きつい」。makes senseは「納得する」。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: '夕食が夜10時って遅すぎ',
    english: [
      'Dinner at ten is too late.',
      'Eating dinner at ten at night feels crazy to me.',
      'When I heard that dinner does not start until nine or ten, I thought they were joking.',
      "You get used to it. Just have a bigger snack around seven and you'll survive till ten.",
    ],
    context: '食事時間の文化差。starvingは「超お腹空いた」。on Tokyo timeは「東京の時間感覚のまま」で面白い表現。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 280,
    japanese: 'ゆっくりやろうよって言われても焦る',
    english: [
      'I cannot relax even when told to.',
      'They said take your time but I still felt rushed.',
      'Even when everyone tells me to slow down, my brain is still in Japan mode.',
      "Your brain'll catch up eventually. Give it a week and you'll wonder why you ever rushed.",
    ],
    context: 'work ethicは「仕事への姿勢」。falling behindは「遅れをとる」。switch offは「切る」。日本人の勤勉さが海外では過剰に見える。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
];

// ============================================================
// Day 281: 家族の形 (Family Structures)
// ============================================================
const DAY_281: MasterExpression[] = [
  {
    daySlot: 281,
    japanese: '18歳で家を出るのが普通なの？',
    english: [
      'Leave home at eighteen?',
      'Is it really normal to move out at eighteen?',
      'I was surprised that kids are expected to leave home right after high school.',
      "Yeah, it's a whole different mindset here. Kids can't wait to get their own place.",
    ],
    context: '日本の実家暮らし vs 欧米の独立文化。move outは「家を出る」。thinks twice about itは「気にする」。on your ownは「一人で」。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '親と一緒に住んでるって言ったら驚かれた',
    english: [
      'They were shocked I live with my parents.',
      'People seemed surprised when I said I still live with my parents.',
      'When I mentioned I live with my parents, everyone looked at me like I said something weird.',
      "Don't sweat it. Honestly, more people are doing it now with rent being so crazy.",
    ],
    context: 'stigmaは「烙印」。independentは「自立した」。carries a stigmaは「偏見がある」。日本と欧米で全く受け取り方が違う。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: 'おばあちゃんと一緒に住むのが素敵だと思う',
    english: [
      'Living with grandma is nice.',
      'I think living with your grandparents is a beautiful thing.',
      'In my culture, having grandparents in the house is normal and honestly, it is great.',
      "That sounds really special. I wish more families did that, honestly.",
    ],
    context: 'care homeは「老人ホーム」。growing upは「育つ中で」。三世代同居は日本の伝統だけど海外では珍しい。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '子供を怒鳴るのってダメなの？',
    english: [
      'You cannot yell at kids here?',
      'Is raising your voice at children really not acceptable?',
      'I noticed that parents here never raise their voice at their kids in public.',
      "Yeah, people here are big on the calm-voice approach. It's a different parenting style for sure.",
    ],
    context: 'raise your voiceは「声を荒げる」。discipline styleは「しつけの方法」。talking it outは「話し合いで解決する」。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '家族写真をSNSに載せるのが普通なんだ',
    english: [
      'They post family photos online.',
      'Posting family pictures on social media is totally normal here.',
      'I was surprised how openly people share their family life on social media.',
      "It's pretty normal here, but you definitely don't have to if it's not your thing.",
    ],
    context: 'blurは「ぼかす」。public photo albumは「公開写真アルバム」。日本のプライバシー意識と海外の違い。openは「オープンな」。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '親に敬語使わないの？',
    english: [
      'No polite language with parents?',
      'You do not use formal language with your parents?',
      'It blew my mind that people talk to their parents the same way they talk to friends.',
      "Nope, families are super casual here. My kids roast me all the time and I love it.",
    ],
    context: '敬語文化は日本特有。language hierarchyは「言葉の上下関係」。buddiesは「友達」のカジュアル表現。blew my mindは「衝撃だった」。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '結婚しなくても子供を育てるんだ',
    english: [
      'Raising kids without marriage.',
      'Having kids without being married is completely normal here.',
      'I was not expecting so many couples to have kids without getting married first.',
      "Totally normal here. A lot of people figure the relationship matters more than the paperwork.",
    ],
    context: 'bother toは「わざわざ～する」。judge you for itは「それで批判する」。way of thinking about familyが文化差の本質。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '離婚に対する考え方が全然違う',
    english: [
      'Divorce is seen differently here.',
      'The attitude toward divorce is way more relaxed here.',
      'People talk about divorce so casually here, like it is just a normal part of life.',
      "Yeah, it's not a big deal here. People just move on and that's that.",
    ],
    context: 'carries weightは「重みがある」。in the same breathは「同じ調子で」。culture shockは「カルチャーショック」そのまま英語。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '養子をもらうことをオープンに話すんだ',
    english: [
      'Adoption is talked about openly.',
      'People here are really open about adoption.',
      'I noticed that families who adopted their children talk about it without any hesitation.',
      "That's great that they're open about it. The kids grow up way healthier knowing their story.",
    ],
    context: 'adoptionは「養子縁組」。straight upは「ストレートに」。knowing their story from the startは「最初から自分のストーリーを知る」。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 281,
    japanese: '父親が育休取るのが普通って最高じゃん',
    english: [
      'Dads take paternity leave here.',
      'Fathers actually take parental leave and nobody thinks it is weird.',
      'It is amazing that fathers taking months off for their new baby is completely normal.',
      "Right? Three months is standard here. Nobody bats an eye, that's just how it works.",
    ],
    context: 'paternity leaveは「父親の育休」。side-eyedは「横目で見られる」。how it should beは「こうあるべき」。日本の育休取得率の低さとの対比。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
];

// ============================================================
// Day 282: 宗教と価値観 (Religion and Values)
// ============================================================
const DAY_282: MasterExpression[] = [
  {
    daySlot: 282,
    japanese: '日本人は無宗教って言っていいの？',
    english: [
      'Are Japanese people non-religious?',
      'Can I say that Japanese people are not religious?',
      'I always struggle to explain the Japanese relationship with religion to foreigners.',
      "Just say 'it's complicated' and laugh. Most people find the mix-and-match thing fascinating.",
    ],
    context: '日本の宗教観は英語で説明しにくい。belongは「属する」。non-religiousとsecularの違いも大事。日本は「多宗教」であり「無宗教」ではない。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '食べ物の制限があるって知らなかった',
    english: [
      'I did not know about food restrictions.',
      'I had no idea some people cannot eat certain foods because of religion.',
      'It never occurred to me that religion would determine what someone can and cannot eat.',
      "Good to know for next time, right? Just ask beforehand and you're set.",
    ],
    context: 'dietary restrictionsは「食事制限」。crossed my mindは「頭をよぎった」。a huge dealは「重大なこと」。ハラルやコーシャの概念。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '日曜日はお店が閉まるの？',
    english: [
      'Shops close on Sundays?',
      'Wait, everything is closed on Sunday?',
      'I went out shopping on Sunday and could not find a single open store.',
      "Yep, stock up on Saturday. You'll learn that the hard way once and never forget.",
    ],
    context: 'ヨーロッパの日曜休業文化。rest dayは「安息日」。ran out ofは「切らした」。日本の年中無休文化との対比。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '信仰の話って気軽にしていいの？',
    english: [
      'Can I casually ask about faith?',
      'Is it okay to ask someone about their religion?',
      'I was not sure if asking about religion was too personal or offensive.',
      "It depends on the person. Let them bring it up first and you'll be safe.",
    ],
    context: 'bring it upは「話題に出す」。core partは「核心部分」。safe to mentionは「触れても大丈夫」。宗教の話題は国によってOK/NG。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: 'お祈りの時間があるって面白い',
    english: [
      'Prayer time is interesting.',
      'I find it fascinating that people stop to pray multiple times a day.',
      'It was my first time seeing someone take a break from work specifically to pray.',
      "It's totally normal. People here respect that and just carry on without making a fuss.",
    ],
    context: 'excused himselfは「席を外した」。nobody batted an eyeは「誰も気にしなかった」。prioritizeは「優先する」。イスラム教の礼拝文化。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: 'クリスマスが本当に宗教行事なんだ',
    english: [
      'Christmas is actually religious here.',
      'I did not realize Christmas is genuinely a religious holiday for many people.',
      'For me, Christmas was always about cake and KFC, but here it is a deeply spiritual event.',
      "Wait, you guys eat KFC for Christmas? That's hilarious. Yeah, it's a church thing here.",
    ],
    context: '日本のクリスマス vs 西洋のクリスマス。hymnsは「賛美歌」。commercialは「商業的な」。deeply spiritualが本来の意味。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '「神」って言葉の重みが違う',
    english: [
      'God means something different here.',
      'The word God carries way more weight in some cultures.',
      'When people here say God, they mean one specific being, not the general concept of gods.',
      "Yeah, capital-G God is a really loaded word here. People don't throw it around lightly.",
    ],
    context: '日本の「神」は八百万。英語のGodは一神教。dead seriousは「超真剣」。on another levelは「レベルが違う」。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '寺と神社の違いを説明できない',
    english: [
      'Cannot explain temple versus shrine.',
      'I struggle to explain the difference between a temple and a shrine.',
      'Foreigners always ask me the difference between temples and shrines and I freeze every time.',
      "Just say temples are Buddhist and shrines are Shinto. That's enough for most people.",
    ],
    context: 'coexistenceは「共存」。put into wordsは「言葉にする」。日本人自身が説明できない日本文化あるある。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '断食して働くのすごいな',
    english: [
      'Working while fasting is impressive.',
      'I cannot believe people can work a full day without eating or drinking.',
      'During Ramadan, my colleagues fast all day and still get their work done like normal.',
      "I know, right? They've been doing it since they were kids though, so they're kinda used to it.",
    ],
    context: 'fastingは「断食」。grumpyは「不機嫌な」。like it is nothingは「何でもないみたいに」。ラマダン中でも普通に働く凄さ。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 282,
    japanese: '「信じる自由」ってこういうことか',
    english: [
      'So this is freedom of belief.',
      'Now I understand what freedom of religion really means.',
      'Seeing people openly practice their faith made me understand what freedom of belief actually looks like.',
      "That's the beauty of a diverse place. Everyone does their own thing and it just works.",
    ],
    context: 'in the backgroundは「背景にある」。in practiceは「実際には」。hijab, cross, kippahは各宗教のシンボル。日本は宗教が「見えない」社会。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
];

// ============================================================
// Day 283: ユーモアの違い (Humor Across Cultures)
// ============================================================
const DAY_283: MasterExpression[] = [
  {
    daySlot: 283,
    japanese: 'ツッコミが通じない',
    english: [
      'My comebacks do not land.',
      'The whole tsukkomi thing does not translate at all.',
      'I tried to do the Japanese-style straight man thing and nobody got it.',
      "Yeah, the tsukkomi thing just comes off as mean here. Try a different approach with these guys.",
    ],
    context: 'straight manは「ツッコミ役」。call them out on itは「指摘する」。landは「ウケる」。日本の漫才構造が海外では通じない。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: '皮肉が褒め言葉かどうかわからない',
    english: [
      'Is that sarcasm or a compliment?',
      'I can never tell if they are being sarcastic or sincere.',
      'Someone said nice job and I honestly could not figure out if they were serious or mocking me.',
      "With Brits, if it sounds too positive, it's probably sarcasm. You'll pick up on it eventually.",
    ],
    context: 'sarcasmは「皮肉」。mockingは「からかっている」。blurryは「ぼやけた」。英語の皮肉は表情では読めないことが多い。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: 'ダジャレが寒いのは世界共通？',
    english: [
      'Are puns lame everywhere?',
      'Do people groan at puns in every country?',
      'I told a pun and everyone groaned, so at least that reaction is the same as Japan.',
      "Oh, a hundred percent. Bad puns get the same groan everywhere. It's universal dad energy.",
    ],
    context: 'punは「ダジャレ」。groanは「うめく」。dad jokeは「おやじギャグ」。wordplayは「言葉遊び」。世界共通のリアクション。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: '自虐ネタは海外でもウケるんだ',
    english: [
      'Self-deprecation works here too.',
      'Making fun of yourself gets laughs here just like in Japan.',
      'I told a joke about my terrible cooking and everyone cracked up.',
      "People love that stuff! Making fun of yourself breaks the ice like nothing else.",
    ],
    context: 'self-deprecatingは「自虐的な」。cracked upは「大爆笑した」。translateは「通じる」の比喩的用法。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: '笑いのツボが全然違う',
    english: [
      'We laugh at different things.',
      'What is funny here is totally different from what is funny in Japan.',
      'I watched a comedy show and could not understand why everyone was laughing.',
      "Don't feel bad, even native speakers miss jokes from other regions. Comedy's super local.",
    ],
    context: 'dying laughingは「笑い死にそう」。culture-specificは「文化特有の」。笑いのツボは英語でsense of humor。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: 'リアクション芸がない文化もある',
    english: [
      'Some cultures skip the reactions.',
      'Not every culture does big reactions to jokes.',
      'I noticed that some countries do not have the exaggerated comedy reactions that Japan has.',
      "British comedy is all about the poker face. The less they react, the funnier it gets.",
    ],
    context: 'exaggeratedは「大げさな」。deadpanは「無表情」。overreactは「リアクション芸」。art formは「芸術の形式」。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: '政治ネタで笑えるのがすごい',
    english: [
      'Political jokes are a thing here.',
      'People actually joke about politics and everyone laughs.',
      'It surprised me how openly people make fun of their own government and politicians.',
      "Oh yeah, roasting politicians is practically a national sport here. Nobody's off limits.",
    ],
    context: 'career suicideは「キャリアの自殺行為」。backboneは「骨格」。roars with laughterは「爆笑する」。日本の政治風刺の少なさ。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: 'ジョークの後に説明したら白けた',
    english: [
      'Explaining the joke killed it.',
      'I explained my joke and the mood totally died.',
      'I told a joke and nobody laughed, so I tried explaining it, which made it even worse.',
      "Rule number one: never explain the joke. If it didn't land, just move on and try another one.",
    ],
    context: 'killed itは「台無しにした」(ここではネガティブ)。the mood diedは「場がしらけた」。explaining a jokeが最悪なのは万国共通。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: 'お笑いの「間」って英語にならない',
    english: [
      'Comic timing cannot be translated.',
      'The Japanese concept of ma in comedy does not exist in English.',
      'I tried to explain the importance of timing in Japanese comedy and gave up halfway through.',
      "Comedic timing is the closest thing we've got, but yeah, ma is its own thing entirely.",
    ],
    context: '「間」は日本の笑いの核心。comedic timingが最も近い英語だけど完全には訳せない。untranslatableは「翻訳不能な」。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 283,
    japanese: '笑い方にも文化が出るよね',
    english: [
      'Even laughing styles differ.',
      'The way people laugh is actually different across cultures.',
      'I noticed that the physical way people laugh varies a lot depending on where they are from.',
      "Ha, yeah, we go all out. A good belly laugh is the best compliment you can give someone.",
    ],
    context: 'covering your mouthは「口を隠す」。head backは「頭を後ろに」。refreshingは「新鮮な」。笑い方の性差・文化差。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
];

// ============================================================
// Day 284: お金の話 (Talking About Money)
// ============================================================
const DAY_284: MasterExpression[] = [
  {
    daySlot: 284,
    japanese: '給料いくらって聞いちゃダメなの？',
    english: [
      'Cannot ask about salary?',
      'Is asking someone their salary really that bad?',
      'I accidentally asked a coworker how much they make and the conversation just stopped.',
      "Yeah, that's a big no-no here. Salary talk makes people super uncomfortable.",
    ],
    context: 'off-limitsは「立入禁止」。how much they makeは「いくら稼ぐか」。social security numberは個人情報の比喩。給料の話はtaboo。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: '割り勘が通じない国がある',
    english: [
      'Some places do not split bills.',
      'The concept of splitting the bill does not exist everywhere.',
      'I suggested we split the bill and my friend from the Middle East looked confused.',
      "In some cultures, letting you pay would be embarrassing for them. Just say thank you and treat 'em back next time.",
    ],
    context: 'matter of prideは「プライドの問題」。offendedは「気分を害した」。文化によってお金の払い方のマナーが全く違う。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: 'チップの計算がめんどくさい',
    english: [
      'Calculating tips is annoying.',
      'I hate having to do math every time I eat out.',
      'Why do I have to calculate fifteen to twenty percent on top of my meal every single time?',
      "Pro tip: just double the tax and you're close enough. Don't overthink it.",
    ],
    context: 'arithmeticは「算数」。round upは「切り上げる」。tip on taxは「税込みでチップを計算する」。日本のチップなし文化が恋しくなる場面。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: '値段交渉って楽しいかも',
    english: [
      'Haggling is kind of fun.',
      'I actually enjoyed negotiating the price at the market.',
      'I never thought I would enjoy haggling, but it turns out it is like a game.',
      "It IS fun, right? Start low, smile a lot, and meet in the middle. That's the game.",
    ],
    context: 'went back and forthは「やり取りした」。settled onは「落ち着いた」。a blastは「めちゃくちゃ楽しい」。値切り交渉の文化差。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: '現金しか使えないの？',
    english: [
      'Cash only here?',
      'This place only takes cash? Seriously?',
      'I did not bring any cash because I assumed everywhere takes cards.',
      "Always keep a little cash on you, just in case. You never know around here.",
    ],
    context: 'cash-heavyは「現金中心」。walk of shameは「恥ずかしい退出」。card-basedは「カード決済中心」。キャッシュレス事情は国によってバラバラ。',
    character: 'kenji',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: '物価が高すぎて何も買えない',
    english: [
      'Everything is so expensive.',
      'The prices here are insane compared to Japan.',
      'I looked at the menu and almost had a heart attack when I saw the prices.',
      "Tell me about it. Try cooking at home more, it saves a ton.",
    ],
    context: 'had a heart attackは「心臓が止まりそうだった」の比喩。my wallet is cryingは「財布が泣いている」。物価の文化ショック。',
    character: 'mina',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: 'おごり文化が強い国もあるんだ',
    english: [
      'Some countries love treating people.',
      'In some cultures, the host always pays no matter what.',
      'I tried to pay my share but my host absolutely refused to let me.',
      "Just let 'em pay and be grateful. You can return the favor when they visit you.",
    ],
    context: 'hospitalityは「おもてなし」。gracefullyは「丁重に」。insult usは「侮辱する」。おごり文化は日本の先輩後輩とも通じるものがある。',
    character: 'yuki',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: '税込み表示じゃないの不親切すぎ',
    english: [
      'Show me the real price.',
      'Prices without tax are so misleading.',
      'I thought I was paying ten dollars but it turned out to be almost twelve with tax.',
      "Ugh, I know. Just mentally add like thirty percent to every price and you won't be surprised.",
    ],
    context: 'misleadingは「紛らわしい」。shelf priceは「表示価格」。feel trickedは「騙された気分」。税別表示のストレス。',
    character: 'takeshi',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: '寄付文化がすごい',
    english: [
      'The donation culture is amazing.',
      'People here donate money like it is totally normal.',
      'I was impressed by how naturally people give money to charity and causes they care about.',
      "It's a big thing here. People even put it on their social media. Different vibe from Japan for sure.",
    ],
    context: 'giving backは「社会に還元する」。philanthropyは「慈善活動」。anonymousは「匿名の」。寄付の「見える化」は文化差。',
    character: 'lisa',
    category: 'social',
    month: '2027-01',
  },
  {
    daySlot: 284,
    japanese: 'お金の話を避ける日本人って変？',
    english: [
      'Is avoiding money talk weird?',
      'Is it strange that Japanese people avoid talking about money?',
      'I wonder if the Japanese habit of never discussing money seems odd to people from other cultures.',
      "Maybe a little, but honestly, being more open about money helps everyone make better decisions.",
    ],
    context: 'feels dirtyは「汚い感じがする」。mortgagesは「住宅ローン」。healthierは「健全な」。お金の話を避ける日本文化への客観的視点。',
    character: 'master',
    category: 'social',
    month: '2027-01',
  },
];

// ============================================================
// Combined Export
// ============================================================
export const MONTH10_W38_EXPRESSIONS: MasterExpression[] = [
  ...DAY_278,
  ...DAY_279,
  ...DAY_280,
  ...DAY_281,
  ...DAY_282,
  ...DAY_283,
  ...DAY_284,
];

export const MONTH10_W38_KEYWORDS: Record<number, KeyWord[]> = {
  278: DAY_278_KEYWORDS,
  279: DAY_279_KEYWORDS,
  280: DAY_280_KEYWORDS,
  281: DAY_281_KEYWORDS,
  282: DAY_282_KEYWORDS,
  283: DAY_283_KEYWORDS,
  284: DAY_284_KEYWORDS,
};
