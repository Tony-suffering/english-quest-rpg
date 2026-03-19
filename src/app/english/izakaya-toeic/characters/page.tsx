'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IZAKAYA_CHARACTERS } from '@/data/izakaya-toeic/characters';
import { ToeicPart } from '@/data/izakaya-toeic/types';
import { T } from '@/data/izakaya-toeic/theme';

const CHAR_READ_KEY = 'izakaya_characters_read';

const PART_SHORT: Record<ToeicPart, string> = {
  1: 'P1', 2: 'P2', 3: 'P3', 4: 'P4', 5: 'P5', 6: 'P6', 7: 'P7',
};

// Deep bilingual character profiles -- reading these IS TOEIC practice
const CHARACTER_HOOKS: Record<string, {
  tagline: string;
  taglineEn: string;
  story: string;
  storyEn: string;
  backstory: string;
  backstoryEn: string;
  secret: string;
  secretEn: string;
  traits: string[];
  traitsEn: string[];
}> = {
  master: {
    tagline: '全てを見てきた男',
    taglineEn: 'The man who has seen it all',
    story: 'かつてTOEIC満点を12回連続で叩き出した伝説の講師。大手予備校のエースで、彼の授業は3ヶ月先まで満席だった。ある日突然教壇を降り、路地裏に居酒屋「のれん」を開いた。理由は誰も知らない。',
    storyEn: 'A legendary instructor who scored a perfect 990 on the TOEIC twelve times in a row. He was the ace of a major prep school, and his classes were booked solid three months in advance. One day, he abruptly left the podium and opened an izakaya called "Noren" in a back alley. No one knows why.',
    backstory: '教え子が海外赴任先で「先生のおかげで900点取れました。でも現地で一言も話せません」とメールを送ってきた夜、権藤は初めて自分の授業を疑った。スコアは上がる。でもその先に何があるのか。答えが出ないまま、気づけばのれんを出していた。カウンター越しに酒を注ぎながら「本当の英語力」を探している。実は妻を5年前に亡くし、一人で店を切り盛りしている。常連たちの成長が、彼の唯一の生きがいだ。',
    backstoryEn: 'One night, a former student sent him an email from overseas: "Thanks to you, I scored 900. But I can\'t say a single word here." That night, Gondo doubted his own teaching for the first time. Scores go up. But what lies beyond that? Unable to find an answer, he found himself hanging the noren curtain. Pouring drinks across the counter, he searches for what "real English ability" means. He lost his wife five years ago and runs the place alone. Watching his regulars grow is his one reason to keep going.',
    secret: '権藤が教壇を捨てた本当の理由。それは「スコア」ではなく「ある教え子」に関わることだった。のれんを開いた夜、権藤は何を背負っていたのか -- その答えは、第29夜で明かされる。',
    secretEn: 'The real reason Gondo abandoned the podium. It was not about scores -- it was about one particular student. What was he carrying the night he hung the noren curtain? The answer comes on Night 29.',
    traits: ['寡黙', '洞察力', '元満点講師'],
    traitsEn: ['Silent', 'Perceptive', 'Ex-perfect scorer'],
  },
  yuki: {
    tagline: '笑いながら泣いてる主人公',
    taglineEn: 'The protagonist who laughs while crying',
    story: '商社の営業として日々奔走。英語が必要な場面は増える一方なのに、スコアは620で頭打ち。悔しさを毒舌で隠すタイプ。のれんの常連の中で一番リアルに悩んでいる、この物語の主人公。',
    storyEn: 'She hustles every day as a sales rep at a trading company. English keeps coming up more and more at work, yet her score is stuck at 620. She hides her frustration behind sharp wit. Among Noren\'s regulars, she is the one who struggles the most -- and the protagonist of this story.',
    backstory: '入社3年目、初めての海外クライアントとの商談で頭が真っ白になった。相手の英語は聞き取れるのに、言葉が出てこない。隣で後輩がスラスラ対応するのを見て、トイレで泣いた。それ以来、朝5時に起きてTOEICの勉強を始めた。でも上がらない。620が壁だ。のれんに来るようになったのは、職場では弱みを見せられないから。ここでだけは「わからない」と言える。タケシの気楽さに救われ、リサの厳しさに鍛えられ、ケンジの必死さに勇気をもらう。マスターのビールだけが、この戦いの唯一のご褒美だ。',
    backstoryEn: 'In her third year at the company, her mind went blank during her first meeting with an overseas client. She could hear the English perfectly fine, but the words would not come out. Watching her junior colleague handle it effortlessly beside her, she cried in the bathroom afterward. Since that day, she has been waking up at 5 AM to study for the TOEIC. But her score will not budge. 620 is the wall. She started coming to Noren because she cannot show weakness at work. This is the only place where she can say "I don\'t understand." She is saved by Takeshi\'s easygoing nature, sharpened by Lisa\'s strictness, and encouraged by Kenji\'s desperation. Master\'s beer is the only reward in this battle.',
    secret: 'ユキが本当に恐れているのは、「英語ができないこと」じゃない。もっと深い、自分自身に関わる恐怖だ。彼女にとってTOEICは「テスト」じゃない。もっと切実な何かだ。',
    secretEn: 'What Yuki truly fears is not her inability to speak English. It is something deeper -- something about herself. For her, TOEIC is not a test. It is something far more desperate.',
    traits: ['負けず嫌い', '毒舌', '努力家'],
    traitsEn: ['Competitive', 'Sharp-tongued', 'Hard worker'],
  },
  takeshi: {
    tagline: 'ポジティブの暴力',
    taglineEn: 'Aggressively optimistic',
    story: 'IT企業のPMとして論理的に仕事をこなすが、英語になると壊滅的。でも落ち込まない。間違えても笑い、また挑む。その姿勢が周りを救っていることに本人は気づいていない。',
    storyEn: 'As a project manager at an IT company, he handles work with cold logic. But the moment it comes to English, he falls apart completely. Yet he never gets down. He laughs off every mistake and charges in again. He has no idea that his attitude is the thing keeping everyone else going.',
    backstory: 'タケシが英語を始めた理由は単純だ。海外カンファレンスで登壇したい。技術力には自信がある。でも英語でプレゼンができない。去年、英語が理由で登壇枠を後輩に譲った。悔しくないフリをした。「まあ来年あるし」。でもその夜、家で一人でスライドを英語で読み上げる練習をした。誰にも見せない涙がある。のれんでは道化を演じる。ケンジが落ち込んだ時は冗談で笑わせ、ユキが壁にぶつかった時は「俺の方がヤバいから大丈夫」と言う。彼のポジティブさは天性じゃない。選んでそうしている。',
    backstoryEn: 'Takeshi\'s reason for studying English is simple. He wants to present at an international tech conference. He has total confidence in his technical skills. But he cannot present in English. Last year, he gave up his speaking slot to a junior colleague because of the language barrier. He pretended it did not bother him. "There\'s always next year." But that night, alone at home, he practiced reading his slides aloud in English. There are tears he shows no one. At Noren, he plays the clown. When Kenji is down, he cracks jokes. When Yuki hits a wall, he says "I\'m way worse off, so you\'ll be fine." His optimism is not a gift. It is a choice.',
    secret: 'タケシの机の引き出しには、誰にも見せたことがないものが入っている。あのいつも笑ってる男が、なぜ一度も諦めないのか。その理由は、あの引き出しの中にある。',
    secretEn: 'In Takeshi\'s desk drawer, there is something he has never shown anyone. Why does the man who is always laughing never give up? The reason is inside that drawer.',
    traits: ['お調子者', '前向き', 'ムードメーカー'],
    traitsEn: ['Class clown', 'Optimist', 'Morale booster'],
  },
  lisa: {
    tagline: 'ネイティブの壁を知る女',
    taglineEn: 'The woman who knows the native speaker\'s wall',
    story: '帰国子女で英語はペラペラ。でもTOEIC特有の「引っ掛け」に何度もハマる。ネイティブ感覚とTOEICは別物だと痛感しながらも、プライドが邪魔して素直に聞けない。',
    storyEn: 'A returnee who speaks English fluently. But she keeps falling for TOEIC\'s signature trick questions. She knows painfully well that native intuition and TOEIC are two different games, yet her pride will not let her ask for help.',
    backstory: '小学2年から6年間ロサンゼルスで育った。英語は体に染み込んでいる。帰国後、周りから「英語ペラペラでいいね」と言われ続けた。でもTOEICを受けたら860。ネイティブなのに満点じゃない。それがリサのプライドを砕いた。Part 5の文法問題で「感覚で選んだら間違い」が連発。会話はできるのに、テストの英語がわからない。それを誰にも言えない。「帰国子女なのにTOEICで苦戦してる」なんて、恥ずかしくて死にたくなる。のれんに来たのは偶然だった。でもここなら、完璧じゃない自分を隠さなくていい気がした。最近、ケンジのまっすぐさに少し救われている。あのおっさんは、わからないことを恥ずかしがらない。それが、リサにはできない。',
    backstoryEn: 'She grew up in Los Angeles from second grade through eighth grade. English is in her bones. After returning to Japan, everyone kept saying "Must be nice to speak English so well." But when she took the TOEIC, she scored 860. A native speaker who cannot get a perfect score. That shattered Lisa\'s pride. In Part 5 grammar questions, choosing "by feel" led to wrong answers, one after another. She can hold a conversation just fine, but she cannot handle test English. She cannot tell anyone. "A returnee struggling with TOEIC" -- the shame makes her want to disappear. Coming to Noren was an accident. But here, she felt like she did not have to hide her imperfect self. Lately, Kenji\'s straightforwardness has been saving her a little. That old man is not ashamed of not knowing things. That is something Lisa cannot do.',
    secret: '帰国子女で英語ペラペラ。TOEIC 860。何も問題ないはずのリサが、なぜこの路地裏の居酒屋に通い続けるのか。最近、リサの中で「ある確信」が揺らぎ始めている。',
    secretEn: 'A returnee who speaks English fluently. TOEIC 860. Lisa should have no problems at all. So why does she keep coming back to this back-alley izakaya? Recently, a certain conviction inside her has begun to waver.',
    traits: ['帰国子女', 'プライド高め', '実は繊細'],
    traitsEn: ['Returnee', 'Proud', 'Secretly fragile'],
  },
  kenji: {
    tagline: '部下のために戦うおっさん',
    taglineEn: 'The old man fighting for his team',
    story: '建設畑一筋25年。英語なんて無縁だった。でも会社がグローバル化し、部下の前でTOEICスコアを晒す羽目に。昭和のおっさんが、プライドを捨てて学び直す。',
    storyEn: 'Twenty-five years in construction. English had nothing to do with his life. But the company went global, and now he has to reveal his TOEIC score in front of his team. A man from the old school, swallowing his pride and learning from scratch.',
    backstory: 'ケンジは現場の叩き上げだ。高卒で建設会社に入り、汗と根性で部長まで登りつめた。英語なんて一度も必要なかった。それが去年、会社が東南アジアに進出。全管理職にTOEIC600点以上が義務づけられた。部下の前で「480点」を読み上げられた日のことは忘れられない。若い部下たちは目を逸らした。あの沈黙が、ケンジの心をえぐった。娘は大学生で、「パパ、私が教えてあげようか？」と言ってくれた。嬉しいのに、情けなかった。のれんを見つけたのは、帰り道でふらっと入った時だ。マスターが何も聞かずにビールを出してくれた。「いい年して勉強なんて」と笑われると思っていた。でもマスターは言った。「...遅いってことは、ないよ。」',
    backstoryEn: 'Kenji is a man built from the ground up. He joined a construction company straight out of high school and climbed to director through sweat and grit. He never once needed English. Then last year, the company expanded into Southeast Asia. Every manager was required to score at least 600 on the TOEIC. He will never forget the day his score of 480 was read aloud in front of his team. The younger employees looked away. That silence carved a hole in his heart. His daughter, a college student, offered: "Dad, want me to teach you?" He was grateful, but it stung. He found Noren by chance, stumbling in on his way home one evening. Master served him a beer without asking a single question. Kenji had expected to be laughed at -- "Studying at your age?" But Master simply said: "...it is never too late."',
    secret: 'ケンジのスマホの待ち受けには、ある写真が設定されている。毎朝の通勤電車で、あの強面のおっさんが何を見て目を潤ませているのか -- それを知った時、あなたはケンジのことが好きになる。ちなみにケンジの唯一の趣味はパチスロ。「出る台を見極める集中力」が、意外なところで活きてくる。',
    secretEn: 'There is a photo on Kenji\'s phone wallpaper. Every morning on the train, what makes this tough old man\'s eyes well up? When you find out, you will fall in love with Kenji. By the way, his one hobby is pachislot. His "concentration for reading which machine will pay out" comes in handy in the most unexpected way.',
    traits: ['不器用', '義理堅い', '部下思い'],
    traitsEn: ['Clumsy', 'Loyal', 'Lives for his team'],
  },
  mina: {
    tagline: '天然リスニングモンスター',
    taglineEn: 'The accidental listening genius',
    story: '派遣社員として働きながら、K-POPとNetflixで鍛えた耳だけは異常に強い。リーディングは壊滅的だが、聞き取りだけなら860点のリサすら超える。本人はその凄さに無自覚。',
    storyEn: 'Working as a temp, she trained her ears through nothing but K-POP and Netflix. Her reading is a disaster, but when it comes to listening alone, she outperforms even Lisa and her 860. She has absolutely no idea how incredible that is.',
    backstory: 'ミナは勉強が嫌いだ。高校の成績はクラスで下から3番目。大学は行かなかった。でも音楽は好きだった。中学の時にBTSにハマってから、韓国語を独学で覚え、その流れで英語の歌も聴くようになった。Netflixは字幕なしで見る。「だって字幕あると画面見れなくない？」という理由で。気づいたらリスニングだけ異常に強くなっていた。のれんに来たのは、派遣先の先輩に「TOEICくらい受けなよ」と言われたから。初めて受けたTOEICでリスニング495点満点を叩き出した。リーディングは235点。合計730。リサが「リスニング満点!?」と絶句した日は、ミナの人生で初めて「すごい」と言われた日だった。でも本人は「え、普通に聞こえるだけだけど...」としか思っていない。',
    backstoryEn: 'Mina hates studying. Her high school grades were third from the bottom. She did not go to college. But she loved music. After getting into BTS in middle school, she taught herself Korean, and from there she started listening to English songs too. She watches Netflix without subtitles. "I mean, if there are subtitles, you can\'t watch the screen, right?" Before she knew it, her listening had become absurdly strong. She came to Noren because a senior colleague at her temp job told her "You should at least take the TOEIC." On her very first TOEIC attempt, she scored a perfect 495 in listening. Her reading was 235. Total: 730. The day Lisa froze and said "A perfect listening score!?" was the first time in Mina\'s life anyone had ever told her she was amazing. But all she thinks is: "I mean... I can just hear it, that\'s all..."',
    secret: 'ミナには、のれんの仲間にまだ言えていないことがある。人生で初めて「ちゃんとしなきゃ」と思った出来事だ。いつもぼんやりしているあの子が、静かに何かを決意し始めている。',
    secretEn: 'There is something Mina has not yet told the others at Noren. Something happened that made her think "I need to get serious" for the first time in her life. The girl who always seems spaced out is quietly making up her mind about something.',
    traits: ['天然', 'リスニング最強', '無自覚の天才'],
    traitsEn: ['Airhead', 'Listening monster', 'Unaware genius'],
  },
};

