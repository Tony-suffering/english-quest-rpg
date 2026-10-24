/**
 * THE LIFELINE — 音響条件(聴解の仕様書)
 *
 * ■ なぜこれを先に決めるのか
 * この教材は「聴解が本丸」だと決めた。産出はネイティブでも分散が大きいが、聴解は全員が
 * 天井近くにいる。つまりネイティブであることの不変量は聞ける方である。
 * にもかかわらず、ここまでの実装は全部テキストだった。**言っていることと作っているものが
 * 一番ずれている場所がここ。**
 *
 * そして音源は、物語を書き終えてからでは作れない。20万語書いたあとに「音の条件が違うので
 * 全部録り直し」が最悪の事故なので、**章を量産する前に条件を確定させる。**
 *
 * ■ 綺麗な朗読音声は作らない
 * 綺麗な音声で鍛えられるのは「音の解読」だけである。ネイティブの聴解の大半は
 * 「塊を知っているから解読しなくていい」と「場面を知っているから次が予測できる」で
 * 動いているので、**崩れた音でこそ塊と場面が効く。** 崩す条件がここに定義してある。
 *
 * ■ 使い方
 *   ACOUSTICS                15種の条件
 *   acousticsOf('The Road Test')   その窓口の条件
 *   stationsWith('phone-line')     その条件を持つ窓口(録音の段取りをまとめる用)
 */

export type AcousticId =
    | 'quiet-room'
    | 'window-glass'
    | 'speaker-box'
    | 'phone-line'
    | 'hold-then-burst'
    | 'room-noise'
    | 'multi-talker'
    | 'pa-overlay'
    | 'outdoor-wind'
    | 'vehicle'
    | 'reverb-hall'
    | 'crowd-roar'
    | 'masked-face'
    | 'child-pitch'
    | 'machine-voice';

export interface Acoustic {
    id: AcousticId;
    ja: string;
    /** 信号に何が起きるか。収録・加工の指示になる */
    signal: string;
    /** なぜ聞き取れなくなるか */
    why: string;
    /** この条件が鍛える聴解の力 */
    trains: string;
}

