// 英語サツ案件 — 罪状テーブル & 取り調べ案件
// データの本体は my-mistakes.ts（本人が追記する実ミス記録）。
// ここは「前科ファイル」ゲーム用の派生レイヤーだけを持つ。実データは一切書き換えない。

// ── 罪状テーブル（patternKey ごと。刑事の口調・絵文字なし） ──
export interface Charge {
    chargeName: string;     // 罪状名
    modus: string;          // 手口
    verdictAcquit: string;  // 腫瘍(誤り)を正しく当てた時
    verdictMiss: string;    // 無実の単語を逮捕した時
}

export const CHARGES: Record<string, Charge> = {
    uncountable: {
        chargeName: '不可算 複数化罪（最重要指名手配）',
        modus: 'work・content・energy。数えられん名詞に s を盛り、a を添える。再犯3件以上の最頻出犯。',
        verdictAcquit: '正解。それは数えられん。s も a も要らない。やっと覚えたか。',
        verdictMiss: '不正解。work も content も数えられん。s を付けた時点で負けだ。これで何度目だ。',
    },
    article: {
        chargeName: '冠詞 the 濫用罪',
        modus: '総称・抽象名詞にとりあえず the を盛る。a energy のように付くはずのない所にも添える。盛り癖。',
        verdictAcquit: '正解。そこの the は余分だった。今日は見逃す。だが盛り癖は治ってない。',
        verdictMiss: '不正解。本ボシは冠詞だ。無実の単語を逮捕してどうする。だから再犯する。',
    },
    'third-s': {
        chargeName: '三単現 -s 事件',
        modus: '三人称単数に -s を付け忘れる。かと思えば複数主語に -s を付ける。一致を見てない常習犯。',
        verdictAcquit: '…合ってる。主語と動詞、今日は一致してた。だが余罪は残ってる。気を抜くな。',
        verdictMiss: '不正解。主語を見ろ。誰が動いてるかも確認せず -s を振るから、こうなる。',
    },
    appreciate: {
        chargeName: 'appreciate 取扱不注意罪',
        modus: '他動詞なのに目的語を抜く。受動や進行にする。I\'m appreciating that の常習。',
        verdictAcquit: '正解。appreciate は他動詞、目的語 it、過去形。覚えてたか。意外だな。',
        verdictMiss: '不正解。appreciate に受動も進行もない。何度言えば分かる。',
    },
    make: {
        chargeName: '使役 make 不作為罪',
        modus: 'make this useful の make を抜く。やらせる相手も動詞も置かずに済まそうとする横着。',
        verdictAcquit: '正解。make が要る所に make を置けた。最低限だ。',
        verdictMiss: '不正解。誰かに何かを「させる」なら make が要る。抜くな。',
    },
    'noun-adj': {
        chargeName: '品詞すり替え罪',
        modus: 'irony と ironic を混同。be動詞も道連れに落とす。名詞に形容詞の仕事をさせる無免許。',
        verdictAcquit: '正解。名詞か形容詞か、今日は見分けた。',
        verdictMiss: '不正解。その単語、品詞が違う。形が違えば仕事も違う。',
    },
    'aux-base': {
        chargeName: '原形不法侵入罪（have 挟み）',
        modus: 'don\'t / can\'t の後の原形に have をねじ込む。don\'t have pay の常習。',
        verdictAcquit: '正解。助動詞の後は原形ひとつ。have は要らなかった。',
        verdictMiss: '不正解。助動詞の後に have を挟むな。原形だけだ。',
    },
    'extra-to': {
        chargeName: 'to 過剰投与罪',
        modus: 'trying to the same... のように要らん to を盛る。逆に要る所では抜く。to の在庫管理ができてない。',
        verdictAcquit: '正解。そこに to は要らなかった。',
        verdictMiss: '不正解。その to は余分だ。動詞の後に名詞が来るなら挟まない。',
    },
    ramble: {
        chargeName: 'ランブル罪（言い切り不能）',
        modus: '中身は良い。が1ターンが長すぎる。自分でも「I\'m rambling」と自白済み。情状酌量なし。',
        verdictAcquit: '…と言いたいが、これは長さの罪だ。2〜3文で言い切れたら無罪。',
        verdictMiss: '不正解。長い。中身は削るな、だが2〜3文で切れ。文法より先にこれだ。',
    },
    'word-choice': {
        chargeName: '誤認逮捕罪（語の取り違え）',
        modus: 'dug と duck を混同。音が近いだけの別の単語を現場に連れてくる。',
        verdictAcquit: '正解。似た音に騙されなかった。',
        verdictMiss: '不正解。その単語、別件だ。音が近いだけの無関係な語を逮捕してる。',
    },
    other: {
        chargeName: 'その他余罪',
        modus: '分類前の未処理事件。追って取り調べる。',
        verdictAcquit: '正解。今日は見逃す。',
        verdictMiss: '不正解。まだ調べがついてない案件だ。',
    },
};

// ── 取り調べ案件（mistake id ごと。腫瘍 = タップさせる「本ボシ」の単語） ──
// display は表示する壊れた一文（複数例を含む said は単一文に整える）。
// guilty は display を空白分割した中に必ず存在する一語であること（検証済み）。
export interface SatsuCase {
    id: string;        // Mistake.id を参照
    display: string;   // 表示する壊れた一文
    guilty: string;    // 本ボシ＝タップ正解の単語
}

export const CASES: SatsuCase[] = [
    { id: 'm-010', display: 'casually enjoying English contents', guilty: 'contents' },
    { id: 'm-002', display: "I don't have pay much attention", guilty: 'have' },
    { id: 'm-011', display: 'jobs that requires English', guilty: 'requires' },
    { id: 'm-012', display: "I didn't have a energy", guilty: 'a' },
    { id: 'm-013', display: 'I had to dug into the awning', guilty: 'dug' },
    { id: 'm-007', display: 'no such things as internet', guilty: 'things' },
    { id: 'm-008', display: 'trying to the same stuff', guilty: 'to' },
    { id: 'm-009', display: 'I have so many works', guilty: 'works' },
    { id: 'm-005', display: 'ChopValue collect', guilty: 'collect' },
    { id: 'm-006', display: 'ignore the morality', guilty: 'the' },
    { id: 'm-004', display: 'this part kind of irony', guilty: 'irony' },
    { id: 'm-001', display: "I'm appreciating that", guilty: 'appreciating' },
];
