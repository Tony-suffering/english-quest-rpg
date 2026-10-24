/**
 * Customer Exit Patterns for Silent Bartender.
 * Archetype-specific departure sequences used rarely as closing subtitles.
 * Each pattern captures a concrete physical choreography of leaving and
 * the small trace a customer leaves behind after stepping into the night.
 * Complements the generic subtitles defined in exit-beats.ts.
 */

export interface ExitPattern {
    id: string;
    customerArchetype: string;
    departureSequence: string;
    lingeringTrace: string;
}

export const EXIT_PATTERNS: ExitPattern[] = [
    {
        id: 'exit-old-craftsman',
        customerArchetype: '老いた職人',
        departureSequence:
            '伝票を見ずに札を置く → コートをゆっくり着る → 暖簾をかき分ける前に、振り向かずに少しだけ頭を下げる → 外の空気に消える',
        lingeringTrace: 'カウンターに置かれた札の、指でならした折り目が静かに残っていた',
    },
    {
        id: 'exit-passing-drunk',
        customerArchetype: '通りすがりの酔客',
        departureSequence:
            '二度目の「じゃあな」を呟く → 椅子を押し戻し損ねて少し音を立てる → 扉を半分だけ開けたまま外を覗く → 踵を返さずに夜に傾いて出ていく',
        lingeringTrace: '椅子の脚が床にひっかけた細い線が、翌朝まで残っていた',
    },
    {
        id: 'exit-quiet-regular',
        customerArchetype: '常連の静か',
        departureSequence:
            'グラスを定位置から一センチずらして置く → 勘定を言わずに紙幣を畳んで差し出す → 目を合わせて軽く頷く → 暖簾を片手で持ち上げて静かに出ていく',
        lingeringTrace: 'ずらされたグラスの底に、水滴の輪がふたつ重なって残っていた',
    },
    {
        id: 'exit-young-salaryman',
        customerArchetype: '若いサラリーマン',
        departureSequence:
            'スマートフォンの画面をひと目見る → ネクタイの結び目を少しだけ緩める → 「また来ます」と早口で言う → 傘を取り忘れかけて戻り、照れ笑いを残して出ていく',
        lingeringTrace: '置き忘れかけた傘の柄に、手のひらの温度がまだ残っていた',
    },
    {
        id: 'exit-widow-in-black',
        customerArchetype: '黒い服の未亡人',
        departureSequence:
            'グラスの縁にそっと指をすべらせる → ハンカチで口元をひとつ押さえる → カウンターに小さく目礼する → 足音を立てぬように扉の向こうへ消える',
        lingeringTrace: '椅子の座面に、黒い布地の繊維がほんのわずかに残っていた',
    },
    {
        id: 'exit-retired-detective',
        customerArchetype: '引退した刑事',
        departureSequence:
            '店内をひと通り眺める → コップの底を親指で軽く叩く → 「ごちそうさん」と低く言う → コートの襟を立てて、振り向かずに歩み去る',
        lingeringTrace: '煙草の香りと、古いオーデコロンの微かな残り香が漂っていた',
    },
    {
        id: 'exit-first-timer',
        customerArchetype: '初めての客',
        departureSequence:
            '財布の中を二度確かめる → おつりを小さく頭を下げて受け取る → 扉の取っ手に触れてからもう一度店内を振り返る → ためらいながら外に踏み出す',
        lingeringTrace: 'カウンターの端に、受け取り損ねかけた小銭がひとつ残っていた',
    },
    {
        id: 'exit-writer-on-deadline',
        customerArchetype: '締切前の作家',
        departureSequence:
            'ノートを閉じて万年筆をしまう → 眼鏡を外してレンズを息で曇らせる → 「では」とだけ呟く → 原稿を小脇に抱えて足早に暖簾をくぐる',
        lingeringTrace: 'テーブルの木目にインクの小さな染みが残っていた',
    },
    {
        id: 'exit-quiet-musician',
        customerArchetype: '静かな楽師',
        departureSequence:
            '楽器ケースの留め金をゆっくり閉める → グラスの残りを一息で飲み干す → カウンターに指で三つ、拍を打つ → 頷いて、夜の向こうへ歩き出す',
        lingeringTrace: 'カウンターの木に、指で打った拍のリズムが耳の奥に残っていた',
    },
    {
        id: 'exit-silent-couple',
        customerArchetype: '無言の夫婦',
        departureSequence:
            '二人同時にグラスを置く → 目を合わせずに、しかし同じ呼吸でコートを着る → 妻が先に立ち、夫が半歩遅れて続く → 扉を閉める音さえ揃っている',
        lingeringTrace: '隣り合った椅子の背に、ふたつのコートのしわがほぼ同じ高さで残っていた',
    },
    {
        id: 'exit-foreign-traveler',
        customerArchetype: '外国からの旅人',
        departureSequence:
            '地図を折り畳んでポケットに入れる → 「アリガトウ」と慎重に発音する → 両手で小さくお辞儀をする → 扉の前で一度だけ写真を撮り、夜の町へ消える',
        lingeringTrace: 'カウンターに、乾いた地図の折り目の香りが微かに残っていた',
    },
    {
        id: 'exit-night-shift-nurse',
        customerArchetype: '夜勤明けの看護師',
        departureSequence:
            '腕時計を二度確認する → 深く息を吐いてからコートを羽織る → 「おやすみなさい、というか、おはよう」と小さく笑う → 朝焼けの気配のする外へ出ていく',
        lingeringTrace: 'グラスの底に残った氷の音が、しばらく続いていた',
    },
    {
        id: 'exit-old-actress',
        customerArchetype: '老いた女優',
        departureSequence:
            '口紅を小さな鏡で直す → グラスを両手で包んでから置く → 背筋を伸ばし、舞台袖を去るように歩き出す → 暖簾の前で一度だけ振り返り、微笑む',
        lingeringTrace: 'グラスの縁に、薄紅色の半月がひとつ残っていた',
    },
    {
        id: 'exit-wandering-student',
        customerArchetype: '迷える学生',
        departureSequence:
            'リュックの紐を肩で整える → 半分読みかけの本を閉じる → 小さな声で「ありがとうございました」と言う → 扉の前でもう一度だけ店内を見渡してから出ていく',
        lingeringTrace: '椅子の上に、本のしおり紐が一本だけ落ちていた',
    },
    {
        id: 'exit-company-president',
        customerArchetype: '会社の会長',
        departureSequence:
            '腕時計の針を一瞥する → 革手袋を一本ずつ丁寧にはめる → 運転手への合図を短く送る → 扉が開かれるのを待ってから、言葉少なに外へ出ていく',
        lingeringTrace: '椅子の背に、重いコートのしわが暫く残っていた',
    },
    {
        id: 'exit-sailor-on-leave',
        customerArchetype: '休暇中の船乗り',
        departureSequence:
            '最後の一杯を立ったまま飲み干す → 帽子を被り直して角度を決める → 「次の港でまた」と笑って言う → 少し揺れる足取りで夜風に出ていく',
        lingeringTrace: 'カウンターに置かれたコースターから、潮の匂いが微かに立ち上っていた',
    },
    {
        id: 'exit-lonely-poet',
        customerArchetype: '孤独な詩人',
        departureSequence:
            '手帳に一行だけ書き付ける → ペンをしまわずに耳の後ろに挟む → 空になったグラスを長く見つめる → 何も言わずに立ち上がり、夜に溶けていく',
        lingeringTrace: 'カウンターに、手帳から落ちた小さな紙片が一枚残っていた',
    },
    {
        id: 'exit-regular-on-final-night',
        customerArchetype: '最後の夜の常連',
        departureSequence:
            'いつもの席を指でなぞる → 勘定を払ってから、小さく包んだものを静かに置く → 目を合わせて一度だけ深く頭を下げる → 暖簾をくぐらず、少しだけ立ち止まってから出ていく',
        lingeringTrace: 'カウンターの端に、古い店のマッチ箱がひとつ、丁寧に並べて置かれていた',
    },
];

export function pickExitPattern(): ExitPattern {
    const index = Math.floor(Math.random() * EXIT_PATTERNS.length);
    return EXIT_PATTERNS[index];
}