export const ACOUSTICS: Acoustic[] = [
    {
        id: 'quiet-room', ja: '静かな室内',
        signal: '加工なし。基準となる素の音。',
        why: '難しくない。ここで聞けないものは、他のどの条件でも聞けない。',
        trains: '基準線。他の条件との差を測るための対照群。',
    },
    {
        id: 'window-glass', ja: '窓口のアクリル板越し',
        signal: '高域を落とし、わずかに反射を足す。相手の口が板とマイクの向こうにある。',
        why: '子音が消える。DMV・銀行・郵便局・薬局・入国審査は全部この条件で、しかも初対面で、しかも用語が固い。',
        trains: '定型で埋める力。窓口は言うことが決まっているので、音が半分でも通せる。',
    },
    {
        id: 'speaker-box', ja: 'スピーカー越し(ドライブスルー/インターホン)',
        signal: '帯域を300-3400Hzに潰し、軽い歪みと背後の車の音を足す。',
        why: '音質が電話以下。しかも急かされる。返答の猶予が3秒しかない。',
        trains: '選択肢が3つしかないことを利用して、聞かずに当てる力。',
    },
    {
        id: 'phone-line', ja: '電話',
        signal: '帯域を狭め、圧縮を強くかける。低域を落とす。',
        why: '口が見えない。表情も手も使えない。聞き返しの回数だけが頼りになる。',
        trains: '聞き返しの型。参照番号と担当者名を取る手順。',
    },
    {
        id: 'hold-then-burst', ja: '保留明けの早口',
        signal: '保留音を数十秒 → 無音 → いきなり通常より速い発話。',
        why: '待たされて集中が切れた直後に、最も情報密度の高い一文が来る。用件の再説明はしてくれない。',
        trains: '待機中に構えを保つ力。冒頭2語を落とさない練習。',
    },
    {
        id: 'room-noise', ja: '店内・室内のざわめき',
        signal: '3メートル先の他人の会話を同音量で重ねる。食器・BGM。',
        why: '英語話者は雑音の中で自分に向いた声だけを抜き出せる。第二言語ではこの分離が働かない。',
        trains: 'カクテルパーティー効果。母語では自動で働く分離を、英語で立ち上げる。',
    },
    {
        id: 'multi-talker', ja: '複数同時進行・話者交代が速い',
        signal: '3人以上。かぶせ、割り込み、笑いで文が途切れる。',
        why: '話者交代の合図が音の高さと速さでしか出ない。誰が今喋っているかを追うだけで容量を使い切る。',
        trains: '割り込みの型(Can I jump in here?)と、追いつけないときの復帰。バンターの入場試験。',
    },
    {
        id: 'pa-overlay', ja: '館内放送が被る',
        signal: '会話の途中に、残響のかかった放送を重ねる。声より大きく。',
        why: '病院・空港・裁判所・駅。放送の方が重要な情報を持っていることがあり、両方追う必要がある。',
        trains: '二重聴取。目の前の会話を保ちながら、自分の名前と便名だけを放送から拾う。',
    },
    {
        id: 'outdoor-wind', ja: '屋外・風',
        signal: '風の吹かれと環境音。距離があるので直接音が減る。',
        why: '相手が横を向く、歩きながら喋る、口が見えない。近所づきあいの英語はほぼ全部これ。',
        trains: '距離のある会話。聞こえなかったことを自然に言い直させる力。',
    },
    {
        id: 'vehicle', ja: '車内',
        signal: 'ロードノイズを敷く。話者は前を向いていて口が見えない。',
        why: '運転中は相手の顔を見られない。ロードトリップ・受け渡し・職務質問は全部この条件。',
        trains: '視覚情報ゼロでの会話。相槌だけで会話を維持する力。',
    },
    {
        id: 'reverb-hall', ja: '残響のある大空間',
        signal: '長めのリバーブ。教会・体育館・法廷・空き家。',
        why: '反射で子音が潰れ、語尾が次の語に混ざる。厳粛な場ほど聞き返しにくい。',
        trains: '語尾が消える環境での予測。式次第を知っていれば聞かずに動ける。',
    },
    {
        id: 'crowd-roar', ja: '歓声・大人数',
        signal: '群衆の音を大きく。相手は叫んでいる。',
        why: '叫ぶと発音が崩れる。試合・パーティー・行事。短い定型しか通らない。',
        trains: '短文で成立させる力。長い文を作ろうとした時点で負ける。',
    },
    {
        id: 'masked-face', ja: '口が見えない(マスク・背中越し)',
        signal: '高域を軽く落とす。視覚の補助をゼロにする。',
        why: '医療・歯科・美容院・ハロウィン。人は無意識に唇を読んでいるので、それを外すと体感の難易度が跳ね上がる。',
        trains: '読唇に頼らない聴解。この条件で聞けたら本物。',
    },
    {
        id: 'child-pitch', ja: '子どもの高い声・泣き声',
        signal: '基本周波数が高く、速度が不安定。泣きと被る。',
        why: '大人向けの音声教材に一切出てこない帯域。子育てのある人生では毎日聞くのに、教材上は存在しない。',
        trains: '未知の話者特性への適応。文法が壊れた発話から意図を取る力。',
    },
    {
        id: 'machine-voice', ja: '自動音声・機械音',
        signal: '合成音声、または録音の切り貼り。抑揚が不自然。',
        why: 'セルフレジ、自動応答、モニターのアラーム。人間の抑揚の手がかりが無い。',
        trains: '抑揚ゼロでの意味取り。定型を丸ごと持っているかどうかだけが効く。',
    },
];

const BY_ID = new Map(ACOUSTICS.map(a => [a.id, a]));
export function getAcoustic(id: AcousticId): Acoustic | undefined {
    return BY_ID.get(id);
}

/**
 * 窓口 → 音響条件。キーは Station の en。
 * 収録はここを見て条件ごとにまとめる(電話ものを一日で録る、など)。
 */
