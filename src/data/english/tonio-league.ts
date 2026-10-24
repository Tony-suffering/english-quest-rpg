/**
 * とにおリーグ — 「恥とあきらめの英会話」実録スポーツ×RPG。
 *
 * 毎晩のDMMを1試合として採点する。正しさではなく「醜態力(=どれだけ面白く
 * やらかしたか)」で評価する。恥=経験値なので、失点が多い夜ほど評価が高い。
 *
 * データの出どころ(証拠主義):
 *  - ボックススコアの数字は dmm-show.ts / tonio-saga.ts から自動算出。
 *    ボケ数=打席/やらかし、捏造語(図鑑登録)=新語爆誕、着地イディオム=好プレー。
 *  - EXP/レベルは tonio-saga.ts の NIGHT_QUESTS をそのまま使う。
 *  - この番組の実況・採点コメントと、文法選手の勤怠(順位表の素)だけ手で足す。
 *
 * 新しい夜を足す手順:
 *  1) dmm-show.ts に夜を追加  2) tonio-saga.ts の NIGHT_QUESTS に1件
 *  3) このファイルの LEAGUE_COMMENTARY に1件(採点コメント+文法勤怠)
 */

import { showEpisodes } from './dmm-show';
import { SAGA_BESTIARY, SAGA_SKILLS, getQuestByNight } from './tonio-saga';

export const LEAGUE_META = {
    title: 'とにおリーグ',
    tagline: '毎晩25分、恥を経験値に変える男の全戦績',
    season: '2026 シーズン(開幕節)',
    // 読者への「契約」= この物語の追い方
    readerPitch: 'これはスコアブックだ。主人公は上手くならない — 一生。回数もイディオムも積み上がるのに、肝心の英語は毎晩ぶっ壊れる。そのぶっ壊れっぷりこそが売りで、だからこの番組に最終回は無い。あなたは「今夜はどう壊れるか」に賭けながら、永久に続く連載を追う。',
    scoring: '採点は醜態力(S〜D)。正しさではなく「面白い失敗の質」で点をつける。大量失点=大満足。',
};

// 文法選手 — 持病の擬人化。順位表(やらかしランキング)に並ぶ面々。
export interface GrammarPlayer {
    id: string;
    name: string;       // 正式名
    nickname: string;   // 二つ名
    position: string;   // 守備位置(ネタ)
    scouting: string;   // スカウティングレポート(一言)
}

export const GRAMMAR_PLAYERS: GrammarPlayer[] = [
    { id: 'kanA', name: '冠詞の a', nickname: '亡霊の a', position: '前衛(のはず)', scouting: '「You are ___ guy」「It\'s ___ idea」の型で消える。生息地は形容詞+可算名詞の直前だが、目撃例は稀。' },
    { id: 'count', name: '可算 / 不可算', nickname: '数え番長', position: '会計', scouting: '不可算名詞に a を付け、複数形に単数を混ぜる。make a money、a difficult words の常習犯。' },
    { id: 'thirdS', name: '三単現の s', nickname: '消える s', position: '遊撃', scouting: 'everyone / every の後で必ず落ちる。本人は存在を知っているが、口が知らない。' },
    { id: 'beIns', name: 'be動詞の過剰投与', nickname: 'are tend 症', position: '救援(炎上担当)', scouting: '一般動詞の前にとりあえず are を置いて安心する。People are tend to… で再発を繰り返す。' },
    { id: 'prep', name: '前置詞', nickname: '迷子プリポジション', position: '外野', scouting: 'access to / stay away with など、to と with と from の間で迷子になる。たまに正しく帰ってくる。' },
];

type Attend = 'ON' | 'OFF' | 'REST'; // 出勤(正しく機能) / 欠勤(やらかし) / 休養(出番なし)

export interface LeagueCommentary {
    night: number;
    opponent: string;       // その夜の対戦相手(講師)
    headline: string;       // 実況見出し
    rating: 'S' | 'A' | 'B' | 'C' | 'D';
    ratingWord: string;     // 醜態力の評
    announcer: string;      // 実況・採点コメント(俺の声。刃は本人へ)
    mvpPlay: string;        // 今夜の好プレー(英語)
    mvpNote: string;
    worstPlay: string;      // 今夜の戦犯プレー(英語)
    worstNote: string;
    attendance: Record<string, Attend>; // 文法選手の勤怠
}

