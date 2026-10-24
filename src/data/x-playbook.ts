/**
 * @tonio_english X 30/60/90 日プレイブック
 *
 * ソース:
 *  - claudedocs/x-growth-strategy-2026.md (511 行 deep research)
 *  - docs/note-articles/x-followers-meta-ai-advice.md (note 134)
 *  - 中堅英語アカウント実在確認リサーチ (2026-05-02)
 *
 * 設計原則:
 *  - 大手インフルエンサー (こあたん 77万 / Hapa / ATSU 13.9万) は除外
 *  - 3K-30K 帯のリプが埋もれない中堅勢に集中
 *  - 1日5リプ厳守 (10は炎上リスク)
 *  - 自分の投稿1 : リプ5 の比率
 *  - 木曜21時に渾身の1枚
 */

export const LAUNCH_DATE = '2026-05-02'; // Day 1 (本ダッシュボード稼働開始日)

// ============================================================
// Phase: 30日を 4 フェーズに分割
// ============================================================

export type PhaseId = 'foundation' | 'verify' | 'compound' | 'extend';

export interface Phase {
    id: PhaseId;
    label: string;
    dayRange: [number, number];
    goal: string;
    targetFollowers: string;
    keyMoves: string[];
}

export const PHASES: Phase[] = [
    {
        id: 'foundation',
        label: 'Phase 1 / 基礎工事週',
        dayRange: [1, 7],
        goal: 'プロフィール完成、戦略確定、最初の世界観発信',
        targetFollowers: '0 → 10-30',
        keyMoves: [
            'Premium 加入 (リーチ4-10倍)',
            'プロフ画像/バナーを警察庁風に',
            'Bio に検索キーワード "TOEIC900で話せない / 誤訳取締"',
            '固定ツイート: 世界観の最強カード1枚',
            'コア5アカウント (A-1) を毎日2リプずつ',
            '自分の投稿への返信 100%',
        ],
    },
    {
        id: 'verify',
        label: 'Phase 2 / 仮説検証週',
        dayRange: [8, 21],
        goal: '勝ちパターン特定、流入経路の絞り込み',
        targetFollowers: '30 → 200',
        keyMoves: [
            '一番伸びた投稿の共通項を週次で測定',
            'リプから来たフォロワーの傾向を観察',
            '流入の多い 3-5 アカウントに絞り込み',
            '1日リプ 30-50 本に増量',
            '木曜21時の渾身投稿を連載化',
        ],
    },
    {
        id: 'compound',
        label: 'Phase 3 / 複利スタート週',
        dayRange: [22, 30],
        goal: 'コミュニティ形成、初の3桁エンゲージ',
        targetFollowers: '200 → 400',
        keyMoves: [
            '相互リプの盛り上がる返信者 3-5 人を特定',
            'スレッド投稿に挑戦 (今週の検挙3選)',
            'toniolab.com / note へのリンク誘導開始 (Premium 経由)',
            '10 秒動画で警察カード解説 実験',
            '宣伝割合 < 10% を死守',
        ],
    },
    {
        id: 'extend',
        label: 'Phase 4 / 複利継続',
        dayRange: [31, 90],
        goal: '1000 フォロワー突破、世界観拡張',
        targetFollowers: '400 → 1000+',
        keyMoves: [
            '月1ペースで世界観拡張 (人事異動 / 新事件)',
            '居酒屋TOEIC とのクロス露出',
            'バズ1本で +1000 が現実圏に',
            'コアコミュニティの中で DM 相互の友達 1-2 人',
        ],
    },
];

// ============================================================
// Daily Routine: 1 日のタイムブロック
// ============================================================

export interface RoutineBlock {
    time: string;
    label: string;
    minutes: number;
    detail: string;
    kind: 'post' | 'reply' | 'self-reply' | 'review';
}

export const DAILY_ROUTINE: RoutineBlock[] = [
    {
        time: '08:00',
        label: '朝の軽め投稿 1本',
        minutes: 10,
        detail: 'カードまたは短文。前夜に下書き済みのものを公開。',
        kind: 'post',
    },
    {
        time: '09:00',
        label: 'リプ周り (午前) 30 分',
        minutes: 30,
        detail: 'コア5アカウントの新着に5分以内反応。経験談 or 質問角度。',
        kind: 'reply',
    },
    {
        time: '12:00',
        label: 'ランチ投稿 1本',
        minutes: 10,
        detail: '昼休み枠。テキスト中心の軽い気づきでOK。',
        kind: 'post',
    },
    {
        time: '21:00',
        label: 'メイン投稿 1本 (カード)',
        minutes: 15,
        detail: '日本市場ピーク。木曜は渾身の1枚を投下。',
        kind: 'post',
    },
    {
        time: '21:00-22:00',
        label: '自分のリプに 100% 返信',
        minutes: 30,
        detail: 'アルゴリズム +75 シグナル。最強の伸ばし技。',
        kind: 'self-reply',
    },
    {
        time: '22:00',
        label: '夜のリプ周り + 振り返り',
        minutes: 20,
        detail: '寝る前にもう1ラウンド。ハッシュタグ巡回で新規発掘1人。',
        kind: 'review',
    },
];

// ============================================================
// 投稿スケジュール: Day 1-30 の何を投稿するか
// (x-tweets.ts のドラフト ID を参照)
// ============================================================

export interface DailyPostPlan {
    day: number;
    morning?: { tweetId?: string; theme: string };
    midday?: { tweetId?: string; theme: string };
    evening?: { tweetId?: string; theme: string; isHero?: boolean };
}

