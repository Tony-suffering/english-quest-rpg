// 単語パックに語を足すときの共通部品(duel-word-add-band700.cjs から先が使う)。
// 声の演出は英文の型(tone)ごとに決めてある。画風は、語ごとに一覧から順に散らす(弱い画風は飛ばす)。
const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'src/data/english/duel-words-toeic.json');

const TONES = {
    DETECTIVE: ['探偵の尋問', 'echo', 'a hard-boiled detective', 'Low, slow and suspicious, treating it as a serious case.'],
    RECEPTION: ['受付の案内', 'coral', 'a polite receptionist', 'Warm, professional, perfectly calm.'],
    GRANDMA: ['おばあちゃんの見立て', 'sage', 'a gentle grandmother', 'Kind, slow, a little amused.'],
    ROBOT: ['ロボットの報告', 'alloy', 'an office robot', 'Flat, even, mechanical rhythm with tiny pauses.'],
    PIRATE: ['海賊の事務連絡', 'ash', 'a gruff pirate captain', 'Rough growl, but businesslike.'],
    BOSS: ['上司の通達', 'echo', 'a humorless manager', 'Cold and flat, no joy at all.'],
    RUMOR: ['社内のうわさ', 'verse', 'a gossiping coworker', 'Low conspiratorial tone, enjoying the gossip.'],
    ANNOUNCE: ['館内アナウンス', 'shimmer', 'a serene announcer', 'Smooth public-announcement voice, perfectly calm.'],
    SALES: ['店員の朗報', 'coral', 'an upbeat salesperson', 'Bright and delighted, customer-service cheer.'],
    WEATHER: ['天気予報', 'nova', 'a cheerful weather presenter', 'Brisk and sunny.'],
    ALIEN: ['宇宙人の報告', 'ballad', 'a polite little alien', 'Careful, curious, slightly stiff.'],
    WIZARD: ['魔法使いのぼやき', 'fable', 'a tired old wizard', 'Weary, dry, with a small sigh.'],
    NEWS: ['ニュースの見出し', 'nova', 'a brisk news anchor', 'Crisp headline delivery, neutral.'],
    SLOW: ['のんびり屋の言い分', 'ballad', 'an earnest, very slow speaker', 'Sincere and unhurried.'],
    DOCTOR: ['医者の診断', 'sage', 'a calm doctor', 'Gentle, clinical, matter-of-fact.'],
    GHOST: ['幽霊の独白', 'sage', 'a resigned ghost', 'Hollow, soft, deadpan.'],
    GENERAL: ['頼りない将軍', 'ash', 'an unsure general', 'Tries to sound confident, not quite managing.'],
    TRAILER: ['映画の予告編', 'onyx', 'a movie trailer narrator', 'Deep and epic, with dramatic pauses between sentences.'],
    ROYAL: ['王の会議', 'fable', 'a solemn royal herald', 'Formal and grave, announcing state business.'],
    COMPLAINT: ['お客様の苦情', 'shimmer', 'an unimpressed customer', 'Cool, polite, dry.'],
    DIARY: ['会社員の日記', 'ballad', 'a deadpan office worker', 'Quiet, dry, like reading a diary.'],
    VILLAIN: ['悪役の決め台詞', 'onyx', 'a grand theatrical villain', 'Booming and proud.'],
    TEACHER: ['先輩の小言', 'shimmer', 'a patient supervisor', 'Polite, but tired of repeating it.'],
    AD: ['通販の売り文句', 'verse', 'a TV shopping host', 'Energetic infomercial pitch.'],
    SPORTS: ['実況中継', 'verse', 'an excited sports commentator', 'Fast, excited play-by-play.'],
    EXCUSE: ['新人の言い訳', 'ballad', 'a sheepish employee', 'Apologetic and a little embarrassed.'],
};
// 場面が伝わりにくい画風は使わない
const WEAK = new Set(['LINE ART', 'SILHOUETTE', 'BLUEPRINT', 'PATENT DIAGRAM', 'CHALKBOARD', 'CAVE PAINTING', 'NEON SIGN', 'MINIMAL FLAT', 'CLAY TABLET RELIEF', 'GLASS FIGURINES', 'KINTSUGI GOLD', 'INFRARED DREAM', 'TOY BRICKS']);
const COSTS = [2, 1, 3, 2, 4, 1, 3, 2, 5, 3, 2, 4, 1, 3, 2, 6, 2, 3, 1, 4];
const ABILS = ['NONE', 'RUSH', 'WARD', 'NONE', 'STRIKE', 'INSIGHT', 'NONE', 'HEAL', 'NONE', 'RUSH', 'NONE', 'WARD', 'HEAL', 'INSIGHT', 'STRIKE', 'NONE'];

/** 語を足す。W は [語, 品詞, 意味, 型, 英文, 訳, 場面] の並び。start は画風をずらす数 */
function addBand(band, W, start = 0) {
    const pack = JSON.parse(fs.readFileSync(P, 'utf8'));
    const styles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/english/duel-styles.json'), 'utf8')).map(s => s.name).filter(n => !WEAK.has(n));
    let n = pack.cards.length, added = 0;
    W.forEach(([word, pos, ja, tone, line, lineJa, scene], i) => {
        if (pack.cards.some(c => c.word === word)) return;
        if (!TONES[tone]) throw new Error('型が無い ' + tone + ' (' + word + ')');
        if (!line.toLowerCase().includes(word.split(' ')[0].toLowerCase())) throw new Error('英文に語が無い ' + word);
        const [toneJa, voice, who, direction] = TONES[tone];
        n++;
        pack.cards.push({ id: 'tw' + String(n).padStart(3, '0'), word, pos, ja, level: Math.max(1, (band - 400) / 100), band, cost: COSTS[i % COSTS.length], ability: ABILS[i % ABILS.length], tone, toneJa,
            style: styles[(start + i * 7) % styles.length], line, lineJa, scene, voice: { voice, who, direction: `${direction} Stress '${word}'.` } });
        added++;
    });
    fs.writeFileSync(P, JSON.stringify(pack, null, 2) + '\n');
    const by = {};
    for (const c of pack.cards) by[c.band] = (by[c.band] || 0) + 1;
    console.log(`足した ${added} 語。合計 ${pack.cards.length} 語。点数帯ごと:`, by);
}
module.exports = { addBand };
