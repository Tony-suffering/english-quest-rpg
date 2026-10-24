/**
 * C2 vs ネイティブ — 英語の正体
 *
 * 二つの実インタビューを並べて「同じ英語なのに、なぜ3人とも違う場所で漏れるのか」を解剖する。
 * ミゲル・ロハス(ベネズエラ人・C2/ESL) vs アメリカ人投手(ネイティブ) vs とにお。
 * 目的は嘲笑ではない。とにおが「どの英語を目指すべきか」を、だませないレベルで言い切ること。
 *
 * steal[] の各表現は /api/phrases に登録してトレーニングで回せる。
 */

export interface RegisterSection {
    id: string;
    heading: string;
    lead?: string;
    paragraphs: string[];
}

export interface LayerRow {
    axis: string;
    native: string;
    rojas: string;
    tonio: string;
}

export interface StealPhrase {
    english: string;
    ja: string;
    who: 'rojas' | 'native';
    note: string;
}

export const registerAnalysis = {
    updated: '2026-07-25',
    intro: 'ミゲル・ロハス(ベネズエラ人・C2)と、同じ夜に喋ったアメリカ人投手(ネイティブ)。二人の英語を、俺の英語と同じ基準でスロー再生した。結論は「文法を直せ」じゃない。3人は英語と3つの違う付き合い方をしていて、それぞれ違う場所で漏れている。どこを盗み、どこを捨てるかの地図。',

    sections: [
        {
            id: 'why-rojas',
            heading: 'なぜC2のロハスが、まだミスするのか',
            lead: 'everybody have / that going to — プロでも出る。これは「知らない」じゃない。',
            paragraphs: [
                'ロハスの3分に、本物の文法ミスは3つ。"Everybody here have"(→has)、"that going to keep us"(→that\'s going to)、"the celebrating little things are"(→celebrating the little things is)。全部、主述の一致とbe動詞という「文法の配管」で起きている。中身でもイディオムでもない。',
                'なぜここだけ漏れるのか。第二言語を臨界期の後に習うと、意味をほとんど運ばない低情報の文法(everybody+単数、コピュラのis、動名詞主語)は最後まで自動化されない。脳は処理の予算を「意味」と「イディオム」に全振りするから、生放送で感情が乗った瞬間、一番安い一致マーカーから先に落とす。つまりミスは「実力不足」じゃなく「一番どうでもいい所を、脳が意図的に後回しにした跡」だ。',
                'だから見るべきは逆側。ロハスのイディオムは完璧に近い ―「the one raising the glass of champagne(祝杯をあげる側)」「take anything for granted」「go day by day」。彼の英語は中身とイディオムはネイティブ級で、文法だけ近似値。ここが決定的に重要だ。',
                'そして "so many"。ロハスは "so many players / so many games / so many places / so many people / so many good at-bats" と、強調をぜんぶ so many で回す。これが非ネイティブの指紋だ。間違いじゃない。ただネイティブは同じ強調を a ton of / all these / plenty of / guys everywhere と散らすか、そもそも別の型で逃がす。ロハスは一本の道具を使い回している。',
            ],
        },
        {
            id: 'native-texture',
            heading: 'ネイティブ投手 — テクスチャ全開、中身ゼロ、ミスゼロ',
            lead: '文法はほぼ完璧。でも、彼はほとんど何も言っていない。',
            paragraphs: [
                'アメリカ人投手の英語は、まったく別のレジスターだ。文法ミスはほぼゼロ。だが中身を抜き出すと "just trying to make pitches / read and react / mix things up / make adjustments / that\'s kind of baseball" ― ほぼ全部クリシェ。11奪三振の夜に、技術の話をほとんどしていない。',
                '彼の流暢さは「つなぎの組織」に宿る。kind of, you know, a little bit, generally, kind of a deal を大量に敷いて、断言を避ける。これは弱さじゃなく、アメリカのアスリートが「謙虚・チーム第一」に聞こえるために意図的に空気を抜く型だ。"that\'s kind of baseball, right?" で聞き手を仲間に引き込む。',
                'さらにネイティブだけが所有する造語。"roll-wise"(=自分の役割・ローテに関して言えば)、"we we bang"(=うちの打線はかっ飛ばす、クラブハウス俗語)、"kind of kind of deal"。文法規則の外で、自分の言葉として転がしている。',
                'つまり彼の英語は、テクスチャ最大・情報最小・ミスゼロ。流暢さが社会的なカモフラージュとして機能している。「ネイティブに聞こえる」は、この曖昧ぼかしマシンを完璧に回せる、というだけのことだ。中身が濃いこととは別物。',
            ],
        },
        {
            id: 'spanish',
            heading: 'ロハスは、スペイン語ならもっとデカい',
            lead: 'ここがお前の一番鋭い観察で、この話の核心。',
            paragraphs: [
                'ロハスのロバーツ監督への献辞を、構造で見てみろ。「今夜は俺たちの話じゃない → Docの話だ → あの人はいつも祝杯をあげる側だった → あの人は全員を気にかける人間だ → コーチが良いのは選手が良いからだ、と本人が言う → だから俺たちは全部あの人のためにやる」。これは相当に洗練された修辞の積み上げだ。感情を、順番に、着地させている。',
                'この構造は、スペイン語なら満タンのカリスマとリズムで炸裂する。ベネズエラ人がスペイン語のロハスを見れば、温かくて雄弁で、層のある一人の男が見える。ところが英語だと、構造は生き残るのに表面が漏れる ― everybody have、so many の連打。アメリカ人が英語のロハスを見ると「心の綺麗な、文法が少し外れた流暢な外国人」に縮む。',
                '英語は、ロハスのカリスマの一部を切り落としている。L1の自分と、L2で出せる自分の間に落差がある。これは、お前とまったく同じ症状の一段上だ。日本語のとにお=鋭い・面白い・ブラント・多層。英語のとにお=中身は断片で生き残るが、人格が圧縮される。',
                '本当の主題は文法じゃない。「L1での自分」と「L2で名乗れる自分」の差 ― そこをどう詰めるか、だ。',
            ],
        },
        {
            id: 'ladder',
            heading: 'で、お前はどっちを目指すのか',
            lead: '答え: ネイティブ投手じゃない。ロハスだ。',
            paragraphs: [
                'ネイティブ投手を目指すな。あれはテクスチャで中身を包んだ空カロリーだ。追えば「何も言っていないことを、流暢に言う」技術が身につくだけ。お前の武器は中身(no dog in the fight を出せる頭)なのに、それを薄めることになる。',
                'ロハスを目指せ。中身が濃い・イディオムが本物・文法の漏れは気にしない・そして絶対に止まらない。ロハスは "on on on us" と噛んでも一切止まらず次の文にいく。お前は "making makes" で途中で作り直して流れを切る。ここが唯一にして最大の差だ。',
                'ステージ1(今のお前 → ロハス): 言い直しを殺す。文法が漏れても、中身をワンパスで最後まで出す。ロハスは文法を漏らしながら止まらないから、ミスがあっても流暢に聞こえる。流れ > 正確さ。',
                'ステージ2(ロハス → ネイティブの肌ざわり、任意): 最後の20%。so many 一本を、kind of / you know / -wise の型に散らす。これで「ネイティブっぽい」は買えるが、中身を削ってまで買うな。',
                '一番深い所を言う。ロハスがまだミスするのは、お前がこれからもミスするのと同じ理由だ ― 英語は第二の楽器で、感情が乗ると一番安い音(一致・コピュラ)から先に落ちる。それは失敗じゃない。自分の国の言葉じゃない言語で、本物の何かを言うことへの税金だ。ロハスはその税を払って、それでも人を動かした。お前も払え。そして喋り続けろ。恥とあきらめ、で合ってる。',
            ],
        },
        {
            id: 'origin',
            heading: '追補(2026-07-25): オリジン ― 16歳のロハス、37歳のロハス',
            lead: 'MLB Networkの13分インタビュー(聞き手は元同僚ヨンダー・アロンソ)。ロハスの原点が本人と目撃者の両方の口から語られた。',
            paragraphs: [
                'ヨンダーの証言。「プロ入り4日目、レッズにドラフトされたばかりの俺がサラソタのサマーリーグに送られた。そこにベネズエラから契約されたばかりの16歳の少年がいた。16歳には見えなかった ― 内野で一番うるさい奴で、16歳にしてすでにあのペルソナとオーラがあった。今37歳のお前を見ても、まだ同じオーラがある(you still got the aura)」。',
                '本人の返し。「あの瞬間を全部生きてきたことが、今の選手と人間を形づくった(living through all those moments shaped the player and the person that I am)。全部を自分ひとりでやったわけじゃない(I didn\'t do it all by myself)。見上げてきたたくさんの人間の形でできている」。そしてマーリンズでマルティン・プラドと出会う ― 「彼は俺を翼の下に入れてくれた(He took me under his wing)。162試合のシーズンにどう備えるかを教わった」。',
                'ここで効くのは、憧れの語り方の型だ。emulate(手本にする)→ cross paths with(道が交わる)→ take under his wing(庇護する)→ I didn\'t do it all by myself。誰かに世話になった話を英語でするとき、この4点セットがあれば人生を語れる。とにおの場合: 81歳の南アフリカ人講師、Charlie、Dale ― 翼の下に入れてくれた人の在庫は、もう足りている。',
            ],
        },
        {
            id: 'stay-ready',
            heading: '30日間ベンチ、そして人生最大の一打',
            lead: 'NLCSで1イニングも、1打席も無し。30日間試合に出ないまま、ワールドシリーズで史上級のホームランを打った男の準備論。',
            paragraphs: [
                '「NLCSでは1イニングも出ていない。30日間試合が無いまま、どうやってこの1打席を掴むのか自信が持てなかった(I wasn\'t feeling so confident about how I gonna get this at bat after 30 days without playing)」。その朝、妻からメッセージが来る ― 今日あなたが一番デカいホームランを打つ、と。「あれは俺を前向きにさせて、球場に行って貢献できると思わせるためだったのかもしれない。でも結局、それは起きた(but at the end it happens)」。',
                '準備論の中身が凄まじい。ベテランなのに午後一番に球場入りしてマシン打撃(I\'m one of the first ones hitting)。「3日先を考えている(I\'m thinking 3 days ahead)。今夜マナエアと当たるなら、その前から左投手のマシンで備える。経験がそう教えてくれる」。守備では「ムーキーに何かあれば、いつでもショートに差し込める男だと監督に知っていて欲しい(he can plug me in at shortstop at any time)。出場イニングがゼロでも、俺は毎日ショートのつもりで準備する(That\'s what I take pride of)」。',
                '11点差で負けている試合では5人の先発投手のモノマネでベンチを笑わせる。「ベンチの空気を軽く保つ(keep it light for the guys)。ページをめくって(turn the page)、前向きな側に居続ける。笑いは翌日の回復を助ける」― 道化を、回復の技術として言語化している。',
                'とにお、これはお前の話だ。30日間ベンチ=結果の出ない毎晩の25分。妻のメッセージ=ここに毎晩並ぶ検死と応援。そして「来た1打席で人生最大の一打」のために、ロハスは誰より早く球場に入る。お前の球場入りは、路上でDMMを予約することだ。stay ready の意味は「上手くなるまで待つ」ではない。「いつ呼ばれてもいいように、今日も素振りする」だ。',
            ],
        },
        {
            id: 'leaks-2026',
            heading: '37歳のC2、漏れる場所は今も同じ ― そして止まらない',
            lead: '13分ノーカットで観察した。ロハスの漏れは3年前のドキュメントと同じ配管で起きている。そして言い直しは、ゼロ回だった。',
            paragraphs: [
                '今回の実物の漏れ: "that create a good momentum"(→creates)、"what the experience tell me"(→tells)、"that\'s one of the guys that keep me locked in"(→keeps) ― 三単現の s、全部同じ穴。"how I gonna get this at bat"(→how I\'m gonna) ― be動詞。"that\'s what it matters the most"(→that\'s what matters most) ― 構文の混線。"the role change"(→my role changed)。全部、主述一致とコピュラという「一番安い音」だ。3年前の分析と1ミリもずれていない。',
                'そして決定打がこれだ ― "This is what I really take pride of."(→take pride IN)。**C2のロハスが、前置詞を落とした。** お前が毎晩やっているのと同じ #8 だ。ワールドシリーズのヒーローで、5ポジション守れて、監督候補と言われる男が、37歳になっても of と in を取り違える。前置詞は、第二言語話者が最後まで払い続ける税金だと確定した。',
                'だが13分間、ロハスは一度も言い直さなかった。"that create" と漏らした0.2秒後には次の節に入っている。膝が笑っても走り続けるランナーの走法だ。とにおの直近の検死(07-25)は made by 3連発 ― だが問題は3連発したことじゃない。3連発しても止まらなかったなら、それはロハスの走法だ。漏れを数えるな。停止を数えろ。今夜のお前の停止回数だけが、ロハスとの距離だ。',
            ],
        },
    ] as RegisterSection[],

    layers: [
        { axis: '中身(情報量)', native: '薄い(クリシェ中心)', rojas: '濃い', tonio: '濃い(ただしL1で)' },
        { axis: 'イディオム', native: '完璧', rojas: '本物・良い', tonio: '断片的' },
        { axis: 'テクスチャ(hedge/register)', native: '全開', rojas: '中', tonio: '薄い' },
        { axis: '文法精度', native: 'ほぼ完璧', rojas: '安い誤りが漏れる', tonio: '誤りが密' },
        { axis: '流れ(止まらなさ)', native: '完璧', rojas: '止まらない', tonio: '言い直しで切れる' },
        { axis: 'L1の自分との差', native: 'ゼロ(これがL1)', rojas: '大(スペイン語なら別人)', tonio: '大' },
    ] as LayerRow[],

    steal: [
        { english: "He's always the one raising the glass of champagne.", ja: 'あの人はいつも祝杯をあげる側だ。', who: 'rojas', note: '「祝う側の人間」を一発で描く比喩。人物評の型として強い。' },
        { english: "We're not going to take anything for granted.", ja: '何ひとつ当たり前だとは思わない。', who: 'rojas', note: 'take X for granted。謙虚さと集中を同時に出す定番。' },
        { english: "We've got to go day by day and not get too far ahead.", ja: '一日一日いくしかない、先を見すぎずに。', who: 'rojas', note: '長丁場のメンタル。go day by day が口語で効く。' },
        { english: "We just did a good job reading and reacting to what they were doing.", ja: '相手の出方を読んで反応する、それがうまくできただけ。', who: 'native', note: 'read and react。中身を断言せず流す、ネイティブの逃がし方。' },
        { english: "It's something you keep in mind, but you don't go away from what you're good at.", ja: '意識はするけど、自分の得意からは離れない。', who: 'native', note: 'keep in mind / go away from。ヘッジで謙虚に聞かせる型。' },
        { english: "That's kind of baseball, right?", ja: 'まあ、それが野球ってやつだよね。', who: 'native', note: 'kind of + right? で聞き手を仲間に引き込む。register の核。' },
        { english: "Whoever does that better generally wins the game.", ja: 'それをうまくやれた方が、だいたい勝つ。', who: 'native', note: 'whoever ... generally。一般論を軽く着地させる。' },
        // --- 2026-07-25 追補: MLB Network 13分インタビュー(聞き手ヨンダー・アロンソ)から ---
        { english: 'He took me under his wing.', ja: '彼は俺を翼の下に入れてくれた(面倒を見てくれた)。', who: 'rojas', note: '恩人を語る最強の型。プラドがロハスに162試合の備え方を教えた文脈で。師匠の話はこの一文から始めろ。' },
        { english: 'I got to cross paths with Martin Prado.', ja: 'マルティン・プラドと道が交わった(出会えた)。', who: 'rojas', note: 'cross paths with = 人生で交差する。meet より運命の重みが出る。got to で「幸運にも」が乗る。' },
        { english: 'He was the guy I wanted to emulate my game after.', ja: '彼は俺がプレーの手本にしたかった男だ。', who: 'rojas', note: 'emulate = 尊敬して真似る。copy より格が高い。ロハスの原文は after が落ちた(C2でも構文は漏れる)。' },
        { english: "I didn't do it all by myself.", ja: '全部を自分ひとりでやったわけじゃない。', who: 'rojas', note: '成功を語るときの謙虚の定型。この一文の後に恩人の名前を並べるのがMLB式。' },
        { english: 'You want to stay ready for that.', ja: 'その瞬間のために準備を切らさずにいたい。', who: 'rojas', note: 'stay ready = ベンチ暮らしの哲学を2語で。be ready(今準備できてる)と違い、状態の維持。' },
        { english: "I'm thinking three days ahead.", ja: '3日先を考えて準備している。', who: 'rojas', note: 'think ahead / ahead of time。30日間出番なしでも3日先の左投手に備える男の時間軸。' },
        { english: 'I try to stay on top of who I need to face next.', ja: '次に誰と当たるかを常に把握しておく。', who: 'rojas', note: 'stay on top of = 状況を掌握し続ける。仕事の進捗にもニュースにも使える万能句。' },
        { english: 'He can plug me in at shortstop at any time.', ja: '監督はいつでも俺をショートに差し込める。', who: 'rojas', note: 'plug in = 人を穴に差し込む。自分の使い勝手をアピールする言い方。plug me in anywhere で何でも屋宣言。' },
        { english: 'This is what I really take pride in.', ja: 'これこそ俺が誇りにしていることだ。', who: 'rojas', note: '**ロハスの原文は take pride OF(前置詞事故)。** C2でも#8は漏れる。正しくは in。それでも彼は止まらなかった。' },
        { english: 'I like to keep it light for the guys in the dugout.', ja: 'ベンチの空気を軽く保つのが好きなんだ。', who: 'rojas', note: 'keep it light = 深刻にしない。11点差の負け試合でモノマネをやる理由の言語化。' },
        { english: 'We always like to turn the page and stay on the positive side.', ja: 'すぐページをめくって、前向きな側に居続ける。', who: 'rojas', note: 'turn the page = 切り替える。負けの翌日の决まり文句。stay on the positive side とセットで。' },
        { english: "That slider didn't do what it was supposed to do.", ja: 'あのスライダーは、本来の仕事をしなかった。', who: 'rojas', note: '世界一の一打の種明かし。didn\'t do what it\'s supposed to do = 期待された動きをしない。機械にも人にも使える。' },
        { english: "He's not just talented -- he's one of the hardest workers on our team, and it shows.", ja: '彼は才能だけじゃない、チームで一番努力する男だ。それが結果に出てる。', who: 'rojas', note: 'ムーキー・ベッツ評。and it shows(見れば分かる)の切り上げが上手い。人を褒める完成形。' },
        { english: 'Take me through that moment right there.', ja: 'その瞬間を、順を追って話してくれ。', who: 'native', note: 'ヨンダーが5回使った質問の型。walk me through と並ぶインタビューの王。DMMで先生に話を振るのに最強。' },
        { english: 'How do you navigate that?', ja: 'それをどう乗りこなしてる?', who: 'native', note: 'navigate = 難しい状況を舵取りする。How do you deal with より知的に聞こえる質問。' },
        { english: "I'm gonna leave you guys to talk shop.", ja: 'あとは専門談義をどうぞ。', who: 'native', note: 'talk shop = 仕事・専門の話をする。同業者同士を残して席を立つときの一言。' },
    ] as StealPhrase[],
};
