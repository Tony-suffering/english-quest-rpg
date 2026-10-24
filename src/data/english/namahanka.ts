/**
 * 生半可 -- 辞書が1語で返してくる日本語。
 *
 * 「生半可」を引くと half-baked が出る。間違ってはいない。
 * でも「生半可な気持ちで来るな」には一生使えない。
 * 日本語の1語が、英語では3本にも4本にも割れているから。
 * 辞書は1語に1語を返す機械なので、その割れ目が見えない。
 *
 * ここは割れ目のほうを先に見せる。核ごとに英語を当て、
 * 最後に「本当に言いたかった丸ごとの一文」を置く。
 *
 * corpus の数字は推測ではなく実測。日英対訳279万ペアから掘ったもので、
 * 出どころは /english/corpus-ja/align と同じ ja-align.json。
 *   hits   = 日本語側の生涯遭遇の目安
 *   spread = 直訳不可度 (1に近いほど、英語が毎回ちがう)
 *   found  = 対訳に実際に居た英語の上位
 *   solid  = 裏取りが十分か (0 は件数が薄い。数字を信用しすぎない)
 */

export interface NamahankaWord {
    /** 英語 */
    en: string;
    /** どの時に口から出るか。1行 */
    when: string;
    /** 例文 */
    ex: string;
    /** 例文の訳 */
    exJa: string;
}

export interface NamahankaCore {
    /** 核の名前 */
    label: string;
    /** その核が何を指しているか */
    gloss: string;
    words: NamahankaWord[];
}

export interface NamahankaSay {
    /** 言いたい日本語 */
    ja: string;
    /** やりがちな直訳 */
    bad: string;
    /** なぜそれだと届かないか */
    badWhy: string;
    /** 通る言い方 */
    good: string;
    goodJa: string;
    /** 別の角度からもう一本 */
    alt: string;
    altJa: string;
}

export interface NamahankaEntry {
    id: string;
    /** 日本語 */
    ja: string;
    /** 辞書 / 英会話サイトが返してくる答え */
    dict: string;
    /** その答えだと何が起きるか */
    dictWhy: string;
    /** 実測 */
    corpus: { hits: number; pairs: number; spread: number; found: string[]; solid: 0 | 1 };
    /** 何本に割れるか。1行 */
    split: string;
    cores: NamahankaCore[];
    says: NamahankaSay[];
}

