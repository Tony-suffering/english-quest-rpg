'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// =============================================================================
// TYPES
// =============================================================================

type CharacterName = 'yuki' | 'gondo' | 'takeshi' | 'lisa' | 'kenji' | 'mina'

type Episode = {
  num: number
  title: string
  titleJa: string
  location: string
  characters: CharacterName[]
  hook: string
  synopsis: string
  vocabThemes: string[]
  majorMoments: string[]
}

type Phase = {
  id: number
  name: string
  nameJa: string
  color: string
  colorLight: string
  epRange: [number, number]
  dayRange: [number, number]
  theme: string
  skills: string[]
  episodes: Episode[]
}

// =============================================================================
// CHARACTER DATA
// =============================================================================

const CHARACTER_COLORS: Record<CharacterName, string> = {
  yuki: '#D4AF37',
  gondo: '#78716C',
  takeshi: '#3B82F6',
  lisa: '#EC4899',
  kenji: '#92400E',
  mina: '#8B5CF6',
}

const CHARACTER_NAMES: Record<CharacterName, string> = {
  yuki: 'Yuki',
  gondo: 'Gondo',
  takeshi: 'Takeshi',
  lisa: 'Lisa',
  kenji: 'Kenji',
  mina: 'Mina',
}

// =============================================================================
// PHASE & EPISODE DATA
// =============================================================================

