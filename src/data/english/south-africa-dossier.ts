/**
 * 南アフリカ 徹底ドシエ
 *
 * DMM英会話の南アフリカ人講師(西ケープ在住・81歳)と対等に語り合うための下調べ。
 * 3方向(歴史・民族・国境 / 移民・排外・治安 / 政治・州・選挙)を web で裏取りして統合。
 * すべて 2026-07-01 時点の確認済み事実。数字と固有名詞は出典に紐づく。
 *
 * 更新時: sections に段落を足す。先生の新発言が出たら factChecks に追加。
 */

export interface DossierSection {
    id: string;
    heading: string;
    lead?: string;          // 見出し下の一行
    paragraphs: string[];
}

export interface DossierFactCheck {
    claim: string;          // 先生が言ったこと(体感)
    verdict: string;        // 裏取りの見出し
    detail: string;         // 事実
}

export interface DossierSource {
    label: string;
    url: string;
}

export const southAfricaDossier = {
    updated: '2026-07-01',
    teacher: '西ケープ在住の81歳の南アフリカ人講師。週7で働き、自分で屋根の補修までする。妻は英国生まれで在留資格を持つ。政治は野党DA寄りの視点。',
    intro: '天気の雑談のはずが、25分後には国境の引き方と、移民追放の締め切りの話になっていた。先生は当事者だ。だから次は、こっちも当事者の隣に立てるだけの地図を持っていく。表は英語、裏はこの国そのもの。',

    // いま起きていること(最新)を先頭に
    sections: [
        {
            id: 'now',
            heading: 'いま起きていること — 2026年6〜7月、「6月30日デッドライン」',
            lead: '先生が「昨日、全国でデモがあった」と言ったのは誇張ではない。',
            paragraphs: [
                '2026年、南アフリカは民主化(1994年)以降で最大級の移民関連の騒乱のただ中にいる。震源は、反移民の市民団体が一方的に設定した「6月30日までに不法移民は出て行け」という最後通牒。この日付を打ち出したのは、Facebookフォロワー170万人超のインフルエンサー Nkosikhona Ndabandaba(通称 Phakel\'umthakathi)。CNNの取材に「6月30日デッドラインの設計者」を自称した。',
                '主導は二つの勢力。古参の Operation Dudula と、2025年に立ち上がった新興の March and March。2026年3月から街頭行動を始め、ダーバン→ヨハネスブルグ→プレトリア→西ケープと燃え広がった。',
                '先生の体感はおおむね正確。ただし数字は要注意。2026年6月末時点の死者は「少なくとも4人」。最も荒れた西ケープ州モーセルベイでは非正規居住区の掘っ立て小屋 約55軒が焼かれ、警察確認の死者3人(モザンビーク政府は自国民5人が殺されたと主張)。約800人のモザンビーク人が被災、500人超が避難後に本国送還された。',
                '先生が言った「合法な黒人南アフリカ人が、移民を探して家々を戸別訪問していた」も裏が取れる。ヒューマン・ライツ・ウォッチ(2026年5月)が、自警団が身分証(papers)の提示を求めて回り警察が介入しない事例を記録。だが家宅捜索や身分証チェックの権限を持つのは警察と内務省(Home Affairs)だけで、市民が戸別訪問して迫るのは違法。だから多数が逮捕された。労働組合連合COSATUや反排外主義連合は、この6月30日デッドラインを「捏造」「違憲」と断じている。',
            ],
        },
        {
            id: 'election',
            heading: '「11月4日の選挙」の正体 — 州選挙ではなく地方自治体選挙',
            lead: 'ここが今回いちばん先生に返せるポイント。',
            paragraphs: [
                '先生は「2026年11月4日に大きな州選挙(provincial elections)がある」と言ったが、正確には「地方自治体選挙(Local Government / municipal elections)」だ。ラマポーザ大統領が2026年4月30日に投票日を11月4日(水)と正式発表し、選挙管理委員会(IEC)も確認済み。日付は当たっているが、種別が違う。',
                '選ぶのは州議会ではなく、8つの大都市圏(ヨハネスブルグやケープタウン)+205の地方自治体+44の広域自治体の議員。市長は直接選挙ではなく、選挙後に議会が選ぶ。2021年の地方選から5年ぶりで、憲法上の実施義務期間に入る。',
                'なぜ先生が言い間違えたか。南アでは州選挙(provincial)は総選挙(national)と同じ日に行われ、直近は2024年5月、次は2029年。地方選挙(local)はそれとずれた別サイクルで2021年→2026年。だから2026年に来るのは州選挙ではなく地方選挙。ここを整理して話せると、81歳の先生に「よく調べてるな」と一目置かれる。',
                'そして反移民運動は、この選挙と完全に連動している。Operation Dudula は2026年に正式に政党登録し、ヨハネスブルグ等での議席を狙う。ActionSA、Patriotic Alliance、IFPも反移民感情にすり寄る。つまり「移民を追い出す圧力」は票田づくりのキャンペーンそのもの。だから「選挙まで続ける」というわけだ。',
            ],
        },
        {
            id: 'politics',
            heading: '政治の相関図 — ANCが初めて負けた国',
            lead: '「8州ANC、1州DA」は2024年5月に崩れた。',
            paragraphs: [
                '先生の体感「西ケープだけ野党DA、残り8州はANC」は2024年5月までは正しかったが、今は古い。2024年5月29日の総選挙でANCは全国得票40.18%まで転落し、1994年以来初めて過半数割れ。西ケープはDAが約53%で維持(ここは盤石)。だがKZN(クワズール・ナタール)ではズマの新党MK党が45.9%で第一党に躍進しANCから奪取、ハウテン(ヨハネスブルグのある州)もANCが単独過半数を失い連立に転落した。',
                '主要プレイヤー。ANC(アフリカ民族会議)=マンデラ以来の与党、40%まで転落。DA(民主同盟)=第2党(21.8%)、西ケープを長年統治し「有能な行政」の看板、党首スティーンハウゼン。MK党=元大統領ズマが2023年末に結党、ズールー票を固め第3党(14.6%)。EFF=マレマ率いる急進左派、土地収用・国有化を掲げる。',
                '政権維持のため、ANCは2024年6月にDA・IFP・PAらを巻き込んで GNU(国民統一政府)を結成。宿敵だったDAが政権入りするという歴史的な組み合わせで、ラマポーザが大統領に再選された。先生いわく「一応機能してるが、もう縫い目がほつれかけている」。',
                '「80以上の政党が乱立」は事実、むしろ控えめ。2024年総選挙でIECは70政党+11無所属を承認(史上最多)。2026年地方選にはなんと508党が登録(2021年比+62党)。有権者登録は約2,850万人。「日本よりずっと volatile」は数字でも裏付けられる。',
            ],
        },
        {
            id: 'provinces',
            heading: '9つの州と、ヨハネスブルグの崩壊 vs 西ケープ',
            lead: '「ヨハネスブルグは崩れかけている」は誇張ではない。',
            paragraphs: [
                '南アは9州(西ケープ/東ケープ/北ケープ/KZN/ハウテン/フリーステート/ノースウェスト/ムプマランガ/リンポポ)。日本の都道府県に近いが、国→州→地方自治体の3層構造で各層が別々に選挙される点が決定的に違う。',
                'ヨハネスブルグ(ハウテン州)のインフラ崩壊は2026年のデータで痛々しい。水道管の破裂は月4,336件=1日144本、修理達成率は目標90%に対し43.7%。下水詰まりは月6,100件超。ごみ収集Pikitupは欠員率56%。市はEskomにR52億(約430億円)を滞納し供給停止を警告されている。',
                '一方で捻れがある。国全体の電力危機(loadshedding=計画停電)は劇的に改善し、2026年5月に「400日超・停電ゼロ」を達成した(2018年以来の快挙)。つまり「国レベルの発電は持ち直したのに、ヨハネスブルグという自治体レベルのインフラ(水・下水・地元配電)は崩れている」。先生の「崩壊」実感はこの自治体レベルの話だ。',
                '対して西ケープ。道路も教育も病院も相対的に良く、失業率も全国平均より10%以上低い。だから人が流入する。この国内移住を南アでは semigration(セミグレーション=emigrationのもじり)と呼ぶ。西ケープの物件は全国平均約12週に対し6.2週で売れる。ただし逆流も始まり、仕事を求めハウテンへ戻る専門職も増えている。西ケープ一強が続くかは、まさに11月4日の地方選が試金石。',
            ],
        },
        {
            id: 'immigration',
            heading: '誰が来て、書類がないとどうなるか',
            lead: '先生の「ガーナ・ナイジェリア・マラウイ」は半分正しく、半分は世代の記憶。',
            paragraphs: [
                '移民総数は約240万〜300万人(全人口の4〜5%)、6割超が南部アフリカ諸国出身。最大勢力はジンバブエとモザンビーク。ジンバブエ人だけで100万〜300万人と推計。2026年6月末の2週間で約13,000人が送還され、その内訳はマラウイ人約9,000、ジンバブエ人約3,000、ガーナ人約900、ナイジェリア人約300。先生が「マラウイ」を挙げたのは鋭い。今回の送還で最多はマラウイ人だ。',
                '法的枠組みは Immigration Act 13 of 2002 と Refugees Act 130 of 1998。移民は常にパスポート・査証・難民/庇護書類・身分証を携帯する義務がある。査察で出せなければ拘束→退去審査。いったん undesirable(好ましからざる者)に分類されると再入国が禁じられる。先生の「失えば国外退去・再入国不可」は実務どおり。取り締まりの主体は内務省と警察であって、自警団ではない。ラマポーザは2026年6月に専用の移民裁判所新設、雇用監査官1万人増員、不法就労させた雇用主への厳罰化を発表した。',
                '先生の一番味のある指摘 —「不法移民の方が地元より勤勉で、低賃金で雇われる。追い出すと雇用主が困る」。これは概ね事実。労働法の保護が薄く安く雇えるため、農業・警備・家事労働で好まれる。OECDは移民が南アGDPの約9%を生むと推計。ヘレン・スーズマン財団は「移民が犯罪を増やす」通念に統計的裏づけは乏しいとする。論者は口を揃える — 本質は移民ではなく、脆弱な立場を安く使う雇用主と、失業率40%超という構造的絶望。移民はスケープゴートにされている。',
            ],
        },
        {
            id: 'xenophobia-history',
            heading: '排外主義は繰り返す — そして先生の「300人」の正体',
            lead: '2026年に突然始まった話ではない。',
            paragraphs: [
                '南アでは1994年の多数派支配移行後、皮肉にも排外暴力が増えた。2008年=最悪の爆発で62人死亡(南ア人21・モザンビーク人11ほか)、10万人以上が避難。2015年=ヨハネスブルグとダーバンで7人死亡。2019年=主にナイジェリア人が標的。2021〜22年=Operation Dudula ら自警団の台頭。81歳の先生は、この全部を同時代で見てきている。',
                'Operation Dudula は isiZulu で「押し出す/叩き潰す」の意。コロナ禍の経済苦の中、移民に責任を転嫁する言説から2021年6月にソウェトで発足。手口は外国人経営の店を標的にし、路上で身分証を検め、公立病院で外国人の受診を妨害する自警行為。ラマポーザは2022年に「違法な自警行為」と非難。政治的には弱小で2024年州選挙の得票は0.02〜0.07%、議席ゼロ。街頭では脅威だが票にはならない、というギャップがある。',
                '先生が言った「2021年に暴動が激しく、300人が死んだ」— これは今回2026年の反移民デモではなく、2021年7月の大暴動の記憶だ。元大統領ズマの収監をきっかけにKZNとハウテンで爆発し、死者は約350人以上(ハウテン79・KZN258)、経済損失R500億、雇用200万人分に影響。アパルトヘイト終焉以降で最悪の暴力だった。厳密には移民排斥ではなく政治暴動+略奪。この規模の記憶が、今回の反移民デモと先生の中で結びついている。',
            ],
        },
        {
            id: 'history-peoples',
            heading: '歴史と民族 — コイサンから、想像上の国境まで',
            lead: '先生の「先住民はサン、ズールーは征服者、国境は想像上の線」を、正確に。',
            paragraphs: [
                'この地に最初に住んでいたのはコイサン(Khoisan)。狩猟採集民のサン(San)と、牧畜民のコイコイ(Khoikhoi)の総称で、生業が違う二集団だ。言語は世界的にも珍しい吸着音(クリック音)を使う独自系統。1652年にオランダ人が来たとき住んでいたのはこのコイコイで、その後、土地を奪われ天然痘(1713年ほか)もあって激減した。先生の「白人が来たとき住んでいたのは彼ら」は正しいが、「サンだけ」だと半分。牧畜民コイコイを忘れてはいけない。',
                '今の黒人の大多数(ズールー・コーサ・ソト・ツワナ)は、バントゥー系の大移動で西・中央アフリカから南下してきた人々の子孫。コイサンより「後から来た」。海岸沿いのングニ系(ズールー/コーサ/スワジ)と、内陸のソト・ツワナ系に分かれた。先生の「ズールーとコーサは言語が全く違う」は少し言い過ぎ(同じングニ系で近い)が、コーサ語はクリック音を多く取り込むので耳では相当違って聞こえる。公用語は2023年に南アフリカ手話が加わり12になった。',
                'シャカ・ズールー(在位1816頃〜1828)は軍制改革で小部族を大王国に押し上げた。彼の時代に始まった大動乱ムフェカネ(Mfecane、1815〜1840)は、伝統的には死者100万〜200万人と語られる。ただし近年の学界はこの数字を大幅に下方修正し、原因もシャカ一人でなく干ばつ・奴隷交易・白人の圧迫の複合とする。「ズールーが軍事的に突出していた」という体感は正しいが、「シャカ=単独の大虐殺者」像は古い。',
                '1652年、オランダ東インド会社のヤン・ファン・リーベックがケープに補給基地を築いた。目的は征服でなく航路の中継地だったが、その子孫がボーア人(農民)/アフリカーナーになる。19世紀にイギリスがケープを支配すると、反発したボーア人が内陸へ大移動(グレート・トレック、1835〜)。金とダイヤが見つかり英蘭が衝突、第二次ボーア戦争(1899〜1902)で英帝国が焦土作戦と強制収容所を用いた。先生の「入植はケープタウンから始まり内陸へ北上した」は完全に正確。',
                '先生の「国境は山や川でなく、ある点から別の点へ引いた想像上の線」はアフリカ史の核心。象徴がベルリン会議(1884〜85)。欧州列強がアフリカ分割のルールを決めたが、アフリカ人は一人も招かれず、民族も王国も無視して地図に定規で直線を引いた。だから多くの国境が民族を割り、あるいは敵対する民族を一つの箱に押し込めた。南ア自体は1910年に4植民地が統合され連邦成立、白人が作った憲法で黒人らは政治から排除された — これがアパルトヘイトの土台。',
                '先生が引いたルワンダの例(元は一つの民族を国境が分断)は、方向性は正しいが因果は精緻にしたい。1994年のジェノサイド(80万人以上)で、フツとツチは同じ言語・宗教・地域を共有していた。ベルギーが疑似科学で序列化し、全員に民族を記した身分証を持たせたことが分断を固定した。だから「国境が割った」より「植民地が、もともと連続していた集団に固い壁を後付けした」が正確。ベルリン会議の論理と地続きだ。',
                'アパルトヘイトは1948年に国家の法となり1994年まで続いた。マンデラは投獄27年、大統領は1994〜1999の一期のみ(二期目を自ら辞退)で、先生の「5年だけ」は正確。1995年にTRC(真実和解委員会)を設けた。映画『インビクタス』(2009)を先生は「理想化されすぎ」と評したが、これも当を得ている。白人を一様に偏狭に描き、マンデラを聖人化。史実では、劇中マンデラが主将に渡す詩「Invictus」は実際にはT・ローズヴェルトの演説「The Man in the Arena」の一節だった。現実の和解はもっと不完全で長い過程だった。',
            ],
        },
    ] as DossierSection[],

    // 先生の発言 vs 事実
    factChecks: [
        {
            claim: '先生「昨日のデモで、2021年みたいに300人が死んだ」',
            verdict: '混線。2026年の死者は「4人前後」。「300人超」は2021年7月のズマ暴動の数字',
            detail: '2026年6〜7月の反移民騒乱の死者は6月末で4人前後(モーセルベイで警察確認3人)。一方2021年7月9〜18日の暴動は約350人以上死亡(ハウテン79・KZN258)、損失R500億。先生の記憶は2021年と2026年が混ざっている。',
        },
        {
            claim: '先生「11月4日に大きな州選挙(provincial elections)がある」',
            verdict: '日付は正しいが種別が違う。正しくは「地方自治体選挙(local)」',
            detail: 'ラマポーザが2026年4月30日に11月4日(水)を投票日と正式発表。ただし対象は州議会でなく市町村議会(8メトロ+205自治体+44広域)。州選挙は総選挙と同日(直近2024・次2029)で別サイクル。',
        },
        {
            claim: '先生「9州のうち8州がANC、1州(西ケープ)だけDA」',
            verdict: '2024年5月に崩壊。西ケープDAは維持もKZNはMK党が奪取',
            detail: '2024年総選挙でANCは40.18%に転落し過半数割れ。西ケープはDAが約53%で維持したが、KZNはズマのMK党が45.9%で第一党、ハウテンもANC単独過半数喪失。「8対1」は2009〜2024年の古い感覚。',
        },
        {
            claim: '先生「80以上の政党が乱立している」',
            verdict: '事実、むしろ控えめ。2026年地方選は508党が登録',
            detail: '2024年総選挙でIECは70政党+11無所属を承認(史上最多)。2026年地方選には508党が登録(2021年比+62)。有権者登録は約2,850万人。',
        },
        {
            claim: '先生「不法移民の方が勤勉で、低賃金で雇われる。追い出すと店が消える」',
            verdict: '概ね事実。OECDは移民が南アGDPの約9%を生むと推計',
            detail: '労働法の保護が薄く安く雇えるため農業・警備・家事で好まれる。本質は移民でなく、脆弱な立場を安く使う雇用主と失業率40%超の構造的絶望。移民はスケープゴート、と論者は口を揃える。',
        },
        {
            claim: '先生「マンデラの大統領在任は1994〜1999のたった5年。インビクタスは理想化されすぎ」',
            verdict: 'すべて正確。映画の脚色も的を射ている',
            detail: '投獄27年、大統領は一期のみ(二期目を辞退)。映画で主将に渡す詩「Invictus」は史実では別物で、実際はT・ローズヴェルト「The Man in the Arena」の一節。白人の一面的描写と聖人化も批評家が指摘。',
        },
    ] as DossierFactCheck[],

    // 次回クラス用 質問バンク(当事者にしか答えられない角度)
    questions: [
        'この11月4日の地方選挙で、あなたのケープタウンや西ケープの市議会は、DAが今まで通り勝つと思いますか。それとも508党も乱立して票が割れ、初めて連立になりそうな雰囲気を地元で感じますか。',
        'ANCが2024年に過半数を失って、長年戦ってきたDAと国民統一政府(GNU)を組みましたよね。西ケープの古くからのDA支持者として、あなたはあれを裏切りと感じますか、それとも現実的な妥協だと見ていますか。',
        'ヨハネスブルグは水道管が1日144本も破裂して崩れかけていると報道されています。一方あなたの西ケープでは蛇口をひねれば水が出て、停電も落ち着いている。この「同じ国なのにここまで差がつく」理由は、あなたの目には“政党の違い”に見えますか、それとも別の何かですか。',
        '6月末のデモやモーセルベイで小屋が焼かれた事件で、あなたの街の空気は実際どう変わりましたか。近所で店を閉めた外国人や、姿を消した人はいましたか。',
        '1994年に政府が国境を開いて人が入ってきた、とあなたは言いました。当時のあなたの目に、その“開放”は歓迎ムードに映りましたか、それとも最初から不安がありましたか。あの頃と今で、南ア人の移民への感情はどう変わりましたか。',
        '西ケープはワインとブドウの農業地帯ですよね。外国人労働者がいなくなったら農園が回らない、という話を身近で聞いたことはありますか。',
        '自警団が家々を回って“書類を見せろ”と迫るのは違法で、警察しかできない — あなたはそう区別していました。81年生きてきて、アパルトヘイト時代のパス法(黒人が通行証を強制された制度)を思い出しませんか。今のpapers騒ぎと、昔のパスは、あなたの中で重なりますか。',
        '西ケープには今もコイサンの血や文化の痕跡が地名や食や言葉に残っていると聞きます。子供の頃、身の回りで「これはコイサン由来だ」と感じたもの — 言葉、料理、土地の名前 — はありましたか。',
        '1995年ラグビーW杯で南アが優勝した瞬間、あなたの周りでは白人も黒人も本当に一つになって喜んでいましたか。『インビクタス』が描いた一体感は、現実にはどこまで本物で、どこが誇張だと感じますか。',
        'あなたは自分で屋根に登って補修までしますよね。専門家は金がかかるから、と。南アでは“自分でやるしかない”という感覚は、インフラや行政が当てにならないことと関係していますか。',
    ] as string[],

    sources: [
        { label: 'France 24: 6月30日デッドライン前に外国人が大量出国 (2026-06-29)', url: 'https://www.france24.com/en/africa/20260629-thousands-foreign-nationals-leave-south-africa-ahead-june-30-deadline' },
        { label: 'Human Rights Watch: 新たな排外攻撃の波 (2026-05-20)', url: 'https://www.hrw.org/news/2026/05/20/south-africa-new-waves-of-xenophobic-attacks' },
        { label: 'GroundUp: COSATUが「捏造された6/30デッドライン」を拒否せよと呼びかけ', url: 'https://groundup.org.za/article/cosatu-and-anti-xenophobia-coalition-urge-workers-to-reject-fabricated-30-june-deadline/' },
        { label: 'Wikipedia: Operation Dudula', url: 'https://en.wikipedia.org/wiki/Operation_Dudula' },
        { label: 'Al Jazeera: 2021年暴動の死者300人超 (2021-07-22)', url: 'https://www.aljazeera.com/news/2021/7/22/south-africa-unrest-death-toll-jumps-to-more-than-300' },
        { label: '南ア政府発表: 大統領が2026年11月4日を地方選挙日に設定', url: 'https://www.sanews.gov.za/south-africa/president-sets-4-november-2026-date-local-government-elections' },
        { label: 'Daily Maverick: 11月4日 地方選挙日を発表 (2026-04-30)', url: 'https://www.dailymaverick.co.za/article/2026-04-30-save-the-date-4-november-local-government-election-date-announced-by-ramaphosa/' },
        { label: 'Wikipedia: 2026 South African municipal elections (508党)', url: 'https://en.wikipedia.org/wiki/2026_South_African_municipal_elections' },
        { label: 'Wikipedia: 2024 South African general election (ANC40.18%・GNU)', url: 'https://en.wikipedia.org/wiki/2024_South_African_general_election' },
        { label: 'Daily Maverick: 数字で見るヨハネスブルグの公共サービス劣化 (2026-04-12)', url: 'https://www.dailymaverick.co.za/article/2026-04-12-by-numbers-how-joburgs-essential-services-are-deteriorating/' },
        { label: 'Eskom: 400日連続 停電ゼロ達成 (2026)', url: 'https://www.eskom.co.za/eskom-delivers-365-days-without-loadshedding-advancing-the-economy-competition-and-the-integration-of-renewable-energy/' },
        { label: 'South African History Online: The Khoisan', url: 'https://sahistory.org.za/article/khoisan' },
        { label: 'Wikipedia: Mfecane (死者推計の論争)', url: 'https://en.wikipedia.org/wiki/Mfecane' },
        { label: 'Wikipedia: Berlin Conference (1884-85)', url: 'https://en.wikipedia.org/wiki/Berlin_Conference' },
        { label: 'USHMM: Rwanda — Divided by Ethnicity', url: 'https://www.ushmm.org/genocide-prevention/countries/rwanda/divided-by-ethnicity' },
        { label: 'Wikipedia: Invictus (film) — 史実との相違', url: 'https://en.wikipedia.org/wiki/Invictus_(film)' },
    ] as DossierSource[],
};

