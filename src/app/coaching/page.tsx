'use client';

import { useState, useEffect } from 'react';

type Tab = 'overview' | 'myself' | 'dialogue' | 'business' | 'documents' | 'presentation';

export default function CoachingPage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const slides = [
        // Title
        {
            type: 'title',
            content: {
                title: '中隈さんとの対話',
                subtitle: '認知科学、事業、そして俺自身のこと',
                date: '2026年1月',
            },
        },
        // Agenda
        {
            type: 'agenda',
            content: {
                title: '今日話したいこと',
                items: [
                    { num: '01', text: 'この関係の本質', sub: '俺はクライアントじゃない' },
                    { num: '02', text: '認知科学コーチングとは', sub: '一般的なトレーニングとの違い' },
                    { num: '03', text: '中隈さんの事業', sub: '整理した方がいいこと' },
                    { num: '04', text: '俺自身のこと', sub: 'やりたいこと、聞きたいこと' },
                ],
            },
        },
        // Section 1
        {
            type: 'section',
            content: {
                number: '01',
                title: 'この関係の本質',
            },
        },
        // Relationship
        {
            type: 'comparison',
            content: {
                title: '俺と中隈さんの関係',
                left: {
                    label: '一般的な構図',
                    items: ['コーチ → クライアント', 'サービス提供者 → 消費者', '指導する側 → 指導される側'],
                    color: 'stone',
                },
                right: {
                    label: '俺たちの構図',
                    items: ['お互いに目指すものがある人間同士', '俺は中隈さんを応援している', '中隈さんは俺の整理を手伝う（かも）'],
                    color: 'amber',
                },
            },
        },
        // Money
        {
            type: 'statement',
            content: {
                title: '月3,000円の意味',
                main: '「コーチング料」じゃない。「応援料」だ。',
                sub: '何かを求めているわけじゃない。\n中隈さんがやろうとしていることを応援したいから払っている。',
            },
        },
        // Section 2
        {
            type: 'section',
            content: {
                number: '02',
                title: '認知科学コーチングとは',
            },
        },
        // Quote
        {
            type: 'quote',
            content: {
                quote: '身体が変わるのは結果であって、\n本当に変わっているのは認識です。',
                author: '中隈さん',
                source: 'noteより',
            },
        },
        // Comparison
        {
            type: 'comparison',
            content: {
                title: '何が違うのか',
                left: {
                    label: '一般的なパーソナルトレーニング',
                    items: ['週3回筋トレしましょう', 'カロリー計算、食事制限', '頑張って続けましょう', 'リバウンドとの戦い'],
                    color: 'stone',
                },
                right: {
                    label: '認知科学コーチング',
                    items: ['なぜその身体になりたいのか？', '自己イメージの書き換え', 'したくなる状態を作る', 'コンフォートゾーンの移行'],
                    color: 'emerald',
                },
            },
        },
        // Key concepts
        {
            type: 'concepts',
            content: {
                title: '認知科学の核心概念',
                concepts: [
                    {
                        term: 'コンフォートゾーン',
                        definition: '今の自分の「当たり前」の範囲。人は無意識にここに留まろうとする。',
                    },
                    {
                        term: 'スコトーマ',
                        definition: '心理的盲点。脳のフィルタリングで見えなくなっている情報。',
                    },
                    {
                        term: 'エフィカシー',
                        definition: 'ゴール達成能力の自己評価。これが高いと行動が変わる。',
                    },
                    {
                        term: 'ブリーフシステム',
                        definition: '信念体系。「自分はこういう人間だ」という認識の集合。',
                    },
                ],
            },
        },
        // Core insight
        {
            type: 'statement',
            content: {
                title: '核心',
                main: '外側から変えようとするんじゃない。\n内側（認識）を変えれば、行動は自然と変わる。',
                sub: '「頑張る」必要がなくなる。',
            },
        },
        // Section 3
        {
            type: 'section',
            content: {
                number: '03',
                title: '中隈さんの事業',
            },
        },
        // Market data
        {
            type: 'data',
            content: {
                title: '市場の相場',
                main: '月額3,000円は相場の10〜26倍安い',
                items: [
                    { label: 'パーソナルトレーニング', value: '月3〜8万円' },
                    { label: 'コーチング（1時間）', value: '1〜3万円' },
                    { label: '3ヶ月集中プログラム', value: '10〜20万円' },
                ],
                note: 'これは批判じゃない。整理のための事実。',
            },
        },
        // Business points
        {
            type: 'list',
            content: {
                title: '整理した方がいいこと',
                items: [
                    { main: 'サービス内容の定義', sub: '何を提供して、何を提供しないか' },
                    { main: '価格設定の根拠', sub: '友人価格？お試し価格？本来の価格？' },
                    { main: '契約形態', sub: '月額継続？期間契約？都度払い？' },
                    { main: '事務処理', sub: '請求書、契約書、帳簿' },
                    { main: '差別化の言語化', sub: '元航空自衛隊 × 認知科学 × ボディメイク' },
                ],
            },
        },
        // Unique value
        {
            type: 'statement',
            content: {
                title: '中隈さんのユニークな価値',
                main: '元航空自衛隊 × 認知科学 × ボディメイク',
                sub: 'この組み合わせは他にない。\n規律、メンタル、理論、実践。全部持っている。',
            },
        },
        // Section 4
        {
            type: 'section',
            content: {
                number: '04',
                title: '俺自身のこと',
            },
        },
        // My thing
        {
            type: 'statement',
            content: {
                title: '俺もやりたい',
                main: '自分で何かやりたい。\n結局、コーチング的なものになると思う。',
                sub: '',
            },
        },
        // Why coaching
        {
            type: 'list',
            content: {
                title: 'なぜコーチング的なものなのか',
                items: [
                    { main: '人の話を聞くこと、整理することが得意', sub: 'たぶん' },
                    { main: 'モノを売るより、人に関わる方が向いている', sub: 'たぶん' },
                    { main: '自分自身が「認識の変化」で変わってきた経験がある', sub: '' },
                    { main: '内装の仕事だけじゃない、別の軸が欲しい', sub: '' },
                ],
            },
        },
        // Questions for Nakakuma
        {
            type: 'questions',
            content: {
                title: '中隈さんに聞きたいこと',
                questions: [
                    'コーチングを始めるとき、最初の一歩は何だった？',
                    '俺がコーチング的なことを始めるとしたら、どう思う？',
                    '一緒に何かできる可能性はある？',
                    '中隈さん自身のコンフォートゾーンの外側のゴールは？',
                ],
            },
        },
        // Ending
        {
            type: 'ending',
            content: {
                title: 'この対話の目的',
                main: 'お互いに何かを目指している人間同士が、\nお互いをサポートする。',
                sub: '俺は中隈さんの事業を応援している。\n中隈さんは俺の考えを整理する手伝いをしてくれる（かもしれない）。\n\nそういう対等な関係を続けていきたい。',
            },
        },
    ];

    useEffect(() => {
        if (activeTab !== 'presentation') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setCurrentSlide((prev) => Math.max(prev - 1, 0));
            } else if (e.key === 'f') {
                setIsFullscreen(!isFullscreen);
            } else if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, slides.length, isFullscreen]);

    const handlePrint = () => {
        window.print();
    };

    const slide = slides[currentSlide];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderSlide = (slideData: any) => {
        switch (slideData.type) {
            case 'title':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <h1 className="text-4xl md:text-6xl font-light text-stone-800 tracking-wider mb-6">
                            {slideData.content.title}
                        </h1>
                        <p className="text-lg md:text-xl text-stone-500 mb-12">{slideData.content.subtitle}</p>
                        <p className="text-stone-400">{slideData.content.date}</p>
                    </div>
                );

            case 'agenda':
                return (
                    <div className="flex flex-col h-full p-6 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-8">{slideData.content.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {slideData.content.items.map((item: { num: string; text: string; sub: string }, i: number) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200">
                                    <span className="text-3xl font-light text-amber-500">{item.num}</span>
                                    <div>
                                        <p className="text-lg font-medium text-stone-800">{item.text}</p>
                                        <p className="text-stone-500 text-sm">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'section':
                return (
                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-amber-50 to-emerald-50 rounded-xl">
                        <span className="text-7xl md:text-8xl font-light text-amber-300 mb-4">{slideData.content.number}</span>
                        <h2 className="text-3xl md:text-4xl font-light text-stone-800 tracking-wider">{slideData.content.title}</h2>
                    </div>
                );

            case 'comparison':
                return (
                    <div className="flex flex-col h-full p-6 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6">{slideData.content.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            <div className={`p-6 rounded-xl ${slideData.content.left.color === 'stone' ? 'bg-stone-100' : 'bg-amber-50'}`}>
                                <h3 className="text-lg font-medium text-stone-700 mb-4">{slideData.content.left.label}</h3>
                                <ul className="space-y-3">
                                    {slideData.content.left.items.map((item: string, i: number) => (
                                        <li key={i} className="text-stone-600 flex items-start gap-2">
                                            <span className="text-stone-400">-</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`p-6 rounded-xl ${slideData.content.right.color === 'emerald' ? 'bg-emerald-50' : 'bg-amber-100'}`}>
                                <h3 className={`text-lg font-medium mb-4 ${slideData.content.right.color === 'emerald' ? 'text-emerald-800' : 'text-amber-800'}`}>
                                    {slideData.content.right.label}
                                </h3>
                                <ul className="space-y-3">
                                    {slideData.content.right.items.map((item: string, i: number) => (
                                        <li key={i} className={`flex items-start gap-2 ${slideData.content.right.color === 'emerald' ? 'text-emerald-700' : 'text-amber-700'}`}>
                                            <span className={slideData.content.right.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}>+</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'statement':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 text-center">
                        <p className="text-lg text-amber-600 mb-6">{slideData.content.title}</p>
                        <h2 className="text-2xl md:text-4xl font-light text-stone-800 leading-tight mb-6 whitespace-pre-line">
                            {slideData.content.main}
                        </h2>
                        {slideData.content.sub && (
                            <p className="text-lg text-stone-500 whitespace-pre-line">{slideData.content.sub}</p>
                        )}
                    </div>
                );

            case 'quote':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl">
                        <blockquote className="text-2xl md:text-4xl font-light text-stone-700 text-center leading-relaxed mb-6 whitespace-pre-line">
                            &ldquo;{slideData.content.quote}&rdquo;
                        </blockquote>
                        <p className="text-lg text-stone-500">
                            — {slideData.content.author}
                            <span className="text-stone-400 ml-2">{slideData.content.source}</span>
                        </p>
                    </div>
                );

            case 'concepts':
                return (
                    <div className="flex flex-col h-full p-6 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6">{slideData.content.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {slideData.content.concepts.map((concept: { term: string; definition: string }, i: number) => (
                                <div key={i} className="p-4 bg-white rounded-xl border border-stone-200">
                                    <h3 className="text-lg font-medium text-amber-700 mb-2">{concept.term}</h3>
                                    <p className="text-stone-600 text-sm">{concept.definition}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'data':
                return (
                    <div className="flex flex-col h-full p-6 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-3">{slideData.content.title}</h2>
                        <p className="text-xl text-rose-600 mb-6">{slideData.content.main}</p>
                        <div className="space-y-3 mb-6">
                            {slideData.content.items.map((item: { label: string; value: string }, i: number) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg border border-stone-200">
                                    <span className="text-stone-600">{item.label}</span>
                                    <span className="text-lg font-medium text-stone-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-stone-500 italic text-sm">{slideData.content.note}</p>
                    </div>
                );

            case 'list':
                return (
                    <div className="flex flex-col h-full p-6 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6">{slideData.content.title}</h2>
                        <div className="space-y-3 flex-1">
                            {slideData.content.items.map((item: { main: string; sub: string }, i: number) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-stone-200">
                                    <span className="text-xl font-light text-amber-500">{i + 1}</span>
                                    <div>
                                        <p className="font-medium text-stone-800">{item.main}</p>
                                        {item.sub && <p className="text-stone-500 text-sm">{item.sub}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'questions':
                return (
                    <div className="flex flex-col h-full p-6 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6">{slideData.content.title}</h2>
                        <div className="space-y-4 flex-1">
                            {slideData.content.questions.map((q: string, i: number) => (
                                <div key={i} className="p-4 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl">
                                    <p className="text-lg text-stone-700">{q}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'ending':
                return (
                    <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 text-center bg-gradient-to-br from-amber-50 to-emerald-50 rounded-xl">
                        <p className="text-lg text-amber-600 mb-4">{slideData.content.title}</p>
                        <h2 className="text-2xl md:text-3xl font-light text-stone-800 leading-tight mb-6 whitespace-pre-line">
                            {slideData.content.main}
                        </h2>
                        <p className="text-stone-600 whitespace-pre-line max-w-xl">{slideData.content.sub}</p>
                    </div>
                );

            default:
                return null;
        }
    };

    if (activeTab === 'presentation' && isFullscreen) {
        return (
            <div className="fixed inset-0 z-50 bg-stone-100">
                {/* Progress */}
                <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
                    <div
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    />
                </div>

                {/* Controls */}
                <div className="fixed top-4 right-4 z-50">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="px-3 py-2 bg-white/80 backdrop-blur rounded-lg text-sm text-stone-600 hover:bg-white transition-all"
                    >
                        縮小
                    </button>
                </div>

                {/* Slide */}
                <div className="h-screen flex items-stretch p-8">
                    {renderSlide(slide)}
                </div>

                {/* Navigation */}
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur rounded-full shadow-lg z-50">
                    <button
                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                        disabled={currentSlide === 0}
                        className="p-2 text-stone-600 hover:text-stone-800 disabled:opacity-30"
                    >
                        ←
                    </button>
                    <span className="text-sm text-stone-500 min-w-[60px] text-center">
                        {currentSlide + 1} / {slides.length}
                    </span>
                    <button
                        onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                        disabled={currentSlide === slides.length - 1}
                        className="p-2 text-stone-600 hover:text-stone-800 disabled:opacity-30"
                    >
                        →
                    </button>
                </div>

                {/* Keyboard hint */}
                <div className="fixed bottom-4 right-4 text-xs text-stone-400 z-50">
                    ← → キー / Esc: 縮小
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100">
            {/* Header */}
            <div className="print:hidden bg-white border-b border-stone-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <h1 className="text-xl font-light text-stone-800 tracking-wider mb-4">
                        中隈さんとのコーチング
                    </h1>
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { id: 'overview', label: '現状整理' },
                            { id: 'myself', label: '俺のこと' },
                            { id: 'dialogue', label: '対話テーマ' },
                            { id: 'business', label: '事業の話' },
                            { id: 'documents', label: '書類' },
                            { id: 'presentation', label: 'プレゼン' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-amber-100 text-amber-800 font-medium'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                        {activeTab === 'documents' && (
                            <button
                                onClick={handlePrint}
                                className="ml-auto px-4 py-2 bg-stone-800 text-white rounded-lg text-sm"
                            >
                                印刷
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8 print:px-12">

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">中隈さんとは</h2>
                            <div className="space-y-3 text-stone-700">
                                <p>元航空自衛隊。認知科学に基づくボディメイクコーチ。</p>
                                <p>一般的なパーソナルトレーナーとの決定的な違い：</p>
                                <div className="bg-amber-50 rounded-lg p-4 mt-4">
                                    <p className="font-medium text-amber-900">「身体が変わるのは結果であって、本当に変わっているのは認識です。」</p>
                                    <p className="text-sm text-amber-700 mt-2">— 中隈さんのnoteより</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">認知科学コーチングとは</h2>
                            <div className="space-y-4 text-stone-700">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-stone-50 rounded-lg p-4">
                                        <p className="font-medium text-stone-600 text-sm mb-2">一般的なパーソナルトレーニング</p>
                                        <ul className="text-sm space-y-1">
                                            <li>・週3回筋トレしましょう</li>
                                            <li>・カロリー計算、食事制限</li>
                                            <li>・頑張って続けましょう</li>
                                            <li>・リバウンドとの戦い</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4">
                                        <p className="font-medium text-amber-800 text-sm mb-2">認知科学コーチング</p>
                                        <ul className="text-sm space-y-1">
                                            <li>・なぜその身体になりたいのか？</li>
                                            <li>・自己イメージの書き換え</li>
                                            <li>・したくなる状態を作る</li>
                                            <li>・コンフォートゾーンの移行</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="text-sm">
                                        <strong>核心</strong>：外側から変えようとするのではなく、内側（認識・ブリーフシステム）を変えることで、
                                        自然と行動が変わる。「頑張る」必要がなくなる。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">現状の問題点</h2>
                            <div className="space-y-4">
                                <div className="bg-rose-50 rounded-lg p-4">
                                    <p className="font-medium text-rose-800">月額3,000円は極端に安すぎる</p>
                                    <div className="mt-3 text-sm text-rose-700 space-y-1">
                                        <p>・パーソナルトレーニング相場：月3〜8万円</p>
                                        <p>・コーチング相場：1時間1〜3万円</p>
                                        <p>・つまり10〜26倍安い</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-rose-200 text-sm text-rose-800">
                                        <p><strong>安すぎることの弊害</strong></p>
                                        <ul className="mt-2 space-y-1">
                                            <li>・クライアント側のコミットメントが下がる（安いから「やらなくてもいいや」）</li>
                                            <li>・サービスの価値が過小評価される</li>
                                            <li>・コーチ側の持続可能性がない</li>
                                            <li>・プロフェッショナルとして見られにくい</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-stone-50 rounded-lg p-4">
                                    <p className="font-medium text-stone-700">事務処理の不在</p>
                                    <ul className="mt-2 text-sm text-stone-600 space-y-1">
                                        <li>・請求書なし → 確定申告で売上の証拠が曖昧</li>
                                        <li>・契約書なし → トラブル時の保護がない、サービス範囲が不明確</li>
                                        <li>・記録なし → 事業としての体制が整っていない</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">このページの目的</h2>
                            <div className="space-y-3 text-stone-700">
                                <p>来週のMTGで話すべきことを整理する。</p>
                                <ol className="list-decimal pl-5 space-y-2">
                                    <li><strong>俺のこと</strong>：俺の立場、俺自身がやりたいこと</li>
                                    <li><strong>対話テーマ</strong>：認知科学の観点から、自分自身と向き合う深い問い</li>
                                    <li><strong>事業の話</strong>：中隈さんのビジネスとして整理すべきこと</li>
                                    <li><strong>書類</strong>：契約書・請求書（必要に応じて）</li>
                                </ol>
                            </div>
                        </section>
                    </div>
                )}

                {/* Myself Tab */}
                {activeTab === 'myself' && (
                    <div className="space-y-6">
                        <section className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">俺の立場</h2>
                            <div className="space-y-3 text-stone-700">
                                <p>
                                    <strong>俺は「クライアント」じゃない。「サポーター」だ。</strong>
                                </p>
                                <p>
                                    月3000円は「コーチング料」じゃなくて「応援料」。
                                    中隈さんがやろうとしていることを応援したいから払っている。
                                    何かを求めているわけじゃない。
                                </p>
                                <p>
                                    だから「安すぎる料金で受けてる」わけじゃない。
                                    むしろ、中隈さんの事業が成長するために、一緒に形を作っていく立場。
                                </p>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">俺もやりたいこと</h2>
                            <div className="space-y-4 text-stone-700">
                                <p>
                                    俺も自分で何かやりたい。
                                    結局、コーチング的なものにならざるを得ないと思っている。
                                </p>
                                <div className="bg-stone-50 rounded-lg p-4 mt-4">
                                    <p className="font-medium text-stone-800 mb-3">なぜ「コーチング的なもの」なのか？</p>
                                    <ul className="space-y-2 text-sm">
                                        <li>・人の話を聞くこと、整理することが得意（たぶん）</li>
                                        <li>・モノを売るより、人に関わる方が向いている（たぶん）</li>
                                        <li>・自分自身が「認識の変化」で変わってきた経験がある</li>
                                        <li>・内装の仕事だけじゃない、別の軸が欲しい</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">考えるべきこと</h2>
                            <p className="text-sm text-stone-500 mb-4">中隈さんと話しながら、自分のことも整理する</p>
                            <div className="space-y-4">
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">誰に対して何を提供したい？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        ターゲットは誰？経営者？若者？同業者？
                                        提供するのは何？話を聞くこと？整理すること？気づきを与えること？
                                    </p>
                                </div>
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">なぜ俺がそれをやる意味がある？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        内装業の経験、AIとの協働、言語化の力、岩崎内装という土台。
                                        俺にしかできない形は何か。
                                    </p>
                                </div>
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">どこから始める？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        いきなり「コーチングやります」は違う。
                                        まず何をしてみる？誰と話してみる？
                                    </p>
                                </div>
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">中隈さんから学べることは？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        認知科学の理論、コーチとしての姿勢、事業の作り方。
                                        サポーターとして関わりながら、実践的に学ぶ。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">中隈さんに聞きたいこと（俺の視点から）</h2>
                            <div className="space-y-4">
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">コーチングを始めるとき、最初の一歩は何だった？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        資格？実践？誰かに教わった？いきなりクライアントを取った？
                                    </p>
                                </div>
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">俺がコーチング的なことを始めるとしたら、どう思う？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        率直な意見が欲しい。向いてると思う？何が必要？
                                    </p>
                                </div>
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">一緒に何かできる可能性はある？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        コラボ、紹介、勉強会、何でも。
                                        お互いにとってプラスになる形があるか。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                            <h2 className="text-lg font-medium text-amber-900 mb-4">この関係の本質</h2>
                            <div className="space-y-3 text-amber-800">
                                <p>
                                    俺と中隈さんの関係は「コーチとクライアント」じゃない。
                                </p>
                                <p>
                                    <strong>お互いに何かを目指している人間同士が、お互いをサポートしている。</strong>
                                </p>
                                <p>
                                    俺は中隈さんの事業を応援している。
                                    中隈さんは俺の考えを整理する手伝いをしてくれる（かもしれない）。
                                    そういう対等な関係。
                                </p>
                            </div>
                        </section>
                    </div>
                )}

                {/* Dialogue Tab */}
                {activeTab === 'dialogue' && (
                    <div className="space-y-6">
                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">コンフォートゾーンを知る</h2>
                            <p className="text-sm text-stone-500 mb-4">今の自分の「当たり前」を認識する</p>
                            <div className="space-y-4">
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">今の自分の1日を、正直に描写するとどうなる？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        朝起きてから寝るまで。何を食べ、何をし、何を避けているか。
                                        理想ではなく、実際の姿。
                                    </p>
                                </div>
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">「自分はこういう人間だ」と思っていることは？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        良い悪いの判断なしに。「運動が苦手」「三日坊主」「意志が弱い」など。
                                        これがブリーフシステム（信念体系）。
                                    </p>
                                </div>
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">その認識は、いつ、どんな経験から生まれた？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        認識には必ず起源がある。親に言われた言葉、過去の失敗、周囲との比較。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">現状の外側のゴール</h2>
                            <p className="text-sm text-stone-500 mb-4">認知科学コーチングの核心：ゴールは「現状の延長線上」にあってはならない</p>
                            <div className="space-y-4">
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">もし何の制約もなかったら、どんな自分になりたい？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        お金、時間、能力、年齢、すべての制約を外して考える。
                                        「現実的に考えて」は禁止。
                                    </p>
                                </div>
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">その理想の自分は、毎日をどう過ごしている？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        朝何時に起き、何を食べ、誰と会い、何をしているか。
                                        具体的に、五感で感じられるくらい鮮明に。
                                    </p>
                                </div>
                                <div className="border-l-4 border-emerald-300 pl-4">
                                    <p className="font-medium text-stone-800">そのゴールは「have to」か「want to」か？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        「やらなきゃ」ではなく「やりたい」か。
                                        他人の期待や社会の基準ではなく、本当に自分が望んでいることか。
                                    </p>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-emerald-800">
                                        <strong>ポイント</strong>：ゴールが現状の外側にあると、脳のRAS（網様体賦活系）が発火し、
                                        今まで見えなかった情報が見えるようになる。これが「スコトーマが外れる」状態。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">スコトーマ（心理的盲点）</h2>
                            <p className="text-sm text-stone-500 mb-4">見えていないものを探る</p>
                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-300 pl-4">
                                    <p className="font-medium text-stone-800">「自分には無理だ」と思っていることは何？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        それは本当に「事実」か、それとも「認識」か。
                                        認識なら、変えることができる。
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-300 pl-4">
                                    <p className="font-medium text-stone-800">周囲の人が自分について言うことで、信じられないことは？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        「才能がある」「できる」と言われても「そんなことない」と思うこと。
                                        そこにスコトーマがあるかもしれない。
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-300 pl-4">
                                    <p className="font-medium text-stone-800">もし「できる」と100%信じたら、何をする？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        失敗の可能性を完全に排除したら、どんな行動を取る？
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">エフィカシー（自己効力感）</h2>
                            <p className="text-sm text-stone-500 mb-4">ゴール達成能力の自己評価</p>
                            <div className="space-y-4">
                                <div className="border-l-4 border-purple-300 pl-4">
                                    <p className="font-medium text-stone-800">今の自分に点数をつけるなら？（ゴールに対して）</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        0〜100で。その点数の根拠は？
                                    </p>
                                </div>
                                <div className="border-l-4 border-purple-300 pl-4">
                                    <p className="font-medium text-stone-800">過去に「できないと思っていたけどできた」経験は？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        何が変わってできるようになった？
                                        そのときの自分と今の自分の違いは？
                                    </p>
                                </div>
                                <div className="border-l-4 border-purple-300 pl-4">
                                    <p className="font-medium text-stone-800">自分のエフィカシーを下げている要因は？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        人、環境、過去の経験、内なる声。具体的に特定する。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-2">中隈さんに聞きたいこと</h2>
                            <p className="text-sm text-stone-500 mb-4">コーチ自身を知る</p>
                            <div className="space-y-4">
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">なぜ認知科学に行き着いた？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        一般的なパーソナルトレーニングではなく、認知科学を選んだ理由。
                                        何がきっかけで、何を感じた？
                                    </p>
                                </div>
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">自衛隊時代の経験で、今に活きていることは？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        規律、メンタル、身体訓練。どんな認識の変化があった？
                                    </p>
                                </div>
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">中隈さん自身のコンフォートゾーンの外側のゴールは？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        5年後、10年後、どんなコーチになっていたい？
                                        どんな人に、どんな価値を届けたい？
                                    </p>
                                </div>
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">クライアントがどうなったとき「成功した」と感じる？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        数値的な成果（体重、筋肉量）ではなく、本質的な変化として。
                                    </p>
                                </div>
                                <div className="border-l-4 border-stone-300 pl-4">
                                    <p className="font-medium text-stone-800">コーチとして難しいと感じることは？</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        答えを与えたくなる瞬間、クライアントとの距離感、ビジネスとしての悩み。
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* Business Tab */}
                {activeTab === 'business' && (
                    <div className="space-y-6">
                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">確認すべきこと</h2>
                            <p className="text-sm text-stone-500 mb-4">契約書・請求書を作る前に、まずこれらを明確にする</p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium text-stone-700 mb-3">1. サービス内容の定義</h3>
                                    <div className="bg-stone-50 rounded-lg p-4 space-y-2 text-sm">
                                        <p>・具体的に何を提供するのか？（セッション回数、時間、方法）</p>
                                        <p>・セッション以外のサポートは含むのか？（メッセージ対応、フォローアップ）</p>
                                        <p>・どこまでがサービス範囲で、どこからが範囲外か？</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-stone-700 mb-3">2. 価格設定の根拠</h3>
                                    <div className="bg-amber-50 rounded-lg p-4 text-sm">
                                        <p className="font-medium text-amber-800 mb-2">現状：月額3,000円</p>
                                        <p className="text-amber-700 mb-3">これは友人価格？お試し価格？本来の価格？</p>
                                        <div className="border-t border-amber-200 pt-3 mt-3">
                                            <p className="font-medium text-amber-800 mb-2">参考：認知科学コーチングの相場</p>
                                            <ul className="space-y-1 text-amber-700">
                                                <li>・月額サポート＋月1回セッション：2〜3万円</li>
                                                <li>・月額サポート＋月2回セッション：3〜5万円</li>
                                                <li>・3ヶ月集中プログラム：10〜20万円</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-sm text-stone-600">
                                        <p><strong>話し合うべきこと</strong>：</p>
                                        <ul className="mt-1 space-y-1 pl-4">
                                            <li>・今の価格で中隈さんは持続可能か？</li>
                                            <li>・価格を上げる予定はあるか？</li>
                                            <li>・自分（クライアント）としてはどう思うか？</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-stone-700 mb-3">3. 契約形態</h3>
                                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                                        <div className="bg-stone-50 rounded-lg p-3">
                                            <p className="font-medium mb-1">月額継続</p>
                                            <p className="text-stone-500">毎月自動更新、いつでも解約可</p>
                                        </div>
                                        <div className="bg-stone-50 rounded-lg p-3">
                                            <p className="font-medium mb-1">期間契約</p>
                                            <p className="text-stone-500">3ヶ月、6ヶ月などの期間を決める</p>
                                        </div>
                                        <div className="bg-stone-50 rounded-lg p-3">
                                            <p className="font-medium mb-1">都度払い</p>
                                            <p className="text-stone-500">セッションごとに支払い</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-stone-700 mb-3">4. 免責事項の重要性</h3>
                                    <div className="bg-rose-50 rounded-lg p-4 text-sm text-rose-800">
                                        <p className="font-medium mb-2">コーチングは「結果を保証するサービス」ではない</p>
                                        <p>
                                            認知科学コーチングは、クライアントの認識変化を支援するもの。
                                            最終的な行動と結果は、クライアント自身の責任。
                                            これを契約書に明記することで、双方を守る。
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-stone-700 mb-3">5. 支払い方法</h3>
                                    <div className="text-sm text-stone-600 space-y-2">
                                        <p>現状：銀行振込（謎の送金）</p>
                                        <p>整理すべきこと：</p>
                                        <ul className="pl-4 space-y-1">
                                            <li>・毎月の締め日と支払い期日</li>
                                            <li>・請求書の発行有無</li>
                                            <li>・振込先口座情報の正式な共有</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">中隈さんの事業として整理すべきこと</h2>
                            <p className="text-sm text-stone-500 mb-4">クライアントとして提案できること</p>

                            <div className="space-y-4">
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">サービスの言語化</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        「認知科学コーチングとは何か」を一般の人に説明できる文章。
                                        一般的なパーソナルトレーニングとの違い。中隈さんのユニークな価値。
                                    </p>
                                </div>
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">プログラムの構造化</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        初回は何をする？継続セッションは？サポートの範囲は？
                                        明確なプログラム構造があると、クライアントも安心、価格の根拠にもなる。
                                    </p>
                                </div>
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">事務処理の最低限</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        請求書の発行（確定申告のため）、簡易契約書（トラブル防止のため）、
                                        売上の記録（帳簿）。これらがあるとプロフェッショナルとしての信頼性が上がる。
                                    </p>
                                </div>
                                <div className="border-l-4 border-amber-300 pl-4">
                                    <p className="font-medium text-stone-800">差別化の明確化</p>
                                    <p className="text-sm text-stone-500 mt-1">
                                        元航空自衛隊 × 認知科学 × ボディメイク。
                                        この組み合わせは他にない。これを言語化して打ち出す。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl p-6 border border-stone-200">
                            <h2 className="text-lg font-medium text-stone-800 mb-4">MTGで話すこと（事業面）</h2>
                            <ol className="list-decimal pl-5 space-y-3 text-stone-700">
                                <li>
                                    <strong>今の価格設定について</strong>
                                    <p className="text-sm text-stone-500">継続可能か？本来はいくらにしたいか？</p>
                                </li>
                                <li>
                                    <strong>サービス内容の明確化</strong>
                                    <p className="text-sm text-stone-500">何を提供して、何を提供しないか</p>
                                </li>
                                <li>
                                    <strong>契約書・請求書について</strong>
                                    <p className="text-sm text-stone-500">必要だと思うか？どういう形がいいか？</p>
                                </li>
                                <li>
                                    <strong>今後の方向性</strong>
                                    <p className="text-sm text-stone-500">もっとクライアントを増やしたい？価格を上げたい？</p>
                                </li>
                            </ol>
                        </section>
                    </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                    <div className="space-y-8">
                        <p className="text-sm text-stone-500">
                            MTGで内容を確認してから使う。先に話し合いが必要。
                        </p>

                        {/* Contract */}
                        <section className="bg-white rounded-xl print:rounded-none p-8 border border-stone-200 print:border-none">
                            <h2 className="text-xl font-bold text-center mb-6 tracking-widest">コーチング業務委託契約書</h2>

                            <p className="mb-6 text-stone-700 text-sm">
                                ＿＿＿＿＿＿（以下「甲」）と＿＿＿＿＿＿（以下「乙」）は、
                                認知科学に基づくコーチング業務について、以下のとおり契約を締結する。
                            </p>

                            <div className="space-y-4 text-sm text-stone-700">
                                <div>
                                    <p className="font-bold">第1条（目的）</p>
                                    <p className="pl-4">甲は乙に対し、認知科学に基づくコーチングサービスを提供し、乙はその対価を支払う。</p>
                                </div>
                                <div>
                                    <p className="font-bold">第2条（サービス内容）</p>
                                    <div className="pl-4">
                                        <p>1. 定期コーチングセッション（月＿回、各＿分）</p>
                                        <p>2. セッション間のメッセージサポート（範囲：＿＿＿＿＿＿）</p>
                                        <p>3. その他、甲乙間で合意した支援</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold">第3条（契約期間）</p>
                                    <p className="pl-4">＿＿年＿＿月＿＿日から＿＿年＿＿月＿＿日まで。更新条件は別途協議。</p>
                                </div>
                                <div>
                                    <p className="font-bold">第4条（報酬）</p>
                                    <p className="pl-4">月額＿＿＿＿＿円（税込）。毎月＿＿日までに甲指定口座へ振込。</p>
                                </div>
                                <div>
                                    <p className="font-bold">第5条（免責事項）</p>
                                    <p className="pl-4">
                                        本サービスは乙の目標達成を支援するものであり、特定の成果を保証するものではない。
                                        乙は自己の判断と責任において行動するものとする。
                                    </p>
                                </div>
                                <div>
                                    <p className="font-bold">第6条（守秘義務）</p>
                                    <p className="pl-4">甲および乙は、本契約で知り得た情報を第三者に開示しない。</p>
                                </div>
                                <div>
                                    <p className="font-bold">第7条（解約）</p>
                                    <p className="pl-4">＿＿日前までに書面（メール可）で通知することで解約できる。</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-stone-200 text-sm">
                                <p className="text-center mb-6">契約締結日：＿＿＿＿年＿＿月＿＿日</p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="font-bold mb-2">甲（コーチ）</p>
                                        <p>住所：</p>
                                        <p>氏名：　　　　　　　　　　印</p>
                                    </div>
                                    <div>
                                        <p className="font-bold mb-2">乙（クライアント）</p>
                                        <p>住所：</p>
                                        <p>氏名：　　　　　　　　　　印</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Invoice */}
                        <section className="bg-white rounded-xl print:rounded-none p-8 border border-stone-200 print:border-none print:break-before-page">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold tracking-widest">請求書</h2>
                                <div className="text-right text-sm text-stone-600">
                                    <p>No. ＿＿＿＿＿＿＿＿</p>
                                    <p>発行日：＿＿＿＿年＿＿月＿＿日</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-lg font-medium">＿＿＿＿＿＿＿＿ 様</p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-stone-600">ご請求金額</p>
                                <p className="text-3xl font-bold">¥＿＿＿＿＿ <span className="text-base font-normal">（税込）</span></p>
                            </div>

                            <table className="w-full mb-6 text-sm">
                                <thead>
                                    <tr className="border-b-2 border-stone-300">
                                        <th className="text-left py-2">項目</th>
                                        <th className="text-left py-2">期間</th>
                                        <th className="text-right py-2">金額</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-stone-200">
                                        <td className="py-3">認知科学コーチングサービス</td>
                                        <td className="py-3">＿＿年＿＿月分</td>
                                        <td className="py-3 text-right">¥＿＿＿＿＿</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="bg-stone-50 rounded-lg p-4 text-sm">
                                <p className="font-medium mb-2">お振込先</p>
                                <p>＿＿＿＿銀行　＿＿＿＿支店</p>
                                <p>普通　＿＿＿＿＿＿＿</p>
                                <p>口座名義：＿＿＿＿＿＿＿＿</p>
                                <p className="mt-2 text-stone-500">※振込手数料はご負担ください</p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-stone-200 text-right text-sm">
                                <p className="font-medium">＿＿＿＿＿＿＿＿</p>
                                <p className="text-stone-500">住所：＿＿＿＿＿＿＿＿＿＿＿＿</p>
                            </div>
                        </section>
                    </div>
                )}

                {/* Presentation Tab */}
                {activeTab === 'presentation' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 border border-stone-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-stone-800">プレゼンテーション</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsFullscreen(true)}
                                        className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all"
                                    >
                                        全画面で表示
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-stone-500 mb-4">
                                ← → キーで操作 / Fキーで全画面
                            </p>
                        </div>

                        {/* Slide Preview */}
                        <div className="bg-stone-200 rounded-xl overflow-hidden">
                            {/* Progress */}
                            <div className="h-1 bg-stone-300">
                                <div
                                    className="h-full bg-amber-500 transition-all duration-300"
                                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                                />
                            </div>

                            {/* Slide Content */}
                            <div className="bg-stone-100 min-h-[400px] md:min-h-[500px] flex items-stretch">
                                {renderSlide(slide)}
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-center gap-4 p-4 bg-white border-t border-stone-200">
                                <button
                                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                                    disabled={currentSlide === 0}
                                    className="px-4 py-2 text-stone-600 hover:text-stone-800 disabled:opacity-30 transition-all"
                                >
                                    ← 前へ
                                </button>
                                <span className="text-sm text-stone-500 min-w-[80px] text-center">
                                    {currentSlide + 1} / {slides.length}
                                </span>
                                <button
                                    onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                                    disabled={currentSlide === slides.length - 1}
                                    className="px-4 py-2 text-stone-600 hover:text-stone-800 disabled:opacity-30 transition-all"
                                >
                                    次へ →
                                </button>
                            </div>
                        </div>

                        {/* Slide List */}
                        <div className="bg-white rounded-xl p-6 border border-stone-200">
                            <h3 className="text-sm font-medium text-stone-700 mb-4">スライド一覧</h3>
                            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                                {slides.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`p-2 text-xs rounded-lg border transition-all ${
                                            currentSlide === i
                                                ? 'bg-amber-100 border-amber-300 text-amber-800'
                                                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .print\\:hidden { display: none !important; }
                    .print\\:rounded-none { border-radius: 0 !important; }
                    .print\\:border-none { border: none !important; }
                    .print\\:px-12 { padding-left: 3rem !important; padding-right: 3rem !important; }
                    .print\\:break-before-page { break-before: page; }
                }
            `}</style>
        </div>
    );
}