export const POST_SCHEDULE: DailyPostPlan[] = [
    // 朝 = 英語格言 / 昼 = 哲学・非二元 (両輪の哲学側) / 夜 = 警察パロディ (wanted/clinic/breaking)
    { day: 1,  morning: { tweetId: 'quote-020', theme: 'Day 1 宣言' }, midday: { tweetId: 'philosophy-001', theme: '頭の中の声は自分じゃない' }, evening: { tweetId: 'breaking-003', theme: '【俺、X始めました】', isHero: true } },
    { day: 2,  morning: { tweetId: 'quote-002', theme: 'TOEIC高得点の罠' }, midday: { tweetId: 'philosophy-006', theme: 'これも過ぎ去る、全部' }, evening: { tweetId: 'wanted-takeshi', theme: '指名手配: タケシ' } },
    { day: 3,  morning: { tweetId: 'quote-001', theme: 'ネイティブ70%はムダ' }, midday: { tweetId: 'philosophy-007', theme: 'アイスの幸せ、5分で消える' }, evening: { tweetId: 'clinic-006a', theme: 'クリニック: 過剰丁寧症' } },
    { day: 4,  morning: { tweetId: 'quote-008', theme: 'TOEIC900の3秒会話' }, midday: { tweetId: 'philosophy-016', theme: 'エゴから出る方法を探すのもエゴ' }, evening: { tweetId: 'wanted-gondo', theme: '指名手配: 権藤' } },
    { day: 5,  morning: { tweetId: 'quote-005', theme: 'um は思考' }, midday: { tweetId: 'philosophy-019', theme: '気づいてる自分が一番気づいてない' }, evening: { tweetId: 'breaking-001', theme: '速報: 警視庁発足' } },
    { day: 6,  morning: { tweetId: 'quote-006', theme: '速いんじゃない' }, midday: { tweetId: 'philosophy-029', theme: '考えるな貼れは非二元' }, evening: { tweetId: 'wanted-yuki', theme: '指名手配: ユキ' } },
    { day: 7,  morning: { tweetId: 'quote-009', theme: '完璧な英語は存在しない' }, midday: { tweetId: 'philosophy-021', theme: '人生は映画、見てる人は中にいない' }, evening: { tweetId: 'clinic-006b', theme: '木曜HERO: クッション語過剰投与症', isHero: true } },
    { day: 8,  morning: { tweetId: 'quote-004', theme: 'あきらめ宣言' }, midday: { tweetId: 'philosophy-002', theme: '俺はガイだらけ' }, evening: { tweetId: 'wanted-mina', theme: '指名手配: ミナ' } },
    { day: 9,  morning: { tweetId: 'quote-010', theme: 'ChatGPT会話してる' }, midday: { tweetId: 'philosophy-027', theme: 'AIは構造的にno-self' }, evening: { tweetId: 'breaking-002', theme: '速報: 厚労省 新型6疾患' } },
    { day: 10, morning: { tweetId: 'quote-011', theme: '八村ya know' }, midday: { tweetId: 'philosophy-024', theme: 'ブッダもラマナも言行不一致' }, evening: { tweetId: 'wanted-lisa', theme: '指名手配: リサ' } },
    { day: 11, morning: { tweetId: 'quote-012', theme: 'ヌートバー片言' }, midday: { tweetId: 'philosophy-008', theme: '同じ俺は記憶の編集' }, evening: { tweetId: 'clinic-006c', theme: 'クリニック: ChatGPT依存症' } },
    { day: 12, morning: { tweetId: 'quote-013', theme: '内装屋3年→英語の指' }, midday: { tweetId: 'philosophy-010', theme: 'クロスは5年で全替え (内装屋×無常)' }, evening: { tweetId: 'breaking-004', theme: '速報: ChatGPT 共犯逮捕' } },
    { day: 13, morning: { tweetId: 'quote-014', theme: '失敗1万回 = プロ' }, midday: { tweetId: 'philosophy-030', theme: '現場のじいちゃんが一番禅' }, evening: { tweetId: 'wanted-mother', theme: '指名手配: オカン' } },
    { day: 14, morning: { tweetId: 'quote-015', theme: 'ネイティブ80%は中学英語' }, midday: { tweetId: 'philosophy-012', theme: '脳、死をナメてる' }, evening: { tweetId: 'breaking-005', theme: '木曜HERO: 4月月次統計', isHero: true } },
    { day: 15, morning: { tweetId: 'quote-016', theme: '1日1表現 → 1年半' }, midday: { tweetId: 'philosophy-005', theme: '自分探しは構造的に無理' }, evening: { tweetId: 'wanted-bucho', theme: '指名手配: 部長' } },
    { day: 16, morning: { tweetId: 'quote-017', theme: '錦織 I think maybe' }, midday: { tweetId: 'philosophy-020', theme: '悟っても背中は痛い' }, evening: { tweetId: 'clinic-007', theme: 'クリニック: 沈黙発作' } },
    { day: 17, morning: { tweetId: 'quote-018', theme: '英会話 ¥352,800' }, midday: { tweetId: 'philosophy-018', theme: 'エゴは意味付け機械' }, evening: { tweetId: 'wanted-steve', theme: '指名手配: スティーブ' } },
    { day: 18, morning: { tweetId: 'quote-019', theme: '恥は無料の教材' }, midday: { tweetId: 'philosophy-009', theme: '永遠だと思った全部、過ぎた' }, evening: { tweetId: 'breaking-006', theme: '速報: ですます過剰症' } },
    { day: 19, morning: { tweetId: 'quote-021', theme: '大谷、通訳経由でホームラン' }, midday: { tweetId: 'philosophy-014', theme: '老いは選択肢の引き算' }, evening: { tweetId: 'clinic-008', theme: 'クリニック: You know連発' } },
    { day: 20, morning: { tweetId: 'quote-022', theme: '円安で英語、使う場所ない' }, midday: { tweetId: 'philosophy-004', theme: '俺の痛みは接着剤の名前' }, evening: { tweetId: 'wanted-musuko', theme: '指名手配: 息子' } },
    { day: 21, morning: { tweetId: 'quote-023', theme: '花粉症リスニング30%減' }, midday: { tweetId: 'philosophy-013', theme: 'ラマナは16歳で死とハイタッチ' }, evening: { tweetId: 'breaking-007', theme: '木曜HERO: 警視庁人事異動', isHero: true } },
    { day: 22, morning: { tweetId: 'quote-024', theme: 'GW 何度でも Day 1' }, midday: { tweetId: 'philosophy-017', theme: 'エゴは時間でしか生きられない' }, evening: { tweetId: 'wanted-otaku', theme: '指名手配: オタク (Nani 連発)' } },
    { day: 23, morning: { tweetId: 'quote-025', theme: 'ヌートバー、血関係ない' }, midday: { tweetId: 'philosophy-022', theme: '悟った人も配役の一人' }, evening: { tweetId: 'clinic-009', theme: 'クリニック: R/L投擲症' } },
    { day: 24, morning: { tweetId: 'quote-026', theme: 'イチロー19年通訳付き' }, midday: { tweetId: 'philosophy-026', theme: '本物は勧誘しない' }, evening: { tweetId: 'wanted-yamada', theme: '指名手配: 山田 (PowerPoint英訳)' } },
    { day: 25, morning: { tweetId: 'quote-027', theme: '¥352,800で買った気持ち' }, midday: { tweetId: 'philosophy-011', theme: '同意書にサインした記憶ない' }, evening: { tweetId: 'clinic-010', theme: 'クリニック: 笑顔ニコニコ症' } },
    { day: 26, morning: { tweetId: 'quote-028', theme: '夜30分、結局開かない' }, midday: { tweetId: 'philosophy-003', theme: '思考は他人の会話と同じ構造' }, evening: { tweetId: 'wanted-bachan', theme: '指名手配: ばあちゃん' } },
    { day: 27, morning: { tweetId: 'quote-029', theme: '3年、人によって長さ違う' }, midday: { tweetId: 'philosophy-025', theme: '元から有るものを教える商売' }, evening: { tweetId: 'breaking-008', theme: '速報: 対策課、半数が犯人' } },
    { day: 28, morning: { tweetId: 'quote-030', theme: '俺のアプリ、俺しか使ってない' }, midday: { tweetId: 'philosophy-023', theme: '主役のいない映画' }, evening: { tweetId: 'breaking-009', theme: '木曜HERO: 4月MVP犯', isHero: true } },
    { day: 29, morning: { tweetId: 'quote-007', theme: '上位5%論' }, midday: { tweetId: 'philosophy-015', theme: '病院の待合室に哲学はない' }, evening: { tweetId: 'wanted-saiyou', theme: '指名手配: 採用担当' } },
    { day: 30, morning: { tweetId: 'quote-003', theme: '大谷が英語喋らない理由' }, midday: { tweetId: 'philosophy-028', theme: 'AIに悟った?は質問が成立してない' }, evening: { tweetId: 'breaking-010', theme: '【新人入庁】とにお書類送検' } },
];


// ============================================================
// リプ営業ターゲット: 実在確認済み中堅勢のみ
// ============================================================

export type ReplyAngle = '経験談重ね' | '別角度の質問' | '静かな反論' | '小ボケ補足';
export type Activity = '活発' | '普通' | '閑散';
export type Priority = 'core' | 'sub' | 'discovery';

export interface ReplyTarget {
    handle: string;
    name: string;
    followers: string;
    category: string;
    activity: Activity;
    priority: Priority;
    why: string;
    angles: ReplyAngle[];
    templates: string[];
    avoid?: string;
    note?: string;
}

