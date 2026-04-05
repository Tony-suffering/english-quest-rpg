import type { StoryLine } from '@/types/lisque';

// ═══════════════════════════════════════════════════════════
// ヨミクエ (YomiQue) - Kenjiの東南アジア大作戦
// 30日間のストーリーラッパー
//
// 建設会社取締役・ケンジ(45歳/TOEIC 480)。
// 東南アジア企業との大型契約が決まったが、
// 契約書・仕様書・メールが全て英語。
// 30日で読めるようにならないと会社が回らない。
// ═══════════════════════════════════════════════════════════

interface YomiqueDayStory {
  scene: string;
  cast: ('master' | 'yuki' | 'takeshi' | 'lisa' | 'kenji' | 'mina' | 'narration')[];
  opening: StoryLine[];
  closing: StoryLine[];
}

export const YOMIQUE_STORIES: Record<number, YomiqueDayStory> = {

  // ═══════════════════════════════════════════════════════════
  // Phase 1: 読みの基礎 (Days 1-10)
  // まず「読む」とは何かを知る
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────
  // Day 1: 英語の書類が来た
  // ─────────────────────────────────────────────────────────
  1: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['kenji', 'master', 'yuki'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。のれんの引き戸が勢いよく開く。ケンジが分厚い書類の束を抱えて入ってきた。' },
      { speaker: 'kenji', text: 'マスター、ビール。いや、ハイボール。いや......水でいい。', mood: 'frustrated', action: '(カウンターに崩れるように座る)' },
      { speaker: 'master', text: 'どうした。顔色が悪いぞ。', action: '(水を出しながら)' },
      { speaker: 'kenji', text: 'これ。', mood: 'frustrated', action: '(分厚い書類の束をテーブルにドンと置く)' },
      { speaker: 'yuki', text: '......全部英語じゃないですか。', mood: 'surprised', action: '(書類をめくる)' },
      { speaker: 'kenji', text: '東南アジアの会社との契約が決まった。嬉しいよ。嬉しいけどな。', mood: 'frustrated' },
      { speaker: 'kenji', text: '読めん。一文字も読めん。', mood: 'frustrated' },
      { speaker: 'master', text: '......ケンジ。看板の英語、読めるか?', mood: 'normal', action: '(のれんの看板を指す)' },
    ],
    closing: [
      { speaker: 'master', text: '看板が読めたなら、契約書もいつか読める。同じ英語だ。', mood: 'normal' },
      { speaker: 'kenji', text: '......看板と契約書を一緒にすんな。', mood: 'frustrated' },
      { speaker: 'yuki', text: 'でもケンジさん、今日「OPEN」と「CLOSED」読めましたよね。それが最初の一歩です。', mood: 'normal' },
      { speaker: 'kenji', text: '......一歩か。あと何万歩あるんだ。', mood: 'thinking' },
      { speaker: 'master', text: '30歩だ。30日で読めるようにしてやる。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 2: メニューを読む
  // ─────────────────────────────────────────────────────────
  2: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'master', 'lisa', 'mina'],
    opening: [
      { speaker: 'narration', text: '土曜の昼。マスターがのれんの壁に見慣れない紙を貼り出した。' },
      { speaker: 'kenji', text: 'なんだこれ。英語のメニュー?', mood: 'surprised', action: '(壁のメニューを見上げる)' },
      { speaker: 'lisa', text: '私が作ったの。のれんの定番メニューを英語にしてみた。', mood: 'normal', action: '(カウンターからひらひら手を振る)' },
      { speaker: 'mina', text: 'あ、私も読んでみたいです......。', mood: 'normal', action: '(隣の席に座る)' },
      { speaker: 'kenji', text: 'Grilled......Chicken......。焼き鳥か。意外と読めるな。', mood: 'surprised' },
      { speaker: 'master', text: '英語は知らない言葉でも、知ってる単語の組み合わせで推測できることが多い。', mood: 'normal' },
      { speaker: 'lisa', text: 'Kenjiさん、勘がいいね。メニューって実はビジネス文書と構造が同じなの。品名、説明、値段。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '......リサ、Seasonal Specialって何だ。', mood: 'thinking' },
      { speaker: 'lisa', text: '季節のおすすめ。', mood: 'normal' },
      { speaker: 'kenji', text: '読めた。読めたぞ。メニューの半分くらいは。', mood: 'excited' },
      { speaker: 'mina', text: '私も......! Kenjiさん、一緒に頑張りましょうね。', mood: 'excited' },
      { speaker: 'master', text: '明日は少しレベルを上げるぞ。', action: '(にやりと笑う)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 3: テキストメッセージ
  // ─────────────────────────────────────────────────────────
  3: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'takeshi', 'master'],
    opening: [
      { speaker: 'narration', text: '日曜の夕方。タケシがスマホを片手にやってきた。' },
      { speaker: 'takeshi', text: 'ケンジさん、これ見てくださいよ。', mood: 'excited', action: '(スマホの画面を見せる)' },
      { speaker: 'kenji', text: '......何だこの暗号。btw? thx? omw?', mood: 'frustrated' },
      { speaker: 'takeshi', text: '海外エンジニアとのチャットです。by the way、thanks、on my way。略語なんすよ。', mood: 'normal' },
      { speaker: 'kenji', text: '英語の上にさらに略すな。こっちは英語すら読めんのに。', mood: 'frustrated' },
      { speaker: 'master', text: 'いや、ケンジ。略語を知ってるとメールも速く読める。現場の「KY」と同じだ。', mood: 'normal' },
      { speaker: 'kenji', text: '......KYは「危険予知」だろ。空気読めないじゃないぞ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'takeshi', text: 'ASAP......as soon as possibleっす。これ契約書にも出ますよ。', mood: 'normal' },
      { speaker: 'kenji', text: 'ASAP......なるべく早く。うちの社長がよく言うやつか。', mood: 'thinking' },
      { speaker: 'master', text: '現場で使う言葉を知ってる人間は強い。英語も同じだ。', mood: 'normal' },
      { speaker: 'kenji', text: 'タケシ、明日もそのチャット見せろ。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 4: メールの読み方
  // ─────────────────────────────────────────────────────────
  4: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。ケンジがノートパソコンを持ってきた。画面には英語のメールが並んでいる。' },
      { speaker: 'kenji', text: '取引先からメールが5通来てる。件名すら読めん。', mood: 'frustrated', action: '(ノートPCを開く)' },
      { speaker: 'yuki', text: '全部読む必要ないですよ。メールはコツがあります。', mood: 'normal', action: '(ケンジの隣に座る)' },
      { speaker: 'yuki', text: 'まず件名。次に最初の3行。最後の1行。これだけで8割わかります。', mood: 'normal' },
      { speaker: 'kenji', text: '......3行でいいのか?', mood: 'surprised' },
      { speaker: 'master', text: '商社の人間はそうやって毎日100通さばいてる。', mood: 'normal' },
      { speaker: 'yuki', text: '件名に「Urgent」とあったら緊急。「FYI」は参考情報。それだけで優先度がわかるんです。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '......このメール、「Please confirm by Friday」で終わってる。金曜までに確認しろってことか。', mood: 'thinking' },
      { speaker: 'yuki', text: '正解です。最後の1行に用件が詰まってること、多いですよ。', mood: 'normal' },
      { speaker: 'kenji', text: '3行だけ読む。現場の日報と同じだな。要点だけ見る。', mood: 'determined' },
      { speaker: 'master', text: '仕事のできる男は、英語でも仕事ができる。', mood: 'normal', action: '(ビールを出す)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 5: 値段と数字
  // ─────────────────────────────────────────────────────────
  5: {
    scene: 'ケンジの会社 - 会議室',
    cast: ['kenji', 'yuki', 'takeshi'],
    opening: [
      { speaker: 'narration', text: '火曜の昼休み。ケンジが見積書を広げて唸っている。ユキとタケシが昼飯を持って会議室に集合。' },
      { speaker: 'kenji', text: 'この見積書、$450,000って書いてあるけど......税込みか?', mood: 'thinking', action: '(見積書を指さす)' },
      { speaker: 'yuki', text: '「inclusive of tax」って書いてあれば税込み。「exclusive of tax」なら税抜きです。', mood: 'normal' },
      { speaker: 'kenji', text: 'exclusive......。除外ってことか。税抜きか。', mood: 'thinking' },
      { speaker: 'takeshi', text: '数字は万国共通っすからね。ケンジさんの得意分野じゃないすか。', mood: 'excited' },
      { speaker: 'kenji', text: '数字はな。問題はその周りの英語だ。', mood: 'frustrated' },
    ],
    closing: [
      { speaker: 'yuki', text: '見積書で大事なのは金額、納期、条件。この3つの数字を追えば核心が読めます。', mood: 'normal' },
      { speaker: 'kenji', text: '......追えた。per unitが単価で、totalが合計。25年やってきた勘がある。', mood: 'determined' },
      { speaker: 'takeshi', text: 'さすが取締役。数字の嗅覚がすごい。', mood: 'excited' },
      { speaker: 'kenji', text: '褒めるな。まだ半分も読めてない。', mood: 'embarrassed' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 6: 日付と期限
  // ─────────────────────────────────────────────────────────
  6: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'lisa', 'master'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。ケンジが青い顔でのれんに駆け込んできた。' },
      { speaker: 'kenji', text: 'やらかした。', mood: 'frustrated', action: '(カウンターに突っ伏す)' },
      { speaker: 'master', text: '何があった。', mood: 'normal' },
      { speaker: 'kenji', text: '契約書に「04/06」って書いてあって、4月6日だと思ったんだ。', mood: 'frustrated' },
      { speaker: 'lisa', text: 'アメリカ式ね。月/日。でもイギリス式やアジアだと日/月......つまり6月4日。', mood: 'normal' },
      { speaker: 'kenji', text: '......2ヶ月も違うのか。', mood: 'surprised' },
      { speaker: 'lisa', text: 'だから国際契約では「June 4, 2026」とか「4 June 2026」って書くのが安全なの。数字だけは危ない。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '日付のフォーマットで命取りになるところだった。', mood: 'frustrated' },
      { speaker: 'master', text: '気づいたから大丈夫だ。知らないまま進むのが一番怖い。', mood: 'normal' },
      { speaker: 'lisa', text: '契約書の日付は3回読み直す。鉄則ね。', mood: 'normal' },
      { speaker: 'kenji', text: '3回読む。よし。覚えた。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 7: 現場の看板
  // ─────────────────────────────────────────────────────────
  7: {
    scene: 'ケンジの建設現場',
    cast: ['kenji', 'takeshi', 'yuki'],
    opening: [
      { speaker: 'narration', text: '木曜の朝。ケンジが海外製の資材と一緒に届いた看板を見ている。' },
      { speaker: 'kenji', text: 'HARD HAT AREA......。ヘルメット着用区域か。', mood: 'thinking', action: '(看板を持ち上げる)' },
      { speaker: 'takeshi', text: 'おっ、読めてるじゃないすか。', mood: 'excited', action: '(現場に顔を出す)' },
      { speaker: 'kenji', text: 'CAUTION、WARNING、DANGER......。注意、警告、危険。この3つは命に関わる。', mood: 'determined' },
      { speaker: 'yuki', text: 'そうです。CAUTIONは「気をつけて」、WARNINGは「やばいよ」、DANGERは「死ぬよ」。段階があります。', mood: 'normal' },
      { speaker: 'kenji', text: '現場の安全標識と同じ構造だな。色で分かれてる。', mood: 'thinking' },
    ],
    closing: [
      { speaker: 'kenji', text: 'NO ENTRY、AUTHORIZED PERSONNEL ONLY......。関係者以外立入禁止。読めた。', mood: 'excited' },
      { speaker: 'takeshi', text: '現場の英語は命を守る英語っすね。', mood: 'normal' },
      { speaker: 'kenji', text: '部下の命がかかってる。読めなかったじゃ済まない。', mood: 'determined' },
      { speaker: 'yuki', text: 'ケンジさんの読み方、いいですね。生活に関わるものから入ると定着が早いんです。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 8: レビューを読む
  // ─────────────────────────────────────────────────────────
  8: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'lisa', 'mina'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。ケンジがスマホでGoogleマップを開いている。' },
      { speaker: 'kenji', text: '取引先の会社、Googleレビューで4.2だった。', mood: 'thinking', action: '(スマホを見せる)' },
      { speaker: 'lisa', text: 'レビュー読んでみた?', mood: 'normal' },
      { speaker: 'kenji', text: '......「Professional and reliable」。プロフェッショナルで......信頼できる?', mood: 'thinking' },
      { speaker: 'mina', text: '合ってます! すごい、Kenjiさん。', mood: 'excited' },
      { speaker: 'kenji', text: 'ここに「However」って書いてある。しかし......?', mood: 'thinking' },
      { speaker: 'lisa', text: 'Howeverの後は悪い話が来る。レビューの読み方は、褒めた後の「but」や「however」が本音ね。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '「Great quality, however delivery was sometimes delayed.」......品質はいいけど納品が遅れることがある。', mood: 'thinking' },
      { speaker: 'lisa', text: '完璧。レビューが読めると取引先の信頼度も判断できる。', mood: 'normal' },
      { speaker: 'mina', text: 'Kenjiさん、1週間前とは別人みたい......。', mood: 'surprised' },
      { speaker: 'kenji', text: '別人じゃない。同じ男だ。ちょっと読めるようになっただけだ。', mood: 'embarrassed' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 9: 注意書き
  // ─────────────────────────────────────────────────────────
  9: {
    scene: 'ケンジの会社 - 資材倉庫',
    cast: ['kenji', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '土曜の午前。ケンジが海外から届いた建築資材の箱を開けている。' },
      { speaker: 'kenji', text: 'DO NOT STACK MORE THAN 5......。5つ以上積むな。', mood: 'thinking', action: '(マニュアルを読む)' },
      { speaker: 'yuki', text: 'ケンジさん、「DO NOT」は絶対禁止です。「SHOULD NOT」は推奨しない。この差は大きいです。', mood: 'normal' },
      { speaker: 'kenji', text: '禁止と推奨の差か。現場なら「絶対やるな」と「できればやめとけ」の違いだな。', mood: 'thinking' },
      { speaker: 'master', text: 'ケンジは現場の言葉に置き換えるのがうまい。それが読解力だ。', mood: 'normal', action: '(電話越し)' },
      { speaker: 'kenji', text: '......KEEP AWAY FROM HEAT......火気厳禁。これは読めた。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'yuki', text: 'マニュアルの英語は命令文が多いです。動詞から始まったら指示。DO NOTなら禁止。', mood: 'normal' },
      { speaker: 'kenji', text: '動詞から始まる=指示。DO NOT=禁止。シンプルだな。', mood: 'determined' },
      { speaker: 'master', text: '契約書も同じだぞ。「shall not」が出てきたら禁止事項だ。覚えておけ。', mood: 'normal' },
      { speaker: 'kenji', text: 'shall not......。メモした。', mood: 'determined', action: '(ポケットの手帳に書き込む)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 10: Phase 1 振り返り
  // ─────────────────────────────────────────────────────────
  10: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['kenji', 'master', 'yuki', 'mina'],
    opening: [
      { speaker: 'narration', text: '日曜の夜。10日目。マスターがホワイトボードを出してきた。' },
      { speaker: 'master', text: '10日前のケンジ、「一文字も読めん」と言ってたな。', mood: 'normal', action: '(ホワイトボードに「Day 1」と書く)' },
      { speaker: 'kenji', text: '......言ったな。', mood: 'embarrassed' },
      { speaker: 'yuki', text: '今はメニュー、メール、見積書、看板、レビュー、マニュアル。全部読んでます。', mood: 'normal' },
      { speaker: 'mina', text: '私もKenjiさんのおかげで続けられました。', mood: 'normal' },
      { speaker: 'kenji', text: '前より読めてる気がする。気のせいかもしれんけど。', mood: 'thinking' },
      { speaker: 'master', text: '気のせいじゃない。', mood: 'determined' },
    ],
    closing: [
      { speaker: 'master', text: '次の10日は文の仕組みを学ぶ。看板じゃなくて、文章を読むフェーズだ。', mood: 'normal' },
      { speaker: 'kenji', text: '......文章か。長い英語は怖いな。', mood: 'thinking' },
      { speaker: 'yuki', text: '大丈夫です。文の骨格を知れば、長くても怖くないんです。', mood: 'normal' },
      { speaker: 'mina', text: '一緒に頑張りましょう、Kenjiさん。', mood: 'determined' },
      { speaker: 'kenji', text: '......ああ。やるしかないな。契約書は待ってくれない。', mood: 'determined' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 2: 文章を読む (Days 11-20)
  // 文の仕組みを理解する
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────
  // Day 11: 文の骨格
  // ─────────────────────────────────────────────────────────
  11: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。ユキが紙に英文を3つ書いて持ってきた。' },
      { speaker: 'yuki', text: 'ケンジさん、英語は「誰が + どうした + 何を」。この順番です。', mood: 'normal', action: '(紙を広げる)' },
      { speaker: 'kenji', text: '日本語は「何を」が先だろ。逆じゃねえか。', mood: 'thinking' },
      { speaker: 'yuki', text: 'そうです。日本語は「契約書を 彼が 送った」。英語は「He sent the contract」。', mood: 'normal' },
      { speaker: 'kenji', text: '主語が最初か。......誰がやったか、最初に分かるのは便利だな。', mood: 'thinking' },
      { speaker: 'master', text: '建設でいうと、図面を見るとき最初に「誰の担当か」を見るだろ。英語も同じだ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'yuki', text: '長い文でも「誰が + どうした」さえ見つければ、核心が掴めます。', mood: 'normal' },
      { speaker: 'kenji', text: '「The contractor + submitted + the revised estimate.」......業者が修正見積もりを出した。', mood: 'thinking' },
      { speaker: 'kenji', text: '読めた。骨格を見ればいいんだな。', mood: 'excited' },
      { speaker: 'master', text: '建物も文章も骨格が大事だ。いい勘してるよ、ケンジ。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 12: butとbecause
  // ─────────────────────────────────────────────────────────
  12: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'yuki', 'lisa'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。ケンジが契約書のコピーに赤ペンで線を引いている。' },
      { speaker: 'kenji', text: 'ユキ、この「but」の後は悪い話が来るんだよな? レビューのときのhoweverと同じか?', mood: 'thinking' },
      { speaker: 'yuki', text: 'そうです。butとhoweverは「ここから話が変わりますよ」のサインです。', mood: 'normal' },
      { speaker: 'lisa', text: 'becauseは理由。soは結果。この2つを見つけたら、前後の関係が分かる。', mood: 'normal' },
      { speaker: 'kenji', text: '接続詞ってやつか。道路標識みたいなもんだな。「ここで曲がれ」「止まれ」。', mood: 'thinking' },
      { speaker: 'yuki', text: 'その例え、すごくいいです。接続詞は文の中の道路標識。', mood: 'excited' },
    ],
    closing: [
      { speaker: 'kenji', text: '「The price is competitive, but delivery may take 6 weeks.」......値段はいいけど納品に6週間。', mood: 'thinking' },
      { speaker: 'lisa', text: '契約でbutの後は必ず読むこと。条件がそこに隠れてる。', mood: 'normal' },
      { speaker: 'kenji', text: 'butの後だけ赤ペンで囲めばいいんだな。', mood: 'determined' },
      { speaker: 'yuki', text: '効率的です。全部読まなくていい。信号だけ追えばいい。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 13: itって何?
  // ─────────────────────────────────────────────────────────
  13: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'mina', 'lisa'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。ミナが英語の教科書を広げて困っている。ケンジが隣に座る。' },
      { speaker: 'mina', text: '「it」って......これ何を指してるんですか。全然分からなくて。', mood: 'frustrated', action: '(教科書を指さす)' },
      { speaker: 'kenji', text: '俺もだ。itだらけで迷子になる。', mood: 'frustrated' },
      { speaker: 'lisa', text: 'itは前の文に答えがある。「The report was submitted. It included all the data.」このitはthe report。', mood: 'normal' },
      { speaker: 'kenji', text: '......前を見ればいいのか。後ろばっかり見てた。', mood: 'surprised' },
      { speaker: 'lisa', text: '英語は同じ言葉を繰り返すのが嫌いなの。だからit、they、thisで代わりにする。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'mina', text: '前の文を見る......! それだけで全然違います。', mood: 'excited' },
      { speaker: 'kenji', text: '「The contract was signed. It will take effect on Monday.」......itは契約書か。', mood: 'thinking' },
      { speaker: 'lisa', text: '正解。代名詞は「指さしている方向」を見るだけ。', mood: 'normal' },
      { speaker: 'kenji', text: '指さしている方向......。現場で「あれ」って言ったら後ろを振り返るのと同じか。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 14: 知らない単語の推測
  // ─────────────────────────────────────────────────────────
  14: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'master', 'yuki'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。ケンジが辞書アプリと格闘している。' },
      { speaker: 'kenji', text: '1ページに知らない単語が20個ある。全部調べてたら日が暮れる。', mood: 'frustrated', action: '(スマホを置く)' },
      { speaker: 'master', text: 'ケンジ。現場で知らない工具が出てきたら、毎回メーカーに電話するか?', mood: 'normal' },
      { speaker: 'kenji', text: '......しない。形と使い方を見りゃだいたい分かる。', mood: 'thinking' },
      { speaker: 'master', text: '英語も同じだ。周りの言葉を見れば、知らない単語の意味は推測できる。', mood: 'normal' },
      { speaker: 'yuki', text: '例えば「procurement」が分からなくても、前後に「purchase」「order」「supplier」があれば、「調達」だと推測できます。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '......「The contractor failed to meet the deadline, resulting in a penalty of $10,000.」', mood: 'thinking' },
      { speaker: 'kenji', text: 'penaltyは分からんけど、deadline間に合わなくて$10,000......罰金だな。', mood: 'determined' },
      { speaker: 'yuki', text: '完璧です。文脈から推測する。これができればリーディング速度が3倍になります。', mood: 'excited' },
      { speaker: 'master', text: '辞書は最後の手段にしろ。文脈が最強の辞書だ。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 15: 要点を一発で掴む
  // ─────────────────────────────────────────────────────────
  15: {
    scene: 'ケンジの会社 - 会議室',
    cast: ['kenji', 'yuki', 'takeshi'],
    opening: [
      { speaker: 'narration', text: '金曜の昼。ユキが建設業界の英語ニュース記事をプリントしてきた。' },
      { speaker: 'yuki', text: 'ニュース記事は最初の段落と最後の段落だけ読めば要点が分かります。', mood: 'normal', action: '(プリントを配る)' },
      { speaker: 'kenji', text: '......全部読まなくていいのか。', mood: 'surprised' },
      { speaker: 'takeshi', text: '逆三角形っすよ。大事なことが最初に来る。新聞と同じ。', mood: 'normal' },
      { speaker: 'kenji', text: '日本語の新聞もそうか。最初に結論が来る。', mood: 'thinking' },
      { speaker: 'yuki', text: '最初の文=結論。次の文=補足。それ以降=詳細。だから最初だけで8割取れるんです。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: 'この記事......最初の1文で「東南アジアの建設市場が成長してる」って分かった。', mood: 'excited' },
      { speaker: 'takeshi', text: 'ケンジさん、もう記事読めてるじゃないすか。', mood: 'excited' },
      { speaker: 'kenji', text: '全部は無理だ。でも何が書いてあるかは分かる。', mood: 'determined' },
      { speaker: 'yuki', text: 'それが「読む」ということです。一言一句理解する必要はないんです。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 16: 否定に気をつけろ
  // ─────────────────────────────────────────────────────────
  16: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'lisa', 'master'],
    opening: [
      { speaker: 'narration', text: '土曜の夜。ケンジが契約書の1ページを穴が開くほど見つめている。' },
      { speaker: 'kenji', text: 'この文......「The client shall not be liable for...」......clientがliableじゃない?', mood: 'thinking' },
      { speaker: 'lisa', text: 'そう。「not」が1つ入るだけで意味が180度変わる。契約書で一番怖いのは否定の見落とし。', mood: 'normal' },
      { speaker: 'kenji', text: '小さい「not」1個で......。', mood: 'surprised' },
      { speaker: 'master', text: '現場で「やれ」と「やるな」を間違えたら事故になるだろ。英語も同じだ。', mood: 'normal' },
      { speaker: 'lisa', text: 'not、no、never、neither、nor、unless......。否定語は全部ハイライトする癖をつけて。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '「The warranty does not cover damage caused by misuse.」......保証は誤使用の損傷をカバーしない。', mood: 'thinking' },
      { speaker: 'kenji', text: 'not1個で保証の範囲が変わる。こええ。', mood: 'frustrated' },
      { speaker: 'lisa', text: '怖いと思えることが成長。否定に敏感になったKenjiさんは強い。', mood: 'normal' },
      { speaker: 'master', text: '否定語は赤ペン。これは鉄則だ。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 17: 時制
  // ─────────────────────────────────────────────────────────
  17: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'yuki', 'takeshi'],
    opening: [
      { speaker: 'narration', text: '日曜の夕方。ケンジが取引先からの進捗報告を持ってきた。' },
      { speaker: 'kenji', text: '「completed」と「will complete」......何が違う?', mood: 'thinking' },
      { speaker: 'yuki', text: 'completedは「もう終わった」。will completeは「これからやる」。過去と未来です。', mood: 'normal' },
      { speaker: 'takeshi', text: '工事の日報と同じっすね。「着工済み」と「着工予定」。', mood: 'normal' },
      { speaker: 'kenji', text: '......なるほど。「The foundation was completed」は基礎工事終わった。「will be completed」はこれから。', mood: 'thinking' },
      { speaker: 'yuki', text: '時制を読み間違えると、終わった仕事に催促メールを送ることになります。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '「has been shipped」は......出荷済みか。「will be shipped」は出荷予定。', mood: 'thinking' },
      { speaker: 'takeshi', text: '時制って最初ムズいけど、日報だと思えば楽っすよね。', mood: 'normal' },
      { speaker: 'kenji', text: '過去=実績、未来=予定。現場の日報を25年読んできた男を舐めるなよ。', mood: 'determined' },
      { speaker: 'yuki', text: '......もう教えることがなくなりそうです。', mood: 'surprised' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 18: 比較
  // ─────────────────────────────────────────────────────────
  18: {
    scene: 'ケンジの会社 - 会議室',
    cast: ['kenji', 'yuki', 'mina'],
    opening: [
      { speaker: 'narration', text: '月曜の昼休み。ケンジが2社の見積書を並べている。' },
      { speaker: 'kenji', text: '2社の見積もりを英語で比較しなきゃいけない。地獄だ。', mood: 'frustrated', action: '(2枚の見積書を広げる)' },
      { speaker: 'yuki', text: '「more than」は「より多い」、「less than」は「より少ない」。これだけで比較はできます。', mood: 'normal' },
      { speaker: 'mina', text: '「as...as」は「同じくらい」ですよね。', mood: 'normal' },
      { speaker: 'kenji', text: '「Company A is more expensive than Company B, but offers faster delivery.」......A社は高いけど納品が速い。', mood: 'thinking' },
      { speaker: 'yuki', text: '比較文が読めると、ビジネス判断の材料が英語から直接取れるようになります。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: 'A社は高いけど速い、B社は安いけど遅い。......日本語でも英語でも悩むことは同じだな。', mood: 'thinking' },
      { speaker: 'mina', text: '比較って、日本語に訳さなくても図で理解できますね。', mood: 'excited' },
      { speaker: 'kenji', text: '英語で比較できれば、会議で使える。これは武器になる。', mood: 'determined' },
      { speaker: 'yuki', text: 'ケンジさん、もう武器を手に入れてますよ。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 19: 理由と結果
  // ─────────────────────────────────────────────────────────
  19: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'lisa', 'yuki'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。ケンジが取引先からの進捗報告書を読んでいる。' },
      { speaker: 'kenji', text: '「Due to heavy rain, construction was delayed by 3 days.」......大雨で工事が3日遅れた。', mood: 'thinking' },
      { speaker: 'lisa', text: '自分で読めてるじゃない。', mood: 'surprised' },
      { speaker: 'kenji', text: 'due toは理由だよな? Day 4のメールで見た。', mood: 'thinking' },
      { speaker: 'yuki', text: 'due to = because of = 理由。as a result = therefore = 結果。原因と結果のペアです。', mood: 'normal' },
      { speaker: 'lisa', text: '報告書は「何が起きた → なぜ → どうなった」。この流れが英語の報告の型ね。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '「As a result, the project timeline has been extended to August.」......結果、8月まで延長。', mood: 'thinking' },
      { speaker: 'kenji', text: '......報告書が読める。原因と結果が分かれば対策が打てる。', mood: 'determined' },
      { speaker: 'yuki', text: 'ケンジさん、ビジネス英語の読み方をもう掴んでます。', mood: 'excited' },
      { speaker: 'lisa', text: '建設の人って論理的だから、英語の構造と相性がいいのかもね。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 20: Phase 2 振り返り
  // ─────────────────────────────────────────────────────────
  20: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['kenji', 'master', 'yuki', 'takeshi'],
    opening: [
      { speaker: 'narration', text: '水曜の夜。20日目。ケンジがスマホで英語のメールを打っている。' },
      { speaker: 'takeshi', text: 'ケンジさん......英語でメール打ってません?', mood: 'surprised' },
      { speaker: 'kenji', text: '取引先に返信してる。短いけどな。', mood: 'normal', action: '(スマホを見せる)' },
      { speaker: 'yuki', text: '「Thank you for the update. We will review the revised schedule and respond by Friday.」......完璧じゃないですか。', mood: 'surprised' },
      { speaker: 'kenji', text: '読めるようになったら、書けるようにもなってきた。不思議なもんだ。', mood: 'thinking' },
      { speaker: 'master', text: 'インプットが増えればアウトプットも出る。当然のことだ。', mood: 'normal', action: '(にやりと笑う)' },
    ],
    closing: [
      { speaker: 'master', text: '残り10日。次は実践だ。本物の英語を読む。', mood: 'determined' },
      { speaker: 'kenji', text: '今までのは本物じゃなかったのか?', mood: 'surprised' },
      { speaker: 'yuki', text: '今までは「パーツ」です。次は「全体」を読みます。記事、契約書、レポート。通しで。', mood: 'normal' },
      { speaker: 'kenji', text: '......来たな。本番が。', mood: 'determined' },
      { speaker: 'takeshi', text: '俺もついていきますよ、ケンジさん。', mood: 'determined' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 3: 実践リーディング (Days 21-30)
  // 仕事で使う
  // ═══════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────
  // Day 21: 旅行ガイド
  // ─────────────────────────────────────────────────────────
  21: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'lisa', 'takeshi'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。ケンジがシンガポール出張の準備を始めた。' },
      { speaker: 'kenji', text: 'シンガポールのホテル、英語のサイトで予約しなきゃいけない。', mood: 'thinking', action: '(ノートPCを開く)' },
      { speaker: 'takeshi', text: '俺も去年シンガポール行きましたよ。ホテルサイトは定型文多いんで読みやすいっす。', mood: 'normal' },
      { speaker: 'lisa', text: 'check-in、check-out、cancellation policy、amenities......。決まったキーワードを知ってれば大丈夫。', mood: 'normal' },
      { speaker: 'kenji', text: 'cancellation policy......キャンセル規定か。「Non-refundable」は返金不可......。', mood: 'thinking' },
      { speaker: 'lisa', text: '旅行の英語はパターンが決まってるから、慣れると一番読みやすいジャンルよ。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '予約した。英語で。......1人で。', mood: 'excited', action: '(静かにガッツポーズ)' },
      { speaker: 'takeshi', text: 'マジっすか! すげえ!', mood: 'excited' },
      { speaker: 'kenji', text: 'うるさい。ホテルを予約しただけだ。', mood: 'embarrassed' },
      { speaker: 'lisa', text: '「だけ」じゃないよ。英語で行動した。それが大事なの。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 22: ニュース記事
  // ─────────────────────────────────────────────────────────
  22: {
    scene: '居酒屋のれん - テーブル席',
    cast: ['kenji', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '金曜の夜。ユキが東南アジアの建設業界ニュースをプリントしてきた。' },
      { speaker: 'yuki', text: '取引先の国で大きなインフラ投資が始まっているニュースです。', mood: 'normal', action: '(記事を広げる)' },
      { speaker: 'kenji', text: '......「Southeast Asian construction market expected to grow 8% in 2026.」東南アジアの建設市場、8%成長見込み。', mood: 'thinking' },
      { speaker: 'master', text: '見出しだけで核心が取れたな。', mood: 'normal' },
      { speaker: 'kenji', text: 'Day 15で教わった。最初の1文を読めって。', mood: 'normal' },
      { speaker: 'yuki', text: '素晴らしいです。業界ニュースが読めると、商談の場で話題が作れます。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'kenji', text: '......記事の半分は読めた。半分は分からん。でも「何の話か」は分かった。', mood: 'determined' },
      { speaker: 'master', text: '「何の話か」が分かれば十分だ。詳細は専門家に聞けばいい。', mood: 'normal' },
      { speaker: 'yuki', text: 'ケンジさんは取締役なんですから、大きな絵を掴めればいいんです。', mood: 'normal' },
      { speaker: 'kenji', text: '大きな絵......。それなら俺の仕事だ。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 23: 求人票
  // ─────────────────────────────────────────────────────────
  23: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'takeshi', 'mina'],
    opening: [
      { speaker: 'narration', text: '土曜の昼。タケシが海外求人サイトを見せてきた。' },
      { speaker: 'takeshi', text: 'ケンジさん、シンガポールの建設会社の求人見てくださいよ。面白いっす。', mood: 'excited', action: '(スマホを見せる)' },
      { speaker: 'kenji', text: '「Requirements: 10+ years of construction experience, bilingual preferred.」......10年以上の建設経験、バイリンガル歓迎。', mood: 'thinking' },
      { speaker: 'kenji', text: '経験は25年ある。......バイリンガルだけがない。', mood: 'thinking' },
      { speaker: 'mina', text: 'Kenjiさん、もしかして海外も......?', mood: 'surprised' },
      { speaker: 'kenji', text: '行くわけねえだろ。......でも、読めると世界が広がるってのは分かった。', mood: 'embarrassed' },
    ],
    closing: [
      { speaker: 'takeshi', text: '「Competitive salary, relocation support.」......給料も引っ越しサポートも。ケンジさんいけますって。', mood: 'excited' },
      { speaker: 'kenji', text: 'うるさい。俺はうちの会社を守るために読んでるんだ。', mood: 'frustrated' },
      { speaker: 'mina', text: '......でもちょっと嬉しそうです、Kenjiさん。', mood: 'normal' },
      { speaker: 'kenji', text: '......うるさいって言ってるだろ。', mood: 'embarrassed', action: '(ハイボールを一口飲む)' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 24: 商品スペック
  // ─────────────────────────────────────────────────────────
  24: {
    scene: 'ケンジの会社 - 資材倉庫',
    cast: ['kenji', 'yuki', 'master'],
    opening: [
      { speaker: 'narration', text: '日曜。ケンジが海外メーカーの建築資材カタログを読んでいる。' },
      { speaker: 'kenji', text: '「Load capacity: 500kg per unit. Dimensions: 1200mm x 600mm x 300mm.」......耐荷重500kg、寸法は......。', mood: 'thinking', action: '(カタログに赤ペンで印をつける)' },
      { speaker: 'yuki', text: '数字とスペックはケンジさんの独壇場ですね。', mood: 'normal' },
      { speaker: 'kenji', text: '数字は分かる。「corrosion-resistant」ってのが分からん。', mood: 'thinking' },
      { speaker: 'master', text: 'corrosionは腐食。resistantは耐性。合わせて「耐腐食性」だ。', mood: 'normal', action: '(電話越し)' },
      { speaker: 'kenji', text: '耐腐食性か。東南アジアは湿度が高いからな。重要だ。', mood: 'determined' },
    ],
    closing: [
      { speaker: 'kenji', text: 'このカタログ、3割は分からん単語がある。でも残り7割で十分判断できる。', mood: 'determined' },
      { speaker: 'yuki', text: '7割で判断。それがプロの読み方です。100%理解を目指すと止まります。', mood: 'normal' },
      { speaker: 'kenji', text: '100点じゃなくていい。合格点を取れればいい。......現場と同じだ。', mood: 'thinking' },
      { speaker: 'master', text: '完璧主義は読解の敵だ。覚えておけ。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 25: レシピ
  // ─────────────────────────────────────────────────────────
  25: {
    scene: '居酒屋のれん - 厨房',
    cast: ['kenji', 'lisa', 'mina', 'master'],
    opening: [
      { speaker: 'narration', text: '月曜の夜。リサが英語のレシピカードを配り始めた。息抜きの日。' },
      { speaker: 'lisa', text: '今日は息抜き。英語のレシピでみんなで料理しよう。', mood: 'excited', action: '(レシピカードを配る)' },
      { speaker: 'kenji', text: '料理? 俺、カレーしか作れんぞ。', mood: 'embarrassed' },
      { speaker: 'mina', text: '「Dice the onions into small cubes.」......玉ねぎを小さく角切りにする。Diceってサイコロか。', mood: 'thinking' },
      { speaker: 'kenji', text: 'Stir......かき混ぜる。Simmer......煮込む。......読めるな。', mood: 'surprised' },
      { speaker: 'master', text: 'レシピは命令文だ。Day 9の注意書きと同じ構造。動詞から始まる。', mood: 'normal' },
    ],
    closing: [
      { speaker: 'lisa', text: 'Kenjiさん、料理上手じゃない!', mood: 'surprised' },
      { speaker: 'kenji', text: '......現場で弁当作ってた時期がある。若い頃な。', mood: 'embarrassed' },
      { speaker: 'mina', text: '英語のレシピで料理できた......。なんか自信つきました。', mood: 'excited' },
      { speaker: 'kenji', text: '英語は英語だけど、レシピなら手を動かしながら読める。悪くない。', mood: 'normal' },
      { speaker: 'master', text: '楽しく読めるものが一番伸びる。覚えておけ。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 26: SNSの投稿
  // ─────────────────────────────────────────────────────────
  26: {
    scene: '居酒屋のれん - カウンター席',
    cast: ['kenji', 'takeshi', 'lisa'],
    opening: [
      { speaker: 'narration', text: '火曜の夜。タケシがInstagramを開いている。' },
      { speaker: 'takeshi', text: 'ケンジさん、海外の建設プロジェクトのInstagram見てくださいよ。かっこいいっすよ。', mood: 'excited', action: '(スマホを見せる)' },
      { speaker: 'kenji', text: '......写真は分かる。この短い英語は......「Breaking ground on our latest project!」着工か。', mood: 'thinking' },
      { speaker: 'lisa', text: 'SNSの英語は短い。写真と合わせて読むから、一番読みやすいジャンルよ。', mood: 'normal' },
      { speaker: 'kenji', text: '「Can\'t wait to see this one finished.」完成が楽しみ......。建設屋はどこの国も同じこと言うな。', mood: 'normal' },
      { speaker: 'takeshi', text: 'ケンジさん、コメントしましょうよ。英語で。', mood: 'excited' },
    ],
    closing: [
      { speaker: 'kenji', text: '......「Great project. Respect from Japan.」って書いた。これでいいか?', mood: 'embarrassed', action: '(スマホを見せる)' },
      { speaker: 'lisa', text: '完璧。シンプルで伝わる。', mood: 'normal' },
      { speaker: 'takeshi', text: 'いいね3つ来てますよ! 海外の建設屋から!', mood: 'excited' },
      { speaker: 'kenji', text: '......英語で繋がるってのは、こういうことか。', mood: 'thinking' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 27: 契約書の核心
  // ─────────────────────────────────────────────────────────
  27: {
    scene: 'ケンジの会社 - 会議室',
    cast: ['kenji', 'yuki', 'lisa', 'master'],
    opening: [
      { speaker: 'narration', text: '水曜の午後。ケンジがDay 1に持ち込んだ契約書の束を再び広げた。今度は赤ペンとマーカーを持って。' },
      { speaker: 'kenji', text: '......やるぞ。', mood: 'determined', action: '(契約書の最初のページを開く)' },
      { speaker: 'yuki', text: '一緒に読みましょう。まず構成を確認します。目次はありますか?', mood: 'normal' },
      { speaker: 'kenji', text: 'ある。Table of Contents......目次か。Definitions、Scope of Work、Payment Terms......。', mood: 'thinking' },
      { speaker: 'lisa', text: 'Kenjiさん、もう構造が読めてる。30日前のKenjiさんとは別人ね。', mood: 'normal' },
      { speaker: 'kenji', text: '別人じゃない。同じ男だ。ちょっと成長しただけだ。', mood: 'embarrassed' },
      { speaker: 'master', text: '「ちょっと」じゃないがな。', mood: 'normal', action: '(電話越しに笑う)' },
    ],
    closing: [
      { speaker: 'kenji', text: 'Payment Terms......30 days after invoice、penalty for late payment is 1.5% per month。', mood: 'thinking' },
      { speaker: 'kenji', text: '請求書から30日以内に支払い。遅延は月1.5%のペナルティ。......読めた。全部読めた。', mood: 'excited' },
      { speaker: 'yuki', text: 'ケンジさん......。', mood: 'surprised' },
      { speaker: 'lisa', text: '分からない単語はあっても、内容は掴めてる。それが「読める」ってこと。', mood: 'normal' },
      { speaker: 'kenji', text: '......あと3日ある。もっと読み込む。', mood: 'determined' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 28: 物語
  // ─────────────────────────────────────────────────────────
  28: {
    scene: '居酒屋のれん - 奥のテーブル席',
    cast: ['kenji', 'master', 'mina'],
    opening: [
      { speaker: 'narration', text: '木曜の夜。マスターが薄い英語の本をケンジの前に置いた。' },
      { speaker: 'master', text: 'たまにはビジネスじゃない英語を読め。', mood: 'normal', action: '(短い英語の小話集を渡す)' },
      { speaker: 'kenji', text: '物語? ......ガキの頃以来だな、本を読むなんて。', mood: 'thinking' },
      { speaker: 'mina', text: '私も読みたいです。一緒に読みましょう、Kenjiさん。', mood: 'normal' },
      { speaker: 'kenji', text: '「A father worked hard every day. His daughter never said thank you. But one day, she wrote him a letter.」', mood: 'thinking' },
      { speaker: 'kenji', text: '......。', mood: 'thinking', action: '(黙って読み続ける)' },
    ],
    closing: [
      { speaker: 'mina', text: 'Kenjiさん......大丈夫ですか?', mood: 'normal' },
      { speaker: 'kenji', text: '......大丈夫だ。目にゴミが入った。', mood: 'embarrassed', action: '(目を擦る)' },
      { speaker: 'master', text: '英語で泣けたなら、もう読めてるよ。', mood: 'normal' },
      { speaker: 'kenji', text: '......泣いてねえ。', mood: 'embarrassed' },
      { speaker: 'narration', text: 'ケンジの手帳の間に、娘からもらった古い手紙が挟まっていた。' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 29: グラフと表
  // ─────────────────────────────────────────────────────────
  29: {
    scene: 'ケンジの会社 - 会議室',
    cast: ['kenji', 'yuki', 'takeshi'],
    opening: [
      { speaker: 'narration', text: '金曜の朝。ケンジが取引先からの四半期レポートを広げている。表情は穏やかだ。' },
      { speaker: 'kenji', text: '四半期レポート。グラフと表が中心だ。最後の訓練だな。', mood: 'determined', action: '(レポートを開く)' },
      { speaker: 'yuki', text: 'グラフは軸のラベルを読めば内容が分かります。', mood: 'normal' },
      { speaker: 'takeshi', text: '「Revenue increased by 12% year-over-year.」収益が前年比12%増っすね。', mood: 'normal' },
      { speaker: 'kenji', text: '「Operating margin improved from 8% to 11%.」......営業利益率が8%から11%に改善。......いい数字だな。', mood: 'thinking' },
      { speaker: 'yuki', text: 'もうレポートの核心を5分で掴めてますよ、ケンジさん。', mood: 'surprised' },
    ],
    closing: [
      { speaker: 'kenji', text: 'このレポートの結論は「成長してる会社」ってことだ。契約を進めて問題ない。', mood: 'determined' },
      { speaker: 'takeshi', text: 'ケンジさん、もう経営判断してるじゃないすか。英語で。', mood: 'excited' },
      { speaker: 'kenji', text: '当たり前だ。取締役だぞ。......英語が読めなくて判断できないなんて、もうありえない。', mood: 'determined' },
      { speaker: 'yuki', text: '......明日で30日目ですね。', mood: 'normal' },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 30: Kenjiの決断
  // ─────────────────────────────────────────────────────────
  30: {
    scene: '居酒屋のれん - 奥のテーブル席 → ケンジの自宅',
    cast: ['kenji', 'master', 'yuki', 'lisa', 'takeshi', 'mina'],
    opening: [
      { speaker: 'narration', text: '土曜の夜。のれんに全員が集まった。30日目。テーブルの上に、あの契約書がある。' },
      { speaker: 'master', text: 'ケンジ。契約書、読んでみろ。', mood: 'normal', action: '(契約書をケンジの前にそっと置く)' },
      { speaker: 'narration', text: 'ケンジは黙って契約書を開いた。赤ペンもマーカーも持っていない。' },
      { speaker: 'kenji', text: '......。', mood: 'determined', action: '(1ページ目を読み始める)' },
      { speaker: 'narration', text: '全員が息を止めて見守る。ケンジの指がゆっくりとページをめくっていく。' },
      { speaker: 'kenji', text: 'Scope of Work......施工範囲。Payment Terms......支払条件。Liability......責任。Termination......契約解除。', mood: 'normal', action: '(静かにページをめくり続ける)' },
      { speaker: 'narration', text: '5分。10分。誰も口を開かない。ケンジが最後のページをめくった。' },
      { speaker: 'kenji', text: '......読めた。全部は無理だ。でも、何が書いてあるか分かる。どこが重要か分かる。どこを専門家に聞けばいいか分かる。', mood: 'determined' },
    ],
    closing: [
      { speaker: 'yuki', text: 'ケンジさん......。', mood: 'surprised', action: '(目が潤む)' },
      { speaker: 'lisa', text: '30日前、「一文字も読めない」って言ってた人が......。', mood: 'normal' },
      { speaker: 'takeshi', text: '......すげえっす。マジで。', mood: 'excited' },
      { speaker: 'mina', text: '......私、Kenjiさんを見て頑張れました。ありがとうございます。', mood: 'normal', action: '(頭を下げる)' },
      { speaker: 'kenji', text: 'やめろ。大げさなんだよ。......みんなが教えてくれたから読めるようになっただけだ。', mood: 'embarrassed' },
      { speaker: 'master', text: 'ケンジ。最初にお前がここに来たとき、「読めん」と言ったな。', mood: 'normal' },
      { speaker: 'kenji', text: '......ああ。言った。', mood: 'normal' },
      { speaker: 'master', text: '30日で「読める」にしたのは、お前自身だ。俺たちは横にいただけだよ。', mood: 'normal', action: '(ビールを出す)' },
      { speaker: 'narration', text: 'ケンジは黙ってビールを受け取った。一口飲んで、天井を見上げた。' },
      { speaker: 'kenji', text: '......うまいな。', mood: 'normal' },
      { speaker: 'narration', text: '帰宅後。リビングのテーブルに契約書を広げていると、大学生の娘が後ろから覗き込んだ。' },
      { speaker: 'narration', text: '「お父さん......英語の書類読んでるの?」' },
      { speaker: 'narration', text: 'ケンジは振り返らずに答えた。' },
      { speaker: 'kenji', text: 'ああ。読めるようになった。', mood: 'normal' },
      { speaker: 'narration', text: '「......お父さん、すごいね。」' },
      { speaker: 'narration', text: 'ケンジは何も言わなかった。ただ、ページをめくる手が少しだけ震えていた。' },
    ],
  },
};
