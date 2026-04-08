'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DEV_KEY = 'tl_dev_auth';
const DEV_VERSION = 'v1';

/* ---- Types ---- */

type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'special';

interface Episode {
    num: number;
    title: string;
    location: string;
    synopsis: string;
    english: string;
    connections: string;
    season: Season;
}

interface Character {
    name: string;
    age: string;
    firstEp: string;
    description: string;
    type: 'regular' | 'recurring' | 'foreign';
}

interface PlotLine {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    beats: string;
}

interface AIBeat {
    ep: number;
    character: string;
    usage: string;
}

/* ---- Data ---- */

const SEASON_META: Record<Season, { label: string; labelJa: string; color: string; range: string }> = {
    spring: { label: 'SPRING', labelJa: '春 -- 出会い', color: '#10B981', range: 'Ep 1-13' },
    summer: { label: 'SUMMER', labelJa: '夏 -- 衝突', color: '#D4AF37', range: 'Ep 14-26' },
    autumn: { label: 'AUTUMN', labelJa: '秋 -- 転機', color: '#F97316', range: 'Ep 27-39' },
    winter: { label: 'WINTER', labelJa: '冬 -- 収束', color: '#3B82F6', range: 'Ep 40-52' },
    special: { label: 'SPECIAL', labelJa: '年末特別編', color: '#8B5CF6', range: 'Ep 49-52' },
};

const CEFR_PROGRESSION = [
    { season: '春 -- 出会い', weeks: '1-13', cefr: 'A1 → A2', skills: '挨拶、注文、道案内、感情の基本、現在形・過去形' },
    { season: '夏 -- 衝突', weeks: '14-26', cefr: 'A2 → B1', skills: '意見、苦情、交渉、物語る、条件文' },
    { season: '秋 -- 転機', weeks: '27-39', cefr: 'B1 → B1+', skills: 'ニュアンス、ユーモア、文化的参照、慣用句' },
    { season: '冬 -- 収束', weeks: '40-52', cefr: 'B1+ → B2', skills: '自然な会話、スラング、感情表現、議論、プレゼン' },
];

const REGULARS: Character[] = [
    { name: 'マスター権藤', age: '78M', firstEp: 'Ep1', description: '居酒屋「のれん」店主。元TOEIC満点講師×12回。なぜ教壇を捨てたか（Ep29で判明）', type: 'regular' },
    { name: 'ユキ', age: '27F', firstEp: 'Ep1', description: '商社営業。TOEIC 620。口が動かない。負けを認められるか。主人公。', type: 'regular' },
    { name: 'タケシ', age: '30M', firstEp: 'Ep5', description: 'IT企業PM。TOEIC 540。笑ってる裏で泣いてる。国際カンファレンス登壇が夢。', type: 'regular' },
    { name: 'リサ', age: '25F', firstEp: 'Ep2', description: '外資コンサル。TOEIC 860。帰国子女なのに完璧じゃない恥。', type: 'regular' },
    { name: 'ケンジ', age: '52M', firstEp: 'Ep3', description: '建設会社部長。TOEIC 480。部下のために昭和のプライドを捨てる。', type: 'regular' },
    { name: 'ミナ', age: '23F', firstEp: 'Ep1', description: '派遣社員。TOEIC 730(L495満点)。天然リスニングモンスター。初めて本気になる。', type: 'regular' },
];

const RECURRING: Character[] = [
    { name: '権藤の娘・サチ', age: '45F', firstEp: 'Ep5', description: '父との距離。のれんを継ぐのか。', type: 'recurring' },
    { name: 'ケンジの娘・ハルカ', age: '20F', firstEp: 'Ep3', description: '大学生。父に英語を教えようとする。', type: 'recurring' },
    { name: 'タケシの後輩・ソウタ', age: '26M', firstEp: 'Ep8', description: '登壇枠を「譲ってもらった」側。罪悪感。', type: 'recurring' },
    { name: 'ユキの後輩・アヤ', age: '24F', firstEp: 'Ep2', description: '帰国子女。ユキの商談を隣で完璧にこなした張本人。', type: 'recurring' },
    { name: '魚屋のゲン', age: '58M', firstEp: 'Ep7', description: '築地。外国人に値段が言えない。ケンジの飲み友達。', type: 'recurring' },
    { name: '古着屋ナオ', age: '32M', firstEp: 'Ep11', description: '下北沢。インスタで海外に売りたい。', type: 'recurring' },
    { name: 'カフェ店員リナ', age: '22F', firstEp: 'Ep1', description: '渋谷。夢は海外のコーヒー農園。', type: 'recurring' },
    { name: 'ゲーセン高校生ユウト', age: '17M', firstEp: 'Ep9', description: '秋葉原。オンラインゲームの英語チャットが唯一の武器。', type: 'recurring' },
    { name: '人力車のショウ', age: '28M', firstEp: 'Ep6', description: '浅草。毎日外国人と喋る。英語は現場で覚えた。', type: 'recurring' },
    { name: '外資OLマリ', age: '29F', firstEp: 'Ep14', description: '品川。英語できるのに日本語の会議で負ける逆パターン。', type: 'recurring' },
    { name: 'コンビニ店長サトウ', age: '45M', firstEp: 'Ep10', description: '新大久保。多国籍バイトを束ねる。', type: 'recurring' },
    { name: '看護師メグミ', age: '34F', firstEp: 'Ep16', description: '外国人患者が増えて困ってる。', type: 'recurring' },
    { name: 'DJ KENT', age: '24M', firstEp: 'Ep12', description: '渋谷のクラブ。音楽で世界とつながりたい。', type: 'recurring' },
    { name: 'フードトラックのアキラ', age: '35M', firstEp: 'Ep19', description: '代々木公園。元料理人。海外出店が夢。', type: 'recurring' },
    { name: '配達員トモヤ', age: '29M', firstEp: 'Ep4', description: '都内どこでも現れる。全員の生活に地味に関わってる。東京の毛細血管。', type: 'recurring' },
    { name: '図書館司書ミホ', age: '40F', firstEp: 'Ep15', description: '千代田区。静かに英語の本を20年読み続けてきた人。', type: 'recurring' },
];

