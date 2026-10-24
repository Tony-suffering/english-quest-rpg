// 映画ハーベスト -- ¥400レンタルを喰って口語表現を収穫する (JREスタイルの映画版)
//
// 運用:
//   1. YouTube/Apple TVで安レンタルを観る (観るだけ。メモ不要)
//   2. チャットで「映画観た: <タイトル>」と言う
//   3. 会話の手(move) × 10変化 + 深化(文化解説) のエピソードが焼かれてここに追加される
//
// エピソードの本体データは各 expand-*.ts。ここは台帳。

export interface CinemaEpisode {
    id: string;
    no: number;
    jpTitle: string;
    enTitle: string;
    year: number;
    source: string;      // どこで・いくらで観たか
    genre: string;
    moveCount: number;   // 収穫した手の数
    exprCount: number;   // 総表現数
    href: string;        // エピソードページ
    note: string;        // この映画から何が獲れたか
}

export const CINEMA_EPISODES: CinemaEpisode[] = [
    {
        id: 'game-night',
        no: 1,
        jpTitle: 'ゲーム・ナイト',
        enTitle: 'Game Night',
        year: 2018,
        source: 'YouTube レンタル',
        genre: 'コメディ / 犯罪',
        moveCount: 10,
        exprCount: 100,
        href: '/english/expand',
        note: '夫婦の軽口・負け惜しみ・疑い・気まずさ。日常会話の手がほぼ全部入っている見本市。',
    },
];
