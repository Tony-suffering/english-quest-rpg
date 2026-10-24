/**
 * BANK — The Interview / 面接
 *
 * 電話スクリーニング → 到着と雑談 → 自己紹介 → 職歴をたどる → なぜこの仕事か →
 * 行動面接 → 弱み → 給与 → こちらからの質問 → 次のステップ → お礼 → オファー →
 * 交渉 → 断る。採用の全工程を、面接官が言う側の英語ごと入れてある。
 *
 * 面接英語の核は3つだけ。数字を先に言わない、悪口を言わない、具体例を1つ持つ。
 * この3つを守れば、単語が粗くても会話は最後まで持つ。
 */

import type { LifePhrase } from '../../lifeline-types';

export const INTERVIEW_BANK: LifePhrase[] = [

    // ---- 電話スクリーニング ----
    { en: "Hi, is this a good time to talk?", ja: '今お話ししても大丈夫ですか', note: '突然かかってくる。無理なら Can I call you back in ten? と返していい' },
    { en: "I'm reaching out about the application you submitted.", ja: 'ご応募の件でご連絡しました', note: 'reach out。電話でもメールでも connect の意味で使う' },
    { en: "This is just a quick screen, nothing formal.", ja: '軽い顔合わせです。かしこまらなくて大丈夫です', note: 'screen は本番の面接ではなく、ふるい分けの電話' },
    { en: "Can you hear me okay?", ja: '声は聞こえていますか', note: '電話面接は最初にこれ。聞こえないなら早めに言う' },
    { en: "Do you have about twenty minutes?", ja: '20分ほどお時間ありますか', note: '時間を先に切ってくる。長引かない合図' },
    { en: "What are you looking for in your next role?", ja: '次はどんな仕事を探していますか', note: '志望動機ではなく条件の話。通勤・裁量・分野で答える' },
    { en: "What's your timeline?", ja: 'いつ頃から働けますか', note: 'timeline は入社時期。I could start in about a month. が定型' },
    { en: "Are you interviewing anywhere else?", ja: '他社も受けていますか', note: '正直に言っていい。競合がいると話が早く進む' },
    { en: "I'd say I'm in the early stages with a couple of places.", ja: '何社か始まったところです', note: '社名は出さない。数だけ言うのが礼儀' },
    { en: "Great, I'd like to move you to the next round.", ja: '次の選考に進んでいただきたいです', note: 'round。選考の回。次が何回目か聞いておく' },

    // ---- 到着と待合の雑談 ----
    { en: "I'm here for a one o'clock with Dana Reyes.", ja: '1時からデイナ・レイエスさんとお約束です', note: '受付での言い方。時刻+担当者名で全部伝わる' },
    { en: "Have a seat, she'll be right down.", ja: 'おかけください。すぐ降りてきます', note: 'be right down。上の階から降りてくること' },
    { en: "Can I get you some water?", ja: 'お水いかがですか', note: '遠慮せずもらう。面接中は本当に喉が渇く' },
    { en: "Did you find us okay?", ja: '場所はすぐ分かりましたか', note: '雑談の入り口。Yes, no trouble at all. で十分' },
    { en: "Parking around here is a nightmare.", ja: 'この辺は駐車が大変で', note: '天気と並ぶ待合の定番ネタ。同意して一言足す' },
    { en: "It's right off the highway, so it was easy.", ja: '高速降りてすぐなので楽でした', note: 'right off。すぐ脇にある' },
    { en: "Sorry to keep you waiting.", ja: 'お待たせしてすみません', note: '10分待たされても必ず言われる' },
    { en: "No worries at all.", ja: 'とんでもないです', note: '待たされた側は必ずこう返す。ここで不機嫌を出さない' },
    { en: "We'll be in the conference room at the end of the hall.", ja: '突き当たりの会議室でやります', note: '歩きながら言われる。ついていけばいい' },

    // ---- 自己紹介 ----
    { en: "So, tell me about yourself.", ja: '自己紹介をお願いします', note: '生い立ちではない。今・過去・なぜここ の3段で2分' },
    { en: "Sure, where would you like me to start?", ja: 'どこから話しましょうか', note: '返していい質問。相手が絞ってくれて楽になる' },
    { en: "I've been doing this for about six years.", ja: 'この仕事は6年ほどやっています', note: '現在完了+年数から入るのが型。過去から始めない' },
    { en: "Right now I'm at a mid-sized firm handling their systems.", ja: '今は中堅企業でシステムを担当しています', note: '会社の規模を一語入れると相手が想像しやすい' },
    { en: "Before that I was on the support side.", ja: 'その前はサポート側にいました', note: 'the support side。部署名でなく役割で言う' },
    { en: "I'll keep it short.", ja: '手短にします', note: '長くなりそうな話の前置き。実際に短くする' },
    { en: "That's me in a nutshell.", ja: 'ざっとこんなところです', note: '自己紹介の締め。ここで一度止めて相手に渡す' },

    // ---- 職歴をたどる ----
    { en: "Walk me through your resume.", ja: '職歴を順に説明してください', note: 'walk me through。飛ばさず古い順に。要約ではない' },
    { en: "It says here you led the migration.", ja: '移行を主導したとありますね', note: 'It says here。履歴書を見ながらの前置き' },
    { en: "I see a gap here in 2022.", ja: '2022年に空白がありますね', note: '必ず突かれる。言い訳せず一文で説明して次へ進む' },
    { en: "I took some time off to care for my father.", ja: '父の介護でしばらく休んでいました', note: 'took time off。私的な事情はこの一言で足りる' },
    { en: "What made you leave?", ja: 'なぜ辞めたのですか', note: '前の会社の悪口を言った瞬間に落ちる質問' },
    { en: "The team got restructured and my role went away.", ja: '組織再編で自分の役割がなくなりました', note: '自分のせいでも相手のせいでもない言い方' },
    { en: "I was ready for something with more ownership.", ja: 'もっと任される仕事がしたくなりました', note: 'ownership。裁量。不満を前向きに言い換える定番' },
    { en: "How big was the team?", ja: 'チームは何人でしたか', note: '規模で経験の質を測っている。人数で答える' },
    { en: "Who did you report to?", ja: '直属の上司はどなたでしたか', note: 'report to。組織の中の位置を確認している' },

    // ---- なぜこの仕事、なぜうち ----
    { en: "Why this role?", ja: 'なぜこの職種なのですか', note: '仕事内容の話。会社の話とは分けて答える' },
    { en: "Why us?", ja: 'なぜうちなのですか', note: '調べていないと即バレる。製品名を1つ出せば通る' },
    { en: "What do you know about what we do?", ja: 'うちの事業はご存じですか', note: '完璧に答えなくていい。知っている範囲を正直に' },
    { en: "I've been following you since the product launch.", ja: '製品が出た頃から見ていました', note: 'follow。会社を追いかけていたという言い方' },
    { en: "It's the first job description that actually matched what I do.", ja: '実務と本当に合った求人は初めてでした', note: '褒めるより一致を言うほうが効く' },
    { en: "Where do you see yourself in five years?", ja: '5年後はどうなっていたいですか', note: '古い質問だが今も出る。役職ではなく能力で答える' },
    { en: "I'd like to be the person the team comes to for this.", ja: 'この分野でチームに頼られる人になりたいです', note: '出世欲を出さずに成長意欲だけ伝える型' },

    // ---- 行動面接 ----
    { en: "Tell me about a time you had a conflict with a coworker.", ja: '同僚とぶつかった経験を教えてください', note: 'Tell me about a time。過去の具体例を1つ。一般論は不正解' },
    { en: "Let me think of a good example.", ja: '良い例を思い出させてください', note: '沈黙より強い。3秒稼げて印象も悪くない' },
    { en: "We disagreed on how to handle a refund.", ja: '返金対応で意見が割れました', note: '揉め事は小さい話でいい。解決の仕方だけ見ている' },
    { en: "I asked him to walk me through his thinking.", ja: '彼の考えを一通り説明してもらいました', note: '相手を否定せず情報を取りに行った、という展開が評価される' },
    { en: "It turned out we were solving different problems.", ja: '別々の問題を解こうとしていたと分かりました', note: 'It turned out。誤解が原因だった、の言い方' },
    { en: "We ended up doing it his way, and it worked.", ja: '結局彼のやり方でやって、うまくいきました', note: '自分が勝つ話にしないほうが好印象になる' },
    { en: "Tell me about a time you failed.", ja: '失敗した経験を教えてください', note: '成功にすり替えると見抜かれる。本当の失敗を1つ用意' },
    { en: "How do you handle a deadline you can't hit?", ja: '間に合わない締め切りはどうしますか', note: '頑張りますは答えにならない。手順で答える' },
    { en: "I flag it early. Nobody likes a surprise on Friday.", ja: '早めに知らせます。金曜に急に言われるのが一番困るので', note: 'flag。問題を早めに立てて共有すること' },

    // ---- 弱み ----
    { en: "What's your biggest weakness?", ja: '一番の弱みは何ですか', note: '完璧主義と答えるのが一番嫌われる。実際の弱みを言う' },
    { en: "I take on too much and I don't ask for help soon enough.", ja: '抱え込みすぎて、助けを求めるのが遅いです', note: '実害のある弱みを選ぶ。ただし致命傷は選ばない' },
    { en: "I'm working on it. I check in at the halfway point now.", ja: '改善中で、今は途中で必ず進捗を共有しています', note: '弱み+対策 の2文セット。対策のない弱みは事故' },
    { en: "Public speaking, honestly.", ja: '正直に言うと人前で話すことです', note: 'honestly を付けると作り話に聞こえない' },
    { en: "How do you take criticism?", ja: '指摘はどう受け止めますか', note: '前向きな言葉より、実際にどう動いたかを添える' },
    { en: "I'd rather hear it than not.", ja: '言われないより言われたほうがいいです', note: '短い一文で済ませて、次に具体例を足す' },

    // ---- 給与の話をかわす ----
    { en: "What are your salary expectations?", ja: '希望年収はいくらですか', note: '先に数字を言うとそれが上限になる。まずかわす' },
    { en: "What's the range budgeted for this role?", ja: 'この職種の予算幅はどれくらいですか', note: '質問を質問で返す。これが一番効く一文' },
    { en: "I'd rather hear the range you have in mind first.", ja: '先に御社の想定を伺いたいです', note: 'I would rather。丁寧に順番を入れ替える' },
    { en: "We have some flexibility.", ja: '多少の幅はあります', note: '交渉できるという合図。ここで引かない' },
    { en: "The range is eighty to ninety-five, depending on experience.", ja: '経験次第で8万から9万5千ドルです', note: '数字は千単位を省いて言う。eighty = 80,000' },
    { en: "That's in the right ballpark.", ja: 'だいたい合っています', note: 'ballpark。数字をぼかしたまま肯定できる便利な語' },
    { en: "I'm looking for something in the nineties.", ja: '9万台を希望しています', note: '一点で言わず幅で言う。刻まれる余地を残さない' },
    { en: "What are you making now?", ja: '今の年収はいくらですか', note: '州によっては質問自体が違法。答えなくても失礼にならない' },
    { en: "I'd rather focus on what the role is worth.", ja: 'この仕事の価値の話にしたいです', note: '現年収の質問をかわす一文。角が立たない' },
    { en: "Is that base, or does that include bonus?", ja: 'それは基本給ですか、賞与込みですか', note: '必ず分けて確認する。込みで言われることが多い' },

    // ---- こちらからの質問 ----
    { en: "What questions do you have for us?", ja: '何かご質問はありますか', note: 'ないと答えると興味なしと取られる。最低2つ用意' },
    { en: "What does success look like in the first ninety days?", ja: '最初の90日で何ができていれば成功ですか', note: '一番評判のいい質問。仕事の中身が具体的に見える' },
    { en: "Why is this position open?", ja: 'この募集が出た理由は何ですか', note: '前任者が辞めたのか増員なのかで職場が読める' },
    { en: "How would you describe the team's style?", ja: 'チームの雰囲気はどんな感じですか', note: '答え方そのものが情報になる。詰まったら要注意' },
    { en: "What's the hardest part of this job?", ja: 'この仕事で一番大変なのはどこですか', note: '良い面しか言わない相手を試せる' },
    { en: "Is the team in the office or remote?", ja: 'チームは出社ですかリモートですか', note: '週何日かまで踏み込んで確認する' },
    { en: "Do you have any hesitations about me?", ja: '私について懸念はありますか', note: '勇気がいるが、その場で誤解を解ける唯一の質問' },
    { en: "That's a fair question.", ja: 'いい質問ですね', note: '面接官が答えを考える時間を稼ぐ一言' },

    // ---- 次のステップ ----
    { en: "What are the next steps?", ja: '今後の流れはどうなりますか', note: '必ず聞いてから帰る。聞かないと待つだけになる' },
    { en: "We're talking to a few more candidates this week.", ja: '今週あと数人と面接します', note: '結論が出るのは来週以降、という意味' },
    { en: "You should hear from us by Friday.", ja: '金曜までにはご連絡します', note: 'should。約束ではない。過ぎたら催促していい' },
    { en: "If you don't hear from me, feel free to follow up.", ja: '連絡がなければ催促してください', note: 'follow up。催促を許可された合図。遠慮しない' },
    { en: "Who should I follow up with?", ja: 'どなたに連絡すればいいですか', note: '窓口を確定させてから帰る' },
    { en: "There'd be one more round with the director.", ja: 'あと1回、部長との面接があります', note: '残りの回数を必ず確認しておく' },
    { en: "Thanks for coming in.", ja: '本日はお越しいただきありがとうございました', note: '面接終了の合図。立ち上がる' },

    // ---- お礼と催促 ----
    { en: "Thank you for taking the time to meet with me today.", ja: '本日はお時間をいただきありがとうございました', note: 'お礼メールの書き出し。24時間以内に送る' },
    { en: "I especially enjoyed hearing about the rollout.", ja: '導入の話が特に面白かったです', note: '面接で出た固有の話を1つ入れると差がつく' },
    { en: "It reinforced my interest in the role.", ja: 'この仕事への関心がより強くなりました', note: 'reinforce。もともとあった気持ちが強まった、という順' },
    { en: "Please let me know if you need anything else from me.", ja: '他に必要なものがあればお知らせください', note: 'お礼メールの締め。売り込まずに終える' },
    { en: "Just following up on our conversation last week.", ja: '先週の面接の件でご連絡しました', note: '催促の書き出し。急かす言葉は一切入れない' },
    { en: "No rush. I know these things take time.", ja: '急ぎません。時間がかかるものだと承知しています', note: '催促を柔らかくする一文。これがないと圧が出る' },

    // ---- オファーの電話 ----
    { en: "I'm calling with good news.", ja: '良いお知らせでお電話しました', note: 'オファーの電話の第一声。ここで結果が分かる' },
    { en: "We'd like to offer you the position.", ja: 'ぜひ来ていただきたいです', note: '正式な言い方。この場で条件を全部詰めない' },
    { en: "That's great to hear. Thank you.", ja: 'ありがとうございます。嬉しいです', note: '喜びは伝えつつ、承諾の言葉はまだ言わない' },
    { en: "I'll send the written offer this afternoon.", ja: '午後に書面をお送りします', note: '口頭の条件で喜ばない。書面を見てから判断する' },
    { en: "When do you need an answer?", ja: 'いつまでにお返事すればいいですか', note: '期限を先に取る。これで考える時間ができる' },
    { en: "Could I have a couple of days to look it over?", ja: '2、3日、内容を確認する時間をいただけますか', note: '必ず言う。即答はほぼ確実に損をする' },
    { en: "Take the weekend.", ja: '週末いっぱい考えてください', note: '普通に認められる。慌てなくていい' },

    // ---- 交渉 ----
    { en: "I'm excited about this. I do want to talk about the number.", ja: 'ぜひやりたいです。ただ金額だけ相談させてください', note: '肯定してから交渉に入る。この順を崩すと空気が変わる' },
    { en: "Based on what I'm seeing for this role, I was hoping for closer to ninety-five.", ja: '相場を見て、9万5千に近い額を希望していました', note: 'closer to。ぴったりを要求しない言い方' },
    { en: "Is there any flexibility on the base?", ja: '基本給は動かせますか', note: '交渉の入口で一番柔らかい言い方' },
    { en: "If the base is fixed, could we look at the signing bonus?", ja: '基本給が固定なら、支度金はいかがでしょう', note: '断られたら別の項目に移す。ここで諦めない' },
    { en: "What about an extra week of vacation?", ja: '休暇をもう1週間いただけませんか', note: '金が動かない時に通りやすい。会社の負担が軽い' },
    { en: "Let me take that back to the team.", ja: '社内で確認してみます', note: 'この返事が出たら交渉はまだ生きている' },
    { en: "I can do ninety-two, but that's where I have to stop.", ja: '9万2千までです。それが上限です', note: 'that is where I have to stop。最終回答の合図' },
    { en: "That works for me. Let's do it.", ja: 'それで結構です。お願いします', note: '合意の一言。ここで初めて承諾になる' },

    // ---- 断る、断られる ----
    { en: "I've decided to go in another direction.", ja: '他の道に進むことにしました', note: '辞退の定型。理由を細かく言う必要はない' },
    { en: "It was a really tough call.", ja: '本当に迷いました', note: '断る側が必ず添える一言。角が立たなくなる' },
    { en: "The other role is closer to home.", ja: 'もう一方が家から近いので', note: '当たり障りのない理由。給与を理由に挙げない' },
    { en: "I hope we can stay in touch.", ja: '今後もつながっていられたら嬉しいです', note: '本当に連絡が来ることがある。社交辞令で終わらせない' },
    { en: "We're sorry to hear that, but we understand.", ja: '残念ですが承知しました', note: '辞退を受けた側の定型。追いすがることはまずない' },
    { en: "Unfortunately we've decided to move forward with another candidate.", ja: '残念ながら他の方に決まりました', note: 'move forward with。不採用通知はほぼこの形' },
    { en: "We'd like to keep you in mind for future openings.", ja: '今後の募集の際にまたご連絡します', note: '大半は社交辞令。ただし返信はしておく' },

];