export const REPLY_TARGETS: ReplyTarget[] = [
    // === コア5: Phase 1 で毎日リプ ===
    {
        handle: '@wadatoeic',
        name: 'wada / わだぽえ',
        followers: '13.3K',
        category: 'TOEIC学習・スコアアップ系',
        activity: '閑散',
        priority: 'core',
        why: 'TOEIC990点47回の権威。「TOEIC900あっても話せない」という @tonio_english の主張と直接ぶつかる。本人がリプを読む可能性が高い (リプ0-3件)',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'TOEIC990を47回って正気とは思えない凄さです。逆に質問なんですが、990の人ってオンライン英会話で「えっと…」って詰まる瞬間ってまだあります？俺は900で詰まりまくってます',
            'TOEIC教材レビュー助かります。完全に余談ですが、自分は元内装屋でTOEIC900取って「話せる側」に行けると思って凍りついた人間です。次のレビュー、リスニングよりスピーキング系もぜひ',
            '990を狙うルートと、話せるようになるルートって完全に別物だと感じてます？俺は迷子の900点保持者なので、和田さんの感覚が知りたいです',
        ],
    },
    {
        handle: '@TOEIC2012',
        name: 'Tony (バイリンガル編集者)',
        followers: '7.5K',
        category: 'TOEIC学習・現場系',
        activity: '普通',
        priority: 'core',
        why: '翻訳者・テレビ局勤務の現場視点。文法tipsを発信。本人がリプ返してくれる頻度が高い',
        angles: ['別角度の質問', '経験談重ね'],
        templates: [
            'テレビ局の翻訳現場って「えっ、TOEIC高いのに何でこれ訳せないの？」って言われた瞬間ありました？俺は900で似たこと10回言われてます',
            '翻訳と通訳って完全に別スキルって聞きますけど、現場の感覚として「両方できる人」って実際どのくらいの割合なんですか？',
            '元内装屋から英語に飛び込んだ身としては、現場の翻訳者の感覚が一番リアルで助かります。フォローしました',
        ],
    },
    {
        handle: '@JustAbirdEIGO',
        name: 'とり (TOEIC 200→905)',
        followers: '28K',
        category: 'TOEIC学習・経験談系',
        activity: '活発',
        priority: 'core',
        why: '200→905点の経験者。初心者向けイラスト発信。エンゲージ率高い (39-571いいね)',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            '200→905、人生3周分の根性ですね。自分は内装屋から始めて900到達した側ですが、「話せる側」に行けず警察組織を作って誤訳を取り締まることにしました',
            'イラスト解説、本当に助かってます。一個聞きたいんですが、905まで上げる過程で「ここで完全に折れた瞬間」って何回ありました？',
            '200点時代の自分に何か一言伝えるとしたら何ですか？俺は自分の200点時代に「英会話オンラインの方が先」と言いたいです',
        ],
    },
    {
        handle: '@dictlish_riyo',
        name: 'Dictlish りよ',
        followers: '7.7K',
        category: '発音・指導系',
        activity: '普通',
        priority: 'core',
        why: '家族エピソード混在のユーモア系。@tonio_english の警察パロディ世界観と相性が一番近い',
        angles: ['経験談重ね', '別角度の質問', '小ボケ補足'],
        templates: [
            'コールセンターで What\'s your problem? のエピソード、笑いが止まらない以前に他人事じゃなくて震えました。TOEIC900の元内装屋ですが、初めて Help me. と言うのに3年かかりました',
            '発音講師から見て「日本人がカタカナ発音から脱却するのに一番早い手順」って何ですか？俺は「恥を捨てる訓練」が9割でした',
            '家族エピソード系の投稿、日常生活の英語の修羅場感が刺さります。我が家は家族全員 What time is it now? で固まる代々の血統です',
        ],
    },
    {
        handle: '@myj1432rjom',
        name: 'エリー (英検1級22年挑戦)',
        followers: '1.1K',
        category: '英検・コンプレックス共有系',
        activity: '普通',
        priority: 'core',
        why: '「英検1級合格後のリアル＝話せない」を発信する50代。@tonio_english のコアターゲット層が読者にいる',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '「英検1級合格後のリアル」ってアカウント名、強すぎませんか。俺TOEIC900合格後のリアル枠です。一級の世界はもっと地獄だと聞いてます',
            '22年で1級って執念ですね。逆にお聞きしたいんですが、合格した瞬間に「話せるようにはなってない」って気づいた瞬間、何時何分でしたか？',
            '「合格後のリアル」を発信されている方が一番尊敬できます。合格 = ゴール幻想を破る人がもっと必要',
        ],
        note: 'フォロワー1.1Kは小さいが、ここの読者層が@tonio_englishのコアターゲット。リプ営業ではなく雑談相手として深く絡む',
    },

    // === サブ層: Phase 2 で広げる ===
    {
        handle: '@uutn_english',
        name: 'うーたん',
        followers: '11.1K',
        category: 'TOEIC学習・クイズ型',
        activity: '普通',
        priority: 'sub',
        why: 'クイズ投稿・投票機能を多用。エンゲージ誘発設計が上手い',
        angles: ['別角度の質問'],
        templates: [
            'クイズ系投稿、参加するの楽しいです。逆に「正解できる中級者」と「TOEIC高得点で話せない人」のクイズ正答率って差ありそうです？',
            '投票機能の使い方、参考にさせてもらってます',
        ],
        avoid: '一時凍結履歴あり。商材リンクへの言及は避ける',
    },
    {
        handle: '@kachun_eigogo',
        name: 'かちゅん (英語の先生)',
        followers: '49K',
        category: 'TOEIC・定時配信系',
        activity: '普通',
        priority: 'sub',
        why: '朝6:30単語/夜6:30文法の定時配信。中堅サイズの上限',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            '定時配信、習慣化のリズムとして助かってます。元内装屋で「朝6:30は現場入りの時間」だった脳の自分には、定時配信の英語が新鮮です',
            '今朝の単語、知ってるけど使ったことなかったです。TOEICで見た瞬間と日常で使う瞬間って完全に別世界',
        ],
    },
    {
        handle: '@bellthrough',
        name: 'ベル (近道教える英語講師)',
        followers: '18K',
        category: '指導・モチベ系',
        activity: '閑散',
        priority: 'sub',
        why: '相互フォロー型 (フォロー数1万＝相互文化アリ)。「TOEIC obsessionに警鐘」主張に乗れる',
        angles: ['静かな反論', '経験談重ね'],
        templates: [
            'TOEIC偏重への警鐘、共感です。俺はTOEIC900信者だったけど死にかけました。スコアと話せるは別物',
            '近道って実は「正面からの遠回り」だなと最近気づきました。3年回り道してから「結局リスニングだ」に戻ったクチです',
        ],
        avoid: 'モチベ系の押し付けっぽい投稿には絡まない',
    },

    {
        handle: '@yamayamanon',
        name: '英会話仙人トモヤ',
        followers: '27K',
        category: '英会話・原理原則系',
        activity: '普通',
        priority: 'sub',
        why: '純ジャパ→海外在住トリリンガル。原理原則メソッド。論理派受け',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '原理原則って言葉、現場のベテランがよく使うやつなんですよね。英語にも通じるとは思わなかった',
            '200以上の文献読んで、結局「これだけはやれ」って言える1つは何ですか？現場仕事しかしてこなかった俺向けに',
        ],
    },
    {
        handle: '@oka_kgs',
        name: '岡健作 (スタディーハッカー)',
        followers: '11K',
        category: '英語コーチング・ジム経営',
        activity: '普通',
        priority: 'sub',
        why: 'ENGLISH COMPANY 代表。社会人英語ジムの元祖。経営者目線+学習科学',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '英語ジムって発想、現場の親方の指導法とほぼ同じだと思いました。マンツーで詰める文化',
            '社会人パーソナルジム、続かない人の共通点って何ですか？俺は1人だと3日で寝る',
        ],
    },
    {
        handle: '@little_ricola',
        name: '上野陽子 (翻訳家・著者)',
        followers: '12K',
        category: 'ビジネス英語・翻訳系',
        activity: '普通',
        priority: 'sub',
        why: 'ジョブズの英語プレゼン本などの著者。淡々系。ビジネス英語の裏事情が滲む',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'ジョブズの英語プレゼン本書いてる方が、こんな短文ツイートで教えてくれるの贅沢すぎる',
            'ビジネスメールで「現場感」が伝わる英語ってあります？俺ら現場上がりの社会人は無機質なメール書けないっす',
        ],
    },
    {
        handle: '@romyscafe',
        name: '有子山博美 Romy',
        followers: '18K',
        category: '英語学習書・主婦勢',
        activity: '普通',
        priority: 'sub',
        why: '英語手帳の著者。TOEIC990/英検1級。ワーママ・主婦層の代弁',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '英語手帳、現場のヘルメットに挟んで休憩中に読めるサイズ感最高です。マニア向けじゃなくてリアルなのが良い',
            '1日5分英語日記、ネタ尽きません？俺は3日で「現場で釘踏んだ」しか書けなくなりました',
        ],
    },
    {
        handle: '@medhub12',
        name: 'めどはぶ (医療英語)',
        followers: '2.2K',
        category: '医療英語特化',
        activity: '普通',
        priority: 'sub',
        why: '医療英語特化。看護師・医師の社会人英語勢。ニッチだがエンゲージ率高い',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '医療英語って、現場用語が母国語でも難しいやつをさらに英語化するヤバさですよね。リスペクトしかない',
            '臨床留学目指す医療従事者、英語以外で詰まるのって何ですか？現場文化の違い系？',
        ],
        note: '小規模だがコミュニティ密度高い。深く絡む価値あり',
    },
    {
        handle: '@me_moneyenglish',
        name: 'GENKI 英語学習コーチ',
        followers: '2.2K',
        category: '元公務員・異業種転身',
        activity: '普通',
        priority: 'sub',
        why: '元公務員→アメリカ留学1年→TOEIC950。完全な異業種転身',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '公務員から英語コーチって、俺で言うと内装屋から塾講師レベルの飛躍。きっかけ気になります',
            '忙しい社会人の満足度96%って数字、続かない4%の人は何が原因なんでしょう？やる気？時間？',
        ],
    },
    {
        handle: '@honki_ryugaku',
        name: '本気くん (サウスピーク)',
        followers: '2.2K',
        category: 'セブ留学・社会人短期',
        activity: '普通',
        priority: 'sub',
        why: 'セブ島留学。3ヶ月で人生変える系。社会人独学からの留学入口',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '3ヶ月本気で英語、現場の繁忙期と被ったら無理ゲーすぎますよね。逆に閑散期狙う社会人多い？',
            'セブ留学の社会人、平均年齢どのくらいですか？30代後半の現場系が混ざっても浮かないか気になる',
        ],
    },
    {
        handle: '@Englishpandaa',
        name: '鬼塚英介 (バカ高→ホスト→英語講師)',
        followers: '72K',
        category: '異業種転身・回り道組',
        activity: '普通',
        priority: 'sub',
        why: '72K と少し大きいが、バカ高→国公立→ホスト→英語講師の振り幅が異常。回り道組には親近感MAX',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'ホストから英語講師って、俺の内装屋から英語より道のり長そうです。途中で何回辞めたくなりました？',
            '丸暗記脱却って言葉、現場の「マニュアル覚えるな、考えろ」と全く同じです。具体的にどう脱却させてます？',
        ],
        avoid: '72K でやや大きめ。リプは深夜・早朝が埋もれにくい',
    },

    // === TOEIC 学習系・追加 verified (2026-05-02 リサーチ) ===
    {
        handle: '@HUMMER_TOEIC',
        name: '濱崎潤之輔 (TOEIC990 講師)',
        followers: '21.1K',
        category: 'TOEIC990講師・著者',
        activity: '活発',
        priority: 'sub',
        why: 'TOEIC990を100回超、累計100万部超の著者。リプを丁寧に拾うタイプ。900帯の「次どうする」相談が多い',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '濱崎先生の990攻略本、職場の引き出しに入れて「いつかやる」って言いながら3年経った内装屋です。900で止まってから動かないんですが、905→990の壁って結局「英語力」なのか「TOEIC力」なのか',
            '900止まりの元内装屋がリスニング強化に金スコ買いました。Part 3の「会話の流れ察して先読み」が一番苦手なんですが、これって本番で「あ、これどうせ次の会議の話だな」みたいな現場勘で乗り切る系ですか？',
        ],
    },
    {
        handle: '@TNK_KNCH',
        name: '田中健一 (予備校講師)',
        followers: '23.8K',
        category: '予備校英語講師',
        activity: '活発',
        priority: 'sub',
        why: '不知塾運営、復文勉強法。批評＆考察系で議論盛り上がる',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '田中先生の復文、職人だった時に「壁の下地から考える」のと同じだなと思ってやってます。TOEIC900止まりの内装屋ですが、復文やると「英語って施工順番あるんだな」って毎回気づく',
            '900持ちで話せない警察です。受験英語の論理、現場で英語使う時には「論理の前に口が動かない」という壁があって、田中先生からするとこの段階の処方箋ってまずシャドーイングですか？それとも文法の再構築ですか',
        ],
    },
    {
        handle: '@KTogemaru',
        name: '和田啓 (とげまる・TOEIC405→990)',
        followers: '14.4K',
        category: 'TOEIC990独学・塾講師',
        activity: '活発',
        priority: 'core',
        why: '引きこもり経験→TOEIC405→990独学10年。「英語の山をのぼる」著者。とにおの「現場上がり、不器用ながら積み上げ」と共鳴最強',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'とげまるさんの「英語の山をのぼる」、内装の現場で5階まで階段で資材運んでた俺が「これ、山じゃなくて階段だな」と思って読んでます。TOEIC900で止まって6合目から動かない',
            '元職人でTOEIC900のとにおです。山を登る人を見るのが好きなんですが、自分は「山頂見えた」って錯覚した瞬間に動けなくなる山頂見え病。これ何合目で発症するか研究してください',
        ],
    },
    {
        handle: '@tky616',
        name: '宮下卓也 (河合塾)',
        followers: '10K',
        category: '受験英語・スクランブル著者',
        activity: '活発',
        priority: 'sub',
        why: '河合塾講師、東大卒。スクランブル英文法で累計60万部。文法とTOEICの橋渡し',
        angles: ['別角度の質問', '経験談重ね'],
        templates: [
            '宮下先生のスクランブル、内装屋時代に現場の休憩中に読んでたボロボロの一冊、まだ持ってます。TOEIC900止まりですが、文法は「分かる」けど「使えない」段階で詰んでるのって、典型的な「読解と運用の壁」ですか',
            '受験英語ガチ勢上がりで900止まりの元内装屋警察です。先生の英語長文プラスやってた頃が一番英語に対する解像度高かった気がして、TOEICで一気に解像度落ちた感覚があるんですが、これって俺だけですか',
        ],
    },
    {
        handle: '@EITO_STUDYBLOG',
        name: 'えいと (4時起き朝活)',
        followers: '9.4K',
        category: '朝活・社会人勉強記録',
        activity: '活発',
        priority: 'core',
        why: '4時起き朝活コミュ300名超、YouTube7.5万。社会人勉強記録の中核。とにおの「現場上がりで時間ない」と相性抜群',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            '内装屋時代「朝5時集合、現場8時着」でしたが英語1ミリもやってませんでした。TOEIC900取った今思うけど、あの2時間あったら今頃英会話余裕。えいとさんの4時起き、現場の人にこそ届いてほしい',
            '4時起きで英語勉強→朝コーヒー1杯→現場で「Could you」出てこない警察、自分です。朝活の効率と、TOEIC900で口が動かない現象、関係あると思いますか',
        ],
    },
    {
        handle: '@jay_toeic',
        name: '早川幸治 Jay (TOEIC990・著書60冊)',
        followers: '6.8K',
        category: 'TOEIC990講師・著者',
        activity: '普通',
        priority: 'sub',
        why: 'TOEIC990・英検1級・VERSANT86、企業研修230社、著書60冊。社会人TOEIC学習者と濃く',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'Jay先生のWritingドリル、TOEIC900持ちが「Writingで自分の英語の正体を知る」教材として勝手に使ってます。元内装屋ですが、書くと「俺、語彙が金フレしかない」って毎回バレる',
            'Jay先生に質問なんですが、TOEIC990持ちの人と「英語で雑談できる人」って、どこで分岐してると思いますか。900で口が止まった元職人としてはこの分岐点が一番気になります',
        ],
    },
    {
        handle: '@hiromaeda',
        name: 'ヒロ前田 (TOEIC60回超・特急シリーズ)',
        followers: '6.2K',
        category: 'TOEIC990講師・特急シリーズ',
        activity: '普通',
        priority: 'sub',
        why: 'TOEIC990、60回以上受験、本150万部。「TOEIC受験力」という独自軸',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'ヒロ前田先生の特急シリーズ、現場の昼休みに食べこぼし付きで読んでました。元内装屋でTOEIC900止まりですが、「英語力 × 受験力」のかけ算で言うと俺は受験力が0.5くらいで止まってる感じです。次に伸びる打ち手、どこから手をつけますか',
            'ヒロ前田先生にバカな質問ですが、TOEIC60回受けて見える景色って、どんなですか。元職人なので「同じ現場100回入ったら何が見える」感覚、わかる気がして',
        ],
    },
    {
        handle: '@ProcessE',
        name: '天満嗣雄 (TOEIC満点・Toastmasters)',
        followers: '5.0K',
        category: 'TOEIC満点・スピーキング',
        activity: '普通',
        priority: 'sub',
        why: 'TOEIC満点・英検1級講師、新大阪Toastmasters会長。スピーキング寄りで「話す」へ移る層に強い',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'Toastmastersに参加するか3年迷ってる元内装屋です。TOEIC900持ち、ただし口は工事現場のレベル。Toastmastersは「TOEIC900で話せない」段階の人、入っても大丈夫ですか',
            '天満先生の発音動画、TOEICのリスニング95％取れる耳でも自分の口は思ったより動かない問題、本当に救われてます。元職人で「手は動くのに口が動かない」が新しい悩みです',
        ],
    },
    {
        handle: '@kenta_tokita',
        name: '土岐田健太 (東進・Libarts)',
        followers: '4.2K',
        category: '受験英語・コーチング',
        activity: '普通',
        priority: 'sub',
        why: '上智英文学卒、TOEIC990。受験英語+TOEIC+英語コーチング',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '土岐田先生のLibarts興味あって調べた元内装屋です。TOEIC900から英会話に橋渡しする時、コーチングって「教える」より「壊す」フェーズが先っぽい印象あるんですが、合ってますか',
            '受験英語ガチ勢上がりでTOEIC900の警察です。土岐田先生の動画見てて思うんですが、「英文法を教える人の英語」と「英文法を喋る人の英語」って別の生き物ですよね。俺はどっちにも属さない化石',
        ],
    },
    {
        handle: '@masayakanzaki',
        name: '神崎正哉 (TOEICの神・神田外語大教授)',
        followers: '3.2K',
        category: 'TOEIC学術・最重鎮',
        activity: '普通',
        priority: 'sub',
        why: '「TOEICの神」、平均985点で128回受験。フォロワーは控えめだが影響力大',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '神崎先生に元内装屋から質問です。TOEIC900で口が動かない人と、TOEIC600で口が動く人、英語力の本質ってどっち寄りなんですか。現場で外国人と組んだ時、毎回この問いが頭から離れないので',
            '神崎先生の特急シリーズで900に到達した元職人です。990の壁、自分はもう登る気がないんですが、990の世界からはやっぱり「990を取りに来ない人」って見えるものですか',
        ],
    },
    {
        handle: '@claraiine777',
        name: 'クララ (3ヶ月で話せる英語・東京五輪通訳)',
        followers: '26K',
        category: '図解英語・話せる系',
        activity: '普通',
        priority: 'sub',
        why: '東京五輪通訳。英・仏・西スピーカー。「3ヶ月で語学マスター」記憶術',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'クララさんの「3ヶ月で話せる」、TOEIC900で3年話せてない元内装屋からすると「俺の3年×4」を3ヶ月でやる人がいる説、ちょっと信じたい',
            '東京五輪通訳って凄すぎる。記憶術って「忘れる前提の脳」を作るって理解で合ってます？俺TOEIC900だけど単語が口から出てこない人間なので',
        ],
    },

    // === 発音・リスニング・英検系 verified (2026-05-02 リサーチ) ===
    {
        handle: '@commercialpronu',
        name: '英語講師たいし (発音指導士・IPA派)',
        followers: '5.5K',
        category: '発音・IPA音声学',
        activity: '活発',
        priority: 'sub',
        why: '英語発音指導士。IPA・イントネーション本の著者。Geoff Lindsey/JC Wells 引用するガチ音声学派',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'たいし先生のイントネーション教材買いました。俺、英検準1級のリスニングがpassageで死ぬんですけど、これって結局イントネーション分かってないからですよね？',
            'JC Wellsの話 教えてくれる日本の発信者ほぼいないので感謝してます。先生の解説聞くと「警察パロディの英語」も恥ずかしくなくなりそう',
        ],
    },
    {
        handle: '@HibitoD',
        name: 'Hibito (パイロット・英検1級9-10回挑戦)',
        followers: '8.8K',
        category: '英検1級長期挑戦',
        activity: '活発',
        priority: 'core',
        why: 'パイロット、英検1級9-10回挑戦中、TOEIC900。「資格と話せるは別」を体感。とにおと完全同戦場',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'Hibitoさん10回目!? 俺はTOEIC900止まりで英検1級ビビって受けてないですけど、リスニングの問2でいつも一回死ぬらしいって聞いて怖い',
            '結局TOEIC900って「話せない」の証明書だったって、合格してから気づきましたよね？俺もそうです。Hibitoさん次受かったら何が変わるか聞いてみたい',
        ],
    },
    {
        handle: '@himawaruwaru',
        name: 'Himawaruwaru (ラーメン主婦・5年生で英検1級)',
        followers: '4.4K',
        category: '英検1級・帰国生',
        activity: '活発',
        priority: 'sub',
        why: '5年生で英検1級・帰国生・UK/US/AU/NZ在住歴、子育て×受験ネタ',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'お子さん4年で英検1級って事実上の「ズル」じゃないですか…と45歳TOEIC900のおっさんが嫉妬しています',
            'こういう投稿見ると、大人になってから英検1級行こうとしてる俺は何やってるんだろうって毎回なります。でもラーメン記事 美味そう',
        ],
    },
    {
        handle: '@detatan_pre1q',
        name: 'でた単 英検準1級',
        followers: '10K',
        category: '英検準1級語彙',
        activity: '活発',
        priority: 'sub',
        why: '英検準1級語彙データ化。発音記号付き「初出題年度」まで載せるガチ系',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'plow through、警察ドラマで「捜査資料を片っ端から目を通す」のplow throughで初めて覚えました。試験には出てないけど現場では出る',
            'でた単準1の単語、正解にならないけど「2回出てる」みたいな分析エグい。受かるためじゃなくて使うために単語覚えたい派にはむしろこれ',
        ],
    },
    {
        handle: '@detatan1q',
        name: 'でた単 英検1級',
        followers: '19.4K',
        category: '英検1級語彙',
        activity: '活発',
        priority: 'sub',
        why: '英検1級語彙データ化。発音記号付き投稿。1級界隈の定番',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'rendezvous、フランス語からそのまんま来てるから発音 何度見てもムリ。「ランデヴー」言える日本人どれぐらいいるんだろう',
            'TOEIC900で英検1級パス単開いた時の絶望、忘れられない。でた単アプリ、もう一回入れ直します',
        ],
    },
    {
        handle: '@eiken1bot',
        name: '英検1級 英英辞典 (老舗bot)',
        followers: '5.5K',
        category: '英検1級・英英定義',
        activity: '普通',
        priority: 'sub',
        why: '英検1級語彙を英英定義で連投。2012年〜の老舗bot',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'reclusive: living alone and fond of avoiding other people。コロナ後の俺じゃん。英英で覚えると例文の方が刺さる',
            'このbot、英英で見ると「あれ俺この単語知ってる」が「あれ意味あやふや」に変わる。英検1級単語、和訳で覚えてた弊害ですね',
        ],
    },
    {
        handle: '@eiken1kk',
        name: '英検1級 英単語 (SVL12000・IPA付)',
        followers: '15K',
        category: '英検1級・IPA',
        activity: '普通',
        priority: 'sub',
        why: 'SVL12000 Lv10-12をIPA(US)付きで投稿。ガチ単語勢',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'forage、TOEIC満点組でも「あ、子猫が餌探す方のforageね」ってサラっと出ない説',
            'こうやってIPA併記してくれる単語アカウント、地味にありがたい。発音記号ナシで覚えると、聞き取れない単語が増殖する',
        ],
    },
    {
        handle: '@anago_monster',
        name: 'アナゴ (化学メーカー朝活・TOEIC400→945・英検1級)',
        followers: '7.7K',
        category: '社会人英検挑戦・朝活',
        activity: '活発',
        priority: 'core',
        why: '化学メーカー、TOEIC 400→945、英検1級。朝5時オンライン英会話。「キャリア悩み→英検1級→資格と実務のギャップ」がとにお世界観そのもの。最強候補',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'アナゴさんの「キャリアに悩みTOEICを始め…海外部署に異動するも資格と実務のギャップに悩む」、これそのまんま俺です。リプライしておきました(してない)',
            '朝5時オンライン英会話、続いてるの本当に尊敬します。俺、5時起きはできるけどラジオ英会話 流して二度寝してます',
        ],
    },
    {
        handle: '@soieigo_27',
        name: 'Soi (スウェーデン在住・純ジャパTOEIC950)',
        followers: '23.2K',
        category: '純ジャパ・海外在住',
        activity: '活発',
        priority: 'sub',
        why: 'スウェーデン在住、商社→空港、英検1級、TOEIC950、TESOL Diploma。純ジャパ希望の代表',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'Soiさん「留学なし」勢の希望ですね。俺、留学経験ナシTOEIC900止まり45歳、いまから真面目にOverlapping始めます',
            'スウェーデン人の英語、なんでみんなあんなに普通に喋れるんですか？あれが世界基準だとしたら俺らはまだ走り出してすらいない',
        ],
    },
    {
        handle: '@akitoenglish',
        name: 'あきと (陰キャ商社マン・TOEIC945・英検1級)',
        followers: '2.2K',
        category: '商社・資格ホルダー',
        activity: '普通',
        priority: 'core',
        why: 'プライム上場商社貿易部、TOEIC945・英検1級。「話せない英検1級/TOEIC900ホルダーになってしまった」を公言。とにおと完全同戦場',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'あきとさんの「話せない英検1級/TOEIC900ホルダー」、俺の名刺の裏にも書きたいフレーズです。陰キャ商社マンの英語あるある、もっと教えて欲しい',
            '商社で英語使うって聞くと外野は「すごい」って言うけど、現場は冷や汗の量で会議終わりますよね。俺は外資系で同じ修行中です',
        ],
    },
    {
        handle: '@ichiro_an',
        name: '一路庵 (NHKラジオ英会話ディクテ・アラフィフエンジニア)',
        followers: '1.1K',
        category: 'NHKラジオ・ディクテーション',
        activity: '活発',
        priority: 'sub',
        why: 'NHKラジオ英会話を毎日ディクテーション。アラフィフエンジニア。年齢層・属性まる被り',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            '俺もNHKラジオ英会話聴いてますが、流して終わり派です。一路庵さんレベルでディクテできるアラフィフって何者…と毎回敬礼してます',
            '同じアラフィフエンジニアの先輩が大西先生のおしゃべりまでディクテしてるの、希望すぎる。俺もタイムトライアル復帰します',
        ],
        note: 'フォロワー1.1Kだが世界観完全一致。深く絡む価値あり',
    },
    {
        handle: '@asaenglishcoach',
        name: '朝井ともか (東大→Columbia→駐在→英語コーチ)',
        followers: '1.1K',
        category: 'ビジネス英語・発音',
        activity: '活発',
        priority: 'sub',
        why: '東大→Columbia大学院→海外駐在→英語コーチ、認定発音トレーナー。ビジネス×発音のニッチで濃い',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'ネイティブの速い英語が分からん問題、俺の8年来の課題です。朝井さんのコーチング、社会人で同じ轍ふんでる人にはもっと届くべき',
            '東大→Columbia→駐在って、俺がやれなかった人生の正解ルートじゃないですか。せめて発音だけでも真似させてください',
        ],
    },
    {
        handle: '@YasuYasuEnglish',
        name: 'Yasu (科学・英検1級・IELTS7.0)',
        followers: '935',
        category: 'アカデミック英語・科学',
        activity: '活発',
        priority: 'sub',
        why: 'CEFR C1、英検1級、IELTS 7.0、TOEIC970、放射光科学・半導体専門。科学英語×英検1級でニッチに濃い',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'YasuさんIELTS 7.0でSpeaking 7.0は普通にすごい。俺TOEIC900だけど、CRISPRの話を英語でできる気がしないので尊敬しかない',
            'IELTS の模試39/40って、もう試験対策の世界終わってますよね。俺も英検1級行く前にここまで持っていきたい',
        ],
    },

    // === 英会話・コーチング系 verified (2026-05-02 リサーチ) ===
    {
        handle: '@GonT_English',
        name: 'ごん (元高校教師→独立コーチ・3ヶ月TOEIC180UP)',
        followers: '22K',
        category: '英語コーチング・スピーキング',
        activity: '活発',
        priority: 'core',
        why: '元高校教師→独立コーチ。「3ヶ月でTOEIC180点UP」「会話量2倍」を実績で出してる。シャドーイング推し',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'シャドーイングを「絶対に絶対に絶対に」って4回言うコーチは信用できる。俺は元内装屋でTOEIC900だけど話せず、結局シャドーイングに戻ってきた人間です',
            '受講生3ヶ月で会話量2倍、その「最初の壁」って何点台で起きてますか？俺は900到達後に「壁が逆に高くなった」感覚がありました',
        ],
    },
    {
        handle: '@a_chan_English',
        name: 'あーちゃん (ゼロ→8ヶ月でCambridge FCE合格・豪在住)',
        followers: '16K',
        category: '英会話・初心者支援',
        activity: '普通',
        priority: 'sub',
        why: 'ゼロから8ヶ月でCambridge FCE合格。豪在住。「完璧主義捨てて場数」スタンスがとにおと重なる',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'ゼロから8ヶ月でFCEは異常です。逆にお聞きしたいんですが、最初に「あ、私詰んだ」って思った瞬間って何ヶ月目でした？',
            '完璧主義捨てるって言うけど、本当の壁は「捨てたつもりで捨てきれてない」ことだと思ってます。元内装屋から英語に飛び込んだ身としてはもう恥は捨てました',
        ],
        note: '直近の活動状況は要確認。本人投稿の最終日付をチェックしてからリプ',
    },
    {
        handle: '@hajieigo',
        name: 'はじ (32歳製造業・TOEIC355→935・著書あり)',
        followers: '12.1K',
        category: 'コーチング・社会人',
        activity: '普通',
        priority: 'core',
        why: '32歳製造業勤務。TOEIC355→935の自身の経験。著書「世界の非ネイティブエリートはたった100語で話している」。製造業×英語ど真ん中',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '製造業のリアル英語、刺さります。元内装屋で英語に飛び込んだ俺としては「現場で必要な英語」と「教科書英語」の差をひたすら痛感する立場です',
            '355→935は人生3周分の根性。逆に935到達後の「話せる側」の景色って、本当に変わりました？俺は900で逆に静かになりました',
        ],
    },
    {
        handle: '@r_toeic',
        name: 'あ〜る (藤井久高・TOEIC受験178回)',
        followers: '8.8K',
        category: 'TOEIC・受験記録',
        activity: '活発',
        priority: 'sub',
        why: 'TOEIC受験178回。慶應卒。データ分析家。「TOEIC900で話せない」と真っ向ぶつかる',
        angles: ['静かな反論', '別角度の質問'],
        templates: [
            '178回受験は人生TOEICですね。逆にお聞きしたいんですが、178回受けても「話せるようになる気配ゼロ」っていうのは想定内ですか想定外ですか？俺は900で凍結しました',
            'フォーム名標準化の話、データ分析家らしくて好きです。俺は元内装屋でTOEIC900後に話せず警察組織を作って誤訳を取り締まることにしました',
        ],
    },
    {
        handle: '@eichan_ruh',
        name: 'eichan (純ジャパTOEIC345→990・X凍結経験あり)',
        followers: '8.8K',
        category: '英語コーチング・TOEIC満点',
        activity: '普通',
        priority: 'sub',
        why: '純ジャパTOEIC345→990。英検1級・通訳案内士・Versant86。オンライン英会話10年継続。X凍結経験ありというネタ性',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'オンライン英会話10年継続って異次元です。逆に「最初の3ヶ月で完全に折れた瞬間」って何回ありました？俺はTOEIC900後に折れて警察組織立ち上げたクチです',
            'X凍結で1日3回涙の note 記事読みました。俺はまだ凍結未経験ですが、「警察ごっこのアカウント」やってる時点でいつか来る覚悟してます',
        ],
    },
    {
        handle: '@imrancoper',
        name: 'イムラン (英会話合宿・スタンドコメディ修行中)',
        followers: '5.5K',
        category: '英会話・合宿/イベント',
        activity: '普通',
        priority: 'sub',
        why: '英会話合宿・ツアー運営の老舗。スタンドコメディ修行中という変人キャラ。パロディ世界観と相性◎',
        angles: ['小ボケ補足', '経験談重ね'],
        templates: [
            'スタンドコメディ修行中の英語講師って強すぎる肩書き。俺は元内装屋で警察組織立ち上げて誤訳取り締まる方向に行きました。キャラ被ってないか心配です',
            '英会話合宿って「英語の自分」と「日本語の自分」の差が一番見える場って聞きます。実際、合宿2日目あたりで死んだ目になる参加者ってどのくらいの割合です？',
        ],
    },
    {
        handle: '@Aira_English',
        name: 'Aira (英語系YouTuber・71歳合格者発信)',
        followers: '3.3K',
        category: '英会話・YouTube連動',
        activity: '不定期',
        priority: 'sub',
        why: 'YouTube20万人だがX単体は中堅。「71歳合格者」など年齢関係ない発信。とにおと共鳴',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '71歳の合格者の話、泣きました。年齢は関係ないって本当に思います。俺は元内装屋で40代から英語、警察組織を作る側に回りました',
            'YouTubeで「自分が話せるようになった瞬間」ってどう演出してます？「変わった瞬間が無い」のがリアルだと思うんですけど、それは見せにくいですよね',
        ],
    },

    // === 海外在住・ワーホリ・留学系 verified (2026-05-02 リサーチ) ===
    {
        handle: '@canada_compass',
        name: '末永真一 (バンクーバー20年・留学エージェント)',
        followers: '12K',
        category: 'カナダ在住・留学エージェント',
        activity: '活発',
        priority: 'sub',
        why: 'バンクーバー20年・年間1000名留学生サポート・有資格ビザコンサル。カナダ系英語アカのハブ',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            'カナダ20年の人にコメント返すの恥ずかしいけど、俺TOEIC900で話せませんでした。ワーホリ夢見てた俺が今は内装屋から英語で再起してる',
            '留学生1000名サポートしてて、「来た時話せなかったけど成功した人」と「ずっと詰まってる人」の差って、何だと感じます？',
        ],
    },
    {
        handle: '@nycenglessons',
        name: 'NY会議通訳者の英語',
        followers: '25K',
        category: 'NY在住・会議通訳',
        activity: '普通',
        priority: 'sub',
        why: 'NY在住の会議通訳者・英語指導者。bio に骨太な人生経歴。発信に重みあり',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '会議通訳と俺の差、TOEIC100点くらいじゃ埋まらん。NYで通じる英語、俺は新宿でも怪しい',
            '会議通訳の現場で「TOEIC高得点なのに通訳できない人」って、現場で見ます？俺は900で完全に詰まった代表です',
        ],
    },
    {
        handle: '@namika_haiji',
        name: 'Namika 灰色ハイジ (米国・mmhmm デザイナー)',
        followers: '18K',
        category: '米国在住・デザイナー',
        activity: '普通',
        priority: 'sub',
        why: 'mmhmm勤務の Principal Visual Designer。「Designer\'s English Notebook」著者。海外IT×英語',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            'ハイジさんの英語ノート、俺の現場ノートと格差ありすぎ。元内装屋の俺、デザイナー英語以前に英語自体が無',
            'mmhmm 会議で英語、俺だったら画面共有を「資料の共有です」って5分かけて言ってる気がする',
        ],
    },
    {
        handle: '@studySingapore',
        name: 'シンガポール英語留学・ワーホリ支援',
        followers: '8.8K',
        category: 'シンガポール永住・留学支援',
        activity: '普通',
        priority: 'sub',
        why: '2001年から運営、代表は永住者。シンガポール=非ネイティブ英語環境を扱う希少枠。Singlish ネタも',
        angles: ['小ボケ補足', '別角度の質問'],
        templates: [
            'Singlishより俺の Tonio-lish のが通じない自信ある。シンガポール永住、俺は新宿永住で英語話せん',
            'シンガポールの「非ネイティブ同士の英語コミュニケーション」って、日本人にとって一番現実的な環境じゃないかと最近思ってます',
        ],
    },
    {
        handle: '@JEMTIsuzy',
        name: 'Suzy (病院事務16年→医療通訳士)',
        followers: '4.4K',
        category: '医療通訳・現場たたき上げ',
        activity: '普通',
        priority: 'sub',
        why: '病院事務16年→医療通訳士の異色キャリア。「現場たたき上げ」がとにおの内装屋上がりと相性',
        angles: ['経験談重ね', '別角度の質問'],
        templates: [
            '事務16年→通訳、俺と同じく現場系の上振れ。医療英語、俺は風邪薬の英語名すら言えん',
            '現場16年からの転身ってめっちゃ勇気いりますよね。俺も内装屋20年→英語アプリ作りに転身した側です。最初の3ヶ月、何が一番きつかったですか',
        ],
    },

    // === Discovery: Phase 1-2 で見つける ===
    {
        handle: 'ハッシュタグ巡回',
        name: '新規発掘 1日1人',
        followers: '3K-30K',
        category: '#TOEIC #英語学習 #朝活英語 から発掘',
        activity: '活発',
        priority: 'discovery',
        why: '直近24時間でいいね20-200/リプ0-5の中堅勢を1日1人特定',
        angles: ['経験談重ね', '小ボケ補足'],
        templates: [
            '(発掘した相手のプロフ・最新投稿に応じて1から書く)',
            '(警察キャラを軽く混ぜる: "誤訳取締の現場の者ですが…" など)',
        ],
    },
];

