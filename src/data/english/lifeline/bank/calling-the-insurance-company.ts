/**
 * BANK — Calling the Insurance Company / 保険会社への電話
 *
 * 音響条件は phone-line + hold-then-burst + machine-voice。
 * 口が見えず、圧縮された声で、40分待たされた直後に最も情報密度の高い一文が来る。
 * 聴解の負荷としては全141窓口で最上位に近い。
 *
 * 並びは実際の流れ順: 自動応答を抜ける → 本人確認 → 用件 → 否認の理由を出させる →
 * 記録を取る → 担当を上げる → 不服申立 → 締める。
 *
 * この窓口の勝敗は英語力ではなく **記録を取ったかどうか** で決まる。
 * 参照番号と担当者名を取らないと、次の電話が毎回ゼロから始まる。
 */

import type { LifePhrase } from '../../lifeline-types';

export const INSURANCE_CALL_BANK: LifePhrase[] = [

    // ---- 自動応答を抜ける ----
    { en: "Please listen carefully, as our menu options have changed.", ja: 'メニューが変更になりました。よくお聞きください', note: '変更されていない。10年同じことを言っている' },
    { en: "For claims, press two.", ja: '保険金請求は2番', note: 'claims が保険金請求。この語を聞き逃すと迷子になる' },
    { en: "In a few words, tell me why you're calling.", ja: '簡単にご用件をどうぞ', note: '音声認識。短く言う。I have a question about a claim.' },
    { en: "I didn't quite get that.", ja: 'うまく聞き取れませんでした', note: '機械が言う。落ち着いてもう一度、短く' },
    { en: "Let me transfer you to a representative.", ja: '担当者におつなぎします', note: 'representative。人間に届いた合図' },
    { en: "Representative.", ja: 'オペレーター', note: 'この1語を連呼すると人間に繋がることが多い。実用の裏技' },
    { en: "Your estimated wait time is thirty-five minutes.", ja: 'お待ち時間は約35分です', note: '実際はもっと長い。スピーカーにして他のことをする' },
    { en: "Please stay on the line. Your call is important to us.", ja: '切らずにお待ちください', note: '内容ゼロの定型。聞き流していい' },

    // ---- 保留明け ----
    { en: "Thanks for holding.", ja: 'お待たせしました', note: '保留明けの第一声。ここから急に速くなる' },
    { en: "Sorry about the wait.", ja: 'お待たせして申し訳ありません', note: '謝罪。責めない方が以後が進む' },
    { en: "Who am I speaking with?", ja: 'お名前を伺えますか', note: '相手に聞かれる。同じ質問をこちらからも返す' },
    { en: "And who am I speaking with, sorry?", ja: 'すみません、そちらのお名前は', note: '**この窓口で最重要の一文。** 担当者名を控えると責任の所在が変わる' },
    { en: "Can I get a reference number for this call?", ja: 'この電話の参照番号をもらえますか', note: '最強の武器。これがあると次の電話が最初から始まらない' },
    { en: "Can you spell that for me?", ja: 'つづりをお願いできますか', note: '名前も番号も必ずつづりで取る' },
    { en: "Let me read that back to you.", ja: '復唱します', note: 'read back。取り違いを潰す。相手も安心する' },

    // ---- 本人確認 ----
    { en: "Can I get your member ID?", ja: '会員番号をお願いします', note: '手元に出してから電話する。探し始めると保留に戻される' },
    { en: "Can you verify your date of birth?", ja: '生年月日をお願いします', note: 'verify。本人確認の動詞' },
    { en: "And the last four of your social?", ja: '社会保障番号の下4桁は', note: 'the last four。下4桁。定型なので聞き取れると速い' },
    { en: "What's the best number to reach you at?", ja: 'ご連絡先の番号は', note: '切れたときにかけ直してもらう番号' },
    { en: "In case we get disconnected, can you call me back at this number?", ja: '切れた場合、この番号にかけ直してもらえますか', note: '**先に頼んでおく。** 40分待って切れると心が折れる' },

    // ---- 用件を言う ----
    { en: "I'm calling about a claim.", ja: '保険金請求の件で電話しました', note: '用件は名詞で1文。事故でも医療でも同じ語' },
    { en: "I got a bill I wasn't expecting.", ja: '身に覚えのない請求が来ました', note: 'wasn\'t expecting。責めずに事実だけ' },
    { en: "The claim was denied and I'd like to know why.", ja: '請求が否認されたので理由を知りたいです', note: 'denied。ここから本番' },
    { en: "This was supposed to be covered.", ja: 'これは対象のはずでした', note: 'be supposed to be covered。前提の確認' },
    { en: "I have the claim number here — it's...", ja: '請求番号があります。番号は', note: '先に番号を出すと相手が動きやすい' },
    { en: "This is my third call about this.", ja: 'この件で3回目の電話です', note: '回数を言うと扱いが変わる。感情ではなく数字で' },

    // ---- 理由を出させる ----
    { en: "Why was it denied?", ja: 'なぜ否認されたのですか', note: '理由は必ず文書で残っている。口頭で聞いて、書面でも要求する' },
    { en: "What code did they use?", ja: 'どの理由コードですか', note: 'denial code。コードが分かると調べ直せる' },
    { en: "Was that billed as in-network or out of network?", ja: '保険適用内で処理されましたか、適用外ですか', note: 'in / out of network。金額が数倍変わる分岐点' },
    { en: "The provider is in network, though.", ja: 'でもその医療機関は適用内のはずです', note: 'though を文末に置いて柔らかく反論する' },
    { en: "Is this a coding issue on their end?", ja: '医療機関側のコード入力の問題ですか', note: 'on their end。責任の所在を切り分ける' },
    { en: "Was prior authorization required?", ja: '事前承認が必要でしたか', note: 'prior authorization。否認理由の最頻出' },
    { en: "Nobody told me that at the time.", ja: 'その時点では誰も教えてくれませんでした', note: '事実として置く。感情を乗せない' },
    { en: "Can you walk me through how you got that number?", ja: 'その金額の計算根拠を順に説明してもらえますか', note: 'walk me through。相手に手順を喋らせると誤りが出てくる' },

    // ---- 記録と証拠 ----
    { en: "Can you note that on the account?", ja: 'それを記録に残してもらえますか', note: 'note it on the account。次の担当者が読む' },
    { en: "Is that in the notes from my last call?", ja: '前回の電話の記録に残っていますか', note: '残っていないことが多い。だから参照番号を取る' },
    { en: "Can you send me that in writing?", ja: 'それを書面で送ってもらえますか', note: '口頭の約束は残らない。必ず紙かメールに変える' },
    { en: "Can you email me a copy of the denial letter?", ja: '否認通知の写しをメールで送ってください', note: '不服申立の材料になる' },
    { en: "What's the date on that?", ja: 'その日付はいつですか', note: '不服申立には期限がある。日付が起点になる' },
    { en: "How long do I have to appeal?", ja: '不服申立の期限はいつまでですか', note: '通常30-180日。逃すと権利が消える' },

    // ---- 担当を上げる ----
    { en: "Is there someone else I can talk to?", ja: '他に対応できる方はいますか', note: '担当外だと言われたときの一文。角が立たない' },
    { en: "Can you transfer me to someone who can?", ja: '対応できる方に代わってもらえますか', note: '相手を責めずに次へ進む' },
    { en: "Can I speak to a supervisor?", ja: '責任者と話せますか', note: 'supervisor。切り札。使いすぎない' },
    { en: "I understand it's not your call.", ja: 'あなたの判断ではないのは分かっています', note: 'not your call。担当者を味方にする一文。効果が大きい' },
    { en: "You've been helpful — I just need this escalated.", ja: '助かっています。ただ上に上げてほしいんです', note: 'escalate。人を否定せず案件だけ上げる' },
    { en: "Before you transfer me, can I get that reference number?", ja: '転送の前に参照番号をください', note: '転送で切れることが本当にある。先に取る' },

    // ---- 不服申立 ----
    { en: "I'd like to file an appeal.", ja: '不服申立をしたいです', note: 'file an appeal。否認の相当数がこれで覆る' },
    { en: "What do you need from me for that?", ja: 'そのために何が必要ですか', note: '相手に手順を言わせる。最短で進む' },
    { en: "Does my doctor need to send anything?", ja: '医師から何か送る必要はありますか', note: 'letter of medical necessity が要ることが多い' },
    { en: "How long does the appeal take?", ja: '審査にはどれくらいかかりますか', note: '30-60日。その間の督促を止めてもらう' },
    { en: "Can you put the balance on hold while it's under appeal?", ja: '審査中は請求を止めてもらえますか', note: 'on hold。止めないと督促が回り始める' },
    { en: "What happens if the appeal is denied?", ja: '不服申立も否認されたらどうなりますか', note: '次の段階(外部審査)がある。先に聞いておく' },

    // ---- 金額の交渉 ----
    { en: "What's my out-of-pocket on this?", ja: '自己負担額はいくらになりますか', note: 'out-of-pocket。最終的に自分が払う額' },
    { en: "Have I met my deductible?", ja: '免責額には達していますか', note: 'deductible。ここを超えたかどうかで全部変わる' },
    { en: "What's my out-of-pocket max for the year?", ja: '年間の自己負担上限はいくらですか', note: '上限に達すると以後は全額保険が持つ' },
    { en: "Can I set up a payment plan?", ja: '分割にできますか', note: 'ほぼ断られない' },
    { en: "Is there any financial assistance available?", ja: '減免制度はありますか', note: '聞かれない限り案内されない' },

    // ---- 相手の定型(聞き取る側) ----
    { en: "Bear with me while I pull that up.", ja: '記録を出しますので少々お待ちください', note: 'pull it up。画面に出す。待てという合図' },
    { en: "I'm showing here that...", ja: 'こちらの記録では', note: 'I\'m showing。相手のシステムの表示を読み上げている' },
    { en: "It looks like that was processed on the fourteenth.", ja: '14日に処理されているようです', note: 'it looks like。断定を避けた言い方' },
    { en: "That would be handled by a different department.", ja: 'それは別の部署の担当になります', note: 'たらい回しの合図。参照番号を取ってから移る' },
    { en: "Unfortunately, that's not something I can override.", ja: '申し訳ありませんが、こちらでは変更できません', note: 'override。権限が無い。supervisor を頼む場面' },
    { en: "Let me see what I can do.", ja: 'できることを確認します', note: '約束ではない。ただし動く意思の表明' },
    { en: "I've gone ahead and submitted that for you.", ja: 'こちらで手続きを出しておきました', note: 'gone ahead and 〜。勝手にやっておいた、の丁寧形' },
    { en: "You should see that reflected in seven to ten business days.", ja: '営業日で7〜10日ほどで反映されます', note: 'business days は土日を含まない' },
    { en: "Is there anything else I can help you with today?", ja: '他に何かございますか', note: '終了の合図。ここで追加を言うなら今' },

    // ---- 締める ----
    { en: "Just to confirm — you're sending that in writing today?", ja: '確認ですが、本日書面で送っていただけるということですね', note: 'Just to confirm。最後にもう一度縛る' },
    { en: "So the reference number is 4471-B, and you're Marisol.", ja: '参照番号4471-B、担当はマリソルさんですね', note: '両方を声に出して確定させる' },
    { en: "If I don't hear back by Friday, I'll call again.", ja: '金曜までに連絡がなければまた電話します', note: '次の行動を宣言する。放置を防ぐ' },
    { en: "I appreciate your help with this.", ja: '対応ありがとうございました', note: '感じよく切る。相手も台本を読んでいるだけ' },
    { en: "Thanks, Marisol. Have a good one.", ja: 'ありがとう、マリソルさん。それでは', note: '名前で呼んで切る。次に繋がる' },
];
