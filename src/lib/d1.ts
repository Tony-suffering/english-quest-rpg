// Cloudflare D1 API helper
// Uses Cloudflare REST API to access D1 database

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '7efac1047fba804c1b7ea5a10868dbfc';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DATABASE_ID = 'f4801cde-0f1d-4bc9-beec-5d8709813798';

interface D1Result<T> {
    results: T[];
    success: boolean;
    meta?: {
        duration: number;
        changes: number;
        last_row_id: number;
    };
}

interface D1Response<T> {
    result: D1Result<T>[];
    success: boolean;
    errors: { message: string }[];
}

export interface Phrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
    created_at?: string;
    transcript?: string | null;   // PP 由来の書き起こし (任意)
}

async function executeQuery<T>(sql: string, params: (string | number | null)[] = []): Promise<D1Result<T>> {
    if (!CLOUDFLARE_API_TOKEN) {
        throw new Error('CLOUDFLARE_API_TOKEN is not set');
    }

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sql,
                params,
            }),
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`D1 API error: ${error}`);
    }

    const data: D1Response<T> = await response.json();

    if (!data.success) {
        throw new Error(`D1 query failed: ${data.errors.map(e => e.message).join(', ')}`);
    }

    return data.result[0];
}

/**
 * phrases 全件の短時間キャッシュ。
 *
 * SELECT * FROM phrases はテーブル全行を読む。行数は 2026-09 時点で約 10,400 。
 * D1 の無料枠は 1 日 500 万行読みなので、**この 1 本を 482 回呼んだだけで一日分が空になる**。
 * /api/phrases を叩くページは 40 本以上あり、1 ページで複数回呼ぶものもあるので、
 * 同じ瞬間の重複呼び出しをここで潰す。書き込みが走ったら即時に捨てるので、
 * 登録直後に古い一覧が返ることはない(同じインスタンス内)。
 */
const PHRASES_TTL_MS = 30_000;
let phrasesCache: { at: number; rows: Phrase[] } | null = null;

/** phrases を書き換えたら必ず呼ぶ */
export function invalidatePhrasesCache() {
    phrasesCache = null;
}

export async function getAllPhrases(): Promise<Phrase[]> {
    const now = Date.now();
    if (phrasesCache && now - phrasesCache.at < PHRASES_TTL_MS) return phrasesCache.rows;
    const result = await executeQuery<Phrase>('SELECT * FROM phrases ORDER BY date DESC, id ASC');
    phrasesCache = { at: now, rows: result.results };
    return result.results;
}

export async function getPhrasesByDate(date: string): Promise<Phrase[]> {
    const result = await executeQuery<Phrase>(
        'SELECT * FROM phrases WHERE date = ? ORDER BY id ASC',
        [date]
    );
    return result.results;
}

export async function addPhrase(phrase: Omit<Phrase, 'created_at'>): Promise<Phrase & { duplicate?: boolean }> {
    // 同じ日付に同じ英文があるか。
    // date を先に書くのは idx_phrases_date を使わせるため。
    // LOWER(english) は関数なので単体では索引が効かず、date で絞らないと
    // 登録 1 件ごとに全 10,400 行を走査する。日付で絞れば数十行で済む。
    const existing = await executeQuery(
        'SELECT id, english, japanese, category, date FROM phrases WHERE date = ? AND LOWER(english) = LOWER(?)',
        [phrase.date, phrase.english]
    );
    if (existing.results && existing.results.length > 0) {
        return { ...(existing.results[0] as Phrase), duplicate: true };
    }
    await executeQuery(
        'INSERT INTO phrases (id, english, japanese, category, date) VALUES (?, ?, ?, ?, ?)',
        [phrase.id, phrase.english, phrase.japanese, phrase.category, phrase.date]
    );
    invalidatePhrasesCache();
    return phrase as Phrase;
}

export async function updatePhrase(id: string, updates: Partial<Omit<Phrase, 'id' | 'created_at'>>): Promise<void> {
    const fields: string[] = [];
    const values: (string | null)[] = [];

    if (updates.english !== undefined) {
        fields.push('english = ?');
        values.push(updates.english);
    }
    if (updates.japanese !== undefined) {
        fields.push('japanese = ?');
        values.push(updates.japanese);
    }
    if (updates.category !== undefined) {
        fields.push('category = ?');
        values.push(updates.category);
    }
    if (updates.date !== undefined) {
        fields.push('date = ?');
        values.push(updates.date);
    }
    if (updates.transcript !== undefined) {
        fields.push('transcript = ?');
        values.push(updates.transcript ?? null);
    }

    if (fields.length === 0) return;

    values.push(id);
    await executeQuery(
        `UPDATE phrases SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
    invalidatePhrasesCache();
}

// ─── transcript 列を phrases テーブルに追加 (idempotent) ───
export async function ensureTranscriptColumn(): Promise<void> {
    try {
        await executeQuery('ALTER TABLE phrases ADD COLUMN transcript TEXT');
    } catch (err) {
        // 既に存在する場合の "duplicate column" エラーは無視
        const msg = err instanceof Error ? err.message : String(err);
        if (!/duplicate column|already exists/i.test(msg)) {
            throw err;
        }
    }
}

export async function deletePhrase(id: string): Promise<void> {
    await executeQuery('DELETE FROM phrases WHERE id = ?', [id]);
    invalidatePhrasesCache();
}

export async function getUniqueDates(): Promise<string[]> {
    const result = await executeQuery<{ date: string }>(
        'SELECT DISTINCT date FROM phrases ORDER BY date DESC'
    );
    return result.results.map(r => r.date);
}

// Progress tracking (legacy - kept for compatibility)
export interface Progress {
    phrase_id: string;
    play_count: number;
    last_played_at: string | null;
    mastered: boolean;
}

export async function getAllProgress(): Promise<{ [key: string]: Progress }> {
    const result = await executeQuery<Progress>('SELECT * FROM progress');
    const progressMap: { [key: string]: Progress } = {};
    result.results.forEach(p => {
        progressMap[p.phrase_id] = p;
    });
    return progressMap;
}

export async function updateProgress(phraseId: string): Promise<Progress> {
    const now = new Date().toISOString();

    // Upsert: Insert or update
    await executeQuery(
        `INSERT INTO progress (phrase_id, play_count, last_played_at, mastered)
         VALUES (?, 1, ?, FALSE)
         ON CONFLICT(phrase_id) DO UPDATE SET
         play_count = play_count + 1,
         last_played_at = ?,
         mastered = CASE WHEN play_count + 1 >= 3 THEN TRUE ELSE FALSE END`,
        [phraseId, now, now]
    );

    // Return updated progress
    const result = await executeQuery<Progress>(
        'SELECT * FROM progress WHERE phrase_id = ?',
        [phraseId]
    );
    return result.results[0];
}

export async function resetProgress(): Promise<void> {
    await executeQuery('DELETE FROM progress');
}

// Mastery tracking (0-3 base + 6=START for chakra system)
export interface PhraseMastery {
    phrase_id: string;
    mastery_level: number; // 0-3, 6
    updated_at: string;
    last_leveled_at: string | null;
    card_points: number;
    card_name: string | null;
}

export async function getAllMastery(): Promise<Record<string, number>> {
    try {
        const result = await executeQuery<PhraseMastery>('SELECT * FROM phrase_mastery');
        const masteryMap: Record<string, number> = {};
        result.results.forEach(m => {
            masteryMap[m.phrase_id] = m.mastery_level;
        });
        return masteryMap;
    } catch {
        // Table might not exist yet
        return {};
    }
}

export async function getAllMasteryWithDates(): Promise<{ mastery: Record<string, number>; lastLeveled: Record<string, string>; cardPoints: Record<string, number>; cardNames: Record<string, string>; retired: Record<string, boolean> }> {
    try {
        const result = await executeQuery<PhraseMastery>('SELECT * FROM phrase_mastery');
        const mastery: Record<string, number> = {};
        const lastLeveled: Record<string, string> = {};
        const cardPoints: Record<string, number> = {};
        const cardNames: Record<string, string> = {};
        const retired: Record<string, boolean> = {};
        result.results.forEach(m => {
            mastery[m.phrase_id] = m.mastery_level;
            if (m.last_leveled_at) lastLeveled[m.phrase_id] = m.last_leveled_at;
            cardPoints[m.phrase_id] = m.card_points || 0;
            if (m.card_name) cardNames[m.phrase_id] = m.card_name;
            if ((m as any).retired) retired[m.phrase_id] = true;
        });
        return { mastery, lastLeveled, cardPoints, cardNames, retired };
    } catch {
        return { mastery: {}, lastLeveled: {}, cardPoints: {}, cardNames: {}, retired: {} };
    }
}

export async function setMastery(phraseId: string, level: number, lastLeveledAt?: string): Promise<void> {
    const now = new Date().toISOString();
    if (lastLeveledAt) {
        await executeQuery(
            `INSERT INTO phrase_mastery (phrase_id, mastery_level, updated_at, last_leveled_at)
             VALUES (?, ?, ?, ?)
             ON CONFLICT(phrase_id) DO UPDATE SET
             mastery_level = ?,
             updated_at = ?,
             last_leveled_at = ?`,
            [phraseId, level.toString(), now, lastLeveledAt, level.toString(), now, lastLeveledAt]
        );
    } else {
        await executeQuery(
            `INSERT INTO phrase_mastery (phrase_id, mastery_level, updated_at)
             VALUES (?, ?, ?)
             ON CONFLICT(phrase_id) DO UPDATE SET
             mastery_level = ?,
             updated_at = ?`,
            [phraseId, level.toString(), now, level.toString(), now]
        );
    }
}

export async function resetMastery(): Promise<void> {
    await executeQuery('DELETE FROM phrase_mastery');
}

export async function setRetired(phraseId: string, retired: boolean): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO phrase_mastery (phrase_id, mastery_level, updated_at, retired)
         VALUES (?, 0, ?, ?)
         ON CONFLICT(phrase_id) DO UPDATE SET
         retired = ?,
         updated_at = ?`,
        [phraseId, now, retired ? '1' : '0', retired ? '1' : '0', now]
    );
}

// Card points: accumulate gacha sparks per phrase for collectible card ranks
export async function addCardPoints(phraseId: string, points: number): Promise<number> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO phrase_mastery (phrase_id, mastery_level, updated_at, card_points)
         VALUES (?, 0, ?, ?)
         ON CONFLICT(phrase_id) DO UPDATE SET
         card_points = COALESCE(card_points, 0) + ?,
         updated_at = ?`,
        [phraseId, now, points.toString(), points.toString(), now]
    );
    const result = await executeQuery<{ card_points: number }>(
        'SELECT COALESCE(card_points, 0) as card_points FROM phrase_mastery WHERE phrase_id = ?',
        [phraseId]
    );
    return result.results[0]?.card_points || 0;
}

export async function setCardName(phraseId: string, name: string | null): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO phrase_mastery (phrase_id, mastery_level, updated_at, card_name)
         VALUES (?, 0, ?, ?)
         ON CONFLICT(phrase_id) DO UPDATE SET
         card_name = ?,
         updated_at = ?`,
        [phraseId, now, name, name, now]
    );
}

export async function getCardPoints(phraseId: string): Promise<number> {
    try {
        const result = await executeQuery<{ card_points: number }>(
            'SELECT COALESCE(card_points, 0) as card_points FROM phrase_mastery WHERE phrase_id = ?',
            [phraseId]
        );
        return result.results[0]?.card_points || 0;
    } catch {
        return 0;
    }
}

// ============================================
// User Phrases (Personal Collection)
// ============================================

export interface UserPhrase {
    id: string;
    phrase: string;
    type: string;              // idiom, phrasal verb, slang, etc.
    meaning: string;           // Japanese meaning
    note: string | null;       // Personal note or usage tip
    example: string | null;    // Example sentence
    source: string | null;     // Where they found it (url, text, etc.)
    mastery_level: number;     // 0=New, 1=Seen, 2=Practiced, 3=Comfortable, 4=Owned
    times_used: number;        // How many times they've reviewed/used it
    created_at: string;
    last_reviewed_at: string | null;
    // Video clip reference (from YouGlish)
    video_id: string | null;       // YouTube video ID
    video_timestamp: number | null; // Start time in seconds
    video_text: string | null;      // Subtitle text at that moment
}

export async function getAllUserPhrases(): Promise<UserPhrase[]> {
    try {
        const result = await executeQuery<UserPhrase>(
            'SELECT * FROM user_phrases ORDER BY created_at DESC'
        );
        return result.results;
    } catch (error) {
        console.error('Error getting user phrases:', error);
        return [];
    }
}

export async function getUserPhraseByPhrase(phrase: string): Promise<UserPhrase | null> {
    try {
        const result = await executeQuery<UserPhrase>(
            'SELECT * FROM user_phrases WHERE LOWER(phrase) = LOWER(?)',
            [phrase]
        );
        return result.results[0] || null;
    } catch {
        return null;
    }
}

export async function addUserPhrase(data: {
    id: string;
    phrase: string;
    type: string;
    meaning: string;
    note?: string;
    example?: string;
    source?: string;
    video_id?: string;
    video_timestamp?: number;
    video_text?: string;
    date?: string;
}): Promise<UserPhrase> {
    // Use T12:00:00Z (noon UTC) to avoid timezone date shift issues
    const now = data.date ? `${data.date}T12:00:00.000Z` : new Date().toISOString();

    await executeQuery(
        `INSERT INTO user_phrases (id, phrase, type, meaning, note, example, source, mastery_level, times_used, created_at, last_reviewed_at, video_id, video_timestamp, video_text)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, NULL, ?, ?, ?)
         ON CONFLICT(phrase) DO UPDATE SET
         type = ?,
         meaning = ?,
         note = COALESCE(?, note),
         example = COALESCE(?, example),
         source = COALESCE(?, source),
         video_id = COALESCE(?, video_id),
         video_timestamp = COALESCE(?, video_timestamp),
         video_text = COALESCE(?, video_text)`,
        [
            data.id, data.phrase, data.type, data.meaning,
            data.note || null, data.example || null, data.source || null, now,
            data.video_id || null, data.video_timestamp?.toString() || null, data.video_text || null,
            data.type, data.meaning, data.note || null, data.example || null, data.source || null,
            data.video_id || null, data.video_timestamp?.toString() || null, data.video_text || null
        ]
    );

    return {
        id: data.id,
        phrase: data.phrase,
        type: data.type,
        meaning: data.meaning,
        note: data.note || null,
        example: data.example || null,
        source: data.source || null,
        mastery_level: 0,
        times_used: 0,
        created_at: now,
        last_reviewed_at: null,
        video_id: data.video_id || null,
        video_timestamp: data.video_timestamp || null,
        video_text: data.video_text || null,
    };
}

export async function updateUserPhraseMastery(phraseId: string, level: number): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `UPDATE user_phrases SET mastery_level = ?, times_used = times_used + 1, last_reviewed_at = ? WHERE id = ?`,
        [level.toString(), now, phraseId]
    );
}

export async function incrementPhraseUsage(phraseId: string): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `UPDATE user_phrases SET times_used = times_used + 1, last_reviewed_at = ? WHERE id = ?`,
        [now, phraseId]
    );
}

export async function deleteUserPhrase(id: string): Promise<void> {
    await executeQuery('DELETE FROM user_phrases WHERE id = ?', [id]);
}

export async function updateUserPhrase(id: string, data: {
    phrase?: string;
    type?: string;
    meaning?: string;
    note?: string;
    example?: string;
}): Promise<void> {
    const updates: string[] = [];
    const values: (string | null)[] = [];

    if (data.phrase !== undefined) { updates.push('phrase = ?'); values.push(data.phrase); }
    if (data.type !== undefined) { updates.push('type = ?'); values.push(data.type); }
    if (data.meaning !== undefined) { updates.push('meaning = ?'); values.push(data.meaning); }
    if (data.note !== undefined) { updates.push('note = ?'); values.push(data.note || null); }
    if (data.example !== undefined) { updates.push('example = ?'); values.push(data.example || null); }

    if (updates.length > 0) {
        values.push(id);
        await executeQuery(`UPDATE user_phrases SET ${updates.join(', ')} WHERE id = ?`, values);
    }
}

export async function searchUserPhrases(query: string): Promise<UserPhrase[]> {
    try {
        const result = await executeQuery<UserPhrase>(
            `SELECT * FROM user_phrases WHERE phrase LIKE ? OR meaning LIKE ? ORDER BY times_used DESC`,
            [`%${query}%`, `%${query}%`]
        );
        return result.results;
    } catch {
        return [];
    }
}

