// Month 12 Week 49: Graduation Week -- sayonara to hajimari
// Days 359-365 (70 expressions, 35 keywords)
// The final week. Emotional, warm, nostalgic. Goodbye to the izakaya after a year together.

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Keywords
// ============================================================

const DAY_359_KEYWORDS: KeyWord[] = [
  { en: 'look back', ja: '振り返る', pron: 'luk bak', example: 'Looking back, it was a great year.', note: 'reflect on the past' },
  { en: 'growth', ja: '成長', pron: 'grohth', example: 'I can really see my growth.', note: 'personal development' },
  { en: 'milestone', ja: '節目', pron: 'mahyl-stohn', example: 'This is a real milestone.', note: 'significant point in time' },
  { en: 'journey', ja: '旅・道のり', pron: 'jur-nee', example: 'It has been quite a journey.', note: 'figurative: process over time' },
  { en: 'memories', ja: '思い出', pron: 'mem-uh-reez', example: 'So many good memories here.', note: 'plural form almost always used' },
];

const DAY_360_KEYWORDS: KeyWord[] = [
  { en: 'grateful', ja: '感謝している', pron: 'grayt-ful', example: 'I am truly grateful for you all.', note: 'deeper than thankful' },
  { en: 'bond', ja: '絆', pron: 'bahnd', example: 'We have a strong bond now.', note: 'emotional connection' },
  { en: 'support', ja: '支え', pron: 'suh-port', example: 'Your support meant everything.', note: 'both verb and noun' },
  { en: 'crew', ja: '仲間たち', pron: 'kroo', example: 'This crew is the best.', note: 'casual: close group of friends' },
  { en: 'through thick and thin', ja: '良い時も悪い時も', pron: 'throo thik and thin', example: 'You were there through thick and thin.', note: 'idiom: in all situations' },
];

const DAY_361_KEYWORDS: KeyWord[] = [
  { en: 'mentor', ja: '師匠・恩師', pron: 'men-tor', example: 'You have been a real mentor to me.', note: 'someone who guides you' },
  { en: 'patience', ja: '忍耐・根気', pron: 'pay-shuns', example: 'Thank you for your patience.', note: 'ability to wait calmly' },
  { en: 'believe in', ja: '信じる', pron: 'buh-leev in', example: 'You always believed in me.', note: 'trust someone will succeed' },
  { en: 'from the bottom of my heart', ja: '心の底から', pron: 'frum thuh bah-tum', example: 'I mean it from the bottom of my heart.', note: 'sincere gratitude' },
  { en: 'legacy', ja: '残すもの・遺産', pron: 'leg-uh-see', example: 'This place is your legacy.', note: 'what you leave behind' },
];

const DAY_362_KEYWORDS: KeyWord[] = [
  { en: 'define', ja: '定義する', pron: 'dih-fahn', example: 'How would you define yourself?', note: 'explain what something is' },
  { en: 'passion', ja: '情熱', pron: 'pash-un', example: 'My passion is connecting with people.', note: 'strong enthusiasm' },
  { en: 'perspective', ja: '視点・ものの見方', pron: 'pur-spek-tiv', example: 'This year changed my perspective.', note: 'way of seeing things' },
  { en: 'identity', ja: 'アイデンティティ', pron: 'ah-den-tuh-tee', example: 'Language is part of my identity now.', note: 'who you are' },
  { en: 'evolve', ja: '進化する', pron: 'ih-vahlv', example: 'I have evolved so much this year.', note: 'develop gradually' },
];

const DAY_363_KEYWORDS: KeyWord[] = [
  { en: 'horizon', ja: '地平線・展望', pron: 'huh-rah-zun', example: 'New horizons are waiting.', note: 'figurative: future possibilities' },
  { en: 'leap of faith', ja: '思い切った挑戦', pron: 'leep uv fayth', example: 'It is time for a leap of faith.', note: 'trusting the unknown' },
  { en: 'comfort zone', ja: '快適な領域', pron: 'kum-furt zohn', example: 'I finally left my comfort zone.', note: 'familiar safe space' },
  { en: 'opportunity', ja: 'チャンス・機会', pron: 'ah-pur-too-nuh-tee', example: 'There are so many opportunities out there.', note: 'chance for something good' },
  { en: 'brave', ja: '勇敢な', pron: 'brayv', example: 'You are braver than you think.', note: 'willing to face difficulty' },
];

const DAY_364_KEYWORDS: KeyWord[] = [
  { en: 'toast', ja: '乾杯の挨拶', pron: 'tohst', example: 'I would like to make a toast.', note: 'drink in honor of someone' },
  { en: 'raise a glass', ja: 'グラスを掲げる', pron: 'rayz uh glas', example: 'Let us raise a glass to this year.', note: 'formal toast gesture' },
  { en: 'chapter', ja: '章・時代', pron: 'chap-tur', example: 'This chapter is closing.', note: 'figurative: period of life' },
  { en: 'cheers', ja: '乾杯', pron: 'cheerz', example: 'Cheers to all of us.', note: 'toast word + British thank you' },
  { en: 'bittersweet', ja: 'ほろ苦い', pron: 'bih-tur-sweet', example: 'Tonight feels bittersweet.', note: 'happy and sad at the same time' },
];

const DAY_365_KEYWORDS: KeyWord[] = [
  { en: 'farewell', ja: '別れの挨拶', pron: 'fair-wel', example: 'This is not farewell, just see you later.', note: 'formal goodbye' },
  { en: 'reunion', ja: '再会', pron: 'ree-yoo-nyun', example: 'I already look forward to our reunion.', note: 'meeting again after separation' },
  { en: 'treasure', ja: '宝物にする', pron: 'trezh-ur', example: 'I will treasure these memories.', note: 'verb: value deeply' },
  { en: 'beginning', ja: '始まり', pron: 'bih-gin-ing', example: 'Every ending is a new beginning.', note: 'start of something new' },
  { en: 'see you around', ja: 'またね', pron: 'see yoo uh-rownd', example: 'Well, see you around.', note: 'casual farewell, implies future meeting' },
];

// ============================================================
// Day Themes
// ============================================================

export const MONTH12_W49_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
  359: {
    title: '1年を振り返る',
    titleEn: 'Looking Back on a Year',
    category: 'feeling',
    scene: '居酒屋の壁に貼られた1年分の写真を眺めながら、常連たちが思い出話に花を咲かせている。',
    keywords: DAY_359_KEYWORDS,
  },
  360: {
    title: '仲間に感謝する',
    titleEn: 'Thanking Your People',
    category: 'social',
    scene: 'カウンター席で隣同士になった仲間たちが、照れくさそうにお互いへの感謝を伝え合っている。',
    keywords: DAY_360_KEYWORDS,
  },
  361: {
    title: 'マスターへの手紙',
    titleEn: 'A Letter to Master',
    category: 'feeling',
    scene: '閉店後、常連がマスターに宛てた手紙を読み上げる。マスターは黙ってグラスを磨いている。',
    keywords: DAY_361_KEYWORDS,
  },
  362: {
    title: '英語で自分を語る',
    titleEn: 'Telling Your Story in English',
    category: 'social',
    scene: '居酒屋に来た外国人旅行者に、自分のこの1年の成長を英語で語ってみる挑戦の夜。',
    keywords: DAY_362_KEYWORDS,
  },
  363: {
    title: '世界への一歩',
    titleEn: 'One Step into the World',
    category: 'feeling',
    scene: 'マスターが「次はどこへ行くんだ？」と聞く。常連たちがそれぞれの未来を語り始める。',
    keywords: DAY_363_KEYWORDS,
  },
  364: {
    title: '最後の乾杯',
    titleEn: 'The Final Toast',
    category: 'social',
    scene: '居酒屋の全員が立ち上がり、グラスを掲げる。マスターが最後の一言を添えて乾杯する。',
    keywords: DAY_364_KEYWORDS,
  },
  365: {
    title: 'また会おう',
    titleEn: 'Until We Meet Again',
    category: 'greeting',
    scene: '暖簾をくぐって外へ出る常連たち。振り返ると、マスターが深くお辞儀をしている。',
    keywords: DAY_365_KEYWORDS,
  },
};

