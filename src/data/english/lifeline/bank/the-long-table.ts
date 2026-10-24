/**
 * BANK — The Long Table / 用のない会話
 *
 * 4時間しゃべって何も決まらない会話の英語。情報量はゼロだが、connection の本体はここにある。
 * 教材にほぼ載っていない領域なので、他のどのバンクより価値が高い。
 *
 * 並びは実際の流れ順: 場に着く → 話を始める → 割り込む → 転がす → からかう →
 * 返す → 大げさに言う → 疑う → 同意する → 脱線する → 戻す → 抜ける。
 *
 * 全部「聞ければいい」でよく、言えるようになるのはその後でいい。
 */

import type { LifePhrase } from '../../lifeline-types';

export const LONG_TABLE_BANK: LifePhrase[] = [

    // ---- 場に着く ----
    { en: "Is this seat taken?", ja: 'ここ空いてる？', note: '教会でも映画館でも卓でも同じ。人生で何百回も使う' },
    { en: "Budge up.", ja: 'ちょっと詰めて', note: '英国寄り。米語なら Scoot over.' },
    { en: "What did I miss?", ja: '何の話してたの', note: '途中参加の最強の一文。知らないことを堂々と出す' },
    { en: "You're late.", ja: '遅い', note: '責めていない。到着を認識したという合図' },
    { en: "Traffic. Don't start.", ja: '渋滞。何も言うな', note: 'Don\'t start. で先回りして封じる。定型' },
    { en: "Same as always?", ja: 'いつものでいい？', note: '常連であることを店員が確認する一文' },
    { en: "Pull up a chair.", ja: '椅子持ってきて座りなよ', note: '輪に入れる側の一文。言われたら入っていい' },
    { en: "We were just talking about you.", ja: 'ちょうど君の話してたとこ', note: '半分は本当。到着した人へのからかいの入口' },

    // ---- 話を始める ----
    { en: "Hear me out.", ja: 'まあ聞けって', note: 'くだらない持論の前置き。これがあると最後まで聞いてもらえる' },
    { en: "Okay, so here's the thing.", ja: 'つまりこういうことでさ', note: 'here\'s the thing。本題に入る最頻出の合図' },
    { en: "Right, so this happened.", ja: 'でさ、こんなことがあって', note: '出来事の報告を始める。英国寄りの Right, so' },
    { en: "You're not going to believe this.", ja: '信じられないと思うけど', note: '前置きで期待値を上げる。上げた以上は落とす義務が発生する' },
    { en: "Long story.", ja: '長い話なんだけど', note: '2語。続きを促されるのを待つ' },
    { en: "Ask me how my week went.", ja: '今週どうだったか聞いてよ', note: '自分から振らせる形。ずうずうしさが笑いになる' },
    { en: "Not to change the subject, but —", ja: '話変えて悪いんだけど', note: '実際には変える。宣言することで許される' },
    { en: "This is going to sound stupid.", ja: 'バカみたいな話なんだけど', note: '予防線。実際バカな話であることが多い' },

    // ---- 割り込む ----
    { en: "Hang on, hang on.", ja: 'ちょっと待て待て', note: '2回言うのが自然。1回だと弱い' },
    { en: "Wait — back up.", ja: '待って、話戻して', note: 'back up。前提を飛ばされたときに使う' },
    { en: "Sorry, who?", ja: 'ごめん、誰？', note: '2語で止める。人名を聞き逃したときの最速' },
    { en: "Can I just say one thing?", ja: '一つだけいい？', note: '割り込みの許可を取る形。ほぼ必ず通る' },
    { en: "Let him finish.", ja: '最後まで言わせろ', note: '第三者を守る一文。言うと場での信用が上がる' },
    { en: "I'm getting to that.", ja: '今それを話すとこ', note: '先を急がれたときの返し' },
    { en: "Where was I?", ja: 'どこまで話したっけ', note: '中断から復帰する。全員が助けてくれる' },
    { en: "Anyway —", ja: 'で、話戻すと', note: '1語で軌道修正。この語の使用頻度は異常に高い' },

    // ---- 転がす ----
    { en: "Name one.", ja: '1個挙げてみろ', note: '大きい主張への返し。会話が一気に転がる' },
    { en: "Go on, then.", ja: 'じゃあ言ってみろよ', note: '英国寄り。挑発だが友好的' },
    { en: "And?", ja: 'で？', note: '1語。続きを促す最短形。冷たく聞こえない言い方で' },
    { en: "So what happened?", ja: 'で、どうなったの', note: '話を先に進める。相槌として万能' },
    { en: "Then what?", ja: 'それから？', note: '子どもが使う形。大人も同じだけ使う' },
    { en: "How did that go?", ja: 'どうだった？', note: '結果を聞く。うまくいってない前提の響きがある' },
    { en: "Give me an example.", ja: '例を出して', note: '抽象論を止める。議論でも雑談でも効く' },
    { en: "In what world?", ja: 'どこの世界の話だよ', note: '呆れの疑問文。強めだが笑いになる' },

    // ---- からかう ----
    { en: "Says the guy who still can't parallel park.", ja: '縦列駐車できない人が言うことか', note: 'Says the guy who 〜。返しの型。1本で終わる' },
    { en: "Coming from you, that means a lot.", ja: 'あなたが言うと重みが違いますね', note: '皮肉。褒め言葉の形をした攻撃' },
    { en: "Bold words from someone in that shirt.", ja: 'そのシャツ着てよく言うな', note: '外見に落とす形。親しい間柄限定' },
    { en: "You would say that.", ja: 'お前ならそう言うよな', note: '相手の性格を1文で片づける。定番' },
    { en: "Look at this guy.", ja: 'この人よ', note: '本人を三人称で指す。からかいの基本形' },
    { en: "He's not wrong, though.", ja: 'いや、間違ってはないけど', note: '援護しているようで援護していない' },
    { en: "That's the nicest thing you've ever said to me.", ja: '君に言われた中で一番優しい言葉だ', note: '悪口への返し。皮肉で受ける' },
    { en: "I'm telling everyone this story.", ja: 'この話みんなに言うから', note: '恥をかいた相手への追撃。実際に言う' },

    // ---- からかいを受ける ----
    { en: "All right, all right.", ja: 'はいはい、わかったわかった', note: '受け流しの最短形。笑いながら言えば負けにならない' },
    { en: "Wow. Okay.", ja: 'へえ。そう', note: '2語で受ける。間を空けるほど効く' },
    { en: "You're not wrong.", ja: 'まあ間違ってはない', note: '認めて笑いに変える。最も評価される返し' },
    { en: "I walked right into that.", ja: '自分から乗っちゃったな', note: '負けを認める形。認められる人は次も呼ばれる' },
    { en: "Are you done?", ja: 'もういい？', note: '止めたいときの一文。怒っていない声で言う' },
    { en: "Noted.", ja: '承知しました', note: '1語。棒読みで返すのが正解' },
    { en: "Thanks for that.", ja: 'どうもありがとう', note: '皮肉。thanks の抑揚を平坦にする' },
    { en: "I'm never living that down.", ja: '一生言われるやつだ', note: 'live it down。恥が消えないこと。この教材の中心語' },

    // ---- 大げさに言う ----
    { en: "It was the worst thing that has ever happened to anyone.", ja: '人類史上最悪の出来事だった', note: '明らかな誇張。誇張だと分かる形で言うのが作法' },
    { en: "I nearly died.", ja: '死ぬかと思った', note: '死んでいない。頻度が高すぎて誰も心配しない' },
    { en: "This is the hill I will die on.", ja: 'ここだけは絶対に譲らない', note: 'die on this hill。くだらないことに使うと面白い' },
    { en: "I have never been so insulted in my life.", ja: '生まれてこのかた、こんな侮辱は受けたことがない', note: '大げさに怒るふり。定型なので本気に取られない' },
    { en: "Best thing I've ever eaten. Genuinely.", ja: '人生で一番うまい。まじで', note: 'genuinely を足すと誇張が誇張として立つ' },
    { en: "It went on for hours.", ja: '何時間も続いた', note: '実際は20分。誰も検証しない' },

    // ---- 疑う ----
    { en: "That did not happen.", ja: 'それは起きてない', note: '相手の話を否定する定型。笑いながら言う' },
    { en: "No chance.", ja: 'ありえない', note: '2語。英国寄り' },
    { en: "You're making that up.", ja: 'それ作り話だろ', note: 'make up。その場で作ったと指摘する' },
    { en: "Prove it.", ja: '証明してみろ', note: '証明できないことが分かっていて言う' },
    { en: "I'll believe it when I see it.", ja: '見るまで信じない', note: '約束を疑う定型' },
    { en: "Sure you did.", ja: 'はいはい、やったやった', note: '同意の形をした全否定。抑揚が全て' },
    { en: "Hold on, that doesn't add up.", ja: '待って、話が合わない', note: 'add up。辻褄が合う。話の矛盾を突く' },

    // ---- 同意する ----
    { en: "Exactly.", ja: 'それな', note: '最頻出の同意。1語' },
    { en: "That's what I'm saying.", ja: 'それ俺が言ってるやつ', note: '自分の主張と一致したときの返し' },
    { en: "Right?", ja: 'だよね？', note: '語尾を上げる。同意を取りに行く' },
    { en: "One hundred percent.", ja: '完全に同意', note: '強い同意。会話でよく出る' },
    { en: "Say that again.", ja: 'もう一回言ってくれ', note: '聞き返しではなく強い同意。抑揚で区別する' },
    { en: "Finally, someone said it.", ja: 'やっと誰かが言った', note: '長く言えなかったことに同意する形' },
    { en: "That's fair.", ja: 'それはそうだ', note: '完全同意ではない同意。使い勝手が異常に良い' },

    // ---- 脱線と回収 ----
    { en: "Speaking of which —", ja: 'それで思い出したけど', note: '脱線の正当化。名詞1個で話を移せる' },
    { en: "That reminds me.", ja: 'あ、思い出した', note: '関係なくても使える。誰も検証しない' },
    { en: "Like the ladder thing.", ja: 'ほら、梯子の件みたいに', note: '伏線の回収。名詞1個で40分前に戻せる' },
    { en: "This is the ladder thing all over again.", ja: 'また梯子の件じゃん', note: 'all over again。繰り返しを笑いに変える' },
    { en: "Don't start.", ja: 'その話やめろ', note: '回収された側の返し。怒っていない' },
    { en: "You had to bring that up.", ja: 'それ持ち出すか', note: 'bring up。蒸し返す' },
    { en: "We've been over this.", ja: 'それ前もやった', note: '同じ話を何度もするのが前提の場でだけ意味を持つ' },
    { en: "Wait, what was the ladder thing?", ja: '待って、梯子の件って何？', note: '知らないときはこれで聞く。もう一度説明してもらえる' },
    { en: "That's not the point.", ja: 'そこじゃない', note: '論点がずれたときの定型。本当は論点など無い' },
    { en: "I'm not saying that. I'm saying —", ja: 'そうは言ってない。俺が言ってるのは', note: '誤解を正して続ける。議論を終わらせない形' },

    // ---- 沈黙と間 ----
    { en: "Anyway.", ja: 'まあ、うん', note: '会話が死んだときの1語。全員が使う' },
    { en: "So...", ja: 'で、', note: '沈黙を埋める。次を誰かに投げている' },
    { en: "Well, that killed it.", ja: '場が死んだな', note: '沈黙そのものを話題にする。復帰する唯一の方法' },
    { en: "On that note —", ja: 'そういうことで', note: '妙な発言のあとに場を締める。皮肉の含みがある' },
    { en: "Moving on.", ja: '次いこう', note: '2語。触れたくない話を閉じる' },

    // ---- 意見と評価 ----
    { en: "Overrated.", ja: '過大評価', note: '1語で切る。映画も店も人も' },
    { en: "It's not for me.", ja: '自分には合わない', note: '否定せずに好みを言う。最も安全な形' },
    { en: "I'd rather not, honestly.", ja: '正直、やりたくない', note: 'honestly を付けると角が取れる' },
    { en: "It's grown on me.", ja: 'だんだん好きになってきた', note: 'grow on someone。最初は嫌いだった含み' },
    { en: "I can take it or leave it.", ja: 'あってもなくてもいい', note: '中立を1文で。好みを聞かれて困ったとき' },
    { en: "Each to their own.", ja: '人それぞれだね', note: '意見が割れたときの締め。英国寄り' },
    { en: "Could be worse.", ja: 'まあマシな方', note: '最頻出の評価。何にでも使える' },

    // ---- 金と勘定 ----
    { en: "Whose round is it?", ja: '次誰のおごり？', note: 'round。パブの根幹。1杯ずつ順番に全員ぶん買う' },
    { en: "It's your round.", ja: 'お前の番', note: '逃げると一生言われる' },
    { en: "I got the last one.", ja: '前は俺が出した', note: '記録は全員が覚えている' },
    { en: "Put it on my tab.", ja: 'ツケといて', note: 'tab。常連にだけ許される' },
    { en: "We'll settle up later.", ja: 'あとで精算しよう', note: 'settle up。だいたいしない' },

    // ---- 抜ける ----
    { en: "I should get going.", ja: 'そろそろ行くわ', note: '抜ける宣言。英語は抜ける側が言う' },
    { en: "One more and then I'm off.", ja: 'もう1杯だけ飲んだら帰る', note: '守られたことがない' },
    { en: "I'm gonna grab a drink — you want anything?", ja: '飲み物取ってくる。何かいる？', note: '用事を作って一時離脱する型' },
    { en: "I'll be back, don't finish the story.", ja: '戻るから、話終わらせないで', note: '席を残す一文。これがあると輪が閉じない' },
    { en: "Right, I'm off.", ja: 'じゃ、帰るわ', note: '英国の締め。Right が合図' },
    { en: "Don't let me keep you.", ja: '引き止めないから行きな', note: '帰りたそうな相手を解放する。優しさの定型' },
    { en: "Same time next week.", ja: 'また来週', note: '結論の代わりに継続を約束する。これが結論である' },
    { en: "Get home safe.", ja: '気をつけて帰れよ', note: '別れの最後の一言。夜の場では必ず出る' },
];
