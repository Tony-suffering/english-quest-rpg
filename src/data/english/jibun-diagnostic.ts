/**
 * じぶん英語30 / MY ENGLISH 30 -- パーソナル英語診断。
 *
 * 性格診断スタイルの100問(2択中心・一瞬)で、ユーザーを「型(アーキタイプ)」に分類。
 * 各設問が固定の重みキーに加点し、集計して 目的/分野/技能/レベル/性格/時間 を割り出す。
 * 結果の型ごとに30日教材テンプレを用意する(教材生成は次段階)。
 *
 * 第1バッチ: 100問 + 判定エンジン + 結果(アーキタイプ)。
 */

export type WeightKey =
    | 'lv'
    | 'g_work' | 'g_sns' | 'g_travel' | 'g_exam' | 'g_hobby' | 'g_confidence'
    | 'f_it' | 'f_business' | 'f_creative' | 'f_sports' | 'f_service' | 'f_academic' | 'f_daily'
    | 's_write' | 's_speak' | 's_read' | 's_listen'
    | 'planner' | 'social' | 'sprint' | 'perfection' | 'formal'
    | 't5' | 't10' | 't20' | 't30';

export interface DiagOption { label: string; w: Partial<Record<WeightKey, number>>; }
export interface DiagQuestion { id: number; section: string; text: string; options: DiagOption[]; }

