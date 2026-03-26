/**
 * Local API Interceptor
 * Replaces all /api/* fetch calls with localStorage-based operations.
 * No server dependency. No D1. No R2. Everything in the browser.
 */

const PREFIX = 'tl_'
const k = (name: string) => `${PREFIX}${name}`

// ── helpers ──
function store(key: string): unknown[] {
    try { return JSON.parse(localStorage.getItem(k(key)) || '[]') } catch { return [] }
}
function storeObj(key: string): Record<string, unknown> {
    try { return JSON.parse(localStorage.getItem(k(key)) || '{}') } catch { return {} }
}
function save(key: string, data: unknown) {
    localStorage.setItem(k(key), JSON.stringify(data))
}
function nanoid(n = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    return Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
function today() { return new Date().toISOString().slice(0, 10) }
function now() { return new Date().toISOString() }
function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
}

// ── Gacha ──
const GACHA_NORMAL = [
    { tier: 'MISS', weight: 50, sparks: 0, cp: 0 },
    { tier: 'BONUS', weight: 25, sparks: 3, cp: 2 },
    { tier: 'GREAT', weight: 15, sparks: 10, cp: 5 },
    { tier: 'SUPER', weight: 7, sparks: 20, cp: 10 },
    { tier: 'MEGA', weight: 2.5, sparks: 50, cp: 25 },
    { tier: 'LEGENDARY', weight: 0.5, sparks: 100, cp: 50 },
]

function rollGacha(pity: number, chainTier: number) {
    const bonus = chainTier * 5
    const pityBonus = Math.min(pity, 30)
    const roll = Math.random() * 100
    let acc = 0
    for (const g of GACHA_NORMAL) {
        acc += g.weight + (g.tier !== 'MISS' ? bonus + pityBonus : -(bonus + pityBonus))
        if (roll < acc) return g
    }
    return GACHA_NORMAL[0]
}

// ── Route Handlers ──

type Handler = (url: URL, method: string, body: Record<string, unknown> | null) => Response

