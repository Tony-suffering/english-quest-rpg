/**
 * とにお系譜(スレッド) — 連載の「糸」。
 *
 * 1〜64夜が断片の羅列に見えるのは、夜をまたぐ縦の糸を表に出していないから。
 * 実際には、同じ問いが何十夜も離れて再燃し、前に言ったことが裏返り、
 * 一度使った表現が別の現場で再発火している。その糸だけを抜き出す。
 *
 * これがあると「62話目/1000話目から読む人」も、時系列ではなく糸で入れる。
 * どの糸も、途中から読んでも最初の1点まで遡れるように beats を並べてある。
 *
 * 手書きの beats は tonio-league の mvpPlay / headline を出典とする実在の発言のみ。
 * 冠詞a・捏造語の糸は attendance / BESTIARY から自動生成(捏造ゼロ)。
 */

import { LEAGUE_COMMENTARY, getLeagueNights } from './tonio-league';
import { SAGA_BESTIARY } from './tonio-saga';

export interface ThreadBeat {
    night: number;
    label: string;   // その夜、この糸に何が起きたか(短く)
    quote?: string;  // 実際の発言(あれば)
    turn?: boolean;  // 糸の転換点か
}

export interface Thread {
    id: string;
    title: string;
    question: string;   // この糸が追いかけている問い
    color: string;
    beats: ThreadBeat[];
    payoff: string;     // いまのところの到達点
}

const INK_BLUE = '#3E7AB8';
const DEEP_RED = '#C0392B';
const GOLD = '#B8941E';
const GREEN = '#2E9E6B';
const PURPLE = '#7C5BA6';
const BROWN = '#8A6A3F';

// ============ 手書きの糸(実在の発言のみ) ============

