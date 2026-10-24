/**
 * BANK — The Lease / 賃貸の申込
 *
 * 内見 → 申し込み → 審査 → 敷金 → 光熱費 → 契約期間 → ペット → 駐車場 →
 * 入居日 → 傷の記録 → 署名 → 更新 → 途中解約 → 敷金の返還。
 *
 * 家を借りる英語は、聞き逃した一言がそのまま金額になる。
 * 含まれるか / 返ってくるか / 書面にあるか。この3つを毎回確認する癖がつけば、たいてい負けない。
 */

import type { LifePhrase } from '../../lifeline-types';

export const LEASE_BANK: LifePhrase[] = [

    // ---- 内見の予約 ----
    { en: "Is the unit still available?", ja: 'その部屋はまだ空いていますか', note: '広告は残ったままのことが多い。最初にこれを聞く' },
    { en: "I saw your listing on Zillow.", ja: 'Zillowで見ました', note: 'どこで見たかを言うと話が早い' },
    { en: "When can I come see it?", ja: 'いつ見に行けますか', note: 'come see it。内見の申し込みはこの一文' },
    { en: "It's a one-bedroom, one bath, about eight hundred square feet.", ja: '1ベッドルーム、風呂1つ、約800平方フィートです', note: 'リビングは部屋数に入らない。1ベッドは日本の1LDKに近い' },
    { en: "Is that a walk-up or is there an elevator?", ja: '階段だけですか、エレベーターはありますか', note: 'walk-up はエレベーターなし。4階だと暮らしが変わる' },

    // ---- 内見中 ----
    { en: "Do you mind if I run the faucet?", ja: '蛇口を出してみてもいいですか', note: '水圧は自分で確かめる。後から直させるのは大変' },
    { en: "Are the fridge and stove included?", ja: '冷蔵庫とコンロは付いていますか', note: 'アメリカは冷蔵庫が付かない物件が普通にある。数百ドルの差' },
    { en: "Is there laundry in the building?", ja: '建物内に洗濯機はありますか', note: '部屋の中 / 建物内 / コインランドリー の3段階で聞かれる' },
    { en: "In-unit washer-dryer?", ja: '部屋の中に洗濯乾燥機はありますか', note: 'in-unit。家賃が跳ね上がる代わりに生活が変わる条件' },
    { en: "Is there central air?", ja: 'セントラル空調はありますか', note: '無ければ窓用エアコンを自分で買って自分で付ける' },
    { en: "Does it face the street?", ja: '通りに面していますか', note: '騒音とゴミ収集の音。夜に一度来てみるといい' },
    { en: "Who takes care of the yard?", ja: '庭の手入れは誰がしますか', note: '一軒家だと入居者負担のことが多い。契約前に文字にする' },
    { en: "Has anyone else applied?", ja: '他に申し込んでいる人はいますか', note: '急かされることがあるが、事実を確認するのは自由' },

    // ---- 申し込み ----
    { en: "What do you need from me to apply?", ja: '申し込みには何が必要ですか', note: '必要書類を一度に出させる。小出しにされると入居が遅れる' },
    { en: "The application fee is fifty dollars, non-refundable.", ja: '申込料は50ドルで、返金されません', note: 'non-refundable。落ちても返ってこない' },
    { en: "Is that per person or per apartment?", ja: 'それは1人につきですか、1部屋につきですか', note: '2人で入るなら倍かかる。先に確認する' },
    { en: "Do you run credit for each adult?", ja: '大人一人ずつ信用調査をしますか', note: '同居人全員が調査対象になる' },
    { en: "We'll need your last two pay stubs.", ja: '直近2回分の給与明細が必要です', note: 'pay stub。給与明細。写真で送ることが多い' },
    { en: "I'm self-employed — I can send tax returns instead.", ja: '自営業なので、代わりに確定申告書を出せます', note: '自営業のときの定型。先に言えば話が止まらない' },
    { en: "We need proof of income — three times the rent.", ja: '家賃の3倍の収入証明が必要です', note: '3倍ルール。ここが一番の壁になる' },
    { en: "I don't make three times the rent.", ja: '家賃の3倍は稼いでいません', note: '隠さずに言って、保証人か前払いの話に進める方が早い' },
    { en: "Can I use a co-signer?", ja: '連帯保証人を立てられますか', note: 'co-signer。guarantor も同じ意味で使われる' },
    { en: "How long does approval take?", ja: '審査にどれくらいかかりますか', note: '2〜3営業日が普通。1週間なら別を当たる' },
    { en: "We'll let you know by Friday.", ja: '金曜までに連絡します', note: '期限を言わせておくと催促しやすい' },

    // ---- 審査 ----
    { en: "We're going to run a credit and background check.", ja: '信用調査と身元調査をします', note: 'run。調査はこの動詞' },
    { en: "What credit score do you need?", ja: '信用スコアはいくつ必要ですか', note: '620や650など数字がある。数字で聞けば数字で返る' },
    { en: "My credit's thin — I just moved here.", ja: '引っ越してきたばかりで信用履歴が薄いです', note: 'thin credit。履歴なしを説明する言い方' },
    { en: "I don't have any credit history in the US.", ja: 'アメリカでの信用履歴がありません', note: 'これを言うと追加の敷金を求められることがある' },
    { en: "We can approve you with an extra month's deposit.", ja: '敷金を1か月分追加すれば通せます', note: '交渉できる場面。追加分が返るかを必ず聞く' },
    { en: "Do you check with previous landlords?", ja: '前の大家に確認しますか', note: '事前に前の大家へ一報を入れておくと通りやすい' },
    { en: "Any evictions or broken leases?", ja: '強制退去や途中解約の履歴はありますか', note: 'eviction。隠しても記録に出る。先に説明する方が有利' },
    { en: "You're approved.", ja: '審査に通りました', note: 'approved。この一言で部屋が決まる' },
    { en: "We went with another applicant.", ja: '他の方に決まりました', note: '断りの定型。理由は言われない' },
    { en: "Can I get that in writing?", ja: 'それを書面でもらえますか', note: '口約束は必ず消える。この一文を癖にする' },

    // ---- 敷金と初期費用 ----
    { en: "What's due at signing?", ja: '契約時に何をいくら払いますか', note: '一番大事な質問。合計額を先に出させる' },
    { en: "First month, last month, and one month security.", ja: '初月、最終月、敷金1か月分です', note: '一度に家賃3か月分が飛ぶ。これが標準' },
    { en: "Is the security deposit refundable?", ja: '敷金は返ってきますか', note: 'refundable かどうかで性質が全く違う' },
    { en: "The deposit is refundable minus damages.", ja: '損傷分を引いて返します', note: 'minus damages。この解釈でもめる。だから写真を撮る' },
    { en: "Is there a non-refundable move-in fee?", ja: '返ってこない入居手数料はありますか', note: 'move-in fee。敷金と別に取られる。合計を押し上げる' },
    { en: "The cleaning fee is non-refundable.", ja: 'クリーニング代は返ってきません', note: '契約書に書いてあるか目で確認する' },
    { en: "How long do you have to return the deposit?", ja: '敷金の返還期限は何日ですか', note: '州法で14日から30日。期限を知っていると強い' },
    { en: "Do I get an itemized list of deductions?", ja: '差し引きの内訳をもらえますか', note: 'itemized。出させると根拠のない天引きが減る' },
    { en: "Normal wear and tear isn't my responsibility, right?", ja: '通常の使用による傷みは借主負担ではないですよね', note: 'normal wear and tear。この言葉を知っているだけで扱いが変わる' },
    { en: "Can I pay the deposit in two payments?", ja: '敷金を2回に分けて払えますか', note: '断られることも多いが、聞くだけで通ることがある' },
    { en: "It has to be a money order or a cashier's check.", ja: 'マネーオーダーか銀行小切手でお願いします', note: "初回の支払いは個人小切手を断られる。cashier's check は銀行で買う" },

    // ---- 光熱費 ----
    { en: "What's included in the rent?", ja: '家賃には何が含まれますか', note: '最初に聞く。ここで実質の家賃が決まる' },
    { en: "Heat and hot water are included.", ja: '暖房とお湯は込みです', note: '冬の請求が消える。北部では家賃の差より大きい' },
    { en: "You pay electric and gas.", ja: '電気とガスはご負担です', note: '入居者名義で契約することになる' },
    { en: "Roughly what do utilities run in the winter?", ja: '冬の光熱費はだいたいいくらですか', note: 'run はかかるという意味。実額を聞くと予算が読める' },
    { en: "Do I need to put utilities in my name before move-in?", ja: '入居前に光熱費を自分名義にしておく必要がありますか', note: '切替が遅れると鍵を渡してもらえないことがある' },
    { en: "Trash and water are on us.", ja: 'ゴミと水道はこちら持ちです', note: 'on us。大家が負担するという言い方' },
    { en: "Is internet already wired in?", ja: 'ネットの配線は来ていますか', note: '来ていないと工事に数週間かかる。在宅仕事なら死活問題' },

    // ---- 契約期間 ----
    { en: "Is this a twelve-month lease?", ja: '12か月契約ですか', note: 'lease は期間の決まった契約のこと' },
    { en: "Do you do month-to-month?", ja: '月ごとの契約はできますか', note: 'month-to-month。自由な代わりに高く、相手からも切れる' },
    { en: "Month-to-month is a hundred more a month.", ja: '月ごと契約は月100ドル増しです', note: '自由さの値段。短期滞在なら払う価値がある' },
    { en: "Can I do a six-month lease?", ja: '6か月契約にできますか', note: '短期は割高になる。理由を添えると通ることがある' },
    { en: "My current lease ends in May — can we line it up?", ja: '今の契約が5月に切れるので、合わせられますか', note: 'line it up。日程を合わせる。二重家賃を防ぐ' },
    { en: "What happens at the end of the term?", ja: '期間が終わったらどうなりますか', note: '自動で月契約に移る場合と、更新手続きが要る場合がある' },
    { en: "It rolls over to month-to-month automatically.", ja: '自動で月ごと契約に切り替わります', note: 'roll over。放っておくとこうなる。家賃も上がりうる' },
    { en: "How much notice do I have to give?", ja: '何日前に通知が必要ですか', note: '60日前が多い。1日遅れると1か月分取られる' },
    { en: "Sixty days written notice.", ja: '60日前に書面で通知してください', note: 'written。メールで送って送信日時を残す' },

    // ---- ペット ----
    { en: "Are pets allowed?", ja: 'ペットは飼えますか', note: '広告に書いていなくても交渉できることがある' },
    { en: "Cats are fine, dogs under thirty pounds.", ja: '猫は可、犬は30ポンド以下なら可です', note: '体重制限は普通にある。子犬でも成犬時の体重で見られる' },
    { en: "Is there a pet deposit or pet rent?", ja: 'ペット敷金ですか、毎月のペット代ですか', note: '両方取られることがある。分けて聞く' },
    { en: "Pet rent is thirty-five a month per pet.", ja: 'ペット代は1匹につき月35ドルです', note: 'per pet。2匹なら倍。契約期間で計算すると大きい' },
    { en: "Is the pet deposit refundable?", ja: 'ペット敷金は返ってきますか', note: '返らない pet fee と、返る pet deposit は別物' },
    { en: "Any breed restrictions?", ja: '犬種の制限はありますか', note: '保険の都合で決まっていて、交渉の余地がないことが多い' },
    { en: "He's a service animal.", ja: '介助動物です', note: '法的な扱いが違い、追加料金を取れない。証明を求められる' },

    // ---- 駐車場 ----
    { en: "Does the unit come with parking?", ja: '駐車場は付いていますか', note: 'come with。家賃に含まれるかどうか' },
    { en: "One assigned spot, second car is extra.", ja: '指定1台分で、2台目は追加料金です', note: 'assigned spot。番号が決まった場所' },
    { en: "Is it covered or open?", ja: '屋根付きですか、青空ですか', note: '雪の降る土地では毎朝の30分が変わる' },
    { en: "Can I park on the street overnight?", ja: '夜間に路上駐車できますか', note: '夜間禁止の町がある。知らずに切符が積み上がる' },
    { en: "Where do guests park?", ja: '来客はどこに停めますか', note: '来客の駐車は一番もめる話。先に決めておく' },

    // ---- 入居日 ----
    { en: "When can I move in?", ja: 'いつ入居できますか', note: '掃除や修理が終わっているかで日が動く' },
    { en: "The first is a Sunday — can I get the keys Saturday?", ja: '1日が日曜なので、土曜に鍵をもらえますか', note: '引っ越し業者の都合で前倒ししたいときの言い方' },
    { en: "Rent will be prorated for the first month.", ja: '初月は日割りになります', note: 'prorated。計算を見せてもらう。合わないことがある' },
    { en: "Can I reserve the elevator for the move?", ja: '引っ越し用にエレベーターを予約できますか', note: '大きい建物では予約が必須。埋まっていると引っ越せない' },
    { en: "Do you need a certificate of insurance from the movers?", ja: '引っ越し業者の保険証明が必要ですか', note: 'これが無いと当日建物に入れてもらえない' },
    { en: "Is renters insurance required?", ja: '借家人保険は必須ですか', note: '契約条件になっている物件が多い。月十数ドル' },
    { en: "How many keys do I get?", ja: '鍵は何本もらえますか', note: '追加は有料。同居人の分があるか確認する' },
    { en: "Who do I call if something breaks?", ja: '故障したときはどこに連絡しますか', note: '入居初日に番号を控える。深夜の水漏れで探す羽目になる' },

    // ---- 傷の記録 ----
    { en: "Can we do a walkthrough before I sign?", ja: '署名の前に一緒に部屋を見て回れますか', note: 'walkthrough。これをやらないと退去時に敷金が減る' },
    { en: "There's already a dent in the door.", ja: 'ドアに最初からへこみがあります', note: 'already。自分のせいではないと示す言い方' },
    { en: "The carpet's stained in the corner.", ja: '角のカーペットに染みがあります', note: 'カーペットは張り替え請求が高い。必ず記録する' },
    { en: "Can we note that on the move-in checklist?", ja: 'それを入居時チェックリストに書いてもらえますか', note: '書面に残さないと、退去時に全部こちらの責任になる' },
    { en: "I'm going to take photos, just for the record.", ja: '記録のために写真を撮っておきます', note: '角が立たない言い方。日付入りの写真が最強の証拠になる' },
    { en: "The blinds in the bedroom are broken.", ja: '寝室のブラインドが壊れています', note: '小物ほど退去時に請求されやすい' },
    { en: "Will that get fixed before I move in?", ja: '入居前に直りますか', note: '口約束にせず、直す日付を書面に入れてもらう' },
    { en: "Can we put that in the lease?", ja: 'それを契約書に入れてもらえますか', note: '契約書に無い約束は、存在しないのと同じ' },

    // ---- 署名 ----
    { en: "Can I take this home and read it?", ja: '持ち帰って読んでもいいですか', note: '断られる契約は疑う。急かす相手は必ず何か隠している' },
    { en: "Who else is on the lease?", ja: '契約者は他に誰ですか', note: '名前が載った人全員が家賃全額に責任を負う' },
    { en: "If my roommate leaves, am I on the hook for the whole rent?", ja: 'ルームメイトが出て行ったら、家賃全額を私が負いますか', note: 'on the hook。連帯責任。ここは必ず確認する' },
    { en: "Is subletting allowed?", ja: '又貸しはできますか', note: 'sublet。禁止が多いが、書面で許可が取れることもある' },
    { en: "What's the late fee?", ja: '延滞料はいくらですか', note: '5日過ぎたら家賃の5%、が典型' },
    { en: "There's a five-day grace period.", ja: '5日間の猶予期間があります', note: 'grace period。この日数は覚えておく' },
    { en: "Can I set up autopay?", ja: '自動引き落としにできますか', note: '延滞料を一度も払わない一番簡単な方法' },
    { en: "Does rent go up at renewal?", ja: '更新のときに家賃は上がりますか', note: '契約前に聞く。上がる前提で予算を組む' },
    { en: "We usually go up about three percent.", ja: '例年3%ほど上げています', note: '数字で答えが返ればまだ良心的' },
    { en: "Can you lock the rent for two years?", ja: '2年間は家賃を据え置けますか', note: '長く住む代わりに据え置きを頼む。通ることがある' },

    // ---- 途中解約と退去 ----
    { en: "What if I have to break the lease?", ja: '途中で解約する場合はどうなりますか', note: 'break the lease。契約前に条件を知っておく' },
    { en: "There's a two-month buyout.", ja: '解約金は2か月分です', note: 'buyout。上限が決まっているだけ良い条件' },
    { en: "Can I find someone to take over the lease?", ja: '契約を引き継ぐ人を探してもいいですか', note: '解約金より安く済むことが多い。まずこれを聞く' },
    { en: "I'm giving my sixty-day notice.", ja: '60日前の退去通知をします', note: '日付を書いてメールで送る。口頭は数えてもらえない' },
    { en: "Can we do a pre-move-out inspection?", ja: '退去前に下見をしてもらえますか', note: '先に指摘させれば自分で直せる。敷金が守れる' },
    { en: "Where should I send my forwarding address?", ja: '転送先の住所はどこに送ればいいですか', note: 'これを出さないと敷金の小切手が届かない' },
    { en: "It's been thirty days and I haven't gotten my deposit.", ja: '30日経ちましたが敷金が返ってきません', note: '期限を過ぎると法的にこちらが強くなる。日数を口に出す' },
    { en: "I'd like an itemized statement of what you took out.", ja: '差し引いた分の内訳明細をください', note: '内訳を出せない天引きは引っ込むことが多い' },
    { en: "That was there when I moved in — I have photos.", ja: '入居時からありました。写真があります', note: 'この一文を言うために、入居日に写真を撮っておく' },
];