const PHASES: Phase[] = [
  {
    id: 1,
    name: 'SURVIVAL',
    nameJa: 'サバイバル編',
    color: '#10B981',
    colorLight: '#D1FAE5',
    epRange: [1, 13],
    dayRange: [1, 91],
    theme: 'English is the enemy. Every word is a battle. The goal: survive another day.',
    skills: [
      'Basic self-introduction and greetings',
      'Ordering food and drinks',
      'Simple workplace conversation',
      'Asking for and giving directions',
      'Daily life vocabulary and survival phrases',
    ],
    episodes: [
      { num: 1, title: 'The First Step', titleJa: '最初の一歩', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'TOEIC scores are not enough. The first word is the hardest.', synopsis: 'Yuki freezes when a foreign client visits her trading company. After work, she stumbles into Gondo\'s izakaya and discovers that Takeshi, Lisa, Kenji, and Mina share the same problem -- high test scores, zero speaking ability. Gondo, the old barkeep who once worked overseas, proposes English Hour: one hour each night, English only.', vocabThemes: ['Work & Daily Life', 'Greetings & Self-Introduction', 'Feelings & Emotions'], majorMoments: ['Yuki freezes at work', 'Everyone shares the same problem', 'First English Hour begins', 'Yuki says Good Morning at the office'] },
      { num: 2, title: 'Lost in Translation', titleJa: '通じない', location: 'Trading Company', characters: ['yuki', 'lisa'], hook: 'First real attempt. Nothing lands.', synopsis: 'Yuki tries to explain a product to an English-speaking partner at work. Every sentence crashes. Lisa, the marketing freelancer who handles overseas clients, watches from the next desk and recognizes herself from six months ago. She offers to practice together at the izakaya.', vocabThemes: ['Meeting vocabulary', 'Asking for clarification', '"Sorry, one more time"'], majorMoments: ['Yuki\'s first professional English failure', 'Lisa offers to be her practice partner'] },
      { num: 3, title: 'Convenience Store English', titleJa: 'コンビニ英語', location: 'Convenience Store', characters: ['yuki', 'takeshi'], hook: 'Survival shopping in English.', synopsis: 'Takeshi, the IT engineer who reads English documentation daily but has never spoken it, challenges Yuki to buy everything at the convenience store in English. Simple transactions become battlegrounds. "Bag, please" feels like a victory speech.', vocabThemes: ['Shopping vocabulary', 'Numbers and prices', 'Polite requests'], majorMoments: ['Yuki completes her first full English transaction', 'Takeshi realizes reading and speaking are different worlds'] },
      { num: 4, title: 'The Old Man Knows', titleJa: '爺さんの秘密', location: 'Gondo\'s Izakaya', characters: ['gondo', 'kenji'], hook: 'Gondo\'s past surfaces.', synopsis: 'Kenji, a construction foreman who thinks English is useless for his trade, stays late at the izakaya. Gondo tells him about working on a construction project in Singapore thirty years ago. English saved his life on a job site. Kenji listens differently after that.', vocabThemes: ['Construction and trade vocabulary', 'Past tense narratives', 'Safety phrases'], majorMoments: ['Gondo\'s overseas past revealed', 'Kenji starts taking English Hour seriously'] },
      { num: 5, title: 'First English Hour', titleJa: '初めてのEnglish Hour', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa'], hook: 'One hour. English only. Total disaster.', synopsis: 'The first official English Hour at Gondo\'s izakaya. Yuki, Takeshi, and Lisa attempt to hold a full conversation in English for sixty minutes. Long silences. Broken grammar. Gondo pours drinks and corrects gently. It is painful and necessary.', vocabThemes: ['Bar and drink vocabulary', 'Ordering phrases', 'Small talk basics'], majorMoments: ['English Hour officially established', 'Gondo\'s gentle teaching style revealed', 'First complete English conversation among the group'] },
      { num: 6, title: 'Mina\'s Secret', titleJa: 'ミナの秘密', location: 'Cafe', characters: ['mina', 'yuki'], hook: 'Perfect grammar. Zero confidence.', synopsis: 'Mina, a university student studying abroad next year, has near-perfect written English. But she has never spoken it to a real person. At a cafe, Yuki catches Mina rehearsing English phrases alone and drags her to the izakaya. Mina\'s problem is not English. It is fear.', vocabThemes: ['Academic vocabulary', 'Describing feelings', 'Self-introduction practice'], majorMoments: ['Mina\'s social anxiety with spoken English revealed', 'Yuki becomes Mina\'s anchor'] },
      { num: 7, title: 'Email Panic', titleJa: 'メールパニック', location: 'IT Office', characters: ['takeshi'], hook: 'Writing English is easy. Sending it is terrifying.', synopsis: 'Takeshi drafts a perfect English email to a client in San Francisco. His finger hovers over Send for eleven minutes. He rewrites it four times. The reply comes in casual English he cannot parse. Textbook English and real English are not the same language.', vocabThemes: ['Email and business writing', 'Formal vs casual register', 'Technology vocabulary'], majorMoments: ['Gap between written and spoken English exposed', 'Takeshi\'s perfectionism becomes his obstacle'] },
      { num: 8, title: 'The Foreigner at the Counter', titleJa: 'カウンターの外国人', location: 'Gondo\'s Izakaya', characters: ['gondo', 'lisa', 'kenji'], hook: 'A tourist walks in. Real English. No rehearsal.', synopsis: 'An American tourist wanders into Gondo\'s izakaya looking for a recommendation. Gondo nudges Lisa and Kenji to handle it. Lisa manages fragments. Kenji freezes completely. The tourist is patient and kind. The encounter lasts three minutes but changes everything.', vocabThemes: ['Restaurant recommendations', 'Describing food', 'Helping strangers'], majorMoments: ['First unscripted English encounter with a native speaker', 'Kenji\'s total freeze motivates him'] },
      { num: 9, title: 'Gondo\'s Rules', titleJa: 'ゴンドのルール', location: 'Gondo\'s Izakaya', characters: ['gondo', 'yuki', 'takeshi', 'mina'], hook: 'No dictionaries. No phones. Just talk.', synopsis: 'Gondo introduces the rules for English Hour: no looking up words, no Japanese whispers, no phone translators. If you do not know the word, describe it. Takeshi argues this is inefficient. Gondo says efficiency is not the point. Communication is.', vocabThemes: ['Describing objects without vocabulary', 'Circumlocution strategies', 'Learning philosophy'], majorMoments: ['English Hour rules formalized', 'Gondo\'s teaching philosophy crystallizes'] },
      { num: 10, title: 'Direction Panic', titleJa: '道案内パニック', location: 'Train Station', characters: ['yuki', 'kenji'], hook: 'Tourist asks for directions. Total chaos.', synopsis: 'Yuki and Kenji are at the station when a tourist asks for directions. Everything from English Hour vanishes. Yuki points and grunts. Kenji draws a map. They fumble through it together. The tourist finds the place. Yuki and Kenji look at each other and start laughing.', vocabThemes: ['Directions vocabulary', 'Location prepositions', 'Helping strangers'], majorMoments: ['First joint English attempt outside the izakaya', 'Failure becomes bonding experience'] },
      { num: 11, title: 'Lisa\'s Client Call', titleJa: 'リサのクライアント', location: 'Marketing Agency', characters: ['lisa'], hook: 'Phone rings. English only. No hiding.', synopsis: 'Lisa\'s overseas client calls unexpectedly. No email buffer. No time to prepare. Pure spoken English for twelve minutes. She stumbles, recovers, loses a word, finds another. After hanging up, her hands shake. The client emails: "Great call. Looking forward to next steps."', vocabThemes: ['Phone conversation', 'Business small talk', 'Confirming and clarifying'], majorMoments: ['Lisa\'s first successful English phone call', 'Gap between self-perception and actual ability'] },
      { num: 12, title: 'The Regulars', titleJa: '常連たち', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'All six together. Something clicks.', synopsis: 'A rainy Thursday. All six are at the izakaya at the same time for the first time in weeks. English Hour runs long -- ninety minutes. Nobody notices. Conversations overlap. Mistakes fly. Laughter fills the gaps. Gondo watches from behind the counter. The ensemble is complete.', vocabThemes: ['Group conversation', 'Describing people', 'Sharing opinions casually'], majorMoments: ['Full cast assembled and comfortable together', 'English Hour extends naturally for the first time'] },
      { num: 13, title: 'The Presentation', titleJa: '初プレゼン', location: 'Trading Company', characters: ['yuki', 'lisa'], hook: 'First English presentation. Everything on the line.', synopsis: 'Yuki delivers her first English presentation to the overseas partner. Her grammar is rough. Her pronunciation wavers. But her product knowledge shines through. The partner nods, asks questions, and shakes her hand. Lisa watches from the back row and texts the izakaya group: "She did it."', vocabThemes: ['Presentation vocabulary', 'Describing products and processes', 'Connecting ideas'], majorMoments: ['Phase 1 climax: Yuki\'s first real English achievement', 'Group celebrates at the izakaya'] },
    ],
  },
  {
    id: 2,
    name: 'SOCIAL',
    nameJa: 'ソーシャル編',
    color: '#3B82F6',
    colorLight: '#DBEAFE',
    epRange: [14, 26],
    dayRange: [92, 182],
    theme: 'Survival is handled. Now comes the hard part: saying what you actually mean.',
    skills: [
      'Expressing opinions and disagreement',
      'Emotional vocabulary and nuance',
      'Humor, sarcasm, and tone',
      'Apologizing and resolving conflict',
      'Cultural communication differences',
    ],
    episodes: [
      { num: 14, title: 'Opinions', titleJa: '意見', location: 'Trading Company', characters: ['yuki', 'takeshi'], hook: 'Yuki says what she thinks. In English.', synopsis: 'A product meeting with the overseas team. Takeshi handles the technical specs, but when the client pushes back on a design choice, Yuki speaks up. Not rehearsed. Not polished. Real opinion, real English. The client listens. Takeshi stares.', vocabThemes: ['Opinion expressions', 'Agreement and disagreement', 'Professional debate'], majorMoments: ['Yuki transitions from survival English to expressive English'] },
      { num: 15, title: 'The Argument', titleJa: '口喧嘩', location: 'Gondo\'s Izakaya', characters: ['kenji', 'lisa'], hook: 'First real fight. In English.', synopsis: 'Kenji makes a blunt comment about marketing being "just talk." Lisa fires back in English because switching to Japanese would feel like retreating. The argument is clumsy, raw, and the most honest conversation they have had. Gondo does not intervene.', vocabThemes: ['Argument and conflict', 'Blame and responsibility', 'Emotional intensity'], majorMoments: ['English becomes the language of real emotion', 'Kenji-Lisa dynamic shifts permanently'] },
      { num: 16, title: 'Slang Wars', titleJa: 'スラング戦争', location: 'Gondo\'s Izakaya', characters: ['mina', 'takeshi', 'gondo'], hook: 'Textbook English vs real English. Who wins?', synopsis: 'Mina uses "lowkey" and "no cap" she learned from TikTok. Takeshi insists on proper grammar. Gondo listens and tells them both a story about misunderstanding Singlish in 1990s Singapore. There is no correct English. There is English that works.', vocabThemes: ['Slang and informal English', 'Register awareness', 'Generational language gaps'], majorMoments: ['Debate on "correct" English', 'Gondo bridges the generational gap'] },
      { num: 17, title: 'What I Really Mean', titleJa: '本当に言いたいこと', location: 'Cafe', characters: ['yuki', 'mina'], hook: 'Behind the words. The feelings.', synopsis: 'Mina confesses to Yuki that she can construct perfect sentences but cannot express how she feels. "I can say I am happy. I cannot say why." Yuki realizes she has the opposite problem -- all feeling, no structure. They decide to teach each other.', vocabThemes: ['Emotional vocabulary', 'Describing inner states', 'Nuance in English'], majorMoments: ['Yuki-Mina partnership deepens', 'Theme: language is more than grammar'] },
      { num: 18, title: 'The Client Dinner', titleJa: '接待ディナー', location: 'Restaurant', characters: ['yuki', 'lisa', 'takeshi'], hook: 'No scripts. No safety net. English dinner.', synopsis: 'The trading company hosts dinner for the overseas partner. Yuki, Lisa, and Takeshi must navigate two hours of English small talk over sushi. Topics jump from weather to childhood to politics. The hardest English is the kind with no agenda.', vocabThemes: ['Dining vocabulary', 'Small talk mastery', 'Cultural topics'], majorMoments: ['Group handles unscripted social English', 'Takeshi loosens up for the first time'] },
      { num: 19, title: 'Homesick in English', titleJa: '英語のホームシック', location: 'Gondo\'s Izakaya', characters: ['mina', 'gondo'], hook: 'Mina breaks down. In English.', synopsis: 'With study abroad approaching, Mina panics. She tells Gondo she is afraid of being alone in a country where Japanese does not exist. Gondo pours her tea and says: "Loneliness sounds the same in every language. That is how you know you are human."', vocabThemes: ['Feelings and loneliness', 'Future fears', 'Comfort and encouragement'], majorMoments: ['Mina\'s deepest vulnerability exposed', 'Gondo as emotional anchor'] },
      { num: 20, title: 'Construction English', titleJa: '現場の英語', location: 'Construction Site', characters: ['kenji', 'yuki'], hook: 'English on the job site. Nobody expected this.', synopsis: 'A foreign subcontractor arrives at Kenji\'s construction site. Yuki comes to help translate but Kenji waves her off. He has been studying trade vocabulary at the izakaya. His English is rough but the subcontractor understands every word. On a construction site, clarity beats grammar.', vocabThemes: ['Trade and construction vocabulary', 'Giving instructions', 'Safety communication'], majorMoments: ['Kenji uses English independently at work', 'Practical English > textbook English'] },
      { num: 21, title: 'Gondo\'s Story', titleJa: 'ゴンドの話', location: 'Gondo\'s Izakaya', characters: ['gondo', 'kenji', 'yuki'], hook: 'Why he opened this place. The real reason.', synopsis: 'Late night. Only Kenji and Yuki remain. Gondo tells them about his wife who died before he could take her to London as promised. He learned English for her. She never heard him speak it. The izakaya is his way of making sure the language lives.', vocabThemes: ['Past experiences', 'Storytelling in English', 'Love and loss vocabulary'], majorMoments: ['Gondo\'s complete backstory revealed', 'The izakaya\'s true origin'] },
      { num: 22, title: 'The Apology', titleJa: '謝罪', location: 'Gondo\'s Izakaya', characters: ['kenji', 'lisa'], hook: 'Saying sorry in English is harder than it sounds.', synopsis: 'Kenji tries to apologize for the argument in Episode 15. In Japanese, he would bow and it would be done. In English, he has to find the words. "I was wrong" is three words and the hardest sentence he has ever built. Lisa accepts. They drink.', vocabThemes: ['Apology expressions', 'Taking responsibility', 'Reconciliation language'], majorMoments: ['Kenji masters emotional English', 'Kenji-Lisa reconciliation'] },
      { num: 23, title: 'Cross-Cultural', titleJa: '文化の壁', location: 'Trading Company', characters: ['yuki', 'takeshi', 'lisa'], hook: '"Read the air" vs "Say it out loud."', synopsis: 'The overseas partner wants direct feedback on a product prototype. Yuki\'s instinct is to imply. Takeshi wants to send data. Lisa suggests they just say what they think. Three Japanese professionals discover that cross-cultural communication is not about English -- it is about honesty.', vocabThemes: ['Cultural communication', 'Direct vs indirect speech', 'Workplace culture'], majorMoments: ['Cultural translation theme introduced', 'Team learns directness'] },
      { num: 24, title: 'Liquid Courage', titleJa: '酔いの力', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'Third beer. English flows like water.', synopsis: 'An especially lively English Hour. Everyone has had a few drinks. Suddenly the grammar is terrible but the communication is perfect. Mina tells a joke. Kenji laughs in English. Lisa and Takeshi finish each other\'s sentences. Gondo raises his glass: "This. This is fluency."', vocabThemes: ['Social vocabulary', 'Humor and jokes', 'Casual conversation'], majorMoments: ['Breakthrough moment for the group', 'Gondo defines fluency as connection, not correctness'] },
      { num: 25, title: 'The Video Call', titleJa: 'ビデオ通話', location: 'Mina\'s Apartment', characters: ['mina', 'yuki'], hook: 'Mina\'s first call with her host family.', synopsis: 'Mina video-calls her American host family for the first time. Yuki sits next to her off-camera for moral support. The family is warm and talks fast. Mina understands seventy percent. She laughs at the right moments. After hanging up, she cries -- from relief.', vocabThemes: ['Video call vocabulary', 'Family introductions', 'Expressing excitement and nervousness'], majorMoments: ['Mina connects with real Americans', 'Confidence breakthrough'] },
      { num: 26, title: 'Summer Festival', titleJa: '夏祭り', location: 'Local Festival', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'All arcs collide under the lanterns.', synopsis: 'Summer festival in the neighborhood. All six navigate the crowd. Kenji explains yakitori to a tourist couple in English. Mina translates for a lost foreign child. Takeshi photographs everything and narrates in English. Yuki and Lisa run a booth. Gondo watches from a bench, smiling. A snapshot of a family forming.', vocabThemes: ['Festival and event vocabulary', 'Cultural explanation in English', 'Group conversation'], majorMoments: ['Phase 2 climax: all character arcs intersect', 'The group becomes a unit'] },
    ],
  },
  {
    id: 3,
    name: 'REAL LIFE',
    nameJa: 'リアルライフ編',
    color: '#F59E0B',
    colorLight: '#FEF3C7',
    epRange: [27, 39],
    dayRange: [183, 273],
    theme: 'English is no longer the problem. Life is the problem. English is the tool.',
    skills: [
      'Professional negotiation and persuasion',
      'Public speaking and presentation',
      'Complex storytelling and narration',
      'Cultural mediation and explanation',
      'High-stakes emotional communication',
    ],
    episodes: [
      { num: 27, title: 'Solo Mission', titleJa: '一人の任務', location: 'Trading Company', characters: ['yuki'], hook: 'Yuki leads. No backup.', synopsis: 'The overseas partner requests a solo meeting with Yuki. No Lisa. No Takeshi. Just her and three native English speakers in a conference room. She prepares for a week. The meeting lasts forty minutes. She does not understand every word. She does not need to.', vocabThemes: ['Project management', 'Leadership vocabulary', 'Professional autonomy'], majorMoments: ['Yuki handles a solo English meeting'] },
      { num: 28, title: 'The Bid', titleJa: '入札', location: 'Construction Office', characters: ['kenji', 'takeshi'], hook: 'English bid document. Kenji\'s future depends on it.', synopsis: 'A foreign developer wants bids for a renovation project. Kenji understands the specs but cannot write the proposal. Takeshi helps him translate construction language into business English. The bid is submitted. Kenji waits. English just became a career tool.', vocabThemes: ['Business proposals', 'Numbers and budgets', 'Formal written English'], majorMoments: ['Kenji\'s career directly tied to English for the first time', 'Kenji-Takeshi teamwork'] },
      { num: 29, title: 'Gondo\'s Health', titleJa: 'ゴンドの体調', location: 'Gondo\'s Izakaya', characters: ['gondo', 'yuki', 'kenji'], hook: 'The old man coughs. Nobody says anything.', synopsis: 'Gondo seems tired. His movements are slower. He mixes up orders. Yuki and Kenji notice but say nothing. During English Hour, Gondo forgets an English word he has used a thousand times. The room goes quiet. Something is changing.', vocabThemes: ['Health vocabulary', 'Expressing concern', 'Describing symptoms'], majorMoments: ['Gondo\'s health decline hinted', 'Emotional stakes raised'] },
      { num: 30, title: 'Mina\'s Departure', titleJa: 'ミナの出発', location: 'Airport', characters: ['mina', 'yuki', 'gondo', 'lisa'], hook: 'Study abroad begins. No going back.', synopsis: 'Mina flies to California. At the airport, the group sees her off. Yuki hands her a notebook filled with phrases from English Hour. Gondo says: "You already speak English. Now go live in it." Mina boards the plane. The izakaya will have one empty seat tonight.', vocabThemes: ['Farewell vocabulary', 'Travel and airport phrases', 'Encouragement'], majorMoments: ['Mina leaves for America', 'Emotional farewell at the airport'] },
      { num: 31, title: 'Across the Ocean', titleJa: '海の向こう', location: 'Video Call', characters: ['mina', 'takeshi'], hook: 'First week abroad. Everything is different.', synopsis: 'Mina calls Takeshi from California. Her English is being tested every second. The accent is different. The speed is faster. But she ordered coffee, made a friend, and understood a lecture. Takeshi asks her to explain it all in English. She does.', vocabThemes: ['Study abroad experiences', 'Describing daily life', 'Cultural differences'], majorMoments: ['Mina\'s growth in real immersion', 'Takeshi inspired by Mina\'s courage'] },
      { num: 32, title: 'The Podcast', titleJa: 'ポッドキャスト', location: 'Takeshi\'s Apartment', characters: ['takeshi', 'lisa'], hook: 'Takeshi starts an English podcast. Nobody listens.', synopsis: 'Takeshi launches a tech podcast in English. Lisa helps with marketing. The first episode gets seven listeners. The audio quality is bad. His pronunciation needs work. But he publishes episode two the next week. Then three. Consistency beats perfection.', vocabThemes: ['Media and content creation', 'Technology topics', 'Describing processes'], majorMoments: ['Takeshi finds his own English project', 'Lisa supports from the marketing side'] },
      { num: 33, title: 'The Foreman Speaks', titleJa: '親方、喋る', location: 'Construction Site', characters: ['kenji'], hook: 'Site meeting. English only. Kenji chairs it.', synopsis: 'The foreign developer holds an on-site progress meeting. Kenji, who froze at a convenience store eight months ago, chairs the discussion in English. His grammar is still rough. His vocabulary is construction-grade. Nobody cares. The project is on schedule because Kenji communicates.', vocabThemes: ['Meeting management', 'Progress reports', 'Team coordination'], majorMoments: ['Kenji leads a professional meeting in English'] },
      { num: 34, title: 'The Quiet Night', titleJa: '静かな夜', location: 'Gondo\'s Izakaya', characters: ['gondo', 'yuki'], hook: 'Just Gondo and Yuki. No English Hour.', synopsis: 'A slow night. Only Yuki comes. Gondo does not start English Hour. They talk -- half Japanese, half English -- about nothing important. Favorite seasons. Old memories. The sound of rain. Yuki realizes the izakaya taught her something English Hour never could: how to be comfortable in silence, in any language.', vocabThemes: ['Casual conversation', 'Describing memories', 'Philosophical reflection'], majorMoments: ['Gondo-Yuki bond deepens', 'Theme: language is beyond words'] },
      { num: 35, title: 'Culture Shock', titleJa: 'カルチャーショック', location: 'Video Call', characters: ['mina', 'yuki', 'lisa'], hook: 'Mina calls home. She\'s not OK.', synopsis: 'Three months in California. Mina hits a wall. She calls Yuki and Lisa crying. She understands everything but belongs nowhere. Lisa, who has navigated overseas clients for years, tells her: "That feeling is not failure. It is growth. Growth always hurts." Mina goes back to class the next day.', vocabThemes: ['Emotions and mental health', 'Encouragement', 'Belonging and identity'], majorMoments: ['Mina\'s lowest point abroad', 'Lisa as unexpected mentor'] },
      { num: 36, title: 'The Big Pitch', titleJa: '大勝負', location: 'Conference Room', characters: ['yuki', 'takeshi', 'lisa'], hook: 'Company future on the line. English presentation.', synopsis: 'The trading company bids for a major international contract. Yuki presents the proposal. Takeshi handles the tech demo. Lisa manages Q&A. All in English. The competing firm has native speakers. Yuki\'s team has something better: they know the product and each other. They win.', vocabThemes: ['Persuasion and pitching', 'Teamwork vocabulary', 'Competitive language'], majorMoments: ['Biggest professional English challenge yet', 'Team synergy pays off'] },
      { num: 37, title: 'Kenji\'s Regret', titleJa: '健治の後悔', location: 'Gondo\'s Izakaya', characters: ['kenji', 'gondo'], hook: 'Twenty years of avoiding English. What it cost.', synopsis: 'Kenji wins the bid. He should celebrate. Instead, he sits at the izakaya and tells Gondo about every opportunity he missed because he could not speak English. A promotion. A project in Dubai. A conversation with his daughter\'s foreign teacher. Gondo says: "You are here now. That counts."', vocabThemes: ['Regret and reflection', 'Past missed opportunities', 'Encouragement and acceptance'], majorMoments: ['Kenji\'s emotional vulnerability', 'Gondo\'s wisdom'] },
      { num: 38, title: 'The Offer', titleJa: 'オファー', location: 'Trading Company', characters: ['yuki', 'lisa'], hook: 'Yuki gets the overseas transfer offer.', synopsis: 'After the successful pitch, headquarters offers Yuki a two-year transfer to the London office. She stares at the email. London. English every day. No izakaya. No Gondo. No English Hour. She tells Lisa first. Lisa says: "This is what English Hour was for."', vocabThemes: ['Career decisions', 'Pros and cons', 'Life-changing choices'], majorMoments: ['Yuki\'s central conflict activated', 'Stakes reach personal level'] },
      { num: 39, title: 'The Toast', titleJa: '乾杯', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji'], hook: 'One toast. Every thread pulled tight.', synopsis: 'Yuki gathers everyone at the izakaya. She tells them about the London offer. The room goes quiet. Gondo pours for everyone. Kenji raises his glass first, in English: "To the woman who could not say good morning." Everyone laughs. Everyone cries. Gondo says nothing. He smiles.', vocabThemes: ['Formal toasts', 'Expressing gratitude', 'Farewell and encouragement'], majorMoments: ['Phase 3 climax: the group faces separation', 'Kenji\'s toast mirrors Episode 1'] },
    ],
  },
  {
    id: 4,
    name: 'FLUENCY',
    nameJa: 'フルエンシー編',
    color: '#8B5CF6',
    colorLight: '#EDE9FE',
    epRange: [40, 52],
    dayRange: [274, 365],
    theme: 'Not perfect English. Not native English. Your English. That is enough.',
    skills: [
      'Humor, wit, and wordplay',
      'Nuanced emotional expression',
      'Mentoring and teaching others',
      'Identity and self-expression',
      'Complete communicative independence',
    ],
    episodes: [
      { num: 40, title: 'The Joke', titleJa: '冗談', location: 'Gondo\'s Izakaya', characters: ['kenji', 'lisa', 'takeshi'], hook: 'Kenji makes everyone laugh. In English.', synopsis: 'English Hour. Kenji tells a joke. Not translated from Japanese. An original English joke about a foreman and a blueprint. Lisa laughs so hard she spills her drink. Takeshi records it for his podcast. Humor is the final frontier of fluency. Kenji just crossed it.', vocabThemes: ['Humor and wordplay', 'Timing and delivery', 'Spontaneous speech'], majorMoments: ['Kenji achieves natural humor in English'] },
      { num: 41, title: 'Teaching the New Guy', titleJa: '新人教育', location: 'Construction Site', characters: ['kenji'], hook: 'Now Kenji is the teacher.', synopsis: 'A new worker joins Kenji\'s site. Young, ambitious, terrified of the foreign subcontractors. Kenji teaches him the same phrases Gondo taught at the izakaya. The cycle continues. When Kenji says "Don\'t think. Just talk," he sounds exactly like Gondo.', vocabThemes: ['Teaching and mentoring', 'Giving instructions', 'Encouragement'], majorMoments: ['Kenji becomes a teacher', 'Gondo\'s philosophy passes on'] },
      { num: 42, title: 'Mina\'s Return', titleJa: 'ミナの帰国', location: 'Gondo\'s Izakaya', characters: ['mina', 'yuki', 'gondo', 'takeshi'], hook: 'She left scared. She comes back different.', synopsis: 'Mina returns from California. She walks into the izakaya and orders in English without thinking. Her accent has shifted. Her confidence has transformed. But when Gondo says "Okaeri," she cries. Some words do not need translation.', vocabThemes: ['Homecoming vocabulary', 'Describing change', 'Comparing past and present'], majorMoments: ['Mina\'s transformation visible', 'Emotional reunion at the izakaya'] },
      { num: 43, title: 'Real Talk', titleJa: '本音', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo'], hook: 'No English Hour. Just truth.', synopsis: 'Late night. Yuki asks Gondo whether she should take the London offer. Gondo does not answer directly. He tells her about the trip he never took with his wife. "I waited for the right time. There was no right time." The conversation is half English, half Japanese. It does not matter which half.', vocabThemes: ['Life advice', 'Abstract concepts', 'Decision-making language'], majorMoments: ['Gondo\'s most personal advice', 'Yuki faces her decision'] },
      { num: 44, title: 'Lisa\'s Leap', titleJa: 'リサの飛躍', location: 'Marketing Agency', characters: ['lisa', 'takeshi'], hook: 'Lisa goes independent. English is her weapon.', synopsis: 'Lisa quits her agency and launches her own bilingual marketing firm. Takeshi builds her website. Her pitch to the first client is entirely in English. She does not get the contract. She gets the next one. And the one after that.', vocabThemes: ['Entrepreneurship', 'Pitching and selling', 'Business independence'], majorMoments: ['Lisa\'s career arc peaks', 'English as professional currency'] },
      { num: 45, title: 'The Podcast Hits', titleJa: 'ポッドキャスト成功', location: 'Studio', characters: ['takeshi', 'mina'], hook: 'One thousand subscribers. Takeshi cannot believe it.', synopsis: 'Takeshi\'s English tech podcast crosses one thousand subscribers. Mina, back from California, guests on an episode about studying abroad and technology culture in America. The episode goes viral in the Japanese English-learning community. Takeshi finally has his thing.', vocabThemes: ['Success and milestones', 'Interview format', 'Technology and culture'], majorMoments: ['Takeshi\'s podcast succeeds', 'Mina as confident guest speaker'] },
      { num: 46, title: 'Under Pressure', titleJa: 'プレッシャー', location: 'Trading Company', characters: ['yuki', 'lisa'], hook: 'Biggest deal yet. English-only week.', synopsis: 'The trading company hosts the overseas partner\'s executives for a full week. English-only meetings from nine to six. Yuki leads. Lisa consults. By Wednesday, Yuki stops translating in her head. By Friday, she dreams in English. The deal closes.', vocabThemes: ['Extended business English', 'Negotiation stamina', 'High-pressure communication'], majorMoments: ['Yuki stops mentally translating -- true fluency'] },
      { num: 47, title: 'The Decision', titleJa: '決断', location: 'Yuki\'s Apartment', characters: ['yuki'], hook: 'London or the izakaya. She cannot have both.', synopsis: 'Yuki sits alone. The transfer deadline is tomorrow. She writes two emails: one accepting, one declining. She reads them both aloud. In English. The accepting email sounds like a stranger. The declining email sounds like her. She presses send.', vocabThemes: ['Decision-making', 'Identity and belonging', 'Writing formal emails'], majorMoments: ['Yuki makes her choice', 'Identity over ambition'] },
      { num: 48, title: 'Gondo Closes Early', titleJa: '早仕舞い', location: 'Gondo\'s Izakaya', characters: ['gondo', 'kenji'], hook: 'The lights go off at nine. That never happens.', synopsis: 'Gondo closes the izakaya at nine PM for the first time. Kenji finds him sitting outside. Gondo tells him the truth: his health is failing. The izakaya will close at the end of the year. Kenji says nothing for a long time. Then, in English: "We will figure it out."', vocabThemes: ['Health and serious news', 'Promises and commitment', 'Emotional support'], majorMoments: ['Gondo\'s health crisis revealed', 'Kenji\'s promise to the group'] },
      { num: 49, title: 'Saving English Hour', titleJa: 'English Hourを守れ', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'The izakaya might close. But English Hour cannot die.', synopsis: 'Kenji tells everyone about Gondo\'s health. Silence. Then Lisa speaks: "English Hour is not a place. It is us." They propose running the izakaya together on weekends so Gondo can rest. Yuki manages the schedule. Takeshi builds a website. Mina designs a sign. Kenji fixes the kitchen. The group that learned English at this counter now keeps it alive.', vocabThemes: ['Teamwork and collaboration', 'Planning and organizing', 'Expressing commitment'], majorMoments: ['Full cast unites to save the izakaya', 'English Hour becomes everyone\'s responsibility'] },
      { num: 50, title: 'One Year', titleJa: '一年', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'Three hundred and sixty-five days since the first word.', synopsis: 'One year since Yuki froze at work. One year since the first English Hour. The group celebrates. Gondo makes a toast in English -- slow, deliberate, and perfect. "One year ago, six strangers walked into a bar. Tonight, a family walks out." Glasses clink. Jazz plays.', vocabThemes: ['Anniversary and milestones', 'Reflection vocabulary', 'Celebration language'], majorMoments: ['Anniversary of English Hour', 'Gondo\'s toast as thematic resolution'] },
      { num: 51, title: 'The Conference', titleJa: 'カンファレンス', location: 'International Conference', characters: ['yuki', 'takeshi'], hook: 'Final presentation. This time, it flies.', synopsis: 'Yuki and Takeshi present at an international trade conference. Their English is not perfect. Yuki pauses mid-sentence. Takeshi mispronounces a word. They correct, continue, and connect. The audience applauds. Not because the English was flawless. Because the message was clear.', vocabThemes: ['Conference vocabulary', 'Professional excellence', 'Confident speaking'], majorMoments: ['Mirror of Episode 13: same task, transformed people'] },
      { num: 52, title: 'Last Call', titleJa: 'ラストオーダー', location: 'Gondo\'s Izakaya', characters: ['yuki', 'gondo', 'takeshi', 'lisa', 'kenji', 'mina'], hook: 'One year later. Every thread resolved.', synopsis: 'Last night of the year. Everyone at Gondo\'s izakaya. Yuki orders in English without thinking. Kenji teaches a phrase to the new regular. Lisa pitches a client on the phone. Mina translates for a tourist who wandered in. Takeshi records it all. Gondo wipes the counter. The same bar, the same people, a different language. Not better. Theirs.', vocabThemes: ['Farewell and continuation', 'Reflection and gratitude', 'Future plans'], majorMoments: ['Every character arc resolved', 'Series finale: English as identity, not skill'] },
    ],
  },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function EpisodesPage() {
  const [activePhase, setActivePhase] = useState<number>(0) // 0 = all
  const [expandedEp, setExpandedEp] = useState<number | null>(null)
  const [startedEps, setStartedEps] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const loaded = new Set<number>()
    for (let i = 1; i <= 52; i++) {
      if (localStorage.getItem(`365_ep_started_${i}`) === 'true') {
        loaded.add(i)
      }
    }
    setStartedEps(loaded)
  }, [])

  const toggleStarted = useCallback((num: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setStartedEps(prev => {
      const next = new Set(prev)
      if (next.has(num)) {
        next.delete(num)
        localStorage.removeItem(`365_ep_started_${num}`)
      } else {
        next.add(num)
        localStorage.setItem(`365_ep_started_${num}`, 'true')
      }
      return next
    })
  }, [])

  const getPhaseForEp = (num: number): Phase => {
    return PHASES.find(p => num >= p.epRange[0] && num <= p.epRange[1])!
  }

  const filteredPhases = activePhase === 0
    ? PHASES
    : PHASES.filter(p => p.id === activePhase)

  const totalStarted = startedEps.size

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #1C1917 100%)',
        padding: isMobile ? '48px 16px 40px' : '64px 32px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #10B981, #3B82F6, #F59E0B, #8B5CF6)',
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Link href="/english/365" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#A8A29E',
            fontSize: 13,
            textDecoration: 'none',
            marginBottom: 24,
            letterSpacing: '0.05em',
          }}>
            <span style={{ fontSize: 16 }}>&larr;</span>
            365 English Master Course
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 8,
          }}>
            <h1 style={{
              fontSize: isMobile ? 28 : 40,
              fontWeight: 700,
              color: '#FAFAF9',
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Episode Guide
            </h1>
            <span style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#D4AF37',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              52 Episodes
            </span>
          </div>
          <p style={{
            fontSize: 15,
            color: '#78716C',
            margin: '8px 0 0',
            lineHeight: 1.6,
          }}>
            One year. Six characters. One izakaya. The complete story of learning English through living it.
          </p>

          {/* Progress bar */}
          {totalStarted > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}>
                <span style={{ fontSize: 12, color: '#78716C', letterSpacing: '0.05em' }}>
                  PROGRESS
                </span>
                <span style={{ fontSize: 12, color: '#D4AF37', fontWeight: 600 }}>
                  {totalStarted} / 52
                </span>
              </div>
              <div style={{
                height: 4,
                background: '#44403C',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(totalStarted / 52) * 100}%`,
                  background: 'linear-gradient(90deg, #D4AF37, #F59E0B)',
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
          )}

          {/* Phase filter tabs */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 28,
            flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setActivePhase(0)}
              style={{
                padding: '8px 18px',
                borderRadius: 20,
                border: activePhase === 0 ? '1.5px solid #D4AF37' : '1.5px solid #44403C',
                background: activePhase === 0 ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                color: activePhase === 0 ? '#D4AF37' : '#78716C',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                transition: 'all 0.2s ease',
              }}
            >
              All
            </button>
            {PHASES.map(phase => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 20,
                  border: activePhase === phase.id
                    ? `1.5px solid ${phase.color}`
                    : '1.5px solid #44403C',
                  background: activePhase === phase.id
                    ? `${phase.color}22`
                    : 'transparent',
                  color: activePhase === phase.id ? phase.color : '#78716C',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'all 0.2s ease',
                }}
              >
                {isMobile ? `P${phase.id}` : `Phase ${phase.id}`}
                <span style={{
                  marginLeft: 6,
                  fontSize: 11,
                  opacity: 0.7,
                }}>
                  {phase.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Episode List */}
      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: isMobile ? '24px 16px 80px' : '40px 32px 80px',
      }}>
        {filteredPhases.map((phase, phaseIdx) => (
          <div key={phase.id}>
            {/* Phase Divider */}
            <div style={{
              margin: phaseIdx === 0 ? '0 0 32px' : '56px 0 32px',
              padding: isMobile ? '24px 20px' : '28px 32px',
              background: '#FAFAF9',
              borderLeft: `4px solid ${phase.color}`,
              borderRadius: '0 12px 12px 0',
              position: 'relative',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 8,
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: phase.color,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  Phase {phase.id}
                </span>
                <span style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1C1917',
                }}>
                  {phase.name}
                </span>
                <span style={{
                  fontSize: 14,
                  color: '#78716C',
                }}>
                  {phase.nameJa}
                </span>
              </div>

              <div style={{
                display: 'flex',
                gap: 16,
                marginBottom: 12,
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontSize: 12,
                  color: '#A8A29E',
                  letterSpacing: '0.03em',
                }}>
                  Episodes {phase.epRange[0]}-{phase.epRange[1]}
                </span>
                <span style={{
                  fontSize: 12,
                  color: '#A8A29E',
                  letterSpacing: '0.03em',
                }}>
                  Day {phase.dayRange[0]}-{phase.dayRange[1]}
                </span>
              </div>

              <p style={{
                fontSize: 14,
                color: '#44403C',
                margin: '0 0 16px',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                {phase.theme}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
              }}>
                {phase.skills.map((skill, i) => (
                  <span key={i} style={{
                    fontSize: 11,
                    color: phase.color,
                    background: `${phase.color}12`,
                    padding: '4px 10px',
                    borderRadius: 6,
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Episode Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              {phase.episodes.map(ep => {
                const isExpanded = expandedEp === ep.num
                const isStarted = startedEps.has(ep.num)
                const isFullCast = ep.characters.length >= 6

                return (
                  <div
                    key={ep.num}
                    onClick={() => setExpandedEp(isExpanded ? null : ep.num)}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 12,
                      border: isExpanded
                        ? `1.5px solid ${phase.color}40`
                        : '1px solid #E7E5E4',
                      padding: isMobile ? '16px' : '20px 24px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isExpanded
                        ? `0 4px 20px ${phase.color}10`
                        : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Card Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: isMobile ? 12 : 16,
                    }}>
                      {/* Episode number */}
                      <div style={{
                        minWidth: 44,
                        height: 44,
                        borderRadius: 10,
                        background: `${phase.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}>
                        <span style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: phase.color,
                          fontVariantNumeric: 'tabular-nums',
                        }}>
                          {String(ep.num).padStart(2, '0')}
                        </span>
                        {isStarted && (
                          <div style={{
                            position: 'absolute',
                            top: -3,
                            right: -3,
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#D4AF37',
                            border: '2px solid #FFFFFF',
                          }} />
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          flexWrap: 'wrap',
                          marginBottom: 4,
                        }}>
                          <span style={{
                            fontSize: isMobile ? 15 : 16,
                            fontWeight: 600,
                            color: '#1C1917',
                          }}>
                            {ep.title}
                          </span>
                          <span style={{
                            fontSize: 13,
                            color: '#78716C',
                          }}>
                            {ep.titleJa}
                          </span>
                          {isFullCast && (
                            <span style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: '#D4AF37',
                              background: 'rgba(212, 175, 55, 0.1)',
                              padding: '2px 8px',
                              borderRadius: 4,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}>
                              Full Cast
                            </span>
                          )}
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          marginBottom: 6,
                          flexWrap: 'wrap',
                        }}>
                          <span style={{
                            fontSize: 12,
                            color: '#A8A29E',
                            letterSpacing: '0.02em',
                          }}>
                            {ep.location}
                          </span>

                          {/* Character dots */}
                          <div style={{
                            display: 'flex',
                            gap: 4,
                            alignItems: 'center',
                          }}>
                            {ep.characters.map(char => (
                              <div
                                key={char}
                                title={CHARACTER_NAMES[char]}
                                style={{
                                  width: 14,
                                  height: 14,
                                  borderRadius: '50%',
                                  background: CHARACTER_COLORS[char],
                                  border: '1.5px solid #FFFFFF',
                                  boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1)',
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        <p style={{
                          fontSize: 13,
                          color: '#44403C',
                          margin: 0,
                          lineHeight: 1.5,
                        }}>
                          {ep.hook}
                        </p>
                      </div>

                      {/* Expand indicator + started toggle */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        flexShrink: 0,
                      }}>
                        <button
                          onClick={(e) => toggleStarted(ep.num, e)}
                          title={isStarted ? 'Mark as not started' : 'Mark as started'}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            border: isStarted
                              ? '2px solid #D4AF37'
                              : '2px solid #E7E5E4',
                            background: isStarted
                              ? '#D4AF37'
                              : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            padding: 0,
                          }}
                        >
                          {isStarted && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7L6 10L11 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          <path d="M4 6L8 10L12 6" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div style={{
                        marginTop: 20,
                        paddingTop: 20,
                        borderTop: '1px solid #E7E5E4',
                      }}>
                        {/* Synopsis */}
                        <div style={{ marginBottom: 20 }}>
                          <h4 style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#A8A29E',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            margin: '0 0 8px',
                          }}>
                            Synopsis
                          </h4>
                          <p style={{
                            fontSize: 14,
                            color: '#44403C',
                            lineHeight: 1.7,
                            margin: 0,
                          }}>
                            {ep.synopsis}
                          </p>
                        </div>

                        {/* Vocab Themes */}
                        <div style={{ marginBottom: 20 }}>
                          <h4 style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#A8A29E',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            margin: '0 0 8px',
                          }}>
                            Vocabulary Themes
                          </h4>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6,
                          }}>
                            {ep.vocabThemes.map((theme, i) => (
                              <span key={i} style={{
                                fontSize: 12,
                                color: '#44403C',
                                background: '#F5F5F4',
                                padding: '4px 12px',
                                borderRadius: 6,
                                fontWeight: 500,
                              }}>
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Major Moments */}
                        <div style={{ marginBottom: 16 }}>
                          <h4 style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#A8A29E',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            margin: '0 0 8px',
                          }}>
                            Key Moments
                          </h4>
                          <ul style={{
                            margin: 0,
                            padding: 0,
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                          }}>
                            {ep.majorMoments.map((moment, i) => (
                              <li key={i} style={{
                                fontSize: 13,
                                color: '#44403C',
                                lineHeight: 1.5,
                                paddingLeft: 16,
                                position: 'relative',
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: 6,
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  background: phase.color,
                                  opacity: 0.6,
                                }} />
                                {moment}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Character List */}
                        <div>
                          <h4 style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#A8A29E',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            margin: '0 0 8px',
                          }}>
                            Characters
                          </h4>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 8,
                          }}>
                            {ep.characters.map(char => (
                              <div key={char} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                background: '#F5F5F4',
                                padding: '4px 12px 4px 6px',
                                borderRadius: 16,
                              }}>
                                <div style={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '50%',
                                  background: CHARACTER_COLORS[char],
                                }} />
                                <span style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: '#44403C',
                                }}>
                                  {CHARACTER_NAMES[char]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Bottom Stats */}
        <div style={{
          marginTop: 64,
          padding: isMobile ? '32px 20px' : '40px 32px',
          background: '#1C1917',
          borderRadius: 16,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#D4AF37',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: '0 0 24px',
          }}>
            365 English Master Course
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? 20 : 32,
          }}>
            {[
              { value: '52', label: 'Episodes' },
              { value: '3,640', label: 'Words' },
              { value: '3,640', label: 'Idioms' },
              { value: '365', label: 'Days' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 700,
                  color: '#FAFAF9',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#78716C',
                  marginTop: 6,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Phase breakdown mini */}
          <div style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: '1px solid #292524',
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? 16 : 32,
            flexWrap: 'wrap',
          }}>
            {PHASES.map(phase => {
              const phaseStarted = phase.episodes.filter(ep => startedEps.has(ep.num)).length
              return (
                <div key={phase.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: phase.color,
                  }} />
                  <span style={{
                    fontSize: 12,
                    color: '#A8A29E',
                  }}>
                    {phase.name}
                  </span>
                  <span style={{
                    fontSize: 12,
                    color: '#78716C',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {phaseStarted}/{phase.episodes.length}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
