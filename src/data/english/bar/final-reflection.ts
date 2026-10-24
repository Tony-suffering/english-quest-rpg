/**
 * Final reflections for the Silent Bartender apprentice.
 * Six long-form passages written at major turning points,
 * unlocked as the apprentice accumulates nights behind the bar.
 * Each captures a central image and a quiet, earned understanding.
 */

export interface FinalReflection {
    id: string;
    reflectionTitle: string;
    body: string;
    centralImage: string;
    unlockAfterNights: number;
}

export const FINAL_REFLECTIONS: FinalReflection[] = [
    {
        id: 'refl-silence-as-craft',
        reflectionTitle: '沈黙を操るということ',
        body:
            '沈黙は、ただ黙っていることだとずっと思っていた。\n' +
            'この店に来て、それが違うと分かった。\n' +
            '権藤さんの沈黙には重さがあり、向きがある。\n' +
            '客の言葉を迎える沈黙と、言葉を引き出す沈黙と、言葉を終わらせる沈黙。\n' +
            '俺はまだ、その三つを使い分けられない。\n' +
            'けれど、違いがあるという事実だけは、もう疑っていない。\n' +
            '黙っていることが仕事になり得ると、初めて信じられるようになった。',
        centralImage: 'カウンターに落ちる、言葉より先に届く静けさ。',
        unlockAfterNights: 200,
    },
    {
        id: 'refl-carrying-strangers-night',
        reflectionTitle: '他人の一晩を預かること',
        body:
            '客が帰ったあと、カウンターに置かれていたコースターを拭きながら、\n' +
            '今夜この人は、何を抱えてここに来たのだろうと考える癖がついた。\n' +
            '聞かなかった話のほうが、聞いた話より多い。\n' +
            'けれど、聞かなくても、確かに受け取ってしまった重さがある。\n' +
            '一杯ぶんの時間、俺はその人の一晩を預かっていた。\n' +
            'それを軽く扱ってはいけないのだと、最近ようやく体で理解してきた。',
        centralImage: '誰も座っていない椅子の、まだ温かい座面。',
        unlockAfterNights: 350,
    },
    {
        id: 'refl-gondo-as-form',
        reflectionTitle: '権藤という型',
        body:
            '権藤さんは、人である前に、ひとつの型のようなものだと気づいた日があった。\n' +
            '立ち姿、グラスの置き方、客を見る角度、言葉の引き際。\n' +
            'その全部が、長い時間をかけて磨かれて、ほとんど動かない一本の線になっている。\n' +
            '真似てもなぞれない。真似ない方が、むしろ近づける気さえする。\n' +
            '俺が目指すべきは権藤さんではなく、権藤さんを生んだあの時間の密度なのだろう。\n' +
            'あの人は到達点ではなく、歩き方の見本だった。',
        centralImage: 'カウンターの内側で、影さえも定位置にある立ち姿。',
        unlockAfterNights: 500,
    },
    {
        id: 'refl-what-not-to-say',
        reflectionTitle: '言わないこと',
        body:
            '最初のころは、気の利いた一言を返せるかどうかばかりを気にしていた。\n' +
            'この店で長く働くうちに、言わずに済ませる技術のほうがずっと難しいと分かってきた。\n' +
            '励ましにならない励まし、理解したふりの相槌、整いすぎた慰め。\n' +
            'どれも、客の夜を軽くしてしまう。\n' +
            '言葉を足さないことで残せる余白があり、その余白の中でだけ、人はほどける。\n' +
            '黙っていられる強さを、職業として身につけつつある気がしている。',
        centralImage: '言いかけて、グラスを磨く動作に変えた右手。',
        unlockAfterNights: 700,
    },
    {
        id: 'refl-bar-as-body',
        reflectionTitle: '店という身体',
        body:
            'いつの間にか、棚の位置も、氷の減り方も、ドアの建て付けも、自分の身体の一部になっていた。\n' +
            '暗がりの中でも、どのボトルがどこにあるか手が覚えている。\n' +
            '客が椅子を引く音で、その人の今夜の重さがだいたい分かる。\n' +
            'これは技術というより、店と長く一緒に呼吸してきた結果のようなものだ。\n' +
            '俺はこの空間のために働いているつもりだったが、\n' +
            '気づけば、この空間が俺を少しずつ作り直してもいた。\n' +
            '店は、もうひとつの身体だった。',
        centralImage: '閉店後、灯りを落とした店内で、木と酒だけが鳴らす音。',
        unlockAfterNights: 900,
    },
    {
        id: 'refl-what-comes-next',
        reflectionTitle: 'これから先',
        body:
            'この先もずっとここにいるのだろうか、と自分に問うてみた夜があった。\n' +
            '答えは出なかったが、答えを急がなくてもよいとは思えた。\n' +
            'いつか店を出る日が来るのかもしれないし、来ないのかもしれない。\n' +
            'どちらにしても、ここで覚えた沈黙と、預かった夜の重さは、持って歩いていける。\n' +
            '権藤さんのようにはなれない。なる必要もないのだと、ようやく信じられる。\n' +
            '次の一晩を、ただ丁寧に開けること。\n' +
            'それ以上の計画は、今の俺にはいらない気がしている。',
        centralImage: '開店前、まだ誰も触れていないカウンターに差し込む薄い光。',
        unlockAfterNights: 1000,
    },
];

export function getRecordedReflections(totalNights: number): FinalReflection[] {
    return FINAL_REFLECTIONS.filter(
        (reflection) => reflection.unlockAfterNights <= totalNights,
    );
}
