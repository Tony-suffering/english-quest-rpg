/**
 * Silent Bartender -- smaller props with micro-histories.
 *
 * A catalogue of 15 tiny, specific objects scattered around the bar.
 * Each one has its own little story -- who touched it, how it got here,
 * why it's still around. The apprentice only notices these slowly,
 * night after night, as their eye sharpens.
 */

export interface SmallProp {
    id: string;
    propName: string;
    whereItLives: string;
    microStory: string;
    apprenticesNote: string;
    unlockAfterNights: number;
}

export const SMALL_PROPS: SmallProp[] = [
    {
        id: 'prop-chipped-dish',
        propName: 'カウンターの端の欠けた小皿',
        whereItLives: 'カウンター右端、権藤の立ち位置のすぐ前。',
        microStory: '十五年前、常連の建具屋がうっかり落とした。権藤は黙って拾い、そのまま使い続けている。今は塩を少し置くための皿になっている。',
        apprenticesNote: '欠けた側を客から見えないように置くのが権藤の癖らしい。',
        unlockAfterNights: 5,
    },
    {
        id: 'prop-matchbook',
        propName: '引き出しの奥のマッチ箱',
        whereItLives: 'レジ下の浅い引き出し、一番奥。',
        microStory: '今はもう潰れた喫茶店のマッチ。三十年前、権藤が一度だけ入った店で、カウンター席でコーヒーを飲みながら独立を決めた。',
        apprenticesNote: '擦った跡が一本もない。使うつもりは最初からなかったんだろう。',
        unlockAfterNights: 10,
    },
    {
        id: 'prop-stuck-clock',
        propName: '三時で止まった掛け時計',
        whereItLives: '暖簾をくぐって右手の壁、少し高い位置。',
        microStory: '二十年前のある夜、長短針が三時を指したまま動かなくなった。電池を替えても直らない。権藤は直す気がない様子で、そのまま掛けてある。',
        apprenticesNote: '午前三時か午後三時か、誰も聞かないのが暗黙の了解になっている。',
        unlockAfterNights: 18,
    },
    {
        id: 'prop-blackened-senjafuda',
        propName: '柱の黒ずんだ千社札',
        whereItLives: '店の中央の柱、大人の目の高さよりやや上。',
        microStory: '開店の年に、近所の神社の祭の帰りに客が勝手に貼っていった。剥がそうとすると柱ごと傷みそうで、四十年そのまま。',
        apprenticesNote: '名前はもう読めない。貼った客はたぶんもう来ていない。',
        unlockAfterNights: 28,
    },
    {
        id: 'prop-dusty-ashtray',
        propName: 'ほこりをかぶった陶器の灰皿',
        whereItLives: '棚の二段目、グラスの列の後ろ。',
        microStory: '禁煙にしてから十年、出番がない。客の一人が備前焼の作家で、十二年前に手土産でくれたものだった。',
        apprenticesNote: '捨てる捨てないの問題ではなく、もらった相手のことを棚に残している感じがある。',
        unlockAfterNights: 40,
    },
    {
        id: 'prop-forgotten-cardcase',
        propName: '客が置いていった古い名刺入れ',
        whereItLives: 'カウンター下、忘れ物入れの木箱の底。',
        microStory: '七年前、スーツの男が一度だけ来て、会計のあと置き忘れた。名前も会社も旧いまま、連絡先はもう通じない。',
        apprenticesNote: '権藤は捨てないが、取りにも来ないと分かっている目をしている。',
        unlockAfterNights: 55,
    },
    {
        id: 'prop-faded-postcard',
        propName: '額縁の中の色あせた絵葉書',
        whereItLives: '奥の壁、小さな木製の額に入って掛かっている。',
        microStory: '三十五年前、修業時代の権藤を気にかけてくれた先輩から、旅先の瀬戸内から届いた一枚。文字はもう薄く、海の青だけが残っている。',
        apprenticesNote: '権藤がときどきその額の前で、長く立ち止まっている夜がある。',
        unlockAfterNights: 75,
    },
    {
        id: 'prop-empty-bottle-on-fridge',
        propName: '冷蔵庫の上の空瓶',
        whereItLives: '業務用冷蔵庫の天板、壁側に寄せて。',
        microStory: '閉店してしまった酒蔵の、最後に入荷した一本。飲み切ったあと、ラベルを眺めたくて瓶だけ残してある。埃は権藤が時折、指でそっと払う。',
        apprenticesNote: 'もう二度と手に入らない銘柄の形だけが、ここに残っている。',
        unlockAfterNights: 95,
    },
    {
        id: 'prop-old-register',
        propName: '棚の奥の古いレジ',
        whereItLives: '厨房側の棚の最下段、布をかけて。',
        microStory: '開店当初から十五年使った手回し式のレジ。壊れてからは新しいものに替えたが、どうしても捨てられず、布をかけて仕舞ってある。',
        apprenticesNote: 'たまに布がずれているのは、権藤が確認しに来ている証拠かもしれない。',
        unlockAfterNights: 120,
    },
    {
        id: 'prop-silent-telephone',
        propName: '鳴らない黒電話',
        whereItLives: 'レジの横、小さな台の上。',
        microStory: '二十五年前まではよく鳴った。回線を切ったあとも置いてあるのは、予約の時代に賑わった店の記憶を、形として残しておきたいからだという。',
        apprenticesNote: '受話器を上げたことはない。上げても、もう誰とも繋がらない。',
        unlockAfterNights: 150,
    },
    {
        id: 'prop-floating-tatami',
        propName: '床から数センチ浮いた畳の一枚',
        whereItLives: '小上がりの手前から二枚目、窓際寄り。',
        microStory: '十年ほど前から、湿気のせいか角が少しだけ浮いている。直そうとして大工を呼びかけたが、踏み心地を覚えた常連が「このままでいい」と言った。',
        apprenticesNote: '知らずに踏むと小さく鳴く。常連はみな、無意識に避けて歩く。',
        unlockAfterNights: 190,
    },
    {
        id: 'prop-noren-scribble',
        propName: '暖簾の裏の走り書き',
        whereItLives: '入口の紺色の暖簾、縫い目の内側。',
        microStory: '新しい暖簾に替えた夜、権藤が小さな筆で日付と一文字だけ書き込んだ。客には決して見えない位置にある。',
        apprenticesNote: '読めないふりをして過ごすのが、この店で働くということだと感じる。',
        unlockAfterNights: 240,
    },
    {
        id: 'prop-single-chopstick',
        propName: '箸箱の底の片割れの塗り箸',
        whereItLives: 'カウンター下の塗り箸用の箱、一番底。',
        microStory: '昔、対で揃っていた夫婦箸の片方。もう一方は十数年前に折れた。権藤はこの一本を使わず、ただ底に寝かせている。',
        apprenticesNote: '一本では用をなさないのに捨てられないのが、この店の時間の作法だと気づく。',
        unlockAfterNights: 320,
    },
    {
        id: 'prop-small-stone',
        propName: '窓辺の小さな丸い石',
        whereItLives: '格子窓の木枠の内側、湯呑みの横。',
        microStory: '四十年前、開店祝いに訪ねてきた古い友人が、河原から拾って置いていった。言葉はほとんど交わさず、石だけを置いて帰ったという。',
        apprenticesNote: '権藤はこの石の位置を、掃除のたびにミリ単位で元に戻している。',
        unlockAfterNights: 420,
    },
    {
        id: 'prop-folded-paper',
        propName: '神棚の下の折り畳まれた紙片',
        whereItLives: '神棚の台座の奥、手を伸ばさないと見えない位置。',
        microStory: '開店の日に、権藤が自分の字で誓いを書いて折り畳んだ紙。五十年、誰にも開かれていない。本人もたぶん、もう開かない。',
        apprenticesNote: '開けずに置かれているものこそ、この店の芯を支えている気がする。',
        unlockAfterNights: 550,
    },
];

export function getNoticedProps(totalNights: number): SmallProp[] {
    return SMALL_PROPS.filter((prop) => prop.unlockAfterNights <= totalNights);
}