export async function updateUserPhraseVideo(
    id: string,
    videoId: string | null,
    videoTimestamp: number | null,
    videoText: string | null
): Promise<void> {
    await executeQuery(
        `UPDATE user_phrases SET video_id = ?, video_timestamp = ?, video_text = ? WHERE id = ?`,
        [videoId || null, videoTimestamp?.toString() || null, videoText || null, id]
    );
}

export async function updateUserPhraseReview(
    id: string,
    reviewSentence: string,
    reviewIdiom: string | null,
    reviewIdiomMeaning: string | null,
    reviewSentenceJa: string | null = null
): Promise<void> {
    await executeQuery(
        `UPDATE user_phrases SET review_sentence = ?, review_idiom = ?, review_idiom_meaning = ?, review_sentence_ja = ? WHERE id = ?`,
        [reviewSentence, reviewIdiom || null, reviewIdiomMeaning || null, reviewSentenceJa || null, id]
    );
}

export async function getUserPhraseStats(): Promise<{
    total: number;
    byMastery: Record<number, number>;
    byType: Record<string, number>;
}> {
    try {
        const all = await getAllUserPhrases();
        const byMastery: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
        const byType: Record<string, number> = {};

        all.forEach(p => {
            byMastery[p.mastery_level] = (byMastery[p.mastery_level] || 0) + 1;
            byType[p.type] = (byType[p.type] || 0) + 1;
        });

        return { total: all.length, byMastery, byType };
    } catch {
        return { total: 0, byMastery: {}, byType: {} };
    }
}

// ============================================
// Learning Time Tracking (Daily Study Log)
// ============================================

export interface LearningTime {
    id: number;
    date: string;        // YYYY-MM-DD
    minutes: number;     // Total minutes studied that day
    created_at: string;
    updated_at: string;
}

export async function initLearningTimeTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS learning_time (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT UNIQUE NOT NULL,
            minutes INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);
}

export async function getLearningTimeByDate(date: string): Promise<LearningTime | null> {
    try {
        const result = await executeQuery<LearningTime>(
            'SELECT * FROM learning_time WHERE date = ?',
            [date]
        );
        return result.results[0] || null;
    } catch {
        return null;
    }
}

export async function getAllLearningTime(): Promise<LearningTime[]> {
    try {
        const result = await executeQuery<LearningTime>(
            'SELECT * FROM learning_time ORDER BY date DESC'
        );
        return result.results;
    } catch {
        return [];
    }
}

export async function addLearningTime(date: string, minutes: number): Promise<LearningTime> {
    const now = new Date().toISOString();

    await executeQuery(
        `INSERT INTO learning_time (date, minutes, created_at, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(date) DO UPDATE SET
         minutes = minutes + ?,
         updated_at = ?`,
        [date, minutes.toString(), now, now, minutes.toString(), now]
    );

    const result = await executeQuery<LearningTime>(
        'SELECT * FROM learning_time WHERE date = ?',
        [date]
    );
    return result.results[0];
}

export async function setLearningTime(date: string, minutes: number): Promise<LearningTime> {
    const now = new Date().toISOString();

    await executeQuery(
        `INSERT INTO learning_time (date, minutes, created_at, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(date) DO UPDATE SET
         minutes = ?,
         updated_at = ?`,
        [date, minutes.toString(), now, now, minutes.toString(), now]
    );

    const result = await executeQuery<LearningTime>(
        'SELECT * FROM learning_time WHERE date = ?',
        [date]
    );
    return result.results[0];
}

// ============================================
// Daily Goals (Habit Tracking)
// ============================================

export interface DailyGoals {
    id: number;
    minutes_goal: number;
    phrases_goal: number;
    vocab_goal: number;
    updated_at: string;
}

export async function initDailyGoalsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS daily_goals (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            minutes_goal INTEGER NOT NULL DEFAULT 30,
            phrases_goal INTEGER NOT NULL DEFAULT 5,
            vocab_goal INTEGER NOT NULL DEFAULT 3,
            updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);
    // Insert default row if not exists
    await executeQuery(`
        INSERT OR IGNORE INTO daily_goals (id, minutes_goal, phrases_goal, vocab_goal, updated_at)
        VALUES (1, 30, 5, 3, datetime('now'))
    `);
}

export async function getDailyGoals(): Promise<DailyGoals> {
    try {
        const result = await executeQuery<DailyGoals>('SELECT * FROM daily_goals WHERE id = 1');
        if (result.results[0]) {
            return result.results[0];
        }
        return { id: 1, minutes_goal: 30, phrases_goal: 5, vocab_goal: 3, updated_at: new Date().toISOString() };
    } catch {
        return { id: 1, minutes_goal: 30, phrases_goal: 5, vocab_goal: 3, updated_at: new Date().toISOString() };
    }
}

export async function setDailyGoals(goals: { minutes_goal?: number; phrases_goal?: number; vocab_goal?: number }): Promise<DailyGoals> {
    const now = new Date().toISOString();
    const current = await getDailyGoals();

    const newMinutes = goals.minutes_goal ?? current.minutes_goal;
    const newPhrases = goals.phrases_goal ?? current.phrases_goal;
    const newVocab = goals.vocab_goal ?? current.vocab_goal;

    await executeQuery(
        `INSERT INTO daily_goals (id, minutes_goal, phrases_goal, vocab_goal, updated_at)
         VALUES (1, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
         minutes_goal = ?,
         phrases_goal = ?,
         vocab_goal = ?,
         updated_at = ?`,
        [newMinutes.toString(), newPhrases.toString(), newVocab.toString(), now,
        newMinutes.toString(), newPhrases.toString(), newVocab.toString(), now]
    );

    return { id: 1, minutes_goal: newMinutes, phrases_goal: newPhrases, vocab_goal: newVocab, updated_at: now };
}

export async function getLearningTimeStats(): Promise<{
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
    streak: number;
    longestStreak: number;
}> {
    try {
        const all = await getAllLearningTime();
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        // Calculate streak (consecutive days with at least 1 minute)
        let streak = 0;
        let longestStreak = 0;
        let currentStreak = 0;

        // Sort by date descending
        const sorted = [...all].sort((a, b) => b.date.localeCompare(a.date));

        // Check if today or yesterday has learning time to start counting streak
        const checkDate = new Date(today);

        for (let i = 0; i < 365; i++) {
            const dateStr = checkDate.toISOString().split('T')[0];
            const record = sorted.find(r => r.date === dateStr);

            if (record && record.minutes > 0) {
                currentStreak++;
                if (i === 0 || streak > 0) {
                    streak = currentStreak;
                }
            } else if (i > 0) {
                // If not the first day (today) and no record, streak breaks
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
                if (streak === 0 && currentStreak > 0) {
                    streak = currentStreak;
                }
                currentStreak = 0;
                if (streak > 0) break; // Stop once we've found the current streak
            }

            checkDate.setDate(checkDate.getDate() - 1);
        }

        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }

        // Calculate totals
        const todayRecord = all.find(r => r.date === todayStr);
        const todayMinutes = todayRecord?.minutes || 0;

        // This week (Monday to Sunday)
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        const mondayStr = monday.toISOString().split('T')[0];

        const thisWeek = all
            .filter(r => r.date >= mondayStr && r.date <= todayStr)
            .reduce((sum, r) => sum + r.minutes, 0);

        // This month
        const monthStart = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
        const thisMonth = all
            .filter(r => r.date >= monthStart && r.date <= todayStr)
            .reduce((sum, r) => sum + r.minutes, 0);

        // Total all time
        const total = all.reduce((sum, r) => sum + r.minutes, 0);

        return {
            today: todayMinutes,
            thisWeek,
            thisMonth,
            total,
            streak,
            longestStreak,
        };
    } catch {
        return { today: 0, thisWeek: 0, thisMonth: 0, total: 0, streak: 0, longestStreak: 0 };
    }
}

// ============================================
// Voice Recordings (User's voice practice)
// ============================================

export interface VoiceRecording {
    id: number;
    phrase_id: string;
    url: string;
    created_at: string;
}

export async function getVoiceRecordings(phraseId: string): Promise<VoiceRecording[]> {
    try {
        const result = await executeQuery<VoiceRecording>(
            'SELECT * FROM voice_recordings WHERE phrase_id = ? ORDER BY created_at DESC',
            [phraseId]
        );
        return result.results;
    } catch {
        return [];
    }
}

export async function getAllVoiceRecordings(): Promise<Record<string, VoiceRecording[]>> {
    try {
        const result = await executeQuery<VoiceRecording>(
            'SELECT * FROM voice_recordings ORDER BY created_at DESC'
        );
        const recordingsMap: Record<string, VoiceRecording[]> = {};
        result.results.forEach(r => {
            if (!recordingsMap[r.phrase_id]) {
                recordingsMap[r.phrase_id] = [];
            }
            recordingsMap[r.phrase_id].push(r);
        });
        return recordingsMap;
    } catch {
        return {};
    }
}

export async function getAllPhraseLinks(): Promise<Record<string, any[]>> {
    try {
        const result = await executeQuery<{ id: string; phrase_id: string; url: string; title: string; created_at: string }>(
            'SELECT * FROM phrase_links ORDER BY created_at DESC'
        );
        const map: Record<string, any[]> = {};
        result.results.forEach(l => {
            if (!map[l.phrase_id]) map[l.phrase_id] = [];
            map[l.phrase_id].push(l);
        });
        return map;
    } catch {
        return {};
    }
}

export async function addVoiceRecording(phraseId: string, url: string): Promise<VoiceRecording> {
    const now = new Date().toISOString();
    await executeQuery(
        'INSERT INTO voice_recordings (phrase_id, url, created_at) VALUES (?, ?, ?)',
        [phraseId, url, now]
    );
    const result = await executeQuery<VoiceRecording>(
        'SELECT * FROM voice_recordings WHERE phrase_id = ? ORDER BY created_at DESC LIMIT 1',
        [phraseId]
    );
    return result.results[0];
}

export async function deleteVoiceRecording(id: number): Promise<void> {
    await executeQuery('DELETE FROM voice_recordings WHERE id = ?', [id.toString()]);
}

// ============================================
// Phrase Clips (movie/PP audio attached to a phrase, stored on R2, synced across devices)
// ============================================

export interface PhraseClip {
    phrase_id: string;
    url: string;
    english: string | null;
    japanese: string | null;
    date: string | null;
    category: string | null;
    created_at: string;
}

export async function initPhraseClipsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS phrase_clips (
            phrase_id TEXT PRIMARY KEY,
            url TEXT NOT NULL,
            english TEXT,
            japanese TEXT,
            date TEXT,
            category TEXT,
            created_at TEXT NOT NULL
        )
    `);
}

export async function getAllPhraseClips(): Promise<PhraseClip[]> {
    try {
        const result = await executeQuery<PhraseClip>(
            'SELECT * FROM phrase_clips ORDER BY created_at DESC'
        );
        return result.results;
    } catch {
        return [];
    }
}

export async function getPhraseClip(phraseId: string): Promise<PhraseClip | null> {
    try {
        const result = await executeQuery<PhraseClip>(
            'SELECT * FROM phrase_clips WHERE phrase_id = ? LIMIT 1',
            [phraseId]
        );
        return result.results[0] || null;
    } catch {
        return null;
    }
}

export async function upsertPhraseClip(
    phraseId: string,
    url: string,
    meta: { english?: string; japanese?: string; date?: string; category?: string }
): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO phrase_clips (phrase_id, url, english, japanese, date, category, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(phrase_id) DO UPDATE SET
            url = excluded.url, english = excluded.english, japanese = excluded.japanese,
            date = excluded.date, category = excluded.category, created_at = excluded.created_at`,
        [phraseId, url, meta.english ?? null, meta.japanese ?? null, meta.date ?? null, meta.category ?? null, now]
    );
}

export async function deletePhraseClip(phraseId: string): Promise<void> {
    await executeQuery('DELETE FROM phrase_clips WHERE phrase_id = ?', [phraseId]);
}

// ============================================================
// Goroku (俺語録) - 31-Day Review System (300 expressions)
// ============================================================

export interface GorokuEntry {
    id: string;
    day_slot: number;       // 1-31 (day of month for review)
    japanese: string;
    english: string[];      // 4 levels: [0]=NEW, [1]=(1), [2]=(2), [3]=OK/REQUIEM
    literal: string | null;
    context: string;
    category: string;
    mastery_level: number;  // 0=NEW, 1=(1), 2=(2), 3=OK
    slot: string | null;        // swappable word in english[1] for pattern practice
    slot_hints: string[] | null; // example replacement words
    created_at: string;
}

// DB stores english and slot_hints as JSON text, parse on read
function parseGorokuRow(row: Record<string, unknown>): GorokuEntry {
    const r = row as unknown as GorokuEntry & { english: unknown; slot_hints: unknown };
    let english: string[];
    if (typeof r.english === 'string') {
        try {
            const parsed = JSON.parse(r.english);
            english = Array.isArray(parsed) ? parsed : [r.english, r.english, r.english, r.english];
        } catch {
            english = [r.english, r.english, r.english, r.english];
        }
    } else {
        english = r.english as string[];
    }
    let slot_hints: string[] | null = null;
    if (typeof r.slot_hints === 'string' && r.slot_hints) {
        try { slot_hints = JSON.parse(r.slot_hints); } catch { /* ignore */ }
    } else if (Array.isArray(r.slot_hints)) {
        slot_hints = r.slot_hints;
    }
    return { ...r, english, slot_hints } as GorokuEntry;
}

