/**
 * BANK — Getting Slagged Off / からかわれて、返す
 *
 * 英語圏で仲間として認められる入場試験。The Long Table と対になる窓口。
 * 音響条件は room-noise + multi-talker + crowd-roar。全員が同時に喋る中で来る。
 *
 * ■ 唯一の規則
 * **からかいは攻撃ではない。攻撃でないと示すために、わざと攻撃の形で来る。**
 * 本気の悪口なら、相手はもっと丁寧な言葉を選ぶ。乱暴なほど親しみの表明である。
 * だから正しい応答は、傷つくことでも謝ることでもなく、**打ち返すか、笑って認めるか**。
 * 黙ると、その瞬間に本当の攻撃に変わる。空気が変わるのは自分が黙ったからである。
 *
 * 並びは実際の流れ順: 来る → 受ける → 打ち返す → 自分を落とす → 過剰にやり返す →
 * 止める → 助ける → 謝る(本当に行き過ぎたとき)。
 */

import type { LifePhrase } from '../../lifeline-types';

export const SLAGGED_OFF_BANK: LifePhrase[] = [

    // ---- 来る(聞き取る側) ----
    { en: "Oh, here he comes.", ja: 'お、来たよこの人', note: '登場そのものをネタにする。歓迎の合図' },
    { en: "Look what the cat dragged in.", ja: 'なんだこれは', note: '古い定型。久しぶりに来た人へ。悪意ゼロ' },
    { en: "Nice of you to join us.", ja: 'よくおいでくださいました', note: '遅刻への皮肉。丁寧な形ほど皮肉が強い' },
    { en: "Who let him in?", ja: '誰が入れたんだ', note: '第三者に向けて言う。本人に直接言わないのが型' },
    { en: "And there it is.", ja: 'はい出ました', note: '予想通りの発言が出たとき。1文で片づける' },
    { en: "Classic.", ja: '出た、いつもの', note: '1語。その人らしい失敗が出たとき' },
    { en: "Every single time.", ja: '毎回それ', note: '繰り返しを指摘する。定番化しているほど笑いになる' },
    { en: "Mate, what are you wearing?", ja: 'おい、その服なんだ', note: '英国寄り。mate が付くと親しさが確定する' },
    { en: "Did you get dressed in the dark?", ja: '暗闇で着替えたのか', note: '服いじりの古典。悪意なし' },
    { en: "How long did that take you?", ja: 'それ考えるのに何分かかった？', note: 'つまらない冗談への返し' },
    { en: "You've been waiting all day to say that.", ja: 'それ一日待ってただろ', note: '準備された冗談を暴く。最も痛い指摘' },

    // ---- 受ける ----
    { en: "All right, all right.", ja: 'はいはい、わかった', note: '2回言うのが自然。笑いながら言えば負けにならない' },
    { en: "Wow. Okay.", ja: 'へえ。そうきますか', note: '2語。間を空けるほど効く' },
    { en: "Noted.", ja: '承知しました', note: '1語。棒読みで返すのが正解' },
    { en: "Thanks for that.", ja: 'どうもありがとう', note: '抑揚を平坦にする。感謝の形をした反撃' },
    { en: "Cheers, mate. Really.", ja: 'どうも。本当に', note: '英国寄り。Really. を足すと皮肉が確定する' },
    { en: "Great. Love that for me.", ja: '最高だね。自分のこと大好きになるわ', note: '若い世代の言い方。自虐と皮肉の中間' },
    { en: "That's the nicest thing you've ever said to me.", ja: '君に言われた中で一番優しい言葉だ', note: '悪口を褒め言葉として受ける。上級の返し' },
    { en: "Are you done?", ja: 'もういい？', note: '止めたいときの一文。怒っていない声で言う' },
    { en: "You finished?", ja: '言い終わった？', note: '英国寄り。同じ機能' },
    { en: "I'll allow it.", ja: 'まあ今回は許す', note: '審判の言葉。上から受ける形' },

    // ---- 打ち返す ----
    { en: "Says the guy who still can't parallel park.", ja: '縦列駐車できない人が言うことか', note: '**返しの基本型。** Says the guy who + 相手の既知の弱点' },
    { en: "Says the woman with three unread emails from HR.", ja: '人事から未読3件ある人が言うな', note: '同じ型。相手に応じて中身を差し替えるだけ' },
    { en: "Coming from you, that means a lot.", ja: 'あなたが言うと重みが違いますね', note: '褒め言葉の形をした攻撃。最も汎用性が高い' },
    { en: "Bold words from someone in that shirt.", ja: 'そのシャツ着てよく言うな', note: '外見に落とす。親しい間柄限定' },
    { en: "You would say that.", ja: 'お前ならそう言うよな', note: '相手の性格を1文で片づける' },
    { en: "This from the man who microwaved fish in the office.", ja: 'オフィスで魚をチンした男が言うか', note: 'This from the 〜。過去の罪状を持ち出す形' },
    { en: "Rich, coming from you.", ja: 'よくお前が言えるな', note: 'rich。皮肉の1語。英国で頻出' },
    { en: "Okay, and how did that work out for you?", ja: 'で、それでうまくいったの？', note: '相手の失敗を思い出させる質問形' },
    { en: "Careful — glass houses.", ja: '人のこと言えるのか', note: 'people in glass houses shouldn\'t throw stones の略。2語で通じる' },
    { en: "You're one to talk.", ja: 'お前が言うな', note: '最短の返し。3語' },
    { en: "Do you want to try that again?", ja: 'もう一回言ってみる？', note: '冗談の圧をかける。笑顔で言う' },
    { en: "I'm writing this down.", ja: 'それ記録しとくから', note: '後で使うと予告する。実際に使う' },
    { en: "I'm telling everyone this story.", ja: 'この話みんなに言うから', note: '追撃。恥を拡散すると宣言する' },

    // ---- 自分を落とす(最強の受け) ----
    { en: "You're not wrong.", ja: 'まあ間違ってはない', note: '**最も評価される返し。** 認めて笑いに変える' },
    { en: "I walked right into that.", ja: '自分から乗っちゃったな', note: '負けを認める形。認められる人は次も呼ばれる' },
    { en: "In fairness, that's completely accurate.", ja: '公平に見て、それは完全に正しい', note: '丁寧語で自分を刺す。上級の自虐' },
    { en: "I have no defence.", ja: '弁解の余地がない', note: '2語で降伏。潔いと笑われる' },
    { en: "Yeah, I heard it as I was saying it.", ja: '言いながら自分でも思った', note: '自分の発言の失敗をその場で認める。かなり効く' },
    { en: "That's fair, and I hate it.", ja: '正論だし、それが嫌だ', note: '同意と抵抗を同時に出す。笑いになる' },
    { en: "Low blow. Accurate, but low.", ja: '卑怯だぞ。正しいけど卑怯だ', note: 'low blow。反則打ち。認めつつ抗議する' },
    { en: "I'm never living that down.", ja: '一生言われるやつだ', note: 'live it down。恥が消えないこと。この教材の中心語' },
    { en: "Fifteen years and he still brings it up.", ja: '15年経ってもまだ言う', note: '第三者に訴える形。長さが笑いになる' },

    // ---- 過剰にやり返す(誇張の型) ----
    { en: "How dare you.", ja: 'よくもまあ', note: '大げさに怒るふり。本気に取られない定型' },
    { en: "I have never been so insulted in my life.", ja: '生まれてこのかた、こんな侮辱は受けたことがない', note: '明らかな誇張。誇張と分かる形で言うのが作法' },
    { en: "That's it. We're done here.", ja: 'もういい。終わりだ', note: '席を立つふり。実際は立たない' },
    { en: "Unbelievable. In front of my own family.", ja: '信じられない。身内の前で', note: '家族でも何でもない相手に言う。定番' },
    { en: "I'll see you outside.", ja: '外で話をつけよう', note: '決闘の申し込みのふり。誰も外に出ない' },
    { en: "Right, that's the last time I help you.", ja: 'もう二度と手伝わないからな', note: '次の日には手伝っている' },

    // ---- 止める・線を引く ----
    { en: "All right, easy.", ja: 'まあまあ、落ち着け', note: '行き過ぎを止める。第三者が言うことが多い' },
    { en: "Too far.", ja: 'それは言い過ぎ', note: '2語。空気が変わったときの明確な線引き' },
    { en: "Leave him alone.", ja: 'もうやめてやれ', note: '守る側の一文。言うと場での信用が上がる' },
    { en: "He's had enough.", ja: 'もう十分だろ', note: '本人ではなく周りに言う。逃げ道を作る' },
    { en: "Let's move on.", ja: '次いこう', note: '話題を閉じる。誰も傷つけずに終える' },
    { en: "Joking aside —", ja: '冗談はさておき', note: '真面目な話に切り替える合図。必ず要る' },
    { en: "No, but seriously.", ja: 'いや、でも真面目な話', note: '最頻出の切り替え。笑いのあとの本題' },

    // ---- 助ける・場に戻す ----
    { en: "He's not wrong, though.", ja: 'いや、間違ってはないけど', note: '援護しているようで援護していない。中間の立ち位置' },
    { en: "To be fair, nobody told him.", ja: '公平に言えば、誰も教えてなかった', note: '**からかわれた側を助ける一文。** これを言える人が場を持つ' },
    { en: "I've done worse.", ja: '俺はもっとひどいことした', note: '自分を差し出して相手を降ろす。最も優しい形' },
    { en: "Anyway, you were saying?", ja: 'それで、何の話だっけ', note: '話を本人に戻す。救出の定型' },
    { en: "Ignore him, he's like this with everyone.", ja: '気にすんな。誰にでもこうだから', note: '新入りに言う一文。安心させる' },
    { en: "You're all right.", ja: 'お前は大丈夫', note: '英国寄り。3語で仲間だと伝える。最上級' },

    // ---- 本当に行き過ぎたとき ----
    { en: "Sorry, that was out of line.", ja: 'ごめん、言い過ぎた', note: 'out of line。冗談が本当に外れたときだけ使う' },
    { en: "I didn't mean it like that.", ja: 'そういう意味じゃなかった', note: '意図の訂正。言い訳ではなく事実として言う' },
    { en: "That one landed wrong.", ja: 'いまのは刺さり方を間違えた', note: 'land。冗談が着地に失敗したときの言い方' },
    { en: "We good?", ja: '大丈夫？', note: '2語で仲直りを確認する。最頻出' },
    { en: "We're good.", ja: '大丈夫だよ', note: '返し。これで終わる。長く話さない' },

    // ---- 新入りとして ----
    { en: "Is he always like this?", ja: 'この人いつもこうなの？', note: '新入りが場に馴染む最短の質問' },
    { en: "I'm going to need a minute to catch up.", ja: 'ついていくのに少し時間ください', note: '正直に言う。全員が助けてくれる' },
    { en: "I don't get it, but I'm laughing.", ja: 'わかってないけど笑ってる', note: '**正直に言うと笑いになる。** わかったふりより100倍いい' },
    { en: "Okay, someone explain the ladder thing.", ja: '誰か梯子の件を説明して', note: '伏線がわからないときは頼む。もう一度説明してもらえる' },
    { en: "Give me a month, I'll get there.", ja: '1か月くれれば追いつく', note: '時間をくれと言う。実際1か月で入れる' },
];