/**
 * English version of the dossier.
 * For the teacher to read, and for とにお to discuss the topic in English.
 * Same facts, same structure; sources are shared with the JA object above.
 */
export const southAfricaDossierEn = {
    updated: '2026-07-01',
    teacher: 'An 81-year-old South African teacher in the Western Cape. Works seven days a week and repairs his own roof. His wife was born in England and holds residency. Leans toward the opposition DA.',
    intro: 'It started as small talk about the weather. Twenty-five minutes later I had a diagram of how a country gets drawn — its borders, its deadline for expelling migrants, its tribes. My teacher is a local, a primary source. So next time I want to stand beside him with a map of my own. On the surface it is English practice; underneath it is the country itself.',
    sections: [
        {
            id: 'now',
            heading: 'What is happening right now — June–July 2026 and the "June 30 deadline"',
            lead: 'When my teacher said "there were protests across the country yesterday," he was not exaggerating.',
            paragraphs: [
                'In 2026 South Africa is in the middle of its largest wave of migration-related unrest since democracy in 1994. The trigger is an ultimatum set by anti-migrant groups: "illegal immigrants, leave by June 30." The date was pushed by Nkosikhona Ndabandaba (known as Phakel\'umthakathi), a Facebook influencer with over 1.7 million followers, who told CNN he was the architect of the deadline.',
                'Two forces lead it: the older Operation Dudula and the newer March and March (launched 2025). They began street actions in March 2026, spreading from Durban to Johannesburg to Pretoria to the Western Cape.',
                'His feel is broadly right, but the numbers need care. By late June 2026 the death toll was "at least four." In Mossel Bay, Western Cape — the worst flashpoint — about 55 shacks in an informal settlement were burned, with three deaths confirmed by police (Mozambique claims five of its nationals were killed). Around 800 Mozambicans were displaced and over 500 repatriated after fleeing.',
                'His claim that "legal Black South Africans were going door to door looking for migrants" also checks out. Human Rights Watch (May 2026) documented vigilantes demanding papers while police stood by. But only the police and Home Affairs may search a home or check documents; citizens doing it door to door is illegal, so many were arrested. COSATU (the trade union federation) and an anti-xenophobia coalition called the June 30 deadline "fabricated" and unconstitutional.',
            ],
        },
        {
            id: 'election',
            heading: 'The truth about "the November 4 election" — local government, not provincial',
            lead: 'This is the single best point to hand back to him.',
            paragraphs: [
                'He said there are big "provincial elections" on 4 November 2026. Strictly, these are Local Government (municipal) elections. President Ramaphosa officially announced 4 November (Wednesday) as the date on 30 April 2026, confirmed by the electoral commission (IEC). The date is right; the type is wrong.',
                'Voters choose municipal councils — 8 metros (like Johannesburg and Cape Town), 205 local municipalities and 44 district municipalities — not provincial legislatures. Mayors are not elected directly; the councils choose them afterward. It is the first municipal vote in five years, since 2021.',
                'Why the slip? In South Africa, provincial elections happen on the same day as the national election every five years — last in May 2024, next in 2029. Local elections run on a separate cycle: 2021, then 2026. So 2026 brings a local, not a provincial, election. Get this straight and an 81-year-old will notice you did your homework.',
                'And the anti-migrant movement is fully tied to the vote. Operation Dudula formally registered as a party in 2026 and is chasing seats in Johannesburg and elsewhere; ActionSA, the Patriotic Alliance and the IFP all court anti-migrant sentiment. The "pressure to expel migrants" is a vote-harvesting campaign — hence "until the election."',
            ],
        },
        {
            id: 'politics',
            heading: 'The political map — the country where the ANC finally lost',
            lead: '"Eight provinces ANC, one DA" collapsed in May 2024.',
            paragraphs: [
                'His feel — "only the Western Cape is opposition (DA), the other eight are ANC" — was true until May 2024, but it is now dated. In the 29 May 2024 election the ANC fell to 40.18% nationally, losing its majority for the first time since 1994. The Western Cape stayed DA (~53%, solid). But in KwaZulu-Natal, Zuma\'s new MK party surged to 45.9% and took it from the ANC; Gauteng (home to Johannesburg) also lost its ANC majority and went to coalition.',
                'The main players: the ANC (Mandela\'s party, down to 40%); the DA (second, 21.8%, long-time Western Cape government, a "competent administration" brand, led by Steenhuisen); the MK party (founded by ex-president Zuma in late 2023, locking up the Zulu vote, third at 14.6%); and the EFF (Malema\'s radical left, land expropriation and nationalization).',
                'To stay in power the ANC formed a GNU (Government of National Unity) in June 2024 with the DA, IFP, PA and others — the historic sight of its old enemy the DA in government, with Ramaphosa re-elected president. In the teacher\'s words, "it more or less works, but the seams are already fraying."',
                '"Over 80 parties" is true, even modest. In 2024 the IEC approved 70 parties plus 11 independents (a record). For the 2026 local elections a staggering 508 parties registered (+62 vs 2021). Registered voters number about 28.5 million. "Far more volatile than Japan" is borne out by the numbers.',
            ],
        },
        {
            id: 'provinces',
            heading: 'Nine provinces, and Johannesburg\'s collapse vs the Western Cape',
            lead: '"Johannesburg is falling apart" is not an exaggeration.',
            paragraphs: [
                'South Africa has nine provinces (Western Cape / Eastern Cape / Northern Cape / KZN / Gauteng / Free State / North West / Mpumalanga / Limpopo), roughly like Japan\'s prefectures. The key difference: a three-tier system — national, provincial, local — each elected separately.',
                'Johannesburg\'s (Gauteng) infrastructure decay is painful in 2026 data. Water-main bursts run 4,336 a month = 144 a day, with a repair rate of 43.7% against a 90% target. Sewer blockages top 6,100 a month. Refuse collection (Pikitup) has a 56% vacancy rate. The city owes Eskom about R5.2 billion and has been warned of cut-offs.',
                'There is a twist, though. The national power crisis (load-shedding) improved dramatically: in May 2026 the grid hit "400+ days with zero load-shedding" — the best since 2018. So national generation recovered while municipal-level infrastructure (water, sewage, local distribution) in Johannesburg crumbles. His "collapse" is that municipal layer.',
                'The Western Cape is the contrast: relatively good roads, schools and hospitals, and unemployment more than 10 points below the national average. So people move in. South Africans call this internal migration "semigration" (a play on emigration). Western Cape homes sell in 6.2 weeks vs a national ~12. But a counter-flow is starting too, with professionals returning to Gauteng for work. Whether the Western Cape stays dominant is exactly what 4 November tests.',
            ],
        },
        {
            id: 'immigration',
            heading: 'Who comes, and what happens without papers',
            lead: 'His "Ghana, Nigeria, Malawi" is half right, half a generational memory.',
            paragraphs: [
                'Total migrants number about 2.4–3 million (4–5% of the population), over 60% from Southern African countries. The largest groups are Zimbabwe and Mozambique; Zimbabweans alone are estimated at 1–3 million. In the last two weeks of June 2026 about 13,000 were repatriated: roughly 9,000 Malawians, 3,000 Zimbabweans, 900 Ghanaians, 300 Nigerians. His mention of "Malawi" is sharp — Malawians were the largest group repatriated.',
                'The legal frame is the Immigration Act 13 of 2002 and the Refugees Act 130 of 1998. Migrants must carry a passport, visa, asylum/refugee papers and ID at all times; if they cannot produce them, detention and a removal review follow, and anyone classed "undesirable" is barred from re-entry. His "lose the paper, lose the country" is accurate. Enforcement belongs to Home Affairs and the police, not vigilantes. In June 2026 Ramaphosa announced dedicated immigration courts, 10,000 more labour inspectors, and tougher penalties for employers of illegal labour.',
                'His juiciest point — "illegal migrants work harder and are paid less; expel them and the shops die" — is broadly true. Weak labour protection makes them cheap to hire in farming, security and domestic work. The OECD estimates migrants generate about 9% of South Africa\'s GDP; the Helen Suzman Foundation finds little statistical support for "migrants raise crime." The real issue, analysts agree, is not migrants but the employers who exploit cheap, precarious labour and a structural unemployment rate above 40%. Migrants are the scapegoat.',
            ],
        },
        {
            id: 'xenophobia-history',
            heading: 'Xenophobia repeats — and the truth about his "300 dead"',
            lead: 'None of this started in 2026.',
            paragraphs: [
                'After majority rule in 1994, xenophobic violence ironically rose. 2008 was the worst: 62 dead (21 South Africans, 11 Mozambicans and others), over 100,000 displaced. 2015: 7 dead in Johannesburg and Durban. 2019: mainly Nigerians targeted. 2021–22: the rise of vigilante groups like Operation Dudula. At 81, the teacher has watched all of it in real time.',
                'Operation Dudula means "to push out / force back" in isiZulu. It grew from pandemic-era hardship and blaming migrants, launching in Soweto in June 2021. Its methods — targeting foreign-owned shops, checking IDs in the street, blocking foreigners at public clinics — are vigilantism. Ramaphosa called it "illegal vigilante action" in 2022. Politically it is tiny (0.02–0.07% in the 2024 provincial vote, zero seats): a threat on the street, but no force at the ballot box.',
                'His "in 2021 riots got violent and 300 died" is not the 2026 anti-migrant protests — it is the memory of the July 2021 unrest. Sparked by ex-president Zuma\'s jailing, it exploded in KZN and Gauteng: about 350+ dead (Gauteng 79, KZN 258), R50 billion in losses, 2 million jobs affected — the worst violence since the end of apartheid. Strictly it was political unrest and looting, not xenophobia. That scale is what fuses with the current protests in his memory.',
            ],
        },
        {
            id: 'history-peoples',
            heading: 'History and peoples — from the Khoisan to imaginary borders',
            lead: 'Let us get his "the San were first, the Zulu were conquerors, borders are imaginary lines" exactly right.',
            paragraphs: [
                'The first people here were the Khoisan — the hunter-gatherer San and the pastoralist Khoikhoi, two groups with different livelihoods, speaking click languages unlike any other family. When the Dutch arrived in 1652 it was the Khoikhoi who were there; they were then dispossessed and devastated (smallpox in 1713 and after). His "they were here when the whites came" is right — but "only the San" is half the picture. Do not forget the Khoikhoi.',
                'Most of today\'s Black population (Zulu, Xhosa, Sotho, Tswana) descend from the Bantu expansion that moved south from West/Central Africa — they came after the Khoisan. They split into coastal Nguni (Zulu/Xhosa/Swazi) and inland Sotho-Tswana. His "Zulu and Xhosa are totally different languages" overstates it (both Nguni, fairly close), but Xhosa borrowed many click sounds, so it sounds very different. Official languages became 12 in 2023 when South African Sign Language was added.',
                'Shaka Zulu (c. 1816–1828) reshaped a small clan into a great kingdom through military reform. The upheaval he began, the Mfecane (1815–1840), is traditionally told as 1–2 million dead. But recent scholarship has revised that figure sharply down and blames a mix of drought, the slave trade and settler pressure, not Shaka alone. "The Zulu were militarily dominant" holds; "Shaka the lone mass-killer" is an old story.',
                'In 1652 the Dutch East India Company\'s Jan van Riebeeck built a supply station at the Cape. It was not conquest but a waystation — yet its descendants became the Boers (farmers) / Afrikaners. When Britain took the Cape in the 19th century, resentful Boers trekked inland (the Great Trek, from 1835). Gold and diamonds set Britain and the Boers against each other; in the Second Boer War (1899–1902) Britain used scorched earth and concentration camps. His "settlement began at Cape Town and moved up country" is exactly right.',
                'His "borders are not rivers or mountains but imaginary lines from one point to another" is the heart of African history. The symbol is the Berlin Conference (1884–85), where European powers set the rules for carving up Africa with not a single African present, ignoring peoples and kingdoms and ruling straight lines onto the map. Many borders split nations or forced enemies into one box. South Africa itself became a Union of four colonies in 1910, under a white-written constitution that excluded Black people — the foundation of apartheid.',
                'His Rwanda example (one people split by a border) points the right way but needs precision. In the 1994 genocide (800,000+ dead), Hutu and Tutsi shared a language, religion and territory. Belgium ranked them by pseudo-science and made everyone carry an ID card stating their "ethnicity," which froze the divide. So it is less "a border split them" than "colonial rule bolted a hard wall onto a continuous society" — the same logic as Berlin.',
                'Apartheid became law in 1948 and lasted to 1994. Mandela was imprisoned for 27 years and served a single term as president, 1994–1999 (he declined a second) — his "just five years" is right. The Truth and Reconciliation Commission followed in 1995. He called the film Invictus (2009) "over-idealized," and that is fair: it paints whites as uniformly bigoted and canonizes Mandela. In reality the poem "Invictus" the film shows Mandela handing the captain was actually a passage from Theodore Roosevelt\'s "The Man in the Arena." The real reconciliation was far more incomplete and slow.',
            ],
        },
    ] as DossierSection[],
    factChecks: [
        {
            claim: 'Teacher: "Yesterday\'s protests killed 300, like in 2021."',
            verdict: 'Crossed wires. 2026 deaths are around four; "300+" is the July 2021 Zuma unrest.',
            detail: 'The 2026 anti-migrant unrest had about four deaths by late June (three confirmed by police in Mossel Bay, ~55 shacks burned). The July 2021 unrest killed 350+ (Gauteng 79, KZN 258) with R50bn in losses. His memory fuses 2021 and 2026.',
        },
        {
            claim: 'Teacher: "There are big provincial elections on 4 November."',
            verdict: 'Right date, wrong type — these are local (municipal) elections.',
            detail: 'Ramaphosa announced 4 November (Wed) on 30 April 2026. But they elect municipal councils (8 metros + 205 local + 44 district), not provincial legislatures. Provincial elections run with the national vote (2024, next 2029).',
        },
        {
            claim: 'Teacher: "Eight of nine provinces are ANC, only the Western Cape is DA."',
            verdict: 'Collapsed in May 2024. Western Cape stayed DA, but KZN went to Zuma\'s MK.',
            detail: 'In 2024 the ANC fell to 40.18% and lost its majority. Western Cape held DA (~53%); KZN went to MK (45.9%); Gauteng lost its ANC majority. "8 vs 1" is the 2009–2024 picture.',
        },
        {
            claim: 'Teacher: "Over 80 parties are running."',
            verdict: 'True, and understated: 508 parties registered for the 2026 local vote.',
            detail: 'In 2024 the IEC approved 70 parties + 11 independents (a record). For the 2026 local elections, 508 parties registered (+62 vs 2021). About 28.5 million registered voters.',
        },
        {
            claim: 'Teacher: "Illegal migrants work harder and are paid less; expel them and the shops die."',
            verdict: 'Broadly true. The OECD estimates migrants generate about 9% of GDP.',
            detail: 'Weak labour protection makes them cheap in farming, security and domestic work. The real problem is exploitative employers and 40%+ structural unemployment, not migrants — who serve as the scapegoat.',
        },
        {
            claim: 'Teacher: "Mandela was president only 1994–1999. Invictus is over-idealized."',
            verdict: 'All accurate; the film\'s embellishments are on point.',
            detail: '27 years imprisoned, one term (he declined a second). The poem "Invictus" the film shows him handing over was really Roosevelt\'s "The Man in the Arena." Critics also note the one-dimensional whites and the sainthood.',
        },
    ] as DossierFactCheck[],
    questions: [
        'In this 4 November local election, do you think the DA will hold your council in Cape Town and the Western Cape as usual? Or with 508 parties splitting the vote, do you feel a coalition coming for the first time?',
        'The ANC lost its majority in 2024 and formed a unity government with the DA — the party it fought for decades. As a long-time DA supporter in the Western Cape, do you see that as a betrayal, or as a realistic compromise?',
        'Johannesburg reportedly has 144 water-main bursts a day and is falling apart, while in your Western Cape the taps run and the power is steady. When you look at why one country splits this far, do you see it as a difference of parties, or something else?',
        'After the June protests and the burning of shacks in Mossel Bay, how did the mood in your town actually change? Did any foreign-owned shops close, or did people you knew disappear?',
        'You said the government threw the borders open in 1994. At the time, did that "opening" feel like a welcome to you, or was there unease from the start? How has South Africans\' feeling about migrants changed since then?',
        'The Western Cape is wine and fruit country. Have you heard, close to home, that the farms cannot run without foreign workers?',
        'You drew a clear line: vigilantes demanding papers door to door is illegal — only the police can do it. In 81 years, does that not remind you of the apartheid pass laws? Do the papers now and the pass then overlap in your mind?',
        'They say traces of the Khoisan still live in the Western Cape — in place names, food, words. As a child, was there anything around you that you felt was Khoisan in origin — a word, a dish, the name of a place?',
        'When South Africa won the 1995 Rugby World Cup, were white and Black people around you really united in that moment? How much of the unity Invictus shows was real, and how much do you think was exaggerated?',
        'You climb up and repair your own roof, because a specialist costs money. Is that "you just have to do it yourself" feeling connected to not being able to rely on the infrastructure or the government here?',
    ] as string[],
};
