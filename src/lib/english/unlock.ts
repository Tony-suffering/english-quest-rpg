'use client';

/**
 * 商品の解錠(クライアント側)。RAW PASS と ACCESS で共通。
 *
 * 方針: **決済リンクが空のあいだは、全部開放。**
 * 売る用意ができていないのに鍵だけ掛かっている状態が、いちばん質が悪い。
 * 決済リンクを1本入れた瞬間に有料部分が閉じる、という1箇所で切り替わる形にしてある。
 *
 * 破ろうと思えば破れる作り(コードは共通、localStorage 判定)。
 * 個人商品で webhook もログインも持たない以上ここが現実解で、
 * 「払った人と払っていない人のあいだに手間を1つ置く」以上のことはしていない。
 */

export type ProductId = 'rawpass' | 'access' | 'wordbook';

const key = (p: ProductId) => `unlock:${p}`;

export const isUnlocked = (p: ProductId): boolean => {
    if (typeof window === 'undefined') return false;
    try { return window.localStorage.getItem(key(p)) === '1'; } catch { return false; }
};

export type UnlockResult = 'ok' | 'wrong' | 'not_configured' | 'error';

export const submitCode = async (p: ProductId, code: string): Promise<UnlockResult> => {
    const c = code.trim();
    if (!c) return 'wrong';
    try {
        const res = await fetch('/api/unlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product: p, code: c }),
        });
        if (res.status === 503) return 'not_configured';
        const j = await res.json().catch(() => ({ ok: false }));
        if (j?.ok) {
            try { window.localStorage.setItem(key(p), '1'); } catch { /* noop */ }
            return 'ok';
        }
        return 'wrong';
    } catch {
        return 'error';
    }
};

export const relock = (p: ProductId) => {
    try { window.localStorage.removeItem(key(p)); } catch { /* noop */ }
};

/** 販売中か(決済リンクが入っているか) */
export const isSelling = (buyUrl: string): boolean => buyUrl.trim().length > 0;

/**
 * 見せてよい範囲か。
 * @param buyUrl   商品の決済リンク(空 = 販売前 = 全開放)
 * @param free     無料で見せる範囲(この値以下は誰でも通す)
 * @param position いま見ようとしている位置
 */
export const canOpen = (p: ProductId, buyUrl: string, free: number, position: number): boolean => {
    if (!isSelling(buyUrl)) return true;
    if (position <= free) return true;
    return isUnlocked(p);
};
