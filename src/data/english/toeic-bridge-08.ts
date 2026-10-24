/**
 * TOEIC(R) L&R 形式 リーディング模試 08 -- つながらない語。
 *
 * 語注 (toeic-gloss-08.ts) とは埋めるものが違う。あちらは「知らない単語の意味」。
 * こちらは **単語は全部知っているのに文の意味が通らない** 箇所を埋める。
 *
 *  - 中学単語なのに、学校で覚えた訳を当てると文が壊れる (run / hold / carry / settle / fit / move up / short)
 *  - カタカナ語として輸入されていて、英語の意味とずれている (asset / claim / plot / stand / panel / recorder)
 *  - 訳語は合っているのに、文中で果たす役割が日本語と違う (by / upon / given as / rather than / onward)
 *  - 英国・欧州式の現場語で、辞書の第一義が現場では使われない (hire / despatch / lift / bay / flat / lorry)
 *
 * 1セット3-5件。key はビューア側の参照キーと一致させる。
 *   Part 5 = 'p5-<設問番号>' / Part 6 = 'p6-<range>' / Part 7 = 'p7-<range>'
 * en は本文の表記のまま抜く (検索して原文に当たれるようにするため)。
 *
 * ビジネス(集客)ライン。実際のTOEIC/ETSとは一切無関係の非公式オリジナル模試。
 * 問題・本文はすべて当サービスのオリジナルで、実試験の転載ではない。手書きデータ。
 */
import type { ToeicBridge } from './toeic-types';