export async function initGorokuTable(): Promise<void> {
    await executeQuery('DROP TABLE IF EXISTS goroku');
    await executeQuery(`
        CREATE TABLE goroku (
            id TEXT PRIMARY KEY,
            day_slot INTEGER NOT NULL CHECK(day_slot >= 1 AND day_slot <= 31),
            japanese TEXT NOT NULL,
            english TEXT NOT NULL,
            literal TEXT,
            context TEXT NOT NULL,
            category TEXT NOT NULL,
            mastery_level INTEGER DEFAULT 0,
            slot TEXT,
            slot_hints TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
    await executeQuery('CREATE INDEX idx_goroku_day_slot ON goroku(day_slot)');
    await executeQuery('CREATE INDEX idx_goroku_category ON goroku(category)');
}

export async function getAllGoroku(): Promise<GorokuEntry[]> {
    const result = await executeQuery<Record<string, unknown>>('SELECT * FROM goroku ORDER BY day_slot ASC, id ASC');
    return result.results.map(parseGorokuRow);
}

export async function getGorokuByDaySlot(daySlot: number): Promise<GorokuEntry[]> {
    const result = await executeQuery<Record<string, unknown>>(
        'SELECT * FROM goroku WHERE day_slot = ? ORDER BY id ASC',
        [daySlot.toString()]
    );
    return result.results.map(parseGorokuRow);
}

export async function addGoroku(data: {
    id: string;
    day_slot: number;
    japanese: string;
    english: string[] | string;
    literal?: string;
    context: string;
    category: string;
    slot?: string;
    slotHints?: string[];
}): Promise<GorokuEntry> {
    const now = new Date().toISOString();
    const englishArr = Array.isArray(data.english) ? data.english : [data.english, data.english, data.english, data.english];
    const englishJson = JSON.stringify(englishArr);
    const slotHintsJson = data.slotHints ? JSON.stringify(data.slotHints) : null;
    await executeQuery(
        `INSERT INTO goroku (id, day_slot, japanese, english, literal, context, category, mastery_level, slot, slot_hints, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`,
        [data.id, data.day_slot.toString(), data.japanese, englishJson, data.literal || '', data.context, data.category, data.slot || '', slotHintsJson || '', now]
    );
    return {
        id: data.id,
        day_slot: data.day_slot,
        japanese: data.japanese,
        english: englishArr,
        literal: data.literal || null,
        context: data.context,
        category: data.category,
        mastery_level: 0,
        slot: data.slot || null,
        slot_hints: data.slotHints || null,
        created_at: now,
    };
}

export async function updateGoroku(id: string, data: Partial<{
    japanese: string;
    english: string[] | string;
    literal: string;
    context: string;
    category: string;
    mastery_level: number;
}>): Promise<void> {
    const updates: string[] = [];
    const values: string[] = [];
    if (data.japanese !== undefined) { updates.push('japanese = ?'); values.push(data.japanese); }
    if (data.english !== undefined) {
        const englishJson = Array.isArray(data.english) ? JSON.stringify(data.english) : data.english;
        updates.push('english = ?'); values.push(englishJson);
    }
    if (data.literal !== undefined) { updates.push('literal = ?'); values.push(data.literal); }
    if (data.context !== undefined) { updates.push('context = ?'); values.push(data.context); }
    if (data.category !== undefined) { updates.push('category = ?'); values.push(data.category); }
    if (data.mastery_level !== undefined) { updates.push('mastery_level = ?'); values.push(data.mastery_level.toString()); }
    if (updates.length === 0) return;
    values.push(id);
    await executeQuery(`UPDATE goroku SET ${updates.join(', ')} WHERE id = ?`, values);
}

export async function deleteGoroku(id: string): Promise<void> {
    await executeQuery('DELETE FROM goroku WHERE id = ?', [id]);
}

// Review counts: daily mastery level-up taps + XP
export async function initReviewCountsTable(): Promise<void> {
    await executeQuery(
        `CREATE TABLE IF NOT EXISTS review_counts (
            date TEXT PRIMARY KEY,
            count INTEGER DEFAULT 0,
            xp INTEGER DEFAULT 0
        )`
    );
    // Add xp column if missing (migration for existing tables)
    try {
        await executeQuery(`ALTER TABLE review_counts ADD COLUMN xp INTEGER DEFAULT 0`);
    } catch {
        // column already exists
    }
    try {
        await executeQuery(`ALTER TABLE review_counts ADD COLUMN sparks INTEGER DEFAULT 0`);
    } catch {
        // column already exists
    }
}

export async function getReviewCount(date: string): Promise<{ count: number; xp: number; sparks: number }> {
    const result = await executeQuery<{ count: number; xp: number; sparks: number }>(
        `SELECT count, COALESCE(xp, 0) as xp, COALESCE(sparks, 0) as sparks FROM review_counts WHERE date = ?`,
        [date]
    );
    return result.results[0] || { count: 0, xp: 0, sparks: 0 };
}

export async function incrementReviewCount(date: string, xpGained: number = 0, sparksGained: number = 0): Promise<{ count: number; xp: number; sparks: number }> {
    await executeQuery(
        `INSERT INTO review_counts (date, count, xp, sparks) VALUES (?, 1, ?, ?)
         ON CONFLICT(date) DO UPDATE SET count = count + 1, xp = xp + ?, sparks = sparks + ?`,
        [date, xpGained, sparksGained, xpGained, sparksGained]
    );
    const result = await executeQuery<{ count: number; xp: number; sparks: number }>(
        `SELECT count, COALESCE(xp, 0) as xp, COALESCE(sparks, 0) as sparks FROM review_counts WHERE date = ?`,
        [date]
    );
    return result.results[0] || { count: 0, xp: 0, sparks: 0 };
}

export async function getMonthlyReviewCounts(yearMonth: string): Promise<Record<string, { count: number; xp: number; sparks: number }>> {
    const result = await executeQuery<{ date: string; count: number; xp: number; sparks: number }>(
        `SELECT date, count, COALESCE(xp, 0) as xp, COALESCE(sparks, 0) as sparks FROM review_counts WHERE date LIKE ?`,
        [`${yearMonth}%`]
    );
    const map: Record<string, { count: number; xp: number; sparks: number }> = {};
    for (const row of result.results) {
        map[row.date] = { count: row.count, xp: row.xp, sparks: row.sparks };
    }
    return map;
}

// Player stats: cumulative XP + level tracking + bonus system
export async function initPlayerStatsTable(): Promise<void> {
    await executeQuery(
        `CREATE TABLE IF NOT EXISTS player_stats (
            id TEXT PRIMARY KEY DEFAULT 'default',
            total_xp INTEGER DEFAULT 0,
            total_touches INTEGER DEFAULT 0,
            updated_at TEXT DEFAULT (datetime('now'))
        )`
    );
    // Ensure row exists
    await executeQuery(
        `INSERT OR IGNORE INTO player_stats (id, total_xp, total_touches) VALUES ('default', 0, 0)`
    );
    // Phase 4 migration: bonus system columns
    try { await executeQuery(`ALTER TABLE player_stats ADD COLUMN sparks INTEGER DEFAULT 0`); } catch { /* exists */ }
    try { await executeQuery(`ALTER TABLE player_stats ADD COLUMN pity_counter INTEGER DEFAULT 0`); } catch { /* exists */ }
    try { await executeQuery(`ALTER TABLE player_stats ADD COLUMN legendary_count INTEGER DEFAULT 0`); } catch { /* exists */ }
}

export async function getPlayerStats(): Promise<{
    total_xp: number; total_touches: number;
    sparks: number; pity_counter: number; legendary_count: number;
}> {
    const result = await executeQuery<{
        total_xp: number; total_touches: number;
        sparks: number; pity_counter: number; legendary_count: number;
    }>(
        `SELECT total_xp, total_touches,
                COALESCE(sparks, 0) as sparks,
                COALESCE(pity_counter, 0) as pity_counter,
                COALESCE(legendary_count, 0) as legendary_count
         FROM player_stats WHERE id = 'default'`
    );
    return result.results[0] || { total_xp: 0, total_touches: 0, sparks: 0, pity_counter: 0, legendary_count: 0 };
}

export async function addPlayerXP(xp: number): Promise<{ total_xp: number; total_touches: number; sparks: number; pity_counter: number; legendary_count: number }> {
    await executeQuery(
        `INSERT INTO player_stats (id, total_xp, total_touches) VALUES ('default', ?, 1)
         ON CONFLICT(id) DO UPDATE SET total_xp = total_xp + ?, total_touches = total_touches + 1, updated_at = datetime('now')`,
        [xp.toString(), xp.toString()]
    );
    return getPlayerStats();
}

// Gacha probability table (cumulative thresholds)
type GachaTier = 'MISS' | 'BONUS' | 'GREAT' | 'SUPER' | 'MEGA' | 'LEGENDARY' | 'MYTHIC' | 'SHINY' | 'PHANTOM';

// Chain tier for 連荘 system: 0=normal, 1=kakuhen(確変), 2=gekiatsu(激熱), 3=god(神)
type ChainTier = 0 | 1 | 2 | 3;

type GachaEntry = { tier: GachaTier; threshold: number; sparks: number };

// Normal mode (chain 0-2)
const GACHA_TABLE: GachaEntry[] = [
    { tier: 'PHANTOM',   threshold: 0.00012, sparks: 2000 },
    { tier: 'SHINY',     threshold: 0.00036, sparks: 500 },
    { tier: 'MYTHIC',    threshold: 0.00286, sparks: 100 },
    { tier: 'LEGENDARY', threshold: 0.00786, sparks: 30 },
    { tier: 'MEGA',      threshold: 0.02786, sparks: 10 },
    { tier: 'SUPER',     threshold: 0.07786, sparks: 5 },
    { tier: 'GREAT',     threshold: 0.17786, sparks: 3 },
    { tier: 'BONUS',     threshold: 0.39786, sparks: 2 },
    { tier: 'MISS',      threshold: 1.000,   sparks: 1 },
];

// 確変 mode (chain 3-4): MISS drops to 40%, ultra-rares x2
const GACHA_TABLE_KAKUHEN: GachaEntry[] = [
    { tier: 'PHANTOM',   threshold: 0.0004,  sparks: 2000 },  // 0.04%
    { tier: 'SHINY',     threshold: 0.0012,  sparks: 500 },   // 0.08%
    { tier: 'MYTHIC',    threshold: 0.0212,  sparks: 100 },   // 2.0%
    { tier: 'LEGENDARY', threshold: 0.0562,  sparks: 30 },    // 3.5%
    { tier: 'MEGA',      threshold: 0.1262,  sparks: 10 },    // 7.0%
    { tier: 'SUPER',     threshold: 0.2262,  sparks: 5 },     // 10.0%
    { tier: 'GREAT',     threshold: 0.4262,  sparks: 3 },     // 20.0%
    { tier: 'BONUS',     threshold: 0.8000,  sparks: 2 },     // 37.4%
    { tier: 'MISS',      threshold: 1.000,   sparks: 1 },     // 20.0%
];

// 激熱 mode (chain 5-9): MISS drops to 25%, ultra-rares x5
const GACHA_TABLE_GEKIATSU: GachaEntry[] = [
    { tier: 'PHANTOM',   threshold: 0.0006,  sparks: 2000 },
    { tier: 'SHINY',     threshold: 0.0018,  sparks: 500 },
    { tier: 'MYTHIC',    threshold: 0.0143,  sparks: 100 },
    { tier: 'LEGENDARY', threshold: 0.0393,  sparks: 30 },
    { tier: 'MEGA',      threshold: 0.1093,  sparks: 10 },
    { tier: 'SUPER',     threshold: 0.2093,  sparks: 5 },
    { tier: 'GREAT',     threshold: 0.4093,  sparks: 3 },
    { tier: 'BONUS',     threshold: 0.7500,  sparks: 2 },
    { tier: 'MISS',      threshold: 1.000,   sparks: 1 },
];

// 神 mode (chain 10+): MISS drops to 15%, ultra-rares x10
const GACHA_TABLE_GOD: GachaEntry[] = [
    { tier: 'PHANTOM',   threshold: 0.0012,  sparks: 2000 },
    { tier: 'SHINY',     threshold: 0.0036,  sparks: 500 },
    { tier: 'MYTHIC',    threshold: 0.0286,  sparks: 100 },
    { tier: 'LEGENDARY', threshold: 0.0786,  sparks: 30 },
    { tier: 'MEGA',      threshold: 0.1786,  sparks: 10 },
    { tier: 'SUPER',     threshold: 0.2786,  sparks: 5 },
    { tier: 'GREAT',     threshold: 0.4786,  sparks: 3 },
    { tier: 'BONUS',     threshold: 0.8500,  sparks: 2 },
    { tier: 'MISS',      threshold: 1.000,   sparks: 1 },
];

const CHAIN_TABLES: Record<ChainTier, GachaEntry[]> = {
    0: GACHA_TABLE,
    1: GACHA_TABLE_KAKUHEN,
    2: GACHA_TABLE_GEKIATSU,
    3: GACHA_TABLE_GOD,
};

export interface GachaResult {
    tier: GachaTier;
    sparks_won: number;
    total_sparks: number;
    pity_counter: number;
    legendary_count: number;
    total_xp: number;
    total_touches: number;
    card_points_earned: number;
    card_total_points: number;
    luck_multiplier: number;
}

export async function rollGachaAndUpdate(xp: number, phraseId?: string, fever?: boolean, chainTier?: ChainTier): Promise<GachaResult> {
    // 1. Add XP + increment touches
    await executeQuery(
        `INSERT INTO player_stats (id, total_xp, total_touches) VALUES ('default', ?, 1)
         ON CONFLICT(id) DO UPDATE SET total_xp = total_xp + ?, total_touches = total_touches + 1, updated_at = datetime('now')`,
        [xp.toString(), xp.toString()]
    );

    // 2. Read current pity_counter + sparks (for luck modifier)
    let stats;
    try {
        stats = await getPlayerStats();
    } catch {
        await initPlayerStatsTable();
        stats = await getPlayerStats();
    }
    const pity = stats.pity_counter;

    // 3. Select probability table based on chain tier
    // Backward compat: if fever=true but no chainTier, map to kakuhen (chain tier 1)
    const ct: ChainTier = chainTier !== undefined ? chainTier : (fever ? 1 : 0);
    const table = CHAIN_TABLES[ct] || GACHA_TABLE;

    // 4. Progressive luck: more Card XP = better ultra-rare odds (MYTHIC/SHINY/PHANTOM only)
    // Based on total card_points across all phrases (英語やれば運が良くなる)
    const totalCardXPResult = await executeQuery<{ total: number }>(
        'SELECT COALESCE(SUM(card_points), 0) as total FROM phrase_mastery'
    );
    const totalCardXP = totalCardXPResult.results[0]?.total || 0;
    // LUCK tiers: 0→x1.0, 500→x1.2, 2000→x1.5, 10000→x2.0, 50000→x3.0
    const LUCK_TIERS = [
        { threshold: 50000, multiplier: 3.0 },
        { threshold: 10000, multiplier: 2.0 },
        { threshold: 2000,  multiplier: 1.5 },
        { threshold: 500,   multiplier: 1.2 },
    ];
    let luckMultiplier = 1.0;
    for (const tier of LUCK_TIERS) {
        if (totalCardXP >= tier.threshold) { luckMultiplier = tier.multiplier; break; }
    }

    // Apply luck boost to ultra-rare tiers (first 3 entries)
    const boostedTable: GachaEntry[] = table.map((entry, i) => {
        if (i < 3 && luckMultiplier > 1) {
            // Boost PHANTOM/SHINY/MYTHIC thresholds
            const prevThreshold = i === 0 ? 0 : table[i - 1].threshold;
            const sliceWidth = entry.threshold - prevThreshold;
            const boostedWidth = sliceWidth * luckMultiplier;
            return { ...entry, threshold: prevThreshold + boostedWidth };
        }
        return entry;
    });
    // Recalculate cumulative thresholds after boosting ultra-rares
    // The boost expands ultra-rare slices, pushing everything else up proportionally
    // Normalize so MISS still fills to 1.0
    const finalTable: GachaEntry[] = [];
    let cumulative = 0;
    for (let i = 0; i < boostedTable.length; i++) {
        const prevCum = i === 0 ? 0 : table[i - 1].threshold;
        const origWidth = table[i].threshold - prevCum;
        const entry = boostedTable[i];
        const boostedPrev = i === 0 ? 0 : finalTable[i - 1].threshold;
        if (i < 3) {
            // Ultra-rare: use boosted width
            cumulative = boostedPrev + (entry.threshold - (i === 0 ? 0 : boostedTable[i - 1].threshold));
        } else if (i === boostedTable.length - 1) {
            cumulative = 1.0; // MISS always fills to 1.0
        } else {
            // Scale remaining tiers to fit
            const ultraRareTotal = finalTable.length >= 3 ? finalTable[2].threshold : 0;
            const origUltraTotal = table[2].threshold;
            const remainingSpace = 1.0 - ultraRareTotal;
            const origRemaining = 1.0 - origUltraTotal;
            const scale = origRemaining > 0 ? remainingSpace / origRemaining : 1;
            cumulative = ultraRareTotal + (table[i].threshold - origUltraTotal) * scale;
        }
        finalTable.push({ ...table[i], threshold: cumulative, sparks: table[i].sparks });
        if (i < 3) finalTable[i].threshold = cumulative;
    }

    let roll = Math.random();
    // Pity ceiling: 200 consecutive misses -> guaranteed MEGA+
    if (pity >= 200) {
        roll = Math.random() * (finalTable.find(e => e.tier === 'MEGA')?.threshold || 0.03);
    }

    let tier: GachaTier = 'MISS';
    let sparksWon = 1;
    for (const entry of finalTable) {
        if (roll < entry.threshold) {
            tier = entry.tier;
            sparksWon = entry.sparks;
            break;
        }
    }

    // Chain mode SP multiplier: kakuhen x1.5, gekiatsu x2, god x3
    const chainMultipliers: Record<ChainTier, number> = { 0: 1, 1: 1.5, 2: 2, 3: 3 };
    if (ct > 0 && tier !== 'MISS') {
        sparksWon = Math.round(sparksWon * chainMultipliers[ct]);
    }

    // 5. Update sparks, pity_counter, legendary_count
    const isMiss = tier === 'MISS';
    const legendaryInc = (tier === 'LEGENDARY' || tier === 'MYTHIC' || tier === 'SHINY' || tier === 'PHANTOM') ? 1 : 0;

    try {
        await executeQuery(
            `UPDATE player_stats SET
                sparks = COALESCE(sparks, 0) + ?,
                pity_counter = ${isMiss ? 'COALESCE(pity_counter, 0) + 1' : '0'},
                legendary_count = COALESCE(legendary_count, 0) + ?,
                updated_at = datetime('now')
             WHERE id = 'default'`,
            [sparksWon.toString(), legendaryInc.toString()]
        );
    } catch {
        await initPlayerStatsTable();
        await executeQuery(
            `UPDATE player_stats SET
                sparks = COALESCE(sparks, 0) + ?,
                pity_counter = ${isMiss ? 'COALESCE(pity_counter, 0) + 1' : '0'},
                legendary_count = COALESCE(legendary_count, 0) + ?,
                updated_at = datetime('now')
             WHERE id = 'default'`,
            [sparksWon.toString(), legendaryInc.toString()]
        );
    }

    // 5. Add card points to phrase if phraseId provided
    let cardPointsEarned = sparksWon;
    let cardTotalPoints = 0;
    if (phraseId) {
        cardTotalPoints = await addCardPoints(phraseId, sparksWon);
    }

    // 7. Return full state
    const updated = await getPlayerStats();
    return {
        tier,
        sparks_won: sparksWon,
        total_sparks: updated.sparks,
        pity_counter: updated.pity_counter,
        legendary_count: updated.legendary_count,
        total_xp: updated.total_xp,
        total_touches: updated.total_touches,
        card_points_earned: cardPointsEarned,
        card_total_points: cardTotalPoints,
        luck_multiplier: Math.round(luckMultiplier * 100) / 100,
    };
}

// ============================================
// Date Touches (Calendar touch persistence)
// ============================================

export async function initDateTouchesTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS date_touches (
            phrase_date TEXT PRIMARY KEY,
            count INTEGER DEFAULT 0
        )
    `);
}

export async function incrementDateTouch(phraseDate: string): Promise<number> {
    await executeQuery(
        `INSERT INTO date_touches (phrase_date, count) VALUES (?, 1)
         ON CONFLICT(phrase_date) DO UPDATE SET count = count + 1`,
        [phraseDate]
    );
    const result = await executeQuery<{ count: number }>(
        `SELECT count FROM date_touches WHERE phrase_date = ?`,
        [phraseDate]
    );
    return result.results[0]?.count || 1;
}

export async function getMonthlyDateTouches(yearMonth: string): Promise<Record<string, number>> {
    const result = await executeQuery<{ phrase_date: string; count: number }>(
        `SELECT phrase_date, count FROM date_touches WHERE phrase_date LIKE ?`,
        [`${yearMonth}%`]
    );
    const map: Record<string, number> = {};
    for (const row of result.results) {
        map[row.phrase_date] = row.count;
    }
    return map;
}

export async function getGorokuDaySlotCounts(): Promise<Record<number, { total: number; mastered: number }>> {
    const result = await executeQuery<{ day_slot: number; total: number; mastered: number }>(
        `SELECT day_slot, COUNT(*) as total, SUM(CASE WHEN mastery_level >= 3 THEN 1 ELSE 0 END) as mastered
         FROM goroku GROUP BY day_slot ORDER BY day_slot`
    );
    const map: Record<number, { total: number; mastered: number }> = {};
    result.results.forEach(r => { map[r.day_slot] = { total: r.total, mastered: r.mastered }; });
    return map;
}

// ============================================
// User Words (Personal Vocabulary Collection)
// ============================================

export interface UserWord {
    id: string;
    english: string;
    pronunciation: string | null;
    japanese: string;
    note: string | null;
    category: string | null;
    mastery_level: number;      // 0-3 (same as phrases)
    card_points: number;
    card_name: string | null;
    created_at: string;
    last_reviewed_at: string | null;
    last_leveled_at: string | null;
}

export async function initUserWordsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS user_words (
            id TEXT PRIMARY KEY,
            english TEXT NOT NULL UNIQUE,
            pronunciation TEXT,
            japanese TEXT NOT NULL,
            note TEXT,
            category TEXT,
            mastery_level INTEGER NOT NULL DEFAULT 0,
            card_points INTEGER NOT NULL DEFAULT 0,
            card_name TEXT,
            created_at TEXT NOT NULL,
            last_reviewed_at TEXT,
            last_leveled_at TEXT
        )
    `);
}

export async function getAllUserWords(): Promise<UserWord[]> {
    try {
        const result = await executeQuery<UserWord>(
            'SELECT * FROM user_words ORDER BY created_at DESC'
        );
        return result.results;
    } catch (error) {
        console.error('Error getting user words:', error);
        return [];
    }
}

export async function getUserWordByEnglish(english: string): Promise<UserWord | null> {
    try {
        const result = await executeQuery<UserWord>(
            'SELECT * FROM user_words WHERE LOWER(english) = LOWER(?)',
            [english]
        );
        return result.results[0] || null;
    } catch {
        return null;
    }
}

export async function addUserWord(data: {
    id: string;
    english: string;
    pronunciation?: string;
    japanese: string;
    note?: string;
    category?: string;
}): Promise<UserWord> {
    const now = new Date().toISOString();

    await executeQuery(
        `INSERT INTO user_words (id, english, pronunciation, japanese, note, category, mastery_level, card_points, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?)
         ON CONFLICT(english) DO UPDATE SET
         pronunciation = COALESCE(?, pronunciation),
         japanese = ?,
         note = COALESCE(?, note),
         category = COALESCE(?, category)`,
        [
            data.id, data.english, data.pronunciation || null, data.japanese,
            data.note || null, data.category || null, now,
            data.pronunciation || null, data.japanese, data.note || null, data.category || null
        ]
    );

    return {
        id: data.id,
        english: data.english,
        pronunciation: data.pronunciation || null,
        japanese: data.japanese,
        note: data.note || null,
        category: data.category || null,
        mastery_level: 0,
        card_points: 0,
        card_name: null,
        created_at: now,
        last_reviewed_at: null,
        last_leveled_at: null,
    };
}

export async function updateUserWordMastery(wordId: string, level: number): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `UPDATE user_words SET mastery_level = ?, last_reviewed_at = ?, last_leveled_at = ? WHERE id = ?`,
        [level.toString(), now, now, wordId]
    );
}

export async function addUserWordCardPoints(wordId: string, points: number): Promise<number> {
    await executeQuery(
        `UPDATE user_words SET card_points = card_points + ? WHERE id = ?`,
        [points.toString(), wordId]
    );
    const result = await executeQuery<{ card_points: number }>(
        'SELECT card_points FROM user_words WHERE id = ?',
        [wordId]
    );
    return result.results[0]?.card_points || 0;
}

export async function setUserWordCardName(wordId: string, name: string | null): Promise<void> {
    await executeQuery(
        'UPDATE user_words SET card_name = ? WHERE id = ?',
        [name, wordId]
    );
}

export async function deleteUserWord(id: string): Promise<void> {
    await executeQuery('DELETE FROM user_words WHERE id = ?', [id]);
}

export async function updateUserWordContent(id: string, data: {
    english?: string;
    japanese?: string;
}): Promise<void> {
    const updates: string[] = [];
    const values: (string | null)[] = [];
    if (data.english !== undefined) { updates.push('english = ?'); values.push(data.english); }
    if (data.japanese !== undefined) { updates.push('japanese = ?'); values.push(data.japanese); }
    if (updates.length > 0) {
        values.push(id);
        await executeQuery(`UPDATE user_words SET ${updates.join(', ')} WHERE id = ?`, values);
    }
}

// ── Everyday Words Progress ──────────────────────────────────

export async function initEwProgressTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS ew_progress (
            uid TEXT PRIMARY KEY,
            learned_at TEXT NOT NULL
        )
    `);
}

