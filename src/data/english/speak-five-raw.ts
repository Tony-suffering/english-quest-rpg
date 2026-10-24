/**
 * SPEAK 5 — 生の英語版。10テーマのスピーチを、本人のトレーニングカードのうち「答案っぽくない」文だけで組んだもの。
 *
 * - JRE・コメディ・ドラマ(町の人のセリフ)・講師の発話・本人の発話から取る。模範解答の書き取り、First, / In conclusion / Admittedly で始まる文は使わない(verify が落とす)
 * - 本文の行はすべてカード。各行に出典(カード ID・登録日・カードの元の文)。exact / trim / slot はカード版と同じ
 * - つなぎ(kind: bridge)は自作の文。ギャグのカードの直後に置き、なぜ問いの答えになるかを言う
 * - 枠(kind: frame)は立場の1文と道しるべ(Three things: ... / First, money. / Second, time. / But here's the big one: X.)だけ
 * - 締めは本人の発話 AIHwnhS3(So, to sum up my take on this:)の語を差し替えたもの
 * - 自作版(speak-five.ts)とカード版(speak-five-cards.ts)はそのまま残す。こちらは3つ目の版
 *
 * 生成: scratchpad の gen-raw.cjs が D1 の全カードと突き合わせて書き出した(手で直さない)
 * 検査: scripts/verify-speak-five.cjs
 */

import type { CardSpeech } from './speak-five-cards';

