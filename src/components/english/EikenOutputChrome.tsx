'use client';

/**
 * OUTPUT PASS (アウトプットパス) -- 共通ブランドの外装。公開版 (toniolab)。
 *
 * iwasaki 側には 1次(書く) / 2次(話す) の2枚看板があるが、こちらに持ってきているのは
 * 「書く」の2本だけなので、タブもその2本にしてある (行き先の無いタブを出さない)。
 *   - CORE 5 = 意見を書く型 (/english/write/core5)
 *   - SUM 5  = 要約を書く型 (/english/write/sum5)
 *
 * EikenOutputDisclaimer は文言ごと同じものを使う。英検の名前を出す以上、
 * 無関係であること・過去問を写していないことは公開側でこそ要る。
 */

import Link from 'next/link';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';

type Active = 'write' | 'core5' | 'sum5' | 'speak' | 'topic100' | 'theme30';

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
                    <Link href="/english/write" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>
                            OUTPUT<span style={{ color: INK }}> PASS</span>
                        </span>
                    </Link>
                    <span style={{ fontSize: '11px', color: FAINT, letterSpacing: '0.3px' }}>
                        英語を「書く」型だけの道具 ・ 無料 ・ 登録不要
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {tab('/english/write/core5', 'core5', '意見を書く', 'CORE 5 ー 指10本')}
                    {tab('/english/write/sum5', 'sum5', '要約を書く', 'SUM 5 ー 本文の形5つ')}
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
