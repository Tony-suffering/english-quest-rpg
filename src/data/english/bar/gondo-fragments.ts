/**
 * Silent Bartender — Gondo's backstory fragments.
 *
 * Unlocked incrementally as the player accumulates nights. Each fragment
 * is a small, concrete image. No explanations, no sentiment. Surface
 * details first; the deeper past comes later.
 *
 * Tone reference: late Murakami without the whimsy. Closer to Kawabata.
 * Show, never tell. If you can see the feeling, it's wrong.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export interface GondoFragment {
    id: string;
    title: string;
    body: string;
    unlockAfterNights: number;
}

// ═══════════════════════════════════════════════════════════
// Fragment catalog (ordered by unlockAfterNights)
// ═══════════════════════════════════════════════════════════

export const GONDO_FRAGMENTS: GondoFragment[] = [
    {
        id: 'opening-hours',
        title: '開店の時間',
        unlockAfterNights: 1,
        body:
            '権藤は七時には店を開けない。六時五十七分に暖簾を出し、' +
            '七時ちょうどに鍵を回す。\n' +
            '「三分の余白がないと、客は入りにくい」と、かつて一度だけ言った。\n' +
            'それ以外の時間については、何も言わない。',
    },
    {
        id: 'the-noren',
        title: '暖簾',
        unlockAfterNights: 2,
        body:
            '暖簾は神楽坂の、もう畳んだ店から譲り受けたものだ。\n' +
            '藍は三度染め直されている。端の糸が一本、ほつれたままになっている。\n' +
            '「直すとかえって目立つ」と権藤は言い、それきり触らない。',
    },
    {
        id: 'first-regular',
        title: '最初の客',
        unlockAfterNights: 3,
        body:
            '開店した日の最初の客は、近所のタクシー運転手だった。\n' +
            '「熱いの、一合」とだけ言って、三十分で帰っていった。\n' +
            'その男は今も火曜の夜にだけ来る。注文は変わらない。',
    },
    {
        id: 'before-the-bar',
        title: 'この店の前',
        unlockAfterNights: 5,
        body:
            '権藤は以前、東京で通訳をしていた。\n' +
            'それ以前の数年は、ニューヨークにいたらしい。\n' +
            '会議室の端で、同時通訳のヘッドフォンをしていたと聞いたことがある。\n' +
            '誰から聞いたのかは、もう思い出せない。',
    },
    {
        id: 'song-he-cannot-hear',
        title: '聴けない歌',
        unlockAfterNights: 7,
        body:
            'ラジオから、古いシナトラが流れたことがあった。\n' +
            '権藤はグラスを拭く手を止めて、店の奥へ消えた。\n' +
            '戻ってきた時にはもう別の曲になっていた。\n' +
            'その晩、彼はその話をしなかった。次の晩も。',
    },
    {
        id: 'someone-never-came-back',
        title: '戻ってこなかった人',
        unlockAfterNights: 10,
        body:
            '二〇一二年の冬に、ひとりの男が店を出ていった。\n' +
            '「来週な」と権藤に言い、傘を忘れていった。\n' +
            '傘は今もカウンターの下の、右から二番目の場所に置いてある。',
    },
    {
        id: 'empty-stool',
        title: '隅の椅子',
        unlockAfterNights: 15,
        body:
            '奥の隅の丸椅子には、客を座らせない。\n' +
            'どんなに混んでいても、権藤は無言で別の席へ案内する。\n' +
            '椅子の座面は、他の椅子より少しだけへこんでいる。\n' +
            '誰かが長く座っていた跡だ。',
    },
    {
        id: 'photograph',
        title: '本から落ちた写真',
        unlockAfterNights: 20,
        body:
            '以前、棚を整理していた時に、古い文庫本から一枚の写真が落ちた。\n' +
            '雪の中、コートを着た女がこちらを見て笑っていた。\n' +
            '背景は、たぶんセントラルパーク。\n' +
            '権藤は無言でそれを拾い、本に戻し、本を別の棚へ移した。',
    },
    {
        id: 'first-english',
        title: 'はじめての英語',
        unlockAfterNights: 25,
        body:
            'ニューヨークで最初に口に出した英語は、' +
            '「I\'ll have what he\'s having」だったと、' +
            '一度だけ話してくれたことがある。\n' +
            '隣の男が何を飲んでいたのかは覚えていないらしい。\n' +
            '覚えているのは、その時カウンターの木目が濡れていたこと、だけだ。',
    },
    {
        id: 'unopened-letter',
        title: '開けていない手紙',
        unlockAfterNights: 30,
        body:
            'レジの引き出しの、いちばん奥に白い封筒が一通ある。\n' +
            '消印は十四年前、差出人の名前は英語で書かれている。\n' +
            '封は切られていない。\n' +
            '権藤はそれが見える位置に座らない。',
    },
    {
        id: 'yesterdays-funeral',
        title: '昨日の葬式',
        unlockAfterNights: 40,
        body:
            'あの常連の葬式は、昨日だった。\n' +
            '権藤は喪服のまま店を開けた。ネクタイだけ外して、カウンターの内側に入った。\n' +
            '「今夜は、いつも通りに頼む」と、お前に言った。それだけだった。\n' +
            '線香の匂いは、朝まで消えなかった。',
    },
    {
        id: 'three-am-question',
        title: '三時の問い',
        unlockAfterNights: 50,
        body:
            '一度、閉店後の三時頃、権藤がカウンターの向こうから聞いたことがある。\n' +
            '「お前、逃げてきたのか、それとも、たどり着いたのか」。\n' +
            'お前は答えなかった。権藤も、もう一度は聞かなかった。\n' +
            '次の日、その話はなかったことになっていた。',
    },
    {
        id: 'after-last-customer',
        title: '最後の客が帰ったあと',
        unlockAfterNights: 75,
        body:
            '最後の客が店を出ると、権藤はしばらくカウンターに両手をついて立っている。\n' +
            '何かを考えているのではなく、たぶん、何も考えていない。\n' +
            '氷の融ける音と、冷蔵庫のモーターの音だけが残る。\n' +
            'その時間がどれくらい続くか、お前は数えたことがない。',
    },
    {
        id: 'closing-phase-only',
        title: '夜明け前の一言',
        unlockAfterNights: 100,
        body:
            '空が白みはじめる頃、権藤はたまに、誰にともなく呟くことがある。\n' +
            '「あの時あいつが戻ってきていたら、俺はこの店を開けていない」。\n' +
            '誰のことかは言わない。\n' +
            '次の瞬間にはもう、グラスを拭く音に紛れて消えている。',
    },
    {
        id: 'the-apron',
        title: '前掛け',
        unlockAfterNights: 4,
        body:
            'お前が渡された前掛けは、権藤のものよりひとまわり小さい。\n' +
            '洗いすぎて藍が薄くなっている。\n' +
            '「誰かが前に使っていたのか」と一度聞いたが、権藤は答えなかった。',
    },
    {
        id: 'the-altar',
        title: '棚の上',
        unlockAfterNights: 12,
        body:
            '店の奥の棚に、小さな盃がひとつだけ伏せて置いてある。\n' +
            '権藤は毎朝、それを裏返し、水を入れ、また伏せる。\n' +
            '客が聞いても、「癖だ」としか言わない。',
    },
    {
        id: 'the-walk',
        title: '帰り道',
        unlockAfterNights: 35,
        body:
            '権藤は店から家まで、いつも遠回りをして帰る。\n' +
            '近道の路地は、通らない。\n' +
            'その路地に何があるのか、お前は知らない。\n' +
            '知らないほうがいい、と思うようになった。',
    },
    {
        id: 'the-mirror',
        title: '鏡',
        unlockAfterNights: 60,
        body:
            'カウンターの奥の鏡は、少しだけ斜めに掛けられている。\n' +
            '権藤の位置からは、自分の顔は映らないようになっている。\n' +
            '客の顔だけが、そこに並ぶ。\n' +
            '「そのほうが、仕事がしやすい」と、いつか言った。',
    },
    {
        id: 'the-first-book',
        title: '最初の一冊',
        unlockAfterNights: 120,
        body:
            '奥の棚の一番上に、背表紙が剥がれた文庫本が一冊ある。\n' +
            '権藤が十代で初めて自分で買った本だ。\n' +
            '英語の小説で、半分以上は辞書を引いても意味が分からなかった。\n' +
            'それでも捨てずに、ここまで持ってきた。',
    },
    {
        id: 'the-second-language',
        title: '第二言語',
        unlockAfterNights: 150,
        body:
            'ニューヨークで最初に覚えた英語のフレーズは "I don\'t know" だった。\n' +
            'それが言えた日、初めて店のカウンターで居場所ができた。\n' +
            '「知らない」と言える言語を持つことは、自由の一種だと、権藤は後に思った。',
    },
    {
        id: 'the-closing-hour',
        title: '閉店の時間',
        unlockAfterNights: 180,
        body:
            '5時に店を閉めると決めたのは、ニューヨーク時代のマスターの習慣だった。\n' +
            '「客が帰った時間が閉店時間だ」と、毎日違う時刻に暖簾を下ろしていた。\n' +
            '権藤は、5時という形だけを残した。',
    },
    {
        id: 'the-name-on-the-door',
        title: '暖簾の名前',
        unlockAfterNights: 220,
        body:
            '暖簾には、屋号が染め抜かれていない。\n' +
            '「名前は客がつける」と権藤は言う。\n' +
            '実際、常連たちはそれぞれ違う名前でこの店を呼んでいる。',
    },
    {
        id: 'the-final-customer',
        title: '最後の客',
        unlockAfterNights: 300,
        body:
            'いつか、誰も来ない夜が来るだろう、と権藤は知っている。\n' +
            'その夜も、彼は暖簾を出し、氷を砕き、グラスを並べる。\n' +
            '最後の客が誰なのかは、最後の客になって初めて分かる。',
    },
    {
        id: 'one-full-year',
        title: '一年',
        unlockAfterNights: 365,
        body:
            '一年、この店で立った。\n' +
            '「代打」と呼ばれた夜から365日。権藤はもう何も言わない。\n' +
            '氷を砕き、暖簾を下ろし、鍵をかける ── その順番は、\n' +
            'いつの間にか自分の手の記憶になっていた。',
    },
];

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

/**
 * Return all fragments the player has unlocked based on totalNights.
 * Sorted by unlockAfterNights ascending (so oldest-revealed comes first).
 */
export function getUnlockedFragments(stats: PlayerStats): GondoFragment[] {
    const nights = stats.totalNights ?? 0;
    return GONDO_FRAGMENTS
        .filter((f) => f.unlockAfterNights <= nights)
        .slice()
        .sort((a, b) => a.unlockAfterNights - b.unlockAfterNights);
}

/**
 * Return the single fragment that unlocked on this specific night, if any.
 * A fragment "unlocks on this night" when prevNights < unlockAfterNights <= totalNights.
 * If multiple unlock at once (unusual), return the latest (highest threshold).
 */
export function getNewlyUnlockedFragment(
    stats: PlayerStats,
    prevNights: number,
): GondoFragment | null {
    const nights = stats.totalNights ?? 0;
    if (nights <= prevNights) return null;
    const newly = GONDO_FRAGMENTS
        .filter((f) => f.unlockAfterNights > prevNights && f.unlockAfterNights <= nights)
        .sort((a, b) => b.unlockAfterNights - a.unlockAfterNights);
    return newly[0] ?? null;
}