export const NAMAHANKA: NamahankaEntry[] = [
    {
        id: 'namahanka',
        ja: '生半可',
        dict: 'half-baked',
        dictWhy:
            '「生焼け」の比喩なので、計画やアイデアには当たる。だが「生半可な気持ちで来るな」の生半可には入らない。この日本語は気持ち・出来・知識・否定形の4本に割れているのに、辞書は1本しか返さない。',
        corpus: { hits: 47, pairs: 8, spread: 0.75, found: ['wishy', 'washy', 'wishy washy'], solid: 0 },
        split: '気持ちが半分 / 出来が半分 / 知識が半分 / 「半分では済まない」の否定形',
        cores: [
            {
                label: '気持ちが生半可',
                gloss: 'やる気が半分しか入っていない。行為につく',
                words: [
                    {
                        en: 'half-hearted',
                        when: '謝罪・努力・拍手など、行為が心を伴っていない時',
                        ex: 'That was a half-hearted apology and everyone in the room knew it.',
                        exJa: 'あれは生半可な謝り方で、その場の全員が気づいてた。',
                    },
                    {
                        en: 'lukewarm',
                        when: '反応や支持が生ぬるい時。人の温度に使う',
                        ex: 'The idea got a lukewarm response, so we dropped it.',
                        exJa: '反応が生半可だったから、その案は流した。',
                    },
                    {
                        en: 'going through the motions',
                        when: '動作だけなぞっていて中身がない時',
                        ex: 'He is not even trying anymore. He is just going through the motions.',
                        exJa: 'あいつもう頑張ってすらいない。形だけなぞってる。',
                    },
                    {
                        en: 'phoning it in',
                        when: '仕事で明らかに手を抜いている時',
                        ex: 'You can tell the writers were phoning it in this season.',
                        exJa: '今シーズンは脚本が手を抜いてるのが分かる。',
                    },
                ],
            },
            {
                label: '出来が生半可',
                gloss: '仕上がりが焼き上がっていない。物と仕事につく',
                words: [
                    {
                        en: 'half-baked',
                        when: '案・計画が未完成のまま出てきた時。辞書の答えはここでだけ当たる',
                        ex: 'Do not bring me a half-baked plan and call it a strategy.',
                        exJa: '生半可な案を戦略と呼んで持ってくるな。',
                    },
                    {
                        en: 'half-assed',
                        when: '汚いが一番よく耳にする。雑な仕事を殴る時',
                        ex: 'This is a half-assed job. Do it again.',
                        exJa: 'これは生半可な仕事だ。やり直せ。',
                    },
                    {
                        en: 'it has not been thought through',
                        when: '考え足りない、と落ち着いて指摘する時',
                        ex: 'It is not a bad idea, it just has not been thought through.',
                        exJa: '悪い案じゃない。ただ詰めが生半可なだけだ。',
                    },
                ],
            },
            {
                label: '知識が生半可',
                gloss: 'かじった程度。うわべだけ',
                words: [
                    {
                        en: 'surface-level',
                        when: '理解が浅いと言う時。superficial より会話で出る',
                        ex: 'He has a surface-level understanding of the code, nothing more.',
                        exJa: 'あいつのコードの理解は生半可だ。それ以上じゃない。',
                    },
                    {
                        en: 'a smattering of',
                        when: 'かじった程度の知識そのものを名詞で言う時',
                        ex: 'I have a smattering of Spanish. Enough to order food, not enough to argue.',
                        exJa: 'スペイン語は生半可。注文はできるが喧嘩はできない。',
                    },
                    {
                        en: 'just enough to be dangerous',
                        when: '生兵法は大怪我のもと。英語で一番これに近い',
                        ex: 'He knows just enough about wiring to be dangerous.',
                        exJa: '配線の知識が生半可だから、逆に危ない。',
                    },
                ],
            },
            {
                label: '生半可では済まない',
                gloss: '否定形。日本語ではここが一番よく使われる',
                words: [
                    {
                        en: 'no joke',
                        when: 'なめてかかると痛い目を見る、と警告する時',
                        ex: 'The heat here in August is no joke.',
                        exJa: 'ここの8月の暑さは生半可じゃない。',
                    },
                    {
                        en: 'no walk in the park',
                        when: '楽な道ではない、と落ち着いて言う時',
                        ex: 'Raising two kids on one income is no walk in the park.',
                        exJa: '収入ひとつで子供2人は生半可なことじゃない。',
                    },
                    {
                        en: 'takes some doing',
                        when: '相当の手間がいる、と控えめに言う時',
                        ex: 'Getting a table there takes some doing.',
                        exJa: 'あの店の席を取るのは生半可じゃない。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '生半可な気持ちでやるなら、やらないほうがいい。',
                bad: 'If you do it with a half-hearted feeling, you should not do it.',
                badWhy:
                    'half-hearted feeling という組み合わせが英語にない。feeling を足した時点で日本語の直訳になる。英語は気持ちを「心がどこにあるか」の場所で言う。',
                good: 'If your heart is not in it, do not bother.',
                goodJa: '心がそこに無いなら、やらなくていい。',
                alt: 'Do not start this unless you are all in.',
                altJa: '全部賭ける気がないなら、手を出すな。',
            },
            {
                ja: '生半可な知識で語るな。',
                bad: 'Do not talk with half-baked knowledge.',
                badWhy:
                    '通じるが完全に書き言葉。会話では知識を名詞で持たず、「分かってもいないのに」と動詞側で殴る。',
                good: 'Do not talk like you know when you do not.',
                goodJa: '分かってもいないのに、分かった口をきくな。',
                alt: 'You know just enough to be dangerous. Stop.',
                altJa: '知識が生半可な分だけ余計に危ない。やめとけ。',
            },
            {
                ja: '英語は生半可じゃ身につかない。',
                bad: 'English is not learned half-heartedly.',
                badWhy:
                    '受け身にした瞬間、誰がやっているのかが消えて標語になる。英語はここを「片手間ではできない」と時間の話に落とす。',
                good: 'You are not going to pick up English on the side.',
                goodJa: '片手間で英語が身につくわけがない。',
                alt: 'Learning English is no joke. You cannot do it in your spare five minutes.',
                altJa: '英語は生半可じゃない。空き5分でどうにかなるものじゃない。',
            },
        ],
    },

    {
        id: 'bimyou',
        ja: '微妙',
        dict: 'subtle / delicate',
        dictWhy:
            'subtle は「微妙な違い」の微妙で、しかも英語では褒め言葉に寄る。「あの店? 微妙」を subtle で言うと、繊細で良かったと伝わる。真逆が出る事故。',
        corpus: { hits: 2844, pairs: 40, spread: 0.825, found: ['subtle', 'delicate', 'sensitive'], solid: 1 },
        split: '良くないと言い切らない / 判断がつかない / 差がわずか',
        cores: [
            {
                label: '良くない、けど悪いとも言わない',
                gloss: '評価をぼかして下げる。会話で一番多い微妙',
                words: [
                    {
                        en: 'meh',
                        when: '感想を一言で切り捨てる時',
                        ex: 'How was the movie? Meh.',
                        exJa: '映画どうだった? 微妙。',
                    },
                    {
                        en: 'nothing special',
                        when: '悪くはないが、わざわざ勧めない時',
                        ex: 'The food was fine. Nothing special.',
                        exJa: '飯は悪くなかった。まあ微妙。',
                    },
                    {
                        en: 'underwhelming',
                        when: '期待に届かなかった時',
                        ex: 'After all that hype, the ending was underwhelming.',
                        exJa: 'あれだけ煽っておいて、終わり方は微妙だった。',
                    },
                ],
            },
            {
                label: '判断がつかない、きわどい',
                gloss: '決まっていない。線の上にある',
                words: [
                    {
                        en: 'iffy',
                        when: '天気・体調・見通しが怪しい時',
                        ex: 'The weather is looking iffy for Saturday.',
                        exJa: '土曜の天気、微妙っぽい。',
                    },
                    {
                        en: 'up in the air',
                        when: '予定がまだ決まっていない時',
                        ex: 'Sunday is still up in the air.',
                        exJa: '日曜はまだ微妙。',
                    },
                    {
                        en: 'borderline',
                        when: 'ぎりぎり線の上。良し悪しの判定がきわどい時',
                        ex: 'That joke was borderline.',
                        exJa: 'あの冗談は微妙なところだった。',
                    },
                ],
            },
            {
                label: '差がわずか',
                gloss: '辞書の subtle が唯一当たる核',
                words: [
                    {
                        en: 'subtle',
                        when: '違いが小さくて気づきにくい時',
                        ex: 'There is a subtle difference between the two takes.',
                        exJa: '2つのテイクには微妙な違いがある。',
                    },
                    {
                        en: 'slight',
                        when: '量や程度がわずかな時',
                        ex: 'There was a slight change in his tone.',
                        exJa: '声のトーンが微妙に変わった。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '「あの店どうだった?」「微妙」',
                bad: 'It was subtle.',
                badWhy: '相手は「繊細な味だった」と受け取る。けなしたつもりが褒めになる。',
                good: 'Eh, it was nothing special.',
                goodJa: 'まあ、微妙。',
                alt: 'Honestly? Meh.',
                altJa: '正直、微妙。',
            },
            {
                ja: '今週末は微妙。',
                bad: 'This weekend is subtle.',
                badWhy: '英語として何も意味を作らない。予定の話に subtle は載らない。',
                good: 'This weekend is kind of up in the air.',
                goodJa: '今週末はまだ微妙。',
                alt: 'I might not make it this weekend. It is iffy.',
                altJa: '今週末は行けないかも。微妙なところ。',
            },
            {
                ja: 'その言い方は微妙だと思う。',
                bad: 'I think that way of saying is delicate.',
                badWhy: 'delicate だと「繊細に扱うべき話題」になる。言い方が危ない、という警告が消える。',
                good: 'I would be careful how you word that.',
                goodJa: 'その言い方はやめといたほうがいい。',
                alt: 'That came out kind of wrong.',
                altJa: '今の言い方、微妙だった。',
            },
        ],
    },

    {
        id: 'sekkaku',
        ja: 'せっかく',
        dict: '(辞書に対応語がない)',
        dictWhy:
            '単語で探すと一生見つからない。英語では語ではなく文の形で出るから。「せっかく = 」の右側を埋めようとしている間は永遠に言えない。',
        corpus: { hits: 6917, pairs: 40, spread: 0.925, found: ['finally', 'chance', 'completely'], solid: 1 },
        split: 'わざわざしたのに / せっかくだから / せっかくの〜が台無し',
        cores: [
            {
                label: 'わざわざしたのに',
                gloss: '手間をかけた側の恨み',
                words: [
                    {
                        en: 'go to the trouble of ~ing',
                        when: '手間をかけたことを前に出す時',
                        ex: 'She went to the trouble of making dinner and he did not show up.',
                        exJa: 'せっかく飯を作ったのに、あいつは来なかった。',
                    },
                    {
                        en: 'after all that',
                        when: '積み上げが無駄になった直後に投げる一言',
                        ex: 'We drove three hours and it was closed. After all that.',
                        exJa: '3時間かけて行ったら閉まってた。せっかく来たのに。',
                    },
                    {
                        en: 'all for nothing',
                        when: '全部が無駄だったと言い切る時',
                        ex: 'Two weeks of work, all for nothing.',
                        exJa: 'せっかく2週間やったのに、全部無駄。',
                    },
                ],
            },
            {
                label: 'せっかくだから',
                gloss: 'この機会を使い切る側。前向きなせっかく',
                words: [
                    {
                        en: 'might as well',
                        when: 'どうせなら、と流れで決める時。これが本命',
                        ex: 'We are already downtown. Might as well get dinner.',
                        exJa: 'もう街まで来てるし、せっかくだから飯食おう。',
                    },
                    {
                        en: 'while we are here',
                        when: '場所を理由にする時',
                        ex: 'While we are here, let us go see the castle.',
                        exJa: 'せっかく来たんだから城も見ていこう。',
                    },
                    {
                        en: 'since we came all this way',
                        when: '距離を理由にする時',
                        ex: 'Since we came all this way, let us stay one more night.',
                        exJa: 'せっかくここまで来たんだし、もう一泊しよう。',
                    },
                ],
            },
            {
                label: 'せっかくの〜が台無し',
                gloss: '貴重なものが潰れた',
                words: [
                    {
                        en: 'what a waste of ~',
                        when: '貴重な日や機会が潰れた時',
                        ex: 'Stuck inside all day. What a waste of good weather.',
                        exJa: '一日中中にいた。せっかくの天気が台無し。',
                    },
                    {
                        en: 'let ~ ruin',
                        when: '誰かのせいで潰れた時',
                        ex: 'Do not let one guy ruin your night off.',
                        exJa: '一人のせいでせっかくの休みの夜を潰すな。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: 'せっかく作ったのに食べてくれない。',
                bad: 'I cooked with much trouble but he does not eat.',
                badWhy: 'with much trouble は「苦労して」の直訳で、英語では出てこない語順。恨みが伝わる前に文が壊れる。',
                good: 'I went to all that trouble cooking and he will not even touch it.',
                goodJa: 'せっかく作ったのに、手もつけない。',
                alt: 'I cooked the whole thing and he did not eat a bite.',
                altJa: '全部作ったのに、一口も食べなかった。',
            },
            {
                ja: 'せっかくだから泊まっていきなよ。',
                bad: 'Because it is a rare chance, please stay.',
                badWhy: '理由を先に説明してしまうと、誘いではなく交渉になる。英語は状況を並べてから might as well で落とす。',
                good: 'You are already here. Might as well stay the night.',
                goodJa: 'もう来てるんだし、せっかくだから泊まってけよ。',
                alt: 'Come on, stay. When are you going to be out this way again?',
                altJa: '泊まってけって。次いつこっち来るんだよ。',
            },
            {
                ja: 'せっかくの休みが雨。',
                bad: 'My precious day off is rain.',
                badWhy: 'precious を足すと大げさになり、日本語の軽い落胆が重い嘆きに化ける。',
                good: 'First day off in weeks and it is pouring.',
                goodJa: '何週間ぶりの休みが土砂降り。',
                alt: 'What a waste of a day off.',
                altJa: 'せっかくの休みが台無し。',
            },
        ],
    },

    {
        id: 'sasuga',
        ja: 'さすが',
        dict: 'as expected',
        dictWhy:
            '褒めるつもりで as expected と言うと「まあ想定内だな」と上から採点した音になる。褒め言葉が評価に化ける。しかも「さすがに無理」の さすが には全く届かない。',
        corpus: { hits: 19288, pairs: 40, spread: 0.875, found: ['expected', 'right', 'okay'], solid: 1 },
        split: '褒める / さすがに(限度) / さすがの〜も',
        cores: [
            {
                label: '褒める・見直す',
                gloss: 'やっぱりこの人はすごい',
                words: [
                    {
                        en: 'Of course you did.',
                        when: '相手の実績を当たり前として持ち上げる時。これが一番さすが',
                        ex: 'Fixed it in five minutes? Of course you did.',
                        exJa: '5分で直した? さすが。',
                    },
                    {
                        en: 'That is why you are the ~',
                        when: '肩書きや役割に結びつけて褒める時',
                        ex: 'That is why you are the boss.',
                        exJa: 'さすが、伊達に上に立ってない。',
                    },
                    {
                        en: 'You never disappoint.',
                        when: '毎回やってくれる相手に',
                        ex: 'Another one out of nowhere. You never disappoint.',
                        exJa: 'またとんでもないの出してきた。さすが。',
                    },
                ],
            },
            {
                label: 'さすがに (いくらなんでも)',
                gloss: '限度の話。褒めではない',
                words: [
                    {
                        en: 'that is pushing it',
                        when: '限度を超えていると突っ込む時',
                        ex: 'Ten hours straight? That is pushing it.',
                        exJa: '10時間ぶっ通し? さすがにきつい。',
                    },
                    {
                        en: 'even I ~',
                        when: '自分基準でも無理だと言う時',
                        ex: 'Even I cannot eat three of those.',
                        exJa: 'さすがに3個は食えない。',
                    },
                ],
            },
            {
                label: 'さすがの〜も',
                gloss: 'あの人でさえ',
                words: [
                    {
                        en: 'even ~',
                        when: '例外だったはずの人が折れた時',
                        ex: 'Even he did not have an answer for that.',
                        exJa: 'さすがの彼も答えられなかった。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: 'さすが、仕事が早い。',
                bad: 'As expected, your work is fast.',
                badWhy: 'as expected は評価する側の言葉。褒めたつもりが採点になり、相手はうれしくない。',
                good: 'Of course you were done already.',
                goodJa: 'さすが、もう終わってる。',
                alt: 'That is why we give it to you.',
                altJa: 'だからあんたに頼むんだよ。',
            },
            {
                ja: 'さすがに今日は無理。',
                bad: 'As expected, today is impossible.',
                badWhy: 'ここの「さすがに」は褒めでも予想でもなく限度。as expected では意味がひっくり返る。',
                good: 'Not today. That is pushing it even for me.',
                goodJa: '今日は無理。さすがにきつい。',
                alt: 'I have got nothing left today.',
                altJa: '今日はもう残ってない。',
            },
            {
                ja: 'さすがの彼も黙った。',
                bad: 'As expected, he was also silent.',
                badWhy: 'also を入れると「彼も一緒に黙った」になる。あの人でさえ、という逆転が消える。',
                good: 'Even he went quiet after that.',
                goodJa: 'さすがの彼もそれで黙った。',
                alt: 'That shut even him up.',
                altJa: 'あれにはさすがの彼も黙った。',
            },
        ],
    },

    {
        id: 'tekitou',
        ja: '適当',
        dict: 'appropriate / random',
        dictWhy:
            '辞書は正反対の2つを同時に載せる。日本人は真面目な方の appropriate を選び、「適当でいいよ」を「ちゃんとやれ」の意味で伝えてしまう。事故率が一番高い語。',
        corpus: { hits: 4768, pairs: 40, spread: 0.95, found: ['randomly', 'random', 'chose'], solid: 1 },
        split: '手を抜く / 決めずに選ぶ / 口から出まかせ',
        cores: [
            {
                label: '手を抜く・雑',
                gloss: '力を入れない。悪い意味の適当',
                words: [
                    {
                        en: 'slap ~ together',
                        when: '雑に組み上げた時',
                        ex: 'He slapped the report together in ten minutes.',
                        exJa: '10分で適当にレポートをでっち上げた。',
                    },
                    {
                        en: 'wing it',
                        when: '準備なしで出たとこ勝負する時',
                        ex: 'I did not prepare anything. I will just wing it.',
                        exJa: '何も準備してない。適当にやる。',
                    },
                    {
                        en: 'do not overthink it',
                        when: '相手に「適当でいい」と許可を出す時。ここが本命',
                        ex: 'Just write something. Do not overthink it.',
                        exJa: '何か書いといて。適当でいいから。',
                    },
                ],
            },
            {
                label: '決めずに選ぶ',
                gloss: '何でもいい。中立の適当',
                words: [
                    {
                        en: 'whatever',
                        when: '選択を相手か運に投げる時',
                        ex: 'Just grab whatever.',
                        exJa: '適当に取ってきて。',
                    },
                    {
                        en: 'Surprise me.',
                        when: '注文や選択を丸投げする時',
                        ex: 'What should I order for you? Surprise me.',
                        exJa: '何頼む? 適当でいい。',
                    },
                    {
                        en: 'at random',
                        when: '無作為だと事実として言う時',
                        ex: 'I picked one at random.',
                        exJa: '適当に1個選んだ。',
                    },
                ],
            },
            {
                label: '口から出まかせ',
                gloss: '根拠がない。人を殴る適当',
                words: [
                    {
                        en: 'make stuff up',
                        when: 'その場ででっち上げていると指摘する時',
                        ex: 'He is making it up as he goes.',
                        exJa: 'あいつ、しゃべりながら適当に作ってる。',
                    },
                    {
                        en: 'off the top of my head',
                        when: '自分で「適当だけど」と前置きする時。非難ではない',
                        ex: 'Off the top of my head, maybe forty.',
                        exJa: '適当だけど、40くらいかな。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '適当でいいよ。',
                bad: 'It is okay to be appropriate.',
                badWhy: '真逆が出る。相手は「きちんとやれと言われた」と受け取る。辞書事故の典型。',
                good: 'Do not overthink it.',
                goodJa: '適当でいいって。',
                alt: 'However you want. It does not have to be perfect.',
                altJa: '好きにやって。完璧じゃなくていい。',
            },
            {
                ja: '適当に選んで。',
                bad: 'Please choose appropriately.',
                badWhy: '「妥当な基準で厳選しろ」に聞こえる。投げやりさが正反対の緊張感になる。',
                good: 'Just pick whatever.',
                goodJa: '適当に選んで。',
                alt: 'Surprise me.',
                altJa: '任せる。',
            },
            {
                ja: '適当なこと言わないで。',
                bad: 'Do not say appropriate things.',
                badWhy: 'ここでも真逆。「まともなことを言うな」になる。',
                good: 'Do not just make stuff up.',
                goodJa: '適当なこと言うな。',
                alt: 'You are guessing, are you not?',
                altJa: 'それ適当に言ってるだろ。',
            },
        ],
    },

    {
        id: 'muri',
        ja: '無理',
        dict: 'impossible',
        dictWhy:
            'impossible は物理的に不可能。人が「無理」と言う時の9割は「行けない / やりたくない / もう限界」で、impossible を使うと大げさで壊れた人に聞こえる。',
        corpus: { hits: 39739, pairs: 40, spread: 0.825, found: ["impossible", "couldn't", "ii"], solid: 1 },
        split: '予定が無理 / 気持ちが無理 / もう限界 / 無理するな',
        cores: [
            {
                label: '予定が無理',
                gloss: '都合がつかない',
                words: [
                    {
                        en: 'that is not going to work',
                        when: '日程を断る時の基本形',
                        ex: 'Friday is not going to work for me.',
                        exJa: '金曜は無理。',
                    },
                    {
                        en: 'I cannot make it',
                        when: '行けないと伝える時',
                        ex: 'I cannot make it tonight, sorry.',
                        exJa: '今夜は無理だ、ごめん。',
                    },
                    {
                        en: 'I am swamped',
                        when: '忙しくて手が出ない時',
                        ex: 'I am swamped this week.',
                        exJa: '今週は無理。手一杯。',
                    },
                ],
            },
            {
                label: '気持ちが無理',
                gloss: '受け付けない。生理的な無理',
                words: [
                    {
                        en: 'I cannot deal with ~',
                        when: '相手や状況に耐えられない時',
                        ex: 'I cannot deal with him today.',
                        exJa: '今日はあいつ無理。',
                    },
                    {
                        en: 'not my thing',
                        when: '好みに合わないと軽く言う時',
                        ex: 'Horror movies are just not my thing.',
                        exJa: 'ホラーは無理。',
                    },
                ],
            },
            {
                label: 'もう無理',
                gloss: '限界。体力か気力が尽きた',
                words: [
                    {
                        en: 'I am done',
                        when: '打ち切る時。一番短い',
                        ex: 'I am done. I am going home.',
                        exJa: 'もう無理。帰る。',
                    },
                    {
                        en: 'I have got nothing left',
                        when: '出し切って空になった時',
                        ex: 'Do not ask me tonight. I have got nothing left.',
                        exJa: '今夜は聞かないでくれ。もう無理。',
                    },
                    {
                        en: 'I cannot keep this up',
                        when: '続けられないと言う時',
                        ex: 'I cannot keep this up much longer.',
                        exJa: 'この状態はもう無理。',
                    },
                ],
            },
            {
                label: '無理するな',
                gloss: '相手を止める側',
                words: [
                    {
                        en: 'do not push yourself',
                        when: '無理をしている相手に',
                        ex: 'Do not push yourself. It can wait.',
                        exJa: '無理しないで。それは後でいい。',
                    },
                    {
                        en: 'do not overdo it',
                        when: 'やりすぎを止める時',
                        ex: 'Go for a walk, but do not overdo it.',
                        exJa: '散歩はいいけど、無理はするな。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '明日は無理。',
                bad: 'Tomorrow is impossible.',
                badWhy: '物理法則の話になる。断りのつもりが、大げさで冷たい宣言になる。',
                good: 'Tomorrow is no good for me.',
                goodJa: '明日は無理。',
                alt: 'I cannot do tomorrow. How is Thursday?',
                altJa: '明日は無理。木曜は?',
            },
            {
                ja: 'もう無理。',
                bad: 'It is already impossible.',
                badWhy: '主語が状況になっていて、自分が限界だという話が消える。',
                good: 'I am done.',
                goodJa: 'もう無理。',
                alt: 'I have got nothing left.',
                altJa: 'もう空っぽ。',
            },
            {
                ja: '無理しないでね。',
                bad: 'Please do not do impossible.',
                badWhy: '文として成立していない。無理は名詞にできない。',
                good: 'Do not push yourself too hard.',
                goodJa: '無理しすぎないで。',
                alt: 'Take it easy, seriously.',
                altJa: 'マジで無理しないで。',
            },
        ],
    },

    {
        id: 'chanto',
        ja: 'ちゃんと',
        dict: 'properly',
        dictWhy:
            'properly は硬い。親が子に言うか英国寄りの言い方で、日常会話に毎回つけると外国人の英語になる。日本語のちゃんとは、動詞の中に溶けて消えるほうが自然。',
        corpus: { hits: 50276, pairs: 40, spread: 0.875, found: ['properly', 'answer', 'question'], solid: 1 },
        split: '漏れなく / きちんとした物・人 / 念を押す',
        cores: [
            {
                label: '漏れなく・最後まで',
                gloss: '途中で止めない',
                words: [
                    {
                        en: 'actually',
                        when: '本当にやったのか疑う時。ちゃんとの半分はこれ',
                        ex: 'Did you actually read it?',
                        exJa: 'ちゃんと読んだ?',
                    },
                    {
                        en: 'all the way',
                        when: '最後まで、を物理的に言う時',
                        ex: 'Close it all the way.',
                        exJa: 'ちゃんと閉めて。',
                    },
                ],
            },
            {
                label: 'きちんとした物・人',
                gloss: '中身のあるもの。名詞側のちゃんと',
                words: [
                    {
                        en: 'a real ~',
                        when: '間に合わせでない本物を求める時',
                        ex: 'Sit down and eat a real meal for once.',
                        exJa: 'たまには座ってちゃんとしたもん食え。',
                    },
                    {
                        en: 'decent',
                        when: '最低限まともな水準を言う時',
                        ex: 'I have not had a decent night of sleep in a week.',
                        exJa: '一週間ちゃんと寝てない。',
                    },
                    {
                        en: 'an actual ~',
                        when: '肩書きや実体を求める時',
                        ex: 'He needs to get an actual job.',
                        exJa: 'あいつはちゃんとした仕事に就くべきだ。',
                    },
                ],
            },
            {
                label: '念を押す',
                gloss: '忘れるな側のちゃんと',
                words: [
                    {
                        en: 'make sure',
                        when: '確認を頼む時',
                        ex: 'Make sure you lock the back door.',
                        exJa: '裏口ちゃんと閉めといて。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: 'ちゃんと聞いてる?',
                bad: 'Are you listening properly?',
                badWhy: '通じるが、教師が生徒に言う音になる。友達や家族には硬すぎる。',
                good: 'Are you actually listening?',
                goodJa: 'ちゃんと聞いてる?',
                alt: 'You are not even listening, are you?',
                altJa: '聞いてないだろ。',
            },
            {
                ja: 'ちゃんと寝なよ。',
                bad: 'Sleep properly.',
                badWhy: '寝方の姿勢を注意しているように響く。時間が足りていない話が出ない。',
                good: 'Get some real sleep.',
                goodJa: 'ちゃんと寝ろ。',
                alt: 'You need a full night, not four hours.',
                altJa: '4時間じゃなくて、ちゃんと一晩寝ろ。',
            },
            {
                ja: 'ちゃんと謝った?',
                bad: 'Did you apologize properly?',
                badWhy: '謝罪の作法の話になる。中身があったかを問う日本語とずれる。',
                good: 'Did you actually apologize, or did you just say sorry?',
                goodJa: 'ちゃんと謝った? それとも ごめん って言っただけ?',
                alt: 'Did you own it, or did you just move on?',
                altJa: '自分の非を認めた? それとも流しただけ?',
            },
        ],
    },

    {
        id: 'shindoi',
        ja: 'しんどい',
        dict: 'tired',
        dictWhy:
            'tired は体だけ。しんどいは体・心・状況の3方向に伸びる。全部 tired で処理すると、心のしんどさが「寝れば治る話」に矮小化される。',
        corpus: { hits: 3022, pairs: 36, spread: 0.889, found: ["tough", "tired", "i'm fine"], solid: 1 },
        split: '体がしんどい / 心がしんどい / 状況がしんどい',
        cores: [
            {
                label: '体',
                gloss: '動けない',
                words: [
                    {
                        en: 'wiped',
                        when: '出し切って動けない時',
                        ex: 'I am wiped. I am going to bed.',
                        exJa: 'しんどい。もう寝る。',
                    },
                    {
                        en: 'running on fumes',
                        when: 'ガス欠寸前で持たせている時',
                        ex: 'I have been running on fumes since Monday.',
                        exJa: '月曜からずっとしんどい状態で回してる。',
                    },
                ],
            },
            {
                label: '心',
                gloss: '気力が削られる',
                words: [
                    {
                        en: 'it is a lot',
                        when: '量と重さで参っている時。今一番使われる言い方',
                        ex: 'Work has been a lot lately.',
                        exJa: '最近仕事がしんどい。',
                    },
                    {
                        en: 'draining',
                        when: '相手や場が気力を吸う時',
                        ex: 'That meeting was draining.',
                        exJa: 'あの会議しんどかった。',
                    },
                    {
                        en: 'burnt out',
                        when: '燃え尽きている時',
                        ex: 'I am not lazy, I am burnt out.',
                        exJa: 'サボってるんじゃない。しんどいんだ。',
                    },
                ],
            },
            {
                label: '状況',
                gloss: '期間や環境がきつい',
                words: [
                    {
                        en: 'rough',
                        when: '期間がきつかった時',
                        ex: 'It has been a rough month.',
                        exJa: '今月はしんどかった。',
                    },
                    {
                        en: 'brutal',
                        when: '容赦なくきつい時',
                        ex: 'That commute is brutal.',
                        exJa: 'あの通勤はしんどい。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '最近しんどい。',
                bad: 'Recently I am tired.',
                badWhy: 'recently と現在形が英語では並ばない。しかも tired だと「昨日寝てないだけ」に落ちる。',
                good: 'It has been a lot lately.',
                goodJa: '最近しんどい。',
                alt: 'I am running on fumes.',
                altJa: 'もうガス欠。',
            },
            {
                ja: 'あの人と話すのしんどい。',
                bad: 'Talking with that person is tired.',
                badWhy: 'tired は人の状態にしかつかない。行為を主語にするなら draining / exhausting 側になる。',
                good: 'Talking to him is exhausting.',
                goodJa: 'あいつと話すのしんどい。',
                alt: 'Every conversation with him drains me.',
                altJa: 'あいつと話すたびに削られる。',
            },
            {
                ja: 'しんどいなら休みなよ。',
                bad: 'If you are tired, please rest.',
                badWhy: '間違いではないが、体調の話だけになる。心が限界の相手には届かない。',
                good: 'If it is too much, take the day.',
                goodJa: 'しんどいなら今日は休め。',
                alt: 'You do not have to push through this one.',
                altJa: '今回は無理に乗り切らなくていい。',
            },
        ],
    },

    {
        id: 'kuyashii',
        ja: '悔しい',
        dict: 'frustrating / regretful',
        dictWhy:
            'regret は「やらなきゃよかった」で、悔しいは「負けた自分に腹が立つ」。別物。1語で言えないので英語は文で作るしかない。ここを知らないと一生 I am frustrated で済ませることになる。',
        corpus: { hits: 2196, pairs: 40, spread: 0.95, found: ['frustrating', 'jealous', 'bit'], solid: 1 },
        split: '負けて悔しい / 自分に腹が立つ / 悔しさをバネに',
        cores: [
            {
                label: '負けて悔しい',
                gloss: '結果が残ってしまった',
                words: [
                    {
                        en: 'it kills me that ~',
                        when: '結果が刺さって抜けない時',
                        ex: 'It kills me that we lost by one point.',
                        exJa: '1点差で負けたのが悔しい。',
                    },
                    {
                        en: 'that one is going to sting',
                        when: '後を引くと分かっている時',
                        ex: 'That one is going to sting for a while.',
                        exJa: 'あれはしばらく悔しい。',
                    },
                    {
                        en: 'I cannot let it go',
                        when: '忘れられない時',
                        ex: 'I still cannot let that game go.',
                        exJa: 'あの試合、まだ悔しい。',
                    },
                ],
            },
            {
                label: '自分に腹が立つ',
                gloss: '相手ではなく自分が原因',
                words: [
                    {
                        en: 'kicking myself',
                        when: 'やらなかった自分を責める時',
                        ex: 'I am kicking myself for not asking.',
                        exJa: '聞かなかったのが悔しい。',
                    },
                    {
                        en: 'I hate that I ~',
                        when: '自分の反応が許せない時',
                        ex: 'I hate that I froze up in there.',
                        exJa: 'あそこで固まった自分が悔しい。',
                    },
                ],
            },
            {
                label: '悔しさをバネに',
                gloss: '次に使う',
                words: [
                    {
                        en: 'use it as fuel',
                        when: '燃料にすると宣言する時',
                        ex: 'I am not over it. I am using it as fuel.',
                        exJa: '納得してない。悔しさを燃料にする。',
                    },
                    {
                        en: 'prove them wrong',
                        when: '見返す時',
                        ex: 'Fine. I will prove them wrong.',
                        exJa: 'いいさ。見返してやる。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '悔しい。',
                bad: 'I am regretful.',
                badWhy: 'regret は自分の選択への後悔で、負けて腹が立っている感情とは別。そもそも会話でこの形は使わない。',
                good: 'That one is going to sting for a while.',
                goodJa: 'あれはしばらく悔しい。',
                alt: 'I hate that I let that happen.',
                altJa: 'あれを許した自分が悔しい。',
            },
            {
                ja: '言い返せなかったのが悔しい。',
                bad: 'I regret that I could not say back.',
                badWhy: 'say back は英語にない。悔しさの中心は自分を責めていることなので、そこを動詞にする。',
                good: 'I am kicking myself for not saying anything.',
                goodJa: '何も言い返さなかったのが悔しい。',
                alt: 'It kills me that I just stood there.',
                altJa: '突っ立ってただけの自分が悔しい。',
            },
            {
                ja: '悔しくないの?',
                bad: 'Are you not frustrated?',
                badWhy: '間違いではないが弱い。日本語は「そのまま流すのか」と相手を突く言葉なので、そこを直接聞く。',
                good: 'You are just going to let that go?',
                goodJa: 'それ、流すの? 悔しくないの?',
                alt: 'Does that not bother you at all?',
                altJa: '何とも思わないの?',
            },
        ],
    },

    {
        id: 'iikagen',
        ja: 'いい加減',
        dict: 'moderate / irresponsible',
        dictWhy:
            '見た目が同じまま、怒鳴る「いい加減にしろ」と、催促の「いい加減やれよ」と、人を評する「いい加減なやつ」に割れる。辞書の moderate はそのどれでもない。',
        corpus: { hits: 2399, pairs: 40, spread: 0.95, found: ["fuck's", "fuck's sake", "please"], solid: 1 },
        split: 'もう限界だ / そろそろやれ / 雑で無責任',
        cores: [
            {
                label: 'いい加減にしろ',
                gloss: '止めろ。怒りの側',
                words: [
                    {
                        en: 'Enough.',
                        when: '一言で断ち切る時。最も強い',
                        ex: 'Enough. Sit down.',
                        exJa: 'いい加減にしろ。座れ。',
                    },
                    {
                        en: 'Knock it off.',
                        when: 'ふざけを止める時',
                        ex: 'Both of you, knock it off.',
                        exJa: '二人ともいい加減にしろ。',
                    },
                    {
                        en: 'I have had it with ~',
                        when: '我慢の限界を宣言する時',
                        ex: 'I have had it with this whole thing.',
                        exJa: 'この件、いい加減うんざりだ。',
                    },
                ],
            },
            {
                label: 'いい加減〜しろよ',
                gloss: 'そろそろ。催促の側',
                words: [
                    {
                        en: 'it is about time you ~',
                        when: '遅すぎると突く時',
                        ex: 'It is about time you got your own place.',
                        exJa: 'いい加減 家を出ろよ。',
                    },
                    {
                        en: 'at some point you are going to have to ~',
                        when: '避けられないと突きつける時',
                        ex: 'At some point you are going to have to deal with it.',
                        exJa: 'いい加減 向き合うことになるぞ。',
                    },
                ],
            },
            {
                label: 'いい加減な',
                gloss: '雑・無責任。人と仕事につく',
                words: [
                    {
                        en: 'flaky',
                        when: '約束を守らない人に',
                        ex: 'He is flaky. You cannot count on him.',
                        exJa: 'あいついい加減だから、当てにならない。',
                    },
                    {
                        en: 'sloppy',
                        when: '仕事が雑な時',
                        ex: 'This is sloppy work.',
                        exJa: 'これはいい加減な仕事だ。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: 'いい加減にして。',
                bad: 'Please do it moderately.',
                badWhy: '「ほどほどにやってください」という指示になる。怒っていることがどこにも出ない。',
                good: 'Enough.',
                goodJa: 'いい加減にして。',
                alt: 'Knock it off, seriously.',
                altJa: 'マジでいい加減にしろ。',
            },
            {
                ja: 'いい加減 覚えろよ。',
                bad: 'Learn it moderately.',
                badWhy: '催促の意味が消えて、学び方の指示になる。時間が経ちすぎている、が核。',
                good: 'It is about time you learned this.',
                goodJa: 'いい加減これ覚えろよ。',
                alt: 'How many times do we have to do this?',
                altJa: '何回同じことやるんだ。',
            },
            {
                ja: 'あいつ、いい加減なんだよ。',
                bad: 'He is moderate.',
                badWhy: '「穏健派だ」と伝わる。政治の話に聞こえることすらある。',
                good: 'He is flaky. You cannot count on him.',
                goodJa: 'あいついい加減だから、当てにならない。',
                alt: 'He says he will and then he does not.',
                altJa: 'やるって言ってやらないタイプ。',
            },
        ],
    },

    {
        id: 'toriaezu',
        ja: 'とりあえず',
        dict: '(for the time being)',
        dictWhy:
            '対訳を掘ると上位に usb port が出てくる。訳語が無く英語側で消える語なので、機械にも人にも拾えない。「とりあえず」に当たる英単語を探している限り出てこない。',
        corpus: { hits: 14476, pairs: 40, spread: 0.95, found: ['usb port', 'usb', 'uh now'], solid: 1 },
        split: '今はこれで / 最初に一杯 / まず先に',
        cores: [
            {
                label: '今はこれで',
                gloss: '暫定。あとで変える前提',
                words: [
                    {
                        en: 'for now',
                        when: '仮決めする時。これが本命',
                        ex: 'Let us go with this for now.',
                        exJa: 'とりあえずこれでいこう。',
                    },
                    {
                        en: 'that will do for now',
                        when: '完璧ではないが今は足りる時',
                        ex: 'It is not pretty, but that will do for now.',
                        exJa: '雑だけど、とりあえずこれでいい。',
                    },
                ],
            },
            {
                label: '最初に一杯',
                gloss: '店での とりあえず',
                words: [
                    {
                        en: 'to start',
                        when: '注文の一杯目',
                        ex: 'I will take a beer to start.',
                        exJa: 'とりあえずビール。',
                    },
                    {
                        en: 'we will start with ~',
                        when: '全員分をまとめて頼む時',
                        ex: 'We will start with a round of beers.',
                        exJa: 'とりあえずビール人数分で。',
                    },
                ],
            },
            {
                label: 'まず先に',
                gloss: '順番の話',
                words: [
                    {
                        en: 'first things first',
                        when: '順番を整える時',
                        ex: 'First things first. Did you eat?',
                        exJa: 'とりあえず、飯は食ったのか。',
                    },
                    {
                        en: 'let us just ~',
                        when: '考える前に動く時',
                        ex: 'Let us just get in the car and figure it out on the way.',
                        exJa: 'とりあえず車乗ろう。道中で考える。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: 'とりあえずビール。',
                bad: 'For the time being, beer.',
                badWhy: 'for the time being は契約や方針に使う硬い言葉。居酒屋の一言が役所の通達になる。',
                good: 'A beer to start.',
                goodJa: 'とりあえずビール。',
                alt: 'We will start with beers all around.',
                altJa: 'とりあえず全員ビールで。',
            },
            {
                ja: 'とりあえずやってみる。',
                bad: 'For the time being, I will try.',
                badWhy: '前置きが重すぎて、軽く試す話に見えない。英語は just が「とりあえず」を運ぶ。',
                good: 'I will just give it a shot and see.',
                goodJa: 'とりあえずやって様子見る。',
                alt: 'Let us try it and go from there.',
                altJa: 'とりあえずやって、そこから考える。',
            },
            {
                ja: 'とりあえず今日は帰る。',
                bad: 'For the time being, I go home today.',
                badWhy: '時制も語順も崩れる。英語は「今日はここまで」と打ち切りの形にする。',
                good: 'I am calling it for today.',
                goodJa: 'とりあえず今日は終わりにする。',
                alt: 'I will pick this up tomorrow.',
                altJa: '続きは明日やる。',
            },
        ],
    },

    {
        id: 'mottainai',
        ja: 'もったいない',
        dict: 'waste',
        dictWhy:
            'waste は当たっている。ただし当たるのは物を捨てる時だけ。人・才能・機会に向けた もったいない は waste では出ず、別の形に化ける。半分だけ正しい辞書は、半分の場面で黙る。',
        corpus: { hits: 2428, pairs: 40, spread: 0.5, found: ['waste', 'such a waste', 'what a waste'], solid: 1 },
        split: '捨てるのが惜しい / 人や才能に対して / 機会を逃す',
        cores: [
            {
                label: '捨てるのが惜しい',
                gloss: '物。辞書が当たる核',
                words: [
                    {
                        en: 'it is still good',
                        when: '捨てようとしている相手を止める時',
                        ex: 'Do not throw that out, it is still good.',
                        exJa: '捨てないで、まだいける。もったいない。',
                    },
                    {
                        en: 'I hate to waste it',
                        when: '自分が捨てたくない時',
                        ex: 'I hate to waste it, so I will take it home.',
                        exJa: 'もったいないから持って帰る。',
                    },
                ],
            },
            {
                label: '人や才能に対して',
                gloss: '釣り合っていない',
                words: [
                    {
                        en: 'beneath ~',
                        when: 'その人には格が下すぎる時',
                        ex: 'That job is beneath her.',
                        exJa: '彼女にはもったいない仕事だ。',
                    },
                    {
                        en: 'wasted on ~',
                        when: '価値の分からない相手に渡っている時',
                        ex: 'That role was wasted on him.',
                        exJa: 'あの役は彼にはもったいなかった。',
                    },
                    {
                        en: 'selling yourself short',
                        when: '自分を安く見積もっている相手に',
                        ex: 'You are selling yourself short with this place.',
                        exJa: 'ここにいるのはもったいない。',
                    },
                ],
            },
            {
                label: '機会を逃す',
                gloss: 'やらないほうが損',
                words: [
                    {
                        en: 'you would be missing out',
                        when: '来ない相手を誘い直す時',
                        ex: 'You are not coming? You would be missing out.',
                        exJa: '来ないの? もったいない。',
                    },
                    {
                        en: 'such a shame',
                        when: '惜しいと嘆く時',
                        ex: 'You have the ticket and you are not going? Such a shame.',
                        exJa: 'チケットあるのに行かないの? もったいない。',
                    },
                ],
            },
        ],
        says: [
            {
                ja: '捨てるのもったいないよ。',
                bad: 'It is waste to throw away.',
                badWhy: 'waste は数えられる名詞で、a waste か wasteful になる。冠詞が落ちた瞬間に子供の英語に聞こえる。',
                good: 'Do not toss it. It is still good.',
                goodJa: '捨てるなって。まだ使える。',
                alt: 'That is such a waste.',
                altJa: 'それはもったいない。',
            },
            {
                ja: 'あの人にはもったいない仕事だ。',
                bad: 'That job is waste for her.',
                badWhy: 'waste for という形が英語に無い。釣り合いの話なので、上下で言う。',
                good: 'That job is beneath her.',
                goodJa: '彼女にはもったいない仕事だ。',
                alt: 'She is way overqualified for that.',
                altJa: '彼女にあれは役不足だ。',
            },
            {
                ja: '行かないの? もったいない。',
                bad: 'You do not go? It is waste.',
                badWhy: '疑問形も冠詞も落ちる。ここは損得ではなく「逃す」で言うのが英語。',
                good: 'You are not going? You would be missing out.',
                goodJa: '行かないの? もったいないって。',
                alt: 'Come on, you will regret that.',
                altJa: '行けって。あとで後悔するぞ。',
            },
        ],
    },
];

/** 直訳不可度の見出し */
export function spreadLabel(spread: number): string {
    if (spread >= 0.9) return '毎回ちがう';
    if (spread >= 0.75) return '安定しない';
    if (spread >= 0.6) return '寄りはある';
    return '1対1に近い';
}

/** 収録している英語の総数 */
export const NAMAHANKA_STATS = {
    words: NAMAHANKA.reduce((n, e) => n + e.cores.reduce((m, c) => m + c.words.length, 0), 0),
    cores: NAMAHANKA.reduce((n, e) => n + e.cores.length, 0),
    says: NAMAHANKA.reduce((n, e) => n + e.says.length, 0),
} as const;
