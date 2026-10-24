/**
 * Monthly scenes for Silent Bartender — one recurring dynamic per calendar month.
 * Each entry captures the specific atmosphere of that month at the counter
 * along with a recurring element the apprentice notices every year.
 * Scenes are JST-gated; `thisMonthScene` converts the current time to JST
 * and returns the scene corresponding to that month (1-12).
 */

export interface MonthlyScene {
    id: string;
    month: number;
    monthLabel: string;
    sceneBody: string;
    recurringElement: string;
}

export const MONTHLY_SCENES: MonthlyScene[] = [
    {
        id: 'month-1',
        month: 1,
        monthLabel: '睦月',
        sceneBody:
            '濡れた冷気が扉の隙間から滑り込み、コートの肩に小さく残った雪が湯気に変わる。\n正月明けの客は口数が少なく、湯呑を両手で包んで黙って温まっている。\nカウンターの木目に、融けた雪の滴がぽつりと落ちる音が混じる。\n外の街灯は霜で白く霞み、暖簾の向こうの世界がやけに遠く感じられる。',
        recurringElement: '毎年、松の内が明けた最初の夜、常連の一人が去年より少し老けた顔で「今年もよろしく」とだけ言って座る。',
    },
    {
        id: 'month-2',
        month: 2,
        monthLabel: '如月',
        sceneBody:
            '一番底冷えする月で、熱燗の注文ばかりが続き、徳利の口からの湯気が途切れない。\n客は襟巻を外さず、手袋を畳んで膝の上に置いたまま、燗の温度だけを何度も確かめる。\n窓硝子は内側から白く曇り、指で書かれた小さな文字がいつの間にか消えている。\n立春を過ぎても夜風は鋭く、戸の隙間で風切音が細く鳴り続ける。',
        recurringElement: '毎年、節分の翌日になると、誰かが豆を一粒だけ黙ってカウンターに置いていく。',
    },
    {
        id: 'month-3',
        month: 3,
        monthLabel: '弥生',
        sceneBody:
            '送別と別れの匂いが混じる月で、客の声にどこか苛立ちと急ぎが滲む。\n異動の辞令を受け取った背広姿が、普段より一杯多く頼み、普段より饒舌に沈黙する。\n花粉で目を赤くした常連が、おしぼりを長く額に当てたまま動かない。\n扉を開けるたびに冷たい風と一緒に、花粉の匂いがわずかに運ばれてくる。',
        recurringElement: '毎年、三月の最終週、必ず誰かが「最後に一杯だけ」と言って現れ、そのまま二度と来なくなる。',
    },
    {
        id: 'month-4',
        month: 4,
        monthLabel: '卯月',
        sceneBody:
            '真新しい革靴の軋む音と、まだ板についていない背広の客が混じり始める。\n歓迎会の帰りらしい一団が短く笑い、すぐに静かに散っていく夜が続く。\n夜桜の花びらが一枚、暖簾に張り付いたまま朝まで落ちないことがある。\n春の夜風はまだ芯が冷たく、笑い声の後の沈黙が妙に長く感じられる。',
        recurringElement: '毎年、四月の第二週に、初々しい新人が先輩に連れられて「初めての店」として入ってくる。',
    },
    {
        id: 'month-5',
        month: 5,
        monthLabel: '皐月',
        sceneBody:
            '連休明けの月で、客の顔にまだ旅の疲れと休みボケが残っている。\n話題は他愛のない旅先の土産話から、連休明けの職場の愚痴へと緩やかに移っていく。\n夜になっても窓を少し開けておけるほど空気が柔らかく、外の虫の音が薄く届く。\n五月病を抱えた若い客が、注文した酒を半分以上残して帰っていくことがある。',
        recurringElement: '毎年、連休が明けた最初の金曜に、普段来ない客まで顔を出し、妙に店が混み合う。',
    },
    {
        id: 'month-6',
        month: 6,
        monthLabel: '水無月',
        sceneBody:
            '湿った空気が床板に染み込み、グラスの外側にすぐ水滴が浮かぶ。\n雨に濡れた傘が入口の籠に幾本も積まれ、そのうち誰のものか分からなくなる。\n客の髪は湿り、背広の肩はわずかに色を濃くしたまま乾かない。\n雨音と氷の鳴る音だけが長く続く夜が、何度か繰り返される。',
        recurringElement: '毎年、梅雨入りの夜、必ず一本の傘が忘れられ、そのまま持ち主が現れない。',
    },
    {
        id: 'month-7',
        month: 7,
        monthLabel: '文月',
        sceneBody:
            '夜になっても熱が引かず、扉を開けた瞬間に湿った熱風が押し寄せる。\n客はおしぼりを首筋に当て、最初の一杯はビールと決まったように繰り返される。\n遠くで打ち上げ花火の音が低く響き、会話が一瞬だけ止まる夜がある。\n浴衣姿の客がぽつりと混じり、下駄の音がカウンターの手前で止まる。',
        recurringElement: '毎年、七夕の夜、誰かが短冊のような紙切れをカウンターの端にそっと置いていく。',
    },
    {
        id: 'month-8',
        month: 8,
        monthLabel: '葉月',
        sceneBody:
            '日中の熱がまだ路地の石畳に残り、夜更けまで街全体がぬるく湿っている。\n夜勤明けらしき外国人労働者の姿がカウンターの端に増え、短い会話と長い沈黙が交互に続く。\n盆の時期には常連の姿が消え、代わりに見慣れない帰省客が一杯だけ頼んで帰る。\n換気扇の回る音と、氷がグラスに沈む音だけが、妙に鮮明に聞こえる夜が続く。',
        recurringElement: '毎年、盆の真ん中の夜、誰もいないカウンターの一席に、徳利と猪口が一組だけ置かれる。',
    },
    {
        id: 'month-9',
        month: 9,
        monthLabel: '長月',
        sceneBody:
            '残暑と初秋の風が入れ替わり、扉を開けるたびに温度が微妙に違う。\n夏の疲れを引きずった客が多く、最初の一杯を飲み干すまでの時間が長い。\n台風の予報が出た夜は、客足が途切れ、ラジオの音量だけが少し上がる。\n月が大きく見える夜には、窓際の席を選ぶ客が自然と増える。',
        recurringElement: '毎年、十五夜の晩に、常連の一人が団子をひと皿だけ差し入れていく。',
    },
    {
        id: 'month-10',
        month: 10,
        monthLabel: '神無月',
        sceneBody:
            '空気が乾き始め、熱燗と冷酒の注文がほぼ半々で揺れる月になる。\n夜が急に深くなり、閉店前の路地にはもう人影がほとんど残っていない。\n衣替えを終えたばかりの上着の、樟脳の匂いが客の袖からわずかに漂う。\n秋祭りの笛の音が遠くから途切れ途切れに届く夜が、数えるほどある。',
        recurringElement: '毎年、十月の中頃、常連の誰かが今年初めての熱燗を頼み、それが合図のように他の客も続く。',
    },
    {
        id: 'month-11',
        month: 11,
        monthLabel: '霜月',
        sceneBody:
            '朝の霜の名残が夜まで路地のどこかに残り、客の吐く息が白く流れる。\n忘年会にはまだ早い微妙な時期で、客の人数は少なく、一人あたりの時間が長い。\n熱燗の徳利が途切れず、カウンターの端には空の徳利が静かに並んでいく。\n立冬を過ぎた辺りから、扉を開ける動作そのものに少し重みが増す。',
        recurringElement: '毎年、十一月の下旬、今年初めて手袋を外し忘れたまま座る客が現れる。',
    },
    {
        id: 'month-12',
        month: 12,
        monthLabel: '師走',
        sceneBody:
            '年末の疲れを背負った客が増え、背広の肩が重たげに落ちている。\n忘年会の二次会帰りの一団が現れては、短く賑わい、短く去っていく。\n一人で来る常連の口数が普段より減り、酒のペースだけが静かに速くなる。\n閉店の頃には、残った客と店主の間に、言葉にならない一年分の沈黙が降りる。',
        recurringElement: '毎年、大晦日の近い夜、誰かが「今年もお世話になりました」とだけ言い残して、振り返らずに出ていく。',
    },
];

export function thisMonthScene(now?: Date): MonthlyScene {
    const base = now ?? new Date();
    const jstMillis = base.getTime() + 9 * 60 * 60 * 1000;
    const jst = new Date(jstMillis);
    const monthIndex = jst.getUTCMonth();
    return MONTHLY_SCENES[monthIndex];
}
