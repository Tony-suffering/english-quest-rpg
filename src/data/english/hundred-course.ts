// THE HUNDRED 30日コース設計
//
// 【なぜ分類順に並べないのか】
// カード番号(1-100)は現象の分類順。だが学習順は別物で、そのまま上から順に
// やると「弱形40連発」という blocked practice になる。
//
// Taylor & Rohrer (2010): 同種を固める blocked より、混ぜる interleaved のほうが
// 練習中の出来は悪化するのに、翌日テストのスコアは2倍になった。効いた理由は
// 「どの問題にどの手続きを当てるかの判別力が上がったから」。
// リスニングで必要な力そのもの — いま起きているのが弱形なのか脱落なのか
// フラップなのかを、その場で当てる力 — がこれ。
// だから1日の中で必ず複数パートを混ぜる。
//
// 【もうひとつの原則: 前提関係】
// 音声現象には依存がある。フラップTを知らないと get a は理解できない。
// h脱落を知らないと him/his/her の弱形は理解できない。
// requires で前提を張り、コースはその順序を必ず満たす(検証関数つき)。

export interface HundredDay {
    day: number;
    theme: string;
    /** その日の新規4項目。配列の順序 = 学ぶ順序(前提が先に来る) */
    items: number[];
    /** 何を混ぜたか(インターリーブの中身を可視化する) */
    mix: string;
}

/** 前提関係: key の項目を学ぶ前に、value の項目を終えている必要がある */
export const HUNDRED_PREREQ: Record<number, number[]> = {
    42: [41, 45],  // 3語連結は 連結 と 語境界フラップ の合わせ技
    45: [44],      // 語境界フラップ ← 語中フラップ
    51: [24],      // gonna ← to の弱形
    52: [24],      // wanna ← to の弱形
    53: [23],      // kinda ← of の弱形
    59: [28],      // 二重短縮 ← have の弱形
    64: [63],      // 語末クラスターの幻聴母音 ← 幻聴母音
    72: [71],      // 語境界の錯覚2 ← 語境界の錯覚1
    73: [30],      // 'd の正体 ← had の弱形
    82: [26],      // can/can't 強勢 ← can の弱形
    90: [87],      // 消える -ed ← -ed の /t/
    92: [91],      // 消える s ← -s の3種
    93: [29],      // 's の正体 ← has の弱形
    10: [54], 11: [54], 13: [54], 14: [54], 17: [54], // 代名詞の弱形 ← h脱落
};

/**
 * 25日で100項目、残り5日で総復習。
 * 1日4場面(各3行)= 12行、約10分。
 * ほぼ全ての日が2〜3パートの混在になっている(mix を参照)。
 * 例外は D11/D17/D21/D25 で、これは意図的:
 * -ed の3分岐や強勢の4種類は「並べて比べる」こと自体が判別訓練になるため。
 */
export const HUNDRED_COURSE: HundredDay[] = [
    { day: 1,  theme: 'h が消える', items: [54, 14, 13, 17], mix: '連結+弱形' },
    { day: 2,  theme: 't が水になる', items: [44, 45, 2, 20], mix: '連結+弱形' },
    { day: 3,  theme: 'くっついて別の語になる', items: [41, 42, 1, 23], mix: '連結+弱形' },
    { day: 4,  theme: '日本語の耳(1) 無い音が聞こえる', items: [63, 70, 24, 51], mix: '日本人の耳+弱形+連結' },
    { day: 5,  theme: 'and と but が蒸発する', items: [4, 5, 43, 56], mix: '弱形+連結' },
    { day: 6,  theme: "can と can't は t で判定しない", items: [26, 82, 27, 32], mix: '弱形+プロソディ' },
    { day: 7,  theme: '日本語の耳(2) 母音の箱が足りない', items: [66, 68, 3, 21], mix: '日本人の耳+弱形' },
    { day: 8,  theme: 'shoulda の正体', items: [28, 59, 75, 30], mix: '弱形+連結+プロソディ' },
    { day: 9,  theme: 'you が溶ける', items: [16, 47, 48, 49], mix: '弱形+連結' },
    { day: 10, theme: 'be動詞が丸ごと消える', items: [37, 38, 39, 36], mix: '弱形(be動詞の判別訓練)' },
    { day: 11, theme: '-ed は3通りに化ける', items: [87, 88, 89, 90], mix: '語尾(3分岐の判別訓練)' },
    { day: 12, theme: 'リズムの正体', items: [76, 86, 6, 7], mix: 'プロソディ+弱形' },
    { day: 13, theme: '日本語の耳(3) 母語が邪魔をする', items: [65, 69, 67, 64], mix: '日本人の耳' },
    { day: 14, theme: '目的語が消える', items: [18, 55, 19, 11], mix: '弱形+連結' },
    // 93('s の正体) は 29(has の弱形) を前提にするので、29 を先に置く
    { day: 15, theme: '-s の3通りと、消える s', items: [91, 92, 29, 93], mix: '語尾+弱形' },
    { day: 16, theme: '疑問文の頭が溶ける', items: [34, 35, 60, 15], mix: '弱形+連結' },
    { day: 17, theme: '強勢の位置で意味が変わる', items: [77, 78, 79, 80], mix: 'プロソディ(強勢4種の判別訓練)' },
    { day: 18, theme: '切れ目は音の中に無い', items: [71, 72, 74, 61], mix: '日本人の耳+連結' },
    { day: 19, theme: '音節が丸ごと落ちる', items: [58, 57, 22, 25], mix: '連結+弱形' },
    { day: 20, theme: '詰まる t、混ざる音', items: [46, 50, 53, 52], mix: '連結' },
    { day: 21, theme: '上げるか下げるかで別の文', items: [83, 84, 85, 81], mix: 'プロソディ(音調の判別訓練)' },
    { day: 22, theme: '数字で金を失う', items: [94, 95, 96, 40], mix: '語尾+弱形' },
    { day: 23, theme: '所有と存在', items: [10, 12, 9, 8], mix: '弱形' },
    { day: 24, theme: '時制の目印が消える', items: [73, 31, 33, 62], mix: '日本人の耳+弱形+連結' },
    { day: 25, theme: '最後の4本 — 間違えると事故る音', items: [97, 98, 99, 100], mix: '音の対比' },
    { day: 26, theme: '総復習 弱形', items: [], mix: '#1-40 からシャッフル' },
    { day: 27, theme: '総復習 連結・脱落', items: [], mix: '#41-62 からシャッフル' },
    { day: 28, theme: '総復習 耳とリズム', items: [], mix: '#63-86 からシャッフル' },
    { day: 29, theme: '総復習 全パート混合', items: [], mix: '#1-100 からシャッフル' },
    { day: 30, theme: '卒業テスト スクリプトなし', items: [], mix: '#1-100 から20本、音だけ' },
];

