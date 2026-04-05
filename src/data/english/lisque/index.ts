// リスクエ (LisQue) - Master index
import type { LisqueDay } from '@/types/lisque';

// These will be populated by the data files
let _days: LisqueDay[] = [];

export async function getLisqueDays(): Promise<LisqueDay[]> {
  if (_days.length > 0) return _days;

  const [d1, d2] = await Promise.all([
    import('./days-01-15').then(m => m.LISQUE_DAYS_01_15),
    import('./days-16-30').then(m => m.LISQUE_DAYS_16_30),
  ]);

  _days = [...d1, ...d2].sort((a, b) => a.day - b.day);
  return _days;
}

// Synchronous version for static import
export { LISQUE_DAYS_01_15 } from './days-01-15';
export { LISQUE_DAYS_16_30 } from './days-16-30';
