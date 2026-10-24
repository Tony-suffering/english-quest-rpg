/**
 * とにお あらすじ生成 — 毎回の記事冒頭に置く定型文。
 *
 * 連載物は、毎回「これは何の話か」を書かないと新規読者が入れない。
 * だが毎回考えていると続かないので、型を固定して数字だけ自動で最新にする。
 * 長さ違いを4本用意(1行 / 3行 / 戦況 / 初見向けフル)。
 *
 * 数字はすべて実データから算出。手で書き換える必要はない。
 */

import { getLeagueNights, getLatestLeagueNight } from './tonio-league';
import { SAGA_BESTIARY } from './tonio-saga';
import { getGrowthCurve } from './tonio-curriculum';

export interface RecapNumbers {
    night: number;      // 最新の夜
    aWin: number;       // 冠詞a 出勤
    aLose: number;      // 冠詞a 欠勤
    aStreak: number;    // 現在の連続欠勤
    monsters: number;   // 捏造語
    expressions: number; // 読者の持ち帰り表現
}

export function getRecapNumbers(upToNight?: number): RecapNumbers {
    const all = getLeagueNights();
    const night = upToNight ?? getLatestLeagueNight().night;
    const upto = all.filter((c) => c.night <= night);

    let aWin = 0, aLose = 0;
    for (const c of upto) {
        if (c.attendance.kanA === 'ON') aWin++;
        else if (c.attendance.kanA === 'OFF') aLose++;
    }
    // 現在の連続欠勤(RESTは飛ばす)
    let aStreak = 0;
    for (let i = upto.length - 1; i >= 0; i--) {
        const a = upto[i].attendance.kanA;
        if (a === 'REST') continue;
        if (a === 'OFF') aStreak++;
        else break;
    }

    return {
        night,
        aWin,
        aLose,
        aStreak,
        monsters: SAGA_BESTIARY.filter((m) => m.summonedNight <= night).length,
        // その夜までの累計。全64夜の合計を出すと、成長パネル(その夜まで)と
        // 桁違いの数字が同じ紙面に並んで矛盾する。
        expressions: getGrowthCurve().filter((g) => g.night <= night).slice(-1)[0]?.total ?? 0,
    };
}

/** 1行。タイトル直下・SNS・OGP用。 */
export function recapOneLine(): string {
    return '英語が上手くなる速度より、AIが完成する速度のほうが速い。それでも男は毎晩25分、恥をかきに行く。';
}

/** 3行。毎回の記事冒頭に一字一句そのまま置く定型。 */
export function recapStandard(night?: number): string {
    const n = getRecapNumbers(night);
    return [
        '毎晩25分、DMM英会話で恥をかいている。英検1級の単語は頭に入っているのに、口を開くと壊れる。',
        'その録音をAIに食わせて、一言一句を解剖させている。「一切容赦するな」と命じたのは俺だ。',
        `AIが賢くなるほど、俺の英語は要らなくなる。それでも今夜も予約した。第${n.night}夜。`,
    ].join('\n');
}

/** 戦況(数字だけの短い行)。あらすじの直後か、記事末尾に。 */
export function recapStatus(night?: number): string {
    const n = getRecapNumbers(night);
    // 「捏造語」の呼び名は成績パネルの図鑑と揃える(同じ数字を別名で呼ばない)。
    const kanA = n.aStreak > 0
        ? `冠詞の a は通算 ${n.aWin}勝${n.aLose}敗(${n.aStreak}夜連続で欠勤中)。`
        : `冠詞の a は通算 ${n.aWin}勝${n.aLose}敗。`;
    return `現在 第${n.night}夜。${kanA}捏造語 ${n.monsters}体。読者が持ち帰れる表現 ${n.expressions}個。`;
}

/** 初見向けフル。固定ページ・プロフィール・シリーズ紹介用。 */
export function recapFull(night?: number): string {
    const n = getRecapNumbers(night);
    return [
        `【この連載について】`,
        ``,
        `5年ぶりにDMM英会話を再開した男が、毎晩25分、見知らぬ外国人と喋って必ずどこかで壊れる。`,
        `その録音をAIに食わせ、一言一句を解剖させている。「一切容赦するな」と命じたのは本人だ。`,
        ``,
        `だが解剖するたびにAIは賢くなり、男の英語は直らない。`,
        `いずれAIは、男が一生かけても届かない英語を1秒で吐くだろう。`,
        `つまり男は、自分を不要にする存在を、自分の恥で育てている。`,
        `それでも今夜も、電波の悪い場所から、冠詞ひとつ落としながら喋っている。`,
        ``,
        `冠詞の a は通算 ${n.aWin}勝${n.aLose}敗。捏造語は ${n.monsters}体。`,
        `そして読者の手元には、${n.expressions}個の表現が残っている。`,
        `この連載のいちばん奇妙なところは、主人公が負け続けるほど、読者が強くなることだ。`,
        ``,
        `第1夜から読む必要はない。どの夜から入っても、話は繋がる。`,
    ].join('\n');
}

/** 記事末尾の締め(毎回同じ)。 */
export function recapFooter(): string {
    return [
        'この番組は「恥とあきらめの英会話」の提供でお送りしています。',
        'スキを押すと、男は明日も恥をかきに行きます。フォローすると、毎晩それが届きます。',
    ].join('\n');
}
