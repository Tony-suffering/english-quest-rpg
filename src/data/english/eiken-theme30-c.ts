/**
 * THEME 30 -- テーマ16〜20。
 * 国と国(world)の重心ブロック + 民主主義(power)。
 * 品質基準は eiken-theme30-d.ts(テーマ22)。行のムーブタグ、数字の丸め方、
 * yes/no の衝突のさせ方、deeper での代償の認め方、全部あれに合わせてある。
 * テーマ16/17は重いテーマ: ジョークは冷たい刃。笑いを取りにいかない。
 */

import type { Theme } from './eiken-theme30-types';

export const THEMES_C: Theme[] = [
    // ============================================================
    // 16 戦争は終わるか
    // ============================================================
    {
        no: 16, id: 'war-peace', label: '戦争は終わるか', en: 'Whether War Ever Ends',
        field: 'world',
        owns: '戦争と平和の実現可能性、人間の暴力性の話すべて。恒久平和、軍縮の是非、国際法の限界、人は争う生き物かはここが担当',
        sourceDays: [2],
        hook: "So we are really asking whether humans can retire from war, or only take breaks. Okay.",
        hookJa: "つまり、人類は戦争を引退できるのか、それとも休憩できるだけなのか、という問いですね。",
        universal: "誰もが平和を望むと言う。ただし自分の条件での平和をだ。戦争が続くのは人が平和を嫌いだからじゃない。自分の負けとして終わる平和が嫌いだからだ。",
        universalEn: "Everyone wants peace, on their own terms. People do not hate peace. They hate a peace that counts as their loss.",
        angles: [
            { label: '記録', en: "Great powers used to fight each other every generation. For about eighty years, they mostly have not.", ja: "大国同士は一世代ごとに戦っていた。この八十年ほどは、ほぼ戦っていない。" },
            { label: '資源', en: "Peace has a supply problem. More people, same rivers, same land.", ja: "平和には供給の問題がある。人は増え、川と土地は増えない。" },
            { label: '信念', en: "Territory can be split. Beliefs cannot. Some wars have no halfway line.", ja: "領土は割れる。信念は割れない。中間線のない戦争がある。" },
            { label: '装置', en: "The calm we have leans on treaties, trade, and terror. Remove one leg and check the chair.", ja: "今ある静けさは条約と貿易と恐怖の上に載っている。脚を一本抜いて、椅子を見てみろ。" },
        ],
        origin: {
            day: 2, essay: "No. Lasting world peace is not realistically achievable.",
            stance: "Three walls stand between us and forever",
            stanceJa: "永遠との間に壁が三つ立っている",
            lines: [
                { en: "So can peace last forever? I keep landing on no, and I see three walls.", ja: "平和は永遠に続くのか。俺は何度考えてもノーに着地する。壁が三つ見える。", m: ['reframe'] },
                { en: "Wall one is stuff. Water, land, energy. More people, same planet.", ja: "一つ目の壁はモノだ。水、土地、エネルギー。人は増え、惑星は増えない。", m: ['picture', 'echo'] },
                { en: "Wall two is belief. You can split a field in half. You cannot split a god.", ja: "二つ目の壁は信念。畑は半分に割れる。神は割れない。", m: ['echo', 'picture'] },
                { en: "Wall three is the weapons. While the arsenals stand, the distrust stands with them.", ja: "三つ目の壁は兵器。武器庫が立っている限り、不信も一緒に立っている。", m: ['trust-infra', 'echo'] },
                { en: "So I will work for fewer wars. Forever peace, I cannot promise anyone.", ja: "だから俺は戦争を減らす側で働く。永遠の平和は、誰にも約束できない。", m: ['own-cost', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, peace is a skill, and the record shows we are learning it",
            stanceJa: "平和は技術であり、記録は人類が習得中だと示している",
            lines: [
                { en: "Before we call it a dream, look at the record. Part of this experiment already ran.", ja: "夢と呼ぶ前に記録を見ろ。この実験の一部はもう走った。", m: ['tried'] },
                { en: "France and Germany fought three wars in seventy years. Now they share a currency and a parliament.", ja: "フランスとドイツは七十年で三度戦った。今は通貨と議会を共有している。", m: ['tried', 'one-number'] },
                { en: "That peace did not come from nicer people. It came from trade, treaties, and boring meetings.", ja: "あの平和は人間が優しくなったから来たんじゃない。貿易と条約と退屈な会議から来た。", m: ['rename', 'trust-infra'] },
                { en: "And direct war between great powers has been rare for about eighty years. That never happened before.", ja: "しかも大国同士の直接戦争は、八十年ほとんど起きていない。史上初のことだ。", m: ['one-number', 'tried'] },
                { en: "The news shows every burning street, so peace feels dead. The long graph says otherwise.", ja: "ニュースは燃える街を全部映すから、平和は死んだ気がする。長期のグラフは逆を言っている。", m: ['feel-vs-fact'] },
                { en: "Peace is not a miracle. It is maintenance. And our maintenance is improving.", ja: "平和は奇跡じゃない。保守点検だ。そして人類の点検の腕は上がっている。", m: ['rename', 'land-short'] },
            ],
        },
        no: {
            stance: "No, because the machinery of conflict is built into us and into the map",
            stanceJa: "争いの装置は人間と地図の両方に組み込まれているから、終わらない",
            lines: [
                { en: "First, define lasting. Not a quiet decade. Forever. That is the actual claim, and it is huge.", ja: "まず「恒久」を定義しろ。静かな十年じゃない。永遠だ。それが本来の主張で、途方もなく重い。", m: ['define'] },
                { en: "Every long peace in history has an end date. We only see it afterwards.", ja: "歴史上のどの長い平和にも終了日がある。俺たちはそれを後からしか見えない。", m: ['tried'] },
                { en: "And our calm years lean on something ugly. The bombs made big war suicidal, not unattractive.", ja: "しかも今の静かな年月は醜いものに寄りかかっている。爆弾は大戦争を自殺行為にしただけで、魅力を消してはいない。", m: ['concede-pivot', 'rename'] },
                { en: "Meanwhile the pressure rises. Water, energy, land. More hands reaching for the same rivers.", ja: "その間も圧力は上がる。水、エネルギー、土地。同じ川に伸びる手が増えていく。", m: ['picture'] },
                { en: "We organize by tribe. We always have. A border is a tribe with paperwork.", ja: "人は部族で群れる。ずっとそうだった。国境とは、書類を持った部族のことだ。", m: ['rename', 'picture'] },
                { en: "So plan for conflict the way you plan for fire. Hope is not a sprinkler system.", ja: "だから火事に備えるように争いに備えろ。希望はスプリンクラーの代わりにならない。", m: ['picture', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "If lasting peace is impossible, why try at all? Your view sounds like an excuse for doing nothing.",
                qJa: "恒久平和が不可能なら、なぜ努力する？ その見方は何もしない言い訳に聞こえるが",
                a: [
                    { en: "Fair hit. Pessimism can turn into permission, and that is a real cost of my side.", ja: "痛いところだ。悲観は免罪符に変わりうる。それは俺の側の本物の代償だ。", m: ['own-cost', 'concede-pivot'] },
                    { en: "But a fire brigade does not believe fire will end. It still shows up.", ja: "ただ、消防隊は火事がなくなるとは信じていない。それでも出動する。", m: ['picture', 'compare'] },
                    { en: "Impossible to finish is not impossible to reduce. Fewer wars is a goal. Zero is a poster.", ja: "終わらせられないことと減らせないことは別だ。戦争を減らすのは目標。ゼロはポスターだ。", m: ['rename', 'land-short'] },
                ],
            },
            {
                q: "Europe proved that old enemies can become partners. Why can the whole world not copy that?",
                qJa: "ヨーロッパは宿敵同士が組めることを証明した。なぜ世界全体でそれを真似できない？",
                a: [
                    { en: "Europe is real, and I do not get to wave it away. My side has to answer it.", ja: "ヨーロッパの例は本物で、俺は手を振って消せない。俺の側が答える義務を負う。", m: ['concede-pivot', 'own-cost'] },
                    { en: "But that peace grew under an outside umbrella, after the worst war ever. Rich, scared, and protected.", ja: "ただ、あの平和は外の傘の下で、史上最悪の戦争の後に育った。豊かで、怯えていて、守られていた。", m: ['tried'] },
                    { en: "Copy the ending without the conditions, and you are copying a lottery ticket.", ja: "条件を抜きに結末だけ真似するのは、当たりくじの数字だけ写すのと同じだ。", m: ['picture', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "The oldest peace treaty we have is carved in stone, three thousand years old. We are still drafting new ones.",
            ja: "現存する最古の平和条約は石に刻まれていて、三千年前のものだ。俺たちはまだ新しいのを起草している。",
            note: "重いテーマの冷たい刃。笑いを取りにいかない。置いて、一拍黙って、次の論点へ。空気が固まりすぎたら So the work is old. That is all I am saying. と足して温度を戻す。",
            m: ['tried', 'picture'],
        },
        cards: [
            "Can lasting world peace ever be achieved?",
            "Is conflict simply part of human nature?",
            "Should nations reduce their military spending?",
            "Can international law prevent wars between nations?",
        ],
    },

    // ============================================================
    // 17 大きすぎる武器
    // ============================================================
    {
        no: 17, id: 'big-weapons', label: '大きすぎる武器', en: 'Weapons Too Big To Use',
        field: 'world',
        owns: '核兵器・大量破壊兵器と抑止の話すべて。禁止の可否、抑止論の是非、核拡散、軍縮条約はここが担当',
        sourceDays: [19],
        hook: "So we are really asking whether a country will drop its strongest card mid-game. Okay.",
        hookJa: "つまり、ゲームの途中で一番強い札を捨てる国があるのか、という問いですね。",
        universal: "持てば使えない。捨てれば脅される。一番強い道具が一番使えない道具でもある。その奇妙な均衡の上に、全員が住んでいる。",
        universalEn: "Own it and you cannot use it. Drop it and you can be threatened. The strongest tool is also the least usable one, and everyone lives on that balance.",
        angles: [
            { label: '実績', en: "None used in war since nineteen forty-five. That record is real. So is the luck inside it.", ja: "1945年以来、実戦では一発も使われていない。その記録は本物だ。中に入っている運も本物だが。" },
            { label: '検証', en: "A ban you cannot inspect is a rumor with signatures.", ja: "査察できない禁止は、署名付きの噂だ。" },
            { label: '教訓', en: "Ukraine handed over its warheads and was invaded anyway. Every capital filed that lesson.", ja: "ウクライナは核弾頭を引き渡し、それでも侵攻された。どの首都もその教訓を綴じて保管した。" },
            { label: '確率', en: "One button, many humans, endless years. Small odds, multiplied forever, stop being small.", ja: "ボタンと大勢の人間と、果てしない年月。小さな確率も、永遠を掛ければ小さくない。" },
        ],
        origin: {
            day: 19, essay: "No. A complete worldwide WMD ban is not realistically attainable.",
            stance: "Deterrence, verification, and distrust block the road to zero",
            stanceJa: "抑止と検証と不信が、ゼロへの道を塞いでいる",
            lines: [
                { en: "So could every country give up these weapons at once? I do not see it.", ja: "全部の国が一斉にこの兵器を手放せるのか。俺には見えない。", m: ['reframe'] },
                { en: "The owners see the bomb as their insurance. Nobody cancels insurance during a storm.", ja: "保有国は爆弾を保険とみなしている。嵐の最中に保険を解約する奴はいない。", m: ['picture', 'rename'] },
                { en: "And you cannot count what is hidden. A treaty you cannot check is a wish.", ja: "それに、隠されたものは数えられない。検証できない条約は願い事だ。", m: ['rename'] },
                { en: "No one disarms first while the rival might cheat. Every talk dies on that suspicion.", ja: "相手がごまかすかもしれない状況で、先に武装解除する国はない。どの交渉もその疑いの上で死ぬ。", m: ['trust-infra'] },
                { en: "Cut the numbers, yes. Zero is not a plan I can defend.", ja: "数を減らすのは賛成だ。だがゼロは、俺には擁護できる計画じゃない。", m: ['own-cost', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, aim for the ban, because the record of luck cannot hold forever",
            stanceJa: "禁止を目指すべきだ。運の記録は永遠には続かないから",
            lines: [
                { en: "We banned chemical weapons, and that ban mostly held. So bans are not fantasy.", ja: "化学兵器は禁止して、その禁止はおおむね持ちこたえた。だから禁止は空想じゃない。", m: ['tried'] },
                { en: "South Africa built nuclear weapons and then dismantled them. A whole country walked back through that door.", ja: "南アフリカは核兵器を作り、そして解体した。国が丸ごと、あの扉を引き返した。", m: ['tried', 'picture'] },
                { en: "The stockpiles already fell from about seventy thousand warheads to about twelve thousand. The slope exists.", ja: "備蓄はすでに約七万発から約一万二千発まで落ちた。坂道は実在する。", m: ['one-number'] },
                { en: "Deterrence works right up until the day it does not. After that day, nobody writes the report.", ja: "抑止は、効かなくなるその日まで効く。その日の後には、報告書を書く者がいない。", m: ['undo', 'picture'] },
                { en: "In nineteen sixty-two we came within one decision of that day. Luck is not a policy.", ja: "1962年、俺たちは判断ひとつ分の距離までその日に近づいた。運は政策じゃない。", m: ['tried', 'undo'] },
                { en: "Every other mistake, we get to learn from. This one grades itself only once.", ja: "他のどんな失敗からも、俺たちは学び直せる。これだけは採点が一回きりだ。", m: ['undo', 'land-short'] },
            ],
        },
        no: {
            stance: "No, a real ban is unreachable, so manage the danger instead",
            stanceJa: "本物の禁止には届かない。だから危険を管理する側に立つ",
            lines: [
                { en: "Banned means what? Signed, or verified? Paper bans are easy. Checking is the wall.", ja: "禁止とは何を指す？ 署名か、検証か。紙の禁止は簡単だ。壁は検証のほうにある。", m: ['define'] },
                { en: "Ukraine gave up its warheads in the nineties for paper guarantees. Then it was invaded.", ja: "ウクライナは九十年代、紙の保証と引き換えに核弾頭を手放した。そして侵攻された。", m: ['tried'] },
                { en: "Every leader took notes that day. Keep the bomb, keep your borders. The lesson is priced in.", ja: "あの日、どの指導者もメモを取った。爆弾を持てば国境は守られる。その教訓はもう織り込み済みだ。", m: ['tried', 'counted'] },
                { en: "And since nineteen forty-five, no two nuclear powers have fought a full open war.", ja: "そして1945年以降、核保有国同士が全面戦争をしたことは一度もない。", m: ['tried', 'one-number'] },
                { en: "A ban needs every rival to jump together, blindfolded, holding hands. States do not jump like that.", ja: "禁止には、敵同士が目隠しで手をつないで同時に跳ぶことが要る。国家はそういう跳び方をしない。", m: ['picture', 'trust-infra'] },
                { en: "Fewer weapons, tighter locks, more phones between capitals. That I can build. Zero I cannot.", ja: "兵器は減らす、鍵は固くする、首都間の電話は増やす。それなら作れる。ゼロは作れない。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "You say deterrence keeps the peace. Then should more countries be allowed the bomb?",
                qJa: "抑止が平和を保つと言うなら、もっと多くの国が核を持つべきでは？",
                a: [
                    { en: "No, and I have to own the tension. I am defending a club I refuse to expand.", ja: "ノーだ。そしてこの矛盾は俺が引き受ける。俺は拡大を拒むクラブを擁護している。", m: ['own-cost'] },
                    { en: "Deterrence with two careful players is frightening. With thirty players, some desperate, the arithmetic turns against us.", ja: "慎重な二人での抑止でも怖い。三十人になり、一部が追い詰められていたら、計算は俺たちに牙をむく。", m: ['scale', 'picture'] },
                    { en: "More hands on more triggers means more bad afternoons possible. The odds stack one way only.", ja: "引き金に掛かる手が増えれば、最悪の午後の起こり方も増える。確率は一方向にしか積み上がらない。", m: ['scale', 'land-short'] },
                ],
            },
            {
                q: "If zero is impossible, are you not just accepting a permanent risk of the end of the world?",
                qJa: "ゼロが不可能なら、あなたは世界の終わりのリスクを永久に受け入れているのでは？",
                a: [
                    { en: "Yes. That is exactly the price of my position, and I will not dress it up.", ja: "そうだ。それがまさに俺の立場の値段で、俺はそれを飾らない。", m: ['own-cost'] },
                    { en: "But compare the options. A ban nobody can verify leaves the same bombs, plus more lying.", ja: "ただ選択肢を比べろ。誰も検証できない禁止の下には、同じ爆弾と、今より多い嘘が残る。", m: ['compare'] },
                    { en: "So I take the risk I can manage over the promise I cannot check.", ja: "だから俺は、検証できない約束より、管理できるリスクを取る。", m: ['compare', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "The most successful weapon of the past eighty years is the one nobody fired.",
            ja: "この八十年で最も成功した兵器は、誰も発射しなかった兵器だ。",
            note: "冷たい刃。抑止の核心を rename で一撃。笑わせない、置くだけ。反応が薄ければ That is deterrence in one sentence. と足してそのまま抑止論へ接続する。",
            m: ['rename', 'one-number'],
        },
        cards: [
            "Can nuclear weapons ever be banned worldwide?",
            "Does nuclear deterrence genuinely keep the peace?",
            "Should more nations be permitted to possess nuclear arms?",
            "Will the world ever fully disarm?",
        ],
    },

    // ============================================================
    // 18 制裁という道具
    // ============================================================
    {
        no: 18, id: 'pressure-tools', label: '制裁という道具', en: 'Sanctions And Other Pressure',
        field: 'world',
        owns: '経済制裁・圧力外交の話すべて。制裁の効果、敵対国との対話か孤立か、ボイコットはここが担当',
        sourceDays: [15],
        hook: "So we are really asking whether squeezing a country changes it, or just hurts it. Okay.",
        hookJa: "つまり、国を締め上げればその国は変わるのか、ただ痛むだけなのか、という問いですね。",
        universal: "殴らずに痛みを与えたい。それが制裁だ。だが痛みは狙った階に届かず、たいてい一番下の階で止まる。",
        universalEn: "We want to hurt without hitting. That is a sanction. But the pain rarely reaches the target floor. It stops at the bottom one.",
        angles: [
            { label: '的', en: "Aim at the palace, hit the pharmacy. That is the usual accuracy of a sanction.", ja: "宮殿を狙って薬局に当たる。それが制裁の平均的な命中精度だ。" },
            { label: '台帳', en: "Cuba, over sixty years. North Korea, decades. The trophy case is thin.", ja: "キューバは六十年超、北朝鮮は数十年。トロフィーの棚は薄い。" },
            { label: '代替', en: "The realistic menu is sanctions, war, or nothing. Judge the tool against that menu.", ja: "現実のメニューは、制裁か、戦争か、何もしないか。道具はそのメニューと比べて採点しろ。" },
            { label: '出口', en: "Pressure without a door is a siege. The target digs in and blames you for the shovel.", ja: "出口のない圧力は籠城戦だ。相手は掘って耐え、シャベルの分までこっちを恨む。" },
        ],
        origin: {
            day: 15, essay: "No. Economic sanctions are not a genuinely useful foreign-policy tool.",
            stance: "The pain lands on the wrong people and the target rarely moves",
            stanceJa: "痛みは違う人間に落ち、標的はめったに動かない",
            lines: [
                { en: "Sanctions punish the wrong floor of the building. The palace eats. The street queues.", ja: "制裁はビルの違う階を罰する。宮殿は食い、通りは配給に並ぶ。", m: ['who-pays', 'picture'] },
                { en: "Cuba has been under sanctions for over sixty years. Same party still runs it.", ja: "キューバは六十年以上制裁下にある。今も同じ党が国を回している。", m: ['tried', 'one-number'] },
                { en: "Targets find other buyers. The pressure leaks, and the years just pass.", ja: "標的は別の買い手を見つける。圧力は漏れ、年月だけが過ぎる。", m: ['tried'] },
                { en: "Worse, squeezing a country can push it into your rival's arms. The tool recruits for the other team.", ja: "まずいことに、締め上げた国は敵側の腕の中へ押し出されうる。この道具は相手チームの勧誘係になる。", m: ['picture', 'rename'] },
                { en: "Less destructive than war, sure. That is a low bar, not a success.", ja: "戦争より破壊的でないのは確かだ。それは低いハードルであって、成功じゃない。", m: ['compare', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, they work as a price, not as a magic switch",
            stanceJa: "効く。魔法のスイッチとしてではなく、値札として",
            lines: [
                { en: "Compared to what? The real menu is sanctions, war, or a strongly worded letter.", ja: "何と比べて？ 現実のメニューは制裁か、戦争か、強い言葉の手紙だ。", m: ['compare', 'picture'] },
                { en: "South Africa felt the squeeze, and apartheid ended. Pressure was part of that story.", ja: "南アフリカは締め付けを浴び、アパルトヘイトは終わった。圧力はあの物語の一部だった。", m: ['tried'] },
                { en: "Sanctions also slow the target down. A weapons program built on smuggled parts moves at half speed.", ja: "制裁は標的の速度も落とす。密輸部品で組む兵器計画は半分の速さでしか進まない。", m: ['picture'] },
                { en: "And doing nothing sends a message too. It says the rules are decoration.", ja: "それに、何もしないこともメッセージになる。ルールは飾りだ、というメッセージに。", m: ['rename', 'echo'] },
                { en: "The goal is not always to topple the regime. It is to raise the price of the next bad idea.", ja: "目的はいつも政権転覆じゃない。次の悪い思いつきの値段を上げることだ。", m: ['rename'] },
                { en: "A sanction is a tax on bad behaviour. Taxes stop nothing completely. They still shape everything.", ja: "制裁は悪行への課税だ。税は何も完全には止めない。それでもすべての形を変える。", m: ['rename', 'land-short'] },
            ],
        },
        no: {
            stance: "No, the record is thin and the side effects are the real product",
            stanceJa: "効かない。実績は薄く、副作用のほうが主産物だ",
            lines: [
                { en: "Show me the trophy case. North Korea was sanctioned for decades and built the bomb anyway.", ja: "トロフィーの棚を見せてくれ。北朝鮮は数十年制裁されて、それでも爆弾を作った。", m: ['tried'] },
                { en: "The pain hits the shopper, not the general. Shortages queue outside apartments, not palaces.", ja: "痛みは将軍ではなく買い物客に当たる。物不足の列ができるのはアパートの前で、宮殿の前じゃない。", m: ['who-pays', 'picture'] },
                { en: "The regime even gets a gift: a foreign enemy to blame for every empty shelf.", ja: "政権は贈り物までもらう。空っぽの棚を全部なすりつけられる、外国の敵という贈り物を。", m: ['rename', 'picture'] },
                { en: "And the leaks are structural. There is always another port, another flag, another middleman.", ja: "しかも漏れは構造的だ。別の港、別の船籍、別の仲介人が必ずいる。", m: ['echo'] },
                { en: "Isolation freezes a country. Frozen things do not change. They just wait.", ja: "孤立は国を凍らせる。凍ったものは変わらない。ただ待つだけだ。", m: ['picture', 'echo'] },
                { en: "If change is the goal, contact beats quarantine. Pressure feels strong. Feelings are not results.", ja: "変化が目的なら、接触は隔離に勝る。圧力は強そうに感じる。感じは結果じゃない。", m: ['feel-vs-fact', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "So when a country invades its neighbour, we should just keep trading with it as usual?",
                qJa: "では隣国を侵略した国とも、普段どおり貿易を続けろと？",
                a: [
                    { en: "No. Some acts demand an answer, and I admit my side looks soft right here.", ja: "違う。答えを返すべき行為はある。ここで俺の側が甘く見えることは認める。", m: ['own-cost', 'concede-pivot'] },
                    { en: "So aim the tool. Hit the weapons, the banks, the elite's travel. The top floor, not the bread line.", ja: "だから道具の狙いを絞れ。兵器、銀行、上層部の渡航を叩く。最上階であって、パンの行列じゃない。", m: ['who-pays', 'picture'] },
                    { en: "Narrow and enforced beats broad and leaky. I want a scalpel, not a siege.", ja: "狭くて厳格は、広くて漏れるに勝る。欲しいのはメスであって、籠城戦じゃない。", m: ['rename', 'land-short'] },
                ],
            },
            {
                q: "Talking to dictators rewards them. Does dialogue not legitimize the regime?",
                qJa: "独裁者と話すことは褒美になる。対話は政権にお墨付きを与えないか？",
                a: [
                    { en: "That cost is real. A handshake photo is a trophy for them, and I hand it over.", ja: "その代償は本物だ。握手の写真は連中のトロフィーで、俺はそれを手渡すことになる。", m: ['own-cost'] },
                    { en: "But rivals talked all through the Cold War, hotline and all. Talking is not blessing.", ja: "だが冷戦の間じゅう、敵同士はホットラインまで引いて話し続けた。話すことは祝福することじゃない。", m: ['tried', 'rename'] },
                    { en: "You make peace with enemies. Friends never needed the meeting.", ja: "和平は敵と結ぶものだ。友達には、そもそもその会談が要らない。", m: ['echo', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "I boycott companies all the time. Usually until I need something they sell. Nations shop the same way.",
            ja: "俺もしょっちゅう企業をボイコットしてる。だいたい、そこの商品が必要になるまでだけど。国も同じ買い物の仕方をする。",
            note: "self-joke型。先に自分のボイコットの根性のなさを差し出してから、制裁の「漏れ」の構造話へ接続する。滑ったら Which is the whole problem with pressure. と足して次へ。",
            m: ['self-joke', 'picture'],
        },
        cards: [
            "Are economic sanctions an effective foreign-policy tool?",
            "Should democratic nations negotiate with hostile regimes?",
            "Can isolating a country change its behaviour?",
            "Do consumer boycotts achieve real change?",
        ],
    },

    // ============================================================
    // 19 同盟と隣人
    // ============================================================
    {
        no: 19, id: 'friends-allies', label: '同盟と隣人', en: 'Allies And Neighbours',
        field: 'world',
        owns: '同盟・近隣外交・中立の話すべて。同盟の見直し、隣国優先、ライバル国との協力、中立の現実性はここが担当',
        sourceDays: [17, 22],
        hook: "So we are really asking who you want beside you on a bad day. Okay.",
        hookJa: "つまり、最悪の日に隣に立っていてほしいのは誰か、という問いですね。",
        universal: "国も人と同じで、友達は保険で、隣人は運命だ。保険は選べるが、住所は選べない。",
        universalEn: "Nations are like people. Friends are insurance and neighbours are fate. You choose your insurance. You do not choose your address.",
        angles: [
            { label: '保険', en: "An alliance is insurance. Premiums monthly, payout uncertain, cancellation terrifying.", ja: "同盟は保険だ。掛金は毎月、支払いは不確実、解約は恐怖。" },
            { label: '住所', en: "You can change friends. You cannot change latitude. The neighbours were assigned.", ja: "友達は替えられる。緯度は替えられない。隣人は配られた手札だ。" },
            { label: '前例', en: "Sweden and Finland dropped generations of neutrality in about a year. Weather changes minds.", ja: "スウェーデンとフィンランドは、何世代分もの中立を一年ほどで捨てた。天候は考えを変える。" },
            { label: '費用', en: "Full independence in defence costs a fortune and frightens the very street you live on.", ja: "防衛の完全自立は大金がかかり、しかも自分の住む通りそのものを怯えさせる。" },
        ],
        origin: {
            day: 17, essay: "Day 17: put ties with Asian neighbours first. Day 22: keep the existing alliance. Blended: keep both.",
            stance: "Keep the alliance and fix the neighbourhood. It was never either-or",
            stanceJa: "同盟は保ち、近所は直す。最初から二択じゃない",
            lines: [
                { en: "People frame this as a choice: the big ally or the neighbours. I refuse the choice.", ja: "みんなこれを二択にする。大きな同盟国か、隣人か。俺はその二択を拒否する。", m: ['reframe', 'both-true'] },
                { en: "The alliance is the roof. You do not tear off the roof to repaint the fence.", ja: "同盟は屋根だ。塀を塗り直すために屋根を剥がす奴はいない。", m: ['picture'] },
                { en: "But the neighbours are the street you live on. The fastest growing markets, and the oldest grudges, both next door.", ja: "ただ、隣人は自分の住む通りだ。最速で伸びる市場も、最古の恨みも、どちらも隣にある。", m: ['both-true', 'picture'] },
                { en: "And shared problems do not check passports. Climate, pandemics, fish stocks. Nobody solves those alone.", ja: "しかも共通の問題はパスポートを確認しない。気候、感染症、魚の資源。どれも単独では解けない。", m: ['echo', 'picture'] },
                { en: "Keep the roof. Fix the street. Do both, every year.", ja: "屋根は保つ。通りは直す。両方を、毎年やる。", m: ['both-true', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, rethink it: leaning on one giant is a risk, and the future lives next door",
            stanceJa: "見直すべきだ。一つの巨人に寄りかかるのはリスクで、未来は隣に住んでいる",
            lines: [
                { en: "Any plan that depends on one friend is a hostage situation with better catering.", ja: "友達一人に依存する計画は、食事が豪華なだけの人質事件だ。", m: ['rename'] },
                { en: "Allies change governments. One election far away can reprice your whole security.", ja: "同盟国では政権が替わる。遠くの選挙ひとつで、こちらの安全保障の値段が全部書き換わる。", m: ['switch', 'picture'] },
                { en: "The neighbours, meanwhile, are permanent. You can pick your friends. You cannot pick your street.", ja: "一方で隣人は永続だ。友達は選べる。通りは選べない。", m: ['echo', 'picture'] },
                { en: "Follow the trade numbers. They already point next door, whatever the speeches say.", ja: "貿易の数字を追え。演説が何を言おうと、数字はもう隣を指している。", m: ['counted', 'feel-vs-fact'] },
                { en: "Full dependence also freezes you. You never learn to lock your own door.", ja: "全面依存はこちらを凍らせもする。自分の家の鍵のかけ方を、いつまでも覚えない。", m: ['picture'] },
                { en: "Diversify like an investor. One stock is not a portfolio. One ally is not a strategy.", ja: "投資家のように分散しろ。一銘柄はポートフォリオじゃない。一同盟は戦略じゃない。", m: ['echo', 'compare', 'land-short'] },
            ],
        },
        no: {
            stance: "No, keep the alliance central: it is tested, and every alternative costs more",
            stanceJa: "見直し不要。同盟は実証済みで、どの代替案も高くつく",
            lines: [
                { en: "Compared to what? Show me the replacement umbrella before I fold this one.", ja: "何と比べて？ この傘を畳む前に、代わりの傘を見せてくれ。", m: ['compare'] },
                { en: "The alliance has held for about seventy years, through every government on both sides. That is a tested machine.", ja: "この同盟は約七十年、両国のあらゆる政権をまたいで持ちこたえた。実地試験済みの機械だ。", m: ['tried', 'one-number'] },
                { en: "Sweden and Finland were neutral for generations. One nearby war, and both joined the club.", ja: "スウェーデンとフィンランドは何世代も中立だった。近くで戦争がひとつ起き、両国ともクラブに入った。", m: ['tried'] },
                { en: "Building a full defence alone costs a fortune and scares the same neighbours you want to charm.", ja: "単独でのフル防衛は大金がかかり、しかも仲良くしたい当の隣人を怯えさせる。", m: ['who-pays', 'both-true'] },
                { en: "And shared values are not decoration. You coordinate faster with people who read the same rulebook.", ja: "それに共有する価値観は飾りじゃない。同じルールブックを読む相手とは、連携が速い。", m: ['trust-infra'] },
                { en: "Fix the friction inside the house. Do not burn it down to check the wiring.", ja: "摩擦は家の中で直せ。配線を確かめるために家を燃やすな。", m: ['picture', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "Can rivals with a bloody shared history genuinely cooperate, or is that naive?",
                qJa: "血の歴史を共有するライバル同士が本当に協力できるのか。甘い考えでは？",
                a: [
                    { en: "The grudges are real, and my plan pays a price to them every single year.", ja: "恨みは本物だ。そして俺の計画は、毎年その恨みに通行料を払い続ける。", m: ['own-cost'] },
                    { en: "But enemies with worse ledgers have managed it. Trade first, apologies later, textbooks last.", ja: "だが、もっとひどい帳簿を抱えた敵同士がやってのけた。まず貿易、謝罪は後、教科書は最後だ。", m: ['tried', 'echo'] },
                    { en: "Cooperation does not need love. It needs invoices both sides want paid.", ja: "協力に愛は要らない。両方が回収したい請求書があればいい。", m: ['rename', 'land-short'] },
                ],
            },
            {
                q: "Is neutrality not the safest path? Just stay out of everyone's fights.",
                qJa: "中立が一番安全では？ 誰の喧嘩にも関わらなければいい",
                a: [
                    { en: "Fair, and here is my side's bill: alliances can drag you into fights you did not pick.", ja: "一理ある。そして俺の側の請求書はこれだ。同盟は、自分で選んでいない喧嘩に引きずり込みうる。", m: ['own-cost', 'concede-pivot'] },
                    { en: "But neutrality only works if geography cooperates. Ask the neutrals who got marched through anyway.", ja: "だが中立は地理が味方して初めて成立する。それでも軍隊に通り抜けられた中立国に聞いてみろ。", m: ['tried', 'picture'] },
                    { en: "Neutral is not invisible. It is just alone on the day it matters.", ja: "中立は透明人間じゃない。肝心の日に、ただ独りなだけだ。", m: ['rename', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "An alliance is a marriage where both sides keep complaining and neither checks the price of divorce.",
            ja: "同盟は結婚みたいなものだ。両方が文句を言い続けて、どちらも離婚の値段は調べない。",
            note: "rename型。同盟の話は理屈が乾きがちなので生活の絵に落とす。笑いが薄ければ The price is high, by the way. と足して、防衛コストの本題へ戻る。",
            m: ['rename', 'picture'],
        },
        cards: [
            "Should a nation give priority to ties with its neighbours?",
            "Should long-standing alliances be reconsidered?",
            "Can rival nations build genuine cooperation?",
            "Is neutrality a realistic option in today's world?",
        ],
    },

    // ============================================================
    // 20 民主主義
    // ============================================================
    {
        no: 20, id: 'rule-by-people', label: '民主主義', en: 'Rule By The People',
        field: 'power',
        owns: '民主主義そのものの話すべて。輸出の是非、投票の義務化、選挙権年齢、制度として最良かはここが担当',
        sourceDays: [25],
        hook: "So we are really asking whether the least bad system is still good enough. Okay.",
        hookJa: "つまり、「一番マシな制度」は今でも十分マシなのか、という問いですね。",
        universal: "民主主義の自慢は、正しい答えを出すことじゃなかった。間違えたときに血を流さずやり直せることだった。その自慢が今、試されている。",
        universalEn: "Democracy's boast was never getting it right. It was undoing a mistake without blood. That boast is now being tested.",
        angles: [
            { label: '交代', en: "The rare feature is not choosing leaders. It is removing them without blood.", ja: "珍しい機能は指導者を選べることじゃない。血を流さずに退場させられることだ。" },
            { label: '時計', en: "Four-year terms, thirty-year problems. The clock is the design flaw.", ja: "任期は四年、問題は三十年。設計上の欠陥はこの時計だ。" },
            { label: '輸出', en: "Grown at home over centuries. Shipped abroad, it keeps arriving broken.", ja: "国内で何世紀もかけて育つ。輸出すると、なぜか毎回壊れて届く。" },
            { label: '信頼', en: "The machine tolerates losing only because losers trust the next round. Kill that trust, kill the machine.", ja: "敗者が次の回を信じるから、この機械は負けに耐えられる。その信頼が死ねば機械も死ぬ。" },
        ],
        origin: {
            day: 25, essay: "No. Democracies should not actively promote democracy abroad.",
            stance: "Love the product, distrust the export department",
            stanceJa: "製品は愛している。輸出部門を信用していない",
            lines: [
                { en: "I love the product. I distrust the export department.", ja: "製品は愛してる。輸出部門を信用していない。", m: ['rename', 'echo'] },
                { en: "Iraq got ballot boxes delivered by tank in two thousand three. The boxes worked. The country did not.", ja: "2003年、イラクには戦車で投票箱が届けられた。箱は機能した。国は機能しなかった。", m: ['tried', 'echo'] },
                { en: "A lecture from abroad is a gift to the dictator. He gets an enemy for free.", ja: "外国からの説教は独裁者への贈り物だ。タダで敵役が手に入る。", m: ['rename', 'picture'] },
                { en: "And the money burns abroad while problems queue at home.", ja: "そして国内で問題が列を作っている間に、金は海外で燃える。", m: ['who-pays'] },
                { en: "Live it well here. The best advertisement does not knock on doors.", ja: "まずここで上手にやってみせろ。最高の広告は、家のドアを叩かない。", m: ['picture', 'land-short'] },
            ],
        },
        yes: {
            stance: "Yes, still the best system, because it alone can correct itself",
            stanceJa: "今なお最良だ。自分で自分を修正できる唯一の制度だから",
            lines: [
                { en: "Compared to what, though? Show me the better system with a working example.", ja: "とはいえ、何と比べて？ 動いている実例つきで、もっと良い制度を見せてくれ。", m: ['compare', 'tried'] },
                { en: "Autocracy works until the leader believes his own posters. Then nobody is allowed to say stop.", ja: "独裁は、指導者が自分のポスターを信じ始めるまでは機能する。その先は、誰も「やめろ」と言えない。", m: ['picture'] },
                { en: "Democracy's superpower is boring: it removes bad rulers without blood. No other system has that button.", ja: "民主主義の必殺技は地味だ。血を流さずに悪い支配者を外せる。あのボタンは他の制度に付いていない。", m: ['rename'] },
                { en: "Yes, it is slow and loud and often embarrassing. That is the sound of correction happening.", ja: "確かに遅いし、うるさいし、しばしばみっともない。あれは修正が起きている音だ。", m: ['concede-pivot', 'rename'] },
                { en: "And famines, by the record, happen under censors, not under free newspapers.", ja: "それに記録の上で、飢饉は検閲官の下で起きる。自由な新聞の下では起きていない。", m: ['tried', 'feel-vs-fact'] },
                { en: "An old prime minister called it the worst system, apart from all the rest. Still true.", ja: "昔のある首相はこれを「最悪の制度だ、他の全部を除けば」と呼んだ。今でも正しい。", m: ['compare', 'land-short'] },
            ],
        },
        no: {
            stance: "No longer obvious: the machine is jamming on its own trust and its own clock",
            stanceJa: "もう自明じゃない。この機械は自前の信頼と自前の時計で詰まりかけている",
            lines: [
                { en: "The brochure and the building are different things. Walk into the building.", ja: "パンフレットと建物は別物だ。建物のほうに入ってみろ。", m: ['rename', 'picture'] },
                { en: "Elections reward the best performer, not the best planner. The show improved. The governing did not.", ja: "選挙は最高の演者に報酬を出す。最高の設計者にではない。ショーは良くなった。統治は良くなっていない。", m: ['counted', 'echo'] },
                { en: "A four-year clock cannot fix thirty-year problems. Climate, pensions, debt all outlive the term.", ja: "四年の時計では三十年の問題は直せない。気候も年金も借金も、任期より長生きする。", m: ['future-bill', 'picture'] },
                { en: "Rivals became enemies inside the same country. This machine runs on trust, and trust is leaking.", ja: "同じ国の中で、対戦相手が敵になった。この機械は信頼で動く。その信頼が漏れている。", m: ['trust-infra'] },
                { en: "Meanwhile some autocracies build a subway while we hold hearings about the hearing.", ja: "その間に一部の独裁国は地下鉄を作る。こちらは公聴会についての公聴会を開いている。", m: ['picture', 'compare'] },
                { en: "I am not selling a replacement. I am reading the warning lights.", ja: "代わりの制度を売る気はない。警告灯を読み上げているだけだ。", m: ['own-cost', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "If you refuse to promote democracy abroad, do you just watch dictatorships jail people?",
                qJa: "海外への民主主義の推進を拒むなら、独裁国が人を投獄するのをただ見ているのか？",
                a: [
                    { en: "That is the ugliest corner of my position. People sit in cells while I preach patience.", ja: "そこが俺の立場の一番醜い角だ。俺が忍耐を説いている間、人は監房に座っている。", m: ['own-cost'] },
                    { en: "But invasions in democracy's name filled more cells than they emptied. The cure kept spreading the disease.", ja: "だが民主主義の名の侵攻は、空けた監房より埋めた監房のほうが多かった。治療薬が病気をまき続けた。", m: ['tried', 'echo'] },
                    { en: "So back the prisoners, not the invasion. Open doors beat marching orders.", ja: "だから支援するのは囚人であって、侵攻じゃない。開いた扉は進軍命令に勝る。", m: ['echo', 'land-short'] },
                ],
            },
            {
                q: "If turnout keeps falling, should voting be made compulsory?",
                qJa: "投票率が下がり続けるなら、投票を義務化すべきか？",
                a: [
                    { en: "Australia tried it. Turnout sits near ninety percent, and the sky stayed up.", ja: "オーストラリアが試した。投票率は九十パーセント近辺で、空は落ちてこなかった。", m: ['tried', 'one-number'] },
                    { en: "Still, a forced voice is a strange kind of freedom, and I feel that cost.", ja: "それでも、強制された声は奇妙な自由だ。その代償は俺も感じている。", m: ['own-cost'] },
                    { en: "A vote is a muscle. Muscles you never use stop being muscles.", ja: "票は筋肉だ。一度も使わない筋肉は、筋肉であることをやめる。", m: ['picture', 'land-short'] },
                ],
            },
        ],
        joke: {
            en: "I rage at politicians every day. Last local election, it rained, so I stayed home. The system's main bug has my name on it.",
            ja: "毎日政治家に怒ってる。なのにこの前の地方選は、雨だったから家にいた。このシステム最大のバグには俺の名前が書いてある。",
            note: "self-joke型。民主主義批判は説教になりやすいので、先に刃を自分に向けてから制度の話へ入る。滑ったら Compulsory voting suddenly sounds reasonable. と足して義務投票の論点へ接続。",
            m: ['self-joke', 'rename'],
        },
        cards: [
            "Should democratic countries encourage democracy in other nations?",
            "Should citizens be required by law to vote?",
            "Should the voting age be lowered?",
            "Is democracy still the best form of government?",
        ],
    },
];
