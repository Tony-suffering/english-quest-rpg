/**
 * Silent Bartender -- session state helpers.
 *
 * Light wrapper around sessionStorage for in-session (not persistent)
 * state. Useful for things like "did we already show the install
 * banner this session" without permanently setting a flag.
 */

const PREFIX = 'tonio-bar-session-';

function ssGet(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try { return window.sessionStorage.getItem(PREFIX + key); } catch { return null; }
}

function ssSet(key: string, val: string): void {
    if (typeof window === 'undefined') return;
    try { window.sessionStorage.setItem(PREFIX + key, val); } catch { /* */ }
}

export function hasShownInSession(key: string): boolean {
    return ssGet(key) === 'true';
}

export function markShownInSession(key: string): void {
    ssSet(key, 'true');
}

export function getSessionValue(key: string): string | null {
    return ssGet(key);
}

export function setSessionValue(key: string, val: string): void {
    ssSet(key, val);
}
