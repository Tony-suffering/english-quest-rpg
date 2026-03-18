// 居酒屋TOEIC -- Trap Patterns Encyclopedia
// 15+ categories of TOEIC listening traps with examples

export interface TrapExample {
  audio: string;        // What you hear
  wrongAnswer: string;  // The trap answer
  rightAnswer: string;  // The correct answer
  whyWrong: string;     // Japanese explanation
}

export interface TrapPattern {
  id: string;
  type: string;
  typeJa: string;
  description: string;    // Japanese
  howItWorks: string;     // Japanese - how the trap is set
  howToAvoid: string;     // Japanese - how to beat it
  frequency: 'very-common' | 'common' | 'occasional';
  parts: number[];        // Which parts it appears in
  examples: TrapExample[];
  dangerLevel: 1 | 2 | 3; // 1=easy to spot, 3=expert trap
}

const trapPatterns: TrapPattern[] = [
  {
    id: 'verbatim-repeat',
    type: 'Verbatim Repeat',
    typeJa: '音声の単語そのまま使い',
    description:
      '問題の音声で使われた単語や表現をそのまま選択肢に入れて、正解に見せかける罠。「聞こえた単語＝正解」という思い込みを利用した最も基本的なTOEICの引っかけパターン。',
    howItWorks:
      '音声で「meeting」と言ったら不正解の選択肢に「meeting room」を入れる。脳が「知ってる単語だ」と安心して飛びついてしまう。聞き取りに自信がある受験者ほどハマる。',
    howToAvoid:
      '「音声で使われた単語がある＝疑え」を鉄則にする。意味の一致と音の一致は別物。選択肢の文意全体が音声の内容と合っているかを必ず確認する。',
    frequency: 'very-common',
    parts: [2, 3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio: 'Q: "When is the board meeting scheduled?"',
        wrongAnswer: '(A) "The meeting room is on the third floor."',
        rightAnswer: '(C) "It\'s set for Thursday at 2 PM."',
        whyWrong:
          '「meeting」という単語は出てくるが、質問は日時を聞いている。場所の情報は罠。',
      },
      {
        audio: 'Q: "Could you call the technician?"',
        wrongAnswer: '(B) "I\'ll call you back later."',
        rightAnswer: '(A) "Sure, I\'ll contact him right away."',
        whyWrong:
          '「call」がそのまま使われているが、内容は「後でかけ直す」であって「技術者に連絡する」ではない。',
      },
      {
        audio:
          'Announcement: "The conference has been moved to Room 204."',
        wrongAnswer: '(B) "The conference was canceled."',
        rightAnswer: '(A) "The conference location changed."',
        whyWrong:
          '「conference」という単語を含むが、内容は「キャンセル」でなく「移動」。単語一致に騙されてはいけない。',
      },
    ],
  },
  {
    id: 'similar-sound',
    type: 'Similar Sound',
    typeJa: '似た音の単語（同音異義・近似音）',
    description:
      '正解に関連する単語に音が似ているが意味が全く違う単語を選択肢に入れる罠。特にPart 1（写真描写）とPart 2で多発する。リスニングスキルが中級段階のときに最もよく引っかかる。',
    howItWorks:
      'work（働く）とwalk（歩く）、beach（ビーチ）とbeach（ビーチ）とbeech（ブナの木）、fifteen（15）とfifty（50）のように、音が近い単語を選択肢に仕込む。瞬間的に処理する脳が「聞こえた音に近い方」を選んでしまう。',
    howToAvoid:
      '意味の文脈チェックを必ずする。「この単語がこの文脈で使われるか？」と一瞬考える習慣。数字は特に要注意（teens vs tens）。速い音声での聞き取りはまず文脈から予測する。',
    frequency: 'very-common',
    parts: [1, 2, 3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio: 'Photo: A man is mowing the lawn.',
        wrongAnswer: '(B) "A man is rowing a boat."',
        rightAnswer: '(A) "A man is mowing the grass."',
        whyWrong:
          '"mowing" と "rowing" は音が似ている。写真に水面やボートがないなら即消去できる。',
      },
      {
        audio:
          'Q: "How many people attended the workshop?" A: "About fifteen."',
        wrongAnswer: 'Listener hears: fifty (50)',
        rightAnswer: 'Correct: fifteen (15)',
        whyWrong:
          '"fifteen" と "fifty" は特に速い発話では区別しにくい。文脈（ワークショップの規模感）でも判断する。',
      },
      {
        audio:
          'Audio: "The ship has been delayed due to weather conditions."',
        wrongAnswer: '(A) "The shop is closed for weather."',
        rightAnswer: '(C) "The vessel\'s arrival was postponed."',
        whyWrong:
          '"ship" と "shop" は音が非常に近い。文脈（weather delay, vessel）でshipと確定できる。',
      },
    ],
  },
  {
    id: 'wrong-tense',
    type: 'Wrong Tense',
    typeJa: '時制の罠',
    description:
      '音声の内容を正しく理解しているが、選択肢の時制がずれているパターン。「もうやった」「これからやる」「今やってる」の区別を巧みにずらしてくる。Part 3, 4の「次に何をするか」系設問で特に多い。',
    howItWorks:
      '音声で "We already sent the invoice." と言ったのに、選択肢に "They will send the invoice." が入っている。意味は合っているが時制が未来形。「内容が合ってるのに何か違う」という引っかかりを感じさせない絶妙なズレ。',
    howToAvoid:
      '設問の時制に注目する。"What did/has the speaker done?" なら過去、"What will they do?" なら未来。選択肢の動詞形を素早く確認する癖をつける。',
    frequency: 'common',
    parts: [2, 3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Audio: "We\'ve already informed all department heads about the restructuring."',
        wrongAnswer: '(A) "They will notify the managers soon."',
        rightAnswer: '(B) "The managers have been told about the changes."',
        whyWrong:
          '音声は過去完了（already informed）なのに選択肢Aは未来形（will notify）。内容は近いが時制が逆。',
      },
      {
        audio:
          'Q: "Did you finish the report?" A: "I\'m still working on it."',
        wrongAnswer: '(C) "The report was completed."',
        rightAnswer: '(A) "The report isn\'t done yet."',
        whyWrong:
          '"still working on it" は現在進行形で未完。選択肢Cは完了を示す過去形。真逆の時制。',
      },
    ],
  },
  {
    id: 'wrong-speaker',
    type: 'Wrong Speaker',
    typeJa: '話者の取り違え',
    description:
      '2人（または3人）の会話で、どちらが言ったかを入れ替えて不正解にする罠。「男性が言ったこと」と「女性が言ったこと」を逆にした選択肢が正解に見える設計。Part 3で最多発。',
    howItWorks:
      '設問が "What does the woman say about..." なのに、男性の発言内容を選択肢に入れる。会話の内容は正しく聞き取れていても、「誰が言ったか」を確認していないとハマる。',
    howToAvoid:
      '設問先読み時に "the man" or "the woman" を必ずチェック。音声中に「この情報は誰が言ったか」を意識して聞く。特に意見・提案・依頼系の設問では話者指定を確認。',
    frequency: 'common',
    parts: [3],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Man: "I think we should postpone the launch."\nWoman: "I agree, but we need approval first."',
        wrongAnswer:
          'Q: "What does the man suggest?" → (B) "Getting approval before proceeding."',
        rightAnswer: '(A) "Delaying the launch."',
        whyWrong:
          'approval（承認）は女性の発言。男性の提案はpostpone（延期）。話者を取り違えた典型的な罠。',
      },
      {
        audio:
          'Woman: "Can you cover my shift on Friday?"\nMan: "Sure, but I\'ll need the schedule."',
        wrongAnswer:
          'Q: "What does the woman ask for?" → (C) "A copy of the schedule."',
        rightAnswer: '(A) "Help with her work shift."',
        whyWrong:
          '「スケジュールが欲しい」は男性の条件。女性の依頼はシフトの代わりを求めること。',
      },
    ],
  },
  {
    id: 'topic-shift',
    type: 'Topic Shift',
    typeJa: '話題すり替え',
    description:
      '音声のトピックに関連はしているが、実際に言われた内容とは違う話題にすり替えた選択肢。「このくらい言ってそう」という予測を逆手に取る。',
    howItWorks:
      'オフィスの移転について話してる会話で、選択肢に「新しいオフィス家具の購入」を入れる。トピック（オフィス）は合っているが内容が違う。関連性があるせいで気づきにくい。',
    howToAvoid:
      '選択肢が「音声で実際に言われた内容か」を判断する。「言いそう」「関係ありそう」ではなく「実際に言っていたか」が基準。根拠が音声になければアウト。',
    frequency: 'common',
    parts: [3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Talk about: Company will relocate to a new building downtown next spring.',
        wrongAnswer:
          '(A) "The company is renovating its current building."',
        rightAnswer: '(C) "The company is moving to a different location."',
        whyWrong:
          '「リノベーション」は言われていない。「移転」の話なのに「現オフィスの改装」にすり替えられた。',
      },
      {
        audio:
          'Conversation about: Presentation date moved from Tuesday to Thursday.',
        wrongAnswer:
          '(B) "The presentation content has been changed."',
        rightAnswer: '(A) "The presentation has been rescheduled."',
        whyWrong:
          '変更されたのは日程のみ。内容変更は言及されていない。「変更」というキーワードに引っ張られた罠。',
      },
    ],
  },
  {
    id: 'over-specific',
    type: 'Over-Specific',
    typeJa: '言いすぎ（情報の過剰追加）',
    description:
      '音声が漠然と言ったことを、選択肢が過剰に具体化して言いすぎてるパターン。"soon" と言っただけなのに "by next Tuesday" になっている、など。音声で述べられていない詳細を足した選択肢。',
    howItWorks:
      '音声で "We\'ll contact you shortly." と言ったのに選択肢が "They will call you tomorrow morning." になっている。「もうすぐ連絡」という情報は合っているが「明日の朝に電話」は言っていない。正しそうに見えて根拠がない。',
    howToAvoid:
      '音声で言われた情報の範囲を超えた選択肢は消去。「具体的＝正確」ではなく「言われてない詳細が追加されてる＝アウト」と判断する。',
    frequency: 'common',
    parts: [3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio: 'Voicemail: "Please call us back at your earliest convenience."',
        wrongAnswer: '(A) "Call the office before 5 PM today."',
        rightAnswer: '(B) "Return the call when available."',
        whyWrong:
          '"5 PM today" は言われていない。"at your earliest convenience" は都合のいい時でいい、という意味。時間指定は過剰追加。',
      },
      {
        audio:
          'Audio: "The renovation will be completed soon and the office will reopen."',
        wrongAnswer: '(C) "The office will be open again by the end of this month."',
        rightAnswer: '(A) "The office will reopen after renovation."',
        whyWrong:
          '"soon" という表現を "by the end of this month" と具体的な時期に変えた。音声にはそんな情報はない。',
      },
    ],
  },
  {
    id: 'partial-truth',
    type: 'Partial Truth',
    typeJa: '半分だけ合ってる（部分正解の罠）',
    description:
      '選択肢の前半は正しいが後半が間違っている、または複数の条件のうち一方だけ正しいパターン。「なんとなく合ってる気がする」という感覚を利用した中〜上級者向けの罠。',
    howItWorks:
      '音声で「次の月曜日か火曜日に会議を設定する」と言ったのに、選択肢が「次の月曜日に会議を設定する」になっている。「次の」「会議」は合っているが「火曜日の可能性」が消えている。',
    howToAvoid:
      '選択肢の全ての要素が音声と一致しているか確認する。「一部は合ってるけど全部は合ってない」選択肢は不正解。特に複数の条件が絡む設問に注意。',
    frequency: 'common',
    parts: [3, 4],
    dangerLevel: 3,
    examples: [
      {
        audio:
          'Audio: "The package was delivered to the lobby, not your office."',
        wrongAnswer:
          '(A) "The package was delivered to the correct location."',
        rightAnswer: '(B) "The package is in the lobby."',
        whyWrong:
          '「届いた」は正しいが「正しい場所」ではなかった。前半の事実（delivered）を正解に見せかけて後半の内容（wrong location）を変えた。',
      },
      {
        audio:
          'Conversation: "We need to submit it by Friday, but only if the client approves."',
        wrongAnswer: '(C) "They must submit the document by Friday."',
        rightAnswer: '(A) "Submission depends on client approval."',
        whyWrong:
          '「金曜日まで」は合っているが「クライアント承認が条件」という前提を省いた。条件付きを無条件にすり替えた典型例。',
      },
    ],
  },
  {
    id: 'negative-confusion',
    type: 'Negative Confusion',
    typeJa: '否定疑問文の罠',
    description:
      '"Isn\'t it...?" "Haven\'t you...?" "Didn\'t they...?" などの否定疑問文に対する Yes/No の解釈が、日本語と英語で逆になる構造的罠。英語ネイティブ感覚が身についていないと詰まる。',
    howItWorks:
      '"Didn\'t you finish the report?" に対して、レポートを仕上げてたら "Yes, I did." 仕上げてなければ "No, I didn\'t." が英語の正解。日本語感覚だと「いいえ、仕上げました」と言いたくなるが英語では「No」は使わない。',
    howToAvoid:
      '英語のYes/Noは「事実の肯定・否定」で判断する。否定疑問に対しても同じルール。「仕上げた＝Yes」「仕上げてない＝No」と事実ベースで考える。質問の形（否定）に引っ張られない。',
    frequency: 'common',
    parts: [2],
    dangerLevel: 3,
    examples: [
      {
        audio: 'Q: "Aren\'t you coming to the meeting today?"',
        wrongAnswer:
          '(A) "No, I\'m coming." ← Grammatically wrong in English',
        rightAnswer: '(B) "Yes, I\'ll be there at 3."',
        whyWrong:
          '行くなら Yes。日本語の「いいえ、行きます」が Yes に相当する。否定疑問だからといって No で始める必要はない。',
      },
      {
        audio: 'Q: "Didn\'t the shipment arrive yesterday?"',
        wrongAnswer:
          '(C) "No, it came in the morning." ← Confusing: "no" contradicts the actual arrival',
        rightAnswer: '(A) "Yes, it arrived around 10 AM."',
        whyWrong:
          '荷物が届いたのなら Yes。"No, it came" は矛盾する英語。事実（届いた）に対して Yes と答えるのが正しい英語。',
      },
    ],
  },
  {
    id: 'indirect-answer',
    type: 'Indirect Answer',
    typeJa: '間接回答を不正解と思い込む罠',
    description:
      '直接的な答えが選択肢にないとき、間接的だが文脈上自然な応答を「違う気がする」と感じて排除してしまうパターン。これは罠というより「間接回答を知らないことが引き起こすミス」。',
    howItWorks:
      '"Why are you leaving early?" に対して "I have a dentist appointment." は直接の理由の言い方ではないが完全に自然な回答。「理由を聞いてるのに理由文（Because...）がない」と感じると間違った選択肢を選ぶ。',
    howToAvoid:
      '「会話として成立するか」を基準にする。Because〜 や直接的な肯定・否定がなくても、前後の文脈で意味が通じれば正解候補。Part 2では間接回答が正解になる頻度が非常に高い。',
    frequency: 'very-common',
    parts: [2],
    dangerLevel: 2,
    examples: [
      {
        audio: 'Q: "Where is the nearest copy machine?"',
        wrongAnswer:
          '(B) "Yes, you can use the machine." ← Irrelevant direct answer',
        rightAnswer: '(A) "I think James might know."',
        whyWrong:
          '場所を直接答えていないが「ジェームズなら知ってる」という間接的で自然な回答が正解。「知らない」の婉曲表現。',
      },
      {
        audio: 'Q: "Have you finished the quarterly report?"',
        wrongAnswer: '(A) "Yes, I finished it." ← Too direct, often a trap',
        rightAnswer:
          '(C) "I still have a few figures to check." ← Indirect: not done yet',
        whyWrong:
          '「まだ数字を確認中」＝未完了を示す間接回答。直接的な "No, I haven\'t" より自然な会話表現。',
      },
    ],
  },
  {
    id: 'number-swap',
    type: 'Number Swap',
    typeJa: '数字の入れ替え',
    description:
      '音声で言及された数字（時刻・金額・日付・数量）を、選択肢で別の数字にすり替えるパターン。数字は聞き取りにくく記憶しにくい弱点を突いた罠。',
    howItWorks:
      '"The meeting is at 2:30" と言ったのに選択肢が "3:20" "2:45" "3:30" になっている。数字の細かい差を正確に聞き取れているか、記憶保持できているかを試す。',
    howToAvoid:
      '設問先読み時に「数字系の答えが来る」と予測したらメモ準備をする。数字は聞こえた瞬間に頭の中で「3時半」と日本語化する。選択肢の数字は全部確認してから選ぶ。',
    frequency: 'common',
    parts: [2, 3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Voicemail: "The appointment has been changed to Thursday the 14th at 9:30."',
        wrongAnswer: '(B) "Thursday the 4th at 9:30."',
        rightAnswer: '(C) "Thursday the 14th at 9:30."',
        whyWrong:
          '"14th" と "4th" は音声で区別が難しい。数字の細部まで確実に聞き取る必要がある。',
      },
      {
        audio:
          'Q: "How much does the membership cost per year?" A: "It\'s 240 dollars."',
        wrongAnswer: '(A) "$214." (B) "$400." (C) "$24."',
        rightAnswer: '"$240."',
        whyWrong:
          '類似した数字を選択肢に並べる典型パターン。聞き取り後に選択肢全部と照合して確認する。',
      },
    ],
  },
  {
    id: 'synonym-blind',
    type: 'Synonym Blind',
    typeJa: 'パラフレーズに気づかない罠',
    description:
      '音声の表現が選択肢では異なる言葉（同義語・言い換え）に変わっており、同じ意味だと気づかず不正解にする逆パターン。「言葉が違うから内容も違う」という誤判断を誘う。',
    howItWorks:
      '音声で "resigned" と言ったのに選択肢が "quit her job" になっている。意味は同じだが単語が違う。「resignという言葉が選択肢にない」と感じると正解を排除してしまう。',
    howToAvoid:
      'TOEICはパラフレーズが必ず入ると理解した上で聞く。音声の単語をそのまま選択肢に探すのではなく「同じ意味の別の言い方」を探す。語彙力と文脈理解が鍵。',
    frequency: 'very-common',
    parts: [3, 4],
    dangerLevel: 3,
    examples: [
      {
        audio: 'Audio: "The project has been postponed until further notice."',
        wrongAnswer:
          '(A) "The project was postponed." ← Too literal, might miss nuance',
        rightAnswer: '(B) "The project schedule is on hold indefinitely."',
        whyWrong:
          '"postponed until further notice" = "on hold indefinitely"。音声の単語そのままではなくパラフレーズが正解。',
      },
      {
        audio:
          'Audio: "We were unable to secure additional funding for the initiative."',
        wrongAnswer:
          '(A) "They could not get more money for the project." ← Actually correct',
        rightAnswer:
          '(A) ← this IS the right answer. Paraphrase: "secure funding" = "get money", "initiative" = "project"',
        whyWrong:
          '"funding" が "money" に、"initiative" が "project" に言い換えられている。パラフレーズを認識できれば正解できる。',
      },
    ],
  },
  {
    id: 'first-speaker-bias',
    type: 'First-Speaker Bias',
    typeJa: '最初に聞こえた情報への固執',
    description:
      '会話の最初に出てきた情報に引っ張られてしまい、後から訂正・変更・追加された情報を見逃す認知バイアス系の罠。',
    howItWorks:
      '「最初は月曜日と言ったが、最終的に木曜日に変更した」会話で、設問が「いつ会議が開かれるか」を聞いている。最初に出てきた「月曜日」を記憶したまま選んでしまう。',
    howToAvoid:
      '会話の結論・最終決定が正解の根拠になることが多い。「最初に言ったこと」より「最終的にどうなったか」を追う。特に変更・訂正を示すフレーズ（"Actually...", "Never mind...", "Let\'s change that to..."）の後は要注目。',
    frequency: 'common',
    parts: [3],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Man: "Let\'s meet Tuesday." / Woman: "Actually, could we do Thursday instead?" / Man: "Thursday works."',
        wrongAnswer: '(A) "Tuesday."',
        rightAnswer: '(C) "Thursday."',
        whyWrong:
          '最初に出た「火曜日」に引っ張られてしまう。最終決定は「木曜日」。変更後の情報が正解。',
      },
      {
        audio:
          'Initial: "The price is $500." Later: "We\'re actually running a promotion, so it\'s $380."',
        wrongAnswer: '(B) "$500."',
        rightAnswer: '(A) "$380."',
        whyWrong:
          '最初の価格500ドルは訂正されている。プロモーション後の最終価格が設問の答え。',
      },
    ],
  },
  {
    id: 'emotional-trap',
    type: 'Emotional Trap',
    typeJa: '感情的に正しそうな答え',
    description:
      '「こういう状況ならこう言うべき」という感情・道徳的な直感を利用した罠。音声で実際に言われた内容より「言いそう」「言うべき」に感じる選択肢が用意されている。',
    howItWorks:
      '客がクレームを言ってる音声で「すぐに返金します」という選択肢を入れる。実際は「調査します」と言ったのに。「こういう状況だから返金と言うはず」という思い込みで選んでしまう。',
    howToAvoid:
      '「音声で実際に言われたか」だけを基準にする。常識的に正しいことでも、音声で言われていなければ正解にならない。TOEIC は「言われたこと」のテスト。',
    frequency: 'occasional',
    parts: [3, 4],
    dangerLevel: 3,
    examples: [
      {
        audio:
          'Customer complaint about broken product. Staff response: "I\'ll look into this right away and get back to you."',
        wrongAnswer: '(B) "The staff offered an immediate refund."',
        rightAnswer: '(A) "The staff promised to investigate."',
        whyWrong:
          '返金は言っていない。「調査する」と言った。「こういう状況なら返金するはず」という感情的判断が罠。',
      },
    ],
  },
  {
    id: 'too-obvious',
    type: 'Too Obvious',
    typeJa: '簡単すぎる答え＝疑え',
    description:
      'あまりにも直接的でわかりやすすぎる選択肢が、実はトラップになっているパターン。「こんなに簡単でいいの？」と感じたら疑うべき。特に難問セットに入ってる「易しすぎる選択肢」は罠の可能性が高い。',
    howItWorks:
      '難しい会話の中に「明らかに間違いっぽい」選択肢と「明らかに正解っぽい」選択肢と「微妙な正解」を並べる。「明らかに正解っぽい」を選ばせて実は不正解、というパターン。',
    howToAvoid:
      '難問と感じたらむしろシンプルな選択肢を疑う。「簡単すぎる＝何か見落としてる」と思って音声に戻る。「これでいいはず」より「なぜこれが正解か」を考える。',
    frequency: 'occasional',
    parts: [3, 4],
    dangerLevel: 3,
    examples: [
      {
        audio:
          'Complex negotiation conversation about contract terms and conditions.',
        wrongAnswer:
          '(A) "They reached an agreement." ← Too simple and direct for a complex dispute',
        rightAnswer:
          '(C) "They agreed to reconsider the payment schedule." ← Specific, based on audio',
        whyWrong:
          '内容は複雑な交渉なのに「合意した」だけのシンプルな選択肢が出てくる。音声では「支払いスケジュールについて再検討する」という具体的な決定がされていた。',
      },
    ],
  },
  {
    id: 'time-reference',
    type: 'Time Reference',
    typeJa: '時間表現の罠',
    description:
      '"next week", "this Friday", "in two days", "by the end of the month" など、時間表現の細かい差を利用した罠。「近い将来」と「具体的な日時」を入れ替えたり、相対的な表現と絶対的な表現を混ぜる。',
    howItWorks:
      '「来週の月曜日」と言ったのに選択肢が「今週の金曜日」になっている。または「3日以内」と言ったのに「来週末」になっている。時間表現は聞き取りが難しく、かつ複数の選択肢が「近い将来」というカテゴリで似てしまう。',
    howToAvoid:
      '時間表現は「今」を基準にした相対位置で整理する。今日より前か後か、今週か来週か、今月か来月か。メモが許される試験環境なら「Mon/next week」のように簡単にメモする。',
    frequency: 'common',
    parts: [2, 3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Audio: "The deadline has been moved up to this Thursday instead of next Monday."',
        wrongAnswer: '(A) "The deadline is next Monday."',
        rightAnswer: '(B) "The deadline was changed to Thursday."',
        whyWrong:
          '元の締め切り（来週月曜日）が変更されて今週木曜日になった。最初に出た日程ではなく最終の日程が答え。',
      },
      {
        audio:
          'Q: "When will the new system be ready?" A: "We should have it up and running by the end of next quarter."',
        wrongAnswer:
          '(A) "By the end of this month." ← Too soon, wrong time reference',
        rightAnswer: '(C) "Within the next few months."',
        whyWrong:
          '"next quarter" は「来四半期末」で数ヶ月後。「今月末」とは全く異なる。four quarter system の理解も必要。',
      },
    ],
  },
  {
    id: 'conditional-trap',
    type: 'Conditional Trap',
    typeJa: '条件付き情報の確定化',
    description:
      '音声で「〜すれば」「〜の場合は」と条件付きで述べられた情報を、選択肢で無条件の事実として表現する罠。条件が省かれると全く異なる意味になる。',
    howItWorks:
      '"If we receive the funding, we\'ll hire three more staff." と言ったのに選択肢が "The company will hire three employees." になっている。「資金が得られたら」という条件が消えて断定になっている。',
    howToAvoid:
      'If/Unless/As long as/Provided that などの条件節に注意。「〜の場合は」という情報と「確定してる情報」を区別して聞く。条件付きで述べられたことを無条件で選んではいけない。',
    frequency: 'occasional',
    parts: [3, 4],
    dangerLevel: 3,
    examples: [
      {
        audio:
          '"If the weather clears up, we\'ll hold the event outdoors. Otherwise, it\'s moving to the conference hall."',
        wrongAnswer: '(A) "The event will be held outdoors."',
        rightAnswer: '(C) "The venue depends on the weather."',
        whyWrong:
          '「屋外開催」は天候次第。条件なしに「屋外」と断定する選択肢は不正解。条件の可能性を残した選択肢が正解。',
      },
    ],
  },
  {
    id: 'purpose-mismatch',
    type: 'Purpose Mismatch',
    typeJa: '目的のすり替え',
    description:
      '電話・メール・会議の「目的」を似たが違う目的にすり替える罠。"Why is she calling?" "What is the purpose of the meeting?" などの設問で多発。特にPart 4のボイスメール・アナウンス型で頻出。',
    howItWorks:
      'サービスのキャンセル手続きについてのボイスメールなのに、「料金について問い合わせるため」という選択肢が入っている。どちらも「お金に関係すること」という共通点があるが目的が違う。',
    howToAvoid:
      'ボイスメール・アナウンスの「なぜ話しているか」を最初の2文で確定させる。先読みで目的系の設問を確認したら、音声開始直後に集中して目的を捉える。',
    frequency: 'common',
    parts: [3, 4],
    dangerLevel: 2,
    examples: [
      {
        audio:
          'Voicemail: Calling to confirm an appointment time that was previously scheduled.',
        wrongAnswer: '(B) "To reschedule an appointment."',
        rightAnswer: '(A) "To confirm an existing appointment."',
        whyWrong:
          '「確認」と「変更」は似て非なる目的。音声は確認のための電話で、変更するつもりではない。',
      },
      {
        audio:
          'Announcement: Store is closing early for a staff training event.',
        wrongAnswer: '(A) "To inform customers of a sale."',
        rightAnswer: '(C) "To notify customers of an early closing."',
        whyWrong:
          'スタッフトレーニングのための早期閉店アナウンス。セール情報は一切言及なし。「店内放送＝セール」という先入観を利用した罠。',
      },
    ],
  },
];