// ============================================================
// 4 Reply Angle 一覧 (説明用)
// ============================================================

export interface AngleDef {
    angle: ReplyAngle;
    description: string;
    bestFor: string;
    riskLevel: 'low' | 'medium' | 'high';
}

export const ANGLE_DEFS: AngleDef[] = [
    {
        angle: '経験談重ね',
        description: '「俺もこうでした」と自分の体験を1つ差し出す',
        bestFor: '@wadatoeic / @JustAbirdEIGO / @myj1432rjom',
        riskLevel: 'low',
    },
    {
        angle: '別角度の質問',
        description: '「逆にこういう時どうしてます？」と問い返す',
        bestFor: '@TOEIC2012 / @dictlish_riyo',
        riskLevel: 'low',
    },
    {
        angle: '静かな反論',
        description: '「それも一理ありますが…」と別視点を提示',
        bestFor: '@bellthrough / @kachun_eigogo',
        riskLevel: 'medium',
    },
    {
        angle: '小ボケ補足',
        description: '警察パロディ世界観で軽く突っ込む (差別化武器)',
        bestFor: '@dictlish_riyo (家族系投稿) / 新規発掘',
        riskLevel: 'low',
    },
];

// ============================================================
// 新規発掘用 X 検索クエリ
// ============================================================