export async function getEwLearnedUids(): Promise<string[]> {
    try {
        const result = await executeQuery<{ uid: string }>(
            'SELECT uid FROM ew_progress'
        );
        return result.results.map(r => r.uid);
    } catch {
        return [];
    }
}

export async function setEwLearned(uid: string): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        'INSERT INTO ew_progress (uid, learned_at) VALUES (?, ?) ON CONFLICT(uid) DO NOTHING',
        [uid, now]
    );
}

export async function removeEwLearned(uid: string): Promise<void> {
    await executeQuery('DELETE FROM ew_progress WHERE uid = ?', [uid]);
}

export async function setEwLearnedBulk(uids: string[]): Promise<void> {
    if (uids.length === 0) return;
    const now = new Date().toISOString();
    // Batch insert in chunks of 50
    for (let i = 0; i < uids.length; i += 50) {
        const chunk = uids.slice(i, i + 50);
        const placeholders = chunk.map(() => '(?, ?)').join(', ');
        const params: string[] = [];
        chunk.forEach(uid => { params.push(uid, now); });
        await executeQuery(
            `INSERT INTO ew_progress (uid, learned_at) VALUES ${placeholders} ON CONFLICT(uid) DO NOTHING`,
            params
        );
    }
}

export async function getUserWordMasteryMap(): Promise<{
    mastery: Record<string, number>;
    lastLeveled: Record<string, string>;
    cardPoints: Record<string, number>;
}> {
    try {
        const result = await executeQuery<UserWord>(
            'SELECT id, mastery_level, last_leveled_at, card_points FROM user_words'
        );
        const mastery: Record<string, number> = {};
        const lastLeveled: Record<string, string> = {};
        const cardPoints: Record<string, number> = {};
        result.results.forEach(w => {
            mastery[w.id] = w.mastery_level;
            if (w.last_leveled_at) lastLeveled[w.id] = w.last_leveled_at;
            cardPoints[w.id] = w.card_points || 0;
        });
        return { mastery, lastLeveled, cardPoints };
    } catch {
        return { mastery: {}, lastLeveled: {}, cardPoints: {} };
    }
}

// ============================================
// Eikaiwa Log (Lesson Session Tracking)
// ============================================

export interface EikaiwaLog {
    id: string;
    session_id: number;          // lesson plan id (1-15)
    session_date: string;        // YYYY-MM-DD
    highlights: string[];        // parsed from JSON TEXT
    struggle_points: string[];   // parsed from JSON TEXT
    flow_rating: number | null;  // 1-5
    note: string;                // freeform
    goroku_ids: string[];        // goroku IDs extracted from this session
    created_at: string;
}

function parseEikaiwaLogRow(row: Record<string, unknown>): EikaiwaLog {
    const r = row as unknown as EikaiwaLog & { highlights: unknown; struggle_points: unknown; goroku_ids: unknown };
    let highlights: string[] = [];
    if (typeof r.highlights === 'string') {
        try { highlights = JSON.parse(r.highlights); } catch { highlights = []; }
    } else if (Array.isArray(r.highlights)) {
        highlights = r.highlights;
    }
    let struggle_points: string[] = [];
    if (typeof r.struggle_points === 'string') {
        try { struggle_points = JSON.parse(r.struggle_points); } catch { struggle_points = []; }
    } else if (Array.isArray(r.struggle_points)) {
        struggle_points = r.struggle_points;
    }
    let goroku_ids: string[] = [];
    if (typeof r.goroku_ids === 'string') {
        try { goroku_ids = JSON.parse(r.goroku_ids); } catch { goroku_ids = []; }
    } else if (Array.isArray(r.goroku_ids)) {
        goroku_ids = r.goroku_ids;
    }
    return { ...r, highlights, struggle_points, goroku_ids } as EikaiwaLog;
}

export async function initEikaiwaLogTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS eikaiwa_log (
            id TEXT PRIMARY KEY,
            session_id INTEGER NOT NULL,
            session_date TEXT NOT NULL,
            highlights TEXT DEFAULT '[]',
            struggle_points TEXT DEFAULT '[]',
            flow_rating INTEGER,
            note TEXT DEFAULT '',
            goroku_ids TEXT DEFAULT '[]',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);
    await executeQuery('CREATE INDEX IF NOT EXISTS idx_eikaiwa_log_session_date ON eikaiwa_log(session_date)');
}

export async function getAllEikaiwaLogs(): Promise<EikaiwaLog[]> {
    const result = await executeQuery<Record<string, unknown>>('SELECT * FROM eikaiwa_log ORDER BY session_date DESC, created_at DESC');
    return result.results.map(parseEikaiwaLogRow);
}

export async function addEikaiwaLog(data: {
    id: string;
    session_id: number;
    session_date: string;
    highlights?: string[];
    struggle_points?: string[];
    flow_rating?: number | null;
    note?: string;
    goroku_ids?: string[];
}): Promise<EikaiwaLog> {
    const now = new Date().toISOString();
    const highlightsJson = JSON.stringify(data.highlights || []);
    const strugglePointsJson = JSON.stringify(data.struggle_points || []);
    const gorokuIdsJson = JSON.stringify(data.goroku_ids || []);
    await executeQuery(
        `INSERT INTO eikaiwa_log (id, session_id, session_date, highlights, struggle_points, flow_rating, note, goroku_ids, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.id, data.session_id.toString(), data.session_date, highlightsJson, strugglePointsJson, data.flow_rating?.toString() || null, data.note || '', gorokuIdsJson, now]
    );
    return {
        id: data.id,
        session_id: data.session_id,
        session_date: data.session_date,
        highlights: data.highlights || [],
        struggle_points: data.struggle_points || [],
        flow_rating: data.flow_rating ?? null,
        note: data.note || '',
        goroku_ids: data.goroku_ids || [],
        created_at: now,
    };
}

export async function updateEikaiwaLog(id: string, data: Partial<{
    session_id: number;
    session_date: string;
    highlights: string[];
    struggle_points: string[];
    flow_rating: number | null;
    note: string;
    goroku_ids: string[];
}>): Promise<void> {
    const updates: string[] = [];
    const values: (string | null)[] = [];
    if (data.session_id !== undefined) { updates.push('session_id = ?'); values.push(data.session_id.toString()); }
    if (data.session_date !== undefined) { updates.push('session_date = ?'); values.push(data.session_date); }
    if (data.highlights !== undefined) { updates.push('highlights = ?'); values.push(JSON.stringify(data.highlights)); }
    if (data.struggle_points !== undefined) { updates.push('struggle_points = ?'); values.push(JSON.stringify(data.struggle_points)); }
    if (data.flow_rating !== undefined) { updates.push('flow_rating = ?'); values.push(data.flow_rating?.toString() || null); }
    if (data.note !== undefined) { updates.push('note = ?'); values.push(data.note); }
    if (data.goroku_ids !== undefined) { updates.push('goroku_ids = ?'); values.push(JSON.stringify(data.goroku_ids)); }
    if (updates.length === 0) return;
    values.push(id);
    await executeQuery(`UPDATE eikaiwa_log SET ${updates.join(', ')} WHERE id = ?`, values);
}

// ============================================
// Training Sessions (Time Attack)
// ============================================

export interface TrainingSession {
    id: number;
    date: string;
    duration_preset: number; // seconds chosen (300, 600, 1800, 3600)
    duration_actual: number; // seconds actually spent
    cards_reviewed: number;
    xp_earned: number;
    level_ups: number;
    max_chain: number;
    grade: string; // S, A, B, C, D
    cards_per_minute: number;
    completed: number; // 1 = ran full time, 0 = stopped early
    created_at: string;
}

export async function initTrainingSessionsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS training_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            duration_preset INTEGER NOT NULL,
            duration_actual INTEGER NOT NULL,
            cards_reviewed INTEGER NOT NULL DEFAULT 0,
            xp_earned INTEGER NOT NULL DEFAULT 0,
            level_ups INTEGER NOT NULL DEFAULT 0,
            max_chain INTEGER NOT NULL DEFAULT 0,
            grade TEXT NOT NULL DEFAULT 'D',
            cards_per_minute REAL NOT NULL DEFAULT 0,
            completed INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    `);
}

