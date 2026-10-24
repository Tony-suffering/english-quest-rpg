/**
 * LIFELINE CAST — 職能名簿
 *
 * ■ なぜ別ファイルか
 * requiem-world.ts の147人は「町に住んでいる人」の名簿で、147人で凍結してある。
 * ライフラインを一生ぶんに広げると、町に **誰も担当していない窓口** が出てくる。
 * 歯医者、薬剤師、整備士、交通課の警官、離婚の弁護士、葬儀社。
 * これは町民の物語ではなく、窓口の向こう側に必ず座っている人である。
 *
 * だから147人の名簿には足さず、こちらに置く。requiem の凍結は破らない。
 * 「町民147人」という数字はそのまま生きていて、こちらは **町の職能38人**。
 *
 * ■ 書き方の規則
 * 物語を持たせない。この人たちは窓口の側であって、主人公にはならない。
 * note は1行。何を言う人かだけ書く。台詞から起こせるようになったら requiem 側へ移す。
 */

export interface LifelinePerson {
    id: string;
    name: string;
    age?: string;
    role: string;
    /** どの領域の窓口に出るか */
    domain: 'medical' | 'car' | 'money' | 'home' | 'work' | 'school' | 'civic' | 'service' | 'end';
    note: string;
}

export const LIFELINE_PEOPLE: LifelinePerson[] = [
    // ---- 医療 ----
    { id: 'dr-halberg', name: 'Dr. Halberg', age: '50s', role: '産科医', domain: 'medical', note: '週数と数字でしか話さない。悪い知らせも同じ声で言う。' },
    { id: 'june-lactation', name: 'June', age: '40s', role: '授乳指導', domain: 'medical', note: '退院前の30分で、その後半年を左右することを全部言う。' },
    { id: 'dr-ruiz', name: 'Dr. Ruiz', age: '40s', role: '歯科医', domain: 'medical', note: '口を開けさせたまま質問する。返事は要らないと思っている。' },
    { id: 'tandy', name: 'Tandy', age: '30s', role: '歯科衛生士', domain: 'medical', note: 'フロスの話を毎回する。毎回同じ言い方で。' },
    { id: 'dr-weller', name: 'Dr. Weller', age: '50s', role: '矯正歯科', domain: 'medical', note: '治療期間を必ず長めに言う。早く終わると感謝されるため。' },
    { id: 'dr-shin', name: 'Dr. Shin', age: '40s', role: '検眼医', domain: 'medical', note: '「1と2、どっちがよく見えます?」を24回聞く。' },
    { id: 'omar-rx', name: 'Omar', age: '30s', role: '薬剤師', domain: 'medical', note: '保険が通らなかったことを一番先に言う。値段の話が本題。' },
    { id: 'dr-sorensen', name: 'Dr. Sorensen', age: '50s', role: '外科医', domain: 'medical', note: '同意書の説明を、リスクの数字から始める。' },
    { id: 'kwame-pt', name: 'Kwame', age: '30s', role: '理学療法士', domain: 'medical', note: '痛みを我慢する人を一番嫌う。「言ってくれないと直せない」。' },
    { id: 'dr-falk', name: 'Dr. Falk', age: '40s', role: 'セラピスト', domain: 'medical', note: '沈黙を埋めない。埋めるのは患者の仕事だと思っている。' },
    { id: 'dr-beaumont', name: 'Dr. Beaumont', age: '50s', role: '獣医', domain: 'medical', note: '飼い主より先に犬に話しかける。最後の日も同じ順番。' },
    { id: 'nurse-line-gail', name: 'Gail', age: '50s', role: '夜間の看護師相談窓口', domain: 'medical', note: '午前2時の電話に出る。来なくていい理由を落ち着いて説明する。' },

    // ---- 車 ----
    { id: 'randy-lot', name: 'Randy', age: '50s', role: '中古車ディーラー', domain: 'car', note: '月末になると急に電話をかけてくる。' },
    { id: 'sal-garage', name: 'Sal', age: '60s', role: '整備士', domain: 'car', note: '見積もりを紙に書く。書いた金額からは動かない。' },
    { id: 'officer-doyle', name: 'Officer Doyle', age: '40s', role: '交通課の警官', domain: 'car', note: '窓を開けた瞬間の第一声が全部同じ。' },
    { id: 'marisol-claims', name: 'Marisol', age: '40s', role: '保険の事故受付', domain: 'car', note: '電話口で写真を送らせる。優しいが、順番は絶対に変えない。' },

    // ---- 金 ----
    { id: 'estelle-loan', name: 'Estelle', age: '50s', role: '銀行の融資担当', domain: 'money', note: '数字を読み上げてから顔を上げる。' },
    { id: 'dominic-cs', name: 'Dominic', age: '30s', role: 'コールセンター', domain: 'money', note: '解約を止めるための台本を持っている。3段階ある。' },
    { id: 'ms-ojeda', name: 'Ms. Ojeda', age: '50s', role: '失業保険の窓口', domain: 'money', note: '毎週の求職報告を忘れる人を何百人も見てきた。' },
    { id: 'collections-voice', name: 'The Collections Line', role: '督促の電話', domain: 'money', note: '名前を名乗らない。こちらの生年月日を先に聞く。' },

    // ---- 住 ----
    { id: 'curtis-plumb', name: 'Curtis', age: '40s', role: '配管業者', domain: 'home', note: '床下から出てきた顔で結論がわかる。' },
    { id: 'vic-roof', name: 'Vic', age: '50s', role: '屋根と外構の施工業者', domain: 'home', note: '着手金を先に取る。取ってから連絡が減る。' },
    { id: 'manny-movers', name: 'Manny', age: '30s', role: '引っ越し業者', domain: 'home', note: '見積もりは時間制。階段があると顔色が変わる。' },
    { id: 'tre-wireless', name: 'Tre', age: '20s', role: '携帯ショップ', domain: 'service', note: '端末の話をしているうちに回線の話になっている。' },

    // ---- 仕事・学校 ----
    { id: 'deb-hr', name: 'Deb', age: '50s', role: '人事', domain: 'work', note: 'メモを取りながら聞く。取っている時点で記録になっている。' },
    { id: 'mr-baptiste', name: 'Mr. Baptiste', age: '40s', role: 'スクールカウンセラー', domain: 'school', note: '子どもより先に親を落ち着かせる。' },
    { id: 'ms-whitaker', name: 'Ms. Whitaker', age: '40s', role: '特別支援コーディネーター', domain: 'school', note: '制度の名前で話す。噛み砕いてくれと言えば噛み砕く。' },
    { id: 'casey-camp', name: 'Casey', age: '20s', role: 'サマーキャンプの指導員', domain: 'school', note: '親への連絡が全部同じテンションで来る。' },
    { id: 'mrs-ferrell', name: 'Mrs. Ferrell', age: '60s', role: '図書館司書', domain: 'civic', note: '延滞金の話をするとき本当に申し訳なさそうにする。' },

    // ---- 行政・法 ----
    { id: 'mrs-lindqvist', name: 'Mrs. Lindqvist', age: '70s', role: '投票所の受付', domain: 'civic', note: '20年同じ体育館に座っている。名簿を紙で引く。' },
    { id: 'otis-usps', name: 'Otis', age: '50s', role: '郵便局の窓口', domain: 'civic', note: '箱の大きさで料金が変わることを、毎回一から説明する。' },
    { id: 'attorney-prewitt', name: 'Attorney Prewitt', age: '50s', role: '弁護士(離婚・遺言)', domain: 'end', note: '感情の話を止めない。ただし時間で課金している。' },
    { id: 'officer-nwosu', name: 'Officer Nwosu', age: '40s', role: '入国審査官', domain: 'civic', note: '質問は3つだけ。3つとも短く答えれば終わる。' },

    // ---- 生活サービス ----
    { id: 'renae-salon', name: 'Renae', age: '40s', role: '美容師', domain: 'service', note: '長さの話をしているのに、いつのまにか身の上話になっている。' },
    { id: 'colt-gym', name: 'Colt', age: '20s', role: 'ジムの受付', domain: 'service', note: '入会は3分、解約は書面。そこだけ急に丁寧になる。' },
    { id: 'bea-front-desk', name: 'Bea', age: '50s', role: 'ホテルのフロント', domain: 'service', note: '部屋の交換を頼まれる前提で立っている。' },
    { id: 'tanvir-rental', name: 'Tanvir', age: '30s', role: 'レンタカーのカウンター', domain: 'service', note: '保険を勧める。断り方を知らない客がそのまま買う。' },

    // ---- 最後 ----
    { id: 'corinne-sw', name: 'Corinne', age: '40s', role: '高齢者福祉のソーシャルワーカー', domain: 'end', note: '本人に向かって話す。家族が代わりに答えると待つ。' },
    { id: 'mr-ganz', name: 'Mr. Ganz', age: '60s', role: '葬儀社', domain: 'end', note: '選択肢を3つに絞って出す。多く出すと決められないと知っている。' },
];

const BY_ID = new Map(LIFELINE_PEOPLE.map(p => [p.id, p]));

export function getLifelinePerson(id: string): LifelinePerson | undefined {
    return BY_ID.get(id);
}