export interface DiscoveryQuery {
    query: string;
    purpose: string;
}

export const DISCOVERY_QUERIES: DiscoveryQuery[] = [
    { query: 'TOEIC 800 lang:ja min_faves:30 -filter:replies', purpose: '中堅 TOEIC 学習垢' },
    { query: 'TOEIC 900 話せない lang:ja min_faves:20', purpose: '同じ悩みを持つ仲間' },
    { query: '英会話 オンライン 詰まった lang:ja min_faves:15', purpose: 'オンライン英会話組' },
    { query: '英検1級 リアル lang:ja min_faves:10', purpose: '合格後のリアル発信者' },
    { query: 'カタカナ英語 通じない lang:ja min_faves:50', purpose: 'カタカナ英語ネタ層' },
    { query: 'リスニング できない lang:ja min_faves:20', purpose: 'リスニング地獄組' },
    { query: '英語独学 純ジャパ lang:ja min_faves:10', purpose: '純ジャパ独学勢' },
];

// ============================================================
// 絶対 NG リスト
// ============================================================

export const ANTI_PATTERNS: { rule: string; why: string }[] = [
    {
        rule: '同じ日に同じアカウントへ3リプ以上',
        why: '粘着扱いになる。1日1リプまで',
    },
    {
        rule: '初リプから商材リンク/note URL貼る',
        why: '営業色が強くなりブロック対象。3往復目以降のみ',
    },
    {
        rule: '「フォローしました」だけのリプ',
        why: '中身ゼロで最も嫌われる。必ず文脈に沿った内容で',
    },
    {
        rule: '大手インフルエンサー (10万+) へのリプ',
        why: '埋もれる。時間の無駄',
    },
    {
        rule: 'マスフォロー (1日100+)',
        why: '凍結リスク。新規アカは1日30以下',
    },
    {
        rule: 'いいね連打 (1日300+)',
        why: 'シャドウバン。いいねは0.5x で ROI 最低',
    },
    {
        rule: 'ハッシュタグ4個以上',
        why: 'スパム判定。最大2個まで',
    },
    {
        rule: '「いいね押してね！」「拡散希望！」',
        why: 'エンゲージメント乞食判定',
    },
    {
        rule: '3日連続で投稿しない',
        why: 'アルゴリズム評価が激落',
    },
];