export async function saveTrainingSession(session: Omit<TrainingSession, 'id' | 'created_at'>): Promise<TrainingSession> {
    const result = await executeQuery<TrainingSession>(
        `INSERT INTO training_sessions (date, duration_preset, duration_actual, cards_reviewed, xp_earned, level_ups, max_chain, grade, cards_per_minute, completed)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            session.date,
            session.duration_preset.toString(),
            session.duration_actual.toString(),
            session.cards_reviewed.toString(),
            session.xp_earned.toString(),
            session.level_ups.toString(),
            session.max_chain.toString(),
            session.grade,
            session.cards_per_minute.toString(),
            session.completed.toString(),
        ]
    );
    // Return the inserted row
    const inserted = await executeQuery<TrainingSession>(
        'SELECT * FROM training_sessions ORDER BY id DESC LIMIT 1'
    );
    return inserted.results[0];
}

export async function getTrainingSessions(limit = 50): Promise<TrainingSession[]> {
    const result = await executeQuery<TrainingSession>(
        'SELECT * FROM training_sessions ORDER BY created_at DESC LIMIT ?',
        [limit.toString()]
    );
    return result.results;
}

export async function getTrainingSessionStats(): Promise<{
    total_sessions: number;
    total_cards: number;
    total_time: number;
    best_cards_per_minute: number;
    best_cards_in_session: number;
    s_rank_count: number;
    longest_chain: number;
    streak_days: number;
    records_by_preset: Record<number, { best_cards: number; best_grade: string; best_cpm: number }>;
}> {
    const allSessions = await executeQuery<TrainingSession>(
        'SELECT * FROM training_sessions ORDER BY created_at DESC'
    );
    const sessions = allSessions.results;

    if (sessions.length === 0) {
        return {
            total_sessions: 0, total_cards: 0, total_time: 0,
            best_cards_per_minute: 0, best_cards_in_session: 0,
            s_rank_count: 0, longest_chain: 0, streak_days: 0,
            records_by_preset: {},
        };
    }

    let totalCards = 0, totalTime = 0, bestCPM = 0, bestCards = 0, sRanks = 0, longestChain = 0;
    const recordsByPreset: Record<number, { best_cards: number; best_grade: string; best_cpm: number }> = {};
    const uniqueDates = new Set<string>();

    for (const s of sessions) {
        totalCards += s.cards_reviewed;
        totalTime += s.duration_actual;
        if (s.cards_per_minute > bestCPM) bestCPM = s.cards_per_minute;
        if (s.cards_reviewed > bestCards) bestCards = s.cards_reviewed;
        if (s.grade === 'S') sRanks++;
        if (s.max_chain > longestChain) longestChain = s.max_chain;
        uniqueDates.add(s.date);

        const preset = s.duration_preset;
        if (!recordsByPreset[preset]) {
            recordsByPreset[preset] = { best_cards: 0, best_grade: 'D', best_cpm: 0 };
        }
        const rec = recordsByPreset[preset];
        if (s.cards_reviewed > rec.best_cards) rec.best_cards = s.cards_reviewed;
        if (s.cards_per_minute > rec.best_cpm) rec.best_cpm = s.cards_per_minute;
        const gradeOrder = ['D', 'C', 'B', 'A', 'S'];
        if (gradeOrder.indexOf(s.grade) > gradeOrder.indexOf(rec.best_grade)) rec.best_grade = s.grade;
    }

    // Calculate streak (consecutive days)
    const sortedDates = [...uniqueDates].sort().reverse();
    let streakDays = 0;
    const today = new Date().toISOString().split('T')[0];
    let checkDate = today;
    for (const d of sortedDates) {
        if (d === checkDate) {
            streakDays++;
            const prev = new Date(checkDate);
            prev.setDate(prev.getDate() - 1);
            checkDate = prev.toISOString().split('T')[0];
        } else if (d < checkDate) {
            break;
        }
    }

    return {
        total_sessions: sessions.length,
        total_cards: totalCards,
        total_time: totalTime,
        best_cards_per_minute: Math.round(bestCPM * 10) / 10,
        best_cards_in_session: bestCards,
        s_rank_count: sRanks,
        longest_chain: longestChain,
        streak_days: streakDays,
        records_by_preset: recordsByPreset,
    };
}

export async function deleteEikaiwaLog(id: string): Promise<void> {
    await executeQuery('DELETE FROM eikaiwa_log WHERE id = ?', [id]);
}

export async function getEikaiwaLogStats(): Promise<{ total: number; sessions: Record<number, number> }> {
    const result = await executeQuery<{ session_id: number; cnt: number }>(
        'SELECT session_id, COUNT(*) as cnt FROM eikaiwa_log GROUP BY session_id'
    );
    const sessions: Record<number, number> = {};
    let total = 0;
    result.results.forEach(r => {
        sessions[r.session_id] = r.cnt;
        total += r.cnt;
    });
    return { total, sessions };
}

// ============================================================
// Forge Card Usage
// ============================================================

export interface ForgeCardUsage {
    id: string;
    card_english: string;
    card_japanese: string;
    forge_id: string;
    forge_title: string;
    forge_type: string;
    created_at: string;
}

export async function initForgeUsageTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS forge_card_usage (
            id TEXT PRIMARY KEY,
            card_english TEXT NOT NULL,
            card_japanese TEXT NOT NULL,
            forge_id TEXT NOT NULL,
            forge_title TEXT NOT NULL,
            forge_type TEXT NOT NULL,
            created_at TEXT NOT NULL,
            UNIQUE(forge_id, card_english)
        )
    `);
}

export async function getAllForgeUsage(): Promise<ForgeCardUsage[]> {
    try {
        const result = await executeQuery<ForgeCardUsage>(
            'SELECT * FROM forge_card_usage ORDER BY created_at DESC'
        );
        return result.results;
    } catch {
        return [];
    }
}

export async function addForgeUsage(data: {
    id: string;
    card_english: string;
    card_japanese: string;
    forge_id: string;
    forge_title: string;
    forge_type: string;
}): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT OR IGNORE INTO forge_card_usage (id, card_english, card_japanese, forge_id, forge_title, forge_type, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [data.id, data.card_english, data.card_japanese, data.forge_id, data.forge_title, data.forge_type, now]
    );
}

export async function deleteForgeUsage(id: string): Promise<void> {
    await executeQuery('DELETE FROM forge_card_usage WHERE id = ?', [id]);
}

// ============================================================
// LIFE RECORDINGS -- 「俺の日本語を全部英語にする」録音システム
// ============================================================

export interface LifeRecording {
    id: string;
    japanese: string;
    english_short: string | null;
    english_attitude: string | null;
    english_full: string | null;
    english_monologue: string | null;
    context: string | null;
    literal: string | null;
    category: string | null;
    status: string;        // 'pending' | 'converted'
    created_at: string;
    converted_at: string | null;
    member_slug?: string | null;
    member_name?: string | null;
    is_public?: number;    // 0 = private (author default), 1 = public on toniolab
}

export async function initLifeRecordingsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS life_recordings (
            id TEXT PRIMARY KEY,
            japanese TEXT NOT NULL,
            english_short TEXT,
            english_attitude TEXT,
            english_full TEXT,
            english_monologue TEXT,
            context TEXT,
            literal TEXT,
            category TEXT,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            converted_at TEXT,
            is_public INTEGER NOT NULL DEFAULT 0
        )
    `);
    // Migrate existing tables (idempotent — ignore "duplicate column" error).
    try {
        await executeQuery(`ALTER TABLE life_recordings ADD COLUMN is_public INTEGER NOT NULL DEFAULT 0`);
    } catch { /* column already exists */ }
}

export async function getAllLifeRecordings(): Promise<LifeRecording[]> {
    const result = await executeQuery<LifeRecording>(
        'SELECT * FROM life_recordings ORDER BY created_at DESC'
    );
    return result.results;
}

export async function getLifeRecordingsByDate(date: string): Promise<LifeRecording[]> {
    const result = await executeQuery<LifeRecording>(
        "SELECT * FROM life_recordings WHERE date(created_at) = ? ORDER BY created_at DESC",
        [date]
    );
    return result.results;
}

export async function getPendingLifeRecordings(): Promise<LifeRecording[]> {
    const result = await executeQuery<LifeRecording>(
        "SELECT * FROM life_recordings WHERE status = 'pending' ORDER BY created_at ASC"
    );
    return result.results;
}

function jstNowIso(): string {
    const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
    return jst.toISOString();
}

export async function addLifeRecording(id: string, japanese: string): Promise<LifeRecording> {
    const now = jstNowIso();
    await executeQuery(
        'INSERT INTO life_recordings (id, japanese, status, created_at) VALUES (?, ?, ?, ?)',
        [id, japanese, 'pending', now]
    );
    return { id, japanese, english_short: null, english_attitude: null, english_full: null, english_monologue: null, context: null, literal: null, category: null, status: 'pending', created_at: now, converted_at: null };
}

export async function convertLifeRecording(
    id: string,
    data: { english_short: string; english_attitude: string; english_full: string; english_monologue: string; context: string; literal?: string; category?: string }
): Promise<void> {
    const now = jstNowIso();
    await executeQuery(
        `UPDATE life_recordings SET
            english_short = ?, english_attitude = ?, english_full = ?, english_monologue = ?,
            context = ?, literal = ?, category = ?, status = 'converted', converted_at = ?
         WHERE id = ?`,
        [data.english_short, data.english_attitude, data.english_full, data.english_monologue,
         data.context, data.literal || null, data.category || null, now, id]
    );
}

export async function deleteLifeRecording(id: string): Promise<void> {
    await executeQuery('DELETE FROM life_recordings WHERE id = ?', [id]);
}

export async function updateLifeRecordingPublicity(id: string, isPublic: boolean): Promise<void> {
    await executeQuery(
        'UPDATE life_recordings SET is_public = ? WHERE id = ?',
        [isPublic ? 1 : 0, id]
    );
}

// Partial edit: update any subset of the editable fields in-place.
// Does NOT change status or converted_at — converting a pending record
// still goes through convertLifeRecording.
export async function updateLifeRecording(
    id: string,
    updates: Partial<{
        japanese: string;
        english_short: string | null;
        english_attitude: string | null;
        english_full: string | null;
        english_monologue: string | null;
        context: string | null;
        literal: string | null;
        category: string | null;
    }>
): Promise<void> {
    const allowed = [
        'japanese', 'english_short', 'english_attitude', 'english_full',
        'english_monologue', 'context', 'literal', 'category',
    ] as const;
    const sets: string[] = [];
    const params: unknown[] = [];
    for (const key of allowed) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
            sets.push(`${key} = ?`);
            params.push((updates as Record<string, unknown>)[key] ?? null);
        }
    }
    if (sets.length === 0) return;
    params.push(id);
    await executeQuery(
        `UPDATE life_recordings SET ${sets.join(', ')} WHERE id = ?`,
        params
    );
}

// ─── Life Diaries ───

export interface LifeDiary {
    date: string;        // 'YYYY-MM-DD'
    content: string;     // markdown body
    news: string | null; // optional news snippet
    created_at: string;
    updated_at: string;
}

export async function initLifeDiariesTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS life_diaries (
            date TEXT PRIMARY KEY,
            content TEXT NOT NULL,
            news TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
}

export async function getLifeDiary(date: string): Promise<LifeDiary | null> {
    const result = await executeQuery<LifeDiary>(
        'SELECT * FROM life_diaries WHERE date = ?',
        [date]
    );
    return result.results[0] || null;
}

export async function listLifeDiaryDates(): Promise<string[]> {
    const result = await executeQuery<{ date: string }>(
        'SELECT date FROM life_diaries ORDER BY date DESC'
    );
    return result.results.map(r => r.date);
}

export async function upsertLifeDiary(date: string, content: string, news: string | null): Promise<LifeDiary> {
    const now = jstNowIso();
    const existing = await getLifeDiary(date);
    if (existing) {
        await executeQuery(
            'UPDATE life_diaries SET content = ?, news = ?, updated_at = ? WHERE date = ?',
            [content, news, now, date]
        );
        return { date, content, news, created_at: existing.created_at, updated_at: now };
    }
    await executeQuery(
        'INSERT INTO life_diaries (date, content, news, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
        [date, content, news, now, now]
    );
    return { date, content, news, created_at: now, updated_at: now };
}

export async function deleteLifeDiary(date: string): Promise<void> {
    await executeQuery('DELETE FROM life_diaries WHERE date = ?', [date]);
}

// ─── Life Diary Replies (members can respond to daily diary) ───

export interface LifeDiaryReply {
    id: number;
    diary_date: string;
    content: string;
    member_slug: string | null;
    member_name: string | null;
    created_at: string;
}

export async function listLifeDiaryReplies(date: string): Promise<LifeDiaryReply[]> {
    const result = await executeQuery<LifeDiaryReply>(
        'SELECT * FROM life_diary_replies WHERE diary_date = ? ORDER BY created_at ASC',
        [date]
    );
    return result.results;
}

export async function listAllLifeDiaryReplyDates(): Promise<Record<string, number>> {
    const result = await executeQuery<{ diary_date: string; n: number }>(
        'SELECT diary_date, COUNT(*) as n FROM life_diary_replies GROUP BY diary_date'
    );
    const map: Record<string, number> = {};
    result.results.forEach(r => { map[r.diary_date] = r.n; });
    return map;
}

export async function listLatestMemberReplyByDate(): Promise<Record<string, string>> {
    const result = await executeQuery<{ diary_date: string; latest_member: string | null }>(
        `SELECT diary_date,
                MAX(CASE WHEN member_slug IS NOT NULL THEN created_at END) as latest_member
         FROM life_diary_replies GROUP BY diary_date`
    );
    const map: Record<string, string> = {};
    result.results.forEach(r => { if (r.latest_member) map[r.diary_date] = r.latest_member; });
    return map;
}

export async function createLifeDiaryReply(
    diaryDate: string,
    content: string,
    memberSlug: string | null,
    memberName: string | null
): Promise<LifeDiaryReply> {
    const now = jstNowIso();
    const result = await executeQuery<{ id: number }>(
        'INSERT INTO life_diary_replies (diary_date, content, member_slug, member_name, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id',
        [diaryDate, content, memberSlug, memberName, now]
    );
    const id = result.results[0]?.id ?? 0;
    return { id, diary_date: diaryDate, content, member_slug: memberSlug, member_name: memberName, created_at: now };
}

export async function deleteLifeDiaryReply(id: number, memberSlug: string | null): Promise<boolean> {
    if (memberSlug === null) {
        // admin: can delete any
        const res = await executeQuery('DELETE FROM life_diary_replies WHERE id = ?', [id]);
        return true;
    }
    // members: can only delete their own
    const res = await executeQuery(
        'DELETE FROM life_diary_replies WHERE id = ? AND member_slug = ?',
        [id, memberSlug]
    );
    return true;
}

// ─── LINE Admin (broadcasts / todos / notes 統合) ───

export interface LineAdminItem {
    id: number;
    type: 'broadcast' | 'todo' | 'problem' | 'idea' | 'note' | 'template';
    title: string;
    body: string | null;
    status: string;
    rating: number | null;
    priority: number;
    sent_at: string | null;
    created_at: string;
    updated_at: string;
}

export async function initLineAdminTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS line_admin_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            title TEXT NOT NULL,
            body TEXT,
            status TEXT DEFAULT 'open',
            rating INTEGER,
            priority INTEGER DEFAULT 2,
            sent_at TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
}

export async function listLineAdminItems(type?: string): Promise<LineAdminItem[]> {
    if (type) {
        const result = await executeQuery<LineAdminItem>(
            'SELECT * FROM line_admin_items WHERE type = ? ORDER BY (sent_at IS NULL), sent_at DESC, created_at DESC',
            [type]
        );
        return result.results;
    }
    const result = await executeQuery<LineAdminItem>(
        'SELECT * FROM line_admin_items ORDER BY created_at DESC'
    );
    return result.results;
}

export async function createLineAdminItem(input: {
    type: string;
    title: string;
    body?: string | null;
    status?: string;
    rating?: number | null;
    priority?: number;
    sent_at?: string | null;
}): Promise<LineAdminItem> {
    const now = jstNowIso();
    const result = await executeQuery<{ id: number }>(
        'INSERT INTO line_admin_items (type, title, body, status, rating, priority, sent_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id',
        [
            input.type,
            input.title,
            input.body ?? null,
            input.status ?? 'open',
            input.rating ?? null,
            input.priority ?? 2,
            input.sent_at ?? null,
            now,
            now,
        ]
    );
    const id = result.results[0]?.id ?? 0;
    return {
        id,
        type: input.type as LineAdminItem['type'],
        title: input.title,
        body: input.body ?? null,
        status: input.status ?? 'open',
        rating: input.rating ?? null,
        priority: input.priority ?? 2,
        sent_at: input.sent_at ?? null,
        created_at: now,
        updated_at: now,
    };
}

export async function updateLineAdminItem(id: number, patch: Partial<{
    title: string;
    body: string | null;
    status: string;
    rating: number | null;
    priority: number;
    sent_at: string | null;
}>): Promise<void> {
    const fields: string[] = [];
    const values: (string | number | null)[] = [];
    if (patch.title !== undefined) { fields.push('title = ?'); values.push(patch.title); }
    if (patch.body !== undefined) { fields.push('body = ?'); values.push(patch.body); }
    if (patch.status !== undefined) { fields.push('status = ?'); values.push(patch.status); }
    if (patch.rating !== undefined) { fields.push('rating = ?'); values.push(patch.rating); }
    if (patch.priority !== undefined) { fields.push('priority = ?'); values.push(patch.priority); }
    if (patch.sent_at !== undefined) { fields.push('sent_at = ?'); values.push(patch.sent_at); }
    if (fields.length === 0) return;
    fields.push('updated_at = ?');
    values.push(jstNowIso());
    values.push(id);
    await executeQuery(
        `UPDATE line_admin_items SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
}

export async function deleteLineAdminItem(id: number): Promise<void> {
    await executeQuery('DELETE FROM line_admin_items WHERE id = ?', [id]);
}

