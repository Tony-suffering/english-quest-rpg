/**
 * 生徒ページの合言葉(Edge 用: middleware から使う。node:crypto は使えないので Web Crypto)
 * access.ts(Node 用)と同じ SHA-256 hex を返す。
 */

export function cookieName(slug: string): string {
    return `student_${slug}`;
}

export async function hashKeyWeb(key: string): Promise<string> {
    const data = new TextEncoder().encode(key);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function keyMatchesWeb(key: string | null | undefined, accessHash: string): Promise<boolean> {
    if (!key || !accessHash) return false;
    const h = await hashKeyWeb(key);
    if (h.length !== accessHash.length) return false;
    // 定数時間比較
    let diff = 0;
    for (let i = 0; i < h.length; i++) diff |= h.charCodeAt(i) ^ accessHash.charCodeAt(i);
    return diff === 0;
}