export const DIAG_QUESTIONS: DiagQuestion[] = [
{ id: 1, section: "英語との距離", text: "海外旅行で英語のメニュー、どうする?", options: [
        { label: "写真を指さして頼む", w: { lv: -2 } },
        { label: "普通に英語で頼む", w: { lv: 1, s_speak: 1 } },
        { label: "店員とおすすめを聞いて雑談", w: { lv: 2, s_speak: 2 } }
    ] },
    { id: 2, section: "英語との距離", text: "外国人に道を聞かれたら?", options: [
        { label: "固まって逃げ腰になる", w: { lv: -2 } },
        { label: "単語と身振りで何とか伝える", w: { lv: 0, s_speak: 1 } },
        { label: "普通に会話で案内できる", w: { lv: 2, s_speak: 2 } }
    ] },
    { id: 3, section: "英語との距離", text: "英語の勉強、続いてる?", options: [
        { label: "三日坊主の常連", w: { lv: -1 } },
        { label: "なんだかんだ続いてる", w: { lv: 1 } }
    ] },
    { id: 4, section: "英語との距離", text: "洋画を見るとき字幕は?", options: [
        { label: "日本語字幕がないと無理", w: { lv: -2, s_listen: 1 } },
        { label: "英語字幕でいける", w: { lv: 1, s_listen: 1 } },
        { label: "字幕なしで楽しめる", w: { lv: 2, s_listen: 2 } }
    ] },
    { id: 5, section: "英語との距離", text: "英語に対して今どんな気持ち?", options: [
        { label: "正直ちょっと苦手", w: { lv: -1 } },
        { label: "もっと話せるようになりたい", w: { lv: 1 } }
    ] },
    { id: 6, section: "英語との距離", text: "英語のメール、書ける?", options: [
        { label: "翻訳アプリに丸投げ", w: { lv: -2, s_write: 1 } },
        { label: "テンプレを少しいじって書く", w: { lv: 0, s_write: 1 } },
        { label: "ゼロから自分で書ける", w: { lv: 2, s_write: 2 } }
    ] },
    { id: 7, section: "英語との距離", text: "英語の会議や電話、どう感じる?", options: [
        { label: "想像しただけで胃が痛い", w: { lv: -1, s_listen: 1 } },
        { label: "緊張するけど何とかなる", w: { lv: 1, s_listen: 1 } }
    ] },
    { id: 8, section: "英語との距離", text: "中学英語、覚えてる自信ある?", options: [
        { label: "be動詞あたりから怪しい", w: { lv: -2 } },
        { label: "だいたいは大丈夫", w: { lv: 1 } }
    ] },
    { id: 9, section: "英語との距離", text: "英語の本やニュース、読む?", options: [
        { label: "見た瞬間に閉じる", w: { lv: -2, s_read: 1 } },
        { label: "辞書を引きながら読む", w: { lv: 0, s_read: 1 } },
        { label: "普通に読めて楽しい", w: { lv: 2, s_read: 2 } }
    ] },
    { id: 10, section: "英語との距離", text: "英語を使う機会、今ある?", options: [
        { label: "日常でほぼゼロ", w: { lv: -1 } },
        { label: "仕事や趣味でけっこうある", w: { lv: 1 } }
    ] },
    { id: 11, section: "英語との距離", text: "ネイティブの早口、聞き取れる?", options: [
        { label: "一語も拾えない", w: { lv: -2, s_listen: 1 } },
        { label: "ゆっくりなら何とか", w: { lv: 0, s_listen: 1 } },
        { label: "わりとついていける", w: { lv: 2, s_listen: 2 } }
    ] },
    { id: 12, section: "英語との距離", text: "英語の発音、自分でどう思う?", options: [
        { label: "完全にカタカナ英語", w: { lv: -1, s_speak: 1 } },
        { label: "それっぽく言える方", w: { lv: 1, s_speak: 1 } }
    ] },
    { id: 13, section: "英語との距離", text: "TOEICや英検、受けたことは?", options: [
        { label: "縁がなさすぎる", w: { lv: -1 } },
        { label: "昔ちょっとだけ", w: { lv: 0 } },
        { label: "それなりのスコアを持ってる", w: { lv: 2 } }
    ] },
    { id: 14, section: "英語との距離", text: "知らない単語が出たら?", options: [
        { label: "そこで読むのをやめる", w: { lv: -2, s_read: 1 } },
        { label: "前後から意味を推測する", w: { lv: 1, s_read: 1 } }
    ] },
    { id: 15, section: "英語との距離", text: "英語で自己紹介、どこまでいける?", options: [
        { label: "名前を言うので精一杯", w: { lv: -2, s_speak: 1 } },
        { label: "仕事や趣味まで話せる", w: { lv: 1, s_speak: 1 } },
        { label: "話を広げて盛り上げられる", w: { lv: 2, s_speak: 2 } }
    ] },
    { id: 16, section: "英語との距離", text: "頭の中で英語って出てくる?", options: [
        { label: "まず日本語で考えてから訳す", w: { lv: -1 } },
        { label: "簡単なことは英語で浮かぶ", w: { lv: 2 } }
    ] },
    { id: 17, section: "英語との距離", text: "海外で困ったとき頼るのは?", options: [
        { label: "翻訳アプリと身振り手振り", w: { lv: -1, s_speak: 1 } },
        { label: "とりあえず自分の口で聞く", w: { lv: 1, s_speak: 1 } }
    ] },
    { id: 18, section: "英語との距離", text: "英語学習って今のあなたにとって?", options: [
        { label: "ゼロからの再スタート", w: { lv: -2 } },
        { label: "サビ落としのリハビリ", w: { lv: 0 } },
        { label: "さらに上を目指す段階", w: { lv: 2 } }
    ] },
    { id: 19, section: "英語との距離", text: "英語の歌詞、意味わかる?", options: [
        { label: "雰囲気で歌ってるだけ", w: { lv: -1, s_listen: 1 } },
        { label: "聞けばだいたい意味わかる", w: { lv: 1, s_listen: 1 } }
    ] },
    { id: 20, section: "英語との距離", text: "今いちばん近い感覚はどれ?", options: [
        { label: "英語アレルギー気味", w: { lv: -2 } },
        { label: "中学レベルで止まってる", w: { lv: 0 } },
        { label: "日常会話はいける手応え", w: { lv: 2 } }
    ] },
{ id: 21, section: "なぜ英語?", text: "英語が話せたら、まず何したい?", options: [
        { label: "海外旅行で困らずに動きたい", w: { g_travel: 3 } },
        { label: "仕事でちゃんと評価されたい", w: { g_work: 3 } },
        { label: "英語で発信してみたい", w: { g_sns: 3 } },
        { label: "昔できなかった自分にリベンジ", w: { g_confidence: 3 } }
    ] },
    { id: 22, section: "なぜ英語?", text: "ぶっちゃけ、一番の本音はどれ?", options: [
        { label: "給料とか転職に直結させたい", w: { g_work: 3 } },
        { label: "英語コンプを今度こそ消したい", w: { g_confidence: 3 } }
    ] },
    { id: 23, section: "なぜ英語?", text: "英語ができたら、誰に一番見せたい?", options: [
        { label: "上司・取引先", w: { g_work: 3 } },
        { label: "フォロワー・ネットの人", w: { g_sns: 3 } },
        { label: "誰にも見せなくていい、自分が満足したい", w: { g_confidence: 3 } }
    ] },
    { id: 24, section: "なぜ英語?", text: "次の長期休み、理想は?", options: [
        { label: "海外でしばらく暮らしてみる", w: { g_travel: 3 } },
        { label: "資格の勉強を一気に進める", w: { g_exam: 3 } },
        { label: "好きな作品を字幕なしで一気見", w: { g_hobby: 3 } }
    ] },
    { id: 25, section: "なぜ英語?", text: "スマホで英語に触れる時、よく開くのは?", options: [
        { label: "ニュースやビジネス系の記事", w: { g_work: 2 } },
        { label: "海外の友達やSNSの投稿", w: { g_sns: 2, g_hobby: 1 } },
        { label: "推しの動画やインタビュー", w: { g_hobby: 3 } }
    ] },
    { id: 26, section: "なぜ英語?", text: "英語の目標として、しっくりくるのは?", options: [
        { label: "TOEICの点数を上げる", w: { g_exam: 3 } },
        { label: "海外で一人でも生活できる", w: { g_travel: 3 } }
    ] },
    { id: 27, section: "なぜ英語?", text: "英語を勉強してるって人に言うなら?", options: [
        { label: "仕事で必要だからと言う", w: { g_work: 3 } },
        { label: "趣味で好きだからと言う", w: { g_hobby: 3 } },
        { label: "ずっと苦手だったから、と言う", w: { g_confidence: 3 } }
    ] },
    { id: 28, section: "なぜ英語?", text: "英語ペラペラの自分を想像すると?", options: [
        { label: "海外の街を一人で歩いてる", w: { g_travel: 3 } },
        { label: "会議で堂々と意見を言ってる", w: { g_work: 3 } },
        { label: "英語で投稿してコメントが来てる", w: { g_sns: 3 } }
    ] },
    { id: 29, section: "なぜ英語?", text: "ご褒美にもらえるなら、どっち?", options: [
        { label: "英検準1級の合格証", w: { g_exam: 3 } },
        { label: "海外片道航空券", w: { g_travel: 3 } }
    ] },
    { id: 30, section: "なぜ英語?", text: "英語で一番くやしかった瞬間は?", options: [
        { label: "海外で言いたいことが言えなかった", w: { g_travel: 2, g_confidence: 1 } },
        { label: "仕事で英語ができる人に差をつけられた", w: { g_work: 2, g_confidence: 1 } },
        { label: "好きな海外の話題についていけなかった", w: { g_hobby: 2, g_confidence: 1 } }
    ] },
    { id: 31, section: "なぜ英語?", text: "英語を続ける一番のモチベは?", options: [
        { label: "数字や合否で成長が見える", w: { g_exam: 3 } },
        { label: "できなかった自分が変わっていく感覚", w: { g_confidence: 3 } }
    ] },
    { id: 32, section: "なぜ英語?", text: "英語アカウントを作るとしたら?", options: [
        { label: "毎日英語で発信して伸ばしたい", w: { g_sns: 3 } },
        { label: "推しの情報を英語で追う用にしたい", w: { g_hobby: 3 } },
        { label: "正直アカウントは作らない", w: { g_confidence: 1, g_work: 1 } }
    ] },
    { id: 33, section: "なぜ英語?", text: "理想の英語のゴールは?", options: [
        { label: "仕事で武器として使える", w: { g_work: 3 } },
        { label: "好きなことを思いっきり楽しめる", w: { g_hobby: 3 } }
    ] },
    { id: 34, section: "なぜ英語?", text: "今、英語に一番期待してることは?", options: [
        { label: "キャリアの選択肢が増えること", w: { g_work: 3 } },
        { label: "自分に自信が持てること", w: { g_confidence: 3 } },
        { label: "世界が広がること", w: { g_travel: 2, g_hobby: 1 } }
    ] },
    { id: 35, section: "なぜ英語?", text: "英語学習でテンション上がるのは?", options: [
        { label: "模試で点が伸びた時", w: { g_exam: 3 } },
        { label: "推しの言葉が聞き取れた時", w: { g_hobby: 3 } },
        { label: "外国人に通じた時", w: { g_travel: 2, g_confidence: 1 } }
    ] },
    { id: 36, section: "なぜ英語?", text: "もし英語が完璧になったら、引っ越す?", options: [
        { label: "海外に住んでみたい", w: { g_travel: 3 } },
        { label: "今の場所でいい、英語は道具", w: { g_work: 2, g_exam: 1 } }
    ] },
    { id: 37, section: "なぜ英語?", text: "英語にかける時間、何のため?", options: [
        { label: "将来の仕事・収入のため", w: { g_work: 3 } },
        { label: "純粋に好きだから・楽しいから", w: { g_hobby: 3 } },
        { label: "苦手を克服したいから", w: { g_confidence: 3 } }
    ] },
    { id: 38, section: "なぜ英語?", text: "英語で投稿してバズったら?", options: [
        { label: "最高、もっと発信したい", w: { g_sns: 3 } },
        { label: "うれしいけど目的じゃない", w: { g_confidence: 1, g_hobby: 1 } }
    ] },
    { id: 39, section: "なぜ英語?", text: "英語を始めたきっかけに近いのは?", options: [
        { label: "仕事や昇進で必要になった", w: { g_work: 3 } },
        { label: "行きたい国・住みたい国がある", w: { g_travel: 3 } },
        { label: "好きな作品や人がきっかけ", w: { g_hobby: 3 } },
        { label: "ずっとの苦手を放置したくなかった", w: { g_confidence: 3 } }
    ] },
    { id: 40, section: "なぜ英語?", text: "最後に。英語ができたら手に入る一番ほしいものは?", options: [
        { label: "資格・肩書きという証明", w: { g_exam: 3 } },
        { label: "自由に動ける世界", w: { g_travel: 3 } },
        { label: "胸を張れる自分", w: { g_confidence: 3 } }
    ] },
{ id: 41, section: "あなたのフィールド", text: "英語が一番ぶつかってくる場面は?", options: [
        { label: "コードや技術記事", w: { f_it: 3 } },
        { label: "海外クライアントの会議", w: { f_business: 3 } },
        { label: "インスタやYouTube", w: { f_creative: 3 } },
        { label: "ジムや大会", w: { f_sports: 3 } }
    ] },
    { id: 42, section: "あなたのフィールド", text: "仕事でよく触るのは?", options: [
        { label: "パソコンと画面", w: { f_it: 3 } },
        { label: "お客さんと現場", w: { f_service: 3 } }
    ] },
    { id: 43, section: "あなたのフィールド", text: "休みの日にやりがちなのは?", options: [
        { label: "新しいアプリやガジェットいじり", w: { f_it: 3 } },
        { label: "動画や写真を撮って編集", w: { f_creative: 2, f_daily: 1 } },
        { label: "走ったり体を動かす", w: { f_sports: 3 } },
        { label: "家のことや買い物", w: { f_daily: 3 } }
    ] },
    { id: 44, section: "あなたのフィールド", text: "英語で読みたい記事は?", options: [
        { label: "新しい技術やリリース情報", w: { f_it: 3 } },
        { label: "市場やビジネスのニュース", w: { f_business: 3 } },
        { label: "論文や研究レポート", w: { f_academic: 3 } }
    ] },
    { id: 45, section: "あなたのフィールド", text: "SNSで一番見てるのは?", options: [
        { label: "技術系やプログラミング", w: { f_it: 3 } },
        { label: "デザインや映像クリエイター", w: { f_creative: 3 } },
        { label: "トレーニングや健康", w: { f_sports: 3 } },
        { label: "特に決まってない", w: { f_daily: 3 } }
    ] },
    { id: 46, section: "あなたのフィールド", text: "海外の人と話すとしたら相手は?", options: [
        { label: "取引先や同僚", w: { f_business: 3 } },
        { label: "旅行先のお店や宿の人", w: { f_service: 2, f_daily: 1 } }
    ] },
    { id: 47, section: "あなたのフィールド", text: "自分の英語を使いたいのは?", options: [
        { label: "プレゼンや交渉", w: { f_business: 3 } },
        { label: "作品やコンテンツの発信", w: { f_creative: 3 } },
        { label: "接客やおもてなし", w: { f_service: 3 } },
        { label: "毎日の暮らしの中で", w: { f_daily: 3 } }
    ] },
    { id: 48, section: "あなたのフィールド", text: "今いちばん詳しいジャンルは?", options: [
        { label: "テクノロジー", w: { f_it: 3 } },
        { label: "ビジネスやお金", w: { f_business: 3 } },
        { label: "アートや表現", w: { f_creative: 3 } },
        { label: "スポーツや体づくり", w: { f_sports: 3 } }
    ] },
    { id: 49, section: "あなたのフィールド", text: "英語の専門用語と言われて浮かぶのは?", options: [
        { label: "API とか deploy とか", w: { f_it: 3 } },
        { label: "revenue とか stakeholder とか", w: { f_business: 3 } },
        { label: "あんまり浮かばない", w: { f_daily: 3 } }
    ] },
    { id: 50, section: "あなたのフィールド", text: "理想の働き方に近いのは?", options: [
        { label: "黙々と手を動かす", w: { f_it: 2, f_creative: 1 } },
        { label: "人と会って動かす", w: { f_business: 2, f_service: 1 } }
    ] },
    { id: 51, section: "あなたのフィールド", text: "覚えたい英単語のイメージは?", options: [
        { label: "現場やマニュアルで使う言葉", w: { f_service: 3 } },
        { label: "数字や契約まわりの言葉", w: { f_business: 3 } },
        { label: "研究や論文で使う言葉", w: { f_academic: 3 } },
        { label: "とにかく日常で困らない言葉", w: { f_daily: 3 } }
    ] },
    { id: 52, section: "あなたのフィールド", text: "週末に行きたいのはどっち?", options: [
        { label: "美術館やライブ", w: { f_creative: 3 } },
        { label: "ジムやランニング", w: { f_sports: 3 } }
    ] },
    { id: 53, section: "あなたのフィールド", text: "英語で説明できたら気持ちいいのは?", options: [
        { label: "作ってるサービスの仕組み", w: { f_it: 3 } },
        { label: "自分の作品やこだわり", w: { f_creative: 3 } },
        { label: "トレーニングのやり方", w: { f_sports: 3 } }
    ] },
    { id: 54, section: "あなたのフィールド", text: "ニュースで気になるのは?", options: [
        { label: "新しいガジェットやAI", w: { f_it: 3 } },
        { label: "景気や企業の動き", w: { f_business: 3 } },
        { label: "医療や科学の発見", w: { f_academic: 3 } },
        { label: "暮らしや天気の話", w: { f_daily: 3 } }
    ] },
    { id: 55, section: "あなたのフィールド", text: "もし英語でバズるなら?", options: [
        { label: "技術解説の投稿", w: { f_it: 3 } },
        { label: "おしゃれな写真や動画", w: { f_creative: 3 } },
        { label: "トレーニング動画", w: { f_sports: 3 } }
    ] },
    { id: 56, section: "あなたのフィールド", text: "あなたの一日に近いのは?", options: [
        { label: "画面とにらめっこ", w: { f_it: 3 } },
        { label: "人と話しっぱなし", w: { f_service: 2, f_business: 1 } },
        { label: "体を動かしてる", w: { f_sports: 3 } },
        { label: "家事や用事でバタバタ", w: { f_daily: 3 } }
    ] },
    { id: 57, section: "あなたのフィールド", text: "海外で働くならどっち?", options: [
        { label: "オフィスやスタートアップ", w: { f_business: 2, f_it: 1 } },
        { label: "カフェやホテルの現場", w: { f_service: 3 } }
    ] },
    { id: 58, section: "あなたのフィールド", text: "英語の勉強で一番モチベが上がるのは?", options: [
        { label: "専門分野が英語で読めること", w: { f_academic: 2, f_it: 1 } },
        { label: "海外の人と仕事ができること", w: { f_business: 3 } },
        { label: "発信が世界に届くこと", w: { f_creative: 3 } },
        { label: "旅行や日常が楽になること", w: { f_daily: 3 } }
    ] },
    { id: 59, section: "あなたのフィールド", text: "資料を作るとしたら?", options: [
        { label: "数字とグラフのスライド", w: { f_business: 3 } },
        { label: "ビジュアル重視のデザイン", w: { f_creative: 3 } },
        { label: "そもそも資料を作らない", w: { f_daily: 2, f_sports: 1 } }
    ] },
    { id: 60, section: "あなたのフィールド", text: "結局あなたの土俵はどこ?", options: [
        { label: "テックやものづくり", w: { f_it: 3 } },
        { label: "ビジネスの現場", w: { f_business: 3 } },
        { label: "クリエイティブや発信", w: { f_creative: 3 } },
        { label: "体や健康", w: { f_sports: 3 } },
        { label: "接客やサービス", w: { f_service: 3 } },
        { label: "特になく日常全般", w: { f_daily: 3 } }
    ] },
{ id: 61, section: "あなたのタイプ", text: "新しいアプリを入れた。まず?", options: [
        { label: "説明をひと通り読んでから使う", w: { planner: 2 } },
        { label: "とりあえず触って覚える", w: { planner: -2 } }
    ] },
    { id: 62, section: "あなたのタイプ", text: "旅行に行くとき、あなたは?", options: [
        { label: "予定を細かく組んでから行く", w: { planner: 2 } },
        { label: "現地のノリで決める", w: { planner: -2 } }
    ] },
    { id: 63, section: "あなたのタイプ", text: "勉強を始める前に?", options: [
        { label: "ゴールと手順を決めたい", w: { planner: 2 } },
        { label: "まずやってみて後から考える", w: { planner: -2 } }
    ] },
    { id: 64, section: "あなたのタイプ", text: "やることリスト、あなたは?", options: [
        { label: "作って順番にこなすと安心", w: { planner: 2 } },
        { label: "思いついた順でいい", w: { planner: -2 } }
    ] },
    { id: 65, section: "あなたのタイプ", text: "勉強するなら?", options: [
        { label: "仲間とシェアして燃える", w: { social: 2 } },
        { label: "一人で黙々が集中できる", w: { social: -2 } }
    ] },
    { id: 66, section: "あなたのタイプ", text: "できたことがあったら?", options: [
        { label: "誰かに報告したい", w: { social: 2 } },
        { label: "自分の中で完結でいい", w: { social: -2 } }
    ] },
    { id: 67, section: "あなたのタイプ", text: "やる気が出るのは?", options: [
        { label: "ライバルや仲間がいるとき", w: { social: 2 } },
        { label: "自分のペースを守れるとき", w: { social: -2 } }
    ] },
    { id: 68, section: "あなたのタイプ", text: "わからないことが出たら?", options: [
        { label: "すぐ人に聞いて解決したい", w: { social: 2 } },
        { label: "まず自分で調べたい", w: { social: -2 } }
    ] },
    { id: 69, section: "あなたのタイプ", text: "理想の進め方は?", options: [
        { label: "短期間に一気に詰め込む", w: { sprint: 2 } },
        { label: "毎日ちょっとずつ続ける", w: { sprint: -2 } }
    ] },
    { id: 70, section: "あなたのタイプ", text: "燃えるのはどっち?", options: [
        { label: "締め切り前のラストスパート", w: { sprint: 2 } },
        { label: "コツコツ積み上げる手応え", w: { sprint: -2 } }
    ] },
    { id: 71, section: "あなたのタイプ", text: "週末の勉強、あなたは?", options: [
        { label: "まとめてガッとやりたい", w: { sprint: 2 } },
        { label: "少しずつ毎日に散らしたい", w: { sprint: -2 } }
    ] },
    { id: 72, section: "あなたのタイプ", text: "続けるコツは?", options: [
        { label: "勢いがあるうちに走り切る", w: { sprint: 2 } },
        { label: "無理のない習慣にする", w: { sprint: -2 } }
    ] },
    { id: 73, section: "あなたのタイプ", text: "英語を話すとき、あなたは?", options: [
        { label: "間違えたくない、ちゃんと言いたい", w: { perfection: 2 } },
        { label: "間違えてもどんどん口に出す", w: { perfection: -2 } }
    ] },
    { id: 74, section: "あなたのタイプ", text: "問題集の取り組み方は?", options: [
        { label: "一問ずつ確実に理解して進む", w: { perfection: 2 } },
        { label: "とにかく量をこなして慣れる", w: { perfection: -2 } }
    ] },
    { id: 75, section: "あなたのタイプ", text: "ミスを指摘されたら?", options: [
        { label: "気になって直さないと落ち着かない", w: { perfection: 2 } },
        { label: "次いこ、で気にしない", w: { perfection: -2 } }
    ] },
    { id: 76, section: "あなたのタイプ", text: "あなたに近いのは?", options: [
        { label: "完璧にできてから出したい", w: { perfection: 2 } },
        { label: "雑でもまず出してみる", w: { perfection: -2 } }
    ] },
    { id: 77, section: "あなたのタイプ", text: "話したい英語はどっち?", options: [
        { label: "きちんとした丁寧な言い方", w: { formal: 2 } },
        { label: "くだけたフランクな言い方", w: { formal: -2 } }
    ] },
    { id: 78, section: "あなたのタイプ", text: "メールやメッセージは?", options: [
        { label: "敬語できっちり書きたい", w: { formal: 2 } },
        { label: "ノリと短さ重視でいい", w: { formal: -2 } }
    ] },
    { id: 79, section: "あなたのタイプ", text: "初対面の人と話すとき?", options: [
        { label: "ちゃんとした言葉づかいを心がける", w: { formal: 2 } },
        { label: "すぐタメ口っぽくいきたい", w: { formal: -2 } }
    ] },
    { id: 80, section: "あなたのタイプ", text: "憧れる英語は?", options: [
        { label: "場にふさわしいきれいな英語", w: { formal: 2 } },
        { label: "ネイティブのゆるいスラング", w: { formal: -2 } }
    ] },
{ id: 81, section: "暮らしと使い道", text: "英語で一番できるようになりたいのは?", options: [
        { label: "スラスラ話す", w: { s_speak: 3 } },
        { label: "きれいに書く", w: { s_write: 3 } },
        { label: "速く読む", w: { s_read: 3 } },
        { label: "ちゃんと聞き取る", w: { s_listen: 3 } }
    ] },
    { id: 82, section: "暮らしと使い道", text: "今、一番もどかしいのは?", options: [
        { label: "言いたいことが口から出ない", w: { s_speak: 3 } },
        { label: "相手の英語が聞き取れない", w: { s_listen: 3 } }
    ] },
    { id: 83, section: "暮らしと使い道", text: "英語を使う場面を想像すると?", options: [
        { label: "誰かと会話している", w: { s_speak: 3 } },
        { label: "メールや文章を書いている", w: { s_write: 3 } }
    ] },
    { id: 84, section: "暮らしと使い道", text: "映画やドラマを英語で見るとき、ほしいのは?", options: [
        { label: "字幕なしで聞き取れる耳", w: { s_listen: 3 } },
        { label: "セリフをサッと読める目", w: { s_read: 3 } }
    ] },
    { id: 85, section: "暮らしと使い道", text: "理想の自分はどっち?", options: [
        { label: "雑談を楽しくこなせる人", w: { s_speak: 3 } },
        { label: "資料や記事を読みこなせる人", w: { s_read: 3 } }
    ] },
    { id: 86, section: "暮らしと使い道", text: "苦手意識が一番強いのは?", options: [
        { label: "発音して話すこと", w: { s_speak: 3 } },
        { label: "文章を組み立てて書くこと", w: { s_write: 3 } }
    ] },
    { id: 87, section: "暮らしと使い道", text: "練習するならどっちが燃える?", options: [
        { label: "耳を鍛えるリスニング", w: { s_listen: 3 } },
        { label: "目を鍛えるリーディング", w: { s_read: 3 } }
    ] },
    { id: 88, section: "暮らしと使い道", text: "SNSやチャットで英語を使うなら?", options: [
        { label: "自分の言葉で書き込みたい", w: { s_write: 3 } },
        { label: "声で気軽にやり取りしたい", w: { s_speak: 3 } }
    ] },
    { id: 89, section: "暮らしと使い道", text: "1日に英語へ使えるのは?", options: [
        { label: "5分くらい", w: { t5: 3 } },
        { label: "10分くらい", w: { t10: 3 } },
        { label: "20分くらい", w: { t20: 3 } },
        { label: "30分以上", w: { t30: 3 } }
    ] },
    { id: 90, section: "暮らしと使い道", text: "続けやすいのはどれ?", options: [
        { label: "スキマに5分だけ", w: { t5: 3 } },
        { label: "腰を据えて30分以上", w: { t30: 3 } }
    ] },
    { id: 91, section: "暮らしと使い道", text: "通勤や移動中に英語をやるなら?", options: [
        { label: "10分でサクッと", w: { t10: 3 } },
        { label: "20分しっかり", w: { t20: 3 } }
    ] },
    { id: 92, section: "暮らしと使い道", text: "理想のペースは?", options: [
        { label: "毎日5分を必ず", w: { t5: 3 } },
        { label: "毎日20分くらい", w: { t20: 3 } }
    ] },
    { id: 93, section: "暮らしと使い道", text: "なりたい英語のトーンは?", options: [
        { label: "礼儀正しくきちんと", w: { formal: 2 } },
        { label: "友達みたいにくだけて", w: { formal: -2 } }
    ] },
    { id: 94, section: "暮らしと使い道", text: "話すときの言葉づかいは?", options: [
        { label: "ていねいで失礼のない感じ", w: { formal: 2 } },
        { label: "スラングも混ぜてラフに", w: { formal: -2 } }
    ] },
    { id: 95, section: "暮らしと使い道", text: "メールを書くなら?", options: [
        { label: "かっちりしたビジネス文体", w: { formal: 2 } },
        { label: "気のおけない友達トーン", w: { formal: -2 } }
    ] },
    { id: 96, section: "暮らしと使い道", text: "あこがれる英語の話し手は?", options: [
        { label: "落ち着いた上品な人", w: { formal: 2 } },
        { label: "ノリよく笑わせる人", w: { formal: -2 } }
    ] },
    { id: 97, section: "暮らしと使い道", text: "一番使いたい場面は?", options: [
        { label: "仕事や会議で", w: { formal: 2, s_speak: 1 } },
        { label: "旅行や海外で遊ぶとき", w: { formal: -2, s_speak: 1 } }
    ] },
    { id: 98, section: "暮らしと使い道", text: "英語が役立ってほしいのは?", options: [
        { label: "海外のニュースや記事を読むとき", w: { s_read: 3 } },
        { label: "現地の人と直接しゃべるとき", w: { s_speak: 3 } }
    ] },
    { id: 99, section: "暮らしと使い道", text: "目標に近いのはどっち?", options: [
        { label: "海外旅行で困らない", w: { s_listen: 2, s_speak: 1 } },
        { label: "仕事でメールや書類をこなす", w: { s_write: 2, formal: 1 } }
    ] },
    { id: 100, section: "暮らしと使い道", text: "英語の動画やポッドキャストを?", options: [
        { label: "毎日10分流し聞きしたい", w: { s_listen: 2, t10: 1 } },
        { label: "週末にじっくり20分見たい", w: { s_listen: 2, t20: 1 } }
    ] }
];

