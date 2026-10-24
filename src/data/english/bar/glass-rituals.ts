/**
 * Glass rituals observed in Gondo's bar — specific glasses reserved for
 * specific moods, customers, or moments. Unlike the glassware catalogue,
 * these are unwritten rules the apprentice pieces together over time.
 * Each ritual unlocks only after enough nights of quiet observation.
 * The master never explains; the apprentice guesses, and eventually knows.
 */

export interface GlassRitual {
    id: string;
    glassDescriptor: string;
    whenUsed: string;
    whenAvoided: string;
    gondosReason?: string;
    apprenticesNote: string;
    unlockAfterNights: number;
}

export const GLASS_RITUALS: GlassRitual[] = [
    {
        id: 'ritual-thick-wide-mouth',
        glassDescriptor: '厚手で口径の広い、重たいコップ',
        whenUsed: '失恋して来た客、あるいは誰かを見送った直後の客に、黙って出す。中身は濃いめの水割り。',
        whenAvoided: '祝い事の席では決して使わない。',
        gondosReason: '涙が落ちても、割れねえだろう。',
        apprenticesNote: '二年目の冬、泣き止まない女性客に親父がそれを出した夜、ようやく意味が分かった。',
        unlockAfterNights: 10,
    },
    {
        id: 'ritual-deep-bottom',
        glassDescriptor: '底が深く、縁がわずかに内に絞られた古い硝子',
        whenUsed: '一人で長く考え事をしている客、時計を見ない客に選ぶ。',
        whenAvoided: '話し相手を探している客、連れのいる客には使わない。',
        gondosReason: '底が深えと、覗きてえ気分になる。',
        apprenticesNote: '客が三十分ぶりにグラスの底を覗き込んだ瞬間、親父の選択の理由が腑に落ちた。',
        unlockAfterNights: 20,
    },
    {
        id: 'ritual-never-chipped-for-new',
        glassDescriptor: '縁の欠けた薄いコップ',
        whenUsed: '二度目以降の常連、気心の知れた客にだけ、わざと出すことがある。',
        whenAvoided: '初めての客には決して出さない。新規の夜は必ず無傷の硝子。',
        gondosReason: '初めての人間に、うちの古傷を見せる道理はねえ。',
        apprenticesNote: '初来店の若い男に綺麗なグラスを出したあと、親父が「あれはまだ早い」と小さく呟いた。',
        unlockAfterNights: 30,
    },
    {
        id: 'ritual-edo-kiriko-small',
        glassDescriptor: '厚手の江戸切子の小ぶり',
        whenUsed: '何かを祝いに来た客、昇進や退職のあった客に、一杯目だけ使う。',
        whenAvoided: '二杯目以降は別の硝子に切り替え、同じ客の同じ夜に二度は使わない。',
        gondosReason: '晴れの硝子は、一度だけでいい。',
        apprenticesNote: '社長を辞めたと静かに告げた客に親父がそれを出したのを見て、祝いの定義が少し広がった。',
        unlockAfterNights: 50,
    },
    {
        id: 'ritual-reserved-for-one',
        glassDescriptor: '棚の奥、布にくるまれた脚の細い一客',
        whenUsed: '年に数度だけ来る、白髪の老婦人が座った時にだけ出す。中身は常に同じ銘柄。',
        whenAvoided: '他の客には絶対に出さない。本人の不在時も棚から動かさない。',
        apprenticesNote: '親父が布を畳む手つきが、他のどの硝子の時とも違っていた。誰かは、聞かなかった。',
        unlockAfterNights: 75,
    },
    {
        id: 'ritual-plain-tumbler-rain',
        glassDescriptor: 'なんの変哲もない、厚手のロックグラス',
        whenUsed: '雨で傘を忘れた客、濡れて入ってきた客に、温かい湯割りと共に選ぶ。',
        whenAvoided: '晴れた夜には使わない。乾いた硝子は乾いた夜に。',
        gondosReason: '濡れて来た人間に、洒落た硝子は酷だ。',
        apprenticesNote: 'びしょ濡れの会社員が、その重さに肩の力を抜いた瞬間を見てしまった。',
        unlockAfterNights: 100,
    },
    {
        id: 'ritual-green-glass-liar',
        glassDescriptor: 'うっすら緑がかった、古い薬瓶のような硝子',
        whenUsed: '嘘をついていると親父が見抜いた客に、何も言わずに出す。',
        whenAvoided: '正直に弱音を吐いている客には使わない。',
        gondosReason: '緑は、嘘を薄める色だ。',
        apprenticesNote: '自慢話を三十分続けた客が、その硝子を手にした途端に黙ったのを三度見た。',
        unlockAfterNights: 150,
    },
    {
        id: 'ritual-chipped-for-self',
        glassDescriptor: '親父自身がかつて割って、金継ぎで直した一客',
        whenUsed: '閉店後、親父が自分用に一杯だけ注ぐ夜にのみ使う。',
        whenAvoided: '営業時間中、客には決して出さない。',
        apprenticesNote: '店じまいの後、カウンターの奥でそれを磨く親父の背中を、声をかけずに見送るようになった。',
        unlockAfterNights: 220,
    },
    {
        id: 'ritual-twin-glasses',
        glassDescriptor: '全く同じ薄造りの対のグラス、二客一組',
        whenUsed: '長年連れ添った夫婦、あるいは同じ日に必ず並んで座る二人連れにだけ出す。',
        whenAvoided: '片方だけの来店時は絶対に出さない。片割れの硝子を一人に使うことはない。',
        gondosReason: '二つで一つのもんを、割るのは忍びねえ。',
        apprenticesNote: '夫を亡くした婦人が一人で来た夜、親父が別の硝子を静かに差し出した意味を、あとで理解した。',
        unlockAfterNights: 350,
    },
    {
        id: 'ritual-unnamed-final',
        glassDescriptor: '名も産地も分からない、少し歪んだ古硝子',
        whenUsed: '親父が「今夜で最後かもしれねえ」と感じた客にだけ、挨拶代わりに出す。',
        whenAvoided: 'また来ると確信できる客には、決して使わない。',
        apprenticesNote: '何度かこの硝子が出された客は、いずれも本当に二度と現れなかった。理由は、今も聞いていない。',
        unlockAfterNights: 500,
    },
];

export function getLearnedRituals(totalNights: number): GlassRitual[] {
    return GLASS_RITUALS.filter((ritual) => ritual.unlockAfterNights <= totalNights);
}
