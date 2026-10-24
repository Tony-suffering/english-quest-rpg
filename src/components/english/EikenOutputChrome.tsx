'use client';

/**
 * OUTPUT PASS (アウトプットパス) -- 共通ブランドの外装。
 *
 * コンセプト: 英検は 1次=ライティング / 2次=スピーキング と、出口が両方アウトプット。
 * その「アウトプット限定」の対策だけに絞った自主教材シリーズとして、
 * /english/write (1次 ライトパス) と /english/speak (2次 スピークパス) を
 * "パス"(=合格 pass / 通行証)で揃えた一つのブランドで束ねる。「英検」は説明文に置くだけ。
 *
 * - EikenOutputNav: 1次⇄2次⇄トピック100 を行き来する共通ナビ + コンセプト一行
 * - EikenOutputDisclaimer: 英検協会と無関係・過去問非転載・商標のガード文言
 */

import Link from 'next/link';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';

type Active = 'write' | 'speak' | 'topic100' | 'theme30';

export function EikenOutputNav({ active }: { active: Active }) {
    const tab = (href: string, key: Active, label: string, sub: string) => {
        const on = active === key;
        return (
            <Link href={href} style={{ flex: 1, textDecoration: 'none' }}>
                <div style={{
                    padding: '10px 8px', borderRadius: '12px', textAlign: 'center',
                    border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                    background: on ? '#FEF9E7' : '#fff',
                    transition: 'all 0.15s',
                }}>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: on ? DEEPGOLD : SUB }}>{label}</div>
                    <div style={{ fontSize: '10px', color: FAINT, marginTop: '2px' }}>{sub}</div>
                </div>
            </Link>
        );
    };
    return (
        <div style={{ background: '#fff', borderBottom: `1px solid ${LINE}` }}>
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>
                        OUTPUT<span style={{ color: INK }}> PASS</span>
                    </span>
                    <span style={{ fontSize: '11px', color: FAINT, letterSpacing: '0.3px' }}>
                        アウトプット限定の英検対策 ・ 1次=書く / 2次=話す / 土台=撃つ
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {tab('/english/write', 'write', '1次 ライティング', '意見論述・要約を書く')}
                    {tab('/english/speak', 'speak', '2次 スピーキング', 'スピーチを声に出す')}
                </div>
            </div>
        </div>
    );
}

export function EikenOutputDisclaimer() {
    return (
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 16px 44px' }}>
            <div style={{ background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>
                    ご利用にあたって
                </div>
                <p style={{ margin: 0, fontSize: '11px', lineHeight: 1.85, color: SUB }}>
                    本サービスは英語学習者向けの非公式の自主教材です。公益財団法人 日本英語検定協会、および同協会が実施する各種検定試験とは一切関係がなく、同協会が監修・公認・推奨するものではありません。掲載しているお題・模範解答・模範スピーチ・本文はすべて当サービスが独自に作成したオリジナルであり、実際の検定試験の問題（いわゆる過去問）を転載・複製したものではありません。「英検」は公益財団法人 日本英語検定協会の登録商標です。
                </p>
            </div>
        </div>
    );
}
