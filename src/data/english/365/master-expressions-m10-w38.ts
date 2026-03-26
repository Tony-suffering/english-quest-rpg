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
      'Every time I travel somewhere new, I realize I have no idea what the proper way to eat anything is. Like, do I use my hands? A fork? Chopsticks? I just want to know how to eat this without looking like a total outsider.',
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
      'Back home, slurping noodles is totally normal. It even means you are enjoying the food. But here, everyone eats so quietly. Am I not supposed to make any noise at all? That is honestly harder than it sounds.',
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
      'Tipping is so confusing for me because we do not have that culture in Japan. Is it fifteen percent? Twenty? Does it depend on the restaurant? I always end up just guessing and hoping I did not accidentally insult anyone.',
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
      'Someone told me that in China, if you finish everything on your plate, it means the host did not give you enough food. So you are supposed to leave a little bit. That is the complete opposite of what I learned growing up in Japan.',
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
      'I was at dinner and just grabbed the bread with my left hand like I always do. Then the person next to me quietly told me that eating with your left hand is considered very disrespectful in their culture. I had absolutely no idea.',
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
      'When someone cooks for you in another country, you cannot just sit there and eat quietly like in Japan. You have to actively say how good everything is. Every bite, every dish. It feels kind of exhausting, but I get that it is their way of showing appreciation.',
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
      'In Japan, we pick up our rice bowl and bring it close to our mouth. That is normal and polite. But here, people looked at me weird when I did it. Apparently you are supposed to keep the plate on the table and bring the fork to your mouth instead.',
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
      'Okay, so apparently in America, you cut with the right hand and then switch the fork over. But in Europe, you just keep the fork in your left hand the whole time. Why are there two completely different systems for the same utensils?',
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
      'In Japan, a lot of people scroll through their phones while eating, especially when dining alone. But I noticed that here, even checking a quick message during dinner feels like it crosses some kind of line. Everyone just talks to each other the whole time.',
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
      'In Japan, we always say itadakimasu before eating. It is automatic. But in other countries, some people say grace, some just start eating, and some say bon appetit. I never know what to do, so I just kind of sit there and wait for someone else to start.',
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
      'I met my friend and she came in for a big hug. In Japan, we do not really do that, so I just stood there with my arms at my sides like a statue. She laughed about it, but honestly, I was genuinely caught off guard.',
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
      'I instinctively bowed when I met someone new, and they kind of tilted their head like they were trying to figure out what I was doing. I guess bowing is not really a thing outside of Japan and a few other Asian countries. It felt awkward.',
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
      'In Japan, calling someone by their first name right away feels way too familiar. But here, everyone just goes by first names from the start, even in business. My boss introduced himself as Mike and I almost called him Mr. Smith.',
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
      'My coworker asked how are you, and I started telling them about my rough morning and how tired I was. They looked so uncomfortable. Turns out, how are you is just a greeting here, not an actual question. You are just supposed to say good and move on.',
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
      'I was in France meeting a friend of a friend, and she leaned in and kissed me on both cheeks. I was not prepared for that at all. Do I kiss back? Do I make a sound? Which side first? I just stood there and let it happen.',
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
      'A firm handshake is supposed to show confidence, but as someone who grew up bowing, I have zero calibration for this. I either squeeze too hard and look aggressive, or too soft and give what they call a dead fish handshake. There is no winning.',
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
      'In Japan, staring directly at someone is actually kind of rude, so we tend to look away a lot. But here, if you do not make eye contact, people think you are being dishonest or uninterested. It is exhausting to keep looking someone in the eye the whole time.',
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
      'In Japan, you say goodbye once and leave. But here, people say they are leaving, then talk for another twenty minutes at the door, then say bye again in the parking lot. It is like a whole goodbye ceremony. I never know when I am actually free to go.',
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
      'The cashier asks how are you, the bus driver asks how are you, my neighbor asks how are you. Nobody actually wants to know. In Japan, we just nod and go about our day. I am running out of ways to say I am fine.',
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
      'In Japan, self-introductions follow a pattern. Name, company, nice to meet you, done. But here, people tell you about their hobbies, where they grew up, their dog. It is way more personal. I just freeze because I do not know how much to share.',
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
      'I showed up five minutes early to a party and I was literally the only person there. The host was still getting dressed. In Japan, being five minutes early is basic manners. Here, showing up on time or even a little late is completely normal and expected.',
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
      'My friend texted me saying she would be there in five minutes. I waited for forty-five minutes. When she finally showed up, she acted like everything was normal. In Japan, if you say five minutes, you mean five minutes. Here, five minutes is just a figure of speech.',
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
      'In Japan, if you are even two minutes late, you apologize profusely and feel terrible about it. But here, someone strolled in half an hour late, sat down, and nobody said a word. They just kept going like nothing happened. I could not believe it.',
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
      'In Japan, we get maybe forty-five minutes for lunch and people eat at their desks half the time. But in some European countries, people take two-hour lunches, go to a restaurant, have wine, and then come back to work. It sounds amazing, but I would feel so guilty.',
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
      'If a train is even one minute late in Japan, there is an official apology announcement. Here, the train was twenty minutes behind schedule and people were just scrolling their phones like nothing was wrong. Different world.',
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
      'Every meeting I go to starts at least ten to fifteen minutes late. People trickle in, get coffee, chat about their weekends, and then eventually someone says okay let us get started. In Japan, everyone is seated and ready before the start time.',
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
      'I asked what time we should meet and they said sometime around noon. That could mean anything from eleven thirty to one o clock. In Japan, we would agree on a specific time like twelve fifteen. I need a number, not a range.',
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
      'I went out to buy something at two in the afternoon and everything was closed. The whole town basically shuts down for siesta. It sounds lazy, but honestly, working in the heat is brutal, so it makes total sense once you experience it yourself.',
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
      'In Japan, most families eat dinner around six or seven. But in Spain, people do not even think about dinner until nine thirty or ten. I was starving by eight and could not understand how everyone else was fine. My stomach is still on Tokyo time.',
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
      'People keep telling me to relax and take my time, but my Japanese work ethic will not let me. I feel like I am falling behind if I am not doing something productive every second. It is hard to switch off that part of my brain.',
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
      'In Japan, a lot of people live with their parents until they get married, and nobody thinks twice about it. But here, if you are still living at home at twenty-five, people act like something is wrong with you. Eighteen feels way too young to be on your own.',
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
      'I casually mentioned that I live with my mom and dad and the whole room went quiet. Someone actually asked if everything was okay at home. In Japan, it is totally normal and even practical. Here, it carries this stigma of not being independent.',
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
      'My grandmother lived with us growing up and I loved it. She cooked for us, told us stories, and was always there when my parents were at work. Here, older people live in care homes and rarely see their families. It honestly makes me a little sad.',
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
      'In Japan, you see parents scolding their kids in the supermarket all the time. But here, if you raise your voice even a little, people stare at you like you are a terrible parent. The discipline style is completely different. Everything is about talking it out.',
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
      'In Japan, a lot of parents blur their kids faces or do not post them at all for privacy. But here, people share everything, first day of school, birthday parties, family vacations. It is like a public photo album. I am not used to being that open about my private life.',
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
      'In Japan, even as adults, a lot of people still use polite language with their parents, especially with their father. But here, kids call their parents by their first names and joke around with them like they are buddies. There is no language hierarchy at all.',
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
      'In Japan, having kids before marriage is still kind of unusual and people might judge you for it. But here, plenty of couples have been together for years, have multiple kids, and never bothered to get married. It is just a different way of thinking about family.',
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
      'In Japan, divorce still carries a lot of weight. People whisper about it. But here, my coworker mentioned her ex-husband in the same breath as what she had for lunch. It is just a fact of life, not a scandal. That was a real culture shock for me.',
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
      'A friend told me straight up that her daughter was adopted, like it was the most natural thing in the world. In Japan, adoption is often kept private or not discussed openly. Here, families celebrate it and the kids grow up knowing their story from the start.',
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
      'My colleague took three months of paternity leave and when he came back, everyone was happy to see him and asked about the baby. In Japan, if a man takes more than a week off, he might get side-eyed by his boss. This is how it should be everywhere.',
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
      'When someone asks me what religion I am, I never know what to say. We do hatsumode at a shrine, have a Christian wedding, and a Buddhist funeral. We are not non-religious exactly, but we do not belong to any one religion either. It is hard to explain.',
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
      'I invited a colleague to a yakiniku restaurant and she politely told me she does not eat pork. I felt terrible because it never crossed my mind. In Japan, we do not really think about dietary restrictions based on religion, but it is a huge deal in many cultures.',
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
      'In Japan, Sunday is the busiest shopping day of the week. But in some European countries, almost everything closes because Sunday is a rest day for religious reasons. I ran out of milk on a Sunday morning and had to wait until Monday. That was a first.',
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
      'In Japan, nobody really talks about religion in daily life. But in some countries, faith is such a core part of people and they are happy to share it. In other places though, it is considered extremely private. I never know if it is safe to bring it up or not.',
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
      'My coworker excused himself in the middle of a meeting to go pray. Nobody batted an eye. It was just part of the routine. In Japan, we would never pause a meeting for something personal like that. But honestly, I kind of respect that they prioritize their faith.',
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
      'In Japan, Christmas is basically a commercial holiday. You eat fried chicken, buy a cake, maybe go on a date. But here, families go to church on Christmas Eve, sing hymns, and celebrate the birth of Jesus. It is a completely different experience from what I grew up with.',
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
      'In Japanese, we say kami and it can mean anything, a spirit, nature, the feeling of a place. But when people here say God with a capital G, they mean one very specific thing and they are dead serious about it. The weight of that single word is on another level.',
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
      'My friend asked me what the difference is between a temple and a shrine and I could not give a clear answer in English. I know one is Buddhist and one is Shinto, but explaining the whole coexistence thing and how Japanese people visit both without thinking about it is really hard to put into words.',
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
      'One of my coworkers told me he does not eat or drink from sunrise to sunset during Ramadan. Not even water. And he still works a full eight-hour day like it is nothing. I get grumpy if I skip breakfast. I honestly do not know how he does it.',
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
      'In Japan, religion is kind of in the background. Nobody really talks about it. But here, I see people wearing hijabs, crosses, kippahs, all walking down the same street. Nobody stares. Nobody judges. That is when I realized what freedom of belief actually looks like in practice.',
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
      'In Japan, comedy is all about the boke and tsukkomi dynamic. Someone says something dumb and you immediately call them out on it. But here, when I tried to correct my friend as a joke, she thought I was actually being rude. The whole structure of humor is different.',
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
      'British people say things like oh brilliant with a straight face and I cannot tell if they mean it or if they are making fun of me. In Japan, sarcasm exists but it is pretty obvious. Here, the line between genuine and sarcastic is so blurry that I just smile and hope for the best.',
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
      'I tried a pun in English and everyone did that same half-laugh, half-groan thing that happens in Japan when someone says a bad dajare. Turns out, puns being simultaneously loved and hated is universal. Dads everywhere are united by terrible wordplay.',
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
      'I was worried my self-deprecating humor would not translate, but when I made fun of my own bad English, everyone laughed and started sharing their own embarrassing language mistakes. Turns out, being able to laugh at yourself is appreciated pretty much everywhere.',
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
      'I went to a stand-up comedy show and the whole audience was dying laughing, but I was just sitting there confused. The humor was so culture-specific that even though I understood every word, I missed every joke. Language ability and cultural context are two completely different things.',
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
      'In Japan, half of comedy is the reaction. The audience goes ehhh and the other comedians overreact to everything. But in British comedy, the comedian just delivers the joke deadpan and moves on. No reaction, no sound effects, just words. It is like a different art form.',
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
      'Late-night TV shows here constantly make fun of the president and politicians. The audience roars with laughter. In Japan, making fun of politicians on TV would be career suicide for a comedian. Here, it is literally the backbone of comedy. Different worlds.',
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
      'I made what I thought was a funny observation, but nobody reacted. So I started explaining why it was funny, step by step, like a teacher. The silence got even more painful. My friend later told me that explaining a joke is the fastest way to kill it in any language.',
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
      'Japanese comedy relies on ma, that perfect pause before the punchline. It is not just timing, it is a feeling. When I tried to explain it in English, the best I could say was comedic timing, but that does not capture the silence, the tension, the anticipation. Some things are just untranslatable.',
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
      'In Japan, especially for women, covering your mouth when you laugh is polite. But here, people laugh with their whole body, head back, mouth wide open, sometimes even slapping the table. Nobody covers their mouth. It is loud and honest and honestly kind of refreshing.',
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
      'In Japan, asking about salary between close friends is not that unusual. But here, I asked a colleague what she earns and she looked at me like I had asked for her social security number. Money is one of those topics that is completely off-limits in casual conversation.',
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
      'In Japan,割り勘 is so normal that we have a word specifically for it. But in some cultures, one person always pays, usually the one who invited. When I tried to split a dinner bill with my Arab friend, he was genuinely offended. Paying for your guest is a matter of pride.',
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
      'The bill says twenty-three dollars and forty cents. Now I have to calculate eighteen percent in my head while my friends are watching. Do I round up? Do I tip on tax? Nobody told me dining out would require this much arithmetic. In Japan, the price is the price. Done.',
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
      'At the market, the vendor said ten dollars and I said five. He looked shocked, then laughed, and we went back and forth until we settled on seven. In Japan, the price tag is sacred and you would never dream of negotiating. But here, it is expected and honestly, it was a blast.',
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
      'Japan is still pretty cash-heavy, but I assumed other developed countries would all be card-based by now. Turns out, some places in Europe are still cash only. I was standing at a register with no bills in my wallet and had to do the walk of shame to an ATM three blocks away.',
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
      'A regular sandwich costs twelve dollars. A coffee is six. A simple lunch for one person is easily thirty to forty dollars after tip and tax. In Japan, I could eat a full meal at a chain restaurant for under ten dollars. My wallet is crying every single day here.',
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
      'I had dinner with a family in Turkey and when the bill came, I reached for my wallet. The father practically slapped my hand away and said you are our guest, do not insult us. In their culture, letting a guest pay is a sign of terrible hospitality. I had to accept gracefully.',
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
      'In Japan, the price you see is the price you pay. Tax is included. But in America, the shelf price is before tax. And then you add a tip on top of that. So what looks like a twenty-dollar meal ends up being twenty-eight dollars. I feel tricked every single time.',
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
      'In America, people donate to charities, set up crowdfunding pages, and talk openly about giving back to the community. In Japan, we donate too, but it is usually quiet and anonymous. Here, philanthropy is public and almost expected, especially from successful people.',
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
      'In Japan, talking about money feels almost dirty. You do not discuss how much your house cost, what car you can afford, or how much you saved last year. But here, people talk about investments, mortgages, and financial goals over lunch. Maybe being more open about money is actually healthier.',
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
