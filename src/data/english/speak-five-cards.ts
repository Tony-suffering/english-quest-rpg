/**
 * SPEAK 5 — カード版。10テーマのスピーチを、本人のトレーニングカード(D1 の phrases)の実在の文だけで組んだもの。
 *
 * - 本文の行はすべてカード。各行に出典(カード ID・登録日・カードの元の文)を持つ
 *   - exact = カードの文を一字一句そのまま / trim = カードの文の一部を切り出した / slot = 語を差し替えた(元の文は card.text)
 * - つなぎ(kind: 'bridge')は自作の文。各段落を「主張 -> カード(証拠) -> 問いへの答え」でつなぐ。expr があればその表現をページで解説する
 * - 枠(kind: 'frame')もカード外。立場の1文と、道しるべ(First, money. / Second, time. / But most importantly, X.)
 * - 入口の "I'll discuss three points" と締めの "To sum up, because of" も、カード(Ul8RQ2Yx / a57_mYra)の語を差し替えたもの
 * - 自作版(speak-five.ts の FIVE_THEMES)はそのまま残す。こちらは別バージョン
 *
 * 生成: scratchpad の gen-cards.cjs が D1 の全カードと突き合わせて書き出した(手で直さない。直すなら設計図を直して再生成)
 * 検査: scripts/verify-speak-five.cjs(枠の数、行の形、出典の有無、語数)
 */

export type CardLineMode = 'exact' | 'trim' | 'slot';

export interface CardLine {
    kind: 'frame' | 'card' | 'bridge';
    en: string;
    ja: string;
    mode?: CardLineMode;
    expr?: string;     // bridge だけ: 覚える表現
    note?: string;     // bridge だけ: その表現の解説
    card?: { id: string; date: string; text: string };
}

export interface CardSpeech {
    open: CardLine[];
    a: CardLine[];
    b: CardLine[];
    c: CardLine[];
    close: CardLine[];
}

