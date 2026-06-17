// 罠師（わなし）ハウスバンク
// 解く側=既成の良問トラップ。仕掛ける側=正解だけ提示して誤答を作らせるお題。
// TOEIC Part 5 の文法対比(時制/前置詞/品詞/接続詞 vs 前置詞/語法)に絞る。

export interface SolveChoice {
    word: string;
    correct?: boolean;
    taunt?: string;   // 誤答に付く作者の煽り(恥とあきらめ voice)
}

export interface SolveTrap {
    id: string;
    stem: string;       // ___ を1つ含む
    point: string;      // 文法対比ラベル
    choices: SolveChoice[];  // 4択。correct:true が1つ。並びは固定(混ぜ済み)
}

export interface AuthorPrompt {
    id: string;
    stem: string;       // ___ を1つ含む
    correct: string;    // 最初から提示する正解
    hint: string;       // 罠の作り方ヒント(対比空間)
}

// ── 解く側: 既成トラップ(作者煽り付き) ──
export const SOLVE_BANK: SolveTrap[] = [
    {
        id: 's1', stem: 'The shipment will arrive ___ three business days.', point: '前置詞: 所要 within',
        choices: [
            { word: 'for', taunt: '期間っぽいが「3日間ずっと到着し続ける」のか? 完了の within を知らない奴用。' },
            { word: 'within', correct: true },
            { word: 'until', taunt: '「3日まで据え置き」。期限と所要をごっちゃにした奴が刺さる。' },
            { word: 'since', taunt: '現在完了でもないのに since。起点と幅の区別がついてない。' },
        ],
    },
    {
        id: 's2', stem: 'All employees are required to ___ their ID badges at all times.', point: '語法: be required to + 原形',
        choices: [
            { word: 'wearing', taunt: 'to の後ろに -ing。to不定詞と前置詞 to を混同した典型。' },
            { word: 'wear', correct: true },
            { word: 'worn', taunt: '過去分詞をなぜここに。形だけで選んだ。' },
            { word: 'wears', taunt: 'to の後に三単現。主語も見てない。' },
        ],
    },
    {
        id: 's3', stem: 'The manager asked the team to work more ___.', point: '品詞: 動詞を修飾する副詞',
        choices: [
            { word: 'efficient', taunt: '形容詞。work(動詞)を修飾してるのに。品詞を見てない。' },
            { word: 'efficiency', taunt: '名詞。more の後ろを全部形容詞だと思ってる。' },
            { word: 'efficiently', correct: true },
            { word: 'efficiencies', taunt: '複数名詞。語尾だけ眺めて選んだだろ。' },
        ],
    },
    {
        id: 's4', stem: '___ the heavy rain, the outdoor event proceeded as planned.', point: '譲歩: 前置詞 Despite vs 接続詞',
        choices: [
            { word: 'Although', taunt: '接続詞。後ろは "the heavy rain" の名詞句で節がない。品詞で死亡。' },
            { word: 'Despite', correct: true },
            { word: 'Because of', taunt: '意味が逆。雨「だから」開催した、にはならない。意味で死亡。' },
            { word: 'However', taunt: '副詞。文頭で名詞句を率いられない。' },
        ],
    },
    {
        id: 's5', stem: 'Ms. Sato has been with the company ___ over a decade.', point: '前置詞: for+期間 / since+起点',
        choices: [
            { word: 'since', taunt: '現在完了に釣られて since。後ろは「10年超」の期間。起点じゃない。' },
            { word: 'during', taunt: '特定の期間名詞が要る(during the meeting)。数量の幅には付かない。' },
            { word: 'for', correct: true },
            { word: 'in', taunt: 'とりあえずの in。期間の継続には for。' },
        ],
    },
    {
        id: 's6', stem: 'Please make sure the report is submitted ___ Friday.', point: '前置詞: by(期限) vs until(継続)',
        choices: [
            { word: 'until', taunt: '「金曜まで提出し続ける」。締切の by と継続の until を混同。最頻出の罠。' },
            { word: 'by', correct: true },
            { word: 'till', taunt: 'until の口語形。同じ理由で死亡。' },
            { word: 'on', taunt: '「金曜に」だが締切のニュアンスは by。惜しいが本ボシじゃない。' },
        ],
    },
    {
        id: 's7', stem: 'The committee will announce its decision ___ the meeting concludes.', point: '接続詞: 時の once / 前置詞 during',
        choices: [
            { word: 'during', taunt: '前置詞。後ろに節(the meeting concludes)が来てる時点で品詞ミス。' },
            { word: 'once', correct: true },
            { word: 'whether', taunt: '形は接続詞で合うが意味が「〜かどうか」。文法で切れない上級者キラー。' },
            { word: 'despite', taunt: '前置詞かつ意味も逆。二重に死亡。' },
        ],
    },
    {
        id: 's8', stem: 'Neither the manager ___ the staff were informed of the change.', point: '相関接続詞: neither...nor',
        choices: [
            { word: 'or', taunt: 'either...or との取り違え。neither に or は付かない。' },
            { word: 'nor', correct: true },
            { word: 'and', taunt: '意味は取れるが相関の型が壊れる。neither と来たら nor。' },
            { word: 'either', taunt: 'neither either。型を二重で壊した。' },
        ],
    },
    {
        id: 's9', stem: 'Sales have increased ___ since the new campaign launched.', point: '品詞: 動詞を修飾する副詞',
        choices: [
            { word: 'significant', taunt: '形容詞。increased(動詞)を修飾するなら副詞。' },
            { word: 'significantly', correct: true },
            { word: 'significance', taunt: '名詞。文の要素が埋まってるのに名詞を足した。' },
            { word: 'signify', taunt: '動詞の原形。have increased で動詞は足りてる。' },
        ],
    },
    {
        id: 's10', stem: 'The new system is far more ___ than the previous one.', point: '品詞: be + 比較 + 形容詞',
        choices: [
            { word: 'rely', taunt: '動詞。be動詞 + more の後ろは形容詞。原形を置く場所じゃない。' },
            { word: 'reliably', taunt: '副詞。is を修飾してるつもりか? 補語は形容詞。' },
            { word: 'reliable', correct: true },
            { word: 'reliability', taunt: '名詞。more reliability なら可算性も崩れる。語尾で選ぶな。' },
        ],
    },
];

