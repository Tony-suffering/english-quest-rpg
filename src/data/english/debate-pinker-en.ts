/**
 * DEBATE ROOM の英語版。日本語の説明を押すと英語に切り替わる(講師に読んでもらうため)。
 * キーはラウンド番号。moves と uses は debate-pinker.ts の配列と同じ順番。
 */

export interface DebateRoundEn {
    title: string;
    topic: string;
    attack: string;
    defense: string;
    moves: { name: string; how: string }[];
    uses: string[];
    verdict: string;
}

export const DEBATE_META_EN = {
    oneLine: 'An optimistic scientist gets grilled for 15 minutes by a master debater on four issues: the dark side of the Enlightenment, poverty, inequality and climate change. Neither of them raises his voice. They fight with word choice alone.',
    pinker: 'Harvard psychologist. In his book "Enlightenment Now", he uses data to argue that the world is getting better.',
    hasan: 'Host of the show. He corners his guests by undermining their premises, quoting their own words back to them, and changing the yardstick behind the numbers.',
    howto: [
        'Paste the video link in the chat, then share this page on screen.',
        'Press "Play" to watch one round (a minute and a half at most). Pause when it ends.',
        'Say the line in "Say this when you pause", then ask the question in "Ask the teacher".',
        "Reply once to the teacher's answer, then move on. Four or five rounds are enough for 25 minutes.",
        'Finish with: Who won the debate, in your opinion?',
    ],
    score: 'Pinker 5 wins, Hasan 4, 3 draws. Pinker won on the numbers; Hasan won on people and real-life scenes.',
    hasanKit: [
        "Borrow a third party's voice (Critics say / Some scholars say)",
        "Read the guest's own words, then set them next to heavy facts",
        'Change the yardstick to produce numbers that point the other way',
        'Turn statistics into the scene of one real person',
        "Take the guest's own weapon (correlation vs causation) and turn it on him",
        'Force a yes or no with a tag question (..., do they not?)',
    ],
    pinkerKit: [
        'Deny in a few words, then give the reason right away',
        'Concede the premise first (Of course the definition is going to be arbitrary.)',
        'Answer with direction, not quantity (the direction is down)',
        "Bring in the denominator (What's relevant is the proportion.)",
        "Split the opponent's sentence in two (Those are two different statements.)",
        'Swap the label (not an optimistic book — a realistic book)',
    ],
    forTheme2: 'Taking it back to my Eiken topic: Can poverty ever be eradicated?',
    roundLabels: { attack: "HASAN'S ATTACK", defense: "PINKER'S DEFENSE", say: 'Say this when you pause', ask: 'Ask the teacher', verdict: 'Verdict' },
};

