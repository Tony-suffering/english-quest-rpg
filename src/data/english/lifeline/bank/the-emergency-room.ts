/**
 * BANK — The Emergency Room / 救急外来
 *
 * 受付 → トリアージ → 待つ → 診察室 → 症状を説明する → 検査 → 結果 → 処置 →
 * 退院指示 → 支払い。命に関わる場面で、聞き返せないと本当に困る英語。
 *
 * 症状の言い方は「どこが・どんな痛みが・いつから・何をすると悪化するか」の4点で全部決まる。
 * この4点を持っていれば、単語が足りなくても診療は進む。
 */

import type { LifePhrase } from '../../lifeline-types';

export const ER_BANK: LifePhrase[] = [

    // ---- 受付 ----
    { en: "What brings you in today?", ja: '今日はどうされましたか', note: '第一声。症状を1文で言えるようにしておく' },
    { en: "I cut my hand and it won't stop bleeding.", ja: '手を切って血が止まりません', note: 'won\'t stop 〜ing。継続している症状の言い方' },
    { en: "My son fell and hit his head.", ja: '息子が転んで頭を打ちました', note: 'hit his head。頭部外傷は優先度が上がる' },
    { en: "I'm having chest pain.", ja: '胸が痛みます', note: 'この一文は最優先で通る。使い方を間違えない' },
    { en: "Do you have your insurance card and a photo ID?", ja: '保険証と写真付き身分証はお持ちですか', note: '診察より先に必ず求められる' },
    { en: "I don't have insurance.", ja: '保険に入っていません', note: '言っても診てもらえる。法律で断れない' },
    { en: "Take a seat and someone will call you.", ja: '座ってお待ちください。お呼びします', note: 'call you。名前で呼ばれる' },
    { en: "Fill this out, both sides.", ja: '両面記入してください', note: 'both sides。裏面を忘れる人が多い' },
    { en: "Who's your primary?", ja: 'かかりつけ医はどなたですか', note: 'primary = primary care physician。無ければ I don\'t have one.' },
    { en: "Is this work-related?", ja: '労災ですか', note: '答えで請求先が変わる。正確に答える' },

    // ---- トリアージ ----
    { en: "On a scale of one to ten, how's the pain?", ja: '痛みは10段階でどれくらいですか', note: '遠慮して低く言うと後回しになる。実際の数字で答える' },
    { en: "Eight. Maybe nine when I move.", ja: '8です。動くと9かも', note: '条件付きで答えると精度が上がる' },
    { en: "When did it start?", ja: 'いつから始まりましたか', note: '時刻で答える。Around two this morning.' },
    { en: "Has this ever happened before?", ja: '前にも同じことがありましたか', note: '既往の確認。Yes, twice. のように回数で' },
    { en: "Any allergies to medications?", ja: '薬のアレルギーはありますか', note: 'No known allergies. が定型の答え' },
    { en: "What medications are you on?", ja: '飲んでいる薬は何ですか', note: 'be on 〜。薬の名前は英語で言えるようにしておく' },
    { en: "Any chance you could be pregnant?", ja: '妊娠の可能性はありますか', note: '女性には必ず聞かれる。検査の前に確認される' },
    { en: "Have you had anything to eat or drink?", ja: '飲食はしましたか', note: '手術の可能性があるときに聞かれる' },
    { en: "I'm going to take your vitals.", ja: 'バイタルを測ります', note: 'vitals。血圧・脈・体温・酸素飽和度' },
    { en: "Your blood pressure is a little high.", ja: '血圧が少し高いですね', note: 'a little high。緊張のせいのことが多い' },
    { en: "Let me get a pulse ox on you.", ja: '酸素飽和度を測ります', note: 'pulse ox。指に挟むクリップ' },
    { en: "Sit tight, we'll get you back as soon as we can.", ja: 'お待ちください。できるだけ早くお通しします', note: 'get you back。奥の診察エリアへ通すこと' },

    // ---- 待つ ----
    { en: "It's a bit of a wait tonight.", ja: '今夜は少し待ちます', note: 'a bit of a wait は3時間以上を意味することがある' },
    { en: "Do you have any idea how much longer?", ja: 'あとどれくらいかかりそうですか', note: '聞いていい。責める言い方にしない' },
    { en: "We're going by severity, not by arrival.", ja: '重症度順で、到着順ではありません', note: 'severity。順番が来ない理由の説明' },
    { en: "He's getting worse — can someone look at him?", ja: '悪化しています。見てもらえませんか', note: 'getting worse。この一文で順番が動くことがある' },
    { en: "I need to step out and make a call.", ja: '一度出て電話してきます', note: 'step out。名前を呼ばれるので受付に伝えておく' },
    { en: "If they call your name, I'll come get you.", ja: '呼ばれたら呼びに行きます', note: '付き添いが言う一文' },

    // ---- 診察室 ----
    { en: "Change into this, opening in the back.", ja: 'これに着替えてください。開くのが後ろです', note: 'opening in the back。ガウンの向き' },
    { en: "Have a seat on the bed.", ja: 'ベッドに座ってください', note: 'the bed。診察台もこう呼ぶ' },
    { en: "The doctor will be in shortly.", ja: '医師がまもなく来ます', note: 'be in。部屋に入ってくること' },
    { en: "I'm Dr. Osei, I'll be taking care of you.", ja: 'オセイです。担当します', note: '医師の名乗り。名前を覚えておく' },
    { en: "Tell me what happened.", ja: '何があったか話してください', note: '時系列で話す。結論から言わなくていい' },
    { en: "Show me where it hurts.", ja: 'どこが痛いか指してください', note: '指させばいい。言葉が出なくても通じる' },
    { en: "Does it hurt when I press here?", ja: 'ここを押すと痛みますか', note: 'press here。診察の基本' },
    { en: "Take a deep breath for me.", ja: '大きく息を吸ってください', note: 'for me が付くのが医療の言い方' },
    { en: "Follow my finger.", ja: '指を目で追ってください', note: '頭部外傷の確認' },
    { en: "Squeeze my hands.", ja: '手を握ってください', note: '左右差を見ている' },
    { en: "Any numbness or tingling?", ja: 'しびれやピリピリはありますか', note: 'numbness / tingling。神経症状の2語' },

    // ---- 症状を言う ----
    { en: "It's a sharp pain, right here.", ja: '鋭い痛みが、ちょうどここに', note: 'sharp。刺すような痛み' },
    { en: "It's more of a dull ache.", ja: 'どちらかというと鈍い痛みです', note: 'dull ache。鈍痛' },
    { en: "It comes and goes.", ja: '出たり治まったりします', note: 'come and go。間欠的な症状' },
    { en: "It's been constant since last night.", ja: '昨夜からずっと続いています', note: 'constant。持続的' },
    { en: "It gets worse when I breathe in.", ja: '息を吸うと悪化します', note: 'get worse when 〜。悪化条件を言うと診断が絞れる' },
    { en: "It radiates down my arm.", ja: '腕に広がっていきます', note: 'radiate。放散痛。心臓の話で重要' },
    { en: "I threw up twice.", ja: '2回吐きました', note: 'throw up。回数を言う' },
    { en: "I've been running a fever for three days.", ja: '3日間熱が続いています', note: 'run a fever。日数とセットで' },
    { en: "I got light-headed and had to sit down.", ja: 'ふらついて座り込みました', note: 'light-headed。立ちくらみ' },
    { en: "I couldn't put any weight on it.", ja: '体重をかけられませんでした', note: 'put weight on 〜。足の怪我の重要な情報' },
    { en: "It's swollen and it's turning purple.", ja: '腫れていて紫色になってきています', note: 'swollen / bruised。見た目の変化' },
    { en: "I never lost consciousness.", ja: '意識は失っていません', note: 'lose consciousness。頭部外傷で必ず聞かれる' },
    { en: "I don't remember hitting my head.", ja: '頭を打った記憶がありません', note: '記憶の欠落は重要。正直に言う' },

    // ---- 検査 ----
    { en: "We're going to run some tests.", ja: '検査をします', note: 'run tests。結果は come back という' },
    { en: "We'll get some blood work and an X-ray.", ja: '血液検査とレントゲンを撮ります', note: 'blood work。血液検査' },
    { en: "I'm going to start an IV.", ja: '点滴を入れます', note: 'start an IV。アイ・ヴィー' },
    { en: "Small pinch.", ja: 'ちくっとします', note: '注射・採血の合図。全部これ' },
    { en: "Make a fist for me.", ja: '手を握ってください', note: '採血のとき' },
    { en: "We need a urine sample.", ja: '尿検査をします', note: 'sample。検体' },
    { en: "Any metal in your body?", ja: '体内に金属はありますか', note: 'MRI の前に必ず聞かれる' },
    { en: "Hold still. Don't breathe.", ja: '動かないで。息を止めて', note: 'レントゲンの一瞬の指示' },
    { en: "The results should be back in about an hour.", ja: '結果は1時間ほどで出ます', note: 'be back。検査結果はこの動詞' },
    { en: "We're still waiting on the labs.", ja: 'まだ血液検査の結果待ちです', note: 'wait on 〜。待っている対象' },

    // ---- 結果・説明 ----
    { en: "The good news is nothing's broken.", ja: '骨折はありません', note: 'the good news is 〜。悪い話の前置きでもある' },
    { en: "It's a bad sprain.", ja: 'ひどい捻挫です', note: 'sprain。捻挫。骨折は fracture' },
    { en: "You've got a hairline fracture.", ja: '細いひびが入っています', note: 'hairline fracture。軽い骨折' },
    { en: "It's most likely a virus.", ja: 'おそらくウイルス性です', note: 'この一言が出たら抗生物質は出ない' },
    { en: "Antibiotics won't help with this.", ja: 'これに抗生物質は効きません', note: '説明されずに終わることもある。聞いていい' },
    { en: "We want to keep you for observation.", ja: '経過観察で入院してもらいます', note: 'observation。正式な入院とは扱いが違う' },
    { en: "I'd rather be safe and check it out.", ja: '念のため調べておきたいです', note: '追加検査を勧めるときの言い方' },
    { en: "What are we ruling out here?", ja: '何を否定するための検査ですか', note: 'rule out。医師が一番よく使う考え方。聞くと説明が変わる' },
    { en: "Can you explain that in plain English?", ja: 'わかる言葉で説明してもらえますか', note: '遠慮せずに言う。医師も慣れている' },
    { en: "What happens if we do nothing?", ja: '何もしなかったらどうなりますか', note: '選択肢を全部出させる一文' },

    // ---- 処置 ----
    { en: "This is going to sting.", ja: 'しみます', note: 'sting。消毒や麻酔の前の予告' },
    { en: "You'll need a few stitches.", ja: '数針縫います', note: 'stitches。縫合' },
    { en: "I'm going to numb it first.", ja: 'まず麻酔をします', note: 'numb。局所麻酔' },
    { en: "Can you feel that?", ja: '感じますか', note: '麻酔の効きの確認。感じたら言う' },
    { en: "We're going to put it back in place.", ja: '整復します', note: 'put it back in place。脱臼や骨折の整復' },
    { en: "On three. One, two —", ja: '3で。1、2 ―', note: '3を言わずにやることがある。有名な手口' },
    { en: "You'll be in a splint for two weeks.", ja: '2週間シーネで固定します', note: 'splint。ギプスは cast' },
    { en: "Keep it elevated and iced.", ja: '挙上して冷やしてください', note: 'elevated and iced。RICE の一部' },
    { en: "I'm giving you something for the pain.", ja: '痛み止めを出します', note: 'something for the pain。薬の名前を言わない言い方' },

    // ---- 退院指示 ----
    { en: "Here are your discharge instructions.", ja: '退院時の説明書です', note: 'discharge instructions。必ず読む' },
    { en: "Follow up with your primary in three days.", ja: '3日以内にかかりつけ医を受診してください', note: 'follow up with 〜。受診の指示' },
    { en: "Come back if it gets worse.", ja: '悪化したらまた来てください', note: '一番よく言われる指示' },
    { en: "Come back immediately if you have any of these symptoms.", ja: 'これらの症状が出たらすぐ来てください', note: '紙に書いてある。必ず確認する' },
    { en: "No heavy lifting for two weeks.", ja: '2週間は重いものを持たないでください', note: 'heavy lifting。仕事に関わる制限' },
    { en: "Take it with food.", ja: '食後に飲んでください', note: 'with food。薬の指示の定番' },
    { en: "Finish the whole course.", ja: '最後まで飲み切ってください', note: 'the whole course。抗生物質の指示' },
    { en: "Can I get a work note?", ja: '診断書をもらえますか', note: 'work note。休むために職場に出す紙' },
    { en: "Do I need to see a specialist?", ja: '専門医にかかる必要はありますか', note: 'specialist。紹介が要るかを聞く' },
    { en: "Is there a number I can call if I have questions?", ja: '質問があるときの連絡先はありますか', note: '帰る前に必ず取る' },

    // ---- 支払い・その後 ----
    { en: "Do you have a copay today?", ja: '本日の自己負担はありますか', note: 'copay。窓口で払う定額' },
    { en: "You'll get a bill in the mail.", ja: '請求書が後日届きます', note: '3週間後に来る。金額はここではわからない' },
    { en: "The doctor bills separately from the hospital.", ja: '医師の請求は病院とは別です', note: '請求が2通来る理由。知らないと驚く' },
    { en: "Is this facility in network?", ja: 'ここは保険の適用内ですか', note: 'in network。金額が数倍変わる' },
    { en: "Can I get an itemized bill?", ja: '内訳の入った請求書をください', note: 'itemized。頼むと減ることがある' },
    { en: "Where do I pick up the prescription?", ja: '処方薬はどこで受け取れますか', note: '院内薬局か外の薬局か' },

    // ---- 付き添い ----
    { en: "Can I go back with him?", ja: '一緒に奥へ入れますか', note: 'go back with 〜。付き添いの可否' },
    { en: "Only one visitor at a time.", ja: '付き添いは1名までです', note: 'at a time。交代はできる' },
    { en: "I'm his wife.", ja: '妻です', note: '関係を言うと入れることがある' },
    { en: "Is there somewhere I can wait?", ja: 'どこで待てばいいですか', note: '待合室の場所を聞く' },
    { en: "Do you need anything? Water?", ja: '何かいる？水とか', note: '付き添いが言う一文。中身は何でもいい' },
    { en: "I'll call your mom and let her know.", ja: 'お母さんに連絡しておく', note: 'let her know。状況を伝える' },
    { en: "They're taking good care of him.", ja: 'ちゃんと診てもらってるよ', note: '家族への報告の定型' },
];
