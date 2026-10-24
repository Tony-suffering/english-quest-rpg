/**
 * BANK — The Pharmacy Counter / 薬局のカウンター
 *
 * 処方箋を預ける → 待つ → 受け取る → 代理で取りに行く → 保険が通らない →
 * ジェネリックか先発か → 事前承認 → 追加処方 → 他店への移管 → 薬剤師に相談 →
 * 市販薬 → 予防接種 → 会計。
 *
 * ここは病院より短い会話で、しかも金額が一番動く場所。
 * 保険が通らないと言われたときに黙って払うか、次の一言を出せるかで支払いが十倍変わる。
 * 薬剤師との相談は無料で予約も要らない。使わない手はない。
 */

import type { LifePhrase } from '../../lifeline-types';

export const PHARMACY_BANK: LifePhrase[] = [

    // ---- 処方箋を預ける ----
    { en: "Are you dropping off or picking up?", ja: 'お預けですか、お受け取りですか', note: 'カウンターの第一声。列が分かれていることも多い' },
    { en: "I'm dropping off.", ja: '預けに来ました', note: 'これだけで用件は通じる' },
    { en: "My doctor sent it over electronically.", ja: '医師から電子で送られています', note: '今は大半がこれ。紙は持たされない' },
    { en: "I don't see anything in the system yet.", ja: 'まだこちらに届いていません', note: '医師側で止まっていることが多い。診療所に電話する' },
    { en: "Can you check under a different spelling?", ja: '別のつづりで調べてもらえますか', note: '名前の入力違いはよく起きる。無いと言われても粘る' },
    { en: "Can I get your date of birth?", ja: '生年月日をお願いします', note: '同姓同名を分けるため毎回聞かれる' },
    { en: "Have you filled here before?", ja: '当店のご利用は初めてですか', note: '調剤してもらうことを fill と言う' },
    { en: "I'll need your insurance card.", ja: '保険証をお預かりします', note: '初回と、保険が変わったときに必要' },
    { en: "Is your address still the same?", ja: 'ご住所に変更はありませんか', note: '引っ越したらここで更新しておく' },
    { en: "Any allergies we should have on file?", ja: '登録すべきアレルギーはありますか', note: '記録として残るという意味。1度言えば次から効く' },
    { en: "Are you taking anything else right now?", ja: '今ほかに飲んでいる薬はありますか', note: '飲み合わせの確認。市販薬やサプリも言う' },

    // ---- 待つ ----
    { en: "It'll be about twenty minutes.", ja: '20分ほどかかります', note: '実際はもう少しかかることが多い' },
    { en: "Do you want to wait or come back?", ja: 'お待ちになりますか、出直されますか', note: '待つと言えばその場の椅子で待てる。出直すと二度手間' },
    { en: "I'll wait.", ja: '待ちます', note: '短く言うほど自然' },
    { en: "We'll text you when it's ready.", ja: 'ご用意ができたら携帯にお知らせします', note: '番号を登録しておくと無駄足が減る' },
    { en: "We're backed up today.", ja: '本日は立て込んでいます', note: '待ちがかなり伸びるという合図' },
    { en: "It won't be ready until tomorrow.", ja: '明日までかかります', note: '在庫切れか承認待ちのことが多い。理由を必ず聞く' },
    { en: "We're out of stock on that.", ja: 'その薬は在庫切れです', note: 'ここで引き下がらない。次の質問に進む' },
    { en: "Can you check if another location has it?", ja: '他の店舗に在庫があるか調べてもらえますか', note: 'この一文で今日中に手に入ることがある' },
    { en: "We can order it in for Thursday.", ja: '木曜入荷で取り寄せられます', note: '取り寄せの言い方。日付を必ず確認する' },
    { en: "Can you give me a few days' supply in the meantime?", ja: 'つなぎで数日分だけもらえますか', note: '切らすと危ない薬なら通ることが多い' },

    // ---- 受け取る ----
    { en: "Picking up for Sato.", ja: 'サトウで受け取りです', note: '名字だけ言えば通じる' },
    { en: "Last name and date of birth?", ja: '名字と生年月日をお願いします', note: '受け取りのたびに聞かれる。並ぶ前に用意しておく' },
    { en: "I have two ready for you.", ja: '2点ご用意があります', note: '数を言われる。頼んだ数と合っているか確認する' },
    { en: "There's one more on hold.", ja: 'もう1点保留になっています', note: '保留の理由を必ず聞く。放置すると取り消される' },
    { en: "Sign here on the screen.", ja: '画面に署名してください', note: '受け取りの確認と相談辞退の署名を兼ねている' },
    { en: "Is this your first time taking this?", ja: 'この薬は初めてですか', note: '初回だと薬剤師の説明が付く' },
    { en: "Do you have any questions for the pharmacist?", ja: '薬剤師に質問はありますか', note: '断ると説明なしで終わる。初回は Yes と答えていい' },
    { en: "The pharmacist will be right with you.", ja: '薬剤師がすぐ参ります', note: '無料で、数分で終わる' },
    { en: "Everything you need is on the bag.", ja: '必要なことは袋に書いてあります', note: '袋の記載は必ず読む。飲み方も注意も全部そこにある' },
    { en: "Wait — this isn't the right dose.", ja: 'これ、用量が違います', note: 'その場で気づけば直せる。帰ってからだと手間が倍' },

    // ---- 代理で取りに行く ----
    { en: "I'm picking up for my husband.", ja: '夫の分を受け取りに来ました', note: '家族の代理は普通に通る' },
    { en: "Do you have his date of birth?", ja: 'ご本人の生年月日はわかりますか', note: 'これが言えれば大抵は渡してもらえる' },
    { en: "Is he on your account?", ja: '同じ登録になっていますか', note: '家族をまとめて登録しておくと代理が楽になる' },
    { en: "For this one, he has to sign himself.", ja: 'この薬はご本人の署名が必要です', note: '規制の強い薬。代理では受け取れない' },
    { en: "I'll need to see your ID for this one.", ja: 'この薬は身分証の確認が必要です', note: '睡眠薬や強い鎮痛薬で求められる' },
    { en: "Can I have it delivered?", ja: '配送してもらえますか', note: '無料の店が多い。動けないときに効く' },
    { en: "We can mail it, but it takes three days.", ja: '郵送できますが3日かかります', note: '急ぎなら店頭で受け取る' },

    // ---- 保険が通らない ----
    { en: "Your insurance isn't going through.", ja: '保険が通っていません', note: 'この一文が出たらすぐ理由を聞く。黙って払わない' },
    { en: "It's saying the plan is inactive.", ja: '保険が無効と表示されています', note: '更新直後によくある。新しい保険証を出す' },
    { en: "Did your coverage change January first?", ja: '1月1日で保険が変わりましたか', note: '年明けは通らない事故が集中する時期' },
    { en: "It's coming up as too soon to fill.", ja: '調剤が早すぎると出ています', note: '前回から日数が足りない。いつなら通るか聞く' },
    { en: "When can I fill it?", ja: 'いつなら受け取れますか', note: '日付を確認して出直す。旅行前は早めに動く' },
    { en: "Without insurance it's two hundred and forty.", ja: '保険なしだと240ドルです', note: '高いと感じたらそこで止めて次の質問に進む' },
    { en: "Is there a discount card I can use?", ja: '使える割引カードはありますか', note: '保険より安くなることがある。必ず聞く' },
    { en: "Let me run it through GoodRx.", ja: '割引を通してみます', note: '店員から出してくれることもある。無料の割引' },
    { en: "That brings it down to eighteen dollars.", ja: 'それで18ドルになります', note: '一言聞くだけで数百ドル変わる場面が実際にある' },
    { en: "Can you bill it to my other card?", ja: 'もう一方の保険で請求できますか', note: '保険を2つ持っているときの言い方' },
    { en: "Your deductible hasn't been met yet.", ja: '自己負担の枠にまだ達していません', note: '年初は全額に近い支払いになる理由' },
    { en: "Your copay is forty dollars.", ja: '自己負担は40ドルです', note: '保険が効いた上での定額。これ以上は下がらない' },

    // ---- ジェネリックと先発 ----
    { en: "Is there a generic for this?", ja: 'ジェネリックはありますか', note: '値段が10分の1になることがある。毎回聞く価値がある' },
    { en: "We filled it with the generic.", ja: 'ジェネリックでご用意しました', note: '何も言わなければ自動でこちらになる' },
    { en: "The doctor wrote it as brand only.", ja: '医師が先発品指定で出しています', note: '変更するには医師の許可が要る' },
    { en: "It's the same medication, just a different manufacturer.", ja: '中身は同じで、製造元が違うだけです', note: '効き目は同じ扱いという説明' },
    { en: "The pill looks different this time.", ja: '今回、錠剤の見た目が違います', note: 'メーカーが変わっただけのことが多い。不安なら確認する' },
    { en: "Can you call the doctor and ask if generic is okay?", ja: '医師に確認してもらえますか', note: '薬局から連絡してくれる。自分でかけ直さなくていい' },
    { en: "I'd rather stick with the brand.", ja: '先発品のままにしたいです', note: '差額は自己負担になる。金額を聞いてから決める' },
    { en: "The generic isn't on your plan's list.", ja: 'そのジェネリックは保険の対象外です', note: '保険ごとに対象の薬が決まっている。代替を聞く' },
    { en: "Is there something on the list that works the same?", ja: '保険が効く同じような薬はありますか', note: '医師に伝えれば処方を書き換えてもらえる' },

    // ---- 事前承認 ----
    { en: "This one needs a prior authorization.", ja: 'これは事前承認が必要です', note: '保険会社の許可待ち。数日から2週間かかる' },
    { en: "We've sent the request to your doctor's office.", ja: '医師の診療所に依頼を送りました', note: '薬局と医師の間で進む。こちらは待つだけ' },
    { en: "Who do I call to check on it?", ja: '進み具合はどこに聞けばいいですか', note: '診療所に電話すると実際に早く動く' },
    { en: "It usually takes two to three business days.", ja: '通常2、3営業日かかります', note: '週末をまたぐと一気に伸びる' },
    { en: "It got denied.", ja: '却下されました', note: 'ここで終わりではない。次の一手がある' },
    { en: "Your doctor can file an appeal.", ja: '医師が不服申し立てできます', note: '通ることは多い。頼まないと動かない' },
    { en: "In the meantime, can I pay out of pocket?", ja: 'それまで自費で買えますか', note: '全額自己負担のこと。数日分だけ買う手もある' },
    { en: "Ask them for samples.", ja: '診療所で見本をもらってください', note: '無料でつなげる。承認待ちの間の定番の逃げ道' },

    // ---- 追加処方 ----
    { en: "How many refills do I have left?", ja: 'あと何回もらえますか', note: '切れる前に確認する。数字で答えが返る' },
    { en: "You have two refills left.", ja: 'あと2回分あります', note: '追加でもらえる回数のこと' },
    { en: "This was your last refill.", ja: '今回が最後の分です', note: '次は受診が要る。この日に予約を取る' },
    { en: "You'll need a new prescription.", ja: '新しい処方箋が必要です', note: '医師の診察待ちで数日空く。早めに動く' },
    { en: "We'll reach out to your doctor for a refill.", ja: '医師に追加処方を依頼します', note: '頼めば薬局からやってくれる' },
    { en: "Can I get a ninety-day supply?", ja: '90日分でもらえますか', note: '来店が減り、自己負担も1回分で済む' },
    { en: "Ninety days is cheaper than three thirty-day fills.", ja: '90日分は30日分3回より安いです', note: '同じ薬でも払う額が変わる。長く飲む薬は必ず聞く' },
    { en: "Do you want to put it on auto-refill?", ja: '自動更新にしますか', note: '切らさずに済むが、要らない月も用意される' },
    { en: "Can you sync all my refills to the same date?", ja: '全部の薬を同じ日にそろえられますか', note: '来店が月1回で済む。頼まないとやってくれない' },

    // ---- 他店への移管 ----
    { en: "Can you transfer my prescription from another pharmacy?", ja: '他の薬局から処方を移せますか', note: '薬局同士でやり取りしてくれる。自分は動かなくていい' },
    { en: "Which pharmacy is it at now?", ja: '今どちらの薬局にありますか', note: '店名と場所を伝える' },
    { en: "Do you know the store number?", ja: '店舗番号はわかりますか', note: '袋に印刷してある。控えておくと早い' },
    { en: "We'll call them and pull it over.", ja: '先方に電話して移します', note: '移管を pull over と言う。その場で頼める' },
    { en: "Give us about an hour.", ja: '1時間ほどください', note: '移管はその日のうちに終わることが多い' },
    { en: "Controlled substances can't be transferred.", ja: '規制薬は移管できません', note: '医師に新しい処方箋を出してもらうしかない' },
    { en: "I'm moving — can you send it to the one in Denver?", ja: '引っ越すので、デンバーの店に送ってもらえますか', note: '同じチェーンなら全国どこでも引き継げる' },

    // ---- 薬剤師に相談 ----
    { en: "The pharmacist wants to go over this with you.", ja: '薬剤師から説明があります', note: '一通り説明するという意味。断らずに聞く' },
    { en: "Take one tablet twice a day with food.", ja: '1回1錠、1日2回、食後に飲んでください', note: '空腹で飲むと胃にくる薬だという合図' },
    { en: "Take it on an empty stomach.", ja: '空腹時に飲んでください', note: '食事の1時間前か2時間後。守らないと効きが落ちる' },
    { en: "Don't drink alcohol with this one.", ja: 'この薬とお酒は避けてください', note: '言われたら本当にやめる。組み合わせで危ないものがある' },
    { en: "This one can make you drowsy.", ja: '眠くなることがあります', note: '運転前には飲まない' },
    { en: "Finish all of it, even if you feel better.", ja: 'よくなっても最後まで飲み切ってください', note: '抗生物質の基本。途中でやめると効かなくなる' },
    { en: "What if I miss a dose?", ja: '飲み忘れたらどうすればいいですか', note: '2回分まとめて飲むのは危ない。必ず聞く' },
    { en: "Skip it and take the next one on schedule.", ja: '飛ばして次の分を通常通り飲んでください', note: '一番多い答え。まとめ飲みはしない' },
    { en: "Will this interact with my blood pressure medicine?", ja: '血圧の薬と飲み合わせは大丈夫ですか', note: '相談は無料。使わないと損をする' },
    { en: "Call us if you get a rash or any swelling.", ja: '発疹や腫れが出たら電話してください', note: 'アレルギー反応の合図。すぐ連絡する' },

    // ---- 市販薬 ----
    { en: "Where's the cold medicine?", ja: '風邪薬はどこですか', note: '通路番号で答えが返ってくる' },
    { en: "Aisle seven, on your left.", ja: '7番通路の左側です', note: '売り場の通路のこと。番号を聞き取れれば迷わない' },
    { en: "What do you recommend for a dry cough?", ja: '空咳には何がいいですか', note: '薬剤師に聞くと的確に選んでくれる。無料の相談' },
    { en: "Is there a non-drowsy version?", ja: '眠くならないものはありますか', note: '日中に飲むならこれを必ず選ぶ' },
    { en: "That one's behind the counter.", ja: 'それはカウンターの奥にあります', note: '棚に無くても品切れとは限らない。身分証が要るだけ' },
    { en: "You'll have to sign for it.", ja: '署名が必要です', note: '購入できる量に上限がある薬' },
    { en: "Can I take this with what I'm already on?", ja: '今飲んでいる薬と一緒でも大丈夫ですか', note: '市販薬こそ確認する価値がある' },

    // ---- 予防接種 ----
    { en: "Do you do flu shots here?", ja: 'インフルエンザの予防接種はできますか', note: '予約なしでできる店が多い' },
    { en: "Walk-ins are welcome.", ja: '予約なしで受けられます', note: '飛び込みでいいという意味' },
    { en: "It's covered at no cost to you.", ja: '自己負担なしで受けられます', note: '保険で無料のことが多い。打つ前に確認する' },
    { en: "Fill out this form and we'll call you back.", ja: 'この用紙に記入いただき、後ほどお呼びします', note: '記入は5分ほど。保険証を出しておく' },
    { en: "Which arm?", ja: 'どちらの腕にしますか', note: '利き腕でないほうを選ぶ人が多い' },
    { en: "You might be sore tomorrow.", ja: '明日は腕が痛むかもしれません', note: 'だるさや痛みは普通の反応' },

    // ---- 会計 ----
    { en: "Your total is thirty-two seventy.", ja: '合計32ドル70セントです', note: 'ドルとセントを続けて言う。この読み方に慣れる' },
    { en: "Do you have any questions before you go?", ja: 'お帰りの前に質問はありますか', note: '最後の確認。聞き残しはここで全部出す' },
];
