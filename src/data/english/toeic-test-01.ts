/**
 * TOEIC(R) L&R 形式 フル模試 01 -- 自動生成データ (scripts/assemble-toeic.cjs) に
 * 品質改訂 v2 を適用済み (Part5 選択肢差し替え+シャッフル / Part6 出題タイプ再配分 /
 * Part7 196-200 日付整合)。再生成すると改訂が消えるので注意。
 *
 * 非公式のオリジナル模試。ETS および TOEIC 実施団体とは一切無関係。
 * 問題・本文・スクリプトはすべてオリジナルで、実試験の転載ではない。
 * スタイル仕様: docs/toeic-style-spec.md
 */
import type { ToeicTest } from './toeic-types';

export const TOEIC_TEST_01: ToeicTest = {
  "id": "toeic-test-01",
  "title": "TOEIC(R) L&R 形式 フル模試 01",
  "part1": [
    {
      "no": 1,
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='white'/><line x1='20' y1='262' x2='380' y2='262' stroke='#78716C' stroke-width='3'/><rect x='120' y='168' width='210' height='12' fill='#D4AF37'/><rect x='132' y='180' width='9' height='82' fill='#78716C'/><rect x='308' y='180' width='9' height='82' fill='#78716C'/><rect x='215' y='120' width='64' height='44' rx='3' fill='#1C1917'/><rect x='220' y='125' width='54' height='34' fill='#10B981'/><rect x='208' y='162' width='78' height='7' rx='2' fill='#78716C'/><rect x='296' y='150' width='16' height='18' fill='#D4AF37'/><rect x='126' y='106' width='9' height='70' fill='#78716C'/><rect x='126' y='172' width='52' height='9' fill='#78716C'/><rect x='148' y='181' width='9' height='81' fill='#78716C'/><circle cx='162' cy='96' r='17' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='145' y='114' width='34' height='58' rx='9' fill='#10B981'/><line x1='174' y1='130' x2='214' y2='163' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='172' y1='144' x2='206' y2='166' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/></svg>",
      "sceneDescription": "A woman is typing on a laptop at an office desk.",
      "statements": [
        {
          "label": "A",
          "text": "She is typing on a laptop."
        },
        {
          "label": "B",
          "text": "She is watering a plant."
        },
        {
          "label": "C",
          "text": "She is talking on the telephone."
        },
        {
          "label": "D",
          "text": "She is tying her shoes."
        }
      ],
      "answer": "A",
      "note": "机に向かってノートPCのキーボードに両手を伸ばしている描写なので typing on a laptop が正解。植物や電話は絵に無く、tying は typing と音が似ているだけの引っかけ。",
      "transcript": "Look at the picture marked number 1. (A) She is typing on a laptop. (B) She is watering a plant. (C) She is talking on the telephone. (D) She is tying her shoes."
    },
    {
      "no": 2,
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='white'/><line x1='10' y1='252' x2='390' y2='252' stroke='#78716C' stroke-width='3'/><rect x='48' y='170' width='12' height='82' fill='#78716C'/><circle cx='54' cy='148' r='34' fill='#10B981'/><circle cx='185' cy='110' r='16' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='170' y='127' width='30' height='58' rx='8' fill='#D4AF37'/><line x1='178' y1='185' x2='174' y2='250' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='192' y1='185' x2='198' y2='250' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='198' y1='140' x2='240' y2='158' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><rect x='232' y='150' width='42' height='30' rx='5' fill='#78716C' transform='rotate(18 253 165)'/><line x1='272' y1='162' x2='300' y2='184' stroke='#78716C' stroke-width='7' stroke-linecap='round'/><path d='M 240 148 Q 255 130 270 146' stroke='#78716C' stroke-width='4' fill='none'/><line x1='298' y1='190' x2='294' y2='206' stroke='#10B981' stroke-width='3' stroke-linecap='round'/><line x1='308' y1='192' x2='306' y2='208' stroke='#10B981' stroke-width='3' stroke-linecap='round'/><line x1='318' y1='190' x2='320' y2='206' stroke='#10B981' stroke-width='3' stroke-linecap='round'/><line x1='300' y1='252' x2='300' y2='224' stroke='#10B981' stroke-width='3'/><line x1='322' y1='252' x2='322' y2='218' stroke='#10B981' stroke-width='3'/><line x1='344' y1='252' x2='344' y2='226' stroke='#10B981' stroke-width='3'/><circle cx='300' cy='217' r='8' fill='#D4AF37'/><circle cx='322' cy='211' r='8' fill='#D4AF37'/><circle cx='344' cy='219' r='8' fill='#D4AF37'/></svg>",
      "sceneDescription": "A man is watering flowers with a watering can in a park.",
      "statements": [
        {
          "label": "A",
          "text": "He is watering some flowers."
        },
        {
          "label": "B",
          "text": "He is walking along a path."
        },
        {
          "label": "C",
          "text": "He is cutting the grass."
        },
        {
          "label": "D",
          "text": "He is planting a tree."
        }
      ],
      "answer": "A",
      "note": "じょうろを傾けて花に水をかけている場面なので watering some flowers が正解。walking は watering と音が似た引っかけで、草を刈る動作や木を植える動作は絵に無い。",
      "transcript": "Look at the picture marked number 2. (A) He is watering some flowers. (B) He is walking along a path. (C) He is cutting the grass. (D) He is planting a tree."
    },
    {
      "no": 3,
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='white'/><line x1='20' y1='262' x2='380' y2='262' stroke='#78716C' stroke-width='3'/><rect x='30' y='62' width='110' height='8' fill='#78716C'/><rect x='38' y='40' width='22' height='22' fill='#D4AF37'/><rect x='66' y='40' width='22' height='22' fill='#10B981'/><rect x='94' y='40' width='22' height='22' fill='#E7DCBE'/><rect x='30' y='114' width='110' height='8' fill='#78716C'/><rect x='44' y='92' width='22' height='22' fill='#E7DCBE'/><rect x='78' y='92' width='22' height='22' fill='#D4AF37'/><rect x='150' y='170' width='140' height='14' fill='#D4AF37'/><rect x='150' y='184' width='140' height='78' fill='#E7DCBE' stroke='#78716C' stroke-width='2'/><rect x='158' y='140' width='34' height='30' fill='#1C1917'/><circle cx='212' cy='92' r='15' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='197' y='108' width='30' height='62' rx='8' fill='#10B981'/><line x1='227' y1='124' x2='256' y2='140' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><rect x='250' y='138' width='30' height='34' fill='#D4AF37' stroke='#1C1917' stroke-width='2'/><path d='M 256 138 Q 265 122 274 138' stroke='#1C1917' stroke-width='3' fill='none'/><circle cx='330' cy='96' r='15' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='315' y='112' width='30' height='66' rx='8' fill='#78716C'/><line x1='315' y1='130' x2='282' y2='144' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='323' y1='178' x2='320' y2='262' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='337' y1='178' x2='342' y2='262' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/></svg>",
      "sceneDescription": "A clerk is handing a shopping bag to a customer across a store counter.",
      "statements": [
        {
          "label": "A",
          "text": "They are stocking the shelves."
        },
        {
          "label": "B",
          "text": "A clerk is handing a bag to a customer."
        },
        {
          "label": "C",
          "text": "A customer is trying on a coat."
        },
        {
          "label": "D",
          "text": "People are waiting in a long line."
        }
      ],
      "answer": "B",
      "note": "カウンター越しに店員が客へ買い物袋を差し出している場面なので handing a bag to a customer が正解。棚に商品を並べる動作、試着、行列はいずれも絵に描かれていない。",
      "transcript": "Look at the picture marked number 3. (A) They are stocking the shelves. (B) A clerk is handing a bag to a customer. (C) A customer is trying on a coat. (D) People are waiting in a long line."
    },
    {
      "no": 4,
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='white'/><line x1='10' y1='262' x2='390' y2='262' stroke='#78716C' stroke-width='3'/><rect x='20' y='40' width='8' height='222' fill='#78716C'/><rect x='150' y='40' width='8' height='222' fill='#78716C'/><rect x='20' y='90' width='138' height='6' fill='#78716C'/><rect x='20' y='152' width='138' height='6' fill='#78716C'/><rect x='34' y='60' width='28' height='28' fill='#D4AF37'/><rect x='70' y='60' width='28' height='28' fill='#E7DCBE'/><rect x='106' y='60' width='28' height='28' fill='#D4AF37'/><rect x='40' y='122' width='28' height='28' fill='#E7DCBE'/><rect x='82' y='122' width='28' height='28' fill='#D4AF37'/><rect x='230' y='222' width='90' height='8' fill='#78716C'/><circle cx='245' cy='240' r='10' fill='#1C1917'/><circle cx='305' cy='240' r='10' fill='#1C1917'/><line x1='232' y1='222' x2='212' y2='182' stroke='#78716C' stroke-width='5' stroke-linecap='round'/><rect x='240' y='190' width='34' height='32' fill='#D4AF37' stroke='#1C1917' stroke-width='2'/><rect x='278' y='196' width='28' height='26' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><circle cx='180' cy='140' r='15' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='168' y='156' width='28' height='55' rx='8' fill='#10B981' transform='rotate(12 182 183)'/><line x1='196' y1='164' x2='214' y2='182' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='182' y1='210' x2='172' y2='260' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='190' y1='210' x2='198' y2='258' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><circle cx='358' cy='128' r='15' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='344' y='144' width='28' height='58' rx='8' fill='#D4AF37'/><rect x='318' y='150' width='30' height='28' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><line x1='348' y1='152' x2='326' y2='166' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='368' y1='152' x2='344' y2='176' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='350' y1='202' x2='348' y2='260' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/><line x1='364' y1='202' x2='368' y2='260' stroke='#1C1917' stroke-width='5' stroke-linecap='round'/></svg>",
      "sceneDescription": "One worker is pushing a cart loaded with boxes while another worker carries a box in a warehouse.",
      "statements": [
        {
          "label": "A",
          "text": "Some boxes are being opened."
        },
        {
          "label": "B",
          "text": "The men are sweeping the floor."
        },
        {
          "label": "C",
          "text": "A forklift is being repaired."
        },
        {
          "label": "D",
          "text": "One of the men is pushing a cart."
        }
      ],
      "answer": "D",
      "note": "箱を載せたカートのハンドルを男性が押している倉庫の場面なので pushing a cart が正解。ほうきで掃く動作は無く、フォークリフトも描かれていない。箱は積まれているだけで開けられてはいない。",
      "transcript": "Look at the picture marked number 4. (A) Some boxes are being opened. (B) The men are sweeping the floor. (C) A forklift is being repaired. (D) One of the men is pushing a cart."
    },
    {
      "no": 5,
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='white'/><line x1='10' y1='262' x2='390' y2='262' stroke='#78716C' stroke-width='3'/><line x1='110' y1='0' x2='110' y2='58' stroke='#1C1917' stroke-width='2'/><path d='M 94 58 L 126 58 L 118 78 L 102 78 Z' fill='#D4AF37'/><line x1='290' y1='0' x2='290' y2='58' stroke='#1C1917' stroke-width='2'/><path d='M 274 58 L 306 58 L 298 78 L 282 78 Z' fill='#D4AF37'/><rect x='50' y='168' width='120' height='10' fill='#D4AF37'/><rect x='58' y='178' width='8' height='84' fill='#78716C'/><rect x='154' y='178' width='8' height='84' fill='#78716C'/><ellipse cx='85' cy='166' rx='14' ry='5' fill='white' stroke='#1C1917' stroke-width='2'/><ellipse cx='135' cy='166' rx='14' ry='5' fill='white' stroke='#1C1917' stroke-width='2'/><rect x='104' y='146' width='7' height='20' fill='#10B981'/><rect x='116' y='146' width='7' height='20' fill='#10B981'/><rect x='24' y='150' width='8' height='60' fill='#78716C'/><rect x='24' y='206' width='30' height='8' fill='#78716C'/><rect x='36' y='214' width='8' height='48' fill='#78716C'/><rect x='230' y='168' width='120' height='10' fill='#D4AF37'/><rect x='238' y='178' width='8' height='84' fill='#78716C'/><rect x='334' y='178' width='8' height='84' fill='#78716C'/><ellipse cx='265' cy='166' rx='14' ry='5' fill='white' stroke='#1C1917' stroke-width='2'/><ellipse cx='315' cy='166' rx='14' ry='5' fill='white' stroke='#1C1917' stroke-width='2'/><rect x='284' y='146' width='7' height='20' fill='#10B981'/><rect x='296' y='146' width='7' height='20' fill='#10B981'/><rect x='366' y='150' width='8' height='60' fill='#78716C'/><rect x='344' y='206' width='30' height='8' fill='#78716C'/><rect x='356' y='214' width='8' height='48' fill='#78716C'/></svg>",
      "sceneDescription": "Empty restaurant tables have been set with plates and glasses.",
      "statements": [
        {
          "label": "A",
          "text": "A meal is being served to some diners."
        },
        {
          "label": "B",
          "text": "Chairs are being stacked in a corner."
        },
        {
          "label": "C",
          "text": "Some tables have been set for a meal."
        },
        {
          "label": "D",
          "text": "A waiter is taking an order."
        }
      ],
      "answer": "C",
      "note": "人のいないレストランで皿とグラスがテーブルに並べてある状態なので、完了を表す受動態 have been set for a meal が正解。being served や being stacked のような進行中の受動態は動作の主が必要だが、絵に人は写っていない。",
      "transcript": "Look at the picture marked number 5. (A) A meal is being served to some diners. (B) Chairs are being stacked in a corner. (C) Some tables have been set for a meal. (D) A waiter is taking an order."
    },
    {
      "no": 6,
      "svg": "<svg viewBox='0 0 400 300' xmlns='http://www.w3.org/2000/svg'><rect width='400' height='300' fill='white'/><rect x='10' y='236' width='380' height='8' fill='#D4AF37'/><line x1='10' y1='250' x2='390' y2='250' stroke='#1C1917' stroke-width='3'/><rect x='60' y='92' width='8' height='144' fill='#78716C'/><rect x='30' y='60' width='68' height='32' rx='4' fill='#10B981'/><text x='64' y='83' font-size='18' fill='white' text-anchor='middle' font-family='sans-serif'>2</text><rect x='250' y='190' width='110' height='10' fill='#78716C'/><rect x='250' y='150' width='110' height='8' fill='#78716C'/><rect x='260' y='158' width='8' height='32' fill='#78716C'/><rect x='342' y='158' width='8' height='32' fill='#78716C'/><rect x='260' y='200' width='8' height='36' fill='#1C1917'/><rect x='342' y='200' width='8' height='36' fill='#1C1917'/><rect x='150' y='196' width='80' height='40' rx='4' fill='#10B981' stroke='#1C1917' stroke-width='2'/><rect x='158' y='160' width='64' height='36' rx='4' fill='#D4AF37' stroke='#1C1917' stroke-width='2'/><rect x='166' y='130' width='48' height='30' rx='4' fill='#E7DCBE' stroke='#1C1917' stroke-width='2'/><rect x='182' y='118' width='16' height='12' rx='5' fill='none' stroke='#1C1917' stroke-width='3'/></svg>",
      "sceneDescription": "Suitcases have been stacked next to a bench on a station platform.",
      "statements": [
        {
          "label": "A",
          "text": "Passengers are boarding a train."
        },
        {
          "label": "B",
          "text": "Some suitcases have been stacked next to a bench."
        },
        {
          "label": "C",
          "text": "Tickets are being checked at a gate."
        },
        {
          "label": "D",
          "text": "A bench is being painted."
        }
      ],
      "answer": "B",
      "note": "駅のホームでベンチの隣にスーツケースが三つ積み重ねてある状態なので have been stacked next to a bench が正解。乗客も係員も写っておらず、boarding や being painted のような進行中の動作は成立しない。",
      "transcript": "Look at the picture marked number 6. (A) Passengers are boarding a train. (B) Some suitcases have been stacked next to a bench. (C) Tickets are being checked at a gate. (D) A bench is being painted."
    }
  ],
  "part2": [
    {
      "no": 7,
      "prompt": "Where will the client presentation take place?",
      "responses": [
        {
          "label": "A",
          "text": "Next Tuesday afternoon."
        },
        {
          "label": "B",
          "text": "In the main conference room."
        },
        {
          "label": "C",
          "text": "He already presented it."
        }
      ],
      "answer": "B",
      "note": "場所を尋ねる Where 疑問文なので、場所を答える In the main conference room が正解。Next Tuesday afternoon は時を答えていて疑問詞に合わず、presented は presentation からの連想を狙った引っかけ。"
    },
    {
      "no": 8,
      "prompt": "When does the pharmacy on Delford Street close?",
      "responses": [
        {
          "label": "A",
          "text": "Two aspirin, please."
        },
        {
          "label": "B",
          "text": "It's close to the bank."
        },
        {
          "label": "C",
          "text": "At nine on weekdays."
        }
      ],
      "answer": "C",
      "note": "閉店時刻を尋ねる When への応答なので At nine on weekdays が正解。close(閉まる)と close(近い)の同音異義を使った引っかけと、薬局からの連想語 aspirin はどちらも問いに答えていない。"
    },
    {
      "no": 9,
      "prompt": "Have you finished reviewing the budget report?",
      "responses": [
        {
          "label": "A",
          "text": "Almost, I have two pages left."
        },
        {
          "label": "B",
          "text": "It was over budget last year."
        },
        {
          "label": "C",
          "text": "A room with a nice view."
        }
      ],
      "answer": "A",
      "note": "終わったかどうかを聞く Yes-No 疑問文への自然な応答は Almost, I have two pages left。view は reviewing と音が似た引っかけで、over budget は質問中の budget を繰り返しただけの連想の罠。"
    },
    {
      "no": 10,
      "prompt": "Who is organizing the company picnic this year?",
      "responses": [
        {
          "label": "A",
          "text": "Ms. Villanueva volunteered to do it."
        },
        {
          "label": "B",
          "text": "In Greendale Park."
        },
        {
          "label": "C",
          "text": "Yes, I'm planning to go."
        }
      ],
      "answer": "A",
      "note": "Who には人で答える Ms. Villanueva volunteered to do it が正解。Greendale Park は場所を答えていて疑問詞違い、Yes は WH 疑問文への応答として成立しない。"
    },
    {
      "no": 11,
      "prompt": "The printer on the second floor is out of toner again.",
      "responses": [
        {
          "label": "A",
          "text": "No, I printed it in color."
        },
        {
          "label": "B",
          "text": "The piano is out of tune."
        },
        {
          "label": "C",
          "text": "I'll ask Facilities to replace it."
        }
      ],
      "answer": "C",
      "note": "トナー切れという報告への対応を申し出る I'll ask Facilities to replace it が正解。printed は printer の派生語を使った引っかけで、out of tune は out of toner と音が重なるだけの文脈無関係な罠。"
    },
    {
      "no": 12,
      "prompt": "How many people have signed up for the safety training?",
      "responses": [
        {
          "label": "A",
          "text": "The sign is by the entrance."
        },
        {
          "label": "B",
          "text": "Twenty-three so far."
        },
        {
          "label": "C",
          "text": "It starts at ten o'clock."
        }
      ],
      "answer": "B",
      "note": "人数を尋ねる How many には数字で答える Twenty-three so far が正解。sign は signed up と音が重なる引っかけで、開始時刻は When に対する応答。"
    },
    {
      "no": 13,
      "prompt": "Is the shuttle to the airport running today?",
      "responses": [
        {
          "label": "A",
          "text": "A window seat, please."
        },
        {
          "label": "B",
          "text": "I ran five kilometers this morning."
        },
        {
          "label": "C",
          "text": "Yes, every thirty minutes."
        }
      ],
      "answer": "C",
      "note": "運行しているかの Yes-No 疑問文なので Yes, every thirty minutes が正解。ran は running と音が似た引っかけで、window seat は空港からの連想語にすぎない。"
    },
    {
      "no": 14,
      "prompt": "You've met the new accountant, haven't you?",
      "responses": [
        {
          "label": "A",
          "text": "Yes, we spoke at the orientation."
        },
        {
          "label": "B",
          "text": "The account was closed last month."
        },
        {
          "label": "C",
          "text": "Around noon works for me."
        }
      ],
      "answer": "A",
      "note": "会ったかどうかの付加疑問への応答として Yes, we spoke at the orientation が正解。account は accountant と音が重なる引っかけで、時間の提案は会話の流れに合わない。"
    },
    {
      "no": 15,
      "prompt": "Why was the staff meeting moved to Thursday?",
      "responses": [
        {
          "label": "A",
          "text": "To the fourth floor."
        },
        {
          "label": "B",
          "text": "Because Mr. Adeyemi is traveling on Wednesday."
        },
        {
          "label": "C",
          "text": "It lasted about an hour."
        }
      ],
      "answer": "B",
      "note": "理由を尋ねる Why には Because Mr. Adeyemi is traveling on Wednesday が正解。To the fourth floor は moved からの連想で場所の移動と誤解させる引っかけ、所要時間は問われていない。"
    },
    {
      "no": 16,
      "prompt": "Would you like the quarterly figures printed out or sent as a file?",
      "responses": [
        {
          "label": "A",
          "text": "A file would be easier, thanks."
        },
        {
          "label": "B",
          "text": "Yes, please."
        },
        {
          "label": "C",
          "text": "About four quarters."
        }
      ],
      "answer": "A",
      "note": "二択の選択疑問文には一方を選ぶ A file would be easier が正解。選択疑問文に Yes では答えられず、four quarters は quarterly の音の繰り返しを使った引っかけ。"
    },
    {
      "no": 17,
      "prompt": "When will the lobby renovation be finished?",
      "responses": [
        {
          "label": "A",
          "text": "It's on the ground floor."
        },
        {
          "label": "B",
          "text": "A fresh coat of paint."
        },
        {
          "label": "C",
          "text": "The contractor is giving us an update tomorrow."
        }
      ],
      "answer": "C",
      "note": "完了時期を直接答えず「明日業者から報告がある」と状況で返す The contractor is giving us an update tomorrow が正解の間接応答。場所の説明は疑問詞に合わず、coat of paint は改装からの単なる連想語。"
    },
    {
      "no": 18,
      "prompt": "Do you know if Ms. Bhatt has approved the travel request?",
      "responses": [
        {
          "label": "A",
          "text": "I prefer an aisle seat."
        },
        {
          "label": "B",
          "text": "Yes, she signed it this morning."
        },
        {
          "label": "C",
          "text": "It proved very popular."
        }
      ],
      "answer": "B",
      "note": "承認されたかどうかの問いに Yes, she signed it this morning と答えるのが正解。aisle seat は travel からの連想で、proved は approved と音が似た引っかけ。"
    },
    {
      "no": 19,
      "prompt": "What time does the Rosewood Grill open for lunch?",
      "responses": [
        {
          "label": "A",
          "text": "The rose garden is beautiful."
        },
        {
          "label": "B",
          "text": "At half past eleven."
        },
        {
          "label": "C",
          "text": "A table for two, please."
        }
      ],
      "answer": "B",
      "note": "開店時刻を尋ねているので At half past eleven が正解。rose garden は Rosewood と音が重なる引っかけで、table for two はレストランからの連想語。"
    },
    {
      "no": 20,
      "prompt": "We're almost out of copier paper.",
      "responses": [
        {
          "label": "A",
          "text": "A supply order is going out this afternoon."
        },
        {
          "label": "B",
          "text": "I read it in the newspaper."
        },
        {
          "label": "C",
          "text": "The copier is very fast."
        }
      ],
      "answer": "A",
      "note": "用紙切れという発言に「今日の午後に発注がかかる」と状況で返す A supply order is going out this afternoon が正解の間接応答。copier の繰り返しと、paper からの連想の newspaper はどちらも罠。"
    },
    {
      "no": 21,
      "prompt": "Didn't you attend the design workshop last month?",
      "responses": [
        {
          "label": "A",
          "text": "He designed the new logo."
        },
        {
          "label": "B",
          "text": "It's a nice gift shop."
        },
        {
          "label": "C",
          "text": "No, I was on a business trip."
        }
      ],
      "answer": "C",
      "note": "否定疑問文に対して、出席していなかった事実を No, I was on a business trip と答えるのが正解。designed は design の繰り返しで、shop は workshop と音が重なる引っかけ。"
    },
    {
      "no": 22,
      "prompt": "How do I submit my expense report?",
      "responses": [
        {
          "label": "A",
          "text": "Through the Finline portal on the intranet."
        },
        {
          "label": "B",
          "text": "It was more expensive than expected."
        },
        {
          "label": "C",
          "text": "By Friday at the latest."
        }
      ],
      "answer": "A",
      "note": "方法を尋ねる How には手段を答える Through the Finline portal on the intranet が正解。expensive は expense と音が似た引っかけで、By Friday は期限を聞かれた場合の応答。"
    },
    {
      "no": 23,
      "prompt": "Are there any seats left for tonight's performance?",
      "responses": [
        {
          "label": "A",
          "text": "Please have a seat in the lobby."
        },
        {
          "label": "B",
          "text": "Yes, they performed very well."
        },
        {
          "label": "C",
          "text": "Let me check the booking system."
        }
      ],
      "answer": "C",
      "note": "空席の有無に直接 Yes/No で答えず「予約システムを確認します」と返す Let me check the booking system が正解の間接応答。seat の繰り返しと performed という派生語はどちらも引っかけ。"
    },
    {
      "no": 24,
      "prompt": "Where should we hold the retirement party for Mr. Castellanos?",
      "responses": [
        {
          "label": "A",
          "text": "He retired at the end of May."
        },
        {
          "label": "B",
          "text": "Didn't Ms. Egede already book a restaurant?"
        },
        {
          "label": "C",
          "text": "Please hold the door."
        }
      ],
      "answer": "B",
      "note": "場所を答える代わりに「もう予約済みでは」と問い返す Didn't Ms. Egede already book a restaurant が正解の間接応答。retired は retirement の繰り返しで、hold the door は hold の別の意味を使った引っかけ。"
    },
    {
      "no": 25,
      "prompt": "The new intern starts on Monday, doesn't she?",
      "responses": [
        {
          "label": "A",
          "text": "At the front desk."
        },
        {
          "label": "B",
          "text": "An internal memo was sent."
        },
        {
          "label": "C",
          "text": "Actually, it's been pushed back to Wednesday."
        }
      ],
      "answer": "C",
      "note": "付加疑問への訂正として Actually, it's been pushed back to Wednesday が正解。internal は intern と音が重なる引っかけで、場所の応答は問いに合わない。"
    },
    {
      "no": 26,
      "prompt": "The elevator in the west wing is out of service.",
      "responses": [
        {
          "label": "A",
          "text": "Again? I'll take the stairs."
        },
        {
          "label": "B",
          "text": "He's out of the office today."
        },
        {
          "label": "C",
          "text": "The service at dinner was excellent."
        }
      ],
      "answer": "A",
      "note": "エレベーター停止の知らせに Again? I'll take the stairs と対応を返すのが正解。service と out of の語句をそれぞれ繰り返した二つの引っかけは、どちらも文脈に合わない。"
    },
    {
      "no": 27,
      "prompt": "Who's picking up the clients from the airport?",
      "responses": [
        {
          "label": "A",
          "text": "A pickup truck."
        },
        {
          "label": "B",
          "text": "The schedule hasn't been finalized yet."
        },
        {
          "label": "C",
          "text": "At Gate 12."
        }
      ],
      "answer": "B",
      "note": "担当者を直接答えず「予定がまだ確定していない」と返す The schedule hasn't been finalized yet が正解の間接応答。pickup は picking up と音が重なる引っかけで、Gate 12 は空港からの連想で場所を答えた罠。"
    },
    {
      "no": 28,
      "prompt": "Did the shipment from Veltona Fabrics arrive yesterday?",
      "responses": [
        {
          "label": "A",
          "text": "The fabric feels very soft."
        },
        {
          "label": "B",
          "text": "Yes, it's in the storage room."
        },
        {
          "label": "C",
          "text": "We traveled by ship."
        }
      ],
      "answer": "B",
      "note": "到着したかの Yes-No 疑問文に Yes, it's in the storage room が正解。fabric は社名の一部を繰り返した引っかけで、ship は shipment と音が似た罠。"
    },
    {
      "no": 29,
      "prompt": "Isn't the cafe on Marlow Avenue closed for renovations?",
      "responses": [
        {
          "label": "A",
          "text": "It reopened last week."
        },
        {
          "label": "B",
          "text": "The clothes are in the closet."
        },
        {
          "label": "C",
          "text": "I'd like an iced coffee, please."
        }
      ],
      "answer": "A",
      "note": "閉まっているのではという否定疑問に、すでに営業再開している事実を It reopened last week と返すのが正解。iced coffee はカフェからの連想語で、closet は closed と音が似た引っかけ。"
    },
    {
      "no": 30,
      "prompt": "I can't find the key to the supply cabinet.",
      "responses": [
        {
          "label": "A",
          "text": "Ms. Fontaine keeps a spare one at reception."
        },
        {
          "label": "B",
          "text": "The taxi cab is waiting outside."
        },
        {
          "label": "C",
          "text": "I found the article very interesting."
        }
      ],
      "answer": "A",
      "note": "鍵が見つからないという発言に、受付に予備があると解決策を示す Ms. Fontaine keeps a spare one at reception が正解の間接応答。cab は cabinet と音が重なる引っかけで、found は find の繰り返しだが内容が無関係。"
    },
    {
      "no": 31,
      "prompt": "Will the outdoor market be open if it rains on Saturday?",
      "responses": [
        {
          "label": "A",
          "text": "The trains were delayed this morning."
        },
        {
          "label": "B",
          "text": "I bought some fresh vegetables."
        },
        {
          "label": "C",
          "text": "Yes, all the stalls are covered."
        }
      ],
      "answer": "C",
      "note": "雨でも開くかという Yes-No 疑問文に Yes, all the stalls are covered が正解。vegetables は市場からの連想語で、trains は rains と音が似た引っかけ。"
    }
  ],
  "part3": [
    {
      "no": 1,
      "kind": "conversation",
      "context": "出張日程の変更手配",
      "speakers": 2,
      "transcript": "Man: Rina, I need to change my travel arrangements for the Beltrane Manufacturing visit. Their purchasing director just moved our presentation from Thursday afternoon to Wednesday at nine in the morning.\nWoman: That is short notice. Your current flight lands in Dorvale on Wednesday at eleven, so you would miss the meeting entirely.\nMan: Exactly. Is there anything that leaves Tuesday evening instead?\nWoman: Let me check. There is a six fifteen departure on Tuesday with one seat left in economy, and it arrives at eight forty.\nMan: Book it, please. Will the change fee come out of my department's budget?\nWoman: Yes, and it is ninety-five dollars. I will note it on your expense report so you will not be charged personally.\nMan: Good. What about the hotel? I was supposed to check in on Wednesday.\nWoman: I will move your reservation at the Silvergate Hotel up one night. They usually do not charge for date changes if we call before noon.\nMan: Thanks. One more thing — could you print the updated schedule for me?\nWoman: I will do better than that. I will email you the full revised itinerary within the hour, and I will copy your manager as well.",
      "questions": [
        {
          "no": 32,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "The budget for a new department"
            },
            {
              "label": "B",
              "text": "A presentation to hotel employees"
            },
            {
              "label": "C",
              "text": "Changes to a business trip"
            },
            {
              "label": "D",
              "text": "A delay in a product shipment"
            }
          ],
          "answer": "C",
          "note": "男性は取引先のプレゼンが水曜朝に前倒しされたため、火曜夜の便への変更とホテルの前泊を依頼しており、会話全体が出張日程の変更手配。budget や hotel という語は登場するが、部署予算の話やホテル従業員向けプレゼンの話はしていない。"
        },
        {
          "no": 33,
          "question": "What problem does the man mention?",
          "choices": [
            {
              "label": "A",
              "text": "A hotel has no rooms available"
            },
            {
              "label": "B",
              "text": "His flight was canceled"
            },
            {
              "label": "C",
              "text": "A client changed a meeting time"
            },
            {
              "label": "D",
              "text": "His expense report was rejected"
            }
          ],
          "answer": "C",
          "note": "冒頭の Their purchasing director just moved our presentation from Thursday afternoon to Wednesday at nine が根拠で、先方が会議を前倒ししたことが問題の発端。便は欠航ではなく到着が間に合わないだけで、ホテルの満室や経費報告の却下は述べられていない。"
        },
        {
          "no": 34,
          "question": "What will the woman most likely do next?",
          "choices": [
            {
              "label": "A",
              "text": "Print a copy of the schedule"
            },
            {
              "label": "B",
              "text": "Call the man's manager"
            },
            {
              "label": "C",
              "text": "Email a revised itinerary"
            },
            {
              "label": "D",
              "text": "Cancel a hotel reservation"
            }
          ],
          "answer": "C",
          "note": "最後に I will email you the full revised itinerary within the hour と明言している。男性は印刷を頼んだが、女性は印刷の代わりにメール送付(上司にもCC)すると答えているため印刷は不正解。ホテルはキャンセルではなく1泊前倒しにするだけ。"
        }
      ],
      "range": "32-34"
    },
    {
      "no": 2,
      "kind": "conversation",
      "context": "調理器具セットの在庫確認",
      "speakers": 2,
      "transcript": "Woman: I am calling about the Lakemist ceramic cookware set that was in your weekend flyer. Do you still have it in stock?\nMan: I am sorry, our downtown location sold the last one this morning. The promotion has been very popular.\nWoman: That is disappointing. I was hoping to buy it as a wedding gift for this Saturday.\nMan: Let me check our other branches. Our Fernton store shows three sets on the shelf right now.\nWoman: Fernton is a forty-minute drive for me. Is there any way to have one sent here instead?\nMan: We can transfer it, but store transfers take five business days, so it would not arrive before Saturday.\nWoman: Then I suppose I will have to drive out there. Can you make sure they do not sell all three before I arrive?\nMan: Certainly. I can place one on hold under your name until closing time tomorrow.\nWoman: Please do that. Also, will the flyer discount still apply at that location?\nMan: Yes, the promotion runs through Sunday at every branch, so you will get the same twenty percent off.",
      "questions": [
        {
          "no": 35,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "The schedule for a weekend promotion"
            },
            {
              "label": "B",
              "text": "The availability of a cookware set"
            },
            {
              "label": "C",
              "text": "Plans for a wedding reception"
            },
            {
              "label": "D",
              "text": "A delayed furniture delivery"
            }
          ],
          "answer": "B",
          "note": "女性はチラシに載っていた Lakemist ceramic cookware set の在庫を問い合わせ、会話全体が他店舗在庫の確認と取り置きの相談。promotion や wedding という語は出るが、販促スケジュール自体や結婚式の計画が主題ではない。"
        },
        {
          "no": 36,
          "question": "What does the man say about the Fernton store?",
          "choices": [
            {
              "label": "A",
              "text": "It is closing early tomorrow"
            },
            {
              "label": "B",
              "text": "It currently has the item in stock"
            },
            {
              "label": "C",
              "text": "It is not participating in the promotion"
            },
            {
              "label": "D",
              "text": "It is a forty-minute drive from his location"
            }
          ],
          "answer": "B",
          "note": "Our Fernton store shows three sets on the shelf right now が根拠で、現時点で3セットの在庫がある。40分かかると言ったのは女性で、女性の自宅からの距離。販促は全店で日曜まで有効と最後に述べており、不参加は本文と矛盾する。"
        },
        {
          "no": 37,
          "question": "What does the woman ask the man to do?",
          "choices": [
            {
              "label": "A",
              "text": "Deliver a set to her home"
            },
            {
              "label": "B",
              "text": "Reserve an item for her"
            },
            {
              "label": "C",
              "text": "Extend a promotion through Sunday"
            },
            {
              "label": "D",
              "text": "Refund a recent purchase"
            }
          ],
          "answer": "B",
          "note": "Can you make sure they do not sell all three before I arrive? という依頼に対し、男性が place one on hold under your name と応じており、取り置きの依頼が正解。店舗間移送は5営業日かかるため女性自身が断念しており、配送の依頼ではない。"
        }
      ],
      "range": "35-37"
    },
    {
      "no": 3,
      "kind": "conversation",
      "context": "倉庫の貨物用エレベーター故障",
      "speakers": 2,
      "transcript": "Man: The freight elevator on the loading dock stopped working about twenty minutes ago. It made a loud grinding noise and now the doors will not open at all.\nWoman: Is anyone stuck inside?\nMan: No, it was empty, but we cannot move pallets up to the second floor without it. Two hundred boxes are arriving at noon.\nWoman: I see the problem. I will call Corvale Mechanical right away, but their technicians usually cannot come the same day.\nMan: Is there anything we can do in the meantime?\nWoman: Use the ramp on the east side of the building. It is longer, but the hand trucks can get up to the mezzanine that way.\nMan: All right. Should I put a sign on the elevator so nobody tries to use it?\nWoman: Yes, please tape a notice on both floors. Also, ask your crew to move the fragile items first.\nMan: Will do. Can you let me know as soon as the repair is scheduled?\nWoman: Of course. I will text you the moment Corvale gives me a time window.",
      "questions": [
        {
          "no": 38,
          "question": "Where most likely are the speakers?",
          "choices": [
            {
              "label": "A",
              "text": "At an appliance repair shop"
            },
            {
              "label": "B",
              "text": "At a warehouse"
            },
            {
              "label": "C",
              "text": "At an elevator manufacturing plant"
            },
            {
              "label": "D",
              "text": "At a hardware store"
            }
          ],
          "answer": "B",
          "note": "loading dock、pallets、mezzanine、200箱の入荷といった語から、荷物を階上へ運ぶ倉庫での会話だと分かる。Corvale Mechanical は外部の修理業者であって話者の勤務先ではなく、エレベーターは故障した設備であって製造品ではない。"
        },
        {
          "no": 39,
          "question": "Why does the man say, \"Two hundred boxes are arriving at noon\"?",
          "choices": [
            {
              "label": "A",
              "text": "To explain why the elevator broke down"
            },
            {
              "label": "B",
              "text": "To request additional workers for the afternoon"
            },
            {
              "label": "C",
              "text": "To complain about a scheduling error"
            },
            {
              "label": "D",
              "text": "To emphasize that the problem is urgent"
            }
          ],
          "answer": "D",
          "note": "直前に「エレベーターなしではパレットを2階へ運べない」と述べたうえで、正午に大量の入荷が迫っている事実を添えており、対応を急ぐ必要があることを強調する発言。故障原因の説明でも、増員の要請でも、日程ミスへの不満でもない。"
        },
        {
          "no": 40,
          "question": "What does the woman ask the man to do?",
          "choices": [
            {
              "label": "A",
              "text": "Contact a repair company"
            },
            {
              "label": "B",
              "text": "Post notices about the elevator"
            },
            {
              "label": "C",
              "text": "Move the fragile items last"
            },
            {
              "label": "D",
              "text": "Send her the repair schedule"
            }
          ],
          "answer": "B",
          "note": "男性の提案を受けて please tape a notice on both floors と、両フロアへの掲示を頼んでいる。修理業者への連絡は女性自身が行い、修理時間の連絡も女性から男性へテキストすると言っているので逆。壊れ物は「最後に」ではなく「最初に」動かすよう指示している。"
        }
      ],
      "range": "38-40"
    },
    {
      "no": 4,
      "kind": "conversation",
      "context": "昇進の打診",
      "speakers": 2,
      "transcript": "Woman: Daniel, do you have a minute? I would like to talk to you about the supervisor position on the new customer care team.\nMan: Of course. I heard the team is being formed next quarter.\nWoman: That is right, it launches in September. Based on your performance reviews, I would like you to consider leading it.\nMan: I am honored. How large would the team be?\nWoman: You would be managing six representatives at first, with two more added by the end of the year.\nMan: That is a big step up from what I do now. Would there be any management training?\nWoman: Yes, the company pays for a three-week leadership workshop, and you would complete it before the team launches.\nMan: That helps. Honestly, my main concern is the schedule, because my current shift lets me pick up my daughter from school.\nWoman: The supervisor role is daytime hours only, so that should not change. I will send you the full job description this afternoon.\nMan: Thank you. Could I give you my answer by Friday? I would like to talk it over with my family first.\nWoman: That is completely reasonable. Just come see me before the end of the day on Friday.",
      "questions": [
        {
          "no": 41,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "The results of a performance review"
            },
            {
              "label": "B",
              "text": "A schedule change for customer care representatives"
            },
            {
              "label": "C",
              "text": "Plans for a training workshop"
            },
            {
              "label": "D",
              "text": "A job opportunity for the man"
            }
          ],
          "answer": "D",
          "note": "女性は冒頭から新チームの supervisor position について話したいと切り出し、男性にリーダー職を打診している。performance reviews や workshop は打診の材料や条件として触れられるだけで、それ自体が会話の主題ではない。"
        },
        {
          "no": 42,
          "question": "What does the woman say about the leadership workshop?",
          "choices": [
            {
              "label": "A",
              "text": "It takes place after the team launches"
            },
            {
              "label": "B",
              "text": "The company will pay for it"
            },
            {
              "label": "C",
              "text": "It is required for all representatives"
            },
            {
              "label": "D",
              "text": "It is held every Friday"
            }
          ],
          "answer": "B",
          "note": "the company pays for a three-week leadership workshop が根拠で、費用は会社負担。研修はチーム発足「前」に修了する予定なので発足後は逆。対象は監督職に就く男性であり全担当者の必修とは言っておらず、Friday は返事の期限として出た語にすぎない。"
        },
        {
          "no": 43,
          "question": "What does the man ask permission to do?",
          "choices": [
            {
              "label": "A",
              "text": "Give his response by Friday"
            },
            {
              "label": "B",
              "text": "Attend a workshop next week"
            },
            {
              "label": "C",
              "text": "Change his current shift"
            },
            {
              "label": "D",
              "text": "Pick up a job description from her office"
            }
          ],
          "answer": "A",
          "note": "Could I give you my answer by Friday? と、家族と相談したうえで金曜までに返事をすることの了承を求めている。シフト変更はむしろ不要と女性が保証した点で、職務記述書は女性が午後にメールで送るものなので取りに行く必要はない。"
        }
      ],
      "range": "41-43"
    },
    {
      "no": 5,
      "kind": "conversation",
      "context": "新商品発表イベントの準備",
      "speakers": 2,
      "transcript": "Woman: Marcus, we have a problem with Friday's launch reception for the Verdella skincare line. Registration closed last night with a hundred and ten guests, but we ordered catering for eighty.\nMan: That is thirty extra people. Can Northgate Catering increase the order this late?\nWoman: I called them this morning. They can add the appetizers, but they need the final headcount by Wednesday at five.\nMan: Then let's confirm the number today so we are not cutting it close. What about seating?\nWoman: The Rosewell Hall staff said they can set up six more tables at no extra charge.\nMan: Great. Is the stage banner ready? The printer promised it by Tuesday.\nWoman: Actually, Lanford Printing called to say their shipment of vinyl was delayed, so the banner will not be ready until Thursday afternoon.\nMan: That still works. I will drive over and pick it up myself so we do not risk a courier delay.\nWoman: Perfect. While you do that, I will email the updated guest count to the caterer and the venue.\nMan: Sounds good. Let's meet on Thursday at four to walk through the room one last time.",
      "questions": [
        {
          "no": 44,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "Preparations for a product launch event"
            },
            {
              "label": "B",
              "text": "The development of a skincare product"
            },
            {
              "label": "C",
              "text": "The selection of a new catering company"
            },
            {
              "label": "D",
              "text": "A revision to a printing contract"
            }
          ],
          "answer": "A",
          "note": "金曜の launch reception に向けて、増えた出席者数への対応、席の追加、バナーの受け取りと、イベント準備の懸案を順に詰めている会話。skincare line は商品名として出るだけで開発の話はなく、ケータリング業者や印刷業者は既存の取引先で選定や契約変更の話ではない。"
        },
        {
          "no": 45,
          "question": "What does the woman say about the banner?",
          "choices": [
            {
              "label": "A",
              "text": "It will be delivered by a courier"
            },
            {
              "label": "B",
              "text": "It will not be ready until Thursday afternoon"
            },
            {
              "label": "C",
              "text": "It was completed on Tuesday as promised"
            },
            {
              "label": "D",
              "text": "It was printed in the wrong size"
            }
          ],
          "answer": "B",
          "note": "Lanford Printing から素材のビニールの入荷遅れの連絡があり、the banner will not be ready until Thursday afternoon と伝えている。火曜完成の約束は守られておらず、宅配は遅延リスクを避けるため男性が使わないと決めた手段。サイズの誤りには言及がない。"
        },
        {
          "no": 46,
          "question": "What does the man say he will do?",
          "choices": [
            {
              "label": "A",
              "text": "Set up six additional tables"
            },
            {
              "label": "B",
              "text": "Email the guest count to the caterer"
            },
            {
              "label": "C",
              "text": "Close the event registration"
            },
            {
              "label": "D",
              "text": "Pick up the banner himself"
            }
          ],
          "answer": "D",
          "note": "I will drive over and pick it up myself と、宅配の遅延リスクを避けるためバナーを自分で取りに行くと述べている。追加テーブルの設営は会場 Rosewell Hall のスタッフ、出席者数のメール連絡は女性の担当で、登録は前夜にすでに締め切られている。"
        }
      ],
      "range": "44-46"
    },
    {
      "no": 6,
      "kind": "conversation",
      "context": "請求書の金額の疑義",
      "speakers": 2,
      "transcript": "Woman: I am calling about invoice number 4172, which we received from Fernvale Paper Supply yesterday. It lists thirty cases of letter-size paper, but our receiving log shows only twenty-five were delivered.\nMan: Let me pull that up. You are right — the warehouse packed twenty-five cases because five were on back order, but the billing system charged you for the full thirty.\nWoman: I would also like to ask about the forty-dollar delivery fee. Our contract includes free delivery on orders over three hundred dollars.\nMan: You are correct again, and this order was well over that amount. The fee was added automatically when the order was split into two shipments.\nWoman: So how will these be corrected?\nMan: I will issue a revised invoice today that bills for twenty-five cases and removes the delivery fee. The remaining five cases will be billed separately when they ship next week.\nWoman: That works. Could you email the corrected copy directly to me rather than to our general accounting address?\nMan: Of course. May I have your email address?\nWoman: It is on the purchase order, right under the billing contact line.\nMan: Found it. You will have the revised invoice within the hour, and I will include a note explaining the back order as well.",
      "questions": [
        {
          "no": 47,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "A renewal of a supply contract"
            },
            {
              "label": "B",
              "text": "Choosing a new paper supplier"
            },
            {
              "label": "C",
              "text": "A delayed paper shipment"
            },
            {
              "label": "D",
              "text": "Errors on an invoice"
            }
          ],
          "answer": "D",
          "note": "女性は請求書4172番について、納品は25ケースなのに30ケース分請求されている点と、契約上不要な配送料40ドルの2点を指摘しており、請求の誤りの訂正が会話の主題。contract や back order という語は出るが、契約更新や入荷遅れそのものの相談ではない。"
        },
        {
          "no": 48,
          "question": "Why does the woman say, \"Our contract includes free delivery on orders over three hundred dollars\"?",
          "choices": [
            {
              "label": "A",
              "text": "To point out that a charge should not have been applied"
            },
            {
              "label": "B",
              "text": "To ask for a larger discount on future orders"
            },
            {
              "label": "C",
              "text": "To confirm that her order qualifies for faster shipping"
            },
            {
              "label": "D",
              "text": "To complain that a delivery arrived late"
            }
          ],
          "answer": "A",
          "note": "直前に40ドルの delivery fee について尋ねており、300ドル超の注文は配送無料という契約条件を引き合いに出すことで、この請求が誤りだと指摘する意図。男性も You are correct again と認めて配送料を削除すると応じている。値引き交渉や配送遅延への苦情ではない。"
        },
        {
          "no": 49,
          "question": "What will the man most likely do next?",
          "choices": [
            {
              "label": "A",
              "text": "Ship the five remaining cases"
            },
            {
              "label": "B",
              "text": "Update a general accounting address"
            },
            {
              "label": "C",
              "text": "Send a corrected invoice by email"
            },
            {
              "label": "D",
              "text": "Cancel a back order"
            }
          ],
          "answer": "C",
          "note": "You will have the revised invoice within the hour と述べ、25ケース分に修正し配送料を除いた請求書を女性宛に直接メールする。残り5ケースの出荷は来週で、取り消しではなく別途請求される。宛先は経理の共通アドレスではなく女性本人に送るよう頼まれている。"
        }
      ],
      "range": "47-49"
    },
    {
      "no": 7,
      "kind": "conversation",
      "context": "新しい予約管理システムの導入",
      "speakers": 2,
      "transcript": "Man: I wanted to confirm the rollout plan for the OrbitDesk scheduling platform at Westhaven Dental Clinic. We will migrate all of your patient appointment data this Saturday night.\nWoman: Will the current system still be available while your team works?\nMan: You can view records over the weekend, but no one should enter new appointments after six on Saturday. Anything typed in after that will not transfer.\nWoman: Understood. And when does the staff training take place?\nMan: I will run two sessions on site next Tuesday, one at nine and one at two, so everyone can attend around their shifts.\nWoman: That covers most of the team, but our two evening receptionists do not come in until five.\nMan: In that case, I will record the morning session and upload the video to your training portal the same day.\nWoman: That would help a lot. Could you also leave some printed quick-reference guides at the front desk?\nMan: Certainly, I will bring twenty copies on Tuesday. One more thing — please remind your staff that the old system becomes view-only starting Monday.\nWoman: I will mention it at tomorrow's staff meeting and post a notice in the break room.",
      "questions": [
        {
          "no": 50,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "The hiring of evening receptionists"
            },
            {
              "label": "B",
              "text": "A change to the clinic's business hours"
            },
            {
              "label": "C",
              "text": "The introduction of new scheduling software"
            },
            {
              "label": "D",
              "text": "A weekend closure for building maintenance"
            }
          ],
          "answer": "C",
          "note": "OrbitDesk という新しい予約管理プラットフォームの導入について、週末のデータ移行、火曜の研修、旧システムの扱いを順に確認している会話。evening receptionists は研修時間の懸念として出るだけで採用の話ではなく、診療時間の変更や建物の保守閉鎖には言及がない。"
        },
        {
          "no": 51,
          "question": "What does the man say about the old system?",
          "choices": [
            {
              "label": "A",
              "text": "It will be deleted on Saturday night"
            },
            {
              "label": "B",
              "text": "It will stay fully available until the training ends"
            },
            {
              "label": "C",
              "text": "It cannot display patient records"
            },
            {
              "label": "D",
              "text": "It will become view-only on Monday"
            }
          ],
          "answer": "D",
          "note": "the old system becomes view-only starting Monday が根拠で、月曜以降は閲覧専用になる。土曜18時以降の新規入力が移行されないだけで、システム自体が土曜夜に削除されるわけではない。週末も記録の閲覧は可能なので、表示できないという内容も誤り。"
        },
        {
          "no": 52,
          "question": "What does the woman ask the man to do?",
          "choices": [
            {
              "label": "A",
              "text": "Post a notice in the break room"
            },
            {
              "label": "B",
              "text": "Move the training to the evening"
            },
            {
              "label": "C",
              "text": "Provide printed reference guides"
            },
            {
              "label": "D",
              "text": "Migrate the data on Sunday instead"
            }
          ],
          "answer": "C",
          "note": "Could you also leave some printed quick-reference guides at the front desk? と、紙の早見ガイドを受付に置いてほしいと頼んでおり、男性は火曜に20部持参すると応じた。休憩室への掲示は女性自身が行うこと。夜勤の受付係への対応は研修の時間変更ではなく録画のアップロードで解決している。"
        }
      ],
      "range": "50-52"
    },
    {
      "no": 8,
      "kind": "conversation",
      "context": "歯科クリニックの予約変更",
      "speakers": 2,
      "transcript": "Man: I need to change my cleaning appointment with Dr. Vasquez. It's scheduled for this Thursday at 2 P.M., but I was just assigned a work trip to our Fairport branch that week.\nWoman: Let me pull up your file, Mr. Castellanos. I see the Thursday slot. Unfortunately, Dr. Vasquez is fully booked for the next two weeks.\nMan: That's longer than I'd like to wait. Is anyone else available sooner?\nWoman: Dr. Okonjo has an opening next Wednesday, July 15, at 9:30 A.M. She handles cleanings as well.\nMan: My mornings are usually packed.\nWoman: In that case, she also has a 4:15 P.M. slot on the same day, but it's the last one.\nMan: I'll take the 4:15. Could you send me a confirmation by text?\nWoman: Of course. One more thing—our records show that your insurance card expired in June. Please bring your updated card to the appointment.\nMan: Will do. I received the new one last week.\nWoman: Perfect. You're all set for Wednesday at 4:15 P.M. with Dr. Okonjo.",
      "questions": [
        {
          "no": 53,
          "question": "Why is the man calling?",
          "choices": [
            {
              "label": "A",
              "text": "To reschedule an appointment"
            },
            {
              "label": "B",
              "text": "To cancel a dental cleaning"
            },
            {
              "label": "C",
              "text": "To ask about insurance coverage"
            },
            {
              "label": "D",
              "text": "To arrange a business trip"
            }
          ],
          "answer": "A",
          "note": "男性は冒頭で「クリーニングの予約を変更したい」と述べており、出張のせいで木曜2時に行けなくなったのが理由。予約の取り消し（キャンセル）ではなく別日への変更を求めているし、保険は受付側が最後に持ち出した話題にすぎない。出張は変更の理由であって電話の目的ではない。"
        },
        {
          "no": 54,
          "question": "Why does the man say, \"My mornings are usually packed\"?",
          "choices": [
            {
              "label": "A",
              "text": "To explain why he missed a previous appointment"
            },
            {
              "label": "B",
              "text": "To turn down a suggested time slot"
            },
            {
              "label": "C",
              "text": "To request an earlier meeting time"
            },
            {
              "label": "D",
              "text": "To describe how crowded the clinic gets"
            }
          ],
          "answer": "B",
          "note": "受付が「水曜午前9時30分」を提案した直後の発言。「午前中は予定が詰まっている」と言うことで、その午前枠では都合が悪いと遠回しに断っている。受付も直後に午後4時15分の枠を代わりに提示している。packed をクリニックの混雑と取るのは字義に引きずられた誤読。"
        },
        {
          "no": 55,
          "question": "What does the woman ask the man to do?",
          "choices": [
            {
              "label": "A",
              "text": "Bring an updated insurance card"
            },
            {
              "label": "B",
              "text": "Send a text confirmation"
            },
            {
              "label": "C",
              "text": "Arrive before 4:15 P.M. on Thursday"
            },
            {
              "label": "D",
              "text": "Renew his insurance policy online"
            }
          ],
          "answer": "A",
          "note": "受付は最後に「保険証が6月で失効しているので、新しいカードを当日持参してほしい」と依頼している。テキストでの確認送信は男性が受付に頼んだことで、方向が逆。新しい予約は木曜ではなく水曜であり、保険証はすでに新しいものを受け取済みなので更新手続き自体は不要。"
        }
      ],
      "range": "53-55"
    },
    {
      "no": 9,
      "kind": "conversation",
      "context": "賃貸アパートの内見",
      "speakers": 2,
      "transcript": "Woman: This unit just came on the market on Monday. Two bedrooms, and the rent is $1,485 a month, not including utilities.\nMan: The living room gets nice light. How is the commute from here? I work downtown at Veltrix Insurance.\nWoman: Kerrigan Street Station is about 800 meters away—an eight-minute walk. The express train reaches downtown in fifteen minutes.\nMan: That's manageable. What about parking? I sometimes drive to client sites.\nWoman: There's a reserved spot in the building garage for an extra $95 a month. Street parking is free, but it's hard to find after 6 P.M.\nMan: I'd probably take the garage spot, then. Is the laundry in the unit?\nWoman: No, there's a shared laundry room in the basement, open around the clock.\nMan: All right. What's the next step if I want the place?\nWoman: I'd submit an application by Friday. I'm showing this unit to three other people this week, and the landlord reviews applications in the order they arrive.\nMan: Then I'll fill one out tonight and send it over.",
      "questions": [
        {
          "no": 56,
          "question": "Who most likely is the woman?",
          "choices": [
            {
              "label": "A",
              "text": "A building landlord"
            },
            {
              "label": "B",
              "text": "An insurance agent"
            },
            {
              "label": "C",
              "text": "A laundry service employee"
            },
            {
              "label": "D",
              "text": "A real estate agent"
            }
          ],
          "answer": "D",
          "note": "女性は物件の家賃・駐車場・洗濯室を案内し、「今週ほかに3人にこの部屋を見せる」「大家は届いた順に申込を審査する」と話している。物件を案内して申込を仲介する立場であり、不動産仲介業者と分かる。大家（landlord）は会話中で第三者として言及されているので本人ではない。Veltrix Insurance は男性の勤務先。"
        },
        {
          "no": 57,
          "question": "What does the woman say about parking?",
          "choices": [
            {
              "label": "A",
              "text": "The garage is closed after 6 P.M."
            },
            {
              "label": "B",
              "text": "Street parking costs $95 after 6 P.M."
            },
            {
              "label": "C",
              "text": "A reserved spot is included in the rent"
            },
            {
              "label": "D",
              "text": "A garage space costs an additional $95 per month"
            }
          ],
          "answer": "D",
          "note": "女性は「ガレージの専用スペースは月95ドルの追加料金」と明言している。路上駐車は無料で、6時以降は「空きを見つけにくい」だけ。95ドルや6 P.M. という会話中の数字を別の事実に付け替えた選択肢に注意。家賃1,485ドルに駐車場は含まれていない。"
        },
        {
          "no": 58,
          "question": "What is implied about the apartment?",
          "choices": [
            {
              "label": "A",
              "text": "It includes utilities in the rent"
            },
            {
              "label": "B",
              "text": "It may be rented out quickly"
            },
            {
              "label": "C",
              "text": "It has been vacant for several months"
            },
            {
              "label": "D",
              "text": "It has a washing machine in the unit"
            }
          ],
          "answer": "B",
          "note": "月曜に市場に出たばかりで、今週さらに3人が内見予定、しかも申込は先着順で審査される——という流れから、この物件はすぐ借り手がつく可能性が高いと推測できる。だからこそ女性は金曜までの申込を勧めている。光熱費は家賃に含まれず、洗濯機は室内ではなく地下の共用室。"
        }
      ],
      "range": "56-58"
    },
    {
      "no": 10,
      "kind": "conversation",
      "context": "レストランのテラス席オープン会議（3人）",
      "speakers": 3,
      "transcript": "Woman (Ms. Fontaine): The patio permit was finally approved, so we can seat up to twenty-four guests outside starting July 18. I want to talk about how we roll that out.\nMan (Mr. Reyes): From the kitchen side, I can handle the extra covers, but I'd want a shorter patio menu—maybe ten items—so ticket times don't slip.\nMan (Mr. Baek): My concern is staffing the floor. Two of our servers are on vacation during the last week of July. I suggest we open the patio on weekends only until August, then expand once everyone is back.\nWoman (Ms. Fontaine): Weekends only sounds sensible. What about the outdoor heaters we ordered?\nMan (Mr. Baek): Crestline Suppliers called this morning. The heaters are back-ordered and won't arrive until August 3.\nMan (Mr. Reyes): July evenings are warm anyway. Guests won't miss them for a few weeks.\nWoman (Ms. Fontaine): Agreed. Mr. Reyes, can you have a draft of the patio menu ready by Monday's staff meeting?\nMan (Mr. Reyes): I'll have it printed for everyone to review.\nMan (Mr. Baek): And I'll post the weekend schedule tonight so servers can pick up patio shifts.\nWoman (Ms. Fontaine): Great. Let's plan a quick walk-through of the patio setup on Thursday.",
      "questions": [
        {
          "no": 59,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "Plans for opening an outdoor dining area"
            },
            {
              "label": "B",
              "text": "A contract with a new supplier"
            },
            {
              "label": "C",
              "text": "Relocating a restaurant kitchen"
            },
            {
              "label": "D",
              "text": "Employee vacation requests"
            }
          ],
          "answer": "A",
          "note": "冒頭でテラス席（patio）の営業許可が下りたことが告げられ、以降はメニュー・人員配置・ヒーターなど、テラス席をどう立ち上げるかの段取りに終始している。Crestline Suppliers はヒーターの納期の話で出てくるだけで契約交渉はしていないし、従業員の休暇は人員計画の一要素にすぎない。"
        },
        {
          "no": 60,
          "question": "What does Mr. Baek suggest?",
          "choices": [
            {
              "label": "A",
              "text": "Limiting patio service to weekends at first"
            },
            {
              "label": "B",
              "text": "Offering a shorter patio menu"
            },
            {
              "label": "C",
              "text": "Hiring two additional servers"
            },
            {
              "label": "D",
              "text": "Ordering heaters from a different supplier"
            }
          ],
          "answer": "A",
          "note": "Baek 氏はサーバー2人が7月末に休暇で抜けることを挙げ、「8月まではテラス席を週末のみ営業し、全員が戻ってから拡大しよう」と提案している。短縮メニューを提案したのは Reyes 氏で、話者の取り違えを誘う選択肢。休暇中の2人の代わりを新規採用する話や、ヒーターの発注先変更の話は出ていない。"
        },
        {
          "no": 61,
          "question": "What will Mr. Reyes do by Monday?",
          "choices": [
            {
              "label": "A",
              "text": "Post a weekend work schedule"
            },
            {
              "label": "B",
              "text": "Call Crestline Suppliers about a delivery"
            },
            {
              "label": "C",
              "text": "Prepare a draft of a new menu"
            },
            {
              "label": "D",
              "text": "Lead a walk-through of the patio"
            }
          ],
          "answer": "C",
          "note": "Fontaine 氏に「月曜のスタッフ会議までにテラス席メニューの草案を用意できるか」と頼まれ、Reyes 氏は「印刷して全員に配る」と引き受けている。週末シフト表を今夜掲示するのは Baek 氏の役割で、話者すり替えの誤答。テラスの現地確認（walk-through）は木曜に全員で行う予定。"
        }
      ],
      "range": "59-61"
    },
    {
      "no": 11,
      "kind": "conversation",
      "context": "採用面接後の候補者評価の相談",
      "speakers": 2,
      "transcript": "Woman: Now that we've finished both interviews for the logistics coordinator position, I'd like to compare notes before we report to Human Resources.\nMan: Sure. Mr. Grabowski clearly has the deepest software experience—eight years with routing systems, including the FleetPath platform we use.\nWoman: True, but did you catch his salary expectation? He's asking for $78,000, and the budget for this role tops out at $65,000.\nMan: I noticed. Unless the directors make an exception, that's a wide gap.\nWoman: Ms. Iyer, on the other hand, has only three years of experience, but her references were outstanding. Her former supervisor at Dockside Shipping called her the best planner he had worked with in a decade.\nMan: She also asked thoughtful questions about our warehouse expansion. That showed real preparation.\nWoman: So where does that leave us?\nMan: I'd say we invite Ms. Iyer for a second interview with the operations director next Tuesday.\nWoman: Agreed. Can you send her an availability request today? I'll draft the summary for Human Resources this afternoon.\nMan: I'll email her before I leave the office.",
      "questions": [
        {
          "no": 62,
          "question": "What are the speakers mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "A warehouse expansion project"
            },
            {
              "label": "B",
              "text": "Candidates for a job opening"
            },
            {
              "label": "C",
              "text": "Salary negotiations with company directors"
            },
            {
              "label": "D",
              "text": "An upgrade to a software platform"
            }
          ],
          "answer": "B",
          "note": "2人は物流コーディネーター職の面接を終え、Grabowski 氏と Iyer 氏という2人の候補者の強みと懸念点を比較している。倉庫拡張や FleetPath というソフト名は候補者評価の材料として出てくるだけで、議題そのものではない。給与の話も Grabowski 氏の希望額と予算の差という評価要素の一つにすぎない。"
        },
        {
          "no": 63,
          "question": "What is implied about Mr. Grabowski?",
          "choices": [
            {
              "label": "A",
              "text": "His salary expectation exceeds the position's budget"
            },
            {
              "label": "B",
              "text": "He used to work at Dockside Shipping"
            },
            {
              "label": "C",
              "text": "He has little experience with routing systems"
            },
            {
              "label": "D",
              "text": "He declined a second interview"
            }
          ],
          "answer": "A",
          "note": "Grabowski 氏の希望年収は78,000ドルで、このポジションの予算上限は65,000ドル。女性が差額を指摘し、男性も「役員が例外を認めない限り大きな開きだ」と応じており、希望額が予算を超えていることが読み取れる。Dockside Shipping は Iyer 氏の元上司の勤務先。ルーティングシステムの経験はむしろ8年と豊富。"
        },
        {
          "no": 64,
          "question": "What will the man most likely do next?",
          "choices": [
            {
              "label": "A",
              "text": "Draft a summary for Human Resources"
            },
            {
              "label": "B",
              "text": "Meet with the operations director"
            },
            {
              "label": "C",
              "text": "Contact Ms. Iyer about her availability"
            },
            {
              "label": "D",
              "text": "Revise the budget for the position"
            }
          ],
          "answer": "C",
          "note": "女性に「今日中に彼女へ都合を尋ねる連絡を送れるか」と頼まれ、男性は「退社前にメールする」と答えている。人事向けサマリーの作成は女性の担当で、役割の入れ替えを狙った誤答。オペレーション部長との2次面接は来週火曜に Iyer 氏が受けるものであり、男性が部長に会うわけではない。"
        }
      ],
      "range": "62-64"
    },
    {
      "no": 12,
      "kind": "conversation",
      "context": "地域イベントへの協賛依頼の打ち合わせ（3人）",
      "speakers": 3,
      "transcript": "Woman (Ms. Duval): Thanks for meeting me, both of you. The Ashwick Harvest Festival is set for Saturday, October 10, at Riverside Park, and we're hoping local businesses will sponsor again this year.\nMan (Mr. Osei): What are the sponsorship levels this time?\nWoman (Ms. Duval): Two tiers. For $250, your logo appears on the main-stage banner and in the event program. For $600, you also get a booth space near the entrance for the whole day.\nMan (Mr. Osei): Last year our booth brought a lot of new customers into the hardware store. Put us down for the $600 tier again.\nWoman (Ms. Lindqvist): A booth doesn't really work for the bakery—we can't leave the ovens for a full Saturday. Could we contribute differently? I'd like to donate three hundred pastries for the volunteer breakfast instead.\nWoman (Ms. Duval): That would be wonderful. We're expecting about ninety volunteers, so that covers breakfast with plenty left over to sell at the refreshment stand.\nMan (Mr. Osei): Will the festival be advertised more widely this year? Attendance felt flat last October.\nWoman (Ms. Duval): Yes, the town council doubled the marketing budget, and we're running spots on Radio Ashwick through September.\nWoman (Ms. Lindqvist): That should help. When do you need our commitments confirmed?\nWoman (Ms. Duval): I'll email the sponsorship forms to both of you by tomorrow evening—just return them by August 15.",
      "questions": [
        {
          "no": 65,
          "question": "What is the purpose of the meeting?",
          "choices": [
            {
              "label": "A",
              "text": "To recruit volunteers for a breakfast event"
            },
            {
              "label": "B",
              "text": "To choose a new location for a park event"
            },
            {
              "label": "C",
              "text": "To plan a radio advertising campaign"
            },
            {
              "label": "D",
              "text": "To ask local businesses to sponsor a festival"
            }
          ],
          "answer": "D",
          "note": "Duval 氏は冒頭で10月10日開催の Ashwick Harvest Festival に触れ、「今年も地元企業に協賛してほしい」と切り出し、以降は協賛プランの説明と各店の参加形態の相談が続く。ボランティア朝食やラジオ広告は会話に登場するが、いずれも協賛依頼の中で触れられる周辺情報。開催場所は Riverside Park で確定済みであり、場所選びの話はしていない。"
        },
        {
          "no": 66,
          "question": "What does Ms. Lindqvist offer to do?",
          "choices": [
            {
              "label": "A",
              "text": "Donate pastries for a volunteer breakfast"
            },
            {
              "label": "B",
              "text": "Pay for the $600 sponsorship tier"
            },
            {
              "label": "C",
              "text": "Run advertisements on Radio Ashwick"
            },
            {
              "label": "D",
              "text": "Staff a booth near the entrance all day"
            }
          ],
          "answer": "A",
          "note": "Lindqvist 氏は「オーブンを丸一日離れられないのでブースは無理」と断ったうえで、代わりにボランティア朝食用にペストリー300個を寄付したいと申し出ている。ブース出店と600ドル協賛はむしろ本人が断った形態（選んだのは Osei 氏）。ラジオ広告は町議会の予算で祭り側が実施するもの。"
        },
        {
          "no": 67,
          "question": "What does Ms. Duval say she will do by tomorrow evening?",
          "choices": [
            {
              "label": "A",
              "text": "Email sponsorship forms to the business owners"
            },
            {
              "label": "B",
              "text": "Return the completed forms to the town council"
            },
            {
              "label": "C",
              "text": "Double the festival's marketing budget"
            },
            {
              "label": "D",
              "text": "Reserve a booth space near the entrance"
            }
          ],
          "answer": "A",
          "note": "会話の最後で Duval 氏は「明日の夕方までに協賛申込書を2人にメールする」と述べている。8月15日はフォームを送る期限ではなく、店主側が記入して返送する期限。マーケティング予算を倍にしたのは町議会で、すでに済んだ話。ブースの確保はフォーム提出後の話で、明日までの行動ではない。"
        }
      ],
      "range": "65-67"
    },
    {
      "no": 13,
      "kind": "conversation",
      "context": "工具レンタル店への問い合わせ",
      "speakers": 2,
      "transcript": "Man: I'm refinishing the oak floors in my dining room, and I need a floor sander from Friday through Sunday. Do you have one available?\nWoman: We have two drum sanders in stock. The daily rate is $48, so three days would come to $144.\nMan: That's steeper than I expected.\nWoman: Actually, our weekly rate is $130. Even if you only keep the machine for three days, the weekly rate would save you money.\nMan: Then let's do the weekly rate. Do I need to reserve it now?\nWoman: I'd recommend it—weekends are our busiest time. I can hold one under your name with a $75 deposit, which is refunded when the machine comes back undamaged.\nMan: Fine. Oh, and if I finish early, can I drop it off on Sunday afternoon?\nWoman: We close at noon on Sundays.\nMan: Good to know. I'll aim for Saturday evening, then, or Monday morning at the latest.\nWoman: Either works with the weekly rate. Just bring a photo ID when you pick it up on Friday.",
      "questions": [
        {
          "no": 68,
          "question": "What does the man want to do?",
          "choices": [
            {
              "label": "A",
              "text": "Purchase a drum sander"
            },
            {
              "label": "B",
              "text": "Order oak flooring for a dining room"
            },
            {
              "label": "C",
              "text": "Rent equipment for a home project"
            },
            {
              "label": "D",
              "text": "Have his floors professionally refinished"
            }
          ],
          "answer": "C",
          "note": "男性は自宅ダイニングの床を自分で研磨し直すために、金曜から日曜までフロアサンダーを借りたいと言っている。機械を買うのではなく借りる話であり、床材（oak flooring）を注文するわけでも、業者に施工を頼むわけでもない。oak や dining room という会話中の語を流用した誤答に注意。"
        },
        {
          "no": 69,
          "question": "Why does the woman say, \"We close at noon on Sundays\"?",
          "choices": [
            {
              "label": "A",
              "text": "To indicate that a Sunday afternoon return is not possible"
            },
            {
              "label": "B",
              "text": "To explain why weekends are the store's busiest time"
            },
            {
              "label": "C",
              "text": "To encourage the man to shop on Sunday morning"
            },
            {
              "label": "D",
              "text": "To announce that the store is closed all weekend"
            }
          ],
          "answer": "A",
          "note": "男性が「早く終わったら日曜の午後に返却できるか」と尋ねた直後の発言。日曜は正午閉店だと伝えることで、午後の返却は受け付けられないと遠回しに知らせている。男性もそれを察して土曜夜か月曜朝に返す計画へ切り替えた。週末の混雑の説明でも、日曜午前の来店を促す意図でもない。"
        },
        {
          "no": 70,
          "question": "What does the woman say about the deposit?",
          "choices": [
            {
              "label": "A",
              "text": "It is returned if the machine comes back undamaged"
            },
            {
              "label": "B",
              "text": "It cannot be refunded on weekends"
            },
            {
              "label": "C",
              "text": "It will be applied toward the daily rate"
            },
            {
              "label": "D",
              "text": "It costs $130 for the week"
            }
          ],
          "answer": "A",
          "note": "女性は「75ドルの預り金で機械を取り置きでき、破損なく返却されれば返金される」と説明している。130ドルは週間レンタル料金であって預り金の額ではない。預り金がレンタル料に充当されるという話や、週末は返金不可という条件は一切出ていない。"
        }
      ],
      "range": "68-70"
    }
  ],
  "part4": [
    {
      "no": 1,
      "kind": "talk",
      "context": "歯科医院からの予約確認の留守番電話",
      "talkType": "telephone message",
      "transcript": "Hello, this message is for Ms. Okafor. This is Daniel Reyes calling from Brightwell Dental Clinic. I am calling to confirm your appointment with Dr. Hansen on Thursday, March 12, at 2:30 P.M. Please note that we recently moved from Milldale Avenue to a new location at 48 Corver Street, across from the Farlow Public Library. Parking behind the building is free for patients, but the ground-floor entrance is still under renovation, so please use the side door facing the parking area. Since this is your first visit to the new office, we ask that you arrive fifteen minutes early to update your patient records. If you need to reschedule, please call us back at 555-0142. Thank you.",
      "questions": [
        {
          "no": 71,
          "question": "Why is the speaker calling?",
          "choices": [
            {
              "label": "A",
              "text": "To reschedule an appointment"
            },
            {
              "label": "B",
              "text": "To request an overdue payment"
            },
            {
              "label": "C",
              "text": "To announce a new dental treatment"
            },
            {
              "label": "D",
              "text": "To confirm an appointment"
            }
          ],
          "answer": "D",
          "note": "冒頭で I am calling to confirm your appointment と電話の目的を明言している。reschedule という語もトーク内に出るが、それは「変更が必要なら折り返して」という末尾の案内であり、電話の目的ではない。新しい治療や支払いへの言及はない。"
        },
        {
          "no": 72,
          "question": "What does the speaker say about the ground-floor entrance?",
          "choices": [
            {
              "label": "A",
              "text": "It faces the Farlow Public Library."
            },
            {
              "label": "B",
              "text": "It is reserved for staff members."
            },
            {
              "label": "C",
              "text": "It is being renovated."
            },
            {
              "label": "D",
              "text": "It was recently repainted."
            }
          ],
          "answer": "C",
          "note": "the ground-floor entrance is still under renovation と述べているので「改装中」が正解。図書館はクリニックの新住所の向かいにあるものとして言及されており、入口の向きの説明ではない。職員専用や塗装の話は出てこない。"
        },
        {
          "no": 73,
          "question": "What is the listener asked to do?",
          "choices": [
            {
              "label": "A",
              "text": "Park on Milldale Avenue"
            },
            {
              "label": "B",
              "text": "Call Dr. Hansen directly"
            },
            {
              "label": "C",
              "text": "Arrive fifteen minutes before the appointment"
            },
            {
              "label": "D",
              "text": "Bring her previous medical records"
            }
          ],
          "answer": "C",
          "note": "we ask that you arrive fifteen minutes early と依頼しているので「15分前に到着する」が正解。Milldale Avenue は移転前の旧住所で、駐車場所ではない。記録は到着後に医院で更新するものなので持参の依頼ではなく、電話の折り返し先も医院の番号で Hansen 医師本人ではない。"
        }
      ],
      "range": "71-73"
    },
    {
      "no": 2,
      "kind": "talk",
      "context": "スーパーマーケットの店内アナウンス",
      "talkType": "announcement (in-store)",
      "transcript": "Attention, Greenvale Market shoppers. Thank you for visiting us this afternoon. For the next thirty minutes, our bakery section is offering freshly baked sourdough loaves for just $3.25 each, down from the regular price of $5.50. Quantities are limited, so you may want to head over soon. Also, a reminder that our annual customer appreciation event takes place this Saturday, June 20, from 10 A.M. to 4 P.M. There will be free samples, live cooking demonstrations by Chef Marisol Vega, and a raffle for a $200 gift card. To enter the raffle, simply present your Greenvale rewards card at the customer service desk before you leave today. If you have not signed up for a rewards card yet, the application takes only two minutes.",
      "questions": [
        {
          "no": 74,
          "question": "Where most likely is the announcement being made?",
          "choices": [
            {
              "label": "A",
              "text": "At a bakery-supply company"
            },
            {
              "label": "B",
              "text": "At a cooking school"
            },
            {
              "label": "C",
              "text": "At a gift shop"
            },
            {
              "label": "D",
              "text": "At a grocery store"
            }
          ],
          "answer": "D",
          "note": "shoppers への呼びかけ、bakery section というコーナー名、rewards card、customer service desk などから食料品店の店内放送と分かる。bakery や cooking demonstration、gift card はいずれもトーク中の語だが、それぞれ店内の一区画・イベントの一部・景品の話であり、店舗の種類そのものではない。"
        },
        {
          "no": 75,
          "question": "Why does the speaker say, \"Quantities are limited, so you may want to head over soon\"?",
          "choices": [
            {
              "label": "A",
              "text": "To explain why an event was rescheduled"
            },
            {
              "label": "B",
              "text": "To apologize for a shortage of rewards cards"
            },
            {
              "label": "C",
              "text": "To announce that the bakery section is closing early"
            },
            {
              "label": "D",
              "text": "To encourage shoppers to take advantage of a discount quickly"
            }
          ],
          "answer": "D",
          "note": "直前でサワードウが30分限定で $5.50 から $3.25 に値下げされていると案内しており、「数に限りがあるから早めにどうぞ」は値引き品を急いで買うよう促す発言。rewards card の不足やベーカリーの早期閉店、イベントの日程変更はどこにも述べられていない。"
        },
        {
          "no": 76,
          "question": "What should shoppers do to enter the raffle?",
          "choices": [
            {
              "label": "A",
              "text": "Attend a cooking demonstration on Saturday"
            },
            {
              "label": "B",
              "text": "Purchase a sourdough loaf"
            },
            {
              "label": "C",
              "text": "Fill out an application at the bakery section"
            },
            {
              "label": "D",
              "text": "Present a rewards card at the customer service desk"
            }
          ],
          "answer": "D",
          "note": "To enter the raffle, simply present your Greenvale rewards card at the customer service desk と手順を明言している。土曜のデモは抽選と別のイベント内容、パンの購入は値引きの話。application はまだ rewards card を持っていない人向けの入会手続きで、抽選参加の条件ではない。"
        }
      ],
      "range": "74-76"
    },
    {
      "no": 3,
      "kind": "talk",
      "context": "空港の搭乗ゲート変更アナウンス",
      "talkType": "announcement (airport)",
      "transcript": "May I have your attention, please. This is an announcement for passengers traveling on Altavia Airways Flight 382 with service to Redmoor. Due to a mechanical inspection, the departure gate has been changed from Gate 14 to Gate 27, located in Terminal B near the food court. The scheduled departure time of 5:45 P.M. remains unchanged; however, boarding will now begin at 5:05 P.M., ten minutes earlier than originally planned. Passengers requiring assistance or traveling with small children will board first. Please have your boarding pass and a valid photo ID ready for inspection at the gate. If you have any questions, Altavia staff members in red uniforms are available at the service counter next to Gate 20. Thank you for your patience.",
      "questions": [
        {
          "no": 77,
          "question": "What is the announcement mainly about?",
          "choices": [
            {
              "label": "A",
              "text": "A change in departure gates"
            },
            {
              "label": "B",
              "text": "A flight cancellation"
            },
            {
              "label": "C",
              "text": "A delay in the departure time"
            },
            {
              "label": "D",
              "text": "A change in the flight's destination"
            }
          ],
          "answer": "A",
          "note": "the departure gate has been changed from Gate 14 to Gate 27 が中心の情報。departure time という語も出るが remains unchanged（変更なし）と明言されているので「出発遅延」は本文と矛盾する。欠航や行き先変更の話はない。"
        },
        {
          "no": 78,
          "question": "According to the speaker, what will happen at 5:05 P.M.?",
          "choices": [
            {
              "label": "A",
              "text": "The flight will depart."
            },
            {
              "label": "B",
              "text": "A mechanical inspection will end."
            },
            {
              "label": "C",
              "text": "Boarding will begin."
            },
            {
              "label": "D",
              "text": "The service counter will close."
            }
          ],
          "answer": "C",
          "note": "boarding will now begin at 5:05 P.M. と述べているので「搭乗開始」が正解。出発は 5:45 P.M. で別の時刻。mechanical inspection はゲート変更の理由として触れられるだけで終了時刻は不明、サービスカウンターの営業時間も述べられていない。"
        },
        {
          "no": 79,
          "question": "What are listeners asked to have ready at the gate?",
          "choices": [
            {
              "label": "A",
              "text": "Meal vouchers from the food court"
            },
            {
              "label": "B",
              "text": "Their boarding passes and photo IDs"
            },
            {
              "label": "C",
              "text": "Seat assignment request forms"
            },
            {
              "label": "D",
              "text": "Their checked-luggage receipts"
            }
          ],
          "answer": "B",
          "note": "Please have your boarding pass and a valid photo ID ready と依頼している。food court は新ゲートの場所の説明に出るだけで、引換券の話ではない。手荷物の半券や座席変更の書類への言及はない。"
        }
      ],
      "range": "77-79"
    },
    {
      "no": 4,
      "kind": "talk",
      "context": "ウェブ制作会社の社内会議の抜粋",
      "talkType": "excerpt from a meeting",
      "transcript": "Good morning, everyone. Before we review the quarterly sales figures, I want to update you on the Larkspur project. As you know, our client, Fenwick and Moss, has asked us to redesign their company website by August 15. Last week, the design team completed the initial layout two days ahead of schedule, which gives us extra time for user testing. I would like each of you to try the sample pages on the test server and record any problems you notice. Please send your comments to Priya Nair in a single document by Friday afternoon. She will compile the feedback and present a summary at next Monday's meeting. Remember, the client is paying us a premium for early delivery, so let's keep up this pace.",
      "questions": [
        {
          "no": 80,
          "question": "What kind of project is the speaker mainly discussing?",
          "choices": [
            {
              "label": "A",
              "text": "A website redesign"
            },
            {
              "label": "B",
              "text": "An employee training program"
            },
            {
              "label": "C",
              "text": "A quarterly sales campaign"
            },
            {
              "label": "D",
              "text": "A customer survey"
            }
          ],
          "answer": "A",
          "note": "Fenwick and Moss has asked us to redesign their company website とあり、話題の中心は Larkspur プロジェクト＝ウェブサイトの刷新。quarterly sales figures は「この後に扱う別議題」として冒頭で触れられるだけで、本題ではない。研修や顧客調査の話は出てこない。"
        },
        {
          "no": 81,
          "question": "What does the speaker say about the initial layout?",
          "choices": [
            {
              "label": "A",
              "text": "It was rejected by Fenwick and Moss."
            },
            {
              "label": "B",
              "text": "It will be delayed until August 15."
            },
            {
              "label": "C",
              "text": "It was completed ahead of schedule."
            },
            {
              "label": "D",
              "text": "It requires additional funding."
            }
          ],
          "answer": "C",
          "note": "the design team completed the initial layout two days ahead of schedule と述べている。August 15 は納期全体の期限であり、レイアウトの遅延日ではない。クライアント名は依頼主として出るだけで却下の事実はなく、追加予算の話もない。"
        },
        {
          "no": 82,
          "question": "What are listeners asked to do by Friday afternoon?",
          "choices": [
            {
              "label": "A",
              "text": "Present a summary at a meeting"
            },
            {
              "label": "B",
              "text": "Send their comments in a single document"
            },
            {
              "label": "C",
              "text": "Update the test server"
            },
            {
              "label": "D",
              "text": "Contact Fenwick and Moss directly"
            }
          ],
          "answer": "B",
          "note": "Please send your comments to Priya Nair in a single document by Friday afternoon が依頼内容。summary の発表は Priya Nair が月曜の会議で行うことで、聞き手への依頼ではない。テストサーバーは試す場所であって更新対象ではなく、クライアントへの直接連絡も求められていない。"
        }
      ],
      "range": "80-82"
    },
    {
      "no": 5,
      "kind": "talk",
      "context": "芝生手入れサービスのラジオ広告",
      "talkType": "advertisement",
      "transcript": "Are you tired of spending your weekends mowing the lawn? Then let Trimbrook Lawn Care handle it for you. For over eighteen years, our certified crews have kept yards across the Ashford Valley looking their best. We offer weekly mowing, seasonal planting, and tree trimming, all at affordable rates starting at $39.99 per visit. And now, through the end of April, new customers who sign up for a six-month service plan will receive their first two visits absolutely free. Visit our website at trimbrook-care.com to see photos of our recent work and read reviews from satisfied customers. Or call 555-0198 today for a free estimate. Trimbrook Lawn Care: more time for the things you love.",
      "questions": [
        {
          "no": 83,
          "question": "What is being advertised?",
          "choices": [
            {
              "label": "A",
              "text": "A gardening equipment retailer"
            },
            {
              "label": "B",
              "text": "A lawn care service"
            },
            {
              "label": "C",
              "text": "A home renovation company"
            },
            {
              "label": "D",
              "text": "A photography studio"
            }
          ],
          "answer": "B",
          "note": "社名 Trimbrook Lawn Care と、mowing・planting・tree trimming という業務内容から芝生の手入れサービスの広告と分かる。photos はウェブサイトで施工例を見られるという話で、写真スタジオの宣伝ではない。道具の販売やリフォームへの言及はない。"
        },
        {
          "no": 84,
          "question": "What can new customers receive through the end of April?",
          "choices": [
            {
              "label": "A",
              "text": "Free tree trimming for one year"
            },
            {
              "label": "B",
              "text": "A six-month supply of plants"
            },
            {
              "label": "C",
              "text": "A discount of $39.99"
            },
            {
              "label": "D",
              "text": "Two free service visits"
            }
          ],
          "answer": "D",
          "note": "new customers who sign up for a six-month service plan will receive their first two visits absolutely free とあるので「最初の2回が無料」が正解。six-month は契約プランの期間で、植物の提供期間ではない。$39.99 は1回あたりの基本料金であり、割引額ではない。tree trimming はサービス項目名で、1年間無料の特典ではない。"
        },
        {
          "no": 85,
          "question": "According to the speaker, what can listeners do on the website?",
          "choices": [
            {
              "label": "A",
              "text": "Request a free estimate"
            },
            {
              "label": "B",
              "text": "Sign up for a gardening class"
            },
            {
              "label": "C",
              "text": "Read reviews from customers"
            },
            {
              "label": "D",
              "text": "Download a price list"
            }
          ],
          "answer": "C",
          "note": "ウェブサイトでは施工写真の閲覧と read reviews from satisfied customers ができると案内している。free estimate という語も出るが、それは電話番号 555-0198 に電話して受けるものとして紹介されており、ウェブサイト上の機能ではない。講座や料金表のダウンロードへの言及はない。"
        }
      ],
      "range": "83-85"
    },
    {
      "no": 6,
      "kind": "talk",
      "context": "ラジオの朝の交通情報",
      "talkType": "broadcast (traffic report)",
      "transcript": "Good morning, this is Colin Marsh with your seven o'clock traffic update on Radio KVLR. If you are heading downtown this morning, expect delays on the Berrington Bridge, where a two-car accident has closed the left lane. Crews are on the scene, but the lane is not expected to reopen before 9 A.M. Your best option is to take the Delmore Tunnel instead; traffic there is moving smoothly. Meanwhile, road resurfacing continues on Hollis Avenue between Fifth and Ninth Streets, so allow an extra fifteen minutes if that is part of your commute. And remember, the city's new express bus line starts running next Monday. Trust me, you will want to leave the car at home. Stay tuned for weather with Dana Whitfield right after this.",
      "questions": [
        {
          "no": 86,
          "question": "Who most likely is the speaker?",
          "choices": [
            {
              "label": "A",
              "text": "A radio traffic reporter"
            },
            {
              "label": "B",
              "text": "A bus driver"
            },
            {
              "label": "C",
              "text": "A construction supervisor"
            },
            {
              "label": "D",
              "text": "A weather forecaster"
            }
          ],
          "answer": "A",
          "note": "traffic update on Radio KVLR と名乗り、橋・トンネル・道路工事の交通状況を伝えているのでラジオの交通リポーター。crews（作業班）や weather という語も出るが、作業班は現場にいる別の人たちであり、天気予報は次のコーナーの Dana Whitfield の担当。バス路線は話題の一つにすぎない。"
        },
        {
          "no": 87,
          "question": "What does the speaker say about the Delmore Tunnel?",
          "choices": [
            {
              "label": "A",
              "text": "It is closed until 9 A.M."
            },
            {
              "label": "B",
              "text": "It is being resurfaced."
            },
            {
              "label": "C",
              "text": "It will become a bus-only route."
            },
            {
              "label": "D",
              "text": "Traffic there is moving smoothly."
            }
          ],
          "answer": "D",
          "note": "traffic there is moving smoothly と述べ、橋の代わりの迂回路として勧めている。9 A.M. まで再開しないのは Berrington Bridge の車線、舗装工事中なのは Hollis Avenue で、いずれもトンネルの話ではない。バス専用化への言及はない。"
        },
        {
          "no": 88,
          "question": "Why does the speaker say, \"Trust me, you will want to leave the car at home\"?",
          "choices": [
            {
              "label": "A",
              "text": "To warn that downtown parking lots are full"
            },
            {
              "label": "B",
              "text": "To announce that a bridge will close permanently"
            },
            {
              "label": "C",
              "text": "To encourage listeners to try a new bus line"
            },
            {
              "label": "D",
              "text": "To complain about a road resurfacing project"
            }
          ],
          "answer": "C",
          "note": "直前の文で「市の新しい急行バス路線が来週月曜に運行開始」と紹介しており、その流れで「車は家に置いていきたくなるはず」＝新バス路線の利用を勧めている。駐車場の満車には触れておらず、橋の閉鎖は事故による一時的な車線規制、舗装工事は所要時間の注意として伝えているだけで不満の表明ではない。"
        }
      ],
      "range": "86-88"
    },
    {
      "no": 7,
      "kind": "talk",
      "context": "港湾クルーズのツアー案内",
      "talkType": "tour information",
      "transcript": "Welcome aboard, everyone, and thank you for joining today's harbor cruise with Meridian Bay Tours. My name is Sofia Lindqvist, and I will be your guide for the next ninety minutes. As we leave the dock, you will see the Wexford Lighthouse on your right, built in 1873. Our first stop is Cormorant Island, where you will have twenty-five minutes to walk along the boardwalk and take photographs. Please note that the island's nature trail is closed this month to protect nesting seabirds, so we ask everyone to remain on the boardwalk during the stop. Complimentary coffee and tea are available at the snack bar on the lower deck. If you have any questions during the cruise, just raise your hand and I will be happy to help.",
      "questions": [
        {
          "no": 89,
          "question": "Who most likely is the speaker?",
          "choices": [
            {
              "label": "A",
              "text": "A tour guide"
            },
            {
              "label": "B",
              "text": "A lighthouse keeper"
            },
            {
              "label": "C",
              "text": "A wildlife photographer"
            },
            {
              "label": "D",
              "text": "A ship's captain"
            }
          ],
          "answer": "A",
          "note": "I will be your guide for the next ninety minutes と自ら名乗っており、クルーズの見どころと注意事項を案内している。lighthouse や photographs という語も出るが、灯台は車窓ならぬ船窓からの見どころ、写真は乗客が島で撮るものであり、話者の職業ではない。操船についての発言はない。"
        },
        {
          "no": 90,
          "question": "Why is the nature trail on Cormorant Island closed?",
          "choices": [
            {
              "label": "A",
              "text": "Seabirds are nesting there."
            },
            {
              "label": "B",
              "text": "The boardwalk is being repaired."
            },
            {
              "label": "C",
              "text": "A photography event is taking place."
            },
            {
              "label": "D",
              "text": "It was damaged by a storm."
            }
          ],
          "answer": "A",
          "note": "closed this month to protect nesting seabirds と理由を明言している。boardwalk はむしろ「そこに留まってほしい」と案内される歩ける場所で、修理中ではない。photographs は乗客の自由行動の一つで、イベント開催の話ではない。嵐の被害への言及はない。"
        },
        {
          "no": 91,
          "question": "What are listeners asked to do during the stop at Cormorant Island?",
          "choices": [
            {
              "label": "A",
              "text": "Visit the Wexford Lighthouse"
            },
            {
              "label": "B",
              "text": "Purchase drinks at the snack bar"
            },
            {
              "label": "C",
              "text": "Stay on the boardwalk"
            },
            {
              "label": "D",
              "text": "Return to the boat within ninety minutes"
            }
          ],
          "answer": "C",
          "note": "we ask everyone to remain on the boardwalk during the stop が依頼内容。灯台は出航直後に船から見える場所で、島での訪問先ではない。snack bar は船の下層デッキにあり、しかもコーヒーと紅茶は無料。ninety minutes はクルーズ全体の長さで、島での持ち時間は twenty-five minutes。"
        }
      ],
      "range": "89-91"
    },
    {
      "no": 8,
      "kind": "talk",
      "context": "退職記念ディナーでのスピーチ",
      "talkType": "speech (farewell)",
      "transcript": "Good evening, everyone, and thank you for coming to tonight's dinner. As branch manager, it is my honor to say a few words about Teresa Mbeki, who is retiring after thirty-two years with Corvale Insurance. Teresa joined our Hartwell office as a claims assistant in 1994 and worked her way up to regional claims director. She trained more than fifty new employees, many of whom are here tonight. Under her leadership, our claims team achieved the company's highest customer satisfaction rating for six consecutive years. Teresa, we will miss your wisdom and your famous lemon cake at office birthday parties. Before we serve dessert, I would like to invite everyone to sign the memory book at the front table. Please join me in raising a glass to Teresa.",
      "questions": [
        {
          "no": 92,
          "question": "What is the purpose of the speech?",
          "choices": [
            {
              "label": "A",
              "text": "To honor a retiring employee"
            },
            {
              "label": "B",
              "text": "To announce an award ceremony"
            },
            {
              "label": "C",
              "text": "To welcome a new branch manager"
            },
            {
              "label": "D",
              "text": "To celebrate the opening of a new office"
            }
          ],
          "answer": "A",
          "note": "who is retiring after thirty-two years とあり、退職する Teresa Mbeki をたたえる送別スピーチ。branch manager は話者自身の肩書きで、新任者の紹介ではない。satisfaction rating は経歴の紹介の一部で表彰式の告知ではなく、新オフィス開設の話もない。"
        },
        {
          "no": 93,
          "question": "According to the speaker, what did Ms. Mbeki do in 1994?",
          "choices": [
            {
              "label": "A",
              "text": "She received a customer satisfaction award."
            },
            {
              "label": "B",
              "text": "She became regional claims director."
            },
            {
              "label": "C",
              "text": "She opened the Hartwell office."
            },
            {
              "label": "D",
              "text": "She joined the company as a claims assistant."
            }
          ],
          "answer": "D",
          "note": "Teresa joined our Hartwell office as a claims assistant in 1994 と述べている。regional claims director は後年に昇進した役職。Hartwell office は入社した勤務地であって、彼女が開設したとは言っていない。顧客満足度の記録はチームとして達成したもので、1994年の個人受賞ではない。"
        },
        {
          "no": 94,
          "question": "What are listeners invited to do before dessert is served?",
          "choices": [
            {
              "label": "A",
              "text": "Give a short speech"
            },
            {
              "label": "B",
              "text": "Sign a memory book"
            },
            {
              "label": "C",
              "text": "Take a photograph with Ms. Mbeki"
            },
            {
              "label": "D",
              "text": "Try a slice of lemon cake"
            }
          ],
          "answer": "B",
          "note": "Before we serve dessert, I would like to invite everyone to sign the memory book と呼びかけている。lemon cake は Teresa が誕生会で焼いていた思い出話で、今夜ふるまわれるものではない。スピーチをするのは話者本人で、写真撮影への言及はない。"
        }
      ],
      "range": "92-94"
    },
    {
      "no": 9,
      "kind": "talk",
      "context": "コールセンター新人研修の初日説明",
      "talkType": "instructions (training session)",
      "transcript": "Good morning, and welcome to your first day of training here at Norhaven Call Center. I am Marcus Delgado, the training supervisor, and over the next three days I will walk you through our customer support software, AssistPro. This morning, we will focus on logging in and creating customer records. Each of you has received a temporary password, and you will be asked to change it the first time you sign in. One important rule: never share your login information with anyone, including coworkers. Every record you create is tagged with your ID, and accuracy matters here. After the lunch break at noon, we will practice handling sample calls in pairs. Before we begin, please open the blue folder on your desk and review the schedule on the first page.",
      "questions": [
        {
          "no": 95,
          "question": "Who most likely are the listeners?",
          "choices": [
            {
              "label": "A",
              "text": "Software developers"
            },
            {
              "label": "B",
              "text": "Customer service supervisors"
            },
            {
              "label": "C",
              "text": "Newly hired call center employees"
            },
            {
              "label": "D",
              "text": "Norhaven Call Center customers"
            }
          ],
          "answer": "C",
          "note": "welcome to your first day of training here at Norhaven Call Center と呼びかけているので、聞き手は研修初日の新人スタッフ。software という語は研修で扱う AssistPro のことで、聞き手が開発者という意味ではない。supervisor は話者 Marcus Delgado の肩書きであり、customers は応対する相手にすぎない。"
        },
        {
          "no": 96,
          "question": "Why does the speaker say, \"Every record you create is tagged with your ID\"?",
          "choices": [
            {
              "label": "A",
              "text": "To explain how to reset a temporary password"
            },
            {
              "label": "B",
              "text": "To emphasize that trainees are accountable for their work"
            },
            {
              "label": "C",
              "text": "To describe how customer complaints are sorted"
            },
            {
              "label": "D",
              "text": "To warn that the software sometimes fails"
            }
          ],
          "answer": "B",
          "note": "直後に accuracy matters here と続けており、「作成した記録には全部あなたのIDが付く」＝誰の作業か記録に残るから正確にやれ、という責任の自覚を促す発言。temporary password は前の文の初回サインイン手順の話で、この発言の意図ではない。ソフトの不具合や苦情の分類方法には触れていない。"
        },
        {
          "no": 97,
          "question": "What are listeners asked to do before the session begins?",
          "choices": [
            {
              "label": "A",
              "text": "Practice sample calls in pairs"
            },
            {
              "label": "B",
              "text": "Change their temporary passwords"
            },
            {
              "label": "C",
              "text": "Review a schedule in a folder"
            },
            {
              "label": "D",
              "text": "Create a customer record"
            }
          ],
          "answer": "C",
          "note": "Before we begin, please open the blue folder on your desk and review the schedule と指示している。パスワードの変更は初回サインイン時に求められる手順で今すぐの依頼ではなく、ペアでの通話練習は昼休みの後の予定。顧客記録の作成は午前の学習テーマであって、開始前にやることではない。"
        }
      ],
      "range": "95-97"
    },
    {
      "no": 10,
      "kind": "talk",
      "context": "ビジネス系ポッドキャストの冒頭",
      "talkType": "podcast excerpt",
      "transcript": "Hello, and welcome back to Ledger Lines, the podcast where we talk about money matters for small business owners. I am your host, Anika Rowe. In today's episode, we are joined by Gerald Okonkwo, founder of the bakery chain Flourhouse, which grew from a single shop in Danbury Falls to twelve locations in just seven years. Gerald will explain how he financed his expansion without taking on bank loans, using a customer membership program instead. Later in the show, he will also share his three biggest mistakes, including the delivery service that lost him nearly $40,000 in its first year. If you enjoy the show, please leave a review on your favorite podcast app; it really helps new listeners find us. All right, Gerald, welcome to the program.",
      "questions": [
        {
          "no": 98,
          "question": "What is the podcast mainly about?",
          "choices": [
            {
              "label": "A",
              "text": "Financial topics for small business owners"
            },
            {
              "label": "B",
              "text": "Baking techniques and recipes"
            },
            {
              "label": "C",
              "text": "Reviews of delivery services"
            },
            {
              "label": "D",
              "text": "How to apply for bank loans"
            }
          ],
          "answer": "A",
          "note": "the podcast where we talk about money matters for small business owners と番組の主旨を冒頭で説明している。bakery はゲストの事業内容、delivery service は失敗談の一つ、bank loans は「借りずに済ませた」という文脈で出るだけで、いずれも番組テーマそのものではない。"
        },
        {
          "no": 99,
          "question": "According to the speaker, how did Mr. Okonkwo finance his company's expansion?",
          "choices": [
            {
              "label": "A",
              "text": "By taking out bank loans"
            },
            {
              "label": "B",
              "text": "Through a customer membership program"
            },
            {
              "label": "C",
              "text": "By selling one of his shops"
            },
            {
              "label": "D",
              "text": "By starting a delivery service"
            }
          ],
          "answer": "B",
          "note": "financed his expansion without taking on bank loans, using a customer membership program instead とあるので「会員プログラム」が正解。bank loans は「使わなかった」と明確に否定されている。delivery service はむしろ約 $40,000 を失った失敗例で、店の売却の話は出てこない。"
        },
        {
          "no": 100,
          "question": "What are listeners asked to do?",
          "choices": [
            {
              "label": "A",
              "text": "Visit a Flourhouse location"
            },
            {
              "label": "B",
              "text": "Leave a review on a podcast app"
            },
            {
              "label": "C",
              "text": "Join a customer membership program"
            },
            {
              "label": "D",
              "text": "Send in questions for the guest"
            }
          ],
          "answer": "B",
          "note": "please leave a review on your favorite podcast app が唯一の依頼。Flourhouse はゲストの会社名として紹介されるだけで来店は求めておらず、membership program はゲストの資金調達手法の説明であってリスナーへの勧誘ではない。質問募集への言及はない。"
        }
      ],
      "range": "98-100"
    }
  ],
  "part5": [
    {
      "no": 101,
      "sentence": "Crestline Software formally recognized Ms. Duarte for her ------- in resolving the network outage well ahead of the promised deadline.",
      "choices": [
        {
          "label": "A",
          "text": "efficient"
        },
        {
          "label": "B",
          "text": "efficiently"
        },
        {
          "label": "C",
          "text": "efficiencies"
        },
        {
          "label": "D",
          "text": "efficiency"
        }
      ],
      "answer": "D",
      "tag": "品詞",
      "note": "正解は efficiency。所有格 her の直後は名詞が入る位置で「彼女の効率のよさ」となり、in resolving 以下が説明する。efficient は形容詞、efficiently は副詞で所有格の後ろには置けない。efficiencies は可算複数だが、ここは働きぶり全体を指す不可算の抽象概念で文意に合わない。"
    },
    {
      "no": 102,
      "sentence": "Brightpath Logistics installed motion sensors throughout the Eastgate warehouse to reduce ------- during the overnight shift when few staff are present.",
      "choices": [
        {
          "label": "A",
          "text": "absenteeism"
        },
        {
          "label": "B",
          "text": "turnover"
        },
        {
          "label": "C",
          "text": "theft"
        },
        {
          "label": "D",
          "text": "overtime"
        }
      ],
      "answer": "C",
      "tag": "語彙",
      "note": "正解は theft。夜勤で人が少ない時間帯に動体センサーを設置する目的として「盗難」を減らすが最も自然。absenteeism(欠勤)・turnover(離職率)・overtime(残業)はいずれも企業が減らしたがる対象になり得るが、動体センサーという手段では減らせず、倉庫の夜間監視という文脈に合わない。"
    },
    {
      "no": 103,
      "sentence": "Ms. Chen has managed the front desk at the Silverbrook Hotel ------- 2019, earning steady praise from returning guests.",
      "choices": [
        {
          "label": "A",
          "text": "for"
        },
        {
          "label": "B",
          "text": "since"
        },
        {
          "label": "C",
          "text": "during"
        },
        {
          "label": "D",
          "text": "by"
        }
      ],
      "answer": "B",
      "tag": "前置詞・接続詞",
      "note": "現在完了 has managed と過去の起点となる年号 2019 が結びつくので「〜以来」を表す since が正解。for は期間の長さ(for five years など)を取り、特定の年号とは組めない。during は特定の期間名詞(the summer など)を取り、起点の年号には使えない。by は「〜までに」の期限で、継続してきた文意に合わない。"
    },
    {
      "no": 104,
      "sentence": "After Mr. Salcedo reviewed the safety report, he decided to ------- the factory tour until the faulty wiring had been replaced.",
      "choices": [
        {
          "label": "A",
          "text": "conduct"
        },
        {
          "label": "B",
          "text": "cancel"
        },
        {
          "label": "C",
          "text": "postpone"
        },
        {
          "label": "D",
          "text": "resume"
        }
      ],
      "answer": "C",
      "tag": "語彙",
      "note": "正解は postpone。until 節「配線の欠陥が交換されるまで」が「延期」を要求する。cancel(中止する)は最有力のひっかけだが、中止なら until(〜まで)という再開の見通しと両立しない。conduct(実施する)は安全報告を確認した直後の判断として逆方向。resume(再開する)は一度中断していた前提が本文にないため成立しない。"
    },
    {
      "no": 105,
      "sentence": "The training manual that Mr. Abara wrote for Brennan Freight offers ------- instructions for handling fragile cargo safely.",
      "choices": [
        {
          "label": "A",
          "text": "clarity"
        },
        {
          "label": "B",
          "text": "clear"
        },
        {
          "label": "C",
          "text": "clearly"
        },
        {
          "label": "D",
          "text": "clarify"
        }
      ],
      "answer": "B",
      "tag": "品詞",
      "note": "正解は clear。空所は直後の名詞 instructions を前から修飾する形容詞の位置で「分かりやすい説明」。clarity は名詞で名詞を連続修飾できず、clearly は副詞で名詞を修飾できない、clarify は動詞で修飾語にならない。"
    },
    {
      "no": 106,
      "sentence": "------- of the sales representatives at Draeger Motors receives a detailed performance summary at the end of every quarter.",
      "choices": [
        {
          "label": "A",
          "text": "Many"
        },
        {
          "label": "B",
          "text": "All"
        },
        {
          "label": "C",
          "text": "Several"
        },
        {
          "label": "D",
          "text": "Each"
        }
      ],
      "answer": "D",
      "tag": "限定詞・代名詞・関係詞",
      "note": "正解は Each。動詞が三人称単数の receives なので、単数扱いの Each of the ... が対応する。All of the representatives なら複数で receive となり合わない。Several of them も複数扱いで receive を要求する。Many of them も同様に複数で単数動詞 receives と一致しない。"
    },
    {
      "no": 107,
      "sentence": "Sales at Nwankwo Foods rose sharply once the marketing team began to ------- the new organic line in weekend cooking demonstrations.",
      "choices": [
        {
          "label": "A",
          "text": "promote"
        },
        {
          "label": "B",
          "text": "launch"
        },
        {
          "label": "C",
          "text": "assemble"
        },
        {
          "label": "D",
          "text": "predict"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "正解は promote。「週末の実演販売で新ラインを宣伝し始めたところ売上が急伸した」が自然。launch(発売する)は紛らわしいが、発売は一度きりの行為であり、毎週末の実演の中で繰り返し行う対象にはならない。assemble(組み立てる)は食品ラインに不適、predict(予測する)は売上を伸ばす行為にならない。"
    },
    {
      "no": 108,
      "sentence": "Sato Engineering completed the bridge inspection far more ------- than the regional authority had originally expected.",
      "choices": [
        {
          "label": "A",
          "text": "quick"
        },
        {
          "label": "B",
          "text": "quicker"
        },
        {
          "label": "C",
          "text": "quickness"
        },
        {
          "label": "D",
          "text": "quickly"
        }
      ],
      "answer": "D",
      "tag": "品詞",
      "note": "正解は quickly。more と結んで動詞 completed を修飾する副詞の比較級「より速く」を作る。quick は原級の形容詞で動詞を修飾できず、quickness は名詞、quicker はそれ自体が比較級のため more quicker は二重比較級で誤り。"
    },
    {
      "no": 109,
      "sentence": "Kaminski Freight delayed several deliveries last week ------- the severe snowstorm that closed the mountain highway for two days.",
      "choices": [
        {
          "label": "A",
          "text": "because of"
        },
        {
          "label": "B",
          "text": "because"
        },
        {
          "label": "C",
          "text": "although"
        },
        {
          "label": "D",
          "text": "so"
        }
      ],
      "answer": "A",
      "tag": "前置詞・接続詞",
      "note": "空所の後ろは the severe snowstorm という名詞句なので、名詞句を導ける前置詞句 because of が正解。理由(悪天候で配送が遅れた)も文意に合う。because は接続詞で後ろに主語+動詞の節が必要だが、ここは名詞句なので不可。although は譲歩の接続詞で節が必要な上、意味も逆。so は等位接続詞で、節の頭に立って名詞句の理由を導くこの位置・用法では成立しない。"
    },
    {
      "no": 110,
      "sentence": "Because Ms. Aoki explained each clause in plain language, the new suppliers found the contract remarkably easy to -------.",
      "choices": [
        {
          "label": "A",
          "text": "comprehend"
        },
        {
          "label": "B",
          "text": "terminate"
        },
        {
          "label": "C",
          "text": "enforce"
        },
        {
          "label": "D",
          "text": "draft"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "正解は comprehend。「各条項を平易な言葉で説明したので、契約が理解しやすかった」という因果が成立する。terminate(解約する)・enforce(執行する)・draft(起草する)はどれも contract と自然に結び付く動詞だが、「平易な説明のおかげで〜しやすい」という因果につながるのは理解だけ。"
    },
    {
      "no": 111,
      "sentence": "By the time Mr. Beckett returns from Redwater on March 14, the auditors ------- their review of the quarterly accounts.",
      "choices": [
        {
          "label": "A",
          "text": "have completed"
        },
        {
          "label": "B",
          "text": "completed"
        },
        {
          "label": "C",
          "text": "are completing"
        },
        {
          "label": "D",
          "text": "will have completed"
        }
      ],
      "answer": "D",
      "tag": "動詞形",
      "note": "正解は will have completed。「By the time + 現在形(returns)」で表す未来の一点までに完了している動作なので、未来完了 will have completed が必要。completed は単なる過去で未来の基準点に合わない。are completing は進行中の意味で「完了」を表せない。have completed は現在完了で、未来の時点までの完了を示せない。"
    },
    {
      "no": 112,
      "sentence": "Ms. Kowalski organized the department's contract files so ------- that staff can now locate any document within minutes.",
      "choices": [
        {
          "label": "A",
          "text": "systematic"
        },
        {
          "label": "B",
          "text": "systematize"
        },
        {
          "label": "C",
          "text": "systematization"
        },
        {
          "label": "D",
          "text": "systematically"
        }
      ],
      "answer": "D",
      "tag": "品詞",
      "note": "正解は systematically。so ------- that の枠で動詞 organized を修飾する副詞が入る位置。「体系的に整理したので誰でも数分で文書を見つけられる」。systematic は形容詞で動詞を修飾できず、systematize は動詞、systematization は名詞で、いずれもこの位置に置けない。"
    },
    {
      "no": 113,
      "sentence": "The editor praised the intern for her ------- proofreading, noting that not a single typo had slipped past her review.",
      "choices": [
        {
          "label": "A",
          "text": "thorough"
        },
        {
          "label": "B",
          "text": "prompt"
        },
        {
          "label": "C",
          "text": "occasional"
        },
        {
          "label": "D",
          "text": "mutual"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "正解は thorough。「タイプミスが一つも通らなかった」のだから校正が「徹底的」だった。prompt(迅速な)は速さの話で見逃しゼロの理由にならず、occasional(時折の)はむしろ見逃しが出る方向、mutual(相互の)は校正の質を表せない。"
    },
    {
      "no": 114,
      "sentence": "Although Ms. Rahman interviewed twelve candidates for the analyst position, ------- of them had the required certification.",
      "choices": [
        {
          "label": "A",
          "text": "nobody"
        },
        {
          "label": "B",
          "text": "no one"
        },
        {
          "label": "C",
          "text": "none"
        },
        {
          "label": "D",
          "text": "neither"
        }
      ],
      "answer": "C",
      "tag": "限定詞・代名詞・関係詞",
      "note": "正解は none。none of them の形で「彼らの誰も〜ない」を表し、of 句と自然につながる。no one は of them を直接続けられず単独で使う代名詞。nobody も同様に of them を伴わない。neither は2者のときのみ用いる語で、候補が12人いる本文では不可。"
    },
    {
      "no": 115,
      "sentence": "The new filing system at Adeyemi Consulting is ------- efficient, cutting document retrieval time by nearly half.",
      "choices": [
        {
          "label": "A",
          "text": "remarkable"
        },
        {
          "label": "B",
          "text": "remark"
        },
        {
          "label": "C",
          "text": "remarkably"
        },
        {
          "label": "D",
          "text": "remarked"
        }
      ],
      "answer": "C",
      "tag": "品詞",
      "note": "正解は remarkably。直後の形容詞 efficient を前から修飾する副詞の位置で「著しく効率的」。remarkable は形容詞で形容詞を修飾できず、remark は名詞または動詞、remarked は動詞の過去(分詞)形でここには入らない。"
    },
    {
      "no": 116,
      "sentence": "The quarterly sales figures for Osei Motors are posted ------- the bulletin board just outside the second-floor break room.",
      "choices": [
        {
          "label": "A",
          "text": "at"
        },
        {
          "label": "B",
          "text": "into"
        },
        {
          "label": "C",
          "text": "in"
        },
        {
          "label": "D",
          "text": "on"
        }
      ],
      "answer": "D",
      "tag": "前置詞・接続詞",
      "note": "掲示板の表面に貼り出す状況なので、面への接触を表す on が正解(post on the bulletin board は定型)。at は一点・地点を指し、掲示物を貼る対象の表現としては不自然。in は内部・囲われた空間を表し、面である掲示板には合わない。into は中への移動方向を示し、貼られている状態を表すこの文脈では使えない。"
    },
    {
      "no": 117,
      "sentence": "Halvorsen Design chose a paint color that would ------- the natural light in the lobby, making the space feel far brighter.",
      "choices": [
        {
          "label": "A",
          "text": "absorb"
        },
        {
          "label": "B",
          "text": "block"
        },
        {
          "label": "C",
          "text": "imitate"
        },
        {
          "label": "D",
          "text": "enhance"
        }
      ],
      "answer": "D",
      "tag": "語彙",
      "note": "正解は enhance。「空間がずっと明るく感じられる」よう自然光を「引き立てる」塗装色を選んだ。absorb(吸収する)と block(遮る)は光を扱う動詞として文法的には自然だが、明るくするという結果と逆方向。imitate(模倣する)は塗装が光を真似るという不自然な意味になる。"
    },
    {
      "no": 118,
      "sentence": "Okoro Analytics strongly recommends ------- the new accounting software before the office relocation to Glenmoor next month.",
      "choices": [
        {
          "label": "A",
          "text": "to install"
        },
        {
          "label": "B",
          "text": "installing"
        },
        {
          "label": "C",
          "text": "install"
        },
        {
          "label": "D",
          "text": "installed"
        }
      ],
      "answer": "B",
      "tag": "動詞形",
      "note": "正解は installing。recommend は目的語に動名詞をとる動詞なので recommends installing が正しい。to install は recommend が不定詞を直接目的語にとらないため不可。install は動詞原形のままで recommends の目的語になれない。installed は過去分詞で、ここでは能動の行為を表す必要があり文意に合わない。"
    },
    {
      "no": 119,
      "sentence": "After months of ------- among the design teams, Cortez Apparel finally launched its spring collection in Northvale.",
      "choices": [
        {
          "label": "A",
          "text": "negotiate"
        },
        {
          "label": "B",
          "text": "negotiable"
        },
        {
          "label": "C",
          "text": "negotiation"
        },
        {
          "label": "D",
          "text": "negotiably"
        }
      ],
      "answer": "C",
      "tag": "品詞",
      "note": "正解は negotiation。前置詞 of の目的語になる名詞が必要で「数か月にわたる交渉の末に」。negotiate は動詞、negotiable は形容詞、negotiably は副詞で、いずれも前置詞の目的語になれない。"
    },
    {
      "no": 120,
      "sentence": "The quarterly figures from Oakhurst Financial were so ------- that even first-time investors could interpret them without any assistance.",
      "choices": [
        {
          "label": "A",
          "text": "straightforward"
        },
        {
          "label": "B",
          "text": "confidential"
        },
        {
          "label": "C",
          "text": "tentative"
        },
        {
          "label": "D",
          "text": "lucrative"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "正解は straightforward。「初めての投資家でも助けなしに読み解けた」ほど数字が「分かりやすい」。confidential(機密の)は閲覧を制限する語で誰でも読める文脈と逆方向、tentative(暫定の)は数値が未確定という意味で解釈のしやすさを説明できず、lucrative(利益の大きい)は収益性の話で読みやすさと無関係。"
    },
    {
      "no": 121,
      "sentence": "------- Ms. Novak had reviewed the contract twice, she still missed a clause about the late-payment penalty entirely.",
      "choices": [
        {
          "label": "A",
          "text": "Despite"
        },
        {
          "label": "B",
          "text": "During"
        },
        {
          "label": "C",
          "text": "Because of"
        },
        {
          "label": "D",
          "text": "Although"
        }
      ],
      "answer": "D",
      "tag": "前置詞・接続詞",
      "note": "空所の後ろは Ms. Novak had reviewed... という主語+動詞の節なので、節を導く譲歩の接続詞 Although が正解。「二度確認したのに見落とした」という逆接の意味も合う。Despite は前置詞で後ろは名詞句が必要で節は導けない。Because of も前置詞句で名詞句が必要な上、意味が逆。During は前置詞で名詞句を取り、節は導けない。"
    },
    {
      "no": 122,
      "sentence": "Delgado Imports keeps a small ------- of spare parts in Port Maren so that urgent repairs never stall for lack of components.",
      "choices": [
        {
          "label": "A",
          "text": "backlog"
        },
        {
          "label": "B",
          "text": "inventory"
        },
        {
          "label": "C",
          "text": "warranty"
        },
        {
          "label": "D",
          "text": "estimate"
        }
      ],
      "answer": "B",
      "tag": "語彙",
      "note": "正解は inventory。「部品不足で修理が止まらないように予備部品の在庫を置いておく」が文意に合う。backlog(未処理案件の山)は仕事の滞留であって部品の蓄えを指せない。warranty(保証)・estimate(見積り)はビジネス頻出語だが of spare parts と結び付かず、修理が止まらない理由にもならない。"
    },
    {
      "no": 123,
      "sentence": "Marlowe Publishing credits its steady growth to the ------- leadership of its longtime editor, Mr. Yamada.",
      "choices": [
        {
          "label": "A",
          "text": "decisive"
        },
        {
          "label": "B",
          "text": "decisively"
        },
        {
          "label": "C",
          "text": "decision"
        },
        {
          "label": "D",
          "text": "decide"
        }
      ],
      "answer": "A",
      "tag": "品詞",
      "note": "正解は decisive。冠詞 the と名詞 leadership の間は形容詞の位置で「決断力のある指導力」。decisively は副詞で名詞を修飾できず、decision は名詞で decision leadership という結び付きは不自然、decide は動詞でこの位置に入らない。"
    },
    {
      "no": 124,
      "sentence": "The revised safety manual ------- to every Serrano Farms employee since the updated regulations took effect on April 1.",
      "choices": [
        {
          "label": "A",
          "text": "distributed"
        },
        {
          "label": "B",
          "text": "has distributed"
        },
        {
          "label": "C",
          "text": "has been distributed"
        },
        {
          "label": "D",
          "text": "was distributing"
        }
      ],
      "answer": "C",
      "tag": "動詞形",
      "note": "正解は has been distributed。主語 manual は「配布される」側なので受動態が必要で、かつ since 以降の継続を表すため現在完了受動態 has been distributed が最適。has distributed は能動でマニュアル自身が配る意味になり不可。distributed は過去1回きりで since の継続に合わない。was distributing は過去進行の能動で、受動でも継続でもなく不適。"
    },
    {
      "no": 125,
      "sentence": "Ms. Petrova reminded the board that every department must ------- to the revised data-privacy policy before the audit next month.",
      "choices": [
        {
          "label": "A",
          "text": "object"
        },
        {
          "label": "B",
          "text": "adhere"
        },
        {
          "label": "C",
          "text": "refer"
        },
        {
          "label": "D",
          "text": "respond"
        }
      ],
      "answer": "B",
      "tag": "語彙",
      "note": "正解は adhere。adhere to で「改定されたデータプライバシー方針を順守する」となり、監査前の全部署への注意として自然。object(異議を唱える)・refer(参照する)・respond(応答する)もすべて to を取れるため文法では切れないが、must が示す義務として監査前に求められるのは順守。参照や応答では「監査を通る」目的に足りず、異議は文脈と逆。"
    },
    {
      "no": 126,
      "sentence": "Falk Insurance is looking for a claims adjuster ------- previous experience includes handling large commercial property cases.",
      "choices": [
        {
          "label": "A",
          "text": "who"
        },
        {
          "label": "B",
          "text": "whose"
        },
        {
          "label": "C",
          "text": "whom"
        },
        {
          "label": "D",
          "text": "which"
        }
      ],
      "answer": "B",
      "tag": "限定詞・代名詞・関係詞",
      "note": "正解は whose。空所の後ろに名詞 previous experience が続き「その人の経験」という所有関係を示すので所有格の関係代名詞 whose が必要。who は主格で直後に名詞を従えられない。whom は目的格でここでは動詞の目的語欠落がなく不可。which は人 adjuster を先行詞にとれないため不適。"
    },
    {
      "no": 127,
      "sentence": "------- with local suppliers has allowed Ueda Foods to reduce shipping costs across the Bramwell distribution region.",
      "choices": [
        {
          "label": "A",
          "text": "Cooperation"
        },
        {
          "label": "B",
          "text": "Cooperatively"
        },
        {
          "label": "C",
          "text": "Cooperate"
        },
        {
          "label": "D",
          "text": "Cooperative"
        }
      ],
      "answer": "A",
      "tag": "品詞",
      "note": "空所は文頭で has allowed の主語となる名詞の位置なので Cooperation が正解で「地元業者との連携が」の意味。Cooperate は動詞、Cooperatively は副詞で主語になれず、Cooperative は形容詞(名詞なら『協同組合』の意味で文意に合わない)。"
    },
    {
      "no": 128,
      "sentence": "------- the renovation of its Kestrel Bay showroom was underway, Holloway Realty moved its agents to a temporary office.",
      "choices": [
        {
          "label": "A",
          "text": "Unless"
        },
        {
          "label": "B",
          "text": "Even if"
        },
        {
          "label": "C",
          "text": "While"
        },
        {
          "label": "D",
          "text": "Whereas"
        }
      ],
      "answer": "C",
      "tag": "前置詞・接続詞",
      "note": "正解は While。今回は4つとも節を導ける接続詞なので、形ではなく意味で選ぶ。「ショールームの改装が進んでいる間、社員を仮事務所に移した」と同時進行の期間を表す While が文意に合う。Unless(〜しない限り)は条件、Even if(たとえ〜でも)は譲歩で、どちらも移転の理由にならない。Whereas(〜である一方)は2つの事実の対比に使う語で、期間を表せない。"
    },
    {
      "no": 129,
      "sentence": "Larkspur Media asked freelance writers to ------- with in-house editors so that the tone of each article would stay consistent.",
      "choices": [
        {
          "label": "A",
          "text": "collaborate"
        },
        {
          "label": "B",
          "text": "comply"
        },
        {
          "label": "C",
          "text": "compete"
        },
        {
          "label": "D",
          "text": "interfere"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "正解は collaborate。「社内編集者と協働して記事のトーンをそろえる」が目的節と合う。comply(従う)・compete(競争する)・interfere(干渉する)もすべて with を取れる動詞なので文法では切れないが、トーンを一貫させるという目的に合うのは協働だけ。comply は従属の意味で編集者個人を目的語にすると不自然、compete と interfere は目的と矛盾する。"
    },
    {
      "no": 130,
      "sentence": "Mr. Lindgren revised the assembly manual -------, comparing each step against the procedures actually used on the factory floor.",
      "choices": [
        {
          "label": "A",
          "text": "rarely"
        },
        {
          "label": "B",
          "text": "carefully"
        },
        {
          "label": "C",
          "text": "reluctantly"
        },
        {
          "label": "D",
          "text": "briefly"
        }
      ],
      "answer": "B",
      "tag": "語彙",
      "note": "正解は carefully。「現場で実際に使われている手順と一つずつ照合しながら」という分詞構文が、改訂が「丁寧に」行われたことを裏付ける。rarely(めったに〜ない)は頻度の副詞で様態を表せず、reluctantly(しぶしぶ)は照合を重ねる熱心さと矛盾、briefly(手短に)は全手順を照合する丁寧さと逆方向。"
    }
  ],
  "part6": [
    {
      "no": 1,
      "passageType": "e-mail",
      "passage": "To: All Staff\nFrom: Ms. Farrow, Director of Human Resources\nDate: July 10\nSubject: New Commuter Benefit Program\n\nDear Colleagues,\n\nI am pleased to announce that beginning on August 1, the Marston Devlin Group §131§ a new commuter benefit program for all full-time employees. Under this program, the company will cover up to $87.50 of monthly public transit costs. §132§ To enroll, please submit the reimbursement form to Mr. Underwood by July 28.\n\nEmployees who commute by bicycle are also eligible for a separate §133§ toward equipment and maintenance. §134§, the program does not currently extend to parking fees at the Calvert Avenue garage. My team will also host an information session next week to answer any questions.\n\nWe look forward to your participation.",
      "intro": "Questions 131-134 refer to the following e-mail.",
      "questions": [
        {
          "no": 131,
          "choices": [
            {
              "label": "A",
              "text": "had introduced"
            },
            {
              "label": "B",
              "text": "has introduced"
            },
            {
              "label": "C",
              "text": "introduced"
            },
            {
              "label": "D",
              "text": "will introduce"
            }
          ],
          "answer": "D",
          "type": "word",
          "note": "メールの日付は7月10日で、制度の開始は本文の beginning on August 1 が示すとおり8月1日、つまりまだ起きていない未来の出来事。未来を表す will introduce が正解。has introduced と introduced、had introduced はいずれも完了・過去を表し、これから始まる新制度の告知には合わない。"
        },
        {
          "no": 132,
          "choices": [
            {
              "label": "A",
              "text": "Employees may also apply any leftover credits to their gym memberships."
            },
            {
              "label": "B",
              "text": "Please also remember that the annual performance reviews will begin in September."
            },
            {
              "label": "C",
              "text": "These updated rates will take effect only at the start of the next fiscal year."
            },
            {
              "label": "D",
              "text": "Reimbursements will be issued through the standard monthly payroll cycle."
            }
          ],
          "answer": "D",
          "type": "sentence",
          "note": "直前で通勤費の補助額を説明し、直後で「登録は払い戻し用紙を提出」と手続きに入る流れ。払い戻しの仕組みを説明し reimbursement という語を先に導入する Reimbursements will be issued through the standard monthly payroll cycle がこの二文をつなぎ正解。gym memberships の leftover credits は本文で一度も触れておらず、未導入の情報を既知扱いしている点で不可。next fiscal year に効力発生とする文は、8月1日開始という本文の時系列と矛盾する。performance reviews の一文は人事の話題ではあるが、通勤補助制度の告知というこのメールの目的からずれている。"
        },
        {
          "no": 133,
          "choices": [
            {
              "label": "A",
              "text": "allowance"
            },
            {
              "label": "B",
              "text": "allowably"
            },
            {
              "label": "C",
              "text": "allowable"
            },
            {
              "label": "D",
              "text": "allowed"
            }
          ],
          "answer": "A",
          "type": "word",
          "note": "冠詞 a と separate に続き、前置詞 toward の前なので単数の名詞が入る位置。名詞の allowance(手当)が正解。allowable は形容詞、allowably は副詞、allowed は動詞・過去分詞で、いずれも名詞の位置には置けない。"
        },
        {
          "no": 134,
          "choices": [
            {
              "label": "A",
              "text": "Therefore"
            },
            {
              "label": "B",
              "text": "Similarly"
            },
            {
              "label": "C",
              "text": "For example"
            },
            {
              "label": "D",
              "text": "Unfortunately"
            }
          ],
          "answer": "D",
          "type": "word",
          "note": "前の文は自転車通勤者にも手当が出るという対象の拡大、この文は駐車料金は対象外という制限を伝えている。残念な制限事項を切り出す Unfortunately(あいにく)が正解。Therefore は因果、Similarly は類似、For example は例示で、いずれも「対象外」という制限の導入に合わない。"
        }
      ],
      "range": "131-134"
    },
    {
      "no": 2,
      "passageType": "review",
      "passage": "Reviewed by Priya Nandakumar\n\nThe Trailmark hiking app, developed by Fernwood Software, has quickly become a favorite among weekend explorers. §135§ The maps load instantly, even in areas with weak signal, and the trail descriptions are remarkably §136§. I especially appreciate the offline mode, which lets me record a route without draining the battery. Since the app was updated on May 14, its step-tracking feature has become far more §137§ than before. §138§, one drawback deserves mention: the free version limits users to three saved trails per month, which serious hikers will find restrictive. Even so, at $4.75 a month, the premium plan is a worthwhile upgrade for anyone who spends real time outdoors.",
      "intro": "Questions 135-138 refer to the following review.",
      "questions": [
        {
          "no": 135,
          "choices": [
            {
              "label": "A",
              "text": "Next month I plan to download it for the very first time."
            },
            {
              "label": "B",
              "text": "I have relied on it for nearly every trip I have taken this spring."
            },
            {
              "label": "C",
              "text": "The customer support team resolved my billing issue within hours."
            },
            {
              "label": "D",
              "text": "Fernwood Software also produces accounting tools for small businesses."
            }
          ],
          "answer": "B",
          "type": "sentence",
          "note": "直前で「週末の探検家に人気」と述べ、直後からマップ機能の具体的な感想が続く。評者自身の使用経験を導入する文が最も自然につながり、これが正解。来月初めてダウンロードするという文は、すでに使い込んでいる後続の文脈と時系列が矛盾する。カスタマーサポートが請求問題を解決したという文は、請求トラブルの話が一度も出ていないのに既知の情報として扱っており不可。Fernwoodが会計ツールも作るという文は、ハイキングアプリのレビューという文書の目的からズレるため外れる。"
        },
        {
          "no": 136,
          "choices": [
            {
              "label": "A",
              "text": "detailed"
            },
            {
              "label": "B",
              "text": "detail"
            },
            {
              "label": "C",
              "text": "details"
            },
            {
              "label": "D",
              "text": "detailing"
            }
          ],
          "answer": "A",
          "type": "word",
          "note": "are remarkably ___ の位置は、副詞 remarkably に修飾される叙述用法の形容詞が入る。detailed が形容詞で the descriptions are detailed(説明が詳しい)と自然につながり、これが正解。detail と details は名詞で be動詞の補語としては意味をなさず、detailing は動名詞/現在分詞で叙述の形容詞用法にそぐわない。"
        },
        {
          "no": 137,
          "choices": [
            {
              "label": "A",
              "text": "durable"
            },
            {
              "label": "B",
              "text": "accurate"
            },
            {
              "label": "C",
              "text": "affordable"
            },
            {
              "label": "D",
              "text": "portable"
            }
          ],
          "answer": "B",
          "type": "word",
          "note": "5月14日のアップデート以降、歩数トラッキング機能が以前よりはるかに「正確」になったという文脈。計測機能の改善を表す accurate が正解。durable(頑丈な)は物理的な耐久性でソフトウェアの機能に不適、affordable(手頃な)は価格の話、portable(持ち運べる)は精度の改善と無関係。4つとも製品レビュー頻出の形容詞なので、文脈で選ぶ。"
        },
        {
          "no": 138,
          "choices": [
            {
              "label": "A",
              "text": "However"
            },
            {
              "label": "B",
              "text": "Therefore"
            },
            {
              "label": "C",
              "text": "For example"
            },
            {
              "label": "D",
              "text": "In addition"
            }
          ],
          "answer": "A",
          "type": "word",
          "note": "ここまで長所を列挙してきた流れに対し、直後で one drawback(欠点)へ話を転じている。長所から欠点への逆接を示す However が正解。Therefore は因果関係を示し転換にならない。For example は具体例の提示で、新たに欠点を切り出す働きがない。In addition は同種の情報の追加で、プラスからマイナスへの方向転換を表せない。"
        }
      ],
      "range": "135-138"
    },
    {
      "no": 3,
      "passageType": "e-mail",
      "passage": "To: Bookings, Aldermoor Conference Centre\nFrom: Ms. Okonjo, Events Coordinator, Corva Publishing\nDate: July 10\nSubject: Venue request for our autumn author reception\n\nDear Booking Team,\n\nCorva Publishing §139§ your venue for our annual author receptions over the past six years, and we would like to reserve it once more this autumn. We are planning an evening event for roughly 120 guests on October 14.\n\n§140§ Could you therefore confirm whether the main hall and the adjoining terrace are both available on that date?\n\nWe would also appreciate a detailed §141§ covering catering, audiovisual equipment, and event staffing. Kindly send this information §142§ July 31 so that we can finalize our budget in good time.\n\nThank you for your continued assistance. I look forward to hearing from you.\n\nSincerely,\nMs. Okonjo",
      "intro": "Questions 139-142 refer to the following e-mail.",
      "questions": [
        {
          "no": 139,
          "choices": [
            {
              "label": "A",
              "text": "has used"
            },
            {
              "label": "B",
              "text": "used"
            },
            {
              "label": "C",
              "text": "is using"
            },
            {
              "label": "D",
              "text": "will use"
            }
          ],
          "answer": "A",
          "type": "word",
          "note": "over the past six years(過去6年間にわたり)という現在まで継続する期間を示す語句があるため、現在完了の has used が正解。単純過去 used は継続の含みがなく、この期間表現と噛み合わない。is using は現在進行で6年にわたる反復・継続を表せない。will use は未来を指し、過去からの継続という文意と時制が逆になる。"
        },
        {
          "no": 140,
          "choices": [
            {
              "label": "A",
              "text": "Last October's reception went smoothly and received excellent feedback."
            },
            {
              "label": "B",
              "text": "Our guest list has grown considerably since last year's reception."
            },
            {
              "label": "C",
              "text": "As you know, our new headquarters stands directly beside your terrace."
            },
            {
              "label": "D",
              "text": "We have decided to remove the catering portion from this year's program."
            }
          ],
          "answer": "B",
          "type": "sentence",
          "note": "空所の直後が『だからホールとテラスの両方が空いているか確認してほしい』と、より広いスペースを求める流れになっている。招待客が去年より増えたという一文がこの依頼の理由となり、両会場の空き確認へ自然につながるものが正解。去年の受付が好評だったという文は過去の感想で、両会場の空き確認という依頼の根拠にならない。新本社がテラスの隣にあるという文は本文で一度も触れていない情報を既知として扱っており、談話の流れから浮く。ケータリングを外すと述べる文は、後段のケータリングを含む見積り依頼と目的が矛盾する。"
        },
        {
          "no": 141,
          "choices": [
            {
              "label": "A",
              "text": "estimate"
            },
            {
              "label": "B",
              "text": "estimation"
            },
            {
              "label": "C",
              "text": "estimated"
            },
            {
              "label": "D",
              "text": "estimating"
            }
          ],
          "answer": "A",
          "type": "word",
          "note": "『ケータリング・音響・人員を含む詳細な〜』と、detailed に続く名詞が入る位置。費用の見積書を意味する estimate が正解。estimation も名詞だが『評価・推定という行為や判断』の意味で、金額の見積書は指さない。estimated は過去分詞/形容詞、estimating は動名詞/現在分詞で、いずれも名詞の位置に合わない。"
        },
        {
          "no": 142,
          "choices": [
            {
              "label": "A",
              "text": "until"
            },
            {
              "label": "B",
              "text": "since"
            },
            {
              "label": "C",
              "text": "within"
            },
            {
              "label": "D",
              "text": "by"
            }
          ],
          "answer": "D",
          "type": "word",
          "note": "『7月31日までに情報を送ってほしい』という締切を示す文脈で、期限を表す by が正解。until は動作や状態がその時点まで継続することを表し、一回で完了する送付の締切には合わない。since は起点を表し文意に合わない。within は『31日以内に』なら within July のように使うが、日付を直接続ける形は不自然。"
        }
      ],
      "range": "139-142"
    },
    {
      "no": 4,
      "passageType": "article",
      "passage": "HARLEIGH — Construction of the Kestrel River footbridge will begin on March 3, the town announced on February 12. §143§ Once completed, the bridge will §144§ pedestrians to cross safely between the market district and the riverside park. The council approved a budget of $1,242,850, which covers materials, labor, and §145§ landscaping along both banks. Council president Dana Voss said the design was chosen for its low maintenance costs. §146§, she noted that the walkway will remain open during most of the work, closing only on weekends. Residents are invited to a public meeting on February 20 to review the final plans.",
      "intro": "Questions 143-146 refer to the following article.",
      "questions": [
        {
          "no": 143,
          "choices": [
            {
              "label": "A",
              "text": "Local cafes have reported a sharp rise in weekend dessert sales."
            },
            {
              "label": "B",
              "text": "The footbridge drew heavy foot traffic on its opening weekend."
            },
            {
              "label": "C",
              "text": "A second footbridge will serve cyclists heading toward the stadium."
            },
            {
              "label": "D",
              "text": "The project is expected to take about eight months to finish."
            }
          ],
          "answer": "D",
          "type": "sentence",
          "note": "着工日(3月3日)を告げた直後で、次の Once completed(完成したら)へつなぐには完成までの見通しを述べるのが自然。「工期は約8か月」が正解。他の3択はどれも橋・工事という同じ話題だが切れる: 「開通した週末に大勢が渡った」は橋がまだ未着工なのに開通済み扱いで時系列が矛盾する。「2本目の歩道橋がスタジアム方面へ…」は本文に出ていない2本目の橋やスタジアムを既知の情報として持ち出している。「地元カフェの週末デザート売上が伸びた」は公共工事を伝えるこの記事の目的からズレる。"
        },
        {
          "no": 144,
          "choices": [
            {
              "label": "A",
              "text": "allow"
            },
            {
              "label": "B",
              "text": "remind"
            },
            {
              "label": "C",
              "text": "require"
            },
            {
              "label": "D",
              "text": "train"
            }
          ],
          "answer": "A",
          "type": "word",
          "note": "完成後の歩道橋の働きとして「歩行者が市場地区と川辺公園の間を安全に渡れるようにする」の allow+目的語+to不定詞 が正解。remind(思い出させる)・require(義務付ける)・train(訓練する)も同じ「目的語+to不定詞」の型を取れるため文法では切れないが、橋が歩行者に渡ることを思い出させる・義務付ける・訓練するはいずれも意味が成立しない。"
        },
        {
          "no": 145,
          "choices": [
            {
              "label": "A",
              "text": "decorate"
            },
            {
              "label": "B",
              "text": "decoration"
            },
            {
              "label": "C",
              "text": "decoratively"
            },
            {
              "label": "D",
              "text": "decorative"
            }
          ],
          "answer": "D",
          "type": "word",
          "note": "直後の名詞 landscaping を修飾する語が入るので形容詞の decorative(装飾的な)が正解。decorate は動詞の原形、decoration は名詞、decoratively は副詞で、いずれも名詞 landscaping を直接修飾できない。"
        },
        {
          "no": 146,
          "choices": [
            {
              "label": "A",
              "text": "Instead"
            },
            {
              "label": "B",
              "text": "However"
            },
            {
              "label": "C",
              "text": "In addition"
            },
            {
              "label": "D",
              "text": "As a result"
            }
          ],
          "answer": "C",
          "type": "word",
          "note": "前文で低メンテナンスという利点を述べ、後半で「工事中も歩道はほぼ開いている」ともう一つの安心材料を重ねる流れなので、追加を表す In addition が正解。However は逆接だが前後に対比はない。Instead は前の内容の置き換えを表すが置き換えの関係ではない。As a result は因果を示すが、前文はこの内容の原因ではない。"
        }
      ],
      "range": "143-146"
    }
  ],
  "part7single": [
    {
      "no": 1,
      "kind": "single",
      "passageType": "sign",
      "passages": [
        {
          "heading": "Quayside Parking Structure",
          "type": "sign",
          "body": "NOTICE TO ALL PERMIT HOLDERS\n\nEffective September 3, the third level (Level 3) of the Quayside Parking Structure will be closed for resurfacing of the concrete floor and repainting of all space markings. Work is expected to continue through September 19.\n\nDuring this period, permit holders who normally park on Level 3 should use Level 5, where 60 spaces have been reserved. Access Level 5 by way of the east ramp only; the west ramp will remain reserved for delivery vehicles.\n\nVehicles found parked on Level 3 at any time before September 20 will be issued a penalty of $85.50 and may be towed at the owner's expense. Overnight parking on any level between 1:00 A.M. and 5:00 A.M. continues to require a separate blue overnight tag, available at the ground-floor office.\n\nQuestions may be directed to the management team at the ground-floor office, open weekdays from 7:00 A.M. to 6:00 P.M.\n\n- Tenmoor Facilities"
        }
      ],
      "intro": "Questions 147-148 refer to the following sign.",
      "questions": [
        {
          "no": 147,
          "question": "What is the purpose of the notice?",
          "choices": [
            {
              "label": "A",
              "text": "To request that delivery drivers stop using the east ramp"
            },
            {
              "label": "B",
              "text": "To introduce a new company that will manage the parking structure"
            },
            {
              "label": "C",
              "text": "To explain how permit holders can apply for an overnight tag"
            },
            {
              "label": "D",
              "text": "To announce that a level of a parking structure will be temporarily unavailable"
            }
          ],
          "answer": "D",
          "note": "本文冒頭で Level 3 が9月3日から9月19日まで舗装工事のため閉鎖されると告知しており、掲示の狙いは駐車場の一区画が一時的に使えなくなることを知らせること。「新しく管理を始める会社を紹介する」という選択肢は末尾の運営者名 Tenmoor Facilities を管理会社の交代告知にすり替えたもので、本文は運営会社の変更に一切触れていない。「オーバーナイトタグの申請方法を説明する」という選択肢は、タグが地上階オフィスで入手できるという付随情報を掲示全体の目的にすり替えたもので、これは主旨ではない。「配送ドライバーに east ramp の使用をやめるよう求める」という選択肢は east ramp と west ramp の役割を逆にしたもので、本文では配送車が使うのは west ramp、Level 5へ上がるのに使うのが east ramp。"
        },
        {
          "no": 148,
          "question": "What is indicated about vehicles parked on Level 3 during the closure?",
          "choices": [
            {
              "label": "A",
              "text": "They will be moved to Level 5 free of charge"
            },
            {
              "label": "B",
              "text": "They must display a blue overnight tag"
            },
            {
              "label": "C",
              "text": "They will incur a charge of $85.50"
            },
            {
              "label": "D",
              "text": "They may remain if parked before 5:00 A.M."
            }
          ],
          "answer": "C",
          "note": "本文に「Vehicles found parked on Level 3 ... will be issued a penalty of $85.50」とあり、閉鎖期間中にLevel 3へ駐車した車には85.50ドルの罰金が科される。「青いオーバーナイトタグの掲示が必要」という選択肢は、1:00-5:00 A.M.の夜間駐車に要るタグをLevel 3違反車の条件に付け替えたもの。「無料でLevel 5へ移動させてもらえる」という選択肢は、60台分を確保したLevel 5への案内を無料移動にすり替えたもので、実際は towed at the owner's expense(所有者負担のレッカー移動)。「5:00 A.M.より前に駐車していれば残してよい」という選択肢は夜間駐車の時間帯 1:00-5:00 A.M. をLevel 3駐車の許可条件に付け替えたもので、罰金は9月20日より前ならいつでも科される。"
        }
      ],
      "range": "147-148"
    },
    {
      "no": 2,
      "kind": "single",
      "passageType": "form",
      "passages": [
        {
          "heading": "Brindlemere Autumn Festival — Volunteer Application",
          "type": "form",
          "body": "BRINDLEMERE AUTUMN FESTIVAL\nVolunteer Application Form\nLocation: Wickley Park\n\nApplicant Name: Talia Renner\nPhone: 555-0148\nApplication Date: September 22\n\nPreferred Role (check all that apply):\n[X] Parking Attendant *\n[ ] Ticket Booth\n[X] Setup and Takedown Crew\n[ ] Food Stall Assistant **\n\n* This role requires a valid driver's license.\n** This role requires a food-handling certificate.\n\nPreferred Shift (check one):\n[ ] Morning (8:00 A.M. - 12:00 P.M.)\n[X] Afternoon (12:00 P.M. - 5:00 P.M.)\n\nComments: I directed traffic at last year's spring market, so I am comfortable guiding cars into the lot. I cannot take the morning shift because it overlaps with my regular part-time job.\n\n--- ALL VOLUNTEERS MUST ---\n- Attend the orientation session, held at Wickley Park exactly one week before the festival.\n- Wear the festival vest handed out at the check-in table (please do not bring your own).\n- Arrive at least 30 minutes before the assigned shift begins.\n\nFestival Date: Saturday, October 17\nApplication Deadline: September 30\n\nFor Office Use Only:\nApproved by M. Doyle on September 25"
        }
      ],
      "intro": "Questions 149-151 refer to the following form.",
      "questions": [
        {
          "no": 149,
          "question": "What is suggested about Ms. Renner?",
          "choices": [
            {
              "label": "A",
              "text": "She has earned a food-handling certificate."
            },
            {
              "label": "B",
              "text": "She would prefer to work in the morning."
            },
            {
              "label": "C",
              "text": "She submitted her form after the deadline."
            },
            {
              "label": "D",
              "text": "She holds a valid driver's license."
            }
          ],
          "answer": "D",
          "note": "レンナーさんは Parking Attendant にチェックを入れており、その役割には星印(*)で「valid driver's license が必要」と注記されている。だから彼女が運転免許を持っていると示唆できる。食品衛生証明書は、二重星印(**)の Food Stall Assistant の要件で、彼女はそこにチェックを入れていない(要件の付け替え)。朝勤務を好むというのは、彼女が Afternoon にチェックしコメントでも朝は仕事と重なると書いているため逆。締切後の提出は、記入日 September 22 が締切 September 30 より前なので誤り。"
        },
        {
          "no": 150,
          "question": "According to the form, what are all volunteers required to do?",
          "choices": [
            {
              "label": "A",
              "text": "Present a valid driver's license."
            },
            {
              "label": "B",
              "text": "Wear a vest given to them at check-in."
            },
            {
              "label": "C",
              "text": "Submit a food-handling certificate."
            },
            {
              "label": "D",
              "text": "Guide cars into the parking lot."
            }
          ],
          "answer": "B",
          "note": "「ALL VOLUNTEERS MUST」の欄に、check-in table で配られる festival vest を着用すること(自前は不可)と明記されている。運転免許の提示は星印付きの Parking Attendant のみの要件で、全員ではない(役割限定要件の付け替え)。食品衛生証明書も二重星印の Food Stall Assistant 限定の要件。車を誘導するというのは、レンナーさん個人が Comments 欄に書いた経験・担当内容であって、全ボランティアへの要求ではない(記入者コメントからの付け替え)。したがって全員に共通して求められるのはベスト着用。"
        },
        {
          "no": 151,
          "question": "When will the orientation session most likely take place?",
          "choices": [
            {
              "label": "A",
              "text": "On September 30"
            },
            {
              "label": "B",
              "text": "On October 17"
            },
            {
              "label": "C",
              "text": "On October 10"
            },
            {
              "label": "D",
              "text": "On September 25"
            }
          ],
          "answer": "C",
          "note": "フォームには orientation が「祭りのちょうど1週間前」に Wickley Park で開かれるとあり、Festival Date は Saturday, October 17。その1週間前は October 10 になる。September 30 は Application Deadline の日付の付け替え。October 17 は祭り当日そのものでオリエンの日ではない。September 25 は M. Doyle が承認した事務処理日(Office Use Only)であり、オリエンとは無関係。ゆえに10月10日が最も妥当。"
        }
      ],
      "range": "149-151"
    },
    {
      "no": 3,
      "kind": "single",
      "passageType": "form",
      "passages": [
        {
          "heading": "Ashcombe Media — Expense Reimbursement Form",
          "type": "form",
          "body": "Employee: Mr. Devlin\nDepartment: Regional Sales\nSupervisor: Ms. Haugen\nDate Submitted: April 1\n\nPolicy: All expenses must be submitted within 30 days of the date incurred. Approved reimbursements are processed within 10 business days of Ms. Haugen's sign-off. Original receipts must be attached for any single item over $50.00.\n\n| Category | Description | Date | Amount |\n| Airfare | Round-trip flight to the regional sales conference | March 3 | $312.45 |\n| Lodging | Two nights at the Harbor View Inn | March 3–4 | $268.90 |\n| Ground Transport | Taxi from the airport to the conference venue | March 4 | $37.60 |\n| Meals | Client dinner for three attendees | March 5 | $94.15 |\n| Total | | | $713.10 |\n\nEmployee signature: J. Devlin     Date: April 1\nApproved by: ______________________"
        }
      ],
      "intro": "Questions 152-153 refer to the following form.",
      "questions": [
        {
          "no": 152,
          "question": "On what date did Mr. Devlin take a taxi to the conference venue?",
          "choices": [
            {
              "label": "A",
              "text": "March 4"
            },
            {
              "label": "B",
              "text": "March 3"
            },
            {
              "label": "C",
              "text": "March 5"
            },
            {
              "label": "D",
              "text": "March 3–4"
            }
          ],
          "answer": "A",
          "note": "表のGround Transport(タクシー)行の日付がMarch 4と記載されており、これが根拠。残る3択はいずれも別の費目の日付を付け替えたもの。March 3はAirfare(および宿泊初日)の日付、March 5はMeals(client dinner)の日付、March 3–4はLodgingの宿泊期間で、どれも本文の別行を参照して初めて排除できる。"
        },
        {
          "no": 153,
          "question": "What is suggested about Mr. Devlin's reimbursement request?",
          "choices": [
            {
              "label": "A",
              "text": "It will be processed within 30 days of Ms. Haugen's approval."
            },
            {
              "label": "B",
              "text": "It was submitted within the required time frame."
            },
            {
              "label": "C",
              "text": "It was submitted more than 30 days after the flight was purchased."
            },
            {
              "label": "D",
              "text": "It is missing a required receipt for the taxi expense."
            }
          ],
          "answer": "B",
          "note": "ポリシー文は費用を『発生日(date incurred)から30日以内に提出』と定める。提出期限が最も厳しいのは発生日が最も早い費目で、Airfare(March 3)から提出日April 1まで数えても29日で30日以内に収まっているため、期限内提出という記述が根拠となる。処理が『承認から30日以内』とする選択肢は、承認後の処理期間が本文では『10営業日以内』と定められているのに、提出期限の数値30日を処理側に付け替えた誤り。『航空券購入から30日を超えて提出した』とする選択肢は、同じMarch 3からApril 1まで29日で30日を超えないため事実に反する。『タクシー代の領収書が不足している』とする選択肢は、領収書添付が必要なのは50ドル超の項目のみで、タクシーは37.60ドルなので不要——50ドルルールを別対象に付け替えた誤り。"
        }
      ],
      "range": "152-153"
    },
    {
      "no": 4,
      "kind": "single",
      "passageType": "text-message chain",
      "passages": [
        {
          "heading": "Text Message Chain",
          "type": "text-message chain",
          "body": "Elias Whitcombe (8:14 A.M.)\nNadia, I just reached the trade show hall. The freight elevator is out of service, so I ended up carrying both sample crates up the west stairwell. My back is not thanking me.\n\nNadia Sorensen (8:16 A.M.)\nAre the crates all right? The tablet displays inside are fragile.\n\nElias Whitcombe (8:17 A.M.)\nThey're fine. The real problem is our booth. We were assigned space 42, but there's already a banner hanging there — some furniture distributor.\n\nNadia Sorensen (8:19 A.M.)\nThat can't be right. Our contract clearly lists space 42, near the north entrance. Did you ask the event desk?\n\nElias Whitcombe (8:20 A.M.)\nNot yet. I wanted to reach you first. Should I just shift our crates to space 44? It's empty and right next door.\n\nNadia Sorensen (8:22 A.M.)\nDon't move anything. If we set up in the wrong spot, we'll only have to tear it down again. I have the coordinator's direct line — let me call.\n\nElias Whitcombe (8:23 A.M.)\nGood idea. While you do that, I'll run out for coffee. I've been up since 4.\n\nNadia Sorensen (8:31 A.M.)\nJust walked in, and it's sorted. The organizer apologized — the furniture company was actually booked for space 42 in Hall B, not our hall. They'll clear our space within the hour.\n\nElias Whitcombe (8:33 A.M.)\nWhat a relief. So we're still on for the 10 A.M. opening?\n\nNadia Sorensen (8:34 A.M.)\nShould be. But let's have the displays powered on by 9:30 to test the demo. Can you be back by 9?\n\nElias Whitcombe (8:35 A.M.)\nI'll be there. Hold the fort."
        }
      ],
      "intro": "Questions 154-155 refer to the following text-message chain.",
      "questions": [
        {
          "no": 154,
          "question": "At 8:35 A.M., what does Mr. Whitcombe most likely mean when he writes, \"Hold the fort\"?",
          "choices": [
            {
              "label": "A",
              "text": "He believes the booth location problem has not been resolved."
            },
            {
              "label": "B",
              "text": "He is offering to defend the booth against competing exhibitors."
            },
            {
              "label": "C",
              "text": "He wants Ms. Sorensen to keep things under control until he returns."
            },
            {
              "label": "D",
              "text": "He wants Ms. Sorensen to move the sample crates herself."
            }
          ],
          "answer": "C",
          "note": "8:35の直前でEliasはコーヒーを買いに外に出ており(8:23)、Nadiaに9時までに戻ると告げている(8:34への返信)。「Hold the fort」はその流れで、自分が戻るまで現場のブースをNadiaに任せて回しておいてほしいという依頼。よって「戻るまで状況をコントロールしておいてほしい」が本文と整合する。競合出展者からブースを守るとする選択肢はfortの辞書的意味(砦を守る=防衛する)に引っ張ったうえ、他社バナー騒動の要素を別の意図に付け替えたもの。場所問題が未解決とする選択肢はNadiaが8:31で解決済みと伝えているため矛盾。木箱をNadiaに運ばせたいとする選択肢は、木箱を運んだのはElias本人(8:14)であり動作主体を付け替えている。"
        },
        {
          "no": 155,
          "question": "What does Ms. Sorensen indicate about the furniture company?",
          "choices": [
            {
              "label": "A",
              "text": "It refused to take down its banner."
            },
            {
              "label": "B",
              "text": "It carried its crates up the west stairwell."
            },
            {
              "label": "C",
              "text": "It had been booked for space 42 in a different hall."
            },
            {
              "label": "D",
              "text": "It had reserved a space near the north entrance."
            }
          ],
          "answer": "C",
          "note": "Nadiaは8:31で、家具会社は本来この会場ではなくHall Bの42に予約されていたと説明している。したがって別の会場の42に入るはずだったという内容が本文どおり。バナーの撤去を拒否したという選択肢は本文になく、主催者が1時間以内に空けると言っている点とも合わない。西側階段で木箱を運んだのはEliasの行動(8:14)であり主体の付け替え。北入口近くのスペースを予約したのはNadia側の契約スペース42(8:19)の事実で、これを家具会社に付け替えた誤り。"
        }
      ],
      "range": "154-155"
    },
    {
      "no": 5,
      "kind": "single",
      "passageType": "e-mail",
      "passages": [
        {
          "type": "e-mail",
          "body": "To: All Pentworth Financial Staff\nFrom: Roland Mercer, Facilities Manager\nDate: March 3\nSubject: Relocation to Aldgate Row\n\nDear colleagues,\n\nAs many of you are aware, Pentworth Financial has outgrown its current premises on Bellamy Street, where we have been based for eleven years. — [1] — I am writing to confirm that we will complete our move to a newly renovated office at Aldgate Row over the weekend of April 18 and 19.\n\nTo make the transition as smooth as possible, please observe the following schedule. — [2] — On Thursday, April 16, each staff member will receive two labeled crates for personal belongings and documents. All crates must be packed, sealed, and left beside your desk by 5:00 P.M. on Friday, April 17. Our contracted movers, not employees, will transport every crate, along with monitors and desktop computers, on Saturday morning.\n\nBecause the building's elevators will be reserved for the moving crew all weekend, staff will not be permitted on-site until Monday, April 20. — [3] — When you arrive that morning, please collect your access card from the reception desk on the ground floor; the old cards will be deactivated at midnight on Sunday.\n\nA few reminders. Parking at Aldgate Row is limited, so I strongly encourage the use of Dunmore Street station, a six-minute walk away. — [4] — Anyone who requires a reserved parking space for accessibility reasons should e-mail me directly by April 10 so that arrangements can be made in advance.\n\nIf you have questions, my extension remains unchanged.\n\nRoland Mercer\nFacilities Manager"
        }
      ],
      "intro": "Questions 156-158 refer to the following e-mail.",
      "questions": [
        {
          "no": 156,
          "question": "What is the purpose of the e-mail?",
          "choices": [
            {
              "label": "A",
              "text": "To request volunteers to help transport office equipment"
            },
            {
              "label": "B",
              "text": "To announce that a company is moving to a new location"
            },
            {
              "label": "C",
              "text": "To explain a change to the company's parking policy"
            },
            {
              "label": "D",
              "text": "To introduce a newly hired facilities manager"
            }
          ],
          "answer": "B",
          "note": "冒頭で「Aldgate Row の新しく改装したオフィスへ 4月18・19日の週末に移転する」と告知しており、目的は移転の連絡。運搬ボランティア募集は誤りで、本文は「contracted movers, not employees」が運ぶと明記しており、業者の仕事を社員に付け替えた選択肢。駐車ポリシー変更の説明も誤りで、駐車は末尾の注意喚起にすぎず、スペースが限られているため駅利用を勧めているだけで方針変更ではない。新任 Facilities Manager の紹介も誤りで、Roland Mercer は自分の内線番号が変わらないと述べており在任中の人物だと分かる。"
        },
        {
          "no": 157,
          "question": "What are staff members asked to do by Friday, April 17?",
          "choices": [
            {
              "label": "A",
              "text": "Collect an access card from the reception desk"
            },
            {
              "label": "B",
              "text": "Transport their monitors to the Aldgate Row office"
            },
            {
              "label": "C",
              "text": "Pack and seal their crates and leave them by their desks"
            },
            {
              "label": "D",
              "text": "E-mail Mr. Mercer to request a parking space"
            }
          ],
          "answer": "C",
          "note": "本文に「All crates must be packed, sealed, and left beside your desk by 5:00 P.M. on Friday, April 17」とあり、梱包・封をして机の脇に置くのが 4月17日金曜までの作業。monitor の運搬は「土曜の朝に業者が」行う作業を付け替えた誤り。access card の受け取りは「Monday, April 20」に到着してから行う行動で、日付を付け替えた誤り。駐車スペースを求めるメールは締切が「April 10」であり、こちらも日付を付け替えた誤り。"
        },
        {
          "no": 158,
          "question": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? \"The one exception will be members of the IT team, who need to configure the network on Sunday afternoon.\"",
          "choices": [
            {
              "label": "A",
              "text": "[3]"
            },
            {
              "label": "B",
              "text": "[2]"
            },
            {
              "label": "C",
              "text": "[1]"
            },
            {
              "label": "D",
              "text": "[4]"
            }
          ],
          "answer": "A",
          "note": "挿入文は「唯一の例外は IT チームで、日曜の午後にネットワークを設定する必要がある」という内容。直前で「staff will not be permitted on-site until Monday, April 20(月曜まで社員は立ち入り禁止)」と述べた [3] の位置が、その禁止に対する例外を示す流れとして最も自然。[1] は移転を確定する導入部で例外の話に接続しない。[2] は梱包スケジュールを導入する箇所で立ち入り制限の文脈がない。[4] は駐車と最寄り駅の話題であり、IT チームの立ち入り例外とはつながらない。"
        }
      ],
      "range": "156-158"
    },
    {
      "no": 6,
      "kind": "single",
      "passageType": "notice",
      "passages": [
        {
          "heading": "Harnby Borough Council — Public Works Notice",
          "type": "notice",
          "body": "NOTICE OF TEMPORARY FOOTPATH CLOSURE\n\nThe Harnby Borough Council wishes to inform residents that the Alderbrook footpath will be closed to all pedestrian traffic from Monday, September 8 through Friday, September 26. The path will reopen on the morning of Monday, September 29.\n\nDuring heavy rainfall last winter, water collected along the lower section of the path and washed away much of the gravel surface, leaving several stretches uneven and unsafe after dark. To prevent this from happening again, the Council has approved a resurfacing project that will also install a new drainage channel beneath the path. The total cost of the work is £18,450, funded through the Council's annual maintenance budget.\n\nWork crews will be on site each weekday between 8:00 A.M. and 5:00 P.M. No work is scheduled on weekends. Residents living along Alderbrook Row may notice some noise from cutting equipment during these hours.\n\nWhile the footpath is closed, walkers who normally use it to reach the town center should instead use the Marsh Lane crossing, located roughly 300 meters to the east. Because the crossing follows the main road rather than the direct riverside route, it adds about 400 meters to the walk. The Alderbrook footpath itself measures 1.2 kilometers end to end.\n\nQuestions may be directed to the Public Works Office at 555-0147 during regular business hours."
        }
      ],
      "intro": "Questions 159-160 refer to the following notice.",
      "questions": [
        {
          "no": 159,
          "question": "What is the purpose of the notice?",
          "choices": [
            {
              "label": "A",
              "text": "To request that residents report damage caused by flooding"
            },
            {
              "label": "B",
              "text": "To announce a temporary closure of a footpath for repairs"
            },
            {
              "label": "C",
              "text": "To invite the public to comment on a proposed drainage budget"
            },
            {
              "label": "D",
              "text": "To warn drivers about roadwork near the Marsh Lane crossing"
            }
          ],
          "answer": "B",
          "note": "告知は冒頭で「the Alderbrook footpath will be closed to all pedestrian traffic from Monday, September 8 through Friday, September 26」と述べ、resurfacing project の実施を知らせているので、修理のための一時閉鎖の周知が目的。住民に洪水被害の報告を求めるとする選択肢は、本文の「washed away much of the gravel surface」という被害の記述を依頼へすり替えたもので、告知は情報提供であって報告依頼ではない。排水予算への意見募集とする選択肢は、£18,450 の drainage 予算という数字を意見募集の対象へ付け替えたもので、本文は「approved」と既に承認済みと述べている。Marsh Lane crossing 付近の車道工事を運転者に警告するとする選択肢は、同 crossing を歩行者向けの迂回路ではなく車の roadwork 現場へ付け替えたもので、本文はあくまで歩行者の代替路として案内している。"
        },
        {
          "no": 160,
          "question": "What is indicated about the Marsh Lane crossing?",
          "choices": [
            {
              "label": "A",
              "text": "It is located roughly 400 meters to the east of the footpath"
            },
            {
              "label": "B",
              "text": "Using it lengthens the walk to the town center by about 400 meters"
            },
            {
              "label": "C",
              "text": "It will remain closed until Monday, September 29"
            },
            {
              "label": "D",
              "text": "It runs alongside the river rather than the main road"
            }
          ],
          "answer": "B",
          "note": "本文は「Because the crossing follows the main road ... it adds about 400 meters to the walk」と述べており、迂回に使うと徒歩距離が約400メートル長くなる。約400メートル東に位置するとする選択肢は、実際の位置である「roughly 300 meters to the east」に、迂回で加算される 400 meters の数字を付け替えた数値のすり替え。September 29 まで閉鎖されるとする選択肢は、閉鎖されて同日に reopen するのは Alderbrook footpath の方であり、その日付と閉鎖を crossing に付け替えたもの。川沿いを通るとする選択肢は「follows the main road rather than the direct riverside route」を逆にしたすり替えで、川沿いなのは閉鎖される footpath の直行ルートの方。"
        }
      ],
      "range": "159-160"
    },
    {
      "no": 7,
      "kind": "single",
      "passageType": "article",
      "passages": [
        {
          "heading": "Cindermoor Analytics Buys Ravensby Research to Enter Farm-Data Market",
          "type": "article",
          "body": "AUSTIN (March 3) — Cindermoor Analytics, a software company best known for its retail forecasting tools, announced today that it had acquired Ravensby Research for $47.5 million. The purchase gives Cindermoor its first foothold in agricultural data, a sector the company had previously avoided.\n\nRavensby Research, founded in 2014 by Mr. Aldo Terrini, builds sensors that measure soil moisture and predict crop yields. The 60-person firm, based in Portland, counts more than 300 farms among its clients, most of them in the Pacific Northwest.\n\n\"For eleven years we sold weather models to shopping malls,\" said Cindermoor's chief executive, Ms. Yolanda Prei. \"Farmers kept asking us the very same questions our retailers were asking, and we simply had no product to offer them. Ravensby did.\"\n\nUnder the agreement, Ravensby will keep both its Portland office and its name. Mr. Terrini will not stay on as an executive; instead, he will shift into an advisory role and spend most of his time recruiting engineers for a new laboratory that Cindermoor plans to open in Denver in October.\n\nMs. Prei added that the two firms' combined product — a subscription dashboard priced at $89 a month — would be released to the public on June 15, three months after the deal closes."
        }
      ],
      "intro": "Questions 161-163 refer to the following article.",
      "questions": [
        {
          "no": 161,
          "question": "What is suggested about Cindermoor Analytics?",
          "choices": [
            {
              "label": "A",
              "text": "It had no products for farmers before the acquisition."
            },
            {
              "label": "B",
              "text": "It was founded in 2014."
            },
            {
              "label": "C",
              "text": "It is based in Portland."
            },
            {
              "label": "D",
              "text": "It employs about 60 people."
            }
          ],
          "answer": "A",
          "note": "第1段落の「its first foothold in agricultural data, a sector the company had previously avoided」と、Prei氏の発言「we simply had no product to offer them」から、買収前のCindermoorは農家向けの製品を持っていなかったと示唆される。誤答の2014年はRavensbyの設立年、拠点PortlandはRavensbyの所在地、約60人もRavensbyの規模で、いずれも被買収側Ravensbyの事実を買収側Cindermoorに付け替えたもの。本文を照合しないと切れない。"
        },
        {
          "no": 162,
          "question": "In the article, the word \"counts\" in paragraph 2 is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "includes"
            },
            {
              "label": "B",
              "text": "calculates"
            },
            {
              "label": "C",
              "text": "announces"
            },
            {
              "label": "D",
              "text": "depends"
            }
          ],
          "answer": "A",
          "note": "「counts more than 300 farms among its clients」は「300以上の農場を顧客に含めている」の意で、ここでのcountsはincludes（含む）に最も近い。誤答のcalculatesは「計算する」というcountの字義的な意味に引きずらせた罠で、among its clientsという文脈に合わない。announcesは第2段落に「発表」の話題がなく無関係方向、dependsは「count on＝〜に依存する」の連語に釣らせたもので、顧客を含めるという他動詞の関係を取り違えている。"
        },
        {
          "no": 163,
          "question": "What will Mr. Terrini most likely do after the acquisition?",
          "choices": [
            {
              "label": "A",
              "text": "Hire engineers for a laboratory in Denver."
            },
            {
              "label": "B",
              "text": "Serve as an executive at Cindermoor."
            },
            {
              "label": "C",
              "text": "Open a new office in Portland."
            },
            {
              "label": "D",
              "text": "Release a subscription dashboard on June 15."
            }
          ],
          "answer": "A",
          "note": "第4段落の「he will shift into an advisory role and spend most of his time recruiting engineers for a new laboratory that Cindermoor plans to open in Denver」から、Terrini氏はDenverの新研究所のためにエンジニアを採用すると分かる。誤答の「executiveとして残る」は同段落の「will not stay on as an executive」に真っ向から反するひっかけ。Portlandを新設とする選択肢は、本文ではPortlandは既存拠点を維持するだけで新設はDenverの研究所だという所在地の付け替え。June 15の製品公開は最終段落でPrei氏が語った会社側の予定であり、Terrini個人の行動に付け替えたもの。"
        }
      ],
      "range": "161-163"
    },
    {
      "no": 8,
      "kind": "single",
      "passageType": "schedule",
      "passages": [
        {
          "heading": "Wexbury Small Business Circle — Half-Day Forum",
          "type": "schedule",
          "body": "Growing on a Shoestring: A Morning for New Owners\nSaturday, October 14 — Wexbury Community Hall, Room 2\nAdmission: $35 (includes a networking lunch)\n\n8:30 A.M.  Registration and coffee\n\n9:00 A.M.  Welcome and Orientation — Corinne Delisle\nMs. Delisle, who founded the Wexbury Small Business Circle in 2014, will greet attendees, review the morning's plan, and explain the question cards placed at each seat. She will gather the cards during each talk and read the best questions aloud in the minutes that follow.\n\n9:15 A.M.  Funding Your First Year — Mr. Ravi Sundaram\nDrawing on 12 years at a regional bank, Mr. Sundaram will compare three common loan types. He will explain why firms with fewer than five employees are so often turned down and how owners can raise their odds of approval.\n\n10:00 A.M.  Reaching Customers Without a Big Budget — Ms. Blythe Okafor\nMs. Okafor grew her bakery to 8,000 online followers in six months while spending under $50 a month. Her session focuses on short video and other low-cost ways to advertise.\n\n10:45 A.M.  Coffee break (15 minutes)\n\n11:00 A.M.  Your First Hire — Mr. Tomasz Wnuk\nMr. Wnuk, an employment lawyer, will walk through contracts, payroll-tax registration, and the paperwork every owner must complete before a new employee's first day.\n\n11:45 A.M.  Keeping the Money Flowing — Ms. Farida Belhaj\nMs. Belhaj, an accountant, will show how to track a business's income month to month and will demonstrate two free bookkeeping apps that help owners avoid running short between invoices.\n\n12:30 P.M.  Networking lunch"
        }
      ],
      "intro": "Questions 164-167 refer to the following schedule.",
      "questions": [
        {
          "no": 164,
          "question": "What is indicated about the forum?",
          "choices": [
            {
              "label": "A",
              "text": "A meal is included in the registration fee."
            },
            {
              "label": "B",
              "text": "Speakers will each present for a full hour."
            },
            {
              "label": "C",
              "text": "It is intended for companies with more than five employees."
            },
            {
              "label": "D",
              "text": "Questions may be asked only during the lunch break."
            }
          ],
          "answer": "A",
          "note": "料金欄に「Admission: $35 (includes a networking lunch)」とあり、参加費に昼食が含まれるので、正解はランチが料金に込みという選択肢。誤答はいずれも本文の別事実の付け替え。「1時間の講演」はSundaram(9:15)とOkafor(10:00)の間隔が45分である時間割の付け替え。「従業員5人超の企業向け」はSundaramが説明する『従業員5人未満の企業が融資を断られやすい』を対象反転させたもの。「質問は昼食中のみ」は、Delisleが各講演中に質問カードを集めて直後に読み上げるという進行の付け替え。"
        },
        {
          "no": 165,
          "question": "What will Ms. Delisle most likely do at the forum?",
          "choices": [
            {
              "label": "A",
              "text": "Present a session on hiring staff."
            },
            {
              "label": "B",
              "text": "Explain how to apply for a business loan."
            },
            {
              "label": "C",
              "text": "Collect questions and read some of them aloud."
            },
            {
              "label": "D",
              "text": "Demonstrate free bookkeeping applications."
            }
          ],
          "answer": "C",
          "note": "9:00の説明でDelisleは各座席の質問カードを講演中に集め、良い質問を読み上げるとある。司会として質問を集めて一部を読み上げる役割が読み取れるので、正解は質問を集めて一部を読み上げる選択肢。誤答は各講師の担当内容の付け替え。「採用の講演」はWnuk(11:00)、「融資の申し込み方の説明」はSundaram(9:15)、「無料の帳簿アプリの実演」はBelhaj(11:45)の仕事で、司会のDelisleではない。"
        },
        {
          "no": 166,
          "question": "What is NOT a topic that will be covered at the forum?",
          "choices": [
            {
              "label": "A",
              "text": "Obtaining financing for a new business"
            },
            {
              "label": "B",
              "text": "Preparing to hire a first employee"
            },
            {
              "label": "C",
              "text": "Advertising on a limited budget"
            },
            {
              "label": "D",
              "text": "Designing a new product"
            }
          ],
          "answer": "D",
          "note": "新商品の設計に触れるセッションは時間割のどこにもないため、扱われない話題はこれ。他の3つはすべて実際のセッションの言い換え。融資の獲得はSundaramの『Funding Your First Year』、限られた予算での宣伝はOkaforの『Reaching Customers Without a Big Budget』、初めての採用準備はWnukの『Your First Hire』に対応し、いずれも本文で扱われるので不適。"
        },
        {
          "no": 167,
          "question": "Who most likely will speak about protecting a business's monthly income?",
          "choices": [
            {
              "label": "A",
              "text": "Mr. Ravi Sundaram"
            },
            {
              "label": "B",
              "text": "Ms. Blythe Okafor"
            },
            {
              "label": "C",
              "text": "Ms. Farida Belhaj"
            },
            {
              "label": "D",
              "text": "Mr. Tomasz Wnuk"
            }
          ],
          "answer": "C",
          "note": "11:45のBelhajの説明に、事業の収入を月ごとに管理し、請求書の入金の合間に資金がショートしないよう帳簿アプリを実演するとある。『monthly income(月々の収入)を守る』はこのキャッシュフロー管理に一致するため、これを扱うのはBelhaj。誤答は他の講師の担当の付け替え。Sundaramは融資、Okaforは低予算の集客、Wnukは採用手続きの担当で、いずれも月々の収入管理を扱わない。"
        }
      ],
      "range": "164-167"
    },
    {
      "no": 9,
      "kind": "single",
      "passageType": "online chat discussion",
      "passages": [
        {
          "type": "online chat discussion",
          "heading": "Group Chat — XR-40 Demo Coordination",
          "body": "Bettina Krause (9:02 A.M.): Morning, both. Mr. Anselmi just confirmed he wants the full demo of the XR-40 packaging line, not the shortened version. He's driving up to the Calderford office on Thursday.\n\nMarcus Ilori (9:04 A.M.): Thursday? I thought we'd locked in Friday. The only demo unit is still on the show floor in Denton until Wednesday evening.\n\nBettina Krause (9:05 A.M.): He moved it up. His board meets Friday afternoon, so he wants to see the line running before he presents to them.\n\nSun-Woo Bae (9:07 A.M.): I can have the unit trucked back Wednesday night and reassembled by 7 A.M. Thursday, but someone has to sign off on the calibration before Mr. Anselmi arrives at 10.\n\nMarcus Ilori (9:08 A.M.): That's tight. Reassembly alone took us five hours last time.\n\nSun-Woo Bae (9:09 A.M.): It did, but that was the first build. My crew knows the sequence now. Four hours, tops.\n\nBettina Krause (9:10 A.M.): Marcus, can you handle the calibration sign-off? You're the only one certified on the XR-40.\n\nMarcus Ilori (9:11 A.M.): I can, as long as I'm not still finishing the Denton teardown. If Sun-Woo's crew loads the truck, I'll drive back separately and be at Calderford by 6.\n\nSun-Woo Bae (9:12 A.M.): Deal. My people will handle the teardown and loading so you can leave early.\n\nBettina Krause (9:13 A.M.): Perfect. One more thing — Mr. Anselmi asked whether the same person who runs the demo can answer his engineering questions afterward. I told him yes.\n\nMarcus Ilori (9:14 A.M.): That's me, then. I'll block out the whole morning.\n\nBettina Krause (9:15 A.M.): Thanks. I'll send him the revised agenda and confirm we're set for Thursday."
        }
      ],
      "intro": "Questions 168-171 refer to the following online chat discussion.",
      "questions": [
        {
          "no": 168,
          "question": "At 9:09 A.M., what does Sun-Woo Bae most likely mean when he writes, \"It did, but that was the first build\"?",
          "choices": [
            {
              "label": "A",
              "text": "He agrees that the reassembly will again take about five hours."
            },
            {
              "label": "B",
              "text": "He believes the reassembly cannot be finished before 10 A.M."
            },
            {
              "label": "C",
              "text": "He wants Marcus Ilori to help his crew with the reassembly."
            },
            {
              "label": "D",
              "text": "He expects the reassembly to go faster than it did before."
            }
          ],
          "answer": "D",
          "note": "Sun-Woo は直前で Marcus が「前回は組み立てだけで5時間かかった」と言ったのを受け、「確かにそうだったが、あれは最初の組み立てだった。今はうちのクルーが手順を分かっている。せいぜい4時間だ」と続けている。つまり今回は前回より短い時間で終わると見込んでいる、というのが引用の含意。「また約5時間かかることに同意している」とする選択肢は、\"It did\" の字面(前回5時間かかったことの確認)だけに釣られたもので、続く「あれは最初の組み立て」「せいぜい4時間」という前回超えの短縮宣言を無視している。「10時までに終えられない」とする選択肢は本文と逆で、4時間で可能だと述べている。「Marcus にクルーの手伝いを求めている」とする選択肢は、組み立て(reassembly/loading)を担うのが Sun-Woo のクルーである事実を、Marcus の役割(calibration の sign-off)に付け替えた誤り。"
        },
        {
          "no": 169,
          "question": "Who most likely is Marcus Ilori?",
          "choices": [
            {
              "label": "A",
              "text": "A crew supervisor responsible for loading the truck"
            },
            {
              "label": "B",
              "text": "A technician certified to operate the equipment"
            },
            {
              "label": "C",
              "text": "A sales representative who arranges the client's visit"
            },
            {
              "label": "D",
              "text": "A member of Mr. Anselmi's board of directors"
            }
          ],
          "answer": "B",
          "note": "Marcus は「XR-40 の認定を持つ唯一の人物」で calibration の sign-off を担当し、デモ後にエンジニアリングの質問にも答えると述べており、機器を扱う技術者だと判断できる。「トラックへの積み込みを仕切る supervisor」とする選択肢は、teardown・loading を仕切るのが Sun-Woo のクルーである事実を Marcus に付け替えた誤り。「顧客訪問を段取りする営業担当」とする選択肢は、改訂版アジェンダを送り訪問を段取りしているのが Bettina である役割の付け替え。「Mr. Anselmi の取締役会の一員」とする選択肢は、金曜に会合を開く board が見込み客 Anselmi 側のものである所属を Marcus に付け替えた誤り。"
        },
        {
          "no": 170,
          "question": "What is indicated about the XR-40 demo unit?",
          "choices": [
            {
              "label": "A",
              "text": "It must be calibrated by Sun-Woo Bae before it is used."
            },
            {
              "label": "B",
              "text": "It is currently located in Denton."
            },
            {
              "label": "C",
              "text": "It requires five hours to reassemble each time it is moved."
            },
            {
              "label": "D",
              "text": "It will be shown to a board on Friday afternoon."
            }
          ],
          "answer": "B",
          "note": "Marcus が 9:04 A.M. に「唯一のデモ機は水曜夜まで Denton のショー会場にある」と述べており、現時点の所在が Denton だと分かる。「Sun-Woo が calibration しなければならない」とする選択肢は、calibration の sign-off を担うのが認定保有者 Marcus である担当者を付け替えた誤り。「動かすたびに毎回5時間かかる」とする選択肢は、five hours が「最初の組み立て」限定の実績で、Sun-Woo は今回は4時間と述べているため「毎回5時間」は本文の条件を外した付け替え。「金曜午後に board に披露される」とする選択肢は、金曜午後に開かれるのが Anselmi の board 会合であり、そこで機器そのものが披露されるとは書かれていない日付事実の付け替え。"
        },
        {
          "no": 171,
          "question": "According to Bettina Krause, why did Mr. Anselmi change the date of the demonstration?",
          "choices": [
            {
              "label": "A",
              "text": "He decided he wanted the shortened version of the demonstration."
            },
            {
              "label": "B",
              "text": "He needs to see the equipment running before a board meeting."
            },
            {
              "label": "C",
              "text": "The demo unit will no longer be available in Denton after Wednesday."
            },
            {
              "label": "D",
              "text": "He plans to drive himself to the Calderford office."
            }
          ],
          "answer": "B",
          "note": "Bettina が 9:05 A.M. に「彼の board が金曜午後に集まるので、その前にラインが稼働しているのを見て発表したい。だから前倒しした」と説明しており、これが日程変更の理由。「短縮版を望んだから」とする選択肢は、本文冒頭で Anselmi が shortened version ではなく full demo を望むと明言しており真逆の付け替え。「水曜以降 Denton で使えなくなるから」とする選択肢は、デモ機の所在に関する事実であって Anselmi が日程を動かした理由ではない(別事実の付け替え)。「自分で Calderford へ車で向かうから」とする選択肢は、来訪の手段であって日程変更の理由ではなく、移動手段の事実を理由にすり替えた誤り。"
        }
      ],
      "range": "168-171"
    },
    {
      "no": 10,
      "kind": "single",
      "passageType": "report",
      "passages": [
        {
          "heading": "Structural Condition Survey — Summary Report",
          "type": "report",
          "body": "Prepared for: Bramwell Fabrics\nProperty inspected: the former Denton Mill\nPrepared by: Oakmere Engineering\nSite inspections: April 3 and April 5\nReport issued: April 11\n\nPurpose: To evaluate the structural condition of the former Denton Mill prior to its proposed purchase by Bramwell Fabrics and its conversion into a fabric warehouse and showroom.\n\nOakmere Engineering was engaged to inspect the former Denton Mill, a four-story brick building that has stood empty since the textile firm that previously occupied it vacated the site. - [1] - Our two site visits confirmed that the main load-bearing walls and the cast-iron columns on the ground floor remain sound, with no sign of the settlement that often affects riverside structures of this age. - [2] - The timber floor beams on the third floor, however, show extensive water damage caused by a failed section of roof drainage above the north stairwell. - [3] - Rainwater had been entering at this point for what we estimate to be at least two winters. - [4] -\n\nWe recommend that the damaged beams be replaced rather than repaired, at an estimated cost of $18,400. The roof drainage must be corrected before any new timber is installed; otherwise the replacement beams would deteriorate in exactly the same way. Provided this sequence is followed, the building is well suited to the proposed conversion, and its wide, open floor plates would require few internal alterations to serve as showroom space. We would be glad to oversee the remedial work, which we expect to take six weeks once materials are delivered to the site.\n\nPrepared and signed by Ms. Sardar and Mr. Achebe, Oakmere Engineering"
        }
      ],
      "intro": "Questions 172-175 refer to the following report.",
      "questions": [
        {
          "no": 172,
          "question": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?  \"This water had, in turn, softened the beams to the point where two of them can no longer be considered safe to load.\"",
          "choices": [
            {
              "label": "A",
              "text": "[1]"
            },
            {
              "label": "B",
              "text": "[2]"
            },
            {
              "label": "C",
              "text": "[4]"
            },
            {
              "label": "D",
              "text": "[3]"
            }
          ],
          "answer": "C",
          "note": "挿入文の主語 \"This water\" と \"in turn\" は、直前で語られる「雨水(Rainwater)が2冬にわたり浸入していた」という記述を受け、その結果として梁が弱ったという因果を続ける。したがって雨水の文の直後、すなわち [4] に置くと「その水が梁を弱らせ、2本が荷重に耐えられない」と自然につながり、第2段の『傷んだ梁2本を交換』ともきれいに接続する。[3] は雨水の文より前に位置し、ここに置くと \"in turn\" の受ける2冬浸入の記述がまだ現れておらず、後続の Rainwater 文が重複してしまうため不可。[1] は建物が空き家になった経緯の直後、[2] は壁と柱が健全という記述の直後で、いずれも水の話題が始まっていない。"
        },
        {
          "no": 173,
          "question": "Who most likely are Ms. Sardar and Mr. Achebe?",
          "choices": [
            {
              "label": "A",
              "text": "Real estate agents selling the mill"
            },
            {
              "label": "B",
              "text": "The owners of Bramwell Fabrics"
            },
            {
              "label": "C",
              "text": "Former employees of the textile firm that occupied the mill"
            },
            {
              "label": "D",
              "text": "Engineers who inspected the building"
            }
          ],
          "answer": "D",
          "note": "署名欄に2人の名は Oakmere Engineering の担当者として記され、この会社が調査を実施し補修工事の監督も申し出ている。よって建物を検査した技術者と判断できる。Bramwell Fabrics は調査を依頼した購入検討者であり、その所有者だとするのは依頼主の役割を署名者に付け替えた誤り。以前ミルを使っていた繊維会社は退去済みと本文にあり、その従業員とするのも別主体への付け替え。不動産業者という記述は本文になく、売買を仲介する立場も登場しない。"
        },
        {
          "no": 174,
          "question": "What is the purpose of the report?",
          "choices": [
            {
              "label": "A",
              "text": "To request payment for repair work that has been completed"
            },
            {
              "label": "B",
              "text": "To advertise a warehouse and showroom that are for sale"
            },
            {
              "label": "C",
              "text": "To assess the condition of a building before a possible purchase"
            },
            {
              "label": "D",
              "text": "To compare several riverside properties for a client"
            }
          ],
          "answer": "C",
          "note": "冒頭の Purpose 欄に「購入・改装に先立ち the former Denton Mill の構造状態を評価する」とあり、これが趣旨。倉庫とショールームは購入後の改装用途であって売り出し対象ではなく、宣伝目的とするのは将来用途の付け替え。補修工事は『監督を申し出る』段階で未実施のため、完了工事の支払い請求も事実に反する。riverside という語は同年代の建物一般を指す文脈で出るだけで、複数物件の比較はしていない。"
        },
        {
          "no": 175,
          "question": "According to the report, what must be done before the timber beams are replaced?",
          "choices": [
            {
              "label": "A",
              "text": "The cast-iron columns must be reinforced"
            },
            {
              "label": "B",
              "text": "The roof drainage must be repaired"
            },
            {
              "label": "C",
              "text": "The load-bearing walls must be rebuilt"
            },
            {
              "label": "D",
              "text": "The showroom space must be constructed"
            }
          ],
          "answer": "B",
          "note": "第2段に「新しい木材を入れる前に屋根の排水を直さねばならない。さもないと交換した梁も同じように傷む」と因果が明示されており、排水修理が梁交換の前提。柱と壁は第1段で『健全(sound)』と評価されているため、それらの補強・再建を条件とするのは健全という事実を『要補修』へ付け替えた誤り。ショールーム化は排水と梁の処置を終えた後に可能になる改装であって、梁交換の前提条件ではない。"
        }
      ],
      "range": "172-175"
    }
  ],
  "part7multiple": [
    {
      "no": 1,
      "kind": "double",
      "passageType": "order form and e-mail",
      "passages": [
        {
          "heading": "Hollow Oak Catering — Event Order Form",
          "type": "order form",
          "body": "Order Reference: HOC-2291\nOrdered by: Ms. Imogen Radcliffe\nOrganization: Sterne & Partridge Law\nContact: i.radcliffe@sterne-partridge.com\n\nDelivery Date: Friday, March 20\nDelivery Time: 11:30 A.M.\nDelivery Address: Sterne & Partridge Law, 4th Floor, 60 Harlow Street\n\n-------------------------------------------------------\nItem                     Unit Price   Qty     Amount\nStandard lunch box         $15.50      30     $465.00\nDeluxe lunch box           $19.00      10     $190.00\nSeasonal fruit platter     $27.00       2      $54.00\n-------------------------------------------------------\nSubtotal                                       $709.00\nDelivery fee                                    $18.00\nTotal                                          $727.00\n\nOrder placed: March 5\n\nPlease note: Changes to a confirmed order must be received at least four days before the delivery date. Changes submitted after this point are subject to a 10% surcharge on the value of the added items. Cancellations made within 48 hours of delivery are non-refundable.\n\nAuthorized by: Theo Ashby, Owner"
        },
        {
          "heading": "E-mail",
          "type": "e-mail",
          "body": "To: Theo Ashby <orders@hollowoakcatering.com>\nFrom: Imogen Radcliffe <i.radcliffe@sterne-partridge.com>\nDate: March 18\nSubject: Update to Order HOC-2291\n\nDear Mr. Ashby,\n\nThank you for confirming our catering order for the firm's client seminar on March 20. I am writing because eight additional attendees have now been confirmed, and I would like to add eight more standard lunch boxes to the order. Everything else should remain exactly as booked.\n\nI realize I am contacting you fairly close to the date, and I would be grateful if you could accommodate this last-minute change. If you are able to, please send an updated invoice reflecting the new total so that our accounts team can process it.\n\nKind regards,\nImogen Radcliffe\nSterne & Partridge Law"
        }
      ],
      "intro": "Questions 176-180 refer to the following order form and e-mail.",
      "questions": [
        {
          "no": 176,
          "question": "What is the purpose of the e-mail?",
          "choices": [
            {
              "label": "A",
              "text": "To confirm that a payment has been received"
            },
            {
              "label": "B",
              "text": "To ask about available catering menu options"
            },
            {
              "label": "C",
              "text": "To request a change to an existing order"
            },
            {
              "label": "D",
              "text": "To report a problem with a recent delivery"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "note": "メール本文で「eight more standard lunch boxes を追加したい／それ以外は予約どおりで」と書いており、既存注文 HOC-2291 への追加変更依頼が目的。支払い受領の確認ではなく、逆に更新後の請求書を送ってほしいと頼んでいる点で受領確認は誤り。メニュー内容を尋ねてもおらず(すでに発注済み)、配達の不具合報告でもない(配達は3月20日でまだ先)。"
        },
        {
          "no": 177,
          "question": "Why will Ms. Radcliffe most likely be charged a surcharge?",
          "choices": [
            {
              "label": "A",
              "text": "She canceled part of her order within 48 hours of delivery."
            },
            {
              "label": "B",
              "text": "She ordered more standard lunch boxes than the seminar allowed."
            },
            {
              "label": "C",
              "text": "She submitted her change fewer than four days before delivery."
            },
            {
              "label": "D",
              "text": "She changed the delivery address after placing the order."
            }
          ],
          "answer": "C",
          "crossRef": true,
          "note": "注文フォームの規定「変更は配達日の少なくとも4日前までに受領、それ以降は追加分に10%の追加料金」と、配達日が3月20日である点を、メールの日付3月18日と突合する。3月18日は配達のわずか2日前で締切(3月16日)を過ぎているため追加料金の対象。キャンセルではなく追加なので48時間キャンセル規定は無関係で、フォームだけ読むと引っかかる誤答。数量に上限を設ける規定はフォームのどこにもない。住所変更もしておらず、追加するのは標準弁当で配送先は同じ。"
        },
        {
          "no": 178,
          "question": "Before any surcharge, how much will the additional lunch boxes add to the order?",
          "choices": [
            {
              "label": "A",
              "text": "$167.20"
            },
            {
              "label": "B",
              "text": "$136.40"
            },
            {
              "label": "C",
              "text": "$152.00"
            },
            {
              "label": "D",
              "text": "$124.00"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "note": "メールで追加を依頼しているのは standard lunch box を8個。注文フォームの単価表で standard lunch box は1個 $15.50。$15.50 × 8 = $124.00 が追加料金前の金額。$136.40 は10%の追加料金を上乗せした額で「追加料金前」という問いに反する引っかけ。$152.00 は誤って deluxe lunch box の単価 $19.00 × 8 を使ったもの。$167.20 は deluxe 単価にさらに10%を足した二重の誤り。"
        },
        {
          "no": 179,
          "question": "In the e-mail, the word \"accommodate\" is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "house"
            },
            {
              "label": "B",
              "text": "enlarge"
            },
            {
              "label": "C",
              "text": "grant"
            },
            {
              "label": "D",
              "text": "locate"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "note": "該当箇所は「could you accommodate this last-minute change(この直前の変更に応じていただけますか)」で、依頼を受け入れる・かなえるの意。よって grant(応じる・許可する)が最も近い。house は「宿泊させる/収容する」で人や物を泊める意味が中心でここでは不自然。enlarge は「拡大する」で変更に応じる意ではない。locate は「位置を突き止める」で全く別の意味。"
        },
        {
          "no": 180,
          "question": "What is NOT listed on the order form?",
          "choices": [
            {
              "label": "A",
              "text": "A seasonal fruit platter"
            },
            {
              "label": "B",
              "text": "A delivery fee"
            },
            {
              "label": "C",
              "text": "A selection of hot drinks"
            },
            {
              "label": "D",
              "text": "Standard lunch boxes"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "note": "注文フォームの品目表には Standard lunch box、Deluxe lunch box、Seasonal fruit platter が並び、さらに Delivery fee $18.00 の行もある。よってフルーツプラター・配達料・標準弁当はいずれも記載あり。飲み物(hot drinks)の項目はフォームのどこにも無いため、記載されていないものはホットドリンクの詰め合わせ。"
        }
      ],
      "range": "176-180"
    },
    {
      "no": 2,
      "kind": "double",
      "passageType": "article and review",
      "passages": [
        {
          "heading": "ScreenMender Mobile: The Repair Shop That Drives to You",
          "type": "article",
          "body": "www.gadgetdispatch.com/features/screenmender-mobile\n[ Home ]  [ Features ]  [ Deals ]  [ Sign In ]\n\nTired of leaving your cracked phone at a counter for a week? ScreenMender Mobile has rewritten the rulebook. Launched by founder Diego Varga, the company sends certified technicians directly to a customer's home or office in a fully equipped van, so there is nothing to drop off and nothing to pick up.\n\nStandard repairs are scheduled two to three business days after a request is submitted. Customers who join the MenderPlus program, however, unlock same-day booking and receive 15 percent off every replacement part. Membership runs 8.50 dollars per month and can be canceled at any time.\n\nEvery repair is backed by a 90-day warranty. For now the service covers only the central district, but Varga confirmed that coverage will extend to the neighboring town of Ostwick beginning September 3."
        },
        {
          "heading": "Customer Review — Meena Rasathurai",
          "type": "review",
          "body": "Overall rating: 5 out of 5\nPosted: September 18\n\nI had heard good things, so when my screen shattered I decided to try ScreenMender Mobile myself. I live in Ostwick, and honestly I assumed I would have to drive all the way into the city. Instead, a technician pulled up outside my apartment the very same afternoon I booked.\n\nBefore scheduling, I signed up for MenderPlus, which turned out to be a smart move — the discount alone nearly covered the monthly fee. The whole process was remarkably smooth, and the new screen looks flawless. My only small complaint is that the van arrived about twenty minutes late, though the technician did call ahead to let me know.\n\nI will definitely keep my membership for the peace of mind the warranty provides."
        }
      ],
      "intro": "Questions 181-185 refer to the following article and review.",
      "questions": [
        {
          "no": 181,
          "question": "What is the main purpose of the article?",
          "choices": [
            {
              "label": "A",
              "text": "To introduce a mobile phone repair service"
            },
            {
              "label": "B",
              "text": "To announce an increase in membership fees"
            },
            {
              "label": "C",
              "text": "To compare two competing repair companies"
            },
            {
              "label": "D",
              "text": "To recruit technicians for a new location"
            }
          ],
          "answer": "A",
          "crossRef": false,
          "note": "記事は冒頭からサービスの仕組み(技術者がバンで自宅や職場へ出張して修理する)を紹介している。値上げの告知でも、2社の比較でも、技術者の求人でもない。"
        },
        {
          "no": 182,
          "question": "Why most likely was Ms. Rasathurai able to receive a repair on the same day she booked?",
          "choices": [
            {
              "label": "A",
              "text": "She lives in the central district"
            },
            {
              "label": "B",
              "text": "She enrolled in the MenderPlus program"
            },
            {
              "label": "C",
              "text": "She requested a standard repair"
            },
            {
              "label": "D",
              "text": "She paid an emergency surcharge"
            }
          ],
          "answer": "B",
          "crossRef": true,
          "note": "記事に「MenderPlus会員は同日予約が可能になる」とあり、レビューでは評者が予約前にMenderPlusへ登録したと述べている。レビュー単体では同日対応が会員特典によるものだと分からず、記事の規定と突合して初めて理由が確定する。中央地区在住は誤り(評者はOstwick在住)、通常予約は2〜3営業日かかるので当日は不可、追加料金の記述はどちらの文書にもない。"
        },
        {
          "no": 183,
          "question": "What is suggested about ScreenMender Mobile's expansion to Ostwick?",
          "choices": [
            {
              "label": "A",
              "text": "It was postponed until the following year"
            },
            {
              "label": "B",
              "text": "It was canceled because of low demand"
            },
            {
              "label": "C",
              "text": "It took place as scheduled"
            },
            {
              "label": "D",
              "text": "It is available only to MenderPlus members"
            }
          ],
          "answer": "C",
          "crossRef": true,
          "note": "記事は9月3日からOstwickへサービスを拡大予定と述べ、レビューは9月18日付でOstwick在住の評者が実際に出張修理を受けたことを示している。両者を突合すると拡大は予定通り実施されたと分かる。記事だけを読むと「予定(未実施)」に見え延期や中止と取り違えやすいが、9月3日以降の日付でOstwickの評者が受けたレビューが実施を裏づける。会員限定という記述もない。"
        },
        {
          "no": 184,
          "question": "In the review, the word \"smooth\" is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "polished"
            },
            {
              "label": "B",
              "text": "flat"
            },
            {
              "label": "C",
              "text": "trouble-free"
            },
            {
              "label": "D",
              "text": "quiet"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "note": "ここでの smooth は手続きが「順調で支障がない」という意味で、trouble-free が最も近い。polished(洗練された)、flat(平らな)、quiet(静かな)は文脈に合わない。"
        },
        {
          "no": 185,
          "question": "What does Ms. Rasathurai mention as a drawback of her experience?",
          "choices": [
            {
              "label": "A",
              "text": "The final cost was higher than advertised"
            },
            {
              "label": "B",
              "text": "The replacement screen cracked again"
            },
            {
              "label": "C",
              "text": "The technician arrived later than expected"
            },
            {
              "label": "D",
              "text": "The warranty period was too short"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "note": "レビュー後半で唯一の不満として「バンが約20分遅れて到着した」と述べている。費用が広告より高かった、画面が再び割れた、保証期間が短すぎるといった不満は述べていない。"
        }
      ],
      "range": "181-185"
    },
    {
      "no": 3,
      "kind": "triple",
      "passageType": "web page, schedule, and e-mail",
      "passages": [
        {
          "heading": "Coastline Community Radio — Special Programming Announcement",
          "type": "web page",
          "body": "Home  |  Schedule  |  Events  |  Contact\nwww.coastlinecommunityradio.org/events\n\nSpecial Programming Announcement\n\nCoastline Community Radio is proud to broadcast live from the Lantern Bay Seafood Fair this Saturday, July 18. Our team will set up a booth at the fairground on the north pier, where listeners can enjoy interviews with local fishers, cooking demonstrations, and live music from 1:00 P.M. to 4:00 P.M.\n\nDuring these three hours on Saturday, the program that normally fills our afternoon slot will not air. It will return to its regular schedule the next day. Listeners who cannot attend the fair in person are welcome to stream the full coverage on our website. A recording will also be posted under the Events tab by Sunday evening."
        },
        {
          "heading": "Coastline Community Radio — Daily Lineup",
          "type": "schedule",
          "body": "6:00 A.M. – 9:00 A.M.  |  Morning Tideline (Host: Desmond Farr)\nNews, traffic, and a look at the day ahead. Weather update at 7:00 A.M. with Sana Okafor.\n\n9:00 A.M. – 1:00 P.M.  |  Harbour Talk (Host: Priya Nandel)\nCall-in discussions on community issues and local business.\n\n1:00 P.M. – 4:00 P.M.  |  The Afternoon Drift (Host: Colin Radek)\nMusic, listener requests, and coverage of the local arts scene.\n\n4:00 P.M. – 7:00 P.M.  |  Evening Currents (Host: Melina Voss)\nInterviews and the evening wrap-up. Weather update at 6:00 P.M. with Gordon Pyle."
        },
        {
          "heading": "E-mail",
          "type": "e-mail",
          "body": "To: Coastline Community Radio <feedback@coastlinecommunityradio.org>\nFrom: Harriet Colven\nDate: July 15\nSubject: Fair coverage and weekend weather\n\nHello,\n\nI have been a loyal listener for years, and I was thrilled to hear that you will be reporting from the Lantern Bay Seafood Fair. I plan to bring my grandchildren on Saturday.\n\nHowever, when I tuned in yesterday evening at about 6:00 P.M., the forecast mentioned a chance of heavy rain over the weekend. Could you let me know whether the outdoor booth will still operate if the weather turns poor? I would hate for the children to be disappointed.\n\nAlso, I usually listen to the one o'clock program every afternoon, so I was a little sad to learn it will be off the air that day. Will those interviews be repeated later?\n\nThank you for all you do.\n\nHarriet Colven"
        }
      ],
      "intro": "Questions 186-190 refer to the following web page, schedule, and e-mail.",
      "questions": [
        {
          "no": 186,
          "question": "What is the main purpose of the web page?",
          "choices": [
            {
              "label": "A",
              "text": "To introduce a newly hired radio host"
            },
            {
              "label": "B",
              "text": "To report the results of a listener survey"
            },
            {
              "label": "C",
              "text": "To request donations from listeners"
            },
            {
              "label": "D",
              "text": "To announce special coverage of a local event"
            }
          ],
          "answer": "D",
          "crossRef": false,
          "note": "Webページは Lantern Bay Seafood Fair から live broadcast する特別編成の告知で、地域イベントの特別中継を知らせるのが目的。新しい司会の紹介はどの文書にもない。寄付の呼びかけも述べていない。視聴者アンケートの結果報告でもなく、視聴者へ中継を案内している。"
        },
        {
          "no": 187,
          "question": "Whose program will most likely be off the air during the fair coverage?",
          "choices": [
            {
              "label": "A",
              "text": "Desmond Farr's"
            },
            {
              "label": "B",
              "text": "Priya Nandel's"
            },
            {
              "label": "C",
              "text": "Melina Voss's"
            },
            {
              "label": "D",
              "text": "Colin Radek's"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "note": "Webページの特別中継は 1:00 P.M.–4:00 P.M. で、その時間の通常番組は放送されないと明記。番組表の同じ時間帯を突合するとその枠は The Afternoon Drift（司会 Colin Radek）なので、Colin Radek の番組が休止する。番組表は Daily Lineup で土曜も同じ編成のためこの突合が成立する。Desmond Farr は 6–9 A.M. の朝枠で無関係。Priya Nandel は 9 A.M.–1 P.M. 枠で1時に終わるだけで休止対象ではない（番組表だけ見ると1時つながりで引っかかる誤答）。Melina Voss は 4–7 P.M. 枠で中継時間外。"
        },
        {
          "no": 188,
          "question": "Who most likely presented the forecast that Ms. Colven heard?",
          "choices": [
            {
              "label": "A",
              "text": "Sana Okafor"
            },
            {
              "label": "B",
              "text": "Desmond Farr"
            },
            {
              "label": "C",
              "text": "Melina Voss"
            },
            {
              "label": "D",
              "text": "Gordon Pyle"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "note": "メールは Ms. Colven が「昨夕 about 6:00 P.M. に聞いた」と述べる。番組表の 6:00 P.M. の weather update 担当は Gordon Pyle なので彼が該当し、メールの時刻と番組表の担当者を突合して初めて特定できる。Sana Okafor は 7:00 A.M. の朝の気象担当で時間帯が違う（朝と夕方の予報を混同させる誤答）。Melina Voss はその 4–7 P.M. 枠の司会だが気象予報士ではない（番組表だけ見て時間帯の司会名を選ぶ引っかけ）。Desmond Farr は朝枠の司会で無関係。"
        },
        {
          "no": 189,
          "question": "In the e-mail, the word \"loyal\" is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "frequent"
            },
            {
              "label": "B",
              "text": "honest"
            },
            {
              "label": "C",
              "text": "wealthy"
            },
            {
              "label": "D",
              "text": "devoted"
            }
          ],
          "answer": "D",
          "crossRef": false,
          "note": "ここでの loyal listener は長年ずっと支持している熱心な聴取者の意で、devoted が最も近い。honest は「正直な」で忠実さの意味とは別。wealthy は「裕福な」で文脈と無関係。frequent は「頻繁な」で意味圏は近いが、loyal が表すのは頻度ではなく愛着・忠誠なので不適（意味圏を寄せた誤答）。"
        },
        {
          "no": 190,
          "question": "According to the web page, how can people who do not attend the fair follow the coverage?",
          "choices": [
            {
              "label": "A",
              "text": "By calling in to the station during the broadcast"
            },
            {
              "label": "B",
              "text": "By subscribing to a printed newsletter"
            },
            {
              "label": "C",
              "text": "By visiting the north pier on Sunday"
            },
            {
              "label": "D",
              "text": "By streaming it on the station's website"
            }
          ],
          "answer": "D",
          "crossRef": false,
          "note": "Webページは現地に行けない聴取者は website で中継を stream できると案内しているので、ウェブでのストリーミングが答え。放送中に電話をかける方法は述べていない。north pier は土曜当日のブース設置場所で、Sunday に行くのは録画が Sunday evening までに投稿される話と混同させる誤答。印刷ニュースレターの購読には触れていない。"
        }
      ],
      "range": "186-190"
    },
    {
      "no": 4,
      "kind": "triple",
      "passageType": "web page, entry form, and e-mail",
      "passages": [
        {
          "heading": "www.ellsworthprize.org/guidelines",
          "type": "web page",
          "body": "[ Home ]   [ Guidelines ]   [ Submit ]   [ Contact ]\n\nThe Ellsworth Short Story Prize — Entry Guidelines\n\nThe Ellsworth Short Story Prize is now accepting entries for this year's competition. All stories must be previously unpublished and written in English. Entries are accepted in two categories:\n\nOpen Category\n- For writers who have already published at least one book.\n- Maximum length: 5,000 words.\n- Entry fee: $40.\n- Applicants must enclose a one-page author biography.\n\nEmerging Writer Category\n- For writers who have never published a book.\n- Maximum length: 3,000 words.\n- Entry fee: $25.\n- Applicants must enclose a signed eligibility statement confirming that they have not previously published a book.\n\nKey dates\n- Submission deadline: March 15.\n- Winners will be notified by e-mail during April.\n- Awards reception: May 9.\n\nComplete the online entry form under the \"Submit\" tab. Entry fees are non-refundable."
        },
        {
          "heading": "The Ellsworth Short Story Prize — Official Entry Form",
          "type": "entry form",
          "body": "Applicant Name: Yusuf Demir\nE-mail Address: y.demir@mailhub.net\nCategory (select one):    Open [ ]    Emerging Writer [X]\nStory Title: The Salt Road\nWord Count: 2,850 words\nRequired enclosure attached:    Yes [X]    No [ ]\nDate submitted: March 3\n\nBy submitting this form, I confirm that the enclosed information is accurate and that the story is my own original, previously unpublished work."
        },
        {
          "type": "e-mail",
          "body": "To: Yusuf Demir <y.demir@mailhub.net>\nFrom: Marisol Peña <mpena@ellsworthprize.org>\nDate: April 14\nSubject: Congratulations — Ellsworth Short Story Prize\n\nDear Mr. Demir,\n\nThank you for entering the Ellsworth Short Story Prize this year. I am delighted to tell you that your story has been chosen as the winner of the category you entered. The judges praised its original voice and careful pacing.\n\nPlease note one change to the schedule. Because of a venue conflict, the awards reception has been moved to May 16 and will begin at 6:30 P.M. Winners are invited to read a short excerpt from their own story during the evening.\n\nKindly reply to this message by May 2 to confirm that you will attend. If you have any questions, feel free to contact me directly.\n\nWarm regards,\nMarisol Peña\nPrize Coordinator"
        }
      ],
      "intro": "Questions 191-195 refer to the following web page, entry form, and e-mail.",
      "questions": [
        {
          "no": 191,
          "question": "According to the Web page, what is required of applicants in the Open Category?",
          "choices": [
            {
              "label": "A",
              "text": "They must be first-time writers."
            },
            {
              "label": "B",
              "text": "They must have already published at least one book."
            },
            {
              "label": "C",
              "text": "They must keep their story under 3,000 words."
            },
            {
              "label": "D",
              "text": "They must pay a fee of $25."
            }
          ],
          "answer": "B",
          "crossRef": false,
          "note": "Web要項のOpen Category欄に「For writers who have already published at least one book」とあり、既刊書のある書き手向けの部門だと明記されている。first-time writers(初めての書き手)は逆の条件で、Emerging Writer Category向けなので誤り。3,000語未満という選択肢と$25という選択肢はいずれもEmerging Writer Categoryの数値で、Open Categoryは5,000語・$40。片方の部門の条件をもう一方に取り違えると引っかかる。"
        },
        {
          "no": 192,
          "question": "What did Yusuf Demir most likely enclose with his entry?",
          "choices": [
            {
              "label": "A",
              "text": "A one-page author biography"
            },
            {
              "label": "B",
              "text": "A copy of a published book"
            },
            {
              "label": "C",
              "text": "A list of previously published books"
            },
            {
              "label": "D",
              "text": "A signed eligibility statement"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "note": "応募フォームでYusuf DemirはEmerging Writer Categoryにチェックを入れている。Web要項のEmerging Writer欄では、この部門の応募者はsigned eligibility statement(未刊行を確認する署名入り資格証明書)の同封が必要と定めているので、フォームの選択部門と要項の同封要件を突合すると同封物が特定できる。one-page author biographyはOpen Categoryの同封要件で、要項だけ流し読みするとこちらに引っかかる。残る二つは既刊書を前提とする内容で、未刊行が条件のEmerging Writer応募者には当てはまらない。"
        },
        {
          "no": 193,
          "question": "What will Mr. Demir most likely read aloud at the awards reception?",
          "choices": [
            {
              "label": "A",
              "text": "A one-page author biography"
            },
            {
              "label": "B",
              "text": "An excerpt from The Salt Road"
            },
            {
              "label": "C",
              "text": "A signed eligibility statement"
            },
            {
              "label": "D",
              "text": "A list of the judges' comments"
            }
          ],
          "answer": "B",
          "crossRef": true,
          "note": "メール(第三文書)は受賞者に対し、レセプションで自分の作品から短い一節を朗読するよう招いている。応募フォーム(第二文書)によればYusuf Demirの作品名はThe Salt Roadなので、メールの朗読案内とフォームの作品名を突合すると朗読対象が特定できる。one-page author biographyはOpen Categoryの同封物、signed eligibility statementはEmerging Writerの同封物で、いずれも要項に登場する語だが朗読するものではなく、文書を取り違えると引っかかる。judges' commentsはメールで審査員が講評したとの記述はあるが、朗読するのは受賞者自身の作品でありコメント一覧ではない。"
        },
        {
          "no": 194,
          "question": "When will the awards reception be held?",
          "choices": [
            {
              "label": "A",
              "text": "On May 2"
            },
            {
              "label": "B",
              "text": "On May 9"
            },
            {
              "label": "C",
              "text": "On April 14"
            },
            {
              "label": "D",
              "text": "On May 16"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "note": "Web要項は当初の会期をMay 9としているが、Marisol Peñaのメールが会場都合でreceptionをMay 16に変更したと通知しているため、要項とメールを突合した更新後の日付が答えになる。May 9は変更前の日程で、要項だけ読むとこの誤答に引っかかる典型。May 2は出欠返信の締切、April 14はメールの送信日で、いずれもレセプション当日ではない。"
        },
        {
          "no": 195,
          "question": "In the e-mail, the word \"moved\" is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "rescheduled"
            },
            {
              "label": "B",
              "text": "transferred"
            },
            {
              "label": "C",
              "text": "removed"
            },
            {
              "label": "D",
              "text": "delivered"
            }
          ],
          "answer": "A",
          "crossRef": false,
          "note": "メールでは「the awards reception has been moved to May 16」と、行事の開催日を別の日に移した文脈でmovedが使われているため、日程を組み直す意味のrescheduledが最も近い。transferredは物や権利を移す語感で日程変更には合わない。removedは「取りやめる・削除する」で、レセプションは中止ではなく実施されるので不適。deliveredは「届ける」で文意と無関係。"
        }
      ],
      "range": "191-195"
    },
    {
      "no": 5,
      "kind": "triple",
      "passageType": "webpage and two e-mails",
      "passages": [
        {
          "heading": "The Halbrook Museum Lecture Series",
          "type": "webpage",
          "body": "[ About ]  [ Schedule ]  [ Tickets ]  [ Directions ]\nwww.halbrookmuseum.org/lectures/autumn\n\nThe Halbrook Museum Lecture Series — \"Voices in Restoration\"\n\nAll sessions are held in Ferndale Hall. Each talk runs from 2:00 P.M. to 3:30 P.M. and is followed by a short question-and-answer period.\n\nSaturday, October 4\nPigments of the Renaissance — Dr. Marisol Fenn\nHow conservators identify and recreate the mineral colors used by fifteenth-century painters.\n\nSaturday, October 11\nReading Cracks: Structural Analysis in Panel Paintings — Prof. Declan Ruiz\nWhat the pattern of surface cracks reveals about a wooden panel's age and its past repairs.\n\nSaturday, October 18\nTextiles and Time — Dr. Hana Vestergaard\nThe special challenges of cleaning and storing centuries-old fabrics and tapestries.\n\nSaturday, October 25\nThe Ethics of Repair — Mr. Omar Delacroix\nWhen should a damaged work be restored, and when should its damage be preserved as part of its history?\n\nSeating is limited. Museum members may reserve one week before the general public."
        },
        {
          "heading": "E-mail",
          "type": "email",
          "body": "To: Theo Brandt <tbrandt@halbrookmuseum.org>\nFrom: Dr. Aya Kimura <a.kimura@northfield-conservation.org>\nDate: September 8\nSubject: Filling in for the opening session\n\nDear Mr. Brandt,\n\nThank you for inviting me to join the autumn series in place of Dr. Marisol Fenn, who I understand has had to withdraw. I am glad to step in, and my talk, \"Conservation in the Digital Age,\" is already prepared.\n\nThere is one complication. Dr. Fenn was scheduled for the opening Saturday, but I will be attending a research symposium abroad and will not return until October 12. Presenting on her original date is therefore impossible for me.\n\nWould it be possible to place me on the final Saturday of the series instead? That would give me ample time to prepare after I get back.\n\nI appreciate your flexibility.\n\nBest regards,\nAya Kimura"
        },
        {
          "heading": "E-mail",
          "type": "email",
          "body": "To: Dr. Aya Kimura <a.kimura@northfield-conservation.org>\nFrom: Theo Brandt <tbrandt@halbrookmuseum.org>\nDate: September 10\nSubject: RE: Filling in for the opening session\n\nDear Dr. Kimura,\n\nThank you for agreeing to join us on such short notice. I am afraid the date you asked for is not available — it is already reserved for Mr. Omar Delacroix, and we never schedule two lectures on the same afternoon.\n\nHere is what I can offer. Dr. Hana Vestergaard has generously agreed to take over the now-vacant opening slot, which frees up her own Saturday for you. That date falls comfortably after your return, so I hope it suits you. Everyone else will keep their original session.\n\nPlease confirm and I will update both the printed program and the website. The topic descriptions are due to the printer by September 20, so an early reply would be a great help.\n\nWarm regards,\nTheo Brandt\nProgram Coordinator, Halbrook Museum"
        }
      ],
      "intro": "Questions 196-200 refer to the following webpage and two e-mails.",
      "questions": [
        {
          "no": 196,
          "question": "Why did Dr. Kimura write the first e-mail?",
          "choices": [
            {
              "label": "A",
              "text": "To decline the museum's invitation to speak"
            },
            {
              "label": "B",
              "text": "To ask that her session be scheduled for a later date"
            },
            {
              "label": "C",
              "text": "To recommend someone to replace Dr. Fenn"
            },
            {
              "label": "D",
              "text": "To request a larger room for her lecture"
            }
          ],
          "answer": "B",
          "crossRef": false,
          "note": "最初のメール(Kimura→Brandt)の用件を問う。Fennの代役は引き受けたうえで、元の開幕日には海外出張で登壇できないと述べ、シリーズ最終土曜への変更を願い出ている。したがって用件はセッションを後の日程に移してほしいという依頼にあたる。彼女自身が代役として招かれているので誰かを推薦しているわけではなく、招待を辞退してもいない。より広い部屋の要求は本文のどこにも述べられていない。"
        },
        {
          "no": 197,
          "question": "What was the topic of the lecture that Dr. Kimura was invited to replace?",
          "choices": [
            {
              "label": "A",
              "text": "The mineral colors used by Renaissance painters"
            },
            {
              "label": "B",
              "text": "The digital tools used in modern conservation work"
            },
            {
              "label": "C",
              "text": "The cleaning and storage of antique textiles"
            },
            {
              "label": "D",
              "text": "When damage should be preserved rather than repaired"
            }
          ],
          "answer": "A",
          "crossRef": true,
          "note": "最初のメールでKimuraは『Dr. Marisol Fennの代役』として招かれたとだけ述べ、Fennの演題自体には触れていない。一方、日程表を見るとFennの担当(10月4日)は『Pigments of the Renaissance』で、15世紀の画家が用いた鉱物顔料の同定と再現がテーマ。この2文書を突合して初めて、彼女が引き継ぐはずだった講演の主題がルネサンス期の鉱物顔料だと分かる。デジタル関連の選択肢はKimura自身の演題『Conservation in the Digital Age』であって代役対象の講演ではなく、メールだけを読むと引っかかる誤答。テキスタイルの洗浄・保管はVestergaard、損傷を残すか修復するかの倫理はDelacroixの演題で、いずれも日程表だけを見た別講師のトピック。"
        },
        {
          "no": 198,
          "question": "On which date will Dr. Kimura most likely give her lecture?",
          "choices": [
            {
              "label": "A",
              "text": "October 4"
            },
            {
              "label": "B",
              "text": "October 18"
            },
            {
              "label": "C",
              "text": "October 11"
            },
            {
              "label": "D",
              "text": "October 25"
            }
          ],
          "answer": "B",
          "crossRef": true,
          "note": "返信メールでBrandtは『Vestergaardが空いた開幕枠を引き受け、その結果として彼女自身の土曜が空くのでそこに入ってほしい』と伝えている。日程表でVestergaardの担当は10月18日。両文書を突合するとKimuraの登壇日は10月18日となる。10月4日はVestergaardが移動してくる開幕枠(元Fenn)、10月11日はRuiz、10月25日はKimuraが当初希望したがDelacroixに予約済みの枠であり、いずれも誤り。"
        },
        {
          "no": 199,
          "question": "In the first e-mail, the word \"ample\" is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "plentiful"
            },
            {
              "label": "B",
              "text": "brief"
            },
            {
              "label": "C",
              "text": "limited"
            },
            {
              "label": "D",
              "text": "equal"
            }
          ],
          "answer": "A",
          "crossRef": false,
          "note": "最初のメールの \"ample time to prepare\" における ample は『十分すぎるほどの、あり余る』の意で、plentiful が最も近い。brief(短い)や limited(限られた)は逆方向の意味で、equal(等しい)は文脈に合わない。"
        },
        {
          "no": 200,
          "question": "What is indicated about Dr. Hana Vestergaard?",
          "choices": [
            {
              "label": "A",
              "text": "She has withdrawn from the series."
            },
            {
              "label": "B",
              "text": "She will present on an earlier Saturday than first planned."
            },
            {
              "label": "C",
              "text": "She has changed the topic of her talk."
            },
            {
              "label": "D",
              "text": "She will share her session with Dr. Kimura."
            }
          ],
          "answer": "B",
          "crossRef": true,
          "note": "日程表ではVestergaardの担当は10月18日。返信メールでは彼女が空席となった開幕枠(10月4日)を引き受けると述べられている。両文書を突合すると当初より早い土曜に登壇することになると分かる。シリーズを降りたのはFennであってVestergaardではなく、話題の変更やKimuraとの同時開催は本文に根拠がない。"
        }
      ],
      "range": "196-200"
    }
  ],
  "answerKey": [
    {
      "no": 1,
      "answer": "A",
      "tag": "Part1"
    },
    {
      "no": 2,
      "answer": "A",
      "tag": "Part1"
    },
    {
      "no": 3,
      "answer": "B",
      "tag": "Part1"
    },
    {
      "no": 4,
      "answer": "D",
      "tag": "Part1"
    },
    {
      "no": 5,
      "answer": "C",
      "tag": "Part1"
    },
    {
      "no": 6,
      "answer": "B",
      "tag": "Part1"
    },
    {
      "no": 7,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 8,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 9,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 10,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 11,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 12,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 13,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 14,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 15,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 16,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 17,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 18,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 19,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 20,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 21,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 22,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 23,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 24,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 25,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 26,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 27,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 28,
      "answer": "B",
      "tag": "Part2"
    },
    {
      "no": 29,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 30,
      "answer": "A",
      "tag": "Part2"
    },
    {
      "no": 31,
      "answer": "C",
      "tag": "Part2"
    },
    {
      "no": 32,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 33,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 34,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 35,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 36,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 37,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 38,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 39,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 40,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 41,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 42,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 43,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 44,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 45,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 46,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 47,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 48,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 49,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 50,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 51,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 52,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 53,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 54,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 55,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 56,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 57,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 58,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 59,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 60,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 61,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 62,
      "answer": "B",
      "tag": "Part3"
    },
    {
      "no": 63,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 64,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 65,
      "answer": "D",
      "tag": "Part3"
    },
    {
      "no": 66,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 67,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 68,
      "answer": "C",
      "tag": "Part3"
    },
    {
      "no": 69,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 70,
      "answer": "A",
      "tag": "Part3"
    },
    {
      "no": 71,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 72,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 73,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 74,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 75,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 76,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 77,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 78,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 79,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 80,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 81,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 82,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 83,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 84,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 85,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 86,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 87,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 88,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 89,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 90,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 91,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 92,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 93,
      "answer": "D",
      "tag": "Part4"
    },
    {
      "no": 94,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 95,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 96,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 97,
      "answer": "C",
      "tag": "Part4"
    },
    {
      "no": 98,
      "answer": "A",
      "tag": "Part4"
    },
    {
      "no": 99,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 100,
      "answer": "B",
      "tag": "Part4"
    },
    {
      "no": 101,
      "answer": "D",
      "tag": "品詞"
    },
    {
      "no": 102,
      "answer": "C",
      "tag": "語彙"
    },
    {
      "no": 103,
      "answer": "B",
      "tag": "前置詞・接続詞"
    },
    {
      "no": 104,
      "answer": "C",
      "tag": "語彙"
    },
    {
      "no": 105,
      "answer": "B",
      "tag": "品詞"
    },
    {
      "no": 106,
      "answer": "D",
      "tag": "限定詞・代名詞・関係詞"
    },
    {
      "no": 107,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 108,
      "answer": "D",
      "tag": "品詞"
    },
    {
      "no": 109,
      "answer": "A",
      "tag": "前置詞・接続詞"
    },
    {
      "no": 110,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 111,
      "answer": "D",
      "tag": "動詞形"
    },
    {
      "no": 112,
      "answer": "D",
      "tag": "品詞"
    },
    {
      "no": 113,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 114,
      "answer": "C",
      "tag": "限定詞・代名詞・関係詞"
    },
    {
      "no": 115,
      "answer": "C",
      "tag": "品詞"
    },
    {
      "no": 116,
      "answer": "D",
      "tag": "前置詞・接続詞"
    },
    {
      "no": 117,
      "answer": "D",
      "tag": "語彙"
    },
    {
      "no": 118,
      "answer": "B",
      "tag": "動詞形"
    },
    {
      "no": 119,
      "answer": "C",
      "tag": "品詞"
    },
    {
      "no": 120,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 121,
      "answer": "D",
      "tag": "前置詞・接続詞"
    },
    {
      "no": 122,
      "answer": "B",
      "tag": "語彙"
    },
    {
      "no": 123,
      "answer": "A",
      "tag": "品詞"
    },
    {
      "no": 124,
      "answer": "C",
      "tag": "動詞形"
    },
    {
      "no": 125,
      "answer": "B",
      "tag": "語彙"
    },
    {
      "no": 126,
      "answer": "B",
      "tag": "限定詞・代名詞・関係詞"
    },
    {
      "no": 127,
      "answer": "A",
      "tag": "品詞"
    },
    {
      "no": 128,
      "answer": "C",
      "tag": "前置詞・接続詞"
    },
    {
      "no": 129,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 130,
      "answer": "B",
      "tag": "語彙"
    },
    {
      "no": 131,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 132,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 133,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 134,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 135,
      "answer": "B",
      "tag": "Part6"
    },
    {
      "no": 136,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 137,
      "answer": "B",
      "tag": "Part6"
    },
    {
      "no": 138,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 139,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 140,
      "answer": "B",
      "tag": "Part6"
    },
    {
      "no": 141,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 142,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 143,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 144,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 145,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 146,
      "answer": "C",
      "tag": "Part6"
    },
    {
      "no": 147,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 148,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 149,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 150,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 151,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 152,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 153,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 154,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 155,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 156,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 157,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 158,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 159,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 160,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 161,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 162,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 163,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 164,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 165,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 166,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 167,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 168,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 169,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 170,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 171,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 172,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 173,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 174,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 175,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 176,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 177,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 178,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 179,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 180,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 181,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 182,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 183,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 184,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 185,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 186,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 187,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 188,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 189,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 190,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 191,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 192,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 193,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 194,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 195,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 196,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 197,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 198,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 199,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 200,
      "answer": "B",
      "tag": "Part7"
    }
  ]
};

export default TOEIC_TEST_01;