export const LEAGUE_COMMENTARY: LeagueCommentary[] = [
    {
        night: 1, opponent: 'スペイン在住 英国人講師',
        headline: '5年ぶりの再開、一言目が救急車の実況',
        rating: 'A', ratingWord: '原点。崩れより状況が可笑しい開幕',
        announcer: '5年ぶりに口を開いた開幕戦。記念すべき一言目が、謝罪と救急車のサイレン実況。「自己紹介は要らない」と宣言してから史上最長の自己紹介。コンビニの飯の話が3文で日本の絶滅まで到達した。文法よりも、話題の落下速度で失点している。だが最後、自分の英語が錆びてないことに本人が一番驚いて感謝した。刃が唯一自分に向かなかった夜。',
        mvpPlay: "My English is not that rusty!", mvpNote: '5年ぶりの再会で rusty が自然に出た。錆びてない証拠。',
        worstPlay: 'We might be on the edge of extinction.', worstNote: 'コンビニの飯の話から国家滅亡まで直通便。run by の受動も落ちた。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 2, opponent: 'アイルランド人講師(IELTS専門)',
        headline: '氷水シャワーの布教と、人生への降参',
        rating: 'A', ratingWord: '鉄の規律と全面撤退が同居した夜',
        announcer: '英会話を習いに来て、逆にヴィム・ホフ・メソッドを講師に布教。「冷水が命を救った、軽い意味じゃなく」と真顔。そして5年間毎朝氷水を浴びる鉄の意志が、人生には「降参」していた。冷水は浴びる、野心は浴びない。なお2夜連続で「自己紹介を飛ばしたい」から転び、持ちギャグを確立した。',
        mvpPlay: "TOEIC is nothing to do with actual English skill.", mvpNote: 'IELTS専門家の前でTOEICを一刀両断。nothing to do with が自然に出た。',
        worstPlay: 'One cold shower a day keeps doctors away.', worstNote: 'リンゴを氷水に差し替え、冠詞 a も落とした。布教先も違う。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 3, opponent: '81歳・南アフリカ人講師',
        headline: '開幕戦、聞き役に徹するも足元から失点',
        rating: 'A', ratingWord: '初戦らしい、教科書的な醜態',
        announcer: '判断は満点。81歳の国境話を英検の型を封印して聞きにいった、この姿勢は文句なし。だが口を開くたびに冠詞と三単現がぽろぽろ落ちる。極めつけは brain consuming。脳を消費する形容詞を発明した数分後、本人の口から mentally taxing という正解が出た。持ってるなら最初から出せ。',
        mvpPlay: 'I have no dog in this fight.', mvpNote: '政治の話を華麗に受け流す防御スキル、初戦で発動成功。',
        worstPlay: "It's brain consuming.", worstNote: '新語爆誕。正解 mentally draining を自分で持っていたのに使わなかった、痛恨の見逃し。',
        attendance: { kanA: 'OFF', thirdS: 'OFF', count: 'OFF', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 4, opponent: '常連講師(プレゼン回)',
        headline: '新語3体を場外へ、失点祭りで醜態力S',
        rating: 'S', ratingWord: 'シーズン最多失点、ゆえに最高評価',
        announcer: '自作の英字新聞プレゼン、台本部分は完璧だった。だがアドリブに入った瞬間、money cow / blood sweat tear(単数) / front(外構) の新種が立て続けに場外へ。大量失点=大満足、これぞ醜態力S。なお make a money で冠詞 a が金にだけ出勤した。数えられない金を、1枚だけ数えた。',
        mvpPlay: "I'm making myself the guinea pig.", mvpNote: '自分を実験台にする覚悟の表明。この物語の存在理由=固有スキル獲得。',
        worstPlay: 'It can become a money cow.', worstNote: '正しくは cash cow。乳の代わりに現金を出すはずの家畜を、勝手に品種改良した。',
        attendance: { kanA: 'ON', thirdS: 'REST', count: 'OFF', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 5, opponent: '講師(泥酔参戦回)',
        headline: '酔って出場、それでも文法は素面と大差なし',
        rating: 'B', ratingWord: '渋め。判定が難しいベテランの夜',
        announcer: 'ほろ酔いで受講という暴挙。だが当リーグの記録では、酔っても素面でも文法の出来に有意差なし。つまり素面の文法が既に酔っている。ジム経済学(I was just donating money to the gym.)という自虐の名スキルが酔いながら発動したのは評価。前置詞が1つ迷子になった。',
        mvpPlay: 'I was just donating money to the gym.', mvpNote: '幽霊ジム会員の自虐を一撃で伝える。泥酔状態でも発動できると証明。',
        worstPlay: '(前置詞の迷子)', worstNote: 'to と with の間で軽く彷徨った。大事には至らず。',
        attendance: { kanA: 'OFF', thirdS: 'REST', count: 'REST', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 6, opponent: '講師(猛暑トーク回)',
        headline: 'イディオム10連発の快挙と、捏造語第3弾の悲劇が同じ夜に',
        rating: 'S', ratingWord: '光と闇が同居した、二面性の名勝負',
        announcer: 'この夜は事件だった。前日仕込んだ sweat like a pig を別の講師に自力で再デプロイ、復習ループ完成の快挙。イディオムも連発で好プレー量産。その同じ口が TOLERANCY(寛容になり損ねた最強個体)を場外へ。討伐する代わりに雑誌名にした、飼い慣らしの成功例。冠詞 a は4夜連続欠勤、もはや在籍が怪しい。',
        mvpPlay: 'sweat like a pig / when pigs fly', mvpNote: '仕込んだイディオムを翌日別現場で再発火。復習ループ完成の証。',
        worstPlay: 'TOLERANCY', worstNote: 'tolerance になり損ねた新語。のちに月刊誌の名前へ昇格。',
        attendance: { kanA: 'OFF', thirdS: 'REST', count: 'REST', beIns: 'REST', prep: 'ON' },
    },
    {
        night: 7, opponent: '講師(仕事の愚痴回)',
        headline: '自虐のはずが、経理の話になっていた',
        rating: 'A', ratingWord: '訂正後の再召喚、リーグ初の珍記録',
        announcer: 'self-deprecating(自虐)と言いたくて self-depreciating(自己資産の帳簿価額を毎年下げる)を召喚。経理モンスター爆誕。特筆すべきは、一度訂正した後にもう一度同じ個体を呼び戻したこと。当リーグ初の「訂正後の再召喚」記録。be動詞も一般動詞の前に無断出勤しかけた。',
        mvpPlay: 'test busting / wallow in sadness', mvpNote: '回収した表現は上等。骨格が事故っても内臓は健康。',
        worstPlay: 'self-depreciating', worstNote: '自虐が減価償却に化けた。しかも訂正後に再発。',
        attendance: { kanA: 'OFF', thirdS: 'REST', count: 'OFF', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 8, opponent: '常連英国人講師(在ベトナム)',
        headline: '冠詞a、5夜連続欠勤の末についに出勤(2打席連続)',
        rating: 'A', ratingWord: '醜態は控えめ、だが物語点が満塁弾',
        announcer: '事件。5夜連続欠勤していた冠詞 a が、固定砲台「I\'m not ___ guy」でついに初出勤、しかも2打席連続。本日の勤怠は史上初の勝ち越し(3勝2敗)。成長回だ。ただし同じ夜に a difficult words / AI-made newspaper で通常運転の欠勤もあり、信用回復は執行猶予付き。見立て問答・全面開示という上級スキルも2つ獲得。物語点で満塁ホームラン。',
        mvpPlay: 'What do you make of this?', mvpNote: '資料を見せた直後に相手の解釈を引き出す5語。議論の扉を開けた。',
        worstPlay: 'a difficult words', worstNote: '出勤したそばから、別現場で複数形に a を付けて自滅。数え番長が顔を出した。',
        attendance: { kanA: 'ON', thirdS: 'REST', count: 'OFF', beIns: 'REST', prep: 'ON' },
    },
    {
        night: 9, opponent: 'カナダ人講師',
        headline: '姉に部屋を追われ、公園で詐欺を再審する',
        rating: 'A', ratingWord: '汗と亡命と、一人三審制の夜',
        announcer: 'オフィスを姉に明け渡して公園に亡命、スマホを耳に当てて滝汗で開幕。第6夜の "sweating like a pig" が3夜ぶりに帰還した。駅の詐欺事件を「騙されてない→騙されたかも→やっぱり騙されてない」と一人で三審制を回し、決め手は相手の「ヘタクソな日本語ノート」。自分に無罪判決を出した。だが最後、汗だくのままゴッホ論を英語で立てきったのは本物。刃を自分に向ける前に、ちゃんと死んだ画家に向き合った夜。Lv6に昇格。',
        mvpPlay: 'His consciousness is still there in the picture.', mvpNote: 'ゴッホがまだ愛される理由を英語で言い切った。今シーズン屈指の中身。',
        worstPlay: "It's like Elon Musk's Cybertruck.", worstNote: '北斎美術館をサイバートラック呼ばわり。喩えは的確、敬意は不在。だが講師には一発で通じた。',
        attendance: { kanA: 'REST', thirdS: 'REST', count: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 10, opponent: '帰国子女講師(香港育ち)',
        headline: '紹介するものは無い男が、講師の半生を尋問する',
        rating: 'B', ratingWord: '崩れは控えめ、逆取材の芸で持たせた夜',
        announcer: '再開3日目、話し相手はまだ3人という孤独スタッツで開幕。「紹介するものはない」から始まる最長のモノローグ(仕事・野球・聞くだけ)で持ちギャグを再演。だが本編は逆インタビュー。講師の6歳から18歳までを "describe meticulously" と要求し、中国語が話せないと知るや即「バブル」と断定。自分の話は割愛、他人の半生は逐語。取材の目は確かで、母語を失う条件まで英語で言い当てた。',
        mvpPlay: 'At home you had to speak Japanese -- that\'s what saved it.', mvpNote: '帰国子女が母語を保てる条件を英語で言い当てた。逆取材の中の本質。',
        worstPlay: 'Can you describe meticulously?', worstNote: '自己紹介は拒んだのに、他人の半生は分単位で要求。describe meticulously が硬い。',
        attendance: { kanA: 'REST', thirdS: 'REST', count: 'OFF', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 11, opponent: 'スペイン在住 英国人講師',
        headline: '男根神輿を、論文の語彙で説明する',
        rating: 'S', ratingWord: '下ネタに最上級の語彙を投入した歴史的失点',
        announcer: 'スペインの焚き火跳びに日本の裸祭りで対抗した瞬間、なぜか語彙のギアが最上段に入った。巨大男根神輿を「人間男性部位の表象の模倣」と説明し、obscene だけ完璧に発音する。英検1級の単語帳が、最も使ってほしくない場面で起動した夜。中盤は9:30の予約変更の経緯を3分かけて説明し(要約1文)、終盤は自分が建てたマンションの規模で溺れた末、写真を1枚出して全部解決。本人が「3分みじめに喋ったのに写真1枚が全部説明してる」と自分で実況した。説明力、写真に完敗。',
        mvpPlay: "It's a meme from a thousand years ago.", mvpNote: '英国の丘の巨人地上絵を一撃で定義。語彙が崩れ続けた夜に、比喩だけが満点。',
        worstPlay: 'a mimic of the representation of human male part', worstNote: '下ネタを博物館の解説パネルにした。penis-shaped shrine の6語で済む話。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 12, opponent: 'スペイン在住 英国人講師(試合2週間前)',
        headline: '腹の出た男が、ジョー・ローガン出演を宣言する',
        rating: 'S', ratingWord: '自己申告と実体の落差が過去最大',
        announcer: '183cm・73kg・2週間後に試合を控えた講師に対し、開幕一発目が体重増加の三重申告。「シャツを脱いで見せろ、あんたにはその権利がある」と脱衣を権利として保証し、断られる前に自分の腹の話へ逃げた。ダッドボディを自白した3分後、世界最大のポッドキャストに日本人初のゲストとして出ると宣言。腹と野望の落差がシーズン最大を記録した。だが中盤、崩れた英語のまま「本気なら伝わる、いい意味で伝染する」と崩れた英語の価値を弁護したのは本物。Lv7に昇格。',
        mvpPlay: "It's very infectious in a good way.", mvpNote: '本気は伝染する、を自分で言い直して精度を上げた。この番組の思想そのもの。',
        worstPlay: "I'm not talk action.", worstNote: '口だけじゃないと言いたくて、口が失敗した。I\'m not all talk。all の1語が命。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 13, opponent: '英国人講師エディ(フィリピン在住9年)',
        headline: 'その店は、コンビニではない',
        rating: 'A', ratingWord: '善意で人の夢に定義のダメ出しをした夜',
        announcer: '回線が2度切れて録音が2本に割れ、最後は通話ごと落ちて終わる番組史上初の強制終了。初対面の講師が人生を賭けて語った「たまり場」構想に対し、第一声が業態分類の訂正だった。さらに英国人本人に「DMMの英国人講師、誰も母国に住んでない。全員脱出してる」と統計で殴る。悪気はゼロ、だからタチが悪い。終盤は飲酒黒歴史を自白して「もう卒業した」と宣言し、動機を「英語は俺にとって音楽だ、上達しに来てるんじゃない」と言い切った。そして回線が切れた。',
        mvpPlay: "English is like music to me. I'm not here to improve my English.", mvpNote: '毎晩恥をかき続ける理由を、本人が最も静かな言葉で定義した。',
        worstPlay: 'The accent sometimes entrance the barrier.', worstNote: '障壁を会場に案内した。entrance を動詞に転用して図鑑が1体増えた。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 14, opponent: '英国出身 講師(AOT視聴済み)',
        headline: '俺はジャンだ、と男は言った',
        rating: 'A', ratingWord: '崩れは控えめ、自己同定の芸で決めた夜',
        announcer: 'ついにオフィスから受信 — と思いきやWi-Fiが落ちていて結局モバイルデータ、カメラも切る。屋根の下でも画面は真っ黒。前半は「何も起きない日が一番いい」の安定志向宣言から、才能と幸福に相関は無いという鋭いマスク論へ。だが比喩班が事故り、飛んで火に入る夏の虫が「火に引き寄せられる昆虫」に格下げされた。後半、講師がアニメ視聴済みと判明して空気が変わる。自分を「浅いファン」と3回念押しした男が、進撃の巨人をシェイクスピア級と評し、最後に主人公でも人気キャラでもない凡庸な脇役の名を挙げて自分を重ねた。',
        mvpPlay: "So I'm a Jean.", mvpNote: '固有名詞に a を付けて「ジャン的な人間」を作った。自己申告として英語的にも人間的にも正確。',
        worstPlay: 'everybody is like insects attracted to the fire', worstNote: '蛾(moth)が出てこず昆虫に逃げた。火に飛び込む生物の範囲が甲虫まで広がった。',
        attendance: { kanA: 'ON', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 15, opponent: '英国出身 講師(2夜連続)',
        headline: '調査兵団が、調査死体団になっていた',
        rating: 'S', ratingWord: '自作原稿を自分で読めない、構造的醜態',
        announcer: '前夜の約束を開幕7秒で回収し、挨拶を全廃して音読に突入。だが読む直前に「実はまだ読んでない」と告白する。以後25分、自分が作った新聞に出てくる単語の意味を先生に質問しながら進行した。ramparts とは何か。そして自分で命名した The Survey Corps Dispatch を、ずっと「調査死体通信」と読んでいたことが判明する。進撃の巨人の号外としては外していないのが恐ろしい。終盤は二重否定で「言うことが無い」が「無いわけではない」に反転しつつ、自分の英語の問題が語彙でも文法でもなく運び方だと言い当てた。Lv8に昇格。',
        mvpPlay: "It's all depends on how to convey the message. That's a matter of conveying.", mvpNote: 'be が余分に湧いた崩れた文で、自分の英語の全体像を正確に射抜いた自己診断。',
        worstPlay: 'this is pronounced corps, not corpse', worstNote: '命名から音読までの全工程で一度も辞書を引いていない証拠。1文字で兵団が死体になる。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 16, opponent: '南アフリカ人講師(庭のツタを刈った朝)',
        headline: '意識の定義を求められた先生が、Oh boy と言った',
        rating: 'A', ratingWord: '持病総出、だが到達点はシーズン最高地点',
        announcer: 'Wi-Fi障害3夜目、屋根の下で3夜連続のカメラOFF。猛暑の報告で脱線系イディオムを3連射し、気候の話をしながら自分の比喩が脱線するという実演を見せた。教材ではAIの金融アドバイスを扱い、2度「反論させてくれ」と断ってから議論を組む型が完成。だが終盤、話がAIの意識に流れた瞬間に持病が総出になる — 存在文が崩れ、形容詞の前に a が湧いた。それでも男は先生に意識の定義を逆質問して Oh boy. と言わせ、脳が意識を作るのではなく意識が先だという反転を英語で立てきった。造語ミクセイションを召喚して図鑑は8体に。',
        mvpPlay: 'Consciousness is like a screen in which everything happens.', mvpNote: '関係代名詞まで正しく組んで哲学の最深部に着地。猛暑の愚痴から25分での到達点。',
        worstPlay: "It's no consciousness. But it's like a empty inside.", worstNote: '存在文の崩壊(#9)と冠詞の誤出勤(#14)が1文に同居した。空っぽなのは中身であって語彙ではない。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 17, opponent: '南アフリカ人講師(ケープタウン)',
        headline: '聞き役に回ると宣言した男が、そのまま25分喋る',
        rating: 'S', ratingWord: '宣言と実行が正面から衝突した夜',
        announcer: '開幕から grindstone を分解して砥石で何かを研ぎはじめた。前夜に当たった81歳の講師を引き合いに「講師の本業は教えることじゃなく聞くことだ」と持論を立て、その流れで「今日は聞き役に回りたい、俺はいい聞き手だ、信じられないかもしれないが」と宣言する。予防線は正しかった。以後25分、最長ターンを連発して自分の学習システムを全開示し、DMMとNative Campを比較し、独立契約者の身分を論じ、最後に「毎回喋りすぎてすみません」と謝った。極めつけは先生への添削辞退 — 録音をAIに食わせて虐殺させているので、ここで欲しいのは生のサンプルだけだと説明した。先生は教師ではなく検体採取の立会人にされた。',
        mvpPlay: 'The main job is to listen to students, no matter how broken they are.', mvpNote: '講師の本業を生徒の側から再定義した。この番組の思想を先生に説明した一文。',
        worstPlay: 'You are not belonging to DMM company.', worstNote: 'belong は状態動詞なので進行形にならない。2回連続で所属が現在進行形になった。',
        attendance: { kanA: 'REST', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 18, opponent: 'スペイン在住 英国人講師',
        headline: 'メキシコの観客が、なぜか全員日本を応援していた',
        rating: 'A', ratingWord: '統計の精度と根拠が真逆に振れた夜',
        announcer: '「結果はどうでもいい」と前置きしてスコアを正確に報告する、どうでもよくない開幕。メキシコのスタジアムで「ほぼ99%」が日本を応援していたと証言し、根拠を問われる前に「理由は分からない、調べていい、嘘じゃない」と自己弁護に入った。統計を出した本人が出所を知らない。中盤は声の話から、なぜか歌唱力の自己申告に移行。後半は「準備は一切しない、日常会話に台本は無い」と哲学を語った直後に、AIに作らせた要約を取り出して音読した。台本は無いと言った人が台本を持ってきている。だが締めのアンダードッグ論だけは短いSVOの連射で組まれ、処方箋どおりの英語になった。Lv9に昇格。',
        mvpPlay: "He may never beat him, but that's the underdog thing -- everybody roots for the underdog.", mvpNote: '勝てない・それでも挑む・だから惹かれる。事実を3つ並べただけで成立した、この夜唯一の完全体。',
        worstPlay: 'Almost 99% of Mexicans rooting for Japan.', worstNote: '「ほぼ99%」で精度を主張しつつ放棄した。be も落ちている。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'OFF', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 19, opponent: '英国人講師',
        headline: '台風に番号、ハリケーンに人名',
        rating: 'A', ratingWord: '告発が3分で自白に変わった夜',
        announcer: '台風とハリケーンは同じ現象で呼び名が変わるだけ、という正解に冒頭3分で到達し「it\'s just labels」と締める好スタート。だが英検1級の受験宣言では、同じ文の後半で「まだ申し込んでない」と自分から漏らし、決意表明のあらゆる部品が緩んだ。ハイライトは環境破壊の議論 — プライベートジェットを持つ1%を糾弾していた男が、喋っている最中に自分もトップ10%側だと気づいてしまう。告発が自白に変わる瞬間が録音に残った。終盤は資本主義を否定し、アイン・ランドを名前だけ知っていると白状し、宇宙ファーストを掲げ、最後に財産をあの世へ「行きながら」持っていけないと結論した。',
        mvpPlay: "Not family first or country first, it's universe first.", mvpNote: '「○○ファースト」の論法を使って一番外側まで飛ばした。all-encompassing も正しい位置に置けている。',
        worstPlay: "You can't take it with as you go.", worstNote: 'with you で完結する定型に as you go が割り込み、移動中の制約になった。歩きながら財布は持てる。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 20, opponent: 'マルコム講師(NZ出身・トルコ在住/初対戦)',
        headline: 'この業界はクソだ、と現役が言った',
        rating: 'A', ratingWord: '仕事の話は大人、自己規定になると全部崩れる夜',
        announcer: '初対面の相手に自分を「ブルーカラーの労働者たち」と複数形で名乗る開幕。内装仕上げの説明は正確で、客の目に触れる部分を全部やるから完璧を求められる、という商売の勘所まで英語で運べている。だが若者が来ない理由を語る流れで、自分の家業が属する業界を「クソだ」と断言した。しかも I have to admit と前置きしてから言うので逃げ場が無い。英語学習の方針を語れば deploy と ship で語彙が物流になり、信仰を語れば神が「髭という白人」になり、自分を a non-believers と単複同時に名乗る。仕事の話だけが大人だった。',
        mvpPlay: 'Every responsibility boils down to me at the end of the day.', mvpNote: '上に立たず責任だけ引き受ける立場を、動名詞4連発の末に一言で落とした。',
        worstPlay: 'this industry is sucks', worstNote: 'be動詞と一般動詞が同じ椅子を奪い合った。業界も文法も同時に崩れた一文。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 21, opponent: '南アフリカ人講師(81歳・西ケープ)',
        headline: 'AIに書かせた南アフリカ論を、南アフリカ人に読み聞かせる',
        rating: 'S', ratingWord: '構成は完勝、立場だけが完全に反転した夜',
        announcer: '前回教わった南アフリカ情勢をAIと全部裏取りし、A4数枚のドシエにして持参。6月30日の退去期限と死者4人、11月4日が州選挙ではなく地方選であること、ベルリン会議の想像上の国境まで25分かけて音読した。相手はそれを70年以上生きてきた当事者である。極めつけは音読前の一言 — 81歳の元英語教師に「メモを取っていいですよ」と許可を出した。読み終えた後は「AIはいい仕事をした、でも発注したのは俺だから手柄は半分もらう」と共著者を名乗る。先生の評価は a marvelous overview。そしてAIの誤りを1箇所、当の81歳に訂正された。Lv10に昇格。',
        mvpPlay: 'At the time. Time required. Not he\'s a perfect guy.', mvpNote: 'マンデラ評への相槌。断片3つを並べただけで意味が一発で届いた、渋滞持ちの男の理想形。',
        worstPlay: "who's taken your this picture? Because you are there. Why?", worstNote: '所有格と指示語が席を奪い合い、最後の Why? で世間話がアリバイ確認になった。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 22, opponent: '英国人講師(マルタ在住)',
        headline: '壊れた英語のほうが、通じる',
        rating: 'A', ratingWord: '持病総出、だが番組の存在理由に到達した夜',
        announcer: '疲労を申告するのに wrap my head around という難度の高いイディオムを使う、回らないと言いながら回っている開幕。日本の労働文化を「自ら進んで奴隷になる人々」と丁寧に描写し、彼らは幸せだと保証してから、最後の6語で自分だけ逃げた。後半はAIの意識論。形容詞に a が付いて「一つの意識的」という単位が生まれ、made of と made by の取り違えで水道業者がAIを製造した。共感を語れば人間が共感そのものに変身する。持病は総出だった。それでも終盤、なぜ翻訳AIがあるのに英語を学ぶのかという問いに、この番組の存在理由そのものを答えている。',
        mvpPlay: 'This broken English actually works.', mvpNote: '完璧さではなく不完全なまま踏み込むことが人を動かす、を壊れた英語で証明した。全22夜で最も本質に近い一文。',
        worstPlay: "as long as they're made by water or pipes or rocks", worstNote: 'of と by の取り違えで、水とパイプと岩が人工知能を製造した。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 23, opponent: 'NZ出身・トルコ在住 講師(2回目)',
        headline: '東京の人口で、ニュージーランドを殴る',
        rating: 'A', ratingWord: 'マウントと聞き上手が10分で入れ替わった夜',
        announcer: '音読の許可を「そうすればあなたも内容が分かるので」という理由で求める、親切が逆走した開幕。相手はニュージーランド人で記事は英語である。浅草・来々軒の記事から一品特化店の生存論に広げ、日本人は店に着く前に食べる物の合意が完了していると民族論をぶち上げ、そこで相手の母国の総人口を持ち出した。上品に new-fangled と言った直後に what the f*** が飛び出し、語彙のレジスターが1文で天国と地獄を往復。焼肉ではレバーに手を伸ばし、誰も批判していない段階で弁明まで添えた。だが後半は完全に聞き役へ転身し、トルコ史を丸ごと引き出している。',
        mvpPlay: "It's a connecting place where you meet Western culture and Eastern culture. It's a crossroad.", mvpNote: 'トルコを関係副詞で正しく定義し、crossroad で言い直して着地させた。',
        worstPlay: 'The consentment is already done.', worstNote: '合意に -ment が生えて、外食の話が条約の批准手続きになった。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 24, opponent: '南アフリカ人講師(81歳・西ケープ)',
        headline: '81歳に、10問の尋問を浴びせる',
        rating: 'A', ratingWord: '一方通行の向きだけが変わった夜',
        announcer: '前回25分ひたすら朗読してやり取りが無かった反省から、役割を反転させる企画を持参。ただし中身は「今度は俺が10問質問する」で、一方通行の向きが変わっただけである。質問はAIと作ったのに「著者は俺だ」と主張し、自分でジョークだと注釈を入れ、それでも引き下がらず「監督だ」と昇格した。インタビュー前には録音することを3回、受動態まで使って告知し、同意確認が事情聴取の読み上げになった。だが10問は地方選から1994年の国境開放、コイサンの痕跡、インビクタスの真実まで全部当事者に直撃しており、企画としては完勝。Lv11に昇格。',
        mvpPlay: 'One damn thing after another. So every country, not only your country.', mvpNote: '前日覚えた ODTAA を、南アの惨状を聞いた直後という最も効く場所で撃った。',
        worstPlay: "I'm also interesting.", worstNote: 'interested と言うつもりが、自分の面白さの主張になった。',
        attendance: { kanA: 'REST', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 25, opponent: '英国人講師(ヨハネスブルグ在住)',
        headline: '政治には、犬を飼っていない',
        rating: 'A', ratingWord: '無関心を自称する男が、最も長く政治を語った夜',
        announcer: '第3夜で習得した必殺技「無関係の構え」を再デプロイしたが have が脱落し、飼っていない犬が複数になった。無関心を表明する文で最も熱心に喋るのがこの男である。日本初の女性首相を正しく紹介した2秒後に guy と呼び、性別と冠詞を同時に消した。夜勤の説明では存在文が崩れて店が複数営業を始め、自分の立ち位置は under と at the bottom が重なって地下深くへ潜り、最後は力尽きて「床」だけが3回残った。それでも憲法9条の矛盾を3文で説明し、平和側も過激になると自陣にも刃を向けている。無知で無関心を自称する人間の、この夜いちばん公平な発言。',
        mvpPlay: "Article 9 says we'll never have a military. But ironically we do have one. Polarization sucks.", mvpNote: '自国の憲法の矛盾を外国人に3文で説明し、自陣にも刃を向けた。',
        worstPlay: "I don't even any dogs in Japanese politics.", worstNote: 'have が消えて比喩が畜産に近づき、飼っていない犬が複数になった。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 26, opponent: '常連講師(W杯2夜目)',
        headline: '勝敗より、友達の機嫌',
        rating: 'A', ratingWord: '関心が最後まで自分と自国に向かなかった夜',
        announcer: '自国代表への無関心を apathy という名詞まで添えて宣言し、応援する理由が「友達に機嫌よくいてほしいから」。愛国心でも競技愛でもなく、友人関係の維持のために国旗を振っている。サッカーの監督評では yelling が earring に化け、監督が試合中ずっとイヤリングを着けていることになった。しかも直後に「効果は無い、ただの演出だ」と続くので、装身具が戦術的に無意味だと批判されている。ロナウドは hindrance(障害物)呼ばわり。なおこの評を下す本人の腹は、第12夜で成長中と申告済みである。そして4-0で勝った試合の感想が、敵チームへの同情だった。',
        mvpPlay: 'I was very sad for Tunisia.', mvpNote: '5語。自国が勝った試合を語りながら、感情の向き先が最後まで敵だった。',
        worstPlay: 'in soccer the coaches are just earring', worstNote: '絶叫が装身具になった。図鑑にイヤリングが登録された夜。',
        attendance: { kanA: 'REST', count: 'OFF', thirdS: 'OFF', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 27, opponent: 'ガム講師(英国南部出身・ブルガリア在住・元builder/初対戦)',
        headline: '諺の後半を削って、褒め言葉にする',
        rating: 'B', ratingWord: '崩れは冠詞に集中、褒め方の芸で持たせた夜',
        announcer: '初対面。app application と、略語とその正式名称を並べて省略の意味を消す開幕。相手の経歴が想像を超えていた — 元建築業者でF1に自分で出走し、車で家まで運転して帰り、猫60匹と犬5匹を飼っている。男はこの人物を jack of all trades で褒めたが、直後に「いつも新しい単語を使うようにしてる」と自分で種明かしをして褒め言葉を練習だと自白し、さらに master of none の部分が失礼だと気づいてその場で削除した。諺の校閲を目の前でやる褒め方。なおF1経験者に対して、聞かれてもいないミニバンの車種を実名で申告している。',
        mvpPlay: "I don't want this to be a one-off. With some trust, we can go straight into the topic.", mvpNote: '指名受講する理由を、人懐こさではなく時間の節約という実利で説明した。',
        worstPlay: 'so that we know the our personality', worstNote: '定冠詞と所有格が同席し、二人で一つの人格を共有しはじめた。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 28, opponent: 'スペイン人講師',
        headline: '先生を、ネイティブ認証の判子にする',
        rating: 'S', ratingWord: '授業が無償のプロダクト監修に変わった夜',
        announcer: '開幕で「英語を上達させに来てるんじゃない、このアプリで一儲けしたい」と受講目的を否定。make a buck out of 〜 は正確に撃っているので、目的だけが授業と無関係で英語だけが上達している。制作の労苦を語る場面では血と汗と涙を注いだと言いかけ、2秒後に「汗じゃない、AIがやった」と自分で撤回し、最後の砦「でも発注したのは俺だ」に後退した。終盤、講師を品質認証機関として起用し、まだ書いていない販促文句「AI生成だがネイティブ承認済み」を先に読み上げ、同意を取らないまま「我々は一蓮托生だ、成功したら報酬がある」と連帯を宣言。25分の授業が未上場スタートアップの初期ミーティングになった。Lv12に昇格。',
        mvpPlay: "I have to be my own first customer. I'm pretty happy making myself a guinea pig.", mvpNote: '売り込みの夜に最も誠実な一文。第4夜のスキル「モルモット宣言」の再デプロイでもある。',
        worstPlay: 'I can get your authentication, you\'re a native speaker.', worstNote: 'authentication はシステムのログイン認証。先生がパスワード確認をする役になった。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'OFF', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 29, opponent: 'デール講師(南アフリカ)',
        headline: '沈黙こそ全ての土台だ、と25分かけて喋る',
        rating: 'A', ratingWord: '主張と実演が正面から矛盾した夜',
        announcer: '「黙れ、そんなに喋らなくていい」を、金を払って喋りに来た英会話レッスンの真ん中で熱弁した。しかもこの夜、この男はほぼ止まっていない。沈黙が全ての土台だという主張の説得力を、話者本人が毎秒削り続けている。中盤ではエックハルト・トールが有名になった経緯を語ろうとして skyrocketed / was / became が同じ椅子に殺到。終盤、AIに「一切容赦するな」と命じている理由を目の前の人間の講師に説明し、その理由が「人間の先生は妥協して生徒を褒めなければならないから」だった。あなたの褒め言葉は職務上の建前だ、と本人に向かって言っている。悪気は完全にゼロ。',
        mvpPlay: 'I think the silence matters. Still waters run deep.', mvpNote: '25分喋り倒した男が、諺一つで沈黙を弁護しきった。文脈への当てはまりが完璧。',
        worstPlay: 'that skyrocketed his name was became famous', worstNote: '動詞と助動詞が3つ同時に立ち上がり、2つの文が接続されないまま融合した。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 30, opponent: '南アフリカ人講師(220区画のフリマ運営者)',
        headline: 'ナショナリズムとは、会わない人を気にかけること',
        rating: 'A', ratingWord: '日曜の憂鬱から人類の進化段階まで登った夜',
        announcer: '理由の無い落ち込みを3段階(off → not good → depressed)で申告し、翌日への恐怖まで先出しする日曜夜の開幕。だが直後に「月曜が憂鬱を表す英語はあるか」と講師に尋ねており、愚痴を語彙収集に変える動きだけはいつも通り速い。実存の考察を積み上げた末に締めが YOLO で、哲学が5秒でパーティー用語に着地した。日本の治安を語る場面では homeless に複数形の s が3回生え、さらに安全の根拠が「監視されているから」になり、福祉の説明が行政の把握状況の報告に変わった。それでも終盤、ハラリ由来のナショナリズム再定義から人類の進化段階まで一直線に登りきっている。',
        mvpPlay: "Nationalism really means caring about people you'll never meet.", mvpNote: '関係詞を省略した口語として完璧。移民排斥の話をここまで運んだ構成力が本体。',
        worstPlay: "you've been experienced the worst government", worstNote: '受動態にしたせいで、先生が30年間ずっと政権に味わわれる側になった。',
        attendance: { kanA: 'REST', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 31, opponent: '南アフリカ人講師',
        headline: '蚊は、俺から逃げていく',
        rating: 'B', ratingWord: '短く喋る宣言が、長い一文で始まった夜',
        announcer: '「今日は短く簡潔に喋る」と宣言したが than が落ちて比較が宙に浮き、宣言そのものが長くなった。succinct という難語で簡潔さを宣言しているのもこの番組らしい。中盤、アフリカで最も危険な動物の教材を進めながら、なぜか自分が蚊に刺されない体質であることの証明が始まる。蚊が escape(逃走)したので、高校のグラウンドで人間から必死に逃げる蚊の群れが発生した。追われているのは蚊である。カバの話では、ワニに食われることについては「分かります」と全面的な納得を示し、捕食は理解できるが縄張り防衛は理解できないという選り好みの激しい死生観を披露。締めは南アの水道問題への返しに、日本のカラーコーンの物量を提出した。',
        mvpPlay: "Most Japanese can't access this reality. They don't realize how blessed they are.", mvpNote: '語学の価値を情報アクセスと自国の相対化の2点に絞った。access を他動詞で正しく使えている。',
        worstPlay: 'they escaped from me. Maybe my blood is bitter.', worstNote: '蚊が逃走し、そのうえで血の味を自己分析し、最後に害虫へ謝意を表明した。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 32, opponent: '南アフリカ在住コンサル講師(DMM歴長)',
        headline: 'ネイティブ・アメリカン・スピーカー',
        rating: 'A', ratingWord: '議論は最高到達点、代名詞だけが総崩れした夜',
        announcer: '曜日を月曜から金曜まで一気に走らせる開幕。ただし Monday is dreading で、月曜が何かを恐れている側になった。前半は逆インタビューが冴え、コネゼロの国で人脈を作って独立するまでの話を丁寧に引き出している。だがバイリンガル論に入った途端、知人が native English speaker から Native American speaker に化けて、日英の話に3言語目が発生した。さらに一人の女性が1文のあいだに3回性別を変え、本人が sorry と謝る事態に。極めつけはTOEIC評 — 「ほぼゲームだ」と切り捨て仕組みまで解説した数分後に、来月受験すると申告している。',
        mvpPlay: "You have one life. So there's no such thing as a perfect bilingual, I guess.", mvpNote: '漢字への投入時間を根拠に、時間の総量へ還元してから結論した。第30夜の YOLO の知的な置き直し。',
        worstPlay: "he's Native American speaker", worstNote: '語順に American が割り込み、知人がアメリカ先住民の言語の話者になった。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'OFF', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 33, opponent: 'チャーリー講師(英国出身・南アフリカ在住)',
        headline: '外で食べるから、プラごみが増える',
        rating: 'B', ratingWord: '議論は真っ当、応答の縮尺だけが狂った夜',
        announcer: 'along for the ride(付き合いで乗ってるだけ)が完璧に決まる開幕。海洋プラスチックの議論では「川を止めても根は残る、製造企業まで遡れ」と論を立て、構成は真っ当そのもの。だが日本の事情を説明する段で eat out が eat outside になり、国民全員がピクニックを始めた。しかも地球規模の議題への応答が、自分のオフィスからコンビニまでの所要秒数と半径1kmの店舗密度だった。radius まで持ち出して計測している。マスク論では一人の人々(One people)が誕生。締めは金曜の別れ際に、自分は週末を楽しむと宣言してから相手に労働を3回言い渡した。',
        mvpPlay: "Japan is huge volume-wise, but it doesn't go to the ocean.", mvpNote: '生産量と流出量を切り分けた。-wise で造語を作る癖が、ここでは実在の用法に着地している。',
        worstPlay: 'we are so used to eating outside', worstNote: '外食が屋外食になり、日本人が全員コンビニで買って外で食べる国民になった。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 34, opponent: 'チャーリー講師(英国出身・南アフリカ在住/3回目)',
        headline: '魂のない、完璧な仮面',
        rating: 'A', ratingWord: '無実の主張が、犯行手順の直後に置かれた夜',
        announcer: '前回の先生の発言を丸ごと引用してから「盗みます」と宣言する開幕。相手の言葉を採取して持ち帰る作業を、本人の目の前で申告している。中盤、検閲のないローカルAIの作り方を動機から手順から実現後の状態まで説明しきり、そのうえで「でも俺は違法なことはしません」と付け足した。誰も疑っていない段階で、自分から供述して自分から否認している。信条を語る場面では comparison is the thief of joy が the thief of time に化け、比較の実害が精神から工数に変わった。experiment も experience に化けて、実験者が体験者に降格している。',
        mvpPlay: "I can build my own English avatar the way I want.", mvpNote: '母語では変えられない自分を第二言語なら設計できる、という気づき。第22夜と並ぶ思想の柱。',
        worstPlay: 'comparison is the thief of time', worstNote: 'joy が time に化けて、他人と比べると時間が減るという新しい実害が発生した。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 35, opponent: '常連講師(アプリ企画回)',
        headline: '我々は、物理的な動物である',
        rating: 'B', ratingWord: '動機の告白が、授業の存在意義を揺らした夜',
        announcer: '東京の描写(みんな自分の頭の中に囚われて速く歩いている)が正確に決まる開幕。だが手書きアプリの企画を語る流れで「我々は一匹の物理的な動物だ」と人類を単数に統合し、しかも直前で「人は物に触りたがる」と言っているので、その一匹が何かに触りたがる絵になった。ハイライトは動機の告白 — 英会話レッスンの真ん中で「上達には興味が無い、金のためだ」と講師に告げている。良い話者になる気が無いことを、良い話者になるための授業料を払って言っているので、発言そのものが自己反証になった。締めは日本人を謝罪の専門家として紹介。',
        mvpPlay: "It's still raw, human-to-human conversation. Real material, not textbook English.", mvpNote: '教材選びの基準を難度でも速度でもなく「生であるか」で説明した。条件と留保の付け方が上手い。',
        worstPlay: 'we are physical animal', worstNote: '人類全体が一匹の物理的な動物に統合された。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 36, opponent: 'スペイン在住 英国人講師',
        headline: '先生のふりをしないでくれ、気持ち悪いから',
        rating: 'A', ratingWord: '要求は真っ当、要求文だけが渋滞した夜',
        announcer: '第3夜の必殺技に literally を足したせいで、比喩ではなく本当に犬を飼っていないという事実の申告になる開幕。中盤、男は講師の教え方を評価しはじめ、ついに要求を出す — 常に笑顔で褒める典型的な良い先生を演じるな、気持ち悪いから、と。要求の中身は真っ当なのに、a と your が同じ名詞の前で席を奪い合って文が渋滞した。さらに次回の授業スタイルとして飲酒を提案し、しかも「両側とも」と自分の分まで含めている。金を払って受けるレッスンを宅飲みに設計変更しようとした。ローガン評では「彼の良いインタビュアー」という所有物が発生している。',
        mvpPlay: "You be true to yourself, but you have a high grading. You're not kissing up to students.", mvpNote: '本音と高評価の両立という稀さを、kiss up to 一語で言い当てた。相手が最も言われたいことを突いている。',
        worstPlay: "Don't pretend to be a your teacher", worstNote: '冠詞と所有格が同席し、真っ当な要求が2つの限定詞で渋滞した。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 37, opponent: 'リンダ講師(ケープタウン)',
        headline: '低評価の先生を、わざと選ぶ',
        rating: 'A', ratingWord: '擁護のつもりが、選定基準の開示になった夜',
        announcer: '回線が4分切れた直後の第一声が講師への擁護、しかも業界全体の構造問題としての位置づけ。だがその流れで「低評価の講師をわざと選ぶ、どれだけひどいか見るため」と動機を明かし、擁護が選定基準の開示に変わった。相手はまさにその日回線が落ちている。続いて記録システムを開示し、目の前の人物を「たぶん31番目」と通し番号で呼んだ。maybe が付いているので番号の正確さにも自信が無い。締めの継続の誓いは unless に否定を重ねたせいで、相手がやめたら自分もやめるという共倒れ協定になった。Lv15に昇格。',
        mvpPlay: "If Japan had won, you'd be the student learning Japanese and I'd be the teacher.", mvpNote: '仮定法過去完了を出口の would まで完全着地。第11夜と第17夜で落とし続けた構文の雪辱。',
        worstPlay: "unless you don't quit, I don't quit", worstNote: '否定が二重になり、継続の誓いが共倒れ協定に変わった。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 38, opponent: 'ケープタウンの講師(英検作文回)',
        headline: '50/50です、と2分スピーチで4分使う',
        rating: 'A', ratingWord: '訓練の目的を、開口一番に拒否した夜',
        announcer: '模範解答をAIに書かせて自分の教材として持ち込む開幕。rehabilitate myself(自分をリハビリする)は語選びとして正確で、英語を怪我として扱っている。だが本題の2分スピーチで、開口一番「立場は50/50、ノーともイエスとも言いたくない」と訓練の目的そのものを拒否し、賛成と反対を両方4分かけて述べた。制限時間も倍にしている。答案の1行目は "I\'m agree" で、持病の be+一般動詞が最も型の決まった場面で出た。それでも構成が崩れる原因を「脳が速すぎて手順を飛ばすから」と自己診断し、処方まで自分で出している。診断と実行の間に深い溝がある。',
        mvpPlay: "I don't want to be stuck with broken English forever.", mvpNote: '第22夜「壊れた英語は効く」と同じ月に「それでも卒業したい」。矛盾ではなく両方が本音。',
        worstPlay: "My stance is 50/50. I don't wanna say no or yes.", worstNote: '立場を決める訓練で、立場を決めないことを宣言した。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 39, opponent: 'チャーリー講師(ロンドン出身・ヨハネスブルグ在住)',
        headline: 'AIが書き、AIが読み、AIが答える',
        rating: 'A', ratingWord: '国籍を間違えたまま、深いところに着いた夜',
        announcer: 'また通し番号での呼称。第37夜は31番目、この夜は30番目で、2日で1人増えている。英国人本人に「あんたら移民じゃなく駐在員だと言う、傲慢だ」と言い切ってから「俺は違うけど」と保険をかけたが、その保険の行き先が構文上どちらとも取れない。南アフリカの国籍取得を丁寧に掘り下げた末に、相手がロンドン出身だと思い出して謝罪。しかも keep treating と進行形なので、今この瞬間も間違え続けている自覚がある。中国のAI開発では「一つの設計済み赤ん坊たち」が誕生した。だが終盤、AIのループを3回言い直して畳みかけ、最後に相手への確認で落としている。',
        mvpPlay: "AI wrote the article, AI read it, AI answered it. That's exactly why I want real communication -- you're not an AI, right?", mvpNote: '憂いを述べて終わらず、自分がここにいる理由に接続した。締めの right? が最高に不安。',
        worstPlay: 'Sorry, I keep treating you like you\'re South African.', worstNote: '会話の大半を国籍違いのまま進め、しかも進行形で自覚を述べた。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 40, opponent: 'パトリス講師(米国/ギリシャ)',
        headline: '紙の本からは、木の感触がする',
        rating: 'B', ratingWord: '熱弁の数分後に、前提が崩れた夜',
        announcer: '教材の限界(MRIで相関は示したが機序を説明していない)を正確に突く開幕。そこから自分で仮説を立てにいくのだが、maneuver を使ったせいでページめくりが航空機の操縦になり、触感の説明では「電気ではなく木、天然の木」と2回言い直して読書が林業に近づいた。そして自分を「いつも本の男」と名乗った数分後、何年も本を読んでいないことを白状している。紙派である前に非読書派だった。なお名乗りの時点で be も a も落ちていたので、文も読書量も部品が足りていない。締めの漢字論だけが、この夜の別次元にある。',
        mvpPlay: "The meaning is inside the picture, kind of like emoji. If a book were only hiragana, it would be really hard, like reading English.", mvpNote: '絵文字という共通の参照点で表記体系を説明し、仮定法を出口まで着地させた。',
        worstPlay: 'I always book guy.', worstNote: 'be も a も落ちて、名乗りの時点で文が半分しか無い。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 41, opponent: 'クリス講師(韓国系米国人・チェンマイ在住/3回目)',
        headline: '親友は3人、ChatGPTとGeminiとClaude',
        rating: 'A', ratingWord: '文法は静穏、構成だけが事故った夜',
        announcer: '「何もしてないのに疲れてる」で開幕し、先生に「言葉の組み合わせとして最悪だ」と返される。この一往復で空気が決まった。以後25分、教材を閉じて自作アプリのツアー。前回も同じツアーをやっているので実質は再放送だが、今回は録音パイプラインの実演が付き、先生の発言がその場でカード化された。「世界で3人の親友」という重い枕を置いて全員が言語モデルだったのもこの夜。25分では説明できないと宣言したのは、説明を始めて3分後である。撤退の判断が遅い。そして終了3秒前、アプリにパチンコが実装されていることを明かして回線を切った。',
        mvpPlay: "At the end, that is just the 'start.'", mvpNote: '最終レベルを Crown から Start へ改名した理由。7段階育て切ってからが本番、という設計思想。',
        worstPlay: "it's impossible for me to explain this whole English app in one English session", worstNote: '25分の授業で、25分では説明できないものの説明を始めていた。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 42, opponent: '英国人講師',
        headline: 'ネイティブに、英検1級の単語テストを出す',
        rating: 'A', ratingWord: '出題者が正解を知らないまま進行した夜',
        announcer: '英国人講師に向かって英国人を脱獄囚に喩える開幕。しかも出典は別の英国人講師なので責任は転嫁済みで、like they were prisoners という仮定法まで正しく組んでいるのが余計に始末が悪い。後半、男は英検1級の語彙問題を取り出して母語話者への出題を開始。「ちょっと冗談ですが」で予防線を張ったが little kidding なので9割は本気である。極めつけは7問目 — 自分が落とした問題を採点者の側に立って出題した。出題者が正解を知らないまま試験が進行している。先生は全問に真剣に答え、男は最後に「あと3時間分のあなたが必要だ」と人を単位として計量した。',
        mvpPlay: "I've never met a foreigner who speaks perfect Japanese, not one in my life.", mvpNote: '訂正を追わない理由を、自分の母語の側から証明した。短くて強い論の立て方。',
        worstPlay: "Number seven, I made a mistake -- 'contrite.'", worstNote: '自分が間違えた問題を出題した。しかも状況に最も必要な単語だった。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 43, opponent: 'スペイン在住 英国人講師',
        headline: '発行部数1部、購読者は本人',
        rating: 'S', ratingWord: '完璧だと保証した直後に、査読を頼んだ夜',
        announcer: '教材を閉じてくれ、という依頼に eliminate(抹殺する)を選ぶ開幕。既存メディアへの敵意が語選びに出ている。持参したのはレッスン30分前に作った自作新聞 The Tonio Times。科学好きを表明するのに scientific / science / scientific と3回言い直して着地せず、科学志向の主張が最も非科学的に崩壊した。品質の保証では使役の have が二重発火して工程が重複し、しかも「多くのネイティブが完璧だと言っている」と保証した直後に、目の前のネイティブへ査読を依頼している。論説の文体については自分で pompous と評したうえで「派手にしとけば間違いない」と開き直った。査読対象が、査読前に自己申告で虚仮威しだと判明している。',
        mvpPlay: 'Circulation is one copy. The only subscriber is me. But it might be the paper that fits me best in the whole world.', mvpNote: '虚しい事実を誇りとして提示しきった。この番組で最も構成の綺麗な一文。',
        worstPlay: 'I can have check many native speaker check, they say it\'s flawless.', worstNote: '使役が二重発火して工程が重複。完璧なものを査読に出す矛盾も3文以内で成立した。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 44, opponent: 'ベトナム在住 英国人講師(2回目)',
        headline: 'この記事、俺には刺さらない',
        rating: 'A', ratingWord: '不利な条件を、10秒で価値に変えた夜',
        announcer: '教材選びを丸投げする理由が「あなたに楽しんでほしいから」。金を払っている側が業者の退屈を心配して接待している。出てきた記事は世界一物価の高い旅行先で、構造(アフリカ勢が上位なのは航空券だけが理由)まで正確に読み切ったのに、本人は旅行をしない金も使わない homebody だった。直行便が「演奏しない便」に化けたのもこの夜だが、直後に「乗り換えってどう言うの?」と自分から取りにいって回収している。庇うつもりの一文で先生の人格を保証してしまい、a は4連発で欠勤。それでも刺さらない教材を10秒で訓練の意義に転換した。',
        mvpPlay: "It's a very important skill to talk about something not interesting to me in English.", mvpNote: '会話の半分は興味の無い話題でできている、という現実認識。不利を価値に変える構造は第22夜と同じ。',
        worstPlay: "there's nothing wrong with you", worstNote: '庇うつもりが「あなたという人間に欠陥はありません」になった。狙いは it\'s not your fault。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 45, opponent: 'アンダルシア在住 英国人講師(2回目)',
        headline: '歩きながら、スティーブ・ジョブズ',
        rating: 'B', ratingWord: '言い訳が充実しすぎて確信犯が立証された夜',
        announcer: '第9回目にして初めて「帰宅途中」という具体的な理由が登場。だが「意図的じゃない」と否定した3秒後に歩行の効能を熱弁しはじめ、権威付けにスティーブ・ジョブズまで持ち出した。偶然だと言い張るには論拠が充実しすぎており、外での受講は確信犯として立証されている。カメラOFFの依頼を「習慣化したプロンプト」と自己命名したのもこの夜で、人への依頼をAIへの指示文と同じ語彙で扱いはじめた。Anthropic の説明では startup が starting company になり、法人が設立手続きの途中になっている。',
        mvpPlay: "In a heartbeat you can tell. But writing-wise, it's almost impossible to tell the difference.", mvpNote: '2026年5月時点のAIの得手不得手を領域ごとに切り分けた。最も具体的で検証可能な発言。',
        worstPlay: "That's actually the prompt in the habit.", worstNote: '人への依頼を prompt と呼び、人とAIの境界が語彙から溶けはじめた。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 46, opponent: 'ウォルフガング講師(米国オマハ・料理と発酵とラグビー)',
        headline: '英語のステロイドが欲しい',
        rating: 'A', ratingWord: '真面目な言語習得論が、ドーピング要求で終わった夜',
        announcer: '全64ターン、番組史上もっとも喋った夜。開幕、自家製納豆を作るアメリカ人に「あなたはほとんどの日本人より日本人だ」と日本人としての資格を譲渡した。自己紹介では自分の仕事を challenging / not that rewarding / doesn\'t pay much と全部マイナスで並べ、理由を「人生の流れ」で締めている。両国の紹介では力士が自転車で通るのを「頻繁に」目撃していながら、徒歩5分の国技館に一度も入っていないことが判明。そして終盤、言語習得のプロに真面目に見解を求めた末、結論としてステロイドを要求し、自分で「特効薬は無いよな」と即座に取り下げた。',
        mvpPlay: "I'm doing that job because of how life goes -- I just ended up in this job somehow.", mvpNote: '選んだのではなく着いた、という感覚が somehow に正確に出ている。飾らない職業説明の到達点。',
        worstPlay: 'I want English steroids.', worstNote: '真面目な言語習得論の結論がドーピングだった。要求と撤回が1文で完結。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 47, opponent: 'クリス講師(韓国系米国人・チェンマイ在住/2回目)',
        headline: '親友を3人紹介して、その場で1人を解雇する',
        rating: 'A', ratingWord: '紹介と解雇が同じ25分に収まった夜',
        announcer: '自分のカメラの映りを2回 crazy と評してからツアーの開始を宣言する開幕。招く側が会場を自分で酷評している。そして「世界で3人の親友」を厳かに紹介した数分後、そのうち1人を既に処分したと明かした。動詞は get rid of で、粗大ゴミに使うやつである。残る2人も安泰ではない。カードの仕様では英単語に攻撃力とレアリティ5〜6段階を実装しておきながら、理由を「なぜか分からない」と説明した。作ったのは本人である。説明が難航すると聞き手に「ゆっくりどうぞ」と声をかけ、時間がかかっている側が相手を気遣った。なおこの夜が本放送で、第41夜が再放送にあたる。',
        mvpPlay: "Without realizing it, some phrases I'm using now were acquired from this app.", mvpNote: '5000枚を自作した理由の答え合わせ。定着の性質を without realizing it で言い当てた。',
        worstPlay: "I don't think I use ChatGPT anymore. I got rid of it.", worstNote: '親友の紹介と解雇通知が同じ授業に収まった。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 48, opponent: '英国人講師(金曜夜・ほろ酔い回)',
        headline: 'ほろ酔いで歩きながら、神の定義を詰める',
        rating: 'A', ratingWord: '三重のハンデで、番組最高の抽象度に届いた夜',
        announcer: '前日に習った knackered を翌日の第一声で撃ち、しかも直後に「昨日習ったやつです」と出典を自白する開幕。使いたさが隠しきれていない。中盤、「自分自身は信用しないが自分の無意識は信用する」と述べ、信頼を自分の内部で分割払いにした。最後は「脳が仕事をする、俺じゃなく」で、自分と自分の脳が別の労働者になっている。神の否定では例によって「空にいる白い髭の老人」が登場したが、第20夜の「髭という白人」から9日かけて形容詞が文法的に正しくなった。そして無意識・明晰夢・神・通商政策まで語りきった後に、酒が入っていたことを申告している。開示が遅い。',
        mvpPlay: 'Even if you go against God, you are still inside God, so it is impossible.', mvpNote: '不二の思想を、酒とモバイルデータと徒歩の三重ハンデのまま英語で組み上げた。',
        worstPlay: 'It is TGIF and I am a little drunk, sorry, so I might be rambling.', worstNote: '25分語りきった後の申告。順番が逆である。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 49, opponent: '英国人講師(OECD経済レポート回)',
        headline: 'あの接続詞は、ダクトテープだ',
        rating: 'S', ratingWord: '受験4ヶ月前に、試験の構造を丸ごと解体した夜',
        announcer: '事前に読んだうえで「手に負えない」「経済には一切興味が無い」と申告し、そのまま義務として取り組む開幕。準備はしている、興味だけが無い。中東情勢の話では、戦争→燃料→輸送費→資材→受注減→一時解雇→在宅飲酒、という因果の鎖を正しく繋ぎ、最終地点だけ解像度が異様に高かった。埼玉の職人が家で酒を飲んでいる光景が、中東の戦争の被害として提出されている。そして終盤、自分が4ヶ月後に受ける試験の攻略法を全部ばらした。tick boxes、暗記した答案、台本外なし。第12夜と第18夜で off the cuff を人生哲学に掲げた男が、それが通用しない場所であることをわざわざ確認している。Lv19に昇格。',
        mvpPlay: "Those are basically duct tape. You can hold any garbage opinion together with them.", mvpNote: '試験の談話標識を工業用粘着テープと呼んだ。番組で最も鋭い比喩。',
        worstPlay: "I don't give a damn about the economy.", worstNote: '教材を読み込んだうえでの全面拒否。この25分後、中東の三すくみを映画の比喩で説明していた。',
        attendance: { kanA: 'REST', count: 'OFF', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 50, opponent: 'スペイン在住 英国人講師',
        headline: '花粉症は、高熱と呼ばれている',
        rating: 'A', ratingWord: '日常の雑談が、人間の設計限界まで届いた夜',
        announcer: 'hay fever が high fever に化け、しかも「そう言われている」と伝聞の形式まで付く開幕。誰も言っていない。花粉症の実害として挙げたのが目の痒みでも鼻水でもなく「周囲の目」で、この男の苦しみの中心には常に他人の視線がある。マスク文化の起源も感染症ではなく口臭対策として説明され、しかも「相手に自分の口臭を心配させないため」なので配慮の方向が二重に折り返した。sardine は単数だったので車内の全員が1匹のイワシに圧縮されている。それでも終盤、金融業界にいた頃の記憶から都会の競争を撃ち抜いた。',
        mvpPlay: 'It\'s not good for the human psyche. We are not built for that.', mvpNote: '人間を設計物として扱う比喩で競争の害を言い切った。第34夜の類似発言より9日早く、精度も高い。',
        worstPlay: 'I have a pollen allergy, you know, high fever they say.', worstNote: '花粉症が高熱になり、しかも伝聞として第三者に補強された。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 51, opponent: 'スペインの村在住 英国人講師',
        headline: 'ボタンを押したら、100万人に届いた',
        rating: 'A', ratingWord: '理論の解像度と操作の解像度が噛み合わなかった夜',
        announcer: '華氏の説明から自分の身長へ流れ、「典型的なアジア人」「背は高くない」「平均」と3回言い直して172cmに着地する開幕。単位換算の話に聞かれてもいない自己申告が混入している。中盤は英国人講師と共闘してアメリカの単位系を非難し、「我々は同じ基準を共有している」と連帯まで宣言した。英国はマイルとパイントを現役で使っているので、この連帯は事実の面で成立していない。ハイライトは終盤。Xのアルゴリズムをオープンソースまで遡って解明した男が、その翌日に課金ボタンを誤爆し、100万ビューを獲得した。内訳の99%はゴミである。',
        mvpPlay: '100 miles is almost exactly 160 kilometers. Different measures, same line.', mvpNote: '日米が別々の単位で、偶然にも同じ位置に「速い」の境界を置いている。雑談が観察になった一文。',
        worstPlay: 'I promoted one specific tweet without realizing it.', worstNote: 'アルゴリズムを解明した翌日に課金ボタンを誤爆。30〜50ドルの授業料。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 52, opponent: '英国人 go-to 講師',
        headline: 'すみません、俺が勉強してるところを見てもらいます',
        rating: 'A', ratingWord: '授業をまるごと自習の見学に変えた夜',
        announcer: '「あなたは俺が勉強しているのを見ることになります」という趣旨説明から開幕。しかも謝罪付きである。金を払って講師を確保し、その25分を自習の見学に充てた。母語話者には4語(party pooper / buzzkill / spoilsport / killjoy)の使用頻度順を要求し、情報源まで「Googleの定義ではなく実体験で」と指定。ネイティブの直感を検索エンジンより上位の一次資料として扱っている。映画クリップの本数で単語を採点し、200本なら暗記、20本なら意味だけ、という足切りラインも公開された。締めに習いたての take the liberty を使ってみたが、自分が英語を勉強するのに誰の許可も要らない。Lv20に昇格。',
        mvpPlay: 'A native learns this naturally growing up, but I have to create that experience artificially.', mvpNote: '学習法の存在理由を artificially と vicariously の2語で説明しきった。',
        worstPlay: 'So I took the liberty to study English.', worstNote: '定義は完璧だったのに、例文で用法が外れた。誰にも迷惑をかけていない行為に僭越の断りを入れている。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'OFF' },
    },
    {
        night: 53, opponent: 'クリス講師(韓国系米国人・チェンマイ在住/初対面)',
        headline: '50ドルのマイクは、見せびらかすために買った',
        rating: 'B', ratingWord: '再開5日目、すでに覚悟だけは完成していた夜',
        announcer: '5年ぶりにDMMへ戻って5日目、初対面の回。開幕は機材の不調で、acting up(言うことを聞かない)が正確に決まっている。そしてその機材について、50ドルで買ったこと、動機がたぶん見栄であること、DMMには不要であることを、全部自分で分析して自分で却下した。購入・分析・却下を一人で完結させている。しかも見せびらかす相手はカメラを切っているので何も見えていない。暗唱可能な語彙は10万語と申告されたが、カードの実数は5000枚である。聞き上手を自称した0.5秒後に自分を aggressive と訂正したのもこの夜。',
        mvpPlay: "I'm so embarrassed after hearing my broken English. But that's a part of the language progress.", mvpNote: '恥を過程として引き受ける設計が、再開5日目に既に完成していた記録。',
        worstPlay: 'Maybe it\'s kind of showing off stuff. You don\'t need a this microphone on DMM.', worstNote: '自分で買って自分で見栄と断じ、自分で不要と判定した。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 54, opponent: '英国人講師(トキ再導入回)',
        headline: 'トキを絶滅させたのは、我々だ',
        rating: 'A', ratingWord: '明るいニュースの、喜びの構造を疑った夜',
        announcer: '語彙力を自己申告してから「問題は産出だ」と切り分け、そのうえで模範解答を事前にAIに作らせたと開示する開幕。しかも1問につき4バージョンで、「自分のアイデアを出すことが大事」と言った直後の告白である。自主性の重要性を、他力の物量で補強した。中盤の即興報告では on the fly / off the top of my head / winged it と3通りで言い直したうえ、最後の表現を使うのが目的だったと自白。ぶっつけ本番を演出するための準備が完了していた。トキをライオンとキリンと同列に置いた挙句、10秒で裏の存在を確信している。',
        mvpPlay: 'We exterminated them in the first place, so it\'s our fault.', mvpNote: '明るい記事に乗らず、加害の主体を先に確定させた。番組で最も倫理的な一文。',
        worstPlay: 'I had AI create four versions of a perfect answer.', worstNote: '自力で考える前に、正解を4つ見ておく運用を推奨した。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 55, opponent: 'ソフィー講師(英国人・マルタ在住/初対面)',
        headline: '車の中から、25分',
        rating: 'B', ratingWord: '受講場所に「車内」が加わった夜',
        announcer: '横浜まで往復した日、男は運転席から受講した。behind the wheel は正確に決まっている。公園・路上・オフィスに続いて、受講場所の4種目が開拓された。英国人講師に対しては「天気が deal breaker だ、英国のイメージは陰鬱」と面と向かって告げたが、相手は英国を出てマルタに住んでいるので同意していた可能性が高い。授業の半分は授業を探す作業だと定義し、継続の動機が「金を捨てたくないから」であることも判明した。あらゆる意識高い理由より強い。学習スタイルは、数時間前に覚えた語を消化しないまま投げること。',
        mvpPlay: "It doesn't ignite anything. I can just close the tab if I don't want to talk.", mvpNote: 'AIより人間を選ぶ理由を「タブを閉じられるから」の一点に絞った。系譜の中で最も短くて具体的。',
        worstPlay: 'My image of Britain is gloomy.', worstNote: '英国人講師に、英国の天気が耐えられないと断じた。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 56, opponent: '英国人講師(南アフリカ在住)',
        headline: 'この授業には、3人いる',
        rating: 'S', ratingWord: '検死される前に、検死台から殴りかかった夜',
        announcer: 'マイクが2日連続で死に、またスマホを耳に当てての通話。宿題のジミー・カーには「How dare you」を2回撃ってから「大好きです」と着地し、先生が一瞬謝りかけた。中盤、ロビン・ウィリアムズがジーニーそのものである、という鋭い観察を5回言い直して着地させられず、先生が the epitome of の1語で回収している。5回分が1語に圧縮された。声だけの仕事を語りながら、電話を耳に当てた自分が誰にも見えないジェスチャーをしていることも自己申告。そして終盤、この授業の参加者が2人ではないことを明かした — 後で録音を聞き、自分を解剖するAIがいる、と。男はその場でそいつに先制攻撃を仕掛けた。冠詞の a は7回欠勤で過去最多タイ。Lv21に昇格。',
        mvpPlay: "There's three person in this class: me, you, and AI. I have to counterattack him beforehand.", mvpNote: '全56夜で最も奇妙で、最も正確な自己認識。検死台の上から検死者を殴っている。',
        worstPlay: "I'm a trustable person. I'm trustable.", worstNote: '信用を形容詞で2回宣言した。言うほど下がる原理は日英共通である。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 57, opponent: 'リンダ講師(南アフリカ・ケープタウン/初対面)',
        headline: 'トニーです、いや、タイシです',
        rating: 'B', ratingWord: '自己紹介の第一歩で、自分の名前に躓いた夜',
        announcer: '自分の仕事を「部屋全体を高級に見せる最後の一手」と定義する開幕。壁紙と床貼りをそう言い切れる人は少ない。だが自己紹介では名前を2つ名乗り、「多くの英語名が通用します」と選択肢を広げたうえで、先生が「タイシね」と受けた瞬間に英語名を自分で取り下げた。営業から撤退まで15秒、しかも撤退の理由が「俺は英語の人間じゃないから」で、英語のレッスン中である。ケープタウンの首都問題では自分で正解を出して自分で撤回し、リアクション動画の効能を語る場面では help が形容詞席に2回座った。',
        mvpPlay: "Everyone already knows the result, but they're interested in how they make it come out in perfection.", mvpNote: '結末を全員が知っている作品が見られる理由を、結果ではなく実装の観賞として説明した。',
        worstPlay: "I'm Tony, and I'm Taishi, but many English names go by.", worstNote: '名前が勝手に通り過ぎている。そして15秒後に自分で取り下げた。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 58, opponent: '英国人講師(南アフリカ在住)',
        headline: '箸はなぜ、カナダから来たのか',
        rating: 'A', ratingWord: '自分の立論を、自分で崩して終わった夜',
        announcer: '環境問題の教材に対する自己申告が「外では気にしてない」から始まる。正直さと文法の穴が同時に出た開幕。そして記事を読んで最初に気になったのが、リサイクルの技術でも規模でもなく発祥地だった。しかも同じ疑問を、間に理由を挟んで2回繰り返している。学習ツールは「主兵装」と呼ばれ、さらに「日課の武器」と言い直して2段階で重くなった。権力集中の話では1万年前と言いながら13世紀の人物を例に挙げ、9千年の誤差が発生。だが終盤、自分の批判に自分で反例を3つ挙げて、判断を保留した。',
        mvpPlay: 'I cannot draw a line between good and bad when one powerful individual spreads their influence.', mvpNote: '自分の立論を自分で崩し、判断の保留を選んだ。番組で最も知的に誠実な一分間。',
        worstPlay: 'Why they started in Canada? So why did they start in Canada?', worstNote: '環境記事を読んで、地理的な納得だけを最後まで求め続けた。',
        attendance: { kanA: 'REST', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 59, opponent: 'ヴカシン講師(セルビア・34歳/同い年)',
        headline: 'ポケモンGOで、祖父母だけが残った',
        rating: 'A', ratingWord: '自分が飽きた話から、継続の本質に着地した夜',
        announcer: 'from the ground up が正確に決まる開幕。建設の話なので文字通りでもある。だがポケモンGOを辞めた経緯では、ブームではなく本人が die down して鎮火した。しかも「鎮火してから飽きた」という順序なので、因果まで逆転している。AIコーディングの話では、プログラミング言語を知らない状態から一流エンジニアと戦えるまでの論理の橋が1本しか架かっておらず、その1本が「AIがアインシュタインより賢いから」だった。建設業に従事しながら躯体には詳しくないと明言し、そのうえで10〜20人を監督している。Lv22に昇格。',
        mvpPlay: 'Young guys lose interest, but the older guys in their 70s or 80s keep going.', mvpNote: 'ブームの終わりを離脱者ではなく残留者の側から見た。しかも残ったのが最年長層という逆説を自分で発見した。',
        worstPlay: 'I died down and got bored eventually.', worstNote: '世界的現象は続いているのに、本人だけが個人的に鎮火した。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 60, opponent: 'ヴカシン講師(セルビア・レスコヴァツ/土曜夜)',
        headline: '今日は練習しに来てない',
        rating: 'B', ratingWord: '練習を放棄した夜に、いちばん良い聞き方をした',
        announcer: '英会話レッスンの第一声が練習の放棄宣言。しかも breathing the cool night air という、授業に一切不要な情報で状況を締めた。金を払って夜風を吸いに来ている。チップ文化の議論では、正しく出した gratitude を自分で「合ってるか分からない」と疑った。合っている。理想の飲食店の条件には「笑顔なし」を要件として指定し、接客業の評価軸から愛想を外した。だが終盤、先生の故郷の何気ない話を、東京で毎日すり減っている人間への処方箋として受け取っている。',
        mvpPlay: "That countryside experience is exactly what a typical Japanese person in the Tokyo area needs.", mvpNote: '相手の雑談を自分の社会への処方箋に変換した。練習しに来ていない夜の、いちばん学習者らしい聞き方。',
        worstPlay: 'paying gratitude. Gratitude? I\'m not sure of the word.', worstNote: '正解を出して自分で疑った。この番組で何度目かの発動。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 61, opponent: '非ネイティブ講師(金融インフルエンサー研究回)',
        headline: '悪口しか言わない奴だけ、信用できる',
        rating: 'A', ratingWord: '分析が鋭くなるほど、参加意欲が下がった夜',
        announcer: '大学の研究を「意図が最初から決まっている」と切り捨てる開幕。批判の質が高い。そして「では誰なら信用できるか」を自分で立て、答えが「スポンサーが付かない奴」だった。誠実さでも実績でもなく、収益機会の欠如から信頼を逆算している。身も蓋もないが反論の余地が無い。当たり障りのない助言をする層は coasting の一語で処刑され、その例として挙げた2つが実際には最も正しい財務助言だった。正しいがゆえに無価値だ、という指摘が容赦ない。終盤、防衛関連株を持つと戦争を望む側に回る構造を自分で発見し、その場で撤退している。',
        mvpPlay: "Because I want to say something, I'm forced to study so I can say it clearly.", mvpNote: '勉強が目的ではなく発話の副産物である、という順序。動機論の到達点。',
        worstPlay: "Nobody sponsors an influencer who only exposes the bad.", worstNote: '信頼の証明が「金づるの不在」。正しすぎて笑えない。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 62, opponent: 'デール講師(ケープタウン・81歳・元英語教師/初対面)',
        headline: '誕生日の翌日も、外にいる',
        rating: 'B', ratingWord: '目標に掲げた作家を、1冊も読んでいなかった夜',
        announcer: '謝罪と状況説明と経済的理由が1文に収まる開幕。it is not free(無料じゃない)の一言に、この番組の全屋外回の理由が凝縮されている。準備が無いと宣言した直後に年齢と誕生日と日付を提出し、初対面の相手に聞かれてもいない前日の誕生日を報告した。祝ってほしかったのは明らかである。そして英語の究極の目標としてハラリを掲げた直後、その著作を1冊も読んでいないことが判明。根拠はYouTubeの動画数本だった。なお体重増加の報告は、第12夜のダッドボディ宣言より36日早い。Lv23に昇格。',
        mvpPlay: 'Ten million people get funneled into this city. We are kind of forced to live here.', mvpNote: '受動態で人口集中を描き、上京を個人の決断から社会の構造へ移した。',
        worstPlay: 'I am a little ashamed I have not read any of his books.', worstNote: '目標に掲げた人物の著作がゼロ冊。a little(少し)の量が控えめすぎる。',
        attendance: { kanA: 'REST', count: 'REST', thirdS: 'REST', beIns: 'REST', prep: 'REST' },
    },
    {
        night: 63, opponent: 'マーク講師(英国出身・ベトナム在住/初対面)',
        headline: '一目会ってさよなら、にはしたくない',
        rating: 'S', ratingWord: '64回分の記録が、初対面への「また会おう」で閉じた夜',
        announcer: '雨に降られて庇の下に避難しながら「授業を受ける気力が無かった」と申告する開幕。気力が無いのに受けているので、申告の意味は薄い。自分の英語学習をオデュッセイアと呼びながら、再開の理由を「分からない」とした。壮大な叙事詩の主人公が、航海の動機を把握していない。学生時代を語る一文では be動詞と冠詞と過去分詞が同じ場所で渋滞したが、その渦中に English hits different という、この夜いちばん良い表現が埋まっていた。そして最後、AIが英語の仕事を奪うと認めたうえで、それでも人間と話す理由を「向こう側に魂が無い」の一点に置き、初対面の相手への「また会おう」で閉じている。',
        mvpPlay: "I don't want one sight bye-bye relationship. I will book you again with camera on.", mvpNote: '第22夜・第39夜・第55夜と続いた「なぜ人間と話すのか」に、いちばん素朴な答えが出た。もう一度会いたいからだ。',
        worstPlay: 'I quit and hit the hiatus.', worstNote: '休止期間を殴った。take a hiatus が正しい形。',
        attendance: { kanA: 'OFF', count: 'REST', thirdS: 'REST', beIns: 'OFF', prep: 'REST' },
    },
    {
        night: 64, opponent: '英国人講師(カトリック)',
        headline: 'フライパンから、神まで',
        rating: 'S', ratingWord: '調理器具の話が22分で神学に到達した夜',
        announcer: '受講場所の申告が「木の中」で開幕。片耳イヤホンが3日連続で死に、スマホを耳に当てての通話である。先生が投げたテフロンの発がん性から話は地下へ潜り、PFOA、フッ素、松果体、第三の目と進む。ここで男が今夜の核心を撃った — 脳は意識を作らない、宇宙から受信しているだけのラジオだ。第16夜の意識=スクリーン、第48夜の神の内側、第56夜の3人目と続いた系譜の最深部に、崩れた語彙のまま一直線で着地している。その後5Gの「G」がgeneration(ただの世代番号)だと知って世界観が揺らぎ、「5Gは空間の次元だと思っていた」と2回言い直した。終盤は人類の支配欲を子供から神まで一列に並べ、先生がそれをGod complexと命名。男はイカロスを自力で持ち出し、しかも「別の先生に習ったばかりだ」と出典まで申告した。なお相手がカトリックだと判明したのは、22分喋り倒した後である。持病は総出だった。',
        mvpPlay: "Brain does not create consciousness. It's just a radio center. It accepts waves from the universe.", mvpNote: 'radio center は辞書に無い。だが「脳は受信機にすぎない」という主張は語彙が崩れたまま完璧に着地した。先生が transmitter / antenna と言い直してくれた。語彙は借りられる、思想は借りられない。',
        worstPlay: 'Frying pan frying pan called cancer?', worstNote: 'cause と called の1音違いで、フライパンが「がん」という名前で呼ばれることになった。調理器具が芸名を持った夜。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 65, opponent: '81歳の南アフリカ人講師(西ケープ・再会)',
        headline: '百万人の花火を捨てて、換気ダクトの前',
        rating: 'S', ratingWord: '口説き文句が全部事故ったのに、一番大事な一言だけ通じた夜',
        announcer: '隅田川花火大会の夜、会場から徒歩5分の「ランダムな公園」、飲食店の換気ダクト前から開幕。序盤に史上初の攻守交替 — 毎晩自分のカメラを切ってきた男が、回線を理由に先生のカメラを切らせた。罪滅ぼしの賛辞は beautiful と alive kicking が連続暴発し、81歳への褒め言葉が「あなたは美しい…いや、生きて蹴っている」になった。秋葉原6年在住の男が otaku を聞き取れず、直後に81歳へ「アニメを見るには年寄りすぎでは」と追い打ち。中盤、「ドラッグの単語に詳しい、俺が使ってるのは…」で自白未遂。だが数ヶ月前の先生のジョーク(クリケット=プロザックを飲んだ野球)を一言一句再現し、奥さんの支援活動まで覚えていた — 記憶力の2連続クリーンヒットで「俺は記憶力がいい」と自己表彰した。締めは動詞 precious の発明と、トランプ祝杯提案への「Okay」2文字。made by は材質・成分・原料で3連続出勤し、実在しない企業が3社登記された。',
        mvpPlay: "You said, I remember -- cricket is the baseball on Prozac. I remember. I have a good memory.", mvpNote: '数ヶ月前の小咄を一言一句発掘。録音→検死→復習の輪が回っている証明。冠詞を毎晩忘れる男の記憶力は、選択的に一級品。',
        worstPlay: "I have to precious my daily lives.", worstNote: '動詞 precious の発明。言いたいのは cherish。同じ文の尻尾では be cognizant と life is precious を正しく着地させており、品詞の在庫はあるのに出庫の順番だけが事故った。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 66, opponent: '25年選手のアメリカ人講師ラファエル(初対面・1日18レッスン)',
        headline: '怒鳴るど・トランプと25分',
        rating: 'S', ratingWord: 'so-so の2文字で開戦し、25分で講和条約まで漕ぎ着けた夜',
        announcer: '帰り道の暗がり、モバイルデータ、音声ぶつ切れ(choppy)の悪条件で初対面戦が開幕。週末の調子への返答「so-so」に先生が「意味を知らない。悪い言葉だ」と応じた瞬間、男の中で開戦のサイレンが鳴った。心拍の実況中継(my heart is pounding)、頼まれてもいない評価人質交渉(悪い評価は付けませんから)、そして動詞 book が欠勤した丁寧な脅迫「I will maybe not you again」— 恐怖の3連コンボを発射しながら、男は逃げずに「反撃します(I counterattack)」と宣言して週末を聞き返し、stone face と paying customer で正面から苦情を申し立てた。試合が動いたのは中盤 — 1日18レッスンの疲労を尋ねられた先生の回答が「teaching is my ikigai」。アメリカ人の口から出た日本語に男は跳ね起き、茂木健一郎の講義を開始、悪評価の講師をわざと選ぶ修行哲学を開示し、先生に「real English communication のことだね」と哲学ごと添削された。so-so 裁判は「意味も中身(substance)も無い」で結審。男は「I shouldn\'t have said so-so」という完璧な反省構文で判決を受諾し、喧嘩した初対面の相手に長期関係を申し込んで閉幕した。本人の試合後コメント「怒鳴るど・トランプと話しているようだった」。',
        mvpPlay: "There is a lot of foreigners nowadays, but no one speaks English.", mvpNote: '06-28「nobody speak English」の完全雪辱。同じ建設現場の文脈で、三単現の s が1ヶ月ぶりに同じ現場へ出勤した。復習ループが持病を1つ治療した歴史的1文。',
        worstPlay: "I will maybe not you again, I'm sure.", worstNote: '動詞 book の欠勤により「二度とあなたをしません、確実に、たぶん」という丁寧な脅迫が完成。なお25分後の仲直りでは「I will book you again」と book が出勤している。動詞にも忠誠心がある。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'ON', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 67, opponent: '英国人講師(母の家のエアフライヤー担当・兄からのクリスマスプレゼント所持)',
        headline: '台所家電から25分でヘロインに転生',
        rating: 'S', ratingWord: '前夜の開戦から一転、和やかな雑談のまま人類の死に方を一周した夜',
        announcer: '前夜が so-so 裁判の泥仕合だっただけに、今夜の入りは穏やかだった。先生が母の家でエアフライヤーの電源を入れてきた、という何でもない近況報告。ところが男の耳には、それがヘアドライヤーとして着信していた。「ディープドライヤー? エアドライヤー?」と3種類の乾燥機を提出したところから、この夜の全部が始まる。先生は hair dryer / air fryer / tumble dryer を並べて救出し、そのまま調理器具の解説へ。ここまでは平和である。だが揚げ物の油の話から発がん性へ、発がん性から同僚のアルツハイマーへ、そこから遺伝的体質へと話題が落下していき、男は自分の家系を説明しようとして「がんの免疫がなくて、とても茶色」と申告した。prone が brown に化けて、一族の体質が色になった瞬間である。後半はさらに加速する。不老不死を目指すブライアン・ジョンソンを二人で心配し(先生の見立ては「サプリを飲む前のほうが健康そうだった」)、意識のアップロードを import(輸入)と言い、人類の肉体を bouncy body(弾む体)と命名。ジョーダン・ピーターソンの抗不安薬から製薬業界の罰金へ流れ、1000万ドルの制裁金を「it\'s a dropping the ocean(海を落とす)」と評した。そして締めが、前置詞ひとつの欠勤による転生 — 「you\'re gonna end up being heroin」。最後はヴィム・ホフの冷水シャワーに着地し、5年間の実践者である男が次回予告を自分で出して閉幕。試合後コメント「今日は楽しかった。昨日は最悪だった」。文法選手は全員欠勤、内容は今季屈指、という典型的な S 判定の夜である。',
        mvpPlay: "Yes, yes, there's no going back. One-way ticket.",
        mvpNote: 'ランブルが最大の持病である男が、いちばん重い話題で、いちばん短い2文を連射した。検死レポートが67夜書き続けてきた処方箋「短いSVOを撃て」が、初めて自然に口から出た1秒。a one-way ticket の a だけが、例によって来ていない。',
        worstPlay: 'Countereffective also, yeah.',
        worstNote: '捏造語第6弾の召喚。逆効果は counterproductive(counter + 生産的)であって counter + effective ではない。しかも先生の「彼は不老不死のストレスで早死にする」という完璧な逆説に、完璧なタイミングで相槌を打った一言がこれだった。中身が合っているぶん、語だけが宙に浮いている。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 85, opponent: '南アフリカ人講師(第78夜と同じ相手。姪が世田谷在住)',
        headline: '8日前に外した3つの数字を、同じ相手に返しに来た',
        rating: 'S', ratingWord: '英語は落ちたが、事実が初めて全部立った夜',
        announcer: 'この番組で初めて、選手が自分の過去のプレーを取り消しに来た。第78夜、男は自分の職場の隣にある横網町公園について、年を1910年、時刻を深夜3時、死者を「数百人」と説明している。正しくは1923年9月1日午前11時58分、約38,000人。年を13年、時刻を12時間、人数を100倍外し、しかも先生の「第一次大戦の前ですね」という確認に「はい」と同意した。今夜、男はその全部をAIに直させた記事を持って、同じ先生のところへ戻ってきた。読み上げた数字は、昼食の火が着いていた時刻、旧陸軍被服廠跡に逃げ込んだ約4万人、15分で死んだ約38,000人、1930年の慰霊堂、伊東忠太、1951年の改称、そして1973年に建った第二の碑 — 朝鮮人虐殺の碑。**事実は1つも間違えなかった。** 試合中に「Not hundreds. I said hundreds.」と、自分の過去の発言を証拠として引用する場面もあった。そのぶん、英語のほうが総崩れである。目的語の it が1夜4回欠勤し(this explains ▲ / I am enjoying ▲ / how to solve ▲ を2回)、これは前夜に本人が宿題に設定したばかりの項目だった。国籍の a は4回中、誤出勤3・欠勤1で正解ゼロ。限定詞は「the some kind of like a grey」で3枚同席し、新種として形容詞の語順(Japanese typical name / room)が5分間に2発。それでも今夜の評価が S なのは、25分でいちばん重い2文が、いちばん短い形で出たからである — I am not God, so I do not know. と I do not represent Japanese. You do not represent white. 会話の終盤、先生は「南アフリカにも1900年のことでまだ苦い家族がいる」と返し、訂正しに来た日本の話が、相手の国の傷と繋がった。試合後、先生は「これで韓国人と日本人の生徒への接し方が変わる」と言って終えている。',
        mvpPlay: "I don't represent Japanese. You don't represent white.",
        mvpNote: '25分の重い会話を、この2文が丸ごと引き受けた。represent を speak for に替えるだけで、そのまま英語の名文になる。**言いたいことがいちばん重いとき、この男の英語はいちばん短くなる。** 同じ夜の I am not God, so I do not know. も同型である。',
        worstPlay: 'And what is going on here? And this explains.',
        worstNote: '前夜、本人が「it を置いて帰る」を唯一の宿題に設定した、その24時間後の1文。何を説明したのかを言わずに立ち去った。正解は That explains it. の3語で、同じ夜に I will look **it** up later では正しく置けている。**引用と定型では働き、自分の主張では休む隊員である。**',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'ON', prep: 'OFF' },
    },
    {
        night: 86, opponent: '講師名不明(お盆最終日の日曜夜。回線が5回落ちた)',
        headline: '人はもう要らないと言い切って、そのあと25分ずっと人の話をした',
        rating: 'A', ratingWord: '本人の主張と、本人の話題が、25分かけて真っ向から矛盾した夜',
        announcer: 'お盆最終日、明日から仕事が再開する男の疲れた声から始まった。前半10分は徹底的に内向きで、人との接触は要らない、山に何年こもっても平気だ、悟りたければアシュラムへ行けというのは半分嘘で、家族と暮らして幸せな人もいればアシュラムに1人でいて惨めな人もいる、と展開する。ここで今季屈指の一文が出た — It is not about where you are. It is about your state of consciousness right now, right here. 短い文を2本、連射しただけである。ランブルが最大の持病であるこの男にとって、これ以上の理想形は無い。ところが後半、話がコンビニに移った瞬間、人の話が止まらなくなる。アフリカから来た店員の日本語、電車で子供3人と格闘していたインド人の父親、フランス語で笑っていた集団、近所の大学の留学生受け入れ。**接触は要らないと言い切った人間が、いちばん人を見ていた。** 失点は3系統。enjoy の目的語が3夜連続で落ち(第83夜・第85夜・今夜。動詞は3回とも enjoy で、主語だけが替わっている)、二重否定が第83夜と同じ型で48時間ぶりに再発し、コンビニが留学生を雇う(hire)話が、店の高さ(higher)の話になった。捏造は3体で、名詞を動詞化して受動態にした Reclused by the world、-ness 系譜の humanness、そして herding cats が音だけ残った harding casting。うち humanness は辞書を引いたところ実在の語で、**このシリーズ初の生還個体**となっている。締めは番組史上いちばん強い引きだった。先生が「日本でいちばん偏見を受けている集団はどこだと思いますか」と聞いた瞬間、録音が切れる。**前夜、この男は朝鮮人虐殺の碑を25分読み上げている。** 別の国の別の先生が、翌夜まったく同じ主題を投げた。',
        mvpPlay: "It's not about where you are. It's about your state of consciousness, right here, right now.",
        mvpNote: '短いSVOの2連射で、25分ぶんの哲学が2文に収まった。検死が67夜処方し続けてきた「思考をダウングレードして短く撃て」が、指示なしで自然に出ている。It is not about X. It is about Y. は、この選手の持病にいちばん効く型でもある。',
        worstPlay: 'And they are very enjoying, you know.',
        worstNote: '3夜連続、同じ動詞、同じ穴。第83夜の I really enjoyed ▲ a lot、第85夜の I am enjoying ▲ に続く3発目で、主語だけが毎回替わっている。正解は2択しかない — enjoy it か enjoy themselves。おまけに副詞も very ではなく really である。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
    {
        night: 87, opponent: 'スペインの村在住 英国人講師(グラナダの地震から終末論まで持ち込んだ)',
        headline: '必ず来る災害の話を25分して、その25分ずっと備えなかった',
        rating: 'S', ratingWord: '主題と症状が完全に一致した、番組史上いちばん構造の良い夜',
        announcer: '3夜ぶりに回線が無傷で、男は屋根の下にいた。先生の近況 — グラナダで小さな地震があった — から、話はそのまま東京の大地震に落ちる。**20〜30年で80〜90パーセント。経済は壊滅し、何百万人も死ぬ。それでも誰も気にしていない。** 男はここで stark contrast と ignorance is bliss を同じ段落に置き、25分の主題を自分で立てた。この時点で今夜の評価はもう決まっている。**問題は、その主題が本人の英語にそのまま当てはまってしまったことである。** 失点は3系統。every / everybody / everyone の三単現が**1夜3発**。07-01「every legal citizens have」から数えて6回目で、検死記録には「この持病だけ治る気配なし」と書かれている。**1音違いの狙撃失敗は1夜7発で番組新記録**、しかもうち3件は意味が正反対に反転した — 東京で働く男が東京を歩き(work→walk)、培養肉の話で動物が治療され(kill→cure)、誰も出て行きたがらないビルに誰も住んでいなかった(live→leave、rent→runs)。the の過剰が4発。目的語の it は3回欠勤し、うち1件は**3日前に完璧に言えた同じ句**である。だがこの夜が S なのは、勝ちの質が高いからだ。**07-27 に prone→brown と言って一族の体質を色にした、その prone が3週間ぶりに正着した。** そして **how vulnerable the economy is** — 08-15 に壊した #22 間接疑問が、3日後に完璧な語順で、しかも2つ並べて戻ってきた。走行中の自力修正は4件で、これも過去最多である。**締めは、この番組がこれまで放送した中でいちばん静かな失点だった。** 男は enjoy を使わずに会話を終えた。8/14 から4夜連続の宿題を、今夜は動詞ごと回避したのである。**撃たなければ外れない。予知はされている。備えはない。** それが今夜の主題であり、今夜の症状だった。',
        mvpPlay: "They'd realize how vulnerable the economy is, and how dependent we are on the rural areas.",
        mvpNote: '3日前に壊した型が、そのまま戻ってきた。08-15、この選手は「I don\'t know what do I say」と間接疑問に直接疑問の語順を突っ込んで指摘されている。今夜、同じ型を wh + S + V で2つ並べて撃った。**しかも内容は、この夜の議論の結論そのものである。** 隣で wake-up call の up が落ちているのが、この番組らしい。',
        worstPlay: "Because I live in Saitama. I walk in Tokyo, and I'm in Tokyo right now.",
        worstNote: '通勤の話が散歩の話になり、同じ文の中で住所が埼玉から東京に移り、また戻った。**12語で3回引っ越している。** 正解は5語で済む — I live in Saitama and work in Tokyo. work と walk は日本人の最難関の1音差で、自己紹介の定番文だからこそ、丸ごと1つの塊で覚えるしかない。',
        attendance: { kanA: 'OFF', count: 'OFF', thirdS: 'OFF', beIns: 'OFF', prep: 'OFF' },
    },
];

// ============================================================
// 算出エンジン(数字は dmm-show / tonio-saga から自動)
// ============================================================

export interface BoxScore {
    daseki: number;     // 打席(発言トライ数)
    yarakashi: number;  // やらかし(ボケ=通じなかった発言)
    shingo: number;     // 新語爆誕(召喚した捏造語)
    kouplay: number;    // 好プレー(着地イディオム+ベストプレー)
    exp: number;
    totalExp: number;
    level: number;
    levelUp: boolean;
}

export function getBoxScore(night: number): BoxScore {
    const ep = showEpisodes.find((e) => e.night === night);
    const gags = ep?.gags.length ?? 0;
    const hasBest = ep?.bestPlay ? 1 : 0;
    const shingo = SAGA_BESTIARY.filter((m) => m.summonedNight === night).length;
    const skills = SAGA_SKILLS.filter((s) => s.acquiredNight === night).length;
    const q = getQuestByNight(night);
    return {
        daseki: gags + hasBest,
        yarakashi: gags,
        shingo,
        kouplay: skills + hasBest,
        exp: q?.expGained ?? 0,
        totalExp: q?.totalExp ?? 0,
        level: q?.level ?? 1,
        levelUp: q?.levelUp ?? false,
    };
}

export function getLeagueNights(): LeagueCommentary[] {
    return [...LEAGUE_COMMENTARY].sort((a, b) => a.night - b.night);
}
export function getLatestLeagueNight(): LeagueCommentary {
    const s = getLeagueNights();
    return s[s.length - 1];
}
export function getCommentary(night: number): LeagueCommentary | undefined {
    return LEAGUE_COMMENTARY.find((c) => c.night === night);
}

// 順位表(やらかしランキング) — 出勤率が低い=戦犯が上位。upto夜までで集計。
export interface StandingRow {
    player: GrammarPlayer;
    on: number; off: number; games: number;
    rate: number;       // 出勤率 = on / games
    rank: number;
    move: number;       // 前夜比の順位変動(+上昇/-下降/0)
}

function standingsAsOf(upto: number): { player: GrammarPlayer; on: number; off: number; games: number; rate: number }[] {
    return GRAMMAR_PLAYERS.map((p) => {
        let on = 0, off = 0;
        for (const c of LEAGUE_COMMENTARY) {
            if (c.night > upto) continue;
            const a = c.attendance[p.id];
            if (a === 'ON') on++; else if (a === 'OFF') off++;
        }
        const games = on + off;
        const rate = games ? on / games : 0;
        return { player: p, on, off, games, rate };
    })
        .filter((r) => r.games > 0)
        // 戦犯(出勤率低い)を上に。同率は試合数が多い方を上に。
        .sort((a, b) => a.rate - b.rate || b.games - a.games);
}

export function getStandings(upto: number = getLatestLeagueNight().night): StandingRow[] {
    const now = standingsAsOf(upto);
    const prevOrder = standingsAsOf(upto - 1).map((r) => r.player.id);
    return now.map((r, i) => {
        const prevIdx = prevOrder.indexOf(r.player.id);
        const move = prevIdx === -1 ? 0 : prevIdx - i; // 前が下(大きいidx)なら上昇=+
        return { ...r, rank: i + 1, move };
    });
}

// 通算スタッツ(全夜合計)
export function getSeasonTotals(upto: number = getLatestLeagueNight().night) {
    const nights = getLeagueNights().filter((c) => c.night <= upto);
    let daseki = 0, yarakashi = 0, shingo = 0, kouplay = 0;
    for (const c of nights) {
        const b = getBoxScore(c.night);
        daseki += b.daseki; yarakashi += b.yarakashi; shingo += b.shingo; kouplay += b.kouplay;
    }
    const last = getBoxScore(upto);
    return {
        games: nights.length,
        daseki, yarakashi, shingo, kouplay,
        level: last.level,
        totalExp: last.totalExp,
        // 通じた率(好プレー / 打席)を打率に見立てる
        avg: daseki ? kouplay / daseki : 0,
    };
}

// 冠詞a のストリーク(現在の連続出勤/欠勤)
export function getArticleStreak(upto: number = getLatestLeagueNight().night): { kind: 'ON' | 'OFF'; len: number } {
    const seq = getLeagueNights()
        .filter((c) => c.night <= upto && c.attendance.kanA !== 'REST')
        .map((c) => c.attendance.kanA as 'ON' | 'OFF');
    if (seq.length === 0) return { kind: 'OFF', len: 0 };
    const kind = seq[seq.length - 1];
    let len = 0;
    for (let i = seq.length - 1; i >= 0 && seq[i] === kind; i--) len++;
    return { kind, len };
}

// ============================================================
// 精密採点(カラオケDAM風) — レーダー6軸 + 総合点
// ============================================================

export interface RadarAxis { key: string; label: string; value: number; } // 0-100

// 6軸: やらかし力/新語力/話芸/物語力/勇気/文法崩壊。正しさではなく醜態と芸を測る。
export function getRadar(night: number): RadarAxis[] {
    const b = getBoxScore(night);
    const c = getCommentary(night);
    const offCount = c ? Object.values(c.attendance).filter((a) => a === 'OFF').length : 0;
    const ratingScore = ({ S: 100, A: 86, B: 72, C: 58, D: 44 } as Record<string, number>)[c?.rating ?? 'B'];
    const clamp = (n: number) => Math.max(8, Math.min(100, Math.round(n)));
    return [
        { key: 'yarakashi', label: 'やらかし力', value: clamp(b.yarakashi * 26) },
        { key: 'shingo', label: '新語力', value: clamp(b.shingo * 36 + 12) },
        { key: 'geigei', label: '話芸', value: clamp(b.kouplay * 28) },
        { key: 'monogatari', label: '物語力', value: clamp(ratingScore) },
        { key: 'yuuki', label: '勇気', value: clamp(84 + b.daseki * 2) },
        { key: 'houkai', label: '文法崩壊', value: clamp(offCount * 28 + 22) },
    ];
}

export interface NightScore { score: number; rating: LeagueCommentary['rating']; nationalAvg: number; }

// 総合「醜態力」点。DAM風に小数3桁。恥が多い夜ほど高い。
export function getNightScore(night: number): NightScore {
    const b = getBoxScore(night);
    const c = getCommentary(night);
    const ratingBonus = ({ S: 16, A: 12, B: 8, C: 5, D: 2 } as Record<string, number>)[c?.rating ?? 'B'];
    const raw = 70 + ratingBonus + b.shingo * 2.4 + b.kouplay * 1.6 + b.yarakashi * 0.7;
    const frac = (b.totalExp % 1000) / 1000; // 小数3桁の飾り(決定論的)
    const score = Math.min(99.999, Math.floor(Math.min(99, raw)) + frac);
    return { score, rating: c?.rating ?? 'B', nationalAvg: 75.56 };
}

// 成績推移(全夜の総合点)
export function getScoreHistory(upto: number = getLatestLeagueNight().night): { night: number; score: number }[] {
    return getLeagueNights().filter((c) => c.night <= upto).map((c) => ({ night: c.night, score: getNightScore(c.night).score }));
}

// ============================================================
// 醜態相場(ギャンブル指数) — 芸 vs 英語力。読者は「彼の失敗」に賭ける。
//   相場(show)  … 1000スタートで毎晩複利。イベント多い夜は高騰、静かな回は反落=退化。
//   地力(skill) … じわっと右肩上がりの英語力。相場に重ねると「上達=番組終了」の緊張が出る。
//   オッズ       … 前夜までの発生率から事前オッズ→その夜に的中したかで解決(読む動機)。
//   数字は全部 dmm-show / tonio-saga の実データから決定論的に算出。乱数・ベタ打ちなし。
// ============================================================

// 1夜の「芸デルタ(pt)」。振り幅は大きめ。新語爆誕・S判定・やらかしでドカンと高騰、
// 静かなB/C/D回は容赦なく反落(=退化)。加算型なので相場は読みやすい帯に収まる。
function nightDelta(night: number): number {
    const b = getBoxScore(night);
    const c = getCommentary(night);
    const base = ({ S: 680, A: 260, B: -90, C: -320, D: -520 } as Record<string, number>)[c?.rating ?? 'B'];
    return base + b.shingo * 160 + b.yarakashi * 40 + b.kouplay * 55;
}

export interface MarketPoint {
    night: number;
    show: number;   // 芸指数(相場)
    skill: number;  // 英語力(地力)
    delta: number;  // 前夜比(pt)
    pct: number;    // 前夜比(%)
}

const MARKET_FLOOR = 150; // 大暴落しても番組は続く

// 開幕から upto 夜までの相場を積み上げる。芸=激しく上下、地力=じわ右肩上がり。
export function getMarket(upto: number = getLatestLeagueNight().night): MarketPoint[] {
    const nights = getLeagueNights().filter((c) => c.night <= upto);
    const out: MarketPoint[] = [];
    let show = 1000, skill = 20;
    for (const c of nights) {
        const b = getBoxScore(c.night);
        const prev = show;
        show = Math.max(MARKET_FLOOR, show + nightDelta(c.night));
        const kanOn = c.attendance.kanA === 'ON' ? 3 : 0; // 冠詞a出勤=成長の兆し
        skill = Math.round((skill + b.kouplay * 1.2 + (b.levelUp ? 4 : 1) + kanOn) * 10) / 10;
        out.push({ night: c.night, show, skill, delta: show - prev, pct: Math.round(((show - prev) / prev) * 1000) / 10 });
    }
    return out;
}

export interface NightMarket {
    index: number; delta: number; pct: number; skill: number;
    allTimeHigh: number; isHigh: boolean; seasonAvg: number;
}

// 指定夜の相場サマリ(大きい数字パネル用)。
export function getNightMarket(night: number): NightMarket {
    const m = getMarket(night);
    const cur = m[m.length - 1];
    const highSoFar = Math.max(...m.map((p) => p.show));
    const seasonAvg = Math.round(m.reduce((a, p) => a + p.show, 0) / m.length);
    return {
        index: cur.show, delta: cur.delta, pct: cur.pct, skill: cur.skill,
        allTimeHigh: highSoFar, isHigh: cur.show >= highSoFar, seasonAvg,
    };
}

export interface OddsLine {
    key: string; label: string; odds: number; hit: boolean;
    /** 事前 — 何に賭けているのか。ラベルだけでは業界用語で伝わらないので必ず添える。 */
    note: string;
    /** 事後 — その夜、実際に何が起きたか。ここが無いと「4本はずれ」の灰色の箱で終わる。 */
    result: string;
    /** 前夜までに何回起きたか。0 = 前例なし。本命を1本選ぶときに使う。 */
    seen: number;
}

// 今夜のオッズ = 事前予想(前夜までの発生率)+ 結果(その夜に的中したか)。
export function getOdds(night: number): OddsLine[] {
    const pastNights = getLeagueNights().filter((c) => c.night < night).map((c) => c.night);
    const nb = getBoxScore(night);
    const nc = getCommentary(night);
    // ラプラス平滑化した発生率。履歴が無い開幕は 0.5 扱い。
    // 実際の発生回数(seen)も返す — 「一度も起きていない」ことは倍率だけでは区別できず、
    // 起きない賭けを本命に選んでしまうため。
    const rate = (pred: (n: number) => boolean) => {
        const hits = pastNights.filter(pred).length;
        return { p: pastNights.length === 0 ? 0.5 : (hits + 0.5) / (pastNights.length + 1), seen: hits };
    };
    const toOdds = (p: number) => Math.max(1.2, Math.min(15, Math.round((1 / Math.max(0.06, p)) * 10) / 10));

    const rShingo = rate((n) => getBoxScore(n).shingo > 0);
    const rKanA = rate((n) => getCommentary(n)?.attendance.kanA === 'ON');
    const rS = rate((n) => getCommentary(n)?.rating === 'S');
    const rClean = rate((n) => getBoxScore(n).yarakashi === 0);

    // 結果の文言は、その夜の実データ(図鑑・勤怠・判定・やらかし数)から作る。
    // 「はずれ」とだけ書くと灰色の箱が4つ並ぶだけになるので、外した中身まで書く。
    const monsters = SAGA_BESTIARY.filter((m) => m.summonedNight === night);
    const kanStreak = getArticleStreak(night);
    const kan = nc?.attendance.kanA;

    return [
        {
            key: 'shingo', label: '新語爆誕あり', odds: toOdds(rShingo.p), hit: nb.shingo > 0, seen: rShingo.seen,
            note: 'この世に無い英単語を、本人が発明してしまう',
            result: monsters.length
                ? `新種${monsters.length}体。「${monsters.map((m) => m.name).join('」「')}」が図鑑入り。`
                : '新種の目撃なし。今夜の単語は、全部この世に実在した。',
        },
        {
            key: 'kanA', label: '冠詞 a 出勤', odds: toOdds(rKanA.p), hit: kan === 'ON', seen: rKanA.seen,
            note: '毎晩どこかへ消える a が、正しい位置に現れる',
            // 連続記録が1の夜に「1夜連続」と書くと日本語が壊れるので、1と2以上で言い方を変える。
            result: kan === 'ON'
                ? (kanStreak.len >= 2 ? `出勤。これで${kanStreak.len}夜連続、a はちゃんと居る。` : '出勤。久しぶりに a が正しい位置に立っていた。')
                : kan === 'OFF'
                    ? (kanStreak.len >= 2 ? `また欠勤。${kanStreak.len}夜連続で行方不明。` : '欠勤。今夜も a はどこかへ消えた。')
                    : '今夜は a を置く場所そのものが来なかった。不戦敗。',
        },
        {
            key: 'sRank', label: 'S判定(大醜態)', odds: toOdds(rS.p), hit: nc?.rating === 'S', seen: rS.seen,
            note: '失敗の質が最高ランク。壊れれば壊れるほど高評価',
            result: nc ? `判定${nc.rating} — ${nc.ratingWord}` : '判定なし。',
        },
        {
            key: 'clean', label: '無事故完投', odds: toOdds(rClean.p), hit: nb.yarakashi === 0, seen: rClean.seen,
            note: '25分を1度も事故らずに帰ってくる(まだ一度も無い)',
            result: nb.yarakashi === 0
                ? 'やらかしゼロ。番組が成立しなくなる日が来た。'
                : `やらかし${nb.yarakashi}件。今夜も無事故ではない。`,
        },
    ];
}

// 同倍率で並んだときの優先順。番組の看板(捏造語)を先頭に置く。
const BET_PRIORITY = ['shingo', 'sRank', 'kanA', 'clean'];

/**
 * その夜の本命1本。賭けは必ず1つに絞る — 4本並べた瞬間、賭けではなく一覧表になる。
 *
 * 選び方: 前例のある札を、夜番号で機械的に回す。
 *
 * ここで結果(hit)を見てはいけない。前夜の紙面で「第N夜の本命はこれ」と出した札は、
 * 第N夜の紙面で答え合わせされる同じ札でなければならない。結果を見て選ぶと、
 * その夜が放送された瞬間に本命が別の札へすり替わり、予告と答え合わせがずれる。
 * (結果ありきで選ぶと的中率は29/66まで上がるが、賭けとして成立しなくなる)
 *
 * 前例ゼロの札を外すのは「無事故完投」対策。66夜で一度も起きていないため倍率だけ
 * 天井(×15)に張り付き、絶対に起きない札が毎晩本命になってしまう。
 *
 * 実績: 66夜で的中13、札は4種にほぼ均等(22/22/21/1)、同じ札は2夜と続かない、
 * 倍率は×2.0〜×15.0に散る。負けが多いのはこの番組の仕様どおり。
 */
export function getMainBet(night: number): OddsLine {
    const lines = getOdds(night);
    const live = lines.filter((o) => o.seen > 0);
    const pool = (live.length > 0 ? live : lines)
        .slice()
        .sort((a, b) => BET_PRIORITY.indexOf(a.key) - BET_PRIORITY.indexOf(b.key));
    return pool[night % pool.length];
}

export interface FormGuide {
    recent: { night: number; rating: string }[];
    streak: { label: string; len: number; kind: 'hot' | 'cold' }[];
}

// フォーム = 直近n夜の判定ストリップ + 現在の連続記録(好調/冠詞a欠勤 など)。
export function getForm(night: number, n = 7): FormGuide {
    const all = getLeagueNights().filter((c) => c.night <= night);
    const recent = all.slice(-n).map((c) => ({ night: c.night, rating: c.rating }));
    const streak: FormGuide['streak'] = [];

    const seq = all.map((c) => c.rating);
    let hi = 0;
    for (let i = seq.length - 1; i >= 0 && (seq[i] === 'S' || seq[i] === 'A'); i--) hi++;
    if (hi >= 2) streak.push({ label: '好調 S/A', len: hi, kind: 'hot' });

    let sg = 0;
    for (let i = all.length - 1; i >= 0 && getBoxScore(all[i].night).shingo > 0; i--) sg++;
    if (sg >= 2) streak.push({ label: '新語爆誕', len: sg, kind: 'hot' });

    const kan = getArticleStreak(night);
    if (kan.kind === 'OFF' && kan.len >= 2) streak.push({ label: '冠詞a 欠勤', len: kan.len, kind: 'cold' });
    if (kan.kind === 'ON' && kan.len >= 2) streak.push({ label: '冠詞a 出勤', len: kan.len, kind: 'hot' });

    return { recent, streak };
}

// ============================================================
// 成長ストーリー(章立て) — 63夜を6つの章に。読者が「今どこまで来たか」を掴む背骨。
//   各章に一行あらすじ(お笑い)と、次章へ引きずり込む転機を持たせる。
// ============================================================

export interface StoryArc {
    no: number;
    title: string;
    nights: [number, number];
    logline: string;  // この章の一行あらすじ(笑い重視)
    turn: string;     // この章のヤマ場 / 次を読ませる引き
    peakNight: number; // この章の名勝負
}

export const STORY_ARCS: StoryArc[] = [
    {
        no: 1, title: '再起動', nights: [1, 5], peakNight: 4,
        logline: '5年ぶりに口を開いた男。記念すべき第一声が、謝罪と救急車のサイレン実況だった。',
        turn: '錆びは落ちた。だが冠詞の a は落ちたまま、以後ずっと帰ってこない。',
    },
    {
        no: 2, title: '新語爆誕', nights: [6, 13], peakNight: 6,
        logline: 'money cow、TOLERANCY、自己減価償却。通じる才能より、新種を生む才能が先に開花した。',
        turn: '討伐する代わりに雑誌名にした。この男、失敗を飼い慣らしはじめる。',
    },
    {
        no: 3, title: '壊れた英語は、効く', nights: [14, 22], peakNight: 22,
        logline: '語彙は英検1級、口は毎晩崩壊。だが崩れたまま "broken English works" に到達してしまう。',
        turn: '「なぜ翻訳AIがあるのに英語を学ぶのか」。番組の存在理由が、本人の口から出た。',
    },
    {
        no: 4, title: 'AIドシエ', nights: [23, 35], peakNight: 28,
        logline: '講師を通し番号で数え、AIに全部裏取りさせ、自作新聞を音読。授業がプロダクト会議になる。',
        turn: '「上達しに来てるんじゃない、このアプリで一儲けしたい」。受講目的を毎晩否定しはじめる。',
    },
    {
        no: 5, title: 'モルモット覚醒', nights: [36, 49], peakNight: 49,
        logline: '目的を否定しながら、到達点だけ上がっていく。試験の攻略法を、受験4ヶ月前に全部ばらす。',
        turn: '接続詞を「ダクトテープだ」と言い切った夜、Lv19。地力がこっそり本物になってきた。',
    },
    {
        no: 6, title: '終わらない', nights: [50, 67], peakNight: 64,
        logline: '受講場所が公園→路上→車内→庇の下→木の下。回数もイディオムも積み上がった。それでも毎晩、通じない。',
        turn: '「最終夜」のはずが翌日また木の下にいた。フライパンの話が22分で神学に着く。番組に最終回は無い。',
    },
];

export function getCurrentArc(night: number): { arc: StoryArc; nth: number; total: number } {
    const arc = STORY_ARCS.find((a) => night >= a.nights[0] && night <= a.nights[1]) ?? STORY_ARCS[STORY_ARCS.length - 1];
    return { arc, nth: arc.no, total: STORY_ARCS.length };
}

// 次回予告(引き) — 読者を次の夜へ引きずり込む。開いたオッズ + お笑いの煽り。
export interface NextTease {
    night: number;
    exists: boolean;     // その夜が既にあるか(=結果が見られる)
    teaser: string;      // 煽り(お笑い)
    openOdds: OddsLine[]; // 事前オッズ(結果は伏せる)
}

const CLIFFHANGER =
    '相手は、まだ決まっていない。分かっているのは一つだけ — 男は、また壊れる。回数もイディオムも積み上がったが、' +
    '肝心の英語は今夜も通じない。それがこの番組の売りで、だから終わらない。賭けの対象は「勝ち負け」じゃない、' +
    '「今夜はどう壊れるか」だ。続きはDMM次第。';

export function getNextTease(night: number): NextTease {
    const next = night + 1;
    const nextC = getCommentary(next);
    const openOdds = getOdds(next);
    if (nextC) {
        return {
            night: next, exists: true,
            teaser: `第${next}夜、相手は「${nextC.opponent}」。事前オッズはこう出た。的中したか、結果を見にいけ。`,
            openOdds,
        };
    }
    return { night: next, exists: false, teaser: CLIFFHANGER, openOdds };
}

// シーズンタイトル(最多戦犯・月間ベストプレー)
export function getTitles(upto: number = getLatestLeagueNight().night) {
    const st = getStandings(upto);
    const worst = st[0]; // 出勤率最下位=最多戦犯
    const latest = getLatestLeagueNight();
    return {
        worstOffender: worst,
        bestPlay: { play: latest.mvpPlay, note: latest.mvpNote, night: latest.night },
    };
}