// ── 仕掛ける側: 正解だけ提示、誤答3つを作らせるお題 ──
export const AUTHOR_PROMPTS: AuthorPrompt[] = [
    { id: 'a1', stem: 'She has worked here ___ 2019.', correct: 'since', hint: '現在完了+起点。期間の for、起点の from、適当な in が罠候補。なぜ for が罠で in が罠にすらならないか書け。' },
    { id: 'a2', stem: 'The new policy will take effect ___ the board approves it.', correct: 'once', hint: '時の接続詞。後ろは節。前置詞(during)、意味違いの接続詞(whether/until)で釣れる。' },
    { id: 'a3', stem: 'The report must be reviewed ___ it is published.', correct: 'before', hint: '時の接続詞。after で意味逆、during で品詞死亡、for で語法死亡。' },
    { id: 'a4', stem: 'Our profits grew ___ last quarter.', correct: 'considerably', hint: '動詞を修飾する副詞。同語族の considerable/consideration/considerate で品詞の罠を3種。' },
    { id: 'a5', stem: '___ the budget cuts, the project was completed on time.', correct: 'Despite', hint: '譲歩の前置詞。接続詞(Although)で品詞、Because of で意味逆、副詞(However)で文頭不可。' },
    { id: 'a6', stem: 'The applicant is highly ___ for the position.', correct: 'qualified', hint: 'be + 副詞 + 形容詞(過去分詞)。qualify/qualifying/qualification で品詞・語法を突け。' },
    { id: 'a7', stem: 'The factory operates ___ it has enough raw materials.', correct: 'as long as', hint: '条件の接続詞。as far as(範囲で意味違い)、because(因果)、during(前置詞)で釣れる。' },
];
