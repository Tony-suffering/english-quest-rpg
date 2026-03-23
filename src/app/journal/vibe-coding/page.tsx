'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';

type Lesson = {
    id: string;
    chapter: number;
    title: string;
    subtitle: string;
    readMin: number;
    body: string[];
    tip: string;
};

const CHAPTERS = [
    { num: 1, label: 'はじめの一歩', color: '#10B981' },
    { num: 2, label: '指示の出し方', color: '#D4AF37' },
    { num: 3, label: 'レベルアップ', color: '#3B82F6' },
    { num: 4, label: '実戦', color: '#8B5CF6' },
];

const LESSONS: Lesson[] = [
    {
        id: 'what-is-claude-code', chapter: 1,
        title: 'Claude Codeって何？',
        subtitle: 'ChatGPTの親戚だけど、こいつは手を動かす',
        readMin: 3,
        body: [
            'ChatGPTは知ってるよね。',
            'あれに質問すると、文章で答えが返ってくる。',
            'Claude Codeは違う。',
            'こいつは文章じゃなくて、アプリを作って返してくる。',
            '',
            '-- 大工の例えで考える --',
            '',
            'ChatGPTは建築相談員。',
            '本棚の作り方を丁寧に教えてくれる。材料、寸法、手順、全部。',
            'でも教えてくれるだけ。作ってはくれない。',
            '',
            'Claude Codeは大工。',
            '本棚が欲しいって言ったら、目の前で木を切り始める。',
            'あなたのパソコンの中で、実際にファイルを作って、コードを書いて、動くものを組み立てる。',
            '',
            '-- じゃあプログラミングの知識は？ --',
            '',
            'いらない。',
            'マジでいらない。',
            '俺がその証拠。',
            'TOEIC 900点取ったけど英語喋れない男が、プログラミング知識ゼロで英語学習アプリを作った。',
            'toniolab.comっていうサイト、全部Claude Codeで作った。',
            '1行もコード書いてない。嘘じゃない。',
            '',
            '必要なのはキーボードが打てることと、日本語で説明できること。',
            'この2つだけ。',
        ],
        tip: 'Claude Codeはチャットじゃない。あなたのパソコンの中で実際にファイルを作って動くものを組み立てる大工。',
    },
    {
        id: 'installation', chapter: 1,
        title: 'インストールしよう',
        subtitle: 'コマンド3つで終わる。ラーメンより早い',
        readMin: 4,
        body: [
            'インストールの話をします。',
            '難しそうに聞こえるけど、やることは3つだけ。',
            '',
            '-- 手順1: Node.jsを入れる --',
            '',
            'まず Node.js というやつをインストールする。',
            'Claude Codeが動くために必要な土台。',
            '家を建てる前の土地みたいなもの。',
            'nodejs.org にアクセスして、緑のボタンを押して、ダウンロードしたファイルをダブルクリック。',
            '次へ、次へ、次へ、完了。',
            'Windowsのインストールウィザードで育った世代なら余裕。',
            '',
            '-- 手順2: ターミナルを開く --',
            '',
            'Windowsなら PowerShell か コマンドプロンプト。',
            'Macなら ターミナル。',
            '黒い画面が出る。怖がらなくていい。',
            'ここにコマンドを打ち込むだけ。',
            '',
            '-- 手順3: Claude Codeをインストール --',
            '',
            'ターミナルにこれを打つ。',
            '`npm install -g @anthropic-ai/claude-code`',
            '',
            'これだけ。終わり。本当に終わり。',
            '',
            'インストールが終わったら `claude` と打ってEnter。',
            '初回だけAnthropicのアカウント設定が出るけど、画面の指示に従えばいい。',
            'メールアドレスとパスワードを設定するだけ。Amazonのアカウント作るのと同じ。',
        ],
        tip: 'Node.jsインストール → ターミナルで npm install -g @anthropic-ai/claude-code → claude で起動。3ステップ。',
    },
    {
        id: 'monthly-cost', chapter: 1,
        title: '月3000円の話',
        subtitle: 'コンビニコーヒー30杯か、プログラマー1人か',
        readMin: 3,
        body: [
            'Claude Codeを本気で使うにはClaude Proっていうサブスクがいる。',
            '月$20。日本円で約3000円。',
            '',
            '高い？安い？',
            'ちょっと比較してみよう。',
            '',
            '- プログラミングスクール: 30万円。作れるようになる保証なし',
            '- プログラマーに外注: 1ページ5万円から。修正のたびに追加料金',
            '- Claude Pro: 月3000円。24時間働く。文句言わない。何回でもやり直す',
            '',
            'コンビニのコーヒー30杯分で、プログラマーが1人雇える計算。',
            '',
            '-- 無料でも使えるの？ --',
            '',
            '一応使える。',
            'でも無料だと1日の使用回数に制限がある。',
            '本気で何か作ろうと思ったら5分で使い切る。',
            'お試しとしてはいいけど、実用には足りない。',
            '',
            '-- 俺の結論 --',
            '',
            '3000円で、毎月何か作れるようになる。',
            '去年の俺はこの3000円を知らなかったから、何も作れなかった。',
            '今年の俺はアプリを1つ運営してる。',
            '差額3000円。',
            '正解かどうかは、toniolab.comが証拠。',
        ],
        tip: '月3000円 = コンビニコーヒー30杯分。プログラミングスクール30万円と比べてどっちがいいかは、あなたが決めて。',
    },
    {
        id: 'first-ten-minutes', chapter: 1,
        title: '最初の10分',
        subtitle: '黒い画面が出ても逃げないで',
        readMin: 4,
        body: [
            '`claude` と打ってEnterを押した。',
            '黒い画面に文字が出てきた。',
            'おめでとう。それがClaude Code。',
            '',
            '-- 何が表示されるか --',
            '',
            '最初にズラッと英語が出る。',
            '読まなくていい。利用規約みたいなもん。',
            'Enterを押して進む。',
            '',
            'そのあと、カーソルが点滅して入力待ちになる。',
            'ここに日本語で指示を打つ。',
            '',
            '-- 最初に何を打つか --',
            '',
            '深呼吸して、こう打ってみよう。',
            '`index.htmlというファイルを作って。中身は「こんにちは世界」と表示するだけのシンプルなページ。`',
            '',
            'Claude Codeが勝手にファイルを作り始める。',
            '数秒でindex.htmlが完成する。',
            'そのファイルをブラウザで開くと、画面に出てる。こんにちは世界。',
            '',
            'これがバイブコーディング。',
            '日本語で言ったら、できた。以上。',
            '',
            '-- パニックポイント --',
            '',
            'ファイルを作っていいですか？って聞かれたらYを押す。',
            'たまに英語でエラーが出る。慌てない。',
            'エラーが出たら、そのエラーをそのままClaude Codeに見せればいい。',
            'これ何？って聞けば直してくれる。',
            '大工に任せろ。',
        ],
        tip: 'ターミナルで claude → 日本語で指示 → ファイルができる。最初の成功体験を今日中に。',
    },
    {
        id: 'vague-instructions-suck', chapter: 2,
        title: 'いい感じにして、は一番ダメ',
        subtitle: 'ラーメン屋で「美味しいやつ」って注文する人、いる？',
        readMin: 4,
        body: [
            'ラーメン屋に入ったとする。',
            '美味しいやつくださいって言ったらどうなるか。',
            '店員が困る。',
            '味噌？醤油？豚骨？辛いの？大盛り？',
            '',
            'Claude Codeも同じ。',
            'いい感じのサイト作って、は最悪の指示。',
            '',
            '-- ダメな指示 vs いい指示 --',
            '',
            '1. ダメ: かっこいいホームページ作って',
            '  いい: 白背景で、上にナビゲーション、真ん中に大きい写真、下に3つのサービス紹介カードがあるホームページ作って',
            '',
            '2. ダメ: ブログ機能つけて',
            '  いい: 記事のタイトル、日付、本文を表示するブログページを作って。記事データはJSONファイルから読み込んで',
            '',
            '3. ダメ: もっといい感じにして',
            '  いい: 文字が小さくて読みにくいから、本文のフォントサイズを18pxにして。あと見出しと本文の間のスペースをもっと広げて',
            '',
            '-- なぜ具体的じゃないとダメなのか --',
            '',
            'AIは超優秀だけど、エスパーじゃない。',
            'あなたの頭の中のイメージは、あなたにしか見えない。',
            '言葉にしないと伝わらない。',
            '',
            'これ、AIだけじゃなくて、人間相手でも同じ。',
            '嫁にいい感じにしてって言ったら、100%喧嘩になる。',
            '具体的に言え。それだけ。',
        ],
        tip: '具体的な指示 = 具体的な結果。ラーメン屋では味噌大盛りと言おう。',
    },
    {
        id: 'show-examples', chapter: 2,
        title: '見本を見せろ',
        subtitle: 'カラオケの採点機だって原曲がないと採点できない',
        readMin: 3,
        body: [
            'AIに何かを作ってもらうとき、一番効くのが見本。',
            '言葉で100行説明するより、スクショ1枚の方が伝わる。',
            '',
            '-- 見本の見せ方 --',
            '',
            '1. 参考サイトのURLを貼る',
            '  このサイトみたいなデザインにして、と一緒にURLを渡す',
            '',
            '2. 既存のファイルを読ませる',
            '  この前作ったページと同じスタイルで新しいページ作って、と言えばいい',
            '',
            '3. スクリーンショットを見せる',
            '  Claude Codeは画像も理解できる。手書きのラフでもいい',
            '',
            '-- カラオケの例え --',
            '',
            'カラオケの採点機を想像してほしい。',
            'あの機械、原曲のデータがないと採点できない。',
            'AIも同じ。',
            'こういう感じ、っていう基準があると、そこに向かって精度が上がる。',
            '',
            '見本なしの指示は、原曲なしでカラオケ採点するようなもの。',
            '何が正解かわからないまま歌ってるのと同じ。',
        ],
        tip: '見本はAIの精度を劇的に上げる最強の武器。スクショ、URL、既存ファイル、何でもいいから見せろ。',
    },
    {
        id: 'how-to-fix', chapter: 2,
        title: '直し方の技術',
        subtitle: 'AIは間違える。嫁と同じで、直し方にコツがある',
        readMin: 4,
        body: [
            'AIは間違える。',
            'これは欠陥じゃない。仕様。',
            '100%完璧に作れるAIはまだ存在しない。',
            'でも安心してほしい。直し方を知ってれば問題ない。',
            '',
            '-- 嫁との喧嘩から学ぶフィードバック術 --',
            '',
            'ダメな修正依頼:',
            '- なんか違う',
            '- もっとちゃんとして',
            '- 前の方がよかった',
            '',
            'これ、嫁に言ったら殴られるやつ。AIに言っても同じくらい役に立たない。',
            '',
            'いい修正依頼:',
            '- ヘッダーの背景色を白から紺に変えて',
            '- ボタンの位置が右すぎるから、中央に移動して',
            '- 3番目のカードの説明文が長すぎるから、2行に収まるように短くして',
            '',
            '-- コツは場所と内容を分けること --',
            '',
            '1. どこが（場所を指定）',
            '2. どう違うか（現状を説明）',
            '3. どうしてほしいか（ゴールを指定）',
            '',
            'この3つを伝えるだけで、修正の精度が段違いに上がる。',
            '',
            '感情で伝えるな、事実で伝えろ。',
            'これ、AI相手でも人間相手でも同じ。',
            'むしろAIの方が感情抜きで受け止めてくれるから楽。',
        ],
        tip: '修正依頼は「どこが」「どう違って」「どうしてほしいか」の3点セット。感情じゃなくて事実で伝える。',
    },
    {
        id: 'magic-phrases', chapter: 2,
        title: '魔法の言葉5選',
        subtitle: 'コピペするだけで結果が変わる5つのフレーズ',
        readMin: 3,
        body: [
            'Claude Codeでめちゃくちゃ使えるフレーズが5つある。',
            '暗記しなくていい。コピペでいい。',
            '',
            '-- 1. このファイルを読んでから始めて --',
            '',
            'AIに最初に既存のコードを読ませる。',
            '現場を見ないで工事する大工はいない。',
            '既存のファイルがある場合は必ずこれを最初に言う。',
            '',
            '-- 2. エラーの原因を調べて --',
            '',
            'エラーが出たとき、自分で意味を調べなくていい。',
            'エラーメッセージをそのまま見せて、原因を調べてって言えばいい。',
            'AIが読んで、原因を見つけて、直してくれる。',
            '',
            '-- 3. テストして --',
            '',
            '作ったものがちゃんと動くか、AIに確認させる。',
            '自分で1個1個クリックして確認しなくていい。',
            '',
            '-- 4. もっとシンプルに --',
            '',
            'AIはたまに張り切って複雑なものを作る。',
            '必要以上に凝ったやつが出てきたら、これを言う。',
            'シンプルが正義。',
            '',
            '-- 5. 前の状態に戻して --',
            '',
            '最強の呪文。',
            'やらかしたとき、壊したとき、なんか変になったとき。',
            'Claude Codeは変更履歴を覚えてるから、前に戻せる。',
            'Ctrl+Zの上位互換。',
        ],
        tip: '困ったらこの5つのどれかを打てばだいたい解決する。特に5番は毎日使う。',
    },
    {
        id: 'what-is-claude-md', chapter: 3,
        title: 'CLAUDE.mdって何？',
        subtitle: '新人バイトに渡すマニュアルを書こう',
        readMin: 4,
        body: [
            'CLAUDE.mdは、プロジェクトのルールブック。',
            'Claude Codeが作業を始める前に必ず読む説明書。',
            '',
            '-- バイトの初日を思い出してほしい --',
            '',
            '新しいバイト先で、何も説明なしにいきなりやってって言われたことある？',
            '何をやればいいかわからなくて立ち尽くすやつ。',
            'AIも同じ。',
            'ルールを書いておかないと、毎回この色使っていい？このフォント何？って迷う。',
            '',
            '-- 何を書くか --',
            '',
            '- プロジェクトで使う色のコード',
            '- フォントの種類とサイズ',
            '- デザインのルール（角丸にする、影をつける、など）',
            '- ファイルの置き場所のルール',
            '- 絶対にやっちゃダメなこと',
            '',
            '-- 実際の例 --',
            '',
            '俺のtoniolab.comのCLAUDE.mdには、こう書いてある。',
            '- メインカラーはゴールド(#D4AF37)。絶対に他の金色を使うな',
            '- 絵文字は禁止。プロっぽくないから',
            '- 背景は白。ダークモードは作らない',
            '',
            'これだけで、AIが毎回同じスタイルで作ってくれる。',
            'マニュアルがあるバイトと、ないバイトの差。',
            '一度書けばずっと効く。',
        ],
        tip: 'CLAUDE.mdはAIへのマニュアル。色、フォント、ルールを書いておけば毎回説明しなくていい。',
    },
    {
        id: 'ai-memory', chapter: 3,
        title: 'AIに記憶させる方法',
        subtitle: 'いい上司は背景を伝える。マイクロマネジメントしない',
        readMin: 3,
        body: [
            'Claude Codeには記憶の仕組みがある。',
            '前に話したことを覚えておいてくれる機能。',
            '',
            '-- 何を記憶させるべきか --',
            '',
            '- プロジェクトの全体像（何を作ってるのか）',
            '- 重要な設計判断（なぜこの方法を選んだか）',
            '- 過去にハマったバグ（同じミスを繰り返さないため）',
            '- ファイル構成のルール（どこに何を置くか）',
            '',
            '-- 何を記憶させるべきじゃないか --',
            '',
            '- 1回限りの作業内容',
            '- コードの中身そのもの（読めばわかるから）',
            '- 毎回変わるような情報',
            '',
            '-- いい上司の例え --',
            '',
            '新人に仕事を頼むとき。',
            'ダメな上司: 1行目にこう書いて、2行目にこう書いて、3行目は...（マイクロマネジメント）',
            'いい上司: このプロジェクトはこういう目的で、こういうルールがある。あとは任せた',
            '',
            '背景と制約を伝えて、細かいやり方は任せる。',
            'AIも人間も、このバランスが一番パフォーマンス出る。',
        ],
        tip: 'AIに記憶させるのは方針とルール。手順をいちいち教えるのはマイクロマネジメントと同じ。',
    },
    {
        id: 'when-things-break', chapter: 3,
        title: '失敗したときの対処法',
        subtitle: 'セーブせずにボス戦行くな',
        readMin: 4,
        body: [
            '失敗する。絶対する。',
            'プロのプログラマーだって毎日バグ出す。',
            '初心者が失敗しないわけがない。',
            'でも大丈夫。対処法を知ってれば死なない。',
            '',
            '-- Gitっていう保険 --',
            '',
            'Gitはセーブポイント。',
            'ゲームでボス戦の前にセーブするでしょ。あれと同じ。',
            '大きい変更の前に `git commit` ってやると、その時点の状態を保存できる。',
            'やらかしたら、セーブポイントに戻れる。',
            '',
            '-- 最低限これだけ覚えて --',
            '',
            '1. 何か大きいことをする前に、Claude Codeにこう言う:',
            '  `今の状態をgitでコミットして`',
            '',
            '2. やらかしたら、こう言う:',
            '  `前の状態に戻して`',
            '',
            'この2つだけ。Gitの仕組みは知らなくていい。',
            '',
            '-- パニックしたときの行動指針 --',
            '',
            '1. 画面が真っ赤になった → エラーメッセージをAIに見せる',
            '2. 何が起きたかわからない → AIに「今何が起きてる？」って聞く',
            '3. 全部壊れた気がする → git commitしてたら戻せる。してなかったら...次からする',
            '',
            'セーブせずにボス戦に行ったRPGの記憶、あるでしょ？',
            'あの絶望を味わいたくなかったら、こまめにコミット。',
        ],
        tip: '大きい変更の前に「gitでコミットして」。これだけでいつでも安全な状態に戻れる。セーブは大事。',
    },
    {
        id: 'one-day-reality', chapter: 3,
        title: '1日で何ができるか',
        subtitle: '期待値を正しくセットしないと心が折れる',
        readMin: 3,
        body: [
            'バイブコーディングは早い。でも魔法じゃない。',
            '期待値が間違ってると挫折する。',
            'だからリアルな話をする。',
            '',
            '-- 俺が1日で作ったもの --',
            '',
            '- 単語カレンダー（単語を日付ごとに表示するUI）',
            '- リスニング練習ページ（音声の再生・停止・テキスト表示）',
            '- 語録一覧ページ（カテゴリフィルター付き）',
            '',
            '1日で作れたけど、完成度は60%くらい。細かい調整に次の日もかかった。',
            '',
            '-- 現実的なタイムライン --',
            '',
            '- 1時間: シンプルな1ページサイト',
            '- 半日: 3〜5ページのサイト（ナビ付き）',
            '- 1日: 動的な機能付きサイト（フィルター、検索、データ表示）',
            '- 1週間: データベース連携のアプリ',
            '',
            '-- 初心者が注意すべきこと --',
            '',
            'プログラマーに外注したら1ヶ月かかるものが、1日でできる。',
            'これは事実。',
            'でもプロが3年かけて作るサービスが1日でできるわけじゃない。',
            'できることとできないことの境界を知っておくと、心が折れない。',
            '',
            'まずは小さく。自己紹介ページから。',
        ],
        tip: '1日で動くものは作れる。でも完成度60%。残り40%に同じくらい時間がかかる。それが普通。',
    },
    {
        id: 'everything-i-built', chapter: 4,
        title: '俺が作ったもの全部見せます',
        subtitle: 'プログラミング知識ゼロの男が作ったサイトの中身',
        readMin: 4,
        body: [
            'toniolab.com。',
            '俺が1人で作った英語学習サイト。',
            '全部Claude Code。コードは1行も自分で書いてない。',
            '',
            '-- 何があるか --',
            '',
            '- 単語レビュー: 毎日10個の単語がカレンダーに並ぶ。ストーリー仕立て',
            '- リスニング練習: ネイティブの会話を1行ずつ聞ける。Memoriaっていう名前',
            '- 語録コレクション: 日常で使える英語フレーズを収集。俺語録',
            '- 表現ガイド: 英語表現を解説付きで学べるページ',
            '',
            'これ全部、プログラミングの勉強は一切してない状態で作った。',
            '',
            '-- どのくらいの期間で？ --',
            '',
            '最初のページが動くまで: 1日',
            '人に見せられるレベルまで: 2週間',
            '今の状態まで: 約3ヶ月',
            '',
            '-- 正直な話 --',
            '',
            '途中で何回も壊した。',
            'エラーで3時間止まったことある。',
            'デザインが気に入らなくて全部作り直したこともある。',
            'でも、プログラミングスクールに通ってたら3ヶ月で何ができたか。',
            'たぶん、まだ変数の勉強してる。',
            '',
            '変数が何かは今でも説明できないけど、アプリは動いてる。',
            'それでいい。',
        ],
        tip: 'プログラミング知識ゼロでも3ヶ月でサイトは作れる。変数の意味はまだ知らない。',
    },
    {
        id: 'one-input-three-outputs', chapter: 4,
        title: '1つの指示から3つのコンテンツ',
        subtitle: 'ラーメン屋は1つの鍋からスープもチャーシューも作る',
        readMin: 4,
        body: [
            '俺のサイトには面白い仕組みがある。',
            '1つのストーリーから、3つの学習コンテンツを作る。',
            '',
            '-- ラーメン屋の例え --',
            '',
            'いいラーメン屋は、1つの豚骨スープから全部作る。',
            'スープはそのままラーメンに。',
            '煮込んだ肉はチャーシューに。',
            '残った脂は背脂として使う。',
            '1つの素材から3つの商品。',
            '',
            '-- 俺のサイトも同じ --',
            '',
            '1つのストーリー（例: 大学のパーティーの話）を書いたら、',
            '- 単語レビュー: そのストーリーに出てくる単語50個を5日分に分配',
            '- リスニング練習: 同じ話をネイティブ会話として作り直す',
            '- 表現ガイド: そこから使える表現を15個ピックアップ',
            '',
            '1回の指示で3つのコンテンツが生まれる。',
            '',
            '-- これがバイブコーディングの真価 --',
            '',
            'AIはデータの変換が得意。',
            '1つの情報を形を変えて何度も使い回せる。',
            'これを手作業でやったら何日かかるか。',
            'AIなら30分。',
            '',
            'あなたが何かを作るときも、この考え方を使ってほしい。',
            '1つのデータから何パターン作れるか考える。',
            '料理も、コンテンツも、コツは使い回し。',
        ],
        tip: '1つの素材から複数のコンテンツを作る発想。AIはデータの形を変えるのが得意。',
    },
    {
        id: 'your-turn', chapter: 4,
        title: 'あなたの番です',
        subtitle: '読んでるだけじゃ何も変わらない。打て。',
        readMin: 3,
        body: [
            'ここまで読んでくれてありがとう。',
            'でも正直に言う。',
            '読んだだけじゃ何も変わらない。',
            '',
            '-- 今日やってほしいこと --',
            '',
            '1. Node.jsをインストールする',
            '2. Claude Codeをインストールする',
            '3. 何でもいいから1つ、作ってみる',
            '',
            'この3つ。今日中に。',
            '',
            '-- 最初に何を作るか --',
            '',
            '迷ったらこの中から選べ。',
            '- 自己紹介ページ（名前、趣味、写真）',
            '- レシピ集（自分の好きな料理を3つ並べる）',
            '- TODOリスト（やること一覧を追加・削除できるやつ）',
            '- 推しの紹介ページ（好きなアイドル、アニメ、選手、何でも）',
            '',
            'どれも30分以内にできる。保証する。',
            '',
            '-- 最後に --',
            '',
            '俺はTOEIC 900点取ったけど英語喋れない。',
            'プログラミングは1行も書けない。',
            'でもアプリを1つ運営してる。',
            '',
            'できない理由はいくらでも見つかる。',
            'でも月3000円と、ターミナルに `claude` と打つ勇気さえあれば、',
            'あなたにも作れる。',
            '',
            '打て。話はそれからだ。',
        ],
        tip: '読むな、打て。claude と入力して、日本語で指示を出す。今日やれ。',
    },
];