export const RAW_SPEECHES: Record<string, CardSpeech> = {
    "wealth-cap": {
        "open": [
            {
                "kind": "frame",
                "en": "I don't think governments should cap how rich a person can get.",
                "ja": "政府が、人がどこまで金持ちになれるかに上限を設けるべきだとは思わない。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, trust.",
                "ja": "3つ。お金、時間、そして何より信頼。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "bridge",
                "en": "A cap sounds like a way to make the rich give back. The problem is, the rich are very good at not giving back.",
                "ja": "上限は、金持ちに還元させる方法に聞こえる。問題は、金持ちは還元しないのがとてもうまいことだ。"
            },
            {
                "kind": "card",
                "en": "Mr Burns says he'll donate a million dollars to charity when pigs fly.",
                "ja": "バーンズ氏いわく、ブタが空を飛んだら慈善団体に100万ドル寄付するそうだ。",
                "mode": "exact",
                "card": {
                    "id": "rOuz1RNX",
                    "date": "2026-02-17",
                    "text": "Mr Burns says he'll donate a million dollars to charity when pigs fly."
                }
            },
            {
                "kind": "bridge",
                "en": "Put a cap on people like that, and they won't hand the money over. They'll move it, and themselves, somewhere else.",
                "ja": "ああいう人に上限をかけても、金は差し出さない。金も自分も、よそへ移すだけだ。"
            },
            {
                "kind": "card",
                "en": "If there's a wealth cap, won't talented entrepreneurs move to other countries?",
                "ja": "富に上限があれば、有能な起業家は他の国へ移るのでは?",
                "mode": "trim",
                "card": {
                    "id": "9N5klhk4",
                    "date": "2026-10-20",
                    "text": "It asked, If there's a wealth cap, won't talented entrepreneurs move to other countries?"
                }
            },
            {
                "kind": "bridge",
                "en": "Then the cap collects almost nothing, and the country loses the taxes and jobs those people used to bring.",
                "ja": "そうなると上限はほとんど何も集められず、国はその人たちが持ってきた税金と仕事を失う。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "bridge",
                "en": "A cap also punishes the slow, boring way of getting rich, which is usually the honest way.",
                "ja": "上限は、地味で時間のかかる金持ちへの道も罰する。それはたいてい正直な道だ。"
            },
            {
                "kind": "card",
                "en": "Building wealth takes decades — there's no shortcut, just consistency and compound interest.",
                "ja": "富を築くには何十年もかかる。近道は無い。続けることと複利だけだ。",
                "mode": "exact",
                "card": {
                    "id": "wteizvUx",
                    "date": "2026-05-20",
                    "text": "Building wealth takes decades — there's no shortcut, just consistency and compound interest."
                }
            },
            {
                "kind": "card",
                "en": "I'll take boring and rich over fancy and broke any day.",
                "ja": "派手で文無しより、退屈で金持ちの方をいつでも選ぶ。",
                "mode": "trim",
                "card": {
                    "id": "C1MNF_7n",
                    "date": "2026-05-20",
                    "text": "I'll take boring and rich over fancy and broke any day."
                }
            },
            {
                "kind": "bridge",
                "en": "If the government caps the reward at the end, fewer people will choose boring and patient, and more people will gamble or give up.",
                "ja": "最後の見返りに政府が上限をつければ、地味で辛抱強い道を選ぶ人は減り、賭けに出るかあきらめる人が増える。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: trust.",
                "ja": "でも本題はここ。信頼だ。"
            },
            {
                "kind": "bridge",
                "en": "And who would collect the money above the cap? The government. That is exactly where my trust runs out.",
                "ja": "そして上限を超えた金を集めるのは誰か。政府だ。私の信頼が尽きるのはまさにそこだ。",
                "expr": "run out",
                "note": "尽きる、なくなる。trust runs out / time runs out。"
            },
            {
                "kind": "card",
                "en": "The money vanishes into shady administrative costs and Swiss bank accounts.",
                "ja": "金は、怪しい事務経費とスイスの銀行口座に消える。",
                "mode": "exact",
                "card": {
                    "id": "YM5aJ_QM",
                    "date": "2026-10-20",
                    "text": "The money vanishes into shady administrative costs and Swiss bank accounts."
                }
            },
            {
                "kind": "card",
                "en": "It frankly blows my mind that we let the government get away with some of these things.",
                "ja": "正直、政府にこういうことを好き勝手させている私たちに驚く。",
                "mode": "exact",
                "card": {
                    "id": "yiTVmWI-",
                    "date": "2026-08-19",
                    "text": "It frankly blows my mind that we let the government get away with some of these things."
                }
            },
            {
                "kind": "bridge",
                "en": "Handing that same government even more money, with no clear way to track it, would not close the wealth gap. It would just move the money somewhere we cannot see.",
                "ja": "その同じ政府に、追う手段も無いままもっと金を渡しても、格差は縮まらない。金が見えない所へ移るだけだ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "I'm not saying rich people are greedy.",
                "ja": "金持ちが強欲だと言っているわけではない。",
                "mode": "trim",
                "card": {
                    "id": "jG8g0M-i",
                    "date": "2026-10-10",
                    "text": "I'm not saying rich people are greedy."
                }
            },
            {
                "kind": "card",
                "en": "We got to weed out the greedy in order to help the needy.",
                "ja": "困っている人を助けるには、強欲な人を取り除かないといけない。",
                "mode": "exact",
                "card": {
                    "id": "fDv-AwHW",
                    "date": "2026-08-20",
                    "text": "We got to weed out the greedy in order to help the needy."
                }
            },
            {
                "kind": "bridge",
                "en": "But you do that by closing loopholes and making everyone pay their fair share, not by putting a ceiling on success.",
                "ja": "でもそれは、抜け穴をふさいで全員に公平な分を払わせることでやる。成功に天井をつけることでではない。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and trust, governments should not cap how rich a person can get.",
                "ja": "まとめると、お金、時間、そして信頼の理由で、政府は人がどこまで金持ちになれるかに上限を設けるべきではない。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "recession-spending": {
        "open": [
            {
                "kind": "frame",
                "en": "I don't think spending more public money is the best way to fight a recession.",
                "ja": "公金をもっと使うことが、不況と戦う最善の方法だとは思わない。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, trust.",
                "ja": "3つ。お金、時間、そして何より信頼。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "bridge",
                "en": "Big spending can actually make life more expensive for ordinary people.",
                "ja": "大型支出は、普通の人の暮らしをかえって高くすることがある。"
            },
            {
                "kind": "card",
                "en": "All that money filtered into the economy, bid up all the goods we buy, and everybody got smoked with higher prices.",
                "ja": "その金が全部経済にしみ込んで、買う物の値段を全部つり上げ、みんな値上がりでやられた。",
                "mode": "exact",
                "card": {
                    "id": "8-Ru3lLO",
                    "date": "2026-08-27",
                    "text": "All that money filtered into the economy, bid up all the goods we buy, and everybody got smoked with higher prices."
                }
            },
            {
                "kind": "card",
                "en": "Have you noticed how much prices have gone up, it's getting ridiculous",
                "ja": "物価がどれだけ上がったか気づいた? もうばかげてる。",
                "mode": "exact",
                "card": {
                    "id": "d_RKUsCu",
                    "date": "2026-05-13",
                    "text": "Have you noticed how much prices have gone up, it's getting ridiculous"
                }
            },
            {
                "kind": "bridge",
                "en": "So a spending spree can turn a recession into a recession with high prices, which is the worst of both worlds.",
                "ja": "だから大盤振る舞いは、不況を「物価高つきの不況」に変えうる。最悪の組み合わせだ。",
                "expr": "the worst of both worlds",
                "note": "両方の悪いところ取り。the best of both worlds の逆。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "bridge",
                "en": "Spending also cannot create real jobs fast enough.",
                "ja": "支出は、本物の仕事を十分速く生み出すこともできない。"
            },
            {
                "kind": "card",
                "en": "No government can incentivize jobs into existence.",
                "ja": "どんな政府も、インセンティブで仕事を生み出すことはできない。",
                "mode": "trim",
                "card": {
                    "id": "TqEQO5N6",
                    "date": "2026-05-25",
                    "text": "Yeah, incentivization — but no government can incentivize jobs into existence."
                }
            },
            {
                "kind": "card",
                "en": "Everyone's tightening their belts and sitting on their wallets until the economy picks up.",
                "ja": "景気が戻るまで、みんな財布のひもを締めて、財布の上に座っている。",
                "mode": "exact",
                "card": {
                    "id": "hXowr5Em",
                    "date": "2026-03-18",
                    "text": "Everyone's tightening their belts and sitting on their wallets until the economy picks up."
                }
            },
            {
                "kind": "bridge",
                "en": "People start spending again only when they feel safe, and that takes time that no stimulus package can buy.",
                "ja": "人がまた金を使い始めるのは安心したときだけで、それにはどんな景気対策でも買えない時間がかかる。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: trust.",
                "ja": "でも本題はここ。信頼だ。"
            },
            {
                "kind": "bridge",
                "en": "A recession is partly about money and partly about mood.",
                "ja": "不況は、一部は金の問題で、一部は気分の問題だ。"
            },
            {
                "kind": "card",
                "en": "Half the economy is real and half of it is just vibes.",
                "ja": "経済の半分は本物で、半分はただの空気だ。",
                "mode": "trim",
                "card": {
                    "id": "TeTgBqgV",
                    "date": "2026-06-09",
                    "text": "Half the economy is real and half of it is just vibes."
                }
            },
            {
                "kind": "card",
                "en": "A market can crash because people got nervous, not because anything actually changed.",
                "ja": "何かが実際に変わったからではなく、人がびくついたから市場は暴落しうる。",
                "mode": "exact",
                "card": {
                    "id": "Zo8F4OhQ",
                    "date": "2026-06-09",
                    "text": "A market can crash because people got nervous, not because anything actually changed."
                }
            },
            {
                "kind": "bridge",
                "en": "If people don't trust how the government spends, more spending just makes them more nervous.",
                "ja": "政府の金の使い方を人が信じなければ、支出を増やしても人をもっと不安にさせるだけだ。"
            },
            {
                "kind": "card",
                "en": "They're just throwing money at the problem.",
                "ja": "問題に金を投げつけているだけだ。",
                "mode": "exact",
                "card": {
                    "id": "AXUjvov2",
                    "date": "2026-05-15",
                    "text": "They're just throwing money at the problem."
                }
            },
            {
                "kind": "card",
                "en": "That never works.",
                "ja": "それはうまくいったためしがない。",
                "mode": "exact",
                "card": {
                    "id": "AXUjvov2",
                    "date": "2026-05-15",
                    "text": "That never works."
                }
            },
            {
                "kind": "bridge",
                "en": "What works is help that people can see and trust: fast, small, and easy to track.",
                "ja": "うまくいくのは、人が見えて信じられる支援だ。速く、小さく、追いやすいもの。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "There does need to be some kind of safety net, but continually giving out money to people who aren't working is economic suicide.",
                "ja": "何らかの安全網は確かに要る。でも働いていない人に配り続けるのは経済的な自殺だ。",
                "mode": "exact",
                "card": {
                    "id": "a56YDFMr",
                    "date": "2026-10-18",
                    "text": "There does need to be some kind of safety net, but continually giving out money to people who aren't working is economic suicide."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and trust, spending more public money is not the best way to fight a recession.",
                "ja": "まとめると、お金、時間、そして信頼の理由で、公金をもっと使うことは、不況と戦う最善の方法ではない。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "sugar-tax": {
        "open": [
            {
                "kind": "frame",
                "en": "I'm for a small tax on sugary drinks to protect public health.",
                "ja": "公衆衛生を守るための、砂糖入り飲料への小さな課税に賛成だ。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, fairness.",
                "ja": "3つ。お金、時間、そして何より公平。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "bridge",
                "en": "Sugar is cheap, and that's exactly the problem.",
                "ja": "砂糖は安い。まさにそこが問題だ。"
            },
            {
                "kind": "card",
                "en": "Sugary drinks are cheap, they're everywhere, and they're marketed directly to children.",
                "ja": "砂糖入り飲料は安くて、どこにでもあって、子どもに向けて直接売られている。",
                "mode": "exact",
                "card": {
                    "id": "pAaS446E",
                    "date": "2026-10-16",
                    "text": "Sugary drinks are cheap, they're everywhere, and they're marketed directly to children."
                }
            },
            {
                "kind": "card",
                "en": "Liquid sugar as a meal -- bro, that's not lunch, that's surrender.",
                "ja": "液体の砂糖を食事にするって、それは昼飯じゃない、降伏だ。",
                "mode": "exact",
                "card": {
                    "id": "xLXnfMwc",
                    "date": "2026-04-27",
                    "text": "Liquid sugar as a meal -- bro, that's not lunch, that's surrender."
                }
            },
            {
                "kind": "bridge",
                "en": "A small tax makes surrender a little more expensive, and that is enough to make some people pick water instead.",
                "ja": "小さな税は降伏を少しだけ高くする。それだけで、水を選ぶ人が出てくる。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "bridge",
                "en": "Willpower does not last very long.",
                "ja": "意志の力はあまり長続きしない。"
            },
            {
                "kind": "card",
                "en": "I lasted exactly six days on that diet before falling off the wagon completely.",
                "ja": "あのダイエットはきっかり6日で、完全に挫折した。",
                "mode": "exact",
                "card": {
                    "id": "fxI_UOSm",
                    "date": "2026-05-15",
                    "text": "I lasted exactly six days on that diet before falling off the wagon completely."
                }
            },
            {
                "kind": "bridge",
                "en": "A tax keeps working on day seven, after our willpower has already quit, and over the years those small choices add up to fewer sick people.",
                "ja": "税は、意志の力がもう辞めた7日目も働き続ける。そして何年もたつと、その小さな選択が病気の人を減らす。"
            },
            {
                "kind": "card",
                "en": "She always says an ounce of prevention is worth a pound of cure.",
                "ja": "母はいつも、1オンスの予防は1ポンドの治療に値すると言う。",
                "mode": "trim",
                "card": {
                    "id": "ipSTwbeT",
                    "date": "2026-02-24",
                    "text": "My mom's gonna freak — she always says an ounce of prevention is worth a pound of cure."
                }
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: fairness.",
                "ja": "でも本題はここ。公平だ。"
            },
            {
                "kind": "bridge",
                "en": "The fair question is who pays for the damage that sugar does.",
                "ja": "公平に問うべきは、砂糖が与える害の代償を誰が払うかだ。"
            },
            {
                "kind": "card",
                "en": "But who pays when those choices lead to diabetes?",
                "ja": "でも、その選択が糖尿病につながったら、誰が払うのか。",
                "mode": "exact",
                "card": {
                    "id": "xAlqTJP_",
                    "date": "2026-10-16",
                    "text": "But who pays when those choices lead to diabetes?"
                }
            },
            {
                "kind": "card",
                "en": "Ultimately, the healthcare system, and therefore all of us.",
                "ja": "結局は医療制度、つまり私たち全員だ。",
                "mode": "exact",
                "card": {
                    "id": "xAlqTJP_",
                    "date": "2026-10-16",
                    "text": "Ultimately, the healthcare system, and therefore all of us."
                }
            },
            {
                "kind": "card",
                "en": "There ain't no such thing as a free lunch.",
                "ja": "タダ飯なんてものは無い。",
                "mode": "exact",
                "card": {
                    "id": "i6XcrwBi",
                    "date": "2026-07-06",
                    "text": "There ain't no such thing as a free lunch."
                }
            },
            {
                "kind": "bridge",
                "en": "Right now, even people who never touch soda pay for it through their insurance, so a tax that falls on the people who drink it is fairer than what we have now.",
                "ja": "今はソーダに手をつけない人まで保険を通じてその分を払っている。だから飲む人にかかる税の方が、今の仕組みより公平だ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Where the drinks are concerned, is that a hidden tax?",
                "ja": "飲み物について言えば、それは隠れた税なのか?",
                "mode": "exact",
                "card": {
                    "id": "YpZL4mAX",
                    "date": "2026-09-13",
                    "text": "Where the drinks are concerned, is that a hidden tax?"
                }
            },
            {
                "kind": "bridge",
                "en": "It's not hidden if we're honest about it, and if the money goes back into health, like cheaper fruit and vegetables for poorer families.",
                "ja": "正直に言えば隠れてはいない。税収が健康に戻るならなおさらだ。たとえば貧しい家庭向けの安い果物や野菜として。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, sugary drinks should be taxed to protect public health.",
                "ja": "まとめると、お金、時間、そして公平の理由で、公衆衛生を守るために砂糖入り飲料に課税すべきだ。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "unions": {
        "open": [
            {
                "kind": "frame",
                "en": "I believe workers still need strong unions today.",
                "ja": "今の時代も、働く人には強い組合が必要だと思う。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, fairness.",
                "ja": "3つ。お金、時間、そして何より公平。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "bridge",
                "en": "Wages have barely moved for years, and a lot of people feel it.",
                "ja": "賃金は何年もほとんど動いておらず、多くの人がそれを感じている。"
            },
            {
                "kind": "card",
                "en": "I'm working three jobs and still barely making ends meet — no rest for the weary.",
                "ja": "仕事を3つ掛け持ちして、それでもやっと暮らしている。疲れた者に休みは無い。",
                "mode": "exact",
                "card": {
                    "id": "lrGjt0yZ",
                    "date": "2026-03-07",
                    "text": "I'm working three jobs and still barely making ends meet — no rest for the weary."
                }
            },
            {
                "kind": "card",
                "en": "I looked at my payslip and the tax deduction made me want to cry",
                "ja": "給与明細を見たら、税の天引きで泣きたくなった。",
                "mode": "exact",
                "card": {
                    "id": "8hmsIxjv",
                    "date": "2026-05-12",
                    "text": "I looked at my payslip and the tax deduction made me want to cry"
                }
            },
            {
                "kind": "bridge",
                "en": "One worker crying over a payslip can't change anything. Thousands of workers negotiating together can.",
                "ja": "給与明細を見て泣く働き手1人では何も変えられない。何千人がまとまって交渉すれば変えられる。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "bridge",
                "en": "Unions also protect workers' time, not just their pay.",
                "ja": "組合は、給料だけでなく働く人の時間も守る。"
            },
            {
                "kind": "card",
                "en": "I clock in and clock out.",
                "ja": "出勤して、退勤する。",
                "mode": "exact",
                "card": {
                    "id": "oM15g8A_",
                    "date": "2026-04-13",
                    "text": "I clock in and clock out."
                }
            },
            {
                "kind": "card",
                "en": "It pays the bills, but it slowly eats away at you.",
                "ja": "生活費は払える。でも少しずつ自分をむしばむ。",
                "mode": "exact",
                "card": {
                    "id": "Liu2IRhU",
                    "date": "2026-09-18",
                    "text": "It pays the bills, but it slowly eats away at you."
                }
            },
            {
                "kind": "bridge",
                "en": "Without limits on overtime, clocking out keeps getting later and later, until people burn out.",
                "ja": "残業に限度が無ければ、退勤はどんどん遅くなり、やがて人は燃え尽きる。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: fairness.",
                "ja": "でも本題はここ。公平だ。"
            },
            {
                "kind": "bridge",
                "en": "The workers who suffer most are the ones that nobody speaks up for.",
                "ja": "一番苦しむ働き手は、誰も代わりに声を上げてくれない人たちだ。"
            },
            {
                "kind": "card",
                "en": "The animators are famously overworked and underpaid.",
                "ja": "アニメーターは、働きすぎで給料が安いことで有名だ。",
                "mode": "exact",
                "card": {
                    "id": "8NuF6ryy",
                    "date": "2026-05-20",
                    "text": "The animators are famously overworked and underpaid."
                }
            },
            {
                "kind": "card",
                "en": "The system is rigged in favor of the people who already have it all.",
                "ja": "仕組みは、もう全部持っている人に有利にできている。",
                "mode": "exact",
                "card": {
                    "id": "xaPQiqef",
                    "date": "2026-10-10",
                    "text": "The system is rigged in favor of the people who already have it all."
                }
            },
            {
                "kind": "card",
                "en": "They're laughing all the way to the bank.",
                "ja": "彼らは笑いながら銀行へ行く(ぼろ儲けしている)。",
                "mode": "exact",
                "card": {
                    "id": "jXWsQwkR",
                    "date": "2026-08-12",
                    "text": "They're laughing all the way to the bank."
                }
            },
            {
                "kind": "bridge",
                "en": "A union gives workers a seat at the table, so the people who do the work get a fair share of what they create.",
                "ja": "組合は働く人に交渉の席を与える。だから実際に働く人が、自分が生み出したものから公平な分け前を得られる。",
                "expr": "a seat at the table",
                "note": "決定の場に参加する権利。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Companies can be horribly corrupted, and unions can be horribly corrupted.",
                "ja": "会社はひどく腐敗しうるし、組合もひどく腐敗しうる。",
                "mode": "exact",
                "card": {
                    "id": "n2rgIZms",
                    "date": "2026-10-18",
                    "text": "Companies can be horribly corrupted, and unions can be horribly corrupted."
                }
            },
            {
                "kind": "card",
                "en": "Obviously they need to exist, but it's a balancing act again.",
                "ja": "もちろん必要だ。でも、また釣り合いの問題だ。",
                "mode": "exact",
                "card": {
                    "id": "tZ1Hu-3f",
                    "date": "2026-10-18",
                    "text": "Obviously they need to exist, but it's a balancing act again."
                }
            },
            {
                "kind": "bridge",
                "en": "So unions need limits too, but taking them away would leave workers with no voice at all.",
                "ja": "だから組合にも限度は要る。でも組合を無くせば、働く人には声がまったく残らない。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, workers still need strong unions today.",
                "ja": "まとめると、お金、時間、そして公平の理由で、働く人には今も強い組合が必要だ。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "foreign-workers": {
        "open": [
            {
                "kind": "card",
                "en": "I lean toward welcoming immigrants.",
                "ja": "移民を受け入れる方に傾いている。",
                "mode": "trim",
                "card": {
                    "id": "JezYj6ot",
                    "date": "2026-07-02",
                    "text": "I lean toward welcoming immigrants — but I don't follow it closely."
                }
            },
            {
                "kind": "frame",
                "en": "Japan should welcome more foreign workers.",
                "ja": "日本はもっと多くの外国人労働者を受け入れるべきだ。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, fairness.",
                "ja": "3つ。お金、時間、そして何より公平。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "bridge",
                "en": "Japan needs these workers, and the workers need Japan.",
                "ja": "日本にはこの働き手が必要で、働き手には日本が必要だ。"
            },
            {
                "kind": "card",
                "en": "They come dreaming of Japanese wages to send home, and frankly we need them.",
                "ja": "彼らは日本の賃金を夢見て、国に送金するために来る。正直、私たちには彼らが必要だ。",
                "mode": "trim",
                "card": {
                    "id": "hjVNveol",
                    "date": "2026-06-14",
                    "text": "They come dreaming of Japanese wages to send home, and frankly we need them — a shrinking country has no other engine."
                }
            },
            {
                "kind": "bridge",
                "en": "That's not charity. It's a deal that helps both sides, and it keeps businesses open that would otherwise close.",
                "ja": "それは慈善ではない。両方を助ける取引で、そのままなら閉じていたはずの商売を続けさせる。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "bridge",
                "en": "And Japan doesn't have time to wait for the birth rate to recover.",
                "ja": "そして日本には、出生率の回復を待つ時間が無い。"
            },
            {
                "kind": "card",
                "en": "Japan stagnated for 30 years partly because the population shrank.",
                "ja": "日本が30年停滞したのは、人口が減ったことも一因だ。",
                "mode": "exact",
                "card": {
                    "id": "fLmkqyye",
                    "date": "2026-06-14",
                    "text": "Japan stagnated for 30 years partly because the population shrank."
                }
            },
            {
                "kind": "card",
                "en": "A shrinking country has no other engine.",
                "ja": "縮んでいく国には、他にエンジンが無い。",
                "mode": "trim",
                "card": {
                    "id": "hjVNveol",
                    "date": "2026-06-14",
                    "text": "They come dreaming of Japanese wages to send home, and frankly we need them — a shrinking country has no other engine."
                }
            },
            {
                "kind": "bridge",
                "en": "A baby born today won't work for twenty years. A foreign worker can start tomorrow.",
                "ja": "今日生まれた赤ん坊が働くのは20年後だ。外国人労働者は明日から働ける。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: fairness.",
                "ja": "でも本題はここ。公平だ。"
            },
            {
                "kind": "bridge",
                "en": "But if Japan needs them, it has to treat them fairly.",
                "ja": "でも日本が彼らを必要とするなら、公平に扱わなければならない。"
            },
            {
                "kind": "card",
                "en": "The irony is the so-called illegal immigrants work harder and are paid less, so employers depend on them.",
                "ja": "皮肉なことに、いわゆる不法移民はよく働き給料は安い。だから雇い主は彼らに頼っている。",
                "mode": "exact",
                "card": {
                    "id": "hd6ZtMDE",
                    "date": "2026-07-01",
                    "text": "The irony is the so-called illegal immigrants work harder and are paid less, so employers depend on them."
                }
            },
            {
                "kind": "bridge",
                "en": "Japan has the same problem: many foreign workers do the hardest jobs for the lowest pay.",
                "ja": "日本にも同じ問題がある。多くの外国人労働者が、一番きつい仕事を一番安い給料でしている。"
            },
            {
                "kind": "card",
                "en": "It's the same everywhere -- anti-immigrant or pro-immigrant.",
                "ja": "どこでも同じだ。反移民か、親移民か。",
                "mode": "exact",
                "card": {
                    "id": "GvfaEhdY",
                    "date": "2026-07-02",
                    "text": "It's the same everywhere -- anti-immigrant or pro-immigrant."
                }
            },
            {
                "kind": "card",
                "en": "The anti-immigrant view is driven by fear, and I won't back fear.",
                "ja": "反移民の考えは恐れから来ている。私は恐れの側には立たない。",
                "mode": "exact",
                "card": {
                    "id": "oPmISEbO",
                    "date": "2026-06-14",
                    "text": "The anti-immigrant view is driven by fear, and I won't back fear."
                }
            },
            {
                "kind": "bridge",
                "en": "The fair answer is not fewer workers. It is equal pay and equal rights for the workers we already depend on.",
                "ja": "公平な答えは、働き手を減らすことではない。すでに頼っている働き手に、同じ給料と同じ権利を与えることだ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Border control isn't just a Trump thing — some of it is simply necessary.",
                "ja": "国境管理はトランプだけの話ではない。ある程度は単純に必要だ。",
                "mode": "exact",
                "card": {
                    "id": "1ItCrJkV",
                    "date": "2026-07-06",
                    "text": "Border control isn't just a Trump thing — some of it is simply necessary."
                }
            },
            {
                "kind": "bridge",
                "en": "Rules about who comes in are fine. Treating people badly once they are here is not.",
                "ja": "誰が入国するかのルールはかまわない。来てくれた人をひどく扱うのはだめだ。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, Japan should welcome more foreign workers and treat them fairly.",
                "ja": "まとめると、お金、時間、そして公平の理由で、日本はもっと多くの外国人労働者を受け入れ、公平に扱うべきだ。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "rich-countries-pay": {
        "open": [
            {
                "kind": "frame",
                "en": "Rich countries should pay to protect nature in poorer countries.",
                "ja": "豊かな国は、貧しい国の自然を守るために金を出すべきだ。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, fairness.",
                "ja": "3つ。お金、時間、そして何より公平。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "bridge",
                "en": "Protecting nature before it is destroyed is much cheaper than cleaning up after.",
                "ja": "自然が壊される前に守る方が、あとで片づけるよりずっと安い。"
            },
            {
                "kind": "card",
                "en": "Here's what nags me -- chasing garbage in open ocean is whack-a-mole forever.",
                "ja": "気になるのはここ。外洋でゴミを追いかけるのは、永遠のもぐら叩きだ。",
                "mode": "exact",
                "card": {
                    "id": "yVICa1uo",
                    "date": "2026-06-19",
                    "text": "Here's what nags me -- chasing garbage in open ocean is whack-a-mole forever."
                }
            },
            {
                "kind": "bridge",
                "en": "Cleaning up never ends. Protecting a forest is a one-time decision, so rich countries get far more for their money by paying to protect nature where it still exists.",
                "ja": "片づけは終わらない。森を守るのは一度の決断だ。だから豊かな国は、自然がまだある所で守るために払う方が、金に対してずっと多くを得る。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "card",
                "en": "Once a forest is gone, how do you put that genie back in the bottle?",
                "ja": "森が一度消えたら、どうやって元に戻すのか。",
                "mode": "exact",
                "card": {
                    "id": "hseuhZE9",
                    "date": "2026-10-12",
                    "text": "Once a forest is gone, how do you put that genie back in the bottle?"
                }
            },
            {
                "kind": "bridge",
                "en": "A forest takes a hundred years to grow and a week to cut down, so the time to pay is before the chainsaws arrive, not after.",
                "ja": "森は育つのに100年、切るのに1週間。だから払うべきときは、チェーンソーが来る前であって、あとではない。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: fairness.",
                "ja": "でも本題はここ。公平だ。"
            },
            {
                "kind": "card",
                "en": "Rich countries trashed the planet to get rich.",
                "ja": "豊かな国は、地球を荒らして豊かになった。",
                "mode": "exact",
                "card": {
                    "id": "CIFWq1vt",
                    "date": "2026-10-16",
                    "text": "Rich countries trashed the planet to get rich."
                }
            },
            {
                "kind": "bridge",
                "en": "Now they are telling poorer countries not to do the same thing, and that is only fair if they help pay.",
                "ja": "今その国々は、貧しい国に同じことをするなと言っている。それが公平なのは、払うのを手伝う場合だけだ。"
            },
            {
                "kind": "card",
                "en": "The poor get pushed onto the fragile land first, and the storm just finishes the job.",
                "ja": "貧しい人がまず脆い土地に追いやられ、嵐はとどめを刺すだけだ。",
                "mode": "exact",
                "card": {
                    "id": "_1Ky-J4Y",
                    "date": "2026-06-26",
                    "text": "The poor get pushed onto the fragile land first, and the storm just finishes the job."
                }
            },
            {
                "kind": "card",
                "en": "Money buys its way out of the weather.",
                "ja": "金は、天気からさえ逃げ道を買う。",
                "mode": "exact",
                "card": {
                    "id": "w2uu2ZUt",
                    "date": "2026-06-26",
                    "text": "Money buys its way out of the weather."
                }
            },
            {
                "kind": "bridge",
                "en": "The people who did the least damage get hit the hardest, so paying to protect their nature is the least rich countries can do.",
                "ja": "一番害を与えなかった人が一番ひどく打撃を受ける。だから彼らの自然を守るために払うのは、豊かな国にできる最低限のことだ。",
                "expr": "the least ~ can do",
                "note": "せめてそれくらいは(できる最低限のこと)。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "A lot of shady NGOs are meddling in other sovereign nations.",
                "ja": "怪しい NGO の多くが、他の主権国家に口を出している。",
                "mode": "exact",
                "card": {
                    "id": "GmiHE1hJ",
                    "date": "2026-10-20",
                    "text": "A lot of shady NGOs are meddling in other sovereign nations."
                }
            },
            {
                "kind": "card",
                "en": "Talk is cheap, show me it works.",
                "ja": "口だけなら安い。うまくいくところを見せてくれ。",
                "mode": "trim",
                "card": {
                    "id": "8cBYZZkg",
                    "date": "2026-02-08",
                    "text": "We're the Show-Me State — talk is cheap, show me it works."
                }
            },
            {
                "kind": "bridge",
                "en": "So the money should pay for results, like forests that are still standing next year, not for promises.",
                "ja": "だから金は約束ではなく、翌年もまだ立っている森のような結果に対して払うべきだ。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, rich countries should pay to protect nature in poorer countries.",
                "ja": "まとめると、お金、時間、そして公平の理由で、豊かな国は、貧しい国の自然を守るために払うべきだ。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "online-monitoring": {
        "open": [
            {
                "kind": "frame",
                "en": "I don't think governments should monitor what people do online, even to fight crime.",
                "ja": "犯罪と戦うためでも、政府が人々のネット上の行動を監視すべきだとは思わない。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, freedom.",
                "ja": "3つ。お金、時間、そして何より自由。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "card",
                "en": "Security firms stand to make a lot of money from fear.",
                "ja": "警備会社は、恐れから大儲けできる立場にある。",
                "mode": "exact",
                "card": {
                    "id": "pjzdSnRw",
                    "date": "2026-10-13",
                    "text": "Security firms stand to make a lot of money from fear."
                }
            },
            {
                "kind": "bridge",
                "en": "Mass monitoring is expensive, and most of that money goes into collecting data on people who did nothing wrong.",
                "ja": "大規模な監視は高くつく。そしてその金の大半は、何も悪いことをしていない人のデータ集めに使われる。"
            },
            {
                "kind": "card",
                "en": "Nobody wants to fix it, because there's no money in it.",
                "ja": "誰も直したがらない。金にならないからだ。",
                "mode": "exact",
                "card": {
                    "id": "UDs_jXsQ",
                    "date": "2026-10-13",
                    "text": "Nobody wants to fix it, because there's no money in it."
                }
            },
            {
                "kind": "bridge",
                "en": "Meanwhile, the boring work that actually stops online crime, like fixing security holes, gets ignored.",
                "ja": "その一方で、実際にネット犯罪を止める地味な仕事、たとえばセキュリティの穴をふさぐことは無視される。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "card",
                "en": "Sometimes it feels like we've already passed the point of control — the thing evolves on its own and we just run behind it.",
                "ja": "もう制御できる地点を過ぎた気がすることがある。あれは勝手に進化して、私たちは後ろを追いかけるだけだ。",
                "mode": "exact",
                "card": {
                    "id": "2bZZjQj2",
                    "date": "2026-06-07",
                    "text": "Sometimes it feels like we've already passed the point of control — the thing evolves on its own and we just run behind it."
                }
            },
            {
                "kind": "card",
                "en": "Next thing you know, it's completely out of control.",
                "ja": "気づいたら、完全に手に負えなくなっている。",
                "mode": "exact",
                "card": {
                    "id": "GIIB9k6u",
                    "date": "2026-10-10",
                    "text": "Next thing you know, it's completely out of control."
                }
            },
            {
                "kind": "bridge",
                "en": "Monitoring powers work the same way: they always grow over time, and they almost never shrink.",
                "ja": "監視の権限も同じだ。時間とともに必ず広がり、縮むことはほとんど無い。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: freedom.",
                "ja": "でも本題はここ。自由だ。"
            },
            {
                "kind": "card",
                "en": "You can't nanny-state the whole internet.",
                "ja": "インターネット全部を過保護国家にはできない。",
                "mode": "exact",
                "card": {
                    "id": "JVAa-ILs",
                    "date": "2026-10-09",
                    "text": "You can't nanny-state the whole internet."
                }
            },
            {
                "kind": "card",
                "en": "Governments are always looking to tell people what to do.",
                "ja": "政府はいつも、人に何をすべきか指図したがっている。",
                "mode": "exact",
                "card": {
                    "id": "x2uCv4ex",
                    "date": "2026-10-09",
                    "text": "Governments are always looking to tell people what to do."
                }
            },
            {
                "kind": "bridge",
                "en": "When people know they're being watched, they stop saying what they really think, and a free society needs people to say what they think.",
                "ja": "見られていると知ると、人は本当に思っていることを言わなくなる。そして自由な社会には、人が思っていることを言う必要がある。"
            },
            {
                "kind": "card",
                "en": "Governments should guard the doors, not read the letters.",
                "ja": "政府は扉を守るべきで、手紙を読むべきではない。",
                "mode": "exact",
                "card": {
                    "id": "jiSqfVoN",
                    "date": "2026-10-06",
                    "text": "Governments should guard the doors, not read the letters."
                }
            },
            {
                "kind": "bridge",
                "en": "Protecting the system is the government's job. Reading everyone's messages is not.",
                "ja": "仕組みを守るのは政府の仕事だ。全員のメッセージを読むのはそうではない。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "We need to control it before it gets out of control.",
                "ja": "手に負えなくなる前に、制御しなければならない。",
                "mode": "exact",
                "card": {
                    "id": "k2BLYjsm",
                    "date": "2026-09-13",
                    "text": "We need to control it before it gets out of control."
                }
            },
            {
                "kind": "bridge",
                "en": "And by 'it', I mean the monitoring: a judge's warrant for real suspects, not a camera pointed at everyone.",
                "ja": "ここで言う「それ」は監視のことだ。本当の容疑者には裁判官の令状を。全員に向けたカメラではなく。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and freedom, governments should not monitor what everyone does online.",
                "ja": "まとめると、お金、時間、そして自由の理由で、政府は全員のネット上の行動を監視すべきではない。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "people-and-politics": {
        "open": [
            {
                "kind": "frame",
                "en": "I believe ordinary people can really change politics, starting at the local level.",
                "ja": "普通の人々は本当に政治を変えられると思う。地域のレベルから始めれば。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, trust.",
                "ja": "3つ。お金、時間、そして何より信頼。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "card",
                "en": "The mega-billionaires and lobbyists throw their financial weight around.",
                "ja": "超億万長者とロビイストは、金の力を振り回す。",
                "mode": "exact",
                "card": {
                    "id": "7UtBL7Dj",
                    "date": "2026-10-16",
                    "text": "The mega-billionaires and lobbyists throw their financial weight around."
                }
            },
            {
                "kind": "card",
                "en": "They can 100% determine an election with their funding.",
                "ja": "彼らは資金で、選挙を100%決めることができる。",
                "mode": "exact",
                "card": {
                    "id": "_DkZdsAC",
                    "date": "2026-10-16",
                    "text": "They can 100% determine an election with their funding."
                }
            },
            {
                "kind": "bridge",
                "en": "Money matters, but it still has to win votes, and ordinary people are the ones holding the votes.",
                "ja": "金は大事だ。でも金も票を勝ち取らなければならず、票を握っているのは普通の人々だ。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "card",
                "en": "Recently, there have been many elections that were extremely close.",
                "ja": "最近は、ものすごく接戦の選挙がたくさんある。",
                "mode": "exact",
                "card": {
                    "id": "9wvBnXW3",
                    "date": "2026-10-16",
                    "text": "Recently, there have been many elections that were extremely close."
                }
            },
            {
                "kind": "card",
                "en": "Grassroots campaigning in razor-thin elections can sway voters.",
                "ja": "僅差の選挙では、草の根の運動が有権者を動かしうる。",
                "mode": "exact",
                "card": {
                    "id": "STiQMywc",
                    "date": "2026-10-16",
                    "text": "Grassroots campaigning in razor-thin elections can sway voters."
                }
            },
            {
                "kind": "bridge",
                "en": "When an election comes down to a few hundred votes, a few hundred ordinary people giving up their weekends can decide it.",
                "ja": "選挙が数百票の差で決まるなら、週末を差し出す数百人の普通の人々がそれを決められる。",
                "expr": "come down to ~",
                "note": "最後は〜で決まる。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: trust.",
                "ja": "でも本題はここ。信頼だ。"
            },
            {
                "kind": "card",
                "en": "People just vote for whoever has the best headshot.",
                "ja": "みんな、顔写真が一番いい人に投票するだけだ。",
                "mode": "exact",
                "card": {
                    "id": "E8baEGpa",
                    "date": "2026-10-13",
                    "text": "People just vote for whoever has the best headshot."
                }
            },
            {
                "kind": "bridge",
                "en": "That's funny, but it's also the real problem. If we vote on looks, we can't complain about the results.",
                "ja": "笑えるが、それが本当の問題でもある。見た目で投票するなら、結果に文句は言えない。"
            },
            {
                "kind": "card",
                "en": "If you're a politician, that's your entire job: skillfully walking on eggshells.",
                "ja": "政治家なら、それが仕事のすべてだ。うまく薄氷の上を歩くこと。",
                "mode": "exact",
                "card": {
                    "id": "y4gPLVJs",
                    "date": "2026-10-13",
                    "text": "If you're a politician, that's your entire job: skillfully walking on eggshells."
                }
            },
            {
                "kind": "card",
                "en": "But at the city level, I'm pretty sure young politicians aren't greedy anymore.",
                "ja": "でも市のレベルなら、若い政治家はもう強欲じゃないと、かなり確信している。",
                "mode": "exact",
                "card": {
                    "id": "xk7_DC-m",
                    "date": "2026-10-14",
                    "text": "But at the city level, I'm pretty sure young politicians aren't greedy anymore."
                }
            },
            {
                "kind": "bridge",
                "en": "At the local level, we can actually see what politicians do, so our trust can be based on facts instead of posters.",
                "ja": "地域のレベルなら、政治家が何をしているかが実際に見える。だから信頼をポスターではなく事実に基づかせられる。"
            },
            {
                "kind": "card",
                "en": "In a world where writing costs nothing, trust is the most expensive thing there is.",
                "ja": "書くことがタダになった世界では、信頼が一番高くつくものだ。",
                "mode": "exact",
                "card": {
                    "id": "wHcN8Ru3",
                    "date": "2026-02-23",
                    "text": "In a world where writing costs nothing, trust is the most expensive thing there is."
                }
            },
            {
                "kind": "bridge",
                "en": "Earning that trust, one town at a time, is how ordinary people change politics.",
                "ja": "その信頼を1つの町ずつ勝ち取ること。それが普通の人々が政治を変える方法だ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "It's a local election, so it's kind of rigged already.",
                "ja": "地方の選挙だから、ある意味もう出来レースだ。",
                "mode": "exact",
                "card": {
                    "id": "rFB2Esvb",
                    "date": "2026-10-15",
                    "text": "It's a local election, so it's kind of rigged already."
                }
            },
            {
                "kind": "bridge",
                "en": "I said that as a joke about my own city, but even so, the local level is where one person's voice is the loudest.",
                "ja": "自分の市について冗談で言ったことだが、それでも、地域は1人の声が一番大きく響く場所だ。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and trust, ordinary people can really change politics, one town at a time.",
                "ja": "まとめると、お金、時間、そして信頼の理由で、普通の人々は本当に政治を変えられる。1つの町ずつ。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "ai-rules": {
        "open": [
            {
                "kind": "frame",
                "en": "I don't think AI should be strictly controlled by governments.",
                "ja": "AI が政府に厳しく管理されるべきだとは思わない。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, freedom.",
                "ja": "3つ。お金、時間、そして何より自由。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "card",
                "en": "Large companies can afford to protect themselves.",
                "ja": "大企業は自分を守る余裕がある。",
                "mode": "exact",
                "card": {
                    "id": "_juLdSK-",
                    "date": "2026-10-06",
                    "text": "Large companies can afford to protect themselves."
                }
            },
            {
                "kind": "card",
                "en": "Small ones can't.",
                "ja": "小さな会社には無い。",
                "mode": "exact",
                "card": {
                    "id": "_juLdSK-",
                    "date": "2026-10-06",
                    "text": "Small ones can't."
                }
            },
            {
                "kind": "bridge",
                "en": "Strict rules are expensive to follow, so only the big tech companies could keep up, and the small startups would disappear.",
                "ja": "厳しい規制は従うのに金がかかる。だからついていけるのは大手のテック企業だけで、小さな新興企業は消える。"
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "card",
                "en": "We've introduced AI very quickly and now we're having to catch up to rein it in.",
                "ja": "AI をものすごい速さで入れて、今は手綱を締めるために追いつこうとしている。",
                "mode": "exact",
                "card": {
                    "id": "Jwcda8m-",
                    "date": "2026-06-07",
                    "text": "We've introduced AI very quickly and now we're having to catch up to rein it in."
                }
            },
            {
                "kind": "bridge",
                "en": "Catching up with strict laws is a losing race, because by the time a law passes, the technology has already moved on.",
                "ja": "厳しい法律で追いつこうとするのは負ける競争だ。法律が通る頃には、技術はもう先へ行っている。",
                "expr": "a losing race",
                "note": "勝ち目のない競争。fight a losing battle とも。"
            },
            {
                "kind": "card",
                "en": "People reckon AI will cure cancer -- I don't buy it.",
                "ja": "AI ががんを治すと思っている人もいるが、私は信じない。",
                "mode": "exact",
                "card": {
                    "id": "GCd6WXgp",
                    "date": "2026-07-27",
                    "text": "People reckon AI will cure cancer -- I don't buy it."
                }
            },
            {
                "kind": "bridge",
                "en": "The hype goes both ways, so the rules should be based on real harm, not on fear or fantasy.",
                "ja": "誇大な話はどちらにも転ぶ。だからルールは、恐れや夢ではなく、実際の害に基づくべきだ。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: freedom.",
                "ja": "でも本題はここ。自由だ。"
            },
            {
                "kind": "bridge",
                "en": "A lot of the push for strict control comes from fear of something new.",
                "ja": "厳しい管理を求める声の多くは、新しいものへの恐れから来ている。"
            },
            {
                "kind": "card",
                "en": "I used to be nervous, but after you've stood on the Cliffs of Moher in Ireland, in the RAIN, with the wind going sideways, and there's no railing, just grass and a thousand-foot drop?",
                "ja": "昔は怖かった。でもアイルランドのモハーの断崖に、雨の中、横殴りの風で、手すりも無く、草と300メートルの崖だけの所に立ったあとは?",
                "mode": "slot",
                "card": {
                    "id": "tixt17FF",
                    "date": "2026-03-28",
                    "text": "I used to be nervous, but after you've stood on the, uh, the Cliffs of Moher in Ireland, in the RAIN, with the wind goin' sideways, and there's no railing, just grass and a thousand-foot drop?"
                }
            },
            {
                "kind": "card",
                "en": "After that, everything else is a sidewalk.",
                "ja": "そのあとは、何もかもただの歩道だ。",
                "mode": "exact",
                "card": {
                    "id": "tixt17FF",
                    "date": "2026-03-28",
                    "text": "After that, everything else is a sidewalk."
                }
            },
            {
                "kind": "bridge",
                "en": "Fear shrinks once you face the scary thing. The more people actually use AI, the less magical and frightening it looks.",
                "ja": "恐れは、怖いものに向き合えば縮む。人が実際に AI を使うほど、魔法っぽさも怖さも薄れる。"
            },
            {
                "kind": "card",
                "en": "Bad ideas lose.",
                "ja": "悪い考えは負ける。",
                "mode": "exact",
                "card": {
                    "id": "tgPEyu-l",
                    "date": "2026-10-09",
                    "text": "Bad ideas lose."
                }
            },
            {
                "kind": "card",
                "en": "Let's leave it to the marketplace of ideas.",
                "ja": "考えの市場に任せよう。",
                "mode": "exact",
                "card": {
                    "id": "tgPEyu-l",
                    "date": "2026-10-09",
                    "text": "Let's leave it to the marketplace of ideas."
                }
            },
            {
                "kind": "bridge",
                "en": "Strict control would take that choice away from people and give it to the government.",
                "ja": "厳しい管理は、その選択を人々から取り上げて政府に渡すことになる。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "If the careful ones can't fully control it, what about everyone else?",
                "ja": "慎重な会社でも完全には制御できないなら、他のみんなはどうなる?",
                "mode": "exact",
                "card": {
                    "id": "yHNOV6tS",
                    "date": "2026-06-07",
                    "text": "If the careful ones can't fully control it, what about everyone else?"
                }
            },
            {
                "kind": "bridge",
                "en": "That's a fair worry, and it's why we need basic rules against clear harms, like deepfake scams, but not control over what AI is allowed to say.",
                "ja": "それはもっともな心配だ。だからディープフェイク詐欺のような明らかな害には基本のルールが要る。でも AI が何を言っていいかまで管理すべきではない。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and freedom, AI should not be strictly controlled by governments.",
                "ja": "まとめると、お金、時間、そして自由の理由で、AI は政府に厳しく管理されるべきではない。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    },
    "climate-action": {
        "open": [
            {
                "kind": "frame",
                "en": "I believe governments should act on climate change now, even if it slows the economy.",
                "ja": "経済が減速するとしても、政府は今、気候変動に対して行動すべきだと思う。"
            },
            {
                "kind": "frame",
                "en": "Three things: money, time, and most of all, nature.",
                "ja": "3つ。お金、時間、そして何より自然。"
            }
        ],
        "a": [
            {
                "kind": "frame",
                "en": "First, money.",
                "ja": "まず、お金。"
            },
            {
                "kind": "card",
                "en": "AC stopped being a luxury decades ago — patrol cars literally drive around warning people they can get heatstroke indoors.",
                "ja": "エアコンはとっくに贅沢品じゃない。パトカーが文字通り走り回って、室内でも熱中症になると警告している。",
                "mode": "exact",
                "card": {
                    "id": "p2M-sKYu",
                    "date": "2026-07-15",
                    "text": "AC stopped being a luxury decades ago — patrol cars literally drive around warning people they can get heatstroke indoors."
                }
            },
            {
                "kind": "bridge",
                "en": "Heat is already costing us money, in hospital bills and electricity, so climate action is not a new cost on top of nothing.",
                "ja": "暑さはもう、医療費や電気代として金がかかっている。だから気候対策は、何も無い所に乗る新しい費用ではない。"
            },
            {
                "kind": "card",
                "en": "That's a false economy.",
                "ja": "それは安物買いの銭失いだ。",
                "mode": "exact",
                "card": {
                    "id": "7FElffhm",
                    "date": "2026-08-10",
                    "text": "That's a false economy."
                }
            },
            {
                "kind": "card",
                "en": "We'll pay twice when it fails.",
                "ja": "失敗したら2回払うことになる。",
                "mode": "exact",
                "card": {
                    "id": "7FElffhm",
                    "date": "2026-08-10",
                    "text": "We'll pay twice when it fails."
                }
            }
        ],
        "b": [
            {
                "kind": "frame",
                "en": "Second, time.",
                "ja": "次に、時間。"
            },
            {
                "kind": "card",
                "en": "How long before climate change renders this planet unlivable?",
                "ja": "気候変動がこの星を住めない場所にするまで、あとどれくらいか。",
                "mode": "exact",
                "card": {
                    "id": "Cz0T8fcD",
                    "date": "2026-09-20",
                    "text": "How long before climate change renders this planet unlivable?"
                }
            },
            {
                "kind": "card",
                "en": "One bag is a drop in the bucket.",
                "ja": "レジ袋1枚は焼け石に水だ。",
                "mode": "exact",
                "card": {
                    "id": "UstqAdYD",
                    "date": "2026-10-12",
                    "text": "One bag is a drop in the bucket."
                }
            },
            {
                "kind": "card",
                "en": "A billion bags are not.",
                "ja": "10億枚なら違う。",
                "mode": "exact",
                "card": {
                    "id": "UstqAdYD",
                    "date": "2026-10-12",
                    "text": "A billion bags are not."
                }
            },
            {
                "kind": "bridge",
                "en": "Climate change works the same way. Every year of delay adds another billion bags, so waiting doesn't save time. It wastes it.",
                "ja": "気候変動も同じだ。先延ばしの1年ごとに、また10億枚が足される。だから待つことは時間の節約にならない。時間の無駄だ。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But here's the big one: nature.",
                "ja": "でも本題はここ。自然だ。"
            },
            {
                "kind": "card",
                "en": "I'll say it boldly -- I want to get off this planet.",
                "ja": "はっきり言う。この星から出ていきたい。",
                "mode": "exact",
                "card": {
                    "id": "wN7-Y_GU",
                    "date": "2026-07-18",
                    "text": "I'll say it boldly -- I want to get off this planet."
                }
            },
            {
                "kind": "bridge",
                "en": "Some days I really feel that way, but there is no planet B, so we have to take care of this one.",
                "ja": "本当にそう思う日もある。でもプランBの星は無い。だからこの星を大事にするしかない。",
                "expr": "there is no planet B",
                "note": "代わりの星は無い。環境運動の決まり文句(Plan B にかけた言葉遊び)。"
            },
            {
                "kind": "card",
                "en": "The bear is far more interested in your hot dogs than in you, I promise.",
                "ja": "クマはあなたより、あなたのホットドッグにずっと興味がある。約束する。",
                "mode": "trim",
                "card": {
                    "id": "BBJVF2Qz",
                    "date": "2026-06-27",
                    "text": "Ranger Dawn: The bear is far more interested in your hot dogs than in you, I promise."
                }
            },
            {
                "kind": "bridge",
                "en": "That was a park ranger joking with campers, but when bears start coming into towns for our food, nature is telling us that its home is shrinking.",
                "ja": "公園のレンジャーがキャンプ客に言った冗談だ。でもクマが食べ物を求めて町に出てくるようになったら、それは自然が「住む場所が縮んでいる」と言っているのだ。"
            },
            {
                "kind": "card",
                "en": "Future generations will pay for what we discard today.",
                "ja": "今日私たちが捨てたものの代償は、未来の世代が払う。",
                "mode": "trim",
                "card": {
                    "id": "A4WGWV-R",
                    "date": "2026-10-12",
                    "text": "So, ultimately, a throwaway culture is not sustainable, and future generations will pay for what we discard today."
                }
            },
            {
                "kind": "bridge",
                "en": "Protecting nature now is protecting our children's home, and only governments can act on that scale.",
                "ja": "今自然を守ることは、子どもたちの家を守ることだ。そしてその規模で動けるのは政府だけだ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "A lot of people think we've already passed the point of no return on climate.",
                "ja": "気候については、もう引き返せない点を越えたと考える人も多い。",
                "mode": "exact",
                "card": {
                    "id": "IxJOMTFq",
                    "date": "2026-10-12",
                    "text": "A lot of people think we've already passed the point of no return on climate."
                }
            },
            {
                "kind": "card",
                "en": "But the bottom line is, prevention is cheaper than recovery.",
                "ja": "でも結局のところ、予防は回復より安い。",
                "mode": "exact",
                "card": {
                    "id": "hfMgpwo5",
                    "date": "2026-10-13",
                    "text": "But the bottom line is, prevention is cheaper than recovery."
                }
            },
            {
                "kind": "bridge",
                "en": "Even if some damage is already done, acting now still decides how bad it gets.",
                "ja": "たとえ一部の被害がもう起きていても、今行動すれば、どこまで悪くなるかはまだ変えられる。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and nature, governments should act on climate change now, even if it slows the economy.",
                "ja": "まとめると、お金、時間、そして自然の理由で、経済が減速しても、政府は今、気候変動に対して行動すべきだ。",
                "mode": "slot",
                "card": {
                    "id": "AIHwnhS3",
                    "date": "2026-10-13",
                    "text": "So, to sum up my take on this: greedy politicians can no longer survive in a slightly more enlightened society."
                }
            }
        ]
    }
};