const FOREIGNERS: Character[] = [
    { name: 'Tyler', age: '20M', firstEp: 'Ep13', description: 'アメリカ人留学生。ケンジの会社でインターン。', type: 'foreign' },
    { name: 'Brandon', age: '21M', firstEp: 'Ep13', description: 'Tylerの友達。日本語カタコト。ミナと仲良くなる。', type: 'foreign' },
    { name: 'Rosa', age: '20F', firstEp: 'Ep18', description: 'メキシコ出身。下北沢の古着屋ナオの店でバイト。', type: 'foreign' },
    { name: 'Professor Hayes', age: '55M', firstEp: 'Ep22', description: '大学教授。リサの恩師。言語習得研究者。東京に1年滞在。', type: 'foreign' },
];

const EPISODES: Episode[] = [
    { num: 1, season: 'spring', title: 'ここから始まる', location: '渋谷センター街のカフェ', synopsis: 'ユキがアヤと商談の振り返り。「あの時なんで喋れなかったの？」リナがコーヒーを持ってきて、外国人客に完璧な英語で対応する。ユキ、二重に打ちのめされる。帰り道、路地裏で「のれん」の暖簾を見つける。', english: '挨拶、自己紹介、カフェでの注文', connections: 'Ep13(リナの夢), Ep38(ユキの成長)' },
    { num: 2, season: 'spring', title: '隣の席の帰国子女', location: '品川の商社オフィス + のれん', synopsis: 'ユキの仕事場。アヤが流暢に電話対応してる横で、ユキはメールの返信に30分かけてる。夜、のれんでマスターに愚痴る。「英語なんて嫌い」。隣の席にリサがいる。「あなた、発音はいいのにね」。余計なお世話。', english: 'オフィスの基本表現、電話対応、メール', connections: 'Ep10(リサの弱点), Ep39(リサとユキの関係)' },
    { num: 3, season: 'spring', title: 'パパ、教えてあげようか？', location: 'ケンジの自宅（世田谷）+ 通勤電車', synopsis: 'ケンジがリビングでTOEICの本を開いてる。娘ハルカが帰ってきて「あ、パパ勉強してる！」。教えようとするハルカ、プライドで受け入れられないケンジ。翌朝、山手線でスマホの英語アプリを隠すように開く。', english: '家族の会話、通勤、数字と時間', connections: 'Ep7(ゲンとの愚痴), Ep24(マスターに頭を下げる), Ep42(卒業式)' },
    { num: 4, season: 'spring', title: '東京を走る男', location: '都内各所（配達ルート）', synopsis: '配達員トモヤの1日。朝は築地で魚屋ゲンの荷物、昼は品川のオフィスにユキ宛の書類、夕方は下北沢のナオの店にヴィンテージ服。夜はのれんでビール。東京中を走ってるこの男が、全員をつないでることにまだ誰も気づいてない。', english: '道案内、住所、「ここどこ？」系の基本', connections: '全エピソード（トモヤは東京の毛細血管）' },
    { num: 5, season: 'spring', title: 'のれんの二階', location: '新宿の路地裏・のれん', synopsis: 'マスターの娘サチが久しぶりに店に来る。「お父さん、この店いつまでやるの」。マスターは答えない。二階に誰も使ってない部屋がある。かつて誰かが住んでいた形跡。タケシが初めてのれんに来る。「ビールとTOEICの愚痴、ここでいいですか？」', english: 'レストラン・バーでの会話、頼み方', connections: 'Ep15(サチ再登場), Ep29(二階の秘密), Ep52(のれんの未来)' },
    { num: 6, season: 'spring', title: '浅草で英語を叫ぶ', location: '浅草・雷門前 + 人力車', synopsis: '人力車のショウは毎日外国人を乗せる。「This is Senso-ji, built in 645!」教科書なんか読んだことない。全部現場で覚えた。ケンジがたまたま浅草にいて、ショウの英語を聞いて愕然。「あの兄ちゃん、俺の半分の歳で...」', english: '観光案内、歴史の説明、感嘆表現', connections: 'Ep17(ケンジの変化), Ep33(ショウの夢)' },
    { num: 7, season: 'spring', title: '築地の英語', location: '築地場外市場', synopsis: '魚屋ゲンの朝4時。外国人観光客が「How much is this?」。ゲンは指で値段を示す。20年これでやってきた。でも最近、英語のメニュー表を作りたいと思ってる。夜、ケンジと居酒屋で「俺たち英語なんかいらねえよな」。でも二人とも目が笑ってない。', english: '買い物、値段、数量、市場の表現', connections: 'Ep3(ケンジ), Ep19(ゲンのメニュー), Ep35(ゲンとケンジの変化)' },
    { num: 8, season: 'spring', title: '笑ってるやつが一番泣いてる', location: '六本木のIT企業オフィス + 居酒屋', synopsis: 'タケシの職場。英語の会議でタケシだけ発言できない。後輩ソウタが通訳する。会議後、ソウタが「すみません、出しゃばって」。タケシ「いや、助かった！」満面の笑み。夜、のれんでケンジと「勉強法」で口論。根性 vs 効率。', english: 'ビジネスミーティング基礎、意見の言い方', connections: 'Ep15(プレゼン練習), Ep26(初登壇), Ep35(ソウタと和解)' },
    { num: 9, season: 'spring', title: 'ゲームで覚えた英語', location: '秋葉原のゲーセン + ネットカフェ', synopsis: '高校生ユウトはオンラインゲームで毎晩英語チャットしてる。学校の英語は赤点。でもゲームでは「strat」「nerf」「GG」が飛び交う。ミナがゲーセンにいる（音ゲー目当て）。ユウトの英語を聞いて「え、あんた英語できんの？」「...いや、ゲームだけ」', english: 'スラングの入口、インターネット英語、略語', connections: 'Ep12(ユウト深掘り), Ep22(ミナとHayes), Ep34(ミナの決意)' },
    { num: 10, season: 'spring', title: '完璧の呪い', location: '丸の内の外資コンサル会社 + カフェ', synopsis: 'リサの仕事場。英語の会議はペラペラ。でもTOEIC模試のPart5で3問ミス。「感覚で選んだのに...」。帰り道、カフェでTOEIC本を開いてたら、コンビニ店長サトウが隣に座る。「俺もやってんですよ、TOEIC」。サトウのボロボロの参考書を見て、リサは何も言えなくなる。', english: '文法の細かいニュアンス、フォーマル vs カジュアル', connections: 'Ep2(リサ初登場), Ep18(Rosa), Ep29(マスターとの関係)' },
    { num: 11, season: 'spring', title: 'インスタの向こう側', location: '下北沢の古着屋', synopsis: 'ナオの店。ヴィンテージの目利きは天才的。でも海外バイヤーからのDMが読めない。Google翻訳で返信してたら「Your English is... interesting」と言われた。褒めてない。夜、のれんで「英語ってどうやって勉強すんの」。タケシ「俺に聞くな」。', english: 'SNSの英語、商品説明、褒める・けなす表現', connections: 'Ep18(Rosaがバイトに来る), Ep30(海外出店の話), Ep44' },
    { num: 12, season: 'spring', title: '渋谷の夜、全員がすれ違う', location: '渋谷（スクランブル交差点〜円山町）', synopsis: '金曜の夜の渋谷。DJ KENTのクラブイベント。ユウトが年齢詐称で入ろうとする。リナが仕事帰りに通りかかる。タケシとソウタが二次会で歩いてる。ミナが音楽に引き寄せられる。全員がスクランブル交差点ですれ違う。まだ誰も、この人たちが自分の人生に関わってくるとは知らない。', english: '夜の会話、誘う・断る、音楽の話', connections: '全員が初めて「同じ場所」にいる回。ここからつながりが加速' },
    { num: 13, season: 'spring', title: 'アメリカから来たやつ', location: '早稲田大学周辺 + のれん', synopsis: 'アメリカ人留学生Tylerが東京に到着。友達のBrandonと「Dude, this city is INSANE」。Tylerはケンジの会社でインターンが決まってる。Brandonは自由。のれんにたどり着いたBrandonが、カウンターでミナの隣に座る。「Is this seat taken?」ミナ「...nah, go ahead.」自然すぎる英語にBrandon驚く。', english: '到着、第一印象、驚きの表現、カジュアルな会話', connections: 'Ep3(ケンジの職場), Ep22(Professor Hayes来日), Ep34' },
    { num: 14, season: 'summer', title: '英語ができる人の孤独', location: '品川のタワマン + コンビニ', synopsis: '外資OLマリの話。英語ペラペラ。でも日本語の会議で「空気読めない」と言われる。2つの言語の間で居場所がない。深夜のコンビニでサトウ店長と話す。「私、どっちの言葉も中途半端なのかも」。', english: '感情の複雑な表現、アイデンティティ', connections: 'Ep18(Rosa), Ep28(マリの決断), Ep39(リサとマリ)' },
    { num: 15, season: 'summer', title: 'のれん二階の写真', location: 'のれん + 千代田区の図書館', synopsis: 'サチがまた来る。マスターと口論。「あの二階、いつまで空けとくの」。図書館司書ミホが初登場。静かに英語の小説を読んでる。リサが図書館で偶然ミホに会う。「あなた、英語の本ばかり読んでるのね」。ミホ「...読むだけなら、もう20年」。', english: '読書の話、過去の経験を語る、図書館表現', connections: 'Ep5(二階), Ep29(秘密), Ep36(ミホの変化)' },
    { num: 16, season: 'summer', title: '言葉が届かない夜', location: '都内の総合病院', synopsis: '看護師メグミ。外国人患者が急増。「Where does it hurt?」すら通じない場面。言葉が届かないことが、命に関わる。帰り道、のれんで泣く。マスター「...言葉は、届けようとする力だ。」', english: '医療基礎、体の部位、緊急表現、痛みの伝え方', connections: 'Ep23(メグミ再登場), Ep37(外国人患者との再会)' },
    { num: 17, season: 'summer', title: '画面越しの恐怖', location: 'ケンジの会社（品川）', synopsis: '海外支社とのZoom会議。ケンジの番。画面に映る20人の顔。「Kenji-san, please go ahead.」5秒の沈黙。汗が止まらない。Tylerが隣で小声でフォロー。会議後、ケンジがTylerに「...ありがとう」。初めて英語で。', english: 'Zoom会議、プレゼン基礎、つなぎ表現', connections: 'Ep6(ショウとの対比), Ep24(マスターに頭を下げる), Ep31' },
    { num: 18, season: 'summer', title: '完璧じゃない英語の美しさ', location: '下北沢の古着屋 + 公園', synopsis: 'Rosaがナオの店でバイトを始める。メキシコ訛りの英語。文法はめちゃくちゃ。でも伝わる。客が笑う。Rosaも笑う。リサが店に来て、Rosaの英語を聞いて固まる。「なんで...こんなに伝わるの。文法ボロボロなのに」', english: '多様な英語、アクセント、不完全でも伝わるコミュニケーション', connections: 'Ep10(リサの完璧主義), Ep29, Ep39(リサの変化)' },
    { num: 19, season: 'summer', title: '味を英語にできない', location: '代々木公園（フードトラック）', synopsis: 'フードトラックのアキラ。料理は天才的。でも「umami」以外に味を説明する英語がない。外国人客に「What\'s in this?」と聞かれて「...good stuff」としか答えられない。ゲンが遊びに来て「お前も英語か」「お互いさまだろ」。', english: '食べ物の描写、味の表現、材料・調理法', connections: 'Ep7(ゲン), Ep30(フードフェス), Ep44(アキラの海外)' },
    { num: 20, season: 'summer', title: 'AIってなんだ', location: '六本木のIT企業 + のれん', synopsis: 'タケシが仕事でClaude Codeを使い始める。「これ...英語のドキュメントも読んでくれんの？」。のれんで興奮して話す。ケンジ「AIなんか信用できるか」。ユキ「...でも商談の準備に使えるかも」。マスターは黙って聞いてる。', english: 'テクノロジーの基礎表現、説明する力', connections: 'Ep8(タケシの職場), AI化サブプロット開始' },
    { num: 21, season: 'summer', title: '新大久保の百言語', location: '新大久保', synopsis: 'コンビニ店長サトウの日常。バイトはネパール人、ベトナム人、韓国人。英語が共通語。でも全員の英語が違う。サトウ「英語って1個じゃないんだな」。ミナがたまたま韓国料理を買いに来て、韓国人バイトと韓国語で盛り上がる。', english: '多文化コミュニケーション、世界の英語、簡単な指示', connections: 'Ep10(サトウ), Ep32(サトウの挑戦)' },
    { num: 22, season: 'summer', title: '君の耳は研究対象だ', location: '早稲田大学 + のれん', synopsis: 'Professor Hayesが来日。リサの恩師。言語習得の研究者。Brandonに連れられてのれんに来る。ミナの英語を聞いて「...Excuse me. How did you learn English?」ミナ「Netflix...?」Hayes「Your listening comprehension is... extraordinary. Do you know that?」', english: '学術的な会話、驚きと称賛、経歴の話', connections: 'Ep9(ミナ), Ep13(Hayes伏線), Ep34(ミナの決意)' },
    { num: 23, season: 'summer', title: '電話の向こうの泣き声', location: '新宿駅 + のれん', synopsis: 'ユキが海外クライアントとの商談を任される。嬉しいはず。でも夜、新宿駅のホームでタケシに電話。「無理かも」。タケシ「無理って言ったの初めて聞いた」。のれんに二人で行く。メグミもいる。「私も言葉が届かなくて泣いたよ」。', english: '電話会話、不安の表現、励ます表現', connections: 'Ep16(メグミ), Ep29, Ep38(商談)' },
    { num: 24, season: 'summer', title: '頭を下げた夜', location: 'のれん', synopsis: 'ケンジがマスターに「教えてくれ」と言う。カウンターに頭を下げる。52歳。建設現場の叩き上げ。初めて人に教えを請う。マスター「...何から始めたい？」ケンジ「部下を守る英語」。', english: '丁寧な依頼、感謝、謙遜の表現', connections: 'Ep3, Ep7, Ep8(口論), Ep31, Ep35(和解)' },
    { num: 25, season: 'summer', title: '夏祭りの夜に', location: '神宮外苑の夏祭り', synopsis: '全キャラが夏祭りに集まる。浴衣のリサにHayesが「You look wonderful」。Tylerが焼きそばの屋台で「What IS this?」。ケンジの娘ハルカとユウトが偶然会う（同級生だった）。ナオがRosaに「来てくれたんだ」。夜空の花火の下、全員がそれぞれの想いを抱えてる。', english: 'イベント・祭りの表現、褒める、誘う、感情表現', connections: '全員集合回（Ep12の渋谷と対になる）' },
    { num: 26, season: 'summer', title: 'マイクの前で', location: '渋谷のイベントスペース', synopsis: 'タケシのミニカンファレンス登壇。英語で5分のLT。震える声。スライドが1枚飛ぶ。「Uh... sorry, let me...」会場の隅でソウタが見てる。ボロボロだけど最後まで話しきる。降壇してトイレで泣く。ユキからLINE「見てたよ。かっこよかった」。', english: 'プレゼンテーション、つなぎ表現、質疑応答', connections: 'Ep8(ソウタ), Ep35(和解), Ep45(本番登壇)' },
    { num: 27, season: 'autumn', title: '二学期の風', location: '秋葉原 + 早稲田大学', synopsis: 'ユウトの新学期。英語の授業で突然「online gameで使われるslangs」のプレゼンを自主的にやる。教室が沸く。Hayes教授がそれを聞いて研究室に招く。ミナも呼ばれてる。「2人とも、formal educationの外で英語を身につけた。これは重要なサンプルだ」。', english: 'プレゼン（カジュアル版）、学校表現、スラング→正式英語の変換', connections: 'Ep9, Ep22, Ep34' },
    { num: 28, season: 'autumn', title: '2つの言語の間で', location: '品川 + 羽田空港', synopsis: 'マリが決断する。外資を辞めて、日本語と英語の「橋渡し」をする仕事を探す。羽田で海外から来た旅行者の通訳ボランティアを始める。「やっと両方の言葉が武器になった」。配達員トモヤが羽田で荷物を届けに来てる。', english: 'キャリアの話、決断を伝える、空港表現', connections: 'Ep14(マリ), Ep44(羽田)' },
    { num: 29, season: 'autumn', title: 'のれん、閉店の夜', location: 'のれん', synopsis: 'シリーズの転換点。マスター権藤の秘密が明かされる。かつての教え子が海外赴任先で「先生のスコアのおかげで900取れました。でも一言も話せません」と送ってきた。その教え子は、後に命を落とした。言葉が通じないストレスで心を壊した。権藤は自分の教え方を呪った。教壇を降りた。のれんを開いた。二階の部屋は、その教え子が一時帰国した時に泊まっていた部屋だった。全員が集まっている夜。マスターが初めて全部を話す。', english: '過去を語る（長い物語）、感情表現、後悔と決意', connections: 'Ep1からの全ての伏線が回収される' },
    { num: 30, season: 'autumn', title: '世界に届けたい味', location: '代々木公園（国際フードフェスティバル）', synopsis: 'アキラのフードトラックがフードフェスに出店。隣のブースはRosaのメキシコ料理。ゲンが新鮮な魚を持ってくる。ナオがSNSで世界に発信。初めて英語で「自分の料理のストーリー」を語るアキラ。外国人審査員「This is not just food. This is a story.」', english: '食文化の説明、ストーリーテリング、レビュー表現', connections: 'Ep7(ゲン), Ep19(アキラ), Ep44' },
    { num: 31, season: 'autumn', title: '部下を守った5秒', location: 'ケンジの会社（品川）+ Zoom', synopsis: '海外支社との会議。現地スタッフが日本側の部下を批判。ケンジが5秒黙って、それから英語で言う。「That is not fair.」完璧な文法じゃない。でも全員が黙った。Tylerが隣で小さく拳を握る。', english: '反論、公正さの主張、ビジネス交渉', connections: 'Ep17(Zoomフリーズ), Ep24(マスター), Ep42' },
    { num: 32, season: 'autumn', title: 'コンビニから世界が見える', location: '新大久保のコンビニ', synopsis: 'サトウ店長がバイトたちに英語で朝礼を始める。ボロボロ。でも全員が拍手する。ネパール人バイトが「サトウさん、英語上手になりましたね」。サトウ「お前に言われると泣けるわ」。', english: '職場の指示、多文化チームの会話、励まし', connections: 'Ep10(サトウ), Ep21(新大久保)' },
    { num: 33, season: 'autumn', title: '浅草の夢', location: '浅草 + 成田空港', synopsis: 'ショウが人力車を辞める決意。「海外で人力車やりたい」。無謀。でもショウの英語は実戦で鍛えた本物。成田で出発前にケンジに電話。「おっさん、英語頑張れよ」ケンジ「お前こそ」。2人とも笑ってる。', english: '夢を語る、空港チェックイン、別れの表現', connections: 'Ep6(ショウ), Ep44(再会?)' },
    { num: 34, season: 'autumn', title: '読めない天才の涙', location: '早稲田大学 + ミナのアパート', synopsis: 'ミナがHayesの研究室でリーディングテストを受ける。ボロボロ。495と235の差を突きつけられる。「聞けるのに読めない」。初めて悔しくて泣く。アパートに帰って、初めてTOEICのリーディング本を開く。「...ちゃんとしなきゃ」。', english: '学術的な会話、テスト・評価の表現、決意を語る', connections: 'Ep9, Ep22, Ep48(ミナの成長)' },
    { num: 35, season: 'autumn', title: '根性と効率のビール', location: 'のれん', synopsis: 'ケンジとタケシがカウンターで隣に座る。Ep8以来の口論の続き。でも今回は違う。ケンジ「根性だけじゃダメだった。お前の言う通り」。タケシ「効率だけでもダメだった。おっさんの言う通り」。ビールで乾杯。ソウタがのれんに来る。タケシ「来年のカンファレンス、一緒に出ような」。', english: '和解の表現、認める、約束する', connections: 'Ep8(口論), Ep24, Ep26, Ep45' },
    { num: 36, season: 'autumn', title: '20年分の静けさ', location: '千代田区の図書館 + カフェ', synopsis: 'ミホがリサに英語を教え始める。「読む英語」の達人が「話す英語」のできない自分と向き合う。リサが「ミホさん、なんで20年も黙って読んでたの」。ミホ「...話す相手がいなかっただけ」。', english: '読書の表現、内面を語る、長い文章の読解', connections: 'Ep15(初登場), Ep43(ミホの変化)' },
    { num: 37, season: 'autumn', title: 'Thank youが届いた日', location: '都内の総合病院', synopsis: 'メグミの病棟に、Ep16と同じ外国人患者が再来院。前回は言葉が通じなかった。今回メグミは「Where does it hurt?」の先まで言える。患者が泣きながら「Thank you. Thank you for understanding.」メグミも泣く。', english: '医療英語（中級）、共感の表現、安心させる言葉', connections: 'Ep16, Ep29(マスターの「言葉は届けようとする力」)' },
    { num: 38, season: 'autumn', title: '一人で立つ', location: '品川の商社（会議室）', synopsis: 'ユキの海外クライアント商談。一人。通訳なし。震える手でノートPCを開く。「Good morning. Thank you for taking the time.」完璧じゃない。詰まる。言い直す。でも最後まで一人でやりきる。会議室を出て、廊下で膝から崩れる。アヤが水を持ってくる。「先輩、かっこよかったです」。', english: 'ビジネス商談、プレゼン、交渉、クロージング', connections: 'Ep1(打ちのめされた日), Ep2(アヤ), Ep23(泣いた夜)' },
    { num: 39, season: 'autumn', title: '鎧を脱ぐ', location: '代官山のカフェ + のれん', synopsis: 'リサがマリと話す。2人とも「完璧な英語」の呪いに縛られてた。Rosaが合流。3人で笑いながら、めちゃくちゃな英語で喋る。リサが初めてのれんで「私、Part5の文法、全然わかんないんだよね」と言う。全員がびっくりする。リサが笑う。「ずっと言いたかった」。', english: '弱みを見せる表現、友情、カジュアルな会話', connections: 'Ep2, Ep10, Ep18(Rosa), Ep14(マリ)' },
    { num: 40, season: 'winter', title: 'AIが読んでくれた手紙', location: 'ケンジの自宅 + のれん', synopsis: 'ケンジが海外支社から英語の手紙を受け取る。部下からの感謝状。読めない。ハルカがClaude Codeで翻訳してくれる。内容を知ったケンジが泣く。「...お前のおかげで、俺の英語は上手くなれた」。ハルカ「パパ、それ英語で言ってみて」。', english: '手紙の読み書き、感謝の深い表現、AIツールの活用', connections: 'Ep3, Ep17, Ep31, Ep42' },
    { num: 41, season: 'winter', title: 'クリスマスの約束', location: '恵比寿ガーデンプレイス + 各所', synopsis: 'クリスマスの東京。タケシがソウタと来年のカンファレンスの準備を始める。ナオがRosaと初めて海外バイヤーとビデオ通話する。ユウトがHayesに「大学で言語学やりたい」と言う。DJ KENTが海外のDJとコラボ配信。みんなが次の一歩を踏み出すクリスマス。', english: '約束・計画の表現、将来の話、クリスマス表現', connections: '各キャラの次シーズンへの布石' },
    { num: 42, season: 'winter', title: 'パパの英語', location: 'ハルカの大学（卒業式）', synopsis: 'ケンジがハルカの卒業式で英語のスピーチをする。Tylerが「You should do it, Kenji-san.」短い。たどたどしい。でも最後に「I am proud of you, Haruka. And thank you for teaching me.」ハルカが泣く。会場が泣く。', english: 'スピーチ、親子の感情表現、公式な場での英語', connections: 'Ep3(最初の拒絶), Ep24(頭を下げた), Ep31(部下を守った)' },
    { num: 43, season: 'winter', title: '声に出した20年', location: '千代田区の図書館（朗読イベント）', synopsis: 'ミホが英語の朗読イベントを開く。20年間読んできた本の一節を、声に出して読む。震える声。でも美しい英語。リサが聞きに来てる。「ミホさん、あなたの英語、一番綺麗だった」。ミホ「...やっと、声に出せた」。', english: '朗読、文学表現、感想を述べる', connections: 'Ep15, Ep36' },
    { num: 44, season: 'winter', title: '羽田、出発と到着', location: '羽田空港', synopsis: '複数のストーリーが交差する。ナオがRosaと海外買い付けに出発。アキラが海外フードイベントに招待されて出発。ショウが海外から帰ってくる（Ep33以来）。マリが通訳ボランティアで迎える。配達員トモヤが全員の荷物を運んでる。', english: '空港の全表現、別れと再会、旅の会話', connections: 'Ep28, Ep30, Ep33, Ep4(トモヤ)' },
    { num: 45, season: 'winter', title: '世界に届いた声', location: '国際カンファレンス会場（東京ビッグサイト）', synopsis: 'タケシの国際カンファレンス英語登壇。ソウタが客席にいる。15分のプレゼン。震える声が、途中から止まる。自分の言葉で喋ってる。質疑応答もやりきる。降壇してソウタとハグ。「...やったな」「やったよ」。2人とも泣いてる。', english: 'フルプレゼン、Q&A、プロフェッショナルな会話', connections: 'Ep8, Ep26(ボロボロの初登壇), Ep35' },
    { num: 46, season: 'winter', title: 'のれん、満席', location: 'のれん', synopsis: 'のれんが満席。全キャラが集まってる。でもお祝いじゃない。マスターが「店を閉める」と言い出す。理由は語らない。全員がざわつく。サチが「お父さん...」。ユキが「待ってください。まだ早い」。マスターが微笑む。「...早いか？」', english: '議論、説得、感情的な会話', connections: 'Ep5, Ep15, Ep29, Ep52' },
    { num: 47, season: 'winter', title: '東京の朝', location: '都内各所（全キャラの朝）', synopsis: '各キャラの普通の朝を描く。ユキが英語のニュースを聴きながら出勤。ケンジが電車で英語のメールを打つ。リサが文法書を開いてる（笑いながら）。ミナが英語の小説を読んでる。タケシが海外チームとSlackしてる。全員が「1年前の自分」とは違う朝を過ごしてる。', english: '日常の全表現（1年間の総復習が自然に入る）', connections: 'Ep1との対比。同じ東京、違う自分' },
    { num: 48, season: 'winter', title: 'また来年も', location: '東京タワー展望台 + のれん', synopsis: '大晦日。展望台から東京を見下ろす。誰かが言う。「この街、狭いようで広いな」。夜、のれんで年越し。マスターが言う。「閉めるって言ったの、嘘だ」。全員「は？」。マスター「お前たちが来なくなったら閉める。それまでは開けてる」。乾杯。1年が終わる。英語は完璧じゃない。でも全員が、去年の自分より遠くに来た。', english: '振り返り、未来の話、乾杯・新年の表現', connections: '全エピソードの結末' },
    { num: 49, season: 'special', title: 'トモヤが見た東京', location: '都内配達ルート（総集編的）', synopsis: '配達員トモヤの視点で1年を振り返る。全員の荷物を運んでた男が、全員の成長を一番近くで見てた。「俺、英語はできないけどさ。みんなの顔が変わったのはわかる」。', english: '観察の表現、人を描写する、変化を語る', connections: 'Ep4, 全エピソード' },
    { num: 50, season: 'special', title: '権藤のノート', location: 'のれん二階', synopsis: 'サチがのれんの二階を片付ける。権藤のノートが出てくる。30年分の「教え子の記録」。全員の名前とスコアと、その後どうなったか。最後のページに「のれんの常連たち」のメモ。ユキ、タケシ、ケンジ、リサ、ミナ。スコアの横に「--」。点数じゃ測れない。', english: '記録・日記の表現、回想', connections: 'Ep5, Ep29, Ep46' },
    { num: 51, season: 'special', title: '世界で一番短いスピーチ', location: '各所', synopsis: '各キャラが「自分にとって英語とは」を一言で語る。ユキ「My weapon.」タケシ「My stage.」ケンジ「My pride.」リサ「My real self.」ミナ「My ears found me.」マスター「My second chance.」', english: 'エッセンスを一言で伝える', connections: '全キャラの集大成' },
    { num: 52, season: 'special', title: '春がまた来る', location: '渋谷のカフェ（Ep1と同じ）', synopsis: '1年後。ユキがEp1と同じカフェにいる。リナがコーヒーを持ってくる。外国人客が来る。リナが対応しようとしたら、ユキが先に「Hi, welcome. What can I get you?」リナが驚く。ユキが笑う。「...ここから始まったんだよね」。のれんの暖簾が風に揺れてる。', english: '1年間の全スキルが自然に出る会話', connections: 'Ep1との完全な対比' },
];

