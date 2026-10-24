/**
 * Seasonal greeting cards pinned to the corkboard behind the counter.
 * Former regulars send brief handwritten notes from wherever life took them.
 * Gondo never removes a card; the apprentice notices them one by one over time.
 * Each entry pairs the sender's short message with the apprentice's quiet inference.
 * Visibility is gated by total nights worked, revealing the bar's long memory gradually.
 */

export interface SeasonalGreetingCard {
    id: string;
    senderDescriptor: string;
    sentFrom: string;
    season: 'new-year' | 'spring' | 'summer' | 'autumn' | 'winter';
    message: string;
    apprenticesInference: string;
    unlockAfterNights: number;
}

export const SEASONAL_GREETINGS: SeasonalGreetingCard[] = [
    {
        id: 'card-hokkaido-daughter',
        senderDescriptor: '実家の介護のため北海道へ戻った元常連の女性',
        sentFrom: '北海道旭川市',
        season: 'new-year',
        message:
            '権藤さん、あけましておめでとうございます。\n旭川は雪が腰まで積もっています。\nあの煮込みの匂いだけは、どうしても忘れられません。\n母は少し良くなりました。',
        apprenticesInference:
            '母親の介護を引き受けて東京を離れた人。煮込みを食べていた夜の顔が、ふと思い浮かぶ。',
        unlockAfterNights: 15,
    },
    {
        id: 'card-shikoku-couple',
        senderDescriptor: '定年を機に四国へ移り住んだ元常連の夫婦',
        sentFrom: '香川県高松市',
        season: 'summer',
        message:
            '権藤さん、ご無沙汰しております。\n高松はうどんばかりで、家内も少々飽きてきました。\nあの夏の冷やしトマト、また食べたいと夫婦で話しております。',
        apprenticesInference:
            '二人でいつも端の席に並んで座っていた夫婦だろう。互いを気遣う文面に、長い年月が滲んでいる。',
        unlockAfterNights: 30,
    },
    {
        id: 'card-wakayama-singer',
        senderDescriptor: '歌手をやめて和歌山へ引いた元常連の女性',
        sentFrom: '和歌山県田辺市',
        season: 'autumn',
        message:
            '権藤さま、秋の風が少し冷たくなってまいりました。\n海の見える小さな家で、みかんの世話をしております。\n舞台の夜よりも、あのカウンターが恋しい日がございます。',
        apprenticesInference:
            '夜の仕事を長く続けてきた人の筆跡。ステージを降りても、あの席だけは特別だったのだと分かる。',
        unlockAfterNights: 50,
    },
    {
        id: 'card-yamaguchi-widow',
        senderDescriptor: '夫を見送り山口で孫と暮らす元常連の女性',
        sentFrom: '山口県萩市',
        season: 'new-year',
        message:
            '権藤さん、新年のご挨拶を申し上げます。\n萩の海は今朝も静かでした。\n孫たちが騒がしくて、ようやく賑やかさに慣れました。\n主人もきっと、あのお酒を覚えております。',
        apprenticesInference:
            '夫婦で通っていた方の片割れだ。文末の一行に、まだ消えていない席の記憶が残っている。',
        unlockAfterNights: 80,
    },
    {
        id: 'card-fukuoka-businessman',
        senderDescriptor: '転勤で福岡へ移った元常連の実業家',
        sentFrom: '福岡県福岡市',
        season: 'summer',
        message:
            '権藤、暑中見舞い申し上げる。\n博多の夏は想像以上に蒸す。\nこちらの屋台も悪くないが、あの一杯目のビールには敵わん。\n仕事は相変わらずだ。',
        apprenticesInference:
            '権藤さんを呼び捨てにできる間柄。厳しい顔で座っていた人が、素直な本音を短く残している。',
        unlockAfterNights: 120,
    },
    {
        id: 'card-niigata-teacher',
        senderDescriptor: '故郷の小学校へ戻った元常連の男性教師',
        sentFrom: '新潟県上越市',
        season: 'winter',
        message:
            '権藤先生、ご無沙汰しております。\n上越は今日も雪で、校舎まで長靴で通っております。\n子どもらに、あの夜の話だけは一度もしておりません。\n寒さ厳しき折、どうぞご自愛ください。',
        apprenticesInference:
            '何か重たいものを抱えて座っていた人だ。それを胸にしまったまま、今は子どもたちの前に立っている。',
        unlockAfterNights: 180,
    },
    {
        id: 'card-okinawa-chef',
        senderDescriptor: '南の島で小さな食堂を開いた元常連の料理人',
        sentFrom: '沖縄県石垣市',
        season: 'spring',
        message:
            '権藤さん、春ですね。\n石垣ではもう海に入れる陽気です。\n小さな食堂を構えました。客は地元の漁師ばかりです。\nあの出汁の引き方、今も真似させてもらっています。',
        apprenticesInference:
            '厨房の話を静かに聞いていた人。師と呼ぶほどではない距離感で、それでも確かに何かを受け取っていた。',
        unlockAfterNights: 260,
    },
    {
        id: 'card-kyoto-widower',
        senderDescriptor: '妻を亡くし京都の寺町で独り暮らす元常連の男性',
        sentFrom: '京都府京都市',
        season: 'autumn',
        message:
            '権藤様、秋も深まってまいりました。\n寺町の路地は落葉でいっぱいです。\n一人の食卓にもようやく慣れました。\nあの夜、注いでくださった一杯を、今もよく思い出します。',
        apprenticesInference:
            'かつて二人で来ていた人が、今は一人でカードを書いている。短い文の間に、長い沈黙がある。',
        unlockAfterNights: 400,
    },
];

export function getVisibleGreetings(totalNights: number): SeasonalGreetingCard[] {
    return SEASONAL_GREETINGS.filter((card) => card.unlockAfterNights <= totalNights);
}
