/**
 * Silent Bartender -- exit beats.
 *
 * One-line beats shown briefly as a customer leaves the bar. Pick one
 * based on outcome (served / failed / timeout). These are flavor text,
 * not puzzle content.
 *
 * Wire later: NightResultSummary or CustomerAtlas tooltips.
 */

import type { Mood } from './types';

export type ExitOutcome = 'served' | 'failed' | 'timeout';

export const EXIT_BEATS: Record<ExitOutcome, Partial<Record<Mood, string[]>>> = {
    served: {
        tired: [
            'コートを腕にかけ直し、小さく頷いて出て行った。',
            'グラスを置いた時、指が一度だけ震えた。満足そうに見えた。',
        ],
        homesick: [
            '湯気のあがる湯呑みを両手で包んだまま、しばらく動かなかった。',
            '「また来ます」と書かれた小さな紙を、カウンターに残して行った。',
        ],
        drunk: [
            '立ち上がるのに三秒かかった。扉を開ける時、少しだけ止まった。',
            '「次はいつでも。帰れ」と権藤の幽霊に追い出されたようだった。',
        ],
        heartbroken: [
            '何も言わずに席を立った。置かれたグラスには指紋がきれいに付いていた。',
            '出る前に一度だけカウンターを撫でた。',
        ],
        'first-time': [
            '「ここ、また来ていいですか」と小声で聞き、返事を待たずに出て行った。',
        ],
        ghost: [
            'グラスは半分空いたままだった。座っていた席は、少しだけ冷たくなっていた。',
        ],
        edo: [
            '深く一礼してから、暖簾をくぐった。',
        ],
        alien: [
            '手のひらを天井に向けて、何かを確認するように動かしてから、出て行った。',
        ],
        dog: [
            '水皿を一度見て、こちらを一度見て、足音もなく出て行った。',
        ],
        existential: [
            '「...いい夜だった」とは言わなかった。それでも、それに近い空気を残した。',
        ],
        celebrating: [
            '誰かとハイタッチするような仕草を、一人でした。',
        ],
        nervous: [
            'ポケットから小さな紙を確認して、何度か頷いてから出て行った。',
        ],
        'late-night': [
            '時計を見た。終電は二時間前に消えていたが、落ち着いて歩いて行った。',
        ],
    },
    failed: {
        tired: [
            'コートを手に取る時、ため息が聞こえた。',
        ],
        homesick: [
            '湯呑みに触らずに席を立った。お湯は冷めていくだろう。',
        ],
        drunk: [
            'カウンターを叩いてから、出て行った。氷がひとつ、跳ねた。',
        ],
        heartbroken: [
            '目を合わせなかった。振り返らなかった。',
        ],
        'first-time': [
            '「分かりました」と言いながら、何も分かっていない顔で出て行った。',
        ],
        ghost: [
            '席はいつの間にか空になっていた。氷だけが、まだそこにある。',
        ],
        edo: [
            '鞘に手をかけるような仕草を一瞬して、止めて、出て行った。',
        ],
        alien: [
            'うっすらと光る液体を自分のポケットから取り出して、飲んで、出て行った。',
        ],
        dog: [
            '一度こちらを見て、失望したように目を逸らし、出て行った。',
        ],
        existential: [
            '「...そうか」と言った。それ以上は何も。',
        ],
        nervous: [
            '小さな紙をポケットに戻して、出て行った。',
        ],
    },
    timeout: {
        tired: [
            '時間切れだった。客は席を立ち、何も言わずに暖簾をくぐった。',
            '目を一度閉じて、椅子から腰を上げた。今日はもう決めない。',
        ],
        homesick: [
            '席に温かいものが置かれることはなかった。客は静かに消えた。',
            '待つ間に、冷めてしまった。何も。',
        ],
        drunk: [
            '待たされすぎた。大声で何か言いかけて、止めて、出て行った。',
        ],
        heartbroken: [
            '待つ力もなかった。席を立つ時、少しよろけた。',
        ],
        'first-time': [
            '「やっぱりいいです」と言いながら、メニューを閉じて、出て行った。',
            '帰る途中で振り返り、もう一度店内を見て、やはり出て行った。',
        ],
        regular: [
            '常連だから、許してくれた。だが、次の夜は来ないかもしれない。',
        ],
        nervous: [
            '手のひらを一度見て、財布を握り直し、席を立った。',
        ],
        existential: [
            '「時間は、待つ方のもので、待たれる方のものじゃない」と言って、出て行った。',
        ],
        suspicious: [
            '席を立つ時、財布の中身を確認した。それ以外は何も残さなかった。',
        ],
        edo: [
            '時代を超えてきた忍耐も、現代の時間切れには敵わなかった。',
        ],
        ghost: [
            '席はいつの間にか空になっていた。時間が切れる前に、既にいなかった気もする。',
        ],
    },
};

/** Pick a beat for the given outcome/mood, with a safe fallback. */
export function pickExitBeat(outcome: ExitOutcome, mood: Mood): string | null {
    const pool = EXIT_BEATS[outcome]?.[mood];
    if (!pool || pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}
