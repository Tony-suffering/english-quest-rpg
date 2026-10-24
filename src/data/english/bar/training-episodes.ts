/**
 * Training episodes for the apprentice of Silent Bartender.
 * Short literary flashbacks recalling earlier nights under master Gondo's teaching.
 * Each entry unlocks after a specific number of total nights served and fires
 * rarely as a subtitle beat. First-person, understated, Japanese only.
 */

export interface TrainingEpisode {
    id: string;
    title: string;
    setting: string;
    body: string;
    lesson?: string;
    unlockAfterNights: number;
}

export const TRAINING_EPISODES: TrainingEpisode[] = [
    {
        id: 'train-first-day',
        title: '雇われた日',
        setting: '三月、面接のあとの昼下がり。',
        body: '権藤さんは履歴書を一度も見なかった。\n「喋るな、見てろ」とだけ言って、奥の布巾を指した。\nそれが最初の指示だった。\n帰り道、私はまだ何の匂いも覚えていなかった。',
        lesson: '言葉より先に、手の位置を覚える。',
        unlockAfterNights: 3,
    },
    {
        id: 'train-first-glass',
        title: '最初に割ったグラス',
        setting: '見習い四日目、開店前の仕込み。',
        body: '薄いロックグラスが指の間を抜けた。\n音はやけに小さく、飛沫の方が大きかった。\n権藤さんは顔を上げもせず、箒の場所を顎で示した。\n叱られなかったことの方が、長く残った。',
        unlockAfterNights: 5,
    },
    {
        id: 'train-told-to-watch',
        title: '一週間、見ているだけ',
        setting: '最初の週、カウンターの内側の端で。',
        body: '「手を出すな」と言われ、ただ立っていた。\n客の注文、権藤さんの返事、間、視線の高さ。\n退屈ではなかった。疲労だけが濃かった。\n七日目の夜、ようやく徳利を持たせてもらえた。',
        lesson: '見ることは、手を動かすより遠い。',
        unlockAfterNights: 8,
    },
    {
        id: 'train-ice',
        title: '氷の割り方',
        setting: '梅雨入り前の、湿った夕方。',
        body: 'アイスピックの角度が違う、と権藤さんが言った。\n「割るんじゃない。ひびに従え」\n何度やっても、私の氷は角が崩れた。\n三日目、偶然うまく割れた一つを、権藤さんは黙って客のグラスへ入れた。',
        unlockAfterNights: 12,
    },
    {
        id: 'train-scolded-for-speaking',
        title: '喋りすぎた夜',
        setting: '六月、常連が一人で飲んでいた夜。',
        body: '間がもたず、私は天気の話をした。\n客は薄く笑い、権藤さんは何も言わなかった。\n閉店後、布巾を渡されながら一言だけ、\n「今日、あの人は疲れていた」と言われた。\n天気の話をしなければ、分かったのかもしれない。',
        lesson: '沈黙にも、相手の輪郭がある。',
        unlockAfterNights: 18,
    },
    {
        id: 'train-sake-temperature',
        title: '燗の温度',
        setting: '秋口、徳利を初めて任された夜。',
        body: '温度計は使うな、と言われた。\n手の甲を徳利に当て、数を数える癖がついた。\n最初の一本は熱すぎて、客は一口で眉を寄せた。\n二本目は、ほんの少しだけぬるかった。\n三本目で、ようやく何も言われなかった。',
        unlockAfterNights: 25,
    },
    {
        id: 'train-rooster',
        title: '一番鶏',
        setting: '明け方近く、客が一人残っていた夜。',
        body: '権藤さんが突然、私に呼び込みの声を出させた。\n「一番鶏だ。声を張っとけ」\n意味は分からなかったが、私は低く短く声を出した。\n客は笑い、権藤さんは頷いた。\nその後、同じ合図を何度か練習させられた。',
        lesson: '声は、店の呼吸の一部らしい。',
        unlockAfterNights: 35,
    },
    {
        id: 'train-silent-forgiveness',
        title: '黙って許された夜',
        setting: '冬の初め、常連の先生が来ていた夜。',
        body: 'お通しの小鉢を、私は取り違えて出した。\n先生は一瞬だけ箸を止め、そのまま食べ始めた。\n権藤さんは私の肩に軽く手を置いた。\nそれだけだった。\n帰り際、先生は私にではなく、権藤さんに頭を下げた。',
        unlockAfterNights: 50,
    },
    {
        id: 'train-closing-ritual',
        title: '閉店の所作',
        setting: '初めて閉店まで立ち会った、十二月の夜。',
        body: '権藤さんは暖簾を外し、軽く畳んでから戸口に礼をした。\n誰に対するものかは、聞かなかった。\n私は真似をして、少し深すぎる礼をしてしまった。\n権藤さんは何も言わず、鍵を私に渡した。',
        lesson: '所作は、見られていない時ほど正しい。',
        unlockAfterNights: 70,
    },
    {
        id: 'train-former-colleague',
        title: '気づかれなかった客',
        setting: '二年目の春、開店直後の時間帯。',
        body: '以前の職場の同僚が、連れと入ってきた。\n私の顔を見て、軽く会釈しただけだった。\n思い出さなかったのか、思い出したうえで黙ったのか。\n注文を受け、酒を出し、会計を済ませた。\n店を出るとき、彼はもう一度だけ私を見た。',
        unlockAfterNights: 100,
    },
    {
        id: 'train-first-sakura',
        title: 'この役で見た最初の桜',
        setting: '三年目の春、早朝の掃除の途中。',
        body: '窓の外に、昨夜はなかった色が滲んでいた。\n私は箒を持ったまま、しばらく動けなかった。\n権藤さんは奥の冷蔵庫の音を確かめていて、何も言わなかった。\n店を開ける前の、ごく短い時間だった。',
        lesson: '季節は、客より先に店に入ってくる。',
        unlockAfterNights: 150,
    },
    {
        id: 'train-first-thanks',
        title: '最初の「ありがとう」',
        setting: '四年目の冬、閉店のあとの静けさの中で。',
        body: '片付けを終えた私に、権藤さんが低く言った。\n「ありがとう」\n客に向けたものか、私に向けたものか、分からなかった。\n聞き返すのも違う気がして、私は布巾を畳み直した。\nその夜のことは、今も聞けていない。',
        unlockAfterNights: 200,
    },
];

export function getUnlockedEpisodes(totalNights: number): TrainingEpisode[] {
    return TRAINING_EPISODES.filter((ep) => totalNights >= ep.unlockAfterNights);
}

export function pickEpisodeForTonight(totalNights: number): TrainingEpisode | null {
    const unlocked = getUnlockedEpisodes(totalNights);
    if (unlocked.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * unlocked.length);
    return unlocked[index] ?? null;
}
