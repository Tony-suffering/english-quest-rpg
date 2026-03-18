export type SoundChangeType =
  | 'linking'
  | 'reduction'
  | 'assimilation'
  | 'elision'
  | 'flapping'
  | 'contraction';

export interface SoundChangeEntry {
  id: string;
  type: SoundChangeType;
  written: string;
  spoken: string;
  spokenJa: string;
  rule: string;
  toeicContext: string;
  frequency: 'every-test' | 'very-common' | 'common';
  examples: SoundExample[];
  masterTip: string;
}

export interface SoundExample {
  sentence: string;
  soundVersion: string;
  translation: string;
  toeicPart: number;
}

export interface SoundChangeCategory {
  type: SoundChangeType;
  nameJa: string;
  nameEn: string;
  description: string;
  importance: 1 | 2 | 3;
}

// ============================================================
// CATEGORIES
// ============================================================

export const SOUND_CHANGE_CATEGORIES: SoundChangeCategory[] = [
  {
    type: 'linking',
    nameJa: '連結',
    nameEn: 'Linking',
    description: '単語の末尾の子音と次の単語の語頭の母音がくっつく。「turn it off」が「ターニトフ」になる現象。これがわからないと単語の切れ目が全く聞こえない。',
    importance: 3,
  },
  {
    type: 'reduction',
    nameJa: '弱化',
    nameEn: 'Reduction',
    description: '機能語（前置詞・助動詞・冠詞）が超弱く発音される。「to」はほぼ「tuh」、「of」はほぼ「uh」。書いてある音と全然違う。',
    importance: 3,
  },
  {
    type: 'assimilation',
    nameJa: '同化',
    nameEn: 'Assimilation',
    description: '隣り合った音が影響し合って別の音になる。「did you」が「ディジュ」になるやつ。知らないと完全に別の単語に聞こえる。',
    importance: 3,
  },
  {
    type: 'elision',
    nameJa: '脱落',
    nameEn: 'Elision',
    description: '音が丸ごと消える。「mostly」の「t」が消えて「mosly」。ネイティブは普通に喋ってるつもりなので容赦なし。',
    importance: 2,
  },
  {
    type: 'flapping',
    nameJa: 'フラッピング',
    nameEn: 'Flapping',
    description: '母音に挟まれた「t」や「d」が「r」に近い音になる。「water」が「ウォーダー」。アメリカ英語の象徴的な特徴。',
    importance: 2,
  },
  {
    type: 'contraction',
    nameJa: '短縮',
    nameEn: 'Contraction',
    description: '複数の単語がくっついて完全に別の音になる。「going to」→「gonna」、「want to」→「wanna」。これはTOEICで頻出。',
    importance: 3,
  },
];

// ============================================================
// SOUND CHANGE ENTRIES
// ============================================================

