/**
 * The Tonio Times — CLIP EDITION (号外・試作)
 *
 * 2026-09-25 の JRE Clips (Jim Lampley) と interview (Ollie Bearman) を、
 * 「話題を掘る」ではなく「クリップの中身そのもの」を記事にした号外。
 *
 * ■ なぜ別枠か
 * /english/podcast は1本10表現で、15分のクリップから拾える口語の大半が落ちる
 * (fulcrum / never to their benefit / tank your life ...)。紙面は全文に注釈 (glosses) が付くので、
 * クリップの中身を記事に起こせば「全部の文を解説し、全部の表現を拾う」ことができる。
 *
 * ■ 書き方
 *   - lead = JRE クリップ、rail = interview。2本見出し。
 *   - 逐語の書き起こしは載せない。記事は自分の文で再構成し、口語表現は短い引用として入れる。
 *     話者が字幕から確定できない発言は、誰の発言か断定しない。
 *   - クリップ内の事実の誤り (年代のずれなど) は記事の中で指摘する。
 *   - picks は網羅。kind を必ず書く: 'word' → Words (/api/user-words)、'phrase' → Phrases (/api/phrases)。
 */
import type { NewspaperEdition } from './newspaper';
import { CLIP_0925_GLOSSES } from './newspaper-clip-glosses';
import { CLIP_0925_VOICES, CLIP_0925_STORY } from './newspaper-clip-glosses-town';