export const DEBATE_EN: Record<number, DebateRoundEn> = {
    1: {
        title: 'Opening — The world is on fire, and it\'s "amazing"?',
        topic: "The host lists dark news from around the world, then reads an optimistic line from Pinker's book.",
        attack: "He stacks four dark facts (rising authoritarianism, refugees, nuclear tension, climate change), then quotes the guest's cheerful line to show the gap.",
        defense: 'He answers with a general claim ("any measure has improved"), then instantly lists four concrete measures: life expectancy, schooling, safety and deaths in war.',
        moves: [
            { name: 'Staging the contrast', how: "Pile up dark facts first, then read the guest's bright words. The guest has to start by defending himself." },
            { name: 'Four facts, instantly', how: 'Start abstract (well-being), then give four concrete examples in the same short pattern. It leaves no gap to attack.' },
        ],
        uses: ['To describe a current trend at the start of a speech', "To point out the gap between the facts and the other side's claim", 'To state your claim broadly'],
        verdict: 'Even. The host set the stage, and Pinker stood his ground with four facts.',
    },
    2: {
        title: 'The dark side of the Enlightenment — "The chronology is wrong"',
        topic: 'The criticism that the Enlightenment was also an age of slavery and colonialism.',
        attack: 'He borrows the voice of critics, then names four philosophers (Kant, Locke, Hume, Voltaire) and their racist statements.',
        defense: 'First he denies it outright: "That\'s false. The chronology is wrong." When the names pile up, he admits the people had a dark side, but draws a line: what he holds up are the ideas, not the people.',
        moves: [
            { name: "Borrowing a third party's voice", how: 'Starting with "Critics say" lets the host attack without looking like the attacker.' },
            { name: 'Breaking it with chronology', how: 'Against "A caused B", reply "B existed long before A". Cut the cause and effect with time.' },
            { name: 'Separating people from ideas', how: 'Admit the fact (some of them were racists), then shift what you defend from the people to the ideas. Conceding builds trust.' },
        ],
        uses: ['An instant reply when told you ignored something', 'To break a cause-and-effect claim with the order of events', 'To admit the fact, then narrow what you defend'],
        verdict: 'Pinker wins. Moving from flat denial to partial agreement worked.',
    },
    3: {
        title: 'Cherry-picking — "That\'s just dead wrong"',
        topic: 'The criticism that he started with his conclusion and picked data to fit it.',
        attack: 'He praises the guest first (a prominent, well-credentialed scientist), then knocks him down: the book is a polemic, not an argument.',
        defense: 'He denies it in three words, then explains why he didn\'t pick: "We all agree on what well-being is — life expectancy, death from disease." He just plotted them all.',
        moves: [
            { name: 'Praise, then knock down', how: 'Praising before criticizing makes the attack sound less personal.' },
            { name: 'Short denial, then the reason', how: 'Say no in the first three words, then give the reason without a pause. A denial alone sounds emotional.' },
        ],
        uses: ['When you doubt how someone chose their data', 'A strong denial (in an exam, "I strongly disagree" is safer)', 'To make the guest answer the critics directly'],
        verdict: 'Pinker wins. But "I plotted everything" can\'t be checked, so the host goes after the numbers next.',
    },
    4: {
        title: 'The poverty line — "The definition is arbitrary, but the direction is down"',
        topic: "The book's figure: extreme poverty (under $1.90 a day) fell from 2 billion people in 1990 to 700 million in 2015.",
        attack: "He reads the guest's numbers accurately, then attacks the yardstick itself: many scholars call the measure arbitrary. He adds another scholar's figure: four billion people in poverty.",
        defense: 'He concedes first: "Of course the definition is arbitrary." Then he says the conclusion doesn\'t change with the yardstick: "No matter what cutoff you set, the direction is down."',
        moves: [
            { name: 'Attacking the yardstick', how: 'Question the definition behind the numbers, not the numbers. Even correct numbers start to wobble.' },
            { name: 'Conceding the premise first', how: 'Say the other side\'s point yourself with "Of course". Their attack shrinks to something obvious.' },
            { name: 'Answering with direction', how: 'Argue about direction (up or down), not quantity. If the direction holds under any yardstick, you win.' },
        ],
        uses: ['To question a standard or a line someone drew', 'Use it right after the concession in my poverty speech', 'To concede the premise and shrink the attack'],
        verdict: 'Pinker wins. He pulled the debate about definitions back to direction.',
    },
    5: {
        title: 'Numbers or proportions — "What\'s relevant is the proportion"',
        topic: "Another scholar's figure: at a $5-a-day line, a billion more people are poor than in 1981.",
        attack: 'He raises the line to $5 and shows numbers going the opposite way. Then he points out a contradiction: "You also use absolute numbers in your book."',
        defense: 'He brings in the denominator: "Billions of people have been added to the world. What\'s relevant is the proportion." When caught, he ranks his points: absolute numbers fell too, but the main point is the proportion.',
        moves: [
            { name: 'Numbers pointing the other way', how: 'Use another angle on the same data (a higher line) to reach the opposite conclusion.' },
            { name: 'Pointing out a contradiction', how: '"You did it yourself" is short and effective. It forces the guest to rank his own arguments.' },
            { name: 'Bringing in the denominator', how: 'Against "the number went up", reply "the total went up too". In percentages, the story flips.' },
        ],
        uses: ['Point one of my poverty speech: talk about the share, not the headcount', 'To answer a partial number with the whole picture', 'To admit a contradiction while ranking your points'],
        verdict: 'Draw. The denominator reply was strong, but he backed off a little when caught using absolute numbers.',
    },
    6: {
        title: 'Six times the line — "That\'s a rather extreme redefinition"',
        topic: 'A Harvard development economist, Lant Pritchett, says the poverty line should be $12 to $15 a day.',
        attack: 'He names the guest\'s own Harvard colleague to rewrite the yardstick with an expert\'s voice, and ends with a short tag question: "...your arguments fall apart, do they not?"',
        defense: 'He names the size of the change: "That\'s a rather extreme redefinition — multiplying by a factor of six." Against "experts disagree": "Yes, some do, but over a wide range of estimates, the picture is the same."',
        moves: [
            { name: "An expert from the guest's own camp", how: "Cite a colleague from the same university. It can't be dismissed as an outsider's criticism." },
            { name: 'Closing with a tag question', how: 'Ending with "..., do they not?" forces a yes or a no.' },
            { name: 'Naming the change', how: 'Call the other side\'s move "a rather extreme redefinition". Saying "six times" makes it look extreme.' },
            { name: 'Yes, some do, but', how: 'Admit that critics exist, then show the range where the conclusion holds.' },
        ],
        uses: ['When someone shifts a word or a standard', 'To say how many times bigger something is', 'An instant reply to "some people disagree"', 'To push someone to say yes or no'],
        verdict: 'Pinker wins. He named the extremeness and pulled the debate back to the original yardstick.',
    },
    7: {
        title: 'The emotional appeal — "They would laugh in your face"',
        topic: "What if you told someone living on $1.91 a day that they're not in extreme poverty?",
        attack: 'He switches from numbers to a human face: a middle-class North American academic tells a poor person not to complain, and gets laughed at.',
        defense: 'He goes back to a comparison over time: "Compare that person to twenty years ago." He lists deaths from hunger and disease, and turns the cherry-picking charge around: if you pick the worst off, of course they\'re not well off.',
        moves: [
            { name: 'Turning numbers into a face', how: "When losing on statistics, switch to one person's story. It moves the audience's feelings." },
            { name: 'Comparing over time', how: 'Move the question from "how is that person now" to "how are they compared to twenty years ago".' },
            { name: "Returning the opponent's weapon", how: 'He used "cherry-pick", the charge he faced in round 3, against the host.' },
        ],
        uses: ["To say a claim wouldn't work in the real world", 'The evidence for my concession: the progress is real', 'Together with "the better off / the worse off"'],
        verdict: "Hasan wins. The human scene was powerful, and Pinker's reply was correct but sounded cold.",
    },
    8: {
        title: 'Inequality — "Not in itself a dimension of well-being"',
        topic: 'The World Bank and the IMF call inequality a problem. Studies link it to homicide, imprisonment, infant mortality and mental illness.',
        attack: 'He lines up authorities (the World Bank, the IMF), a book (The Spirit Level), and sheer volume: 300 papers since the 1970s.',
        defense: 'He knocks down the book first: its claims have been shown to be false. Against the volume, he says inequality also correlates with development, education and women\'s rights, so the question is causation, not correlation.',
        moves: [
            { name: 'Lining up authorities', how: 'Institutions and the number of papers create a "you versus the world" picture.' },
            { name: 'For one thing', how: 'Starting a rebuttal with "for one thing" makes it sound like more points are coming.' },
            { name: 'Correlation vs causation', how: 'Against "A and B happen together", reply "C may cause both". It cancels out the number of studies.' },
            { name: 'Taking the weapon back', how: 'The host turned Pinker\'s "correlation vs causation" against Pinker\'s own book.' },
        ],
        uses: ['The first point of a rebuttal (works in the Q&A)', 'The classic reply to "because of A, B happened"', "To reframe the issue and step off the other side's ground"],
        verdict: 'Hasan wins. Turning "correlation vs causation" back on Pinker\'s book was the decisive blow.',
    },
    9: {
        title: 'Shoes and jeans — "That\'s a straw man"',
        topic: 'The book says employers and employees wear the same shoes and use the same phones. Meanwhile, in the US, the top 1% live 15 years longer than the bottom 1%.',
        attack: 'He puts a light line from the book next to a heavy number (a 15-year life-expectancy gap) and sums it up with sarcasm: "Don\'t worry, they have the same shoes."',
        defense: 'He restates his point: not "don\'t worry" — let\'s appreciate the progress; it doesn\'t mean there are no more problems. Then he shows the extreme result of targeting inequality: making the top 1% die earlier would count as progress.',
        moves: [
            { name: 'A light line next to a heavy number', how: 'Setting a casual sentence next to a grim fact makes the guest look cold.' },
            { name: 'Rejecting the implication', how: "With \"It's not the insinuation. It's...\", remove the other side's reading and restate your point briefly." },
            { name: 'The extreme consequence', how: 'Show where a goal leads if taken literally, and make people question the goal itself.' },
            { name: 'Calling it a straw man', how: 'When the other side uses an extreme example, cut it off: nobody is saying that.' },
        ],
        uses: ["When someone claims you said something you didn't", 'The concession in my poverty speech', "One line so that praising progress doesn't sound naive", 'When someone distorts your claim into an extreme'],
        verdict: 'Hasan wins. The "same shoes" line couldn\'t survive the 15-year gap. But Pinker\'s "appreciate the progress, problems remain" is worth stealing.',
    },
    10: {
        title: 'Climate change — "Those are two different statements"',
        topic: 'The book says humanity is not on an irrevocable path to ecological suicide. Former NASA scientist James Hansen says climate change threatens the fabric of civilization.',
        attack: 'He quotes a respected scientist\'s strong warning and calls the guest\'s line flippant. Then he pushes with the field: everyone working on this is tearing their hair out; the trend is in the wrong direction.',
        defense: 'He pulls the authority to his side: "I agree completely with Jim Hansen." Against "the trend is bad", he splits the sentence: a bad trend and "nothing could work" are two different statements.',
        moves: [
            { name: 'Pulling the authority to your side', how: 'Say "I agree with that expert too", and the authority moves to your side.' },
            { name: 'Splitting the sentence in two', how: 'Separate "the trend is bad" from "nothing can be done". Accept the first, deny only the second.' },
        ],
        uses: ["To make the other side's expert your ally", 'To accept the fact but deny the conclusion', 'When the other side mixes two claims'],
        verdict: 'Pinker wins. The most stealable move of the whole show: splitting a sentence in two.',
    },
    11: {
        title: 'Conditional optimism — "Significantly greater than zero"',
        topic: 'What is the basis for optimism? What are the chances of beating climate change?',
        attack: 'He demands evidence ("What\'s your basis?") and tries to nail the guest down with a number.',
        defense: 'He relabels his position ("not a relentlessly optimistic book — a realistic one") and adds a condition ("conditionally optimistic"). Pressed for a probability, he only says "significantly greater than zero" and gives no number.',
        moves: [
            { name: 'Swapping the label', how: 'Replace "optimistic book" with "realistic book". One word changes the position.' },
            { name: 'Adding a condition', how: '"We can be optimistic, if..." With a condition, you\'re not wrong even if things go badly.' },
            { name: 'Demanding a number', how: 'Ask "how much?" and let a vague answer stay visibly vague.' },
            { name: 'Refusing to give a number', how: "Even when pressed, don't give a number. Any number becomes the next target." },
        ],
        uses: ['The first line or conclusion of my poverty speech', 'To swap a label someone put on you', 'For someone who keeps giving vague answers', 'To talk about chances without giving a number'],
        verdict: 'Hasan wins. When Pinker couldn\'t answer "How much greater than zero?", his optimism looked thin.',
    },
    12: {
        title: 'Closing — "Who\'s saying zero?"',
        topic: "Reviewers say he sets up straw men and makes sweeping claims. And he isn't a climate scientist.",
        attack: 'He lists famous reviewers (The New York Times, The Guardian) to make it look like everyone agrees. His final blow: what qualifies a psychologist to talk about climate change?',
        defense: 'He points out the exaggeration ("Who\'s saying zero?"). Asked about qualifications, he restates his claim in its smallest form: saying we might solve a crisis is not a sweeping claim.',
        moves: [
            { name: 'Listing the reviews', how: 'Naming famous media makes it look like public opinion.' },
            { name: 'Pointing out the exaggeration', how: 'With "Who\'s saying that?", show that the other side made your claim stronger than it was.' },
            { name: 'Questioning qualifications', how: "Attack the speaker's credentials, not the content. Common as a final blow." },
            { name: 'Shrinking the claim', how: "When accused of a big claim, restate it in its smallest form. A small claim can't be broken." },
        ],
        uses: ['When the other side exaggerates your claim', "To criticize someone's overgeneralization", "To deny the other side's premise in one sentence"],
        verdict: 'Draw. On the last question about qualifications, Pinker dodged by making his claim smaller.',
    },
};
