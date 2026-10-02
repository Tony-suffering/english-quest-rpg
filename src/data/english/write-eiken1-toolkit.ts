// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-eiken1-toolkit.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * 英検1級 ライティング 表現マスター (Expression Toolkit)
 *
 * 差別化の核: 「30本のエッセイ = 1級作文に必要な武器が漏れなく入った設計図」を
 * 証明するための、キュレーションされた完全な表現体系。
 *
 * 2層構成:
 *   1. 機能別の「型」(function templates) -- 導入/立場/理由/説明/例示/譲歩/因果/対比/結論
 *   2. 品詞別の「格上げ語彙」(power vocab)  -- 動詞/形容詞/副詞/名詞。1級と準1級を分ける単語層
 *
 * 各 item の match[] は、エッセイ本文/要約/スピーチを小文字でスキャンして
 * 「30本のどこに実在するか(被覆)」を算出するための検出キー。被覆マップは
 * /english/write/master が EIKEN1_ESSAYS 等から動的に計算する(手動の日付振りはしない)。
 * match が本文に1件もヒットしない item = 補填すべき本文の穴。
 */

export type ToolkitKind = 'function' | 'verb' | 'adjective' | 'adverb' | 'noun';

export interface ToolkitItem {
    en: string;      // 表示見出し(型 or 見出し語)
    ja: string;      // 意味
    note: string;    // いつ/なぜ使うか
    match: string[]; // 検出キー(小文字)。単語は語境界、型は部分一致で照合
}

export interface ToolkitCategory {
    key: string;
    label: string;   // 日本語ラベル
    sub: string;     // 補足(英語 or 役割)
    kind: ToolkitKind;
    items: ToolkitItem[];
}

