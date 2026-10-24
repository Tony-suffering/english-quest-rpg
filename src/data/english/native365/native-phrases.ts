/**
 * ネイティブ音声フレーズ・バンク
 *
 * PlayPhrase.me 由来の実写クリップ (movie/TV の native 発話)。
 * シャドーイング素材として 106 本。
 * transcript はファイル名から復元 (apostrophe 位置はおおよそ)。
 * tags は文字列検出で自動付与。
 */

export interface NativePhrase {
  slug: string;
  file: string;            // /audio/... からの絶対パス (public/ 起点)
  transcript: string;      // 句読点はない、おおまか
  tags: string[];          // schwa, reductions, present-perfect, past-tense, conditional, discourse, question, chunk, short, long, general
}

export const NATIVE_PHRASE_TAGS = [
  { id: 'schwa', label: 'schwa多用', color: '#D4AF37' },
  { id: 'reductions', label: '縮約', color: '#3B82F6' },
  { id: 'present-perfect', label: '現在完了', color: '#10B981' },
  { id: 'past-tense', label: '過去形', color: '#8B5CF6' },
  { id: 'conditional', label: '仮定法/条件', color: '#EC4899' },
  { id: 'discourse', label: 'discourse marker', color: '#F97316' },
  { id: 'question', label: '疑問文', color: '#92400E' },
  { id: 'chunk', label: '定型句', color: '#6366F1' },
  { id: 'short', label: '短文 (≤6語)', color: '#78716C' },
  { id: 'long', label: '長文 (≥15語)', color: '#44403C' },
  { id: 'general', label: 'その他', color: '#A8A29E' },
] as const;