function ScoreBar({ current, target, color }: { current: number; target: number; color: string }) {
  const pct = Math.min((current / 990) * 100, 100);
  const targetPct = Math.min((target / 990) * 100, 100);
  return (
    <div style={{ position: 'relative', height: 6, background: T.border, borderRadius: 3, overflow: 'visible' }}>
      <div style={{
        height: '100%', borderRadius: 3,
        background: `linear-gradient(90deg, ${color}40, ${color})`,
        width: `${pct}%`, transition: 'width 0.8s ease',
      }} />
      {current !== target && (
        <div style={{
          position: 'absolute', top: -2, left: `${targetPct}%`,
          width: 2, height: 10, background: color + '60',
          borderRadius: 1,
        }} />
      )}
    </div>
  );
}

export default function CharactersPage() {
  // Mark characters as read when user visits this page
  useEffect(() => {
    localStorage.setItem(CHAR_READ_KEY, 'true');
  }, []);

  // All characters always expanded (no accordion)
  const expandedId = '__all__';

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Hero header */}
      <div style={{
        padding: '40px 20px 32px',
        textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <Link href="/english/izakaya-toeic" style={{
          fontSize: 11, color: T.textMuted, textDecoration: 'none',
          display: 'inline-block', marginBottom: 16,
        }}>
          {'<'} 居酒屋TOEIC
        </Link>

        <div style={{
          display: 'inline-block',
          padding: '4px 16px',
          background: T.goldBg,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 20,
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: 3,
          marginBottom: 14,
        }}>
          CHARACTER FILES
        </div>

        <h1 style={{
          fontSize: 'clamp(22px, 6vw, 32px)',
          fontWeight: 900,
          margin: '0 0 4px',
          letterSpacing: -0.5,
        }}>
          <span style={{ color: T.textMuted, fontWeight: 400, fontSize: '0.55em', letterSpacing: 2, display: 'block', marginBottom: 6 }}>
            THE REGULARS OF NOREN
          </span>
          のれんの常連たち
        </h1>

        <p style={{
          fontSize: 13, color: T.textSub, maxWidth: 420, margin: '12px auto 0', lineHeight: 1.8,
        }}>
          路地裏の居酒屋「のれん」に夜な夜な集まる6人。
          <br />
          それぞれの事情を抱えて、今日もTOEICと向き合う。
        </p>
        <p style={{
          fontSize: 11, color: T.textMuted, maxWidth: 420, margin: '8px auto 0', lineHeight: 1.7,
          fontStyle: 'italic',
        }}>
          Six regulars gather night after night at a back-alley izakaya called Noren.
          <br />
          Each carrying their own burdens, they face the TOEIC once more today.
        </p>
        <div style={{
          display: 'inline-block', marginTop: 12,
          padding: '4px 12px', background: '#10B98112',
          border: '1px solid #10B98120', borderRadius: 20,
          fontSize: 10, color: '#10B981', fontWeight: 600,
        }}>
          READING PRACTICE -- Read in both languages
        </div>
      </div>

      {/* Character cards */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px 40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {IZAKAYA_CHARACTERS.map((char, i) => {
            const hook = CHARACTER_HOOKS[char.id];
            const isExpanded = true;
            const isMaster = char.id === 'master';

            return (
              <div
                key={char.id}
                id={`char-${char.id}`}
                style={{
                  position: 'relative',
                  scrollMarginTop: 80,
                  padding: 0,
                  background: T.surface,
                  borderRadius: 16,
                  border: `1px solid ${isExpanded ? char.color + '50' : T.border}`,
                  transition: 'all 0.25s ease',
                  boxShadow: `0 8px 32px ${char.color}15`,
                  overflow: 'hidden',
                  animation: `izk-slideup 0.4s ease ${i * 0.07}s both`,
                }}
              >
                {/* Color accent top bar */}
                <div style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${char.color}, ${char.color}40)`,
                }} />

                <div style={{ padding: '16px 20px' }}>
                  {/* Top row: avatar + name + score */}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    {/* Initial badge */}
                    <img
                      src={`/characters/${char.id}.png`}
                      alt={char.name}
                      style={{
                        width: 56, height: 56, borderRadius: '50%',
                        border: `2.5px solid ${char.color}`,
                        objectFit: 'cover',
                        flexShrink: 0,
                        boxShadow: isExpanded
                          ? `0 0 20px ${char.color}30`
                          : `0 2px 8px ${char.color}10`,
                        transition: 'box-shadow 0.3s ease',
                      }}
                    />

                    {/* Name + job */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.3 }}>
                          {char.name}
                        </span>
                        <span style={{ fontSize: 11, color: T.textMuted }}>{char.age}歳</span>
                      </div>
                      <div style={{ fontSize: 12, color: T.textSub, marginTop: 2 }}>
                        {char.job}
                      </div>
                      {hook && (
                        <div style={{ marginTop: 4 }}>
                          <div style={{
                            fontSize: 11, color: char.color, fontWeight: 600,
                            fontStyle: 'italic',
                          }}>
                            -- {hook.tagline}
                          </div>
                          <div style={{
                            fontSize: 10, color: char.color + '90', fontWeight: 500,
                            fontStyle: 'italic',
                          }}>
                            {hook.taglineEn}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 22, fontWeight: 900, color: char.color,
                        lineHeight: 1,
                      }}>
                        {char.currentScore}
                      </div>
                      <div style={{ fontSize: 9, color: T.textMuted, marginTop: 2, letterSpacing: 1 }}>
                        {isMaster ? 'PERFECT' : 'CURRENT'}
                      </div>
                      {!isMaster && (
                        <div style={{ fontSize: 10, color: T.textMuted, marginTop: 1 }}>
                          target {char.targetScore}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Score bar */}
                  <div style={{ marginTop: 12 }}>
                    <ScoreBar current={char.currentScore} target={char.targetScore} color={char.color} />
                  </div>

                  {/* Personality traits pills -- bilingual */}
                  {hook && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      {hook.traits.map((trait, ti) => (
                        <span key={trait} style={{
                          padding: '3px 10px',
                          background: char.color + '10',
                          color: char.color,
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 20,
                          border: `1px solid ${char.color}18`,
                          letterSpacing: 0.5,
                        }}>
                          {trait}
                          <span style={{ color: char.color + '80', fontWeight: 500, marginLeft: 4, fontSize: 9 }}>
                            {hook.traitsEn[ti]}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expanded detail */}
                  {isExpanded && hook && (
                    <div style={{
                      marginTop: 16, paddingTop: 16,
                      borderTop: `1px solid ${T.border}`,
                      animation: 'izk-fadein 0.3s ease',
                    }}>
                      {/* Story -- bilingual */}
                      <div style={{ marginBottom: 16 }}>
                        <p style={{
                          fontSize: 13, color: T.text, lineHeight: 1.85,
                          margin: '0 0 8px',
                        }}>
                          {hook.story}
                        </p>
                        <p style={{
                          fontSize: 12, color: T.textMuted, lineHeight: 1.8,
                          margin: 0, fontStyle: 'italic',
                          paddingLeft: 12,
                          borderLeft: `2px solid ${char.color}20`,
                        }}>
                          {hook.storyEn}
                        </p>
                      </div>

                      {/* Catchphrase */}
                      <div style={{
                        padding: '14px 16px',
                        background: `linear-gradient(135deg, ${char.color}06, ${char.color}03)`,
                        borderRadius: 10,
                        marginBottom: 16,
                        borderLeft: `3px solid ${char.color}`,
                      }}>
                        <div style={{
                          fontSize: 9, color: char.color, fontWeight: 700,
                          marginBottom: 6, letterSpacing: 2,
                        }}>
                          CATCHPHRASE
                        </div>
                        <div style={{
                          fontSize: 14, color: T.text, lineHeight: 1.6, fontWeight: 600,
                        }}>
                          {char.catchphrase}
                        </div>
                        <div style={{
                          fontSize: 12, color: T.textMuted, fontStyle: 'italic', marginTop: 6,
                        }}>
                          &quot;{char.catchphraseEn}&quot;
                        </div>
                      </div>

                      {/* Deep backstory -- bilingual */}
                      <div style={{
                        marginBottom: 16,
                        padding: '16px',
                        background: `linear-gradient(135deg, ${T.bgSecondary}, ${char.color}04)`,
                        borderRadius: 12,
                        border: `1px solid ${T.border}`,
                      }}>
                        <div style={{
                          fontSize: 9, color: char.color, fontWeight: 700,
                          marginBottom: 10, letterSpacing: 2,
                        }}>
                          BACKSTORY
                        </div>
                        <p style={{
                          fontSize: 13, color: T.text, lineHeight: 2,
                          margin: '0 0 12px',
                        }}>
                          {hook.backstory}
                        </p>
                        <p style={{
                          fontSize: 12, color: T.textMuted, lineHeight: 1.85,
                          margin: 0, fontStyle: 'italic',
                          paddingLeft: 12,
                          borderLeft: `2px solid ${char.color}30`,
                        }}>
                          {hook.backstoryEn}
                        </p>
                      </div>

                      {/* Secret -- bilingual */}
                      <div style={{
                        marginBottom: 16,
                        padding: '16px',
                        background: '#1C191708',
                        borderRadius: 12,
                        border: `1px dashed ${char.color}30`,
                      }}>
                        <div style={{
                          fontSize: 9, color: char.color, fontWeight: 700,
                          marginBottom: 10, letterSpacing: 2,
                        }}>
                          ...?
                        </div>
                        <p style={{
                          fontSize: 13, color: T.text, lineHeight: 2,
                          margin: '0 0 12px',
                        }}>
                          {hook.secret}
                        </p>
                        <p style={{
                          fontSize: 12, color: T.textMuted, lineHeight: 1.85,
                          margin: 0, fontStyle: 'italic',
                          paddingLeft: 12,
                          borderLeft: `2px solid ${char.color}30`,
                        }}>
                          {hook.secretEn}
                        </p>
                      </div>

                      {/* TOEIC strengths & weaknesses */}
                      <div style={{ display: 'flex', gap: 12 }}>
                        {char.strongPoints.length > 0 && (
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: 9, color: T.green, fontWeight: 700,
                              marginBottom: 6, letterSpacing: 2,
                            }}>
                              STRONG
                            </div>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {char.strongPoints.map(p => (
                                <span key={p} style={{
                                  padding: '3px 8px', background: T.green + '12',
                                  color: T.green, fontSize: 10, fontWeight: 700, borderRadius: 4,
                                }}>
                                  {PART_SHORT[p]}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {char.weakPoints.length > 0 && (
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontSize: 9, color: T.red, fontWeight: 700,
                              marginBottom: 6, letterSpacing: 2,
                            }}>
                              WEAK
                            </div>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {char.weakPoints.map(p => (
                                <span key={p} style={{
                                  padding: '3px 8px', background: T.red + '12',
                                  color: T.red, fontSize: 10, fontWeight: 700, borderRadius: 4,
                                }}>
                                  {PART_SHORT[p]}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Personality description from original data */}
                      <div style={{
                        marginTop: 14, padding: '10px 14px',
                        background: T.bgSecondary,
                        borderRadius: 8,
                        fontSize: 12, color: T.textMuted, lineHeight: 1.7,
                        fontStyle: 'italic',
                      }}>
                        {char.personality}
                      </div>
                    </div>
                  )}

                  {/* Expand hint */}
                  <div style={{
                    textAlign: 'center', marginTop: 10,
                    fontSize: 10, color: T.textMuted,
                    transition: 'opacity 0.2s',
                    opacity: isExpanded ? 0 : 0.6,
                  }}>
                    tap to read story
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: 40,
          padding: '36px 24px',
          background: `linear-gradient(135deg, #FFFBEB, ${T.surface})`,
          borderRadius: 16,
          border: `1px solid ${T.goldBorder}`,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 9, color: T.gold, fontWeight: 700,
            letterSpacing: 3, marginBottom: 10,
          }}>
            THE STORY BEGINS HERE
          </div>
          <p style={{
            fontSize: 16, color: T.text, fontWeight: 700, lineHeight: 1.8,
            margin: '0 0 6px',
          }}>
            キャラを知ったら、もう他人事じゃない。
          </p>
          <p style={{
            fontSize: 13, color: T.textMuted, lineHeight: 1.8,
            margin: '0 0 24px',
          }}>
            30日間、この6人と一緒にスコアを上げよう。
          </p>
          <Link href="/english/izakaya-toeic/episodes/ep-001" style={{
            display: 'inline-block',
            padding: '16px 44px',
            background: `linear-gradient(135deg, ${T.gold}, #B8960F)`,
            color: '#fff',
            borderRadius: 12,
            fontWeight: 900,
            fontSize: 18,
            textDecoration: 'none',
            boxShadow: `0 6px 24px ${T.gold}50`,
            letterSpacing: 1,
          }}>
            DAY 1 -- のれんの扉を開ける
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes izk-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes izk-slideup {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
