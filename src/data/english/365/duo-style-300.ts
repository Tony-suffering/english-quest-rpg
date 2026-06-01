/**
 * DUOスタイル 300例文 ── 根拠(頻度) × 物語(居酒屋6人) × 正確性(絶対)
 * ============================================================================
 * 方法論と根拠: docs/duo-style-300-methodology.md
 * 生成: Workflow(izakaya-duo-300, 61エージェント = Plan1 + Write30 + 敵対的Verify30)。
 *       検証エージェントが各話の正確性/単体価値/primary含有/誤用混入/重複を厳格チェックし修正済み。
 *
 * 三重の制約: ①正確性[最優先] en は常に正しい自然なネイティブ英語。誤用はドリル(en)に入れず pitfall(❌→✅)のみ。
 *            ②根拠 各文が高価値項目を運ぶ(targets/出典付き)。③物語 6人の薄い連続劇＋1文最大価値。
 *
 * カバレッジ(reinforcement除く): 894項目 / source {"PHaVE":197,"TSL":146,"NGSL":415,"CEFR":107,"英検":29} / type {"phrasal":194,"collocation":158,"word":314,"idiom":155,"function":73}。
 * 構成: 30話 × 10文 = 300。season: "権藤の居酒屋を舞台に、ユキ・タケシ・リサ・健二・ミナの5人が仕事と人生の山谷を持ち寄る一年。前半(#1-12)は電話・会議・クレーム・現場・出張など日々の実務トラブルで頻出句動詞とビジネス語を固め、中盤(#13-25)は昇進・転職・退職・失敗など人生の節目で語彙を深め、終盤(#26-30)はAI・働き方・価値観・教育を英検準1級的に議論。最終話で権藤が引退をほのめかし、各人が次の一歩へ踏み出す。薄い縦糸は「働くこと/生きること、そのうまい付き合い方」を権藤の箴言が静かに締める。"
 */

export type CharId = 'master' | 'yuki' | 'takeshi' | 'lisa' | 'kenji' | 'mina';

export interface TargetItem {
    item: string;
    type: 'word' | 'phrasal' | 'collocation' | 'idiom' | 'function';
    source: 'NGSL' | 'TSL' | 'PHaVE' | 'CEFR' | '英検';
    rank?: string;
    reinforcement?: boolean;
}

export interface DuoSentence {
    no: number;
    episode: number;
    beat: string;
    character: CharId;
    en: string;            // 常に正しい・自然・学ぶ価値のある文。間違いは pitfall にのみ置く。
    ja: string;
    targets: TargetItem[];
    pitfall?: { wrong: string; why: string };
    note?: string;
}

export interface EpisodeMeta { no: number; title: string; }
export const DUO_EPISODES: EpisodeMeta[] = [
    {
        "no": 1,
        "title": "金曜の電話、また納期がずれる"
    },
    {
        "no": 2,
        "title": "会議が押して、誰も帰れない"
    },
    {
        "no": 3,
        "title": "クレーム対応、リサの神対応"
    },
    {
        "no": 4,
        "title": "健二の現場、人手が足りない"
    },
    {
        "no": 5,
        "title": "ミナの推し、字幕なしで聞き取れた"
    },
    {
        "no": 6,
        "title": "権藤、値段の話をする"
    },
    {
        "no": 7,
        "title": "メールの返信が来ない"
    },
    {
        "no": 8,
        "title": "出張の段取り"
    },
    {
        "no": 9,
        "title": "新人が辞めそう"
    },
    {
        "no": 10,
        "title": "プレゼン前夜"
    },
    {
        "no": 11,
        "title": "予算が削られた"
    },
    {
        "no": 12,
        "title": "システム障害"
    },
    {
        "no": 13,
        "title": "昇進の打診"
    },
    {
        "no": 14,
        "title": "ミナの面接"
    },
    {
        "no": 15,
        "title": "権藤の昔話、独立した日"
    },
    {
        "no": 16,
        "title": "契約のトラブル"
    },
    {
        "no": 17,
        "title": "チームの不和"
    },
    {
        "no": 18,
        "title": "健二、退職を考える"
    },
    {
        "no": 19,
        "title": "リサの転職相談"
    },
    {
        "no": 20,
        "title": "プロジェクト立ち上げ"
    },
    {
        "no": 21,
        "title": "値上げの説明"
    },
    {
        "no": 22,
        "title": "ミナの遅刻"
    },
    {
        "no": 23,
        "title": "取引先との会食"
    },
    {
        "no": 24,
        "title": "残業と働き方"
    },
    {
        "no": 25,
        "title": "失敗から学ぶ"
    },
    {
        "no": 26,
        "title": "AIは仕事を奪うか"
    },
    {
        "no": 27,
        "title": "在宅 vs 出社"
    },
    {
        "no": 28,
        "title": "お金より時間か"
    },
    {
        "no": 29,
        "title": "教育は何のためか"
    },
    {
        "no": 30,
        "title": "権藤の店じまい"
    }
];

