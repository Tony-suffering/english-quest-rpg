/**
 * BANK — First Week on the Job / 就職1週目
 *
 * 大人が最も長時間浴びる英語。音響条件は room-noise + multi-talker。
 * 1日8時間、5日間、これが続く。窓口の中で総露出時間が最大。
 *
 * 並びは実際の流れ順: 初日の挨拶 → 席とアカウント → 略語 → 依頼を受ける →
 * 進捗を言う → 会議 → 質問する → メールとチャット → 断る → 締切 → 週末。
 *
 * ここは「わからないと言える期間」が2週間しかない。その2週間で全部聞いておく窓口である。
 */

import type { LifePhrase } from '../../lifeline-types';

export const FIRST_WEEK_BANK: LifePhrase[] = [

    // ---- 初日 ----
    { en: "You must be the new hire.", ja: '新しく入った方ですね', note: 'new hire。名詞で「新入社員」' },
    { en: "Welcome aboard.", ja: 'ようこそ', note: '入社時の定型。船の比喩' },
    { en: "I'll walk you around and introduce you.", ja: '案内して紹介しますね', note: 'walk someone around。社内案内' },
    { en: "This is Jen — she's been here forever.", ja: 'ジェンです。ここが長い人', note: 'been here forever。褒め言葉として使う' },
    { en: "Nice to put a face to the name.", ja: 'お顔が見られてよかったです', note: 'メールで先に知っていた相手に会ったとき。かなり便利' },
    { en: "I'll let you settle in.", ja: 'まずは落ち着いてください', note: 'settle in。慣れるまでの期間を指す' },
    { en: "Grab me if you need anything.", ja: '何かあったら声かけて', note: 'grab someone。捕まえる。社内では普通の言い方' },
    { en: "There's no stupid question this week.", ja: '今週はどんな質問でもしていい', note: '本当にそう。この期間だけの特権' },

    // ---- 席とアカウント ----
    { en: "Have you got your badge yet?", ja: '入館証はもう出た？', note: 'badge。ほぼ全社で使う' },
    { en: "IT should have set you up already.", ja: '情シスがもう設定してるはず', note: 'set someone up。アカウント準備' },
    { en: "I can't log in to anything.", ja: '何にもログインできません', note: '初日の3割がこれ。堂々と言う' },
    { en: "Can you submit a ticket for that?", ja: 'それチケット切ってもらえる？', note: 'submit a ticket。情シスへの依頼はこの形' },
    { en: "Are we hot-desking or do I have a spot?", ja: 'フリーアドレスですか、固定席ですか', note: 'hot-desking。座席自由制' },
    { en: "What's the Wi-Fi for guests?", ja: 'ゲスト用Wi-Fiは', note: '初日に必ず聞く' },
    { en: "Am I on the distro list?", ja: '配信リストに入ってますか', note: 'distro = distribution list。メール一斉配信' },

    // ---- 略語と社内語 ----
    { en: "Sorry, what does that stand for?", ja: 'その略語は何の略ですか', note: '1週目に何回でも使っていい。3か月後に聞くと痛い' },
    { en: "Is that the same as the one in the deck?", ja: '資料に出てくるやつと同じですか', note: 'deck = スライド資料' },
    { en: "EOD", ja: '今日中', note: 'end of day。人名ではない' },
    { en: "EOW / COB", ja: '今週中 / 業務終了時', note: 'end of week / close of business' },
    { en: "ASAP, but no rush.", ja: '至急、ただし急がなくていい', note: '矛盾しているが本当によく言われる。訳すと壊れる' },
    { en: "Let's take it offline.", ja: 'それは別途話しましょう', note: '会議で脱線を止める。オンライン会議でも offline と言う' },
    { en: "Circle back", ja: 'あとでまた', note: '会議を早く終わらせる魔法の語' },
    { en: "Bandwidth", ja: '手の空き具合', note: "I don't have the bandwidth. で「手が回らない」" },
    { en: "Low-hanging fruit", ja: '簡単に取れる成果', note: '手っ取り早い改善。会議で頻出' },
    { en: "Ping me", ja: 'メッセージちょうだい', note: 'チャットで連絡する、の意味で動詞化' },

    // ---- 依頼を受ける ----
    { en: "Do you have a minute?", ja: 'ちょっといい？', note: '依頼の前置き。ほぼ1分では終わらない' },
    { en: "I've got something for you.", ja: '仕事を1つ振ります', note: '仕事が来る合図' },
    { en: "Can you take a first pass at this?", ja: 'たたき台を作ってもらえる？', note: 'first pass。完璧でなくていいという合図' },
    { en: "I'm on it.", ja: 'やります', note: '最短の受諾。職場で信用が上がる' },
    { en: "When do you need it by?", ja: 'いつまでに必要ですか', note: 'need it by。締切を必ず確認する' },
    { en: "Is this a hard deadline?", ja: 'これは動かせない締切ですか', note: 'hard / soft。優先順位が決まる' },
    { en: "What does done look like for this?", ja: 'どこまでやれば完了ですか', note: '**新人が使える最強の質問。** 手戻りが激減する' },
    { en: "Is there an example I can look at?", ja: '見本はありますか', note: '過去のものを見るのが最短。必ず聞く' },
    { en: "Just so I'm clear — you want the numbers by Thursday?", ja: '確認ですが、木曜までに数字ですね', note: 'Just so I\'m clear。聞き返しの最強の枕' },

    // ---- 進捗を言う ----
    { en: "Where are we on the report?", ja: 'レポートはどこまで進んでる？', note: 'Where are we on 〜。進捗を聞く万能形' },
    { en: "About halfway. I should have a draft by tomorrow.", ja: '半分くらい。明日には下書きが出せます', note: '数字と日付をセットで返す' },
    { en: "I'm still getting up to speed.", ja: 'まだ追いついている途中です', note: '新人が使える最良の言い訳であり、事実' },
    { en: "I'm blocked on one thing.", ja: '1件で詰まっています', note: 'blocked。誰かの返事待ちで止まっている状態' },
    { en: "I'm waiting on Jen to get back to me.", ja: 'ジェンの返事待ちです', note: 'wait on / get back to。責任の所在が明確になる' },
    { en: "That'll slip to Monday.", ja: 'それは月曜にずれます', note: 'slip。締切が後ろにずれること。早めに言う' },
    { en: "Heads up — this is going to take longer than I thought.", ja: '先に言っておくと、思ったより時間がかかります', note: 'heads up。先出しの警告。これができる人は信用される' },
    { en: "It's with Brad for review.", ja: 'ブラッドのレビュー待ちです', note: 'be with someone。誰の手元にあるか' },

    // ---- 会議 ----
    { en: "Can everyone hear me?", ja: '聞こえてますか', note: 'オンライン会議の第一声' },
    { en: "You're on mute.", ja: 'ミュートになってます', note: '毎日どこかで言われている' },
    { en: "Can I jump in here?", ja: '一つよろしいですか', note: '割り込みの最も無難な形' },
    { en: "Sorry, go ahead.", ja: 'すみません、どうぞ', note: 'かぶったときの譲り。必ず要る' },
    { en: "Building on what Jen said —", ja: 'ジェンの話に乗せる形ですが', note: '人の意見に足す形は歓迎される' },
    { en: "Can we park that for now?", ja: '一旦置いておきませんか', note: 'park it。脱線を止める' },
    { en: "So what's the ask here?", ja: 'つまり何を求められていますか', note: 'the ask。名詞で使う。話が長いときの整理' },
    { en: "Who's taking the action on that?", ja: 'それは誰が担当しますか', note: 'action item。決まらないまま終わるのを防ぐ' },
    { en: "I'll own that.", ja: 'それは自分が持ちます', note: 'own。担当を引き受ける。強い言い方' },
    { en: "Let's put a pin in it.", ja: '一旦保留にしましょう', note: 'put a pin in it。あとで戻る前提で止める' },
    { en: "Let me follow up after this.", ja: 'この後、個別に確認します', note: '答えられないときの逃げ道。逃げていい' },
    { en: "Are we good to wrap?", ja: '締めて大丈夫ですか', note: 'wrap。会議を終える' },

    // ---- 質問する ----
    { en: "Quick question —", ja: 'ちょっと質問なんですが', note: '大抵 quick ではない。それでも付ける' },
    { en: "Am I overthinking this?", ja: '考えすぎですかね', note: '自分の判断を確認する。返事が早く返る' },
    { en: "Who owns this?", ja: 'これは誰の担当ですか', note: 'own。組織で最も重要な質問' },
    { en: "Who should I loop in?", ja: '誰を入れておくべきですか', note: 'loop in。宛先に加える人を確認する' },
    { en: "Is there a doc for this somewhere?", ja: 'これの手順書ってどこかにありますか', note: 'doc。あることが多い。探す前に聞く' },
    { en: "Has anyone done this before?", ja: '前にやった人はいますか', note: '車輪の再発明を防ぐ' },
    { en: "Dumb question, but —", ja: '初歩的なことなんですが', note: '前置きを付けると聞きやすい。ただし1日2回まで' },

    // ---- メールとチャット ----
    { en: "Looping in Jen.", ja: 'ジェンを追加します', note: 'メールの本文1行目。これだけで足りる' },
    { en: "Per my last email —", ja: '前回のメールでもお伝えしたとおり', note: '**表向きは丁寧、実質は苛立ちの合図。** 使われたら気をつける' },
    { en: "Just following up on this.", ja: '念のため再送します', note: '催促の最も柔らかい形' },
    { en: "Bumping this up.", ja: '再度お願いします', note: 'bump。埋もれたメールを上げる' },
    { en: "Thanks in advance.", ja: 'よろしくお願いします', note: '依頼メールの締め。やる前提で礼を言う' },
    { en: "No action needed — just FYI.", ja: '対応不要、参考までに', note: 'FYI。読む側の負担を先に下げる' },
    { en: "Sorry for the delay.", ja: '返信が遅くなりました', note: '3日以上空いたら付ける' },
    { en: "Happy to jump on a call if that's easier.", ja: '電話の方が早ければ、いつでも', note: 'jump on a call。長文の応酬を止める' },

    // ---- 断る・調整する ----
    { en: "I don't have the bandwidth this week.", ja: '今週は手が回りません', note: 'bandwidth。角の立たない断り' },
    { en: "I can do it, but something else has to move.", ja: 'やれますが、何かを後ろにずらす必要があります', note: '**断らずに優先順位を相手に決めさせる。** 最も大人の形' },
    { en: "Which one takes priority?", ja: 'どちらが優先ですか', note: '2件重なったときに必ず聞く' },
    { en: "Can we push it to next week?", ja: '来週に回せますか', note: 'push it。締切をずらす依頼' },
    { en: "I'd rather do it properly than fast.", ja: '速さより、ちゃんとやりたいです', note: '質を守る一文。言い方次第で通る' },
    { en: "Let me check my calendar and get back to you.", ja: '予定を見て折り返します', note: '即答を避ける定型' },

    // ---- 雑談 ----
    { en: "How was your weekend?", ja: '週末どうだった？', note: '月曜の朝、必ず来る。答えは2文で足りる' },
    { en: "Quiet one, mostly.", ja: 'まあ静かに過ごしたよ', note: '何もしていないときの模範解答' },
    { en: "Any plans for the weekend?", ja: '週末の予定は？', note: '金曜の午後、必ず来る' },
    { en: "Nothing crazy.", ja: '特に何も', note: '2語で返せる。使い勝手が異常に良い' },
    { en: "Is it Friday yet?", ja: 'まだ金曜じゃないのか', note: '水曜に言う定型。共感が返ってくる' },
    { en: "Coffee run — you want anything?", ja: 'コーヒー買ってくるけど、いる？', note: 'coffee run。職場の社交の中心' },
    { en: "How are you finding it so far?", ja: 'ここまでどう？', note: '新人に必ず聞かれる。find it = 感じる' },
    { en: "Everyone's been really welcoming.", ja: 'みなさん親切にしてくれてます', note: '無難で本当。模範解答' },

    // ---- 一日を終える ----
    { en: "I'm going to head out.", ja: 'そろそろ上がります', note: 'head out。退社の宣言' },
    { en: "Have a good one.", ja: 'お疲れさまです', note: '「お疲れさま」に一番近い実用形' },
    { en: "See you tomorrow.", ja: 'また明日', note: '' },
    { en: "I'll pick this up in the morning.", ja: '続きは明日やります', note: 'pick it up。中断して翌日に回す' },
    { en: "Anything you need before I go?", ja: '帰る前に何かありますか', note: '1週目に毎日言うと印象が変わる' },
    { en: "Have a good weekend.", ja: 'よい週末を', note: '金曜の定型。全員が言う' },
];
