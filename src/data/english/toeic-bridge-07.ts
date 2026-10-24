/**
 * TOEIC(R) L&R 形式 リーディング模試 07 -- つながらない語。
 *
 * 語注 (toeic-gloss-07.ts) とは埋めるものが違う。あちらは「知らない単語の意味」。
 * こちらは **単語は全部知っているのに文の意味が通らない** 箇所を埋める。
 *
 *  - 中学単語なのに、学校で覚えた訳を当てると文が壊れる (run / hold / cover / draw / ship / seat)
 *  - カタカナ語として輸入されていて、英語の意味とずれている (practice / reception / claim系 / stall)
 *  - 訳語は合っているのに、文中で果たす役割が日本語と違う (once / should倒置 / now that / provided)
 *  - 英国式の現場語で、辞書の第一義が現場では使われない (post / till / takings / hire / works)
 *
 * 1セット3-5件。key はビューア側の参照キーと一致させる。
 *   Part 5 = 'p5-<設問番号>' / Part 6 = 'p6-<range>' / Part 7 = 'p7-<range>'
 * en は本文の表記のまま抜く (検索して原文に当たれるようにするため)。
 *
 * ビジネス(集客)ライン。実際のTOEIC/ETSとは一切無関係の非公式オリジナル模試。
 * 問題・本文はすべて当サービスのオリジナルで、実試験の転載ではない。手書きデータ。
 */
import type { ToeicBridge } from './toeic-types';