// ============================================================
// FOLLOW 戦略: 30 日で 600 フォロー / 1 日 20-30
// 凍結ライン (100/日, 10/h) の 1/3 で安全圏
// ============================================================

export interface FollowPlanDay {
    day: number;
    followCount: number;
    sources: string[];
    note?: string;
}

export const FOLLOW_PLAN: FollowPlanDay[] = [
    { day: 1, followCount: 30, sources: ['コア5', 'サブ8', 'リプ営業ターゲット 9 全員', '+10 追加発掘'], note: '初日は最大の30件。リスト全員フォローで土台' },
    { day: 2, followCount: 20, sources: ['#TOEIC 直近24h でいいね20-200の中堅', '#英語学習 朝活枠'] },
    { day: 3, followCount: 20, sources: ['#TOEIC 勉強 直近24h', '#オンライン英会話 から3件'] },
    { day: 4, followCount: 20, sources: ['#英検1級 リアル系', '#純ジャパ から'] },
    { day: 5, followCount: 20, sources: ['#リスニング できない 共感系', '昨日いいねくれた人 5'] },
    { day: 6, followCount: 20, sources: ['#発音 / IPA 系', '#シャドーイング'] },
    { day: 7, followCount: 25, sources: ['週末まとめ: 自分のリプにいいねした全員', '#英語学習 アクティブ層'] },
    { day: 8, followCount: 20, sources: ['#TOEIC900 系 (同志)', 'ターゲットのフォロワーから5'] },
    { day: 9, followCount: 20, sources: ['#英会話 オンライン 失敗談'] },
    { day: 10, followCount: 20, sources: ['#英語独学 フォロワー2-5K帯'] },
    { day: 11, followCount: 20, sources: ['#朝活英語 / #モーニング英語'] },
    { day: 12, followCount: 20, sources: ['#TOEIC勉強垢さんと繋がりたい'] },
    { day: 13, followCount: 20, sources: ['#英検準1級 / #英検1級'] },
    { day: 14, followCount: 25, sources: ['週末: 反応くれた人全員 + #英語勉強'] },
    { day: 15, followCount: 20, sources: ['#異業種転職 英語', '#看護師 英語'] },
    { day: 16, followCount: 20, sources: ['#ワーママ 英語'] },
    { day: 17, followCount: 20, sources: ['#留学 帰国組'] },
    { day: 18, followCount: 20, sources: ['#英会話レッスン', '初対面の引用RTした人'] },
    { day: 19, followCount: 20, sources: ['#オンライン英会話 DMM/ネイティブキャンプ'] },
    { day: 20, followCount: 20, sources: ['#TOEIC 中堅勢 同時期スタート'] },
    { day: 21, followCount: 25, sources: ['週末: ベストリプターゲットのリプ欄全員'] },
    { day: 22, followCount: 20, sources: ['#カタカナ英語 / #日本人英語あるある'] },
    { day: 23, followCount: 20, sources: ['ネタ系 / #英語パロディ'] },
    { day: 24, followCount: 20, sources: ['元職人 / 元現場 英語勉強組 (相性◎)'] },
    { day: 25, followCount: 20, sources: ['#純ジャパ 英語'] },
    { day: 26, followCount: 20, sources: ['#英会話 オンライン 失敗 から'] },
    { day: 27, followCount: 20, sources: ['Discoveryで見つけた相互フォロー候補'] },
    { day: 28, followCount: 25, sources: ['週末: HERO投稿の反応者'] },
    { day: 29, followCount: 20, sources: ['note 記事に反応した人'] },
    { day: 30, followCount: 20, sources: ['月末: 30日のリプ相手で未フォロー全員'] },
];