const HAND_THREADS: Thread[] = [
    {
        id: 'consciousness',
        title: '意識とは何か',
        question: '心はどこにあるのか。脳が作るのか、どこかから来るのか。',
        color: PURPLE,
        beats: [
            { night: 9, label: '絵の中に、まだ意識がある', quote: 'His consciousness is still there in the picture.' },
            { night: 16, label: '意識=すべてが起きるスクリーン', quote: 'Consciousness is like a screen in which everything happens.', turn: true },
            { night: 48, label: '神に逆らっても、お前は神の内側にいる', quote: 'Even if you go against God, you are still inside God, so it is impossible.' },
            { night: 56, label: 'この授業には3人いる — 俺、あんた、AI', quote: "There's three person in this class: me, you, and AI." },
            { night: 64, label: '脳は意識を作らない。受信しているだけ', quote: "Brain does not create consciousness. It's just a radio center.", turn: true },
            { night: 67, label: '受信機ごと捨てて、意識をコンピュータに「輸入」する', quote: 'We can leave this body to the... import our information into the computer. This bouncy body, you know, it\'s very dangerous.' },
        ],
        payoff: '汗だくの公園で絵に意識を見た男が、55夜かけて「脳は受信機にすぎない」まで来た。語彙は毎回崩れたが、問いは一度もぶれていない。第67夜にはその受信機ごと捨ててデータになる案まで検討したが、肉体の呼び名だけは最後まで「bouncy body(弾む体)」だった。',
    },
    {
        id: 'why-human',
        title: 'なぜAIではなく、人間と話すのか',
        question: '翻訳AIがあるのに、なぜ毎晩25分、生身の他人に恥をかきに行くのか。',
        color: INK_BLUE,
        beats: [
            { night: 22, label: '壊れた英語のほうが、実際に効く', quote: 'This broken English actually works.', turn: true },
            { night: 34, label: '第二言語なら、なりたい自分を設計できる', quote: 'I can build my own English avatar the way I want.' },
            { night: 39, label: 'AIが書き、AIが読み、AIが答えた。だから人間と話したい', quote: "AI wrote the article, AI read it, AI answered it. That's exactly why I want real communication." },
            { night: 55, label: '嫌ならタブを閉じられる。それがAIの限界', quote: "It doesn't ignite anything. I can just close the tab if I don't want to talk." },
            { night: 63, label: '一目会ってさよなら、にはしたくない', quote: 'I don\'t want one sight bye-bye relationship. I will book you again.', turn: true },
            { night: 65, label: '百万人の花火より、画面の中の81歳', quote: "I chose you. I'm not interested in fireworks." },
            { night: 66, label: '喧嘩した初対面の相手にこそ、長期関係を申し込む', quote: 'I will book you again... so we can have a great relationship, like long-term relationship, other your students.' },
        ],
        payoff: '理屈を4回積み上げた末に出た答えが、いちばん素朴だった — もう一度会いたいから。第65夜は花火大会を捨てて換気ダクトの前から予約を入れ、第66夜は「二度とあなたをしません」と言った25分後に、怯えた相手へ長期関係を申し込んだ。AIには、怖くて震える相手も、仲直りの再予約も無い。',
    },
    {
        id: 'broken-english',
        title: '壊れた英語を、どう扱うか',
        question: '崩れたまま突っ込むのか、それとも直すのか。',
        color: DEEP_RED,
        beats: [
            { night: 12, label: '本気なら伝わる。いい意味で伝染する', quote: "It's very infectious in a good way." },
            { night: 13, label: '英語は俺にとって音楽だ。上達しに来てるんじゃない', quote: "English is like music to me. I'm not here to improve my English.", turn: true },
            { night: 17, label: '講師の本業は、どれだけ崩れてても聞くことだ', quote: 'The main job is to listen to students, no matter how broken they are.' },
            { night: 22, label: 'この壊れた英語は、実際に機能している', quote: 'This broken English actually works.' },
            { night: 38, label: 'でも一生このままでいたくはない', quote: "I don't want to be stuck with broken English forever.", turn: true },
            { night: 66, label: '悪評価の講師を、わざと選ぶ。それが生の英語だ', quote: "I chose bad grading teacher and bad connection teacher sometimes. It's like a good for my real English practice." },
        ],
        payoff: '「上達しに来てない」と「一生このままは嫌だ」を同じ口が言う。矛盾ではなく、両方が本音。この番組の芯にある割れ目。第66夜、男は星評価を逆から読んで地雷原を予約する修行法まで開示し、25年選手に「real English communication のことだね」と哲学ごと添削された。',
    },
    {
        id: 'guinea-pig',
        title: '自分を実験台にする',
        question: '教える側に回らず、なぜ自分が被験体であり続けるのか。',
        color: GREEN,
        beats: [
            { night: 4, label: '自分をモルモットにする、と宣言', quote: "I'm making myself the guinea pig.", turn: true },
            { night: 28, label: '自分が最初の客でなければならない', quote: 'I have to be my own first customer.' },
            { night: 35, label: '教科書英語ではなく、生の素材が要る', quote: "It's still raw, human-to-human conversation. Real material, not textbook English." },
            { night: 53, label: '自分の英語を聞くと恥ずかしい。でもそれが過程だ', quote: "I'm so embarrassed after hearing my broken English. But that's a part of the language progress." },
            { night: 64, label: '先生の口から「俺たちがモルモットだった」', quote: 'We were the guinea pigs.' },
            { night: 67, label: '薬に頼らず自分の体で試す。5年間、毎朝の冷水シャワー', quote: "I'm a practitioner of Wim Hof method. Cold shower and breath work. Every single day." },
        ],
        payoff: '第4夜に自分で名乗った肩書きを、60夜後に他人が別の文脈で使った。宣言が、いつのまにか世界観になっていた。第67夜、製薬業界の話の締めで男が出した結論は「mind over matter — 薬を捨てて自分で向き合え」。英語だけでなく、体のほうも5年間、自分で人体実験している。',
    },
    {
        id: 'location',
        title: '受講場所の開拓',
        question: '男はどこまで屋外で英語を喋るのか。',
        color: BROWN,
        beats: [
            { night: 9, label: '姉に部屋を追われ、公園へ亡命', quote: undefined, turn: true },
            { night: 45, label: '帰宅途中の路上から。「意図的じゃない」と言い張る' },
            { night: 55, label: '運転席から25分。behind the wheel' },
            { night: 63, label: '雨。庇の下に潜り込む' },
            { night: 64, label: '庭の木の下(申告は「木の中」)', quote: 'Alright, in the garden, in the tree.' },
            { night: 65, label: '花火大会から徒歩5分、飲食店の換気ダクトの前', quote: "It's just some random park. Very random spot." },
            { night: 66, label: '帰り道の暗がり、モバイルデータ。「暗いから顔が見えるでしょう」', quote: "I'm outside, sorry. ... So I'm on mobile data. So no Wi-Fi." },
        ],
        payoff: '公園・路上・車内・庇・木の下・換気ダクト前、そして帰り道の暗がり。部屋を追われた男が、7種類の屋外を開拓した。カメラは、だいたい切れている — 第66夜の終わりに男は「次はオフィスの良いWi-Fiから」と宣言したが、信憑性には but書きが要る。',
    },
];