export const TOEIC_BRIDGE_07: ToeicBridge = {
    id: 'toeic-test-07',
    sets: [
        // ================= PART 5 =================
        {
            key: 'p5-108',
            items: [
                {
                    en: 'will proceed as planned',
                    lit: '計画されたように前進するだろう',
                    real: '予定どおり実施される',
                    why: 'proceed を「前進する」で読むと研修が歩き出す。行事や手続きが主語のときは「そのまま行われる」。The meeting will proceed. で「会は開かれる」。as planned は「予定どおり」の決まり文句で、go ahead as planned も同じ型。',
                },
                {
                    en: 'fewer than ten employees register',
                    lit: '10人より少ない従業員が~を登録する',
                    real: '申込者が10人に届かない',
                    why: 'register を他動詞「~を登録する」でしか持っていないと、目的語を探して迷子になる。ここは自動詞で「(講座に)申し込む」。sign up と同じ。register for the session の for が落ちた形だと思えば読める。',
                },
                {
                    en: 'by Friday',
                    lit: '金曜のそばで',
                    real: '金曜までに',
                    why: 'by + 時点は「~までに(完了)」の期限。until が「~まで続く」なのと対になる。submit by Friday / register by Friday は締め切りの型で、TOEIC の条件文では期限の by を見た瞬間に「間に合うか」の話だと決めてよい。',
                },
            ],
        },
        {
            key: 'p5-110',
            items: [
                {
                    en: 'outline the relocation timeline',
                    lit: '移転のタイムラインを輪郭する',
                    real: '移転スケジュールの概要を説明する',
                    why: 'カタカナのアウトラインは名詞で入っているが、英語の outline は動詞で「要点をかいつまんで示す」が主戦場。outline the plan / outline the steps。timeline も「年表」ではなく、いつ何をやるかの工程表のこと。',
                },
                {
                    en: 'the Ottawa branch',
                    lit: 'オタワの枝',
                    real: 'オタワ支店',
                    why: 'branch は木の枝から転じて「支店・支社」。branch office / branch manager / open a branch はすべて拠点の話。ビジネス文書で都市名 + branch と並んだら、木は一切関係ない。',
                },
                {
                    en: "Thursday's staff meeting",
                    lit: '木曜日が所有するスタッフ会議',
                    real: '木曜に開かれる定例会議',
                    why: '所有格の \'s は人だけでなく時の語にも付く。today\'s meeting / next week\'s issue / Monday\'s session。誰の持ち物かと考えると詰まるが、「~の日の」と読み替えれば済む。日付や曜日 + \'s は日程の話。',
                },
            ],
        },
        {
            key: 'p5-118',
            items: [
                {
                    en: 'Enclosed with the current invoice',
                    lit: '現在の請求書と一緒に囲まれて',
                    real: '今回の請求書に同封されているのは',
                    why: 'enclose は「囲む」より「封筒に入れる」。Enclosed で文を始める倒置は「同封物は~です」というビジネスレターの定型で、主語は後ろに来る。Please find enclosed ~ も同族。この形を知らないと文頭で構文が取れない。',
                },
                {
                    en: 'two vouchers worth €40 each',
                    lit: 'それぞれ40ユーロの価値を身に着けた2枚の保証書',
                    real: '1枚40ユーロ分として使える金券2枚',
                    why: 'voucher は「割引券・金券」。worth + 金額は名詞の直後に置いて額面を示す後置修飾で、a prize worth $500 と同じ。each は文末に置いて「1つあたり」。3つとも学校英語の訳語では組み立たない並び。',
                },
                {
                    en: 'apply to future orders',
                    lit: '将来の注文に応募する',
                    real: '今後の注文の支払いに充てる',
                    why: 'カタカナの「アプライ=応募」で読むと壊れる。apply A to B は「AをBに充当する」で、ここは関係詞 that (= vouchers) が充てられる側。クーポンやクレジットの文脈の apply は、ほぼ「使う・充当する」。',
                },
            ],
        },
        {
            key: 'p5-119',
            items: [
                {
                    en: 'tight',
                    lit: '(服が)きつい',
                    real: '(締め切りに)余裕がない',
                    why: 'tight は服のサイズから離れて、時間・予算・空きが「詰まっていて余裕なし」を表す。tight deadline / tight schedule / tight budget。締め切りが tight だから週末も働く、という因果が読めれば選択肢は意味で切れる。',
                },
                {
                    en: 'work through the weekend',
                    lit: '週末を通り抜けて働く',
                    real: '週末も休まず働き続ける',
                    why: 'through + 期間は「~の間ずっと、最後まで」。work through lunch(昼休み返上で働く)/ Monday through Friday(月~金)。通り抜ける物理の through で読むと、週末がトンネルになってしまう。',
                },
                {
                    en: 'the design team at Arbelo Consulting',
                    lit: 'アーベロ・コンサルティングのところにいるデザインチーム',
                    real: 'アーベロ社のデザインチーム',
                    why: '会社・組織への所属は at で示す。work at / a manager at / the team at ~。日本語の「~の」に当たる of を探すと違和感が出るが、組織名の前の at は所属マーカーだと決めてよい。',
                },
            ],
        },
        {
            key: 'p5-123',
            items: [
                {
                    en: 'The keynote address',
                    lit: '基調となる住所',
                    real: '基調講演',
                    why: 'address は「住所」のほかに「演説」。keynote address / opening address / give an address はすべてスピーチの話。動詞では「対処する」にもなる多義語で、TOEIC では住所以外の意味のほうがよく出る。',
                },
                {
                    en: 'delivered',
                    lit: '配達された',
                    real: '(講演が)行われた',
                    why: 'deliver a speech / deliver a presentation で「話をする」。配達から離れる代表格で、演説・講義・判決などを目的語に取ったら「述べる・行う」。address とセットで出たら配達の線は消してよい。',
                },
                {
                    en: 'drew the largest audience',
                    lit: '最大の聴衆を描いた',
                    real: '最も多くの聴衆を集めた',
                    why: 'draw は「描く・引く」から「引き寄せる・集める」。draw a crowd / draw attention / draw customers。イベントが主語で人数が目的語なら集客の話。この模試では別の文書でも同じ用法が同義語問題として出ている。',
                },
                {
                    en: 'of the three-day technology summit',
                    lit: '3日間の技術サミットの',
                    real: '3日間のサミット全体の中で',
                    why: '最上級 the largest の後ろの of は所有ではなく母集団を示す。「サミットの全講演の中で一番」という範囲の of。three-day のようにハイフンでつないだ数量は形容詞になり、days と複数にしないのも合わせて覚える。',
                },
            ],
        },
        {
            key: 'p5-128',
            items: [
                {
                    en: 'A £75 deposit',
                    lit: '75ポンドの預金',
                    real: '75ポンドの予約金・手付金',
                    why: 'deposit は銀行預金だけでなく「先に預けるお金」全般。カタカナのデポジットは返金される保証金の印象が強いが、出店や予約の頭金も deposit。pay a deposit で「手付を打つ」。',
                },
                {
                    en: 'is collected',
                    lit: '収集される',
                    real: '(主催者に)徴収される',
                    why: 'collect は切手収集より「代金を受け取る・徴収する」で出ることが多い。collect payment / collect a fee。お金が主語の受動態なら、集められる先は主催者の金庫だと読み替える。',
                },
                {
                    en: 'at the time of booking',
                    lit: '予約の時間で',
                    real: '申し込みと同時に',
                    why: 'at the time of ~ は「~の時点で」という決まり文句。booking は動名詞で「予約すること」そのもの。支払い条件の文でこれが出たら「いつ払うか」を指定していると分かり、空所の動詞は支払い系だと絞れる。',
                },
                {
                    en: 'each vendor stall',
                    lit: 'それぞれの売り手の失速',
                    real: '出店者ブース1区画ごと',
                    why: 'stall は市や見本市の「屋台・小間」。エンストの stall や肩掛けのストール(stole)とは別物。vendor は「売り手・出店者」で、機械のベンダーに限らない。trade fair とセットで出たら出店区画の話。',
                },
            ],
        },

        // ================= PART 6 =================
        {
            key: 'p6-131-134',
            items: [
                {
                    en: "one of the city's busiest craft destinations",
                    lit: '市で最も忙しい工芸の目的地の一つ',
                    real: '市内有数のにぎわう工芸スポット',
                    why: 'busy は人が忙しいだけでなく、場所が「にぎわう」。a busy street / the busiest season。destination も旅行の最終目的地ではなく「人が足を運ぶ場所」。busiest destinations で「一番人が集まる所」と読む。',
                },
                {
                    en: 'watch each piece take shape',
                    lit: '各ピースが形を取るのを見る',
                    real: '作品が形になっていく様子を見る',
                    why: '知覚動詞 watch + 目的語 + 動詞の原形で「~が…するのを見守る」。piece は「一片」ではなく工芸の「作品1点」。take shape は「形をなす、出来上がっていく」の決まり文句で、計画にも使う (the plan is taking shape)。',
                },
                {
                    en: 'is fully booked until March',
                    lit: '3月まですっかり本にされている',
                    real: '3月まで予約で埋まっている',
                    why: 'book は動詞で「予約する」。fully booked は「満席・満杯」で、ホテル・講座・レストラン共通の言い方。until は継続の終点なので、「3月までずっと空きがない」という状態の継続を表す。',
                },
                {
                    en: 'a waiting list has already been started',
                    lit: '待っているリストがすでに始められた',
                    real: 'キャンセル待ちの受付がもう始まっている',
                    why: 'waiting list は「キャンセル待ちの名簿」。start a list で「名簿を作り始める」。満席の直後にこの語が出たら、人気の証拠として書かれている。put you on the waiting list(キャンセル待ちに載せる)まで1セット。',
                },
            ],
        },
        {
            key: 'p6-135-138',
            items: [
                {
                    en: 'a modest price',
                    lit: '謙虚な価格',
                    real: '小幅の(値上げ)',
                    why: 'modest は人の謙虚さだけでなく、数量が「控えめな・ささやかな」。a modest increase / modest growth。値上げの告知で modest が付いていたら「大した上げ幅ではありません」という緩衝材で、値上げ自体は確定している。',
                },
                {
                    en: 'takes effect',
                    lit: '効果を取る',
                    real: '(改定が)発効する・適用が始まる',
                    why: 'take effect は規則・料金・法律が「効力を持ち始める」。come into effect / go into effect も同じ。日付とセットで出たら「その日から新条件に切り替わる」で、期限前に動くべきかを判断する手がかりになる。',
                },
                {
                    en: 'Renewing now locks in the current rate of $129',
                    lit: '今更新することは現在のレートを閉じ込める',
                    real: '今更新すれば129ドルの料金のまま固定できる',
                    why: 'lock in は「(価格・条件を)確定させて動かなくする」。値上げ前の更新を勧める文の定番。rate は為替ではなく「料金」で、current rate = 今の料金。動名詞 Renewing が主語になる型も合わせて取る。',
                },
                {
                    en: 'at no extra charge',
                    lit: '余分な充電なしで',
                    real: '追加料金なしで',
                    why: 'charge は「充電・突撃」ではなく料金。at no charge / free of charge / at no extra cost はすべて無料の言い換えで、TOEIC の特典案内では必ずどれかが出る。extra が付けば「本体料金に上乗せなし」。',
                },
            ],
        },
        {
            key: 'p6-139-142',
            items: [
                {
                    en: 'drains energy from even the best-designed office',
                    lit: '最も良く設計されたオフィスからさえエネルギーを排水する',
                    real: 'どんな職場からも働く人の活力を奪う',
                    why: 'drain は「流し出す」から「(体力・資源を)じわじわ消耗させる」。a draining day(疲れる一日)。ここの energy は電力ではなく人の活力で、照明の話なのに電気代の文だと読むと広告の論理が崩れる。',
                },
                {
                    en: 'a free on-site assessment',
                    lit: '無料の、サイト上の査定',
                    real: '無料の現地調査',
                    why: 'site はウェブサイトではなく「敷地・現場」。on-site = 現場での、off-site = 社外での。on-site assessment / on-site visit は業者が実際に足を運ぶこと。カタカナの「サイト」で読むとオンライン診断に化けてしまう。',
                },
                {
                    en: 'a detailed running-cost estimate',
                    lit: '詳細な、走るコストの見積もり',
                    real: '光熱費など維持費の詳しい試算',
                    why: 'running は「走る」ではなく「動かし続けること」。running costs = 運転経費・維持費。estimate は名詞で「見積もり」。設備の広告で running cost が出たら、買った後に毎月いくらかかるかの話。',
                },
                {
                    en: 'by up to thirty percent',
                    lit: '30パーセントまでのそばで',
                    real: '最大30パーセント(の幅で)',
                    why: 'reduce ~ by X% の by は増減の幅を示す。up to は上限で「最大~まで」。つまり全員が30%下がるのではなく、良くてその幅。広告の数字はほぼ up to 付きで、この2語を落とすと効果を過大に読む。',
                },
            ],
        },
        {
            key: 'p6-143-146',
            items: [
                {
                    en: 'Sailings between Tampere and our lakeside piers resume',
                    lit: '帆走することが再開する',
                    real: '船便の運航が再開する',
                    why: 'sailing は帆船に限らず「1回の便・運航」。all sailings are cancelled で「全便欠航」。resume は「レジュメ」ではなく「再開する」(履歴書の resume は別語)。運休明けの案内文の型として1セットで取る。',
                },
                {
                    en: 'the standard price of €110 will apply',
                    lit: '110ユーロの標準価格が応募するだろう',
                    real: '通常価格の110ユーロが適用される',
                    why: 'apply は自動詞で「(規則・価格が)適用される」。The rule applies. / Conditions apply. 応募の apply for、塗布の apply to と別の顔。期限の後ろにこの文が来たら「割引が切れて通常料金に戻る」という警告。',
                },
                {
                    en: 'The pass covers every departure through 30 September',
                    lit: 'パスは9月30日を通ってすべての出発を覆う',
                    real: 'パスは9月30日までの全便に有効',
                    why: 'cover は「覆う」から「(範囲に)含む・有効である」。The warranty covers parts. と同じ。through + 日付は「その日を含めて~まで」の米用法で、until より終端がはっきりする。departure は「出発する便」そのもの。',
                },
                {
                    en: 'as you board',
                    lit: 'あなたが板であるように',
                    real: '乗船するときに',
                    why: 'board は動詞で「乗り込む」。boarding pass の board。as はここでは「~するときに」の接続詞で、show the code as you board = 乗り込みながら提示する。名詞の板・委員会で読むと文が組み立たない。',
                },
            ],
        },

        // ================= PART 7 single =================
        {
            key: 'p7-147-148',
            items: [
                {
                    en: 'Beginning Monday, March 16',
                    lit: '月曜を始めながら',
                    real: '3月16日(月)から',
                    why: 'Beginning + 日付は「~より開始」を表す前置詞的な用法。Starting Monday も同じ。文頭でこれが出たら、後ろの本文全体が「その日から始まる新ルール」の告知だと分かる。分詞構文と考えて主語を探すと迷子になる。',
                },
                {
                    en: 'Staff seated there will work from temporary desks',
                    lit: 'そこで座らせられたスタッフは一時的な机から働くだろう',
                    real: 'その階に席のある社員は仮設デスクを拠点に働く',
                    why: 'seat は動詞「席を与える」で、seated there は「そこに席がある」という状態の後置修飾。work from ~ は work from home と同じ「~を拠点に働く」。物理的に机の中から出てくるわけではない。',
                },
                {
                    en: 'over the weekend',
                    lit: '週末の上で',
                    real: '週末のあいだに',
                    why: 'over + 期間は「~の間に・~をかけて」。over the weekend / over the summer / over three weeks。空間の「上」で読むと意味が消える。土日のうちに作業が済む、という工事や引っ越しの告知の定番表現。',
                },
                {
                    en: 'arrange an escort through the security office',
                    lit: '警備室を通り抜ける護衛を手配する',
                    real: '警備室を通じて付き添いを手配する',
                    why: 'この through は経路ではなく「~を介して」。book through an agency / order through the website と同じ手段の through。escort はカタカナの色を消して「同行者・付き添い」。閉鎖区域に入る手続きの説明として読む。',
                },
            ],
        },
        {
            key: 'p7-149-150',
            items: [
                {
                    en: 'whole beans',
                    lit: '全体の豆',
                    real: '挽いていない豆のまま',
                    why: 'whole は「丸ごと・そのまま」。whole beans は挽き豆 (ground coffee) に対する「豆のまま」で、whole milk(無調整乳)/ whole grain(全粒)と同じ発想。コーヒーのレシートでは商品の状態を示す語。',
                },
                {
                    en: 'may be exchanged within 14 days with this receipt',
                    lit: 'このレシートと一緒に14日以内に交換されるかもしれない',
                    real: 'レシート持参なら14日以内は交換できる',
                    why: 'この may は推量「かもしれない」ではなく許可「~できる」。規約文の may はほぼ許可。with this receipt の with は「~を提示すれば」という条件で、持ち物の「一緒に」ではない。2語とも規約の読み方の型。',
                },
                {
                    en: 'brewing equipment may not be returned',
                    lit: '醸造の設備は返されないかもしれない',
                    real: '抽出器具は返品できない',
                    why: 'may not は禁止「~できない」で、返品規定の決まり文句。brew はビール醸造だけでなくコーヒーや茶を「いれる」こと。return も「戻る」ではなく「返品する」。この一文が読めるかで返品可否の設問が決まる。',
                },
                {
                    en: 'Served by',
                    lit: '~によって仕えられた',
                    real: '担当スタッフ',
                    why: 'serve は「仕える」より「接客する・応対する」。レシートの Served by: 名前 は担当者欄で、Are you being served?(ご用は承っていますか)も同じ serve。飲食のレシートの定型欄として形で覚える。',
                },
            ],
        },
        {
            key: 'p7-151-153',
            items: [
                {
                    en: 'have trucked surplus apples and pears',
                    lit: '余剰のリンゴと洋ナシをトラックにしてきた',
                    real: '余ったリンゴと洋ナシをトラックで運んできた',
                    why: 'truck は名詞のまま動詞化して「トラック輸送する」。ship(発送する)/ bus(バスで運ぶ)と同じ乗り物動詞の型。surplus は「余剰の」で、売り先のない余り物というニュアンスがこの記事の問題設定を作っている。',
                },
                {
                    en: 'a bottling plant some eighty kilometers away',
                    lit: '約80キロ離れたいくつかの瓶詰めの植物',
                    real: '80キロほど離れた瓶詰め工場',
                    why: 'plant は「工場」。power plant / processing plant。some + 数詞は「およそ」で、いくつかの~ではない。away は距離の隔たり。3つとも中学で習う語だが、全部第一義で読むと植物が80キロ歩き出す。',
                },
                {
                    en: 'led many to leave part of their crop unharvested',
                    lit: '多くを導いて、作物の一部を収穫されないままに残させた',
                    real: '多くの農家が収穫をあきらめる原因になった',
                    why: 'lead A to do は「Aが~する結果を招く」で、cost(費用)が主語の因果の文。leave + 目的語 + 形容詞は「~のまま放置する」。many は many members の省略。この一文が推論問題の根拠になる。',
                },
                {
                    en: 'under its own label',
                    lit: '自分のラベルの下で',
                    real: '自分の農園のブランド名で',
                    why: 'under the ~ label / name / brand は「~の名義で」。sell under its own label = 自前の銘柄として売る。物理的にラベルの下に置く話ではない。出版の under the imprint、活動名の under the name も同じ型。',
                },
            ],
        },
        {
            key: 'p7-154-156',
            items: [
                {
                    en: 'The stage risers are up',
                    lit: 'ステージライザーは上だ',
                    real: 'ステージ台は設置済み',
                    why: 'up は位置の「上」ではなく「組み上がった状態」。The tent is up. / The posters are up. 準備報告のチャットで be up と出たら「もう立っている・済んでいる」。riser は舞台のかさ上げ台のこと。',
                },
                {
                    en: 'run a corrected banner',
                    lit: '修正された横断幕を走らせる',
                    real: '修正版の横断幕を刷る',
                    why: 'run は印刷・機械の文脈で「1回まわす・出力する」。run a report / run 500 copies / run a piece(記事を載せる)。印刷業者に can she run ~ と聞いたら「刷ってもらえるか」。走る話ではない。',
                },
                {
                    en: 'her large-format printer is booked until four',
                    lit: '彼女の大判プリンターは4時まで本にされている',
                    real: '大判プリンターの稼働枠が4時まで埋まっている',
                    why: 'booked は人だけでなく機械や部屋にも使い、「予約で押さえられている」。The room is booked. と同じ。機械が booked なら他の仕事が入っていて使えないということで、刷り直しが間に合うかの判断材料になる。',
                },
                {
                    en: 'a reprint would be tight',
                    lit: '刷り直しは(寸法が)きつくなるだろう',
                    real: '刷り直しは時間的にぎりぎりになる',
                    why: 'tight は時間の余裕のなさ。The schedule is tight. would は仮定「やるとしたら」の控えめな見立てで、確定の will とは違う。この2語で「できなくはないが危ない」という温度が伝わり、次の代替案につながる。',
                },
            ],
        },
        {
            key: 'p7-157-159',
            items: [
                {
                    en: 'on the hour, every hour',
                    lit: '時間の上で、毎時間',
                    real: '毎正時に(9時、10時ちょうどに)',
                    why: 'on the hour は「毎時0分ちょうどに」。half past(30分)や quarter past(15分)と対になる時刻の言い方。every hour と重ねて「1時間おき、開始は毎正時」。開催時刻の設問はこの句の読み違いを狙ってくる。',
                },
                {
                    en: 'harness and shoes provided',
                    lit: 'もしハーネスと靴なら',
                    real: '装備はこちらで用意します',
                    why: '名詞 + provided は「~支給・貸出あり」の省略表現で、are provided の are が落ちた形。接続詞の provided that(~という条件で)と同じつづりなので、文頭で見ると条件文と誤読しやすい。案内チラシの定型。',
                },
                {
                    en: 'Our coaches will be on the floor all day',
                    lit: 'コーチたちは一日中床の上にいるだろう',
                    real: 'コーチが終日フロアに出て対応する',
                    why: 'floor は「床」ではなく「現場・売り場」。on the floor = 持ち場に出ている。shop floor(現場)/ floor staff(売り場係)も同じ。コーチが床に寝転がっているわけではなく、いつでも質問できるという売り文句。',
                },
                {
                    en: 'will be waived',
                    lit: '手を振られるだろう',
                    real: '(入会金が)免除される',
                    why: 'waive は wave(手を振る)と同音の別語で、「(料金・権利を)適用しないことにする」。the fee will be waived は案内文の定番で、「当日入会ならタダになる」の一文。この語が読めるかで割引の推論問題が決まる。',
                },
            ],
        },
        {
            key: 'p7-160-163',
            items: [
                {
                    en: 'expected to draw about 600 attendees',
                    lit: '約600人の出席者を描くと期待されている',
                    real: '600人ほどの来場が見込まれている',
                    why: 'draw は「引き寄せる・集める」。draw a crowd / draw visitors。イベントが主語で人数が目的語なら集客の話で、絵は関係ない。本文ではこの語がそのまま同義語問題の対象になっており、attract に置き換えられる。',
                },
                {
                    en: 'main hall seats 750',
                    lit: 'メインホールは750の席',
                    real: '主ホールは750人を収容する',
                    why: 'seat はここでは動詞で「~人分の席がある」。The theater seats 300. 名詞の複数形と読むと動詞が消えて文が壊れる。会場資料の seats + 数字は収容人数のことで、参加見込み600人と比べる根拠になる。',
                },
                {
                    en: 'The auditorium hosts orchestra rehearsals every morning',
                    lit: '講堂は毎朝オーケストラのリハーサルの司会者だ',
                    real: '講堂は毎朝リハーサル会場として使われている',
                    why: 'host は動詞で「(行事の)会場になる・開催する」。host a conference / host an exhibition。建物が主語になれるのが日本語との違い。この一文が「午前は講堂を見学できない」という日程の理由になっている。',
                },
                {
                    en: "Should Ms. Sturm's flight on 12 May be delayed",
                    lit: 'シュトルムさんの便は5月12日に遅れるべきだ',
                    real: '万一12日の便が遅れた場合は',
                    why: '文頭の Should + 主語 + 動詞は If ~ should の倒置で「万一~なら」。義務の should で読むと「遅れるべき」という珍文になる。Should you have any questions(ご質問があれば)と同じ型で、TOEIC の注記の常連。',
                },
            ],
        },
        {
            key: 'p7-164-165',
            items: [
                {
                    en: 'by text message rather than by post',
                    lit: '柱によってではなくテキストメッセージによって',
                    real: '郵送ではなくSMSで',
                    why: 'post は英国式で「郵便」。by post = 郵送で。rather than は「~ではなく」で、新旧の手段を対比する型。この対比が読めれば、文書全体が「通知方法の切り替え案内」だと最初の一文で確定する。',
                },
                {
                    en: 'has been carried over to the new system',
                    lit: '新システムへ運ばれて越えられた',
                    real: '新しい仕組みにそのまま引き継がれた',
                    why: 'carry over は「繰り越す・引き継ぐ」。予約・ポイント・残高の移行で使う決まり文句。だから「何もしなくても予約は生きている」となり、直後の no action is needed につながる。物理的に運ぶ話ではない。',
                },
                {
                    en: 'the mobile number we hold for you',
                    lit: '私たちがあなたのために握っている携帯番号',
                    real: '当院に登録されている携帯番号',
                    why: 'hold は「(記録として)保有する」。the details we hold / we hold on file。mobile は英国式で携帯電話 (米 cell phone)。顧客情報の確認依頼の定型で、「手で握る」と読むと事務の文にならない。',
                },
                {
                    en: 'our Aberdeen practice',
                    lit: '私たちのアバディーンの練習',
                    real: 'アバディーンの診療所',
                    why: 'practice は医師・弁護士など専門職の「業務・事務所・診療所」。general practice(一般診療)/ dental practice(歯科医院)。カタカナの「プラクティス=練習」で読むと電話のかけ先が消える。眼鏡・医療系文書の頻出語。',
                },
            ],
        },
        {
            key: 'p7-166-169',
            items: [
                {
                    en: "with two weeks' notice",
                    lit: '2週間のお知らせと一緒に',
                    real: '2週間前に申し出れば',
                    why: 'notice は「掲示」ではなく「事前通告」。give notice(退職を申し出る)/ at short notice(急な連絡で)。with ~ notice は「~前に伝えることを条件に」で、解約条件の定型。weeks\' と複数形の所有格になるのも型。',
                },
                {
                    en: 'Students who outgrow their instruments',
                    lit: '楽器より外側で育つ学生',
                    real: '体が大きくなって楽器のサイズが合わなくなった生徒',
                    why: 'outgrow は「成長して~が合わなくなる」。outgrow clothes(服がサイズアウトする)。out- は「~を上回る」の接頭辞で、outnumber / outperform も同じ作り。子ども向けレンタルの交換制度の前提になる一語。',
                },
                {
                    en: "a purchase credit on the renter's account",
                    lit: '借り手の口座の上の購入の信用',
                    real: '購入時に使える積立残高',
                    why: 'credit は「信用」から離れて「使える残り・積立額」。store credit / account credit。毎月の支払いの6割がこの残高として貯まる仕組みで、on the account は「その人の記録に付く」。信用調査の話ではない。',
                },
                {
                    en: "Once it equals the instrument's list price",
                    lit: '一度それが楽器の定価と等しい',
                    real: '積立額が定価に達した時点で',
                    why: 'once は接続詞「いったん~したら」。文頭の Once + 文は時の条件節。equal は動詞「~に等しくなる」で、be 動詞なしで使える。list price は「リストの価格」ではなく「定価」。文挿入問題の挿入文がこの一文。',
                },
            ],
        },
        {
            key: 'p7-170-171',
            items: [
                {
                    en: 'one car at a time',
                    lit: '一度に1台の車',
                    real: 'エレベーターのかご1基ずつ',
                    why: 'エレベーターの「かご」は car と呼ぶ。elevator car。自動車で読むとビルに車が入ってくる。at a time は「一度に~ずつ」で、2基同時には止めないという告知の核心。この読みが正誤問題の根拠になる。',
                },
                {
                    en: 'will remain in operation throughout the project',
                    lit: 'プロジェクトを通り抜けて操作の中に残るだろう',
                    real: '工事期間中ずっと動き続ける',
                    why: 'in operation は「稼働中」。remain + 状態で「~のままでいる」。throughout は「~の間ずっと」で、through より切れ目なく続く含み。貨物用は止まらない、という住人への安心材料の一文。',
                },
                {
                    en: 'Updates will be posted in the lobby',
                    lit: '更新はロビーで郵送されるだろう',
                    real: '進捗はロビーに掲示される',
                    why: 'この post は「掲示する」。掲示板 (notice board) に貼る動作で、SNSの投稿もここから。英国式の郵便の post と同じつづりなので文脈で切り替える。場所が in the lobby なら貼り出しだと決めてよい。',
                },
                {
                    en: 'Questions may be directed to',
                    lit: '質問は~へ監督されるかもしれない',
                    real: '問い合わせは~宛てにどうぞ',
                    why: 'direct A to B は「Aを~に向ける」で、direct questions to = 質問を~に寄せる。映画監督の direct とは別の顔。may は許可。告知文の末尾の定型で、問い合わせ窓口が誰かを問う設問の根拠になる。',
                },
            ],
        },
        {
            key: 'p7-172-175',
            items: [
                {
                    en: 'Better foot traffic for us',
                    lit: '私たちにとってより良い足の交通',
                    real: '人通りが増えて客が来やすくなる',
                    why: 'foot traffic は「徒歩の人の流れ・来店者数」。小売・出展の業界語で、入口そばのブースが喜ばれる理由がこれ。traffic は車だけでなく人の流れにも使う。web traffic(アクセス数)も同じ発想。',
                },
                {
                    en: 'before the crate ships on Friday morning',
                    lit: '木箱が金曜の朝に船に乗る前に',
                    real: '荷が金曜朝に発送される前に',
                    why: 'ship は動詞で「発送する・出荷される」。トラック便でも飛行機でも ship。ここは自動詞で「荷物が出る」。crate は木枠の輸送箱。締め切りの基準になる出荷日で、印刷が間に合うかの計算に直結する。',
                },
                {
                    en: 'cover her shifts',
                    lit: '彼女のシフトを覆う',
                    real: '彼女の勤務を代わりに入る',
                    why: 'cover は「代役を務める」。cover for someone(~の穴を埋める)。シフト表の文脈の cover はほぼこれ。誰が実際に働くのかを問う設問は、この語の読み違い (依頼した人 vs 代わりに入る人) を狙う。',
                },
                {
                    en: 'the banner proof before it goes to print',
                    lit: '印刷に行く前のバナーの証拠',
                    real: '印刷に回す前の校正紙(仕上がり見本)',
                    why: 'proof は「証拠」ではなく印刷の「校正刷り」。approve the proof で「校了にする」。go to print は「印刷工程に入る」。刷ってしまう前に見本を確認したい、という発注側の定番の依頼文。',
                },
            ],
        },

        // ================= PART 7 multiple =================
        {
            key: 'p7-176-180',
            items: [
                {
                    en: 'Invoice my employer',
                    lit: '私の雇用主に請求書',
                    real: '費用は勤務先に請求してください',
                    why: 'invoice はここでは動詞で「~に請求書を送る」。bill me / invoice the company と同じ。名詞と読むと文が組み立たない。申込書のチェック欄の定型で、誰が支払うのかを問う設問の直接の根拠になる。',
                },
                {
                    en: 'Places are limited to twelve',
                    lit: '場所は12に制限されている',
                    real: '定員は12名',
                    why: 'place は「場所」ではなく「受講枠・定員の1人分」。a place on the course / places available。limited to + 数字で定員の上限。地図上の場所を数えていると読むと、申し込みを急ぐ理由が見えない。',
                },
                {
                    en: 'handed in at reception',
                    lit: 'レセプション(祝賀会)で手渡しされる',
                    real: '受付窓口に直接提出する',
                    why: 'hand in は「提出する」。hand in your form / hand in your resignation。reception はカタカナの祝賀会ではなく建物の「受付」。at reception = 受付で。郵送との二択で提出方法を示す事務文の型。',
                },
                {
                    en: 'the afternoon is spent practising on floor mats',
                    lit: '午後は床マットの上で練習して使われる',
                    real: '午後はまるごと床での実技にあてられる',
                    why: 'spend time doing の受動態で、時間が主語になる型。The morning was spent packing. も同じ。だから「ひざをつける服装で」という後半の指示につながる。practising は英国式つづりで、米国式は practicing。',
                },
            ],
        },
        {
            key: 'p7-181-185',
            items: [
                {
                    en: 'its takings fell by more than 20 percent',
                    lit: 'その取ることが20パーセント超のそばに落ちた',
                    real: '売上が2割超落ち込んだ',
                    why: 'takings は英国式で「売上金」。take(受け取る)の名詞化で、日々レジに入る現金のこと。fell by ~ の by は減少の幅。補助金の受給条件を作る数字なので、この行が読めないと二文書の照合問題が解けない。',
                },
                {
                    en: 'through till records',
                    lit: '~までの記録を通して',
                    real: 'レジの売上記録によって(証明して)',
                    why: 'till は前置詞「~まで」と同じつづりだが、名詞では英国式で「レジ」。till records = レジの記録。through は「~を用いて」の手段。show, through till records, that ~ という挿入の構文も合わせて取ると読める。',
                },
                {
                    en: 'a one-off grant of GBP 500',
                    lit: '1つ外れた500ポンドの付与',
                    real: '1回限りの500ポンドの支給金',
                    why: 'one-off は英国式で「単発の・1回きりの」。a one-off payment / a one-off event。grant は「許可する」の動詞ではなく名詞で「補助金・助成金」。毎月もらえる制度ではない、という条件の核。',
                },
                {
                    en: 'during the works',
                    lit: 'それらの仕事の間',
                    real: '工事の期間中',
                    why: 'works は複数形で英国式の「工事」。roadworks(道路工事)。仕事の複数と読むと期間の話にならない。この記事では the works = 遊歩道の舗装工事を指し、補助金も看板もすべてこの期間に紐づく。',
                },
                {
                    en: 'has traded on the riverside footpath for nine years',
                    lit: '川沿いの小道の上で9年間貿易してきた',
                    real: 'その小道で9年間店を営んできた',
                    why: 'trade は英国式で「商売する・営業する」。trader = 商店主。貿易やトレード(移籍・株)で読むと個人商店の話にならない。記事側の its traders(沿道の商店主たち)と同じ語で、二つの文書をつなぐ鍵。',
                },
            ],
        },
        {
            key: 'p7-186-190',
            items: [
                {
                    en: 'so you do not have to',
                    lit: 'だからあなたはしなければならない、ではない',
                    real: 'あなたが世話をしなくて済むように',
                    why: 'have to の後ろに keep them healthy が省略された形。so (that) you do not have to (do it)。英語は繰り返しを削る言語で、この省略を補えないと宣伝文の意味が半分になる。I will if you want to. なども同じ型。',
                },
                {
                    en: 'Plans run month to month',
                    lit: 'プランは月から月へ走る',
                    real: '契約は1か月ごとの更新で続く',
                    why: 'run は「(契約・期間が)続く」。The lease runs for two years. month to month は「月単位で、長期縛りなし」。走る話ではなく契約形態の説明で、12か月契約かどうかを問う設問の根拠になる。',
                },
                {
                    en: 'now that we are busy',
                    lit: '今、それは私たちが忙しいということ',
                    real: '忙しくなった今となっては(~なので)',
                    why: 'now that は2語で1つの接続詞「~である今、~なので」。Now that the season has started, ~。now と that を別々に読むと構文が壊れる。植物が弱っている理由を述べる because の柔らかい版。',
                },
                {
                    en: 'A client passed me one of your welcome coupons',
                    lit: 'クライアントが私を追い越した',
                    real: '取引先がクーポンを1枚回してくれた',
                    why: 'pass + 人 + 物は「手渡す」。Pass me the salt. 追い越すの pass と同じ語だが、目的語が2つ並んだら受け渡し。この一文がクーポンの入手経路 = 新規客であることの証拠になり、割引計算の設問につながる。',
                },
            ],
        },
        {
            key: 'p7-191-195',
            items: [
                {
                    en: 'must hold a current electrical licence',
                    lit: '現在の電気ライセンスを握っていなければならない',
                    real: '有効な電気工事の資格を持っていること',
                    why: 'hold a licence は「資格を保有する」。current は「今の」ではなく「期限が切れていない・有効な」。a current passport も同じ。この参加条件が、名簿と突き合わせて人物を推論する問題の土台になる。',
                },
                {
                    en: 'as most toy repairs turn out to need them',
                    lit: 'ほとんどのおもちゃ修理がそれらを必要とするために外へ曲がるので',
                    real: 'ふたを開けてみると電池が要る修理が多いので',
                    why: 'turn out to ~ は「結果として~だと分かる」。It turned out to be true. 文頭の as はここでは理由「~なので」。電池を持参させる理由の説明で、曲がる話は一切ない。頼まれごとの背景を読む鍵。',
                },
                {
                    en: 'Please print your name and tick one shift',
                    lit: '名前を印刷して、1つのシフトをダニしてください',
                    real: '名前を活字体で書き、希望シフトに印を付ける',
                    why: 'print は手書きでも「活字体で(読める字で)書く」。筆記体 (signature) と対。tick は英国式で「チェックマークを付ける」(米 check)。虫のダニ (tick) と同じつづり。記入用紙の指示文の2大現場語。',
                },
                {
                    en: 'the hall hire has been covered by a community grant',
                    lit: 'ホールの雇用は地域の付与に覆われた',
                    real: '会場の借り賃は地域の助成金でまかなわれた',
                    why: 'hire は英国式で「(場所・物を)借りること・賃借料」。hall hire = 会場費。cover は「費用を負担する」。expenses are covered と同じ。だから来場者は無料、という因果がこの一文に詰まっている。',
                },
            ],
        },
        {
            key: 'p7-196-200',
            items: [
                {
                    en: 'fitting dates are filling quickly',
                    lit: '試着の日付が速く満たしている',
                    real: '取り付け工事の予約枠が埋まってきている',
                    why: 'fitting は服の試着ではなく「取り付け・施工」(英)。fitted by our own crew の fit と同じ。fill はここでは自動詞で「埋まる」。The course is filling fast. 早めの予約を促す広告の決まった言い回し。',
                },
                {
                    en: 'We would like to go ahead',
                    lit: '前へ行きたい',
                    real: 'この内容で正式に進めてほしい(発注する)',
                    why: 'go ahead は「計画を実行に移す」。give the go-ahead(ゴーサインを出す)。見積もりへの返信でこれが出たら発注の意思表示で、メール全体の用件が決まる。物理的に前進する話ではない。',
                },
                {
                    en: 'Everything else can stay as quoted',
                    lit: '他のすべては引用されたように留まれる',
                    real: 'それ以外の項目は見積書のままでよい',
                    why: 'quote は「引用する」ではなく「見積もる」。quotation = 見積書。as quoted = 見積書に記載のとおり。stay は「そのままでいる」。1項目だけ変更して残りは据え置き、という修正依頼の型で、金額の再計算問題の前提になる。',
                },
                {
                    en: 'the booking desk cannot close once it does',
                    lit: '一度それがするなら、予約デスクは閉じることができない',
                    real: 'シーズンが始まってしまったら受付を閉められない',
                    why: 'once は接続詞「いったん~したら」。does は直前の opens を受ける代動詞で、once it does = once the season opens。省略が二重になっていて、補えないと「6月27日までに」という期限の理由が読めない。',
                },
            ],
        },
    ],
};

export default TOEIC_BRIDGE_07;
