/**
 * Memorable silences — ten specific hushes the apprentice still carries.
 * Not the bar's ordinary quiet, but particular silences with a texture:
 * the moment they fell, who was there, how long they seemed to last,
 * what the air was holding, and how the silence finally dissolved.
 * Unlocked in ascending order as the nights accumulate behind the counter.
 */

export interface MemorableSilence {
    id: string;
    whenItFell: string;
    whoWasPresent: string;
    durationFeel: string;
    whatTheSilenceHeld: string;
    howItEnded: string;
    unlockAfterNights: number;
}

export const MEMORABLE_SILENCES: MemorableSilence[] = [
    {
        id: 'silence-the-uncle-who-said-her-name',
        whenItFell: '常連のおじさんが、普段絶対口にしない奥さんの名前を、ふと一度だけ呟いた直後。',
        whoWasPresent: 'おじさん、権藤さん、私、奥の席で新聞を畳みかけていた若い男。',
        durationFeel: '三十秒が一分半に感じられた。',
        whatTheSilenceHeld: 'その名前を誰もが聞いたのに、誰ひとり聞き返さなかったこと。\n「今、なんて?」と言えばすべてが崩れるという、全員の了解。\n彼女がもうこの世にいないという事実を、その場の空気だけが抱えていた。',
        howItEnded: '権藤さんが氷をひとつ、音を立てずにグラスへ落として、何事もなかったように注ぎ足した。',
        unlockAfterNights: 15,
    },
    {
        id: 'silence-radio-clicked-off-mid-song',
        whenItFell: '十一時過ぎ、ラジオが歌の途中でぷつりと切れたその瞬間。',
        whoWasPresent: '閉店間際の三人の客、帰り支度の私、煙草をくわえたままの権藤さん。',
        durationFeel: '歌の続きを、全員がまだ耳の中で探している長さだった。',
        whatTheSilenceHeld: '誰もラジオに手を伸ばさなかったこと。\n切れた音のかわりに、急に聞こえ始めた冷蔵庫の低い唸り。\n歌の続きを知っている人間と、知らないふりをしている人間が、同じ沈黙の中にいた。',
        howItEnded: '一番奥の客が小さく咳払いをし、それが合図のように皆の会話が戻ってきた。',
        unlockAfterNights: 30,
    },
    {
        id: 'silence-the-standing-man',
        whenItFell: 'スーツの男が会計の途中で立ち上がり、そのまま座り直さなかった時。',
        whoWasPresent: '立ったままの男、権藤さん、カウンターの端の女性客、私。',
        durationFeel: '座るか、出ていくか、決めるまでの秒数が永遠に伸びた。',
        whatTheSilenceHeld: '彼がもう戻らないと全員が察していたこと。\n財布を開いたまま止まった指先、数えかけの千円札、決まらない姿勢。\n「帰らないで」とも「どうぞ」とも誰も言えなかった空気。',
        howItEnded: '男が札を置き、頭を軽く下げ、結局何も言わずに出ていった扉の音で解けた。',
        unlockAfterNights: 50,
    },
    {
        id: 'silence-after-the-wrong-toast',
        whenItFell: '新しい客が「乾杯」と言ったが、その日が誰かの命日だと場の全員が知っていた時。',
        whoWasPresent: '知らない新客、古い常連四人、権藤さん、私。',
        durationFeel: 'グラスが触れ合う前の、一拍だけのはずの間が、妙に長く伸びた。',
        whatTheSilenceHeld: '新客を責めない優しさと、それでも飲めないという頑なさ。\n誰も事情を説明しないという暗黙の取り決め。\n亡くなった人の名前が、口に出されないことでむしろ濃く立ち上がっていた。',
        howItEnded: '常連の一人が「乾杯」ではなく「お疲れさま」と小さく言い直し、皆がそれに倣った。',
        unlockAfterNights: 75,
    },
    {
        id: 'silence-between-the-two-who-used-to-love',
        whenItFell: '偶然同じ夜に来てしまったかつての恋人同士が、互いに気づいた瞬間。',
        whoWasPresent: '元恋人の二人、あいだに座った無関係な客一人、権藤さん、私。',
        durationFeel: '四、五分。体感ではその夜の残り全部。',
        whatTheSilenceHeld: '言ってはいけない名前、触れてはいけない年月。\n二人のあいだの無関係な客が、自分が壁になっていると気づいてからの強張り。\n二人のうちどちらが先に帰るか、という見えない駆け引き。',
        howItEnded: '女性のほうが立ち上がらずに、ただ静かにメニューを閉じた音で、時間が再び流れ始めた。',
        unlockAfterNights: 100,
    },
    {
        id: 'silence-after-the-phone-that-didnt-ring',
        whenItFell: '権藤さんが一晩中、鳴るはずだった電話を待ち、結局鳴らなかった零時過ぎ。',
        whoWasPresent: '権藤さん、私、最後まで残っていた寡黙な常連一人。',
        durationFeel: '看板を下ろすまでの三十分が、一晩より長かった。',
        whatTheSilenceHeld: '待っていたことを権藤さんが認めないという意地。\n鳴らないと知っていた私と常連の、見ないふり。\n電話機のほうを誰も見ないという、三人がかりの配慮。',
        howItEnded: '常連が黙って金を置き、権藤さんの肩を軽く叩いて出ていった。権藤さんは何も言わなかった。',
        unlockAfterNights: 150,
    },
    {
        id: 'silence-when-the-snow-started',
        whenItFell: '扉の小窓の向こうで、音もなく雪が降り始めたのに誰かが気づいた時。',
        whoWasPresent: '七、八人ほどの客、全員が別々の話をしていた。',
        durationFeel: '数秒、けれど全員の呼吸が一度に浅くなった長さ。',
        whatTheSilenceHeld: '話の途中で止まった言葉の尻尾が、宙でそのままになっていたこと。\n今夜帰れるだろうか、という各人の計算。\n雪を見て思い出した、それぞれ別の過去。',
        howItEnded: '誰かが「降ってきたな」と呟き、けれどそれは沈黙を破るというより、沈黙に名前をつけただけだった。',
        unlockAfterNights: 220,
    },
    {
        id: 'silence-after-the-apology-that-was-refused',
        whenItFell: '中年の男が若い男に頭を下げたが、若い男が黙って首を横に振った直後。',
        whoWasPresent: '中年の男、若い男、権藤さん、私、目を伏せた女性客。',
        durationFeel: '一分強。その間、氷が溶ける音がはっきり聞こえた。',
        whatTheSilenceHeld: '謝罪では足りないという事実。\n拒まれた側が、それでも次の言葉を探しているということ。\n拒んだ側の怒りが、すでに疲労に変わりかけていること。',
        howItEnded: '若い男がグラスを静かに置き、席を立たずに飲み干した。それが、ひとまずの許しに近かった。',
        unlockAfterNights: 350,
    },
    {
        id: 'silence-on-the-night-i-nearly-quit',
        whenItFell: '私が「辞めます」と口に出しかけて、出さなかった夜の十時半。',
        whoWasPresent: '権藤さんと私。客はまだ誰もいなかった。',
        durationFeel: '言いかけた息を飲み込んでから、十秒ほど。ただし一生分の十秒。',
        whatTheSilenceHeld: '権藤さんが私の言いかけた気配に気づいていたこと。\n気づいた上で、先回りして何も訊かないと決めていたこと。\n「今夜言えば、明日もう立てない」という私自身の予感。',
        howItEnded: '権藤さんが私の前に、頼んでいない熱い茶を一杯、音を立てずに置いた。',
        unlockAfterNights: 500,
    },
    {
        id: 'silence-of-the-last-regular-leaving',
        whenItFell: '最後の常連が、何も言わずに立ち上がり、扉の前で一度だけ振り返った時。',
        whoWasPresent: 'その常連、権藤さん、私。もう他に誰もいなかった。',
        durationFeel: '振り返ってから扉が閉まるまでの、たぶん四秒。けれどその四秒にこの店の全部が入っていた。',
        whatTheSilenceHeld: '「また明日」と言わないという選択。\n今夜が最後だと三人とも知っていて、誰もそれを言葉にしなかったこと。\n扉の前の彼の背中に、何十年分の夜が積もっていたこと。',
        howItEnded: '沈黙は破れなかった。扉が閉まり、しばらくしてから権藤さんが、ひとつだけカウンターを拭いた。',
        unlockAfterNights: 700,
    },
];

export function getRememberedSilences(totalNights: number): MemorableSilence[] {
    return MEMORABLE_SILENCES.filter((s) => s.unlockAfterNights <= totalNights);
}
