/**
 * BANK — Opening an Account / 銀行の口座開設と信用
 *
 * 来店 → 当座と普通 → 手数料と免除条件 → 最低残高 → 当座貸越 → 給与振込 →
 * カードの郵送 → ゼロから信用を作る → スコアと照会 → 送金 → 反映と営業日 →
 * 不正利用の申し立て → 帰り際。
 *
 * ここで払う金の大半は「聞かなかった」だけで発生する。
 * 手数料は免除条件を聞けば消える。信用は6か月かかるので、着いた週に始めるしかない。
 * 銀行の言葉は数字と日付で答えが返ってくるので、必ず数字と日付で聞き返す。
 */

import type { LifePhrase } from '../../lifeline-types';

export const BANK_BANK: LifePhrase[] = [

    // ---- 来店 ----
    { en: "Hi, are you being helped?", ja: 'ご案内は済んでいますか', note: '入店直後に声をかけられる。まだなら No, not yet. と返す' },
    { en: "I'd like to open an account.", ja: '口座を開きたいのですが', note: 'これだけ言えば担当者に回してもらえる' },
    { en: "Do you have an appointment?", ja: 'ご予約はありますか', note: '口座開設は予約制の支店が増えている。行く前に電話する' },
    { en: "It'll be about a twenty-minute wait.", ja: '20分ほどお待ちいただきます', note: '手続き自体も30分から1時間かかる。時間に余裕を持つ' },
    { en: "Have a seat and a banker will be right with you.", ja: 'おかけください。担当がすぐ参ります', note: '窓口係とは別で、席に座って話す担当者のこと' },
    { en: "What can I do for you today?", ja: '本日はどのようなご用件ですか', note: '用件を1文で言えるようにしておく' },
    { en: "I'll need two forms of ID.", ja: '身分証を2点お願いします', note: 'パスポートともう1点。1点だけで行くと出直しになる' },
    { en: "Do you have a Social Security number?", ja: '社会保障番号はお持ちですか', note: '無くても開ける銀行はある。ここで諦めない' },
    { en: "I don't have an SSN yet — can I still open an account?", ja: 'まだ番号がありません。それでも開けますか', note: '銀行ごとに答えが違う。断られたら次の銀行に行く' },
    { en: "I'll need proof of address.", ja: '住所の証明が必要です', note: '公共料金の請求書か賃貸契約書。渡米直後に一番詰まる関門' },
    { en: "Can I use my lease?", ja: '賃貸契約書でいいですか', note: '大抵通る。契約書は先に写真を撮っておく' },

    // ---- 当座と普通 ----
    { en: "Are you looking at checking or savings?", ja: '当座と普通、どちらをお考えですか', note: '当座は日常の出し入れ、普通は貯める側。役割が違う' },
    { en: "I'd like to open both.", ja: '両方開きたいです', note: '同時に開くと手数料が免除になる銀行が多い' },
    { en: "Checking is what you'd use day to day.", ja: '当座は日常の支払いに使う口座です', note: 'デビットカードが付くのはこちら' },
    { en: "Savings has a limit on withdrawals.", ja: '普通預金は引き出し回数に制限があります', note: '超えると手数料が取られる。知らないと毎月引かれる' },
    { en: "What's the interest rate on savings?", ja: '普通預金の金利は何パーセントですか', note: '大手はほぼゼロ。ネット銀行と数十倍の差がある' },
    { en: "It's currently point zero one percent.", ja: '現在0.01パーセントです', note: '実質ゼロという意味。ここで置き場所を考え直す' },
    { en: "You might want to look at a high-yield savings account.", ja: '高金利の普通預金も検討してください', note: '同じ銀行では扱っていないことが多い。別行に置く' },
    { en: "Is there a joint account option?", ja: '共同名義にできますか', note: '夫婦で1つの口座を持つ形。両方が自由に使える' },
    { en: "Both of you would need to be here to sign.", ja: 'お二人とも署名にお越しいただく必要があります', note: '片方だけでは開けない。同じ日に行く' },
    { en: "Can I add my spouse later?", ja: '後から配偶者を追加できますか', note: 'できるが再来店が必要。最初にまとめたほうが早い' },

    // ---- 手数料 ----
    { en: "There's a twelve-dollar monthly maintenance fee.", ja: '毎月12ドルの口座維持手数料がかかります', note: '何もしなくても引かれる。次の質問を必ずぶつける' },
    { en: "How do I get that waived?", ja: 'どうすれば免除になりますか', note: 'この一文で年間150ドル前後が変わる。絶対に聞く' },
    { en: "It's waived with direct deposit or a fifteen-hundred-dollar balance.", ja: '給与の自動振込か1500ドルの残高で免除です', note: 'どちらか1つ満たせばいい。給与振込のほうが簡単' },
    { en: "Is there a student account with no fee?", ja: '手数料のかからない学生口座はありますか', note: '学生や若い世代は無料の枠がある。名乗らないと出てこない' },
    { en: "Is there a fee if I use another bank's ATM?", ja: '他行のATMだと手数料はかかりますか', note: '両方の銀行から取られる。合わせて5ドル前後' },
    { en: "We reimburse up to three out-of-network ATM fees a month.", ja: '他行ATMの手数料は月3回まで返金します', note: '返ってくる分は使い切る。回数を覚えておく' },
    { en: "There's no fee for online transfers.", ja: 'オンラインの振替に手数料はかかりません', note: '同じ操作を窓口でやると取られることがある' },
    { en: "What are all the fees on this account?", ja: 'この口座の手数料を全部教えてください', note: '一覧の紙をもらう。口頭の説明だけで終わらせない' },
    { en: "It's all in the fee schedule.", ja: 'すべて手数料表に載っています', note: 'この紙は必ず持ち帰る。後で揉めたときの拠り所' },

    // ---- 最低残高 ----
    { en: "There's a twenty-five-dollar minimum to open.", ja: '開設には最低25ドル必要です', note: 'その場で入金する。現金かカードを持って行く' },
    { en: "You need to keep a minimum daily balance.", ja: '毎日の最低残高を保つ必要があります', note: '一日でも下回ると翌月に手数料が出る' },
    { en: "Is it a daily minimum or an average?", ja: '毎日の最低額ですか、平均ですか', note: '平均なら一時的に下がっても大丈夫。差はかなり大きい' },
    { en: "What happens if I drop below?", ja: '下回るとどうなりますか', note: '罰金の額を先に確認しておく' },
    { en: "Can I get an alert when it gets low?", ja: '残高が減ったら通知をもらえますか', note: '無料で設定できる。これだけで手数料はほぼ防げる' },

    // ---- 当座貸越 ----
    { en: "Do you want overdraft protection?", ja: '当座貸越の保護を付けますか', note: '意味を分からずに Yes と言うと一番損をする項目' },
    { en: "What does it cost if I overdraft?", ja: '残高不足になるといくらかかりますか', note: '1回35ドル前後。1日に何度も取られることがある' },
    { en: "It's thirty-five dollars per item, up to three a day.", ja: '1件35ドル、1日3件までです', note: '買い物1件ごとに取られるという意味。合計は跳ね上がる' },
    { en: "I'd rather have the card just decline.", ja: 'それなら決済が通らないほうがいいです', note: '断れば手数料は発生しない。これが一番安い選択' },
    { en: "You can link your savings to cover it.", ja: '普通預金と紐づけて補填できます', note: '手数料はゼロか少額。一番現実的な設定' },
    { en: "We'll charge a ten-dollar transfer fee.", ja: '振替手数料として10ドルいただきます', note: 'それでも35ドルよりはるかに安い' },
    { en: "Can you refund that fee this once?", ja: '今回だけ手数料を返してもらえますか', note: '頼めば1回は消してくれることが多い。黙っていると損する' },
    { en: "I can do a one-time courtesy refund.", ja: '今回に限り返金します', note: '好意による返金という扱い。年1回程度なら通る' },

    // ---- 給与振込 ----
    { en: "Do you have direct deposit set up?", ja: '給与の自動振込は設定済みですか', note: '手数料免除の一番簡単な条件。着任したらすぐやる' },
    { en: "I'll print your routing and account numbers.", ja: '支店番号と口座番号を印刷します', note: '職場に出す2つの番号。写真で保存しておく' },
    { en: "Give this form to your employer.", ja: 'この用紙を勤務先に渡してください', note: '人事に出すだけ。自分で設定するものではない' },
    { en: "A voided check works too.", ja: '無効にした小切手でも構いません', note: '小切手に大きく void と書いて渡す方法' },
    { en: "It usually takes one or two pay cycles.", ja: '反映まで1、2回の給与サイクルかかります', note: 'すぐには切り替わらない。前の口座はしばらく残す' },
    { en: "Can I split it between two accounts?", ja: '2つの口座に分けられますか', note: '貯金が自動で貯まる。一番効く設定' },
    { en: "Direct deposit hits two days early with us.", ja: '当行なら給与が2日早く入ります', note: '銀行を選ぶ理由になる売り文句。本当に2日早い' },

    // ---- カードと小切手 ----
    { en: "Your debit card will arrive in seven to ten business days.", ja: 'デビットカードは7から10営業日で届きます', note: '営業日なので土日祝は数えない。実際は2週間見る' },
    { en: "Can I get a temporary card today?", ja: '今日仮のカードをもらえますか', note: '即日発行できる支店がある。聞く価値は必ずある' },
    { en: "You'll get the PIN in a separate envelope.", ja: '暗証番号は別便で届きます', note: '封筒が2通届く。片方を広告と間違えて捨てない' },
    { en: "Call the number on the sticker to activate it.", ja: 'シールの番号に電話して有効化してください', note: 'これをやらないとカードは使えない' },
    { en: "Do I need checks?", ja: '小切手は必要ですか', note: '家賃や学校への支払いで今も要ることがある' },
    { en: "Your first box of checks is free.", ja: '最初の1箱は無料です', note: '頼まないともらえない。その場で頼む' },
    { en: "Can I set a daily spending limit?", ja: '1日の利用上限を設定できますか', note: '不正利用に遭ったときの被害を小さくできる' },
    { en: "Let me know before you travel.", ja: '旅行の前にご連絡ください', note: '連絡しないと旅先でカードが止まる' },

    // ---- 信用をゼロから作る ----
    { en: "I have no credit history here.", ja: 'こちらでの信用履歴がありません', note: '渡米直後は全員これ。引け目を感じる必要はない' },
    { en: "Being new to the country doesn't count against you.", ja: '移住したてであること自体は不利になりません', note: '悪い評価ではなく、単に何も無い状態' },
    { en: "Your credit from back home doesn't transfer.", ja: '母国の信用情報は引き継がれません', note: '何十年の実績もここではゼロから' },
    { en: "You'll want to build credit before you rent or buy.", ja: '賃貸や購入の前に信用を作っておくといいです', note: '家探しで必ず見られる。逆算して動く' },
    { en: "How long does it take to build a score?", ja: 'スコアができるまでどれくらいかかりますか', note: '半年ほど。着いた週に始めないと家探しに間に合わない' },
    { en: "You need six months of activity before a score generates.", ja: 'スコアが出るには6か月の利用実績が必要です', note: '何もしない6か月はそのまま無駄になる' },
    { en: "Start with a secured card.", ja: '担保付きカードから始めてください', note: '履歴ゼロでも必ず作れる。最初の一手はこれ' },
    { en: "You put down a deposit and that becomes your limit.", ja: '保証金を預け、それが利用枠になります', note: '300ドル預ければ枠は300ドル。借金ではない' },
    { en: "Do I get the deposit back?", ja: '保証金は返ってきますか', note: '通常のカードに移行するときに全額戻る' },
    { en: "After a year we review it for a regular card.", ja: '1年後に通常カードへの切り替えを審査します', note: '自動では上がらない。1年経ったら自分から聞く' },
    { en: "Use it and pay it off every month.", ja: '毎月使って全額払ってください', note: '持っているだけでは履歴が育たない' },
    { en: "Never carry a balance.", ja: '残高を翌月に持ち越さないでください', note: '利息が20パーセント超。持ち越しても信用は上がらない' },
    { en: "Keep your usage under thirty percent.", ja: '利用率は3割以下に抑えてください', note: '枠300ドルなら90ドルまで。スコアに直結する' },
    { en: "Can I be an authorized user on my wife's card?", ja: '妻のカードの追加利用者になれますか', note: '配偶者の履歴が自分にも乗る。最短の近道' },

    // ---- スコアと照会 ----
    { en: "What's your credit score?", ja: 'クレジットスコアはいくつですか', note: '300から850。700を超えれば大抵の審査は通る' },
    { en: "You can check it free in the app.", ja: 'アプリで無料で見られます', note: '自分で確認する分にはスコアは下がらない' },
    { en: "Is that a hard pull or a soft pull?", ja: 'それは正式な照会ですか、簡易照会ですか', note: '申し込む前に必ず聞く。答えで判断が変わる' },
    { en: "A soft pull won't affect your score.", ja: '簡易照会はスコアに影響しません', note: '事前審査はこちら。何件受けても無害' },
    { en: "A hard inquiry stays on for two years.", ja: '正式な照会は2年間記録に残ります', note: '短期間に何件も出すと審査で不利になる' },
    { en: "Can you pre-qualify me without a hard pull?", ja: '正式な照会なしで事前審査できますか', note: 'この一文で無駄な傷を防げる。カード申込の前に必ず' },
    { en: "Payment history is the biggest piece.", ja: '支払い履歴が一番大きな要素です', note: '期日を守るだけで大半は解決する' },
    { en: "One late payment can drop you a hundred points.", ja: '1回の延滞で100点下がることがあります', note: '自動払いの設定で防げる。手動払いにこだわらない' },
    { en: "Set up autopay for at least the minimum.", ja: 'せめて最低額だけでも自動払いにしてください', note: '最低額でも延滞は回避できる。記録が守られる' },
    { en: "Don't close your oldest card.", ja: '一番古いカードは解約しないでください', note: '履歴の長さが縮む。使わなくても持ち続ける' },

    // ---- 送金 ----
    { en: "Is this going out as a wire or an ACH?", ja: '電信送金と口座振替、どちらで出しますか', note: '速さも手数料も全く違う。用途で選ぶ' },
    { en: "A wire is thirty dollars and goes out same day.", ja: '電信送金は30ドルで当日中に出ます', note: '高いが速い。締切時刻がある' },
    { en: "ACH is free but takes three business days.", ja: '口座振替は無料ですが3営業日かかります', note: '急がないなら常にこちら。年間で大きな差になる' },
    { en: "What's the cutoff time for wires today?", ja: '本日の電信送金の締切は何時ですか', note: '過ぎると翌営業日扱い。家の頭金などで致命傷になる' },
    { en: "International wires need the SWIFT code.", ja: '海外送金には SWIFT コードが必要です', note: '相手の銀行から先に取り寄せておく' },
    { en: "There may be a fee on the receiving end too.", ja: '受取側でも手数料が引かれることがあります', note: '送った額と着いた額が合わない理由はこれ' },
    { en: "Can I do this through Zelle instead?", ja: '代わりにゼルで送れますか', note: '国内の個人間送金は無料で即時。手数料を丸ごと消せる' },
    { en: "Zelle is instant and there's no getting it back.", ja: 'ゼルは即時で、取り消しはできません', note: '詐欺で一番使われる経路。相手を確認してから送る' },

    // ---- 反映と営業日 ----
    { en: "When will the funds be available?", ja: 'いつから使えるようになりますか', note: '入金した金がすぐ使えるとは限らない。必ず聞く' },
    { en: "The first two hundred is available tomorrow.", ja: '最初の200ドルは明日から使えます', note: '小切手を入れたときの一般的な扱い' },
    { en: "There's a hold on the rest until Friday.", ja: '残りは金曜まで保留です', note: '新規口座は保留期間が長い。家賃の日と重ねない' },
    { en: "Why is there a hold?", ja: 'なぜ保留になるのですか', note: '理由と解除日を必ず確認する' },
    { en: "Monday is a federal holiday, so it'll be Tuesday.", ja: '月曜は祝日なので火曜になります', note: '祝日は営業日に数えない。連休前の送金は要注意' },
    { en: "Deposits after six p.m. post the next day.", ja: '午後6時以降の入金は翌日扱いです', note: '記帳される日が変わる。締切前に入れる' },

    // ---- 異議申し立て ----
    { en: "I want to dispute a charge.", ja: '請求に異議を申し立てたいです', note: 'この一語で正式な手続きが始まる' },
    { en: "I didn't authorize this transaction.", ja: 'この取引を承認していません', note: '不正利用の申告に使う決まった言い方' },
    { en: "We'll issue a provisional credit while we investigate.", ja: '調査中は仮の返金を入れます', note: '調査を待たずに金が先に戻る。生活が止まらない' },
    { en: "How long does the investigation take?", ja: '調査にはどれくらいかかりますか', note: '通常10営業日ほど。結果は書面で来る' },
    { en: "I'll go ahead and cancel that card.", ja: 'そのカードは止めます', note: '番号が変わる。自動引き落としの再設定が必要になる' },
    { en: "Was the card present or was it online?", ja: 'カードを提示しましたか、それともオンラインですか', note: '答えで手続きの種類が変わる' },
    { en: "You have sixty days from the statement date.", ja: '明細の日付から60日以内です', note: '過ぎると戻らない。明細は毎月ざっと見る' },

    // ---- 帰り際 ----
    { en: "Is there anything else I can help you with today?", ja: '他にご用件はございますか', note: '締めの定型。残っている質問はここで全部出す' },
    { en: "Download the app before you leave.", ja: '帰る前にアプリを入れてください', note: '支店内なら設定を手伝ってもらえる' },
    { en: "Here's my card — ask for me next time.", ja: '名刺です。次回は私を指名してください', note: '同じ担当だと話が早い。名前を控えておく' },
    { en: "You'll get a welcome packet in the mail.", ja: '案内一式が郵送で届きます', note: '手数料表が入っている。捨てずに取っておく' },
];
