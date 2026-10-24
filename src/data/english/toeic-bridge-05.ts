/**
 * TOEIC(R) L&R 形式 リーディング模試 05 -- つながらない語。
 *
 * 語注 (toeic-gloss-05.ts) とは埋めるものが違う。あちらは「知らない単語の意味」。
 * こちらは **単語は全部知っているのに文の意味が通らない** 箇所を埋める。
 *
 *  - 中学単語なのに、学校で覚えた訳を当てると文が壊れる (take / hold / put / run)
 *  - カタカナ語として輸入されていて、英語の意味とずれている (service / tune / slot / volume)
 *  - 訳語は合っているのに、文中で果たす役割が日本語と違う (Once / given over to)
 *  - 現場語で、辞書の第一義が現場では使われない (bay / unit / to order / hire note)
 *
 * 1セット3-5件。key はビューア側の参照キーと一致させる。
 *   Part 5 = 'p5-<設問番号>' / Part 6 = 'p6-<range>' / Part 7 = 'p7-<range>'
 * en は本文の表記のまま抜く (検索して原文に当たれるようにするため)。
 */
import type { ToeicBridge } from './toeic-types';

export const TOEIC_BRIDGE_05: ToeicBridge = {
    id: 'toeic-test-05',
    sets: [
        // ================= PART 5 =================
        {
            key: 'p5-110',
            items: [
                {
                    en: 'negotiated the new lease on behalf of the entire tenants’ association',
                    lit: '組合全体の後ろで新しい賃貸契約を交渉した',
                    real: '組合全体を代表して新しい賃貸契約をまとめた',
                    why: 'behalf を単語として覚えていない人が多く、half(半分) に引かれて「半分の側で」と読んでしまう。on behalf of ～ で「～の代理として、～を代表して」。契約・申請・謝辞の場面で1回は出る決まり文句なので、3語の塊で覚える。',
                },
                {
                    en: 'negotiated the new lease',
                    lit: '新しい賃貸契約を交渉した',
                    real: '新しい賃貸契約の条件を掛け合ってまとめた',
                    why: 'negotiate は「交渉する」と訳すと自動詞に見えるが、TOEIC では目的語を直接取る他動詞の形が普通。negotiate a contract / a price / a lease で「話をつけて決める」。',
                },
                {
                    en: 'lease',
                    lit: 'リース',
                    real: '賃貸借契約、借りている物件そのもの',
                    why: 'カタカナのリースは機械の長期レンタルの意味で入っているが、英語では建物の賃貸契約を指すことの方が多い。sign a lease / renew a lease は不動産の話。',
                },
            ],
        },
        {
            key: 'p5-114',
            items: [
                {
                    en: 'The technician will call ------- so that the loading gate can be unlocked in advance.',
                    lit: '技術者は搬入門が事前に解錠されうるように前方へ電話する',
                    real: '技術者は到着前に電話を入れ、搬入口の鍵を開けておいてもらう',
                    why: '空所に入る ahead を空間の「前方」でしか持っていないと訳せない。ahead は時間の「先に、前もって」も表し、call ahead / plan ahead / book ahead で「事前に～する」。go ahead(先に進める) と合わせて、この ahead は時間だと覚える。',
                },
                {
                    en: 'so that the loading gate can be unlocked in advance',
                    lit: '搬入門が事前に鍵を外されうるように',
                    real: '搬入口の鍵を先に開けておいてもらうために',
                    why: 'unlock は「解錠する」だが、受け身で書かれると誰がやるのかが消える。ビジネス文書では「先方に開けておいてもらう」という依頼の含みで使う。so that ～ can do は目的で、「～できるように」。',
                },
                {
                    en: 'The technician',
                    lit: 'その技術者',
                    real: '(点検や修理に来る) 担当の作業員',
                    why: 'technician を「技術者、エンジニア」と大きく取ると人物像がずれる。TOEIC の technician は現場に出向いて機械を点検・修理する担当者で、engineer(設計・開発側) とは役割が違う。訪問・入館の話とセットで出る。',
                },
            ],
        },
        {
            key: 'p5-115',
            items: [
                {
                    en: 'Once the shipment clears customs',
                    lit: 'いったん積荷が税関をきれいにすると',
                    real: '積荷の通関が終わったら',
                    why: 'clear を「きれいにする」で止めていると読めない。clear customs / clear security で「(検査を)通過する」。customs も「習慣」ではなく「税関」で、複数形で使う。物流の文書では毎回出る。',
                },
                {
                    en: 'Once',
                    lit: '一度',
                    real: '～したら、～し次第',
                    why: 'once は回数の「一度」で覚えているため、接続詞で文頭に来ると止まる。後ろに主語と動詞が続いていたら回数ではなく「～したら」。when より「その時点を待って」の色が濃い。',
                },
                {
                    en: 'schedule the unloading',
                    lit: '荷降ろしをスケジュールする',
                    real: '荷降ろしの日取りを決める',
                    why: 'schedule はカタカナで名詞として定着しているので、動詞で使われると一拍遅れる。schedule a meeting / schedule the unloading で「～の予定を組む」。',
                },
            ],
        },
        {
            key: 'p5-117',
            items: [
                {
                    en: 'The revised lease terms proved favorable to both parties',
                    lit: '修正された契約条件が双方に好都合を証明した',
                    real: '修正後の契約条件は双方にとって好都合だと分かった',
                    why: 'prove を「証明する」で当てると主語と目的語がねじれる。prove + 形容詞は「～だと判明する」で、be 動詞に近い使い方。turn out to be と同じ働き。',
                },
                {
                    en: 'terms',
                    lit: '用語、期間',
                    real: '(契約の) 条件',
                    why: '単数の term は「用語・期間」だが、複数の terms は契約書の「条件、条項」。terms and conditions(利用規約) の terms。契約の話で複数形が出たら条件だと決めてよい。',
                },
                {
                    en: 'parties',
                    lit: 'パーティー',
                    real: '(契約の) 当事者',
                    why: 'カタカナのパーティーが強すぎて、契約書の「当事者」が出てこない。both parties / the other party / a third party はすべて人・組織を指す。',
                },
            ],
        },
        {
            key: 'p5-118',
            items: [
                {
                    en: 'praised for the efficiency with which she handled the product recall',
                    lit: '彼女が製品回収を扱ったその効率のために称賛された',
                    real: '製品回収をさばいたその手際のよさが評価された',
                    why: '前置詞が関係代名詞の前に出た〈前置詞 + which〉で、読む順が日本語と逆になる。with which ～ は「～するときのその…で」。the speed with which / the ease with which も同じ形で、まず名詞、次に節と読む。',
                },
                {
                    en: 'handled the product recall',
                    lit: '製品回収を手で扱った',
                    real: '製品回収に対処した',
                    why: 'handle を「手で持つ」の意味で持っていると、事態や苦情が目的語に来たときに詰まる。handle a complaint / handle a recall は「処理する、さばく」。',
                },
                {
                    en: 'was widely praised for',
                    lit: '広く～のために称賛された',
                    real: '～の点で各方面から評価された',
                    why: 'praise ～ for … の for を「～のために」と目的で読むと因果が逆になる。この for は評価の理由で「…の点で」。be praised for / be known for / be criticized for はすべて同じ形。',
                },
            ],
        },
        {
            key: 'p5-125',
            items: [
                {
                    en: 'None of the three proposals met the council’s budget ceiling',
                    lit: '3つの提案のどれも議会の予算天井に会わなかった',
                    real: '3件の提案はどれも議会の予算の上限に収まらなかった',
                    why: 'meet は「会う」で固まっていると、条件・期限・基準が目的語のときに読めない。meet the deadline / meet the requirements / meet the budget で「満たす」。',
                },
                {
                    en: 'budget ceiling',
                    lit: '予算の天井',
                    real: '予算の上限額',
                    why: '天井の比喩はそのまま「これ以上は出せない額」。price ceiling / ceiling of 5 percent も同じ。逆に floor は下限。',
                },
                {
                    en: 'the tender was reopened',
                    lit: '柔らかいものが再び開かれた',
                    real: '入札がやり直しになった',
                    why: 'tender は形容詞の「柔らかい」しか知らないと名詞で出たときに止まる。名詞の tender は「入札(の手続き)」。submit a tender / win the tender。',
                },
            ],
        },

        // ================= PART 6 =================
        {
            key: 'p6-131-134',
            items: [
                {
                    en: 'The standard plan covers four scheduled visits per year',
                    lit: '標準プランは年4回の訪問を覆う',
                    real: '標準プランには年4回の定期訪問が含まれる',
                    why: 'cover を「覆う」で止めると保険・契約の文が読めない。cover は「(契約・保険が) ～を対象に含む」。The warranty covers ～ / The fee covers ～ は「～込み」。',
                },
                {
                    en: 'a loaner unit',
                    lit: '貸し手の単位',
                    real: '代替機',
                    why: 'loan(貸付) から作った loaner は「修理中に貸し出す代替品」。unit も「単位」ではなく機器1台を指す。修理・保守の文書ではこの2語がセットで出る。',
                },
                {
                    en: 'keep this year’s rate for another twelve months',
                    lit: '今年の料金をもう12カ月保つ',
                    real: '今年の料金のまま、さらに1年据え置きになる',
                    why: 'keep は「保つ」で正しいが、主語が客側なので「客が料金を据え置きで使える」の意味になる。値上げ前に契約すると得、という広告の型。rate は「速度」ではなく「料金」。',
                },
                {
                    en: 'return it by post or as an attachment',
                    lit: '郵便で、または添付物として返す',
                    real: '郵送か、メールに添付して送り返す',
                    why: 'attachment を「愛着」で覚えていると意味が反転する。as an attachment は「(メールの) 添付ファイルで」。return も「返却」ではなく「送り返す」で、書類のやり取りに使う。',
                },
            ],
        },
        {
            key: 'p6-135-138',
            items: [
                {
                    en: 'the wooden landing stage was declared unsafe',
                    lit: '木製の着陸段階が安全でないと宣言された',
                    real: '木造の桟橋が危険と判定された',
                    why: 'landing を飛行機の「着陸」、stage を「段階」で当てると意味不明になる。landing stage は船着き場・桟橋。declare も「宣言する」ではなく、行政や検査官が「公式に判定する」。',
                },
                {
                    en: 'Early ridership has been stronger than the council expected',
                    lit: '初期の乗客業が議会の予想より強かった',
                    real: '当初の利用者数は議会の見込みより多かった',
                    why: 'ridership は ride + ship で「利用者の総数」。-ship は membership / leadership と同じ「まとまり」を作る。strong を人数に使うと「多い」で、数の話に強弱の語が来る英語の癖。',
                },
                {
                    en: 'a second morning departure on weekdays',
                    lit: '平日の2番目の朝の出発',
                    real: '平日の朝の便を1本増やす',
                    why: 'departure を「出発」とだけ訳すと便数の話に見えない。時刻表では departure = 1本の便。a second ～ も「2番目の」ではなく「もう1つの」。',
                },
                {
                    en: 'sold on board',
                    lit: '板の上で売られる',
                    real: '船内で販売される',
                    why: 'board は「板」ではなく乗り物の中。on board / board the train(乗り込む) はどちらも同じ語。切符が船内販売という条件は設問の根拠になりやすい。',
                },
            ],
        },
        {
            key: 'p6-139-142',
            items: [
                {
                    en: 'Book a slot online',
                    lit: 'オンラインで隙間を予約する',
                    real: 'ネットで空き枠を1つ押さえる',
                    why: 'slot は「細長い隙間」から「(予約表の) 枠」に広がる。a slot at 3:00 / an available slot。book も「本」ではなく動詞の「予約する」。',
                },
                {
                    en: 'our mechanic will service it while you are at work',
                    lit: '整備士が仕事中にそれをサービスする',
                    real: '出勤している間に整備士が点検整備しておく',
                    why: 'カタカナの「サービス=無料、接客」が邪魔をする。動詞の service は「機械を整備する、点検する」。service the car / have the boiler serviced。',
                },
                {
                    en: 'A basic tune covers brakes, gears, and tire pressure',
                    lit: '基本の曲がブレーキと歯車とタイヤ圧を覆う',
                    real: '基本整備にはブレーキ、変速、空気圧の調整が入る',
                    why: 'tune を「曲」でしか持っていないと読めない。ここは tune-up の略で「調整」。同じ文の covers も「含む」。',
                },
                {
                    en: 'are quoted before any work begins',
                    lit: '作業が始まる前に引用される',
                    real: '着工前に見積もりを出す',
                    why: 'quote を「引用」で覚えていると、料金の話で詰まる。商取引の quote は「見積もる、見積額を示す」。名詞の a quote も見積書。',
                },
            ],
        },
        {
            key: 'p6-143-146',
            items: [
                {
                    en: 'Gloves, bags, and litter grabbers will be handed out there',
                    lit: '手袋と袋とごみつかみ器がそこで手を出される',
                    real: '手袋、袋、ごみばさみは現地で配る',
                    why: 'hand は名詞の「手」が先に出るので、動詞句 hand out(配る) / hand in(提出する) が形として結びつかない。out は外へ広がる=配布、in は中へ=提出、と方向で覚える。',
                },
                {
                    en: 'the bank is still slippery after last week’s rain',
                    lit: '銀行が先週の雨のあとまだ滑りやすい',
                    real: '土手は先週の雨でまだ滑りやすい',
                    why: 'bank は「銀行」が強すぎるが、川の文脈では「土手、岸」。river bank / the far bank。周りに川・水・雨の語があれば銀行ではない。',
                },
                {
                    en: 'the gravel car park beside the footbridge',
                    lit: '歩道橋のそばの砂利の車公園',
                    real: '歩道橋のわきの砂利敷きの駐車場',
                    why: 'car park は英国式の「駐車場」で、park を「公園」と読むと集合場所が分からなくなる。米国式なら parking lot。footbridge も「足の橋」ではなく歩行者用の橋。',
                },
                {
                    en: 'must accompany them at all times',
                    lit: 'いつも彼らに伴奏しなければならない',
                    real: '常にそばを離れてはいけない',
                    why: 'accompany はピアノの伴奏で覚えている人がいるが、基本は「同行する、付き添う」。at all times も「全部の時間に」ではなく「常時」で、規則文の決まり文句。',
                },
            ],
        },

        // ================= PART 7 single =================
        {
            key: 'p7-147-148',
            items: [
                {
                    en: 'Has your team reached the fifth floor?',
                    lit: 'あなたのチームは5階に到達しましたか',
                    real: '清掃は5階まで進みましたか',
                    why: 'reach を「着く」で読むと人が移動した話に見える。ここは作業の進み具合で、「どこまで終わったか」を尋ねている。進捗を階数や番号で言うのは業務連絡の癖。',
                },
                {
                    en: 'I can move two people up as soon as 312 is finished',
                    lit: '312が終わり次第2人を上に動かせる',
                    real: '312号室が終わったら2人を上の階に回せる',
                    why: 'move ～ up は「昇進させる」にも読めるが、ここは物理的に上の階へ人員を回すこと。会話では部屋番号がそのまま主語になり、is finished は「その部屋の作業が終わる」。',
                },
                {
                    en: 'I will hold the key card until you tell me the room is ready',
                    lit: '部屋が準備できたと言うまでキーカードを持っている',
                    real: '部屋が整ったと連絡が来るまで、カードキーは渡さないでおく',
                    why: 'hold を「持つ」で止めると意図が消える。hold は「渡さずに手元で止めておく」。hold a call / hold the delivery も同じで、止める側の動作。',
                },
                {
                    en: 'Give me forty minutes.',
                    lit: '私に40分をください',
                    real: '40分だけ待ってください',
                    why: '時間を目的語にした give me は「時間をくれ=待ってくれ」。依頼ではなく所要時間の申告に近い。設問では「どれくらいで終わるか」の根拠になる。',
                },
            ],
        },
        {
            key: 'p7-149-150',
            items: [
                {
                    en: 'Less advance paid on 28 January',
                    lit: 'より少ない前進が1月28日に支払われた',
                    real: '1月28日に渡した前渡し金を差し引く',
                    why: '帳票の行頭に立つ Less は「～を差し引いて」。比較級ではない。この1語を読み違えると合計と払い戻し額の関係が逆になる。advance も「前進」ではなく「前払い金」。',
                },
                {
                    en: 'Amount to reimburse',
                    lit: '弁償するための量',
                    real: '払い戻す金額',
                    why: 'amount は「量」より先に「金額」で取る。reimburse は「立て替えた分を本人に戻す」で、refund(客への返金) とは向きが違う。経費精算の書類ではこの語が必ず出る。',
                },
                {
                    en: 'added to the March payroll',
                    lit: '3月の給与名簿に加えられる',
                    real: '3月の給与に上乗せして支払われる',
                    why: 'payroll は「給与の支払い、その名簿」。on the payroll なら「雇われている」。ここは支給のタイミングを示していて、設問の「いつ受け取るか」に直結する。',
                },
                {
                    en: 'Taxi fares below GBP 10.00 do not require a receipt',
                    lit: '10ポンド以下のタクシー運賃は領収書を要求しない',
                    real: '10ポンド未満のタクシー代は領収書が要らない',
                    why: '物が主語で require が来ると日本語と主客が逆になる。「～には…が必要」と読み替える。fare は「公平な」ではなく乗り物の運賃で、fee(手数料) とは別。',
                },
            ],
        },
        {
            key: 'p7-151-153',
            items: [
                {
                    en: 'Proof of address is checked at the barrier',
                    lit: '住所の証明が障壁でチェックされる',
                    real: '入口のゲートで住所を証明するものを確認される',
                    why: 'barrier を「障壁」と訳すと施設の話に見えない。駐車場や施設の入口にある遮断機・ゲートのこと。proof of address は公共料金の請求書などの「住所が分かる書類」を指す決まり文句。',
                },
                {
                    en: 'Rubble, soil, and plasterboard are chargeable',
                    lit: 'がれきと土と石膏ボードは請求可能だ',
                    real: 'がれき、土、石膏ボードは有料になる',
                    why: '-able を「～できる」で機械的に当てると意味がぼける。chargeable は「料金がかかる」。無料の側は free of charge。何が有料かは設問になりやすい。',
                },
                {
                    en: 'Payment is by card at the weighbridge. The depot does not handle cash.',
                    lit: '支払いは計量橋でカードによる。集積所は現金を扱わない',
                    real: '支払いは計量所でカードのみ。現金は使えない',
                    why: 'weighbridge は車ごと重さを量る計量台で、そこが精算場所になる。handle は「手で扱う」ではなく「(業務として) 取り扱う」で、do not handle cash は「現金お断り」。',
                },
                {
                    en: 'at least two working days before the visit',
                    lit: '訪問の少なくとも2つの働く日前に',
                    real: '来場の2営業日前までに',
                    why: 'working day は「働いている日」ではなく土日祝を除いた営業日。日数の条件は設問の根拠になりやすく、2営業日と2日は別物。',
                },
            ],
        },
        {
            key: 'p7-154-155',
            items: [
                {
                    en: 'I will leave my lighting kit at the studio',
                    lit: '照明キットをスタジオに残す',
                    real: '照明一式は自分の工房に置いていく',
                    why: 'leave は「去る」が先に出るが、目的語と場所があれば「置いていく」。ここでは the studio が撮影先ではなく本人の仕事場で、持っていかない物を述べている。設問の「何を持ってこないか」の根拠。',
                },
                {
                    en: 'The tall plants beside the reception desk throw a green tint onto faces',
                    lit: '受付の横の高い植物が緑の色合いを顔に投げる',
                    real: '受付脇の背の高い観葉植物のせいで、顔に緑がかぶる',
                    why: 'throw を「投げる」で読むと絵が浮かばない。光・影・色が主語のとき throw / cast は「(色や影を) 落とす」。tint は薄く乗った色で、写真・印刷の現場語。',
                },
                {
                    en: 'the price stays at the figure I quoted in July',
                    lit: '価格は7月に引用した人物にとどまる',
                    real: '料金は7月に出した見積額のまま据え置きになる',
                    why: 'figure は「人物・図」より先に「数字、金額」で取る。quote も「引用」ではなく「見積もる」。この2語が同時に出ると、値段の話だと一気に決まる。',
                },
                {
                    en: 'be packed away before your first patient at 10:00 A.M.',
                    lit: '午前10時の最初の患者の前に詰めて片づけられる',
                    real: '午前10時の最初の患者さんが来る前に撤収を終える',
                    why: 'pack away は荷物を「しまい込む」で、撤収の意味。before your first patient は「最初の患者が来る前」で、人が時刻の代わりになる英語の言い方。',
                },
            ],
        },
        {
            key: 'p7-156-158',
            items: [
                {
                    en: 'will be taken out of service and replaced',
                    lit: 'サービスの外に取られ、取り替えられる',
                    real: '運転を止めたうえで入れ替える',
                    why: 'out of service は「サービス外」ではなく「使用停止中」。エレベーター、券売機、車両の掲示で必ず見る。take ～ out of service で「使用を止める」。',
                },
                {
                    en: 'A key fob is needed to call it',
                    lit: 'それを呼ぶために鍵の房が必要だ',
                    real: 'エレベーターを呼ぶには電子キーが要る',
                    why: 'fob は鍵に付ける小さな札から来た語で、今はカード式・キーホルダー式の電子キーを指す。call it の call も「叫ぶ」ではなく、エレベーターを「呼び寄せる」。',
                },
                {
                    en: 'the contractor’s team can hold the service lift on a floor',
                    lit: '請負業者のチームが業務用エレベーターを階の上で持てる',
                    real: '工事業者がエレベーターをその階に止めておける',
                    why: 'hold は「持つ」ではなく「動かさずに止めておく」。hold the lift / hold the line / hold a seat はすべて同じ発想。搬入の条件を決める文なので設問になりやすい。',
                },
                {
                    en: 'fobs may be collected from the caretaker’s office this week',
                    lit: '鍵は今週、世話人の事務所から集められるかもしれない',
                    real: '電子キーは今週、管理人室で受け取れる',
                    why: 'collect は「集める」ではなく「取りに行って受け取る」。collect a parcel / collect a key。掲示の may は許可で「～してよい、～できる」。caretaker は建物の管理人。',
                },
            ],
        },
        {
            key: 'p7-159-162',
            items: [
                {
                    en: 'The museum occupies the original 1878 engine shed',
                    lit: '博物館は元の1878年のエンジン小屋を占領している',
                    real: '博物館は1878年築の機関車庫をそのまま使っている',
                    why: 'occupy を「占領する」で読むと物騒になる。建物が主語なら「～に入っている、～を使っている」。engine shed は蒸気機関車を入れておく車庫で、鉄道の現場語。',
                },
                {
                    en: 'one locomotive is fired up and pulls short rides along the yard',
                    lit: '1台の機関車が怒らされ、庭に沿って短い乗車を引く',
                    real: '1両に火を入れ、構内で短い乗車体験を走らせる',
                    why: 'fire up を「怒らせる」で覚えていると読めない。蒸気機関車は文字どおり石炭に火を入れるので「火入れする、動かし始める」。yard も「庭」ではなく鉄道の構内。',
                },
                {
                    en: 'Ride tickets are sold on the day and cannot be reserved',
                    lit: '乗車券はその日に売られ、予約されえない',
                    real: '乗車券は当日売りのみで、予約はできない',
                    why: 'on the day は「その日に」より強く「当日限り」。前もって買えないという条件になる。cannot be reserved と組で読むと、訪問日を選ぶ必要があるという設問の根拠になる。',
                },
                {
                    en: 'The site has no car park, but buses stop at the gate',
                    lit: '敷地は車の公園を持たないが、バスが門で止まる',
                    real: '駐車場は無いが、門前にバスが停まる',
                    why: 'car park は英国式の駐車場。無い物と有る物を but でつないだこの形は、「だから来館者はバスで来る」という推測問題に直結する。書いていない結論を作らせる典型。',
                },
            ],
        },
        {
            key: 'p7-163-164',
            items: [
                {
                    en: 'I want to flag one change before it reaches you',
                    lit: '届く前に1つの変更を旗にしたい',
                    real: '届く前に、変更点を1つお知らせしておきたい',
                    why: 'flag は名詞の「旗」から動詞の「印を付けて注意を促す」に広がる。flag an issue / flag a change は「先に伝えておく」。謝罪や事前連絡のメールで多用される。',
                },
                {
                    en: 'Rather than hold the whole pallet back',
                    lit: 'パレット全体を後ろに持つよりむしろ',
                    real: '荷物をまるごと出荷保留にするのではなく',
                    why: 'hold back は「出さずに止めておく」。pallet は倉庫で荷物を載せる木製の台で、1パレット=まとめて1口の荷。止めるか一部差し替えるかの二択を述べている。',
                },
                {
                    en: 'The heavier board takes ink well',
                    lit: '重い板がインクをよく取る',
                    real: '厚い紙の方がインクの乗りがよい',
                    why: 'board は「板」ではなく厚紙・板紙。take を「取る」で止めると意味が浮かばないが、素材が主語なら「(インク・色を) 受け止める、よく乗る」。印刷の現場語。',
                },
                {
                    en: 'do not run smoothly through the machine that folds them',
                    lit: '折る機械を通してなめらかに走らない',
                    real: '箱を折る機械にうまく通らない',
                    why: 'run を「走る」で読むと物が走ることになる。機械に紙や部材を通すときの run は「通る、流れる」。The paper runs through the printer と同じ形。',
                },
            ],
        },
        {
            key: 'p7-165-168',
            items: [
                {
                    en: 'The school takes twelve students at a time',
                    lit: '学校は一度に12人の生徒を取る',
                    real: '1期あたりの定員は12人',
                    why: 'take を「取る」で止めると定員の話に見えない。組織が主語の take は「受け入れる、収容する」。at a time も「一度に」から「1回につき」で、期ごとの人数を表す。',
                },
                {
                    en: 'it could not find enough qualified bakers to staff the four shops',
                    lit: '4店をスタッフするのに十分な資格あるパン職人を見つけられなかった',
                    real: '新しい4店に人を配置できるだけの職人が集まらなかった',
                    why: 'staff は名詞で覚えているので、動詞の「人員を配置する」で出ると止まる。qualified も「資格がある」から「必要な腕を備えた」まで幅がある。',
                },
                {
                    en: 'on the condition that graduates stay with the company for at least a year',
                    lit: '修了者が少なくとも1年会社と滞在する条件で',
                    real: '修了後1年以上は会社に残ることを条件に',
                    why: 'stay with ～ は「一緒に泊まる」ではなく「(会社に) 在籍し続ける」。on the condition that ～ は「～という条件で」で、無料の裏に付く縛りを示す。設問の根拠になる。',
                },
                {
                    en: 'Ms. Sarr says the loss does not trouble her',
                    lit: '損失は彼女を困らせないと言う',
                    real: '何人か抜けても気にしていないと述べている',
                    why: 'trouble は名詞のイメージが強いが、ここは動詞で「悩ませる」。does not trouble her で「気にしていない」。人物の考えを問う設問はこの一文に掛かる。',
                },
            ],
        },
        {
            key: 'p7-169-171',
            items: [
                {
                    en: 'Reading the frame: what a colony tells you in autumn',
                    lit: '枠を読む: 群れが秋にあなたに言うこと',
                    real: '巣板を読む: 秋の蜂群が何を示しているか',
                    why: 'frame は養蜂の巣枠(巣板) で、colony も「植民地」ではなく1つの蜂の群れ。専門の催しでは日常語がそのまま業界語になる。読めなくても「講演の題名」と割り切ってよい。',
                },
                {
                    en: 'A meat-free plate must be requested when you book',
                    lit: '肉のない皿は予約するとき要求されなければならない',
                    real: '肉を使わない食事は予約時に申し出る必要がある',
                    why: 'plate を「皿」で止めると料理の話に見えない。ここは1人分の食事そのもの。-free は「無料」ではなく「～抜き」で、sugar-free / duty-free と同じ。',
                },
                {
                    en: 'Places are limited to twenty and are allocated in the order that bookings arrive',
                    lit: '場所は20に制限され、予約が到着する順に割り当てられる',
                    real: '定員20名で、申し込みの届いた順に埋まる',
                    why: 'place を「場所」で読むと人数の話にならない。この place は「参加枠、席」。in the order that ～ は「～する順に」で、先着順だと言っている。満席になり得るかを問う設問の根拠。',
                },
                {
                    en: 'the panel takes as many as the hour allows',
                    lit: 'パネルは1時間が許す限り多くを取る',
                    real: '登壇者は1時間で扱えるだけの質問を受ける',
                    why: 'panel はカタカナの「板」ではなく、壇上に並ぶ回答者の一団。take は「受ける」、the hour allows は「時間が許す範囲で」。全部は扱えないという含みがある。',
                },
            ],
        },
        {
            key: 'p7-172-175',
            items: [
                {
                    en: 'We are on a corner this year, six metres by four',
                    lit: '今年は角の上にいる、6メートル掛ける4',
                    real: '今年は角の区画で、広さは6メートル×4メートル',
                    why: '見本市の区画は on a corner(角地) / an island(四方通路) のように場所で言う。six metres by four の by は掛け算の「×」で、寸法を読む定型。',
                },
                {
                    en: 'We can open two sides and drop the back wall entirely',
                    lit: '2面を開けて背面の壁を完全に落とせる',
                    real: '2面を開放にして、背面の壁はいっそ無しにできる',
                    why: 'drop を「落とす」で読むと物が倒れる。計画・項目が目的語なら「やめる、外す」。drop a plan / drop an item と同じで、会議の口語では頻出。',
                },
                {
                    en: 'The workshop can turn new feet in an afternoon',
                    lit: '工房は午後に新しい足を回せる',
                    real: '工房なら脚を半日で削り出せる',
                    why: 'turn は旋盤で材料を回して削ることを指す職人語。feet はラックの「脚」。in an afternoon は「午後いっぱいで」で、作業量の見積もりを表す。',
                },
                {
                    en: 'The freight booking closes then, and the rails change the volume',
                    lit: '貨物の予約はそのとき閉じ、レールが音量を変える',
                    real: '輸送の申し込みはその日で締め切りで、ラックを積むと荷物の容積が変わる',
                    why: 'volume はカタカナの「音量」が邪魔をするが、物流では「容積、荷の量」。close も「閉じる」ではなく「締め切る」。期限がなぜ効くのかを問う設問の根拠になる。',
                },
            ],
        },

        // ================= PART 7 multiple =================
        {
            key: 'p7-176-180',
            items: [
                {
                    en: 'a numbered bay beside the main door',
                    lit: '正面ドアのそばの番号付きの湾',
                    real: '正面入口横の番号付き駐車区画',
                    why: 'bay を「湾」で覚えていると駐車場の図が浮かばない。仕切られたくぼみ状の空間はすべて bay で、parking bay / loading bay。番号付きかどうかが区分の違いになる。',
                },
                {
                    en: 'which the route planner puts at 48 kilometres each way',
                    lit: '経路計画者が片道48キロに置く',
                    real: '経路検索では片道48キロと出る',
                    why: 'put を「置く」で止めると読めない。put ～ at … は「～を…と見積もる、…と算出する」。each way は「片道」で、往復なら return / round trip。40キロ超という条件に当てはまるかの判定に効く。',
                },
                {
                    en: 'must hand the old permit in at reception',
                    lit: '古い許可証を受付で手の中に入れる',
                    real: '古い許可証を受付に返さなければならない',
                    why: 'hand in は「提出する、返却する」。hand out(配る) と方向が逆で、in は受け取る側へ向かう動き。新しい許可証を受け取る前提条件なので、2文書をまたぐ設問の要になる。',
                },
                {
                    en: 'since the form went in',
                    lit: '書式が中に行ってから',
                    real: '申請書を出してから',
                    why: 'go in は物が「入る」だが、書類が主語なら「提出済みになる」。The application went in last week のように、誰が出したかを言わずに済ませる口語。',
                },
            ],
        },
        {
            key: 'p7-181-185',
            items: [
                {
                    en: 'Medium, 9 square metres — the contents of a two-bedroom flat',
                    lit: '中、9平方メートル、寝室2つの平らの内容物',
                    real: '中サイズ9平方メートル。寝室2部屋の住居ひと部屋分の荷物が入る',
                    why: 'flat は「平らな」ではなく英国式の「アパート、集合住宅の1戸」。contents は「目次」ではなく中身の家財。どの区画を借りるかを決める照合の材料になる。',
                },
                {
                    en: 'Round-the-clock access can be added for EUR 8 a month',
                    lit: '時計の周りの接近が月8ユーロで加えられる',
                    real: '24時間出入りできるようにするには月8ユーロの追加',
                    why: 'round-the-clock は時計を一周する=24時間。access も「接近」ではなく「立ち入り、利用」。営業時間より早く入りたいという事情と結びつけると設問が解ける。',
                },
                {
                    en: 'Our first shift starts at 5:00 A.M.',
                    lit: '最初のシフトは午前5時に始まる',
                    real: '仕込みの最初の勤務が午前5時から始まる',
                    why: 'shift はカタカナの「ずらす」ではなく交代勤務の1こま。飲食では早朝の仕込みが first shift になる。この時刻が施設の開場時刻より早いことに気づけるかが分かれ目。',
                },
                {
                    en: 'I would like to take the unit on 3 June',
                    lit: '6月3日にその単位を取りたい',
                    real: '6月3日から区画を借りたい',
                    why: 'unit は「単位」ではなく倉庫の1区画。take も「取る」ではなく「借りる、契約する」。take a room / take a stand も同じで、契約の開始を表す。',
                },
            ],
        },
        {
            key: 'p7-186-190',
            items: [
                {
                    en: 'Everything is fried or grilled to order on the day',
                    lit: 'すべてが当日に注文するために揚げられ焼かれる',
                    real: '当日はすべて注文が入ってから揚げ焼きする',
                    why: 'to order は「注文するために」ではなく「注文を受けてから作る」。made to order / built to order も同じで、作り置きしないという意味。厨房機材の選定理由になる。',
                },
                {
                    en: '300 portions of meat and dairy have to be held overnight',
                    lit: '300人分の肉と乳製品が一晩持たれなければならない',
                    real: '肉と乳製品300食分を前夜から保管しておく必要がある',
                    why: 'hold は「持つ」ではなく「保管する、保った状態にする」。hold at 5 degrees のように温度と一緒に使う。冷蔵室が要るという結論に直結する。',
                },
                {
                    en: 'Six-burner range with flat top',
                    lit: '6つのバーナーの範囲と平らな上部',
                    real: '6口コンロと鉄板が付いた業務用レンジ',
                    why: 'range を「範囲」で読むと機材に見えない。厨房の range はコンロ台一式。flat top は上面の鉄板部分で、炒め焼きに使う。品名は塊で覚えるしかない。',
                },
                {
                    en: 'someone on site must sign the hire note before we leave',
                    lit: '現場の誰かが去る前に賃借メモに署名しなければならない',
                    real: '引き渡しの伝票に現場の担当者が署名してから業者は帰る',
                    why: 'note を「メモ」で止めると書類に見えない。商取引の note は伝票・明細 (delivery note / credit note)。hire は英国式の「レンタル」で、hire note は貸出伝票。',
                },
            ],
        },
        {
            key: 'p7-191-195',
            items: [
                {
                    en: 'The hall seated ninety; the malthouse has four screening rooms',
                    lit: 'ホールは90を座らせた',
                    real: 'ホールの客席は90席だった',
                    why: 'seat が動詞で「～人を収容する」。The room seats 200 は席数の言い方で、人を座らせる動作ではない。会場が手狭になったという推測問題の根拠になる。',
                },
                {
                    en: 'the festival turned away more than a hundred films for want of space',
                    lit: '空間の欲求のために100本以上の映画を追い払った',
                    real: '上映枠が足りず100本以上の応募を断った',
                    why: 'turn away は「断る、入れない」。for want of ～ は「～が足りないので」で、want は「欲しい」ではなく「欠乏」。古風だが記事の英語では今も使う。',
                },
                {
                    en: 'the last day will again be given over to the winning films',
                    lit: '最終日は受賞作に再び引き渡される',
                    real: '最終日はまた受賞作の上映に充てる',
                    why: 'give over to ～ は「(時間・場所を) ～のために丸ごと使う」。明け渡す発想が日本語に無いので直訳では止まる。日程表と突き合わせる設問の手がかりになる。',
                },
                {
                    en: 'Rooms 1 and 3 are fitted with hearing loops',
                    lit: '1番と3番の部屋は聴覚の輪で取り付けられている',
                    real: '1番と3番の部屋には磁気ループが備えてある',
                    why: 'be fitted with ～ は「～が備え付けられている」。hearing loop は補聴器に音声を直接送る磁気誘導設備で、公共施設の掲示に必ず出る。どの部屋かの照合に効く。',
                },
            ],
        },
        {
            key: 'p7-196-200',
            items: [
                {
                    en: 'four studios to hire by the day',
                    lit: '日によって借りる4つのスタジオ',
                    real: '1日単位で借りられるスタジオが4室',
                    why: 'by the day は「日ごとに変わる」ではなく「日ぎめで」。by the hour / by the metre も同じ形で、料金の単位を示す。hire は英国式の「借りる」。',
                },
                {
                    en: 'double doors wide enough to drive a van up to',
                    lit: 'バンを運転して至るのに十分広い二重扉',
                    real: '車を横付けできる幅の両開き扉',
                    why: 'drive a van up to ～ は「～のすぐそばまで車を寄せる」。文末に前置詞 to が残る形が読みにくいが、to の後ろに doors が省かれている。荷物を持ち上げずに済むという記述と結びつく。',
                },
                {
                    en: 'you are bringing rails of clothing in a van',
                    lit: 'バンで衣類のレールを持ってくる',
                    real: '衣装を掛けたハンガーラックを車で運び込む',
                    why: 'rail を鉄道の「線路」で覚えていると意味不明になる。衣類を吊るす横棒、転じてキャスター付きの什器そのもの。撮影・小売の現場語。',
                },
                {
                    en: 'we barely touched the images afterwards',
                    lit: '後で画像にほとんど触らなかった',
                    real: 'あとから修正をほとんど入れずに済んだ',
                    why: 'touch を「触る」で読むと何のことか分からない。データや原稿が目的語なら「手を入れる、いじる」。barely は「かろうじて」ではなく「ほとんど～ない」。光の良さを述べた文だと分かる。',
                },
            ],
        },
    ],
};

export default TOEIC_BRIDGE_05;
