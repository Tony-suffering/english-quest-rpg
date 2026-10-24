/**
 * Silent Mentorship — ten teaching moments from Gondo to the apprentice.
 * Each entry captures a small, specific mistake and the wordless correction
 * that followed: a slow redemonstration, a two-millimeter adjustment, a
 * deliberate pause. The lessons are practical, distilled from the act itself,
 * never spoken aloud. Unlocked progressively by the apprentice's night count.
 */

export interface SilentMentorship {
    id: string;
    setting: string;
    apprenticesMistake: string;
    gondosCorrection: string;
    theLesson: string;
    unlockAfterNights: number;
}

export const SILENT_MENTORSHIP: SilentMentorship[] = [
    {
        id: 'mentor-pour-speed',
        setting: '開店前、ビールの試し注ぎを任された夜。',
        apprenticesMistake: 'グラスを傾けたまま、一気に注ぎ切ってしまった。泡は粗く、縁から溢れた。',
        gondosCorrection: '権藤は黙って新しいグラスを取り、自分の手元に置いた。注ぎ口を七分ほど傾け、瓶の腹で角度を保ったまま、ひと呼吸分だけ遅く注いだ。注ぎ終わっても、こちらを見なかった。',
        theLesson: '速さは手首で決まるのではなく、瓶の重さで決まる。重さを感じていない手は、必ず溢れる。',
        unlockAfterNights: 5,
    },
    {
        id: 'mentor-wipe-direction',
        setting: 'カウンターを拭き上げる作業中。',
        apprenticesMistake: '布巾を左右に往復させて拭き、木目に逆らった跡が残った。',
        gondosCorrection: '権藤は布巾を受け取らず、自分の布巾を出した。木目に沿って、端から端まで一方向に一度だけ滑らせた。戻すときは布巾を持ち上げた。それだけを二往復見せた。',
        theLesson: 'カウンターは片道で拭く。戻るときは浮かせる。木目に逆らった手は、必ず跡を残す。',
        unlockAfterNights: 10,
    },
    {
        id: 'mentor-glass-on-moisture',
        setting: '客に冷酒を出す直前、コースターを敷き忘れた場面。',
        apprenticesMistake: '結露の残る檜のコースター跡に、新しいグラスを直接置いた。底に輪が滲み始めていた。',
        gondosCorrection: '権藤はグラスを持ち上げ、隣の乾いた位置へ二センチだけ動かした。それから濡れた跡を親指の腹で一度押さえ、何事もなかったように次の仕事に戻った。',
        theLesson: '置く前に、置き場所を見る。湿りの上に置かれたグラスは、客が手を伸ばす前に温くなっている。',
        unlockAfterNights: 20,
    },
    {
        id: 'mentor-chopsticks-parallel',
        setting: '突き出しを出す前、箸を添える場面。',
        apprenticesMistake: '箸をカウンターの縁と正確に平行に、几帳面に揃えて置いた。',
        gondosCorrection: '権藤は箸先を三ミリだけ客側に向け直した。角度は測ったように変わらないが、客が手を下ろせば自然に指が収まる位置になっていた。そのまま次の皿に移った。',
        theLesson: '箸は定規の上に置くのではない。客の手の高さと角度の上に置く。',
        unlockAfterNights: 35,
    },
    {
        id: 'mentor-shoulder-change',
        setting: '常連の老人が二杯目を飲み終わったあと。',
        apprenticesMistake: '三杯目を勧めようと声をかけかけた。老人の肩が、数センチだけ下がっていたのに気づかなかった。',
        gondosCorrection: '権藤はこちらの袖口を一度だけ軽く指で止め、黙って温いほうじ茶を淹れて老人の前に置いた。注文も確認もしなかった。老人は無言で一口すすった。',
        theLesson: '客の注文は口ではなく、肩で変わる。肩が落ちたら、酒は終いだ。',
        unlockAfterNights: 50,
    },
    {
        id: 'mentor-phone-tone',
        setting: '閉店間際、予約の電話が鳴った場面。',
        apprenticesMistake: '「はい、もしもし」と普段のままの声で出てしまった。店の名も、時刻に合った抑揚もなかった。',
        gondosCorrection: '権藤は受話器を取らせず、自分でかけ直した。相手が出ると、店名、自分の名、時刻を一度区切って告げた。抑揚は昼より半分低かった。電話を置いたあとも何も言わなかった。',
        theLesson: '電話はカウンターの続きだ。店の名を先に、自分の名をあとに、時刻に合った声で。',
        unlockAfterNights: 75,
    },
    {
        id: 'mentor-ice-sound',
        setting: 'ロックグラスに氷を入れる場面。',
        apprenticesMistake: 'アイスピックを使わずに、氷を三つ、続けてグラスに落とした。カランと高い音が続いた。',
        gondosCorrection: '権藤は氷を一つ取り、グラスの内壁に沿わせて静かに滑らせた。音は一度、低く鳴って止まった。二つ目は最初の氷の上に、触れるだけで置いた。こちらを見なかった。',
        theLesson: '氷は落とさない、沿わせる。二度目の音が鳴ったら、もう遅い。',
        unlockAfterNights: 100,
    },
    {
        id: 'mentor-receipt-fold',
        setting: '会計後、釣り銭と領収書を返す場面。',
        apprenticesMistake: '領収書を折らずに、釣り銭の上に重ねて差し出した。紙が浮き、客は片手で受け取れなかった。',
        gondosCorrection: '権藤はそれを一度引き取り、領収書を縦に二つ折りにしてから釣り銭の下に敷いた。重ねる順を変えただけで、片手で掴めるようになった。黙って客に差し出した。',
        theLesson: '客が片手で取れない渡し方は、渡し方ではない。紙は下、金は上、折り目は縦。',
        unlockAfterNights: 150,
    },
    {
        id: 'mentor-ladle-return',
        setting: '煮物の鍋から小鉢に移し替える作業中。',
        apprenticesMistake: 'お玉を鍋の縁に立てかけて置いた。柄の先が汁に浸り、次に使うとき熱くて持てなかった。',
        gondosCorrection: '権藤は何も言わず、お玉を持ち替え、鍋の上に渡した受け皿の縁に柄だけを預けた。玉の部分は鍋の中、柄は宙に浮いた状態で止まった。そのまま別の仕事へ行った。',
        theLesson: '道具は次に使うときの自分のために置く。柄を汁に沈めたら、次の一手が一拍遅れる。',
        unlockAfterNights: 220,
    },
    {
        id: 'mentor-final-bow',
        setting: '最後の客を送り出し、暖簾を下ろす場面。',
        apprenticesMistake: '客が振り返る前に頭を下げ、客が振り返ったときにはもう背を向けていた。',
        gondosCorrection: '権藤は翌日、同じ時刻に自分で暖簾を下ろして見せた。客役の空席に向かって一度頭を下げ、上げたあとも三拍そのまま立ち続けた。客が角を曲がるまでの時間、と後で分かった。',
        theLesson: '頭を下げる長さは、客が振り返り終えるまで。背を向けるのは、客の背が消えてから。',
        unlockAfterNights: 350,
    },
];

export function getLearnedMentorship(totalNights: number): SilentMentorship[] {
    return SILENT_MENTORSHIP.filter((entry) => entry.unlockAfterNights <= totalNights);
}