// ─── DMM Conversations (training) ───

export interface DmmTurn {
    role: 'student' | 'teacher';
    original: string;       // 元の発話 (生徒は録音書き起こし、講師はそのまま)
    native?: string;        // 「俺の表現の修正」: 生徒が言いたかった事を、ネイティブが
                            // 自然に+一言しゃれた表現入りで言うクリーン版 (現実的な学習ターゲット)
    engaged?: string;       // 「本物の native 会話の深さ」: punchline じゃなく、 逆質問・
                            // vulnerability・具体的 observation・pushback・mid-thought correction
                            // 等、 ガチで engaged な native conversationalist がどう返すか
                            // (stretch ターゲット、 本物の会話力)
    comedian?: string;      // [deprecated] user feedback で「コメディアン人を舐めてる」と却下、
                            // engaged に置換中。 既存 v4 データ後方互換のため field は残置。
    spice?: string;         // 一言ツッコミ(JP)。全行に付ける検死コメント。深堀レポートの代わりに
                            // 各ターンの下へ軽く出す (生徒・講師どちらにも付けられる)。
    minute?: number;        // 経過分 (任意、自己申告)
}

// 振り返りレポート: 1レッスンごとの「脳内意図↔口から出た英語」のズレを分析。
// 生成は AI、 サイトは保存・表示のみ。 watchlist が grammar/nonnative を横断集約する。
export interface DmmDiagnosis {
    // 致命的乖離 Top3: 崩壊した output と本来の意図、 連射用の短い SVO チャンク
    divergences?: { scene: string; output: string; intent: string; chunks: string[] }[];
    // 繰り返し文法バグ: english-errors-log の #番号 (ref) で再発を追跡
    grammar?: { output: string; bug: string; ref?: string; fix: string }[];
    // ネイティブらしくない癖 (would 回避・over-hedge 等) と暗記ドリル
    nonnative?: { habit: string; native: string; drill: string }[];
    summary?: string;
}

export interface DmmConversation {
    id: string;
    date: string;             // YYYY-MM-DD (lesson date)
    title: string;
    teacher_name: string | null;
    duration_minutes: number | null;
    turns: DmmTurn[];         // parsed JSON
    notes: string | null;
    diagnosis: DmmDiagnosis | null;   // 振り返りレポート (parsed JSON, nullable)
    created_at: string;
    updated_at: string;
}

// DB stores turns as TEXT (JSON-serialized)
interface DmmConversationRow {
    id: string;
    date: string;
    title: string;
    teacher_name: string | null;
    duration_minutes: number | null;
    turns: string;            // JSON string
    notes: string | null;
    diagnosis?: string | null; // JSON string (nullable; column added via migration)
    created_at: string;
    updated_at: string;
}

function rowToDmmConversation(row: DmmConversationRow): DmmConversation {
    let turns: DmmTurn[] = [];
    try { turns = JSON.parse(row.turns) as DmmTurn[]; }
    catch { turns = []; }
    let diagnosis: DmmDiagnosis | null = null;
    if (row.diagnosis) {
        try { diagnosis = JSON.parse(row.diagnosis) as DmmDiagnosis; }
        catch { diagnosis = null; }
    }
    return {
        id: row.id,
        date: row.date,
        title: row.title,
        teacher_name: row.teacher_name,
        duration_minutes: row.duration_minutes,
        turns,
        notes: row.notes,
        diagnosis,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}

export async function initDmmConversationsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS dmm_conversations (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            title TEXT NOT NULL,
            teacher_name TEXT,
            duration_minutes INTEGER,
            turns TEXT NOT NULL,
            notes TEXT,
            diagnosis TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_dmm_conv_date ON dmm_conversations (date DESC)`);
    // Migration: add diagnosis column to pre-existing tables (idempotent via try/catch)
    try { await executeQuery(`ALTER TABLE dmm_conversations ADD COLUMN diagnosis TEXT`); }
    catch { /* column already exists */ }
}

export async function listDmmConversations(): Promise<DmmConversation[]> {
    const result = await executeQuery<DmmConversationRow>(
        'SELECT * FROM dmm_conversations ORDER BY date DESC, created_at DESC'
    );
    return result.results.map(rowToDmmConversation);
}

export async function getDmmConversation(id: string): Promise<DmmConversation | null> {
    const result = await executeQuery<DmmConversationRow>(
        'SELECT * FROM dmm_conversations WHERE id = ?',
        [id]
    );
    const row = result.results[0];
    return row ? rowToDmmConversation(row) : null;
}

export async function upsertDmmConversation(input: {
    id: string;
    date: string;
    title: string;
    teacher_name?: string | null;
    duration_minutes?: number | null;
    turns: DmmTurn[];
    notes?: string | null;
    diagnosis?: DmmDiagnosis | null;
}): Promise<DmmConversation> {
    const now = jstNowIso();
    const turnsJson = JSON.stringify(input.turns);
    // undefined => leave existing diagnosis untouched; null => clear it
    const diagnosisJson = input.diagnosis === undefined
        ? undefined
        : (input.diagnosis === null ? null : JSON.stringify(input.diagnosis));
    const existing = await getDmmConversation(input.id);
    if (existing) {
        const diagToWrite = diagnosisJson === undefined
            ? (existing.diagnosis ? JSON.stringify(existing.diagnosis) : null)
            : diagnosisJson;
        await executeQuery(
            `UPDATE dmm_conversations SET
                date = ?, title = ?, teacher_name = ?, duration_minutes = ?,
                turns = ?, notes = ?, diagnosis = ?, updated_at = ?
             WHERE id = ?`,
            [
                input.date, input.title, input.teacher_name ?? null,
                input.duration_minutes ?? null, turnsJson, input.notes ?? null,
                diagToWrite, now, input.id,
            ]
        );
    } else {
        await executeQuery(
            `INSERT INTO dmm_conversations (id, date, title, teacher_name, duration_minutes, turns, notes, diagnosis, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                input.id, input.date, input.title, input.teacher_name ?? null,
                input.duration_minutes ?? null, turnsJson, input.notes ?? null,
                diagnosisJson ?? null, now, now,
            ]
        );
    }
    const saved = await getDmmConversation(input.id);
    if (!saved) throw new Error('Failed to read back saved conversation');
    return saved;
}

export async function deleteDmmConversation(id: string): Promise<void> {
    await executeQuery('DELETE FROM dmm_conversations WHERE id = ?', [id]);
}

export async function getDmmConversationsByDate(date: string): Promise<DmmConversation[]> {
    const result = await executeQuery<DmmConversationRow>(
        'SELECT * FROM dmm_conversations WHERE date = ? ORDER BY created_at DESC',
        [date]
    );
    return result.results.map(rowToDmmConversation);
}

// ─── DMM 365 Deployment Lab ────────────────────────────────────────────────
// 365日チャレンジ用。 1 lesson = 1 session (#1-365)、 各 session に複数の ammo (英語表現)。
// ammo の status state machine: planned → used → landed / corrected / flat
// 既存 dmm_conversations (全文 transcript 管理) とは別物。 こちらは speedy ammo log

export type Dmm365Status =
    | 'planned'    // 投入予定
    | 'used'       // レッスンで言った
    | 'landed'     // 言って反応取れた (笑い・先生がGoodなど)
    | 'corrected'  // 先生に直された (correction フィールドあり)
    | 'flat';      // 言ったけど反応なし

export interface Dmm365Session {
    id: string;
    session_number: number;       // 1, 2, 3, ... (基本ユニーク、 ただし 0/null も許容して将来拡張)
    date: string;                 // YYYY-MM-DD (JST)
    teacher: string | null;
    title: string | null;         // 任意のテーマ・タイトル ("freelance ranting"とか)
    notes: string | null;         // post-lesson reflection
    created_at: string;
    updated_at: string;
}

export interface Dmm365Ammo {
    id: string;
    session_id: string;
    sort_order: number;
    english: string;
    japanese: string | null;
    source: string | null;         // どこで仕入れたか (podcast名・映画名・自作・等)
    status: Dmm365Status;
    correction: string | null;     // status='corrected' なら先生の修正
    reaction_note: string | null;  // 反応メモ ("got laugh"とか)
    created_at: string;
    updated_at: string;
}

export interface Dmm365SessionWithAmmo extends Dmm365Session {
    ammo: Dmm365Ammo[];
}

export interface Dmm365Stats {
    total_sessions: number;
    total_ammo: number;
    landed_count: number;
    corrected_count: number;
    flat_count: number;
    used_count: number;
    planned_count: number;
    current_streak: number;      // 連続日数 (今日 or 昨日まで遡って連続)
    longest_streak: number;
    last_session_number: number; // 最新 session の番号
    last_session_date: string | null;
    days_active: number;         // 何日 active か (累計)
    avg_ammo_per_session: number;
}

export async function initDmm365Tables(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS dmm365_sessions (
            id TEXT PRIMARY KEY,
            session_number INTEGER NOT NULL,
            date TEXT NOT NULL,
            teacher TEXT,
            title TEXT,
            notes TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_dmm365_sess_num ON dmm365_sessions (session_number DESC)`);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_dmm365_sess_date ON dmm365_sessions (date DESC)`);

    await executeQuery(`
        CREATE TABLE IF NOT EXISTS dmm365_ammo (
            id TEXT PRIMARY KEY,
            session_id TEXT NOT NULL,
            sort_order INTEGER NOT NULL,
            english TEXT NOT NULL,
            japanese TEXT,
            source TEXT,
            status TEXT NOT NULL,
            correction TEXT,
            reaction_note TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (session_id) REFERENCES dmm365_sessions(id) ON DELETE CASCADE
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_dmm365_ammo_session ON dmm365_ammo (session_id, sort_order)`);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_dmm365_ammo_status ON dmm365_ammo (status)`);
}

// ── Sessions ──

export async function listDmm365Sessions(): Promise<Dmm365Session[]> {
    const result = await executeQuery<Dmm365Session>(
        'SELECT * FROM dmm365_sessions ORDER BY session_number DESC, date DESC'
    );
    return result.results;
}

export async function listDmm365SessionsWithAmmo(): Promise<Dmm365SessionWithAmmo[]> {
    const sessions = await listDmm365Sessions();
    if (sessions.length === 0) return [];
    const ammoAll = await executeQuery<Dmm365Ammo>(
        'SELECT * FROM dmm365_ammo ORDER BY session_id, sort_order ASC'
    );
    const ammoBySession = new Map<string, Dmm365Ammo[]>();
    for (const a of ammoAll.results) {
        const arr = ammoBySession.get(a.session_id) ?? [];
        arr.push(a);
        ammoBySession.set(a.session_id, arr);
    }
    return sessions.map(s => ({ ...s, ammo: ammoBySession.get(s.id) ?? [] }));
}

export async function getDmm365Session(id: string): Promise<Dmm365SessionWithAmmo | null> {
    const sessRes = await executeQuery<Dmm365Session>(
        'SELECT * FROM dmm365_sessions WHERE id = ?',
        [id]
    );
    const sess = sessRes.results[0];
    if (!sess) return null;
    const ammoRes = await executeQuery<Dmm365Ammo>(
        'SELECT * FROM dmm365_ammo WHERE session_id = ? ORDER BY sort_order ASC',
        [id]
    );
    return { ...sess, ammo: ammoRes.results };
}

export async function getDmm365SessionByNumber(num: number): Promise<Dmm365SessionWithAmmo | null> {
    const sessRes = await executeQuery<Dmm365Session>(
        'SELECT * FROM dmm365_sessions WHERE session_number = ? LIMIT 1',
        [num]
    );
    const sess = sessRes.results[0];
    if (!sess) return null;
    return getDmm365Session(sess.id);
}

export async function getDmm365SessionByDate(date: string): Promise<Dmm365SessionWithAmmo | null> {
    const sessRes = await executeQuery<Dmm365Session>(
        'SELECT * FROM dmm365_sessions WHERE date = ? ORDER BY session_number DESC LIMIT 1',
        [date]
    );
    const sess = sessRes.results[0];
    if (!sess) return null;
    return getDmm365Session(sess.id);
}

export async function getNextDmm365SessionNumber(): Promise<number> {
    const res = await executeQuery<{ max_num: number | null }>(
        'SELECT MAX(session_number) as max_num FROM dmm365_sessions'
    );
    const max = res.results[0]?.max_num ?? 0;
    return (max ?? 0) + 1;
}

export async function createDmm365Session(input: {
    id: string;
    session_number: number;
    date: string;
    teacher?: string | null;
    title?: string | null;
    notes?: string | null;
}): Promise<Dmm365Session> {
    const now = jstNowIso();
    await executeQuery(
        `INSERT INTO dmm365_sessions (id, session_number, date, teacher, title, notes, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            input.id, input.session_number, input.date,
            input.teacher ?? null, input.title ?? null, input.notes ?? null,
            now, now,
        ]
    );
    return {
        id: input.id,
        session_number: input.session_number,
        date: input.date,
        teacher: input.teacher ?? null,
        title: input.title ?? null,
        notes: input.notes ?? null,
        created_at: now,
        updated_at: now,
    };
}

export async function updateDmm365Session(id: string, updates: {
    session_number?: number;
    date?: string;
    teacher?: string | null;
    title?: string | null;
    notes?: string | null;
}): Promise<void> {
    const fields: string[] = [];
    const values: (string | number | null)[] = [];
    if (updates.session_number !== undefined) { fields.push('session_number = ?'); values.push(updates.session_number); }
    if (updates.date !== undefined) { fields.push('date = ?'); values.push(updates.date); }
    if (updates.teacher !== undefined) { fields.push('teacher = ?'); values.push(updates.teacher); }
    if (updates.title !== undefined) { fields.push('title = ?'); values.push(updates.title); }
    if (updates.notes !== undefined) { fields.push('notes = ?'); values.push(updates.notes); }
    if (fields.length === 0) return;
    fields.push('updated_at = ?');
    values.push(jstNowIso());
    values.push(id);
    await executeQuery(
        `UPDATE dmm365_sessions SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
}

export async function deleteDmm365Session(id: string): Promise<void> {
    // 子の ammo 全部消す (FK CASCADE は D1 で頼りないので明示)
    await executeQuery('DELETE FROM dmm365_ammo WHERE session_id = ?', [id]);
    await executeQuery('DELETE FROM dmm365_sessions WHERE id = ?', [id]);
}

// ── Ammo ──

export async function listDmm365AmmoBySession(sessionId: string): Promise<Dmm365Ammo[]> {
    const res = await executeQuery<Dmm365Ammo>(
        'SELECT * FROM dmm365_ammo WHERE session_id = ? ORDER BY sort_order ASC',
        [sessionId]
    );
    return res.results;
}

export async function listAllDmm365Ammo(): Promise<Dmm365Ammo[]> {
    const res = await executeQuery<Dmm365Ammo>(
        'SELECT * FROM dmm365_ammo ORDER BY session_id, sort_order ASC'
    );
    return res.results;
}

export async function getDmm365Ammo(id: string): Promise<Dmm365Ammo | null> {
    const res = await executeQuery<Dmm365Ammo>(
        'SELECT * FROM dmm365_ammo WHERE id = ?',
        [id]
    );
    return res.results[0] ?? null;
}

export async function createDmm365Ammo(input: {
    id: string;
    session_id: string;
    sort_order?: number;
    english: string;
    japanese?: string | null;
    source?: string | null;
    status?: Dmm365Status;
    correction?: string | null;
    reaction_note?: string | null;
}): Promise<Dmm365Ammo> {
    const now = jstNowIso();
    let sortOrder = input.sort_order;
    if (sortOrder === undefined || sortOrder === null) {
        const maxRes = await executeQuery<{ max_order: number | null }>(
            'SELECT MAX(sort_order) as max_order FROM dmm365_ammo WHERE session_id = ?',
            [input.session_id]
        );
        sortOrder = (maxRes.results[0]?.max_order ?? -1) + 1;
    }
    const status = input.status ?? 'planned';
    await executeQuery(
        `INSERT INTO dmm365_ammo (id, session_id, sort_order, english, japanese, source, status, correction, reaction_note, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            input.id, input.session_id, sortOrder,
            input.english,
            input.japanese ?? null, input.source ?? null,
            status, input.correction ?? null, input.reaction_note ?? null,
            now, now,
        ]
    );
    return {
        id: input.id,
        session_id: input.session_id,
        sort_order: sortOrder,
        english: input.english,
        japanese: input.japanese ?? null,
        source: input.source ?? null,
        status,
        correction: input.correction ?? null,
        reaction_note: input.reaction_note ?? null,
        created_at: now,
        updated_at: now,
    };
}

