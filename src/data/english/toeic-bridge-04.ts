/**
 * TOEIC(R) L&R 形式 フル模試 04 -- つながらない語。
 *
 * 語注(toeic-explain-04.ts の gloss)とは埋めるものが違う。あちらは
 * 「知らない単語の意味」。こちらは**単語は全部知っているのに文が読めない**箇所。
 *
 * 単語を覚えても解像度が上がらない原因はほぼここにある:
 *  - 中学単語なのに、学校で覚えた訳を当てると文が壊れる (place an order / walk 人 through)
 *  - カタカナ語として輸入されていて、英語の意味とずれている (claim / service / sheet)
 *  - 訳語は合っているのに、文中で果たす役割が日本語と違う (once / given / well under)
 *  - ビジネスの現場語で、辞書の第一義が現場では使われない (fill a prescription / hire)
 *
 * 1セット3-5件。key は toeic-explain-04.ts の SetExplain.key と一致させる。
 * en は本文の表記のまま抜く (検索して原文に当たれるようにするため)。
 */
import type { ToeicBridge } from './toeic-types';

export const TOEIC_BRIDGE_04: ToeicBridge = {
    id: 'toeic-test-04',
    sets: [
        // ================= PART 1 =================
        {
            key: 'p1-1-3',
            items: [
                {
                    en: 'He is placing some items on a metal shelf.',
                    lit: '彼は金属の棚にいくつかの品物を場所している',
                    real: '彼は金属の棚に品物を置いている',
                    why: 'place を名詞「場所」でしか持っていないと、この文が動詞で始まっていることに気づけない。Part 1 では put の言い換えとして place が毎回のように出る。put が聞こえるはず、と待っていると取り逃がす。',
                },
                {
                    en: 'A woman is pointing at a large display screen.',
                    lit: '女性が大きなディスプレイ画面をポイントしている',
                    real: '女性が大きな画面を指さしている',
                    why: 'point はカタカナの「ポイント(要点)」が邪魔をして動詞に見えない。point at ～ で「～を指さす」。Part 1 の頻出動作で、絵の中で腕を上げている人がいたらこれ。',
                },
                {
                    en: 'He is rinsing a cup in a sink.',
                    lit: '彼はシンクでカップにリンスしている',
                    real: '彼は流し台でカップをすすいでいる',
                    why: '日本語のリンスは髪用の商品名として入ってきたので、動詞「水で洗い流す」が出てこない。Part 1 では pour(注ぐ) / rinse(すすぐ) / wipe(拭く) が同じ絵の候補として並ぶ。',
                },
                {
                    en: 'A man is gathering papers from the table.',
                    lit: '彼はテーブルから紙を収集している',
                    real: '彼はテーブルの紙をかき集めている',
                    why: 'gather を「収集する(コレクションする)」で覚えていると、机の上の書類をまとめる日常動作に結びつかない。gather は散らばっているものを一箇所に寄せる動き全般。',
                },
            ],
        },
        {
            key: 'p1-4-6',
            items: [
                {
                    en: 'Some merchandise has been arranged on a table.',
                    lit: '商品がテーブルの上で手配されている',
                    real: '商品がテーブルに並べられている',
                    why: 'arrange を「手配する(アレンジする)」だけで持っていると、この受け身が読めない。物が主語のとき arrange は「整えて並べる」。Part 1 の商品陳列の絵はほぼこの語で言い換えられる。',
                },
                {
                    en: 'Some vessels are docked along a pier.',
                    lit: 'いくつかの容器が桟橋に沿ってドックされている',
                    real: '数隻の船が桟橋に停泊している',
                    why: 'vessel を「容器・血管」で覚えていると船だと分からない。dock も「造船所」の名詞で止まっていると動詞「接岸する」に届かない。boat という簡単な語をわざと避けた言い換えが正解になるのが Part 1 の型。',
                },
                {
                    en: 'One of the workers is moving some cargo.',
                    lit: '作業員の一人が貨物を移動している',
                    real: '作業員の一人が荷物を運んでいる',
                    why: 'move を自動詞「動く・引っ越す」でしか使っていないと、他動詞で「運ぶ」になったときに carry を探してしまう。台車で押していても抱えていても move で表せる、という幅がポイント。',
                },
                {
                    en: 'Someone is unrolling an awning over the stalls.',
                    lit: '誰かが屋台の上でオーニングをアンロールしている',
                    real: '誰かが売り場の上の日よけを広げているところだ',
                    why: 'unroll は「今まさに巻きを解いている最中」。日よけがすでに張ってある絵ならこれは不正解になる。Part 1 の誤答は「動作の途中」と「完了した状態」をすり替えてくるので、-ing が進行中を指すのか状態なのかを毎回分ける。',
                },
            ],
        },

        // ================= PART 2 =================
        {
            key: 'p2-7-11',
            items: [
                {
                    en: 'When will the new invoicing system go live?',
                    lit: '新しい請求システムはいつ生きて行くのか',
                    real: '新しい請求システムはいつ稼働開始するのか',
                    why: 'go live は IT・放送で「本番が始まる」。live を「生の・ライブの」で止めると質問が何を聞いているか分からない。start / launch / be up and running が同じ意味の仲間。',
                },
                {
                    en: 'Please do, if the large one is free.',
                    lit: 'どうぞしてください、もし大きいのが無料なら',
                    real: 'ぜひお願いします、大きいほうが空いていれば',
                    why: '2箇所つまずく。Please do. は代動詞の do で、前の申し出(book the meeting room)をそのまま受ける「お願いします」。free は部屋・時間について言えば「無料」ではなく「空いている」。予約の話で free が出たら値段の話ではない。',
                },
                {
                    en: 'Not until the first of next month.',
                    lit: '来月1日まで、ない',
                    real: '来月1日にならないと動きません',
                    why: '日本語は「1日から動く」と肯定で言うところを、英語は not until で否定のまま置く。When ～? への答えが Not で始まるので「答えていない」と感じて切ってしまいがちだが、これは立派な時刻の答え。',
                },
                {
                    en: 'What time does the courier usually pick up outgoing mail?',
                    lit: '配達人はたいてい何時に外向的な郵便を拾うのか',
                    real: '宅配業者はいつも何時に発送物を集荷しますか',
                    why: 'outgoing を人の性格「社交的」で覚えていると郵便に付いた瞬間に止まる。荷物・メールに付く outgoing は「これから外へ出ていく=発送の」で、対になるのが incoming(受信・入荷)。pick up も「拾う」ではなく「集荷する」。',
                },
                {
                    en: 'Who is leading the training session on Friday?',
                    lit: '金曜の研修を誰がリードしているのか',
                    real: '金曜の研修は誰が担当しますか',
                    why: 'lead を「先導する・引っぱる」の熱いイメージで持っていると、会議や研修の司会・講師という淡々とした意味に届かない。TOEIC で lead a session / run a session と来たら「その回を仕切る人」を聞いている。',
                },
            ],
        },
        {
            key: 'p2-12-16',
            items: [
                {
                    en: 'It starts at nine sharp.',
                    lit: '9時に鋭く始まる',
                    real: '9時ちょうどに始まります',
                    why: '時刻の後ろに置く sharp は「ぴったり」。形容詞「鋭い」しか持っていないと文末で意味が崩れる。同じ位置に置ける on the dot / exactly も同義。',
                },
                {
                    en: 'The quarterly figures are due by noon, aren\'t they?',
                    lit: '四半期のフィギュアは正午までのためですよね',
                    real: '四半期の数字は正午締切ですよね',
                    why: 'figure はカタカナの「フィギュア(人形)」が強すぎて「数字・業績」が出てこない。due も「～のため(due to)」の形でしか見ていないと、単独の due が「締切が来ている」だと気づけない。be due by ～ で「～までが期限」。',
                },
                {
                    en: 'The freight elevator is out of service.',
                    lit: '貨物用エレベーターはサービスの外だ',
                    real: '貨物用エレベーターは故障中です',
                    why: 'service を「サービス(おまけ・接客)」で持っていると out of service が読めない。ここでの service は「稼働・運用」。機械や路線が out of service なら「今は動いていない」。逆は in service。',
                },
                {
                    en: 'Their driver was rerouted around a bridge closure.',
                    lit: '運転手は橋の閉鎖のまわりに再ルートされた',
                    real: '運転手が橋の通行止めを迂回させられた',
                    why: 'around を「～のまわりに」の位置関係だけで持っていると、障害物に対する around が「それを避けて回り込む」だと出てこない。go around a closure / work around a problem も同じ発想。',
                },
                {
                    en: 'Ms. Hoshino moved the deadline to Wednesday.',
                    lit: 'ホシノさんが締切を水曜に動かした',
                    real: 'ホシノさんが締切を水曜にずらしました',
                    why: 'move the deadline は「動かした」だけで、前倒しか後ろ倒しかを言っていない。ここが日本語の「延期した」と違うところ。早める方向をはっきり言うときは move up、遅らせる方向は push back を足す。',
                },
            ],
        },
        {
            key: 'p2-17-21',
            items: [
                {
                    en: 'Isn\'t the elevator inspection scheduled for this morning? -- Yes, starting at nine.',
                    lit: '点検は今朝じゃないんですか -- はい、9時から',
                    real: '点検は今朝でしたよね -- ええ、9時からです',
                    why: '否定疑問に対する Yes / No は、日本語の「はい/いいえ」と逆に働く。英語は聞き方に関係なく「やる=Yes」「やらない=No」で固定。日本語につられて Yes を「いいえ、違います」と取ると、正解の応答を自分で潰してしまう。',
                },
                {
                    en: 'She takes the stairs most days.',
                    lit: '彼女はほとんどの日、階段を取る',
                    real: '彼女はたいてい階段を使っています',
                    why: 'take を「取る」で処理すると乗り物・経路に付いたときに崩れる。take the stairs / take the train / take the highway はどれも「その手段を使う」。most days は「ほとんどの日=たいてい」で、most of the days とは言わない。',
                },
                {
                    en: 'A shorter timeline and two extra site visits.',
                    lit: 'より短いタイムラインと2つの追加サイト訪問',
                    real: '納期の短縮と、現地視察2回の追加です',
                    why: 'site を Web サイトで覚えていると建設・製造の「現場」が出てこない。TOEIC の site はほぼ「現場・敷地」。timeline も「年表」ではなく「日程・スケジュール」。',
                },
                {
                    en: 'The crew finished it over the weekend.',
                    lit: '作業班は週末を越えてそれを終えた',
                    real: '作業班が週末のうちに終わらせました',
                    why: 'over + 期間 は「その期間ずっと・その期間のうちに」。「越えて」と取ると時期がずれる。加えてこの応答は「なぜまだ塗ってないの?」という質問の前提そのものを崩しにいく型で、Part 2 の後半でよく出る。',
                },
                {
                    en: 'There\'s construction on that line all week.',
                    lit: 'その線の上に一週間ずっと建設がある',
                    real: 'その路線は今週ずっと工事中です',
                    why: 'line は「線」から「路線」まで距離がある。鉄道・電話・生産の文脈ではまず「路線・回線・ライン」。construction も「建設(新しく建てる)」に限らず「工事」全般を指す。',
                },
            ],
        },
        {
            key: 'p2-22-26',
            items: [
                {
                    en: 'Why don\'t we review the contract over lunch tomorrow?',
                    lit: 'なぜ我々は明日昼食をとりながら契約を見直さないのか',
                    real: '明日ランチしながら契約を見ませんか',
                    why: 'Why don\'t we ～? は理由を聞いていない。まるごと「～しませんか」という提案の形。理由を聞かれたと思って理由を探すと、正解の「その時間は別の予定がある」という応答が候補から外れる。',
                },
                {
                    en: 'Ms. Venkatesan broke for lunch.',
                    lit: 'ベンカテサンさんが昼食のために壊れた',
                    real: 'ベンカテサンさんは昼休憩に入りました',
                    why: 'break for lunch は「休憩に入る」。この問題は「壊れたスキャナー(broken scanner)」を聞いた直後に broke を置いてくる音のひっかけで、意味を取らずに単語だけ拾うと必ず刺さる。',
                },
                {
                    en: 'Aren\'t the revised floor plans supposed to be here by now?',
                    lit: '修正された間取り図は今までにここにあると想定されていないのか',
                    real: '修正した図面、そろそろ届いてるはずじゃないですか',
                    why: 'be supposed to は「想定される」と訳すと硬すぎて、話者の「約束と違う」というニュアンスが消える。by now は「今頃はもう」で、まだ来ていないことへの軽い抗議。この2つが読めると、答えが日程の言い直しになるのが見える。',
                },
                {
                    en: 'Should we ship the samples by air or by rail?',
                    lit: '空気によってか鉄道によってサンプルを出荷すべきか',
                    real: 'サンプルは空輸と鉄道、どちらで送りますか',
                    why: 'by + 冠詞なしの名詞は「その手段で」。by air / by rail / by hand は air や rail という「物」を指していないので、a も the も付かない。冠詞が無いことに気づくと手段の話だと即断できる。',
                },
            ],
        },
        {
            key: 'p2-27-31',
            items: [
                {
                    en: 'We\'re holding a send-off for Mr. Sitanggang on Friday.',
                    lit: '金曜にシタンガンさんのための送り出しを持っている',
                    real: '金曜にシタンガンさんの送別会をやります',
                    why: 'send-off はハイフンで名詞になって「送別会」。直後の誤答が He sent it off this morning.(発送した)で、同じ音を動詞に戻して引っかけてくる。hold も「持つ」ではなく「催す」。',
                },
                {
                    en: 'The budget review has been moved up to Monday.',
                    lit: '予算レビューは月曜まで上に動かされた',
                    real: '予算会議が月曜に前倒しになりました',
                    why: 'move up は「繰り上げる=早くなる」。move to だけなら日程変更としか分からないが、up が付いた瞬間に方向が決まる。日本語の「予定がズレた」は方向を含まないので、この up を落とすと「まだ余裕がある」と逆に読んでしまう。',
                },
                {
                    en: 'Nine, but only three were shortlisted.',
                    lit: '9人、しかし3人だけが短いリストにされた',
                    real: '9人ですが、次に進んだのは3人だけです',
                    why: 'shortlist は「候補を絞った最終リスト」で、動詞では「最終候補に残す」。採用・選考の話で必ず出る。人数を答えた後に but で条件を足す形も Part 2 の後半の定番。',
                },
                {
                    en: 'Have you asked Ms. Quintanilla what\'s still in stock?',
                    lit: 'まだストックにあるものをキンタニラさんに聞きましたか',
                    real: 'まだ在庫が何本残っているか、キンタニラさんに確認しました?',
                    why: 'in stock は「在庫がある」。「ストック(貯め込む)」のカタカナだと個人の備蓄に聞こえるが、これは会社の在庫。加えて Shall I order ～? という申し出に、Yes/No ではなく質問で返す型。応答が質問なら間違い、と決めつけないこと。',
                },
                {
                    en: 'I\'d better check with the meeting organizer.',
                    lit: '会議の主催者と一緒にチェックしたほうがいい',
                    real: '会議の主催者に確認してみます',
                    why: 'check with 人 は「人に確認を取る」。with を「一緒に」と読むと、二人で何かを点検する絵になってしまう。物を調べるのは check、人に伺いを立てるのは check with。had better も「したほうがいい」より「そうしないとまずい」寄り。',
                },
            ],
        },

        // ================= PART 3 =================
        {
            key: 'p3-32-34',
            items: [
                {
                    en: 'I have the proof for your business cards ready.',
                    lit: '私はあなたの名刺のための証拠を準備して持っている',
                    real: '名刺の校正刷りが上がっています',
                    why: 'have + 目的語 + ready は「～ができている」という状態の報告で、「持っている」ではない。have it done / have it ready はこの形。proof も印刷業界では「証拠」ではなく刷り見本。',
                },
                {
                    en: 'that\'s a quick fix',
                    lit: 'それは速い固定だ',
                    real: 'それはすぐ直せます',
                    why: 'fix が名詞になると「手直し・応急の修理」。動詞の「固定する」から離れる必要がある。会議で That\'s an easy fix. と言われたら「それは簡単に直る」であって、固定するとは誰も言っていない。',
                },
                {
                    en: 'Then let\'s go to a thousand.',
                    lit: 'それでは1000へ行きましょう',
                    real: 'じゃあ1000部にしましょう',
                    why: 'go to + 数量は「その数にする」。移動の go しか持っていないと、数量を決める場面で意味が消える。go with(それでいく)、go up to(そこまで上げる)も同じ発想。',
                },
                {
                    en: 'I\'ll have it in your inbox within the hour.',
                    lit: '1時間以内にあなたの受信箱に入れておく',
                    real: '1時間以内にメールでお送りします',
                    why: 'within an hour ではなく within the hour。the が付くと「今この時間のうちに=これから60分以内に」と、話している瞬間を起点にする言い方になる。細かいが、締切を聞く設問で効いてくる。',
                },
            ],
        },
        {
            key: 'p3-35-37',
            items: [
                {
                    en: 'Thursday is cutting it close.',
                    lit: '木曜はそれを近くで切っている',
                    real: '木曜だとギリギリすぎる',
                    why: 'cut it close は「余裕がない・きわどい」。金曜出荷なのに木曜修理では間に合わないかもしれない、という不安の表明。意図問題(What does the man mean ～?)は、こういう決まり文句が丸ごと分からないと手も足も出ない。',
                },
                {
                    en: 'move the whole run to line three tonight',
                    lit: '今夜、走り全体を3番ラインに動かす',
                    real: '今夜、生産分をまるごと3号ラインに移す',
                    why: 'run が名詞で「一回の生産・その分量」。動詞の「走る」から離れないと、工場の会話がずっと分からないままになる。a production run / a print run で「一度に流す分」。',
                },
                {
                    en: 'I\'ll let the floor supervisor know.',
                    lit: '床の監督者に知らせよう',
                    real: '現場の主任に伝えておきます',
                    why: 'floor は工場・店舗では「現場・作業フロア」を指し、on the floor は「現場に出ている」。床を思い浮かべると人の役職名が意味不明になる。let 人 know は tell よりやわらかい「伝えておく」。',
                },
                {
                    en: 'We ship the Loxbury order Friday.',
                    lit: '我々はロクスベリーの注文を金曜に出荷する',
                    real: 'ロクスベリーの分は金曜出荷なんです',
                    why: '確定した予定は現在形で言う。will が無いから未来の話ではない、と読むと締切の緊迫感が消える。列車・便・出荷など、動かしにくい予定ほど現在形になる。',
                },
            ],
        },
        {
            key: 'p3-38-40',
            items: [
                {
                    en: 'does that work for your group?',
                    lit: 'それはあなたのグループのために働きますか',
                    real: 'その日程で大丈夫ですか',
                    why: 'work for 人 は「都合が合う・それでうまくいく」。労働の work から離れる。Does Tuesday work for you? は超頻出で、答えは「はい/いいえ」ではなく別の時間帯の提案になることが多い。',
                },
                {
                    en: 'We take our heaviest call volume before noon.',
                    lit: '我々は正午前に最も重い電話の音量を取る',
                    real: 'うちは午前中が一番電話が集中するんです',
                    why: 'volume は「音量」より先に「量」。call volume / sales volume で「件数・取扱量」。heavy も「重い」ではなく「多い・混んでいる」。この2語が読めれば、なぜ午前の研修が無理なのかが一発で分かる。',
                },
                {
                    en: 'The phones go quiet then.',
                    lit: '電話はそのとき静かに行く',
                    real: 'その時間になると電話が鳴らなくなります',
                    why: 'go + 形容詞は「その状態になる」。go quiet / go missing / go bad。移動の go を当てると読めない。become に置き換えられるかで見分ける。',
                },
                {
                    en: 'Fine by me.',
                    lit: '私のそばで良い',
                    real: '私はそれで構いません',
                    why: 'by me は「私の判断としては」。That\'s fine by me. の省略で、賛成の返事。by を場所の「そばに」で処理すると意味不明になる。同じ形の works for me も「私はそれでいい」。',
                },
            ],
        },
        {
            key: 'p3-41-43',
            items: [
                {
                    en: 'the visitor center had ninety-two people through on Saturday',
                    lit: 'ビジターセンターは土曜に92人を通して持っていた',
                    real: '土曜はビジターセンターに92人が来ました',
                    why: 'have 人 through は「～人が通った=来場した」。動詞らしい動詞が無いので日本語に置き換えにくいが、施設の来場者数はこの形でよく言う。through が入場から退場までの通り抜けを表している。',
                },
                {
                    en: 'the second tour ran forty minutes over',
                    lit: '2回目のツアーは40分を越えて走った',
                    real: '2回目のツアーが40分押しました',
                    why: 'run over は「予定時間を超過する」。会議・番組・ツアーで使う。over が文末に落ちているので前置詞に見えず、目的語を探して迷子になりやすい。逆に早く終われば run short。',
                },
                {
                    en: 'So we cap the groups. Twenty-five each.',
                    lit: 'だから我々はグループに帽子をかぶせる',
                    real: 'なら1組の上限を決めましょう。25人ずつで',
                    why: 'cap が動詞で「上限を設ける」。名詞の「帽子・キャップ」から距離があるが、cap the price / a spending cap のように費用や人数の頭を押さえる意味で頻出。',
                },
                {
                    en: 'I\'d rather train someone from the bottling floor first.',
                    lit: '私はむしろ最初に瓶詰めの床から誰かを訓練する',
                    real: '先に瓶詰め現場の人を育てたいんですけど',
                    why: 'would rather は「どちらかといえば」という控えめな訳で覚えると弱すぎる。実際は相手の案(採用する)を退けて別案を出す、はっきりした対案の合図。ここも floor は「現場」。',
                },
            ],
        },
        {
            key: 'p3-44-46',
            items: [
                {
                    en: 'I booked the ten-thirty crossing to Tilbrand.',
                    lit: '10時半の横断を予約した',
                    real: '10時半のティルブランド行きの便を予約しました',
                    why: 'crossing は船で海峡・川を渡る「その一便」。横断歩道(pedestrian crossing)の印象が強いと、予約できる名詞に見えない。フェリーの話で crossing と来たら flight や train と同じ「便」。',
                },
                {
                    en: 'the fare changes. It goes from eighteen to thirty-one euros.',
                    lit: '運賃が変わる。18から31ユーロへ行く',
                    real: '料金が変わります。18ユーロから31ユーロになります',
                    why: 'go from A to B は「AからBに変わる」。移動ではなく数値の変化。fare は乗り物の運賃だけに使う語で、料金一般の fee、宿泊や利用の rate、商品の price と使い分ける。',
                },
                {
                    en: 'I\'ll pay the difference.',
                    lit: '私は違いを払う',
                    real: '差額を払います',
                    why: 'difference は金額の話では「差額」。「違い」で止めると何を払うのか分からなくなる。pay the difference / split the difference(折半する)はセットで覚える形。',
                },
                {
                    en: 'The booth closes half an hour before departure.',
                    lit: 'ブースは出発の30分前に閉まる',
                    real: '窓口は出発30分前に閉まります',
                    why: 'booth はカタカナだと展示会の「ブース」だが、駅や港では「切符売り場・窓口」。この文が「10時までに来い」の理由になっているので、booth が何かを取り違えると設問の根拠が拾えない。',
                },
            ],
        },
        {
            key: 'p3-47-49',
            items: [
                {
                    en: 'That end cap has been sitting empty since Tuesday.',
                    lit: 'あのエンドキャップは火曜から空っぽで座っている',
                    real: '棚の端の売り場が火曜からずっと空いたままなんです',
                    why: 'sit + 形容詞は「その状態のまま置かれている」。人が座る sit ではない。sit empty / sit idle / sit unused。end cap は陳列棚の端、いちばん目立つ販売スペースのこと。',
                },
                {
                    en: 'Berries won\'t hold up more than a day.',
                    lit: 'ベリーは1日以上、上に持たない',
                    real: 'ベリーは1日ももたないですよ',
                    why: 'hold up は自動詞で「持ちこたえる・傷まない」。物の品質・体力・天気に使う。hold(持つ)と up(上)を足しても出てこない意味なので、句として覚えるしかないタイプ。',
                },
                {
                    en: 'could you have them stacked before we open?',
                    lit: '開店前にそれらを積まれて持てますか',
                    real: '開店までに積んでおいてもらえますか',
                    why: 'have + 目的語 + 過去分詞は「～させておく・～してもらう」。自分が積むとも、誰かにやらせるとも取れる便利な形。「持つ」で読むと依頼だと分からず、設問の「Mr. Thevar は何を頼まれたか」を落とす。',
                },
                {
                    en: 'The last batch reached us half crushed.',
                    lit: '最後のバッチは半分つぶれて我々に到達した',
                    real: '前回の入荷分は半分つぶれた状態で届きました',
                    why: 'batch は「一度に届く/作るひとまとまり」。the last batch は「最後の」ではなく「前回の」。reach 人 は「人のところに届く」で、arrive と違って目的語を直に取る。',
                },
            ],
        },
        {
            key: 'p3-50-52',
            items: [
                {
                    en: 'I built the whole thing for a screen half that size.',
                    lit: '私は全体をその半分のサイズのスクリーンのために建てた',
                    real: 'その半分の大きさの画面に合わせて全部作ったんですよ',
                    why: 'half that size は「その半分の大きさの」で、名詞の後ろから前の名詞を修飾している。half of that size とは言わない。build も「建てる」ではなく資料・仕組みを「作る」。',
                },
                {
                    en: 'You have until tomorrow noon to send new files.',
                    lit: 'あなたは新しいファイルを送るために明日の正午まで持っている',
                    real: '新しいファイルは明日の昼までに送ってもらえれば大丈夫です',
                    why: 'have until X to do は「Xまでに～すればいい」。日本語は「までに」と締切だけを言うが、英語は「その時間を持っている」と余裕のほうを主語にする。You have two weeks to decide. も同じ形。',
                },
                {
                    en: 'my demo runs a two-minute clip',
                    lit: '私のデモが2分のクリップを走らせる',
                    real: 'デモの途中で2分の動画を流すんです',
                    why: 'run は「(映像・音声を)流す・再生する」。run an ad(広告を出す)、run a test(検査をかける)も同じで、run は「動かして通す」が芯にある。走るイメージを外すと一気に読めるようになる語。',
                },
                {
                    en: 'What worries me is the sound.',
                    lit: '私を心配させるものは音だ',
                    real: '気になってるのは音のほうなんです',
                    why: 'What で始まる名詞のかたまりが主語。「何が」と疑問文で読み始めると is で行き詰まる。What I need is ～ / What worries me is ～ は、言いたいことを後ろに置くための型。',
                },
            ],
        },
        {
            key: 'p3-53-55',
            items: [
                {
                    en: 'the new hires start Monday',
                    lit: '新しい雇用が月曜に始まる',
                    real: '新入社員が月曜から来るんです',
                    why: 'hire が名詞で「採用された人」。new hires = 新人。動詞の「雇う」しか持っていないと、start の主語が人だと分からない。recent hires / a new hire も同じ。',
                },
                {
                    en: 'Apparently.',
                    lit: '明らかに。',
                    real: 'みたいですね。',
                    why: 'apparently は「明らかに」ではなく「(聞いた話では)～らしい」。むしろ自信が無いときの語。辞書の第一義のまま覚えていると、話者の断定度を正反対に読む。確信して言うなら clearly / obviously。',
                },
                {
                    en: 'I\'ll go down to the building office and book it.',
                    lit: 'ビル事務所へ降りて行ってそれを本にする',
                    real: '下の管理事務所に行って、それを押さえてきます',
                    why: 'book が動詞で「予約する」。名詞の「本」から離れる。TOEIC では reserve と交互に出てきて、設問の選択肢では Make a reservation と言い換えられる。',
                },
                {
                    en: 'Let me know once you have a confirmation number.',
                    lit: '一度あなたが確認番号を持ったら知らせて',
                    real: '予約番号が出たら教えてください',
                    why: 'この once は「一度」ではなく接続詞「～したらすぐ」。後ろに主語+動詞が続いていたら回数ではない。when より「その条件が満たされた瞬間に」の色が強い。',
                },
            ],
        },
        {
            key: 'p3-56-58',
            items: [
                {
                    en: 'Ms. Rhee and I finished screening the applicants',
                    lit: '応募者をスクリーンし終えた',
                    real: '応募者の書類選考が終わりました',
                    why: 'screen が動詞で「ふるいにかける・選考する」。画面の screen と同じ綴りなので動詞に見えない。screening = 選考、健康診断の「検診」も同じ語。',
                },
                {
                    en: 'How many made it through?',
                    lit: '何人がそれを通して作ったのか',
                    real: '何人が通りましたか',
                    why: 'make it through で「切り抜ける・通過する」。make it だけでも「間に合う・たどり着く・成功する」で、it が何を指すかを考え始めると迷う。it は訳さない決まり文句として処理する。',
                },
                {
                    en: 'The warehouse client wants weekday coverage from the start.',
                    lit: '倉庫のクライアントは最初から平日の報道を望んでいる',
                    real: '倉庫の取引先は、初日から平日に人を入れてほしいと言っている',
                    why: 'coverage を「報道・補償」で覚えていると人員の話に結びつかない。ここでは「その時間帯を人でカバーできていること」。shift coverage / staff coverage で人繰りの話。',
                },
                {
                    en: 'they\'re just short on candidates this month',
                    lit: '彼らは今月、候補者について単に短い',
                    real: '今月は単に候補者が足りていないだけですね',
                    why: 'be short on ～ で「～が不足している」。short を「短い」で持っていると、人・金・時間が足りない意味に届かない。We\'re short on time. / short-staffed(人手不足) も同じ発想。',
                },
                {
                    en: 'Nothing moves forward until we talk to them.',
                    lit: '彼らと話すまで何も前に動かない',
                    real: '先方と話さない限り、この件は進みません',
                    why: '直訳でも意味は取れるが、これが会話の締めに置かれると「この件は保留」という決定の宣言になる。move forward は「話を進める・着手する」で、進捗会議の頻出語。',
                },
            ],
        },
        {
            key: 'p3-59-61',
            items: [
                {
                    en: 'I\'ve pulled three listings right beside the Wrenholt station.',
                    lit: '駅のすぐそばの3つのリスティングを引っぱった',
                    real: '駅のすぐ横の物件を3件見つくろいました',
                    why: 'listing は不動産・求人の「掲載されている案件」。pull は「(データベースから)引き出す・出してくる」で、後半の I\'ll pull the staffing costs も同じ使い方。どちらも日本語なら「用意する」に化ける。',
                },
                {
                    en: 'properties with dedicated lots',
                    lit: '献身的な区画を持つ物件',
                    real: '専用駐車場付きの物件',
                    why: 'dedicated は人について言えば「献身的」だが、設備に付くと「専用の」。a dedicated line(専用回線)、a dedicated coordinator(専任の担当)。lot も「くじ・たくさん」ではなく「区画・駐車場」。',
                },
                {
                    en: 'Square footage is honestly secondary.',
                    lit: '正直、平方フィート数は二番目だ',
                    real: '広さは正直、二の次でいいです',
                    why: 'square footage は床面積そのもの。数字ではなく「広さ」という概念を指す名詞。secondary は「二番目」ではなく「重要度が低い・後回し」で、優先順位を語る場面の定番。',
                },
                {
                    en: 'Ms. Haddad manages the showings.',
                    lit: 'ハダドさんが見せることを管理している',
                    real: '内見はハダドが担当しています',
                    why: 'showing が名詞で「物件の内見・下見」。show の動名詞に見えて意味が像を結ばない。この語が読めると、次の Thursday morning が「内見の予定」だと分かり、設問の答えが決まる。',
                },
            ],
        },
        {
            key: 'p3-62-64',
            items: [
                {
                    en: 'My director asked me to add one item, though.',
                    lit: 'ディレクターは私に1品追加するよう頼んだ、けれども',
                    real: 'ただ、上司から1品追加してくれと言われていて',
                    why: '文末の though は「けれども」を後ろから足す口語。although のように文をつなぐのではなく、直前の合意にちょっと留保を付ける合図。ここを落とすと、話が肯定のまま流れて追加注文の話だと気づけない。',
                },
                {
                    en: 'That\'s an extra charge per guest on top of the buffet rate.',
                    lit: 'それはビュッフェ料金の上の、ゲストごとの追加料金だ',
                    real: 'それはビュッフェ料金に上乗せで、1名につき追加料金がかかります',
                    why: 'on top of は「～に加えて」。物理的に上に乗る意味から来ているが、料金・仕事量で使うと純粋に「上乗せ」。rate も「率」ではなく「単価・料金」。図表問題ではこの2語が計算の指示そのものになる。',
                },
                {
                    en: 'She had it at a conference last spring and hasn\'t stopped talking about it.',
                    lit: '彼女は会議でそれを持ち、それについて話すのをやめていない',
                    real: '上司が去年の会議で食べて、それ以来ずっと絶賛してるんです',
                    why: 'have は食べ物に付くと「食べる・飲む」。haven\'t stopped ～ing は「ずっと～し続けている」という誇張表現で、批判ではなく気に入っている合図。直訳すると文句を言っているように読めてしまう。',
                },
                {
                    en: 'I\'ll have it to you within the hour.',
                    lit: '1時間以内にそれをあなたへ持つ',
                    real: '1時間以内にお送りします',
                    why: 'have it to 人 で「人のところへ届ける」。send の言い換えだが動詞が have なので、送る動作が文の中に見当たらない。get it to you / have it over to you も同じ。',
                },
            ],
        },
        {
            key: 'p3-65-67',
            items: [
                {
                    en: 'the quarterly channel numbers are in',
                    lit: '四半期のチャンネル番号が中にある',
                    real: '販路別の四半期の数字が出そろいました',
                    why: 'be in は「届いた・出そろった」。The results are in. で「結果が出た」。numbers も電話番号ではなく「数字・実績」。channel は「販売経路」で、テレビのチャンネルではない。3語まとめて業務語に切り替わる。',
                },
                {
                    en: 'Anything jump out at you?',
                    lit: '何かあなたに飛び出してくるか',
                    real: '何か気になるところ、ありました?',
                    why: 'jump out at 人 は「目に飛び込んでくる・引っかかる」。資料を見せて感想を聞く定番の言い方。直訳すると物騒だが、実際は Anything interesting? くらいの軽さ。',
                },
                {
                    en: 'before she signs off on pulling out',
                    lit: '彼女が引き抜くことにサインオフする前に',
                    real: '彼女が撤退を承認する前に',
                    why: 'sign off on ～ で「～を正式に承認する」。sign(署名)と off(離れる)を足しても出てこない。pull out も「引き抜く」ではなく「手を引く・撤退する」で、この会話全体の争点。',
                },
                {
                    en: 'we could put those two people behind the cafe counter instead',
                    lit: '代わりにその2人をカフェのカウンターの後ろに置ける',
                    real: '代わりにその2人をカフェの店頭に回せますよね',
                    why: 'put 人 + 場所 は「人を配置する」。behind the counter は「カウンターの裏=接客する側」で、隠れている意味ではない。人員配置の話では put / move / pull がそのまま「回す・外す」になる。',
                },
            ],
        },
        {
            key: 'p3-68-70',
            items: [
                {
                    en: 'my line lead flagged it after the audit',
                    lit: 'ラインのリードが監査の後にそれに旗を立てた',
                    real: '監査のあと、うちのライン責任者から指摘されたんです',
                    why: 'flag が動詞で「印をつける・問題として挙げる」。旗のイメージは残っているが、日本語に「旗を立てる」という言い方が無いので直訳が通らない。flag an issue / flag a concern は会議の頻出語。',
                },
                {
                    en: 'my hours carry over',
                    lit: '私の時間が運び越える',
                    real: '受講時間はそのまま持ち越せます',
                    why: 'carry over は「(残った分が)次に繰り越される」。有給・ポイント・在庫でも使う。ここでは前の工場で取った研修時間が今の職場でも有効、という意味で、これが分かると次の「書類が要る」に自然につながる。',
                },
                {
                    en: 'the registrar won\'t credit them',
                    lit: '登録係が彼らをクレジットしない',
                    real: '登録係が受講済みとして認めてくれません',
                    why: 'credit が動詞で「(実績として)認定する・加算する」。カードのクレジットとは別の顔。大学の「単位(credit)」と同じ発想で、こなした分を帳簿に付けるイメージ。them は人ではなく hours を指している。',
                },
                {
                    en: 'I\'ll dig it out tonight and drop it at your desk.',
                    lit: '今夜それを掘り出して、あなたの机に落とす',
                    real: '今夜探し出して、明日机に置いておきます',
                    why: 'dig out は「奥から探し出す」、drop は「(立ち寄って)置いていく」。どちらも物理的な動作を思い浮かべると乱暴に聞こえるが、日常の「探しておく」「置いとく」に当たる軽い言い方。',
                },
            ],
        },

        // ================= PART 4 =================
        {
            key: 'p4-71-73',
            items: [
                {
                    en: 'ready to help you tackle your outdoor projects',
                    lit: 'あなたが屋外プロジェクトにタックルするのを手伝う準備がある',
                    real: '庭仕事に取りかかるお手伝いをします',
                    why: 'tackle はラグビーの当たりから離れて「面倒な課題に取りかかる」。tackle a problem / tackle a project。日本語の「タックル」に体当たりの意味しか無いので、仕事の文脈で急に出ると止まる。',
                },
                {
                    en: 'every garden tool in our Pinnerton store is marked down thirty percent',
                    lit: 'すべての園芸用具が30パーセント下に印される',
                    real: '園芸用品はすべて30パーセント引きです',
                    why: 'mark down は「値下げする」。値札(mark)を書き下げるところから来ている。逆は mark up(値上げ)。広告の Part 4 では discount の言い換えとして必ずどこかに出る。',
                },
                {
                    en: 'will sketch a planting plan for your yard at no charge',
                    lit: '無料であなたの庭のための植栽計画をスケッチする',
                    real: '庭の植栽プランを無料で描いてくれます',
                    why: 'at no charge = 無料。charge を「チャージ(充電・突撃)」で覚えていると読めない。free of charge / at no cost / complimentary はすべて同義で、設問の選択肢では free of charge に化ける。',
                },
                {
                    en: 'Stop by this weekend and see for yourself.',
                    lit: '今週末に立ち止まって、自分自身のために見て',
                    real: '今週末ぜひお立ち寄りください。ご自分の目で確かめてみてください',
                    why: 'stop by は「ちょっと寄る」で、立ち止まる意味ではない。see for yourself も「自分のために見る」ではなく「自分の目で確かめる」。広告の締めの決まり文句。',
                },
            ],
        },
        {
            key: 'p4-74-76',
            items: [
                {
                    en: 'our ballroom, which seats forty rather than twenty-five',
                    lit: '25ではなく40を座らせる我々の大広間',
                    real: '25人ではなく40人入る大広間',
                    why: 'seat が動詞で「～人を収容できる」。主語は部屋・会場で、人ではない。The theater seats 500. のように言う。名詞の「座席」しか持っていないと、この関係代名詞節の動詞が見つからない。',
                },
                {
                    en: 'To collect an outstanding payment',
                    lit: '傑出した支払いを集めるため',
                    real: '未払いの代金を回収するため',
                    why: 'outstanding は褒め言葉の「優れた」と、金銭の「未払いの・未処理の」で意味がまったく違う。請求・残高の話に出たら後者。an outstanding balance / outstanding invoices。選択肢に紛れ込むと差がつく語。',
                },
                {
                    en: 'Please call me back by five o\'clock to confirm.',
                    lit: '確認するために5時までに私を呼び戻して',
                    real: '5時までに折り返しお電話ください',
                    why: 'call 人 back は「折り返し電話する」。back を「戻す」で処理すると人を呼び返す絵になる。設問の選択肢は Return a phone call と言い換えられるので、この対応を知らないと選べない。',
                },
                {
                    en: 'Your assistant mentioned that you had planned to rent one.',
                    lit: 'あなたのアシスタントはあなたが1つ借りる計画だったと言及した',
                    real: 'アシスタントの方から、1台借りる予定だったと伺っています',
                    why: 'mention は「言及する」だと硬い。実際は「～と言っていた」程度の軽い伝達。had planned と過去完了なので「借りるつもりだったが、その必要が無くなる」という含みが出ていて、これが意図問題の根拠になる。',
                },
            ],
        },
        {
            key: 'p4-77-79',
            items: [
                {
                    en: 'expect the finished track to cut travel times by roughly eight minutes',
                    lit: '完成した線路が移動時間をおよそ8分によって切ると予期する',
                    real: '線路が完成すれば所要時間が8分ほど短くなる見込みだ',
                    why: 'cut ～ by X の by は「Xだけ・Xぶん」という差分。to X(Xまで)と混同すると数字を正反対に読む。increase by 10% は「10%増える」、increase to 10% は「10%まで上がる」。数値問題の生死を分ける。',
                },
                {
                    en: 'will close for track work beginning Monday',
                    lit: '月曜を始める線路工事のために閉鎖する',
                    real: '月曜から線路工事のため運休する',
                    why: 'beginning + 日付は「その日から」。分詞が前置詞のように働いていて、主語も動詞も無い。starting Monday / effective Monday も同じ形で、告知文の頻出パターン。',
                },
                {
                    en: "riders can track the shuttles on the authority's mobile application",
                    lit: '乗客はアプリでシャトルを線路できる',
                    real: '乗客はアプリでシャトルの現在地を追える',
                    why: '同じ文章の中で track が2回、別の顔で出てくる。track work は名詞の「線路」、track the shuttles は動詞の「追跡する」。品詞が変われば意味も変わる、を試してくる作り。',
                },
                {
                    en: 'We\'ll hear from the project engineer after the weather.',
                    lit: '天気の後で技師から聞くだろう',
                    real: 'お天気コーナーのあと、工事の担当技師にお話を伺います',
                    why: 'ラジオ番組の中の the weather は「天気予報のコーナー」。定冠詞が付いて番組の一区切りを指している。hear from 人 は「人から話を聞く・便りをもらう」で、hear about(～について聞く)とは別。',
                },
            ],
        },
        {
            key: 'p4-80-82',
            items: [
                {
                    en: 'I\'d like each of you to walk your staff through the new procedure.',
                    lit: '皆さんに新しい手順を通してスタッフを歩かせてほしい',
                    real: '各自、新しい手順をスタッフに一通り説明してください',
                    why: 'walk 人 through ～ は「手順を最初から最後まで案内して説明する」。歩かせる意味は残っていない。会社で最も使われる言い回しの一つで、これが分かると設問の Brief their staff members に即つながる。',
                },
                {
                    en: 'Let\'s turn to the last item.',
                    lit: '最後の品目に向きを変えよう',
                    real: '最後の議題に移ります',
                    why: 'turn to は「(話題・ページ)に移る」。item は「品物」ではなく議題の「項目」。会議の冒頭で聞こえたら、これから何番目の話に入るかの合図で、話の切れ目そのもの。',
                },
                {
                    en: 'Even so, visitors waited nearly forty minutes to get inside.',
                    lit: 'そうであっても、来場者は中に入るのに40分近く待った',
                    real: 'それでも、来場者は入場までに40分近く待たされました',
                    why: 'Even so は前の文を認めた上で「それでも」と逆に振る。直前が「売上は過去最高」という良い話なので、ここで問題提起に切り替わる。意図問題は、この転換点に置かれた文を狙って出題される。',
                },
                {
                    en: 'Bring me any questions your team raises at Friday\'s briefing.',
                    lit: '金曜の説明会でチームが上げるどんな質問も私に持ってきて',
                    real: 'チームから出た質問は金曜の打ち合わせで持ってきてください',
                    why: 'raise a question は「疑問を出す・提起する」。上げる意味は残っているが、日本語で「質問を上げる」とは言わないので、raise の目的語が抽象名詞になると急に読めなくなる。raise a concern / raise an issue も同じ。',
                },
            ],
        },
        {
            key: 'p4-83-85',
            items: [
                {
                    en: 'prescriptions will be filled at the temporary window',
                    lit: '処方箋は仮設の窓で満たされる',
                    real: '処方薬は臨時の窓口でお渡しします',
                    why: 'fill a prescription は「処方箋どおりに薬を用意して渡す」。fill を「満たす」で処理すると何が起きているか分からない。薬局の話でこの語が出たら「調剤する」。refill なら「追加で出してもらう」。',
                },
                {
                    en: 'we recommend ordering refills through our website',
                    lit: 'ウェブサイトでおかわりを注文することを勧める',
                    real: '薬の追加分はサイトからご注文ください',
                    why: 'refill は飲食店の「おかわり」で入ってきているが、薬局では「同じ処方の追加調剤」。カタカナの意味が定着している語ほど、業種が変わったときに崩れる。',
                },
                {
                    en: 'Wait times may run longer than usual.',
                    lit: '待ち時間がいつもより長く走るかもしれない',
                    real: '待ち時間がいつもより長くなる可能性があります',
                    why: 'run + 形容詞で「～の状態になる・～に振れる」。run late(遅れ気味)、run high(高止まりする)。go quiet と同じ「変化を表す動詞」の仲間で、be の代わりに置かれている。',
                },
                {
                    en: 'Thank you for your patience during the renovation.',
                    lit: '改装中のあなたの忍耐に感謝します',
                    real: '工事中はご不便をおかけします',
                    why: '直訳すると「我慢してくれてありがとう」で恩着せがましいが、英語では最後に置くただの定型のお詫び。まだ我慢していない相手にも先に言う。日本語の「ご迷惑をおかけします」の位置にある表現。',
                },
            ],
        },
        {
            key: 'p4-86-88',
            items: [
                {
                    en: 'the area is wider than your original quote allowed for',
                    lit: '面積は元の見積もりが許したより広い',
                    real: '面積が、最初の見積もりで見込んでいたより広いんです',
                    why: 'allow for ～ は「～を見込んでおく・織り込む」。allow(許す)からは出てこない意味。予算・時間・誤差に対して使い、allow for delays(遅れを見込む)が典型。ここが読めないと追加費用の理由がつかめない。',
                },
                {
                    en: 'which adds roughly two hundred pounds to the total',
                    lit: '合計におよそ200ポンドの重さを加える',
                    real: '総額が200ポンドほど増えます',
                    why: 'pounds は重さと通貨が同じ綴り。石材の話なので重量に見えるが、the total(合計金額)に足しているので通貨。文脈のどちらに足しているかで決める。',
                },
                {
                    en: 'I\'d rather not order anything until you\'ve approved the revised amount.',
                    lit: '修正額をあなたが承認するまで、私はむしろ何も注文しない',
                    real: '金額をご承認いただくまでは、発注は控えておきます',
                    why: 'would rather not は「～しないでおきたい」という、やわらかいが明確な保留。can\'t より弱く、don\'t want to より丁寧。この一文が「承認してほしい」という依頼そのものになっていて、設問の答えになる。',
                },
                {
                    en: 'so we can keep Thursday\'s start date',
                    lit: '木曜の開始日を保てるように',
                    real: '木曜着工の予定を変えずに済むように',
                    why: 'keep a date は「その日程を維持する=予定どおりやる」。「日付を保つ」だと何のことか分からない。反対は push back / move。締切前に折り返しがほしい理由がここに書いてある。',
                },
            ],
        },
        {
            key: 'p4-89-91',
            items: [
                {
                    en: 'the switch should trim energy costs by nearly a fifth',
                    lit: '切り替えはエネルギー費を5分の1近くによって整える',
                    real: 'この切り替えで電力コストが2割近く下がる見込みだ',
                    why: 'trim は「(髪を)整える」から「削減する」へ。cut より上品な語で、報道でよく使う。a fifth は分数の「5分の1」で、a fifth of ～ の of 以下が省かれている。by は差分。3つ重なっていて崩れやすい一文。',
                },
                {
                    en: 'without cutting any of the four hundred jobs at the site',
                    lit: '現場の400の仕事のどれも切らずに',
                    real: '現場の400人の雇用を1人も減らさずに',
                    why: 'job は「作業」ではなく雇用の「一人分のポスト」。cut jobs は人員削減。日本語の「仕事を切る」は案件を断る意味になるので、まったく別の話に読める。',
                },
                {
                    en: 'Suppliers in the region have already been invited to submit bids for the new contracts.',
                    lit: '供給業者はすでに入札を提出するよう招待されている',
                    real: '地域の業者にはすでに入札への参加が呼びかけられている',
                    why: 'invite を「招待する」で持っていると、パーティーの絵が浮かんで話が止まる。ビジネスの invite は「(応募・提案を)募る」。invite applications / invite feedback も同じで、招待状は出ていない。',
                },
                {
                    en: "Full details are posted on our station's Web site under the Business tab.",
                    lit: 'ビジネスタブの下に詳細が掲示されている',
                    real: '詳細は当局サイトのビジネス欄に掲載しています',
                    why: 'under + 見出し名で「その項目のところに」。物理的な上下ではなく分類。under the heading / filed under ～ も同じ。post も「郵送する」ではなく「(サイトに)載せる」。',
                },
            ],
        },
        {
            key: 'p4-92-94',
            items: [
                {
                    en: 'Running a cafe means your bread arrives at six in the morning.',
                    lit: 'カフェを走ることはパンが朝6時に届くことを意味する',
                    real: 'カフェをやっていれば、パンは朝6時に届いてほしいはずです',
                    why: 'run は「経営する・運営する」。run a business / run a department。走る意味を外せるかどうかで、ビジネス文の読み速度が変わる。ここでは動名詞で主語になっている。',
                },
                {
                    en: 'our ovens only hold so much',
                    lit: '我々のオーブンはそんなに多くだけを保持する',
                    real: 'うちの窯に入る量には限りがあるんです',
                    why: 'only so much は「限りがある」という決まり文句。so much を「そんなに多く」と量の多さで読むと逆の意味になる。There\'s only so much I can do.(できることには限界がある)が典型。hold は「収容する」。',
                },
                {
                    en: 'We take fifteen wholesale accounts a season.',
                    lit: '1シーズンに15の卸売口座を取る',
                    real: '卸のお取引先は1シーズン15社までとしています',
                    why: 'account は銀行口座だけでなく「取引先・顧客企業」。営業の話で account manager と言えば「担当顧客を持つ営業」。take も「取る」ではなく「受け入れる」。',
                },
                {
                    en: 'four are still open for autumn',
                    lit: '4つは秋のためにまだ開いている',
                    real: '秋の枠はまだ4社ぶん空いています',
                    why: 'open は「開店している」ではなく「空きがある・未定である」。The position is still open.(その職はまだ募集中)と同じ。数字+ open で「残り枠」を表すのが広告の型。',
                },
            ],
        },
        {
            key: 'p4-95-97',
            items: [
                {
                    en: 'One rule before we set out.',
                    lit: '我々が外に置く前に1つのルール',
                    real: '出発する前に1つだけお願いがあります',
                    why: 'set out は「出発する」。set(置く)と out(外)からは出てこない。同じ形で set out to do なら「～しようと乗り出す」。ツアーガイドの冒頭で聞こえたら、これから歩き始める合図。',
                },
                {
                    en: 'bags may not be carried past the front desk',
                    lit: 'バッグは受付を過ぎて運ばれないかもしれない',
                    real: '受付から先へバッグを持ち込むことはできません',
                    why: 'may not は「～しないかもしれない」ではなく、掲示・規則では「～してはいけない」という禁止。can\'t より硬い。past も「過去」ではなく前置詞「～より先へ」。この2つで禁止の一文になっている。',
                },
                {
                    en: 'how fragile paper is kept from crumbling',
                    lit: 'もろい紙がぼろぼろになることから保たれる方法',
                    real: 'もろくなった紙をどうやって崩れないように保っているか',
                    why: 'keep A from B で「AがBしないようにする」。from が「～から離して」の否定の働きをしている。prevent A from B / stop A from B と同じ形で、from の後ろは必ず -ing。',
                },
                {
                    en: 'we\'ll finish with tea by the water',
                    lit: '水のそばで紅茶と一緒に終える',
                    real: '最後は水辺でお茶にします',
                    why: 'finish with ～ は「～で締めくくる」。「～と一緒に終える」だと同時に終わる感じになる。設問の Have some refreshments(軽い飲食をする)への言い換えを踏むには、tea が「お茶の時間」だと取れている必要がある。',
                },
            ],
        },
        {
            key: 'p4-98-100',
            items: [
                {
                    en: 'I want to point you toward the one on window displays.',
                    lit: '私はあなたをウィンドウ展示のそれの方へ指したい',
                    real: 'ウィンドウディスプレイの回にもぜひ出てほしいんです',
                    why: 'point 人 toward ～ で「～に注目させる・そちらへ導く」。指で差す意味から離れている。the one は前に出た session の代わりで、on ～ は「～についての」。3つ重なって主語も目的語も見えにくい一文。',
                },
                {
                    en: 'a good display sells more than any discount does',
                    lit: '良い展示はどんな割引がするより多く売る',
                    real: 'いい陳列は、どんな値引きよりも売上を伸ばします',
                    why: 'sell は「(店が)売る」だけでなく「(商品・仕掛けが)売れる/売上を出す」。物が主語に立つ。文末の does は sells の代わりに置いた代動詞で、これを訳そうとすると止まる。',
                },
                {
                    en: 'add your name to the sheet at the back',
                    lit: '後ろのシーツにあなたの名前を加えて',
                    real: '後ろにある用紙に名前を書いてください',
                    why: 'sheet はカタカナの「シーツ」が邪魔をする。ここは「1枚の紙・名簿」。sign-up sheet(申込用紙)、spreadsheet(表計算)の sheet と同じ。設問では Sign up on a list に言い換えられる。',
                },
                {
                    en: 'before you head to lunch',
                    lit: '昼食に頭を向ける前に',
                    real: '昼食に行く前に',
                    why: 'head が動詞で「～へ向かう」。head to / head for / head out。名詞の「頭」しか持っていないと、この節に動詞が無いように見える。会話でも go の代わりに常用される。',
                },
            ],
        },

        // ================= PART 5 =================
        {
            key: 'p5-101-105',
            items: [
                {
                    en: 'The revised delivery schedule proved acceptable to Mr. Ghanem.',
                    lit: '修正された配送日程がガネム氏に受け入れ可能だと証明した',
                    real: '修正後の配送日程は、ガネム氏には受け入れられるものだった',
                    why: 'prove は「証明する」だけでなく、自動詞で「～だと分かる・結果的に～である」。turn out とほぼ同じ。目的語が無いのに「証明する」と読むと文が成立しないので、後ろに形容詞が来ていたらこちら。',
                },
                {
                    en: 'credits its low turnover to the loyalty of its regional managers',
                    lit: '低い売上高を地域マネージャーの忠誠に信用する',
                    real: '離職率の低さは地域マネージャーの定着ぶりのおかげだとしている',
                    why: '2箇所つまずく。credit A to B は「AをBのおかげとする」(attribute の言い換え)。turnover は「総売上高」でもあるが、人事の文脈では「離職率・人の入れ替わり」。低いことを褒めているなら後者。',
                },
                {
                    en: 'Throughout the winter months, the winery offers guided tastings only on Saturdays.',
                    lit: '冬の月々を通り抜けて、土曜だけ試飲を提供する',
                    real: '冬の間はずっと、試飲は土曜のみです',
                    why: 'throughout は「その期間ずっと」で、期間の全体を覆う。through が「通り抜けて終わる」動きを含むのに対し、throughout は途切れなく続く状態。during より「終始」の色が強い。',
                },
                {
                    en: 'Ridgeworn Tools promptly notifies its authorized dealers by e-mail.',
                    lit: 'プロンプトに正規販売店にメールで通知する',
                    real: '正規販売店にすみやかにメールで通知します',
                    why: 'prompt はカタカナの「プロンプト(入力画面・指示文)」が定着してしまい、本来の「即座の」が出てこない。promptly = すぐに。a prompt reply(早い返信)、prompt payment(期日どおりの支払い)。',
                },
            ],
        },
        {
            key: 'p5-106-110',
            items: [
                {
                    en: 'Wystan Row Bistro earned praise for the creativity of its menu.',
                    lit: 'ビストロはメニューの創造性のために称賛を稼いだ',
                    real: 'ビストロはメニューの独創性で高く評価された',
                    why: 'earn は金を稼ぐ以外に「(評価・信頼を)得る」。earn praise / earn a reputation / earn trust。無生物が主語でも使える。「稼ぐ」で固定していると、金の話が出てこない文で止まる。',
                },
                {
                    en: 'to submit their expense forms before Friday afternoon',
                    lit: '金曜の午後より前に彼らの出費フォームを提出する',
                    real: '金曜の午後までに経費精算書を出す',
                    why: 'expense form / expense report は「経費精算の書類」。expense を「出費」で止めると、会社で毎月出すあの書類だと結びつかない。submit も「submit=服従」の語感を引きずらず、単に「提出する」。',
                },
                {
                    en: 'The auditors examined each purchase order issued by Skyfell Aerospace.',
                    lit: '監査人はスカイフェル社によって問題にされた各購入注文を調べた',
                    real: '監査人は同社が発行した発注書を1枚ずつ確認した',
                    why: 'issue は名詞の「問題・号」が強すぎて、動詞「発行する」に届かない。issue an invoice / issue a refund / issue a statement。purchase order は「発注書」で、実務では PO と略される一語。',
                },
                {
                    en: 'will extend the deadline once the client approves the revised layout',
                    lit: '一度クライアントが承認したら締切を延長する',
                    real: '先方が修正案を承認し次第、締切を延ばします',
                    why: 'この once も接続詞で「～したらすぐ」。回数の「一度」ではない。後ろに主語+動詞が続いていれば接続詞、単独で動詞を修飾していれば副詞、と形で切り分ける。',
                },
            ],
        },
        {
            key: 'p5-111-115',
            items: [
                {
                    en: 'Mr. Chaiyaporn moved into product testing following a brief assignment in customer support.',
                    lit: 'カスタマーサポートでの短い宿題に続いて、製品テストへ移った',
                    real: 'カスタマーサポートに短期間配属されたのち、製品テストに移った',
                    why: '2箇所ある。following は分詞ではなく前置詞で「～の後に」(after と同じ)。assignment は「宿題」ではなく「配属・任された仕事」。学校英語の訳のまま来ると、両方でつまずく。',
                },
                {
                    en: 'a full refund on any anchor chain priced above $150',
                    lit: '150ドル以上に値付けされたアンカーチェーンの上での全額返金',
                    real: '150ドルを超える錨鎖はすべて全額返金の対象です',
                    why: 'priced above ～ は過去分詞が後ろから名詞を修飾していて「～の値段が付いている」。動詞が2つあるように見える。on も「上に」ではなく「～について」で、a refund on ～ / a discount on ～ の on。',
                },
                {
                    en: 'Duneleigh Resort keeps its suites affordable for guests who book sixty days ahead.',
                    lit: '60日前に予約する客のために、スイートを手頃に保つ',
                    real: '60日以上前に予約したお客様には、スイートを手の届く価格で提供しています',
                    why: 'keep + 目的語 + 形容詞で「～を…の状態にしておく」。affordable は「afford できる=無理なく払える」で、「安い」ではなく「手が届く」。ahead は「前方に」ではなく時間の「前もって」。',
                },
                {
                    en: 'All crates unloaded at the depot receive a barcode within two hours.',
                    lit: 'すべての木箱は倉庫で荷降ろしされ、2時間以内にバーコードを受け取る',
                    real: '倉庫で荷降ろしされた木箱はすべて、2時間以内にバーコードが貼られる',
                    why: 'unloaded は過去分詞で crates を後ろから修飾しているだけで、文の動詞は receive。「荷降ろしされて、そして受け取る」と2つの動作に割ると主語が迷子になる。receive も「受け取る」より「付与される」。',
                },
            ],
        },
        {
            key: 'p5-116-120',
            items: [
                {
                    en: 'will continue as long as ridership remains above forty passengers per day',
                    lit: '乗客数が1日40人を超えて残る限り長く続く',
                    real: '1日の利用者が40人を上回っている間は運行を続けます',
                    why: 'as long as は「～する限り(条件)」であって、時間の長さの比較ではない。「～と同じくらい長い」と読むと文が壊れる。ridership は「利用者数」という一語で、rider(乗客)+ship(集合)。',
                },
                {
                    en: 'will compare this quarter\'s fuel costs with the figures reported last October',
                    lit: '今四半期の燃料費を昨年10月に報告された数字と比較する',
                    real: '今期の燃料費を、昨年10月の報告値と突き合わせる',
                    why: 'compare は前置詞まで含めて型が決まっている。compare A with B が「AとBを突き合わせる」、compare A to B は「AをBにたとえる」寄り。前置詞を落とすと Part 5 では即座に外れる。',
                },
                {
                    en: 'deliveries to Harrowgate Mills remain unavailable until Monday',
                    lit: '配送は月曜まで利用できないまま残る',
                    real: '月曜まで配送は停止したままです',
                    why: 'remain + 形容詞は「その状態が続いている」。「残る」で読むと物が残っている絵になる。stay / continue to be と同じ働きで、後ろは名詞ではなく形容詞。',
                },
                {
                    en: 'may skip Tuesday\'s orientation session entirely',
                    lit: '火曜のオリエンテーションを完全にスキップしてもよい',
                    real: '火曜のオリエンテーションはまるごと受けなくて構いません',
                    why: 'entirely を「完全に」で置くと、部分的にはやるのかという曖昧さが残る。ここは「一部ではなく全部を」の意味で、skip 全体にかかっている。文末の副詞1語が、義務の範囲を決めている。',
                },
            ],
        },
        {
            key: 'p5-121-125',
            items: [
                {
                    en: 'neither of them met the department\'s budget of £4,200',
                    lit: 'どちらも部門の4,200ポンドの予算に会わなかった',
                    real: 'どちらも部の予算4,200ポンドに収まらなかった',
                    why: 'meet は「会う」から「(基準・条件を)満たす」へ広がる。meet a budget / meet a deadline / meet the requirements。TOEIC で最も出る meet の顔はこちらで、人と会うほうではない。',
                },
                {
                    en: 'The committee has not yet determined who will oversee the second phase.',
                    lit: '委員会は誰が第2段階を見落とすかまだ決めていない',
                    real: '第2段階を誰が統括するかは、委員会でまだ決まっていない',
                    why: 'oversee は「監督する・統括する」。綴りの似た overlook が「見落とす・見過ごす」で、意味はほぼ正反対。over- が「上から全体を見る」なら oversee、「上を素通りする」なら overlook。',
                },
                {
                    en: 'will receive a complimentary admission to the rooftop lounge',
                    lit: '屋上ラウンジへの称賛的な入場を受け取る',
                    real: '屋上ラウンジの無料入場券がもらえます',
                    why: 'complimentary は compliment(褒める)と同じ顔をしているが、意味は「無料の・サービスの」。complimentary breakfast(朝食無料)。admission も「認めること」ではなく「入場(の権利)」で、ここでは数えられる名詞。',
                },
                {
                    en: 'a backup generator instead of the aging transformer',
                    lit: '年をとっている変圧器の代わりに予備の発電機',
                    real: '老朽化した変圧器に代えて、予備の発電機を',
                    why: 'aging は人以外に付くと「老朽化した」。an aging facility / an aging fleet。「高齢の」と訳すと機械が急に擬人化されて意味が濁る。instead of は前置詞で、後ろは名詞。',
                },
            ],
        },
        {
            key: 'p5-126-130',
            items: [
                {
                    en: 'The vendor agreed to waive the setup fee.',
                    lit: '業者は設定費用を振ることに同意した',
                    real: '業者が初期費用を免除することに応じた',
                    why: 'waive は「(権利・料金を)放棄する・免除する」。同じ発音の wave(手を振る)と混ざると意味が消える。waive a fee / waive a requirement は契約文の頻出語。',
                },
                {
                    en: 'provided that the contract is signed before the end of the quarter',
                    lit: '契約が四半期末までに署名されると提供されて',
                    real: '四半期末までに契約が締結されることを条件として',
                    why: 'provided that は接続詞のかたまりで「～という条件で」。provide(提供する)の受け身に見えるが、文の動詞ではない。providing that / on condition that も同じ。if より条件が強い。',
                },
                {
                    en: 'few of them arrived with the correct adapter',
                    lit: 'それらのうち少しが正しいアダプタ付きで届いた',
                    real: '正しいアダプタが付いていたものはほとんどなかった',
                    why: 'few は a が無いと否定「ほとんどない」。a few なら「少しはある」で肯定。40台注文したのに Although で始まっているので、否定に振れるのが自然。数えられない名詞なら little / a little で同じ関係。',
                },
                {
                    en: 'Access to the server room is restricted to employees who have completed the briefing.',
                    lit: 'サーバー室へのアクセスは説明会を修了した社員に制限されている',
                    real: 'サーバー室に入れるのは、説明会を受けた社員だけです',
                    why: 'be restricted to ～ の to が要る。日本語の「制限されている」には方向が無いので to を落としやすいが、英語は「その範囲まで絞る」と行き先を示す。be limited to / be confined to も同じ形。',
                },
            ],
        },

        // ================= PART 6 =================
        {
            key: 'p6-131-134',
            items: [
                {
                    en: 'Are you running out of room for your inventory?',
                    lit: '在庫のための部屋から走り出ていますか',
                    real: '在庫を置く場所が足りなくなっていませんか',
                    why: '2箇所ある。room は数えられない形で使うと「部屋」ではなく「余地・スペース」。run out of ～ は「～を切らす」。どちらも中学単語だが、組み合わさると直訳が完全に崩れる典型。',
                },
                {
                    en: 'Our staff will gladly help you select the size.',
                    lit: 'スタッフは喜んであなたがサイズを選ぶのを助ける',
                    real: 'サイズ選びはスタッフが喜んでお手伝いします',
                    why: 'gladly は広告で「喜んで～いたします」を表す定型の副詞。glad(うれしい)の副詞形だと分かっても、日本語の接客表現に結びつけないと自然に読めない。help 人 (to) do の to が落ちる形も要注意。',
                },
                {
                    en: 'customers who sign a full-year agreement pay nothing for their final two weeks',
                    lit: '1年契約に署名する客は最後の2週間のために何も払わない',
                    real: '年間契約なら、最後の2週間は無料になります',
                    why: 'pay nothing for ～ は「～の分はタダ」という値引きの言い方。英語は「払わない」と動作で言い、日本語は「無料」と状態で言う。広告ではこのズレが毎回出るので、pay nothing = free と読み替える癖をつける。',
                },
                {
                    en: 'Guided tours are available every weekday afternoon.',
                    lit: 'ガイド付きツアーが毎平日の午後に利用可能だ',
                    real: '施設のご案内は平日の午後に随時行っています',
                    why: 'available は「利用可能」で覚えると硬すぎて、日本語の告知として意味が入ってこない。物なら「ある・買える」、人なら「手が空いている」、サービスなら「やっています」。文脈ごとに訳語を変える語。',
                },
            ],
        },
        {
            key: 'p6-135-138',
            items: [
                {
                    en: 'Thank you for the order you placed last week.',
                    lit: '先週あなたが場所した注文をありがとう',
                    real: '先週はご注文ありがとうございました',
                    why: 'place an order で「注文する」。place を「置く」で処理しても「注文を置く」で止まる。ビジネス文の最頻出コロケーションのひとつで、place a bid / place an ad も同じ「正式に出す」。',
                },
                {
                    en: 'we will hold your trees at no cost until spring',
                    lit: '春まで無料であなたの木を持つ',
                    real: '春まで無料でお預かりしておきます',
                    why: 'hold は「(発送せずに)取り置く・保管する」。持ち上げる意味ではない。hold a room / hold a table / hold the line(電話を切らずに待つ) も同じ「そのままにしておく」。',
                },
                {
                    en: 'we have credited your account for the difference in shipping',
                    lit: '送料の違いのためにあなたの口座を信用した',
                    real: '送料の差額はお客様の勘定に返金処理しました',
                    why: 'credit が動詞で「(金を)入金する・返金として付ける」。名詞のクレジットカードから離れる。account は「アカウント」ではなく取引先としての「お客様の勘定」。difference は「差額」。3語すべて業務語。',
                },
                {
                    en: 'Young trees of this variety transplant best in spring.',
                    lit: 'この品種の若木は春に最もよく移植される',
                    real: 'この品種の苗木は、春に植え替えるのが一番よく育ちます',
                    why: 'transplant が自動詞で「(その木が)植え替えに耐える・うまく根付く」。受け身になっていないので「移植される」と訳すとズレる。The book sells well.(この本はよく売れる)と同じ、物が主語の自動詞。',
                },
            ],
        },
        {
            key: 'p6-139-142',
            items: [
                {
                    en: 'space for as many as twelve small shops',
                    lit: '12もの小さな店と同じくらい多くのためのスペース',
                    real: '最大12の小規模店舗が入るスペース',
                    why: 'as many as + 数 は「～もの」と数の多さを強調する型。比較の as ～ as に見えて、比べる相手を探すと止まる。数えられないものなら as much as、金額なら as high as。',
                },
                {
                    en: 'For two years, the hall has stood empty.',
                    lit: '2年間、ホールは空っぽで立っていた',
                    real: 'この2年、ホールは使われないままだった',
                    why: '2つある。stand + 形容詞は sit と同じで「その状態のままである」。そして期間の長さは For、起点は Since。two years は長さなので For。日本語の「2年間ずっと」には起点と長さの区別が無いので、ここを毎回落とす。',
                },
                {
                    en: 'a steady increase in foot traffic would help every business',
                    lit: '足の交通の着実な増加がすべてのビジネスを助ける',
                    real: '人通りが着実に増えれば、通りのどの店にも追い風になる',
                    why: 'foot traffic は「(店の前を通る)人通り・来客数」。traffic を車の「交通」で固定していると読めない。小売の話で必ず出る語で、web traffic(サイト訪問数)も同じ発想の traffic。',
                },
                {
                    en: 'the brick walls and tall windows will be repaired rather than replaced',
                    lit: 'レンガの壁は取り替えられるよりむしろ修理される',
                    real: 'レンガの壁は取り替えではなく補修する',
                    why: 'A rather than B は「BではなくA」。「むしろ」を入れると、Bもある程度やるように読めてしまうが、実際はBを否定してAだけを選んでいる。この一文が、文挿入問題で「新しくなるのは床と屋根だけ」を選ぶ根拠になる。',
                },
            ],
        },
        {
            key: 'p6-143-146',
            items: [
                {
                    en: 'Each session lasts about ninety minutes.',
                    lit: '各セッションは約90分を最後にする',
                    real: '各回とも所要時間は90分程度です',
                    why: 'last が動詞で「(時間が)続く」。形容詞の「最後の」しか持っていないと、この文に動詞が無いように見える。The meeting lasted two hours. のように目的語を取るように見える形も取る。',
                },
                {
                    en: 'covers the routine tasks you perform most often',
                    lit: '最も頻繁に行うルーティンな仕事を覆う',
                    real: '日常的にいちばんよく使う操作を扱います',
                    why: 'cover は「(内容として)扱う・網羅する」。研修・記事・保険で頻出。routine も「決まりきった(退屈な)」の悪い響きではなく、単に「日常の・通常業務の」。悪口だと思うと文脈がねじれる。',
                },
                {
                    en: 'Patient records will be transferred over the previous weekend.',
                    lit: '患者記録は前の週末を越えて移される',
                    real: '患者データは前の週末のうちに移行します',
                    why: 'over + 期間は「その期間のうちに」。「越えて」と読むと週末をまたいで先まで続く印象になるが、実際は週末の中で完結する。over the summer / over the holidays も同じ。',
                },
                {
                    en: 'all appointments will be booked through our new scheduling system',
                    lit: 'すべての約束が新しいスケジューリングシステムを通して本にされる',
                    real: '診療予約はすべて新しいシステムで取ることになります',
                    why: 'appointment は友人との「約束」ではなく、医療・美容・面談の「予約(時間枠を取ること)」。through は手段の「～を使って」。この文だけで、社内システムの話ではなく患者対応の話だと決まる。',
                },
            ],
        },

        // ================= PART 7 (single) =================
        {
            key: 'p7-147-148',
            items: [
                {
                    en: 'Payment is due 30 days from the invoice date.',
                    lit: '支払いは請求書の日付から30日のためだ',
                    real: 'お支払い期限は請求書発行日から30日以内です',
                    why: 'due は前置詞 to を伴わずに単独で使うと「期限が来ている」。due 30 日 のように日付を直に続けられる。請求書・課題・返却物の話で見たら、理由の due to ではない。',
                },
                {
                    en: 'Accounts settled within 10 days receive a 3 percent credit.',
                    lit: '10日以内に落ち着いた口座は3パーセントの信用を受け取る',
                    real: '10日以内に精算いただいた場合、次回請求から3パーセント差し引きます',
                    why: '3語すべてずれる。settle an account は「勘定を清算する=支払いを済ませる」。account は「請求勘定」。credit は「(次回に回せる)値引き分」で、カードでも信用でもない。この文が読めるかどうかで147が決まる。',
                },
                {
                    en: 'On-site service surcharge .... $95.00',
                    lit: 'オンサイトサービス追加料金',
                    real: '出張作業の追加料金',
                    why: 'on-site は「現場で・客先で」。この1語があるだけで「作業は客の場所で行われた」と確定し、148の根拠になる。請求明細の行は文になっていないぶん、単語1つが証拠として効く。',
                },
                {
                    en: 'Bill to: Ostervale Analytics',
                    lit: 'オスターベール社に請求書',
                    real: '請求先: オスターベール社',
                    why: 'bill が動詞で「～に請求する」。Bill to / Ship to は伝票の定型ラベルで、それぞれ請求先と配送先。名詞の「請求書」で読むと、to の後ろが宙に浮く。',
                },
            ],
        },
        {
            key: 'p7-149-150',
            items: [
                {
                    en: 'Their compressor won\'t start.',
                    lit: '彼らのコンプレッサーは始まらないだろう',
                    real: 'コンプレッサーが動かないんです',
                    why: 'won\'t は未来ではなく「どうしても～しない」という意志の否定。機械に使うと「動こうとしない=故障している」。The door won\'t open. / The car won\'t start. は今この瞬間の話で、未来の予測ではない。',
                },
                {
                    en: 'I\'ll drive to the depot and collect it myself.',
                    lit: '車で倉庫へ行って自分でそれを集める',
                    real: '私が車で倉庫まで行って、自分で取ってきます',
                    why: 'collect は「集める」より「引き取りに行く」。イギリス英語では pick up の代わりに常用される。myself も「自分自身」ではなく「(人に頼まず)自分で」という強調で、これが150の根拠。',
                },
                {
                    en: 'That would put us back on schedule.',
                    lit: 'それは我々をスケジュールの上に戻して置くだろう',
                    real: 'それなら予定どおりに戻せますね',
                    why: 'put ～ back on schedule で「遅れを取り戻して予定どおりにする」。on schedule が「予定どおり」というひとかたまりで、back がそこへ戻す動き。behind schedule(遅れている)、ahead of schedule(前倒し)とセット。',
                },
                {
                    en: 'let\'s move them to the ticket hall painting instead',
                    lit: '代わりに彼らを切符ホールの塗装へ動かそう',
                    real: '代わりに切符売り場の塗装のほうに回しましょう',
                    why: 'move 人 to 作業 で「担当を振り替える」。人を物理的に移動させる意味に見えるが、要は作業の割り当てを変える話。ここが読めると、149の「ペンキがまだ届いていない」が反論だと分かる。',
                },
            ],
        },
        {
            key: 'p7-151-153',
            items: [
                {
                    en: 'the east wing will close',
                    lit: '東の翼が閉じる',
                    real: '東棟が閉鎖される',
                    why: 'wing は建物では「棟・館」。翼のイメージから来ているが、日本語では「東棟」としか言わない。美術館・病院・空港の見取り図で必ず出る語で、the north wing / the new wing。',
                },
                {
                    en: 'we are extending Saturday guide shifts from four hours to six',
                    lit: '土曜のガイドの移動を4時間から6時間へ延ばす',
                    real: '土曜のガイドの担当時間を4時間から6時間に延ばします',
                    why: 'shift は「移動・変化」ではなく勤務の「シフト・担当時間帯」。次の文の take the longer shift も「長いほうのシフトに入る」で、take が「引き受ける」。日本語のカタカナ「シフト」と同じなのに、動詞と組むと急に読めなくなる。',
                },
                {
                    en: 'Please discard any copy dated before September.',
                    lit: '9月より前の日付のどんなコピーも捨ててください',
                    real: '9月より前の日付の地図は、1部残らず処分してください',
                    why: 'copy は「複製」ではなく、印刷物を数える単位「部」。two copies of the report は「報告書2部」で、コピー機で取ったものとは限らない。dated ～ は過去分詞で「～の日付が入った」。',
                },
                {
                    en: 'should tell the desk before 20 September',
                    lit: '9月20日より前に机に言うべきだ',
                    real: '9月20日までに受付に申し出てください',
                    why: 'the desk は家具ではなく「受付・窓口(そこにいる担当者)」。the front desk / the help desk の省略形。組織を場所や設備の名前で呼ぶ言い方(the office / the floor / the desk)は、慣れないと人だと分からない。',
                },
            ],
        },
        {
            key: 'p7-154-156',
            items: [
                {
                    en: 'Supervise a team of nine sales associates',
                    lit: '9人の販売関連者のチームを監督する',
                    real: '販売スタッフ9名のチームをまとめる',
                    why: 'associate は動詞の「関連づける」から離れて、名詞で「従業員・スタッフ」。小売業では店員を sales associate と呼ぶ。a business associate なら「仕事上の付き合いのある人」。',
                },
                {
                    en: 'Store Operations Lead',
                    lit: '店舗運営リード',
                    real: '店舗運営責任者',
                    why: 'lead が名詞で「責任者・主担当」。manager より軽く、team lead / project lead のように使う。動詞としてしか持っていないと、求人の職名が読めない。',
                },
                {
                    en: 'Salary is 34,000 pounds annually, with a review after six months.',
                    lit: '給与は年34,000ポンド、6か月後にレビュー付き',
                    real: '年俸34,000ポンド、6か月後に査定があります',
                    why: 'review はここでは「復習」でも「批評」でもなく、給与や勤務の「見直し・査定」。156の同義語問題が assessment(評価)を答えにしているのは、この意味を取れているかを試している。',
                },
                {
                    en: 'Availability on weekends during the summer season',
                    lit: '夏のシーズン中の週末の利用可能性',
                    real: '夏季は週末も勤務できること',
                    why: 'availability は人に使うと「勤務できる状態・空いている時間」。求人の要件欄にこれ1語で書かれると、名詞のまま訳しても条件だと分からない。面接でも What\'s your availability? は「いつなら働けますか」。',
                },
            ],
        },
        {
            key: 'p7-157-160',
            items: [
                {
                    en: 'Please confirm that the weekly rate of 430 euros still applies to a longer hire.',
                    lit: '週料金がより長い雇用にまだ適用されるか確認してください',
                    real: '期間を延ばしても週あたりの料金が据え置きか、ご確認ください',
                    why: 'hire は英で「レンタル・賃借」。人を雇う意味だけで持っていると、発電機の話に人事の語が紛れ込んだように見える。car hire(レンタカー)、for hire(貸出中)。apply to は「～に当てはまる」。',
                },
                {
                    en: 'the foundation work at Calverstoke has been pushed back',
                    lit: '基礎工事が押し戻された',
                    real: '基礎工事の時期が後ろにずれた',
                    why: 'push back は日程を「後ろ倒しにする」。物理的に押し返す意味ではない。前倒しの move up と対になる語で、この2つを取り違えると、なぜレンタル期間が2週から4週に伸びたのかがつながらない。',
                },
                {
                    en: 'after that the access road carries concrete traffic',
                    lit: 'その後、進入路はコンクリートの交通を運ぶ',
                    real: 'それ以降、進入路は生コン車の往来で埋まります',
                    why: '道が主語の carry は「(車両を)通す・往来を受け持つ」。traffic は「渋滞」ではなく「行き交う車両」。この一文が「午前中しか搬入できない」の理由になっていて、159の根拠。',
                },
                {
                    en: 'before our accounts office closes for the summer break',
                    lit: '我々の口座オフィスが夏休みで閉まる前に',
                    real: '経理部が夏季休業に入る前に',
                    why: 'accounts office / accounts department は「経理部」。account(勘定)の複数形が部署名になっている。accounting とも言うが、イギリス系の文書では accounts が普通。「アカウント」で読むと部署が消える。',
                },
            ],
        },
        {
            key: 'p7-161-162',
            items: [
                {
                    en: 'nothing covers the walkway across the courtyard',
                    lit: '中庭を横切る歩道を何も覆っていない',
                    real: '中庭の通路には屋根がありません',
                    why: 'cover は「屋根・ひさしがかかっている」。nothing が主語なので「何も覆っていない=屋根なし」。この一文だけが161の根拠で、雨具の話に気を取られると、屋外を通るという事実そのものを読み落とす。',
                },
                {
                    en: 'Do carry light coats if showers are forecast.',
                    lit: 'シャワーが予報されているなら、軽いコートを運んでください',
                    real: 'にわか雨の予報が出ていたら、薄手の上着をお持ちください',
                    why: '2つある。showers は浴室のシャワーではなく「にわか雨」。そして命令文の頭の Do は「ぜひ～してください」の強調で、疑問文でも否定でもない。Do let me know. / Do come in. も同じ。',
                },
                {
                    en: 'Guided walks are included with admission.',
                    lit: 'ガイド付きの歩行が入場に含まれる',
                    real: 'ガイドツアーは入場料に含まれています',
                    why: 'walk が名詞で「(歩いて回る)ツアー・散策」。a guided walk / a walking tour。動詞の「歩く」で処理すると、何が入場料に含まれるのか分からない。included with ～ の with は「～に付いてくる」。',
                },
                {
                    en: 'please write to me at least three days before the date you choose so that I can hold a walk',
                    lit: '私がツアーを持てるよう、3日前までに書いてください',
                    real: 'ツアーの枠を確保しますので、希望日の3日前までにご連絡ください',
                    why: 'hold はここでは「開催する」でもあり「(枠を)押さえておく」でもある。どちらに転んでも「予約を入れる」という結論は同じで、162の Give advance notice(事前に知らせる)につながる。write to 人 は「手紙・メールを出す」。',
                },
            ],
        },
        {
            key: 'p7-163-165',
            items: [
                {
                    en: 'A review of the branch lending targets that took effect in January.',
                    lit: '1月に効果を取った支店の貸付目標のレビュー',
                    real: '1月から適用されている支店の融資目標の振り返り',
                    why: 'take effect は「発効する・適用が始まる」。effect(効果)を取る、では意味が結ばない。法律・規則・料金改定の話で頻出。The new rate takes effect on 1 April. のように未来にも使う。',
                },
                {
                    en: 'Space is limited to twenty-four.',
                    lit: 'スペースは24に制限されている',
                    real: '定員は24名です',
                    why: 'space は「宇宙・空間」ではなく、ここでは「受け入れ枠・席数」。Space is limited. だけで「先着順・定員あり」の意味になる広告の定型。164の「全員は入れないかもしれない」はここだけが根拠。',
                },
                {
                    en: 'the lifts to the meeting rooms will not operate without one',
                    lit: '会議室へのリフトはそれ無しでは operate しない',
                    real: 'バッジが無いと会議室行きのエレベーターは動きません',
                    why: 'lift はイギリス英語の「エレベーター」。スキー場のリフトや持ち上げる動作のイメージだと、建物の中で急に出てきて戸惑う。one は a badge を受けていて、これが163の答えを決める。',
                },
                {
                    en: 'Hands-on practice with the reporting tool.',
                    lit: '報告ツールでの手を置いた練習',
                    real: '報告ツールを実際に触ってみる実習',
                    why: 'hands-on は「実際に手を動かす・実践型の」。座学(lecture)の対義語として研修の案内に必ず出る。だからこそ「ノートPCを持参」が続く。この語を飛ばすと持参物の理由が見えない。',
                },
            ],
        },
        {
            key: 'p7-166-167',
            items: [
                {
                    en: 'Mr. Kilic rang the building office himself.',
                    lit: 'キリッチ氏が自分でビル事務所を鳴らした',
                    real: 'キリッチさんが自分で管理事務所に電話してくれた',
                    why: 'ring はイギリス英語で「電話する」。call の代わりに使う。ベルが鳴る意味しか持っていないと、目的語に「事務所」が来た時点で崩れる。過去形が rang、give someone a ring なら「電話する」。',
                },
                {
                    en: 'I was quoted for thirty boxes and used forty-six.',
                    lit: '30箱を引用され、46箱を使った',
                    real: '見積もりは30箱だったのに、実際は46箱使った',
                    why: 'quote は「引用する」ではなく「見積もりを出す」。be quoted for ～ で「～という見積もりを提示される」。名詞の a quote も「見積書」で、この文の後に出る the final invoice との差額が167の答え。',
                },
                {
                    en: 'had the lift released in under ten minutes',
                    lit: '10分の下でリフトを解放させた',
                    real: '10分もかからずにエレベーターを使えるようにした',
                    why: 'in under ten minutes の under は「～未満」。in less than ten minutes と同じ。時間・金額に付く under / over は数の上下で、位置ではない。have + 目的語 + 過去分詞は「～させる」。',
                },
                {
                    en: 'The move itself was smooth. The paperwork was not.',
                    lit: '引っ越し自体は滑らかだった。書類仕事はそうではなかった',
                    real: '引っ越しそのものは問題なかった。ひどかったのは事務手続きのほうだ',
                    why: 'paperwork は「書類仕事」だけでなく、請求・契約を含む「事務手続き」全般。was not で終わる省略も、何が省かれたかを補えないと尻切れに読める。星4つで褒めながら最後に一撃を入れる、レビューの典型の締め方。',
                },
            ],
        },
        {
            key: 'p7-168-171',
            items: [
                {
                    en: 'The farm\'s produce cannot sit past ten.',
                    lit: '農場の生産は10を過ぎて座れない',
                    real: '農場の青果は10時を過ぎて置いておけない',
                    why: 'produce は動詞なら「生産する」だが、名詞になると「農産物・青果」。名詞では強勢が前の音節に移って「プロ」を強く読むので、音でも別語に聞こえる。sit は「置かれたままになる」、past ten は「10時を過ぎて」。3語で一文が別物になる。',
                },
                {
                    en: 'They would not commit.',
                    lit: '彼らはコミットしないだろう',
                    real: '先方ははっきり答えませんでした',
                    why: 'commit は「言質を与える・約束する」。カタカナの「コミットする(全力で取り組む)」とは別の顔。would not は過去の拒否で「どうしても～しなかった」。won\'t start と同じ意志の否定。',
                },
                {
                    en: 'Sennadale has three reefers idle.',
                    lit: 'セナデールは3台の冷凍車を怠惰に持っている',
                    real: 'セナデールには冷凍車が3台遊んでいます',
                    why: 'idle は人に使えば「怠けている」だが、設備に使うと「稼働していない・空いている」。sit idle も同じ。ここでは have + 目的語 + 形容詞で「3台が空いている状態を抱えている」。',
                },
                {
                    en: 'Thursday is already their long run.',
                    lit: '木曜はすでに彼らの長期だ',
                    real: '木曜はもともと向こうの長距離便の日なんです',
                    why: 'a long run は運送では「長距離の運行」。in the long run(長い目で見れば)という熟語が強いので、そちらに引っぱられると意味が通らなくなる。169の「木曜はもともと忙しい」の根拠。',
                },
                {
                    en: 'He owes me one.',
                    lit: '彼は私に1つ借りている',
                    real: 'あいつには貸しがあるんで',
                    why: 'owe 人 one で「借りが1つある」。one が何を指すかを探すと止まるが、これは a favor(頼みごと)の省略。170の意図問題は、この決まり文句を知っているかだけを聞いている。',
                },
            ],
        },
        {
            key: 'p7-172-175',
            items: [
                {
                    en: 'ridership fell to nine passengers a day, well under the twenty the hotel had planned for',
                    lit: '乗車数は1日9人に落ちた、ホテルが計画した20の十分下で',
                    real: '利用者は1日9人まで落ち、ホテルが見込んでいた20人を大きく下回った',
                    why: 'well は「良い」ではなく、前置詞の前に置いて「大きく・はるかに」と差を強める。well under / well above / well before。plan for ～ は「～を見込んでおく」で、allow for と同じ発想。',
                },
                {
                    en: 'traces the drop to a mismatch rather than a lack of interest',
                    lit: '関心の欠如よりむしろミスマッチへ落ち込みを追跡する',
                    real: '利用者減の原因は、需要不足ではなく時間の噛み合わせにあると見ている',
                    why: 'trace A to B は「Aの原因をBに突き止める」。追跡の trace から、原因をたどる用法へ広がる。credit A to B / attribute A to B と同じ「A の理由は B」の型で、to の後ろが原因。',
                },
                {
                    en: 'The van leaves on the hour, while the express trains leave at twenty past.',
                    lit: 'バンは時間の上に出発し、急行は20過ぎに出発する',
                    real: 'バンは毎時00分発、急行は毎時20分発だ',
                    why: 'on the hour は「毎正時(00分ちょうど)」。twenty past は past the hour の省略で「毎時20分」。時計の読み方の言い回しで、これを知らないと「20分過ぎ」が何の20分か決まらず、175の文挿入が解けない。',
                },
                {
                    en: 'she has asked the front desk to record boarding numbers for six weeks',
                    lit: 'フロントデスクに6週間の搭乗番号を記録するよう頼んだ',
                    real: 'フロントに、6週間ぶんの乗車人数を記録するよう依頼した',
                    why: 'boarding numbers は「便名や座席番号」ではなく「乗った人の数」。numbers を「番号」で取ると、何を記録しているのか分からなくなる。効果を測るために数える、という話の流れが決め手。',
                },
            ],
        },

        // ================= PART 7 (multiple) =================
        {
            key: 'p7-176-180',
            items: [
                {
                    en: 'Bookings of 25 or more guests receive a 10 percent reduction.',
                    lit: '25人以上の予約は10パーセントの削減を受け取る',
                    real: '25名以上のご予約は10パーセント割引になります',
                    why: 'reduction は値段の話では「割引」。discount の言い換えで、広告では両方が交互に出る。booking(予約という件)が主語で receive しているのも、日本語なら「予約者が受ける」と人に戻すところ。',
                },
                {
                    en: 'indicate whether a deposit must be paid before 25 October',
                    lit: '10月25日より前に預金が払われねばならないかを示す',
                    real: '10月25日までに手付金が必要かどうか、お知らせください',
                    why: 'deposit は「預金」ではなく、予約時に先に払う「手付金・保証金」。indicate も「示す」より「知らせる」で、please と組んで丁寧な依頼になる。180の設問はこの動詞をそのまま拾っている。',
                },
                {
                    en: 'Whichever package you choose, your booking includes room setup.',
                    lit: 'どちらのパッケージをあなたが選んでも、予約は部屋のセットアップを含む',
                    real: 'どのプランをお選びいただいても、会場設営は込みです',
                    why: 'Whichever ～ で始まる節は「どれを～しても」という譲歩。疑問詞に見えて疑問文ではない。No matter which に置き換えられる。この一文が176の「すべてに含まれるもの」の答えの位置。',
                },
                {
                    en: 'we do not need a breakout room',
                    lit: '我々は break out の部屋を必要としない',
                    real: '分科会用の別室は不要です',
                    why: 'breakout room は大人数の会議から分かれて議論する「分科会室」。break out(勃発する・脱出する)から想像すると物騒な部屋になる。Platinum にしか付かない設備なので、これを外すと179のプラン選びが決まる。',
                },
            ],
        },
        {
            key: 'p7-181-185',
            items: [
                {
                    en: 'frames carry a two-year guarantee',
                    lit: 'フレームは2年の保証を運ぶ',
                    real: 'フレームには2年保証が付きます',
                    why: 'carry は物が主語で「(特徴・条件を)備えている・付いている」。The product carries a warranty. / The job carries a risk.。運ぶ意味を外せるかどうかで、契約文の読み速度が変わる。',
                },
                {
                    en: 'Registration cannot be completed once that window closes.',
                    lit: 'その窓が閉じたら登録は完了できない',
                    real: 'その受付期間を過ぎると登録はできません',
                    why: 'window は「(何かができる)期間・機会」。a 30-day window / a booking window。182の同義語問題が period を答えにしているのはこの用法を試している。窓が閉まる、で絵にすると解けない。',
                },
                {
                    en: 'I meant to register the purchase online but let it slip until April.',
                    lit: '購入をオンライン登録するつもりだったが、4月までそれを滑らせた',
                    real: '登録するつもりだったのに、うっかりしてるうちに4月になった',
                    why: '2つある。mean to do は「～するつもりだった(が、しなかった)」で、過去形だと未遂の含み。let ～ slip は「うっかり逃す・忘れる」。どちらも本人の落ち度をやわらかく言う表現で、185の判断材料になる。',
                },
                {
                    en: 'We will issue a prepaid label the same day.',
                    lit: '同じ日に前払いのラベルを発行する',
                    real: '当日中に着払い不要の返送伝票をお送りします',
                    why: 'prepaid label は「送料を会社側が負担済みの返送用ラベル」。prepaid を「前払い」とだけ訳すと、客が払ったように読める。逆で、客は払わない。返品対応の定型で、183の褒めどころの前提。',
                },
            ],
        },
        {
            key: 'p7-186-190',
            items: [
                {
                    en: 'Participants who enrol in two or more workshops pay £25 less for each one.',
                    lit: '2つ以上に登録する参加者は各1つにつき25ポンド少なく払う',
                    real: '2講座以上申し込むと、1講座あたり25ポンド安くなります',
                    why: 'pay ～ less の less は「その額だけ安くなる」という差分。日本語は「25ポンド引き」と割引額で言うが、英語は「25ポンド少なく払う」と行為で言う。188の計算問題はここを取り違えると必ず外れる。',
                },
                {
                    en: 'Your place has been transferred automatically.',
                    lit: 'あなたの場所は自動的に移された',
                    real: 'お席はそのまま振り替え済みです',
                    why: 'place が「席・参加枠」。place an order の place(動詞)とも、場所とも違う顔。a place on the course(講座の受講枠)、take my place(私の代わりに入る)。枠が移った、なので何もしなくていい。',
                },
                {
                    en: 'no further action is needed unless you wish to withdraw',
                    lit: '引き出したくないなら、それ以上の行動は必要ない',
                    real: 'キャンセルをご希望でなければ、こちらでの手続きは不要です',
                    why: 'withdraw は金を「引き出す」だけでなく、申込・立候補を「取り下げる」。withdraw an application / withdraw from a course。further も「もっと遠く」ではなく「これ以上の・追加の」。',
                },
                {
                    en: 'Enrolment closes ten days before the workshop date.',
                    lit: '登録は開催日の10日前に閉じる',
                    real: '申込は開催日の10日前で締め切ります',
                    why: 'close は店が閉まるだけでなく、募集・受付が「締め切られる」。registration closes / applications close。11月2日の申込が19日の講座に間に合っている、という判定にこの一文が要る。',
                },
            ],
        },
        {
            key: 'p7-191-195',
            items: [
                {
                    en: 'Memberships renew on the anniversary of purchase.',
                    lit: '会員資格は購入の記念日に更新される',
                    real: '会員資格は加入した日と同じ月日に更新されます',
                    why: 'anniversary は結婚記念日のような祝い事ではなく、単に「1年後の同じ日付」。the anniversary of ～ で「～から1年経った日」。5月29日に更新される→加入も5月下旬、という192の推論はここだけが根拠。',
                },
                {
                    en: 'a parking space would be of no use to me',
                    lit: '駐車スペースは私にとって使用の無いものだろう',
                    real: '駐車場は私には要りません',
                    why: 'be of + 名詞 は形容詞と同じ働きをする。of no use = useless、of great value = very valuable。この形を知らないと of の後ろで止まる。仮定法の would は「あっても」という控えめな断り。',
                },
                {
                    en: 'Unlimited entry for two adults and up to three children',
                    lit: '大人2名と3人の子供までの無制限の入場',
                    real: '大人2名+子ども3名までが何度でも入場可',
                    why: 'up to ～ は「最大～まで」で、その数に届かなくてよい。「～まで上がる」ではない。料金表・条件表で最も多い表現のひとつで、194の「子どもも入れる等級か」の判定に効く。',
                },
                {
                    en: 'plus 15 percent off in the shop',
                    lit: 'さらにショップで15パーセント離れて',
                    real: 'さらに売店が15パーセント引き',
                    why: 'off が単独で「割引」を表す。20% off / $5 off。前置詞に見えて、ここでは値段から差し引く印を付けているだけ。請求書の -$5.18 がこの15%に当たると気づけるかが195の周辺。',
                },
            ],
        },
        {
            key: 'p7-196-200',
            items: [
                {
                    en: 'Tours depart Wednesday through Saturday.',
                    lit: '水曜から土曜を通り抜けて出発する',
                    real: 'ツアーは水曜から土曜まで出ています',
                    why: '曜日・日付に挟まれた through は「～まで(その日を含む)」。アメリカ英語の用法で、to だと最終日を含むか曖昧になるのを避けている。Monday through Friday は月曜も金曜も営業日。',
                },
                {
                    en: 'Group bookings may be rescheduled once at no charge.',
                    lit: '団体予約は一度、無料で予定変更されるかもしれない',
                    real: '団体予約は1回だけ無料で日程変更できます',
                    why: 'この once は回数の「1回だけ」。同じ once でも、後ろに主語+動詞が続けば接続詞「～したら」になる(p3-53 の Let me know once ～)。ここは動詞の後ろに単独で置かれているので回数。may は許可。',
                },
                {
                    en: 'both are keen to try the blending workshop',
                    lit: '両者はブレンド講習を試すことに鋭い',
                    real: '2人ともブレンド体験をやりたがっています',
                    why: 'be keen to do は「～したがっている」。keen(鋭い)から離れる。be eager to / be interested in と同じ。198の「特定の活動に関心がある」はこの語をそのまま言い換えたもの。',
                },
                {
                    en: 'Please confirm either way by Friday.',
                    lit: 'どちらの道でも金曜までに確認してください',
                    real: 'どちらになるにせよ、金曜までにご返事ください',
                    why: 'either way は「どちらに転んでも・いずれにしても」。way を「道」で読むと選択肢の道筋を探し始めてしまう。移動できてもできなくても連絡がほしい、という念押しで、ビジネスメールの締めの定番。',
                },
            ],
        },
    ],
};

export default TOEIC_BRIDGE_04;