export const SOUND_CHANGES: SoundChangeEntry[] = [

  // ===== LINKING (20 entries) =====

  {
    id: 'link-001',
    type: 'linking',
    written: 'turn it off',
    spoken: 'tur-ni-toff',
    spokenJa: 'ターニトフ',
    rule: '単語末の子音（n）と次の単語の母音（i）がつながる。さらに「it off」もつながって一塊になる。',
    toeicContext: 'Part 2の依頼文、Part 4の指示アナウンスでよく出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: 'Could you turn it off before the meeting?',
        soundVersion: "Could you tur-ni-toff before the meeting?",
        translation: '会議の前に消してもらえますか？',
        toeicPart: 2,
      },
      {
        sentence: 'Please turn it off when you leave.',
        soundVersion: 'Please tur-ni-toff when you leave.',
        translation: '退出の際は消してください。',
        toeicPart: 4,
      },
    ],
    masterTip: '「turn it off」は3語だが聞こえるのは「ターニトフ」の一塊。単語境界を探そうとしても無駄。音の塊として丸ごと覚えろ。',
  },

  {
    id: 'link-002',
    type: 'linking',
    written: 'pick it up',
    spoken: 'pi-ki-tup',
    spokenJa: 'ピキタップ',
    rule: '「pick」の末子音kが「it」の母音iとつながり、さらに「it」の末子音tが「up」の母音uとつながる。連鎖連結。',
    toeicContext: 'Part 2の短い依頼、Part 3の職場会話で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Can you pick it up from the post office?",
        soundVersion: "Can you pi-ki-tup from the post office?",
        translation: '郵便局から受け取ってもらえますか？',
        toeicPart: 2,
      },
      {
        sentence: "I'll pick it up on my way home.",
        soundVersion: "I'll pi-ki-tup on my way home.",
        translation: '帰りに拾っていきます。',
        toeicPart: 3,
      },
    ],
    masterTip: '「pick it up」はピキタップ。3語が1語に聞こえる典型例。Part 2で「ピキタップ？」って聞かれたら依頼文だと判断しろ。',
  },

  {
    id: 'link-003',
    type: 'linking',
    written: 'check it out',
    spoken: 'che-ki-tout',
    spokenJa: 'チェキタウト',
    rule: '「check」末のkが「it」の母音とつながり、「it」の末tが「out」の母音oとつながる。',
    toeicContext: 'Part 3の同僚会話、新しい情報を伝えるシーンで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "You should check it out before deciding.",
        soundVersion: "You should che-ki-tout before deciding.",
        translation: '決める前に確認した方がいいよ。',
        toeicPart: 3,
      },
      {
        sentence: "Check it out—the report just came in.",
        soundVersion: "Che-ki-tout—the report just came in.",
        translation: 'ちょっと見て。レポートが届いたよ。',
        toeicPart: 3,
      },
    ],
    masterTip: 'チェキタウト。インスタグラムじゃなくてTOEICでも使われる。情報共有シーンでは必ず出てくるから耳を慣らせ。',
  },

  {
    id: 'link-004',
    type: 'linking',
    written: 'an apple',
    spoken: 'a-napple',
    spokenJa: 'アナポゥ',
    rule: '冠詞「an」の末子音nが「apple」の語頭母音aとつながって「a-napple」になる。境界が一個ズレて聞こえる。',
    toeicContext: 'Part 1の写真描写、Part 4のアナウンスで名詞句として出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "She's holding an apple in her right hand.",
        soundVersion: "She's holding a-napple in her right hand.",
        translation: '彼女は右手にリンゴを持っています。',
        toeicPart: 1,
      },
    ],
    masterTip: '「an apple」は「アナポゥ」に聞こえる。nがappleにくっついてしまうので、最初は「ナ」から始まる単語に聞こえてしまう。冠詞詐欺。',
  },

  {
    id: 'link-005',
    type: 'linking',
    written: 'not at all',
    spoken: 'no-ta-tall',
    spokenJa: 'ノータトール',
    rule: '「not」のtが「at」の母音とつながり、「at」の末tが「all」の母音とつながる。tが3つあるのに全部別の役割をする。',
    toeicContext: 'Part 2の返答、丁寧な否定表現として頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Not at all, I was happy to help.",
        soundVersion: "No-ta-tall, I was happy to help.",
        translation: 'いえいえ、喜んでお手伝いしました。',
        toeicPart: 2,
      },
      {
        sentence: "It's not at all what I expected.",
        soundVersion: "It's no-ta-tall what I expected.",
        translation: '全く予想と違いました。',
        toeicPart: 3,
      },
    ],
    masterTip: '「not at all」はノータトール。Part 2の定番返答。これが聞き取れないとYes/No判断で詰む。丸ごと音として覚えろ。',
  },

  {
    id: 'link-006',
    type: 'linking',
    written: 'take it easy',
    spoken: 'tay-ki-tee-zy',
    spokenJa: 'テイキティージー',
    rule: '「take」のkが「it」の母音、「it」のtが「easy」の母音とつながる。全部が一気に流れる。',
    toeicContext: 'Part 3の会話、別れ際や励ましのシーンで出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Take it easy, the deadline is not until Friday.",
        soundVersion: "Tay-ki-tee-zy, the deadline is not until Friday.",
        translation: 'のんびりやって。締め切りは金曜日まであるから。',
        toeicPart: 3,
      },
    ],
    masterTip: 'テイキティージー。別れ際の挨拶として使われるが、連結してるから初見では何を言ったかわからない。英語は「楽にして」が4音節に聞こえる。',
  },

  {
    id: 'link-007',
    type: 'linking',
    written: 'put it on',
    spoken: 'pu-di-ton',
    spokenJa: 'プディトン',
    rule: '「put」のtがフラッピングされてdになり（母音に挟まれるため）、さらに「it」のtが「on」の母音とつながる。',
    toeicContext: 'Part 2の指示、Part 3の職場指示シーンで出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Just put it on my desk when you're done.",
        soundVersion: "Just pu-di-ton my desk when you're done.",
        translation: '終わったら私の机に置いといて。',
        toeicPart: 2,
      },
    ],
    masterTip: '「put it on」でプディトン。フラッピングと連結が同時に起きてる高難度パターン。TOEICのPart 2で普通に出るから慣れろ。',
  },

  {
    id: 'link-008',
    type: 'linking',
    written: 'come on in',
    spoken: 'ku-mo-nin',
    spokenJa: 'クモーニン',
    rule: '「come」のmが「on」の母音o、「on」のnが「in」の母音iと連続してつながる。3語がほぼ1語。',
    toeicContext: 'Part 3の受付・来客シーン。入室を促す表現として頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Come on in, the director is ready for you.",
        soundVersion: "Ku-mo-nin, the director is ready for you.",
        translation: 'どうぞお入りください。部長がお待ちです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'クモーニン。「入ってください」がこんな音になる。受付シーンでは確実に出るから「クモーニン=入室OK」と体に叩き込め。',
  },

  {
    id: 'link-009',
    type: 'linking',
    written: 'hold on a second',
    spoken: 'hol-do-na-second',
    spokenJa: 'ホールドォナセカンド',
    rule: '「hold」のd、「on」のn、「a」の母音が全部つながって流れる。「on a」が「ona」になる。',
    toeicContext: 'Part 3の電話対応、待機を依頼するシーンで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Hold on a second, let me check the schedule.",
        soundVersion: "Hol-do-na-second, let me check the schedule.",
        translation: 'ちょっと待ってください、スケジュールを確認します。',
        toeicPart: 3,
      },
    ],
    masterTip: '電話シーンの必須フレーズ。「ホールドォナセカンド」で一気に言う。Part 3で電話が出てきたらこれが聞こえてくると思え。',
  },

  {
    id: 'link-010',
    type: 'linking',
    written: 'look it up',
    spoken: 'lu-ki-tup',
    spokenJa: 'ルキタップ',
    rule: '「look」のkが「it」とつながり、「it」のtが「up」とつながる。pick it upと同じパターン。',
    toeicContext: 'Part 3の情報検索シーン、調べる指示として頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Why don't you look it up on the company website?",
        soundVersion: "Why don't you lu-ki-tup on the company website?",
        translation: '会社のウェブサイトで調べてみたら？',
        toeicPart: 3,
      },
    ],
    masterTip: 'ルキタップ。「調べる」が全部くっついてこの音になる。「ル」から始まる謎の音が聞こえたら「look it up」の可能性大。',
  },

  {
    id: 'link-011',
    type: 'linking',
    written: 'work it out',
    spoken: 'wur-ki-tout',
    spokenJa: 'ワーキタウト',
    rule: '子音連結の連鎖。問題解決表現でよく使われる。',
    toeicContext: 'Part 3の問題解決・交渉シーンで出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "I'm sure we can work it out together.",
        soundVersion: "I'm sure we can wur-ki-tout together.",
        translation: '一緒に解決できると思います。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ワーキタウト。解決策を話し合うシーンで出る。「ワーキタウト」で「解決する」と覚えておけ。',
  },

  {
    id: 'link-012',
    type: 'linking',
    written: 'bring it up',
    spoken: 'bri-ngi-tup',
    spokenJa: 'ブリンギタップ',
    rule: '「bring」のng音が「it」の母音とつながる。ng+母音の連結は聞き取りにくい。',
    toeicContext: 'Part 3の会議シーン、議題を持ち出す表現。',
    frequency: 'common',
    examples: [
      {
        sentence: "You should bring it up at the next meeting.",
        soundVersion: "You should bri-ngi-tup at the next meeting.",
        translation: '次の会議で議題に挙げるべきだよ。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ブリンギタップ。ng音の連結は日本語にない感覚。「ング」のgが次の母音を引っ張る。会議シーンで議題提起に使われる。',
  },

  {
    id: 'link-013',
    type: 'linking',
    written: 'set it up',
    spoken: 'se-di-tup',
    spokenJa: 'セディタップ',
    rule: '「set」のtがフラッピングされてd音になり（母音「it」に挟まれる）、さらに連結が起きる。',
    toeicContext: 'Part 3のIT・イベント準備シーンで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Can you set it up before the clients arrive?",
        soundVersion: "Can you se-di-tup before the clients arrive?",
        translation: 'クライアントが来る前にセットアップできますか？',
        toeicPart: 3,
      },
    ],
    masterTip: 'セディタップ。機材のセッティングシーンで必出。フラッピングで「t→d」になってることに気づかないと永遠に聞き取れない。',
  },

  {
    id: 'link-014',
    type: 'linking',
    written: 'figure it out',
    spoken: 'fi-gy-ri-tout',
    spokenJa: 'フィギャリタウト',
    rule: '「figure」のr音が「it」の母音と連結。rと母音の連結は特に流れるように聞こえる。',
    toeicContext: 'Part 3の問題解決会話でよく出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Let me figure it out and get back to you.",
        soundVersion: "Let me fi-gy-ri-tout and get back to you.",
        translation: '調べてから折り返しご連絡します。',
        toeicPart: 3,
      },
    ],
    masterTip: 'フィギャリタウト。「解明する・考え出す」が全部くっついてこの音。Part 3の問題解決シーンでは必ず出てくる。「フィギャリ」で反応しろ。',
  },

  {
    id: 'link-015',
    type: 'linking',
    written: 'fill it out',
    spoken: 'fi-li-tout',
    spokenJa: 'フィリタウト',
    rule: '「fill」のlが「it」の母音とつながり、「it」のtが「out」の母音とつながる。',
    toeicContext: 'Part 2・3の書類記入シーンで頻出。受付や申込書のシーン。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Please fill it out and return it to the front desk.",
        soundVersion: "Please fi-li-tout and return it to the front desk.",
        translation: 'ご記入の上、フロントまでお戻しください。',
        toeicPart: 4,
      },
    ],
    masterTip: '「フィリタウト」でフォームに記入する。TOEIC頻出シーン。書類関係のリスニングで「フィリタウト」が出たら書くアクションが正解。',
  },

  {
    id: 'link-016',
    type: 'linking',
    written: 'hand it in',
    spoken: 'han-di-tin',
    spokenJa: 'ハンディティン',
    rule: '「hand」のd、「it」のt、「in」が連続連結。提出を表すフレーズ。',
    toeicContext: 'Part 2・3の業務指示シーン。レポート提出文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Make sure you hand it in by noon.",
        soundVersion: "Make sure you han-di-tin by noon.",
        translation: '必ず正午までに提出してください。',
        toeicPart: 2,
      },
    ],
    masterTip: 'ハンディティン。提出するが「hand it in」。でも実際の音は全部くっついてハンディティン。締め切りシーンで出る。',
  },

  {
    id: 'link-017',
    type: 'linking',
    written: 'run out of',
    spoken: 'ru-nau-duhv',
    spokenJa: 'ルナウダヴ',
    rule: '「run」のnが「out」の母音、「out」のtがフラッピングでd、さらに「of」が弱化してuvになる。連結+フラッピング+弱化の三重コンボ。',
    toeicContext: 'Part 3・4の在庫・補充シーンで頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "We're about to run out of paper.",
        soundVersion: "We're about to ru-nau-duhv paper.",
        translation: '紙が切れそうです。',
        toeicPart: 3,
      },
      {
        sentence: "We ran out of coffee again.",
        soundVersion: "We ru-nau-duhv coffee again.",
        translation: 'またコーヒーがなくなりました。',
        toeicPart: 4,
      },
    ],
    masterTip: '「run out of」はTOEICの最頻出フレーズの一つ。ルナウダヴ。在庫系問題では確実に出る。ofの弱化まで含めた音を丸ごと覚えろ。',
  },

  {
    id: 'link-018',
    type: 'linking',
    written: 'think about it',
    spoken: 'thin-ka-bou-dit',
    spokenJa: 'シンカバウディット',
    rule: '「think」のkが「about」の母音とつながり、「about」のtがフラッピングでd、「it」の母音とつながる。',
    toeicContext: 'Part 2の提案への返答、Part 3の意思決定シーン。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "I'll think about it and let you know tomorrow.",
        soundVersion: "I'll thin-ka-bou-dit and let you know tomorrow.",
        translation: '考えてから明日お知らせします。',
        toeicPart: 2,
      },
    ],
    masterTip: 'シンカバウディット。「考えておきます」という返答。Part 2で提案が出たら「シンカバウディット」が即答パターン。これで「考え中」と読め。',
  },

  {
    id: 'link-019',
    type: 'linking',
    written: 'all of us',
    spoken: 'o-lo-vus',
    spokenJa: 'オロヴァス',
    rule: '「all」のlが「of」の母音とつながり、「of」が弱化して「ov」、さらに「us」とつながる。',
    toeicContext: 'Part 4のアナウンス・スピーチ、集団への呼びかけで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "This policy affects all of us in the department.",
        soundVersion: "This policy affects o-lo-vus in the department.",
        translation: 'このポリシーは部署全員に影響します。',
        toeicPart: 4,
      },
    ],
    masterTip: 'オロヴァス。「私たち全員」が完全に別の音になる。Part 4のスピーチで「o-lo-vus」が聞こえたら全員に関わる重要事項のサイン。',
  },

  {
    id: 'link-020',
    type: 'linking',
    written: 'get out of',
    spoken: 'ge-dau-duhv',
    spokenJa: 'ゲダウダヴ',
    rule: '2つのtがフラッピングでd音になり、ofが弱化。フラッピング×2と弱化の合わせ技。',
    toeicContext: 'Part 3の職場会話、場所移動・離脱の文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "We need to get out of this traffic.",
        soundVersion: "We need to ge-dau-duhv this traffic.",
        translation: 'この渋滞を抜け出さないと。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ゲダウダヴ。「get out of」のtが全部dになってしまう。聞いた時に「ゲダウダヴ何か」という形で意味をつかめればOK。',
  },

  {
    id: 'link-021',
    type: 'linking',
    written: 'on and off',
    spoken: 'o-nan-doff',
    spokenJa: 'オナンドフ',
    rule: '「on」のnが「and」の母音とつながり、「and」が弱化・連結して「and off」が「ndoff」になる。',
    toeicContext: 'Part 3・4の状況説明、断続的な状態を表す文脈。',
    frequency: 'common',
    examples: [
      {
        sentence: "The service has been on and off all morning.",
        soundVersion: "The service has been o-nan-doff all morning.",
        translation: 'サービスは午前中ずっと断続的に止まっています。',
        toeicPart: 4,
      },
    ],
    masterTip: 'オナンドフ。「断続的に」を意味するイディオム。音がつながりすぎて意味が取れないことがある。オナンドフ→断続的、と丸暗記。',
  },

  // ===== REDUCTION (20 entries) =====

  {
    id: 'redu-001',
    type: 'reduction',
    written: 'I want to go',
    spoken: 'I wanna go',
    spokenJa: 'アイ ワナ ゴー',
    rule: '「want to」はカジュアルな会話で「wanna」に縮む。これはcontraction側でも紹介するが、toの弱化が引き金。',
    toeicContext: 'Part 2・3の意図・希望を表す文で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "I want to schedule a meeting for next week.",
        soundVersion: "I wanna schedule a meeting for next week.",
        translation: '来週ミーティングを入れたいのですが。',
        toeicPart: 2,
      },
    ],
    masterTip: '「want to」がwannaになるのはもう常識。でもTOEICではさらに速い。ほぼ「ワナ」で消える。to が完全に蒸発してる。',
  },

  {
    id: 'redu-002',
    type: 'reduction',
    written: 'cup of coffee',
    spoken: 'cuppa coffee',
    spokenJa: 'カッパ コーヒー',
    rule: '「of」がほぼ消えて「cup of」が「cuppa」になる。ofは世界で最も弱い前置詞。',
    toeicContext: 'Part 3の休憩・カフェシーン、Part 4のカフェテリアアナウンスで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Can I get a cup of coffee before we start?",
        soundVersion: "Can I get a cuppa coffee before we start?",
        translation: '始める前にコーヒー一杯いいですか？',
        toeicPart: 3,
      },
    ],
    masterTip: 'ofは世界で最も弱い前置詞。cup of coffeeは実質「カッパコーヒー」。知らないと永遠に聞き取れない。ofが出てくるたびに消える覚悟をしろ。',
  },

  {
    id: 'redu-003',
    type: 'reduction',
    written: 'kind of',
    spoken: 'kinda',
    spokenJa: 'カインダ',
    rule: '「kind of」が完全に「kinda」に縮む。ofが丸ごと消えてaになる。',
    toeicContext: 'Part 3の日常会話、程度を表す文脈で出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "It's kind of complicated to explain.",
        soundVersion: "It's kinda complicated to explain.",
        translation: '説明するのが少し複雑なんです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'カインダ。「ある意味・ちょっと」の意味。kindaで一語として出てくる。ofがどこに行ったかは聞かないでくれ。',
  },

  {
    id: 'redu-004',
    type: 'reduction',
    written: 'a lot of',
    spoken: 'alotta',
    spokenJa: 'アロッタ',
    rule: '「a lot of」が「alotta」に縮む。lotのtがフラッピングでd、ofが消えてaになる。',
    toeicContext: 'Part 2・3・4で数量・程度を表す文脈に頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "We have a lot of work to finish by Friday.",
        soundVersion: "We have alotta work to finish by Friday.",
        translation: '金曜日までにやることが山積みです。',
        toeicPart: 3,
      },
      {
        sentence: "There's a lot of interest in the new product.",
        soundVersion: "There's alotta interest in the new product.",
        translation: '新製品への関心が高い。',
        toeicPart: 4,
      },
    ],
    masterTip: 'アロッタ。「たくさんの〜」が全部くっついてこの音。TOEICでは数量表現は頻出。「アロッタ何か」という形で聞こえる。',
  },

  {
    id: 'redu-005',
    type: 'reduction',
    written: 'to',
    spoken: 'tuh',
    spokenJa: 'タ（ほぼ聞こえない）',
    rule: '不定詞・前置詞のtoは強調されない限りほぼ「tuh」か完全に消える。弱形の代表例。',
    toeicContext: '全パートで毎回出てくる。聞き取れなくて当然。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "I need to talk to the manager.",
        soundVersion: "I need tuh talk tuh the manager.",
        translation: 'マネージャーと話す必要があります。',
        toeicPart: 2,
      },
      {
        sentence: "Please come to the office at nine.",
        soundVersion: "Please come tuh the office at nine.",
        translation: '9時にオフィスに来てください。',
        toeicPart: 4,
      },
    ],
    masterTip: '「to」はほぼ音がない。「tuh」かほぼ無音。これを知らないと文全体のリズムが崩れる。toを「トゥ」と聞こうとするな。消えると思え。',
  },

  {
    id: 'redu-006',
    type: 'reduction',
    written: 'for',
    spoken: 'fer / fuh',
    spokenJa: 'ファ（ほぼ消える）',
    rule: '前置詞のforは弱形では「fer」あるいは「fuh」になる。強調する時だけ「フォー」と発音する。',
    toeicContext: '全パートで頻出。目的や対象を表す文脈。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "This message is for everyone in sales.",
        soundVersion: "This message is fuh everyone in sales.",
        translation: '営業部全員へのメッセージです。',
        toeicPart: 4,
      },
      {
        sentence: "I'm looking for the conference room.",
        soundVersion: "I'm looking fer the conference room.",
        translation: '会議室を探しています。',
        toeicPart: 3,
      },
    ],
    masterTip: 'forはファかフ。強調なし=消える。「〜のために」が「ファ」一音で出てくる。聞こえなくても文脈でforだと判断しろ。',
  },

  {
    id: 'redu-007',
    type: 'reduction',
    written: 'of',
    spoken: 'uhv / uh',
    spokenJa: 'ア（ほぼ無音）',
    rule: '前置詞のofは最も弱化しやすい語。「uhv」かほぼ消える。前後の語と溶け合う。',
    toeicContext: '全パートで頻出。数量・所属・内容を表す文脈。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "A number of employees have requested flexible hours.",
        soundVersion: "A number uhv employees have requested flexible hours.",
        translation: '多くの従業員がフレックスタイムを希望しています。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ofはほぼ無音。英語で最も使われる前置詞のくせに最も小さい音。消えると分かって聞くだけで全然違う。',
  },

  {
    id: 'redu-008',
    type: 'reduction',
    written: 'and',
    spoken: 'n / \'n',
    spokenJa: 'ン（ほぼ無音）',
    rule: '等位接続詞のandは弱形では「n」だけになる。rock and rollが「rock\'n\'roll」になる原理。',
    toeicContext: '全パートで毎文出てくる。並列表現に必ず登場。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Bring your ID and your appointment letter.",
        soundVersion: "Bring your ID 'n your appointment letter.",
        translation: '身分証と予約書をお持ちください。',
        toeicPart: 4,
      },
    ],
    masterTip: 'andはンだけ。「と」が「ン」になる。cups and saucersが「カップスンソーサーズ」。接続詞が消えても意味は並列だと分かれば十分。',
  },

  {
    id: 'redu-009',
    type: 'reduction',
    written: 'can',
    spoken: 'kn / kuhn',
    spokenJa: 'クン（ほぼ子音だけ）',
    rule: '助動詞canの弱形はほぼ「kn」で母音がほぼない。can\'tとの聞き分けが最重要課題。',
    toeicContext: '全パートで頻出。can vs can\'tの聞き分けはTOEICの頻出問題。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "I can meet you at three.",
        soundVersion: "I kn meet you at three.",
        translation: '3時に会えます。',
        toeicPart: 2,
      },
      {
        sentence: "We can arrange a delivery for tomorrow.",
        soundVersion: "We kn arrange a delivery for tomorrow.",
        translation: '明日の配達を手配できます。',
        toeicPart: 3,
      },
    ],
    masterTip: 'canとcan\'tの聞き分けはTOEICの鬼門。canは弱く「クン」、can\'tは強く「キャント」と「t」が聞こえる。強弱とtの有無で判断しろ。',
  },

  {
    id: 'redu-010',
    type: 'reduction',
    written: 'have',
    spoken: 'uhv / huhv',
    spokenJa: 'アヴ（ほぼ無音）',
    rule: '完了形・助動詞のhaveは弱形で「uhv」になる。mustとセットのmust haveは「musta」になる。',
    toeicContext: 'Part 2・3の完了形、推量表現で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "You must have misunderstood the instructions.",
        soundVersion: "You musta misunderstood the instructions.",
        translation: '指示を誤解されたに違いありません。',
        toeicPart: 3,
      },
    ],
    masterTip: 'mustaveはmusta。should haveはshoulda。完了形のhaveは全部弱化する。「〜したに違いない」系はすべて最後がaで終わる音になる。',
  },

  {
    id: 'redu-011',
    type: 'reduction',
    written: 'would',
    spoken: 'wuhd / \'d',
    spokenJa: 'ウッド（ほぼdだけ）',
    rule: '助動詞wouldの弱形は「\'d」だけになることも多い。I wouldがI\'dになる。',
    toeicContext: 'Part 3の提案・条件文で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "I would appreciate your feedback.",
        soundVersion: "I\'d appreciate your feedback.",
        translation: 'フィードバックをいただけると幸いです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'wouldはほぼdだけ。「I\'d」が「アイッド」に聞こえる。丁寧な依頼や仮定法で使われるが、音がほぼない。dの音だけで判断しろ。',
  },

  {
    id: 'redu-012',
    type: 'reduction',
    written: 'the',
    spoken: 'thuh / thee',
    spokenJa: 'ザ（超短い）',
    rule: '定冠詞theは子音の前では「thuh」、母音の前では「thee」になる。常に弱い。',
    toeicContext: '全パートで毎文出てくる。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Please go to the reception desk.",
        soundVersion: "Please go tuh thuh reception desk.",
        translation: 'フロントまでお越しください。',
        toeicPart: 4,
      },
    ],
    masterTip: 'theはほぼ無音。「ザ」か「ジ」だが超短い。これが聞こえなくても焦るな。theを音として聞こうとするより名詞を待つ作戦が正解。',
  },

  {
    id: 'redu-013',
    type: 'reduction',
    written: 'some',
    spoken: 'sm / suhm',
    spokenJa: 'スム（弱く）',
    rule: '数量詞someは弱形では「sm」に近い音になる。「some people」が「smpeople」に近い音になる。',
    toeicContext: 'Part 3・4での数量・不定表現で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Some of the staff will be working remotely.",
        soundVersion: "Sm of the staff will be working remotely.",
        translation: 'スタッフの一部はリモートワークになります。',
        toeicPart: 4,
      },
    ],
    masterTip: 'someも弱化する。「サム」と発音するのは強調時のみ。「スム」くらいの弱さで出てくる。数量不定の文脈で聞こえたらsomeだと判断。',
  },

  {
    id: 'redu-014',
    type: 'reduction',
    written: 'at',
    spoken: 'uht',
    spokenJa: 'アット（弱く短く）',
    rule: '前置詞atは弱形では「uht」に近く、非常に短く発音される。時間や場所の前に出てくる。',
    toeicContext: '全パートで時刻・場所指定に必ず出る。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "The meeting starts at nine thirty.",
        soundVersion: "The meeting starts uht nine thirty.",
        translation: '会議は9時半に始まります。',
        toeicPart: 4,
      },
    ],
    masterTip: 'atは弱くアット。場所と時間の前に出てくるが超短い。聞こえなくても数字や場所名が来たらatだったと判断できる。',
  },

  {
    id: 'redu-015',
    type: 'reduction',
    written: 'that',
    spoken: 'thuht / thut',
    spokenJa: 'ザット（超短く）',
    rule: '接続詞・関係代名詞のthatは弱形で「thut」になる。「I think that」のthatはほぼ消える。',
    toeicContext: '全パートで接続詞・関係代名詞として頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "I think that the report is ready.",
        soundVersion: "I think thut the report is ready.",
        translation: 'レポートは準備できていると思います。',
        toeicPart: 3,
      },
    ],
    masterTip: 'thatはザット。でも弱形の時は「ザット」より「ザ」に近い。接続詞のthatは特に弱い。聞こえなくても「think」の後だからthatだと判断できる。',
  },

  {
    id: 'redu-016',
    type: 'reduction',
    written: 'him',
    spoken: '\'m / ihm',
    spokenJa: 'ム（ほぼm音だけ）',
    rule: '目的格のhimは弱形でh音が消えて「\'m」になる。「told him」が「told\'m」になる。',
    toeicContext: 'Part 3の第三者について話す会話で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Did you tell him about the change?",
        soundVersion: "Did you tell\'m about the change?",
        translation: '変更のことを彼に伝えましたか？',
        toeicPart: 3,
      },
    ],
    masterTip: 'himはム。h音が消えて「tell\'m」になる。him/her/his/herのh音は弱形では全部消える。「テルム」が「told him」。慣れが必要。',
  },

  {
    id: 'redu-017',
    type: 'reduction',
    written: 'them',
    spoken: '\'em / thuhm',
    spokenJa: 'エム（ほぼm音だけ）',
    rule: 'themの弱形はthが消えて「\'em」になる。「call them」が「call\'em」になる。',
    toeicContext: 'Part 3の複数人に関する指示・依頼で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Just let them know as soon as possible.",
        soundVersion: "Just let\'em know as soon as possible.",
        translation: 'できるだけ早く彼らに知らせてください。',
        toeicPart: 3,
      },
    ],
    masterTip: 'themはエム。「レレム」が「let them」。thが全部消える。複数の人に指示するシーンで「〜エム」が聞こえたらthemが入ってると思え。',
  },

  {
    id: 'redu-018',
    type: 'reduction',
    written: 'been',
    spoken: 'bin',
    spokenJa: 'ビン（短く）',
    rule: '完了形のbeenは弱形で「bin」に近い発音になる。「I\'ve been」が「アイヴビン」になる。',
    toeicContext: '全パートで完了形として頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "The system has been down since this morning.",
        soundVersion: "The system has bin down since this morning.",
        translation: 'システムは今朝からダウンしています。',
        toeicPart: 4,
      },
    ],
    masterTip: 'beenはビン。「ビーン」と伸ばさず「ビン」と短く切る。完了形の文で「ハズビン」が聞こえたら「has been」。状態の継続を表す。',
  },

  {
    id: 'redu-019',
    type: 'reduction',
    written: 'were',
    spoken: 'wer / wuh',
    spokenJa: 'ワ（超短く）',
    rule: 'wereの弱形は「wuh」に近い。「they were」が「ゼイワ」に聞こえる。',
    toeicContext: 'Part 2・3の過去の状況説明で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "They were notified last week.",
        soundVersion: "They wuh notified last week.",
        translation: '先週彼らに通知されました。',
        toeicPart: 3,
      },
    ],
    masterTip: 'wereはワ。「ゼイワ」が「they were」。be動詞の弱形はすべて超短い。isもareもwereもam も強調なしは消えると覚えろ。',
  },

  {
    id: 'redu-020',
    type: 'reduction',
    written: 'do you',
    spoken: 'dyuh / juh',
    spokenJa: 'ジャ（速く）',
    rule: '「do you」が速い会話では「dyuh」→「juh」まで縮む。疑問文の冒頭で頻繁に出る。',
    toeicContext: 'Part 2の疑問文で毎回出る。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Do you have a reservation?",
        soundVersion: "Juh have a reservation?",
        translation: 'ご予約はありますか？',
        toeicPart: 3,
      },
    ],
    masterTip: '「Do you」はジャ。「ジャハヴァリザベーション？」で「予約はありますか」。Part 2の疑問文は冒頭の「ジャ」を聞き取ってから動詞を待つ作戦が有効。',
  },

  // ===== ASSIMILATION (15 entries) =====

  {
    id: 'assim-001',
    type: 'assimilation',
    written: 'did you',
    spoken: 'didju / dijoo',
    spokenJa: 'ディジュ',
    rule: 'd + y → dj（ジュ）という同化。did の d と you の y が融合して「ジュ」になる。',
    toeicContext: 'Part 2の過去疑問文で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Did you receive my email?",
        soundVersion: "Dijoo receive my email?",
        translation: 'メールは届きましたか？',
        toeicPart: 2,
      },
      {
        sentence: "Did you check the inventory?",
        soundVersion: "Dijoo check the inventory?",
        translation: '在庫を確認しましたか？',
        toeicPart: 2,
      },
    ],
    masterTip: '「Did you」はディジュ。d+yが融合してジュになる。「ジュリシーブマイイーメイル？」で「メール届いた？」。Part 2の過去疑問文の鉄板パターン。',
  },

  {
    id: 'assim-002',
    type: 'assimilation',
    written: 'would you',
    spoken: 'wouldju / wudju',
    spokenJa: 'ウッジュ',
    rule: 'd + y → dj 同化。would の d と you の y が「ジュ」になる。丁寧な依頼で頻出。',
    toeicContext: 'Part 2の依頼疑問文、Part 3の丁寧な依頼で毎回出る。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Would you mind waiting for a moment?",
        soundVersion: "Wudju mind waiting for a moment?",
        translation: '少々お待ちいただけますか？',
        toeicPart: 2,
      },
      {
        sentence: "Would you like to reschedule?",
        soundVersion: "Wudju like to reschedule?",
        translation: 'スケジュールを変更しますか？',
        toeicPart: 3,
      },
    ],
    masterTip: '「Would you」はウッジュ。「ウッジュマインド〜」で丁寧な依頼。丁寧に頼んでるのにジュとしか聞こえない。これがTOEICPart 2頻出パターン。',
  },

  {
    id: 'assim-003',
    type: 'assimilation',
    written: 'got you',
    spoken: 'gotcha',
    spokenJa: 'ガッチャ',
    rule: 't + y → ch 同化。got の t と you の y が融合して「チャ」になる。',
    toeicContext: 'Part 3の日常会話、了解・把握を表す返答で出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Got you—I'll pass the message along.",
        soundVersion: "Gotcha—I'll pass the message along.",
        translation: '了解です。伝えておきます。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ガッチャ。「分かった」「捕まえた」の両方に使う。t+y→チュ同化の典型例。カジュアルな職場会話では普通に出てくる。',
  },

  {
    id: 'assim-004',
    type: 'assimilation',
    written: "don't you",
    spoken: 'donchu',
    spokenJa: 'ドンチュ',
    rule: 't + y → ch 同化。don\'t の t と you の y が「チュ」になる。否定疑問文で頻出。',
    toeicContext: 'Part 2の確認疑問文・否定疑問文で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Don't you have a copy of the contract?",
        soundVersion: "Donchu have a copy of the contract?",
        translation: '契約書のコピーをお持ちじゃないですか？',
        toeicPart: 2,
      },
    ],
    masterTip: 'ドンチュ。否定疑問文の「don\'t you」がドンチュに変わる。「ドンチュ〜？」は「〜じゃないですか？」という確認の意味。慣れると一瞬で分かる。',
  },

  {
    id: 'assim-005',
    type: 'assimilation',
    written: 'meet you',
    spoken: 'meechu',
    spokenJa: 'ミーチュ',
    rule: 't + y → ch 同化。meet の t と you の y が「チュ」になる。',
    toeicContext: 'Part 3の初対面・挨拶シーンで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Nice to meet you, I'm the new account manager.",
        soundVersion: "Nice to meechu, I'm the new account manager.",
        translation: 'はじめまして。新しい担当者の〇〇です。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ミーチュ。「nice to meet you」は「ナイストゥミーチュ」。t+yの同化で「チュ」。初対面シーンでは絶対に出る。TOEICの鉄板フレーズ。',
  },

  {
    id: 'assim-006',
    type: 'assimilation',
    written: 'last year',
    spoken: 'las-cheer',
    spokenJa: 'ラスチアー',
    rule: 'st + y → sch 同化。last の t と year の y が融合して「チ」になる。',
    toeicContext: 'Part 4のスピーチ・レポートで時制表現として頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Sales were up fifteen percent last year.",
        soundVersion: "Sales were up fifteen percent las-cheer.",
        translation: '昨年の売上は15%増でした。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ラスチアー。「last year」が「ラスチアー」になる。st+y同化の典型。過去の実績を語るスピーチで毎回出てくる。「ラスチアー」で昨年と即反応しろ。',
  },

  {
    id: 'assim-007',
    type: 'assimilation',
    written: 'this year',
    spoken: 'thi-sheer',
    spokenJa: 'ジシアー',
    rule: 'th + y → 同化。this の s と year の y が融合して「シャ」に近い音になる。',
    toeicContext: 'Part 4のアナウンス・スピーチで現在・今年を表す文脈。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "This year's target is twenty percent growth.",
        soundVersion: "Thi-sheer's target is twenty percent growth.",
        translation: '今年の目標は20%成長です。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ジシアー。「this year」がジシアーに近い音に。this+year でsとyが融合する。last yearとセットでよく出る。「ラスチアー」vs「ジシアー」で過去vs現在を判断。',
  },

  {
    id: 'assim-008',
    type: 'assimilation',
    written: 'could you',
    spoken: 'couldju / kudjuh',
    spokenJa: 'クッジュ',
    rule: 'd + y → dj 同化。could の d と you の y が「ジュ」になる。',
    toeicContext: 'Part 2の依頼疑問文で毎回出る。would you と同パターン。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Could you send me the report by five?",
        soundVersion: "Kudjuh send me the report by five?",
        translation: '5時までにレポートを送ってもらえますか？',
        toeicPart: 2,
      },
    ],
    masterTip: 'クッジュ。「Could you〜?」がクッジュ〜になる。Would youと全く同じ同化パターン。依頼文の冒頭を「クッジュ」か「ウッジュ」で判断しろ。',
  },

  {
    id: 'assim-009',
    type: 'assimilation',
    written: 'what you',
    spoken: 'whatchu / whachu',
    spokenJa: 'ワッチュ',
    rule: 't + y → ch 同化。what の t と you の y が「チュ」になる。',
    toeicContext: 'Part 2の疑問文、「what do you」形式で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "That's exactly what you needed.",
        soundVersion: "That's exactly whatchu needed.",
        translation: 'まさにあなたが必要としていたものですね。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ワッチュ。「what you」がワッチュ。「what do you」は「ワッジュ」になる。何を尋ねる系の疑問文の鉄板音変化。',
  },

  {
    id: 'assim-010',
    type: 'assimilation',
    written: 'at your',
    spoken: 'achur',
    spokenJa: 'アチュア',
    rule: 't + y → ch 同化。at の t と your の y が融合して「チュ」になる。',
    toeicContext: 'Part 2・3の場所・所有を示す表現で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "The package is waiting at your front desk.",
        soundVersion: "The package is waiting achur front desk.",
        translation: '荷物はフロントでお待ちです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'アチュア。「at your」がアチュアに。t+y同化は「did you」「would you」だけじゃない。atもdontもすべてyの前ではチュ音になる。法則さえ分かれば対応できる。',
  },

  {
    id: 'assim-011',
    type: 'assimilation',
    written: 'need you',
    spoken: 'needju',
    spokenJa: 'ニージュ',
    rule: 'd + y → dj 同化。need の d と you の y が「ジュ」になる。',
    toeicContext: 'Part 2・3の依頼・必要性の文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "I need you to sign this form.",
        soundVersion: "I needju to sign this form.",
        translation: 'この書類に署名していただく必要があります。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ニージュ。「I need you」がアイニージュ。d+y→ジュの法則。依頼シーンで「ニージュトゥ〜」が聞こえたら何かを頼んでいる。',
  },

  {
    id: 'assim-012',
    type: 'assimilation',
    written: 'see you',
    spoken: 'seeyuh',
    spokenJa: 'シーヤ',
    rule: '「see you」のyが前のeeと融合してyuh音になる。別れの挨拶として毎回出る。',
    toeicContext: 'Part 3の別れ・終了シーンで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "See you at the conference next week.",
        soundVersion: "Seeyuh at the conference next week.",
        translation: '来週のカンファレンスで会いましょう。',
        toeicPart: 3,
      },
    ],
    masterTip: 'シーヤ。別れ際の「see you」はシーヤ。「see you later」はシーヤレイター。会話の終わりに出てくる。シーヤ=会話終了のサイン。',
  },

  {
    id: 'assim-013',
    type: 'assimilation',
    written: 'miss you',
    spoken: 'mishu',
    spokenJa: 'ミシュ',
    rule: 's + y → sh 同化。miss の s と you の y が融合して「シュ」になる。',
    toeicContext: 'Part 3の感情的な会話、主にカジュアルな文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "We're going to miss you at the office.",
        soundVersion: "We're going to mishu at the office.",
        translation: 'あなたがいなくなるのは寂しいです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ミシュ。s+y→シュ同化。「miss you」がミシュ。退職シーンで絶対出る。s+youのパターンはすべてシュになると覚えておけ。',
  },

  {
    id: 'assim-014',
    type: 'assimilation',
    written: 'issue you',
    spoken: 'ish-yuh',
    spokenJa: 'イシュヤ',
    rule: 'issue の語末sh音と you の y が連続して「シュヤ」になる。issueが絡む文脈で出る。',
    toeicContext: 'Part 4のアナウンス、証明書・許可証の発行文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "We will issue you a temporary badge.",
        soundVersion: "We will ish-yuh a temporary badge.",
        translation: '一時的なバッジを発行いたします。',
        toeicPart: 4,
      },
    ],
    masterTip: 'イシュヤ。「issue you」がイシュヤ。sh+y の連続。証明書や通行証の発行シーンで出てくる。「イシュヤ〜」で「〜を発行する」と判断。',
  },

  {
    id: 'assim-015',
    type: 'assimilation',
    written: 'bet you',
    spoken: 'betchu',
    spokenJa: 'ベッチュ',
    rule: 't + y → ch 同化。bet の t と you の y が融合して「チュ」になる。',
    toeicContext: 'Part 3のカジュアルな職場会話で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "I bet you didn't expect that result.",
        soundVersion: "I betchu didn't expect that result.",
        translation: 'その結果は予想外だったでしょう。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ベッチュ。「I bet you」がアイベッチュ。「きっと〜だろう」という確信表現。t+y同化はどの動詞でも起きる。「チュ」が聞こえたら前にt、後にyouがある。',
  },

  // ===== ELISION (10 entries) =====

  {
    id: 'elis-001',
    type: 'elision',
    written: 'mostly',
    spoken: 'mosly',
    spokenJa: 'モースリー',
    rule: 'st の連続子音で t が脱落する。母音に挟まれていない t は消えやすい。',
    toeicContext: 'Part 4の説明・報告で程度・割合を表す文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "The feedback has been mostly positive.",
        soundVersion: "The feedback has been mosly positive.",
        translation: 'フィードバックはほぼ肯定的です。',
        toeicPart: 4,
      },
    ],
    masterTip: 'mostlyはモースリー。tが消える。stの連続子音でtが脱落するパターン。知らないと「もすり？」という謎の単語に聞こえる。',
  },

  {
    id: 'elis-002',
    type: 'elision',
    written: 'exactly',
    spoken: 'exacly',
    spokenJa: 'エグザクリー',
    rule: 'ctly の連続子音で t が脱落する。複数子音が連続する時に中間の音が消える。',
    toeicContext: '全パートで同意・確認表現として頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "That's exactly what we were looking for.",
        soundVersion: "That's exacly what we were looking for.",
        translation: 'それはまさに私たちが探していたものです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'exaclyでexactly。tが消えることで「エグザクリー」になる。同意表現の定番。「エグザクリー」が聞こえたら強い肯定のサイン。',
  },

  {
    id: 'elis-003',
    type: 'elision',
    written: 'probably',
    spoken: 'probly / probly',
    spokenJa: 'プロブリー',
    rule: 'probably の中間のaが脱落して3音節→2音節になる。速い会話では「prably」にまでなる。',
    toeicContext: '全パートで推量・可能性を表す文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "It will probably take another week.",
        soundVersion: "It'll probly take another week.",
        translation: 'もう一週間かかるでしょう。',
        toeicPart: 3,
      },
    ],
    masterTip: 'プロブリー。probablyの「aba」が縮んで「プロブリー」。4音節が2音節に。「おそらく」が半分の音になる。TOEICで推量・見込みを話すシーンで毎回出る。',
  },

  {
    id: 'elis-004',
    type: 'elision',
    written: 'comfortable',
    spoken: 'comftable / comftble',
    spokenJa: 'コンフタボゥ',
    rule: 'comfortable の中間の「for」部分が脱落して「comf-ta-ble」になる。4音節→3音節。',
    toeicContext: 'Part 1・3の環境・状態説明で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "Make yourself comfortable while you wait.",
        soundVersion: "Make yourself comftable while you wait.",
        translation: 'お待ちの間、くつろいでください。',
        toeicPart: 3,
      },
    ],
    masterTip: 'コンフタボゥ。comfortableの「or」が消える。「コンフォータブル」なんて言ってたら話についていけない。コンフタボゥ、3音節で一気に言う。',
  },

  {
    id: 'elis-005',
    type: 'elision',
    written: 'Wednesday',
    spoken: 'Wensday',
    spokenJa: 'ウェンズデイ',
    rule: '「Wednes」のd音が脱落してWens音になる。曜日の中で最もスペルと発音が乖離している。',
    toeicContext: 'Part 2・3で日程・スケジュール調整の文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "The training session is scheduled for Wednesday.",
        soundVersion: "The training session is scheduled for Wensday.",
        translation: '研修は水曜日に予定されています。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ウェンズデイ。Wednesdayのdが消える。スペルにdが2つあるのに両方消える。曜日の中でこれが一番スペルと音が違う。絶対に「ウェドゥネスデイ」とは言わない。',
  },

  {
    id: 'elis-006',
    type: 'elision',
    written: 'library',
    spoken: 'libry / li-bree',
    spokenJa: 'ライブリー',
    rule: 'libraryの第2音節のar（またはra）が脱落して「libry」になる。3音節→2音節。',
    toeicContext: 'Part 1・3・4の施設説明、場所を示す文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "The documents are stored in the library.",
        soundVersion: "The documents are stored in the libry.",
        translation: '書類は図書室に保管されています。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ライブリー。libraryが3音節→2音節。「ライブラリー」は教科書の発音。実際は「ライブリー」。施設名で出てくる。comfortableと同じ「中間脱落」パターン。',
  },

  {
    id: 'elis-007',
    type: 'elision',
    written: 'government',
    spoken: 'guvment / gov\'ment',
    spokenJa: 'ガヴメント',
    rule: 'governmentの「ern」部分が縮んで「guvment」になる。3音節→2音節。',
    toeicContext: 'Part 4のニュース・アナウンス、公的な文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "The government has announced new regulations.",
        soundVersion: "The gov\'ment has announced new regulations.",
        translation: '政府が新しい規制を発表しました。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ガヴメント。governmentが2音節に縮む。「ガバメント」と4音節で言うのは教科書のみ。Part 4の公的なアナウンスで「ガヴメント」と聞こえたら政府・行政のこと。',
  },

  {
    id: 'elis-008',
    type: 'elision',
    written: 'different',
    spoken: 'dif\'rent / difrnt',
    spokenJa: 'ディフレント',
    rule: 'differentの中間のeが脱落して「dif\'rent」になる。3音節→2音節。',
    toeicContext: '全パートで比較・差異を表す文脈で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "The two proposals are quite different.",
        soundVersion: "The two proposals are quite dif\'rent.",
        translation: '2つの提案はかなり異なります。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ディフレント。differentの真ん中のeが消える。「ディファレント」と3音節で言うのはゆっくり読む時だけ。比較シーンで「ディフレント」と聞こえたら違いがある。',
  },

  {
    id: 'elis-009',
    type: 'elision',
    written: 'interesting',
    spoken: 'intresting / int\'rsting',
    spokenJa: 'イントレスティング',
    rule: 'interestingの中間のeが2つ脱落して「intresting」になる。4音節→3音節。',
    toeicContext: 'Part 3・4の評価・意見表現で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "That's an interesting approach to the problem.",
        soundVersion: "That's an intresting approach to the problem.",
        translation: 'それは問題への興味深いアプローチですね。',
        toeicPart: 3,
      },
    ],
    masterTip: 'イントレスティング。interestingが4音節→3音節。「イン・テ・レス・ティング」は絵本の読み聞かせ。会話では「イントレスティング」。',
  },

  {
    id: 'elis-010',
    type: 'elision',
    written: 'supposed to',
    spoken: 'sposta / s\'post',
    spokenJa: 'スポスタ',
    rule: '「supposed」のdが脱落、「to」が弱化してaになる。全体で「sposta」に縮む。',
    toeicContext: 'Part 2・3の義務・予定を表す文脈で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "He was supposed to submit it yesterday.",
        soundVersion: "He was sposta submit it yesterday.",
        translation: '彼は昨日提出するはずでした。',
        toeicPart: 3,
      },
    ],
    masterTip: 'スポスタ。「supposed to」がスポスタ。「〜するはずだった」が全部くっついてスポスタ。elision + contraction の合わせ技。予定が崩れるシーンで出てくる。',
  },

  // ===== FLAPPING (8 entries) =====

  {
    id: 'flap-001',
    type: 'flapping',
    written: 'water',
    spoken: 'wader',
    spokenJa: 'ウォーダー',
    rule: '母音に挟まれたtが「r」に近い弾き音（フラップ）になる。アメリカ英語の最大の特徴。',
    toeicContext: 'Part 1の場所・物の描写、Part 3・4の施設説明で出る。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Please bring water to the conference room.",
        soundVersion: "Please bring wader to the conference room.",
        translation: '会議室に水を持ってきてください。',
        toeicPart: 2,
      },
    ],
    masterTip: 'ウォーダー。waterのtがdになる。アメリカ英語の象徴。「ウォーター」は教科書。実際は「ウォーダー」。知らないとwaterすら聞き取れない悲劇が起きる。',
  },

  {
    id: 'flap-002',
    type: 'flapping',
    written: 'better',
    spoken: 'bedder',
    spokenJa: 'ベダー',
    rule: '母音+t+母音のパターンで t → d フラッピング。better が bedder になる。',
    toeicContext: '全パートで比較級として頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "This version is much better than the original.",
        soundVersion: "This version is much bedder than the original.",
        translation: 'このバージョンは元のものよりずっと優れています。',
        toeicPart: 3,
      },
      {
        sentence: "We need a better solution.",
        soundVersion: "We need a bedder solution.",
        translation: 'もっと良い解決策が必要です。',
        toeicPart: 2,
      },
    ],
    masterTip: 'ベダー。betterのtがd。比較級で「より良い」が「ベダー」になる。「ベター」と聞こうとしてると全く別の音に聞こえる。',
  },

  {
    id: 'flap-003',
    type: 'flapping',
    written: 'meeting',
    spoken: 'meeding',
    spokenJa: 'ミーディング',
    rule: '母音+t+母音のパターン。meeting の ting が「ding」になる。TOEICで最頻出単語の一つにフラッピングが起きる。',
    toeicContext: 'Part 2・3・4のビジネスシーンで毎回出る。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "The meeting has been moved to Thursday.",
        soundVersion: "The meeding has been moved to Thursday.",
        translation: '会議は木曜日に移動になりました。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ミーディング。TOEICで最も出る単語の一つ「meeting」がミーディングになる。知ってたらスコア直結。meetingだけで毎テスト2〜3回は出てくる。',
  },

  {
    id: 'flap-004',
    type: 'flapping',
    written: 'city',
    spoken: 'siddy',
    spokenJa: 'スィリー / シリー',
    rule: '母音+t+母音パターン。city の t が d に変わる。',
    toeicContext: 'Part 1・4の地域・場所説明で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "The city council approved the new budget.",
        soundVersion: "The siddy council approved the new budget.",
        translation: '市議会が新しい予算を承認しました。',
        toeicPart: 4,
      },
    ],
    masterTip: 'シリー。cityが「スィリー」になる。tがdになるだけでなく、「dd」の音が「r」に近くなる。都市・街の話題で「シリー〜」が聞こえたらcityのこと。',
  },

  {
    id: 'flap-005',
    type: 'flapping',
    written: 'letter',
    spoken: 'ledder',
    spokenJa: 'レダー',
    rule: '母音+tt+母音パターン。tt もフラッピングで d になる。',
    toeicContext: 'Part 3・4の書類・通知シーンで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Please send a letter of confirmation.",
        soundVersion: "Please send a ledder of confirmation.",
        translation: '確認書をお送りください。',
        toeicPart: 3,
      },
    ],
    masterTip: 'レダー。letterのttがd。「手紙」が「レダー」になる。betterと全く同じパターン。etter→edderの変換が起きると覚えればletter/better/butter全部対応できる。',
  },

  {
    id: 'flap-006',
    type: 'flapping',
    written: 'total',
    spoken: 'todel / todle',
    spokenJa: 'トードゥ',
    rule: '「total」の中間のtがフラッピングでdになる。',
    toeicContext: 'Part 4のアナウンス、数値・合計を報告する文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "The total cost will be around five thousand.",
        soundVersion: "The todel cost will be around five thousand.",
        translation: '総費用は約5000ドルになります。',
        toeicPart: 4,
      },
    ],
    masterTip: 'トードゥ。totalのtがd。「合計」が「トードゥ」になる。数値発表のシーンで「トードゥ〜」が聞こえたら合計金額や数量が来る。',
  },

  {
    id: 'flap-007',
    type: 'flapping',
    written: 'waiting',
    spoken: 'wading',
    spokenJa: 'ウェイディング',
    rule: '「waiting」のtがフラッピングでdになる。進行形でよく出てくる。',
    toeicContext: 'Part 3の受付・待機シーンで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Someone is waiting for you at the front desk.",
        soundVersion: "Someone is wading for you at the front desk.",
        translation: 'フロントで誰かがお待ちです。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ウェイディング。waitingのtがd。受付シーンで「ウェイディング〜」が聞こえたら誰かが待っている状況。meetingと同じパターン。ingの前のtは必ずdになる。',
  },

  {
    id: 'flap-008',
    type: 'flapping',
    written: 'item',
    spoken: 'idem',
    spokenJa: 'アイデム',
    rule: '「item」の中間のtがフラッピングでdになる。日本人には「idem」という単語に聞こえる。',
    toeicContext: 'Part 3・4の商品・議題説明で頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "The next item on the agenda is the budget review.",
        soundVersion: "The next idem on the agenda is the budget review.",
        translation: '議題の次の項目は予算審査です。',
        toeicPart: 4,
      },
    ],
    masterTip: 'アイデム。itemのtがd。「品目」「議題の項目」が「アイデム」になる。会議シーンで「ネクストアイデム」が聞こえたら次の議題に移るサイン。',
  },

  // ===== CONTRACTIONS (16 entries) =====

  {
    id: 'cont-001',
    type: 'contraction',
    written: 'going to',
    spoken: 'gonna',
    spokenJa: 'ガナ',
    rule: '「going to」が「gonna」に縮む。be going to（未来表現）で常に起きる。',
    toeicContext: '全パートで未来の計画・予定を表す文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "We're going to need your approval by Monday.",
        soundVersion: "We're gonna need your approval by Monday.",
        translation: '月曜日までにご承認が必要です。',
        toeicPart: 3,
      },
      {
        sentence: "This is going to take longer than expected.",
        soundVersion: "This is gonna take longer than expected.",
        translation: 'これは予想より時間がかかりそうです。',
        toeicPart: 4,
      },
    ],
    masterTip: 'ガナ。going toは常にgonna。TOEICで未来の話をするときは必ずガナが出てくる。「イッツガナ〜」が聞こえたら未来予測。',
  },

  {
    id: 'cont-002',
    type: 'contraction',
    written: 'want to',
    spoken: 'wanna',
    spokenJa: 'ワナ',
    rule: '「want to」が「wanna」に縮む。希望・意図を表す表現で常に起きる。',
    toeicContext: '全パートで希望・意図・提案を表す文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Do you want to reschedule the appointment?",
        soundVersion: "Do you wanna reschedule the appointment?",
        translation: '予約を変更しますか？',
        toeicPart: 2,
      },
    ],
    masterTip: 'ワナ。want toは常にwanna。「ジュワナ〜」（do you wanna）が聞こえたら「〜したいですか？」という提案か確認。Part 2の鉄板。',
  },

  {
    id: 'cont-003',
    type: 'contraction',
    written: 'have to',
    spoken: 'hafta / hasta',
    spokenJa: 'ハフタ',
    rule: '「have to」が「hafta」に縮む。義務表現で常に起きる。have のv がf音になる（voicing assimilation）。',
    toeicContext: '全パートで義務・必要性を表す文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "I have to finish this report before noon.",
        soundVersion: "I hafta finish this report before noon.",
        translation: '正午までにこのレポートを終えなければなりません。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ハフタ。have toはhafta。「義務」が「ハフタ」。「アイハフタ〜」が聞こえたら必ずやらなきゃいけないことがある。must より少し軽い義務。',
  },

  {
    id: 'cont-004',
    type: 'contraction',
    written: 'got to',
    spoken: 'gotta',
    spokenJa: 'ガッタ',
    rule: '「got to」が「gotta」に縮む。have gotと組み合わせて義務を表す。',
    toeicContext: '全パートで義務・必要性を強調する文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "We've got to solve this before the client calls.",
        soundVersion: "We've gotta solve this before the client calls.",
        translation: 'クライアントが電話してくる前に解決しなければ。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ガッタ。got toはgotta。「ウィヴガッタ〜」が聞こえたら緊急の義務。gottaはhave toより切迫感が強い。急いでいるシーンで出てくる。',
  },

  {
    id: 'cont-005',
    type: 'contraction',
    written: 'used to',
    spoken: 'usta / yusta',
    spokenJa: 'ユスタ',
    rule: '「used to」が「usta」に縮む。過去の習慣・状態を表す。dが脱落してtoがaになる。',
    toeicContext: 'Part 3・4の過去との比較、変化を表す文脈で出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "We used to hold the meetings on Fridays.",
        soundVersion: "We usta hold the meetings on Fridays.",
        translation: '以前は金曜日にミーティングをしていました。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ユスタ。used toはusta。「昔は〜していた」が「ユスタ」。過去との比較シーンで必ず出る。「ウィユスタ〜」で以前の習慣・状態を表している。',
  },

  {
    id: 'cont-006',
    type: 'contraction',
    written: 'supposed to',
    spoken: 'sposta',
    spokenJa: 'スポスタ',
    rule: '「supposed to」が「sposta」に縮む。予定・義務を表すが、しばしば実現しなかった文脈で使われる。',
    toeicContext: 'Part 2・3の予定変更・遅延シーンで頻出。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "The package was supposed to arrive yesterday.",
        soundVersion: "The package was sposta arrive yesterday.",
        translation: '荷物は昨日届くはずでした。',
        toeicPart: 3,
      },
    ],
    masterTip: 'スポスタ。supposed toはsposta。「〜するはずだったのに」という残念な感じで出てくる。TOEICのトラブルシーンの鉄板表現。「スポスタ〜バット」が聞こえたら計画失敗。',
  },

  {
    id: 'cont-007',
    type: 'contraction',
    written: 'let me',
    spoken: 'lemme',
    spokenJa: 'レミー',
    rule: '「let me」が「lemme」に縮む。tが脱落してme がmmeになる。',
    toeicContext: '全パートで申し出・許可を求める文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "Let me check the schedule for you.",
        soundVersion: "Lemme check the schedule for you.",
        translation: 'スケジュールを確認させてください。',
        toeicPart: 2,
      },
      {
        sentence: "Let me know if you have any questions.",
        soundVersion: "Lemme know if you have any questions.",
        translation: 'ご質問があればお知らせください。',
        toeicPart: 4,
      },
    ],
    masterTip: 'レミー。let meはlemme。「レミーチェック〜」が聞こえたら申し出のサイン。Part 2で「Lemme〜」が来たら答える側は「はい/いいえ」の準備をしろ。',
  },

  {
    id: 'cont-008',
    type: 'contraction',
    written: 'give me',
    spoken: 'gimme',
    spokenJa: 'ギミー',
    rule: '「give me」が「gimme」に縮む。vが脱落してmが強くなる。',
    toeicContext: 'Part 2・3の依頼シーンで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "Give me a moment to look into it.",
        soundVersion: "Gimme a moment to look into it.",
        translation: '少し時間をください、確認します。',
        toeicPart: 2,
      },
    ],
    masterTip: 'ギミー。give meはgimme。「ギミーアモーメント」で「少し待って」。依頼系の表現で出てくる。「ギミー」でgive meだと即判断できるようになれ。',
  },

  {
    id: 'cont-009',
    type: 'contraction',
    written: 'kind of want to',
    spoken: 'kinda wanna',
    spokenJa: 'カインダワナ',
    rule: 'kind of + want to が二重縮小。reduciton + contraction の合わせ技。',
    toeicContext: 'Part 3の希望・意向を控えめに表す文脈で出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "I kind of want to explore other options.",
        soundVersion: "I kinda wanna explore other options.",
        translation: '他の選択肢も検討してみたいんですが。',
        toeicPart: 3,
      },
    ],
    masterTip: 'カインダワナ。kind of + want to がカインダワナ。二重縮小の典型。「少し〜したい」という控えめな希望表現。会話では当たり前の音。',
  },

  {
    id: 'cont-010',
    type: 'contraction',
    written: 'out of',
    spoken: 'outta',
    spokenJa: 'アウタ',
    rule: '「out of」が「outta」に縮む。tがフラッピングされ、ofが消える。',
    toeicContext: '全パートで在庫不足・場所からの移動を表す文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "We're out of stock on that item.",
        soundVersion: "We're outta stock on that item.",
        translation: 'その商品は在庫切れです。',
        toeicPart: 3,
      },
      {
        sentence: "She stepped out of the office for a moment.",
        soundVersion: "She stepped outta the office for a moment.",
        translation: '彼女は少しオフィスを出ました。',
        toeicPart: 3,
      },
    ],
    masterTip: 'アウタ。out ofはoutta。在庫シーンで「アウタストック」が聞こえたら在庫切れ。「アウタ」の後に来る名詞で何がないかを判断しろ。',
  },

  {
    id: 'cont-011',
    type: 'contraction',
    written: 'I am going to',
    spoken: "I'm gonna",
    spokenJa: 'アイムガナ',
    rule: 'I am が I\'m、going to が gonna に縮む。二重短縮。未来の意図表明の最頻出形。',
    toeicContext: '全パートで個人の計画・意図を表す文脈で頻出。',
    frequency: 'every-test',
    examples: [
      {
        sentence: "I am going to contact the supplier.",
        soundVersion: "I'm gonna contact the supplier.",
        translation: 'サプライヤーに連絡します。',
        toeicPart: 3,
      },
    ],
    masterTip: 'アイムガナ。I am going toが全部縮んでアイムガナ。個人の行動宣言。「アイムガナ〜」が聞こえたら話者が何かをすると決めた瞬間。',
  },

  {
    id: 'cont-012',
    type: 'contraction',
    written: 'should have',
    spoken: 'shoulda',
    spokenJa: 'シュダ',
    rule: '「should have」が「shoulda」に縮む。haveのhが消えてaだけ残る。後悔・批判の表現。',
    toeicContext: 'Part 3の反省・後悔シーンで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "We should have confirmed the booking earlier.",
        soundVersion: "We shoulda confirmed the booking earlier.",
        translation: 'もっと早く予約を確認すべきでした。',
        toeicPart: 3,
      },
    ],
    masterTip: 'シュダ。should haveはshouda。後悔表現の「〜すべきだった」がシュダになる。could have（クダ）、would have（ウダ）も同じパターン。後悔シーンではこの三種の神器が全部出る。',
  },

  {
    id: 'cont-013',
    type: 'contraction',
    written: 'could have',
    spoken: 'coulda',
    spokenJa: 'クダ',
    rule: '「could have」が「coulda」に縮む。shouldaと同じパターン。過去の可能性・後悔を表す。',
    toeicContext: 'Part 3の代替案・反省シーンで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "We could have saved time if we planned ahead.",
        soundVersion: "We coulda saved time if we planned ahead.",
        translation: '事前に計画していれば時間を節約できたのに。',
        toeicPart: 3,
      },
    ],
    masterTip: 'クダ。could haveはcoulda。「〜できたのに」という後悔。shoulda/coulda/woulda の三姉妹は全部セットで出てくる。反省・後悔シーンでは必ず聞こえる。',
  },

  {
    id: 'cont-014',
    type: 'contraction',
    written: 'would have',
    spoken: 'woulda',
    spokenJa: 'ウダ',
    rule: '「would have」が「woulda」に縮む。仮定法過去完了の帰結節で頻繁に出る。',
    toeicContext: 'Part 3の仮定・反事実表現で出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "I would have called, but I lost your number.",
        soundVersion: "I woulda called, but I lost your number.",
        translation: '電話したかったのですが、番号をなくしてしまって。',
        toeicPart: 3,
      },
    ],
    masterTip: 'ウダ。would haveはwoulda。「〜しただろうに」の仮定表現。shoulda/coulda/wouldaは後悔と仮定のセット表現。音で覚えると仮定法がすごく楽になる。',
  },

  {
    id: 'cont-015',
    type: 'contraction',
    written: 'what are you',
    spoken: 'whaddaya / whadaya',
    spokenJa: 'ワダヤ',
    rule: '「what are you」が連鎖縮小して「whadaya」になる。whatのt→フラッピングd、are→消える、youがya。',
    toeicContext: 'Part 3のカジュアルな問いかけで出る。',
    frequency: 'common',
    examples: [
      {
        sentence: "What are you working on right now?",
        soundVersion: "Whadaya working on right now?",
        translation: '今何をしていますか？',
        toeicPart: 3,
      },
    ],
    masterTip: 'ワダヤ。what are youが全部くっついてワダヤ。「ワダヤワーキングオン？」で「今何してる？」。カジュアルな職場会話で使われる。複数の音変化が重なる難易度高めパターン。',
  },

  {
    id: 'cont-016',
    type: 'contraction',
    written: 'I don\'t know',
    spoken: 'I dunno',
    spokenJa: 'アイダノ',
    rule: '「don\'t know」が「dunno」に縮む。don\'tのt脱落、knowのk→n弱化、全体が「dunno」。',
    toeicContext: 'Part 3の不確かな返答、情報不足のシーンで出る。',
    frequency: 'very-common',
    examples: [
      {
        sentence: "I don't know when the manager will be back.",
        soundVersion: "I dunno when the manager will be back.",
        translation: 'マネージャーがいつ戻るか分かりません。',
        toeicPart: 3,
      },
    ],
    masterTip: 'アイダノ。I don\'t knowはI dunno。知らないが「ダノ」になる。Part 3で情報が不足している状況の定番返答。「アイダノ〜」が聞こえたら不確かな情報が続く。',
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getSoundChangesByType(type: SoundChangeType): SoundChangeEntry[] {
  return SOUND_CHANGES.filter(entry => entry.type === type);
}

export function getSoundChangesByFrequency(
  freq: 'every-test' | 'very-common' | 'common'
): SoundChangeEntry[] {
  return SOUND_CHANGES.filter(entry => entry.frequency === freq);
}

export function getRandomSoundChangeQuiz(count: number): SoundChangeEntry[] {
  const shuffled = [...SOUND_CHANGES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, SOUND_CHANGES.length));
}

export function getSoundChangeById(id: string): SoundChangeEntry | undefined {
  return SOUND_CHANGES.find(entry => entry.id === id);
}

export function getSoundChangesByToeicPart(part: number): SoundChangeEntry[] {
  return SOUND_CHANGES.filter(entry =>
    entry.examples.some(ex => ex.toeicPart === part)
  );
}

export function getCategoryInfo(type: SoundChangeType): SoundChangeCategory | undefined {
  return SOUND_CHANGE_CATEGORIES.find(cat => cat.type === type);
}

// Stats helper for the quiz system
export function getSoundChangeSummary() {
  const byType: Record<SoundChangeType, number> = {
    linking: 0,
    reduction: 0,
    assimilation: 0,
    elision: 0,
    flapping: 0,
    contraction: 0,
  };

  const byFrequency = {
    'every-test': 0,
    'very-common': 0,
    'common': 0,
  };

  for (const entry of SOUND_CHANGES) {
    byType[entry.type]++;
    byFrequency[entry.frequency]++;
  }

  return {
    total: SOUND_CHANGES.length,
    byType,
    byFrequency,
  };
}
