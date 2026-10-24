// Shared IndexedDB store for training audio clips (movie PP audio etc.)
// v1: store `clips` — Blob keyed by phraseId
// v2: adds store `meta` — { id, english, japanese, date, category, addedAt } keyed by phraseId
//     so a standalone player can label clips without hitting any API.

const CLIP_DB_NAME = 'training-audio-clips';
const CLIP_STORE = 'clips';
const META_STORE = 'meta';
const DB_VERSION = 2;

export interface ClipMeta {
    id: string;
    english: string;
    japanese: string;
    date: string;
    category: string;
    addedAt: number;
}

export function openClipDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(CLIP_DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(CLIP_STORE)) {
                db.createObjectStore(CLIP_STORE);
            }
            if (!db.objectStoreNames.contains(META_STORE)) {
                db.createObjectStore(META_STORE);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export async function saveClip(phraseId: string, blob: Blob, meta?: Partial<ClipMeta>): Promise<void> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([CLIP_STORE, META_STORE], 'readwrite');
        tx.objectStore(CLIP_STORE).put(blob, phraseId);
        if (meta) {
            const record: ClipMeta = {
                id: phraseId,
                english: meta.english || '',
                japanese: meta.japanese || '',
                date: meta.date || '',
                category: meta.category || '',
                addedAt: meta.addedAt ?? Date.now(),
            };
            tx.objectStore(META_STORE).put(record, phraseId);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function loadClip(phraseId: string): Promise<Blob | null> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CLIP_STORE, 'readonly');
        const req = tx.objectStore(CLIP_STORE).get(phraseId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
}

export async function deleteClip(phraseId: string): Promise<void> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([CLIP_STORE, META_STORE], 'readwrite');
        tx.objectStore(CLIP_STORE).delete(phraseId);
        tx.objectStore(META_STORE).delete(phraseId);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

export async function loadAllClipIds(): Promise<Set<string>> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(CLIP_STORE, 'readonly');
        const req = tx.objectStore(CLIP_STORE).getAllKeys();
        req.onsuccess = () => resolve(new Set(req.result.map(k => String(k))));
        req.onerror = () => reject(req.error);
    });
}

// Returns metadata for every saved meta record. Clips registered before v2
// have a blob but no meta — resolve those ids separately (see listClipMetaForIds).
export async function loadAllClipMeta(): Promise<ClipMeta[]> {
    const db = await openClipDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(META_STORE, 'readonly');
        const req = tx.objectStore(META_STORE).getAll();
        req.onsuccess = () => resolve((req.result || []) as ClipMeta[]);
        req.onerror = () => reject(req.error);
    });
}
