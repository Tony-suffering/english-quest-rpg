import type { Native365Day } from '@/types/native365';

/**
 * Day 22
 *
 * 発音: well の発音と用法 -- 「ウェル」じゃ届かない万能語
 * 文法: 付加疑問文 (tag question) -- 語尾を付け足す英語の柔らかさ
 */

export const DAY_22: Native365Day = {
    day: 22,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 日曜の昼下がり、二日酔いで来た権藤
    // ══════════════════════════════════════════════════
    opening: {
        scene: '日曜の昼下がり、二日酔い気味でやってきた権藤がコーヒーを頼む。健二がミナに付加疑問文の話を振ってる最中だった。',
        lines: [
            { char: 'kenji',  text: "『これ、お前のやろ?』を英語で出したい時、you know とかじゃなくて一瞬で語尾に付け足せる言い方あったよな。" },
            { char: 'mina',   text: "isn't it とか don't you? のやつやろ。付加疑問文、私 DM でもよう使うわ。" },
            { char: 'master', text: "それと well。文頭で \"Well...\" を「ウェル」と発音する日本人が9割。あれは半分飲み込むから柔らかさが出るんだ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: well の発音と用法
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'well の発音と用法 -- 「ウェル」じゃ届かない万能語',
        subtitle: '間をつなぐ well は母音が曖昧化する。dark L と schwa の合わせ技。',
        intro: {
            question: 'なぜ日本人の "Well..." は「ウェル」と聞こえて英語に聞こえないのか?',
            insight: '日本語の「ウェル」は母音「エ」が明瞭で、子音 L が日本語の「ル」に引きずられる。英語の well は逆で、母音 /ɛ/ は短く弱まり、L は舌先を上の歯茎につけたまま開放しない dark L。結果、well 全体が「ウェゥ」と曖昧に終わり、その曖昧さが「考えてる間」のニュアンスを作る。\n\nさらに well は文頭で「えーっと」「まあ」のフィラーとして使われる時、さらに弱まって /wəl/ に近い音になる。文末で「じゃあね」の well なら中程度、形容詞の「元気な」well なら強く明瞭に /wɛl/ と出す。同じ単語で3段階の音量を使い分ける。\n\n「ウェル」と明瞭に出す限り、あなたの英語は文頭で毎回「宣言」してる風になる。well を曖昧に飲めるようになって初めて、ネイティブの「考えながら話す」リズムに入れる。',
        },
        tldr: 'well を文頭フィラーなら弱く、形容詞なら強く。dark L で締めずに開放する。',
        items: [
            {
                id: 'd22-p-01-well-filler',
                label: 'Well, ... -- 文頭フィラー、弱く',
                trigger: "'Well, I don\\'t know.' を発音しろ。",
                points: {
                    core: { en: '/wəl/ (reduced), short', ja: '文頭フィラーの well は schwa 化し、母音が曖昧になる。' },
                    nuance: { en: "Wəl, I dunno. The well almost blends into the next word.", ja: '次の語に溶けるぐらい短く。「えーと」の機能語化。' },
                    shift: { en: "Wellll... (dragged out) signals hesitation or bad news.", ja: '母音を伸ばして出すと「躊躇」や「悪い話を切り出す」サインになる。' },
                    native: { en: "Well, that's one way to put it.", ja: '「まあ、そういう言い方もあるな」の定型。曖昧な同意。' },
                },
                trap: '「ウェル」と明瞭に出す。文頭で宣言的に聞こえて、考えてるニュアンスが死ぬ。',
                tip: 'well を「うぇぅ」くらいの曖昧さで出す。舌先は上の歯茎についたまま。',
                reactions: {
                    master: 'フィラーの well は語彙的意味を失い、ポーズの代替物として機能する。音も機能語化する。',
                    lisa: "When I say 'Well...' it's basically a half-syllable. You barely hear the L.",
                    takeshi: "「ウェル」って強く出すと、「はい!」って挙手してる感じになる。ボソッと出せ。",
                    yuki: 'フィラーの well、弱く出すだけでこんなに違うんや。練習する。',
                    kenji: "現場で 'Well, let me check' ってサラッと言えたら、時間稼ぎが自然になる。",
                    mina: '"Well well well" って SNS で見る時あるやん。あれは逆に強調版の使い方。',
                },
            },
            {
                id: 'd22-p-02-well-adjective',
                label: "I\\'m well -- 形容詞は強く明瞭に",
                trigger: "'How are you? I\\'m well.' を発音しろ。",
                points: {
                    core: { en: '/wɛl/ (full vowel, clear L)', ja: '形容詞「元気な/良い」の well は母音が明瞭、L も響かせる。' },
                    nuance: { en: "I'm WELL, thanks. Full stress.", ja: '自分の状態を伝える時は音量を取る。機能語ではなく内容語。' },
                    shift: { en: "米: I'm good. 英: I'm well.", ja: '米語では good が主流、英語圏の教養層では well が正確。好みが分かれる。' },
                    native: { en: "She's not well lately. (sick)", ja: '「体調が優れない」の婉曲表現。ill より柔らかい。' },
                },
                trap: 'フィラーと形容詞で同じ弱さで出す。形容詞の well は内容語として音量を要求する。',
                tip: '「私、元気」の時の well は「ウェル」と響かせてOK。弱すぎると意味が立たない。',
                reactions: {
                    master: '形容詞用法の well は内容語として原則強勢を取る。フィラーとは機能階層が違う。',
                    lisa: "When someone asks how I am and I say 'I'm well' I pronounce it clearly. Different energy from 'Well, I think...'.",
                    takeshi: 'フィラーの well は弱く、形容詞の well は強く。同じ綴りで役が違えば音が違う。',
                    yuki: "'How are you?' に 'I'm well' って返すの、ちょっと上品な感じするな。",
                    kenji: "海外クライアントに 'Are you well?' って聞かれたら、ちゃんと 'I'm well' で返したい。",
                    mina: "Z 世代は \"I\\'m good\" の方が多いけど、well の方が大人っぽい印象やわ。",
                },
            },
            {
                id: 'd22-p-03-well-then',
                label: 'Well, then -- 切り替えの2語',
                trigger: "'Well, then, let\\'s go.' を発音しろ。",
                points: {
                    core: { en: "Well-then = weəl-DHEN. Filler + transition.", ja: 'well でポーズを作り、then で話題を前に進める2語セット。' },
                    nuance: { en: "The emphasis shifts to 'then' -- it's the actual pivot.", ja: 'well は助走、then が本題。音量は then に乗る。' },
                    shift: { en: "Well then. (with period, confrontational) / Well, then... (trailing, hesitant)", ja: 'イントネーションで「よし」の決意か「じゃあ…」の躊躇か分かれる。' },
                    native: { en: "Well then, that settles it.", ja: '「じゃあ、それで決まりだな」。会議で決着をつける一言。' },
                },
                trap: 'well と then を同じ音量で読む。切り替えの重心が失われる。',
                tip: 'well を助走の弱、then で決断の強。2語で山を1つ作る。',
                reactions: {
                    master: '談話標識 (discourse marker) としての well-then は2語で1機能。リズムも一体化する。',
                    lisa: "'Well then' with a strong THEN means 'okay, moving on'. Very useful.",
                    takeshi: "ダラダラする会議、\"Well then, let\\'s decide\" の一言で締められたらかっこいい。",
                    yuki: 'well と then、セットで使うと話が進むリズムが出るの面白い。',
                    kenji: '現場で話を切り替える時、"Well then, next topic" で一発。',
                    mina: '"Well then" で DM 返すの、ちょい冷めた感じ出せるから便利やで。',
                },
            },
            {
                id: 'd22-p-04-as-well',
                label: 'as well -- 文末の追加、L は消える',
                trigger: "'I like it as well.' を発音しろ。",
                points: {
                    core: { en: '/əz-ˈwɛl/', ja: 'as well は文末で「〜も」の意。強勢は well に置く。' },
                    nuance: { en: "ez-WELL with the L softly released.", ja: 'L は開放しない dark L で、次の音 (ない場合は沈黙) に溶ける。' },
                    shift: { en: "too / also / as well -- same meaning, different register.", ja: '米語は too が普通、as well はやや上品。also は文中寄り。' },
                    native: { en: "I'll have the fish, and a salad as well.", ja: '「魚と、それとサラダも」。レストランの定型。' },
                },
                trap: '「アズウェル」と3音節で読む。英語は as を schwa 化して ez-WELL の2山。',
                tip: 'as を極力弱く、well を立てる。2語で1フレーズの塊として覚える。',
                reactions: {
                    master: 'as well は副詞句。as は前置詞の機能語化で schwa、well が強勢を取る。',
                    lisa: "Brits say 'as well' way more than Americans. I'd default to 'too'.",
                    takeshi: "'as well' と 'too' の違い、地域差。どっちも正解だが as well の方が書き言葉寄り。",
                    yuki: 'as well って文末限定? too と also との違い整理したい。',
                    kenji: "現場で 'and Kenji, as well' とか言えたら、自分も入れて欲しい時に使える。",
                    mina: "SNS で 'me as well' よりも 'same' や 'me too' の方が Z 世代やね。",
                },
            },
            {
                id: 'd22-p-05-oh-well',
                label: 'Oh well -- 諦めの2語',
                trigger: "'Oh well, next time.' を発音しろ。",
                points: {
                    core: { en: 'OH-well, falling intonation', ja: '「まあいいか」「しょうがない」の諦めの定型。OH で上がり well で下がる。' },
                    nuance: { en: "Oh WELL (resigned). Not Oh WELL! (surprised).", ja: 'イントネーションで意味が変わる。下がれば諦め、上がれば驚き。' },
                    shift: { en: "Ah well. / Well, well. / Oh well.", ja: '類似の諦めフレーズ。Ah well が英国寄り、Oh well が米国寄り。' },
                    native: { en: "Didn't get the job. Oh well, next one.", ja: '「就職決まらんかった。まあ、次」。切り替えの一言。' },
                },
                trap: '「オーウェル!」と驚いたイントネーションで出す。諦めのニュアンスが消える。',
                tip: '声を下げながら出す。肩をすくめるジェスチャーのイメージ。',
                reactions: {
                    master: 'oh well は感嘆詞句。音調下降で「許容」「諦め」の談話機能を持つ。',
                    lisa: "'Oh well' with a shrug is how I brush things off. Like 'it is what it is'.",
                    takeshi: '日本語の「まあ、しゃあない」が oh well。イントネーションで諦め感を出せ。',
                    yuki: 'oh well だけで「諦め」の意味になるの、英語の省エネすごい。',
                    kenji: "現場でミスった時の 'Oh well, next time' は空気が楽になる魔法の一言。",
                    mina: 'SNS で "oh well ¯\\_(ツ)_/¯" ってよく見るやん。まさに諦め系の顔文字とセット。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 付加疑問文 (tag question)
    // ══════════════════════════════════════════════════
    grammar: {
        title: '付加疑問文 -- 語尾を付け足す英語の柔らかさ',
        subtitle: '「〜だよね?」の確認ニュアンスを英語で出す必須技術。',
        intro: {
            question: 'なぜ日本人は付加疑問文を使えないのか?',
            insight: "日本語は「〜だよね?」「〜じゃない?」を語尾に付けるだけで確認のニュアンスを出せる。英語でこれを再現するのが付加疑問文 (tag question)。肯定文の後ろには否定タグ (isn\\'t it? / don\\'t you?)、否定文の後ろには肯定タグ (is it? / do you?) を付ける。\\n\\n日本人が使えない理由は2つ。1) 主動詞の時制・種類でタグの形が全部変わる (be動詞なら be、一般動詞なら do / does / did、助動詞ならその助動詞)。2) イントネーションで「確認」と「念押し」が切り替わる。上昇なら本当に聞いてる、下降なら「だよね」と同意を求めてる。\\n\\nこれを使いこなせるようになると、英語の柔らかさが一気に上がる。You\\'re coming, aren\\'t you? の方が、Are you coming? より親しみがあり、Yes/No の押しつけ感が減る。今日の5つで主要パターンを全部潰す。",
        },
        tldr: '肯定文 → 否定タグ、否定文 → 肯定タグ。主動詞の種類でタグの助動詞が決まる。',
        items: [
            {
                id: 'd22-g-01-tag-be',
                label: "It's nice, isn't it? -- be 動詞の基本",
                trigger: '「いい天気だね?」を英語で。',
                points: {
                    core: { en: "It's nice, isn't it?", ja: '肯定文 (It is) → 否定タグ (isn\'t it)。主語と be 動詞を繰り返す。' },
                    nuance: { en: "Rising: real question. Falling: seeking agreement.", ja: '上げ調子なら本当に聞いてる、下げ調子なら同意を求めてる。' },
                    shift: { en: "It isn't nice, is it?", ja: '否定文 (It isn\'t) → 肯定タグ (is it)。極性が逆転する。' },
                    native: { en: "It's a beautiful day, isn't it?", ja: '天気の話の鉄板。Yes/No を迫らない柔らかさ。' },
                },
                trap: "'It's nice, is it?' と肯定タグにしてしまう。肯定文には否定タグが基本。",
                tip: '主語と be動詞をコピー、極性を反転、短縮形にする、の3ステップ。',
                reactions: {
                    master: '付加疑問文の形成規則は「主動詞をコピーし極性を反転」。極性の一致は論理的誤り。',
                    lisa: "'It's nice, isn't it?' sounds so much warmer than just 'Is it nice?'. Softer.",
                    takeshi: "日本語の「〜だよね?」感覚で使えるのがタグ。肯定+否定、否定+肯定、逆転が鉄則。",
                    yuki: '極性を反転するってルール、機械的に覚えれば楽そう。',
                    kenji: "現場で 'It's hot today, isn't it?' って言えたら、会話のクッションになる。",
                    mina: "DM で \"It\\'s cute, isn\\'t it?\" て書くの、押し付けじゃなく同意求めてる感じ出せるやん。",
                },
            },
            {
                id: 'd22-g-02-tag-do',
                label: "You like it, don't you? -- 一般動詞は do",
                trigger: '「それ好きだよね?」を英語で。',
                points: {
                    core: { en: "You like it, don't you?", ja: '一般動詞の肯定文 → don\'t / doesn\'t / didn\'t でタグ。' },
                    nuance: { en: "He likes it, doesn't he? / They liked it, didn't they?", ja: '主語の人称と時制で do / does / did を使い分ける。' },
                    shift: { en: "You don't like it, do you?", ja: '否定文 → do / does / did の肯定タグ。' },
                    native: { en: "You know what I mean, don't you?", ja: '「分かるだろ?」の同意要求。英会話頻出。' },
                },
                trap: "'You like it, aren't you?' と be 動詞を付ける。一般動詞の文には do 系のタグ。",
                tip: "主動詞が be / 助動詞でないなら、do / does / did のいずれかでタグを作る。",
                reactions: {
                    master: '一般動詞の疑問形と同じ原則で do-support が必要。主動詞のタイプがタグの助動詞を決定する。',
                    lisa: "'You know what I mean, don't you?' is basically a verbal nudge. Very common.",
                    takeshi: '一般動詞のタグで do を忘れる日本人多い。be / 助動詞以外は全部 do 系、と覚えろ。',
                    yuki: 'do / does / did の使い分け、主語と時制で機械的に決まるの分かりやすい。',
                    kenji: "'You want coffee, don't you?' って言えたら距離感縮まる感あるな。",
                    mina: "\"You like him, don\\'t you?\" て DM で送るの、ちょっと挑発的で楽しい。",
                },
            },
            {
                id: 'd22-g-03-tag-can',
                label: "You can drive, can't you? -- 助動詞はそのまま",
                trigger: '「運転できるよね?」を英語で。',
                points: {
                    core: { en: "You can drive, can't you?", ja: '助動詞 (can, will, should, must, have) ならその助動詞をそのままタグに。' },
                    nuance: { en: "You should go, shouldn't you? / We will make it, won't we?", ja: 'should → shouldn\'t、will → won\'t。短縮形で統一。' },
                    shift: { en: "You've been there, haven't you? (have = 現在完了の助動詞)", ja: '現在完了の have は助動詞扱い、だから have / has がそのままタグに。' },
                    native: { en: "We can do this, can't we?", ja: '励ましの定型。「できるよね?」。' },
                },
                trap: "'You can drive, don't you?' と do を付けてしまう。助動詞がある時はそれを優先する。",
                tip: '主動詞の前に助動詞 (can, will, should, must, have, be) があるなら、それをコピーしてタグに。',
                reactions: {
                    master: '助動詞はそれ自体が補助動詞として機能を持つため、付加疑問では do 挿入せずにその助動詞を反復する。',
                    lisa: "'You can do it, can't you?' is what I'd say to my niece before a test. Supportive tag.",
                    takeshi: '助動詞のタグは簡単。そのまま繰り返して not を付けるだけ。悩むとこなし。',
                    yuki: "should、would、must も同じルールか。整理すると頭スッキリする。",
                    kenji: "'You will come, won't you?' で誘う時、ちょい強めの確認できる。",
                    mina: "SNS で \"we can do this, can\\'t we?\" て書くと仲間感出るやん。",
                },
            },
            {
                id: 'd22-g-04-tag-imperative',
                label: "Close the door, will you? -- 命令文のタグ",
                trigger: '「ドア閉めてくれる?」を英語で。',
                points: {
                    core: { en: "Close the door, will you?", ja: '命令文 → will you / would you / can you / could you で柔らかくする。' },
                    nuance: { en: "Softer: would you? / could you? / Pushy: can't you?", ja: 'would / could が丁寧、can\'t you は苛立ちの含み。' },
                    shift: { en: "Let's go, shall we?", ja: 'Let\'s 構文には shall we が専用タグ。' },
                    native: { en: "Pass the salt, would you?", ja: '食卓の柔らかい依頼。命令が丁寧になる。' },
                },
                trap: "'Close the door, don't you?' と一般のタグルールで作る。命令文は will / would / shall で専用。",
                tip: "命令 → will you (中立)、would you (丁寧)。Let's → shall we。これはルール別。",
                reactions: {
                    master: '命令文は通常の時制・主語を持たないため、タグは独自の will / would / shall 系を使う。例外規則。',
                    lisa: "'Close the door, would you?' is way nicer than just 'Close the door'. Tag softens it.",
                    takeshi: "命令をそのまま出すと強く聞こえる。will you / would you 足すだけで空気変わる。",
                    yuki: "Let's の後が shall we って、古風やけど現役なんや。",
                    kenji: "現場で 'Hand me that, will you?' ってサラッと言えたら同僚感出る。",
                    mina: '"Text me, will you?" って DM で書くの、命令やけど可愛い感じに変わるやん。',
                },
            },
            {
                id: 'd22-g-05-tag-intonation',
                label: 'イントネーションで意味が変わる',
                trigger: "'You\\'re coming, aren\\'t you?' を上昇と下降の2通りで読め。",
                points: {
                    core: { en: "↗ aren't you? (real question)", ja: '上昇調はまだ確信がない、本当に確認したい時。' },
                    nuance: { en: "↘ aren't you? (seeking agreement)", ja: '下降調は「来るよね?」と同意を求めてる。確信あり。' },
                    shift: { en: "Same words, two meanings. Intonation carries half the message.", ja: '同じタグでも上下で意味が別物。音が情報を半分担う。' },
                    native: { en: "You got it, didn't you? (↘ confident)", ja: '「分かったよね?」の下降調。相手が理解してる前提。' },
                },
                trap: 'タグを全部上昇で読む。下降のパターンが使えないと、確信を示せない。',
                tip: '「本当に聞いてる?」→ 上げる。「同意求めてる?」→ 下げる。文脈で判断して音を変える。',
                reactions: {
                    master: '付加疑問の語用論的機能は intonation contour で決まる。上昇=真正疑問、下降=確認要求。',
                    lisa: "When I go ↗ at the end, I actually want an answer. When I go ↘, I already know.",
                    takeshi: 'タグのイントネーション、これ1つで「質問」と「念押し」が分かれる。練習必須。',
                    yuki: 'イントネーションで意味が変わるって、書いた文字だけじゃ分からんのが怖い。',
                    kenji: "'You got it, didn't you?' を下げて言えたら、現場で信頼感出せる。",
                    mina: 'SNS で書くとどっちか分からんから絵文字つける感じやね。音声の情報量は半端ない。',
                },
            },
        ],
    },
};