export const WRITE_TOOLKIT: ToolkitCategory[] = [
    // ===================== 機能別の型 =====================
    {
        key: 'intro', label: '導入・お題の言い換え', sub: 'Paraphrase the prompt', kind: 'function',
        items: [
            { en: 'There is much debate over whether ~', ja: '〜については大いに議論がある', note: 'お題を中立に言い換える鉄板の出だし。どのトピックにも流用可', match: ['there is much debate over'] },
            { en: 'It is often argued that ~', ja: '〜としばしば論じられる', note: '主語をぼかして上品に一般論を立てる導入', match: ['it is often argued that'] },
            { en: 'It is widely believed that ~', ja: '〜と広く信じられている', note: '通念を提示してから自説へ繋ぐ。賛否どちらにも', match: ['it is widely believed that'] },
            { en: 'There is ongoing debate over ~', ja: '〜について議論が続いている', note: '賛否が割れるお題の導入に最適', match: ['there is ongoing debate over', 'there is no denying'] },
            { en: 'remains a deeply divisive issue', ja: '依然として深く意見の分かれる問題だ', note: '対立の激しいテーマを格調高く立てる', match: ['divisive issue', 'deeply divisive'] },
            { en: 'As the world becomes increasingly interconnected, ~', ja: '世界がますますつながるにつれ〜', note: 'グローバル系論題に万能の重厚な書き出し', match: ['increasingly interconnected', 'interconnected world'] },
            { en: 'With the rapid spread of ~', ja: '〜の急速な普及に伴い', note: '現代テクノロジー系テーマの導入に', match: ['with the rapid spread of', 'rapid spread'] },
            { en: 'has attracted considerable attention', ja: '大きな注目を集めている', note: '話題の重要性を立てて切り出す', match: ['attracted considerable attention', 'considerable attention'] },
        ],
    },
    {
        key: 'thesis', label: '立場の明言 (Thesis)', sub: 'State your position', kind: 'function',
        items: [
            { en: 'I firmly believe that ~', ja: '私は〜と固く信じている', note: '立場を強く打ち出す最頻出のテーゼ', match: ['i firmly believe', 'firmly believe that'] },
            { en: 'I am convinced that ~', ja: '私は〜と確信している', note: '根拠に裏打ちされた断定。結論の再宣言にも', match: ['i am convinced that', 'am convinced that'] },
            { en: 'In my view, ~', ja: '私の考えでは〜', note: 'イントロでテーゼを明示するシンプルな宣言', match: ['in my view'] },
            { en: 'I must disagree with the notion that ~', ja: '〜という考えには反対せざるをえない', note: '反対の立場をきっぱり示す', match: ['i must disagree', 'disagree with the notion', 'disagree with the claim'] },
            { en: 'After careful reflection, I believe ~', ja: '熟慮の末、私は〜と考える', note: '落ち着いた口調でテーゼを置く', match: ['after careful reflection', 'careful reflection'] },
            { en: 'Having weighed the arguments, I agree that ~', ja: '論点を比較検討した結果、〜に賛成する', note: '賛否型でテーゼを出す。検討した姿勢を見せる', match: ['having weighed the arguments', 'weighed the arguments', 'weighing the evidence'] },
        ],
    },
    {
        key: 'forecast', label: '理由の予告・列挙', sub: 'Forecast & enumerate', kind: 'function',
        items: [
            { en: 'for three main reasons', ja: '三つの主な理由から', note: '序論末に置くと本論3段落の予告になる', match: ['for three main reasons'] },
            { en: 'for three principal reasons', ja: '三つの主たる理由から', note: 'main の言い換え。手札を増やす', match: ['for three principal reasons', 'three principal reasons'] },
            { en: 'for three compelling reasons', ja: '説得力のある三つの理由から', note: 'さらに格上げした列挙の予告', match: ['for three compelling reasons', 'three compelling reasons'] },
            { en: 'I will offer three reasons to support my view', ja: '自説を支える三つの理由を示す', note: '一文で本論を予告する型', match: ['three reasons to support', 'offer three reasons'] },
            { en: 'First, ... Second, ... Finally, ...', ja: '第一に…第二に…最後に…', note: '本論の道標(signposting)。採点者が構成を追える', match: ['first,', 'finally,'] },
        ],
    },
    {
        key: 'explain', label: '理由の深掘り・説明', sub: 'Deepen the reason', kind: 'function',
        items: [
            { en: 'This is significant because ~', ja: 'これが重要なのは〜だからだ', note: '理由→説明の橋渡し。本論の接着剤', match: ['this is significant because', 'is significant because'] },
            { en: 'This is largely because ~', ja: 'これは主に〜だからだ', note: '理由を一文で深掘りする型', match: ['this is largely because', 'largely because'] },
            { en: 'not merely ~ but ~', ja: '単に…だけでなく〜', note: '論点を二段で深める格上げ構文', match: ['not merely', 'not only'] },
            { en: 'which in turn ~', ja: 'それが今度は〜する', note: '連鎖する因果を滑らかにつなぐ', match: ['which in turn', 'in turn'] },
            { en: 'From a long-term perspective, ~', ja: '長期的に見れば〜', note: '理由を一段深い視点から見せる', match: ['long-term perspective', 'long-term'] },
            { en: 'From an economic / environmental standpoint', ja: '経済/環境の観点から見ると', note: '理由の角度を専門視点で限定する万能句', match: ['standpoint'] },
        ],
    },
    {
        key: 'example', label: '具体例の導入', sub: 'Introduce examples', kind: 'function',
        items: [
            { en: 'A prime example of this is ~', ja: 'その好例が〜だ', note: 'For example の格上げ版', match: ['a prime example', 'prime example of this'] },
            { en: 'A clear example is ~', ja: '明確な例が〜だ', note: '具体例の導入。事例を一つ放り込む', match: ['a clear example'] },
            { en: 'A case in point is ~', ja: '好例が〜だ', note: '最も英作文らしい例示の決まり文句', match: ['a case in point', 'case in point'] },
            { en: 'For instance, ~', ja: 'たとえば〜', note: '本論で事例を差し込む基本形', match: ['for instance'] },
            { en: 'such as ~', ja: '〜のような', note: '具体例を文中に軽く差し込む万能表現', match: ['such as'] },
        ],
    },
    {
        key: 'concede', label: '譲歩→反論', sub: 'Concede then rebut', kind: 'function',
        items: [
            { en: 'Admittedly, ~. However, ~', ja: '確かに〜。しかし〜', note: '反対意見を一度認めて切り返す王道', match: ['admittedly'] },
            { en: '~ yet ~', ja: '確かに…だが〜', note: '一文で譲歩と反論を畳む', match: ['yet'] },
            { en: 'There is no denying that ~', ja: '〜は否定できない', note: '一理を認めつつ自説を押す強い型', match: ['there is no denying', 'no denying that'] },
            { en: 'While this is ~, I am convinced that ~', ja: '〜ではあるが、私は〜と確信している', note: '譲歩しつつ強い主張を出すイントロ', match: ['while this is'] },
            { en: 'Even so, I am convinced that ~', ja: 'とはいえ私は〜と確信している', note: '前文を認めて逆張りする転換', match: ['even so'] },
            { en: 'Nevertheless, ~', ja: 'それでもなお〜', note: 'However より重い逆接。譲歩の格上げ', match: ['nevertheless'] },
            { en: 'Despite the concerns frequently raised, ~', ja: 'しばしば挙げられる懸念にもかかわらず〜', note: '反対論を先に潰してから立場を出す', match: ['despite', 'concerns frequently raised'] },
        ],
    },
    {
        key: 'cause', label: '因果・連鎖', sub: 'Cause & consequence', kind: 'function',
        items: [
            { en: 'Consequently, ~', ja: 'その結果〜', note: '因果の帰結を上品につなぐ接続副詞', match: ['consequently'] },
            { en: 'As a result, ~', ja: 'その結果として〜', note: '帰結を示す基本形', match: ['as a result'] },
            { en: 'thanks to ~', ja: '〜のおかげで', note: '結論冒頭で3理由を前置詞句に束ねる', match: ['thanks to'] },
            { en: 'serve as a catalyst for ~', ja: '〜の触媒/きっかけとなる', note: '因果を上品に言う比喩コロケーション', match: ['catalyst for', 'serve as a catalyst', 'serves as a'] },
            { en: 'translates directly into ~', ja: '〜に直結する', note: '因果を力強く示す動詞表現', match: ['translates directly into', 'translates into'] },
            { en: 'owes much to ~', ja: '〜に多くを負っている', note: '因果・恩義を上品に述べる', match: ['owes much to', 'owe much to'] },
        ],
    },
    {
        key: 'contrast', label: '対比・格上げ', sub: 'Contrast & elevate', kind: 'function',
        items: [
            { en: 'Unlike ~, ...', ja: '〜と違い、…', note: '対比で長所を際立たせる本論の定番', match: ['unlike '] },
            { en: 'rather than ~', ja: '〜よりむしろ／〜ではなく', note: '対比で立場を鮮明にする', match: ['rather than'] },
            { en: 'Far from being ~, ~', ja: '〜どころか、むしろ〜', note: '反対概念を否定して結論を締める', match: ['far from being', 'far from'] },
            { en: 'not merely A but a just B', ja: '単なるAではなく正当なBだ', note: '対象の意味を格上げする not A but B', match: ['not mere', 'but a just'] },
        ],
    },
    {
        key: 'conclude', label: '結論・締め', sub: 'Conclude', kind: 'function',
        items: [
            { en: 'In conclusion, ~', ja: '結論として〜', note: '結論段落の基本の合図', match: ['in conclusion'] },
            { en: 'For these reasons, ~', ja: 'これらの理由から〜', note: '3理由を束ねて結論へ', match: ['for these reasons'] },
            { en: 'on balance', ja: '差し引きで／総合的に見て', note: '全体評価を示す副詞句。序論・結論どちらでも', match: ['on balance'] },
            { en: 'the benefits far outweigh the drawbacks', ja: '利点が欠点をはるかに上回る', note: '賛成側の結論で天秤を傾ける決め台詞', match: ['far outweigh', 'outweigh the drawbacks', 'outweigh its drawbacks'] },
            { en: 'the case for ~ is overwhelming', ja: '〜を支持する根拠は圧倒的だ', note: '結論で自説の優位を宣言する', match: ['the case for', 'is overwhelming'] },
            { en: 'I therefore remain convinced that ~', ja: 'したがって私は〜と確信し続けている', note: '結論で立場を再宣言する締め', match: ['therefore remain convinced', 'therefore convinced', 'i am therefore'] },
        ],
    },

    // ===================== 品詞別の格上げ語彙 =====================
    {
        key: 'verb', label: '格上げ動詞', sub: 'Power verbs', kind: 'verb',
        items: [
            { en: 'foster', ja: '育む・促進する', note: 'promote の格上げ。能力・協力・成長を「育てる」', match: ['foster', 'fosters', 'fostering', 'fostered'] },
            { en: 'undermine', ja: '損なう・揺るがす', note: '土台を内側から崩す。damage の上級', match: ['undermine', 'undermines', 'undermining', 'undermined'] },
            { en: 'exacerbate', ja: '悪化させる', note: 'make worse の1級語。問題を「さらに悪く」', match: ['exacerbate', 'exacerbates', 'exacerbating', 'exacerbated'] },
            { en: 'mitigate', ja: '緩和する', note: 'reduce の格上げ。悪影響を「和らげる」', match: ['mitigate', 'mitigates', 'mitigating', 'mitigated'] },
            { en: 'alleviate', ja: '軽減する', note: '苦痛・負担・貧困を「やわらげる」', match: ['alleviate', 'alleviates', 'alleviating', 'alleviated'] },
            { en: 'hinder', ja: '妨げる', note: 'prevent/stop の上級。進行を「阻む」', match: ['hinder', 'hinders', 'hindering', 'hindered'] },
            { en: 'bolster', ja: '強化する・後押しする', note: 'strengthen の格上げ。主張・経済を「下支え」', match: ['bolster', 'bolsters', 'bolstering', 'bolstered'] },
            { en: 'curb', ja: '抑制する', note: '増加・乱用を「抑える」。規制系で頻出', match: ['curb', 'curbs', 'curbing', 'curbed'] },
            { en: 'jeopardize', ja: '危険にさらす', note: 'put at risk の1語。安全・将来を「脅かす」', match: ['jeopardize', 'jeopardizes', 'jeopardizing', 'jeopardized', 'jeopardise', 'endanger', 'endangers', 'endangered'] },
            { en: 'erode', ja: '徐々に損なう', note: '信頼・権利を「じわじわ削る」比喩', match: ['erode', 'erodes', 'eroding', 'eroded'] },
            { en: 'facilitate', ja: '促進する・容易にする', note: 'help/make easier の格上げ', match: ['facilitate', 'facilitates', 'facilitating', 'facilitated'] },
            { en: 'perpetuate', ja: '永続させる', note: '不平等・偏見を「温存・固定化する」', match: ['perpetuate', 'perpetuates', 'perpetuating', 'perpetuated'] },
            { en: 'outweigh', ja: '上回る', note: '天秤で「勝る」。賛否の結論の必須動詞', match: ['outweigh', 'outweighs', 'outweighing', 'outweighed'] },
            { en: 'safeguard', ja: '守る・保護する', note: 'protect の格上げ。権利・環境を「守る」', match: ['safeguard', 'safeguards', 'safeguarding', 'safeguarded'] },
            { en: 'enhance', ja: '高める・向上させる', note: 'improve の格上げ。質・能力を「引き上げる」', match: ['enhance', 'enhances', 'enhancing', 'enhanced'] },
            { en: 'drive', ja: '推進する・原動力となる', note: 'cause/lead の力強い版。成長・革新を「動かす」', match: ['drive', 'drives', 'driving', 'driven', 'drove'] },
        ],
    },
    {
        key: 'adjective', label: '格上げ形容詞', sub: 'Power adjectives', kind: 'adjective',
        items: [
            { en: 'detrimental', ja: '有害な', note: 'bad/harmful の格上げ。悪影響を述べる定番', match: ['detrimental'] },
            { en: 'beneficial', ja: '有益な', note: 'good の格上げ。メリット段落の核', match: ['beneficial'] },
            { en: 'crucial', ja: '極めて重要な', note: 'important の格上げ。play a crucial role で頻出', match: ['crucial'] },
            { en: 'viable', ja: '実現可能な・存続できる', note: 'possible の上級。代替案・解決策を評価', match: ['viable'] },
            { en: 'sustainable', ja: '持続可能な', note: '環境・経済の最頻出キーワード', match: ['sustainable', 'sustainably'] },
            { en: 'inevitable', ja: '避けられない', note: '必然性を強調。almost inevitable で頻出', match: ['inevitable'] },
            { en: 'profound', ja: '甚大な・根深い', note: 'big/deep の格上げ。影響・変化を強調', match: ['profound'] },
            { en: 'substantial', ja: '相当な・大きな', note: 'big/many の格上げ。substantial benefits', match: ['substantial'] },
            { en: 'compelling', ja: '説得力のある', note: 'strong の格上げ。理由・証拠を評価', match: ['compelling'] },
            { en: 'adverse', ja: '不利な・悪い', note: 'adverse effects/impact で頻出のコロケ', match: ['adverse'] },
            { en: 'indispensable', ja: '不可欠な', note: 'necessary の最上級。結論で重要性を総括', match: ['indispensable'] },
            { en: 'considerable', ja: 'かなりの', note: 'large の格上げ。量・程度を上品に盛る', match: ['considerable'] },
            { en: 'vital', ja: '不可欠の・極めて重要な', note: 'very important の1語。crucial の言い換え', match: ['vital'] },
            { en: 'far-reaching', ja: '広範囲に及ぶ', note: '影響の広がりを示す。far-reaching consequences', match: ['far-reaching', 'far reaching'] },
        ],
    },
    {
        key: 'adverb', label: '格上げ副詞', sub: 'Power adverbs', kind: 'adverb',
        items: [
            { en: 'undeniably', ja: '紛れもなく', note: '譲歩や強調で「否定しようがなく」', match: ['undeniably', 'undeniable'] },
            { en: 'arguably', ja: 'おそらく・間違いなく', note: '断定を和らげつつ強く主張する便利語', match: ['arguably'] },
            { en: 'increasingly', ja: 'ますます', note: '趨勢を示す。現代テーマの導入で頻出', match: ['increasingly'] },
            { en: 'significantly', ja: '著しく・大きく', note: '効果の大きさを強調する副詞', match: ['significantly'] },
            { en: 'fundamentally', ja: '根本的に', note: '本質レベルの変化・主張を強調', match: ['fundamentally', 'fundamental'] },
            { en: 'ultimately', ja: '最終的に', note: '結論や長期的帰結を導く', match: ['ultimately'] },
            { en: 'inherently', ja: '本質的に・元来', note: '「そもそも〜な性質」を示す上級副詞', match: ['inherently', 'inherent'] },
            { en: 'consistently', ja: '一貫して', note: 'studies consistently show で証拠を押す', match: ['consistently'] },
            { en: 'inevitably', ja: '必然的に', note: '因果の必然を示す。almost inevitably', match: ['inevitably'] },
            { en: 'undoubtedly', ja: '疑いなく', note: '主張を強める断定の副詞', match: ['undoubtedly', 'no doubt'] },
            { en: 'profoundly', ja: '深く・甚大に', note: '影響の深さを強調する副詞', match: ['profoundly'] },
            { en: 'considerably', ja: 'かなり', note: '程度を上品に強める', match: ['considerably'] },
        ],
    },
    {
        key: 'noun', label: '格上げ名詞', sub: 'Power nouns', kind: 'noun',
        items: [
            { en: 'implications', ja: '影響・含意', note: 'effects の格上げ。波及する帰結を語る', match: ['implication', 'implications'] },
            { en: 'ramifications', ja: '(複雑な)影響・余波', note: 'consequences の上級。連鎖的な結果', match: ['ramification', 'ramifications'] },
            { en: 'drawbacks', ja: '欠点', note: 'bad points の格上げ。benefits と対で使う', match: ['drawback', 'drawbacks'] },
            { en: 'incentive', ja: '誘因・動機づけ', note: '行動を促す「インセンティブ」。経済系で頻出', match: ['incentive', 'incentives'] },
            { en: 'disparity', ja: '格差・不均衡', note: 'gap/inequality の格上げ。income disparity', match: ['disparity', 'disparities'] },
            { en: 'prosperity', ja: '繁栄', note: 'wealth の格上げ。経済・社会の好転を語る', match: ['prosperity'] },
            { en: 'infrastructure', ja: '社会基盤', note: '交通・通信・制度の土台。社会系で必須', match: ['infrastructure'] },
            { en: 'sustainability', ja: '持続可能性', note: '環境・経済の最頻出概念名詞', match: ['sustainability'] },
            { en: 'consequences', ja: '(悪い)結果・帰結', note: 'results の格上げ。far-reaching consequences', match: ['consequence', 'consequences'] },
            { en: 'burden', ja: '負担', note: 'financial/tax burden。重荷を語る定番', match: ['burden', 'burdens'] },
            { en: 'welfare', ja: '福祉・幸福', note: 'social welfare / animal welfare で頻出', match: ['welfare'] },
            { en: 'inequality', ja: '不平等', note: '社会系テーマの核となる名詞', match: ['inequality', 'inequalities'] },
            { en: 'autonomy', ja: '自律・自主性', note: '個人・国家の「自己決定権」。倫理系で効く', match: ['autonomy', 'autonomous'] },
            { en: 'resilience', ja: '回復力・強靭さ', note: '困難に耐え立ち直る力。経済・社会・環境で', match: ['resilience', 'resilient'] },
        ],
    },
];

// 被覆判定のための、エッセイ等を1本のテキストに畳む小道具
export function essayBlob(parts: Array<string | undefined>): string {
    return parts.filter(Boolean).join(' \n ').toLowerCase();
}

// item が text 内に存在するか。単語(英字のみ)は語境界、型や複合は部分一致で照合
export function toolkitMatches(item: ToolkitItem, text: string): boolean {
    return item.match.some(m => {
        if (/^[a-z]+$/.test(m)) {
            return new RegExp(`\\b${m}\\b`).test(text);
        }
        return text.includes(m);
    });
}
