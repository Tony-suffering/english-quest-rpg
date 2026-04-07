/**
 * 365 English Master -- Month 6 Week 23: 旅のトラブル (Travel Troubles)
 * Days 165-171: 70 expressions
 * Month: September 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 6 (2026-09) -- WEEK 23
// ============================================================

export const MONTH6_W23_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 165: 道に迷う (Getting Lost)
    // Scene: タケシが現地で道に迷い、スマホの電池も切れかけている
    // ────────────────────────────────────────────────────

    {
        daySlot: 165, japanese: 'ここどこだろう',
        english: [
            'Where are we?',
            'I have no idea where we are right now.',
            'OK I am completely lost. This does not look like anything on the map.',
            "Yeah, I have no clue either. I swear we passed that same bakery like three times already.",
        ],
        context: 'walking in circles は「同じところをぐるぐる回る」。offline map は海外旅行の命綱。figured は「思い込んでいた」。pretending は「知ったふりをする」。日本語の「ここどこ」は2語だが英語ではこんなに長くなるのがリアル。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'この道で合ってる？',
        english: [
            'Is this the right way?',
            'Are we going the right direction?',
            'I feel like we took a wrong turn somewhere. Does this look right to you?',
            "Honestly, I don't think so. Let's just turn around and go back to the station.",
        ],
        context: 'took a wrong turn は「曲がるところを間違えた」。Google Street View は旅行前の下見に使う人が多い。turn around は「引き返す」。日本語の「合ってる？」は確認だが、英語では不安を全部言葉にする傾向がある。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'すみません、道を教えてもらえますか',
        english: [
            'Excuse me, can you help me?',
            'Sorry to bother you, could you give me directions?',
            'Excuse me, I am a bit lost. Could you point me in the direction of the train station?',
            "Sure thing! Go straight two blocks, then take a left at the big church. You can't miss it.",
        ],
        context: 'give me directions は「道を教えて」。point me in the direction of は「方向を示して」。running late は「遅れている」。sorry to bother you は声をかけるときの定番。日本語の「すみません」1語に対して英語では前置きが長い。道を聞くだけで3文くらい言う。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'Google Mapが使えない',
        english: [
            'My maps app is not working.',
            'Google Maps is going crazy. It keeps saying I am in the ocean.',
            'My phone has no signal and the GPS is completely off. We are on our own.',
            "Mine's dead too. We should've downloaded the offline map before we left the hotel.",
        ],
        context: 'GPS pin は地図上の現在地マーカー。jumping all over the place は「あちこち飛ぶ」。messing with は「邪魔をしている」。offline map は事前ダウンロードの地図。spinning loading circle はぐるぐるマーク。on our own は「自力で」。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'あの人に聞いてみよう',
        english: [
            'Let us ask someone.',
            'Let us ask that person over there.',
            'That guy looks like a local. Let us go ask him before he walks away.',
            "Good idea. He looks like he knows the area. You go, though. My English is terrible.",
        ],
        context: 'old school method は「昔ながらのやり方」。local は「地元の人」。freeze up は「固まる」。universal language は「万国共通の言葉」。日本人は道を聞くことに抵抗がある人が多いが、英語圏では気軽に声をかける文化。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: '地図読むの苦手なんだよね',
        english: [
            'I am bad with maps.',
            'I cannot read maps to save my life.',
            'Maps have never been my thing. I always end up going the opposite direction.',
            "Ha, same here. I once walked ten blocks the wrong way before I noticed the numbers going up.",
        ],
        context: 'to save my life は「どうしても〜できない」の強調。sense of direction は「方向感覚」。navigation chip は「ナビ機能」の比喩。never been my thing は「昔から苦手」。英語では自分の弱点をユーモラスに語る文化がある。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'こっちだと思う',
        english: [
            'I think it is this way.',
            'Pretty sure we need to go this way.',
            'If I am reading this map right, we should head north. Which is... that way, I think.',
            "Alright, I'll trust you on this one. But if we end up even more lost, dinner's on you.",
        ],
        context: 'pretty sure は「たぶん合ってる」。head north は「北に向かう」。famous last words は「死亡フラグ的な一言」というユーモア表現。hit the main street は「大通りに出る」。blame は「責める」。landmark は「目印」。八割の自信を英語ではこう表現する。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'タクシー拾おうよ',
        english: [
            'Let us just get a cab.',
            'Forget walking. Let us just grab a taxi.',
            'I am done wandering around. Can we please just flag down a taxi and get out of here?',
            "Honestly, yeah. My feet are killing me. There's one right there, wave it down!",
        ],
        context: 'flag down は「手を振って止める」。hail a cab は少しフォーマルな「タクシーを拾う」。calling it は「もうやめると宣言する」。my feet are killing me は「足が死ぬほど痛い」。sanity は「正気」。taxi fare は「タクシー代」。grab a taxi はカジュアル版。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: '迷ったのも旅の思い出だよ',
        english: [
            'Getting lost is part of the trip.',
            'Hey, getting lost makes for a great story later.',
            'Years from now we are going to laugh about this. That time we got hopelessly lost.',
            "You know what, you're right. This neighborhood is actually pretty cool. We never would've found it otherwise.",
        ],
        context: 'makes for は「〜になる」。hopelessly は「絶望的に」。stumbled into は「偶然見つけた」。authentic は「本物の」。tourist areas は「観光地」。find our way は「道を見つける」。ポジティブに捉え直す表現。迷子を楽しめる人は旅上級者。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 165, japanese: 'やっと着いた',
        english: [
            'We finally made it.',
            'Oh thank god, we are finally here.',
            'I cannot believe we actually found it. I was about two minutes away from giving up completely.',
            "About time! I'm downloading every offline map on the planet before we go anywhere else.",
        ],
        context: 'made it は「たどり着いた」。giving up は「諦める」。blistered は「マメができた」。drenched in sweat は「汗びっしょり」。aged five years は「5歳老けた」。never again は「二度とごめんだ」。到着の安堵感を大げさに表現するのが英語のスタイル。',
        character: 'mina', category: 'travel', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 166: 物をなくす (Losing Things)
    // Scene: ミナがパスポートを見当たらなくて全員パニック
    // ────────────────────────────────────────────────────

    {
        daySlot: 166, japanese: 'パスポートがない',
        english: [
            'I cannot find my passport.',
            'My passport is gone. I looked everywhere.',
            'Please tell me this is not happening. I think I lost my passport.',
            "OK, don't panic yet. When's the last time you had it? Think carefully.",
        ],
        context: 'freak out は「パニックになる」。vanished は「消えた」。sick to my stomach は「気持ち悪いくらい不安」。literally は強調の定番。日本語では「ない」の一言だが英語では不安の過程を全部喋る。パスポート紛失は旅行者最大の恐怖。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: '最後に見たのはどこ？',
        english: [
            'Where did you last see it?',
            'Think carefully. When was the last time you had it?',
            'OK let us retrace your steps. Where exactly did you last have your passport in your hand?',
            "I think it was at the hotel. I used it at the front desk this morning, then... I'm not sure after that.",
        ],
        context: 'retrace your steps は「来た道を戻って確認する」。physically held は「実際に手に持った」。safe はホテルの金庫。shuts down は「機能停止する」。walk me through は「順番に説明して」。パニック時に冷静に質問する英語は覚えておくと助かる。',
        character: 'kenji', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: 'どこかに落としたかも',
        english: [
            'Maybe I dropped it somewhere.',
            'I might have dropped it without noticing.',
            'I bet it fell out of my bag at some point. The zipper has been broken since yesterday.',
            "That broken zipper? Yeah, that's definitely possible. Let's retrace your steps before someone picks it up.",
        ],
        context: 'dropped it は「落とした」。messed up は「壊れている」。coming unzipped は「勝手にジッパーが開く」。slid right out は「するっと出た」。picked it up は「拾った」。should have は後悔の定番。like you told me to は「言った通りにすれば良かった」。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: '盗まれたかもしれない',
        english: [
            'Maybe it was stolen.',
            'What if someone took it? I felt someone bump into me earlier.',
            'Remember when that guy bumped into me on the subway? I bet that is when it happened.',
            "I remember that. That was super suspicious. You should've worn your bag in front like Kenji said.",
        ],
        context: 'pickpockets は「スリ」。target tourists は「観光客を狙う」。distract は「注意をそらす」。bump into は「ぶつかる」。worn it in front は「前に背負う」。スリ対策は海外旅行の基本。日本ではスリの心配はほぼないが英語圏の大都市では常識。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: '大使館に連絡しないと',
        english: [
            'We need to call the embassy.',
            'First thing we should do is contact the Japanese embassy.',
            'If it is really gone, we need to report it and go to the embassy first thing tomorrow.',
            "Right, and we'll need a police report first. The embassy won't do anything without one.",
        ],
        context: 'embassy は「大使館」。consulate は「領事館」。emergency travel document は「緊急渡航書」で帰国用の仮パスポート。file a police report は「警察に届け出る」。travel insurance は「旅行保険」。not the end of the world は「世界の終わりではない」。冷静な対処法を英語で知っておくと安心。',
        character: 'kenji', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: 'スマホもどっかいった',
        english: [
            'My phone is missing too.',
            'Great, now I cannot find my phone either.',
            'This day keeps getting worse. My phone is gone too.',
            "Are you serious? Did you check the bench where we sat? You were messing with it there.",
        ],
        context: 'you have got to be kidding me は「冗談でしょ」。keeps getting worse は「どんどん悪くなる」。set it down は「置いた」。apparently は「どうやら自分がそうらしい」の自虐。foreign country は「外国」。スマホ紛失はパスポートの次に深刻な旅のトラブル。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: '見つかったよ！',
        english: [
            'I found it!',
            'Oh my god, I found it! It was in my jacket the whole time.',
            'Wait, hold on. False alarm. It was in the inside pocket of my jacket this whole time.',
            "You're kidding me. We've been freaking out for an hour and it was in your jacket? Drinks are on you tonight.",
        ],
        context: 'false alarm は「勘違いだった」。inside pocket は「内ポケット」。on purpose は「わざと」。crisis averted は「危機回避」。drinks are on me は「今夜は俺のおごり」。パスポートが実は内ポケットにあったというオチは旅あるある。relieved は「安堵した」。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: '貴重品はちゃんと管理しなよ',
        english: [
            'Keep your valuables safe.',
            'You really need to be more careful with your stuff.',
            'After this scare, I think we all need to take better care of our valuables.',
            "I know, I know. Hotel safe from now on. I'm not going through that again.",
        ],
        context: 'valuables は「貴重品」。money belt は「マネーベルト」（腰に巻くやつ）。neck pouch は「首からかけるポーチ」。loose は「そのまま入れっぱなし」。lesson learned は「教訓を得た」。period は「以上、終わり」の強調。ruins は「台無しにする」。',
        character: 'kenji', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: 'コピーを取っておけばよかった',
        english: [
            'I should have made a copy.',
            'I knew I should have made photocopies of everything.',
            'This is exactly why people say you should always have copies of your important documents.',
            "That's actually smart. I'm emailing myself copies of everything tonight. Not making that mistake again.",
        ],
        context: 'photocopies は「コピー」。pull it up は「表示させる」。just in case は「念のため」。paranoid は「心配性」。saved me は「助かった」。パスポートの写真をクラウドに保存するのは今や常識。separate bag は「別のカバン」に入れるのがポイント。',
        character: 'lisa', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 166, japanese: '忘れ物多いんだよね',
        english: [
            'I always lose things.',
            'I am the worst at keeping track of my stuff.',
            'I swear I would lose my own head if it was not attached to my body.',
            "We should honestly get you a GPS tracker for your stuff. I'm not even joking at this point.",
        ],
        context: 'lose my head if it was not attached は「頭がくっついてなかったら頭もなくす」という定番ジョーク。keeping track of は「管理する」。misplaces は「置き忘れる」(lose より軽い)。GPS tracker は「追跡装置」。talent は皮肉として使っている。自虐ネタは英語の潤滑油。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 167: 体調不良 (Feeling Sick Abroad)
    // Scene: タケシが旅先で食あたりになり薬局と病院を探す
    // ────────────────────────────────────────────────────

    {
        daySlot: 167, japanese: 'お腹が痛い',
        english: [
            'My stomach hurts.',
            'I have a really bad stomachache.',
            'Something I ate is not sitting well. My stomach has been killing me since this morning.',
            "You don't look great. Was it that street food from last night? I had a bad feeling about that place.",
        ],
        context: 'not sitting well は「胃に合わない」。rumbling は「ゴロゴロ鳴る」。sharp stabbing pain は「鋭い刺すような痛み」。comes in waves は「波のように来る」。sketchy は「怪しい」。street food は「屋台の食べ物」。海外での腹痛は食あたりが最多。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '薬局はどこですか',
        english: [
            'Where is the pharmacy?',
            'Is there a pharmacy nearby?',
            'Can you tell me where the nearest pharmacy is? I need some stomach medicine.',
            "There's one two streets down, on the left. They should have over-the-counter stomach medicine.",
        ],
        context: 'pharmacy は「薬局」。nearby は「近くに」。antacids は「胃薬」。food poisoning は「食中毒」。prescription は「処方箋」。over-the-counter は「市販の」(OTCとも)。pharmacist は「薬剤師」。海外では薬の名前が違うので説明が大変。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '熱がある気がする',
        english: [
            'I think I have a fever.',
            'I feel really hot. I think I might have a fever.',
            'I have been shivering even though it is warm out. I think I am running a fever.',
            "Let me feel your forehead. Yeah, you're burning up. Does anyone have a thermometer?",
        ],
        context: 'running a fever は「熱がある」。shivering は「震えている」。aches は「節々が痛い」。Celsius は「摂氏」で海外では Fahrenheit(華氏)を使う国もある。wrapped in a blanket は「毛布にくるまる」。thermometer は「体温計」。旅先の発熱は不安が倍増する。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '病院に行ったほうがいい？',
        english: [
            'Should I go to the hospital?',
            'Do you think I should see a doctor?',
            'If this does not get better by tonight, I think we need to find a hospital.',
            "If you can't keep water down, yeah, we need to find a doctor. Let's not wait until it gets worse.",
        ],
        context: 'see a doctor は「医者に診てもらう」(go to the doctor と同義)。keep anything down は「食べたものを吐かずにいられる」。pass on its own は「自然に治る」。symptoms は「症状」。海外での受診は言葉の壁が最大のハードル。explain your symptoms は旅行英語の最重要スキル。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '海外旅行保険に入ってる？',
        english: [
            'Do you have travel insurance?',
            'Please tell me you got travel insurance before the trip.',
            'Before we go to the hospital, let us check your travel insurance. Medical bills abroad can be insane.',
            "Yeah, I got it before the trip. Let me pull up the hotline number, they're available twenty-four hours.",
        ],
        context: 'travel insurance は「海外旅行保険」。medical bills は「医療費」。outrageous は「法外な」。set you back は「(金額が)かかる」。emergency room は「救急外来」。hotline は「24時間対応の電話」。アメリカの医療費は桁違いに高い。保険なしの海外受診は破産レベル。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '水だけは飲んで',
        english: [
            'At least drink some water.',
            'You need to stay hydrated even if you cannot eat.',
            'I know you do not feel like eating but you have to keep drinking water. Dehydration will make everything worse.',
            "I'll try. Just tiny sips, right? My stomach can't handle anything more than that right now.",
        ],
        context: 'stay hydrated は「水分を取り続ける」。dehydration は「脱水症状」。tiny sips は「ちょっとずつ飲む」。gulps は「がぶ飲み」。electrolytes は「電解質」。BRAT diet は腹痛時の定番食事法(Bananas, Rice, Applesauce, Toast)。医療英語は覚えておくと本当に助かる。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: 'アレルギーがあるんです',
        english: [
            'I have allergies.',
            'I need to let you know I have a food allergy.',
            'Before you give me anything, I am allergic to penicillin and shellfish.',
            "Got it, no penicillin and no shellfish. I'll make sure the pharmacist knows before they give you anything.",
        ],
        context: 'allergic to は「〜にアレルギーがある」。rash は「発疹」。throat swell up は「喉が腫れる」。EpiPen は「エピペン」(アナフィラキシー用の注射)。upfront は「最初に正直に」。on top of は「〜の上にさらに」。海外ではアレルギー申告が命に関わる。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '日本の薬持ってきた？',
        english: [
            'Did you bring any medicine from Japan?',
            'Does anyone have any Japanese medicine with them?',
            'I always bring a little pharmacy kit from Japan. Let me check if I have something that might help.',
            "Oh, you're a lifesaver. Please tell me you've got stomach medicine in there. I'll take anything at this point.",
        ],
        context: 'pharmacy kit は「救急セット」。motion sickness は「乗り物酔い」。overkill は「やりすぎ」。dosage は「用量」。effective は「効果的」。grateful は「ありがたい」。日本の市販薬は海外より穏やかだが効く。正露丸は海外に持っていく日本人の定番。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: '今日は部屋で休んだほうがいい',
        english: [
            'You should rest in the room today.',
            'Just stay in bed today. Do not push yourself.',
            'Forget the sightseeing. Your health comes first. Stay in the room and get some rest.',
            "Yeah, you're probably right. I'd just slow everyone down anyway. Take some pictures for me, OK?",
        ],
        context: 'push yourself は「無理をする」。your health comes first は「健康が最優先」。dragging yourself は「体を引きずる」。not going anywhere は「なくならない」。no pressure は「無理しなくていい」。旅先で休む決断は難しいが英語では health comes first が説得の定番。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 167, japanese: 'だいぶ良くなってきた',
        english: [
            'I am feeling a lot better.',
            'The medicine is working. I feel way better now.',
            'I finally feel human again. I think the worst is over.',
            "That's great to hear! You had us worried. Don't push it though, take it easy tonight.",
        ],
        context: 'feel human again は「人間に戻った感じ」。kicked in は「効き始めた」。keep them down は「吐かずにいられた」。weak and shaky は「弱々しくて震える」。owe you one は「借りができた」。the worst is over は「最悪の時期は過ぎた」。回復を伝える表現のバリエーション。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 168: 予約トラブル (Reservation Problems)
    // Scene: ホテルに着いたら予約が入っていなかった
    // ────────────────────────────────────────────────────

    {
        daySlot: 168, japanese: '予約が入っていないんですが',
        english: [
            'My reservation is not in the system.',
            'You do not have my reservation? That cannot be right.',
            'I booked this room three weeks ago and I have the confirmation email right here.',
            "Let me check the system again. Could you show me the confirmation number? There might've been a glitch.",
        ],
        context: 'not in the system は「システムに入っていない」。confirmation email は「確認メール」。billed は「請求された」。record of my booking は「予約の記録」。海外ホテルでの予約トラブルは想像以上に多い。confirmation number を見せるのが最強の武器。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: 'ダブルブッキングされてます',
        english: [
            'I think there was a double booking.',
            'It looks like you guys double-booked the room.',
            'So you are telling me you gave my room to someone else even though I booked it first?',
            "I'm so sorry about this. Let me see what I can do. We might be able to move you to a different room tonight.",
        ],
        context: 'double-booked は「ダブルブッキング」。let me get this straight は「整理させて」。in advance は「事前に」。paid in full は「全額支払い済み」。system error は「システムエラー」。what are you going to do about this は「どう対応してくれるの」。クレームの英語は覚えておくべき。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: '部屋のタイプが違います',
        english: [
            'This is not the room I booked.',
            'I booked a double but this is a single.',
            'There has been a mix-up. I specifically requested a double room with an ocean view.',
            "You're right, that's not what you booked. Let me check what's available and get you moved right away.",
        ],
        context: 'mix-up は「手違い」。specifically requested は「特にお願いした」。ocean view は「オーシャンビュー」。facing the parking lot は「駐車場に面している」。not even close は「全然違う」。move me to は「部屋を変えてくれ」。I should not have to ask は強めの主張。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: '上の人を呼んでください',
        english: [
            'I want to speak to the manager.',
            'Can I please talk to your manager about this?',
            'I am sorry but this is not getting resolved. Can I speak with someone in charge?',
            "Of course. Let me get the night manager. He'll be able to sort this out for you right away.",
        ],
        context: 'speak to the manager は「マネージャーを呼んで」で英語圏では有名なフレーズ(Karen の定番台詞)。someone in charge は「責任者」。authority は「権限」。not trying to be difficult は「面倒をかけたいわけではない」。resolved は「解決される」。穏やかだが firm な主張の仕方。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: 'アップグレードしてもらえませんか',
        english: [
            'Can I get an upgrade?',
            'Would it be possible to upgrade my room?',
            'Given the trouble tonight, would you consider upgrading us to a better room at no extra charge?',
            "I think we can do that. Let me check if there's a suite available for tonight. No extra charge, of course.",
        ],
        context: 'upgrade は「アップグレード」。at no extra charge は「追加料金なしで」。compensation は「補償」。inconvenience は「不便」。freebie は「タダのもの」。turn this into は「〜に変える」。トラブルをアップグレードのチャンスに変える交渉術は海外旅行の裏技。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: '返金してほしいんですけど',
        english: [
            'I would like a refund.',
            'I want a full refund for this.',
            'Given what happened, I think a refund is the least you can offer.',
            "Absolutely. I'll process the refund to your credit card right now and send you an email confirmation.",
        ],
        context: 'refund は「返金」。straightforward は「単純明快」。business days は「営業日」。in writing は「書面で」。approved は「承認された」。falling for は「騙される」。海外でのrefund要求は毅然とした態度が重要。I want it in writing は交渉の鉄則。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: 'クレジットカードの請求がおかしい',
        english: [
            'The charge on my card is wrong.',
            'I was overcharged. This is not the amount I agreed to.',
            'Can you explain this charge? It is way more than what was on the confirmation.',
            "That does look wrong. Let me pull up the itemized receipt and we'll figure out where the extra charge came from.",
        ],
        context: 'overcharged は「多く請求された」。quoted は「見積もりで言われた」。resort fee は「リゾート料」(アメリカのホテルで追加される謎の料金)。disclosed は「開示された」。itemized receipt は「明細付き領収書」。does not add up は「計算が合わない」。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: '他のホテルを探さないと',
        english: [
            'We need to find another hotel.',
            'If they cannot fix this, we have to find somewhere else to stay.',
            'Start searching for other hotels nearby. I have a feeling this is not going to get sorted out tonight.',
            "Already on it. There's a place with good reviews two blocks away. Should I book it before it fills up?",
        ],
        context: 'sorted out は「解決する」。plan B は「代替案」。pull up は「検索する」。filter by は「フィルターをかける」。backup plan は「予備の計画」。sketchy は「怪しい」。hostel は「ホステル」。旅先で急遽宿を探すストレスは想像以上。decent は「まともな」。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: 'レビューに書いてやる',
        english: [
            'I am leaving a bad review.',
            'Wait until TripAdvisor hears about this.',
            'I am going to write the most detailed one-star review this hotel has ever seen.',
            "Do it. Other travelers need to know. I'll back you up with my own review too.",
        ],
        context: 'review は「口コミレビュー」。out of spite は「意地悪でやるのではなく」。attitude は「態度」。lack of urgency は「緊急感のなさ」。live and die by は「〜次第で決まる」。think twice は「よく考える」。海外ではレビューが本当にホテルの評判を左右する。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 168, japanese: 'まあ結果的には良かったかも',
        english: [
            'It worked out in the end.',
            'Well, we ended up with a better room so I guess it all worked out.',
            'I hate to admit it but the suite they gave us is way nicer than what we originally booked.',
            "Right? This jacuzzi alone makes up for all that stress. I'm still leaving that review though.",
        ],
        context: 'worked out は「うまくいった」。ended up with は「結果的に〜になった」。the works は「全部」。making a fuss は「騒ぎ立てる」。bad luck turns into good luck は「禍を転じて福となす」の英語版。jacuzzi は「ジャグジー」。結果オーライは旅の醍醐味。',
        character: 'mina', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 169: 言葉の壁 (Language Barrier)
    // Scene: 英語が通じない国で四苦八苦するメンバーたち
    // ────────────────────────────────────────────────────

    {
        daySlot: 169, japanese: '英語が全然通じない',
        english: [
            'Nobody speaks English here.',
            'My English is completely useless in this country.',
            'I have been trying to communicate in English all day and nobody understands a word I say.',
            "Tell me about it. I tried ordering coffee this morning and ended up with soup. Pointing only gets you so far.",
        ],
        context: 'universal language は「世界共通語」。not a single person は「一人も」。tourist information center は「観光案内所」。pointing and nodding は「指差しとうなずき」。caveman は「穴居人」(原始人のイメージ)。英語が通じない国の衝撃は英語を勉強している人ほど大きい。',
        character: 'takeshi', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: 'ジェスチャーで何とかなる',
        english: [
            'Just use gestures.',
            'Body language works when words do not.',
            'You would be surprised how much you can communicate with just your hands and facial expressions.',
            "True, but last time I did the 'eating' gesture, the waiter thought I was choking. You gotta commit to it though.",
        ],
        context: 'gestures は「ジェスチャー」。body language は「ボディランゲージ」。commit to は「思い切ってやる」。figure out は「理解する」。embarrassed は「恥ずかしい」。日本人はジェスチャーが控えめだが海外では大きく動くほど伝わる。motions は「動作」。',
        character: 'master', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '翻訳アプリ使おう',
        english: [
            'Let us use a translation app.',
            'Here, let me pull up Google Translate.',
            'Hold on, I have a translation app. Let me type it in and show them the screen.',
            "Good call. Just don't trust it a hundred percent. Last time mine translated 'chicken' as some kind of insult.",
        ],
        context: 'translation app は「翻訳アプリ」。back in the day は「昔は」。phrase book は「会話帳」。boom は「ドン！」(効果音)。instant は「即座の」。insult は「侮辱」。horrified は「ゾッとした」。get by は「何とかやっていく」。翻訳アプリの誤訳エピソードは旅あるある。',
        character: 'yuki', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '簡単な現地語だけでも覚えよう',
        english: [
            'Let us learn some basic phrases.',
            'We should at least learn hello, thank you, and sorry in the local language.',
            'Even just knowing five or six basic phrases makes a huge difference when you travel.',
            "You're right. I said 'thank you' in the local language yesterday and the lady's face totally lit up. It really works.",
        ],
        context: 'basic phrases は「基本フレーズ」。making an effort は「努力している」。lights up は「パッと明るくなる」。magic password は「魔法の合言葉」。appreciate は「感謝する」。pronunciation は「発音」。現地語を5個だけ覚える戦略は実用的で効果絶大。',
        character: 'kenji', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '伝わった！',
        english: [
            'They understood me!',
            'Oh my god, they actually got what I was saying!',
            'I cannot believe it. I just ordered food in a foreign language and they brought me exactly what I wanted.',
            "Nice! See, that's what happens when you make the effort. People love it when you try their language.",
        ],
        context: 'got what I was saying は「言いたいことが伝わった」。on cloud nine は「最高に幸せ」。making an effort は「努力する」。free dessert は「無料のデザート」。old friends は「昔からの友達」。言葉が通じた瞬間の喜びは語学学習最大のご褒美。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '発音が難しすぎる',
        english: [
            'The pronunciation is so hard.',
            'I cannot make these sounds no matter how many times I try.',
            'I have been trying to say this word for ten minutes and every time I say it people just stare at me blankly.',
            "Ha, I know. I've been trying to roll my R's for an hour and people just stare at me like I'm choking.",
        ],
        context: 'rolling R は「巻き舌のR」。tones は「声調」(中国語の四声)。pathetic は「情けない」。flapping noise は「パタパタという音」。proudest moment は「誇らしい瞬間」(反語)。mother/horse は中国語の ma の声調違いの有名な例。言語の音の壁は万国共通の苦悩。',
        character: 'takeshi', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '筆談でいこう',
        english: [
            'Let us write it down.',
            'Maybe we can communicate by writing.',
            'Words are not working so let me try writing it down. Some people can read better than they can speak.',
            "That's smart. A lot of people can read English even if they can't speak it. Let me type it out real big.",
        ],
        context: 'writing it down は「書いて伝える」。筆談は日本語の「筆談」がそのまま有効な場面がある。Chinese characters は「漢字」。advantage は「有利な点」。pronunciation は「発音」。simple English は「簡単な英語」。漢字筆談は中国や台湾で実際に使える裏技。',
        character: 'lisa', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '英語勉強しておけばよかった',
        english: [
            'I should have studied more English.',
            'I really wish I had studied harder in English class.',
            'Times like this make me realize how important it is to actually speak another language.',
            "Same. Fifteen years of English class and I can't even order food properly. I'm signing up for conversation classes when we get home.",
        ],
        context: 'should have studied は後悔の定番。hold a conversation は「会話を成立させる」。memorizing vocabulary lists は「単語帳の暗記」。the stuff that actually matters は「本当に大事なこと」。for real this time は「今度こそ本気で」。日本の英語教育への不満は多くの旅行者が共感する話。',
        character: 'takeshi', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '何て言えばいいかわからない',
        english: [
            'I do not know how to say it.',
            'How do you say this in English? I have no idea.',
            'I know what I want to say in Japanese but I just cannot find the right words in English.',
            "Just take your time. Use simple words and point if you have to. Nobody's judging you, I promise.",
        ],
        context: 'how to say it は「何と言えばいいか」。find the right words は「適切な言葉を見つける」。fluent は「流暢な」。mouth open like a fish は「魚みたいに口を開けて」。brain goes blank は「頭が真っ白になる」。stage fright は「舞台恐怖症」。言いたいことが出てこない苦しみは語学あるある。',
        character: 'yuki', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 169, japanese: '笑顔が一番の言語だよ',
        english: [
            'A smile speaks every language.',
            'When in doubt, just smile. It works everywhere.',
            'You do not need perfect language skills. A genuine smile and a kind attitude will get you pretty far.',
            "That's so true. The nicest lady helped me today just because I smiled at her. Didn't understand a word I said, but she walked me all the way there.",
        ],
        context: 'speaks every language は「どの言語でも通じる」。genuine は「心からの」。attitude は「態度」。vibe は「雰囲気」。open body language は「開放的なボディランゲージ」。treated like family は「家族のように扱われる」。kindness has no language barrier は権藤マスターらしい哲学的な一言。',
        character: 'master', category: 'feeling', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 170: 緊急事態 (Emergencies)
    // Scene: リサの財布がひったくられ、警察に届ける
    // ────────────────────────────────────────────────────

    {
        daySlot: 170, japanese: '財布をひったくられた',
        english: [
            'My wallet was snatched.',
            'Someone just grabbed my wallet and ran.',
            'I was walking down the street and this guy on a motorcycle snatched my bag right off my shoulder.',
            "Oh no, are you OK? Let me see your arm. We need to call the police right now.",
        ],
        context: 'snatched は「ひったくられた」。minding my own business は「何もしてないのに」。ripped off は「引きちぎった」。yank は「ぐいっと引っ張る」。bruised は「あざになった」。strap は「ストラップ」。ひったくりは海外の都市で多い犯罪。shoulder bag は特に狙われやすい。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: '警察を呼んでください',
        english: [
            'Please call the police.',
            'Can someone call the police? I just got robbed.',
            'I need the police right now. My bag was just stolen and I can describe the guy who took it.',
            "I'm calling them now. Try to remember what the guy looked like. They'll want a description.",
        ],
        context: 'call the police は「警察を呼んで」。robbed は「強盗にあった」。CCTV は「監視カメラ」(Closed Circuit Television)。crossbody は「斜めがけバッグ」。slim は「可能性が低い」。file a report は「届け出を出す」。犯人の特徴を英語で伝える練習は海外旅行前にしておくべき。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: 'カードを止めないと',
        english: [
            'I need to cancel my cards.',
            'Quick, I have to call the bank and freeze my credit cards.',
            'The first thing we need to do is cancel all your cards before they start using them.',
            "Here, use my phone. The number should be in your email somewhere. Hurry, before they try to use them.",
        ],
        context: 'freeze は「凍結する」。drain your accounts は「口座を空にされる」。statements は「明細書」。debit card は「デビットカード」。move fast は「急いで動く」。stolen は「盗まれた」。カード不正利用は時間との勝負。freeze は stop より緊急感がある。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: '大使館に連絡しないと',
        english: [
            'I need to contact the embassy.',
            'We should call the Japanese embassy.',
            'If your passport was in the bag, you need to go to the embassy and get emergency documents.',
            "I've got the embassy's emergency number saved. They're open twenty-four hours. Let's call them as soon as we file the police report.",
        ],
        context: 'embassy は「大使館」。emergency line は「緊急電話」。temporary travel document は「緊急渡航書」。police report は「被害届」。cover は「(保険が)カバーする」。feels like the end of the world は「世界の終わりみたい」。stolen items は「盗まれた物」。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: '怪我はない？',
        english: [
            'Are you hurt?',
            'Are you OK? Did he hurt you?',
            'Forget the bag for a second. Are you physically OK? Let me see your arm.',
            "I'm OK, just shaking. My arm's bruised from the strap but I can move it fine. Nothing's broken.",
        ],
        context: 'are you hurt は「怪我してない？」。physically OK は「体は大丈夫？」。bruise は「あざ」。dislocated は「脱臼した」。adrenaline は「アドレナリン」。hits you は「(痛みが)襲ってくる」。get it checked out は「診てもらう」。物より人を心配する英語は覚えておきたい。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: '被害届を出したい',
        english: [
            'I want to file a police report.',
            'I need to report a theft.',
            'I was robbed about thirty minutes ago and I need to file an official report.',
            "I understand. We'll take your statement now. Can you describe the suspect and list everything that was in the bag?",
        ],
        context: 'file a police report は「被害届を出す」。report a theft は「窃盗を届け出る」。medium build は「中肉中背」。headed south は「南に向かった」。insurance claim は「保険請求」。犯人の特徴を英語で伝える定型: age, build, clothing, direction。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: '助けてください！',
        english: [
            'Help!',
            'Somebody help me please!',
            'Help! I need help! Is anyone here? Please, it is an emergency!',
            "Hey, it's OK, I speak English. I'll call the police for you. Just sit down and breathe.",
        ],
        context: 'Help は最も基本的な緊急フレーズ。attacked は「襲われた」。ambulance は「救急車」。I have nothing は「何も持っていない」。パニック時でも Help と Police は世界中で通じる。Does anyone speak English は旅先での最後の頼み綱。緊急時は完璧な英語より声の大きさが重要。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: 'もう大丈夫、落ち着いて',
        english: [
            'It is OK now. Calm down.',
            'You are safe now. Just breathe.',
            'The worst part is over. You are with us and nobody is going to hurt you. Just breathe.',
            "You're right. I'm OK. That's what matters. Everything else can be replaced. Just give me a minute to breathe.",
        ],
        context: 'you are safe は「安全だよ」。violated は「侵害された」。replaceable は「取り替えられる」。reissued は「再発行される」。one step at a time は「一つずつ」。deep breath は「深呼吸」。パニックになっている人を落ち着かせる英語は実用性が高い。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: '保険会社に電話しよう',
        english: [
            'Let us call the insurance company.',
            'You should call your travel insurance right away.',
            'I have the insurance hotline number saved. Let me call them and explain what happened.',
            "Thanks, Kenji. Can you handle the call for me? I'm still too shaky to talk to anyone right now.",
        ],
        context: 'travel insurance は「旅行保険」。covered は「補償される」。hotline は「24時間対応窓口」。window は「期限」。incidents は「事故・事件」。Japanese-speaking operator は「日本語対応のオペレーター」。handle は「対応する」。保険は旅行のセーフティネット。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 170, japanese: 'この経験で学んだことがある',
        english: [
            'I learned something from this.',
            'Well, I definitely learned a hard lesson today.',
            'I never want this to happen again so from now on I am taking every precaution possible.',
            "That's the right attitude. You handled it really well, honestly. We've all got your back for the rest of the trip.",
        ],
        context: 'hard lesson は「痛い教訓」。precaution は「予防策」。careless は「不注意な」。surroundings は「周囲の状況」。street side は「車道側」(バッグは建物側に持つのが防犯の基本)。every mistake in the book は「ありとあらゆるミス」。money belt は「腹巻き型財布」。',
        character: 'lisa', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 171: 助けを求める (Asking for Help)
    // Scene: トラブル続きの旅で、現地の人の親切に救われる
    // ────────────────────────────────────────────────────

    {
        daySlot: 171, japanese: 'すみません、助けてもらえますか',
        english: [
            'Excuse me, can you help me?',
            'I am really sorry but I need your help.',
            'I am so sorry to bother you but I am in a bit of a situation and I could really use some help.',
            "Of course, no worries. What do you need? I can look something up on my phone if that helps.",
        ],
        context: 'I could really use some help は「本当に助けが必要」。in a bit of a situation は「ちょっと困った状況」。sounds like a scam は「詐欺みたいに聞こえる」。save my life は「命が助かる」(大げさだが真剣さを伝える)。borrow は「借りる」。海外で見知らぬ人に助けを求める勇気が必要な場面。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: '道を教えていただけますか',
        english: [
            'Could you give me directions?',
            'Would you mind giving me directions to the station?',
            'I am completely lost and my phone is dead. Could you possibly tell me how to get to Central Station?',
            "Central Station? Yeah, it's about a ten-minute walk. I'm headed that way, I'll walk you there.",
        ],
        context: 'give me directions は「道を教えて」。walking distance は「歩ける距離」。approached は「声をかけた」。walked away は「立ち去った」。phone battery died は「スマホの電池が切れた」。英語で道を聞くとき、感謝と申し訳なさを同時に伝えるのが重要。10人に1人しか止まってくれないのは海外あるある。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: '電話を貸してもらえますか',
        english: [
            'Can I borrow your phone?',
            'I am really sorry but could I use your phone for one minute?',
            'My phone is dead and I need to call my hotel. Would you mind if I made a quick call on yours?',
            "Sure, go ahead. Just make it quick. The hotel number should be on your booking confirmation if you have it in email.",
        ],
        context: 'huge ask は「大きなお願い」。desperately は「必死に」。running off with it は「持ち逃げする」。running out of options は「選択肢がなくなってきた」。get dark は「暗くなる」。海外で他人にスマホを貸してと頼むのは信頼関係ゼロの状態でのハイレベルなお願い。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: '日本語が話せる人はいますか',
        english: [
            'Does anyone speak Japanese?',
            'Is there anyone here who speaks Japanese?',
            'This might be a long shot, but is there anyone around who speaks Japanese?',
            "Actually, my roommate studied Japanese in college. Let me call her, she might be able to help translate.",
        ],
        context: 'long shot は「可能性は低いけど」。making a mess of it は「めちゃくちゃにしている」。anime/manga は世界中で日本語を学ぶきっかけ。picky は「選り好みする」。desperate は「必死な」。日本語話者を探すのは意外と成功率が高い(特にアニメファンが多い国)。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: 'ここに連れて行ってもらえますか',
        english: [
            'Can you take me here?',
            'Would you mind walking me to this address?',
            'I have the address written down. Could you help me get there? I keep getting lost.',
            "Oh, I know this place! It's actually right around the corner. Come on, I'll walk you there. Follow me.",
        ],
        context: 'take me here は「ここに連れて行って」。walk me to は「一緒に歩いて案内して」。ending up は「結局〜にたどり着く」。mixing up は「混同する」。heading that direction は「そっち方面に行く」。creep は「不審者」。海外で知らない人に一緒に歩いてと頼むのは勇気がいる。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: '本当にありがとうございます',
        english: [
            'Thank you so much.',
            'I cannot thank you enough. You really saved me.',
            'You have no idea how much this means to me. I was so lost and you saved my entire day.',
            "Don't worry about it, really. I've been lost in a foreign country too. Just pay it forward next time you see someone who needs help.",
        ],
        context: 'cannot thank you enough は「感謝しきれない」。restores my faith in humanity は「人類への信頼が回復した」。return the favor は「恩返しする」。look me up は「連絡して」。turned it around は「状況を好転させた」。海外で助けてもらった感動は日常の「ありがとう」とは重みが違う。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: 'お礼がしたいです',
        english: [
            'I want to thank you properly.',
            'Please let me buy you a coffee or something.',
            'You really went out of your way for me. At least let me buy you lunch as a thank you.',
            "Honestly, just seeing you smile is enough. But if you insist, I'll take some Japanese snacks when you get home. Deal?",
        ],
        context: 'went out of your way は「わざわざしてくれた」。take kindness for granted は「親切を当たり前だと思う」。let me buy you は「おごらせて」。proper thank you は「ちゃんとしたお礼」。英語圏では好意に対してお返しを申し出るのがマナー。物よりも言葉での感謝が重視される文化。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: '人の親切が身にしみる',
        english: [
            'Kindness really means a lot.',
            'People can be so kind. It really touches your heart.',
            'Traveling reminds you that most people in the world are genuinely good and want to help.',
            "You know what I love about traveling? It reminds you that people are fundamentally good. We watch the news and think the world is a terrible place. But then you go somewhere new, completely helpless, and total strangers go out of their way to help you. That guy who walked us to the hotel? He was on his way to work. He was going to be late because of us. But he did it anyway. No questions asked. That is the real world. Not the news. People helping people. That is what I want to remember from this trip.",
        ],
        context: 'kindness means a lot は「親切が身にしみる」。fundamentally good は「根本的に善い」。total strangers は「見ず知らずの人」。no questions asked は「何も聞かずに」。the real world は「本当の世界」。旅先での他人の親切は一生の思い出になる。それが旅の真の価値。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: 'トラブルがあったから思い出になった',
        english: [
            'The trouble made it memorable.',
            'Honestly, the problems made this trip unforgettable.',
            'Years from now we are not going to remember the sightseeing. We are going to remember the disasters.',
            "Here is the truth about travel. The smooth, perfect trips? You forget them in a month. But the ones where everything goes wrong? Those become the stories you tell for the rest of your life. Lost passport, food poisoning, bag snatched, getting hopelessly lost in a city where nobody speaks your language. That is the stuff that bonds people. That is the stuff that makes you grow. Ten years from now, we are going to sit in this izakaya and laugh our heads off about this trip. And that is worth more than any postcard.",
        ],
        context: 'memorable は「記憶に残る」。unforgettable は「忘れられない」。disasters は「大惨事」。bonds people は「人を結びつける」。laugh our heads off は「死ぬほど笑う」。postcard は「絵葉書」(完璧な旅行の象徴)。トラブルこそ最高の土産話になるのは旅の真理。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 171, japanese: '次はもっと上手くやれる',
        english: [
            'I will do better next time.',
            'Next trip, I will be way more prepared.',
            'After everything that happened, I feel like I leveled up as a traveler.',
            "OK so here is my official post-trip resolution. Number one, always keep my passport in the hotel safe. Number two, download offline maps before leaving the hotel every morning. Number three, carry a photocopy of every important document. Number four, split cash between at least two different bags. Number five, learn at least ten phrases in the local language. Number six, buy travel insurance. Actually, number six should be number one. But you get the idea. I am going to be a completely different traveler next time. Watch me.",
        ],
        context: 'leveled up は「レベルアップした」(ゲーム用語が日常化)。post-trip resolution は「旅行後の決意」。split cash は「現金を分散する」。you get the idea は「言いたいことはわかるでしょ」。watch me は「見てなよ」。失敗から学んだ具体的な改善リストは英語的な表現。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
];

// ============================================================
// DAY THEMES & KEYWORDS -- MONTH 6 WEEK 23
// ============================================================

export const MONTH6_W23_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    165: {
        title: '道に迷う', titleEn: 'Getting Lost', category: 'travel',
        scene: 'タケシが現地で道に迷い、スマホの電池も切れかけて全員で右往左往する',
        keywords: [
            { en: 'lost', ja: '迷子', pron: 'ロスト', example: 'We are completely lost.', note: 'get lost=道に迷う。I am lost はシンプルだが海外で一番使う英語かもしれない。' },
            { en: 'directions', ja: '道順', pron: 'ディレクションズ', example: 'Could you give me directions?', note: '複数形で使う。ask for directions=道を聞く。direction(単数)は「方向」。' },
            { en: 'landmark', ja: '目印', pron: 'ランドマーク', example: 'Do you see any landmarks?', note: '道案内のキーワード。「あの教会の角を曲がって」のように使う。GPS時代でも重要。' },
            { en: 'shortcut', ja: '近道', pron: 'ショートカット', example: 'I know a shortcut through the park.', note: '「近道しよう」=Let us take a shortcut。逆に detour は「回り道」。' },
            { en: 'GPS', ja: 'カーナビ・位置情報', pron: 'ジーピーエス', example: 'My GPS says we are in the ocean.', note: '会話では「ジーピーエス」と言う。GPS signal=GPS信号。recalculating=再計算中(カーナビの声)。' },
        ],
    },
    166: {
        title: '物をなくす', titleEn: 'Losing Things', category: 'feeling',
        scene: 'ミナがパスポートを見当たらなくなり全員パニック、結局内ポケットにあった',
        keywords: [
            { en: 'passport', ja: 'パスポート', pron: 'パスポート', example: 'I cannot find my passport.', note: '海外での最重要書類。lose your passport=パスポートをなくす。expired=期限切れ。' },
            { en: 'valuables', ja: '貴重品', pron: 'バリュアブルズ', example: 'Keep your valuables in the hotel safe.', note: '複数形で使う。personal belongings=私物。precious=大切な。' },
            { en: 'pickpocket', ja: 'スリ', pron: 'ピックポケット', example: 'Watch out for pickpockets in crowded areas.', note: '動詞にもなる。I was pickpocketed=スリにあった。スリの多い観光地では定番の注意喚起。' },
            { en: 'retrace', ja: '来た道を戻る', pron: 'リトレイス', example: 'Let us retrace our steps.', note: 'retrace your steps=来た道を振り返る。物をなくしたときの定番アクション。' },
            { en: 'false alarm', ja: '勘違い', pron: 'フォールスアラーム', example: 'It was a false alarm. I found it in my pocket.', note: '「大騒ぎしたけど何でもなかった」。fire alarm でも使う。scare はもう少しカジュアル。' },
        ],
    },
    167: {
        title: '体調不良', titleEn: 'Feeling Sick Abroad', category: 'request',
        scene: 'タケシが食あたりになり薬局と病院を探す',
        keywords: [
            { en: 'pharmacy', ja: '薬局', pron: 'ファーマシー', example: 'Is there a pharmacy nearby?', note: 'drugstore とも言う。pharmacist=薬剤師。prescription=処方箋。over-the-counter=市販の。' },
            { en: 'symptom', ja: '症状', pron: 'シンプトム', example: 'Can you describe your symptoms?', note: '複数形 symptoms が普通。「症状を説明する」は describe/explain your symptoms。病院で必須の単語。' },
            { en: 'food poisoning', ja: '食中毒', pron: 'フードポイズニング', example: 'I think I have food poisoning.', note: 'stomach bug=胃腸風邪も似た症状。upset stomach=胃の不調。海外の屋台は要注意。' },
            { en: 'dehydration', ja: '脱水症状', pron: 'ディハイドレーション', example: 'Stay hydrated to avoid dehydration.', note: 'hydrate=水分補給する。stay hydrated は医者の定番アドバイス。electrolytes=電解質。' },
            { en: 'allergy', ja: 'アレルギー', pron: 'アラジー', example: 'I am allergic to shellfish.', note: '発音注意:「アラジー」であって「アレルギー」ではない。allergic reaction=アレルギー反応。命に関わるので確実に伝えること。' },
        ],
    },
    168: {
        title: '予約トラブル', titleEn: 'Reservation Problems', category: 'request',
        scene: 'ホテルに着いたら予約が入っておらず、ダブルブッキングが発覚する',
        keywords: [
            { en: 'confirmation', ja: '確認書', pron: 'コンファメーション', example: 'I have the confirmation email right here.', note: 'confirmation number=予約番号。confirm=確認する。海外ホテルでは確認メールのスクショが最強の証拠。' },
            { en: 'double booking', ja: 'ダブルブッキング', pron: 'ダブルブッキング', example: 'It looks like there was a double booking.', note: '同じ部屋に二重予約が入ること。overbooked=定員以上の予約を入れた(航空会社でよくある)。' },
            { en: 'refund', ja: '返金', pron: 'リファンド', example: 'I would like a full refund please.', note: 'full refund=全額返金。partial refund=一部返金。process a refund=返金処理をする。non-refundable=返金不可。' },
            { en: 'upgrade', ja: 'アップグレード', pron: 'アップグレード', example: 'Would you consider upgrading our room?', note: 'complimentary upgrade=無料アップグレード。トラブルの補償として交渉する価値あり。downgrade は逆。' },
            { en: 'overcharged', ja: '過剰請求', pron: 'オーバーチャージド', example: 'I was overcharged by three hundred dollars.', note: 'charged=請求された。overcharged=多く請求された。itemized receipt=明細付き領収書で確認する。' },
        ],
    },
    169: {
        title: '言葉の壁', titleEn: 'Language Barrier', category: 'feeling',
        scene: '英語が通じない国で翻訳アプリとジェスチャーで四苦八苦する',
        keywords: [
            { en: 'language barrier', ja: '言葉の壁', pron: 'ランゲージバリア', example: 'The language barrier was the biggest challenge.', note: 'barrier=壁・障壁。overcome the language barrier=言葉の壁を乗り越える。communication breakdown=意思疎通の崩壊。' },
            { en: 'gesture', ja: 'ジェスチャー', pron: 'ジェスチャー', example: 'We communicated mostly through gestures.', note: '身振り手振り。body language=ボディランゲージ。hand signals=手信号。言葉が通じないときの最終兵器。' },
            { en: 'translate', ja: '翻訳する', pron: 'トランスレイト', example: 'Can you translate this for me?', note: 'translation=翻訳(名詞)。translator=翻訳者。translation app=翻訳アプリ。lost in translation=翻訳で意味が変わる。' },
            { en: 'pronunciation', ja: '発音', pron: 'プロナンシエーション', example: 'My pronunciation is terrible.', note: '「発音」の発音が難しいという皮肉。pronounce=発音する。mispronounce=発音を間違える。accent=アクセント・なまり。' },
            { en: 'fluent', ja: '流暢な', pron: 'フルーエント', example: 'I wish I were fluent in English.', note: 'fluently=流暢に。fluency=流暢さ。conversational=会話ができるレベル。native level=ネイティブレベル。' },
        ],
    },
    170: {
        title: '緊急事態', titleEn: 'Emergencies', category: 'request',
        scene: 'リサの財布がひったくられ警察に届け出て保険会社に連絡する',
        keywords: [
            { en: 'emergency', ja: '緊急事態', pron: 'イマージェンシー', example: 'This is an emergency. Please call the police.', note: 'emergency room=救急外来。emergency contact=緊急連絡先。911(米)、110/119(日)。海外の緊急番号は事前に調べておくべき。' },
            { en: 'theft', ja: '窃盗', pron: 'セフト', example: 'I need to report a theft.', note: 'thief=泥棒(複数形 thieves)。steal=盗む。stolen=盗まれた。identity theft=個人情報窃盗。' },
            { en: 'police report', ja: '被害届', pron: 'ポリスリポート', example: 'I need to file a police report.', note: 'file a report=届け出を出す。report number=届出番号。保険請求に必要な最重要書類。' },
            { en: 'insurance claim', ja: '保険請求', pron: 'インシュアランスクレイム', example: 'I need to file an insurance claim.', note: 'claim=請求。file a claim=請求を出す。coverage=補償範囲。premium=保険料。deductible=免責額。' },
            { en: 'embassy', ja: '大使館', pron: 'エンバシー', example: 'We need to contact the Japanese embassy.', note: 'consulate=領事館(大使館より小規模)。ambassador=大使。emergency travel document=緊急渡航書。海外トラブルの最後の砦。' },
        ],
    },
    171: {
        title: '助けを求める', titleEn: 'Asking for Help', category: 'request',
        scene: 'トラブル続きの旅で見知らぬ人の親切に救われ、旅の意味を考える',
        keywords: [
            { en: 'stranger', ja: '見知らぬ人', pron: 'ストレンジャー', example: 'A complete stranger helped me find my hotel.', note: 'complete stranger=全くの赤の他人。do not talk to strangers=知らない人と話すな(子供への注意)。旅先では stranger が救世主になる。' },
            { en: 'grateful', ja: '感謝している', pron: 'グレイトフル', example: 'I am so grateful for your help.', note: 'thankful とほぼ同義だが grateful のほうが深い感謝。gratitude=感謝の気持ち。ungrateful=恩知らず。' },
            { en: 'favor', ja: '頼みごと', pron: 'フェイバー', example: 'Can I ask you a huge favor?', note: 'do someone a favor=人の頼みを聞く。return the favor=恩返しする。Could you do me a favor?=お願いがあるのですが。' },
            { en: 'desperate', ja: '必死の', pron: 'デスパレット', example: 'I was desperate for help.', note: 'desperately=必死に。desperation=絶望。desperate times call for desperate measures=非常時には非常手段。切迫感を伝える単語。' },
            { en: 'memorable', ja: '思い出に残る', pron: 'メモラブル', example: 'The trouble made the trip more memorable.', note: 'unforgettable=忘れられない。forgettable=忘れやすい。memory=記憶。make memories=思い出を作る。' },
        ],
    },
};