// ============================================================
// Expressions
// ============================================================

export const MONTH12_W49_EXPRESSIONS: MasterExpression[] = [

  // -------------------------------------------------------
  // Day 359: 1年を振り返る (social)
  // -------------------------------------------------------
  {
    daySlot: 359,
    japanese: '1年前の自分とは全然違う',
    english: [
      'I am a different person',
      'I am a totally different person than I was a year ago',
      'Honestly, I am a completely different person compared to who I was a year ago',
      'You know, sitting here tonight, I can honestly say I am a completely different person from who I was when I first walked into this izakaya a year ago. It is wild to think about.',
    ],
    context: '「全然違う」は "totally different" で十分。日本語の「自分」は英語では "person" に変わる。主語が "I" なのに「自分」と客観視するのが日本語の面白いところ。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: 'あっという間だったね',
    english: [
      'It flew by',
      'The year just flew by, did it not',
      'Can you believe how fast this year went by? It feels like just yesterday we started',
      'I keep thinking about how fast this whole year went by. It literally feels like it was just last week that I walked in here for the first time, all nervous and not knowing a single word of English.',
    ],
    context: '「あっという間」は "flew by" が完璧。"Time flies" のバリエーション。日本語は「間」という空間的な表現だが、英語は飛ぶという動きで速さを表す。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: '最初は何も言えなかった',
    english: [
      'I could not say anything',
      'At first I could not say a single thing',
      'When I first started, I literally could not say anything at all in English',
      'I remember my first day here so clearly. I sat in that corner over there and I could not say a single thing in English. I just kept nodding and smiling like an idiot. Master had to translate everything for me.',
    ],
    context: '「何も言えなかった」の「言えなかった」は能力の欠如なので "could not"。"did not say" だと「言わなかった（選択）」になってしまう。この違いは大きい。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: 'みんなの成長を見るのが嬉しい',
    english: [
      'Love seeing everyone grow',
      'It makes me so happy to see everyone grow',
      'Nothing makes me happier than watching all of you grow over this past year',
      'You know what makes this old bartender the happiest? It is not the drinks or the food. It is watching each and every one of you grow right before my eyes. That is the real reward of running this place.',
    ],
    context: '「嬉しい」を "happy" と訳すと弱い場合がある。マスターの深い喜びには "nothing makes me happier" のような最上級構文が似合う。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: '恥ずかしい思い出もある',
    english: [
      'Some embarrassing memories too',
      'I have some pretty embarrassing memories too',
      'I definitely have my share of embarrassing moments from this year, but I would not trade them',
      'Oh man, do not even get me started on the embarrassing stuff. Remember when I tried to order in English at that restaurant and the waiter thought I was speaking French? I wanted to crawl under the table and disappear.',
    ],
    context: '「恥ずかしい思い出もある」の「も」が重要。良い思い出「も」あるけど恥ずかしいの「も」ある。英語では "too" や "also" で表現するが、"my share of" で「自分にも当然ある」というニュアンスが出せる。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: 'ここが自分の居場所だった',
    english: [
      'This was my place',
      'This place really became my home base',
      'This izakaya honestly became the one place where I felt like I truly belonged',
      'I have been thinking about this a lot lately. Before I found this place, I did not really have anywhere I felt comfortable practicing English. But this izakaya became my home base, you know? The one spot where I could mess up and nobody would judge me.',
    ],
    context: '「居場所」は英語に直訳しにくい。"place" だと物理的すぎる。"where I belonged" で「自分が受け入れられる場所」という感情が伝わる。日本語の「居場所」は物理+心理の両方を含む便利な言葉。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: '去年の今頃は想像もできなかった',
    english: [
      'Could not have imagined this',
      'A year ago I could not have imagined any of this',
      'If you had told me a year ago I would be here talking like this, I would not have believed you',
      'Seriously though, if someone had walked up to me a year ago and said hey, in twelve months you are going to be sitting in an izakaya having full conversations in English with your friends, I would have laughed in their face. No way I would have believed it.',
    ],
    context: '「想像もできなかった」は仮定法過去完了 "could not have imagined" がぴったり。日本語は「想像+できなかった」だが、英語は "if you had told me" という仮定法で同じ驚きを表現するのが自然。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: '失敗が全部つながってた',
    english: [
      'Every failure connected',
      'All those failures were actually connected',
      'Looking back, every single failure I had was actually leading me somewhere important',
      'It is funny how it works, right? At the time, every mistake felt like the end of the world. But now when I look back, I can see how every single one of those failures was actually pushing me forward. They were all connected like dots on a map.',
    ],
    context: '「つながってた」は Steve Jobs の "connecting the dots" に近い概念。日本語の「つながる」は自動詞だが、英語では "were connected" と受動態にするか "led somewhere" と能動態にするかで印象が変わる。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: 'まだまだこれからだけどね',
    english: [
      'Still a long way to go',
      'I mean, I still have a long way to go though',
      'Do not get me wrong, I still have a really long way to go, but at least now I know the path',
      'But hey, I am not going to sit here and pretend I have got it all figured out. I still have a really long way to go with my English. But the difference is, a year ago I did not even know where to start. Now I at least know the direction I am heading in.',
    ],
    context: '「まだまだこれから」は謙遜+前向きのハイブリッド。英語では "a long way to go" で距離感を出しつつ "but" で希望をつなげる。日本語の「これから」の前向きさは英語では明示的に言う必要がある。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 359,
    japanese: '写真見返したら泣きそう',
    english: [
      'Photos almost made me cry',
      'I was looking through our old photos and nearly cried',
      'I went back through all the photos from this year and I honestly almost started crying',
      'So I was going through my phone last night, right? And I found all these photos from the beginning of the year. Our first group photo, the time Kenji spilled beer everywhere, Lisa singing karaoke in English. I am not going to lie, I got a little emotional. Almost cried right there on my couch.',
    ],
    context: '「泣きそう」は "almost cried" で「泣くところだった」。"nearly" も同じ。日本語の「〜そう」は様態・推量だが、英語では "almost + 過去形" で「寸前だった」を表現する。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },

  // -------------------------------------------------------
  // Day 360: 仲間に感謝する (feeling)
  // -------------------------------------------------------
  {
    daySlot: 360,
    japanese: 'みんなに出会えてよかった',
    english: [
      'Glad I met everyone',
      'I am so glad I got to meet all of you',
      'I honestly cannot express how glad I am that I got to meet each and every one of you',
      'I have been wanting to say this for a while now. I am genuinely, truly glad that I got to meet all of you. My life would have been so much emptier without this group. You all changed everything for me and I really mean that.',
    ],
    context: '「出会えてよかった」の「出会えて」は可能形。英語では "got to meet" で「会う機会を得た」という幸運のニュアンスが出る。単純な "met" より感謝の深さが伝わる。',
    character: 'yuki',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: 'お前がいなかったら続かなかった',
    english: [
      'Could not have kept going without you',
      'I would not have lasted without you honestly',
      'If you had not been here, there is no way I would have stuck with it this long',
      'I am being dead serious right now. If you had not been sitting next to me that first night, encouraging me when I wanted to give up, I would have quit after the first week. There is absolutely no way I would have lasted a whole year without you pushing me forward.',
    ],
    context: '「お前がいなかったら」は仮定法過去完了。英語の "if you had not been" は日本語より構造が複雑だが、意味は同じ。「続かなかった」は "would not have lasted" で期間の継続を表す。',
    character: 'takeshi',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: 'ライバルがいたから頑張れた',
    english: [
      'Having a rival kept me going',
      'I pushed harder because I had a rival',
      'The reason I kept pushing myself was because I had someone right next to me to compete with',
      'You know what really kept me going all year? Having a rival. Sounds weird maybe, but every time I saw Takeshi nail a phrase I did not know, it lit a fire under me. That friendly competition made me work twice as hard as I would have on my own.',
    ],
    context: '「ライバル」は英語でも "rival" だが、日本語ほどポジティブな意味で使わない。英語では "friendly competition" や "someone to compete with" の方が健全な競争を表す。',
    character: 'kenji',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: '笑ってくれてありがとう',
    english: [
      'Thanks for laughing with me',
      'Thank you for always laughing with me and not at me',
      'I want to thank all of you for laughing with me, even when my English was a total disaster',
      'This might sound small, but one of the things I am most grateful for is that you all always laughed with me, never at me. Even when I said something completely wrong and ridiculous, you guys would crack up in the best way and then gently help me fix it. That meant the world to me.',
    ],
    context: '「笑ってくれて」の「くれて」が重要。「笑った」ではなく「笑ってくれた」= 相手の好意。英語では "laugh with me, not at me" で「一緒に笑う vs バカにして笑う」を区別する。この with/at の違いは大きい。',
    character: 'mina',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: '一人じゃここまで来れなかった',
    english: [
      'Could not have made it alone',
      'I never would have made it this far on my own',
      'There is absolutely no way I could have come this far if I had been doing this by myself',
      'Real talk for a second. I tried learning English on my own before I found this place. Apps, textbooks, YouTube videos, the whole thing. And I got nowhere. Absolutely nowhere. It was not until I started coming here and learning with all of you that things actually clicked. I could not have done this alone.',
    ],
    context: '「一人じゃ」は "on my own" や "by myself" が自然。"alone" でも通じるが少し寂しい響き。「ここまで来れなかった」は "could not have made it this far" で距離のメタファー。',
    character: 'lisa',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: 'この場所が俺を変えた',
    english: [
      'This place changed me',
      'This place honestly changed who I am',
      'I am not exaggerating when I say this place fundamentally changed who I am as a person',
      'I am not the type of guy who says stuff like this. You all know that. But this place, these people, these nights at the counter, they changed me. Not just my English. They changed the way I think, the way I see the world, everything. I walked in here as one person and I am leaving as someone completely different.',
    ],
    context: '「俺を変えた」は "changed me" でシンプルだが、"changed who I am" にすると存在レベルの変化になる。日本語の「変えた」は他動詞で場所が主語、英語も同じ構造で自然に言える珍しいケース。',
    character: 'takeshi',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: 'けんかもしたけど今は感謝してる',
    english: [
      'We fought but I am grateful now',
      'We had our fights but now I am honestly grateful for them',
      'Sure, we butted heads a few times, but looking back I am actually really grateful for those moments too',
      'Kenji, remember when we got into that huge argument about grammar versus conversation? Man, I was so mad at you that night. But you know what? You were right. And that argument pushed me to take a completely different approach. So yeah, we fought, but I am actually grateful for every single one of those fights now.',
    ],
    context: '「けんかもしたけど」の「も」は「良いことだけじゃなくて」の含み。英語では "sure, we butted heads" で軽く認めてから "but" で感謝に転じるのが自然。"butted heads" は角を突き合わせるイメージで口論を表す。',
    character: 'yuki',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: 'みんなの存在が支えだった',
    english: [
      'You all kept me going',
      'Just knowing you guys were here kept me going',
      'The simple fact that all of you existed in my life was what kept me going through the tough times',
      'There were nights I almost did not come. I was tired, or stressed from work, or just not feeling it. But then I would think about you guys, about sitting at this counter together, and I would drag myself here anyway. Just knowing you were all here waiting was enough to keep me going.',
    ],
    context: '「存在が支えだった」は抽象的。英語では "just knowing you were here" のように具体的な行動に落とし込む。「存在」をそのまま "existence" と訳すと哲学的すぎる。',
    character: 'mina',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: '言葉にならないくらい感謝してる',
    english: [
      'Cannot put it into words',
      'I honestly cannot put into words how grateful I am',
      'The gratitude I feel right now is so deep that I genuinely cannot find the right words for it',
      'You guys, I have been sitting here trying to figure out what to say all night, and I still cannot find the right words. And yeah, I get the irony. I spent a whole year learning English and I still cannot express the one thing that matters most. That is how deep my gratitude runs. It goes beyond words.',
    ],
    context: '「言葉にならない」は "cannot put it into words" が定番。日本語は「ならない」と自動詞だが、英語は "put into words" と能動的に「言葉に入れる」という動作。言語化の方向が逆。',
    character: 'kenji',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 360,
    japanese: 'また集まろうな、絶対',
    english: [
      'Let us get together again, for sure',
      'We have to get together again, no question',
      'Promise me we will all get together again. I mean it, no excuses, we are doing this',
      'Alright listen up, everyone. This is not the end, got it? We are going to get together again. I do not care how busy we get or where life takes us. We are making it happen. No excuses. Put it in your calendars right now. I am dead serious about this.',
    ],
    context: '「絶対」は "for sure" "definitely" "no question" など強調の選択肢が多い。日本語の「絶対」は一語で強い決意を表すが、英語では "I mean it" "no excuses" など補足フレーズで同じ強さを出す。',
    character: 'takeshi',
    category: 'feeling',
    month: '2027-03',
  },

  // -------------------------------------------------------
  // Day 361: マスターへの手紙 (feeling)
  // -------------------------------------------------------
  {
    daySlot: 361,
    japanese: 'マスター、ちょっと聞いてほしいことがある',
    english: [
      'Master, can I say something',
      'Master, there is something I really want to tell you',
      'Master, I know this is kind of out of the blue, but there is something I have been wanting to say to you',
      'Hey Master, can you stop wiping that glass for a second? I know you are always busy behind the counter, but I have been carrying something around that I really need to get off my chest. It is kind of important to me, so just hear me out for a minute, okay?',
    ],
    context: '「聞いてほしい」は "I want you to listen" より "hear me out" が居酒屋っぽい。"get something off my chest" は「胸のつかえを取る」で、ずっと言いたかったことを伝えるニュアンス。',
    character: 'yuki',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: '最初に声をかけてくれたこと、忘れない',
    english: [
      'I will never forget you reaching out',
      'I will never forget that you were the first one to talk to me',
      'The fact that you were the one who reached out to me first, that is something I will carry with me forever',
      'Do you remember my first night here? I was sitting at the end of the bar, too scared to talk to anyone. And you just walked over with a beer and started chatting with me in this mix of English and Japanese. You did not wait for me to come to you. You came to me. I will never, ever forget that.',
    ],
    context: '「声をかけてくれた」の「くれた」は感謝の授受表現。英語にはこの仕組みがないので "you were the one who" や "you reached out to me first" で「あなたから」の方向性を明示する必要がある。',
    character: 'lisa',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: '厳しい時もあったけど、全部愛情だった',
    english: [
      'Tough love, but it was all love',
      'You were hard on me sometimes, but it was always out of love',
      'There were moments when you were really strict, but I realize now that every bit of it came from a place of love',
      'I am not going to pretend it was always easy. There were nights you pushed me hard, made me repeat things twenty times, refused to let me take the easy way out. I got frustrated with you, honestly. But now I get it. Every single time you were tough on me, it was because you cared. It was all love, Master. All of it.',
    ],
    context: '「厳しい時もあった」は "tough love" という英語の概念にぴったり合う。日本語の「愛情」は英語の "love" と同じだが、師弟関係で "love" を使うのは英語でも自然。日本語より直接的に感情を言葉にする文化。',
    character: 'takeshi',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: 'ここが僕の原点です',
    english: [
      'This is where it all started',
      'This place is my starting point for everything',
      'No matter where I end up in life, this izakaya will always be the place where everything started for me',
      'People ask me sometimes, hey where did you learn English? And I always say the same thing. An izakaya. They think I am joking, but I am completely serious. This place, this counter, that menu on the wall. This is my origin story. This is where everything started. And it will always be my starting point, no matter where life takes me next.',
    ],
    context: '「原点」は "origin" や "starting point" だが、"where it all started" が最も自然。日本語の「原点」は一語で深い意味を持つが、英語では文で表現する方が響く。',
    character: 'kenji',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: 'マスターみたいな大人になりたい',
    english: [
      'I want to be like you',
      'I want to grow up to be the kind of person you are',
      'When I think about the kind of adult I want to become, you are the first person who comes to mind',
      'This is going to sound cheesy, I know, but I really mean it. When I think about the kind of person I want to be someday, the kind of adult who is patient and kind and always there for people, you are the first person I think of. You set the bar, Master. And I am going to spend the rest of my life trying to reach it.',
    ],
    context: '「マスターみたいな大人」は "the kind of adult you are" で表現。日本語の「みたいな」は英語では "like you" か "the kind of person you are" になるが、後者の方が具体的で感情が伝わる。',
    character: 'mina',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: 'おかげで英語が好きになれた',
    english: [
      'You made me love English',
      'Thanks to you, I actually fell in love with English',
      'Because of everything you did, I went from dreading English to genuinely falling in love with it',
      'Before I came here, English was just this thing I had to study. A chore. Something I was bad at and hated being bad at. But you turned it into something fun, something I actually wanted to do. You made me fall in love with a language I used to dread. That is not a small thing, Master. That is everything.',
    ],
    context: '「おかげで」は "thanks to you" が直訳。でも "because of everything you did" の方が具体的。「好きになれた」は "fell in love with" で恋愛的な表現を使うと英語では自然に強い愛着を表せる。',
    character: 'yuki',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: '泣かないって決めてたのに',
    english: [
      'I told myself I would not cry',
      'I promised myself I was not going to cry tonight',
      'I literally had one rule for tonight and it was do not cry, and I am already breaking it',
      'Oh no, here it comes. I swore to myself on the train ride over here that I was not going to cry tonight. I had one job. Just one. Keep it together for one evening. And look at me now. I cannot even get through two sentences without my eyes getting all watery. This is so embarrassing.',
    ],
    context: '「泣かないって決めてたのに」の「のに」は期待と現実のギャップ。英語では "I told myself I would not" で自分との約束を表し、"and look at me now" で裏切りを自嘲する。この自己ツッコミが英語でも笑いを生む。',
    character: 'lisa',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: 'いつでも帰ってこい',
    english: [
      'Come back anytime',
      'You are always welcome back here, anytime',
      'This door is always open for you. No matter how much time passes, you can always come back home',
      'Listen, all of you. I am not going anywhere. This bar is not going anywhere. And my door is always, always open. Whether it is next week, next month, or ten years from now, you walk through that door and your seat will be waiting. This is your home. It will always be your home.',
    ],
    context: '「帰ってこい」の「来い」は命令形だが愛情がある。英語の "come back anytime" は柔らかいが、マスターの "this is your home" で同じ温かさが出る。日本語は命令形で愛情を表せるのが独特。',
    character: 'master',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: 'マスターがいなかったらこの店の意味がない',
    english: [
      'Without you, this place means nothing',
      'This place would not be the same without you, Master',
      'You are the heart and soul of this izakaya. Without you, it is just walls and furniture',
      'I know we talk about the izakaya like it is some magical place, but let us be real for a second. It is not the building. It is not the drinks. It is not even the food, though the food is amazing. It is you, Master. You are the reason this place is special. Take you out of the equation and it is just another bar.',
    ],
    context: '「意味がない」は "means nothing" が直訳だが強すぎる場合も。"would not be the same" は柔らかい表現。"heart and soul" は「心臓と魂」= 核心という意味で、人に対して使うと最高の褒め言葉。',
    character: 'kenji',
    category: 'feeling',
    month: '2027-03',
  },
  {
    daySlot: 361,
    japanese: '手紙、あとで読んでください',
    english: [
      'Please read this letter later',
      'I wrote you a letter, please read it when we are gone',
      'I put everything I could not say out loud into this letter. Read it after we leave, okay?',
      'Master, here. I wrote this for you. I know, I know, a handwritten letter is kind of old-fashioned, but some things are too important for a text message. Just do me a favor and do not read it while we are still here, okay? Read it later tonight when you are closing up. I put everything in there that I could not say to your face without completely losing it.',
    ],
    context: '「あとで読んでください」は "read it later" だが、手紙を渡す場面では "read it when we are gone" が切ない。日本語の「あとで」は曖昧な時間指定だが、英語では具体的な場面を指定すると感情が伝わる。',
    character: 'mina',
    category: 'feeling',
    month: '2027-03',
  },

  // -------------------------------------------------------
  // Day 362: 英語で自分を語る (social)
  // -------------------------------------------------------
  {
    daySlot: 362,
    japanese: '自分を英語で紹介するのはまだ緊張する',
    english: [
      'Still get nervous introducing myself',
      'Introducing myself in English still makes me nervous',
      'Even after a whole year, I still get a little nervous when I have to introduce myself in English',
      'You would think after a year of doing this, I would be totally fine with self-introductions by now, right? But nope. Every single time someone asks me to introduce myself in English, I still get this little knot in my stomach. I guess some things never fully go away. But at least now I can push through it.',
    ],
    context: '「緊張する」は "nervous" が定番だが、"get a knot in my stomach" は身体的な緊張感を表すイディオム。日本語の「緊張」は心理的だが、英語では身体で表現すると生き生きする。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '俺は変わった。それが一番伝えたいこと',
    english: [
      'I changed. That is all I want to say',
      'The one thing I want people to know is that I changed',
      'If I could only tell the world one thing about myself, it would be this. I am not the same person I used to be',
      'People have this image of me, right? The quiet guy. The one who does not say much. And yeah, that was me. But that is not me anymore. I changed. I grew. I found my voice, literally and figuratively. And if there is one single thing I want to communicate to the world in English, it is that. I am not who I was.',
    ],
    context: '「伝えたい」は "want to say" より "want people to know" の方が対象が広い。「変わった」は "changed" だが、"I am not the same person" は変化の大きさを強調する表現。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '英語の自分と日本語の自分は少し違う',
    english: [
      'My English self is a bit different',
      'I am a slightly different person in English than in Japanese',
      'It is strange, but who I am in English and who I am in Japanese feel like slightly different people',
      'Has anyone else noticed this? When I speak English, I am somehow more direct. More open. I say things I would never say in Japanese. It is like English gives me permission to be a slightly different version of myself. Not better or worse, just different. And honestly, I kind of like that version.',
    ],
    context: '「英語の自分」は直訳しにくい。"My English self" は少し不自然で、"who I am in English" の方が自然。バイリンガルが実感する「言語によって人格が変わる」現象は研究でも確認されている。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '完璧じゃなくても伝わればいい',
    english: [
      'It does not have to be perfect',
      'As long as it gets across, perfect does not matter',
      'I used to obsess over being perfect, but now I know that getting my message across is what really counts',
      'I wasted so much time trying to speak perfect English. Perfect grammar, perfect pronunciation, the whole deal. And you know what I learned? Nobody cares about perfect. They care about connection. If what I am saying reaches the other person, if they understand me and I understand them, that is a win. Perfection is overrated.',
    ],
    context: '「伝わればいい」の「伝わる」は自動詞で「メッセージが届く」。英語では "get across" が同じ概念。"communicate" より口語的で居酒屋向き。「いい」は "that is enough" "that is what counts" で表現。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '好きなものの話なら英語でもいける',
    english: [
      'I can talk about what I love',
      'If it is something I love, I can totally talk about it in English',
      'When I am talking about something I am passionate about, the English just flows out of me naturally',
      'I figured something out this year. When I am talking about something I do not care about, my English is terrible. I freeze up and forget everything. But the second the topic switches to something I genuinely love, cooking, music, travel, whatever, the words just pour out. Passion is the best teacher, I swear.',
    ],
    context: '「いける」は可能を表すスラング。英語の "I can totally" が近い。「好きなものの話」は "something I love" が自然。日本語の「いける」は一語で「できる+自信」を表す便利な言葉。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '夢を英語で語れるようになった',
    english: [
      'I can talk about my dreams now',
      'I can finally talk about my dreams in English',
      'For the first time in my life, I can actually put my dreams into words in another language',
      'Do you want to know the moment I knew my English had really grown? It was the first time I was able to describe my dream, my actual life dream, to someone in English and they understood exactly what I meant. Not just the words, but the feeling behind them. That was the moment everything clicked for me.',
    ],
    context: '「語れるようになった」は「可能形+なる」で変化を表す。英語では "I can finally" の "finally" が「ようやく」の感情を運ぶ。日本語の「語る」は "talk about" より "describe" の方が深みが出る。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '下手でも気持ちは伝わる',
    english: [
      'Feelings get through even with bad English',
      'Even when my English is rough, the feelings still come through',
      'My English might not be polished, but the emotion behind my words always finds a way to reach people',
      'Something I learned this year that honestly changed my whole outlook. You do not need perfect English to connect with someone. You really do not. I have had conversations where my grammar was a disaster, where I mixed up every other word, and the other person still got exactly what I was feeling. Emotion transcends language. That is just a fact.',
    ],
    context: '「下手でも」は "even when my English is rough" で十分。「気持ちは伝わる」は "feelings come through" で「気持ちが通り抜けてくる」イメージ。日本語の「伝わる」と英語の "come through" は方向が逆で面白い。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '自分の言葉で話すのが大事',
    english: [
      'Using your own words matters',
      'What matters is speaking in your own words',
      'The most important thing I have learned is to speak from my own experience and in my own words',
      'I used to memorize phrases from textbooks and repeat them like a parrot. And yeah, people understood me, but it felt fake. It was not me talking, it was a textbook talking through me. The day I threw away the scripts and started just saying things in my own words, even if they were clumsy, that was the day I actually started communicating.',
    ],
    context: '「自分の言葉で」は "in your own words" が直訳で自然。"from your own experience" を加えると深みが増す。日本語の「自分の」は所有だが、英語の "own" は強調の意味が強い。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: '英語は道具。使ってなんぼ',
    english: [
      'English is a tool. Use it',
      'English is just a tool and tools are meant to be used',
      'At the end of the day, English is a tool, and a tool only has value when you actually pick it up and use it',
      'Master told me something early on that stuck with me all year. He said English is not a trophy you put on a shelf. It is a hammer. A screwdriver. A tool. And tools are meant to be used, not polished. So stop worrying about how shiny it looks and just start building something with it. Best advice I ever got.',
    ],
    context: '「使ってなんぼ」は「使って初めて価値がある」の関西弁的表現。英語には直訳がないが "tools are meant to be used" で同じ哲学を伝えられる。「なんぼ」の商売っ気ある感じは "only has value when" で表現。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 362,
    japanese: 'まだ全然うまくないけど、もう怖くない',
    english: [
      'Not good yet, but not scared anymore',
      'I am still far from fluent, but I am not afraid anymore',
      'My English is honestly still pretty rough around the edges, but the fear is completely gone and that changes everything',
      'If you ask me whether my English is good, I will tell you no. Honestly, it is still pretty rough. But here is the thing. A year ago, the idea of speaking English made me physically anxious. My hands would shake. My mind would go blank. And now? Now I just talk. The fear is gone. And losing that fear is worth more than any vocabulary list or grammar rule I could ever memorize.',
    ],
    context: '「怖くない」は "not scared" が直訳だが、"the fear is gone" の方がドラマチック。恐怖が「消えた」と擬人化する表現。日本語の「怖くない」は状態だが、英語では変化のプロセスとして語ると感動的。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },

  // -------------------------------------------------------
  // Day 363: 世界への一歩 (social)
  // -------------------------------------------------------
  {
    daySlot: 363,
    japanese: 'いつか海外に住んでみたい',
    english: [
      'Want to live abroad someday',
      'Someday I want to try living in another country',
      'One of my dreams is to actually live overseas for a while and put everything I have learned to the test',
      'You know what is funny? A year ago, living abroad was this impossible fantasy. Something other people did, not me. But now it feels real. It feels like something I could actually do. I want to go somewhere, anywhere, and just live there for a while. Use my English every single day. See if I can really make it on my own out there.',
    ],
    context: '「住んでみたい」の「みたい」は試みの願望。英語では "try living" で同じニュアンス。"want to live" だと試す感じが消える。「いつか」は "someday" で未定の将来。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '世界は広いって実感した',
    english: [
      'The world is bigger than I thought',
      'I finally realized just how big the world really is',
      'This year made me realize that the world is so much bigger and more connected than I ever imagined',
      'Before this year, my world was basically my apartment, my office, and the convenience store in between. That was it. But learning English opened this window, and suddenly I could see how enormous the world actually is. There are so many people out there, so many stories, so many ways of living. And now I can actually connect with all of it.',
    ],
    context: '「実感した」は "realized" より深い。「頭で知っていた」ことを「体で感じた」ニュアンス。英語では "finally realized" の "finally" や "made me realize" で体験を通じた理解を表現する。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '英語ができると選択肢が増える',
    english: [
      'English gives you more options',
      'Knowing English opens up so many more options in life',
      'Being able to speak English has literally doubled the number of doors that are open to me right now',
      'I used to think English was just a subject you studied in school. A test you passed or failed. But it is so much more than that. It is a key that opens doors. Job opportunities, friendships with people from other countries, travel, information, entertainment. Everything. The number of options in my life has exploded since I started actually using English for real.',
    ],
    context: '「選択肢が増える」は "more options" が直訳。でも "opens doors" のメタファーが英語では超定番。「選択肢」を「ドア」に置き換えるだけで英語らしくなる。比喩の選び方が言語の個性。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '怖いけどワクワクする',
    english: [
      'Scary but exciting',
      'It is scary but honestly I am more excited than afraid',
      'The thought of going out into the world is terrifying, but in the best possible way because I am so excited',
      'I would be lying if I said I was not nervous about what comes next. Of course I am. The unknown is always scary. But underneath all that fear, there is this excitement that I cannot shake. It is like standing at the edge of a diving board. Your legs are shaking but you cannot wait to jump. That is exactly how I feel right now.',
    ],
    context: '「ワクワクする」は英語に一語で訳せない日本語の代表格。"excited" が近いが、「ワクワク」の擬態語的な胸の高鳴りは "excitement I cannot shake" や "cannot wait to" で補う。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '日本の良さも英語で伝えたい',
    english: [
      'Want to share Japan too',
      'I also want to share what is great about Japan in English',
      'One thing I really want to do is tell the world about all the amazing things about Japan in my own English',
      'Learning English is not just about consuming, you know? It is not just about understanding American movies or reading English books. I want to give something back. I want to tell people around the world about Japan. The food, the seasons, the culture, the little everyday things that make this country special. I want to be a bridge, not just a sponge.',
    ],
    context: '「良さ」は "what is great about" で表現。「伝えたい」は "tell the world about" でスケールが大きくなる。「橋になりたい」"be a bridge" は日本語でも英語でも使えるメタファーで珍しい共通表現。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: 'この1年が自信になった',
    english: [
      'This year gave me confidence',
      'This whole year has become a source of real confidence for me',
      'Everything I have been through this year has built a foundation of confidence that nobody can take away from me',
      'Confidence is a weird thing, right? You cannot buy it, you cannot borrow it, and nobody can give it to you. You have to earn it. And I feel like this year, for the first time in my life, I actually earned some real confidence. Not the fake kind you pump yourself up with in the mirror. The real kind that comes from doing something hard and surviving it.',
    ],
    context: '「自信になった」は「自信の源になった」の省略。英語では "gave me confidence" が自然。日本語は「なる」で変化を表すが、英語は "give" で外から与えられるイメージ。自信の捉え方が文化的に違う。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '一歩踏み出す勇気をもらった',
    english: [
      'You gave me courage to step forward',
      'All of you gave me the courage to take that first step',
      'Because of this group, I finally have the courage to step out of my little world and into the bigger one',
      'I have always been the cautious type. The guy who watches from the sidelines, who plans everything but never actually moves. But this year, this group, you all showed me that it is okay to just go for it. You do not have to have everything figured out. You just have to be brave enough to take that first step. And now, thanks to you, I finally am.',
    ],
    context: '「踏み出す」は "take a step" で足を出す動作。"step forward" "step out" どちらも使える。「勇気をもらった」は "gave me courage" だが、日本語の「もらう」は受身的。英語では "you gave me" と相手を主語にして感謝を表す。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: 'どこにいてもここで学んだことは消えない',
    english: [
      'What I learned here stays with me',
      'No matter where I go, what I learned here will never disappear',
      'The things I learned in this izakaya are coming with me wherever life takes me, and nothing can erase that',
      'Geography does not matter. I could move to the other side of the planet and it would not change a thing. What I learned here, the English, the friendships, the confidence, all of it is right here inside me. It is not attached to this building or this neighborhood. It is attached to me now. And it is going wherever I go.',
    ],
    context: '「消えない」は "will never disappear" より "stays with me" が温かい。「どこにいても」は "no matter where I go" が定番の譲歩表現。日本語の「消えない」は否定形だが、英語では肯定的に "stays" と言う方が力強い。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '英語は終わりのない旅だ',
    english: [
      'English is a never-ending journey',
      'Learning English is a journey that honestly never ends',
      'I have come to realize that English is not a destination you arrive at but a journey that keeps going forever',
      'I used to think there was a finish line somewhere. Like, once I hit a certain level, I would be done. English complete. Game over. But there is no finish line. And honestly? That used to scare me. But now I find it kind of beautiful. It means there is always something new to discover, always a new way to grow. The journey never ends, and I am finally okay with that.',
    ],
    context: '「終わりのない旅」は "never-ending journey" で直訳が自然に通じるケース。"It is not a destination but a journey" は英語の有名な格言にも近い。日本語と英語で同じメタファーが成立する珍しい例。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 363,
    japanese: '世界のどこかで再会しよう',
    english: [
      'Let us meet again somewhere',
      'Let us meet again somewhere out in the world',
      'Wherever we end up on this planet, let us make sure we find each other again someday',
      'Here is what I want us all to promise each other tonight. No matter where life scatters us, no matter how far apart we end up, we are going to find each other again. Maybe it will be in Tokyo, maybe New York, maybe some random little town in Italy. I do not care where. We are going to meet again. That is a promise, not a wish.',
    ],
    context: '「再会」は "reunion" が名詞だが、「再会しよう」は "let us meet again" が自然。「世界のどこかで」は "somewhere out in the world" でスケール感が出る。「しよう」の意志は "let us" で表現。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },

  // -------------------------------------------------------
  // Day 364: 最後の乾杯 (social)
  // -------------------------------------------------------
  {
    daySlot: 364,
    japanese: '最後の一杯、何にする？',
    english: [
      'What are you having for the last one',
      'So what are you going to have for your very last drink here',
      'Alright everyone, this is it. The very last round. So what is everyone going to have for their final drink at this counter',
      'Okay, listen up, crew. This is it. The last round. The final order at this counter. So I need everyone to think about this carefully. What do you want your very last drink here to be? Make it count. Because this one is going in the memory books.',
    ],
    context: '「何にする？」は "what are you having" が飲食店の定番。"What do you want" より "What are you having" の方が決定寄り。最後の注文だから "make it count"（意味のあるものにしろ）が効く。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: '最初に飲んだのと同じやつで',
    english: [
      'Same as my first drink here',
      'I will have the same thing I ordered on my very first night',
      'Give me the exact same drink I had on my first night here. I want to come full circle',
      'You know what, Master? Give me the same thing I ordered on my very first night. I do not even remember what it tasted like back then because I was so nervous. But tonight I am going to sit here and actually enjoy it. Full circle. Start and finish with the same drink. That feels right.',
    ],
    context: '「同じやつで」の「で」は手段・方法の助詞。英語では "same as" か "give me the same thing" で注文する。"Full circle" は「一周して戻る」意味で、最初と最後が同じ時に使う表現。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: '乾杯の音頭、誰が取る？',
    english: [
      'Who is leading the toast',
      'So who is going to lead the toast tonight',
      'Alright, someone has to step up and give the toast. Who is going to do the honors tonight',
      'Okay we have got our drinks, everyone is here, the mood is perfect. But we need someone to lead the toast. And I do not mean just a quick cheers. I mean a real toast. A proper send-off. So who is brave enough to stand up and say something? Come on, do not all volunteer at once.',
    ],
    context: '「音頭を取る」は "lead the toast" で、「先頭に立つ」意味。"do the honors" は「光栄な役を務める」という丁寧な表現。日本語の「音頭」は音楽用語から来ているが、英語の "lead" はリーダーシップの意味。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: 'この1年に乾杯',
    english: [
      'Here is to this year',
      'Here is to the best year of our lives',
      'Raise your glasses everyone. Here is to the most incredible year any of us have ever had',
      'Alright, glasses up. Every single one of you, glasses up right now. Here is to this year. Here is to every awkward conversation, every grammar mistake, every late night at this counter. Here is to Master and his endless patience. Here is to us, the weirdest, loudest, most dedicated English study group this izakaya has ever seen. Cheers.',
    ],
    context: '「〜に乾杯」は "Here is to ~" で始まるのが英語の乾杯フォーマット。日本語の「乾杯」は一語で済むが、英語のトーストは理由や感謝を述べてから最後に "Cheers" で締める文化。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: 'みんなの未来に乾杯',
    english: [
      'To everyone is future',
      'Here is to whatever comes next for all of us',
      'And while we are at it, here is to the future. To every dream and adventure waiting for each one of us',
      'One more toast, if you will allow me. This one is for the future. For every single thing that is waiting for us out there. The new jobs, the new friendships, the new places, the new mistakes, and the new victories. We do not know what is coming, and that is the best part. To the future, everyone. Whatever it holds, we are ready.',
    ],
    context: '「未来に」は "to the future" で簡潔。英語の乾杯は連続で "one more toast" と追加できる。日本語では一度の「乾杯」で済むが、英語圏ではスピーチが長くなりがち。',
    character: 'mina',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: 'この味、忘れないだろうな',
    english: [
      'I will not forget this taste',
      'I do not think I will ever forget what this tastes like',
      'Something tells me the taste of this drink tonight is going to stay with me for the rest of my life',
      'You know that thing where a certain taste or smell takes you right back to a specific moment? Like time travel, but through your senses? That is what this drink is going to be for me. Twenty years from now, I will taste something similar and boom, I will be right back here at this counter, with all of you, on this exact night.',
    ],
    context: '「忘れないだろうな」の「だろうな」は推量+感慨。英語では "I do not think I will ever forget" で二重否定的に「忘れることはないだろう」と表現。"something tells me" は直感を表す便利なフレーズ。',
    character: 'kenji',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: '泣いてるの俺だけ？',
    english: [
      'Am I the only one crying',
      'Wait, am I seriously the only one crying right now',
      'Hold on, please tell me I am not the only one here who is getting emotional right now',
      'Okay, real question. Am I the only one who is fighting back tears right now? Because if I am, that is really embarrassing and I need someone to cry with me immediately. I refuse to be the only emotional one at this table. Someone else start crying too so I feel better about myself.',
    ],
    context: '「俺だけ？」は "Am I the only one" が完璧な対応。日本語の「だけ」は限定、英語の "the only one" も同じ。自分だけが感情的になっているか確認する表現は文化を超えて共感される。',
    character: 'takeshi',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: 'もう一杯だけ、いいですか',
    english: [
      'One more, please',
      'Can I have just one more drink, please',
      'I know we said last round, but can we have just one more? I am not ready for this to end yet',
      'Master, I know, I know, we said that was the last one. But please, just one more. I am not ready to leave yet. I am not ready for this night to end. Just one more drink, one more hour, one more conversation. Is that okay? I promise I will leave after this one. Probably. Maybe. No promises actually.',
    ],
    context: '「もう一杯だけ」は "just one more" のシンプルさが美しい。「いいですか」は "is that okay" だが、居酒屋では "can I" で十分。日本語の「だけ」と英語の "just" は限定の仕方が同じで翻訳しやすい。',
    character: 'yuki',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: '今夜は時間を止めたい',
    english: [
      'Wish I could stop time',
      'I honestly wish I could stop time right now',
      'If I had one superpower, I would use it right now to freeze this moment and stay in it forever',
      'Does anyone else wish they could just hit pause on tonight? Like, just freeze everything exactly the way it is right now. The drinks, the laughter, the warmth of this counter, all of our faces. I want to keep this moment in a jar and carry it around with me. Is that too much to ask? Just stop time for a little while?',
    ],
    context: '「時間を止めたい」は "stop time" が直訳で通じる。"freeze this moment" も映画的で良い。日本語の「止めたい」は希望だが、英語では "wish I could" の仮定法で「できたらいいのに（でもできない）」と切なさが増す。',
    character: 'lisa',
    category: 'social',
    month: '2027-03',
  },
  {
    daySlot: 364,
    japanese: 'おかわり自由にしとくから、好きなだけ飲め',
    english: [
      'Refills are on the house. Drink up',
      'Free refills tonight. Drink as much as you want',
      'Tonight is special, so all refills are on me. You all drink as much as you want, no limits',
      'Alright, listen. Tonight, everything is on the house. Every single drink. You want another beer? It is yours. Whiskey? Pour it yourself, I do not care. Tonight is not about money or tabs or any of that. Tonight is about family. So drink up, eat up, and do not you dare reach for your wallet. The first person who tries to pay gets kicked out.',
    ],
    context: '「おかわり自由」は "free refills" がアメリカ英語の定番表現。日本語の「好きなだけ飲め」は命令形だが愛情たっぷり。英語では "drink as much as you want" + "on the house"（店のおごり）で同じ気前の良さを表す。',
    character: 'master',
    category: 'social',
    month: '2027-03',
  },

  // -------------------------------------------------------
  // Day 365: また会おう (greeting)
  // -------------------------------------------------------
  {
    daySlot: 365,
    japanese: 'ついにこの日が来たね',
    english: [
      'The day is finally here',
      'Well, this day finally came, did it not',
      'I cannot believe this day is actually here. It feels surreal, like it should not be real',
      'So this is it, huh? Day three hundred and sixty-five. I have been dreading this day and looking forward to it at the same time. Dreading it because it means goodbye. Looking forward to it because it means we actually did it. We made it a whole year. Can you believe that? A whole year.',
    ],
    context: '「ついに来た」は "finally came" が直訳。「この日」を待ち望んでいた+恐れていた両方のニュアンスは日本語の「ついに」に含まれる。英語では "dreading and looking forward to" と明示する必要がある。',
    character: 'yuki',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: '寂しいけど、笑って送り出したい',
    english: [
      'Sad but I want to smile',
      'It is hard to let go, but I want us to leave with a smile',
      'I am going to miss this more than I can say, but I would rather send everyone off with a smile than with tears',
      'I made a decision about tonight. I am going to smile. I am going to laugh. I am going to enjoy every single second. Because yeah, I am sad. Of course I am. But I do not want my last memory of this place to be crying into my beer. I want it to be laughter. I want it to be joy. So let us make the last night the best night.',
    ],
    context: '「送り出したい」は "send off" で別れの場面に使う表現。「笑って」は方法を表す「て形」で、英語では "with a smile" と前置詞で表す。日本語の動詞連結と英語の前置詞句は構造が全然違うのに同じ感情を運ぶ。',
    character: 'lisa',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: '1年前の自分に伝えたい。大丈夫だよって',
    english: [
      'I would tell my past self it will be okay',
      'If I could talk to myself a year ago, I would say you are going to be just fine',
      'If I could go back in time and talk to the version of me sitting here scared on day one, I would tell him one thing. You are going to be okay',
      'You know what I would say if I could send a message back in time to myself on day one? I would say hey, idiot, stop worrying. You are going to walk into an izakaya, meet the best people of your life, and somehow learn to speak English along the way. It is going to be hard, and messy, and embarrassing, but you are going to be absolutely fine. Trust the process.',
    ],
    context: '「大丈夫だよ」は英語で "you are going to be okay" が温かい。「伝えたい」は仮定法 "if I could" で不可能な願望を表す。日本語の「大丈夫」は万能語だが、英語では状況に合わせて "fine" "okay" "alright" を使い分ける。',
    character: 'takeshi',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: 'お前ら最高だった',
    english: [
      'You guys were the best',
      'You guys were honestly the absolute best',
      'I mean this from the bottom of my heart. You all were the greatest group of people I have ever been a part of',
      'I am not good with words. Never have been, not in Japanese, definitely not in English. But I am going to try. You guys. This crew. This weird, funny, stubborn, beautiful group of English learners in an izakaya. You were the best. The absolute best. And I will fight anyone who says otherwise.',
    ],
    context: '「最高だった」は "the best" が完璧。日本語の「お前ら」は乱暴だが親しみがある。英語の "you guys" が同じポジション。「だった」の過去形が切ない。英語でも "were" にすると終わりの感覚が出る。',
    character: 'kenji',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: 'ここで過ごした時間は宝物',
    english: [
      'The time we spent here is a treasure',
      'Every moment I spent in this place is something I will treasure forever',
      'The hours, the nights, the conversations, every single second I spent in this izakaya is a treasure I will keep for life',
      'People collect all kinds of things, right? Stamps, coins, records, whatever. But the most valuable thing I collected this year cannot fit in a box or go on a shelf. It is the time I spent here with all of you. Every conversation, every lesson, every laugh. I am going to treasure those moments for the rest of my life. They are worth more than anything money can buy.',
    ],
    context: '「宝物」は "treasure" で直訳が美しく決まる珍しいケース。日本語も英語も同じメタファー。"treasure" は名詞にも動詞にもなり、"I will treasure" で「大切にし続ける」未来の意志を表す。',
    character: 'mina',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: '終わりじゃない、始まりだ',
    english: [
      'Not an ending. A beginning',
      'This is not the end. It is the beginning of something new',
      'I refuse to call this an ending. This is a beginning, a brand new chapter for every single one of us',
      'Can I just say one thing? I hate the word goodbye. I have hated it all week. Because this is not a goodbye. It is not an ending. What we built here, the friendships, the skills, the memories, none of that ends tonight. Tonight is just the start of whatever comes next. A new chapter. A new beginning. The story does not end here. It just goes somewhere new.',
    ],
    context: '「終わりじゃない、始まりだ」は "not an ending, a beginning" で対比が美しい。日本語も英語も同じ構造。"Every ending is a new beginning" は英語の有名な格言。短い文の連打が感情を強くする。',
    character: 'yuki',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: '最後の授業だ。聞いてくれ',
    english: [
      'Last lesson. Listen up',
      'This is my final lesson for all of you. So listen carefully',
      'Alright, one last lesson before you all walk out that door. This is the most important one, so pay attention',
      'Okay, everyone quiet down for a second. One last lesson from your old bartender teacher. I saved the best one for last. Ready? Here it is. The most important thing in any language is not the words you know. It is the courage to use them. That is it. That is the whole lesson. Be brave enough to open your mouth and speak. The words will follow. They always do.',
    ],
    context: '「授業」は "lesson" だが、マスターが言うと "lesson from your old bartender teacher" と自虐が入る。「聞いてくれ」は "listen up" でカジュアルな注目要請。最後の授業は内容より姿勢の話になるのが良い。',
    character: 'master',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: '扉を開けて外に出よう',
    english: [
      'Open the door and step outside',
      'Come on, let us open that door and walk out into the world',
      'It is time. Let us open this door together, step outside, and see what the world has waiting for us',
      'Alright, are we ready? One last look around. Take it all in. The counter, the bottles, the menu on the wall, Master standing right there where he always stands. Got it? Good. Now let us open that door. Together. And when we step outside, we are not leaving something behind. We are carrying everything we learned in here out into the world with us. Let us go.',
    ],
    context: '「扉を開けて」は物理的な動作と比喩が重なる美しい表現。英語の "open the door" も同じ二重性を持つ。居酒屋の扉を開ける = 世界への一歩。日本語と英語で全く同じメタファーが成立する。',
    character: 'takeshi',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: 'またな。絶対またな',
    english: [
      'See you. Definitely see you',
      'See you later. And I mean that, I will definitely see you again',
      'This is not goodbye. It is see you later. And I mean it more than I have ever meant anything',
      'I am not saying goodbye. I am saying see you later. Because we are going to see each other again. I do not know when, and I do not know where, but it is going to happen. And when it does, we are going to walk into whatever izakaya is closest, order a round, and pick up right where we left off. Like no time passed at all. See you later, everyone. Definitely see you later.',
    ],
    context: '「またな」は "see you" の完璧な対応。「絶対」を繰り返すことで決意を強調。英語でも "definitely" を繰り返すと同じ効果。"See you later" は "goodbye" より再会を前提とした別れの言葉で、この場面に最適。',
    character: 'kenji',
    category: 'greeting',
    month: '2027-03',
  },
  {
    daySlot: 365,
    japanese: 'ありがとう。全部、ありがとう',
    english: [
      'Thank you. For everything',
      'Thank you. For absolutely everything. Every single thing',
      'From the bottom of my heart, thank you. For the English, the friendship, the laughter, for everything',
      'I do not need fancy words for this. I do not need a long speech or a clever phrase. I just need two words. Thank you. Thank you for the English. Thank you for the patience. Thank you for the laughter, the tears, the late nights, and the early mornings. Thank you for believing in me when I did not believe in myself. Thank you for everything. I mean it. Everything.',
    ],
    context: '「全部、ありがとう」の「全部」は "for everything" が完璧。日本語の「ありがとう」を繰り返す感情は英語でも "thank you" の繰り返しで伝わる。最後の表現がシンプルであるほど感情が深く響く。言語を超えて、感謝の言葉はシンプルが最強。',
    character: 'mina',
    category: 'greeting',
    month: '2027-03',
  },
];

// ============================================================
// Keyword exports
// ============================================================

export const MONTH12_W49_KEYWORDS: Record<number, KeyWord[]> = {
  359: DAY_359_KEYWORDS,
  360: DAY_360_KEYWORDS,
  361: DAY_361_KEYWORDS,
  362: DAY_362_KEYWORDS,
  363: DAY_363_KEYWORDS,
  364: DAY_364_KEYWORDS,
  365: DAY_365_KEYWORDS,
};
