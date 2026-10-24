/**
 * TOEIC(R) L&R 形式 リーディング模試 06 -- つながらない語。
 *
 * 語注 (toeic-gloss-06.ts) とは埋めるものが違う。あちらは「知らない単語の意味」。
 * こちらは **単語は全部知っているのに文の意味が通らない** 箇所を埋める。
 *
 *  - 中学単語なのに、学校で覚えた訳を当てると文が壊れる (go / stand / run / clear / keep)
 *  - カタカナ語として輸入されていて、英語の意味とずれている (till / stand / credit / balance)
 *  - 訳語は合っているのに、文中で果たす役割が日本語と違う (of the three / in spite of / over)
 *  - 英国式の現場語で、辞書の第一義が現場では使われない (let / hire / post / rota / ring)
 *
 * 1セット3-4件。key はビューア側の参照キーと一致させる。
 *   Part 5 = 'p5-<設問番号>' / Part 6 = 'p6-<range>' / Part 7 = 'p7-<range>'
 * en は本文の表記のまま抜く (検索して原文に当たれるようにするため)。
 */
import type { ToeicBridge } from './toeic-types';

export const TOEIC_BRIDGE_06: ToeicBridge = {
    id: 'toeic-test-06',
    sets: [
        // ================= PART 5 =================
        {
            key: 'p5-110',
            items: [
                {
                    en: 'The auditors found the warehouse records unusually',
                    lit: '監査人は倉庫の記録を異常に見つけた',
                    real: '監査人が見たところ、倉庫の記録は思いのほかしっかりしていた',
                    why: 'find を「見つける」で押し通すと壊れる。find + 目的語 + 形容詞 の形は「~が…だと分かる」で、見つけた話ではなく評価の話。found the room empty / found the service slow も同じ形。空所には記録の出来ばえを言う形容詞が入ると分かれば、選択肢を意味で切れる。',
                },
                {
                    en: 'for a company of that size',
                    lit: 'その大きさの会社のために',
                    real: 'その規模の会社にしては',
                    why: 'for を「~のために」で読むと、誰のための記録かという話になってしまう。この for は基準を示す用法で「~にしては」。good for a beginner / warm for October と同じ使い方。',
                },
                {
                    en: 'records',
                    lit: 'レコード',
                    real: '帳簿、記録類',
                    why: 'カタカナのレコードは音楽盤か記録更新の意味で入っているが、ビジネス文書では複数形で「帳簿・台帳のたぐい」を指す。keep records / financial records で1セットにする。',
                },
            ],
        },
        {
            key: 'p5-113',
            items: [
                {
                    en: 'the shipment clears customs',
                    lit: '積荷が税関を掃除する',
                    real: '荷物の通関が済む',
                    why: 'clear を「きれいにする」でしか持っていないと訳せない。clear は「関門を通り抜ける、許可が下りる」で、clear customs / clear security / clear the inspection と使う。TOEIC の物流文書では通関の意味でよく出る。',
                },
                {
                    en: 'The crew',
                    lit: '乗組員',
                    real: '作業班、現場の担当者たち',
                    why: '船や飛行機の乗員だけの語ではない。倉庫・工事・イベントの現場で動く一団も crew。この文では積み込みをする荷役の班のこと。',
                },
                {
                    en: 'refrigerated trailers',
                    lit: '冷蔵されたトレーラー',
                    real: '冷蔵車、リーファー',
                    why: 'refrigerated は「冷やされた」だが、車両や貨物室に付くと「冷蔵設備のある」という装備の説明になる。refrigerated van / refrigerated container も同じ。',
                },
            ],
        },
        {
            key: 'p5-118',
            items: [
                {
                    en: 'Of the three warehouses',
                    lit: '3つの倉庫の',
                    real: '3つある倉庫のうち',
                    why: '文頭に置かれた of は所有ではなく、後ろの主語がどの集合から選ばれるかを示す。Of the four candidates, only one ~ の形で「~のうち」。この of を見た時点で、空所には集合の中から選ぶ語 (none / one / neither など) が来ると分かる。',
                },
                {
                    en: 'leases',
                    lit: 'リースする',
                    real: '賃借している',
                    why: 'カタカナのリースは貸す側の商売の意味で入っているが、英語の lease は借りる側にも使う。ここは会社が倉庫を借りている側。sign a lease / lease an office はどちらも借り手の行為。',
                },
                {
                    en: 'a rail siding',
                    lit: '鉄道のサイド',
                    real: '引き込み線',
                    why: 'siding は本線から敷地内へ引き込んだ待避線のこと。倉庫の説明で出たら「貨車を横付けできる設備がある」という強みを言っている。',
                },
            ],
        },
        {
            key: 'p5-119',
            items: [
                {
                    en: 'operate on a reduced schedule',
                    lit: '減らされた予定の上で操業する',
                    real: '稼働を落として動かす',
                    why: 'on a ~ schedule / on a ~ basis の on は「~という方式で」。on a reduced schedule で操業を通常より絞った状態を指す。日本語の「上で」を当てると意味が消える。',
                },
                {
                    en: 'ahead of',
                    lit: '~の前方に',
                    real: '~に先立って、~を控えて',
                    why: 'ahead を空間の「前」でしか持っていないと時間の文で詰まる。ahead of the inspection / ahead of schedule のように、時間の前後にもそのまま使う。次に出たら、後ろが出来事なら時間だと決めてよい。',
                },
                {
                    en: 'the annual safety inspection',
                    lit: '毎年の安全な検査',
                    real: '年に一度の安全点検',
                    why: 'safety は形容詞の safe と役割が違い、名詞のまま前に置いて「安全のための~」を作る。safety inspection / safety training / safety record はどれもこの型。',
                },
            ],
        },
        {
            key: 'p5-123',
            items: [
                {
                    en: 'came in slightly under budget',
                    lit: '予算の下にわずかに入ってきた',
                    real: '費用が予算をやや下回って収まった',
                    why: 'come in under budget / come in over budget は工事や案件の締めで使う決まり文句。come in を「入ってくる」と読むと主語の costs が動いてしまう。着地点を言う言い方だと覚える。',
                },
                {
                    en: 'in spite of',
                    lit: '~の悪意で',
                    real: '~にもかかわらず',
                    why: 'spite 単独は「悪意」だが、in spite of の3語で譲歩を表す前置詞になる。後ろは必ず名詞句で、節は続かない。節を続けたいときは although を使う。',
                },
                {
                    en: 'the delay caused by the summer storms',
                    lit: '夏の嵐によって引き起こされた遅れ',
                    real: '夏の悪天候で出た遅れ',
                    why: '訳は合っているのに読みにくいのは、caused 以下が後ろから delay を修飾する過去分詞句だから。名詞の直後の過去分詞は「~された…」とまとめて1つの名詞のかたまりにする。',
                },
            ],
        },
        {
            key: 'p5-130',
            items: [
                {
                    en: 'look into',
                    lit: '~の中をのぞく',
                    real: '~を調べる、原因を当たる',
                    why: '物理的にのぞき込む意味もあるが、苦情・誤り・事故を目的語に取ると「調査する」。look into the matter / look into a complaint は定型。investigate の口語版だと思ってよい。',
                },
                {
                    en: 'the billing errors',
                    lit: 'ビリングエラー',
                    real: '請求書の誤り',
                    why: 'billing は「請求する事務」全般を指す名詞で、bill (請求書) と使い分ける。billing address / billing cycle / billing department はどれも請求まわりの語。',
                },
                {
                    en: 'three franchise owners',
                    lit: '3人のフランチャイズの持ち主',
                    real: '加盟店3店のオーナー',
                    why: 'カタカナのフランチャイズは本部の制度を指すことが多いが、英語では加盟している店そのものも franchise。owner はその店を持って経営している人で、本部の社員ではない。',
                },
            ],
        },

        // ================= PART 6 =================
        {
            key: 'p6-131-134',
            items: [
                {
                    en: 'The portal shows live availability',
                    lit: 'ポータルは生きている利用可能性を示す',
                    real: '今この瞬間の空き状況がそのまま画面に出る',
                    why: 'live は「生の」ではなく「リアルタイムの」。live availability / live tracking / live updates で、待たずに今の値が見えることを表す。availability は「空き」で、名詞1語で予約の可否を指す。',
                },
                {
                    en: 'will be asked to choose the half-day rate at checkout',
                    lit: 'チェックアウトで半日料金を選ぶよう頼まれる',
                    real: '支払いを確定する画面で半日料金を選ぶことになる',
                    why: 'checkout をホテルの精算でしか持っていないと場面がずれる。ここは予約サイトの最後の確認画面。be asked to do も「頼まれる」より「~することになっている」に近い、規則の柔らかい言い方。',
                },
                {
                    en: 'printing credits',
                    lit: '印刷の信用',
                    real: '印刷に使える前払いの残高',
                    why: 'credit は「信用」から離れて「使える残り」を指すことが多い。printing credits / travel credit / account credit はいずれも金額の残高。複数形になっていたら残高だと思ってよい。',
                },
                {
                    en: 'telephone ahead',
                    lit: '前方へ電話する',
                    real: '前もって電話を入れておく',
                    why: 'ahead は時間の「先に」。telephone ahead / call ahead / book ahead で「事前に~する」。空間の前方だと読むと文が成立しない。',
                },
            ],
        },
        {
            key: 'p6-135-138',
            items: [
                {
                    en: 'leaves little time for',
                    lit: '~のために少しの時間を残す',
                    real: '~に手が回らなくなる',
                    why: 'little は a little と違って否定寄りで「ほとんど無い」。leaves little time で「時間がほとんど残らない」となり、広告の困りごとの提示になる。a を落とすだけで意味が反転する語なので、冠詞の有無を必ず見る。',
                },
                {
                    en: 'on the next delivery round',
                    lit: '次の配達の丸で',
                    real: '次に回ってくる配達のときに',
                    why: 'round は決まった順路をひと回りすること。delivery round / paper round / a round of visits で「巡回」。丸や円と訳すと文が壊れる。',
                },
                {
                    en: 'a free monthly count of their linen',
                    lit: '彼らのリネンの無料の月次カウント',
                    real: '布類の在庫を毎月ただで数えてくれるサービス',
                    why: 'count がここでは名詞で「棚卸し」。stock count / head count と同じ用法。linen も麻布ではなく、テーブルクロス・タオル・エプロンなど業務用の布類の総称。',
                },
                {
                    en: 'Rates start at',
                    lit: 'レートは~で始まる',
                    real: '料金は~から',
                    why: 'rate は為替や比率だけでなく「単価・料金」。start at ~ は最低額の提示で、日本語の「~から」に当たる。広告の価格欄で必ず出る型。',
                },
            ],
        },
        {
            key: 'p6-139-142',
            items: [
                {
                    en: 'the balance of your stand fee',
                    lit: '出展料のバランス',
                    real: '出展料の残額',
                    why: 'カタカナのバランスは釣り合いの意味で入っているが、金銭の文脈では「差し引きの残り」。balance due / outstanding balance / account balance はすべて残高の話。',
                },
                {
                    en: 'Build-up in Hall 2',
                    lit: 'ホール2での積み上げ',
                    real: 'ホール2の搬入・設営',
                    why: '展示会では設営を build-up、撤去を breakdown と呼ぶ。build を「建てる」で読むと会場を建設する話に見えてしまう。会期前日の作業を指す業界語。',
                },
                {
                    en: 'the loading bay',
                    lit: '積み込みの湾',
                    real: '荷さばき場、搬入口',
                    why: 'bay は湾のほかに「区切られた一区画」を指す。loading bay / parking bay / service bay はどれも用途で区切った場所。湾と訳すと海の話になる。',
                },
                {
                    en: 'your stand',
                    lit: 'あなたのスタンド',
                    real: 'あなたのブース、出展区画',
                    why: '英国系の展示会では booth ではなく stand と言う。stand number / stand fee / stand builder もこの系統。売店のスタンドや照明のスタンドとは別物。',
                },
            ],
        },
        {
            key: 'p6-143-146',
            items: [
                {
                    en: 'the former grain store',
                    lit: '昔の穀物の店',
                    real: '元の穀物倉庫',
                    why: 'store を「店」でしか持っていないと建物の性格を取り違える。英国系では store が「保管する場所」で、grain store / cold store / store room はどれも倉庫。動詞の store (しまう) から素直につながる。',
                },
                {
                    en: 'has stood empty since 2019',
                    lit: '2019年から空っぽで立ってきた',
                    real: '2019年からずっと空き家のままだった',
                    why: 'stand は「立つ」より「~の状態でいる」。stand empty / stand idle / stand ready で状態の継続を表す。建物が主語のときは、この用法だと思ってよい。',
                },
                {
                    en: 'will stock beer from four other Scottish producers',
                    lit: '4社のビールを在庫する',
                    real: '他社のビールも置いて出す',
                    why: 'stock が動詞で「商品としてそろえる」。We stock all sizes. のように店の品ぞろえを言う。名詞の在庫としか覚えていないと、will の後ろに置けず選択肢を切ってしまう。',
                },
                {
                    en: 'required eleven months of structural work',
                    lit: '11か月の構造の仕事を要求した',
                    real: '躯体の工事に11か月かかった',
                    why: 'require は「要求する」だけでなく「~を必要とする」で、物や工程が主語になれる。structural work は内装ではなく建物の骨組みに手を入れる工事のこと。',
                },
            ],
        },

        // ================= PART 7 single =================
        {
            key: 'p7-147-148',
            items: [
                {
                    en: 'were due to reach you on 9 October',
                    lit: '10月9日にあなたに達する義務があった',
                    real: '10月9日に届く予定だった',
                    why: 'due を「期限の、当然の」で止めると硬くなる。be due to do は単純に「~する予定である」。The train is due to arrive at six. と同じで、義務の意味は無い。',
                },
                {
                    en: 'the shipment will not arrive at our yard until 16 October',
                    lit: '16日まで荷は着かない',
                    real: '荷が着くのは16日になる',
                    why: 'not ~ until … を「…まで~しない」と直訳すると、いつ着くのかが読み取れない。着く時点は until の後ろの日付。日本語では肯定文にひっくり返して読むと速い。yard も庭ではなく、資材や荷を置く敷地のこと。',
                },
                {
                    en: 'at no charge',
                    lit: '請求無しで',
                    real: '無料で',
                    why: 'free of charge と同じ意味の言い換え。charge は「充電・突撃」ではなく料金。at no cost / at no extra charge も同じ形で、TOEIC のサービス案内では必ず出る。',
                },
                {
                    en: 'which arrangement suits your crew',
                    lit: 'どの配置があなたの乗組員に似合うか',
                    real: 'どちらの段取りでいくか',
                    why: 'arrangement は物の配置だけでなく「取り決め・段取り」。make arrangements で「手配する」。suit も服が似合うではなく「都合が合う」。Does Friday suit you? が同じ用法。',
                },
            ],
        },
        {
            key: 'p7-149-150',
            items: [
                {
                    en: 'Unit price',
                    lit: 'ユニットの価格',
                    real: '1個あたりの値段',
                    why: 'unit は部屋や機械の一台を指すこともあるが、伝票の欄では「数量1つ分」。Unit price と Line total を並べて読むと、単価と小計の関係がすぐ取れる。',
                },
                {
                    en: 'Total due',
                    lit: '合計の期限',
                    real: 'お支払い額',
                    why: 'due は「期限が来ている」から転じて「支払うべき」。amount due / balance due / rent due も同じで、期日そのものを指す語ではない。',
                },
                {
                    en: 'Damaged goods must be reported within five working days',
                    lit: '5つの働く日の中で報告されなければならない',
                    real: '5営業日以内に申し出ること',
                    why: 'working day は土日祝を除いた営業日。日本語で「5日以内」と読むと期限を1週間近く見誤る。business day も同じ意味で使う。',
                },
                {
                    en: 'Orders above EUR 500 include a free assembly guide',
                    lit: '500ユーロより上の注文は無料の組立案内を含む',
                    real: '500ユーロを超える注文には組立説明書が無料で付く',
                    why: 'include の主語が人ではなく注文になっている。日本語では「~には…が付く」と受け身に近い形で読むと自然。設問で「何が付くか」を問われたときの根拠になる型。',
                },
            ],
        },
        {
            key: 'p7-151-154',
            items: [
                {
                    en: 'the last mile',
                    lit: '最後の1マイル',
                    real: '配送の最終区間、届け先までの一区切り',
                    why: '距離の話ではなく物流の用語。倉庫から先、受け取り手の玄関までの区間を指す。見出しに出たら「宅配の最後の部分をどうするか」という記事だと当たりが付く。',
                },
                {
                    en: 'Riders matched the daily stop count of the van drivers',
                    lit: '乗り手はバン運転手の1日の停止回数に合わせた',
                    real: '自転車側も1日に回る配達件数でバンと並んだ',
                    why: 'stop は「止まること」ではなく配達で立ち寄る1軒。stop count で訪問件数。match も「合わせる」ではなく「同等の成績を出す」。数字の比較の文だと分かれば設問に直結する。',
                },
                {
                    en: 'hunting for a space',
                    lit: '空間を狩る',
                    real: '駐車できる場所を探し回る',
                    why: 'hunt for は探し物にそのまま使う。space も宇宙や余白ではなく1台分の駐車枠。a parking space の space だけが残った形。',
                },
                {
                    en: 'which keeps its vans',
                    lit: 'それはバンを保つ',
                    real: 'そちらの仕事は今後もバンを使い続ける',
                    why: 'keep を「保管する」で読むと、置いてあるだけに見える。ここは「手放さない、今のまま続ける」。keep the old system / keep the same supplier も同じ使い方。',
                },
            ],
        },
        {
            key: 'p7-155-156',
            items: [
                {
                    en: 'The bulb went last Thursday',
                    lit: '電球は先週の木曜に行った',
                    real: '電球は先週の木曜に切れた',
                    why: 'go は機械や部品を主語にすると「だめになる、壊れる」。The battery went. / My knees are going. と同じ。この一語を読み違えると、なぜ投影機が映らないのかが分からなくなる。',
                },
                {
                    en: 'the sales team has it booked until three',
                    lit: '営業チームはそれを3時まで予約されて持っている',
                    real: '営業チームが3時まで押さえている',
                    why: 'have + 目的語 + 過去分詞 は「~された状態にしてある」。have a room booked / have the car repaired の型。受け身の訳し方をそのまま当てると誰が予約したのか分からなくなる。',
                },
                {
                    en: 'So the boardroom it is',
                    lit: 'だから会議室はそれです',
                    real: 'じゃあ会議室で決まりだね',
                    why: '名詞を前に出して it is で受ける、話し言葉の決まり文句。選択肢を検討した後に「ではこれで」と結論を置くときに使う。文法どおりに戻すと So it is the boardroom.',
                },
                {
                    en: 'if the cable is still with it',
                    lit: 'ケーブルがまだそれと一緒なら',
                    real: 'ケーブルが本体に付いたまま置いてあれば',
                    why: 'with は「一緒に」より「付属して」。the manual that came with it / the charger with the laptop と同じで、備品が本体とセットで保管されている状態を指す。',
                },
            ],
        },
        {
            key: 'p7-157-159',
            items: [
                {
                    en: 'Our four rooms are let by the half day',
                    lit: '4つの部屋は半日で手放される',
                    real: '4つの部屋は半日単位で貸し出している',
                    why: 'let は英国式で「貸す」。to let の看板は貸室の意味。by the ~ は単位を示し、by the hour / by the day / by the half day で「~単位で」。let を「させる」で読むと文が成立しない。',
                },
                {
                    en: 'takes up to forty in rows',
                    lit: '列で40まで取る',
                    real: '椅子を並べる形なら40人まで入る',
                    why: 'take は会場を主語にすると「収容する」。The hall takes 200. の形。in rows は机を置かず椅子だけを並べた劇場型の配置で、会議室の案内では定番の言い方。',
                },
                {
                    en: 'Half-day hire starts at EUR 120',
                    lit: '半日の雇用は120ユーロから始まる',
                    real: '半日の利用料は120ユーロから',
                    why: 'hire を「雇う」でしか持っていないと料金表が読めない。英国式では物を借りることも hire で、car hire / equipment hire / hire charge と使う。start at は最低額の提示。',
                },
                {
                    en: 'Bookings for Fridays carry a EUR 20 reduction',
                    lit: '金曜の予約は20ユーロの削減を運ぶ',
                    real: '金曜の予約は20ユーロ引きになる',
                    why: 'carry は「運ぶ」から離れて「~を伴う、~が付く」。carry a fee / carry a warranty / carry a penalty も同じ型。reduction はここでは値引き額。',
                },
            ],
        },
        {
            key: 'p7-160-161',
            items: [
                {
                    en: 'the mark I have taken off is for the packing',
                    lit: '私が取り去った印は梱包のためだ',
                    real: '減点したのは梱包に対してだ',
                    why: 'mark は評価の点数で、take off は点を引くこと。take a mark off / knock a point off はレビューの決まり文句。印を剥がした話だと読むと、評価の理由がまるごと落ちる。',
                },
                {
                    en: 'The mesh is firmer than the model on display',
                    lit: '網は展示の上のモデルより固い',
                    real: '網地は店頭に出ている見本より張りが強い',
                    why: 'on display は「陳列されている」で、店頭の展示品を指す名詞のうしろに置く。model も模型ではなく「型・機種」。買った品と店で見た品を比べている文だと分かる。',
                },
                {
                    en: 'The order came in three separate boxes over nine days',
                    lit: '注文は9日を超えて3つの箱で来た',
                    real: '注文の品が9日かけて3箱に分かれて届いた',
                    why: 'over + 期間 は「~の間ずっと、~かけて」。over the summer / over three weeks も同じ。「~を超えて」と読むと日数が9日以上に見えてしまう。',
                },
                {
                    en: 'The company replied to my message within the hour',
                    lit: 'その時間の中で返信した',
                    real: '1時間もしないうちに返信してきた',
                    why: 'within an hour ではなく within the hour だと「今から1時間経たないうちに」という速さの強調になる。定冠詞1文字で語感が変わる型で、レビューでは対応の速さをほめる合図。',
                },
            ],
        },
        {
            key: 'p7-162-164',
            items: [
                {
                    en: 'Only one lift will be out of service at a time',
                    lit: '一度に1つのリフトだけがサービスの外になる',
                    real: '止めるのは常に1基だけで、もう1基は動かす',
                    why: 'out of service は機械や車両が「使用停止中」。at a time は「同時に~ずつ」。この2つを合わせると、工事中も必ず1基は動くという読み手にとって最重要の情報になる。lift は英国式でエレベーター。',
                },
                {
                    en: 'the rear stairwell will be lit and unlocked',
                    lit: '後ろの階段の吹き抜けは照らされ解錠される',
                    real: '裏の階段は明かりがつき、鍵も開いた状態にする',
                    why: 'lit は light の過去分詞で「照明が入っている」。stairwell は階段そのものではなく階段が入った縦の空間で、建物の告知ではこの語で階段室を指す。',
                },
                {
                    en: 'Post will be sorted in the lobby',
                    lit: 'ポストはロビーで並べ替えられる',
                    real: '郵便物の仕分けはロビーで行う',
                    why: 'post は英国式で「郵便物」。柱や役職の意味で読むと文が壊れる。sort も「種類」ではなく動詞で「仕分ける」。by post (郵送で) / post room (郵便室) も同じ系統。',
                },
                {
                    en: 'at least two working days beforehand',
                    lit: '少なくとも2つの働く日前もって',
                    real: '遅くとも2営業日前までに',
                    why: 'beforehand は「前もって」で、期間の語の後ろに置く。two working days beforehand で「2営業日前までに」。in advance に置き換えられる。',
                },
            ],
        },
        {
            key: 'p7-165-167',
            items: [
                {
                    en: 'run the loading floor',
                    lit: '積み込みの床を走る',
                    real: '荷役の現場を仕切る',
                    why: 'run は「走る」より「回す・運営する」で使われることの方が多い。run a shop / run a shift / run a meeting。floor も床ではなく作業をする場所そのもの (shop floor と同じ)。',
                },
                {
                    en: 'Brief the morning supervisor at handover',
                    lit: '朝の監督者を短くする',
                    real: '引き継ぎのときに朝の責任者へ要点を伝える',
                    why: 'brief は形容詞の「短い」だけでなく動詞で「手短に説明する」。brief the team / a briefing はこの系統。handover は交代のときの引き継ぎで、夜勤の求人では必ず出る語。',
                },
                {
                    en: 'is an asset but not a condition of appointment',
                    lit: '資産だが任命の条件ではない',
                    real: 'あれば強みになるが、採用の必須条件ではない',
                    why: 'asset は財務諸表の資産のほかに「役に立つもの・強み」。He is an asset to the team. と同じ。appointment も約束ではなく「採用・任命」で、求人票の語としては人事の意味になる。',
                },
                {
                    en: 'with a supplement for nights worked at the weekend',
                    lit: '週末に働かれた夜のためのサプリ付き',
                    real: '週末の夜勤には割増がつく',
                    why: 'supplement はカタカナの栄養補助食品ではなく「上乗せ分」。単価に足される手当のこと。nights worked は「働いた夜」を後ろから縮めた形で、worked が nights を修飾している。',
                },
            ],
        },
        {
            key: 'p7-168-171',
            items: [
                {
                    en: 'the breakage figures from the Limerick run',
                    lit: 'リムリックの走りからの破損の数字',
                    real: 'リムリック工場の稼働1回分で出た破損の数値',
                    why: 'run は「ひと続きの生産・稼働」。a production run / a print run / a test run。工場の話で from the ~ run と出たら、その回のロットのことだと決めてよい。figures も人物像ではなく数値。',
                },
                {
                    en: 'two of the six pallets sent by road showed cracked shoulders',
                    lit: '6つのパレットのうち2つがひびの入った肩を見せた',
                    real: '陸送した6枚のうち2枚で、瓶の肩の部分に割れが出た',
                    why: 'show を「見せる」と訳すとパレットが意思を持つように読める。ここは「~が見られた、~が出た」という症状の提示。shoulder は瓶の胴から口へ細くなる曲面部分を指す業界語。',
                },
                {
                    en: 'the fault lies in the corner protection of the pallet',
                    lit: '過失はパレットの角の保護に横たわる',
                    real: '原因はパレットの角の保護材の方にある',
                    why: 'fault は「過失」より「不具合の原因」。lie in は「~にある」で、The problem lies in the design. と同じ。人の責任を問う文ではないと分かると、設問の原因特定に直結する。',
                },
                {
                    en: 'If the figures hold',
                    lit: 'もし数字が持つなら',
                    real: 'この数値が次も同じように出れば',
                    why: 'hold は自動詞で「そのまま保たれる、崩れない」。The weather will hold. / The offer holds. も同じ。仮定の条件として使われたら「今回の結果が再現すれば」という意味になる。',
                },
            ],
        },
        {
            key: 'p7-172-175',
            items: [
                {
                    en: 'The new till software goes live',
                    lit: '新しい~までのソフトが生きに行く',
                    real: '新しいレジのソフトが本稼働を始める',
                    why: 'till は前置詞の「~まで」と同じつづりだが、名詞では英国式で「レジ」。go live はシステムが試験を終えて実運用に入ること。2語とも学校英語の訳では文が組み立たない。',
                },
                {
                    en: 'wants the counter clear from eight',
                    lit: 'カウンターを8時からきれいにしたがっている',
                    real: 'レジ台の上を8時から何も置かない状態にしてほしがっている',
                    why: 'clear は「掃除する」ではなく「物が無い状態」。keep the aisle clear / the desk is clear と同じ。掃除の話だと取ると、なぜ開店3時間前なのかが分からなくなる。',
                },
                {
                    en: 'stock count has to be keyed in',
                    lit: '在庫の数が鍵で入れられる',
                    real: '棚卸しの数字を入力しなければならない',
                    why: 'key が動詞で「キーボードから打ち込む」。key in the data / keyed in by hand。stock count は棚卸しそのもの。どちらも現場語で、辞書の第一義では届かない。',
                },
                {
                    en: 'I will leave the count sheets in the safe',
                    lit: '数え表を安全に残す',
                    real: '棚卸し表は金庫に入れておく',
                    why: 'safe は形容詞の「安全な」と同じつづりで名詞の「金庫」。the safe と冠詞が付いていたら物のこと。leave も「去る」ではなく「置いておく」。',
                },
            ],
        },

        // ================= PART 7 multiple =================
        {
            key: 'p7-176-180',
            items: [
                {
                    en: 'Ring 03 555 0177 to discuss long runs',
                    lit: '長い走りを議論するために鳴らせ',
                    real: 'まとまった部数の相談は電話で',
                    why: 'ring は英国式で「電話する」。give us a ring も同じ。run はここでも「ひと続きの製造」で、印刷では刷り部数のこと。a run of 500 copies と使う。',
                },
                {
                    en: 'Could you accommodate the order',
                    lit: '注文を宿泊させられますか',
                    real: 'この注文を引き受けられますか',
                    why: 'accommodate を「収容する」だけで持っていると、宿や座席の話に見える。日程・要望・注文を目的語に取ると「都合をつけて受ける」。accommodate a request も同じ。',
                },
                {
                    en: 'Next-day collection',
                    lit: '翌日の収集',
                    real: '翌日の引き取り',
                    why: 'collection は切手の収集ではなく「回収・引き取り」。ここは客が店まで取りに行く側の受け取りを指す。collect the copies / ready for collection と続けて覚える。',
                },
                {
                    en: 'sewn and trimmed in our own workshop',
                    lit: '自分たちの作業場で縫われ切られた',
                    real: '製本の糸かがりと断裁まで自社の工房でやっている',
                    why: 'trim は「飾る」ではなく余分を切り落とすこと。本では小口を裁ちそろえる工程。sewn は sew の過去分詞で、糸でかがる昔ながらの製本を指す。自社でやっているという売り文句。',
                },
            ],
        },
        {
            key: 'p7-181-185',
            items: [
                {
                    en: 'let by the hour to registered food businesses',
                    lit: '登録された食品業者に時間で手放される',
                    real: '登録済みの食品事業者に1時間単位で貸している',
                    why: 'let はここでも英国式の「貸す」。by the hour は課金の単位。registered は役所に届け出て許可を受けている状態で、誰でも借りられるわけではないという条件を示す。',
                },
                {
                    en: 'Sessions of six hours or more in one visit receive a ten percent reduction',
                    lit: '1回の訪問で6時間以上のセッションは10パーセントの削減を受け取る',
                    real: '1回で6時間以上使うと1割引きになる',
                    why: 'session は会議や講習だけでなく「1回の作業のまとまり」。in one visit が「分けずに一度で」という条件を作っている点が肝で、合計6時間では割引にならない。',
                },
                {
                    en: 'so a kitchen without one is no use to me',
                    lit: '~の無い厨房は私にとって使用ではない',
                    real: '~が置いていない厨房では話にならない',
                    why: 'be no use to ~ で「~の役に立たない」。It is no use complaining. の use と同じで、名詞の「役立つこと」。one は前に出た機器を受ける代名詞で、何を指すかを取り違えると条件が読めない。',
                },
                {
                    en: 'as soon as they come off the heat',
                    lit: '熱から離れるとすぐ',
                    real: '火から下ろしたらすぐに',
                    why: 'come off the heat は調理の現場語で「加熱を終える」。the heat がコンロの火そのものを指す。直訳の「熱から来る」では動作の向きが逆になる。',
                },
            ],
        },
        {
            key: 'p7-186-190',
            items: [
                {
                    en: 'Places are held for ten days after a booking is made',
                    lit: '場所は予約の後10日間持たれる',
                    real: '申し込みから10日間は席を押さえておく',
                    why: 'place は場所だけでなく「定員の1つ分、受講枠」。a place on the course / two places left。hold も「持つ」ではなく「確保しておく」で、hold a table / hold the line と同じ。',
                },
                {
                    en: 'cannot take a day out of the workshop',
                    lit: '工房から1日を取ることができない',
                    real: '現場を1日空けられない',
                    why: 'take a day out of ~ で「~から1日抜ける」。休暇の take a day off とは形が違い、抜ける先を out of で示している。workshop も講習会ではなくここでは作業場そのもの。',
                },
                {
                    en: 'hold four places while I check the workshop rota',
                    lit: '工房の回転を確認する間、4つの場所を持って',
                    real: '勤務表を確認する間、4人分の席を押さえておいてほしい',
                    why: 'rota は英国式で「勤務当番表」。ローテーションの短縮形に見えるが、名詞として日程表そのものを指す。誰をどの日に出すかを決める表のこと。',
                },
                {
                    en: 'the trainer who is able to come out to us',
                    lit: '私たちのところに出て来られる講師',
                    real: 'こちらまで出向いてくれる講師',
                    why: 'come out to ~ は「~まで足を運ぶ」。訪問される側から見た言い方で、日本語の「出張してくれる」に当たる。out を外へ出る動作と読むと、誰がどこへ行くのか分からなくなる。',
                },
            ],
        },
        {
            key: 'p7-191-195',
            items: [
                {
                    en: 'Every inbound delivery must be booked',
                    lit: 'すべての内向きの配達は予約されなければならない',
                    real: '入ってくる納品はすべて事前に枠を取ること',
                    why: 'inbound は倉庫から見て「入荷」、outbound が「出荷」。方向を示すだけの語だが、これを取り違えると誰が誰に届ける話か反転する。book も本ではなく動詞で「枠を押さえる」。',
                },
                {
                    en: 'Vehicles that arrive without a booking will be turned away',
                    lit: '予約無しで到着した車両は向きを変えられる',
                    real: '予約の無い車は受け付けずに帰す',
                    why: 'turn away は「追い返す、門前払いにする」。turn down (断る) と混ざりやすいが、こちらは来た相手をその場で入れないこと。掲示では罰則の一文として出る。',
                },
                {
                    en: 'which has two levellers and a covered dock',
                    lit: '2つの水平器と覆われたドックを持つ',
                    real: '荷台と床の段差を埋める板が2台と、屋根つきの荷降ろし場がある',
                    why: 'leveller は水平を測る道具ではなく、トラックの荷台の高さに合わせて渡す可動式の板。dock も船着き場ではなく倉庫の荷降ろし口。どちらも倉庫の設備を売り込む語。',
                },
                {
                    en: 'one of our two vans is off the road until 8 April',
                    lit: '2台のうち1台は4月8日まで道路から外れている',
                    real: '2台のうち1台が4月8日まで走れない',
                    why: 'off the road は車が整備や故障で使えない状態を指す決まり文句。道を外れて走っているわけではない。逆に back on the road で「復帰した」。',
                },
            ],
        },
        {
            key: 'p7-196-200',
            items: [
                {
                    en: 'Inside fourteen days we keep half the package price',
                    lit: '14日の内側で私たちは半分の値段を保つ',
                    real: '14日を切ってからの取り消しは、料金の半額をこちらが申し受ける',
                    why: 'inside + 期間 は「~を切ってから、~以内に迫って」。within と同じ範囲を指すが、期限が近づいた側を強調する言い方。keep も「保管する」ではなく「返さずに受け取る」。',
                },
                {
                    en: 'Damaged side panels are charged at cost',
                    lit: '損傷した側の板はコストで請求される',
                    real: '破れた側幕は実費で請求する',
                    why: 'at cost は「原価で、上乗せ無しの実費で」。値引きの意味ではなく、修理や交換にかかった額をそのまま請求するという条件。charge は動詞で「請求する」。',
                },
                {
                    en: 'It went up in the rain without a word of complaint from your crew',
                    lit: 'それは雨の中を上がった',
                    real: '雨の中でも天幕はきちんと立った',
                    why: 'go up は建物や仮設物が「建つ、立ち上がる」。The tent went up in an hour. と同じ。値上がりの go up と同じ形なので、主語が物か価格かで判断する。',
                },
                {
                    en: 'I would like to settle this before then',
                    lit: 'それまでにこれを落ち着かせたい',
                    real: 'その前に支払いを済ませておきたい',
                    why: 'settle は金銭の文脈では「精算する、払い終える」。settle an invoice / settle the bill / settle up。もめ事を収める意味と地続きだが、請求書の話では支払いのことだと決めてよい。',
                },
            ],
        },
    ],
};

export default TOEIC_BRIDGE_06;
