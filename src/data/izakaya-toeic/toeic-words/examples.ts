// 金フレ式 穴埋め例文 (310語)。word をキーに {en, ja}。
// 各 en は対象語をそのまま含む(穴埋め成立)。TOEIC中級文脈。
// 生成: Workflow(toeic-310-examples, 62エージェント Write31+Verify31)。検証済み(word欠落0)。
// UI(/english/toeic/words)が対象語を a------- 形式に伏せて出題に使う。

export interface WordExample { en: string; ja: string; }

export const WORD_EXAMPLES: Record<string, WordExample> = {
  "preliminary": {
    "en": "The preliminary results of our market survey will be ready by Friday.",
    "ja": "市場調査の予備的な結果は金曜日までにまとまります。"
  },
  "mandatory": {
    "en": "Attendance at tomorrow's safety training is mandatory for all warehouse staff.",
    "ja": "明日の安全研修への出席は全倉庫スタッフにとって必須です。"
  },
  "claim": {
    "en": "Several customers claim that the new software keeps crashing during meetings.",
    "ja": "複数の顧客が、新しいソフトが会議中にクラッシュし続けると主張しています。"
  },
  "adjacent": {
    "en": "The conference room is adjacent to the main reception area.",
    "ja": "会議室はメインの受付エリアに隣接しています。"
  },
  "revenue": {
    "en": "The company's annual revenue increased by twelve percent last year.",
    "ja": "その会社の年間収益は昨年12パーセント増加しました。"
  },
  "comply": {
    "en": "All employees must comply with the new safety regulations immediately.",
    "ja": "全従業員は新しい安全規則に直ちに従わなければならない。"
  },
  "surplus": {
    "en": "We have a surplus of inventory, so the warehouse is nearly full.",
    "ja": "在庫に余剰があるため、倉庫はほぼ満杯です。"
  },
  "eligible": {
    "en": "Employees become eligible for the bonus after one full year of service.",
    "ja": "従業員は丸一年勤務するとボーナスの受給資格を得る。"
  },
  "accommodate": {
    "en": "The new conference room can accommodate up to fifty participants comfortably.",
    "ja": "新しい会議室は最大50人の参加者を快適に収容できます。"
  },
  "notwithstanding": {
    "en": "Notwithstanding the heavy rain, the outdoor product launch went ahead as planned.",
    "ja": "激しい雨にもかかわらず、屋外での製品発表は予定通り行われました。"
  },
  "substantial": {
    "en": "The new contract brought a substantial increase in our annual revenue.",
    "ja": "新しい契約は当社の年間売上にかなりの増加をもたらした。"
  },
  "fiscal": {
    "en": "We need to finalize the budget before the end of the fiscal year.",
    "ja": "会計年度の終わりまでに予算を確定させる必要がある。"
  },
  "sensible": {
    "en": "Cutting travel costs is a sensible way to reduce our expenses.",
    "ja": "出張費を削るのは経費を減らす賢明な方法だ。"
  },
  "credentials": {
    "en": "Please bring your credentials to verify your identity at the front desk.",
    "ja": "受付で本人確認のため資格証明書をお持ちください。"
  },
  "verify": {
    "en": "The accounting team will verify all the figures before the audit.",
    "ja": "会計チームは監査前にすべての数字を確認する。"
  },
  "authorize": {
    "en": "Only the manager can authorize a refund larger than fifty dollars.",
    "ja": "50ドルを超える返金は部長だけが承認できる。"
  },
  "initiative": {
    "en": "The marketing initiative helped us attract many new overseas clients.",
    "ja": "そのマーケティングの取り組みは多くの新しい海外顧客の獲得に役立った。"
  },
  "comprehensive": {
    "en": "The report provides a comprehensive overview of the regional sales results.",
    "ja": "その報告書は地域の売上結果の包括的な概要を提供している。"
  },
  "confidential": {
    "en": "Please keep these financial documents confidential until the official announcement.",
    "ja": "公式発表まで、これらの財務書類は機密扱いにしてください。"
  },
  "albeit": {
    "en": "The project was completed on time, albeit slightly over the budget.",
    "ja": "そのプロジェクトは、予算を少し超えたものの、期限通りに完了した。"
  },
  "implement": {
    "en": "The company plans to implement the new policy starting next month.",
    "ja": "会社は来月から新しい方針を実施する予定です。"
  },
  "forthcoming": {
    "en": "Please review the agenda before the forthcoming board meeting on Friday.",
    "ja": "金曜日に予定されている取締役会の前に、議題を確認してください。"
  },
  "negotiate": {
    "en": "Our sales team will negotiate the contract terms with the supplier tomorrow.",
    "ja": "営業チームは明日、サプライヤーと契約条件を交渉します。"
  },
  "prospective": {
    "en": "The manager met with several prospective clients during the trade fair.",
    "ja": "マネージャーは見本市で見込み客数名と面会しました。"
  },
  "reimburse": {
    "en": "The company will reimburse you for any travel expenses you incur.",
    "ja": "会社はあなたが負担した出張費をすべて払い戻します。"
  },
  "tentative": {
    "en": "We have set a tentative date for the conference, but it may change.",
    "ja": "会議の仮の日程を設定しましたが、変更の可能性があります。"
  },
  "exempt": {
    "en": "Part-time staff are exempt from the mandatory overtime policy this quarter.",
    "ja": "今四半期、パートタイムの社員は強制残業の方針を免除されます。"
  },
  "specify": {
    "en": "Please specify your preferred delivery date when you submit the order form.",
    "ja": "注文書を提出する際は、希望の配送日を明示してください。"
  },
  "adequate": {
    "en": "The budget should be adequate to cover the marketing costs this year.",
    "ja": "その予算は今年のマーケティング費用を賄うのに十分なはずです。"
  },
  "whereas": {
    "en": "Sales rose sharply in Asia, whereas they declined slightly in Europe.",
    "ja": "アジアでは売上が急増したのに対し、欧州ではわずかに減少しました。"
  },
  "inventory": {
    "en": "We need to check the inventory before placing a new order with the supplier.",
    "ja": "新しい注文を業者に出す前に在庫を確認する必要があります。"
  },
  "acquisition": {
    "en": "The company announced its acquisition of a smaller rival last week.",
    "ja": "その会社は先週、より小規模な競合他社の買収を発表しました。"
  },
  "allocate": {
    "en": "The committee will allocate additional funds to the marketing team this fiscal year.",
    "ja": "委員会は今年度、マーケティングチームに追加の資金を割り当てる予定だ。"
  },
  "oversight": {
    "en": "The missing signature was simply an oversight, not a serious problem.",
    "ja": "署名漏れは単なる見落としであり、深刻な問題ではありませんでした。"
  },
  "vendor": {
    "en": "Our regular vendor offered us a discount on bulk paper orders.",
    "ja": "いつもの業者が、紙の大量注文に割引を提供してくれました。"
  },
  "audit": {
    "en": "The accounting firm will conduct an audit of our finances next month.",
    "ja": "会計事務所が来月、当社の財務監査を実施します。"
  },
  "consolidate": {
    "en": "The firm plans to consolidate its three offices into a single downtown location.",
    "ja": "その会社は3つのオフィスを一つの都心の拠点に統合する予定だ。"
  },
  "expedite": {
    "en": "Please expedite the shipment so it arrives before the client's deadline.",
    "ja": "顧客の締め切り前に届くよう、出荷を迅速に進めてください。"
  },
  "proficient": {
    "en": "The new assistant is highly proficient in both Japanese and English.",
    "ja": "新しいアシスタントは日本語と英語の両方に非常に堪能です。"
  },
  "subsequently": {
    "en": "The contract was signed, and the goods were subsequently delivered on time.",
    "ja": "契約が結ばれ、その後、商品は予定通りに納品されました。"
  },
  "feasible": {
    "en": "The engineers confirmed that the proposed deadline is still feasible.",
    "ja": "技術者たちは、提案された締め切りが今も実行可能だと確認しました。"
  },
  "stipulate": {
    "en": "The contract clearly stipulates that payment is due within thirty days.",
    "ja": "その契約は、支払いが30日以内に行われると明確に規定しています。"
  },
  "curtail": {
    "en": "Management decided to curtail travel expenses to reduce the budget.",
    "ja": "経営陣は予算を減らすために出張費を削減することに決めた。"
  },
  "amend": {
    "en": "We need to amend the agreement before both parties sign it.",
    "ja": "両者が署名する前に契約書を修正する必要がある。"
  },
  "itinerary": {
    "en": "Please review your itinerary and confirm the flight times for the trip.",
    "ja": "旅程を確認して、出張のフライト時刻を確定してください。"
  },
  "invoice": {
    "en": "We will issue the invoice once the shipment has been delivered.",
    "ja": "商品が納品され次第、請求書を発行いたします。"
  },
  "endorse": {
    "en": "Several senior managers decided to endorse the new marketing strategy at the meeting.",
    "ja": "数人の上級管理職が会議で新しいマーケティング戦略を支持することにした。"
  },
  "lease": {
    "en": "The company signed a five-year lease for the downtown office.",
    "ja": "その会社は中心街のオフィスについて5年間の賃貸借契約を結んだ。"
  },
  "alleviate": {
    "en": "The new scheduling software should alleviate the pressure on our support team.",
    "ja": "新しいスケジュール管理ソフトは、サポートチームの負担を軽減するはずです。"
  },
  "pursuant": {
    "en": "Pursuant to the new policy, all reports must be submitted online.",
    "ja": "新しい方針に従って、すべての報告書はオンラインで提出されなければならない。"
  },
  "merger": {
    "en": "The merger between the two firms was finalized after months of negotiation.",
    "ja": "2社間の合併は、数ヶ月の交渉を経て成立した。"
  },
  "subsidiary": {
    "en": "The company opened a new subsidiary in Singapore last year.",
    "ja": "その会社は昨年シンガポールに新しい子会社を設立した。"
  },
  "inaugurate": {
    "en": "The board will inaugurate the new CEO at next month's annual meeting.",
    "ja": "取締役会は来月の年次総会で新CEOを就任させる予定だ。"
  },
  "remunerate": {
    "en": "The firm promised to remunerate the consultants fairly for their additional work.",
    "ja": "その会社はコンサルタントの追加業務に対して公正に報酬を支払うと約束した。"
  },
  "deteriorate": {
    "en": "Customer satisfaction began to deteriorate after the service fees increased.",
    "ja": "サービス料が上がった後、顧客満足度は悪化し始めました。"
  },
  "scrutinize": {
    "en": "Auditors will scrutinize every invoice before they approve the final payment.",
    "ja": "監査人は最終的な支払いを承認する前に、すべての請求書を精査する。"
  },
  "facilitate": {
    "en": "The new software is designed to facilitate communication between remote teams.",
    "ja": "その新しいソフトは、遠隔チーム間のコミュニケーションを促進するよう設計されている。"
  },
  "procurement": {
    "en": "The procurement team is reviewing bids from three different vendors.",
    "ja": "調達チームは三社の異なる業者からの入札を検討している。"
  },
  "fluctuate": {
    "en": "Oil prices tend to fluctuate depending on global demand.",
    "ja": "原油価格は世界の需要によって変動する傾向があります。"
  },
  "henceforth": {
    "en": "Henceforth, all expense reports must be submitted through the online portal.",
    "ja": "今後は、すべての経費報告をオンラインポータル経由で提出しなければならない。"
  },
  "benchmark": {
    "en": "We use last year's sales figures as a benchmark for this quarter.",
    "ja": "私たちは昨年の売上数値を今四半期の基準として使っています。"
  },
  "metrics": {
    "en": "The marketing team tracks several metrics to measure each campaign's success.",
    "ja": "マーケティングチームは各キャンペーンの成功を測るためにいくつかの指標を追跡しています。"
  },
  "mitigate": {
    "en": "We adopted new safety measures to mitigate the risk of equipment failure.",
    "ja": "機器の故障リスクを軽減するため、新しい安全対策を導入しました。"
  },
  "protocol": {
    "en": "All employees must follow the safety protocol when entering the factory floor.",
    "ja": "全従業員は工場のフロアに入る際、安全手順に従わなければなりません。"
  },
  "tenure": {
    "en": "During her tenure as director, the company expanded into three new markets.",
    "ja": "彼女の取締役在任期間中に、会社は3つの新市場へ進出しました。"
  },
  "discretion": {
    "en": "Managers may approve small expenses at their own discretion.",
    "ja": "管理職は少額の経費を自らの裁量で承認してよい。"
  },
  "warranty": {
    "en": "This laptop comes with a two-year warranty covering all parts.",
    "ja": "このノートパソコンには、全部品を対象とする2年間の保証が付いています。"
  },
  "contingent": {
    "en": "Our expansion plan is contingent on approval from the head office.",
    "ja": "我々の拡大計画は本社の承認次第です。"
  },
  "naive": {
    "en": "It was naive of us to assume the contract would be signed without negotiation.",
    "ja": "交渉なしに契約が結ばれると思い込んだのは、私たちの考えが甘かったです。"
  },
  "statutory": {
    "en": "Employees are entitled to the statutory minimum number of paid holidays each year.",
    "ja": "従業員は毎年、法定の最低限の有給休暇日数を取得する権利があります。"
  },
  "leverage": {
    "en": "We can leverage our existing client network to expand into the new market.",
    "ja": "既存の顧客ネットワークを活用して、新市場へ進出できます。"
  },
  "proponent": {
    "en": "She has always been a strong proponent of flexible remote work policies.",
    "ja": "彼女は以前から柔軟なリモートワーク制度の強力な支持者です。"
  },
  "mandate": {
    "en": "The new policy will mandate that all staff complete safety training annually.",
    "ja": "新しい方針では、全社員に毎年の安全研修の受講を義務づけます。"
  },
  "endeavor": {
    "en": "We appreciate your endeavor to deliver the project ahead of schedule.",
    "ja": "予定より早くプロジェクトを納品しようとするあなたの努力に感謝します。"
  },
  "depreciation": {
    "en": "The accountant calculated the depreciation of the office equipment for this fiscal year.",
    "ja": "会計士は今年度のオフィス機器の減価償却を計算しました。"
  },
  "ramification": {
    "en": "Management discussed every ramification of closing the regional branch office.",
    "ja": "経営陣は地方支店を閉鎖することのあらゆる影響を検討しました。"
  },
  "resume": {
    "en": "After the lunch break, the committee will resume the budget discussion at two.",
    "ja": "昼休みのあと、委員会は二時に予算の議論を再開します。"
  },
  "proprietor": {
    "en": "The proprietor of the cafe agreed to supply coffee for our morning meetings.",
    "ja": "そのカフェの経営者は、朝の会議用にコーヒーを提供することに同意しました。"
  },
  "delegate": {
    "en": "The director will delegate the budget review to her assistant next week.",
    "ja": "部長は来週、予算の見直しをアシスタントに委任する予定だ。"
  },
  "reciprocal": {
    "en": "The two companies signed a reciprocal agreement to share their research data.",
    "ja": "二社は研究データを共有する相互協定に署名しました。"
  },
  "litigation": {
    "en": "The company hopes to settle the dispute before it reaches litigation.",
    "ja": "会社はその紛争が訴訟になる前に解決したいと考えている。"
  },
  "robust": {
    "en": "Our company reported robust sales growth in the third quarter.",
    "ja": "当社は第3四半期に力強い売上成長を報告した。"
  },
  "waive": {
    "en": "The bank agreed to waive the transfer fee for loyal customers.",
    "ja": "銀行は常連客に対して振込手数料を免除することに同意した。"
  },
  "prospectus": {
    "en": "Investors should read the prospectus carefully before buying any shares.",
    "ja": "投資家は株を購入する前に目論見書を注意深く読むべきだ。"
  },
  "revamp": {
    "en": "The marketing team decided to revamp the website before the product launch.",
    "ja": "マーケティングチームは製品発売前にウェブサイトを一新することに決めた。"
  },
  "incur": {
    "en": "If you cancel late, you may incur an additional service charge.",
    "ja": "キャンセルが遅れると、追加のサービス料金が発生する場合があります。"
  },
  "consent": {
    "en": "We cannot share your personal data without your written consent.",
    "ja": "お客様の書面による同意なしに個人データを共有することはできません。"
  },
  "concur": {
    "en": "Most board members concur that we should expand into overseas markets.",
    "ja": "ほとんどの役員は海外市場に進出すべきだという点で一致している。"
  },
  "arbitration": {
    "en": "Both companies agreed to settle the dispute through arbitration.",
    "ja": "両社は仲裁を通じて紛争を解決することに同意しました。"
  },
  "solicit": {
    "en": "We plan to solicit feedback from clients before launching the new service.",
    "ja": "新サービスを開始する前に、顧客から意見を募るつもりです。"
  },
  "pertinent": {
    "en": "Please include only the pertinent details in your monthly report.",
    "ja": "月次報告には関連する詳細だけを記載してください。"
  },
  "dispose": {
    "en": "Employees must dispose of confidential documents in the secure bins.",
    "ja": "従業員は機密文書を専用の安全な箱に処分しなければなりません。"
  },
  "turnover": {
    "en": "The high staff turnover last year increased our recruitment costs significantly.",
    "ja": "昨年の高い離職率は、採用コストを大幅に増加させました。"
  },
  "defer": {
    "en": "The board decided to defer the final decision until next month.",
    "ja": "取締役会は最終決定を来月まで延期することにしました。"
  },
  "prevail": {
    "en": "Despite tough competition, our strong customer service helped us prevail.",
    "ja": "厳しい競争にもかかわらず、優れた顧客サービスのおかげで私たちは打ち勝ちました。"
  },
  "fiduciary": {
    "en": "As a manager, she has a fiduciary duty to act in shareholders' interests.",
    "ja": "管理職として、彼女は株主の利益のために行動する受託者としての義務を負っています。"
  },
  "viable": {
    "en": "After reviewing the budget, the team decided the new branch was no longer viable.",
    "ja": "予算を見直した結果、チームは新支店はもはや実現可能ではないと判断した。"
  },
  "accrue": {
    "en": "Interest will accrue on the unpaid balance until the invoice is settled.",
    "ja": "請求書が清算されるまで、未払い残高に利息が生じます。"
  },
  "insolvency": {
    "en": "The supplier filed for insolvency after losing its largest contract.",
    "ja": "その供給業者は最大の契約を失った後、支払い不能を申し立てました。"
  },
  "candidate": {
    "en": "The most qualified candidate for the manager position will start next Monday.",
    "ja": "マネージャー職に最も適した候補者は来週月曜日に着任します。"
  },
  "applicant": {
    "en": "Each applicant must submit a resume and two references by Friday.",
    "ja": "各応募者は金曜日までに履歴書と推薦状2通を提出しなければなりません。"
  },
  "supervisor": {
    "en": "Please ask your supervisor to approve the budget before you order the supplies.",
    "ja": "備品を発注する前に、上司に予算を承認してもらってください。"
  },
  "subordinate": {
    "en": "A good manager listens carefully to every subordinate before making a decision.",
    "ja": "優れた管理職は決定を下す前にすべての部下の意見に耳を傾けます。"
  },
  "patron": {
    "en": "As a loyal patron of the restaurant, she receives a discount every visit.",
    "ja": "そのレストランの常連客として、彼女は来店のたびに割引を受けています。"
  },
  "spokesperson": {
    "en": "The company spokesperson announced the merger at this morning's press conference.",
    "ja": "会社の広報担当者が今朝の記者会見で合併を発表しました。"
  },
  "pedestrian": {
    "en": "Drivers must stop and let every pedestrian cross at the marked crosswalk.",
    "ja": "運転手は横断歩道ですべての歩行者を渡らせるために停止しなければなりません。"
  },
  "eloquent": {
    "en": "Her eloquent speech convinced the board to fund the new project.",
    "ja": "彼女の雄弁なスピーチは取締役会に新プロジェクトへの出資を決意させました。"
  },
  "tenant": {
    "en": "Every tenant in the building must pay rent by the first of the month.",
    "ja": "そのビルのすべての入居者は毎月1日までに家賃を支払わなければなりません。"
  },
  "amenity": {
    "en": "The hotel offers a free breakfast as a popular amenity for guests.",
    "ja": "そのホテルは宿泊客に人気の設備として無料の朝食を提供しています。"
  },
  "shareholder": {
    "en": "Every shareholder will receive a detailed report before the annual meeting next month.",
    "ja": "各株主は来月の年次総会の前に詳細な報告書を受け取ります。"
  },
  "representative": {
    "en": "A sales representative will visit our office on Thursday to discuss the contract.",
    "ja": "営業担当者が契約について話し合うため木曜日に当社のオフィスを訪問します。"
  },
  "accountant": {
    "en": "Our accountant prepared all the tax documents before the filing deadline.",
    "ja": "当社の会計士は申告期限までにすべての税務書類を作成しました。"
  },
  "treasurer": {
    "en": "The club treasurer reported that the budget had a small surplus this year.",
    "ja": "クラブの会計係は今年予算に少し余剰があったと報告しました。"
  },
  "executive": {
    "en": "A senior executive from headquarters will lead the meeting tomorrow morning.",
    "ja": "本社の上級幹部が明日の朝の会議を主導します。"
  },
  "consultant": {
    "en": "We hired an outside consultant to improve our marketing strategy this quarter.",
    "ja": "今四半期のマーケティング戦略を改善するため社外のコンサルタントを雇いました。"
  },
  "affluent": {
    "en": "The new store is located in an affluent neighborhood near the city center.",
    "ja": "新しい店舗は市の中心部近くの裕福な地区にあります。"
  },
  "commute": {
    "en": "Many employees commute to the office by train every weekday morning.",
    "ja": "多くの従業員は平日の朝、電車で会社に通勤します。"
  },
  "proprietary": {
    "en": "Employees must not share the company's proprietary software with competitors.",
    "ja": "従業員は、会社の専有ソフトウェアを競合他社と共有してはなりません。"
  },
  "stakeholder": {
    "en": "We must inform every stakeholder before we finalize the merger agreement.",
    "ja": "合併契約を最終決定する前に、すべての利害関係者に知らせなければなりません。"
  },
  "intern": {
    "en": "Our new intern will help organize the files during the summer.",
    "ja": "新しいインターンが夏の間、ファイルの整理を手伝ってくれます。"
  },
  "recipient": {
    "en": "Please confirm that the recipient received the contract by email.",
    "ja": "受取人が契約書をメールで受領したか確認してください。"
  },
  "novice": {
    "en": "As a novice, she still needs guidance on preparing financial reports.",
    "ja": "新人なので、彼女はまだ財務報告書の作成に指導が必要です。"
  },
  "colleague": {
    "en": "I asked my colleague to cover the meeting while I was away.",
    "ja": "私が不在の間、会議を代わってもらうよう同僚に頼みました。"
  },
  "attorney": {
    "en": "Our attorney reviewed the contract before we signed it yesterday.",
    "ja": "昨日契約書に署名する前に、弁護士がそれを確認しました。"
  },
  "provisional": {
    "en": "We reached a provisional agreement that still requires final approval.",
    "ja": "最終承認が必要な暫定的な合意に達しました。"
  },
  "postpone": {
    "en": "We had to postpone the meeting because the client was stuck in traffic.",
    "ja": "クライアントが渋滞に巻き込まれたため、会議を延期しなければなりませんでした。"
  },
  "submit": {
    "en": "Please submit your expense report to the accounting department by Friday afternoon.",
    "ja": "金曜日の午後までに経費報告書を経理部に提出してください。"
  },
  "revise": {
    "en": "The manager asked me to revise the proposal before sending it to investors.",
    "ja": "マネージャーは、投資家に送る前に提案書を修正するよう私に頼みました。"
  },
  "terminate": {
    "en": "The company decided to terminate the contract due to repeated delivery delays.",
    "ja": "度重なる納品の遅れにより、会社はその契約を終了することに決めました。"
  },
  "nominate": {
    "en": "Our team plans to nominate Sarah for the employee of the year award.",
    "ja": "私たちのチームは、年間最優秀社員賞にサラを推薦する予定です。"
  },
  "appoint": {
    "en": "The board voted to appoint Mr. Tanaka as the new regional director.",
    "ja": "取締役会は、田中氏を新しい地域責任者に任命することを票決しました。"
  },
  "resign": {
    "en": "She decided to resign from her position after working there for ten years.",
    "ja": "彼女はそこで10年間働いた後、その職を辞任することに決めました。"
  },
  "designate": {
    "en": "The company will designate a specific area for visitors to park their cars.",
    "ja": "会社は、来訪者が車を駐車するための特定のエリアを指定します。"
  },
  "circumvent": {
    "en": "Employees should never try to circumvent the company's security procedures.",
    "ja": "従業員は、会社のセキュリティ手順を回避しようとしてはいけません。"
  },
  "recruit": {
    "en": "We need to recruit three new sales staff before the busy season starts.",
    "ja": "繁忙期が始まる前に、新しい営業スタッフを3人採用する必要があります。"
  },
  "distribute": {
    "en": "Please distribute these handouts to everyone attending the morning meeting.",
    "ja": "朝の会議に出席する全員に、この配布資料を配ってください。"
  },
  "accumulate": {
    "en": "Over the years, the company managed to accumulate a large customer base.",
    "ja": "長年かけて、その会社は大きな顧客基盤を蓄積することができました。"
  },
  "anticipate": {
    "en": "We anticipate strong demand for the new product after the launch.",
    "ja": "発売後、新製品への強い需要を予期しています。"
  },
  "compensate": {
    "en": "The airline offered to compensate passengers for the delayed flight.",
    "ja": "その航空会社は、遅延した便について乗客に補償することを申し出ました。"
  },
  "compromise": {
    "en": "Both managers had to compromise to reach a fair agreement.",
    "ja": "両方のマネージャーは、公平な合意に達するために妥協しなければなりませんでした。"
  },
  "demonstrate": {
    "en": "The engineer will demonstrate how the new software works during the seminar.",
    "ja": "そのエンジニアは、セミナーで新しいソフトの動作を実演します。"
  },
  "devote": {
    "en": "She decided to devote more time to training her junior colleagues.",
    "ja": "彼女は後輩の指導にもっと時間を捧げることに決めました。"
  },
  "disclose": {
    "en": "The company is not allowed to disclose its clients' personal information.",
    "ja": "その会社は顧客の個人情報を開示することを許されていません。"
  },
  "unprecedented": {
    "en": "The factory reached an unprecedented level of output last December.",
    "ja": "その工場は昨年12月に前例のない生産量に達した。"
  },
  "calculate": {
    "en": "Please calculate the total shipping cost before you send the invoice.",
    "ja": "請求書を送る前に、送料の合計を計算してください。"
  },
  "eliminate": {
    "en": "We need to eliminate unnecessary steps to make the process faster.",
    "ja": "プロセスを速くするために、不要な手順を排除する必要があります。"
  },
  "distinguish": {
    "en": "It is hard to distinguish the new model from the older one.",
    "ja": "新しいモデルを古いものと見分けるのは難しいです。"
  },
  "enhance": {
    "en": "This software update will enhance the security of our network.",
    "ja": "このソフトウェアの更新は、当社のネットワークのセキュリティを高めます。"
  },
  "procure": {
    "en": "Our team must procure the necessary equipment before the project begins.",
    "ja": "プロジェクト開始前に、私たちのチームは必要な機材を調達しなければなりません。"
  },
  "remuneration": {
    "en": "The contract clearly states the remuneration for overtime work.",
    "ja": "契約書には残業に対する報酬が明確に記載されています。"
  },
  "complimentary": {
    "en": "The hotel offers a complimentary breakfast to all guests every morning.",
    "ja": "そのホテルは毎朝、全宿泊客に無料の朝食を提供している。"
  },
  "consecutive": {
    "en": "Our sales have increased for five consecutive months this year.",
    "ja": "当社の売上は今年5か月連続で増加している。"
  },
  "considerable": {
    "en": "The new factory required a considerable amount of investment from the company.",
    "ja": "新工場には、会社からのかなりの額の投資が必要だった。"
  },
  "compatible": {
    "en": "This software is fully compatible with the latest version of our operating system.",
    "ja": "このソフトウェアは、当社のOSの最新版と完全に互換性がある。"
  },
  "compulsory": {
    "en": "Attendance at the safety training session is compulsory for all new employees.",
    "ja": "安全研修への出席は、全新入社員にとって義務である。"
  },
  "concurrent": {
    "en": "The manager scheduled two concurrent meetings, so she had to delegate one.",
    "ja": "部長は2つの会議を同時に設定したため、片方を委任しなければならなかった。"
  },
  "detrimental": {
    "en": "Frequent delivery delays can be detrimental to our relationship with key clients.",
    "ja": "頻繁な配送遅延は、主要顧客との関係に有害になりうる。"
  },
  "elaborate": {
    "en": "Could you elaborate on the marketing strategy you mentioned during the meeting?",
    "ja": "会議中に触れたマーケティング戦略について、詳しく説明していただけますか。"
  },
  "indispensable": {
    "en": "Her expertise in negotiation makes her indispensable to the sales team.",
    "ja": "交渉に関する彼女の専門知識は、営業チームにとって不可欠だ。"
  },
  "exclusive": {
    "en": "This lounge offers exclusive access to our premium business-class members only.",
    "ja": "このラウンジは、プレミアムビジネスクラス会員だけが利用できる独占的なアクセスを提供します。"
  },
  "extensive": {
    "en": "Our team conducted extensive research before launching the new product line.",
    "ja": "私たちのチームは、新しい製品ラインを発売する前に広範な調査を行いました。"
  },
  "explicit": {
    "en": "Please give explicit instructions so the supplier knows exactly what we need.",
    "ja": "サプライヤーが私たちの必要なものを正確に把握できるよう、明確な指示を出してください。"
  },
  "genuine": {
    "en": "Customers appreciate the genuine concern our staff show for their needs.",
    "ja": "お客様は、スタッフがお客様のニーズに対して示す心からの配慮を高く評価しています。"
  },
  "imminent": {
    "en": "The manager warned the staff that an audit was imminent next week.",
    "ja": "マネージャーはスタッフに、来週監査が差し迫っていると警告しました。"
  },
  "imperative": {
    "en": "It is imperative that all employees submit their reports before Friday.",
    "ja": "全従業員が金曜日までに報告書を提出することは必須です。"
  },
  "lucrative": {
    "en": "The merger opened up a lucrative market for the company in Asia.",
    "ja": "その合併は、アジアにおいて会社にとって収益性の高い市場を開きました。"
  },
  "meticulous": {
    "en": "The accountant is known for her meticulous attention to every detail.",
    "ja": "その会計士は、あらゆる細部に対する細心の注意で知られています。"
  },
  "stringent": {
    "en": "The factory must follow stringent safety regulations to pass the inspection.",
    "ja": "その工場は、検査に合格するために厳格な安全規制に従わなければなりません。"
  },
  "prevalent": {
    "en": "Remote work has become increasingly prevalent among our overseas branches.",
    "ja": "リモートワークは海外支社の間でますます広く普及してきました。"
  },
  "incidental": {
    "en": "The contract covers travel costs and any incidental expenses during the trip.",
    "ja": "その契約は出張中の旅費とあらゆる付随的な費用を対象としている。"
  },
  "inadvertent": {
    "en": "She apologized for the inadvertent error in last month's sales report.",
    "ja": "彼女は先月の売上報告書のうっかりしたミスについて謝罪した。"
  },
  "obsolete": {
    "en": "We replaced the obsolete software because it no longer supported our new systems.",
    "ja": "その時代遅れのソフトは新しいシステムにもう対応していなかったので、私たちは交換した。"
  },
  "optimal": {
    "en": "The team scheduled the meeting in the afternoon for optimal attendance.",
    "ja": "チームは最適な出席率のために会議を午後に設定した。"
  },
  "permissible": {
    "en": "Casual clothing is permissible on Fridays according to the new office policy.",
    "ja": "新しいオフィス方針によれば、金曜日はカジュアルな服装が許容される。"
  },
  "plausible": {
    "en": "The manager offered a plausible explanation for the sudden drop in sales.",
    "ja": "部長は売上の急な落ち込みについてもっともらしい説明をした。"
  },
  "negligible": {
    "en": "The price difference between the two suppliers was negligible, so we kept our current one.",
    "ja": "二社の仕入先の価格差は無視できるほど小さかったので、私たちは現在の業者を続けた。"
  },
  "inevitable": {
    "en": "With demand rising so quickly, a price increase seemed inevitable this quarter.",
    "ja": "需要がこれほど急速に高まる中、今四半期の値上げは避けられないように思えた。"
  },
  "quintessential": {
    "en": "His punctual and polite manner makes him the quintessential professional employee.",
    "ja": "彼の時間に正確で礼儀正しい振る舞いは、彼を典型的なプロの社員にしている。"
  },
  "formidable": {
    "en": "Our new competitor is a formidable rival in the overseas market.",
    "ja": "私たちの新しい競合は海外市場で手ごわいライバルだ。"
  },
  "versatile": {
    "en": "She is a versatile employee who handles sales, design, and support.",
    "ja": "彼女は営業、デザイン、サポートをこなす多才な社員だ。"
  },
  "renowned": {
    "en": "We hired a renowned consultant to review our marketing strategy.",
    "ja": "私たちは有名なコンサルタントを雇ってマーケティング戦略を見直した。"
  },
  "surpass": {
    "en": "This quarter's sales are expected to surpass last year's record.",
    "ja": "今四半期の売上は昨年の記録を上回る見込みだ。"
  },
  "contingency": {
    "en": "We need a contingency plan in case the shipment is delayed.",
    "ja": "出荷が遅れた場合に備えて不測の事態への計画が必要だ。"
  },
  "disparity": {
    "en": "There is a wide disparity in salaries between the two departments.",
    "ja": "その二つの部署の間には大きな給与の格差がある。"
  },
  "conglomerate": {
    "en": "The giant conglomerate owns hotels, airlines, and media companies.",
    "ja": "その巨大な複合企業はホテル、航空、メディア会社を所有している。"
  },
  "account for": {
    "en": "Travel expenses account for nearly half of the project budget this quarter.",
    "ja": "出張費は今四半期のプロジェクト予算のほぼ半分を占めている。"
  },
  "bring about": {
    "en": "The new software update will bring about major changes to our workflow.",
    "ja": "新しいソフトウェアの更新は、私たちの業務フローに大きな変化をもたらすだろう。"
  },
  "carry out": {
    "en": "Our team will carry out the market survey before the end of next month.",
    "ja": "私たちのチームは来月末までに市場調査を実行する予定だ。"
  },
  "come across": {
    "en": "We sometimes come across useful market data while browsing competitor websites.",
    "ja": "私たちは競合他社のサイトを見ている時に、役立つ市場データに偶然出くわすことがある。"
  },
  "draw up": {
    "en": "The legal team will draw up a new agreement for both companies to sign.",
    "ja": "法務チームは両社が署名するための新しい契約書を作成する。"
  },
  "figure out": {
    "en": "We need to figure out why sales dropped sharply in the eastern region.",
    "ja": "東部地域で売上が急落した理由を解明する必要がある。"
  },
  "in lieu of": {
    "en": "Employees may take a paid day off in lieu of overtime pay.",
    "ja": "従業員は残業代の代わりに有給休暇を取得することができる。"
  },
  "phase out": {
    "en": "The company plans to phase out the older models by next spring.",
    "ja": "その会社は来春までに旧型モデルを段階的に廃止する予定だ。"
  },
  "on behalf of": {
    "en": "I am writing this email on behalf of our regional sales director.",
    "ja": "私はこのメールを地域営業部長を代表して書いています。"
  },
  "follow up": {
    "en": "I'll follow up with the client by email after our meeting tomorrow.",
    "ja": "明日の会議のあと、メールでお客様にフォローします。"
  },
  "keep track of": {
    "en": "We use a shared spreadsheet to keep track of all project expenses.",
    "ja": "私たちはプロジェクトの全経費を把握するため、共有スプレッドシートを使っています。"
  },
  "look into": {
    "en": "Our team will look into the shipping delay and report back by Friday.",
    "ja": "うちのチームが配送の遅れを調査し、金曜までに報告します。"
  },
  "put forward": {
    "en": "She put forward a new marketing plan at the board meeting.",
    "ja": "彼女は役員会議で新しいマーケティング案を提案した。"
  },
  "rule out": {
    "en": "We cannot rule out the possibility of a price increase next quarter.",
    "ja": "来四半期の値上げの可能性を除外することはできません。"
  },
  "take effect": {
    "en": "The new office policy will take effect at the start of next month.",
    "ja": "新しいオフィスの方針は来月初めに施行されます。"
  },
  "turn down": {
    "en": "The manager had to turn down the supplier's offer because it was too expensive.",
    "ja": "高すぎたため、部長はその仕入先の申し出を断らざるを得なかった。"
  },
  "in compliance with": {
    "en": "All employees must handle customer data in compliance with the privacy regulations.",
    "ja": "全従業員はプライバシー規則に準拠して顧客データを扱わなければならない。"
  },
  "wrap up": {
    "en": "Let's wrap up the meeting now and continue this discussion tomorrow.",
    "ja": "そろそろ会議を終わらせて、この議論は明日続けましょう。"
  },
  "corroborate": {
    "en": "Two independent reports corroborate the findings of our internal audit.",
    "ja": "二つの独立した報告書が、社内監査の結果を裏付けている。"
  },
  "prior to": {
    "en": "Please submit all expense reports prior to the end of the month.",
    "ja": "すべての経費報告書を月末より前に提出してください。"
  },
  "as of": {
    "en": "As of next Monday, the new vacation policy will take effect.",
    "ja": "次の月曜日時点で、新しい休暇規定が施行されます。"
  },
  "owing to": {
    "en": "The shipment was delayed owing to severe weather along the coast.",
    "ja": "その出荷は、沿岸部の悪天候のために遅れました。"
  },
  "in conjunction with": {
    "en": "We launched the campaign in conjunction with our overseas partners.",
    "ja": "私たちは海外のパートナーと共同でそのキャンペーンを開始しました。"
  },
  "with regard to": {
    "en": "I have a few questions with regard to the new pricing structure.",
    "ja": "新しい価格体系に関して、いくつか質問があります。"
  },
  "pertaining to": {
    "en": "Please forward any documents pertaining to the merger to my office.",
    "ja": "合併に関連する書類はすべて私のオフィスに転送してください。"
  },
  "to no avail": {
    "en": "We tried to reach the supplier all morning, but to no avail.",
    "ja": "午前中ずっと取引先に連絡を試みましたが、無駄でした。"
  },
  "disseminate": {
    "en": "The manager used the newsletter to disseminate the updated safety guidelines.",
    "ja": "そのマネージャーは、更新された安全指針を広めるために社内報を使いました。"
  },
  "respectively": {
    "en": "Our sales in March and April rose by ten and fifteen percent respectively.",
    "ja": "3月と4月の売上は、それぞれ10パーセントと15パーセント増加しました。"
  },
  "approximately": {
    "en": "The conference will start in approximately thirty minutes, so please take your seats.",
    "ja": "会議はおよそ30分後に始まりますので、席にお着きください。"
  },
  "relatively": {
    "en": "The new supplier offers similar quality at a relatively low price.",
    "ja": "新しい仕入先は、比較的安い価格で同等の品質を提供しています。"
  },
  "predominantly": {
    "en": "Our customers are predominantly small businesses based in the local area.",
    "ja": "当社の顧客は、主に地元の中小企業です。"
  },
  "inadvertently": {
    "en": "I inadvertently sent the report to the wrong client this morning.",
    "ja": "今朝、うっかり間違った顧客にその報告書を送ってしまいました。"
  },
  "provisionally": {
    "en": "We have provisionally booked the meeting room for next Tuesday afternoon.",
    "ja": "次の火曜日の午後に、暫定的に会議室を予約しておきました。"
  },
  "concurrently": {
    "en": "The marketing and design teams are working concurrently on the new campaign.",
    "ja": "マーケティングチームとデザインチームは、新しいキャンペーンに同時並行で取り組んでいます。"
  },
  "substantially": {
    "en": "Shipping costs have increased substantially since the start of this year.",
    "ja": "配送費は今年の初めから大幅に増加しています。"
  },
  "tentatively": {
    "en": "The product launch is tentatively scheduled for the end of next month.",
    "ja": "製品の発売は、暫定的に来月末に予定されています。"
  },
  "alternatively": {
    "en": "We can meet on Monday, or alternatively, schedule the call for Tuesday afternoon.",
    "ja": "月曜に会うこともできますし、あるいは火曜の午後に電話を設定することもできます。"
  },
  "exceedingly": {
    "en": "The new supplier has been exceedingly reliable with deliveries this quarter.",
    "ja": "新しい仕入先は今四半期、配送に関して非常に信頼できる対応をしてくれています。"
  },
  "marginally": {
    "en": "Our sales figures rose only marginally compared to last year.",
    "ja": "当社の売上高は昨年と比べてわずかに上昇しただけだった。"
  },
  "unanimously": {
    "en": "The board voted unanimously to approve the proposed merger.",
    "ja": "取締役会は提案された合併を満場一致で承認することを可決した。"
  },
  "intermittently": {
    "en": "The office Wi-Fi connection has been working intermittently all morning.",
    "ja": "オフィスのWi-Fi接続は午前中ずっと途切れ途切れにしか機能していない。"
  },
  "oversee": {
    "en": "Ms. Tanaka will oversee the entire project until the deadline.",
    "ja": "田中さんが締め切りまでプロジェクト全体を監督します。"
  },
  "extrapolate": {
    "en": "Analysts extrapolate next year's demand from current sales data.",
    "ja": "アナリストは現在の売上データから来年の需要を予測します。"
  },
  "overwhelmingly": {
    "en": "The committee voted overwhelmingly in favor of the new remote work policy.",
    "ja": "委員会は新しい在宅勤務制度に圧倒的多数で賛成票を投じた。"
  },
  "commensurate": {
    "en": "The new role offers a salary commensurate with your years of experience.",
    "ja": "その新しい役職は、あなたの経験年数に見合った給与を提供します。"
  },
  "amenable": {
    "en": "The supplier was amenable to adjusting the delivery schedule for us.",
    "ja": "その業者は私たちのために納品スケジュールを調整することに応じてくれた。"
  },
  "juxtapose": {
    "en": "The slide will juxtapose last year's sales with this quarter's figures.",
    "ja": "そのスライドは昨年の売上と今四半期の数字を並べて比較する。"
  },
  "brochure": {
    "en": "Please send me a brochure describing your new conference room packages.",
    "ja": "御社の新しい会議室プランを説明したパンフレットを送ってください。"
  },
  "correspondence": {
    "en": "All correspondence with the supplier should be copied to the legal team.",
    "ja": "その仕入先とのやり取りはすべて法務チームにも共有してください。"
  },
  "excerpt": {
    "en": "The newsletter included a short excerpt from the CEO's annual speech.",
    "ja": "その会報には、CEOの年次スピーチの短い抜粋が掲載されていた。"
  },
  "memorandum": {
    "en": "The manager sent a memorandum reminding staff about the new dress code.",
    "ja": "部長は新しい服装規定について従業員に注意を促す社内連絡文書を送った。"
  },
  "notification": {
    "en": "You will receive a notification as soon as your order ships.",
    "ja": "ご注文品が発送され次第、通知が届きます。"
  },
  "questionnaire": {
    "en": "Please complete the customer questionnaire before you leave the showroom.",
    "ja": "展示場を出る前に、お客様アンケートにご記入ください。"
  },
  "transcript": {
    "en": "A full transcript of the meeting was emailed to all participants.",
    "ja": "会議の議事録の全文が、参加者全員にメールで送られた。"
  },
  "precipitate": {
    "en": "The sudden price increase may precipitate a sharp drop in sales.",
    "ja": "突然の値上げは、売上の急激な落ち込みを引き起こすかもしれない。"
  },
  "attachment": {
    "en": "Please open the attachment I sent with my last email for details.",
    "ja": "前回のメールに添付したファイルを開いて詳細をご確認ください。"
  },
  "directory": {
    "en": "You can find her extension in the company directory on the intranet.",
    "ja": "彼女の内線番号は社内ネットの名簿で見つけられます。"
  },
  "flyer": {
    "en": "We handed out a flyer about the sale to everyone outside the station.",
    "ja": "駅の外で全員にセールのチラシを配りました。"
  },
  "voucher": {
    "en": "Each guest received a voucher for a free meal at the hotel restaurant.",
    "ja": "各ゲストはホテルのレストランで使える無料食事の引換券を受け取りました。"
  },
  "acknowledgment": {
    "en": "Please send an acknowledgment once you have received the signed contract.",
    "ja": "署名済みの契約書を受領したら、確認のご連絡をお願いします。"
  },
  "amendment": {
    "en": "The board approved a small amendment to the original budget proposal.",
    "ja": "取締役会は当初の予算案へのわずかな修正を承認しました。"
  },
  "appendix": {
    "en": "The full sales figures are listed in the appendix at the end of the report.",
    "ja": "詳しい売上数字は報告書末尾の付録に記載されています。"
  },
  "manuscript": {
    "en": "The author submitted her manuscript to the publisher before the deadline.",
    "ja": "著者は締め切り前に原稿を出版社へ提出しました。"
  },
  "receipt": {
    "en": "Please keep the receipt in case you need to return the item later.",
    "ja": "後で商品を返品する場合に備えて、レシートを保管しておいてください。"
  },
  "proliferate": {
    "en": "Online shopping apps continue to proliferate across markets in Asia.",
    "ja": "オンラインショッピングのアプリはアジアの市場で急増し続けています。"
  },
  "newsletter": {
    "en": "Please subscribe to our monthly newsletter to receive the latest product updates.",
    "ja": "最新の製品情報を受け取るため、当社の月刊ニュースレターにご登録ください。"
  },
  "pamphlet": {
    "en": "The receptionist handed each visitor a pamphlet describing the company's services.",
    "ja": "受付係は来訪者一人ひとりに、会社のサービスを説明したパンフレットを手渡した。"
  },
  "remittance": {
    "en": "Please attach the remittance details when you email the invoice to accounting.",
    "ja": "請求書を経理にメールする際は、送金の詳細を添付してください。"
  },
  "supersede": {
    "en": "This updated contract will supersede all previous agreements signed last year.",
    "ja": "この更新された契約は、昨年締結されたすべての従来の合意に取って代わる。"
  },
  "ratify": {
    "en": "The board met yesterday to ratify the merger between the two firms.",
    "ja": "取締役会は昨日、二社間の合併を正式に承認するために集まった。"
  },
  "tangible": {
    "en": "The new training program produced tangible improvements in employee productivity.",
    "ja": "新しい研修プログラムは従業員の生産性に目に見える改善をもたらした。"
  },
  "encumber": {
    "en": "Too many approval steps can encumber the team and delay important projects.",
    "ja": "承認手続きが多すぎると、チームの足かせとなり、重要なプロジェクトを遅らせかねない。"
  },
  "exacerbate": {
    "en": "Cutting the support staff will only exacerbate the delays in our shipping department.",
    "ja": "サポートスタッフを削減すれば、配送部門の遅延を悪化させるだけだ。"
  },
  "wield": {
    "en": "As the regional director, she will wield considerable influence over hiring decisions.",
    "ja": "地域責任者として、彼女は採用の決定に対し相当な影響力を行使するだろう。"
  },
  "yield": {
    "en": "The new manufacturing process is expected to yield a higher return next quarter.",
    "ja": "新しい製造工程は来四半期により高い収益を生み出すと見込まれている。"
  },
  "relinquish": {
    "en": "The founder agreed to relinquish control of the company after the merger was finalized.",
    "ja": "創業者は合併が成立した後、会社の経営権を手放すことに同意した。"
  },
  "rescind": {
    "en": "Management decided to rescind the job offer after the candidate failed the background check.",
    "ja": "経営陣は候補者が身元調査に通らなかったため、内定を撤回することにした。"
  },
  "tantamount": {
    "en": "Ignoring the client's complaint would be tantamount to losing the entire contract.",
    "ja": "顧客の苦情を無視することは、契約全体を失うことに等しいだろう。"
  },
  "scrutiny": {
    "en": "All expense reports are subject to careful scrutiny by the finance department.",
    "ja": "すべての経費報告書は、財務部による入念な精査の対象となります。"
  },
  "auxiliary": {
    "en": "The factory uses an auxiliary generator during unexpected power outages.",
    "ja": "その工場は、予期せぬ停電の際に補助発電機を使用します。"
  },
  "pertain": {
    "en": "Please direct any questions that pertain to billing to the accounting office.",
    "ja": "請求に関する質問は、すべて経理課にお問い合わせください。"
  },
  "zealous": {
    "en": "Our zealous sales team exceeded its quarterly targets by a wide margin.",
    "ja": "熱心な営業チームは、四半期の目標を大きく上回りました。"
  }
};
