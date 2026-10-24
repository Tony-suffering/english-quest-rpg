'use client';

// とにおワールドの各エリアに置く「ワールドマップに戻る」固定ボタン。
// ポケモンの町→ワールドマップと同じ役割。どこにいても1タップで全体図へ帰れる。
import Link from 'next/link';

export default function WorldMapButton() {
    return (
        <Link href="/english/tonio-world" style={{
            position: 'fixed', left: 16, bottom: 16, zIndex: 60,
            background: '#ffffff', border: '2px solid #B8941E', borderRadius: 999,
            padding: '9px 16px', fontSize: 12.5, fontWeight: 800, color: '#1c1917',
            textDecoration: 'none', boxShadow: '0 4px 14px rgba(28,25,23,0.2)',
        }}>
            ◆ ワールドマップ
        </Link>
    );
}
