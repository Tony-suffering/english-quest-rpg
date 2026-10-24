/**
 * Shingeki × Memoria -- Ep.01: "Dedicate your hearts -- 爺さん、神を嗅ぐ"
 *
 * Pilot for the "Anime × Memoria" format.
 * Characters: Master Gondo (old izakaya owner, hates anime) & Lisa (otaku, pushes anime on him).
 * Scene target: Erwin Smith's rallying cry "心臓を捧げよ！" → dub "Dedicate your hearts!"
 * Decoding axes:
 *   1. "dedicate" is religious vocabulary (church), not warrior vocabulary
 *   2. "your hearts" (plural) vs Japanese 心臓を (ambiguous number) → ritual vs command
 *
 * Shadow target: "Dedicate your hearts." 4-beat, d-cut on -cate, s near-silent.
 *
 * Format rule: 1 episode = 1 scene = 1 line = 1 decoding.
 * No g-dropping (PP search compat). No emojis.
 */

export interface ShingekiMemoriaEntry {
    id: string;
    date: string;
    title: string;
    titleJa: string;
    content: string;
    series: string;
    seriesTitle: string;
    conversation: {
        english: Array<{ speaker: 'male' | 'female'; text: string }>;
        japanese: Array<{ speaker: 'male' | 'female'; text: string }>;
        generatedAt: Date;
        tone: string;
    };
    tone: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const generatedAt = new Date('2026-04-24T12:00:00.000Z');

export const shingekiMemoriaEntries: ShingekiMemoriaEntry[] = [
    {
        id: 'shingeki-memoria-01',
        date: '2026-04-24',
        title: 'Ep.01 Dedicate your hearts -- The old man smells a god',
        titleJa: 'Ep.01 心臓を捧げよ -- 爺さん、神を嗅ぐ',
        content: '居酒屋の角席。リサが進撃の巨人を権藤に押し付ける。嫌々見た爺さんが、エルヴィンの一行で酒を置いた。「dedicate」は教会の言葉だ -- 英語は、兵士を神官に変えていた。日本語の「捧げよ」が持つ武の匂いと、英語の「dedicate」が纏う宗教の匂い。そして「your hearts」の複数形が作り出す儀式性。たった一行、4拍の沈黙。',
        series: 'shingeki-memoria',
        seriesTitle: '進撃 × Memoria',
        tone: 'philosophical',
        tags: ['anime', 'attack-on-titan', 'erwin-smith', 'shadowing', 'etymology', 'translation', 'memoria-anime'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Lisa: Old man. Watch this one today. Attack on Titan. Not the fighting part. Just a speech." },
                { speaker: 'male', text: "Gondo: Another blood-soaked cartoon. No, thank you." },
                { speaker: 'female', text: "Lisa: Three seconds. That's all I'm asking." },
                { speaker: 'male', text: "Gondo: Fine. Three seconds. Then you buy the next round." },
                { speaker: 'female', text: "Lisa: Deal. Here. Watch. This is Commander Erwin, right before the final charge." },
                { speaker: 'male', text: "Erwin: Dedicate your hearts!" },
                { speaker: 'male', text: "Gondo: ...Hm. Put that cup down for a second." },
                { speaker: 'female', text: "Lisa: What. What is it. You look like you saw a ghost." },
                { speaker: 'male', text: "Gondo: That word. Dedicate. Where do you normally hear that word in English?" },
                { speaker: 'female', text: "Lisa: Um. Like, to offer something? To give?" },
                { speaker: 'male', text: "Gondo: In church. A priest says it. We dedicate this church to God. We dedicate this building to our founder. That is not everyday English. That is religious English. That is a church word." },
                { speaker: 'female', text: "Lisa: Wait. So Erwin is not talking like a soldier?" },
                { speaker: 'male', text: "Gondo: The Japanese line is 心臓を捧げよ. That is archaic imperative. That smells like samurai. That smells like war. But the English translator did not pick a war word. They picked a church word. They took a general and turned him into a priest." },
                { speaker: 'female', text: "Lisa: So the dub is literally more holy than the original?" },
                { speaker: 'male', text: "Gondo: Whether it was deliberate, I do not know. But in English, Erwin does not sound like a commander. He sounds like a bishop giving communion. The soldiers are not dying for a country. They are making an offering. To what? That is the terror. To what." },
                { speaker: 'female', text: "Lisa: ...Jesus, old man. I have watched this scene a hundred times." },
                { speaker: 'male', text: "Gondo: Play it again. Listen to the second thing." },
                { speaker: 'male', text: "Erwin: Dedicate your hearts!" },
                { speaker: 'male', text: "Gondo: Your hearts. Plural. Not your heart. If he said your heart, singular, it would sound like he is talking to one person. A private speech. But your hearts, plural, makes it a ritual. Every heart in the room, lined up, offered in unison. A chorus. That is the sound of a ceremony, not a command." },
                { speaker: 'female', text: "Lisa: And in Japanese, 心臓を -- you cannot tell if it is one heart or many. The particle eats the number." },
                { speaker: 'male', text: "Gondo: Exactly. Japanese leaves the number open, so the scene rides on the actor's voice. English forces a choice. And the translator chose plural. That is not a translation accident. That is a structural difference between the languages. The English version is more ritualistic because it had to be. It had no choice but to commit." },
                { speaker: 'female', text: "Lisa: So the English is saying something the Japanese cannot say." },
                { speaker: 'male', text: "Gondo: Every translation loses. Every translation also adds. This one lost the sharpness of the archaic imperative and added a cathedral. That is the trade. Whether you like it is a separate question." },
                { speaker: 'female', text: "Lisa: Old man. Teach me how to say it." },
                { speaker: 'male', text: "Gondo: Four beats. De-di-cate-your-hearts. Cut the word dedicate on the hard d. DE-di-CATE. Put a light stress on your. The s at the end of hearts -- almost disappears. Do not say hearts, say heart-s with the s fading. Four beats. Like a hammer. De-di-cate your hearts." },
                { speaker: 'female', text: "Lisa: Dedicate your hearts." },
                { speaker: 'male', text: "Gondo: Again. Slower. Feel the sacred part. You are not ordering someone. You are asking for an offering." },
                { speaker: 'female', text: "Lisa: Dedicate your hearts." },
                { speaker: 'male', text: "Gondo: Once more. No performance. Just the weight." },
                { speaker: 'female', text: "Lisa: Dedicate your hearts." },
                { speaker: 'male', text: "Gondo: Good. Now you can hear it." },
                { speaker: 'female', text: "Lisa: Old man. You are hooked. Admit it." },
                { speaker: 'male', text: "Gondo: I am not hooked. I am curious. Those are different conditions." },
                { speaker: 'female', text: "Lisa: Same thing." },
                { speaker: 'male', text: "Gondo: ...Show me the next episode." },
                { speaker: 'female', text: "Lisa: I knew it. I knew it. Next week, old man. Next week we do Levi." },
            ],
            japanese: [
                { speaker: 'female', text: "リサ: じじい、今日こそこれ見て。進撃の巨人。戦闘じゃない、演説だけ。" },
                { speaker: 'male', text: "権藤: また血しぶきアニメか。結構だ。" },
                { speaker: 'female', text: "リサ: 3秒でいい。それだけ。" },
                { speaker: 'male', text: "権藤: 分かった、3秒だ。ダメだったら次はお前の奢りだ。" },
                { speaker: 'female', text: "リサ: 乗った。ほら。これ、エルヴィン団長、最後の突撃の直前。" },
                { speaker: 'male', text: "エルヴィン: 心臓を捧げよ！" },
                { speaker: 'male', text: "権藤: ……ふむ。お前、その猪口、一旦置け。" },
                { speaker: 'female', text: "リサ: え、なに。幽霊でも見たの？" },
                { speaker: 'male', text: "権藤: この単語だ。dedicate。普段どこで耳にする単語か、知ってるか。" },
                { speaker: 'female', text: "リサ: えっと…捧げる、とか？与える？" },
                { speaker: 'male', text: "権藤: 教会だ。神父が言う。We dedicate this church to God。この建物を創立者に捧げる。日常の英語じゃない。宗教の英語だ。教会の言葉だ。" },
                { speaker: 'female', text: "リサ: 待って。じゃあエルヴィン、兵士の喋り方じゃないってこと？" },
                { speaker: 'male', text: "権藤: 日本語の原文は「心臓を捧げよ」。古語の命令形だ。武士の匂い、戦の匂いがする。ところが英語の訳者は、戦の言葉を選ばなかった。宗教の言葉を選んだ。**将軍を、神父に変えた**。" },
                { speaker: 'female', text: "リサ: じゃあ吹替版、原作より神聖ってこと？" },
                { speaker: 'male', text: "権藤: 意図したかは知らん。だが英語で聴くと、エルヴィンは指揮官じゃない、聖体を授ける司教に聴こえる。兵士は国のために死ぬんじゃない、**奉納してる**。何に？ それが恐ろしい。何に、奉納してるのか。" },
                { speaker: 'female', text: "リサ: ……じじい、私このシーン100回見てるよ。気づかなかった。" },
                { speaker: 'male', text: "権藤: もう一回流せ。今度は二つ目だ。" },
                { speaker: 'male', text: "エルヴィン: 心臓を捧げよ！" },
                { speaker: 'male', text: "権藤: your hearts。複数形だ。your heart じゃない。your heart、単数だと一人に向けた話しかけに聴こえる。私的な演説になる。だが your hearts、複数にすることで、**儀式**になる。この場にある全員の心臓を、並べて、同時に、差し出す。合唱だ。これは命令じゃない、**典礼**の音だ。" },
                { speaker: 'female', text: "リサ: 日本語の「心臓を」は…単数か複数か、分からないね。助詞が数を飲み込んでる。" },
                { speaker: 'male', text: "権藤: その通り。日本語は数を開いたまま残せる。だから役者の声で語れる。だが英語は選ばされる。そして訳者は**複数を選んだ**。これは翻訳事故じゃない、**言語の構造の差**だ。英語版が儀式的なのは、そうせざるを得なかったからだ。選ぶしかなかった。" },
                { speaker: 'female', text: "リサ: つまり英語が、日本語には言えないことを言ってる。" },
                { speaker: 'male', text: "権藤: あらゆる翻訳は、必ず何かを失う。そして必ず何かを足す。この訳は、古語の命令形の鋭さを失った代わりに、大聖堂を足した。それが取引だ。お前がそれを好きかどうかは、別の問題。" },
                { speaker: 'female', text: "リサ: じじい、言い方教えて。" },
                { speaker: 'male', text: "権藤: 4拍だ。De-di-cate-your-hearts。dedicate は硬い d で切れ。DE-di-CATE。your に軽く重心を置け。hearts の s は語尾で消えかける。hearts じゃない、heart-s と、s がフェードする。4拍、ハンマーのように。De-di-cate your hearts。" },
                { speaker: 'female', text: "リサ: Dedicate your hearts." },
                { speaker: 'male', text: "権藤: もう一度。遅く。神聖な部分を感じろ。命令してるんじゃない。奉納を、求めてるんだ。" },
                { speaker: 'female', text: "リサ: Dedicate your hearts." },
                { speaker: 'male', text: "権藤: もう一度。演じるな。重さだけ。" },
                { speaker: 'female', text: "リサ: Dedicate your hearts." },
                { speaker: 'male', text: "権藤: いい。今、聴こえた。" },
                { speaker: 'female', text: "リサ: じじい、堕ちたね。認めな。" },
                { speaker: 'male', text: "権藤: 堕ちてはいない。興味を持っただけだ。別の状態だ。" },
                { speaker: 'female', text: "リサ: 同じだって。" },
                { speaker: 'male', text: "権藤: ……次の回、見せてみろ。" },
                { speaker: 'female', text: "リサ: 来た。来たよ。来週だ、じじい。来週はリヴァイだ。" },
            ],
            generatedAt,
            tone: 'philosophical',
        },
    },
];