export const TOTAL_QUESTIONS = 100;

// ===== labels =====
const GOAL_LABEL: Record<string, string> = {
    g_work: '仕事・キャリア', g_sns: 'SNS発信', g_travel: '旅・移住', g_exam: '試験・資格', g_hobby: '趣味・推し活', g_confidence: '自信・やり直し',
};
const FIELD_LABEL: Record<string, string> = {
    f_it: 'IT・テック', f_business: 'ビジネス', f_creative: 'クリエイティブ・SNS', f_sports: 'スポーツ・健康', f_service: '接客・観光', f_academic: '学術・専門', f_daily: '日常',
};
const SKILL_LABEL: Record<string, string> = {
    s_write: '書く', s_speak: '話す', s_read: '読む', s_listen: '聞く',
};

export interface DiagResult {
    archetypeKey: string;
    archetypeName: string;
    tagline: string;
    description: string;
    levelLabel: string;
    goalKey: string; goalLabel: string;
    fieldKey: string; fieldLabel: string;
    skillKey: string; skillLabel: string;
    timeLabel: string;
    styleSummary: string[];
    focus: string;     // 30日教材の方向性
    scores: Record<string, number>;
}

function argmax(scores: Record<string, number>, keys: string[]): string {
    let best = keys[0], bv = -Infinity;
    for (const k of keys) { const v = scores[k] || 0; if (v > bv) { bv = v; best = k; } }
    return best;
}