const PLOT_LINES: PlotLine[] = [
    { id: 'A', title: 'ユキの1年', subtitle: 'メインストーリー', color: '#D4AF37', beats: 'Ep1で渋谷のカフェでアヤの英語力に打ちのめされる → Ep13でTylerと出会い初めてまともに会話を試みる → Ep20で海外クライアントとの商談を任される → Ep29でマスターの過去を聞いて何かが変わる → Ep38で一人で商談をやり遂げる → Ep48で「負けてもいい、でもやる」' },
    { id: 'B', title: 'タケシの登壇', subtitle: 'サブA', color: '#10B981', beats: 'Ep1でカンファレンスの話を聞く → Ep8で後輩ソウタと気まずい飲み → Ep15で英語プレゼンの練習を始める → Ep26でミニイベントで初登壇、ボロボロ → Ep35でソウタと和解「来年は一緒に出よう」 → Ep45で国際カンファレンスで英語登壇、泣く' },
    { id: 'C', title: 'ケンジの意地', subtitle: 'サブB', color: '#F97316', beats: 'Ep3で娘ハルカに「教えてあげようか」と言われる → Ep7で築地のゲンと「英語なんかいらねえ」と愚痴る → Ep17でZoom会議でフリーズ → Ep24で初めてマスターに「教えてくれ」と頭を下げる → Ep31で海外支社の部下を英語で庇う → Ep42でハルカの卒業式で英語のスピーチ' },
    { id: 'D', title: 'リサの鎧', subtitle: 'サブC', color: '#8B5CF6', beats: 'Ep2で「帰国子女だから余裕」のフリ → Ep10で文法問題を間違えてパニック → Ep18でRosaと出会い「完璧じゃない英語」の美しさを知る → Ep29でマスターの秘密が自分に関係してると知る → Ep39で「完璧じゃなくていい」を受け入れる' },
    { id: 'E', title: 'ミナの覚醒', subtitle: 'サブD', color: '#EC4899', beats: 'Ep1でカフェにいる（まだモブ） → Ep9でゲーセンでユウトと出会う → Ep13でBrandonと意気投合 → Ep22でProfessor Hayesに「君の耳は研究対象レベル」と言われる → Ep34で初めてTOEICのリーディングを本気で勉強する → Ep48で自分の道を見つける' },
    { id: 'F', title: 'マスターの秘密', subtitle: '全体を貫く謎', color: '#EF4444', beats: 'Ep1から小さな伏線 → Ep15でサチが「お父さん、いつまであの店やるの」 → Ep22でHayes教授と権藤が旧知と判明 → Ep29で全てが明かされる → Ep40以降、のれんの未来' },
    { id: 'G', title: '東京のAI化', subtitle: 'Ep20以降で自然に', color: '#06B6D4', beats: 'タケシがClaude Codeを仕事で使い始める → ユキが商談準備にAIを使う → ケンジが「そんなもん信用できるか」 → ミナがAIで読解力を伸ばす → Ep40以降、全員が自分なりにAIを使ってる' },
];