export const FOLLOW_PRINCIPLES: { rule: string; why: string }[] = [
    { rule: '1日 30 件以下', why: '凍結ライン 100/日 の 1/3。新規アカは特に厳格' },
    { rule: '1時間 10 件以下', why: '時間あたり凍結ラインは 10。スパム判定回避' },
    { rule: 'フォローしてからリプ (順序)', why: 'フォロー → リプの順だと「ファンが反応した」と認識され好印象' },
    { rule: 'プロフ確認なしフォロー禁止', why: '英語ネタ垢かどうか必ずチェック。商材販売中心は除外' },
    { rule: 'フォロー比率は 1.0 を超えない', why: 'フォロー数 > フォロワー数 の状態は業者扱い。30日後にフォロワー600まで来てなければ整理' },
    { rule: '1週間反応ゼロは整理候補', why: 'Day 30 で振り返って、一度もリプ・いいねもらえなかった層は外す' },
];

// ============================================================
// KPI 目標 (Phase 別)
// ============================================================

export interface KPI {
    phase: PhaseId;
    dailyPosts: string;
    dailyReplies: string;
    selfReplyRate: string;
    weeklyHero: string;
}

export const KPIS: KPI[] = [
    {
        phase: 'foundation',
        dailyPosts: '2 (朝1 + 夜1)',
        dailyReplies: 'コア5へ各1リプ + 自由発掘',
        selfReplyRate: '100%',
        weeklyHero: '木曜21時に1枚',
    },
    {
        phase: 'verify',
        dailyPosts: '2-3',
        dailyReplies: '30-50 / 日',
        selfReplyRate: '100%',
        weeklyHero: '木曜21時 連載化',
    },
    {
        phase: 'compound',
        dailyPosts: '2-3 + スレッド週1',
        dailyReplies: '30-50 / 日',
        selfReplyRate: '100%',
        weeklyHero: '木曜21時 + 動画実験',
    },
    {
        phase: 'extend',
        dailyPosts: '2-3 + 動画/スレッド',
        dailyReplies: '30 / 日 (質重視)',
        selfReplyRate: '100%',
        weeklyHero: '世界観拡張シリーズ',
    },
];

