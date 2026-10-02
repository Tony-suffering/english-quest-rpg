// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/speak-eiken1.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * スピークパス / SPEAKPASS -- 英検1級 2次面接 模範スピーチ 30日(アウトプット限定の英検対策)。
 *
 * ライトパス(書く)の音声版。2次面接=自由会話→スピーチ(1分準備/2分)→Q&A(4問)。
 * 完璧な模範スピーチを毎日1本、音読・シャドーイングして型と表現を口に焼きつける。
 * 考えさせない=なぞるだけで、本番で勝手に口が動く。
 *
 * 第1バッチ: 30トピックの模範スピーチ + Q&A + 必須表現。
 */

export interface SpeakKeyExpression {
    en: string;
    ja: string;
    note: string;
}

export interface SpeakQA {
    q: string;  // 試験官の追加質問
    a: string;  // 模範の短い回答
}

export interface EikenSpeech {
    day: number;
    category: string;     // 社会/科学技術/環境/教育/倫理 等
    topic: string;        // スピーチのお題(英語原文)
    topicJa: string;
    stance: string;       // とる立場
    speech: string;       // 模範スピーチ(2分≒220-280語)。段落は \n\n 区切り
    speechJa: string;     // 日本語訳
    wordCount: number;
    qa: SpeakQA[];        // スピーチ後のQ&A(4問)
    keyExpressions: SpeakKeyExpression[];
    tip: string;          // その日のスピーキングのコツ
}

export const TOTAL_DAYS = 30;
export const START_DATE = new Date(2026, 5, 29); // June 29, 2026 = Day 1

