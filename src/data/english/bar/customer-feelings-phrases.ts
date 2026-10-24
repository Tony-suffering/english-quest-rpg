/**
 * Customer feelings phrases for the Silent Bartender English-learning game.
 * Eighteen natural, bar-appropriate English lines that indirectly express
 * how a customer is feeling, paired with Japanese meaning, usage notes, and
 * short cultural notes to help Japanese learners read the tone correctly.
 * Two entries per feeling category, nine categories total.
 */

export interface FeelingPhrase {
    id: string;
    englishPhrase: string;
    feeling:
        | 'tired'
        | 'sad'
        | 'happy'
        | 'frustrated'
        | 'grateful'
        | 'nostalgic'
        | 'lonely'
        | 'relieved'
        | 'worried';
    japaneseMeaning: string;
    howItsUsed: string;
    culturalNote?: string;
}

export const FEELING_PHRASES: FeelingPhrase[] = [
    {
        id: 'feel-tired-done',
        englishPhrase: "I'm done.",
        feeling: 'tired',
        japaneseMeaning: 'もう限界。今日はこれ以上無理。',
        howItsUsed: '長い一日の終わりにカウンターに座って最初にこぼす一言。',
        culturalNote: '「終わった」ではなく「精神的にもう動けない」の意味。字面で受け取ると誤解しやすい。',
    },
    {
        id: 'feel-tired-running-on-empty',
        englishPhrase: "I'm running on empty.",
        feeling: 'tired',
        japaneseMeaning: 'ガス欠寸前。気力も体力ももう残ってない。',
        howItsUsed: '残業続きで疲労が積み重なった客が、最初の一杯を頼む前に吐き出す一言。',
        culturalNote: 'カジュアルな誇張表現で、深刻な体調不良の告白ではない。',
    },
    {
        id: 'feel-sad-hard-week',
        englishPhrase: "It's been a hard week.",
        feeling: 'sad',
        japaneseMeaning: '今週はきつかった。',
        howItsUsed: '詳細は語らず、気分の重さだけをそっと置いていく時に使う。',
        culturalNote: '具体を聞かれたくない合図。詳細を掘り下げずに頷くのが礼儀。',
    },
    {
        id: 'feel-sad-need-a-minute',
        englishPhrase: 'I just need a minute.',
        feeling: 'sad',
        japaneseMeaning: '少しだけ一人にしておいてほしい。',
        howItsUsed: '話したくない夜、注文を決める前にそっと挟む。',
        culturalNote: '「一分」ではなく「しばらく放っておいて」の意味。時間通りに話しかけると冷たく感じられる。',
    },
    {
        id: 'feel-happy-exactly-what-i-needed',
        englishPhrase: 'This is exactly what I needed.',
        feeling: 'happy',
        japaneseMeaning: 'まさにこれが欲しかった。',
        howItsUsed: '最初の一口を飲んだ直後、肩の力が抜けた瞬間に自然と出る。',
        culturalNote: '日本語の「ちょうどいい」より強い満足の表現。控えめに聞こえるが最上級の褒め言葉。',
    },
    {
        id: 'feel-happy-couldnt-ask-for-better',
        englishPhrase: "Couldn't ask for better.",
        feeling: 'happy',
        japaneseMeaning: 'これ以上は望めないくらい最高。',
        howItsUsed: '料理や酒、店の雰囲気に対して、素直な賛辞として口にする。',
        culturalNote: '否定形で最上を語る英語的な言い回し。日本語に直訳すると弱く聞こえるが、実際は強い肯定。',
    },
    {
        id: 'feel-frustrated-had-it',
        englishPhrase: "I've had it.",
        feeling: 'frustrated',
        japaneseMeaning: 'もう我慢の限界だ。',
        howItsUsed: '職場や人間関係の話をふった後、小さく吐き捨てるように言う。',
        culturalNote: '「食べ終わった」ではなく「うんざりした」。文脈で読み取る必要がある。',
    },
    {
        id: 'feel-frustrated-cant-win',
        englishPhrase: "I just can't win today.",
        feeling: 'frustrated',
        japaneseMeaning: '今日は何をやってもうまくいかない。',
        howItsUsed: '小さな失敗が重なった日、苦笑いしながら報告するように呟く。',
        culturalNote: '深刻なぼやきではなく自嘲気味のユーモア。真剣に慰めすぎると重くなる。',
    },
    {
        id: 'feel-grateful-means-a-lot',
        englishPhrase: 'That really means a lot.',
        feeling: 'grateful',
        japaneseMeaning: '本当にありがたい。身にしみる。',
        howItsUsed: 'バーテンダーの小さな気遣いに対して、静かに返す感謝の言葉。',
        culturalNote: '日本語の「ありがとう」より重く、心の奥に届いた時だけ使う。',
    },
    {
        id: 'feel-grateful-needed-this',
        englishPhrase: 'I really needed this tonight.',
        feeling: 'grateful',
        japaneseMeaning: '今夜これが本当に必要だった。',
        howItsUsed: '会計の前、席を立ちかける瞬間に振り返って伝える一言。',
        culturalNote: '店への遠回しな感謝。直接 Thank you と言わないが、同じかそれ以上の重みがある。',
    },
    {
        id: 'feel-nostalgic-takes-me-back',
        englishPhrase: 'This takes me back.',
        feeling: 'nostalgic',
        japaneseMeaning: '懐かしいな、昔を思い出す。',
        howItsUsed: '昔聴いた曲が流れた時や、久しぶりのカクテルを口にした時にぽつりと出る。',
        culturalNote: '切なさも混じった微妙な感情。明るく「懐かしい!」と返すよりそっと頷く方が合う。',
    },
    {
        id: 'feel-nostalgic-another-life',
        englishPhrase: 'Feels like another life.',
        feeling: 'nostalgic',
        japaneseMeaning: 'まるで別の人生みたいだ。',
        howItsUsed: '若い頃の話や昔の仕事の話を振り返りながら、遠くを見て呟く。',
        culturalNote: '過去との距離感を表すロマンチックな表現。直訳すると大げさに感じるが日常で自然に使う。',
    },
    {
        id: 'feel-lonely-quiet-at-home',
        englishPhrase: "It's too quiet at home.",
        feeling: 'lonely',
        japaneseMeaning: '家が静かすぎてしんどい。',
        howItsUsed: 'なぜ今日ここに来たのかを、遠回しに説明する時に使う。',
        culturalNote: '「静か」は肯定的に聞こえがちだが、ここでは孤独のサイン。明るく同意すると見誤る。',
    },
    {
        id: 'feel-lonely-nowhere-else',
        englishPhrase: "I didn't have anywhere else to be.",
        feeling: 'lonely',
        japaneseMeaning: '他に行くところがなかっただけだよ。',
        howItsUsed: '常連が理由を聞かれた時、肩をすくめながら返す言い訳めいた一言。',
        culturalNote: '軽く聞こえるが、実は寂しさの告白。笑い飛ばさずに静かに受け止める方がよい。',
    },
    {
        id: 'feel-relieved-dodged-a-bullet',
        englishPhrase: 'I dodged a bullet today.',
        feeling: 'relieved',
        japaneseMeaning: '今日はあやうく大変な目に遭うところだった。',
        howItsUsed: 'トラブルを間一髪で回避した話を、少し興奮気味に語り出す時の導入。',
        culturalNote: '文字通りの危険ではなく、日常的なヒヤリ案件に使う誇張表現。',
    },
    {
        id: 'feel-relieved-weight-off',
        englishPhrase: "That's a weight off my shoulders.",
        feeling: 'relieved',
        japaneseMeaning: '肩の荷がやっと下りた。',
        howItsUsed: '大きな仕事や心配事が片付いた夜、最初の一杯で大きく息を吐く時に。',
        culturalNote: '日本語の「肩の荷が下りる」とほぼ同じ比喩で、珍しく直訳しても通じる表現。',
    },
    {
        id: 'feel-worried-bad-feeling',
        englishPhrase: "I've got a bad feeling about this.",
        feeling: 'worried',
        japaneseMeaning: 'なんだか嫌な予感がする。',
        howItsUsed: 'まだ起きていない問題について、グラスを指で回しながら呟く。',
        culturalNote: '深刻すぎず、不安を共有して軽くしたいだけのことも多い。すぐ励まさず聞く姿勢が合う。',
    },
    {
        id: 'feel-worried-cant-shake-it',
        englishPhrase: "I can't shake it.",
        feeling: 'worried',
        japaneseMeaning: '気になって頭から離れない。',
        howItsUsed: '何度も同じ話題に戻ってしまう夜、自分でも苦笑しながら認める一言。',
        culturalNote: '何が、を省く省略表現。文脈で察する必要があり、聞き返すと会話が止まる。',
    },
];

export function pickFeelingPhrase(
    feeling?: FeelingPhrase['feeling'],
): FeelingPhrase {
    const pool = feeling
        ? FEELING_PHRASES.filter((entry) => entry.feeling === feeling)
        : FEELING_PHRASES;
    const source = pool.length > 0 ? pool : FEELING_PHRASES;
    const index = Math.floor(Math.random() * source.length);
    return source[index];
}