export const NATIVE_PHRASES: NativePhrase[] = [
  {
    "slug": "after-i-settled-at-halfway-house-i-worked-my-hardest-to-memorize-letter-sounds-w",
    "file": "/audio/native-phrases/after-i-settled-at-halfway-house-i-worked-my-hardest-to-memorize-letter-sounds-w.mp3",
    "transcript": "After i settled at halfway house i worked my hardest to memorize letter sounds w",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "all-right-we-re-not-gonna-make-that-our-engines-are-burning-up-i-see-a-field-and",
    "file": "/audio/native-phrases/all-right-we-re-not-gonna-make-that-our-engines-are-burning-up-i-see-a-field-and.mp3",
    "transcript": "All right we re not gonna make that our engines are burning up i see a field and",
    "tags": [
      "reductions",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "and-i-am-scared-out-of-my-wits",
    "file": "/audio/native-phrases/and-i-am-scared-out-of-my-wits.mp3",
    "transcript": "And i am scared out of my wits",
    "tags": [
      "chunk"
    ]
  },
  {
    "slug": "and-i-was-wondering-if-there-was-some-you-know-pathway-to-a-do-over",
    "file": "/audio/native-phrases/and-i-was-wondering-if-there-was-some-you-know-pathway-to-a-do-over.mp3",
    "transcript": "And i was wondering if there was some you know pathway to a do over",
    "tags": [
      "past-tense",
      "conditional",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "and-in-my-experience-at-the-end-of-things-it-s-almost-always-the-men-that-think-",
    "file": "/audio/native-phrases/and-in-my-experience-at-the-end-of-things-it-s-almost-always-the-men-that-think-.mp3",
    "transcript": "And in my experience at the end of things it s almost always the men that think ",
    "tags": [
      "schwa",
      "chunk",
      "long"
    ]
  },
  {
    "slug": "and-there-s-a-beautiful-lagoon-with-a-little-waterfall-right-here",
    "file": "/audio/native-phrases/and-there-s-a-beautiful-lagoon-with-a-little-waterfall-right-here.mp3",
    "transcript": "And there s a beautiful lagoon with a little waterfall right here",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "and-when-we-destroy-it-we-will-blast-a-crater-in-their-racial-memory-so-deep-tha",
    "file": "/audio/native-phrases/and-when-we-destroy-it-we-will-blast-a-crater-in-their-racial-memory-so-deep-tha.mp3",
    "transcript": "And when we destroy it we will blast a crater in their racial memory so deep tha",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "as-though-the-badge-of-honor-would-touch-that-guy-with-a-ten-foot-pole-after-he-",
    "file": "/audio/native-phrases/as-though-the-badge-of-honor-would-touch-that-guy-with-a-ten-foot-pole-after-he-.mp3",
    "transcript": "As though the badge of honor would touch that guy with a ten foot pole after he ",
    "tags": [
      "schwa",
      "conditional",
      "long"
    ]
  },
  {
    "slug": "be-a-nice-way-for-us-to-get-to-know-each-other",
    "file": "/audio/native-phrases/be-a-nice-way-for-us-to-get-to-know-each-other.mp3",
    "transcript": "Be a nice way for us to get to know each other",
    "tags": [
      "schwa"
    ]
  },
  {
    "slug": "except-i-put-my-ear-out-to-the-streets-and-i-ain-t-like-what-came-back",
    "file": "/audio/native-phrases/except-i-put-my-ear-out-to-the-streets-and-i-ain-t-like-what-came-back.mp3",
    "transcript": "Except i put my ear out to the streets and i ain t like what came back",
    "tags": [
      "past-tense",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "half-siblings-and-cousins-who-might-have-a-legitimate-claim-to-the-throne-and-ju",
    "file": "/audio/native-phrases/half-siblings-and-cousins-who-might-have-a-legitimate-claim-to-the-throne-and-ju.mp3",
    "transcript": "Half siblings and cousins who might have a legitimate claim to the throne and ju",
    "tags": [
      "schwa",
      "conditional",
      "long"
    ]
  },
  {
    "slug": "he-pushes-his-glasses-back-on-the-bridge-of-his-nose-when-he-s-about-to-kick-it-",
    "file": "/audio/native-phrases/he-pushes-his-glasses-back-on-the-bridge-of-his-nose-when-he-s-about-to-kick-it-.mp3",
    "transcript": "He pushes his glasses back on the bridge of his nose when he s about to kick it ",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "he-thinks-you-ll-think-he-s-a-drop-in-the-bucket-just-to-keep-whatever-deal-you-",
    "file": "/audio/native-phrases/he-thinks-you-ll-think-he-s-a-drop-in-the-bucket-just-to-keep-whatever-deal-you-.mp3",
    "transcript": "He thinks you ll think he s a drop in the bucket just to keep whatever deal you ",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "hey-lyle-i-ve-had-a-really-really-bad-day-today-so-i-m-not-in-the-mood-to-dilly-",
    "file": "/audio/native-phrases/hey-lyle-i-ve-had-a-really-really-bad-day-today-so-i-m-not-in-the-mood-to-dilly-.mp3",
    "transcript": "Hey lyle i ve had a really really bad day today so i m not in the mood to dilly ",
    "tags": [
      "schwa",
      "present-perfect",
      "past-tense",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "his-leg-looks-bad-but-it-can-wait-till-dallas",
    "file": "/audio/native-phrases/his-leg-looks-bad-but-it-can-wait-till-dallas.mp3",
    "transcript": "His leg looks bad but it can wait till dallas",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "i-admit-i-don-t-think-it-s-smart-to-put-holes-in-things-that-sink-or-breathe-but",
    "file": "/audio/native-phrases/i-admit-i-don-t-think-it-s-smart-to-put-holes-in-things-that-sink-or-breathe-but.mp3",
    "transcript": "I admit i don t think it s smart to put holes in things that sink or breathe but",
    "tags": [
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "i-can-put-a-pin-in-it-right-now-and-stop",
    "file": "/audio/native-phrases/i-can-put-a-pin-in-it-right-now-and-stop.mp3",
    "transcript": "I can put a pin in it right now and stop",
    "tags": [
      "past-tense",
      "discourse"
    ]
  },
  {
    "slug": "i-d-work-on-cars-because-what-else-am-i-gonna-do",
    "file": "/audio/native-phrases/i-d-work-on-cars-because-what-else-am-i-gonna-do.mp3",
    "transcript": "I d work on cars because what else am i gonna do",
    "tags": [
      "reductions",
      "present-perfect"
    ]
  },
  {
    "slug": "i-don-t-hate-my-fellow-man-even-when-he-s-tiresome-and-surly-and-tries-to-cheat-",
    "file": "/audio/native-phrases/i-don-t-hate-my-fellow-man-even-when-he-s-tiresome-and-surly-and-tries-to-cheat-.mp3",
    "transcript": "I don t hate my fellow man even when he s tiresome and surly and tries to cheat ",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "i-don-t-have-any-prepared-remarks-but-i-d-be-very-happy-to-take-your-questions-o",
    "file": "/audio/native-phrases/i-don-t-have-any-prepared-remarks-but-i-d-be-very-happy-to-take-your-questions-o.mp3",
    "transcript": "I don t have any prepared remarks but i d be very happy to take your questions o",
    "tags": [
      "present-perfect",
      "long"
    ]
  },
  {
    "slug": "i-don-t-know-why-you-want-me-to-go-with-you",
    "file": "/audio/native-phrases/i-don-t-know-why-you-want-me-to-go-with-you.mp3",
    "transcript": "I don t know why you want me to go with you",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "i-don-t-think-he-s-in-no-mood-to-be-bothered-right-now",
    "file": "/audio/native-phrases/i-don-t-think-he-s-in-no-mood-to-be-bothered-right-now.mp3",
    "transcript": "I don t think he s in no mood to be bothered right now",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "i-heard-the-other-day-some-guys-tried-to-pipe-him-because-of-a-workman-s-comp-ca",
    "file": "/audio/native-phrases/i-heard-the-other-day-some-guys-tried-to-pipe-him-because-of-a-workman-s-comp-ca.mp3",
    "transcript": "I heard the other day some guys tried to pipe him because of a workman s comp ca",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "i-know-you-young-people-always-jabbing-yourself-with-ink-and-needles",
    "file": "/audio/native-phrases/i-know-you-young-people-always-jabbing-yourself-with-ink-and-needles.mp3",
    "transcript": "I know you young people always jabbing yourself with ink and needles",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "i-ll-drop-you-guys-off-at-the-hotel-and-in-the-morning-you-go-get-the-rest-of-th",
    "file": "/audio/native-phrases/i-ll-drop-you-guys-off-at-the-hotel-and-in-the-morning-you-go-get-the-rest-of-th.mp3",
    "transcript": "I ll drop you guys off at the hotel and in the morning you go get the rest of th",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "i-mean-no-one-s-going-to-be-able-to-do-it-like-you-did-and-i-hope-you-don-t-judg",
    "file": "/audio/native-phrases/i-mean-no-one-s-going-to-be-able-to-do-it-like-you-did-and-i-hope-you-don-t-judg.mp3",
    "transcript": "I mean no one s going to be able to do it like you did and i hope you don t judg",
    "tags": [
      "past-tense",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "i-never-understand-what-happens-to-a-person-who-makes-them-lose-the-will-to-surv",
    "file": "/audio/native-phrases/i-never-understand-what-happens-to-a-person-who-makes-them-lose-the-will-to-surv.mp3",
    "transcript": "I never understand what happens to a person who makes them lose the will to surv",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "i-think-it-serves-them-right-for-not-casting-me-that-that-whole-franchise-just-t",
    "file": "/audio/native-phrases/i-think-it-serves-them-right-for-not-casting-me-that-that-whole-franchise-just-t.mp3",
    "transcript": "I think it serves them right for not casting me that that whole franchise just t",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "i-ve-been-the-man-of-the-house-for-as-long-as-i-can-remember",
    "file": "/audio/native-phrases/i-ve-been-the-man-of-the-house-for-as-long-as-i-can-remember.mp3",
    "transcript": "I ve been the man of the house for as long as i can remember",
    "tags": [
      "schwa",
      "present-perfect",
      "chunk",
      "long"
    ]
  },
  {
    "slug": "i-ve-sat-back-and-taken-it-but-now-you-ve-crossed-the-line-sir-and-i-am-going-to",
    "file": "/audio/native-phrases/i-ve-sat-back-and-taken-it-but-now-you-ve-crossed-the-line-sir-and-i-am-going-to.mp3",
    "transcript": "I ve sat back and taken it but now you ve crossed the line sir and i am going to",
    "tags": [
      "present-perfect",
      "long"
    ]
  },
  {
    "slug": "i-was-not-anticipating-this-but-i-think-it-will-be-workable-from-our-end",
    "file": "/audio/native-phrases/i-was-not-anticipating-this-but-i-think-it-will-be-workable-from-our-end.mp3",
    "transcript": "I was not anticipating this but i think it will be workable from our end",
    "tags": [
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "if-i-had-to-say-i-d-say-it-ll-be-close-but-you-ll-eek-it-out",
    "file": "/audio/native-phrases/if-i-had-to-say-i-d-say-it-ll-be-close-but-you-ll-eek-it-out.mp3",
    "transcript": "If i had to say i d say it ll be close but you ll eek it out",
    "tags": [
      "present-perfect",
      "past-tense",
      "conditional",
      "long"
    ]
  },
  {
    "slug": "if-you-re-that-successful-how-come-you-wound-up-in-this-room-with-me-right-now-t",
    "file": "/audio/native-phrases/if-you-re-that-successful-how-come-you-wound-up-in-this-room-with-me-right-now-t.mp3",
    "transcript": "If you re that successful how come you wound up in this room with me right now t",
    "tags": [
      "conditional",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "it-gives-me-a-chance-to-speak-with-them-free-of-the-instructions-of-producers-wh",
    "file": "/audio/native-phrases/it-gives-me-a-chance-to-speak-with-them-free-of-the-instructions-of-producers-wh.mp3",
    "transcript": "It gives me a chance to speak with them free of the instructions of producers wh",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "it-s-difficult-being-in-eden-s-company-and-not-getting-a-tan",
    "file": "/audio/native-phrases/it-s-difficult-being-in-eden-s-company-and-not-getting-a-tan.mp3",
    "transcript": "It s difficult being in eden s company and not getting a tan",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "it-s-some-of-the-larger-chunks-i-put-in-my-mouth-and-i-swallowed-whole",
    "file": "/audio/native-phrases/it-s-some-of-the-larger-chunks-i-put-in-my-mouth-and-i-swallowed-whole.mp3",
    "transcript": "It s some of the larger chunks i put in my mouth and i swallowed whole",
    "tags": [
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "just-like-when-you-know-things-are-ending-you-freak-out-and-you-try-to-hold-on-a",
    "file": "/audio/native-phrases/just-like-when-you-know-things-are-ending-you-freak-out-and-you-try-to-hold-on-a.mp3",
    "transcript": "Just like when you know things are ending you freak out and you try to hold on a",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "life-goes-on-even-for-those-of-us-who-were-divorced-broke-and-sloppy",
    "file": "/audio/native-phrases/life-goes-on-even-for-those-of-us-who-were-divorced-broke-and-sloppy.mp3",
    "transcript": "Life goes on even for those of us who were divorced broke and sloppy",
    "tags": [
      "past-tense"
    ]
  },
  {
    "slug": "much-has-changed-in-a-short-time",
    "file": "/audio/native-phrases/much-has-changed-in-a-short-time.mp3",
    "transcript": "Much has changed in a short time",
    "tags": [
      "chunk"
    ]
  },
  {
    "slug": "my-email-got-hacked-and-i-sent-the-governor-spam-for-romantic-candles",
    "file": "/audio/native-phrases/my-email-got-hacked-and-i-sent-the-governor-spam-for-romantic-candles.mp3",
    "transcript": "My email got hacked and i sent the governor spam for romantic candles",
    "tags": [
      "past-tense"
    ]
  },
  {
    "slug": "now-i-know-you-re-stubborn-and-i-know-you-want-to-take-this-thing-with-you-but-i",
    "file": "/audio/native-phrases/now-i-know-you-re-stubborn-and-i-know-you-want-to-take-this-thing-with-you-but-i.mp3",
    "transcript": "Now i know you re stubborn and i know you want to take this thing with you but i",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "oh-god-i-forgot-i-haven-t-got-a-drop-in-the-house-what-kind-of-a-host-does-that-",
    "file": "/audio/native-phrases/oh-god-i-forgot-i-haven-t-got-a-drop-in-the-house-what-kind-of-a-host-does-that-.mp3",
    "transcript": "Oh god i forgot i haven t got a drop in the house what kind of a host does that ",
    "tags": [
      "schwa",
      "present-perfect",
      "past-tense",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "please-don-t-touch-because-the-scanners-will-read-the-new-scar-tissue-alarms-wil",
    "file": "/audio/native-phrases/please-don-t-touch-because-the-scanners-will-read-the-new-scar-tissue-alarms-wil.mp3",
    "transcript": "Please don t touch because the scanners will read the new scar tissue alarms wil",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "sharing-them-with-a-married-used-car-salesman-a-certain-mr-guy-trundle",
    "file": "/audio/native-phrases/sharing-them-with-a-married-used-car-salesman-a-certain-mr-guy-trundle.mp3",
    "transcript": "Sharing them with a married used car salesman a certain mr guy trundle",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "she-s-just-torn-up-all-those-conventions-and-all-that-straight-up-and-down-stuff",
    "file": "/audio/native-phrases/she-s-just-torn-up-all-those-conventions-and-all-that-straight-up-and-down-stuff.mp3",
    "transcript": "She s just torn up all those conventions and all that straight up and down stuff",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "she-thought-it-might-be-some-sort-of-shotgun-wedding-seeing-as-we-d-never-seen-y",
    "file": "/audio/native-phrases/she-thought-it-might-be-some-sort-of-shotgun-wedding-seeing-as-we-d-never-seen-y.mp3",
    "transcript": "She thought it might be some sort of shotgun wedding seeing as we d never seen y",
    "tags": [
      "present-perfect",
      "past-tense",
      "conditional",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "since-this-room-is-no-longer-yours-do-you-mind-if-i-utilize-it",
    "file": "/audio/native-phrases/since-this-room-is-no-longer-yours-do-you-mind-if-i-utilize-it.mp3",
    "transcript": "Since this room is no longer yours do you mind if i utilize it",
    "tags": [
      "conditional"
    ]
  },
  {
    "slug": "so-what-if-i-get-a-smart-artsy-dude-to-run-my-social-media-so-it-looks-like-i-m-",
    "file": "/audio/native-phrases/so-what-if-i-get-a-smart-artsy-dude-to-run-my-social-media-so-it-looks-like-i-m-.mp3",
    "transcript": "So what if i get a smart artsy dude to run my social media so it looks like i m ",
    "tags": [
      "conditional",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "take-my-word-for-it-there-s-no-area-fifty-one",
    "file": "/audio/native-phrases/take-my-word-for-it-there-s-no-area-fifty-one.mp3",
    "transcript": "Take my word for it there s no area fifty one",
    "tags": [
      "chunk"
    ]
  },
  {
    "slug": "that-i-was-some-petty-grudge-bearing-little-malcontent-grasping-at-some-splinter",
    "file": "/audio/native-phrases/that-i-was-some-petty-grudge-bearing-little-malcontent-grasping-at-some-splinter.mp3",
    "transcript": "That i was some petty grudge bearing little malcontent grasping at some splinter",
    "tags": [
      "past-tense"
    ]
  },
  {
    "slug": "the-buddha-teach-every-memory-lives-somewhere-deep-within",
    "file": "/audio/native-phrases/the-buddha-teach-every-memory-lives-somewhere-deep-within.mp3",
    "transcript": "The buddha teach every memory lives somewhere deep within",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "the-neighbor-from-across-the-street-came-to-watch-and-then-all-the-others-came",
    "file": "/audio/native-phrases/the-neighbor-from-across-the-street-came-to-watch-and-then-all-the-others-came.mp3",
    "transcript": "The neighbor from across the street came to watch and then all the others came",
    "tags": [
      "schwa",
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "the-things-they-re-doing-now-pops-i-mean-it-s-on-a-whole-other-level",
    "file": "/audio/native-phrases/the-things-they-re-doing-now-pops-i-mean-it-s-on-a-whole-other-level.mp3",
    "transcript": "The things they re doing now pops i mean it s on a whole other level",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "this-is-a-manhunt-pure-and-simple-so-let-s-get-to-work",
    "file": "/audio/native-phrases/this-is-a-manhunt-pure-and-simple-so-let-s-get-to-work.mp3",
    "transcript": "This is a manhunt pure and simple so let s get to work",
    "tags": [
      "discourse",
      "chunk"
    ]
  },
  {
    "slug": "three-measures-of-gordon-s-one-of-vodka-half-a-measure-of-quinoa-lily-shake-it-o",
    "file": "/audio/native-phrases/three-measures-of-gordon-s-one-of-vodka-half-a-measure-of-quinoa-lily-shake-it-o.mp3",
    "transcript": "Three measures of gordon s one of vodka half a measure of quinoa lily shake it o",
    "tags": [
      "schwa",
      "long"
    ]
  },
  {
    "slug": "we-use-these-meetings-to-go-over-our-daily-goals",
    "file": "/audio/native-phrases/we-use-these-meetings-to-go-over-our-daily-goals.mp3",
    "transcript": "We use these meetings to go over our daily goals",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "well-i-not-only-knew-about-it-i-made-it-happen",
    "file": "/audio/native-phrases/well-i-not-only-knew-about-it-i-made-it-happen.mp3",
    "transcript": "Well i not only knew about it i made it happen",
    "tags": [
      "past-tense",
      "discourse"
    ]
  },
  {
    "slug": "well-that-wasn-t-such-a-chore-now-was-it",
    "file": "/audio/native-phrases/well-that-wasn-t-such-a-chore-now-was-it.mp3",
    "transcript": "Well that wasn t such a chore now was it",
    "tags": [
      "past-tense",
      "discourse"
    ]
  },
  {
    "slug": "what-if-we-hit-it-off-become-a-thing-or-something",
    "file": "/audio/native-phrases/what-if-we-hit-it-off-become-a-thing-or-something.mp3",
    "transcript": "What if we hit it off become a thing or something",
    "tags": [
      "conditional",
      "question"
    ]
  },
  {
    "slug": "when-you-boxed-up-a-lot-of-old-kitchen-appliances-over-there-which-means-they-ve",
    "file": "/audio/native-phrases/when-you-boxed-up-a-lot-of-old-kitchen-appliances-over-there-which-means-they-ve.mp3",
    "transcript": "When you boxed up a lot of old kitchen appliances over there which means they ve",
    "tags": [
      "present-perfect",
      "question",
      "long"
    ]
  },
  {
    "slug": "yoga-and-i-thought-it-d-be-nice-to-come-up-here-and-stay-with-these-guys-for-a-w",
    "file": "/audio/native-phrases/yoga-and-i-thought-it-d-be-nice-to-come-up-here-and-stay-with-these-guys-for-a-w.mp3",
    "transcript": "Yoga and i thought it d be nice to come up here and stay with these guys for a w",
    "tags": [
      "schwa",
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "you-are-in-no-position-to-play-by-anybody-s-rules-but-mine",
    "file": "/audio/native-phrases/you-are-in-no-position-to-play-by-anybody-s-rules-but-mine.mp3",
    "transcript": "You are in no position to play by anybody s rules but mine",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "you-can-actually-do-a-spinny-thing",
    "file": "/audio/native-phrases/you-can-actually-do-a-spinny-thing.mp3",
    "transcript": "You can actually do a spinny thing",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "you-just-gotta-believe-in-yourself-and-you-pull-yourself-together-you-get-right-",
    "file": "/audio/native-phrases/you-just-gotta-believe-in-yourself-and-you-pull-yourself-together-you-get-right-.mp3",
    "transcript": "You just gotta believe in yourself and you pull yourself together you get right ",
    "tags": [
      "reductions",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "you-know-i-wish-my-parents-played-mozart-when-i-slept-because-half-the-time-i-do",
    "file": "/audio/native-phrases/you-know-i-wish-my-parents-played-mozart-when-i-slept-because-half-the-time-i-do.mp3",
    "transcript": "You know i wish my parents played mozart when i slept because half the time i do",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "you-know-if-i-ever-called-my-mother-a-liar-she-would-have-knocked-my-goddamn-hea",
    "file": "/audio/native-phrases/you-know-if-i-ever-called-my-mother-a-liar-she-would-have-knocked-my-goddamn-hea.mp3",
    "transcript": "You know if i ever called my mother a liar she would have knocked my goddamn hea",
    "tags": [
      "conditional",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "you-know-if-we-re-gonna-have-anything-in-common-it-s-just-hit-or-miss",
    "file": "/audio/native-phrases/you-know-if-we-re-gonna-have-anything-in-common-it-s-just-hit-or-miss.mp3",
    "transcript": "You know if we re gonna have anything in common it s just hit or miss",
    "tags": [
      "reductions",
      "conditional",
      "discourse",
      "chunk",
      "long"
    ]
  },
  {
    "slug": "you-said-that-if-i-showed-improvement-after-six-months-you-would-transfer-me-to-",
    "file": "/audio/native-phrases/you-said-that-if-i-showed-improvement-after-six-months-you-would-transfer-me-to-.mp3",
    "transcript": "You said that if i showed improvement after six months you would transfer me to ",
    "tags": [
      "past-tense",
      "conditional",
      "long"
    ]
  }
,
  {
    "slug": "you-have-got-to-take-the-upper-hand-in-all-situations-where-people-whether-they",
    "file": "/audio/native-phrases/you-have-got-to-take-the-upper-hand-in-all-situations-where-people-whether-they.mp3",
    "transcript": "You have got to take the upper hand in all situations where people, whether they are dead or alive, will walk all over you.",
    "tags": [
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "open-this-door-you-dead-people-or-we-ll-bust-it-down-and-we-ll-drag-you-out-by-t",
    "file": "/audio/native-phrases/open-this-door-you-dead-people-or-we-ll-bust-it-down-and-we-ll-drag-you-out-by-t.mp3",
    "transcript": "Open this door, you dead people, or we'll bust it down and we'll drag you out by the ropes you hanged yourself with.",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "well-my-mom-couldn-t-believe-that-i-only-put-my-clothes-to-the-washer-once-inste",
    "file": "/audio/native-phrases/well-my-mom-couldn-t-believe-that-i-only-put-my-clothes-to-the-washer-once-inste.mp3",
    "transcript": "Well, my mom couldn't believe that I only put my clothes to the washer once instead of three or five times.",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "i-think-the-exact-word-they-used-was-defiled-but-i-can-send-you-guys-a-link-if-y",
    "file": "/audio/native-phrases/i-think-the-exact-word-they-used-was-defiled-but-i-can-send-you-guys-a-link-if-y.mp3",
    "transcript": "I think the exact word they used was defiled, but I can send you guys a link if you wanna read more about it.",
    "tags": [
      "reductions",
      "past-tense",
      "conditional",
      "long"
    ]
  },
  {
    "slug": "i-m-gonna-round-it-up-some-supplies-and-we-re-gonna-dish-it-out",
    "file": "/audio/native-phrases/i-m-gonna-round-it-up-some-supplies-and-we-re-gonna-dish-it-out.mp3",
    "transcript": "I'm gonna round it up some supplies and we're gonna dish it out.",
    "tags": [
      "reductions"
    ]
  },
  {
    "slug": "abby-listen-you-need-to-step-away-for-perspective-clarity-on-what-s-happened",
    "file": "/audio/native-phrases/abby-listen-you-need-to-step-away-for-perspective-clarity-on-what-s-happened.mp3",
    "transcript": "Abby, listen, you need to step away for perspective, clarity on what's happened.",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "run-as-if-the-devil-himself-had-himself-upon-us",
    "file": "/audio/native-phrases/run-as-if-the-devil-himself-had-himself-upon-us.mp3",
    "transcript": "Run as if the devil himself had himself upon us!",
    "tags": [
      "past-tense",
      "conditional"
    ]
  },
  {
    "slug": "i-made-him-a-card-and-i-m-going-to-give-it-to-him-today",
    "file": "/audio/native-phrases/i-made-him-a-card-and-i-m-going-to-give-it-to-him-today.mp3",
    "transcript": "I made him a card and I'm going to give it to him today.",
    "tags": [
      "reductions",
      "past-tense"
    ]
  },
  {
    "slug": "i-ll-keep-you-posted-on-how-it-goes",
    "file": "/audio/native-phrases/i-ll-keep-you-posted-on-how-it-goes.mp3",
    "transcript": "I'll keep you posted on how it goes.",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "she-don-t-spend-money-on-nothing-but-vintage-and-wet-wipes",
    "file": "/audio/native-phrases/she-don-t-spend-money-on-nothing-but-vintage-and-wet-wipes.mp3",
    "transcript": "She don't spend money on nothing but vintage and wet wipes.",
    "tags": [
      "reductions"
    ]
  },
  {
    "slug": "don-t-fret",
    "file": "/audio/native-phrases/don-t-fret.mp3",
    "transcript": "Don't fret.",
    "tags": [
      "reductions",
      "short"
    ]
  },
  {
    "slug": "no-but-i-m-about-it-all",
    "file": "/audio/native-phrases/no-but-i-m-about-it-all.mp3",
    "transcript": "No, but I'm about it all.",
    "tags": [
      "reductions",
      "short"
    ]
  },
  {
    "slug": "i-was-told-marco-was-in-charge",
    "file": "/audio/native-phrases/i-was-told-marco-was-in-charge.mp3",
    "transcript": "I was told Marco was in charge.",
    "tags": [
      "past-tense"
    ]
  },
  {
    "slug": "you-come-to-this-country-take-advantage-of-the-system-and-think-because-we-are-t",
    "file": "/audio/native-phrases/you-come-to-this-country-take-advantage-of-the-system-and-think-because-we-are-t.mp3",
    "transcript": "You come to this country, take advantage of the system, and think because we are tolerant, we are weak and helpless.",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "your-arrogance-offends-me",
    "file": "/audio/native-phrases/your-arrogance-offends-me.mp3",
    "transcript": "Your arrogance offends me.",
    "tags": [
      "short"
    ]
  },
  {
    "slug": "he-s-gonna-hear-you-out-there-and-he-s-the-one-who-s-got-the-gun-so-he-s-the-one",
    "file": "/audio/native-phrases/he-s-gonna-hear-you-out-there-and-he-s-the-one-who-s-got-the-gun-so-he-s-the-one.mp3",
    "transcript": "He's gonna hear you out there, and he's the one who's got the gun, so he's the one who's in charge.",
    "tags": [
      "reductions",
      "past-tense",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "yes-well-kate-is-shacked-up-with-brody-at-the-sheraton-right-now-so-you-need-to",
    "file": "/audio/native-phrases/yes-well-kate-is-shacked-up-with-brody-at-the-sheraton-right-now-so-you-need-to.mp3",
    "transcript": "Yes, well, Kate is shacked up with Brody at the Sheraton right now, so you need to move on.",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "mike-tyson-can-touch-anybody-s-nose-without-them-even-seeing-him-flinch",
    "file": "/audio/native-phrases/mike-tyson-can-touch-anybody-s-nose-without-them-even-seeing-him-flinch.mp3",
    "transcript": "Mike Tyson can touch anybody's nose without them even seeing him flinch.",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "i-mean-not-the-blood-boiling-and-the-sky-and-stuff-but-you-want-to-buy-it",
    "file": "/audio/native-phrases/i-mean-not-the-blood-boiling-and-the-sky-and-stuff-but-you-want-to-buy-it.mp3",
    "transcript": "I mean, not the blood boiling and the sky and stuff, but you want to buy it.",
    "tags": [
      "discourse",
      "long"
    ]
  },
  {
    "slug": "money-truly-is-no-object",
    "file": "/audio/native-phrases/money-truly-is-no-object.mp3",
    "transcript": "Money truly is no object.",
    "tags": [
      "short"
    ]
  },
  {
    "slug": "yeah-yeah-yeah-i-can-make-it-down-there-right-now",
    "file": "/audio/native-phrases/yeah-yeah-yeah-i-can-make-it-down-there-right-now.mp3",
    "transcript": "Yeah, yeah, yeah, I can make it down there right now.",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "sorry-my-stepson-got-into-a-little-trouble-at-school",
    "file": "/audio/native-phrases/sorry-my-stepson-got-into-a-little-trouble-at-school.mp3",
    "transcript": "Sorry, my stepson got into a little trouble at school.",
    "tags": [
      "past-tense"
    ]
  },
  {
    "slug": "funny-you-mention-school",
    "file": "/audio/native-phrases/funny-you-mention-school.mp3",
    "transcript": "Funny you mention school.",
    "tags": [
      "short"
    ]
  },
  {
    "slug": "i-ll-be-damned-if-i-worked-all-these-years-so-my-little-girl-can-marry-a-roughne",
    "file": "/audio/native-phrases/i-ll-be-damned-if-i-worked-all-these-years-so-my-little-girl-can-marry-a-roughne.mp3",
    "transcript": "I'll be damned if I worked all these years so my little girl can marry a roughneck.",
    "tags": [
      "conditional",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "harry-just-sit-back-relax-and-put-on-a-little-free-arbordillo-driving-clinic-for",
    "file": "/audio/native-phrases/harry-just-sit-back-relax-and-put-on-a-little-free-arbordillo-driving-clinic-for.mp3",
    "transcript": "Harry, just sit back, relax, and put on a little free Arbordillo driving clinic for you.",
    "tags": [
      "long"
    ]
  },
  {
    "slug": "he-called-you-a-wildcat-before-i-didn-t-even-pick-up-on-it",
    "file": "/audio/native-phrases/he-called-you-a-wildcat-before-i-didn-t-even-pick-up-on-it.mp3",
    "transcript": "He called you a wildcat before I didn't even pick up on it.",
    "tags": [
      "general"
    ]
  },
  {
    "slug": "it-s-going-to-take-a-lot-to-drag-me-away-from-you",
    "file": "/audio/native-phrases/it-s-going-to-take-a-lot-to-drag-me-away-from-you.mp3",
    "transcript": "It's going to take a lot to drag me away from you.",
    "tags": [
      "reductions"
    ]
  },
  {
    "slug": "i-know-you-had-this-religious-experience-or-whatever-the-hell-that-was-but-you-b",
    "file": "/audio/native-phrases/i-know-you-had-this-religious-experience-or-whatever-the-hell-that-was-but-you-b.mp3",
    "transcript": "I know you had this religious experience or whatever the hell that was, but you better snap out of it and get your shit together or you're gonna get canned.",
    "tags": [
      "reductions",
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "speak-for-yourself-there-sport",
    "file": "/audio/native-phrases/speak-for-yourself-there-sport.mp3",
    "transcript": "Speak for yourself there, sport.",
    "tags": [
      "short"
    ]
  },
  {
    "slug": "well-come-hell-or-high-water-you-get-it-done-don-t-you",
    "file": "/audio/native-phrases/well-come-hell-or-high-water-you-get-it-done-don-t-you.mp3",
    "transcript": "Well, come hell or high water, you get it done, don't you?",
    "tags": [
      "reductions",
      "discourse",
      "question"
    ]
  },
  {
    "slug": "now-i-m-assuming-you-can-clear-up-this-little-mess-and-i-ll-be-glad-to-handle-th",
    "file": "/audio/native-phrases/now-i-m-assuming-you-can-clear-up-this-little-mess-and-i-ll-be-glad-to-handle-th.mp3",
    "transcript": "Now, I'm assuming you can clear up this little mess, and I'll be glad to handle this little bump in the road for your son.",
    "tags": [
      "reductions",
      "long"
    ]
  },
  {
    "slug": "i-had-two-different-harvard-statisticians-try-to-reverse-engineer-the-equation-t",
    "file": "/audio/native-phrases/i-had-two-different-harvard-statisticians-try-to-reverse-engineer-the-equation-t.mp3",
    "transcript": "I had two different Harvard statisticians try to reverse engineer the equation that you came up with.",
    "tags": [
      "past-tense",
      "long"
    ]
  },
  {
    "slug": "as-a-matter-of-fact-i-brought-you-a-peace-offering",
    "file": "/audio/native-phrases/as-a-matter-of-fact-i-brought-you-a-peace-offering.mp3",
    "transcript": "As a matter of fact i brought you a peace offering",
    "tags": [
      "past-tense",
      "chunk"
    ]
  },
  {
    "slug": "i-was-actually-up-all-night-running-the-numbers-identifying-new-markets-and-i-th",
    "file": "/audio/native-phrases/i-was-actually-up-all-night-running-the-numbers-identifying-new-markets-and-i-th.mp3",
    "transcript": "I was actually up all night running the numbers identifying new markets and i th",
    "tags": [
      "reductions",
      "past-tense",
      "discourse",
      "long"
    ]
  },
  {
    "slug": "sir-i-also-took-the-liberty-to-go-ahead-and-put-it-out-over-the-wire-and-see-if-",
    "file": "/audio/native-phrases/sir-i-also-took-the-liberty-to-go-ahead-and-put-it-out-over-the-wire-and-see-if-.mp3",
    "transcript": "Sir i also took the liberty to go ahead and put it out over the wire and see if",
    "tags": [
      "past-tense",
      "conditional",
      "long"
    ]
  },
  {
    "slug": "and-the-language-she-uses-is-like-corporate-speak-run-riot",
    "file": "/audio/native-phrases/and-the-language-she-uses-is-like-corporate-speak-run-riot.mp3",
    "transcript": "And the language she uses is like corporate speak run riot",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "her-life-is-empty-so-she-wrecks-creative-companies-for-kicks",
    "file": "/audio/native-phrases/her-life-is-empty-so-she-wrecks-creative-companies-for-kicks.mp3",
    "transcript": "Her life is empty so she wrecks creative companies for kicks",
    "tags": [
      "discourse"
    ]
  },
  {
    "slug": "that-s-exactly-what-she-needs-a-decent-seeing-to",
    "file": "/audio/native-phrases/that-s-exactly-what-she-needs-a-decent-seeing-to.mp3",
    "transcript": "That's exactly what she needs a decent seeing to",
    "tags": [
      "general"
    ]
  },
];