const AI_SUBPLOT: AIBeat[] = [
    { ep: 20, character: 'タケシ', usage: 'Claude Codeで英語ドキュメント読解' },
    { ep: 23, character: 'ユキ', usage: '商談準備にAIで英語の練習相手' },
    { ep: 27, character: 'ユウト', usage: 'AIでゲーム英語→正式英語に変換' },
    { ep: 30, character: 'ナオ', usage: 'AIで商品説明の英語を生成' },
    { ep: 32, character: 'サトウ', usage: 'AIでバイト向けマニュアルを多言語化' },
    { ep: 34, character: 'ミナ', usage: 'AIでリーディング力を鍛える' },
    { ep: 37, character: 'メグミ', usage: 'AIで医療英語を学習' },
    { ep: 40, character: 'ケンジ', usage: 'ハルカがAIで手紙を翻訳' },
    { ep: 47, character: '全員', usage: 'それぞれのやり方でAIを使ってる朝' },
];

const RELATIONSHIP_MAP = `マスター権藤 ── のれんで全員をつなぐ中心点
  |
  +-- サチ(娘) ── Ep29の秘密に関わる
  |
  +-- ユキ ── アヤ(後輩/ライバル) ── 品川オフィス
  |     |
  |     +-- タケシ(戦友) ── ソウタ(後輩) ── 六本木IT
  |
  +-- ケンジ ── ハルカ(娘) ── ユウト(同級生) ── 秋葉原
  |     |
  |     +-- ゲン(飲み友達) ── 築地
  |     +-- Tyler(インターン) ── Brandon(友達) ── ミナ
  |
  +-- リサ ── Prof. Hayes(恩師) ── 早稲田
  |     |
  |     +-- マリ(同じ悩み) ── 品川
  |     +-- Rosa(気づきをくれた人) ── ナオ(古着屋) ── 下北沢
  |
  +-- ミナ ── Brandon(意気投合) ── ユウト(ゲーセン仲間)
  |
  +-- トモヤ(配達員) ── 全員に荷物を届けてる = 東京の毛細血管

医療: メグミ(看護師)
飲食: アキラ(フードトラック), ゲン(築地)
文化: ショウ(浅草), DJ KENT(渋谷), ナオ(下北沢)
教育: Prof. Hayes, ミホ(図書館)
小売: サトウ(コンビニ店長)
配達: トモヤ(全員をつなぐ)`;