/* ---- helpers ---- */

function chapterColor(ch: number) {
    return CHAPTERS.find(c => c.num === ch)?.color ?? '#D4AF37';
}
function lsKey(id: string) { return `vc_lesson_${id}`; }

/* ---- ProgressBar ---- */

function ProgressBar({ completed, total }: { completed: number; total: number }) {
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return (
        <div style={{ width: '100%', maxWidth: 320 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#78716c', letterSpacing: '0.08em' }}>PROGRESS</span>
                <span style={{ fontSize: 13, color: '#D4AF37', fontWeight: 600 }}>{completed} / {total}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: '#e7e5e4', overflow: 'hidden' }}>
                <div style={{
                    height: '100%', borderRadius: 3, width: `${pct}%`,
                    background: 'linear-gradient(90deg, #10B981, #D4AF37)',
                    transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
                }} />
            </div>
        </div>
    );
}

/* ---- ChapterHeader ---- */

function ChapterHeader({ chapter }: { chapter: typeof CHAPTERS[number] }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '28px 0 12px' }}>
            <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: `${chapter.color}15`, border: `1px solid ${chapter.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: chapter.color,
            }}>{chapter.num}</div>
            <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: chapter.color, opacity: 0.8, letterSpacing: '0.12em', marginBottom: 1 }}>
                    CHAPTER {chapter.num}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#292524' }}>{chapter.label}</div>
            </div>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${chapter.color}33, transparent)`, marginLeft: 8 }} />
        </div>
    );
}

