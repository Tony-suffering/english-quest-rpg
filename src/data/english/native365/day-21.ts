import type { Native365Day } from '@/types/native365';

/**
 * Day 21
 *
 * 発音: want / what / that の強弱 -- 機能語と内容語の境界が曖昧な3語
 * 文法: 仮主語 It is ... that / for ... -- 主語が重い時の英語の逃げ方
 */

export const DAY_21: Native365Day = {
    day: 21,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 週末の夕方、まだ明るい時間の居酒屋
    // ══════════════════════════════════════════════════
    opening: {
        scene: '土曜の夕方5時、まだ外が明るい時間の居酒屋。仕事を早上がりしたユキが「want / what / that が聞き取れない」とノートを広げる。',
        lines: [
            { char: 'yuki',    text: "I want that って文、what I want that なのか I want that なのか、音でどっちか分からんくて。" },
            { char: 'master',  text: "want と that は内容語に見えて文脈で弱化する。what は疑問詞で強くなる時と関係詞で弱くなる時がある。今日はそこを分ける。" },
            { char: 'lisa',    text: "And after that, we're doing 仮主語. It is... that構文。日本語の主語の重さを英語にどう逃がすか。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: want / what / that の強弱
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'want / what / that の強弱 -- 同じ綴りでも役で音が変わる',
        subtitle: '内容語に見えるが機能語として使われる瞬間があり、そこで弱化する。',
        intro: {
            question: "なぜ I want that と What\\'s that? で that の音量が違うのか?",
            insight: "日本語は語ごとの音量差が少ない。「あれが欲しい」の「あれ」も「欲しい」も均等に発音される。英語は違う。同じ that でも文末で指示代名詞なら強く (/ðæt/)、関係詞や接続詞として文中に埋もれる時は弱く (/ðət/) 発音される。\\n\\nwant / what / that の3語は「表は内容語、裏は機能語」の両面性を持つ。want は動詞だが I want to... の時は to とくっついて /ˈwɑnə/ に崩れる。what は疑問詞なら強いが、関係詞 (That\\'s what I need) なら中程度。that は指示詞なら強く、接続詞・関係詞なら schwa 化して /ðət/ に落ちる。\\n\\nこの3語が「文中でどの役をやっているか」を音で出し分けられると、ネイティブの文の流れに乗れる。逆に全部均等に読んでいる限り、あなたの英語は「教科書の棒読み」の壁を超えられない。",
        },
        tldr: 'want / what / that の3語を、指示か機能かで音量を3段階に分ける。',
        items: [
            {
                id: 'd21-p-01-want',
                label: 'want -- 動詞は強く、want to は崩す',
                trigger: "'I want to go home' を発音しろ。",
                points: {
                    core: { en: '/wɑnt/ (stressed), /ˈwɑnə/ before to', ja: '単独の動詞なら強勢あり。want to はほぼ wanna に融合する。' },
                    nuance: { en: 'I WAN-uh-go home. Not I-want-to-go-home.', ja: 'want の t が消え、to の o も消え、wanna の1塊になる。' },
                    shift: { en: "Formal: I want to go. Casual: I wanna go. Angry: I WANT to GO.", ja: '強調したい時だけ want to を分離して両方に強勢を置く。通常は融合。' },
                    native: { en: "I wanna grab a drink. You wanna come?", ja: '誘いの定型。want to で区切って発音すると硬く聞こえる。' },
                },
                trap: 'want to を常に「ウォント・トゥー」と2語で読む。英語の会話では99%融合する。',
                tip: 'want の後ろに to が来たら、t を一つだけ残して「ワナ」で出す練習を100回。',
                reactions: {
                    master: 'want は他動詞だが want to 構文では半助動詞化する。音もそれを反映して融合する。',
                    lisa: "Nobody I know says 'I want to' slowly in conversation. It's always 'I wanna', always.",
                    takeshi: "want to を分けて読む限り、お前の英語は「教科書が話してる」感が抜けねえ。wanna で崩せ。",
                    yuki: '学校でも wanna って書くなって言われたけど、音では wanna なんや…ややこしい。',
                    kenji: '現場で Do you want to help? を Do you wanna help? で言えたら距離感近くなる。',
                    mina: 'テキストでも wanna って打つの、ちょい軽めの関係やからこそ。want to は硬すぎやねん。',
                },
            },
            {
                id: 'd21-p-02-what-question',
                label: 'what -- 疑問詞は強く、関係詞は弱く',
                trigger: "'What do you want? / That\\'s what I want.' を読み分けろ。",
                points: {
                    core: { en: 'WHAT do you want? (strong) / That\'s what I want. (reduced)', ja: '疑問詞の what は強勢、関係詞の what は文の強勢を他に譲る。' },
                    nuance: { en: "Question WHAT = full /wʌt/. Relative what = /wət/, barely there.", ja: '同じ綴りでも役で母音の明瞭さが変わる。' },
                    shift: { en: "What's up = WUSS-up. Casual reduction.", ja: 'カジュアルでは What\'s が wus に崩れ、what の t が s に溶ける。' },
                    native: { en: "That's WHAT I needed. (contrastive stress on what)", ja: '「それこそが」の対比では関係詞の what でも強勢が戻る。' },
                },
                trap: '全ての what を疑問詞のつもりで強く読む。関係詞 what は埋もれるのが自然。',
                tip: '疑問文の冒頭なら強く、文の真ん中で関係詞なら音量を半分に落とす。',
                reactions: {
                    master: '疑問詞と関係詞の機能差が音量差に現れる。英語は機能を音で見せる言語。',
                    lisa: "'What do you want' with a loud WHAT sounds normal. 'That's what I want' with a loud WHAT sounds like a fight.",
                    takeshi: '関係詞の what まで力入れて読むと、ケンカ売ってるみたいに聞こえる。気をつけろ。',
                    yuki: '疑問詞と関係詞で音量違うって、言われてみれば当たり前やけど意識したことなかった。',
                    kenji: "That's what I meant. これを現場でサラッと言えたら、誤解解消の速度上がる。",
                    mina: "\"What\\'s up\" を「ワッツアップ」て棒読みする日本人多いけど、ネイティブは「ワサッ」やん。",
                },
            },
            {
                id: 'd21-p-03-that-demonstrative',
                label: 'that -- 指示詞は強く /ðæt/',
                trigger: "'That\\'s mine.' と 'The book that I read' を読み分けろ。",
                points: {
                    core: { en: "THAT's mine. (demonstrative, /ðæt/)", ja: '指示代名詞の that は明瞭な /æ/ 母音で強勢を取る。' },
                    nuance: { en: "The book THAT I read. (relative, /ðət/ or silent)", ja: '関係詞の that は schwa 化、または完全に省略される。' },
                    shift: { en: "'I know (that) he came' -- that often drops entirely.", ja: 'その中でも接続詞 that は省略可能。会話ではほぼ落ちる。' },
                    native: { en: "THAT is exactly what I meant. (stressed demonstrative)", ja: '強調の that は母音を伸ばし気味に /ðæːt/ で出す。' },
                },
                trap: '関係詞・接続詞の that まで強く読む。耳にも重く、話者にも疲労を呼ぶ。',
                tip: '指示詞 that だけ /ðæt/、それ以外の that は /ðət/ か無音、と物理的に区別する。',
                reactions: {
                    master: '同一綴りの that が機能によって母音を変える。英語の音声経済学。',
                    lisa: "When I speak fast I literally skip the relative 'that'. The book I read. Done.",
                    takeshi: "日本人は that を全部 /ðæt/ で出す癖がある。関係詞は捨てろ、と物理的に思え。",
                    yuki: 'the book that I read、that 省略していいって中学で聞いたけど、音でも消える話は初耳。',
                    kenji: "現場で 'the part that broke' より 'the part broke' で十分通じる。省力化や。",
                    mina: 'DM で "the thing I like" って書くやん。that なしでも通じるし、音でも that は消す派やわ。',
                },
            },
            {
                id: 'd21-p-04-what-that',
                label: "what I want / that I want -- 関係詞の連続",
                trigger: "'That\\'s what that is.' を発音しろ。",
                points: {
                    core: { en: "THAT's / what / THAT is.", ja: '1つ目の that は強 (指示)、what は中 (関係)、2つ目の that は強 (補語の主語)。' },
                    nuance: { en: "Three words, three different weights. Don't flatten them.", ja: '同じ語が連続しても、機能が違えば音量が違う。フラットに読むと意味が飛ぶ。' },
                    shift: { en: "Fast: THAZ-wut-THAT-iz. Merging and flapping happen together.", ja: '早口では that\'s の t が z 化、what の t が flap、文全体が融合する。' },
                    native: { en: "That's what that is -- nothing more.", ja: '「それはそういうものだ」の諦めの定型。リズムの対比で意味が立つ。' },
                },
                trap: 'that / what / that を全部同じ音量で読む。ネイティブには「壊れた録音」に聞こえる。',
                tip: '1音節目と3音節目を強く、真ん中の what を谷に。英語は山谷のリズム。',
                reactions: {
                    master: '同形異機能の語が連続する時こそ、音の対比で文構造を浮かび上がらせる。',
                    lisa: "'That's what that is' -- I'd hit the THATs hard and basically swallow the WHAT.",
                    takeshi: '3語同じ発音じゃないってのが、発音勉強の醍醐味。役で音を変えろ。',
                    yuki: "\"That\\'s what that is\" 呪文みたいやけど、強弱で意味が見えるの面白い。",
                    kenji: "現場で \"That's what it is\" って諦めの一言、めっちゃ使う。強弱できれいに出したい。",
                    mina: 'Z 世代で "it is what it is" が流行ったやつ、これの変形やん。リズム感えぐい。',
                },
            },
            {
                id: 'd21-p-05-want-what-that',
                label: "I want what that is -- 3語全部出す",
                trigger: "'I want what that is.' を発音しろ。",
                points: {
                    core: { en: 'I WANT / what / THAT is.', ja: 'want (動詞) 強、what (関係詞) 中、that (指示) 強、is 弱。' },
                    nuance: { en: "Weight: want > that > what > is. Four words, four tiers.", ja: '4語で音量4段階。この差がリズムを作る。' },
                    shift: { en: "I WANNA know WHAT THAT is. (add know, and wanna kicks in)", ja: 'want の後ろに to 不定詞が来ると wanna に崩れ、文全体のリズムが変わる。' },
                    native: { en: "I want what that is. Can you grab me one?", ja: 'カフェや店で「あれと同じのちょうだい」の実用表現。' },
                },
                trap: '4語均等で読む。リズムが消え、どこに強調があるか聞き手に伝わらない。',
                tip: '強弱を4段階でつける練習。want (強) → that (強) → what (中) → is (弱) の順。',
                reactions: {
                    master: '文中の語に優先順位の階段をつける。英語の情報構造は音量階層で伝わる。',
                    lisa: "When my niece points at something she says 'I want what that is' and the WANT and THAT pop out.",
                    takeshi: '4語4段階、これができれば want / what / that 3語の全パターン攻略したことになる。',
                    yuki: '階段のイメージで強弱つけると、自分でもリズム感出てきた気がする。',
                    kenji: "店で 'I want what that is' 指差しながら言えたら、注文ミス減る。",
                    mina: 'これ、カフェで隣の人のドリンク指して言うの、めっちゃリアル。SNS ぽい実用英語。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 仮主語 It is ... that / for ...
    // ══════════════════════════════════════════════════
    grammar: {
        title: '仮主語 It is ... that / for ... -- 主語が重い時の逃げ方',
        subtitle: '英語は主語を軽くしたい言語。日本語脳は主語を前に積み上げがち。',
        intro: {
            question: 'なぜ日本人の英語は主語が長くなりがちなのか?',
            insight: '日本語は主語を省略できる言語。逆に言えば、主語が必要な場面では名詞句を自由に積める。「彼が昨日提出したレポートを読むこと」が一気に主語になっても違和感がない。\n\n英語は違う。主語が重くなると文全体が読みづらくなるため、「重い主語は後ろに回し、仮の it を前に置く」という構文が発達した。これが It is ... that / for ... 構文。日本語脳だと「それは〜だ」と訳して指示代名詞と誤解するが、この it は「後出しする主語の代役」で、訳さない。\n\n仮主語構文を使えない限り、To master English pronunciation is difficult for Japanese learners みたいに主語が長い不自然な文を書き続けることになる。It is difficult for Japanese learners to master English pronunciation にするだけで、英語のリズムに乗る。今日の5つで仮主語の感覚を体に入れる。',
        },
        tldr: '主語が to 不定詞・that 節で長くなったら、it を頭に置いて主語を後ろに回す。',
        items: [
            {
                id: 'd21-g-01-it-is-difficult',
                label: 'It is difficult to ... -- 不定詞の仮主語',
                trigger: '「日本人が英語の発音をマスターするのは難しい」を英語で。',
                points: {
                    core: { en: 'It is difficult for Japanese learners to master English pronunciation.', ja: 'it が仮主語、to 以下が真主語。for + 意味上の主語を挟める。' },
                    nuance: { en: "To master English pronunciation is difficult for Japanese learners.", ja: '文法的には可だが重い。現代英語では it 構文が圧倒的主流。' },
                    shift: { en: "It's hard for me to explain. / It's easy to forget.", ja: "difficult は hard / easy / important / nice など形容詞なら同じ型。" },
                    native: { en: "It's tough to say no to her.", ja: "tough to 不定詞は口語頻出。「彼女にノーと言うのは辛い」。" },
                },
                trap: 'To + 動詞を主語のままにする。To master English is difficult みたいに主語が重くなる。',
                tip: '形容詞 (difficult, easy, important, hard, nice) が来たら、主語を it にして to を後ろに送る。',
                reactions: {
                    master: 'it は形式主語 (dummy subject)。意味を持たず、真の主語である to 不定詞を後置するためだけに立つ。',
                    lisa: "Starting a sentence with 'To master...' sounds like a philosophy textbook. Just use 'It\'s'.",
                    takeshi: '日本語は主語を重くできるが、英語は重い主語を嫌う。it で逃がせ。',
                    yuki: '"It is 〜 to 〜" って中学で習ったけど、なんで it なのか今まで腑に落ちてなかった。',
                    kenji: "現場で 'It's hard to finish by Friday' って言えたら、交渉の入り口になる。",
                    mina: "SNS で \"It\\'s hard to explain\" 見るやん。あれ仮主語の超定番やったんや。",
                },
            },
            {
                id: 'd21-g-02-it-is-important-that',
                label: 'It is important that ... -- that 節の仮主語',
                trigger: '「あなたが時間通りに来ることが重要だ」を英語で。',
                points: {
                    core: { en: 'It is important that you arrive on time.', ja: 'it が仮主語、that 節が真主語。important / necessary / essential で頻出。' },
                    nuance: { en: "It's important that you BE on time. (subjunctive, formal)", ja: '米英のフォーマルでは that 節内の動詞は原形 (仮定法現在) を取ることがある。' },
                    shift: { en: "It's important that he comes. / It's important that he come.", ja: '口語では通常の現在形、フォーマルでは原形 come。両方使われる。' },
                    native: { en: "It's important that we're on the same page.", ja: '「認識を揃えることが大事」。ビジネスの定型。' },
                },
                trap: 'that 節を主語にする。That you come on time is important. が文法的には可だが、会話では使わない。',
                tip: 'important / necessary / essential / crucial の後に「〜ということ」が来たら、It is X that 構文で出す。',
                reactions: {
                    master: 'that 節主語は不定詞主語より更に重く、仮主語 it への書き換えがほぼ必須。口語では形式主語化が既定。',
                    lisa: "'It's important that...' is a really common phrasing at work emails. Very natural.",
                    takeshi: 'that 節を主語で出すとネイティブは「ちょっと待て」と頭の中で書き換えてる。最初から it で出せ。',
                    yuki: 'that 節主語って学校で習ったけど、実際そのまま使うと重いのね。it 使う癖つける。',
                    kenji: "会議で It's important that we finish by noon. 言えたら時間管理の主導権取れる。",
                    mina: "DM で \"It\\'s important that you know\" って書くと真面目感出る。軽い話題なら it 抜きでええけど。",
                },
            },
            {
                id: 'd21-g-03-it-takes',
                label: 'It takes ... to ... -- 時間/労力の定型',
                trigger: '「英語を習得するには10年かかる」を英語で。',
                points: {
                    core: { en: 'It takes 10 years to master English.', ja: 'it takes + 時間 + to 不定詞。時間・労力がどれだけかかるかの定型。' },
                    nuance: { en: "It took me two hours to finish. (past)", ja: '過去形でも同じ構文。It took + 人 + 時間 + to で「〜するのに〜時間かかった」。' },
                    shift: { en: "It takes guts to do that. / It takes two to tango.", ja: '時間以外に labor, courage, guts, patience, effort なども入れられる。' },
                    native: { en: "It takes a village to raise a child.", ja: '諺。「子育てには村全体の力が要る」。構文の応用例。' },
                },
                trap: 'Mastering English takes 10 years. は可だが、会話では It takes 10 years to master English の方が自然。',
                tip: '「〜するのに〜かかる」は反射的に It takes + 時間 + to で出る練習。',
                reactions: {
                    master: 'take は「時間・労力を要する」の意。仮主語 it と組んで動名詞主語を回避するのが現代英語の既定。',
                    lisa: "I use 'it takes' constantly. 'It takes forever', 'it takes two seconds', 'it takes guts'.",
                    takeshi: '日本語の「〜かかる」をそのまま takes で出せる時、英語が一気に軽くなる。',
                    yuki: 'It takes 10 years って、たった4語で「10年かかる」が言えるの便利すぎる。',
                    kenji: "'It takes time' って現場でよう使う。工期交渉の一言や。",
                    mina: '"It takes two to tango" とか諺も全部この型やん。構文の汎用性えぐい。',
                },
            },
            {
                id: 'd21-g-04-it-seems-that',
                label: 'It seems that ... -- 推測の仮主語',
                trigger: '「彼は疲れているようだ」を英語で。',
                points: {
                    core: { en: 'It seems that he is tired.', ja: 'it が仮主語、that 節が真主語。seems / appears で推測を出す定型。' },
                    nuance: { en: "He seems to be tired. (to不定詞版)", ja: 'that 節を to 不定詞に書き換えた形も同義。構文の柔軟性。' },
                    shift: { en: "It seems (that) he left. / It looks like he left.", ja: '口語では that 省略、それより looks like の方が自然なことも多い。' },
                    native: { en: "It seems like he doesn't want to come.", ja: 'seems like + 節も現代英語では定番 (厳密にはlike+節は口語的)。' },
                },
                trap: "He seems tired. と It seems that he is tired. を全く同じ意味だと思う。微妙に前者は直接観察、後者は間接情報のニュアンス。",
                tip: '推測のトーンを出したい時は It seems that。直接見てる確信がある時は He seems + 形容詞。',
                reactions: {
                    master: 'seem は感覚動詞で直接/間接の観察を区別する。that 節構文は間接情報、形容詞直結は直接観察。',
                    lisa: "'It seems that...' sounds a bit formal to me. In daily talk I say 'It seems like' or 'Looks like'.",
                    takeshi: "seem の使い分け、ここで止まる日本人多い。that 節で「伝聞・推測」、形容詞で「見た目」。",
                    yuki: 'it seems that と he seems tired の違い、今まで気にしてなかった…奥深い。',
                    kenji: "現場で 'It seems that the client isn't happy.' って言えたら状況報告できる。",
                    mina: '"Seems like he ghosted me" って SNS で書くの、まさにこの like+節パターン。',
                },
            },
            {
                id: 'd21-g-05-it-is-no-use',
                label: 'It is no use / It is no good ... -ing',
                trigger: '「泣いても無駄だ」を英語で。',
                points: {
                    core: { en: "It's no use crying over spilled milk.", ja: "It is no use + 動名詞。「〜しても無駄」の定型。動名詞 -ing 専用。" },
                    nuance: { en: "There's no point in crying. / It's no good arguing.", ja: '類似構文 there is no point in -ing、it is no good -ing も同義。' },
                    shift: { en: "It's no use. (stand-alone)", ja: '単独で「無駄だ」とも言える。後ろに動詞を付けない省略形。' },
                    native: { en: "It's no use asking him -- he won't help.", ja: '実用の形。「彼に頼んでも無駄だよ」。' },
                },
                trap: 'It is no use to cry. と to 不定詞で書く。この構文は -ing 専用で、to 不定詞は原則不可。',
                tip: 'no use / no good / no point の後は -ing 形、と機械的に覚える。',
                reactions: {
                    master: 'use / good / point といった抽象名詞が仮主語 it の真主語として動名詞を取る定型。to 不定詞は構文外。',
                    lisa: "'It's no use crying' is a little literary. In casual speech I'd say 'There's no point in crying'.",
                    takeshi: "to 不定詞と動名詞、どっちでもいいと思ってる日本人多いが、この構文は -ing 一択。",
                    yuki: 'no use + -ing って、to 不定詞じゃダメなの知らんかった。ルール1個増えた。',
                    kenji: "'It's no use' 単体で「無駄や」って言えるの、現場で使える短文。",
                    mina: '"No point in texting him" ってDM で書くやん。まさにこの構文の Z 世代版やわ。',
                },
            },
        ],
    },
};