export const CARD_SPEECHES: Record<string, CardSpeech> = {
    "wealth-cap": {
        "open": [
            {
                "kind": "frame",
                "en": "I don't think governments should cap individual wealth.",
                "ja": "政府が個人の富に上限を設けるべきだとは思わない。"
            },
            {
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, trust.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な信頼。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "A wealth cap would not keep money in the country. It would push it out.",
                "ja": "富の上限は、金を国内に留めない。外へ押し出す。"
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
                "en": "When they leave, their taxes and the jobs they create leave with them, so a cap would end up collecting less money, not more.",
                "ja": "彼らが出ていけば、彼らの税金も生み出す仕事も一緒に出ていく。だから上限は、結局集める金を増やすどころか減らす。",
                "expr": "end up -ing",
                "note": "「結局〜することになる」。意図と逆の結果を言う。"
            },
            {
                "kind": "card",
                "en": "Let's let the little guy compete, because that's where new jobs come from.",
                "ja": "小さな者に競わせよう。新しい仕事はそこから生まれるのだから。",
                "mode": "exact",
                "card": {
                    "id": "K5FlHLgj",
                    "date": "2026-10-08",
                    "text": "Let's let the little guy compete, because that's where new jobs come from."
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
                "kind": "bridge",
                "en": "A cap also ignores how long it takes to build wealth honestly.",
                "ja": "上限は、正直に富を築くのにどれだけ時間がかかるかも無視している。"
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
                "kind": "bridge",
                "en": "If the government says that after a certain point those decades count for nothing, fewer people will start the long journey in the first place.",
                "ja": "ある地点を過ぎたらその何十年も無意味だと政府が言えば、そもそも長い道のりを歩き始める人が減る。",
                "expr": "in the first place",
                "note": "「そもそも」。話の出発点にさかのぼる。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, trust.",
                "ja": "でも一番大事なのは、信頼だ。"
            },
            {
                "kind": "bridge",
                "en": "Even if we agreed on a cap, the money it collects would go to the government, and we would have to trust it to spend that money well.",
                "ja": "仮に上限に合意しても、集めた金は政府に行く。そして私たちは、政府がそれをうまく使うと信じなければならない。"
            },
            {
                "kind": "card",
                "en": "Nobody knows where the money goes.",
                "ja": "金がどこへ行くのか、誰も知らない。",
                "mode": "exact",
                "card": {
                    "id": "9mJIaV59",
                    "date": "2026-10-16",
                    "text": "Nobody knows where the money goes."
                }
            },
            {
                "kind": "card",
                "en": "It's like a sieve.",
                "ja": "ザルのようなものだ。",
                "mode": "exact",
                "card": {
                    "id": "9tPgke-m",
                    "date": "2026-10-20",
                    "text": "It's like a sieve."
                }
            },
            {
                "kind": "card",
                "en": "There are so many loopholes.",
                "ja": "抜け穴だらけだ。",
                "mode": "exact",
                "card": {
                    "id": "9tPgke-m",
                    "date": "2026-10-20",
                    "text": "There are so many loopholes."
                }
            },
            {
                "kind": "bridge",
                "en": "The same goes for the charities that are supposed to help.",
                "ja": "助けるはずの慈善団体も同じだ。",
                "expr": "The same goes for ~",
                "note": "「〜も同じだ」。前の話を別の相手に広げる。"
            },
            {
                "kind": "card",
                "en": "In the name of philanthropy, we can't track where the money has gone or where it's going.",
                "ja": "慈善の名のもとに、金がどこへ行ったのか、どこへ行くのか、追えない。",
                "mode": "exact",
                "card": {
                    "id": "el-aw4C1",
                    "date": "2026-10-20",
                    "text": "In the name of philanthropy, we can't track where the money has gone or where it's going."
                }
            },
            {
                "kind": "bridge",
                "en": "So a wealth cap would take money from people we can see and hand it to a system we cannot check.",
                "ja": "だから富の上限は、目に見える人から金を取り、確かめられない仕組みに渡すことになる。"
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
                "kind": "bridge",
                "en": "The wealth gap is real, and it needs fixing. But the fix is fair taxes and fewer loopholes, not a ceiling on success.",
                "ja": "格差は現実で、直す必要がある。でも直し方は公平な税と抜け穴を減らすことで、成功に天井をつけることではない。"
            },
            {
                "kind": "card",
                "en": "It's a matter of degree, a matter of moderation.",
                "ja": "程度の問題、節度の問題だ。",
                "mode": "exact",
                "card": {
                    "id": "nkKqj5z7",
                    "date": "2026-10-20",
                    "text": "It's a matter of degree, a matter of moderation."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and trust, a cap is not the answer.",
                "ja": "まとめると、お金、時間、そして信頼の理由で、上限は答えではない。",
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
                "en": "I don't think more public spending is the best cure for a recession.",
                "ja": "公金をもっと使うことが、不況の一番の薬だとは思わない。"
            },
            {
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, trust.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な信頼。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Big spending looks like a quick fix, but it is paid for with borrowed money.",
                "ja": "大型支出は手っ取り早い解決に見えるが、借りた金で払われる。",
                "expr": "a quick fix",
                "note": "手っ取り早い(その場しのぎの)解決。"
            },
            {
                "kind": "card",
                "en": "Heavy government spending isn't a silver bullet for recessions.",
                "ja": "政府の大型支出は、不況の特効薬ではない。",
                "mode": "exact",
                "card": {
                    "id": "n5a3jn7J",
                    "date": "2026-10-18",
                    "text": "Heavy government spending isn't a silver bullet for recessions."
                }
            },
            {
                "kind": "card",
                "en": "With regard to debt, it imposes a burden that lasts for years.",
                "ja": "借金について言えば、それは何年も続く負担を課す。",
                "mode": "trim",
                "card": {
                    "id": "U24WZI8W",
                    "date": "2026-09-09",
                    "text": "With regard to debt, it imposes a burden that lasts for years."
                }
            },
            {
                "kind": "bridge",
                "en": "So a recession that lasts one year can leave a debt that lasts thirty, and the next generation pays for it.",
                "ja": "だから1年の不況が30年の借金を残すことがあり、それを払うのは次の世代だ。"
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
                "en": "Spending is also slow. By the time a big project gets going, the recession is often over, and the project keeps eating money anyway.",
                "ja": "支出は遅くもある。大きな事業が動き出す頃には不況は終わっていることが多いのに、事業は金を食べ続ける。"
            },
            {
                "kind": "card",
                "en": "It all adds up over time.",
                "ja": "時間がたてば、全部積み上がる。",
                "mode": "exact",
                "card": {
                    "id": "5ICW_qta",
                    "date": "2026-09-30",
                    "text": "It all adds up over time."
                }
            },
            {
                "kind": "card",
                "en": "At some point you're just throwing good money after bad.",
                "ja": "どこかで、損を取り返そうとして金をつぎ込むだけになる。",
                "mode": "exact",
                "card": {
                    "id": "dmoMUcla",
                    "date": "2026-10-05",
                    "text": "At some point you're just throwing good money after bad."
                }
            },
            {
                "kind": "bridge",
                "en": "Fast, targeted help, like cash for people who lose their jobs or tax cuts for small businesses, reaches people while the recession is still happening.",
                "ja": "職を失った人への給付や中小企業の減税のような、速くて的を絞った支援なら、不況のさなかに人に届く。",
                "expr": "targeted",
                "note": "的を絞った。targeted support / targeted ads。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, trust.",
                "ja": "でも一番大事なのは、信頼だ。"
            },
            {
                "kind": "bridge",
                "en": "Spending only helps if people trust that the money is being used well.",
                "ja": "支出が役に立つのは、金がうまく使われていると人が信じる場合だけだ。"
            },
            {
                "kind": "card",
                "en": "If it's taxpayer or donor money, they owe you a clear account of where it went.",
                "ja": "税金や寄付の金なら、どこへ行ったかをはっきり説明する義務がある。",
                "mode": "trim",
                "card": {
                    "id": "q8bRHMfw",
                    "date": "2026-06-26",
                    "text": "If it's taxpayer or donor money, they owe you a clear account of where it went."
                }
            },
            {
                "kind": "bridge",
                "en": "Without that account, people assume the worst, and they save instead of spend.",
                "ja": "その説明が無ければ、人は最悪を想定し、使わずに貯める。",
                "expr": "assume the worst",
                "note": "最悪の事態を想定する。"
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
                "kind": "bridge",
                "en": "That means a recession is partly a crisis of confidence, and pouring in money that nobody can track can make confidence worse, not better.",
                "ja": "つまり不況は、一部は信頼の危機だ。誰も追えない金を注ぎ込めば、信頼は良くなるどころか悪くなりうる。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "There does need to be some kind of safety net, but continually giving out money to people who aren't working is economic suicide.",
                "ja": "何らかの安全網は確かに要る。でも働いていない人に金を配り続けるのは、経済的な自殺だ。",
                "mode": "exact",
                "card": {
                    "id": "a56YDFMr",
                    "date": "2026-10-18",
                    "text": "There does need to be some kind of safety net, but continually giving out money to people who aren't working is economic suicide."
                }
            },
            {
                "kind": "card",
                "en": "It really boils down to finding a happy medium.",
                "ja": "結局は、ちょうどいい落としどころを見つけることに尽きる。",
                "mode": "exact",
                "card": {
                    "id": "B3xYiadR",
                    "date": "2026-10-18",
                    "text": "It really boils down to finding a happy medium."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and trust, fast, small, and transparent support beats big spending.",
                "ja": "まとめると、お金、時間、そして信頼の理由で、速く、小さく、透明な支援の方が、大きな支出に勝つ。",
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
                "kind": "card",
                "en": "I would argue that a modest tax on sugary drinks is justified, as long as the revenue goes back into health.",
                "ja": "税収が健康に戻るなら、砂糖入り飲料への控えめな課税は正当だと言いたい。",
                "mode": "exact",
                "card": {
                    "id": "DQqggUOG",
                    "date": "2026-10-16",
                    "text": "I would argue that a modest tax on sugary drinks is justified, as long as the revenue goes back into health."
                }
            },
            {
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, fairness.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な公平。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "A tax works because price changes behavior.",
                "ja": "税が効くのは、値段が行動を変えるからだ。"
            },
            {
                "kind": "card",
                "en": "A small tax nudges people toward more positive lifestyle choices.",
                "ja": "少しの税が、人をより良い生活の選択へ軽く押す。",
                "mode": "exact",
                "card": {
                    "id": "IOEIkFCn",
                    "date": "2026-10-16",
                    "text": "A small tax nudges people toward more positive lifestyle choices."
                }
            },
            {
                "kind": "bridge",
                "en": "Right now, the price pushes people the wrong way.",
                "ja": "今は、値段が人を逆の方向に押している。"
            },
            {
                "kind": "card",
                "en": "Sugary drinks are cheap, they're everywhere, and they're marketed directly to children.",
                "ja": "砂糖入り飲料は安く、どこにでもあり、子ども向けに直接売られている。",
                "mode": "exact",
                "card": {
                    "id": "pAaS446E",
                    "date": "2026-10-16",
                    "text": "Sugary drinks are cheap, they're everywhere, and they're marketed directly to children."
                }
            },
            {
                "kind": "bridge",
                "en": "A small tax on sugary drinks corrects that without banning anything.",
                "ja": "砂糖入り飲料への少しの税は、何も禁止せずにそれを正す。"
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
                "en": "The benefits of the tax build up slowly, which is exactly why we should start now.",
                "ja": "税の効果はゆっくり積み上がる。だからこそ今始めるべきだ。"
            },
            {
                "kind": "card",
                "en": "While it may seem like a small change, it adds up over a year.",
                "ja": "小さな変化に見えても、1年で積み上がる。",
                "mode": "exact",
                "card": {
                    "id": "hUsX-Nr8",
                    "date": "2026-10-16",
                    "text": "While it may seem like a small change, it adds up over a year."
                }
            },
            {
                "kind": "bridge",
                "en": "A can a day less for one child means years of better health by the time that child grows up.",
                "ja": "子ども1人が1日1缶減らせば、その子が大人になる頃には何年分もの健康の差になる。"
            },
            {
                "kind": "card",
                "en": "Our society devalues prevention, and this is a small step to change that.",
                "ja": "私たちの社会は予防を軽く見ている。これはそれを変える小さな一歩だ。",
                "mode": "exact",
                "card": {
                    "id": "hY7Qvafa",
                    "date": "2026-10-16",
                    "text": "Our society devalues prevention, and this is a small step to change that."
                }
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, fairness.",
                "ja": "でも一番大事なのは、公平だ。"
            },
            {
                "kind": "bridge",
                "en": "Some people say a sugar tax is unfair to consumers. I'd say the current system is the unfair one.",
                "ja": "砂糖税は消費者に不公平だと言う人がいる。私は、今の仕組みの方が不公平だと思う。"
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
                "kind": "bridge",
                "en": "So people who never drink soda are already paying for it through their health insurance.",
                "ja": "つまり、ソーダを飲まない人も、健康保険を通じてすでにその分を払っている。",
                "expr": "pay for it through ~",
                "note": "〜を通じて払う(間接的な負担)。"
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
                "en": "A sugar tax simply asks the people who buy the drinks to carry more of that cost.",
                "ja": "砂糖税は、飲み物を買う人にその費用をもう少し多く持ってもらうだけだ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Admittedly, a sugar tax can easily impose a hidden tax on ordinary families.",
                "ja": "たしかに、砂糖税は普通の家庭に隠れた税を簡単に課しうる。",
                "mode": "slot",
                "card": {
                    "id": "2eCRnuSX",
                    "date": "2026-09-15",
                    "text": "X can easily impose a hidden tax on ordinary families."
                }
            },
            {
                "kind": "bridge",
                "en": "That's why the money has to go back to those families, for example as healthier school lunches or cheaper fruit and vegetables.",
                "ja": "だから税収は、たとえば健康的な給食や安い果物と野菜として、その家庭に戻らなければならない。"
            },
            {
                "kind": "card",
                "en": "So, to be clear, the goal is not punishment but prevention.",
                "ja": "はっきり言えば、目的は罰ではなく予防だ。",
                "mode": "exact",
                "card": {
                    "id": "hY7Qvafa",
                    "date": "2026-10-16",
                    "text": "So, to be clear, the goal is not punishment but prevention."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, a modest sugar tax is worth it.",
                "ja": "まとめると、お金、時間、そして公平の理由で、控えめな砂糖税にはその価値がある。",
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
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, fairness.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な公平。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Without unions, workers have almost no power to push wages up.",
                "ja": "組合が無ければ、働く人には賃金を押し上げる力がほとんど無い。"
            },
            {
                "kind": "card",
                "en": "The big always eat the small — that's inevitable in a capitalist world.",
                "ja": "大きい者はいつも小さい者を食う。資本主義の世界では避けられない。",
                "mode": "exact",
                "card": {
                    "id": "oF46St5H",
                    "date": "2026-08-21",
                    "text": "The big always eat the small — that's inevitable in a capitalist world."
                }
            },
            {
                "kind": "bridge",
                "en": "One worker cannot negotiate with a big company. Thousands of workers together can.",
                "ja": "働き手1人では大企業と交渉できない。何千人がまとまればできる。"
            },
            {
                "kind": "card",
                "en": "They should pay the lower-level workers more rather than pay the CEO less.",
                "ja": "トップの給料を下げるより、下の働き手の給料を上げるべきだ。",
                "mode": "exact",
                "card": {
                    "id": "qwlS3TGt",
                    "date": "2026-10-16",
                    "text": "They should pay the lower-level workers more rather than pay the CEO less."
                }
            },
            {
                "kind": "bridge",
                "en": "A union is the tool that actually makes that happen.",
                "ja": "組合は、それを実際に起こす道具だ。"
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
                "kind": "card",
                "en": "People burn out, they leave, and companies have to start from scratch with new staff.",
                "ja": "人は燃え尽きて辞め、会社は新しい人とゼロからやり直すことになる。",
                "mode": "exact",
                "card": {
                    "id": "NZtN8iSl",
                    "date": "2026-10-15",
                    "text": "People burn out, they leave, and companies have to start from scratch with new staff."
                }
            },
            {
                "kind": "bridge",
                "en": "By limiting overtime, unions help workers stay healthy and help companies keep the people they trained.",
                "ja": "残業を制限することで、組合は働く人の健康を守り、会社が育てた人を手放さずに済むようにする。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, fairness.",
                "ja": "でも一番大事なのは、公平だ。"
            },
            {
                "kind": "bridge",
                "en": "The workers who are treated worst are usually the ones with no one to speak for them.",
                "ja": "一番ひどい扱いを受ける働き手は、たいてい代わりに声を上げてくれる人がいない人たちだ。"
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
                "kind": "bridge",
                "en": "Japanese anime makes huge profits worldwide, but very little of it reaches the people who draw it.",
                "ja": "日本のアニメは世界中で大きな利益を生むが、描いている人にはほとんど届かない。"
            },
            {
                "kind": "card",
                "en": "Big companies do whatever they can get away with.",
                "ja": "大企業は、許される限りのことは何でもする。",
                "mode": "exact",
                "card": {
                    "id": "aqNKgGK2",
                    "date": "2026-10-08",
                    "text": "Big companies do whatever they can get away with."
                }
            },
            {
                "kind": "card",
                "en": "In the end, ordinary people pay the price.",
                "ja": "結局、代償を払うのは普通の人だ。",
                "mode": "exact",
                "card": {
                    "id": "5hHTCYuj",
                    "date": "2026-10-13",
                    "text": "In the end, ordinary people pay the price."
                }
            },
            {
                "kind": "bridge",
                "en": "A strong union is how ordinary workers get a fair share of what they help create.",
                "ja": "強い組合は、普通の働き手が、自分が生み出すのを助けたものから公平な分け前を得る方法だ。",
                "expr": "a fair share",
                "note": "公平な分け前。pay your fair share = 自分の分をきちんと払う。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Obviously they need to exist, but it's a balancing act again.",
                "ja": "もちろん組合は必要だ。でも、また釣り合いの問題だ。",
                "mode": "exact",
                "card": {
                    "id": "tZ1Hu-3f",
                    "date": "2026-10-18",
                    "text": "Obviously they need to exist, but it's a balancing act again."
                }
            },
            {
                "kind": "bridge",
                "en": "Unions can go too far, for example when strikes stop ambulances, so they need limits too.",
                "ja": "組合も行きすぎることがある。たとえばストで救急車が止まるときだ。だから組合にも限度が要る。"
            },
            {
                "kind": "card",
                "en": "It can work both ways.",
                "ja": "どちらにも転びうる。",
                "mode": "exact",
                "card": {
                    "id": "n2rgIZms",
                    "date": "2026-10-18",
                    "text": "It can work both ways."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, workers still need strong unions.",
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
                "en": "I believe Japan should welcome more foreign workers.",
                "ja": "日本はもっと多くの外国人労働者を受け入れるべきだと思う。"
            },
            {
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, fairness.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な公平。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Foreign workers are not a cost to Japan. They add to the economy.",
                "ja": "外国人労働者は日本にとって費用ではない。経済に上乗せする存在だ。"
            },
            {
                "kind": "card",
                "en": "Study after study finds that newcomers pay in more than they receive.",
                "ja": "研究に次ぐ研究で、新しく来た人は受け取るより多く払っていると分かっている。",
                "mode": "exact",
                "card": {
                    "id": "58A52g13",
                    "date": "2026-08-31",
                    "text": "Study after study finds that newcomers pay in more than they receive."
                }
            },
            {
                "kind": "card",
                "en": "Newcomers open businesses and fill gaps which locals cannot fill.",
                "ja": "新しく来た人は商売を始め、地元の人が埋められない隙間を埋める。",
                "mode": "exact",
                "card": {
                    "id": "nVZdBJvk",
                    "date": "2026-08-31",
                    "text": "Newcomers open businesses and fill gaps which locals cannot fill."
                }
            },
            {
                "kind": "bridge",
                "en": "So welcoming more foreign workers means more taxes and more businesses, not fewer jobs for Japanese people.",
                "ja": "だから外国人労働者を増やすことは、税金と事業が増えることであって、日本人の仕事が減ることではない。"
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
                "en": "Japan also does not have time to wait.",
                "ja": "日本には待つ時間も無い。"
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
                "kind": "bridge",
                "en": "Even if the birth rate went up tomorrow, those babies would not be working for twenty years.",
                "ja": "仮に明日出生率が上がっても、その赤ん坊が働くのは20年後だ。"
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
                "en": "Foreign workers are the only way to fill the gap now, not in a generation.",
                "ja": "外国人労働者は、一世代後ではなく今、穴を埋める唯一の方法だ。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, fairness.",
                "ja": "でも一番大事なのは、公平だ。"
            },
            {
                "kind": "bridge",
                "en": "But if Japan needs these workers, it has to treat them fairly, and right now it often does not.",
                "ja": "でも日本がこの人たちを必要とするなら、公平に扱わなければならない。そして今、そうなっていないことが多い。"
            },
            {
                "kind": "card",
                "en": "The irony is the so-called illegal immigrants work harder and are paid less, so employers depend on them.",
                "ja": "皮肉なことに、いわゆる不法移民はよく働き、給料は安い。だから雇い主は彼らに頼っている。",
                "mode": "exact",
                "card": {
                    "id": "hd6ZtMDE",
                    "date": "2026-07-01",
                    "text": "The irony is the so-called illegal immigrants work harder and are paid less, so employers depend on them."
                }
            },
            {
                "kind": "card",
                "en": "Healthcare and agriculture increasingly depend on foreign workers.",
                "ja": "医療と農業は、ますます外国人労働者に頼っている。",
                "mode": "exact",
                "card": {
                    "id": "Iwv2K2e5",
                    "date": "2026-08-31",
                    "text": "Healthcare and agriculture increasingly depend on foreign workers."
                }
            },
            {
                "kind": "bridge",
                "en": "Depending on people while paying them less is not a plan. It is exploitation, and it will drive good workers to other countries.",
                "ja": "人に頼りながら給料を安くするのは計画ではない。搾取であり、良い働き手を他の国へ追いやる。"
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
                "en": "Welcoming more workers, with the same pay and the same rights as Japanese workers, is both fair and smart.",
                "ja": "日本人と同じ給料と同じ権利で働き手を迎えることは、公平で、しかも賢い。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Admittedly, some people argue that immigrants strain public services.",
                "ja": "たしかに、移民が公共サービスを圧迫すると言う人もいる。",
                "mode": "slot",
                "card": {
                    "id": "y9ZTxirR",
                    "date": "2026-08-31",
                    "text": "Some people argue that immigrants strain public services."
                }
            },
            {
                "kind": "bridge",
                "en": "That is a real concern, but it is a reason to plan for schools and hospitals, not a reason to close the door.",
                "ja": "それは本物の懸念だ。でもそれは学校や病院の計画を立てる理由で、扉を閉める理由ではない。"
            },
            {
                "kind": "card",
                "en": "You have to strike a balance.",
                "ja": "釣り合いを取らなければならない。",
                "mode": "exact",
                "card": {
                    "id": "XEy5icQa",
                    "date": "2026-08-11",
                    "text": "You have to strike a balance."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and fairness, Japan should welcome more foreign workers.",
                "ja": "まとめると、お金、時間、そして公平の理由で、日本はもっと多くの外国人労働者を受け入れるべきだ。",
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
                "en": "I believe rich countries should pay to protect nature in poorer countries.",
                "ja": "豊かな国は、貧しい国の自然を守るために金を出すべきだと思う。"
            },
            {
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, fairness.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な公平。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Paying to protect forests now is far cheaper than paying for disasters later.",
                "ja": "今、森を守るために払う方が、あとで災害に払うよりずっと安い。"
            },
            {
                "kind": "card",
                "en": "Prevention is always cheaper than recovery.",
                "ja": "予防はいつも回復より安い。",
                "mode": "exact",
                "card": {
                    "id": "9dnBFQU_",
                    "date": "2026-10-06",
                    "text": "Prevention is always cheaper than recovery."
                }
            },
            {
                "kind": "card",
                "en": "It is not going to make as big of a dent in the climate crisis as protecting our existing forest.",
                "ja": "今ある森を守ることほど、気候危機に大きな打撃を与えるものはない。",
                "mode": "exact",
                "card": {
                    "id": "kRm6MpW7",
                    "date": "2026-08-08",
                    "text": "It is not going to make as big of a dent in the climate crisis as protecting our existing forest."
                }
            },
            {
                "kind": "bridge",
                "en": "Most of the world's remaining forests are in poorer countries, so rich countries get a good deal when they pay to keep them standing.",
                "ja": "世界に残る森の多くは貧しい国にある。だから豊かな国が森を残すために払うのは、得な取引だ。",
                "expr": "a good deal",
                "note": "得な取引、お買い得。"
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
                "en": "And we cannot wait, because a forest cannot be rebuilt quickly.",
                "ja": "そして待てない。森は早く作り直せないからだ。"
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
                "kind": "bridge",
                "en": "Even if that is partly true, every forest we save today still slows the damage. That is a reason to pay now, not to give up.",
                "ja": "それが一部当たっていても、今日守る森1つ1つが被害を遅らせる。それは今払う理由であって、あきらめる理由ではない。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, fairness.",
                "ja": "でも一番大事なのは、公平だ。"
            },
            {
                "kind": "bridge",
                "en": "Rich countries also have a responsibility, because they caused most of the damage.",
                "ja": "豊かな国には責任もある。被害の大部分を起こしたのは彼らだからだ。"
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
                "en": "Now they ask poorer countries not to cut down their forests, even though those countries need the money from farming and logging.",
                "ja": "今その国々は、貧しい国に森を切るなと頼んでいる。貧しい国は農業や伐採の金を必要としているのに。"
            },
            {
                "kind": "card",
                "en": "Meaningful aid today is not mere generosity but a just repayment of historical debt.",
                "ja": "今日の意味ある援助は、ただの気前のよさではなく、歴史の借りの正当な返済だ。",
                "mode": "trim",
                "card": {
                    "id": "FU7ZCNSO",
                    "date": "2026-08-05",
                    "text": "For instance, many former colonial powers grew rich through exploitation, demonstrating that meaningful aid today is not mere generosity but a just repayment of historical debt."
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
                "en": "When floods and droughts come, the poor suffer first, so paying to protect their nature is simply fair.",
                "ja": "洪水や干ばつが来ると、まず苦しむのは貧しい人だ。だから彼らの自然を守るために払うのは、単に公平なことだ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Admittedly, we have to monitor it closely and set new standards for watching shady NGOs and where the money's going.",
                "ja": "たしかに、怪しい NGO と金の行き先を見張る新しい基準を作り、しっかり監視しなければならない。",
                "mode": "slot",
                "card": {
                    "id": "cYISfDPi",
                    "date": "2026-10-20",
                    "text": "I think we can monitor it closely and set new standards for watching shady NGOs and where the money's going."
                }
            },
            {
                "kind": "bridge",
                "en": "So rich countries should pay, but pay for results, such as forest area that is actually protected.",
                "ja": "だから豊かな国は払うべきだ。ただし、実際に守られた森の面積のような結果に対して払う。"
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
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, freedom.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な自由。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Mass monitoring costs a lot of money, and a lot of that money goes to companies that profit from fear.",
                "ja": "大規模な監視には大金がかかり、その多くは恐れで儲ける会社に流れる。"
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
                "en": "It also creates a huge pile of personal data, which becomes a target itself.",
                "ja": "それはまた個人データの巨大な山を作り、その山自体が標的になる。"
            },
            {
                "kind": "card",
                "en": "Every concealed data leak undermines public trust in the institutions that hold our records.",
                "ja": "隠されたデータ漏えいが1つ起きるたびに、記録を持つ機関への信頼が崩れる。",
                "mode": "exact",
                "card": {
                    "id": "aNFx5HxV",
                    "date": "2026-09-05",
                    "text": "Every concealed data leak undermines public trust in the institutions that hold our records."
                }
            },
            {
                "kind": "bridge",
                "en": "That money would do more good if it paid for detectives who investigate real suspects.",
                "ja": "その金は、実際の容疑者を調べる刑事に使った方が役に立つ。"
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
                "en": "Monitoring also tends to grow over time and never shrink.",
                "ja": "監視は時間とともに広がり、縮むことがない傾向もある。"
            },
            {
                "kind": "card",
                "en": "Government surveillance has expanded dramatically in the name of security.",
                "ja": "政府の監視は、安全の名のもとに劇的に広がった。",
                "mode": "trim",
                "card": {
                    "id": "r1kzLpKr",
                    "date": "2026-07-14",
                    "text": "Second, government surveillance has expanded dramatically in the name of security."
                }
            },
            {
                "kind": "card",
                "en": "Technology evolves far faster than regulation can keep pace.",
                "ja": "技術は、規制が追いつけないほど速く進化する。",
                "mode": "trim",
                "card": {
                    "id": "C0k5Z2Z8",
                    "date": "2026-07-14",
                    "text": "However, technology evolves far faster than regulation can keep pace."
                }
            },
            {
                "kind": "bridge",
                "en": "So powers given for one crisis stay in place for years, and the rules that should limit them are always behind.",
                "ja": "だから1つの危機のために与えた権限は何年も残り、それを制限するはずのルールはいつも遅れている。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, freedom.",
                "ja": "でも一番大事なのは、自由だ。"
            },
            {
                "kind": "bridge",
                "en": "The biggest cost of monitoring is that people stop speaking freely when they know they are being watched.",
                "ja": "監視の一番大きな代償は、見られていると知ると、人が自由に話さなくなることだ。"
            },
            {
                "kind": "card",
                "en": "Blanket surveillance curbs the freedom of citizens to speak their minds.",
                "ja": "一律の監視は、市民が思ったことを言う自由を抑えつける。",
                "mode": "exact",
                "card": {
                    "id": "gD06T8K5",
                    "date": "2026-09-05",
                    "text": "Blanket surveillance curbs the freedom of citizens to speak their minds."
                }
            },
            {
                "kind": "card",
                "en": "Cameras, facial recognition, and communication monitoring have become commonplace in many countries.",
                "ja": "カメラ、顔認識、通信の監視は、多くの国で当たり前になった。",
                "mode": "exact",
                "card": {
                    "id": "TvPS4kna",
                    "date": "2026-07-14",
                    "text": "Cameras, facial recognition, and communication monitoring have become commonplace in many countries."
                }
            },
            {
                "kind": "bridge",
                "en": "Once that becomes normal, it is very hard to roll back, even when the government changes.",
                "ja": "それが当たり前になると、政府が変わっても元に戻すのはとても難しい。",
                "expr": "roll back",
                "note": "元に戻す、撤回する。"
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
                "en": "In other words, protecting the system is the government's job, but reading what everyone writes is not.",
                "ja": "つまり、仕組みを守るのは政府の仕事だが、全員が書くものを読むのはそうではない。",
                "expr": "In other words,",
                "note": "「言い換えると」。比喩を平たく言い直す。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Admittedly, stronger laws can offer some protection.",
                "ja": "たしかに、強い法律はある程度の守りになる。",
                "mode": "exact",
                "card": {
                    "id": "jMmAankp",
                    "date": "2026-07-14",
                    "text": "Admittedly, stronger laws can offer some protection."
                }
            },
            {
                "kind": "bridge",
                "en": "So the police should be able to check a specific suspect with a warrant from a judge, but not watch everyone just in case.",
                "ja": "だから警察は、裁判官の令状で特定の容疑者を調べられるべきだ。でも念のために全員を見張るべきではない。",
                "expr": "just in case",
                "note": "念のため。"
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and freedom, governments should not monitor everyone online.",
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
                "en": "I believe ordinary people can really change politics, but mostly at the local level.",
                "ja": "普通の人々は本当に政治を変えられると思う。ただし主に地域のレベルで。"
            },
            {
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, trust.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な信頼。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "It is true that money has a huge influence on politics.",
                "ja": "金が政治に大きな影響を持つのは本当だ。"
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
                "en": "But money still has to win votes, and ordinary people are the ones who cast them, so they still hold the final say.",
                "ja": "でも金は票を勝ち取らなければならず、票を入れるのは普通の人々だ。だから最後の決定権はまだ彼らにある。",
                "expr": "have the final say",
                "note": "最終決定権を持つ。"
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
                "en": "Ordinary people matter even more now, because so many elections are close.",
                "ja": "今は普通の人々がいっそう大事だ。接戦の選挙がとても多いからだ。"
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
                "en": "A few hundred volunteers spending their weekends knocking on doors can change the result, and that is how ordinary people change politics.",
                "ja": "週末に戸別訪問をする数百人のボランティアが結果を変えうる。それが、普通の人々が政治を変える方法だ。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, trust.",
                "ja": "でも一番大事なのは、信頼だ。"
            },
            {
                "kind": "bridge",
                "en": "Real change also needs trust, and trust is easiest to build close to home.",
                "ja": "本当の変化には信頼も要る。そして信頼は身近な所で一番築きやすい。"
            },
            {
                "kind": "card",
                "en": "But at a local level, from the ground up, we can still believe in politicians.",
                "ja": "でも地域のレベルなら、足元からなら、まだ政治家を信じられる。",
                "mode": "exact",
                "card": {
                    "id": "pZs1DVVg",
                    "date": "2026-10-13",
                    "text": "But at a local level, from the ground up, we can still believe in politicians."
                }
            },
            {
                "kind": "card",
                "en": "We monitor them closely after they're elected, so there's little chance for them to exploit the system.",
                "ja": "当選したあとも近くで見張るので、仕組みを悪用する余地はほとんど無い。",
                "mode": "exact",
                "card": {
                    "id": "pZs1DVVg",
                    "date": "2026-10-13",
                    "text": "We monitor them closely after they're elected, so there's little chance for them to exploit the system."
                }
            },
            {
                "kind": "bridge",
                "en": "Voters are not perfect, of course.",
                "ja": "もちろん有権者も完璧ではない。"
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
                "en": "That is why the most important thing ordinary people can do is not just vote, but keep watching after the election.",
                "ja": "だから普通の人々にできる一番大事なことは、投票するだけでなく、選挙のあとも見張り続けることだ。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Unfortunately, people in their 60s and 70s are the majority, and they have a lot of influence on election results.",
                "ja": "残念ながら、60代と70代が多数派で、選挙結果に大きな影響を持っている。",
                "mode": "exact",
                "card": {
                    "id": "kbfuo_8I",
                    "date": "2026-10-13",
                    "text": "Unfortunately, people in their 60s and 70s are the majority, and they have a lot of influence on election results."
                }
            },
            {
                "kind": "bridge",
                "en": "That makes national politics slow to change, so young people should start in their own towns.",
                "ja": "そのせいで国の政治は変わるのが遅い。だから若い人は自分の町から始めるべきだ。"
            },
            {
                "kind": "card",
                "en": "But at a local level, it's promising.",
                "ja": "でも地域のレベルなら、望みがある。",
                "mode": "exact",
                "card": {
                    "id": "szaLGI9n",
                    "date": "2026-10-13",
                    "text": "But at a local level, it's promising."
                }
            },
            {
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and trust, ordinary people can change politics, one town at a time.",
                "ja": "まとめると、お金、時間、そして信頼の理由で、普通の人々は政治を変えられる。1つの町ずつ。",
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
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, freedom.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な自由。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Strict rules for AI would be expensive to follow, and only the biggest companies could pay.",
                "ja": "AI への厳しい規制は従うのに金がかかり、払えるのは一番大きな会社だけだ。"
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
                "en": "So strict control would not tame the tech giants. It would protect them from smaller competitors.",
                "ja": "だから厳しい管理は巨大企業を手なずけない。小さな競争相手から巨大企業を守ることになる。",
                "expr": "tame",
                "note": "手なずける、抑え込む。"
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
                "en": "Strict laws are also too slow for AI.",
                "ja": "厳しい法律は AI にとって遅すぎもする。"
            },
            {
                "kind": "card",
                "en": "That law would be completely redundant by the time it got into service.",
                "ja": "その法律は、使われ始める頃にはまったく無用になっている。",
                "mode": "slot",
                "card": {
                    "id": "vON8FdPv",
                    "date": "2026-09-21",
                    "text": "That technology would be completely redundant by the time it got into service."
                }
            },
            {
                "kind": "bridge",
                "en": "AI changes every few months, but a law takes years to write, so detailed rules would control yesterday's technology.",
                "ja": "AI は数か月ごとに変わるが、法律を作るには何年もかかる。だから細かい規制は昨日の技術を管理することになる。"
            },
            {
                "kind": "card",
                "en": "AI is learning from us, and we're learning from it at the same time.",
                "ja": "AI は私たちから学び、私たちも同時に AI から学んでいる。",
                "mode": "exact",
                "card": {
                    "id": "pDQxeSep",
                    "date": "2026-10-20",
                    "text": "AI is learning from us, and we're learning from it at the same time."
                }
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, freedom.",
                "ja": "でも一番大事なのは、自由だ。"
            },
            {
                "kind": "bridge",
                "en": "If the government strictly controls what AI can say, it also controls what millions of people can ask and learn.",
                "ja": "政府が AI の言えることを厳しく管理すれば、何百万人が聞けることと学べることも管理することになる。"
            },
            {
                "kind": "card",
                "en": "Any kind of censorship violates a person's right to express their views.",
                "ja": "どんな検閲も、人が意見を言う権利を侵す。",
                "mode": "trim",
                "card": {
                    "id": "ZM1JFoqx",
                    "date": "2026-10-20",
                    "text": "Personally, I think any kind of censorship violates a person's right to express their views."
                }
            },
            {
                "kind": "bridge",
                "en": "The better answer is to let people use AI, argue with it, and judge it for themselves.",
                "ja": "もっと良い答えは、人々に AI を使わせ、言い返させ、自分で判断させることだ。"
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
                "kind": "card",
                "en": "I asked AI to criticize me brutally and question me.",
                "ja": "私は AI に、容赦なく批判して質問攻めにしてくれと頼んだ。",
                "mode": "exact",
                "card": {
                    "id": "9N5klhk4",
                    "date": "2026-10-20",
                    "text": "I asked AI to criticize me brutally and question me."
                }
            },
            {
                "kind": "bridge",
                "en": "A tool I can argue with makes me think harder, and that only works if the tool is free to disagree with me.",
                "ja": "言い返せる道具は私をもっと考えさせる。それは道具が私に反対する自由を持っている場合にしか成り立たない。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Nevertheless, this risk argues for careful, narrowly defined limits rather than for abandoning all regulation.",
                "ja": "それでも、この危険は、規制を全部捨てることではなく、慎重で範囲を絞った制限を求めている。",
                "mode": "exact",
                "card": {
                    "id": "9iOBlhZ7",
                    "date": "2026-07-26",
                    "text": "Nevertheless, this risk argues for careful, narrowly defined limits rather than for abandoning all regulation."
                }
            },
            {
                "kind": "bridge",
                "en": "So there should be clear basic rules, for example against deepfake scams, but not strict control of the technology itself.",
                "ja": "だから、たとえばディープフェイク詐欺を禁じるような、はっきりした基本のルールはあるべきだ。でも技術そのものを厳しく管理すべきではない。"
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
                "kind": "card",
                "en": "I'll discuss three points: money, time, and most importantly, nature.",
                "ja": "3つの点を話す。お金、時間、そして一番大事な自然。",
                "mode": "slot",
                "card": {
                    "id": "Ul8RQ2Yx",
                    "date": "2026-10-16",
                    "text": "I'll discuss three points: cost, speed, and safety."
                }
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
                "en": "Acting on climate costs money, but not acting costs more.",
                "ja": "気候に対して行動すれば金がかかる。でも行動しない方がもっと高くつく。"
            },
            {
                "kind": "card",
                "en": "Investing in prevention today represents a prudent and responsible financial choice.",
                "ja": "今日予防に投資することは、賢明で責任ある金の使い方だ。",
                "mode": "trim",
                "card": {
                    "id": "_9c5csvi",
                    "date": "2026-08-03",
                    "text": "As a result, investing in prevention today represents a prudent and responsible financial choice."
                }
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
            },
            {
                "kind": "bridge",
                "en": "A slower economy for a few years is cheaper than rebuilding cities after floods and paying for crops lost to heat.",
                "ja": "数年間の経済の減速は、洪水のあとに町を建て直し、暑さでだめになった作物の分を払うより安い。"
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
                "en": "Every year we wait makes the problem bigger, because small amounts of pollution add up.",
                "ja": "待つ1年ごとに問題は大きくなる。少しの汚染が積み上がるからだ。"
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
                "en": "The same is true of emissions, so the cheapest time to act is now.",
                "ja": "排出も同じだ。だから一番安く行動できるのは今だ。"
            }
        ],
        "c": [
            {
                "kind": "frame",
                "en": "But most importantly, nature.",
                "ja": "でも一番大事なのは、自然だ。"
            },
            {
                "kind": "bridge",
                "en": "Most importantly, nature cannot wait for the economy to feel ready.",
                "ja": "一番大事なのは、自然は経済の準備ができるのを待ってくれないことだ。"
            },
            {
                "kind": "card",
                "en": "By constantly developing, we're destroying entire ecosystems in the name of progress.",
                "ja": "開発を続けることで、私たちは進歩の名のもとに生態系をまるごと壊している。",
                "mode": "exact",
                "card": {
                    "id": "APVt9qo2",
                    "date": "2026-09-19",
                    "text": "By constantly developing, we're destroying entire ecosystems in the name of progress."
                }
            },
            {
                "kind": "card",
                "en": "Recent record heatwaves across Europe caused thousands of deaths.",
                "ja": "最近、ヨーロッパで記録的な熱波が何千人もの死者を出した。",
                "mode": "trim",
                "card": {
                    "id": "aaGwT49P",
                    "date": "2026-08-03",
                    "text": "For instance, recent record heatwaves across Europe caused thousands of deaths, demonstrating that inaction carries an unacceptable human cost."
                }
            },
            {
                "kind": "bridge",
                "en": "Japan is seeing the same thing, with dangerous summer heat every year.",
                "ja": "日本でも同じことが起きていて、毎年夏に危険な暑さがある。"
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
                "en": "Our children cannot vote today, so the government has to protect their environment for them.",
                "ja": "子どもたちは今日投票できない。だから政府が代わりに彼らの環境を守らなければならない。"
            }
        ],
        "close": [
            {
                "kind": "card",
                "en": "Climate change is a matter of secondary importance to most people.",
                "ja": "ほとんどの人にとって、気候変動は二の次の問題だ。",
                "mode": "exact",
                "card": {
                    "id": "4WHLPeCB",
                    "date": "2026-09-06",
                    "text": "Climate change is a matter of secondary importance to most people."
                }
            },
            {
                "kind": "bridge",
                "en": "That is understandable, because rent and food feel more urgent. That is exactly why governments, not individuals, have to lead.",
                "ja": "それは分かる。家賃や食費の方が差し迫って感じるからだ。だからこそ、個人ではなく政府が先頭に立たなければならない。"
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
                "kind": "card",
                "en": "So, to sum up my take on this: because of money, time, and nature, governments should act on climate change now.",
                "ja": "まとめると、お金、時間、そして自然の理由で、政府は今、気候変動に対して行動すべきだ。",
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