const routes: Record<string, Handler> = {

    // ── PHRASES ──
    '/api/phrases': (url, method, body) => {
        const phrases = store('phrases') as Record<string, unknown>[]
        if (method === 'GET') return json({ phrases, success: true })
        if (method === 'POST' && body) {
            const id = nanoid()
            const entry = { id, english: body.english, japanese: body.japanese || '', category: body.category || '', date: body.date || today(), created_at: now() }
            const toStr = (v: unknown): string => typeof v === 'string' ? v : ''
            const dup = phrases.find((p: Record<string, unknown>) => toStr(p.english).toLowerCase() === toStr(entry.english).toLowerCase() && p.date === entry.date)
            if (dup) return json({ phrase: dup, success: true, duplicate: true })
            phrases.push(entry)
            save('phrases', phrases)
            return json({ phrase: entry, success: true })
        }
        return json({ success: false }, 400)
    },

    // Consolidated endpoint for Training page (returns phrases + mastery + links in one call)
    '/api/training-init': () => {
        const phrases = store('phrases') as Record<string, unknown>[]
        const mastery = storeObj('mastery') as Record<string, Record<string, unknown>>
        const links = store('phrase_links') as Record<string, unknown>[]
        const m: Record<string, number> = {}
        const ll: Record<string, string> = {}
        const cp: Record<string, number> = {}
        for (const [pid, data] of Object.entries(mastery)) {
            m[pid] = (data.level as number) || 0
            ll[pid] = (data.lastLeveled as string) || ''
            cp[pid] = (data.cardPoints as number) || 0
        }
        // Group links by phrase_id
        const groupedLinks: Record<string, unknown[]> = {}
        for (const link of links) {
            const pid = link.phrase_id as string
            if (!groupedLinks[pid]) groupedLinks[pid] = []
            groupedLinks[pid].push(link)
        }
        return json({ phrases, mastery: m, lastLeveled: ll, cardPoints: cp, recordings: {}, links: groupedLinks, success: true })
    },

    '/api/phrases/mastery': (url, method, body) => {
        const mastery = storeObj('mastery') as Record<string, Record<string, unknown>>
        if (method === 'GET') {
            const m: Record<string, number> = {}
            const ll: Record<string, string> = {}
            const cp: Record<string, number> = {}
            const cn: Record<string, string> = {}
            for (const [pid, data] of Object.entries(mastery)) {
                m[pid] = (data.level as number) || 0
                ll[pid] = (data.lastLeveled as string) || ''
                cp[pid] = (data.cardPoints as number) || 0
                cn[pid] = (data.cardName as string) || ''
            }
            return json({ mastery: m, lastLeveled: ll, cardPoints: cp, cardNames: cn, success: true })
        }
        if (method === 'POST' && body) {
            const pid = body.phraseId as string
            const level = body.level as number
            const t = body.today as string || today()
            const existing = mastery[pid] || { level: 0, lastLeveled: '', cardPoints: 0, cardName: '' }
            if (level > 0 && level <= 3 && existing.lastLeveled === t) {
                return json({ success: false, error: 'Already leveled today' }, 400)
            }
            mastery[pid] = { ...existing, level, lastLeveled: level > (existing.level as number) ? t : existing.lastLeveled }
            save('mastery', mastery)
            return json({ success: true })
        }
        return json({ success: false }, 400)
    },

    '/api/phrases/links': (url, method, body) => {
        const links = store('phrase_links') as Record<string, unknown>[]
        if (method === 'GET') return json({ links, success: true })
        if (method === 'POST' && body) {
            const entry = { phrase_id: body.phrase_id, text: body.text, created_at: now() }
            links.push(entry)
            save('phrase_links', links)
            return json({ link: entry, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── USER PHRASES ──
    '/api/user-phrases': (url, method, body) => {
        let phrases = store('user_phrases') as Record<string, unknown>[]
        const stats = url.searchParams.get('stats')
        if (method === 'GET' && stats === 'true') {
            const total = phrases.length
            const byMastery: Record<number, number> = {}
            const byType: Record<string, number> = {}
            phrases.forEach((p) => {
                const ml = (p.mastery_level as number) || 0
                byMastery[ml] = (byMastery[ml] || 0) + 1
                const t = (p.type as string) || 'unknown'
                byType[t] = (byType[t] || 0) + 1
            })
            return json({ stats: { total, byMastery, byType }, success: true })
        }
        if (method === 'GET') return json({ phrases, success: true })
        if (method === 'POST' && body) {
            const dup = phrases.find((p) => (p.phrase as string)?.toLowerCase() === (body.phrase as string)?.toLowerCase())
            if (dup) return json({ phrase: dup, success: true, duplicate: true })
            const entry = { id: nanoid(), phrase: body.phrase, type: body.type || 'word', meaning: body.meaning || '', note: body.note || '', example: body.example || '', source: body.source || '', mastery_level: 0, times_used: 0, created_at: body.date || now(), last_reviewed_at: null, video_id: null, video_timestamp: null, video_text: null, review_sentence: null, review_idiom: null, review_idiom_meaning: null, review_sentence_ja: null }
            phrases.push(entry)
            save('user_phrases', phrases)
            return json({ phrase: entry, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── USER WORDS ──
    '/api/user-words': (url, method, body) => {
        let words = store('user_words') as Record<string, unknown>[]
        const masteryParam = url.searchParams.get('mastery')
        if (method === 'GET' && masteryParam === 'true') {
            const m: Record<string, number> = {}
            const ll: Record<string, string> = {}
            const cp: Record<string, number> = {}
            words.forEach((w) => { m[w.id as string] = (w.mastery_level as number) || 0; ll[w.id as string] = (w.last_leveled_at as string) || ''; cp[w.id as string] = (w.card_points as number) || 0 })
            return json({ mastery: m, lastLeveled: ll, cardPoints: cp, success: true })
        }
        if (method === 'GET') return json({ words, success: true })
        if (method === 'POST' && body) {
            const dup = words.find((w) => (w.english as string)?.toLowerCase() === (body.english as string)?.toLowerCase())
            if (dup) return json({ word: dup, success: true, duplicate: true })
            const entry = { id: nanoid(), english: body.english, pronunciation: body.pronunciation || '', japanese: body.japanese || '', note: body.note || '', category: body.category || '', mastery_level: 0, card_points: 0, card_name: '', created_at: now(), last_reviewed_at: null, last_leveled_at: null }
            words.push(entry)
            save('user_words', words)
            return json({ word: entry, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── PLAYER STATS ──
    '/api/player-stats': (url, method, body) => {
        let stats = storeObj('player_stats') as Record<string, unknown>
        if (!stats.total_xp) stats = { total_xp: 0, total_touches: 0, sparks: 0, pity_counter: 0, legendary_count: 0 }
        if (method === 'GET') return json({ ...stats, success: true })
        if (method === 'PATCH' && body) {
            Object.assign(stats, body)
            save('player_stats', stats)
            return json({ ...stats, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── SPARKS ──
    '/api/sparks': (url, method, body) => {
        let stats = storeObj('player_stats') as Record<string, unknown>
        if (!stats.sparks) stats = { ...stats, sparks: 0 }
        if (method === 'GET') return json({ sparks: stats.sparks, success: true })
        if (method === 'POST' && body) {
            stats.sparks = ((stats.sparks as number) || 0) + ((body.amount as number) || 0)
            save('player_stats', stats)
            return json({ sparks: stats.sparks, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── REVIEW COUNT ──
    '/api/review-count': (url, method, body) => {
        const counts = storeObj('review_counts') as Record<string, Record<string, number>>
        if (method === 'GET') {
            const date = url.searchParams.get('date') || today()
            const month = url.searchParams.get('month')
            if (month) {
                const filtered: Record<string, Record<string, number>> = {}
                Object.entries(counts).forEach(([d, v]) => { if (d.startsWith(month)) filtered[d] = v })
                return json({ counts: filtered, success: true })
            }
            const entry = counts[date] || { count: 0, xp: 0, sparks: 0 }
            return json({ ...entry, success: true })
        }
        if (method === 'POST' && body) {
            const date = (body.date as string) || today()
            const xp = (body.xp as number) || 0
            const chainTier = (body.chain_tier as number) || 0
            let stats = storeObj('player_stats') as Record<string, number>
            if (!stats.total_xp) stats = { total_xp: 0, total_touches: 0, sparks: 0, pity_counter: 0, legendary_count: 0 }
            const gacha = rollGacha(stats.pity_counter || 0, chainTier)
            const entry = counts[date] || { count: 0, xp: 0, sparks: 0 }
            entry.count += 1
            entry.xp += xp + gacha.sparks
            entry.sparks += gacha.sparks
            counts[date] = entry
            save('review_counts', counts)
            stats.total_xp += xp
            stats.total_touches += 1
            stats.sparks += gacha.sparks
            if (gacha.tier === 'MISS') { stats.pity_counter = (stats.pity_counter || 0) + 1 } else { stats.pity_counter = 0 }
            if (gacha.tier === 'LEGENDARY') stats.legendary_count = (stats.legendary_count || 0) + 1
            save('player_stats', stats)
            // Card points
            if (body.phrase_id) {
                const mastery = storeObj('mastery') as Record<string, Record<string, unknown>>
                const pid = body.phrase_id as string
                const existing = mastery[pid] || { level: 0, lastLeveled: '', cardPoints: 0, cardName: '' }
                existing.cardPoints = ((existing.cardPoints as number) || 0) + gacha.cp
                mastery[pid] = existing
                save('mastery', mastery)
            }
            return json({ count: entry.count, xp: entry.xp, sparks: entry.sparks, total_xp: stats.total_xp, gacha: { tier: gacha.tier, sparks_won: gacha.sparks, total_sparks: stats.sparks, card_points_earned: gacha.cp, card_total_points: gacha.cp, luck_multiplier: 1 + (stats.pity_counter || 0) / 100 }, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── DATE TOUCHES ──
    '/api/date-touches': (url, method, body) => {
        const touches = storeObj('date_touches') as Record<string, number>
        if (method === 'GET') {
            const month = url.searchParams.get('month')
            if (month) {
                const filtered: Record<string, number> = {}
                Object.entries(touches).forEach(([d, c]) => { if (d.startsWith(month)) filtered[d] = c })
                return json({ touches: filtered, success: true })
            }
            return json({ touches, success: true })
        }
        if (method === 'POST' && body) {
            const pd = body.phrase_date as string
            touches[pd] = (touches[pd] || 0) + 1
            save('date_touches', touches)
            return json({ phrase_date: pd, count: touches[pd], success: true })
        }
        return json({ success: false }, 400)
    },

    // ── GOROKU ──
    '/api/goroku': (url, method, body) => {
        let entries = store('goroku') as Record<string, unknown>[]
        const daySlot = url.searchParams.get('day_slot')
        const stats = url.searchParams.get('stats')
        if (method === 'GET') {
            if (stats === 'true') {
                const counts: Record<number, { total: number; mastered: number }> = {}
                entries.forEach((e) => {
                    const ds = e.day_slot as number
                    if (!counts[ds]) counts[ds] = { total: 0, mastered: 0 }
                    counts[ds].total += 1
                    if ((e.mastery_level as number) >= 3) counts[ds].mastered += 1
                })
                return json({ counts, success: true })
            }
            let filtered = entries
            if (daySlot) filtered = entries.filter((e) => e.day_slot === parseInt(daySlot))
            // Parse english JSON if stored as string
            filtered = filtered.map((e) => {
                if (typeof e.english === 'string') {
                    try { e.english = JSON.parse(e.english as string) } catch { /* keep as is */ }
                }
                return e
            })
            return json({ entries: filtered, success: true })
        }
        if (method === 'POST' && body) {
            const catPrefix: Record<string, string> = { reaction: 'r', request: 'q', opinion: 'o', suggestion: 's', filler: 'f', shutdown: 'x' }
            const prefix = catPrefix[body.category as string] || 'u'
            const ds = body.day_slot as number
            const count = entries.filter((e) => e.day_slot === ds).length
            if (count >= 10) return json({ success: false, error: 'Max 10 per slot' }, 400)
            const id = `d${String(ds).padStart(2, '0')}_${prefix}${nanoid(4)}`
            const english = typeof body.english === 'string' ? body.english : JSON.stringify(body.english)
            const entry = { id, day_slot: ds, japanese: body.japanese, english, literal: body.literal || '', context: body.context || '', category: body.category, mastery_level: 0, slot: body.slot || '', slot_hints: body.slotHints ? JSON.stringify(body.slotHints) : null, created_at: now() }
            entries.push(entry)
            save('goroku', entries)
            return json({ entry, success: true })
        }
        return json({ success: false }, 400)
    },

    '/api/goroku/init': (_url, method) => {
        if (method === 'POST') {
            // Goroku init seeds from static data - pages handle this by importing seed directly
            return json({ success: true, message: 'Use client-side seed import' })
        }
        return json({ success: false }, 400)
    },

    // ── VOICE RECORDINGS (stub - no R2) ──
    '/api/voice-recordings': (url, method, body) => {
        const recs = store('voice_recordings') as Record<string, unknown>[]
        const phraseId = url.searchParams.get('phraseId')
        if (method === 'GET') {
            if (phraseId) {
                const filtered = recs.filter((r) => r.phrase_id === phraseId)
                return json({ success: true, recordings: filtered })
            }
            const grouped: Record<string, unknown[]> = {}
            recs.forEach((r) => {
                const pid = r.phrase_id as string
                if (!grouped[pid]) grouped[pid] = []
                grouped[pid].push(r)
            })
            return json({ success: true, recordings: grouped })
        }
        if (method === 'POST') {
            // Can't upload to R2 client-side. Store metadata only.
            const id = nanoid()
            const entry = { id, phrase_id: (body?.phraseId as string) || '', url: `local://${id}`, created_at: now() }
            recs.push(entry)
            save('voice_recordings', recs)
            return json({ success: true, url: entry.url, phraseId: entry.phrase_id, timestamp: entry.created_at, recording: entry })
        }
        if (method === 'DELETE') {
            const id = url.searchParams.get('id')
            const filtered = recs.filter((r) => r.id !== id)
            save('voice_recordings', filtered)
            return json({ success: true })
        }
        return json({ success: false }, 400)
    },

    // ── EIKAIWA LOG ──
    '/api/eikaiwa-log': (url, method, body) => {
        let entries = store('eikaiwa_log') as Record<string, unknown>[]
        const stats = url.searchParams.get('stats')
        if (method === 'GET') {
            if (stats === 'true') {
                const sessions: Record<string, number> = {}
                entries.forEach((e) => {
                    const sid = String(e.session_id)
                    sessions[sid] = (sessions[sid] || 0) + 1
                })
                return json({ total: entries.length, sessions, success: true })
            }
            entries = entries.map((e) => {
                for (const field of ['highlights', 'struggle_points', 'goroku_ids']) {
                    if (typeof e[field] === 'string') { try { e[field] = JSON.parse(e[field] as string) } catch { /* */ } }
                }
                return e
            })
            return json({ entries, success: true })
        }
        if (method === 'POST' && body) {
            const entry = { id: nanoid(), session_id: body.session_id, session_date: body.session_date || today(), highlights: JSON.stringify(body.highlights || []), struggle_points: JSON.stringify(body.struggle_points || []), flow_rating: body.flow_rating || 0, note: body.note || '', goroku_ids: JSON.stringify(body.goroku_ids || []), created_at: now() }
            entries.push(entry)
            save('eikaiwa_log', entries)
            return json({ entry, success: true })
        }
        return json({ success: false }, 400)
    },

    // ── MEMORIA ──
    '/api/memoria': (url, method, body) => {
        const progress = storeObj('memoria_progress') as Record<string, unknown>
        if (method === 'GET') return json({ progress, success: true })
        if (method === 'POST' && body) {
            const key = body.key as string
            progress[key] = body.value
            save('memoria_progress', progress)
            return json({ success: true })
        }
        return json({ success: false }, 400)
    },

    // ── PHRASE MASTERY (for individual ID routes) ──
    '/api/phrase-mastery': (url, method, body) => {
        return routes['/api/phrases/mastery'](url, method, body)
    },
}

// ── Dynamic route handlers (with path params like /api/user-phrases/[id]) ──
function handleDynamicRoute(pathname: string, method: string, body: Record<string, unknown> | null): Response | null {
    // /api/user-phrases/[id]
    let match = pathname.match(/^\/api\/user-phrases\/([^/]+)$/)
    if (match) {
        const id = match[1]
        let phrases = store('user_phrases') as Record<string, unknown>[]
        if (method === 'PATCH' && body) {
            phrases = phrases.map((p) => p.id === id ? { ...p, ...body, last_reviewed_at: now() } : p)
            save('user_phrases', phrases)
            return json({ success: true })
        }
        if (method === 'PUT' && body) {
            phrases = phrases.map((p) => p.id === id ? { ...p, ...body } : p)
            save('user_phrases', phrases)
            return json({ success: true })
        }
        if (method === 'DELETE') {
            phrases = phrases.filter((p) => p.id !== id)
            save('user_phrases', phrases)
            return json({ success: true })
        }
        return null
    }

    // /api/user-words/[id]
    match = pathname.match(/^\/api\/user-words\/([^/]+)$/)
    if (match) {
        const id = match[1]
        let words = store('user_words') as Record<string, unknown>[]
        if (method === 'PATCH' && body) {
            words = words.map((w) => w.id === id ? { ...w, ...body, last_reviewed_at: now() } : w)
            save('user_words', words)
            return json({ success: true })
        }
        if (method === 'DELETE') {
            words = words.filter((w) => w.id !== id)
            save('user_words', words)
            return json({ success: true })
        }
        return null
    }

    // /api/goroku/[id]
    match = pathname.match(/^\/api\/goroku\/([^/]+)$/)
    if (match && match[1] !== 'init') {
        const id = match[1]
        let entries = store('goroku') as Record<string, unknown>[]
        if (method === 'PATCH' && body) {
            entries = entries.map((e) => {
                if (e.id !== id) return e
                const updated = { ...e, ...body }
                if (body.english !== undefined && typeof body.english !== 'string') {
                    updated.english = JSON.stringify(body.english)
                }
                return updated
            })
            save('goroku', entries)
            return json({ success: true })
        }
        if (method === 'DELETE') {
            entries = entries.filter((e) => e.id !== id)
            save('goroku', entries)
            return json({ success: true })
        }
        return null
    }

    // /api/phrases/[id]
    match = pathname.match(/^\/api\/phrases\/([^/]+)$/)
    if (match && !['mastery', 'links'].includes(match[1])) {
        const id = match[1]
        let phrases = store('phrases') as Record<string, unknown>[]
        if (method === 'PATCH' && body) {
            phrases = phrases.map((p) => p.id === id ? { ...p, ...body } : p)
            save('phrases', phrases)
            return json({ success: true })
        }
        if (method === 'DELETE') {
            phrases = phrases.filter((p) => p.id !== id)
            save('phrases', phrases)
            return json({ success: true })
        }
        return null
    }

    return null
}

// ── Auto-seed goroku from static data ──
async function seedGorokuIfEmpty() {
    const existing = store('goroku') as unknown[]
    if (existing.length > 0) return
    try {
        const { GOROKU_SEEDS } = await import('@/data/english/goroku-seed')
        const catPrefix: Record<string, string> = { reaction: 'r', request: 'q', opinion: 'o', suggestion: 's', filler: 'f', shutdown: 'x' }
        const entries = GOROKU_SEEDS.map((s, i) => {
            const prefix = catPrefix[s.category] || 'u'
            const id = `d${String(s.daySlot).padStart(2, '0')}_${prefix}${String(i).padStart(3, '0')}`
            return {
                id, day_slot: s.daySlot, japanese: s.japanese,
                english: JSON.stringify(s.english), literal: s.literal || '',
                context: s.context, category: s.category, mastery_level: 0,
                slot: s.slot || '', slot_hints: s.slotHints ? JSON.stringify(s.slotHints) : null,
                created_at: now()
            }
        })
        save('goroku', entries)
        console.log(`[local-api] Seeded ${entries.length} goroku entries`)
    } catch (e) { console.warn('[local-api] Goroku seed failed:', e) }
}

// ── Auto-seed training phrases from quest data (first 300 = ~1 month) ──
async function seedPhrasesIfEmpty() {
    const existing = store('phrases') as unknown[]
    if (existing.length > 0) return
    try {
        const { QUEST_PHRASES } = await import('@/data/quest-phrases')
        // Start from 30 days ago so there's a month of content
        const now_ = new Date()
        const baseDate = new Date(now_.getFullYear(), now_.getMonth(), now_.getDate() - 29)
        // Seed first 300 phrases (~30 days x 10 phrases/day)
        const toSeed = QUEST_PHRASES.slice(0, Math.min(300, QUEST_PHRASES.length))
        const phrases = toSeed.map((qp, i) => {
            const dayOffset = Math.floor(i / 10)
            const d = new Date(baseDate)
            d.setDate(d.getDate() + dayOffset)
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
            return {
                id: qp.id,
                english: qp.english,
                japanese: qp.japanese || '',
                category: qp.element || '',
                date: dateStr,
                created_at: '2025-01-06T12:00:00.000Z',
            }
        })
        save('phrases', phrases)
        // Also mirror to rpg_custom_phrases so Quest knows they're "caught"
        localStorage.setItem('rpg_custom_phrases', JSON.stringify(phrases))
        console.log(`[local-api] Seeded ${phrases.length} training phrases`)
    } catch (e) { console.warn('[local-api] Phrase seed failed:', e) }
}

// ── Bridge: keep tl_phrases and rpg_custom_phrases in sync ──
function bridgeQuestToApi() {
    // If quest has phrases that API doesn't, merge them
    try {
        const apiPhrases = store('phrases') as Record<string, unknown>[]
        const rpgPhrases = JSON.parse(localStorage.getItem('rpg_custom_phrases') || '[]') as Record<string, unknown>[]
        const apiIds = new Set(apiPhrases.map(p => p.id))
        let added = 0
        for (const rp of rpgPhrases) {
            if (!apiIds.has(rp.id as string)) {
                apiPhrases.push({
                    id: rp.id,
                    english: rp.english,
                    japanese: rp.japanese || '',
                    category: rp.category || '',
                    date: rp.date || today(),
                    created_at: (rp as Record<string, unknown>).created_at || now(),
                })
                added++
            }
        }
        if (added > 0) {
            save('phrases', apiPhrases)
            console.log(`[local-api] Bridged ${added} quest phrases to API store`)
        }
    } catch {}
}

// ── Install interceptor ──
let installed = false

export function installLocalApi() {
    if (installed || typeof window === 'undefined') return
    installed = true
    // Clean up any phrases with array english (from old batch registration)
    try {
        const raw = localStorage.getItem('tl_phrases')
        if (raw) {
            const arr = JSON.parse(raw) as Record<string, unknown>[]
            const cleaned = arr.filter(p => typeof p.english === 'string')
            if (cleaned.length !== arr.length) {
                localStorage.setItem('tl_phrases', JSON.stringify(cleaned))
            }
        }
    } catch { /* */ }
    seedPhrasesIfEmpty().then(() => {
        bridgeQuestToApi()
    })
    seedGorokuIfEmpty()

    const originalFetch = window.fetch.bind(window)

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const url = typeof input === 'string' ? new URL(input, location.origin) : input instanceof URL ? input : new URL(input.url, location.origin)
        const pathname = url.pathname

        if (!pathname.startsWith('/api/')) {
            return originalFetch(input, init)
        }

        const method = (init?.method || 'GET').toUpperCase()
        let body: Record<string, unknown> | null = null
        if (init?.body) {
            try {
                if (typeof init.body === 'string') body = JSON.parse(init.body)
                else if (init.body instanceof FormData) {
                    body = {}
                    ;(init.body as FormData).forEach((v, k) => { body![k] = v })
                }
            } catch { body = {} }
        }

        // Try static routes first
        const handler = routes[pathname]
        if (handler) return handler(url, method, body)

        // Try dynamic routes
        const dynamicResult = handleDynamicRoute(pathname, method, body)
        if (dynamicResult) return dynamicResult

        // Unknown API route - return empty success
        console.warn(`[local-api] Unhandled: ${method} ${pathname}`)
        return json({ success: true })
    }
}
