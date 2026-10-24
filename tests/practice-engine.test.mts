/**
 * 今日の練習 エンジンの検査
 *
 * 実行: npx tsx tests/practice-engine.test.mts
 *
 * 見ているのは、壊れると困るところだけ:
 *   - 保存キーが tonio-practice: で始まり、他のキーを書き換えない
 *   - 自己評価で次に出す日が決まる(ローカル日付、月をまたいでも正しい)
 *   - 二度押しが二重に数えられない
 *   - 読めない保存値は退避してから上書きする(元データを失わない)
 *   - 百日課程の course:learned には足すだけ(消さない・壊れていたら触らない)
 *   - 連続日数と期限切れの数え方
 */

import assert from 'node:assert/strict';

// ── ブラウザの localStorage の代わり ──
class MemoryStorage {
    private m = new Map<string, string>();
    get length() { return this.m.size; }
    key(i: number) { return [...this.m.keys()][i] ?? null; }
    getItem(k: string) { return this.m.has(k) ? this.m.get(k)! : null; }
    setItem(k: string, v: string) { this.m.set(k, String(v)); }
    removeItem(k: string) { this.m.delete(k); }
    clear() { this.m.clear(); }
    snapshot() { return Object.fromEntries(this.m); }
}
const storage = new MemoryStorage();
(globalThis as unknown as { window: unknown }).window = { localStorage: storage };

const engine = await import('../src/lib/english/practice/engine');
const {
    localToday, addDays, daysBetween, newCard, rateCard, planSession, startSession, applyRating, finishSession,
    loadCards, loadLog, loadState, saveCards, summarize, readCourseLearned, addCourseLearned, dueCards, KEYS,
    REVIEW_CAP, NEW_PER_DAY,
} = engine;

let passed = 0;
function test(name: string, fn: () => void) {
    storage.clear();
    fn();
    passed += 1;
    console.log(`ok - ${name}`);
}

test('ローカル日付: 月末をまたいでも1日ずつ進む', () => {
    assert.equal(addDays('2026-10-31', 1), '2026-11-01');
    assert.equal(addDays('2026-12-31', 1), '2027-01-01');
    assert.equal(addDays('2026-03-01', -1), '2026-02-28');
    assert.equal(daysBetween('2026-10-24', '2026-11-03'), 10);
    assert.match(localToday(new Date(2026, 9, 24, 23, 59)), /^2026-10-24$/);
    assert.match(localToday(new Date(2026, 9, 25, 0, 1)), /^2026-10-25$/);
});

test('自己評価: すぐ言えた→箱が進み間隔が伸びる / 出てこなかった→箱1で明日', () => {
    const t = '2026-10-24';
    let c = newCard('c1000:you know', 'course', t);
    c = rateCard(c, 'good', t);           // box 2 → 3日
    assert.equal(c.box, 2);
    assert.equal(c.next, '2026-10-27');
    c = rateCard(c, 'good', '2026-10-27'); // box 3 → 7日
    assert.equal(c.box, 3);
    assert.equal(c.next, '2026-11-03');
    c = rateCard(c, 'hard', '2026-11-03'); // box 2, ease 2.35 → round(3*0.94)=3
    assert.equal(c.box, 2);
    assert.equal(c.next, '2026-11-06');
    c = rateCard(c, 'again', '2026-11-06'); // box 1 → 明日
    assert.equal(c.box, 1);
    assert.equal(c.next, '2026-11-07');
    assert.equal(c.reviews, 4);
    assert.deepEqual([c.good, c.hard, c.again], [2, 1, 1]);
});

test('セットの中身: 復習は期限切れだけ最大10、新規は選んだ教材から5、言えた済みは飛ばす', () => {
    const t = '2026-10-24';
    const cards: Record<string, ReturnType<typeof newCard>> = {};
    for (let i = 0; i < 12; i++) {
        const k = `c1000:due${i}`;
        cards[k] = { ...newCard(k, 'course', '2026-10-01'), box: (i % 5) + 1 as 1 | 2 | 3 | 4 | 5, next: '2026-10-20' };
    }
    cards['c1000:future'] = { ...newCard('c1000:future', 'course', '2026-10-01'), next: '2026-10-30' };
    const deckKeys = ['c1000:due0', 'c1000:future', 'c1000:learned-elsewhere', 'c1000:n1', 'c1000:n2', 'c1000:n3', 'c1000:n4', 'c1000:n5', 'c1000:n6'];
    const state = loadState();
    const plan = planSession(cards, 'course', deckKeys, state, t, { skipNew: new Set(['c1000:learned-elsewhere']) });
    assert.equal(plan.reviewKeys.length, REVIEW_CAP);
    assert.equal(plan.remainingDue, 2);
    assert.ok(!plan.reviewKeys.includes('c1000:future'));
    assert.deepEqual(plan.newKeys, ['c1000:n1', 'c1000:n2', 'c1000:n3', 'c1000:n4', 'c1000:n5']);
    assert.equal(plan.newKeys.length, NEW_PER_DAY);
    // 箱が小さいものが先
    const boxes = plan.reviewKeys.map(k => cards[k].box);
    assert.deepEqual(boxes, [...boxes].sort((a, b) => a - b));
});

