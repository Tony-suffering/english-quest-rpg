/**
 * 耳の実測 — 無料の入口
 *
 * ■ なぜこれが玄関なのか
 * 集客の入口に要る条件は3つ。**登録が要らない / 5分で終わる / 数字が出る。**
 * 教材はこの3つを全部満たさない(始めるのに決意が要り、終わりが見えず、結果が数字にならない)。
 * だから玄関には測定を置く。
 *
 * ■ 測るもの
 * 英語力ではない。「速度」と「雑音」をどこまで上げても文が保てるか、だけ。
 * 音は SpeechSynthesis(速度可変)、雑音は WebAudio で合成したざわめきを同時に鳴らして作る。
 * サーバもDBも使わないので、誰が何人来ても費用が増えない。
 */

export interface RampLevel {
    lv: number;
    rate: number;      // 再生速度
    noise: number;     // 同時に鳴らすざわめきの量 (0 = なし)
    band: 'exam' | 'raw';
    label: string;
    feel: string;
}

export const RAMP: RampLevel[] = [
    { lv: 1, rate: 0.85, noise: 0.00, band: 'exam', label: '試験より遅い', feel: '全部聞こえる。ここで落ちるなら音より単語の問題' },
    { lv: 2, rate: 1.00, noise: 0.00, band: 'exam', label: '試験そのまま', feel: '公式音声と同じ体感' },
    { lv: 3, rate: 1.00, noise: 0.06, band: 'exam', label: '試験 + 空調の音', feel: '速さは同じ。雑音が入るだけで急に落ちる人が多い' },
    { lv: 4, rate: 1.15, noise: 0.10, band: 'exam', label: '少し速い + 店内', feel: 'カフェで電話を受けてる状態' },
    { lv: 5, rate: 1.25, noise: 0.16, band: 'exam', label: '速い + 人の話し声', feel: 'ここを超えると試験が「ゆっくり」に変わり始める' },
    { lv: 6, rate: 1.35, noise: 0.22, band: 'exam', label: 'かなり速い + 騒がしい', feel: '試験本番が遅く感じる領域' },
    { lv: 7, rate: 1.50, noise: 0.28, band: 'exam', label: '限界 + 居酒屋', feel: '試験音声で作れる一番きつい条件' },
    { lv: 8, rate: 1.00, noise: 0.10, band: 'raw', label: '生の話し言葉', feel: '速度は1.0。台本のない構文だけで十分きついから' },
    { lv: 9, rate: 1.20, noise: 0.18, band: 'raw', label: '生 + 速い', feel: '被せ・言い直し・省略が入った状態で加速' },
    { lv: 10, rate: 1.40, noise: 0.26, band: 'raw', label: '生 + 限界', feel: 'ここが取れたらYouTubeは字幕なしで回る' },
];

export const rampOf = (lv: number): RampLevel => RAMP[Math.min(RAMP.length, Math.max(1, lv)) - 1];

export interface DiagItem { lv: number; en: string; ja: string; }

/** 全部自作。試験の音声・問題は転載していない */
export const DIAG_ITEMS: DiagItem[] = [
    { lv: 1, en: "The meeting has been moved to the third floor conference room.", ja: '会議は3階の会議室に移動になりました。' },
    { lv: 2, en: "Please submit your expense report before the end of the month.", ja: '経費精算書は月末までに提出してください。' },
    { lv: 2, en: "I'm calling to confirm the delivery date for our September order.", ja: '9月の注文の納品日を確認するためお電話しました。' },
    { lv: 3, en: "The shipment was delayed because the supplier ran out of packaging materials.", ja: '梱包材が切れたため、出荷が遅れました。' },
    { lv: 3, en: "All passengers traveling to Denver should proceed to gate twenty-two.", ja: 'デンバー行きのお客様はゲート22へお進みください。' },
    { lv: 4, en: "We'd like to renegotiate the terms before we sign the renewal.", ja: '更新に署名する前に条件を再交渉したいです。' },
    { lv: 4, en: "The technician said the equipment needs to be inspected twice a year.", ja: '技術者は、その機器は年2回点検が必要だと言いました。' },
    { lv: 5, en: "Our quarterly revenue increased by nearly eleven percent compared to last year.", ja: '四半期売上は前年比で約11%増加しました。' },
    { lv: 5, en: "If the applicant has no relevant experience, we usually forward the resume to human resources.", ja: '関連経験がない応募者の履歴書は、通常人事に回します。' },
    { lv: 6, en: "The property manager mentioned that the elevator inspection could take most of the morning.", ja: '管理会社は、エレベーター点検で午前中いっぱいかかる可能性があると言いました。' },
    { lv: 6, en: "Attendees who registered online will receive their badges at the reception desk downstairs.", ja: 'オンライン登録した参加者は、下の受付でバッジを受け取ります。' },
    { lv: 7, en: "Unfortunately the vendor we selected withdrew from the bid at the last minute, so we had to reopen the process.", ja: '選定した業者が直前で入札を辞退したため、選定をやり直すことになりました。' },
];

// ------------------------------------------------------------------
// 採点。冠詞や綴りの小さな崩れで落とさない(測っているのは音が通ったかどうか)
// ------------------------------------------------------------------

const STOP = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'so', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'as', 'is', 'am',
    'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'can', 'could',
    'shall', 'should', 'may', 'might', 'must', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'there', 'here', 'not', 'no', 'than', 'then',
]);

export const contentWords = (s: string): string[] =>
    s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/)
        .filter(w => w.length > 1 && !STOP.has(w));

/** 正解の内容語のうち何割を拾えたか (0-100) */
export const scoreDictation = (answer: string, target: string): number => {
    const want = contentWords(target);
    if (!want.length) return 0;
    const got = contentWords(answer);
    const gotSet = new Set(got);
    const hit = want.filter(w =>
        gotSet.has(w) || (w.length > 4 && got.some(g => g.startsWith(w.slice(0, 4))))
    ).length;
    return Math.round((hit / want.length) * 100);
};

/** 結果の読み方 */
export const readEar = (lv: number) => {
    if (lv <= 1) return { title: '単語の在庫が先', body: '音より語彙。聞こえないのではなく、その語を知らない状態。まず頻度の高い順に入れるのが最短。' };
    if (lv <= 2) return { title: '試験音声そのままが上限', body: '公式音声のスピードでギリギリ。この状態でYouTubeを開いても雑音にしか聞こえない。ここが一番伸びる位置。' };
    if (lv <= 4) return { title: '静かなら聞ける耳', body: 'クリーンな音は取れるが、雑音か少しの加速で崩れる。試験のPart 3-4で「聞けたのに答えられない」が起きる典型。' };
    if (lv <= 6) return { title: '試験は余裕、生音は無理', body: '試験音声はもう遅い。ここから先の壁は速度ではなく「台本がない構文」。' };
    return { title: '試験では測れない', body: '試験音声で作れる限界を超えている。あとは生の話し言葉に何本当たるかだけ。' };
};

/** 合格線。内容語の6割拾えたら「聞けた」とみなす */
export const PASS = 60;
