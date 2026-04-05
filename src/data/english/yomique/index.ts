// ヨミクエ (YomiQue) - Master index
import type { YomiqueDay } from '@/types/yomique';

let _days: YomiqueDay[] = [];

export async function getYomiqueDays(): Promise<YomiqueDay[]> {
  if (_days.length > 0) return _days;

  const [d1, d16, d19, d22, d25, d28] = await Promise.all([
    import('./days-01-15').then(m => m.YOMIQUE_DAYS_01_15),
    import('./days-16-18').then(m => m.YOMIQUE_DAYS_16_18),
    import('./days-19-21').then(m => m.YOMIQUE_DAYS_19_21),
    import('./days-22-24').then(m => m.YOMIQUE_DAYS_22_24),
    import('./days-25-27').then(m => m.YOMIQUE_DAYS_25_27),
    import('./days-28-30').then(m => m.YOMIQUE_DAYS_28_30),
  ]);

  _days = [...d1, ...d16, ...d19, ...d22, ...d25, ...d28].sort((a, b) => a.day - b.day);
  return _days;
}

export { YOMIQUE_DAYS_01_15 } from './days-01-15';
export { YOMIQUE_DAYS_16_18 } from './days-16-18';
export { YOMIQUE_DAYS_19_21 } from './days-19-21';
export { YOMIQUE_DAYS_22_24 } from './days-22-24';
export { YOMIQUE_DAYS_25_27 } from './days-25-27';
export { YOMIQUE_DAYS_28_30 } from './days-28-30';
