import type { DayStory } from '@/types/lisque';

// ═══════════════════════════════════════════════════════════
// リスクエ (LisQue) - Takeshiのシンガポール大作戦
// 30日間のストーリーラッパー
//
// IT企業のPM・タケシ(35歳/TOEIC 550)に突然の辞令。
// 30日後のシンガポール国際テックカンファレンスで英語プレゼン。
// 居酒屋のれんの仲間たちが総力戦で彼の耳を鍛える。
// ═══════════════════════════════════════════════════════════

export const LISQUE_STORIES: Record<number, DayStory> = {

  // ═══════════════════════════════════════════════════════════
  // Phase 1: 音の基礎 (Days 1-10)
  // まず「聞く」とは何かを知る
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────
  // Day 1: 英語と日本語は別の惑星の言語
  // ─────────────────────────────────────────────────────────
  1: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'master', 'yuki'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。のれんの引き戸が勢いよく開いた。タケシが青い顔で飛び込んできた。' },
      { speaker: 'takeshi', text: 'マスター、ハイボール。いや、3杯。', mood: 'frustrated', action: '(カウンターに崩れ落ちる)' },
      { speaker: 'master', text: 'どうした。彼女に振られたか。', action: '(グラスを磨きながら)' },
      { speaker: 'takeshi', text: '振られたほうがマシっすよ。......シンガポールで英語プレゼンやれって言われました。30日後。', mood: 'frustrated' },
      { speaker: 'yuki', text: '30日!? シンガポールの国際カンファレンス......?', mood: 'surprised' },
      { speaker: 'takeshi', text: '英語聞き取れないんすよ。会議の音声流れてきても、全部同じ音に聞こえる。宇宙語。', mood: 'frustrated' },
      { speaker: 'master', text: '......当たり前だ。英語と日本語は、別の惑星の言語なんだから。', mood: 'normal', action: '(ハイボールを出す)' },
    ],
    closing: [
      { speaker: 'master', text: '日本語は母音が5つ。英語は20以上ある。音の数が全然違う。聞こえないのは当たり前だ。', mood: 'normal' },
      { speaker: 'takeshi', text: '......じゃあ俺、一生聞き取れないってことすか。', mood: 'frustrated' },
      { speaker: 'yuki', text: '逆だよ。「なぜ聞こえないか」が分かれば、対策が打てるってこと。', mood: 'normal' },
      { speaker: 'master', text: '30日で耳を作り直してやる。明日も来い。', mood: 'determined' },
      { speaker: 'takeshi', text: '......はい。お願いします。', mood: 'determined', action: '(ハイボールを一気に飲み干す)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 2: 子音が消える!? 日本語にない音
  // ─────────────────────────────────────────────────────────
  2: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'master', 'lisa'],
    opening: [
      { speaker: 'narration', text: '土曜の昼。リサがのれんにやってきた。マスターが呼んだらしい。' },
      { speaker: 'lisa', text: 'タケシくん、「sit」と「shit」の違い、分かる?', mood: 'normal', action: '(カウンターに座る)' },
      { speaker: 'takeshi', text: '......同じに聞こえます。', mood: 'embarrassed' },
      { speaker: 'lisa', text: '日本語にない音だからね。日本語の「シ」で全部処理しちゃってるの。', mood: 'normal' },
      { speaker: 'master', text: '英語には日本語に存在しない子音がゴロゴロある。それを脳が勝手に一番近い日本語の音に変換してしまう。', mood: 'normal' },
      { speaker: 'takeshi', text: '脳が勝手に......。', mood: 'surprised' },
    ],
    closing: [
      { speaker: 'lisa', text: 'まず「知らない音がある」と知ること。それだけで耳が変わり始める。', mood: 'normal' },
      { speaker: 'takeshi', text: 'sとshが違うのは分かりました。fとhも違うんすね......。', mood: 'thinking' },
      { speaker: 'master', text: '音を区別できるようになると、急に単語が浮かび上がってくる。明日はもっと厄介なやつをやるぞ。', mood: 'normal' },
      { speaker: 'takeshi', text: '厄介って......何すか。', mood: 'frustrated' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 3: LとRの壁
  // ─────────────────────────────────────────────────────────
  3: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'kenji', 'master'],
    opening: [
      { speaker: 'narration', text: '日曜の夕方。ケンジが珍しく早い時間にのれんにいる。' },
      { speaker: 'lisa', text: 'じゃあ今日のお題。「rice」と「lice」。', mood: 'normal' },
      { speaker: 'takeshi', text: 'ライス......と、ライス?', mood: 'thinking' },
      { speaker: 'kenji', text: '両方ライスに聞こえるぞ。', mood: 'frustrated' },
      { speaker: 'lisa', text: 'riceはお米。liceはシラミ。レストランで間違えたら大変なことになるよ。', mood: 'normal' },
      { speaker: 'master', text: 'LとRは日本人の永遠の壁だ。だが、壁は壊すためにある。', mood: 'normal', action: '(グラスを置く)' },
    ],
    closing: [
      { speaker: 'lisa', text: 'Lは舌先が上の歯の裏にくっつく。Rは舌がどこにも触れない。この違いだけ。', mood: 'normal' },
      { speaker: 'takeshi', text: 'light......right......。あ、舌の位置が違う......!', mood: 'surprised' },
      { speaker: 'kenji', text: '......俺も今の聞き分けられたぞ。', mood: 'excited' },
      { speaker: 'master', text: '耳は筋肉と同じだ。使えば使うほど鋭くなる。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 4: THは舌を噛め
  // ─────────────────────────────────────────────────────────
  4: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'lisa', 'mina'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。ミナがイヤホンを外して席に着いた。' },
      { speaker: 'mina', text: 'タケシさん、「think」の最初の音、聞こえますか?', mood: 'normal' },
      { speaker: 'takeshi', text: 'シンク......。thinkって「シンク」じゃないんすか。', mood: 'thinking' },
      { speaker: 'lisa', text: '全然違うよ。舌を歯の間に挟んで息を出す。日本語にない音。', mood: 'normal', action: '(口元を見せる)' },
      { speaker: 'takeshi', text: '......ス、スィンク? いや、なんか気持ち悪い音になった。', mood: 'embarrassed' },
      { speaker: 'mina', text: '最初はみんなそうです。私も半年かかりました。でも聞き分けるだけなら、もっと早いですよ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'lisa', text: 'think、this、that、the......。THは英語で一番よく出てくる音の1つ。', mood: 'normal' },
      { speaker: 'takeshi', text: 'theが「ザ」じゃないのは衝撃っす。ずっと「ザ」だと思ってた。', mood: 'surprised' },
      { speaker: 'mina', text: '聞こえ方が変わると、「the」だけで文の流れが追えるようになります。', mood: 'normal' },
      { speaker: 'takeshi', text: '明日からtheが聞こえるようになったら、それだけで英語っぽくなりそうっすね。', mood: 'thinking' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 5: カタカナの罠
  // ─────────────────────────────────────────────────────────
  5: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'master', 'yuki', 'kenji'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。タケシが会社の資料を広げている。' },
      { speaker: 'takeshi', text: '会議でネイティブが「マネジメント」って言ってたんすけど、全然聞き取れなかった。', mood: 'frustrated' },
      { speaker: 'yuki', text: 'managementは「マネジメント」じゃなくて、「マニジメント」に近いよ。', mood: 'normal' },
      { speaker: 'kenji', text: 'マニジメント? カタカナと全然違うじゃねえか。', mood: 'surprised' },
      { speaker: 'master', text: 'カタカナは英語の発音を日本語に無理やり押し込んだものだ。元の音とは別物だと思え。', mood: 'normal' },
      { speaker: 'takeshi', text: 'vitamin(ヴァイタミン)、privacy(プライヴァシー)......全部カタカナと違う......。', mood: 'frustrated' },
    ],
    closing: [
      { speaker: 'master', text: 'カタカナ英語を知っていることは武器にもなる。「この単語知ってるけど音が違う」と気づけるからだ。', mood: 'normal' },
      { speaker: 'yuki', text: '知ってる単語の「本当の音」を覚え直すだけ。ゼロからじゃない。', mood: 'normal' },
      { speaker: 'takeshi', text: 'そう考えると......カタカナ知ってるのはアドバンテージっすね。', mood: 'thinking' },
      { speaker: 'kenji', text: '......アドバンテージも本当はアドヴァンティジだろ。', mood: 'thinking' },
      { speaker: 'master', text: 'その気づきが全てだ。', mood: 'normal', action: '(にやりと笑う)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 6: アクセント1つで意味が変わる
  // ─────────────────────────────────────────────────────────
  6: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'lisa', 'mina'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。リサがホワイトボードを持ち出してきた。' },
      { speaker: 'lisa', text: '「record」。これ、名詞と動詞でアクセントが違うの知ってる?', mood: 'normal', action: '(ホワイトボードに書く)' },
      { speaker: 'takeshi', text: 'REcordとreCORD......。マジすか。', mood: 'surprised' },
      { speaker: 'mina', text: 'presentもそうです。PREsentはプレゼント、preSENTは発表する。', mood: 'normal' },
      { speaker: 'takeshi', text: 'ちょっと待って。シンガポールで「プレゼンテーション」って言ったら、もしかしてアクセント違うと通じない?', mood: 'frustrated' },
      { speaker: 'lisa', text: 'リスニングの話に戻ると、アクセントの位置が分かるだけで、名詞か動詞か瞬時に判断できるようになる。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'mina', text: '英語は強く読むところに意味が集中してます。弱いところは飾り。', mood: 'normal' },
      { speaker: 'takeshi', text: '強いところだけ拾えばいい......。全部聞こうとしてたから疲れてたのか。', mood: 'thinking' },
      { speaker: 'lisa', text: 'そう。英語のリスニングは「全部聞く」じゃなくて「強い音を拾う」。', mood: 'normal' },
      { speaker: 'takeshi', text: '......それ、もっと早く教えてほしかったっす。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 7: 弱い音こそ英語の正体
  // ─────────────────────────────────────────────────────────
  7: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'master', 'mina'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。マスターがカウンターにスマホを置いて英語の音声を流し始めた。' },
      { speaker: 'master', text: 'タケシ。この文、何て言ってる?', mood: 'normal', action: '(音声を再生する)' },
      { speaker: 'takeshi', text: '......can......something......わかんないっす。canとあと何か。', mood: 'frustrated' },
      { speaker: 'mina', text: '「I can help you with that.」......聞こえなかった部分、全部「弱い音」です。', mood: 'normal' },
      { speaker: 'takeshi', text: 'I、you、with、that......。全部消えてた。', mood: 'surprised' },
      { speaker: 'master', text: '英語は大事な単語を強く、それ以外を極端に弱く発音する。弱い音は「聞こえない」んじゃなくて「元から小さい」んだ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'mina', text: '機能語......a、the、is、are、of、to。こういう単語はネイティブでもほぼ聞こえないくらい弱く言います。', mood: 'normal' },
      { speaker: 'takeshi', text: '聞こえなくて当たり前だったんすか......。ずっと自分の耳のせいだと思ってた。', mood: 'surprised' },
      { speaker: 'master', text: '耳のせいじゃない。英語の仕組みを知らなかっただけだ。', mood: 'normal' },
      { speaker: 'takeshi', text: '......なんか、ちょっと希望が見えてきたっす。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 8: 音がくっつく!? リンキング
  // ─────────────────────────────────────────────────────────
  8: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'lisa', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。1週間が経った。タケシの顔つきが少し変わってきた。' },
      { speaker: 'lisa', text: 'pick up、聞き取れる?', mood: 'normal' },
      { speaker: 'takeshi', text: 'ピックアップ......ですよね?', mood: 'thinking' },
      { speaker: 'lisa', text: 'ネイティブは「ピカップ」って言うの。pickのkとupのuがくっつく。', mood: 'normal' },
      { speaker: 'yuki', text: 'リンキングだね。単語の終わりの子音と次の単語の母音がつながる。', mood: 'normal' },
      { speaker: 'takeshi', text: 'not at all......ノッタトール!? 3語が1語みたいになってる!', mood: 'surprised' },
      { speaker: 'master', text: 'だから聞こえなかったんだ。3語だと思って探すから見つからない。1つの塊で来ると知っていれば聞こえる。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'lisa', text: 'check it out = チェキラウト。an apple = アナポー。全部つながる。', mood: 'normal' },
      { speaker: 'takeshi', text: '......もしかして、リスニングって「単語を聞く」んじゃなくて「音の塊を聞く」ってことすか?', mood: 'thinking' },
      { speaker: 'master', text: 'そういうことだ。やっと英語の正体が見えてきたな。', mood: 'normal' },
      { speaker: 'yuki', text: '1週間前のタケシくんとは別人だね。', mood: 'excited' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 9: 音が消える!? 省略の世界
  // ─────────────────────────────────────────────────────────
  9: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'mina', 'master', 'kenji'],
    opening: [
      { speaker: 'narration', text: '土曜の昼。ケンジが珍しくのれんの昼営業に来ている。' },
      { speaker: 'mina', text: '今日は「消える音」です。「last time」、聞こえますか?', mood: 'normal', action: '(音声を再生する)' },
      { speaker: 'takeshi', text: 'ラスタイム......? lastのtが消えてる!', mood: 'surprised' },
      { speaker: 'kenji', text: '消えていいのか? 音が消えたら意味が変わるだろ。', mood: 'frustrated' },
      { speaker: 'master', text: '英語では同じ子音が連続すると、前の子音が消える。省エネだ。', mood: 'normal' },
      { speaker: 'mina', text: 'next day = ネクスデイ。good day = グッデイ。tやdがよく消えます。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'takeshi', text: 'リンキングで音がくっついて、省略で音が消えて......。英語って原型なくなるじゃないすか。', mood: 'thinking' },
      { speaker: 'master', text: 'だから日本人は聞き取れない。教科書の発音と実際の発音が違いすぎるんだ。', mood: 'normal' },
      { speaker: 'kenji', text: '......教科書は嘘つきだったのか。', mood: 'surprised' },
      { speaker: 'mina', text: '嘘じゃないです。ゆっくり読めばあの通り。でも実際の会話はもっと速くて、音が変わるんです。', mood: 'normal' },
      { speaker: 'takeshi', text: '実際の音を知る。それが第一歩ってことっすね。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 10: 音が変わる!? 同化の法則
  // ─────────────────────────────────────────────────────────
  10: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['takeshi', 'master', 'lisa', 'yuki', 'mina', 'kenji'],
    opening: [
      { speaker: 'narration', text: '日曜の夜。10日目。全員がのれんに集まっている。マスターがホワイトボードを出した。' },
      { speaker: 'master', text: '最後の音変化。「would you」、これ何て聞こえる?', mood: 'normal', action: '(音声を再生する)' },
      { speaker: 'takeshi', text: '......ウッジュー?', mood: 'thinking' },
      { speaker: 'lisa', text: '正解。dとyがくっついてジュになる。これが同化。', mood: 'normal' },
      { speaker: 'takeshi', text: 'did you = ディジュー、got you = ガッチュー......。dやtがyと合体するんすね。', mood: 'excited' },
      { speaker: 'kenji', text: '10日でこんなに変わるもんか。タケシ、お前すげえな。', mood: 'surprised' },
    ],
    closing: [
      { speaker: 'master', text: '10日前、タケシは「全部同じ音に聞こえる」と言っていた。今はどうだ?', mood: 'normal' },
      { speaker: 'takeshi', text: '......まだ全部は聞き取れないっす。でも、「なぜ聞こえないか」は分かるようになった。', mood: 'thinking' },
      { speaker: 'mina', text: '音の仕組みを知ったタケシさんは、もう前と同じ耳じゃないです。', mood: 'normal' },
      { speaker: 'yuki', text: '明日からPhase 2。文を聞くフェーズだね。音から文へ。', mood: 'normal' },
      { speaker: 'master', text: '音が聞こえるようになった。次は意味を掴む番だ。', mood: 'determined' },
      { speaker: 'takeshi', text: 'まだ20日ある。......いける気がしてきた。', mood: 'determined' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 2: 文を聞く (Days 11-20)
  // 音が分かったら、意味を掴む
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────
  // Day 11: 主語を捕まえろ
  // ─────────────────────────────────────────────────────────
  11: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。Phase 2初日。ユキがノートを広げてやってきた。' },
      { speaker: 'yuki', text: 'タケシくん、英語を聞くとき、最初に何を捕まえればいいと思う?', mood: 'normal' },
      { speaker: 'takeshi', text: '......動詞?', mood: 'thinking' },
      { speaker: 'yuki', text: '惜しい。主語。「誰が」が最初に来る。主語を逃したら、文全体を見失う。', mood: 'normal' },
      { speaker: 'master', text: '日本語は主語を省略する。英語は省略しない。だから英語は最初の1~2語が命だ。', mood: 'normal' },
      { speaker: 'takeshi', text: '最初の1~2語......。そこに集中すればいいんすね。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'yuki', text: 'I、You、He、She、We、They、It。主語は7パターンしかない。', mood: 'normal' },
      { speaker: 'takeshi', text: '7パターン......。思ったより少ない。', mood: 'surprised' },
      { speaker: 'master', text: '会議の英語も同じだ。「誰が言ってるか」を最初に掴めば、後は推測が効く。', mood: 'normal' },
      { speaker: 'takeshi', text: 'シンガポールの会議でも、まず「誰が」を聞く。了解っす。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 12: 動詞で意味の8割が決まる
  // ─────────────────────────────────────────────────────────
  12: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'master', 'lisa'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。マスターが英語の音声を流している。' },
      { speaker: 'master', text: '主語の次。動詞だ。「誰が + どうした」。この2つで文の8割は決まる。', mood: 'normal' },
      { speaker: 'takeshi', text: 'We need......「我々は必要としている」。確かにneedだけで緊急感が分かる。', mood: 'thinking' },
      { speaker: 'lisa', text: '英語の動詞は主語の直後に来る。日本語みたいに最後まで待たなくていい。', mood: 'normal' },
      { speaker: 'takeshi', text: '日本語だと「私たちは来月のプレゼンの準備のための資料を......必要としている」。最後まで聞かないと分からない。', mood: 'thinking' },
      { speaker: 'master', text: '英語は最初の3語で核心が分かる。これがリスニングの最大の武器だ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'lisa', text: 'have、need、want、make、get、take。この6つの動詞だけで日常会話の半分はカバーできる。', mood: 'normal' },
      { speaker: 'takeshi', text: '主語+動詞。この2語に全集中......。', mood: 'determined' },
      { speaker: 'master', text: '残りは後から補えばいい。まず骨格を掴め。', mood: 'normal' },
      { speaker: 'takeshi', text: '骨格......。建築と同じっすね。骨組みが分かれば全体が見える。', mood: 'thinking' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 13: 否定を聞き逃すな
  // ─────────────────────────────────────────────────────────
  13: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'yuki', 'lisa'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。タケシが会社であった出来事を話し始めた。' },
      { speaker: 'takeshi', text: '今日、海外のクライアントとのWeb会議で「We can\'t accept that.」って言われたんすけど、canとcan\'tが聞き分けられなくて。', mood: 'frustrated' },
      { speaker: 'yuki', text: 'あるある。canとcan\'tは本当に聞き分けにくい。', mood: 'normal' },
      { speaker: 'lisa', text: 'コツがあるの。canは弱く短い「クン」。can\'tは強くて「キャーント」。tが聞こえるかどうかじゃなくて、強さで判断する。', mood: 'normal' },
      { speaker: 'takeshi', text: '強さ......! 音じゃなくて強弱で聞くんすか。', mood: 'surprised' },
      { speaker: 'lisa', text: '否定は強調されるの。だから「強く聞こえたら否定」。これだけで判別できる。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'yuki', text: 'don\'t、won\'t、isn\'t......。否定語は全部強く発音される。弱い音の中で目立つようにできてるんだよ。', mood: 'normal' },
      { speaker: 'takeshi', text: '言われてみれば、neverとかnotとか、確かにはっきり聞こえる。', mood: 'thinking' },
      { speaker: 'lisa', text: 'ビジネスで否定を聞き逃すのは致命的。「できます」と「できません」は真逆だから。', mood: 'normal' },
      { speaker: 'takeshi', text: 'シンガポールでcan\'t聞き逃したら......ゾッとするっす。', mood: 'frustrated' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 14: 数字は聞き取りの鬼門
  // ─────────────────────────────────────────────────────────
  14: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'kenji', 'master'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。ケンジが見積書を持ってきた。' },
      { speaker: 'kenji', text: 'タケシ、聞いてくれ。fifteenとfiftyを聞き間違えて、見積もり1桁ずれたことがある。', mood: 'frustrated' },
      { speaker: 'takeshi', text: 'フィフティーンとフィフティ......。似すぎじゃないすか。', mood: 'surprised' },
      { speaker: 'master', text: 'thirteenとthirty、fourteenとforty。全部同じ罠だ。', mood: 'normal' },
      { speaker: 'kenji', text: '数字は金が絡む。聞き間違いが一番怖い。', mood: 'frustrated' },
      { speaker: 'master', text: '-teenは後ろにアクセント。-tyは前にアクセント。アクセントの位置で判断しろ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'takeshi', text: 'fifTEEN、FIFty......。確かにアクセントの位置が違う!', mood: 'excited' },
      { speaker: 'kenji', text: '聞き分けられるようになったら教えてくれ。俺も知りたい。', mood: 'determined' },
      { speaker: 'master', text: '数字は確認を恐れるな。ビジネスで「Could you repeat the number?」と聞くのは恥ずかしいことじゃない。', mood: 'normal' },
      { speaker: 'takeshi', text: '聞き返す勇気......。それも含めてリスニング力っすね。', mood: 'thinking' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 15: 場所と方向を聞き取る
  // ─────────────────────────────────────────────────────────
  15: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'lisa', 'mina', 'master'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。折り返し地点。タケシの表情に余裕が出てきた。' },
      { speaker: 'lisa', text: 'シンガポールでタクシーに乗ったら「Go straight, turn left at the second light.」とか言われるよ。', mood: 'normal' },
      { speaker: 'takeshi', text: 'straight、left、second......。あ、これ聞き取れる。', mood: 'excited' },
      { speaker: 'mina', text: 'タケシさん、2週間前とは全然違いますよ。今のは完璧でした。', mood: 'excited' },
      { speaker: 'takeshi', text: '......マジすか。', mood: 'surprised' },
      { speaker: 'master', text: '前置詞が鍵だ。in、on、at、to、from。場所と方向はこの5つで決まる。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'lisa', text: 'タケシくん、この2週間で本当に耳が変わったね。', mood: 'normal' },
      { speaker: 'takeshi', text: '自分では分かんないすけど......。でも、聞こえなかった音が聞こえるようになったのは確かっす。', mood: 'thinking' },
      { speaker: 'mina', text: '折り返しですね。あと15日。', mood: 'normal' },
      { speaker: 'master', text: '前半で耳を作った。後半で実戦に持っていく。ここからが本番だぞ。', mood: 'determined' },
      { speaker: 'takeshi', text: '......受けて立ちます。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 16: 感情はイントネーションに出る
  // ─────────────────────────────────────────────────────────
  16: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'master'],
    opening: [
      { speaker: 'narration', text: '土曜の夜。リサが芝居がかったポーズでカウンターに立った。' },
      { speaker: 'lisa', text: 'That\'s great.', mood: 'normal', action: '(平坦な声で)' },
      { speaker: 'lisa', text: 'That\'s GREAT!', mood: 'excited', action: '(上昇するイントネーションで)' },
      { speaker: 'takeshi', text: '......同じ言葉なのに、全然印象が違う。', mood: 'surprised' },
      { speaker: 'lisa', text: '英語は言葉よりイントネーションで感情が伝わる。平坦だと皮肉に聞こえることもある。', mood: 'normal' },
      { speaker: 'master', text: '会議で相手が本当に賛成してるか、社交辞令かは、イントネーションで分かる。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'takeshi', text: '上がると質問か興奮。下がると確信か終了。平坦だと無関心か皮肉。', mood: 'thinking' },
      { speaker: 'lisa', text: '完璧。イントネーションが読めると、「言葉の裏」まで聞こえるようになる。', mood: 'normal' },
      { speaker: 'master', text: 'シンガポールの会議でも、相手の声のトーンに注意しろ。言葉以上の情報がある。', mood: 'normal' },
      { speaker: 'takeshi', text: '音だけじゃなくて、感情も聞く......。リスニングって深いっすね。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 17: 疑問文を瞬時に判別する
  // ─────────────────────────────────────────────────────────
  17: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'yuki', 'mina'],
    opening: [
      { speaker: 'narration', text: '日曜の夕方。ユキとミナが先に来て練習していた。' },
      { speaker: 'yuki', text: '会議で一番怖いのは、質問されてることに気づかないこと。', mood: 'normal' },
      { speaker: 'takeshi', text: 'あ、それ先週やりました。質問されてたのに黙ってて、気まずかった......。', mood: 'embarrassed' },
      { speaker: 'mina', text: '疑問文の判別は最初の1語で決まります。Do、Does、Did、Is、Are、Can、Will......。', mood: 'normal' },
      { speaker: 'yuki', text: 'あと、WH疑問詞。What、When、Where、Who、Why、How。これが聞こえたら100%質問。', mood: 'normal' },
      { speaker: 'takeshi', text: '最初の1語に集中......。質問かどうかは最初で分かるんすね。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'mina', text: 'もう1つ。語尾が上がったら質問の可能性が高いです。昨日のイントネーションの応用ですね。', mood: 'normal' },
      { speaker: 'takeshi', text: '最初の1語+語尾の上がり。この2つで質問を見逃さない。', mood: 'determined' },
      { speaker: 'yuki', text: 'シンガポールの会議で質問に即反応できたら、印象がすごくよくなるよ。', mood: 'normal' },
      { speaker: 'takeshi', text: '質問に気づける。それだけで会議に参加してる感が出る......。', mood: 'thinking' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 18: 指示と依頼を正確に聞く
  // ─────────────────────────────────────────────────────────
  18: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'master', 'kenji'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。タケシが会社で受けた英語の指示メモを見せている。' },
      { speaker: 'takeshi', text: 'Could you send me the report by Friday. これ、命令すか? お願いすか?', mood: 'thinking' },
      { speaker: 'lisa', text: 'Could youは丁寧な依頼。命令じゃないけど、やらないとマズい類のやつね。', mood: 'normal' },
      { speaker: 'kenji', text: '現場でいうと「できればお願いしたいんだけど」って言いながら目が本気のやつか。', mood: 'thinking' },
      { speaker: 'master', text: 'Please、Could you、Would you mind......。丁寧さの段階がある。But全部「やれ」という意味だ。', mood: 'normal' },
      { speaker: 'takeshi', text: '丁寧に言われても命令......。日本語の敬語と同じ構造っすね。', mood: 'surprised' },
    ],
    closing: [
      { speaker: 'lisa', text: 'Make sure to、Don\'t forget to......。これは強い指示。聞き逃したら約束を破ることになる。', mood: 'normal' },
      { speaker: 'takeshi', text: 'by Friday、before noon、as soon as possible......。期限と合わせて聞く。', mood: 'determined' },
      { speaker: 'master', text: '仕事ができる人間は「いつまでに何をするか」を正確に聞き取る。言語が何であってもだ。', mood: 'normal' },
      { speaker: 'kenji', text: '......俺も勉強になるな。', mood: 'thinking' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 19: 接続詞で文をつなげて聞く
  // ─────────────────────────────────────────────────────────
  19: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。Phase 2も残り2日。' },
      { speaker: 'yuki', text: '長い文が聞き取れないのは、文のつなぎ目が分からないから。接続詞がその目印。', mood: 'normal' },
      { speaker: 'takeshi', text: 'and、but、so、because......。これが聞こえたら「ここで文が変わる」ってことすね。', mood: 'thinking' },
      { speaker: 'master', text: 'butが来たら反対のことが来る。becauseが来たら理由が来る。接続詞は道路標識だ。', mood: 'normal' },
      { speaker: 'yuki', text: 'however、although、therefore......。ビジネスではこっちが多いよ。', mood: 'normal' },
      { speaker: 'takeshi', text: 'however = but、therefore = so。同じ意味の上位版か。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'master', text: '接続詞を聞けば、話の展開が予測できる。予測できれば、聞き取りの精度が上がる。', mood: 'normal' },
      { speaker: 'takeshi', text: '予測......。次に何が来るか分かってると、余裕を持って聞ける。', mood: 'excited' },
      { speaker: 'yuki', text: '会議で「However」が聞こえたら、「あ、反論が来る」と構えられるよね。', mood: 'normal' },
      { speaker: 'takeshi', text: '明日でPhase 2終わり。......いけるかもしれない。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 20: Phase 2総復習 -- 文の構造を聞く
  // ─────────────────────────────────────────────────────────
  20: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['takeshi', 'master', 'yuki', 'mina', 'lisa', 'kenji'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。20日目。全員がのれんに集まった。マスターがテストを用意している。' },
      { speaker: 'master', text: 'Phase 2最終日だ。実際のビジネス英語の音声を聞いてもらう。', mood: 'normal', action: '(スピーカーをセットする)' },
      { speaker: 'takeshi', text: '......来たっすね。', mood: 'determined' },
      { speaker: 'lisa', text: 'プレゼンの一部を録音してきたの。本番に近い速度で流すよ。', mood: 'normal' },
      { speaker: 'kenji', text: '俺も聞いていいか? 自分がどれくらい分かるか知りたい。', mood: 'thinking' },
      { speaker: 'mina', text: '皆で一緒に聞きましょう。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'takeshi', text: '主語......We。動詞......need to finalize。否定なし。期限......by next Monday。接続詞......However、after that......。', mood: 'thinking' },
      { speaker: 'takeshi', text: '「来週月曜までにファイナライズが必要。ただし、その後追加の修正がある」......合ってますか?', mood: 'thinking' },
      { speaker: 'lisa', text: '......ほぼ完璧。', mood: 'surprised' },
      { speaker: 'yuki', text: 'タケシくん......すごい。', mood: 'excited' },
      { speaker: 'master', text: '20日前は「宇宙語」だと言っていた男が、ビジネス英語を聞き取った。', mood: 'normal' },
      { speaker: 'takeshi', text: '......あと10日。シンガポール、行きます。', mood: 'determined' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 3: 会話を聞く (Days 21-30)
  // 実際の場面で英語を聞く
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────
  // Day 21: カフェで注文を聞き取る
  // ─────────────────────────────────────────────────────────
  21: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'master'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。Phase 3、実戦フェーズ開始。リサがエプロンを着けている。' },
      { speaker: 'lisa', text: '今日からロールプレイ。まずはカフェ。シンガポールに着いたら最初にやることは?', mood: 'normal', action: '(カウンターの向こうに立つ)' },
      { speaker: 'takeshi', text: '......コーヒー買う。', mood: 'thinking' },
      { speaker: 'lisa', text: 'Hi! What can I get for you today?', mood: 'normal' },
      { speaker: 'takeshi', text: '......What can I get......。「何にしますか」ですよね。聞こえた!', mood: 'excited' },
      { speaker: 'master', text: '定番フレーズは聞く回数が多いから覚えやすい。場面ごとの「お決まり」を知っておけ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'lisa', text: 'For here or to go? Would you like room for cream?', mood: 'normal' },
      { speaker: 'takeshi', text: '店内かテイクアウトか、クリームのスペース空けるか......。全部聞き取れた!', mood: 'excited' },
      { speaker: 'master', text: 'カフェの会話はパターンが決まっている。パターンを知っていれば、聞き取りは格段に楽になる。', mood: 'normal' },
      { speaker: 'takeshi', text: 'シンガポール着いたら、まずスタバ行きます。実戦練習。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 22: 道案内を聞く
  // ─────────────────────────────────────────────────────────
  22: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'yuki', 'lisa'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。ユキがシンガポールの地図をテーブルに広げた。' },
      { speaker: 'yuki', text: '会場までの道を人に聞くシミュレーションしよう。', mood: 'normal', action: '(地図を指さす)' },
      { speaker: 'lisa', text: 'Go straight for two blocks, then turn right at the intersection. It\'s on your left.', mood: 'normal' },
      { speaker: 'takeshi', text: '2ブロック直進、交差点で右折、左手にある。......聞こえた。', mood: 'thinking' },
      { speaker: 'yuki', text: '方向の単語はDay 15でやったよね。straight、left、right、block。', mood: 'normal' },
      { speaker: 'takeshi', text: '積み上がってきてる感じがする。前にやったことが今日につながるっていうか。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'lisa', text: 'You can\'t miss it. It\'s right next to the MRT station.', mood: 'normal' },
      { speaker: 'takeshi', text: '見落とすはずがない、MRTの駅のすぐ隣......。You can\'t miss itは便利な表現っすね。', mood: 'excited' },
      { speaker: 'yuki', text: '道案内は動詞+方向が基本。go straight、turn left、walk past。このパターンさえ押さえれば大丈夫。', mood: 'normal' },
      { speaker: 'takeshi', text: 'シンガポールで迷子にならない自信、ちょっとついてきたっす。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 23: ホテルでチェックイン
  // ─────────────────────────────────────────────────────────
  23: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'mina'],
    opening: [
      { speaker: 'narration', text: '土曜の午後。リサがまたカウンターの向こうに立った。今日はホテルのフロント役。' },
      { speaker: 'lisa', text: 'Good evening, sir. Do you have a reservation?', mood: 'normal', action: '(ホテルマンの笑顔で)' },
      { speaker: 'takeshi', text: '予約ありますか......。Yes, under Takeshi Yamamoto.', mood: 'normal' },
      { speaker: 'mina', text: 'タケシさん、答えまで返してる! 聞くだけじゃなくて反応できてます!', mood: 'excited' },
      { speaker: 'lisa', text: 'Your room is on the 12th floor. Here\'s your key card. Breakfast is served from 6:30 to 10:00 in the restaurant on the second floor.', mood: 'normal' },
      { speaker: 'takeshi', text: '12階、キーカード、朝食は6:30から10:00で2階のレストラン。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'lisa', text: '完璧。数字も場所も時間も全部拾えてる。', mood: 'normal' },
      { speaker: 'mina', text: 'Day 14の数字、Day 15の場所、全部つながりましたね。', mood: 'normal' },
      { speaker: 'takeshi', text: '1つ1つバラバラだったピースが、実際の場面でつながる感覚......。これかぁ。', mood: 'excited' },
      { speaker: 'lisa', text: 'そう。これが「聞ける」ということ。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 24: 空港のアナウンス
  // ─────────────────────────────────────────────────────────
  24: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'master', 'yuki'],
    opening: [
      { speaker: 'narration', text: '日曜の夜。マスターが空港のアナウンス音声をスピーカーで流し始めた。' },
      { speaker: 'master', text: '空港のアナウンスは聞き取りの難関だ。雑音、エコー、速い。', mood: 'normal', action: '(スピーカーの音量を上げる)' },
      { speaker: 'narration', text: '「Attention please. Flight SQ305 to Singapore has been delayed. The new departure time is 14:30.」' },
      { speaker: 'takeshi', text: 'SQ305、シンガポール行き、遅延、新しい出発時間14:30......!', mood: 'excited' },
      { speaker: 'yuki', text: '全部拾えてる。すごい。', mood: 'surprised' },
      { speaker: 'master', text: '空港アナウンスで大事なのは3つ。便名、行き先、時間。この3つだけに集中しろ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'yuki', text: '「Gate change」「boarding now」「final call」。この3つは空港で命綱だよ。', mood: 'normal' },
      { speaker: 'takeshi', text: 'final callを聞き逃したら飛行機に乗れない......。', mood: 'frustrated' },
      { speaker: 'master', text: '全部聞く必要はない。自分に関係ある情報だけを狙い撃ちしろ。それがリスニングの極意だ。', mood: 'normal' },
      { speaker: 'takeshi', text: '来週、本当にこのアナウンスを聞くことになる......。リアルに聞こえてきたっす。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 25: 友人との雑談
  // ─────────────────────────────────────────────────────────
  25: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'mina', 'master'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。あと5日。タケシの目に緊張と覚悟が混在している。' },
      { speaker: 'lisa', text: '今日は雑談。カンファレンスのパーティーで絶対あるやつ。', mood: 'normal' },
      { speaker: 'takeshi', text: '雑談......。一番苦手なやつっす。台本がない。', mood: 'frustrated' },
      { speaker: 'mina', text: '雑談はパターンがあります。天気、仕事、出身、食べ物。この4つで回る。', mood: 'normal' },
      { speaker: 'lisa', text: 'So, where are you from? What do you do? How do you like Singapore so far?', mood: 'normal' },
      { speaker: 'takeshi', text: '出身、仕事、シンガポールの感想......。確かに全部聞き取れる。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'lisa', text: '雑談のコツは「100%聞き取ろうとしない」こと。キーワードを拾って反応するだけでいい。', mood: 'normal' },
      { speaker: 'mina', text: '「Really?」「That\'s interesting.」「Me too.」......。相づちだけで会話は続きます。', mood: 'normal' },
      { speaker: 'master', text: '聞き取れなかったら聞き返せ。「Sorry, what was that?」。それも立派な会話力だ。', mood: 'normal' },
      { speaker: 'takeshi', text: '完璧に聞き取れなくてもいい。反応できればいい。......楽になったっす。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 26: 電話対応
  // ─────────────────────────────────────────────────────────
  26: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。ユキがスマホを2台用意してきた。' },
      { speaker: 'yuki', text: '電話は表情が見えないから、リスニングの最難関。', mood: 'normal', action: '(スマホを1台タケシに渡す)' },
      { speaker: 'takeshi', text: '電話......。相手の口元も見えないし、ジェスチャーも使えない。', mood: 'frustrated' },
      { speaker: 'master', text: 'だからこそ耳だけが頼りになる。今まで鍛えてきた耳の真価が問われるぞ。', mood: 'normal' },
      { speaker: 'yuki', text: '電話にもパターンがあるよ。「This is ○○ from △△.」で始まって、「Could I speak to ○○?」で用件に入る。', mood: 'normal' },
      { speaker: 'takeshi', text: '名前と会社名が最初に来る......。主語を捕まえるのと同じ感覚っすね。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'yuki', text: '聞き取れなかったら「Could you say that again, please?」。電話では普通のこと。', mood: 'normal' },
      { speaker: 'master', text: 'ネイティブ同士でも電話で聞き返すことはある。恥ずかしがるな。', mood: 'normal' },
      { speaker: 'takeshi', text: 'パターンを知る。聞き返す。この2つでいける......気がしてきた。', mood: 'determined' },
      { speaker: 'yuki', text: 'あと4日。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 27: ショッピング
  // ─────────────────────────────────────────────────────────
  27: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['takeshi', 'lisa', 'kenji'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。ケンジがお土産リストを持ってきた。' },
      { speaker: 'kenji', text: 'タケシ、シンガポール行くなら俺の分も買ってきてくれ。', mood: 'normal', action: '(リストを渡す)' },
      { speaker: 'takeshi', text: '......ケンジさん、これ英語の買い物の練習させたいだけでしょ。', mood: 'thinking' },
      { speaker: 'kenji', text: 'バレたか。', mood: 'embarrassed' },
      { speaker: 'lisa', text: 'ショッピングは数字と値段の実戦。「That\'ll be thirty-two fifty.」......いくら?', mood: 'normal' },
      { speaker: 'takeshi', text: '32ドル50セント。Day 14でやった数字っすね。', mood: 'excited' },
    ],
    closing: [
      { speaker: 'lisa', text: '「Do you have this in a different size?」「Can I try this on?」......。ショッピング英語は使う場面が多い。', mood: 'normal' },
      { speaker: 'takeshi', text: '聞くだけじゃなくて、聞いて動く。買い物って最高の実戦練習っすね。', mood: 'determined' },
      { speaker: 'kenji', text: '......マジで土産頼むぞ。チリクラブのソース。', mood: 'normal' },
      { speaker: 'takeshi', text: '了解っす。英語で買ってきます。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 28: 天気予報
  // ─────────────────────────────────────────────────────────
  28: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['takeshi', 'mina', 'master'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。あと2日。マスターがテレビでCNNの天気予報を流した。' },
      { speaker: 'master', text: '天気予報は数字、場所、専門用語が高速で来る。総合力のテストだ。', mood: 'normal', action: '(テレビを指さす)' },
      { speaker: 'narration', text: '「Expect scattered showers across Southeast Asia with temperatures reaching 33 degrees Celsius.」' },
      { speaker: 'takeshi', text: '東南アジアでにわか雨、気温33度......。', mood: 'thinking' },
      { speaker: 'mina', text: 'すごい! scattered showersまで聞き取れてる!', mood: 'excited' },
      { speaker: 'takeshi', text: '......あれ、俺今ニュース英語聞き取れてる?', mood: 'surprised' },
    ],
    closing: [
      { speaker: 'master', text: '1ヶ月前のお前なら「宇宙語」と言っていた。', mood: 'normal' },
      { speaker: 'takeshi', text: '......ほんとっすね。同じ英語なのに、全然違って聞こえる。', mood: 'thinking' },
      { speaker: 'mina', text: '耳が変わったんです。脳の中に「英語を処理する回路」ができたんだと思います。', mood: 'normal' },
      { speaker: 'master', text: '明日は最後の仕上げだ。来い。', mood: 'determined' },
      { speaker: 'takeshi', text: '......はい。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 29: ビジネスミーティング
  // ─────────────────────────────────────────────────────────
  29: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['takeshi', 'master', 'lisa', 'yuki', 'mina', 'kenji'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。出発前夜。全員がのれんに集まった。テーブルには英語の資料が広げられている。' },
      { speaker: 'master', text: '最後の夜だ。本番を想定した模擬ミーティングをやる。', mood: 'determined', action: '(テーブルの上座に座る)' },
      { speaker: 'lisa', text: '私がネイティブスピーカー役。本番と同じ速度で話す。手加減なし。', mood: 'normal' },
      { speaker: 'takeshi', text: '......望むところっす。', mood: 'determined' },
      { speaker: 'lisa', text: 'Let\'s start with the quarterly results. Revenue increased by 15%, however, operational costs also rose significantly. We need to discuss cost reduction strategies before the next fiscal year.', mood: 'normal' },
      { speaker: 'narration', text: 'タケシが目を閉じて聞いている。全員が息を止めた。' },
    ],
    closing: [
      { speaker: 'takeshi', text: '四半期の結果。売上15%増。でも運営コストも大きく上昇。来年度までにコスト削減の戦略を議論する必要がある。', mood: 'normal' },
      { speaker: 'narration', text: '一瞬の沈黙。そして。' },
      { speaker: 'kenji', text: '......全部聞き取りやがった。', mood: 'surprised' },
      { speaker: 'yuki', text: 'タケシくん......。', mood: 'excited', action: '(拍手する)' },
      { speaker: 'mina', text: '完璧です。完璧。', mood: 'excited' },
      { speaker: 'lisa', text: '30日前、宇宙語だった男が......。', mood: 'surprised' },
      { speaker: 'master', text: 'タケシ。明日、シンガポールに立て。お前の耳はもう大丈夫だ。', mood: 'determined', action: '(ビールをタケシの前に置く)' },
      { speaker: 'takeshi', text: '......ありがとうございます。みんなのおかげっす。', mood: 'determined', action: '(深く頭を下げる)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 30: 最終テスト -- シンガポールに立つ
  // ─────────────────────────────────────────────────────────
  30: {
    scene: 'シンガポール国際テックカンファレンス - メインホール',
    cast: ['takeshi', 'narration'],
    opening: [
      { speaker: 'narration', text: 'シンガポール。マリーナベイサンズの隣にある国際会議場。300人を超える聴衆。壇上にタケシが立っている。' },
      { speaker: 'narration', text: '会場のざわめきが英語で聞こえる。30日前なら宇宙語だった音が、今は意味を持って耳に飛び込んでくる。' },
      { speaker: 'narration', text: '司会者がマイクで呼びかけた。' },
      { speaker: 'narration', text: '「Next up, from Japan, Takeshi Yamamoto. He will present on cross-border project management.」' },
      { speaker: 'narration', text: 'タケシは一語一語、聞き取った。主語。動詞。名前。テーマ。全部聞こえた。' },
      { speaker: 'takeshi', text: '......聞こえる。', mood: 'determined', action: '(マイクを握る)' },
    ],
    closing: [
      { speaker: 'narration', text: 'プレゼンが終わった。質疑応答で3つの質問が飛んできた。全て聞き取れた。全て答えた。完璧ではなかった。でも、通じた。' },
      { speaker: 'narration', text: '壇上から降りると、隣に座っていたシンガポール人のエンジニアが話しかけてきた。' },
      { speaker: 'narration', text: '「That was a great presentation. I really liked your approach to cross-cultural team management.」' },
      { speaker: 'narration', text: 'タケシは聞き取った。全部聞き取った。そして、笑顔で答えた。' },
      { speaker: 'takeshi', text: 'Thank you. It means a lot to me.', mood: 'determined' },
      { speaker: 'narration', text: 'ホテルに戻って、スマホを開いた。のれんのグループLINEに1通だけメッセージを打った。' },
      { speaker: 'takeshi', text: '聞こえました。全部。', mood: 'normal' },
      { speaker: 'narration', text: '3秒後。マスターから返信が来た。' },
      { speaker: 'narration', text: '「知ってた。」' },
      { speaker: 'narration', text: 'その下に、ケンジから。「チリクラブのソース忘れんなよ。」' },
      { speaker: 'narration', text: 'タケシは笑った。そしてスマホを置いて、シンガポールの夜景を眺めた。30日前には聞こえなかった世界が、今、音を持って広がっている。' },
    ],
  },
};
