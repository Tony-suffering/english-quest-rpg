// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-eiken1.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * 英検アウトプット 1次ライティング -- 模範解答 書き写し 30日完成。
 *
 * ビジネス(集客)ライン。英検1級レベルの意見論述(200-240語)を想定した
 * 「完璧な模範解答」を毎日1本、紙に書き写すだけ。考えさせない=書き写すだけで
 * 型(序論→本論3理由→結論)と必須表現が手にこびりつく、という設計。
 *
 * Day 1-5  = 型の解剖 (序論/本論/コネクタ/譲歩反論/結論の各ブロックに集中)
 * Day 6-30 = 実戦 (頻出テーマでフル模範解答)
 *
 * 【重要】お題・模範解答はすべて当サービスのオリジナル。実際の過去問の
 * 設問文は一切転載していない(著作権配慮)。category はテーマ分類のラベル。
 */

export interface KeyExpression {
    en: string;   // 再利用できる必須テンプレ表現
    ja: string;   // 意味
    note: string; // いつ/なぜ使うか
}

export interface EikenEssayDay {
    day: number;
    exam: string;        // テーマ分類ラベル(例 'Science & Technology')。過去問の年度ではない
    focus: string;       // その日の型ポイント
    topic: string;       // お題(オリジナル設問・英語原文)。過去問の転載ではない
    topicJa: string;     // お題の日本語訳
    stance: string;      // とる立場
    essay: string;       // 模範解答(書き写す本文)。段落は \n\n 区切り
    essayJa: string;     // 日本語訳
    wordCount: number;
    keyExpressions: KeyExpression[]; // 作文に必須の表現+解説
    tip: string;         // その日の型解説(短く)
}

export const TOTAL_DAYS = 30;
export const START_DATE = new Date(2026, 5, 29); // June 29, 2026 = Day 1

