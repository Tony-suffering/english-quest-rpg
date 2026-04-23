import type { Native365Day } from '@/types/native365';

/**
 * Day 3
 *
 * 発音: 連結 (linking)                    -- 単語の境目を消すと英語に聞こえる
 * 文法: 仮定法過去 -- 形と時制のズレ      -- 「過去形」なのに過去じゃない違和感
 */

export const DAY_03: Native365Day = {
    day: 3,
    week: 1,
    month: 1,

    opening: {
        scene: '夜の居酒屋。カウンター。schwa と語強勢の次は、単語が1個ずつ独立して聞こえない「流れ」の話。',
        lines: [
            { char: 'yuki',   text: "'pick it up' が pickitup に聞こえて、3単語の切れ目が分からなかった。" },
            { char: 'lisa',   text: "Yeah, we glue everything. 境目を消す癖がないと、スクリプト見ても全然追いつけない。" },
            { char: 'master', text: "発音の話は一旦置いて、文法側も1つ。If I were you の were、あの気持ち悪い過去形はなんで生き残ってる?" },
        ],
    },

    pronunciation: {
        title: '連結 (linking) -- 単語の境目を溶かす技術',
        subtitle: '子音+母音・母音+母音・子音+子音、それぞれの境目で音がつながる3パターン。',
        intro: {
            question: 'なぜスクリプトを見れば分かる英語が、耳では1つの塊に聞こえるのか?',
            insight: '日本語はモーラごとに母音を持ち、単語の終わりが常に開いている (「あり・が・とう」)。結果、単語境界がクリアに発音される言語設計。英語は子音で終わる単語が大量にあり、次の単語が母音始まりだと必ず連結する。これは「例外」ではなく英語のデフォルト動作。\n\n連結には大きく3タイプある。(1) 子音+母音の連結 (pick it up → piki-tup)、(2) 同じ・似た子音の融合 (want to → wanna, I need to → I needa)、(3) 母音+母音を滑らかに繋ぐ挿入音 (go out → go-wout, I also → I-yalso)。ネイティブはこれを意識せず自動で処理するため、単語単位で話してくれない。\n\n今日の5フレーズで「単語の独立性」を捨てる。英語は単語ではなく意味単位 (thought group) で発音する言語、と切り替えることが連結習得の本丸。',
        },
        tldr: 'pick it up / an apple / turn off / go on / this evening の5フレーズで3タイプの連結を体に入れる。',
        items: [
            {
                id: 'd3-p-01-pick-it-up',
                label: 'pick it up -- 子音+母音で繋ぐ',
                trigger: "'pick it up' を1息で発音しろ。",
                points: {
                    core: { en: '/pɪˈkɪˌtʌp/', ja: 'pick の k が it の i と結合、it の t が up の u と結合。3単語が1語に見える。' },
                    nuance: { en: "pi-ki-tup. One fluid motion, no pauses.", ja: '単語ごとに区切ると英語に聞こえない。全体を1単語のように口を動かす。' },
                    shift: { en: "'Pick. It. Up.' with pauses sounds like you're angry or teaching a kid.", ja: '区切って発音するのは怒り・説教の特殊文脈のみ。通常は連結が基本。' },
                    native: { en: "Hey, could you swing by the dry cleaner's and pick it up on your way home? I totally spaced on it.", ja: 'ちょっと、帰りにクリーニング屋寄って取ってきてくれない? 完全に忘れてた。' },
                },
                trap: '「ピック・イット・アップ」と3拍で発音。英語話者には「なんでこの人単語ごとに止まるんだ?」と違和感。',
                tip: '語末の子音を次の単語の頭に貼り付ける。k+i, t+u と連続させる意識を作る。',
                reactions: {
                    master: '連結 (catenation) は英語音韻の基本動作。子音で終わる単語の75%以上で自動発動する現象。',
                    lisa: "If I say 'pick it up' with three separate words, it sounds like I'm reading a list. Weird stress.",
                    takeshi: '単語ごとに切る癖は日本語の悪癖。英語は1拍、意味の塊で切る。単語境界は消して構わない。',
                    yuki: '「ピキタップ」って聞こえた音、pick it up だったのか。耳の謎がひとつ解ける。',
                    kenji: '現場で Pick it up, please って言う時、繋げて出せれば指示が短く決まる。',
                    mina: 'ディズニー映画の吹替なしで見てる時、pick it up の連結で字幕追いつかん理由がこれやん。',
                },
            },
            {
                id: 'd3-p-02-an-apple',
                label: 'an apple -- 冠詞と名詞の溶け',
                trigger: "'an apple' を1息で発音しろ。",
                points: {
                    core: { en: '/əˈnæ.pəl/', ja: 'an の n が apple の a に直結。a-napple のように聞こえる。' },
                    nuance: { en: "u-NAP-pul. The 'n' belongs to apple now.", ja: '冠詞 an は次の名詞に吸収される。音の上では2語が1語。' },
                    shift: { en: "'a apple' is wrong in grammar, and 'an ap-ple' with a gap is wrong in sound.", ja: '文法・音韻の両方でスムーズに繋ぐのがルール。' },
                    native: { en: "Could I get an apple juice and a plain bagel with cream cheese to go? Actually, can you toast it first?", ja: 'アップルジュースとプレーンベーグル、クリームチーズで、持ち帰りで。あ、先にトーストしてもらえる?' },
                },
                trap: '「アン・アップル」と切って発音。冠詞の存在自体が聞き取れないぐらい連結されているのが自然。',
                tip: 'an を次の名詞の一部と思って発音。a が余計な存在なら n を次の語頭子音として扱う。',
                reactions: {
                    master: '冠詞 an が子音 n で終わるのは、母音始まり名詞との連結を確保するため。文法自体が連結を前提に設計されている。',
                    lisa: "You say 'an APPLE' clearly separated and it sounds robotic. Just let the n glue them.",
                    takeshi: 'a と an の区別は音のため。文字のためじゃない。連結しないなら an を使う意味が半分消える。',
                    yuki: '「a apple」が間違いなの、音のためだったのか。理由が腑に落ちた。',
                    kenji: "コンビニで an orange juice 頼む時も u-NOR-angeで繋ぐ、一気に注文感出る。",
                    mina: 'メニュー読み上げる時 u-NAP-pul で流せばバリスタに聞き直されん。',
                },
            },
            {
                id: 'd3-p-03-turn-off',
                label: 'turn off -- 子音+母音の連結句動詞',
                trigger: "'Can you turn off the light?' を発音しろ。",
                points: {
                    core: { en: '/ˈtɜːr.nɔːf/', ja: 'turn の n が off の o と結合。「ターノフ」のように聞こえる。' },
                    nuance: { en: "tur-NOFF. Sounds like one word.", ja: '句動詞は連結で1動詞のように出る。分けると句動詞感が消える。' },
                    shift: { en: "Turn it off -- tur-NI-toff. Three words, one flow.", ja: 'between に it などが挟まっても、連結の鎖は切れず最後まで繋がる。' },
                    native: { en: "Hey can you turn off all the lights before you leave tonight? The electric bill is literally killing me this month.", ja: 'ちょっと、帰る前に全部電気消してってくれる? 今月の電気代マジでやばいから。' },
                },
                trap: '「ターン・オフ」と切って発音。句動詞の一体感が失われ、ネイティブには動詞+前置詞の不自然な並びに聞こえる。',
                tip: '句動詞はセットで1つの動詞と覚えて発音する。turn off は tur-noff で1単語扱い。',
                reactions: {
                    master: '句動詞 (phrasal verb) は意味的にも音的にも1動詞単位。連結で発音することで統一感が出る。',
                    lisa: "Turn off, pick up, put away -- I pronounce them all as if they're single words. tur-NOFF, pi-KUP, pu-TAWAY.",
                    takeshi: '句動詞を動詞+前置詞と分けて覚えてるやつは、発音もそこで切る。セットで1動詞と思え。',
                    yuki: 'put on, turn on, get up、全部連結で発音するの言われたらそうだった。',
                    kenji: "現場の Turn off the machine、tur-NOFF で指示飛ばせば即伝わる。",
                    mina: 'Netflix の字幕で「turn off」って1語みたいに言うてるやん、あれ連結のお手本や。',
                },
            },
            {
                id: 'd3-p-04-go-on',
                label: 'go on -- 母音+母音は /w/ を挿入',
                trigger: "'go on' を1息で発音しろ。",
                points: {
                    core: { en: '/ˈɡoʊ.wɒn/', ja: 'go の /oʊ/ と on の /ɒ/ の間に /w/ を挟んで滑らかに繋ぐ。' },
                    nuance: { en: "go-WON. A tiny 'w' glides in.", ja: '母音同士は直接繋がず、唇を丸める動作で /w/ が自動的に入る。' },
                    shift: { en: "Do it (du-WIT), blue ink (blue-WINK), say it (say-YIT) -- each gets a glide.", ja: "/u:/ の後は /w/、/i:/ の後は /y/ がそれぞれ自動挿入される。" },
                    native: { en: "Just go on without me, seriously -- I'll catch up in like five minutes, I just need to send this one email.", ja: 'マジで先行ってて、5分で追いつくから。このメール1本送るだけだから。' },
                },
                trap: '「ゴー・オン」と母音でぶつける。日本語的発音で声門閉鎖が入り、英語のリズムから外れる。',
                tip: '/oʊ/ → /w/ → 次の母音、という口の動きを体で覚える。唇を丸めたまま次の母音へ移行。',
                reactions: {
                    master: '母音+母音の連結には glide insertion (半母音挿入) が起きる。/oʊ/ /uː/ の後は /w/、/iː/ /eɪ/ の後は /j/。',
                    lisa: "When I say 'go on' I'm literally saying go-WON. The w just appears. It's automatic.",
                    takeshi: '母音で止まって次の母音に行くと、日本語で言う「声門閉鎖音」が入って英語が途切れる。繋ぎ音を信じて流せ。',
                    yuki: "/w/ や /y/ が自動で入るの、英語話者の口の癖として染み込ませないとだな。",
                    kenji: "現場で Go on で作業続行指示する時、go-WON でスッと言えば迷い消える。",
                    mina: 'SNS で「Go onnn」って伸ばしてる時、あの onnn の前にこっそり w が入ってるってワケや。',
                },
            },
            {
                id: 'd3-p-05-this-evening',
                label: 'this evening -- 同じ子音の融合',
                trigger: "'this evening' を発音しろ。",
                points: {
                    core: { en: '/ðɪˈsiːv.nɪŋ/', ja: 'this の s と evening の始まりの母音が融合、1つの s に。' },
                    nuance: { en: "thi-SEEV-ning. The 's' doubles into the next word.", ja: '語末と語頭の繋ぎでは、1つの s が両方の単語の役割を兼ねる。' },
                    shift: { en: "Similar: 'bus stop' → buSTOP, 'nice sunset' → ni-SUNset.", ja: '同子音が並んだ時は1つにまとめる (degemination)。' },
                    native: { en: "Alright, I'll see you this evening around 7 -- same place as last time, same corner booth.", ja: 'じゃ今晩7時ごろね。前と同じ店、同じ角の席で。' },
                },
                trap: '「ディス・イーブニング」と区切る。s の存在が消えないまま次の母音へ行くので、カクカクした英語に。',
                tip: '同子音・似た子音が語の境で並んだら、1つにまとめる。bus stop も1つの s で発音。',
                reactions: {
                    master: '語末語頭で同じ子音が接する場合、発音は1つの長めの子音に融合する。これを degemination (重子音の縮約) と呼ぶ。',
                    lisa: "Bus stop, this evening, nice sunset -- I never say two S's. Just one longer one. That's the rule.",
                    takeshi: '同じ子音2回律儀に出してると、英語のリズムが崩れる。1個で済ます潔さがネイティブ。',
                    yuki: "1つの音で2単語分兼ねるって、経済的で頭いい。",
                    kenji: "朝の打ち合わせ this morning、thi-SMORning で繋いで朝の挨拶スマートに。",
                    mina: 'インスタの「this evening」ストーリー、ネイティブが発音する時 s1個で済ませてるの、これやったんや。',
                },
            },
        ],
    },

    grammar: {
        title: '仮定法過去 -- 「過去形」なのに過去じゃない時制のズレ',
        subtitle: 'If I were you の were に含まれた「現在の非現実」を訳語で潰すと仮定法は永遠に分からない。',
        intro: {
            question: 'なぜ If I were you の were は過去形なのに「今」の話なのか?',
            insight: '日本語の「もし私があなただったら」は条件節に特別な時制を使わない。文脈で「仮の話」と伝わるから、動詞は現在形でも過去形でも自由。英語は逆で、「仮の話」を動詞の時制で印をつける義務がある。現実から1段階離した印、それが「過去形」の使い方。\n\n英語話者の脳内では、時間としての過去と、現実からの距離としての過去が同じ「過去形」で表現される。If I were, If I had, I wish I knew -- どれも現実にはない状態を1段階引いた位置から描く。時間軸と現実軸、2つの「距離」が同じ形で出る、ここが日本語にない発想。\n\n解決策は「過去形=1歩引いた現実」と意味ラベルを付け替えること。文法書の「仮定法」というラベルを捨て、「現実からの距離」という感覚で時制を選ぶ。そうすると If I were, If I had, I wish I were の全てが同じ動作として腑に落ちる。',
        },
        tldr: '仮定法は時間ではなく「現実からの距離」。過去形 = 1歩引いた現実、の感覚で処理。',
        items: [
            {
                id: 'd3-g-01-if-i-were',
                label: "If I were you -- were 固定は距離の印",
                trigger: '「俺だったらそうしない」を英語で。',
                points: {
                    core: { en: "If I were you, I wouldn't do that.", ja: '仮定法の be 動詞は主語に関係なく were で固定。現実ではないことの印。' },
                    nuance: { en: "were = not real. It's a grammatical signal, not a tense.", ja: 'were は「過去」ではなく「非現実」の合図。時間の過去ではない。' },
                    shift: { en: "Casual speech: 'If I was you' is heard often, especially in American English, but 'were' stays formal standard.", ja: '口語では was も広く使われるが、試験・フォーマル文では were が正解。' },
                    native: { en: "Honestly, if I were you, I'd just let it go -- it's really not worth the stress or the headache.", ja: '正直、俺ならもう流す。ストレスも頭痛も抱えるほどの価値ないから。' },
                },
                trap: "If I am you と現在形で出す。仮定法 = 非現実の時制マーカー、という意識がないと本物の仮定にならない。",
                tip: '「もし俺が〜だったら」と口に出した瞬間に were を条件反射で出す。主語を見ずに were で決め打つ。',
                reactions: {
                    master: "仮定法の was/were は英語の subjunctive mood の残存形。時制ではなく法 (mood) の区別。",
                    lisa: "'If I was you' -- my mom corrects me every time. 'If I WERE you', she insists. Formal writing always uses were.",
                    takeshi: '「もし〜だったら」は現在形じゃない。一段引いた形で出す。were の1文字で非現実の空気を作る。',
                    yuki: 'were = 過去じゃなくて「非現実」のマーカーって説明、学校の教科書より分かりやすい。',
                    kenji: "現場で If I were the boss, I\\'d do it differently って言えば重みが出る。使える。",
                    mina: 'TikTok で「If I were rich…」ってノリで始まるミーム多いのは、この were のドラマ性やん。',
                },
            },
            {
                id: 'd3-g-02-wish-i-knew',
                label: "I wish I knew -- 願望の過去形",
                trigger: '「その答えが分かればなあ」を英語で。',
                points: {
                    core: { en: "I wish I knew the answer.", ja: 'wish の後は現在の事実と反対のことを過去形で。今知らないという現実からの距離。' },
                    nuance: { en: "I wish I knew = I don't know, but I want to.", ja: '現在の無知を嘆く表現。knew は過去ではなく現実の反対。' },
                    shift: { en: "I wish I had known -- past regret, one more step back.", ja: 'さらに過去への距離は過去完了。「知っていれば良かった (知らなかった)」。' },
                    native: { en: "God, I wish I knew what she was actually thinking -- she's been weirdly quiet all day and it's starting to stress me out.", ja: 'あー、彼女が本当に何考えてるか分かればなあ。今日ずっと妙に静かで、こっちが気になってくる。' },
                },
                trap: 'wish の後に現在形 (I wish I know) を使う。現実で知らないことを「知りたい」と言う時の距離感が出ない。',
                tip: 'wish が出た瞬間に動詞を過去形に落とす。現在の不満・不足 → 過去形で出す、と自動化。',
                reactions: {
                    master: 'wish の後続は仮定法。現在の事実と反対なら過去形、過去の事実と反対なら過去完了形、と時制で距離を描き分ける。',
                    lisa: "'I wish I know Spanish' sounds like you're a robot. 'I wish I knew Spanish' -- that's me being wistful.",
                    takeshi: "「〜ならいいのに」の時制、現在形で出すと願望の湿度が消える。過去形で湿らせろ。",
                    yuki: 'wish の後に過去形来るのって最初違和感だけど、「現実から1歩引く」って思うと受け入れやすい。',
                    kenji: "I wish I had more time、現場で使える愚痴フレーズ。過去完了じゃなくて過去形ね。",
                    mina: 'ラブソングの I wish I knew 系歌詞の切なさ、あの過去形が効いてたん納得。',
                },
            },
            {
                id: 'd3-g-03-if-had',
                label: "If I had time -- 時間がない現実の裏返し",
                trigger: '「時間があればいいのに」を英語で (現在の話)。',
                points: {
                    core: { en: "If I had time, I would help you.", ja: '現実では時間がない。had は現在の反対を示す過去形。' },
                    nuance: { en: "If I had time = I don't have time right now.", ja: '表面は「時間があれば」だが裏は「今ない」。含意が強い。' },
                    shift: { en: "If I had had time -- yesterday, in the past, no time existed.", ja: '過去のことを言うなら had had に1段階引く。現在 → 過去形、過去 → 過去完了。' },
                    native: { en: "Dude, if I had the kind of money she has, I'd literally be on a beach in Hawaii right now, not sitting here working.", ja: 'おい、彼女くらい金あったら、マジで今頃ハワイのビーチにいるよ。こんなとこで働いてない。' },
                },
                trap: '現在の仮定を If I have で出す。現在形だと「条件が成立しうる未来」の意味になり、「今ないけど」のニュアンスが出ない。',
                tip: '動詞を1段階過去に引く = 現在の反対。2段階引けば過去の反対。現実からの距離=時制の段数。',
                reactions: {
                    master: '仮定法過去は「現在の反事実」、仮定法過去完了は「過去の反事実」。時制の段階で現実からの距離が決まる。',
                    lisa: "If I had time = I don't have time. The past tense carries the 'not really' meaning.",
                    takeshi: '仮定法の「時制のズレ」って言葉で覚えるより、「現在の反対を過去形で出す」のほうが使える。',
                    yuki: '現実のマイナスを過去形で表すって、時制のラベルが「時間」じゃなくなる経験。',
                    kenji: "If I had time I'd help you、断りながら親切感残す言い方、現場で使える。",
                    mina: 'If I had a yen for every... の英語のミーム、この仮定法過去のジョークやったん。',
                },
            },
            {
                id: 'd3-g-04-would-vs-will',
                label: "would = will の過去形ではなく「距離」の will",
                trigger: '「俺なら辞めるわ」を英語で。',
                points: {
                    core: { en: "I would quit.", ja: '帰結節の would は「現実なら will で出すところを、1歩引いた位置から出す」の印。' },
                    nuance: { en: "I would quit = in a hypothetical world, I'd quit.", ja: 'would は未来の助動詞 will の仮定法版。現実では起きないが、仮定の世界での選択。' },
                    shift: { en: "I will quit = real decision. I would quit = hypothetical choice.", ja: "will は実際の決定、would は非現実下の選択。時制ではなく現実度の差。" },
                    native: { en: "Honestly, if my boss had pulled that on me, I would've quit on the spot -- I don't know how you're still putting up with it.", ja: '正直、俺の上司がそれやってきたらその場で辞めてた。よく我慢してるなって思う。' },
                },
                trap: "仮定の話に will を混ぜる。「もしそうなら辞める」を If so, I will quit にすると、実際に起きる前提に化ける。",
                tip: "if 節に仮定法が来たら、帰結節は自動的に would / could / might。will は禁止、と機械的に処理。",
                reactions: {
                    master: 'if 節が仮定法なら主節の助動詞も仮定法 (would, could, should, might) で一致させる。時制の一致規則。',
                    lisa: "'What would you do if you won?' -- 'I would travel.' Answering with 'I will travel' sounds like you already won.",
                    takeshi: 'would は「will の過去形」じゃなく「仮定の will」。時間ではなく現実からの距離。',
                    yuki: 'would の役割、これでやっと掴めた。will と別物として覚える。',
                    kenji: "I would do it differently、現場で意見言う時の定型。俺なら、の would。",
                    mina: "Twitter の「I would 100% do that」ってノリ、仮定の世界での100%やったんか。",
                },
            },
            {
                id: 'd3-g-05-as-if',
                label: "as if + 過去形 -- ふりをする構文",
                trigger: '「あいつ何でも知ってるみたいに振る舞う」を英語で。',
                points: {
                    core: { en: "He acts as if he knew everything.", ja: 'as if の後は仮定法。「実際は知らないのに、知ってるみたいに」の含意。' },
                    nuance: { en: "acts as if he knew = he doesn't actually know.", ja: '過去形で「現実の反対」を示す。「振る舞い」と「現実」の距離を出す。' },
                    shift: { en: "Casual: 'He acts like he knows everything' -- like + 現在形 is conversational.", ja: '口語では like + 現在形で代替されがち。書き言葉では as if + 仮定法がフォーマル。' },
                    native: { en: "He talks as if he knew everything about crypto, but honestly he's wrong like half the time and just doesn't realize it.", ja: '仮想通貨の話で何でも知ってる風に喋るけど、正直半分くらい間違ってて、本人気づいてないんだよ。' },
                },
                trap: "as if he knows で現在形を使う。「実際知ってる」の意味になるので、非現実の演技感が消える。",
                tip: "as if / as though が出たら動詞を1段引く。現実の反対、という仮定法の基本動作がここでも効く。",
                reactions: {
                    master: 'as if / as though は仮定法節を導く標準句。後続節の動詞は必ず1段過去に引くのが規範英語。',
                    lisa: "'He acts as if he knows' -- to me that means he actually knows. 'Knew' tells me he's faking.",
                    takeshi: '「知ったかぶり」を英語で出すのにこの構文が効く。as if + 過去形で「本当は違う」の毒を含ませる。',
                    yuki: 'as if の後も仮定法なの、見落としてた。現実の反対を描く構文全部にこのルール効くってこと。',
                    kenji: "He talks as if he were the boss、現場でよく言う皮肉、これで出せる。",
                    mina: '「As if!」ってスラングで使うやん、あれも「そんなわけないやろ」の仮定法の感覚から来てる。',
                },
            },
        ],
    },
};