/* ---- LessonCard ---- */

function LessonCard({ lesson, index, isCompleted, onOpen }: {
    lesson: Lesson; index: number; isCompleted: boolean; onOpen: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const color = chapterColor(lesson.chapter);
    return (
        <button onClick={onOpen} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: 16, width: '100%', padding: '18px 20px',
                background: hovered ? '#fafaf9' : '#ffffff',
                border: '1px solid', borderColor: hovered ? `${color}44` : '#e7e5e4',
                borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s', position: 'relative', overflow: 'hidden',
            }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.25s' }} />
            <div style={{
                flexShrink: 0, width: 44, height: 44, borderRadius: 12,
                background: isCompleted ? `${color}12` : '#f5f5f4',
                border: `1px solid ${isCompleted ? color + '44' : '#e7e5e4'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: isCompleted ? color : '#a8a29e',
            }}>
                {isCompleted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: isCompleted ? '#a8a29e' : '#1c1917', lineHeight: 1.4, marginBottom: 2 }}>{lesson.title}</div>
                <div style={{ fontSize: 12.5, color: '#78716c', lineHeight: 1.3 }}>{lesson.subtitle}</div>
            </div>
            <div style={{ flexShrink: 0, fontSize: 11.5, color: '#a8a29e', letterSpacing: '0.04em' }}>{lesson.readMin} min</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hovered ? color : '#d6d3d1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'stroke 0.25s' }}><polyline points="9 18 15 12 9 6" /></svg>
        </button>
    );
}

/* ---- Body Renderer ---- */

function BodyRenderer({ body, color }: { body: string[]; color: string }) {
    return (
        <>
            {body.map((para, i) => {
                if (para === '') return <div key={i} style={{ height: 18 }} />;
                // h3 heading
                const h3Match = para.match(/^--\s*(.+?)\s*--$/);
                if (h3Match) {
                    return (
                        <h3 key={i} style={{
                            fontSize: 16, fontWeight: 700, color: '#1c1917',
                            margin: '28px 0 14px', lineHeight: 1.5, paddingLeft: 14,
                            borderLeft: `3px solid ${color}`,
                        }}>{h3Match[1]}</h3>
                    );
                }
                // bullet list
                if (para.startsWith('- ')) {
                    return (
                        <div key={i} style={{ display: 'flex', gap: 10, margin: '0 0 6px', paddingLeft: 4 }}>
                            <span style={{ color: color, fontSize: 14, lineHeight: '2.0', flexShrink: 0 }}>-</span>
                            <span style={{ fontSize: 14.5, lineHeight: 2.0, color: '#44403c' }}>{para.slice(2)}</span>
                        </div>
                    );
                }
                // numbered list (starts with digit + period)
                if (/^\d+\.\s/.test(para)) {
                    const dotIdx = para.indexOf('. ');
                    return (
                        <div key={i} style={{ display: 'flex', gap: 10, margin: '0 0 6px', paddingLeft: 4 }}>
                            <span style={{ color: color, fontSize: 14, fontWeight: 700, lineHeight: '2.0', flexShrink: 0, minWidth: 18 }}>{para.slice(0, dotIdx + 1)}</span>
                            <span style={{ fontSize: 14.5, lineHeight: 2.0, color: '#44403c' }}>{para.slice(dotIdx + 2)}</span>
                        </div>
                    );
                }
                // indented (starts with spaces)
                if (para.startsWith('  ')) {
                    // inline code in indented
                    const parts = para.trim().split(/(`[^`]+`)/g);
                    return (
                        <p key={i} style={{ fontSize: 14, lineHeight: 2.0, color: '#78716c', margin: '0 0 6px', paddingLeft: 28, fontStyle: 'italic' }}>
                            {parts.map((part, pi) => {
                                if (part.startsWith('`') && part.endsWith('`')) {
                                    return <code key={pi} style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 13, background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 5, padding: '2px 7px', color: '#b45309', fontStyle: 'normal' }}>{part.slice(1, -1)}</code>;
                                }
                                return <span key={pi}>{part}</span>;
                            })}
                        </p>
                    );
                }
                // regular paragraph with inline code support
                const parts = para.split(/(`[^`]+`)/g);
                return (
                    <p key={i} style={{ fontSize: 15, lineHeight: 2.0, color: '#44403c', margin: '0 0 8px' }}>
                        {parts.map((part, pi) => {
                            if (part.startsWith('`') && part.endsWith('`')) {
                                return <code key={pi} style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 13, background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 5, padding: '2px 7px', color: '#b45309' }}>{part.slice(1, -1)}</code>;
                            }
                            return <span key={pi}>{part}</span>;
                        })}
                    </p>
                );
            })}
        </>
    );
}

/* ---- LessonDetail ---- */

function LessonDetail({ lesson, lessonIndex, total, isCompleted, onComplete, onBack, onNav }: {
    lesson: Lesson; lessonIndex: number; total: number; isCompleted: boolean;
    onComplete: () => void; onBack: () => void; onNav: (dir: -1 | 1) => void;
}) {
    const color = chapterColor(lesson.chapter);
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }); }, [lesson.id]);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            {/* top bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', borderBottom: '1px solid #e7e5e4', flexShrink: 0 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    BACK
                </button>
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 12, color: '#a8a29e', letterSpacing: '0.06em' }}>{lessonIndex + 1} / {total}</span>
            </div>

            {/* body scroll */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '32px 24px 48px' }}>
                <div style={{ maxWidth: 640, margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: color, letterSpacing: '0.1em', background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 6, padding: '3px 10px', marginBottom: 16 }}>
                        Chapter {lesson.chapter}
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1c1917', lineHeight: 1.5, margin: '0 0 8px' }}>{lesson.title}</h1>
                    <p style={{ fontSize: 14, color: '#78716c', margin: '0 0 10px', lineHeight: 1.5 }}>{lesson.subtitle}</p>
                    <div style={{ fontSize: 12, color: '#a8a29e', marginBottom: 40, letterSpacing: '0.04em' }}>{lesson.readMin} min read</div>

                    <BodyRenderer body={lesson.body} color={color} />

                    {/* POINT */}
                    <div style={{ marginTop: 44, background: `${color}08`, border: `1px solid ${color}22`, borderRadius: 14, padding: '20px 24px' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: color, letterSpacing: '0.15em', marginBottom: 10 }}>POINT</div>
                        <div style={{ fontSize: 14.5, lineHeight: 1.9, color: '#44403c' }}>{lesson.tip}</div>
                    </div>

                    {/* 読了 button */}
                    <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
                        <button onClick={onComplete} style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '12px 32px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                            border: isCompleted ? `1px solid ${color}44` : `1px solid ${color}`,
                            background: isCompleted ? `${color}10` : color,
                            color: isCompleted ? color : '#ffffff', transition: 'all 0.25s',
                        }}>
                            {isCompleted && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                            {isCompleted ? '読了済み' : '読了'}
                        </button>
                    </div>

                    {/* prev / next */}
                    <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => onNav(-1)} disabled={lessonIndex === 0} style={{ background: 'none', border: 'none', cursor: lessonIndex === 0 ? 'default' : 'pointer', color: lessonIndex === 0 ? '#d6d3d1' : '#78716c', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            Prev
                        </button>
                        <button onClick={() => onNav(1)} disabled={lessonIndex === total - 1} style={{ background: 'none', border: 'none', cursor: lessonIndex === total - 1 ? 'default' : 'pointer', color: lessonIndex === total - 1 ? '#d6d3d1' : color, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Next
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---- Main Page ---- */

export default function VibeCodingCoursePage() {
    const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());
    const [openLessonId, setOpenLessonId] = useState<string | null>(null);
    const [transitioning, setTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const set = new Set<string>();
        LESSONS.forEach(l => { if (localStorage.getItem(lsKey(l.id)) === '1') set.add(l.id); });
        setCompletedSet(set);
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const toggleComplete = useCallback((id: string) => {
        setCompletedSet(prev => {
            const next = new Set(prev);
            if (next.has(id)) { next.delete(id); localStorage.removeItem(lsKey(id)); }
            else { next.add(id); localStorage.setItem(lsKey(id), '1'); }
            return next;
        });
    }, []);

    const openLesson = useCallback((id: string) => {
        setTransitioning(true);
        setTimeout(() => { setOpenLessonId(id); setTransitioning(false); }, 150);
    }, []);

    const closeLesson = useCallback(() => {
        setTransitioning(true);
        setTimeout(() => { setOpenLessonId(null); setTransitioning(false); }, 150);
    }, []);

    const openLessonIndex = useMemo(() => LESSONS.findIndex(l => l.id === openLessonId), [openLessonId]);

    const navLesson = useCallback((dir: -1 | 1) => {
        const nextIdx = openLessonIndex + dir;
        if (nextIdx >= 0 && nextIdx < LESSONS.length) openLesson(LESSONS[nextIdx].id);
    }, [openLessonIndex, openLesson]);

    const grouped = useMemo(() => {
        const map = new Map<number, Lesson[]>();
        LESSONS.forEach(l => { if (!map.has(l.chapter)) map.set(l.chapter, []); map.get(l.chapter)!.push(l); });
        return map;
    }, []);

    // Detail view
    if (openLessonId && openLessonIndex >= 0) {
        return (
            <div style={{ height: '100%', overflow: 'hidden', opacity: transitioning ? 0 : 1, transition: 'opacity 0.15s' }}>
                <LessonDetail
                    lesson={LESSONS[openLessonIndex]} lessonIndex={openLessonIndex} total={LESSONS.length}
                    isCompleted={completedSet.has(openLessonId)}
                    onComplete={() => toggleComplete(openLessonId)} onBack={closeLesson} onNav={navLesson}
                />
            </div>
        );
    }

    // List view
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden', opacity: transitioning ? 0 : 1, transition: 'opacity 0.15s' }}>
            {/* HERO */}
            <div style={{
                flexShrink: 0, padding: isMobile ? '28px 20px 24px' : '36px 32px 28px', position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(165deg, #fafaf9 0%, #f5f5f4 40%, #ffffff 100%)',
                borderBottom: '1px solid #e7e5e4',
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%),radial-gradient(circle at 80% 20%, #10B981 0%, transparent 50%)' }} />
                <div style={{ position: 'relative', marginBottom: 20 }}>
                    <Link href="/journal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#78716c', textDecoration: 'none', letterSpacing: '0.06em' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        JOURNAL
                    </Link>
                </div>
                <div style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: 20 }}>
                    <div>
                        <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#D4AF37', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 6, padding: '4px 12px', marginBottom: 14 }}>MEMBERS ONLY</div>
                        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: '#1c1917', margin: '0 0 8px', lineHeight: 1.4 }}>バイブコーディング講座</h1>
                        <p style={{ fontSize: 13.5, color: '#78716c', margin: 0, lineHeight: 1.7 }}>とにお / TOEIC 900, コード書けない, でもアプリ作った</p>
                    </div>
                    <ProgressBar completed={completedSet.size} total={LESSONS.length} />
                </div>
            </div>

            {/* LESSON LIST */}
            <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '0 16px 40px' : '0 32px 40px' }}>
                <div style={{ maxWidth: 680, margin: '0 auto' }}>
                    {CHAPTERS.map(chapter => {
                        const lessons = grouped.get(chapter.num);
                        if (!lessons || lessons.length === 0) return null;
                        let globalOffset = 0;
                        for (let i = 0; i < LESSONS.length; i++) { if (LESSONS[i].chapter === chapter.num) { globalOffset = i; break; } }
                        return (
                            <div key={chapter.num}>
                                <ChapterHeader chapter={chapter} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {lessons.map((lesson, li) => (
                                        <LessonCard key={lesson.id} lesson={lesson} index={globalOffset + li} isCompleted={completedSet.has(lesson.id)} onOpen={() => openLesson(lesson.id)} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e7e5e4', textAlign: 'center' }}>
                        <p style={{ fontSize: 12, color: '#a8a29e', letterSpacing: '0.06em', margin: 0 }}>toniolab.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