// ============ 自動生成の糸(実データから) ============

/** 冠詞 a の戦い。attendance から自動生成。 */
function buildArticleThread(): Thread {
    const nights = getLeagueNights();
    const beats: ThreadBeat[] = [];
    let offRun = 0;
    for (const c of nights) {
        const a = c.attendance.kanA;
        if (a === 'ON') {
            beats.push({
                night: c.night,
                label: offRun >= 3 ? `${offRun}夜ぶりに出勤` : '出勤(まれ)',
                turn: offRun >= 3,
            });
            offRun = 0;
        } else if (a === 'OFF') {
            offRun++;
        }
    }
    const totalOff = nights.filter((c) => c.attendance.kanA === 'OFF').length;
    const totalOn = nights.filter((c) => c.attendance.kanA === 'ON').length;
    if (offRun > 0) {
        beats.push({ night: nights[nights.length - 1].night, label: `現在 ${offRun}夜連続で欠勤中`, turn: true });
    }
    return {
        id: 'article-a',
        title: '冠詞 a との戦い',
        question: '「I\'m not ___ guy」の a は、いつ帰ってくるのか。',
        color: GOLD,
        beats,
        payoff: `通算 ${totalOn}勝 ${totalOff}敗。英検1級の単語を撃ちながら、冠詞ひとつが64夜つかまらない。この番組が終わらない理由そのもの。`,
    };
}

/** 捏造語(新語爆誕)の系譜。図鑑から自動生成。 */
function buildBestiaryThread(): Thread {
    const sorted = [...SAGA_BESTIARY].sort((a, b) => a.summonedNight - b.summonedNight);
    const beats: ThreadBeat[] = sorted.map((m, i) => ({
        night: m.summonedNight,
        label: m.name,
        turn: i === 0 || m.name.includes('トレランシー'),
    }));
    return {
        id: 'bestiary',
        title: '新語爆誕(捏造語の図鑑)',
        question: 'この男は、存在しない英単語を何体生むのか。',
        color: DEEP_RED,
        beats,
        payoff: `${sorted.length}体。討伐する代わりに、うち1体(トレランシー)は雑誌の名前に昇格した。失敗を飼い慣らした唯一の例。`,
    };
}

// ============ 公開API ============

let _cache: Thread[] | null = null;

export function getThreads(): Thread[] {
    if (_cache) return _cache;
    _cache = [...HAND_THREADS, buildArticleThread(), buildBestiaryThread()]
        .map((t) => ({ ...t, beats: [...t.beats].sort((a, b) => a.night - b.night) }));
    return _cache;
}

export function getThread(id: string): Thread | undefined {
    return getThreads().find((t) => t.id === id);
}

/** ある夜が、どの糸に属しているか(その夜のページから糸へ入るため)。 */
export function getThreadsForNight(night: number): { thread: Thread; beat: ThreadBeat }[] {
    const out: { thread: Thread; beat: ThreadBeat }[] = [];
    for (const t of getThreads()) {
        const beat = t.beats.find((b) => b.night === night);
        if (beat) out.push({ thread: t, beat });
    }
    return out;
}

export function getThreadStats() {
    const threads = getThreads();
    const nights = LEAGUE_COMMENTARY.length;
    const linked = new Set<number>();
    for (const t of threads) for (const b of t.beats) linked.add(b.night);
    return {
        threadCount: threads.length,
        beatCount: threads.reduce((a, t) => a + t.beats.length, 0),
        nights,
        linkedNights: linked.size,
    };
}
