/**
 * THEME 30 -- テーマ22(見本)。
 * このファイルが全テーマの品質基準。行のムーブタグ、数字の丸め方、
 * yes/no の対立のさせ方、deeper での代償の認め方、全部ここに合わせる。
 */

import type { Theme } from './eiken-theme30-types';

export const THEMES_D: Theme[] = [
    {
        no: 22, id: 'top-pay', label: '上の取り分', en: 'What The Top Gets Paid',
        field: 'money',
        owns: '報酬・富の上限の話すべて。CEO報酬、富裕税、相続、選手の年俸。「多すぎる」と感じる金の話はここが担当',
        sourceDays: [8],
        hook: "So we are really asking whether anyone can be worth that much. Okay.",
        hookJa: "つまり、人間一人にその値段が付くことがあり得るのか、という問いですね。",
        universal: "誰も自分の給料は高すぎると思わない。多すぎるのはいつも他人の取り分だ。そして「いくらなら妥当か」に答えられる人は、実はどちらの側にもいない。",
        universalEn: "Nobody thinks their own pay is too high. The excess is always somebody else's. And neither side can actually name the right number.",
        angles: [
            { label: '市場', en: "If the board pays it and the shareholders keep him, somebody thinks it is worth it.", ja: "取締役会が払い、株主が据え置くなら、誰かは見合うと思っている。" },
            { label: '倍率', en: "The boss made twenty times the worker in nineteen sixty-five. Now it is closer to three hundred.", ja: "1965年、社長は労働者の20倍だった。今は300倍に近い。" },
            { label: '機能', en: "Ask what the money is for. Past a point, it stops buying effort and starts buying scoreboard.", ja: "その金が何のためかを問え。ある点を超えると、努力ではなく順位表を買い始める。" },
            { label: '自分', en: "Everyone is against high pay until the offer letter has their name on it.", ja: "誰もが高額報酬に反対だ。内定通知に自分の名前が載るまでは。" },
        ],
        origin: {
            day: 8, essay: "Yes. Welfare programs reduce inequality.",
            stance: "The floor matters more than the ceiling",
            stanceJa: "天井より床のほうが大事",
            lines: [
                { en: "Honestly, I care less about the top of the ladder than the bottom.", ja: "正直、梯子のてっぺんより底のほうが気になる。", m: ['reframe'] },
                { en: "Welfare gets called waste, but the numbers keep saying otherwise.", ja: "福祉は無駄と呼ばれるが、数字はずっと逆を言っている。", m: ['feel-vs-fact'] },
                { en: "Pensions alone pull a huge share of old people out of poverty. That is not charity. That is the system working.", ja: "年金だけで、膨大な数の高齢者が貧困から引き上げられている。慈善じゃない。制度が機能しているということだ。", m: ['rename', 'one-number'] },
                { en: "A child who eats at school learns. A family with a floor takes risks, starts things.", ja: "学校で食える子は学ぶ。床のある家族は危険を取れる。何かを始められる。", m: ['echo', 'picture'] },
                { en: "So if inequality is the worry, fix the floor first. The ceiling can wait.", ja: "だから格差が心配なら、まず床を直せ。天井は待てる。", m: ['land-short'] },
            ],
        },
        yes: {
            stance: "Yes, it can be warranted, and the envy argument fails",
            stanceJa: "正当化されうる。嫉妬の議論は成立しない",
            lines: [
                { en: "I will take the unpopular side. Sometimes the number is right.", ja: "不人気な側に立とう。あの数字が正しいこともある。", m: ['own-cost'] },
                { en: "A company of three hundred thousand people is a mid-sized city. Somebody has to run the city.", ja: "従業員30万の会社は中規模都市だ。誰かがその都市を運営しないといけない。", m: ['picture'] },
                { en: "One good call at that size is worth billions. One bad call took Nokia from king to case study in about five years.", ja: "その規模では良い判断ひとつが数十億の価値を持つ。悪い判断ひとつは、ノキアを王者から教材へ、五年ほどで変えた。", m: ['tried', 'one-number'] },
                { en: "So the pay is not for the hours. Nobody works three hundred times harder. It is for the decisions.", ja: "だから報酬は労働時間への支払いじゃない。誰も300倍働いてはいない。判断への支払いだ。", m: ['concede-pivot', 'rename'] },
                { en: "And notice nobody makes this complaint about athletes. A striker earns a village and we cheer.", ja: "それに、この文句をスポーツ選手には誰も言わない。ストライカーは村ひとつ分稼ぎ、我々は喝采する。", m: ['compare'] },
                { en: "If the market is allowed to price a foot, it is allowed to price a judgment.", ja: "市場が足に値段を付けていいなら、判断に値段を付けてもいい。", m: ['land-short', 'echo'] },
            ],
        },
        no: {
            stance: "No, because the market story breaks exactly at the top",
            stanceJa: "正当化されない。市場の理屈がちょうど頂上で壊れているから",
            lines: [
                { en: "Here is my problem. The market defence assumes somebody is actually negotiating.", ja: "引っかかるのはここだ。市場による擁護は、誰かが実際に交渉していることを前提にしている。", m: ['reframe'] },
                { en: "But the board that sets the pay is picked by the man being paid. Friends setting a friend's salary.", ja: "だが報酬を決める取締役会は、報酬を受け取る本人が選んでいる。友人が友人の給料を決めている。", m: ['counted', 'picture'] },
                { en: "Every company benchmarks against the others, and nobody wants a below-average boss. So the average only moves one way.", ja: "各社は他社と比較し、誰も平均以下の社長は欲しくない。だから平均は一方向にしか動かない。", m: ['counted'] },
                { en: "The boss made twenty times the worker in the sixties. Now close to three hundred. Did the job get fifteen times harder? The workers' job did not get easier.", ja: "60年代、社長は労働者の20倍だった。今は300倍近い。仕事が15倍難しくなったのか？ 労働者の仕事は楽になっていない。", m: ['one-number', 'echo'] },
                { en: "And when the bet fails, the parachute opens anyway. Reward without risk is not a market. It is a members' club.", ja: "しかも賭けが外れても、パラシュートは開く。リスクなき報酬は市場じゃない。会員制クラブだ。", m: ['rename'] },
                { en: "Pay for performance. I am fine with that. This is pay instead of performance.", ja: "成果への報酬。それは構わない。これは成果の代わりの報酬だ。", m: ['echo', 'land-short'] },
            ],
        },
        deeper: [
            {
                q: "If we cap pay here, will the talent not just leave the country?",
                qJa: "ここで報酬に蓋をすれば、人材は国外へ出ていくだけでは",
                a: [
                    { en: "Some would, and that is a real cost. I am not going to pretend it away.", ja: "一部は出ていく。それは本物の代償だ。無かったふりはしない。", m: ['own-cost'] },
                    { en: "But we ran this experiment. Japanese executives earn a fraction of American ones, and the companies still run.", ja: "ただ、この実験はもう走っている。日本の経営者の報酬はアメリカの何分の一かで、会社は普通に回っている。", m: ['tried'] },
                    { en: "So the question is not whether talent moves. It is how much of the number was talent, and how much was the club.", ja: "だから問いは人材が動くかどうかじゃない。あの数字のうちどれだけが才能で、どれだけがクラブの会費だったか、だ。", m: ['reframe', 'rename'] },
                ],
            },
            {
                q: "Who decides what is too much? Is that not arbitrary?",
                qJa: "いくらからが多すぎるのか、誰が決める？ 恣意的では",
                a: [
                    { en: "Fair. Any line we draw is arbitrary. Twenty times, fifty times, there is no magic number.", ja: "もっともだ。どこに引いても線は恣意的になる。20倍でも50倍でも、魔法の数字はない。", m: ['concede-pivot', 'own-cost'] },
                    { en: "But we draw arbitrary lines all day. A speed limit is arbitrary. Nobody concludes we should drive at any speed.", ja: "ただ、恣意的な線は一日中引いている。制限速度も恣意的だ。だから何キロで走ってもいい、とはならない。", m: ['compare', 'picture'] },
                    { en: "I do not need the perfect number. I need the ratio published, every year, next to the profits. Sunlight does the rest.", ja: "完璧な数字は要らない。倍率を毎年、利益の隣に公表させればいい。あとは日光がやってくれる。", m: ['land-short'] },
                ],
            },
        ],
        joke: {
            en: "The pay is called an incentive. He already owns three houses. The only thing left to incentivize is a fourth house.",
            ja: "あの報酬はインセンティブと呼ばれている。本人はもう家を三軒持っている。あと動機づけできるのは四軒目だけだ。",
            note: "「機能を失った金」を絵で見せる型。renameの応用。富裕層のお題は嫉妬に聞こえると負けなので、怒りではなく可笑しさで撃つ。滑ったら Which, to be fair, is a nice house. と足して次へ。",
            m: ['rename', 'picture'],
        },
        cards: [
            "Are the high compensation packages for CEOs at large corporations warranted?",
            "Should there be a maximum wage as well as a minimum?",
            "Should the wealthy be taxed far more heavily?",
            "Are professional athletes paid too much?",
        ],
    },
];