// ============================================================
// KPI 効果測定: 週次スナップショット
// ============================================================

export interface KPIWeeklyTarget {
    week: number;
    dayRange: [number, number];
    followers: { min: number; target: number };
    posts: number;
    replies: number;
    profileVisits: { min: number; target: number };
    note: string;
}

export const KPI_WEEKLY_TARGETS: KPIWeeklyTarget[] = [
    {
        week: 1,
        dayRange: [1, 7],
        followers: { min: 5, target: 30 },
        posts: 14,
        replies: 35,
        profileVisits: { min: 50, target: 200 },
        note: 'Day 1-7: 期待値ゼロ。複利の前準備。',
    },
    {
        week: 2,
        dayRange: [8, 14],
        followers: { min: 30, target: 100 },
        posts: 14,
        replies: 35,
        profileVisits: { min: 200, target: 500 },
        note: 'Day 8-14: 初の3桁いいね投稿が出る確率',
    },
    {
        week: 3,
        dayRange: [15, 21],
        followers: { min: 100, target: 250 },
        posts: 14,
        replies: 35,
        profileVisits: { min: 500, target: 1000 },
        note: 'Day 15-21: 「あ、この人またいる」と認知される',
    },
    {
        week: 4,
        dayRange: [22, 30],
        followers: { min: 250, target: 500 },
        posts: 18,
        replies: 45,
        profileVisits: { min: 1000, target: 2500 },
        note: 'Day 22-30: 複利が効き始める。バズ1本で +1000 もある',
    },
];

export interface MetricPanel {
    name: string;
    where: string;
    when: string;
    why: string;
}

export const METRICS_TO_TRACK: MetricPanel[] = [
    {
        name: 'フォロワー数',
        where: 'プロフィール / X Analytics',
        when: '毎日 22:00',
        why: '一番分かりやすい指標。30日後に 30→500 を目指す',
    },
    {
        name: 'プロフィールアクセス数',
        where: 'X Analytics (要 Premium)',
        when: '週1 (日曜夜)',
        why: 'リプ営業がプロフィールに人を運んでいるか測る最重要指標',
    },
    {
        name: 'インプレッション (上位 5 投稿)',
        where: 'X Analytics → Top posts',
        when: '週1',
        why: '勝ちパターン特定。木曜21時の HERO とその他で比較',
    },
    {
        name: 'リプレスポンス率',
        where: '自分が打ったリプの本人返信数 / 打った数',
        when: '週1',
        why: '20% 超 = ターゲット選定が正しい。10% 以下 = ターゲット見直し',
    },
    {
        name: 'リプから流入したフォロワー数',
        where: '新規フォロワーのプロフ → 共通点を見る',
        when: '週1',
        why: 'どのターゲットアカウントのリプ欄が金鉱か特定',
    },
    {
        name: 'note / toniolab.com クリック数',
        where: 'note ダッシュボード / X Premium Analytics',
        when: '週1',
        why: 'X → 商品棚への導線が機能してるか',
    },
    {
        name: '自分のリプへの返信率',
        where: '通知 → 自分の投稿のリプに返信した数',
        when: '毎日',
        why: '+75 シグナル稼ぎ。100% 死守',
    },
];

// ============================================================
// Helper: 今日が Day N か判定
// ============================================================

export function getDayNumber(today: Date = new Date()): number {
    const launch = new Date(LAUNCH_DATE + 'T00:00:00+09:00');
    const diffMs = today.getTime() - launch.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Day 1 starts at LAUNCH_DATE
}

export function getPhaseForDay(day: number): Phase {
    return PHASES.find(p => day >= p.dayRange[0] && day <= p.dayRange[1]) ?? PHASES[PHASES.length - 1];
}

export function getPostPlanForDay(day: number): DailyPostPlan | undefined {
    return POST_SCHEDULE.find(p => p.day === day);
}

export function getDateForDay(day: number): string {
    const launch = new Date(LAUNCH_DATE + 'T00:00:00+09:00');
    launch.setDate(launch.getDate() + (day - 1));
    return launch.toISOString().slice(0, 10);
}

export function getDayOfWeekJP(date: Date): string {
    return ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
}

export function isThursday(day: number): boolean {
    const date = new Date(getDateForDay(day) + 'T00:00:00+09:00');
    return date.getDay() === 4;
}

/**
 * Day N に対して、リプ営業対象の 5 アカウントを返す (毎日異なる組合せ)。
 * - core 2件 (5件のうち2件をローテーション)
 * - sub 2件 (全件をローテーション)
 * - discovery 1件 (常に末尾)
 *
 * 30日で同じ組合せが2回出ない設計。同じアカウントは 6-10 日に1回回ってくる。
 */
export function getDailyReplyTargets(day: number): ReplyTarget[] {
    const core = REPLY_TARGETS.filter(t => t.priority === 'core');
    const sub = REPLY_TARGETS.filter(t => t.priority === 'sub');
    const discovery = REPLY_TARGETS.find(t => t.priority === 'discovery');

    const result: ReplyTarget[] = [];

    // core: Day N で 2 件 (open offset)
    if (core.length > 0) {
        const cStart = ((day - 1) * 2) % core.length;
        result.push(core[cStart]);
        if (core.length > 1) result.push(core[(cStart + 1) % core.length]);
    }

    // sub: Day N で 2 件
    if (sub.length > 0) {
        const sStart = ((day - 1) * 2) % sub.length;
        result.push(sub[sStart]);
        if (sub.length > 1) result.push(sub[(sStart + 1) % sub.length]);
    }

    // discovery 末尾
    if (discovery) result.push(discovery);

    return result.slice(0, 5);
}

/**
 * Day N のフォロー計画を返す
 */
export function getFollowPlanForDay(day: number): FollowPlanDay | undefined {
    return FOLLOW_PLAN.find(p => p.day === day);
}

/**
 * 累計フォロー数 (Day N までの予定)
 */
export function getCumulativeFollows(day: number): number {
    return FOLLOW_PLAN.filter(p => p.day <= day).reduce((sum, p) => sum + p.followCount, 0);
}

/**
 * Phase ID → 週番号
 */
export function getWeekForDay(day: number): number {
    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;
    return 4;
}

export function getKpiForWeek(week: number): KPIWeeklyTarget | undefined {
    return KPI_WEEKLY_TARGETS.find(k => k.week === week);
}