export const STATION_ACOUSTICS: Record<string, AcousticId[]> = {
    'The First Prenatal Visit': ['quiet-room', 'masked-face'],
    'The Delivery Room': ['multi-talker', 'masked-face', 'machine-voice'],
    'Before You Go Home': ['quiet-room', 'multi-talker'],
    'Shots': ['child-pitch', 'masked-face'],
    'The Paperwork Before the Name': ['window-glass'],
    'The 2 a.m. Nurse Line': ['phone-line', 'hold-then-burst'],
    'The Daycare Tour': ['child-pitch', 'room-noise'],
    'The Pickup Call': ['phone-line', 'room-noise'],
    'The Playground': ['outdoor-wind', 'child-pitch'],
    'The First Birthday': ['room-noise', 'child-pitch'],
    'First Day of Kindergarten': ['child-pitch', 'room-noise'],
    'The Bus Stop': ['outdoor-wind', 'child-pitch'],
    'The Library Card': ['quiet-room', 'window-glass'],
    'Sunday Service': ['reverb-hall'],
    'The Baptism': ['reverb-hall', 'child-pitch'],
    'The Dental Cleaning': ['masked-face', 'machine-voice'],
    'The Eye Exam': ['quiet-room', 'masked-face'],
    'The Pharmacy Counter': ['window-glass', 'room-noise'],
    'The Birthday Party Invite': ['quiet-room'],
    'The Sleepover': ['child-pitch', 'room-noise'],
    'The Monster Under the Bed': ['quiet-room', 'child-pitch'],
    'Trick-or-Treat': ['outdoor-wind', 'child-pitch', 'masked-face'],
    'Christmas': ['multi-talker', 'room-noise'],
    'The Fourth of July': ['outdoor-wind', 'crowd-roar'],
    'Little League': ['outdoor-wind', 'crowd-roar'],
    'Summer Camp': ['outdoor-wind', 'child-pitch'],
    'Getting a Dog': ['room-noise'],
    'The New Kid': ['room-noise', 'multi-talker'],
    'The Parent-Teacher Conference': ['quiet-room'],
    'The Bullying Meeting': ['quiet-room'],
    'Getting Braces': ['masked-face'],
    'Friday Night Lights': ['crowd-roar', 'outdoor-wind'],
    'The Movie Theater': ['room-noise', 'multi-talker'],
    'Ordering at the Counter': ['speaker-box', 'machine-voice', 'room-noise'],
    'Eating Out': ['room-noise', 'multi-talker'],
    'The First Application': ['room-noise'],
    'The Road Test': ['window-glass', 'vehicle'],
    'Buying a Used Car': ['outdoor-wind', 'vehicle'],
    'The Traffic Stop': ['vehicle', 'outdoor-wind'],
    'The Phone Plan': ['room-noise'],
    'The Haircut': ['room-noise', 'masked-face'],
    'Meeting the Parents': ['quiet-room', 'multi-talker'],
    'Prom': ['crowd-roar', 'multi-talker'],
    'Applications and FAFSA': ['quiet-room'],
    'Graduation': ['reverb-hall', 'crowd-roar', 'pa-overlay'],
    'Move-In Day': ['outdoor-wind', 'multi-talker'],
    'Office Hours': ['quiet-room'],
    'The College Party': ['crowd-roar', 'multi-talker'],
    'The Roommate Agreement': ['quiet-room'],
    'The Group Project': ['room-noise', 'multi-talker'],
    'The Worst First Date': ['room-noise'],
    'The Breakup': ['vehicle', 'quiet-room'],
    'The Gym Membership': ['room-noise', 'machine-voice'],
    'Making Friends as an Adult': ['room-noise'],
    'The Lease': ['quiet-room'],
    'Moving Day': ['outdoor-wind', 'multi-talker'],
    'Turning On the Lights': ['phone-line', 'hold-then-burst', 'machine-voice'],
    'Opening an Account': ['window-glass', 'quiet-room'],
    'The First Credit Card': ['phone-line', 'machine-voice'],
    'Tax Season': ['quiet-room'],
    'The Career Center': ['quiet-room'],
    'The Interview': ['quiet-room'],
    'First Week on the Job': ['room-noise', 'multi-talker'],
    'Speaking Up in a Meeting': ['multi-talker', 'phone-line'],
    'The Performance Review': ['quiet-room'],
    'Asking for a Raise': ['quiet-room'],
    'The Business Trip': ['pa-overlay', 'crowd-roar'],
    'Going to HR': ['quiet-room'],
    'The Annual Physical': ['quiet-room', 'masked-face'],
    'The Root Canal': ['masked-face', 'machine-voice'],
    'The First Session': ['quiet-room'],
    'The Emergency Room': ['pa-overlay', 'multi-talker', 'masked-face'],
    'The Bill': ['phone-line', 'hold-then-burst'],
    'Calling the Insurance Company': ['phone-line', 'hold-then-burst', 'machine-voice'],
    'The Airport Delay': ['pa-overlay', 'crowd-roar'],
    'Checking In': ['room-noise', 'window-glass'],
    'The Rental Counter': ['window-glass', 'room-noise'],
    'Passport Control': ['window-glass', 'reverb-hall'],
    'The Road Trip': ['vehicle', 'speaker-box'],
    'Customer Service': ['phone-line', 'room-noise'],
    'Cancelling the Subscription': ['phone-line', 'hold-then-burst'],
    'The Proposal': ['outdoor-wind', 'quiet-room'],
    'The Wedding': ['reverb-hall', 'crowd-roar', 'multi-talker'],
    'The Fight and the Fix': ['quiet-room'],
    'House Hunting': ['reverb-hall'],
    'The Mortgage': ['quiet-room', 'phone-line'],
    'The Home Inspection': ['reverb-hall', 'outdoor-wind'],
    'The HOA Welcome': ['outdoor-wind'],
    'Getting a Quote': ['outdoor-wind', 'room-noise'],
    'Making Them Come Back': ['outdoor-wind', 'phone-line'],
    'The Fence Dispute': ['outdoor-wind'],
    'The Power Outage': ['outdoor-wind', 'multi-talker'],
    'The Claim': ['phone-line', 'hold-then-burst'],
    'The Backyard BBQ': ['outdoor-wind', 'multi-talker', 'child-pitch'],
    'The Block Party': ['outdoor-wind', 'crowd-roar', 'multi-talker'],
    'Game Night': ['multi-talker', 'room-noise'],
    'The Team You Follow': ['room-noise', 'phone-line'],
    'The Baby Shower': ['multi-talker', 'room-noise'],
    'Jury Duty': ['reverb-hall', 'pa-overlay'],
    'The Polling Place': ['reverb-hall', 'room-noise'],
    'The Post Office': ['window-glass', 'room-noise'],
    'The Camping Trip': ['outdoor-wind', 'child-pitch'],
    'The Check Engine Light': ['vehicle', 'room-noise'],
    'The Accident': ['outdoor-wind', 'vehicle', 'multi-talker'],
    'Thanksgiving': ['multi-talker', 'room-noise', 'child-pitch'],
    'The PTA Meeting': ['reverb-hall', 'multi-talker'],
    'The IEP Meeting': ['quiet-room', 'multi-talker'],
    'The College Talk': ['quiet-room'],
    'The Layoff': ['quiet-room', 'phone-line'],
    'The Unemployment Office': ['window-glass', 'room-noise'],
    'Giving Notice': ['quiet-room'],
    'The Collections Call': ['phone-line', 'machine-voice'],
    'The Fraud Charge': ['phone-line', 'machine-voice', 'hold-then-burst'],
    'Small Claims Court': ['reverb-hall', 'pa-overlay'],
    'The Divorce Conversation': ['quiet-room'],
    'The Handoff': ['vehicle', 'outdoor-wind', 'child-pitch'],
    'The Care Conversation': ['room-noise', 'phone-line'],
    'Taking the Keys': ['vehicle', 'quiet-room'],
    'Before the Surgery': ['quiet-room', 'masked-face'],
    'Physical Therapy': ['room-noise', 'machine-voice'],
    'The Estate Appraisal': ['reverb-hall', 'multi-talker'],
    'The Cruise': ['crowd-roar', 'pa-overlay', 'multi-talker'],
    'The Bucket List': ['outdoor-wind', 'crowd-roar'],
    'The Naturalization Ceremony': ['reverb-hall', 'pa-overlay'],
    'The Reunion': ['outdoor-wind', 'quiet-room'],
    'Saying Goodbye to the Dog': ['quiet-room'],
    'The Retirement Party': ['room-noise', 'multi-talker'],
    'Choosing Medicare': ['quiet-room', 'phone-line'],
    'Drawing on the Pension': ['quiet-room', 'window-glass'],
    'Selling the House': ['reverb-hall'],
    'The Tour': ['room-noise', 'pa-overlay'],
    'Pre-Planning': ['quiet-room'],
    'The Last Room': ['quiet-room', 'machine-voice'],
    'The Wake': ['reverb-hall', 'multi-talker'],
    'The Funeral': ['reverb-hall', 'multi-talker'],
    'The Reading of the Will': ['quiet-room'],
    "The Losers' Table": ['room-noise', 'multi-talker'],
    'Getting Slagged Off': ['room-noise', 'multi-talker', 'crowd-roar'],
    'Joining the Circle': ['crowd-roar', 'multi-talker'],
    'The Long Table': ['room-noise', 'multi-talker'],
    'The Callback': ['room-noise', 'multi-talker'],
};

export function acousticsOf(stationEn: string): Acoustic[] {
    return (STATION_ACOUSTICS[stationEn] ?? ['quiet-room'])
        .map(id => BY_ID.get(id))
        .filter((a): a is Acoustic => !!a);
}

/** その条件を持つ窓口。収録の段取り(電話ものをまとめて録る等)に使う */
export function stationsWith(id: AcousticId): string[] {
    return Object.entries(STATION_ACOUSTICS)
        .filter(([, ids]) => ids.includes(id))
        .map(([en]) => en);
}

export interface AcousticCoverage {
    id: AcousticId;
    ja: string;
    stations: number;
}

/** どの条件が何窓口を占めるか。収録量の見積もりに使う */
export function acousticCoverage(): AcousticCoverage[] {
    return ACOUSTICS
        .map(a => ({ id: a.id, ja: a.ja, stations: stationsWith(a.id).length }))
        .sort((x, y) => y.stations - x.stations);
}
