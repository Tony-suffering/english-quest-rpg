// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-sentence-notes.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * 自動生成(merge-sentences.mjs)。1次ライティング全30日の「一文ずつ完全解説」。
 * 各文: 和訳 + 文の骨格(structure) + 完全文法解説(grammar) + 英作ポイント(writing)。
 * 編集は再生成で行うこと(手編集すると次回生成で消える)。全418文。
 */
export interface SentenceNote {
    en: string;        // 模範解答の一文(原文そのまま)
    ja: string;        // 和訳
    structure: string; // 文の骨格(文型・主語動詞・節構造)
    grammar: string;   // 完全文法解説(時制/態/冠詞/可算不可算/関係詞/語法)
    writing: string;   // 英作ポイント(この型を自分のエッセイでどう使うか)
}

export const WRITE_SENTENCE_NOTES: Record<number, SentenceNote[]> = {
  "1": [
    {
      "en": "There is much debate over whether the enormous sums spent on space exploration can be justified.",
      "ja": "宇宙探査に費やされる莫大な金額が正当化できるかについては、大いに議論がある。",
      "structure": "There is 構文。S=much debate、over whether 以下が「何についての議論か」を示す前置詞句。whether節内は S(the enormous sums) + 助動詞受動(can be justified)。",
      "grammar": "① There is much debate over whether 〜 = 序論でお題を中立に言い換える定番構文。debate(議論全般)は不可算なので much が付く(× many debates)。② spent は過去分詞の後置修飾。the sums (that are) spent on 〜 の関係詞+be の省略で「〜に費やされる金額」。spend money on の on がそのまま残る。③ can be justified = 助動詞+受動態「正当化されうる」。正当化する主体をぼかし、お題を客観的な問いとして提示できる。",
      "writing": "序論の1文目はこの There is much debate over whether + [お題の言い換え] がそのまま流用できる。お題の語句をコピペせず、worth its price tag → the enormous sums ... can be justified のように動詞ごと言い換えるのが1級の作法。"
    },
    {
      "en": "While the expense is undeniably vast, I firmly believe that the long-term benefits far outweigh the costs, for three main reasons.",
      "ja": "費用が膨大であることは否定できないが、私は長期的な利益がコストをはるかに上回ると、三つの主な理由から固く信じている。",
      "structure": "While従属節(譲歩)+主節。主節は S(I)+V(believe)+that節(SVO)。that節内は S(the long-term benefits)+V(outweigh)+O(the costs)。文末の for three main reasons は副詞句。",
      "grammar": "① While + 譲歩 = 反対側(費用の大きさ)を一度認めてから主節で自分の主張へ。両論併記(減点)を避けつつ視野の広さを示す序論の鉄板。Although でも代用可。② undeniably = 文修飾に近い強意副詞。形容詞 vast の前に置き「紛れもなく莫大」と譲歩自体を強めることで、それでも上回るという主張が際立つ。③ the expense = 「この件の費用」と文脈で特定されるので the。expense は「費用」一般では不可算。④ I firmly believe that 〜 = 立場を強く明言するテーゼの定番。firmly が believe を修飾。⑤ far outweigh = 比較動詞 outweigh(〜を上回る)を far で強調。「はるかに」。much / significantly も同役。⑥ the long-term benefits / the costs = どちらも「この件の」利益とコストで the。long-term はハイフンで2語を1形容詞にした複合形容詞(名詞前の限定用法)。⑦ for three main reasons = 序論末で本論3段落を予告する型。reason は可算なので複数。",
      "writing": "序論2文目のテンプレ: While + [譲歩], I firmly believe that + [自分の主張], for three main reasons. この一文で「譲歩→立場明言→3理由予告」が全部済む。天秤フレーズ the benefits far outweigh the costs は賛成側なら丸ごと流用できる。"
    },
    {
      "en": "First, space exploration plays a crucial role in driving technological innovation.",
      "ja": "第一に、宇宙探査は技術革新を推進するうえで重要な役割を果たす。",
      "structure": "SVO。S=space exploration、V=plays、O=a crucial role。in driving 〜 は role を受ける前置詞句。文頭 First は列挙の接続副詞。",
      "grammar": "① First, = 本論1の開始合図。First / Second / Finally で3本柱を明示するのが採点者に優しい構成。② plays に三単現の -s。主語 space exploration は不可算名詞句で単数扱い。③ play a crucial role in -ing = 重要性を述べる万能コロケーション。role は可算で a が必須。crucial は important の格上げ語。④ in driving = 前置詞 in + 動名詞。「〜を推進する点で」。role in (doing) の形で in を落とさない。⑤ technological innovation = 概念としての「革新」は不可算→無冠詞。",
      "writing": "本論のトピックセンテンスは First, [主題] plays a crucial role in -ing がそのまま型。important と言いたくなったら crucial / pivotal / vital に格上げする。理由3本は必ず First / Second / Finally で頭出しする。"
    },
    {
      "en": "The challenges of operating in space force scientists to develop solutions that later transform everyday life.",
      "ja": "宇宙で活動する困難さは、科学者にのちに日常生活を一変させる解決策の開発を迫る。",
      "structure": "SVOC系の使役構文。S=The challenges of operating in space、V=force、O=scientists、C=to develop 〜。that later transform everyday life は solutions を先行詞とする主格の関係代名詞節。",
      "grammar": "① The challenges = of句(of operating in space)で「どの困難か」が特定されるので the。challenge は可算で複数化。② of operating = 前置詞 of + 動名詞「宇宙で活動することの」。③ force O to do = 「Oに〜するのを強いる」。force + 人 + to不定詞の使役構文。make が原形を取るのに対し force は to を取る。主語 challenges が複数なので force に -s なし。④ scientists = 無冠詞複数の総称用法「科学者というもの全般」。⑤ that later transform 〜 = 主格の関係代名詞。先行詞 solutions(複数)に一致して transform は原形形。later は「のちに」の副詞。⑥ everyday life = 一語の everyday は形容詞「日常の」。二語の every day(毎日)と混同しない。life はここでは不可算・無冠詞。",
      "writing": "「制約が進歩を生む」型の因果は The challenges of -ing force + 人 + to develop 〜 で書ける。無生物主語+force/enable/allow + O + to do は1級らしい引き締まった因果表現としてどのトピックでも使い回せる。"
    },
    {
      "en": "A prime example of this is the satellite navigation we now rely on, which originated from space programs.",
      "ja": "その好例が、今や私たちが頼る衛星ナビゲーションであり、これは宇宙計画から生まれたものだ。",
      "structure": "SVC。S=A prime example of this、V=is、C=the satellite navigation 〜。we now rely on は navigation を修飾する接触節(関係代名詞省略)、which 以下は非制限用法の関係代名詞節で補足。",
      "grammar": "① A prime example of this is 〜 = 具体例導入の型。For example の格上げ版。example は初出・不特定なので a。this は前文の内容(困難が解決策を生むこと)を指す。② the satellite navigation (that) we now rely on = 目的格の関係代名詞の省略(接触節)。後ろの節で「どのナビか」限定されるので the。rely on の on は関係詞で目的語が前に出ても残る — 前置詞を落とすのが最頻出ミス。③ , which originated 〜 = 非制限用法。コンマ+which で「そしてそれは〜」と補足情報を足す。制限用法との違いは「特定に必要か、追加情報か」。④ originated from = 「〜から生まれた」。originate は自動詞なので受動にしない(× was originated)。過去に生まれた事実なので過去形。",
      "writing": "具体例は A prime example of this is + [名詞句] の一発導入が便利。For example, ... と文を立てるより締まる。例に一言背景を足すときは , which ... の非制限用法でぶら下げると1文で済み語数も稼げる。"
    },
    {
      "en": "Second, exploring space is essential for the long-term survival of humanity.",
      "ja": "第二に、宇宙探査は人類の長期的な生存に不可欠だ。",
      "structure": "SVC。S=exploring space(動名詞句)、V=is、C=essential。for以下は essential の対象を示す前置詞句。文頭 Second は列挙の接続副詞。",
      "grammar": "① Second, = 本論2の合図(First の型は既出)。② exploring space = 動名詞句が主語。動名詞主語は単数扱い→ is。本論1では space exploration(名詞)だったのを動名詞に言い換えて反復を回避している。③ essential for 〜 = 「〜に不可欠」。very important の格上げ。for の代わりに to も可。④ the long-term survival of humanity = survival は不可算だが of句で限定され the が付く。humanity(人類)は無冠詞不可算。mankind / humankind も同様。",
      "writing": "トピックセンテンスの第2型: [動名詞句] is essential for 〜。play a crucial role in と交互に使えば3段落の書き出しが単調にならない。名詞(space exploration)⇔動名詞(exploring space)の言い換えは語彙の幅を見せる小技として常備する。"
    },
    {
      "en": "As resources on Earth become increasingly strained, locating new sources of materials and potential habitats becomes vital.",
      "ja": "地球上の資源がますます逼迫するなか、新たな物資源や居住可能地を見つけることが重要になる。",
      "structure": "As従属節(〜するにつれ)+主節。主節の S=locating 〜 habitats(動名詞句)、V=becomes、C=vital。",
      "grammar": "① As 〜 = 「〜するにつれて」の比例・状況の接続詞。背景となる趨勢を先に置き、主節で帰結を述べる。② resources on Earth = 無冠詞複数で「資源全般」。Earth は固有名詞扱いで on Earth(無冠詞)が普通。③ become increasingly strained = become + 形容詞。strained は過去分詞が形容詞化したもの(逼迫した)。increasingly は趨勢を示す論述頻出副詞。④ locating ... becomes = 動名詞句主語は単数扱い→ becomes に -s(前文の動名詞主語と同じ型、2度目なので確認のみ)。⑤ new sources of materials and potential habitats = sources と habitats が and で並列。どちらも初出の不特定複数なので無冠詞。⑥ vital = crucial / essential の言い換え。同義語を回して反復を避けるのが1級の語彙点。",
      "writing": "「状況の変化→必要性」は As + [趨勢の現在形], -ing becomes vital. の型で書ける。趨勢を言う become increasingly + 形容詞 は環境・社会系トピックで毎回使える。crucial → essential → vital と段落ごとに同義語を替えるのを忘れない。"
    },
    {
      "en": "For instance, asteroid mining could one day supply minerals that are growing scarce on our planet.",
      "ja": "たとえば小惑星採掘は、いつか地球上で希少になりつつある鉱物を供給しうる。",
      "structure": "SVO。S=asteroid mining、V=could supply、O=minerals。that以下は minerals を先行詞とする主格の関係代名詞節。one day は副詞句。文頭 For instance は例示の接続副詞。",
      "grammar": "① For instance, = For example の言い換え。同一エッセイ内で例示表現を変えるのも語彙点。② asteroid mining = 活動を表す -ing 名詞は不可算→無冠詞のかたまり。③ could = 「〜しうる」の可能性の could。未来の仮定的な話なので will より控えめな could が適切。断定を避けつつ可能性を示す論述の必須助動詞。one day = 「いつの日か」。④ minerals that are growing scarce = 主格関係代名詞 that。先行詞 minerals(複数)に一致して are。⑤ grow scarce = become の言い換え「希少になっていく」。進行形 are growing で「なりつつある」進行中の変化。⑥ our planet = 「我々の惑星=地球」。Earth の言い換え表現。",
      "writing": "未来の可能性を例に挙げるときは [主語] could one day + 動詞 の型。断言できない未来例は will でなく could でぼかすのが安全。on our planet は Earth の言い換えとしてストックしておく。"
    },
    {
      "en": "Finally, space exploration inspires international cooperation and scientific ambition.",
      "ja": "最後に、宇宙探査は国際協力と科学的野心を刺激する。",
      "structure": "SVO。S=space exploration、V=inspires、O=international cooperation and scientific ambition(2つの名詞句の並列)。文頭 Finally は列挙の締めの接続副詞。",
      "grammar": "① Finally, = 3本目の理由の合図。Third より Finally の方が「最後の柱」感が出る。② inspires = 三単現(主語 space exploration は単数扱い、既出の型)。inspire + 物事 = 「〜を呼び起こす・促す」。人だけでなく抽象名詞も目的語に取れる。③ international cooperation = cooperation は不可算→無冠詞(× a cooperation)。④ scientific ambition = ここでは「向上心」全般で無冠詞・不可算。an ambition なら「一つの具体的野望」と可算化する。",
      "writing": "トピックセンテンス第3型: [主題] inspires / fosters / promotes + [抽象名詞]。目的語を A and B の2本立てにすると段落内でその2つを順に展開でき、構成が立てやすい。"
    },
    {
      "en": "Massive projects require nations to pool their expertise rather than compete.",
      "ja": "巨大プロジェクトは各国に競争ではなく専門知識の結集を求める。",
      "structure": "SVOC系。S=Massive projects、V=require、O=nations、C=to pool their expertise。rather than compete は to pool との対比の並列。",
      "grammar": "① require O to do = 「Oに〜することを求める」。force と同じく to不定詞を取る使役系(force の型は既出)。主語が複数なので require は原形形。② nations = 無冠詞複数の総称「国々一般」。③ pool = 名詞「プール(溜め)」から転じた動詞「(資源・知恵を)出し合う」。pool their expertise が定番コロケーション。④ expertise = 不可算(× an expertise / × expertises)。⑤ rather than compete = to pool ... rather than (to) compete の並列。rather than の後は原形または動名詞。「BではなくA」と対比で主張を鮮明にする。",
      "writing": "A rather than B は対比を1語ずつで作れる強力な型。結論文でも welcome immigrants rather than turn them away のように使える。require / force / enable + O + to do の無生物主語構文は本論の説明文の主力。"
    },
    {
      "en": "The International Space Station demonstrates how former rivals can collaborate productively toward a shared goal.",
      "ja": "国際宇宙ステーションは、かつての敵対国でも共通の目標へ向け生産的に協力できることを示している。",
      "structure": "SVO。S=The International Space Station、V=demonstrates、O=how節(間接疑問)。how節内は S(former rivals)+V(can collaborate)。",
      "grammar": "① The International Space Station = 固有名詞だが唯一の特定物なので the。② demonstrates = 三単現。demonstrate how 〜 = how節(間接疑問)を目的語に取り「いかに〜かを示す」。節内は平叙文の語順(how rivals can collaborate)で、疑問文の倒置にしない。③ former rivals = former は「かつての」。the former / the latter(前者/後者)とは別用法。rivals は無冠詞複数の総称。④ collaborate = 自動詞。collaborate with(人)/ on(事)/ toward(目標)。productively が動詞を修飾。⑤ a shared goal = shared は過去分詞の形容詞化「共有された=共通の」。初出・不特定なので a。",
      "writing": "具体例の締めは [固有名詞の実例] demonstrates how 〜 の型。例を挙げっぱなしにせず「その例が何を証明するか」を demonstrate / illustrate / show で言語化すると本論が完結する。"
    },
    {
      "en": "In conclusion, although the financial burden of space exploration is considerable, the benefits far outweigh the drawbacks.",
      "ja": "結論として、宇宙探査の財政的負担は相当なものだが、利点が欠点をはるかに上回る。",
      "structure": "In conclusion(接続句)+although譲歩節+主節。主節は S(the benefits)+V(outweigh)+O(the drawbacks)。",
      "grammar": "① In conclusion, = 結論段落を切り出す決まり文句(無冠詞)。② although 〜 = 序論の While と同じ譲歩を結論でもう一度。同じ接続詞を避けて While → although と替えているのも言い換えの作法。③ the financial burden of 〜 = of句で特定されるので the。burden は可算(a burden とも使う)。④ considerable = large の格上げ「相当な」。⑤ far outweigh は序論の再演(既出)。ただし目的語を costs → drawbacks に言い換えて反復を回避。benefits outweigh the drawbacks は結論の鉄板。",
      "writing": "結論1文目のテンプレ: In conclusion, although + [譲歩の再掲], the benefits far outweigh the drawbacks. 序論と同じ内容を「単語を替えて」繰り返すのがポイント。expense→financial burden、vast→considerable、costs→drawbacks の対応関係ごと覚える。"
    },
    {
      "en": "The technological advances, the prospects for human survival, and the fostering of global cooperation all confirm that this investment is thoroughly worthwhile.",
      "ja": "技術的進歩、人類生存の見込み、そして世界的協力の促進はいずれも、この投資が十分に価値あるものであることを裏づけている。",
      "structure": "SVO。S=3つの名詞句の並列(advances / prospects / fostering)+同格の all、V=confirm、O=that節(SVC)。",
      "grammar": "① 3つの名詞句 = 本論3段落の要約をそれぞれ名詞化して並列。the technological advances(本論1)、the prospects for human survival(本論2)、the fostering of global cooperation(本論3)。すべて既出内容の再言及なので the。② the fostering of 〜 = 「the+動名詞+of」で動詞を重厚な名詞句にする型。論述で「〜すること」を格調高く言える。③ advances = advance(進歩)は複数形で「(諸分野の)進歩」。prospects for = 「〜の見通し」。④ all confirm = 並列主語(複数)+同格の all「いずれも」。複数扱いなので confirm に -s なし。⑤ that節内: this investment = 指示語 this で「本エッセイで論じた投資」と特定。investment は行為としては不可算。⑥ thoroughly worthwhile = worthwhile(worth+while が語源、時間・金に見合う)を thoroughly で強めて断定的に締める。",
      "writing": "最終文の型: [名詞化した理由1], [理由2], and [理由3] all confirm that + [立場の再宣言]. 3理由を名詞句に圧縮して1文に束ねるのが結論の腕の見せどころ。動詞を名詞化する the -ing of 〜 はその圧縮の道具としてそのまま使える。"
    }
  ],
  "2": [
    {
      "en": "It is often argued that humanity can eventually attain complete and lasting world peace.",
      "ja": "人類はいつか完全で永続的な世界平和を達成できるとしばしば論じられる。",
      "structure": "形式主語構文。It=形式主語、真主語は that節。It is argued の受動態に often が挿入。that節内は S(humanity)+V(can attain)+O(world peace)。",
      "grammar": "① It is often argued that 〜 = 形式主語+受動態で「〜としばしば論じられる」。誰が論じるかをぼかし、お題を世間の声として中立に提示する序論の鉄板。It is said / believed / claimed that も同族。② humanity = 人類全体は無冠詞不可算。③ can eventually attain = attain は achieve の格上げ「(努力の末に)達成する」。eventually(いつかは)が助動詞と本動詞の間に入る副詞の定位置。④ complete and lasting = 形容詞2つの並列で world peace を修飾。lasting は last(続く)の現在分詞が形容詞化「永続的な」。⑤ world peace = peace は不可算→無冠詞。",
      "writing": "序論1文目の第2型: It is often argued that + [お題の言い換え]. Day1 の There is much debate over whether と並ぶ2大出だし。反対する予定のお題ほど、まず It is often argued that で相手の主張として立てておくと後の反論が映える。"
    },
    {
      "en": "While this is an admirable aspiration, I must disagree with the notion that such a goal is realistically achievable, and I will offer three reasons to support my view.",
      "ja": "これは称賛に値する願望だが、私はそのような目標が現実的に達成可能だという考えには反対せざるをえず、自説を支える三つの理由を示す。",
      "structure": "While譲歩節 + 主節2つの and 並列。主節1は S(I)+V(disagree with)+O(the notion)+同格that節。主節2は S(I)+V(will offer)+O(three reasons)+to不定詞(形容詞的用法)。",
      "grammar": "① While + 譲歩 = 序論の譲歩→主張(Day1と同型)。this は前文のお題を受ける。an admirable aspiration = 「称賛に値する願望」。相手を持ち上げてから斬るのが上品な反対の作法。aspiration は可算で a。② I must disagree with 〜 = must で「反対せざるをえない」。単なる I disagree より「不本意ながらも論理的にそうなる」響きが出る。disagree with は前置詞 with とセット。③ the notion that 〜 = 同格の that。「〜という考え」。notion の中身を that節で言い直す。関係代名詞ではないので節内は完全文。④ such a goal = such + a + 名詞 の語順(× a such goal)。⑤ realistically achievable = 副詞+形容詞。achievable = achieve + -able「達成可能な」。⑥ I will offer three reasons to support my view = 3理由の予告(Day1の for three main reasons の文型版)。to support は reasons を修飾する形容詞的用法の不定詞。",
      "writing": "反対側に立つときの序論テンプレ: While this is an admirable aspiration, I must disagree with the notion that 〜, and I will offer three reasons to support my view. 同格の that節は「〜という考え/主張/見方」を作る必須装備で、the notion / the idea / the view that として使い回せる。"
    },
    {
      "en": "First, competition over limited resources makes conflict almost inevitable.",
      "ja": "第一に、限られた資源をめぐる競争が紛争をほぼ不可避にする。",
      "structure": "SVOC。S=competition over limited resources、V=makes、O=conflict、C=almost inevitable。",
      "grammar": "① First, = 本論1の合図(既出)。② competition over 〜 = 「〜をめぐる競争」。competition は不可算→無冠詞。over は「〜を争点として」の前置詞。③ makes O C = 第5文型「OをCにする」。make conflict inevitable = 紛争を不可避にする。force / require の to不定詞型と違い make + O + 形容詞 は補語が直接続く。主語 competition(単数扱い)なので makes。④ conflict = 「紛争」一般は不可算→無冠詞。a conflict なら個別の紛争。⑤ almost inevitable = almost が形容詞を修飾「ほぼ不可避」。断定を1段階緩めつつ強い主張をする論述の定番。limited resources = 過去分詞の形容詞化+無冠詞複数の総称。",
      "writing": "make + O + 形容詞 はトピックセンテンスを1行で作る強力な型: [原因] makes [結果] almost inevitable / impossible / essential. 断定を避けたいときの almost / virtually / all but + 形容詞 もセットで常備。"
    },
    {
      "en": "As populations grow, nations inevitably clash over water, energy, and land.",
      "ja": "人口が増えるにつれ、各国は水・エネルギー・土地をめぐって必然的に衝突する。",
      "structure": "As従属節(比例)+主節。主節は S(nations)+V(clash)+over以下の前置詞句。water, energy, and land は3名詞の並列。",
      "grammar": "① As 〜 grow = 「〜が増えるにつれ」の比例の as(Day1既出の型)。populations が複数なのは「各国・各地域の人口」を束ねて見ているため。② nations = 無冠詞複数の総称(既出)。③ inevitably = 前文の形容詞 inevitable を副詞で再演し、段落内で主張を一貫させる。動詞 clash を修飾。④ clash over 〜 = 「〜をめぐって衝突する」。自動詞+over(争点)。前文の competition over と同じ over で統一感を出す。⑤ water, energy, and land = いずれも資源としては不可算→無冠詞。A, B, and C の3並列は最後の and の前にコンマ(オックスフォードコンマ)。",
      "writing": "理由の敷衍(説明)文は As + [趨勢], [主語] + [必然の帰結] の型。名詞 inevitable→副詞 inevitably のように品詞を替えて同じ概念を繰り返すと、しつこくならずに論旨を強化できる。"
    },
    {
      "en": "For instance, disputes over river access in arid regions continue to provoke tension between neighboring states.",
      "ja": "たとえば乾燥地域の河川利用をめぐる争いは、隣接国家間の緊張を引き起こし続けている。",
      "structure": "SVO。S=disputes over river access in arid regions、V=continue、O=to provoke 〜(不定詞)。to provoke の目的語が tension。",
      "grammar": "① For instance, = 例示(既出)。② disputes over 〜 = 「〜をめぐる争い」。dispute は可算で複数。over の争点用法が3文連続で登場、段落の鍵前置詞。③ river access = 名詞+名詞の複合「河川へのアクセス」。access は不可算。arid regions = 無冠詞複数「乾燥地域(一般)」。④ continue to do = 「〜し続ける」。現在も進行中の問題であることを現在形+continue で示す。主語 disputes(複数)なので continue に -s なし。⑤ provoke tension = 「緊張を引き起こす」。tension は「緊張状態」で不可算→無冠詞。cause の格上げ語として provoke / generate / fuel を持っておく。⑥ neighboring states = 現在分詞の形容詞化「隣接する」。state = country の言い換え。",
      "writing": "時事の実例を挙げる型: For instance, disputes over + [争点] continue to provoke tension between 〜. 固有名詞を出さなくても「乾燥地域の河川」程度の一般化した実例で1級は通る。cause と言いたくなったら provoke に替える。"
    },
    {
      "en": "Second, deep-rooted ideological and religious differences are extremely difficult to reconcile.",
      "ja": "第二に、根深いイデオロギーや宗教の違いは和解が極めて難しい。",
      "structure": "SVC。S=deep-rooted ideological and religious differences、V=are、C=extremely difficult to reconcile。tough構文(difficult + to不定詞)。",
      "grammar": "① Second, = 本論2の合図(既出)。② deep-rooted = ハイフン付き複合形容詞「根深い」(Day1 long-term と同型)。③ ideological and religious differences = 形容詞2つが differences を共有する並列。difference は可算で複数。無冠詞複数の総称。④ difficult to reconcile = tough構文。文の主語 differences が意味上は reconcile の目的語(× difficult to reconcile them)。It is difficult to reconcile the differences を主語に繰り上げた形。⑤ extremely = very の格上げ強意副詞。⑥ reconcile = 「和解させる・調停する」。reconcile A with B の語法も持つ1級語彙。",
      "writing": "be difficult / hard / impossible to + 他動詞 の tough構文は「〜しがたい」を簡潔に言う型。主語を目的語扱いにするので to reconcile の後に目的語を置かないこと。トピックセンテンスで X is extremely difficult to reconcile / reverse / eliminate と使い回せる。"
    },
    {
      "en": "People are often unwilling to compromise on their core beliefs.",
      "ja": "人々はしばしば自らの核となる信念で妥協しようとしない。",
      "structure": "SVC。S=People、V=are、C=unwilling to compromise 〜。on their core beliefs は compromise に掛かる前置詞句。",
      "grammar": "① People = 無冠詞で「人々一般」。総称用法(既出の型)。② be unwilling to do = 「〜する気がない」。won't compromise より客観的で論述向き。反意語 be willing to とセットで覚える。often は be動詞の後が定位置。③ compromise on 〜 = 「〜の点で妥協する」。自動詞用法で争点は on で示す。④ their core beliefs = core が形容詞的に「核となる」。belief は可算で複数。their は People を受ける。",
      "writing": "人間の性質を理由に使うときの型: People are often unwilling to + [動詞]. 「人はそう簡単に変わらない」系の論拠は世界平和・環境・健康などあらゆる反対論で流用が利く。"
    },
    {
      "en": "The persistence of long-standing sectarian conflicts in various parts of the world clearly illustrates this stubborn reality.",
      "ja": "世界各地で長年続く宗派対立の根強さが、この頑なな現実をはっきり示している。",
      "structure": "SVO。S=The persistence of 〜 the world(長い名詞句)、V=illustrates、O=this stubborn reality。clearly は動詞修飾の副詞。",
      "grammar": "① The persistence of 〜 = 抽象名詞を主語に立てる無生物主語構文。of句で特定されるので the。persistence(持続・根強さ)は persist の名詞形で不可算。② long-standing = 複合形容詞「長年続く」(既出の型)。sectarian conflicts = 「宗派対立」。ここでは個別の紛争群なので可算・複数。③ in various parts of the world = 「世界各地で」。the world は唯一物の the。④ clearly illustrates = illustrate は「(実例が)示す・物語る」。demonstrate の言い換え(Day1参照)。主語が単数(persistence)なので -s。⑤ this stubborn reality = 前文までの内容(妥協しない人間)を this + 名詞 で受けて要約する結束の技。stubborn(頑固な)を現実に転用した擬人的形容。",
      "writing": "具体例の締め文型: The persistence of + [続いている問題] clearly illustrates this reality. 前文の内容を this + 抽象名詞(this reality / this tendency / this dilemma)で受けるパラフレーズは段落を締めるたびに使える。"
    },
    {
      "en": "Finally, the existence of powerful weapons means that distrust between nations is unlikely to disappear.",
      "ja": "最後に、強力な兵器の存在は、国家間の不信が消えにくいことを意味する。",
      "structure": "SVO。S=the existence of powerful weapons、V=means、O=that節。that節内は S(distrust)+V(is)+C(unlikely to disappear)。",
      "grammar": "① Finally, = 本論3の合図(既出)。② the existence of 〜 = 「〜の存在」。of句で特定→the。exist の名詞化で、無生物主語構文の主語を作る道具。③ means that 〜 = 「〜ということを意味する」。A means that B で因果を淡々とつなぐ論述動詞。三単現 -s。④ distrust between nations = distrust(不信)は不可算→無冠詞。between で二者間・相互の関係を示す。⑤ be unlikely to do = 「〜しそうにない」。It is unlikely that より主語を立てた形が引き締まる。反対は be likely to。will not disappear と断言せず確率で語るのが論述の品。",
      "writing": "The existence of X means that Y の型は「Xがある限りYだ」の因果を1文で作れる。予測は will / won't で断言せず be likely / unlikely to で書く癖をつけると1級答案の外れがなくなる。"
    },
    {
      "en": "As long as countries maintain large arsenals, mutual suspicion will remain.",
      "ja": "各国が大規模な兵器を保有する限り、相互不信は残る。",
      "structure": "As long as 条件節+主節。主節は S(mutual suspicion)+V(will remain)。",
      "grammar": "① As long as 〜 = 「〜する限り」の条件の接続詞。単なる if より「その条件が続く間はずっと」の継続ニュアンス。条件節内は未来のことでも現在形(maintain)。② countries = nations の言い換え(無冠詞複数の総称)。同じ段落での単語の回転。③ maintain large arsenals = maintain =「保持し続ける」。arsenal(兵器庫・兵力)は可算で複数。④ mutual suspicion = suspicion は「疑念」一般で不可算→無冠詞。mutual(相互の)は distrust between nations の言い換え。⑤ will remain = remain は「残る」の自動詞。ここは条件が満たされる帰結なので will で断言してよい。",
      "writing": "As long as + [現在形], [帰結] will 〜 は「条件付きの断言」を作る型。unlikely to でぼかした前文と、条件を付けて言い切るこの文の使い分けがそのまま説得のリズムになる。"
    },
    {
      "en": "The ongoing arms races between rival powers demonstrate how security concerns perpetuate hostility.",
      "ja": "対立する大国間で続く軍拡競争は、安全保障上の懸念がいかに敵意を永続させるかを示している。",
      "structure": "SVO。S=The ongoing arms races between rival powers、V=demonstrate、O=how節(間接疑問)。how節内は S(security concerns)+V(perpetuate)+O(hostility)。",
      "grammar": "① The ongoing arms races = ongoing(進行中の)は現在分詞由来の形容詞。arms race =「軍拡競争」の定番複合名詞(arms は常に複数形)。現実に特定される事象なので the。② rival powers = power は「大国・強国」の意では可算。rival が形容詞的に前置。③ demonstrate how 〜 = Day1既出の型。主語 races(複数)なので -s なし。④ security concerns = concern「懸念」は可算で複数。名詞+名詞の複合(安全保障上の懸念)。⑤ perpetuate = 「永続させる」。1級らしい動詞で、continue の使役版。perpetuate hostility / poverty / inequality と悪循環系の目的語を取る。hostility は不可算→無冠詞。",
      "writing": "実例の締めは demonstrate how + [悪循環のメカニズム] の型(Day1と同じ部品)。perpetuate は「悪いものを続かせる」専用の格上げ動詞として、貧困・差別・対立などのトピックでそのまま使える。"
    },
    {
      "en": "In conclusion, although the dream of global harmony is noble, the competition for resources, irreconcilable beliefs, and persistent military distrust make genuine world peace an unattainable ideal.",
      "ja": "結論として、世界の調和という夢は崇高だが、資源をめぐる競争、和解しがたい信念、そして根強い軍事的不信が、真の世界平和を達成不可能な理想にしている。",
      "structure": "In conclusion+although譲歩節+主節。主節はSVOC: S=3名詞句の並列、V=make、O=genuine world peace、C=an unattainable ideal。",
      "grammar": "① In conclusion, although 〜 = 結論冒頭で譲歩をもう一度(Day1と同じ骨格)。the dream of global harmony = 序論の complete and lasting world peace の言い換え。noble = admirable の言い換え。② 3並列の主語 = 本論3段落の名詞化要約: the competition for resources(本論1)/ irreconcilable beliefs(本論2)/ persistent military distrust(本論3)。Day1 最終文と同じ「3理由圧縮」の技。③ irreconcilable = 本論2の difficult to reconcile を1語の形容詞に圧縮(reconcile + -able + 否定接頭辞 ir-)。④ make O C = 第5文型(既出)。補語が名詞句 an unattainable ideal になった版。⑤ unattainable = 序論の attain を否定形容詞化(un- + attain + -able)。同語源の語形変化で首尾一貫させる高等技。ideal は可算で a。⑥ 主語が複数並列なので make は原形形。",
      "writing": "結論の型: In conclusion, although + [相手への譲歩], [理由1] + [理由2] + [理由3] make + [お題] + an unattainable ideal. 本論で使った動詞を -able 形容詞に変換(reconcile→irreconcilable, attain→unattainable)して結論に埋め込むと、繰り返さずに全編を回収できる。"
    },
    {
      "en": "For these reasons, I am convinced that world peace, however desirable, cannot realistically be achieved.",
      "ja": "これらの理由から、私は世界平和は望ましくはあっても現実的には達成できないと確信している。",
      "structure": "For these reasons(副詞句)+SVC。S=I、V=am convinced、that節が確信の内容。節内の however desirable は挿入の譲歩、本体は S(world peace)+cannot be achieved(助動詞受動)。",
      "grammar": "① For these reasons, = 結論の最終文で3理由を一括で受ける決まり文句。② I am convinced that 〜 = 「確信している」。convince(納得させる)の受動で「納得させられている=確信している」。I believe の格上げで結論の再宣言に使う。③ however desirable = however + 形容詞 の譲歩挿入「どれほど望ましくても」。however desirable (it may be) の省略形。コンマで挟んで主語の直後に差し込む1級らしい圧縮譲歩。④ cannot realistically be achieved = 助動詞+副詞+受動態。序論の realistically achievable を受動態で言い換えた首尾照応。achieve する主体をぼかして客観的な不可能性として述べる。",
      "writing": "締めの一文テンプレ: For these reasons, I am convinced that + [立場], however + [形容詞], cannot be achieved. 挿入の however desirable / important / appealing は「理想は認めるが現実は別」を3語で処理できる結論の飛び道具。"
    }
  ],
  "3": [
    {
      "en": "The question of whether renewable energy can fully replace fossil fuels has become increasingly pressing.",
      "ja": "再生可能エネルギーが化石燃料に完全に取って代われるかという問いは、ますます切実になっている。",
      "structure": "SVC。S=The question of whether 〜 fuels(長い名詞句)、V=has become、C=increasingly pressing。",
      "grammar": "① The question of whether 〜 = 「〜かどうかという問い」。of の後に whether節を置いてお題を丸ごと名詞化する序論の第3の型(There is much debate over whether / It is often argued that に続く)。of句で特定→the。② renewable energy = energy は不可算→無冠詞。renewable = renew + -able「再生可能な」。③ fully replace = replace(取って代わる)を fully で修飾。お題の語を活かしつつ can fully replace と動詞句で言い換え。fossil fuels = 化石燃料は種類が複数あるので複数形が普通。④ has become = 現在完了。「(以前から今までの間に)〜になった」という現在に至る変化。became(過去)だと今との接点が切れる。⑤ increasingly pressing = pressing は press の現在分詞が形容詞化「差し迫った」。urgent の言い換え。increasingly は趨勢副詞(Day1既出)。",
      "writing": "序論1文目第3型: The question of whether + [お題] has become increasingly pressing. 時事性のあるお題ならこの「問いがますます切実になっている」型が便利。has become increasingly + 形容詞 は現在完了で今を切り取る定番の動き。"
    },
    {
      "en": "In my opinion, renewable sources are not only capable of replacing fossil fuels but are essential for our future, and I will explain my position with three reasons.",
      "ja": "私の考えでは、再生可能エネルギーは化石燃料に取って代われるだけでなく、私たちの未来に不可欠であり、三つの理由で自説を説明する。",
      "structure": "In my opinion(文修飾句)+主節2つの and 並列。主節1は not only A but B の相関構文で補語2つ(capable of 〜 / essential for 〜)を並列。主節2は S(I)+V(will explain)+O(my position)。",
      "grammar": "① In my opinion, = 立場表明の前置き。I think より書き言葉らしい。② not only A but (also) B = 相関接続詞。A(capable)より B(essential)に力点が乗る。「代替できる、どころか不可欠」と主張を一段釣り上げる。are が両側で繰り返され並列が明確。③ capable of -ing = be capable of + 動名詞「〜する能力がある」。can の形容詞版で、of の後は動名詞(× capable to replace)。④ essential for our future = Day1既出の essential。⑤ renewable sources = source(供給源)は可算で複数。energy の言い換えとして sources を使い反復回避。⑥ I will explain my position with three reasons = 3理由予告の第3変種(for three main reasons / I will offer three reasons に続く)。",
      "writing": "立場を強めに出すテンプレ: [主語] is not only capable of -ing but is essential for 〜. not only A but B は「Yesどころか大賛成」の温度を作る装置で、賛成論のテーゼを一段強くできる。3理由予告は毎回言い回しを変える練習を。"
    },
    {
      "en": "First, renewable technologies have improved dramatically in efficiency and affordability.",
      "ja": "第一に、再生可能技術は効率と手頃さの面で劇的に向上した。",
      "structure": "SV(自動詞)。S=renewable technologies、V=have improved。dramatically は動詞修飾、in efficiency and affordability は観点を示す前置詞句。",
      "grammar": "① First, = 本論1の合図(既出)。② have improved = 現在完了。「(過去から今までに)向上してきた」という現在への到達。改善の結果が今ある、が論旨なので完了形が必須。improve はここでは自動詞。③ dramatically = 「劇的に」。変化の程度を盛る副詞。significantly / substantially / remarkably と交換可能な手札。④ in efficiency and affordability = 「〜の面で」の観点の in。どちらも -ty の抽象名詞で不可算・無冠詞。affordability = afford + -able + -ity「手頃さ」。形容詞を名詞化して並べると引き締まる。⑤ renewable technologies = 個々の技術群なので可算・複数。",
      "writing": "変化を理由にする型: [主語] have improved dramatically in [観点A] and [観点B]. 観点は cheap → affordability のように形容詞を名詞化して in の後に置くと語彙点が伸びる。時制は「今に効いている変化」なら現在完了一択。"
    },
    {
      "en": "This is significant because cost was long the main obstacle to their adoption.",
      "ja": "これは重要だ。なぜなら長らくコストが普及の主な障害だったからだ。",
      "structure": "SVC+because節。主節は S(This)+V(is)+C(significant)。because節内は S(cost)+V(was)+C(the main obstacle)。long は副詞の挿入。",
      "grammar": "① This is significant because 〜 = 本論の「理由→説明」をつなぐ接着剤。前文の事実を This で受け、「なぜそれが重要か」を明示する。事実を並べるだけの答案と差がつく一文。② cost = 「コスト」一般で無冠詞・不可算的に使用。③ was long = この long は副詞「長い間」。過去形なのは「障害だった(今は克服されつつある)」と過去に押し込むため。前文の現在完了(改善した)と対をなす時制選択。④ the main obstacle to 〜 = 「〜への主な障害」。最上級的な特定(主な障害は一つ)なので the。obstacle の後の前置詞は to(× obstacle of)。⑤ their adoption = their = renewable technologies を受ける。adoption(採用・普及)は adopt の名詞化で不可算。",
      "writing": "本論の説明文はこの This is significant because 〜 が万能接着剤。「理由(事実)→ This is significant because(意味づけ)→ For instance(実例)」の3点セットで段落が完成する。obstacle to は to を落とさない。"
    },
    {
      "en": "For instance, the price of solar panels has fallen sharply over the past decade, making solar power a viable competitor to conventional energy.",
      "ja": "たとえば太陽光パネルの価格はこの十年で急落し、太陽光発電を従来エネルギーと競合できる水準にした。",
      "structure": "SV+分詞構文。主節は S(the price of solar panels)+V(has fallen)。making 以下は結果を表す分詞構文で、make O C(O=solar power、C=a viable competitor)を内包。",
      "grammar": "① the price of 〜 = of句で特定→the。price は可算。② has fallen sharply = 現在完了+程度副詞。over the past decade(この十年で)という「現在までの期間」を示す副詞句は現在完了と相性が固定。fall-fell-fallen の不規則変化。③ , making 〜 = 分詞構文の結果用法。「その結果〜にした」。and this has made ... を分詞で圧縮し、一文で因果まで運ぶ1級の頻出技。意味上の主語は主節全体(価格の下落)。④ make O C = 第5文型(既出)。補語は名詞句 a viable competitor。⑤ viable = 「実行可能な・成立しうる」。1級らしい形容詞。a viable competitor to 〜 = 「〜の有力な対抗馬」。competitor の相手は to で示す。⑥ conventional energy = conventional「従来型の」。energy は不可算・無冠詞。",
      "writing": "数字・趨勢の実例は [指標] has fallen/risen sharply over the past decade, making + O + C の型で「事実+その帰結」を一文に。文末の , making 〜 分詞構文は語数を稼ぎつつ因果を締める必修テク。"
    },
    {
      "en": "Second, renewable sources are far cleaner and help combat climate change.",
      "ja": "第二に、再生可能エネルギーははるかにクリーンで、気候変動対策に役立つ。",
      "structure": "S+V1(are cleaner)+and+V2(help combat)の述語並列。S=renewable sources。",
      "grammar": "① Second, = 本論2の合図(既出)。② far cleaner = 比較級 cleaner を far で強調(Day1 far outweigh と同じ far)。比較対象(than fossil fuels)は自明なので省略。③ help combat = help (to) do の to省略形。help の後は原形不定詞が普通。combat = fight の格上げ動詞「〜と闘う」。combat climate change が定番コロケーション。④ climate change = 不可算・無冠詞のかたまり。⑤ 主語 sources(複数)なので are / help に -s なし。",
      "writing": "help + 原形 は「〜に資する」を軽く言える便利動詞: help combat climate change / help address labor shortages。比較級+far は「圧倒的優位」を2語で作れるので、対比型の本論で毎回使える。"
    },
    {
      "en": "Unlike fossil fuels, they produce little or no carbon emissions during operation.",
      "ja": "化石燃料と違い、稼働中の炭素排出はほとんど、あるいは全くない。",
      "structure": "Unlike句(対比)+SVO。S=they(=renewable sources)、V=produce、O=little or no carbon emissions。during operation は時の前置詞句。",
      "grammar": "① Unlike + 名詞, = 「〜と違って」の対比前置詞。1語で対比の土俵を作り、直後の主張を際立たせる。本論の説明部分で効く。② they = 前文の renewable sources を受ける代名詞。段落内の結束。③ little or no 〜 = 「ほとんど、あるいは全く〜ない」。ゼロと断言せず幅を持たせる誠実な書き方。little は不可算側の「ほとんどない」だが、ここでは emissions(複数)に no と束ねてかかる緩い用法で、few or no emissions がより厳密。④ carbon emissions = 排出「量・各種排出」の意で複数形が定番。emission は emit の名詞化。⑤ during operation = 「稼働中は」。operation(稼働)は不可算・無冠詞。",
      "writing": "対比の説明文テンプレ: Unlike + [比較対象], [主語] + [優位点]. Unlike は While 節を作るより短く、200-240語の字数管理に効く。little or no + 名詞 は「ほぼゼロ」を正確に言う保険付き表現。"
    },
    {
      "en": "A clear example is Denmark, which now generates a large share of its electricity from wind power while reducing its carbon footprint.",
      "ja": "明確な例がデンマークで、今や電力の大部分を風力でまかないながら炭素排出量を削減している。",
      "structure": "SVC。S=A clear example、V=is、C=Denmark。which以下は非制限用法の関係代名詞節。while reducing 〜 は接続詞付き分詞構文(同時進行)。",
      "grammar": "① A clear example is + 固有名詞 = 具体例導入の型(Day1 A prime example of this is の変種)。example は初出で a。② , which now generates 〜 = 非制限用法(Day1既出)。固有名詞 Denmark は追加情報しか付けられないので必ずコンマ+which。三単現 -s(Denmark は単数)。③ a large share of its electricity = 「電力の大きな割合」。share は可算で a。electricity は不可算、its は Denmark の所有格。④ from wind power = エネルギー源を示す from。wind power は不可算・無冠詞。⑤ while reducing = 接続詞 while を残した分詞構文「〜しつつ」。while it reduces の圧縮で、「発電しながら同時に削減」の両立を1句で表す。⑥ carbon footprint = 「炭素排出量(足跡の比喩)」。可算で its が付く。",
      "writing": "国名実例のテンプレ: A clear example is + [国名], which now + [実績]. 実例には必ず , which で1つ実績データ風の中身を足す。while -ing は「AしつつBも達成」の両立アピールに使え、環境・経済の両取り論法と相性がよい。"
    },
    {
      "en": "Finally, renewable energy enhances national energy security.",
      "ja": "最後に、再生可能エネルギーは国家のエネルギー安全保障を高める。",
      "structure": "SVO。S=renewable energy、V=enhances、O=national energy security。",
      "grammar": "① Finally, = 本論3の合図(既出)。② enhances = 三単現(renewable energy は不可算単数)。enhance = improve の格上げ「(質・価値を)高める」。enhance security / creativity / understanding と抽象名詞を目的語に取る。③ national energy security = 名詞3連の複合「国家のエネルギー安全保障」。security は不可算→無冠詞。energy security は時事の定番タームとしてそのまま覚える。",
      "writing": "トピックセンテンスの最短型: [主題] enhances + [抽象名詞]. 短い一文で切り出して、続く2文で説明+例を厚くする緩急も本論の型のうち。improve より enhance、と動詞の格上げを常に意識する。"
    },
    {
      "en": "Because sunlight and wind are available domestically, they facilitate energy independence, and countries become less dependent on imported fuel.",
      "ja": "太陽光や風は国内で得られるため、エネルギー自立を促し、各国は輸入燃料への依存を減らせる。",
      "structure": "Because従属節+主節2つの and 並列。主節1は S(they)+V(facilitate)+O(energy independence)。主節2は S(countries)+V(become)+C(less dependent)。",
      "grammar": "① Because 〜, = 理由の従属節を文頭に。As / Since より因果を強く明示する。節内は S(sunlight and wind)+be available。② sunlight / wind = どちらも自然資源として不可算・無冠詞。available domestically = 「国内で入手可能」。domestically は文末で available を修飾。③ facilitate = 「容易にする・促進する」。1級動詞。help より硬く、facilitate energy independence(エネルギー自立を促す)のように抽象名詞と組む。④ energy independence = 不可算・無冠詞の複合名詞。⑤ become less dependent on 〜 = 比較級 less + 形容詞で「依存度が下がる」。dependent on の on は必須。independence ⇔ dependent の語族対比が一文内で効いている。⑥ imported fuel = 過去分詞の形容詞化「輸入された燃料」。fuel は不可算扱い。",
      "writing": "説明文の型: Because + [根拠], [主語] facilitate + [抽象名詞], and [帰結]. facilitate / enhance / foster は「良いことを促す」三兄弟としてローテーションする。less dependent on は「脱依存」系トピック(エネルギー・食料・輸入)で汎用。"
    },
    {
      "en": "Nations that have invested heavily in renewables, such as Germany, are consequently less vulnerable to volatile global oil markets.",
      "ja": "再生可能エネルギーに大きく投資してきたドイツのような国は、結果として不安定な世界の石油市場の影響を受けにくい。",
      "structure": "SVC。S=Nations that have invested heavily in renewables(主格関係代名詞節付き)、V=are、C=less vulnerable 〜。such as Germany は挿入の例示、consequently は接続副詞。",
      "grammar": "① Nations that have invested 〜 = 主格の関係代名詞 that で主語を限定「投資してきた国々」。節内は現在完了(投資の蓄積が今の強さに効いている)。invest in の in、heavily(大規模に)は invest の定番相棒。② renewables = 形容詞 renewable の名詞化複数形「再生可能エネルギー(各種)」。業界用語的な省略形で語彙点が取れる。③ , such as Germany, = 挿入で実例を1国だけ差し込む軽量例示(コンマで挟む)。④ consequently = 「結果として」の接続副詞。文中の be動詞の後に置ける。⑤ less vulnerable to 〜 = 比較級 less(前文の less dependent と対の再演)。vulnerable to = 「〜に対して脆弱な」。to とセット。⑥ volatile global oil markets = volatile「乱高下する・不安定な」は市場を語る1級形容詞。markets は複数(各地の市場)。",
      "writing": "実例を主語の中に埋め込む型: Nations that have + [過去分詞], such as + [国名], are consequently + [帰結]. 例示を such as の挿入で済ませると、A clear example is 型と別の引き出しになり例示が単調にならない。vulnerable to / volatile は経済トピックの必須語。"
    },
    {
      "en": "In conclusion, thanks to falling costs, environmental advantages, and improved energy security, renewable sources are fully capable of supplanting fossil fuels.",
      "ja": "結論として、コストの低下、環境面の利点、そしてエネルギー安全保障の向上のおかげで、再生可能エネルギーは化石燃料を十分に代替できる。",
      "structure": "In conclusion+thanks to句(3名詞句の並列)+主節SVC。S=renewable sources、V=are、C=fully capable of supplanting 〜。",
      "grammar": "① thanks to + 3並列 = 「〜のおかげで」。3理由の名詞化圧縮を thanks to にぶら下げる結論の型(Day1の主語並列型の変種)。falling costs(本論1)/ environmental advantages(本論2)/ improved energy security(本論3)。② falling = 現在分詞の形容詞化「下がりつつある」、improved = 過去分詞の形容詞化「向上した」。分詞1語で本論の動きを名詞句に畳み込む。③ fully capable of supplanting = 序論の not only capable of replacing の再演+格上げ。replace → supplant(取って代わる、のフォーマル語)への言い換えが結論の見せ場。of の後は動名詞。④ 全体で序論のテーゼを別語彙で再宣言しており、コピペ感を消した結論1文目の見本。",
      "writing": "結論1文目のテンプレ: In conclusion, thanks to A, B, and C, [主語] is fully capable of -ing. 本論の3見出しを「分詞+名詞」に圧縮して A, B, C に置くだけで結論の8割が完成する。本論で使った動詞(replace)は結論で類義語(supplant)に必ず替える。"
    },
    {
      "en": "I am therefore confident that a transition to clean energy is both possible and necessary.",
      "ja": "したがって私は、クリーンエネルギーへの移行は可能であり必要でもあると確信している。",
      "structure": "SVC。S=I、V=am、C=confident+that節。therefore は挿入の接続副詞。that節内は S(a transition)+V(is)+C(both possible and necessary)。",
      "grammar": "① I am therefore confident that 〜 = 結論の再宣言(Day2 I am convinced that の同型)。therefore を be動詞の直後に挿入すると文頭 Therefore, より流れが滑らか。② confident that 〜 = 形容詞+that節「〜と確信して」。③ a transition to 〜 = 「〜への移行」。transition は可算で、初めて名詞として提示するので a。方向の to。④ clean energy = renewable energy の最終言い換え。energy は不可算・無冠詞。⑤ both A and B = 相関接続詞「AでもありBでもある」。possible(可能)と necessary(必要)の2形容詞を束ね、「できる、しかもすべき」の二段構えで締める。",
      "writing": "最終文テンプレ: I am therefore confident that + [お題の言い換え] is both possible and necessary. both possible and necessary は「実現可能性+当為」を4語で言い切る万能の締め。therefore は文頭でなく be動詞の後に埋めると上級者の呼吸になる。"
    }
  ],
  "4": [
    {
      "en": "Whether developed nations ought to encourage immigration is a controversial issue in many societies today.",
      "ja": "先進国が移民を奨励すべきかどうかは、今日多くの社会で議論を呼ぶ問題だ。",
      "structure": "SVC。S=Whether節(名詞節)が丸ごと主語、V=is、C=a controversial issue。in many societies today は副詞句。",
      "grammar": "① Whether節主語 = whether 〜 immigration の名詞節がそのまま主語になる型。節主語は単数扱い→ is。If は主語の位置に置けないので必ず whether。お題言い換えの第4の型(There is much debate / It is often argued / The question of whether に続く)。② developed nations = 過去分詞の形容詞化「発展した国々=先進国」。developing nations(途上国)との対で覚える。無冠詞複数の総称。③ ought to = should の言い換え。お題が should なら本文では ought to に替えるのが言い換えの作法。④ encourage immigration = immigration(移民という現象)は不可算→無冠詞。個々の移民(人)は immigrant で可算。現象と人の使い分けがこのエッセイの縦糸。⑤ a controversial issue = 「議論を呼ぶ問題」。issue は可算で初出の a。controversial は賛否が割れるお題の万能形容詞。",
      "writing": "序論1文目第4型: Whether + [お題] is a controversial issue in many societies today. whether節を主語に据えるだけでお題の言い換えが完成する省エネ構文。should ⇔ ought to の置換は最小コストの言い換えとして常用する。"
    },
    {
      "en": "Despite the concerns frequently raised, I strongly believe that developed countries should actively welcome immigrants, and I will defend this view with three reasons.",
      "ja": "しばしば挙げられる懸念にもかかわらず、私は先進国は移民を歓迎すべきだと強く信じており、三つの理由でこの見解を擁護する。",
      "structure": "Despite句(譲歩)+主節2つの and 並列。主節1は S(I)+V(believe)+that節(SVO)。主節2は S(I)+V(will defend)+O(this view)。",
      "grammar": "① Despite + 名詞 = 前置詞の譲歩「〜にもかかわらず」。While節(Day1)の名詞句版で、字数を節約できる。× Despite of。② the concerns frequently raised = 過去分詞 raised の後置修飾(Day1 sums spent と同型)「頻繁に挙げられる懸念」。世間で既に挙がっている特定の懸念なので the。concern は可算で複数。③ I strongly believe that 〜 = I firmly believe の変種(既出の型)。④ should actively welcome = 助動詞+副詞+動詞。actively を挟んで「受け身でなく積極的に」と立場を強める。⑤ immigrants = 人としての移民は可算・無冠詞複数の総称。前文の immigration(現象)との使い分け。⑥ I will defend this view with three reasons = 3理由予告の第4変種。defend(擁護する)は「反対論があるお題」で support より戦闘的に響く。",
      "writing": "譲歩→立場のテンプレ: Despite the concerns frequently raised, I strongly believe that 〜. 名詞+過去分詞後置(the concerns raised / the criticism leveled)は While 節より短く譲歩を処理できる。反対論の強いお題では defend this view が効く。"
    },
    {
      "en": "First, immigrants help address serious labor shortages.",
      "ja": "第一に、移民は深刻な労働力不足の解消に役立つ。",
      "structure": "SVO。S=immigrants、V=help、O=address 〜(原形不定詞)。address の目的語が serious labor shortages。",
      "grammar": "① First, = 本論1の合図(既出)。② help address = help + 原形(Day3 help combat と同型、2度目なので確認のみ)。③ address = 「(問題に)取り組む・対処する」。solve より現実的で1級頻出。address a problem / shortage / issue。④ labor shortages = 「労働力不足」。shortage は可算で、分野ごとの不足を束ねて複数。labor は米式綴り(英式 labour)で不可算。",
      "writing": "トピックセンテンス最短型(Day3と同じ緩急)。help address + [問題] は「解決する」と大言せず「解消に資する」と言える安全な述語。social problems 系のトピックで address は毎回使う。"
    },
    {
      "en": "Many developed nations are confronting aging populations and steadily shrinking workforces.",
      "ja": "多くの先進国は高齢化と労働人口の縮小に直面している。",
      "structure": "SVO。S=Many developed nations、V=are confronting、O=aging populations and steadily shrinking workforces(2名詞句の並列)。",
      "grammar": "① are confronting = 現在進行形「まさに直面しつつある」。現在進行中の構造変化なので進行形が生きる。confront = face の格上げ「(困難に)立ち向かう・直面する」。② aging populations = aging は現在分詞の形容詞化「高齢化しつつある」。population は国ごとに数えて複数。③ steadily shrinking workforces = 副詞+現在分詞+名詞。shrinking「縮小しつつある」を steadily「着実に」が修飾。workforce(労働人口)は国単位で可算・複数。④ 分詞形容詞(aging / shrinking)で「進行中の変化」を名詞句に埋め込む圧縮技。which are aging と節を作るより締まる。",
      "writing": "現状説明の型: Many developed nations are confronting + [進行中の問題]. aging populations / shrinking workforces は少子高齢化トピックの必須コロケーションで、日本を語る英作文なら丸ごと流用できる。分詞形容詞で変化を名詞に埋め込む癖をつける。"
    },
    {
      "en": "For instance, industries such as healthcare and agriculture in Japan increasingly depend on foreign workers in order to remain functional and competitive.",
      "ja": "たとえば日本の医療や農業などの産業は、機能を維持し競争力を保つためにますます外国人労働者に依存している。",
      "structure": "SVO(前置詞句含む)。S=industries such as healthcare and agriculture in Japan、V=depend on、O=foreign workers。in order to 以下は目的の不定詞句。",
      "grammar": "① For instance, = 例示(既出)。② industries such as A and B = such as の挿入例示(Day3既出の型)。healthcare / agriculture はどちらも不可算・無冠詞。③ increasingly depend on 〜 = 「ますます〜に依存する」。depend on の on 必須。increasingly は趨勢副詞(既出)。④ in order to remain 〜 = 目的の不定詞の明示形。単なる to より「〜するためには」と目的を強調。⑤ remain functional and competitive = remain + 形容詞「〜のままでいる」。SVC を保つ動詞。functional(機能する)と competitive(競争力のある)の2形容詞並列。",
      "writing": "日本を実例に使う型: industries such as healthcare and agriculture in Japan increasingly depend on 〜. 英検で日本の実例は書きやすく採点者にも通じる鉄板ソース。in order to remain functional and competitive は「維持のために必要」系の目的句としてそのまま流用可。"
    },
    {
      "en": "Second, immigration drives economic growth and innovation.",
      "ja": "第二に、移民は経済成長と革新を推進する。",
      "structure": "SVO。S=immigration、V=drives、O=economic growth and innovation(並列)。",
      "grammar": "① Second, = 本論2の合図(既出)。② drives = 三単現(immigration は不可算単数)。drive = 「推進する・駆動する」。Day1 では driving innovation と動名詞で出た同語。promote / fuel / stimulate と同グループ。③ economic growth / innovation = どちらも不可算・無冠詞の抽象名詞。economic(経済の)と economical(節約になる)の混同に注意。",
      "writing": "[主題] drives economic growth and innovation は経済系メリットを言う最短テンプレ。目的語ペア growth and innovation はテクノロジー・教育・移民などあらゆる「良いこと」トピックに接続できる。"
    },
    {
      "en": "Newcomers establish businesses, fill critical skill gaps, and contribute valuable tax revenue to their host countries.",
      "ja": "新たな来住者は事業を起こし、技能の不足を埋め、貴重な税収をもたらす。",
      "structure": "S+V1, V2, and V3 の三動詞並列。S=Newcomers、V1=establish businesses、V2=fill critical skill gaps、V3=contribute valuable tax revenue to 〜。",
      "grammar": "① Newcomers = immigrants の言い換え「新来者」。同一段落での名詞回転(既出の作法)。無冠詞複数の総称。② 三動詞の並列 = A, B, and C のリズムで貢献を畳みかける。並列の各項を「動詞+目的語」で形を揃えるのが読みやすさの鍵。③ establish businesses = start の格上げ。business は「事業体」の意で可算・複数。④ fill critical skill gaps = skill gap(技能格差・人材不足)は可算・複数。critical = 「深刻な・重大な」。⑤ contribute A to B = 「AをBにもたらす」。tax revenue(税収)は不可算。valuable で格上げ。⑥ host countries = 「受け入れ国」。host の形容詞的用法。their は newcomers を受ける。",
      "writing": "貢献列挙の型: [主語] establish 〜, fill 〜, and contribute 〜. 三動詞並列は1文で中身を3倍にできる字数効率最強の型。ただし各項の文法形を必ず揃える。host countries / skill gaps / tax revenue は移民・労働トピックの必須語彙セット。"
    },
    {
      "en": "Admittedly, some argue that immigrants place a heavy strain on public services.",
      "ja": "確かに移民が公共サービスを圧迫すると主張する人もいる。",
      "structure": "Admittedly(文修飾副詞)+SVO。S=some、V=argue、O=that節。that節内は S(immigrants)+V(place)+O(a heavy strain)+on句。",
      "grammar": "① Admittedly, = 「確かに(認めるが)」の譲歩の文副詞。本論の中に反対意見を取り込む合図で、この段落の主役。次文の However とセット運用。② some argue that 〜 = some (people) の省略。「〜と主張する者もいる」と反対論を他人の声として提示し、自分は距離を置く。③ place a strain on 〜 = 「〜に負担をかける」のコロケーション。strain は「負荷」で可算扱いの a、heavy で程度を盛る。put pressure on と同族。④ public services = 「公共サービス(医療・教育など)」で複数が普通。",
      "writing": "譲歩の型: Admittedly, some argue that + [反対論の要約]. 反対論は1文だけ、それも some argue と伝聞形で書くのが鉄則(自分の声で書くと立場がぶれる)。place a heavy strain on は財政・環境負荷の話で毎回使える。"
    },
    {
      "en": "However, numerous studies consistently show that immigrants contribute far more economically than they ever receive in benefits.",
      "ja": "しかし多くの研究は一貫して、移民が受け取る給付よりはるかに多くを経済的に貢献していることを示している。",
      "structure": "However(接続副詞)+SVO。S=numerous studies、V=show、O=that節。that節内は比較構文: immigrants contribute far more ... than they receive。",
      "grammar": "① However, = Admittedly とセットの反論の合図。譲歩→即反論で自分の論に戻る。② numerous studies consistently show that 〜 = 「多数の研究が一貫して示す」。個人の意見でなく研究の蓄積で押し返す反論の王道。numerous = many の格上げ。consistently(一貫して)が証拠の強さを担保する。③ contribute far more ... than 〜 = 比較構文。far は比較級の強調(既出)。more は contribute の目的語相当。④ than they ever receive in benefits = ever が「そもそも受け取る分すべてと比べても」と比較を最大化する強め。in benefits = 「給付という形で」。benefits はここでは「(社会保障の)給付」の意で複数形が定番。Day1 の benefits(利点)と別義なのに注意。",
      "writing": "反論の型: However, numerous studies consistently show that 〜. Admittedly + However は英検1級で最も配点効率のよいペアで、本論のどこか1箇所に必ず埋め込む。数字を知らなくても studies consistently show で「証拠がある」体裁を作れる。"
    },
    {
      "en": "Finally, immigration enriches society through cultural diversity.",
      "ja": "最後に、移民は文化的多様性を通じて社会を豊かにする。",
      "structure": "SVO。S=immigration、V=enriches、O=society。through cultural diversity は手段の前置詞句。",
      "grammar": "① Finally, = 本論3の合図(既出)。② enriches = 三単現。enrich = en-(〜にする)+rich「豊かにする」。enhance(Day3)と同族の格上げ動詞。③ society = 「社会」一般は無冠詞・不可算(× the society)。特定の社会なら a society / societies。④ through 〜 = 手段・経路の前置詞「〜を通じて」。by より広く「〜を介して」。cultural diversity = 不可算・無冠詞。",
      "writing": "[主題] enriches society through 〜 は文化系メリットの最短テンプレ。society を無冠詞で使えるかは頻出の冠詞ポイントなので、この形ごと暗記する。"
    },
    {
      "en": "Exposure to different perspectives and traditions fosters creativity, tolerance, and mutual understanding among citizens.",
      "ja": "異なる視点や伝統に触れることは、市民の間に創造性・寛容・相互理解を育む。",
      "structure": "SVO。S=Exposure to different perspectives and traditions、V=fosters、O=creativity, tolerance, and mutual understanding(3名詞並列)。among citizens は前置詞句。",
      "grammar": "① Exposure to 〜 = 「〜に触れること」。expose の名詞化を主語に立てる無生物主語構文。experiencing 〜 より硬質で1級らしい。exposure の後の前置詞は to。ここでは概念一般なので無冠詞(the exposure と特定もしない)。② fosters = 三単現(主語は exposure 単数)。foster = 「育む」。promote / nurture の仲間で、抽象的な良いものを目的語に取る(Day5 でも登場する頻出動詞)。③ creativity, tolerance, and mutual understanding = 3つの不可算抽象名詞の並列・すべて無冠詞。3並列のリズム(既出の型)。④ among citizens = 「市民の間に」。3者以上の間は between でなく among。",
      "writing": "説明文の型: Exposure to + [新しいもの] fosters + [抽象名詞3並列]. 動詞を名詞化した主語(Exposure / Access / Participation)+ fosters は「経験→効用」の因果を1文で作る1級の武器。多文化・教育・芸術系トピックに直結する。"
    },
    {
      "en": "The vibrant, multicultural character of cities like Toronto clearly demonstrates how diversity can strengthen rather than weaken a nation.",
      "ja": "トロントのような都市の活気ある多文化的性格は、多様性が国を弱めるどころか強めうることを示している。",
      "structure": "SVO。S=The vibrant, multicultural character of cities like Toronto、V=demonstrates、O=how節。how節内は S(diversity)+V(can strengthen)+O(a nation)、rather than weaken が動詞の対比並列。",
      "grammar": "① The ... character of 〜 = of句で特定→the。character = 「性格・特質」。vibrant(活気ある), multicultural の形容詞2連はコンマで区切る。② cities like Toronto = like による軽量例示(such as と同役)。③ clearly demonstrates how 〜 = 実例の締めの型(Day1・Day2既出、3度目なので確認のみ)。④ strengthen rather than weaken = rather than による動詞の対比並列(Day1 pool ... rather than compete と同型)。strengthen / weaken は -en 動詞ペア「強める/弱める」で、反対派の主張(weaken)を同じ文中で裏返す修辞。⑤ a nation = 「一つの国(どの国であれ)」の総称の a。",
      "writing": "実例の締め+反対論の裏返しを1文でやる型: [実例] demonstrates how X can strengthen rather than weaken 〜. 反対派の動詞(weaken / harm / undermine)を rather than の後ろに置いて否定すると、譲歩段落以外でも反対論を軽く潰せる。"
    },
    {
      "en": "In conclusion, despite the reservations that some people understandably hold, encouraging immigration brings substantial benefits by easing labor shortages, stimulating the economy, and enhancing cultural richness.",
      "ja": "結論として、一部の人が抱く無理からぬ懸念にもかかわらず、移民の奨励は労働力不足の緩和、経済の刺激、文化的豊かさの向上という大きな利益をもたらす。",
      "structure": "In conclusion+despite句(関係詞節付き)+主節。S=encouraging immigration(動名詞句)、V=brings、O=substantial benefits。by -ing, -ing, and -ing は手段の動名詞3並列。",
      "grammar": "① despite the reservations that 〜 hold = 序論の Despite the concerns の再演+格上げ。reservation = concern の言い換え「(心の)留保・懸念」。that は目的格の関係代名詞(hold の目的語)。② understandably = 「無理からぬことだが」。反対派に理解を示す一語の譲歩で、hold を修飾。品格点が付く副詞。③ encouraging immigration = 動名詞句主語(単数扱い→brings)。序論の should encourage を動名詞に変換した首尾照応。④ substantial benefits = many benefits の格上げ(substantial = considerable の仲間)。⑤ by easing 〜, stimulating 〜, and enhancing 〜 = by + 動名詞3並列で本論3段落を圧縮する結論の型(Day3 thanks to 型の動名詞版)。easing(本論1)/ stimulating(本論2)/ enhancing(本論3)。ease = 「和らげる」、the economy は「(その国の)経済」で the。",
      "writing": "結論の最重要テンプレ: In conclusion, despite 〜, [動名詞主語] brings substantial benefits by -ing A, -ing B, and -ing C. 本論3本を by + 動名詞に畳む技はどの賛成論でも使える。譲歩に understandably を一語添えると「敵にも理解を示せる書き手」の印象点が入る。"
    },
    {
      "en": "For these reasons, I am firmly convinced that developed nations should welcome immigrants rather than turn them away.",
      "ja": "これらの理由から、私は先進国は移民を退けるのではなく歓迎すべきだと固く確信している。",
      "structure": "For these reasons+SVC。S=I、V=am convinced、that節が内容。節内は S(developed nations)+should welcome+O(immigrants)、rather than turn them away が動詞句の対比並列。",
      "grammar": "① For these reasons, I am firmly convinced that 〜 = 結論最終文の型(Day2既出)に firmly を足した強化版。② should welcome 〜 rather than turn them away = rather than の動詞対比(本エッセイ2度目)。should が両方の動詞に掛かる。③ turn away = 句動詞「追い返す・拒む」。代名詞目的語は必ず間に挟む(turn them away、× turn away them)。句動詞+代名詞の語順は頻出の文法ポイント。④ welcome ⇔ turn away の対で立場を絵として見せて締める。",
      "writing": "最終文テンプレ: For these reasons, I am firmly convinced that + [主語] should + [自分の推す行動] rather than + [反対の行動]. 締めに動詞ペアの対比を置くと採点者の記憶に残る。句動詞の目的語が代名詞なら間に挟む(turn them away)を体で覚える。"
    }
  ],
  "5": [
    {
      "en": "In recent decades, globalization has reshaped economies and societies across the planet.",
      "ja": "ここ数十年で、グローバル化は地球規模で経済と社会を作り変えてきた。",
      "structure": "In recent decades(時の副詞句)+SVO。S=globalization、V=has reshaped、O=economies and societies。across the planet は場所の前置詞句。",
      "grammar": "① In recent decades, = 「ここ数十年で」。現在完了と結びつく時間副詞句(over the past decade と同族)。お題の背景から入る序論の第5の型。② globalization = -tion の抽象名詞で不可算・無冠詞。③ has reshaped = 現在完了「(数十年かけて今に至るまで)作り変えてきた」。re- + shape「形を作り直す」。change の格上げ。④ economies and societies = ここでは「各国の経済・各社会」と個別に数えて複数形。economy / society は「一般概念なら不可算、個別なら可算」の代表格。⑤ across the planet = 「地球全体で」。the planet = 地球(Day1 our planet 参照)。",
      "writing": "背景導入型の序論1文目: In recent decades, [お題の主語] has reshaped 〜. お題を問いの形で言い換える代わりに「事実の背景」から入る型で、歴史・経済系のお題と相性がよい。reshape / transform は change の格上げとして常備する。"
    },
    {
      "en": "Although it is not without its critics, I strongly agree that globalization is, on balance, a positive force, and I will justify this position with three reasons.",
      "ja": "批判がないわけではないが、私は総じてグローバル化は肯定的な力だと強く同意し、三つの理由でこの立場を正当化する。",
      "structure": "Although譲歩節+主節2つの and 並列。主節1は S(I)+V(agree)+that節(SVC、on balance が挿入)。主節2は S(I)+V(will justify)+O(this position)。",
      "grammar": "① it is not without its critics = 二重否定「批判がないわけではない=批判もある」。譲歩を控えめに認める修辞(litotes)で、1級らしい老練な言い回し。critics = 「批判者」で可算・複数。② I strongly agree that 〜 = お題が Agree/Disagree 型のときの直球テーゼ。③ , on balance, = 「総じて・差し引きで」の挿入句。コンマで挟んで is と補語の間に置く。全体評価を示す副詞句で序論・結論どちらでも使える。④ a positive force = 「肯定的な力」。force は可算で a。⑤ I will justify this position with three reasons = 3理由予告の第5変種。justify は Day1 序論の「お題の動詞」を自分の行為に転用した形。",
      "writing": "譲歩の上級形: Although it is not without its critics, I strongly agree that 〜 is, on balance, a positive force. 二重否定 not without は「反対もあるが」を上品に処理できる。on balance の挿入はどのエッセイでも1回入れる価値がある。"
    },
    {
      "en": "First, globalization has lifted millions of people out of poverty.",
      "ja": "第一に、グローバル化は何百万もの人々を貧困から救い出してきた。",
      "structure": "SVO。S=globalization、V=has lifted、O=millions of people。out of poverty は方向の前置詞句。",
      "grammar": "① First, = 本論1の合図(既出)。② has lifted = 現在完了「(これまでに)救い出してきた」。実績の蓄積を語るので完了形。③ lift A out of B = 「AをBから引き上げる」。lift millions out of poverty は貧困削減論の定番コロケーションとしてこの形ごと覚える。④ millions of people = 「何百万もの人々」。millions と複数形にして of を続ける(× million of)。漠然と大数を言う型: thousands of / millions of / billions of。⑤ poverty = 状態の抽象名詞で不可算・無冠詞。",
      "writing": "実績型トピックセンテンス: [主題] has lifted millions of people out of poverty. 経済発展・技術・教育のメリットを語る段落でそのまま流用できる決めフレーズ。millions of で数字を知らなくてもスケール感を出せる。"
    },
    {
      "en": "By opening markets and creating jobs, it allows developing nations to participate in the global economy.",
      "ja": "市場を開き雇用を生むことで、発展途上国が世界経済に参加できるようにする。",
      "structure": "By+動名詞2並列(手段)+SVOC系。S=it(=globalization)、V=allows、O=developing nations、C=to participate 〜。",
      "grammar": "① By -ing and -ing, = 手段の by+動名詞を文頭に(Day4 結論の型を本論の説明文で使った形)。opening markets(市場開放)と creating jobs(雇用創出)の並列。② it = 前文の globalization を受ける。③ allow O to do = 「Oが〜できるようにする」。force / require(強制系)に対し allow / enable は許容系。同じ to不定詞型。三単現 -s。④ developing nations = 現在分詞の形容詞化「発展しつつある国=途上国」。Day4 の developed nations(過去分詞=先進国)と分詞の向きで対になる頻出ペア。⑤ participate in 〜 = 「〜に参加する」。in とセット。⑥ the global economy = 「世界経済」は一つの特定システムなので the。",
      "writing": "説明文の型: By -ing and -ing, it allows + O + to do. 「手段→誰が何をできるようになるか」を1文で運ぶ万能構文。developed / developing nations の分詞ペアと、allow / enable + O + to do は1級英作文の基礎装備。"
    },
    {
      "en": "For instance, countries in Southeast Asia have experienced remarkable growth by exporting goods to wealthier markets.",
      "ja": "たとえば東南アジアの国々は、より豊かな市場へ財を輸出することで目覚ましい成長を遂げた。",
      "structure": "SVO。S=countries in Southeast Asia、V=have experienced、O=remarkable growth。by exporting 〜 は手段の前置詞句。",
      "grammar": "① For instance, = 例示(既出)。② countries in Southeast Asia = 固有名詞を1国に絞らず地域で例示する安全策。Southeast Asia は地域名で無冠詞。③ have experienced remarkable growth = 現在完了(実績)。experience growth = 「成長を経験する=遂げる」。remarkable = 「目覚ましい」で great の格上げ。growth は不可算。④ by exporting = 手段の by+動名詞(前文と同じ型、連用で段落に一貫性)。⑤ goods = 「財・商品」は常に複数形で使う名詞(× a good)。⑥ wealthier markets = 比較級「より豊かな市場」。rich の格上げ wealthy の比較級。",
      "writing": "地域例示の型: countries in + [地域名] have experienced remarkable growth by -ing. 特定の国名に自信がなければ地域でぼかすのが安全。goods は複数形固定、experience growth のコロケーションもそのまま使える。"
    },
    {
      "en": "Second, globalization accelerates the spread of knowledge and technology.",
      "ja": "第二に、グローバル化は知識と技術の普及を加速させる。",
      "structure": "SVO。S=globalization、V=accelerates、O=the spread of knowledge and technology。",
      "grammar": "① Second, = 本論2の合図(既出)。② accelerates = 三単現。accelerate = 「加速させる」。speed up の格上げで、変化の速度を語る1級動詞。③ the spread of 〜 = 「〜の普及」。動詞 spread の名詞化+of句で特定→the(Day1 the fostering of と同じ発想)。④ knowledge and technology = どちらも不可算・無冠詞。knowledge は常に不可算(× knowledges、× a knowledge)。",
      "writing": "トピックセンテンス型: [主題] accelerates the spread of 〜. 「the+名詞化+of」で動詞を名詞句に変える技はトピックセンテンスを短く強くする。accelerate / facilitate / enhance / foster の格上げ動詞4点セットを回す。"
    },
    {
      "en": "Innovations and medical advances now reach distant regions far more quickly than before.",
      "ja": "革新や医療の進歩は、以前よりはるかに速く遠隔地に届くようになった。",
      "structure": "SVO。S=Innovations and medical advances、V=reach、O=distant regions。far more quickly than before は比較の副詞句。",
      "grammar": "① Innovations = ここでは「個々の新技術・新機軸」で可算・複数(Day1 の不可算 innovation との違いは「概念か個々の産物か」)。medical advances = advances も複数(Day1 参照)。② now = 「今や」。過去との対比を1語で作る副詞。③ reach = 他動詞「〜に届く」。前置詞不要(× reach to)。主語複数なので -s なし。④ distant regions = 「遠隔地」。無冠詞複数の総称。⑤ far more quickly than before = 副詞の比較級 more quickly を far で強調(far+比較級は既出)。than before = 「以前より」と比較対象を最小コストで示す。",
      "writing": "変化を語る説明文の型: [主語] now + [動詞] far more quickly than before. now 〜 than before のセットは「昔と今」の対比を最短で作れる。reach は他動詞、が冠詞・前置詞ミスの定番チェックポイント。"
    },
    {
      "en": "The rapid global distribution of vaccines during recent health crises illustrates this benefit vividly.",
      "ja": "近年の健康危機におけるワクチンの急速な世界的流通が、この利点を生き生きと示している。",
      "structure": "SVO。S=The rapid global distribution of vaccines during recent health crises、V=illustrates、O=this benefit。vividly は動詞修飾の副詞。",
      "grammar": "① The ... distribution of 〜 = 名詞化主語+of句で特定→the(既出の型)。distribution = distribute の名詞化「流通・分配」。② vaccines = 可算・複数「各種ワクチン」。③ during recent health crises = crisis の複数形は crises(-is→-es の不規則変化)。頻出のスペリングポイント。「コロナ」と固有名詞を出さずに recent health crises とぼかす例示の品。④ illustrates = 実例の締め動詞(既出)。三単現(主語は distribution 単数)。⑤ this benefit = 前文の内容を this+名詞で受ける結束(Day2 this stubborn reality と同型)。⑥ vividly = 「生き生きと・鮮明に」。clearly の格上げ。",
      "writing": "時事例のぼかし方の見本: during recent health crises と書けばパンデミックに触れつつ固有名詞のリスクを避けられる。crisis→crises の複数形は書けると差がつく。illustrate + O + vividly は clearly demonstrates の言い換えとしてローテーション。"
    },
    {
      "en": "Finally, globalization fosters cultural exchange and mutual understanding.",
      "ja": "最後に、グローバル化は文化交流と相互理解を促す。",
      "structure": "SVO。S=globalization、V=fosters、O=cultural exchange and mutual understanding(並列)。",
      "grammar": "① Finally, = 本論3の合図(既出)。② fosters = 三単現。foster は Day4 既出の「育む」。抽象的な良いものを目的語に取る格上げ動詞。③ cultural exchange = 「文化交流」で不可算・無冠詞。an exchange なら個別の交換(可算化)。④ mutual understanding = Day4 でも登場した定番ペア。understanding は不可算・無冠詞。",
      "writing": "[主題] fosters cultural exchange and mutual understanding は国際・文化系メリットの万能トピックセンテンス。移民(Day4)でもグローバル化(Day5)でも観光でも留学でも、そのまま貼れる。"
    },
    {
      "en": "As people encounter foreign ideas, cuisines, and customs, prejudice tends to diminish.",
      "ja": "人々が外国の思想・料理・習慣に出会うにつれ、偏見は薄れる傾向にある。",
      "structure": "As従属節(比例)+主節。主節は S(prejudice)+V(tends)+to diminish。",
      "grammar": "① As 〜, = 比例の as(既出)。② encounter = meet の格上げ「(偶然)出会う・遭遇する」。他動詞で前置詞不要。③ foreign ideas, cuisines, and customs = 3名詞並列(既出のリズム)。cuisine = 「(その国の)料理」で国ごとに数えて複数。customs = 「習慣」の意では複数形が普通(単数 custom は個別の慣習、customs には「税関」の別義もある)。④ prejudice = 「偏見」一般は不可算・無冠詞。⑤ tends to diminish = tend to do「〜する傾向がある」。断言(diminishes)を避けて傾向として述べる論述のぼかし技(be likely to と同グループ)。diminish = decrease の格上げ自動詞「減る・薄れる」。三単現 -s は tends に付く。",
      "writing": "因果をソフトに言う型: As people encounter 〜, [悪いもの] tends to diminish. 人の心・社会の変化は断言せず tend to で書くと反例攻撃に強い答案になる。encounter / diminish は meet / decrease の格上げとして常備。"
    },
    {
      "en": "The growing popularity of international films and music demonstrates how cultures now enrich one another.",
      "ja": "国際的な映画や音楽の人気の高まりは、文化が今や互いを豊かにしている様子を示している。",
      "structure": "SVO。S=The growing popularity of international films and music、V=demonstrates、O=how節。how節内は S(cultures)+V(enrich)+O(one another)。",
      "grammar": "① The growing popularity of 〜 = 現在分詞 growing+名詞化主語+of句で特定→the。「人気の高まり」と変化を名詞句に畳む(既出の技の複合)。popularity は不可算。② demonstrates how 〜 = 実例の締め(既出、確認のみ)。③ cultures = 「各文化」で可算・複数。④ enrich = Day4 既出「豊かにする」。⑤ one another = 「互いに」。each other と同義の相互代名詞で、動詞の目的語に置く。伝統的には3者以上で one another とされたが現代では交換可能。",
      "writing": "身近な実例の型: The growing popularity of + [流行しているもの] demonstrates how 〜. 映画・音楽・SNS など誰でも書ける実例を the growing popularity of で持ち上げると、統計なしでも証拠らしく見せられる。"
    },
    {
      "en": "In conclusion, the evidence strongly supports the view that globalization benefits humanity overall.",
      "ja": "結論として、証拠はグローバル化が全体として人類に利益をもたらすという見方を強く裏づけている。",
      "structure": "In conclusion+SVO。S=the evidence、V=supports、O=the view+同格that節。that節内は S(globalization)+V(benefits)+O(humanity)。",
      "grammar": "① the evidence strongly supports the view that 〜 = 結論を「私はこう思う」でなく「証拠がこの見方を支持する」と客観側に立てて締める型。evidence は不可算(× evidences)で、本論で挙げた例の総体を指すので the。② the view that 〜 = 同格の that(Day2 the notion that と同型)。③ benefits = ここでは動詞「〜に利益を与える」で三単現。名詞の benefits と品詞をまたいで使えると強い。④ humanity = 無冠詞不可算(既出)。⑤ overall = 文末で「全体として」。on balance の言い換え。",
      "writing": "結論1文目の客観型テンプレ: In conclusion, the evidence strongly supports the view that + [自分の立場]. I believe 系を使い切った後の言い換えとして最有力。benefit を動詞で使う(X benefits Y)のも反復回避の小技。"
    },
    {
      "en": "By reducing poverty, spreading valuable knowledge, and bringing diverse cultures closer together, it serves as a powerful engine of progress.",
      "ja": "貧困を減らし、貴重な知識を広め、多様な文化を近づけることで、それは強力な進歩の原動力として働く。",
      "structure": "By+動名詞3並列(手段)+SV。S=it(=globalization)、V=serves as 〜。bringing 〜 closer together は bring O C(比較級)の構造を含む。",
      "grammar": "① By -ing, -ing, and -ing, = 本論3段落を動名詞で圧縮する結論の型(Day4 と同じ、この日の focus の核心)。reducing poverty(本論1)/ spreading valuable knowledge(本論2)/ bringing diverse cultures closer together(本論3)。② bring A closer together = 「Aをより近づける」。bring+O+副詞(比較級)の語順。③ it = 前文の globalization。結論内でも代名詞で反復回避。④ serves as 〜 = 「〜として機能する」。is より動きのある繋ぎで、serve as a powerful engine of progress は比喩ごと使える決め表現。engine of progress = 「進歩の原動力」。a が付くのは「一つの強力な原動力」だから。⑤ progress は不可算・無冠詞。",
      "writing": "結論2文目の最重要テンプレ: By -ing A, -ing B, and -ing C, it serves as a powerful engine of 〜. 3理由の動名詞圧縮+比喩の締めが1文で完成する。engine of progress / growth / change は名詞を差し替えて多くのトピックで流用できる。"
    },
    {
      "en": "I therefore remain convinced that, despite its imperfections, globalization does far more good than harm.",
      "ja": "したがって私は、不完全な面はあっても、グローバル化は害よりはるかに多くの善をなすと確信し続けている。",
      "structure": "SVC。S=I、V=remain convinced、that節が内容。節内に despite its imperfections が挿入され、本体は S(globalization)+V(does)+O(far more good than harm)。",
      "grammar": "① I therefore remain convinced that 〜 = 結論の再宣言(I am convinced の変種)。remain で「本論を経てなお確信は変わらない」の継続ニュアンスが出る。therefore は主語と動詞の間に挿入(Day3 と同じ呼吸)。② despite its imperfections = 挿入の最終譲歩。imperfection = 「不完全さ」で個々の欠点として複数。its = globalization の所有格。コンマで挟んでthat節内に差し込む(Day2 however desirable と同じ圧縮譲歩の技)。③ does far more good than harm = do good(善をなす)/ do harm(害をなす)の慣用対。good / harm はどちらも不可算名詞。more ... than の比較を far で強調(既出)。お題の benefit the world more than it harms it への直接回答になっている。",
      "writing": "賛成側の最終文の決め台詞: [主題] does far more good than harm. お題が「害より益か」型ならこの一文で締めるのが最強。despite its imperfections の挿入譲歩を添えると、最後まで公平さを保った答案として印象が締まる。"
    }
  ],
  "6": [
    {
      "en": "As global populations expand and economies industrialize, energy consumption continues to rise rapidly.",
      "ja": "世界の人口が拡大し経済が工業化するにつれ、エネルギー消費は急速に増え続けている。",
      "structure": "As節(従属)+主節のSV。As節内は populations expand と economies industrialize の2つのSVが and で並列。主節は S=energy consumption、V=continues to rise。",
      "grammar": "① As = 「〜するにつれて」の比例・同時進行の接続詞。序論の1文目で世界的な背景を描くのに最適。② global populations は複数形。世界各地域の人口をまとめて指すので populations と複数にする(単数 the global population でも可だがここは地域ごとの広がりを含意)。③ economies も可算複数=「各国の経済」。economy は「一国の経済」の意味では可算。④ industrialize は自動詞「工業化する」。-ize 動詞は自他両用が多いが、ここは主語自身が変化する自動詞用法。⑤ energy consumption = 無冠詞・不可算。抽象的な「消費」全般を表す -tion 名詞。⑥ continues to rise = continue + to不定詞「〜し続ける」。現在形なのは現在も進行中の一般的趨勢を述べるため。continues と三単現の -s(主語 consumption は不可算単数)。",
      "writing": "序論の1文目=お題の背景説明はこの As [世界的な変化1] and [変化2], [現象] continues to rise rapidly. がそのまま型になる。人口・技術・グローバル化などマクロな趨勢を As節に2つ並べると、いきなりお題に入るより格段に1級らしい導入になる。"
    },
    {
      "en": "There is much debate over whether governments can satisfy this growing demand.",
      "ja": "政府がこの増大する需要を満たせるかについては大いに議論がある。",
      "structure": "There is 構文。S=much debate、over whether 以下が「何についての議論か」を示す前置詞句。whether節内は S(governments) + 助動詞(can) + V(satisfy) + O(this growing demand)。",
      "grammar": "① There is much debate over whether 〜 = 序論でお題を中立に言い換える定番構文。debate(議論全般)は不可算なので much(× many debates)。② whether節は前置詞 over の目的語。if は前置詞の後に置けないので必ず whether。③ governments は無冠詞複数の総称用法=「各国政府というもの全般」。④ this growing demand = 前文の energy consumption ... rise を this + 現在分詞 + 名詞で受け直す。growing は現在分詞の前置修飾「増大しつつある」。demand は「需要」の意味では不可算。⑤ satisfy demand = 「需要を満たす」のコロケーション。お題の meet を satisfy に言い換えている。",
      "writing": "There is much debate over whether + [お題の言い換え] は序論2文目の鉄板。お題の動詞をコピペせず meet → satisfy のように動詞ごと差し替えるのが1級の作法。前文の内容を this growing [名詞] で受けるリレーも語数稼ぎと結束性の両方に効く。"
    },
    {
      "en": "In my view, governments will indeed be able to keep pace, and I will support this position with three reasons.",
      "ja": "私の見方では、政府は確かに歩調を合わせられるはずであり、三つの理由でこの立場を支える。",
      "structure": "重文。前半 S=governments、V=will be able to keep pace。後半 S=I、V=will support、O=this position。and で2つの節を接続。文頭 In my view は文修飾の前置詞句。",
      "grammar": "① In my view = 立場表明の合図。I think より書き言葉らしい。In my opinion / From my perspective と同格の手札。② will indeed be able to = 未来の可能性は will can と助動詞を重ねられないので will be able to。indeed は「確かに・実際に」と主張を強める副詞で、助動詞の直後に挿入するのが定位置。③ keep pace (with 〜) = 「歩調を合わせる」。お題の keep up with の言い換え。ここでは with 以下(rising demand)を文脈上省略。④ I will support this position with three reasons = 本論3段落の予告。this position は直前の自分の主張を指示形容詞で受ける。with は「〜を使って」の道具の with。",
      "writing": "序論3文目=テーゼ+予告はこの In my view, [主語] will indeed be able to 〜, and I will support this position with three reasons. が丸ごとテンプレ。indeed を入れるとお題の疑問文に正面から Yes と答えている感じが出る。for three main reasons 型との言い換えとして両方持っておく。"
    },
    {
      "en": "First, rapid advances in renewable technology are dramatically expanding supply.",
      "ja": "第一に、再生可能技術の急速な進歩が供給を劇的に拡大している。",
      "structure": "SVO。S=rapid advances in renewable technology、V=are expanding(現在進行形)、O=supply。First, は本論1の合図となる接続副詞。",
      "grammar": "① First, = 本論1段落目の冒頭に置く列挙の接続副詞。Firstly でも可。② advances は可算複数=「(複数分野・複数回の)進歩」。advance in 〜 = 「〜における進歩」で前置詞は in。③ renewable technology = 無冠詞・不可算。技術というジャンル全般。④ are dramatically expanding = 現在進行形で「今まさに進行中の変化」を活写する。単純現在(expand)だと恒常的事実になるが、進行形にすると「目下どんどん拡大している」という勢いが出る。dramatically は動詞を強める程度副詞で be動詞と -ing の間が定位置。⑤ supply = 「供給」の意味では不可算・無冠詞。demand と対になる経済語彙。",
      "writing": "本論のトピックセンテンスは [名詞化した理由] are dramatically expanding/reducing/transforming [対象] のように、進行形+程度副詞で「現在進行中の変化」として書くと説得力が出る。First, rapid advances in X are -ing 〜 は理由1の書き出しとしてどのテーマにも流用できる。"
    },
    {
      "en": "Solar and wind capacity is increasing every year as costs fall.",
      "ja": "太陽光と風力の容量はコスト低下とともに毎年増えている。",
      "structure": "SV(自動詞)。S=Solar and wind capacity、V=is increasing。as costs fall が「〜するにつれて」の従属節。",
      "grammar": "① Solar and wind capacity = solar と wind が capacity を共有する並列修飾。capacity(発電容量)は不可算扱いで単数受け → is。and で繋いでも中身は「容量」という一つの量なので複数扱いにしない点に注意。② is increasing = 進行形で継続中の増加を表す(前文と同じ発想なので詳細は省略)。increase はここでは自動詞。③ every year = 無冠詞の副詞句。each year でも可。④ as costs fall = 比例の as(1文目と同じ用法)。costs は複数形=個々の設備・発電のコスト。fall は「(価格が)下がる」の自動詞で、現在形なのは一般的趨勢だから。",
      "writing": "トピックセンテンスの直後は、このように数量の増減で裏づける一文を置く。X is increasing every year as costs fall / as technology matures はデータを持っていなくても書ける「それらしい」サポート文の型として覚えておく。"
    },
    {
      "en": "A prime example is China, which has installed enormous amounts of solar power to meet its surging needs.",
      "ja": "その好例が中国で、急増する需要を満たすため膨大な量の太陽光発電を導入してきた。",
      "structure": "SVC。S=A prime example、V=is、C=China。カンマ+which 以下は China を先行詞とする非制限用法の関係詞節。節内は has installed(現在完了) + O、文末の to meet 〜 は目的の to不定詞。",
      "grammar": "① A prime example is 〜 = For example の格上げ。example は可算で、初出・不特定なので a。prime は「最も良い・第一級の」。② カンマ+which = 非制限用法の関係代名詞。固有名詞 China は世界に一つしかなく限定できないので、必ず非制限(カンマあり)で補足説明する(× China that has ...)。③ has installed = 現在完了。「これまでに導入してきた(結果が今ある)」という過去から現在への蓄積。④ enormous amounts of 〜 = 不可算名詞(solar power)の量を表す定番。amounts と複数にすると規模の大きさが強調される。⑤ to meet = 目的の to不定詞「満たすために」。⑥ its surging needs = its は China を受ける所有格。surging は現在分詞の前置修飾「急増する」。needs は「必要・需要」の意味で慣用的に複数。",
      "writing": "具体例は A prime example is [国名/固有名詞], which has + 過去分詞 〜 の一文で完結させるのが時短の型。国名+非制限 which +現在完了は、統計を知らなくても「その国が続けてきた取り組み」として安全に書ける。for example と言わずに例を出せるので繰り返しも避けられる。"
    },
    {
      "en": "Second, improvements in energy efficiency are reducing waste considerably.",
      "ja": "第二に、エネルギー効率の改善が無駄を大幅に減らしている。",
      "structure": "SVO。S=improvements in energy efficiency、V=are reducing(現在進行形)、O=waste。considerably は文末で動詞を修飾。Second, は本論2の合図。",
      "grammar": "① Second, = 本論2の列挙副詞(First と同型)。② improvements は可算複数=「各方面での改善」。improvement in 〜 で前置詞は in(advance in と同じパターン)。③ energy efficiency = 無冠詞・不可算の抽象名詞のかたまり。④ are reducing = 進行形で進行中の変化(本論1と同じ発想)。⑤ waste = 「無駄・浪費」の意味では不可算・無冠詞。「廃棄物」の意味でも不可算。⑥ considerably = 「かなり・大幅に」。significantly / substantially と並ぶ程度副詞で、文末に置いて reduce を修飾。",
      "writing": "本論2のトピックセンテンスも Second, improvements in X are reducing/raising Y considerably. の同型で書けば、採点者に構成が一目で伝わる。理由を improvements in 〜 / advances in 〜 と名詞化して主語に立てるのが1級の文体。"
    },
    {
      "en": "By adopting smarter appliances and better insulation, societies can do more with less.",
      "ja": "より賢い機器や優れた断熱を採り入れることで、社会はより少ないエネルギーでより多くをこなせる。",
      "structure": "文頭に By + 動名詞句(手段)。主節は S=societies、V=can do、O=more。with less が付帯の前置詞句。",
      "grammar": "① By + 動名詞 = 「〜することによって」の手段表現。主節の主語 societies が adopting の意味上の主語になっている(分詞構文と同じ一致ルール)。② smarter appliances and better insulation = 比較級の前置修飾を並列。appliances(家電・機器)は可算複数、insulation(断熱材)は不可算なので無冠詞単数。可算と不可算を and で並べても問題ない。③ societies = 無冠詞複数の総称「社会というもの一般」。④ can do more with less = 「より少ないもので、より多くを成す」の警句的な対句。more / less はどちらも名詞的に使われた比較級で、あえて目的語を言わないことで格言らしい切れ味が出る。",
      "writing": "By + 動名詞, S can 〜 は「手段→効果」を1文で言う万能テンプレ。By adopting X and Y, societies can 〜 の形で理由の説明文に流用できる。do more with less は効率・省資源系のテーマでそのまま使える決め文句として暗記推奨。"
    },
    {
      "en": "Admittedly, some argue that demand will always outstrip efficiency gains.",
      "ja": "確かに、需要は常に効率の向上を上回ると主張する人もいる。",
      "structure": "SVO。S=some、V=argue、O=that節。that節内は S(demand) + will always outstrip + O(efficiency gains)。Admittedly は譲歩の文副詞。",
      "grammar": "① Admittedly, = 「確かに〜ではあるが」と反対意見を認める譲歩の文副詞。次の However とセットで「譲歩→反論」を作る。② some argue that 〜 = some (people) の people 省略。「〜と主張する人もいる」で反対派を登場させる定番。③ will always outstrip = 未来の一般的予測の will + 頻度副詞 always(助動詞の直後が定位置)。outstrip = 「〜を上回る・追い越す」で outweigh の仲間の out- 動詞。④ demand は不可算・無冠詞(2文目と同じ)。⑤ efficiency gains = 「効率の向上分」。gain は可算で、複数回・複数分野の改善分なので複数形。",
      "writing": "本論のどこか1段落に Admittedly, some argue that 〜. However, ... の譲歩→反論を必ず1セット入れる。これがあるだけで「反対意見も考慮した」ことが示せて説得力が跳ね上がる。some argue that は反対派の主張を1文で要約する箱として使う。"
    },
    {
      "en": "However, government regulations on efficiency have already curbed consumption significantly in many nations.",
      "ja": "しかし効率に関する政府の規制は、多くの国ですでに消費を大きく抑制してきた。",
      "structure": "SVO。S=government regulations on efficiency、V=have curbed(現在完了)、O=consumption。However は前文の譲歩を切り返す接続副詞。",
      "grammar": "① However, = 譲歩からの反転。文頭+カンマで独立させる(接続詞 but と違い文を繋げないので注意)。② government regulations = 無冠詞複数「各国の政府規制(一般)」。regulation は個々の規制なら可算。on は「〜に関する」の前置詞。③ have already curbed = 現在完了+already で「すでに〜し終えている」という実績の提示。反論は未来の推測(will always outstrip)に対し、完了形の事実で切り返すという時制の対比が効いている。④ curb = 「抑制する」。reduce の格上げ語彙。⑤ consumption = 不可算・無冠詞。⑥ significantly = considerably の言い換え(同じ副詞の連続使用を回避)。⑦ in many nations = 可算複数。countries の言い換え。",
      "writing": "Admittedly への切り返しは However, [反証となる事実] have already + 過去分詞 の現在完了が強い。「相手の予測 vs こちらの実績」という構図が作れる。government regulations on X have already curbed Y は政策系テーマ全般に流用可。"
    },
    {
      "en": "Finally, governments are increasingly investing in research into future energy sources.",
      "ja": "最後に、政府はますます将来のエネルギー源の研究に投資している。",
      "structure": "SV(自動詞+前置詞句)。S=governments、V=are investing、in research が投資先、into future energy sources が research の対象を示す前置詞句。Finally, は本論3の合図。",
      "grammar": "① Finally, = 本論最終段落の列挙副詞。Third, より「これで最後」というまとめ感が出る。② are increasingly investing = 進行形+increasingly「ますます〜しつつある」。increasingly は be と -ing の間が定位置で、趨勢の強まりを一語で表す論述頻出副詞。③ invest in 〜 = 「〜に投資する」。前置詞 in とセット。④ research = 不可算・無冠詞(× a research / × researches)。研究の対象は research into / on 〜 で示す。⑤ future energy sources = 可算複数「将来の(複数の)エネルギー源」。source of energy の言い換え。",
      "writing": "Finally, governments are increasingly investing in 〜 は「第三の理由=将来への投資」の書き出しにそのまま使える。increasingly は is/are と動詞の間に挟むだけで趨勢感が出るお得な一語なので、各エッセイ1回は使いたい。"
    },
    {
      "en": "Nuclear fusion and advanced storage technologies promise abundant power in the coming decades.",
      "ja": "核融合や先進的な蓄電技術は、今後数十年で豊富な電力をもたらすと期待される。",
      "structure": "SVO。S=Nuclear fusion and advanced storage technologies(並列主語)、V=promise、O=abundant power。in the coming decades は時の前置詞句。",
      "grammar": "① 並列主語は複数扱い → promise に三単現の -s なし。② nuclear fusion = 無冠詞・不可算(現象・技術の名前)。storage technologies は可算複数「各種の蓄電技術」。③ promise + O = 「〜を約束する=〜をもたらすと見込まれる」。無生物主語が promise を取ると「期待させる」という含みになり、will bring より上品な未来予測になる。④ abundant power = 不可算の power(電力)に形容詞 abundant(豊富な)。⑤ in the coming decades = 「今後数十年で」。coming は現在分詞の形容詞用法。decades と複数にして時間幅を出す。the が付くのは「これから来る」と特定されるから。",
      "writing": "未来予測は S will bring 〜 ばかりでなく [技術名] promise(s) abundant/cleaner 〜 in the coming decades の無生物主語+promise で書くと引き締まる。in the coming decades は in the future の格上げとして常備する。"
    },
    {
      "en": "The substantial public funding now directed at fusion research demonstrates this serious commitment.",
      "ja": "今や核融合研究に向けられている多額の公的資金が、この真剣な取り組みを示している。",
      "structure": "SVO。S=The substantial public funding (now directed at fusion research)、V=demonstrates、O=this serious commitment。directed 以下は過去分詞の後置修飾。",
      "grammar": "① The ... funding now directed at 〜 = funding (that is) now directed at 〜 の関係詞+be 省略。過去分詞 directed の後置修飾で「〜に向けられている資金」。direct A at B(AをBに向ける)の at が残る。② the が付くのは directed 以下の後置修飾で「どの資金か」が特定されるから。後置修飾→the の典型。③ funding = 不可算(× fundings)。money 系の抽象名詞。④ now は分詞の直前に置いて「今まさに」を強調。⑤ demonstrates = 三単現(主語 funding は単数扱い)。show の格上げで「証拠として示す」。⑥ this serious commitment = 段落の主張(政府の本気の投資)を this + 抽象名詞で圧縮して受ける。commitment は「関与・本気の取り組み」で、ここでは不可算的に使用。",
      "writing": "段落の締めは The [証拠] now directed at / invested in 〜 demonstrates this commitment. のように「事実→主張の裏づけ」で閉じると強い。段落内容を this + 抽象名詞(this commitment / this trend / this shift)で一語に畳む技は結束性の得点源。"
    },
    {
      "en": "In conclusion, thanks to expanding renewables, greater efficiency, and ongoing investment in innovation, governments are well positioned to meet rising energy demands.",
      "ja": "結論として、拡大する再生可能エネルギー、より高い効率、そして革新への継続的な投資のおかげで、政府は増大するエネルギー需要に応える好位置にある。",
      "structure": "In conclusion + thanks to の前置詞句(3つの名詞句をA, B, and Cで並列)+主節。主節は S=governments、V=are positioned(受動)、to meet 以下が不定詞。",
      "grammar": "① In conclusion, = 結論段落の合図(無冠詞の決まり文句)。② thanks to + 名詞3連 = 本論3理由を expanding renewables(理由1)/ greater efficiency(理由2)/ ongoing investment in innovation(理由3)と名詞句に圧縮して再掲する型。A, B, and C の3点並列はオックスフォードカンマ付き。③ renewables = renewable energy sources を一語にした複数名詞「再エネ」。形容詞の名詞化。④ be well positioned to do = 「〜する態勢が整っている」。受動態なのは「(状況によって)良い位置に置かれている」から。well は過去分詞を強める副詞。⑤ rising energy demands = 現在分詞 rising の前置修飾。demand はここでは複数形で「各方面からの需要」。",
      "writing": "結論1文目は In conclusion, thanks to [動名詞/名詞化した理由1], [理由2], and [理由3], S is well positioned to 〜. が完成テンプレ。本論のコピペ禁止なので、各理由を2〜3語の名詞句に圧縮し直すのがポイント。be well positioned to は前向き結論の格上げ表現。"
    },
    {
      "en": "I am therefore convinced that, with sustained effort, the world can secure the energy its future requires.",
      "ja": "したがって私は、持続的な努力があれば、世界はその未来が必要とするエネルギーを確保できると確信している。",
      "structure": "SVC+that節。S=I、V=am convinced、that節が確信の内容。that の直後に with sustained effort が挿入され、節本体は S(the world) + can secure + O(the energy (that) its future requires)。",
      "grammar": "① I am therefore convinced that 〜 = 最終文の立場再宣言。convinced は「確信させられた」の過去分詞由来で be convinced that が定型。therefore は be動詞の直後に挿入するとこなれる。② with sustained effort = 「持続的な努力があれば」の条件を表す with。カンマで挟んだ挿入句。sustained は過去分詞の形容詞化、effort はここでは不可算的に「努力(という営み)」。③ the energy its future requires = the energy (that) its future requires。目的格の関係代名詞 that の省略。requires の三単現(主語 its future は単数)。energy が the なのは関係詞節で「どのエネルギーか」限定されるため。④ its = the world's。無生物にも所有格 its を使って引き締める。",
      "writing": "最終文は I am therefore convinced that, with [条件], S can 〜. で締める。therefore の挿入位置(be動詞の直後)と、目的格関係代名詞の省略(the energy its future requires)は1級らしさが出る小技。最後を未来への展望で終えると読後感が良い。"
    }
  ],
  "7": [
    {
      "en": "Humanity faces a growing array of challenges, ranging from disease to climate change, and there is ongoing debate over whether science should be entrusted with solving them.",
      "ja": "人類は病気から気候変動まで増え続ける課題に直面しており、その解決を科学に委ねるべきかについて議論が続いている。",
      "structure": "重文。前半 S=Humanity、V=faces、O=a growing array of challenges。ranging from A to B は challenges を修飾する現在分詞句(挿入)。and 以下は There is 構文で S=ongoing debate、over whether 以下が議論の中身。",
      "grammar": "① Humanity = 無冠詞・不可算「人類」。単数扱いなので faces に三単現の -s。② a growing array of 〜 = 「増え続ける一連の〜」。array(勢揃い)は可算で a が付き、of の後に可算複数(challenges)。a wide range of の格上げ。③ ranging from A to B = 現在分詞句の後置修飾「AからBに及ぶ」。range from A to B(AからBにわたる)が分詞化した形で、カンマで挟んで例示を差し込む。disease も climate change も無冠詞(病気一般・現象名)。④ ongoing debate = 不可算の debate に「進行中の」の形容詞。much debate の変化形。⑤ whether節は前置詞 over の目的語(if 不可)。⑥ should be entrusted with 〜 = 助動詞+受動態。entrust A with B(AにBを任せる)の受動で、with 以下に動名詞句 solving them。「任せるべきか」の主体をぼかして中立の問いにしている。⑦ them = challenges を受ける代名詞。",
      "writing": "序論1文目で背景+お題言い換えを1文に纏める上級型。S faces a growing array of challenges, ranging from X to Y は社会・科学系テーマの導入に丸ごと流用可。ranging from A to B は具体例を2つ滑り込ませつつ語数も稼げる便利な分詞句。"
    },
    {
      "en": "In my view, science should indeed be relied on as the principal means of addressing the problems confronting humankind.",
      "ja": "私の考えでは、人類が直面する問題に対処する主要な手段として、科学を頼るべきである。",
      "structure": "受動態のSV。S=science、V=should be relied on。as 以下は「〜として」の資格を示す前置詞句。confronting humankind は problems を修飾する現在分詞の後置修飾。",
      "grammar": "① In my view = 立場表明の合図(I think の格上げ)。② should indeed be relied on = 助動詞+受動態。rely on は「自動詞+前置詞」なので受動にすると on が文末(節末)に残る(be relied on)。indeed は助動詞の直後で主張を強める。③ as the principal means = 「主要な手段として」。means(手段)は単複同形で、ここでは単数。the が付くのは principal(第一の)で唯一に特定されるから。最上級・序数・principal/main/primary には the が付く。④ means of + 動名詞 = 「〜する手段」。of addressing と動名詞が続く。address = 「(問題に)対処する」で deal with の格上げ。⑤ the problems confronting humankind = 現在分詞の後置修飾。the problems (that are) confronting 〜「人類に立ちはだかる問題」。confront は「(問題が人に)立ちはだかる」の意味では問題側が主語になるので現在分詞。humankind = 無冠詞・不可算(humanity の言い換え)。",
      "writing": "テーゼは S should indeed be relied on as the principal means of -ing 〜 の受動+as 句が使える。「Xに頼るべきか」系のお題への Yes は、この be relied on as を使うとお題の動詞をそのまま活かしつつ格を上げられる。humanity → humankind の同語反復回避も見習う。"
    },
    {
      "en": "First, science offers solutions grounded in evidence rather than speculation.",
      "ja": "第一に、科学は推測ではなく証拠に基づく解決策を提供する。",
      "structure": "SVO。S=science、V=offers、O=solutions。grounded in 〜 は solutions を修飾する過去分詞の後置修飾。evidence rather than speculation は前置詞 in の目的語の対比並列。",
      "grammar": "① First, = 本論1の列挙副詞。② science は無冠詞・不可算(学問分野名)で単数扱い → offers に -s。③ solutions = 可算複数「(数々の)解決策」。④ grounded in 〜 = 過去分詞の後置修飾。solutions (that are) grounded in 〜「〜に根ざした解決策」。be grounded in が元の形で、based on の格上げ。⑤ evidence = 不可算(× evidences / × an evidence)。1級ライティング頻出の不可算名詞筆頭。⑥ A rather than B = 「BではなくA」の対比。前置詞 in の目的語の位置で evidence と speculation(憶測、これも不可算)を天秤にかける。not B but A より引き締まる。",
      "writing": "理由のトピックセンテンスに [名詞] grounded in evidence rather than speculation の対比を仕込むと、1文で「何が優れているか」の軸が立つ。X rather than Y は理由付けのあらゆる場面で使える対比の万能句。based on より grounded in を選ぶのが語彙点狙い。"
    },
    {
      "en": "Unlike tradition or intuition, the scientific method tests hypotheses rigorously before conclusions are accepted.",
      "ja": "伝統や直感とは異なり、科学的方法は結論を受け入れる前に仮説を厳密に検証する。",
      "structure": "SVO。文頭 Unlike 〜 は対比の前置詞句。S=the scientific method、V=tests、O=hypotheses。before 以下は時の従属節(受動態)。",
      "grammar": "① Unlike + 名詞 = 「〜とは異なり」の対比を1語で立ち上げる前置詞。tradition / intuition はどちらも無冠詞・不可算の抽象名詞。② the scientific method = the が付くのは「科学的方法」という確立された唯一の方法論を指すから。制度・体系として共有されているものには the。③ tests に三単現の -s(主語は単数)。④ hypotheses = hypothesis の不規則複数(-is → -es)。crisis/crises、analysis/analyses と同じギリシャ語型。⑤ rigorously = 「厳密に」。strictly の格上げ副詞で動詞の直後。⑥ before conclusions are accepted = 時の副詞節。受動態なのは「誰が」受け入れるかより「受け入れられる」プロセス自体が主題だから。conclusions は無冠詞複数の総称。",
      "writing": "Unlike [比較対象], S 〜 は自説の優位性を1文で示す型。理由の2文目で「他の選択肢と違ってXは〜」と対比すると、理由に立体感が出る。hypotheses の複数形は書けると差がつくスペリング。"
    },
    {
      "en": "For instance, the rapid development of vaccines during the COVID-19 pandemic demonstrated how systematic research can save millions of lives within a remarkably short period.",
      "ja": "例えば、コロナ禍におけるワクチンの急速な開発は、体系的な研究がいかに短期間で数百万の命を救えるかを示した。",
      "structure": "SVO。S=the rapid development of vaccines during the COVID-19 pandemic、V=demonstrated、O=how節(間接疑問)。how節内は S(systematic research) + can save + O(millions of lives)。",
      "grammar": "① For instance, = For example の言い換え。具体例の合図。② the rapid development of vaccines = 「the+形容詞+名詞化+of」で出来事を名詞句に固める論述の基本形。development はここでは「開発」で of で対象を示す。vaccines は可算複数。③ the COVID-19 pandemic = 歴史上の特定の出来事なので the。④ demonstrated = 過去形。パンデミックという過去の出来事の実績だから。⑤ demonstrate how 〜 = how節(間接疑問)を目的語に取る。「いかに〜かを示した」。節内は平叙文の語順。⑥ millions of lives = 「数百万の命」。millions と複数+of で概数の多さ。life の複数 lives。⑦ within a remarkably short period = within は「〜以内に」。remarkably は形容詞 short を強める副詞。period は可算で a。",
      "writing": "具体例は The rapid development of X during [出来事] demonstrated how S can 〜 の型で、「過去の実例(過去形)→そこから言える一般論(can+現在)」の時制の切り替えを見せる。COVID-19 のワクチン開発は科学・技術・国際協力どのテーマでも使い回せる万能実例。"
    },
    {
      "en": "Second, science possesses a unique capacity for self-correction.",
      "ja": "第二に、科学には自己修正という独自の能力がある。",
      "structure": "SVO。S=science、V=possesses、O=a unique capacity。for self-correction が capacity の中身を示す前置詞句。",
      "grammar": "① Second, = 本論2の列挙副詞(既出)。② possesses = have の格上げ動詞「備えている」。三単現の -s。③ a unique capacity for 〜 = capacity(能力)は可算で、初出なので a。「〜への能力」は capacity for + 名詞/動名詞。unique の前でも冠詞は a(発音が /juː/ で子音始まりだから an ではない)。④ self-correction = self- + 名詞のハイフン合成語。不可算・無冠詞。⑤ 短いトピックセンテンスは後続の説明文とのメリハリを生む。全文を長くする必要はない。",
      "writing": "S possesses a unique capacity for 〜 は「Xにしかない強み」を述べるトピックセンテンスの型。have と言いたくなったら possess、ability と言いたくなったら capacity と、一段上の語彙に置き換える癖をつける。トピックセンテンスは短く鋭くで良い。"
    },
    {
      "en": "When errors emerge, peer review and repeated experimentation gradually refine our understanding.",
      "ja": "誤りが生じると、査読と繰り返しの実験が理解を徐々に洗練していく。",
      "structure": "When節(従属)+主節SVO。主節は S=peer review and repeated experimentation(並列主語)、V=refine、O=our understanding。",
      "grammar": "① When errors emerge = 「誤りが現れるとき(いつでも)」の一般条件。現在形で普遍の法則を語る。errors は可算複数、emerge は「現れる」の自動詞(appear の格上げ)。② peer review = 無冠詞・不可算(制度・営みの名前)。experimentation も -tion の不可算抽象名詞で「実験という営み」。個々の実験 experiment(可算)との使い分けに注意。repeated は過去分詞の形容詞化「繰り返される」。③ 並列主語で複数扱い → refine に -s なし。④ gradually = 「徐々に」。過程の進行を示す副詞で動詞の前。⑤ refine = 「洗練する・磨き上げる」。improve の格上げ。⑥ our understanding = 不可算。「我々の理解」と our で人類全体を巻き込む。",
      "writing": "メカニズムの説明は When X emerges, A and B gradually refine 〜 のように「条件→プロセス」の現在形で書く。無生物並列主語(制度+営み)を主語に立てると、人を主語にした平板な文より論述らしくなる。refine our understanding はそのまま使える知識系コロケーション。"
    },
    {
      "en": "Consequently, even flawed theories are eventually replaced by more accurate ones, a process that no other system of knowledge can replicate with comparable reliability.",
      "ja": "その結果、欠陥のある理論でさえ最終的にはより正確なものに置き換えられる。これは他のどんな知識体系も同等の信頼性では再現できない過程である。",
      "structure": "受動態のSV+同格名詞句。S=even flawed theories、V=are replaced、by 以下が動作主。カンマ後の a process 〜 は前文全体を言い換える同格(要約同格)で、that 以下は process を先行詞とする関係詞節。",
      "grammar": "① Consequently, = 「その結果」の接続副詞。so の格上げで、前文のプロセスの帰結を導く。② even = 「〜でさえ」。flawed(欠陥のある=過去分詞の形容詞化)theories を強調。③ are eventually replaced by 〜 = 受動態。置き換える主体(科学者たち)より「置き換わる」現象が主題なので受動。eventually は「最終的には」で be と過去分詞の間。④ more accurate ones = ones は theories の反復を避ける代名詞。比較級 more accurate。⑤ カンマ+a process that 〜 = 直前の文内容全体を a process と名詞で受け直す「要約同格」。which is を使わずに文を畳み掛ける1級構文。⑥ no other system of knowledge can 〜 = no other + 単数名詞で「他のどの〜も…ない」。最上級相当の否定比較。⑦ replicate = 「再現する」。copy の格上げ。⑧ with comparable reliability = 「同等の信頼性をもって」。with + 抽象名詞で様態を表す。comparable = 「匹敵する」。",
      "writing": "文末に , a process that no other X can replicate の要約同格を付けるのは1級上位の型。「, something that 〜」「, a trend that 〜」として自分の文にも移植できる。no other + 単数 + can 〜 は「唯一無二」を主張する強い言い回しで、最上級の言い換えとして便利。"
    },
    {
      "en": "Finally, the pressing scale of modern problems leaves few realistic alternatives.",
      "ja": "最後に、現代の問題の差し迫った規模を考えると、現実的な代替策はほとんど残されていない。",
      "structure": "SVO。S=the pressing scale of modern problems、V=leaves、O=few realistic alternatives。Finally, は本論3の合図。",
      "grammar": "① Finally, = 本論3の列挙副詞(既出)。② the pressing scale of 〜 = 「the+形容詞+抽象名詞+of」の名詞化主語。pressing = 「差し迫った」(urgent の格上げ、press「押す」の現在分詞由来)。scale は of句で特定されるので the。③ leaves = 無生物主語+leave O「(状況が)Oを残す」。「状況のせいで〜しか残らない」を人を出さずに言う無生物主語構文。三単現の -s(主語は scale で単数)。④ few + 可算複数 = 「ほとんどない」の否定的な few(a few「少しはある」との違いに注意)。⑤ alternatives = 可算複数「代替策」。alternative to 〜 で「〜の代わり」。",
      "writing": "第三の理由を「他に選択肢がない」で立てるときの型。The pressing scale of [問題] leaves few realistic alternatives. はこのまま暗記して、消去法の理由付けに使う。無生物主語+leave / few の否定用法は両方1級の頻出ポイント。"
    },
    {
      "en": "From an environmental standpoint, only advanced technologies such as renewable energy and carbon capture can meaningfully reduce emissions.",
      "ja": "環境の観点から見れば、再生可能エネルギーや炭素回収といった先進技術だけが排出量を有意義に削減できる。",
      "structure": "SVO。文頭 From an environmental standpoint は視点の前置詞句。S=only advanced technologies (such as 〜)、V=can reduce、O=emissions。",
      "grammar": "① From an environmental standpoint = 「環境の観点から」。standpoint / perspective / viewpoint はどれも可算で a が付く。理由を特定の視点に限定して深掘りする論述の万能句。② only + 主語 = 「〜だけが」。主語を only で限定すると排他的な主張になる(文頭の Only + 助動詞倒置は使わず、平叙のまま)。③ such as A and B = 「AやBのような」の例示。for example より名詞句に密着して例を挙げられる。renewable energy(不可算)と carbon capture(不可算)の並列。④ can meaningfully reduce = 助動詞と動詞の間に副詞 meaningfully(有意義に・実質的に)を挟む。significantly 系の言い換え。⑤ emissions = 慣用的に複数形「排出(量)」。CO2 emissions / greenhouse gas emissions と覚える。",
      "writing": "From an [分野] standpoint, は理由の説明を専門的に見せる万能句(economic / environmental / educational などに差し替え)。only [手段] can 〜 は「それしかない」と迫る消去法の決め文。such as A and B の例示は for instance の文を立てる余裕がないときの省スペース技。"
    },
    {
      "en": "Without scientific innovation, humanity would lack the practical tools needed to confront these threats.",
      "ja": "科学的革新なしには、人類はこれらの脅威に立ち向かう実用的な手段を欠くことになる。",
      "structure": "仮定法のSVO。Without 〜 が if節の代用。S=humanity、V=would lack、O=the practical tools。needed to confront 〜 は tools を修飾する過去分詞の後置修飾。",
      "grammar": "① Without 〜, S would + 原形 = if it were not for 〜 の代用となる仮定法過去。「もし〜がなければ…だろう」と現実に反する仮定で科学の必要性を裏から証明する。would が仮定法の目印。② scientific innovation = 無冠詞・不可算(概念)。③ humanity = 無冠詞・不可算(既出)。④ lack = 他動詞「〜を欠く」(× lack of を動詞に混ぜない。lack O か suffer from a lack of O)。⑤ the practical tools needed to 〜 = 過去分詞の後置修飾。tools (that are) needed to confront 〜「立ち向かうのに必要な手段」。needed の後置修飾で特定されるので the。⑥ confront = 「立ち向かう」。face の格上げ。⑦ these threats = 前文までの内容(気候変動など)を this/these + 名詞で受ける結束の技。",
      "writing": "本論の締めに Without X, S would lack 〜 の仮定法を1発入れると、「Xがない世界」を見せて必要性を際立たせられる。仮定法は使いどころが難しいが、この Without型なら安全に運用できる。the tools needed to confront these threats も丸ごと流用可。"
    },
    {
      "en": "In conclusion, although science alone cannot resolve every issue, its evidence-based methods, capacity for self-correction, and technological power make it the most dependable instrument available.",
      "ja": "結論として、科学だけであらゆる問題を解決できるわけではないが、その証拠に基づく方法、自己修正の能力、そして技術力ゆえに、それは利用可能な最も信頼できる手段である。",
      "structure": "although節(譲歩)+主節SVOC。主節は S=its evidence-based methods, capacity for self-correction, and technological power(3並列)、V=make、O=it、C=the most dependable instrument。available は instrument の後置修飾。",
      "grammar": "① In conclusion, although 〜 = 結論冒頭で軽く譲歩してから総括する型。② science alone = 「科学だけ」。alone を名詞の直後に置く用法(only science と同義だがこなれる)。③ cannot resolve every issue = not + every の部分否定「あらゆる問題を解決できるわけではない」。全否定(no issue)ではない点がミソ。④ 3並列の主語で本論3理由を再掲: evidence-based methods(理由1)/ capacity for self-correction(理由2)/ technological power(理由3)。evidence-based はハイフン合成の複合形容詞。⑤ make it the most dependable instrument = make OC の第5文型「OをCにする」。it = science。⑥ the most dependable ... available = 最上級+available の後置。available は「入手可能な」の意味で名詞の直後に置ける形容詞(the best option available)。dependable = reliable の言い換え。",
      "writing": "結論1文目の完成形テンプレ: In conclusion, although X alone cannot 〜, its A, B, and C make it the most [形容詞] [名詞] available. 3理由を名詞句で並べて make OC で畳む。available の後置は語彙・語法点を拾える小技なので the most effective tool available の形で常備する。"
    },
    {
      "en": "Therefore, humankind should continue to place its trust in science.",
      "ja": "したがって、人類は科学への信頼を持ち続けるべきである。",
      "structure": "SVO。Therefore は結論の接続副詞。S=humankind、V=should continue、to place 以下が continue の目的語(不定詞)。",
      "grammar": "① Therefore, = 「したがって」。最終文で提言を導く接続副詞。② humankind = 無冠詞・不可算(humanity の言い換え、既出)。③ should + continue to do = 提言の should。「〜し続けるべきだ」。continue は to不定詞も動名詞も取るが、書き言葉では to不定詞が優勢。④ place its trust in 〜 = trust(信頼、不可算)を使った格上げ表現「〜に信頼を置く」。trust science の一語動詞を place one's trust in と名詞構文に開くと重厚になる。its = humankind's。⑤ お題の rely on science を place its trust in science と言い換えて締める同語反復回避。",
      "writing": "最終文は Therefore, S should continue to 〜. の提言で締めるのが基本形。動詞1語(trust)を place one's trust in のような「動詞+名詞+前置詞」に開く名詞構文は、結論で表現を格上げする定番の技として盗む。"
    }
  ],
  "8": [
    {
      "en": "Inequality remains one of the most persistent features of modern societies, and governments often respond by introducing social welfare programs.",
      "ja": "不平等は現代社会の最も根強い特徴の一つであり、政府はしばしば社会福祉制度を導入して対応する。",
      "structure": "重文。前半 SVC: S=Inequality、V=remains、C=one of the most persistent features。後半 SV: S=governments、V=respond、by introducing 〜 が手段の前置詞句。",
      "grammar": "① Inequality = 無冠詞・不可算の抽象名詞。② remains + C = 「依然として〜のままである」。be動詞の格上げで「昔から変わらず」のニュアンスが乗る。三単現の -s。③ one of the most + 形容詞 + 複数名詞 = 「最も〜なものの一つ」。of の後は必ず複数形(× one of the most persistent feature)。最上級なので the。④ persistent = 「根強い・しつこい」。⑤ modern societies = 複数形で「現代の(各)社会」。⑥ respond by + 動名詞 = 「〜することで対応する」。手段の by + -ing。⑦ social welfare programs = 無冠詞複数の総称「社会福祉制度(一般)」。program は可算。",
      "writing": "序論1文目の型: [抽象名詞] remains one of the most persistent features of modern societies. は社会問題系のお題ならほぼ何にでも使える汎用導入。remain を使うと「昔からの未解決問題」という枠組みが一言で立つ。respond by -ing もセットで覚える。"
    },
    {
      "en": "Some question their effectiveness, yet I firmly believe that such programs do help reduce inequality.",
      "ja": "その有効性を疑う声もあるが、私はそうした制度が不平等を減らすのに確かに役立つと固く信じている。",
      "structure": "重文。前半 SVO: S=Some、V=question、O=their effectiveness。yet で逆接し、後半は S=I、V=believe、O=that節。that節内は such programs + do help + reduce(原形)。",
      "grammar": "① Some = some people の省略で「〜する人もいる」。反対派を1語で登場させる。② question = 動詞「疑問視する」(doubt の言い換え)。名詞と同形の動詞用法。③ their effectiveness = their は programs を先取り(前文の welfare programs)。effectiveness は不可算。④ yet = 「しかし」の等位接続詞。but より書き言葉らしく、譲歩からの反転に最適。⑤ I firmly believe that 〜 = テーゼの定番。firmly が believe を強める。⑥ do help = 強調の do。「(疑う人もいるが)実際に役立つのだ」と疑念への反論として動詞を強調する。反対派に触れた直後だからこそ効く。⑦ help (to) reduce = help + 原形不定詞。help の後の to は省略可能で、省略形の方が現代英語では普通。",
      "writing": "序論2文目=反対派+テーゼの圧縮型: Some question 〜, yet I firmly believe that S do(es) help 〜. 強調の do は「疑いに答える」文脈でだけ使うと効果的で、乱発しないこと。help + 原形もセットで手癖にする。"
    },
    {
      "en": "First, welfare programs provide a safety net that prevents the most vulnerable from falling into extreme poverty.",
      "ja": "第一に、福祉制度は最も弱い立場の人々が極度の貧困に陥るのを防ぐ安全網を提供する。",
      "structure": "SVO。S=welfare programs、V=provide、O=a safety net。that 以下は safety net を先行詞とする関係詞節で、節内は prevent O from -ing の構文。",
      "grammar": "① First, = 本論1の合図(既出)。② provide a safety net = 「安全網を提供する」。safety net は可算で初出なので a。制度論の頻出メタファー。③ that prevents = 主格の関係代名詞+三単現の -s(先行詞 a safety net は単数)。④ prevent O from -ing = 「Oが〜するのを防ぐ」。from とセットの語法で、stop/keep/prohibit O from -ing と同族。⑤ the most vulnerable = the + 形容詞(最上級)で「最も弱い人々」。the + 形容詞 = 「〜な人々」(the poor, the wealthy)の用法に最上級を重ねた形。⑥ falling into extreme poverty = fall into 〜「(悪い状態に)陥る」。poverty は不可算・無冠詞。",
      "writing": "制度・政策の擁護は provide a safety net that prevents X from -ing が鉄板の1文。the + 形容詞(the most vulnerable / the poor / the elderly)は「人々」を上品に言う省スペース技として多用できる。prevent A from B の from は絶対に落とさない。"
    },
    {
      "en": "Unemployment benefits and public health care ensure that even those without income can access basic necessities.",
      "ja": "失業給付や公的医療は、収入のない人でも基本的な必需品にアクセスできることを保証する。",
      "structure": "SVO。S=Unemployment benefits and public health care(並列主語)、V=ensure、O=that節。that節内は S(those without income) + can access + O(basic necessities)。",
      "grammar": "① unemployment benefits = 複数形が慣用「失業給付」。benefit は「給付金」の意味で可算。public health care は不可算・無冠詞。② 並列主語で複数扱い → ensure に -s なし。③ ensure that 〜 = 「〜を確実にする・保証する」。make sure の格上げで、制度の機能説明に最適。④ even those without income = those = people の代用「〜な人々」。those who have no income を without の前置詞句で圧縮。even で「そういう人でさえ」と強調。income は不可算・無冠詞。⑤ access = 他動詞「〜を利用する」(× access to を動詞に混ぜない。動詞なら access O、名詞なら access to O)。⑥ basic necessities = 複数形「生活必需品」。necessity は「必需品」の意味で可算。",
      "writing": "具体的な制度名を並列主語にして [制度A] and [制度B] ensure that even those without X can 〜 と書くと、抽象論が一気に具体化する。those without 〜 は関係詞節を使わず「〜のない人々」を言える圧縮技。ensure that は政策系の万能動詞。"
    },
    {
      "en": "For instance, in many Nordic countries, generous welfare systems have produced some of the smallest income gaps in the world.",
      "ja": "例えば、多くの北欧諸国では手厚い福祉制度が世界で最も小さい所得格差を生み出してきた。",
      "structure": "SVO。For instance と in many Nordic countries が文頭の副詞句。S=generous welfare systems、V=have produced(現在完了)、O=some of the smallest income gaps。",
      "grammar": "① For instance, = 具体例の合図(既出)。② in many Nordic countries = 場所の副詞句を文頭に出して舞台を先に設定。Nordic は固有形容詞なので大文字。③ generous = 「(制度が)手厚い」。人以外にも使える generous はコロケーションの得点源。④ have produced = 現在完了。「長年かけて生み出してきた(結果が今ある)」という実績の提示。具体例を完了形で書くと歴史的裏づけ感が出る。⑤ some of the smallest ... in the world = 「世界で最も小さい部類の〜」。最上級を some of + 複数でぼかすと、断定しすぎない正確な言い方になる(× the smallest と言い切ると反例で崩れる)。⑥ income gaps = 可算複数「所得格差」。gap between rich and poor の圧縮形。",
      "writing": "実例は in many Nordic countries + 現在完了が安全牌。some of the smallest/largest X in the world は「世界有数の」を正確に言う型で、断定を避けつつ最上級の強さを出せる。北欧の福祉、中国の太陽光など「国+実績」のストックを持っておくと15分で書ける。"
    },
    {
      "en": "Second, these programs promote equality of opportunity, not merely equality of outcome.",
      "ja": "第二に、これらの制度は結果の平等だけでなく機会の平等を促進する。",
      "structure": "SVO。S=these programs、V=promote、O=equality of opportunity。カンマ後の not merely equality of outcome は目的語への対比の追い込み。",
      "grammar": "① Second, = 本論2の合図(既出)。② these programs = 前段落の welfare programs を these で受ける結束。③ promote = 「促進する」。encourage の言い換えで政策系の基本動詞。④ equality of opportunity / equality of outcome = 「機会の平等/結果の平等」。政治哲学の対概念で、equality は不可算・無冠詞、of の後の opportunity / outcome も概念として無冠詞。⑤ A, not merely B = 「Bだけでなく(それ以上に)A」。not only B but also A の圧縮形で、カンマ後に not merely を置いて対比を後出しする引き締まった語順。merely = only の格上げ。",
      "writing": "X, not merely Y の後置対比は、目的語を言い切ってから「単なるYではなく」と追い打ちする1級らしい構文。equality of opportunity vs equality of outcome の対概念は教育・福祉・格差テーマの必須ボキャブラリーなのでペアで暗記する。"
    },
    {
      "en": "Free or subsidized education allows children from low-income families to acquire skills and compete fairly in the labor market.",
      "ja": "無償または補助のある教育は、低所得家庭の子どもが技能を身につけ、労働市場で公平に競争することを可能にする。",
      "structure": "SVOC(allow O to do)。S=Free or subsidized education、V=allows、O=children from low-income families、C=to acquire ... and (to) compete ...(不定詞2つの並列)。",
      "grammar": "① Free or subsidized education = 形容詞2つ(free / subsidized)の or 並列。subsidized は過去分詞の形容詞化「補助金を受けた」。education は不可算・無冠詞。② allows O to do = 「Oが〜することを可能にする」。enable/permit と同じ to不定詞を取る使役系語法。無生物主語(教育)+allow は「〜のおかげで…できる」の書き換えとして論述の主力。三単現の -s。③ children from low-income families = from で出自を表す。low-income はハイフン複合形容詞。④ to acquire skills and compete = 不定詞の並列で2つ目の to は省略。acquire = get の格上げ「習得する」。skills は可算複数。⑤ compete fairly = 自動詞+様態の副詞。⑥ the labor market = 経済の中の特定の市場として the。制度・市場には the が付きやすい(the economy, the job market)。",
      "writing": "無生物主語+allow O to do は「制度のおかげで人が〜できる」を書く最重要構文。X allows children from low-income families to 〜 は教育・福祉テーマでそのまま使える。不定詞並列の2つ目の to 省略も自然にできると文が軽くなる。"
    },
    {
      "en": "Consequently, talent rather than family wealth becomes the decisive factor in personal success.",
      "ja": "その結果、個人の成功を左右するのは家庭の富ではなく才能となる。",
      "structure": "SVC。Consequently は帰結の接続副詞。S=talent (rather than family wealth)、V=becomes、C=the decisive factor。in personal success は factor に掛かる前置詞句。",
      "grammar": "① Consequently, = 帰結の接続副詞(既出)。② talent rather than family wealth = 主語の位置での rather than 対比。「富ではなく才能が」。主語は talent なので動詞は単数受け becomes(rather than 以下は数に影響しない)。talent / wealth はどちらも不可算・無冠詞。③ the decisive factor = 「決定的要因」。decisive で唯一に特定されるので the(the main/key/primary factor と同じ理屈)。④ factor in 〜 = 「〜における要因」で前置詞は in。⑤ personal success = 不可算・無冠詞の抽象名詞。",
      "writing": "段落の締めに Consequently, A rather than B becomes the decisive factor in 〜. を置くと、理由の帰結が価値の転換(BからAへ)として鮮やかに決まる。rather than を主語に埋め込む対比は grounded in evidence rather than speculation と並ぶ頻用パターン。"
    },
    {
      "en": "Finally, welfare spending stimulates the broader economy by increasing the purchasing power of poorer households.",
      "ja": "最後に、福祉支出は貧しい世帯の購買力を高めることで経済全体を刺激する。",
      "structure": "SVO。S=welfare spending、V=stimulates、O=the broader economy。by increasing 〜 は手段の前置詞+動名詞句。",
      "grammar": "① Finally, = 本論3の合図(既出)。② welfare spending = 不可算・無冠詞。spending は動名詞由来の名詞「支出」(government spending, public spending)。③ stimulates = 「刺激する・活性化する」。経済の文脈の基本動詞。三単現の -s。④ the broader economy = 「より広い経済=経済全体」。比較級 broader で「(福祉の枠を超えた)より広範な」。economy は「一国の経済」で the。⑤ by + 動名詞 = 手段(既出)。⑥ the purchasing power of 〜 = 「購買力」。of句で特定されるので the。purchasing は動名詞の形容詞的用法。⑦ poorer households = 比較級「より貧しい」で直接的な the poor を和らげる婉曲。household = 「世帯」(family より経済統計的)。",
      "writing": "経済効果の理由は S stimulates the broader economy by increasing 〜 が型。poorer households / lower-income groups のような比較級の婉曲は、poor people と書くより成熟した文体に見える1級の作法。"
    },
    {
      "en": "From an economic standpoint, money distributed to low-income citizens is spent quickly on goods and services, which in turn supports employment.",
      "ja": "経済の観点から見れば、低所得者に分配された資金は財やサービスにすぐに使われ、それが今度は雇用を支える。",
      "structure": "受動態のSV+非制限関係詞節。S=money (distributed to low-income citizens)、V=is spent。distributed 〜 は過去分詞の後置修飾。カンマ+which は前節の内容全体を先行詞とし、in turn を挟んで supports が続く。",
      "grammar": "① From an economic standpoint, = 視点の限定句(Day 7 の environmental 版と同型)。② money distributed to 〜 = 過去分詞の後置修飾。money (that is) distributed「分配される資金」。money は不可算。③ is spent on 〜 = 受動態。spend money on の受動で on が残る。「誰が使うか」より「使われ方」が主題なので受動。④ goods and services = 経済学の定番ペア「財とサービス」。goods は常に複数形。⑤ カンマ+which = 前の節全体(金がすぐ使われること)を先行詞とする非制限用法。「そしてそのことが〜」。⑥ in turn = 「それが今度は」。因果の連鎖を示す挿入句で、which と動詞の間に置く。⑦ supports = 先行詞が「前文の内容」で単数扱い → 三単現の -s。employment は不可算・無冠詞。",
      "writing": ", which in turn supports 〜 は「A→B→C」の因果連鎖を1文で繋ぐ最重要テクニック。文を切って This supports... とするより流麗で、論理の追跡可能性も上がる。money distributed to X is spent on Y の受動+後置修飾も経済テーマの定番として丸暗記推奨。"
    },
    {
      "en": "This circulation gradually narrows the gap between rich and poor.",
      "ja": "この循環が富裕層と貧困層の差を徐々に縮める。",
      "structure": "SVO。S=This circulation、V=narrows、O=the gap。between rich and poor が gap の中身を示す前置詞句。",
      "grammar": "① This circulation = 前文の因果連鎖(分配→消費→雇用)を this + 抽象名詞で一語に圧縮して受ける結束技(Day 6 の this commitment と同型)。circulation = 「循環」で不可算だが this で特定。② narrows = 「狭める」。形容詞 narrow の動詞用法で、三単現の -s。reduce the gap より絵が浮かぶ動詞選択。③ gradually = 過程の副詞(既出)。④ the gap between rich and poor = 対句の rich and poor は慣用的に無冠詞(the rich and the poor でも可だが、between rich and poor は冠詞なしの決まり文句)。gap は between で特定されるので the。",
      "writing": "段落最終文は This + [要約名詞] + 短いSVO で切れ味よく締める。this circulation / this cycle / this process のストックを持ち、直前の複文の内容を主語1語に畳む。narrow the gap between rich and poor は格差テーマの決めフレーズ。"
    },
    {
      "en": "In conclusion, although welfare programs cannot eliminate inequality entirely, their protective function, promotion of opportunity, and economic benefits clearly reduce social disparities.",
      "ja": "結論として、福祉制度が不平等を完全になくすことはできないが、その保護機能、機会の促進、経済的恩恵は明らかに社会的格差を減らす。",
      "structure": "although節(譲歩)+主節SVO。主節は S=their protective function, promotion of opportunity, and economic benefits(3並列)、V=reduce、O=social disparities。",
      "grammar": "① In conclusion, although 〜 = 結論冒頭の譲歩型(Day 7 と同型)。② cannot eliminate ... entirely = not + entirely の部分否定「完全になくせるわけではない」。every の部分否定と同じ理屈で、限界を認めつつ主張を守る。eliminate = 「根絶する」で remove の格上げ。③ 3並列の主語で本論3理由を再掲: protective function(理由1=安全網)/ promotion of opportunity(理由2=機会平等)/ economic benefits(理由3=経済効果)。それぞれ動詞だった内容(protect / promote)を名詞化して圧縮している。④ their = welfare programs の所有格。⑤ clearly = 「明らかに」と断定を支える文中副詞。⑥ social disparities = inequality の言い換え。disparity は可算で複数「(各方面の)格差」。同語反復を避けて締める。",
      "writing": "結論の3理由再掲は「動詞の名詞化」で行う: protect → protective function、promote → promotion of。この変換が本論コピペ回避の核心技術。締めの名詞は inequality → disparities のように類義語に差し替えて語彙の幅を見せる。"
    },
    {
      "en": "Therefore, well-designed welfare systems are an indispensable tool for building a fairer society.",
      "ja": "したがって、よく設計された福祉制度は、より公正な社会を築くための不可欠な手段である。",
      "structure": "SVC。Therefore は結論の接続副詞。S=well-designed welfare systems、V=are、C=an indispensable tool。for building 〜 は目的の前置詞+動名詞句。",
      "grammar": "① Therefore, = 最終文の合図(既出)。② well-designed = 副詞+過去分詞のハイフン複合形容詞「よく設計された」。無条件の擁護ではなく「よく設計されていれば」という条件を形容詞1語に埋め込む知的な限定。③ 主語は複数(systems)だが補語は an indispensable tool と単数。「制度(という類)は一つの道具である」の比喩なので単複がずれてよい。④ indispensable = essential の格上げ「不可欠な」。⑤ tool for + 動名詞 = 「〜するための道具」。for -ing で用途を示す。⑥ a fairer society = 比較級 fairer。「(今より)公正な社会」と現状比較の含みを比較級で出す。society はここでは「一つの(理想の)社会」で可算・a。",
      "writing": "最終文テンプレ: Therefore, well-designed X are an indispensable tool for building a fairer/better society. well-designed / properly regulated のような限定形容詞を主語に付けると、「盲目的賛成ではない」と一言で示せて評価が上がる。比較級 a fairer society で未来志向に締める。"
    }
  ],
  "9": [
    {
      "en": "As Japan grapples with a shrinking population and sluggish growth, the question of whether foreign investment is necessary for its economic success has become increasingly urgent.",
      "ja": "日本が人口減少と低迷する成長に取り組む中で、その経済的成功に外国投資が必要かという問いはますます切実になっている。",
      "structure": "As節(従属)+主節SVC。主節は S=the question (of whether 〜 success)、V=has become(現在完了)、C=increasingly urgent。of whether 以下は question の同格。",
      "grammar": "① As 〜 = 「〜する中で」の同時進行の接続詞。② grapple with 〜 = 「〜と格闘する・取り組む」。deal with の格上げで、with とセット。③ a shrinking population = 現在分詞の前置修飾「縮小しつつある人口」。日本一国の人口なので単数+a。sluggish growth = 「低迷する成長」(growth は不可算・無冠詞)。④ the question of whether 〜 = 同格の of。「〜かどうかという問い」。whether節を question に接続する定番の型。⑤ its = Japan's。⑥ has become increasingly urgent = 現在完了で「(近年)ますます切実になってきた」という変化の到達点。increasingly + 形容詞は「ますます〜」の趨勢表現。主語は the question(単数)なので has。",
      "writing": "序論1文目の重厚型: As [国] grapples with [問題A] and [問題B], the question of whether 〜 has become increasingly urgent. お題を the question of whether に埋め込み、背景(人口減・低成長)をAs節で添える。日本を例に使うお題では shrinking population / sluggish growth のペアが即戦力。"
    },
    {
      "en": "I am convinced that investment from foreign companies is indeed essential.",
      "ja": "私は外国企業からの投資が確かに不可欠だと確信している。",
      "structure": "SVC+that節。S=I、V=am convinced、that節が確信の内容。節内は S(investment from foreign companies) + is + C(essential)。",
      "grammar": "① I am convinced that 〜 = I believe より強い確信のテーゼ。convince(納得させる)の受動由来で「証拠によって確信させられている」の含み。② investment = 不可算・無冠詞(行為・資金の流れとしての投資)。an investment なら個別案件。③ from foreign companies = 出所の from。お題の foreign investment を investment from foreign companies と開いて言い換える小技。④ indeed = 「確かに」の強調副詞(既出)。お題の疑問に正面から Yes と答える響きを作る。⑤ essential = 「不可欠な」。necessary の格上げ。",
      "writing": "テーゼは I am convinced that 〜 is indeed essential. の短い断言でよい。長い1文目の後に短いテーゼを置くと、リズムの緩急で主張が際立つ。お題の名詞句(foreign investment)は語順を組み替えて(investment from foreign companies)コピペ感を消す。"
    },
    {
      "en": "First, foreign investment injects much-needed capital into a domestic market suffering from chronic stagnation.",
      "ja": "第一に、外国投資は慢性的な停滞に苦しむ国内市場に、切実に必要とされる資本を注入する。",
      "structure": "SVO。S=foreign investment、V=injects、O=much-needed capital。into 以下が注入先。suffering from 〜 は market を修飾する現在分詞の後置修飾。",
      "grammar": "① First, = 本論1の合図(既出)。② injects A into B = 「AをBに注入する」。医療の比喩を経済に転用した動詞で、put money into の劇的な格上げ。三単現の -s。③ much-needed = 副詞+過去分詞のハイフン複合形容詞「切実に必要とされる」。much-needed capital / reform は時事英語の定番コロケーション。④ capital = 「資本」の意味では不可算・無冠詞(「首都」なら可算)。⑤ a domestic market = ここでは「一つの国内市場」として a。⑥ suffering from 〜 = 現在分詞の後置修飾。market (that is) suffering from「〜に苦しんでいる市場」。suffer from = (病気・問題に)苦しむ。⑦ chronic stagnation = 「慢性的停滞」。chronic(慢性の)も医療メタファーで inject と呼応。stagnation は不可算。",
      "writing": "S injects much-needed capital into 〜 は経済テーマの決め文。「注入する/慢性の」の医療メタファーで統一するとプロっぽい文体になる。名詞を修飾する suffering from 〜 の現在分詞後置は、関係詞節(which is suffering)を2語節約する頻用テク。"
    },
    {
      "en": "With domestic caution often hindering growth, overseas funds bolster new ventures and finance infrastructure.",
      "ja": "国内の慎重姿勢がしばしば成長を妨げる中、海外の資金が新事業を支え、インフラに資金を供給する。",
      "structure": "With + O + 現在分詞の付帯状況構文+主節。主節は S=overseas funds、V=bolster と finance の並列、O=new ventures / infrastructure。",
      "grammar": "① With + 名詞 + -ing = 付帯状況の with 構文「〜が…している状況で」。With domestic caution (often) hindering growth = 「国内の慎重論が成長を妨げる中で」。従属節(As domestic caution hinders ...)を句に圧縮する1級構文。② domestic caution = 不可算・無冠詞「(日本企業の)慎重姿勢」。③ hinder = 「妨げる」。prevent より弱く「足を引っ張る」。④ overseas funds = 可算複数「海外資金」。overseas は形容詞。⑤ bolster = 「下支えする」。support の格上げ。⑥ finance = ここでは動詞「〜に資金を供給する」。bolster と並列で、名詞と同形の動詞用法。⑦ infrastructure = 不可算・無冠詞(× infrastructures は原則不要)。",
      "writing": "With + O + -ing の付帯状況は、譲歩や背景を主節の前に4〜6語で添えられる圧縮技。With domestic demand declining, / With costs rising, のように汎用可。finance を動詞で使う、bolster を support の代わりに使う、はどちらも語彙点の稼ぎどころ。"
    },
    {
      "en": "For instance, foreign acquisitions have revived several struggling Japanese companies that would otherwise have collapsed.",
      "ja": "例えば、外国による買収は、さもなければ崩壊していたであろういくつかの苦境にある日本企業を再生させてきた。",
      "structure": "SVO。S=foreign acquisitions、V=have revived(現在完了)、O=several struggling Japanese companies。that 以下は companies を先行詞とする関係詞節(仮定法過去完了)。",
      "grammar": "① For instance, = 具体例の合図(既出)。② foreign acquisitions = 可算複数「(複数の)外国による買収」。acquisition = 買収はM&A文脈の必須語。③ have revived = 現在完了で「これまでに再生させてきた」実績。revive = 「生き返らせる」。④ several struggling Japanese companies = 数量詞 several + 現在分詞 struggling(苦境にある)の前置修飾+固有形容詞。形容詞の語順は「数量→評価/状態→国籍」。⑤ that would otherwise have collapsed = 関係詞節内の仮定法過去完了。otherwise = 「そうでなければ(=買収がなければ)」が if節の代用となり、would have + 過去分詞で「崩壊していただろう」。現実(買収があった)に反する過去の仮定。",
      "writing": "would otherwise have + 過去分詞 は「それがなければ〜だったはず」を関係詞節にねじ込む1級の華。companies that would otherwise have collapsed / patients who would otherwise have died のように、施策の効果を反実仮想で証明する型として汎用性が高い。"
    },
    {
      "en": "Second, foreign companies bring innovative management practices and advanced technologies.",
      "ja": "第二に、外国企業は革新的な経営手法と先進技術をもたらす。",
      "structure": "SVO。S=foreign companies、V=bring、O=innovative management practices and advanced technologies(2つの名詞句の並列)。",
      "grammar": "① Second, = 本論2の合図(既出)。② foreign companies = 無冠詞複数の総称。複数主語なので bring に -s なし。③ management practices = 「経営慣行」。practice は「(業務の)やり方」の意味で可算・複数が普通。innovative(革新的な)が前置修飾。④ advanced technologies = 「先進技術」。technology は「技術一般」なら不可算だが、「個別の技術群」を指すときは可算複数化する。ここは複数の具体的技術を想定して technologies。⑤ トピックセンテンスを短くし、次文以降で膨らませる構成(Day 7 と同じ)。",
      "writing": "理由2のトピックセンテンスは bring innovative X and advanced Y の並列で簡潔に。technology の可算/不可算の切り替え(技術一般=不可算、個別技術=複数可)は英検ライティングの頻出判断なので意識的に使い分ける。"
    },
    {
      "en": "There is no denying that exposure to global competition forces domestic firms to improve efficiency and adopt fresh ideas.",
      "ja": "世界的競争にさらされることが国内企業に効率改善と新しい発想の採用を迫ることは否定できない。",
      "structure": "There is no -ing 構文+that節。that節内は SVOC: S=exposure to global competition、V=forces、O=domestic firms、C=to improve ... and (to) adopt ...(不定詞並列)。",
      "grammar": "① There is no denying that 〜 = 「〜は否定できない」の慣用構文。There is no + 動名詞で「〜することはできない」(There is no telling = わからない、と同族)。強い断定を客観風に述べる型。② exposure to 〜 = 「〜にさらされること」。expose A to B の名詞形で to とセット。不可算・無冠詞。③ global competition = 不可算・無冠詞。④ force O to do = 「Oに〜するのを強いる」。to不定詞を取る使役系語法(allow / require / enable と同族)。ここは「競争圧力が改革を強制する」という因果を1動詞で表す。⑤ domestic firms = 可算複数。firm = company の言い換え(同語反復回避)。⑥ to improve efficiency and adopt fresh ideas = 不定詞並列(2つ目の to 省略)。efficiency は不可算、ideas は可算複数。fresh = new の言い換え。",
      "writing": "There is no denying that 〜 は譲歩なしで強く押すときの構文としてテンプレ化する。force O to do は「外圧が改革を生む」ロジック(競争・規制・危機がXを〜させる)の中核動詞。company → firm、new → fresh の同語反復回避も見習う。"
    },
    {
      "en": "Consequently, productivity rises across entire industries, benefiting the wider economy.",
      "ja": "その結果、生産性が産業全体で高まり、より広い経済に恩恵を与える。",
      "structure": "SV(自動詞)+分詞構文。S=productivity、V=rises。across entire industries は範囲の前置詞句。カンマ後の benefiting 〜 は結果を表す分詞構文。",
      "grammar": "① Consequently, = 帰結の接続副詞(既出)。② productivity = 不可算・無冠詞。rises は三単現の -s(自動詞「上がる」)。③ across entire industries = 「産業全体にわたって」。across は「〜の全域で」の広がりの前置詞。entire が industries を強める。④ , benefiting 〜 = 結果の分詞構文。「...高まり、その結果〜に恩恵を与える」。and this benefits 〜 の圧縮で、主節の内容全体が意味上の主語。⑤ the wider economy = 比較級+the「(その産業の枠を超えた)より広い経済」(Day 8 の the broader economy と同じ発想)。",
      "writing": "文末の , benefiting 〜 / , allowing 〜 / , leading to 〜 の結果分詞構文は、which in turn と並ぶ因果連鎖の二大テク。1エッセイに1〜2回、文末に -ing を垂らして波及効果を書くと文が大人になる。"
    },
    {
      "en": "Finally, foreign investment creates employment and integrates Japan more deeply into global supply chains.",
      "ja": "最後に、外国投資は雇用を生み出し、日本をグローバルなサプライチェーンにより深く統合する。",
      "structure": "SVO+SVOの並列。S=foreign investment、V1=creates(O=employment)、V2=integrates(O=Japan、into 以下が統合先)。",
      "grammar": "① Finally, = 本論3の合図(既出)。② creates employment = 「雇用を生む」。employment は不可算・無冠詞(× employments)。create jobs なら可算複数。③ integrates A into B = 「AをBに統合する」。into とセットの語法。④ more deeply = 副詞 deeply の比較級。動詞 integrate を修飾し「より深く」。比較級の副詞を挟むと現状からの深化が表せる。⑤ global supply chains = 可算複数「(各産業の)供給網」。時事経済の必須語。⑥ 動詞2つの並列(creates and integrates)で1文に2つの効果を詰める。",
      "writing": "integrate A more deeply into B は国際・経済テーマの決めフレーズ。1つの理由に2動詞並列(creates X and integrates Y)で二重の効果を持たせると、段落の中身が濃くなる。employment(不可算)と jobs(可算)の使い分けも試験で問われる感覚。"
    },
    {
      "en": "From a long-term perspective, this connectivity is vital for a nation whose domestic demand is steadily declining.",
      "ja": "長期的視点で見れば、この結びつきは国内需要が着実に減少している国にとって極めて重要である。",
      "structure": "SVC。From a long-term perspective は視点の前置詞句。S=this connectivity、V=is、C=vital。whose 以下は nation を先行詞とする所有格関係詞節。",
      "grammar": "① From a long-term perspective, = 視点の限定句。standpoint 型(Day 7・8)の perspective 版。long-term はハイフン複合形容詞。② this connectivity = 前文の supply chains への統合を this + 抽象名詞で受ける結束(既出の型)。connectivity = 「接続性・結びつき」。③ vital for 〜 = 「〜にとって不可欠」。essential / crucial の言い換え(同語反復回避)。④ whose = 所有格の関係代名詞。a nation whose domestic demand is declining = 「その国内需要が減少している国」。of which より whose が簡潔で、無生物(nation)にも使える。⑤ is steadily declining = 現在進行形+steadily「着実に減り続けている」。進行形で進行中の趨勢(既出の発想)。⑥ a nation = 日本を「そのような国の一つ」として一般化するための a。あえて Japan と言わず一般論化する上級の抽象化。",
      "writing": "whose を使った関係詞節(a nation whose X is declining)は1級で確実に文法点を取れる構文なので、1エッセイ1回は狙って入れる。固有名詞(Japan)を a nation whose 〜 と一般化して受け直す抽象化も、視野の広さを見せる技。"
    },
    {
      "en": "Foreign-affiliated firms now employ millions of Japanese workers, demonstrating their tangible contribution.",
      "ja": "外資系企業は今や数百万の日本人労働者を雇用しており、その具体的な貢献を示している。",
      "structure": "SVO+分詞構文。S=Foreign-affiliated firms、V=employ、O=millions of Japanese workers。カンマ後の demonstrating 〜 は結果・補足の分詞構文。",
      "grammar": "① Foreign-affiliated = 「外資系の」のハイフン複合形容詞(affiliate = 提携させる の過去分詞)。② now = 「今や」。現在形とセットで「かつてと違って現在は」の変化を含意。③ employ millions of 〜 = millions of + 複数名詞で概数の多さ(Day 7 の millions of lives と同型なので簡潔に)。④ , demonstrating 〜 = 結果の分詞構文(前文の benefiting と同型)。「雇用している、そしてそのことが〜を証明している」。⑤ tangible = 「手で触れられる=具体的な・目に見える」。real の格上げで、tangible contribution / benefits が定番コロケーション。their = firms の所有格。",
      "writing": "段落の締めは [事実・数字] , demonstrating their tangible contribution. の型で「事実→意味づけ」を1文で完結できる。数字を出す→ , demonstrating / , proving で意義を添える流れは、具体例の説得力を仕上げる定番ムーブ。"
    },
    {
      "en": "In conclusion, although excessive dependence on foreign capital carries certain risks, the inflow of funds, transfer of expertise, and creation of jobs make foreign investment indispensable to Japan's prosperity.",
      "ja": "結論として、外国資本への過度な依存には一定のリスクがあるものの、資金の流入、専門知識の移転、雇用の創出は、外国投資を日本の繁栄に不可欠なものにしている。",
      "structure": "although節(譲歩)+主節SVOC。主節は S=the inflow of funds, transfer of expertise, and creation of jobs(3並列)、V=make、O=foreign investment、C=indispensable to Japan's prosperity。",
      "grammar": "① In conclusion, although 〜 = 結論冒頭の譲歩型(既出)。② excessive dependence on 〜 = 「〜への過度な依存」。dependence は不可算で on とセット。excessive の一語で「過度なら問題」と限定し、自説(適度な投資は必要)を守る。③ carries certain risks = 「一定のリスクを伴う」。carry risks は involve risks の言い換え。certain = 「ある程度の」で断定をぼかす。④ 3並列の主語 = 本論3理由の名詞化再掲: the inflow of funds(理由1=資本)/ transfer of expertise(理由2=技術・経営)/ creation of jobs(理由3=雇用)。「the + 名詞化 + of」で動詞(inject / bring / create)を畳んでいる。⑤ make OC = 第5文型(Day 7 と同型)。C=indispensable to 〜「〜に不可欠」で前置詞は to。⑥ Japan's prosperity = 所有格+不可算名詞。",
      "writing": "結論の型の完成版: In conclusion, although excessive [リスク要素] carries certain risks, the [名詞化A], [名詞化B], and [名詞化C] make X indispensable to 〜. 譲歩は excessive を付けて「過度なら」に限定するのが防御の要諦。3理由の of名詞化はこのまま真似る。"
    },
    {
      "en": "Therefore, Japan should actively welcome investment from abroad to secure its economic future.",
      "ja": "したがって、日本は経済の未来を確保するために海外からの投資を積極的に歓迎すべきである。",
      "structure": "SVO。Therefore は結論の接続副詞。S=Japan、V=should welcome、O=investment from abroad。to secure 以下は目的の to不定詞。",
      "grammar": "① Therefore, + should = 最終文の提言(既出)。② actively = 「積極的に」。should と動詞の間に置いて提言に前向きな態度を足す。③ welcome = 「歓迎する」。accept より積極的な動詞選択。④ investment from abroad = abroad は副詞だが from abroad で「海外から」の前置詞句となり名詞を修飾できる。foreign investment の言い換え(3回目の同語反復を回避)。⑤ to secure = 目的の to不定詞「確保するために」。secure は動詞「確保する」(get の格上げ)。⑥ its economic future = its = Japan's。所有格で締める。",
      "writing": "最終文は Therefore, [主体] should actively welcome/embrace X to secure its future. の提言+目的で前向きに閉じる。foreign investment → investment from foreign companies → investment from abroad と3通りに言い換えた同語反復回避のリレーは、エッセイ全体で真似るべき技術。"
    }
  ],
  "10": [
    {
      "en": "Since the eighteenth century, industrialization has transformed nearly every aspect of human life.",
      "ja": "18世紀以降、産業化は人間生活のほぼあらゆる側面を一変させてきた。",
      "structure": "SVO。Since 〜 は起点の前置詞句。S=industrialization、V=has transformed(現在完了)、O=nearly every aspect of human life。",
      "grammar": "① Since + 過去の起点 + 現在完了 = 「〜以来ずっと」の継続・累積。since があれば時制は現在完了で確定、という試験の基本ルールがそのまま序論で使われている。② the eighteenth century = 序数+century には the(特定の世紀)。序数は eighteenth とスペルアウトするのが正式な文体。③ industrialization = 無冠詞・不可算の -tion 抽象名詞。④ transform = change の格上げ「根本から変える」。⑤ nearly every + 単数名詞 = 「ほぼすべての〜」。every の後は必ず単数(× every aspects)。nearly で all の断定を和らげる。⑥ aspect of 〜 = 「〜の側面」。human life は不可算・無冠詞。",
      "writing": "歴史スケールのお題は Since the [世紀], X has transformed nearly every aspect of human life. で開幕するのが型。since+現在完了は減点されない確実な文法アピール。nearly every aspect of は「全部変えた」を正確に言う便利なかたまり。"
    },
    {
      "en": "While some emphasize its environmental costs, I agree that industrialization has had an overall beneficial effect on humankind.",
      "ja": "その環境的代償を強調する人もいるが、私は産業化が人類に全体として有益な影響を与えてきたという意見に賛成する。",
      "structure": "While節(譲歩)+主節。主節は S=I、V=agree、O=that節。that節内は S(industrialization) + has had(現在完了) + O(an overall beneficial effect)。",
      "grammar": "① While + 譲歩 = 「〜する人もいるが」の譲歩構文。While some emphasize 〜, I agree 〜 で反対意見を一度立ててから潰す序論の鉄板(Day 1 と同じ発想)。② some = some people の省略(既出)。③ its environmental costs = its = industrialization's。costs は複数形「(諸々の)代償」。金銭以外の「犠牲」も costs で言える。④ I agree that 〜 = agree/disagree 型のお題では、I agree that + お題の言い換え、で立場を明示する。⑤ has had an ... effect = 現在完了「(これまで)影響を与えてきた」。have an effect on 〜 = 「〜に影響を与える」の基本語法で on とセット。effect は可算なので an。⑥ overall beneficial = overall(全体としての)+beneficial(有益な)の二重修飾。overall が「差し引きプラス」の含みを出し、譲歩と矛盾しない位置取りを作る。",
      "writing": "agree/disagree 型の序論2文目はこの While some emphasize [反対側の論点], I agree that X has had an overall beneficial effect on 〜. が完成テンプレ。overall を挟むのが密かな要点で、「欠点も認めた上での総合判断」というスタンスを1語で宣言できる。"
    },
    {
      "en": "First, industrialization has dramatically raised living standards.",
      "ja": "第一に、産業化は生活水準を劇的に引き上げた。",
      "structure": "SVO。S=industrialization、V=has raised(現在完了)、O=living standards。dramatically は has と過去分詞の間の副詞。",
      "grammar": "① First, = 本論1の合図(既出)。② has dramatically raised = 現在完了(過去から現在までの累積の成果)+程度副詞 dramatically(have と過去分詞の間が定位置)。歴史テーマは本論も現在完了が主時制になる。③ raise = 他動詞「〜を上げる」。自動詞 rise(上がる)との使い分けは頻出ポイント: raise O / O rises。④ living standards = 「生活水準」。standard of living とも言うが、複数形 living standards が論述の定番。living は動名詞の形容詞的用法。",
      "writing": "トピックセンテンスは X has dramatically raised living standards. のように現在完了+副詞+目的語の3要素で最短に。raise/rise の使い分けを本番で迷わないよう、raise living standards / incomes rise の形で塊暗記しておく。"
    },
    {
      "en": "Mass production made goods that were once luxuries affordable to ordinary people.",
      "ja": "大量生産はかつて贅沢品だった財を普通の人々にも手の届くものにした。",
      "structure": "SVOC。S=Mass production、V=made、O=goods (that were once luxuries)、C=affordable。関係詞節が目的語に埋め込まれ、補語 affordable が後ろに来る語順。",
      "grammar": "① mass production = 無冠詞・不可算「大量生産」。② made O C = 第5文型「OをCにした」。過去形なのは産業革命期の歴史的出来事だから(前文の現在完了との時制の使い分けに注目)。③ O = goods that were once luxuries = 関係詞節入りの目的語。「かつては贅沢品だった財」。once = 「かつて」の副詞。luxuries は luxury(贅沢品)の複数形で、「贅沢」の意味なら不可算だが「贅沢品」は可算。④ C = affordable to 〜 = 「〜にとって手頃な」。afford(買う余裕がある)の派生形容詞で to とセット。目的語が長いので補語が離れて置かれる SVOC の語順に注意(made goods affordable の間に関係詞節が割り込んだ形)。⑤ ordinary people = 「庶民」。無冠詞複数の総称。",
      "writing": "make O affordable/accessible to 〜 は「技術・制度が恩恵を大衆化した」と書く万能SVOC。O に that were once luxuries のような関係詞節を挟んで「昔と今」の対比を1文に圧縮する技はそのまま盗める。歴史的事実は過去形、現在への影響は現在完了、の時制の描き分けも要点。"
    },
    {
      "en": "For instance, items such as clothing, appliances, and vehicles, formerly reserved for the wealthy, are now accessible to the majority, greatly improving everyday comfort.",
      "ja": "例えば、衣類、家電、車両といった、以前は富裕層だけのものだった品々が、今や大多数の人に手が届き、日常の快適さを大きく改善している。",
      "structure": "SVC+分詞構文。S=items (such as clothing, appliances, and vehicles)、挿入の formerly reserved 〜 は過去分詞句の後置修飾、V=are、C=accessible。文末の greatly improving 〜 は結果の分詞構文。",
      "grammar": "① such as A, B, and C = 3点例示(既出の型)。clothing(衣類=不可算)、appliances(家電=可算複数)、vehicles(車両=可算複数)と可算・不可算が混在してよい。② , formerly reserved for the wealthy, = カンマで挟んだ過去分詞句の挿入修飾。items (that were) formerly reserved for 〜「以前は〜専用だった品々」。formerly = 「以前は」で now と対をなす。reserve for = 「〜のために取っておく」。③ the wealthy = the + 形容詞「富裕層」(Day 8 の the most vulnerable と同じ用法)。④ are now accessible to 〜 = 「今や〜の手に届く」。affordable(前文)の言い換えで to とセット。formerly ↔ now の対比が文の骨格。⑤ the majority = 「大多数(の人々)」。the が付く集合名詞。⑥ , greatly improving 〜 = 結果の分詞構文(Day 9 の benefiting と同型)。everyday comfort = 一語形容詞 everyday(日常の)+不可算 comfort。",
      "writing": "formerly + 過去分詞 ↔ are now + 形容詞 の時間対比を1文に収める構文は「昔は特権、今は当たり前」systemの具体例で無双する。X, formerly reserved for the wealthy, are now accessible to the majority はこの形のまま教育・医療・旅行など他テーマに移植できる。"
    },
    {
      "en": "Second, industrialization has extended human life expectancy.",
      "ja": "第二に、産業化は人間の平均寿命を延ばした。",
      "structure": "SVO。S=industrialization、V=has extended(現在完了)、O=human life expectancy。",
      "grammar": "① Second, = 本論2の合図(既出)。② has extended = 現在完了(歴史的蓄積、本論1と同じ発想なので簡潔に)。extend = 「延ばす」。③ life expectancy = 「平均寿命」。不可算・無冠詞の統計用語で、average life span とも言い換え可。健康・医療・高齢化テーマの必須語。④ human = 形容詞「人間の」。",
      "writing": "extend life expectancy は健康・医療系の頻出コロケーションとして塊で暗記。トピックセンテンスを最短SVOで打ち、続く2文で説明と帰結を担わせる「短→長→長」の段落リズムはこのエッセイ全体のお手本。"
    },
    {
      "en": "The development of modern medicine, sanitation, and food production owes much to industrial techniques.",
      "ja": "現代医学、衛生、食料生産の発展は産業技術に多くを負っている。",
      "structure": "SVO。S=The development of modern medicine, sanitation, and food production、V=owes、O=much。to industrial techniques が owe A to B の to句。",
      "grammar": "① The development of A, B, and C = 「the+名詞化+of」の主語(既出の型)に3点並列を埋め込んだ形。medicine(医学=不可算)、sanitation(衛生=不可算)、food production(食料生産=不可算)。② the が付くのは of句で「何の発展か」が特定されるから。③ owes much to 〜 = owe A to B「AをBに負う」の語法で、A=much(多くのもの)。「〜のおかげである」を因果の動詞で上品に言う型。owe は三単現の -s(主語の核は development で単数)。④ industrial techniques = 可算複数「産業の技術・手法」。technique は個別の手法で可算(technology との使い分け)。",
      "writing": "The development of X owes much to Y. は「YがXを可能にした」の因果を逆向きに言う格上げ構文。thanks to Y, X developed と書きたくなったら owes much to に変換する。3つの不可算名詞を of の中に並列する主語の作り方も定番として真似る。"
    },
    {
      "en": "Consequently, deadly diseases have been curbed and famines reduced, allowing populations to live longer and healthier lives than ever before.",
      "ja": "その結果、致命的な病気は抑えられ、飢饉は減り、人々はかつてないほど長く健康な人生を送れるようになった。",
      "structure": "受動態の並列+分詞構文。S1=deadly diseases、V1=have been curbed。S2=famines、V2=(have been) reduced(助動詞・been の省略)。文末の allowing 〜 は結果の分詞構文で allow O to do を内包。",
      "grammar": "① Consequently, = 帰結の接続副詞(既出)。② have been curbed = 現在完了+受動態「抑えられてきた」。抑えた主体(産業技術)は前文で明示済みなので受動で結果だけ述べる。curb は Day 6 でも出た「抑制する」。③ famines (have been) reduced = 並列の第2要素で have been を省略する共通構文。同じ助動詞+be は2回目を省ける。famine(飢饉)は個々の飢饉事件として可算・複数。④ , allowing O to do = 結果の分詞構文+allow O to do(使役系語法)の合わせ技「その結果〜できるようになった」。⑤ populations = 複数形「(世界各地の)人々・人口集団」。⑥ live longer and healthier lives = live a ... life(同族目的語)の複数版。比較級2連 longer and healthier が lives を修飾。⑦ than ever before = 「かつてないほど」。比較級とセットで最上級相当の意味を出す決まり文句。",
      "writing": "比較級 + than ever before は「史上最高」を安全に言う頻出表現(longer and healthier lives than ever before は丸ごと使える)。受動並列での have been 省略と、, allowing populations to 〜 の結果分詞は、1文に情報を3層詰める上級テクの見本。"
    },
    {
      "en": "Finally, industrialization has driven remarkable advances in knowledge and communication.",
      "ja": "最後に、産業化は知識と通信における目覚ましい進歩を推進した。",
      "structure": "SVO。S=industrialization、V=has driven(現在完了)、O=remarkable advances。in knowledge and communication が advances の分野を示す前置詞句。",
      "grammar": "① Finally, = 本論3の合図(既出)。② has driven = drive の現在完了「推進してきた」。drive = 「駆動する・推し進める」で cause の格上げ(Day 1 の driving innovation と同じ動詞)。③ remarkable = 「目覚ましい」。great の格上げ形容詞。④ advances in 〜 = 可算複数+in(Day 6 と同じ語法なので簡潔に)。⑤ knowledge and communication = どちらも不可算・無冠詞の抽象名詞。",
      "writing": "drive advances in 〜 は「進歩を推進する」の格上げコロケーション。cause/bring より drive、great より remarkable、と1段上の語を選ぶ癖が語彙点(1級ライティングの4観点の1つ)を安定させる。"
    },
    {
      "en": "From a long-term perspective, the factories and economies it created funded scientific research and global connectivity.",
      "ja": "長期的視点で見れば、それが生み出した工場と経済が科学研究と世界的なつながりを資金面で支えた。",
      "structure": "SVO。From a long-term perspective は視点の前置詞句。S=the factories and economies (it created)、V=funded(過去形)、O=scientific research and global connectivity。it created は接触節(関係代名詞省略)。",
      "grammar": "① From a long-term perspective, = 視点の限定句(Day 9 と同型なので簡潔に)。② the factories and economies it created = 目的格関係代名詞の省略(接触節)。the factories and economies (that) it created「産業化が生み出した工場と経済」。it = industrialization。関係詞節で特定されるので the。③ funded = 過去形「資金を出した」。歴史的事実の叙述なので過去形(現在完了との使い分けは Day 10 全体のテーマ)。fund は名詞「資金」と同形の動詞。④ scientific research = 不可算・無冠詞(既出)。global connectivity = 不可算「世界的な接続性」(Day 9 の connectivity と同語)。",
      "writing": "the X it created / the tools it provides のような接触節(that 省略)は、文を締めながら文法力を示せる小技。「産業→資金→科学」のように理由の中で因果を2段掘るときは、無生物主語+funded/enabled で一気に繋ぐ。"
    },
    {
      "en": "Admittedly, this progress has generated pollution, yet the same industrial capacity now enables us to develop cleaner technologies to address it.",
      "ja": "確かにこの進歩は汚染を生んだが、その同じ産業力が今やそれに対処するためのより清潔な技術を開発することを可能にしている。",
      "structure": "重文(譲歩→反転)。前半 S=this progress、V=has generated、O=pollution。yet で反転し、後半は SVOC: S=the same industrial capacity、V=enables、O=us、C=to develop cleaner technologies。文末 to address it は目的の不定詞。",
      "grammar": "① Admittedly, 〜 yet ... = 譲歩→反転のセット(Day 6 は However で受けたが yet でも同じ働き)。1文内で譲歩を完結させる圧縮版。② this progress = 前文までの内容を this+名詞で受ける結束(既出)。③ has generated pollution = 現在完了。generate = produce の格上げ「生み出す」。pollution は不可算・無冠詞。④ the same industrial capacity = 「その同じ産業力」。same には必ず the。「汚染を生んだ力=解決する力」という反論の論理を the same が一手に担う。⑤ enables us to do = enable O to do の使役系語法(allow と同族、既出)。now が「今や」の転換を示す。⑥ cleaner technologies = 比較級「より清潔な」。clean energy 系の定番。⑦ to address it = 目的の不定詞+address(対処する、Day 7 で既出)。it = pollution。",
      "writing": "Admittedly, X has generated [問題], yet the same [力] now enables us to [解決] は自己解決型の反論テンプレ。「問題を生んだ当のものが解決能力も持つ」ロジックは技術・経済テーマの譲歩処理で最強の一手。the same を軸にした切り返しをそのまま暗記する。"
    },
    {
      "en": "In conclusion, although industrialization has undeniably harmed the environment, its contributions to prosperity, health, and human progress far outweigh its drawbacks.",
      "ja": "結論として、産業化が紛れもなく環境を害してきたとはいえ、繁栄、健康、人類の進歩への貢献はその欠点をはるかに上回る。",
      "structure": "although節(譲歩)+主節SVO。主節は S=its contributions to prosperity, health, and human progress、V=outweigh(far で強調)、O=its drawbacks。",
      "grammar": "① In conclusion, although 〜 = 結論冒頭の譲歩型(既出)。② has undeniably harmed = 現在完了+文中副詞 undeniably「紛れもなく」(has と過去分詞の間)。譲歩側を強い副詞で認めるほど、それでも勝つという主節が引き立つ。③ the environment = 「(地球の)環境」は常に the environment。無冠詞にしない頻出ポイント。④ its contributions to 〜 = contribution は可算で複数「(諸々の)貢献」。to とセット(contribute to の名詞形)。⑤ prosperity, health, and human progress = 本論3理由の名詞化再掲(生活水準→prosperity、寿命→health、知識→progress)。全部不可算・無冠詞。⑥ far outweigh = 比較動詞 outweigh を far で強調(Day 1 と同じ決め技)。主語 contributions が複数なので -s なし。⑦ its drawbacks = 「その欠点」。benefits/contributions ↔ drawbacks の天秤の対。",
      "writing": "賛否型の結論はこの1文が完成形: In conclusion, although X has undeniably harmed 〜, its contributions to A, B, and C far outweigh its drawbacks. undeniably で譲歩を厚く認めてから far outweigh でひっくり返す落差が採点者に効く。3理由の抽象名詞化(prosperity / health / progress)も見本通りに。"
    },
    {
      "en": "Therefore, I firmly maintain that industrialization has, on balance, benefited humankind enormously.",
      "ja": "したがって、私は産業化が差し引きで人類に多大な恩恵をもたらしてきたと固く主張する。",
      "structure": "SVO。Therefore は結論の接続副詞。S=I、V=maintain(firmly が修飾)、O=that節。that節内は has と benefited の間に on balance が挿入され、S(industrialization) + has benefited + O(humankind)。",
      "grammar": "① I firmly maintain that 〜 = 最終文の立場再宣言。maintain = 「(反論を承知で)主張し続ける」で believe/argue の格上げ。firmly は動詞の直前。② has, on balance, benefited = 現在完了の has と過去分詞の間にカンマ付きで on balance(差し引きで・総合的に見て)を挿入。副詞句の挿入位置として最も引き締まる場所で、「欠点も勘定に入れた上での結論」を2語で示す。③ benefit = ここでは他動詞「〜に恩恵を与える」(benefit O)。名詞の benefit と同形。④ humankind = 無冠詞・不可算(既出)。⑤ enormously = 「多大に」の程度副詞で文末。",
      "writing": "最終文テンプレ: Therefore, I firmly maintain that X has, on balance, benefited 〜 enormously. on balance のカンマ挿入は agree/disagree 型の締めに最適で、overall の言い換えとして序論(overall beneficial effect)との呼応も作れる。maintain は conclude / contend と並ぶ最終文用の動詞ストック。"
    }
  ],
  "11": [
    {
      "en": "It is often argued that human activity is inherently destructive and that societies will inevitably damage the natural world.",
      "ja": "人間の活動は本質的に破壊的であり、社会は不可避的に自然界を傷つけるとしばしば主張される。",
      "structure": "It is 形式主語+受動態。真主語は that 節2つ(that human activity is 〜 と that societies will 〜)の and 並列。",
      "grammar": "① It is often argued that 〜 = 形式主語+受動態。「誰が」主張するかをぼかし、世間の一般論として提示する反論型序論の定番。現在形 is argued なのは今も広く言われている見解だから。② that 節が and that で2つ並列。2つ目の that は省略不可(省くと並列関係が読めなくなる)。③ inherently(本質的に)・inevitably(不可避的に)= 相手の主張をあえて極端な副詞ごと引用している。全称の主張は後で反例1つで崩せる。④ human activity は不可算・無冠詞(人間の活動全般)。the natural world は唯一の対象なので the。",
      "writing": "反論型の序論1文目は It is often argued that + [世間の主張] がそのまま流用できる。次文の However, I disagree への布石として、相手の主張は always / inevitably など極端な語を含めて引用しておくのがコツ。"
    },
    {
      "en": "However, I disagree with the claim that human societies will always have a negative effect on the environment.",
      "ja": "しかし私は、人間社会が常に環境に悪影響を与え続けるという主張に反対する。",
      "structure": "SVO。S=I、V=disagree with、O=the claim。that 以下は claim の中身を述べる同格節。",
      "grammar": "① However = 前文の一般論からの転換。文頭+カンマ。② the claim that 〜 の that は同格の that(関係代名詞ではない)。「〜という主張」と名詞の中身を説明する。③ will always have = 未来+always で、お題の全称的主張をそのまま標的に据える。④ have a negative effect on = 影響表現の基本形。effect は可算で a、対象は on。⑤ the environment = 「(地球の)環境」は常に the が付く決まり。",
      "writing": "Disagree 型の thesis は However, I disagree with the claim that + [お題の言い換え] が鉄板。同格 that で相手の主張を一文に封じ込め、その always を本論3段落で崩す設計を宣言する。"
    },
    {
      "en": "First, technological innovation is steadily reducing humanity's ecological footprint.",
      "ja": "第一に、技術革新は人類の生態学的足跡を着実に減らしている。",
      "structure": "SVO。S=technological innovation、V=is reducing(現在進行形)、O=humanity's ecological footprint。",
      "grammar": "① First, = 本論1の開始マーカー。② is reducing = 現在進行形。「今まさに進行中の変化」を描く。一般的性質の現在形 reduces ではなく進行形にすることで趨勢を表す。steadily(着実に)が進行形と好相性。③ technological innovation = 抽象概念で不可算・無冠詞。④ humanity's = 人類・組織などは無生物でも所有格 's が使える。ecological footprint = 環境負荷を表す比喩の定番語。",
      "writing": "本論のトピックセンテンスは First, + [抽象名詞主語] + is steadily -ing の進行形が便利。「〜が変わりつつある」という趨勢型の理由に流用できる。X is steadily reducing / improving / transforming Y の型で持っておく。"
    },
    {
      "en": "Renewable energy, electric vehicles, and recycling systems already allow people to consume resources far more cleanly than in the past.",
      "ja": "再生可能エネルギー、電気自動車、リサイクル制度は、すでに人々が過去よりもはるかに清潔に資源を消費することを可能にしている。",
      "structure": "SVOC。S=3項並列の名詞句、V=allow、O=people、C=to consume 以下の不定詞。",
      "grammar": "① A, B, and C の3項並列が主語。具体物を3つ並べて前文の innovation を具体化する。② allow O to do = 「Oが〜するのを可能にする」。enable / permit と同じく to不定詞を取る使役系。③ far more cleanly than = 副詞の比較級を far で強調「はるかに」。④ than in the past = 比較対象が前置詞句。than they did in the past の圧縮。⑤ resources は無冠詞複数の総称(資源全般)。",
      "writing": "抽象論を具体に落とす2文目は [具体例3連] + allow people to do の無生物主語構文。far more 〜 than in the past は進歩を語る万能比較としてどのエッセイにも入る。"
    },
    {
      "en": "For instance, several nations now generate most of their electricity from wind and solar power, proving that growth and sustainability can coexist.",
      "ja": "例えば、いくつかの国は今や電力の大部分を風力と太陽光で生み出しており、成長と持続可能性が共存できることを証明している。",
      "structure": "SVO+文末分詞構文。S=several nations、V=generate、O=most of their electricity。proving 以下は主節全体を意味上の主語とする分詞構文(結果)。",
      "grammar": "① For instance, = For example の言い換え。② several nations = 可算複数。固有名詞を出さずに「いくつかの国」とぼかしつつ実例らしさを出す技。③ most of their electricity = most of + 所有格 + 名詞。electricity は不可算。④ , proving that 〜 = 文末分詞構文(結果)。and this proves that の圧縮で「そしてそれが〜を証明している」。⑤ growth and sustainability can coexist = 無冠詞の抽象名詞ペア。coexist = co-(共に)+ exist。",
      "writing": "具体例の文末に , proving that + [自分の主張] を付けるのが最重要テク。例を出しっぱなしにせず、その場で主張へ接続できる。, demonstrating / showing that も同型。語数も稼げる1級の武器。"
    },
    {
      "en": "Second, environmental awareness has fundamentally changed public behavior.",
      "ja": "第二に、環境意識は人々の行動を根本的に変えた。",
      "structure": "SVO。S=environmental awareness、V=has changed(現在完了)、O=public behavior。",
      "grammar": "① Second, = 本論2マーカー(First と同型)。② has changed = 現在完了。「過去から現在までに変化が完了し、その結果が今ある」。本論1の進行形(変化の途中)と対照的に、完了形は「もう変わった」を主張する時制の使い分け。③ environmental awareness / public behavior = どちらも不可算・無冠詞の抽象名詞。fundamentally(根本的に)が変化の深さを強調。",
      "writing": "X has fundamentally changed Y は「社会の変化」を理由にするトピックセンテンスの万能型。awareness / attitudes / values を主語に置くと意識変化系の理由が1文で立つ。"
    },
    {
      "en": "There is no denying that decades of education have produced citizens who actively demand conservation.",
      "ja": "数十年にわたる教育が、保全を積極的に求める市民を生み出してきたことは否定できない。",
      "structure": "There is no -ing の動名詞慣用構文。that 節内は S(decades of education) + V(have produced) + O(citizens) + 関係詞節 who 〜。",
      "grammar": "① There is no denying that 〜 = 「〜は否定できない」動名詞の慣用構文。There is no -ing = 〜できない(There is no telling = 分からない)。強い断定を客観形で言える。② decades of education = 複数形 decades で長い時間幅を表す。education は不可算。③ have produced = 現在完了。主語 decades は複数なので have。④ citizens who actively demand = 関係代名詞 who の制限用法。citizens は無冠詞複数の総称。⑤ conservation = 不可算・無冠詞。",
      "writing": "There is no denying that 〜 は強い事実提示の型としてどのエッセイでも1回使える。decades of + [不可算名詞] have produced 〜 は「長年の蓄積が〜を生んだ」という因果テンプレ。"
    },
    {
      "en": "Consequently, governments and corporations face mounting pressure to adopt greener policies, a trend that continues to strengthen.",
      "ja": "その結果、政府や企業はより環境に優しい政策を採用するよう高まる圧力に直面しており、その傾向は強まり続けている。",
      "structure": "SVO。S=governments and corporations、V=face、O=mounting pressure(to adopt 〜 が修飾)。文末の a trend that 〜 は前文内容全体の同格名詞句。",
      "grammar": "① Consequently, = 前文の帰結を導く接続副詞。Therefore よりやや緩い「その結果」。② face mounting pressure to do = 「〜せよという高まる圧力に直面する」。mounting = 現在分詞由来の形容詞「増大しつつある」。pressure は不可算。to adopt は pressure を修飾する不定詞。③ greener policies = 比較対象を明示しない絶対比較級「(今より)環境に優しい政策」。④ , a trend that continues to strengthen = 文末の同格名詞句。前の内容全体を a trend と要約し直し、関係代名詞 that で補足する。which is a trend 〜 の圧縮で1級の高級テク。",
      "writing": "文末に , a trend that 〜 / , a development that 〜 と同格名詞句を足すと、直前の内容を要約しつつ一段深められる。face mounting pressure to do は政府・企業を主語にした社会情勢の描写にそのまま使える。"
    },
    {
      "en": "Finally, humans are uniquely capable of restoring damaged ecosystems.",
      "ja": "最後に、人間は損なわれた生態系を回復させる独自の能力を持つ。",
      "structure": "SVC。S=humans、V=are、C=capable(of restoring 〜 が続く)。",
      "grammar": "① Finally, = 本論3マーカー。② be capable of -ing = 「〜する能力がある」。of の後は動名詞(× capable to do)。uniquely が「人間だけが持つ」という含みを添える。③ humans = 無冠詞複数の総称「人間というもの」。④ damaged = 過去分詞の前置修飾「損なわれた」。ecosystems は可算複数。",
      "writing": "be uniquely capable of -ing は「その主体にしかできないこと」を理由にする文の型。can より能力を強調でき、fully / perfectly など副詞で程度も調整できる。"
    },
    {
      "en": "From a long-term perspective, reforestation projects that alleviate ecological damage and the recovery of endangered species demonstrate that our influence can be positive.",
      "ja": "長期的視点で見れば、生態系の損傷を緩和する植林事業や絶滅危惧種の回復は、我々の影響が肯定的でありうることを示している。",
      "structure": "SVO。S=2つの名詞句の並列(reforestation projects that 〜 と the recovery of 〜)、V=demonstrate、O=that 節。",
      "grammar": "① From a long-term perspective, = 視点を宣言する前置詞句。理由に奥行きを出す定番。② 主語は並列: reforestation projects that alleviate 〜(関係代名詞 that)+ the recovery of endangered species。並列主語で複数扱い → demonstrate に三単現の -s なし。③ alleviate = reduce の格上げ「緩和する」。④ the recovery of 〜 = of 句で特定されるので the。endangered = 過去分詞由来の形容詞「絶滅の危機にある」。⑤ demonstrate that = show の格上げ。that 節内は can be positive と可能性で主張する。",
      "writing": "From a long-term perspective, は理由の視点替えフレーズとして毎回1つ入れたい。長い並列主語 + demonstrate that + [主張] は、具体例2連から主張へ跳ぶときの型。"
    },
    {
      "en": "Admittedly, past damage has been severe, yet this very awareness now drives active repair.",
      "ja": "確かに過去の被害は深刻だったが、まさにその自覚が今、積極的な修復を促している。",
      "structure": "重文。前半 SVC(past damage has been severe)、yet で反転し後半 SVO(this very awareness drives active repair)。",
      "grammar": "① Admittedly, 〜, yet 〜 = 譲歩→反転の1文完結型。Admittedly で相手の一理を認め、yet で即座に切り返す。but より書き言葉的で強い。② has been severe = 現在完了。「これまでずっと深刻だった(その事実は今に続く)」。③ this very awareness = very が形容詞で「まさにその」。指示語 this + very で直前の内容を強く指す。④ drives = 無生物主語+三単現。「自覚が修復を駆動する」という比喩用法。",
      "writing": "本論の中に Admittedly, 〜, yet 〜 を1文入れると反論処理が済んで説得力が跳ね上がる。this very + [名詞] は「まさにそれこそが」と相手の論拠を自分の武器に変える返し技。"
    },
    {
      "en": "In conclusion, although human societies have undoubtedly had a detrimental effect on nature in the past, technological progress, shifting values, and restorative efforts show that this damage is not inevitable.",
      "ja": "結論として、人間社会が過去に間違いなく自然を害してきたとはいえ、技術の進歩、価値観の変化、修復の努力は、この被害が不可避ではないことを示している。",
      "structure": "although 譲歩節 + 主節。主節は S=3項並列の名詞句、V=show、O=that 節。",
      "grammar": "① In conclusion, = 結論マーカー。② although 節で結論でももう一度譲歩を挟む。have had = 現在完了(過去から現在まで)。undoubtedly = 文副詞「疑いなく」で譲歩を誠実に見せる。③ a detrimental effect on = have a negative effect on(第2文)の detrimental への格上げ言い換え。語彙の幅を見せる。④ nature = 「自然」は無冠詞・不可算(× the nature)。⑤ 主節の主語は technological progress, shifting values, and restorative efforts の3項並列 = 本論1・2・3の要約。複数扱いで show。⑥ this damage is not inevitable = お題のキーワード inevitable を否定して回収。",
      "writing": "結論の型: In conclusion, although + [譲歩], [本論3つの名詞句] show that + [thesis 再宣言]。本論の各段落を2語程度の名詞句に圧縮して並べるのが200語エッセイの結論の作法。お題のキーワードは結論で必ず肯定・否定し直す。"
    },
    {
      "en": "Therefore, I maintain that humanity need not always be a destructive force.",
      "ja": "したがって、私は人類が常に破壊的な力である必要はないと主張する。",
      "structure": "SVO。S=I、V=maintain、O=that 節。節内は助動詞 need not + be。",
      "grammar": "① Therefore, = 最終文の結論マーカー。② I maintain that 〜 = believe の格上げ「主張する」。③ need not = 助動詞の need。否定文・疑問文でのみ助動詞として機能する(だから need not be と原形が続き、needs not とはならない)。always と組んで「常に〜とは限らない」と全称命題を部分否定。④ a destructive force = 可算の a。人類を「一つの力」として性格づける比喩。",
      "writing": "締めの1文は Therefore, I maintain that + [thesis]。need not always be は always / never 系のお題を潰す専用装備で、全否定でなく「常にではない」と論理的に正確な着地ができる。"
    }
  ],
  "12": [
    {
      "en": "Genetic engineering has advanced rapidly in recent decades, prompting debate over its far-reaching ramifications for humanity.",
      "ja": "遺伝子工学はここ数十年で急速に進歩し、人類への広範な影響をめぐる議論を呼んでいる。",
      "structure": "SV。S=Genetic engineering、V=has advanced。文末の prompting 〜 は主節全体を意味上の主語とする分詞構文(結果)。",
      "grammar": "① has advanced = 現在完了。in recent decades という期間表現が「過去から現在まで」の完了形を要求する。② , prompting debate over 〜 = 文末分詞構文(結果)。and has prompted の圧縮で「そしてそれが議論を呼んでいる」。debate は不可算。③ far-reaching = 複合形容詞「広範囲に及ぶ」。ramifications = consequences の格上げ語で「(複雑に派生する)影響」。通例複数形。④ for humanity = 無冠詞・不可算「人類にとっての」。",
      "writing": "序論1文目の型: [テーマ] has advanced/changed rapidly in recent decades, prompting debate over 〜。テーマの現状と論争の存在を1文で立てられる万能導入。ramifications は implications と並ぶ1級語彙。"
    },
    {
      "en": "Although some fear its misuse, I agree that genetic engineering will have a positive influence on society in the future.",
      "ja": "その悪用を恐れる人もいるが、私は遺伝子工学が将来社会に良い影響を与えるという意見に賛成する。",
      "structure": "Although 譲歩節 + 主節 SVO。S=I、V=agree、O=that 節。",
      "grammar": "① Although some fear 〜, I agree that 〜 = 譲歩→thesis の型。some = some people の省略で「〜する人もいる」の代名詞用法。② its misuse = its は genetic engineering を受ける所有格。misuse は不可算「悪用」。③ will have a positive influence on = 影響表現。influence / effect / impact は交換可能でどれも on を取る。可算で a。④ in the future が will と呼応。",
      "writing": "賛成型の thesis は Although some fear/argue 〜, I agree that + [お題ほぼそのまま]。反対意見を先に短く置くと自分の立場が際立つ。影響表現は effect / influence / impact をローテーションして重複を避ける。"
    },
    {
      "en": "First, genetic engineering promises to revolutionize medicine.",
      "ja": "第一に、遺伝子工学は医療に革命をもたらすと期待される。",
      "structure": "SVO。S=genetic engineering、V=promises、O=to revolutionize medicine(不定詞)。",
      "grammar": "① promises to do = 無生物主語で「〜すると見込まれる・有望だ」。人の「約束」ではなく物事の「有望さ」の意味になる語法。to不定詞を取る。② revolutionize = change の最大級の格上げ「革命を起こす」。-ize 動詞。③ medicine = 「医学・医療」は不可算・無冠詞。a medicine なら「薬(1種)」と意味が変わる。",
      "writing": "X promises to revolutionize Y は本論トピックセンテンスの強い型。悪い見込みなら threatens to do。この対で覚えると賛否どちら側でも使える。"
    },
    {
      "en": "By correcting defective genes, scientists may cure inherited diseases that were once considered hopeless.",
      "ja": "欠陥のある遺伝子を修正することで、科学者はかつて絶望的とみなされた遺伝病を治せるかもしれない。",
      "structure": "By + 動名詞句(手段) + 主節 SVO。S=scientists、V=may cure、O=inherited diseases(that 以下の関係詞節が修飾)。",
      "grammar": "① By -ing, = 手段の前置詞+動名詞「〜することによって」。文頭に置いて方法を先出し。② may cure = 推量の may。断定を避けつつ可能性を主張する誠実な助動詞選択。③ defective / inherited = 形容詞・過去分詞の前置修飾。inherited diseases = 「遺伝性の病気」。④ that were once considered hopeless = 関係代名詞 that + consider O C の受動(be considered C)。「かつて絶望的とみなされた」。once = かつて。",
      "writing": "By + -ing, S may/can + 動詞 は「手段→効果」を1文で書く基本型。that were once considered + [形容詞] は「昔は〜だったが今は違う」の対比を関係詞に埋め込む便利技。"
    },
    {
      "en": "For instance, gene therapies are already being used to treat certain cancers and blood disorders, offering hope to countless patients.",
      "ja": "例えば、遺伝子治療はすでに特定のがんや血液疾患の治療に用いられており、無数の患者に希望を与えている。",
      "structure": "受動態の進行形 SV。S=gene therapies、V=are being used。to treat 〜 は目的の不定詞。offering 以下は文末分詞構文。",
      "grammar": "① are already being used = 現在進行形の受動態(be being done)。「今まさに使われつつある」。already が「もう実用段階」を強調し、前文の推量 may cure を現実の証拠で補強する。② to treat = 目的の不定詞。③ certain cancers = certain + 複数「特定の〜」。病気の種類を言うときの cancer は可算化する。④ , offering hope to 〜 = 文末分詞構文(付帯・結果)。hope は不可算。countless = many の格上げ「無数の」。",
      "writing": "具体例は are already being used to do の進行受動で「実用化が進行中」と書くと説得力が出る。文末の , offering hope to 〜 は恩恵を一気に付け足す分詞構文で、Day11 の proving that と同族の武器。"
    },
    {
      "en": "Second, this technology can strengthen global food security.",
      "ja": "第二に、この技術は世界の食料安全保障を強化しうる。",
      "structure": "SVO。S=this technology、V=can strengthen、O=global food security。",
      "grammar": "① Second, = 本論2マーカー(既出)。② this technology = 指示語で genetic engineering を言い換え、同語反復を避ける結束の基本動作。③ can = 可能性の can「〜しうる」。④ global food security = 不可算・無冠詞のかたまり。security は「安全保障」の意味で不可算。",
      "writing": "本論2以降のトピックセンテンスは主語を this technology / this practice / this policy と指示語で受けると文章に結束性が出る。X can strengthen Y は控えめで守りの堅い主張の型。"
    },
    {
      "en": "From a long-term perspective, genetically modified crops that resist pests and drought will be essential as the world's population grows.",
      "ja": "長期的視点で見れば、害虫や干ばつに強い遺伝子組み換え作物は、世界人口が増えるにつれて不可欠になる。",
      "structure": "SVC。S=genetically modified crops(that 以下の関係詞節が修飾)、V=will be、C=essential。as 節は「〜するにつれて」の従属節。",
      "grammar": "① From a long-term perspective, = 視点フレーズ(Day11 と同じ型)。② genetically modified = 副詞+過去分詞の複合修飾「遺伝子組み換えの」。③ that resist pests and drought = 関係代名詞 that。先行詞 crops が複数なので resist に -s なし。④ will be essential = 未来の断定。⑤ as the world's population grows = 比例の as「〜するにつれて」。増減の文脈で頻出。population は単数扱い → grows。the world's = 所有格。",
      "writing": "as + S + grows/increases/declines は「趨勢とともに」の従属節としてどの未来系お題にも入れられる。will be essential as 〜 で必要性を時間軸に載せる型。"
    },
    {
      "en": "Consequently, regions vulnerable to famine could achieve stable harvests and reduce dependence on imports.",
      "ja": "その結果、飢饉に弱い地域も安定した収穫を達成し、輸入への依存を減らせるだろう。",
      "structure": "SVO。S=regions(vulnerable to famine が後置修飾)、V=could achieve と (could) reduce の並列、O=それぞれ stable harvests / dependence。",
      "grammar": "① Consequently, = 帰結の接続副詞(既出)。② regions vulnerable to famine = 形容詞句の後置修飾。regions (that are) vulnerable to 〜 の関係詞+be 省略。vulnerable to = 「〜に弱い」で to とセット。③ could achieve = 仮定的可能性の could。「(実現すれば)達成しうる」。will より控えめで未来の推測に誠実。④ achieve と reduce の動詞並列。dependence on = 「〜への依存」で on とセット、不可算。imports = 複数形「輸入品」。",
      "writing": "理由段落の締めは Consequently, + [受益者] could + [恩恵] で因果を完結させる。名詞 + vulnerable to 〜 の後置修飾は「弱者・リスク集団」を一言で描く1級の圧縮技。"
    },
    {
      "en": "Finally, genetic engineering serves as a catalyst for broader scientific progress.",
      "ja": "最後に、遺伝子工学はより広い科学的進歩の触媒となる。",
      "structure": "SV+前置詞句。S=genetic engineering、V=serves、as a catalyst for 〜 が補語的に役割を示す。",
      "grammar": "① serve as 〜 = 「〜として機能する・役割を果たす」。② a catalyst for 〜 = 化学用語「触媒」の比喩で、原因・促進剤を上品に言う語。可算で a、対象は for。③ broader = 絶対比較級「より広範な」。④ scientific progress = 不可算・無冠詞。",
      "writing": "X serves as a catalyst for Y は「きっかけ・促進」の因果を書く格上げコロケーション。lead to の言い換え手札として必携。"
    },
    {
      "en": "The knowledge gained from manipulating genes deepens our understanding of biology itself.",
      "ja": "遺伝子を操作することで得られる知識は、生物学そのものへの理解を深める。",
      "structure": "SVO。S=The knowledge(gained from 〜 が後置修飾)、V=deepens、O=our understanding of biology itself。",
      "grammar": "① The knowledge gained from 〜 = 過去分詞の後置修飾。knowledge (that is) gained の省略。knowledge は不可算だが gained from 〜 で特定されて the が付く。② from manipulating = 前置詞 + 動名詞。③ deepens = 主語 The knowledge は単数扱い → 三単現の -s。deepen = 形容詞 deep の動詞化「深める」。④ our understanding of 〜 = understanding は不可算、所有格 our で限定。biology itself = 再帰代名詞の強調用法「生物学そのもの」。",
      "writing": "The knowledge/skills gained from 〜 deepens/enhances ... は「副産物の恩恵」を語る型。X itself の強調は「応用だけでなく本体まで」と議論を一段広げるときに便利。"
    },
    {
      "en": "Admittedly, ethical concerns regarding misuse are legitimate, yet careful regulation can ensure that the technology benefits rather than harms society.",
      "ja": "確かに悪用に関する倫理的懸念はもっともだが、慎重な規制によってこの技術が社会を害するのではなく利するようにできる。",
      "structure": "重文。前半 SVC(concerns are legitimate)、yet で反転し後半 SVO(regulation can ensure + that 節)。",
      "grammar": "① Admittedly, 〜, yet 〜 = 譲歩→反転の1文完結型(Day11 と同じ)。② concerns regarding misuse = regarding = about の堅い言い換え。concerns は可算複数「懸念(の数々)」。legitimate = 「もっともな」で相手を尊重する譲歩語彙。③ careful regulation can ensure that 〜 = ensure + that 節「確実に〜するようにする」。regulation は不可算。④ benefits rather than harms = 動詞の rather than 対比並列。両方とも三単現 -s(主語 the technology)で文法形を揃えるのが鉄則。",
      "writing": "倫理・リスク系の反論処理はこの1文が完成形: Admittedly, ethical concerns regarding 〜 are legitimate, yet careful regulation can ensure that ... 。benefits rather than harms society は対句ごと暗記して転用できる。"
    },
    {
      "en": "In conclusion, although genetic engineering raises valid ethical questions, its potential to cure diseases, feed populations, and accelerate science means the advantages outweigh the disadvantages.",
      "ja": "結論として、遺伝子工学はもっともな倫理的問題を提起するものの、病気を治し、人々を養い、科学を加速させるその可能性は、利点が欠点を上回ることを意味する。",
      "structure": "although 譲歩節 + 主節 SVO。S=its potential(to 不定詞3連が修飾)、V=means、O=(that) the advantages outweigh the disadvantages。",
      "grammar": "① In conclusion, although 〜 = 結論+譲歩の型(Day11 と同じ)。raise valid questions = 「もっともな問いを提起する」。② its potential to cure diseases, feed populations, and accelerate science = potential を修飾する to 不定詞の3連並列。動詞句3つで本論3段落を圧縮回収する。③ means (that) 〜 = 主語 its potential は単数 → means。接続詞 that は省略。④ the advantages outweigh the disadvantages = 賛否の天秤を傾ける結論の定番動詞(Day1 の型)。",
      "writing": "結論は its potential to A, B, and C means the advantages outweigh the disadvantages の1文で本論回収+天秤が完了する。to 不定詞3連の圧縮は語数調整にも効く。"
    },
    {
      "en": "Therefore, I firmly believe that genetic engineering will ultimately benefit future generations.",
      "ja": "したがって、私は遺伝子工学が最終的に未来の世代に恩恵をもたらすと固く信じている。",
      "structure": "SVO。S=I、V=firmly believe、O=that 節。節内は S+will+動詞+O の単純な SVO。",
      "grammar": "① Therefore, I firmly believe that 〜 = 最終宣言の定番(firmly が believe を強める)。② ultimately = 「最終的には」。短期の懸念を認めつつ長期の利益で締めるニュアンスを1語で出す副詞。③ benefit = ここでは他動詞「〜に利益を与える」。④ future generations = 無冠詞複数の総称。",
      "writing": "締めの型: Therefore, I firmly believe that X will ultimately benefit future generations. 未来系お題の最終文としてほぼ万能。ultimately を挟むと譲歩した懸念との整合が取れる。"
    }
  ],
  "13": [
    {
      "en": "In recent years, the question of whether governments should allocate more resources to technological development has attracted considerable attention.",
      "ja": "近年、政府が技術開発にもっと多くの資源を割くべきかという問いが大きな注目を集めている。",
      "structure": "SVO。S=the question of whether 節(長い名詞句・単数扱い)、V=has attracted、O=considerable attention。",
      "grammar": "① In recent years + has attracted = 現在完了。期間表現との呼応(Day12 冒頭と同じ理屈)。② the question of whether 〜 = 同格の of。「〜かどうかという問い」で whether 節が question の中身。この長い名詞句全体が主語で単数扱い → has。③ allocate resources to = 「〜に資源を配分する」。spend の格上げ。governments = 無冠詞複数の総称。④ attract considerable attention = attention は不可算。considerable = much の格上げ。",
      "writing": "序論1文目の最頻出型: In recent years, the question of whether + [お題] has attracted considerable attention. お題を whether 節に埋め込むだけで完成する、省エネかつ堅牢な導入。"
    },
    {
      "en": "In my opinion, technology should indeed become a bigger priority for governments.",
      "ja": "私の意見では、技術は確かに政府にとってより大きな優先事項となるべきだ。",
      "structure": "SVC。S=technology、V=should become、C=a bigger priority。",
      "grammar": "① In my opinion, = thesis 宣言の前置き。② should = お題が Should 〜? なので同じ助動詞で直答する。③ indeed = 「確かに・まさに」でお題の主張を肯定的に強める副詞。問いへの直答感を出す。④ a bigger priority = 比較級 + 可算名詞。priority は「優先事項」の意味で可算なので a が必要。",
      "writing": "Should 型のお題には In my opinion, S should indeed 〜 とお題の助動詞をそのまま使って即答するのが型。indeed の一語で「問いに正面から答えた」ことが伝わる。"
    },
    {
      "en": "I will support this view from the perspectives of economic growth, public welfare, and national competitiveness.",
      "ja": "経済成長、公共福祉、国家競争力の観点からこの見解を支持したい。",
      "structure": "SVO。S=I、V=will support、O=this view。from the perspectives of 〜 は観点を示す前置詞句。",
      "grammar": "① I will support this view = 未来 will で「これから論証する」と宣言するロードマップ文。② from the perspectives of A, B, and C = 観点の3連予告。観点が3つあるので perspectives と複数形。③ 3項がすべて「形容詞+不可算名詞」(economic growth / public welfare / national competitiveness)で形が揃っている = パラレリズム。並列の文法形を揃えるのは減点回避の基本。",
      "writing": "序論3文目のロードマップ: I will support this view from the perspectives of A, B, and C. 本論3段落の見出しを名詞句で予告する。3項の品詞構成を揃えるのが1級の並列の作法。"
    },
    {
      "en": "First, technological investment plays a pivotal role in driving long-term economic growth.",
      "ja": "第一に、技術投資は長期的な経済成長を牽引するうえで極めて重要な役割を果たす。",
      "structure": "SVO。S=technological investment、V=plays、O=a pivotal role。in driving 〜 は前置詞+動名詞。",
      "grammar": "① play a pivotal role in -ing = play a crucial role の言い換え。pivotal = 「中枢の」で crucial / vital と交換可能。role は可算で a 必須。in + 動名詞が続く語法。② driving = 「牽引する」。drive の比喩用法。③ long-term = ハイフン付き複合形容詞(名詞の前の限定用法)。④ technological investment / economic growth = 不可算・無冠詞。",
      "writing": "play a pivotal/crucial/vital role in -ing は重要性トピックセンテンスの三種の神器。形容詞を回して同じ型の使い回し感を消すのがコツ。"
    },
    {
      "en": "New industries created by emerging technologies generate employment and tax revenue that benefit the entire nation.",
      "ja": "新興技術が生み出す新産業は、国全体に恩恵をもたらす雇用と税収を生む。",
      "structure": "SVO。S=New industries(created by 〜 が後置修飾)、V=generate、O=employment and tax revenue(that 以下が修飾)。",
      "grammar": "① created by 〜 = 過去分詞の後置修飾。industries (that are) created の省略で、by が行為者を示す。② emerging = 現在分詞由来の形容詞「新興の」。③ generate = 主語 industries が複数なので三単現 -s なし。④ employment / tax revenue = ともに不可算・無冠詞。⑤ that benefit the entire nation = 関係代名詞 that。先行詞は employment and tax revenue の並列なので benefit に -s なし。benefit はここでは他動詞。entire = all の格上げ。",
      "writing": "[新しい物] created by [技術・政策] generate [恩恵] という無生物主語の連鎖は経済系の理由の核。employment and tax revenue は「経済の恩恵」の具体化ペアとしてそのまま使える。"
    },
    {
      "en": "A case in point is South Korea, whose aggressive government funding of the semiconductor sector transformed it into a global economic powerhouse.",
      "ja": "好例が韓国であり、政府による半導体分野への積極的な資金投入が同国を世界的な経済大国へと変えた。",
      "structure": "SVC の倒置気味の提示文。S=A case in point、V=is、C=South Korea。whose 以下は非制限の関係詞節(S=funding、V=transformed、O=it)。",
      "grammar": "① A case in point is 〜 = 「好例が〜だ」。For example の名詞版で、例そのものを主語に据えられる。② whose = 所有格の関係代名詞。国のような無生物にも使える。「その国の〜が」。③ funding of the semiconductor sector = funding は不可算。特定の産業部門なので the semiconductor sector。④ transformed A into B = 「AをBに変えた」。韓国の変貌は過去の完結した事実なので過去形。⑤ a global economic powerhouse = powerhouse = 「強国・原動力」の比喩。可算で a。",
      "writing": "実例は A case in point is + [固有名詞], whose 〜 の1文で「例の提示+説明」まで済ませる。transform A into B は変化の因果を強く言う動詞として頻用できる。"
    },
    {
      "en": "Second, technology dramatically improves public welfare.",
      "ja": "第二に、技術は公共福祉を劇的に向上させる。",
      "structure": "SVO。S=technology、V=improves、O=public welfare。",
      "grammar": "① Second, = 本論2マーカー(既出)。② dramatically = 程度の副詞で動詞 improves を強調。③ 現在形 improves = 一般的性質・真理として述べる時制選択。三単現の -s。④ public welfare = 不可算・無冠詞。",
      "writing": "トピックセンテンスは短くてよい。S + dramatically improves + O の1文で立て、詳細は次文に譲る。長短の緩急も200語エッセイの技術。"
    },
    {
      "en": "Innovations in medicine, transportation, and energy directly enhance the quality of citizens' daily lives.",
      "ja": "医療、交通、エネルギーの革新は市民の日常生活の質を直接高める。",
      "structure": "SVO。S=Innovations(in A, B, and C が分野を限定)、V=enhance、O=the quality of citizens' daily lives。",
      "grammar": "① Innovations in A, B, and C = 分野を in で3連並列。innovations は可算複数(個々の革新)。概念としての不可算 innovation との使い分けに注意。② enhance = improve の格上げ。主語が複数なので -s なし。③ the quality of 〜 = of 句で特定 → the。④ citizens' = 複数形の所有格(s の後にアポストロフィのみ)。daily lives = life の複数形 lives。人それぞれの生活なので複数。",
      "writing": "Innovations in A, B, and C enhance 〜 は具体分野を3つ挟んで抽象論に実感を持たせる型。the quality of people's daily lives は福祉・生活系の万能フレーズ。"
    },
    {
      "en": "For instance, government-backed research into renewable energy not only reduces pollution but also secures a sustainable future for coming generations.",
      "ja": "たとえば政府主導の再生可能エネルギー研究は、汚染を減らすだけでなく、次世代のために持続可能な未来を確保する。",
      "structure": "SVO。S=government-backed research、V=not only reduces ... but also secures ... の並列、O=それぞれ pollution / a sustainable future。",
      "grammar": "① government-backed = 名詞+過去分詞の複合形容詞「政府支援の」。② research into 〜 = research は不可算で、研究対象は into(または on)で示す。③ not only A but also B = 相関接続詞。reduces と secures の動詞句同士を並列(両方とも三単現)。並列の文法形を揃えるのが鉄則。④ a sustainable future = 可算の a。coming generations = 現在分詞修飾「来たるべき世代」= future generations の言い換え。pollution は不可算・無冠詞。",
      "writing": "not only reduces 〜 but also secures 〜 のように恩恵を二段重ねにすると1文の密度が上がる。X-backed / X-driven / X-based の複合形容詞は主語を重厚にする1級の常套手段。"
    },
    {
      "en": "Finally, from a long-term perspective, nations that neglect technology risk falling behind their rivals.",
      "ja": "最後に、長期的に見れば、技術を軽視する国は競争相手に後れを取る危険がある。",
      "structure": "SVO。S=nations(that neglect technology の関係詞節が修飾)、V=risk、O=falling behind 〜(動名詞)。",
      "grammar": "① Finally, + from a long-term perspective, = マーカー2連(いずれも既出)。② nations that neglect 〜 = 関係代名詞 that。無冠詞複数 nations は総称。③ risk -ing = 「〜する危険を冒す」。risk は動名詞を取る動詞(× risk to fall)。avoid / consider と同グループ。④ fall behind 〜 = 「〜に後れを取る」句動詞。",
      "writing": "賛成論の3本目は「やらないリスク」で書くと角度が変わる。S that neglect X risk falling behind 〜 は否定シナリオ提示の型で、risk -ing の動名詞語法ごと流用できる。"
    },
    {
      "en": "In an increasingly globalized world, military and economic security depend heavily on technological superiority.",
      "ja": "ますますグローバル化する世界では、軍事的・経済的安全保障は技術的優位に大きく依存する。",
      "structure": "SV+前置詞句。S=military and economic security(形容詞2つの並列)、V=depend on、副詞 heavily が程度を強調。",
      "grammar": "① In an increasingly globalized world = 副詞+過去分詞+名詞の前置き句「ますますグローバル化する世界では」。時代背景の万能枕。② military and economic security = 形容詞2つが security を共有する並列。意味上2領域を指すので動詞は depend と複数呼応。③ depend heavily on = 「〜に大きく依存する」。on とセット。④ technological superiority = 不可算・無冠詞「技術的優位」。",
      "writing": "In an increasingly globalized/digitalized/interconnected world は現代性を出す前置きとして毎回使える。depend heavily on は因果・依存を言う基本表現。"
    },
    {
      "en": "Admittedly, such investment is costly.",
      "ja": "確かにそうした投資は費用がかかる。",
      "structure": "SVC。S=such investment、V=is、C=costly。",
      "grammar": "① Admittedly, = 譲歩マーカー(既出)。今回は独立した短文で認める2文構成型。② such investment = such + 不可算名詞「そのような投資」。前段の内容を受けて特定する。③ costly = 「費用がかさむ」形容詞。語尾 -ly だが副詞ではない(friendly, lively と同類)。",
      "writing": "譲歩はこの短さでいい。Admittedly, such X is costly/risky. と最小限で認めてから次文の However で反撃する2文構成は、1文完結型(Admittedly 〜, yet 〜)と使い分ける。"
    },
    {
      "en": "However, the price of stagnation is far greater.",
      "ja": "しかし停滞の代償ははるかに大きい。",
      "structure": "SVC。S=the price of stagnation、V=is、C=far greater(比較級)。",
      "grammar": "① However, = 前文の譲歩への反転。② the price of stagnation = 比喩的な price(代償)。of 句で特定され the。stagnation = 不可算「停滞」。③ far greater = 比較級の far 強調(既出)。比較対象 than such investment は自明なので省略。",
      "writing": "譲歩の返しは The price/cost of inaction/stagnation is far greater. が決め台詞。「やるコストよりやらないコストが高い」の対比はコスト系の反論すべてに転用できる。"
    },
    {
      "en": "In conclusion, given its contribution to economic prosperity, public welfare, and national strength, technology clearly deserves greater priority.",
      "ja": "結論として、経済的繁栄、公共福祉、国力への貢献を踏まえれば、技術は明らかにより高い優先順位に値する。",
      "structure": "given + 名詞句(条件・根拠) + 主節 SVO。S=technology、V=deserves、O=greater priority。",
      "grammar": "① given 〜 = 前置詞化した過去分詞「〜を踏まえれば」。considering と同義で、結論の理由回収に最適。② its contribution to A, B, and C = contribution は to とセット。3項は本論3段落の再圧縮(economic prosperity / public welfare / national strength)。序論のロードマップと語を少し変えて言い換えている点も注目。③ deserves = 「〜に値する」三単現。clearly が断定を支える。greater priority = 第2文 a bigger priority の比較級言い換え。",
      "writing": "結論の型: In conclusion, given its contribution to A, B, and C, X clearly deserves 〜。given + 名詞句3連は because 節より引き締まった理由回収ができる。"
    },
    {
      "en": "For these reasons, I firmly believe that governments should invest more heavily in technological advancement.",
      "ja": "これらの理由から、政府は技術の進歩にもっと重点的に投資すべきだと強く信じる。",
      "structure": "SVO。S=I、V=firmly believe、O=that 節。節内は invest in の第1文型+副詞比較級。",
      "grammar": "① For these reasons, = 3理由を束ねる結びの決まり文句。② I firmly believe that = 強い最終宣言(既出)。③ invest in = 「〜に投資する」で in とセット。more heavily = 副詞の比較級で「もっと重点的に」。④ technological advancement = advancement は不可算「進歩」。development / progress の言い換え要員。",
      "writing": "最終文: For these reasons, I firmly believe that + [お題への直答]。お題の spend more を invest more heavily in と動詞ごと言い換えて締めるのが1級の作法。"
    }
  ],
  "14": [
    {
      "en": "With the rapid spread of digital technology, many people wonder whether their personal information remains safe.",
      "ja": "デジタル技術の急速な普及に伴い、多くの人が自分の個人情報が安全なままなのかと不安を抱いている。",
      "structure": "With + 名詞句(付帯状況) + 主節 SVO。S=many people、V=wonder、O=whether 節。節内は remain + 形容詞の SVC。",
      "grammar": "① With the rapid spread of 〜 = 付帯状況の with「〜の普及に伴い」。時事系導入の万能枕。spread は不可算で、of 句と形容詞により the が付く。② wonder whether 〜 = 「〜だろうかと思う」。whether 節(間接疑問)を目的語に取る。③ remains safe = remain + 形容詞(SVC)「〜のままである」。stay の格上げ。三単現 -s(主語 information は不可算単数)。④ personal information = 不可算(× informations)。",
      "writing": "序論1文目: With the rapid spread of + [技術・現象], many people wonder whether 〜。お題を人々の不安・疑問の形に変換して導入する型。"
    },
    {
      "en": "In my opinion, individual privacy can no longer be fully protected in the modern world.",
      "ja": "私の意見では、現代社会において個人のプライバシーをもはや完全には守れない。",
      "structure": "受動態の単文。S=individual privacy、V=can no longer be protected(助動詞+受動)。",
      "grammar": "① In my opinion, = thesis 宣言(既出)。② can no longer be protected = 助動詞 + no longer + 受動態「もはや〜されえない」。no longer は can と be の間に置く。守る主体が無数にいるため受動で主語をプライバシーに固定。③ fully = 部分否定の鍵。「完全には守れない」であって「全く守れない」ではない。反例を挙げられても崩れないよう先回りで守る副詞。④ individual privacy = 不可算・無冠詞。",
      "writing": "No 側の thesis: X can no longer be fully protected/maintained. fully / entirely を入れて主張を「完全には無理」に限定するのが防御の要。全否定の thesis は自滅する。"
    },
    {
      "en": "I will explain my position by examining data collection, government surveillance, and human carelessness.",
      "ja": "データ収集、政府による監視、人間の不注意という観点から立場を説明したい。",
      "structure": "SVO。S=I、V=will explain、O=my position。by examining 〜 は手段の前置詞+動名詞句。",
      "grammar": "① I will explain my position = ロードマップ文(Day13 と同じ役割)。② by examining = by + 動名詞(手段)。③ 3項並列 data collection / government surveillance / human carelessness はすべて「名詞または形容詞+名詞」の2語で統一されたパラレリズム。いずれも不可算・無冠詞。",
      "writing": "ロードマップの別型: I will explain my position by examining A, B, and C. Day13 の from the perspectives of 〜 と交互に使えば型のマンネリを避けられる。"
    },
    {
      "en": "First, corporations routinely collect vast amounts of personal data.",
      "ja": "第一に、企業は日常的に膨大な個人データを収集している。",
      "structure": "SVO。S=corporations、V=collect、O=vast amounts of personal data。",
      "grammar": "① First, = 本論1マーカー(既出)。② routinely = 「日常的に」。習慣を表す現在形と呼応し、問題の常態化を示す。③ vast amounts of + 不可算名詞 = 量を強調する型。amounts と複数形にして規模を出す。④ data はエッセイでは不可算扱いが標準。corporations = 無冠詞複数の総称。",
      "writing": "vast amounts of + [不可算名詞] は much の格上げとして必携。S routinely does で「恒常的にやっている」と描くと1文で問題の深刻さが伝わる。"
    },
    {
      "en": "Every online search, purchase, and click is recorded and analyzed for profit.",
      "ja": "あらゆるオンライン検索、購入、クリックが記録され、利益のために分析される。",
      "structure": "受動態。S=Every online search, purchase, and click(単数扱い)、V=is recorded and analyzed の並列受動。",
      "grammar": "① Every A, B, and C = every は3項並列でも単数扱い → is。「あらゆる検索も購入もクリックも」と網羅性を出す。② is recorded and analyzed = 受動態の並列。行為者(企業)は前文で明示済みなので by 句を省略し、「何がされるか」に焦点を当てる受動の選択。③ for profit = 無冠詞「利益目的で」。",
      "writing": "Every X, Y, and Z is done の型は監視・網羅系の描写で威力を発揮する。「行為者より行為の網羅性を見せたいときは受動」という態の選択基準ごと流用する。"
    },
    {
      "en": "A case in point is the practice of major technology firms tracking users across countless websites, eroding individuals' control over their own information.",
      "ja": "好例が、大手技術企業が無数のサイトをまたいで利用者を追跡するという慣行であり、それが自分の情報に対する個人の制御を侵食している。",
      "structure": "SVC。S=A case in point、V=is、C=the practice of 〜。tracking は動名詞で firms がその意味上の主語。eroding 以下は文末分詞構文(結果)。",
      "grammar": "① A case in point is 〜(Day13 で既出)。② the practice of A doing = 「Aが〜するという慣行」。tracking は動名詞、major technology firms はその意味上の主語(動名詞の主語を所有格でなく目的格で置く形)。③ across countless websites = across「〜をまたいで」。countless = many の格上げ(Day12 既出)。④ , eroding 〜 = 文末分詞構文(結果)「その結果〜を侵食している」。erode = 徐々に損なう比喩動詞。⑤ individuals' control over 〜 = 複数所有格 + control over(〜に対する支配)。over とセット。",
      "writing": "例が出来事でなく「慣行」のときは A case in point is the practice of A doing 〜 が使える。文末の , eroding/undermining 〜 で被害まで一気通貫に書くのは Day11 の proving that と同じ武器。"
    },
    {
      "en": "Second, government surveillance has expanded dramatically in the name of security.",
      "ja": "第二に、安全保障の名のもとに政府による監視が劇的に拡大している。",
      "structure": "SV。S=government surveillance、V=has expanded(現在完了)。in the name of 〜 は前置詞句。",
      "grammar": "① Second, = 本論2マーカー(既出)。② has expanded = 現在完了。「拡大してきて、拡大した状態が今ある」。dramatically が変化の規模を強調。③ in the name of 〜 = 「〜の名のもとに」。建前と実態のズレを匂わせる批判の定番フレーズ。④ government surveillance / security = ともに不可算・無冠詞。",
      "writing": "in the name of security/freedom/progress は批判側に回るときの切れ味あるフレーズ。完了形 + dramatically で「もう起きてしまった変化」としてトピックを提示する。"
    },
    {
      "en": "Cameras, facial recognition, and communication monitoring have become commonplace in many countries.",
      "ja": "多くの国でカメラ、顔認識、通信監視が当たり前になった。",
      "structure": "SVC。S=3項並列(複数扱い)、V=have become、C=commonplace。",
      "grammar": "① 3項並列の主語 → have(複数呼応)。② have become commonplace = become + 形容詞(SVC)の現在完了。「当たり前になった(今もそう)」。commonplace = common の格上げ。③ cameras は可算複数、facial recognition / communication monitoring は不可算の技術名。並列内で可算・不可算が混ざっても問題ない。",
      "writing": "X, Y, and Z have become commonplace は普及・常態化を言う定番。前文の抽象語(surveillance)を具体物3連で展開する2文セット構成ごと真似たい。"
    },
    {
      "en": "Consequently, citizens are constantly observed, and the boundary between safety and intrusion grows increasingly blurred.",
      "ja": "結果として市民は常に観察され、安全と侵害の境界はますます曖昧になっている。",
      "structure": "重文。前半は受動態(citizens are observed)、and の後半は SVC(the boundary grows blurred)。",
      "grammar": "① Consequently, = 帰結マーカー(既出)。② are constantly observed = 受動態。観視される側(市民)に焦点。頻度副詞 constantly は be と過去分詞の間。③ the boundary between A and B = between で2項間の境界が特定される → the。④ grows blurred = grow + 形容詞「次第に〜になる」。become より漸進的で、increasingly が重ねて漸進を強調。blurred = 過去分詞由来の形容詞「ぼやけた」。",
      "writing": "the boundary/line between A and B grows increasingly blurred は「境界が曖昧になる」系の論点(公私、仕事と生活、安全と侵害)にそのまま転用できる高級表現。"
    },
    {
      "en": "Finally, from a practical standpoint, ordinary people often undermine their own privacy.",
      "ja": "最後に、現実的に見て、一般の人々はしばしば自らプライバシーを損なっている。",
      "structure": "SVO。S=ordinary people、V=undermine、O=their own privacy。文頭は Finally + 視点の前置詞句。",
      "grammar": "① Finally, = 本論3マーカー(既出)。② from a practical standpoint = 視点フレーズ。perspective の言い換えとして standpoint を使い、Day13 型との重複を避ける。③ undermine = 「(下から)蝕む・損なう」。damage の格上げ。④ their own = own が「他ならぬ自分自身の」を強調し、守るべき本人が壊すという皮肉を支える。",
      "writing": "3本目の理由は「被害者自身の行動」など角度を変えると議論が立体化する。from a practical standpoint はその角度替えの宣言。S undermine their own X は自己矛盾を突く型。"
    },
    {
      "en": "Many willingly share personal details on social media without considering how much personal autonomy they surrender.",
      "ja": "多くの人が、どれほどの自己決定権を明け渡しているか考えもせず、進んでSNSに個人情報を投稿する。",
      "structure": "SVO。S=Many(代名詞)、V=share、O=personal details。without considering + 間接疑問(how much 〜 they surrender)が付帯。",
      "grammar": "① Many = 代名詞「多くの人」(many people の省略)。② willingly = 「自ら進んで」。強制されていない点が論旨の核で、この副詞が効いている。③ without -ing = 前置詞 + 動名詞「〜せずに」。④ how much personal autonomy they surrender = considering の目的語となる間接疑問。how much + 不可算名詞を節の頭に出し、後は平叙語順(they surrender)。⑤ surrender = give up の格上げ「明け渡す」。autonomy = 不可算「自律・自己決定権」。",
      "writing": "without considering how much X they surrender/sacrifice は「無自覚の代償」を書く型。SNS・利便性・AI依存系のお題で丸ごと使える。"
    },
    {
      "en": "Admittedly, stronger laws can offer some protection.",
      "ja": "確かに法律の強化はある程度の保護を与えうる。",
      "structure": "SVO。S=stronger laws、V=can offer、O=some protection。",
      "grammar": "① Admittedly, = 譲歩マーカー(既出)。Day13 と同じく短文で認める2文構成。② stronger laws = 絶対比較級「(今より)強い法律」。laws は可算複数。③ some protection = some + 不可算名詞で「ある程度の」。譲歩を「一部だけ」認める量の調整語として機能する。",
      "writing": "譲歩で some + 不可算名詞(some protection / some merit / some truth)を使うと「一定は認めるが十分ではない」の含みが1語で出る。"
    },
    {
      "en": "However, technology evolves far faster than regulation can keep pace.",
      "ja": "しかし技術は規制が追いつくよりはるかに速く進化する。",
      "structure": "SV+比較。S=technology、V=evolves。than 以下は S(regulation)+助動詞(can keep pace)の比較節。",
      "grammar": "① However, = 反転(既出)。② evolves far faster than 〜 = 副詞比較級 + far 強調(既出の型)。③ than regulation can keep pace = 比較節に主語+助動詞。keep pace (with it) の with it が省略された形。「規制が歩調を合わせられるより速く」。④ regulation = 不可算(規制という仕組み全般)。",
      "writing": "X evolves far faster than regulation can keep pace は技術vs制度系お題の決め文句。AI・プライバシー・遺伝子工学など頻出領域でそのまま撃てる。"
    },
    {
      "en": "In conclusion, given relentless data collection, pervasive surveillance, and widespread carelessness, true privacy has become nearly impossible to maintain.",
      "ja": "結論として、絶え間ないデータ収集、行き渡った監視、広範な不注意を踏まえれば、真のプライバシーを保つことはほぼ不可能になった。",
      "structure": "given + 名詞句3連(根拠) + 主節 SVC。S=true privacy、V=has become、C=nearly impossible to maintain。",
      "grammar": "① given + 3名詞句 = Day13 と同じ結論回収の型。relentless / pervasive / widespread と強い形容詞を3項に配って本論を再圧縮している。② has become = 現在完了 + SVC「〜になってしまった」。③ impossible to maintain = 難易形容詞 + to 不定詞のいわゆる tough 構文。privacy is impossible to maintain = it is impossible to maintain privacy の書き換えで、maintain の目的語が主語に上がっている。④ nearly = 「ほぼ」。断定しすぎを避ける保険で、第2文の fully と同じ発想。",
      "writing": "結論は given + [強い形容詞+名詞]×3, X has become nearly impossible to maintain. nearly / virtually で全否定を避けるのは No 側エッセイの必須作法。tough 構文は主張を名詞主語で言い切る便利な型。"
    },
    {
      "en": "For these reasons, I am convinced that individual privacy cannot be fully protected in today's interconnected world.",
      "ja": "これらの理由から、相互につながった現代世界で個人のプライバシーを完全には守れないと確信している。",
      "structure": "SVC+that 節。S=I、V=am convinced、that 節が確信の中身。節内は助動詞+受動(cannot be protected)。",
      "grammar": "① For these reasons, = 結びの決まり文句(既出)。② I am convinced that 〜 = 「確信している」。I believe の格上げで、be convinced が受動形の形容詞用法。③ cannot be fully protected = 第2文 thesis の再宣言。can no longer → cannot と言い換えつつ fully を保持。④ today's interconnected world = 所有格 today's + 過去分詞形容詞。第2文の the modern world の言い換え。",
      "writing": "最終文は thesis を同義語で言い換えて再宣言する。I am convinced that は I firmly believe の交換要員。the modern world と today's interconnected world のような言い換えペアを持っておくと結論が単調にならない。"
    }
  ],
  "15": [
    {
      "en": "When international conflicts arise, governments frequently turn to economic sanctions as an alternative to military action.",
      "ja": "国際紛争が生じると、政府は軍事行動の代替として経済制裁にしばしば頼る。",
      "structure": "When 時の副詞節 + 主節 SV。S=governments、V=turn to(句動詞)、対象=economic sanctions。as an alternative to 〜 が位置づけを示す。",
      "grammar": "① When 節 = 時の副詞節。一般論なので現在形 arise。conflicts = 可算複数。② turn to 〜 = 「〜に頼る」句動詞。resort to と同義。③ as an alternative to 〜 = 「〜の代替として」。alternative は可算で an、相手は前置詞 to(× alternative of)。④ economic sanctions = 「制裁」は通例複数形で使う。military action = 不可算・無冠詞。",
      "writing": "導入の型: When + [問題状況] arise(s), governments turn to X as an alternative to Y. 手段比較系のお題で「Xの位置づけ」から入れる。as an alternative to は代替案の議論すべてで使える。"
    },
    {
      "en": "However, in my opinion, sanctions are not a genuinely useful foreign-policy tool.",
      "ja": "しかし私の意見では、制裁は本当に有用な外交手段ではない。",
      "structure": "SVC の否定。S=sanctions、V=are not、C=a genuinely useful foreign-policy tool。",
      "grammar": "① However + in my opinion = 前文の一般的慣行への反転で thesis を出す。② not a genuinely useful tool = 名詞述語の否定。副詞 genuinely が useful を修飾し「本当の意味では有用でない」と否定の焦点を作る。③ foreign-policy = 名詞句 foreign policy をハイフンで複合形容詞化。名詞の前に置くための処理(a foreign-policy tool)。④ tool は可算で a。",
      "writing": "No 側 thesis の別型: X is not a genuinely useful/effective tool. be動詞+名詞句の否定は「有効性を問う」お題への直答になる。名詞前の複合形容詞にはハイフン(a long-term goal / a foreign-policy tool)。"
    },
    {
      "en": "I will justify this view by considering their impact on ordinary citizens, their limited effectiveness, and their unintended consequences.",
      "ja": "一般市民への影響、限られた効果、意図せぬ結果を考慮してこの見解を正当化したい。",
      "structure": "SVO。S=I、V=will justify、O=this view。by considering + 名詞句3連が手段。",
      "grammar": "① I will justify this view = ロードマップ文(既出の型)。justify = support の格上げ。② by considering = by + 動名詞(既出)。③ their 〜 の3項並列: impact on(影響の対象は on)/ limited effectiveness(不可算)/ unintended consequences(通例複数)。3項とも their + 名詞句で頭を揃えたパラレリズム。",
      "writing": "ロードマップ第3の型: I will justify this view by considering A, B, and C. 3項を全部 their + 名詞句で揃える手法は並列の見栄えを一気に良くする。"
    },
    {
      "en": "First, sanctions tend to harm innocent civilians rather than the leaders responsible.",
      "ja": "第一に、制裁は責任ある指導者よりむしろ罪のない市民を傷つける傾向がある。",
      "structure": "SVO。S=sanctions、V=tend to harm、O=innocent civilians。rather than 以下が対比対象。",
      "grammar": "① tend to do = 「〜する傾向がある」。断定(harm する)より正確で反例に強い。② A rather than B = 「BよりむしろA」の対比。③ innocent civilians = 無冠詞複数の総称。④ the leaders responsible = 形容詞 responsible の後置。後置すると「(その事態に)責任を負う当の」の意味が際立つ(the people present と同じ用法)。the は「その責任者たち」と特定するため。",
      "writing": "tend to X rather than Y は「狙いと結果のズレ」を突く批判の基本型。the leaders responsible / the parties involved のような形容詞後置は引き締まった1級らしい名詞句。"
    },
    {
      "en": "Restrictions on trade often lead to shortages of food and medicine, and the most vulnerable people suffer the most.",
      "ja": "貿易の制限はしばしば食料や医薬品の不足を招き、最も弱い立場の人々が最も苦しむ。",
      "structure": "重文。前半 SVO(Restrictions lead to shortages)、and の後半 SV(the most vulnerable people suffer)。",
      "grammar": "① Restrictions on 〜 = 「〜への制限」。対象は on。可算複数。② lead to + 名詞 = 因果の基本動詞。③ shortages of 〜 = 「不足」は個々の欠乏事象として可算複数。food / medicine は不可算。④ the most vulnerable people suffer the most = 最上級2連。前者は形容詞の最上級(最も弱い人々)、後者は副詞句 the most(最も苦しむ)。弱者論点の定型リズム。",
      "writing": "A lead to shortages of B は制裁・災害・政策失敗の描写に使える因果テンプレ。the most vulnerable suffer the most は弱者論点の決め文句としてそのまま流用可。"
    },
    {
      "en": "A case in point is the prolonged sanctions on certain nations, where poverty deepened while ruling elites remained unaffected.",
      "ja": "好例が一部の国への長期制裁で、支配層が影響を受けないまま貧困が深刻化した。",
      "structure": "SVC。S=A case in point、V=is、C=the prolonged sanctions。where 以下は非制限の関係副詞節で、節内は while による対比の重文構造。",
      "grammar": "① A case in point is 〜(既出)。② prolonged = 過去分詞形容詞「長期化した」。sanctions on = 制裁の対象は on。③ certain nations = 固有名詞を避けるぼかし(Day11 の several nations と同じ技)。④ , where 〜 = 関係副詞の非制限用法「そしてそこでは」。場所を先行詞に補足説明を足す。⑤ deepened / remained unaffected = 歴史的事実なので過去形。remain + 過去分詞形容詞(SVC)。while = 対比の接続詞「〜する一方で」。ruling = 現在分詞形容詞「支配している」。",
      "writing": "実例に固有名詞を出せないときは certain nations + , where 〜 で「実在の事例らしさ」を保てる。while で「弱者 vs 支配層」の明暗対比を1文に収める型は格差系の論点で強い。"
    },
    {
      "en": "Second, from a practical standpoint, sanctions rarely achieve their intended political goals.",
      "ja": "第二に、現実的に見て、制裁は意図した政治目標を達成することはまれだ。",
      "structure": "SVO。S=sanctions、V=achieve(rarely が準否定で修飾)、O=their intended political goals。",
      "grammar": "① Second, + from a practical standpoint, = マーカー2連(いずれも既出)。② rarely = 準否定の頻度副詞「めったに〜ない」。not を使わず否定でき、never より断定的すぎず守りが堅い。③ intended = 過去分詞形容詞「意図された」。their intended goals = 「本来の狙い」。",
      "writing": "効果が薄い系の主張は S rarely/seldom achieve their intended goals が主砲。禁止・規制・介入系のお題で広く使える準否定の型。"
    },
    {
      "en": "Targeted regimes frequently find alternative trading partners and endure the pressure for years.",
      "ja": "標的とされた政権はしばしば代替の貿易相手を見つけ、何年も圧力に耐える。",
      "structure": "SVO。S=Targeted regimes、V=find と endure の並列、O=それぞれ alternative trading partners / the pressure。",
      "grammar": "① Targeted = 過去分詞の前置修飾「標的にされた」。regimes = government の否定的ニュアンスの言い換え「政権・体制」。② find と endure の動詞並列(and で接続、形を揃える)。③ alternative = ここでは形容詞「代替の」(第1文の名詞用法と品詞が違う)。④ the pressure = 文脈(制裁の圧力)で特定 → the。for years = 期間の for「何年も」。",
      "writing": "反証の描き方: [相手] frequently find alternative 〜 and endure ... for years. 「対象が適応してしまうから効かない」ロジックは禁止・課税・検閲系のお題に広く転用できる。"
    },
    {
      "en": "Consequently, the policy fails to produce the desired change in behavior.",
      "ja": "結果として、その政策は望ましい行動変化をもたらさない。",
      "structure": "SVO。S=the policy、V=fails to produce、O=the desired change in behavior。",
      "grammar": "① Consequently, = 帰結マーカー(既出)。② fail to do = 「〜できない・〜しない」。not を使わない否定で、政策の機能不全を客観的に述べる。三単現 fails。③ the policy / the desired change = ともに文脈で特定される the。desired = 過去分詞形容詞「望まれた」。④ change in behavior = 変化の中身・領域は in で示す。",
      "writing": "fail to produce the desired change は政策批判の締めの定型。rarely / fail to / hardly と否定語彙をローテーションして not だらけの単調さを避ける手筋ごと覚える。"
    },
    {
      "en": "Finally, sanctions can produce serious unintended consequences.",
      "ja": "最後に、制裁は深刻な意図せぬ結果を生みうる。",
      "structure": "SVO。S=sanctions、V=can produce、O=serious unintended consequences。",
      "grammar": "① Finally, = 本論3マーカー(既出)。② can = 可能性「〜しうる」。③ unintended consequences = 「意図せぬ結果」。社会科学の頻出概念で通例複数形。serious を重ねて深刻度を上げる。unintended = 否定接頭辞 un- + 過去分詞。",
      "writing": "第3の理由に「副作用」を据えるトピックセンテンス: X can produce serious unintended consequences. 政策・技術系のお題でほぼ常に使える万能理由。"
    },
    {
      "en": "They may push isolated nations toward rival powers, thereby strengthening hostile alliances.",
      "ja": "制裁は孤立した国を対立勢力の側へ押しやり、それによって敵対同盟を強化しかねない。",
      "structure": "SVO+方向句。S=They(=sanctions)、V=may push、O=isolated nations、toward 〜 が方向。thereby strengthening 〜 は文末分詞構文。",
      "grammar": "① They = 前文の sanctions を受ける代名詞。may = 推量(既出)。② push A toward B = 「AをBの方へ押しやる」。方向の toward。isolated = 過去分詞形容詞「孤立した」。③ , thereby -ing = 分詞構文に thereby を添えて「それによって〜する」と因果を明示する1級頻出の型。④ rival powers = powers は「大国・列強」の意味で可算。hostile alliances = 可算複数「敵対的な同盟」。",
      "writing": ", thereby -ing は文末分詞構文の最強版で「その結果」を1語で明示できる。push A toward B, thereby strengthening C の連鎖因果は地政学・社会系の論述で威力大。"
    },
    {
      "en": "Admittedly, sanctions are less destructive than war.",
      "ja": "確かに制裁は戦争ほど破壊的ではない。",
      "structure": "SVC+比較。S=sanctions、V=are、C=less destructive、than war が比較対象。",
      "grammar": "① Admittedly, = 譲歩マーカー(既出)。短文で認める2文構成型。② less + 形容詞 + than = 劣勢比較「〜ほど…ではない」。more の逆方向で、not as 〜 as より書き言葉的。③ war = 戦争一般は無冠詞・不可算(a war なら個別の戦争)。",
      "writing": "譲歩は相手の最強の論拠(戦争よりマシ)を先に自分で言うのが作法。less 〜 than の劣勢比較は「マシ論」を認める場面の専用装備。"
    },
    {
      "en": "However, ineffective measures that punish the innocent can hardly be called useful.",
      "ja": "しかし罪のない者を罰する効果のない手段を有用とはとても呼べない。",
      "structure": "受動態。S=ineffective measures(that punish the innocent が修飾)、V=can hardly be called、C=useful(call O C の受動)。",
      "grammar": "① However, = 反転(既出)。② measures = 「対策・措置」の意味では複数形が普通。that punish = 関係代名詞。③ the innocent = the + 形容詞で「〜な人々」(= innocent people)。the poor / the vulnerable と同じ総称用法。④ can hardly be called useful = hardly = 準否定「とても〜ない」+ call O C の受動(be called useful)。「有用と呼ばれることはほとんどありえない」。強い断定を避けつつ相手の土俵(useful か否か)で切り返す。",
      "writing": "譲歩の返し: X that [欠点] can hardly be called useful/effective. 準否定+受動の組み合わせは断定を避けながら価値判断を下せる。the + 形容詞(the innocent / the vulnerable)は語数を締める総称テク。"
    },
    {
      "en": "In conclusion, because they harm civilians, seldom succeed, and create dangerous side effects, economic sanctions are a deeply flawed tool.",
      "ja": "結論として、市民を傷つけ、成功することがまれで、危険な副作用を生むため、経済制裁は重大な欠陥を抱えた手段だ。",
      "structure": "because 理由節(動詞句3連の並列) + 主節 SVC。S=economic sanctions、V=are、C=a deeply flawed tool。",
      "grammar": "① In conclusion, because they A, B, and C = 結論の理由回収を because 節内の動詞句3連(harm / seldom succeed / create)で行う型。Day13・14 の given + 名詞句型の別バージョン。② seldom = rarely の言い換え(第7文で rarely を使ったので変える)。③ side effects = 医学用語の比喩「副作用」。複数形。④ a deeply flawed tool = deeply + 過去分詞形容詞 flawed「重大な欠陥のある」。強調副詞は very でなく deeply / seriously を選ぶと1級らしい。",
      "writing": "結論回収のもう一つの型: In conclusion, because they A, B, and C, X is a deeply flawed 〜。動詞句3連は名詞句3連(given 型)より動きが出る。deeply flawed は結論の評価語として強力。"
    },
    {
      "en": "For these reasons, I do not regard them as a truly effective instrument of foreign policy.",
      "ja": "これらの理由から、経済制裁を真に効果的な外交手段とはみなさない。",
      "structure": "SVO+as 補語。S=I、V=do not regard、O=them、as a truly effective instrument が補語相当。",
      "grammar": "① For these reasons, = 結びの決まり文句(既出)。② regard A as B = 「AをBとみなす」。as とセットの語法(× regard A B)。consider A (to be) B との違いは as の必須性。③ do not regard = 一般動詞の否定。④ a truly effective instrument = instrument = tool の格上げ言い換え(第2文の tool を結論で昇格)。truly が effective の焦点を作る(第2文の genuinely と同じ働き)。",
      "writing": "最終文の別型: I do not regard X as a truly effective 〜。thesis の be 動詞文を regard A as B に変換して再宣言する言い換え術。tool → instrument のような結論での名詞アップグレードも真似たい。"
    }
  ],
  "16": [
    {
      "en": "Some argue that the steady rise in the world's population endangers the future of our species.",
      "ja": "世界人口の着実な増加が人類という種の未来を危険にさらすと主張する人もいる。",
      "structure": "SVO。S=Some (people)、V=argue、O=that節。that節内は S(the steady rise in ...) + V(endangers) + O(the future of our species)。",
      "grammar": "① Some argue that 〜 = 「〜と主張する人もいる」。some は代名詞で people を省略した総称。序論で世論・一般論を紹介する定番の出だし。② the steady rise in 〜 = 「〜の着実な増加」。rise(増加)は個別の上昇現象なので可算、steady で特定の趨勢を指すため the。増加「における」は in を取る(rise in prices が定番、× rise of)。③ the world's population = 所有格で「世界の人口」。population は集合を表す単数扱い。④ endangers は三単現。主語は the steady rise(単数)。that節の中でも主述の一致を忘れない。⑤ our species = 「我々の種=人類」。species は単複同形で、ここでは単数「人類という一つの種」。humanity / humankind の言い換え。",
      "writing": "序論1文目の型 Some argue that + [お題の言い換え]。お題 overpopulation を the steady rise in the world's population と動詞ごと言い換えるのが1級の作法。humanity's future → the future of our species の言い換えも同時に見せている。反対・賛成どちらの立場でも使える中立の開幕。"
    },
    {
      "en": "I strongly agree that global overpopulation is a serious threat to humankind.",
      "ja": "私は、世界の人口過剰が人類への深刻な脅威であることに強く賛成する。",
      "structure": "SVO。S=I、V=agree、O=that節。that節内は SVC(overpopulation is a threat)。strongly は agree を修飾する副詞。",
      "grammar": "① I strongly agree that 〜 = テーゼ(自分の立場)を宣言する第2文。strongly が立場の強さを示す。I firmly believe that と交換可能。② global overpopulation = 抽象概念で不可算・無冠詞。「人口過剰」という現象全般を指す。③ a serious threat to 〜 = threat(脅威)は可算で、初出・不特定なので a。「〜への脅威」は前置詞 to とセット(× threat for)。④ humankind = 人類全体を表す不可算・無冠詞。humanity / our species と互換のローテ要員。",
      "writing": "序論2文目=テーゼの型 I strongly agree that + [立場]。agree/disagree 型のお題ではこの一文で採点者に立場を明示する。X is a serious threat to Y はリスク系お題(環境・健康・安全保障)でそのまま流用できる骨格。"
    },
    {
      "en": "I will defend this position by focusing on resource depletion, environmental destruction, and food insecurity.",
      "ja": "資源の枯渇、環境破壊、食料不安に焦点を当ててこの立場を擁護したい。",
      "structure": "SVO。S=I、V=will defend、O=this position。by focusing on 〜 が手段を表す前置詞句で、on の目的語が3つの名詞句の並列。",
      "grammar": "① I will defend this position by -ing = 序論末のロードマップ文。will は「これから本論で〜する」という宣言の意志未来。② by + 動名詞 = 「〜することによって」。前置詞の後は必ず動名詞(× by to focus)。③ focusing on の on は focus on のセット前置詞。④ A, B, and C の3項並列。resource depletion / environmental destruction / food insecurity はすべて抽象名詞で無冠詞・不可算。本論3段落の見出しをここで予告している。⑤ this position = 前文の自分の立場を指示形容詞 this で受ける。結束(cohesion)の基本技。",
      "writing": "序論3文目=本論予告の型 I will defend this position by focusing on A, B, and C。3つの名詞句は本論のトピックと一語一句対応させる。for three main reasons より一段具体的に見せられる上位版。support this view by examining でも同じ。"
    },
    {
      "en": "First, a growing population places enormous strain on limited natural resources.",
      "ja": "第一に、増え続ける人口は限られた天然資源に多大な負荷をかける。",
      "structure": "SVO+前置詞句。S=a growing population、V=places、O=enormous strain、on 以下が負荷のかかる対象。",
      "grammar": "① First, = 本論1の開幕を示す接続副詞。カンマ必須。② a growing population = growing は現在分詞の前置修飾「増え続ける」。population は「一つの人口(集団)」として可算・単数で a。③ place strain on 〜 = 「〜に負担をかける」の定番コロケーション。strain(負荷)は不可算なので無冠詞、enormous で程度を盛る。put pressure on と同型。④ places は三単現(主語 a growing population が単数)。⑤ limited natural resources = 無冠詞複数の総称「限りある天然資源(全般)」。resource は可算で、資源の種類が複数あるので複数形。",
      "writing": "本論1の1文目=トピックセンテンス。places enormous strain on 〜 は「負担・圧迫」系の論点(医療費・環境・インフラ)で万能の格上げ表現。First, S + V の一文で段落の主張を言い切り、次文から根拠に入る型。"
    },
    {
      "en": "Water, fossil fuels, and arable land are being consumed faster than they can be replenished.",
      "ja": "水、化石燃料、耕作可能な土地は補充できる速度より速く消費されている。",
      "structure": "受動態の進行形。S=Water, fossil fuels, and arable land(3項並列)、V=are being consumed。faster than 以下が比較の従属節(they can be replenished も受動)。",
      "grammar": "① are being consumed = 現在進行形+受動態「今まさに消費されつつある」。単なる現在形 are consumed(一般的事実)でなく進行形にすることで「現在進行中の危機」という切迫感を出す。② 主語の3項並列: water(不可算・無冠詞)、fossil fuels(可算・複数=石油や石炭など複数種)、arable land(land は不可算・無冠詞)。可算・不可算が混在しても並列でき、全体は複数扱い→ are。③ faster than they can be replenished = 比較級 faster + than節。than の後は完全な節で、they = 前出の3資源。can be replenished は助動詞+受動「補充されうる」。消費する主体・補充する主体をぼかすために両方受動。④ この「消費 > 再生」の対比構造が持続不可能性の論証そのもの。",
      "writing": "X is being consumed faster than it can be replenished は持続可能性系お題の決め文。be being + 過去分詞で「進行中の悪化」を演出できる。faster than S can be + 過去分詞 の比較枠は「対策が追いつかない」論法(Day18 の pathogens evolve faster than 〜 と同型)として流用可。"
    },
    {
      "en": "Consequently, future generations may inherit a planet stripped of the resources essential for survival.",
      "ja": "結果として、未来の世代は生存に不可欠な資源を奪われた地球を受け継ぐかもしれない。",
      "structure": "SVO。S=future generations、V=may inherit、O=a planet。stripped of 〜 は planet を後置修飾する過去分詞句、essential for survival は resources を後置修飾する形容詞句。",
      "grammar": "① Consequently, = 「その結果」。前文の根拠から帰結を導く接続副詞。therefore / as a result のローテ要員。② future generations = 無冠詞複数の総称「未来の世代(全般)」。③ may inherit = 未来予測の婉曲。will と断定せず may で「〜しかねない」と述べるのが論述の節度。④ a planet stripped of 〜 = 過去分詞の後置修飾。a planet (that has been) stripped of ... の関係詞+be 省略。strip A of B(AからBを剥ぎ取る)の受動で of が残る。deprive A of B と同じ「奪う系 of」。⑤ the resources essential for survival = 形容詞句 essential for 〜 の後置修飾で「どの資源か」が限定されるため the。survival は不可算・無冠詞。",
      "writing": "本論の3文目=帰結文の型 Consequently, S may + V。future generations may inherit 〜 は環境・財政赤字・年金などツケ回し系の論点で強力。名詞 + stripped of / deprived of 〜 の後置修飾は一文を重厚にする1級らしい圧縮技。"
    },
    {
      "en": "Second, overpopulation accelerates environmental destruction.",
      "ja": "第二に、人口過剰は環境破壊を加速させる。",
      "structure": "SVO。S=overpopulation、V=accelerates、O=environmental destruction。最短のトピックセンテンス。",
      "grammar": "① Second, = 本論2の開幕(First, と同型なので以下略)。② accelerates = 三単現。「加速させる」は worsen / speed up の格上げで、既に進行中の悪化を速めるニュアンス。③ overpopulation も environmental destruction も抽象概念で不可算・無冠詞。短文でも冠詞処理が正確なことを見せられる。④ トピックセンテンスをあえて5語に切り詰め、次文以降で展開する緩急。全部の文を長くする必要はない。",
      "writing": "S + accelerates + [悪化名詞] は「悪化を速める」論点の最小骨格。トピックセンテンスは短くてよい——むしろ短い方が段落の主張が明確になる。長文が続いた後に短文を置くリズム作りも1級エッセイの技術。"
    },
    {
      "en": "More people inevitably means more pollution, deforestation, and greenhouse gas emissions.",
      "ja": "人が増えれば必然的に汚染、森林破壊、温室効果ガス排出も増える。",
      "structure": "SVO。S=More people、V=means、O=3項並列の名詞句。inevitably は means を修飾する副詞。",
      "grammar": "① More people ... means more 〜 = 「AがふえればBもふえる」を means 一語で結ぶ因果の圧縮構文。more X means more Y は比例関係の定番。② means が三単現なのに注意。主語 more people は複数だが、ここでは「人が増えるということ」という一つの事態(観念)を指すため単数扱いで受けるのが慣用。③ inevitably = 「必然的に」。因果の強さを示す文中副詞で、主語と動詞の間に置く。④ 目的語の3項並列: pollution(不可算)、deforestation(不可算)、greenhouse gas emissions(emission は排出「量・行為」で複数形が定番)。それぞれ無冠詞。⑤ greenhouse gas は emissions を修飾する複合名詞(名詞の形容詞的用法)なので gas は単数形。",
      "writing": "More X inevitably means more Y は原因→帰結を一文で言い切る万能テンプレ。列挙する3つの悪影響は不可算名詞で揃えると冠詞ミスが出ない。数量の連動(人口→排出、車→渋滞、観光客→ゴミ)を語る全お題で使い回せる。"
    },
    {
      "en": "A case in point is the rapid urban expansion in developing regions, where natural habitats are destroyed to accommodate growing communities.",
      "ja": "好例が開発途上地域の急速な都市拡大で、増える共同体を収容するために自然の生息地が破壊されている。",
      "structure": "SVC(倒置気味の提示文)。S=A case in point、V=is、C=the rapid urban expansion ...。where 以下は developing regions を先行詞とする関係副詞の非制限用法。",
      "grammar": "① A case in point is 〜 = 「好例が〜だ」。For example より格上の具体例導入。case は可算で慣用的に a。② the rapid urban expansion = 「途上地域における」と in句で特定される現象なので the。expansion は -sion の抽象名詞。③ developing regions = 現在分詞 developing の前置修飾+無冠詞複数の総称。developed regions(先進地域)との対で覚える。④ , where 〜 = 関係副詞の非制限用法。「その地域では〜」と補足説明を後ろに流す。in which と交換可能。⑤ are destroyed = 受動態。破壊する主体(開発業者等)を特定せず現象として述べる。⑥ to accommodate = 目的の to不定詞「〜を収容するために」。⑦ growing communities = 現在分詞修飾+無冠詞複数。",
      "writing": "本論の具体例文の型 A case in point is + [名詞句], where + [そこで起きていること]。関係副詞 , where で例の中身まで一文で描き切ると具体性の得点が伸びる。固有名詞を出せなくても developing regions 程度の一般化された「例」で1級は十分通る。"
    },
    {
      "en": "Finally, from a long-term perspective, feeding billions of additional people poses a daunting challenge.",
      "ja": "最後に、長期的に見れば、さらに数十億人を養うことは困難な課題を突きつける。",
      "structure": "SVO。S=feeding billions of additional people(動名詞句)、V=poses、O=a daunting challenge。文頭に接続副詞 Finally と視点の前置詞句。",
      "grammar": "① Finally, = 本論3の開幕。First / Second / Finally の三点セット。② from a long-term perspective = 「長期的視点から見れば」。perspective は可算で a。理由を一段深く見せる視座の提示。③ feeding billions of additional people = 動名詞句が主語。動名詞主語は単数扱いなので poses に -s(Day1 の Locating ... becomes と同じ規則)。④ billions of 〜 = 「数十億の〜」。billion は of を伴う場合複数形 billions になる(× three billions people だが billions of people は正しい)。⑤ pose a challenge = 「課題を突きつける」の定番コロケーション。challenge は可算で a。daunting(ひるませるような)が difficult の格上げ。",
      "writing": "Finally, from a long-term perspective, + [動名詞主語] poses a daunting challenge が本論3のトピックセンテンス型。動名詞句を主語に立てると「〜すること自体が問題」と論点を名詞化できる。pose a challenge / problem / threat は poses の三単現も含めセットで暗記。"
    },
    {
      "en": "Although agricultural technology has advanced, food production cannot expand indefinitely.",
      "ja": "農業技術は進歩したが、食料生産を無限に拡大することはできない。",
      "structure": "従属節+主節。Although節(S=agricultural technology、V=has advanced)+主節(S=food production、V=cannot expand)。",
      "grammar": "① Although + 譲歩節 = 反対材料を先に認める型。While と同機能。② has advanced = 現在完了「(これまでに)進歩してきた」。過去から現在までの蓄積を表すので過去形 advanced ではなく完了形。advance はここでは自動詞。③ agricultural technology / food production はともに不可算・無冠詞の抽象名詞。④ cannot expand indefinitely = 「無限には拡大できない」。not + indefinitely で部分否定的に上限の存在を示す。expand もここでは自動詞。⑤ 譲歩(技術は進歩した)→主張(それでも限界がある)の対比が一文で完結しており、反論への予防線になっている。",
      "writing": "Although X has advanced, Y cannot + V + indefinitely は「技術進歩を認めつつ限界を突く」型。テクノロジー楽観論への反駁はこの一文構造で処理できる。cannot ... indefinitely(無限には〜できない)は資源・成長・借金など上限系の論点で流用可。"
    },
    {
      "en": "Admittedly, some countries face declining birthrates.",
      "ja": "確かに出生率が低下している国もある。",
      "structure": "SVO。S=some countries、V=face、O=declining birthrates。Admittedly が文修飾副詞。",
      "grammar": "① Admittedly, = 「確かに〜(だが)」。譲歩を開く文副詞で、次文の However とセットで機能する。It is true that 〜 の一語版。② some countries = 「一部の国」。総称の無冠詞複数に some を付けて部分集合を示す。③ face = 「(問題に)直面する」。他動詞で前置詞不要(× face to / face with)。confront との言い換え要員。④ declining birthrates = 現在分詞 declining の前置修飾「低下しつつある出生率」。birthrate は国ごとに一つずつあるので複数形。",
      "writing": "本論3後半の譲歩の型 Admittedly, + [反対側の事実]。わずか5語で反例(少子化の国もある)を認めるのがポイント——譲歩は短く、反論に紙面を割く。Admittedly, some countries/people + V は反例の存在を認める最小テンプレ。"
    },
    {
      "en": "However, on a global scale, the overall trend remains alarmingly upward.",
      "ja": "しかし世界規模で見れば、全体の傾向は憂慮すべきほど上昇したままだ。",
      "structure": "SVC。S=the overall trend、V=remains、C=upward(形容詞)。However と on a global scale が文頭の副詞要素。",
      "grammar": "① However, = 前文の譲歩を切り返す接続副詞。Admittedly 〜. However 〜. の対が完成する。② on a global scale = 「世界規模では」。scale は可算で a。反例を「より大きな視点」で無効化する魔法の前置詞句。③ the overall trend = 「全体の傾向」。文脈(人口動態)で特定されるので the。④ remains + 形容詞 = SVC「〜のままである」。remain は be動詞系の不完全自動詞で補語を取る。stay と同型。⑤ alarmingly = 「憂慮すべきほど」。形容詞 upward を修飾する副詞で、客観データに危機感の色を付ける1級らしい修飾。",
      "writing": "However, on a global scale, 〜 は「反例はあるが大局は変わらない」と押し返す決め技。ミクロの反例→マクロの傾向という構図はあらゆる統計系お題で再利用可。remain + 形容詞(remains strong / remains unclear)も状態継続の定番として抜き出せる。"
    },
    {
      "en": "In conclusion, because it drains resources, devastates the environment, and threatens food supplies, overpopulation represents a genuine danger.",
      "ja": "結論として、資源を枯渇させ、環境を荒廃させ、食料供給を脅かすため、人口過剰は真の危険を表している。",
      "structure": "従属節+主節。In conclusion のあと because節(動詞3連の並列: drains / devastates / threatens、主語は it=overpopulation)、主節は SVO(overpopulation represents a genuine danger)。",
      "grammar": "① In conclusion, = 結論段落の開幕を告げる決まり文句(無冠詞)。② because it drains A, devastates B, and threatens C = 本論3つの論点を動詞句3連で圧縮再掲する結論の技。it は主節の overpopulation を先取りする代名詞(後方照応)。3動詞とも三単現で揃える。③ drains resources = 「資源を吸い上げ枯らす」。deplete の言い換え。devastates(荒廃させる)は destroy の格上げ。④ the environment = 「(地球の)環境」は常に the が付く定番(× an environment)。⑤ food supplies = 供給「量・体制」の意味で複数形が慣用。⑥ represents a genuine danger = is より格上の「〜に相当する」。danger は可算で a。",
      "writing": "結論1文目の型 In conclusion, because it + [動詞句A], [動詞句B], and [動詞句C], + [主語] + [評価]。本論3段落を動詞3連に圧縮するこの再掲法は結論の字数を稼ぎつつ一貫性を採点者に見せる最強の型。represent a genuine danger は is dangerous の格上げとして暗記。"
    },
    {
      "en": "For these reasons, I am firmly convinced that global overpopulation is a serious threat to the future of humankind.",
      "ja": "これらの理由から、世界の人口過剰が人類の未来への深刻な脅威であると固く確信している。",
      "structure": "SVC+that節。S=I、V=am convinced(受動由来の形容詞)、that節が確信の内容。that節内は SVC。",
      "grammar": "① For these reasons, = 「これらの理由から」。these が本論3つの理由を指す。結論の最終文を導く定番。② I am firmly convinced that 〜 = 「固く確信している」。convince A that(Aに確信させる)の受動 be convinced が形容詞化した形。I believe の最上級の言い換えで、firmly が確信の強度を上げる。③ that節は序論のテーゼ(第2文)とほぼ同文の反復。a serious threat to humankind → a serious threat to the future of humankind と微修正して締める。結論での立場再掲は減点でなく必須要素。④ the future of humankind = of句で特定されるので the future に the、humankind は無冠詞不可算。",
      "writing": "最終文の型 For these reasons, I am firmly convinced that + [テーゼの再掲]。序論の主張文をコピーに近い形で置くのが正解——新情報を最終文に入れてはいけない。I am firmly convinced that は I strongly agree that の結論用格上げバージョンとしてセット運用する。"
    }
  ],
  "17": [
    {
      "en": "There is ongoing debate over how much effort Japan should devote to its neighbors.",
      "ja": "日本が近隣諸国にどれほど力を注ぐべきかについては議論が続いている。",
      "structure": "There is 構文。S=ongoing debate、over 以下が議論の対象を示す前置詞句。over の目的語は how much effort ... の間接疑問(名詞節)。",
      "grammar": "① There is ongoing debate over 〜 = Day1 の There is much debate over の変形。debate(議論全般)は不可算なので単数 is で受け、ongoing(進行中の)が much の代わりに議論の現在性を出す。② over + 間接疑問 = 前置詞の目的語に how節を置ける。how much effort は「どれほどの努力」で effort は不可算だから much(× how many efforts)。③ 間接疑問の語順は平叙文: how much effort Japan should devote(× should Japan devote)。④ devote A to B = 「AをBに捧げる」。to は前置詞で、間接疑問により A(how much effort)が前に出て devote to its neighbors が残る形。⑤ its neighbors = its は Japan を受ける所有格。国は it で受ける。neighbor は可算で複数。",
      "writing": "序論1文目の型 There is ongoing debate over + [間接疑問]。お題が how much / whether 型のときは疑問詞節をそのまま over の後に埋め込める。much debate ↔ ongoing debate は同じ構文の語彙ローテとして両方持っておく。"
    },
    {
      "en": "In my opinion, improving relations with other Asian nations should clearly be a priority for the Japanese government.",
      "ja": "私の意見では、他のアジア諸国との関係改善は日本政府にとって明確に優先事項であるべきだ。",
      "structure": "SVC。S=improving relations with other Asian nations(動名詞句)、V=should be、C=a priority。clearly は should と be の間に置かれた副詞。",
      "grammar": "① In my opinion, = テーゼを導く定番の前置き。I think の代替で文頭に置く。② improving relations with 〜 = 動名詞句が主語。「関係を改善すること」と行為を名詞化。relations(国家間の関係)は複数形が慣用(diplomatic relations / international relations)。③ other Asian nations = 「他の」アジア諸国。日本自身もアジアなので other が論理的に必須。無冠詞複数の総称。④ should clearly be = 助動詞と本動詞の間に副詞を挟む標準語順。clearly が主張の確信度を上げる。⑤ a priority = 「優先事項の一つ」で可算・a。the priority なら「唯一の最優先事項」と強すぎる。⑥ the Japanese government = 特定国の政府は the が付く。",
      "writing": "テーゼの型 In my opinion, [動名詞句] should clearly be a priority for 〜。優先順位を問うお題(priority / put first 型)はこの一文がそのまま答えになる。動名詞主語 improving / strengthening / promoting 〜 は政策系お題の主語として万能。"
    },
    {
      "en": "I will support this view by examining economic benefits, regional stability, and shared challenges.",
      "ja": "経済的利益、地域の安定、共通の課題を検討してこの見解を支持したい。",
      "structure": "SVO。S=I、V=will support、O=this view。by examining 〜 が手段の前置詞句で、目的語は3項並列。",
      "grammar": "① I will support this view by examining A, B, and C = 序論末のロードマップ文(Day16 の defend this position by focusing on と同型)。support / defend、view / position、examining / focusing on は交換可能な部品。② by + 動名詞は手段。③ 3項並列はそれぞれ economic benefits(可算・複数)、regional stability(不可算・無冠詞)、shared challenges(可算・複数)。shared は過去分詞の形容詞化「共有された=共通の」。④ this view = 前文の自分の意見を指示形容詞で受ける結束表現。",
      "writing": "ロードマップ文は support this view by examining と defend this position by focusing on の2本を持っておき、エッセイごとに使い分けると型のコピー感が消える。3項の名詞句=本論3段落の見出し、という対応は毎回死守する。"
    },
    {
      "en": "First, stronger ties bring substantial economic benefits.",
      "ja": "第一に、より強い結びつきは多大な経済的利益をもたらす。",
      "structure": "SVO。S=stronger ties、V=bring、O=substantial economic benefits。5語+αの最短トピックセンテンス。",
      "grammar": "① First, = 本論1の開幕。② stronger ties = 比較級 stronger「(現状より)強い結びつき」。比較対象(than now)は自明なので省略。ties(結びつき)は国家関係では複数形が慣用(close ties / economic ties)。③ bring = 主語が複数(ties)なので原形。bring benefits(利益をもたらす)は produce / yield とローテできる基本コロケーション。④ substantial = large の格上げ「相当な・多大な」。considerable と交換可。benefits は可算・複数・無冠詞(総称)。",
      "writing": "比較級主語 Stronger/Closer/Better + [名詞] bring(s) + [利益] は「改善すれば得をする」型のトピックセンテンスに万能。substantial benefits は great benefits の1級格上げ。短く言い切って次文で展開するリズムは Day16 本論2と同じ。"
    },
    {
      "en": "Asia is home to some of the world's fastest-growing markets, and Japan depends heavily on regional trade and investment.",
      "ja": "アジアには世界で最も急成長する市場のいくつかがあり、日本は地域の貿易と投資に大きく依存している。",
      "structure": "重文(and で2つの独立節を接続)。節1=SVC(Asia is home to 〜)、節2=SV+前置詞句(Japan depends on 〜)。",
      "grammar": "① be home to 〜 = 「〜の本拠地である・〜を擁する」。この慣用表現では home は無冠詞(× is a home to)。There are many markets in Asia の格上げ言い換え。② some of the world's fastest-growing markets = some of + the + 最上級。「世界最速級の市場のいくつか」。最上級 fastest-growing には the が必須で、world's の所有格がそれを兼ねる。fastest-growing はハイフン付き複合形容詞(副詞 fast の最上級+現在分詞)。③ , and = 独立節2つをカンマ+and で結ぶ重文。関連する2つの根拠を一文に束ねる。④ depends heavily on = 「〜に大きく依存する」。depend on の on 必須、heavily が程度を盛る定番副詞(rely heavily on も同じ)。⑤ regional trade and investment = ともに不可算・無冠詞。",
      "writing": "X is home to some of the world's + 最上級 + 複数名詞 は規模・重要性を盛る看板表現(Day17 keyExpressions にも採用)。depend/rely heavily on 〜 は依存関係を述べる万能句。根拠2つを , and で束ねて一文にする密度も1級の字数配分術。"
    },
    {
      "en": "Consequently, closer cooperation would strengthen Japan's economy and create new opportunities for its businesses.",
      "ja": "結果として、より緊密な協力は日本経済を強化し、企業に新たな機会を生む。",
      "structure": "SVO(動詞2連の並列)。S=closer cooperation、V1=would strengthen(O=Japan's economy)、V2=(would) create(O=new opportunities)。",
      "grammar": "① Consequently, = 帰結の接続副詞(Day16 で既出)。② closer cooperation = 比較級+不可算名詞。cooperation は不可算・無冠詞。③ would strengthen = 仮定法由来の would「(もし協力が緊密になれば)〜するだろう」。まだ実現していない政策の効果なので will でなく would で控えめに予測するのが論述の作法。④ strengthen and create の並列。2つ目の動詞の前の would は省略(共有)。⑤ Japan's economy = 所有格で特定。⑥ new opportunities for 〜 = opportunity は可算・複数。「〜にとっての機会」は for。⑦ its businesses = its は Japan を受ける。business は「企業」の意味では可算で複数形。",
      "writing": "帰結文の型 Consequently, [比較級+名詞] would + V1 and V2。政策提案系のお題では would を使う——「やればこうなるはず」の未実現の話だから。strengthen the economy and create opportunities は経済メリットを語る2連コンボとして丸ごと流用可。"
    },
    {
      "en": "Second, improved relations play a pivotal role in ensuring regional stability.",
      "ja": "第二に、関係改善は地域の安定を確保するうえで極めて重要な役割を果たす。",
      "structure": "SVO+前置詞句。S=improved relations、V=play、O=a pivotal role、in ensuring 〜 が役割の中身を示す。",
      "grammar": "① Second, = 本論2の開幕(既出)。② improved relations = 過去分詞 improved の前置修飾「改善された関係」。improving relations(改善すること)と違い「改善後の状態」を指す。③ play a pivotal role in -ing = play a crucial role の pivotal(枢軸の)版。役割系コロケーションの最上位ローテ。role は可算で a、in の後は動名詞。④ ensuring = 「確実にする」。ensure / secure / guarantee のローテ要員。⑤ regional stability = 不可算・無冠詞の抽象名詞。",
      "writing": "play a pivotal/crucial/vital role in -ing は重要性を主張するトピックセンテンスの三種の神器——同一エッセイ内で形容詞を変えて使い回せる。in 以下の動名詞に段落の論点(ensuring stability)を圧縮して入れるのがコツ。"
    },
    {
      "en": "Historical tensions persist in East Asia, and unresolved disputes could easily escalate.",
      "ja": "東アジアには歴史的緊張が残り、未解決の対立は容易に激化しかねない。",
      "structure": "重文。節1=SV(Historical tensions persist)、節2=SV(unresolved disputes could escalate)。ともに自動詞の第1文型。",
      "grammar": "① tensions = 「緊張(関係)」は具体的な対立案件を指すとき複数形が慣用(rising tensions / political tensions)。無冠詞複数の総称。② persist = 「根強く残る」。remain / continue の格上げ自動詞。③ East Asia = 地域名は無冠詞(the Middle East のような例外もある)。④ unresolved disputes = 過去分詞に否定接頭辞 un- が付いた形容詞「未解決の」。dispute は可算・複数。⑤ could easily escalate = could は「〜しかねない」の可能性。easily(容易に)がリスクの低い閾値を示す。escalate は自動詞「激化する」。⑥ 重文で「現状(緊張が残る)+リスク(激化しうる)」を一文に束ねる構成は前段落の第2文と同じ。",
      "writing": "X persist(s), and Y could easily escalate は「くすぶる問題+悪化リスク」を述べるリスク提示の型。could easily + V は「十分ありうる」と warning を出す論述の常套句で、安全保障・環境・健康どの分野でも使える。"
    },
    {
      "en": "For instance, sustained dialogue with neighboring countries reduces the risk of conflict and fosters lasting peace.",
      "ja": "たとえば近隣諸国との継続的な対話は紛争の危険を減らし、永続的な平和を育む。",
      "structure": "SVO(動詞2連の並列)。S=sustained dialogue with neighboring countries、V1=reduces(O=the risk of conflict)、V2=fosters(O=lasting peace)。",
      "grammar": "① For instance, = For example の言い換え。具体例導入(A case in point とローテ)。② sustained dialogue = 過去分詞 sustained(持続された=継続的な)の前置修飾。dialogue は不可算・無冠詞。③ neighboring countries = 現在分詞 neighboring の形容詞用法「近隣の」。④ reduces / fosters = 主語 dialogue(単数扱い)に合わせた三単現の2連。⑤ the risk of conflict = of句で「何のリスクか」特定されるので the。conflict は「紛争(一般)」で無冠詞・不可算。⑥ lasting peace = 現在分詞由来の形容詞 lasting「長続きする」。peace は不可算・無冠詞。⑦ reduce the risk of 〜 は「リスクを減らす」の最重要コロケーション。",
      "writing": "For instance, [対策] reduces the risk of 〜 and fosters 〜 は解決策の効果を述べる型。reduce the risk of + 無冠詞名詞 は予防・安全系の論点で毎回使う。foster lasting peace / trust / cooperation のように foster は良いものを「育む」専用動詞として覚える。"
    },
    {
      "en": "Finally, from a long-term perspective, Asian nations face common challenges that no country can solve alone.",
      "ja": "最後に、長期的に見れば、アジア諸国はどの国も単独では解決できない共通の課題に直面している。",
      "structure": "SVO。S=Asian nations、V=face、O=common challenges。that 以下は challenges を先行詞とする関係代名詞節(目的格)。",
      "grammar": "① Finally, from a long-term perspective, = 本論3の開幕+視座の提示(Day16 と同じコンボなので詳細略)。② face = 他動詞「直面する」(前置詞不要、Day16 で既出)。③ common challenges = 「共通の課題」。無冠詞複数。④ that no country can solve alone = 目的格の関係代名詞 that。no country が節内の主語で「どの国も〜ない」と主語ごと否定する強い否定形(= not any country)。⑤ alone = 「単独で」の副詞。by itself と交換可。⑥ challenges (that) ... の目的格 that は省略可能だが、書き言葉では残す方が引き締まる。",
      "writing": "challenges that no country can solve alone は国際協力系お題の決めフレーズ——気候変動・パンデミック・テロどれでも使える。no + 単数名詞 + can + V alone の「単独不可能」構文は協調の必要性を論証する一撃。"
    },
    {
      "en": "Issues such as climate change and pandemics demand coordinated regional action.",
      "ja": "気候変動や感染症のような問題は協調した地域行動を要する。",
      "structure": "SVO。S=Issues such as climate change and pandemics、V=demand、O=coordinated regional action。",
      "grammar": "① Issues such as A and B = 「AやBのような問題」。such as は具体例の列挙で、for example より文中に埋め込みやすい。issues は無冠詞複数の総称。② climate change = 不可算・無冠詞の固定表現。pandemics = 可算・複数(個々の大流行が数えられる)。③ demand = 「(状況が)〜を要求する」。require の格上げで、無生物主語との相性がよい。主語 issues が複数なので原形。④ coordinated regional action = 過去分詞 coordinated(調整された=協調した)+形容詞 regional の二重修飾。action(行動全般)は不可算・無冠詞。take action の action と同じ。",
      "writing": "Issues such as X and Y demand + [対応] は「課題列挙→必要な対応」を一文で処理する型。demand / require / call for は「〜を必要とする」のローテ3点セット。coordinated action(協調行動)は国際系お題の頻出目的語。"
    },
    {
      "en": "Admittedly, deep historical grievances complicate cooperation.",
      "ja": "確かに根深い歴史的恨みは協力を難しくする。",
      "structure": "SVO。S=deep historical grievances、V=complicate、O=cooperation。Admittedly が文修飾副詞。",
      "grammar": "① Admittedly, = 譲歩の文副詞(Day16 で既出。次文 However とセット)。② grievances = 「(積年の)不満・恨み」。個別の恨み事が複数あるので可算・複数。1級語彙で complaints の格上げ。③ deep historical = 形容詞2連。deep が比喩的に「根深い」。④ complicate = 「複雑にする=難しくする」。make ... difficult の一語化で、譲歩を簡潔に済ませられる。主語が複数なので原形。⑤ cooperation は不可算・無冠詞(既出)。",
      "writing": "譲歩は Admittedly + SVO 一文で最短処理(Day16 と同じ設計)。X complicate(s) Y は「障害があること」を認める譲歩専用の便利動詞——認めつつも impossible とは言っていない点が反撃の余地を残す。"
    },
    {
      "en": "However, ignoring neighbors would only deepen mistrust.",
      "ja": "しかし近隣を無視すれば不信を深めるだけだ。",
      "structure": "SVO。S=ignoring neighbors(動名詞句)、V=would deepen、O=mistrust。only は deepen を限定する副詞。",
      "grammar": "① However, = 譲歩の切り返し(既出)。② ignoring neighbors = 動名詞句主語「近隣を無視すること」。仮定の行為を主語に立て、if節(If Japan ignored its neighbors)を圧縮している。③ would = 仮定法。動名詞主語に仮定の意味が含まれるため帰結に would が呼応する。「無視したならば〜だろう」。④ only deepen = 「深めるだけだ」。only が「良いことは何もない」と選択肢を切り捨てる。⑤ deepen = deep の動詞化(-en)「深める」。worsen / strengthen / weaken と同じ語形成。⑥ mistrust = 不可算・無冠詞。distrust とほぼ同義。",
      "writing": "反撃の型 However, [動名詞句=反対の選択] would only + [悪化動詞] + [悪い名詞]。「やらない場合の帰結」を突きつけるこの一文は譲歩潰しの最短ルート。would only worsen / deepen / invite 〜 として悪化系の動詞を差し替えて量産できる。"
    },
    {
      "en": "In conclusion, because it boosts the economy, secures stability, and enables joint solutions, improving Asian relations deserves high priority.",
      "ja": "結論として、経済を押し上げ、安定を確保し、共同の解決を可能にするため、アジアとの関係改善は高い優先順位に値する。",
      "structure": "従属節+主節。because節内は動詞3連の並列(boosts / secures / enables、主語 it)。主節は SVO(improving Asian relations deserves high priority)。",
      "grammar": "① In conclusion, because it + 動詞3連 = Day16 と同じ「本論3点を動詞句で圧縮再掲」する結論の型(詳細略)。it は主節の improving Asian relations を先取り。② boosts the economy = boost(押し上げる)は increase の格上げ。the economy は「(当該国の)経済」で the。③ secures stability = secure は動詞「確保する」。ensure のローテ。④ enables joint solutions = enable + 名詞「〜を可能にする」。joint(共同の)は shared のローテ。solutions は可算・複数。⑤ deserves high priority = 「高い優先順位に値する」。deserve + 名詞。priority はここでは「優先度」という抽象度の高い不可算用法で無冠詞。",
      "writing": "結論1文目は because it + V1, V2, and V3 の圧縮再掲(Day16 と同一の型で安定運用)。deserves high priority は priority 系お題の結論動詞としてテーゼの should be a priority を言い換える——同じ語の繰り返しを避けつつ主張を再掲する見本。"
    },
    {
      "en": "For these reasons, I firmly believe the Japanese government should make this goal a central focus.",
      "ja": "これらの理由から、日本政府はこの目標を中心的な焦点とすべきだと強く信じる。",
      "structure": "SVO。S=I、V=firmly believe、O=(that省略)節。節内は SVOC(make this goal a central focus)。",
      "grammar": "① For these reasons, I firmly believe (that) 〜 = 最終文の定番(Day16 で既出)。ここでは接続詞 that が省略されている——believe / think の後の that は口語寄りでは省略可だが、迷ったら書く方が安全。② make O C = SVOC「OをCにする」。this goal(O)を a central focus(C)にする。make + 名詞 + 名詞 の第5文型。③ this goal = 前文までの「関係改善」を指示形容詞で受ける結束。④ a central focus = focus は可算で a。「中心的な焦点の一つ」。⑤ should = 政策提言の should。政府を主語にした提言文で結ぶのは政策系お題の正しい着地。",
      "writing": "最終文の型 For these reasons, I firmly believe + [提言の再掲]。make this goal a central focus は SVOC で締める格上げ表現——give priority to this goal の言い換えとして政策系の結びに流用できる。政府主語 + should で「誰が何をすべきか」を明示して終わるのが提言型の作法。"
    }
  ],
  "18": [
    {
      "en": "As the world becomes increasingly interconnected, many experts warn about the future of public health.",
      "ja": "世界がますます相互につながるにつれ、多くの専門家が公衆衛生の未来について警告している。",
      "structure": "従属節+主節。As節(S=the world、V=becomes、C=interconnected)+主節(S=many experts、V=warn、about以下が対象)。",
      "grammar": "① As + S + V = 「〜するにつれて」の接続詞 as(比例・同時進行)。時のasや理由のasと区別。② becomes increasingly interconnected = SVC。become + 形容詞で状態変化。increasingly(ますます)が現在進行中の趨勢を示す論述頻出副詞。interconnected は過去分詞由来の形容詞。③ many experts = 可算 expert の複数。無冠詞複数の総称。④ warn about 〜 = 「〜について警告する」。warn about + 危険の対象。warn A that / warn A of の語法もあるがここは自動詞的用法。⑤ the future of public health = of句で特定され the。public health は不可算・無冠詞の固定表現。",
      "writing": "序論1文目の背景提示型 As the world becomes increasingly interconnected, 〜。現代的お題(グローバル化・AI・気候)の枕として万能。As + [社会変化], many experts warn about 〜 で「時代背景→専門家の懸念」を一文で作り、次文の自説へ橋渡しする。"
    },
    {
      "en": "In my opinion, infectious diseases will undoubtedly become a bigger problem in the coming decades.",
      "ja": "私の意見では、感染症は今後数十年で間違いなくより大きな問題になる。",
      "structure": "SVC。S=infectious diseases、V=will become、C=a bigger problem。undoubtedly が will と become の間の副詞、in the coming decades が時の副詞句。",
      "grammar": "① In my opinion, = テーゼの前置き(Day17 既出)。② infectious diseases = infectious(感染性の)+可算名詞 disease の複数。無冠詞複数の総称「感染症(全般)」。③ will undoubtedly become = 未来予測お題なので will で断定。undoubtedly(間違いなく)が確信を強める文中副詞。④ a bigger problem = 比較級+可算名詞。「(今より)大きな問題」で初出・不特定なので a。⑤ in the coming decades = 「来たる数十年で」。coming は現在分詞の形容詞用法、decades は可算複数で特定の未来を指すため the。",
      "writing": "未来予測型お題のテーゼ X will undoubtedly become a bigger problem in the coming decades。will + undoubtedly/certainly で予測に確信を乗せる。in the coming decades / in the years to come / in the decades ahead は未来の時間軸ローテとして3本持つ(結論で言い換えるため)。"
    },
    {
      "en": "I will support this view by examining globalization, antibiotic resistance, and climate change.",
      "ja": "グローバル化、抗生物質耐性、気候変動を検討してこの見解を支持したい。",
      "structure": "SVO。S=I、V=will support、O=this view。by examining 〜 が手段の前置詞句、目的語は3項並列。",
      "grammar": "① I will support this view by examining A, B, and C = ロードマップ文(Day17 と同一の型)。② 3項ともに抽象名詞で無冠詞・不可算: globalization、antibiotic resistance(抗生物質耐性)、climate change。resistance は「耐性」の意で不可算。③ 本論3段落の見出しを予告している。",
      "writing": "ロードマップ文は完全にテンプレ化してよい部分——support this view by examining + [3つの名詞句]。3つはすべて無冠詞抽象名詞で揃えると冠詞事故が起きない。お題ごとに中身の名詞だけ差し替える。"
    },
    {
      "en": "First, the unprecedented scale of global travel accelerates the spread of disease.",
      "ja": "第一に、前例のない規模の世界的な移動が病気の拡散を加速させる。",
      "structure": "SVO。S=the unprecedented scale of global travel、V=accelerates、O=the spread of disease。",
      "grammar": "① First, = 本論1の開幕(既出)。② the unprecedented scale of 〜 = 「前例のない規模の〜」。scale は of句で特定され the、unprecedented(前例のない)が深刻さを客観的に強調する1級語彙。③ global travel = 不可算・無冠詞(travel は移動全般で不可算)。④ accelerates = 三単現。主語の核は scale(単数)。⑤ the spread of disease = spread(拡散)は of句で特定され the。disease はここでは「病気(全般)」の抽象で無冠詞・不可算。⑥ accelerate the spread of 〜 は「〜の拡散を速める」の定番コロケーション。",
      "writing": "the unprecedented scale of 〜 は「規模の大きさ」を誇張せず強調する看板名詞句。accelerate the spread of 〜 は感染・情報・技術など「広がる」ものすべてに使える。本論トピックセンテンスは [規模を盛った主語] + accelerates + [悪化名詞] の一撃で。"
    },
    {
      "en": "A virus emerging in one region can reach distant continents within hours.",
      "ja": "ある地域で出現したウイルスは数時間で遠く離れた大陸に到達しうる。",
      "structure": "SVO。S=A virus、V=can reach、O=distant continents。emerging in one region が virus を後置修飾する現在分詞句、within hours が時の副詞句。",
      "grammar": "① A virus = 「(一つの)ウイルス」で総称的な例示なので a(a + 単数で種類全体を代表させる用法)。② emerging in one region = 現在分詞の後置修飾。a virus (that is) emerging ... の関係詞+be 省略で「ある地域で出現するウイルス」。emerge は自動詞。③ can reach = 「到達しうる」の可能の can。④ distant continents = 可算複数・無冠詞。⑤ within hours = 「数時間以内で」。within + 時間で「〜のうちに」。時間の速さを強調する副詞句。⑥ one region ↔ distant continents の対比(一地点→遠隔地)が拡散の速さを描く。",
      "writing": "A virus emerging in one region can reach 〜 within hours のように [名詞+現在分詞の後置修飾] で主語を膨らませると一文の情報密度が上がる。within hours / within days は速さ・切迫を示す時間副詞。one X ... distant Y の対比構造は「拡散・波及」を視覚化する論法。"
    },
    {
      "en": "A case in point is the recent pandemic, which spread worldwide with alarming speed and overwhelmed health systems everywhere.",
      "ja": "好例が最近のパンデミックで、驚くべき速さで世界中に広がり、各地の医療体制を圧倒した。",
      "structure": "SVC+関係詞節。主節=A case in point is the recent pandemic。which以下は非制限用法の関係代名詞節で、動詞2連(spread / overwhelmed)。",
      "grammar": "① A case in point is 〜 = 具体例導入(Day16 既出)。② the recent pandemic = recent(最近の)で特定され the。読者と共有された「あの」パンデミック。③ , which = 非制限用法の関係代名詞。先行詞 pandemic に補足説明を付ける。④ spread = 過去形(spread は無変化動詞、過去も spread)。過去の出来事なので過去時制。with alarming speed = 「驚くべき速さで」。with + 抽象名詞で副詞化(= alarmingly fast)。alarming は現在分詞由来の形容詞。⑤ overwhelmed = 過去形の2連目。health systems everywhere = health systems(可算複数)を everywhere が後置修飾「各地の医療体制」。⑥ 関係詞節内で spread and overwhelmed と過去動詞を並列し、例の内容を一文で語り切る。",
      "writing": "A case in point is the recent pandemic, which + [過去動詞2連] は「例+その顛末」を関係詞で一文化する型(Day16 の , where 版に対する , which 版)。with alarming speed(= alarmingly fast)のように with + 抽象名詞で副詞を作る技は文体に変化をつける。実例が思い出せなくても the recent pandemic 程度の一般化で1級は通る。"
    },
    {
      "en": "Second, the overuse of antibiotics has produced increasingly resistant bacteria.",
      "ja": "第二に、抗生物質の乱用がますます耐性を持つ細菌を生み出してきた。",
      "structure": "SVO。S=the overuse of antibiotics、V=has produced、O=increasingly resistant bacteria。",
      "grammar": "① Second, = 本論2の開幕(既出)。② the overuse of antibiotics = overuse は of句で特定され the。over-(過剰)+use の派生名詞。antibiotics は薬の種類が複数なので複数形・無冠詞。③ has produced = 現在完了「(過去から今まで)生み出してきた」。過去の乱用が現在の耐性菌という結果を生んでいる継続・結果の完了。過去形 produced でなく完了形にするのがポイント。④ increasingly resistant bacteria = 副詞 increasingly が形容詞 resistant を修飾「ますます耐性の(強い)」。bacteria は bacterium の複数形(ラテン語系複数)で複数扱い・無冠詞。",
      "writing": "the overuse/overexposure of 〜 は「過剰な〜」を名詞化する型。has produced / has led to / has created など現在完了は「これまでの積み重ねが今の問題を生んだ」因果に最適——単純過去と使い分けると時制の得点が伸びる。increasingly + 形容詞 は趨勢を語る万能修飾。"
    },
    {
      "en": "As medicines lose their effectiveness, once-treatable infections may again become deadly.",
      "ja": "薬が効力を失うにつれ、かつて治療可能だった感染症が再び致命的になりかねない。",
      "structure": "従属節+主節。As節(S=medicines、V=lose、O=their effectiveness)+主節(S=once-treatable infections、V=may become、C=deadly)。",
      "grammar": "① As + S + V = 「〜するにつれて」の比例の as(第1文で既出)。② medicines lose their effectiveness = 主語 medicines(可算複数=薬の種類)、effectiveness は不可算・無冠詞だが their で所有限定。③ once-treatable = ハイフン付き複合形容詞「かつて治療可能だった」。once(かつて)+treatable(-able で「〜されうる」)。④ infections = 可算複数・無冠詞。⑤ may again become deadly = 未来の可能性の may(will より控えめ)。again が「再び」、become + 形容詞 deadly で SVC。⑥ deadly は -ly で終わるが形容詞(「致命的な」)である点に注意——副詞と誤読しない。",
      "writing": "As X lose(s) their effectiveness, Y may become 〜 は「効かなくなる→悪化する」因果の型。once-treatable / once-common のように once- + 形容詞で「かつては〜だった」を一語化できる。may + become + [形容詞] は断定を避けた未来予測の安全形。"
    },
    {
      "en": "Consequently, humanity could lose its most reliable defense against many diseases.",
      "ja": "結果として、人類は多くの病気に対する最も信頼できる防御を失う可能性がある。",
      "structure": "SVO。S=humanity、V=could lose、O=its most reliable defense。against many diseases が defense を修飾する前置詞句。",
      "grammar": "① Consequently, = 帰結の接続副詞(既出)。② humanity = 人類全体、不可算・無冠詞・単数扱い。③ could lose = 「失いかねない」の可能性の could。④ its most reliable defense = 最上級 most reliable には the が原則だが、ここは所有格 its が the の役割を兼ねるため the は付かない(× its the most)。所有格と冠詞は共起しない。defense は不可算(防御手段一般)。⑤ against many diseases = defense against 〜「〜に対する防御」の against。disease は可算で many + 複数。",
      "writing": "帰結文 Consequently, [主語] could lose 〜。所有格+最上級(its most reliable X)は the を付けない冠詞ルールの見せ場——ここを間違えないだけで冠詞の精度が伝わる。defense against 〜 / protection against 〜 は安全・健康系の頻出前置詞コロケーション。"
    },
    {
      "en": "Finally, from a long-term perspective, climate change expands the range of disease-carrying insects.",
      "ja": "最後に、長期的に見れば、気候変動は病気を媒介する昆虫の生息域を広げる。",
      "structure": "SVO。S=climate change、V=expands、O=the range of disease-carrying insects。文頭に Finally と視座の前置詞句。",
      "grammar": "① Finally, from a long-term perspective, = 本論3の開幕コンボ(Day16/17 既出)。② climate change = 不可算・無冠詞の固定表現。③ expands = 三単現。「(範囲を)広げる」他動詞。④ the range of 〜 = 「〜の(生息)範囲」。of句で特定され the。range は可算だがここは特定の一範囲で the。⑤ disease-carrying insects = ハイフン付き複合形容詞「病気を運ぶ=媒介する」。名詞 disease+現在分詞 carrying の複合。insects は可算複数・無冠詞。",
      "writing": "climate change expands the range of 〜 は「温暖化が〜の範囲を広げる」型。disease-carrying insects のように [名詞+現在分詞] のハイフン複合形容詞は情報を圧縮する1級テク(English-speaking countries と同じ作り)。expand the range/scope of 〜 は影響範囲の拡大を語る汎用コロケーション。"
    },
    {
      "en": "Rising temperatures allow mosquitoes and other vectors to thrive in previously unaffected regions.",
      "ja": "気温上昇により、蚊などの媒介生物がこれまで影響のなかった地域でも繁殖できるようになる。",
      "structure": "SVOC。S=Rising temperatures、V=allow、O=mosquitoes and other vectors、C=to thrive(to不定詞)。in以下は場所の副詞句。",
      "grammar": "① Rising temperatures = 現在分詞 rising の前置修飾「上昇する気温」。temperature は複数形で「各地の気温」を総称、無冠詞。② allow O to do = SVOC「Oが〜するのを可能にする」。allow + 目的語 + to不定詞。force / require(Day1)と同じ to不定詞を取る使役系だが allow は「許容・可能化」。③ mosquitoes and other vectors = A and other B「Aやその他のB」で例示。vector(媒介生物)は可算複数。④ thrive = 自動詞「繁殖する・栄える」。⑤ previously unaffected regions = 副詞 previously が形容詞 unaffected(un-+affected)を修飾「以前は影響を受けていなかった」。regions は可算複数・無冠詞。",
      "writing": "allow O to thrive/spread は「〜がはびこるのを許す」型で、無生物主語(温暖化・技術)と好相性。X and other + 上位語(mosquitoes and other vectors)は一例+一般化の便利な列挙。previously unaffected / previously safe のように previously + 過去分詞で「以前は〜だった」を後置せず前置で言える。"
    },
    {
      "en": "Admittedly, medical technology continues to advance.",
      "ja": "確かに医療技術は進歩し続けている。",
      "structure": "SV。S=medical technology、V=continues to advance。Admittedly が文修飾副詞。",
      "grammar": "① Admittedly, = 譲歩の文副詞(既出。次文 However とセット)。② medical technology = 不可算・無冠詞の抽象名詞。③ continues to advance = continue to do「〜し続ける」。continue は to不定詞も動名詞(continue advancing)も取れる。advance は自動詞「進歩する」。④ continues が三単現(主語 technology は不可算単数扱い)。譲歩を4語で最短処理。",
      "writing": "譲歩は Admittedly + [反対材料の一文] で短く(Day16/17 と同じ設計思想)。continue(s) to advance / grow / improve は「〜し続ける」進行趨勢の定番。テクノロジー楽観論を一度立てておき、次文で潰す布石。"
    },
    {
      "en": "However, pathogens evolve and spread faster than new treatments can be developed.",
      "ja": "しかし病原体は新たな治療法が開発されるより速く進化し拡散する。",
      "structure": "SV(動詞2連の並列)。S=pathogens、V=evolve and spread。faster than以下は比較の従属節(S=new treatments、V=can be developed:受動)。",
      "grammar": "① However, = 譲歩の切り返し(既出)。② pathogens = 可算複数・無冠詞の総称「病原体」。evolve and spread = 自動詞2連の並列(主語複数なので原形)。③ faster than new treatments can be developed = 比較級 faster + than節。than の後は完全な節で、new treatments が主語、can be developed は助動詞+受動「開発されうる」。開発する主体をぼかすため受動。④ Day16 の consumed faster than they can be replenished と同一の「悪化 > 対策」比較構造。",
      "writing": "反撃の型 However, X evolve/spread faster than Y can be developed。「問題の進行が解決策を上回る」というこの比較枠は Day16 と共通の必殺パターン——技術楽観論の反駁に毎回使える。faster than S can be + 過去分詞 をテンプレとして丸暗記。"
    },
    {
      "en": "In conclusion, because of relentless globalization, growing drug resistance, and a warming planet, infectious diseases pose an escalating threat.",
      "ja": "結論として、絶え間ないグローバル化、増大する薬剤耐性、温暖化する地球のために、感染症は深刻化する脅威を突きつける。",
      "structure": "前置詞句+主節。because of + 名詞句3連の並列(理由)、主節は SVO(infectious diseases pose an escalating threat)。",
      "grammar": "① In conclusion, because of + 名詞 = Day16/17 は because + 節(動詞句)だったが、ここは because of + 名詞句で本論3点を再掲。because of の後は名詞(× because of + 主語+動詞)。名詞句3連にすることで動詞版と違う締めの表情を出す。② relentless globalization(絶え間ない〜、不可算)、growing drug resistance(増大する〜、不可算)、a warming planet(温暖化する地球、a+単数)——3つで冠詞・可算の型が違うのが自然。drug resistance は antibiotic resistance の言い換え。③ pose an escalating threat = pose a threat(脅威を突きつける)の格上げ。escalating(深刻化する)が現在分詞の形容詞用法、threat は可算で a。",
      "writing": "結論の再掲は2形あると覚える——because + it + 動詞3連(Day16/17)か、because of + 名詞句3連(Day18)。本エッセイ内で使う方を選ぶ。pose an escalating/growing threat は「悪化する脅威」を語る結論動詞で、序論の will become a bigger problem を名詞句で言い換えている。"
    },
    {
      "en": "For these reasons, I am firmly convinced that they will become a far bigger problem in the decades ahead.",
      "ja": "これらの理由から、それらが今後数十年ではるかに大きな問題になると固く確信している。",
      "structure": "SVC+that節。S=I、V=am convinced、that節が確信内容。that節内は SVC(they will become a far bigger problem)。",
      "grammar": "① For these reasons, I am firmly convinced that 〜 = 最終文の定番(Day16 既出)。② they = 前出の infectious diseases を代名詞で受ける(結論での反復を代名詞で軽くする)。③ will become a far bigger problem = 序論のテーゼ will become a bigger problem に far を追加して強調。far は比較級 bigger を「はるかに」と強める(Day1 の far outweigh と同じ強調)。④ in the decades ahead = 序論の in the coming decades を言い換えた未来の時間句。ahead が後置で「先の」。⑤ 結論で立場を再掲しつつ、far の追加と時間句の言い換えで単なるコピーを避けている。",
      "writing": "最終文 For these reasons, I am firmly convinced that + [テーゼ再掲]。再掲時は far を足す・時間句を in the coming decades → in the decades ahead に変えるなど微調整でコピー感を消すのが上級者の仕上げ。同じ主張を「同じだが少し違う言葉」で締めるのが結論の理想。"
    }
  ],
  "19": [
    {
      "en": "It is widely believed that humanity should rid itself of weapons of mass destruction.",
      "ja": "人類は大量破壊兵器を捨てるべきだと広く信じられている。",
      "structure": "形式主語構文の受動。It=形式主語、真主語は that節。that節内は S(humanity)+V(should rid)+O(itself)+of句。",
      "grammar": "① It is widely believed that 〜 = 「〜と広く信じられている」。形式主語 it+受動態で一般論を客観的に提示する序論の定番。believe を受動にして「誰が信じているか」をぼかす。widely が「広く」。② humanity = 人類全体、不可算・無冠詞・単数扱い。③ should rid itself of 〜 = rid A of B「AからBを取り除く」。再帰代名詞 itself(=humanity)を目的語にして「自らを〜から解放する」。of とセットの語法(deprive/strip A of B と同族)。④ weapons of mass destruction = 「大量破壊兵器(WMD)」。weapon は可算・複数、of mass destruction が種類を限定する固定句だが特定の兵器群でなく総称なので無冠詞。mass destruction は不可算。",
      "writing": "序論1文目の中立提示型 It is widely believed that + [一般論]。反対・賛成どちらの立場でも「世間はこう考えている」と置いてから自説へ転じられる。rid A of B は remove の格上げ語法として抜き出せる。お題の語(ban WMD)を humanity should rid itself of WMD と動詞ごと言い換えるのが1級の作法。"
    },
    {
      "en": "While this is a noble aspiration, I am convinced that a complete worldwide ban remains an unattainable goal for the foreseeable future.",
      "ja": "これは崇高な願いではあるが、完全な世界的禁止は当面のあいだ達成不可能な目標だと私は確信している。",
      "structure": "従属節+主節。While節(S=this、V=is、C=a noble aspiration)+主節(S=I、V=am convinced、that節)。that節内は SVC(a ban remains an unattainable goal)。",
      "grammar": "① While + 譲歩節 = 反対材料を一度認める型(Day1 の While 構文)。this は前文の理想を指示。② a noble aspiration = 「崇高な願い」。aspiration は可算で a。③ I am convinced that 〜 = テーゼ。be convinced(確信している)は convince A that の受動が形容詞化した形(Day1 の firmly convinced 系)。④ a complete worldwide ban = ban は可算で a、complete/worldwide の二重形容詞で限定。⑤ remains + 名詞 = SVC「〜のままである」。remain は補語に名詞も取れる。⑥ an unattainable goal = un-+attainable(達成されうる)の否定形容詞。goal は可算で an(母音前)。⑦ for the foreseeable future = 「当面は」の定型。foreseeable(見通せる)で特定され the。",
      "writing": "序論2文目=譲歩つきテーゼの型 While this is a noble aspiration, I am convinced that 〜。反対側の理想を noble aspiration と一度立ててから否定に入ると一方的でなく見える。remains an unattainable goal / beyond reach は「不可能寄り」の立場を上品に言う核フレーズ。for the foreseeable future は「当面」を添えて断定を和らげる保険。"
    },
    {
      "en": "First, such weapons function as a powerful deterrent.",
      "ja": "第一に、こうした兵器は強力な抑止力として機能する。",
      "structure": "SV+前置詞句。S=such weapons、V=function、as以下が役割を示す前置詞句。",
      "grammar": "① First, = 本論1の開幕(既出)。② such weapons = 「そうした兵器」。such が前出の WMD を指示的に受ける。無冠詞複数。③ function as 〜 = 「〜として機能する」。function は自動詞で as とセット。serve as と交換可。④ a powerful deterrent = deterrent(抑止力)は可算で a。powerful が程度を盛る。act as / serve as / function as の使役系ローテ。",
      "writing": "本論トピックセンテンス X function/serve as a powerful deterrent。function as + [役割名詞] は「〜の役目を果たす」を言う型で play a role in と使い分けると動詞が単調にならない。First, + SVC の短いトピックセンテンスで段落主張を言い切る設計は Day16 以降と共通。"
    },
    {
      "en": "This is largely because nuclear powers regard their arsenals as a guarantee against invasion.",
      "ja": "これは主に、核保有国が自国の兵器を侵略に対する保証とみなしているからだ。",
      "structure": "SVC(理由節つき)。S=This、V=is、C=because節。because節内は SVOC(regard their arsenals as a guarantee)。",
      "grammar": "① This is largely because 〜 = 「これは主に〜だからだ」。前文の主張の理由を一文で深掘りする型。largely(主に)が理由の主従を示す。② nuclear powers = 「核保有国」。power は「大国」の意で可算・複数。無冠詞複数の総称。③ regard A as B = SVOC「AをBとみなす」。as とセットの知覚動詞語法(see A as B / view A as B と同族)。④ their arsenals = 所有格+arsenal(兵器庫)の複数。⑤ a guarantee against invasion = guarantee(保証)は可算で a。guarantee against 〜「〜に対する保証」の against。invasion は -sion 抽象名詞で無冠詞・不可算。",
      "writing": "This is largely because 〜 は理由の深掘り専用の万能接続(Day19/20 の各本論2文目に共通の型)。regard/view/see A as B は「AをBと捉える」を言う SVOC ローテで、抽象論述の主力構文。X as a guarantee against 〜 のように as + 名詞 + against 〜 で「〜への備え」を圧縮できる。"
    },
    {
      "en": "For instance, states that possess these weapons have rarely been attacked directly, which makes them deeply reluctant to disarm.",
      "ja": "例えば、これらの兵器を持つ国が直接攻撃されることはまれであり、そのため手放すことを極度に渋る。",
      "structure": "複文。主節=states ... have rarely been attacked(S=states、V=受動現在完了)。that possess these weapons は states を修飾する関係詞節。, which 以下は前の節全体を先行詞とする非制限関係詞節(SVOC)。",
      "grammar": "① For instance, = 具体例導入(既出)。② states that possess these weapons = 関係代名詞 that(主格)が states を限定「これらの兵器を持つ国」。possess は「所有する」の格上げ他動詞。states(国家)は可算複数・無冠詞。③ have rarely been attacked = 現在完了+受動+頻度副詞。rarely(めったに〜ない)は準否定語で not を使わず否定を表す。directly が「直接」。④ , which makes them ... = 非制限用法の which が前の節全体(直接攻撃されないこと)を受ける。makes O C = SVOC。them=these states。⑤ deeply reluctant to disarm = 形容詞 reluctant to do「〜するのを渋る」+deeply で強調。disarm は自動詞「武装解除する」。",
      "writing": "For instance, [主語] have rarely been attacked, which makes them reluctant to 〜 は「例+その帰結」を , which で一文化する型(Day16 の , where / Day18 の , which と同族)。rarely / seldom は not を使わず否定する準否定語で文体が締まる。make O reluctant/eager to do は SVOC で心理的帰結を述べる便利形。"
    },
    {
      "en": "Second, verification is extremely difficult.",
      "ja": "第二に、検証が極めて難しい。",
      "structure": "SVC。S=verification、V=is、C=difficult。extremely が difficult を強める副詞。最短のトピックセンテンス。",
      "grammar": "① Second, = 本論2の開幕(既出)。② verification = -tion 抽象名詞で不可算・無冠詞。verify(検証する)の名詞。③ is extremely difficult = SVC。extremely が形容詞を強める程度副詞。4語で段落主張を言い切る緩急(Day16 の accelerates environmental destruction と同じ短文設計)。",
      "writing": "トピックセンテンスは X is extremely difficult のように短くてよい。抽象名詞(verification / enforcement / cooperation)を主語に立て is + 形容詞で言い切ると、次文以降の展開に紙面を回せる。長短のリズムで読みやすさを作るのが1級の構成力。"
    },
    {
      "en": "Even if every nation signed a treaty, confirming that hidden stockpiles had truly been destroyed would pose a serious problem.",
      "ja": "たとえすべての国が条約に署名しても、隠された備蓄が本当に廃棄されたと確認することは深刻な問題となる。",
      "structure": "仮定法の従属節+主節。Even if節(S=every nation、V=signed)+主節(S=confirming that ...:動名詞句、V=would pose、O=a serious problem)。",
      "grammar": "① Even if + 過去形, ... would 〜 = 仮定法過去「たとえ〜しても…だろう」。現実味の薄い仮定を signed(過去形)/would で表す。譲歩の even if。② every nation signed = every+単数名詞で「どの国も」、動詞は単数だが仮定法過去で signed。③ a treaty = 可算で a。④ confirming that ... = 動名詞句が主節の主語。動名詞主語は単数扱い→ would pose(would は仮定の帰結)。⑤ that hidden stockpiles had truly been destroyed = confirm の目的語の that節。had been destroyed は過去完了+受動「(署名時点より前に)廃棄されていた」と時間差を示す大過去。hidden は過去分詞の前置修飾、stockpiles は可算複数。⑥ pose a serious problem = 「深刻な問題をもたらす」の定番(Day18 の pose a threat と同族)。",
      "writing": "Even if [譲歩の仮定], [動名詞主語] would pose a serious problem は「仮に前提が満たされても、なお別の難題が残る」と論を一段深める型。仮定法 even if + 過去 ... would は現実味の薄い前提を扱うときの標準。confirming that + 過去完了 のように時間の前後を過去完了で正確に描くと時制の得点が伸びる。"
    },
    {
      "en": "For instance, inspectors have repeatedly struggled to access secretive facilities, leaving room for concealment and cheating.",
      "ja": "例えば、査察官は秘密施設へのアクセスに繰り返し苦労しており、隠蔽やごまかしの余地が残る。",
      "structure": "SV+分詞構文。主節=inspectors have repeatedly struggled to access ...。leaving以下は結果を表す分詞構文。",
      "grammar": "① For instance, = 具体例導入(既出)。② inspectors = 可算複数・無冠詞の総称。③ have repeatedly struggled = 現在完了「繰り返し苦労してきた」。repeatedly が反復を強調。struggle to do「〜しようと苦労する」。④ secretive facilities = 形容詞 secretive(秘密主義の)+可算複数 facilities。⑤ leaving room for 〜 = 結果・付帯状況の分詞構文「その結果〜の余地を残す」。主節の主語(inspectors の苦労という事態)を意味上の主語にして and this leaves room for 〜 を圧縮。leave room for 〜「〜の余地を残す」は定型。⑥ concealment and cheating = ともに動名詞由来/不可算の抽象名詞で無冠詞、and で並列。",
      "writing": "For instance, [主語] have struggled to 〜, leaving room for 〜 は「例+その帰結」を分詞構文 leaving で一文化する型(, which の代替として分詞構文版を持っておく)。結果を表す分詞構文 , leaving 〜 は文末で帰結を軽く付け足す上級テク。leave room for 〜 は「〜の隙・余地がある」を言う便利コロケーション。"
    },
    {
      "en": "Finally, mutual distrust among rival nations makes disarmament fragile.",
      "ja": "最後に、敵対国間の相互不信が軍縮を脆くする。",
      "structure": "SVOC。S=mutual distrust among rival nations、V=makes、O=disarmament、C=fragile。",
      "grammar": "① Finally, = 本論3の開幕(既出。この day は from a long-term perspective を伴わない変化形)。② mutual distrust = 「相互不信」。distrust は不可算・無冠詞、mutual が「相互の」。③ among rival nations = 「敵対国の間の」。among は3者以上の間、rival(競合の)+可算複数 nations。④ makes disarmament fragile = SVOC「軍縮を脆くする」。make+O+形容詞の第5文型。disarmament は -ment 抽象名詞で不可算・無冠詞。fragile が「脆い」の形容詞補語。",
      "writing": "本論3のトピックセンテンス [抽象名詞主語] makes X fragile/difficult/possible は SVOC で「〜を…な状態にする」を一撃で言う型。mutual distrust / mutual suspicion は国際関係お題の頻出主語。make O + 形容詞 は原因→状態変化を圧縮する主力構文として毎回使える。"
    },
    {
      "en": "No country will abandon its weapons while its enemies might retain theirs.",
      "ja": "敵が兵器を残しているかもしれないのに、自国だけ捨てる国はない。",
      "structure": "SVO+従属節。主節=No country will abandon its weapons。while節(S=its enemies、V=might retain、O=theirs)。",
      "grammar": "① No country will 〜 = 主語を No+単数名詞で全否定「どの国も〜しない」(Day17 の no country can solve alone と同族)。not any country より強い。② will abandon = 意志未来「捨てるつもりはない」。③ its weapons = its は country を受ける所有格、weapons は可算複数。④ while = ここでは「〜する一方で・〜なのに」の対比・譲歩の while(時ではない)。⑤ its enemies might retain theirs = might(かもしれない)の推量。theirs = 所有代名詞で its enemies' weapons を指し反復を避ける。retain(保持する)は keep の格上げ。⑥ its ... theirs の所有関係の対比が「自分だけ損する構図」を描く。",
      "writing": "No country will + V while its enemies might + V は「相手が持つ限り自分も手放さない」というジレンマを述べる型。No + 単数名詞で始める全否定は強い主張を作る。所有代名詞 theirs / one's own で名詞反復を避けるのは字数節約と洗練の両立技。"
    },
    {
      "en": "Consequently, even sincere negotiations tend to collapse the moment one side suspects betrayal.",
      "ja": "その結果、誠実な交渉でさえ、一方が裏切りを疑った瞬間に崩れがちだ。",
      "structure": "SV+従属節。主節=even sincere negotiations tend to collapse。the moment 以下は接続詞化した時の従属節(S=one side、V=suspects、O=betrayal)。",
      "grammar": "① Consequently, = 帰結の接続副詞(既出)。② even sincere negotiations = even が「〜でさえ」と極端例を強調。sincere(誠実な)+可算複数 negotiations(交渉は複数形が慣用)。無冠詞。③ tend to collapse = tend to do「〜しがちだ」。断定を避ける傾向表現。collapse は自動詞「崩壊する」。④ the moment + S + V = 「〜した瞬間に」。the moment が接続詞として as soon as と同じ働きをする(名詞句が接続詞化)。⑤ one side suspects betrayal = one side(一方)が主語で三単現 suspects、betrayal(裏切り)は不可算・無冠詞。",
      "writing": "帰結文 Consequently, even X tend to collapse the moment 〜。even + [主語] で「〜すら」と最良ケースでも崩れると示すと論が強い。tend to + V は「〜しがち」で断定を避ける安全弁。the moment / the instant + S + V は「〜した途端」を表す接続詞化名詞句で as soon as の格上げローテ。"
    },
    {
      "en": "Admittedly, treaties have reduced certain arsenals.",
      "ja": "確かに、条約は一部の兵器を削減してきた。",
      "structure": "SVO。S=treaties、V=have reduced、O=certain arsenals。Admittedly が文修飾副詞。",
      "grammar": "① Admittedly, = 譲歩の文副詞(既出。この day は次文 Nevertheless と対)。② treaties = 可算複数・無冠詞の総称。③ have reduced = 現在完了「(これまでに)削減してきた」。過去から現在までの成果を示す完了。④ certain arsenals = certain(いくつかの・一部の)+可算複数 arsenals。certain は「特定の一部」を漠然と指す。譲歩を4語で最短処理。",
      "writing": "この day は独立した譲歩段落(第5段落)を持つ構成——Admittedly + 一文で反対材料を認め、次段冒頭ではなく同段で切り返す。Admittedly, X have reduced/improved 〜 は「一定の前進はあった」と部分的に認める定型。have + 過去分詞で「これまでの成果」を表すと譲歩に説得力が出る。"
    },
    {
      "en": "Nevertheless, reduction is not the same as elimination, and the underlying incentives to keep these weapons remain strong.",
      "ja": "それでもなお、削減は廃絶と同じではなく、兵器を保持しようとする根本的な動機は依然として強い。",
      "structure": "重文。節1=SVC(reduction is not the same as elimination)、節2=SVC(the underlying incentives ... remain strong)。and で接続。",
      "grammar": "① Nevertheless, = 「それでもなお」。Admittedly の譲歩を強く切り返す接続副詞(However の格上げ)。② reduction is not the same as elimination = the same as 〜「〜と同じ」の否定。reduction / elimination はともに -tion/-ion 抽象名詞で不可算・無冠詞。「削減≠廃絶」の概念対比。③ , and = 独立節2つを結ぶ重文。④ the underlying incentives to keep these weapons = the+形容詞 underlying(根底にある)+可算複数 incentives。to keep 〜 は incentive を修飾する形容詞的用法の不定詞「〜する動機」。of句や文脈で特定され the。⑤ remain strong = SVC「強いままである」(Day16 の remains upward と同族)。",
      "writing": "Nevertheless, X is not the same as Y は「AとBは別物だ」と概念を切り分ける反論の型——reduction ≠ elimination のように相手の成果を「それは本丸ではない」とかわせる。the incentives to do 〜 remain strong は「動機が根強く残る」を言う型で、to不定詞で名詞を後置修飾する構造。"
    },
    {
      "en": "In conclusion, deterrence, the difficulty of verification, and entrenched distrust make a worldwide ban impractical.",
      "ja": "結論として、抑止力、検証の難しさ、根深い不信が世界的禁止を非現実的にしている。",
      "structure": "SVOC。S=名詞3連の並列(deterrence, the difficulty of verification, entrenched distrust)、V=make、O=a worldwide ban、C=impractical。",
      "grammar": "① In conclusion, = 結論の開幕(既出)。② 主語の名詞3連=本論3点の再掲: deterrence(抑止力、不可算・無冠詞)、the difficulty of verification(of句で特定され the)、entrenched distrust(entrenched=定着した、distrust は不可算・無冠詞)。3つで冠詞処理が異なるのが自然。③ make = 主語が3つ→複数扱いなので原形(三単現の -s なし)。Day1 の confirm と同じ主述一致。④ make a worldwide ban impractical = SVOC「〜を非現実的にする」。a ban は可算で a、impractical(非現実的)が形容詞補語。",
      "writing": "結論の再掲を「名詞3連を主語に立てた SVOC」で処理する型——[理由A, 理由B, and 理由C] make X impractical。Day16/17(because + 動詞句)や Day18(because of + 名詞句)と並ぶ第3の再掲パターンとして持っておく。複数主語→動詞は原形、の主述一致が採点の見せ場。"
    },
    {
      "en": "Although limiting these weapons is worthwhile, completely abolishing them is, regrettably, beyond our reach.",
      "ja": "これらの兵器を制限することには価値があるが、完全に廃絶することは残念ながら我々の手の届かないところにある。",
      "structure": "従属節+主節。Although節(S=limiting these weapons:動名詞句、V=is、C=worthwhile)+主節(S=completely abolishing them:動名詞句、V=is、C=beyond our reach)。regrettably は挿入副詞。",
      "grammar": "① Although + 譲歩節 = 反対材料(制限には価値がある)を一度認めてから主張(廃絶は不可能)を出す最終文(While 構文の Although 版)。② limiting these weapons / completely abolishing them = ともに動名詞句主語。動名詞主語は単数扱い→ is。limiting(制限)と abolishing(廃絶)の対比が「制限≠廃絶」の論旨を締める。③ is worthwhile = 「価値がある」(Day1 の worthwhile と同語)。④ , regrettably, = 挿入の文副詞「残念ながら」。カンマで前後を区切り書き手の評価を差し込む。⑤ beyond our reach = 「手の届かない範囲」の慣用句。beyond+名詞で「〜を超えて=及ばない」。reach は不可算・所有格 our で限定。",
      "writing": "最終文の型 Although [動名詞A] is worthwhile, [動名詞B] is beyond our reach。limiting ↔ abolishing のように動名詞の対比で「できること/できないこと」を締めると論旨が鮮明になる。beyond our reach は「不可能」を上品に言う結論フレーズ(impossible の格上げ)。, regrettably, の挿入副詞は書き手の姿勢を添えて余韻を残すテク。"
    }
  ],
  "20": [
    {
      "en": "In an age dominated by technology and data, some argue that studying the Humanities is no longer worthwhile.",
      "ja": "テクノロジーとデータが支配する時代に、人文学を学ぶことはもはや価値がないと主張する人もいる。",
      "structure": "前置詞句+主節。In an age ... が背景の副詞句。主節=some argue that節。that節内は SVC(studying the Humanities is worthwhile)。",
      "grammar": "① In an age dominated by 〜 = 「〜が支配する時代に」。age は可算で a(一つの時代)。dominated by 〜 は過去分詞の後置修飾(an age that is dominated by ...)で受動、by が動作主。時代背景を置く序論の枕。② technology and data = ともに不可算・無冠詞。③ some argue that 〜 = 一般論・反対論の紹介(Day16 の Some argue that と同型)。some は people を省いた総称。④ studying the Humanities = 動名詞句主語「人文学を学ぶこと」。動名詞主語は単数扱い→ is。the Humanities は学問分野名として定冠詞+大文字、複数形だが分野としては単数的に扱う固有的用法。⑤ no longer worthwhile = no longer「もはや〜ない」の否定副詞句+形容詞 worthwhile。",
      "writing": "序論1文目の背景+反対論提示型 In an age dominated by X, some argue that 〜。時代の枕(In an age dominated by technology / In today's globalized world)を置いてから反対論を紹介し、次文 However で自説に反転させる二段構え。no longer worthwhile / no longer relevant は「時代遅れ論」を代弁する定型。"
    },
    {
      "en": "However, I firmly believe that a university degree in the Humanities retains great relevance in today's world.",
      "ja": "しかし私は、人文系の大学の学位は現代においても大きな意義を保っていると固く信じている。",
      "structure": "SVO。S=I、V=firmly believe、O=that節。that節内は SVO(a degree retains great relevance)。However が反対論への切り返し。",
      "grammar": "① However, I firmly believe that 〜 = 前文の反対論を切り返しつつテーゼを宣言。firmly が確信の強度。② a university degree in the Humanities = degree は可算で a。in the Humanities が「どの分野の学位か」を限定。③ retains = 三単現(主語 a degree は単数)。retain(保持する)は keep の格上げ。④ great relevance = relevance(意義・関連性)は不可算・無冠詞、great が程度を盛る。⑤ in today's world = 「今日の世界で」。today's の所有格で特定。",
      "writing": "テーゼの型 However, I firmly believe that + [主張]。反対論(some argue)→ However + 自説の反転は序論の黄金パターン。retain(s) great relevance は「今なお意義がある」を言う核フレーズで、is still important の格上げ。in today's world / in the modern era は「現代において」の時制の枠として添える。"
    },
    {
      "en": "First, the Humanities cultivate critical thinking.",
      "ja": "第一に、人文学は批判的思考を養う。",
      "structure": "SVO。S=the Humanities、V=cultivate、O=critical thinking。最短のトピックセンテンス。",
      "grammar": "① First, = 本論1の開幕(既出)。② the Humanities cultivate = 主語 the Humanities はここでは複数扱い(学問群)なので動詞は原形 cultivate(三単現の -s なし)。前文では単数的、ここでは複数的——文脈で扱いが揺れる固有分野名の注意点。③ cultivate = 「養う・育む」。develop / foster とローテする「能力を育てる」動詞(Day20 keyExpressions の核)。④ critical thinking = 不可算・無冠詞の抽象名詞。",
      "writing": "本論トピックセンテンス The Humanities cultivate critical thinking。cultivate / foster / develop は「能力・資質を育てる」動詞の三種ローテで、同一エッセイ内で使い分けると動詞の単調さが消える(この day の最大の狙い)。First, + SVO で段落主張を短く言い切る設計は Day16 以降共通。"
    },
    {
      "en": "This is largely because subjects such as philosophy and history train students to question assumptions and weigh evidence.",
      "ja": "これは主に、哲学や歴史といった科目が、前提を疑い証拠を吟味する力を学生に訓練するからだ。",
      "structure": "SVC(理由節つき)。主節=This is largely because節。because節内は SVOC(subjects train students to question ... and weigh ...)。",
      "grammar": "① This is largely because 〜 = 理由の深掘り(Day19 で既出)。② subjects such as philosophy and history = 「哲学や歴史のような科目」。such as で例示、subjects は可算複数・無冠詞。philosophy / history は学問名として不可算・無冠詞。③ train O to do = SVOC「Oを訓練して〜させる」。train + 人 + to不定詞(force/require/allow と同じ to不定詞使役系)。④ students = 無冠詞複数の総称。⑤ to question assumptions and weigh evidence = to不定詞の中で動詞2連並列(2つ目の to は省略)。question(疑う)は動詞、assumptions は可算複数、weigh(吟味する)+ evidence(不可算・無冠詞)。",
      "writing": "This is largely because [主語] train students to 〜 は理由深掘りの型(Day19 と共通の接続 This is largely because)。train/teach/encourage O to do は SVOC で教育効果を述べる主力。to不定詞内の動詞並列(to question ... and weigh ...)で複数の効果を一息に列挙できる。"
    },
    {
      "en": "For instance, employers increasingly value graduates who can analyze complex problems rather than merely follow instructions.",
      "ja": "例えば、雇用主は単に指示に従うだけでなく複雑な問題を分析できる卒業生をますます重視している。",
      "structure": "SVO。S=employers、V=value、O=graduates。who以下は graduates を修飾する関係詞節。rather than 以下は対比の並列。",
      "grammar": "① For instance, = 具体例導入(既出)。② employers increasingly value = 主語 employers(可算複数・無冠詞)、increasingly(ますます)が value(重視する)を修飾。③ graduates who can analyze 〜 = 主格の関係代名詞 who が graduates(人)を限定。can analyze で能力。complex problems は可算複数・無冠詞。④ rather than merely follow instructions = rather than 〜「〜よりむしろ」。than の後は原形 follow(analyze と対比の並列で原形を揃える)。merely(単に)が follow を限定。instructions は「指示」の意で複数形が慣用。⑤ analyze ↔ follow の対比が「考える人材 vs 従うだけの人材」を描く。",
      "writing": "For instance, employers value X who can 〜 rather than 〜 は「実社会での価値」を示す具体例の型。rather than + 原形 で「〜ではなく」の対比を作る(A rather than B は品詞・形を揃える)。employers increasingly value 〜 は能力の有用性を裏づける汎用の例文フレーム。"
    },
    {
      "en": "Second, these disciplines develop strong communication skills.",
      "ja": "第二に、これらの学問は強い伝達力を育てる。",
      "structure": "SVO。S=these disciplines、V=develop、O=strong communication skills。",
      "grammar": "① Second, = 本論2の開幕(既出)。② these disciplines = 指示形容詞 these が前段の the Humanities を言い換えて受ける結束表現。discipline は「学問分野」の意で可算・複数。同じ主語(the Humanities)を these disciplines と言い換え反復を避ける。③ develop = cultivate の言い換え(この day の動詞ローテ)。主語複数なので原形。④ strong communication skills = communication は skills を修飾する名詞の形容詞用法(単数形)、skills は可算複数「技能」。",
      "writing": "主語の言い換え these disciplines / such subjects / these fields で the Humanities の反復を避けるのが結束の技。develop strong communication skills は cultivate critical thinking と動詞・目的語をずらした並行構造で、本論トピックセンテンスを型として揃えつつ語彙を変える見本。"
    },
    {
      "en": "Furthermore, the ability to write and argue persuasively is essential in almost every profession.",
      "ja": "さらに、説得力をもって書き議論する能力は、ほぼあらゆる職業で不可欠だ。",
      "structure": "SVC。S=the ability to write and argue persuasively、V=is、C=essential。in以下が場所・範囲の副詞句。",
      "grammar": "① Furthermore, = 「さらに」。追加の論拠を足す接続副詞(Moreover / In addition とローテ)。② the ability to do = 「〜する能力」。ability は to不定詞と結び、of句/to不定詞で特定され the。to write and argue は不定詞内の動詞2連(2つ目の to 省略)。③ persuasively = 「説得力をもって」。write and argue の両方を修飾する副詞(文末に置いて2動詞を束ねる)。④ is essential in 〜 = SVC。essential(不可欠な)は very important の格上げ(Day1 既出)。⑤ almost every profession = almost が every を修飾「ほぼあらゆる」。every+単数名詞 profession。",
      "writing": "the ability to + 動詞 is essential in almost every 〜 は「その能力はどこでも不可欠」と汎用性を訴える型。almost every / virtually every は「ほぼすべて」を誇張しすぎずに言う限定表現。Furthermore/Moreover で本論内に2つ目の論拠を追加する二段構えは段落を厚くするテク。"
    },
    {
      "en": "For instance, fields ranging from law to marketing depend heavily on the clear expression that Humanities training provides.",
      "ja": "例えば、法律からマーケティングに至る分野は、人文学の訓練が与える明快な表現に大きく依存している。",
      "structure": "SV+前置詞句。S=fields ranging from law to marketing、V=depend、on以下が依存対象。that以下は expression を修飾する関係詞節。",
      "grammar": "① For instance, = 具体例導入(既出)。② fields ranging from A to B = 現在分詞 ranging の後置修飾「AからBに及ぶ分野」。range from A to B が「AからBまで幅がある」。fields は可算複数・無冠詞、law / marketing は分野名として不可算・無冠詞。③ depend heavily on 〜 = 「〜に大きく依存する」(Day17 の depend heavily on と同じ)。主語複数なので原形。④ the clear expression that Humanities training provides = 目的格の関係代名詞 that が expression を限定「人文学の訓練が与える明快な表現」。関係詞で特定されるので the。expression はここでは「表現力」の意で不可算。⑤ Humanities training = 「人文学の訓練」、training は不可算・無冠詞。",
      "writing": "For instance, fields ranging from A to B depend heavily on 〜 は「幅広い分野が〜に依存」と汎用性を例で裏づける型。ranging from A to B は範囲の広さを一語で示す後置修飾。the X that Y provides のように関係詞で名詞を特定して the を付ける構造は冠詞判断の基本形として押さえる。"
    },
    {
      "en": "Finally, the Humanities foster ethical awareness, which technology alone cannot supply.",
      "ja": "最後に、人文学は倫理的な意識を育むが、これはテクノロジーだけでは供給できない。",
      "structure": "SVO+関係詞節。主節=the Humanities foster ethical awareness。, which以下は ethical awareness を先行詞とする非制限関係詞節(S=technology alone、V=cannot supply)。",
      "grammar": "① Finally, = 本論3の開幕(既出)。② the Humanities foster = foster は cultivate/develop の3つ目のローテ動詞。主語複数扱いで原形。③ ethical awareness = 不可算・無冠詞の抽象名詞。④ , which technology alone cannot supply = 非制限用法の which が ethical awareness を受ける。目的格の関係代名詞で、supply の目的語が which(= ethical awareness)。⑤ technology alone = 「テクノロジーだけでは」。alone が名詞を後置修飾「〜単独では」。⑥ cannot supply = 「供給できない」。人文学の独自価値を「技術では代替不可」と際立たせる。",
      "writing": "本論3トピックセンテンス The Humanities foster X, which technology alone cannot supply。, which ... cannot 〜 で「これは〜には代えがたい」と独自価値を強調する型。[名詞] alone cannot + V は「〜だけでは足りない」を言う対比フレーズで、技術偏重論への反駁に効く。foster ethical awareness で動詞ローテを完成(cultivate → develop → foster)。"
    },
    {
      "en": "Moreover, as artificial intelligence raises difficult moral questions, society urgently needs people capable of judging right from wrong.",
      "ja": "しかも、人工知能が難しい道徳的問いを生む中で、社会は善悪を判断できる人材を切実に必要としている。",
      "structure": "従属節+主節。Moreover のあと as節(S=artificial intelligence、V=raises、O=difficult moral questions)+主節(S=society、V=needs、O=people)。capable以下は people を修飾する形容詞句。",
      "grammar": "① Moreover, = 追加の接続副詞(Furthermore とローテ)。本論3に2つ目の論拠を足す。② as artificial intelligence raises 〜 = 「AIが〜を生むにつれて/生む中で」の as(比例・状況)。artificial intelligence は不可算・無冠詞。raises が三単現。difficult moral questions は可算複数・無冠詞。③ society urgently needs = 主語 society(不可算・無冠詞・単数扱い)、urgently(切実に)が needs を修飾。④ people capable of 〜 = 形容詞句 capable of の後置修飾「〜できる人々」。capable of + 動名詞 judging。people は複数扱い。⑤ judging right from wrong = 「善悪を判断する」。tell/judge right from wrong の定型(A from B を区別する)。right / wrong は名詞化した形容詞で無冠詞。",
      "writing": "Moreover, as X raises difficult questions, society needs 〜 は「新事態→必要な人材/対応」を述べる型。as + [社会変化] で背景を従属節に圧縮し主節で主張。judge/tell right from wrong は「善悪を見分ける」の定型イディオム。capable of -ing の後置修飾は people/those を膨らませる汎用形。"
    },
    {
      "en": "For instance, debates over privacy and fairness demand exactly the reflective insight these subjects nurture.",
      "ja": "例えば、プライバシーや公平性をめぐる議論は、まさにこれらの科目が育てる省察的洞察を求めている。",
      "structure": "SVO。S=debates over privacy and fairness、V=demand、O=the reflective insight。these subjects nurture は insight を修飾する接触節(関係詞省略)。exactly は insight を強める副詞。",
      "grammar": "① For instance, = 具体例導入(既出)。② debates over privacy and fairness = debate は個別の論争として可算・複数(Day1 の不可算 debate と対照的に、ここは具体的な複数の論争)。over が「〜をめぐる」。privacy / fairness はともに不可算・無冠詞。③ demand = 「〜を要求する」(Day17 既出)。主語複数なので原形。④ exactly the reflective insight = exactly が「まさに」と the insight を強調。reflective(省察的な)+insight(洞察)は不可算・無冠詞だが関係詞で特定され the。⑤ (that) these subjects nurture = 目的格の関係代名詞が省略された接触節。nurture(育む)が cultivate/foster/develop に続く4つ目の「育てる」系動詞。⑥ these subjects = the Humanities の再々言い換え。",
      "writing": "For instance, debates over X and Y demand exactly the 〜 that 〜 は「今まさに必要とされている」と例で締める型。exactly the 〜 で「まさにその」と焦点を絞る強調。nurture も育成系動詞ローテに加えられる(cultivate/foster/develop/nurture の4枚)。関係詞を省いた接触節(the insight these subjects nurture)は口語的で引き締まる。"
    },
    {
      "en": "Admittedly, technical skills offer clearer career paths and higher starting salaries.",
      "ja": "確かに、技術系のスキルはより明確なキャリアと高い初任給を与える。",
      "structure": "SVO。S=technical skills、V=offer、O=clearer career paths and higher starting salaries(2つの名詞句の並列)。Admittedly が文修飾副詞。",
      "grammar": "① Admittedly, = 譲歩の文副詞(既出。この day も独立した譲歩段落で次文 Nevertheless と対)。② technical skills = 「技術系のスキル」。skill は可算・複数、technical が修飾。無冠詞複数の総称。③ offer = 「与える・提供する」。主語複数なので原形。④ clearer career paths and higher starting salaries = 比較級2連の並列。clearer(より明確な)+career paths(可算複数)、higher(より高い)+starting salaries(可算複数)。比較対象(than the Humanities)は自明で省略。starting salary は「初任給」の複合名詞。",
      "writing": "独立譲歩段落の1文目 Admittedly, [反対側の利点]。比較級を並べて(clearer ... higher ...)反対側の強みを具体的に一度認めると、次の Nevertheless の切り返しが効く。offer clearer paths / higher salaries は反対材料を「確かに魅力的」と正直に認める譲歩の具体化。"
    },
    {
      "en": "Nevertheless, the adaptable thinking gained from the Humanities often proves more durable over an entire career.",
      "ja": "それでもなお、人文学から得る柔軟な思考は、キャリア全体を通してしばしばより長持ちする。",
      "structure": "SVC。S=the adaptable thinking gained from the Humanities、V=proves、C=more durable。gained以下は thinking を後置修飾、over以下が範囲の副詞句。",
      "grammar": "① Nevertheless, = 譲歩の強い切り返し(Day19 既出)。② the adaptable thinking gained from the Humanities = the+形容詞 adaptable(柔軟な)+不可算 thinking。gained from 〜 は過去分詞の後置修飾(the thinking that is gained from ...)で特定され the。③ often proves = 三単現(主語 thinking は不可算単数扱い)。prove + 補語「〜だと分かる・結局〜である」の不完全自動詞用法(prove to be の to be 省略)。often が頻度。④ more durable = 比較級「より長持ちする」。反対側の一時的利点(salary)と対比。⑤ over an entire career = 「キャリア全体にわたって」。over が期間、an entire career は可算で an。",
      "writing": "Nevertheless, X often proves more durable/valuable は「長い目で見れば〜が勝る」と切り返す型。prove + 形容詞(prove to be の圧縮)は「結局〜だと分かる」を言う自動詞用法。over an entire career / in the long run は時間軸で反対材料を無効化する Day16 の on a global scale と同じ発想の締め。"
    },
    {
      "en": "In conclusion, by sharpening critical thinking, communication, and ethical judgment, the Humanities remain profoundly relevant.",
      "ja": "結論として、批判的思考、伝達力、倫理的判断を磨くことで、人文学は今なお深く意義を持つ。",
      "structure": "前置詞句+主節。by sharpening 〜 が手段の副詞句(目的語は3項並列)。主節=the Humanities remain profoundly relevant(SVC)。",
      "grammar": "① In conclusion, by -ing 〜 = 本論3点を動名詞の目的語3連で圧縮再掲する結論の型(Day16 の because it + 動詞句の by 版)。② by sharpening A, B, and C = by+動名詞「〜を磨くことで」。sharpen(研ぎ澄ます)が本論の cultivate/develop/foster を一語に束ねる。目的語3連=critical thinking / communication / ethical judgment(すべて不可算・無冠詞の抽象名詞)で本論トピックを再掲。③ the Humanities remain = 複数扱いで原形 remain。④ remain profoundly relevant = SVC「深く意義を保ったままである」。profoundly(深く)が relevant を強める。序論テーゼ retains great relevance を remain relevant と言い換えて締める。",
      "writing": "結論の再掲を「by + 動名詞3連 + 主節」で処理する型——In conclusion, by [動名詞A, B, and C], [主語] remain(s) 〜。Day16/17(because+節)、Day18(because of+名詞)、Day19(名詞3連 make ... SVOC)に続く第4の再掲パターン。remain relevant / remain profoundly relevant はテーゼ retains relevance の結論用言い換え。"
    },
    {
      "en": "Far from being obsolete, such education equips people to thrive in a rapidly changing world.",
      "ja": "時代遅れどころか、こうした教育は急速に変化する世界で人々が活躍する力を与えるのだ。",
      "structure": "前置詞句+主節。Far from being obsolete が譲歩的な副詞句。主節=such education equips people to thrive(SVOC)。in以下が場所の副詞句。",
      "grammar": "① Far from being obsolete = 「時代遅れどころか」。far from + 動名詞/形容詞「〜どころか全く〜でない」。序論の反対論(no longer worthwhile)を真っ向から否定して締める。obsolete(時代遅れの)は反対論のキーワードの言い換え。② such education = 「こうした教育」。such が the Humanities education を指示的に受ける。education は不可算・無冠詞。③ equips people to do = equip A to do「Aに〜する力を与える」。equip A with B の変形で、to不定詞を取る使役的用法。people は複数扱い。④ thrive = 自動詞「活躍する・栄える」(Day18 既出)。⑤ in a rapidly changing world = 副詞 rapidly が現在分詞 changing を修飾「急速に変化する世界」。a+単数で総称的。",
      "writing": "最終文の型 Far from being obsolete, such education equips people to thrive in 〜。Far from being + [反対論の語] で反対意見を最後に一蹴して余韻を残す締め(Day20 keyExpressions の Far from being 〜)。equip people to thrive / prepare people for 〜 は「〜する力を与える」を言う前向きな結論動詞。in a rapidly changing world は現代性を添える定番の締め句。"
    }
  ],
  "21": [
    {
      "en": "The decision to host the 2020 Summer Olympics has prompted lively debate about its value.",
      "ja": "2020年夏季五輪を開催するという決定は、その価値をめぐる活発な議論を呼んだ。",
      "structure": "SVO。S=The decision to host 〜(to不定詞が decision を修飾)、V=has prompted(現在完了)、O=lively debate。about its value は debate を修飾する前置詞句。",
      "grammar": "① The decision to host 〜 = 名詞+to不定詞の同格的修飾「〜するという決定」。decision / attempt / plan など意志・計画系の名詞は to不定詞で中身を示す。② has prompted = 現在完了。過去の決定の影響=議論が現在も続いていることを示す。単純過去 prompted だと「昔の話」で終わり、今も論争中のニュアンスが消える。③ lively debate = debate(議論全般)は不可算なので無冠詞(× a lively debates)。much debate と同じ扱い。④ its value の its = 開催の。所有格で「その価値」。⑤ the 2020 Summer Olympics = 固有の大会名なので the。オリンピックは常に the+複数形扱い。",
      "writing": "序論1文目のお題言い換えは The decision to [お題の動詞] has prompted lively debate about its value. がそのまま型になる。has sparked controversy でも可。お題を the decision to 〜 と名詞化して主語に置くと、コピペ感なく客観的に切り出せる。"
    },
    {
      "en": "Having weighed the arguments, I agree that Japan will benefit overall from staging this global event.",
      "ja": "論点を比較検討した結果、私は日本がこの世界的イベントの開催から全体として恩恵を受けると考える。",
      "structure": "完了形分詞構文 Having weighed 〜 + 主節SVO。S=I、V=agree、O=that節。that節内は Japan(S) will benefit(V) from staging 〜。",
      "grammar": "① Having weighed = 完了形の分詞構文。「比較検討した後で(その結果)」と主節より前の動作を示す。意味上の主語は主節の I と一致しており懸垂分詞にならない。② weigh the arguments = 賛否の論点を天秤にかける。天秤の比喩で outweigh と同系。③ agree that 〜 = that節を目的語に取る。agree with 人 / agree to 提案 と使い分け。④ will benefit from = 未来の利益の予測。benefit from は自動詞用法「〜から利益を得る」。⑤ staging = 前置詞 from の後なので動名詞。stage(動詞)=「(イベントを)開催する」で host の言い換え。⑥ this global event = the Olympics の言い換え+指示形容詞 this。同語反復を避ける1級の作法。",
      "writing": "Having weighed the arguments, I agree that 〜 は賛否型のテーゼ提示にそのまま使える。「考えた末の結論」感が出て、いきなり I think より説得力が上がる。お題の名詞は staging this global event のように動詞ごと言い換えて再登場させる。"
    },
    {
      "en": "First, the Olympics stimulate the economy.",
      "ja": "第一に、五輪は経済を刺激する。",
      "structure": "SVOの最短文。S=the Olympics、V=stimulate、O=the economy。First, が本論1の開始を告げる接続副詞。",
      "grammar": "① First, = 本論1のトピックセンテンスを開く定番。文頭+カンマ。② the Olympics = 大会名は常に the+複数扱い。だから動詞は stimulate と複数呼応(三単現の -s なし)。③ stimulate the economy = 「経済を刺激する」の鉄板コロケーション。the economy は「(その国の)経済」で文脈上特定されるため the。economy を無冠詞で裸のまま使わない。④ トピックセンテンスは短いSVOで言い切るのが型。詳細は次文以降に回す。",
      "writing": "本論の1文目は First, S+V+O. の短文で主張だけ言い切る。stimulate/boost the economy は経済メリット系の万能パーツ。長い文で始めず、短文→because→For instance の3段構成に乗せる。"
    },
    {
      "en": "This is largely because the influx of tourists boosts spending on hotels, restaurants, and transportation.",
      "ja": "これは主に、観光客の流入がホテル・飲食・交通への支出を押し上げるからだ。",
      "structure": "SVC。S=This(前文の主張)、V=is、C=because節。because節内は the influx of tourists(S) boosts(V) spending(O)。",
      "grammar": "① This is largely because 〜 = 前文の主張を受けて理由を述べる接続の型。largely で「主因はこれ」と限定し、断定しすぎを避ける。② the influx of tourists = of句で特定されるので the。influx=「流入」。単数扱いなので boosts に三単現の -s。③ spending = 動名詞由来の不可算名詞「支出」。spending on 〜 で対象を示す(on とセット)。④ hotels, restaurants, and transportation = A, B, and C の3項列挙。可算の hotels/restaurants は無冠詞複数(総称)、transportation は不可算で無冠詞。性質の違う名詞も並列できる。",
      "writing": "This is largely because 〜 はトピックセンテンス直後の理由文として全テーマで使い回せる。the influx of tourists は観光・移民・人口系の頻出パーツ。spending on A, B, and C の3項列挙で具体性を出す。"
    },
    {
      "en": "For instance, host cities often report a sharp rise in visitor numbers, which supports local businesses and creates jobs.",
      "ja": "例えば、開催都市はしばしば訪問者数の急増を報告し、それが地元企業を支え雇用を生む。",
      "structure": "SVO+非制限用法の関係詞節。S=host cities、V=report、O=a sharp rise in 〜。, which 以下は前の内容(訪問者急増)を先行詞として補足し、節内は supports と creates の並列。",
      "grammar": "① For instance, = For example の言い換え。具体例パートの開始合図。② host cities = 無冠詞複数の総称「開催都市というもの一般」。often+現在形 report で一般的傾向を表す。③ a sharp rise in 〜 = 「〜の急増」。rise は可算で初出なので a。増減の対象は in で示す(× rise of)。④ visitor numbers = 名詞+名詞の複合。the number of visitors の簡潔版。⑤ , which = 非制限用法の関係代名詞。先行詞は直前の名詞ではなく「訪問者数が急増すること」という前半の内容全体。単数扱いなので supports / creates に -s。⑥ create jobs = 「雇用を生む」の定番。jobs は可算複数。",
      "writing": "具体例は For instance, [一般的事実を現在形で], which [その帰結]. の2段構えが強い。a sharp rise in 〜 と , which supports 〜 and creates jobs は経済効果系の論題でそのまま流用できる。"
    },
    {
      "en": "Second, the Games accelerate infrastructure development.",
      "ja": "第二に、五輪はインフラ整備を加速させる。",
      "structure": "SVO。S=the Games、V=accelerate、O=infrastructure development。Second, が本論2の開始。",
      "grammar": "① Second, = 本論2の合図(First, の型は既出)。② the Games = the Olympics の言い換え。大文字の Games で「五輪」。複数扱いなので accelerate に -s なし。③ accelerate = speed up の格上げ動詞「加速させる」。④ infrastructure development = 名詞+名詞の複合で無冠詞。development(整備・発展)は抽象概念で不可算、infrastructure も不可算。",
      "writing": "本論2も短いSVOで開始(型は本論1と同じ)。accelerate 〜 development は「〜整備を加速する」で技術・都市・教育系に流用可。主語を the Games と言い換えて同語反復を避けるのも手本。"
    },
    {
      "en": "Moreover, the deadline pressures governments to modernize stadiums, railways, and public facilities.",
      "ja": "しかも、期限が政府にスタジアム・鉄道・公共施設の近代化を迫る。",
      "structure": "SVOC(SVO+to不定詞)。S=the deadline、V=pressures、O=governments、C=to modernize 〜。Moreover, で根拠を追加。",
      "grammar": "① Moreover, = 「しかも」。情報追加の接続副詞。本論内で2つ目の根拠を積む位置。② the deadline = 五輪開催という期限。文脈で特定されるので the。③ pressure O to do = 「Oに〜するよう圧力をかける」。force / require と同じ to不定詞型の使役系。名詞と同形の動詞用法で、三単現 -s は単数主語 the deadline に呼応。④ governments = 無冠詞複数の総称。⑤ modernize = -ize 動詞で make modern を1語化。⑥ stadiums, railways, and public facilities = 3項列挙(既出の型)。すべて可算複数。",
      "writing": "pressure/force/require + O + to do の使役系は「状況が人を動かす」構図を作る1級頻出パーツ。無生物主語 the deadline pressures 〜 のように「物が人に〜させる」と書くと一気に英語らしくなる。"
    },
    {
      "en": "For instance, improved transport networks built for the event continue to serve residents long after the closing ceremony.",
      "ja": "例えば、イベントのために整備された交通網は、閉会式のずっと後まで住民の役に立ち続ける。",
      "structure": "SVO。S=improved transport networks(built for the event が後置修飾)、V=continue、O=to serve residents。long after 〜 は時の副詞句。",
      "grammar": "① improved = 過去分詞の前置修飾「改良された」。② built for the event = 過去分詞の後置修飾。networks (that were) built 〜 の関係詞+be 省略で「イベントのために建設された網」。③ continue to do = 「〜し続ける」。to不定詞をとる。④ serve residents = 「住民の役に立つ」。residents は無冠詞複数(総称)。⑤ long after 〜 = 「〜のずっと後まで」。after の前に long を置いて期間を強調。⑥ the closing ceremony = 閉会式は大会に1つで特定されるので the。",
      "writing": "continue to serve 〜 long after ... は「一時イベントの長期レガシー」を語る決め型。過去分詞2連発(improved / built for)で名詞に情報を圧縮する書き方は、語数制限のある1級エッセイで有効。"
    },
    {
      "en": "Finally, hosting enhances national prestige.",
      "ja": "最後に、開催は国家の威信を高める。",
      "structure": "SVO。S=hosting(動名詞)、V=enhances、O=national prestige。Finally, が本論3の開始。",
      "grammar": "① Finally, = 本論3(最後の論点)の合図。② hosting = 動名詞1語が主語。「開催すること」。動名詞主語は単数扱い→ enhances に -s。目的語(the Games)は自明なので省き、引き締まった文にしている。③ enhance = improve の格上げ「(価値・質を)高める」。④ national prestige = 無冠詞。prestige(威信)は抽象概念で不可算(× a prestige)。",
      "writing": "動名詞1語主語+全3語の超短文はトピックセンテンスの理想形。enhance national prestige は国家イメージ系(五輪・万博・観光・文化輸出)の論題で丸ごと使える。"
    },
    {
      "en": "Furthermore, welcoming athletes and spectators from around the world strengthens international goodwill toward Japan.",
      "ja": "さらに、世界中の選手や観客を迎えることは、日本への国際的な好意を強める。",
      "structure": "SVO。S=welcoming 〜 the world(動名詞句)、V=strengthens、O=international goodwill。toward Japan が goodwill の向き先。",
      "grammar": "① Furthermore, = Moreover の言い換え。同一エッセイ内で接続副詞を変えて重複を避ける手本。② welcoming athletes and spectators 〜 = 動名詞句の主語。長い主語でも動名詞句は単数扱い→ strengthens。③ from around the world = 「世界中から」。前置詞2連続(from+around)がかたまりで機能。④ international goodwill = 無冠詞。goodwill(好意)は抽象名詞で不可算。⑤ toward Japan = 感情・態度の向き先は toward。",
      "writing": "動名詞句主語+strengthens 〜 は「〜することが…を強める」の因果を1文で言う型。international goodwill toward 〜 は外交・観光・国際系の論題で使える語彙。Moreover→Furthermore の乗り換えも真似る。"
    },
    {
      "en": "For instance, positive media coverage can attract future tourism and foreign investment for years to come.",
      "ja": "例えば、好意的な報道は、その後何年にもわたり将来の観光や外国投資を呼び込みうる。",
      "structure": "SVO。S=positive media coverage、V=can attract、O=future tourism and foreign investment(並列)。for years to come は期間の副詞句。",
      "grammar": "① For instance, は既出。② media coverage = 「メディア報道」。coverage は不可算→無冠詞。positive=「好意的な」。③ can attract = 可能性の can「呼び込みうる」。未検証の予測を述べるときの保険で、断定を避ける。④ tourism / investment はともに不可算で無冠詞。抽象的な経済活動を表す名詞は不可算が基本。⑤ for years to come = 「今後何年にもわたって」。to come が years を後置修飾する慣用句。",
      "writing": "can+動詞で「〜しうる」と控えめに予測する書き方は、根拠の弱い未来効果を語るときの防御術。for years to come は長期効果の締めにそのまま置ける。attract tourism and investment は経済波及の万能ペア。"
    },
    {
      "en": "Admittedly, the Olympics involve enormous costs and the risk of unused venues.",
      "ja": "確かに、五輪には莫大な費用と、使われない会場が出るリスクが伴う。",
      "structure": "SVO。S=the Olympics、V=involve、O=enormous costs and the risk of 〜(並列)。Admittedly, が譲歩段落の開始。",
      "grammar": "① Admittedly, = 「確かに」。反論を自分から認める譲歩段落の開幕副詞。1級エッセイは反対意見に一度触れるとバランス点が上がる。② involve = 「〜を伴う」。entail の平易版。the Olympics は複数扱いなので -s なし。③ enormous costs = 複数形。複数項目にわたる費用なので costs。④ the risk of unused venues = of句で特定されるので the。⑤ unused = un-+過去分詞の形容詞「使われない」。venue(会場)は可算で複数。",
      "writing": "譲歩段落は Admittedly, [反論の要約]. Nevertheless, [反駁]. の2文セットが最小構成。involve enormous costs and the risk of 〜 はコスト系の反論を1文に圧縮する型としてどのテーマにも流用できる。"
    },
    {
      "en": "Nevertheless, careful planning can repurpose these facilities, and the long-term gains generally outweigh the short-term expense.",
      "ja": "それでもなお、入念な計画でこうした施設を再利用でき、長期的な利益はおおむね短期的な出費を上回る。",
      "structure": "重文。前半=careful planning(S) can repurpose(V) these facilities(O)、and 後半=the long-term gains(S) outweigh(V) the short-term expense(O)。Nevertheless, が反駁の合図。",
      "grammar": "① Nevertheless, = 「それでもなお」。However より強い逆接で、譲歩を押し返す位置に置く。② careful planning = 無生物主語。planning は動名詞由来で不可算。「入念な計画が〜できる」と人を出さずに書く。③ repurpose = re-+purpose「転用する」。1級らしい語彙。④ these facilities = 前文の unused venues を指示形容詞で受ける言い換え。⑤ the long-term gains / the short-term expense = 対句。long-term と short-term、gains(可算複数)と expense(不可算)を対比。ハイフン付き複合形容詞。⑥ generally = outweigh を修飾し「おおむね」。断定を和らげる。⑦ outweigh = 利益がコストを上回る、の結論動詞(天秤の比喩)。",
      "writing": "the long-term gains generally outweigh the short-term expense は譲歩の締めの鉄板文で、ほぼ全テーマに貼れる。long-term vs short-term の対句で論理を視覚化し、generally を挟んで断定を避けるのも1級の作法。"
    },
    {
      "en": "In conclusion, through economic stimulus, lasting infrastructure, and heightened prestige, hosting the Games offers Japan substantial advantages.",
      "ja": "結論として、経済の刺激、長く残るインフラ、高まる威信を通じて、五輪開催は日本に大きな利点をもたらす。",
      "structure": "前置詞句(through A, B, and C)+SVOO。S=hosting the Games(動名詞句)、V=offers、O1=Japan、O2=substantial advantages。",
      "grammar": "① In conclusion, = 結論段落の開幕(無冠詞の慣用句)。② through A, B, and C = 本論3本の論点を名詞句で再列挙する型。economic stimulus(不可算)、lasting infrastructure(現在分詞形容詞+不可算)、heightened prestige(過去分詞形容詞+不可算)と、各論点を2語に圧縮。③ offers Japan substantial advantages = SVOO(offer 人 物)の第4文型。④ substantial = big の格上げ。advantages は可算で複数。⑤ hosting the Games = 序論の staging this global event、本論の hosting をまた別の形で回収。",
      "writing": "結論1文目は In conclusion, through [名詞句]×3, [主語の言い換え] offers 〜. で本論を10語前後に圧縮再掲する。各論点を「形容詞+名詞」2語に縮める練習は語数調整にも効く。"
    },
    {
      "en": "Despite the considerable costs, the nation stands to benefit overall from this opportunity.",
      "ja": "相当な費用にもかかわらず、日本はこの機会から全体として恩恵を受ける見込みだ。",
      "structure": "前置詞句 Despite 〜+SV。S=the nation、V=stands to benefit。overall は副詞、from this opportunity が benefit の相手。",
      "grammar": "① Despite+名詞 = 「〜にもかかわらず」。although+節の名詞版(× despite of)。② the considerable costs = 既出の費用を the で受ける。considerable=「相当な」。③ the nation = Japan の言い換え(結論での同語反復回避)。④ stand to do = 「〜する見込みである、〜しそうな立場にある」。stand to benefit/gain/lose が定番。will benefit より控えめで上品な未来予測。⑤ overall = 副詞「全体として」。部分的な損失を認めつつ総合ではプラス、という含み。⑥ this opportunity = お題(開催)の最終言い換え。",
      "writing": "最終文は Despite [反論の名詞化], [S] stands to benefit overall from 〜. が締めの型。stand to benefit は「断定しすぎない断定」として価値が高い。序論の benefit overall を最終文で回収するリング構成も真似たい。"
    }
  ],
  "22": [
    {
      "en": "Some commentators urge Japan to reconsider its long-standing alliance with the United States.",
      "ja": "一部の論者は、日本に対米の長年の同盟を再考するよう促す。",
      "structure": "SVOC(SVO+to不定詞)。S=Some commentators、V=urge、O=Japan、C=to reconsider 〜。",
      "grammar": "① Some commentators = some+複数名詞で「〜する人もいる」。反対意見を中立に紹介する序論の型。commentator=論者・解説者。② urge O to do = 「Oに〜するよう促す」。force / pressure と同じ to不定詞使役系。③ reconsider = re-+consider「再考する」。お題の rethink の言い換え。④ its = Japan's。国は it で受けるのが論述の標準。⑤ long-standing = ハイフン付き複合形容詞「長年の」。⑥ alliance with 〜 = 「〜との同盟」で with とセット。the United States は常に the+複数形の国名。",
      "writing": "序論1文目は Some commentators/critics urge [主体] to [お題の動詞]. で「世間の声」として提示する型。自分は次文で逆を張る前フリになる。urge O to do はそのまま流用可。"
    },
    {
      "en": "After careful reflection, I believe Japan should maintain this relationship rather than fundamentally rethink it.",
      "ja": "熟慮の末、私は日本がこの関係を根本的に見直すよりも維持すべきだと考える。",
      "structure": "前置詞句+SVO。S=I、V=believe、O=(that省略の)名詞節。節内は Japan(S) should maintain(V) this relationship(O)、rather than 以下が対比。",
      "grammar": "① After careful reflection, = 「熟慮の末」。reflection(熟考)は不可算・無冠詞。Having weighed 〜 型と同役割の前置詞句版。② believe (that) 〜 = 接続詞 that の省略。主節が短いときは省略が自然。③ should maintain = 提言の should。④ rather than fundamentally rethink = rather than の後は原形(should に続く maintain と並列のため)。「根本的に見直すのではなく維持する」。fundamentally は rethink を修飾する副詞。⑤ this relationship / it = alliance の言い換えと代名詞での受け直し。同語反復回避。",
      "writing": "テーゼは I believe [S] should [A] rather than [B]. の対比型が強い。お題の動詞(rethink)を rather than 側に置き、自分の提案(maintain)を主役にする構図は「見直すべきか」系論題全般で使える。"
    },
    {
      "en": "First, the alliance provides essential security.",
      "ja": "第一に、同盟は不可欠な安全保障を提供する。",
      "structure": "SVO。S=the alliance、V=provides、O=essential security。First, が本論1の開始。",
      "grammar": "① First, = 本論1のトピックセンテンスの合図。② the alliance = 序論で導入済みなので the。③ provides = 三単現の -s。④ essential security = security(安全保障)は不可算→無冠詞。essential=「不可欠な」で important の格上げ。",
      "writing": "本論トピックセンテンスは5語のSVOで言い切る。provide essential security は安全保障系論題の核パーツ。短文で主張→次文で理由、のリズムを崩さない。"
    },
    {
      "en": "This is largely because regional tensions and an unstable neighborhood pose a serious threat to Japan.",
      "ja": "これは主に、地域の緊張と不安定な近隣が日本に深刻な脅威をもたらすからだ。",
      "structure": "SVC(This is because 型)。because節内は複合主語(regional tensions and an unstable neighborhood)+pose(V)+a serious threat(O)。",
      "grammar": "① This is largely because 〜 = 理由提示の定番。largely で主因と限定。② regional tensions = 複数形。tension は「緊張状態」の意味で可算化し、複数の火種を指す。③ an unstable neighborhood = neighborhood を地政学的な「近隣地域」の意味で使い、初出なので an。④ 複合主語(A and B)なので pose は原形(複数呼応)。⑤ pose a threat to 〜 = 「〜に脅威をもたらす」の鉄板コロケーション。threat は可算で a、向き先は to。",
      "writing": "pose a serious threat to 〜 はリスク系論述の最頻出パーツ。抽象名詞を2つ並べた複合主語(A and B pose 〜)で原因を同時に載せる書き方も真似たい。"
    },
    {
      "en": "For instance, the American security guarantee deters potential aggressors that Japan could not realistically confront alone.",
      "ja": "例えば、米国の安全保障の保証は、日本が現実的に単独では対峙できない潜在的な侵略者を抑止する。",
      "structure": "SVO+関係詞節。S=the American security guarantee、V=deters、O=potential aggressors。that 以下は aggressors を修飾する制限用法の関係詞節。",
      "grammar": "① For instance, = 具体例の合図。② the American security guarantee = 日米同盟の文脈で1つに特定→the。security guarantee は名詞+名詞の複合。③ deters = deter「抑止する」。deterrence(抑止力)の動詞形で安全保障論の核語彙。三単現 -s。④ potential aggressors = 「潜在的な侵略者」。無冠詞複数の総称。⑤ that 〜 alone = 目的格の関係代名詞。confront の目的語が先行詞に出た形。⑥ could not realistically confront = 仮定法的な could「(仮に単独でやるとしても)現実的には対峙できないだろう」。realistically を挿入し、alone(単独で)を文末に置く。",
      "writing": "deter / confront / aggressor は安全保障トピックの語彙セットとして丸ごと覚える。that [S] could not realistically [V] alone = 「単独では現実的に無理」は同盟・協力の必要性を言う万能の関係詞節。"
    },
    {
      "en": "Second, the partnership brings significant economic benefits.",
      "ja": "第二に、この協力関係は大きな経済的利益をもたらす。",
      "structure": "SVO。S=the partnership、V=brings、O=significant economic benefits。Second, が本論2の開始。",
      "grammar": "① Second, = 本論2の合図(型は既出)。② the partnership = alliance の言い換え+既出なので the。③ brings = 三単現。④ significant economic benefits = benefit(利点)は可算で複数。significant は big の格上げ。形容詞2つで中身(経済面・規模)を予告。",
      "writing": "brings significant 〜 benefits は分野の形容詞を差し替えるだけでどの論題でも使えるメリット提示フレーム(economic / educational / environmental benefits)。主語の言い換え(alliance→partnership)も手本。"
    },
    {
      "en": "Moreover, the United States remains one of Japan's largest trading partners and a key source of investment.",
      "ja": "しかも、米国は依然として日本最大級の貿易相手であり、投資の重要な源だ。",
      "structure": "SVC。S=the United States、V=remains、C=one of 〜 partners and a key source(補語2つの並列)。",
      "grammar": "① Moreover, = 追加の接続副詞。② remains = 「依然として〜である」。be動詞の代わりに remain を使うと「今もなお」の継続ニュアンスが乗る。米国は単数扱いで -s。③ one of + 所有格 + 最上級 + 複数名詞 = 「最も〜なうちの1つ」。one of Japan's largest trading partners で partners が複数形になるのが鉄則(× one of the largest partner)。④ a key source of investment = 初出で a。source of 〜=「〜の源」。investment は不可算。",
      "writing": "remain one of the largest 〜 は現状の重要性を語る定番。one of+複数形のミスは頻出減点ポイントなのでこの文で型ごと覚える。a key source of 〜 も汎用性が高い。"
    },
    {
      "en": "For instance, close cooperation has supported stable supply chains and access to vital markets for decades.",
      "ja": "例えば、緊密な協力は何十年もの間、安定した供給網と重要市場へのアクセスを支えてきた。",
      "structure": "SVO。S=close cooperation、V=has supported、O=stable supply chains and access to 〜(並列)。for decades は期間の副詞句。",
      "grammar": "① For instance, は既出。② close cooperation = 不可算・無冠詞。close=「緊密な」。③ has supported ... for decades = 現在完了+期間の for。「何十年も支えてきた(今も)」の継続用法。歴史的継続を根拠にするなら現在完了一択。④ supply chains = 可算複数。複数産業の供給網。⑤ access to 〜 = 「〜へのアクセス」。不可算・無冠詞で、向き先は to。⑥ vital markets = vital は crucial / essential の言い換え。",
      "writing": "has+過去分詞+for decades は「長年の実績」を1文で示す型。access to vital markets は経済系の万能句。同義語(essential→vital)を段落ごとに替えて語彙力を見せる。"
    },
    {
      "en": "Finally, the two nations share fundamental values such as democracy and the rule of law.",
      "ja": "最後に、両国は民主主義や法の支配といった根本的な価値を共有している。",
      "structure": "SVO。S=the two nations、V=share、O=fundamental values。such as 以下が values の例示。Finally, が本論3の開始。",
      "grammar": "① Finally, = 本論3の合図。② the two nations = 文脈で日米に特定→the。③ share fundamental values = 「根本的価値を共有する」。「価値観」の意味では values と必ず複数形。単数 value は「価値(の度合い)」。④ such as A and B = 例示の後置。for example より軽く名詞に直結できる。⑤ democracy = 理念なので無冠詞・不可算。⑥ the rule of law = 「法の支配」は of句で特定される固定句で the。",
      "writing": "share fundamental values such as 〜 は国際関係・組織論の頻出型。such as で例を2つ添えると抽象語(values)が採点者に具体的に伝わる。values の複数形と the rule of law の the はこのまま暗記。"
    },
    {
      "en": "Furthermore, this common ground enables them to coordinate on global issues ranging from trade rules to climate policy.",
      "ja": "さらに、この共通基盤により、貿易ルールから気候政策に至る世界的課題で協調できる。",
      "structure": "SVOC。S=this common ground、V=enables、O=them、C=to coordinate 〜。ranging from A to B は issues を後置修飾する現在分詞句。",
      "grammar": "① Furthermore, = 追加(Moreover の言い換え)。② this common ground = 前文の「価値の共有」を this+抽象名詞(共通の土台という比喩)で受ける。ground はここでは不可算。③ enable O to do = 「Oが〜するのを可能にする」。無生物主語と相性抜群の使役系。④ coordinate on 〜 = 「〜について協調する」。自動詞+on。⑤ ranging from A to B = 現在分詞の後置修飾「AからBに及ぶ」。issues (which range) from ... の分詞化。範囲提示の決め型。⑥ trade rules(可算複数)と climate policy(不可算)の混在並列。",
      "writing": "enable O to do と ranging from A to B は1級エッセイの2大こなれパーツ。「前文の内容を this+抽象名詞で受けて次の主語にする」連結術(this common ground)は段落に流れを作る必修テク。"
    },
    {
      "en": "For instance, joint diplomatic efforts carry far greater weight than either country could achieve in isolation.",
      "ja": "例えば、共同の外交努力は、どちらの国も単独では実現できないはるかに大きな影響力を持つ。",
      "structure": "SVO+比較。S=joint diplomatic efforts、V=carry、O=far greater weight。than 以下は比較節(either country could achieve)。",
      "grammar": "① For instance, は既出。② joint diplomatic efforts = effort は「取り組み」の意味で可算・複数が普通。joint=共同の。③ carry weight = 「重みを持つ=影響力がある」の慣用句。weight は不可算。④ far greater 〜 than ... = 比較級を far で強調「はるかに大きい」。⑤ either country = 「どちらの国も(単独では)」。either+単数名詞。否定的文脈で「いずれの一方でも〜ない」。⑥ could achieve = 仮定法的 could「(単独でやったとしても)達成できるであろう(それを超える)」。⑦ in isolation = 「単独で」。alone の格上げ。",
      "writing": "carry far greater weight than 〜 は協力・連携の優位を言う決め文。than either country could achieve in isolation は「単独では無理」系の万能比較節。far+比較級の強調も忘れず入れる。"
    },
    {
      "en": "Admittedly, the relationship is not without friction, particularly over the basing of troops.",
      "ja": "確かに、特に米軍の駐留をめぐって、この関係に摩擦がないわけではない。",
      "structure": "SVC。S=the relationship、V=is、C=not without friction(二重否定)。particularly over 〜 は争点を示す補足の前置詞句。",
      "grammar": "① Admittedly, = 譲歩段落の開幕副詞。② not without friction = 二重否定=控えめな肯定「摩擦がないわけではない」。There is some friction より上品で、認める度合いを最小化できる。friction(摩擦)は不可算。③ particularly over 〜 = 「特に〜をめぐって」。争点・対立の対象を示す over。④ the basing of troops = the+動名詞+of の重厚な名詞化「軍隊の駐留」。troops は「軍隊」の意味で常に複数形。",
      "writing": "is not without 〜 は反論を認めつつ最小限に見せる高等譲歩術(not without problems / not without risks)。the+-ing+of の名詞化と合わせて、譲歩段落の格を上げるパーツとして流用したい。"
    },
    {
      "en": "Nevertheless, such disputes can be managed through dialogue without discarding the alliance itself.",
      "ja": "それでもなお、こうした対立は同盟そのものを捨てずとも対話を通じて管理できる。",
      "structure": "SV(助動詞+受動)。S=such disputes、V=can be managed。through dialogue と without discarding 〜 が手段・条件の副詞句。",
      "grammar": "① Nevertheless, = 反駁の合図。② such disputes = 前文の friction を such+可算複数で受ける言い換え。③ can be managed = 助動詞+受動態「管理されうる」。管理する主体(両政府)をぼかして一般論化。④ through dialogue = 手段の through。dialogue は不可算・無冠詞。⑤ without discarding = 前置詞+動名詞「〜を捨てることなく」。discard=捨てる。⑥ the alliance itself = 再帰代名詞の強調用法「同盟そのもの」。枝葉の問題と本体の存続を切り分ける。",
      "writing": "can be managed through dialogue without -ing は「問題はあるが制度は守れる」の万能反駁文。X itself で「部分の問題」と「本体」を切り分けるレトリックは、制度擁護系の論題全般で効く。"
    },
    {
      "en": "In conclusion, given its contributions to security, prosperity, and shared values, the alliance remains in Japan's interest.",
      "ja": "結論として、安全保障、繁栄、共有する価値への貢献を踏まえると、同盟は日本の利益にかなう。",
      "structure": "In conclusion+given句+SVC。S=the alliance、V=remains、C=in Japan's interest(前置詞句が補語)。",
      "grammar": "① In conclusion, = 結論の合図。② given+名詞 = 「〜を踏まえると」。considering の1語版で、本論の再列挙を導く前置詞。③ its contributions to A, B, and C = 3論点の圧縮再掲。contribution to(〜への貢献)は to とセット、複数の貢献なので複数形。④ security / prosperity は不可算、shared values は可算複数と、性質の違う3項の並列。⑤ remains in Japan's interest = in one's interest=「〜の利益になる」の慣用句。remain で継続を示す(本論の remains と同じ動詞の使い方)。",
      "writing": "In conclusion, given its contributions to A, B, and C, 〜 は本論3本を1行で回収する結論の型。in one's interest は「〜すべきだ」を利益の言葉で言い換える上級表現としてそのまま使える。"
    },
    {
      "en": "Rather than abandoning this partnership, Japan should work to strengthen it.",
      "ja": "この協力関係を放棄するのではなく、日本はそれを強化するよう努めるべきだ。",
      "structure": "Rather than+動名詞句(文頭)+SV。S=Japan、V=should work、to strengthen it が目的の不定詞。",
      "grammar": "① Rather than+動名詞 = 文頭に出した「〜するのではなく」。文中で動詞原形と並列する場合(maintain 〜 rather than rethink)と違い、文頭では -ing が標準。② abandoning this partnership = discard(前段落)の言い換えに abandon を使う同語反復回避。③ should work to do = 「〜するよう努めるべきだ」。should strengthen と言い切るより現実的で控えめな提言。④ it = this partnership の代名詞回収。",
      "writing": "最終文は Rather than [相手案の動名詞], [S] should work to [自分の提言]. の対比締めが強力。序論の maintain rather than rethink と呼応させ、リング構成で終える手本。"
    }
  ],
  "23": [
    {
      "en": "Freedom of speech is rightly regarded as a cornerstone of democracy.",
      "ja": "言論の自由は、当然ながら民主主義の礎とみなされている。",
      "structure": "SV(受動)。S=Freedom of speech、V=is regarded、as a cornerstone of democracy が補語相当。rightly は挿入の副詞。",
      "grammar": "① Freedom of speech = 無冠詞・不可算の抽象概念。freedom は「〜の自由」で of を取る(freedom of expression / of the press)。② is regarded as 〜 = regard A as B の受動態「〜とみなされている」。世間の一般的評価を、みなす主体をぼかして述べる。③ rightly = 「当然のことながら、正当にも」。be動詞と過去分詞の間に挿入し「そうみなされるのは正しい」と書き手の評価を1語で追加。この1語が次文の逆張りへの布石になる。④ a cornerstone of 〜 = 「〜の礎(の1つ)」の比喩。複数ある礎の1つなので a。democracy は無冠詞・不可算。",
      "writing": "序論1文目で「原則の重要性」を is rightly regarded as a cornerstone of 〜 で立ててから、Even so で制限を論じる構成は「自由 vs 規制」系論題の王道テンプレ。rightly を入れて敵に塩を送るのが上級の礼儀。"
    },
    {
      "en": "Even so, I am convinced that restrictions on this freedom can, in certain circumstances, be justified.",
      "ja": "とはいえ私は、この自由への制限が特定の状況下では正当化されうると確信している。",
      "structure": "SVC+that節。S=I、V=am convinced、that節内は restrictions on this freedom(S)+can be justified(助動詞+受動)。in certain circumstances は can と be の間の挿入句。",
      "grammar": "① Even so, = 「たとえそうでも」。前文を丸ごと認めた上でひっくり返す転換の接続副詞。However より譲歩の含みが強い。② am convinced that 〜 = believe の格上げ「確信している」。③ restrictions on 〜 = 「〜への制限」。restriction は可算・複数、対象は on で示す。④ can, in certain circumstances, be justified = 助動詞と be の間にコンマで条件句を割り込ませる挿入。「常にではなく特定状況で」と主張の射程を自分から限定する精密な書き方。⑤ be justified = 助動詞+受動態「正当化されうる」。正当化する主体をぼかす。",
      "writing": "Even so, I am convinced that 〜 は「原則は認める、だが例外はある」型のテーゼに最適。can, in certain circumstances, be justified の挿入は主張を狭く強くする1級テクとして丸ごと流用できる。"
    },
    {
      "en": "First, limits are necessary to prevent direct harm.",
      "ja": "第一に、直接的な危害を防ぐために制限が必要だ。",
      "structure": "SVC。S=limits、V=are、C=necessary。to prevent 〜 は目的の to不定詞。First, が本論1の開始。",
      "grammar": "① First, = 本論1のトピックセンテンスの合図。② limits = restrictions の言い換え。無冠詞複数の総称。③ are necessary to do = 「〜するために必要だ」。necessary の後の to不定詞は目的・用途を示す。④ prevent direct harm = 「直接的な危害を防ぐ」。harm は不可算・無冠詞。",
      "writing": "[手段] are necessary to prevent [害]. は規制擁護のトピックセンテンスの型。limits / restrictions / controls / regulation と言い換えの手札を持っておくと同語反復を避けられる。"
    },
    {
      "en": "This is largely because speech that incites violence can endanger innocent lives.",
      "ja": "これは主に、暴力を扇動する言論が罪のない命を危険にさらしうるからだ。",
      "structure": "SVC(This is because 型)。because節内は speech(S・that incites violence の関係詞節付き)+can endanger(V)+innocent lives(O)。",
      "grammar": "① This is largely because 〜 = 理由提示の定番。② speech that incites violence = 主格の関係代名詞 that。speech は「言論」の意味で不可算、単数扱いなので incites に -s。関係詞節で対象を「暴力を扇動する言論」だけに精密に絞っている。③ incite violence = 「暴力を扇動する」。incite は「(悪事を)けしかける」で言論規制論の核語彙。violence は不可算。④ can endanger = 可能性の can「危険にさらしうる」。⑤ innocent lives = life の複数形 lives。「(複数の)命」は可算。innocent=罪のない。",
      "writing": "speech that incites violence / endanger innocent lives は言論・安全系論題のキー語彙。「S that 〜 can+害の動詞」の関係詞付き主語は、規制対象を精密に限定して主張を守る型として必修。"
    },
    {
      "en": "For instance, calls to attack a particular group have historically triggered riots and even massacres, which no responsible society should tolerate.",
      "ja": "例えば、特定の集団への攻撃を呼びかける言葉は歴史的に暴動や虐殺さえ引き起こしてきた。責任ある社会がそれを容認すべきではない。",
      "structure": "SVO+非制限関係詞節。S=calls to attack 〜、V=have triggered、O=riots and even massacres。, which 以下は前の内容を受け、which は tolerate の目的語。",
      "grammar": "① For instance, = 具体例の合図。② calls to attack 〜 = 名詞 call+to不定詞「〜せよという呼びかけ」。同格の to不定詞の型。複数の事例を指すので calls。③ a particular group = 「ある特定の集団」。特定だが読み手には未特定なので a。④ have historically triggered = 現在完了+historically「歴史上(繰り返し)引き起こしてきた」。副詞は have と過去分詞の間。⑤ even massacres = even で程度の上限を追加「虐殺さえ」。riot(暴動)・massacre(虐殺)ともに可算複数。⑥ , which no responsible society should tolerate = 非制限用法。which は tolerate の目的語。no+単数名詞を主語に置く強い全否定「容認すべき責任ある社会は存在しない」。",
      "writing": "have historically triggered 〜 は歴史を証拠に使う具体例の型。締めの , which no responsible society should tolerate は「これは論外だ」を上品に言う万能の関係詞節で、悪弊を挙げた直後にそのまま貼れる。"
    },
    {
      "en": "Second, restrictions protect individual dignity.",
      "ja": "第二に、制限は個人の尊厳を守る。",
      "structure": "SVO。S=restrictions、V=protect、O=individual dignity。Second, が本論2の開始。",
      "grammar": "① Second, = 本論2の合図(型は既出)。② restrictions = 無冠詞複数の総称。複数呼応で protect に -s なし。③ individual dignity = dignity(尊厳)は不可算・無冠詞。individual=「個人の」。",
      "writing": "4語の骨格で言い切るトピック文。protect individual dignity は人権系論題の核パーツ。本論2も「短文宣言→理由→例」の3段リズムに乗せる。"
    },
    {
      "en": "Moreover, hate speech and slander can inflict lasting psychological damage on vulnerable people.",
      "ja": "しかも、ヘイトスピーチや中傷は弱い立場の人々に長く続く心理的損害を与えうる。",
      "structure": "SVO。S=hate speech and slander(複合主語)、V=can inflict、O=lasting psychological damage。on vulnerable people が被害の向き先。",
      "grammar": "① Moreover, = 追加の接続副詞。② hate speech / slander = ともに不可算・無冠詞。slander=「(口頭の)中傷」。書面なら libel。③ inflict A on B = 「A(害・苦痛)をBに与える」。inflict damage/pain/suffering on が定番で、on を落とさない。④ lasting = 現在分詞由来の形容詞「長く続く」。⑤ psychological damage = damage は不可算(× damages。複数形にすると「損害賠償金」の法律用語に化ける)。⑥ vulnerable people = 「弱い立場の人々」。vulnerable は1級最頻出級の形容詞。",
      "writing": "inflict lasting damage on 〜 は害を語る動詞の最上級パーツ。damage 不可算は頻出減点点なのでここで固める。vulnerable people は社会的弱者を指す万能語として必ず手札に入れる。"
    },
    {
      "en": "For instance, relentless online abuse has driven some victims to despair, demonstrating that unlimited speech can cause genuine suffering.",
      "ja": "例えば、執拗なネット上の中傷が一部の被害者を絶望に追い込んでおり、無制限の言論が本当の苦しみを生みうることを示している。",
      "structure": "SVO+到達点+分詞構文。S=relentless online abuse、V=has driven、O=some victims、to despair が到達点。, demonstrating that 〜 は結果を述べる分詞構文。",
      "grammar": "① For instance, は既出。② relentless online abuse = abuse(中傷・虐待)は不可算。relentless=「執拗な」。③ drive O to 〜 = 「Oを〜(という状態)に追い込む」。drive someone to despair が定番。この to は前置詞で despair は名詞。④ has driven = 現在完了。近年の事実を現在に接続する。⑤ , demonstrating that 〜 = 分詞構文(結果・補足)「〜ということを示している」。and this demonstrates that の圧縮形で、前文全体が意味上の主語。⑥ genuine suffering = 不可算。genuine=「本物の」で real の格上げ。",
      "writing": "文末の , demonstrating that 〜 は「例→その例が何を証明するか」を1文で繋ぐ1級の最重要テク。具体例のあとに毎回貼れる(, showing that / , proving that も可)。drive O to despair も感情的被害の決め表現。"
    },
    {
      "en": "Finally, certain limits safeguard public order and security.",
      "ja": "最後に、一定の制限は公の秩序と安全を守る。",
      "structure": "SVO。S=certain limits、V=safeguard、O=public order and security。Finally, が本論3の開始。",
      "grammar": "① Finally, = 本論3の合図。② certain limits = 「一定の制限」。certain=「(全部ではなく)特定の」で主張の射程を限定。序論の in certain circumstances と呼応する。③ safeguard = protect の格上げ動詞。④ public order and security = ともに不可算・無冠詞のペア「公の秩序と安全」。",
      "writing": "certain を付けて主張を限定する癖(certain limits / in certain cases)は反論を先回りで潰す1級の知恵。safeguard public order は治安・規制系の核パーツ。"
    },
    {
      "en": "Furthermore, the spread of dangerous misinformation can endanger the entire community.",
      "ja": "さらに、危険な誤情報の拡散は社会全体を危険にさらしうる。",
      "structure": "SVO。S=the spread of dangerous misinformation、V=can endanger、O=the entire community。",
      "grammar": "① Furthermore, = 追加(Moreover と交互に使い分け)。② the spread of 〜 = 「〜の拡散」。動詞 spread の名詞用法で、of句で特定→the。③ misinformation = mis-+information「誤情報」。不可算。意図的な偽情報 disinformation との使い分けも知っておく。④ can endanger = 可能性の can(本論1と同型なので簡潔に)。⑤ the entire community = 「共同体全体」。entire が「丸ごと」を強調し、話題の共同体を指すので the。",
      "writing": "the spread of misinformation は情報・SNS系論題の最頻出主語。「行為の名詞化(the spread of / the rise of / the loss of)を主語に置く」書き方は英語論述の背骨なので、この文で型として覚える。"
    },
    {
      "en": "For instance, false rumors during a crisis may trigger panic, making reasonable controls a matter of public safety.",
      "ja": "例えば、危機時の偽情報はパニックを招きかねず、合理的な統制を公共の安全の問題にする。",
      "structure": "SVO+分詞構文(第5文型)。S=false rumors、V=may trigger、O=panic。, making 以下は結果の分詞構文で、making(V) reasonable controls(O) a matter of public safety(C)。",
      "grammar": "① For instance, は既出。② false rumors = rumor(うわさ)は可算で複数。false=虚偽の。③ during a crisis = 「危機の間」。任意の危機なので a。④ may trigger = may で可能性(can よりさらに控えめ)。trigger=「引き金を引く=誘発する」。⑤ panic = 不可算・無冠詞。⑥ , making O C = 分詞構文の中に make の第5文型を入れた形「〜を…にしてしまう」。⑦ a matter of 〜 = 「〜の問題」。論点を格上げする慣用句(a matter of public safety=これは安全の問題だ)。",
      "writing": "文末分詞構文の第2弾(前は demonstrating、今回は making O C)。, making X a matter of Y は論点を再定義する強力な締めで、a matter of national security / life and death と応用が利く。"
    },
    {
      "en": "Admittedly, governments can abuse such restrictions to silence legitimate criticism.",
      "ja": "確かに、政府は正当な批判を封じるためにこうした制限を悪用しうる。",
      "structure": "SVO。S=governments、V=can abuse、O=such restrictions。to silence 〜 は目的の to不定詞。Admittedly, が譲歩段落の開始。",
      "grammar": "① Admittedly, = 譲歩段落の開幕副詞。② governments = 無冠詞複数の総称。③ abuse = 動詞「悪用する」。本論2の名詞 abuse(中傷)と同綴り異用法。④ such restrictions = 既出の restrictions を such で受ける。⑤ to silence = 目的の不定詞。silence の動詞用法「黙らせる」。⑥ legitimate criticism = criticism(批判)は不可算。legitimate=「正当な」。",
      "writing": "譲歩では反対派の一番強いカード(権力の悪用)を自分から出すと誠実さが出る。abuse 〜 to silence legitimate criticism は権力・規制系論題で頻出の反論パーツとしてそのまま使える。"
    },
    {
      "en": "Nevertheless, this risk argues for careful, narrowly defined limits rather than for abandoning all regulation.",
      "ja": "それでもなお、このリスクはすべての規制を捨てる理由ではなく、慎重で狭く定義された制限を支持する理由になる。",
      "structure": "SV+前置詞句。S=this risk、V=argues for、対象=careful, narrowly defined limits。rather than for 〜 が対比の並列。",
      "grammar": "① Nevertheless, = 反駁の合図。② this risk = 前文の悪用リスクを指示形容詞で受ける。③ argue for 〜 = 「〜を支持する論拠になる」。無生物主語で「このリスク自体が〜を支持する」と、反論を自説の燃料に変える高等レトリック。④ careful, narrowly defined limits = 形容詞のコンマ並列+副詞+過去分詞(narrowly defined=狭く定義された)の複合修飾。⑤ rather than for -ing = 前置詞 for を繰り返して並列を明示(argues for A rather than for B)。for の後なので動名詞 abandoning。⑥ all regulation = regulation は「規制(制度全般)」の意味で不可算。",
      "writing": "[反論のリスク] argues for [より慎重な自説] rather than for [極端な代案]. は反論を逆手に取る最上級の返し技。「悪用の危険→だから全廃ではなく厳密な設計を」の論法は規制系論題全般に移植できる。"
    },
    {
      "en": "In conclusion, in order to prevent harm, protect dignity, and preserve public order, restrictions on speech can indeed be justified.",
      "ja": "結論として、危害を防ぎ、尊厳を守り、公の秩序を保つために、言論への制限は確かに正当化されうる。",
      "structure": "In conclusion+目的句(in order to+動詞3並列)+SV(助動詞受動)。S=restrictions on speech、V=can be justified。indeed は強調の副詞。",
      "grammar": "① In conclusion, = 結論段落の合図。② in order to A, B, and C = 目的の不定詞で本論3本を動詞句のまま再列挙(prevent harm / protect dignity / preserve public order)。to は1回で動詞3つを並べる。③ prevent / protect / preserve = 頭音を揃えた列挙でリズムを出す。④ can indeed be justified = 序論の can be justified を indeed(実際に、確かに)で強めて回収。助動詞と be の間に副詞を挿入する位置も序論と同型。",
      "writing": "結論は in order to [本論1の動詞句], [本論2], and [本論3] で3論点を動詞句のまま回収できる(名詞句列挙の through 型と並ぶもう一つの型)。序論のキー表現を indeed 付きで再登場させるリング構成は満点答案の作法。"
    },
    {
      "en": "While free expression deserves strong protection, it cannot be entirely without limits.",
      "ja": "自由な表現は強く保護されるべきだが、まったく無制限ではありえない。",
      "structure": "While譲歩節+主節。従属節=free expression(S) deserves(V) strong protection(O)、主節=it(S) cannot be(V) entirely without limits。",
      "grammar": "① While 〜, = 譲歩「〜ではあるが」。最終文でもう一度だけ原則の重要性を認めてから締める。② free expression = freedom of speech の言い換え。不可算・無冠詞。③ deserves = 「〜に値する」。三単現。deserve protection/attention/consideration が定番の目的語。④ cannot be entirely without limits = without(否定)+cannot の二重否定に entirely を絡めた表現「完全に無制限ではありえない」。entirely が否定のスコープに入り「全部が無制限、はない」という精密な部分否定になる。",
      "writing": "最終文は While [原則の尊重], it cannot be entirely without limits. の型で「絶対自由はない」と締める。deserve strong protection と cannot be entirely without 〜 は自由 vs 規制系の結論でそのまま使える対のパーツ。"
    }
  ],
  "24": [
    {
      "en": "Capital punishment remains a deeply divisive issue in Japan.",
      "ja": "死刑は日本で依然として深く意見の分かれる問題だ。",
      "structure": "SVC。S=Capital punishment、V=remains、C=a deeply divisive issue。in Japan は場所の副詞句。",
      "grammar": "① Capital punishment = 「死刑(という刑罰制度)」。制度の総称で不可算・無冠詞。the death penalty との言い換えペアで覚える。② remains = 「依然として〜のままだ」。be より継続の含みが強い。三単現の -s。③ a deeply divisive issue = issue は可算で初出の a。divisive=「意見を二分する」。副詞 deeply が形容詞 divisive を修飾する「副詞+形容詞+名詞」の語順。",
      "writing": "[お題の言い換え] remains a deeply divisive issue. は賛否が割れる論題すべての序論1文目に使える汎用文。controversial より divisive の方が「世論が割れている」の情報量が多い。"
    },
    {
      "en": "After weighing the evidence, I am convinced that the death penalty should be abolished.",
      "ja": "証拠を比較検討した結果、私は死刑は廃止すべきだと確信している。",
      "structure": "前置詞+動名詞句+SVC+that節。that節内は the death penalty(S)+should be abolished(助動詞+受動)。",
      "grammar": "① After weighing 〜 = 前置詞 after+動名詞「〜を比較検討した後で」。完了分詞構文 Having weighed 〜 と同義の別形。② the evidence = この問題に関する証拠で特定→the。evidence は不可算(× evidences)。③ am convinced that = believe の格上げ「確信している」。④ the death penalty = penalty(刑罰)は可算だが「死刑という制度」は1つに特定される制度名なので the。capital punishment(無冠詞)との冠詞の違いに注意。⑤ should be abolished = 提言の should+受動態。廃止する主体(国会)を出さず制度の是非だけを論じる。",
      "writing": "After weighing the evidence, I am convinced that 〜 should be abolished/introduced. は政策提言型テーゼの型。「お題が制度なら受動態で提言する」と覚えると主語選びに迷わない。"
    },
    {
      "en": "First, the risk of executing an innocent person is unacceptable.",
      "ja": "第一に、無実の人を処刑する危険は容認できない。",
      "structure": "SVC。S=the risk of executing 〜、V=is、C=unacceptable。First, が本論1の開始。",
      "grammar": "① First, = 本論1のトピックセンテンスの合図。② the risk of -ing = 「〜する危険」。of句で特定→the。前置詞 of の後は動名詞 executing。③ an innocent person = 「無実の人一人」。不特定の一人なので an。単数にすることで「一人でも起きれば駄目だ」という論旨を冠詞レベルで支えている。④ unacceptable = un-+accept+-able「容認できない」。強い評価形容詞1語で言い切るトピック文。",
      "writing": "The risk of -ing ... is unacceptable. は「万一が許されない」系の主張(死刑・原発・医療)の型。an innocent person と単数にして「一人でもアウト」を含意させる冠詞術まで真似たい。"
    },
    {
      "en": "This is largely because no judicial system is immune to error.",
      "ja": "これは主に、誤りを免れる司法制度など存在しないからだ。",
      "structure": "SVC(This is because 型)。because節内は no judicial system(S)+is(V)+immune to error(C)。",
      "grammar": "① This is largely because 〜 = 理由提示の定番の型。② no+単数名詞 = 「いかなる〜も…ない」。not any より格調高い全否定。no judicial system is 〜 で「誤らない司法制度は存在しない」。③ be immune to 〜 = 「〜を免れている」。免疫(immunity)の比喩で、to とセット。④ error = 「誤りというもの」全般で不可算・無冠詞。an error なら個別の一件。",
      "writing": "No [system/institution] is immune to error. は「完璧な制度はない」を言う最上品の1文で、冤罪・事故・AI過信などあらゆる論題に貼れる。no+単数主語の全否定は強い断定を短く書ける武器。"
    },
    {
      "en": "For instance, several convictions in Japan have later been overturned, and an execution, unlike imprisonment, can never be reversed once carried out.",
      "ja": "例えば、日本でもいくつかの有罪判決が後に覆っており、処刑は投獄と違い、一度執行すれば決して取り返せない。",
      "structure": "重文。前半=several convictions(S)+have been overturned(現在完了受動)。後半=an execution(S)+can never be reversed(助動詞受動)、unlike imprisonment は挿入、once carried out は接続詞+過去分詞の省略節。",
      "grammar": "① For instance, = 具体例の合図。② several convictions = conviction(有罪判決)は可算・複数。③ have later been overturned = 現在完了の受動態。「後に覆された(という実績が現在まである)」。later は have と been の間。overturn=「(判決を)覆す」。④ an execution = 「一件の処刑」。可算の総称単数で「処刑というものは一件たりとも」。⑤ unlike imprisonment = unlike+名詞の対比挿入「投獄と違って」。imprisonment は不可算。⑥ can never be reversed = 助動詞+never+受動「決して取り消せない」。⑦ once carried out = once (it is) carried out の省略。接続詞 once+過去分詞で条件節を3語に圧縮。carry out=執行する。",
      "writing": "unlike 〜 の挿入対比と once+過去分詞の省略節は、1文に情報を圧縮する1級テクの見本。can never be reversed once carried out は不可逆性を語る決めフレーズで、環境破壊・種の絶滅にも転用できる。"
    },
    {
      "en": "Second, the death penalty does not reliably deter crime.",
      "ja": "第二に、死刑は確実に犯罪を抑止するわけではない。",
      "structure": "SVO(否定)。S=the death penalty、V=does not deter、O=crime。reliably が動詞を修飾。Second, が本論2の開始。",
      "grammar": "① Second, = 本論2の合図(型は既出)。② does not reliably deter = reliably(確実に)を否定のスコープに入れた精密な否定。「まったく抑止しない」ではなく「確実に抑止するとは言えない」なので、反証されにくい。③ deter crime = 「犯罪を抑止する」。deter は刑罰・安全保障論の核動詞(名詞形 deterrence)。crime は総称で不可算・無冠詞。a crime なら個別の犯罪。",
      "writing": "does not reliably [V] は「効果が証明されていない」と言う精密否定の型。全否定(never works)は反例1つで崩れるが、reliably を挟めば守りが固い。統計で殴り合う本論の入口に最適。"
    },
    {
      "en": "Moreover, studies comparing regions with and without capital punishment reveal no clear difference in murder rates.",
      "ja": "しかも、死刑のある地域とない地域を比較した研究は、殺人発生率に明確な差を示していない。",
      "structure": "SVO。S=studies(comparing 〜 が現在分詞の後置修飾)、V=reveal、O=no clear difference。in murder rates が difference の対象。",
      "grammar": "① Moreover, = 追加の接続副詞。② studies comparing 〜 = 現在分詞の後置修飾。studies (which compare) ... の圧縮で「〜を比較した研究」。studies は無冠詞複数(研究一般)。③ with and without 〜 = 前置詞の並列「〜がある地域とない地域」。対照群を regions with and without capital punishment の7語で表す圧縮術。④ reveal no clear difference = 動詞でなく目的語に no を付ける名詞否定。do not reveal より引き締まる。⑤ difference in 〜 = 差の対象は in。⑥ murder rates = 「殺人発生率」。複数地域の率なので複数形。",
      "writing": "Studies comparing A and B reveal no clear difference in 〜 は「データで通説を崩す」万能文としてこのまま暗記。目的語に no を入れる否定(reveal no difference / see no surge)は否定文を上品にする技。"
    },
    {
      "en": "For instance, many countries that have abolished it have not seen any surge in violent crime, which undermines the deterrence argument.",
      "ja": "例えば、廃止した多くの国で凶悪犯罪の急増は見られておらず、抑止力の議論を弱めている。",
      "structure": "SVO+非制限関係詞節。S=many countries(that have abolished it が制限用法の関係詞節)、V=have not seen、O=any surge in violent crime。, which 以下は前の内容全体を受ける。",
      "grammar": "① For instance, は既出。② that have abolished it = 主格関係代名詞+現在完了「すでに廃止した国々」。it は capital punishment を受ける代名詞。③ have not seen any surge = 現在完了の否定+any の強調「いかなる急増も経験していない」。国を主語に see を使う「経験の see」(the country has seen 〜=その国では〜が起きた)は論述の頻出構文。④ surge in 〜 = 「〜の急増」。rise より急激。増減系名詞+in の型。⑤ violent crime = 総称で不可算・無冠詞。⑥ , which undermines 〜 = 非制限用法で前半の内容全体が先行詞。単数扱い→ undermines。undermine=「(議論・立場を)掘り崩す」。⑦ the deterrence argument = 「例の抑止力論」。議論の文脈で特定→the。",
      "writing": "国を主語にした have seen 〜 で社会変化を書くのは英語論述の必修構文。締めの , which undermines the 〜 argument は「この事実が相手の論拠を崩す」と例の意味づけをする決め技で、For instance 文の後半に毎回使える。"
    },
    {
      "en": "Finally, abolition reflects a more humane and modern set of values.",
      "ja": "最後に、廃止はより人道的で現代的な価値観を反映する。",
      "structure": "SVO。S=abolition、V=reflects、O=a more humane and modern set of values。Finally, が本論3の開始。",
      "grammar": "① Finally, = 本論3の合図。② abolition = abolish の名詞形。無冠詞・不可算で「廃止(という選択)」。動詞を名詞化して主語に置く型。③ reflects = 「反映する」。三単現。④ a 〜 set of values = 「一連の価値観」。set は可算で a。more humane and modern が set を修飾する比較級(比較対象=現状、は言外)。⑤ humane = 「人道的な」。human(人間の)との綴り・意味の違いは頻出ポイント。values=価値観(常に複数)。",
      "writing": "[政策の名詞形] reflects a more 〜 set of values. は価値観アピール系の本論3(人道・現代性・国際性)の型。humane と human の使い分けはこの文で覚える。"
    },
    {
      "en": "Furthermore, the majority of developed nations have already ended the practice.",
      "ja": "さらに、先進国の大多数はすでにこの慣行を終えている。",
      "structure": "SVO。S=the majority of developed nations、V=have already ended、O=the practice。",
      "grammar": "① Furthermore, = 追加(Moreover との使い分け)。② the majority of+複数名詞 = 「〜の大多数」。動詞は of の後ろの名詞に呼応して複数(have)。③ developed nations = 過去分詞形容詞+無冠詞複数「先進国(一般)」。developing nations(途上国)との対。④ have already ended = 現在完了+already の完了用法「すでに終えている」。⑤ the practice = 死刑という既出の内容を practice(慣行)と抽象的に言い換え+the。",
      "writing": "The majority of developed nations have already 〜 は「国際標準に乗り遅れるな」論法の定番。既出の制度を the practice と言い換えて回すのは同語反復回避の必修テク。"
    },
    {
      "en": "For instance, joining this international consensus would strengthen Japan's standing as a defender of human rights.",
      "ja": "例えば、この国際的な合意に加わることは、人権の擁護者としての日本の立場を強めるだろう。",
      "structure": "SVO。S=joining this international consensus(動名詞句)、V=would strengthen、O=Japan's standing。as a defender of human rights が standing の説明。",
      "grammar": "① For instance, は既出。② joining 〜 = 動名詞句主語「加わること」。this international consensus は前文(先進国の大勢)を this で受けた言い換え。consensus は通例単数。③ would strengthen = 仮定法由来の would「(もし加われば)強めるだろう」。未実現の提案の帰結なので will でなく would。④ Japan's standing = standing=「地位・評判」(不可算)。⑤ as a defender of 〜 = 「〜の擁護者としての」。defender は可算で a。⑥ human rights = 「人権」は常に複数形。",
      "writing": "joining/adopting 〜 would strengthen [国]'s standing as a 〜 は「国際的評判が上がる」論点の型。未実現の提案の効果は would で書く、を体に入れる。human rights の複数形も固定で暗記。"
    },
    {
      "en": "Admittedly, victims' families understandably demand severe retribution.",
      "ja": "確かに、被害者遺族が厳しい報復を求めるのは理解できる。",
      "structure": "SVO。S=victims' families、V=demand、O=severe retribution。understandably は文修飾に近い副詞。Admittedly, が譲歩段落の開始。",
      "grammar": "① Admittedly, = 譲歩段落の開幕副詞。② victims' families = 複数形の所有格。s で終わる複数形はアポストロフィのみ後置(× victims's)。③ understandably = 「無理もないことだが」。副詞1語で相手の感情への共感を差し込む。譲歩段落での礼儀。④ demand = 「(当然の権利として)要求する」。複数主語なので -s なし。⑤ severe retribution = retribution(報復・応報)は不可算・無冠詞。revenge より硬い法哲学の語。",
      "writing": "感情的に重い反論は understandably を添えて受けるのが品位。victims' families understandably demand 〜 は死刑・厳罰化のほか、被害者感情が絡む論題の譲歩にそのまま流用できる。"
    },
    {
      "en": "Nevertheless, justice should aim at fairness rather than vengeance, and lifelong imprisonment can hold offenders fully accountable.",
      "ja": "それでもなお、正義は復讐よりも公正を目指すべきであり、終身刑によって加害者に十分に責任を取らせられる。",
      "structure": "重文。前半=justice(S)+should aim(V)+at fairness、rather than vengeance が対比。後半=lifelong imprisonment(S)+can hold(V)+offenders(O)+fully accountable(C)の第5文型。",
      "grammar": "① Nevertheless, = 反駁の合図。② justice / fairness / vengeance = すべて不可算・無冠詞の抽象名詞。概念同士を裸で対決させる文。③ aim at 〜 = 「〜を目指す」。目標は at で示す。④ rather than vengeance = at の目的語同士の対比。⑤ lifelong imprisonment = 「終身刑」。不可算。lifelong はハイフン不要の1語形容詞。⑥ hold O accountable = 「Oに責任を取らせる」の第5文型(hold+目的語+形容詞)。fully が accountable を修飾。offenders=加害者(無冠詞複数の総称)。",
      "writing": "should aim at A rather than B は価値の優先順位で反論をかわす型。hold offenders fully accountable は代替刑を提示するときの決め表現。「反駁は代案とセットで」の構成ごと真似る。"
    },
    {
      "en": "In conclusion, because of the danger of irreversible mistakes, the lack of clear deterrence, and the call for humane values, the death penalty should be banned.",
      "ja": "結論として、取り返しのつかない過ちの危険、明確な抑止力の欠如、人道的価値への要請ゆえに、死刑は廃止すべきだ。",
      "structure": "In conclusion+because of+名詞句3並列+主節SV(受動)。S=the death penalty、V=should be banned。",
      "grammar": "① In conclusion, = 結論の合図。② because of+名詞句×3 = 本論3本の名詞句再列挙。再列挙の前置詞は through / given / because of と選択肢がある。③ the danger of irreversible mistakes = 冤罪論点の圧縮。irreversible=「不可逆の」(本論1の can never be reversed の形容詞化)。④ the lack of clear deterrence = 抑止論点の圧縮。deterrence は deter の名詞形で不可算。lack of=欠如。⑤ the call for humane values = 人道論点の圧縮。call for=「〜を求める声」。⑥ should be banned = テーゼ(should be abolished)の言い換え回収。abolish→ban と動詞も替える。",
      "writing": "because of [名詞句1], [名詞句2], and [名詞句3], 〜 の結論型は、3論点を各4〜5語に名詞化する練習とセットで身につける。テーゼ再掲時に abolished→banned と動詞を替えるのが1級の同語反復回避。"
    },
    {
      "en": "Japan would be wiser to choose justice without the risk of killing the innocent.",
      "ja": "日本は、無実の人を殺す危険のない正義を選ぶほうが賢明だろう。",
      "structure": "SVC。S=Japan、V=would be、C=wiser。to choose 〜 は判断の内容を示す不定詞。",
      "grammar": "① would be wiser to do = 「〜する方が賢明だろう」。仮定法由来の would+比較級 wiser で、控えめだが明確な提言。It would be wise to 〜 の人主語版。② choose justice without 〜 = 「〜なしの正義を選ぶ」。③ the risk of killing = of+動名詞(本論1の the risk of executing の言い換え。execute→kill と直截な語に替えて締めのインパクトを出す)。④ the innocent = the+形容詞=「〜な人々」(無実の人々)。the poor / the elderly と同じ総称用法で複数扱い。",
      "writing": "最終文の [国] would be wiser to 〜 は政策提言の締めの型。the+形容詞(the innocent / the vulnerable)は語数を削って格を上げる1級の定番なので、ここで使い方を覚える。"
    }
  ],
  "25": [
    {
      "en": "In recent decades, some argue that democratic nations bear a duty to spread their values to authoritarian states.",
      "ja": "近年、民主主義国にはその価値観を権威主義国家に広める義務があると主張する人もいる。",
      "structure": "副詞句+SVO。S=some、V=argue、O=that節。that節内は democratic nations(S)+bear(V)+a duty(O)、to spread 〜 が duty の中身(同格の不定詞)。",
      "grammar": "① In recent decades, = 「ここ数十年」。時代設定の副詞句。現在形 argue と組んで「近年の論調」を示す。② some argue that 〜 = 代名詞 some だけで「〜と主張する人々」。Some commentators より簡潔な反対意見の導入。③ bear a duty to do = 「〜する義務を負う」。bear=(義務・責任を)担う。duty は可算で a、to不定詞が duty の内容を示す同格用法。④ their values = 「価値観」は複数形 values。⑤ democratic nations / authoritarian states = ともに無冠詞複数の総称。対義の形容詞ペア(民主 vs 権威主義)で構図を一発提示。",
      "writing": "序論は In recent decades, some argue that 〜 で「相手の主張」を紹介してから However で反転する型。bear a duty to do は義務論系のお題(先進国の責務・企業の責任)でそのまま使える。"
    },
    {
      "en": "However, I firmly believe that democracies should not actively promote democracy to non-democratic nations, for three principal reasons.",
      "ja": "しかし私は、三つの理由から、民主主義国が非民主国へ民主主義を積極的に促すべきではないと固く信じている。",
      "structure": "SVO。S=I、V=firmly believe、O=that節。that節内は democracies(S)+should not actively promote(V)+democracy(O)。for three principal reasons が論点数の予告。",
      "grammar": "① However, = 前文の紹介意見への正面からの逆接。② firmly believe = テーゼ提示の定番強調。③ democracies = 可算化した複数形「民主主義国(々)」。国を指すと可算、制度・理念の democracy は不可算。1文の中で democracies(国)と democracy(理念)が同居する好例。④ should not actively promote = 助動詞否定+副詞。actively が否定の焦点で「積極的には促すべきでない」。お題の副詞を落とさず拾っている。⑤ non-democratic = non- の接頭辞で対義語を生成。⑥ , for three principal reasons = 論点数の予告。principal=main の格上げ。",
      "writing": "However, I firmly believe that 〜, for three principal reasons. は序論2文目の完成形テンプレ。お題に副詞(actively / completely など)があれば必ず拾って否定の焦点に置くと、設問に正対した答案になる。democracy / democracies の可算・不可算の切り替えは要チェック。"
    },
    {
      "en": "First, political systems imposed from outside rarely take root.",
      "ja": "第一に、外部から押し付けられた政治制度はめったに根付かない。",
      "structure": "SV。S=political systems(imposed from outside が過去分詞の後置修飾)、V=take root。rarely が頻度を準否定。First, が本論1の開始。",
      "grammar": "① First, = 本論1のトピックセンテンスの合図。② imposed from outside = 過去分詞の後置修飾。systems (that are) imposed 〜「外から押し付けられた制度」。impose=押し付ける。③ from outside = outside を名詞的に使った「外部から」。④ rarely = 準否定の副詞「めったに〜ない」。not を使わずに否定を作ると文が引き締まる。seldom も同役。⑤ take root = 「根付く」。植物の比喩の慣用句。制度・文化・習慣の定着を言う決め表現。",
      "writing": "rarely take root は「移植された制度は定着しない」系の論題(民主化・教育改革・外来文化)の万能述語。rarely/seldom で否定文を作る技と過去分詞後置修飾を1文で両取りできる手本。"
    },
    {
      "en": "Democracy depends on institutions, civic traditions, and public trust that must develop internally over time.",
      "ja": "民主主義は、時間をかけて内部で育つべき制度・市民的伝統・国民の信頼に依存する。",
      "structure": "SV+前置詞句。S=Democracy、V=depends on、対象=institutions, civic traditions, and public trust(3並列)。that 以下は3項全体を先行詞とする関係詞節。",
      "grammar": "① Democracy = 理念としては不可算・無冠詞(序論の democracies との対比)。単数扱いで depends に -s。② depend on = 「〜に依存する」。on とセット。③ institutions = 「制度(機構)」の可算複数。④ civic traditions = 市民的伝統。可算複数。⑤ public trust = 不可算。3項の最後だけ不可算という混在並列。⑥ that must develop internally over time = 主格の関係代名詞。3項全体を受けるので must develop(複数呼応)。develop はここでは自動詞「育つ」。internally(内部で)+over time(時間をかけて)の副詞2連で「内発性」を強調し、前文の from outside と対になる。",
      "writing": "X depends on A, B, and C that must 〜 は「成功の条件」を列挙して本質論を張る型。institutions / civic traditions / public trust は社会制度系論題の語彙3点セット。internally ⇔ from outside の対比軸を段落の背骨にする書き方も真似たい。"
    },
    {
      "en": "For instance, several Middle Eastern states that adopted democratic structures under foreign pressure quickly descended into instability, demonstrating that externally driven reform tends to collapse.",
      "ja": "例えば、外圧の下で民主的な仕組みを採用した中東のいくつかの国は、すぐに不安定化し、外部主導の改革が崩壊しがちであることを示した。",
      "structure": "SV+前置詞句+分詞構文。S=several Middle Eastern states(that adopted 〜 pressure が制限用法の関係詞節)、V=descended into、対象=instability。, demonstrating that 〜 は結果の分詞構文。",
      "grammar": "① For instance, = 具体例の合図。② several Middle Eastern states = 固有形容詞 Middle Eastern は大文字。③ that adopted 〜 under foreign pressure = 主格関係詞+過去形(歴史的事実なので過去)。under pressure=「圧力の下で」。④ descend into 〜 = 「〜(混乱状態)に転落する」。descend into chaos/instability/civil war が定番コロケーション。⑤ instability = in-+stability。不可算・無冠詞。⑥ , demonstrating that 〜 = 結果の分詞構文「〜ということを示した」。前文全体が意味上の主語。⑦ externally driven reform = 副詞+過去分詞の複合修飾「外部主導の改革」。reform は総称で不可算。⑧ tends to collapse = 「崩壊しがちだ」。tend to do で一般的傾向として述べ、断定を避ける。",
      "writing": "descend into instability は失敗事例を語る決め動詞。, demonstrating that 〜 tends to ... は「例→一般法則」への昇華をワンセットでやる1級の必修ムーブ。externally driven(外部主導の)は internally と対で答案の軸に使える。"
    },
    {
      "en": "Second, such promotion frequently provokes resentment and is perceived as cultural imperialism.",
      "ja": "第二に、こうした促進はしばしば反発を招き、文化的帝国主義と受け取られる。",
      "structure": "S+V1 and V2 の並列。S=such promotion、V1=provokes resentment(能動)、V2=is perceived as 〜(受動)。Second, が本論2の開始。",
      "grammar": "① Second, = 本論2の合図(型は既出)。② such promotion = 既出の「民主主義の推進」を such+名詞化で受ける。promotion はここでは不可算。③ provoke resentment = 「反感を招く」。provoke=(感情・反応を)引き起こす。resentment(恨み・反感)は不可算。④ frequently = often の格上げ。⑤ is perceived as 〜 = perceive A as B の受動「〜と受け取られる」。受け取る主体(現地の人々)をぼかし、客観的事実のように提示。⑥ cultural imperialism = 「文化帝国主義」。不可算・無冠詞。強い概念語を as の後に置いて印象づける。",
      "writing": "provoke resentment と is perceived as 〜 は「善意の政策が反発を買う」系論述の2大パーツ。能動(provokes)と受動(is perceived)を1文で並列するリズムも真似たい。"
    },
    {
      "en": "Many citizens of non-democratic nations regard foreign intervention as an arrogant attempt to dictate their way of life.",
      "ja": "非民主国の多くの市民は、外国の介入を、自分たちの生き方を指図する傲慢な試みと見なす。",
      "structure": "SVO+as補語。S=Many citizens of 〜、V=regard、O=foreign intervention、as an arrogant attempt 〜 が補語。",
      "grammar": "① regard A as B = 「AをBとみなす」。前文の perceive as(受動・一般論)に対し、今度は主体(現地市民)を明示した能動で内側の視点に切り替える。② citizens of 〜 = 「〜の市民」。無冠詞複数。③ foreign intervention = 不可算・無冠詞「外国の介入」。④ an arrogant attempt to do = attempt+to不定詞(同格)「〜しようとする傲慢な試み」。可算で an。⑤ dictate = 「指図する」。dictator(独裁者)の同族語で、民主主義を説く側を独裁の語彙で描く皮肉が効いている。⑥ their way of life = 「生き方・生活様式」。way of life は固定句。",
      "writing": "regard A as an arrogant attempt to 〜 は相手側の認識を代弁する型。perceive(受動・一般)→regard(能動・当事者)と視点を動かす2文構成は反発系の論点で強い。way of life も文化系論題の頻出句。"
    },
    {
      "en": "Consequently, these efforts can strengthen anti-Western sentiment and entrench the very regimes they aim to weaken.",
      "ja": "その結果、こうした努力は反西洋感情を強め、弱体化させようとした体制をかえって固定化しかねない。",
      "structure": "SVO並列。S=these efforts、V1=can strengthen、O1=anti-Western sentiment、V2=(can) entrench、O2=the very regimes(they aim to weaken が接触節)。",
      "grammar": "① Consequently, = 「その結果」。原因→帰結の接続副詞。For instance の代わりに帰結で本論を締めるパターン。② these efforts = 既出の推進活動を指示形容詞で受ける。③ anti-Western sentiment = anti-+固有形容詞。sentiment(感情・世論)は不可算。④ entrench = 「(体制を)固定化する」。塹壕(trench)の比喩。can が strengthen と entrench の両方にかかる。⑤ the very regimes = very の形容詞用法「まさにその」。皮肉の強調。⑥ they aim to weaken = 関係代名詞省略の接触節。regimes (which) they aim to weaken「弱めようと狙った当の体制」。⑦ strengthen ⇔ weaken の対義語で「弱めるつもりが強める」の逆説を構造化。",
      "writing": "entrench the very 〜 they aim to weaken は「政策の逆効果」を言う最高級の皮肉構文。the very+名詞+接触節はこのまま型で暗記(undermine the very goals it seeks to achieve などに応用可)。Consequently で段落を帰結で締める構成も引き出しに。"
    },
    {
      "en": "Finally, the resources devoted to spreading democracy could be invested more productively at home.",
      "ja": "最後に、民主主義の拡大に費やされる資源は、自国でより有効に投資できる。",
      "structure": "SV(助動詞受動)。S=the resources(devoted to 〜 が過去分詞の後置修飾)、V=could be invested。more productively と at home が副詞。Finally, が本論3の開始。",
      "grammar": "① Finally, = 本論3の合図。② the resources devoted to 〜 = 過去分詞の後置修飾。resources (that are) devoted to ...「〜に充てられている資源」。devote A to B の to は前置詞なので後ろは動名詞 spreading(× devoted to spread)。③ could be invested = 仮定法の could+受動「(その気になれば)投資できるはずだ」。現状はされていない、の含み。④ more productively = 比較級の副詞「より生産的に」。⑤ at home = 「国内で」。abroad との対の慣用句。",
      "writing": "The resources devoted to X could be invested more productively in Y. は機会費用(そのカネを別に回せ)論法の完成形テンプレで、予算・援助・軍事費系の論題に丸ごと使える。devoted to -ing の to+動名詞は頻出の罠なのでここで固める。"
    },
    {
      "en": "Democratic nations themselves face pressing problems such as inequality and political polarization.",
      "ja": "民主主義国自身も、格差や政治的分断といった差し迫った問題を抱えている。",
      "structure": "SVO。S=Democratic nations themselves、V=face、O=pressing problems。such as 以下が例示。",
      "grammar": "① themselves = 再帰代名詞の強調用法「他ならぬ民主主義国自身が」。主語直後に置いて「人のことを言えるのか」の含みを出す。② face problems = 「問題に直面する」。face は他動詞で前置詞不要(× face to/with)。③ pressing = 「差し迫った」。press の現在分詞由来の形容詞で urgent の言い換え。④ such as A and B = 例示の後置(既出の型)。⑤ inequality = 不可算「格差」。⑥ political polarization = 不可算「政治的分断」。時事系の必須語彙。",
      "writing": "X themselves face pressing problems such as 〜 は「まず自分の足元を見よ」論法の型。inequality / polarization は現代社会系お題の必須語彙。themselves の強調はブーメラン論法の合図として使える。"
    },
    {
      "en": "Therefore, prioritizing domestic challenges would yield far greater benefits than costly overseas campaigns of uncertain success.",
      "ja": "したがって、国内課題を優先する方が、成否の不確かな高コストの海外活動よりはるかに大きな利益を生むだろう。",
      "structure": "SVO+比較。S=prioritizing domestic challenges(動名詞句)、V=would yield、O=far greater benefits。than 以下は比較対象の名詞句。",
      "grammar": "① Therefore, = 「したがって」。論理的帰結の接続副詞。② prioritizing 〜 = 動名詞句主語「国内課題を優先すること」。単数扱い。prioritize=優先する。③ would yield = 仮定法の would「(そうすれば)生むだろう」。yield=(利益を)生む。produce の格上げ。④ far greater benefits than 〜 = far+比較級の強調「はるかに大きい」。⑤ 比較対象が節ではなく名詞句(costly overseas campaigns)。⑥ of uncertain success = of+形容詞+名詞で性質を表す後置修飾「成功が不確かな」。of great importance と同じ of+抽象名詞の型で、関係詞節(whose success is uncertain)を3語に圧縮。",
      "writing": "prioritizing X would yield far greater benefits than Y は優先順位を主張する結論的1文の型。of uncertain success のような of+性質名詞の後置は関係詞節を3語に圧縮する上級技としてストックしたい。"
    },
    {
      "en": "In conclusion, although the ideal of global democracy is appealing, externally imposed political change is ineffective, resented, and wasteful.",
      "ja": "結論として、世界的な民主化という理想は魅力的だが、外部から押し付けられた政治変革は効果がなく、反発を招き、無駄が多い。",
      "structure": "In conclusion+although譲歩節+主節SVC。主節S=externally imposed political change、V=is、C=ineffective, resented, and wasteful(3並列)。",
      "grammar": "① In conclusion, = 結論段落の合図。② although 〜 is appealing = 結論内での最終譲歩「理想は魅力的だが」。the ideal of 〜=〜という理想(of の同格用法)。appealing=現在分詞由来の形容詞「魅力的な」。③ externally imposed political change = 副詞+過去分詞の複合修飾(本論1の imposed from outside と externally driven を合成した言い換え)。change はここでは不可算。④ ineffective, resented, and wasteful = 形容詞3並列で本論1(効果なし)・本論2(反発される)・本論3(無駄)を各1語に圧縮再掲。resented だけ過去分詞由来(人々に恨まれる)で、品詞の混在並列。",
      "writing": "結論の3論点回収を「形容詞1語×3」まで圧縮するのがこの文の見せ場(名詞句列挙・動詞句列挙と並ぶ第3の型)。although the ideal of 〜 is appealing, ... は理想論を一蹴する結論の定番の入り。"
    },
    {
      "en": "For these reasons, democratic nations should refrain from actively promoting democracy to other countries.",
      "ja": "これらの理由から、民主主義国は他国への民主主義の積極的な促進を控えるべきだ。",
      "structure": "SV+前置詞句。S=democratic nations、V=should refrain from、対象=actively promoting 〜(動名詞句)。",
      "grammar": "① For these reasons, = 「これらの理由から」。序論の for three principal reasons と呼応する結びの決まり文句。② refrain from -ing = 「〜を控える」。from は前置詞なので動名詞。should not promote と言い切るより外交的で上品な否定提言。③ actively promoting democracy = 序論のテーゼ(should not actively promote democracy)をほぼ同語で回収し、答案の首尾一貫を明示。④ to other countries = non-democratic nations の言い換え。",
      "writing": "最終文は For these reasons, [S] should refrain from -ing. で締める(禁止・自制系の結論の型)。序論の述語をほぼそのまま返すリング構成は「問いに答え切った」ことを採点者に見せる仕上げとして必修。"
    }
  ],
  "26": [
    {
      "en": "Free trade agreements have long been praised as engines of prosperity.",
      "ja": "自由貿易協定は長らく繁栄の原動力として称賛されてきた。",
      "structure": "SV(受動)。S=Free trade agreements、V=have been praised(現在完了受動)。as engines of prosperity が補足の前置詞句。long は完了形の中に挟まる副詞。",
      "grammar": "① have long been praised = 現在完了+受動態。「過去から今までずっと称賛されてきた」という継続を表し、これから覆す一般論の提示に最適。称賛する主体(世間)をぼかすために受動。long は have と been の間に置くのが定位置。② free trade agreements は無冠詞複数の総称用法=「自由貿易協定というもの全般」。③ as engines of prosperity = praise A as B「AをBとして称賛する」の as。engines は主語が複数なので数を揃えて複数。engine of ~(〜の原動力)は比喩の定番。prosperity は抽象概念で不可算・無冠詞。",
      "writing": "序論1文目の型= [お題のキーワード] have long been praised as ~ / have long been regarded as ~。「世間はこう見てきた」とまず持ち上げてから次文で疑う、反対論の王道の入り方。There is much debate over whether の代わりの手札として丸暗記。"
    },
    {
      "en": "While they certainly bring advantages, I do not believe they are the best way to promote economic growth, for the following reasons.",
      "ja": "確かに利点はあるが、私はそれが経済成長を促す最良の方法だとは思わない。以下の理由による。",
      "structure": "While譲歩節+主節。主節は S=I、V=do not believe、目的語は接続詞 that 省略の名詞節(they are the best way ...)。文末の for the following reasons は理由予告の前置詞句。",
      "grammar": "① While S V = 「〜ではあるが」の譲歡接続詞。certainly と組んで「確かに〜だが」と一度認めてから反論する定番の流れ。② I do not believe (that) they are ~ = 否定は believe 側に置く(否定転移)。× I believe they are not が不自然なわけではないが、do not believe の方が英語の標準。that は口語同様に省略可。③ the best way to do = 最上級には the が必須。way は to不定詞で修飾する(the way to promote ~)。④ for the following reasons = 序論末の理由予告。following は「以下の」で必ず the を伴う。reasons は複数の理由を挙げるので複数形。",
      "writing": "反対論のテーゼはこの While they certainly bring advantages, I do not believe they are the best way to ~ がそのまま使える。「良さは認めるが best ではない」という限定否定は、全否定より書きやすく反論にも強い、1級の賢い立場取り。for the following reasons は for three main reasons の言い換え手札。"
    },
    {
      "en": "First, sustainable growth depends primarily on domestic innovation rather than external trade deals.",
      "ja": "第一に、持続可能な成長は、外部の貿易協定よりもまず国内のイノベーションに依存する。",
      "structure": "SV+前置詞句。S=sustainable growth、V=depends、on domestic innovation が depends とセット。rather than external trade deals が on の目的語同士を比較。",
      "grammar": "① First, = 本論1の開始標識。② depends on の on は必須の前置詞セット。primarily(まず第一に)を間に挟み「主として〜に依存する」。主語 growth は不可算単数なので depends に三単現の -s。③ rather than = 「〜よりむしろ」。on A rather than B で前置詞 on の目的語 2 つを比較し、優先順位を一撃で示す。④ domestic ⇔ external の対比形容詞。innovation は抽象概念で不可算・無冠詞、trade deals は可算で総称の無冠詞複数。",
      "writing": "本論1の1文目=トピックセンテンスは、S depends primarily on A rather than B の型で「本命はAであってBではない」と宣言できる。「Xはbestか」系の論題で代替案を立てるときの必殺の1行。sustainable growth / domestic innovation は経済系論題の頻出語彙としてセットで確保。"
    },
    {
      "en": "A nation that invests in research and advanced technology can create high-value industries that endure.",
      "ja": "研究や先端技術に投資する国は、長く続く高付加価値産業を生み出せる。",
      "structure": "SVO。S=A nation(関係詞節 that invests ... technology が修飾)、V=can create、O=high-value industries(関係詞節 that endure が修飾)。関係詞節が主語と目的語の両方に付く二段構え。",
      "grammar": "① A nation that ~ = 「〜する国(というもの)は」。総称の a(どの国でも一国を代表させる)。関係代名詞 that の節内は invests と三単現(先行詞 a nation が単数)。② invest in = 「〜に投資する」。in が必須セット。③ can create = 可能性の can。「生み出しうる」と一般論として述べる。④ high-value = ハイフンで作る複合形容詞(high-value industries=高付加価値産業)。⑤ that endure = 2つ目の関係詞節。endure はここでは自動詞「持ちこたえる、長続きする」。先行詞 industries が複数なので -s なし。1語の関係詞節で「続く産業」と引き締まる。",
      "writing": "A nation that invests in A can create B = 「〜する国はBを実現できる」という一般化の型。国・企業・個人を主語にした politics/economy 系の理由説明で万能。関係詞節を主語に仕込むと、条件文(If a nation invests ...)より引き締まった1級らしい文になる。"
    },
    {
      "en": "For instance, countries such as South Korea achieved remarkable development mainly through state-led investment in technology, demonstrating that internal capacity drives lasting prosperity.",
      "ja": "例えば韓国などの国は、主に国主導の技術投資によって目覚ましい発展を遂げ、内部の能力こそが持続的な繁栄を牽引することを示した。",
      "structure": "SVO+分詞構文。S=countries(such as South Korea が例示)、V=achieved、O=remarkable development。through 以下が手段。文末の demonstrating that ~ は結果を述べる分詞構文。",
      "grammar": "① For instance, = For example の格上げ言い換え。具体例文の開始標識。② countries such as A = 「Aなどの国々」。A such as B は例示の定番で、like より書き言葉向き。③ achieved = 歴史的事実なので過去形。achieve development(発展を遂げる)のコロケーション。development はここでは不可算。④ state-led = 「国家主導の」。名詞+過去分詞のハイフン複合形容詞(state-led / government-funded / market-driven は同族)。investment in = 投資先は in。⑤ demonstrating that ~ = 文末分詞構文「〜し、(それによって)…を示している」。and it demonstrates that の圧縮形。具体例の後に「この例が何を証明するか」を一文で付け足せる、1級エッセイ最重要の型。that節内は drives(三単現)、lasting prosperity(現在分詞由来の形容詞+不可算名詞)。",
      "writing": "具体例の型= For instance, [固有名詞] achieved [成果] through [手段], demonstrating that [一般論]。文末の , demonstrating that ~ は「例→教訓」の橋渡しとして全エッセイで1回は使いたい。such as で固有名詞を1つ添えるだけで具体性の点が取れる。"
    },
    {
      "en": "Second, free trade agreements often harm vulnerable domestic sectors.",
      "ja": "第二に、自由貿易協定はしばしば脆弱な国内部門を損なう。",
      "structure": "SVO。S=free trade agreements、V=harm、O=vulnerable domestic sectors。often が頻度を表す副詞で動詞の前。",
      "grammar": "① Second, = 本論2の開始標識(First, と同じ役割につき以下略)。② often = 頻度副詞は一般動詞の前が定位置。「常に」ではなく「しばしば」とトーンを抑えることで、断定しすぎない学術的な物言いになる。③ harm = 「害する」。damage より人・社会部門に使いやすい他動詞。主語が複数なので -s なし。④ vulnerable = 1級最重要形容詞「(攻撃・被害を)受けやすい、脆弱な」。vulnerable sectors / vulnerable groups は社会問題系の鉄板。sectors は「部門」の意味で可算・複数。",
      "writing": "本論のトピックセンテンスは S often harm(s) O のように often を一枚かませると反論に強くなる(「常にではないが往々にして」)。vulnerable domestic sectors / vulnerable groups は「弱者にしわ寄せ」系の理由を立てるとき丸ごと流用できる。"
    },
    {
      "en": "When markets are opened abruptly, local farmers and small manufacturers may be unable to compete with cheaper imports.",
      "ja": "市場が急に開放されると、地元の農家や中小製造業はより安い輸入品に太刀打ちできないことがある。",
      "structure": "When従属節+主節。従属節は S=markets、V=are opened(受動)。主節は S=local farmers and small manufacturers、V=may be unable to compete。",
      "grammar": "① When markets are opened = 受動態。市場を「開く」主体(政府)より「開かれる」事態に焦点。markets は総称の無冠詞複数。abruptly=「唐突に、急激に」は suddenly の格上げ。② may be unable to = may(可能性)+be unable to(〜できない)。cannot と断言せず「できない場合がある」と含みを持たせる、論述らしい抑えた言い方。③ compete with = 「〜と競争する」。with が必須セット。④ cheaper imports = 比較級(国産品より安い)+imports「輸入品」は複数形で使うのが普通。import が名詞になると具体的な品物を指し可算化する。",
      "writing": "When [状況], [被害者] may be unable to ~ = 因果のメカニズムを説明する2文目の型。トピックセンテンスで「害がある」と言った直後に When で具体的な発生条件を示す流れは全論題で再現できる。may be unable to / may struggle to は断定を避ける保険として常備。"
    },
    {
      "en": "Consequently, certain industries collapse, causing unemployment and widening inequality, which undermines the very growth such agreements promise.",
      "ja": "その結果、一部の産業が崩壊し、失業と格差拡大を招き、協定が約束するはずの成長そのものを損なう。",
      "structure": "SV+分詞構文+非制限関係詞節。S=certain industries、V=collapse(自動詞)。causing ~ が結果の分詞構文。, which 以下は前の内容全体を先行詞とする非制限用法で、節内に接触節 (that) such agreements promise が入れ子。",
      "grammar": "① Consequently, = 「その結果」。接続副詞なので文頭+カンマ。Therefore / As a result と交替で使う手札。② certain industries = この certain は「確信」ではなく「一部の、特定の」。some の書き言葉版。③ causing A and B = 結果の分詞構文(前文Day26第5文の demonstrating と同型)。widening inequality は「拡大しつつある格差」で widening が現在分詞の形容詞用法。④ , which undermines = カンマ付き関係代名詞の非制限用法。先行詞は直前の名詞ではなく「失業と格差を招くという事態全体」。前文まるごとを受けて「そしてそれが〜を損なう」と畳みかける1級技。単数扱いなので undermines。⑤ the very growth (that) such agreements promise = very は形容詞で「まさにその」。目的格関係代名詞の省略(接触節)で「そうした協定が約束する当の成長」。約束したもの自体を壊すという皮肉を the very が効かせる。",
      "writing": "反論の締め技= ..., which undermines the very [目的] such [手段] promise(s)。「その政策は自分が約束した目標自体を壊す」という自己矛盾の指摘は、あらゆる反対論の本論を最強の形で終わらせる。, which で前文全体を受けるテクニックとセットで暗記。"
    },
    {
      "en": "Finally, education is a more fundamental driver of economic advancement.",
      "ja": "最後に、教育は経済発展のより根本的な原動力だ。",
      "structure": "SVC。S=education、V=is、C=a more fundamental driver of economic advancement。",
      "grammar": "① Finally, = 本論3の開始標識。② education は抽象概念で不可算・無冠詞。単数扱いで is。③ a more fundamental driver = 比較級 more fundamental が形容詞として driver を修飾。「(貿易協定と比べて)より根本的な」と暗黙の比較対象を前段から引き継ぐ。冠詞は a(数ある原動力のうちの一つという位置づけ)。④ driver of ~ = 「〜の原動力」。engine of と同じ比喩系の名詞で、driver of growth / driver of change が定番。advancement は -ment の抽象名詞で不可算。",
      "writing": "本論3のトピックセンテンス= X is a more fundamental driver of ~。前の2論点より「もっと根っこの要因」を最後に置くと議論に階層ができる。driver of / engine of / foundation for は「原動力」の言い換え3点セットとして手札に。"
    },
    {
      "en": "A skilled and adaptable workforce enables a country to seize new opportunities regardless of trade conditions.",
      "ja": "熟練し適応力のある労働力があれば、貿易条件に関わらず新たな機会をつかめる。",
      "structure": "SVOC(enable O to do)。S=A skilled and adaptable workforce、V=enables、O=a country、C=to seize ~。regardless of ~ は副詞句。",
      "grammar": "① 無生物主語+enable O to do = 「SがあればOは〜できる」。英語の因果は If ではなく無生物主語で書くのが上級の作法。主語 workforce(労働力)は集合名詞で単数扱い→ enables。② skilled and adaptable = 過去分詞由来(skilled)と -able 形容詞(adaptable)の並列。a skilled workforce は労働経済の定番コロケーション。③ a country = 総称の a「どの国であれ」。④ seize opportunities = 「機会をつかむ」の decisiveなコロケーション(take より強い)。⑤ regardless of = 「〜に関わらず」の群前置詞。後ろは名詞句。条件を超えた普遍性を示す。",
      "writing": "無生物主語の型= [資源・制度] enables [主体] to [行動] regardless of [外部条件]。「教育・技術・制度こそが本質」系の理由説明にそのまま使える。enable / allow / free O to do は使役3兄弟としてローテーションする。"
    },
    {
      "en": "Therefore, investing in human capital yields broader and more resilient benefits than relying chiefly on tariff reductions.",
      "ja": "したがって、人的資本への投資は、関税引き下げに主に頼るよりも幅広く強靭な利益を生む。",
      "structure": "SVO。S=動名詞句 investing in human capital、V=yields、O=broader and more resilient benefits。than 以下も動名詞句(relying ... reductions)で主語同士を比較。",
      "grammar": "① Therefore, = 本論の結びを導く接続副詞。② investing in human capital = 動名詞句が主語。動名詞主語は単数扱い→ yields に -s。human capital(人的資本)は経済用語で不可算・無冠詞。③ yields benefits = yield は「(利益・結果を)生む」。produce の格上げで、yield returns / yield results も同族。④ broader and more resilient = 比較級の並列。-er 型(broader)と more 型(more resilient)が混在してよい。resilient=「回復力のある、折れない」は1級最重要形容詞。⑤ than relying on ~ = 比較対象を動名詞で揃える(investing ... than relying ...)。比較は同じ形同士で、が鉄則。chiefly=mainly の言い換え。rely on の on を落とさない。",
      "writing": "本論の締めの型= Therefore, [動名詞句A] yields broader and more resilient benefits than [動名詞句B]。代替案Aと相手案Bを動名詞で並べて優劣を宣告する比較構文は、「Xよりyの方が有効」を言うすべての論題で流用可。resilient は climate / economy / society 系で無限に使える。"
    },
    {
      "en": "In conclusion, although free trade agreements can contribute to economic growth, they are not the most effective path.",
      "ja": "結論として、自由貿易協定は経済成長に寄与しうるが、最も効果的な道ではない。",
      "structure": "In conclusion+although譲歩節+主節。譲歩節は S=free trade agreements、V=can contribute。主節は SVC(they are not the most effective path)。",
      "grammar": "① In conclusion, = 結論段落の開始標識(無冠詞の決まり文句)。② although 譲歩節を結論の頭に入れて「利点は認めた上で」ともう一度フェアさを示す。1級の結論は譲歩→断言の2拍子。③ can contribute to = 可能性の can+contribute to「〜に寄与する」。to は前置詞で、後ろに名詞(economic growth)。④ the most effective path = 最上級には the。序論の the best way の言い換え(way→path、best→most effective)で、同じ主張を同じ単語で繰り返さないのが減点回避のポイント。",
      "writing": "結論1文目の型= In conclusion, although X can contribute to ~, X is/are not the most effective ~。序論のテーゼを語彙を替えて再宣言する。best way → most effective path のような「同義リサイクル」は結論で必ず1回やる。"
    },
    {
      "en": "Innovation, protection of domestic industries, and education form a more reliable foundation for lasting prosperity.",
      "ja": "イノベーション、国内産業の保護、そして教育こそが、持続的な繁栄のより確かな土台となる。",
      "structure": "SVO。S=3つの名詞句の並列(Innovation / protection of domestic industries / education)、V=form、O=a more reliable foundation。",
      "grammar": "① 三本柱の並列主語 = A, B, and C。本論1・2・3のキーワードをそのまま1文の主語に束ねる、結論2文目の最重要テク。3項なので複数扱い→ form に -s なし。② A, B, and C の並列は名詞句の重さを揃える(innovation / protection of ~ / education と全部名詞)。③ form a foundation for = 「〜の土台を成す」。build / lay a foundation と同族。比較級 more reliable は「貿易協定より」の含み。冠詞は a(ひとつの土台として提示)。④ lasting prosperity = 現在分詞由来の形容詞 lasting「長続きする」+不可算名詞。本論1で使った enduring / lasting 系語彙の回収。",
      "writing": "結論の最終文= [論点1], [論点2], and [論点3] form a more reliable foundation for ~。3つの理由を主語に再結集させて締める型は Day1 の advances, prospects, and fostering ... all confirm と同じ発想。エッセイ全体が1文に畳み込まれるので、審査員への「構成が見えている」アピールになる。"
    }
  ],
  "27": [
    {
      "en": "As global challenges grow more interconnected, the question of foreign aid has gained renewed importance.",
      "ja": "世界の課題がますます相互に結びつく中、対外援助の問題は改めて重要性を増している。",
      "structure": "As従属節+主節。従属節は S=global challenges、V=grow(+補語 more interconnected)。主節は S=the question of foreign aid、V=has gained(現在完了)、O=renewed importance。",
      "grammar": "① As S V = 「〜するにつれて/〜する中で」。比例・背景を示す接続詞で、序論の時代設定に最適。② grow + 形容詞 = become の格上げ「次第に〜になる」。more interconnected は過去分詞由来の形容詞の比較級。③ the question of ~ = 「〜という問題」。of は同格で、the はお題として特定されているから。④ has gained renewed importance = 現在完了で「(以前からあったが)いま改めて重要になった」。renewed は過去分詞由来の形容詞「新たにされた=改めての」。gain importance(重要性を増す)のコロケーション。importance は不可算。",
      "writing": "序論1文目の型= As global challenges grow more interconnected, the question of [お題] has gained renewed importance.。時事系・国際系の論題ならお題を差し替えるだけで機能する万能オープナー。In an increasingly interconnected world(Day30)と兄弟表現なので両方持っておく。"
    },
    {
      "en": "I firmly believe that the Japanese government should provide more money as aid to foreign countries, for three compelling reasons.",
      "ja": "私は、日本政府が外国への援助をもっと増やすべきだと固く信じている。説得力のある三つの理由による。",
      "structure": "SVO。S=I、V=firmly believe、O=that節。that節内は S=the Japanese government、V=should provide、O=more money。for three compelling reasons が理由予告。",
      "grammar": "① I firmly believe that ~ = テーゼ宣言の定番。firmly が believe を修飾して立場の強さを示す(strongly / sincerely も可)。② the Japanese government = 特定の一政府なので the。③ should provide = 提案・義務の should。お題が Should ~? ならテーゼの助動詞も should で受けるのが素直。④ provide A as B = 「AをBとして提供する」。money は不可算なので more money(× more moneys)。to foreign countries は提供先。⑤ for three compelling reasons = 理由予告。compelling=「抗いがたいほど説得力のある」は main / principal の格上げ形容詞。reasons は3つだから当然複数。",
      "writing": "テーゼ+理由予告の型= I firmly believe that [お題の言い換え], for three compelling reasons.。for three main reasons ばかり書いていると単調なので compelling / principal / key をローテーション。お題文の動詞を丸写しせず provide more money as aid のように具体化して言い換えるのが1級の作法。"
    },
    {
      "en": "First, generous aid strengthens Japan's diplomatic standing.",
      "ja": "第一に、手厚い援助は日本の外交的地位を強める。",
      "structure": "SVO。S=generous aid、V=strengthens、O=Japan's diplomatic standing。",
      "grammar": "① First, = 本論1の開始標識。② generous aid = aid「援助」は不可算・無冠詞。generous(気前のよい)は金額の多さを人柄の形容詞で言う上品な言い方。単数扱い→ strengthens に三単現の -s。③ strengthen = 「強める」。strong の動詞化(-en)。improve より的が絞れる。④ Japan's = 所有格。国名+'s は普通に使える。diplomatic standing = 「外交的地位・立場」。standing は status の言い換えで、international standing / social standing が同族コロケーション。",
      "writing": "トピックセンテンスは [手段] strengthens [国]'s [地位・能力] のSVO一撃で短く言い切る。長い文の間に置く短文はリズムの緩急として高評価。diplomatic standing は国際系論題の頻出名詞句として確保。"
    },
    {
      "en": "By assisting developing nations, Japan cultivates goodwill and reliable international partners.",
      "ja": "途上国を支援することで、日本は善意と信頼できる国際的パートナーを育む。",
      "structure": "By+動名詞句(手段)+SVO。S=Japan、V=cultivates、O=goodwill and reliable international partners の並列。",
      "grammar": "① By -ing = 「〜することによって」。手段を文頭に置く型で、トピックセンテンスの直後に「どうやって」を説明する2文目の定番。② developing nations = 現在分詞由来の形容詞 developing「発展途上の」。developed nations(先進国)と対。無冠詞複数の総称。③ cultivates = cultivate は「耕す」から転じて「(関係・才能を)育む」。build の格上げで、cultivate trust / cultivate relationships が定番。三単現の -s。④ goodwill = 「善意・好意」は不可算・無冠詞。partners は可算で複数。不可算と可算を and で並べてよい。",
      "writing": "By -ing, S cultivates ~ = 「手段→効果」を1文で述べる型。cultivate goodwill / cultivate trust は外交・人間関係系の論題で build より一段上に見えるコロケーション。トピックセンテンス(抽象)→By -ing文(具体化)の2文セットで本論の前半が組める。"
    },
    {
      "en": "For instance, Japan's longstanding infrastructure support across Southeast Asia has earned considerable trust, demonstrating that aid translates directly into lasting diplomatic influence.",
      "ja": "例えば、東南アジア全域での日本の長年にわたるインフラ支援は大きな信頼を獲得しており、援助が持続的な外交的影響力に直結することを示している。",
      "structure": "SVO+分詞構文。S=Japan's longstanding infrastructure support(across Southeast Asia が範囲)、V=has earned、O=considerable trust。demonstrating that ~ が文末分詞構文。",
      "grammar": "① For instance, = 具体例の開始標識。② longstanding = 「長年にわたる」の一語形容詞。long-standing とも綴る。③ across Southeast Asia = across は「〜の全域で」。in より広がりが出る。④ has earned = 現在完了「(過去から今までに)獲得してきた」。earn trust(信頼を勝ち取る)は get より働きかけの重みが出るコロケーション。considerable(相当な)は不可算名詞 trust を量的に盛る定番。⑤ demonstrating that ~ = 例→教訓の文末分詞構文(Day26で既出の型)。⑥ translates directly into ~ = 「そのまま〜に転化する」。translate into は因果を力強く言う1級動詞。lasting diplomatic influence は分詞形容詞+不可算名詞のかたまり。",
      "writing": "具体例の型は [国]'s longstanding [支援・政策] across [地域] has earned considerable trust, demonstrating that ~。数字や年号がなくても longstanding + across + 現在完了で「実績」の重みが出せる。translates directly into は因果を言うすべての場面で使い回せる即戦力。"
    },
    {
      "en": "Second, increased aid helps address global problems that ultimately affect Japan itself.",
      "ja": "第二に、援助の増加は最終的に日本自身にも影響する地球規模の問題への対処を助ける。",
      "structure": "SVO。S=increased aid、V=helps、O=address ~(原形不定詞)。global problems を関係詞節 that ultimately affect Japan itself が修飾。",
      "grammar": "① Second, = 本論2の開始標識。② increased aid = 過去分詞 increased が形容詞化「増額された援助」。「援助を増やすこと」を名詞句で圧縮する英語らしい書き方。③ help (to) do = help は to なし原形を取れる(helps address)。help address / help create は論述频出。④ that ultimately affect ~ = 関係代名詞 that。先行詞 problems が複数なので affect に -s なし。ultimately=「巡り巡って最終的に」が因果の距離感を出す。⑤ Japan itself = 再帰代名詞の強調用法「他ならぬ日本自身」。援助は他人事ではないという論旨の核を itself 一語で担う。",
      "writing": "賛成論の第2ラウンドは [政策] helps address [大問題] that ultimately affect [自国] itself の型で「情けは人のためならず」構造を作る。help + 原形と、強調の itself はどの論題でも効く小技。increased aid のような過去分詞+名詞の圧縮も真似したい。"
    },
    {
      "en": "Issues such as poverty, pandemics, and climate change recognize no borders.",
      "ja": "貧困、感染症、気候変動といった問題に国境はない。",
      "structure": "SVO。S=Issues(such as ~ が3例を列挙)、V=recognize、O=no borders。",
      "grammar": "① Issues such as A, B, and C = 例示の such as で3つ並べる(Day26で既出)。poverty(不可算)・pandemics(可算複数)・climate change(不可算)と名詞の種類が揃っていなくても並列できる。② recognize no borders = 否定を not ではなく no+名詞で書く強調形。「国境を一切認めない=国境などお構いなし」。know no bounds / see no borders も同族。③ 主語 Issues が複数なので recognize は原形のまま。borders が複数なのは国境線が複数あるイメージ。",
      "writing": "recognize no borders はグローバル問題系の決め台詞としてそのまま暗記(keyExpressions にも採用されている)。no+名詞の否定(have no choice / know no bounds)は not ... any より引き締まるので、エッセイに1回入れると文体が締まる。"
    },
    {
      "en": "Therefore, by funding clean water, healthcare, and disaster relief abroad, Japan contributes to a more stable world from which it also benefits.",
      "ja": "したがって、海外での清潔な水・医療・災害救援に資金を出すことで、日本は自らも恩恵を受ける、より安定した世界に貢献する。",
      "structure": "Therefore+by動名詞句+SV。S=Japan、V=contributes to ~。a more stable world を前置詞付き関係詞節 from which it also benefits が修飾。",
      "grammar": "① Therefore, + by -ing = 接続副詞と手段の動名詞句を重ねて本論を締めに向かわせる。funding は fund(資金を出す)の動名詞。目的語3つ(clean water / healthcare / disaster relief)はどれも不可算・無冠詞。② contributes to = 「〜に貢献する」。to は前置詞。三単現の -s。③ a more stable world = 比較級+可算名詞。「今より安定した(ひとつの)世界」なので a。④ from which it also benefits = 前置詞+関係代名詞。benefit from ~(〜から恩恵を受ける)の from が関係詞の前に移動した形。it=Japan。「支援した相手の安定から自分も得をする」という円環を関係詞節1つで言い切る1級構文。",
      "writing": "from which everyone/it also benefits は「巡って自分に返る」構造の必殺関係詞節(Day30にも登場)。contributes to a more stable world from which it also benefits を丸ごとテンプレ化すれば、国際協力系の本論2はほぼコピペで書ける。前置詞+which は減点されない正確さで書けるよう手に覚えさせる。"
    },
    {
      "en": "Finally, foreign aid can stimulate Japan's own economy.",
      "ja": "最後に、対外援助は日本自身の経済を刺激しうる。",
      "structure": "SVO。S=foreign aid、V=can stimulate、O=Japan's own economy。",
      "grammar": "① Finally, = 本論3の開始標識。② can stimulate = 可能性の can+stimulate「刺激する・活性化する」。stimulate the economy は経済系の頻出コロケーション。③ Japan's own = 所有格+own で「他ならぬ日本自身の」と強調。前段の Japan itself と同じ「自国メリット」路線を own が引き継ぐ。economy は「一国の経済」の意味では可算で、所有格が冠詞の代わりを務める。",
      "writing": "本論3を「実は自分も得をする」で立てるのは賛成論の鉄板の落とし方(tip にもある通り)。[政策] can stimulate [自国]'s own economy は援助・移民・留学生など「外に出すカネ・人」系の論題全部で流用可。"
    },
    {
      "en": "Aid projects frequently involve Japanese companies and technology, creating business opportunities overseas.",
      "ja": "援助事業にはしばしば日本企業や技術が関わり、海外でのビジネス機会を生む。",
      "structure": "SVO+分詞構文。S=Aid projects、V=involve、O=Japanese companies and technology。creating ~ が結果の分詞構文。overseas は副詞。",
      "grammar": "① frequently = often の格上げ頻度副詞。動詞の前が定位置。② involve = 「〜を巻き込む・伴う」。事業と企業の関係を1動詞で言える便利語。主語 projects が複数なので -s なし。③ companies(可算複数)と technology(不可算)の並列。④ creating ~ = 結果の分詞構文(Day26 causing、demonstrating と同型につき簡潔に)。「関わる→その結果機会が生まれる」。⑤ overseas = 1語で「海外で」の副詞。abroad と同義で、in foreign countries より簡潔。",
      "writing": "メカニズム説明文= S frequently involve(s) [主体], creating [波及効果]。文末の , creating ~ で因果を1文に畳む技はこのコースの署名技なので、自分のエッセイでも本論に1回は仕込む。"
    },
    {
      "en": "Consequently, well-designed assistance functions not merely as charity but as a strategic investment that yields long-term economic returns.",
      "ja": "その結果、よく設計された支援は単なる慈善ではなく、長期的な経済的見返りを生む戦略的投資として機能する。",
      "structure": "SV+not A but B の対句。S=well-designed assistance、V=functions、as charity と as a strategic investment を not merely ~ but ~ が対比。investment を関係詞節 that yields ~ が修飾。",
      "grammar": "① Consequently, = 結果の接続副詞(既出)。② well-designed = 副詞+過去分詞のハイフン複合形容詞「よく設計された」。well-directed / well-planned も同族。assistance は不可算。③ functions as = 「〜として機能する」。work as の格上げ。三単現の -s。④ not merely A but (also) B = 「単なるAではなくB」。merely が only の格上げ。as を両側に置いて対称を保つ(not merely as charity but as ~)。charity は概念なので無冠詞、a strategic investment は「ひとつの投資案件」として可算で a。⑤ that yields long-term economic returns = 関係詞節。yield(生む)は Day26 既出。returns は「収益・見返り」の意味では複数形が普通(economic returns / financial returns)。",
      "writing": "本論3の締め= functions not merely as charity but as a strategic investment that yields long-term returns はこのまま丸暗記推奨(Day30 にほぼ同文が再登場する=それだけ汎用)。not merely A but B は「格上げの再定義」を行う型で、援助・教育・芸術など「無駄か有益か」系の論題すべてで決め技になる。"
    },
    {
      "en": "In conclusion, although critics may cite domestic budget constraints, the advantages of expanded foreign aid are undeniable.",
      "ja": "結論として、批判する者は国内予算の制約を挙げるかもしれないが、対外援助拡大の利点は紛れもない。",
      "structure": "In conclusion+although譲歩節+主節。譲歩節は S=critics、V=may cite。主節は SVC(the advantages ... are undeniable)。",
      "grammar": "① In conclusion, although ~ = 結論冒頭の譲歩(Day26 と同構造)。② critics may cite ~ = 「批判者は〜を挙げるかもしれない」。cite=「(根拠として)挙げる」は mention の格上げ。may で反論の存在を認めつつ勢いを殺す。critics は無冠詞複数の総称。③ domestic budget constraints = 名詞3連結「国内の+予算の+制約」。constraints は複数形が普通。④ the advantages of expanded foreign aid = expanded は過去分詞の形容詞用法「拡大された=拡大した場合の」。advantages は of句で特定され the。⑤ are undeniable = 「否定しようがない」。deny+-able+un- の派生をそのまま使える強い断言形容詞。",
      "writing": "結論の型= In conclusion, although critics may cite [最有力の反論], the advantages of ~ are undeniable.。反論に1回だけ触れて undeniable で切り捨てるこの1文は、賛成論の結論として最強のテンプレ(keyExpressions 採用済み)。反論の中身は cite の後に名詞句で置くだけなので量産が効く。"
    },
    {
      "en": "Because it enhances diplomacy, tackles shared global threats, and supports the domestic economy, Japan should certainly increase its financial aid to other nations.",
      "ja": "外交を強化し、共有された地球規模の脅威に取り組み、国内経済を支えるのだから、日本は他国への資金援助を確かに増やすべきだ。",
      "structure": "Because従属節(動詞3連の並列)+主節。従属節は S=it(=foreign aid)、V=enhances / tackles / supports の3並列。主節は S=Japan、V=should increase、O=its financial aid。",
      "grammar": "① Because 節に本論3つの動詞を並列で詰め込む = enhances A, tackles B, and supports C。3つとも三単現の -s で形を揃える(並列は形を揃えるが鉄則)。② enhance(質を高める)/ tackle(問題に取り組む)/ support はどれも improve / deal with / help の格上げ動詞。shared global threats は過去分詞形容詞+複数名詞。the domestic economy は「国内経済」という特定領域で the。③ should certainly increase = should+強調副詞 certainly でテーゼを最終再宣言。④ its financial aid = its=Japan's。序論の provide more money as aid を financial aid と言い換えて回収。to other nations = 援助の向け先。",
      "writing": "最終文の型= Because it [動詞1]+[目的語1], [動詞2]+[目的語2], and [動詞3]+[目的語3], [主語] should certainly ~.。本論3つを動詞句で束ねて because に入れ、テーゼで締める。Day1 の三本柱主語型と並ぶ最終文の二大テンプレなので両方書けるようにしておく。"
    }
  ],
  "28": [
    {
      "en": "Climate change has become one of the gravest threats of our era.",
      "ja": "気候変動は現代における最も深刻な脅威の一つとなった。",
      "structure": "SVC。S=Climate change、V=has become(現在完了)、C=one of the gravest threats of our era。",
      "grammar": "① has become = 現在完了「〜になった(今もそうである)」。became(過去形)だと過去の一点で話が切れるが、完了形なら現状への地続き感が出る。序論の現状認識は現在完了が定石。② one of the+最上級+複数名詞 = 「最も〜なもののひとつ」。最上級 gravest には the、後ろの名詞は必ず複数(threats)。grave=「(事態が)重大な」は serious の格上げ。③ of our era = 「我々の時代の」。era は period の格上げ。our era / our time は無難に格好がつく時代指定。④ climate change は不可算・無冠詞のかたまり。",
      "writing": "序論1文目の万能型= [お題の問題] has become one of the gravest threats of our era.。環境・安全保障・健康系など「脅威」を語る論題ならコピペで機能する(keyExpressions 採用済み)。one of the most pressing issues of our time も同型の言い換え。"
    },
    {
      "en": "I strongly believe that governments should do far more to combat it, for the following three reasons.",
      "ja": "私は、政府がその対策をはるかに強化すべきだと強く信じている。以下の三つの理由による。",
      "structure": "SVO。S=I、V=strongly believe、O=that節(governments should do far more ...)。to combat it は目的の不定詞。for the following three reasons が理由予告。",
      "grammar": "① I strongly believe that ~ = テーゼ宣言(Day27 の firmly と交替可能な手札)。② governments = 無冠詞複数の総称「各国政府というもの」。③ do far more = do more(もっとやる)+比較の強調 far「はるかに」。far more / far outweigh の far は much の格上げで1級の頻出強調。④ to combat it = 目的の to不定詞。combat=「〜と闘う」は fight の格上げ動詞で、お題の fight climate change の言い換えになっている。it=climate change。⑤ for the following three reasons = 理由予告(既出の型に three を挟んだ変形)。",
      "writing": "テーゼの型= I strongly believe that [主体] should do far more to combat [問題], for the following three reasons.。お題が Should ~ do more? のときはこの do far more to combat/address がそのまま答えの言い換えになる。fight→combat の動詞格上げは採点者に効く小技。"
    },
    {
      "en": "First, climate change endangers human survival itself.",
      "ja": "第一に、気候変動は人類の生存そのものを脅かす。",
      "structure": "SVO。S=climate change、V=endangers、O=human survival itself。",
      "grammar": "① First, = 本論1の開始標識。② endangers = en-(〜の状態にする)+danger。threaten の言い換えで「危険に晒す」。主語 climate change は不可算単数→三単現の -s。③ human survival = 不可算名詞 survival に形容詞 human。of句がないので無冠詞のまま。④ itself = 再帰代名詞の強調用法「生存それ自体を」(Day27 Japan itself と同じ技)。論点の深刻さを一語で最大化する。",
      "writing": "本論1は最重量級の理由(生存・人命)から始めるのがこの型の作法。[問題] endangers [根源的価値] itself は「安全・健康・民主主義が脅かされる」系の理由の1行目としてそのまま使える。短いトピックセンテンス→長い説明文の緩急も真似る。"
    },
    {
      "en": "Rising temperatures exacerbate droughts, floods, and extreme weather that devastate communities.",
      "ja": "気温上昇は干ばつ、洪水、地域社会を破壊する異常気象を激化させる。",
      "structure": "SVO。S=Rising temperatures、V=exacerbate、O=droughts, floods, and extreme weather の3並列。that devastate communities が関係詞節。",
      "grammar": "① Rising temperatures = 現在分詞 rising が形容詞「上昇しつつある」。temperatures が複数なのは世界各地の気温を集合的に見るため。rising sea levels / rising costs も同族。② exacerbate = 「悪化させる」。make ~ worse の一語格上げで、1級語彙の代表格。主語複数なので -s なし。③ droughts, floods は可算複数、extreme weather は不可算、の3並列(可算・不可算混在OK、Day27 既出)。④ that devastate communities = 関係詞節。devastate=「壊滅させる」は destroy の格上げ。先行詞が並列全体(複数扱い)なので -s なし。communities は無冠詞複数の総称。",
      "writing": "被害の列挙文= Rising [指標] exacerbate(s) A, B, and C that devastate [被害者]。exacerbate と devastate の2つの1級動詞を1文に同居させたこの文は、環境・貧困・健康系の「悪化メカニズム」説明にそのまま流用できる。"
    },
    {
      "en": "For instance, recent record heatwaves across Europe caused thousands of deaths, demonstrating that inaction carries an unacceptable human cost.",
      "ja": "例えば、近年ヨーロッパ各地で起きた記録的熱波は何千人もの死者を出し、無策が許容しがたい人的代償を伴うことを示した。",
      "structure": "SVO+分詞構文。S=recent record heatwaves(across Europe が場所)、V=caused、O=thousands of deaths。demonstrating that ~ が文末分詞構文。",
      "grammar": "① For instance, +具体例+, demonstrating that ~ = 例→教訓の型(既出につき簡潔に)。② record = 名詞がそのまま形容詞的に働く「記録的な」(record heatwaves / record profits)。③ across Europe = 「ヨーロッパ全域で」(Day27 across Southeast Asia と同じ)。④ caused = 実際に起きた出来事なので過去形。thousands of deaths = 「何千もの死」。thousands of+複数名詞で規模を出す。死は一件ずつ数えられるので deaths と可算複数。⑤ inaction = in-(否定)+action「何もしないこと」。不作為を1語で名詞化できる強い語。単数扱い→ carries。⑥ carries an unacceptable human cost = carry a cost「代償を伴う」のコロケーション。unacceptable(容認できない)+human cost(人的代償)。cost はここでは可算で an。",
      "writing": "inaction carries an unacceptable cost は「やらないことのコスト」を突く万能の教訓文(keyExpressions 採用済み)。具体例は recent record [災害/事件] across [地域] caused thousands of ~ のように「最近・記録的・地域」の3点セットで書くと、細かい数字を知らなくても具体性が出る。"
    },
    {
      "en": "Second, only governments possess the authority and resources to act on a sufficient scale.",
      "ja": "第二に、十分な規模で行動できる権限と資源を持つのは政府だけだ。",
      "structure": "SVO。S=only governments、V=possess、O=the authority and resources(to act ~ が両者を修飾する形容詞的用法の不定詞)。",
      "grammar": "① only+主語 = 「〜だけが」。主語に only を付けて唯一性を主張する強い型。② possess = have の格上げ「保有する」。主語複数なので -s なし。③ the authority and resources to act = to不定詞の形容詞的用法「行動するための権限と資源」。to act が2つの名詞を一括修飾。the は「その行動に必要な」と特定されるため。authority(権限)は不可算、resources は複数形。④ on a ~ scale = 「〜な規模で」。on a large scale / on a sufficient scale と on+a+形容詞+scale の型で覚える。sufficient=enough の格上げ。",
      "writing": "Only [主体] possess(es) the authority and resources to ~ = 「これは政府/国連/大企業にしかできない」と主体の唯一性で押す本論の型(keyExpressions 採用済み)。「個人の努力では足りない→だから政府」系の論題で丸ごと使える。on a sufficient scale も規模の議論の常備句。"
    },
    {
      "en": "Combating climate change requires sweeping regulation, large-scale investment in renewable energy, and international cooperation that individuals and companies cannot achieve alone.",
      "ja": "気候変動対策には、大規模な規制、再生可能エネルギーへの巨額投資、そして個人や企業だけでは実現できない国際協力が必要だ。",
      "structure": "SVO。S=動名詞句 Combating climate change、V=requires、O=3つの名詞句の並列(sweeping regulation / large-scale investment ... / international cooperation)。that 以下の関係詞節が並列の末尾(または全体)を修飾。",
      "grammar": "① Combating climate change requires ~ = 動名詞句主語(単数扱い→ requires)。「〜することは…を要する」で必要条件を列挙する型。② sweeping = 「全面的な、広範な」。sweep(掃く)の分詞形容詞で、sweeping reforms / sweeping changes が定番。regulation は制度全般を指し不可算。③ large-scale = ハイフン複合形容詞(前文の on a large scale の形容詞版)。investment in = 投資先の in(Day26 既出)。renewable energy = 「再生可能エネルギー」は不可算のかたまり。④ international cooperation = 不可算(Day1 グロッサリー同様)。⑤ that individuals and companies cannot achieve alone = 関係詞節。alone は文末で「単独では」。「個人・企業には無理」と前文の only governments を裏から補強する。",
      "writing": "必要条件の列挙文= [動名詞句] requires A, B, and C that individuals cannot achieve alone.。3つの名詞句はそれぞれ形容詞+名詞で重さを揃える(sweeping regulation / large-scale investment / international cooperation)。末尾の cannot achieve alone は「だから政府」への橋として超便利。"
    },
    {
      "en": "Therefore, decisive government leadership is indispensable to coordinate such efforts effectively.",
      "ja": "したがって、こうした取り組みを効果的に調整するには、政府の断固たる指導が不可欠だ。",
      "structure": "SVC。S=decisive government leadership、V=is、C=indispensable。to coordinate ~ は「〜するために」の不定詞句。",
      "grammar": "① Therefore, = 本論の結び(既出)。② decisive government leadership = 形容詞+名詞+名詞の3連。decisive=「断固たる」。leadership は不可算・無冠詞。③ is indispensable = 「不可欠だ」。dispense(なしで済ます)+-able+in- で「なしでは済まされない」。essential / vital の最上位互換(keyExpressions 採用済み)。④ to coordinate = 不定詞。indispensable to do / indispensable for -ing のどちらも可。coordinate=「調整する」。such efforts = 前文の3項目を such で受ける(this/these より論述らしい)。effectively が動詞を修飾。",
      "writing": "本論の締め= [主体・資質] is indispensable to ~ effectively.。necessary の代わりに indispensable を使うだけで語彙点が上がる。前文の内容を such efforts / such measures で受けるのも段落内の結束を作る定番技として盗む。"
    },
    {
      "en": "Finally, early action is far more economical than delay.",
      "ja": "最後に、早期の行動は先延ばしよりはるかに経済的だ。",
      "structure": "SVC+比較。S=early action、V=is、C=far more economical。than delay が比較対象。",
      "grammar": "① Finally, = 本論3の開始標識。② early action ⇔ delay = 抽象名詞同士の対比。両方とも概念なので無冠詞・不可算。比較は同じ品詞・同じ重さで揃える鉄則の好例。③ far more economical = 比較の強調 far(Day28第2文で既出)。economical=「経済的な=金がかからない」。economic(経済の)との混同は頻出ミスで、ここは「安上がり」の意味だから economical が正解。④ than delay = delay は「遅延・先送り」の不可算名詞用法。",
      "writing": "本論3のトピックセンテンス= early action is far more economical than delay は、コスト論で攻めるすべての「今やるべきか」論題の1行目に使える。economic / economical の使い分けは英作文の頻出地雷なのでこの文ごと覚えて回避する。"
    },
    {
      "en": "Although measures to mitigate these adverse effects appear costly now, the expense of repairing future damage from disasters and rising sea levels will be vastly greater.",
      "ja": "こうした悪影響を緩和する対策は今は高くつくように見えるが、将来の災害や海面上昇による被害を修復する費用ははるかに大きくなる。",
      "structure": "Although譲歩節+主節。譲歩節は S=measures(to mitigate ~ が修飾)、V=appear、C=costly。主節は S=the expense(of repairing ~ が修飾)、V=will be、C=vastly greater。",
      "grammar": "① Although ~ now, ~ will be ~ = 「今は〜に見えるが、将来は〜」の現在 vs 未来対比。時制の対比が論理をそのまま担う。② measures to mitigate = to不定詞の形容詞的用法「緩和するための対策」。measures(対策)は複数形が普通。mitigate=「緩和する」は1級最重要動詞(mitigate climate change / mitigate risks)。these adverse effects = adverse「悪い方向の」+effects。前段の内容を these で受ける。③ appear costly = appear+形容詞「〜に見える」(seem の格上げ)。costly は -ly で終わるが形容詞。④ the expense of repairing = expense は of句で特定され the。of+動名詞「修復することの費用」。damage は不可算。from disasters and rising sea levels = 被害の出どころ。rising sea levels は rising temperatures(第4文)と同型。⑤ will be vastly greater = 未来の will+比較級。vastly は far のさらに格上げ「桁違いに」。",
      "writing": "コスト比較の型= Although [対策] appear(s) costly now, the expense of repairing future damage will be vastly greater.。「予防は治療より安い」構造は環境・健康・インフラ・教育のどれでも使える万能ロジック。appear costly now / vastly greater の対はこのまま抜き出してテンプレ化。"
    },
    {
      "en": "As a result, investing in prevention today represents a prudent and responsible financial choice.",
      "ja": "その結果、今日予防に投資することは、賢明で責任ある財政的選択となる。",
      "structure": "SVO。S=動名詞句 investing in prevention today、V=represents、O=a prudent and responsible financial choice。",
      "grammar": "① As a result, = Consequently / Therefore の言い換え手札。3語型の接続。② investing in prevention = 動名詞句主語(単数扱い→ represents)。invest in(Day26 既出)。prevention は不可算・無冠詞。today は副詞で「現時点で」。③ represents = 「〜に相当する、〜と言える」。is の格上げで、A represents B は評価を下す文に品が出る。④ a prudent and responsible financial choice = 形容詞2つの並列+名詞。prudent=「思慮深い、堅実な」は wise の格上げで金融・政策文脈の定番。choice は可算で a。",
      "writing": "本論の締め= [動名詞句] represents a prudent and responsible choice.。is より represents、wise より prudent、と一段ずつ格上げした評価文はそのまま結びの1文に流用できる。investing in prevention today は「先行投資すべき」系論題の共通部品。"
    },
    {
      "en": "In conclusion, while some worry about short-term economic burdens, the case for stronger climate action is overwhelming.",
      "ja": "結論として、短期的な経済負担を懸念する声もあるが、より強力な気候対策を支持する根拠は圧倒的だ。",
      "structure": "In conclusion+while譲歩節+主節。譲歩節は S=some、V=worry。主節は SVC(the case ... is overwhelming)。",
      "grammar": "① In conclusion, while some ~ = 結論冒頭の譲歩(although / while は交替可)。some は単独で「一部の人々」を表す代名詞。worry about+名詞。② short-term economic burdens = ハイフン複合形容詞 short-term(long-term の対)+burdens(可算複数)。③ the case for ~ = 「〜を支持する論拠・言い分」。この case は「事件」ではなく「主張の根拠」。the case for/against は議論エッセイの超重要名詞。④ is overwhelming = 「圧倒的だ」。overwhelm(圧倒する)の現在分詞由来形容詞。証拠・論拠の強さを宣言する結論向きの述語。",
      "writing": "結論の型= In conclusion, while some worry about [反論], the case for [自説] is overwhelming.(keyExpressions 採用済み)。although critics may cite ~ are undeniable(Day27)と並ぶ二大結論テンプレ。the case for X is overwhelming/compelling は覚えた瞬間から使える。"
    },
    {
      "en": "Because the survival of humanity, the unique capacity of governments, and long-term economic logic all demand it, governments should unquestionably do more to combat climate change.",
      "ja": "人類の生存、政府にしかない能力、そして長期的な経済合理性のすべてがそれを求めるのだから、政府は気候変動対策を間違いなくもっと強化すべきだ。",
      "structure": "Because従属節+主節。従属節は3つの名詞句の並列主語+all+V=demand、O=it。主節は S=governments、V=should do、to combat ~ が目的。",
      "grammar": "① Because [A, B, and C] all demand it = 本論3つを名詞句で束ねて all で総括する最終文の型。the survival of humanity(本論1)/ the unique capacity of governments(本論2)/ long-term economic logic(本論3)がそれぞれ段落の要約になっている。並列3項+all は複数扱い→ demand に -s なし。it=より強い対策。② the survival of humanity = survival は of句で特定され the(Day1 グロッサリーと同じ理屈)。humanity は無冠詞。③ unique capacity = 「唯一無二の能力」。本論2の only governments possess を capacity 1語に圧縮した名詞化。④ should unquestionably do more = should+unquestionably(疑問の余地なく)。certainly(Day27)の格上げ副詞。⑤ to combat climate change = 序論の to combat it を完全形で回収し、首尾一貫を見せる。",
      "writing": "最終文の最強テンプレ= Because [本論1の名詞化], [本論2の名詞化], and [本論3の名詞化] all demand it, [主体] should unquestionably ~.。3つの理由を名詞句に圧縮する練習をしておくと、この1文で「構成を制御できている」ことを示せる。Day30 の all demand it と同じ型なので、これがこのコースの卒業技。"
    }
  ],
  "29": [
    {
      "en": "Artificial intelligence is arguably transforming every aspect of modern life, with profound implications for the future.",
      "ja": "人工知能は、将来への深遠な影響をはらみつつ、現代生活のほぼあらゆる側面を変えつつあると言ってよい。",
      "structure": "SVO(現在進行形)。S=Artificial intelligence、V=is transforming、O=every aspect of modern life。with profound implications for the future は付帯状況の前置詞句。",
      "grammar": "① is transforming = 現在進行形「まさに今変えつつある」。進行中の変化を語る序論では完了形より進行形が生きる。transform は change の格上げ(Day1 既出)。② arguably = 「議論の余地はあるが恐らく、間違いなく〜と言ってよい」。断定を一段和らげつつ実質は強く主張する1級の文副詞。be動詞の後が定位置。③ every aspect of ~ = every+単数名詞「あらゆる側面」。each より網羅感が出る。④ with profound implications for ~ = 付帯状況の with「〜という影響を伴って」。implications(影響・含意)は複数形が普通で、for で影響先を示す。profound=deep の格上げ。文末に with句を足すだけで1文の情報量が倍になる。",
      "writing": "序論1文目の型= [技術・現象] is arguably transforming every aspect of modern life, with profound implications for the future.。技術系論題の書き出しはこれで決まり。arguably と with profound implications for は単独でも抜き出して使える高級部品。"
    },
    {
      "en": "Despite widespread anxieties, I firmly believe that AI will ultimately have a positive impact on society, for three key reasons.",
      "ja": "広く不安が存在するにもかかわらず、私はAIが最終的に社会に良い影響を与えると固く信じている。三つの主要な理由による。",
      "structure": "Despite+名詞句(譲歩)+SVO。S=I、V=firmly believe、O=that節(AI will ultimately have ...)。for three key reasons が理由予告。",
      "grammar": "① Despite+名詞句 = 前置詞による譲歩。Although 節より簡潔で、widespread anxieties(広範な不安)の2語で世論の反対を処理できる。× Despite of は頻出ミス。anxieties は「不安の種々」で複数形。② I firmly believe that ~ = テーゼ宣言(既出)。③ will ultimately have = 未来の will+ultimately「最終的には」。短期の混乱を認めつつ長期で肯定する論旨を ultimately 一語が支える。④ have a positive impact on = 「〜に好影響を与える」の最重要コロケーション。impact は可算で a、影響先は on。⑤ for three key reasons = 理由予告(compelling の言い換え手札)。",
      "writing": "テーゼの型= Despite widespread anxieties/concerns, I firmly believe that [お題の言い換え], for three key reasons.(keyExpressions 採用済み)。世間の懸念が強い論題(AI・原発・移民)ほど Despite widespread ~ で先に受け流すと防御が固くなる。have a positive impact on はお題文の benefit society 系の万能言い換え。"
    },
    {
      "en": "First, AI dramatically enhances productivity.",
      "ja": "第一に、AIは生産性を飛躍的に高める。",
      "structure": "SVO。S=AI、V=enhances、O=productivity。dramatically が動詞を修飾。",
      "grammar": "① First, = 本論1の開始標識。② dramatically = 「劇的に、飛躍的に」。程度副詞で動詞の前。greatly の格上げ。③ enhances = enhance「(質・度合いを)高める」(Day27 既出)。主語 AI は単数扱い→三単現の -s。④ productivity = -ity の抽象名詞で不可算・無冠詞。boost/raise/enhance productivity は経済系の鉄板コロケーション。",
      "writing": "3語+副詞の極短トピックセンテンス= S dramatically enhances O。長文が続くエッセイの中で短文の主張は逆に目立つ。enhance productivity / efficiency / quality は技術系・政策系のどこでも使える。"
    },
    {
      "en": "By automating repetitive tasks, it frees workers to concentrate on creative and strategic activities.",
      "ja": "反復作業を自動化することで、AIは労働者を創造的・戦略的な活動に集中できるようにする。",
      "structure": "By+動名詞句(手段)+SVOC。S=it(=AI)、V=frees、O=workers、C=to concentrate ~。",
      "grammar": "① By -ing = 手段の前置き(Day27 既出)。automating repetitive tasks = automate「自動化する」+repetitive「反復的な」+tasks(可算複数)。② frees O to do = 「Oを解放して〜できるようにする」。free が動詞で、enable より「束縛からの解放」のニュアンスが出る(keyExpressions 採用済み)。三単現の -s。③ concentrate on = 「〜に集中する」。on が必須セット。④ creative and strategic activities = 形容詞2並列+複数名詞。repetitive tasks との対比が文の背骨。",
      "writing": "自動化・効率化のメリットは By automating [雑務], it frees [人] to concentrate on [高付加価値の仕事] の1文で完結する。frees ~ to concentrate on は AI に限らず「機械化・外注・制度改革で人が本業に集中できる」系すべてで使い回せる。"
    },
    {
      "en": "For instance, many companies now use AI to handle routine data processing, allowing employees to devote their time to higher-value work and thereby boosting overall efficiency.",
      "ja": "例えば、多くの企業は今や定型的なデータ処理にAIを使い、従業員がより価値の高い仕事に時間を割けるようにし、それによって全体の効率を高めている。",
      "structure": "SVO+分詞構文2連。S=many companies、V=use、O=AI(to handle ~ が目的)。allowing ~ と thereby boosting ~ の2つの分詞構文が and で並列。",
      "grammar": "① For instance, = 具体例標識(既出)。② use AI to do = 「〜するためにAIを使う」。to handle は目的の不定詞。routine data processing = routine(定型の)+不可算名詞句。③ allowing O to do = 結果の分詞構文+allow O to do 構文の合体。「その結果、従業員が〜できるようになり」。devote A to B = 「AをBに捧げる」で to は前置詞(devote their time to work)。④ thereby boosting = thereby「それによって」+分詞構文。因果の連鎖(AI導入→時間が空く→効率向上)を1文で3段跳びさせる高等技。⑤ higher-value work = 比較級入りハイフン複合形容詞。overall efficiency = 「全体の効率」で不可算。",
      "writing": "分詞構文2連発の型= ..., allowing [人] to devote their time to ~ and thereby boosting ~。thereby+-ing は「それがさらに〜につながる」と因果を一段延長する接着剤で、字数を稼ぎつつ論理も締まる1級の飛び道具。丸ごと1文テンプレ化推奨。"
    },
    {
      "en": "Second, AI is revolutionizing healthcare.",
      "ja": "第二に、AIは医療に革命をもたらしている。",
      "structure": "SVO(現在進行形)。S=AI、V=is revolutionizing、O=healthcare。",
      "grammar": "① Second, = 本論2の開始標識。② is revolutionizing = 現在進行形「いままさに革命を起こしつつある」。revolution の動詞化 revolutionize は transform のさらに格上げ。進行形が「進行中の地殻変動」を演出する(序論の is transforming と同じ発想)。③ healthcare = 「医療(制度)」は不可算・無冠詞の1語。health care と2語でも可だが表記は統一する。",
      "writing": "3語のトピックセンテンス= S is revolutionizing [分野]。change→transform→revolutionize の格上げ階段は覚えておき、本論ごとに使い分けると語彙の幅を示せる。医療は技術系論題の3大具体分野(仕事・医療・教育)の1つ。"
    },
    {
      "en": "Advanced algorithms can detect diseases such as cancer at early stages with remarkable accuracy, often surpassing human specialists.",
      "ja": "高度なアルゴリズムは、がんなどの病気を早期に驚くべき精度で発見でき、しばしば人間の専門家を上回る。",
      "structure": "SVO+分詞構文。S=Advanced algorithms、V=can detect、O=diseases(such as cancer が例示)。at early stages と with remarkable accuracy が様態の前置詞句。often surpassing ~ が文末分詞構文。",
      "grammar": "① Advanced algorithms = 過去分詞由来形容詞+可算複数。無冠詞複数の総称。② can detect = 能力の can+detect「検出する」(find の格上げ)。③ diseases such as cancer = 例示の such as(既出)。cancer は病名で不可算・無冠詞。④ at early stages = 「早期の段階で」。at+stage のセット。⑤ with remarkable accuracy = with+抽象名詞で様態の副詞句(=remarkably accurately)。accuracy は不可算。この with+名詞への言い換えは1級の文体技。⑥ often surpassing ~ = 文末分詞構文「しばしば〜を上回りながら」。surpass=「凌駕する」は be better than の一語格上げ。",
      "writing": "性能を語る型= [技術] can detect/perform ~ with remarkable accuracy, often surpassing human [専門家]。with+抽象名詞(with ease / with precision)と surpassing human experts は技術礼賛系の必須部品。数値データなしでも説得力が出る書き方として丸ごと確保。"
    },
    {
      "en": "Consequently, AI enables earlier treatment and saves countless lives, contributing significantly to public welfare.",
      "ja": "その結果、AIはより早い治療を可能にし、無数の命を救い、公共の福祉に大きく貢献する。",
      "structure": "SVO2連+分詞構文。S=AI、V1=enables(O=earlier treatment)、V2=saves(O=countless lives)の並列。contributing significantly to ~ が文末分詞構文。",
      "grammar": "① Consequently, = 結果の接続副詞(既出)。② enables earlier treatment = enable+名詞目的語「〜を可能にする」(enable O to do 型と両方使える)。earlier は比較級「(発見が早い分)より早期の」。treatment は不可算。③ saves countless lives = countless=「数え切れないほどの」。life は「命」の意味で可算→ lives。save lives は医療系の鉄板。④ contributing significantly to ~ = 分詞構文+contribute to(既出)+significantly。public welfare = 「公共の福祉」で不可算(keyExpressions 採用済み)。",
      "writing": "効果まとめ文= S enables [成果1] and saves countless lives, contributing significantly to ~。動詞2連+分詞構文の3段構成で1文に成果を詰める型。contributing significantly to は効果を述べる万能の締め部品としてどの本論にも接続できる。"
    },
    {
      "en": "Finally, AI broadens access to education.",
      "ja": "最後に、AIは教育へのアクセスを広げる。",
      "structure": "SVO。S=AI、V=broadens、O=access to education。",
      "grammar": "① Finally, = 本論3の開始標識。② broadens = broad の動詞化(-en。strengthen と同じ派生)。「広げる」。三単現の -s。③ access to = 「〜への利用機会」。to が必須セットで、access は不可算(× an access / × accesses)。access to education / healthcare / information は社会系論題の最重要名詞句。",
      "writing": "格差是正系の論点は broaden/expand access to [資源] の型で立てる。education へのアクセスは技術系論題の3大分野の最後の1つ。動詞+access to のコロケーション(broaden / expand / democratize access to)をセットで暗記。"
    },
    {
      "en": "Intelligent tutoring systems can tailor lessons to each learner's pace and needs, regardless of location or income.",
      "ja": "知的な個別指導システムは、場所や収入に関わらず、各学習者のペースとニーズに合わせて授業を調整できる。",
      "structure": "SVO。S=Intelligent tutoring systems、V=can tailor、O=lessons。to each learner's pace and needs が調整先。regardless of ~ が副詞句。",
      "grammar": "① Intelligent tutoring systems = 無冠詞複数の総称。tutoring は動名詞の形容詞的用法「個別指導の」。② tailor A to B = 「AをBに合わせて仕立てる」。服の仕立て屋(tailor)の比喩で、customize の格上げ。tailor lessons to / tailor services to が定番。③ each learner's = each+単数名詞+所有格「一人ひとりの学習者の」。every より個別性が強い。pace and needs の needs は「ニーズ」の意味では常に複数形。④ regardless of location or income = regardless of(既出)+無冠詞の抽象名詞2つ。or での並列は「どちらであっても」。",
      "writing": "個別最適化の型= [システム] can tailor [サービス] to each [利用者]'s pace and needs, regardless of ~。tailor A to B と regardless of location or income は教育・医療・行政サービス系の論題で組み合わせて使える。「貧富・地理の壁を超える」はデジタル系メリットの定番第3の矢。"
    },
    {
      "en": "Therefore, students in remote or disadvantaged areas can receive personalized instruction that was once available only to a privileged few.",
      "ja": "したがって、遠隔地や恵まれない地域の生徒も、かつては一部の特権層にしか得られなかった個別指導を受けられる。",
      "structure": "SVO。S=students(in remote or disadvantaged areas が修飾)、V=can receive、O=personalized instruction。that was once available ~ が関係詞節。",
      "grammar": "① Therefore, = 本論の結び(既出)。② remote or disadvantaged areas = remote(遠隔の)+disadvantaged(恵まれない=過去分詞由来の婉曲形容詞)。poor と書かずに disadvantaged と書くのが現代の作法。③ personalized instruction = 過去分詞形容詞+不可算名詞「個別化された指導」。④ that was once available only to ~ = 関係詞節内の過去形+once「かつては」が、主節の現在(can receive)と時間対比を作る。available to = 「〜が利用できる」の to。⑤ a privileged few = 「少数の特権層」。few が名詞化し a が付く特殊形(the chosen few と同族)。only とセットで排他性を強調。",
      "writing": "民主化の型= [恵まれない層] can receive [サービス] that was once available only to a privileged few.。「昔は金持ちだけのものが今は皆のもの」という時間対比の関係詞節は、技術・教育・医療の平等化を語る場面の決め文。a privileged few は語彙点を稼ぐ美しい名詞句。"
    },
    {
      "en": "In conclusion, while it is true that AI poses certain risks, its benefits far outweigh its dangers.",
      "ja": "結論として、AIが一定のリスクをもたらすのは事実だが、その利点は危険をはるかに上回る。",
      "structure": "In conclusion+while譲歩節+主節。譲歩節は it is true that ~ の形式主語構文。主節は SVO(its benefits far outweigh its dangers)。",
      "grammar": "① while it is true that ~ = 「〜は事実だが」。形式主語 it+true+that節で反論を一度全面的に認める、最も譲歩らしい譲歩(keyExpressions 採用済み)。② poses certain risks = pose a risk/threat「リスクをもたらす」の重要コロケーション。certain は「一定の」(Day26 既出)。③ its benefits far outweigh its dangers = Day1 の benefits outweigh the costs と同じ天秤構文+強調の far。its を両側に置いて対称を作る。benefits / dangers とも可算複数で数を揃える。",
      "writing": "結論の型= In conclusion, while it is true that X poses certain risks, its benefits far outweigh its dangers.。譲歩と反論を1文で畳むこの必殺型は、リスクが指摘されがちな技術・政策系の結論でそのまま使える。benefits outweigh は英検1級エッセイの通貨なので far とセットで常用。"
    },
    {
      "en": "Because it raises productivity, advances medicine, and democratizes learning, artificial intelligence will undoubtedly have a positive impact on society.",
      "ja": "生産性を高め、医療を進歩させ、学びを民主化するのだから、人工知能は間違いなく社会に良い影響を与えるだろう。",
      "structure": "Because従属節(動詞3並列)+主節。従属節は S=it、V=raises / advances / democratizes の3並列。主節は S=artificial intelligence、V=will have、O=a positive impact。",
      "grammar": "① Because it [V1], [V2], and [V3] = 本論3本を動詞句で束ねる最終文(Day27 と同型)。raises productivity(本論1)/ advances medicine(本論2)/ democratizes learning(本論3)と各段落が動詞+名詞2語に圧縮されている。3つとも三単現の -s で形を統一。② democratizes = democracy の動詞化「民主化する=誰でも使えるようにする」。broaden access to の1語言い換えで、この動詞が使えると強い。③ will undoubtedly have = will+undoubtedly「疑いなく」。unquestionably(Day28)と交替可能な断言副詞。④ a positive impact on society = 序論のテーゼを一言一句レベルで回収し首尾一貫を示す。⑤ 主語を AI から artificial intelligence に開いて最終文に正式感を出す。",
      "writing": "最終文= Because it [動詞1], [動詞2], and [動詞3], [主語の正式名] will undoubtedly ~.。本論を「動詞+目的語」2語ずつに圧縮する練習はこのコース最重要の仕上げ技。略称(AI)で通した主語を最終文でフルネームに戻すのも上品な締めの小技。"
    }
  ],
  "30": [
    {
      "en": "In an increasingly interconnected world, the responsibilities of wealthy nations toward poorer ones are frequently debated.",
      "ja": "ますます相互に結びつく世界において、豊かな国の貧しい国に対する責任はしばしば議論される。",
      "structure": "前置詞句(舞台設定)+SV(受動)。S=the responsibilities(of wealthy nations toward poorer ones が修飾)、V=are debated(受動)。frequently が頻度副詞。",
      "grammar": "① In an increasingly interconnected world = 副詞 increasingly が過去分詞由来形容詞 interconnected を修飾する冒頭句(keyExpressions 採用済み)。an は「一つの世界」というより形容詞付き単数名詞の標準の冠詞。② the responsibilities of A toward B = 「AのBに対する責任」。責任の相手は toward(または to)。of句で特定されるので the。responsibilities は複数の責務を指し複数形。③ poorer ones = ones は nations の反復回避の代名詞。比較級 poorer は wealthy との対比。④ are frequently debated = 受動態。議論する主体(世間)をぼかしてお題を中立に提示(Day1 の There is much debate と同じ機能)。frequently は be動詞と過去分詞の間が定位置。",
      "writing": "序論1文目= In an increasingly interconnected world, the responsibilities of A toward B are frequently debated.。国際系お題の最強オープナー。There is much debate over whether(Day1)/ has gained renewed importance(Day27)と並ぶ第3の序論型として、the ~ of A are frequently debated の受動言い換えを覚える。"
    },
    {
      "en": "I firmly believe that developed nations should do more to help developing nations, for three compelling reasons.",
      "ja": "私は、先進国が途上国をもっと支援すべきだと固く信じている。説得力のある三つの理由による。",
      "structure": "SVO。S=I、V=firmly believe、O=that節(developed nations should do more ...)。to help ~ は目的の不定詞。for three compelling reasons が理由予告。",
      "grammar": "① I firmly believe that ~, for three compelling reasons = テーゼ宣言+理由予告(いずれも既出の完成形)。② developed nations ⇔ developing nations = 過去分詞(発展し終えた)と現在分詞(発展途上の)の対。この分詞の使い分け自体が頻出ポイント。どちらも無冠詞複数の総称。③ should do more to help = お題の do more for を do more to help と不定詞で言い換え。should はお題の Should を受ける。",
      "writing": "序論2文目はこのコースの標準装備そのまま。developed/developing nations の分詞対比は書き間違えると痛いので、developed=先進・developing=途上を体に入れる。お題の for the developing world → to help developing nations のような前置詞→不定詞の言い換えも真似る。"
    },
    {
      "en": "First, developed nations bear a moral responsibility to assist those in need.",
      "ja": "第一に、先進国には困っている者を助ける道徳的責任がある。",
      "structure": "SVO。S=developed nations、V=bear、O=a moral responsibility。to assist ~ は responsibility を修飾する不定詞の形容詞的用法。those in need が assist の目的語。",
      "grammar": "① First, = 本論1の開始標識。② bear a responsibility = 「責任を負う」。have の格上げで、bear a burden / bear the cost と同族(keyExpressions 採用済み)。責任は1つの責務として a。moral responsibility=道徳的責任。③ to assist = responsibility to do「〜する責任」の不定詞。assist=help の格上げ。④ those in need = 「困窮している人々」。those=people の代名詞用法+in need(困って)。the poor と言わずに済む上品な定型句。",
      "writing": "倫理で攻める本論1= [主体] bear(s) a moral responsibility to assist those in need.。道徳的義務を根拠にする論題(援助・動物福祉・環境)の1行目テンプレ。those in need / those affected / those left behind の those+修飾句シリーズは人を指す腕前を見せる部品。"
    },
    {
      "en": "Much of their prosperity was historically built upon resources and labor drawn from poorer regions.",
      "ja": "その繁栄の多くは、歴史的に、貧しい地域から引き出した資源と労働の上に築かれた。",
      "structure": "SV(受動)。S=Much of their prosperity、V=was built(受動・過去)。upon resources and labor が土台、drawn from poorer regions が過去分詞の後置修飾。",
      "grammar": "① Much of their prosperity = prosperity は不可算なので量は much で受ける(× many of)。their=developed nations'。② was historically built upon = 過去形+受動態。歴史的事実を語るので過去形、築いた主体を明示しないので受動。built upon(〜の上に築かれた)は build on の格式形で、基盤の比喩。historically は be と過去分詞の間。③ resources and labor = resources(複数)+labor(不可算「労働力」)。④ drawn from ~ = draw(引き出す)の過去分詞による後置修飾。resources and labor (that were) drawn from の関係詞+be 省略(Day1 の spent と同じ型)。poorer regions は比較級+複数。",
      "writing": "歴史的経緯で殴る型= Much of their [現在の資産] was historically built upon [搾取的な過去].。過去分詞の後置修飾 drawn from はこの文体の核なので、funds drawn from / knowledge drawn from と応用して使う。歴史責任論は援助・賠償・環境負担系の論題で強力な理由になる。"
    },
    {
      "en": "For instance, many former colonial powers grew rich through exploitation, demonstrating that meaningful aid today is not mere generosity but a just repayment of historical debt.",
      "ja": "例えば、多くの旧植民地大国は搾取によって富を得ており、今日の意味ある援助が単なる寛大さではなく、歴史的負債の正当な返済であることを示している。",
      "structure": "SVC+分詞構文。S=many former colonial powers、V=grew、C=rich。through exploitation が手段。demonstrating that ~ が文末分詞構文で、that節内は not A but B の対句。",
      "grammar": "① For instance, ~, demonstrating that ~ = 例→教訓の型(もはや常連につき簡潔に)。② former colonial powers = former「かつての」(Day1 既出)+colonial powers「植民地大国」。この power は「大国」の意味で可算。③ grew rich = grow+形容詞「〜になる」(Day27 grow more interconnected と同じ)。過去の事実なので過去形 grew。through exploitation = 手段の through+不可算名詞。④ not mere generosity but a just repayment = not A but B(Day27 not merely as A but as B の名詞版)。mere=「単なる」は形容詞で名詞の前のみ。just はここでは形容詞「正当な」(justice の親戚)で、副詞の just と混同しない。repayment は「返済(行為)」で a を付けて1件の返済と見立てる。of historical debt = debt(負債)はここでは概念的に不可算。",
      "writing": "再定義の決め技= [行為] is not mere [矮小化された見方] but a just [格上げされた本質].(keyExpressions 採用済み)。援助=施しではなく返済、税=負担ではなく投資、のように相手の枠組みごとひっくり返す1文は本論の核弾頭になる。just(正当な)の形容詞用法も1級らしい語彙。"
    },
    {
      "en": "Second, supporting developing nations promotes global stability, from which everyone benefits.",
      "ja": "第二に、途上国の支援は地球規模の安定を促し、それは誰にとっても恩恵となる。",
      "structure": "SVO+前置詞付き関係詞節。S=動名詞句 supporting developing nations、V=promotes、O=global stability。, from which everyone benefits が非制限用法の関係詞節。",
      "grammar": "① Second, = 本論2の開始標識。② supporting developing nations = 動名詞句主語(単数扱い→ promotes)。③ promotes global stability = promote「促進する」+stability(不可算)。④ , from which everyone benefits = カンマ付き(非制限)の前置詞+関係代名詞。benefit from の from が前に出た形で、Day27 の a more stable world from which it also benefits と同じ構文の非制限版。「安定→そこから皆が得をする」と波及を1節で示す(keyExpressions 採用済み)。everyone は単数扱い→ benefits に -s。",
      "writing": "波及効果の型= [行為] promotes [公共財], from which everyone benefits.。トピックセンテンスに関係詞節を足すだけで「メリットの受益者は全員」まで一気に言える。from which everyone benefits は丸ごと暗記部品として、安定・平和・信頼・環境など公共財系の名詞の後ろに接続する。"
    },
    {
      "en": "Poverty and inequality often breed conflict, mass migration, and the spread of disease.",
      "ja": "貧困と格差はしばしば紛争、大量移民、病気の蔓延を生む。",
      "structure": "SVO。S=Poverty and inequality の並列、V=breed、O=conflict, mass migration, and the spread of disease の3並列。",
      "grammar": "① Poverty and inequality = 不可算抽象名詞2つの並列主語。複数扱い→ breed に -s なし。② breed = 「(動物が)繁殖する」から転じて「(悪いものを)生む・温床になる」。cause の格上げで、poverty breeds crime が古典的コロケーション。often で断定を回避(Day26 既出)。③ 目的語3並列 = conflict(不可算)/ mass migration(mass=大量の+不可算)/ the spread of disease(spread は of句で特定され the。disease は病気一般で不可算)。名詞の性格がばらばらでも並列可。",
      "writing": "因果の型= [根本悪] often breed(s) A, B, and C.。breed は「貧困・無知・不信が〜の温床になる」系の論理で使うと1級らしさが出る。conflict / mass migration / the spread of disease の3点セットは国際不安定要素の定番リストとしてそのまま使える。"
    },
    {
      "en": "Therefore, by funding education, healthcare, and infrastructure abroad, developed nations help create a safer and more peaceful world for all.",
      "ja": "したがって、海外の教育・医療・インフラに資金を出すことで、先進国はすべての人にとってより安全で平和な世界を築く手助けをする。",
      "structure": "Therefore+by動名詞句+SVO。S=developed nations、V=help create(help+原形)、O=a safer and more peaceful world。for all が受益者。",
      "grammar": "① Therefore, by funding A, B, and C abroad = Day27 の by funding clean water, healthcare, and disaster relief abroad とほぼ同一の型。education / healthcare / infrastructure はいずれも不可算・無冠詞。② help create = help+原形不定詞(Day27 helps address で既出)。③ a safer and more peaceful world = 比較級2連(-er 型と more 型の混在は Day26 既出)+可算単数 world に a。④ for all = 「万人のために」。all が単独で「全員」を表す簡潔な締め。",
      "writing": "by funding [公共財3つ] abroad, [主体] help(s) create a safer and more peaceful world for all は国際協力系の万能クロージング。Day27 との重複が示す通り、この型は覚えれば複数のお題で再演できる。文末の for all の2語は安く見えて答案の格を上げる。"
    },
    {
      "en": "Finally, such assistance ultimately benefits the donors themselves.",
      "ja": "最後に、こうした支援は最終的に援助国自身にも利益をもたらす。",
      "structure": "SVO。S=such assistance、V=benefits、O=the donors themselves。ultimately が副詞。",
      "grammar": "① Finally, = 本論3の開始標識。② such assistance = 前段までの支援を such で受ける(Day28 such efforts と同じ結束技)。assistance は不可算→単数扱いで benefits に -s。③ benefits = ここでは動詞「〜に利益を与える」。名詞の benefit と品詞両用である点に注意。ultimately「巡り巡って最終的に」(Day27 既出)が因果の距離を示す。④ the donors themselves = donor「援助国・提供者」+再帰代名詞の強調用法「他ならぬ援助側自身」(Japan itself / human survival itself と同じ技の3回目)。the は文脈上特定される援助国。",
      "writing": "本論3の「実は自分も得」転回= Finally, such [行為] ultimately benefits the [行為者] themselves.。Day27 と同じ布陣で、賛成論の第3の矢は自己利益で締めるのが鉄板だと体で覚える。themselves の強調は1文の説得力を確実に1段上げる。"
    },
    {
      "en": "As developing economies grow, they become valuable trading partners and expanding markets.",
      "ja": "途上国経済が成長すれば、貴重な貿易相手や拡大する市場となる。",
      "structure": "As従属節+SVC。従属節は S=developing economies、V=grow。主節は S=they、V=become、C=valuable trading partners and expanding markets の並列。",
      "grammar": "① As S V = 「〜するにつれて」の比例の as(Day27 序論と同じ)。② developing economies = economy は「経済圏・国」の意味で可算→複数。developing の現在分詞形容詞(既出)。③ become+名詞補語 = 補語の名詞は主語 they(複数)に合わせて複数形(partners / markets)。④ valuable trading partners = trading は動名詞の形容詞用法「貿易の」。expanding markets = 現在分詞「拡大しつつある」。-ing 2種(動名詞用法と現在分詞用法)が1文に同居している。",
      "writing": "成長の好循環文= As [相手] grow(s), they become valuable partners and expanding markets.。援助・教育・投資の「相手が育てば市場になる」ロジックは経済系の本論3で常用できる。as の比例用法は when より変化の連動が出る。"
    },
    {
      "en": "Consequently, well-directed aid functions not merely as charity but as a strategic investment that yields substantial long-term returns.",
      "ja": "その結果、的を絞った援助は単なる慈善ではなく、長期的に大きな見返りを生む戦略的投資として機能する。",
      "structure": "SV+not A but B の対句。S=well-directed aid、V=functions、not merely as charity but as a strategic investment の対比。investment を that yields ~ の関係詞節が修飾。",
      "grammar": "① Day27 第11文とほぼ同一の文(well-designed→well-directed、long-term economic returns→substantial long-term returns)。構文解説はそちらの通り: functions not merely as A but as B+関係詞節 that yields ~。② well-directed = 「的確に方向づけられた」。well-+過去分詞シリーズの一員。③ substantial = 「相当な、実質的な」。considerable の言い換え手札。returns は複数形(既出)。",
      "writing": "同じ必殺文が Day27 と Day30 で再登場している事実こそが最大の教訓で、functions not merely as charity but as a strategic investment は一度暗記すれば複数の本番お題で使い回せる「持ち込み可能な完成部品」。well-designed / well-directed、considerable / substantial のような微差の言い換えだけ用意しておけば使い回しはバレない。"
    },
    {
      "en": "In conclusion, although some argue that nations should prioritize their own citizens, the advantages of helping developing nations are undeniable.",
      "ja": "結論として、自国民を優先すべきだと主張する者もいるが、途上国を助ける利点は紛れもない。",
      "structure": "In conclusion+although譲歩節+主節。譲歩節は S=some、V=argue、O=that節(nations should prioritize ...)。主節は SVC(the advantages ... are undeniable)。",
      "grammar": "① although some argue that ~ = 譲歩節に反論の中身を that節で丸ごと収める型。Day27 の critics may cite+名詞句より一歩踏み込み、反対派の主張を文の形で紹介できる。some=「一部の人々」(Day28 既出)。② prioritize their own citizens = prioritize「優先する」は put ~ first の一語格上げ。their own(自分たち自身の)は所有格+own の強調(Day27 Japan's own と同じ)。③ the advantages of helping ~ are undeniable = of+動名詞で「助けることの利点」。undeniable の断言(Day27 既出)。",
      "writing": "結論テンプレの最終形= In conclusion, although some argue that [反論をthat節で], the advantages of -ing are undeniable.(keyExpressions 採用済み)。critics may cite+名詞句(Day27)/ some worry about+名詞句(Day28)/ some argue that+節(Day30)の3バリエーションを持てば、どの結論も同じ骨で書ける。"
    },
    {
      "en": "Because moral duty, global stability, and mutual prosperity all demand it, developed nations should certainly do more to support the developing world.",
      "ja": "道徳的義務、地球規模の安定、そして相互の繁栄のすべてがそれを求めるのだから、先進国は確かに途上国世界をもっと支援すべきだ。",
      "structure": "Because従属節+主節。従属節は3つの名詞句の並列主語(moral duty / global stability / mutual prosperity)+all+V=demand、O=it。主節は S=developed nations、V=should do、to support ~ が目的。",
      "grammar": "① Because [A, B, and C] all demand it = Day28 と同じ最終文型。本論1=moral duty(道徳的責任)、本論2=global stability(安定)、本論3=mutual prosperity(相互利益)が各2語の名詞句に圧縮されている。Day28 が the survival of humanity と of句込みだったのに対し、こちらは形容詞+名詞2語で軽量化した改良版。3項並列+all→複数扱いで demand は原形。② mutual = 「相互の」。win-win を1語で言う形容詞。③ should certainly do more to support = テーゼの最終再宣言(Day27 should certainly increase と同じ)。the developing world = 「途上国世界」全体を単数の the+形容詞+world で束ねる言い方。developing nations の言い換えとして最終文で表記を変えるのも芸。",
      "writing": "総まとめの最終文= Because [名詞句1], [名詞句2], and [名詞句3] all demand it, [主体] should certainly ~.。tip にある通りこの all demand it が30日コースの卒業技で、本論3つを2語ずつに圧縮→all demand it→テーゼ再宣言、の流れを体に叩き込めばどんな論題でも結論は30秒で書ける。"
    }
  ]
};