export const EIKEN1_SPEECHES: EikenSpeech[] = [
    {
        day: 1, category: "社会・倫理",
        topic: "Should the death penalty be abolished?",
        topicJa: "死刑は廃止すべきか",
        stance: "Yes — it should be abolished",
        speech: "I firmly believe that the death penalty should be abolished. While I understand the desire for justice, I think capital punishment creates more problems than it solves. There are two main reasons for this.\n\nThe first reason is the risk of executing innocent people. No justice system is perfect, and wrongful convictions do happen. Take the United States, for instance, where more than a hundred and fifty death row inmates have been exonerated in recent decades, sometimes thanks to new DNA evidence. Once a person has been executed, that mistake can never be undone. To me, even one innocent death is too high a price to pay.\n\nSecondly, there is little evidence that the death penalty actually deters crime. Many countries that have abolished it, such as Canada and most of Europe, have not seen their murder rates rise as a result. This suggests that harsh punishment is not what stops violent crime; rather, factors like poverty and a reliable police presence matter far more.\n\nFor these reasons, I am convinced that the death penalty should be abolished. A modern society should focus on preventing crime and protecting the innocent, not on taking lives in the name of justice.",
        speechJa: "私は死刑は廃止すべきだと固く信じています。正義を求める気持ちは理解できますが、死刑は解決する以上の問題を生み出すと思います。理由は主に二つあります。\n\n一つ目の理由は、無実の人を処刑してしまう危険です。完璧な司法制度は存在せず、冤罪は実際に起こります。例えばアメリカでは、近年だけで百五十人以上の死刑囚が、時に新たなDNA鑑定のおかげで無罪を証明されています。一度処刑してしまえば、その誤りは二度と取り返せません。私にとっては、たった一人の無実の死でさえ、払うには高すぎる代償です。\n\n二つ目に、死刑が実際に犯罪を抑止するという証拠はほとんどありません。カナダや欧州の大半など、死刑を廃止した多くの国でも、その結果として殺人率が上昇したわけではありません。このことは、暴力犯罪を止めるのは厳罰ではなく、むしろ貧困や信頼できる警察の存在といった要因の方がはるかに重要だと示唆しています。\n\nこれらの理由から、私は死刑は廃止すべきだと確信しています。現代社会は、正義の名のもとに命を奪うのではなく、犯罪を防ぎ無実の人を守ることに力を注ぐべきです。",
        wordCount: 218,
        qa: [
            { q: "But don't victims' families deserve justice?", a: "That is a fair point, and their pain is real. However, I would argue that true justice should focus on preventing future crimes, not on revenge. A life sentence still holds the criminal fully accountable without risking an irreversible mistake." },
            { q: "Isn't a life sentence more expensive than execution?", a: "Actually, in many countries the opposite is true. Death penalty cases involve years of costly appeals, so they often end up more expensive than keeping someone in prison for life. So cost is not a strong argument for it." },
            { q: "What about extremely cruel criminals, like serial killers?", a: "Even in such cases, I think life imprisonment without parole is enough to protect society. Once they are locked away permanently, they can no longer harm anyone. Taking their life adds nothing to public safety." },
            { q: "Some people say abolishing it is too soft on crime. What do you think?", a: "I understand that concern, but being firm and being violent are not the same thing. We can punish criminals harshly while still respecting the principle that the state should not kill. That is a sign of a mature society, not a weak one." }
        ],
        keyExpressions: [
            { en: "I firmly believe that ~", ja: "〜だと固く信じている", note: "スピーチ冒頭で立場を強く言い切る型" },
            { en: "There are two main reasons for this.", ja: "理由は主に二つある", note: "本論の地図を最初に示すと聞き手が追える" },
            { en: "Take ~ for instance.", ja: "例えば〜を取り上げると", note: "具体例を口頭でサッと導入する型" },
            { en: "That is a fair point, but ~", ja: "もっともなご指摘ですが〜", note: "Q&Aで反論されたときの定番の切り返し" },
            { en: "For these reasons, I am convinced that ~", ja: "これらの理由から〜と確信している", note: "理由を束ねて結論に着地させる型" },
            { en: "Admittedly, ~, but on balance ~", ja: "確かに〜だが、全体としては〜", note: "反対側を一文だけ認めてから自分の立場に戻す。スピーチでも両論併記(中立)は避け、必ず一方に立つ" }
        ],
        tip: "最初の一文で必ずYes/Noどちらか一方の立場を言い切ってから理由に入ろう。両論併記で中立に逃げると減点される。反対意見に触れたいときだけ、結論の前に Admittedly... but on balance... と一文添えて自分の側に戻す。",
    },
    {
        day: 2, category: "教育",
        topic: "Is a university education necessary for success in life?",
        topicJa: "人生の成功に大学教育は必要か",
        stance: "No — it is not necessary, though it can help",
        speech: "I do not believe that a university education is necessary for success in life. It can certainly be valuable, but it is just one path among many, and I would say it is far from the only one. There are two main reasons for this.\n\nFirst, success today depends more on skills than on degrees. Many of the most successful entrepreneurs, such as the founders of major tech companies, never finished university, yet they built enormous businesses. What really mattered was their ability to solve real problems and keep learning. In fields like programming or design, a strong portfolio often counts far more than a diploma.\n\nSecondly, the internet has made knowledge accessible to almost everyone. Today, anyone with a smartphone can take free online courses from top universities or learn a trade through video tutorials. In other words, you no longer need to sit in a lecture hall to gain valuable knowledge. Motivated people can educate themselves at a fraction of the cost.\n\nFor these reasons, I am convinced that a university education is not necessary for success. It can open doors, but it is ultimately a person's drive and skills, not a piece of paper, that determine how far they go in life.",
        speechJa: "私は人生の成功に大学教育が必要だとは思いません。確かに価値はありますが、それは数ある道の一つにすぎず、唯一の道とは到底言えないと思います。理由は主に二つあります。\n\n第一に、今日の成功は学位よりもスキルに左右されます。大手テック企業の創業者など、最も成功した起業家の多くは大学を出ていませんが、巨大な事業を築きました。本当に重要だったのは、現実の問題を解決し学び続ける力でした。プログラミングやデザインのような分野では、立派な作品集の方が卒業証書よりはるかに重視されることが多いのです。\n\n第二に、インターネットがほぼ誰にでも知識を手の届くものにしました。今やスマホがあれば、一流大学の無料オンライン講座を受けたり、動画で技術を学んだりできます。つまり、価値ある知識を得るのに、もはや講義室に座る必要はないのです。やる気のある人は、ごくわずかな費用で独学できます。\n\nこれらの理由から、私は成功に大学教育は必要ないと確信しています。大学は扉を開いてくれますが、人生でどこまで行けるかを最終的に決めるのは、紙切れではなく本人の意欲とスキルなのです。",
        wordCount: 215,
        qa: [
            { q: "Don't many high-paying jobs still require a degree?", a: "That is true for fields like medicine or law, where a degree is essential. But many well-paid jobs in tech, sales, or the trades do not. So it really depends on the career path you choose." },
            { q: "Isn't university about more than just getting a job?", a: "I completely agree. University offers personal growth, friendships, and the chance to explore ideas. My point is only that those benefits are not strictly necessary for success, and they can be gained in other ways too." },
            { q: "What about networking? Doesn't university help with that?", a: "Yes, that is one of its real strengths. The connections you make can be very valuable. However, with online communities and professional events, people can now build strong networks without attending university." },
            { q: "Would you encourage young people to skip university then?", a: "Not necessarily. I would tell them to think carefully about their goals first. If their dream job requires a degree, they should pursue one. But if not, there is no shame in choosing a different, more practical path." }
        ],
        keyExpressions: [
            { en: "It is far from the only one.", ja: "それは唯一の道とは到底言えない", note: "極端な前提を柔らかく否定する言い回し" },
            { en: "What really mattered was ~", ja: "本当に重要だったのは〜だ", note: "例の中で要点を強調する型" },
            { en: "In other words, ~", ja: "言い換えれば〜", note: "言ったことを一段わかりやすく言い直す" },
            { en: "It ultimately depends on ~", ja: "それは結局〜次第だ", note: "Q&Aで「場合による」と返す型" },
            { en: "I completely agree, but my point is ~", ja: "全く同感ですが、私が言いたいのは〜", note: "相手を肯定しつつ論点を守る切り返し" }
        ],
        tip: "「必要か」型のお題は Yes/No を白黒つけ過ぎず「価値はあるが必須ではない」のように一段ニュアンスを足すと1級らしい厚みが出る。",
    },
    {
        day: 3, category: "科学・技術",
        topic: "Can science and technology solve environmental problems?",
        topicJa: "科学技術は環境問題を解決できるか",
        stance: "Partly — it is essential but not enough on its own",
        speech: "I believe that science and technology are essential to solving environmental problems, but I do not think technology alone can do the job. It must go hand in hand with changes in our behavior and politics. There are two main reasons for this.\n\nThe first reason is that technology has already given us powerful tools. Take renewable energy, for instance. The cost of solar panels and wind turbines has fallen dramatically over the past decade, allowing many countries to cut their carbon emissions. Innovations like electric cars and more efficient batteries show that science can clearly point us toward a cleaner future.\n\nHowever, and this is my second point, technology cannot work without human cooperation. Even the best green technology is useless if governments refuse to invest in it or if people continue wasteful habits. Climate change is as much a political and social problem as a scientific one. In other words, we need new laws and new attitudes, not just new machines.\n\nTo sum up, I am convinced that science and technology are a vital part of the answer, but only part of it. The real solution lies in combining technological progress with strong political will and responsible choices by ordinary citizens.",
        speechJa: "私は、科学技術は環境問題の解決に不可欠だと信じていますが、技術だけでやり遂げられるとは思いません。それは私たちの行動や政治の変化と手を取り合って進む必要があります。理由は主に二つあります。\n\n一つ目の理由は、技術がすでに強力な手段を与えてくれていることです。例えば再生可能エネルギーを取り上げてみましょう。太陽光パネルや風力タービンの費用はこの十年で劇的に下がり、多くの国が炭素排出を削減できるようになりました。電気自動車やより効率的な電池といった技術革新は、科学が私たちをよりクリーンな未来へ導けることをはっきり示しています。\n\nしかし、これが二つ目の点ですが、技術は人間の協力なしには機能しません。どんなに優れた環境技術も、政府が投資を拒んだり、人々が無駄遣いの習慣を続けたりすれば役に立ちません。気候変動は科学の問題であると同時に、政治・社会の問題でもあるのです。言い換えれば、必要なのは新しい機械だけでなく、新しい法律と新しい意識なのです。\n\nまとめると、科学技術は答えの極めて重要な一部ですが、あくまで一部にすぎないと確信しています。真の解決は、技術の進歩を、強い政治的意志と一般市民の責任ある選択と組み合わせることにあります。",
        wordCount: 218,
        qa: [
            { q: "Aren't you being too pessimistic about technology?", a: "I do not think so. I am actually very optimistic about what technology can do. My only point is that machines need motivated people and good policies behind them to make a real difference." },
            { q: "Can't a single breakthrough, like cheap clean energy, solve everything?", a: "A major breakthrough would certainly help a great deal. But even cheap clean energy needs to be built, distributed, and adopted, and that requires political and economic decisions. Technology is the tool, but people decide how to use it." },
            { q: "Who do you think is most responsible for the environment?", a: "I would say responsibility is shared. Governments must set the rules, companies must change how they produce, and individuals must change how they consume. Blaming just one group lets the others off the hook." },
            { q: "Do you think it is already too late to act?", a: "No, I do not believe it is too late, but we are running out of time. The sooner we combine technology with real political action, the better our chances. Delay is the one thing we truly cannot afford." }
        ],
        keyExpressions: [
            { en: "It must go hand in hand with ~", ja: "それは〜と手を取り合う必要がある", note: "二つの要素が両輪だと示す型" },
            { en: "However, and this is my second point, ~", ja: "しかし、これが二つ目の点ですが〜", note: "転換と理由2の導入を同時にこなす" },
            { en: "A is as much B as C.", ja: "AはCであると同時にBでもある", note: "問題を多面的に捉えていると示す表現" },
            { en: "The real solution lies in ~", ja: "真の解決は〜にある", note: "結論で核心を一文に凝縮する型" },
            { en: "I do not think so, because ~", ja: "そうは思いません、なぜなら〜", note: "Q&Aで前提を礼儀正しく否定する型" }
        ],
        tip: "「できるか」のお題は全肯定か全否定より「部分的に/条件付きで」がバランス良く、追加質問にも崩れにくい。",
    },
    {
        day: 4, category: "社会・国際",
        topic: "Should developed nations accept more refugees?",
        topicJa: "先進国はより多くの難民を受け入れるべきか",
        stance: "Yes — they should accept more",
        speech: "I believe that developed nations should accept more refugees. While I understand the concerns about the costs involved, I think wealthy countries have both a moral duty and practical reasons to help. There are two main reasons for this.\n\nThe first reason is humanitarian. Refugees are not leaving their homes by choice; they are fleeing war, persecution, or disaster, often with nothing but the clothes on their backs. Take the people escaping conflict in places like Syria or Ukraine, for instance. Wealthy nations have the resources to offer them safety, and I believe that with great wealth comes a responsibility to help those in desperate need.\n\nSecondly, refugees can actually benefit the host country in the long run. Many developed nations face aging populations and shrinking workforces. Refugees, once they are settled and allowed to work, can fill labor shortages, start businesses, and pay taxes. Germany, for example, has seen many refugees become productive members of society. In other words, accepting refugees is not only kind, it can also be smart.\n\nFor these reasons, I am convinced that developed nations should accept more refugees. With proper support and integration programs, helping refugees is both the right thing to do and a wise investment in the future.",
        speechJa: "私は、先進国はより多くの難民を受け入れるべきだと信じています。費用に関する懸念は理解できますが、豊かな国には道徳的義務と現実的な理由の両方があると思います。理由は主に二つあります。\n\n一つ目の理由は人道的なものです。難民は望んで故郷を離れるのではなく、戦争や迫害、災害から逃れているのであり、しばしば着の身着のままです。例えばシリアやウクライナのような場所での紛争から逃れる人々を取り上げてみましょう。豊かな国には彼らに安全を提供する資源があり、大きな富には困窮した人々を助ける責任が伴うと私は信じています。\n\n二つ目に、難民は長期的にはむしろ受け入れ国に利益をもたらし得ます。多くの先進国は高齢化と労働力人口の縮小に直面しています。難民は、定住して就労が認められれば、労働力不足を補い、事業を起こし、税金を納めることができます。例えばドイツでは、多くの難民が社会の生産的な一員になりました。言い換えれば、難民の受け入れは思いやりであるだけでなく、賢明でもあるのです。\n\nこれらの理由から、私は先進国はより多くの難民を受け入れるべきだと確信しています。適切な支援と統合プログラムがあれば、難民を助けることは正しい行いであると同時に、未来への賢い投資でもあるのです。",
        wordCount: 217,
        qa: [
            { q: "But won't accepting more refugees put a strain on public services?", a: "That is a fair point, and it does create short-term costs. However, with proper planning and funding, these strains can be managed. And in the long run, working refugees contribute back through taxes and labor, easing the burden." },
            { q: "What about concerns over crime and security?", a: "Security screening is certainly important, and I support careful vetting. But studies in many countries show that refugees are not more likely to commit crimes than locals. We should not let fear shape policy more than facts do." },
            { q: "Shouldn't refugees be helped in their own region instead?", a: "Helping them closer to home is valuable and should continue. But neighboring countries are often poor and already overwhelmed. Wealthy nations have far more capacity, so sharing the responsibility is only fair." },
            { q: "Don't host countries risk losing their cultural identity?", a: "I understand that worry, but I see diversity as a strength rather than a threat. With good integration programs, newcomers can adopt local values while enriching the culture. History shows that societies often grow stronger through immigration." }
        ],
        keyExpressions: [
            { en: "With great wealth comes a responsibility to ~", ja: "大きな富には〜する責任が伴う", note: "道徳的義務を格言調で力強く述べる型" },
            { en: "In the long run, ~", ja: "長期的には〜", note: "短期の懸念に長期の利益で応じる型" },
            { en: "It is not only kind, it can also be smart.", ja: "それは思いやりであるだけでなく賢明でもある", note: "倫理と実利の両面を一文で示す" },
            { en: "We should not let fear shape policy more than facts do.", ja: "事実以上に恐怖に政策を決めさせるべきではない", note: "感情論への上品な反論フレーズ" },
            { en: "Sharing the responsibility is only fair.", ja: "責任を分かち合うのが公平だ", note: "公平性を根拠に主張を補強する型" }
        ],
        tip: "賛成意見でも反対側の懸念(費用・治安)を一度認めてから返すと説得力が増す。Q&Aは『譲歩→しかし』の型を意識。",
    },
    {
        day: 5, category: "科学・倫理",
        topic: "Should the use of animals in medical research be banned?",
        topicJa: "医学研究での動物の利用は禁止すべきか",
        stance: "No — it should not be banned, but strictly regulated",
        speech: "I do not believe that the use of animals in medical research should be completely banned, although I strongly support strict rules to protect them. At our current stage of science, banning it entirely would do more harm than good. There are two main reasons for this.\n\nThe first reason is that animal research has saved countless human lives. Many of the medicines and vaccines we rely on today, from insulin to the recent COVID vaccines, were developed and tested on animals before they were given to people. Take polio, for instance. The vaccine that nearly wiped out that terrible disease depended on animal testing. Without it, medical progress would have been far slower and far more dangerous for human patients.\n\nSecondly, there is currently no full replacement for living systems. Scientists are developing alternatives, such as computer models and lab-grown tissues, and I think these should be expanded as much as possible. However, these methods still cannot fully reproduce how a whole, living body responds to a new drug. A complete ban today would put human safety at risk.\n\nTo sum up, I am convinced that animal research should not be banned, but tightly regulated. We should keep reducing animal use and improving their welfare, while continuing to protect the human lives that depend on this research.",
        speechJa: "私は、医学研究での動物の利用を完全に禁止すべきだとは思いません。ただし、動物を守るための厳しい規則は強く支持します。現在の科学の段階では、全面禁止は益より害をもたらすでしょう。理由は主に二つあります。\n\n一つ目の理由は、動物研究が数えきれないほどの人命を救ってきたことです。インスリンから最近の新型コロナワクチンまで、今日私たちが頼っている多くの薬やワクチンは、人に投与される前に動物で開発・試験されました。例えばポリオを取り上げてみましょう。あの恐ろしい病をほぼ根絶したワクチンは、動物実験に支えられていました。それがなければ、医学の進歩ははるかに遅く、人間の患者にとってはるかに危険だったでしょう。\n\n二つ目に、現時点では生きた生体系の完全な代替はありません。科学者はコンピューターモデルや培養組織といった代替法を開発しており、これらは可能な限り拡大すべきだと思います。しかし、これらの方法はまだ、生きた体全体が新薬にどう反応するかを完全には再現できません。今すぐ全面禁止すれば、人間の安全が危険にさらされます。\n\nまとめると、動物研究は禁止ではなく厳格に規制すべきだと確信しています。動物の利用を減らし福祉を改善し続けると同時に、この研究に依存する人命を守り続けるべきです。",
        wordCount: 224,
        qa: [
            { q: "Isn't it cruel to make animals suffer for our benefit?", a: "I share that concern, and animal suffering should be minimized at every step. That is exactly why I call for strict regulation, not a free pass. But for now, I believe the human lives saved justify carefully controlled research." },
            { q: "Aren't computer models good enough to replace animals already?", a: "They are improving fast and I welcome that. However, even the best models cannot yet fully predict how a complex living body will react to a drug. Until they can, animals remain a necessary, if regrettable, part of the process." },
            { q: "Do results from animals really apply to humans?", a: "Not always perfectly, that is true, since our bodies differ in some ways. But animals and humans share enough biology that the results are still highly valuable. Many lifesaving treatments would never have existed without them." },
            { q: "Where would you draw the line on what is acceptable?", a: "I would allow research only when there is no viable alternative and the potential benefit to humans is significant. I would also demand strict welfare standards and independent oversight. The goal should always be to use as few animals as possible." }
        ],
        keyExpressions: [
            { en: "Banning it entirely would do more harm than good.", ja: "全面禁止は益より害をもたらすだろう", note: "極端な選択肢を退けるときの定番フレーズ" },
            { en: "Not ~, but tightly regulated.", ja: "〜ではなく、厳しく規制すべきだ", note: "中間的な立場を鮮明にする型" },
            { en: "I share that concern, that is exactly why ~", ja: "その懸念は共有します、だからこそ〜", note: "相手の不安を味方につける切り返し" },
            { en: "Until they can, ~ remains necessary.", ja: "それが可能になるまでは〜が必要だ", note: "代替案がまだ不十分だと示す型" },
            { en: "The goal should always be to ~", ja: "目標は常に〜であるべきだ", note: "理想の方向性を示して締めるフレーズ" }
        ],
        tip: "倫理系のお題ほど「禁止」か「容認」の二択でなく「規制しつつ容認」の第三の道が安全。反対派の感情にまず共感を示すと印象が良い。",
    },
    {
        day: 6, category: "経済・国際",
        topic: "Is globalization beneficial for developing countries?",
        topicJa: "グローバル化は発展途上国にとって有益か",
        stance: "Yes — on balance, it is beneficial",
        speech: "On balance, I believe that globalization is beneficial for developing countries. It is not without its problems, but I think the overall benefits clearly outweigh the drawbacks. There are two main reasons for this.\n\nThe first reason is economic growth and jobs. When global companies invest in developing countries, they create employment and bring in money, skills, and technology. Take countries in Southeast Asia, for instance. Nations like Vietnam have lifted millions of people out of poverty by joining global trade and manufacturing. Without access to world markets, that rapid progress would have been almost impossible.\n\nSecondly, globalization spreads knowledge and opportunity. Through the internet and international exchange, people in developing countries can now access education, ideas, and innovations from around the world. A student in a remote village can learn from top universities online, and a small local business can sell its products globally. In other words, globalization helps level the playing field.\n\nFor these reasons, I am convinced that globalization is, on the whole, beneficial for developing countries. The challenge is not to reject it, but to manage it fairly, so that its benefits are shared widely and its downsides, such as inequality, are kept under control.",
        speechJa: "全体として、私はグローバル化は発展途上国にとって有益だと信じています。問題がないわけではありませんが、全体的な利益が欠点を明らかに上回ると思います。理由は主に二つあります。\n\n一つ目の理由は、経済成長と雇用です。グローバル企業が発展途上国に投資すると、雇用を生み出し、資金や技術、ノウハウをもたらします。例えば東南アジアの国々を取り上げてみましょう。ベトナムのような国は、世界貿易と製造業に参加することで何百万もの人々を貧困から引き上げました。世界市場へのアクセスがなければ、その急速な進歩はほぼ不可能だったでしょう。\n\n二つ目に、グローバル化は知識と機会を広げます。インターネットや国際交流を通じて、発展途上国の人々は今や世界中の教育やアイデア、技術革新にアクセスできます。辺鄙な村の学生がオンラインで一流大学から学べますし、小さな地元企業が世界に商品を売ることもできます。言い換えれば、グローバル化は競争条件を平等に近づける助けになるのです。\n\nこれらの理由から、私はグローバル化は概して発展途上国にとって有益だと確信しています。課題はそれを拒むことではなく、公平に管理することであり、それによって利益が広く分かち合われ、不平等のような負の側面が抑えられるのです。",
        wordCount: 215,
        qa: [
            { q: "Doesn't globalization just exploit cheap labor in poor countries?", a: "That is a real risk, and exploitation does happen in some cases. However, those jobs are often still better than the alternatives locally, and over time wages and conditions tend to improve. The answer is stronger labor standards, not less globalization." },
            { q: "What about the harm to local cultures and industries?", a: "That is a fair concern. Some traditional industries do struggle to compete. But globalization also gives local cultures a global audience, and governments can protect key sectors while still benefiting from trade." },
            { q: "Doesn't globalization increase inequality?", a: "It can widen the gap if it is left unmanaged, I agree. But the solution is fairer policies, such as taxation and education, rather than closing the borders. Cutting off trade would likely make poor countries even poorer." },
            { q: "Aren't developing countries too dependent on rich ones under globalization?", a: "There is some truth to that, and dependence can be risky. Yet through trade these countries also gain the capital and skills to eventually stand on their own. The goal should be balanced, two-way relationships, not isolation." }
        ],
        keyExpressions: [
            { en: "On balance, ~", ja: "全体として/差し引きで言えば〜", note: "賛否ある話題で総合判断を示す出だし" },
            { en: "The benefits clearly outweigh the drawbacks.", ja: "利益が欠点を明らかに上回る", note: "メリット・デメリットを天秤にかける型" },
            { en: "It helps level the playing field.", ja: "競争条件を平等に近づける", note: "機会の公平化を語る便利な比喩" },
            { en: "The challenge is not to reject it, but to ~", ja: "課題はそれを拒むことではなく〜することだ", note: "対立軸を立て直して結論へ導く型" },
            { en: "There is some truth to that, yet ~", ja: "それには一理ありますが〜", note: "Q&Aで部分的に認めつつ反論する型" }
        ],
        tip: "賛否が割れる経済テーマは『On balance(差し引きで)』で総合判断を先に示すと、追加質問で多少譲歩しても軸がぶれない。",
    },
    {
        day: 7, category: "科学技術",
        topic: "Should governments invest more in space exploration?",
        topicJa: "政府は宇宙探査にもっと投資すべきか",
        stance: "賛成。宇宙探査は技術革新と人類の長期的な生存に不可欠だから。",
        speech: "In my view, governments should definitely invest more in space exploration, even though it may seem like a luxury when there are problems here on Earth.\n\nThe first reason is that space exploration drives technological innovation that benefits everyone. Many things we use in daily life, such as GPS, weather forecasting, and even certain medical devices, originally came out of space programs. A good example of this is the technology developed for satellites, which now allows us to communicate instantly across the globe. So the money spent is not really lost. It comes back to us in the form of new industries and jobs.\n\nSecondly, I believe space exploration is essential for the long-term survival of humanity. Our planet faces serious threats, from asteroids to climate change, and putting all our hopes in one place is risky. By studying other planets and developing the ability to live in space, we are preparing for a future where humanity is not limited to a single fragile world. This is a kind of insurance policy for our species.\n\nTo conclude, while the costs are high, the returns in terms of technology and our future are even higher. For these reasons, I strongly believe governments should commit more resources to exploring space.",
        speechJa: "私の考えでは、地球上に問題が山積していて宇宙探査が贅沢に見えるとしても、政府はもっと投資すべきです。\n\n第一の理由は、宇宙探査が万人に恩恵をもたらす技術革新を推し進めるからです。GPS、天気予報、さらには一部の医療機器など、私たちが日常で使う多くのものは元々宇宙開発から生まれました。その良い例が衛星のために開発された技術で、今では世界中で瞬時に通信できるようになっています。だから使われたお金は決して無駄ではなく、新産業や雇用という形で私たちに返ってきます。\n\n第二に、宇宙探査は人類の長期的な生存に不可欠だと思います。私たちの惑星は小惑星から気候変動まで深刻な脅威に直面しており、すべての望みを一か所に賭けるのは危険です。他の惑星を研究し宇宙で暮らす能力を育てることで、人類が一つの脆い世界に縛られない未来に備えているのです。これは私たちの種にとっての一種の保険です。\n\n結論として、費用は高いものの、技術と未来という見返りはそれ以上に大きいのです。これらの理由から、政府は宇宙探査にもっと資源を投じるべきだと強く考えます。",
        wordCount: 244,
        qa: [
            { q: "But isn't it wrong to spend money on space when so many people are still in poverty?", a: "I understand that concern, but it doesn't have to be one or the other. Space budgets are actually a very small part of government spending, and the technologies they produce often help the poor too, for example through better weather prediction for farmers." },
            { q: "Shouldn't private companies handle space exploration instead of governments?", a: "Private companies are doing great work, but they tend to focus on profitable projects. Governments are needed for basic science and long-term missions that don't bring quick returns but benefit everyone." },
            { q: "Do you think international cooperation in space is realistic?", a: "Yes, I think it's not only realistic but necessary. The International Space Station already proves that rival nations can work together, and sharing costs makes ambitious missions far more achievable." },
            { q: "Isn't there a risk that space becomes a new arena for military conflict?", a: "That is a real danger, which is exactly why we need strong international treaties. If we set clear rules early, we can keep space as a peaceful domain for science rather than weapons." }
        ],
        keyExpressions: [
            { en: "In my view, ~", ja: "私の考えでは〜", note: "立場をはっきり示す口頭の定番" },
            { en: "The first reason is that ~", ja: "第一の理由は〜だ", note: "理由を順序立てて導入する" },
            { en: "A good example of this is ~", ja: "その良い例が〜だ", note: "抽象論を具体例で支える" },
            { en: "I understand that concern, but ~", ja: "その懸念は分かるが〜", note: "反論をまず受け止めてから切り返す" },
            { en: "For these reasons, ~", ja: "これらの理由から〜", note: "結論で理由を束ねる締め" }
        ],
        tip: "冒頭の一文で立場を断言してから理由に入ると、面接官が話の構造を即座に把握できます。曖昧に始めないことが高評価の鍵です。",
    },
    {
        day: 8, category: "倫理・医療",
        topic: "Should euthanasia be legalized?",
        topicJa: "安楽死は合法化されるべきか",
        stance: "賛成。本人の尊厳と苦痛からの解放を尊重すべきだから。ただし厳格な条件付きで。",
        speech: "I believe that euthanasia should be legalized, although it must be carefully controlled. This is mainly because I value individual dignity and the right to choose how we end our lives.\n\nThe first reason is that some patients suffer from terminal illnesses with no hope of recovery, only constant pain. Forcing them to keep living in agony is, in my opinion, a kind of cruelty. If a person is mentally competent and clearly expresses their wish, I think they should have the right to a peaceful death. It is their life, and ultimately their choice.\n\nSecondly, legalizing euthanasia with strict rules would actually make the practice safer. Right now, in many countries, doctors and families sometimes make these difficult decisions secretly, without any oversight. By creating a clear legal framework, with multiple doctors and counseling involved, we can prevent abuse and protect vulnerable people far better than pretending the issue does not exist.\n\nOf course, I understand the fear that it could be misused, so safeguards are absolutely essential. To conclude, when we respect human dignity and put proper protections in place, I believe euthanasia should be a legal option for those who truly need it.",
        speechJa: "私は、慎重に管理される必要はあるものの、安楽死は合法化されるべきだと考えます。これは主に、個人の尊厳と、人生をどう終えるかを選ぶ権利を重んじるからです。\n\n第一の理由は、回復の望みがなく絶え間ない苦痛しかない末期の病に苦しむ患者がいるからです。彼らに苦しみながら生き続けることを強いるのは、私の考えでは一種の残酷さです。本人に判断能力があり、はっきりと意思を示すなら、安らかな死を選ぶ権利があるべきだと思います。それは本人の人生であり、最終的には本人の選択です。\n\n第二に、厳格なルールの下で合法化することは、実際にはこの行為をより安全にします。今、多くの国では医師や家族がこうした難しい判断を、何の監視もなく密かに下すことがあります。複数の医師やカウンセリングを介す明確な法的枠組みを作ることで、問題が存在しないふりをするより、はるかに乱用を防ぎ弱い立場の人を守れます。\n\nもちろん悪用されるという恐れは理解できるので、安全策は絶対に不可欠です。結論として、人間の尊厳を尊重し適切な保護を設ければ、本当に必要とする人にとって安楽死は合法的な選択肢であるべきだと私は考えます。",
        wordCount: 222,
        qa: [
            { q: "Doesn't legalizing euthanasia devalue human life?", a: "I'd argue the opposite. Respecting a person's wish to avoid pointless suffering actually honors their humanity. What devalues life is forcing someone to endure agony against their will." },
            { q: "How can we be sure a patient's decision is truly voluntary?", a: "That's the central challenge, which is why safeguards matter so much. Requiring repeated requests over time, independent medical assessments, and psychological evaluation can help confirm that the choice is genuine and free." },
            { q: "Could this put pressure on elderly people to die so as not to burden their families?", a: "Let me think about that for a moment. Yes, that is a serious concern, so the law must include protections, like banning family members from the decision and offering counseling, to make sure no one feels pressured." },
            { q: "Wouldn't improving palliative care be a better solution?", a: "Better palliative care is certainly important and should be expanded. However, even the best care cannot relieve every form of suffering, so euthanasia should remain available as a last resort." }
        ],
        keyExpressions: [
            { en: "This is mainly because ~", ja: "これは主に〜だからだ", note: "立場の核心となる理由を一文で示す" },
            { en: "In my opinion, ~", ja: "私の意見では〜", note: "主観的判断を明確に区切る" },
            { en: "I'd argue the opposite.", ja: "私はその逆だと主張したい", note: "反論に正面から切り返す" },
            { en: "Let me think about that for a moment.", ja: "少し考えさせてください", note: "難問で沈黙を避け間を作る" },
            { en: "To conclude, ~", ja: "結論として〜", note: "スピーチの締めの合図" }
        ],
        tip: "賛否が分かれる繊細な話題では、反対意見を一度認める一文を入れると、視野の広さが伝わり説得力が増します。",
    },
    {
        day: 9, category: "科学技術",
        topic: "Will artificial intelligence do more harm than good?",
        topicJa: "人工知能は益より害をもたらすか",
        stance: "反対。AIは適切に管理されれば害より益が大きい。問題はAIではなく使い方。",
        speech: "In my view, artificial intelligence will do more good than harm, as long as we manage it wisely. The technology itself is neutral. What matters is how we choose to use it.\n\nThe first reason is that AI is already solving problems that humans struggle with. In medicine, for instance, AI can analyze thousands of scans and detect cancer earlier than a human doctor. A good example of this is the diagnostic systems now used in hospitals, which save lives by catching diseases at an early stage. In areas like climate research and drug development, AI is speeding up progress that would otherwise take decades.\n\nSecondly, I believe many of the fears about AI come from misuse rather than the technology itself. Yes, there are real risks, such as job losses and fake information, but these are problems we can address through education and sensible regulation. Throughout history, every major technology has caused disruption at first, and yet we adapted and benefited in the long run.\n\nTo conclude, AI is a powerful tool, and like any tool, its impact depends on us. For these reasons, I am optimistic that, with proper rules, AI will bring far more benefit than harm.",
        speechJa: "私の考えでは、賢く管理しさえすれば、人工知能は害より益をもたらします。技術それ自体は中立であり、重要なのは私たちがどう使うかを選ぶことです。\n\n第一の理由は、AIがすでに人間には難しい問題を解決しているからです。例えば医療では、AIは何千もの画像を分析し、人間の医師より早くがんを見つけられます。その良い例が今や病院で使われている診断システムで、病気を早期に捉えることで命を救っています。気候研究や創薬といった分野でも、AIは本来何十年もかかる進歩を加速させています。\n\n第二に、AIへの恐れの多くは、技術そのものというより誤用から来ていると思います。確かに失業や偽情報といった現実のリスクはありますが、これらは教育と賢明な規制によって対処できる問題です。歴史を通じて、あらゆる大きな技術は最初は混乱を引き起こしましたが、それでも私たちは適応し、長期的には恩恵を受けてきました。\n\n結論として、AIは強力な道具であり、どんな道具とも同様にその影響は私たち次第です。これらの理由から、適切なルールがあれば、AIは害よりはるかに大きな益をもたらすと私は楽観しています。",
        wordCount: 233,
        qa: [
            { q: "But what about the millions of jobs that AI will eliminate?", a: "Job displacement is a genuine concern, but history shows that new technologies also create new types of work. The key is to invest in retraining programs so workers can move into the jobs that AI cannot do." },
            { q: "Aren't you worried about AI being used for surveillance or weapons?", a: "Absolutely, those are dangerous uses, which is exactly why we need strong international rules. The danger lies in how humans deploy AI, not in the technology itself, so regulation is essential." },
            { q: "Can we really control something that becomes smarter than us?", a: "That's a difficult question, and honestly nobody knows for certain. But I believe that by building safety measures into AI from the start and proceeding carefully, we can keep it under meaningful human control." },
            { q: "Doesn't relying on AI make people lazy and less capable of thinking?", a: "There is some truth to that, just as calculators changed how we do math. However, used well, AI can free us from routine tasks and let us focus on more creative and critical thinking." }
        ],
        keyExpressions: [
            { en: "What matters is ~", ja: "重要なのは〜だ", note: "論点の核心を強調して提示する" },
            { en: "For instance, ~", ja: "例えば〜", note: "具体例をテンポよく差し込む" },
            { en: "There is some truth to that, however ~", ja: "それも一理あるが〜", note: "相手を立てつつ反論する" },
            { en: "The key is to ~", ja: "鍵は〜することだ", note: "解決策を一言で示す" },
            { en: "For these reasons, ~", ja: "これらの理由から〜", note: "結論で理由を集約する" }
        ],
        tip: "「技術は中立で、問題は使い方」という枠組みを置くと、賛否どちらの質問にも一貫した軸でぶれずに答えられます。",
    },
    {
        day: 10, category: "社会・政治",
        topic: "Should voting be made compulsory?",
        topicJa: "投票は義務化されるべきか",
        stance: "賛成。投票率の向上は民主主義の正統性を高め、政治を国民全体に近づけるから。",
        speech: "In my view, voting should be made compulsory, because a healthy democracy depends on the participation of all its citizens.\n\nThe first reason is that compulsory voting produces results that truly reflect the whole society. When voting is optional, the people who turn out are often those with strong opinions or more free time, which can distort the outcome. A good example of this is Australia, where compulsory voting leads to turnout above ninety percent. As a result, elected leaders represent the entire population, not just a passionate minority, and this strengthens the legitimacy of the government.\n\nSecondly, I believe making voting a duty encourages people to become more informed citizens. If everyone knows they must vote, they have a reason to pay attention to the issues and the candidates. This naturally builds a more engaged and politically aware society over time. Voting is not only a right but also a responsibility we share.\n\nOf course, the penalty for not voting should be small, and people should still be free to submit a blank ballot. To conclude, for the sake of fairer and more representative democracy, I firmly believe voting should be compulsory.",
        speechJa: "私の考えでは、健全な民主主義はすべての市民の参加にかかっているので、投票は義務化されるべきです。\n\n第一の理由は、義務投票が社会全体を本当に反映する結果を生むからです。投票が任意だと、足を運ぶのは強い意見を持つ人や時間に余裕のある人になりがちで、結果が歪みかねません。その良い例がオーストラリアで、義務投票により投票率は九十パーセントを超えています。その結果、選ばれた指導者は熱心な少数派だけでなく全人口を代表することになり、これが政府の正統性を強めます。\n\n第二に、投票を義務にすることは、人々がより情報に通じた市民になることを促すと思います。誰もが投票しなければならないと知っていれば、争点や候補者に注意を払う理由が生まれます。これは時間をかけて自然と、より積極的で政治に関心のある社会を育てます。投票は権利であるだけでなく、私たちが共有する責任でもあります。\n\nもちろん不投票への罰則は小さくすべきですし、人々は白票を投じる自由も保つべきです。結論として、より公正で代表性のある民主主義のために、投票は義務化されるべきだと私は固く信じます。",
        wordCount: 222,
        qa: [
            { q: "Isn't forcing people to vote a violation of personal freedom?", a: "I see it more as a civic duty, like paying taxes or serving on a jury. And freedom is preserved because people can still cast a blank vote if they truly object to all the candidates." },
            { q: "Won't compulsory voting just lead to uninformed people voting randomly?", a: "That's a fair worry, but evidence from countries like Australia suggests the opposite. When people know they have to vote, many take the time to learn about the issues beforehand." },
            { q: "Wouldn't it be better to focus on making people want to vote instead?", a: "Encouraging voluntary participation is certainly valuable, but decades of campaigns have failed to lift turnout in many countries. Compulsory voting guarantees results while we keep working on motivation." },
            { q: "What about people who simply don't care about politics?", a: "Even people who feel disengaged are affected by political decisions every day. Requiring them to vote gently nudges them to think about how those decisions shape their own lives." }
        ],
        keyExpressions: [
            { en: "A good example of this is ~", ja: "その良い例が〜だ", note: "国名など具体例で主張を裏づける" },
            { en: "As a result, ~", ja: "その結果〜", note: "因果関係を明示してつなぐ" },
            { en: "I see it more as ~", ja: "むしろ私は〜と捉える", note: "前提を言い換えて反論する" },
            { en: "That's a fair worry, but ~", ja: "もっともな懸念だが〜", note: "懸念を認めつつ反証へ" },
            { en: "For the sake of ~", ja: "〜のために", note: "結論で目的を強調する" }
        ],
        tip: "オーストラリアのような具体的な国名と数字を一つ用意しておくと、抽象的な議論が一気に説得力を持ちます。",
    },
    {
        day: 11, category: "科学技術",
        topic: "Should genetically modified crops be encouraged?",
        topicJa: "遺伝子組み換え作物は奨励されるべきか",
        stance: "賛成。食料安全保障と環境負荷の軽減に役立つから。ただし規制と表示が前提。",
        speech: "In my view, genetically modified crops should be encouraged, provided they are properly regulated and labeled. This is mainly because they offer real solutions to some of the world's most pressing problems.\n\nThe first reason is food security. The global population keeps growing, and climate change is making farming harder. GM crops can be designed to resist drought, pests, and disease, which means farmers can grow more food on the same amount of land. A good example of this is so-called golden rice, which was engineered to contain vitamin A and could help prevent blindness in millions of children in developing countries.\n\nSecondly, GM crops can actually be better for the environment. Because some varieties resist insects naturally, farmers can use fewer chemical pesticides, which reduces pollution and protects nearby wildlife. In this way, technology and sustainability can go hand in hand rather than working against each other.\n\nNaturally, safety testing and clear labeling are essential so that consumers can make informed choices. To conclude, when handled responsibly, genetically modified crops are a valuable tool, and for these reasons I believe they should be encouraged.",
        speechJa: "私の考えでは、適切に規制され表示される限り、遺伝子組み換え作物は奨励されるべきです。これは主に、世界で最も差し迫った問題のいくつかに現実的な解決策を与えるからです。\n\n第一の理由は食料安全保障です。世界人口は増え続け、気候変動が農業をより困難にしています。遺伝子組み換え作物は干ばつ、害虫、病気に強くなるよう設計でき、それは農家が同じ面積でより多くの食料を作れることを意味します。その良い例がいわゆるゴールデンライスで、ビタミンAを含むよう改良され、途上国の何百万もの子どもの失明を防ぐのに役立ちうるものです。\n\n第二に、遺伝子組み換え作物は実は環境にとってより良い場合があります。一部の品種は自然に害虫に強いので、農家は化学農薬の使用を減らせ、それが汚染を抑え周辺の野生生物を守ります。このように、技術と持続可能性は互いに対立するのではなく、両立しうるのです。\n\n当然、消費者が情報に基づいて選べるよう、安全性試験と明確な表示は不可欠です。結論として、責任を持って扱えば遺伝子組み換え作物は貴重な手段であり、これらの理由から私は奨励されるべきだと考えます。",
        wordCount: 222,
        qa: [
            { q: "Aren't GM foods dangerous to human health?", a: "I understand the worry, but after decades of study, major scientific bodies have found no evidence that approved GM foods harm health. Of course, rigorous testing before approval must continue to keep them safe." },
            { q: "Don't GM crops just increase the power of big corporations over farmers?", a: "That is a legitimate concern about patents and seed control. The answer, though, is better regulation and public research, not banning a technology that can feed people." },
            { q: "What about the risk to biodiversity and natural species?", a: "We do need careful monitoring to prevent GM crops from crossing with wild plants. With proper buffer zones and rules, however, we can enjoy the benefits while limiting the ecological risks." },
            { q: "Shouldn't we prefer traditional organic farming instead?", a: "Organic farming has real value, but it often yields less and uses more land. I think we need every available tool, including GM crops, to feed a growing population sustainably." }
        ],
        keyExpressions: [
            { en: "This is mainly because ~", ja: "これは主に〜だからだ", note: "理由の核心を一文で示す" },
            { en: "Provided that ~", ja: "〜という条件であれば", note: "条件付き賛成を明確にする" },
            { en: "A good example of this is ~", ja: "その良い例が〜だ", note: "象徴的な事例で支える" },
            { en: "That is a legitimate concern, but ~", ja: "それは正当な懸念だが〜", note: "相手の懸念を認めて切り返す" },
            { en: "For these reasons, ~", ja: "これらの理由から〜", note: "結論で理由を束ねる" }
        ],
        tip: "「条件付きで賛成」という立場は、安全性や規制への質問に余裕を持って答えられるので、賛否が割れる科学技術系のトピックで特に有効です。",
    },
    {
        day: 12, category: "環境・エネルギー",
        topic: "Is nuclear power necessary for the future?",
        topicJa: "原子力は未来に必要か",
        stance: "賛成。安定した低炭素電源として、再生可能エネルギーへの移行期に不可欠だから。",
        speech: "In my view, nuclear power is necessary for the future, at least as a bridge while we move toward fully renewable energy. This is mainly because of the urgent need to fight climate change.\n\nThe first reason is that nuclear power produces large amounts of electricity with almost no carbon emissions. Unlike coal or gas, a single nuclear plant can power a whole city around the clock without warming the planet. A good example of this is France, which generates most of its electricity from nuclear power and has one of the lowest carbon footprints in the developed world. If we want to cut emissions quickly, we cannot afford to ignore such a powerful tool.\n\nSecondly, nuclear power provides stability that renewables alone cannot yet guarantee. Solar and wind are wonderful, but they depend on the weather and the time of day. Nuclear plants, in contrast, supply steady power all the time, which keeps the electricity grid reliable while we develop better battery storage.\n\nOf course, safety and waste disposal must be handled with the greatest care. To conclude, for these reasons, I believe nuclear power remains a necessary part of our energy future.",
        speechJa: "私の考えでは、少なくとも完全な再生可能エネルギーへ移行するまでの橋渡しとして、原子力は未来に必要です。これは主に、気候変動と闘う差し迫った必要性があるからです。\n\n第一の理由は、原子力がほとんど炭素を排出せずに大量の電気を生み出すからです。石炭やガスと違い、一基の原子力発電所は地球を温暖化させることなく一日中、街全体に電力を供給できます。その良い例がフランスで、電力の大半を原子力でまかない、先進国の中でも最も炭素排出が少ない国の一つです。排出を素早く減らしたいなら、これほど強力な手段を無視する余裕はありません。\n\n第二に、原子力は再生可能エネルギー単独ではまだ保証できない安定性をもたらします。太陽光や風力は素晴らしいですが、天候や時間帯に左右されます。対照的に原子力発電所は常に安定した電力を供給し、より優れた蓄電技術を開発する間、送電網の信頼性を保ちます。\n\nもちろん、安全性と廃棄物処理は細心の注意をもって扱わねばなりません。結論として、これらの理由から、原子力は私たちのエネルギーの未来に必要な要素であり続けると私は考えます。",
        wordCount: 230,
        qa: [
            { q: "What about disasters like Fukushima and Chernobyl?", a: "Those accidents were terrible and taught us hard lessons. But modern reactor designs are far safer, and statistically nuclear power has caused fewer deaths per unit of energy than coal or oil." },
            { q: "Isn't the problem of radioactive waste still unsolved?", a: "It's a serious challenge, but not an impossible one. Countries like Finland are now building deep underground storage, and new reactor types can even reuse some of the waste as fuel." },
            { q: "Why not just rely entirely on renewable energy?", a: "I'd love to, and that's the long-term goal. The trouble is that renewables are still intermittent, so until storage technology improves, nuclear fills the gap and keeps the grid stable." },
            { q: "Aren't nuclear plants too expensive and slow to build?", a: "The upfront cost is high, that's true. However, over their long lifespan they produce cheap, reliable power, and newer small modular reactors aim to cut both the cost and the construction time." }
        ],
        keyExpressions: [
            { en: "This is mainly because ~", ja: "これは主に〜だからだ", note: "中心となる理由を明示する" },
            { en: "Unlike ~, ...", ja: "〜と違って…", note: "対比で長所を際立たせる" },
            { en: "In contrast, ~", ja: "対照的に〜", note: "二つの選択肢を比較する" },
            { en: "It's a serious challenge, but not an impossible one.", ja: "深刻な課題だが不可能ではない", note: "弱点を認めつつ前向きに返す" },
            { en: "To conclude, ~", ja: "結論として〜", note: "締めの合図" }
        ],
        tip: "原子力のような賛否両論のテーマでは、安全性や廃棄物の弱点を自分から軽く認めておくと、反論質問が来ても動じず冷静に対応できます。",
    },
    {
        day: 13,
        category: "社会",
        topic: "Should the government regulate social media?",
        topicJa: "政府はソーシャルメディアを規制すべきか",
        stance: "Yes, the government should regulate social media to a reasonable degree.",
        speech: "I believe the government should regulate social media, though it must do so carefully. While these platforms have transformed how we communicate, they also pose serious risks that companies have failed to address on their own.\n\nFirst, social media has become a powerful channel for spreading false information. During elections and public health crises, we have seen how quickly misinformation can spread and influence millions of people. Take the pandemic, for example. Dangerous medical myths went viral and put lives at risk. Private companies have little incentive to police this, because controversial content keeps users engaged and generates more advertising revenue. Therefore, I think the government has a duty to set basic rules to protect the public.\n\nSecond, regulation is needed to protect vulnerable users, especially children. Many platforms are deliberately designed to be addictive, and there is growing evidence linking heavy use to anxiety and depression among teenagers. Without oversight, companies will continue to prioritize profit over the well-being of young people. Reasonable rules on data privacy and age verification would help reduce these harms.\n\nOf course, regulation must respect freedom of speech, and I am not suggesting that the government should control what people say. The goal should be transparency and safety, not censorship.\n\nIn conclusion, while social media has many benefits, the potential for harm is simply too great to leave entirely to private companies. For these reasons, I firmly believe that sensible government regulation is necessary.",
        speechJa: "私は、政府は慎重にではあるものの、ソーシャルメディアを規制すべきだと考えます。これらのプラットフォームは私たちのコミュニケーションのあり方を変えましたが、同時に企業が自力で対処できていない深刻なリスクももたらしています。\n\n第一に、ソーシャルメディアは誤った情報を広める強力な経路になっています。選挙や公衆衛生の危機において、誤情報がいかに速く広がり、何百万もの人々に影響を与えうるかを私たちは見てきました。例えばパンデミックを考えてみてください。危険な医療デマが拡散し、人命を危険にさらしました。物議をかもす内容ほどユーザーを引きつけ広告収入を生むため、民間企業にはこれを取り締まる動機がほとんどありません。だからこそ政府には、公衆を守るために基本的なルールを定める義務があると思います。\n\n第二に、特に子どもなど弱い立場の利用者を守るために規制が必要です。多くのプラットフォームは意図的に依存性が高くなるよう設計されており、過度の使用が十代の不安やうつと関連するという証拠も増えています。監督がなければ、企業は若者の幸福より利益を優先し続けるでしょう。データプライバシーや年齢確認に関する妥当なルールは、こうした害を減らすのに役立つはずです。\n\nもちろん規制は言論の自由を尊重しなければならず、政府が人々の発言内容を統制すべきだと言っているのではありません。目的は検閲ではなく、透明性と安全であるべきです。\n\n結論として、ソーシャルメディアには多くの利点がありますが、害の可能性があまりに大きく、すべてを民間企業に委ねることはできません。これらの理由から、賢明な政府規制は必要だと強く信じています。",
        wordCount: 246,
        qa: [
            { q: "Wouldn't government regulation threaten freedom of speech?", a: "That is a valid concern, but I am talking about regulating harmful behavior, not opinions. Just as we have laws against fraud and defamation offline, similar standards can apply online without silencing legitimate debate." },
            { q: "Can't social media companies regulate themselves?", a: "In theory they can, but in practice they have a financial conflict of interest. Shocking content drives engagement and profit, so they rarely act unless they are forced to." },
            { q: "Is it even possible to regulate global platforms?", a: "It is challenging, but not impossible. The European Union has already introduced rules that big tech companies must follow, which shows that coordinated regulation can work." },
            { q: "What kind of regulation would you support?", a: "I would focus on transparency about algorithms, strong data privacy protection, and clear rules to keep children safe. I would avoid anything that lets the government decide what counts as acceptable opinion." }
        ],
        keyExpressions: [
            { en: "I believe ~, though it must be done carefully.", ja: "〜だと思うが、慎重にすべきだ", note: "賛成しつつ条件を添える型" },
            { en: "Take ~, for example.", ja: "例えば〜を取り上げてみましょう", note: "具体例を口頭で導入する型" },
            { en: "Therefore, I think ~", ja: "ゆえに〜だと思う", note: "理由から結論へ繋ぐ" },
            { en: "That is a valid concern, but ~", ja: "もっともな懸念ですが〜", note: "反論を受け止めてから返す型" },
            { en: "For these reasons, I firmly believe ~", ja: "これらの理由から強く信じる", note: "結論で立場を再確認" }
        ],
        tip: "賛成だが無条件ではない、という立場は1級で高評価。Of course で譲歩を一文挟むと反論質問への耐性が上がる。",
    },
    {
        day: 14,
        category: "国際",
        topic: "Should rich countries forgive the debts of poor nations?",
        topicJa: "豊かな国は貧しい国の債務を免除すべきか",
        stance: "Yes, rich countries should forgive much of the debt owed by the poorest nations.",
        speech: "I would argue that wealthy countries should forgive a large portion of the debt owed by the world's poorest nations. While I understand the concerns about fairness, I believe the benefits clearly outweigh the drawbacks.\n\nFirst, crushing debt traps many developing countries in a cycle of poverty. Some nations spend more on repaying loans than on health care or education for their own citizens. Consider several African countries, for example. They are forced to send money abroad while their own hospitals lack basic medicine. If this debt were forgiven, those funds could be invested in schools, clean water, and infrastructure, which would help these countries grow and eventually stand on their own.\n\nSecond, debt relief is in the long-term interest of rich countries too. A more stable and prosperous developing world means fewer refugees, less conflict, and new markets for trade. In other words, helping poorer nations is not just charity. It is a wise investment in global stability from which everyone benefits.\n\nNaturally, there must be conditions. Forgiveness should be tied to good governance and anti-corruption measures, so that the money actually reaches the people who need it.\n\nIn conclusion, while debt forgiveness is not a perfect solution, it is a powerful tool to break the cycle of poverty and build a more stable world. All things considered, I believe rich countries have both a moral and a practical reason to act.",
        speechJa: "私は、豊かな国は世界で最も貧しい国々が抱える債務の大部分を免除すべきだと主張したいです。公平性についての懸念は理解しますが、利点が欠点を明らかに上回ると考えます。\n\n第一に、重い債務は多くの途上国を貧困の連鎖に閉じ込めています。中には、自国民の医療や教育よりも借金の返済に多くを費やしている国もあります。例えばいくつかのアフリカの国々を考えてみてください。自国の病院に基本的な薬が不足しているのに、お金を海外へ送らざるをえないのです。もしこの債務が免除されれば、その資金を学校や清潔な水、インフラに投資でき、それが各国の成長を助け、やがて自立につながるでしょう。\n\n第二に、債務救済は豊かな国にとっても長期的な利益になります。より安定し繁栄した途上国世界は、難民の減少、紛争の減少、そして新たな貿易市場を意味します。言い換えれば、貧しい国を助けることは単なる慈善ではなく、誰もが恩恵を受ける世界の安定への賢明な投資なのです。\n\n当然ながら条件は必要です。免除は良い統治や汚職対策と結びつけ、お金が本当に必要とする人々に届くようにすべきです。\n\n結論として、債務免除は完璧な解決策ではありませんが、貧困の連鎖を断ち、より安定した世界を築く強力な手段です。すべてを考慮すると、豊かな国には道徳的にも実利的にも行動する理由があると考えます。",
        wordCount: 245,
        qa: [
            { q: "Wouldn't forgiving debt encourage irresponsible borrowing in the future?", a: "That is a fair point, which is exactly why relief should come with conditions. By linking forgiveness to reforms and transparency, we can reduce the risk of the same problem happening again." },
            { q: "Why should rich countries pay for the mistakes of poor governments?", a: "It is not only about past mistakes. Much of this debt grew from unfair interest rates and historical factors, and ordinary citizens, who had no say, are the ones suffering most." },
            { q: "Isn't direct aid better than debt forgiveness?", a: "Both have a role, but debt forgiveness frees up a country's own budget immediately and gives it more control over how the money is spent. I see them as complementary, not opposites." },
            { q: "Could this damage the economies of rich countries?", a: "The amounts involved are relatively small compared to the budgets of wealthy nations. The long-term gains in global stability and trade would likely outweigh the short-term cost." }
        ],
        keyExpressions: [
            { en: "I would argue that ~", ja: "〜だと主張したい", note: "やや控えめに立場を示す型" },
            { en: "the benefits clearly outweigh the drawbacks", ja: "利点が欠点を明らかに上回る", note: "賛否を天秤にかける定型" },
            { en: "In other words, ~", ja: "言い換えれば〜", note: "理由を別の言葉で言い直す" },
            { en: "That is a fair point, which is exactly why ~", ja: "もっともだ、だからこそ〜", note: "反論を逆手に取る応答型" },
            { en: "All things considered, ~", ja: "すべてを考慮すると〜", note: "結論の上品な締め" }
        ],
        tip: "「慈善ではなく投資」のように相手の損得に訴える論点を一つ入れると説得力が増す。条件付き賛成は反論をかわしやすい。",
    },
    {
        day: 15,
        category: "経済",
        topic: "Is capitalism the best economic system?",
        topicJa: "資本主義は最良の経済システムか",
        stance: "Capitalism is the best system available, but only when it is properly regulated.",
        speech: "In my opinion, capitalism is the best economic system we have, but only when it is balanced by strong regulation and a social safety net. No system is perfect, yet capitalism has proven more effective than the alternatives at creating wealth and improving living standards.\n\nFirst, capitalism encourages innovation and efficiency. Because people are free to start businesses and compete, they have a powerful incentive to create better products and services. Consider the technology industry, for example. Competition between companies has given us smartphones, the internet, and life-saving medicines at a remarkable pace. Centrally planned economies, by contrast, have repeatedly struggled with shortages and stagnation.\n\nSecond, capitalism gives individuals freedom and opportunity. People can choose their careers, pursue their own goals, and improve their circumstances through hard work. This freedom is something that more controlled systems often suppress.\n\nHaving said that, I am well aware of capitalism's flaws. Left unchecked, it can lead to extreme inequality and harm to the environment. That is why I believe the government must step in with fair taxes, labor protections, and welfare programs to soften these rough edges.\n\nIn conclusion, capitalism is not flawless, but no other system has done more to raise living standards. With sensible regulation to address its weaknesses, I firmly believe it remains the best option we have.",
        speechJa: "私の考えでは、資本主義は私たちが持つ中で最良の経済システムですが、それは強力な規制と社会的セーフティネットによって均衡が取られている場合に限ります。完璧なシステムはありませんが、資本主義は富を生み出し生活水準を向上させる点で、他の選択肢より効果的であることが証明されています。\n\n第一に、資本主義は革新と効率を促します。人々は自由に事業を始め競争できるため、より良い製品やサービスを生み出す強い動機を持ちます。例えばテクノロジー業界を考えてみてください。企業間の競争は、目覚ましい速さでスマートフォンやインターネット、命を救う薬を私たちにもたらしました。対照的に中央計画経済は、物不足や停滞に繰り返し苦しんできました。\n\n第二に、資本主義は個人に自由と機会を与えます。人々は職業を選び、自分の目標を追い、努力によって境遇を改善できます。この自由は、より統制的なシステムではしばしば抑圧されるものです。\n\nとはいえ、私は資本主義の欠点も十分承知しています。野放しにすれば、極端な格差や環境への害をもたらしかねません。だからこそ政府は、公正な税、労働者保護、福祉政策によって、その荒い部分を和らげるために介入すべきだと考えます。\n\n結論として、資本主義は完璧ではありませんが、生活水準を引き上げることに関して他のどのシステムもこれ以上の成果を上げていません。弱点に対処する賢明な規制があれば、依然として最良の選択肢だと強く信じています。",
        wordCount: 226,
        qa: [
            { q: "Doesn't capitalism inevitably create unfair inequality?", a: "It does tend to widen gaps, but I do not think that is inevitable. With progressive taxes and good public services, countries can keep inequality within reasonable limits while still enjoying the benefits of free markets." },
            { q: "What about socialist countries that provide strong welfare?", a: "Many of those countries, like in Northern Europe, are actually capitalist economies with generous welfare systems. To me, that supports my point that regulated capitalism, not pure socialism, works best." },
            { q: "Isn't capitalism responsible for the climate crisis?", a: "Unregulated markets certainly ignore environmental costs, but that is a failure of policy rather than of capitalism itself. Carbon taxes and green incentives can align profit with protecting the planet." },
            { q: "Could there be a better system in the future?", a: "Possibly, and I keep an open mind. But until a clearly superior alternative is proven to work at scale, I think improving capitalism is wiser than abandoning it." }
        ],
        keyExpressions: [
            { en: "In my opinion, ~", ja: "私の考えでは〜", note: "シンプルに立場を切り出す型" },
            { en: "by contrast, ~", ja: "対照的に〜", note: "二つを比較して差を示す" },
            { en: "Having said that, ~", ja: "とはいえ〜", note: "自説の弱点を認める譲歩" },
            { en: "That is why I believe ~", ja: "だからこそ〜だと思う", note: "理由から主張へ橋渡し" },
            { en: "I keep an open mind, but ~", ja: "柔軟ではいるが〜", note: "未来の可能性質問への応答型" }
        ],
        tip: "抽象的なテーマは「最良だが条件付き」と幅を持たせると安全。北欧の例のように、反論で出そうな国名を先回りで使うと強い。",
    },
    {
        day: 16,
        category: "言語",
        topic: "Should English be the world's official language?",
        topicJa: "英語を世界共通の公用語にすべきか",
        stance: "No, English should not be made the world's single official language.",
        speech: "While English is undeniably useful as a global language, I do not believe it should be made the world's single official language. A common language for international communication is one thing, but giving one language official status above all others would do more harm than good.\n\nFirst, language is deeply tied to culture and identity. There are thousands of languages in the world, each carrying its own history, values, and way of seeing things. If English were given official status everywhere, smaller languages would be pushed aside even faster than they already are. Consider the many indigenous languages, for example, that are disappearing every year. Elevating English officially would only accelerate this loss of cultural diversity.\n\nSecond, an official global language would create unfair advantages and disadvantages. Native English speakers would automatically enjoy privileges in business, politics, and education, while billions of others would be permanently at a disadvantage. This hardly seems just, especially since most of the world does not speak English as a first language.\n\nThat said, I do recognize the value of English as a shared tool for communication. The key difference is that using English by choice is very different from imposing it officially.\n\nIn conclusion, English can and should continue to serve as a useful common language, but making it the world's official language would threaten cultural diversity and fairness. For these reasons, I am opposed to the idea.",
        speechJa: "英語が世界共通語として非常に有用であることは否定できませんが、私はそれを世界唯一の公用語にすべきだとは思いません。国際的なコミュニケーションのための共通語と、一つの言語に他のすべてより上の公的地位を与えることは別問題で、後者は益より害が大きいでしょう。\n\n第一に、言語は文化やアイデンティティと深く結びついています。世界には何千もの言語があり、それぞれが固有の歴史、価値観、ものの見方を担っています。もし英語がどこでも公的地位を与えられれば、小さな言語は今以上に速く押しのけられるでしょう。例えば、毎年消えていく多くの先住民の言語を考えてみてください。英語を公的に持ち上げることは、こうした文化的多様性の喪失を加速させるだけです。\n\n第二に、公的な世界共通語は不公平な有利不利を生み出します。英語を母語とする人々はビジネス、政治、教育で自動的に特権を享受し、一方で何十億もの人々が恒久的に不利な立場に置かれます。世界の大半は英語を第一言語としていないのですから、これは到底公正とは思えません。\n\nとはいえ、共通のコミュニケーション手段としての英語の価値は認めます。重要な違いは、英語を選んで使うことと、公的に押しつけることはまったく別だという点です。\n\n結論として、英語は有用な共通語として今後も役立ち続けられますし、そうあるべきです。しかし世界の公用語にすることは文化的多様性と公平性を脅かします。これらの理由から、私はこの考えに反対です。",
        wordCount: 240,
        qa: [
            { q: "Wouldn't a single official language make global communication much easier?", a: "It might in the short term, but English already serves that role informally without official status. We can enjoy the convenience of a common language without forcing it on everyone." },
            { q: "Aren't minority languages dying out anyway?", a: "Sadly many are, but that is all the more reason not to speed up the process. Official status for English would remove much of the incentive to preserve and teach smaller languages." },
            { q: "Is it fair that native English speakers have such an advantage already?", a: "That is exactly part of my concern. Making English official would lock that advantage in permanently, so I would rather encourage multilingualism and good translation technology instead." },
            { q: "What language do you think should be used in international organizations?", a: "I think using several working languages, as the United Nations does, is a sensible compromise. It respects diversity while still allowing effective communication." }
        ],
        keyExpressions: [
            { en: "While ~ is undeniably useful, I do not believe ~", ja: "〜は確かに有用だが〜とは思わない", note: "一面を認めつつ反対する型" },
            { en: "~ is one thing, but ~", ja: "〜と〜は別問題だ", note: "似て非なる二つを切り分ける" },
            { en: "This hardly seems just.", ja: "これは到底公正とは思えない", note: "不公平を強調する評価表現" },
            { en: "That said, I do recognize ~", ja: "とはいえ〜は認める", note: "反対側にも一理あると譲歩" },
            { en: "For these reasons, I am opposed to ~", ja: "これらの理由で反対だ", note: "反対の立場で締める型" }
        ],
        tip: "反対の立場でも「共通語としての英語は認める」と一部譲歩すると極端さが消える。one thing but の対比で論点を整理すると聞き手に伝わりやすい。",
    },
    {
        day: 17,
        category: "社会",
        topic: "Should companies be required to hire more women in leadership positions?",
        topicJa: "企業は女性管理職をもっと採用するよう義務づけられるべきか",
        stance: "Companies should be strongly encouraged, and in some cases required, to put more women in leadership.",
        speech: "I believe companies should be required to bring more women into leadership positions, at least until genuine equality is achieved. Although I understand the worry that this might feel unfair, I think the benefits to both businesses and society make a strong case.\n\nFirst, diverse leadership simply makes better decisions. When the people at the top all share the same background, they tend to overlook the needs of half the population. Consider product design, for example. Companies with women in leadership are far more likely to create products and services that work well for everyone, not just for men. Numerous studies have also shown that diverse boards tend to be more profitable.\n\nSecond, without some form of requirement, change happens painfully slowly. For decades, companies have promised to promote more women, yet progress has been minimal. This suggests that good intentions alone are not enough. Clear targets or rules, like those introduced in several European countries, can break through long-standing barriers and unconscious bias.\n\nI should add that this does not mean hiring unqualified people. The aim is to give talented women a fair chance that they have long been denied, not to lower standards.\n\nIn conclusion, while requirements may feel uncomfortable at first, they are an effective way to correct a deep imbalance. All things considered, I firmly support measures to increase women in leadership.",
        speechJa: "私は、少なくとも真の平等が達成されるまでは、企業は女性管理職をもっと増やすよう義務づけられるべきだと考えます。これが不公平に感じられるという懸念は理解しますが、企業と社会の双方への利点が強い根拠になると思います。\n\n第一に、多様なリーダーシップは単純により良い意思決定をもたらします。トップにいる人々が皆同じ背景を持つと、人口の半分のニーズを見落としがちです。例えば製品設計を考えてみてください。女性が指導層にいる企業は、男性だけでなく全員にとって使いやすい製品やサービスを生み出す可能性がはるかに高いのです。多くの研究も、多様な取締役会のほうが収益性が高い傾向にあると示しています。\n\n第二に、何らかの義務づけがなければ、変化は痛々しいほど遅く進みます。何十年も企業は女性をもっと昇進させると約束してきましたが、進歩はわずかでした。これは善意だけでは不十分だということを示しています。いくつかの欧州諸国で導入されたような明確な目標やルールは、根深い障壁や無意識の偏見を打ち破ることができます。\n\n付け加えると、これは能力のない人を雇うという意味ではありません。目的は基準を下げることではなく、長らく与えられてこなかった公平な機会を有能な女性に与えることです。\n\n結論として、義務づけは最初は居心地が悪く感じられるかもしれませんが、深い不均衡を是正する効果的な方法です。すべてを考慮すると、私は女性の登用を増やす施策を強く支持します。",
        wordCount: 235,
        qa: [
            { q: "Isn't it unfair to promote someone based on gender rather than ability?", a: "I understand that worry, but the goal is not to ignore ability. It is to remove the hidden bias that has unfairly held qualified women back for so long." },
            { q: "Shouldn't companies be free to choose their own leaders?", a: "In principle yes, but decades of free choice have produced very little change. A temporary push is sometimes needed to break a cycle that the market clearly is not fixing on its own." },
            { q: "Could quotas create resentment in the workplace?", a: "That is a real risk, so communication matters. If companies explain that the aim is fairness and better performance, most employees come to see the value over time." },
            { q: "Will these measures still be needed in the future?", a: "Ideally no. I see them as temporary tools. Once balanced leadership becomes normal and bias fades, such requirements can and should be removed." }
        ],
        keyExpressions: [
            { en: "Although I understand the worry that ~", ja: "〜という懸念は理解するが", note: "反対意見を先に認める型" },
            { en: "~ makes a strong case", ja: "〜は強い根拠になる", note: "主張の説得力を述べる" },
            { en: "I should add that ~", ja: "付け加えると〜", note: "誤解を防ぐ補足を足す型" },
            { en: "good intentions alone are not enough", ja: "善意だけでは不十分だ", note: "現状批判によく効く決め台詞" },
            { en: "I see them as temporary tools.", ja: "それは一時的な手段だと考える", note: "義務化の行き過ぎ懸念への返し" }
        ],
        tip: "デリケートな話題は「基準は下げない」「一時的措置」と限定を添えて炎上を防ぐ。studies have shown で客観性を一言足すと1級らしくなる。",
    },
    {
        day: 18,
        category: "環境",
        topic: "Should developed countries do more to combat climate change?",
        topicJa: "先進国は気候変動対策にもっと取り組むべきか",
        stance: "Yes, developed countries clearly have a responsibility to do far more.",
        speech: "I strongly believe that developed countries should do much more to combat climate change. As the nations that have benefited most from industrial growth, they bear both the greatest responsibility and the greatest capacity to act.\n\nFirst, developed countries are historically responsible for most of the emissions causing the crisis. For more than a century, they built their wealth by burning fossil fuels. Consider the consequences, for example. The countries suffering the worst effects today, such as low-lying island nations, are often the ones that contributed the least. It is only fair that those who created most of the problem take the lead in solving it.\n\nSecond, developed countries have the money and technology that the rest of the world lacks. They can afford to invest heavily in renewable energy and clean technology, and then share that technology with developing nations. In other words, they are uniquely positioned to drive the global transition that everyone urgently needs.\n\nSome people argue that rapidly growing economies like China and India should act first. While their emissions do matter, I think it is unrealistic and unfair to expect poorer countries to sacrifice their development when wealthy nations are still far from carbon neutral themselves.\n\nIn conclusion, given their historical responsibility and their resources, developed countries have a clear duty to lead. All things considered, I firmly believe they must do far more before it is too late.",
        speechJa: "私は、先進国は気候変動と戦うためにもっと多くのことをすべきだと強く信じています。産業の成長から最も恩恵を受けてきた国々として、彼らは最大の責任と最大の行動能力の両方を負っています。\n\n第一に、先進国はこの危機を引き起こしている排出の大部分について歴史的に責任があります。一世紀以上にわたり、彼らは化石燃料を燃やすことで富を築いてきました。例えばその結果を考えてみてください。今日最悪の影響を受けている国々、たとえば低地の島嶼国は、しばしば最も排出に寄与してこなかった国々なのです。問題の大半を作り出した者がその解決の先頭に立つのは、当然のことです。\n\n第二に、先進国には世界の他の地域にはない資金と技術があります。彼らは再生可能エネルギーやクリーン技術に大規模に投資する余裕があり、その技術を途上国と共有することもできます。言い換えれば、彼らは誰もが緊急に必要とする世界的な転換を牽引できる唯一無二の立場にあるのです。\n\n中国やインドのような急成長する経済こそ先に行動すべきだと主張する人もいます。確かにそれらの国の排出も問題ですが、豊かな国々自身がまだ炭素中立にほど遠いのに、より貧しい国々に発展を犠牲にせよと求めるのは非現実的で不公平だと思います。\n\n結論として、歴史的責任と資源を考えれば、先進国には明確に先導する義務があります。すべてを考慮すると、手遅れになる前に彼らははるかに多くのことをしなければならないと強く信じています。",
        wordCount: 244,
        qa: [
            { q: "Why should developed countries pay when developing nations pollute too?", a: "It is true that emissions from developing nations are rising, but per person, rich countries still pollute far more. Given their wealth and history, it is only fair that they lead the way." },
            { q: "Won't strict climate policies hurt developed economies?", a: "There may be short-term costs, but the long-term cost of inaction is far greater. Investing in green industries also creates new jobs and gives these countries a competitive edge." },
            { q: "Is individual action by citizens enough, or do we need governments?", a: "Individual effort helps, but the scale of the problem requires government policy and large-scale investment. Personal choices simply cannot move fast enough on their own." },
            { q: "Are international agreements like the Paris Agreement effective?", a: "They are an important first step because they set shared goals, but enforcement is weak. I think they need stronger commitments and real penalties to truly make a difference." }
        ],
        keyExpressions: [
            { en: "I strongly believe that ~", ja: "〜と強く信じている", note: "立場を力強く打ち出す型" },
            { en: "It is only fair that ~", ja: "〜するのは当然だ", note: "公平性に訴える主張表現" },
            { en: "they are uniquely positioned to ~", ja: "〜できる唯一無二の立場にある", note: "適任である理由を述べる" },
            { en: "Some people argue that ~, while ~", ja: "〜という人もいるが一方で〜", note: "反論を紹介して退ける型" },
            { en: "before it is too late", ja: "手遅れになる前に", note: "結論に緊急性を添える締め" }
        ],
        tip: "気候テーマは「歴史的責任」と「能力」の二本柱が定番で外しにくい。中国・インド反論を自分から先取りすると、Q&Aでの不意打ちを防げる。",
    },
    {
        day: 19, category: "社会・倫理",
        topic: "Is censorship ever justified?",
        topicJa: "検閲は正当化されることがあるか",
        stance: "Yes, censorship can be justified in limited cases, but only as a last resort.",
        speech: "In my opinion, censorship can be justified, but only in very limited and carefully defined situations. I would like to explain why I take this balanced view.\n\nTo begin with, some forms of speech cause direct and serious harm to society. Content such as child abuse material, instructions for making weapons, or messages that incite violence against a particular group can lead to real-world tragedies. In these cases, a democratic government has a duty to protect its citizens, and removing such content is not an attack on freedom but a way of preserving public safety.\n\nIn addition, completely unregulated information can threaten national security and public health. During the recent pandemic, for example, false claims about cures spread rapidly online and put many lives at risk. A reasonable level of control over clearly dangerous misinformation can protect vulnerable people who cannot easily judge what is true.\n\nHowever, I must stress that censorship is dangerous when it goes too far. Governments often abuse it to silence critics and hide their own mistakes, so any restriction must be transparent, limited, and open to legal challenge.\n\nTo sum up, censorship is not something we should welcome, but I believe it can be justified when it is the only way to prevent serious harm. The key is to keep it as narrow as possible.",
        speechJa: "私の意見では、検閲は非常に限定的で慎重に定義された状況においてのみ正当化されうると思います。なぜこのような中立的な立場を取るのか説明します。\n\nまず、ある種の言論は社会に直接的で深刻な害をもたらします。児童虐待にあたる素材や武器の製造方法、特定の集団への暴力を扇動するメッセージなどは、現実の悲劇につながりかねません。こうした場合、民主的な政府には市民を守る義務があり、そうした内容を削除することは自由への攻撃ではなく公共の安全を守る手段です。\n\nさらに、全く規制されない情報は国家の安全や公衆衛生を脅かします。先のパンデミックでは、治療法に関する誤った主張がネット上で急速に広がり、多くの命を危険にさらしました。明らかに危険な誤情報への合理的な管理は、何が真実か判断しにくい弱い立場の人々を守ります。\n\nただし、検閲は行き過ぎると危険だと強調しなければなりません。政府はしばしばそれを悪用して批判者を黙らせ、自らの過ちを隠します。だからあらゆる制限は透明で限定的、かつ法的に争える形でなければなりません。\n\nまとめると、検閲は歓迎すべきものではありませんが、深刻な害を防ぐ唯一の手段である場合には正当化されうると考えます。鍵は、それを可能な限り狭く保つことです。",
        wordCount: 243,
        qa: [
            { q: "Who should decide what gets censored?", a: "I believe it should be an independent body, not the government alone. If politicians control censorship, they can easily abuse it to protect themselves. Courts and independent regulators with clear rules are far safer." },
            { q: "Doesn't censorship violate freedom of speech?", a: "I see your point, but freedom of speech has never been absolute. Even free societies ban things like fraud and direct threats. The aim is to draw a clear line at speech that causes real harm." },
            { q: "Is online content harder to censor than traditional media?", a: "Yes, definitely. The sheer volume of online content makes it almost impossible to control completely. That is why I think platforms and users should share responsibility, rather than relying on censorship alone." },
            { q: "Could censorship ever do more harm than good?", a: "Absolutely. If it is used to hide corruption or silence opposition, it damages democracy itself. That is exactly why any censorship must be transparent and strictly limited." }
        ],
        keyExpressions: [
            { en: "In my opinion, ~ but only in limited cases", ja: "私の意見では、限定的な場合に限り〜だ", note: "条件つきの立場表明" },
            { en: "To begin with, ~", ja: "まず第一に〜", note: "一つ目の理由の導入" },
            { en: "In addition, ~", ja: "加えて〜", note: "二つ目の理由の追加" },
            { en: "I must stress that ~", ja: "〜だと強調しなければならない", note: "重要な留保を述べる" },
            { en: "To sum up, ~", ja: "要約すると〜", note: "結論への接続" },
            { en: "I see your point, but ~", ja: "おっしゃる通りですが〜", note: "Q&Aで譲歩してから反論" }
        ],
        tip: "賛否がはっきりしないテーマでは「限定的に賛成」のように条件を付けると説得力が増します。ただし冒頭の立場は一文で言い切りましょう。",
    },
    {
        day: 20, category: "教育・社会",
        topic: "Should higher education be free for everyone?",
        topicJa: "高等教育はすべての人に無償であるべきか",
        stance: "No, higher education should be heavily subsidized but not completely free.",
        speech: "It seems to me that higher education should be made far more affordable, but I do not think it should be completely free for everyone. Let me give two reasons for this position.\n\nTo begin with, fully free education has to be paid for by someone, usually through higher taxes. Many of these taxes come from people who never attend university, including manual workers and small business owners. It strikes me as unfair to ask them to fund the degrees of others who will often go on to earn much higher salaries. A balanced system, where the state covers most of the cost and students pay a small share, seems much fairer.\n\nIn addition, charging at least a modest fee encourages students to take their studies seriously. When something is completely free, people tend to value it less. If students invest even a little of their own money, they are more likely to choose their courses carefully and work hard to finish them.\n\nHaving said that, I strongly believe that no talented student should be blocked by poverty. That is why I support generous scholarships and income-based loans for those who genuinely need them.\n\nIn conclusion, the goal should be access for all, not necessarily zero cost for all. By keeping fees low and offering strong support to the poor, we can open the doors of education without placing an unfair burden on society.",
        speechJa: "私には、高等教育ははるかに手頃にすべきだと思えますが、すべての人に完全に無償であるべきだとは思いません。この立場について二つの理由を述べます。\n\nまず、完全無償の教育は誰かが負担しなければならず、たいていは増税という形になります。その税の多くは大学に通わない人々、たとえば肉体労働者や小規模事業主から集められます。後に高い給料を得ることが多い人の学位を、彼らに負担させるのは不公平に思えます。国が費用の大半を負担し、学生が少額を払う均衡の取れた制度のほうがずっと公平です。\n\nさらに、せめてわずかな授業料を課すことは、学生に学業を真剣に受け止めさせます。完全に無料のものは軽んじられがちです。学生が自分のお金を少しでも投じれば、科目を慎重に選び、修了に向けて努力する可能性が高まります。\n\nとはいえ、才能ある学生が貧困によって阻まれてはならないと強く思います。だからこそ、本当に必要とする人々への手厚い奨学金や所得連動型ローンを支持します。\n\n結論として、目指すべきは全員へのアクセスであって、必ずしも全員無償ではありません。授業料を低く抑え、貧しい人々を強く支援することで、社会に不公平な負担をかけずに教育の扉を開くことができます。",
        wordCount: 247,
        qa: [
            { q: "Wouldn't free education reduce inequality?", a: "It might in theory, but in practice the wealthy often benefit most, since their children are more likely to attend university. I think targeted scholarships for the poor reduce inequality more effectively than blanket free tuition." },
            { q: "Some countries already offer free university. Doesn't that work?", a: "I see your point, however those systems are funded by very high taxes that the public accepts. Whether that model fits every country depends on its tax culture and economy." },
            { q: "Should vocational training also be subsidized?", a: "Yes, absolutely. We tend to overvalue university degrees and overlook skilled trades. Supporting vocational training equally would benefit both the economy and students who learn better through practical work." },
            { q: "Does a degree still guarantee a good job?", a: "Not anymore, I am afraid. With so many graduates, a degree alone is no longer enough. That is another reason why students should think carefully before taking on huge costs." }
        ],
        keyExpressions: [
            { en: "It seems to me that ~", ja: "私には〜のように思える", note: "柔らかい立場表明" },
            { en: "It strikes me as unfair to ~", ja: "〜は不公平に思える", note: "価値判断を述べる" },
            { en: "Having said that, ~", ja: "とはいえ〜", note: "譲歩・補足を加える" },
            { en: "In conclusion, ~", ja: "結論として〜", note: "結論への接続" },
            { en: "Not anymore, I am afraid", ja: "残念ながら、もうそうではない", note: "Q&Aで丁寧に否定する" },
            { en: "depends on ~", ja: "〜次第だ", note: "条件を示して答える" }
        ],
        tip: "「完全無償か否か」のような二択でも、中間の現実的な案を提示すると1級らしい厚みが出ます。理由の後に必ず例や説明を一文添えましょう。",
    },
    {
        day: 21, category: "国際・平和",
        topic: "Should the production of nuclear weapons be banned worldwide?",
        topicJa: "核兵器の製造は世界的に禁止されるべきか",
        stance: "Yes, the production of nuclear weapons should be banned worldwide.",
        speech: "In my opinion, the production of nuclear weapons should be banned all over the world. The risks they pose are simply too great to justify. Let me explain my reasoning.\n\nThe main reason is that nuclear weapons threaten the survival of humanity itself. A single warhead can destroy an entire city in seconds and leave radiation that harms people for generations. As long as these weapons are being produced, there is always a danger that they could be used by accident, by mistake, or by an unstable leader. No political goal can possibly be worth that kind of catastrophe.\n\nAnother reason is that producing nuclear weapons fuels dangerous arms races. When one country builds them, its rivals feel forced to do the same, and enormous amounts of money are wasted. This can be seen in the Cold War, when two superpowers stockpiled enough weapons to destroy the world many times over. That money could have been spent on health care, education, and fighting poverty instead.\n\nOf course, I realize that countries fear giving up their weapons while others keep theirs. That is why a worldwide ban must be backed by strict inspections and mutual trust.\n\nTo conclude, nuclear weapons offer no real security, only the constant threat of total destruction. For the sake of future generations, I firmly believe the world should work toward a complete ban.",
        speechJa: "私の意見では、核兵器の製造は世界中で禁止されるべきです。それがもたらす危険はあまりに大きく、正当化できません。私の理由を説明します。\n\n主な理由は、核兵器が人類そのものの生存を脅かすからです。一発の弾頭が数秒で都市全体を破壊し、何世代にもわたって人々を傷つける放射線を残します。これらの兵器が製造され続ける限り、事故や誤り、あるいは不安定な指導者によって使われる危険が常にあります。いかなる政治的目的も、そのような破局に見合うはずがありません。\n\nもう一つの理由は、核兵器の製造が危険な軍拡競争を煽ることです。ある国が作れば、競合国も同じことをせざるを得ないと感じ、莫大な資金が浪費されます。これは冷戦に見て取れます。二つの超大国が世界を何度も滅ぼせるほどの兵器を備蓄しました。その資金は医療や教育、貧困との闘いに使えたはずです。\n\nもちろん、他国が兵器を持ち続ける中で自国だけ手放すことを各国が恐れるのは理解できます。だからこそ、世界的な禁止は厳格な査察と相互の信頼によって支えられなければなりません。\n\n結論として、核兵器は本当の安全をもたらさず、ただ全面的破壊の絶え間ない脅威をもたらすだけです。未来の世代のために、世界は完全な禁止に向けて取り組むべきだと固く信じます。",
        wordCount: 240,
        qa: [
            { q: "Don't nuclear weapons prevent war through deterrence?", a: "I see your point, however deterrence relies on every leader behaving rationally, which we cannot guarantee. One accident or one reckless decision could be catastrophic, so I find the risk far too high." },
            { q: "How could such a ban realistically be enforced?", a: "It would require a strong international body with the power to inspect facilities, much like existing nuclear watchdogs. It is difficult, but the alternative of endless proliferation is far worse." },
            { q: "What about countries that refuse to comply?", a: "That is the hardest problem. I think a combination of economic pressure and diplomatic isolation is the realistic tool, since military force would only increase the danger." },
            { q: "Is a nuclear-free world really possible?", a: "Honestly, it will take decades and a great deal of trust. But goals like this set the direction. Even reducing the number of weapons is a meaningful step forward." }
        ],
        keyExpressions: [
            { en: "The main reason is that ~", ja: "主な理由は〜だ", note: "一つ目の理由の提示" },
            { en: "Another reason is that ~", ja: "もう一つの理由は〜だ", note: "二つ目の理由の提示" },
            { en: "This can be seen in ~", ja: "それは〜に見て取れる", note: "具体例・根拠の導入" },
            { en: "Of course, I realize that ~", ja: "もちろん〜は理解している", note: "反論を先取りして認める" },
            { en: "To conclude, ~", ja: "結論として〜", note: "結論への接続" },
            { en: "For the sake of ~", ja: "〜のために", note: "目的・価値を強調する" }
        ],
        tip: "強い賛成のテーマでは、反対意見(抑止力など)を一度認めてから反論すると公平に聞こえます。数字や歴史的事例を一つ入れると1級らしくなります。",
    },
    {
        day: 22, category: "環境・倫理",
        topic: "Should zoos be abolished?",
        topicJa: "動物園は廃止されるべきか",
        stance: "No, zoos should not be abolished, but they should be strictly reformed.",
        speech: "It seems to me that zoos should not be abolished, but they should be reformed to put animal welfare first. Let me give two reasons for keeping them.\n\nTo begin with, modern zoos play a vital role in protecting endangered species. Many animals now survive only in captivity, and zoos run breeding programs that have saved species from extinction. This can be seen in animals like certain rare horses and pandas, whose numbers have recovered thanks to careful work in zoos. If we abolished zoos altogether, we would lose this important safety net.\n\nIn addition, zoos give millions of ordinary people, especially children, a chance to see wild animals up close. Watching a real elephant or tiger creates a sense of wonder that no documentary can match. This experience can inspire young people to care about nature and to support conservation later in life.\n\nHaving said that, I fully accept that many zoos in the past kept animals in cruel and tiny cages. That kind of zoo has no place today. Modern zoos must provide spacious, natural environments and focus on education and conservation, not entertainment alone.\n\nIn conclusion, rather than abolishing zoos, we should hold them to much higher standards. A well-run zoo can protect animals and inspire people at the same time, which is something we should value.",
        speechJa: "私には、動物園は廃止されるべきではなく、動物福祉を最優先するよう改革されるべきだと思えます。存続させる理由を二つ述べます。\n\nまず、現代の動物園は絶滅危惧種を守る上で極めて重要な役割を果たします。今や飼育下でしか生き残れない動物も多く、動物園は種を絶滅から救ってきた繁殖プログラムを運営しています。これは、ある種の希少な馬やパンダなど、動物園での丁寧な取り組みのおかげで数が回復した動物に見て取れます。もし動物園を完全に廃止すれば、この重要な安全網を失ってしまいます。\n\nさらに、動物園は何百万もの一般の人々、とりわけ子どもたちに、野生動物を間近で見る機会を与えます。本物のゾウやトラを見ることは、どんなドキュメンタリーにも勝る驚きの感覚を生みます。この体験は、若者が自然を大切に思い、後の人生で保護活動を支援するきっかけになります。\n\nとはいえ、過去の多くの動物園が残酷で狭い檻に動物を閉じ込めていたことは全面的に認めます。そのような動物園は今日では存在すべきではありません。現代の動物園は広く自然に近い環境を用意し、娯楽だけでなく教育と保護に重点を置かねばなりません。\n\n結論として、動物園を廃止するのではなく、はるかに高い基準を課すべきです。よく運営された動物園は動物を守り、同時に人々を感動させることができ、それは私たちが大切にすべきものです。",
        wordCount: 241,
        qa: [
            { q: "Isn't it cruel to keep wild animals in captivity?", a: "I see your point, and it certainly can be cruel in poorly run zoos. But a modern zoo with large, natural enclosures can give animals a safe life, sometimes longer than in the wild." },
            { q: "Couldn't conservation be done in the wild instead?", a: "Ideally, yes, but many habitats are being destroyed faster than we can protect them. Zoos act as a backup, keeping populations alive until their natural homes can be restored." },
            { q: "Do zoos really educate people, or just entertain them?", a: "Good zoos do both. The key is how they present animals. When they explain conservation and habitat loss, a fun visit can turn into real learning and lasting concern." },
            { q: "What should happen to badly run zoos?", a: "They should be either reformed or closed down. Animals from those zoos could be moved to sanctuaries or better facilities. Low standards damage the reputation of responsible zoos." }
        ],
        keyExpressions: [
            { en: "Let me give two reasons for ~", ja: "〜について二つ理由を挙げさせてください", note: "構成を予告する" },
            { en: "This can be seen in ~", ja: "それは〜に見て取れる", note: "具体例・根拠の導入" },
            { en: "no documentary can match", ja: "どんなドキュメンタリーにも勝る", note: "比較で強調する型" },
            { en: "I fully accept that ~", ja: "〜を全面的に認める", note: "反対意見を認める" },
            { en: "rather than ~ing, we should ~", ja: "〜するのではなく〜すべきだ", note: "代案を提示する" },
            { en: "In conclusion, ~", ja: "結論として〜", note: "結論への接続" }
        ],
        tip: "「廃止すべきか」型は、全否定せず『改革して残す』という第三の道を示すと深みが出ます。スピーチ冒頭で結論を一文で示してから理由に入りましょう。",
    },
    {
        day: 23, category: "環境・経済",
        topic: "Is economic growth more important than environmental protection?",
        topicJa: "経済成長は環境保護より重要か",
        stance: "No, environmental protection is more important in the long run.",
        speech: "In my opinion, environmental protection is ultimately more important than economic growth. While both matter, I believe the environment must come first. Let me explain why.\n\nThe main reason is that without a healthy environment, economic growth cannot last. Our economies depend completely on natural resources such as clean water, fertile soil, and a stable climate. If we destroy these in the pursuit of short-term profit, the growth we gain today will collapse tomorrow. This can be seen in regions where overfishing or deforestation first brought quick money but later left people poorer than before.\n\nAnother reason is that environmental damage often cannot be reversed. We can recover from a recession in a few years, but we cannot easily bring back an extinct species or a melted glacier. Future generations will have to live with the consequences of the choices we make now, so we have a moral duty to protect the planet for them.\n\nOf course, I realize that many people depend on growth for jobs and a better life, especially in developing countries. The answer, though, is not to abandon growth but to make it green and sustainable.\n\nTo sum up, economic growth is important, but it is meaningless if it destroys the very planet we live on. In the long run, protecting the environment is the wiser and more responsible choice.",
        speechJa: "私の意見では、環境保護は経済成長よりも最終的には重要です。どちらも大切ですが、環境を優先すべきだと考えます。その理由を説明します。\n\n主な理由は、健全な環境なしには経済成長が続かないからです。私たちの経済は、きれいな水や肥沃な土壌、安定した気候といった天然資源に完全に依存しています。短期的な利益を追ってこれらを破壊すれば、今日得た成長は明日には崩れます。これは、乱獲や森林破壊が最初は手早い金をもたらしたものの、後に人々を以前より貧しくした地域に見て取れます。\n\nもう一つの理由は、環境の損害はしばしば取り返しがつかないことです。不況からは数年で立ち直れますが、絶滅した種や溶けた氷河を簡単に取り戻すことはできません。未来の世代は私たちが今下す選択の結果を背負って生きねばならず、私たちには彼らのために地球を守る道徳的義務があります。\n\nもちろん、特に発展途上国では、多くの人々が雇用やより良い暮らしのために成長に依存していることは理解しています。しかし答えは、成長を放棄することではなく、それを環境に優しく持続可能なものにすることです。\n\nまとめると、経済成長は重要ですが、私たちが暮らすまさにその地球を破壊するなら無意味です。長い目で見れば、環境を守ることがより賢明で責任ある選択です。",
        wordCount: 240,
        qa: [
            { q: "But don't poor countries need growth to survive?", a: "I see your point, and growth is essential for them. But that growth should be sustainable from the start, so they do not repeat the costly mistakes that rich countries made." },
            { q: "Isn't environmental protection too expensive?", a: "It looks expensive in the short term, but cleaning up disasters and treating pollution-related illness costs far more. Prevention is almost always cheaper than the cure." },
            { q: "Can technology let us grow without harming nature?", a: "To some extent, yes. Clean energy and efficient design are very promising. Still, technology alone is not enough. We also need to change how much we consume." },
            { q: "Who should pay for protecting the environment?", a: "I believe wealthy nations and big polluters should pay the most, since they caused much of the damage. But honestly, it is a shared responsibility for everyone." }
        ],
        keyExpressions: [
            { en: "While both matter, I believe ~", ja: "どちらも大切だが〜だと思う", note: "両論を認めつつ立場を示す" },
            { en: "The main reason is that ~", ja: "主な理由は〜だ", note: "一つ目の理由の提示" },
            { en: "Another reason is that ~", ja: "もう一つの理由は〜だ", note: "二つ目の理由の提示" },
            { en: "in the long run", ja: "長い目で見れば", note: "時間軸で論じる" },
            { en: "The answer is not to ~ but to ~", ja: "答えは〜ではなく〜することだ", note: "代案で締める型" },
            { en: "To sum up, ~", ja: "要約すると〜", note: "結論への接続" }
        ],
        tip: "対立する二つの価値を比べる問題では『どちらも大事だが長期的にはこちら』と時間軸で整理すると説得力が出ます。両者を二項対立で切り捨てないのがコツです。",
    },
    {
        day: 24, category: "環境・エネルギー",
        topic: "Should developed nations reduce their dependence on fossil fuels?",
        topicJa: "先進国は化石燃料への依存を減らすべきか",
        stance: "Yes, developed nations should clearly reduce their dependence on fossil fuels.",
        speech: "In my opinion, developed nations should definitely reduce their dependence on fossil fuels. They have both the responsibility and the resources to lead this change. Let me give two reasons.\n\nThe main reason is that fossil fuels are the largest cause of climate change. Burning coal, oil, and gas releases huge amounts of carbon dioxide, which traps heat and drives extreme weather. Developed nations have produced most of these emissions historically, so it is only fair that they take the lead in cutting them. If the richest countries do not act, we can hardly expect poorer nations to do so.\n\nAnother reason is that reducing dependence on fossil fuels brings real economic benefits. Renewable energy such as solar and wind is becoming cheaper every year, and it creates many new jobs. This can be seen in countries that have invested heavily in green technology and now lead in growing industries. Relying on imported oil, by contrast, leaves a nation exposed to price shocks and unstable suppliers.\n\nI do recognize that this shift cannot happen overnight, since whole economies are built around fossil fuels. The change must be gradual and must protect workers in traditional energy jobs.\n\nTo conclude, reducing dependence on fossil fuels is both a moral duty and a smart investment. Developed nations are in the best position to lead the world toward a cleaner future.",
        speechJa: "私の意見では、先進国は化石燃料への依存を確実に減らすべきです。先進国にはその変化を主導する責任と資源の両方があります。二つの理由を挙げます。\n\n主な理由は、化石燃料が気候変動の最大の原因だからです。石炭、石油、ガスを燃やすと膨大な量の二酸化炭素が放出され、それが熱を閉じ込めて異常気象を引き起こします。先進国は歴史的にこれらの排出の大半を生み出してきたので、その削減を主導するのは当然のことです。最も豊かな国々が行動しなければ、より貧しい国々にそれを期待することはほとんどできません。\n\nもう一つの理由は、化石燃料への依存を減らすことが本当の経済的利益をもたらすことです。太陽光や風力などの再生可能エネルギーは年々安くなっており、多くの新しい雇用を生みます。これは、環境技術に多額の投資をし、今や成長産業をリードする国々に見て取れます。対照的に、輸入石油に依存することは、価格の急変や不安定な供給元に国をさらすことになります。\n\nこの転換が一夜にして起こらないことは認識しています。経済全体が化石燃料を中心に作られているからです。変化は段階的でなければならず、従来のエネルギー職の労働者を守らねばなりません。\n\n結論として、化石燃料への依存を減らすことは道徳的義務であると同時に賢明な投資でもあります。先進国は、よりクリーンな未来へと世界を導く最良の立場にあります。",
        wordCount: 244,
        qa: [
            { q: "Won't reducing fossil fuels hurt the economy?", a: "It may cause short-term costs in some industries, but the green sector is creating far more jobs than it replaces. With proper retraining, the overall effect on the economy can be positive." },
            { q: "Why should developed nations act first?", a: "Because they caused most of the historical emissions and they have the money and technology to lead. It would be unfair to demand sacrifices from poor countries while rich ones do nothing." },
            { q: "Is renewable energy reliable enough yet?", a: "It is improving quickly, especially with better battery storage. There are still gaps, so we may need some backup power for now, but the direction is clearly toward renewables." },
            { q: "What about nuclear power as an alternative?", a: "I see your point, and nuclear power does produce low emissions. However, concerns about safety and waste make it controversial, so I would treat it as one option among several." }
        ],
        keyExpressions: [
            { en: "definitely / certainly ~", ja: "間違いなく〜", note: "立場を強く明示する" },
            { en: "The main reason is that ~", ja: "主な理由は〜だ", note: "一つ目の理由の提示" },
            { en: "it is only fair that ~", ja: "〜は当然のことだ", note: "公平性に基づく主張" },
            { en: "This can be seen in ~", ja: "それは〜に見て取れる", note: "具体例・根拠の導入" },
            { en: "I do recognize that ~", ja: "〜は確かに認識している", note: "現実的な制約を認める" },
            { en: "To conclude, ~", ja: "結論として〜", note: "結論への接続" }
        ],
        tip: "「先進国は〜すべきか」型では、責任(誰が排出したか)と能力(資源があるか)の二軸で論じると1級らしい厚みが出ます。理由ごとに必ず具体例を添えましょう。",
    },
    {
        day: 25, category: "社会",
        topic: "Should governments do more to support an aging population?",
        topicJa: "政府は高齢化社会をもっと支援すべきか",
        stance: "Yes. Governments should expand support for aging populations through better healthcare and flexible work systems.",
        speech: "I strongly believe that governments should do more to support their aging populations. Let me explain why.\n\nFirstly, many elderly people live in poverty and isolation, and they simply cannot cope on their own. Pensions in many countries have not kept up with rising living costs, so a lot of seniors struggle to afford healthcare and even basic food. For instance, in Japan, the number of elderly people living alone has risen sharply, and cases of so-called lonely deaths have become a serious social problem. Without stronger government support, this situation will only get worse as the population continues to age.\n\nSecondly, supporting older citizens actually benefits the whole economy. If governments provide better healthcare and create flexible jobs for seniors, healthy elderly people can keep working and contributing taxes instead of relying entirely on welfare. This eases the burden on younger generations, who are already shrinking in number. In other words, investing in the elderly is not just charity; it is a smart long-term strategy that keeps society stable and productive.\n\nFor these reasons, I am convinced that governments must take a more active role in supporting aging populations. Caring for the elderly is both a moral duty and a wise investment in our shared future.",
        speechJa: "私は政府が高齢者をもっと支援すべきだと強く考えます。理由を説明します。\n\n第一に、多くの高齢者が貧困と孤立の中で暮らし、自力では対処できません。多くの国で年金が物価上昇に追いつかず、医療や基本的な食事すら賄えない高齢者が大勢います。例えば日本では一人暮らしの高齢者が急増し、いわゆる孤独死が深刻な社会問題になっています。支援を強めなければ、高齢化が進むにつれ状況は悪化するばかりです。\n\n第二に、高齢者支援は経済全体にも利益をもたらします。良質な医療と柔軟な仕事を提供すれば、健康な高齢者は働き続け、福祉に頼るのではなく税を納めて貢献できます。これは数が減りつつある若い世代の負担を軽くします。つまり高齢者への投資は単なる慈善ではなく、社会を安定させ生産的に保つ賢明な長期戦略なのです。\n\n以上の理由から、政府は高齢化社会の支援にもっと積極的な役割を果たすべきだと確信します。高齢者を支えることは道徳的義務であると同時に、共有する未来への賢い投資なのです。",
        wordCount: 222,
        qa: [
            { q: "Isn't supporting the elderly too expensive for the government budget?", a: "It is costly, that's true. But the cost of doing nothing is even higher, because untreated illness and poverty lead to emergency care and social breakdown. Spending wisely now actually saves money in the long run." },
            { q: "Whose responsibility is it to care for the elderly, the family or the state?", a: "Ideally both share the burden. However, family structures have changed, and many seniors have no children nearby. So the state has to provide a safety net for those who would otherwise fall through the cracks." },
            { q: "Could raising the retirement age help?", a: "Yes, I think it could help a great deal. Many people are healthy well into their seventies and want to keep working. Letting them stay employed reduces pension costs and keeps valuable experience in the workforce." },
            { q: "Are younger generations being treated unfairly by these policies?", a: "There is a risk of that, I admit. That's why support should be designed so it doesn't crush the young with taxes. A balanced system, where healthy seniors keep contributing, protects both generations." }
        ],
        keyExpressions: [
            { en: "I strongly believe that ~", ja: "〜だと強く考える", note: "冒頭で立場を明確に示す定番" },
            { en: "Let me explain why.", ja: "理由を説明させてください", note: "本論への橋渡し" },
            { en: "For instance, ~", ja: "例えば〜", note: "具体例を出す基本形" },
            { en: "In other words, ~", ja: "言い換えれば〜", note: "要点を言い直して強調する" },
            { en: "For these reasons, I am convinced that ~", ja: "以上の理由から〜だと確信する", note: "締めで立場を再確認" },
            { en: "It is costly, that's true. But ~", ja: "確かに費用はかかる、しかし〜", note: "Q&Aの部分譲歩→反論" }
        ],
        tip: "冒頭の一文で立場を断言し、迷いを見せないことが高評価につながります。Firstly / Secondly で理由を機械的に区切ると、聞き手が論理を追いやすくなります。",
    },
    {
        day: 26, category: "社会",
        topic: "Should children's access to the internet be restricted?",
        topicJa: "子供のインターネット利用は制限すべきか",
        stance: "Yes. Children's internet access should be reasonably restricted to protect them from harmful content and addiction.",
        speech: "I am firmly in favor of restricting children's access to the internet to a reasonable degree. I'll give you two main reasons.\n\nFirstly, the internet exposes children to content that they are simply not ready to handle. Violent videos, pornography, and online predators are only a few clicks away, and young minds can be deeply harmed by them. For example, studies have linked early exposure to disturbing online material with anxiety and distorted views of relationships. Children lack the maturity to filter what they see, so adults have a duty to set boundaries until they can judge for themselves.\n\nSecondly, unlimited access easily leads to addiction, which damages both health and learning. Many children now spend hours scrolling through social media or playing games late into the night, and as a result they lose sleep, neglect their studies, and struggle with face-to-face communication. By setting sensible limits on screen time, parents and schools can help children develop healthier habits and a more balanced life.\n\nOf course, I'm not saying we should ban the internet completely, because it is a powerful learning tool. What I'm arguing for is age-appropriate restriction with proper guidance. For these reasons, I believe restricting children's internet use is both necessary and responsible.",
        speechJa: "私は子供のインターネット利用を合理的な範囲で制限することに強く賛成します。主な理由を二つ挙げます。\n\n第一に、インターネットは子供がまだ受け止める準備のできていない内容にさらします。暴力動画やポルノ、ネット上の捕食者がほんの数クリック先にあり、幼い心は深く傷つきかねません。例えば、不適切なネット情報への早い接触が不安や歪んだ人間関係観と結びつくという研究もあります。子供には見たものを取捨選択する成熟さが欠けているため、自分で判断できるようになるまで大人が線引きをする義務があります。\n\n第二に、無制限の利用は健康と学習の両方を損なう依存につながりやすいです。多くの子供が夜遅くまでSNSをスクロールしたりゲームをしたりして何時間も過ごし、その結果、睡眠不足になり、勉強をおろそかにし、対面のコミュニケーションに苦労します。画面時間に賢明な制限を設ければ、親や学校は子供がより健康的な習慣とバランスの取れた生活を築く手助けができます。\n\nもちろん、インターネットを完全に禁止すべきだとは言いません。強力な学習ツールだからです。私が主張しているのは、適切な指導を伴う年齢に応じた制限です。以上の理由から、子供のネット利用を制限することは必要かつ責任ある行動だと考えます。",
        wordCount: 217,
        qa: [
            { q: "Won't restrictions just make children want to use the internet more?", a: "That can happen, especially with teenagers. But that's exactly why restriction should come with education, not just bans. When children understand the reasons behind the rules, they're far more likely to accept them." },
            { q: "Isn't it the parents' job rather than the government's to control this?", a: "Parents are the front line, I agree. Still, many parents lack the time or tech knowledge to monitor everything. So I think platforms and governments should support them with tools like age verification and content filters." },
            { q: "Doesn't the internet also help children learn?", a: "Absolutely, and that's a fair point. I'm not against access itself; I'm against unrestricted access. The goal is to keep the educational benefits while filtering out the genuine dangers." },
            { q: "How can we restrict access in practice?", a: "There are several ways, such as screen-time apps, parental controls, and school filtering systems. None of them is perfect alone, but combined with open conversation at home, they make a real difference." }
        ],
        keyExpressions: [
            { en: "I am firmly in favor of ~", ja: "〜に断固として賛成だ", note: "強い賛成の立場表明" },
            { en: "I'll give you two main reasons.", ja: "主な理由を二つ挙げます", note: "構成を予告して聞きやすくする" },
            { en: "For example, studies have linked A with B.", ja: "例えば研究はAとBを結びつけている", note: "研究を根拠にする言い方" },
            { en: "Of course, I'm not saying ~", ja: "もちろん〜とは言っていない", note: "極論を否定し立場を明確化" },
            { en: "What I'm arguing for is ~", ja: "私が主張しているのは〜だ", note: "自分の論点を再定義する" },
            { en: "That's a fair point.", ja: "それはもっともな指摘です", note: "Q&Aで相手を立ててから返す" }
        ],
        tip: "「全面禁止ではなく合理的制限」と幅を持たせると、極端だと突っ込まれにくくなります。反対意見を一度認めてから自分の主張に戻すと説得力が増します。",
    },
    {
        day: 27, category: "社会",
        topic: "Should immigration be encouraged to solve labor shortages?",
        topicJa: "労働力不足解消のため移民を奨励すべきか",
        stance: "Yes. Encouraging immigration is an effective and necessary way to address serious labor shortages.",
        speech: "I am strongly in favor of encouraging immigration to solve labor shortages. Let me explain my position.\n\nFirstly, many developed countries are facing severe worker shortages because of aging and falling birth rates. Industries like nursing, agriculture, and construction simply cannot find enough local workers, and without help these sectors will collapse. For instance, in Japan, care facilities are already short of staff, and immigrant workers have become essential to keep them running. Encouraging immigration is therefore not a luxury but a practical necessity to keep the economy functioning.\n\nSecondly, immigrants bring more than just labor; they bring energy, skills, and new ideas. History shows that countries open to immigration, such as the United States and Canada, have benefited enormously from the talent and entrepreneurship of newcomers. Immigrants pay taxes, start businesses, and fill gaps that locals cannot, which ultimately makes the whole society richer and more dynamic.\n\nHaving said that, I recognize that immigration must be well managed, with proper support for integration. But the answer to the challenges is better management, not closed borders. For these reasons, I firmly believe that encouraging immigration is a wise solution to labor shortages.",
        speechJa: "私は労働力不足を解消するために移民を奨励することに強く賛成します。立場を説明します。\n\n第一に、多くの先進国が高齢化と出生率低下のため深刻な労働者不足に直面しています。介護、農業、建設といった産業は十分な国内労働者を見つけられず、助けがなければこれらの分野は崩壊します。例えば日本では介護施設がすでに人手不足で、移民労働者は施設を回すのに不可欠な存在になっています。したがって移民の奨励はぜいたくではなく、経済を機能させ続けるための現実的な必要性なのです。\n\n第二に、移民は労働力以上のもの、すなわち活力、技能、新しい発想をもたらします。歴史を見れば、アメリカやカナダのように移民に開かれた国は、新参者の才能と起業家精神から計り知れない恩恵を受けてきました。移民は税を納め、事業を起こし、国内の人材では埋められない穴を埋め、結果的に社会全体を豊かで活気あるものにします。\n\nとはいえ、移民は統合への適切な支援を伴い、うまく管理される必要があると認識しています。しかし課題への答えは国境を閉ざすことではなく、より良い管理です。以上の理由から、移民の奨励は労働力不足への賢明な解決策だと固く信じます。",
        wordCount: 200,
        qa: [
            { q: "Won't immigrants take jobs away from local workers?", a: "That fear is common, but the evidence usually points the other way. Immigrants tend to fill jobs that locals avoid, and by spending and starting businesses, they often create new jobs rather than steal existing ones." },
            { q: "What about the social tensions immigration can cause?", a: "That is true to some extent, and we shouldn't ignore it. But tension often comes from poor integration, not immigration itself. With language support and fair treatment, communities can live together peacefully." },
            { q: "Isn't relying on immigrants just avoiding the real problem of low birth rates?", a: "It's a fair point that we also need to raise birth rates. However, that's a slow, long-term fix, while labor shortages are urgent right now. We need both solutions at the same time." },
            { q: "Should countries select immigrants based on skills?", a: "I think a balance is best. Skilled immigrants clearly bring economic value, but many essential jobs, like caregiving, are lower-skilled yet vital. So a sensible system should welcome workers at all levels." }
        ],
        keyExpressions: [
            { en: "I am strongly in favor of ~", ja: "〜に強く賛成だ", note: "賛成の立場を強く示す" },
            { en: "Let me explain my position.", ja: "私の立場を説明させてください", note: "本論への導入" },
            { en: "A is not a luxury but a necessity.", ja: "Aはぜいたくではなく必要だ", note: "重要性を強調する対比表現" },
            { en: "History shows that ~", ja: "歴史は〜を示している", note: "歴史的根拠を持ち出す" },
            { en: "Having said that, I recognize that ~", ja: "とはいえ〜だと認識している", note: "譲歩しつつ主張を守る" },
            { en: "The answer is ~, not ~.", ja: "答えは〜であって〜ではない", note: "対立軸を立てて結論づける" }
        ],
        tip: "「移民が仕事を奪う」など定番の反論を先に想定し、Q&Aで切り返せるよう準備しておきましょう。具体的な業種(介護・農業)を挙げると主張がリアルになります。",
    },
    {
        day: 28, category: "社会",
        topic: "Should the government prioritize public health over economic activity?",
        topicJa: "政府は経済活動より公衆衛生を優先すべきか",
        stance: "Yes. In a serious health crisis, the government should prioritize public health, since the economy depends on healthy people.",
        speech: "I firmly believe that, in times of crisis, the government should prioritize public health over economic activity. Here are my two main reasons.\n\nFirstly, human life and health are simply more valuable than profit. Money can be recovered, but lost lives cannot. During the COVID-19 pandemic, countries that acted quickly to protect health, even at an economic cost, ultimately saved many lives. For instance, early lockdowns were painful for businesses, but they prevented hospitals from being overwhelmed and dying patients from being turned away. No economic figure can justify sacrificing people's lives.\n\nSecondly, a healthy population is actually the foundation of a strong economy. If people are sick or afraid, they cannot work, shop, or invest with confidence, so the economy suffers anyway. In other words, protecting public health is not the opposite of economic recovery; it is the very thing that makes recovery possible in the long run.\n\nNaturally, I understand that economic activity cannot be ignored, because lost jobs also harm people's wellbeing. The ideal is a careful balance. But when the two genuinely clash, health must come first. For these reasons, I am convinced that public health should take priority.",
        speechJa: "私は危機の時には政府が経済活動より公衆衛生を優先すべきだと固く信じます。主な理由を二つ挙げます。\n\n第一に、人命と健康は利益よりも単純に価値があります。お金は取り戻せますが、失われた命は戻りません。新型コロナの大流行では、経済的代償を払ってでも素早く健康を守った国々が、結果的に多くの命を救いました。例えば早期のロックダウンは企業にとって苦痛でしたが、病院の崩壊や患者の見捨てを防ぎました。いかなる経済の数字も人命の犠牲を正当化できません。\n\n第二に、健康な国民こそが強い経済の土台です。人々が病気や恐怖の中にいれば、安心して働き、買い物し、投資することはできず、結局経済も苦しみます。言い換えれば、公衆衛生を守ることは経済回復の反対ではなく、長期的に回復を可能にするまさにその要因なのです。\n\nもちろん、失業もまた人々の幸福を損なうため、経済活動を無視できないことは理解しています。理想は慎重なバランスです。しかし両者が本当に衝突するときは、健康が最優先されねばなりません。以上の理由から、公衆衛生が優先されるべきだと確信します。",
        wordCount: 199,
        qa: [
            { q: "But don't lockdowns destroy jobs and harm people too?", a: "Yes, that's a real and serious cost, I won't deny it. That's why governments must soften the blow with financial support for workers and businesses. The goal is to protect health while cushioning the economic pain." },
            { q: "Isn't there a point where the economic damage outweighs the health benefit?", a: "That is true to some extent, and policy should adapt as a crisis evolves. But during the worst phase of a deadly outbreak, the health risk is so high that protecting lives clearly comes first." },
            { q: "Who should decide where to draw the line?", a: "I believe it should be governments guided by scientific experts, not politics alone. Transparent, evidence-based decisions earn public trust, which is essential for any policy to actually work." },
            { q: "Could prioritizing health become an excuse for too much government control?", a: "That's a legitimate worry. Emergency powers must be temporary and clearly limited, with oversight from parliament and courts. Protecting health should never become a permanent excuse to restrict freedom." }
        ],
        keyExpressions: [
            { en: "I firmly believe that ~", ja: "〜だと固く信じる", note: "強い確信を示す冒頭表現" },
            { en: "Here are my two main reasons.", ja: "主な理由を二つ挙げます", note: "論点を予告する" },
            { en: "A is the foundation of B.", ja: "AはBの土台だ", note: "因果関係を端的に示す" },
            { en: "Naturally, I understand that ~", ja: "もちろん〜は理解している", note: "反対側に配慮する譲歩" },
            { en: "When the two clash, ~ must come first.", ja: "両者が衝突するときは〜が最優先だ", note: "優先順位を明示する" },
            { en: "I won't deny it.", ja: "それは否定しません", note: "Q&Aで誠実に弱点を認める" }
        ],
        tip: "「健康か経済か」の二択に乗らず、「両者が衝突したときどちらを優先するか」と論点を絞ると説得力が出ます。COVID-19という共通体験を例にすると面接官も納得しやすいです。",
    },
    {
        day: 29, category: "科学・技術",
        topic: "Will humans benefit from further advances in biotechnology?",
        topicJa: "人類はバイオテクノロジーのさらなる発展から恩恵を受けるか",
        stance: "Yes. On balance, further advances in biotechnology will bring great benefits, as long as they are properly regulated.",
        speech: "I am convinced that humans will, on balance, benefit greatly from further advances in biotechnology. Let me give you two reasons.\n\nFirstly, biotechnology is transforming medicine and saving countless lives. Gene therapy and advanced vaccines now allow us to treat diseases that were once considered hopeless. For instance, mRNA technology was developed at remarkable speed to fight COVID-19, and similar techniques are now being used to target cancer. As research advances, millions of patients who once had no options will gain real hope for a cure.\n\nSecondly, biotechnology can help us tackle global problems like hunger and climate change. Genetically improved crops can grow in harsh conditions and resist pests, which means more food with fewer chemicals. Likewise, engineered microbes are being developed to break down plastic waste and produce clean fuels. In a world of growing population and limited resources, these innovations could be essential for our survival.\n\nI do admit that biotechnology raises ethical concerns, such as gene editing in humans, and these must be handled carefully through strict regulation. But the solution is responsible oversight, not stopping progress. For these reasons, I firmly believe the benefits will far outweigh the risks.",
        speechJa: "私は人類がバイオテクノロジーのさらなる発展から、総じて大きな恩恵を受けると確信しています。理由を二つ挙げます。\n\n第一に、バイオテクノロジーは医療を変革し、無数の命を救っています。遺伝子治療や先進的なワクチンにより、かつては絶望的と見なされた病気を治療できるようになりました。例えばmRNA技術は新型コロナと闘うために驚異的な速さで開発され、いまや同様の技術ががん治療にも使われています。研究が進めば、かつて選択肢のなかった何百万もの患者が、治癒への真の希望を得るでしょう。\n\n第二に、バイオテクノロジーは飢餓や気候変動といった地球規模の問題への対処を助けます。遺伝子改良された作物は過酷な環境でも育ち害虫に強く、より少ない化学薬品でより多くの食料を生み出せます。同様に、プラスチック廃棄物を分解しクリーンな燃料を作る微生物の開発も進んでいます。人口が増え資源が限られる世界では、こうした革新は生存に不可欠かもしれません。\n\n確かに、人間への遺伝子編集など倫理的懸念があることは認めますし、厳格な規制で慎重に扱わねばなりません。しかし解決策は進歩を止めることではなく、責任ある監督です。以上の理由から、恩恵がリスクをはるかに上回ると固く信じます。",
        wordCount: 200,
        qa: [
            { q: "Aren't you worried about \"designer babies\" and gene editing going too far?", a: "Yes, that's a serious concern I take seriously. But the answer is clear international rules that ban unethical uses, not banning the technology altogether. We can keep the medical benefits while drawing firm ethical lines." },
            { q: "What about the risk of biotechnology being misused, for example as a weapon?", a: "That danger is real, I won't pretend otherwise. That's exactly why strong global oversight and cooperation are essential. The same is true of any powerful technology, from nuclear power onward." },
            { q: "Isn't genetically modified food unsafe?", a: "Decades of research have found no solid evidence that approved GM foods harm health. What matters is transparent testing and labelling, so consumers can trust what they eat and make their own choices." },
            { q: "Will these benefits reach poor countries too?", a: "That's not guaranteed, and it's a real worry. So governments and companies should make affordable access a priority. Otherwise biotechnology could widen the gap between rich and poor instead of closing it." }
        ],
        keyExpressions: [
            { en: "I am convinced that, on balance, ~", ja: "総じて〜だと確信している", note: "全体としての判断を示す" },
            { en: "Let me give you two reasons.", ja: "理由を二つ挙げさせてください", note: "構成の予告" },
            { en: "As research advances, ~", ja: "研究が進むにつれ〜", note: "将来予測につなげる表現" },
            { en: "I do admit that ~", ja: "確かに〜だと認める", note: "懸念を率直に認める譲歩" },
            { en: "The solution is ~, not ~.", ja: "解決策は〜であって〜ではない", note: "対比で結論を明確化" },
            { en: "The benefits will far outweigh the risks.", ja: "恩恵がリスクをはるかに上回る", note: "賛否型のお題の締めに便利" }
        ],
        tip: "技術系のお題では「医療」と「環境・食料」のように分野を分けて二理由にすると話が膨らみます。倫理的リスクを一度認めてから『規制すればよい』と返すのが定番の型です。",
    },
    {
        day: 30, category: "国際",
        topic: "Should developed countries lead the fight against global poverty?",
        topicJa: "先進国は世界の貧困との闘いを主導すべきか",
        stance: "Yes. Developed countries have both the responsibility and the resources to lead the fight against global poverty.",
        speech: "I strongly believe that developed countries should take the lead in the fight against global poverty. I'll explain my view with two clear reasons.\n\nFirstly, developed countries have a moral responsibility to act. Much of their wealth was built through colonialism and the exploitation of resources from poorer regions, so they owe a debt to the developing world. Moreover, they simply have the money, technology, and expertise that poor nations lack. For instance, foreign aid and medical programs from wealthy nations have already helped eradicate diseases like smallpox and dramatically reduce child mortality. Those who have the power to help also have the duty to use it.\n\nSecondly, fighting global poverty is in the developed world's own interest. Poverty does not stay within borders. It fuels conflict, mass migration, and the spread of disease, all of which eventually reach rich countries too. The COVID-19 pandemic showed clearly that a health crisis anywhere can become a crisis everywhere. By helping poorer nations grow, developed countries also create new markets and a more stable, peaceful world.\n\nOf course, leadership must mean genuine partnership, not control, and aid should empower people rather than create dependence. But the responsibility to lead is clear. For these reasons, I am firmly convinced that developed countries should lead this fight.",
        speechJa: "私は先進国が世界の貧困との闘いを主導すべきだと強く考えます。二つの明確な理由で私の見解を説明します。\n\n第一に、先進国には行動する道徳的責任があります。彼らの富の多くは植民地主義と貧しい地域の資源搾取の上に築かれており、発展途上国に対して負い目があります。さらに、彼らは貧しい国が欠く資金、技術、専門知識を持っています。例えば、富裕国による対外援助や医療プログラムは、すでに天然痘のような病気の根絶や子供の死亡率の劇的な低下に貢献してきました。助ける力を持つ者には、それを使う義務もあるのです。\n\n第二に、世界の貧困と闘うことは先進国自身の利益にもなります。貧困は国境内にとどまりません。それは紛争、大量移民、病気の蔓延を引き起こし、それらはやがて富裕国にも及びます。新型コロナの大流行は、どこかの健康危機がどこでも危機になりうることをはっきり示しました。貧しい国の成長を助けることで、先進国は新たな市場と、より安定し平和な世界をも生み出します。\n\nもちろん、主導とは支配ではなく真のパートナーシップを意味すべきで、援助は依存を生むのではなく人々に力を与えるものであるべきです。しかし主導する責任は明白です。以上の理由から、先進国がこの闘いを主導すべきだと固く確信します。",
        wordCount: 222,
        qa: [
            { q: "Shouldn't developed countries focus on their own problems first?", a: "They do face real domestic problems, that's true. But helping the poor abroad and caring for citizens at home are not mutually exclusive. In fact, a more stable world makes wealthy nations safer and more prosperous too." },
            { q: "Doesn't foreign aid often end up wasted or stolen by corrupt leaders?", a: "Sadly, that has happened in some cases. That's why aid should be transparent and tied to clear conditions, and often delivered through trusted local organizations rather than corrupt governments." },
            { q: "Isn't trade more effective than aid for reducing poverty?", a: "I think both matter and work best together. Fair trade creates lasting jobs, while aid handles urgent needs like health and education. Developed countries should open their markets and give aid at the same time." },
            { q: "Why should ordinary taxpayers pay for people in other countries?", a: "It's a fair question. But the amount spent on aid is tiny compared to national budgets, and the returns, in security, trade, and disease prevention, benefit those very taxpayers in the end." }
        ],
        keyExpressions: [
            { en: "I strongly believe that ~", ja: "〜だと強く考える", note: "立場を明確に示す冒頭" },
            { en: "I'll explain my view with two clear reasons.", ja: "二つの明確な理由で見解を説明する", note: "構成を予告して整理する" },
            { en: "Those who have the power to ~ also have the duty to ~.", ja: "〜する力を持つ者には〜する義務もある", note: "責任論を語る決め台詞" },
            { en: "A is in our own interest.", ja: "Aは自分たち自身の利益でもある", note: "利他を自己利益に結びつける" },
            { en: "A does not stay within borders.", ja: "Aは国境内にとどまらない", note: "国際問題の波及を示す" },
            { en: "Of course, A must mean ~, not ~.", ja: "もちろんAは〜であって〜であってはならない", note: "条件を付して譲歩する" }
        ],
        tip: "「道徳的責任(利他)」と「自国の利益(利己)」の両輪で攻めると、理想論に偏らず説得力が増します。Those who have the power… のような格言調の一文を理由の締めに置くと印象に残ります。",
    },
];

export function getSpeechForDay(day: number): EikenSpeech | null {
    return EIKEN1_SPEECHES.find(e => e.day === day) || null;
}

export function getDateForDay(day: number): Date {
    const d = new Date(START_DATE);
    d.setDate(d.getDate() + day - 1);
    return d;
}

export function getTodayDay(): number {
    const now = new Date();
    const start = new Date(START_DATE);
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 1;
    if (diff >= TOTAL_DAYS) return TOTAL_DAYS;
    return diff + 1;
}