export const TOEIC_BRIDGE_08: ToeicBridge = {
    id: 'toeic-test-08',
    sets: [
        // ================= PART 5 =================
        {
            key: 'p5-103',
            items: [
                {
                    en: 'arranged for the samples to be delivered',
                    lit: '見本が配達されることのために整えた',
                    real: '見本を届けてもらう手配をした',
                    why: 'arrange を「並べる・整える」で覚えていると、arrange for 〜 to do の形で詰まる。この for は「〜が…するように段取りをつける」で、動作をするのは自分ではなく for の後ろの相手。arrange for a car to meet you も同じ型。',
                },
                {
                    en: "the vendor's own courier",
                    lit: '売り手自身の急使',
                    real: '業者が自前で持っている配送便',
                    why: 'courier をカタカナの「クーリエ(国際宅配)」で読むと大げさになる。ビジネス文書では単に「配送業者・配達便」。own が付くと「外部に頼まず自社で抱えている」の意味で、in-house とほぼ同じ役割をする。',
                },
                {
                    en: 'through',
                    lit: '〜を突き抜けて',
                    real: '〜を経由して・〜の手を借りて',
                    why: 'through の第一義「貫通」で読むと、配送便を突き抜ける絵になる。人や組織が後ろに来るときは仲介の through で、日本語の「〜を通して」がそのまま当たる。book through an agent / apply through the office と同じ使い方。',
                },
            ],
        },
        {
            key: 'p5-113',
            items: [
                {
                    en: 'renovations',
                    lit: 'リノベーション',
                    real: '改修工事(の期間)',
                    why: 'カタカナのリノベーションは「おしゃれに作り替える」の語感だが、英語の renovation は建物の補修・改装全般。複数形は一連の工事をひとまとまりの期間として扱い、during renovations / throughout renovations のように前置詞の目的語になる。時間を表す名詞として働く点が日本語とずれる。',
                },
                {
                    en: 'remain open',
                    lit: '開いたところに残る',
                    real: '営業・開館を続ける',
                    why: 'remain を「残る」だけで持っていると、施設が取り残された絵になる。remain + 形容詞は「その状態が続く」。remain closed / remain valid / remain unchanged はどれも本文中に出る型で、「〜のままである」と読む。',
                },
                {
                    en: 'though the north entrance will be closed',
                    lit: 'もっとも北の入口は閉じられるだろうが',
                    real: 'ただし北口は閉鎖される',
                    why: 'though を文中に置いた譲歩は、日本語の「ただし〜」に当たる但し書きの合図。TOEIC では「全体は大丈夫」+「一部だけ例外」の型で必ず出て、設問の正解はほぼこの例外側にある。',
                },
            ],
        },
        {
            key: 'p5-124',
            items: [
                {
                    en: 'their staffing needs for the next quarter',
                    lit: '次の四半期のための人員配置の必要性',
                    real: '翌四半期に必要になる人数',
                    why: 'needs を「必要性」という抽象名詞で読むと、何を出せばよいのか分からなくなる。複数形の needs は「必要とされる具体的な中身」で、staffing needs なら「何人要るか」という数そのもの。空所に入る forecast も天気専用ではなく、業務では forecast demand / forecast sales のように「数字を先に出す」動詞として使う。',
                },
                {
                    en: 'by 30 June',
                    lit: '6月30日のそばで',
                    real: '6月30日までに',
                    why: 'by + 時点は「その時までに完了」。until が「その時まで続く」なので、締め切りの by と継続の until を混ぜると期限の問題を落とす。submit by / reply by / arrive by はすべて締め切りの合図。',
                },
                {
                    en: 'are asked to',
                    lit: '〜するよう尋ねられている',
                    real: '〜するようお願いされている',
                    why: 'ask を「尋ねる」で固定していると、ask 人 to do の依頼の型で詰まる。受動の be asked to do は社内文書の定番で、命令より柔らかい「〜してください」。TOEIC では設問 What are employees asked to do? の形で頻出する。',
                },
            ],
        },
        // ================= PART 6 =================
        {
            key: 'p6-131-134',
            items: [
                {
                    en: 'Our evening workshops run from October through March',
                    lit: '夜の講習は10月から3月まで走る',
                    real: '夜間講座は10月から3月まで開かれる',
                    why: 'run を「走る」で読むと講座が走り出す。行事・番組・機械が主語のときは「(その期間)続く・開かれる・動いている」。The play runs for six weeks. / The machine runs all night. も同じ。',
                },
                {
                    en: 'through March',
                    lit: '3月を突き抜けて',
                    real: '3月いっぱいまで',
                    why: 'from A through B の through は「B を含めて終わり」。to だと B の直前で切れるようにも読めるが、through は B が入る。米国式の日付表現で頻出し、締め切りの解釈がここで変わる。',
                },
                {
                    en: 'includes all materials and firing',
                    lit: 'すべての材料と発砲を含む',
                    real: '材料代と焼成代がすべて込み',
                    why: 'firing を「発砲・解雇」で読むと陶芸の話が物騒になる。窯業の firing は「窯で焼くこと」で、素焼き・本焼きの工程そのもの。受講料に何が含まれるかを問う設問の根拠になりやすい行。',
                },
                {
                    en: 'anyone who books four sessions at once',
                    lit: '一度に4回を予約する誰でも',
                    real: '4回分をまとめて申し込んだ人',
                    why: 'book はカタカナの「本」に引っぱられるが、ここは動詞で「予約する」。at once も「すぐに」ではなく「一度に・まとめて」。両方合わせて「一括申し込み」という条件を表す。',
                },
            ],
        },
        {
            key: 'p6-135-138',
            items: [
                {
                    en: 'Our press operators have reviewed the files',
                    lit: '報道担当者がファイルを再検討した',
                    real: '印刷機のオペレーターがデータを確認した',
                    why: 'press を「報道・記者」で読むと印刷所の話が新聞社の話になる。印刷業では press は「印刷機」。review も「再検討」ではなく「目を通して問題がないか見る」の確認作業を指す。',
                },
                {
                    en: 'meet your original delivery date',
                    lit: 'あなたの元の配達日に会う',
                    real: '当初の納品日に間に合わせる',
                    why: 'meet を「会う」で持っていると、期日と握手する絵になる。meet + 期限/条件/基準 は「満たす・間に合わせる」。meet the deadline / meet the requirements と同じ型で、ビジネス文書では会うより多い。',
                },
                {
                    en: 'at no extra charge',
                    lit: '余分な突撃なしで',
                    real: '追加料金なしで',
                    why: 'charge の第一義を「突撃・充電」で覚えていると崩れる。金額の文脈では「請求・料金」。at no extra charge / free of charge はセットで覚える。逆に「請求する」の動詞でも同じ語形が出る。',
                },
                {
                    en: 'pass it to the press floor',
                    lit: 'それを印刷の床へ手渡す',
                    real: '印刷現場へ回す',
                    why: 'floor は「床」ではなく、工場や取引所の「現場・作業場」。the shop floor / the trading floor と同じ用法。pass it to 〜 も「渡す」より「その先に回す・引き継ぐ」に近い社内の言い回し。',
                },
            ],
        },
        {
            key: 'p6-139-142',
            items: [
                {
                    en: 'Plot assignments for this season',
                    lit: '今季の陰謀の割り当て',
                    real: '今季の区画の割り当て',
                    why: 'plot を「筋書き・陰謀」で覚えていると意味不明になる。土地の文脈では「区画・一区切りの土地」。a building plot / a burial plot。assignment も「宿題」ではなく「割り当て・配属」。',
                },
                {
                    en: 'we have divided six of the larger plots in half',
                    lit: '大きい区画の6つを半分に割った',
                    real: '大きめの区画6つを2つに分けた',
                    why: 'divide 〜 in half は「2等分する」の決まり文句で、in halves とは言わない。the larger plots の比較級 + the は「(2種類あるうちの)大きいほう」を指し、比較の相手が文中に無くても成立する。',
                },
                {
                    en: 'anyone who can spare an hour',
                    lit: '1時間を予備にできる誰でも',
                    real: '1時間だけでも時間を割ける人',
                    why: 'spare をカタカナの「スペア(予備品)」で読むと止まる。動詞の spare は「(時間や人手を)割く・都合をつける」。Can you spare a moment? が典型で、無理のない範囲でという含みがある。',
                },
                {
                    en: 'so that the path stays clear',
                    lit: '道が澄んだままでいるように',
                    real: '通路をふさがないように',
                    why: 'clear を「透明・明快」で固定すると通路が透けてしまう。物理的な場所に付く clear は「何も置かれていない・通れる」。keep the aisle clear / the road is clear は掲示の定番表現。',
                },
            ],
        },
        {
            key: 'p6-143-146',
            items: [
                {
                    en: 'will add a second vessel to its harbour route',
                    lit: '港の道に2番目の船を加えるだろう',
                    real: '港の航路に2隻目を投入する',
                    why: 'route を「道」で読むと陸の話になる。交通の route は「路線」で、bus route / flight route と同じ。a second は「2番目の」ではなく「もう1つの」で、another に近い。',
                },
                {
                    en: 'The new boat carries 180 passengers',
                    lit: '新しい船は180人の乗客を運ぶ',
                    real: '新造船の定員は180人',
                    why: 'carry を「運ぶ」で訳すと動作の話になるが、乗り物が主語のときは「(最大)何人・何トン積める」という能力を表す。The lift carries eight people. も定員の話。次に出る capacity と同じことを言い換えている。',
                },
                {
                    en: 'Ridership on the route has risen every year',
                    lit: '路線での乗る人柄が毎年上がった',
                    real: '路線の利用者数が毎年増えてきた',
                    why: 'ridership は「乗る人」ではなく「利用者数」という数量の名詞。同じ型に readership (読者数)、membership (会員数) があり、-ship が付くと人ではなく規模を指すことが多い。',
                },
                {
                    en: 'the morning sailings have been full',
                    lit: '朝の航海はいっぱいだった',
                    real: '朝の便は満席が続いている',
                    why: 'sailing を「航海」で読むと壮大になる。時刻表の文脈では可算名詞で「(1本の)出航便」。the 9:00 sailing のように便を数える。full も「満腹」ではなく「満席・満車」。',
                },
                {
                    en: 'monthly passes will remain',
                    lit: '月ごとの通行証が残るだろう',
                    real: '定期券は今後も有効なままである',
                    why: 'pass をカタカナの「パス(合格・通過)」で読むと止まる。名詞の pass は「定期券・入場証」。valid も「妥当な」より「有効期限の中にある」で、期限や適用範囲の話をしている合図になる。',
                },
            ],
        },
        // ================= PART 7 single =================
        {
            key: 'p7-147-148',
            items: [
                {
                    en: 'Category requested',
                    lit: '要求されたカテゴリー',
                    real: '希望する会員区分',
                    why: '申込書の欄名は名詞 + 過去分詞で短く切る型が多く、動詞が省かれている。requested は「(申込者が)希望した」で、書式の中では「ご希望の〜」に当たる。date requested / amount requested も同じ。',
                },
                {
                    en: 'which is deducted from the first year',
                    lit: '最初の年から差し引かれるところの',
                    real: '初年度の会費から差し引かれる',
                    why: 'deduct を「控除する」の硬い訳で持っていると、何から何を引くのか見失う。deduct A from B は「B から A を引く」で、引かれる側が from の後ろ。ここでは講習料が会費に吸収されるので、追加負担にはならない。',
                },
                {
                    en: 'placed on waiting list',
                    lit: '待つリストの上に置かれた',
                    real: '順番待ちに回された',
                    why: 'waiting list はカタカナの「ウェイティングリスト」で通じるが、be placed on 〜 の受け身になると読みにくくなる。put on / placed on はどちらも「その扱いにされた」で、本人の意思ではないことを示す。',
                },
                {
                    en: 'FOR OFFICE USE ONLY',
                    lit: '事務所の使用のためだけに',
                    real: '事務局記入欄',
                    why: '申込書の下部に必ずある定型で、申込者は書かない欄という意味。TOEIC ではこの欄に「受理日・可否・順番待ち」など設問の根拠が入るので、飛ばさずに読む価値がいちばん高い場所になる。',
                },
            ],
        },
        {
            key: 'p7-149-150',
            items: [
                {
                    en: 'Our reception desk closes at 10:00 P.M.',
                    lit: '受付机が22時に閉まる',
                    real: 'フロントは22時で人がいなくなる',
                    why: 'close を「閉店する」で読むとホテル全体が閉まる絵になるが、主語が窓口や部署なら「受付時間が終わる」の意味。The box office closes at six. も同じで、建物ではなく業務が終わる。',
                },
                {
                    en: 'left in the night safe',
                    lit: '夜の安全の中に残された',
                    real: '夜間金庫に預けられる',
                    why: 'safe を形容詞「安全な」でしか持っていないと詰まる。名詞の safe は「金庫」。night safe は営業時間外に鍵や現金を出し入れするための箱で、英国式の建物でよく出る現場語。',
                },
                {
                    en: 'a cold supper tray in your room',
                    lit: '部屋の中の冷たい夕食のお盆',
                    real: '部屋に用意しておく軽い夜食',
                    why: 'cold を「冷めた」と読むと味気ない苦情に見えるが、料理の cold は「火を通さずに出す」という提供方式。cold buffet / cold cuts と同じ。tray も器ではなく「一式にまとめたもの」を指す。',
                },
                {
                    en: 'both nights remain booked',
                    lit: '両方の夜が予約されたままである',
                    real: '2泊とも予約は生きている',
                    why: 'book の過去分詞 booked は「本にされた」ではなく「押さえてある」。remain + 過去分詞で「その状態が続く」を表し、変更の連絡文では「取り消されていない」ことをはっきりさせる働きをする。',
                },
            ],
        },
        {
            key: 'p7-151-152',
            items: [
                {
                    en: 'Required by: 23 July',
                    lit: '7月23日によって要求された',
                    real: '納入希望日: 7月23日',
                    why: '注文書の欄名としての required by は「いつまでに要るか」。by が期限を作るので「その日までに届けてほしい」の意味になり、注文日 (order date) と対になって並ぶ。',
                },
                {
                    en: 'will ship from remaining stock',
                    lit: '残りの株から船で送るだろう',
                    real: '在庫の残りから出荷する',
                    why: 'ship を「船で送る」で固定すると陸送や航空便で崩れる。商取引の ship は輸送手段を問わず「出荷する」。stock も「株」ではなく「在庫」で、in stock / out of stock と同じ用法。',
                },
                {
                    en: 'has been discontinued',
                    lit: '継続されなくなった',
                    real: '生産・取り扱いが終了した',
                    why: 'discontinue を「中断する」で読むと再開しそうに見えるが、商品に付くと「廃番」で二度と作らない。TOEIC の注文書・案内では「これが最後の在庫」という条件と必ずセットで出る。',
                },
                {
                    en: '30 days from invoice date',
                    lit: '請求書の日付から30日',
                    real: '請求書発行日から30日以内の支払い',
                    why: '支払条件の決まり文句で、起点が納品日でも注文日でもなく請求書の日付である点が要。net 30 とも書く。TOEIC では「いつまでに払うか」を問う設問の根拠になり、他の日付とすり替えた誤答が並ぶ。',
                },
            ],
        },
        {
            key: 'p7-153-155',
            items: [
                {
                    en: 'will be resurfaced from 6 to 17 November',
                    lit: '11月6日から17日まで再表面化される',
                    real: '11月6日から17日まで舗装をやり直す',
                    why: 're- + surface で「路面を張り替える」。道路・駐車場の工事で使う現場語で、建て替え (rebuild) や修繕 (repair) と区別される。表面だけの工事なので、施設そのものは使えるという含みがある。',
                },
                {
                    en: 'visitor spaces will be marked out',
                    lit: '訪問者の空間が印を付け出される',
                    real: '来客用の枠が白線で引き直される',
                    why: 'space を「空間」で読むと漠然とするが、駐車場では「1台分の枠」。mark out は「線を引いて区切る」で、地面に新しく枠を作る作業を指す。parking space / loading space も同じ数え方をする。',
                },
                {
                    en: 'the barrier there will stay raised',
                    lit: 'そこの障壁が上げられたままでいるだろう',
                    real: '遮断機は上がったままにしておく',
                    why: 'barrier を「障壁」で読むと壁が立つ絵になるが、駐車場では「遮断機・ゲートバー」。raised は「上がっている=通れる」で、閉まっている状態と逆であることに注意する。',
                },
                {
                    en: 'should reverse into the service bay',
                    lit: 'サービスの湾へ逆転すべきだ',
                    real: '搬入スペースへバックで入れること',
                    why: 'reverse を「逆にする」で持っていると、車の話で止まる。運転の reverse は「後退する・バックする」。bay も「湾」ではなく「区切られた作業スペース」で、loading bay / repair bay と同じ。',
                },
                {
                    en: 'while the old surface is broken up',
                    lit: '古い表面が壊れ上げられている間',
                    real: '古い舗装をはがしている間',
                    why: 'break up を「別れる」で覚えていると人間関係の話に見える。物が目的語なら「砕いて取り除く」。工事の説明では騒音の理由としてよく出て、「いちばんうるさいのはこの工程」という話につながる。',
                },
            ],
        },
        {
            key: 'p7-156-157',
            items: [
                {
                    en: 'The Nanaimo run has to leave by nine',
                    lit: 'ナナイモの走りは9時までに去らねばならない',
                    real: 'ナナイモ行きの便は9時までに出さないといけない',
                    why: 'run を名詞で使うと「1本の運行・配送ルート」を指す。the morning run / the delivery run。日本語の「便」に当たり、走る動作ではなく決まった行程そのものを表す。',
                },
                {
                    en: 'It would hold for an hour, maybe',
                    lit: 'それは1時間、たぶん保持するだろう',
                    real: '1時間くらいならもつかもしれない',
                    why: 'hold を「持つ」で読むと目的語を探して迷う。自動詞の hold は「持ちこたえる・もつ」。The rope will hold. / Will the weather hold? と同じで、壊れずに保つという意味になる。',
                },
                {
                    en: 'The spare has no lift gate',
                    lit: '予備は持ち上げ門を持っていない',
                    real: '予備の車には昇降ゲートが付いていない',
                    why: 'gate を「門」で読むと荷台の装置だと分からない。lift gate はトラック後部の荷物用リフトで、これが無い=人力で積むことになる。会話ではここが「人手が要る」という含みの合図になる。',
                },
                {
                    en: 'Two loaders came in early',
                    lit: '2人の積み込み機が早く入ってきた',
                    real: '積み込み担当が2人、早出で来ている',
                    why: 'loader は機械 (ローダー) にも人にも使う語で、came in と続けば人。come in は「出勤する」で、come in early は早出のこと。直前の指摘への返答として「人手は手当て済み」を意味する。',
                },
            ],
        },
        {
            key: 'p7-158-161',
            items: [
                {
                    en: 'will move all of its machining back',
                    lit: '機械加工のすべてを後ろへ動かす',
                    real: '機械加工を全部自社に戻す',
                    why: 'move 〜 back を「後退させる」と読むと減産の話に見える。ここの back は場所の「元のところへ」で、外注していた工程を自社へ引き戻すこと。bring production back home も同じ発想。',
                },
                {
                    en: 'cut by a subcontractor abroad',
                    lit: '海外の下請けによって切られた',
                    real: '国外の外注先が削っていた',
                    why: '金属加工の cut は「切断」だけでなく「削り出す・機械加工する」全般を指す。cut a spool / cut a thread。abroad は副詞なので前置詞を付けず、名詞の直後に置いて「国外の」と後ろから掛かる。',
                },
                {
                    en: 'We were losing six weeks every time a design changed',
                    lit: '設計が変わるたび6週間を失っていた',
                    real: '設計を変えるたびに6週間ムダになっていた',
                    why: 'lose + 時間は「その時間を空費する」。金や物を失う話ではなく、待ち時間で仕事が止まることを指す。every time は接続詞として節を導き、whenever と同じ働きをする。',
                },
                {
                    en: 'would take on four machinists this winter',
                    lit: 'この冬に4人の機械工を引き受けるだろう',
                    real: 'この冬に機械工を4人雇う',
                    why: 'take on を「引き受ける」だけで持っていると、人が目的語のときに詰まる。take on + 人 は「採用する」。take on work なら「仕事を引き受ける」で、目的語によって意味が切り替わる。',
                },
                {
                    en: 'the catalogue, currently eighteen models, would be trimmed to twelve',
                    lit: 'カタログは現在18機種で、12へ切りそろえられるだろう',
                    real: '今18機種あるカタログを12機種まで絞る',
                    why: 'trim を「整える・トリミング」で読むと見た目の話になるが、数量に付くと「削って減らす」。trim costs / trim the workforce と同じ。to + 数字は「その数まで」で、削る量ではなく残る数を指す。',
                },
            ],
        },
        {
            key: 'p7-162-164',
            items: [
                {
                    en: 'is still on hire to another client',
                    lit: 'まだ別の顧客へ雇用中である',
                    real: 'まだ別の客に貸し出したままである',
                    why: 'hire を「雇う」で固定すると人の話になる。英国式では物にも使い、on hire は「貸し出し中」。hire a car / for hire も同じで、米国式の rent に当たる。会社名の Stage Hire も「機材レンタル」の意味。',
                },
                {
                    en: 'they give the same span and carry the same load',
                    lit: '同じ範囲を与え、同じ荷を運ぶ',
                    real: '同じ長さを渡せて、同じ重さに耐えられる',
                    why: 'span を「期間」で覚えていると長さの話が抜ける。構造物の span は「渡せる距離」。carry a load も運搬ではなく「荷重に耐える」という強度の話で、carry の主語が物のときによく出る。',
                },
                {
                    en: 'take an extra hour to rig',
                    lit: '装備するのに余分な1時間かかる',
                    real: '組み上げるのに1時間余計にかかる',
                    why: 'rig は舞台・照明の現場語で「吊り込む・仕込む」。名詞の rig (装置) から来ており、rigging crew は仕込み班のこと。take + 時間 + to do は「〜するのに時間がかかる」の型。',
                },
                {
                    en: 'I have moved your crew call from 1:00 P.M. to noon',
                    lit: '乗組員の呼び出しを13時から正午へ動かした',
                    real: '作業開始の集合時刻を13時から正午に繰り上げた',
                    why: 'call を「電話・呼び出し」で読むと連絡の話に見えるが、現場では「集合時刻」。crew call / call time は「何時に現場に入るか」を指す。from A to B は時刻の移動で、早くも遅くもなりうる。',
                },
            ],
        },
        {
            key: 'p7-165-168',
            items: [
                {
                    en: 'Run purity and germination tests on incoming lots',
                    lit: '入ってくるくじで純度と発芽の試験を走らせる',
                    real: '入荷したロットの純度と発芽率を検査する',
                    why: 'run a test は「試験を実施する」で、走る動作は関係ない。run an experiment / run a check も同じ。lot も「たくさん」ではなく「一回に扱うまとまり=ロット」で、製造・流通の単位を指す。',
                },
                {
                    en: 'is an asset but is not essential',
                    lit: '資産だが本質的ではない',
                    real: 'あればなお良いが必須ではない',
                    why: 'asset を「資産」で読むと会計の話になる。求人票の an asset は「歓迎条件・プラス評価」で、必須要件と区別するための決まり文句。日本語の「尚可」がそのまま当たる。',
                },
                {
                    en: 'settle claims when a shipment arrives short',
                    lit: '出荷が短く到着したとき主張を落ち着かせる',
                    real: '荷物が不足して届いたときの請求を処理する',
                    why: 'claim をカタカナの「クレーム(苦情)」で読むと当たらない。英語の claim は「金銭を伴う請求・申し立て」で、settle claims は「その請求を片づける」。arrive short の short も「短い」ではなく「数量が足りない」。',
                },
                {
                    en: 'when the plant adds a second shift',
                    lit: '工場が2番目の移動を加えるとき',
                    real: '工場が2交代目を追加する時期',
                    why: 'shift をカタカナの「シフト(移動・変更)」で読むと止まる。労働時間の shift は「勤務の一区切り」で、a second shift は夕方以降にもう一班入れること。忙しさの度合いを示す指標になる。',
                },
            ],
        },
        {
            key: 'p7-169-171',
            items: [
                {
                    en: 'Feeding a City on Short Supply Chains',
                    lit: '短い供給の鎖の上で都市に食べさせる',
                    real: '短い流通経路で都市の食を支える',
                    why: 'chain を「鎖」で読むと industry 用語だと分からない。supply chain は生産から消費までの流通の連なり。short supply chain は「生産者と消費者の間の段階が少ない」ことで、地産地消に近い考え方を指す。',
                },
                {
                    en: 'Costing a Menu When Prices Move Weekly',
                    lit: '価格が毎週動くときメニューを費用する',
                    real: '仕入れ値が毎週変わる中で原価を計算する',
                    why: 'cost は名詞「費用」だけでなく他動詞で「原価を出す」の意味を持つ。cost a project / cost out a plan。move も「動く」より「(相場が)変動する」で、金額に付くと上下どちらもありうる。',
                },
                {
                    en: 'Four regional buyers take questions from the floor',
                    lit: '4人の地域の買い手が床から質問を取る',
                    real: '地域のバイヤー4人が会場からの質問に答える',
                    why: 'the floor は「床」ではなく「(会場の)出席者席」。take questions from the floor は「客席から質問を受ける」の定番。buyer も一般の購入者ではなく、店や卸の「仕入れ担当」を指す業界語。',
                },
                {
                    en: 'Delegates may move freely between sessions',
                    lit: '代表団は会の間を自由に動いてよい',
                    real: '参加者はどの回に出ても構わない',
                    why: 'delegate を「代表団・使節」で読むと大げさになる。会議・研修の案内では単に「参加者・出席者」。move between sessions も物理的移動ではなく「好きな回を選んで出入りできる」という参加の自由度の話。',
                },
            ],
        },
        {
            key: 'p7-172-175',
            items: [
                {
                    en: 'We were moved up the list',
                    lit: 'リストの上に動かされた',
                    real: '検査の順番が前倒しになった',
                    why: 'move up を「上へ移動する」で読むと昇進の話に見える。順番待ちの文脈では「順番が早くなる」。The meeting was moved up to Tuesday. も「前倒し」で、時間が早まる方向を指す。',
                },
                {
                    en: 'still running two degrees warm',
                    lit: 'まだ2度暖かく走っている',
                    real: '設定より2度高い状態で動いている',
                    why: 'run + 形容詞は機械の状態を表し、「〜の状態で動作している」。run hot / run late / run low も同じ型。warm は「暖かい」ではなく「設定温度より高い」で、冷却機にとっては不具合を意味する。',
                },
                {
                    en: 'I can fit it tomorrow if the line stops at two',
                    lit: 'ラインが2時に止まるなら明日それに合う',
                    real: 'ラインが2時に止まるなら明日取り付けられる',
                    why: 'fit を「合う」の自動詞でしか持っていないと、部品を目的語にした他動詞の用法で詰まる。fit a part は「取り付ける」。英国式の現場語で、install より口語的に使われる。',
                },
                {
                    en: 'August has three gaps',
                    lit: '8月は3つの隙間を持つ',
                    real: '8月分の記録が3日ぶん抜けている',
                    why: 'gap を「隙間」で読むと物理的な空きに見えるが、記録・データに付くと「欠落・記入漏れ」。a gap in the record / gaps in coverage と同じで、検査で必ず突かれるところ。',
                },
                {
                    en: 'The readings are all on the recorder',
                    lit: '読書はすべて記録者の上にある',
                    real: '測定値はすべて記録計に残っている',
                    why: 'reading を「読書」で読むと崩れる。計器に付く reading は「読み取った数値・測定値」で、複数形で使う。recorder も人ではなく「自動記録装置」で、温度計とつながって数値を残し続ける機械のこと。',
                },
            ],
        },
        // ================= PART 7 multiple =================
        {
            key: 'p7-176-180',
            items: [
                {
                    en: 'we quote before any work begins',
                    lit: '仕事が始まる前に引用する',
                    real: '着手前に見積もりを出す',
                    why: 'quote を「引用する」で固定すると商取引で詰まる。金額の文脈では「見積もる・見積もりを出す」で、名詞の a quote は「見積書」。宛先の quotes@ もその意味。',
                },
                {
                    en: 'Volumes received from 1 April onward',
                    lit: '4月1日から前方に受け取られた巻',
                    real: '4月1日以降に受け取った本',
                    why: 'onward を「前方へ」で読むと方向の話になるが、時間に付くと「それ以降ずっと」。from 〜 onward は起点を示す決まり文句で、締め切りの前後で条件が変わる問題の根拠になる。volume も「音量」ではなく「(製本された)1冊」。',
                },
                {
                    en: 'as our schedule then fills with library contracts',
                    lit: '予定表が図書館の契約で満ちるので',
                    real: 'その時期は図書館の仕事で予定が埋まるため',
                    why: 'この as は「〜のように」ではなく理由の「〜なので」。fill with も「満たす」の他動詞ではなく自動詞で「いっぱいになる」。両方合わせて、納期が延びる理由を説明する一文になっている。',
                },
                {
                    en: 'The covers are sound',
                    lit: '表紙は音である',
                    real: '表紙は傷んでいない',
                    why: 'sound を名詞「音」でしか持っていないと文が壊れる。形容詞の sound は「傷んでいない・しっかりしている」で、structurally sound / of sound quality と同じ。ここは修理不要な部分を示している。',
                },
                {
                    en: 'collect them from my flat',
                    lit: '私の平らから彼らを集める',
                    real: '自宅まで取りに来てもらう',
                    why: 'flat を「平らな」で読むと住居だと気づけない。英国式の名詞 flat は「アパートの一室」で、米国式の apartment に当たる。collect も「収集する」ではなく「引き取りに行く」で、英国では pick up の代わりによく使う。',
                },
            ],
        },
        {
            key: 'p7-181-185',
            items: [
                {
                    en: 'Racking loads and beam capacity',
                    lit: '荷を棚にかけることと梁の能力',
                    real: '棚にかかる荷重と梁の耐荷重',
                    why: 'load を「積み荷」で読むと運搬の話になるが、構造の文脈では「かかる重さ=荷重」。capacity も「収容力」より「耐えられる限界」。倉庫の安全講習では、この2語が組で必ず出る。',
                },
                {
                    en: 'Manual handling for order pickers',
                    lit: '注文を選ぶ人のための手動の取り扱い',
                    real: 'ピッキング担当者向けの人力での荷扱い',
                    why: 'manual を「マニュアル(手引き)」で読むと講習名が意味不明になる。形容詞の manual は「機械を使わない・手作業の」。order picker も倉庫で注文品を棚から集める担当者を指す職種名。',
                },
                {
                    en: 'His forklift certificate lapsed in June',
                    lit: '彼のフォークリフトの証明書が6月に滑った',
                    real: '彼のフォークリフトの資格が6月で切れた',
                    why: 'lapse を「失策・ラプス」で覚えていると当たらない。資格・保険・会員に付く lapse は「更新されずに効力が切れる」。a lapsed membership も同じで、取り消しではなく放置による失効を指す。',
                },
                {
                    en: 'so leave that one aside',
                    lit: 'だからそれを脇に残しなさい',
                    real: 'なのでその回は外してください',
                    why: 'leave 〜 aside は「いったん外す・考えに入れない」。物を横に置く動作からきた言い回しで、依頼文では「今回は申し込まない」という控えめな指示になる。set aside だと逆に「取っておく」で意味が変わる。',
                },
                {
                    en: 'join the site\'s marshal list for two years',
                    lit: '2年間、現場の元帥のリストに参加する',
                    real: '2年間、事業所の防火担当者名簿に登録される',
                    why: 'marshal を「元帥」で読むと軍隊の話になる。建物の安全管理では fire marshal で「避難誘導の担当者」。site も「サイト(ウェブ)」ではなく「事業所・現場」で、英国の職場文書での第一義はこちら。',
                },
            ],
        },
        {
            key: 'p7-186-190',
            items: [
                {
                    en: 'Bare-root plants are lifted while dormant',
                    lit: '裸の根の植物は休眠中に持ち上げられる',
                    real: '土を落とした苗は休眠期に掘り上げる',
                    why: '園芸の lift は「持ち上げる」ではなく「掘り上げる・掘り取る」。lift potatoes / lift bulbs と同じ。bare-root は根に土を付けない出荷形態で、軽くて安いかわりに扱える時期が限られる。',
                },
                {
                    en: 'Hedging planted between November and February settles in fastest',
                    lit: '生垣は11月から2月の間に植えると最も速く落ち着く',
                    real: '11月から2月に植えた生垣がいちばん根付きが早い',
                    why: 'settle in を「引っ越して落ち着く」で覚えていると植物の話で詰まる。根が張って環境になじむことを言い、新入社員にも同じ表現を使う。hedging も「ヘッジ(риск回避)」ではなく「生垣用の苗木」。',
                },
                {
                    en: 'we lift to order, so allow five working days',
                    lit: '注文するために持ち上げるので5営業日を許す',
                    real: '注文を受けてから掘るので5営業日みておいてください',
                    why: 'to order は「注文に応じて」で、made to order (受注生産) と同じ型。allow + 期間は「その日数を見込んでおく」という案内の決まり文句で、許可の allow ではない。working day は「営業日」。',
                },
                {
                    en: 'report any shortage within seven days',
                    lit: '7日以内に不足を報告する',
                    real: '数量不足は7日以内に申し出ること',
                    why: 'shortage を「短さ」で読むと崩れる。数量に付くと「不足・欠品」。納品書の但し書きの定番で、この期限を過ぎると請求できなくなるという含みがあり、日付の照合問題の根拠になりやすい。',
                },
                {
                    en: 'Our order was above the threshold for the volume discount',
                    lit: '注文は量の割引のための敷居の上だった',
                    real: '注文数が数量割引の適用ラインを超えていた',
                    why: 'threshold を「敷居」で読むと建具の話になる。数値の文脈では「基準となる境目・適用ライン」。above the threshold で「条件を満たしている」。volume も「音量」ではなく「数量」。',
                },
            ],
        },
        {
            key: 'p7-191-195',
            items: [
                {
                    en: 'Desks, studios and meeting space by the month',
                    lit: '月によって机、スタジオ、会議の空間',
                    real: '机・個室・会議室を月単位で貸します',
                    why: 'by the month は「月ごとに=月単位の契約で」。by the hour / by the kilo と同じ型で、the が要る。space も「宇宙」ではなく「使える場所」で、可算にせず漠然と「スペース」を指す。',
                },
                {
                    en: 'Any free desk, 07:00-20:00 on weekdays',
                    lit: 'どんな無料の机でも、平日7時から20時',
                    real: '空いている席ならどれでも、平日7時から20時',
                    why: 'free を「無料」で読むと料金表と矛盾する。席や部屋に付く free は「空いている」。Is this seat free? と同じ。any も「どんな〜も」より「そのうち好きなものを」の選択の自由を表す。',
                },
                {
                    en: 'we are raising each member\'s monthly allowance from eight hours to twelve',
                    lit: '各会員の月ごとの手当を8時間から12へ上げている',
                    real: '会員1人あたりの月の無料枠を8時間から12時間に増やす',
                    why: 'allowance を「手当・小遣い」で覚えていると金額の話に見える。時間や量に付く allowance は「認められた枠・上限」。baggage allowance と同じ発想で、超えた分は別料金という条件とセットで出る。',
                },
                {
                    en: 'Hours beyond that are charged at the usual rate',
                    lit: 'それを越えた時間は普通の割合で請求される',
                    real: '枠を超えた分は従来どおりの単価で請求する',
                    why: 'rate を「割合・レート」で読むと為替の話に見える。料金の rate は「単価」。at the usual rate は「値上げはしていない」ことを示し、増枠だけが変更点だと確定させる働きをする。',
                },
                {
                    en: 'the door code matters more to me than the desk',
                    lit: 'ドアの暗号は机より私にとってもっと重要である',
                    real: '席よりも入口の暗証番号のほうが自分には大事だ',
                    why: 'matter を名詞「事柄」でしか持っていないと動詞の用法で詰まる。自動詞の matter は「重要である」。It doesn\'t matter. と同じ語。code も「規約」ではなく「暗証番号」で、24時間入館できるかどうかの話につながる。',
                },
            ],
        },
        {
            key: 'p7-196-200',
            items: [
                {
                    en: 'Each workshop receives €9,000 and a stand',
                    lit: '各工房は9,000ユーロと立ち台を受け取る',
                    real: '各工房に9,000ユーロと出店枠が与えられる',
                    why: 'stand を「立つ・スタンド照明」で読むと止まる。市や展示会の stand は「出店ブース」で、英国式では booth より一般的。workshop も「研修会」ではなく「工房・作業場」で、ここでは職人の店を指す。',
                },
                {
                    en: 'We looked for workshops that train the next person',
                    lit: '次の人を訓練する工房を探した',
                    real: '後継者を育てている工房を選んだ',
                    why: 'the next person は「次に来る人」ではなく「次の世代の作り手」。抽象語を避けて具体的に言う英語らしい言い方で、日本語では「後継者」に当たる。この一文が受賞条件そのものになっている。',
                },
                {
                    en: 'wooden movements; repairs accepted',
                    lit: '木の動き、修理は受け入れられた',
                    real: '木製の機械部分、修理も承ります',
                    why: 'movement を「動き・運動」で読むと時計の話だと分からない。時計の movement は「内部の駆動機構」を指す専門語。repairs accepted も名簿の省略表現で、「修理の受付あり」という営業案内になっている。',
                },
                {
                    en: 'Your stand number is unchanged from last year',
                    lit: 'あなたの立ち台の番号は昨年から変えられていない',
                    real: '出店場所は昨年と同じ番号です',
                    why: 'unchanged from 〜 は「〜から変わっていない」で、比較の起点を from で示す。この一文が名簿の番号と結びついて、本人がどの工房かを特定する手がかりになる。設問の根拠が別の文書側にある型。',
                },
                {
                    en: 'we can put you at the end of a row',
                    lit: '列の終わりにあなたを置ける',
                    real: '列の端の区画に配置できます',
                    why: 'put + 人 + 場所 は「その場所に配置する」で、物を置くのと同じ動詞を人にも使う。at the end of a row も「列の最後」ではなく「列の端」で、順番ではなく位置の話をしている。',
                },
            ],
        },
    ],
};

export default TOEIC_BRIDGE_08;