export const DUO_STYLE_300: DuoSentence[] = [
    {
        "no": 1,
        "episode": 1,
        "character": "yuki",
        "beat": "納期延期の電話を引きずって、ドアを開けるなり吐き捨てるユキ",
        "en": "They put off the launch again, and now I'm the one who has to break the news to the client.",
        "ja": "あいつらまたローンチを延期しやがった。で、それをクライアントに伝える役は私なわけ。",
        "targets": [
            {
                "item": "put off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "break the news",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "launch",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 2,
        "episode": 1,
        "character": "lisa",
        "beat": "カウンターで、外資の現場感覚から納期の重さを説くリサ",
        "en": "In B2B, missing a deadline doesn't just cost money — it quietly kills the trust you spent years building.",
        "ja": "B2Bじゃ、納期を落とすのは金を失うだけじゃない。何年もかけて築いた信頼を静かに殺すの。",
        "targets": [
            {
                "item": "deadline",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "cost money",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "build trust",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 3,
        "episode": 1,
        "character": "takeshi",
        "beat": "自分のPM失敗談を笑い話にして場を和ませるタケシ",
        "en": "My boss emailed at midnight, so I'll get back to him first thing tomorrow before he assumes I'm ignoring him.",
        "ja": "上司が夜中にメールしてきたから、無視してると思われる前に明日いちばんに返信するよ。",
        "targets": [
            {
                "item": "get back to (someone)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "first thing",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "assume",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I'll get back him tomorrow.",
            "why": "❌ get back him → ✅ get back to him。get back は自動詞句で、相手の前に必ず to が要る。"
        }
    },
    {
        "no": 4,
        "episode": 1,
        "character": "kenji",
        "beat": "現場が止まった建設部長が、部下をかばいながら焦るケンジ",
        "en": "The site's been at a standstill all day, so please send me the revised drawings as soon as possible.",
        "ja": "現場は一日中止まったままなんだ。だから修正図面をできるだけ早く送ってくれ。",
        "targets": [
            {
                "item": "as soon as possible",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "at a standstill",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "revised",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 5,
        "episode": 1,
        "character": "takeshi",
        "beat": "延期をどう乗り切るか、前向きに代替案を探すタケシ",
        "en": "If we can't ship everything by Friday, let's come up with a plan to deliver the core features first.",
        "ja": "金曜までに全部出せないなら、まずコア機能を先に届ける案をひねり出そう。",
        "targets": [
            {
                "item": "come up with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "ship",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "core features",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 6,
        "episode": 1,
        "character": "lisa",
        "beat": "取引先への連絡の作法を、実務目線で指南するリサ",
        "en": "Rather than canceling, just propose a new date and offer to reschedule the call for early next week.",
        "ja": "キャンセルするより、新しい日程を提案して、来週頭に通話をリスケしようと申し出るほうがいい。",
        "targets": [
            {
                "item": "reschedule",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "propose",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "offer to (do)",
                "type": "collocation",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 7,
        "episode": 1,
        "character": "yuki",
        "beat": "延期の本当の理由を、皮肉まじりに見抜くユキ",
        "en": "They didn't run into a technical problem; they just overpromised and now they're scrambling to cover it.",
        "ja": "技術的な問題にぶつかったんじゃない。盛りすぎた約束をして、今その尻拭いに必死なだけ。",
        "targets": [
            {
                "item": "run into (a problem)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "overpromise",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "scramble to (do)",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 8,
        "episode": 1,
        "character": "mina",
        "beat": "電話の英語が早すぎたと、聞き取りの感想をこぼすミナ",
        "en": "I'm afraid I missed half of what the client said because he was talking way too fast on the phone.",
        "ja": "クライアントが電話でめっちゃ早口だったから、言ってたことの半分聞き逃しちゃったかも。",
        "targets": [
            {
                "item": "I'm afraid (that)",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "miss (what someone said)",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "way too",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 9,
        "episode": 1,
        "character": "kenji",
        "beat": "急な変更を職人に頼まねばならず、申し訳なさをにじませるケンジ",
        "en": "I hate asking the crew to work overtime on short notice, but the client moved the inspection up a week.",
        "ja": "急な話で職人に残業を頼むのは気が引けるんだが、クライアントが検査を一週間前倒しにしてな。",
        "targets": [
            {
                "item": "on short notice",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "work overtime",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "move up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 10,
        "episode": 1,
        "character": "master",
        "beat": "権藤がグラスを拭きながら、締めの本質的な一言を放つ",
        "en": "A delay you sort out honestly today earns you more trust than a deadline you barely meet by lying.",
        "ja": "今日、正直に片づけた遅延は、嘘でぎりぎり守った納期より多くの信頼を生む。",
        "targets": [
            {
                "item": "sort out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "earn trust",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "meet a deadline",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 11,
        "episode": 2,
        "character": "takeshi",
        "beat": "会議室を出てきたタケシが、開口一番にこぼす。",
        "en": "The meeting ran over by forty minutes, and we still didn't get through half the agenda.",
        "ja": "会議は40分も押したのに、それでもアジェンダの半分も消化できなかった。",
        "targets": [
            {
                "item": "run over (time)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "agenda",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "get through",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 12,
        "episode": 2,
        "character": "yuki",
        "beat": "ユキが酒を片手に、会議の構造的な問題を皮肉る。",
        "en": "We spent twenty minutes going over numbers everyone had already read in the deck the night before.",
        "ja": "全員が前夜に資料で目を通してた数字を、20分かけて確認したんだよ。",
        "targets": [
            {
                "item": "go over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "deck (slides)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "the night before",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 13,
        "episode": 2,
        "character": "lisa",
        "beat": "リサが外資での実務的な会議運営を引き合いに出す。",
        "en": "In my last company, if you couldn't wrap up your point in two minutes, the chair just moved you to next week.",
        "ja": "前の会社じゃ、要点を2分でまとめられなかったら、議長に翌週送りにされたよ。",
        "targets": [
            {
                "item": "wrap up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "point (argument)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "chair (of a meeting)",
                "type": "word",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 14,
        "episode": 2,
        "character": "kenji",
        "beat": "ケンジが、現場で板挟みになる部下を思いやって語る。",
        "en": "Somebody always brings up a new issue right when we're about to close, and my guys end up stuck there till eight.",
        "ja": "終わりかけになると必ず誰かが新しい議題を持ち出して、結局うちの連中は8時まで足止めだ。",
        "targets": [
            {
                "item": "bring up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "end up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "be about to",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 15,
        "episode": 2,
        "character": "lisa",
        "beat": "リサが、会議が長引く本当の原因を実務目線で指摘する。",
        "en": "Half the time the meeting runs long because nobody's on the same page about what we're actually deciding.",
        "ja": "会議が長引く半分は、結局何を決めるのか全員の認識が揃ってないからなんだよね。",
        "targets": [
            {
                "item": "on the same page",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "run long",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "half the time",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 16,
        "episode": 2,
        "character": "yuki",
        "beat": "ユキが、上司が話を脱線させがちな点をぼやく。",
        "en": "I asked him to keep his update brief, and somehow he turned it into a fifteen-minute lecture on company history.",
        "ja": "報告は手短にって頼んだのに、なぜか会社の歴史を15分も語り出した。",
        "targets": [
            {
                "item": "keep (something) brief",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "update (report)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "turn into",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 17,
        "episode": 2,
        "character": "takeshi",
        "beat": "タケシが、自分の過去の司会の失敗を笑い話にして前向きに締める。",
        "en": "To sum up, the project's on track, we're slightly over budget, and I'll send the action items by tonight.",
        "ja": "まとめると、プロジェクトは順調、予算はちょっとオーバー、アクションアイテムは今夜中に送ります。",
        "targets": [
            {
                "item": "to sum up",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "on track",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "over budget",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "To summary, the project's on track.",
            "why": "❌ \"To summary\" は名詞を動詞句の位置に置く誤り。✅ 締めの定型句は \"To sum up,\" または \"In summary,\"。\"to sum up\" は to不定詞で正しい。"
        }
    },
    {
        "no": 18,
        "episode": 2,
        "character": "mina",
        "beat": "ミナが、議事録を取らされた愚痴をカジュアルにこぼす。",
        "en": "They made me take the minutes, but everyone was talking over each other, so I just gave up halfway.",
        "ja": "議事録を取らされたんだけど、みんな同時にしゃべるから途中で諦めちゃった。",
        "targets": [
            {
                "item": "minutes (of a meeting)",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "talk over each other",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "give up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ],
        "pitfall": {
            "wrong": "They made me take the minute.",
            "why": "❌ 議事録の意味では常に複数形 \"minutes\"。✅ 単数 \"minute\" は「分」になり別の意味。動詞は \"take the minutes\"。"
        }
    },
    {
        "no": 19,
        "episode": 2,
        "character": "kenji",
        "beat": "ケンジが、決まらない議題をいつまでも引きずる会議に苛立つ。",
        "en": "Look, if we can't settle this today, let's just move on and put it back on next week's agenda.",
        "ja": "なあ、今日決められないなら、もう先に進めて来週の議題に戻そうじゃないか。",
        "targets": [
            {
                "item": "move on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "settle (a matter)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "agenda",
                "type": "word",
                "source": "TSL",
                "reinforcement": true
            }
        ]
    },
    {
        "no": 20,
        "episode": 2,
        "character": "master",
        "beat": "権藤が、カウンターの奥から静かに本質を突く。",
        "en": "A meeting that can't end on time is usually one where no one decided what it was for.",
        "ja": "時間通りに終われない会議ってのは、たいてい誰もその目的を決めなかった会議だ。",
        "targets": [
            {
                "item": "end on time",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "what (something) is for",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "usually",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 21,
        "episode": 3,
        "character": "lisa",
        "beat": "リサが、怒鳴り込んできた客への第一声をどう設計するか実演する。",
        "en": "When you deal with an angry customer, the first thing you do is listen, not defend yourself.",
        "ja": "怒っている客に対応するとき、最初にやるべきは弁明じゃなくて、まず聞くことなの。",
        "targets": [
            {
                "item": "deal with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "angry customer",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "defend yourself",
                "type": "collocation",
                "source": "NGSL",
                "rank": "2000"
            }
        ]
    },
    {
        "no": 22,
        "episode": 3,
        "character": "lisa",
        "beat": "リサが、責任を認める一言で空気が変わると説明する。",
        "en": "I sincerely apologize for the inconvenience this has caused you.",
        "ja": "このたびはご不便をおかけし、心よりお詫び申し上げます。",
        "targets": [
            {
                "item": "apologize for",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "inconvenience",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "sincerely",
                "type": "word",
                "source": "NGSL",
                "rank": "2500"
            }
        ]
    },
    {
        "no": 23,
        "episode": 3,
        "character": "kenji",
        "beat": "ケンジが、現場で激高した客をなだめた泥臭い経験を語る。",
        "en": "I had to calm him down before we could even talk about a solution.",
        "ja": "解決策の話を始める前に、まずあの人を落ち着かせなきゃならなかったんだ。",
        "targets": [
            {
                "item": "calm down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "solution",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "before we could even",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 24,
        "episode": 3,
        "character": "yuki",
        "beat": "ユキが、クレームは贈り物だというリサの考えを皮肉混じりに要約する。",
        "en": "Honestly, a complaint is just feedback wearing an ugly face.",
        "ja": "正直さ、クレームなんて醜い顔をしたフィードバックってだけよ。",
        "targets": [
            {
                "item": "complaint",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "feedback",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "honestly",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 25,
        "episode": 3,
        "character": "lisa",
        "beat": "リサが、謝るだけでなく埋め合わせの行動を示すのが鍵だと教える。",
        "en": "Saying sorry isn't enough; you have to make up for the mistake with action.",
        "ja": "ごめんと言うだけじゃ足りない。行動でミスの埋め合わせをしなきゃ。",
        "targets": [
            {
                "item": "make up for",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "mistake",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "isn't enough",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 26,
        "episode": 3,
        "character": "takeshi",
        "beat": "タケシが、客に返金を約束しすぎて上司に怒られた失敗談を語る。",
        "en": "I offered him a full refund on the spot, and my boss nearly killed me.",
        "ja": "その場でフル返金を申し出ちゃって、上司に殺されかけたよ。",
        "targets": [
            {
                "item": "refund",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "on the spot",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "offer",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I offered him to a full refund.",
            "why": "offer は「offer 人 物」の二重目的語型。to は不要。✅ I offered him a full refund."
        }
    },
    {
        "no": 27,
        "episode": 3,
        "character": "lisa",
        "beat": "リサが、共感を示す決まり文句を、上から目線にならない形で教える。",
        "en": "I completely understand how frustrating this must be for you.",
        "ja": "これがどれほどご不快か、痛いほどよく分かります。",
        "targets": [
            {
                "item": "I completely understand",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "frustrating",
                "type": "word",
                "source": "NGSL",
                "rank": "2000"
            },
            {
                "item": "must be",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 28,
        "episode": 3,
        "character": "lisa",
        "beat": "リサが、即答できない場面では調査を約束して時間を稼ぐと説明する。",
        "en": "Let me look into the issue and get back to you by tomorrow morning.",
        "ja": "その件を調べて、明日の朝までに折り返しご連絡します。",
        "targets": [
            {
                "item": "look into",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "get back to",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "issue",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 29,
        "episode": 3,
        "character": "master",
        "beat": "権藤が、対応の本質を一言で締める。",
        "en": "A professional takes responsibility for the problem, not just the blame.",
        "ja": "プロってのは、責めを負うだけじゃなく、問題そのものに責任を取るもんだ。",
        "targets": [
            {
                "item": "take responsibility for",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "blame",
                "type": "word",
                "source": "NGSL",
                "rank": "2500"
            },
            {
                "item": "professional",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 30,
        "episode": 3,
        "character": "mina",
        "beat": "ミナが、保留中に客をどう待たせるかというリサの一言を聞き取って復唱する。",
        "en": "In the meantime, here's a small voucher to thank you for your patience.",
        "ja": "それまでの間、お待ちいただいたお礼にこちらのささやかなクーポンをどうぞ。",
        "targets": [
            {
                "item": "in the meantime",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "patience",
                "type": "word",
                "source": "NGSL",
                "rank": "2500"
            },
            {
                "item": "voucher",
                "type": "word",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 31,
        "episode": 4,
        "character": "kenji",
        "beat": "健二がビールをあおりながら現場の人手不足を切り出す",
        "en": "We've been short-staffed on site all month, and I'm running myself ragged just to keep the schedule from slipping.",
        "ja": "今月はずっと現場が人手不足でな、工程が遅れないようにするだけで自分をすり減らしてるんだ。",
        "targets": [
            {
                "item": "short-staffed",
                "type": "collocation",
                "source": "TSL",
                "rank": "core",
                "reinforcement": false
            },
            {
                "item": "run oneself ragged",
                "type": "idiom",
                "source": "CEFR",
                "rank": "C1"
            },
            {
                "item": "keep something from doing",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 32,
        "episode": 4,
        "character": "kenji",
        "beat": "工期が押している現状を健二が打ち明ける",
        "en": "If we fall behind on the foundation work this week, the whole project gets pushed back a month.",
        "ja": "今週、基礎工事で遅れたら、プロジェクト全体が一か月後ろにずれ込むんだよ。",
        "targets": [
            {
                "item": "fall behind",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "push back",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "foundation",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 33,
        "episode": 4,
        "character": "takeshi",
        "beat": "タケシが自分のプロジェクトでチームを動かした失敗談を前向きに語る",
        "en": "When my team was drowning last quarter, I asked everyone to pitch in for a week, and honestly it saved the launch.",
        "ja": "前四半期にうちのチームが溺れかけてたとき、一週間みんなに手伝ってって頼んだんだ。正直、それでローンチが救われたよ。",
        "targets": [
            {
                "item": "pitch in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "launch",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "quarter",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I asked everyone to pitch in the work.",
            "why": "❌pitch in the work →✅pitch in（自動詞）。pitch in は目的語を直接取らず単独で「協力する/手伝う」。手伝う対象は pitch in with/on で示す。"
        }
    },
    {
        "no": 34,
        "episode": 4,
        "character": "lisa",
        "beat": "リサがネイティブ目線で人員と業務量のバランスを指摘する",
        "en": "With half the crew gone, there's simply no way the rest can keep up with the same deadlines.",
        "ja": "作業員が半分抜けた状態じゃ、残りのメンバーが同じ納期に追いつけるわけがないわよ。",
        "targets": [
            {
                "item": "keep up with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "crew",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "there's no way",
                "type": "function",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 35,
        "episode": 4,
        "character": "yuki",
        "beat": "ユキが酒で毒舌に上層部を皮肉る",
        "en": "Management keeps piling on the workload, then acts surprised when good people burn out and quit.",
        "ja": "上はどんどん業務量を積み上げといて、優秀な人が燃え尽きて辞めると驚いたふりをするのよね。",
        "targets": [
            {
                "item": "workload",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "pile on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "burn out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 36,
        "episode": 4,
        "character": "takeshi",
        "beat": "タケシが無理に仕事を抱え込んだ反省を語る",
        "en": "My mistake was taking on three projects at once just to look reliable to the boss.",
        "ja": "俺の失敗は、上司に頼れるやつだと思われたくて、一度に三つのプロジェクトを引き受けたことだよ。",
        "targets": [
            {
                "item": "take on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "reliable",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "at once",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 37,
        "episode": 4,
        "character": "kenji",
        "beat": "健二が部下の様子を気にかけながらプレッシャーを口にする",
        "en": "My guys have been under a lot of pressure lately, so I try not to let the stress show on my face.",
        "ja": "うちの連中は最近ずっと相当なプレッシャーを抱えててな、だから俺は自分の顔にストレスを出さないようにしてるんだ。",
        "targets": [
            {
                "item": "under pressure",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "let something show",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "lately",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 38,
        "episode": 4,
        "character": "mina",
        "beat": "ミナが派遣先で先輩のシフトを代わった話をカジュアルに",
        "en": "One of the senior staff was out sick, so I covered for her at the front desk for two whole days.",
        "ja": "先輩の一人が病欠してたから、二日間まるまる受付で代わりに入ってあげたんですよ。",
        "targets": [
            {
                "item": "cover for (someone)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "out sick",
                "type": "collocation",
                "source": "CEFR",
                "rank": "B1"
            },
            {
                "item": "front desk",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 39,
        "episode": 4,
        "character": "lisa",
        "beat": "リサが残業文化のビジネス実務的な問題を指摘する",
        "en": "Relying on unpaid overtime to hit targets isn't a strategy; it's just borrowing time you'll have to pay back later.",
        "ja": "目標を達成するためにサービス残業に頼るのは戦略じゃないわ。あとで返さなきゃいけない時間を借りてるだけよ。",
        "targets": [
            {
                "item": "overtime",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "hit a target",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "rely on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 40,
        "episode": 4,
        "character": "master",
        "beat": "権藤が黙って聞いたあと、グラスを拭きながら核心を刺す一言",
        "en": "Just tell your men to hang in there a little longer, and make sure you're the first one they see in the morning.",
        "ja": "あんたの部下に、もう少しだけ踏ん張れと伝えればいい。そして朝、あんたが一番に顔を見せる人間でいることだ。",
        "targets": [
            {
                "item": "hang in there",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "make sure",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "a little longer",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 41,
        "episode": 5,
        "character": "mina",
        "beat": "ミナが推しのライブ配信を字幕なしで観ていた話を切り出す",
        "en": "I finally figured out what my favorite idol was saying without any subtitles last night.",
        "ja": "昨日の夜、ついに推しが何て言ってるのか字幕なしで聞き取れたんです。",
        "targets": [
            {
                "item": "figure out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "without any subtitles",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "favorite",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 42,
        "episode": 5,
        "character": "mina",
        "beat": "どうやってリスニング力をつけたか説明する",
        "en": "I picked up most of my listening just from watching live streams every single day.",
        "ja": "リスニングはほとんど、毎日ライブ配信を観てるだけで身についたんです。",
        "targets": [
            {
                "item": "pick up (a language)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "live stream",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "every single day",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 43,
        "episode": 5,
        "character": "yuki",
        "beat": "ユキがミナの自慢に皮肉まじりにツッコむ",
        "en": "Honestly, I can barely catch what they say even when the audio is crystal clear.",
        "ja": "正直、音がめちゃくちゃクリアでも、私はほとんど聞き取れないんだけど。",
        "targets": [
            {
                "item": "catch (what someone said)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "barely",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "crystal clear",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I can barely listen what they say.",
            "why": "listen は自動詞で目的語を直接取れない。「聞き取る」の意味では catch か understand を使う。listen を使うなら listen to が必要。"
        }
    },
    {
        "no": 44,
        "episode": 5,
        "character": "mina",
        "beat": "オンラインのファン仲間とよく交流していると話す",
        "en": "I hang out with a bunch of overseas fans in the chat, so I'm used to fast English now.",
        "ja": "チャットで海外のファンとよくつるんでるんで、速い英語にはもう慣れてます。",
        "targets": [
            {
                "item": "hang out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "a bunch of",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "be used to",
                "type": "collocation",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 45,
        "episode": 5,
        "character": "takeshi",
        "beat": "タケシが自分も配信で勉強しようとして失敗した話をする",
        "en": "I'm really into gaming streams, but I just laughed the whole time instead of actually learning anything.",
        "ja": "ゲーム配信が大好きなんだけど、結局ずっと笑ってるだけで何も学ばなかったんだよね。",
        "targets": [
            {
                "item": "be into (something)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "instead of",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "actually",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 46,
        "episode": 5,
        "character": "lisa",
        "beat": "リサがネイティブ目線でミナのやり方を評価する",
        "en": "That's actually how immersion works; you sort of absorb the rhythm before you understand the words.",
        "ja": "それがまさにイマージョンの仕組みなの。単語を理解する前に、なんとなくリズムを吸収しちゃうのよ。",
        "targets": [
            {
                "item": "sort of",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "absorb",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "immersion",
                "type": "word",
                "source": "英検"
            }
        ]
    },
    {
        "no": 47,
        "episode": 5,
        "character": "mina",
        "beat": "推しの最新情報を追いかけ続けていると話す",
        "en": "I keep track of every comeback and interview, so my ears just naturally got faster over time.",
        "ja": "カムバックもインタビューも全部追ってるんで、耳が自然と速くなっていったんです。",
        "targets": [
            {
                "item": "keep track of",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "naturally",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "over time",
                "type": "collocation",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 48,
        "episode": 5,
        "character": "kenji",
        "beat": "ケンジが部下の若手も同じように動画で学んでいると感心する",
        "en": "By the way, my youngest staff member learned the same trick and now he handles our foreign clients alone.",
        "ja": "ところでさ、うちの一番若いやつも同じコツを覚えて、今じゃ海外の取引先を一人で対応してるんだよ。",
        "targets": [
            {
                "item": "by the way",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "handle",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "client",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 49,
        "episode": 5,
        "character": "lisa",
        "beat": "リサが聞き取りとビジネス実務の落とし穴を指摘する",
        "en": "Catching casual slang is one thing, but in a meeting you still need to confirm what the client meant.",
        "ja": "カジュアルなスラングを聞き取るのと、会議で取引先の意図を確認するのは別の話よ。",
        "targets": [
            {
                "item": "is one thing, but",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "confirm",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "casual",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 50,
        "episode": 5,
        "character": "master",
        "beat": "権藤が締めの一言で本質を刺す",
        "en": "You don't memorize a language; you end up absorbing it from the people you genuinely want to understand.",
        "ja": "言葉は暗記するもんじゃない。本気で理解したい相手から、いつの間にか吸収するもんだ。",
        "targets": [
            {
                "item": "end up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "memorize",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "genuinely",
                "type": "word",
                "source": "英検"
            }
        ]
    },
    {
        "no": 51,
        "episode": 6,
        "character": "master",
        "beat": "権藤が、昔TOEIC講師になる前に勤めた商社での交渉を回想して切り出す。",
        "en": "Early in my career, I learned that you don't win a deal by crushing the other side; you negotiate until both of you can walk away satisfied.",
        "ja": "若い頃に学んだんだ。相手を叩き潰して契約は勝ち取れない。交渉ってのは、両者が満足して帰れるところまで詰めることだ。",
        "targets": [
            {
                "item": "negotiate",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "walk away",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "deal",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 52,
        "episode": 6,
        "character": "lisa",
        "beat": "リサが外資の実務目線で、価格交渉の基本姿勢を解説する。",
        "en": "When the gap is too wide, I don't dig in my heels. I offer to meet them halfway and see if they're willing to move too.",
        "ja": "差が大きすぎるときは、私は意地を張らない。歩み寄りを提案して、相手も動く気があるか探るの。",
        "targets": [
            {
                "item": "meet halfway",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "dig in one's heels",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "be willing to",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 53,
        "episode": 6,
        "character": "yuki",
        "beat": "ユキが商社営業の皮肉な観察として、値引きを渋る相手の本音を見抜く。",
        "en": "He kept saying the price was final, but I could tell he'd come down a little if I just stayed quiet and let him sweat.",
        "ja": "彼はずっと「これが最終価格だ」って言ってたけど、こっちが黙って焦らせれば少しは値下げするって読めてたわ。",
        "targets": [
            {
                "item": "come down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "final",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "I could tell",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 54,
        "episode": 6,
        "character": "takeshi",
        "beat": "タケシが、海外ベンダーとの契約で焦って失敗した話を笑い話にする。",
        "en": "I panicked and accepted their first offer on the spot, so of course it never worked out in our favor.",
        "ja": "焦って先方の最初の提示をその場でのんじゃって。そりゃ当然、うちに有利にはまとまらなかったよ。",
        "targets": [
            {
                "item": "work out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "on the spot",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "in one's favor",
                "type": "collocation",
                "source": "CEFR"
            }
        ],
        "pitfall": {
            "wrong": "it never worked out in our flavor",
            "why": "「有利に」は in one's favor。flavor(味)との混同は典型的なスペル/発音由来の誤り。正しくは favor。"
        }
    },
    {
        "no": 55,
        "episode": 6,
        "character": "lisa",
        "beat": "リサが、値引きを引き出す現実的な交渉テクニックを共有する。",
        "en": "If you want a real discount, never ask for one outright. Bundle two orders together and let them offer it themselves.",
        "ja": "本気で値引きが欲しいなら、ストレートに頼んじゃダメ。発注を二つまとめて、相手から提示させるのよ。",
        "targets": [
            {
                "item": "discount",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "outright",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "bundle together",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 56,
        "episode": 6,
        "character": "kenji",
        "beat": "ケンジが建設現場の下請け交渉で、ここだけは譲れなかった泥臭い場面を語る。",
        "en": "I gave them a break on the schedule, but I stuck to my number on safety gear. You can't cut corners there.",
        "ja": "工期は譲ってやった。けど安全装備の金額だけは譲らなかった。あそこで手を抜くわけにはいかねえんだ。",
        "targets": [
            {
                "item": "stick to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "cut corners",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "give someone a break",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 57,
        "episode": 6,
        "character": "takeshi",
        "beat": "タケシが、うまくいった案件を振り返って前向きに総括する。",
        "en": "In the end, we both gave up something and got something, so it turned into a genuine win-win.",
        "ja": "最終的にはお互い何かを譲って、何かを得た。だから本当の意味でのウィンウィンになったんだ。",
        "targets": [
            {
                "item": "win-win",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "give up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "in the end",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 58,
        "episode": 6,
        "character": "yuki",
        "beat": "ユキが、相手のごり押しに対して限界を引いた瞬間を鋭く語る。",
        "en": "I'm flexible on the delivery date, but when it comes to the margin, that's where I draw the line.",
        "ja": "納期については融通きかせるけど、利益率の話になったら、そこが私の譲れない一線よ。",
        "targets": [
            {
                "item": "draw the line",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "when it comes to",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "flexible",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 59,
        "episode": 6,
        "character": "mina",
        "beat": "ミナが、海外ドラマで覚えた交渉フレーズを聞き取って素朴に披露する。",
        "en": "In a show I watched, the buyer cut him off and said, \"Let's skip the small talk and get to the bottom line.\"",
        "ja": "見てたドラマで、バイヤーが相手をさえぎって「世間話は抜きにして、要は結局いくらなの、って話に入りましょう」って言ってました。",
        "targets": [
            {
                "item": "bottom line",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "cut off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "small talk",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 60,
        "episode": 6,
        "character": "master",
        "beat": "権藤が締めの一言として、交渉の本質を箴言にまとめる。",
        "en": "A good deal is built on give and take; if one side leaves the table empty-handed, it'll come back to bite you later.",
        "ja": "いい取引ってのは、譲り合いの上に成り立つ。片方が手ぶらで帰ったら、それは後で必ず自分に跳ね返ってくる。",
        "targets": [
            {
                "item": "give and take",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "come back to bite you",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "empty-handed",
                "type": "word",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 61,
        "episode": 7,
        "character": "yuki",
        "beat": "返信のない取引先に苛立ち、最初の催促を打つユキ",
        "en": "I sent the quote three days ago, so I'm going to follow up with a polite nudge before this whole deal stalls.",
        "ja": "見積もりを送って三日経つから、この案件がまるごと止まる前に、丁寧なひと押しでフォローアップするつもり。",
        "targets": [
            {
                "item": "follow up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "quote",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "stall",
                "type": "word",
                "source": "CEFR"
            }
        ],
        "note": "follow up = 進捗を確認する/催促する。a polite nudge は催促の自然な口語。"
    },
    {
        "no": 62,
        "episode": 7,
        "character": "lisa",
        "beat": "ネイティブ目線で「返信する」の正しい言い方を指摘",
        "en": "When you reply to a client's email, answer every question they raised in one go so they don't have to chase you for the rest.",
        "ja": "クライアントのメールに返信するときは、相手が挙げた質問に一度で全部答えること。残りをまた追いかけさせないために。",
        "targets": [
            {
                "item": "reply to",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "raise (a question)",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "in one go",
                "type": "idiom",
                "source": "CEFR"
            }
        ],
        "pitfall": {
            "wrong": "reply his email",
            "why": "reply は自動詞なので前置詞 to が必須。reply to his email が正。reply に直接目的語は付けられない。"
        }
    },
    {
        "no": 63,
        "episode": 7,
        "character": "takeshi",
        "beat": "以前メールを放置されて失注した失敗談を語るタケシ",
        "en": "Honestly, I should have reached out a week earlier, but I assumed no news was good news and lost the contract.",
        "ja": "正直、一週間早く連絡を取りに行くべきだった。でも『便りがないのは良い知らせ』だと思い込んで、契約を失ったんだ。",
        "targets": [
            {
                "item": "reach out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "assume",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "contract",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "reach out = 自分から連絡を取る。no news is good news の崩しを assume と組み合わせ。"
    },
    {
        "no": 64,
        "episode": 7,
        "character": "kenji",
        "beat": "昭和の建設部長が、若手に電話で詰めろと泥臭く助言",
        "en": "If a supplier goes quiet on a deadline, I get in touch with them directly by phone instead of waiting for an email that never comes.",
        "ja": "納期で業者が黙り込んだら、来ないメールを待つより、俺は電話で直接連絡を取るね。",
        "targets": [
            {
                "item": "get in touch with",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "supplier",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "deadline",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "get in touch with = ～と連絡を取る。go quiet（黙り込む）も実務的。"
    },
    {
        "no": 65,
        "episode": 7,
        "character": "mina",
        "beat": "添付ファイルが開けず返信できなかった天然ミナ",
        "en": "The reason I never replied is that the attachment wouldn't open on my phone, so I genuinely couldn't read the file.",
        "ja": "私が一度も返信しなかった理由は、添付ファイルがスマホで開かなくて、ほんとにファイルが読めなかったからなんです。",
        "targets": [
            {
                "item": "attachment",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "genuinely",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "reason ... is that",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "note": "attachment = 添付ファイル。the reason ... is that ~ は説明の定型構文。"
    },
    {
        "no": 66,
        "episode": 7,
        "character": "lisa",
        "beat": "返信が来ない原因はメール転送漏れだと分析するリサ",
        "en": "Nine times out of ten, an email goes unanswered simply because nobody forwards it to the person who actually makes the call.",
        "ja": "十中八九、メールに返信が来ないのは、単に誰も、実際に決める人へそれを転送しないからなのよ。",
        "targets": [
            {
                "item": "forward (an email)",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "nine times out of ten",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "make the call",
                "type": "idiom",
                "source": "CEFR"
            }
        ],
        "note": "forward = メールを転送する。nine times out of ten = ほぼ毎回。make the call = （最終的な）決定を下す。"
    },
    {
        "no": 67,
        "episode": 7,
        "character": "takeshi",
        "beat": "催促メールで上司をCCに入れ角が立った経験を笑い話に",
        "en": "I made the mistake of cc'ing his boss on the first reminder, and suddenly a routine follow-up felt like an escalation.",
        "ja": "最初の催促で彼の上司をCCに入れるミスをして、ただの定例フォローが急にクレーム沙汰みたいになっちゃったよ。",
        "targets": [
            {
                "item": "cc (someone)",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "escalation",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "make the mistake of",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I cc to his boss",
            "why": "cc は他動詞として人を直接目的語に取る: cc his boss / cc someone on an email。cc to someone は不自然。"
        }
    },
    {
        "no": 68,
        "episode": 7,
        "character": "yuki",
        "beat": "丁寧だが期限を匂わせる二度目の催促文を口にするユキ",
        "en": "Could you confirm the revised figures at your earliest convenience, as our pricing is only valid until Friday?",
        "ja": "修正後の数字を、お手すきの折にできるだけ早くご確認いただけますか。弊社の価格は金曜まで有効ですので。",
        "targets": [
            {
                "item": "at your earliest convenience",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "confirm",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "valid until",
                "type": "collocation",
                "source": "CEFR"
            }
        ],
        "note": "at your earliest convenience = ビジネス丁寧表現『お手すき次第早めに』。期限を添えて圧をかけるのが実務。"
    },
    {
        "no": 69,
        "episode": 7,
        "character": "kenji",
        "beat": "決裁者を巻き込めと部下に助言する建設部長",
        "en": "Next time, loop in the decision-maker from the start so the request doesn't sit in some junior's inbox for a week.",
        "ja": "次は最初から決裁者を巻き込んどけ。そうすりゃ依頼が一週間も若手の受信箱で眠ることもない。",
        "targets": [
            {
                "item": "loop (someone) in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "decision-maker",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "inbox",
                "type": "word",
                "source": "TSL"
            }
        ],
        "note": "loop someone in = （メール等で）関係者を情報共有の輪に入れる。sit in an inbox（放置される）も自然。"
    },
    {
        "no": 70,
        "episode": 7,
        "character": "master",
        "beat": "権藤が締めの本質的な一言で会話を閉じる",
        "en": "A reminder chases a reply; touching base earns one, so check in before the silence starts, not after.",
        "ja": "催促は返信を追いかけるだけだ。だが折に触れ連絡を取れば、返信は向こうから来る。沈黙が始まる前に様子を見ておけ、後ではなく。",
        "targets": [
            {
                "item": "touch base",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "reminder",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "check in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ],
        "note": "touch base = （短く）連絡を取り合う/近況確認する。check in（様子を確認する）と対比して本質を刺す締め。"
    },
    {
        "no": 71,
        "episode": 8,
        "character": "takeshi",
        "beat": "タケシが来週の海外出張の手配に着手し、まずフライトを押さえる。",
        "en": "I booked a direct flight to Singapore to avoid a long layover.",
        "ja": "長い乗り継ぎを避けたかったから、シンガポール行きの直行便を予約したよ。",
        "targets": [
            {
                "item": "book (a flight)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "layover",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "direct flight",
                "type": "collocation",
                "source": "CEFR"
            },
            {
                "item": "avoid",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 72,
        "episode": 8,
        "character": "lisa",
        "beat": "リサが帰国子女目線で空港での実務を助言する。",
        "en": "Check in online the night before so you can skip the counter and head straight to security.",
        "ja": "前の晩にオンラインでチェックインしておけば、カウンターを飛ばして直接保安検査に行けるよ。",
        "targets": [
            {
                "item": "check in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "skip",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "head straight to",
                "type": "collocation",
                "source": "CEFR"
            },
            {
                "item": "security (airport)",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "Check in to the flight online",
            "why": "❌ check in to the flight → ✅ check in for the flight / check in online。フライトに対しては前置詞 for を使うのが自然で、to は不自然。"
        }
    },
    {
        "no": 73,
        "episode": 8,
        "character": "takeshi",
        "beat": "タケシが現地の取引先とのミーティングを段取りする。",
        "en": "I set up a meeting with the local team for the morning after I land, so the trip stays productive.",
        "ja": "着いた翌朝に現地チームとのミーティングを組んだから、出張がムダにならないんだ。",
        "targets": [
            {
                "item": "set up (a meeting)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "land (arrive by plane)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "productive",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I made a meeting with the local team.",
            "why": "❌ make a meeting → ✅ set up / arrange a meeting。会議は make ではなく set up や arrange でセッティングする。"
        }
    },
    {
        "no": 74,
        "episode": 8,
        "character": "kenji",
        "beat": "英語が苦手な健二が、経費の扱いを部下に念押しする。",
        "en": "Keep every receipt, or the company won't reimburse you for those meals.",
        "ja": "レシートは全部取っとけ。じゃないと、その食事代は会社が払い戻してくれないぞ。",
        "targets": [
            {
                "item": "reimburse",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "receipt",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "meal",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "The company won't pay back you for those meals.",
            "why": "❌ pay back you → ✅ reimburse you / pay you back。pay back は語順が pay you back で、ビジネスの経費精算には reimburse が自然。"
        }
    },
    {
        "no": 75,
        "episode": 8,
        "character": "yuki",
        "beat": "ユキが経費精算のルールに皮肉を飛ばす。",
        "en": "Anything over the daily limit comes out of your own pocket, so don't expense that fancy dinner.",
        "ja": "日当の上限を超えた分は自腹だから、その豪華なディナーを経費で落とそうとするなよ。",
        "targets": [
            {
                "item": "expense",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "come out of one's own pocket",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "daily limit",
                "type": "collocation",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 76,
        "episode": 8,
        "character": "lisa",
        "beat": "リサが、フライト手配後の旅程の詰めを請け負う。",
        "en": "Forward me your full itinerary so I can double-check the connections before you take off.",
        "ja": "旅程の全部を私に転送して。出発する前に乗り継ぎを再確認しておくから。",
        "targets": [
            {
                "item": "itinerary",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "forward (send on)",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "double-check",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "take off (plane departs)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ],
        "pitfall": {
            "wrong": "Send me your full schedule of the trip",
            "why": "❌ schedule of the trip → ✅ itinerary。出張・旅行の『移動と予定の一覧』はビジネスでは itinerary が定番。schedule でも通じるが旅程の意味では itinerary が自然。"
        }
    },
    {
        "no": 77,
        "episode": 8,
        "character": "mina",
        "beat": "天然なミナが、空港送迎の手配をカジュアルに確認する。",
        "en": "Someone from the office is supposed to pick me up at the airport, right? I don't want to figure out the trains alone.",
        "ja": "会社の誰かが空港まで迎えに来てくれるんですよね？一人で電車調べるのイヤなんで。",
        "targets": [
            {
                "item": "pick up (at the airport)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "be supposed to",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "figure out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 78,
        "episode": 8,
        "character": "takeshi",
        "beat": "タケシが帰りの送迎の段取りを請け合う。",
        "en": "I'll drop you off at the airport on my way home, so you won't have to lug your bags onto the train.",
        "ja": "帰りがけに空港まで送ってくよ。そうすれば荷物を電車まで引きずらずに済むだろ。",
        "targets": [
            {
                "item": "drop off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "on one's way home",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "lug",
                "type": "word",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 79,
        "episode": 8,
        "character": "yuki",
        "beat": "ユキが時差ボケ対策を毒舌まじりに助言する。",
        "en": "Don't schedule anything serious for day one; the jet lag will wreck you no matter how tough you think you are.",
        "ja": "初日に大事な予定は入れるな。自分がどんなにタフだと思ってても、時差ボケにやられるから。",
        "targets": [
            {
                "item": "jet lag",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "wreck (exhaust)",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "no matter how",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 80,
        "episode": 8,
        "character": "master",
        "beat": "出張前の段取りを、寡黙なマスターが一言で説く。",
        "en": "Iron out every detail before you fly, and the trip itself takes care of itself.",
        "ja": "発つ前に細部を全部詰めておけ。そうすりゃ出張そのものは勝手に回る。",
        "targets": [
            {
                "item": "iron out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "take care of itself",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "detail",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "iron out =(問題・細部を)詰める/解決する。会議・段取りで頻出の句動詞。"
    },
    {
        "no": 81,
        "episode": 9,
        "character": "yuki",
        "beat": "新人がもう辞めたいと漏らしたと聞いて、ユキが状況を要約する。",
        "en": "Apparently the new hire wants to quit already, just three weeks in.",
        "ja": "どうやら新人はもう辞めたいらしい。入って三週間しか経ってないのに。",
        "targets": [
            {
                "item": "quit",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "new hire",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "apparently",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 82,
        "episode": 9,
        "character": "kenji",
        "beat": "建設部長の健二が、自分が引き留めに行くと申し出る。",
        "en": "Let me talk him out of it before he hands in his resignation.",
        "ja": "あいつが辞表を出す前に、俺が思いとどまらせてみるよ。",
        "targets": [
            {
                "item": "talk (someone) out of",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "hand in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "resignation",
                "type": "word",
                "source": "TSL"
            }
        ],
        "pitfall": {
            "wrong": "talk him out from it",
            "why": "❌ talk him out from it → ✅ talk him out OF it。「思いとどまらせる」は前置詞 of で固定。from は使わない。"
        }
    },
    {
        "no": 83,
        "episode": 9,
        "character": "mina",
        "beat": "派遣のミナが、新人が健二を慕っている様子を伝える。",
        "en": "He actually looks up to you, so he'll probably open up if you ask.",
        "ja": "あの子、健二さんのこと結構尊敬してるから、聞けばたぶん本音を話すと思いますよ。",
        "targets": [
            {
                "item": "look up to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "open up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "probably",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 84,
        "episode": 9,
        "character": "takeshi",
        "beat": "IT PMのタケシが、自分も新人時代に投げ出しかけた失敗談を語る。",
        "en": "I nearly gave up in my first month too, but I'm glad I didn't.",
        "ja": "俺も最初の一ヶ月で投げ出しかけたよ。でも辞めなくて本当によかった。",
        "targets": [
            {
                "item": "give up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "nearly",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "be glad",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 85,
        "episode": 9,
        "character": "lisa",
        "beat": "外資マーケのリサが、若手が燃え尽きる原因を実務目線で分析する。",
        "en": "New grads burn out fast when they take on too much without any support.",
        "ja": "新卒って、サポートもないのに抱え込みすぎると、あっという間に燃え尽きるのよ。",
        "targets": [
            {
                "item": "burn out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "take on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "support",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 86,
        "episode": 9,
        "character": "lisa",
        "beat": "リサが、辞める一人が職場全体の士気に波及する点を指摘する。",
        "en": "One person leaving can really hurt the whole team's morale.",
        "ja": "一人辞めるだけで、チーム全体の士気が一気に下がることもあるのよ。",
        "targets": [
            {
                "item": "morale",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "the whole team",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "hurt",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 87,
        "episode": 9,
        "character": "kenji",
        "beat": "健二が新人を励まし、最初の半年を耐えるよう諭す。",
        "en": "Just stick with it for six months, and the work will start to make sense.",
        "ja": "とにかく半年やり抜いてみろ。そうすりゃ仕事の筋が見えてくる。",
        "targets": [
            {
                "item": "stick with it",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "make sense",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "work",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 88,
        "episode": 9,
        "character": "yuki",
        "beat": "ユキが、自分も転職を一度迷った経験を皮肉まじりに明かす。",
        "en": "I had second thoughts about switching jobs too, but I stuck it out.",
        "ja": "私も転職をためらった時期があったけど、結局踏みとどまったわ。",
        "targets": [
            {
                "item": "have second thoughts",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "switch jobs",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "stick it out",
                "type": "idiom",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 89,
        "episode": 9,
        "character": "mina",
        "beat": "ミナが、新人がまだ職場に馴染めていないだけだと擁護する。",
        "en": "Give him time to settle in; he hasn't even gotten used to the place yet.",
        "ja": "馴染む時間をあげましょうよ。あの子、まだ職場に慣れてもいないんだから。",
        "targets": [
            {
                "item": "settle in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "get used to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "give (someone) time",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 90,
        "episode": 9,
        "character": "master",
        "beat": "権藤が締めに、人が辞め続ける職場の本質を一言で突く。",
        "en": "High turnover isn't a people problem; it's a sign the place itself is broken.",
        "ja": "離職率が高いのは人の問題じゃない。職場そのものが壊れてるという合図だ。",
        "targets": [
            {
                "item": "turnover (staff)",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "a sign that",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "broken",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 91,
        "episode": 10,
        "character": "lisa",
        "beat": "プレゼン前夜、スライドを最終チェックしている",
        "en": "Let me go through the slides one more time and make sure the numbers add up.",
        "ja": "スライドをもう一度通しで確認して、数字のつじつまが合ってるか確かめさせて。",
        "targets": [
            {
                "item": "go through",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "make sure",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "add up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ],
        "note": "go through = (資料などを)ひと通り目を通す。add up = (数字の)つじつまが合う"
    },
    {
        "no": 92,
        "episode": 10,
        "character": "lisa",
        "beat": "重要な数字をどう見せるか考えている",
        "en": "I'll highlight the key figures in red so the client can grasp them at a glance.",
        "ja": "重要な数字を赤で目立たせて、クライアントが一目で把握できるようにするわ。",
        "targets": [
            {
                "item": "highlight",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "at a glance",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "grasp",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "highlight = 強調する/目立たせる。at a glance = 一目で"
    },
    {
        "no": 93,
        "episode": 10,
        "character": "master",
        "beat": "権藤がリサのスライドの弱点を静かに指摘する",
        "en": "If I may point out one thing, your conclusion contradicts the data on the previous slide.",
        "ja": "一つだけ指摘させてもらうと、君の結論は前のスライドのデータと矛盾している。",
        "targets": [
            {
                "item": "point out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "contradict",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "if I may",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "note": "point out = 指摘する。if I may = 失礼ながら(丁寧な前置き)"
    },
    {
        "no": 94,
        "episode": 10,
        "character": "takeshi",
        "beat": "タケシがリサのリハーサルを手伝うと申し出る",
        "en": "Walk me through your pitch as if I were the client, and I'll tell you where you lose me.",
        "ja": "僕をクライアントだと思ってプレゼンを一通り説明してみて、どこで話を見失うか教えるから。",
        "targets": [
            {
                "item": "walk (someone) through",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "pitch",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "as if",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "note": "walk someone through = 順を追って説明する。pitch = 売り込みのプレゼン",
        "pitfall": {
            "wrong": "Walk me through to your pitch",
            "why": "❌ through to ではなく ✅ walk me through your pitch。through の直後に目的語が来る"
        }
    },
    {
        "no": 95,
        "episode": 10,
        "character": "yuki",
        "beat": "ユキが酒を飲みながら聴衆について毒づく",
        "en": "To be honest, half the audience just wants to check their phones and go home early.",
        "ja": "正直言って、聴衆の半分はスマホをいじって早く帰りたいだけよ。",
        "targets": [
            {
                "item": "to be honest",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "audience",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "go home early",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "to be honest = 正直なところ。audience = 聴衆"
    },
    {
        "no": 96,
        "episode": 10,
        "character": "lisa",
        "beat": "競合との差別化をどう出すか考えている",
        "en": "What really makes our proposal stand out is the after-sales support no rival offers.",
        "ja": "うちの提案が際立つ最大の理由は、どの競合も出していないアフターサポートよ。",
        "targets": [
            {
                "item": "stand out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "proposal",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "rival",
                "type": "word",
                "source": "TSL"
            }
        ],
        "note": "stand out = 際立つ/目立つ。rival = 競合相手"
    },
    {
        "no": 97,
        "episode": 10,
        "character": "mina",
        "beat": "ミナが緊張をほぐすコツを天然に提案する",
        "en": "You should crack a little joke at the start to break the ice with the audience.",
        "ja": "最初にちょっとした冗談を言って、聴衆の緊張をほぐすといいよ。",
        "targets": [
            {
                "item": "break the ice",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "crack a joke",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "audience",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "break the ice = 場の緊張をほぐす。crack a joke = 冗談を言う"
    },
    {
        "no": 98,
        "episode": 10,
        "character": "kenji",
        "beat": "昭和の建設部長がリサを不器用に励ます",
        "en": "You've put in the hours, so just stay calm and you'll nail it tomorrow.",
        "ja": "これだけ時間をかけて準備したんだ、落ち着いていけば明日はバッチリ決まるさ。",
        "targets": [
            {
                "item": "nail it",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "put in the hours",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "stay calm",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "nail it = 見事に成功させる。put in the hours = (努力に)時間を注ぐ"
    },
    {
        "no": 99,
        "episode": 10,
        "character": "takeshi",
        "beat": "タケシが自分の過去のプレゼン失敗を笑い話にする",
        "en": "I once froze up on stage and forgot my whole pitch, so trust me, you'll be fine.",
        "ja": "僕なんて舞台で固まってプレゼンを丸ごと忘れたことがあるから、君なら大丈夫だって。",
        "targets": [
            {
                "item": "freeze up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "on stage",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "trust me",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "note": "freeze up = (緊張で)固まる。on stage = 舞台上で",
        "pitfall": {
            "wrong": "I froze up in the stage",
            "why": "❌ in the stage ではなく ✅ on stage。舞台の上は前置詞 on"
        }
    },
    {
        "no": 100,
        "episode": 10,
        "character": "master",
        "beat": "権藤が締めの本質的な助言を与える",
        "en": "To sum up, a great closing line matters more than a flashy opening, so end with conviction.",
        "ja": "要するに、派手な出だしより締めの一言が肝心だ。確信を持って締めくくれ。",
        "targets": [
            {
                "item": "sum up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "matter",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "conviction",
                "type": "word",
                "source": "TSL"
            }
        ],
        "note": "sum up = 要約する/まとめると。conviction = 確信"
    },
    {
        "no": 101,
        "episode": 11,
        "character": "yuki",
        "beat": "上層部から予算カットの通達が来た直後、ユキが状況を要約する",
        "en": "Management just told us to cut back on travel and entertainment, so half my client dinners are gone.",
        "ja": "上が出張と接待を削れって言ってきたから、クライアントとの会食の半分が消えたわ。",
        "targets": [
            {
                "item": "cut back on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "entertainment",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "client",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 102,
        "episode": 11,
        "character": "kenji",
        "beat": "建設部長の健二が、来期の部署予算が縮小されたと愚痴る",
        "en": "Our department budget got slashed by twenty percent, and nobody bothered to explain why.",
        "ja": "うちの部の予算が二割もカットされたのに、誰も理由を説明しようとしないんだ。",
        "targets": [
            {
                "item": "budget",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "slash",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "department",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 103,
        "episode": 11,
        "character": "lisa",
        "beat": "外資マーケのリサが、削減分が何に使われているのか問い直す",
        "en": "Marketing alone accounts for nearly a third of the spending they want to cut.",
        "ja": "削りたがってる支出の三分の一近くを、マーケティングだけで占めてるのよ。",
        "targets": [
            {
                "item": "account for",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "spending",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "nearly",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 104,
        "episode": 11,
        "character": "takeshi",
        "beat": "IT PMのタケシが、欲しかったツールを諦めた話をする",
        "en": "We simply can't afford the new software license this quarter, so we're stuck with the old one.",
        "ja": "今期は新しいソフトのライセンスなんて到底買えないから、古いやつで我慢するしかないんだ。",
        "targets": [
            {
                "item": "afford",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "license",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "quarter",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "We can't afford to the new software license.",
            "why": "afford の後の目的語が名詞のときは to を付けない。to が入るのは afford to do（動詞）のときだけ。"
        }
    },
    {
        "no": 105,
        "episode": 11,
        "character": "master",
        "beat": "権藤が、節約そのものより向き合い方を諭す",
        "en": "When times get tough, everyone has to tighten their belt, but panic spends more than patience.",
        "ja": "厳しい時は誰もが財布の紐を締めるしかない。だが慌てる方が、辛抱するより金を食うものだ。",
        "targets": [
            {
                "item": "tighten one's belt",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "tough",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "patience",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 106,
        "episode": 11,
        "character": "yuki",
        "beat": "ユキが、削減の前に数字を見ろと皮肉る",
        "en": "Before they touch our budget, they should look at why revenue dropped in the first place.",
        "ja": "予算に手をつける前に、そもそもなんで売上が落ちたのかを見るべきでしょ。",
        "targets": [
            {
                "item": "revenue",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "drop",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "in the first place",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 107,
        "episode": 11,
        "character": "takeshi",
        "beat": "タケシが、自分のプロジェクトの収支ラインを説明する",
        "en": "If we land just two more contracts, the project will finally break even by March.",
        "ja": "あと二件契約を取れれば、このプロジェクトも三月でようやくトントンになるんだ。",
        "targets": [
            {
                "item": "break even",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "contract",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "land",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 108,
        "episode": 11,
        "character": "mina",
        "beat": "派遣のミナが、消耗品が尽きたと軽く報告する",
        "en": "We've completely run out of printer toner, and finance won't approve a new order.",
        "ja": "プリンターのトナーが完全に切れちゃって、経理が新しい注文を承認してくれないんです。",
        "targets": [
            {
                "item": "run out of",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "approve",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "order",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 109,
        "episode": 11,
        "character": "kenji",
        "beat": "健二が、削られた予算で部下たちが苦労している現場を語る",
        "en": "With overtime cut, some of my younger guys are struggling to make ends meet.",
        "ja": "残業が削られて、若い連中の何人かは生活費をやりくりするのに苦労してるんだ。",
        "targets": [
            {
                "item": "make ends meet",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "overtime",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "struggle",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 110,
        "episode": 11,
        "character": "lisa",
        "beat": "リサが、削減の本当の理由をビジネス目線で言い当てる",
        "en": "The truth is the whole division has been in the red for three straight quarters.",
        "ja": "本当のところ、その部門は三期連続で赤字続きだったってことよ。",
        "targets": [
            {
                "item": "in the red",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "division",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "straight",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 111,
        "episode": 12,
        "character": "takeshi",
        "beat": "朝、本番サーバーが落ちたとPMのタケシが第一報を入れる",
        "en": "The whole production server broke down around 9 a.m., so we're scrambling to figure out what triggered the outage.",
        "ja": "午前9時ごろに本番サーバーが丸ごとダウンしたので、何が原因で障害が起きたのか必死で突き止めようとしてるんだ。",
        "targets": [
            {
                "item": "break down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "scramble",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "outage",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "trigger",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "break down=機械・システムが故障して止まる。outageは障害・停電の名詞。"
    },
    {
        "no": 112,
        "episode": 12,
        "character": "lisa",
        "beat": "リサが最初に確認すべき手順をビジネス目線で指示する",
        "en": "Before we touch anything, make sure the customer data is fully backed up to an off-site server.",
        "ja": "何かに手をつける前に、顧客データが社外のサーバーに完全にバックアップされていることを確認して。",
        "targets": [
            {
                "item": "back up (data)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "off-site",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "make sure",
                "type": "function",
                "source": "NGSL"
            }
        ],
        "note": "back up (data)=データのバックアップを取る。名詞はbackup、動詞はback up。"
    },
    {
        "no": 113,
        "episode": 12,
        "character": "kenji",
        "beat": "建設部長ケンジがIT音痴ながら現場感覚で大胆な提案をする",
        "en": "In my day we'd just shut the whole thing down and turn it back on, but I guess it's not that simple anymore.",
        "ja": "俺の時代なら全部シャットダウンして電源入れ直すだけだったが、今はもうそう単純じゃないんだろうな。",
        "targets": [
            {
                "item": "shut down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "turn back on",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "in my day",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "shut down=完全に電源を切る/停止する。in my day=俺の時代では(昭和おじさんの定番)。"
    },
    {
        "no": 114,
        "episode": 12,
        "character": "mina",
        "beat": "派遣のミナが画面が固まった瞬間をカジュアルに報告する",
        "en": "My screen totally froze and then the app just crashed on me right in the middle of a transaction.",
        "ja": "画面が完全に固まって、取引の真っ最中にアプリがいきなり落ちちゃったんですよ。",
        "targets": [
            {
                "item": "crash",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "freeze",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "in the middle of",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "crash=ソフトやシステムが突然停止する。on me=私に不利なことに(口語のニュアンス)。"
    },
    {
        "no": 115,
        "episode": 12,
        "character": "yuki",
        "beat": "営業ユキが障害でアポが飛んだことを皮肉まじりに毒づく",
        "en": "Tech swears they can restore everything from last night's backup, but my client already bailed on the meeting.",
        "ja": "技術チームは昨夜のバックアップから全部復旧できると豪語してるけど、うちの客はもう打ち合わせをすっぽかしたよ。",
        "targets": [
            {
                "item": "restore",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "swear",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "bail on",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ],
        "note": "restore=データやシステムを復旧させる。bail on=(約束などを)すっぽかす・ドタキャンする。"
    },
    {
        "no": 116,
        "episode": 12,
        "character": "takeshi",
        "beat": "タケシが復旧の見通しを楽観的に伝える(失敗から学んだ前向きさ)",
        "en": "Once we restart the database node, the service should come back up within ten minutes, fingers crossed.",
        "ja": "データベースのノードを再起動すれば、サービスは10分以内に復活するはずだよ、うまくいけばね。",
        "targets": [
            {
                "item": "come back up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "restart",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "fingers crossed",
                "type": "idiom",
                "source": "TSL"
            }
        ],
        "note": "come back up=(システムが)復旧して再び稼働する。fingers crossed=うまくいくといいけど。",
        "pitfall": {
            "wrong": "the service should come back within ten minutes",
            "why": "come back だけだと「戻ってくる」一般で、システム復旧の意味が弱い。稼働状態に戻るのは come back up と up を付けるのが自然。"
        }
    },
    {
        "no": 117,
        "episode": 12,
        "character": "mina",
        "beat": "ミナが今回の原因は小さなバグらしいと聞き取って共有する",
        "en": "Apparently the outage was caused by some tiny glitch in the latest update they rolled out yesterday.",
        "ja": "どうやら障害は、昨日リリースした最新アップデートのちっちゃなバグのせいだったみたいです。",
        "targets": [
            {
                "item": "glitch",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "roll out",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "apparently",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "glitch=一時的な小さな不具合・バグ。roll out=(製品や更新を)展開・リリースする。"
    },
    {
        "no": 118,
        "episode": 12,
        "character": "lisa",
        "beat": "リサが恒久対応までの暫定策を冷静に提示する",
        "en": "Let's roll out a temporary workaround so clients can keep placing orders while the team digs into the root cause.",
        "ja": "チームが根本原因を掘り下げる間、客が注文を続けられるよう、暫定的な回避策を展開しましょう。",
        "targets": [
            {
                "item": "workaround",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "root cause",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "dig into",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ],
        "note": "workaround=根本解決ではない一時的な回避策。dig into=徹底的に調べる・掘り下げる。"
    },
    {
        "no": 119,
        "episode": 12,
        "character": "kenji",
        "beat": "ケンジが復旧後、徹夜した部下たちをねぎらう",
        "en": "The system's finally up and running again, so go home and get some rest — you've earned it.",
        "ja": "システムがようやく復旧して動き出したから、家に帰ってゆっくり休め。お前らは十分働いた。",
        "targets": [
            {
                "item": "up and running",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "get some rest",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "you've earned it",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "up and running=(システムが)正常に稼働している状態。you've earned it=その(休む)権利は十分にある。"
    },
    {
        "no": 120,
        "episode": 12,
        "character": "yuki",
        "beat": "ユキが障害対応で全体を把握していたタケシを評価する(珍しく素直)",
        "en": "For once Takeshi actually stayed on top of things and kept every department in the loop the whole time.",
        "ja": "珍しくタケシが本当に全体をきっちり把握して、ずっと全部署に状況を共有し続けてたよ。",
        "targets": [
            {
                "item": "on top of (things)",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "in the loop",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "for once",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "on top of things=物事をきちんと掌握している。in the loop=情報を共有されている状態。"
    },
    {
        "no": 121,
        "episode": 13,
        "character": "kenji",
        "beat": "健二が、ずっと現場を支えてきた部下を課長に推すと上層部に切り出す",
        "en": "I'm recommending Tanaka for promotion because he's carried this site for years without ever asking for credit.",
        "ja": "田中を昇進に推すよ。何年もこの現場を支えてきたのに、一度も手柄を求めなかった男だからな。",
        "targets": [
            {
                "item": "promote",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            },
            {
                "item": "recommend (someone) for",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "ask for credit",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "promotion は promote の名詞形。recommend X for Y は昇進・賞などの定番。"
    },
    {
        "no": 122,
        "episode": 13,
        "character": "lisa",
        "beat": "リサが、昇進は誰かの後任に座ることだと実務目線で整理する",
        "en": "When you take over a senior role, you inherit not just the title but every problem your predecessor left behind.",
        "ja": "上のポジションを引き継ぐってことは、肩書きだけじゃなく前任者が残した問題まで全部背負うことなのよ。",
        "targets": [
            {
                "item": "take over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "inherit",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "predecessor",
                "type": "word",
                "source": "CEFR"
            }
        ],
        "note": "take over a role/job=後任として引き継ぐ。predecessor は後任 successor の対義語。"
    },
    {
        "no": 123,
        "episode": 13,
        "character": "takeshi",
        "beat": "タケシが、自分が初めてチームを任された時の空回りを笑い話にする",
        "en": "The first time I was in charge of a team, I tried to do everything myself and burned out within a month.",
        "ja": "初めてチームを任された時、全部自分でやろうとして一か月で燃え尽きたよ。",
        "targets": [
            {
                "item": "be in charge of",
                "type": "idiom",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "burn out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "do everything myself",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I was in charge for a team.",
            "why": "be in charge of + 対象。in charge for は誤り。「担当する」は of を取る。"
        }
    },
    {
        "no": 124,
        "episode": 13,
        "character": "yuki",
        "beat": "ユキが、肩書きだけ欲しがる同僚を皮肉る",
        "en": "Plenty of people want the corner office, but very few are willing to step up when things actually fall apart.",
        "ja": "立派なオフィスを欲しがる奴は山ほどいるけど、いざ全部崩れた時に前に出る奴はほとんどいない。",
        "targets": [
            {
                "item": "step up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "be willing to",
                "type": "function",
                "source": "NGSL"
            },
            {
                "item": "fall apart",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ],
        "note": "step up=責任を引き受けて前に出る。fall apart=(計画・状況が)崩れる。"
    },
    {
        "no": 125,
        "episode": 13,
        "character": "kenji",
        "beat": "健二が、昇進には当然給料の上乗せが伴うべきだと人事に念を押す",
        "en": "If we promote him, we'd better raise his salary to match the workload, or he'll walk straight to a competitor.",
        "ja": "昇進させるなら、仕事量に見合うように給料も上げないとな。じゃなきゃ真っ直ぐ競合に行っちまうぞ。",
        "targets": [
            {
                "item": "raise (a salary)",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            },
            {
                "item": "to match",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "competitor",
                "type": "word",
                "source": "TSL"
            }
        ],
        "pitfall": {
            "wrong": "We should rise his salary.",
            "why": "rise は自動詞(上がる)。「~を上げる」は他動詞 raise。raise his salary が正。"
        }
    },
    {
        "no": 126,
        "episode": 13,
        "character": "lisa",
        "beat": "リサが、昇進は権限ではなく信頼を勝ち取った結果だと説く",
        "en": "A title is handed to you, but trust has to be earned one quiet decision at a time.",
        "ja": "肩書きは与えられるものだけど、信頼ってのは静かな決断を一つずつ積み重ねて勝ち取るものなのよ。",
        "targets": [
            {
                "item": "earn (trust)",
                "type": "collocation",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "hand (something) to",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "one at a time",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "earn trust=信頼を勝ち取る(get/win より自然なビジネス表現)。one X at a time=一つずつ。"
    },
    {
        "no": 127,
        "episode": 13,
        "character": "takeshi",
        "beat": "タケシが、昇進後に周囲の期待に応えられるか不安を口にする",
        "en": "My biggest fear is getting promoted and then failing to live up to what everyone expects of me.",
        "ja": "一番怖いのは、昇進した後にみんなの期待に応えられないことなんだよな。",
        "targets": [
            {
                "item": "live up to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "fear",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "expect of (someone)",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "live up to expectations=期待に応える。expect X of someone=人にXを期待する。"
    },
    {
        "no": 128,
        "episode": 13,
        "character": "mina",
        "beat": "ミナが、推薦された田中さんは昇進に値する人だと素直に言う",
        "en": "Honestly, Tanaka totally deserves it; he stayed late covering for everyone without ever complaining.",
        "ja": "正直、田中さんは昇進して当然だよ。文句一つ言わずに、みんなの分まで残業してたもん。",
        "targets": [
            {
                "item": "deserve",
                "type": "word",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "cover for (someone)",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "stay late",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "He deserves to it.",
            "why": "deserve は他動詞で目的語を直接取る。deserve it / deserve a raise。to は不要。"
        }
    },
    {
        "no": 129,
        "episode": 13,
        "character": "yuki",
        "beat": "ユキが、田中さんが引き継ぐ前任者の存在感の大きさを指摘する",
        "en": "Whoever takes that position has big shoes to fill, since the last manager basically held the whole department together.",
        "ja": "あのポジションを継ぐ人は相当なプレッシャーだよ。前のマネージャーが部署を一人でまとめてたようなもんだから。",
        "targets": [
            {
                "item": "big shoes to fill",
                "type": "idiom",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "hold (something) together",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "whoever",
                "type": "function",
                "source": "NGSL"
            }
        ],
        "note": "have big shoes to fill=偉大な前任者の後を継ぐ重圧。hold ~ together=(組織を)まとめる。"
    },
    {
        "no": 130,
        "episode": 13,
        "character": "master",
        "beat": "権藤が、昇進の本質を静かに言い切って締める",
        "en": "A promotion doesn't make you a leader; it simply gives you the chance to prove yourself when it counts.",
        "ja": "昇進が人を指導者にするわけじゃない。それはただ、ここぞという時に自分を証明する機会をくれるだけだ。",
        "targets": [
            {
                "item": "prove oneself",
                "type": "collocation",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "when it counts",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "give (someone) the chance to",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "prove oneself=実力を証明する。when it counts=いざという肝心な時に。"
    },
    {
        "no": 131,
        "episode": 14,
        "character": "mina",
        "beat": "面接会場の受付で、緊張しながら自分が応募した職種を伝える",
        "en": "I'm here for the interview — I applied for the full-time marketing position last month.",
        "ja": "面接に来ました。先月、正社員のマーケティング職に応募したんです。",
        "targets": [
            {
                "item": "apply for",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "full-time",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "position",
                "type": "word",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 132,
        "episode": 14,
        "character": "lisa",
        "beat": "控室でミナに、外資の面接で必ず聞かれる定番質問を教える",
        "en": "They'll always ask about your strengths and weaknesses, so prepare a concrete example for each.",
        "ja": "必ず長所と短所を聞かれるから、それぞれ具体的な例を用意しておきなさい。",
        "targets": [
            {
                "item": "strength (and weakness)",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "concrete",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "prepare",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 133,
        "episode": 14,
        "character": "yuki",
        "beat": "ミナの第一印象を冷静に観察してアドバイスする",
        "en": "You come across as nervous, but honestly that just makes you look sincere rather than arrogant.",
        "ja": "あなた緊張してるように見えるけど、正直それって傲慢どころか誠実に見えるよ。",
        "targets": [
            {
                "item": "come across as",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "sincere",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "arrogant",
                "type": "word",
                "source": "CEFR"
            }
        ],
        "pitfall": {
            "wrong": "You come across nervous",
            "why": "come across の後に形容詞・名詞を続けるときは as が必須。as を落とすのは典型的な誤り。"
        }
    },
    {
        "no": 134,
        "episode": 14,
        "character": "kenji",
        "beat": "昭和の建設部長として、組織になじむことの大事さを自分の経験から語る",
        "en": "At my company, even the most talented hire won't last if they can't fit in with the team.",
        "ja": "うちの会社じゃ、どんなに優秀な新入りでもチームになじめなきゃ続かないんだ。",
        "targets": [
            {
                "item": "fit in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "talented",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "hire",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            }
        ]
    },
    {
        "no": 135,
        "episode": 14,
        "character": "takeshi",
        "beat": "自分の昔の面接失敗談を笑いながら打ち明ける",
        "en": "In my first interview I exaggerated my qualifications, and the manager caught me off guard with a follow-up question.",
        "ja": "最初の面接で資格を盛って言ったら、面接官に突っ込まれて不意を突かれたよ。",
        "targets": [
            {
                "item": "qualification",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "exaggerate",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "catch off guard",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I exaggerated my qualification",
            "why": "資格・要件の意味では通常複数形 qualifications。単数だと「資格を得ること/限定条件」の意味になりがち。"
        }
    },
    {
        "no": 136,
        "episode": 14,
        "character": "yuki",
        "beat": "ライバルの候補者と比べた現実をミナに皮肉まじりに伝える",
        "en": "The other candidate has ten years of experience, so let's be real — you barely stand a chance.",
        "ja": "もう一人の候補者は経験十年だから、正直に言って、あなたほとんど勝ち目ないよ。",
        "targets": [
            {
                "item": "stand a chance",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "candidate",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "experience",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 137,
        "episode": 14,
        "character": "mina",
        "beat": "面接本番、想定外の質問に動揺しそうになるが落ち着こうとする",
        "en": "When they threw me a tough question, I took a deep breath and managed to keep my cool.",
        "ja": "難しい質問をぶつけられたとき、深呼吸して、なんとか冷静さを保てたんです。",
        "targets": [
            {
                "item": "keep one's cool",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "take a deep breath",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "manage to",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ]
    },
    {
        "no": 138,
        "episode": 14,
        "character": "lisa",
        "beat": "提出書類について、外資マーケ視点で実務的に指摘する",
        "en": "Your resume looks polished, but it's missing the measurable results that recruiters actually care about.",
        "ja": "履歴書は洗練されてるけど、採用担当が本当に気にする数字の成果が抜けてるよ。",
        "targets": [
            {
                "item": "resume",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "measurable",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "recruiter",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            }
        ]
    },
    {
        "no": 139,
        "episode": 14,
        "character": "master",
        "beat": "権藤が締めの一言として、適性についての本質を静かに刺す",
        "en": "Anyone can learn the skills, but not everyone is cut out for the pressure that comes with the job.",
        "ja": "スキルは誰でも学べる。だが、その仕事に伴うプレッシャーに向いている人間は限られる。",
        "targets": [
            {
                "item": "be cut out for",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "pressure",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "come with",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ]
    },
    {
        "no": 140,
        "episode": 14,
        "character": "mina",
        "beat": "面接を終えて、結果への不安と自分なりの手応えを正直に語る",
        "en": "On paper I'm less qualified than the others, but I think I showed them what I'm genuinely capable of.",
        "ja": "書類の上では他の人より劣るけど、自分が本当にできることは見せられたと思います。",
        "targets": [
            {
                "item": "on paper",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "qualified",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "be capable of",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ]
    },
    {
        "no": 141,
        "episode": 15,
        "character": "master",
        "beat": "権藤が、会社を辞めてこの店を構えた経緯を静かに語り出す。",
        "en": "I quit a stable job to start up this place, knowing full well it might collapse within a year.",
        "ja": "俺は、一年でつぶれるかもしれんと百も承知で、安定した仕事を辞めてこの店を立ち上げた。",
        "targets": [
            {
                "item": "start up (a business)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "stable job",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "know full well",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "collapse",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 142,
        "episode": 15,
        "character": "lisa",
        "beat": "外資マーケのリサが、独立は計算されたリスクだと実務的に言い切る。",
        "en": "Anyone can take a risk, but the smart move is to weigh the downside before you commit.",
        "ja": "リスクを取るのは誰でもできる。賢いのは、踏み切る前にマイナス面を見極めることよ。",
        "targets": [
            {
                "item": "take a risk",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "downside",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "commit",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 143,
        "episode": 15,
        "character": "kenji",
        "beat": "建設部長の健二が、若い頃に独立を志した先輩の姿を思い出して語る。",
        "en": "He set out to build something of his own, even though his family begged him to stay put.",
        "ja": "家族は留まってくれと頼んだのに、あの人は自分の城を築こうと動き出したんだ。",
        "targets": [
            {
                "item": "set out to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "of one's own",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "stay put",
                "type": "idiom",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 144,
        "episode": 15,
        "character": "takeshi",
        "beat": "IT PMのタケシが、自分の小さな副業がようやく軌道に乗った話を前向きに語る。",
        "en": "Those late nights finally paid off; my side project is now bringing in steady income.",
        "ja": "あの徹夜の日々がようやく報われて、副業が安定した収入を生むようになったんだ。",
        "targets": [
            {
                "item": "pay off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "side project",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "steady income",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "Those late nights finally payed off.",
            "why": "❌payed → ✅paid。pay の過去形・過去分詞は paid。payed は船・ロープを繰り出す特殊用法のみで、報われる意味では誤り。"
        }
    },
    {
        "no": 145,
        "episode": 15,
        "character": "yuki",
        "beat": "主人公ユキが酒で毒舌に、独立は華やかに見えて中身は地味だと皮肉る。",
        "en": "Starting a business from scratch sounds glamorous, but mostly it's just paperwork and unpaid bills.",
        "ja": "ゼロから事業を始めるなんて華やかに聞こえるけど、実態は書類仕事と未払いの請求書ばっかりですよ。",
        "targets": [
            {
                "item": "from scratch",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "glamorous",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "paperwork",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 146,
        "episode": 15,
        "character": "lisa",
        "beat": "リサが、独立当初に何へ金を投じるべきかをビジネス目線で助言する。",
        "en": "Before you chase fancy equipment, invest in the one thing that actually keeps customers coming back.",
        "ja": "派手な設備を追いかける前に、客がまた来てくれる本当の理由にこそ投資しなさい。",
        "targets": [
            {
                "item": "invest in",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "keep coming back",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "fancy",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 147,
        "episode": 15,
        "character": "kenji",
        "beat": "健二が、独立に踏み切れず迷う部下に感情移入しながら背中を押す。",
        "en": "At some point you just have to take the plunge, or you'll spend your whole life wondering what if.",
        "ja": "どこかで思い切って飛び込むしかないんだよ。さもないと一生「もしも」を考えて終わるぞ。",
        "targets": [
            {
                "item": "take the plunge",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "at some point",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "wonder what if",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 148,
        "episode": 15,
        "character": "mina",
        "beat": "派遣のミナが天然に、独立は失敗も含めて学ぶしかないんだと素直に言う。",
        "en": "Once you go independent, it's basically sink or swim; nobody's there to bail you out anymore.",
        "ja": "いざ独立したら、もう浮くか沈むかなんですよね。誰も助けてくれなくなるっていう。",
        "targets": [
            {
                "item": "sink or swim",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "go independent",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "bail out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 149,
        "episode": 15,
        "character": "takeshi",
        "beat": "タケシが、親に頼らず自立した友人を称えつつ自分も奮い立たせる。",
        "en": "He finally learned to stand on his own feet after years of relying on his parents for everything.",
        "ja": "あいつは何年も親に何でも頼ってきたけど、ついに自分の足で立てるようになったんだ。",
        "targets": [
            {
                "item": "stand on one's own feet",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "rely on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "for everything",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 150,
        "episode": 15,
        "character": "master",
        "beat": "権藤が締めの一言。退路を断った日の覚悟を本質的な箴言として言い残す。",
        "en": "The day I signed that lease, I told myself there's no going back, and that fear is what kept me honest.",
        "ja": "あの賃貸契約に判を押した日、もう後戻りはできないと自分に言い聞かせた。その恐れが、俺を誠実に保ったんだ。",
        "targets": [
            {
                "item": "there's no going back",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "sign a lease",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "keep someone honest",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 151,
        "episode": 16,
        "character": "yuki",
        "beat": "ユキが取引先の値引き要求に気づき、相手が約束を覆そうとしていると指摘する。",
        "en": "They're trying to go back on what we agreed last week, and frankly, I don't trust a word they say anymore.",
        "ja": "先週合意したことをあいつら覆そうとしてる。正直、もうあいつらの言うこと一言も信じてない。",
        "targets": [
            {
                "item": "go back on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "agree",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "frankly",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 152,
        "episode": 16,
        "character": "lisa",
        "beat": "リサが、口約束では弱いとビジネス実務の観点で釘を刺す。",
        "en": "A verbal promise means nothing here; unless it's in the contract, they can deny it ever happened.",
        "ja": "ここでは口約束なんて何の意味もない。契約書に入ってない限り、そんな話はなかったことにできる。",
        "targets": [
            {
                "item": "contract",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "verbal",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "deny",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 153,
        "episode": 16,
        "character": "takeshi",
        "beat": "タケシが過去の失敗を白状。条文を読み飛ばして痛い目を見た話。",
        "en": "I once signed without reading the fine print, and that single line pointed to a penalty fee I never saw coming.",
        "ja": "昔、細かい注意書きを読まずにサインしたことがあって、その一行が想定外の違約金を指してたんだ。",
        "targets": [
            {
                "item": "point to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "fine print",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "penalty",
                "type": "word",
                "source": "英検"
            }
        ],
        "pitfall": {
            "wrong": "❌ that single line pointed at a penalty fee",
            "why": "「条項・データが〜を示している」の意味では point to が自然。point at は物理的に指で指す動作を連想させ、文書が何かを指し示す比喩には不自然。✅ pointed to a penalty fee"
        }
    },
    {
        "no": 154,
        "episode": 16,
        "character": "lisa",
        "beat": "リサが問題の条項を具体的に特定し、優先順位を説明。",
        "en": "The clause on page three overrides everything else, so that's the one we need to challenge first.",
        "ja": "三ページ目の条項が他のすべてに優先する。だからまず最初に争うべきはそこ。",
        "targets": [
            {
                "item": "clause",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "override",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "challenge",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 155,
        "episode": 16,
        "character": "kenji",
        "beat": "ケンジが現場の混乱を思い出し、誤解を解いた泥臭い経験を語る。",
        "en": "Back on site, a single phone call cleared up the whole mess before it dragged the project down.",
        "ja": "現場じゃ、一本の電話でその誤解を全部解いた。プロジェクトを引きずり下ろす前にな。",
        "targets": [
            {
                "item": "clear up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "mess",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "drag down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 156,
        "episode": 16,
        "character": "master",
        "beat": "権藤が、合意の重みについて本質を一言で刺す。",
        "en": "Once both sides sign, the agreement is legally binding, and good intentions won't undo a comma.",
        "ja": "両者がサインした時点で、その合意は法的拘束力を持つ。善意ではコンマひとつ取り消せん。",
        "targets": [
            {
                "item": "binding",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "legally",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "intention",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 157,
        "episode": 16,
        "character": "mina",
        "beat": "ミナが、法務の人がメールで言った言葉をそのまま聞き取って共有。",
        "en": "Legal said to get every change in writing, otherwise it just turns into he-said-she-said later.",
        "ja": "法務の人が、変更は全部書面でもらってって。じゃないと後で言った言わないになるだけだって。",
        "targets": [
            {
                "item": "in writing",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "legal",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "turn into",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 158,
        "episode": 16,
        "character": "yuki",
        "beat": "ユキが相手の婉曲な文面の裏を皮肉まじりに見抜く。",
        "en": "If you read between the lines of their email, they're basically warning us they'll walk away.",
        "ja": "あのメールの行間を読めば、要するに『手を引くぞ』って警告してるってこと。",
        "targets": [
            {
                "item": "read between the lines",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "basically",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "warn",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 159,
        "episode": 16,
        "character": "lisa",
        "beat": "リサが、署名前に必ず精査すべき項目を実務目線で念押し。",
        "en": "Always review the terms and conditions line by line; that's where they bury the cancellation fees.",
        "ja": "規約は必ず一行ずつ精査して。解約金はそういうところに埋め込まれてるから。",
        "targets": [
            {
                "item": "terms and conditions",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "review",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "bury",
                "type": "word",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 160,
        "episode": 16,
        "character": "takeshi",
        "beat": "タケシが相手の意図を要約し、前向きに次の一手を提案。",
        "en": "Look, they clearly want to back out of the deal, so let's lock down the penalty clause before they bail.",
        "ja": "なあ、あっちは明らかに契約から抜けたがってる。だから連中が逃げる前に違約条項を固めようぜ。",
        "targets": [
            {
                "item": "back out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "lock down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "bail",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "penalty",
                "type": "word",
                "source": "英検",
                "reinforcement": true
            },
            {
                "item": "clause",
                "type": "word",
                "source": "TSL",
                "reinforcement": true
            }
        ],
        "pitfall": {
            "wrong": "❌ they want to back out the deal",
            "why": "back out は「契約・約束から手を引く」の意味では of を伴う自動詞句。目的語を直接取らず of a deal の形が正しい。✅ back out of the deal"
        }
    },
    {
        "no": 161,
        "episode": 17,
        "character": "takeshi",
        "beat": "プロジェクトで対立する二人の板挟みになり、状況を打ち明ける。",
        "en": "Two of my engineers used to get along just fine, but lately they butt heads over every single design decision.",
        "ja": "うちのエンジニア二人、前はうまくやってたのに、最近は設計の決定ごとにいちいち衝突するんだ。",
        "targets": [
            {
                "item": "get along (with)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "butt heads",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "design decision",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 162,
        "episode": 17,
        "character": "yuki",
        "beat": "皮肉まじりに状況を要約する。",
        "en": "So you've got two senior people who fell out with each other, and now the whole team is walking on eggshells.",
        "ja": "つまり、ベテラン二人が仲違いして、チーム全体が腫れ物に触るみたいになってるわけね。",
        "targets": [
            {
                "item": "fall out (with someone)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "walk on eggshells",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "senior",
                "type": "word",
                "source": "NGSL",
                "rank": "top1500"
            }
        ]
    },
    {
        "no": 163,
        "episode": 17,
        "character": "lisa",
        "beat": "マーケ実務の経験から、仲裁者の立ち位置を助言する。",
        "en": "As the project manager, you can't afford to take sides; the moment you do, you lose the trust of the other half of the team.",
        "ja": "プロジェクトマネージャーとして、どちらかに肩入れする余裕はないわ。した瞬間に、もう片方のチームの信頼を失うのよ。",
        "targets": [
            {
                "item": "take sides",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "can't afford to",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "lose trust",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 164,
        "episode": 17,
        "character": "kenji",
        "beat": "現場叩き上げの部長として、自分の経験から助言する。",
        "en": "When two of my foremen wouldn't see eye to eye, I sat them down over a beer and made them clear the air face to face.",
        "ja": "うちの現場監督二人が意見が合わなかったとき、ビール片手に座らせて、面と向かってわだかまりを吐き出させたよ。",
        "targets": [
            {
                "item": "see eye to eye",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "clear the air",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "sit (someone) down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top1000"
            }
        ]
    },
    {
        "no": 165,
        "episode": 17,
        "character": "takeshi",
        "beat": "過去の自分の失敗談を打ち明ける。仲裁を焦って失敗した。",
        "en": "Last time I rushed in to smooth things over too quickly, and it backfired because neither side felt genuinely heard.",
        "ja": "前は仲裁を焦って急ぎすぎて、結局どっちも本当に話を聞いてもらえたと感じなくて逆効果になったんだ。",
        "targets": [
            {
                "item": "smooth over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "backfire",
                "type": "word",
                "source": "NGSL",
                "rank": "top2500"
            },
            {
                "item": "rush in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top1000"
            }
        ],
        "pitfall": {
            "wrong": "❌ smooth over the things → ✅ smooth things over",
            "why": "smooth over は目的語が代名詞(things/it)のとき必ず動詞と over の間に挟む。the things のような冗長な形は不自然。"
        }
    },
    {
        "no": 166,
        "episode": 17,
        "character": "mina",
        "beat": "天然なリスニング名人として、当事者の本音を素直に代弁する。",
        "en": "Honestly, I think they both just want the other person to meet them halfway instead of always digging in.",
        "ja": "正直、二人ともただ相手に歩み寄ってほしいだけで、いつも意地を張り合いたいわけじゃないと思うんだ。",
        "targets": [
            {
                "item": "meet (someone) halfway",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "dig in",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top2000"
            },
            {
                "item": "honestly",
                "type": "word",
                "source": "NGSL",
                "rank": "top1000"
            }
        ]
    },
    {
        "no": 167,
        "episode": 17,
        "character": "lisa",
        "beat": "和解への具体的な道筋を、ネイティブ目線で提案する。",
        "en": "Get them to patch things up over a shared goal, not by apologizing; people commit to outcomes far more than to forced sorries.",
        "ja": "謝罪じゃなくて共通の目標で仲直りさせるの。人は無理やりの謝罪より、結果のほうにずっと本気でコミットするから。",
        "targets": [
            {
                "item": "patch things up",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "commit to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top500"
            },
            {
                "item": "shared goal",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 168,
        "episode": 17,
        "character": "yuki",
        "beat": "現実的な落としどころを鋭く指摘する。",
        "en": "The trick isn't making them best friends; it's getting them to put their grudge behind them long enough to ship the product.",
        "ja": "コツは二人を親友にすることじゃない。製品を出荷できる程度に、わだかまりを過去のものにさせることよ。",
        "targets": [
            {
                "item": "put (something) behind us",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "grudge",
                "type": "word",
                "source": "NGSL",
                "rank": "top3000"
            },
            {
                "item": "ship a product",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 169,
        "episode": 17,
        "character": "takeshi",
        "beat": "助言を受け、前向きに次の一手を宣言する。",
        "en": "All right, tomorrow I'll bring them together, get the tension out in the open, and we'll hash it out like adults.",
        "ja": "よし、明日は二人を集めて、たまった緊張を表に出して、大人同士できっちり話し合うよ。",
        "targets": [
            {
                "item": "hash (something) out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top2000"
            },
            {
                "item": "bring (people) together",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top500"
            },
            {
                "item": "out in the open",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "原案の 'lay the tension out on the table' を自然な 'get the tension out in the open' に修正。"
    },
    {
        "no": 170,
        "episode": 17,
        "character": "master",
        "beat": "カウンターの中から、締めの本質的な一言を静かに置く。",
        "en": "A good leader doesn't pick a winner between two people; he reminds them they were on the same side all along.",
        "ja": "良きリーダーとは、二人のどちらかを勝者に選ぶ者ではない。最初から同じ側にいたのだと、思い出させる者だ。",
        "targets": [
            {
                "item": "all along",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "pick a winner",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "on the same side",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 171,
        "episode": 18,
        "character": "kenji",
        "beat": "健二が居酒屋のカウンターで、来年で定年を迎える本音を漏らす",
        "en": "I'm planning to retire next spring, but the company keeps hinting they want me to stay on as a contractor.",
        "ja": "来年の春に退職するつもりなんだが、会社は契約社員として残ってほしいってずっと匂わせてくるんだ。",
        "targets": [
            {
                "item": "retire",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "stay on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top500"
            },
            {
                "item": "hint",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 172,
        "episode": 18,
        "character": "yuki",
        "beat": "ユキが健二の長いキャリアを酒のついでに皮肉混じりに振り返る",
        "en": "When you look back on thirty years at one company, you either feel proud or you wonder where the time went.",
        "ja": "一つの会社で三十年を振り返ると、誇りを感じるか、時間がどこに消えたんだろうと思うかのどっちかだ。",
        "targets": [
            {
                "item": "look back on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "feel proud",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "wonder",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 173,
        "episode": 18,
        "character": "lisa",
        "beat": "リサが外資の感覚で、トップの退任を実務的に説明する",
        "en": "Our CEO decided to step down at the peak of his career rather than cling to the position.",
        "ja": "うちのCEOは、地位にしがみつくよりキャリアの絶頂で退任することを選んだの。",
        "targets": [
            {
                "item": "step down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "cling to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top1000"
            },
            {
                "item": "at the peak of",
                "type": "collocation",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 174,
        "episode": 18,
        "character": "takeshi",
        "beat": "タケシが引き継ぎでやらかした失敗談を笑い話にする",
        "en": "I had to hand over my entire project to the new lead, and honestly, I left out half the details by accident.",
        "ja": "プロジェクト全部を新しいリーダーに引き継がなきゃいけなくて、正直、うっかり半分くらいの詳細を伝え忘れちゃったんだ。",
        "targets": [
            {
                "item": "hand over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "leave out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top500"
            },
            {
                "item": "by accident",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I had to hand over my entire project for the new lead.",
            "why": "hand over は引き継ぐ相手を to で示す。for だと「新リーダーのために代わりにやる」意味になり誤り。正しくは hand over X to Y。"
        }
    },
    {
        "no": 175,
        "episode": 18,
        "character": "mina",
        "beat": "ミナが残業続きの健二を見て、もう切り上げようと気軽に声をかける",
        "en": "It's almost midnight, so let's just call it a day and pick this up tomorrow morning.",
        "ja": "もうすぐ真夜中だし、今日はこれで切り上げて、明日の朝に続きをやりましょうよ。",
        "targets": [
            {
                "item": "call it a day",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "pick up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "almost",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 176,
        "episode": 18,
        "character": "kenji",
        "beat": "健二が再雇用と年金の損得を生々しく計算する",
        "en": "If I keep working, my pension payments get reduced, so I can't figure out whether staying is worth it.",
        "ja": "働き続けると年金の支給額が減らされるから、残るのが得なのかどうか判断がつかないんだ。",
        "targets": [
            {
                "item": "pension",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "figure out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "worth it",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 177,
        "episode": 18,
        "character": "lisa",
        "beat": "リサが退職後の人生設計をビジネスライクに助言する",
        "en": "Instead of quitting all at once, a lot of executives gradually wind down their workload over a couple of years.",
        "ja": "一気に辞めるんじゃなくて、多くの役員は数年かけて少しずつ仕事量を減らしていくの。",
        "targets": [
            {
                "item": "wind down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "all at once",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "gradually",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 178,
        "episode": 18,
        "character": "takeshi",
        "beat": "タケシが前向きに、健二の決断を後押しする",
        "en": "As long as you give it everything you've got, you'll have no regrets when you finally walk away.",
        "ja": "全力を出し切りさえすれば、いざ去るときに何の後悔も残らないですよ。",
        "targets": [
            {
                "item": "have no regrets",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "give it everything you've got",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "walk away",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top500"
            }
        ]
    },
    {
        "no": 179,
        "episode": 18,
        "character": "yuki",
        "beat": "ユキが健二の迷いを断ち切るように、節目を突きつける",
        "en": "Deep down, you already know the time has come to let the next generation take over.",
        "ja": "心の奥では、次の世代に引き継がせる時が来たって、もう分かってるんでしょ。",
        "targets": [
            {
                "item": "the time has come",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "take over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "deep down",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 180,
        "episode": 18,
        "character": "master",
        "beat": "権藤がカウンターの奥から、退職という節目に本質的な一言で締める",
        "en": "Retiring isn't giving up; it's choosing to pass the torch while you still have something worth passing on.",
        "ja": "退職とは諦めることじゃない。まだ受け継がせる価値のあるものがあるうちに、たいまつを次へ託すことを選ぶことだ。",
        "targets": [
            {
                "item": "pass the torch",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "give up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "worth passing on",
                "type": "collocation",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 181,
        "episode": 19,
        "character": "lisa",
        "beat": "リサが、ヘッドハンターから来た誘いをカウンターで打ち明ける。",
        "en": "A headhunter reached out to me last week, and honestly, it's a tempting opportunity I never saw coming.",
        "ja": "先週ヘッドハンターから声をかけられてさ。正直、思いもしなかった魅力的なチャンスなんだよね。",
        "targets": [
            {
                "item": "opportunity",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "reach out to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "tempting",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "never saw it coming",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 182,
        "episode": 19,
        "character": "yuki",
        "beat": "ユキが、リサの今の待遇と新しい条件を冷静に比べてみろと突く。",
        "en": "Before you get excited, weigh up the pay raise against the longer hours and the commute.",
        "ja": "舞い上がる前に、昇給と引き換えになる長時間労働や通勤を天秤にかけなよ。",
        "targets": [
            {
                "item": "weigh up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "pay raise",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "commute",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 183,
        "episode": 19,
        "character": "takeshi",
        "beat": "タケシが、過去に勢いで転職して後悔した失敗談を語る。",
        "en": "I once jumped ship for a flashy title, and within a year I deeply regretted the move.",
        "ja": "俺、一度は派手な肩書き目当てで転職したけど、一年もしないうちに心底その決断を後悔したよ。",
        "targets": [
            {
                "item": "jump ship",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "flashy",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "regret",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "❌ I jumped the ship for a flashy title.",
            "why": "jump ship は冠詞 the を付けず固定表現で使う。✅ jumped ship が正しい。"
        }
    },
    {
        "no": 184,
        "episode": 19,
        "character": "mina",
        "beat": "ミナが、すぐ決めず一晩おくよう軽く勧める。",
        "en": "Don't decide tonight—just sleep on it and see how you feel about it in the morning.",
        "ja": "今夜決めちゃダメだよ。一晩寝かせて、朝どう感じるか見てみなよ。",
        "targets": [
            {
                "item": "sleep on it",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "how you feel about",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "decide",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 185,
        "episode": 19,
        "character": "lisa",
        "beat": "リサが、誘いを断るかどうかまだ迷っていると本音を漏らす。",
        "en": "Part of me wants to turn down the offer, but I'd hate to miss out on a real chance to grow.",
        "ja": "断りたい気持ちもあるんだけど、成長できる本物のチャンスを逃すのも嫌なんだよね。",
        "targets": [
            {
                "item": "turn down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "miss out on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "offer",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 186,
        "episode": 19,
        "character": "kenji",
        "beat": "ケンジが、隣の芝生が青く見えるだけかもしれないと現場目線で諭す。",
        "en": "In my experience, the grass always looks greener somewhere else until you actually get there.",
        "ja": "俺の経験じゃな、隣の芝生ってのは、実際に行ってみるまではいつだって青く見えるもんだよ。",
        "targets": [
            {
                "item": "grass is greener",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "in my experience",
                "type": "function",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 187,
        "episode": 19,
        "character": "lisa",
        "beat": "リサが、今の上司に対抗オファーを引き出せるか考える。",
        "en": "I might ask my boss for a counteroffer before I commit to anything.",
        "ja": "何かを決める前に、今の上司に対抗オファーを出せないか聞いてみようかな。",
        "targets": [
            {
                "item": "counteroffer",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "commit to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "ask (someone) for",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 188,
        "episode": 19,
        "character": "takeshi",
        "beat": "タケシが、対抗オファーをもらったらどうするか前向きに口を挟む。",
        "en": "If they come back with a solid counteroffer, you should seriously think it over before saying no.",
        "ja": "もし会社がしっかりした対抗オファーを出してきたら、断る前に真剣に検討した方がいいよ。",
        "targets": [
            {
                "item": "think it over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "come back with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "counteroffer",
                "type": "word",
                "source": "TSL",
                "reinforcement": true
            },
            {
                "item": "solid",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 189,
        "episode": 19,
        "character": "yuki",
        "beat": "ユキが、リサが結局誘いに乗るんだろうと皮肉まじりに見抜く。",
        "en": "Knowing you, you'll take them up on it the moment the money looks good enough.",
        "ja": "あんたのことだから、金額が十分よく見えた瞬間にその話に乗るんでしょ。",
        "targets": [
            {
                "item": "take (someone) up on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "the moment (that)",
                "type": "function",
                "source": "NGSL"
            },
            {
                "item": "knowing you",
                "type": "function",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 190,
        "episode": 19,
        "character": "master",
        "beat": "権藤が、迷いごと抱えて選べという核心の一言で締める。",
        "en": "It's natural to have mixed feelings; the right choice rarely makes everything feel simple.",
        "ja": "複雑な思いを抱えて当然だ。正しい選択ってのは、何もかもを単純にしてくれることはまずない。",
        "targets": [
            {
                "item": "have mixed feelings",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "natural",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "rarely",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 191,
        "episode": 20,
        "character": "lisa",
        "beat": "プロジェクト初日のキックオフ会議をリサが仕切る",
        "en": "Let's kick off the project by aligning on what success actually looks like for each stakeholder.",
        "ja": "まずは、各ステークホルダーにとって成功が実際どういう形なのかをすり合わせて、プロジェクトを始動させましょう。",
        "targets": [
            {
                "item": "kick off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "align on",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "stakeholder",
                "type": "word",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 192,
        "episode": 20,
        "character": "takeshi",
        "beat": "タケシが張り切って全体計画を提案する",
        "en": "I've already mapped out the whole roadmap, though I'll admit I tend to get ahead of myself.",
        "ja": "もう全体のロードマップを描いておいたよ。まあ、先走りがちなのは認めるけどね。",
        "targets": [
            {
                "item": "map out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "roadmap",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "get ahead of oneself",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 193,
        "episode": 20,
        "character": "master",
        "beat": "権藤が計画の節目について本質を突く",
        "en": "A milestone means nothing unless it forces you to prove progress, not just claim it.",
        "ja": "節目ってのは、進捗を主張するんじゃなく証明させる時にだけ意味を持つ。",
        "targets": [
            {
                "item": "milestone",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            },
            {
                "item": "progress",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "prove",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 194,
        "episode": 20,
        "character": "kenji",
        "beat": "建設部長の健二が現場感覚で役割分担を語る",
        "en": "Once we divide up the workload by expertise, nobody ends up carrying the dead weight alone.",
        "ja": "専門ごとに作業を分担すれば、誰か一人がお荷物を背負わされることもなくなる。",
        "targets": [
            {
                "item": "divide up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "workload",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "carry the dead weight",
                "type": "idiom",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 195,
        "episode": 20,
        "character": "lisa",
        "beat": "リサが成果物の定義を実務目線で詰める",
        "en": "Every deliverable needs a clear owner and a deadline, or it quietly slips through the cracks.",
        "ja": "どの成果物にも、明確な担当者と締め切りが要る。じゃないと、こっそり抜け落ちるの。",
        "targets": [
            {
                "item": "deliverable",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            },
            {
                "item": "slip through the cracks",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "deadline",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 196,
        "episode": 20,
        "character": "yuki",
        "beat": "ユキが進捗の現実を皮肉混じりに確認する",
        "en": "We're on track for now, but let's not pretend a single good week means we're out of the woods.",
        "ja": "今のところ順調よ。でも、一週間うまくいったくらいで山を越えたつもりにはならないでね。",
        "targets": [
            {
                "item": "on track",
                "type": "idiom",
                "source": "TSL",
                "reinforcement": false
            },
            {
                "item": "out of the woods",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "pretend",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 197,
        "episode": 20,
        "character": "mina",
        "beat": "ミナが膨らみすぎた候補を絞ろうと提案する",
        "en": "Can we narrow down the feature list? I keep losing track of what we even agreed on.",
        "ja": "機能リスト、絞れませんか?何に合意したのか、もう分からなくなっちゃって。",
        "targets": [
            {
                "item": "narrow down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": false
            },
            {
                "item": "lose track of",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "agree on",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ]
    },
    {
        "no": 198,
        "episode": 20,
        "character": "yuki",
        "beat": "ユキが範囲の曖昧さを毒舌で指摘する",
        "en": "If we don't lock down the scope now, we'll be drowning in change requests by next quarter.",
        "ja": "今のうちに範囲を確定させないと、来四半期には変更依頼の山に溺れることになるわよ。",
        "targets": [
            {
                "item": "scope",
                "type": "word",
                "source": "TSL",
                "reinforcement": false
            },
            {
                "item": "lock down",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "change request",
                "type": "collocation",
                "source": "TSL"
            }
        ],
        "pitfall": {
            "wrong": "❌ If we don't fix the scope now... (「範囲を確定する」の意で fix を使う)",
            "why": "fix the scope は『範囲を修正する/直す』と誤解されやすい。確定の意味なら lock down / nail down が自然。"
        }
    },
    {
        "no": 199,
        "episode": 20,
        "character": "takeshi",
        "beat": "タケシが新メンバーの即戦力ぶりを誇る",
        "en": "Our new hire hit the ground running and shipped a working prototype in her first week.",
        "ja": "新人が初日からフル稼働で、最初の一週間で動くプロトタイプまで出してきたんだ。",
        "targets": [
            {
                "item": "hit the ground running",
                "type": "idiom",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "new hire",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "ship",
                "type": "word",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 200,
        "episode": 20,
        "character": "master",
        "beat": "権藤が締めに計画と臨機応変のバランスを説く",
        "en": "Plan the parts you can, and play the rest by ear; rigid plans break before reality does.",
        "ja": "計画できるところは計画しろ。残りは出たとこ勝負だ。硬すぎる計画は、現実より先に折れる。",
        "targets": [
            {
                "item": "play it by ear",
                "type": "idiom",
                "source": "NGSL",
                "reinforcement": false
            },
            {
                "item": "rigid",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "break",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 201,
        "episode": 21,
        "character": "master",
        "beat": "権藤が値上げの口火を切り、原価が上がった事実を客に告げる",
        "en": "Our supply costs have gone up nearly thirty percent since last spring, so I have to be honest with you about the menu.",
        "ja": "うちの仕入れ値は去年の春からおよそ三割上がってね、だからメニューについては正直に話さないといけないんだ。",
        "targets": [
            {
                "item": "go up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "supply costs",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "be honest with someone",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 202,
        "episode": 21,
        "character": "lisa",
        "beat": "リサが、店が原価増を客に転嫁せざるを得ない構造を実務目線で説明",
        "en": "At some point every business has to pass the rising costs on to its customers, or the margins simply disappear.",
        "ja": "どんな商売も、どこかで上がったコストを客に転嫁しないと、利益が単純に消えてなくなるのよ。",
        "targets": [
            {
                "item": "pass on (a cost)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "margin",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "at some point",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 203,
        "episode": 21,
        "character": "yuki",
        "beat": "ユキが酒の勢いで、値上げの真犯人はインフレだと皮肉る",
        "en": "Don't blame the owner; inflation is quietly eating into everyone's paycheck this year.",
        "ja": "店主を責めんなよ。今年はインフレが静かに全員の給料を食い荒らしてるんだから。",
        "targets": [
            {
                "item": "inflation",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "eat into",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top1500"
            },
            {
                "item": "blame",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 204,
        "episode": 21,
        "character": "kenji",
        "beat": "健二が、現場でも仕入れ値が原因で値上げした自社の事情に重ねて共感",
        "en": "We had to raise prices on every project last quarter, and trust me, no boss enjoys breaking that news.",
        "ja": "うちも先期は全案件で値上げせざるを得なかったよ。言っとくが、その知らせを切り出すのが好きな上司なんていないんだ。",
        "targets": [
            {
                "item": "raise prices",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "break the news",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "trust me",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 205,
        "episode": 21,
        "character": "master",
        "beat": "権藤が、これまでは店側で原価増を吸収してきたと打ち明ける",
        "en": "For two years I absorbed the extra cost myself, but I can't keep eating the difference forever.",
        "ja": "二年間は余分なコストを自分で吸収してきたが、その差額をいつまでも被り続けるわけにはいかなくてね。",
        "targets": [
            {
                "item": "absorb (a cost)",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "eat the difference",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "keep doing something",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 206,
        "episode": 21,
        "character": "lisa",
        "beat": "リサが、値上げを客に納得させるには根拠の提示が要ると助言",
        "en": "If you want customers to accept it, you have to justify the increase with real numbers, not vague excuses.",
        "ja": "客に納得してもらいたいなら、曖昧な言い訳じゃなく具体的な数字で値上げを正当化しないとね。",
        "targets": [
            {
                "item": "justify",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "vague",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "accept",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 207,
        "episode": 21,
        "character": "takeshi",
        "beat": "タケシが、自社で一律値上げした体験談（意外にも反発が少なかった）",
        "en": "We bumped prices across the board last year, and surprisingly, hardly anyone complained.",
        "ja": "うちは去年、一律で値上げしたんだけど、意外なことにほとんど誰も文句を言わなかったんだよね。",
        "targets": [
            {
                "item": "across the board",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "bump prices",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "hardly anyone",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "pitfall": {
            "wrong": "We bumped prices across the broad last year.",
            "why": "❌ across the broad → ✅ across the board。「全面的に・一律に」は board(掲示板/取締役会)由来の固定表現。broad(広い)ではない。"
        }
    },
    {
        "no": 208,
        "episode": 21,
        "character": "master",
        "beat": "権藤が、値上げ以外に選択肢がなかったと静かに言い切る",
        "en": "With the yen this weak, I had no choice but to adjust the prices to stay open.",
        "ja": "円がこれだけ弱いとなると、店を開け続けるには値段を調整するしかなかったんだ。",
        "targets": [
            {
                "item": "have no choice but to",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "adjust",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "stay open",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 209,
        "episode": 21,
        "character": "mina",
        "beat": "ミナが、値上げで家計が苦しいのは皆同じだとカジュアルに共感",
        "en": "Honestly, everyone I know is feeling the pinch right now, so a few extra yen on a beer won't surprise anyone.",
        "ja": "正直、まわりの知り合いはみんな今ちょうど懐が苦しいから、ビールが数円上がったところで誰も驚かないって。",
        "targets": [
            {
                "item": "feel the pinch",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "honestly",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "right now",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 210,
        "episode": 21,
        "character": "yuki",
        "beat": "ユキが締め際、値上げをぐずぐず先延ばしせず断行したことを評価",
        "en": "You finally bit the bullet and raised the prices; honestly, you should have done it months ago.",
        "ja": "ついに腹をくくって値上げしたんだな。正直、何ヶ月も前にやっとくべきだったよ。",
        "targets": [
            {
                "item": "bite the bullet",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "should have done",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "finally",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 211,
        "episode": 22,
        "character": "mina",
        "beat": "ミナが息を切らして居酒屋に駆け込み、遅刻の理由を白状する",
        "en": "I'm so sorry I'm late — I overslept and completely missed my alarm this morning.",
        "ja": "遅れて本当にすみません。寝坊して、今朝アラームに全然気づかなくて。",
        "targets": [
            {
                "item": "oversleep",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "miss one's alarm",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "I'm sorry I'm late",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 212,
        "episode": 22,
        "character": "yuki",
        "beat": "ユキが遅れて入ってきたミナを冷ややかに観察する",
        "en": "You were supposed to show up at nine, and it's already half past ten.",
        "ja": "9時に来るはずだったのに、もう10時半だよ。",
        "targets": [
            {
                "item": "show up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "be supposed to",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "half past",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 213,
        "episode": 22,
        "character": "takeshi",
        "beat": "タケシが、自分も遅刻したとき苦し紛れにやったことを打ち明ける",
        "en": "Honestly, don't bother trying to make up an excuse — the boss always sees right through it.",
        "ja": "正直、言い訳をひねり出そうとしても無駄だよ。上司には絶対見抜かれるから。",
        "targets": [
            {
                "item": "make up an excuse",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "see through",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "don't bother",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "pitfall": {
            "wrong": "❌ make an excuse up → ✅ make up an excuse",
            "why": "make up は分離可能だが、目的語が a/an + 名詞の塊のときは make up an excuse の語順が自然。代名詞のときだけ make it up と分離する。"
        }
    },
    {
        "no": 214,
        "episode": 22,
        "character": "lisa",
        "beat": "リサが帰国子女目線で、ビジネスでは正直さが評価されると助言する",
        "en": "It's always better to own up to your mistake than to come up with some flimsy story.",
        "ja": "苦しい作り話をするより、自分のミスを素直に認めるほうが絶対にいいよ。",
        "targets": [
            {
                "item": "own up to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "come up with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "flimsy",
                "type": "word",
                "source": "英検"
            }
        ]
    },
    {
        "no": 215,
        "episode": 22,
        "character": "kenji",
        "beat": "ケンジが部長として、遅刻が現場の信頼に響くことを噛みしめる",
        "en": "When you're late without a word, you let down the whole team, not just yourself.",
        "ja": "黙って遅刻すると、自分だけじゃなくチーム全体を裏切ることになるんだ。",
        "targets": [
            {
                "item": "let (someone) down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "without a word",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "the whole team",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 216,
        "episode": 22,
        "character": "lisa",
        "beat": "リサが、遅刻常習を防ぐ実務的なコツを共有する",
        "en": "If you want to be taken seriously, make it a habit to get to work on time every single day.",
        "ja": "本気で信頼されたいなら、毎日きっちり時間どおりに出社するのを習慣にすることだね。",
        "targets": [
            {
                "item": "on time",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "be taken seriously",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "make it a habit",
                "type": "collocation",
                "source": "TSL"
            }
        ],
        "pitfall": {
            "wrong": "❌ arrive in time to work → ✅ get to work on time",
            "why": "on time =「定刻どおり」、in time =「間に合って・期限前に」。出社時刻を守る話は on time。"
        }
    },
    {
        "no": 217,
        "episode": 22,
        "character": "mina",
        "beat": "ミナが上司に小言を言われ、神妙に謝る",
        "en": "I promise I'll set two alarms from now on — it won't happen again.",
        "ja": "これからは絶対アラームを2個セットします。二度とこんなことしません。",
        "targets": [
            {
                "item": "it won't happen again",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "from now on",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "set an alarm",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 218,
        "episode": 22,
        "character": "takeshi",
        "beat": "タケシが、自分も大事な会議をうっかり忘れた失敗を白状する",
        "en": "I once skipped a client meeting because it completely slipped my mind — I felt awful afterward.",
        "ja": "前に顧客との会議を、すっかり頭から抜けてて飛ばしちゃってさ。あとで最悪な気分だったよ。",
        "targets": [
            {
                "item": "slip one's mind",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "skip a meeting",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "feel awful",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 219,
        "episode": 22,
        "character": "yuki",
        "beat": "ユキが皮肉まじりに、たまの遅刻が見逃される甘えを突く",
        "en": "Don't think you can get away with it just because the boss was in a good mood today.",
        "ja": "今日たまたま上司の機嫌がよかったからって、見逃してもらえると思わないことだね。",
        "targets": [
            {
                "item": "get away with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "in a good mood",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "just because",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 220,
        "episode": 22,
        "character": "master",
        "beat": "権藤が締めに、遅刻そのものより連絡の有無が信用を分けると諭す",
        "en": "Being late happens to everyone; what matters is whether you give people a heads-up in advance.",
        "ja": "遅刻は誰にでもある。大事なのは、前もって一報を入れるかどうかだ。",
        "targets": [
            {
                "item": "give (someone) a heads-up",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "in advance",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "what matters is",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 221,
        "episode": 23,
        "character": "lisa",
        "beat": "会食の開始直後、まずは場を和ませる雑談から入るべきだと釘を刺す。",
        "en": "Don't rush into the numbers; a few minutes of small talk lets everyone relax before you bring up the contract.",
        "ja": "いきなり数字の話に飛び込むな。ちょっとした雑談で全員の緊張がほぐれてから契約の話を切り出すんだ。",
        "targets": [
            {
                "item": "bring (something) up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "small talk",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "rush into",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ]
    },
    {
        "no": 222,
        "episode": 23,
        "character": "takeshi",
        "beat": "初対面の相手と意気投合できた接待を、自分の手柄のように振り返る。",
        "en": "We hit it off the moment he found out I was into golf, and the whole deal suddenly felt within reach.",
        "ja": "ゴルフ好きだとバレた瞬間に意気投合して、契約がいきなり手の届くところに来た感じだったよ。",
        "targets": [
            {
                "item": "hit it off",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "find out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "be into (something)",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "within reach",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 223,
        "episode": 23,
        "character": "yuki",
        "beat": "酒が回り、相手がなかなか本題に入らない接待にうんざりして毒づく。",
        "en": "Can we just get down to business already? I've sat through forty minutes of weather talk and my patience is running out.",
        "ja": "そろそろ本題に入ってくれない？四十分も天気の話に付き合わされて、もう我慢の限界なんだけど。",
        "targets": [
            {
                "item": "get down to business",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "sit through",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "run out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 224,
        "episode": 23,
        "character": "kenji",
        "beat": "昭和の建設部長が、乾杯の音頭を任されて緊張しながら立ち上がる。",
        "en": "I'd like to propose a toast to a long partnership, so please raise your glasses.",
        "ja": "末永いお付き合いに乾杯したいと思います。どうかグラスをお上げください。",
        "targets": [
            {
                "item": "propose a toast",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "raise your glasses",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "partnership",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I'd like to cheers for a long partnership.",
            "why": "「乾杯する」を cheers で動詞にするのは誤り。cheers は掛け声か感謝の口語。乾杯の音頭は propose a toast、グラスを上げる動作は raise a glass。"
        }
    },
    {
        "no": 225,
        "episode": 23,
        "character": "lisa",
        "beat": "最初は硬かった相手が、料理が進むにつれて打ち解けてきたと観察する。",
        "en": "He was guarded at first, but he gradually warmed up to us once the food started coming.",
        "ja": "最初は警戒してたけど、料理が出始めると彼は次第にこっちに打ち解けてきたよ。",
        "targets": [
            {
                "item": "warm up to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "guarded",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "gradually",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 226,
        "episode": 23,
        "character": "mina",
        "beat": "店員が追加の一品をサービスだと告げたのを、天然な彼女が聞き取って報告する。",
        "en": "The waiter just said this last dish is on the house, so we don't have to pay for it.",
        "ja": "今の店員さん、この最後の一品はサービスだって言ってたよ。だからこれは払わなくていいんだって。",
        "targets": [
            {
                "item": "on the house",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "pay for",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "dish",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 227,
        "episode": 23,
        "character": "master",
        "beat": "寡黙なマスターが、接待で本当に大事なことを一言で突く。",
        "en": "Keep one thing in mind at a dinner like this: people remember how you made them feel, not what you said.",
        "ja": "こういう会食では一つだけ心に留めておけ。相手が覚えているのは、お前が何を言ったかではなく、どう感じさせたかだ。",
        "targets": [
            {
                "item": "keep (something) in mind",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "make someone feel",
                "type": "collocation",
                "source": "TSL"
            },
            {
                "item": "remember",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 228,
        "episode": 23,
        "character": "kenji",
        "beat": "和やかな席で、納期遅れという悪い知らせを切り出さねばならず気が重い。",
        "en": "I hated to break the news over dinner, but I had to tell them the delivery would be delayed.",
        "ja": "会食の席で悪い知らせを切り出すのは気が引けたが、納期が遅れることは伝えなければならなかった。",
        "targets": [
            {
                "item": "break the news",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "delivery",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "delay",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 229,
        "episode": 23,
        "character": "yuki",
        "beat": "悪い知らせの切り出し方を、皮肉まじりに先輩風を吹かせて助言する。",
        "en": "When you bring up bad news, lead with a solution; otherwise the client just hears a complaint.",
        "ja": "悪い知らせを切り出すときは解決策から入れ。じゃないと相手にはただの泣き言にしか聞こえないから。",
        "targets": [
            {
                "item": "lead with",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "complaint",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "bring (something) up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": true
            }
        ]
    },
    {
        "no": 230,
        "episode": 23,
        "character": "takeshi",
        "beat": "終電を気にしつつ、長引いた接待をそろそろお開きにしようと提案する。",
        "en": "It's getting late and we've covered everything, so why don't we call it a night?",
        "ja": "もう遅いし話も全部済んだから、そろそろお開きにしませんか。",
        "targets": [
            {
                "item": "call it a night",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "cover",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "getting late",
                "type": "collocation",
                "source": "TSL"
            }
        ]
    },
    {
        "no": 231,
        "episode": 24,
        "character": "yuki",
        "beat": "金曜の夜、定時で上がれなかったユキが皮肉まじりに愚痴る",
        "en": "I finally clocked out at ten, so don't talk to me about work-life balance.",
        "ja": "やっと10時に退勤したんだから、ワークライフバランスの話なんてしないでよ。",
        "targets": [
            {
                "item": "clock out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "work-life balance",
                "type": "collocation",
                "source": "TSL"
            }
        ],
        "note": "clock out=退勤する(打刻して出る)。clock in が出勤。"
    },
    {
        "no": 232,
        "episode": 24,
        "character": "takeshi",
        "beat": "納期前、徹夜続きを武勇伝のように語るタケシ",
        "en": "I put in sixty hours last week and still missed the deadline.",
        "ja": "先週は60時間も働いたのに、それでも納期に間に合わなかったんだ。",
        "targets": [
            {
                "item": "put in (hours)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "miss the deadline",
                "type": "collocation",
                "source": "TSL"
            }
        ],
        "pitfall": {
            "wrong": "I worked sixty hours of overtime in.",
            "why": "put in は『(時間・労力)を費やす』。'put in hours' で一語の塊。'worked ... in' のような語順にはしない。"
        }
    },
    {
        "no": 233,
        "episode": 24,
        "character": "kenji",
        "beat": "昭和気質の建設部長ケンジが、自分の若い頃を引き合いに出す",
        "en": "Back in my day, we burned the midnight oil without a word of complaint.",
        "ja": "俺の若い頃は、文句ひとつ言わずに夜遅くまで働いたもんだ。",
        "targets": [
            {
                "item": "burn the midnight oil",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "back in my day",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "burn the midnight oil=夜遅くまで根を詰めて働く/勉強する。back in my day=俺の若い頃は。"
    },
    {
        "no": 234,
        "episode": 24,
        "character": "lisa",
        "beat": "外資マーケのリサが、海外チームの当たり前を説明する",
        "en": "At my old firm, no one expected you to be available around the clock.",
        "ja": "前の会社では、24時間いつでも連絡がつくことなんて誰も期待しなかった。",
        "targets": [
            {
                "item": "around the clock",
                "type": "idiom",
                "source": "TSL"
            },
            {
                "item": "be available",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "around the clock=24時間ぶっ通しで。"
    },
    {
        "no": 235,
        "episode": 24,
        "character": "lisa",
        "beat": "リサがオンオフの線引きの大切さを実務目線で語る",
        "en": "You have to draw a line between your job and your life, or it'll eat you alive.",
        "ja": "仕事と生活の間に線を引かないと、それに飲み込まれるよ。",
        "targets": [
            {
                "item": "draw a line between",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "eat (someone) alive",
                "type": "idiom",
                "source": "NGSL"
            }
        ],
        "note": "draw a line between A and B=AとBを明確に区別する。eat someone alive=精神的に追い詰める。"
    },
    {
        "no": 236,
        "episode": 24,
        "character": "takeshi",
        "beat": "タケシが、仕事を抱えすぎて全部中途半端になった失敗を白状する",
        "en": "I spread myself too thin last quarter and ended up dropping the ball on everything.",
        "ja": "先の四半期は手を広げすぎて、結局すべてで失敗してしまった。",
        "targets": [
            {
                "item": "spread (oneself) too thin",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "drop the ball",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "end up (doing)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ],
        "note": "spread oneself too thin=抱え込みすぎて余力がなくなる。drop the ball=しくじる、ヘマをする。end up doing=結局〜することになる。"
    },
    {
        "no": 237,
        "episode": 24,
        "character": "mina",
        "beat": "派遣のミナが、有給で韓国に行った話をのんびり語る",
        "en": "I took a few days off and flew to Seoul just to recharge.",
        "ja": "何日か休みを取って、ただ充電するためにソウルに飛んだんだ。",
        "targets": [
            {
                "item": "take time off",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "recharge",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "take time off=休みを取る(ここでは take a few days off)。recharge=(人が)英気を養う、リフレッシュする。"
    },
    {
        "no": 238,
        "episode": 24,
        "character": "yuki",
        "beat": "ユキが、休むことに罪悪感を持つ日本の空気を皮肉る",
        "en": "Here, calling in sick feels like a crime, even when you can barely stand.",
        "ja": "ここでは、立っているのもやっとなのに、病欠の連絡をするのが罪みたいに感じる。",
        "targets": [
            {
                "item": "call in sick",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "can barely (do)",
                "type": "function",
                "source": "CEFR"
            }
        ],
        "note": "call in sick=体調不良で会社を休む連絡をする。can barely stand=やっと立っている。"
    },
    {
        "no": 239,
        "episode": 24,
        "character": "mina",
        "beat": "残業の話題。天然のミナが先輩の様子を報告する。",
        "en": "My senior's been swamped for weeks, so she finally took some time off to recharge.",
        "ja": "先輩、何週間もパンク状態でさ、やっと休みを取ってリフレッシュしたんだ。",
        "targets": [
            {
                "item": "be swamped",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "time off",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "recharge",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "be swamped = 仕事に忙殺される。busy より生々しい口語。"
    },
    {
        "no": 240,
        "episode": 24,
        "character": "master",
        "beat": "働き方を、マスターが静かに諭す。",
        "en": "Working around the clock takes a toll on the very family you're doing it for.",
        "ja": "がむしゃらに働き続けることは、そのために働いてるはずの家族を蝕んでいく。",
        "targets": [
            {
                "item": "take a toll on",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "around the clock",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "do it for (someone)",
                "type": "collocation",
                "source": "NGSL"
            }
        ],
        "note": "take a toll on = 〜を蝕む/に打撃を与える。around the clock = 休みなく。"
    },
    {
        "no": 241,
        "episode": 25,
        "character": "takeshi",
        "beat": "タケシが昔の大失敗を笑い話として切り出す",
        "en": "I completely messed up my first big presentation by pitching last year's numbers to the client.",
        "ja": "初めての大事なプレゼンで、去年の数字をクライアントに出しちゃって、もう完全にやらかしたんだよ。",
        "targets": [
            {
                "item": "mess up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "pitch (to a client)",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "presentation",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 242,
        "episode": 25,
        "character": "lisa",
        "beat": "リサが失敗の捉え方をビジネス目線で語る",
        "en": "The best people in any company learn from their mistakes instead of pretending they never happened.",
        "ja": "どの会社でも一番優秀な人は、失敗をなかったことにせず、そこから学ぶものよ。",
        "targets": [
            {
                "item": "learn from (mistakes)",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "instead of",
                "type": "function",
                "source": "NGSL"
            },
            {
                "item": "pretend",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 243,
        "episode": 25,
        "character": "kenji",
        "beat": "健二が部下の失敗を思い返して感情を込める",
        "en": "My team lost a huge contract, but the young guys bounced back faster than I ever expected.",
        "ja": "うちのチームはでかい契約を逃したけど、若い連中は俺の想像よりずっと早く立ち直ったよ。",
        "targets": [
            {
                "item": "bounce back",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "contract",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "expect",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 244,
        "episode": 25,
        "character": "yuki",
        "beat": "ユキが酒の入った毒舌で自分の失敗を皮肉る",
        "en": "I totally blew it in the negotiation because I tried to sound smarter than I actually am.",
        "ja": "あの交渉、実際より賢く見せようとして、見事にしくじったわ。",
        "targets": [
            {
                "item": "blow it",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "negotiation",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "actually",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I blew up it in the negotiation.",
            "why": "blow it は目的語を間に挟む分離可能な句動詞ではなく、it が固定された慣用表現。it を分離したり blow up に置き換えるのは誤り。正しくは blow it。"
        }
    },
    {
        "no": 245,
        "episode": 25,
        "character": "mina",
        "beat": "ミナが天然に自分のうっかりミスを振り返る",
        "en": "I have no idea where everything went wrong, but somehow I sent the email to the entire office.",
        "ja": "どこで何がどう間違ったのか全然わからないけど、なぜか全社員にそのメール送っちゃってた。",
        "targets": [
            {
                "item": "go wrong",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "have no idea",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "somehow",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 246,
        "episode": 25,
        "character": "takeshi",
        "beat": "タケシが後から振り返って原因に気づく",
        "en": "In hindsight, I should have double-checked the file before I hit send so confidently.",
        "ja": "今思えば、あんなに自信満々に送信する前にファイルを確認しとくべきだった。",
        "targets": [
            {
                "item": "in hindsight",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "double-check",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "hit send",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 247,
        "episode": 25,
        "character": "master",
        "beat": "権藤が失敗の受け止め方について本質を突く",
        "en": "A real professional takes setbacks in stride and never lets one bad day define their career.",
        "ja": "本物のプロは、つまずきを冷静に受け止め、たった一日の失敗で自分のキャリアを決めつけたりしない。",
        "targets": [
            {
                "item": "take it in stride",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "setback",
                "type": "word",
                "source": "英検"
            },
            {
                "item": "define",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 248,
        "episode": 25,
        "character": "lisa",
        "beat": "リサが過去の失敗を経験として割り切る姿勢を示す",
        "en": "I just chalk it up to experience and move on, because dwelling on it never fixes anything.",
        "ja": "私はそれを経験のうちと割り切って前に進む。引きずったって何も解決しないからね。",
        "targets": [
            {
                "item": "chalk it up to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "dwell on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "move on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 249,
        "episode": 25,
        "character": "kenji",
        "beat": "健二が失敗の中にあった救いを語る",
        "en": "The silver lining was that the whole mess taught my team how to handle real pressure.",
        "ja": "せめてもの救いは、あのドタバタがうちのチームに本物のプレッシャーへの対処を教えてくれたことだな。",
        "targets": [
            {
                "item": "silver lining",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "handle pressure",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "mess",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 250,
        "episode": 25,
        "character": "yuki",
        "beat": "ユキがプロジェクトの白紙化を皮肉混じりに締める",
        "en": "After three months of work, the client changed their mind and we were right back to square one.",
        "ja": "三か月も働いたのに、クライアントが気変わりして、結局また振り出しに戻ったってわけ。",
        "targets": [
            {
                "item": "back to square one",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "change one's mind",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "client",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 251,
        "episode": 26,
        "character": "yuki",
        "beat": "ユキが酒片手に、議論の口火を切る。",
        "en": "In my opinion, companies don't hire AI to help us; they hire it to replace us as cheaply as possible.",
        "ja": "私に言わせれば、企業がAIを導入するのは私たちを助けるためじゃなくて、できるだけ安く私たちを置き換えるためよ。",
        "targets": [
            {
                "item": "in my opinion",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "replace",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "hire",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "in my opinion は意見表明の定番。replace A as cheaply as possible で「できるだけ安くAを置き換える」。"
    },
    {
        "no": 252,
        "episode": 26,
        "character": "takeshi",
        "beat": "タケシが自分の現場での失敗談を持ち出す。",
        "en": "We tried to automate our entire reporting process last quarter, and honestly, it broke more things than it fixed.",
        "ja": "うちは先期に報告業務をまるごと自動化しようとして、正直、直したより壊した方が多かったんですよ。",
        "targets": [
            {
                "item": "automate",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "entire",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "process",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "automate the process で「業務を自動化する」。it broke more things than it fixed は自然な口語表現。",
        "pitfall": {
            "wrong": "We tried to automatize our entire reporting process.",
            "why": "「自動化する」は automatize ではなく automate が標準。automatize はほぼ使われない。"
        }
    },
    {
        "no": 253,
        "episode": 26,
        "character": "lisa",
        "beat": "リサがネイティブ目線で論点を整理する。",
        "en": "On the one hand, AI boosts our productivity, but on the other hand, it concentrates power in a handful of huge companies.",
        "ja": "一方ではAIは生産性を上げるけど、その一方で、ひと握りの巨大企業に力を集中させるのよね。",
        "targets": [
            {
                "item": "on the one hand",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "productivity",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "boost",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "on the one hand ... on the other hand で対比を作る定型。boost productivity は頻出コロケーション。"
    },
    {
        "no": 254,
        "episode": 26,
        "character": "kenji",
        "beat": "ケンジが現場の職人を思って反論する。",
        "en": "You have a point, but try telling a fifty-year-old crane operator that he just needs to adapt to new technology overnight.",
        "ja": "言いたいことは分かる。でも50歳のクレーン運転手に、新しい技術にひと晩で適応しろなんて言ってみろよ。",
        "targets": [
            {
                "item": "have a point",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "adapt to",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "overnight",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "You have a point は「一理ある」。adapt to は前置詞 to が必須。overnight は「ひと晩で／一気に」。",
        "pitfall": {
            "wrong": "He just needs to adapt new technology overnight.",
            "why": "「〜に適応する」は adapt to。to を落とすと adapt（改作する）の意味になり不自然。"
        }
    },
    {
        "no": 255,
        "episode": 26,
        "character": "mina",
        "beat": "ミナが等身大の体感を素直に語る。",
        "en": "To some extent it's already happening — like, the chatbot answers most of the questions I used to handle at work.",
        "ja": "ある程度はもう起きてますよね。なんか、私が昔さばいてた質問のほとんどは、もうチャットボットが答えちゃってるし。",
        "targets": [
            {
                "item": "to some extent",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "handle",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "used to",
                "type": "function",
                "source": "NGSL"
            }
        ],
        "note": "to some extent は「ある程度は」と部分的に認める表現。used to handle で「以前はさばいていた（今はしない）」。"
    },
    {
        "no": 256,
        "episode": 26,
        "character": "takeshi",
        "beat": "タケシが懲りずに前向きな見方を投げ込む。",
        "en": "The way I see it, AI won't take your job, but a person who knows how to use AI definitely might.",
        "ja": "僕の見方だと、AIが仕事を奪うんじゃなくて、AIの使い方を知ってる人が奪うんですよ、間違いなく。",
        "targets": [
            {
                "item": "the way I see it",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "take your job",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "definitely",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "the way I see it は「私の見るところ」。take someone's job で「仕事を奪う」。"
    },
    {
        "no": 257,
        "episode": 26,
        "character": "lisa",
        "beat": "リサが業界の実務として淡々と指摘する。",
        "en": "Most firms won't fire people outright; they'll quietly phase out roles by simply not replacing anyone who leaves.",
        "ja": "ほとんどの会社はあからさまに人を切ったりしないわ。辞めた人を補充しないだけで、静かに職を段階的に消していくのよ。",
        "targets": [
            {
                "item": "phase out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "outright",
                "type": "word",
                "source": "CEFR"
            },
            {
                "item": "fire",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "note": "phase out で「段階的に廃止する」。not replacing anyone who leaves が静かなリストラの実態を描く。"
    },
    {
        "no": 258,
        "episode": 26,
        "character": "yuki",
        "beat": "AIで仕事は楽になるのか。ユキが毒づく。",
        "en": "Sure, AI speeds things up, but the extra work just piles up while my pay stays flat.",
        "ja": "確かにAIで速くはなる。けど余計な仕事が積み上がるだけで、給料は横ばいなんだよね。",
        "targets": [
            {
                "item": "pile up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "speed up",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "stay flat",
                "type": "collocation",
                "source": "TSL"
            }
        ],
        "note": "pile up = 積み上がる/溜まる。仕事・書類が溜まる定番。"
    },
    {
        "no": 259,
        "episode": 26,
        "character": "kenji",
        "beat": "ケンジが部下を案じ、現実的な落としどころを探る。",
        "en": "To some extent we have to adapt to it, sure, but I'm not going to throw my younger guys under the bus to do it.",
        "ja": "ある程度は適応しなきゃいけない、それは分かる。だがそのために、うちの若いのを見殺しにする気はないね。",
        "targets": [
            {
                "item": "throw someone under the bus",
                "type": "idiom",
                "source": "CEFR"
            },
            {
                "item": "to some extent",
                "type": "function",
                "source": "英検",
                "reinforcement": true
            },
            {
                "item": "adapt to",
                "type": "collocation",
                "source": "NGSL",
                "reinforcement": true
            }
        ],
        "note": "throw someone under the bus は「身代わりにする／見殺しにする」が新規高価値項目。to some extent と adapt to は前出表現の再確認。"
    },
    {
        "no": 260,
        "episode": 26,
        "character": "master",
        "beat": "権藤が最後にグラスを拭きながら核心を一言。",
        "en": "Technology has always replaced tasks, not people — the ones who get phased out are those who refuse to learn what the machine can't do.",
        "ja": "技術はいつだって仕事を置き換えてきた、人をじゃない。淘汰されるのは、機械にできないことを学ぶのを拒む者だけだ。",
        "targets": [
            {
                "item": "refuse to",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "phase out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150",
                "reinforcement": true
            },
            {
                "item": "replace",
                "type": "word",
                "source": "TSL",
                "reinforcement": true
            }
        ],
        "note": "refuse to do で「〜するのを拒む」が新規。get phased out（受動で淘汰される）と replace tasks, not people は前出項目の総括的再確認。"
    },
    {
        "no": 261,
        "episode": 27,
        "character": "takeshi",
        "beat": "在宅勤務を始めて1年経ったタケシが、その良さを切り出す",
        "en": "I've been working from home for a year now, and honestly, ditching the daily commute gave me back two whole hours.",
        "ja": "もう1年も在宅で働いてるけど、正直、毎日の通勤がなくなって丸2時間が戻ってきたよ。",
        "targets": [
            {
                "item": "work from home",
                "type": "collocation",
                "source": "TSL",
                "rank": "primary"
            },
            {
                "item": "commute",
                "type": "word",
                "source": "TSL",
                "rank": "secondary"
            },
            {
                "item": "give back",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 262,
        "episode": 27,
        "character": "yuki",
        "beat": "ユキが在宅の生産性に懐疑的な皮肉を放つ",
        "en": "I'd argue that half the people who claim they're productive at home are really just folding laundry between emails.",
        "ja": "在宅で生産的だって言い張る連中の半分は、メールの合間に洗濯物たたんでるだけだと思うね。",
        "targets": [
            {
                "item": "I'd argue that",
                "type": "function",
                "source": "英検",
                "rank": "primary"
            },
            {
                "item": "productive",
                "type": "word",
                "source": "NGSL",
                "rank": "secondary"
            },
            {
                "item": "claim",
                "type": "word",
                "source": "NGSL",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 263,
        "episode": 27,
        "character": "kenji",
        "beat": "通勤電車に毎日揺られる昭和の部長ケンジが本音を漏らす",
        "en": "My commute eats up three hours a day, so by the time I get home I'm too drained to do anything but collapse.",
        "ja": "通勤に1日3時間も取られるから、帰宅する頃には倒れ込む以外何もできないほど消耗してるよ。",
        "targets": [
            {
                "item": "commute",
                "type": "word",
                "source": "TSL",
                "rank": "primary"
            },
            {
                "item": "eat up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "secondary"
            },
            {
                "item": "drained",
                "type": "word",
                "source": "CEFR",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 264,
        "episode": 27,
        "character": "lisa",
        "beat": "外資マーケのリサが在宅の現実的なデメリットを指摘",
        "en": "The downside is that you miss out on those casual hallway chats where the best ideas actually get sparked.",
        "ja": "デメリットは、一番いいアイデアが実際に生まれる廊下での雑談を逃しちゃうことなのよね。",
        "targets": [
            {
                "item": "the downside is",
                "type": "function",
                "source": "英検",
                "rank": "primary"
            },
            {
                "item": "miss out on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "secondary"
            },
            {
                "item": "spark",
                "type": "word",
                "source": "CEFR",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 265,
        "episode": 27,
        "character": "mina",
        "beat": "派遣のミナが自宅での集中の難しさをカジュアルに告白",
        "en": "I can't stay focused at home for more than ten minutes before I end up scrolling through my phone.",
        "ja": "家だと10分も集中が続かなくて、結局スマホをだらだらスクロールしちゃうんですよ。",
        "targets": [
            {
                "item": "stay focused",
                "type": "collocation",
                "source": "NGSL",
                "rank": "primary"
            },
            {
                "item": "end up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "secondary"
            },
            {
                "item": "scroll through",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "secondary"
            }
        ],
        "pitfall": {
            "wrong": "I can't keep concentrating at home.",
            "why": "\"keep concentrating\"は不自然。集中状態を保つは stay focused / keep focused が自然。"
        }
    },
    {
        "no": 266,
        "episode": 27,
        "character": "takeshi",
        "beat": "在宅を擁護しつつ問題点も認めるタケシ",
        "en": "That said, I'll admit I rolled out of bed and joined a client call in my pajamas more than once.",
        "ja": "とはいえ、ベッドから転がり出てパジャマのままクライアントの通話に出たことが何度かあるのは認めるよ。",
        "targets": [
            {
                "item": "that said",
                "type": "function",
                "source": "英検",
                "rank": "primary"
            },
            {
                "item": "admit",
                "type": "word",
                "source": "NGSL",
                "rank": "secondary"
            },
            {
                "item": "more than once",
                "type": "idiom",
                "source": "NGSL",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 267,
        "episode": 27,
        "character": "kenji",
        "beat": "一人暮らしの部下を気にかけるケンジが孤独に触れる",
        "en": "What worries me is the younger staff working alone all day; some of them end up feeling completely isolated.",
        "ja": "俺が心配なのは一日中一人で働く若手でな、中には完全に孤立したと感じる者も出てくるんだ。",
        "targets": [
            {
                "item": "isolated",
                "type": "word",
                "source": "CEFR",
                "rank": "primary"
            },
            {
                "item": "worry",
                "type": "word",
                "source": "NGSL",
                "rank": "secondary"
            },
            {
                "item": "end up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "secondary",
                "reinforcement": true
            }
        ]
    },
    {
        "no": 268,
        "episode": 27,
        "character": "lisa",
        "beat": "リサが在宅と出社の判断は一律でないと冷静に整理",
        "en": "Before management mandates anything, they should weigh the pros and cons for each team instead of forcing one rigid policy.",
        "ja": "経営陣が何かを義務化する前に、一つの硬直したルールを押しつけるんじゃなく、チームごとにメリットとデメリットを比較検討すべきよ。",
        "targets": [
            {
                "item": "weigh the pros and cons",
                "type": "idiom",
                "source": "NGSL",
                "rank": "primary"
            },
            {
                "item": "mandate",
                "type": "word",
                "source": "CEFR",
                "rank": "secondary"
            },
            {
                "item": "rigid",
                "type": "word",
                "source": "CEFR",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 269,
        "episode": 27,
        "character": "yuki",
        "beat": "在宅で仕事と私生活が混ざる問題をユキが鋭く指摘",
        "en": "If you work from home, you have to set boundaries, or your boss will assume you're available around the clock.",
        "ja": "在宅で働くなら境界線を引かないとダメ、さもないと上司は君が四六時中対応可能だと思い込むからね。",
        "targets": [
            {
                "item": "set boundaries",
                "type": "collocation",
                "source": "CEFR",
                "rank": "primary"
            },
            {
                "item": "work from home",
                "type": "collocation",
                "source": "TSL",
                "rank": "secondary",
                "reinforcement": true
            },
            {
                "item": "around the clock",
                "type": "idiom",
                "source": "NGSL",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 270,
        "episode": 27,
        "character": "master",
        "beat": "寡黙な権藤が議論を締める本質的な一言",
        "en": "In the end, trust is built in person; a screen can carry your words, but it rarely carries what you really mean.",
        "ja": "結局のところ、信頼は対面で築かれる。画面は言葉は運べても、本当に伝えたいことはめったに運ばないものだ。",
        "targets": [
            {
                "item": "in person",
                "type": "idiom",
                "source": "NGSL",
                "rank": "primary"
            },
            {
                "item": "build trust",
                "type": "collocation",
                "source": "NGSL",
                "rank": "secondary"
            },
            {
                "item": "in the end",
                "type": "function",
                "source": "英検",
                "rank": "secondary"
            }
        ]
    },
    {
        "no": 271,
        "episode": 28,
        "character": "yuki",
        "beat": "ビールを一口、まず火種を投げる：金か時間か。",
        "en": "When it comes to a career, most people prioritize money over their own time, and they barely notice the trade-off until they burn out.",
        "ja": "キャリアとなると、たいていの人は自分の時間より金を優先する。燃え尽きるまで、その代償にほとんど気づかないんだ。",
        "targets": [
            {
                "item": "prioritize",
                "type": "word",
                "source": "TSL",
                "rank": "top1000"
            },
            {
                "item": "trade-off",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "when it comes to",
                "type": "idiom",
                "source": "英検"
            },
            {
                "item": "burn out",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ]
    },
    {
        "no": 272,
        "episode": 28,
        "character": "lisa",
        "beat": "帰国子女リサ、外資の現場感で切り返す。",
        "en": "Honestly, it depends on the stage of your life; in my twenties I chased the paycheck, but now I'd rather trade a raise for an extra day off.",
        "ja": "正直、人生のどの段階かによるよ。20代は給料を追いかけたけど、今は昇給より休みが一日増える方がいい。",
        "targets": [
            {
                "item": "it depends on",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "chase the paycheck",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "raise",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "day off",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 273,
        "episode": 28,
        "character": "kenji",
        "beat": "建設部長健二、現場の泥臭い実感で。",
        "en": "After thirty years on site, I've learned that what you truly value isn't the bonus, it's getting home in time to see your kids awake.",
        "ja": "現場で30年やってきて分かったんだ。本当に大事にすべきは賞与じゃない、子どもが起きてるうちに家に帰れることだよ。",
        "targets": [
            {
                "item": "value",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "on site",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "bonus",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "in time",
                "type": "idiom",
                "source": "英検"
            }
        ]
    },
    {
        "no": 274,
        "episode": 28,
        "character": "mina",
        "beat": "派遣ミナ、K-POP漬けの日常からカジュアルに。",
        "en": "More often than not, I'd pick free time over overtime pay, because no amount of cash can buy back a Saturday I spent stuck at the office.",
        "ja": "たいていの場合、残業代より自由時間を選ぶかな。だって、オフィスで潰した土曜日を、いくら金を積んでも買い戻せないもん。",
        "targets": [
            {
                "item": "more often than not",
                "type": "idiom",
                "source": "英検"
            },
            {
                "item": "overtime",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "buy back",
                "type": "phrasal",
                "source": "PHaVE"
            },
            {
                "item": "stuck at",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 275,
        "episode": 28,
        "character": "takeshi",
        "beat": "IT PMタケシ、お調子者が自分の失敗談を笑い話に。",
        "en": "I once took a job purely for the salary, and trust me, that kind of money always comes at a price you don't see on the offer letter.",
        "ja": "昔、給料だけ目当てで転職したことがある。断言するけど、ああいう金には必ず、内定通知書には書いてない代償がついてくるんだ。",
        "targets": [
            {
                "item": "come at a price",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "salary",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "offer letter",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "purely",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "that kind of money comes at a prize",
            "why": "❌ prize（賞品）→ ✅ price（代償・代金）。発音が近く混同しやすい。come at a price は「相応の代償を伴う」の定型。"
        }
    },
    {
        "no": 276,
        "episode": 28,
        "character": "lisa",
        "beat": "リサ、ビジネス実務目線で長期視点を持ち込む。",
        "en": "Chasing a fat salary can pay off in the short term, but in the long run, the relationships you neglect tend to cost you far more.",
        "ja": "高い給料を追うのは短期的には報われることもあるけど、長い目で見れば、ないがしろにした人間関係の方がよほど高くつくものよ。",
        "targets": [
            {
                "item": "in the long run",
                "type": "idiom",
                "source": "英検"
            },
            {
                "item": "pay off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "neglect",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "in the short term",
                "type": "idiom",
                "source": "英検"
            }
        ]
    },
    {
        "no": 277,
        "episode": 28,
        "character": "yuki",
        "beat": "ユキ、酒が回って皮肉が冴える。",
        "en": "Plenty of people settle for a job they hate just to keep up appearances, and then wonder why their weekends feel so empty.",
        "ja": "嫌いな仕事で妥協する奴は山ほどいる。体裁を保つためだけにな。そのくせ、なぜ週末がこんなに虚しいのか不思議がるんだ。",
        "targets": [
            {
                "item": "settle for",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "keep up appearances",
                "type": "idiom",
                "source": "英検"
            },
            {
                "item": "plenty of",
                "type": "function",
                "source": "NGSL"
            },
            {
                "item": "wonder why",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 278,
        "episode": 28,
        "character": "kenji",
        "beat": "健二、部下を思い出しながらしんみり。",
        "en": "Young guys today take a steady paycheck for granted, but I remember a recession where just having work felt like a real blessing.",
        "ja": "今の若い連中は安定した給料を当たり前だと思ってる。だが俺は、仕事があるだけでありがたいと思えた不況を覚えてるよ。",
        "targets": [
            {
                "item": "take (something) for granted",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "steady",
                "type": "word",
                "source": "NGSL"
            },
            {
                "item": "recession",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "blessing",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 279,
        "episode": 28,
        "character": "takeshi",
        "beat": "タケシ、前向きに自分なりの結論を出す。",
        "en": "All things considered, I'd rather earn a little less and actually enjoy my days off than grind myself into the ground for a promotion.",
        "ja": "あれこれ考え合わせると、昇進のために身を粉にして働くより、稼ぎは少し減っても休みを心から楽しむ方がいいな。",
        "targets": [
            {
                "item": "all things considered",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "would rather",
                "type": "function",
                "source": "英検"
            },
            {
                "item": "grind oneself into the ground",
                "type": "idiom",
                "source": "英検"
            },
            {
                "item": "promotion",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 280,
        "episode": 28,
        "character": "master",
        "beat": "金より時間か。マスターが核心を締める。",
        "en": "In the end, a good life boils down to spending your hours on what you can't get back.",
        "ja": "結局、いい人生ってのは、取り戻せない時間を何に使うかに尽きる。",
        "targets": [
            {
                "item": "boil down to",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "in the end",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "get back (retrieve)",
                "type": "phrasal",
                "source": "PHaVE"
            }
        ],
        "note": "boil down to = 結局〜に尽きる/要約される。議論の締めで頻出。"
    },
    {
        "no": 281,
        "episode": 29,
        "character": "yuki",
        "beat": "昇進会議で「学歴」だけを根拠に推された候補者を見て、酒を片手に皮肉る。",
        "en": "They picked him purely on his qualifications, but honestly, a degree and real experience are two completely different things.",
        "ja": "あいつは完全に学歴だけで選ばれたけど、正直、肩書きと実際の経験はまったくの別物だよ。",
        "targets": [
            {
                "item": "qualification vs experience",
                "type": "collocation",
                "source": "CEFR",
                "rank": "B2"
            },
            {
                "item": "purely",
                "type": "word",
                "source": "NGSL",
                "rank": "top2000"
            },
            {
                "item": "completely different",
                "type": "collocation",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 282,
        "episode": 29,
        "character": "lisa",
        "beat": "外資の採用面接で、新卒の学歴より現場対応力を重視する自社方針を説明する。",
        "en": "In our hiring, a top university degree doesn't necessarily mean someone can handle clients under pressure.",
        "ja": "うちの採用では、一流大学の学位が、プレッシャーの中で顧客に対応できることを必ずしも意味するわけじゃない。",
        "targets": [
            {
                "item": "not necessarily",
                "type": "function",
                "source": "英検",
                "rank": "準1級"
            },
            {
                "item": "under pressure",
                "type": "collocation",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "handle (clients)",
                "type": "word",
                "source": "NGSL",
                "rank": "top1000"
            }
        ]
    },
    {
        "no": 283,
        "episode": 29,
        "character": "takeshi",
        "beat": "資格を取ったのに現場で通用せず苦労した過去を、笑いながら打ち明ける。",
        "en": "I passed every certification exam, but on my first project I realized hands-on skills matter far more than a piece of paper.",
        "ja": "資格試験は全部合格したけど、最初のプロジェクトで、紙切れより実践的なスキルの方がはるかに大事だと痛感したよ。",
        "targets": [
            {
                "item": "hands-on",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "matter (more than)",
                "type": "word",
                "source": "NGSL",
                "rank": "top1000"
            },
            {
                "item": "certification exam",
                "type": "collocation",
                "source": "CEFR",
                "rank": "B2"
            }
        ],
        "pitfall": {
            "wrong": "hands-on skills matter much than a paper",
            "why": "比較級の強調は much ではなく far/much more。matter は自動詞で目的語を取らず matter more than の形。また「紙切れ」は a piece of paper が自然で a paper は論文の意になりがち。"
        }
    },
    {
        "no": 284,
        "episode": 29,
        "character": "kenji",
        "beat": "高卒だが現場を支えてきた古参の部下が、学歴で昇進から外された件を悔しがる。",
        "en": "Broadly speaking, the guys who actually keep our sites running learned everything on the job, not in a lecture hall.",
        "ja": "大まかに言えば、うちの現場を実際に回してる連中は、何もかも仕事の中で覚えたんだ。講義室じゃなくてな。",
        "targets": [
            {
                "item": "broadly speaking",
                "type": "function",
                "source": "英検",
                "rank": "準1級"
            },
            {
                "item": "keep (something) running",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "on the job",
                "type": "idiom",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 285,
        "episode": 29,
        "character": "lisa",
        "beat": "良い大学は学位そのものより「考え方を鍛える」点に価値があると論じる。",
        "en": "A good school is supposed to foster the skills to think for yourself, not just hand out a credential.",
        "ja": "良い学校というのは、ただ資格を配るんじゃなくて、自分の頭で考える力を育てるためにあるはずなんだ。",
        "targets": [
            {
                "item": "foster (skills)",
                "type": "word",
                "source": "CEFR",
                "rank": "B2"
            },
            {
                "item": "think for yourself",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "hand out",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 286,
        "episode": 29,
        "character": "yuki",
        "beat": "学歴は手段であって目的化している社会への違和感を、酔いに任せて吐き出す。",
        "en": "Everyone treats the diploma like the goal itself, but a degree is just a means to an end.",
        "ja": "みんな卒業証書をゴールそのものみたいに扱うけど、学位なんて目的を達成するための手段にすぎないんだよ。",
        "targets": [
            {
                "item": "a means to an end",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "treat (something) like",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "the goal itself",
                "type": "collocation",
                "source": "CEFR",
                "rank": "B1"
            }
        ]
    },
    {
        "no": 287,
        "episode": 29,
        "character": "mina",
        "beat": "K-POPで英語を独学した経験から、教室の外でも学べると素朴に言う。",
        "en": "I tend to think you learn fastest when you're genuinely into something, even outside a classroom.",
        "ja": "私はね、何かに本気でハマってるときが一番早く身につくと思うんだ。たとえ教室の外でもね。",
        "targets": [
            {
                "item": "I tend to think",
                "type": "function",
                "source": "英検",
                "rank": "準1級"
            },
            {
                "item": "be into (something)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "genuinely",
                "type": "word",
                "source": "NGSL",
                "rank": "top2000"
            }
        ]
    },
    {
        "no": 288,
        "episode": 29,
        "character": "takeshi",
        "beat": "技術の進歩が速い業界で、学び続ける重要性を前向きに語る。",
        "en": "In tech, you have to keep up with the times, or the skills you studied for years go obsolete overnight.",
        "ja": "IT業界じゃ、時代についていかないと、何年もかけて学んだスキルが一晩で時代遅れになるんだ。",
        "targets": [
            {
                "item": "keep up (with the times)",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "go obsolete",
                "type": "collocation",
                "source": "CEFR",
                "rank": "B2"
            },
            {
                "item": "overnight",
                "type": "word",
                "source": "NGSL",
                "rank": "top2000"
            }
        ]
    },
    {
        "no": 289,
        "episode": 29,
        "character": "kenji",
        "beat": "地道に若手を育てた投資が後で実を結んだ経験を、しみじみ語る。",
        "en": "Training those young workers patiently was a pain at first, but it really paid dividends in the long run.",
        "ja": "あの若手をじっくり育てるのは最初こそ骨が折れたが、長い目で見れば本当に実を結んだよ。",
        "targets": [
            {
                "item": "pay dividends",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "in the long run",
                "type": "idiom",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "patiently",
                "type": "word",
                "source": "NGSL",
                "rank": "top2000"
            }
        ]
    },
    {
        "no": 290,
        "episode": 29,
        "character": "master",
        "beat": "全員の議論を黙って聞いた末、教育の本質を一言で締める。",
        "en": "The bottom line is, education isn't about the certificate; it's about who you become while earning it.",
        "ja": "要するに、教育とは証書のことじゃない。それを手にする過程で、どんな人間になるかだ。",
        "targets": [
            {
                "item": "the bottom line is",
                "type": "function",
                "source": "英検",
                "rank": "準1級"
            },
            {
                "item": "isn't about",
                "type": "collocation",
                "source": "NGSL"
            },
            {
                "item": "who you become",
                "type": "collocation",
                "source": "CEFR",
                "rank": "B2"
            }
        ]
    },
    {
        "no": 291,
        "episode": 30,
        "character": "yuki",
        "beat": "権藤が引退をほのめかし、ユキが皮肉まじりに将来を読む",
        "en": "Knowing him, he'll wind up reopening this place six months after he 'retires.'",
        "ja": "あの人のことだから、『引退』した半年後にはこの店をまた開けてるに決まってる。",
        "targets": [
            {
                "item": "wind up",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "knowing (someone)",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "reopen",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "he'll wind up to reopen this place",
            "why": "wind up は動名詞をとる（wind up doing）。to 不定詞は不可。❌wind up to reopen → ✅wind up reopening。"
        }
    },
    {
        "no": 292,
        "episode": 30,
        "character": "master",
        "beat": "権藤が長年の商売を振り返り、本質を一言で締める",
        "en": "In the end, a bar isn't about the drinks; it's about who stays after the rush dies down.",
        "ja": "結局のところ、酒場は酒じゃない。混雑が引いたあとに残るのが誰か、ということなんだ。",
        "targets": [
            {
                "item": "in the end",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "die down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "rush",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 293,
        "episode": 30,
        "character": "lisa",
        "beat": "リサがマーケ目線で、引退後の事業継承を現実的に語る",
        "en": "If you want the brand to move forward without you, you need to hand over the recipes well before you step down.",
        "ja": "あなた抜きでこの看板を前に進めたいなら、退く前に余裕をもってレシピを引き継いでおく必要があるわ。",
        "targets": [
            {
                "item": "move forward",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "hand over",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "step down",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 294,
        "episode": 30,
        "character": "kenji",
        "beat": "建設部長ケンジが、退職した先輩の姿に自分を重ねて感情的になる",
        "en": "When all is said and done, the guys who train their successors are the ones who get sent off with a real toast.",
        "ja": "結局のところ、後継者をちゃんと育てた奴こそが、心からの乾杯で送り出されるんだよ。",
        "targets": [
            {
                "item": "when all is said and done",
                "type": "idiom",
                "source": "英検"
            },
            {
                "item": "successor",
                "type": "word",
                "source": "TSL"
            },
            {
                "item": "send off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    },
    {
        "no": 295,
        "episode": 30,
        "character": "takeshi",
        "beat": "タケシが転職に失敗した過去を笑い話にして前向きに語る",
        "en": "My first startup flopped, but I just shrugged it off and carried on to the next idea.",
        "ja": "最初の起業はコケたけど、まあ気にせず流して、次のアイデアに進んだだけだよ。",
        "targets": [
            {
                "item": "carry on",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "shrug off",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "flop",
                "type": "word",
                "source": "NGSL"
            }
        ],
        "pitfall": {
            "wrong": "I carried on the next idea.",
            "why": "「次へ進む」の意味では carry on to (the next) と前置詞 to が要る。carry on + 名詞は『〜を続ける』の別義。❌carried on the next idea → ✅carried on to the next idea。"
        }
    },
    {
        "no": 296,
        "episode": 30,
        "character": "mina",
        "beat": "派遣のミナが、権藤の店が昔の常連の店だった話を聞いて驚く",
        "en": "So this place has basically come full circle, since it used to belong to the regular who sits in the corner.",
        "ja": "じゃあこの店、結局ぐるっと一周してきたんですね。だって元々、あの隅っこに座ってる常連さんの店だったんだから。",
        "targets": [
            {
                "item": "come full circle",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "belong to",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "regular",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 297,
        "episode": 30,
        "character": "lisa",
        "beat": "リサが、残された時間をどう使うか権藤に助言する",
        "en": "Whatever you decide, make the most of the time you've got left behind that counter.",
        "ja": "何を決めるにせよ、そのカウンターの内側で残された時間を最大限に活かしてね。",
        "targets": [
            {
                "item": "make the most of",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "have got left",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "whatever",
                "type": "function",
                "source": "CEFR"
            }
        ]
    },
    {
        "no": 298,
        "episode": 30,
        "character": "kenji",
        "beat": "ケンジが、苦労続きだった現場人生をしみじみ肯定する",
        "en": "I've got plenty to complain about, but on a night like this I count my blessings instead.",
        "ja": "文句なら山ほどあるけどさ、こういう夜は逆に、恵まれてることを数えるんだよ。",
        "targets": [
            {
                "item": "count one's blessings",
                "type": "idiom",
                "source": "NGSL"
            },
            {
                "item": "plenty to (do)",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "complain",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 299,
        "episode": 30,
        "character": "yuki",
        "beat": "ユキがグラスを上げ、権藤の長い年月に乾杯する",
        "en": "Here's to thirty years of putting up with all of us, even when we didn't deserve it.",
        "ja": "私たち全員に、しかも値しない時でさえ、付き合ってくれた三十年に乾杯。",
        "targets": [
            {
                "item": "here's to (something)",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "put up with",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            },
            {
                "item": "deserve",
                "type": "word",
                "source": "NGSL"
            }
        ]
    },
    {
        "no": 300,
        "episode": 30,
        "character": "master",
        "beat": "権藤が後継のユキたちに店の未来を託す、締めの箴言",
        "en": "I've poured my last lesson into this counter; from here on, the rest is up to you.",
        "ja": "最後の教えはこのカウンターに注ぎ込んだ。ここから先は、お前たち次第だ。",
        "targets": [
            {
                "item": "the rest is up to you",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "from here on",
                "type": "function",
                "source": "CEFR"
            },
            {
                "item": "pour into",
                "type": "phrasal",
                "source": "PHaVE",
                "rank": "top150"
            }
        ]
    }
];
