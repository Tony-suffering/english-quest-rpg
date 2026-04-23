import type { Native365Day } from '@/types/native365';

/**
 * Day 29
 *
 * 発音: 発音の総まとめ -- 1シーン統合 (schwa + linking + flap + dark L + reduction が1会話に凝縮)
 * 文法: 文法の総まとめ -- 同シーン統合 (時制 + 仮定法 + 関係詞 + cleft が連鎖する自然な語り)
 *
 * Day 29 は SYNTHESIS。各 item で複数の先行テーマを1つの自然な文に織り込む。
 */

export const DAY_29: Native365Day = {
    day: 29,
    week: 5,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 月末、1ヶ月の総まとめ
    // ══════════════════════════════════════════════════
    opening: {
        scene: '月末の火曜夜。Month 1 も残り2日。マスターが「今日は28日分の要素を全部1つのシーンに詰め込んで出す」と言い出した。',
        lines: [
            { char: 'master',  text: '今日は個別に覚えたやつを1文に重ねる。schwa と linking と flap が同時に起きて、時制と関係詞と仮定法が同じ段落で連鎖する。それが「本物の一文」だ。' },
            { char: 'lisa',    text: "Real speech isn't one rule at a time. It's like ten things happening in one breath. You can't slow it down and still call it natural." },
            { char: 'takeshi', text: '要素を分けて練習するのは手段。目的は「全部同時に起こせる」状態や。今日でそこに着地する。' },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: 発音の総まとめ -- 1シーン統合
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: '発音の総まとめ -- 1つの文に全要素が同時発生する',
        subtitle: 'schwa / linking / flap / dark L / reduction が1文で連鎖するのが「自然」の正体。',
        intro: {
            question: '個別のルールは分かったのに、なぜまだ英語が不自然なのか?',
            insight: 'Month 1 で28日、schwa・連結・flap・dark L・縮約・弱化、を一つずつ分けて扱ってきた。でもネイティブの一文の中では、これらが同時多発で起こる。例えば "I wanna get outta here" は wanna (縮約) + get-outta (連結+flap) + outta (of reduction) が1.5秒で連鎖する。\n\n個別にできても統合でできないのは、日本語話者の発音学習の最大の壁。「ここは schwa、ここは linking」と意識しながら出すと、どうしても遅く、バラバラになる。解決策は「1文を波として捉える」。強勢のある content word に山を作り、その間の谷は自動的に schwa・linking・flap で埋まる。山だけ意識して、谷は手放す。\n\n今日の5つは全て「1文の中で複数の音声現象が連鎖する」例だけを集めた。1つ1つを分解しながら、最後に統合して出す練習をする。これができれば、Month 1 の発音は卒業。',
        },
        tldr: 'schwa + linking + flap + dark L + reduction が1文に同時発生する波を、山だけ意識して出す。',
        items: [
            {
                id: 'd29-p-01-wanna-getouttahere',
                label: "I wanna get outta here -- 縮約+連結+flap+of 脱落が1文",
                trigger: "'I wanna get outta here.' を一息で発音しろ。",
                points: {
                    core: { en: "/aɪ ˈwɑnə ɡeɾ ˈaʊɾə hɪr/", ja: 'want to → wanna、get + out = geɾout、out of → outta (of 消滅)。4要素が1文で連鎖。' },
                    nuance: { en: "I-wanna-geroutta-here. One breath, four reductions.", ja: '一息で出す。分解して練習してもいいが、最終的には1拍で流す。' },
                    shift: { en: "I wanna get out of here. (careful) → I wanna get outta here. (casual) → I wan' geroutta here. (very fast)", ja: '速度が上がるほど母音が消え、境界が溶ける。' },
                    native: { en: "Honestly, I just wanna get outta here -- like, I've literally been staring at this screen for eight hours and my brain is totally mush.", ja: 'もうマジで、ここから出たい。ていうか、8時間ずっと画面見てて、脳みそドロドロや。' },
                },
                trap: '「アイ・ウォント・トゥ・ゲット・アウト・オブ・ヒア」と7拍で読む。英語は3-4拍の波。',
                tip: "wanna / getout / outta を3つのかたまりで認識。間の機能語は全て消える。",
                reactions: {
                    master: "1文内で conversion (縮約)、linking (連結)、flap (弾き)、deletion (脱落) が同時発生する典型例。統合運用の入門。",
                    lisa: "'I wanna get outta here' is probably the most American sentence ever. All the reductions in one line.",
                    takeshi: 'これ一息で出せなかったら Month 1 の発音やり直し。逆に出せたら英語の波に乗れてる証拠や。',
                    yuki: 'wanna + getouta + outta、3つのかたまりで覚えるといいんか。分解しすぎてた。',
                    kenji: "現場で 'I wanna get this done' とか日常で出る表現。全部波で出せないと浮く。",
                    mina: "TikTok で \"just wanna getouta bed\" 的な字幕、ほんまに1拍で書かれてるやん。あれ実音そのまま。",
                },
            },
            {
                id: 'd29-p-02-gonna-coulda-shoulda',
                label: "gonna / coulda / shoulda / woulda -- 助動詞族の統合縮約",
                trigger: "'I shoulda told you, but I was gonna wait.' を発音しろ。",
                points: {
                    core: { en: "/aɪ ˈʃʊɾə toʊl(d) ju bət aɪ wəz ˈɡʌnə weɪt/", ja: 'should have → shoulda、going to → gonna、told you → tol(d)-jə (yod coalescence)、but I was → bəɾ-aɪ-wəz (linking + flap)。' },
                    nuance: { en: "Shoulda-tol-jə, but-I-wuz-gonna-wait. Auxiliaries all collapse.", ja: '助動詞は content ではないので全て弱化・縮約対象。' },
                    shift: { en: "I should have told you → I shoulda told you → I shoulda tol-jə.", ja: '音声速度が上がるほど v や d が消失する。' },
                    native: { en: "Look, I shoulda told you sooner, but honestly I was gonna wait until I had actual news -- I didn't wanna get your hopes up for nothing.", ja: 'あのさ、もっと早く言うべきやった。けど、正直、ちゃんとニュースあるまで待つつもりやった。期待させて終わりたくなかった。' },
                },
                trap: 'should have を「シュッド・ハブ」と読む。実音は「シュッダ」。have の v は消える。',
                tip: "shoulda / coulda / woulda / gonna / wanna / hafta / gotta -- この7つを1セットで体に入れる。",
                reactions: {
                    master: 'modal perfect (should have) と future (going to) の縮約は会話頻度が極めて高い。reduction を知らないと聞き取れない。',
                    lisa: "'I shoulda called' / 'He coulda won' -- written out they look casual, but this is literally how everyone talks.",
                    takeshi: 'should have told you を教科書通り読んだら会話で即バレする。shoulda tol-ja まで縮めて初めて自然や。',
                    yuki: "shoulda / coulda / woulda、映画で聞き取れんかった理由これや。",
                    kenji: "現場で 'I coulda done it better' って言えたら、反省の重みが伝わる。正書法より音声。",
                    mina: "ラップの歌詞、shoulda / coulda 大量に出てくるよな。詩の韻律として定着しとる。",
                },
            },
            {
                id: 'd29-p-03-letmegetbacktoyou',
                label: "Let me get back to you -- flap + linking + schwa の三重奏",
                trigger: "'Let me get back to you on that.' を発音しろ。",
                points: {
                    core: { en: '/leɾmi ɡeɾ bæk tə jə ɑn ðæt/', ja: 'Let-me → leɾmi (flap)、get-back → geɾ-back (flap + 連結)、to-you → tə-jə (schwa 化)。' },
                    nuance: { en: "Lemme get back to ya on that. Three flaps and two schwas in one clause.", ja: 'ビジネスの定型句だが、音声は完全に reduction 対象。' },
                    shift: { en: "'Let me' → 'Lemme' even more casual. 'Back to you' → 'back to ya'.", ja: 'カジュアル度が上がるとさらに縮約。' },
                    native: { en: "Honestly, lemme get back to you on that -- I seriously need to check with my team before I can commit to anything solid.", ja: 'マジで、それはまた連絡させて。ちゃんと決める前にチームに確認せなあかんし。' },
                },
                trap: "'Let me' を「レット・ミー」で出す。口語は lemme、t は完全に消える。",
                tip: "get back to you は1かたまりで音声化。個別に発音せず、3語1拍のリズムで。",
                reactions: {
                    master: 'let me の t は phonetic reduction で完全脱落、lemme へ融合する。get back の t は flap 化。複数の音声プロセスが同時進行。',
                    lisa: "'Let me get back to you' is like the #1 thing you say in meetings when you don't wanna commit. And it's all reductions.",
                    takeshi: '仕事の定型句ほど縮約が効く。「レット・ミー」と丁寧に出すほど、逆に不自然になるパラドックス。',
                    yuki: 'lemme を仕事で使っていいんか疑問やったけど、逆にそっちが自然なんや。',
                    kenji: "商談で 'Lemme get back to you' さらっと出せたら、一気にネイティブ寄りに聞こえる。",
                    mina: "メールで \"let me\" でも、口頭では \"lemme\" って使い分けるのが普通。",
                },
            },
            {
                id: 'd29-p-04-feelittallover',
                label: "I can feel it all over -- dark L + linking + reduction が連鎖",
                trigger: "'I can feel it all over.' を発音しろ。",
                points: {
                    core: { en: '/aɪ kən fiːɫ ɪɾ ɔːɫ oʊvɚ/', ja: 'can → kən (弱化)、feel-it → fiːɫ-ɪɾ (dark L + 連結 + flap)、all-over → ɔːɫ-oʊvɚ (dark L + 連結)。' },
                    nuance: { en: "I-kn-feel-it-all-over. 'Can' nearly vanishes, dark Ls link everything.", ja: 'can が機能語として最大限に弱化、dark L が次の母音に橋をかける。' },
                    shift: { en: "Careful: 'I can feel it all over.' Fast: 'I-kn-feel-it-all-over.'", ja: '速度によって can の母音が消え、L が母音化する。' },
                    native: { en: "Dude, I can seriously feel it all over my body -- like, every muscle is sore, I can barely even lift my arms right now.", ja: 'マジで全身にきてる。ていうか全部の筋肉が痛い。今、腕持ち上げるのもしんどい。' },
                },
                trap: 'feel の L をはっきり /l/ で出す。英語の語末 L は舌後部が上がる dark L で、むしろ母音寄りの音。',
                tip: 'feel-it は1かたまり。L を舌先でなく舌後部で作ると自然に次の母音へ繋がる。',
                reactions: {
                    master: 'dark L は音節末で母音化傾向を持ち、後続母音と linking を形成しやすい。flap と併発すると連結が一層強固になる。',
                    lisa: "'I can feel it all over' -- when I say this fast, the 'L' sounds are basically vowels. That's the trick.",
                    takeshi: "dark L をちゃんと dark にできたら、linking は勝手に起こる。L を clear に出す限り、連結は死ぬ。",
                    yuki: "feel と all の L を母音化するの、日本語脳には最初違和感あるけど、慣れるしかない。",
                    kenji: "I can feel it は共感表現で頻出。can の弱化から L の dark 化まで、一気に出せるようにしたい。",
                    mina: "ネイティブが \"feel it\" を \"fee-oh-it\" 風に言うの、あれ dark L の母音化がピークに達した発音やね。",
                },
            },
            {
                id: 'd29-p-05-ustedtabeable',
                label: "I used to be able to -- 準助動詞の三重縮約",
                trigger: "'I used to be able to do that.' を発音しろ。",
                points: {
                    core: { en: '/aɪ ˈjuːstə bi ˈeɪbɫ tə duː ðæt/', ja: "used-to → used-ta (to が schwa)、be able → bi-eɪbɫ (linking + dark L)、able-to → eɪbɫ-tə (L + schwa 連結)。" },
                    nuance: { en: "I-useta-be-able-ta. Three 'to' / 'be' reductions in four words.", ja: 'used to / to の2回、be の軽い母音で、機能語が連続で弱化する。' },
                    shift: { en: "I used to be able to → 'I useta bea-bleta' in fast speech.", ja: '速度を上げると境界が完全に消える。' },
                    native: { en: "I used to be able to pull all-nighters no problem, but honestly, I'm in my thirties now and, like, one bad night literally ruins my whole week.", ja: '昔は徹夜とか余裕でできてたのに、今は30代で、一晩寝不足だとマジで1週間ダメになる。' },
                },
                trap: "used to / be able to / to do を全部丁寧に発音しようとして、文が4秒かかる。実音は1.5秒。",
                tip: "used to = useta (1語)、be able to = bi-able-ta (連結)、合わせて5音節くらいで流す。",
                reactions: {
                    master: "modal quasi-auxiliary (used to / be able to) は content word ではないので、全て reduction 対象。重ね使いで縮約が連鎖する。",
                    lisa: "'I used to be able to' -- every word except 'used' and 'able' basically disappears when I say it fast.",
                    takeshi: "modal 系の縮約、1つ1つは簡単やけど、重ねて出す時に詰まる。今日で統合しとけ。",
                    yuki: 'used to と be able to が1文で合体すると、途端に難しくなる。練習あるのみ。',
                    kenji: "現場で 'I used to be able to handle this' って言う場面、1ヶ月に数回ある。流暢に出たい。",
                    mina: "I useta って SNS の字幕でよく見るけど、be able to まで縮むと流石に書かれんな。音だけの世界。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 文法の総まとめ -- 同シーン統合
    // ══════════════════════════════════════════════════
    grammar: {
        title: '文法の総まとめ -- 時制 / 仮定法 / 関係詞 / cleft が連鎖する語り',
        subtitle: '英語の物語りは「時制の層 + 仮定の枝 + 関係詞の補足」が同じ段落で重なる。',
        intro: {
            question: 'なぜネイティブの1段落の中に、現在完了・仮定法・関係詞・cleft が全部入ってるのか?',
            insight: "文法は単発のテストじゃない。ネイティブの自然な語りは、複数の構文が層になって1つの意味を作る。例えば \"If I'd known about the meeting that was scheduled for yesterday, I would've told you\" には、仮定法過去完了 (If I'd known / would have told) + 関係代名詞 (that was scheduled) + 受動態 (was scheduled) が3つ同時に入ってる。\n\n日本語話者がぶつかる壁は、この「層」を作れないこと。構文を1つずつ習っても、同時に組み合わせる訓練をしてないと、実際の会話で詰まる。解決策は「話の骨格」から考える。まず時制の主軸 (現在基点か過去基点か) を決め、そこに仮定の枝と関係詞の補足を足していく。\n\n今日の5つは全て複数構文の合体型だけを扱う。各 item で何が組み合わさってるかを分解し、最後に統合して口から出せるようにする。これができれば Month 1 の文法は卒業。",
        },
        tldr: '時制 + 仮定法 + 関係詞 + cleft が1段落で連鎖する文を、層を分解しながら統合して出す。',
        items: [
            {
                id: 'd29-g-01-ifhadknown-wouldhavetold',
                label: "If I'd known... I would've told you -- 仮定法過去完了+関係詞",
                trigger: "「昨日スケジュールされた会議のこと知ってたら、言ったのに」を英語で。",
                points: {
                    core: { en: "If I'd known about the meeting that was scheduled for yesterday, I would've told you.", ja: '仮定法過去完了 (If I had known / I would have told) + 関係詞 (that was scheduled) + 受動態 (was scheduled)。3要素の合体。' },
                    nuance: { en: "If I'd-known...that-was-scheduled...I would've-told-you. Three structures layered in one sentence.", ja: '仮定の枝、関係詞の補足、時制の主軸、が同じ文で共存してる。' },
                    shift: { en: "Simplified: 'If I knew about the meeting, I'd tell you.' (present tense, simpler)", ja: '過去完了を現在にすれば単純化できるが、会話では過去完了+関係詞の方が頻出。' },
                    native: { en: "Dude, if I'd known about the meeting that was scheduled for yesterday, I literally would've told you -- I'm not trying to leave you out of the loop.", ja: 'いや、昨日あった会議のこと知ってたら、マジで伝えてたって。情報から外してるわけじゃないから。' },
                },
                trap: "過去完了 (had known) と過去形 (knew) を混同する。仮定法過去完了は反実仮想 (起きなかったことへの後悔)。",
                tip: "「〜してたら、〜してたのに」の日本語が出たら、If I'd VP, I would've VP。形で固める。",
                reactions: {
                    master: '仮定法過去完了 (counterfactual past) + 関係節 + 受動態の三層構造。英語の主動詞時制が仮定の基点、関係詞が補足を提供する。',
                    lisa: "'If I'd known...' is like THE way Americans express regret. It sounds dramatic in textbooks but it's just how we talk.",
                    takeshi: "構文を分解すると3つやが、1文で組み合わせる訓練してないと口から出ない。今日、統合まで持ってく。",
                    yuki: "仮定法と関係詞が同じ文で使えるの、今まで別物として覚えてた。",
                    kenji: "現場で 'If I'd known earlier, I would've handled it' って言えたら、責任感と後悔が両方出せる。",
                    mina: "SNS で \"if I'd known, I woulda told u\" とか、ガチで仮定法過去完了をカジュアルに使ってるの見る。",
                },
            },
            {
                id: 'd29-g-02-been-meaning-to',
                label: "I've been meaning to tell you about what happened -- 現在完了進行形+関係代名詞",
                trigger: "「ずっと、起こったことについて言おうと思ってた」を英語で。",
                points: {
                    core: { en: "I've been meaning to tell you about what happened.", ja: '現在完了進行形 (I have been meaning) + 関係代名詞 what (= the thing that happened) の合体。' },
                    nuance: { en: "I've-been-meaning-to...what-happened. Past intention continuing + fused relative.", ja: '「ずっとそう思ってる (今も思ってる)」の継続 + 「起きた出来事」の関係詞、同時発動。' },
                    shift: { en: "Shorter: 'I wanted to tell you what happened.' (loses the duration)", ja: '単純過去にすると「持続してた」のニュアンスが消える。' },
                    native: { en: "Hey, I've literally been meaning to tell you about what happened at the office last Tuesday -- it's been eating at me for like a week now.", ja: 'あのさ、先週火曜日に会社で起きたこと、マジでずっと言おうと思ってた。1週間くらい、ずっと頭から離れなくて。' },
                },
                trap: "I wanted to tell you で済ませる。現在完了進行形を使うと「ずっと言うつもりだった、今日もまだ言ってない」の時間幅が出る。",
                tip: "「ずっと〜しようと思ってた」は I've been meaning to VP の定型。何度も使えば口が覚える。",
                reactions: {
                    master: "現在完了進行形 (have been VP-ing) は「過去から現在への持続」を明示する。関係代名詞 what は「the thing that〜」を1語で表現する fused relative。",
                    lisa: "'I've been meaning to...' is the softest way to bring up something heavy. It admits you've been putting it off.",
                    takeshi: "「ずっと言おうと思ってた」を過去形で出すと、軽い。現在完了進行形で「持ちっぱなし感」を出す。",
                    yuki: "I've been meaning to、口語で超使える。「ずっと気になってた」を一発で出せる。",
                    kenji: "現場で切り出しづらい話題も I've been meaning to bring this up... で前置きできる。役立つ。",
                    mina: "DM で \"I've been meaning to reply\" って書いたら、返信遅れの言い訳として完璧やん。",
                },
            },
            {
                id: 'd29-g-03-cleft-wishing',
                label: "It's not the money that I care about -- 強調構文+関係詞",
                trigger: '「私が気にしてるのはお金じゃない」を英語で。',
                points: {
                    core: { en: "It's not the money that I care about -- it's the principle.", ja: "強調構文 (It's not X that Y) + 関係詞 (that) + 否定の対比構造。3つが絡む。" },
                    nuance: { en: "It's-not-the-money...it's-the-principle. Negation + cleft + contrast.", ja: "「〜じゃなくて〜こそ」の対比を cleft で出す。日本語の「〜こそ」の英訳解。" },
                    shift: { en: "'I don't care about the money, I care about the principle.' -- same meaning, weaker.", ja: '普通文でも言えるが、cleft の方が対比が劇的に強調される。' },
                    native: { en: "Honestly, it's not the money that I care about -- it's the principle, and I think you know exactly what I mean.", ja: "正直、お金のことじゃない。俺が気にしてるのは筋の話で、お前も何のこと言ってるか分かってるはず。" },
                },
                trap: "I don't care about money だけで終える。cleft + contrast で「じゃなくて〜こそ」を出す。",
                tip: "「〜じゃなくて〜こそ」の日本語が浮かんだら反射で It's not X that Y / it's Z。対比のセット。",
                reactions: {
                    master: 'cleft (強調構文) + 関係詞 that + 対比節の複合。focus movement により意味的焦点を文頭に前景化する。',
                    lisa: "'It's not X, it's Y' is how Americans argue. You sound weak if you just say 'I don't care about X'.",
                    takeshi: "対比を出す英語の基本構造や。「じゃなく〜こそ」を英語でできる人とできない人で、議論の強度が変わる。",
                    yuki: '対比の強調構文、議論で使えたらかっこいい。',
                    kenji: "交渉で 'It's not the price, it's the terms' とか、対立軸をはっきりさせられる。",
                    mina: "\"It's not about you, it's about me\" の構文、恋愛ドラマの鉄板やけどまさに cleft。",
                },
            },
            {
                id: 'd29-g-04-been-working-since-because',
                label: "I've been working on this since he left because... -- 完了進行形+理由節",
                trigger: "「彼が辞めてから、理由は〜だから、ずっとこれに取り組んでる」を英語で。",
                points: {
                    core: { en: "I've been working on this since he left because I'm the only one who actually knows how it works.", ja: '現在完了進行形 (I have been working) + since + 過去形 (he left) + because + 関係詞 (who) の4層構造。' },
                    nuance: { en: "I've-been-working...since-he-left...because...the-only-one-who. Four clauses chained.", ja: '時制の基点、期間の起点、理由、話者の立ち位置、を1文で提示。' },
                    shift: { en: "Breaking up: 'He left. I've been working on this since then. I'm the only one who knows how it works.'", ja: '3文に分けると説明的だが、重ねると因果関係が1息で伝わる。' },
                    native: { en: "Dude, I've seriously been working on this since he left last month because I'm literally the only one on the team who actually knows how this whole thing works.", ja: 'マジで、先月彼が辞めてからずっとこれやってる。俺だけやから、チームで実際に動く仕組みを分かってるのが。' },
                },
                trap: '3文に分けて説明する。1文で重ねることで、因果 (理由) と時間 (期間) の関係が一息で伝わる。',
                tip: "主動詞の時制で基点を決め、since / because / who で枝を足す順序を固定する。",
                reactions: {
                    master: '時制の層 (現在完了進行形)、期間の起点 (since + 過去形)、因果接続 (because)、限定節 (who) の4層連鎖構造。複文構築の基本形。',
                    lisa: "This is how I actually talk when I'm venting. Multiple clauses, one breath, clear causation.",
                    takeshi: '1文で4層出せたら、論理的に話せてる証拠や。分けるのは簡単、重ねるのが技術。',
                    yuki: "since + 過去形、because + 理由、who + 補足、の順序を固定して練習する。",
                    kenji: "現場で状況説明する時、こういう重層文が出せるかで、報告の質が変わる。",
                    mina: "Vlog でこの構造、よう聞く。説明が一息で完結すると編集も楽やし、視聴者も理解しやすい。",
                },
            },
            {
                id: 'd29-g-05-would-have-been-if',
                label: "It would've been a disaster if I hadn't -- 混合条件+強調",
                trigger: "「気づいてなかったら、大惨事になってた」を英語で。",
                points: {
                    core: { en: "It would've been a total disaster if I hadn't noticed in time.", ja: "仮定法過去完了 (It would have been / if I hadn't noticed) + 強調副詞 (total) + 時間副詞節 (in time) の合体。" },
                    nuance: { en: "It-would've-been-a-total-disaster...if-I-hadn't-noticed. Past counterfactual with emphasis.", ja: '反実仮想の過去 (起きなかった悪い未来)。英語で後悔や安堵を出す主力構文。' },
                    shift: { en: "Variation: 'If I hadn't noticed, it would've been a disaster.' (if-clause first)", ja: 'if 節が先でも後でも意味は同じ。会話では結果節を先に言うことが多い (感情が先に出る)。' },
                    native: { en: "Honestly, it would've been a total disaster if I hadn't noticed the leak when I did -- like, literally the whole basement would've flooded overnight.", ja: 'マジで、あの時気づいてなかったら大惨事やった。ていうか地下室全部、一晩で水浸しやったと思う。' },
                },
                trap: "過去形 (would be / didn't notice) で出す。仮定法過去完了は過去完了 (hadn't) と完了形 (would have been)。",
                tip: "「〜してたら〜だった」の反実仮想は would have + PP + if + had + PP の型を丸暗記。",
                reactions: {
                    master: '過去の反実仮想 (counterfactual past) は仮定法過去完了で表現。主節と従属節の両方が完了時制を取るのが特徴。',
                    lisa: "'It would've been a disaster if I hadn't...' is how we do close-calls. The relief and the fear in one structure.",
                    takeshi: '安堵と危機感を同時に出す構文や。日本語の「〜してたら危なかった」の英訳で、全員詰まるポイント。',
                    yuki: "would've been a disaster、フレーズごと覚えたら応用できるな。",
                    kenji: "現場で 'It would've been bad if we hadn't checked' とか、安全報告で頻出する型。",
                    mina: "\"It would've been so awkward if I hadn't...\" って恋愛系の Vlog で鉄板。安堵のドラマ性が出る。",
                },
            },
        ],
    },
};