export async function updateDmm365Ammo(id: string, updates: {
    sort_order?: number;
    english?: string;
    japanese?: string | null;
    source?: string | null;
    status?: Dmm365Status;
    correction?: string | null;
    reaction_note?: string | null;
}): Promise<void> {
    const fields: string[] = [];
    const values: (string | number | null)[] = [];
    if (updates.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(updates.sort_order); }
    if (updates.english !== undefined) { fields.push('english = ?'); values.push(updates.english); }
    if (updates.japanese !== undefined) { fields.push('japanese = ?'); values.push(updates.japanese); }
    if (updates.source !== undefined) { fields.push('source = ?'); values.push(updates.source); }
    if (updates.status !== undefined) { fields.push('status = ?'); values.push(updates.status); }
    if (updates.correction !== undefined) { fields.push('correction = ?'); values.push(updates.correction); }
    if (updates.reaction_note !== undefined) { fields.push('reaction_note = ?'); values.push(updates.reaction_note); }
    if (fields.length === 0) return;
    fields.push('updated_at = ?');
    values.push(jstNowIso());
    values.push(id);
    await executeQuery(
        `UPDATE dmm365_ammo SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
}

export async function deleteDmm365Ammo(id: string): Promise<void> {
    await executeQuery('DELETE FROM dmm365_ammo WHERE id = ?', [id]);
}

export async function bulkReorderDmm365Ammo(orders: { id: string; sort_order: number }[]): Promise<void> {
    const now = jstNowIso();
    for (const { id, sort_order } of orders) {
        await executeQuery(
            'UPDATE dmm365_ammo SET sort_order = ?, updated_at = ? WHERE id = ?',
            [sort_order, now, id]
        );
    }
}

// ── Stats ──

export async function getDmm365Stats(): Promise<Dmm365Stats> {
    const sessions = await listDmm365Sessions();
    const totalSessions = sessions.length;

    const ammoCountRes = await executeQuery<{ total: number; status: string; cnt: number }>(
        'SELECT COUNT(*) as cnt, status FROM dmm365_ammo GROUP BY status'
    );
    let totalAmmo = 0, landed = 0, corrected = 0, flat = 0, used = 0, planned = 0;
    for (const row of ammoCountRes.results) {
        totalAmmo += row.cnt;
        if (row.status === 'landed') landed = row.cnt;
        else if (row.status === 'corrected') corrected = row.cnt;
        else if (row.status === 'flat') flat = row.cnt;
        else if (row.status === 'used') used = row.cnt;
        else if (row.status === 'planned') planned = row.cnt;
    }

    // streak 計算 (JST today から遡って連続セッション日)
    const todayJst = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const yesterdayJst = (() => {
        const d = new Date(Date.now() + 9 * 60 * 60 * 1000);
        d.setUTCDate(d.getUTCDate() - 1);
        return d.toISOString().slice(0, 10);
    })();

    const dateSet = new Set(sessions.map(s => s.date));
    let currentStreak = 0;
    let cursor: Date;
    if (dateSet.has(todayJst)) cursor = new Date(`${todayJst}T00:00:00Z`);
    else if (dateSet.has(yesterdayJst)) cursor = new Date(`${yesterdayJst}T00:00:00Z`);
    else cursor = new Date(NaN);
    while (!isNaN(cursor.getTime())) {
        const key = cursor.toISOString().slice(0, 10);
        if (!dateSet.has(key)) break;
        currentStreak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    // longest streak
    const sortedDates = Array.from(dateSet).sort();
    let longest = 0, run = 0;
    let prevDate: Date | null = null;
    for (const d of sortedDates) {
        const cur = new Date(`${d}T00:00:00Z`);
        if (prevDate) {
            const diff = (cur.getTime() - prevDate.getTime()) / (24 * 3600 * 1000);
            run = diff === 1 ? run + 1 : 1;
        } else {
            run = 1;
        }
        if (run > longest) longest = run;
        prevDate = cur;
    }

    const lastSession = sessions[0]; // sessions is ORDER BY session_number DESC
    return {
        total_sessions: totalSessions,
        total_ammo: totalAmmo,
        landed_count: landed,
        corrected_count: corrected,
        flat_count: flat,
        used_count: used,
        planned_count: planned,
        current_streak: currentStreak,
        longest_streak: longest,
        last_session_number: lastSession?.session_number ?? 0,
        last_session_date: lastSession?.date ?? null,
        days_active: dateSet.size,
        avg_ammo_per_session: totalSessions > 0 ? totalAmmo / totalSessions : 0,
    };
}

// ── Sync to phrases (training) ──
// status != 'planned' な ammo を phrases テーブルに insert (重複は skip)
// source = `DMM #N` の形で attribution
export async function syncDmm365SessionToPhrases(
    sessionId: string,
    opts: { category?: string } = {}
): Promise<{ added: number; skipped: number; ammoIds: string[] }> {
    const session = await getDmm365Session(sessionId);
    if (!session) throw new Error('Session not found');
    const eligible = session.ammo.filter(a => a.status !== 'planned' && a.english.trim().length > 0);
    let added = 0, skipped = 0;
    const ammoIds: string[] = [];
    const category = opts.category ?? 'wind';
    for (const a of eligible) {
        const exists = await executeQuery(
            'SELECT id FROM phrases WHERE LOWER(english) = LOWER(?) AND date = ?',
            [a.english, session.date]
        );
        if (exists.results && exists.results.length > 0) {
            skipped += 1;
            continue;
        }
        // nanoid 8-char
        const phraseId = randomNanoLike(8);
        await executeQuery(
            'INSERT INTO phrases (id, english, japanese, category, date) VALUES (?, ?, ?, ?, ?)',
            [phraseId, a.english, a.japanese ?? '', category, session.date]
        );
        added += 1;
        ammoIds.push(a.id);
    }
    return { added, skipped, ammoIds };
}

function randomNanoLike(len: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let out = '';
    for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
}


// ── Speech Prep ─────────────────────────────────────────────
// DMMレッスン前に「言いたいこと」を完璧な英語で仕込んで暗記する。
// 1 topic = title + 何を話すか(ja) + chunks[] (各 chunk = 日本語の意図 + 完璧な英語)。
export interface SpeechPrepChunk {
    ja: string;   // その塊で言いたいこと (日本語)
    en: string;   // 完璧な英語
}

export interface SpeechPrep {
    id: string;
    title: string;
    topic_ja: string;
    chunks: SpeechPrepChunk[];
    created_at: string;
    updated_at: string;
}

export async function initSpeechPrepTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS speech_prep (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            topic_ja TEXT,
            chunks TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_speech_prep_created ON speech_prep (created_at DESC)`);
}

function parseSpeechPrepRow(r: any): SpeechPrep {
    let chunks: SpeechPrepChunk[] = [];
    try { chunks = JSON.parse(r.chunks || '[]'); } catch { chunks = []; }
    return {
        id: r.id, title: r.title, topic_ja: r.topic_ja || '',
        chunks, created_at: r.created_at, updated_at: r.updated_at,
    };
}

export async function listSpeechPrep(): Promise<SpeechPrep[]> {
    const res = await executeQuery<any>('SELECT * FROM speech_prep ORDER BY created_at DESC');
    return (res.results || []).map(parseSpeechPrepRow);
}

export async function createSpeechPrep(input: { title: string; topic_ja?: string; chunks: SpeechPrepChunk[] }): Promise<SpeechPrep> {
    const id = randomNanoLike(10);
    const now = new Date().toISOString();
    await executeQuery(
        'INSERT INTO speech_prep (id, title, topic_ja, chunks, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [id, input.title, input.topic_ja ?? '', JSON.stringify(input.chunks || []), now, now]
    );
    return { id, title: input.title, topic_ja: input.topic_ja ?? '', chunks: input.chunks || [], created_at: now, updated_at: now };
}

export async function updateSpeechPrep(id: string, input: { title?: string; topic_ja?: string; chunks?: SpeechPrepChunk[] }): Promise<void> {
    const fields: string[] = [];
    const values: (string | null)[] = [];
    if (input.title !== undefined) { fields.push('title = ?'); values.push(input.title); }
    if (input.topic_ja !== undefined) { fields.push('topic_ja = ?'); values.push(input.topic_ja); }
    if (input.chunks !== undefined) { fields.push('chunks = ?'); values.push(JSON.stringify(input.chunks)); }
    if (fields.length === 0) return;
    fields.push('updated_at = ?'); values.push(new Date().toISOString());
    values.push(id);
    await executeQuery(`UPDATE speech_prep SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function deleteSpeechPrep(id: string): Promise<void> {
    await executeQuery('DELETE FROM speech_prep WHERE id = ?', [id]);
}

// ============================================================
// 月刊 TOLERANCY マガジン — ブラウザ編集用の永続化
// 1号 = 1行。full MagazineIssue を JSON blob として保存する。
// ネタ元/型は src/data/english/magazine.ts。DB が空なら静的 seed に fallback。
// ============================================================

export async function initMagazineTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS magazine_issues (
            vol INTEGER PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
}

// 最新号(vol 最大)を1件返す。無ければ null。
export async function getLatestMagazineIssue<T = unknown>(): Promise<T | null> {
    try {
        const result = await executeQuery<{ data: string }>(
            'SELECT data FROM magazine_issues ORDER BY vol DESC LIMIT 1'
        );
        if (!result.results[0]) return null;
        return JSON.parse(result.results[0].data) as T;
    } catch {
        return null;
    }
}

export async function getMagazineIssueByVol<T = unknown>(vol: number): Promise<T | null> {
    try {
        const result = await executeQuery<{ data: string }>(
            'SELECT data FROM magazine_issues WHERE vol = ? LIMIT 1',
            [vol]
        );
        if (!result.results[0]) return null;
        return JSON.parse(result.results[0].data) as T;
    } catch {
        return null;
    }
}

export async function getAllMagazineIssues<T = unknown>(): Promise<T[]> {
    try {
        const result = await executeQuery<{ data: string }>(
            'SELECT data FROM magazine_issues ORDER BY vol DESC'
        );
        return result.results.map((r) => JSON.parse(r.data) as T);
    } catch {
        return [];
    }
}

// vol をキーに issue まるごと upsert。
export async function upsertMagazineIssue(vol: number, data: unknown): Promise<void> {
    await initMagazineTable();
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO magazine_issues (vol, data, updated_at)
         VALUES (?, ?, ?)
         ON CONFLICT(vol) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
        [vol, JSON.stringify(data), now]
    );
}

// ============================================================
// 「今夜も、通じない。」番組データ — ブラウザ編集用の永続化
// 汎用KV: key='meta' に SHOW_META、key='night:<n>' に各話(ShowEpisode)を JSON 保存。
// DB が空なら静的 seed(dmm-show.ts)に fallback。型は dmm-show.ts 参照。
// ============================================================

export async function initTonightTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS tonight_docs (
            key TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);
}

export async function getAllTonightDocs(): Promise<{ key: string; data: string }[]> {
    try {
        const result = await executeQuery<{ key: string; data: string }>(
            'SELECT key, data FROM tonight_docs'
        );
        return result.results;
    } catch {
        return [];
    }
}

export async function upsertTonightDoc(key: string, data: unknown): Promise<void> {
    await initTonightTable();
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO tonight_docs (key, data, updated_at)
         VALUES (?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
        [key, JSON.stringify(data), now]
    );
}

// posted された night 群だけ残し、DB 側の余分な night 行を消す(削除の反映 = 完全置換)。
export async function replaceTonightEpisodes(nights: number[]): Promise<void> {
    await initTonightTable();
    const keep = nights.map((n) => `night:${n}`);
    const all = await getAllTonightDocs();
    const stale = all
        .map((d) => d.key)
        .filter((k) => k.startsWith('night:') && !keep.includes(k));
    for (const key of stale) {
        await executeQuery('DELETE FROM tonight_docs WHERE key = ?', [key]);
    }
}

// ---------------------------------------------------------------------------
// 会話語録 (goroku_log)
//
// 既存の goroku テーブル(7本柱カリキュラム、631件)とは別物。
// あちらは教材として設計された固定カリキュラムで、こちらは
// 「会話のたびに本人の口から出た日本語」を1件ずつ積む器。
// 混ぜると、厳選したはずの新しい語録が古い631件に埋もれて見えなくなるので分ける。
//
// 追加ルールはデータ側ではなく登録UIで担保する: 1:1翻訳(うーん->hmm)は入れない。
// ---------------------------------------------------------------------------

export interface GorokuLogRow {
    id: string;
    date: string;        // 拾った日 YYYY-MM-DD
    source: string;      // どの会話か
    ja: string;          // 実際に言った日本語
    pattern: string;     // Journal #115 の10話型
    english: string;     // native がそのまま口に出す英語
    note: string;        // なぜ効くか / 日本語との差
    category: string;
    created_at: string;
}

export async function initGorokuLogTable(): Promise<void> {
    await executeQuery(
        `CREATE TABLE IF NOT EXISTS goroku_log (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            source TEXT DEFAULT '',
            ja TEXT NOT NULL,
            pattern TEXT DEFAULT '',
            english TEXT NOT NULL,
            note TEXT DEFAULT '',
            category TEXT DEFAULT 'opinion',
            created_at TEXT NOT NULL
        )`
    );
}

export async function getAllGorokuLog(): Promise<GorokuLogRow[]> {
    await initGorokuLogTable();
    const r = await executeQuery<GorokuLogRow>(
        'SELECT * FROM goroku_log ORDER BY date DESC, created_at DESC'
    );
    return r.results || [];
}

export async function addGorokuLog(d: {
    id: string; date: string; source?: string; ja: string;
    pattern?: string; english: string; note?: string; category?: string;
}): Promise<GorokuLogRow> {
    await initGorokuLogTable();
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO goroku_log (id, date, source, ja, pattern, english, note, category, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [d.id, d.date, d.source || '', d.ja, d.pattern || '', d.english, d.note || '', d.category || 'opinion', now]
    );
    return {
        id: d.id, date: d.date, source: d.source || '', ja: d.ja,
        pattern: d.pattern || '', english: d.english, note: d.note || '',
        category: d.category || 'opinion', created_at: now,
    };
}

export async function deleteGorokuLog(id: string): Promise<void> {
    await executeQuery('DELETE FROM goroku_log WHERE id = ?', [id]);
}

// ============================================================
// 英語相談 (consult) -- 質問票の回答を受け取る
// 回答は列を増やさず JSON でまとめて持つ。設問を足しても DB を触らずに済む
// ============================================================

export interface ConsultRequest {
    id: string;
    created_at: string;
    name: string;
    contact: string;
    answers: Record<string, string>;
    char_count: number;
    status: string;
    reply: string | null;
}

interface ConsultRequestRow {
    id: string;
    created_at: string;
    name: string;
    contact: string;
    answers: string;
    char_count: number;
    status: string;
    reply: string | null;
}

function rowToConsultRequest(row: ConsultRequestRow): ConsultRequest {
    let answers: Record<string, string> = {};
    try { answers = JSON.parse(row.answers || '{}'); } catch { answers = {}; }
    return { ...row, answers };
}

export async function initConsultTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS consult_requests (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            name TEXT NOT NULL,
            contact TEXT NOT NULL,
            answers TEXT NOT NULL,
            char_count INTEGER NOT NULL DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'new',
            reply TEXT
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_consult_created ON consult_requests (created_at DESC)`);
}

export async function addConsultRequest(input: {
    id: string;
    name: string;
    contact: string;
    answers: Record<string, string>;
}): Promise<ConsultRequest> {
    const created_at = new Date().toISOString();
    const answersJson = JSON.stringify(input.answers);
    const char_count = Object.values(input.answers).join('').replace(/\s/g, '').length;
    await executeQuery(
        `INSERT INTO consult_requests (id, created_at, name, contact, answers, char_count, status, reply)
         VALUES (?, ?, ?, ?, ?, ?, 'new', NULL)`,
        [input.id, created_at, input.name, input.contact, answersJson, char_count]
    );
    return { id: input.id, created_at, name: input.name, contact: input.contact, answers: input.answers, char_count, status: 'new', reply: null };
}

export async function listConsultRequests(): Promise<ConsultRequest[]> {
    const result = await executeQuery<ConsultRequestRow>(
        'SELECT * FROM consult_requests ORDER BY created_at DESC'
    );
    return result.results.map(rowToConsultRequest);
}

// ============================================================
// RADAR -- 書き手レーダー
// 特定のSNSにも特定のジャンルにも縛らない作りにしてある。
//   source   = 監視の主体 (例: note:tonio_english)。増やせば別アカウント・別ジャンルを並行して持てる
//   platform = note / x / youtube ... 取り込み側を足すだけで増やせる
//   history  = 日ごとの数字。増減を出すのはここ。1日1行
//   meta     = こちら側の情報 (段階・タグ・メモ・次にやる日)。相手の数字とは分けて持つ
// ============================================================

export interface RadarPerson {
    source: string;
    platform: string;
    handle: string;
    name: string;
    profile: string;
    followers: number;
    following: number;
    posts: number;
    last_post: string | null;
    avg_like: number;
    avg_comment: number;
    mutual: number;
    first_seen: string;
    updated_at: string;
}

export interface RadarMeta {
    handle: string;
    stage: string;
    tags: string;
    memo: string;
    next_at: string | null;
    updated_at: string;
}

export async function initRadarTables(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS radar_people (
            source TEXT NOT NULL,
            platform TEXT NOT NULL,
            handle TEXT NOT NULL,
            name TEXT NOT NULL,
            profile TEXT,
            followers INTEGER DEFAULT 0,
            following INTEGER DEFAULT 0,
            posts INTEGER DEFAULT 0,
            last_post TEXT,
            avg_like REAL DEFAULT 0,
            avg_comment REAL DEFAULT 0,
            mutual INTEGER DEFAULT 0,
            first_seen TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            PRIMARY KEY (source, handle)
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_radar_people_src ON radar_people (source, followers DESC)`);
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS radar_history (
            handle TEXT NOT NULL,
            day TEXT NOT NULL,
            followers INTEGER DEFAULT 0,
            posts INTEGER DEFAULT 0,
            avg_like REAL DEFAULT 0,
            PRIMARY KEY (handle, day)
        )
    `);
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS radar_meta (
            handle TEXT PRIMARY KEY,
            stage TEXT DEFAULT 'new',
            tags TEXT DEFAULT '',
            memo TEXT DEFAULT '',
            next_at TEXT,
            updated_at TEXT NOT NULL
        )
    `);
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS radar_touch (
            id TEXT PRIMARY KEY,
            handle TEXT NOT NULL,
            kind TEXT NOT NULL,
            at TEXT NOT NULL,
            memo TEXT
        )
    `);
    await executeQuery(`CREATE INDEX IF NOT EXISTS idx_radar_touch_handle ON radar_touch (handle, at DESC)`);
}

/** 相手の数字を書き込む。名前や紹介文だけの段階でも呼べるように、成績は任意にしてある */
export async function upsertRadarPeople(rows: {
    source: string; platform: string; handle: string; name: string; profile: string;
    followers: number; following: number; mutual: number;
    posts?: number; last_post?: string | null; avg_like?: number; avg_comment?: number;
}[]): Promise<void> {
    const now = new Date().toISOString();
    for (const r of rows) {
        const withStats = r.posts !== undefined;
        await executeQuery(
            `INSERT INTO radar_people (source, platform, handle, name, profile, followers, following, posts, last_post, avg_like, avg_comment, mutual, first_seen, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(source, handle) DO UPDATE SET
                name = excluded.name,
                profile = excluded.profile,
                followers = excluded.followers,
                following = excluded.following,
                mutual = excluded.mutual,
                posts = CASE WHEN ? = 1 THEN excluded.posts ELSE radar_people.posts END,
                last_post = CASE WHEN ? = 1 THEN excluded.last_post ELSE radar_people.last_post END,
                avg_like = CASE WHEN ? = 1 THEN excluded.avg_like ELSE radar_people.avg_like END,
                avg_comment = CASE WHEN ? = 1 THEN excluded.avg_comment ELSE radar_people.avg_comment END,
                updated_at = excluded.updated_at`,
            [
                r.source, r.platform, r.handle, r.name, r.profile ?? '',
                r.followers, r.following, r.posts ?? 0, r.last_post ?? null,
                r.avg_like ?? 0, r.avg_comment ?? 0, r.mutual, now, now,
                withStats ? 1 : 0, withStats ? 1 : 0, withStats ? 1 : 0, withStats ? 1 : 0,
            ]
        );
    }
}

/** 1日1行だけ残す。同じ日に何度同期しても最後の値で上書きされる */
export async function writeRadarHistory(rows: { handle: string; followers: number; posts: number; avg_like: number }[], day: string): Promise<void> {
    for (const r of rows) {
        await executeQuery(
            `INSERT INTO radar_history (handle, day, followers, posts, avg_like) VALUES (?, ?, ?, ?, ?)
             ON CONFLICT(handle, day) DO UPDATE SET followers = excluded.followers, posts = excluded.posts, avg_like = excluded.avg_like`,
            [r.handle, day, r.followers, r.posts, r.avg_like]
        );
    }
}

export async function listRadarPeople(source: string): Promise<RadarPerson[]> {
    const res = await executeQuery<RadarPerson>('SELECT * FROM radar_people WHERE source = ?', [source]);
    return res.results;
}

export async function listRadarMeta(): Promise<RadarMeta[]> {
    const res = await executeQuery<RadarMeta>('SELECT * FROM radar_meta');
    return res.results;
}

/** 各人の「いちばん古い記録」と「一つ前の記録」を返す。増減はこれで出す */
export async function radarHistoryRange(sinceDay: string): Promise<{ handle: string; day: string; followers: number; posts: number }[]> {
    const res = await executeQuery<{ handle: string; day: string; followers: number; posts: number }>(
        'SELECT handle, day, followers, posts FROM radar_history WHERE day >= ? ORDER BY day ASC',
        [sinceDay]
    );
    return res.results;
}

export async function setRadarMeta(handle: string, patch: { stage?: string; tags?: string; memo?: string; next_at?: string | null }): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO radar_meta (handle, stage, tags, memo, next_at, updated_at)
         VALUES (?, COALESCE(?, 'new'), COALESCE(?, ''), COALESCE(?, ''), ?, ?)
         ON CONFLICT(handle) DO UPDATE SET
            stage = COALESCE(?, radar_meta.stage),
            tags = COALESCE(?, radar_meta.tags),
            memo = COALESCE(?, radar_meta.memo),
            next_at = COALESCE(?, radar_meta.next_at),
            updated_at = ?`,
        [
            handle, patch.stage ?? null, patch.tags ?? null, patch.memo ?? null, patch.next_at ?? null, now,
            patch.stage ?? null, patch.tags ?? null, patch.memo ?? null, patch.next_at ?? null, now,
        ]
    );
}