test('保存: tonio-practice: 以外のキーには触らない、二度押しは1回だけ数える', () => {
    storage.setItem('course:learned', JSON.stringify(['come on']));
    storage.setItem('master-365-mastery', JSON.stringify({ x: 3 }));
    storage.setItem('quest-mastery', JSON.stringify({ q: 1 }));
    const before = storage.snapshot();

    let state = loadState();
    state = startSession(state, { reviewKeys: [], newKeys: ['c1000:you know', 'c1000:i think'], remainingDue: 0 }, localToday());
    let r = applyRating(state, 'c1000:you know', 'course', 'good', { courseEn: 'you know' });
    assert.equal(r.saved, true);
    assert.equal(r.duplicate, false);
    r = applyRating(r.state, 'c1000:you know', 'course', 'again', { courseEn: 'you know' });
    assert.equal(r.duplicate, true, '同じカードの二度目は無視');
    r = applyRating(r.state, 'c1000:i think', 'course', 'again');
    const fin = finishSession(r.state);
    assert.equal(fin.session, null);

    const after = storage.snapshot();
    for (const k of Object.keys(before)) {
        if (k === 'course:learned') continue;
        assert.equal(after[k], before[k], `${k} が変わっていない`);
    }
    for (const k of Object.keys(after)) {
        assert.ok(k.startsWith('tonio-practice:') || k in before, `新しいキーは tonio-practice: だけ: ${k}`);
    }
    const log = loadLog()[localToday()];
    assert.deepEqual([log.reviewed, log.good, log.again, log.newCards, log.sets], [2, 1, 1, 2, 1]);
    assert.equal(loadState().dailyNew.count, 2);
    // 百日課程の集合には足すだけ
    assert.deepEqual([...readCourseLearned()].sort(), ['come on', 'you know']);
});

test('壊れた保存値: 退避してから書く、course:learned が壊れていたら触らない', () => {
    storage.setItem(KEYS.cards, '{not json');
    storage.setItem('course:learned', '{"not":"an array"}');
    assert.deepEqual(loadCards(), {});
    assert.equal(saveCards({}), true);
    const backup = Object.keys(storage.snapshot()).find(k => k.startsWith(`${KEYS.cards}.backup-`));
    assert.ok(backup, '壊れていた値が退避されている');
    assert.equal(storage.getItem(backup!), '{not json');
    addCourseLearned('you know');
    assert.equal(storage.getItem('course:learned'), '{"not":"an array"}', '配列でない値は書き換えない');
    assert.equal(readCourseLearned().size, 0);
});

test('集計: 期限切れの数、連続日数(今日まだでも昨日まで続いていれば切れない)', () => {
    const t = '2026-10-24';
    const cards = {
        a: { ...newCard('c1000:a', 'course', '2026-10-20'), next: '2026-10-23' },
        b: { ...newCard('c1000:b', 'course', '2026-10-20'), next: '2026-10-24' },
        c: { ...newCard('c1000:c', 'course', '2026-10-20'), next: '2026-10-25' },
    };
    assert.equal(dueCards(cards, t).length, 2);
    const day = (n: number) => ({ reviewed: n, good: n, hard: 0, again: 0, newCards: 0, sets: 1 });
    const log = { '2026-10-21': day(5), '2026-10-22': day(5), '2026-10-23': day(5) };
    const s = summarize(cards, log, t);
    assert.equal(s.streak, 3);
    assert.equal(s.today.reviewed, 0);
    assert.equal(s.lastDate, '2026-10-23');
    assert.equal(s.last7.length, 7);
    assert.equal(s.last7[6].date, t);
    const s2 = summarize(cards, { ...log, '2026-10-24': day(2) }, t);
    assert.equal(s2.streak, 4);
    const s3 = summarize(cards, { '2026-10-20': day(1) }, t);
    assert.equal(s3.streak, 0, '間が空けば0');
});

console.log(`\n${passed} tests passed`);
