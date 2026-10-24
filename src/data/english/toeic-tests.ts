/**
 * 模試レジストリ -- 切替UI(ToeicBooklet)とルートが参照する一覧。
 * 新しい回を追加したら (1) toeic-test-NN.ts を assemble で生成、
 * (2) ここに1行足す、(3) src/app/english/toeic/N/page.tsx を作る。
 */
export interface ToeicTestEntry {
    id: string;      // test.id と一致 (例 "toeic-test-02")
    n: string;       // 表示番号 "01".."10"
    href: string;    // ルート
    reading: boolean; // Reading専用なら true
}

export const TOEIC_TESTS: ToeicTestEntry[] = [
    { id: 'toeic-test-01', n: '01', href: '/english/toeic', reading: false },
    { id: 'toeic-test-02', n: '02', href: '/english/toeic/2', reading: true },
    { id: 'toeic-test-03', n: '03', href: '/english/toeic/3', reading: true },
    { id: 'toeic-test-04', n: '04', href: '/english/toeic/4', reading: false },
    { id: 'toeic-test-05', n: '05', href: '/english/toeic/5', reading: true },
    { id: 'toeic-test-06', n: '06', href: '/english/toeic/6', reading: true },
    { id: 'toeic-test-07', n: '07', href: '/english/toeic/7', reading: true },
    { id: 'toeic-test-08', n: '08', href: '/english/toeic/8', reading: true },
];
