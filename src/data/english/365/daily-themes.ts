/**
 * 英会話マスター365 -- Daily Themes (お題)
 *
 * 各 Day のシチュエーションの「下層パターン」を抽出し、
 * 今日の日常で出くわす瞬間を観察させるレンズ。
 *
 * 目的: 365 Day で習う英語フレーズを、日常の行動パターンに
 *       インデックスさせる。空港フレーズを覚えても一日で
 *       使わなかったら忘れる ── 下層パターンに紐付けることで、
 *       レジや役所や病院でも "同じ型" として想起できるように。
 *
 * 構造:
 *   - surface: Day の表層シチュエーション
 *   - pattern: 下層の人間行動パターン（言語超越）
 *   - prompt:  今日どう過ごすかの指示（1行）
 *   - catch:   拾う瞬間の描写（録音すべきモーメント）
 *   - tone:    色分け用のタグ
 */

export interface DailyTheme {
    daySlot: number;
    surface: string;
    pattern: string;
    prompt: string;
    catch: string;
    tone: 'connect' | 'transact' | 'decide' | 'express' | 'navigate' | 'body';
}

export const DAILY_THEMES: DailyTheme[] = [
    {
        daySlot: 1,
        surface: 'はじめまして',
        pattern: '初対面の緊張と、第一声の選択',
        prompt: '今日、自分が誰かにかけた「最初のひとこと」に神経を使う',
        catch: '初対面じゃなくても OK。店員・同僚・すれ違い ── 自分が発した第一声を1つ録音',
        tone: 'connect',
    },
    {
        daySlot: 2,
        surface: '注文する',
        pattern: '欲しいものを具体に言語化して、他人に委ねる',
        prompt: '「自分は何が欲しいか」を具体で口に出す瞬間を意識する',
        catch: 'コーヒーのカスタム、飲み会の注文、ランチを決めた瞬間 ── 具体で言えた/言えなかった1つ',
        tone: 'express',
    },
    {
        daySlot: 3,
        surface: '買い物する',
        pattern: '価値判断 → 決断 → 支払い の小さな取引',
        prompt: '今日の買い物で「買うか / やめるか」を決めた瞬間の根拠を意識する',
        catch: '買い物1つ。「なぜ買った」または「なぜやめた」を一行で言語化して録音',
        tone: 'decide',
    },
    {
        daySlot: 4,
        surface: '移動する',
        pattern: '空間把握 + 他人との道の共有 + 時間の読み',
        prompt: '今日の移動で「予定通りに動いてない」瞬間を拾う',
        catch: '寄り道した1場面、道に迷った1場面、乗り換えでミスった1場面 ── 1つだけ',
        tone: 'navigate',
    },
    {
        daySlot: 5,
        surface: '気持ちを伝える',
        pattern: '内面を言語化して他人に開く、または隠す選択',
        prompt: '今日、本音を飲み込んだ瞬間を観察する',
        catch: '言いたかったのに言わなかった言葉を1つ。誰に対して、何を飲み込んだか',
        tone: 'express',
    },
    {
        daySlot: 6,
        surface: '頼む・断る',
        pattern: '自分の境界線を守る / 他人に乗せる',
        prompt: '今日、頼んだ or 断った瞬間を意識する',
        catch: '「お願いします」「今日は無理です」の1場面。言えた or 言えなかった、両方カウント',
        tone: 'decide',
    },
    {
        daySlot: 7,
        surface: '雑談する',
        pattern: '沈黙を埋める、関係のメンテナンス、本題じゃない会話の価値',
        prompt: '今日の「本題じゃない会話」を観察する',
        catch: 'エレベーター・レジ・同僚との1分のやりとり。中身は何だったか、なぜ起きたか',
        tone: 'connect',
    },
    {
        daySlot: 8,
        surface: '自己紹介をもっと',
        pattern: '自分をどの切り口で差し出すか = 自己の編集',
        prompt: '今日、自分を誰かに説明 or 説明し直した瞬間を観察する',
        catch: '「仕事は〜」「趣味は〜」で使った自分のラベル1つ。そのラベルは本当に自分を表してたか',
        tone: 'express',
    },
    {
        daySlot: 9,
        surface: 'カフェで注文',
        pattern: '選択肢の中から自分の好みを宣言する小さな儀式',
        prompt: '「自分の好み」を他人に宣言した瞬間を拾う',
        catch: 'コーヒー・ランチ・何かの選択 ── 自分の好みを曲げずに言えたか、それとも合わせたか',
        tone: 'express',
    },
    {
        daySlot: 10,
        surface: 'ドラッグストアで',
        pattern: '自分の体の不調を他人に説明する = 体と言葉のつなぎ',
        prompt: '今日、自分の体が出した小さいサインを観察する',
        catch: '疲れ・痛み・違和感・眠気。感じた瞬間を一行で言語化して録音',
        tone: 'body',
    },
];

export const THEME_TONE_COLORS: Record<DailyTheme['tone'], { accent: string; accentDim: string; bg: string; border: string }> = {
    connect:  { accent: '#EC4899', accentDim: '#BE185D', bg: '#FDF2F8', border: '#FBCFE8' },
    transact: { accent: '#10B981', accentDim: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
    decide:   { accent: '#F59E0B', accentDim: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
    express:  { accent: '#8B5CF6', accentDim: '#6D28D9', bg: '#F5F3FF', border: '#DDD6FE' },
    navigate: { accent: '#2563EB', accentDim: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
    body:     { accent: '#DC2626', accentDim: '#991B1B', bg: '#FEF2F2', border: '#FECACA' },
};

export function getDailyTheme(daySlot: number): DailyTheme | null {
    return DAILY_THEMES.find(t => t.daySlot === daySlot) ?? null;
}
