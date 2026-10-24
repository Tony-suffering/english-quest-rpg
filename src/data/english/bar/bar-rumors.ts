/**
 * Bar rumors — ten stories the neighborhood tells about this silent izakaya.
 * Some are roughly accurate, some have drifted from the truth, one is flat wrong,
 * and one, unfortunately, hits closer to the mark than anyone realizes.
 * The apprentice overhears fragments at slow intervals, unlocked by nights served.
 * Used by the lore system to surface ambient rumor beats during quiet hours.
 */

export interface BarRumor {
    id: string;
    whatTheRumorSays: string;
    heardFrom: string;
    truthStatus: 'true' | 'partly-true' | 'distorted' | 'false';
    whatIsActuallyTrue: string;
    unlockAfterNights: number;
}

export const BAR_RUMORS: BarRumor[] = [
    {
        id: 'rumor-only-seven-seats',
        whatTheRumorSays:
            'あの店はカウンター七席しかなくて、座れたら運がいいらしい。\n常連が詰めてる日は、観光客は入口で追い返されるって話だ。',
        heardFrom: '駅前の立ち飲み屋で、知らないサラリーマン二人がそう言っていた。',
        truthStatus: 'true',
        whatIsActuallyTrue:
            '席数も、常連優先の空気も、ほぼその通り。追い返すというより、マスターが静かに首を振るだけだが。',
        unlockAfterNights: 20,
    },
    {
        id: 'rumor-rare-whisky',
        whatTheRumorSays:
            'この店の棚には、もう日本に一本しか残ってない酒が置いてあるらしい。\n値段は訊かずに飲むのが作法だ、とかなんとか。',
        heardFrom: '観光客向けのブログ記事に、写真なしでそう書かれていた。',
        truthStatus: 'partly-true',
        whatIsActuallyTrue:
            '廃番になった銘柄は確かに数本あるが、「日本で一本」は盛りすぎ。マスターは値段もちゃんと答える。',
        unlockAfterNights: 40,
    },
    {
        id: 'rumor-master-past-incident',
        whatTheRumorSays:
            'マスターは昔、別の街の店で大きな揉め事を起こして、逃げるようにここへ流れ着いたらしい。\nだから客と目を合わせないんだ、と酔っ払いが断言していた。',
        heardFrom: '店の外のベンチで、見覚えのない中年男が一人で喋っていた。',
        truthStatus: 'distorted',
        whatIsActuallyTrue:
            '別の店にいたのは本当。ただし揉め事ではなく、自分から静かに辞めた。目を合わせないのは、単に癖だ。',
        unlockAfterNights: 65,
    },
    {
        id: 'rumor-back-seat-ghost',
        whatTheRumorSays:
            '奥の一番端の席には、雨の夜になると誰も座っていないのに水滴がついたグラスが置かれる、という話がある。\n常連はその席を避けて座るらしい。',
        heardFrom: '配達に来た酒屋の若い兄ちゃんが、半笑いで教えてくれた。',
        truthStatus: 'false',
        whatIsActuallyTrue:
            '誰も本当のことは知らないが、マスターは雨の夜にその席を拭いているだけだ。誰かを待っているわけでもない、と本人は言う。',
        unlockAfterNights: 95,
    },
    {
        id: 'rumor-no-menu',
        whatTheRumorSays:
            'あの店にはメニューが一枚もなくて、客が何も言わなくても勝手に料理と酒が出てくるらしい。\n常連の顔と体調を全部覚えてるから、って噂だ。',
        heardFrom: '近所の美容室で、洗髪中の女性客二人がそう話していた。',
        truthStatus: 'partly-true',
        whatIsActuallyTrue:
            'メニューは確かに無いに等しい。ただ「勝手に出てくる」のは常連の数人だけで、新顔にはちゃんと訊く。',
        unlockAfterNights: 130,
    },
    {
        id: 'rumor-secret-second-floor',
        whatTheRumorSays:
            'あの建物の二階には、招かれた客しか上がれない隠し部屋があるらしい。\nそこで夜中に、政治家や作家がこっそり集まってるって話を聞いた。',
        heardFrom: '商店街の飲み会で、不動産屋のおっさんが声を潜めて言っていた。',
        truthStatus: 'false',
        whatIsActuallyTrue:
            '二階はマスターの住居兼物置で、段ボールと古い本しかない。招かれた客など一人もいない。',
        unlockAfterNights: 175,
    },
    {
        id: 'rumor-master-never-speaks',
        whatTheRumorSays:
            'マスターは一晩で三言しか喋らないらしい。「いらっしゃい」「はい」「またどうぞ」。\nそれ以外の言葉を聞いたら、その客はもう二度と来ないって噂だ。',
        heardFrom: '別の居酒屋のカウンターで、初対面の客同士が噂していた。',
        truthStatus: 'distorted',
        whatIsActuallyTrue:
            '無口なのは本当だが、三言ちょうど、というのは誰かの創作だ。話すときは静かに、それなりに話す。',
        unlockAfterNights: 230,
    },
    {
        id: 'rumor-price-decided-by-face',
        whatTheRumorSays:
            'あの店の会計は、顔と雰囲気で値段が変わるらしい。\n疲れた顔で入ると安くなって、金持ちそうなやつからはきっちり取る、と聞いた。',
        heardFrom: 'タクシー運転手が、信号待ちで助手席の客に語っていたのを拾った。',
        truthStatus: 'partly-true',
        whatIsActuallyTrue:
            '値段は基本一定だが、疲れた客にはもう一杯だけ黙って注がれることがある。請求には乗らない。',
        unlockAfterNights: 300,
    },
    {
        id: 'rumor-closed-on-anniversary',
        whatTheRumorSays:
            '年に一度だけ、予告もなく閉まる日があるらしい。\nその日に店の前を通ると、中で誰か一人と差し向かいで飲んでる影が見えるんだとか。',
        heardFrom: '向かいのクリーニング屋の奥さんが、窓を拭きながら独り言みたいに言っていた。',
        truthStatus: 'true',
        whatIsActuallyTrue:
            '毎年同じ日、店を閉めて昔の相棒の写真の前で一人で飲む。影が二人に見えるのは、ただの都合のいい見間違いだ。',
        unlockAfterNights: 420,
    },
    {
        id: 'rumor-master-is-dying',
        whatTheRumorSays:
            '最近マスターの顔色が悪くて、長くないんじゃないかと誰かが言い出したらしい。\nあの店はいつまで開いてるか分からない、早く行っておけ、という話が回ってる。',
        heardFrom: '仕入れ先の市場で、他店の板前同士がぼそぼそ話していた。',
        truthStatus: 'true',
        whatIsActuallyTrue:
            '誰も本当のことは知らない。ただマスターは去年から医者に通っていて、最近は仕込みの手が少しだけ遅い。',
        unlockAfterNights: 600,
    },
];

export function getHeardRumors(totalNights: number): BarRumor[] {
    return BAR_RUMORS.filter((rumor) => totalNights >= rumor.unlockAfterNights);
}