export const EIKEN1_ESSAYS: EikenEssayDay[] = [
    {
        day: 1, exam: 'Science & Technology', focus: '全体の型(序論→本論3→結論)',
        topic: "Is space exploration worth its enormous price tag?",
        topicJa: "宇宙探査は、その莫大な費用に見合うのか",
        stance: "Yes — the benefits justify the cost",
        essay: "There is much debate over whether the enormous sums spent on space exploration can be justified. While the expense is undeniably vast, I firmly believe that the long-term benefits far outweigh the costs, for three main reasons.\n\nFirst, space exploration plays a crucial role in driving technological innovation. The challenges of operating in space force scientists to develop solutions that later transform everyday life. A prime example of this is the satellite navigation we now rely on, which originated from space programs.\n\nSecond, exploring space is essential for the long-term survival of humanity. As resources on Earth become increasingly strained, locating new sources of materials and potential habitats becomes vital. For instance, asteroid mining could one day supply minerals that are growing scarce on our planet.\n\nFinally, space exploration inspires international cooperation and scientific ambition. Massive projects require nations to pool their expertise rather than compete. The International Space Station demonstrates how former rivals can collaborate productively toward a shared goal.\n\nIn conclusion, although the financial burden of space exploration is considerable, the benefits far outweigh the drawbacks. The technological advances, the prospects for human survival, and the fostering of global cooperation all confirm that this investment is thoroughly worthwhile.",
        essayJa: "宇宙探査に費やされる莫大な金額が正当化できるかについては、大いに議論がある。費用が膨大であることは否定できないが、私は長期的な利益がコストをはるかに上回ると、三つの主な理由から固く信じている。\n\n第一に、宇宙探査は技術革新を推進するうえで重要な役割を果たす。宇宙で活動する困難さは、科学者にのちに日常生活を一変させる解決策の開発を迫る。その好例が、今や私たちが頼る衛星ナビゲーションであり、これは宇宙計画から生まれたものだ。\n\n第二に、宇宙探査は人類の長期的な生存に不可欠だ。地球上の資源がますます逼迫するなか、新たな物資源や居住可能地を見つけることが重要になる。たとえば小惑星採掘は、いつか地球上で希少になりつつある鉱物を供給しうる。\n\n最後に、宇宙探査は国際協力と科学的野心を刺激する。巨大プロジェクトは各国に競争ではなく専門知識の結集を求める。国際宇宙ステーションは、かつての敵対国でも共通の目標へ向け生産的に協力できることを示している。\n\n結論として、宇宙探査の財政的負担は相当なものだが、利点が欠点をはるかに上回る。技術的進歩、人類生存の見込み、そして世界的協力の促進はいずれも、この投資が十分に価値あるものであることを裏づけている。",
        wordCount: 215,
        keyExpressions: [
            { en: "There is much debate over whether ~", ja: "〜については大いに議論がある", note: "序論でお題を中立に言い換える定番の出だし。どんなトピックにも流用可" },
            { en: "play a crucial role in ~", ja: "〜で重要な役割を果たす", note: "本論で重要性を述べる万能コロケーション" },
            { en: "A prime example of this is ~", ja: "その好例が〜だ", note: "具体例を導入する型。For exampleの格上げ版" },
            { en: "the benefits far outweigh the drawbacks", ja: "利点が欠点をはるかに上回る", note: "賛成側の結論で多用する天秤フレーズ" },
            { en: "for three main reasons", ja: "三つの主な理由から", note: "序論の最後に置くと本論3段落の予告になる" },
            { en: "I firmly believe that ~", ja: "私は〜と固く信じている", note: "立場を強く明言する定番。thesis文にそのまま使える" },
            { en: "Admittedly, ~. On balance, however, ~", ja: "確かに〜。しかし全体としては〜", note: "反対側を一文だけ認め、すぐ自分の立場に戻して締める。両論併記(減点)を避けつつ視野の広さを示す" }
        ],
        tip: "英検1級は『序論で立場明言→本論3理由→結論』が骨格。立場は必ずYes/Noどちらか一つに。両論併記(fence-sitting)は減点される。反対意見はAdmittedly...で一文だけ譲歩し、On balance, however...で自分の側に戻して締める。",
    },
    {
        day: 2, exam: 'International', focus: '序論の型(お題の言い換え＋立場明言)',
        topic: "Can humankind ever achieve lasting world peace?",
        topicJa: "人類は恒久的な世界平和を本当に実現できるのか",
        stance: "Disagree — lasting world peace is not realistically achievable",
        essay: "It is often argued that humanity can eventually attain complete and lasting world peace. While this is an admirable aspiration, I must disagree with the notion that such a goal is realistically achievable, and I will offer three reasons to support my view.\n\nFirst, competition over limited resources makes conflict almost inevitable. As populations grow, nations inevitably clash over water, energy, and land. For instance, disputes over river access in arid regions continue to provoke tension between neighboring states.\n\nSecond, deep-rooted ideological and religious differences are extremely difficult to reconcile. People are often unwilling to compromise on their core beliefs. The persistence of long-standing sectarian conflicts in various parts of the world clearly illustrates this stubborn reality.\n\nFinally, the existence of powerful weapons means that distrust between nations is unlikely to disappear. As long as countries maintain large arsenals, mutual suspicion will remain. The ongoing arms races between rival powers demonstrate how security concerns perpetuate hostility.\n\nIn conclusion, although the dream of global harmony is noble, the competition for resources, irreconcilable beliefs, and persistent military distrust make genuine world peace an unattainable ideal. For these reasons, I am convinced that world peace, however desirable, cannot realistically be achieved.",
        essayJa: "人類はいつか完全で永続的な世界平和を達成できるとしばしば論じられる。これは称賛に値する願望だが、私はそのような目標が現実的に達成可能だという考えには反対せざるをえず、自説を支える三つの理由を示す。\n\n第一に、限られた資源をめぐる競争が紛争をほぼ不可避にする。人口が増えるにつれ、各国は水・エネルギー・土地をめぐって必然的に衝突する。たとえば乾燥地域の河川利用をめぐる争いは、隣接国家間の緊張を引き起こし続けている。\n\n第二に、根深いイデオロギーや宗教の違いは和解が極めて難しい。人々はしばしば自らの核となる信念で妥協しようとしない。世界各地で長年続く宗派対立の根強さが、この頑なな現実をはっきり示している。\n\n最後に、強力な兵器の存在は、国家間の不信が消えにくいことを意味する。各国が大規模な兵器を保有する限り、相互不信は残る。対立する大国間で続く軍拡競争は、安全保障上の懸念がいかに敵意を永続させるかを示している。\n\n結論として、世界の調和という夢は崇高だが、資源をめぐる競争、和解しがたい信念、そして根強い軍事的不信が、真の世界平和を達成不可能な理想にしている。これらの理由から、私は世界平和は望ましくはあっても現実的には達成できないと確信している。",
        wordCount: 211,
        keyExpressions: [
            { en: "It is often argued that ~", ja: "〜としばしば論じられる", note: "序論でお題を客観的に言い換える鉄板の出だし。主語ぼかしで上品" },
            { en: "While this is an admirable aspiration, ~", ja: "これは称賛に値する願望だが〜", note: "理想論に軽く譲歩してから反対に転じる序論パターン" },
            { en: "I must disagree with the notion that ~", ja: "〜という考えには反対せざるをえない", note: "反対の立場をきっぱり示すthesis表現" },
            { en: "I will offer three reasons to support my view", ja: "自説を支える三つの理由を示す", note: "序論末で本論3段落を予告する型" },
            { en: "almost inevitable", ja: "ほぼ不可避だ", note: "因果や必然性を強調するときの便利な形容" },
            { en: "I am convinced that ~", ja: "私は〜と確信している", note: "結論で立場を再宣言する強い動詞" }
        ],
        tip: "序論は『お題の言い換え一文＋自分の立場一文』の2点セットが基本。It is often argued that... で中立に言い換え、I must disagree... で旗を立てると安定する。",
    },
    {
        day: 3, exam: 'Environment & Energy', focus: '本論の型(理由→説明→具体例)',
        topic: "Will renewable energy be able to replace fossil fuels?",
        topicJa: "再生可能エネルギーは化石燃料に取って代われるのか",
        stance: "Yes — renewables can replace fossil fuels",
        essay: "The question of whether renewable energy can fully replace fossil fuels has become increasingly pressing. In my opinion, renewable sources are not only capable of replacing fossil fuels but are essential for our future, and I will explain my position with three reasons.\n\nFirst, renewable technologies have improved dramatically in efficiency and affordability. This is significant because cost was long the main obstacle to their adoption. For instance, the price of solar panels has fallen sharply over the past decade, making solar power a viable competitor to conventional energy.\n\nSecond, renewable sources are far cleaner and help combat climate change. Unlike fossil fuels, they produce little or no carbon emissions during operation. A clear example is Denmark, which now generates a large share of its electricity from wind power while reducing its carbon footprint.\n\nFinally, renewable energy enhances national energy security. Because sunlight and wind are available domestically, they facilitate energy independence, and countries become less dependent on imported fuel. Nations that have invested heavily in renewables, such as Germany, are consequently less vulnerable to volatile global oil markets.\n\nIn conclusion, thanks to falling costs, environmental advantages, and improved energy security, renewable sources are fully capable of supplanting fossil fuels. I am therefore confident that a transition to clean energy is both possible and necessary.",
        essayJa: "再生可能エネルギーが化石燃料に完全に取って代われるかという問いは、ますます切実になっている。私の考えでは、再生可能エネルギーは化石燃料に取って代われるだけでなく、私たちの未来に不可欠であり、三つの理由で自説を説明する。\n\n第一に、再生可能技術は効率と手頃さの面で劇的に向上した。これは重要だ。なぜなら長らくコストが普及の主な障害だったからだ。たとえば太陽光パネルの価格はこの十年で急落し、太陽光発電を従来エネルギーと競合できる水準にした。\n\n第二に、再生可能エネルギーははるかにクリーンで、気候変動対策に役立つ。化石燃料と違い、稼働中の炭素排出はほとんど、あるいは全くない。明確な例がデンマークで、今や電力の大部分を風力でまかないながら炭素排出量を削減している。\n\n最後に、再生可能エネルギーは国家のエネルギー安全保障を高める。太陽光や風は国内で得られるため、各国は輸入燃料への依存を減らせる。再生可能エネルギーに大きく投資してきたドイツのような国は、結果として不安定な世界の石油市場の影響を受けにくい。\n\n結論として、コストの低下、環境面の利点、そしてエネルギー安全保障の向上のおかげで、再生可能エネルギーは化石燃料を十分に代替できる。したがって私は、クリーンエネルギーへの移行は可能であり必要でもあると確信している。",
        wordCount: 213,
        keyExpressions: [
            { en: "This is significant because ~", ja: "これが重要なのは〜だからだ", note: "本論で理由のあとに『説明』をつなぐ接着剤。理由→説明の橋渡し" },
            { en: "Unlike ~, ...", ja: "〜と違い、…", note: "対比で長所を際立たせる本論の定番。説明部分で効く" },
            { en: "A clear example is ~", ja: "明確な例が〜だ", note: "具体例の導入。国名・事例を1つ放り込む型" },
            { en: "such as ~", ja: "〜のような", note: "具体例を文中に軽く差し込む万能表現" },
            { en: "consequently", ja: "結果として", note: "具体例の効果・帰結を述べるときの接続副詞" },
            { en: "I am therefore confident that ~", ja: "したがって私は〜と確信している", note: "結論で論拠から自然に断定へ運ぶ表現" }
        ],
        tip: "本論1段落は『理由→説明(This is significant because...)→具体例(A clear example is...)』の3点で完結させる。各段落この順を守るだけで論理が一気に締まる。",
    },
    {
        day: 4, exam: 'Society', focus: '譲歩→反論(Admittedly... However...)',
        topic: "Should developed countries accept more immigrants?",
        topicJa: "先進国はより多くの移民を受け入れるべきか",
        stance: "Yes — developed nations should encourage immigration",
        essay: "Whether developed nations ought to encourage immigration is a controversial issue in many societies today. Despite the concerns frequently raised, I strongly believe that developed countries should actively welcome immigrants, and I will defend this view with three reasons.\n\nFirst, immigrants help address serious labor shortages. Many developed nations are confronting aging populations and steadily shrinking workforces. For instance, industries such as healthcare and agriculture in Japan increasingly depend on foreign workers in order to remain functional and competitive.\n\nSecond, immigration drives economic growth and innovation. Newcomers establish businesses, fill critical skill gaps, and contribute valuable tax revenue to their host countries. Admittedly, some argue that immigrants place a heavy strain on public services. However, numerous studies consistently show that immigrants contribute far more economically than they ever receive in benefits.\n\nFinally, immigration enriches society through cultural diversity. Exposure to different perspectives and traditions fosters creativity, tolerance, and mutual understanding among citizens. The vibrant, multicultural character of cities like Toronto clearly demonstrates how diversity can strengthen rather than weaken a nation.\n\nIn conclusion, despite the reservations that some people understandably hold, encouraging immigration brings substantial benefits by easing labor shortages, stimulating the economy, and enhancing cultural richness. For these reasons, I am firmly convinced that developed nations should welcome immigrants rather than turn them away.",
        essayJa: "先進国が移民を奨励すべきかどうかは、今日多くの社会で議論を呼ぶ問題だ。しばしば挙げられる懸念にもかかわらず、私は先進国は移民を歓迎すべきだと強く信じており、三つの理由でこの見解を擁護する。\n\n第一に、移民は深刻な労働力不足の解消に役立つ。多くの先進国は高齢化と労働人口の縮小に直面している。たとえば日本の医療や農業などの産業は、機能を維持するためにますます外国人労働者に依存している。\n\n第二に、移民は経済成長と革新を推進する。新たな来住者は事業を起こし、技能の不足を埋め、貴重な税収をもたらす。確かに移民が公共サービスを圧迫すると主張する人もいる。しかし研究は一貫して、移民が受け取る給付よりはるかに多くを経済的に貢献していることを示している。\n\n最後に、移民は文化的多様性を通じて社会を豊かにする。異なる視点に触れることは、創造性と相互理解を育む。トロントのような都市の活気ある多文化的性格は、多様性が国を弱めるどころか強めうることを示している。\n\n結論として、一部の人が抱く懸念にもかかわらず、移民の奨励は労働力不足の緩和、経済の刺激、文化的豊かさの向上という大きな利益をもたらす。これらの理由から、私は先進国は移民を退けるのではなく積極的に歓迎すべきだと固く確信している。",
        wordCount: 213,
        keyExpressions: [
            { en: "Admittedly, some argue that ~", ja: "確かに〜と主張する人もいる", note: "譲歩の決まり文句。反対意見を一度認めてから反論に入る型" },
            { en: "However, studies consistently show that ~", ja: "しかし研究は一貫して〜を示している", note: "Admittedlyとセットの反論。証拠で押し返す王道" },
            { en: "Despite the concerns frequently raised, ~", ja: "しばしば挙げられる懸念にもかかわらず〜", note: "序論で反対論を先に潰してから立場を出す譲歩表現" },
            { en: "rather than ~", ja: "〜よりむしろ／〜ではなく", note: "結論や反論で対比を作り立場を鮮明にする" },
            { en: "substantial benefits", ja: "大きな利益", note: "メリットを格上げして言う形容。many benefitsより上品" },
            { en: "I am firmly convinced that ~", ja: "私は〜と固く確信している", note: "結論で立場を強く締め直す表現" }
        ],
        tip: "1級では反対意見を1つ取り込むと説得力が上がる。本論のどこかで『Admittedly, some argue that... However, ...』を入れ、譲歩→即反論で自分の論を強く見せよう。",
    },
    {
        day: 5, exam: 'Economy', focus: '結論の型(繰り返さず言い換えて締める)',
        topic: "Does globalization benefit the world more than it harms it?",
        topicJa: "グローバル化は世界に害より益をもたらしているか",
        stance: "Agree — globalization is a positive force",
        essay: "In recent decades, globalization has reshaped economies and societies across the planet. Although it is not without its critics, I strongly agree that globalization is, on balance, a positive force, and I will justify this position with three reasons.\n\nFirst, globalization has lifted millions of people out of poverty. By opening markets and creating jobs, it allows developing nations to participate in the global economy. For instance, countries in Southeast Asia have experienced remarkable growth by exporting goods to wealthier markets.\n\nSecond, globalization accelerates the spread of knowledge and technology. Innovations and medical advances now reach distant regions far more quickly than before. The rapid global distribution of vaccines during recent health crises illustrates this benefit vividly.\n\nFinally, globalization fosters cultural exchange and mutual understanding. As people encounter foreign ideas, cuisines, and customs, prejudice tends to diminish. The growing popularity of international films and music demonstrates how cultures now enrich one another.\n\nIn conclusion, the evidence strongly supports the view that globalization benefits humanity overall. By reducing poverty, spreading valuable knowledge, and bringing diverse cultures closer together, it serves as a powerful engine of progress. I therefore remain convinced that, despite its imperfections, globalization does far more good than harm.",
        essayJa: "ここ数十年で、グローバル化は地球規模で経済と社会を作り変えてきた。批判がないわけではないが、私は総じてグローバル化は肯定的な力だと強く同意し、三つの理由でこの立場を正当化する。\n\n第一に、グローバル化は何百万もの人々を貧困から救い出してきた。市場を開き雇用を生むことで、発展途上国が世界経済に参加できるようにする。たとえば東南アジアの国々は、より豊かな市場へ財を輸出することで目覚ましい成長を遂げた。\n\n第二に、グローバル化は知識と技術の普及を加速させる。革新や医療の進歩は、以前よりはるかに速く遠隔地に届くようになった。近年の健康危機におけるワクチンの急速な世界的流通が、この利点を生き生きと示している。\n\n最後に、グローバル化は文化交流と相互理解を促す。人々が外国の思想・料理・習慣に出会うにつれ、偏見は薄れる傾向にある。国際的な映画や音楽の人気の高まりは、文化が今や互いを豊かにしている様子を示している。\n\n結論として、証拠はグローバル化が全体として人類に利益をもたらすという見方を強く裏づけている。貧困を減らし、貴重な知識を広め、多様な文化を近づけることで、それは強力な進歩の原動力として働く。したがって私は、不完全な面はあっても、グローバル化は害よりはるかに多くの善をなすと確信し続けている。",
        wordCount: 204,
        keyExpressions: [
            { en: "In conclusion, the evidence strongly supports the view that ~", ja: "結論として、証拠は〜という見方を強く裏づける", note: "結論を本論の繰り返しでなく一段上から締める型" },
            { en: "By doing A, B, and C, it ...", ja: "AしBしCすることで、それは…", note: "3理由を動名詞で一文に束ねる結論テク。繰り返し感を消せる" },
            { en: "serves as a powerful engine of ~", ja: "〜の強力な原動力として働く", note: "結論で対象を格上げして締める比喩表現" },
            { en: "I therefore remain convinced that ~", ja: "したがって私は〜と確信し続けている", note: "結論で立場を再宣言する締めの動詞" },
            { en: "does far more good than harm", ja: "害よりはるかに多くの善をなす", note: "賛成側の最終文で天秤を傾けて締める決め台詞" },
            { en: "on balance", ja: "総じて／差し引きで", note: "全体評価を示す副詞句。序論・結論どちらでも使える" }
        ],
        tip: "結論は本論のコピペ禁止。3理由を『By reducing X, spreading Y, and bringing Z...』のように動名詞で一文に圧縮し、最後にdoes far more good than harm 等の決め台詞で締めると一級らしくなる。",
    },
    {
        day: 6, exam: 'Environment & Energy', focus: '実戦',
        topic: "Can governments meet the world's ever-growing demand for energy?",
        topicJa: "政府は世界の増え続けるエネルギー需要を満たせるか",
        stance: "Yes — governments will be able to keep up with rising energy demands",
        essay: "As global populations expand and economies industrialize, energy consumption continues to rise rapidly. There is much debate over whether governments can satisfy this growing demand. In my view, governments will indeed be able to keep pace, and I will support this position with three reasons.\n\nFirst, rapid advances in renewable technology are dramatically expanding supply. Solar and wind capacity is increasing every year as costs fall. A prime example is China, which has installed enormous amounts of solar power to meet its surging needs.\n\nSecond, improvements in energy efficiency are reducing waste considerably. By adopting smarter appliances and better insulation, societies can do more with less. Admittedly, some argue that demand will always outstrip efficiency gains. However, government regulations on efficiency have already curbed consumption significantly in many nations.\n\nFinally, governments are increasingly investing in research into future energy sources. Nuclear fusion and advanced storage technologies promise abundant power in the coming decades. The substantial public funding now directed at fusion research demonstrates this serious commitment.\n\nIn conclusion, thanks to expanding renewables, greater efficiency, and ongoing investment in innovation, governments are well positioned to meet rising energy demands. I am therefore convinced that, with sustained effort, the world can secure the energy its future requires.",
        essayJa: "世界の人口が拡大し経済が工業化するにつれ、エネルギー消費は急速に増え続けている。政府がこの増大する需要を満たせるかについては大いに議論がある。私の見方では、政府は確かに歩調を合わせられるはずであり、三つの理由でこの立場を支える。\n\n第一に、再生可能技術の急速な進歩が供給を劇的に拡大している。太陽光と風力の容量はコスト低下とともに毎年増えている。その好例が中国で、急増する需要を満たすため膨大な量の太陽光発電を導入してきた。\n\n第二に、エネルギー効率の改善が無駄を大幅に減らしている。より賢い機器や優れた断熱を採り入れることで、社会はより少ないエネルギーでより多くをこなせる。確かに、需要は常に効率の向上を上回ると主張する人もいる。しかし効率に関する政府の規制は、多くの国ですでに消費を大きく抑制してきた。\n\n最後に、政府はますます将来のエネルギー源の研究に投資している。核融合や先進的な蓄電技術は、今後数十年で豊富な電力をもたらすと期待される。今や核融合研究に向けられている多額の公的資金が、この真剣な取り組みを示している。\n\n結論として、拡大する再生可能エネルギー、より高い効率、そして革新への継続的な投資のおかげで、政府は増大するエネルギー需要に応える好位置にある。したがって私は、持続的な努力があれば、世界はその未来が必要とするエネルギーを確保できると確信している。",
        wordCount: 209,
        keyExpressions: [
            { en: "There is much debate over whether ~", ja: "〜については大いに議論がある", note: "本番の序論でお題を中立に言い換える鉄板の出だし" },
            { en: "keep pace (with ~)", ja: "（〜に）歩調を合わせる／ついていく", note: "keep up with の言い換え。お題の動詞を本文でずらす技" },
            { en: "Admittedly, ... However, ...", ja: "確かに…しかし…", note: "本番でも1か所は譲歩→反論を入れて説得力を底上げ" },
            { en: "be well positioned to ~", ja: "〜する好位置にある／態勢が整っている", note: "結論で前向きな見通しを上品に述べる表現" },
            { en: "thanks to ~", ja: "〜のおかげで", note: "結論冒頭で3理由を前置詞句に束ねて言い換える" },
            { en: "I am therefore convinced that ~", ja: "したがって私は〜と確信している", note: "本番の最終文で立場をきっぱり締める" }
        ],
        tip: "実戦では本番15分で4ブロックを書き切る。序論で立場明言→本論3理由(うち1つに譲歩反論)→結論で言い換え、をテンプレ反射で出せれば合格点。今日は時間を計って通しで書こう。",
    },

    {
        day: 7, exam: 'Science & Technology', focus: '実戦',
        topic: "Should humanity rely on science to solve its greatest challenges?",
        topicJa: "人類は最大の難題の解決を科学に頼るべきか",
        stance: "Yes — science should be the primary tool",
        essay: "Humanity faces a growing array of challenges, ranging from disease to climate change, and there is ongoing debate over whether science should be entrusted with solving them. In my view, science should indeed be relied on as the principal means of addressing the problems confronting humankind.\n\nFirst, science offers solutions grounded in evidence rather than speculation. Unlike tradition or intuition, the scientific method tests hypotheses rigorously before conclusions are accepted. For instance, the rapid development of vaccines during the COVID-19 pandemic demonstrated how systematic research can save millions of lives within a remarkably short period.\n\nSecond, science possesses a unique capacity for self-correction. When errors emerge, peer review and repeated experimentation gradually refine our understanding. Consequently, even flawed theories are eventually replaced by more accurate ones, a process that no other system of knowledge can replicate with comparable reliability.\n\nFinally, the pressing scale of modern problems leaves few realistic alternatives. From an environmental standpoint, only advanced technologies such as renewable energy and carbon capture can meaningfully reduce emissions. Without scientific innovation, humanity would lack the practical tools needed to confront these threats.\n\nIn conclusion, although science alone cannot resolve every issue, its evidence-based methods, capacity for self-correction, and technological power make it the most dependable instrument available. Therefore, humankind should continue to place its trust in science.",
        essayJa: "人類は病気から気候変動まで増え続ける課題に直面しており、その解決を科学に委ねるべきかについて議論が続いている。私の考えでは、人類が直面する問題に対処する主要な手段として、科学を頼るべきである。\n\n第一に、科学は推測ではなく証拠に基づく解決策を提供する。伝統や直感とは異なり、科学的方法は結論を受け入れる前に仮説を厳密に検証する。例えば、コロナ禍におけるワクチンの急速な開発は、体系的な研究がいかに短期間で数百万の命を救えるかを示した。\n\n第二に、科学には自己修正という独自の能力がある。誤りが生じると、査読と繰り返しの実験が理解を徐々に洗練していく。その結果、欠陥のある理論でさえ最終的にはより正確なものに置き換えられる。これは他のどんな知識体系も同等の信頼性では再現できない過程である。\n\n最後に、現代の問題の差し迫った規模を考えると、現実的な代替策はほとんど残されていない。環境の観点から見れば、再生可能エネルギーや炭素回収といった先進技術だけが排出量を有意義に削減できる。科学的革新なしには、人類はこれらの脅威に立ち向かう実用的な手段を欠くことになる。\n\n結論として、科学だけであらゆる問題を解決できるわけではないが、その証拠に基づく方法、自己修正の能力、そして技術力ゆえに、それは利用可能な最も信頼できる手段である。したがって、人類は科学への信頼を持ち続けるべきである。",
        wordCount: 232,
        keyExpressions: [
            { en: "there is ongoing debate over whether ~", ja: "〜について議論が続いている", note: "賛否テーマを中立に切り出す導入の定番" },
            { en: "In my view, ~", ja: "私の考えでは〜", note: "イントロでthesisを明示する宣言フレーズ" },
            { en: "grounded in ~ rather than ~", ja: "…ではなく〜に基づいた", note: "二項を対比して理由を鋭く見せる型" },
            { en: "Consequently, ~", ja: "その結果〜", note: "因果の帰結を上品につなぐ接続副詞" },
            { en: "From an environmental standpoint", ja: "環境の観点から見ると", note: "視点を明示して理由を限定する万能句" },
            { en: "the most dependable instrument available", ja: "利用可能な最も信頼できる手段", note: "結論で立場を言い換える評価フレーズ" }
        ],
        tip: "「証拠・自己修正・代替不在」の3点で攻めると、科学テーマは安定して書ける。各bodyは『理由→説明→具体例』の順を崩さないのがコツ。",
    },
    {
        day: 8, exam: 'Society', focus: '実戦',
        topic: "Do welfare programs actually reduce social inequality?",
        topicJa: "福祉制度は実際に社会の不平等を減らしているか",
        stance: "Yes — welfare programs reduce inequality",
        essay: "Inequality remains one of the most persistent features of modern societies, and governments often respond by introducing social welfare programs. Some question their effectiveness, yet I firmly believe that such programs do help reduce inequality.\n\nFirst, welfare programs provide a safety net that prevents the most vulnerable from falling into extreme poverty. Unemployment benefits and public health care ensure that even those without income can access basic necessities. For instance, in many Nordic countries, generous welfare systems have produced some of the smallest income gaps in the world.\n\nSecond, these programs promote equality of opportunity, not merely equality of outcome. Free or subsidized education allows children from low-income families to acquire skills and compete fairly in the labor market. Consequently, talent rather than family wealth becomes the decisive factor in personal success.\n\nFinally, welfare spending stimulates the broader economy by increasing the purchasing power of poorer households. From an economic standpoint, money distributed to low-income citizens is spent quickly on goods and services, which in turn supports employment. This circulation gradually narrows the gap between rich and poor.\n\nIn conclusion, although welfare programs cannot eliminate inequality entirely, their protective function, promotion of opportunity, and economic benefits clearly reduce social disparities. Therefore, well-designed welfare systems are an indispensable tool for building a fairer society.",
        essayJa: "不平等は現代社会の最も根強い特徴の一つであり、政府はしばしば社会福祉制度を導入して対応する。その有効性を疑う声もあるが、私はそうした制度が不平等を減らすのに確かに役立つと固く信じている。\n\n第一に、福祉制度は最も弱い立場の人々が極度の貧困に陥るのを防ぐ安全網を提供する。失業給付や公的医療は、収入のない人でも基本的な必需品にアクセスできることを保証する。例えば、多くの北欧諸国では手厚い福祉制度が世界で最も小さい所得格差を生み出してきた。\n\n第二に、これらの制度は結果の平等だけでなく機会の平等を促進する。無償または補助のある教育は、低所得家庭の子どもが技能を身につけ、労働市場で公平に競争することを可能にする。その結果、個人の成功を左右するのは家庭の富ではなく才能となる。\n\n最後に、福祉支出は貧しい世帯の購買力を高めることで経済全体を刺激する。経済の観点から見れば、低所得者に分配された資金は財やサービスにすぐに使われ、それが雇用を支える。この循環が富裕層と貧困層の差を徐々に縮める。\n\n結論として、福祉制度が不平等を完全になくすことはできないが、その保護機能、機会の促進、経済的恩恵は明らかに社会的格差を減らす。したがって、よく設計された福祉制度は、より公正な社会を築くための不可欠な手段である。",
        wordCount: 224,
        keyExpressions: [
            { en: "I firmly believe that ~", ja: "私は〜だと固く信じている", note: "立場を強く打ち出すthesisの定番" },
            { en: "provide a safety net that prevents ~", ja: "〜を防ぐ安全網を提供する", note: "制度の機能を説明する社会系コロケーション" },
            { en: "not merely ~ but ~", ja: "単に…だけでなく〜", note: "二段で論点を深めて見せる構文" },
            { en: "From an economic standpoint", ja: "経済の観点から見ると", note: "理由を専門視点で限定する万能句" },
            { en: "an indispensable tool for ~", ja: "〜のための不可欠な手段", note: "結論で対象を高く評価する締めフレーズ" },
            { en: "which in turn ~", ja: "それが今度は〜する", note: "連鎖する因果を滑らかにつなぐ型" }
        ],
        tip: "社会制度テーマは『弱者保護→機会平等→経済効果』とミクロからマクロへ広げると説得力が出る。Nordic等の具体例を一つ入れるだけで一気に1級らしくなる。",
    },
    {
        day: 9, exam: 'Economy', focus: '実戦',
        topic: "Does a nation's economic success depend on foreign investment?",
        topicJa: "一国の経済的成功は外国からの投資に左右されるか",
        stance: "Yes — foreign investment is necessary",
        essay: "As Japan grapples with a shrinking population and sluggish growth, the question of whether foreign investment is necessary for its economic success has become increasingly urgent. I am convinced that investment from foreign companies is indeed essential.\n\nFirst, foreign investment injects much-needed capital into a domestic market suffering from chronic stagnation. With domestic caution often hindering growth, overseas funds bolster new ventures and finance infrastructure. For instance, foreign acquisitions have revived several struggling Japanese companies that would otherwise have collapsed.\n\nSecond, foreign companies bring innovative management practices and advanced technologies. There is no denying that exposure to global competition forces domestic firms to improve efficiency and adopt fresh ideas. Consequently, productivity rises across entire industries, benefiting the wider economy.\n\nFinally, foreign investment creates employment and integrates Japan more deeply into global supply chains. From a long-term perspective, this connectivity is vital for a nation whose domestic demand is steadily declining. Foreign-affiliated firms now employ millions of Japanese workers, demonstrating their tangible contribution.\n\nIn conclusion, although excessive dependence on foreign capital carries certain risks, the inflow of funds, transfer of expertise, and creation of jobs make foreign investment indispensable to Japan's prosperity. Therefore, Japan should actively welcome investment from abroad to secure its economic future.",
        essayJa: "日本が人口減少と低迷する成長に取り組む中で、その経済的成功に外国投資が必要かという問いはますます切実になっている。私は外国企業からの投資が確かに不可欠だと確信している。\n\n第一に、外国投資は慢性的な停滞に苦しむ国内市場に、切実に必要とされる資本を注入する。日本企業がしばしばリスクを取りたがらない中、海外の資金が新事業やインフラを支える。例えば、外国による買収は、さもなければ崩壊していたであろういくつかの苦境にある日本企業を再生させてきた。\n\n第二に、外国企業は革新的な経営手法と先進技術をもたらす。世界的競争にさらされることが国内企業に効率改善と新しい発想の採用を迫ることは否定できない。その結果、生産性が産業全体で高まり、より広い経済に恩恵を与える。\n\n最後に、外国投資は雇用を生み出し、日本をグローバルなサプライチェーンにより深く統合する。長期的視点で見れば、この結びつきは国内需要が着実に減少している国にとって極めて重要である。外資系企業は今や数百万の日本人労働者を雇用しており、その具体的な貢献を示している。\n\n結論として、外国資本への過度な依存には一定のリスクがあるものの、資金の流入、専門知識の移転、雇用の創出は、外国投資を日本の繁栄に不可欠なものにしている。したがって、日本は経済の未来を確保するために海外からの投資を積極的に歓迎すべきである。",
        wordCount: 224,
        keyExpressions: [
            { en: "As ~ grapples with ~,", ja: "〜が…に取り組む中で", note: "背景を提示しつつ問いを導く重厚な導入" },
            { en: "I am convinced that ~", ja: "私は〜だと確信している", note: "thesisを力強く言い切る型" },
            { en: "There is no denying that ~", ja: "〜は否定できない", note: "譲歩で一理を認めつつ自説を押す強い型" },
            { en: "from a long-term perspective", ja: "長期的視点で見ると", note: "理由を一段深く見せる副詞句" },
            { en: "make ~ indispensable to ~", ja: "〜を…に不可欠なものにする", note: "結論で重要性を総括する締め構文" },
            { en: "carries certain risks", ja: "一定のリスクを伴う", note: "譲歩を一言で示し反論を先回りする句" }
        ],
        tip: "経済テーマは『資本→技術/経営→雇用』の3点が黄金パターン。結論で軽く譲歩(過度な依存はリスク)を入れると、視野の広さが伝わって加点されやすい。",
    },
    {
        day: 10, exam: 'Society', focus: '実戦',
        topic: "Has industrialization done more good than harm to humankind?",
        topicJa: "産業化は人類に害より益をもたらしてきたか",
        stance: "Agree",
        essay: "Since the eighteenth century, industrialization has transformed nearly every aspect of human life. While some emphasize its environmental costs, I agree that industrialization has had an overall beneficial effect on humankind.\n\nFirst, industrialization has dramatically raised living standards. Mass production made goods that were once luxuries affordable to ordinary people. For instance, items such as clothing, appliances, and vehicles, formerly reserved for the wealthy, are now accessible to the majority, greatly improving everyday comfort.\n\nSecond, industrialization has extended human life expectancy. The development of modern medicine, sanitation, and food production owes much to industrial techniques. Consequently, deadly diseases have been curbed and famines reduced, allowing populations to live longer and healthier lives than ever before.\n\nFinally, industrialization has driven remarkable advances in knowledge and communication. From a long-term perspective, the factories and economies it created funded scientific research and global connectivity. Admittedly, this progress has generated pollution, yet the same industrial capacity now enables us to develop cleaner technologies to address it.\n\nIn conclusion, although industrialization has undeniably harmed the environment, its contributions to prosperity, health, and human progress far outweigh its drawbacks. Therefore, I firmly maintain that industrialization has, on balance, benefited humankind enormously.",
        essayJa: "18世紀以降、産業化は人間生活のほぼあらゆる側面を一変させてきた。その環境的代償を強調する人もいるが、私は産業化が人類に全体として有益な影響を与えてきたという意見に賛成する。\n\n第一に、産業化は生活水準を劇的に引き上げた。大量生産はかつて贅沢品だった財を普通の人々にも手の届くものにした。例えば、衣類、家電、車両といった、以前は富裕層だけのものだった品々が、今や大多数の人に手が届き、日常の快適さを大きく改善している。\n\n第二に、産業化は人間の平均寿命を延ばした。現代医学、衛生、食料生産の発展は産業技術に多くを負っている。その結果、致命的な病気は抑えられ、飢饉は減り、人々はかつてないほど長く健康な人生を送れるようになった。\n\n最後に、産業化は知識と通信における目覚ましい進歩を推進した。長期的視点で見れば、それが生み出した工場と経済が科学研究と世界的なつながりを資金面で支えた。確かにこの進歩は汚染を生んだが、その同じ産業力が今やそれに対処するためのより清潔な技術を開発することを可能にしている。\n\n結論として、産業化が紛れもなく環境を害してきたとはいえ、繁栄、健康、人類の進歩への貢献はその欠点をはるかに上回る。したがって、私は産業化が差し引きで人類に多大な恩恵をもたらしてきたと固く主張する。",
        wordCount: 197,
        keyExpressions: [
            { en: "While some emphasize ~, I agree that ~", ja: "…を強調する人もいるが、私は〜に賛成する", note: "賛否型イントロで反対意見を一蹴する型" },
            { en: "owes much to ~", ja: "〜に多くを負っている", note: "因果・恩義を上品に述べるコロケーション" },
            { en: "Admittedly, ~ yet ~", ja: "確かに…だが〜", note: "譲歩→反論で立場を守る最強の一手" },
            { en: "far outweigh its drawbacks", ja: "欠点をはるかに上回る", note: "賛否系の結論で天秤を傾ける定番" },
            { en: "on balance", ja: "差し引きで／総合的に見て", note: "全体評価を示す結論向けの副詞句" },
            { en: "I firmly maintain that ~", ja: "私は〜だと固く主張する", note: "結論で立場を再宣言する力強い動詞" }
        ],
        tip: "agree/disagree型は『生活水準→健康→進歩』のように恩恵を層で積む。一つのbodyにAdmittedly譲歩を埋め込むと反論対応が済んで、結論がぐっと締まる。",
    },
    {
        day: 11, exam: 'Environment & Energy', focus: '実戦',
        topic: "Is environmental damage an inevitable price of human progress?",
        topicJa: "環境破壊は人類の進歩に避けられない代償か",
        stance: "Disagree",
        essay: "It is often argued that human activity is inherently destructive and that societies will inevitably damage the natural world. However, I disagree with the claim that human societies will always have a negative effect on the environment.\n\nFirst, technological innovation is steadily reducing humanity's ecological footprint. Renewable energy, electric vehicles, and recycling systems already allow people to consume resources far more cleanly than in the past. For instance, several nations now generate most of their electricity from wind and solar power, proving that growth and sustainability can coexist.\n\nSecond, environmental awareness has fundamentally changed public behavior. There is no denying that decades of education have produced citizens who actively demand conservation. Consequently, governments and corporations face mounting pressure to adopt greener policies, a trend that continues to strengthen.\n\nFinally, humans are uniquely capable of restoring damaged ecosystems. From a long-term perspective, reforestation projects that alleviate ecological damage and the recovery of endangered species demonstrate that our influence can be positive. Admittedly, past damage has been severe, yet this very awareness now drives active repair.\n\nIn conclusion, although human societies have undoubtedly had a detrimental effect on nature in the past, technological progress, shifting values, and restorative efforts show that this damage is not inevitable. Therefore, I maintain that humanity need not always be a destructive force.",
        essayJa: "人間の活動は本質的に破壊的であり、社会は不可避的に自然界を傷つけるとしばしば主張される。しかし私は、人間社会が常に環境に悪影響を与え続けるという主張に反対する。\n\n第一に、技術革新は人類の生態学的足跡を着実に減らしている。再生可能エネルギー、電気自動車、リサイクル制度は、すでに人々が過去よりもはるかに清潔に資源を消費することを可能にしている。例えば、いくつかの国は今や電力の大部分を風力と太陽光で生み出しており、成長と持続可能性が共存できることを証明している。\n\n第二に、環境意識は人々の行動を根本的に変えた。数十年にわたる教育が、保全を積極的に求める市民を生み出してきたことは否定できない。その結果、政府や企業はより環境に優しい政策を採用するよう高まる圧力に直面しており、その傾向は強まり続けている。\n\n最後に、人間は損なわれた生態系を回復させる独自の能力を持つ。長期的視点で見れば、植林事業や絶滅危惧種の回復は、我々の影響が肯定的でありうることを示している。確かに過去の被害は深刻だったが、まさにその自覚が今、積極的な修復を促している。\n\n結論として、人間社会が過去に間違いなく自然を害してきたとはいえ、技術の進歩、価値観の変化、修復の努力は、この被害が不可避ではないことを示している。したがって、私は人類が常に破壊的な力である必要はないと主張する。",
        wordCount: 207,
        keyExpressions: [
            { en: "It is often argued that ~", ja: "〜としばしば主張される", note: "一般論を導入して後で反論する型" },
            { en: "I disagree with the claim that ~", ja: "〜という主張に反対する", note: "disagree型でthesisを明確に出す定番" },
            { en: "There is no denying that ~", ja: "〜は否定できない", note: "譲歩で相手の一理を認める強い型" },
            { en: "face mounting pressure to ~", ja: "〜するよう高まる圧力に直面する", note: "社会的趨勢を描くダイナミックな句" },
            { en: "Admittedly, ~ yet ~", ja: "確かに…だが〜", note: "譲歩→反論で立場を守る一手" },
            { en: "this damage is not inevitable", ja: "この被害は不可避ではない", note: "always/never系topicの反証キーフレーズ" }
        ],
        tip: "always/never の極端topicは反例を一つ出せば崩せるので disagree が書きやすい。『技術→意識→修復』と人類のプラス面を3層で並べ、Admittedlyで過去の害を認めると盤石。",
    },
    {
        day: 12, exam: 'Science & Technology', focus: '実戦',
        topic: "Will advances in genetic engineering improve our future?",
        topicJa: "遺伝子工学の進歩は私たちの未来を良くするか",
        stance: "Agree",
        essay: "Genetic engineering has advanced rapidly in recent decades, prompting debate over its far-reaching ramifications for humanity. Although some fear its misuse, I agree that genetic engineering will have a positive influence on society in the future.\n\nFirst, genetic engineering promises to revolutionize medicine. By correcting defective genes, scientists may cure inherited diseases that were once considered hopeless. For instance, gene therapies are already being used to treat certain cancers and blood disorders, offering hope to countless patients.\n\nSecond, this technology can strengthen global food security. From a long-term perspective, genetically modified crops that resist pests and drought will be essential as the world's population grows. Consequently, regions vulnerable to famine could achieve stable harvests and reduce dependence on imports.\n\nFinally, genetic engineering serves as a catalyst for broader scientific progress. The knowledge gained from manipulating genes deepens our understanding of biology itself. Admittedly, ethical concerns regarding misuse are legitimate, yet careful regulation can ensure that the technology benefits rather than harms society.\n\nIn conclusion, although genetic engineering raises valid ethical questions, its potential to cure diseases, feed populations, and accelerate science means the advantages outweigh the disadvantages. Therefore, I firmly believe that genetic engineering will ultimately benefit future generations.",
        essayJa: "遺伝子工学はここ数十年で急速に進歩し、人類への影響をめぐる議論を呼んでいる。その悪用を恐れる人もいるが、私は遺伝子工学が将来社会に良い影響を与えるという意見に賛成する。\n\n第一に、遺伝子工学は医療に革命をもたらすと期待される。欠陥のある遺伝子を修正することで、科学者はかつて絶望的とされた遺伝病を治せるかもしれない。例えば、遺伝子治療はすでに特定のがんや血液疾患の治療に用いられ、無数の患者に希望を与えている。\n\n第二に、この技術は世界の食料安全保障を強化しうる。長期的視点で見れば、害虫や干ばつに強い遺伝子組み換え作物は、世界人口が増えるにつれて不可欠になる。その結果、飢饉に弱い地域も安定した収穫を達成し、輸入への依存を減らせるだろう。\n\n最後に、遺伝子工学はより広い科学的進歩の触媒となる。遺伝子を操作することで得られる知識は、生物学そのものへの理解を深める。確かに悪用に関する倫理的懸念はもっともだが、慎重な規制によってこの技術が社会を害するのではなく利するようにできる。\n\n結論として、遺伝子工学はもっともな倫理的問題を提起するものの、病気を治し、人々を養い、科学を加速させるその可能性は、利点が欠点を上回ることを意味する。したがって、私は遺伝子工学が最終的に未来の世代に恩恵をもたらすと固く信じている。",
        wordCount: 196,
        keyExpressions: [
            { en: "prompting debate over ~", ja: "〜をめぐる議論を呼びつつ", note: "現象→論争を一文で結ぶ分詞構文の導入" },
            { en: "Although some fear ~, I agree that ~", ja: "…を恐れる人もいるが、私は〜に賛成する", note: "反対意見を先に置いてthesisを際立たせる型" },
            { en: "serve as a catalyst for ~", ja: "〜の触媒/きっかけとなる", note: "因果を上品に言う比喩コロケーション" },
            { en: "Admittedly, ~ yet ~", ja: "確かに…だが〜", note: "倫理的懸念を認めつつ規制で返す型" },
            { en: "the advantages outweigh the disadvantages", ja: "利点が欠点を上回る", note: "賛否系の結論の定番" },
            { en: "benefit future generations", ja: "未来の世代に恩恵をもたらす", note: "将来系topicを締める展望フレーズ" }
        ],
        tip: "未来予測+倫理リスク系のtopicは『医療→食料→科学』と恩恵を並べ、必ず一度Admittedlyで倫理懸念を認めて『規制で対応可』と返すのが鉄板。結論はoutweighで天秤を傾けて締める。",
    },

    {
        day: 13, exam: 'Science & Technology', focus: '実戦',
        topic: "Should governments spend more on developing new technology?",
        topicJa: "政府は新技術の開発にもっと投資すべきか",
        stance: "Yes. Governments should make investment in technology a bigger priority.",
        essay: "In recent years, the question of whether governments should allocate more resources to technological development has attracted considerable attention. In my opinion, technology should indeed become a bigger priority for governments. I will support this view from the perspectives of economic growth, public welfare, and national competitiveness.\n\nFirst, technological investment plays a pivotal role in driving long-term economic growth. New industries created by emerging technologies generate employment and tax revenue that benefit the entire nation. A case in point is South Korea, whose aggressive government funding of the semiconductor sector transformed it into a global economic powerhouse.\n\nSecond, technology dramatically improves public welfare. Innovations in medicine, transportation, and energy directly enhance the quality of citizens' daily lives. For instance, government-backed research into renewable energy not only reduces pollution but also secures a sustainable future for coming generations.\n\nFinally, from a long-term perspective, nations that neglect technology risk falling behind their rivals. In an increasingly globalized world, military and economic security depend heavily on technological superiority. Admittedly, such investment is costly. However, the price of stagnation is far greater.\n\nIn conclusion, given its contribution to economic prosperity, public welfare, and national strength, technology clearly deserves greater priority. For these reasons, I firmly believe that governments should invest more heavily in technological advancement.",
        essayJa: "近年、政府が技術開発にもっと多くの資源を割くべきかという問いが大きな注目を集めている。私の意見では、技術は確かに政府にとってより大きな優先事項となるべきだ。経済成長、公共福祉、国家競争力の観点からこの見解を支持したい。\n\n第一に、技術投資は長期的な経済成長を牽引するうえで極めて重要な役割を果たす。新興技術が生み出す新産業は、国全体に恩恵をもたらす雇用と税収を生む。好例が韓国であり、政府による半導体分野への積極的な資金投入が同国を世界的な経済大国へと変えた。\n\n第二に、技術は公共福祉を劇的に向上させる。医療、交通、エネルギーの革新は市民の日常生活の質を直接高める。たとえば政府主導の再生可能エネルギー研究は、汚染を減らすだけでなく、次世代のために持続可能な未来を確保する。\n\n最後に、長期的に見れば、技術を軽視する国は競争相手に後れを取る危険がある。ますますグローバル化する世界では、軍事的・経済的安全保障は技術的優位に大きく依存する。確かにそうした投資は費用がかかる。しかし停滞の代償ははるかに大きい。\n\n結論として、経済的繁栄、公共福祉、国力への貢献を踏まえれば、技術は明らかにより高い優先順位に値する。これらの理由から、政府は技術の進歩にもっと重点的に投資すべきだと強く信じる。",
        wordCount: 224,
        keyExpressions: [
            { en: "has attracted considerable attention", ja: "大きな注目を集めている", note: "導入で話題の重要性を立てる定番" },
            { en: "play a pivotal role in ~", ja: "〜で極めて重要な役割を果たす", note: "重要性を述べる格上げコロケーション" },
            { en: "A case in point is ~", ja: "好例が〜だ", note: "具体例の導入の型" },
            { en: "From a long-term perspective, ~", ja: "長期的に見れば〜", note: "理由を一段深く見せる" },
            { en: "Admittedly, ~. However, ~", ja: "確かに〜。しかし〜", note: "譲歩→反論で説得力を上げる" },
            { en: "For these reasons, ~", ja: "これらの理由から〜", note: "結論で3理由を束ねる" }
        ],
        tip: "賛成側は「経済・福祉・国力」の3点セットが鉄板。最後にAdmittedly譲歩を一発入れると一気に1級らしくなるよ。",
    },
    {
        day: 14, exam: 'Society', focus: '実戦',
        topic: "Is it still possible to protect personal privacy today?",
        topicJa: "今の時代、個人のプライバシーを守ることは可能か",
        stance: "No. Individual privacy can no longer be fully protected in the modern world.",
        essay: "With the rapid spread of digital technology, many people wonder whether their personal information remains safe. In my opinion, individual privacy can no longer be fully protected in the modern world. I will explain my position by examining data collection, government surveillance, and human carelessness.\n\nFirst, corporations routinely collect vast amounts of personal data. Every online search, purchase, and click is recorded and analyzed for profit. A case in point is the practice of major technology firms tracking users across countless websites, eroding individuals' control over their own information.\n\nSecond, government surveillance has expanded dramatically in the name of security. Cameras, facial recognition, and communication monitoring have become commonplace in many countries. Consequently, citizens are constantly observed, and the boundary between safety and intrusion grows increasingly blurred.\n\nFinally, from a practical standpoint, ordinary people often undermine their own privacy. Many willingly share personal details on social media without considering how much personal autonomy they surrender. Admittedly, stronger laws can offer some protection. However, technology evolves far faster than regulation can keep pace.\n\nIn conclusion, given relentless data collection, pervasive surveillance, and widespread carelessness, true privacy has become nearly impossible to maintain. For these reasons, I am convinced that individual privacy cannot be fully protected in today's interconnected world.",
        essayJa: "デジタル技術の急速な普及に伴い、多くの人が自分の個人情報が安全なままなのかと不安を抱いている。私の意見では、現代社会において個人のプライバシーをもはや完全には守れない。データ収集、政府による監視、人間の不注意という観点から立場を説明したい。\n\n第一に、企業は日常的に膨大な個人データを収集している。あらゆるオンライン検索、購入、クリックが記録され、利益のために分析される。好例が、大手技術企業が無数のサイトをまたいで利用者を追跡している実態で、個人は自分の情報をほとんど制御できない。\n\n第二に、安全保障の名のもとに政府による監視が劇的に拡大している。多くの国でカメラ、顔認識、通信監視が当たり前になった。結果として市民は常に観察され、安全と侵害の境界はますます曖昧になっている。\n\n最後に、現実的に見て、一般の人々はしばしば自らプライバシーを損なっている。多くの人が結果を考えずSNSに個人情報を進んで投稿する。確かに法律の強化はある程度の保護を与えうる。しかし技術は規制が追いつくよりはるかに速く進化する。\n\n結論として、絶え間ないデータ収集、行き渡った監視、広範な不注意を踏まえれば、真のプライバシーを保つことはほぼ不可能になった。これらの理由から、相互につながった現代世界で個人のプライバシーを完全には守れないと確信している。",
        wordCount: 217,
        keyExpressions: [
            { en: "With the rapid spread of ~", ja: "〜の急速な普及に伴い", note: "現代テーマの導入に万能" },
            { en: "A case in point is ~", ja: "好例が〜だ", note: "具体例の導入の型" },
            { en: "in the name of ~", ja: "〜の名のもとに", note: "建前と本音のズレを示す批判の型" },
            { en: "From a practical standpoint, ~", ja: "現実的に見て〜", note: "理由の角度を変える視点フレーズ" },
            { en: "Admittedly, ~. However, ~", ja: "確かに〜。しかし〜", note: "譲歩→反論で説得力を上げる" },
            { en: "For these reasons, I am convinced that ~", ja: "これらの理由から〜と確信している", note: "結論を強く締める" }
        ],
        tip: "Noで攻めると例が出しやすい。視点フレーズ(data/government/practical)を変えて3理由が被らないようにするのがコツ。",
    },
    {
        day: 15, exam: 'International', focus: '実戦',
        topic: "Are economic sanctions an effective way to influence other countries?",
        topicJa: "経済制裁は他国に影響を与える有効な手段か",
        stance: "No. Economic sanctions are not a genuinely useful foreign-policy tool.",
        essay: "When international conflicts arise, governments frequently turn to economic sanctions as an alternative to military action. However, in my opinion, sanctions are not a genuinely useful foreign-policy tool. I will justify this view by considering their impact on ordinary citizens, their limited effectiveness, and their unintended consequences.\n\nFirst, sanctions tend to harm innocent civilians rather than the leaders responsible. Restrictions on trade often lead to shortages of food and medicine, and the most vulnerable people suffer the most. A case in point is the prolonged sanctions on certain nations, where poverty deepened while ruling elites remained unaffected.\n\nSecond, from a practical standpoint, sanctions rarely achieve their intended political goals. Targeted regimes frequently find alternative trading partners and endure the pressure for years. Consequently, the policy fails to produce the desired change in behavior.\n\nFinally, sanctions can produce serious unintended consequences. They may push isolated nations toward rival powers, thereby strengthening hostile alliances. Admittedly, sanctions are less destructive than war. However, ineffective measures that punish the innocent can hardly be called useful.\n\nIn conclusion, because they harm civilians, seldom succeed, and create dangerous side effects, economic sanctions are a deeply flawed tool. For these reasons, I do not regard them as a truly effective instrument of foreign policy.",
        essayJa: "国際紛争が生じると、政府は軍事行動の代替として経済制裁にしばしば頼る。しかし私の意見では、制裁は本当に有用な外交手段ではない。一般市民への影響、限られた効果、意図せぬ結果を考慮してこの見解を正当化したい。\n\n第一に、制裁は責任ある指導者よりむしろ罪のない市民を傷つける傾向がある。貿易の制限はしばしば食料や医薬品の不足を招き、最も弱い立場の人々が最も苦しむ。好例が一部の国への長期制裁で、支配層が影響を受けないまま貧困が深刻化した。\n\n第二に、現実的に見て、制裁は意図した政治目標を達成することはまれだ。標的とされた政権はしばしば代替の貿易相手を見つけ、何年も圧力に耐える。結果として、その政策は望ましい行動変化をもたらさない。\n\n最後に、制裁は深刻な意図せぬ結果を生みうる。孤立した国を対立勢力に押しやり、それによって敵対同盟を強化しかねない。確かに制裁は戦争ほど破壊的ではない。しかし罪のない者を罰する効果のない手段を有用とはとても呼べない。\n\n結論として、市民を傷つけ、成功することがまれで、危険な副作用を生むため、経済制裁は重大な欠陥を抱えた手段だ。これらの理由から、それを真に効果的な外交手段とはみなさない。",
        wordCount: 213,
        keyExpressions: [
            { en: "turn to ~ as an alternative to ...", ja: "…の代わりに〜に頼る", note: "選択肢を比較する導入の型" },
            { en: "tend to ~ rather than ...", ja: "…よりむしろ〜する傾向がある", note: "対比で論点を鋭くする" },
            { en: "A case in point is ~", ja: "好例が〜だ", note: "具体例の導入の型" },
            { en: "rarely achieve their intended ~", ja: "意図した〜をめったに達成しない", note: "効果の薄さを論じる定型" },
            { en: "Admittedly, ~. However, ~", ja: "確かに〜。しかし〜", note: "譲歩→反論で説得力を上げる" },
            { en: "create dangerous side effects", ja: "危険な副作用を生む", note: "意図せぬ結果を語る便利な束ね方" }
        ],
        tip: "「効果が薄い系」のお題はrarely/seldom achieveが主役。譲歩で『戦争よりマシ』を認めてから潰すと反論が刺さるよ。",
    },
    {
        day: 16, exam: 'Society', focus: '実戦',
        topic: "Is overpopulation a serious danger to humanity's future?",
        topicJa: "人口過剰は人類の未来にとって深刻な危機か",
        stance: "Agree. Global overpopulation poses a serious threat to humankind's future.",
        essay: "Some argue that the steady rise in the world's population endangers the future of our species. I strongly agree that global overpopulation is a serious threat to humankind. I will defend this position by focusing on resource depletion, environmental destruction, and food insecurity.\n\nFirst, a growing population places enormous strain on limited natural resources. Water, fossil fuels, and arable land are being consumed faster than they can be replenished. Consequently, future generations may inherit a planet stripped of the resources essential for survival.\n\nSecond, overpopulation accelerates environmental destruction. More people inevitably means more pollution, deforestation, and greenhouse gas emissions. A case in point is the rapid urban expansion in developing regions, where natural habitats are destroyed to accommodate growing communities.\n\nFinally, from a long-term perspective, feeding billions of additional people poses a daunting challenge. Although agricultural technology has advanced, food production cannot expand indefinitely. Admittedly, some countries face declining birthrates. However, on a global scale, the overall trend remains alarmingly upward.\n\nIn conclusion, because it drains resources, devastates the environment, and threatens food supplies, overpopulation represents a genuine danger. For these reasons, I am firmly convinced that global overpopulation is a serious threat to the future of humankind.",
        essayJa: "世界人口の着実な増加が人類という種の未来を危険にさらすと主張する人もいる。私は、世界の人口過剰が人類への深刻な脅威であることに強く賛成する。資源の枯渇、環境破壊、食料不安に焦点を当ててこの立場を擁護したい。\n\n第一に、増え続ける人口は限られた天然資源に多大な負荷をかける。水、化石燃料、耕作可能な土地は補充できる速度より速く消費されている。結果として、未来の世代は生存に不可欠な資源を奪われた地球を受け継ぐかもしれない。\n\n第二に、人口過剰は環境破壊を加速させる。人が増えれば必然的に汚染、森林破壊、温室効果ガス排出も増える。好例が開発途上地域の急速な都市拡大で、増える共同体を収容するために自然の生息地が破壊されている。\n\n最後に、長期的に見れば、さらに数十億人を養うことは困難な課題を突きつける。農業技術は進歩したが、食料生産を無限に拡大することはできない。確かに出生率が低下している国もある。しかし世界規模で見れば、全体の傾向は憂慮すべきほど上昇したままだ。\n\n結論として、資源を枯渇させ、環境を荒廃させ、食料供給を脅かすため、人口過剰は真の危険を表している。これらの理由から、世界の人口過剰が人類の未来への深刻な脅威であると固く確信している。",
        wordCount: 207,
        keyExpressions: [
            { en: "places enormous strain on ~", ja: "〜に多大な負荷をかける", note: "負担・圧力を述べる格上げ表現" },
            { en: "faster than they can be replenished", ja: "補充できるより速く", note: "持続不可能性を示す型" },
            { en: "A case in point is ~", ja: "好例が〜だ", note: "具体例の導入の型" },
            { en: "From a long-term perspective, ~", ja: "長期的に見れば〜", note: "理由を一段深く見せる" },
            { en: "on a global scale, ~", ja: "世界規模で見れば〜", note: "反例を一般傾向で押し返す" },
            { en: "I am firmly convinced that ~", ja: "〜と固く確信している", note: "結論を強く締める" }
        ],
        tip: "agree/disagree型もエッセイの骨格は同じ。譲歩で『少子化の国もある』を認め、on a global scaleで全体傾向に戻すと一級の論理になる。",
    },
    {
        day: 17, exam: 'International', focus: '実戦',
        topic: "Should nations put closer ties with their neighbors first?",
        topicJa: "国は近隣諸国との関係強化を最優先すべきか",
        stance: "Agree. Improving relations with other Asian nations should be a priority for Japan.",
        essay: "There is ongoing debate over how much effort Japan should devote to its neighbors. In my opinion, improving relations with other Asian nations should clearly be a priority for the Japanese government. I will support this view by examining economic benefits, regional stability, and shared challenges.\n\nFirst, stronger ties bring substantial economic benefits. Asia is home to some of the world's fastest-growing markets, and Japan depends heavily on regional trade and investment. Consequently, closer cooperation would strengthen Japan's economy and create new opportunities for its businesses.\n\nSecond, improved relations play a pivotal role in ensuring regional stability. Historical tensions persist in East Asia, and unresolved disputes could easily escalate. For instance, sustained dialogue with neighboring countries reduces the risk of conflict and fosters lasting peace.\n\nFinally, from a long-term perspective, Asian nations face common challenges that no country can solve alone. Issues such as climate change and pandemics demand coordinated regional action. Admittedly, deep historical grievances complicate cooperation. However, ignoring neighbors would only deepen mistrust.\n\nIn conclusion, because it boosts the economy, secures stability, and enables joint solutions, improving Asian relations deserves high priority. For these reasons, I firmly believe the Japanese government should make this goal a central focus.",
        essayJa: "日本が近隣諸国にどれほど力を注ぐべきかについては議論が続いている。私の意見では、他のアジア諸国との関係改善は日本政府にとって明確に優先事項であるべきだ。経済的利益、地域の安定、共通の課題を検討してこの見解を支持したい。\n\n第一に、より強い結びつきは多大な経済的利益をもたらす。アジアには世界で最も急成長する市場のいくつかがあり、日本は地域の貿易と投資に大きく依存している。結果として、より緊密な協力は日本経済を強化し、企業に新たな機会を生む。\n\n第二に、関係改善は地域の安定を確保するうえで極めて重要な役割を果たす。東アジアには歴史的緊張が残り、未解決の対立は容易に激化しかねない。たとえば近隣諸国との継続的な対話は紛争の危険を減らし、永続的な平和を育む。\n\n最後に、長期的に見れば、アジア諸国はどの国も単独では解決できない共通の課題に直面している。気候変動や感染症のような問題は協調した地域行動を要する。確かに根深い歴史的恨みは協力を難しくする。しかし近隣を無視すれば不信を深めるだけだ。\n\n結論として、経済を押し上げ、安定を確保し、共同の解決を可能にするため、アジアとの関係改善は高い優先順位に値する。これらの理由から、日本政府はこの目標を中心的な焦点とすべきだと強く信じる。",
        wordCount: 211,
        keyExpressions: [
            { en: "There is ongoing debate over ~", ja: "〜については議論が続いている", note: "賛否が割れるお題の導入に最適" },
            { en: "is home to some of the world's ~", ja: "世界で最も〜のいくつかがある", note: "規模・重要性を盛る表現" },
            { en: "play a pivotal role in ~", ja: "〜で極めて重要な役割を果たす", note: "重要性を述べる格上げコロケーション" },
            { en: "From a long-term perspective, ~", ja: "長期的に見れば〜", note: "理由を一段深く見せる" },
            { en: "Admittedly, ~. However, ~", ja: "確かに〜。しかし〜", note: "譲歩→反論で説得力を上げる" },
            { en: "make this goal a central focus", ja: "この目標を中心的焦点とする", note: "優先順位系のお題の締めに効く" }
        ],
        tip: "priority系のお題は『経済・安定・共通課題』が黄金パターン。譲歩で歴史問題を一回認めると逃げてない感が出るよ。",
    },
    {
        day: 18, exam: 'Society & Health', focus: '実戦',
        topic: "Will infectious diseases pose a greater danger in the years to come?",
        topicJa: "感染症は今後より大きな脅威となるか",
        stance: "Agree. Infectious diseases will become a bigger problem in the coming decades.",
        essay: "As the world becomes increasingly interconnected, many experts warn about the future of public health. In my opinion, infectious diseases will undoubtedly become a bigger problem in the coming decades. I will support this view by examining globalization, antibiotic resistance, and climate change.\n\nFirst, the unprecedented scale of global travel accelerates the spread of disease. A virus emerging in one region can reach distant continents within hours. A case in point is the recent pandemic, which spread worldwide with alarming speed and overwhelmed health systems everywhere.\n\nSecond, the overuse of antibiotics has produced increasingly resistant bacteria. As medicines lose their effectiveness, once-treatable infections may again become deadly. Consequently, humanity could lose its most reliable defense against many diseases.\n\nFinally, from a long-term perspective, climate change expands the range of disease-carrying insects. Rising temperatures allow mosquitoes and other vectors to thrive in previously unaffected regions. Admittedly, medical technology continues to advance. However, pathogens evolve and spread faster than new treatments can be developed.\n\nIn conclusion, because of relentless globalization, growing drug resistance, and a warming planet, infectious diseases pose an escalating threat. For these reasons, I am firmly convinced that they will become a far bigger problem in the decades ahead.",
        essayJa: "世界がますます相互につながるにつれ、多くの専門家が公衆衛生の未来について警告している。私の意見では、感染症は今後数十年で間違いなくより大きな問題になる。グローバル化、抗生物質耐性、気候変動を検討してこの見解を支持したい。\n\n第一に、前例のない規模の世界的な移動が病気の拡散を加速させる。ある地域で出現したウイルスは数時間で遠く離れた大陸に到達しうる。好例が最近のパンデミックで、驚くべき速さで世界中に広がり、各地の医療体制を圧倒した。\n\n第二に、抗生物質の乱用がますます耐性を持つ細菌を生み出してきた。薬が効力を失うにつれ、かつて治療可能だった感染症が再び致命的になりかねない。結果として、人類は多くの病気に対する最も信頼できる防御を失う可能性がある。\n\n最後に、長期的に見れば、気候変動は病気を媒介する昆虫の生息域を広げる。気温上昇により、蚊などの媒介生物がこれまで影響のなかった地域でも繁殖できるようになる。確かに医療技術は進歩し続けている。しかし病原体は新たな治療法が開発されるより速く進化し拡散する。\n\n結論として、絶え間ないグローバル化、増大する薬剤耐性、温暖化する地球のために、感染症は深刻化する脅威を突きつける。これらの理由から、それらが今後数十年ではるかに大きな問題になると固く確信している。",
        wordCount: 209,
        keyExpressions: [
            { en: "As the world becomes increasingly interconnected, ~", ja: "世界がますますつながるにつれ〜", note: "現代的お題の導入に万能" },
            { en: "the unprecedented scale of ~", ja: "前例のない規模の〜", note: "深刻さを誇張せず強調する" },
            { en: "A case in point is ~", ja: "好例が〜だ", note: "具体例の導入の型" },
            { en: "From a long-term perspective, ~", ja: "長期的に見れば〜", note: "理由を一段深く見せる" },
            { en: "Admittedly, ~. However, ~", ja: "確かに〜。しかし〜", note: "譲歩→反論で説得力を上げる" },
            { en: "pose an escalating threat", ja: "深刻化する脅威を突きつける", note: "「悪化する」系のお題の締めに便利" }
        ],
        tip: "未来予測のお題は『なぜ悪化するか』の原因を3つ挙げるのが書きやすい。譲歩で医療の進歩を認めてからevolve fasterで潰すのが定石。",
    },

    {
        day: 19, exam: 'International', focus: '実戦',
        topic: "Can the world realistically ban weapons of mass destruction?",
        topicJa: "世界は大量破壊兵器を現実的に禁止できるか",
        stance: "No. A complete worldwide ban is not realistically attainable.",
        essay: "It is widely believed that humanity should rid itself of weapons of mass destruction. While this is a noble aspiration, I am convinced that a complete worldwide ban remains an unattainable goal for the foreseeable future.\n\nFirst, such weapons function as a powerful deterrent. This is largely because nuclear powers regard their arsenals as a guarantee against invasion. For instance, states that possess these weapons have rarely been attacked directly, which makes them deeply reluctant to disarm.\n\nSecond, verification is extremely difficult. Even if every nation signed a treaty, confirming that hidden stockpiles had truly been destroyed would pose a serious problem. For instance, inspectors have repeatedly struggled to access secretive facilities, leaving room for concealment and cheating.\n\nFinally, mutual distrust among rival nations makes disarmament fragile. No country will abandon its weapons while its enemies might retain theirs. Consequently, even sincere negotiations tend to collapse the moment one side suspects betrayal.\n\nAdmittedly, treaties have reduced certain arsenals. Nevertheless, reduction is not the same as elimination, and the underlying incentives to keep these weapons remain strong.\n\nIn conclusion, deterrence, the difficulty of verification, and entrenched distrust make a worldwide ban impractical. Although limiting these weapons is worthwhile, completely abolishing them is, regrettably, beyond our reach.",
        essayJa: "人類は大量破壊兵器を捨てるべきだと広く信じられている。これは崇高な願いではあるが、完全な世界的禁止は当面のあいだ達成不可能な目標だと私は確信している。\n\n第一に、こうした兵器は強力な抑止力として機能する。これは主に、核保有国が自国の兵器を侵略に対する保証とみなしているからだ。例えば、これらの兵器を持つ国が直接攻撃されることはまれであり、そのため手放すことを極度に渋る。\n\n第二に、検証が極めて難しい。たとえすべての国が条約に署名しても、隠された備蓄が本当に廃棄されたと確認することは深刻な問題となる。例えば、査察官は秘密施設へのアクセスに繰り返し苦労しており、隠蔽やごまかしの余地が残る。\n\n最後に、敵対国間の相互不信が軍縮を脆くする。敵が兵器を残しているかもしれないのに、自国だけ捨てる国はない。その結果、誠実な交渉でさえ、一方が裏切りを疑った瞬間に崩れがちだ。\n\n確かに、条約は一部の兵器を削減してきた。それでもなお、削減は廃絶と同じではなく、兵器を保持しようとする根本的な動機は依然として強い。\n\n結論として、抑止力、検証の難しさ、根深い不信が世界的禁止を非現実的にしている。これらの兵器を制限することには価値があるが、完全に廃絶することは残念ながら我々の手の届かないところにある。",
        wordCount: 224,
        keyExpressions: [
            { en: "It is widely believed that ~", ja: "〜と広く信じられている", note: "一般論を導入してから自説へ繋ぐ定番。賛否どちらにも使える" },
            { en: "While this is ~, I am convinced that ~", ja: "〜ではあるが、私は〜だと確信している", note: "譲歩しつつ強い主張を出すイントロの型" },
            { en: "This is largely because ~", ja: "これは主に〜だからだ", note: "理由を一文で深掘りする型。どの本論でも使える" },
            { en: "pose a serious problem", ja: "深刻な問題をもたらす", note: "リスクや困難を語る時の安全なコロケーション" },
            { en: "Admittedly, ~. Nevertheless, ~", ja: "確かに〜。それでもなお〜", note: "反対意見を一度認めて切り返す格上げ譲歩型" },
            { en: "is beyond our reach", ja: "我々の手の届かない範囲だ", note: "結論で「不可能」を上品に言い換えるフレーズ" }
        ],
        tip: "「不可能寄り」の立場は理由が出しやすい。抑止/検証/不信のように『なぜ実現しないか』を3つ並べると論が締まるよ。",
    },
    {
        day: 20, exam: 'Education', focus: '実戦',
        topic: "Is a degree in the humanities still worth pursuing today?",
        topicJa: "人文系の学位は今なお学ぶ価値があるか",
        stance: "No. A Humanities degree remains highly relevant today.",
        essay: "In an age dominated by technology and data, some argue that studying the Humanities is no longer worthwhile. However, I firmly believe that a university degree in the Humanities retains great relevance in today's world.\n\nFirst, the Humanities cultivate critical thinking. This is largely because subjects such as philosophy and history train students to question assumptions and weigh evidence. For instance, employers increasingly value graduates who can analyze complex problems rather than merely follow instructions.\n\nSecond, these disciplines develop strong communication skills. Furthermore, the ability to write and argue persuasively is essential in almost every profession. For instance, fields ranging from law to marketing depend heavily on the clear expression that Humanities training provides.\n\nFinally, the Humanities foster ethical awareness, which technology alone cannot supply. Moreover, as artificial intelligence raises difficult moral questions, society urgently needs people capable of judging right from wrong. For instance, debates over privacy and fairness demand exactly the reflective insight these subjects nurture.\n\nAdmittedly, technical skills offer clearer career paths and higher starting salaries. Nevertheless, the adaptable thinking gained from the Humanities often proves more durable over an entire career.\n\nIn conclusion, by sharpening critical thinking, communication, and ethical judgment, the Humanities remain profoundly relevant. Far from being obsolete, such education equips people to thrive in a rapidly changing world.",
        essayJa: "テクノロジーとデータが支配する時代に、人文学を学ぶことはもはや価値がないと主張する人もいる。しかし私は、人文系の大学の学位は現代においても大きな意義を保っていると固く信じている。\n\n第一に、人文学は批判的思考を養う。これは主に、哲学や歴史といった科目が、前提を疑い証拠を吟味する力を学生に訓練するからだ。例えば、雇用主は単に指示に従うだけでなく複雑な問題を分析できる卒業生をますます重視している。\n\n第二に、これらの学問は強い伝達力を育てる。さらに、説得力をもって書き議論する能力は、ほぼあらゆる職業で不可欠だ。例えば、法律からマーケティングに至る分野は、人文学の訓練が与える明快な表現に大きく依存している。\n\n最後に、人文学は倫理的な意識を育むが、これはテクノロジーだけでは供給できない。しかも、人工知能が難しい道徳的問いを生む中で、社会は善悪を判断できる人材を切実に必要としている。例えば、プライバシーや公平性をめぐる議論は、まさにこれらの科目が育てる省察的洞察を求めている。\n\n確かに、技術系のスキルはより明確なキャリアと高い初任給を与える。それでもなお、人文学から得る柔軟な思考は、キャリア全体を通してしばしばより長持ちする。\n\n結論として、批判的思考、伝達力、倫理的判断を磨くことで、人文学は今なお深く意義を持つ。時代遅れどころか、こうした教育は急速に変化する世界で人々が活躍する力を与えるのだ。",
        wordCount: 227,
        keyExpressions: [
            { en: "In an age dominated by ~, some argue that ~", ja: "〜が支配する時代に、〜と主張する人もいる", note: "時代背景を置いて反対論を紹介するイントロ型" },
            { en: "I firmly believe that ~", ja: "私は〜だと固く信じている", note: "強い主張を出すテーゼ表現。汎用" },
            { en: "cultivate / foster / develop ~", ja: "〜を養う・育む・伸ばす", note: "能力や資質を語る動詞のローテ。同じ動詞の連発を防げる" },
            { en: "is essential in almost every ~", ja: "ほぼあらゆる〜で不可欠だ", note: "汎用性の高さを示す誇張しすぎない強調" },
            { en: "Far from being ~, ~", ja: "〜どころか、むしろ〜", note: "反対概念を否定しつつ結論を締める型" }
        ],
        tip: "「能力を育てる」系のテーマは cultivate / foster / develop を使い分けると一気に1級っぽくなる。例も『仕事で役立つ』に寄せると具体性が出るよ。",
    },
    {
        day: 21, exam: 'Society', focus: '実戦',
        topic: "Is hosting the Olympic Games truly worthwhile for a country?",
        topicJa: "オリンピック開催は国にとって本当に価値があるか",
        stance: "Agree. Japan will benefit overall from hosting the Games.",
        essay: "The decision to host the 2020 Summer Olympics has prompted lively debate about its value. Having weighed the arguments, I agree that Japan will benefit overall from staging this global event.\n\nFirst, the Olympics stimulate the economy. This is largely because the influx of tourists boosts spending on hotels, restaurants, and transportation. For instance, host cities often report a sharp rise in visitor numbers, which supports local businesses and creates jobs.\n\nSecond, the Games accelerate infrastructure development. Moreover, the deadline pressures governments to modernize stadiums, railways, and public facilities. For instance, improved transport networks built for the event continue to serve residents long after the closing ceremony.\n\nFinally, hosting enhances national prestige. Furthermore, welcoming athletes and spectators from around the world strengthens international goodwill toward Japan. For instance, positive media coverage can attract future tourism and foreign investment for years to come.\n\nAdmittedly, the Olympics involve enormous costs and the risk of unused venues. Nevertheless, careful planning can repurpose these facilities, and the long-term gains generally outweigh the short-term expense.\n\nIn conclusion, through economic stimulus, lasting infrastructure, and heightened prestige, hosting the Games offers Japan substantial advantages. Despite the considerable costs, the nation stands to benefit overall from this opportunity.",
        essayJa: "2020年夏季五輪を開催するという決定は、その価値をめぐる活発な議論を呼んだ。論点を比較検討した結果、私は日本がこの世界的イベントの開催から全体として恩恵を受けると考える。\n\n第一に、五輪は経済を刺激する。これは主に、観光客の流入がホテル・飲食・交通への支出を押し上げるからだ。例えば、開催都市はしばしば訪問者数の急増を報告し、それが地元企業を支え雇用を生む。\n\n第二に、五輪はインフラ整備を加速させる。しかも、期限が政府にスタジアム・鉄道・公共施設の近代化を迫る。例えば、イベントのために整備された交通網は、閉会式のずっと後まで住民の役に立ち続ける。\n\n最後に、開催は国家の威信を高める。さらに、世界中の選手や観客を迎えることは、日本への国際的な好意を強める。例えば、好意的な報道は、その後何年にもわたり将来の観光や外国投資を呼び込みうる。\n\n確かに、五輪には莫大な費用と、使われない会場が出るリスクが伴う。それでもなお、入念な計画でこうした施設を再利用でき、長期的な利益はおおむね短期的な出費を上回る。\n\n結論として、経済の刺激、長く残るインフラ、高まる威信を通じて、五輪開催は日本に大きな利点をもたらす。相当な費用にもかかわらず、日本はこの機会から全体として恩恵を受ける見込みだ。",
        wordCount: 207,
        keyExpressions: [
            { en: "Having weighed the arguments, I agree that ~", ja: "論点を比較検討した結果、私は〜に賛成する", note: "賛否型の設問でテーゼを出すイントロ表現" },
            { en: "stimulate the economy", ja: "経済を刺激する", note: "経済効果を語る定番コロケーション。汎用" },
            { en: "continue to serve ~ long after ~", ja: "〜のずっと後も〜の役に立ち続ける", note: "長期的効果を示す型。レガシー系の話で強い" },
            { en: "the long-term gains outweigh the short-term ~", ja: "長期的利益が短期的〜を上回る", note: "コスト vs 利益の譲歩を締める鉄板表現" },
            { en: "stands to benefit from ~", ja: "〜から恩恵を受ける見込みだ", note: "結論で利益を断定しすぎず述べる言い回し" }
        ],
        tip: "賛成型は『経済・インフラ・威信』の3本柱が組みやすい。コストの反論は必ず一度認めて outweigh で返すと説得力が上がるよ。",
    },
    {
        day: 22, exam: 'International', focus: '実戦',
        topic: "Should countries rethink their ties with powerful allies?",
        topicJa: "国は強力な同盟国との関係を見直すべきか",
        stance: "No. Japan should maintain rather than fundamentally rethink the alliance.",
        essay: "Some commentators urge Japan to reconsider its long-standing alliance with the United States. After careful reflection, I believe Japan should maintain this relationship rather than fundamentally rethink it.\n\nFirst, the alliance provides essential security. This is largely because regional tensions and an unstable neighborhood pose a serious threat to Japan. For instance, the American security guarantee deters potential aggressors that Japan could not realistically confront alone.\n\nSecond, the partnership brings significant economic benefits. Moreover, the United States remains one of Japan's largest trading partners and a key source of investment. For instance, close cooperation has supported stable supply chains and access to vital markets for decades.\n\nFinally, the two nations share fundamental values such as democracy and the rule of law. Furthermore, this common ground enables them to coordinate on global issues ranging from trade rules to climate policy. For instance, joint diplomatic efforts carry far greater weight than either country could achieve in isolation.\n\nAdmittedly, the relationship is not without friction, particularly over the basing of troops. Nevertheless, such disputes can be managed through dialogue without discarding the alliance itself.\n\nIn conclusion, given its contributions to security, prosperity, and shared values, the alliance remains in Japan's interest. Rather than abandoning this partnership, Japan should work to strengthen it.",
        essayJa: "一部の論者は、日本に対米の長年の同盟を再考するよう促す。熟慮の末、私は日本がこの関係を根本的に見直すよりも維持すべきだと考える。\n\n第一に、同盟は不可欠な安全保障を提供する。これは主に、地域の緊張と不安定な近隣が日本に深刻な脅威をもたらすからだ。例えば、米国の安全保障の保証は、日本が現実的に単独では対峙できない潜在的な侵略者を抑止する。\n\n第二に、この協力関係は大きな経済的利益をもたらす。しかも、米国は依然として日本最大級の貿易相手であり、投資の重要な源だ。例えば、緊密な協力は何十年もの間、安定した供給網と重要市場へのアクセスを支えてきた。\n\n最後に、両国は民主主義や法の支配といった根本的な価値を共有している。さらに、この共通基盤により、貿易ルールから気候政策に至る世界的課題で協調できる。例えば、共同の外交努力は、どちらの国も単独では実現できないはるかに大きな影響力を持つ。\n\n確かに、特に米軍の駐留をめぐって、この関係に摩擦がないわけではない。それでもなお、こうした対立は同盟そのものを捨てずとも対話を通じて管理できる。\n\n結論として、安全保障、繁栄、共有する価値への貢献を踏まえると、同盟は日本の利益にかなう。この協力関係を放棄するのではなく、日本はそれを強化するよう努めるべきだ。",
        wordCount: 211,
        keyExpressions: [
            { en: "After careful reflection, I believe ~", ja: "熟慮の末、私は〜だと考える", note: "落ち着いた口調でテーゼを置くイントロ型" },
            { en: "pose a serious threat to ~", ja: "〜に深刻な脅威をもたらす", note: "安全保障やリスクを語る鉄板コロケーション" },
            { en: "brings significant ~ benefits", ja: "大きな〜の利益をもたらす", note: "メリットを述べる汎用フレーム。形容詞を差し替え可" },
            { en: "share fundamental values such as ~", ja: "〜のような根本的価値を共有する", note: "国家間や組織間の共通基盤を語る型" },
            { en: "can be managed through dialogue", ja: "対話を通じて管理できる", note: "問題点を否定せず軽く処理する譲歩の決まり文句" }
        ],
        tip: "「現状維持」を選ぶと安全保障・経済・価値観の3点で書きやすい。摩擦は否定せず『対話で管理できる』と受け流すのがコツ。",
    },
    {
        day: 23, exam: 'Ethics & Rights', focus: '実戦',
        topic: "Are restrictions on free speech ever justified?",
        topicJa: "言論の自由の制限が正当化されることはあるか",
        stance: "Yes. Restrictions on freedom of speech can sometimes be justified.",
        essay: "Freedom of speech is rightly regarded as a cornerstone of democracy. Even so, I am convinced that restrictions on this freedom can, in certain circumstances, be justified.\n\nFirst, limits are necessary to prevent direct harm. This is largely because speech that incites violence can endanger innocent lives. For instance, calls to attack a particular group have historically triggered riots and even massacres, which no responsible society should tolerate.\n\nSecond, restrictions protect individual dignity. Moreover, hate speech and slander can inflict lasting psychological damage on vulnerable people. For instance, relentless online abuse has driven some victims to despair, demonstrating that unlimited speech can cause genuine suffering.\n\nFinally, certain limits safeguard public order and security. Furthermore, the spread of dangerous misinformation can endanger the entire community. For instance, false rumors during a crisis may trigger panic, making reasonable controls a matter of public safety.\n\nAdmittedly, governments can abuse such restrictions to silence legitimate criticism. Nevertheless, this risk argues for careful, narrowly defined limits rather than for abandoning all regulation.\n\nIn conclusion, in order to prevent harm, protect dignity, and preserve public order, restrictions on speech can indeed be justified. While free expression deserves strong protection, it cannot be entirely without limits.",
        essayJa: "言論の自由は、当然ながら民主主義の礎とみなされている。とはいえ私は、この自由への制限が特定の状況下では正当化されうると確信している。\n\n第一に、直接的な危害を防ぐために制限が必要だ。これは主に、暴力を扇動する言論が罪のない命を危険にさらしうるからだ。例えば、特定の集団への攻撃を呼びかける言葉は歴史的に暴動や虐殺さえ引き起こしてきた。責任ある社会がそれを容認すべきではない。\n\n第二に、制限は個人の尊厳を守る。しかも、ヘイトスピーチや中傷は弱い立場の人々に長く続く心理的損害を与えうる。例えば、執拗なネット上の中傷が一部の被害者を絶望に追い込んでおり、無制限の言論が本当の苦しみを生みうることを示している。\n\n最後に、一定の制限は公の秩序と安全を守る。さらに、危険な誤情報の拡散は社会全体を危険にさらしうる。例えば、危機時の偽情報はパニックを招きかねず、合理的な統制を公共の安全の問題にする。\n\n確かに、政府は正当な批判を封じるためにこうした制限を悪用しうる。それでもなお、このリスクはすべての規制を捨てる理由ではなく、慎重で狭く定義された制限を支持する理由になる。\n\n結論として、危害を防ぎ、尊厳を守り、公の秩序を保つために、言論への制限は確かに正当化されうる。自由な表現は強く保護されるべきだが、まったく無制限ではありえない。",
        wordCount: 200,
        keyExpressions: [
            { en: "is rightly regarded as a cornerstone of ~", ja: "〜の礎として当然みなされている", note: "重要概念を立ててから制限を論じるイントロ型" },
            { en: "Even so, I am convinced that ~", ja: "とはいえ私は〜だと確信している", note: "前文を一度認めて逆張りの主張を出す転換表現" },
            { en: "endanger / inflict damage on ~", ja: "〜を危険にさらす・損害を与える", note: "害悪を語る動詞のセット。本論の核に使える" },
            { en: "argues for ~ rather than ~", ja: "〜ではなく〜を支持する根拠になる", note: "反論を逆手に取って自説へ転じる高度な型" },
            { en: "cannot be entirely without limits", ja: "まったく無制限ではありえない", note: "結論で立場を断定する締めのフレーズ" }
        ],
        tip: "「制限OK」側は危害・尊厳・秩序の3点が鉄板。政府の悪用という反論は argues for で『だから慎重な制限を』と切り返すと上級者っぽいよ。",
    },
    {
        day: 24, exam: 'Ethics & Rights', focus: '実戦',
        topic: "Should the death penalty be abolished?",
        topicJa: "死刑制度は廃止すべきか",
        stance: "Yes. The death penalty should be banned in Japan.",
        essay: "Capital punishment remains a deeply divisive issue in Japan. After weighing the evidence, I am convinced that the death penalty should be abolished.\n\nFirst, the risk of executing an innocent person is unacceptable. This is largely because no judicial system is immune to error. For instance, several convictions in Japan have later been overturned, and an execution, unlike imprisonment, can never be reversed once carried out.\n\nSecond, the death penalty does not reliably deter crime. Moreover, studies comparing regions with and without capital punishment reveal no clear difference in murder rates. For instance, many countries that have abolished it have not seen any surge in violent crime, which undermines the deterrence argument.\n\nFinally, abolition reflects a more humane and modern set of values. Furthermore, the majority of developed nations have already ended the practice. For instance, joining this international consensus would strengthen Japan's standing as a defender of human rights.\n\nAdmittedly, victims' families understandably demand severe retribution. Nevertheless, justice should aim at fairness rather than vengeance, and lifelong imprisonment can hold offenders fully accountable.\n\nIn conclusion, because of the danger of irreversible mistakes, the lack of clear deterrence, and the call for humane values, the death penalty should be banned. Japan would be wiser to choose justice without the risk of killing the innocent.",
        essayJa: "死刑は日本で依然として深く意見の分かれる問題だ。証拠を比較検討した結果、私は死刑は廃止すべきだと確信している。\n\n第一に、無実の人を処刑する危険は容認できない。これは主に、誤りを免れる司法制度など存在しないからだ。例えば、日本でもいくつかの有罪判決が後に覆っており、処刑は投獄と違い、一度執行すれば決して取り返せない。\n\n第二に、死刑は確実に犯罪を抑止するわけではない。しかも、死刑のある地域とない地域を比較した研究は、殺人発生率に明確な差を示していない。例えば、廃止した多くの国で凶悪犯罪の急増は見られておらず、抑止力の議論を弱めている。\n\n最後に、廃止はより人道的で現代的な価値観を反映する。さらに、先進国の大多数はすでにこの慣行を終えている。例えば、この国際的な合意に加わることは、人権の擁護者としての日本の立場を強めるだろう。\n\n確かに、被害者遺族が厳しい報復を求めるのは理解できる。それでもなお、正義は復讐よりも公正を目指すべきであり、終身刑によって加害者に十分に責任を取らせられる。\n\n結論として、取り返しのつかない過ちの危険、明確な抑止力の欠如、人道的価値への要請ゆえに、死刑は廃止すべきだ。日本は、無実の人を殺す危険のない正義を選ぶほうが賢明だろう。",
        wordCount: 217,
        keyExpressions: [
            { en: "remains a deeply divisive issue", ja: "依然として深く意見の分かれる問題だ", note: "賛否が割れるテーマのイントロに使える定番" },
            { en: "After weighing the evidence, I am convinced that ~", ja: "証拠を比較検討した結果、〜だと確信している", note: "根拠重視の姿勢でテーゼを出す型" },
            { en: "is immune to error", ja: "誤りを免れている", note: "「完璧な制度はない」を言う時の上品な否定表現" },
            { en: "studies reveal no clear difference in ~", ja: "研究は〜に明確な差を示さない", note: "データで反論を崩す本論の武器。汎用" },
            { en: "should aim at ~ rather than ~", ja: "〜ではなく〜を目指すべきだ", note: "価値の優先順位を示して反論をかわす型" }
        ],
        tip: "廃止側は『冤罪・抑止力なし・人道』の3点が組みやすい。遺族感情の反論は否定せず aim at fairness rather than vengeance で受けると角が立たないよ。",
    },

    {
        day: 25, exam: 'International', focus: '実戦',
        topic: "Should democracies actively promote democracy abroad?",
        topicJa: "民主主義国は海外へ民主主義を積極的に広めるべきか",
        stance: "No. Democratic nations should not actively promote democracy abroad, as imposed political systems often fail and provoke resentment.",
        essay: "In recent decades, some argue that democratic nations bear a duty to spread their values to authoritarian states. However, I firmly believe that democracies should not actively promote democracy to non-democratic nations, for three principal reasons.\n\nFirst, political systems imposed from outside rarely take root. Democracy depends on institutions, civic traditions, and public trust that must develop internally over time. For instance, several Middle Eastern states that adopted democratic structures under foreign pressure quickly descended into instability, demonstrating that externally driven reform tends to collapse.\n\nSecond, such promotion frequently provokes resentment and is perceived as cultural imperialism. Many citizens of non-democratic nations regard foreign intervention as an arrogant attempt to dictate their way of life. Consequently, these efforts can strengthen anti-Western sentiment and entrench the very regimes they aim to weaken.\n\nFinally, the resources devoted to spreading democracy could be invested more productively at home. Democratic nations themselves face pressing problems such as inequality and political polarization. Therefore, prioritizing domestic challenges would yield far greater benefits than costly overseas campaigns of uncertain success.\n\nIn conclusion, although the ideal of global democracy is appealing, externally imposed political change is ineffective, resented, and wasteful. For these reasons, democratic nations should refrain from actively promoting democracy to other countries.",
        essayJa: "近年、民主主義国にはその価値観を権威主義国家に広める義務があると主張する人もいる。しかし私は、三つの理由から、民主主義国が非民主国へ民主主義を積極的に促すべきではないと固く信じている。\n\n第一に、外部から押し付けられた政治制度はめったに根付かない。民主主義は、時間をかけて内部で育つべき制度・市民的伝統・国民の信頼に依存する。例えば、外圧の下で民主的な仕組みを採用した中東のいくつかの国は、すぐに不安定化し、外部主導の改革が崩壊しがちであることを示した。\n\n第二に、こうした促進はしばしば反発を招き、文化的帝国主義と受け取られる。非民主国の多くの市民は、外国の介入を、自分たちの生き方を指図する傲慢な試みと見なす。その結果、こうした努力は反西洋感情を強め、弱体化させようとした体制をかえって固定化しかねない。\n\n最後に、民主主義の拡大に費やされる資源は、自国でより有効に投資できる。民主主義国自身も、格差や政治的分断といった差し迫った問題を抱えている。したがって、国内課題を優先する方が、成否の不確かな高コストの海外活動よりはるかに大きな利益を生むだろう。\n\n結論として、世界的な民主化という理想は魅力的だが、外部から押し付けられた政治変革は効果がなく、反発を招き、無駄が多い。これらの理由から、民主主義国は他国への民主主義の積極的な促進を控えるべきだ。",
        wordCount: 228,
        keyExpressions: [
            { en: "some argue that ~, However, I firmly believe that ~", ja: "〜と主張する人もいるが、私は〜と固く信じる", note: "賛否を提示してから自分の立場を打ち出す王道の書き出し" },
            { en: "for three principal reasons", ja: "三つの主たる理由から", note: "序論の最後で論点数を予告する定番フレーズ" },
            { en: "rarely take root", ja: "めったに根付かない", note: "制度や習慣が定着しない、と言いたい時に便利" },
            { en: "is perceived as ~", ja: "〜と受け取られる/見なされる", note: "印象・評価を客観的に述べる受け身の型" },
            { en: "would yield far greater benefits than ~", ja: "〜よりはるかに大きな利益を生むだろう", note: "比較して優位性を主張する万能の言い回し" },
            { en: "For these reasons, ~ should refrain from ~", ja: "これらの理由から〜は〜を控えるべきだ", note: "結論で反対の立場を上品に締める型" }
        ],
        tip: "外部からの押し付けは「根付かない・反発される・無駄」の3点で攻めると、どんな『他国に介入すべきか』系の論題に流用できる。rarely take root と is perceived as は反対論の万能パーツ。",
    },
    {
        day: 26, exam: 'Economy', focus: '実戦',
        topic: "Are free trade agreements the best path to economic growth?",
        topicJa: "自由貿易協定は経済成長への最良の道か",
        stance: "No. Free trade agreements are valuable but not the single best way; domestic investment in innovation and education matters more.",
        essay: "Free trade agreements have long been praised as engines of prosperity. While they certainly bring advantages, I do not believe they are the best way to promote economic growth, for the following reasons.\n\nFirst, sustainable growth depends primarily on domestic innovation rather than external trade deals. A nation that invests in research and advanced technology can create high-value industries that endure. For instance, countries such as South Korea achieved remarkable development mainly through state-led investment in technology, demonstrating that internal capacity drives lasting prosperity.\n\nSecond, free trade agreements often harm vulnerable domestic sectors. When markets are opened abruptly, local farmers and small manufacturers may be unable to compete with cheaper imports. Consequently, certain industries collapse, causing unemployment and widening inequality, which undermines the very growth such agreements promise.\n\nFinally, education is a more fundamental driver of economic advancement. A skilled and adaptable workforce enables a country to seize new opportunities regardless of trade conditions. Therefore, investing in human capital yields broader and more resilient benefits than relying chiefly on tariff reductions.\n\nIn conclusion, although free trade agreements can contribute to economic growth, they are not the most effective path. Innovation, protection of domestic industries, and education form a more reliable foundation for lasting prosperity.",
        essayJa: "自由貿易協定は長らく繁栄の原動力として称賛されてきた。確かに利点はあるが、私はそれが経済成長を促す最良の方法だとは思わない。以下の理由による。\n\n第一に、持続可能な成長は、外部の貿易協定よりもまず国内のイノベーションに依存する。研究や先端技術に投資する国は、長く続く高付加価値産業を生み出せる。例えば韓国などの国は、主に国主導の技術投資によって目覚ましい発展を遂げ、内部の能力こそが持続的な繁栄を牽引することを示した。\n\n第二に、自由貿易協定はしばしば脆弱な国内部門を損なう。市場が急に開放されると、地元の農家や中小製造業はより安い輸入品に太刀打ちできないことがある。その結果、一部の産業が崩壊し、失業と格差拡大を招き、協定が約束するはずの成長そのものを損なう。\n\n最後に、教育は経済発展のより根本的な原動力だ。熟練し適応力のある労働力があれば、貿易条件に関わらず新たな機会をつかめる。したがって、人的資本への投資は、関税引き下げに主に頼るよりも幅広く強靭な利益を生む。\n\n結論として、自由貿易協定は経済成長に寄与しうるが、最も効果的な道ではない。イノベーション、国内産業の保護、そして教育こそが、持続的な繁栄のより確かな土台となる。",
        wordCount: 211,
        keyExpressions: [
            { en: "have long been praised as ~", ja: "長らく〜として称賛されてきた", note: "一般論の前提を提示する重厚な書き出し" },
            { en: "depends primarily on ~ rather than ~", ja: "〜よりもまず…に依存する", note: "優先順位を示して論点を立てる比較の型" },
            { en: "undermines the very ~ such ... promise", ja: "…が約束するはずの〜そのものを損なう", note: "相手の主張を逆手に取る皮肉の効いた反論" },
            { en: "is a more fundamental driver of ~", ja: "〜のより根本的な原動力だ", note: "本質的な要因を強調する論点導入" },
            { en: "yields broader and more resilient benefits than ~", ja: "〜より幅広く強靭な利益を生む", note: "代替案の優位を訴える比較表現" },
            { en: "form a more reliable foundation for ~", ja: "〜のより確かな土台となる", note: "結論で複数要素をまとめて締める言い回し" }
        ],
        tip: "「Xは良いがbestではない」型は、代わりの本命(ここではinnovation/education)を3つ立てて殴れば勝てる。depends primarily on A rather than B は優先順位を語る論題すべてに効く。",
    },
    {
        day: 27, exam: 'International', focus: '実戦',
        topic: "Should rich nations give more in foreign aid?",
        topicJa: "豊かな国はもっと対外援助をすべきか",
        stance: "Yes. Japan should increase foreign aid because it strengthens diplomacy, addresses global problems, and benefits Japan's own economy.",
        essay: "As global challenges grow more interconnected, the question of foreign aid has gained renewed importance. I firmly believe that the Japanese government should provide more money as aid to foreign countries, for three compelling reasons.\n\nFirst, generous aid strengthens Japan's diplomatic standing. By assisting developing nations, Japan cultivates goodwill and reliable international partners. For instance, Japan's longstanding infrastructure support across Southeast Asia has earned considerable trust, demonstrating that aid translates directly into lasting diplomatic influence.\n\nSecond, increased aid helps address global problems that ultimately affect Japan itself. Issues such as poverty, pandemics, and climate change recognize no borders. Therefore, by funding clean water, healthcare, and disaster relief abroad, Japan contributes to a more stable world from which it also benefits.\n\nFinally, foreign aid can stimulate Japan's own economy. Aid projects frequently involve Japanese companies and technology, creating business opportunities overseas. Consequently, well-designed assistance functions not merely as charity but as a strategic investment that yields long-term economic returns.\n\nIn conclusion, although critics may cite domestic budget constraints, the advantages of expanded foreign aid are undeniable. Because it enhances diplomacy, tackles shared global threats, and supports the domestic economy, Japan should certainly increase its financial aid to other nations.",
        essayJa: "世界の課題がますます相互に結びつく中、対外援助の問題は改めて重要性を増している。私は、日本政府が外国への援助をもっと増やすべきだと固く信じている。説得力のある三つの理由による。\n\n第一に、手厚い援助は日本の外交的地位を強める。途上国を支援することで、日本は善意と信頼できる国際的パートナーを育む。例えば、東南アジア全域での日本の長年にわたるインフラ支援は大きな信頼を獲得しており、援助が持続的な外交的影響力に直結することを示している。\n\n第二に、援助の増加は最終的に日本自身にも影響する地球規模の問題への対処を助ける。貧困、感染症、気候変動といった問題に国境はない。したがって、海外での清潔な水・医療・災害救援に資金を出すことで、日本は自らも恩恵を受ける、より安定した世界に貢献する。\n\n最後に、対外援助は日本自身の経済を刺激しうる。援助事業にはしばしば日本企業や技術が関わり、海外でのビジネス機会を生む。その結果、よく設計された支援は単なる慈善ではなく、長期的な経済的見返りを生む戦略的投資として機能する。\n\n結論として、批判する者は国内予算の制約を挙げるかもしれないが、対外援助拡大の利点は紛れもない。外交を強化し、共有された地球規模の脅威に取り組み、国内経済を支えるのだから、日本は他国への資金援助を確かに増やすべきだ。",
        wordCount: 207,
        keyExpressions: [
            { en: "for three compelling reasons", ja: "説得力のある三つの理由から", note: "for three principal reasons の言い換え。手札を増やそう" },
            { en: "translates directly into ~", ja: "〜に直結する/そのまま転じる", note: "因果を力強く示す動詞表現" },
            { en: "recognize no borders", ja: "国境を知らない/国境に関係ない", note: "地球規模の問題を語る決め台詞" },
            { en: "functions not merely as ~ but as ~", ja: "単なる〜ではなく…として機能する", note: "対象の意味を格上げする not merely A but B の型" },
            { en: "although critics may cite ~, the advantages of ~ are undeniable", ja: "批判は〜を挙げるかもしれないが、利点は紛れもない", note: "結論で反論を一蹴する譲歩+断言の型" }
        ],
        tip: "賛成側は「相手(自国)にもメリットがある」と落とすと一気に説得力が出る。recognize no borders と translates directly into は地球規模・因果系の論題で何度でも使える即戦力。",
    },
    {
        day: 28, exam: 'Environment & Energy', focus: '頻出テーマ',
        topic: "Should governments do more to fight climate change?",
        topicJa: "政府は気候変動との闘いにもっと取り組むべきか",
        stance: "Yes. Governments must do more because climate change threatens survival, only governments can coordinate at scale, and early action is cheaper.",
        essay: "Climate change has become one of the gravest threats of our era. I strongly believe that governments should do far more to combat it, for the following three reasons.\n\nFirst, climate change endangers human survival itself. Rising temperatures exacerbate droughts, floods, and extreme weather that devastate communities. For instance, recent record heatwaves across Europe caused thousands of deaths, demonstrating that inaction carries an unacceptable human cost.\n\nSecond, only governments possess the authority and resources to act on a sufficient scale. Combating climate change requires sweeping regulation, large-scale investment in renewable energy, and international cooperation that individuals and companies cannot achieve alone. Therefore, decisive government leadership is indispensable to coordinate such efforts effectively.\n\nFinally, early action is far more economical than delay. Although measures to mitigate these adverse effects appear costly now, the expense of repairing future damage from disasters and rising sea levels will be vastly greater. As a result, investing in prevention today represents a prudent and responsible financial choice.\n\nIn conclusion, while some worry about short-term economic burdens, the case for stronger climate action is overwhelming. Because the survival of humanity, the unique capacity of governments, and long-term economic logic all demand it, governments should unquestionably do more to combat climate change.",
        essayJa: "気候変動は現代における最も深刻な脅威の一つとなった。私は、政府がその対策をはるかに強化すべきだと強く信じている。以下の三つの理由による。\n\n第一に、気候変動は人類の生存そのものを脅かす。気温上昇は干ばつ、洪水、地域社会を破壊する異常気象を激化させる。例えば、近年ヨーロッパ各地で起きた記録的熱波は何千人もの死者を出し、無策が許容しがたい人的代償を伴うことを示した。\n\n第二に、十分な規模で行動できる権限と資源を持つのは政府だけだ。気候変動対策には、大規模な規制、再生可能エネルギーへの巨額投資、そして個人や企業だけでは実現できない国際協力が必要だ。したがって、こうした取り組みを効果的に調整するには、政府の断固たる指導が不可欠だ。\n\n最後に、早期の行動は先延ばしよりはるかに経済的だ。環境対策は今は高くつくように見えるが、将来の災害や海面上昇による被害を修復する費用ははるかに大きくなる。その結果、今日予防に投資することは、賢明で責任ある財政的選択となる。\n\n結論として、短期的な経済負担を懸念する声もあるが、より強力な気候対策を支持する根拠は圧倒的だ。人類の生存、政府にしかない能力、そして長期的な経済合理性のすべてがそれを求めるのだから、政府は気候変動対策を間違いなくもっと強化すべきだ。",
        wordCount: 203,
        keyExpressions: [
            { en: "has become one of the gravest threats of our era", ja: "現代における最も深刻な脅威の一つとなった", note: "問題の重大さを格調高く打ち出す書き出し" },
            { en: "carries an unacceptable ~ cost", ja: "許容しがたい〜の代償を伴う", note: "放置の危険性を強調する決め台詞" },
            { en: "only ~ possess the authority and resources to ~", ja: "〜だけが…する権限と資源を持つ", note: "主体の唯一性を主張する力強い型" },
            { en: "is indispensable to ~", ja: "〜には不可欠だ", note: "必要性を断言する上級語彙" },
            { en: "the case for ~ is overwhelming", ja: "〜を支持する根拠は圧倒的だ", note: "結論で自説の優位を宣言する締め" }
        ],
        tip: "「政府はもっと〜すべきか」系は『被害の深刻さ・政府にしかできない・先送りは高くつく』の3点セットが鉄板。is indispensable to と the case for ~ is overwhelming は他の賛成論にも丸ごと使える。",
    },
    {
        day: 29, exam: 'Science & Technology', focus: '頻出テーマ',
        topic: "Will artificial intelligence benefit society in the long run?",
        topicJa: "人工知能は長期的に社会の役に立つか",
        stance: "Yes. AI will have a positive impact by boosting productivity, advancing healthcare, and expanding access to education.",
        essay: "Artificial intelligence is arguably transforming every aspect of modern life, with profound implications for the future. Despite widespread anxieties, I firmly believe that AI will ultimately have a positive impact on society, for three key reasons.\n\nFirst, AI dramatically enhances productivity. By automating repetitive tasks, it frees workers to concentrate on creative and strategic activities. For instance, many companies now use AI to handle routine data processing, allowing employees to devote their time to higher-value work and thereby boosting overall efficiency.\n\nSecond, AI is revolutionizing healthcare. Advanced algorithms can detect diseases such as cancer at early stages with remarkable accuracy, often surpassing human specialists. Consequently, AI enables earlier treatment and saves countless lives, contributing significantly to public welfare.\n\nFinally, AI broadens access to education. Intelligent tutoring systems can tailor lessons to each learner's pace and needs, regardless of location or income. Therefore, students in remote or disadvantaged areas can receive personalized instruction that was once available only to a privileged few.\n\nIn conclusion, while it is true that AI poses certain risks, its benefits far outweigh its dangers. Because it raises productivity, advances medicine, and democratizes learning, artificial intelligence will undoubtedly have a positive impact on society.",
        essayJa: "人工知能は現代生活のほぼあらゆる側面を変えつつある。広く不安が存在するにもかかわらず、私はAIが最終的に社会に良い影響を与えると固く信じている。三つの主要な理由による。\n\n第一に、AIは生産性を飛躍的に高める。反復作業を自動化することで、労働者を創造的・戦略的な活動に集中させる。例えば、多くの企業は今や定型的なデータ処理にAIを使い、従業員がより価値の高い仕事に時間を割けるようにし、それによって全体の効率を高めている。\n\n第二に、AIは医療に革命をもたらしている。高度なアルゴリズムは、がんなどの病気を早期に驚くべき精度で、しばしば人間の専門家を上回って発見できる。その結果、AIはより早い治療を可能にし、無数の命を救い、公共の福祉に大きく貢献する。\n\n最後に、AIは教育へのアクセスを広げる。知的な個別指導システムは、場所や収入に関わらず、各学習者のペースとニーズに合わせて授業を調整できる。したがって、遠隔地や恵まれない地域の生徒も、かつては一部の特権層にしか得られなかった個別指導を受けられる。\n\n結論として、AIが一定のリスクをもたらすのは事実だが、その利点は危険をはるかに上回る。生産性を高め、医療を進歩させ、学びを民主化するのだから、人工知能は間違いなく社会に良い影響を与えるだろう。",
        wordCount: 201,
        keyExpressions: [
            { en: "Despite widespread anxieties, I firmly believe that ~", ja: "広く不安があるにもかかわらず、私は〜と固く信じる", note: "反対論を一蹴して立場を示す書き出し" },
            { en: "frees ~ to concentrate on ~", ja: "〜を…に集中できるようにする", note: "効率化・解放のメリットを語る動詞表現" },
            { en: "contributing significantly to ~", ja: "〜に大きく貢献する", note: "効果を述べる万能の分詞構文コロケーション" },
            { en: "regardless of ~", ja: "〜に関わらず", note: "条件を超えた普遍性を示す便利な前置詞句" },
            { en: "while it is true that ~, its benefits far outweigh ~", ja: "〜なのは事実だが、利点は…をはるかに上回る", note: "一文で譲歩と反論を畳む結論の必殺型" }
        ],
        tip: "技術系の賛成論は『仕事・医療・教育』の3分野を当てれば具体例に困らない。frees ~ to concentrate on と benefits far outweigh は AI 以外の「新技術は良いか」論題にもそのまま流用できる。",
    },
    {
        day: 30, exam: 'International', focus: '総まとめ',
        topic: "Should wealthy nations do more for the developing world?",
        topicJa: "豊かな国は途上国のためにもっと尽くすべきか",
        stance: "Yes. Developed nations should do more out of moral responsibility, shared global stability, and mutual long-term benefit.",
        essay: "In an increasingly interconnected world, the responsibilities of wealthy nations toward poorer ones are frequently debated. I firmly believe that developed nations should do more to help developing nations, for three compelling reasons.\n\nFirst, developed nations bear a moral responsibility to assist those in need. Much of their prosperity was historically built upon resources and labor drawn from poorer regions. For instance, many former colonial powers grew rich through exploitation, demonstrating that meaningful aid today is not mere generosity but a just repayment of historical debt.\n\nSecond, supporting developing nations promotes global stability, from which everyone benefits. Poverty and inequality often breed conflict, mass migration, and the spread of disease. Therefore, by funding education, healthcare, and infrastructure abroad, developed nations help create a safer and more peaceful world for all.\n\nFinally, such assistance ultimately benefits the donors themselves. As developing economies grow, they become valuable trading partners and expanding markets. Consequently, well-directed aid functions not merely as charity but as a strategic investment that yields substantial long-term returns.\n\nIn conclusion, although some argue that nations should prioritize their own citizens, the advantages of helping developing nations are undeniable. Because moral duty, global stability, and mutual prosperity all demand it, developed nations should certainly do more to support the developing world.",
        essayJa: "ますます相互に結びつく世界において、豊かな国の貧しい国に対する責任はしばしば議論される。私は、先進国が途上国をもっと支援すべきだと固く信じている。説得力のある三つの理由による。\n\n第一に、先進国には困っている者を助ける道徳的責任がある。その繁栄の多くは、歴史的に貧しい地域から引き出した資源と労働の上に築かれた。例えば、多くの旧植民地大国は搾取によって富を得ており、今日の意味ある援助が単なる寛大さではなく、歴史的負債の正当な返済であることを示している。\n\n第二に、途上国の支援は地球規模の安定を促し、それは誰にとっても恩恵となる。貧困と格差はしばしば紛争、大量移民、病気の蔓延を生む。したがって、海外の教育・医療・インフラに資金を出すことで、先進国はすべての人にとってより安全で平和な世界を築く手助けをする。\n\n最後に、こうした支援は最終的に援助国自身にも利益をもたらす。途上国経済が成長すれば、貴重な貿易相手や拡大する市場となる。その結果、的を絞った援助は単なる慈善ではなく、長期的に大きな見返りを生む戦略的投資として機能する。\n\n結論として、自国民を優先すべきだと主張する者もいるが、途上国を助ける利点は紛れもない。道徳的義務、地球規模の安定、そして相互の繁栄のすべてがそれを求めるのだから、先進国は確かに途上国世界をもっと支援すべきだ。",
        wordCount: 211,
        keyExpressions: [
            { en: "In an increasingly interconnected world, ~", ja: "ますます相互に結びつく世界において〜", note: "グローバル系論題に万能の格調高い書き出し" },
            { en: "bear a moral responsibility to ~", ja: "〜する道徳的責任がある", note: "倫理を根拠にする時の重厚な決まり文句" },
            { en: "is not mere ~ but a just ~", ja: "単なる〜ではなく、正当な…だ", note: "行為の意味を格上げする not A but B の型" },
            { en: "promotes ~, from which everyone benefits", ja: "〜を促し、それは皆の利益となる", note: "メリットの波及を一文で示す関係詞の型" },
            { en: "although some argue that ~, the advantages of ~ are undeniable", ja: "〜と主張する者もいるが、利点は紛れもない", note: "結論で反論を譲歩しつつ断ち切る最強の締め" },
            { en: "all demand it", ja: "そのすべてがそれを求める", note: "3つの論点を一気に束ねて結論に雪崩れ込む技" }
        ],
        tip: "これが総まとめ。序論=言い換え+for three compelling reasons、各body=理由+説明+For instance、結論=although ... undeniable+三点束ねるall demand it、の型を丸ごと暗記すればどの論題でも書ける。賛成側は最後に「相手にもメリット」で落とすのが鉄板。",
    },
];

export function getEssayForDay(day: number): EikenEssayDay | null {
    return EIKEN1_ESSAYS.find(e => e.day === day) || null;
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
