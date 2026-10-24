'use client';

/**
 * Silent Bartender -- Codex.
 *
 * A browsable archive of all lore the apprentice has gradually
 * pieced together: lost items, glass rituals, tab ledger, former
 * customers, seasonal greetings. Light theme, serif-driven,
 * paper-feel. Gated by totalNights from local stats.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { loadStats, type PlayerStats } from '@/lib/english/bar/storage';
import { getFoundItems } from '@/data/english/bar/lost-and-found';
import { getLearnedRituals } from '@/data/english/bar/glass-rituals';
import { getVisibleTabEntries } from '@/data/english/bar/tab-ledger';
import { getDiscoveredFormerCustomers } from '@/data/english/bar/former-customers-lore';
import { getVisibleGreetings } from '@/data/english/bar/seasonal-greeting-cards';
import { getLearnedRecipes } from '@/data/english/bar/gondo-recipes';
import { getLearnedExchanges } from '@/data/english/bar/wordless-exchanges';
import { getUnlockedHabits } from '@/data/english/bar/gondo-habits';
import { getUnlockedGrowth } from '@/data/english/bar/apprentice-growth';
import { getUnlockedRelationships } from '@/data/english/bar/counter-relationships';
import { getEarnedPersonas } from '@/data/english/bar/persona-titles';
import { getEarnedApprovals } from '@/data/english/bar/gondo-approvals';
import { ANNIVERSARY_OBSERVANCES } from '@/data/english/bar/yearly-anniversaries';
import { SILENT_CONFLICTS } from '@/data/english/bar/silent-conflicts';
import { SIGNATURE_ORDERS } from '@/data/english/bar/signature-orders';
import { IMPOSSIBLE_REQUESTS } from '@/data/english/bar/impossible-requests';
import { getFilledNotebookPages } from '@/data/english/bar/apprentice-notebook';
import { getLearnedPairings } from '@/data/english/bar/drink-pairings';
import { TRANSLATION_NOTES } from '@/data/english/bar/translation-notes';
import { WEATHER_TRIGGERED } from '@/data/english/bar/weather-triggered-regulars';
import { WEATHER_PIVOTS } from '@/data/english/bar/weather-pivot-dialog';
import { getMappedRoutines } from '@/data/english/bar/regular-routines';
import { getLearnedMentorship } from '@/data/english/bar/silent-mentorship';
import { getHeardRumors } from '@/data/english/bar/bar-rumors';
import { getObservedGestures } from '@/data/english/bar/gondo-gestures';
import { getRememberedSilences } from '@/data/english/bar/memorable-silences';
import { getStudiedExpressions } from '@/data/english/bar/english-expressions-learned';
import { getWitnessedKindnesses } from '@/data/english/bar/small-kindnesses';
import { CLOSING_RITUALS } from '@/data/english/bar/closing-rituals';
import { DIALECT_SAMPLES } from '@/data/english/bar/dialect-samples';
import { getRecordedSayings } from '@/data/english/bar/gondo-sayings';
import { getFoundLetters } from '@/data/english/bar/unsent-letters';
import { getKnownReadings } from '@/data/english/bar/reading-customer-notes';
import { INVENTORY_ITEMS } from '@/data/english/bar/nightly-inventory';
import { getRecognizedFaces } from '@/data/english/bar/customer-faces';
import { RADIO_FRAGMENTS } from '@/data/english/bar/radio-programs';
import { SEASONAL_POEMS } from '@/data/english/bar/seasonal-poems';
import { getRecordedDreams } from '@/data/english/bar/apprentice-dreams';
import { getArchivedNights } from '@/data/english/bar/specific-nights-archive';
import { getAchievedPrestige } from '@/data/english/bar/prestige-thresholds';
import { getKnownOrigins } from '@/data/english/bar/gondo-origins';
import { getDevelopedSignatures } from '@/data/english/bar/apprentice-signatures';
import { getRecordedReflections } from '@/data/english/bar/final-reflection';
import { getAdvancedLearned } from '@/data/english/bar/english-advanced-phrases';
import { FEELING_PHRASES } from '@/data/english/bar/customer-feelings-phrases';
import { getIdentifiedSmells } from '@/data/english/bar/bar-smells';
import { getLearnedHistory } from '@/data/english/bar/tokyo-bar-history';
import { FESTIVAL_NIGHTS } from '@/data/english/bar/festival-nights';
import { getNoticedProps } from '@/data/english/bar/small-props';
import { getQuietAchievements } from '@/data/english/bar/quiet-achievements';
import { THANKS_PHRASES } from '@/data/english/bar/thanks-phrases';

const C = {
    bg: '#FAF6EC',
    paper: '#FFFFFF',
    paperSoft: '#FAF6EC',
    ink: '#1C1917',
    inkSoft: '#44403C',
    faint: '#A8A29E',
    gold: '#B8860B',
    goldSoft: '#D4AF37',
    border: '#E5DCC0',
};

const SERIF = '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif';

export default function CodexPage() {
    const [stats, setStats] = useState<PlayerStats | null>(null);

    useEffect(() => {
        setStats(loadStats());
    }, []);

    const nights = stats?.totalNights ?? 0;

    const sections = useMemo(() => {
        if (!stats) return [];
        return [
            {
                id: 'apprentice-growth',
                heading: '見習いのノート',
                subhead: 'APPRENTICE — GROWTH',
                items: getUnlockedGrowth(nights).map(g => ({
                    title: `NIGHT ${g.unlockAfterNights} — ${g.category}`,
                    body: g.body,
                })),
            },
            {
                id: 'notebook',
                heading: '手控え帳',
                subhead: 'NOTEBOOK — PAGES',
                items: getFilledNotebookPages(nights).map(p => ({
                    title: `NIGHT ${p.unlockAfterNights} — ${p.pageTitle}`,
                    body: p.contentLines.map(l => `• ${l}`).join('\n'),
                })),
            },
            {
                id: 'english-expressions',
                heading: '覚えた英語',
                subhead: 'ENGLISH — LEARNED',
                items: getStudiedExpressions(nights).map(e => ({
                    title: `"${e.englishExpression}"  [${e.difficulty}]`,
                    body: `意味: ${e.japaneseMeaning}\n場面: ${e.exampleAtBar}\n\n覚える理由: ${e.whyUseful}`,
                })),
            },
            {
                id: 'kindnesses',
                heading: '客同士の小さな優しさ',
                subhead: 'WITNESSED — KINDNESSES',
                items: getWitnessedKindnesses(nights).map(k => ({
                    title: `NIGHT ${k.unlockAfterNights}`,
                    body: `場面: ${k.situation}\n\n${k.kindnessItself}\n\n受け手: ${k.receiversResponse}\n\n${k.apprenticesReflection}`,
                })),
            },
            {
                id: 'pairings',
                heading: '酒の選び方',
                subhead: 'DRINK — PAIRINGS',
                items: getLearnedPairings(nights).map(p => ({
                    title: p.situation,
                    body: `勧めの一杯: ${p.recommendedDrink}\n理由: ${p.reason}${p.counterPairing ? '\n別の選択: ' + p.counterPairing : ''}`,
                })),
            },
            {
                id: 'personas',
                heading: '積み上げた称号',
                subhead: 'EARNED — TITLES',
                items: getEarnedPersonas(stats).map(p => ({
                    title: p.title,
                    body: p.description,
                })),
            },
            {
                id: 'recipes',
                heading: '権藤の料理',
                subhead: 'GONDO — RECIPES',
                items: getLearnedRecipes(nights).map(r => ({
                    title: `${r.dishName} (${r.approxSeason})`,
                    body: `${r.description}\n\n儀式: ${r.gondosRitual}\n\n見習いの覚え書き: ${r.apprenticesNote}`,
                })),
            },
            {
                id: 'glass-rituals',
                heading: 'グラスの作法',
                subhead: 'GLASSWARE — RITUALS',
                items: getLearnedRituals(nights).map(r => ({
                    title: r.glassDescriptor,
                    body: `使う時: ${r.whenUsed}\n避ける時: ${r.whenAvoided}${r.gondosReason ? '\n権藤の理由: ' + r.gondosReason : ''}\n\n${r.apprenticesNote}`,
                })),
            },
            {
                id: 'exchanges',
                heading: '無言の合図',
                subhead: 'WORDLESS — EXCHANGES',
                items: getLearnedExchanges(nights).map(e => ({
                    title: `${e.situation.split('\n')[0]}  [${e.correctness}]`,
                    body: `権藤の合図: ${e.gondosMove}\n読み取り: ${e.apprenticesRead}`,
                })),
            },
            {
                id: 'habits',
                heading: '権藤の所作',
                subhead: 'GONDO — HABITS',
                items: getUnlockedHabits(nights).map(h => ({
                    title: `NIGHT ${h.unlockAfterNights}`,
                    body: h.meaning ? `${h.observation}\n\n${h.meaning}` : h.observation,
                })),
            },
            {
                id: 'approvals',
                heading: '権藤からの承認',
                subhead: 'GONDO — APPROVALS',
                items: getEarnedApprovals(nights).map(a => ({
                    title: `NIGHT ${a.unlockAfterNights} — ${a.rarityNote}`,
                    body: `場面: ${a.situation}\n合図: ${a.gondosSignal}\n\n${a.apprenticesRealization}`,
                })),
            },
            {
                id: 'anniversaries',
                heading: '静かな記念日',
                subhead: 'PRIVATE — ANNIVERSARIES',
                items: ANNIVERSARY_OBSERVANCES
                    .filter(a => a.unlockAfterNights <= nights)
                    .map(a => ({
                        title: `${a.month}月${a.day}日 — ${a.label}`,
                        body: `権藤の所作: ${a.gondosObservance}\n\n見習いの推理: ${a.apprenticesInference}`,
                    })),
            },
            {
                id: 'conflicts',
                heading: '無言の摩擦',
                subhead: 'SILENT — CONFLICTS',
                items: nights >= 30 ? SILENT_CONFLICTS.map(c => ({
                    title: c.participants,
                    body: `${c.tension}\n\n権藤の介入: ${c.gondosAct}\n\n${c.outcome}\n\n見習いの学び: ${c.apprenticesTakeaway}`,
                })) : [],
            },
            {
                id: 'signatures',
                heading: '決まり注文',
                subhead: 'REGULARS — SIGNATURE ORDERS',
                items: nights >= 20 ? SIGNATURE_ORDERS.map(s => ({
                    title: s.customerDescriptor,
                    body: `いつもの: ${s.usualOrder}\n合図: ${s.tell}${s.variantOrder ? '\n別の夜: ' + s.variantOrder : ''}\n\n${s.apprenticesNote}`,
                })) : [],
            },
            {
                id: 'impossible',
                heading: '叶わない頼み',
                subhead: 'IMPOSSIBLE — REQUESTS',
                items: nights >= 40 ? IMPOSSIBLE_REQUESTS.map(r => ({
                    title: r.customerDescriptor,
                    body: `頼み: ${r.theRequest}\n叶わぬ理由: ${r.whyImpossible}\n\n断り方: ${r.wordlessDecline}\n\n客の反応: ${r.customersResponse}`,
                })) : [],
            },
            {
                id: 'relationships',
                heading: '気づいた縁',
                subhead: 'COUNTER — RELATIONSHIPS',
                items: getUnlockedRelationships(nights).map(r => ({
                    title: `${r.partyA} と ${r.partyB}`,
                    body: `表向きの様子: ${r.surfaceBehavior}\n\n推測: ${r.hiddenLink}\n\n手がかり: ${r.evidence}`,
                })),
            },
            {
                id: 'tab',
                heading: 'ツケ帳',
                subhead: 'BAR — TAB LEDGER',
                items: getVisibleTabEntries(nights).map(t => ({
                    title: t.descriptor,
                    body: `取り決め: ${t.standingArrangement}\n精算の仕方: ${t.howTheyPay}\n\n${t.apprenticesNote}`,
                })),
            },
            {
                id: 'former',
                heading: '昔の常連',
                subhead: 'FORMER — CUSTOMERS',
                items: getDiscoveredFormerCustomers(nights).map(f => ({
                    title: f.nicknameOrDescriptor,
                    body: `店に残る跡: ${f.traceAtBar}\n権藤が漏らしたこと: ${f.whatGondoShared}\n\n${f.apprenticesReconstruction}`,
                })),
            },
            {
                id: 'lost-items',
                heading: '忘れ物の箱',
                subhead: 'LOST — AND — FOUND',
                items: getFoundItems(nights).map(l => ({
                    title: l.item,
                    body: `発見: ${l.foundOn}\n持ち主の推測: ${l.guessedOwner}\n権藤の処置: ${l.gondosJudgment}`,
                })),
            },
            {
                id: 'greetings',
                heading: 'コルク板の便り',
                subhead: 'CORK — GREETINGS',
                items: getVisibleGreetings(nights).map(g => ({
                    title: `${g.senderDescriptor} (${g.sentFrom})`,
                    body: `${g.message}\n\n見習いの推察: ${g.apprenticesInference}`,
                })),
            },
            {
                id: 'weather-regulars',
                heading: '天候で来る客',
                subhead: 'WEATHER — TRIGGERED',
                items: nights >= 25 ? WEATHER_TRIGGERED.map(w => ({
                    title: `${w.customerName} (${w.weather})`,
                    body: `到着: ${w.arrivalDetail}\n今夜の違い: ${w.tonalShift}${w.orderHint ? '\n注文: ' + w.orderHint : ''}`,
                })) : [],
            },
            {
                id: 'translation-notes',
                heading: '英語の手控え',
                subhead: 'TRANSLATION — NOTES',
                items: nights >= 10 ? TRANSLATION_NOTES.map(t => ({
                    title: `"${t.englishPhrase}"`,
                    body: `直訳: ${t.literalJapanese}\n実際の意味: ${t.realMeaning}\n場面: ${t.whenHeard}`,
                })) : [],
            },
            {
                id: 'weather-pivots',
                heading: '天気の話で言ってない事',
                subhead: 'WEATHER — PIVOT DIALOG',
                items: nights >= 30 ? WEATHER_PIVOTS.map(p => ({
                    title: `"${p.englishLine}"`,
                    body: `直訳: ${p.literalJapanese}\n本音: ${p.realPivot}\n場面: ${p.situation}`,
                })) : [],
            },
            {
                id: 'routines',
                heading: '常連の型',
                subhead: 'REGULARS — MAPPED ROUTINES',
                items: getMappedRoutines(nights).map(r => ({
                    title: `${r.descriptor} — ${r.frequency}`,
                    body: `到着: ${r.arrivalTime}\n型: ${r.orderOrRitual}\n滞在: ${r.durationPattern}\n\n${r.apprenticesObservation}`,
                })),
            },
            {
                id: 'mentorship',
                heading: '無言の指導',
                subhead: 'SILENT — MENTORSHIP',
                items: getLearnedMentorship(nights).map(m => ({
                    title: `NIGHT ${m.unlockAfterNights}`,
                    body: `場面: ${m.setting}\n見習いの誤り: ${m.apprenticesMistake}\n権藤の直し: ${m.gondosCorrection}\n\n学び: ${m.theLesson}`,
                })),
            },
            {
                id: 'rumors',
                heading: '街の噂',
                subhead: 'BAR — RUMORS',
                items: getHeardRumors(nights).map(r => ({
                    title: `[${r.truthStatus}] — ${r.heardFrom}`,
                    body: `${r.whatTheRumorSays}\n\n実際は: ${r.whatIsActuallyTrue}`,
                })),
            },
            {
                id: 'gestures',
                heading: '権藤の所作',
                subhead: 'GONDO — SIGNATURE GESTURES',
                items: getObservedGestures(nights).map(g => ({
                    title: g.name,
                    body: `形: ${g.shapeDescription}\n出る時: ${g.whenItAppears}\n\n見習いの模倣: ${g.apprenticesImitation}`,
                })),
            },
            {
                id: 'silences',
                heading: '記憶の沈黙',
                subhead: 'MEMORABLE — SILENCES',
                items: getRememberedSilences(nights).map(s => ({
                    title: `NIGHT ${s.unlockAfterNights} — ${s.durationFeel}`,
                    body: `落ちた時: ${s.whenItFell}\n在席: ${s.whoWasPresent}\n\n${s.whatTheSilenceHeld}\n\n終わり方: ${s.howItEnded}`,
                })),
            },
            {
                id: 'closing-rituals',
                heading: '閉店の手順',
                subhead: 'CLOSING — RITUALS',
                items: nights >= 15 ? CLOSING_RITUALS.sort((a, b) => a.order - b.order).map(r => ({
                    title: `${r.order}. ${r.ritualName}`,
                    body: `動作: ${r.exactAction}\n合図: ${r.timingCue}\n\n飛ばすと: ${r.whySubtleProblem}`,
                })) : [],
            },
            {
                id: 'dialects',
                heading: '方言',
                subhead: 'DIALECT — SAMPLES',
                items: nights >= 20 ? DIALECT_SAMPLES.map(d => ({
                    title: `${d.region} — "${d.phrase}"`,
                    body: `標準語: ${d.standardJapanese}\n話した人: ${d.speakerContext}\n\n${d.apprenticesImpression}`,
                })) : [],
            },
            {
                id: 'sayings',
                heading: '権藤の言葉',
                subhead: 'GONDO — SAYINGS',
                items: getRecordedSayings(nights).map(s => ({
                    title: `NIGHT ${s.unlockAfterNights}${s.toWhom ? ' — ' + s.toWhom : ''}`,
                    body: `「${s.saying}」\n\n場面: ${s.situation}`,
                })),
            },
            {
                id: 'unsent-letters',
                heading: '出されなかった手紙',
                subhead: 'UNSENT — LETTERS',
                items: getFoundLetters(nights).map(l => ({
                    title: `${l.foundLocation} (NIGHT ${l.unlockAfterNights})`,
                    body: `推測の差出人: ${l.writerGuess}\n宛先: ${l.addresseeGuess}\n\n${l.letterBody}`,
                })),
            },
            {
                id: 'reading-signs',
                heading: '客を読む',
                subhead: 'READING — CUSTOMER SIGNS',
                items: getKnownReadings(nights).map(r => ({
                    title: `${r.whatSignals}  — NIGHT ${r.unlockAfterNights}`,
                    body: `兆候: ${r.physicalCue}\n誤読: ${r.falsePositive}\n\n${r.apprenticesLearning}`,
                })),
            },
            {
                id: 'inventory',
                heading: '店の備え',
                subhead: 'NIGHTLY — INVENTORY',
                items: nights >= 10 ? INVENTORY_ITEMS.map(i => ({
                    title: `${i.itemName}${i.checkedEveryNight ? '' : ' (週次)'}`,
                    body: `置き場: ${i.whereItLives}\n確認: ${i.howChecked}\n\n見習いの落とし穴: ${i.commonMistake}`,
                })) : [],
            },
            {
                id: 'faces',
                heading: '顔の読み',
                subhead: 'FACIAL — EXPRESSIONS',
                items: getRecognizedFaces(nights).map(f => ({
                    title: f.expressionLabel,
                    body: `形: ${f.physicalDescription}\n意味: ${f.whatItSignals}\n\n紛らわしい: ${f.falseTwin}`,
                })),
            },
            {
                id: 'radio',
                heading: '深夜ラジオの破片',
                subhead: 'RADIO — FRAGMENTS',
                items: nights >= 20 ? RADIO_FRAGMENTS.map(r => ({
                    title: `${r.programTitle}${r.host ? ' / ' + r.host : ''}`,
                    body: `${r.overheardFragment}\n\n${r.listeningNote}`,
                })) : [],
            },
            {
                id: 'poems',
                heading: '見習いの拙詩',
                subhead: 'SEASONAL — POEMS',
                items: nights >= 15 ? SEASONAL_POEMS.map(p => ({
                    title: p.season,
                    body: `${p.body}${p.notebookMarginalia ? '\n\n欄外: ' + p.notebookMarginalia : ''}`,
                })) : [],
            },
            {
                id: 'dreams',
                heading: '夢の覚え書き',
                subhead: 'APPRENTICE — DREAMS',
                items: getRecordedDreams(nights).map(d => ({
                    title: `NIGHT ${d.unlockAfterNights}`,
                    body: `${d.dreamDescription}\n\n目覚めた時: ${d.wakingDetail}${d.interpretation ? '\n\n読み: ' + d.interpretation : ''}`,
                })),
            },
            {
                id: 'archived-nights',
                heading: '覚えている夜',
                subhead: 'ARCHIVED — NIGHTS',
                items: getArchivedNights(nights).map(n => ({
                    title: `NIGHT ${n.unlockAfterNights} — ${n.occasionTitle}`,
                    body: `${n.brief}\n\n残った理由: ${n.whatMadeIt}`,
                })),
            },
            {
                id: 'origins',
                heading: '権藤の来歴',
                subhead: 'GONDO — ORIGINS',
                items: getKnownOrigins(nights).map(o => ({
                    title: `${o.era} — ${o.fragmentTitle}`,
                    body: `${o.body}\n\n知った経緯: ${o.howItSurfaced}`,
                })),
            },
            {
                id: 'my-signatures',
                heading: '見習いの型',
                subhead: 'APPRENTICE — SIGNATURES',
                items: getDevelopedSignatures(nights).map(s => ({
                    title: s.signatureName,
                    body: `技: ${s.technique}\n由来: ${s.originStory}\n\n権藤の反応: ${s.gondosResponse}`,
                })),
            },
            {
                id: 'prestige',
                heading: '高夜の到達',
                subhead: 'PRESTIGE — THRESHOLDS',
                items: getAchievedPrestige(nights).map(p => ({
                    title: `NIGHT ${p.thresholdNights} — ${p.title}`,
                    body: `${p.sceneOrReveal}\n\n${p.unlockNote}`,
                })),
            },
            {
                id: 'advanced-english',
                heading: '高等英語',
                subhead: 'ENGLISH — ADVANCED',
                items: getAdvancedLearned(nights).map(p => ({
                    title: `"${p.englishPhrase}" (NIGHT ${p.unlockAfterNights})`,
                    body: `${p.jpTranslation}\n使いどき: ${p.registerNote}\n場面: ${p.exampleContext}${p.pitfall ? '\n\n落とし穴: ' + p.pitfall : ''}`,
                })),
            },
            {
                id: 'reflections',
                heading: '長い手記',
                subhead: 'FINAL — REFLECTIONS',
                items: getRecordedReflections(nights).map(r => ({
                    title: `NIGHT ${r.unlockAfterNights} — ${r.reflectionTitle}`,
                    body: `${r.body}\n\n中心像: ${r.centralImage}`,
                })),
            },
            {
                id: 'feeling-phrases',
                heading: '感情の英語',
                subhead: 'FEELING — PHRASES',
                items: nights >= 15 ? FEELING_PHRASES.map(f => ({
                    title: `[${f.feeling}] "${f.englishPhrase}"`,
                    body: `意味: ${f.japaneseMeaning}\n場面: ${f.howItsUsed}${f.culturalNote ? '\n文化の隙間: ' + f.culturalNote : ''}`,
                })) : [],
            },
            {
                id: 'bar-smells',
                heading: '店の匂いの地図',
                subhead: 'BAR — SMELLS',
                items: getIdentifiedSmells(nights).map(s => ({
                    title: s.smellLabel,
                    body: `${s.description}\n重なる匂い: ${s.layeredNotes}`,
                })),
            },
            {
                id: 'tokyo-history',
                heading: '東京の居酒屋史',
                subhead: 'TOKYO — BAR HISTORY',
                items: getLearnedHistory(nights).map(h => ({
                    title: `${h.era} — ${h.topic}`,
                    body: `${h.body}\n\n出典: ${h.source}`,
                })),
            },
            {
                id: 'festivals',
                heading: '祭りの夜',
                subhead: 'FESTIVAL — NIGHTS',
                items: FESTIVAL_NIGHTS
                    .filter(f => f.unlockAfterNights <= nights)
                    .map(f => ({
                        title: `${f.festivalName} (${f.approxMonth}/${f.approxDay > 0 ? f.approxDay : '—'})`,
                        body: `${f.atmosphericShift}\n\n権藤の特別な一手: ${f.specialTouch}`,
                    })),
            },
            {
                id: 'small-props',
                heading: '店の小物',
                subhead: 'SMALL — PROPS',
                items: getNoticedProps(nights).map(p => ({
                    title: p.propName,
                    body: `場所: ${p.whereItLives}\n\n${p.microStory}\n\n${p.apprenticesNote}`,
                })),
            },
            {
                id: 'quiet-achievements',
                heading: '誰も知らない達成',
                subhead: 'QUIET — ACHIEVEMENTS',
                items: getQuietAchievements(nights).map(q => ({
                    title: `NIGHT ${q.unlockAfterNights} — ${q.title}  [${q.whoNoticed}]`,
                    body: `${q.description}\n\n感覚: ${q.howItFelt}`,
                })),
            },
            {
                id: 'thanks',
                heading: '英語の「ありがとう」',
                subhead: 'ENGLISH — THANKS VARIANTS',
                items: nights >= 10 ? THANKS_PHRASES.map(t => ({
                    title: `[${t.warmth}] "${t.englishPhrase}"`,
                    body: `日本語: ${t.japaneseEquivalent}\n場面: ${t.situation}\n丁寧度: ${t.levelOfFormality}`,
                })) : [],
            },
        ].filter(s => s.items.length > 0);
    }, [stats, nights]);

    if (!stats) {
        return (
            <div style={styles.loading}>
                <div style={{ color: C.faint, letterSpacing: 2 }}>loading...</div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.wrap}>
                <header style={styles.header}>
                    <Link href="/english/bar" style={styles.backLink}>
                        ← 店へ戻る
                    </Link>
                    <div style={styles.headerLabel}>CODEX</div>
                    <h1 style={styles.h1}>見習いの記録</h1>
                    <div style={styles.headerMeta}>
                        NIGHT {nights}  •  {sections.length} 章
                    </div>
                </header>

                {sections.length === 0 && (
                    <div style={styles.empty}>
                        <div>まだ何も記録されていない。</div>
                        <div style={{ marginTop: 12, color: C.faint, fontSize: 12 }}>
                            夜を重ねると、この頁は少しずつ埋まっていく。
                        </div>
                    </div>
                )}

                {sections.length > 1 && (
                    <nav style={styles.toc}>
                        {sections.map(s => (
                            <a key={s.id} href={`#${s.id}`} style={styles.tocLink}>
                                {s.heading} ({s.items.length})
                            </a>
                        ))}
                    </nav>
                )}

                {sections.map((section, sidx) => (
                    <details
                        key={section.id}
                        id={section.id}
                        style={styles.section}
                        open={sidx < 3}
                    >
                        <summary style={{ ...styles.sectionHead, cursor: 'pointer' }}>
                            <div style={styles.sectionLabel}>{section.subhead}</div>
                            <div style={styles.sectionTitle}>{section.heading}</div>
                            <div style={styles.sectionCount}>
                                {section.items.length} 件 （タップで開閉）
                            </div>
                        </summary>
                        <div style={styles.items}>
                            {section.items.map((item, idx) => (
                                <article key={idx} style={styles.card}>
                                    <div style={styles.cardTitle}>{item.title}</div>
                                    <div style={styles.cardBody}>{item.body}</div>
                                </article>
                            ))}
                        </div>
                    </details>
                ))}

                <footer style={styles.footer}>
                    <Link href="/english/bar" style={styles.backLinkFooter}>
                        店へ戻る
                    </Link>
                </footer>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: C.bg,
        fontFamily: SERIF,
        color: C.ink,
    },
    loading: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.bg,
    },
    wrap: {
        maxWidth: 640,
        margin: '0 auto',
        padding: '24px 16px 64px',
    },
    header: {
        textAlign: 'center',
        marginBottom: 32,
        paddingBottom: 20,
        borderBottom: `1px solid ${C.border}`,
    },
    backLink: {
        display: 'inline-block',
        padding: '6px 10px',
        marginBottom: 16,
        fontSize: 11,
        color: C.gold,
        textDecoration: 'none',
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        letterSpacing: 2,
    },
    headerLabel: {
        fontSize: 10,
        letterSpacing: 6,
        color: C.gold,
        fontWeight: 500,
        marginBottom: 8,
    },
    h1: {
        fontSize: 26,
        fontWeight: 600,
        margin: 0,
        letterSpacing: 2,
        color: C.ink,
    },
    headerMeta: {
        marginTop: 10,
        fontSize: 11,
        letterSpacing: 3,
        color: C.faint,
    },
    toc: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 28,
        padding: '14px 16px',
        background: C.paper,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
    },
    tocLink: {
        fontSize: 11,
        color: C.gold,
        textDecoration: 'none',
        padding: '4px 8px',
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        letterSpacing: 1,
    },
    section: {
        marginBottom: 40,
    },
    sectionHead: {
        textAlign: 'center',
        marginBottom: 16,
        paddingBottom: 10,
        borderBottom: `1px dashed ${C.border}`,
    },
    sectionLabel: {
        fontSize: 10,
        letterSpacing: 5,
        color: C.gold,
    },
    sectionTitle: {
        marginTop: 4,
        fontSize: 18,
        letterSpacing: 3,
        color: C.ink,
    },
    sectionCount: {
        marginTop: 4,
        fontSize: 10,
        letterSpacing: 2,
        color: C.faint,
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    card: {
        background: C.paper,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 600,
        color: C.gold,
        letterSpacing: 1,
        marginBottom: 8,
        paddingBottom: 6,
        borderBottom: `1px dotted ${C.border}`,
    },
    cardBody: {
        fontSize: 13,
        color: C.ink,
        lineHeight: 1.9,
        whiteSpace: 'pre-wrap',
        letterSpacing: '0.04em',
    },
    empty: {
        padding: '64px 24px',
        textAlign: 'center',
        color: C.inkSoft,
        fontSize: 14,
    },
    footer: {
        marginTop: 32,
        textAlign: 'center',
        paddingTop: 20,
        borderTop: `1px solid ${C.border}`,
    },
    backLinkFooter: {
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: 11,
        color: C.gold,
        textDecoration: 'none',
        border: `1px solid ${C.gold}`,
        borderRadius: 8,
        letterSpacing: 3,
    },
};
