/**
 * Hourly ambience vignettes for the Silent Bartender sim.
 * One entry per hour (0-23 JST) describing the bar's texture at that time.
 * Tracks the rhythm from after-closing silence through prep, peak, and late quiet.
 * Intended as optional time-of-day flavor surfaced around the apprentice's shift.
 */

export interface HourlyAmbience {
    id: string;
    hour: number;
    body: string;
    activity: 'closed' | 'prep' | 'early' | 'peak' | 'late' | 'closing' | 'after';
}

export const HOURLY_AMBIENCES: HourlyAmbience[] = [
    {
        id: 'hr-0',
        hour: 0,
        body: 'カウンターの上に、空いた琥珀色のグラスが三つ残っている。\n氷の溶ける音だけが、低い天井の下で続いている。\nマスターはまだ前掛けを外さない。',
        activity: 'closing',
    },
    {
        id: 'hr-1',
        hour: 1,
        body: 'シンクで湯気が立ち、洗剤の泡が白く光る。\n布巾を絞る音が、閉じた扉の向こうの雨音と重なる。\n暖簾はもう仕舞われている。',
        activity: 'closing',
    },
    {
        id: 'hr-2',
        hour: 2,
        body: '灯りを半分落とすと、瓶の列が影の壁に変わる。\n冷蔵庫のモーターが、やけに大きく鳴る。\n床の木目が、濡れたまま黒く沈む。',
        activity: 'after',
    },
    {
        id: 'hr-3',
        hour: 3,
        body: '裏口の鍵を回す金属音が、路地に短く響く。\n店内には、炭の尽きかけた七輪の匂いだけが残っている。\n時計の秒針が、妙に近く聞こえる。',
        activity: 'after',
    },
    {
        id: 'hr-4',
        hour: 4,
        body: '無人の店の奥で、棚の酒瓶がかすかに揺れる。\n窓の外を、誰かの自転車が一台だけ通り過ぎる。\n空気は、煮干しと石鹸の匂いで止まっている。',
        activity: 'after',
    },
    {
        id: 'hr-5',
        hour: 5,
        body: '磨りガラス越しに、藍色がゆっくり白に変わる。\nカウンターの木肌に、初めての光の帯が一本落ちる。\n店内は、まだ昨夜の湿度を抱えている。',
        activity: 'closed',
    },
    {
        id: 'hr-6',
        hour: 6,
        body: '椅子の脚が床に刻んだ細かな傷が、朝日に照らされて見える。\n表の道で、新聞を束ねる紐の音が聞こえる。\n冷えた灰皿の中で、吸い殻が乾いている。',
        activity: 'closed',
    },
    {
        id: 'hr-7',
        hour: 7,
        body: '通勤の革靴が、店の前のアスファルトを規則正しく叩く。\n閉じた店内では、空のグラス棚だけが朝を映している。\n温度計の針が、ゆっくり上がり始める。',
        activity: 'closed',
    },
    {
        id: 'hr-8',
        hour: 8,
        body: '窓際のカウンターに、埃が金色の粉のように降りている。\n路地の向こうで、パン屋のシャッターが持ち上がる音。\n店の中は、誰の呼吸もない静けさだ。',
        activity: 'closed',
    },
    {
        id: 'hr-9',
        hour: 9,
        body: '光は天井近くまで届き、梁の節を白く浮かせている。\n外からは、小学生の列の、やや遅れた話し声が漏れる。\n冷蔵庫の霜が、今日も薄く張り直されている。',
        activity: 'closed',
    },
    {
        id: 'hr-10',
        hour: 10,
        body: '店の鍵が回り、軋む引き戸が初めて開く。\n外気が入り込み、夜の匂いを一息で押し出す。\n床に、マスターの短い影が斜めに伸びる。',
        activity: 'closed',
    },
    {
        id: 'hr-11',
        hour: 11,
        body: '酒屋のトラックが裏口に停まり、瓶のぶつかる軽い音が続く。\n厨房で、まな板が水を弾いている。\n店内はまだ半分の明るさのままだ。',
        activity: 'prep',
    },
    {
        id: 'hr-12',
        hour: 12,
        body: '出汁を引く湯気が、天井の低い梁にゆっくり触れる。\n昼の光が、カウンターの端だけを細く照らす。\n外の食堂の賑わいが、遠い潮騒のように届く。',
        activity: 'prep',
    },
    {
        id: 'hr-13',
        hour: 13,
        body: '包丁が柚子の皮を薄く削ぐ、小さな連続音。\n冷蔵庫の扉が開くたび、白い冷気が足元を流れる。\nまだ客はいない。仕込みの匂いだけがある。',
        activity: 'prep',
    },
    {
        id: 'hr-14',
        hour: 14,
        body: 'マスターが新しい布巾を畳んで、椅子の下に積み重ねる。\n氷の塊を割る音が、厨房から規則的に聞こえる。\n店の奥の壁に、まだ灯りは入っていない。',
        activity: 'prep',
    },
    {
        id: 'hr-15',
        hour: 15,
        body: '暖簾が表に掛けられ、布が軽く風を受ける。\n最初のグラスが、カウンターの定位置に伏せて並ぶ。\n夕方の光が、店内を蜂蜜色に染め始める。',
        activity: 'early',
    },
    {
        id: 'hr-16',
        hour: 16,
        body: '仕事帰りに早い一人目が戸を引き、革靴が床を鳴らす。\n瓶の栓を抜く短い音が、静けさを切り取る。\nおしぼりの湯気が、客の手の前で立ちのぼる。',
        activity: 'early',
    },
    {
        id: 'hr-17',
        hour: 17,
        body: 'カウンターの半分が埋まり、氷の音が途切れなくなる。\n西日がボトルの瓶底を通して、赤い斑を壁に落とす。\n誰かの笑い声が、一度だけ低く跳ねる。',
        activity: 'early',
    },
    {
        id: 'hr-18',
        hour: 18,
        body: '店の扉が何度も開き、外の夕立ちの匂いが入ってくる。\nレモンと炭の香りが、一つの空気に混ざる。\n注文の声が、常連のリズムで重なり始める。',
        activity: 'peak',
    },
    {
        id: 'hr-19',
        hour: 19,
        body: '厨房の鍋が立て続けに鳴り、七輪の脂が音を立てる。\n満席のカウンターに、グラスが十二並ぶ。\nマスターの手だけが、無言で最も速い。',
        activity: 'peak',
    },
    {
        id: 'hr-20',
        hour: 20,
        body: '店内は、声と氷と醤油の焦げる匂いで満ちている。\n窓は内側から白く曇り、外の看板が滲んで見える。\nおしぼりの山が、既に二度取り替えられている。',
        activity: 'peak',
    },
    {
        id: 'hr-21',
        hour: 21,
        body: '会話の密度が頂点で、誰かが拳でカウンターを軽く叩く。\nビールの泡が、次々と新しいグラスで盛り上がる。\n暖簾の裏で、次の客がまだ並んでいる。',
        activity: 'peak',
    },
    {
        id: 'hr-22',
        hour: 22,
        body: '客が半分になり、空いた席に煙草の煙が薄く残る。\n誰かが静かにウイスキーをストレートで頼む。\nラジオの深夜放送が、初めて耳に届く。',
        activity: 'late',
    },
    {
        id: 'hr-23',
        hour: 23,
        body: 'カウンターの端に、一人残った客の背中がある。\n氷が溶けるたび、グラスの縁でかすかな音がする。\n時計の針が、閉店の位置に近づいている。',
        activity: 'late',
    },
];

export function ambienceForHour(hour: number): HourlyAmbience {
    const match = HOURLY_AMBIENCES.find((entry) => entry.hour === hour);
    if (match) {
        return match;
    }
    const fallback = HOURLY_AMBIENCES.find((entry) => entry.hour === 0);
    if (fallback) {
        return fallback;
    }
    return HOURLY_AMBIENCES[0];
}
