/**
 * BANK — Getting a Quote / 修理業者の見積もり
 *
 * 電話で呼ぶ → 出張料と見積もり料 → 現地で見る → 相見積もり → 資格と保険 →
 * 許可と検査 → 中身の確認 → 工期 → 支払い → 保証 → 完了と手直し。
 *
 * 業者の英語は、こちらが何を知っているかで金額が変わる。
 * 含まれていないものは何か / 追加はどうなるか / 保証は書面か。この3つを毎回聞けば足元は見られない。
 */

import type { LifePhrase } from '../../lifeline-types';

export const QUOTE_BANK: LifePhrase[] = [

    // ---- 電話で呼ぶ ----
    { en: "Hi, I'm calling about a leak under my kitchen sink.", ja: '台所のシンク下の水漏れの件でお電話しました', note: '用件を最初の1文で言い切る。これで担当が決まる' },
    { en: "Do you guys do bathroom remodels?", ja: '浴室のリフォームはやっていますか', note: 'do you guys do 〜。業種の確認は電話の一言目' },
    { en: "How soon could someone come out?", ja: 'どれくらいで来てもらえますか', note: 'come out。現地に来ること。この動詞を覚える' },
    { en: "We could get someone out there Thursday.", ja: '木曜に人を出せます', note: 'get someone out。人を手配するという言い方' },
    { en: "What's your service area?", ja: '対応地域はどこまでですか', note: '範囲外だと出張料が乗る。先に聞けば無駄がない' },
    { en: "Is there a trip charge?", ja: '出張料はかかりますか', note: 'trip charge。来ただけで取られる金。有無を必ず確認' },
    { en: "Do you charge for an estimate?", ja: '見積もりは有料ですか', note: '無料が多いが、専門職ほど有料。聞かずに呼ばない' },
    { en: "Estimates are free.", ja: '見積もりは無料です', note: '無料だから安心とは限らない。営業込みの無料もある' },
    { en: "It's a seventy-five dollar diagnostic fee, waived if you do the work with us.", ja: '診断料75ドルですが、工事をご依頼いただけば無料です', note: 'waived。頼めばチャラ。これが一番よくある形' },
    { en: "Is that applied to the job if I go with you?", ja: '依頼した場合、その分は工事代から引かれますか', note: 'applied to。差し引かれるのか、上乗せのままなのか' },
    { en: "What's your hourly rate?", ja: '時間単価はいくらですか', note: '職種ごとに相場がある。数字を持って比べる' },
    { en: "There's a one-hour minimum.", ja: '最低1時間分はいただきます', note: '5分で終わる作業でも1時間分。小さい修理はまとめて頼む' },
    { en: "Can you give me a ballpark over the phone?", ja: '電話でだいたいの額を教えてもらえますか', note: 'ballpark。概算。断られても聞く価値はある' },
    { en: "I really can't quote it without seeing it.", ja: '実物を見ないと金額は出せません', note: '誠実な業者の答え。電話で即答する方がむしろ危ない' },
    { en: "What's your window?", ja: '到着は何時から何時の間ですか', note: 'window。時間帯。8時から12時の間、のような答えが返る' },
    { en: "I'll text you when I'm on my way.", ja: '向かうときに連絡します', note: 'on my way。当日この連絡が来ないなら電話していい' },

    // ---- 現地で見せる ----
    { en: "Let me show you what's going on.", ja: '状況をお見せします', note: 'what is going on。何が起きているか、の口語' },
    { en: "How long has it been doing this?", ja: 'いつからこうなっていますか', note: '期間で被害の大きさを測っている。正確に答える' },
    { en: "Has anyone else worked on this?", ja: '他の業者が触っていますか', note: '前の工事が原因のことが多い。隠すと結局高くつく' },
    { en: "It started right after the cold snap.", ja: '寒波の直後から始まりました', note: 'きっかけを言えるだけで原因が絞れる' },
    { en: "I'd rather fix it right than fix it cheap.", ja: '安く済ますより、ちゃんと直したいです', note: '方針を先に言うと、応急処置を勧められずに済む' },

    // ---- 相見積もり ----
    { en: "I'm getting a few quotes.", ja: '何社か見積もりを取っています', note: 'これを言うだけで金額が変わる。毎回言う' },
    { en: "I've got three bids on this.", ja: '3社に相見積もりを出しています', note: 'bid。見積額。3社が相場と言われる' },
    { en: "That's fine, take your time.", ja: '大丈夫です、ゆっくり検討してください', note: '慌てさせない業者は信用できる。判断材料になる' },
    { en: "This price is only good today.", ja: 'この価格は本日限りです', note: '一番危ない一言。今日決めさせようとする相手は帰す' },
    { en: "I'm not signing anything today.", ja: '今日は何も署名しません', note: 'これを最初に言えば押し切られない' },
    { en: "Can you email me the estimate?", ja: '見積もりをメールで送ってもらえますか', note: '紙かメールで残す。口頭の金額は無いのと同じ' },
    { en: "Can you break it out — parts and labor?", ja: '部材と工賃に分けてもらえますか', note: '分けさせないと他社と比べられない。丸めた額は比較不能' },
    { en: "Is that the total, out the door?", ja: 'それが最終の総額ですか', note: 'out the door。全部込みでいくらか' },
    { en: "Does that include tax and disposal?", ja: '税と廃材の処分費は込みですか', note: '後から乗ってくる二大項目' },
    { en: "Who hauls away the old one?", ja: '古いものは誰が撤去しますか', note: 'haul away。引き取りが別料金のことがある' },
    { en: "Is that a fixed price or time and materials?", ja: '定額ですか、実費精算ですか', note: 'time and materials は上限がない。定額の方が読める' },
    { en: "Can we cap it at that number?", ja: 'その金額を上限にできますか', note: 'cap。青天井を止める一言' },
    { en: "That seems high — what's driving that?", ja: '高く感じます。何が要因ですか', note: '責めずに内訳を説明させる。理由が言えないなら盛っている' },
    { en: "The other guy quoted me half that.", ja: '他社は半額でした', note: '安すぎる方に理由があることもある。両方に理由を聞く' },
    { en: "You get what you pay for.", ja: '安かろう悪かろうですよ', note: '業者の定番の返し。ここで引かずに根拠を聞く' },

    // ---- 資格と保険 ----
    { en: "Are you licensed and insured?", ja: '免許と保険はありますか', note: 'この2語をセットで聞く。無資格業者を弾く最短の質問' },
    { en: "Can I get your license number?", ja: '免許番号を教えてもらえますか', note: '州のサイトで照合できる。渋る相手は本当に持っていない' },
    { en: "Do you carry workers comp?", ja: '労災保険には入っていますか', note: '無い業者の職人が家で怪我をすると、家主が負うことがある' },
    { en: "Can you send me a certificate of insurance?", ja: '保険証明書を送ってもらえますか', note: '書類が出てこないなら加入していない。それだけで判断できる' },
    { en: "Are you using subs or your own crew?", ja: '下請けですか、自社の職人ですか', note: 'subs は subcontractors。誰が来るかで仕上がりが変わる' },
    { en: "Who's actually going to be here doing the work?", ja: '実際に作業するのは誰ですか', note: '営業だけ来て当日は別人、はよくある' },
    { en: "How long have you been in business?", ja: '何年やっていますか', note: '保証が5年でも会社が2年目なら意味がない' },
    { en: "Do you have references I can call?", ja: '連絡できる紹介先はありますか', note: 'references。実際にかける人は少ないが、聞くだけで態度が変わる' },
    { en: "Are you bonded?", ja: '身元保証はありますか', note: 'bonded。途中で投げ出されたときに補償される仕組み' },

    // ---- 許可と検査 ----
    { en: "Does this need a permit?", ja: 'これは許可が要りますか', note: 'permit。要る工事で取らないと、家を売るときに問題になる' },
    { en: "Do you pull the permit or do I?", ja: '許可はそちらが取りますか、私ですか', note: 'pull a permit。業者が取るのが普通。自分名義だと責任も自分' },
    { en: "Is the permit fee included in the quote?", ja: '許可の費用は見積もりに入っていますか', note: '入っていないと後から数百ドル乗る' },
    { en: "We can do it without a permit if you want.", ja: 'ご希望なら許可なしでもできます', note: '安く見せる誘い。後で責任を負うのはこちら。断る' },
    { en: "I'd rather do it by the book.", ja: 'きちんと手順を踏みたいです', note: 'by the book。角を立てずに断る言い方' },
    { en: "When does the inspector come?", ja: '検査官はいつ来ますか', note: '検査の日は在宅が要ることがある' },
    { en: "It has to pass inspection before we close it up.", ja: '塞ぐ前に検査に通す必要があります', note: 'close it up。壁を閉じる前。順番を飛ばす業者は危ない' },

    // ---- 中身の確認 ----
    { en: "What exactly is included in that number?", ja: 'その金額には具体的に何が含まれますか', note: 'exactly を入れると曖昧な答えを許さない' },
    { en: "What's not included?", ja: '含まれていないものは何ですか', note: '一番大事な質問。追加費用は全部ここに隠れている' },
    { en: "Is that per square foot or total?", ja: 'それは面積あたりですか、総額ですか', note: '床や屋根は単価表示が多い。必ず総額に直させる' },
    { en: "What brand are you putting in?", ja: 'どのメーカーのものを入れますか', note: '型番まで見積もりに書かせる。安物にすり替わるのを防ぐ' },
    { en: "Can I supply my own materials?", ja: '材料を自分で用意してもいいですか', note: '断られることが多い。保証が切れる理由にされる' },
    { en: "Are you marking up the materials?", ja: '材料に利益を乗せていますか', note: '乗せて当然だが、聞くと率を教える業者もいる' },
    { en: "What could turn into a change order?", ja: '追加工事になりそうな要素は何ですか', note: 'change order。壁を開けてから出てくるやつ' },
    { en: "If you open it up and find rot, then what?", ja: '開けてみて腐りが出たらどうなりますか', note: '具体例で聞くと本音の金額感が出る' },
    { en: "Any change order has to be in writing before you start it.", ja: '追加工事は着手前に必ず書面にしてください', note: 'これを先に言えば、請求書を見て驚くことがなくなる' },
    { en: "Just call me before you spend another dollar.", ja: '追加でお金がかかる前に必ず電話してください', note: '一番実用的な予防線。これ一つで数千ドル守れる' },

    // ---- 工期 ----
    { en: "How long will it take?", ja: 'どれくらいかかりますか', note: '日数を先に文字にしておく' },
    { en: "Two days, weather permitting.", ja: '天候次第で2日です', note: 'weather permitting。屋外工事の逃げ道。雨の日の扱いを聞く' },
    { en: "When can you start?", ja: 'いつ着工できますか', note: '着工日と完了日を両方契約書に入れる' },
    { en: "We're booked out three weeks.", ja: '3週間先まで埋まっています', note: 'booked out。腕のいい業者ほど埋まっている。待つ価値はある' },
    { en: "Will you be here every day until it's done?", ja: '終わるまで毎日来ますか', note: '掛け持ちで数週間放置される事故を防ぐ' },
    { en: "Is the water going to be off all day?", ja: '一日中断水しますか', note: '生活の段取りが変わる。前日に聞いておく' },
    { en: "Do I need to be home?", ja: '在宅している必要はありますか', note: '仕事を休むかどうかが決まる' },
    { en: "Can you work around the kids' nap time?", ja: '子どもの昼寝の時間を避けてもらえますか', note: 'work around 〜。予定を避けてもらう言い方' },
    { en: "Where are your guys going to park?", ja: '職人はどこに停めますか', note: '近所ともめる原因。先に決めておく' },
    { en: "Who cleans up at the end of the day?", ja: '一日の終わりの片付けは誰がしますか', note: '汚したまま帰る業者は多い。契約前に決める' },
    { en: "We ran into a delay on the parts.", ja: '部材の入荷が遅れています', note: '一番よく聞く遅延の理由。代替品があるか聞く' },
    { en: "Is there any way to speed that up?", ja: '早める方法はありますか', note: '追加費用と引き換えなら選べる。まず聞く' },

    // ---- 支払い ----
    { en: "How do you want to be paid?", ja: '支払いはどうしますか', note: '方法で残る記録が変わる' },
    { en: "Do you need a deposit?", ja: '前金は必要ですか', note: '材料費として1割から3割が相場' },
    { en: "A third up front, a third at rough-in, a third at completion.", ja: '着手時、下地工事時、完了時に3分の1ずつです', note: '分割の標準形。これなら健全な業者' },
    { en: "I don't pay fifty percent up front.", ja: '半額前払いはしません', note: '前金が高すぎる相手は途中で消えることがある' },
    { en: "I'll pay the balance when it's finished.", ja: '残金は完了時に払います', note: 'balance。残額。終わる前に全額払わない' },
    { en: "Is there a discount for cash?", ja: '現金だと安くなりますか', note: '安くなるが記録も保証も残らない。天秤にかける' },
    { en: "Can I pay with a card?", ja: 'カードは使えますか', note: '手数料が乗ることがあるが、もめたとき支払いを止められる強みがある' },
    { en: "There's a three percent card fee.", ja: 'カードは3%の手数料がかかります', note: '金額が大きいと無視できない差になる' },
    { en: "Can you invoice me?", ja: '請求書を出してもらえますか', note: 'invoice。金額と内訳が残る紙' },
    { en: "I'm holding the last payment until the punch list is done.", ja: '手直しが終わるまで最終金は払いません', note: 'punch list。やり残しの一覧。最終金が最強の交渉材料' },
    { en: "Can I get a lien waiver with the final invoice?", ja: '最終請求書と一緒に権利放棄書をもらえますか', note: 'lien waiver。下請けから家に請求が来るのを防ぐ紙' },

    // ---- 契約書と保証 ----
    { en: "Can we put all this in a contract?", ja: 'これを全部契約書にしてもらえますか', note: '話した内容を紙にする。これを嫌がる相手は切る' },
    { en: "I want the start date and the finish date in there.", ja: '着工日と完了日を入れてください', note: '日付が無い契約は永遠に終わらない' },
    { en: "What's the warranty on the work?", ja: '工事の保証はどうなっていますか', note: 'warranty。工賃と部材で別々にある' },
    { en: "One year on labor, manufacturer's warranty on the parts.", ja: '工賃は1年、部材はメーカー保証です', note: 'この2階建てが標準。それぞれ年数を確認する' },
    { en: "Is the warranty in writing?", ja: '保証は書面ですか', note: '口頭の保証は無いのと同じ' },
    { en: "What voids the warranty?", ja: 'どうすると保証が切れますか', note: '自分で触った、他社が触った、で切れることが多い' },
    { en: "If it leaks again next month, do you come back free?", ja: '来月また漏れたら、無料で来てくれますか', note: '具体的に聞く。曖昧な返事なら書面に入れさせる' },
    { en: "Do you guarantee your work?", ja: '仕事は保証しますか', note: 'guarantee。この一言に詰まる業者は使わない' },

    // ---- 完了と手直し ----
    { en: "Can you walk me through what you did?", ja: '何をしたか説明してもらえますか', note: 'walk me through。順を追って説明させる' },
    { en: "Show me before you close the wall.", ja: '壁を塞ぐ前に見せてください', note: '見えなくなる前が最後の機会。写真も撮る' },
    { en: "Can I get photos of what's behind there?", ja: '中の写真をもらえますか', note: '次に工事する人のためにも残る' },
    { en: "This grout line isn't straight.", ja: 'この目地がまっすぐではありません', note: '事実だけ言う。感情を足すと直してもらえなくなる' },
    { en: "Can you come back and touch that up?", ja: '手直しに来てもらえますか', note: 'touch up。細かい直し。最終金を払う前に頼む' },
    { en: "Let's make a punch list.", ja: '手直しの一覧を作りましょう', note: '完了前に一緒に回って書き出す。これが最後の砦' },
    { en: "It's not what we agreed to.", ja: '話と違います', note: '事実で押す。声を荒げると相手も引かなくなる' },
    { en: "Can you show me where that's in the contract?", ja: '契約書のどこに書いてあるか見せてください', note: '追加請求が来たときの一言。書いていなければ引っ込む' },
    { en: "I'm not paying for that — it wasn't in the quote.", ja: '見積もりに無かったので、その分は払いません', note: '見積書を手元に置いてから言う' },
    { en: "Who patches the drywall after?", ja: '後の壁の穴は誰が塞ぎますか', note: '配管や電気の後始末は担当が曖昧になりやすい。先に決める' },
    { en: "Send me the final invoice and I'll get it out today.", ja: '最終請求書を送ってください。今日中に払います', note: '納得したらすぐ払う。これで次回の対応が変わる' },
    { en: "Appreciate it — I'll send people your way.", ja: 'ありがとう。人を紹介します', note: '良い業者との関係を残す一言。緊急時に一番に来てくれる' },
];