export async function addRadarTouch(handle: string, kind: string, memo: string): Promise<void> {
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    await executeQuery(
        'INSERT INTO radar_touch (id, handle, kind, at, memo) VALUES (?, ?, ?, ?, ?)',
        [id, handle, kind, new Date().toISOString(), memo || '']
    );
}

export async function listRadarTouches(): Promise<{ id: string; handle: string; kind: string; at: string; memo: string }[]> {
    const res = await executeQuery<{ id: string; handle: string; kind: string; at: string; memo: string }>(
        'SELECT * FROM radar_touch ORDER BY at DESC LIMIT 2000'
    );
    return res.results;
}

// ============================================================
// RADAR MISSION -- 今日の指令
// 1日1件だけ「絶対にコメントする相手」を決めて残す。
// 狭いジャンルの中だけで回さないための仕掛けなので、外の世界から引くことが多い
// ============================================================

export interface RadarMission {
    day: string;
    source: string;
    handle: string;
    name: string;
    genre: string;
    reason: string;
    article_title: string | null;
    article_url: string | null;
    followers: number;
    avg_comment: number;
    status: string;       // open / done / passed
    rerolls: number;
    created_at: string;
    done_at: string | null;
}

export async function initRadarMissionTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS radar_mission (
            day TEXT NOT NULL,
            source TEXT NOT NULL,
            handle TEXT NOT NULL,
            name TEXT NOT NULL,
            genre TEXT,
            reason TEXT,
            article_title TEXT,
            article_url TEXT,
            followers INTEGER DEFAULT 0,
            avg_comment REAL DEFAULT 0,
            status TEXT DEFAULT 'open',
            rerolls INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            done_at TEXT,
            PRIMARY KEY (day, source)
        )
    `);
}

export async function getRadarMission(day: string, source: string): Promise<RadarMission | null> {
    const res = await executeQuery<RadarMission>(
        'SELECT * FROM radar_mission WHERE day = ? AND source = ?', [day, source]
    );
    return res.results[0] || null;
}

export async function saveRadarMission(m: Omit<RadarMission, 'created_at' | 'done_at' | 'status'> & { status?: string }): Promise<void> {
    const now = new Date().toISOString();
    await executeQuery(
        `INSERT INTO radar_mission (day, source, handle, name, genre, reason, article_title, article_url, followers, avg_comment, status, rerolls, created_at, done_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
         ON CONFLICT(day, source) DO UPDATE SET
            handle = excluded.handle, name = excluded.name, genre = excluded.genre, reason = excluded.reason,
            article_title = excluded.article_title, article_url = excluded.article_url,
            followers = excluded.followers, avg_comment = excluded.avg_comment,
            rerolls = excluded.rerolls`,
        [m.day, m.source, m.handle, m.name, m.genre, m.reason, m.article_title, m.article_url,
         m.followers, m.avg_comment, m.status || 'open', m.rerolls, now]
    );
}

export async function completeRadarMission(day: string, source: string): Promise<void> {
    await executeQuery(
        `UPDATE radar_mission SET status = 'done', done_at = ? WHERE day = ? AND source = ?`,
        [new Date().toISOString(), day, source]
    );
}

export async function listRadarMissions(source: string): Promise<RadarMission[]> {
    const res = await executeQuery<RadarMission>(
        'SELECT * FROM radar_mission WHERE source = ? ORDER BY day DESC LIMIT 120', [source]
    );
    return res.results;
}

// ============================================================
// listening_clips — 音声ファイル名だけで作るリスニング用のコーパス
//
// Excel を使わない。PlayPhrase 等から落とした音声のファイル名がそのまま英文なので、
// ファイル名 = 正解、音声 = 問題 として1行に畳む。
//
// **phrases テーブルには絶対に入れない。** phrases は約10,400行あり、SELECT * が
// D1 無料枠の行読み上限を焼いた前科がある (dev-trap-d1-row-reads)。ここは大量投入前提なので
// 最初から索引と LIMIT でしか読まない設計にする:
//   - slug が主キー。重複判定は INSERT OR IGNORE (索引ヒット、全表走査なし)
//   - bucket = 投入時に振る 0-99 の乱数。出題は「バケツを選ぶ」ことで擬似ランダムにする。
//     ORDER BY RANDOM() は全表走査なので使わない
//   - 一覧系は必ず LIMIT を付ける
// ============================================================

export interface ListeningClip {
    slug: string;       // ファイル名から起こしたキー。採点も重複判定もこれで行う
    text: string;       // 表示用の素のテキスト (句読点なし。ファイル名が失っているため)
    url: string;        // R2 の音声 URL
    pack: string;       // 取り込みの束 (既定は取り込み日)。出題範囲の指定に使う
    words: number;      // 語数。難易度の代わりに使う唯一の指標
    bucket: number;     // 0-99。擬似ランダム出題用
    created_at: string;
}

export async function initListeningClipsTable(): Promise<void> {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS listening_clips (
            slug TEXT PRIMARY KEY,
            text TEXT NOT NULL,
            url TEXT NOT NULL,
            pack TEXT NOT NULL,
            words INTEGER NOT NULL,
            bucket INTEGER NOT NULL,
            created_at TEXT NOT NULL
        )
    `);
    await executeQuery('CREATE INDEX IF NOT EXISTS idx_listening_pack_bucket ON listening_clips(pack, bucket)');
    await executeQuery('CREATE INDEX IF NOT EXISTS idx_listening_words ON listening_clips(words)');
}

/** 追加。既に同じ slug があれば何もしない。戻り値 = 実際に入ったか */
export async function insertListeningClip(c: Omit<ListeningClip, 'created_at'>): Promise<boolean> {
    const res = await executeQuery(
        `INSERT OR IGNORE INTO listening_clips (slug, text, url, pack, words, bucket, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [c.slug, c.text, c.url, c.pack, c.words, c.bucket, new Date().toISOString()]
    );
    return (res.meta?.changes ?? 0) > 0;
}

/** 既に入っている slug だけを返す (取り込み前の照合用。IN 句なので索引で引ける) */
export async function findExistingListeningSlugs(slugs: string[]): Promise<string[]> {
    if (slugs.length === 0) return [];
    const out: string[] = [];
    for (let i = 0; i < slugs.length; i += 100) {
        const chunk = slugs.slice(i, i + 100);
        const placeholders = chunk.map(() => '?').join(',');
        const res = await executeQuery<{ slug: string }>(
            `SELECT slug FROM listening_clips WHERE slug IN (${placeholders})`, chunk
        );
        out.push(...res.results.map(r => r.slug));
    }
    return out;
}

/** 出題用。bucket は「ここから先」の開始位置。索引順に LIMIT 件だけ読むので、
 *  表が何万行に育っても1回の読み取りは LIMIT 件で頭打ちになる。
 *  bucket = ? の完全一致だと、行数が少ないうちは1バケツに数件しか無くて空振りする。 */
export async function getListeningClips(opts: {
    pack?: string; bucket?: number; minWords?: number; maxWords?: number; limit?: number;
} = {}): Promise<ListeningClip[]> {
    const where: string[] = [];
    const params: (string | number)[] = [];
    if (opts.pack) { where.push('pack = ?'); params.push(opts.pack); }
    if (typeof opts.bucket === 'number') { where.push('bucket >= ?'); params.push(opts.bucket); }
    if (typeof opts.minWords === 'number') { where.push('words >= ?'); params.push(opts.minWords); }
    if (typeof opts.maxWords === 'number') { where.push('words <= ?'); params.push(opts.maxWords); }
    const limit = Math.min(Math.max(opts.limit ?? 40, 1), 200);
    const sql = `SELECT * FROM listening_clips${where.length ? ' WHERE ' + where.join(' AND ') : ''} ORDER BY bucket, slug LIMIT ${limit}`;
    try {
        const res = await executeQuery<ListeningClip>(sql, params);
        return res.results;
    } catch {
        return [];
    }
}

/** 束の一覧 (件数付き)。束は多くても数十なので GROUP BY で足りる */
export async function listListeningPacks(): Promise<{ pack: string; n: number }[]> {
    try {
        const res = await executeQuery<{ pack: string; n: number }>(
            'SELECT pack, COUNT(*) AS n FROM listening_clips GROUP BY pack ORDER BY pack DESC LIMIT 60'
        );
        return res.results;
    } catch {
        return [];
    }
}

/** 1件消す (取り違えて入れた行の掃除用)。戻り値 = 実際に消えたか */
export async function deleteListeningClip(slug: string): Promise<boolean> {
    const res = await executeQuery('DELETE FROM listening_clips WHERE slug = ?', [slug]);
    return (res.meta?.changes ?? 0) > 0;
}

/** ライブラリの統計。listening_clips は小さい表なので集計1本で足りる
 *  (phrases と違い全表走査しても数千行。増えたらここだけ見直す) */
export async function getListeningStats(): Promise<{
    total: number; packs: { pack: string; n: number }[];
    words: { avg: number; min: number; max: number };
}> {
    try {
        const agg = await executeQuery<{ n: number; avg: number; min: number; max: number }>(
            'SELECT COUNT(*) AS n, AVG(words) AS avg, MIN(words) AS min, MAX(words) AS max FROM listening_clips'
        );
        const a = agg.results[0] || { n: 0, avg: 0, min: 0, max: 0 };
        return {
            total: a.n || 0,
            packs: await listListeningPacks(),
            words: {
                avg: Math.round((a.avg || 0) * 10) / 10,
                min: a.min || 0,
                max: a.max || 0,
            },
        };
    } catch {
        return { total: 0, packs: [], words: { avg: 0, min: 0, max: 0 } };
    }
}

/** 束を付け替える。落とした後にジャンル分けをやり直せるようにするため */
export async function retagListeningClip(slug: string, pack: string): Promise<boolean> {
    const res = await executeQuery(
        'UPDATE listening_clips SET pack = ? WHERE slug = ?', [pack, slug]
    );
    return (res.meta?.changes ?? 0) > 0;
}