// Helper: Get traps by part number
export function getTrapsByPart(part: number): TrapPattern[] {
  return trapPatterns.filter((t) => t.parts.includes(part));
}

// Helper: Get traps by frequency
export function getTrapsByFrequency(
  frequency: TrapPattern['frequency']
): TrapPattern[] {
  return trapPatterns.filter((t) => t.frequency === frequency);
}

// Helper: Get traps by danger level
export function getMostDangerousTraps(minDanger: 1 | 2 | 3 = 3): TrapPattern[] {
  return trapPatterns.filter((t) => t.dangerLevel >= minDanger);
}

// Helper: Get trap by id
export function getTrapById(id: string): TrapPattern | undefined {
  return trapPatterns.find((t) => t.id === id);
}

// Helper: Get a random trap (for quiz/study mode)
export function getRandomTrap(part?: number): TrapPattern {
  const pool = part ? getTrapsByPart(part) : trapPatterns;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Summary stats
export const trapStats = {
  total: trapPatterns.length,
  byFrequency: {
    'very-common': trapPatterns.filter((t) => t.frequency === 'very-common').length,
    common: trapPatterns.filter((t) => t.frequency === 'common').length,
    occasional: trapPatterns.filter((t) => t.frequency === 'occasional').length,
  },
  byDanger: {
    1: trapPatterns.filter((t) => t.dangerLevel === 1).length,
    2: trapPatterns.filter((t) => t.dangerLevel === 2).length,
    3: trapPatterns.filter((t) => t.dangerLevel === 3).length,
  },
  mostDangerous: trapPatterns
    .filter((t) => t.dangerLevel === 3)
    .map((t) => ({ id: t.id, typeJa: t.typeJa })),
};

export default trapPatterns;
