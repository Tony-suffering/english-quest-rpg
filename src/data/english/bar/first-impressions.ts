/**
 * First-impression notes jotted down by the apprentice in a small counter notebook.
 * Each entry records the very first read of a new customer on their opening visit —
 * descriptor, initial signal, coat or bag, posture, ordering style, and a tentative guess.
 * Guesses are deliberately soft; the apprentice is often wrong, and that is the point.
 * Specific concrete details only. No labels, no diagnoses.
 */

export interface FirstImpression {
    id: string;
    customerDescriptor: string;
    firstSignal: string;
    coatOrBag: string;
    howTheySat: string;
    howTheyOrdered: string;
    apprenticesGuess: string;
}

export const FIRST_IMPRESSIONS: FirstImpression[] = [
    {
        id: 'first-navy-scarf',
        customerDescriptor: '紺のマフラーを巻いた中年の男',
        firstSignal: 'のれんをくぐる前に一度、店の看板を見上げて息を整えた.',
        coatOrBag: '肘まですり切れた紺のウールコート、袖口にボタンの跡が二つ残っていた.',
        howTheySat: '一番端の席に座り、鞄を足元ではなく膝の上に置いた.',
        howTheyOrdered: '「熱燗を.」とだけ言って、メニューは開かなかった.',
        apprenticesGuess: '長く単身赴任している人かと思った — でも、外していたかもしれない.',
    },
    {
        id: 'first-pale-hands',
        customerDescriptor: '指先の白い女性',
        firstSignal: '暖簾を分ける手つきが、紙を一枚めくるように静かだった.',
        coatOrBag: 'ベージュのトレンチ、左のポケットだけ少し膨らんでいた.',
        howTheySat: 'カウンターの真ん中を選び、コースターの角を指でそっと整えた.',
        howTheyOrdered: '「白ワインを、辛口のほうで.」と、誰かに確認するような口調で言った.',
        apprenticesGuess: '校閲の仕事じゃないかと思った — でも外していた.',
    },
    {
        id: 'first-rain-shoulders',
        customerDescriptor: '肩だけ雨に濡れた男',
        firstSignal: '店に入る瞬間、傘を持っていない自分の手を一度見下ろした.',
        coatOrBag: '黒のジャケット、右肩だけが色が濃く変わっていた.',
        howTheySat: 'カウンターの真ん中に座り、肘をつかずに背筋を伸ばした.',
        howTheyOrdered: '「ビールで.」と短く、銘柄は聞き返さなかった.',
        apprenticesGuess: '駅を一つ手前で降りて歩いてきた人かと思った — でも違ったかもしれない.',
    },
    {
        id: 'first-heavy-tote',
        customerDescriptor: '大きなトートを抱えた若い女性',
        firstSignal: '入ってすぐ、誰もいない席を端から順に目で数えた.',
        coatOrBag: '藍色のキャンバストート、角が擦り切れて白い糸が出ていた.',
        howTheySat: '窓際の二人席に一人で座り、トートを隣の椅子に置いた.',
        howTheyOrdered: '「一番軽いお酒って、どれですか.」と声を落として訊いた.',
        apprenticesGuess: '書店員かと思った — でも、たぶん外している.',
    },
    {
        id: 'first-polished-shoes',
        customerDescriptor: '靴だけ異様に磨かれた男',
        firstSignal: 'のれんをくぐる前に、踵を一度揃え直した.',
        coatOrBag: 'グレーのスーツ、鞄は持たず薄い封筒を一つ手にしていた.',
        howTheySat: '入口から一番遠い席に座り、封筒を膝の下にそっと挟んだ.',
        howTheyOrdered: '「焼酎、お湯割り、濃いめで.」と、迷いなく言った.',
        apprenticesGuess: '面談の帰りだろうと思った — でも、向かっている最中だった可能性もある.',
    },
    {
        id: 'first-paint-on-cuff',
        customerDescriptor: '袖に薄い絵の具がついた女',
        firstSignal: '席に着く前に一度、手のひらを二回こすり合わせた.',
        coatOrBag: 'グリーンのダウン、左袖に水色の小さなしみがあった.',
        howTheySat: 'カウンターの端から二つ目に座り、椅子の高さを小さく調整した.',
        howTheyOrdered: '「何か、暖まるもの.」と、店主ではなく手元のおしぼりに向かって言った.',
        apprenticesGuess: '保育士じゃないかと思った — でも外していた.',
    },
    {
        id: 'first-slow-umbrella',
        customerDescriptor: '傘を丁寧に畳む年配の男',
        firstSignal: '雨の日でもないのに、入口で傘を一度開いて閉じ直した.',
        coatOrBag: 'カーキのコート、背中に一筋の折り目がくっきり残っていた.',
        howTheySat: '椅子を引いてから一拍置き、座る前に軽く目を閉じた.',
        howTheyOrdered: '「ぬる燗で一合.」と、常連のような短さで言った.',
        apprenticesGuess: '退職した教師かと思った — でも、はっきりとは分からない.',
    },
    {
        id: 'first-phone-face-down',
        customerDescriptor: '席に着くなり携帯を伏せた女性',
        firstSignal: '入ってきて一番に、店内の時計を確認した.',
        coatOrBag: '薄手の黒コート、肩にきれいなリントが一筋ついていた.',
        howTheySat: 'カウンターの端に座り、携帯をコースターの横に画面を伏せて置いた.',
        howTheyOrdered: '「ハイボール、濃いめでお願いします.」と、声量を一段上げて言った.',
        apprenticesGuess: '待ち合わせをすっぽかされた帰りかと思った — でも、違う可能性のほうが高い気もする.',
    },
    {
        id: 'first-leather-briefcase',
        customerDescriptor: '古い革鞄を抱えた男',
        firstSignal: '店内を一度も見回さず、まっすぐ同じ席を目指した.',
        coatOrBag: '焦げ茶の革鞄、持ち手が手の形に沿って光っていた.',
        howTheySat: '鞄を足元に置き、椅子にまっすぐ腰を下ろした.',
        howTheyOrdered: '「冷やで一合、肴はお任せで.」と淡々と言った.',
        apprenticesGuess: '以前この街に住んでいた人かと思った — ただの勘かもしれない.',
    },
    {
        id: 'first-nervous-laugh',
        customerDescriptor: '入口で小さく笑った若い男',
        firstSignal: '敷居の前で一度足を止め、自分の服を見下ろした.',
        coatOrBag: 'ベージュのブルゾン、首元のタグがまだ外に出ていた.',
        howTheySat: '一番入口に近い席を選び、椅子を半分だけ引いて座った.',
        howTheyOrdered: '「……えっと、同じものを、最初は.」とだけ言って、誰が同じなのかは言わなかった.',
        apprenticesGuess: '会社の先輩に教えられてきた新人かと思った — ただ、先輩はどこにもいなかった.',
    },
    {
        id: 'first-ring-finger',
        customerDescriptor: '左手の薬指に日焼けの跡が残る男',
        firstSignal: 'のれんに触れるとき、無意識に左手を使うのを避けた.',
        coatOrBag: '濃紺のジャケット、内ポケットに小さな紙袋が覗いていた.',
        howTheySat: 'カウンターの端に座り、左手をポケットから出さずに料理を待った.',
        howTheyOrdered: '「強いお酒を、少しだけ.」と控えめに注文した.',
        apprenticesGuess: '単身赴任が終わった直後かと思った — でも、ぜんぜん違うかもしれない.',
    },
    {
        id: 'first-fresh-haircut',
        customerDescriptor: '明らかに切ったばかりの髪の女性',
        firstSignal: '入ってすぐ、店の鏡のある一角をそっと探した.',
        coatOrBag: 'ライトグレーのコート、襟元にまだカットされた短い髪が数本残っていた.',
        howTheySat: 'カウンターではなく、壁際の小さな一人席を選んだ.',
        howTheyOrdered: '「なんでもいいので、今日のおすすめを.」と、珍しくゆっくり言った.',
        apprenticesGuess: '何かを区切った直後の人に見えた — でも、区切ったのは別のものかもしれない.',
    },
    {
        id: 'first-two-phones',
        customerDescriptor: '胸ポケットに携帯を二つ入れた男',
        firstSignal: '入店して十秒で、携帯の画面を二つとも一度確認した.',
        coatOrBag: '濃灰のジャケット、袖口に薄いファンデーションのあとが一筋.',
        howTheySat: '一番奥の席を選び、入口が見える角度に椅子を少しだけ回した.',
        howTheyOrdered: '「ビールを、グラスで小さいの.」と、いつでも立てる声量で言った.',
        apprenticesGuess: '誰かを待っているのかと思った — でも、最後まで誰も来なかった.',
    },
    {
        id: 'first-notebook-woman',
        customerDescriptor: '手帳を一冊持った女性',
        firstSignal: '席に着くより先に、おしぼりをもう一枚欲しそうな目をした.',
        coatOrBag: '薄いベージュのジャケット、胸ポケットに細い万年筆が差してあった.',
        howTheySat: 'カウンターの真ん中に座り、手帳をコースターの隣にそっと開いた.',
        howTheyOrdered: '「辛口の日本酒、冷やで.」と、メニューを見ずに言った.',
        apprenticesGuess: '取材で街を歩いている人かと思った — ただの思い込みな気もする.',
    },
    {
        id: 'first-small-tremor',
        customerDescriptor: '右手が時々小さく震える男',
        firstSignal: '入ってきてすぐ、カウンターの木目に指先を二度ほど這わせた.',
        coatOrBag: '黒のダウン、ファスナーの金具が少しくすんでいた.',
        howTheySat: 'カウンターの端から三つ目に座り、右手を膝の上で握って隠した.',
        howTheyOrdered: '「同じのを、もう一杯.」と、何も注文していないのにつぶやくように言った.',
        apprenticesGuess: '別の店でもう一軒飲んできた人かと思った — でも、酒の匂いはしなかった.',
    },
    {
        id: 'first-too-light-jacket',
        customerDescriptor: '季節に対して薄着すぎる若い男',
        firstSignal: '暖簾をくぐる前に、肩を一度大きく回して力を抜いた.',
        coatOrBag: '薄手のシャツ一枚、鞄らしい鞄を持っていなかった.',
        howTheySat: '一番端の席に座り、腕を組んで背もたれに身を預けた.',
        howTheyOrdered: '「なんか、熱いの.」とだけ言った.',
        apprenticesGuess: 'つい近所から出てきただけの人かと思った — でも、靴は遠くから歩いてきた靴だった.',
    },
    {
        id: 'first-paper-bag',
        customerDescriptor: '小さな紙袋を抱えた年配の女性',
        firstSignal: 'のれんを分ける前に、紙袋の取っ手を一度持ち替えた.',
        coatOrBag: '薄紫のショール、紙袋はどこかの和菓子屋の印字だった.',
        howTheySat: '窓際の席に腰を下ろし、紙袋を自分のすぐ横に立てた.',
        howTheyOrdered: '「お茶を、温かいもの.」と、酒の前にまず言った.',
        apprenticesGuess: '誰かを訪ねた帰りに寄ったのだろうと思った — でも、見当違いかもしれない.',
    },
    {
        id: 'first-silent-couple',
        customerDescriptor: '何も話さずに入ってきた二人連れ',
        firstSignal: '入口で誰が先に入るか、無言のまま一瞬譲り合った.',
        coatOrBag: '片方は黒の厚手のコート、もう片方はグレーのニットだけの軽装.',
        howTheySat: 'カウンターの端に並んで座り、間に一つ席を空けなかった.',
        howTheyOrdered: '片方が「お茶を二つ、そのあとで決めます.」と、もう一方の顔を見ずに言った.',
        apprenticesGuess: '喧嘩のあとの帰りかと思った — でも、そうではなかった気がする.',
    },
    {
        id: 'first-clean-hands',
        customerDescriptor: '爪まで手が妙にきれいな男',
        firstSignal: '席に着く前に、もう一度手のひらを上下にひっくり返して見た.',
        coatOrBag: 'ネイビーのコート、内側の生地がしっかりした高そうな仕立て.',
        howTheySat: 'カウンターの真ん中に座り、両手をカウンターの上で軽く組んだ.',
        howTheyOrdered: '「今日は何が一番いいものですか.」と、銘柄ではなく状態を訊いた.',
        apprenticesGuess: '料理を作る側の人かと思った — ただの勘で、確証はない.',
    },
    {
        id: 'first-late-apology',
        customerDescriptor: '入るなり小さく頭を下げた男',
        firstSignal: '店主と目が合う前に、すでに謝るような角度でうなずいていた.',
        coatOrBag: '紺のジャンパー、右胸に会社名らしき薄れたロゴの痕跡.',
        howTheySat: '一番入口寄りの席を選び、椅子を半分だけ引いて腰かけた.',
        howTheyOrdered: '「ビールを一杯だけ、急ぎで.」と言った.',
        apprenticesGuess: '仕事の抜け出しで来たのかと思った — でも、戻る気配はなかった.',
    },
];

export function pickFirstImpression(): FirstImpression {
    const index = Math.floor(Math.random() * FIRST_IMPRESSIONS.length);
    return FIRST_IMPRESSIONS[index];
}
