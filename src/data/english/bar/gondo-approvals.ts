/**
 * Gondo's rare micro-approvals extended to the silent apprentice.
 * Never spoken, never praised — only a nod a degree deeper, a glass
 * passed without inspection, a counter tapped once in rhythm. Each
 * entry unlocks by night count and marks quiet growth in the
 * apprentice's perception of what approval looks like.
 */

export interface GondoApproval {
    id: string;
    situation: string;
    gondosSignal: string;
    apprenticesRealization: string;
    rarityNote: string;
    unlockAfterNights: number;
}

export const GONDO_APPROVALS: GondoApproval[] = [
    {
        id: 'approval-first-nod',
        situation: '常連の生ビールを、注文前に静かに一杯注ぎ終えた夜。',
        gondosSignal: '権藤は顎をいつもより五度深く引いた。それだけだった。',
        apprenticesRealization: '普段の会釈と角度が違う。その一瞬の差に気づけた自分がいた。',
        rarityNote: '今夜は奇跡だった。',
        unlockAfterNights: 10,
    },
    {
        id: 'approval-glass-passed-unchecked',
        situation: '磨き上げたロックグラスを、権藤の手元に差し出した。',
        gondosSignal: '彼は覗き込まず、受け取り、そのまま客の前へ置いた。',
        apprenticesRealization: '検分されない、という事実が返事だった。',
        rarityNote: '彼がこれをするのは、年に数えるほど。',
        unlockAfterNights: 20,
    },
    {
        id: 'approval-counter-tap',
        situation: 'ハイボールを、氷にぶつけず細く注ぎ切った夜。',
        gondosSignal: '権藤は指の腹で、カウンターを一度だけ、注ぎの拍に合わせて叩いた。',
        apprenticesRealization: '音ではなく拍子を褒められている、とやっと分かった。',
        rarityNote: '五十夜に一度あるかないか。',
        unlockAfterNights: 35,
    },
    {
        id: 'approval-left-one-minute-early',
        situation: '閉店前の仕込みを、言われる前に全て済ませていた。',
        gondosSignal: '権藤はいつもの時刻より一分早く、上着を取った。',
        apprenticesRealization: '一分だけ早い。それは任せる、という意味だった。',
        rarityNote: '彼の時計は普段、秒単位で揺るがない。',
        unlockAfterNights: 50,
    },
    {
        id: 'approval-close-alone',
        situation: '常連の長い愚痴を、顔色を変えずに最後まで聞き届けた。',
        gondosSignal: '権藤は鍵をカウンターに置き、先に店を出ていった。',
        apprenticesRealization: '閉店を一人で任される。言葉より重い許可だと気づいた。',
        rarityNote: '師が鍵を残すのは、数えるほどしかない。',
        unlockAfterNights: 75,
    },
    {
        id: 'approval-ice-refilled',
        situation: '忙しさに紛れて、氷桶を満たし直すのを忘れていた。',
        gondosSignal: '権藤は何も言わず、自分で桶を満たし、元の位置に戻していた。',
        apprenticesRealization: '叱られないという沈黙が、信用されている証だと分かった。',
        rarityNote: '普段の彼なら、眉一つで気づかせる。',
        unlockAfterNights: 100,
    },
    {
        id: 'approval-knife-order-kept',
        situation: '仕込み台の包丁を、権藤の並びのまま置き直した。',
        gondosSignal: '彼は翌朝、台に触れず、そのまま仕事を始めた。',
        apprenticesRealization: '直されない、ということが最大の返事だった。',
        rarityNote: '彼がこれをするのは、年に数えるほど。',
        unlockAfterNights: 150,
    },
    {
        id: 'approval-shared-silence',
        situation: '閉店後、無言で床を拭き、無言で椅子を上げた。',
        gondosSignal: '権藤は隣で同じ沈黙を守り、途中で一度、軽く息を吐いた。',
        apprenticesRealization: 'その吐息が、同じ側に立つ者への合図だと気づいた。',
        rarityNote: '彼の沈黙が柔らぐ夜は、まず来ない。',
        unlockAfterNights: 220,
    },
    {
        id: 'approval-own-glass-offered',
        situation: '長い一夜の後、権藤の普段使いのグラスを棚に戻した。',
        gondosSignal: '翌夜、彼はその同じグラスを、自分の前ではなく弟子の前に置いた。',
        apprenticesRealization: 'その一センチの位置の違いが、隣に立てという意味だった。',
        rarityNote: '五十夜に一度あるかないか。',
        unlockAfterNights: 300,
    },
    {
        id: 'approval-recipe-left-open',
        situation: '権藤の手控え帳の、しおりの位置を動かさずに仕込みを終えた。',
        gondosSignal: '翌日、帳面は開いたまま、次の頁に進んでいた。',
        apprenticesRealization: '続きを読んで良い、と紙越しに告げられていた。',
        rarityNote: '帳面が開かれたままなのは、年に数えるほど。',
        unlockAfterNights: 450,
    },
    {
        id: 'approval-name-on-tab',
        situation: '常連の勘定を、権藤の字並びに倣って付け終えた。',
        gondosSignal: '彼はその頁の隅に、自分の印ではなく、弟子の印だけを残して閉じた。',
        apprenticesRealization: '店の帳面に、自分の名が独りで載る。重さがようやく分かった。',
        rarityNote: '彼がこれを許すのは、生涯に数度だという。',
        unlockAfterNights: 700,
    },
    {
        id: 'approval-door-held',
        situation: '一千夜目の閉店。灯りを落とし、鍵を手にカウンターを回った。',
        gondosSignal: '権藤は扉の前で先に立ち、弟子のために戸を押さえて待っていた。',
        apprenticesRealization: 'いつも後ろに立っていた人が、今夜は先に立っていた。',
        rarityNote: '今夜は奇跡だった。',
        unlockAfterNights: 1000,
    },
];

export function getEarnedApprovals(totalNights: number): GondoApproval[] {
    return GONDO_APPROVALS.filter((approval) => approval.unlockAfterNights <= totalNights);
}