/** Day N の復習対象: 3日前と7日前から各2本(螺旋復習) */
export function getReviewForDay(day: number): number[] {
    const pick = (d: number, n: number) => {
        const target = HUNDRED_COURSE.find(c => c.day === d);
        return target ? target.items.slice(0, n) : [];
    };
    return [...pick(day - 3, 2), ...pick(day - 7, 2)];
}

/** 前提関係がコース順序で満たされているかの検証(開発時のガード) */
export function validateCourseOrder(): string[] {
    const learnedBy = new Map<number, number>();
    for (const d of HUNDRED_COURSE) {
        d.items.forEach((no, i) => learnedBy.set(no, d.day * 100 + i));
    }
    const errors: string[] = [];
    for (const [noStr, prereqs] of Object.entries(HUNDRED_PREREQ)) {
        const no = Number(noStr);
        const self = learnedBy.get(no);
        if (self === undefined) { errors.push(`#${no} がコースに存在しない`); continue; }
        for (const p of prereqs) {
            const pos = learnedBy.get(p);
            if (pos === undefined) { errors.push(`#${no} の前提 #${p} がコースに存在しない`); continue; }
            if (pos >= self) errors.push(`#${no} が前提の #${p} より先に来ている`);
        }
    }
    return errors;
}

// ============================================================
// カバレッジ監査
// 「100で全部か」への正直な答え。埋めた穴と、残った穴を明記する。
// ============================================================

export interface CoverageGap {
    item: string;
    status: 'covered-primary' | 'covered-secondary' | 'not-covered';
    note: string;
}

/** 初版で漏れていた項目。副次ターゲットとして各場面の返し行に埋め込んで回収した */
export const COVERAGE_RECOVERED: CoverageGap[] = [
    { item: 'would の弱形 (/d/, would have → woulda)', status: 'covered-secondary', note: '初版で完全に漏れていた。弱形語リストで最重要級。#5 #40 の返し行に埋め込み' },
    { item: 'been の弱形 (/bɪn/)', status: 'covered-secondary', note: '初版で漏れ。#9 #30 #73 #93 に分散' },
    { item: "not / n't の縮約と消滅", status: 'covered-secondary', note: '初版で漏れ。#12 #33 #56 #90 に分散' },
    { item: 'who の弱形 (関係詞)', status: 'covered-secondary', note: '初版で漏れ。#16 #62 #78 に分散' },
    { item: '語末破裂音の未開放 (delayed plosion)', status: 'covered-secondary', note: '当初の設計案にあったが100本編成の際に落ちた。#18 #37 #43 #63 #96 に分散' },
    { item: '鼻腔開放 (nasal plosion)', status: 'covered-secondary', note: 'sudden, didn\'t の d/t が鼻から抜ける。#46 に埋め込み' },
    { item: '側面開放 (lateral plosion)', status: 'covered-secondary', note: 'little, bottle の tl。#20 #53 #70 #81 に分散' },
    { item: '意味のかたまりでの区切り (thought group)', status: 'covered-secondary', note: 'プロソディ最大の漏れ。どこで息を切るかで文が別物になる。#76 #85 #86 に埋め込み' },
    { item: 'yod 脱落 (news→nooz, Tuesday→toozday)', status: 'covered-secondary', note: '米英差。#24 #58 #67 に分散' },
    { item: '序数・分数・小数', status: 'covered-secondary', note: '数字パートの漏れ。#95 に埋め込み' },
];

/** まだ埋まっていない穴。ここは正直に空けておく */
export const COVERAGE_REMAINING: CoverageGap[] = [
    { item: '地域差 (英/豪/southern US など)', status: 'not-covered', note: '米語標準に絞っている。方言まで入れると100では収まらない' },
    { item: '非ネイティブ英語のなまり', status: 'not-covered', note: '実世界では最頻出だが、体系化して100に落とすのは別プロジェクト' },
    { item: '劣化音そのもの (電話・雑音・残響)', status: 'not-covered', note: '音源側の課題。100文の設計ではなく再生側で足す予定' },
    { item: '速度の圧縮訓練 (1.5倍〜2倍)', status: 'not-covered', note: '#76 で概念は扱うが、体系的な段階訓練は未実装' },
];