// archetype = 目的(主) × 分野(味付け)
function archetype(goal: string, field: string): { key: string; name: string; tagline: string; description: string } {
    if (goal === 'g_sns') return { key: 'creator', name: '発信者タイプ', tagline: '英語で「世界に」出していく人', description: '伝えたいことがある。文法より、まず投稿で映える一文。自分の分野の言葉を、自分の声で出していくのが最短ルート。' };
    if (goal === 'g_work' && field === 'f_it') return { key: 'it_survivor', name: 'コード越えタイプ', tagline: '英語が降ってくるエンジニア', description: 'ドキュメント、Issue、英語の海。完璧な会話より、まず読んで・書いて・回す実務英語を最短で。' };
    if (goal === 'g_work' && field === 'f_business') return { key: 'meeting', name: '会議サバイバータイプ', tagline: '会議とメールで戦う人', description: '言いたいことはある。あとは型と定番表現。会議・メール・交渉で削られない英語を30日で。' };
    if (goal === 'g_work') return { key: 'pro', name: '仕事英語タイプ', tagline: '仕事で結果を出す英語', description: '評価に直結する英語から。あなたの職種の言葉と、信頼される言い回しを固める。' };
    if (goal === 'g_travel') return { key: 'traveler', name: '旅人タイプ', tagline: '世界で困らない人になる', description: '空港・店・トラブル・雑談。使う順に、口から出る英語を体に入れる旅仕様の30日。' };
    if (goal === 'g_exam') return { key: 'exam', name: '試験ハンタータイプ', tagline: '点を取りにいく人', description: 'ゴールが明確なあなたには、型と頻出を最短距離で。書く・話すの得点源を狙い撃つ。' };
    if (goal === 'g_hobby') return { key: 'fan', name: '推し活タイプ', tagline: '好きで英語を伸ばす人', description: '好きこそ最強の教材。あなたの「好き」の言葉から、無理なく続く英語に。' };
    if (goal === 'g_confidence') return { key: 'restart', name: 'やり直しタイプ', tagline: 'もう一度、英語と向き合う人', description: '焦らない。小さく書いて、小さく成功して、自信を積み直す30日。昔の自分にリベンジ。' };
    return { key: 'daily', name: 'じぶん英語タイプ', tagline: '自分のための英語', description: '誰かのためでなく、自分の毎日に効く英語から。あなたの暮らしに合わせて積み上げる。' };
}

