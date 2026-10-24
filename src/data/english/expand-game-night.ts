// 口語10変化 -- Game Night (2018) 編
//
// 思想: セリフの暗記は「点」。会話力は「同じ意図を状況と温度で言い分ける面」。
// 映画は素材ではなく索引。1回観た場面の記憶をアンカーに、
// 会話の「手 (move)」ごとに10通りの言い方を面で入れる。
//
// ルール:
//   - セリフの転載はしない。アンカーは場面の説明のみ。
//   - 変化形は全部こちらの自作。register タグと日本語の温度メモ付き。
//   - g-dropping 禁止 (-ing はフルで書く)。

export interface Variation {
    en: string;
    tag: string;    // 温度・文体タグ
    note: string;   // いつ・どう使うか
}

export interface Move {
    id: string;
    title: string;        // 会話の手の名前
    sceneJp: string;      // 映画のどの場面がアンカーか (説明のみ)
    drillJp: string;      // 先に自分で言ってみるお題
    core: string;         // 基準形 (これだけ覚えるなら)
    coreNote: string;
    variations: Variation[];
}

export const GAME_NIGHT_MOVES: Move[] = [
    {
        id: 'sore-loser',
        title: '負けを認めない -- まぐれ宣言',
        sceneJp: '冒頭、勝負事に病的に負けず嫌いな夫婦が出会うクイズナイト。以後全編、負けた側は絶対に実力を認めない。',
        drillJp: 'ゲームで負けた。悔しい。「まぐれだろ」を英語で、できれば3発分。',
        core: 'You got lucky.',
        coreNote: '負け惜しみの世界標準。get lucky = たまたまうまくいく。',
        variations: [
            { en: 'You got lucky.', tag: '素', note: '基準形。トーン次第で冗談にも本気にもなる' },
            { en: "Beginner's luck.", tag: '定型', note: '初心者相手専用の決まり文句。名詞だけで文になる' },
            { en: 'That was a fluke and you know it.', tag: '強め', note: 'fluke = まぐれ。and you know it で「自覚あるだろ」を追撃' },
            { en: 'Lucky shot.', tag: '最小', note: '2語。ダーツ・シュート系の負けに' },
            { en: "OK, that one doesn't count.", tag: '無効宣言', note: '今のはノーカン。子供っぽさを自覚して使う分には笑いになる' },
            { en: 'Best two out of three.', tag: '再戦要求', note: '3本勝負な、の定型。負けた側だけが言う台詞という共通認識がある' },
            { en: 'Enjoy it while it lasts.', tag: '皮肉', note: '今のうちに喜んでおけ。捨て台詞の品のある形' },
            { en: 'The board was rigged.', tag: '大げさ', note: 'rigged = 八百長。真顔で言うほど面白い陰謀論型の負け惜しみ' },
            { en: 'I let you have that one.', tag: '上から', note: '「今のはくれてやった」。負けてから言うと最高に往生際が悪い' },
            { en: "Don't get used to it.", tag: '釘刺し', note: '調子に乗るなよ、を4語で。次は勝つという宣言込み' },
        ],
    },
    {
        id: 'disbelief',
        title: '「マジで言ってる?」-- 疑いの受け',
        sceneJp: '「誘拐ゲーム」の最中に本物の強盗が乱入する中盤。ゲームか現実か誰も確信が持てないまま会話が進む、映画全体がこの手でできている。',
        drillJp: '信じがたい話を聞かされた。「え、本気で言ってる?」を温度違いで3発。',
        core: "You're kidding, right?",
        coreNote: '疑いの基準形。right? を付けると「冗談だと言ってくれ」の願望が乗る。',
        variations: [
            { en: "You're kidding, right?", tag: '素', note: '基準形。冗談だよな?の確認' },
            { en: 'Wait, are you serious?', tag: '素', note: 'wait で会話を一時停止させてから聞き直す' },
            { en: "You're messing with me.", tag: '軽口', note: 'からかってるだろ。疑いを断定形で返す' },
            { en: 'No way.', tag: '最小', note: '2語で不信。イントネーションが全て' },
            { en: 'Shut up.', tag: 'スラング', note: '「黙れ」ではない。「うそでしょ!?」の驚き。女性同士の会話で頻出' },
            { en: "You're not serious right now.", tag: '強め', note: '否定文で作る疑い。right now が「この状況で?」を足す' },
            { en: 'Is this a bit?', tag: 'コメディ', note: 'bit = 仕込みの小ネタ。「これ、ネタ?」。芸人文化の語彙' },
            { en: 'Hold on. For real?', tag: '口語', note: 'for real? は for real life の略でない、それ自体が定型' },
            { en: "There's no way that's true.", tag: '論理', note: '事実性そのものを否定する。相手ではなく話を疑う形' },
            { en: "I can't tell if you're joking.", tag: '正直', note: '冗談か本気か判定不能、という白旗。実は一番誠実な返し' },
        ],
    },
    {
        id: 'play-it-cool',
        title: '動揺を隠して平静を装う',
        sceneJp: '血まみれの事態になってもゲームの演出だと思い込んでいる面々が、内心の動揺を全員下手に隠す。この映画の笑いの主エンジン。',
        drillJp: '内心かなり焦っている。でも平気なふりをしたい。何と言う?',
        core: "I'm fine. Everything's fine.",
        coreNote: '繰り返した時点でバレる、という様式美込みの定型。',
        variations: [
            { en: "I'm fine. Everything's fine.", tag: '様式美', note: '2回言うほど怪しい、を全員わかった上で使う' },
            { en: "It's all good.", tag: '素', note: '万能の「問題ない」。軽さで押し切る' },
            { en: 'Totally under control.', tag: '強がり', note: 'totally が付くほど制御できていない法則' },
            { en: 'Why would I be nervous?', tag: '藪蛇', note: '聞かれてもいないのに否定して自白するパターン' },
            { en: "I'm cool. We're cool. It's cool.", tag: '3連', note: '主語を変えて3連打。動揺の教科書' },
            { en: 'Nothing to see here.', tag: '定型', note: '警官が野次馬に言う台詞の転用。自分に使うと冗談になる' },
            { en: "Ha. That's funny. Anyway.", tag: '話題転換', note: '乾いた笑い+anyway で強制的に次へ' },
            { en: 'I was just about to say that.', tag: '取り繕い', note: '「今言おうと思ってた」。後出しの定番' },
            { en: 'Yep. Great. Love that.', tag: '棒読み', note: '短文3連の棒読みは「全然greatじゃない」の記号' },
            { en: "Do I look worried? Don't answer that.", tag: '自己ツッコミ', note: '聞いておいて回答を拒否する2段構え' },
        ],
    },
    {
        id: 'soft-decline',
        title: 'やんわり断る -- 角を立てない不参加',
        sceneJp: 'ゲームナイトへの誘い、危険な計画への同行、隣人の誘い。断る場面が全編に散っている。',
        drillJp: '乗り気じゃない誘いを受けた。角を立てずに断る言い方を3種類。',
        core: "I think I'll sit this one out.",
        coreNote: 'sit out = (試合などを)休む。ゲーム文脈がそのまま日常語になった表現。',
        variations: [
            { en: "I think I'll sit this one out.", tag: '素', note: '今回はパスするよ。スポーツ由来の万能形' },
            { en: "I'm good, thanks.", tag: '口語', note: 'I\'m good は「結構です」。誘いへのNoの最頻形' },
            { en: 'Maybe next time.', tag: '先送り', note: '次回はある、という体裁の断り。本心は問わない' },
            { en: "I'll pass.", tag: '最小', note: '2語。素っ気なさはトーンで調整' },
            { en: 'Count me out for this one.', tag: '素', note: 'count me out = 頭数から外して。in の逆' },
            { en: "It's not really my thing.", tag: '好み', note: 'my thing = 守備範囲。人格でなく相性の問題にする' },
            { en: "I'd rather just watch.", tag: '観戦', note: '参加せず見ていたい。ゲーム・カラオケで多用' },
            { en: 'Tempting, but no.', tag: '軽口', note: '「魅力的だが、断る」。3語で品よく落とす' },
            { en: 'Hard pass.', tag: '強め', note: '絶対にやらない、の冗談めかした全力拒否' },
            { en: 'You guys go ahead.', tag: '譲り', note: '自分抜きで進めて、の柔らかい形。先に行かせる断り' },
        ],
    },
    {
        id: 'couple-defuse',
        title: '夫婦の火種を今は消す -- 「今やめよう」',
        sceneJp: '子供を作るか問題を抱えた主人公夫婦が、ゲームの最中に何度も夫婦の議題に引火しかける。',
        drillJp: 'パートナーが人前で痛い話題を蒸し返しはじめた。今は勘弁してほしい。',
        core: 'Can we not do this right now?',
        coreNote: 'do this = この口論。not の位置が肝で、「今この儀式をやるのはやめないか」。',
        variations: [
            { en: 'Can we not do this right now?', tag: '素', note: '基準形。this に「いつもの喧嘩」が全部入っている' },
            { en: 'Not in front of everyone.', tag: '場所', note: 'みんなの前ではやめて。場だけを理由にする' },
            { en: "We'll talk about this later.", tag: '先送り', note: '後でな、の定型。later が来ない場合も多い' },
            { en: 'Here we go.', tag: 'うんざり', note: '「始まった」。天を仰ぎながら言う3語' },
            { en: "Don't start.", tag: '強め', note: '火をつけるな。2語の制止' },
            { en: "I'm not having this conversation.", tag: '拒否', note: 'この会話自体を拒否する。進行形が「今まさに拒否中」を作る' },
            { en: "You're really doing this now?", tag: '非難', note: 'このタイミングでやる?と相手の選択を責める' },
            { en: "Let's not turn this into a thing.", tag: '口語', note: 'a thing = 大ごと・案件。大ごと化を未然に止める' },
            { en: 'Noted.', tag: '最小', note: '一語で「はいはい、記録した」。議論を打ち切る冷たさも出せる' },
            { en: 'Happy? Can we move on?', tag: '投げやり', note: '満足か? 次行っていいか? 折れたふりの前進' },
        ],
    },
    {
        id: 'awkward-exit',
        title: '気まずさからの脱出',
        sceneJp: '離婚したての隣人の警官ゲイリー。彼が登場するたびに空気が凍り、全員が出口を探す。',
        drillJp: '会話が完全に気まずくなった。この空気から脱出する一言を。',
        core: 'Well, this got weird.',
        coreNote: 'get + 形容詞 = 状態変化。「気まずくなっちゃったね」と実況して空気ごと笑いに変える。',
        variations: [
            { en: 'Well, this got weird.', tag: '実況', note: '気まずさを言語化した者が場の主導権を取り返す' },
            { en: 'So... anyway.', tag: '接続詞', note: 'so と anyway だけで話題を強制リセット。間が命' },
            { en: 'OK then.', tag: '最小', note: '「はい、そういうことで」。会話の蓋' },
            { en: 'Moving on.', tag: '進行', note: '次に進みます、の司会者ムーブ' },
            { en: 'Awkward.', tag: '一語実況', note: '小声で言う「気まずっ」。半分独り言' },
            { en: "I'm just going to pretend that didn't happen.", tag: '宣言', note: '今のはなかったことにします、と処理方法ごと宣言' },
            { en: 'Who wants drinks?', tag: '強制転換', note: '飲み物で話題を物理的に上書きする。ホストの必殺技' },
            { en: 'Wow. Look at the time.', tag: '定型', note: '時計を見るふりで退出する様式美。本当に時間は見ていない' },
            { en: 'That came out wrong.', tag: '訂正', note: '今の、変な意味になった。失言直後の火消し' },
            { en: 'Let\'s circle back to literally anything else.', tag: '大げさ', note: 'circle back(戻る)+literally anything else(文字通り何でもいい)の悲鳴' },
        ],
    },
    {
        id: 'press-truth',
        title: '問い詰める -- 「何を隠してる?」',
        sceneJp: '兄が仕掛けたゲームの真相、夫が隠していた過去。後半は全員が誰かを問い詰めている。',
        drillJp: '相手が何か隠しているのは確実。白状させたい。詰めの一言を3段階の強さで。',
        core: "What aren't you telling me?",
        coreNote: '否定疑問で「言っていないこと」の存在を前提にする。直訳不能の頻出形。',
        variations: [
            { en: "What aren't you telling me?", tag: '素', note: '基準形。隠し事の存在を前提に踏み込む' },
            { en: "OK, what's going on?", tag: '入口', note: '詰めの初手。OK で「茶番は終わり」を宣言してから聞く' },
            { en: "Something's off.", tag: '違和感', note: 'off = ずれている。確証なしで違和感だけ表明する' },
            { en: "You're hiding something.", tag: '断定', note: '疑問文をやめて断定する。返答の逃げ道を狭める' },
            { en: 'Out with it.', tag: '命令', note: '「吐け」。3語の尋問' },
            { en: 'Since when?', tag: '追撃', note: '相手の発言の直後に2語で刺す。「いつからだよ」' },
            { en: "And you didn't think to mention that?", tag: '皮肉', note: 'それを言おうとは思わなかったわけだ? 事後発覚の定番の怒り' },
            { en: 'Look me in the eye and say that.', tag: '対面', note: '目を見て言え。嘘の最終検査' },
            { en: "That's not what you said yesterday.", tag: '証拠', note: '昨日と言っていることが違う。矛盾を突く型' },
            { en: "I'm not mad. I just want the truth.", tag: '前置きの嘘', note: '「怒ってない」はほぼ常に怒っている。使う側も聞く側も知っている様式' },
        ],
    },
    {
        id: 'non-apology',
        title: '謝るけど非は認めない',
        sceneJp: '嘘がバレた夫の釈明、やりすぎた兄の言い訳。謝罪風の非謝罪が連発される。',
        drillJp: '謝らないとまずい空気。でも全面降伏はしたくない。ずるい謝り方を。',
        core: "I'm sorry you feel that way.",
        coreNote: '悪名高い非謝罪の代表。謝る対象が「自分の行為」でなく「相手の感情」にすり替わっている。',
        variations: [
            { en: "I'm sorry you feel that way.", tag: '非謝罪', note: '使うと炎上する、という知識として持つ。言われたら気づけ' },
            { en: 'Mistakes were made.', tag: '受動態', note: '受け身で主語(=犯人)を消す。政治家の伝統芸' },
            { en: 'I may have overreacted. A little.', tag: '小出し', note: 'may have で可能性の話にして、a little でさらに値切る' },
            { en: "OK, that's fair. But--", tag: '転置', note: '一旦認めてから but で全部ひっくり返す' },
            { en: 'In my defense, it seemed like a good idea.', tag: '弁明', note: 'in my defense = 弁解させてもらうと。ダメだった自覚込み' },
            { en: 'I was going to tell you.', tag: '定番', note: '言うつもりだった(過去形)。バレた後にしか発生しない台詞' },
            { en: "It's not what it looks like.", tag: '定番', note: '見た目通りじゃない。ほぼ常に見た目通り' },
            { en: 'Technically, I never lied.', tag: '屁理屈', note: 'technically = 厳密には。嘘と隠蔽の境界で戦う構え' },
            { en: 'Fine. My bad. Sort of.', tag: '値切り', note: 'my bad(俺のミス)に sort of を付けて50%引きにする' },
            { en: 'Can we agree we were both wrong? Mostly you.', tag: '冗談', note: '痛み分け提案からの後出し「主にお前」。笑いで着地する謝罪' },
        ],
    },
    {
        id: 'deflate-brag',
        title: '自慢を受け流す・つぶす',
        sceneJp: '成功者ヅラの兄が高級車と武勇伝で登場するたび、主人公夫婦が悔しさを隠して相槌を打つ。',
        drillJp: '鼻につく自慢話が続いている。真正面から怒らずに、皮肉で受け流せ。',
        core: 'Good for you.',
        coreNote: '文字通りなら「よかったね」。トーン次第で祝福にも侮蔑にもなる、英語の二面性の代表。',
        variations: [
            { en: 'Good for you.', tag: '二面性', note: '平坦に言えば皮肉、明るく言えば祝福。トーンが本体' },
            { en: 'Cool story.', tag: '皮肉', note: '「へー、すごいね(棒)」。ネット由来で口語に定着' },
            { en: 'Wow. Anyway.', tag: '即転換', note: '感嘆詞0.5秒からの話題変更。関心のなさを構造で示す' },
            { en: 'Do you want a medal?', tag: '攻撃', note: 'メダルでも欲しいのか。受け流しを超えた反撃' },
            { en: 'Congrats, I guess.', tag: '気のない', note: 'I guess が祝福の熱を根こそぎ奪う' },
            { en: 'Nobody asked, but impressive.', tag: '2段', note: '誰も聞いてないけど、と前置きしてから褒める高等皮肉' },
            { en: "We get it. You're amazing.", tag: 'うんざり', note: 'we get it = もうわかったって。集団の総意として止める' },
            { en: 'Humble as always.', tag: '皮肉', note: '「相変わらず謙虚だね」。謙虚の対極への賛辞' },
            { en: 'Must be nice.', tag: '定型', note: '「いいご身分だな」。嫉妬を3語に圧縮した決まり文句' },
            { en: "I'm so happy for you.", tag: '棒読み', note: '文面は満点の祝福。棒読みで言うことで完成する' },
        ],
    },
    {
        id: 'comeback',
        title: 'ツッコミで場を戻す',
        sceneJp: 'ボケ(妄言・暴走)のたびに誰かが一言で現実に引き戻す。掛け合いの映画なので全編がこの手の見本市。',
        drillJp: '友達がしょうもないボケをかました。一言で処理して会話を本題に戻せ。',
        core: 'Anyway. Where were we?',
        coreNote: 'ボケを無視して进行に戻る司会型ツッコミ。where were we = どこまで話したっけ。',
        variations: [
            { en: 'Anyway. Where were we?', tag: '進行', note: 'ボケを空振りさせて本題へ。無視も立派なツッコミ' },
            { en: 'OK, ignoring that.', tag: '宣言', note: '「今のは無視します」と処理を明言する' },
            { en: "He's kidding. Probably.", tag: 'フォロー', note: '第三者へ「冗談です」と通訳し、probably で不安を残す' },
            { en: "Don't encourage him.", tag: '共犯阻止', note: '笑うな、調子に乗る。ボケ本人でなく観客を叱る高等技術' },
            { en: "This is why we can't have nice things.", tag: '定型', note: '「こういうことするから」。台無し行為への万能の嘆き' },
            { en: 'You done?', tag: '最小', note: '「終わった?」2語。ボケの披露が終わるのを待っていた感を出す' },
            { en: 'Every single time.', tag: '嘆き', note: '毎回これだよ。single が入ると疲労が増す' },
            { en: "I can't take you anywhere.", tag: '定型', note: 'どこにも連れて行けない。連れの奇行への保護者の嘆き' },
            { en: 'See what I live with?', tag: '観客巻き込み', note: '「ね? 私はこれと暮らしてるの」。第三者に同意を求める' },
            { en: 'Back to the actual topic.', tag: '進行', note: 'actual が「今のは本題ではない」を静かに刺す' },
        ],
    },
];
