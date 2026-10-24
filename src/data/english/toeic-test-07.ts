/**
 * TOEIC(R) L&R 形式 リーディング模試 07 -- 自動生成データ
 * (scripts/assemble-toeic-reading.cjs)。手で編集しないこと。
 * 再生成: node scripts/assemble-toeic-reading.cjs "<scratch dir>" 07
 *
 * Reading (Part 5-7, 101-200) のみ。Listening は含まない。
 * 非公式のオリジナル模試。ETS および TOEIC 実施団体とは一切無関係。
 * 問題・本文はすべてオリジナルで、実試験の転載ではない。
 * スタイル仕様: docs/toeic-style-spec.md
 */
import type { ToeicTest } from './toeic-types';

export const TOEIC_TEST_07: ToeicTest = {
  "id": "toeic-test-07",
  "title": "TOEIC(R) L&R 形式 リーディング模試 07",
  "part1": [],
  "part2": [],
  "part3": [],
  "part4": [],
  "part5": [
    {
      "no": 101,
      "sentence": "Mr. Baik responded ------- to the billing inquiry that arrived during the weekend closure.",
      "choices": [
        {
          "label": "A",
          "text": "prompted"
        },
        {
          "label": "B",
          "text": "promptness"
        },
        {
          "label": "C",
          "text": "promptly"
        },
        {
          "label": "D",
          "text": "prompt"
        }
      ],
      "answer": "C",
      "tag": "品詞",
      "note": "選択肢は prompt の派生形。主語は Mr. Baik、述語動詞は responded で、文の骨格はすでにそろっている。空所は動詞 responded の様子を説明する位置なので、副詞 promptly を入れて「速やかに返答した」とするのが適切。形容詞 prompt は名詞を修飾する形で、動詞にはかからない。名詞 promptness はこの位置に文の要素としての置き場所がない。prompted は動詞の過去形・過去分詞で、述語動詞はすでにあるため重ねられない。"
    },
    {
      "no": 102,
      "sentence": "The new booking system at Fairwind Travel confirms reservations almost -------, even during peak hours.",
      "choices": [
        {
          "label": "A",
          "text": "instantly"
        },
        {
          "label": "B",
          "text": "abundantly"
        },
        {
          "label": "C",
          "text": "fluently"
        },
        {
          "label": "D",
          "text": "mutually"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "選択肢は4つとも副詞で、動詞 confirms を修飾する位置にはどれも文法的に置ける。決め手は意味。直前の almost と組み、予約が「ほぼ即座に」確定するという文脈なので instantly が適切。mutually は「相互に」で二者の関係を表し、処理の速さとは無関係。abundantly は量の豊富さを表す語で、確定の速度には付かない。fluently は言葉の流暢さを述べる語で、システムの動作説明にならない。"
    },
    {
      "no": 103,
      "sentence": "Employees may not park in the loading area ------- written permission from the operations manager.",
      "choices": [
        {
          "label": "A",
          "text": "unless"
        },
        {
          "label": "B",
          "text": "without"
        },
        {
          "label": "C",
          "text": "despite"
        },
        {
          "label": "D",
          "text": "except"
        }
      ],
      "answer": "B",
      "tag": "前置詞",
      "note": "選択肢は前置詞と接続詞の混在。空所の後ろは written permission という名詞のかたまりで、主語と動詞を含む節ではない。したがって名詞を目的語に取れる語が必要で、「書面の許可なしには駐車できない」となる without が適切。unless は節を導く接続詞なので名詞だけを続けられない。despite は「〜にもかかわらず」で、許可があるのに停められない逆の意味になってしまう。except は「〜を除いて」で、除外する対象が前に列挙されていないここでは意味が成り立たない。"
    },
    {
      "no": 104,
      "sentence": "Dr. Fujimori will present the survey results ------- at the quarterly board meeting next Tuesday.",
      "choices": [
        {
          "label": "A",
          "text": "hers"
        },
        {
          "label": "B",
          "text": "she"
        },
        {
          "label": "C",
          "text": "her"
        },
        {
          "label": "D",
          "text": "herself"
        }
      ],
      "answer": "D",
      "tag": "代名詞・限定詞",
      "note": "選択肢は同一人物を指す代名詞の変化形。主語 Dr. Fujimori と述語動詞 will present、目的語 the survey results がそろっていて、文の要素はすでに完結している。つまり空所は必須の要素ではなく、「他の誰かに任せず本人が自ら発表する」という強調を添える位置。主語と同じ人物を受けて強調に使える再帰代名詞 herself が適切。主格は主語の位置にしか置けず、主語はすでにある。目的格は動詞や前置詞の目的語になる形だが、目的語も埋まっている。所有代名詞は「彼女のもの」という名詞相当語句で、完結した文の後ろに名詞を重ねることになり意味が通らない。"
    },
    {
      "no": 105,
      "sentence": "The forklifts at the Alderpoint Freight terminal ------- a safety inspection every three months.",
      "choices": [
        {
          "label": "A",
          "text": "undergoes"
        },
        {
          "label": "B",
          "text": "undergo"
        },
        {
          "label": "C",
          "text": "undergoing"
        },
        {
          "label": "D",
          "text": "to undergo"
        }
      ],
      "answer": "B",
      "tag": "動詞形",
      "note": "選択肢は undergo の変化形で、空所は文の述語動詞の位置。主語は複数形の The forklifts であり、直前の terminal は前置詞句の中の名詞なので主語ではない。複数主語に合う undergo が適切。三人称単数現在形は単数主語にしか使えない。ing 形と不定詞はどちらも単独では述語動詞になれず、文が成立しない。"
    },
    {
      "no": 106,
      "sentence": "Under Foswell Analytics policy, employees must obtain a director's ------- before booking international flights.",
      "choices": [
        {
          "label": "A",
          "text": "apology"
        },
        {
          "label": "B",
          "text": "salary"
        },
        {
          "label": "C",
          "text": "entrance"
        },
        {
          "label": "D",
          "text": "approval"
        }
      ],
      "answer": "D",
      "tag": "語彙",
      "note": "選択肢は4つとも名詞で、所有格 a director's の後ろにはどれも形の上では置ける。文意は「国際線を予約する前に部門長の何かを得なければならない」という社内規定なので、事前に取り付けるものとして「承認」を表す approval が適切。salary は給与で、予約の条件として得るものではない。entrance は入口や入場を表し、規定の文脈に合わない。apology は謝罪で、手続きの前提になる語ではない。"
    },
    {
      "no": 107,
      "sentence": "Cedarline Foods announced the ------- of its Bristol distribution center at a press briefing on Monday.",
      "choices": [
        {
          "label": "A",
          "text": "expandable"
        },
        {
          "label": "B",
          "text": "expansion"
        },
        {
          "label": "C",
          "text": "expand"
        },
        {
          "label": "D",
          "text": "expanded"
        }
      ],
      "answer": "B",
      "tag": "品詞",
      "note": "選択肢は expand の派生形。空所は冠詞 the と前置詞 of に挟まれた位置で、名詞しか入らない。「配送センターの拡張を発表した」となる名詞 expansion が適切。expand は動詞の原形で、冠詞の直後には置けない。expanded は動詞の過去形・過去分詞。expandable は形容詞で、修飾する名詞が後ろにないためここでは機能しない。"
    },
    {
      "no": 108,
      "sentence": "The training session will proceed as planned ------- fewer than ten employees register by Friday.",
      "choices": [
        {
          "label": "A",
          "text": "unless"
        },
        {
          "label": "B",
          "text": "among"
        },
        {
          "label": "C",
          "text": "otherwise"
        },
        {
          "label": "D",
          "text": "despite"
        }
      ],
      "answer": "A",
      "tag": "接続詞",
      "note": "選択肢は接続詞・前置詞・副詞の混在。空所の後ろには fewer than ten employees register という主語と動詞を備えた節が続くので、節を導ける接続詞が必要。「金曜までの登録者が10人未満にならない限り、予定どおり実施する」となる unless が適切。despite と among は前置詞で、後ろに節を置けない。otherwise は「さもなければ」という副詞で、二つの節をつなぐ働きを持たない。"
    },
    {
      "no": 109,
      "sentence": "The Durnley Museum's new audio guide is ------- in six languages, including Portuguese and Korean.",
      "choices": [
        {
          "label": "A",
          "text": "available"
        },
        {
          "label": "B",
          "text": "responsible"
        },
        {
          "label": "C",
          "text": "eventual"
        },
        {
          "label": "D",
          "text": "grateful"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "選択肢は4つとも形容詞で、be 動詞の補語としてどれも形の上では成立する。文意は「音声ガイドが6言語で利用できる」なので、後ろの in six languages と自然につながる available が適切。grateful は人が感謝している状態を表し、ガイド機器には使えない。eventual は「最終的な」で名詞の前に置く使い方が基本のうえ、意味も通らない。responsible は「責任がある」で、言語対応の説明にならない。"
    },
    {
      "no": 110,
      "sentence": "------- Thursday's staff meeting, managers will outline the relocation timeline for the Ottawa branch.",
      "choices": [
        {
          "label": "A",
          "text": "Onto"
        },
        {
          "label": "B",
          "text": "During"
        },
        {
          "label": "C",
          "text": "While"
        },
        {
          "label": "D",
          "text": "Soon"
        }
      ],
      "answer": "B",
      "tag": "前置詞",
      "note": "選択肢は前置詞・接続詞・副詞の混在。空所の後ろは Thursday's staff meeting という名詞のかたまりで、コンマの後に完全な文が続く。会議という出来事の最中を表し、名詞を目的語に取れる during が適切。while は接続詞で、主語と動詞を持つ節を従える語。soon は副詞で、目的語を取れない。onto は「〜の上へ」という移動を表す前置詞で、会議には付かない。"
    },
    {
      "no": 111,
      "sentence": "Requests for extended leave ------- by the human resources office within five business days.",
      "choices": [
        {
          "label": "A",
          "text": "review"
        },
        {
          "label": "B",
          "text": "reviewing"
        },
        {
          "label": "C",
          "text": "are reviewed"
        },
        {
          "label": "D",
          "text": "have reviewed"
        }
      ],
      "answer": "C",
      "tag": "動詞形",
      "note": "選択肢は review の変化形で、空所は述語動詞の位置。主語は Requests for extended leave という「申請」であり、直後に動作主を示す by the human resources office が続く。申請は審査される側なので受動態 are reviewed が適切。能動の現在形と完了形は、申請が自ら審査する意味になるうえ目的語も欠けている。ing 形は単独では述語動詞になれない。"
    },
    {
      "no": 112,
      "sentence": "Switching to digital invoices has ------- reduced annual printing costs at Everhart Catering by nearly $4,000.",
      "choices": [
        {
          "label": "A",
          "text": "significance"
        },
        {
          "label": "B",
          "text": "significantly"
        },
        {
          "label": "C",
          "text": "significant"
        },
        {
          "label": "D",
          "text": "signify"
        }
      ],
      "answer": "B",
      "tag": "品詞",
      "note": "選択肢は同じ語幹の派生形。空所は has と過去分詞 reduced の間で、ここに割り込めるのは副詞 significantly だけ。形容詞は名詞を修飾する形、名詞は置き場所がなく、動詞の原形は has の後ろに続けられない。"
    },
    {
      "no": 113,
      "sentence": "Tickets ------- through the Calloway Concert Hall's official website include a printable receipt for expense reports.",
      "choices": [
        {
          "label": "A",
          "text": "occupied"
        },
        {
          "label": "B",
          "text": "informed"
        },
        {
          "label": "C",
          "text": "persuaded"
        },
        {
          "label": "D",
          "text": "purchased"
        }
      ],
      "answer": "D",
      "tag": "語彙",
      "note": "選択肢は4つとも過去分詞で、直前の Tickets を後ろから修飾する形はどれも作れる。決め手は意味で、「公式サイト経由で購入されたチケット」となる purchased が適切。informed は人に知らせる動詞で、チケットが知らされる側になる文意は成り立たない。occupied は座席や部屋が使用中であることを表し、ウェブサイト経由という手段の句と結びつかない。persuaded は人を説得する動詞で、チケットを目的語に取れない。"
    },
    {
      "no": 114,
      "sentence": "The shuttle to Fresno airport departs ------- the convention center's north entrance every forty minutes.",
      "choices": [
        {
          "label": "A",
          "text": "onto"
        },
        {
          "label": "B",
          "text": "from"
        },
        {
          "label": "C",
          "text": "among"
        },
        {
          "label": "D",
          "text": "upon"
        }
      ],
      "answer": "B",
      "tag": "前置詞",
      "note": "選択肢は4つとも前置詞。動詞は departs で、空所の後ろの north entrance は出発の起点にあたる場所。出発地点を表す from が適切。among は3つ以上のものの間を表す語で、単一の入口には使えない。onto は表面の上への移動を表し、出発の意味と両立しない。upon は接触や時点を表す語で、乗り物の出発地点には付かない。"
    },
    {
      "no": 115,
      "sentence": "Employees may choose ------- of the two insurance plans described in the enrollment booklet.",
      "choices": [
        {
          "label": "A",
          "text": "either"
        },
        {
          "label": "B",
          "text": "every"
        },
        {
          "label": "C",
          "text": "another"
        },
        {
          "label": "D",
          "text": "much"
        }
      ],
      "answer": "A",
      "tag": "代名詞・限定詞",
      "note": "空所の後ろに of the two insurance plans と続くのが決め手。2つのうちのどちらか一方を指せる either が適切。every は単独で of 句を従えられず、3つ以上を前提とする語でもある。much は数えられない名詞の量に使う語で、プランの数の話に合わない。another は「もう一つ別の」を表し、限定された2つの中から選ぶ場面では使えない。"
    },
    {
      "no": 116,
      "sentence": "Although both Danforth Insurance branches follow the same operations manual, their monthly sales figures have differed -------.",
      "choices": [
        {
          "label": "A",
          "text": "loosely"
        },
        {
          "label": "B",
          "text": "cautiously"
        },
        {
          "label": "C",
          "text": "considerably"
        },
        {
          "label": "D",
          "text": "gratefully"
        }
      ],
      "answer": "C",
      "tag": "語彙",
      "note": "選択肢は4つとも副詞で、文末から動詞 have differed を修飾する形はどれも取れる。同じマニュアルに従っているのに売上の数字が「大きく」異なってきた、という対比の文脈なので、差の程度の大きさを表す considerably が適切。cautiously は人の慎重な振る舞いを表す語で、数値の開きには使えない。gratefully は感謝の気持ちを伴う行動に付く語。loosely は結び付きや基準の緩さを表し、差の程度を示せない。"
    },
    {
      "no": 117,
      "sentence": "Attendees will receive detailed ------- about parking and shuttle schedules two days before the conference in Ghent.",
      "choices": [
        {
          "label": "A",
          "text": "inform"
        },
        {
          "label": "B",
          "text": "information"
        },
        {
          "label": "C",
          "text": "informative"
        },
        {
          "label": "D",
          "text": "informatively"
        }
      ],
      "answer": "B",
      "tag": "品詞",
      "note": "選択肢は inform の派生形。空所は動詞 will receive の目的語の位置で、形容詞 detailed に修飾されているので名詞が入る。「駐車場とシャトルの時刻に関する詳しい案内を受け取る」となる information が適切。inform は動詞の原形で目的語の位置に置けない。informative は形容詞、informatively は副詞で、いずれも名詞の働きを持たない。"
    },
    {
      "no": 118,
      "sentence": "Enclosed with the current invoice ------- two vouchers worth €40 each that customers may apply to future orders.",
      "choices": [
        {
          "label": "A",
          "text": "is"
        },
        {
          "label": "B",
          "text": "being"
        },
        {
          "label": "C",
          "text": "are"
        },
        {
          "label": "D",
          "text": "to be"
        }
      ],
      "answer": "C",
      "tag": "動詞形",
      "note": "過去分詞で始まる倒置文で、主語は空所の後ろの two vouchers。複数に一致する are が適切。単数形の be 動詞は数が合わない。being と to be は単独では述語動詞になれない。"
    },
    {
      "no": 119,
      "sentence": "Because the deadline is -------, the design team at Arbelo Consulting will work through the weekend.",
      "choices": [
        {
          "label": "A",
          "text": "spacious"
        },
        {
          "label": "B",
          "text": "humble"
        },
        {
          "label": "C",
          "text": "fluent"
        },
        {
          "label": "D",
          "text": "tight"
        }
      ],
      "answer": "D",
      "tag": "語彙",
      "note": "選択肢は4つとも形容詞で、be 動詞の補語の位置にはどれも置ける。理由の節と「週末も作業する」という帰結から、締め切りに余裕がないことを表す tight が適切。spacious は空間の広さを表す語で、期限には使えない。fluent は言語運用の滑らかさを表す。humble は人柄の謙虚さを述べる語で、締め切りの描写にならない。"
    },
    {
      "no": 120,
      "sentence": "The catering budget for the opening reception has risen ------- $1,850 since the guest list was expanded.",
      "choices": [
        {
          "label": "A",
          "text": "beside"
        },
        {
          "label": "B",
          "text": "onto"
        },
        {
          "label": "C",
          "text": "against"
        },
        {
          "label": "D",
          "text": "to"
        }
      ],
      "answer": "D",
      "tag": "前置詞",
      "note": "選択肢は4つとも前置詞。動詞 has risen の後ろに金額が続き、増加が到達した水準を示す文なので、到達点を表す to が適切。onto は表面の上への移動を表し、金額には付かない。against は対抗や接触を表す語で、増加の到達額を示せない。beside は「〜のそばに」という位置関係の語で、数値の変化と結びつかない。"
    },
    {
      "no": 121,
      "sentence": "In a recent survey, corporate clients rated Beaconview Payroll's support team as highly -------, particularly during year-end processing.",
      "choices": [
        {
          "label": "A",
          "text": "rely"
        },
        {
          "label": "B",
          "text": "reliably"
        },
        {
          "label": "C",
          "text": "reliable"
        },
        {
          "label": "D",
          "text": "reliability"
        }
      ],
      "answer": "C",
      "tag": "品詞",
      "note": "選択肢は rely の派生形。rated ... as の後ろは評価の中身を述べる補語の位置で、直前の副詞 highly に修飾されるのは形容詞。「サポート窓口を非常に頼りになると評価した」となる reliable が適切。動詞の原形 rely は補語になれない。副詞 reliably は highly の修飾先として成立しない。名詞 reliability を置くと highly が名詞を修飾する不自然な形になる。"
    },
    {
      "no": 122,
      "sentence": "Managers must record overtime hours each week ------- employees can be compensated accurately in the next payroll cycle.",
      "choices": [
        {
          "label": "A",
          "text": "because of"
        },
        {
          "label": "B",
          "text": "so that"
        },
        {
          "label": "C",
          "text": "even though"
        },
        {
          "label": "D",
          "text": "in order to"
        }
      ],
      "answer": "B",
      "tag": "接続詞",
      "note": "空所の後ろには employees can be compensated という主語と動詞を備えた節が続く。前半の「毎週残業時間を記録する」はその目的にあたるので、目的の節を導く so that が適切。in order to は後ろに動詞の原形を取る形で、節を続けられない。because of は前置詞句で、名詞しか従えない。even though は譲歩を表す接続詞で、記録と正確な支給が対立する内容ではないため意味が成り立たない。"
    },
    {
      "no": 123,
      "sentence": "The keynote address ------- by Ms. Afolabi drew the largest audience of the three-day technology summit.",
      "choices": [
        {
          "label": "A",
          "text": "delivered"
        },
        {
          "label": "B",
          "text": "imported"
        },
        {
          "label": "C",
          "text": "observed"
        },
        {
          "label": "D",
          "text": "renewed"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "選択肢は4つとも過去分詞で、直前の The keynote address を後ろから修飾する形はどれも作れる。講演は「行う」ものなので、スピーチと結びつく動詞 deliver の過去分詞 delivered が適切。observed は観察や規則の順守を表し、講演を目的語に取る動詞ではない。renewed は契約や証明書の更新に使う語。imported は物品の輸入を表し、基調講演の描写にならない。"
    },
    {
      "no": 124,
      "sentence": "Owing to a scheduled system upgrade, the self-checkout kiosks at the Edgewater Public Library will shut down -------.",
      "choices": [
        {
          "label": "A",
          "text": "briefness"
        },
        {
          "label": "B",
          "text": "briefed"
        },
        {
          "label": "C",
          "text": "brief"
        },
        {
          "label": "D",
          "text": "briefly"
        }
      ],
      "answer": "D",
      "tag": "品詞",
      "note": "選択肢は同じ語幹の派生形。主語は the self-checkout kiosks、述語動詞は will shut down で文は完結しており、文末の空所は動詞を修飾する位置。停止が短時間で済むことを表す副詞 briefly が適切。形容詞 brief は修飾する名詞がここにない。名詞 briefness は文の要素として置き場所がない。briefed は「事前説明を受けた」という動詞の過去分詞で、機器の停止とは意味がつながらない。"
    },
    {
      "no": 125,
      "sentence": "The hiring committee has not announced ------- will oversee the new apprenticeship program at Fernhill Manufacturing.",
      "choices": [
        {
          "label": "A",
          "text": "whose"
        },
        {
          "label": "B",
          "text": "whom"
        },
        {
          "label": "C",
          "text": "who"
        },
        {
          "label": "D",
          "text": "which"
        }
      ],
      "answer": "C",
      "tag": "関係詞",
      "note": "空所から文末までが動詞 announced の目的語になる名詞節で、節の中では will oversee の主語が欠けている。プログラムを統括する「人」を主語として導ける who が適切。whom は目的格で、主語の位置には置けない。whose は所有格で、直後に名詞を伴う必要がある。which は物や限定された選択肢を受ける語で、統括者という人を単独で指すここでは使えない。"
    },
    {
      "no": 126,
      "sentence": "Ms. Duran's proposal outlines several ------- for reducing energy use at the company's production plant.",
      "choices": [
        {
          "label": "A",
          "text": "careers"
        },
        {
          "label": "B",
          "text": "audiences"
        },
        {
          "label": "C",
          "text": "fabrics"
        },
        {
          "label": "D",
          "text": "strategies"
        }
      ],
      "answer": "D",
      "tag": "語彙",
      "note": "選択肢は4つとも複数形の名詞で、several の後ろにはどれも形の上では置ける。文意は「エネルギー使用を減らすための何かを提案書が示している」なので、for reducing 以下と自然につながる「方策」の strategies が適切。audiences は聴衆で、削減の手段にならない。careers は職歴・経歴を表す語。fabrics は布地で、省エネの提案内容として意味が通らない。"
    },
    {
      "no": 127,
      "sentence": "Invoices from Draycott Electrical are payable ------- thirty days of the billing date under the revised contract terms.",
      "choices": [
        {
          "label": "A",
          "text": "within"
        },
        {
          "label": "B",
          "text": "by"
        },
        {
          "label": "C",
          "text": "since"
        },
        {
          "label": "D",
          "text": "until"
        }
      ],
      "answer": "A",
      "tag": "前置詞",
      "note": "選択肢は4つとも時を扱える前置詞。空所の後ろは thirty days of the billing date という期間の幅で、その範囲内に支払いを済ませることを表す within が適切。until は継続の終点を示す語で、支払いという一回の行為には合わない。by は特定の期日を目的語に取る語で、期間の幅には付かない。since は起点からの継続を表し、支払期限の表現にならない。"
    },
    {
      "no": 128,
      "sentence": "A £75 deposit ------- at the time of booking for each vendor stall at the Brackford Trade Fair.",
      "choices": [
        {
          "label": "A",
          "text": "collects"
        },
        {
          "label": "B",
          "text": "collecting"
        },
        {
          "label": "C",
          "text": "is collected"
        },
        {
          "label": "D",
          "text": "has collected"
        }
      ],
      "answer": "C",
      "tag": "動詞形",
      "note": "選択肢は collect の変化形で、空所は述語動詞の位置。主語は75ポンドの deposit(預り金)で、預り金は出店予約の時点で主催者に「徴収される」側。したがって受動態 is collected が適切。能動の現在形と完了形は、預り金が自ら何かを徴収するという成り立たない意味になるうえ、集める対象の目的語も欠けている。ing 形は単独では述語動詞になれず、文全体の動詞が消えてしまう。"
    },
    {
      "no": 129,
      "sentence": "Trains on the Avonlea Transit line now run more ------- during weekday rush hours than they did last year.",
      "choices": [
        {
          "label": "A",
          "text": "frequency"
        },
        {
          "label": "B",
          "text": "frequently"
        },
        {
          "label": "C",
          "text": "frequented"
        },
        {
          "label": "D",
          "text": "frequent"
        }
      ],
      "answer": "B",
      "tag": "品詞",
      "note": "選択肢は同じ語幹の派生形。主語は Trains、述語動詞は run で、空所は more と組んで動詞 run を修飾する比較の位置。運行の頻度が上がったことを表す副詞 frequently が適切。形容詞 frequent は動詞を修飾できない。名詞 frequency は more の後ろで比較の形を作れない。frequented は「人がよく訪れる」という動詞の過去分詞で、ここに置くと文の構造が壊れる。"
    },
    {
      "no": 130,
      "sentence": "Employees who cannot ------- the safety session in person may watch a recorded version on the Corvale Systems intranet.",
      "choices": [
        {
          "label": "A",
          "text": "attend"
        },
        {
          "label": "B",
          "text": "renew"
        },
        {
          "label": "C",
          "text": "convince"
        },
        {
          "label": "D",
          "text": "distribute"
        }
      ],
      "answer": "A",
      "tag": "語彙",
      "note": "選択肢は4つとも動詞の原形で、cannot の後ろにはどれも形の上では置ける。文意は「その場で参加できない従業員は録画版を視聴してよい」なので、講習会を目的語に取って「出席する」を表す attend が適切。renew は契約や資格の更新に使う語で、講習会には付かない。convince は人を説得する動詞で、session を目的語に取れない。distribute は資料などを配布する意味で、in person 以下の文脈と合わない。"
    }
  ],
  "part6": [
    {
      "no": 1,
      "passageType": "article",
      "passage": "SWANSEA — Juniper Glassworks, a small studio on Quay Street, has become one of the city's busiest craft destinations. Founder Karolina Jasik opened the workshop nine years ago after §131§ as an assistant at a glass factory in Sweden. §132§ Visitors watch each piece take shape from a gallery above the furnace room. The studio's evening classes are equally §133§; the beginners' course is fully booked until March, and a waiting list has already been started. §134§, Ms. Jasik plans to install a second furnace next year so that more students can practice at the same time.",
      "intro": "Questions 131-134 refer to the following article.",
      "questions": [
        {
          "no": 131,
          "choices": [
            {
              "label": "A",
              "text": "training"
            },
            {
              "label": "B",
              "text": "train"
            },
            {
              "label": "C",
              "text": "to train"
            },
            {
              "label": "D",
              "text": "trained"
            }
          ],
          "answer": "A",
          "type": "verb",
          "note": "空所は前置詞 after の直後で、動詞を続けるなら動名詞の形にする必要がある。training as an assistant で「助手として修業を積んだのちに」となり、工房を開いた経緯として意味も通る。原形の train と to 不定詞は前置詞の目的語になれない。過去形の trained は述語動詞の形で、この位置には収まらない。"
        },
        {
          "no": 132,
          "choices": [
            {
              "label": "A",
              "text": "Tickets for the March exhibition go on sale tomorrow."
            },
            {
              "label": "B",
              "text": "Today it produces hundreds of handmade pieces each month."
            },
            {
              "label": "C",
              "text": "She has not yet decided on a location."
            },
            {
              "label": "D",
              "text": "The factory in Sweden closed shortly afterward."
            }
          ],
          "answer": "B",
          "type": "sentence",
          "note": "直前の文は創業者が9年前に工房を開いた経緯、直後の文は見学者がガラス作品の成形を見学できるという内容。間には工房の現在の生産ぶりを示す文が必要で、Today it produces hundreds of handmade pieces each month を入れると、pieces の語が直後の each piece take shape に自然につながる。スウェーデンの工場が閉鎖したという文は、記事の主役である工房の紹介から話題が外れる。3月の展示会のチケットは本文で一度も導入されていない情報を既知のように扱っている。場所をまだ決めていないという文は、工房がすでに9年前に開業していることと時系列が矛盾する。"
        },
        {
          "no": 133,
          "choices": [
            {
              "label": "A",
              "text": "popularity"
            },
            {
              "label": "B",
              "text": "popularly"
            },
            {
              "label": "C",
              "text": "popular"
            },
            {
              "label": "D",
              "text": "popularize"
            }
          ],
          "answer": "C",
          "type": "pos",
          "note": "選択肢は popular の派生語4つ。空所は be 動詞 are と副詞 equally に続く補語の位置なので、形容詞の popular が入る。「夜間クラスも同じくらい人気がある」となり文意も通る。名詞の popularity は equally の修飾を受けてこの位置に置けない。副詞の popularly は補語になれない。動詞の popularize は述語動詞がすでにあるこの文に置き場がない。"
        },
        {
          "no": 134,
          "choices": [
            {
              "label": "A",
              "text": "For instance"
            },
            {
              "label": "B",
              "text": "However"
            },
            {
              "label": "C",
              "text": "As a result"
            },
            {
              "label": "D",
              "text": "Otherwise"
            }
          ],
          "answer": "C",
          "type": "transition",
          "note": "直前の文は夜間クラスが満席で順番待ちまで発生していると述べ、空所の文は炉を増設してより多くの生徒が同時に練習できるようにすると続く。需要の高まりを受けての対応なので、結果を導く As a result が適切。however は逆接だが前後は対立していない。for instance は直前の内容の具体例を導く語で、増設計画は満席状態の例ではない。otherwise は「さもなければ」と条件の裏返しを述べる語で、この文脈には合わない。"
        }
      ],
      "range": "131-134"
    },
    {
      "no": 2,
      "passageType": "e-mail",
      "passage": "To: g.imrie@gullmail.ca\nFrom: memberships@harborviewaquarium.ca\nDate: 3 March\nSubject: Your membership renewal\n\nDear Ms. Imrie,\n\nThank you for supporting Harborview Aquarium in Halifax for the past two years. Your family membership expires on 31 March, and we invite you to renew before 1 April, when a modest price §135§ takes effect. Renewing now locks in the current rate of $129 for another full year.\n\nAs a member, you receive unlimited §136§ to all galleries, including the new jellyfish hall that opens in May. If you renew online by 20 March, two guest passes §137§ to your account at no extra charge.\n\nRenewing takes only a few minutes at harborviewaquarium.ca. §138§\n\nSincerely,\n\nJustine Gagnon, Membership Coordinator\nHarborview Aquarium",
      "intro": "Questions 135-138 refer to the following e-mail.",
      "questions": [
        {
          "no": 135,
          "choices": [
            {
              "label": "A",
              "text": "adjustment"
            },
            {
              "label": "B",
              "text": "adjusted"
            },
            {
              "label": "C",
              "text": "adjustable"
            },
            {
              "label": "D",
              "text": "adjust"
            }
          ],
          "answer": "A",
          "type": "pos",
          "note": "選択肢は adjust の派生語。空所は a modest price に続き、takes effect の主語の中心となる名詞の位置。price adjustment で「料金改定」となる adjustment が正解。原形の adjust と過去形の adjusted は述語動詞の形で、takes effect の前に置けない。形容詞の adjustable を入れると主語となる名詞が消えてしまい、文が成立しない。"
        },
        {
          "no": 136,
          "choices": [
            {
              "label": "A",
              "text": "approval"
            },
            {
              "label": "B",
              "text": "access"
            },
            {
              "label": "C",
              "text": "assistance"
            },
            {
              "label": "D",
              "text": "arrival"
            }
          ],
          "answer": "B",
          "type": "vocab",
          "note": "選択肢はすべて名詞で文法だけでは絞れない。unlimited と to all galleries に挟まれた空所には、「全展示室への無制限の入場・利用」を表す access が合う。approval は「承認」で会員特典の説明にならない。arrival は一回ごとの到着を指す語で unlimited と結びつかない。assistance は「支援」の意味で、to all galleries という行き先の句を受けられない。"
        },
        {
          "no": 137,
          "choices": [
            {
              "label": "A",
              "text": "have added"
            },
            {
              "label": "B",
              "text": "to be added"
            },
            {
              "label": "C",
              "text": "are adding"
            },
            {
              "label": "D",
              "text": "will be added"
            }
          ],
          "answer": "D",
          "type": "verb",
          "note": "主語は two guest passes で、パスは口座に「追加される」側なので受動態が必要。if 節の条件を受けた未来の内容でもあるため、will be added が正解。have added と are adding は能動態で、パス自身が何かを加えることになり意味が通らない。to be added は述語動詞になれず、文が完成しない。"
        },
        {
          "no": 138,
          "choices": [
            {
              "label": "A",
              "text": "Guest passes may not be used during July."
            },
            {
              "label": "B",
              "text": "Our team can also arrange renewals by telephone."
            },
            {
              "label": "C",
              "text": "Please bring your printed application to the interview."
            },
            {
              "label": "D",
              "text": "The jellyfish hall closed for repairs last week."
            }
          ],
          "answer": "B",
          "type": "sentence",
          "note": "直前の文はウェブサイトでの更新手続きが数分で済むと案内している。Our team can also arrange renewals by telephone を置くと、also がオンライン手続きを受けて電話という別の手段を付け加える流れになり、更新を勧めるメールの締めくくりとしても自然。クラゲ館が先週修理のため閉鎖したという文は、5月に開館するという前段の記述と時系列が食い違う。印刷した応募書類を面接に持参せよという文は、会員更新の案内という文書の用件から完全に外れる。ゲストパスが7月に使えないという制限は本文のどこにも導入されておらず、直前の文ともつながらない。"
        }
      ],
      "range": "135-138"
    },
    {
      "no": 3,
      "passageType": "advertisement",
      "passage": "IRONBARK LIGHTING DESIGN\nAdelaide's specialists in workplace lighting\n\nPoor lighting drains energy from even the best-designed office. §139§ Our designers begin every project with a free on-site assessment, measuring how daylight moves through your space before recommending a single fixture. §140§, every plan we deliver includes a detailed running-cost estimate, so you know your yearly savings before installation begins. Clients typically §141§ their electricity costs by up to thirty percent within the first year.\n\nTo arrange an assessment, call 08 5550 1183 or visit ironbarklighting.com.au. Ask about our §142§ maintenance plans for offices with more than fifty light fixtures.",
      "intro": "Questions 139-142 refer to the following advertisement.",
      "questions": [
        {
          "no": 139,
          "choices": [
            {
              "label": "A",
              "text": "Ironbark Lighting Design can change that."
            },
            {
              "label": "B",
              "text": "Our showroom sells desk lamps at half price."
            },
            {
              "label": "C",
              "text": "Thank you for attending last week's seminar."
            },
            {
              "label": "D",
              "text": "Daylight assessments are no longer offered."
            }
          ],
          "answer": "A",
          "type": "sentence",
          "note": "冒頭の文は、照明の悪さがオフィスの活力を奪うという問題提起。Ironbark Lighting Design can change that を入れると、that がその問題を受け、直後の Our designers begin every project という自社サービスの説明へ橋を架ける。採光調査をもう行っていないという文は、直後で無料の現地調査を売り込む内容と真っ向から矛盾する。ショールームで卓上ランプを半額販売という文は、設計サービスを宣伝するこの広告の目的から逸れる。先週のセミナーへの謝辞は、不特定多数に向けた広告という場面に合わない。"
        },
        {
          "no": 140,
          "choices": [
            {
              "label": "A",
              "text": "For instance"
            },
            {
              "label": "B",
              "text": "Nevertheless"
            },
            {
              "label": "C",
              "text": "Moreover"
            },
            {
              "label": "D",
              "text": "Instead"
            }
          ],
          "answer": "C",
          "type": "transition",
          "note": "直前の文は無料の現地調査という利点を述べ、空所の文はさらに年間コストの試算が全プランに付くという別の利点を重ねている。同じ方向に情報を追加しているので Moreover が適切。nevertheless は逆接で、前後が対立していないため成立しない。instead は前の内容を打ち消して置き換える語。for instance を入れるにはコスト試算が現地調査の具体例である必要があるが、両者は別のサービスなので例示の関係にならない。"
        },
        {
          "no": 141,
          "choices": [
            {
              "label": "A",
              "text": "reduce"
            },
            {
              "label": "B",
              "text": "decline"
            },
            {
              "label": "C",
              "text": "exchange"
            },
            {
              "label": "D",
              "text": "postpone"
            }
          ],
          "answer": "A",
          "type": "vocab",
          "note": "選択肢はすべて動詞の原形で、文法では絞れない。electricity costs を目的語に取り、by up to thirty percent という削減幅と結びつくのは reduce。decline は「減る」の意味では自動詞で、costs を目的語に取れない。postpone は支払いの先送りを意味し、照明設計による節約効果の説明にならない。exchange は「交換する」で、費用を交換するという文は意味を成さない。"
        },
        {
          "no": 142,
          "choices": [
            {
              "label": "A",
              "text": "affordability"
            },
            {
              "label": "B",
              "text": "affordably"
            },
            {
              "label": "C",
              "text": "afford"
            },
            {
              "label": "D",
              "text": "affordable"
            }
          ],
          "answer": "D",
          "type": "pos",
          "note": "選択肢は afford の派生語。空所は our と maintenance plans の間で、名詞を前から修飾する形容詞の位置。affordable maintenance plans で「手頃な価格の保守プラン」となり広告の文脈にも合う。名詞の affordability は maintenance plans の前に置いても修飾関係を作れない。副詞の affordably は名詞を修飾できない。動詞の afford はこの位置に入る余地がない。"
        }
      ],
      "range": "139-142"
    },
    {
      "no": 4,
      "passageType": "e-mail",
      "passage": "To: h.kallio@kotamail.fi\nFrom: passes@jarvilineferries.fi\nDate: 28 April\nSubject: Season pass now available\n\nDear Mr. Kallio,\n\nSailings between Tampere and our lakeside piers resume on 15 May, and season passes for the summer timetable are now on sale. As a passenger who bought single tickets last year, you can order a pass at the introductory price of €85 until 9 May. §143§, the standard price of €110 will apply.\n\nThe pass covers every departure through 30 September. Passengers §144§ the pass on a phone no longer need to print tickets at the pier. §145§ Simply show the code to the crew as you board.\n\nWe look forward to §146§ you on the water this summer.\n\nKind regards,\n\nMarta Heikkinen, Ticketing Manager\nJarviline Ferries",
      "intro": "Questions 143-146 refer to the following e-mail.",
      "questions": [
        {
          "no": 143,
          "choices": [
            {
              "label": "A",
              "text": "In contrast"
            },
            {
              "label": "B",
              "text": "For example"
            },
            {
              "label": "C",
              "text": "Likewise"
            },
            {
              "label": "D",
              "text": "After that"
            }
          ],
          "answer": "D",
          "type": "transition",
          "note": "直前の文は5月9日まで割引価格で購入できると期限を示し、空所の文は標準価格が適用されると続く。期限が過ぎたあとの話なので、時間の前後関係を示す After that が適切。for example は具体例の導入で、価格の切り替わりを表せない。in contrast は対比の語だが、前後は対立ではなく期限前と期限後という順序の関係。likewise は同様の事柄を並べる語で、条件が変わる場面には合わない。"
        },
        {
          "no": 144,
          "choices": [
            {
              "label": "A",
              "text": "using"
            },
            {
              "label": "B",
              "text": "uses"
            },
            {
              "label": "C",
              "text": "used"
            },
            {
              "label": "D",
              "text": "to use"
            }
          ],
          "answer": "A",
          "type": "verb",
          "note": "この文の述語動詞は need で、空所は主語 Passengers を後ろから修飾する準動詞の位置。乗客はパスを「使う」側なので、能動を表す現在分詞の using が正解。uses を入れると1つの文に述語動詞が2つ並んでしまう。過去分詞の used では乗客が「使われる」側になり意味が逆転する。to use は「使うための乗客」となり修飾関係が成立しない。"
        },
        {
          "no": 145,
          "choices": [
            {
              "label": "A",
              "text": "Crew applications close at the end of May."
            },
            {
              "label": "B",
              "text": "The pass cannot be used on weekend sailings."
            },
            {
              "label": "C",
              "text": "Your boarding code appears in the order confirmation."
            },
            {
              "label": "D",
              "text": "Printed timetables can be collected at the pier."
            }
          ],
          "answer": "C",
          "type": "sentence",
          "note": "直前の文は、携帯電話でパスを提示すれば桟橋で紙の券を印刷する必要がなくなると述べている。Your boarding code appears in the order confirmation を入れると、直後の Simply show the code の the code が指すものが確定し、乗船手順の説明が完結する。紙の時刻表を桟橋で受け取れるという文は、印刷が不要になるという直前の流れと逆行する。週末の便で使えないという制限は、全便に有効というこの段落冒頭の記述と矛盾する。乗組員の採用応募の締切は、季節パスの案内という文書の用件と無関係。"
        },
        {
          "no": 146,
          "choices": [
            {
              "label": "A",
              "text": "convincing"
            },
            {
              "label": "B",
              "text": "estimating"
            },
            {
              "label": "C",
              "text": "appointing"
            },
            {
              "label": "D",
              "text": "welcoming"
            }
          ],
          "answer": "D",
          "type": "vocab",
          "note": "選択肢はすべて動名詞で形は同じ。look forward to のあとに続けて「今年の夏、湖上でお客様をお迎えするのを楽しみにしています」と結びの挨拶になる welcoming が正解。appointing は「任命する」で乗客に対して使えない。convincing は「説得する」の意味で、締めくくりの文に合わない。estimating は「見積もる」で、you を目的語に取ると意味を成さない。"
        }
      ],
      "range": "143-146"
    }
  ],
  "part7single": [
    {
      "no": 1,
      "kind": "single",
      "passageType": "memo",
      "passages": [
        {
          "heading": "MEMO",
          "body": "To: All Meridell Insurance Group staff\nFrom: Hana Nakamura, Facilities Manager\nDate: March 3\nSubject: Fourth-floor renovation\n\nBeginning Monday, March 16, the fourth floor will be closed for six weeks while new wiring and carpet are installed. Staff seated there will work from temporary desks on the second floor.\n\nPacking crates will be delivered to each desk on March 11. Please pack your files and personal items by 5:00 P.M. on Friday, March 13, and attach the printed label showing your name and your temporary desk number. The technology team will move monitors over the weekend; take your laptop home with you on Friday evening.\n\nWhile the floor is closed, anyone needing to retrieve a forgotten item must arrange an escort through the security office."
        }
      ],
      "intro": "Questions 147-148 refer to the following memo.",
      "questions": [
        {
          "no": 147,
          "question": "What is one purpose of the memo?",
          "choices": [
            {
              "label": "A",
              "text": "To announce the opening of a new office building"
            },
            {
              "label": "B",
              "text": "To ask employees to join a renovation committee"
            },
            {
              "label": "C",
              "text": "To explain arrangements for a temporary relocation"
            },
            {
              "label": "D",
              "text": "To report that renovation work has been completed"
            }
          ],
          "answer": "C",
          "qType": "purpose",
          "note": "3月16日から4階が閉鎖され、そこに席のある社員は2階の仮設デスクへ移ると告げたうえで、荷造りやラベル貼りの段取りを指示している。一時的な引っ越しの手順を知らせるのがこのメモの用件。配線とカーペットの工事はこれから始まる段階なので、完了の報告ではない。移る先は同じ建物の2階であり、新しいビルの開設という話でもない。委員会への参加を呼びかける文はどこにもない。"
        },
        {
          "no": 148,
          "question": "What are employees asked to do by the end of the day on March 13?",
          "choices": [
            {
              "label": "A",
              "text": "Contact the security office"
            },
            {
              "label": "B",
              "text": "Pack and label their belongings"
            },
            {
              "label": "C",
              "text": "Carry empty crates to the second floor"
            },
            {
              "label": "D",
              "text": "Take their computer monitors home"
            }
          ],
          "answer": "B",
          "qType": "detail",
          "note": "3月13日(金)の17時までにファイルと私物を箱に詰め、氏名と仮デスク番号を記したラベルを貼るよう求められている。モニターを運ぶのは技術チームの仕事で、社員が金曜に持ち帰るのはラップトップのほう。箱は3月11日に各デスクへ届けられるものであり、社員が2階へ運ぶという指示はない。警備室への連絡は、閉鎖中に忘れ物を取りに入る場合に必要になる手続きで、13日までにやることではない。"
        }
      ],
      "range": "147-148"
    },
    {
      "no": 2,
      "kind": "single",
      "passageType": "receipt",
      "passages": [
        {
          "heading": "LUMEN COFFEE ROASTERY",
          "body": "618 River Street, Savannah\nReceipt no. 4471 — Saturday, 9 May, 2:14 P.M.\nServed by: M. Lopez\n\n| Item | Qty | Price |\n| Costa Rica whole beans, 12 oz | 2 | $25.50 |\n| Pour-over kettle, steel | 1 | $24.00 |\n| Paper filters, box of 100 | 1 | $6.50 |\n\nSubtotal  $56.00\nSales tax  $3.92\nTotal  $59.92\n\nUnopened coffee bags may be exchanged within 14 days with this receipt. Opened bags and brewing equipment may not be returned.",
          "type": "form"
        }
      ],
      "intro": "Questions 149-150 refer to the following receipt.",
      "questions": [
        {
          "no": 149,
          "question": "What did the customer buy in addition to coffee beans?",
          "choices": [
            {
              "label": "A",
              "text": "A gift card"
            },
            {
              "label": "B",
              "text": "A coffee grinder"
            },
            {
              "label": "C",
              "text": "A kettle and some filters"
            },
            {
              "label": "D",
              "text": "A set of ceramic mugs"
            }
          ],
          "answer": "C",
          "qType": "detail",
          "note": "品目欄にはコスタリカの豆2袋のほかに、スチール製の注湯用ケトル1点と100枚入りのペーパーフィルター1箱が並んでいる。豆以外に買ったのはこの2点。グラインダーやマグカップはレシートのどの行にも載っておらず、ギフトカードを購入した形跡もない。"
        },
        {
          "no": 150,
          "question": "What is suggested about the kettle?",
          "choices": [
            {
              "label": "A",
              "text": "It cannot be returned to the store."
            },
            {
              "label": "B",
              "text": "It was the most expensive line on the receipt."
            },
            {
              "label": "C",
              "text": "It was sold at a discount."
            },
            {
              "label": "D",
              "text": "It can be exchanged within 14 days."
            }
          ],
          "answer": "A",
          "qType": "infer",
          "note": "レシート末尾の条件書きに、開封済みの豆と抽出器具は返品を受け付けないとある。ケトルは抽出器具にあたるので、店に返すことはできない。14日以内の交換が認められているのは未開封の豆の袋だけで、器具は対象外。値引きを示す行はどこにもない。金額を見ても、豆2袋の行が25.50ドルでケトルの24.00ドルを上回っており、ケトルが最高額の行というわけでもない。"
        }
      ],
      "range": "149-150"
    },
    {
      "no": 3,
      "kind": "single",
      "passageType": "press release",
      "passages": [
        {
          "heading": "FOR IMMEDIATE RELEASE",
          "body": "Contact: Marta Novoa, press@pereiravalley.pt\n\nPORTO (14 April)—The Pereira Valley Growers' Cooperative, an association of fifty-two family fruit farms, today announced PomaPress, a trailer-mounted juicing service that will begin touring member orchards in September. — [1] — Until now, members have trucked surplus apples and pears to a bottling plant some eighty kilometers away, a cost that led many to leave part of their crop unharvested.\n\nThe trailer will follow a published route from September through November, staying up to two days at each orchard. — [2] — Fruit is washed, pressed, and bottled on site for EUR 0.35 per liter, and each farm may sell the juice under its own label.\n\nMembers may reserve pressing dates through the cooperative's office beginning 1 June. — [3] — \"Small growers have been asking for something like this for years,\" said cooperative director Marta Novoa. — [4] — The cooperative expects PomaPress to produce roughly 60,000 liters in its first season."
        }
      ],
      "intro": "Questions 151-153 refer to the following press release.",
      "questions": [
        {
          "no": 151,
          "question": "According to the press release, what will happen in September?",
          "choices": [
            {
              "label": "A",
              "text": "A mobile pressing service will begin operating."
            },
            {
              "label": "B",
              "text": "Reservations for pressing dates will open."
            },
            {
              "label": "C",
              "text": "A new bottling plant will be constructed."
            },
            {
              "label": "D",
              "text": "The cooperative will admit new member farms."
            }
          ],
          "answer": "A",
          "qType": "detail",
          "note": "冒頭で、トレーラー搭載の搾汁サービス PomaPress が9月から組合員の果樹園を巡回し始めると告知している。9月に起きるのはこの稼働開始。搾汁日の予約受付が始まるのは6月1日で、時期が合わない。80キロ先の瓶詰め工場は、これまで組合員が余った果物を運んでいた既存の施設の話であって、新設の計画ではない。新しい組合員を受け入れるという話はどこにも出てこない。"
        },
        {
          "no": 152,
          "question": "What is suggested about members of the cooperative?",
          "choices": [
            {
              "label": "A",
              "text": "Some of them have not been harvesting all of their fruit."
            },
            {
              "label": "B",
              "text": "They live within eighty kilometers of Porto."
            },
            {
              "label": "C",
              "text": "They all grow the same kind of fruit."
            },
            {
              "label": "D",
              "text": "They pay an annual fee to the cooperative."
            }
          ],
          "answer": "A",
          "qType": "infer",
          "note": "遠くの工場まで運ぶ費用がかさむせいで、収穫の一部を木に残したままにする組合員が多かったと書かれている。つまり実を採り切らない農家がいたことが読み取れる。育てている果物はリンゴと洋ナシの両方が挙がっており、全員が同じ果物を作っているとは言えない。80キロというのは余剰果実を運んでいた瓶詰め工場までの距離であって、組合員の居住範囲を示す数字ではない。年会費についての記載は一切ない。"
        },
        {
          "no": 153,
          "question": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? \"Dates that remain unclaimed by 15 August will be offered to nonmember farms for an additional fee.\"",
          "choices": [
            {
              "label": "A",
              "text": "[4]"
            },
            {
              "label": "B",
              "text": "[1]"
            },
            {
              "label": "C",
              "text": "[3]"
            },
            {
              "label": "D",
              "text": "[2]"
            }
          ],
          "answer": "C",
          "qType": "insert",
          "note": "挿入文の主語「予約されずに残った日程」は、日程を予約するという話題が直前に出ていて初めて意味が通る。組合員が6月1日から事務局を通じて搾汁日を予約できる、と述べた文の直後に置けば、8月15日までに埋まらなかった枠を追加料金で非組合員に回す、という流れが自然につながる。第1段落の位置ではまだサービス開始の告知しかなく、日程の話そのものが存在しない。巡回ルートと料金を説明するくだりも、予約制度の説明より前なので「残った日程」が宙に浮く。ディレクターの発言の後ろでは、引用と初年度の生産見込みの間に事務的な規定が割り込み、締めの流れが切れてしまう。"
        }
      ],
      "range": "151-153"
    },
    {
      "no": 4,
      "kind": "single",
      "passageType": "text-message chain",
      "passages": [
        {
          "body": "Nora Phelan (10:02 A.M.): I'm at Pembray Hall. The stage risers are up, but the hall owns only six microphone stands and our program lists nine speakers.\n\nDiego Lombard (10:04 A.M.): No problem—we have three spares in the van. I'll load them now. Anything else?\n\nNora Phelan (10:06 A.M.): The banner that was delivered this morning says Annual Suppliers Dinner, but tonight is the awards ceremony. Someone must have sent Ms. Quon last month's file.\n\nDiego Lombard (10:08 A.M.): Can she still run a corrected banner for us before five o'clock?\n\nNora Phelan (10:09 A.M.): She says her large-format printer is booked until four, so a reprint would be tight.\n\nDiego Lombard (10:11 A.M.): Then let's skip the reprint, hang the plain gray backdrop, and project the ceremony logo onto it instead.\n\nNora Phelan (10:12 A.M.): That would actually look better. See you at noon."
        }
      ],
      "intro": "Questions 154-156 refer to the following text-message chain.",
      "questions": [
        {
          "no": 154,
          "question": "According to Ms. Phelan, what is wrong with the banner?",
          "choices": [
            {
              "label": "A",
              "text": "It arrived with visible damage."
            },
            {
              "label": "B",
              "text": "It displays the name of the wrong event."
            },
            {
              "label": "C",
              "text": "It lists only six of the speakers."
            },
            {
              "label": "D",
              "text": "It is too small for the stage."
            }
          ],
          "answer": "B",
          "qType": "detail",
          "note": "10時6分の発言で、今朝届いた横断幕には「Annual Suppliers Dinner」と刷られているが、今夜開かれるのは授賞式だと指摘している。つまり別の催しの名前が印刷されているのが問題。破損や寸法についての言及はどこにもない。6と9という数字はホールにあるマイクスタンドの本数とプログラム上の登壇者数の話であって、横断幕に載っている名前の数ではない。"
        },
        {
          "no": 155,
          "question": "Who most likely is Ms. Quon?",
          "choices": [
            {
              "label": "A",
              "text": "An awards presenter"
            },
            {
              "label": "B",
              "text": "An employee of a printing business"
            },
            {
              "label": "C",
              "text": "A caterer"
            },
            {
              "label": "D",
              "text": "The manager of Pembray Hall"
            }
          ],
          "answer": "B",
          "qType": "person",
          "note": "横断幕の元データは誰かが先月のファイルのまま彼女に送ってしまったらしいとされ、続くやり取りでは彼女の大判プリンターが4時まで塞がっているため刷り直しが間に合うかが危ぶまれている。データを受け取り、大判の機械で横断幕を刷る立場にあることから、印刷業に携わる人物だと推測できる。料理を手配する描写も会場を管理する描写もなく、授賞式に登壇するという話も出てこない。"
        },
        {
          "no": 156,
          "question": "At 10:12 A.M., what does Ms. Phelan most likely mean when she writes, \"That would actually look better\"?",
          "choices": [
            {
              "label": "A",
              "text": "She believes extra microphone stands will improve the stage."
            },
            {
              "label": "B",
              "text": "She expects Ms. Quon's reprint to be an improvement."
            },
            {
              "label": "C",
              "text": "She thinks the hall looks best with the risers up."
            },
            {
              "label": "D",
              "text": "She prefers a projected logo to a reprinted banner."
            }
          ],
          "answer": "D",
          "qType": "intent",
          "note": "直前の10時11分に、刷り直しはやめて無地のグレーの背景幕を掛け、式典のロゴを投影しようという提案が出ている。それを受けての一言なので、「そのほうがかえって見栄えがする」は、横断幕を刷り直すよりも投影のほうが良いという同意を表す。刷り直し自体は、機械が4時まで塞がっていて間に合うか怪しいとされた案であり、その仕上がりに期待を述べているのではない。ステージ台は冒頭で既に設置済みと報告された話題、マイクスタンドの不足も10時4分に解決済みで、この発言とは結びつかない。"
        }
      ],
      "range": "154-156"
    },
    {
      "no": 5,
      "kind": "single",
      "passageType": "flyer",
      "passages": [
        {
          "heading": "OPEN DAY — QUARRY PEAK CLIMBING CENTRE",
          "body": "Saturday, 22 February, 9:00 A.M.–4:00 P.M.\n41 Norwick Road, Dunedin\n\nCome and see what indoor climbing is all about—no experience needed.\n\n- Beginner wall sessions on the hour, every hour (NZ$5 per person; harness and shoes provided)\n- Coaching demonstrations on the bouldering wall at 11:00 A.M. and 2:00 P.M.\n- Supervised activity corner for children ages 5-11\n- Last season's climbing shoes and chalk bags at 40 percent off\n\nOur coaches will be on the floor all day to answer questions about training plans and family passes. Entry to the building is free. Wall sessions are limited to twelve climbers each; collect a wristband at the front desk. Climbers under 16 must be accompanied by an adult.\n\nJoin as a member on the day and the usual NZ$60 joining fee will be waived.\n\nwww.quarrypeak.nz/openday"
        }
      ],
      "intro": "Questions 157-159 refer to the following flyer.",
      "questions": [
        {
          "no": 157,
          "question": "What is indicated about the beginner wall sessions?",
          "choices": [
            {
              "label": "A",
              "text": "They are held twice during the day."
            },
            {
              "label": "B",
              "text": "Participants do not need to bring equipment."
            },
            {
              "label": "C",
              "text": "They are free of charge."
            },
            {
              "label": "D",
              "text": "They are open only to children."
            }
          ],
          "answer": "B",
          "qType": "infer",
          "note": "初心者向けのウォールセッションはハーネスとシューズ付きと明記されているので、道具を持参しなくても参加できる。1人5NZドルの参加費がかかるため無料ではない。無料なのは建物への入場のほう。セッションは毎正時に開かれるので1日2回ではなく、11時と14時の2回というのはボルダリング壁でのデモンストレーションの時刻。5〜11歳と区切られているのは監督付きの子どもコーナーで、セッションそのものが子ども限定だという記述はない。"
        },
        {
          "no": 158,
          "question": "What is NOT mentioned as part of the open day?",
          "choices": [
            {
              "label": "A",
              "text": "A climbing competition"
            },
            {
              "label": "B",
              "text": "Discounted climbing gear"
            },
            {
              "label": "C",
              "text": "Demonstrations by coaches"
            },
            {
              "label": "D",
              "text": "An area for young children"
            }
          ],
          "answer": "A",
          "qType": "not",
          "note": "チラシに並んでいるのは、毎正時の初心者セッション、コーチによる11時と14時のデモンストレーション、5〜11歳の子ども向けの監督付きコーナー、そして昨シーズンのシューズとチョークバッグの4割引販売。値引きされた用具、コーチの実演、幼い子ども向けのスペースはいずれも本文で確認できる。一方、競技会やコンテストの類いはどこにも書かれていない。"
        },
        {
          "no": 159,
          "question": "What is suggested about people who become members on 22 February?",
          "choices": [
            {
              "label": "A",
              "text": "They will pay less than people who join later."
            },
            {
              "label": "B",
              "text": "They will receive a free pair of climbing shoes."
            },
            {
              "label": "C",
              "text": "They do not need wristbands for wall sessions."
            },
            {
              "label": "D",
              "text": "They can enter the building before 9:00 A.M."
            }
          ],
          "answer": "A",
          "qType": "infer",
          "note": "当日に入会すれば通常60NZドルの入会金が免除されるとあるので、後日入会する人よりも安く会員になれることが読み取れる。シューズは昨シーズンの品が4割引で売られるだけで、無料で配られるわけではない。開場は9時からで、会員向けの早入りには触れていない。ウォールセッションのリストバンドは各回12人の定員を管理するために全員が受付で受け取る決まりで、会員なら不要になるとはどこにも書かれていない。"
        }
      ],
      "range": "157-159"
    },
    {
      "no": 6,
      "kind": "single",
      "passageType": "itinerary",
      "passages": [
        {
          "heading": "Venue Inspection Itinerary — Ms. Renate Sturm, Events Manager, Trivena Software",
          "body": "Purpose of visit: to assess two possible venues in Graz for the annual Trivena Software user conference, an event that is expected to draw about 600 attendees next March. Ms. Sturm will present her recommendation to the executive board by 30 May. All local transportation during the visit will be provided by Urbanek Event Partners.\n\nMonday, 12 May\n9:10 A.M. - Arrive at Graz airport; transfer arranged by Urbanek Event Partners\n11:30 A.M. - Planning session with Mr. Dieter Urbanek at his office\n2:00 P.M. - Tour of the Traunfeld Congress Centre (main hall seats 750)\n4:30 P.M. - Walking tour of the surrounding conference district with a Traunfeld events coordinator\n\nTuesday, 13 May\n10:00 A.M. - Tour of Uhlmann Hall with facilities manager Ms. Lotte Reinhart, meeting rooms and catering areas only. The auditorium hosts orchestra rehearsals every morning and cannot be shown before 2:00 P.M.\n3:00 P.M. - Return to Uhlmann Hall to view the auditorium\n6:30 P.M. - Dinner with the Urbanek team\n\nWednesday, 14 May\n9:30 A.M. - Meeting at the Urbanek office to review cost estimates for both venues\n1:40 P.M. - Depart from Graz airport\n\nNote: Should Ms. Sturm's flight on 12 May be delayed, the Traunfeld tour will move to Wednesday morning, and the cost review will instead be held by video call after she returns."
        }
      ],
      "intro": "Questions 160-163 refer to the following itinerary.",
      "questions": [
        {
          "no": 160,
          "question": "What is suggested about the Traunfeld Congress Centre?",
          "choices": [
            {
              "label": "A",
              "text": "It is located inside Graz airport."
            },
            {
              "label": "B",
              "text": "It charges lower fees than Uhlmann Hall."
            },
            {
              "label": "C",
              "text": "It is operated by Urbanek Event Partners."
            },
            {
              "label": "D",
              "text": "It is large enough for the Trivena conference."
            }
          ],
          "answer": "D",
          "qType": "infer",
          "note": "会議は約600人の参加が見込まれ、Traunfeld Congress Centre の主ホールは750席と書かれているため、規模の点でこの会議を収容できると推測できる。Urbanek Event Partners は送迎や打ち合わせを担う手配会社で、会場を運営しているとは書かれていない。料金は水曜に両会場の見積もりを見比べる段階であり、どちらが安いかはまだ分からない。空港は到着と出発の場所として出てくるだけで、会場が空港の中にあるという記述はない。"
        },
        {
          "no": 161,
          "question": "The word \"draw\" in paragraph 1, line 2, is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "attract"
            },
            {
              "label": "B",
              "text": "select"
            },
            {
              "label": "C",
              "text": "extend"
            },
            {
              "label": "D",
              "text": "sketch"
            }
          ],
          "answer": "A",
          "qType": "synonym",
          "note": "ここでの draw は、会議が約600人の参加者を「集める・引き寄せる」見込みだという意味で使われており、attract が最も近い。sketch は絵や図を描くという意味の draw で、人数の話には合わない。select は選ぶ、extend は延ばすという意味で、いずれも参加見込みを述べるこの文には当てはまらない。"
        },
        {
          "no": 162,
          "question": "Why will Ms. Sturm visit Uhlmann Hall twice on 13 May?",
          "choices": [
            {
              "label": "A",
              "text": "A dinner will be held in its catering area."
            },
            {
              "label": "B",
              "text": "The venue is closed at midday."
            },
            {
              "label": "C",
              "text": "Part of the building cannot be viewed in the morning."
            },
            {
              "label": "D",
              "text": "Cost estimates must be collected in person."
            }
          ],
          "answer": "C",
          "qType": "detail",
          "note": "Uhlmann Hall の講堂は毎朝オーケストラのリハーサルに使われ、午後2時より前は見せられないと明記されている。そのため午前の回では会議室とケータリング設備だけを見学し、午後3時に講堂を見るために戻る。昼に会場が閉まるという記述はない。夕食は Urbanek のチームと取る予定で、この会場のケータリング設備で開くとは書かれていない。見積もりの確認は水曜に Urbanek の事務所で行う予定になっている。"
        },
        {
          "no": 163,
          "question": "What will most likely happen if Ms. Sturm's flight on 12 May is delayed?",
          "choices": [
            {
              "label": "A",
              "text": "Ms. Sturm will stay in Graz for an extra day."
            },
            {
              "label": "B",
              "text": "A discussion of costs will take place remotely."
            },
            {
              "label": "C",
              "text": "The dinner with the Urbanek team will be canceled."
            },
            {
              "label": "D",
              "text": "The user conference will be rescheduled."
            }
          ],
          "answer": "B",
          "qType": "infer",
          "note": "末尾の注記に、月曜の便が遅れた場合は Traunfeld の見学を水曜午前に回し、費用の確認は帰国後にビデオ通話で行うとある。つまり見積もりの検討は対面ではなく遠隔で行われることになる。動くのは出張中の予定であって、来年3月に開かれる会議そのものの日程ではない。火曜夜の夕食を取りやめるという記述はなく、滞在を1日延ばすという対応も注記には書かれていない。"
        }
      ],
      "range": "160-163"
    },
    {
      "no": 7,
      "kind": "single",
      "passageType": "e-mail",
      "passages": [
        {
          "heading": "E-mail",
          "body": "To: Callum Ritchie <c.ritchie@postmail.co.uk>\nFrom: Rowena Tait <bookings@ullswateropticians.co.uk>\nDate: 18 August\nSubject: Reminder service update\n\nDear Mr. Ritchie,\n\nFrom 1 September, Ullswater Opticians will send appointment reminders by text message rather than by post. Each reminder will arrive three days before your visit.\n\nYour eye examination on 12 September has been carried over to the new system automatically, so no action is needed to keep your booking. However, please sign in to our patient portal to confirm that the mobile number we hold for you is correct.\n\nPatients who prefer printed reminders can call our Aberdeen practice at 555-0147 to stay on the postal list.\n\nSincerely,\n\nRowena Tait\nPractice Manager, Ullswater Opticians"
        }
      ],
      "intro": "Questions 164-165 refer to the following e-mail.",
      "questions": [
        {
          "no": 164,
          "question": "What is one purpose of the e-mail?",
          "choices": [
            {
              "label": "A",
              "text": "To request payment for a recent visit"
            },
            {
              "label": "B",
              "text": "To confirm that an examination has been rescheduled"
            },
            {
              "label": "C",
              "text": "To describe a change to a reminder service"
            },
            {
              "label": "D",
              "text": "To announce a special offer on eyewear"
            }
          ],
          "answer": "C",
          "qType": "purpose",
          "note": "9月1日から予約のリマインダーを郵送からテキストメッセージに切り替えると知らせるのが本文の中心。9月12日の検査は新しい仕組みに自動で引き継がれるとあり、検査の日付そのものが変更されたわけではない。眼鏡やレンズの特売を案内する文はどこにもない。過去の来院分の支払いを求める文言も見当たらない。"
        },
        {
          "no": 165,
          "question": "What is indicated about patients who prefer printed reminders?",
          "choices": [
            {
              "label": "A",
              "text": "They must visit the practice in person."
            },
            {
              "label": "B",
              "text": "They will be charged a small monthly fee."
            },
            {
              "label": "C",
              "text": "They can stay on the postal list by telephoning."
            },
            {
              "label": "D",
              "text": "They will need to book appointments earlier."
            }
          ],
          "answer": "C",
          "qType": "infer",
          "note": "最終段落に、印刷されたリマインダーを希望する患者は Aberdeen の店舗に電話すれば郵送リストに残れるとある。手続きは電話一本で済み、店舗まで出向く必要があるとは書かれていない。郵送を続けることに料金がかかるという記述もない。予約を早めに取る必要があるという話も本文には出てこない。"
        }
      ],
      "range": "164-165"
    },
    {
      "no": 8,
      "kind": "single",
      "passageType": "web page",
      "passages": [
        {
          "body": "www.tunecroft-rentals.co.nz\n[ Home ] [ Instruments ] [ Rates ] [ FAQ ]\n\nTunecroft Instrument Rentals has supplied violins, cellos, and brass instruments to Wellington families since 2009. — [1] —. Our showroom on Tory Street is open six days a week. Renting lets a beginner try an instrument without the cost of buying one, and any plan can be cancelled with two weeks' notice.\n\nMonthly plans start at NZ$27 for a half-size violin. Every plan includes routine servicing at our workshop, and worn strings or valve oil are replaced at no charge during a service visit. — [2] —. An optional damage waiver can be added for NZ$4 per month; it covers accidental damage but not the loss of an instrument.\n\nStudents who outgrow their instruments may exchange them for the next size at no cost; this offer applies to string instruments only. — [3] —. Exchanges are handled at the showroom and take about twenty minutes. We also deliver rentals to our partner schools across Wellington every Tuesday.\n\nRenters who later decide to buy do not start from zero. Sixty percent of every monthly payment is recorded as a purchase credit on the renter's account. — [4] —. To check current availability, create a free account on the Instruments page."
        }
      ],
      "intro": "Questions 166-169 refer to the following web page.",
      "questions": [
        {
          "no": 166,
          "question": "What is included in every rental plan?",
          "choices": [
            {
              "label": "A",
              "text": "Home delivery"
            },
            {
              "label": "B",
              "text": "A damage waiver"
            },
            {
              "label": "C",
              "text": "Free size exchanges"
            },
            {
              "label": "D",
              "text": "Routine instrument servicing"
            }
          ],
          "answer": "D",
          "qType": "detail",
          "note": "料金の段落に、すべてのプランに工房での定期整備が含まれ、整備の際には傷んだ弦やバルブオイルを無償で交換するとある。配送は市内の提携校向けに毎週火曜だけ行うもので、自宅への配送が含まれるとは書かれていない。破損補償は月額NZ$4で追加する任意のオプションにすぎない。サイズ交換が無料なのは弦楽器に限られるため、全プラン共通の内容とは言えない。"
        },
        {
          "no": 167,
          "question": "What is suggested about Tunecroft Instrument Rentals?",
          "choices": [
            {
              "label": "A",
              "text": "It requires a one-year rental commitment."
            },
            {
              "label": "B",
              "text": "It works with local schools."
            },
            {
              "label": "C",
              "text": "It rents instruments to students only."
            },
            {
              "label": "D",
              "text": "It manufactures instruments in Wellington."
            }
          ],
          "answer": "B",
          "qType": "infer",
          "note": "提携している学校へ毎週火曜に楽器を届けるとあり、地元の学校と協力関係にあることがうかがえる。会社については2009年から楽器を「供給してきた」とあるだけで、Wellington で製造しているとは書かれていない。どのプランも2週間前の通知で解約できるため、1年間の契約義務があるという説明とは合わない。初心者や成長期の生徒への言及はあるものの、貸出先を学生に限るという記述はない。"
        },
        {
          "no": 168,
          "question": "What is indicated about the damage waiver?",
          "choices": [
            {
              "label": "A",
              "text": "It covers the loss of an instrument."
            },
            {
              "label": "B",
              "text": "It is required for brass instruments."
            },
            {
              "label": "C",
              "text": "It can be added only at sign-up."
            },
            {
              "label": "D",
              "text": "It is not part of the basic monthly rate."
            }
          ],
          "answer": "D",
          "qType": "infer",
          "note": "破損補償は月額NZ$4で「追加できる」任意のオプションと説明されており、基本の月額料金には含まれていないことが分かる。補償の対象は偶発的な破損で、楽器の紛失は対象外だと明記されている。金管楽器には必須という条件はどこにもない。加入できる時期を契約時だけに限るという記述もない。"
        },
        {
          "no": 169,
          "question": "In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong? \"Once it equals the instrument's list price, the item becomes the renter's property.\"",
          "choices": [
            {
              "label": "A",
              "text": "[4]"
            },
            {
              "label": "B",
              "text": "[1]"
            },
            {
              "label": "C",
              "text": "[3]"
            },
            {
              "label": "D",
              "text": "[2]"
            }
          ],
          "answer": "A",
          "qType": "insert",
          "note": "挿入文の it は、毎月の支払いの60パーセントが購入クレジットとして記録されるという直前の文を受けており、積み立てが定価に達した時点で楽器が借り手のものになるという流れは最終段落でだけ成立する。会社紹介の直後の位置では it の指す対象が存在しない。月額料金と整備の説明の後ろに置くと、月額や補償の額が定価に達するという意味になってしまい通らない。サイズ交換と配送の段落にも金額を積み立てる話はないため、購入クレジットの直後だけが自然につながる。"
        }
      ],
      "range": "166-169"
    },
    {
      "no": 9,
      "kind": "single",
      "passageType": "announcement",
      "passages": [
        {
          "heading": "Attention Renshaw Building Tenants and Staff",
          "body": "Beginning Monday, 3 November, both passenger elevators in the Renshaw Building will be modernized, one car at a time. Each car will be out of service for approximately three weeks, and waiting times are expected to increase during business hours.\n\nThe freight elevator will remain in operation throughout the project. However, it will be reserved for contractors' equipment each day until 11:00 A.M. Tenants expecting large deliveries should therefore schedule them for the afternoon.\n\nUpdates will be posted in the lobby every Friday. Questions may be directed to Ms. Meena Sundaram, Building Services Manager, at extension 240."
        }
      ],
      "intro": "Questions 170-171 refer to the following announcement.",
      "questions": [
        {
          "no": 170,
          "question": "What are tenants asked to do?",
          "choices": [
            {
              "label": "A",
              "text": "Reserve the freight elevator in advance"
            },
            {
              "label": "B",
              "text": "Use the stairs during business hours"
            },
            {
              "label": "C",
              "text": "Schedule large deliveries for the afternoon"
            },
            {
              "label": "D",
              "text": "Post their questions in the lobby"
            }
          ],
          "answer": "C",
          "qType": "detail",
          "note": "貨物用エレベーターは毎日午前11時まで業者の機材運搬のために確保されるので、大きな荷物の受け取りは午後に手配するよう求められている。階段の利用を促す文はない。貨物用エレベーターをテナントが予約するという仕組みの説明もない。ロビーは毎週金曜に進捗が掲示される場所であり、質問は内線240の Sundaram さんに宛てることになっている。"
        },
        {
          "no": 171,
          "question": "What is suggested about the Renshaw Building?",
          "choices": [
            {
              "label": "A",
              "text": "It has more than one passenger elevator."
            },
            {
              "label": "B",
              "text": "It will be closed during the project."
            },
            {
              "label": "C",
              "text": "Its entire project will last three weeks."
            },
            {
              "label": "D",
              "text": "Its freight elevator is being modernized."
            }
          ],
          "answer": "A",
          "qType": "infer",
          "note": "冒頭に「両方の客用エレベーターを1台ずつ改修する」とあり、客用エレベーターが複数あることが読み取れる。営業時間中の待ち時間が延びると述べているだけで、建物を閉鎖するという記述はない。貨物用エレベーターは工事の間も稼働を続ける側で、改修の対象ではない。3週間というのは1台あたりの停止期間であり、1台ずつ順に行う以上、工事全体が3週間で終わるとは言えない。"
        }
      ],
      "range": "170-171"
    },
    {
      "no": 10,
      "kind": "single",
      "passageType": "online chat discussion",
      "passages": [
        {
          "body": "Hana Tanaka (2:04 P.M.): Quick update on the retail trade show in Quebec City. The organizers have moved us from booth 218 to booth 310, right beside the main entrance.\n\nDiego Rojas (2:05 P.M.): Better foot traffic for us. One problem, though — our banner has the old booth number printed across the bottom.\n\nHana Tanaka (2:06 P.M.): Can we get it reprinted before the crate ships on Friday morning?\n\nMarcus Singh (2:08 P.M.): The print shop needs three business days. Today is Monday, so we are fine. I will send them the corrected file this afternoon.\n\nDiego Rojas (2:09 P.M.): One more thing. Only one of the two demo units passed inspection this morning, and repairs would take at least two weeks.\n\nHana Tanaka (2:10 P.M.): Then let's display the unit that passed and show the other model on the video screen instead.\n\nMarcus Singh (2:11 P.M.): Someone also needs to redo the staffing schedule. Ms. Rashidi will be away that entire week.\n\nDiego Rojas (2:12 P.M.): I'll take that one. I will ask Mr. Tovar to cover her shifts and post the revised schedule tomorrow.\n\nHana Tanaka (2:13 P.M.): Thanks. Marcus, please send me the banner proof before it goes to print."
        }
      ],
      "intro": "Questions 172-175 refer to the following online chat discussion.",
      "questions": [
        {
          "no": 172,
          "question": "Why does the banner need to be reprinted?",
          "choices": [
            {
              "label": "A",
              "text": "It misspells a product name."
            },
            {
              "label": "B",
              "text": "It was damaged in storage."
            },
            {
              "label": "C",
              "text": "It lists the wrong event dates."
            },
            {
              "label": "D",
              "text": "It shows an outdated booth number."
            }
          ],
          "answer": "D",
          "qType": "detail",
          "note": "冒頭で主催者がブースを218番から310番に変更したと知らされ、続いて Rojas さんが「バナーの下部に古いブース番号が印刷されている」と指摘している。作り直しの理由はこの番号の変更。保管中に傷んだという話は出ていない。会期の日付や製品名の誤りについての発言もない。"
        },
        {
          "no": 173,
          "question": "What is suggested about the demo units?",
          "choices": [
            {
              "label": "A",
              "text": "They will be shipped after the banner."
            },
            {
              "label": "B",
              "text": "Only one of them will be displayed at the booth."
            },
            {
              "label": "C",
              "text": "They were repaired earlier that day."
            },
            {
              "label": "D",
              "text": "Both of them failed a morning inspection."
            }
          ],
          "answer": "B",
          "qType": "infer",
          "note": "検査に通ったのは2台のうち1台だけで、修理には少なくとも2週間かかると Rojas さんが報告している。これを受けて Tanaka さんは、合格した1台を展示し、もう一方のモデルは映像で見せようと提案した。つまり会場に実物が並ぶのは1台だけになる。不合格だったのは1台であり、2台とも落ちたわけではない。出荷の順番についての発言はなく、その日のうちに修理されたという事実もない。"
        },
        {
          "no": 174,
          "question": "At 2:12 P.M., what does Mr. Rojas most likely mean when he writes, \"I'll take that one\"?",
          "choices": [
            {
              "label": "A",
              "text": "He will pick up the reprinted banner."
            },
            {
              "label": "B",
              "text": "He will transport a demo unit to the show."
            },
            {
              "label": "C",
              "text": "He will revise the staffing schedule."
            },
            {
              "label": "D",
              "text": "He will work Ms. Rashidi's shifts himself."
            }
          ],
          "answer": "C",
          "qType": "intent",
          "note": "直前で Singh さんが「誰かがシフト表を作り直す必要がある」と述べており、that one はその作業を指している。Rojas さんは引き受けると言った上で、Tovar さんに Rashidi さんの代役を頼み、改訂版を明日掲示すると続けている。実際にシフトに入るのは代役の Tovar さんで、Rojas さん本人が勤務するわけではない。デモ機の運搬やバナーの受け取りは、この発言の前後で話題になっていない。"
        },
        {
          "no": 175,
          "question": "What is indicated about Ms. Rashidi?",
          "choices": [
            {
              "label": "A",
              "text": "She inspected the demo units."
            },
            {
              "label": "B",
              "text": "She designed the original banner."
            },
            {
              "label": "C",
              "text": "She will attend the show remotely."
            },
            {
              "label": "D",
              "text": "She was scheduled to staff the booth."
            }
          ],
          "answer": "D",
          "qType": "infer",
          "note": "シフト表を作り直す理由として、Rashidi さんがその週ずっと不在になることが挙げられている。表の作り直しと代役の手配が必要になるのは、彼女が元の勤務予定に入っていたからだと推測できる。バナーを作った人については何も述べられていない。検査は午前中に行われたとあるだけで、誰が行ったかは書かれていない。遠隔で参加するという話も出ていない。"
        }
      ],
      "range": "172-175"
    }
  ],
  "part7multiple": [
    {
      "no": 1,
      "kind": "double",
      "passageType": "registration form and e-mail",
      "passages": [
        {
          "heading": "WESTBAY SAFETY TRAINING — Workplace First-Aid Certificate",
          "body": "Course date: Saturday, October 14, 9:00 A.M. to 4:00 P.M.\nVenue: Westbay Training Room, 210 Lakeshore Road, Kelowna\nFee: CAD 95 per person (CAD 80 for forms received by September 22)\n\nName: Danielle Voskamp\nEmployer: Zephyr Landscaping\nPosition: Crew supervisor\nLunch required: [X] Yes   [ ] No\nPayment: [ ] Card enclosed   [X] Invoice my employer\n\nCompleted forms may be posted to the address above or handed in at reception. Certificates are posted within ten days of the course. Places are limited to twelve.",
          "type": "form"
        },
        {
          "heading": "E-mail",
          "body": "To: d.voss@zephyrlandscaping.ca\nFrom: r.wexford@westbaysafety.ca\nDate: September 27\nSubject: October 14 course\n\nDear Ms. Voskamp,\n\nThank you for registering for our workplace first-aid course. Your form reached this office on September 25, and an invoice will be sent to Zephyr Landscaping this week.\n\nTwo points before the day. First, the course will now begin half an hour earlier than the time printed on the registration form, so please arrive by 8:20 A.M. Second, the afternoon is spent practising on floor mats, so wear clothing you can kneel in comfortably.\n\nWe look forward to seeing you.\n\nRobert Wexford\nCourse Coordinator, Westbay Safety Training"
        }
      ],
      "intro": "Questions 176-180 refer to the following registration form and e-mail.",
      "questions": [
        {
          "no": 176,
          "question": "What is indicated about the first-aid course?",
          "choices": [
            {
              "label": "A",
              "text": "It is free for supervisors."
            },
            {
              "label": "B",
              "text": "It is offered twice a year."
            },
            {
              "label": "C",
              "text": "It includes an online examination."
            },
            {
              "label": "D",
              "text": "The number of places is limited."
            }
          ],
          "answer": "D",
          "crossRef": false,
          "qType": "infer",
          "note": "登録フォームの末尾に、受講枠は12名までと明記されており、参加人数に上限があると分かる。年2回の開催や監督者は無料といった記述はどこにもない。オンライン試験についても触れられておらず、修了証は受講後10日以内に郵送されるとあるだけである。"
        },
        {
          "no": 177,
          "question": "How will Ms. Voskamp pay for the course?",
          "choices": [
            {
              "label": "A",
              "text": "She enclosed a card payment."
            },
            {
              "label": "B",
              "text": "She will pay in cash on the day."
            },
            {
              "label": "C",
              "text": "Her employer will receive an invoice."
            },
            {
              "label": "D",
              "text": "The fee will be deducted from her wages."
            }
          ],
          "answer": "C",
          "crossRef": false,
          "qType": "detail",
          "note": "フォームの支払い欄では、カード同封ではなく勤務先への請求に印が付いている。Eメールでも今週中に Zephyr Landscaping へ請求書を送ると述べており、雇用主宛ての請求で支払われることが確認できる。当日の現金払いへの言及はなく、給与からの天引きという記述もない。"
        },
        {
          "no": 178,
          "question": "How much will Ms. Voskamp most likely be charged?",
          "choices": [
            {
              "label": "A",
              "text": "CAD 15"
            },
            {
              "label": "B",
              "text": "CAD 80"
            },
            {
              "label": "C",
              "text": "CAD 175"
            },
            {
              "label": "D",
              "text": "CAD 95"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "qType": "infer",
          "note": "登録フォームには、9月22日までに到着した申込は80カナダドル、それ以外は95カナダドルとある。一方Eメールには、フォームが事務所に届いたのは9月25日と書かれている。フォームの割引条件とメールの受領日を突き合わせると期限を過ぎているため、通常料金の95カナダドルが請求される。80は割引料金、15は二つの料金の差額、175は二つの料金を足しただけの数字で、いずれも当てはまらない。"
        },
        {
          "no": 179,
          "question": "What time will the course begin?",
          "choices": [
            {
              "label": "A",
              "text": "At 9:30 A.M."
            },
            {
              "label": "B",
              "text": "At 8:30 A.M."
            },
            {
              "label": "C",
              "text": "At 9:00 A.M."
            },
            {
              "label": "D",
              "text": "At 8:20 A.M."
            }
          ],
          "answer": "B",
          "crossRef": true,
          "qType": "detail",
          "note": "Eメールは、フォームに印刷された時刻より30分早く始めると告げているだけで、時刻そのものは書いていない。登録フォームの開始時刻が午前9時なので、二つの文書を合わせると実際の開始は8時30分だと分かる。8時20分はメールで求められている到着時刻であって開始時刻ではない。9時はフォーム上の変更前の時刻。9時30分はどちらの文書にもない。"
        },
        {
          "no": 180,
          "question": "What is Ms. Voskamp advised to do?",
          "choices": [
            {
              "label": "A",
              "text": "Post her certificate to the office"
            },
            {
              "label": "B",
              "text": "Wear clothing suitable for kneeling"
            },
            {
              "label": "C",
              "text": "Arrive together with her employer"
            },
            {
              "label": "D",
              "text": "Bring her own lunch"
            }
          ],
          "answer": "B",
          "crossRef": false,
          "qType": "detail",
          "note": "メールの後半で、午後は床のマットの上で実技を行うため、ひざをつける服装で来るよう勧めている。昼食はフォームで希望に印を付けてあるので持参の必要はない。修了証は主催者側が郵送するものであって、本人が送るのではない。雇用主と一緒に来るようにという指示もどこにもない。"
        }
      ],
      "range": "176-180"
    },
    {
      "no": 2,
      "kind": "double",
      "passageType": "article and letter",
      "passages": [
        {
          "heading": "The Wharfside Courier",
          "body": "YORK (3 June)—The riverside footpath through the Wharfside district will close for resurfacing from June 16 until early August, the city council confirmed this week.\n\nWhile the path is shut, shops along it can be reached only from Bridge Road. Two support measures accompany the works. Businesses that remain open throughout may request a directional sign on Bridge Road at no cost; signs will stay in place until the end of September to help customers return. In addition, any business able to show, through till records, that its takings fell by more than 20 percent during the works may apply for a one-off grant of GBP 500.\n\n\"The path serves thousands of walkers a week, and we want its traders still there when it reopens,\" said Councillor Dana Yaxley. Applications close on September 30."
        },
        {
          "heading": "Letter",
          "body": "August 12\n\nWharfside Works Team\nCity Council Offices\n\nDear Works Team,\n\nI own Verity Kitchenware, which has traded on the riverside footpath for nine years. We stayed open our usual six days a week during the resurfacing, but with the path closed, our takings fell by roughly a third compared with last summer. I have kept the till records for the whole period.\n\nPlease send me the application form mentioned in the Wharfside Courier, and let me know what proof you need beyond the till records themselves.\n\nYours faithfully,\n\nNadia Vella\nOwner, Verity Kitchenware"
        }
      ],
      "intro": "Questions 181-185 refer to the following article and letter.",
      "questions": [
        {
          "no": 181,
          "question": "What is one purpose of the article?",
          "choices": [
            {
              "label": "A",
              "text": "To report the completion of a project"
            },
            {
              "label": "B",
              "text": "To profile a local business owner"
            },
            {
              "label": "C",
              "text": "To announce work on a footpath"
            },
            {
              "label": "D",
              "text": "To encourage donations to a fund"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "qType": "purpose",
          "note": "冒頭の段落で、川沿いの遊歩道が6月16日から8月上旬まで舗装工事のため閉鎖されると伝えており、工事の告知が記事の主目的だと分かる。工事はこれから始まるものなので完了の報告ではない。店主ひとりを取り上げた人物紹介でもなく、寄付を募る文言もない。"
        },
        {
          "no": 182,
          "question": "In the article, the word \"grant\" in paragraph 2 is closest in meaning to",
          "choices": [
            {
              "label": "A",
              "text": "permission"
            },
            {
              "label": "B",
              "text": "growth"
            },
            {
              "label": "C",
              "text": "promise"
            },
            {
              "label": "D",
              "text": "payment"
            }
          ],
          "answer": "D",
          "crossRef": false,
          "qType": "synonym",
          "note": "ここでの grant は、売上の減少を証明できた事業者に支払われる500ポンドの一時金を指すので、金銭の支給という意味の payment が最も近い。permission は動詞 grant の「許可する」という意味に引きずられた誤り。promise や growth では、具体的な金額を伴うこの文の内容に合わない。"
        },
        {
          "no": 183,
          "question": "How long has Verity Kitchenware traded on the footpath?",
          "choices": [
            {
              "label": "A",
              "text": "Three years"
            },
            {
              "label": "B",
              "text": "Twenty years"
            },
            {
              "label": "C",
              "text": "Six years"
            },
            {
              "label": "D",
              "text": "Nine years"
            }
          ],
          "answer": "D",
          "crossRef": false,
          "qType": "detail",
          "note": "手紙の書き出しで、遊歩道で9年間商売をしてきたと述べている。6は週あたりの営業日数、20は補助金の条件となる売上の減少率、3は「およそ3分の1減った」という減少幅に出てくる数字で、いずれも営業年数とは関係がない。"
        },
        {
          "no": 184,
          "question": "What is suggested about Verity Kitchenware?",
          "choices": [
            {
              "label": "A",
              "text": "It moved temporarily to Bridge Road."
            },
            {
              "label": "B",
              "text": "It is the oldest shop in the district."
            },
            {
              "label": "C",
              "text": "It meets the conditions for the council grant."
            },
            {
              "label": "D",
              "text": "It closed for part of the summer."
            }
          ],
          "answer": "C",
          "crossRef": true,
          "qType": "infer",
          "note": "記事によると、レジ記録で売上が2割を超えて落ちたことを示せた事業者は500ポンドの一時金を申請できる。手紙で Vella さんは、閉鎖中に売上が前年のおよそ3分の1減り、期間全体のレジ記録も保管していると書いている。記事の制度の条件と手紙の申告内容を重ねて初めて、支給の条件を満たすと判断できる。店は週6日開け続けたので一部休業したわけではなく、移転した事実も、地区で最も古い店だという記述もない。"
        },
        {
          "no": 185,
          "question": "What will Ms. Vella most likely be able to request?",
          "choices": [
            {
              "label": "A",
              "text": "A meeting with Councillor Yaxley"
            },
            {
              "label": "B",
              "text": "An extension of the works deadline"
            },
            {
              "label": "C",
              "text": "A refund of business rates"
            },
            {
              "label": "D",
              "text": "A temporary sign on Bridge Road"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "qType": "infer",
          "note": "記事には、工事期間中も営業を続けた店は Bridge Road に臨時の案内看板を無料で出してもらえるとある。手紙では、いつもどおり週6日の営業を続けたと述べているので、記事の条件と手紙の記述を合わせると、この看板を頼めるはずだと分かる。税金の払い戻しや工期の延長は記事に制度として存在せず、議員との面会を求める文言も手紙にはない。"
        }
      ],
      "range": "181-185"
    },
    {
      "no": 3,
      "kind": "triple",
      "passageType": "web page, coupon, and e-mail",
      "passages": [
        {
          "heading": "www.verdellaplantcare.com.au/plans   |   Home   |   Plans   |   Gift cards   |   Contact",
          "body": "VERDELLA PLANT CARE — GEELONG\nWe keep the plants in your home or studio healthy so you do not have to.\n\n| Plan | Visits | Included | Per month |\n| Leaf | One visit a month | Watering check, feeding | AUD 35 |\n| Fern | Every two weeks | Leaf plan care plus pruning | AUD 55 |\n| Canopy | Every week | Fern plan care plus pest control | AUD 89 |\n\nAll plans cover up to fifteen plants at one address; larger collections receive a separate quote. Visits take place on weekdays, and the same carer comes each time. Plans run month to month and can be paused for holidays with a week's notice.",
          "type": "form"
        },
        {
          "heading": "COUPON",
          "body": "VERDELLA PLANT CARE — WELCOME OFFER\n\nAUD 15 off your first month\n\nValid for new customers joining the Fern or Canopy plan before August 31. Not valid for the Leaf plan, gift cards, or collections quoted separately. One coupon per address. Mention code WELCOME15 when booking.\n\nVerdella Plant Care, Geelong — bookings: 03 555 0164"
        },
        {
          "heading": "E-mail",
          "body": "To: bookings@verdellaplantcare.com.au\nFrom: a.yuen@zinniadesign.com.au\nDate: August 19\nSubject: Plant care for a studio\n\nHello,\n\nI run a small design studio with twelve houseplants, and they are suffering now that we are busy. The studio gets strong afternoon sun, so the pots dry out within a few days, and lately I have noticed tiny insects around several of the plants. Realistically they need attention every week.\n\nWe have never used a plant service before. A client passed me one of your welcome coupons, so I would like to use it when I book.\n\nCould you confirm which plan fits us and when visits could start?\n\nAmy Yuen\nZinnia Design Studio"
        }
      ],
      "intro": "Questions 186-190 refer to the following web page, coupon, and e-mail.",
      "questions": [
        {
          "no": 186,
          "question": "What is indicated about Verdella Plant Care?",
          "choices": [
            {
              "label": "A",
              "text": "It operates seven days a week."
            },
            {
              "label": "B",
              "text": "It sends the same carer to each visit."
            },
            {
              "label": "C",
              "text": "It supplies replacement plants."
            },
            {
              "label": "D",
              "text": "It requires a twelve-month contract."
            }
          ],
          "answer": "B",
          "crossRef": false,
          "qType": "infer",
          "note": "Webページの下部に、毎回同じ担当者が訪問すると書かれている。訪問は平日に限られるので週7日の営業ではない。プランは月ごとの更新で、12か月の契約に縛られるという記述はない。枯れた植物を交換したり新しい株を補充したりするという内容もどこにもない。"
        },
        {
          "no": 187,
          "question": "According to the Web page, what is true of every plan?",
          "choices": [
            {
              "label": "A",
              "text": "It requires a separate quote."
            },
            {
              "label": "B",
              "text": "It covers up to fifteen plants."
            },
            {
              "label": "C",
              "text": "It includes pest control."
            },
            {
              "label": "D",
              "text": "It includes pruning."
            }
          ],
          "answer": "B",
          "crossRef": false,
          "qType": "detail",
          "note": "料金表のすぐ下に、どのプランも1住所につき15鉢までを対象とし、それを超える場合は別見積もりになるとある。害虫対策は毎週訪問のプランだけ、剪定は隔週以上のプランだけに含まれる内容で、全プランに共通するのは対象となる鉢数の上限である。別見積もりが必要になるのは15鉢を超える場合に限られる。"
        },
        {
          "no": 188,
          "question": "Which plan will Ms. Yuen most likely need?",
          "choices": [
            {
              "label": "A",
              "text": "The Canopy plan"
            },
            {
              "label": "B",
              "text": "The Fern plan"
            },
            {
              "label": "C",
              "text": "The Leaf plan"
            },
            {
              "label": "D",
              "text": "A separately quoted plan"
            }
          ],
          "answer": "A",
          "crossRef": true,
          "qType": "infer",
          "note": "Eメールで Yuen さんは、鉢が数日で乾くため現実的には毎週の手入れが必要だと述べ、さらに小さな虫が出ていることも書いている。Webページのプラン表で、毎週の訪問と害虫対策の両方を含むのは Canopy だけなので、メールの状況説明と表の内容を突き合わせて初めてプランが特定できる。植物は12鉢で15鉢の枠に収まるため、別見積もりの対象にはならない。"
        },
        {
          "no": 189,
          "question": "How much will Ms. Yuen most likely pay for her first month?",
          "choices": [
            {
              "label": "A",
              "text": "AUD 89"
            },
            {
              "label": "B",
              "text": "AUD 74"
            },
            {
              "label": "C",
              "text": "AUD 40"
            },
            {
              "label": "D",
              "text": "AUD 55"
            }
          ],
          "answer": "B",
          "crossRef": true,
          "qType": "detail",
          "note": "Webページでは毎週訪問のプランが月89豪ドル。クーポンは、8月31日までに隔週か毎週のプランへ新規加入する客の初月を15豪ドル引きにする。Eメールによれば Yuen さんは初めての利用で、8月19日の時点で毎週の訪問を望んでいるから条件をすべて満たし、初月は89から15を引いた74豪ドルになる。Webページの料金、クーポンの割引条件、メールの希望の三つを合わせないと計算できない。55は隔週プランの月額、40はそこから割り引いた額で、どちらも毎週という希望に合わない。"
        },
        {
          "no": 190,
          "question": "What problem does Ms. Yuen mention in the e-mail?",
          "choices": [
            {
              "label": "A",
              "text": "Her watering system has broken."
            },
            {
              "label": "B",
              "text": "Her plants have outgrown their pots."
            },
            {
              "label": "C",
              "text": "Her studio receives too little light."
            },
            {
              "label": "D",
              "text": "Insects have appeared around her plants."
            }
          ],
          "answer": "D",
          "crossRef": false,
          "qType": "detail",
          "note": "メールの中ほどで、最近いくつかの鉢のまわりに小さな虫がいるのに気づいたと述べている。日差しについてはむしろ午後の強い日が当たって鉢が乾くと書いているので、光が足りないという内容は逆である。鉢が小さくなったことや、水やりの装置が壊れたことには触れていない。"
        }
      ],
      "range": "186-190"
    },
    {
      "no": 4,
      "kind": "triple",
      "passageType": "notice, sign-up sheet, and e-mail",
      "passages": [
        {
          "heading": "NOTICE",
          "body": "WHAKATERE COMMUNITY HALL, ROTORUA\nRepair Café — Saturday, November 9, 10:00 A.M. to 2:00 P.M.\n\nVisitors bring broken household items, and volunteers repair them free of charge while the owner watches and learns. Our November café needs volunteers in four areas: small electrical items, garden tools, toys, and jewellery.\n\nVolunteers work either the morning shift (10:00 to 12:00) or the afternoon shift (12:00 to 2:00) and should write their names on the sheet in the hall foyer. Anyone offering to repair electrical items must hold a current electrical licence and show it on the day. The volunteer taking the toy table is asked to bring a box of spare batteries, as most toy repairs turn out to need them.\n\nQuestions: Hana Womack, event organiser"
        },
        {
          "heading": "Volunteer Sign-Up Sheet — Repair Café, November 9",
          "body": "Please print your name and tick one shift.\n\n| Name | Repair area | Morning | Afternoon |\n| W. Zhang | Toys | [X] | [ ] |\n| P. Vercoe | Small electrical items | [ ] | [X] |\n| T. Waititi | Garden tools | [X] | [ ] |\n| M. Yandell | Jewellery | [ ] | [X] |\n\nSheet collected by the organiser on November 4.",
          "type": "form"
        },
        {
          "heading": "E-mail",
          "body": "To: Repair Café volunteers\nFrom: h.womack@whakaterehall.org.nz\nDate: November 6\nSubject: Saturday arrangements\n\nHello everyone,\n\nThank you for signing up — all four tables now have a volunteer. The hall opens at 9:30 A.M. on Saturday so that tables can be set up before visitors arrive.\n\nTools and spare materials are provided, apart from the items individual volunteers were asked to bring. Tea and coffee will be available all day, and the hall hire has been covered by a community grant, so the café costs visitors nothing.\n\nIf your plans change before Saturday, please ring me on 07 555 0142 rather than e-mailing.\n\nHana Womack"
        }
      ],
      "intro": "Questions 191-195 refer to the following notice, sign-up sheet, and e-mail.",
      "questions": [
        {
          "no": 191,
          "question": "What is one purpose of the notice?",
          "choices": [
            {
              "label": "A",
              "text": "To ask residents to donate broken items"
            },
            {
              "label": "B",
              "text": "To announce a change of venue"
            },
            {
              "label": "C",
              "text": "To advertise the opening of a repair shop"
            },
            {
              "label": "D",
              "text": "To recruit volunteers for an event"
            }
          ],
          "answer": "D",
          "crossRef": false,
          "qType": "purpose",
          "note": "掲示は、11月のリペアカフェに向けて電気製品・園芸道具・おもちゃ・アクセサリーの4部門で修理ボランティアを募り、ロビーの用紙に記名するよう呼びかけている。壊れた品物は来場者が持ち込んで直してもらうものであって、寄付を募っているのではない。会場変更の知らせでもなく、営利の修理店の開店広告でもない。"
        },
        {
          "no": 192,
          "question": "What is suggested about P. Vercoe?",
          "choices": [
            {
              "label": "A",
              "text": "P. Vercoe holds an electrical licence."
            },
            {
              "label": "B",
              "text": "P. Vercoe will work the morning shift."
            },
            {
              "label": "C",
              "text": "P. Vercoe organised the event."
            },
            {
              "label": "D",
              "text": "P. Vercoe repaired items at a previous café."
            }
          ],
          "answer": "A",
          "crossRef": true,
          "qType": "infer",
          "note": "掲示には、電気製品の修理を申し出る人は有効な電気工事の資格を持ち、当日提示しなければならないとある。記名用紙を見ると、電気製品の欄に名前があるのは Vercoe さんだけである。掲示の参加条件と用紙の記載を合わせることで、この人は資格を持っているはずだと推測できる。シフトの印は午後に付いていて午前ではない。主催者は Womack さんであり、過去のカフェに参加したという情報はどの文書にもない。"
        },
        {
          "no": 193,
          "question": "What repair area is NOT listed on the sign-up sheet?",
          "choices": [
            {
              "label": "A",
              "text": "Clothing"
            },
            {
              "label": "B",
              "text": "Jewellery"
            },
            {
              "label": "C",
              "text": "Toys"
            },
            {
              "label": "D",
              "text": "Garden tools"
            }
          ],
          "answer": "A",
          "crossRef": false,
          "qType": "not",
          "note": "記名用紙に並ぶ部門は、おもちゃ・小型電気製品・園芸道具・アクセサリーの四つである。衣類の直しは掲示の募集部門にも用紙にも含まれておらず、これが載っていない部門にあたる。残りの三つはすべて表の中に実際に書かれている項目である。"
        },
        {
          "no": 194,
          "question": "Who will most likely bring batteries on November 9?",
          "choices": [
            {
              "label": "A",
              "text": "M. Yandell"
            },
            {
              "label": "B",
              "text": "P. Vercoe"
            },
            {
              "label": "C",
              "text": "W. Zhang"
            },
            {
              "label": "D",
              "text": "T. Waititi"
            }
          ],
          "answer": "C",
          "crossRef": true,
          "qType": "person",
          "note": "掲示の後半に、おもちゃの修理台を受け持つボランティアは予備の電池をひと箱持参してほしいとある。ただし誰がその台を担当するかは掲示だけでは分からず、記名用紙でおもちゃの欄に名前を書いた Zhang さんだと特定できる。掲示の依頼内容と用紙の担当欄を突き合わせて初めて答えが決まる。ほかの3人はそれぞれ電気製品、園芸道具、アクセサリーの担当である。"
        },
        {
          "no": 195,
          "question": "According to the e-mail, what should volunteers do if their plans change?",
          "choices": [
            {
              "label": "A",
              "text": "Telephone Ms. Womack"
            },
            {
              "label": "B",
              "text": "Find their own replacement"
            },
            {
              "label": "C",
              "text": "Send an e-mail to the hall"
            },
            {
              "label": "D",
              "text": "Write a note on the sign-up sheet"
            }
          ],
          "answer": "A",
          "crossRef": false,
          "qType": "detail",
          "note": "メールの結びで、土曜日までに予定が変わった場合はメールではなく電話をかけてほしいと頼んでおり、番号も添えられている。メールでの連絡はしないよう明示されているので逆の内容になる。用紙に書き込むことや、自分で代わりの人を探すことを求める記述はどこにもない。"
        }
      ],
      "range": "191-195"
    },
    {
      "no": 5,
      "kind": "triple",
      "passageType": "advertisement, quotation, and e-mail",
      "passages": [
        {
          "heading": "ZORIC SIGNS — SPLIT",
          "body": "Shop fronts, vehicle lettering, and window graphics for businesses across the Split area since 2004.\n\nEvery job starts with a free measuring visit, and every quotation is prepared within three working days of that visit. Our aluminium and acrylic letters are made in our own workshop, fitted by our own crew, and guaranteed for three years.\n\nSpring is our busiest period, and fitting dates are filling quickly. If your work must be finished before the tourist season, reserve a date early rather than waiting for the summer rush.\n\nZoric Signs, 14 Marina Road, Split\nCall 021 555 0190 or write to info@zoricsigns.hr"
        },
        {
          "heading": "ZORIC SIGNS — Quotation No. 2148",
          "body": "Prepared for: Lana Vukas, Vidra Kayak Tours\nDate: June 5 — valid for 30 days\n\n| Item | Price |\n| Fascia sign, 4 m, acrylic letters | EUR 620 |\n| Window graphics, two windows | EUR 180 (EUR 90 per window) |\n| Lettering for one van | EUR 240 |\n| Fitting, all items | EUR 110 |\n| Total | EUR 1,150 |\n\nPrices include materials and our three-year guarantee.",
          "type": "form"
        },
        {
          "heading": "E-mail",
          "body": "To: info@zoricsigns.hr\nFrom: l.vukas@vidrakayak.hr\nDate: June 9\nSubject: Quotation No. 2148\n\nDear Zoric Signs,\n\nThank you for the quotation, and for coming out to measure our shop last week.\n\nWe would like to go ahead, with one change: our landlord will not approve graphics on the corner window, so please prepare graphics for one window only and adjust the total accordingly. Everything else can stay as quoted.\n\nOur season opens on July 1, and the booking desk cannot close once it does. Could all fitting be completed by June 27?\n\nPlease confirm the revised amount and a fitting date.\n\nBest regards,\n\nLana Vukas\nVidra Kayak Tours"
        }
      ],
      "intro": "Questions 196-200 refer to the following advertisement, quotation, and e-mail.",
      "questions": [
        {
          "no": 196,
          "question": "What is one purpose of the advertisement?",
          "choices": [
            {
              "label": "A",
              "text": "To recruit staff for a workshop"
            },
            {
              "label": "B",
              "text": "To announce new opening hours"
            },
            {
              "label": "C",
              "text": "To promote a sign maker's services"
            },
            {
              "label": "D",
              "text": "To advertise a seasonal sale"
            }
          ],
          "answer": "C",
          "crossRef": false,
          "qType": "purpose",
          "note": "店舗正面の看板、車両の文字入れ、窓のグラフィックを2004年から手がけていると述べ、繁忙期を前に早めの予約を促しているので、看板業者が自社の仕事を売り込む広告だと分かる。営業時間の変更や住所の告知が主題ではなく、工房の求人や値引きセールの文言もどこにもない。"
        },
        {
          "no": 197,
          "question": "What is suggested about the measuring visit to Vidra Kayak Tours?",
          "choices": [
            {
              "label": "A",
              "text": "It lasted three days."
            },
            {
              "label": "B",
              "text": "It took place after the quotation was sent."
            },
            {
              "label": "C",
              "text": "It was carried out free of charge."
            },
            {
              "label": "D",
              "text": "It was arranged by the landlord."
            }
          ],
          "answer": "C",
          "crossRef": true,
          "qType": "infer",
          "note": "広告には、どの仕事も無料の採寸訪問から始まると書かれている。Eメールで Vukas さんは、先週店の採寸に来てくれたことへの礼を述べている。広告の方針とメールの事実を重ねると、この訪問は無償で行われたと分かる。見積書は訪問の後に作られるものなので、訪問が見積送付の後だという順序は逆である。3日というのは訪問から見積書を用意するまでの日数であって、訪問の長さではない。大家は窓の許可に関わるだけで、訪問を手配してはいない。"
        },
        {
          "no": 198,
          "question": "According to the quotation, what do the prices include?",
          "choices": [
            {
              "label": "A",
              "text": "A design consultation"
            },
            {
              "label": "B",
              "text": "Materials and a three-year guarantee"
            },
            {
              "label": "C",
              "text": "Repainting of the company van"
            },
            {
              "label": "D",
              "text": "An annual cleaning service"
            }
          ],
          "answer": "B",
          "crossRef": false,
          "qType": "detail",
          "note": "見積書の最終行に、価格には材料費と3年間の保証が含まれると明記されている。年1回の清掃、デザインの相談、車両の塗り直しは、いずれも見積書のどこにも書かれていない。バンに行うのは文字入れであって再塗装ではない。"
        },
        {
          "no": 199,
          "question": "How much will Vidra Kayak Tours most likely pay?",
          "choices": [
            {
              "label": "A",
              "text": "EUR 240"
            },
            {
              "label": "B",
              "text": "EUR 970"
            },
            {
              "label": "C",
              "text": "EUR 1,150"
            },
            {
              "label": "D",
              "text": "EUR 1,060"
            }
          ],
          "answer": "D",
          "crossRef": true,
          "qType": "detail",
          "note": "見積書の合計は1,150ユーロで、窓のグラフィックは2面で180ユーロ、1面あたり90ユーロという内訳が示されている。Eメールでは、角の窓は大家の許可が下りないため1面だけにしてほしいと頼んでいる。見積書の単価とメールの変更内容を合わせると、90ユーロを差し引いた1,060ユーロが新しい支払額になる。970は窓を2面とも取りやめた場合の額、240はバンの文字入れ単体の価格、1,150は変更前の合計である。"
        },
        {
          "no": 200,
          "question": "What does Ms. Vukas ask Zoric Signs to do?",
          "choices": [
            {
              "label": "A",
              "text": "Finish the fitting before a certain date"
            },
            {
              "label": "B",
              "text": "Contact her landlord directly"
            },
            {
              "label": "C",
              "text": "Reduce the price of the van lettering"
            },
            {
              "label": "D",
              "text": "Visit the shop a second time"
            }
          ],
          "answer": "A",
          "crossRef": false,
          "qType": "detail",
          "note": "メールの後半で、シーズンが7月1日に始まると受付を閉められなくなるため、取り付けをすべて6月27日までに終えられないかと尋ねている。期日までの作業完了の依頼が中心である。2度目の訪問は求めておらず、大家のことは自分たちの事情として触れているだけで連絡は頼んでいない。バンの文字入れの値下げを求める記述もない。"
        }
      ],
      "range": "196-200"
    }
  ],
  "answerKey": [
    {
      "no": 101,
      "answer": "C",
      "tag": "品詞"
    },
    {
      "no": 102,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 103,
      "answer": "B",
      "tag": "前置詞"
    },
    {
      "no": 104,
      "answer": "D",
      "tag": "代名詞・限定詞"
    },
    {
      "no": 105,
      "answer": "B",
      "tag": "動詞形"
    },
    {
      "no": 106,
      "answer": "D",
      "tag": "語彙"
    },
    {
      "no": 107,
      "answer": "B",
      "tag": "品詞"
    },
    {
      "no": 108,
      "answer": "A",
      "tag": "接続詞"
    },
    {
      "no": 109,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 110,
      "answer": "B",
      "tag": "前置詞"
    },
    {
      "no": 111,
      "answer": "C",
      "tag": "動詞形"
    },
    {
      "no": 112,
      "answer": "B",
      "tag": "品詞"
    },
    {
      "no": 113,
      "answer": "D",
      "tag": "語彙"
    },
    {
      "no": 114,
      "answer": "B",
      "tag": "前置詞"
    },
    {
      "no": 115,
      "answer": "A",
      "tag": "代名詞・限定詞"
    },
    {
      "no": 116,
      "answer": "C",
      "tag": "語彙"
    },
    {
      "no": 117,
      "answer": "B",
      "tag": "品詞"
    },
    {
      "no": 118,
      "answer": "C",
      "tag": "動詞形"
    },
    {
      "no": 119,
      "answer": "D",
      "tag": "語彙"
    },
    {
      "no": 120,
      "answer": "D",
      "tag": "前置詞"
    },
    {
      "no": 121,
      "answer": "C",
      "tag": "品詞"
    },
    {
      "no": 122,
      "answer": "B",
      "tag": "接続詞"
    },
    {
      "no": 123,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 124,
      "answer": "D",
      "tag": "品詞"
    },
    {
      "no": 125,
      "answer": "C",
      "tag": "関係詞"
    },
    {
      "no": 126,
      "answer": "D",
      "tag": "語彙"
    },
    {
      "no": 127,
      "answer": "A",
      "tag": "前置詞"
    },
    {
      "no": 128,
      "answer": "C",
      "tag": "動詞形"
    },
    {
      "no": 129,
      "answer": "B",
      "tag": "品詞"
    },
    {
      "no": 130,
      "answer": "A",
      "tag": "語彙"
    },
    {
      "no": 131,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 132,
      "answer": "B",
      "tag": "Part6"
    },
    {
      "no": 133,
      "answer": "C",
      "tag": "Part6"
    },
    {
      "no": 134,
      "answer": "C",
      "tag": "Part6"
    },
    {
      "no": 135,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 136,
      "answer": "B",
      "tag": "Part6"
    },
    {
      "no": 137,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 138,
      "answer": "B",
      "tag": "Part6"
    },
    {
      "no": 139,
      "answer": "A",
      "tag": "Part6"
    },
    {
      "no": 140,
      "answer": "C",
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
      "answer": "C",
      "tag": "Part6"
    },
    {
      "no": 146,
      "answer": "D",
      "tag": "Part6"
    },
    {
      "no": 147,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 148,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 149,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 150,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 151,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 152,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 153,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 154,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 155,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 156,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 157,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 158,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 159,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 160,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 161,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 162,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 163,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 164,
      "answer": "C",
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
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 168,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 169,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 170,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 171,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 172,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 173,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 174,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 175,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 176,
      "answer": "D",
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
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 180,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 181,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 182,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 183,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 184,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 185,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 186,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 187,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 188,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 189,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 190,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 191,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 192,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 193,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 194,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 195,
      "answer": "A",
      "tag": "Part7"
    },
    {
      "no": 196,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 197,
      "answer": "C",
      "tag": "Part7"
    },
    {
      "no": 198,
      "answer": "B",
      "tag": "Part7"
    },
    {
      "no": 199,
      "answer": "D",
      "tag": "Part7"
    },
    {
      "no": 200,
      "answer": "A",
      "tag": "Part7"
    }
  ]
};

export default TOEIC_TEST_07;
