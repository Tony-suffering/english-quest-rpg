/**
 * THE LIFELINE — 表現バンク
 *
 * ■ これが本体である
 * 窓口(Station)が持つ phrases 6文は「通過に必要な最小構成」であって、表現の総量ではない。
 * アメリカ人が生まれてから死ぬまでに触れる口語表現を **全部** 入れるのがこのバンクの仕事。
 *
 *   目標   1窓口あたり150前後 × 137窓口 ≒ 20,000表現
 *   現状   bankTotal() で数えている。増えた分だけ /english/lifeline の数字が動く
 *
 * ■ 2つの前提(本人の指示・2026-08-07)
 *   A. **口語だけでいい。** 本を読まなくても喋れないネイティブはいない。
 *      書き言葉・文語・論説体は一切入れない。声に出して飛ぶ形だけを入れる。
 *   B. **重心は0-30歳。** 言語体系は30歳前後で完成する。ACT I-V(窓口1-88)を厚くする。
 *      ACT VI-VIII は薄くてよい。ただし窓口としては消さない(抜けを作らないため)。
 *
 * ■ 積み方の規則
 *   1. キーは Station の en(英語タイトル)そのもの。ずれたら merge されないので気づける
 *   2. 1エントリ = 1文。単語では入れない。窓口で実際に飛んでくる形で持つ
 *   3. 重複を恐れない。同じ言い方が別の窓口で出るなら、両方に入れる。
 *      人生は重複するし、同じ文でも場所が変われば意味が変わる
 *   4. note は1行。文法用語を使わない。使うのは「いつ・誰が・なぜその形か」だけ
 *   5. 1ファイル1窓口。ファイルが大きくなったら分割する。混ぜない
 *
 * ■ 追加の手順
 *   1. lifeline/bank/<slug>.ts を作る
 *   2. ここで import して BANK に足す
 *   3. tonio-lifeline.ts の bankOf() が自動で拾う。他は何も触らなくていい
 */

import type { LifePhrase } from '../../lifeline-types';
import { DELIVERY_ROOM_BANK } from './the-delivery-room';
import { ORDERING_BANK } from './ordering-at-the-counter';
import { EATING_OUT_BANK } from './eating-out';
import { ER_BANK } from './the-emergency-room';
import { LONG_TABLE_BANK } from './the-long-table';
import { INSURANCE_CALL_BANK } from './calling-the-insurance-company';
import { FIRST_WEEK_BANK } from './first-week-on-the-job';
import { SLAGGED_OFF_BANK } from './getting-slagged-off';

import { LEASE_BANK } from './the-lease';

import { QUOTE_BANK } from './getting-a-quote';

import { AIRPORT_BANK } from './the-airport-delay';

import { HOTEL_BANK } from './checking-in';

import { HOA_BANK } from './the-hoa-welcome';

import { DMV_BANK } from './the-road-test';

import { PTC_BANK } from './the-parent-teacher-conference';

import { BANK_BANK } from './opening-an-account';

import { PHARMACY_BANK } from './the-pharmacy-counter';

import { INTERVIEW_BANK } from './the-interview';

import { BBQ_BANK } from './the-backyard-bbq';

import { THANKSGIVING_BANK } from './thanksgiving';

/** キー = Station の en。値 = その窓口の表現(上限なし) */
export const BANK: Record<string, LifePhrase[]> = {
    'The Delivery Room': DELIVERY_ROOM_BANK,
    'Ordering at the Counter': ORDERING_BANK,
    'Eating Out': EATING_OUT_BANK,
    'The Emergency Room': ER_BANK,
    'The Long Table': LONG_TABLE_BANK,
    'Calling the Insurance Company': INSURANCE_CALL_BANK,
    'First Week on the Job': FIRST_WEEK_BANK,
    'Getting Slagged Off': SLAGGED_OFF_BANK,
    'The Lease': LEASE_BANK,
    'Getting a Quote': QUOTE_BANK,
    'The Airport Delay': AIRPORT_BANK,
    'Checking In': HOTEL_BANK,
    'The HOA Welcome': HOA_BANK,
    'The Road Test': DMV_BANK,
    'The Parent-Teacher Conference': PTC_BANK,
    'Opening an Account': BANK_BANK,
    'The Pharmacy Counter': PHARMACY_BANK,
    'The Interview': INTERVIEW_BANK,
    'The Backyard BBQ': BBQ_BANK,
    'Thanksgiving': THANKSGIVING_BANK,
};

export function bankFor(stationEn: string): LifePhrase[] {
    return BANK[stationEn] ?? [];
}

export function bankTotal(): number {
    return Object.values(BANK).reduce((n, list) => n + list.length, 0);
}

/** バンクがまだ空の窓口を数えるために使う */
export function bankedStationCount(): number {
    return Object.keys(BANK).length;
}
