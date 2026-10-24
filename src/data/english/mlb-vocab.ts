/**
 * The Ballpark Times — 解説シート(日本語)用。
 *
 * 野球用語集ではなく、「試合リキャップ英語の読み方」ガイド。
 * 紙面の recap は下の言い回しの組み合わせで書かれるので、これを押さえれば
 * 毎日の英文リキャップがそのまま読める = 実戦的な読解学習になる。
 */

export interface RecapPhrase {
    phrase: string;
    ja: string;
    example: string;
}

export const RECAP_PHRASES: RecapPhrase[] = [
    { phrase: 'homered / homered twice', ja: '本塁打を打った（2本打った）。go deep / go yard も同義の口語。', example: 'Judge homered twice off the ace.' },
    { phrase: 'drove in four', ja: '4打点を挙げた。drive in = 走者を還す。過去形 drove。', example: 'He drove in four in the rout.' },
    { phrase: 'went 3-for-4', ja: '4打数3安打だった。「go X-for-Y」で打数と安打数を表す定型。', example: 'Soto went 3-for-4 with a double.' },
    { phrase: 'earned the win', ja: '勝ち投手になった。逆は took the loss（負け投手）。', example: 'Cease earned the win.' },
    { phrase: 'struck out eleven', ja: '11個の三振を奪った。strike out = 三振に取る。', example: 'He struck out eleven over eight innings.' },
    { phrase: 'scoreless innings', ja: '無失点のイニング。eight scoreless innings = 8回無失点。', example: 'She spun seven scoreless innings.' },
    { phrase: 'routed / downed / edged', ja: '圧勝した／下した／（僅差で）競り勝った。点差で動詞を選ぶのが記事の作法。', example: 'The Jays routed the Giants, 10–0.' },
    { phrase: 'picked up the save', ja: 'セーブを挙げた。closer が9回を締めたときの定番。', example: 'Díaz picked up his 24th save.' },
    { phrase: 'were shut out', ja: '完封された（無得点に抑えられた）。能動なら threw a shutout。', example: 'The Giants were shut out at home.' },
    { phrase: 'a grand slam', ja: '満塁本塁打。belt / crush a grand slam でよく使う。', example: 'He crushed a grand slam in the third.' },
    { phrase: 'back-to-back homers', ja: '連続本塁打（アベック弾）。back-to-back = 連続で。', example: 'Back-to-back homers broke it open.' },
    { phrase: 'a complete game', ja: '完投。complete-game shutout なら完封完投。', example: 'He tossed a complete-game shutout.' },
];