/* ---- Components ---- */

function SeasonFilter({ active, onSelect }: { active: Season | 'all'; onSelect: (s: Season | 'all') => void }) {
    const options: (Season | 'all')[] = ['all', 'spring', 'summer', 'autumn', 'winter', 'special'];
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {options.map(s => {
                const isActive = s === active;
                const color = s === 'all' ? '#fff' : SEASON_META[s as Season].color;
                return (
                    <button key={s} onClick={() => onSelect(s)} style={{
                        padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                        letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s',
                        border: `1px solid ${isActive ? color + '66' : '#1a1a1f'}`,
                        background: isActive ? color + '18' : 'transparent',
                        color: isActive ? color : '#555',
                    }}>
                        {s === 'all' ? 'ALL' : SEASON_META[s as Season].label}
                    </button>
                );
            })}
        </div>
    );
}

function EpisodeCard({ ep }: { ep: Episode }) {
    const [open, setOpen] = useState(false);
    const season = SEASON_META[ep.season];
    return (
        <div style={{
            background: '#0f0f13', border: `1px solid ${open ? season.color + '33' : '#1a1a1f'}`,
            borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s',
        }}>
            <button onClick={() => setOpen(!open)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 20px', background: 'none', border: 'none',
                cursor: 'pointer', textAlign: 'left',
            }}>
                <div style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                    background: season.color + '15', border: `1px solid ${season.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: season.color,
                }}>
                    {String(ep.num).padStart(2, '0')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#e5e5e5', marginBottom: 2 }}>
                        {ep.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>{ep.location}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {open && (
                <div style={{ padding: '0 20px 20px', borderTop: `1px solid ${season.color}15` }}>
                    <p style={{ fontSize: 14, color: '#999', lineHeight: 1.9, margin: '16px 0' }}>{ep.synopsis}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 11, color: season.color, background: season.color + '12', border: `1px solid ${season.color}33`, borderRadius: 6, padding: '3px 10px', fontWeight: 600 }}>
                            {ep.english}
                        </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>
                        Connections: {ep.connections}
                    </div>
                </div>
            )}
        </div>
    );
}

function CharacterTable({ title, chars, color }: { title: string; chars: Character[]; color: string }) {
    return (
        <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color, marginBottom: 12 }}>{title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {chars.map(c => (
                    <div key={c.name} style={{
                        background: '#0f0f13', border: '1px solid #1a1a1f', borderRadius: 12,
                        padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start',
                    }}>
                        <div style={{
                            flexShrink: 0, fontSize: 11, color: '#555', background: '#1a1a1f',
                            borderRadius: 6, padding: '3px 8px', fontWeight: 600, minWidth: 40, textAlign: 'center',
                        }}>{c.firstEp}</div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#ccc' }}>{c.name}</span>
                                <span style={{ fontSize: 11, color: '#555' }}>{c.age}</span>
                            </div>
                            <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>{c.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---- Main ---- */

function Tokyo52Dashboard() {
    const [seasonFilter, setSeasonFilter] = useState<Season | 'all'>('all');
    const [section, setSection] = useState<'episodes' | 'characters' | 'plotlines' | 'ai' | 'map'>('episodes');

    const filteredEps = seasonFilter === 'all' ? EPISODES : EPISODES.filter(e => e.season === seasonFilter);

    const sections = [
        { id: 'episodes' as const, label: '52 EPISODES' },
        { id: 'characters' as const, label: 'CHARACTERS' },
        { id: 'plotlines' as const, label: 'PLOT LINES' },
        { id: 'map' as const, label: 'RELATIONSHIP MAP' },
        { id: 'ai' as const, label: 'AI SUBPLOT' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#09090b', color: '#e5e5e5' }}>
            {/* Hero */}
            <div style={{
                padding: '48px 32px 40px', borderBottom: '1px solid #1a1a1f',
                background: 'linear-gradient(165deg, #0f0f1a 0%, #09090b 100%)',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%),radial-gradient(circle at 80% 30%, #EF4444 0%, transparent 50%)' }} />
                <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                    <Link href="/dev" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#555', textDecoration: 'none', letterSpacing: '0.06em', marginBottom: 24 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        DEV
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#D4AF37', background: '#D4AF3712', border: '1px solid #D4AF3733', borderRadius: 6, padding: '4px 12px' }}>BUILDING</span>
                    </div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>
                        Tokyo 52
                    </h1>
                    <p style={{ fontSize: 15, color: '#888', margin: '0 0 4px', lineHeight: 1.7 }}>
                        東京で英語が話せるようになるドラマ
                    </p>
                    <p style={{ fontSize: 13, color: '#555', margin: '0 0 24px', lineHeight: 1.7 }}>
                        52週 x 7日 = 365日。何十人もの人生が東京で絡み合う。見てたら英語ができるようになってた。
                    </p>
                    {/* CEFR progression */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {CEFR_PROGRESSION.map((c, i) => {
                            const colors = ['#10B981', '#D4AF37', '#F97316', '#3B82F6'];
                            return (
                                <div key={i} style={{ background: colors[i] + '10', border: `1px solid ${colors[i]}25`, borderRadius: 10, padding: '10px 16px', minWidth: 180 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: colors[i], letterSpacing: '0.08em', marginBottom: 4 }}>{c.season}</div>
                                    <div style={{ fontSize: 13, color: '#aaa', marginBottom: 2 }}>Week {c.weeks} -- {c.cefr}</div>
                                    <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{c.skills}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Nav */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px 0' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24, borderBottom: '1px solid #1a1a1f', paddingBottom: 16 }}>
                    {sections.map(s => (
                        <button key={s.id} onClick={() => setSection(s.id)} style={{
                            padding: '8px 18px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                            letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
                            border: section === s.id ? '1px solid #D4AF3744' : '1px solid #1a1a1f',
                            background: section === s.id ? '#D4AF3715' : 'transparent',
                            color: section === s.id ? '#D4AF37' : '#555',
                        }}>
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 80px' }}>

                {section === 'episodes' && (
                    <>
                        <SeasonFilter active={seasonFilter} onSelect={setSeasonFilter} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {filteredEps.map(ep => <EpisodeCard key={ep.num} ep={ep} />)}
                        </div>
                    </>
                )}

                {section === 'characters' && (
                    <>
                        <CharacterTable title="REGULAR CAST -- 居酒屋のれん組" chars={REGULARS} color="#D4AF37" />
                        <CharacterTable title="RECURRING -- 東京の住人たち" chars={RECURRING} color="#10B981" />
                        <CharacterTable title="FOREIGN -- 海外からの登場人物" chars={FOREIGNERS} color="#3B82F6" />
                    </>
                )}

                {section === 'plotlines' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {PLOT_LINES.map(pl => (
                            <div key={pl.id} style={{
                                background: '#0f0f13', border: '1px solid #1a1a1f',
                                borderRadius: 14, padding: '20px 24px', position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: pl.color }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: pl.color, letterSpacing: '0.08em' }}>
                                        LINE {pl.id}
                                    </span>
                                    <span style={{ fontSize: 15, fontWeight: 600, color: '#ccc' }}>{pl.title}</span>
                                    <span style={{ fontSize: 12, color: '#555' }}>{pl.subtitle}</span>
                                </div>
                                <p style={{ fontSize: 13.5, color: '#888', lineHeight: 2.0, margin: 0 }}>{pl.beats}</p>
                            </div>
                        ))}
                    </div>
                )}

                {section === 'map' && (
                    <div style={{
                        background: '#0f0f13', border: '1px solid #1a1a1f',
                        borderRadius: 14, padding: '24px 28px',
                    }}>
                        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: '#D4AF37', marginBottom: 16 }}>
                            CHARACTER RELATIONSHIP MAP
                        </div>
                        <pre style={{
                            fontSize: 13, color: '#999', lineHeight: 1.8, margin: 0,
                            fontFamily: "'SF Mono', 'Fira Code', monospace",
                            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                        }}>
                            {RELATIONSHIP_MAP}
                        </pre>
                    </div>
                )}

                {section === 'ai' && (
                    <>
                        <div style={{ fontSize: 13, color: '#888', lineHeight: 1.8, marginBottom: 24 }}>
                            Ep20でタケシがClaude Codeを導入。以降、各キャラが自然にAIを活用し始める。
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {AI_SUBPLOT.map(a => (
                                <div key={a.ep} style={{
                                    background: '#0f0f13', border: '1px solid #1a1a1f',
                                    borderRadius: 12, padding: '14px 20px',
                                    display: 'flex', alignItems: 'center', gap: 16,
                                }}>
                                    <div style={{
                                        flexShrink: 0, width: 44, height: 44, borderRadius: 10,
                                        background: '#06B6D415', border: '1px solid #06B6D433',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 13, fontWeight: 700, color: '#06B6D4',
                                    }}>
                                        {String(a.ep).padStart(2, '0')}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#ccc', marginBottom: 2 }}>{a.character}</div>
                                        <div style={{ fontSize: 13, color: '#777' }}>{a.usage}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

/* ---- Export with auth ---- */

export default function Tokyo52Page() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem(DEV_KEY) === DEV_VERSION) setIsAuthed(true);
        setIsLoading(false);
    }, []);

    if (isLoading) return <div style={{ minHeight: '100vh', background: '#09090b' }} />;
    if (!isAuthed) {
        if (typeof window !== 'undefined') window.location.href = '/dev';
        return null;
    }
    return <Tokyo52Dashboard />;
}