export const CLIP_EDITIONS: NewspaperEdition[] = [
    {
        id: 'clip-2026-09-25',
        date: '2026-09-25',
        editionNo: 0,
        extra: true,
        mastheadTitle: 'The Tonio Times',
        mastheadTagline: 'THE CLIP DESK — everything that was said, and every phrase worth keeping',
        mastheadKicker: '号外 · CLIP EDITION · 9/25',
        weekdayLong: 'Friday, September 25, 2026',
        motto: 'NE QUID NIMIS — "Nothing in excess."',
        quote: {
            text: 'It was what it was. Mike Tyson has been knocked out.',
            source: 'Jim Lampley, on his HBO call from Tokyo, 1990',
        },
        sources: [
            { slot: 'podcast', show: 'JRE Clips', date: '2026-09-25', title: "Jim Lampley on Witnessing the Highs and Lows of Mike Tyson's Career", url: 'https://www.youtube.com/watch?v=iLzqQnM3l4o' },
            { slot: 'interview', show: 'Sky Sports F1', date: '2026-09-25', title: "Ollie Bearman brought to tears driving Senna's iconic car", url: 'https://www.youtube.com/watch?v=EtOOaj10lPc' },
        ],
        lead: {
            kicker: 'THE BIG LISTEN · JRE CLIPS',
            headline: 'The man who called Tyson’s fall says the best advice he ever got was “don’t overact”',
            standfirst:
                'Jim Lampley was sent to boxing by a boss who wanted him gone. He stayed long enough to call Mike Tyson’s first knockout on television and the one in Tokyo that nobody saw coming.',
            byline: 'By the Listening Desk',
            body: [
                'Jim Lampley told Joe Rogan that the most famous line of his career was shaped by two words he borrowed from Jack Nicholson. The line was “Mike Tyson has been knocked out,” called from ringside in Tokyo on February 11, 1990, when Buster Douglas, a 42-to-1 underdog, beat the undefeated heavyweight champion. The two words were “don’t overact.” Lampley said he heard them in the back of his mind as the count reached four or five. “I wanted to make it as matter-of-fact as possible,” he said, because there was nothing he could do to elevate the moment “by screaming or shouting or delivering any kind of window dressing.” He added, “It was what it was.”',
                'Lampley did not choose boxing. He said a network executive thought his contract was “absurd, too lucrative” and told his agent flat out that he was going to get rid of him and make him walk away. The first method was to assign him to boxing. The executive did not know that the first sports event Lampley’s mother ever sat him down to watch, when he was 6 and his father had just died, was Sugar Ray Robinson against Bobo Olson for the middleweight title. Lampley grew up on the Gillette Friday Night Fights. Asked whose voice he hears when he calls a fight, he ruled out Howard Cosell with “Oh, hell no” and named Don Dunphy, whom he described as “crisp, precise, factual, on point.”',
                'The executive had also missed something else. Alex Wallau, a colleague Lampley called “a boxing freak,” had just signed a 19-year-old heavyweight named Mike Tyson. The first fight Lampley ever called on television was Tyson against Jesse Ferguson, and afterward Tyson told Wallau that he had been trying “to drive his nose bone into his brain.” Lampley said he stood across the ring with his headset on and thought, “Look at what I’ve stumbled into here.” If the kid could keep coming up with quotes like that, he said, he would be the biggest attraction in American culture. Within weeks the lines started spilling out, including “Boxing is a hurt business.” Most of them, Lampley said, were things Cus D’Amato had taught him.',
                'The story Lampley tells best is a car ride. On the drive to Tyson’s fight with Marvis Frazier, Wallau asked him whether predicting a first-round knockout on camera was “too audacious.” Lampley, who called himself a newcomer “trying to get my feet wet,” told him to say whatever he believed. If he was wrong, nobody would penalize him on Monday, because “it goes into the wash at that point.” If he was right, he would get credit for it. In the last 40 or 50 miles, Wallau raised the stakes to the first minute, and he said exactly that in rehearsal the next day. Live on air, Lampley said, “he pulls it back” to the first round. Tyson won in about 30 seconds, and Wallau groaned all the way back to New York that he could have gotten more credit “if I said what I really believe.”',
                'In hindsight, Lampley argued, Tokyo should not have been a shock. He listed the men who went the distance with Tyson, among them James “Bonecrusher” Smith, Tony Tucker and James “Quick” Tillis, and said some ringside scorers had Tillis winning. What they had in common, he said, was that they were all taller than Tyson. Douglas was the best athlete of the group, a former college basketball player with good feet and a big right hand. “No way in the world Mike should be a 42-to-1 favorite,” Lampley said. Douglas had underperformed for most of his career. Then his mother died about 3 weeks before the fight, and in Lampley’s words, “that lit him up.”',
                'Tyson, by that point, was a different fighter. Lampley described a champion in “constant turmoil,” partying and feeling invincible, and said the distraction came with success, “all the trappings.” The trouble, as the two men told it, began with his marriage to the actress Robin Givens. Some people, they agreed, “can tank your life.” Lampley recalled a line from his HBO colleague Larry Merchant before Tyson’s 1988 fight with Tony Tubbs in Tokyo, the first fight Lampley did for HBO. Heavyweight champions, Merchant said, “have often consorted with actresses and never to their benefit.” By 1990 D’Amato and the manager Jimmy Jacobs were both dead. The only person in the camp who understood how vulnerable Tyson could be, Lampley said, was Tyson himself.',
                'His corner in Tokyo had no enswell, the small metal tool used to press down swelling, and his trainers held a rubber glove filled with water against his eye. Rogan called it “this really rank amateur corner” for a heavyweight champion of the world. “There was so much that was taken for granted about Mike,” he said.',
                'Lampley arrived in Tokyo convinced that Tyson would win inside 3 rounds. Instead, from 12 to 14 feet away, he watched the debacle unfold. Douglas kept landing his jab and hooking off the jab, and Lampley said the damage was done by a thunderous left hook, not the right hand most people remember. It was 10:30 or 11 in the morning, and about 34,000 people sat in near silence, “as though they are at an opera.” As the count rose, it became “abundantly clear” that Tyson would not get up. Lampley said he realized the result in front of him would supplant the biggest upset in boxing history, which happened to be the first live fight he ever attended.',
                'Rogan, who is only a year younger than Tyson, said he heard the news from a stranger at a gas station and did not believe it. When he later watched the replay, he said, he still expected Tyson to win. “That’s the kind of aura,” he said.',
                'The advice came from a golf course. Lampley said he asked Nicholson, a few weeks before Tokyo, what he tells himself before delivering the fulcrum line of a film, the one line the whole audience will remember, and he used “You can’t handle the truth” as the example. Nicholson’s mantra, he said, had not changed since his first acting class. The dates do not quite line up. A Few Good Men opened in December 1992, nearly 3 years after Tokyo, so the memory has probably folded two conversations into one. The advice survives the error. When Rogan played the tape, the call turned out to be louder than Lampley remembered. “I give myself too much credit for the matter-of-fact,” he admitted.',
            ],
        },
        rail: {
            kicker: 'THE GREEN ROOM · F1',
            headline: 'A 20-year-old drove Senna’s first winning car and took one lap more than he was allowed',
            byline: 'By the Green Room Desk',
            body: [
                'Ollie Bearman was allowed 1 or 2 laps in the Lotus that carried Ayrton Senna to his first Grand Prix win, and he did an extra one. “I literally could have gone all day,” the young Haas driver told Sky Sports F1 afterward, still shaking. “They were very strict on telling me to only do one lap or two laps,” he said. “I forgot.” The car is the 1985 Lotus 97T, which Senna drove to victory in heavy rain at Estoril, Portugal, by more than a minute in only his second season. Bearman drove it at Snetterton in England, and he said he was “over the moon” before he had even climbed in.',
                'He had seen cars from that era at Goodwood, but seeing one “in the flesh” for the first time, he said, was “incredibly special.” The steering wheel had no quick release. He sat so close to the front axle that it felt, in his words, “naked almost.” The seat was still Senna’s original from 1985, and he fitted it easily. Asked whether he knew how to heel and toe, he said he did, and that the pedals were “quite good” for it.',
                'What surprised him was how much of the car had to be handled by hand. A modern Formula 1 driver shifts with paddles behind the wheel. In the Lotus, every gear change means taking a hand off the wheel, and coming out of a corner he had to decide whether to short shift. “I don’t know if I can take my hand off the wheel,” he remembered thinking. The turbo had to be kept spinning and the revs kept up, work that electronics and buttons now do for him. The steering was lighter than he expected, and getting a feel for it was “quite hard.” Senna, he pointed out, had to drive it far faster than he did, and in the wet.',
                'Watching from the pit wall, one of the crew said he was getting “kid in a candy store vibes” and called the first laps in a turbo car “a sensory overload.” When Bearman came in, he apologized for the extra lap. “I don’t blame you,” came the answer, and he was told he would not be the first driver to climb out of a historic car as emotional as he was. The car, one of them said, “has a knack of getting all of us.”',
                'Bearman was born long after Senna died in 1994, but he said Senna was “the king of F1” when he was growing up. Days like this, he said, remind a driver “why you fell in love with the sport.” A man who was 23 and working for the team in 1985 said he never dreamed he would still be looking after the car, and driving it, more than 40 years later.',
            ],
        },
        railStats: [
            { label: 'Tokyo, 1990', value: 'Douglas at 42 to 1. Tyson down in round 10' },
            { label: 'The call', value: '“Mike Tyson has been knocked out.”' },
            { label: 'Estoril, 1985', value: 'Senna’s first win, in the rain, by over a minute' },
            { label: 'Laps allowed', value: '1 or 2. Bearman did one more' },
        ],
        voices: CLIP_0925_VOICES,
        story: CLIP_0925_STORY,
        glosses: CLIP_0925_GLOSSES,
        editorsNote:
            'とにお、これが「クリップの中身を丸ごと紙にする」号外の試作だ。podcast 欄は10表現で止まるけど、ここは全文に注釈が付いて、拾える口語は全部 WORD LIST に並んでる。語(単語)は Words、句(言い回し)は Phrases に分けて入る。' +
            '読みどころは3つ。(1) fulcrum line = 映画の要のセリフ。てこの支点が語源。(2) never to their benefit の benefit は friends with benefits(セフレ)と同じ語だけど、ここでは「得」。consort with とセットで皮肉になってる。(3) ランプリーの記憶は年代がずれてる。A Few Good Men は1992年公開で、東京の3年後。記事はそこも書いた。' +
            '喋るお題: 大きい予想を言い切るか、引っ込めるか。Wallau の側か Lampley の側か、1分。it goes into the wash は使え。',
    },
];