export function computeResult(selected: DiagOption[]): DiagResult {
    const scores: Record<string, number> = {};
    for (const opt of selected) {
        for (const [k, v] of Object.entries(opt.w)) scores[k] = (scores[k] || 0) + (v as number);
    }
    const goalKey = argmax(scores, ['g_work', 'g_sns', 'g_travel', 'g_exam', 'g_hobby', 'g_confidence']);
    const fieldKey = argmax(scores, ['f_it', 'f_business', 'f_creative', 'f_sports', 'f_service', 'f_academic', 'f_daily']);
    const skillKey = argmax(scores, ['s_write', 's_speak', 's_read', 's_listen']);
    const timeKey = argmax(scores, ['t5', 't10', 't20', 't30']);
    const lv = scores['lv'] || 0;
    const levelLabel = lv <= -6 ? '入門' : lv < 0 ? '初級' : lv < 8 ? '中級' : '上級';
    const timeLabel = { t5: '1日5分', t10: '1日10分', t20: '1日20分', t30: '1日30分以上' }[timeKey] || '1日10分';

    const style: string[] = [];
    style.push((scores['planner'] || 0) >= 0 ? '計画的に積む' : '直感でとりあえず');
    style.push((scores['social'] || 0) >= 0 ? 'みんなと共有して燃える' : '一人で黙々');
    style.push((scores['sprint'] || 0) >= 0 ? '短期集中で一気に' : 'コツコツ毎日');
    style.push((scores['perfection'] || 0) >= 0 ? '間違えたくない丁寧派' : '量重視のトライ派');
    style.push((scores['formal'] || 0) >= 0 ? 'きちんと丁寧トーン' : 'カジュアル・くだけた');

    const a = archetype(goalKey, fieldKey);
    const focus = `${FIELD_LABEL[fieldKey]}の語彙を軸に、「${SKILL_LABEL[skillKey]}」を伸ばす30日。${levelLabel}スタートで、${timeLabel}、${(scores['perfection'] || 0) >= 0 ? '正確さ重視' : '量重視'}で組む。毎日プリントして、筆写と投稿で続ける。`;

    return {
        archetypeKey: a.key, archetypeName: a.name, tagline: a.tagline, description: a.description,
        levelLabel,
        goalKey, goalLabel: GOAL_LABEL[goalKey],
        fieldKey, fieldLabel: FIELD_LABEL[fieldKey],
        skillKey, skillLabel: SKILL_LABEL[skillKey],
        timeLabel, styleSummary: style, focus, scores,
    };
}
