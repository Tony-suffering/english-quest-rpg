'use client';

import { useState } from 'react';

export default function CookingPage() {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const toggleItem = (item: string) => {
        const newChecked = new Set(checkedItems);
        if (newChecked.has(item)) {
            newChecked.delete(item);
        } else {
            newChecked.add(item);
        }
        setCheckedItems(newChecked);
    };

    const shoppingList = [
        '鶏もも肉 2枚',
        '長ねぎ 2本',
        '絹豆腐 1丁',
        '卵 2個',
        'バター',
        'レモン（気分で）',
    ];

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-2xl mx-auto px-6 py-12">
                    <p className="text-amber-600 text-sm tracking-widest mb-3">TOMORROW&apos;S DINNER</p>
                    <h1 className="text-3xl md:text-4xl font-light text-stone-800 tracking-wide mb-4">
                        明日、俺が作る飯
                    </h1>
                    <p className="text-stone-500 leading-relaxed">
                        別に特別な日じゃない。ただ、ちゃんと作りたい気分の日がある。
                        そういう日のための献立。
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-12 space-y-16">

                {/* Menu Overview */}
                <section>
                    <div className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl p-8">
                        <h2 className="text-lg font-medium text-stone-800 mb-6">本日の献立</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <span className="text-stone-700">鶏もも肉の味噌バター焼き</span>
                                <span className="text-stone-400 text-sm">メイン</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-stone-700">長ねぎの丸焼き</span>
                                <span className="text-stone-400 text-sm">副菜</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-stone-700">かきたま汁</span>
                                <span className="text-stone-400 text-sm">汁物</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-stone-700">白米</span>
                                <span className="text-stone-400 text-sm">飯</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Dish */}
                <section>
                    <div className="mb-6">
                        <span className="text-amber-600 text-xs tracking-widest">MAIN</span>
                        <h2 className="text-2xl font-light text-stone-800 mt-1">鶏もも肉の味噌バター焼き</h2>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-600 leading-relaxed mb-6">
                            鶏ももを焼くだけの料理。だけど「焼くだけ」を舐めてると一生カリッとした皮に出会えない。
                            ポイントは重し。フライ返しで押し付けてもいいし、水を入れた鍋を乗せてもいい。
                            要は皮をフライパンに密着させること。
                        </p>

                        <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
                            <h3 className="text-sm font-medium text-stone-500 mb-4">材料（2人前くらい）</h3>
                            <ul className="space-y-2 text-stone-700">
                                <li>鶏もも肉 — 2枚（できれば常温に戻す）</li>
                                <li>味噌 — 大さじ2（うちは合わせ味噌）</li>
                                <li>バター — 30gくらい（目分量でいい）</li>
                                <li>みりん — 大さじ1</li>
                                <li>にんにく — 1片をすりおろす</li>
                                <li>黒胡椒 — がりがり</li>
                            </ul>
                        </div>

                        <div className="space-y-6 text-stone-600">
                            <div>
                                <p className="font-medium text-stone-800 mb-2">1. 下準備</p>
                                <p>
                                    鶏肉は30分前には冷蔵庫から出しておく。冷たいまま焼くと中まで火が通る頃には皮が焦げる。
                                    皮目にフォークでブスブス穴を開ける。縮み防止と味の染み込み用。
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-stone-800 mb-2">2. タレを作る</p>
                                <p>
                                    味噌、みりん、にんにくを混ぜるだけ。味噌が硬かったらみりんで伸ばす。
                                    この段階で味見して「ちょっと濃いな」くらいでちょうどいい。
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-stone-800 mb-2">3. 焼く（皮目から）</p>
                                <p>
                                    フライパンを中火で熱する。油は引かない。鶏の脂で十分。
                                    皮目を下にして置いたら、上から重しを乗せる。アルミホイルを敷いた上に水を入れた鍋とか。
                                </p>
                                <p className="mt-2 text-stone-500 text-sm">
                                    ※ 重しを乗せて焼く技法は、イタリアでは「ポッロ・アル・マットーネ（レンガ鶏）」と呼ばれる。
                                    本来はレンガで押さえるが、日本の家庭にレンガはないので鍋で代用。
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-stone-800 mb-2">4. じっくり</p>
                                <p>
                                    7〜8分。触りたくなるけど我慢。皮がカリッカリになって、脂がじわじわ出てくるのを待つ。
                                    裏返すのは一度だけ。裏返したら蓋をして弱火で5〜6分。
                                </p>
                            </div>

                            <div>
                                <p className="font-medium text-stone-800 mb-2">5. 仕上げ</p>
                                <p>
                                    火を止めてからタレを絡める。焦げやすいから火は止めた状態で。
                                    最後にバターを落として、溶けたら皿へ。黒胡椒をがりがり。
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-stone-100 rounded-lg">
                            <p className="text-sm text-stone-500">
                                <span className="font-medium text-stone-700">参考：</span>
                                重しで焼く手法は、J・ケンジ・ロペス・アルト著『The Food Lab』に詳しい。
                                科学的に「なぜ皮がカリカリになるか」を説明してくれている。要は水分を逃がして、
                                メイラード反応を促進させるという話。料理は化学。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Side Dish */}
                <section>
                    <div className="mb-6">
                        <span className="text-amber-600 text-xs tracking-widest">SIDE</span>
                        <h2 className="text-2xl font-light text-stone-800 mt-1">長ねぎの丸焼き</h2>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-600 leading-relaxed mb-6">
                            ねぎを切らずにそのまま焼く。それだけ。
                            でも、これがうまい。とろっとろになったねぎの甘さは、切って炒めたねぎとは別物。
                            フレンチではポワロー（リーキ）を同じように焼く。日本の長ねぎでも全然できる。
                        </p>

                        <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
                            <h3 className="text-sm font-medium text-stone-500 mb-4">材料</h3>
                            <ul className="space-y-2 text-stone-700">
                                <li>長ねぎ — 2本（青い部分も使う）</li>
                                <li>オリーブオイル — 大さじ1</li>
                                <li>塩 — 適量</li>
                                <li>レモン — あれば</li>
                            </ul>
                        </div>

                        <div className="space-y-6 text-stone-600">
                            <p>
                                ねぎは洗って水気を拭くだけ。切らない。
                                フライパンにオリーブオイルを引いて弱火。ねぎを並べて、たまに転がしながら15分。
                                急がない。じっくり。
                            </p>
                            <p>
                                全体がくたっとして、ところどころ焦げ目がついたら完成。
                                塩をふって、あればレモンを絞る。
                            </p>
                        </div>

                        <div className="mt-8 p-4 bg-stone-100 rounded-lg">
                            <p className="text-sm text-stone-500">
                                <span className="font-medium text-stone-700">豆知識：</span>
                                ねぎの甘みの正体はフルクタンという多糖類。加熱するとこれが分解されて甘くなる。
                                だから「じっくり弱火」が正解。強火だと外が焦げて中は生のまま。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Soup */}
                <section>
                    <div className="mb-6">
                        <span className="text-amber-600 text-xs tracking-widest">SOUP</span>
                        <h2 className="text-2xl font-light text-stone-800 mt-1">かきたま汁</h2>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-600 leading-relaxed mb-6">
                            味噌汁じゃない日があってもいい。
                            かきたま汁は、卵がふわっと広がる瞬間が全て。コツは「溶き卵を細く」「すぐ火を止める」。
                            ぐるぐるかき混ぜると卵が散って汁が濁る。
                        </p>

                        <div className="bg-white rounded-xl p-6 border border-stone-200 mb-6">
                            <h3 className="text-sm font-medium text-stone-500 mb-4">材料</h3>
                            <ul className="space-y-2 text-stone-700">
                                <li>絹豆腐 — 1/2丁</li>
                                <li>卵 — 1個</li>
                                <li>だし汁 — 400ml（顆粒だしで十分）</li>
                                <li>醤油 — 小さじ1</li>
                                <li>塩 — 少々</li>
                                <li>片栗粉 — 小さじ1（水で溶く）</li>
                            </ul>
                        </div>

                        <div className="space-y-6 text-stone-600">
                            <p>
                                だし汁を沸かす。豆腐はスプーンで一口大にすくって入れる。包丁で切るより、
                                このほうが断面がギザギザして味が染みる。
                            </p>
                            <p>
                                醤油と塩で味を調えたら、水溶き片栗粉を回し入れてとろみをつける。
                                このとろみが大事。卵がふわっと浮くための土台になる。
                            </p>
                            <p>
                                火を弱めて、溶き卵を箸に伝わせながら細〜く回し入れる。
                                入れたら絶対にかき混ぜない。10秒待って火を止める。余熱で固まる。
                            </p>
                        </div>

                        <div className="mt-8 p-4 bg-stone-100 rounded-lg">
                            <p className="text-sm text-stone-500">
                                <span className="font-medium text-stone-700">補足：</span>
                                卵を入れる前にとろみをつける理由は、卵が沈まないようにするため。
                                土井善晴さんの『一汁一菜でよいという提案』に似たようなことが書いてあった気がする。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Rice */}
                <section>
                    <div className="mb-6">
                        <span className="text-amber-600 text-xs tracking-widest">RICE</span>
                        <h2 className="text-2xl font-light text-stone-800 mt-1">白米</h2>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-600 leading-relaxed">
                            米は普通に炊く。炊飯器でいい。
                            ただ、30分は浸水させる。これだけで全然違う。
                            土鍋があるなら土鍋で炊くと香りが立つけど、なくても問題ない。
                            大事なのはおかずであって、米は脇役に徹してもらう。
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section>
                    <div className="mb-6">
                        <span className="text-amber-600 text-xs tracking-widest">TIMELINE</span>
                        <h2 className="text-2xl font-light text-stone-800 mt-1">段取り</h2>
                    </div>

                    <div className="prose prose-stone max-w-none mb-6">
                        <p className="text-stone-600">
                            全部同時に完成させるのが一番難しい。
                            冷めた料理を出すのは悲しいから、逆算して動く。
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                        <div className="divide-y divide-stone-100">
                            {[
                                { time: '18:00', task: '鶏肉を冷蔵庫から出す', note: '常温に戻す' },
                                { time: '18:10', task: '米を研いで浸水', note: '30分以上' },
                                { time: '18:15', task: 'ねぎを焼き始める', note: '弱火で放置' },
                                { time: '18:25', task: '米を炊き始める', note: '炊飯器なら放置' },
                                { time: '18:30', task: '鶏肉を焼き始める', note: '重しを忘れずに' },
                                { time: '18:40', task: 'だし汁を温める', note: '豆腐を入れる' },
                                { time: '18:45', task: '鶏肉にタレを絡める', note: 'バター投入' },
                                { time: '18:48', task: '卵を回し入れる', note: 'かき混ぜない' },
                                { time: '18:50', task: '完成', note: 'いただきます' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start p-4 gap-4">
                                    <span className="text-amber-600 font-mono text-sm w-14 flex-shrink-0">{item.time}</span>
                                    <div className="flex-1">
                                        <p className="text-stone-800">{item.task}</p>
                                        <p className="text-stone-400 text-sm">{item.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Shopping List */}
                <section>
                    <div className="mb-6">
                        <span className="text-amber-600 text-xs tracking-widest">SHOPPING</span>
                        <h2 className="text-2xl font-light text-stone-800 mt-1">買い物メモ</h2>
                    </div>

                    <div className="prose prose-stone max-w-none mb-6">
                        <p className="text-stone-600">
                            味噌、みりん、醤油、にんにく、だしの素、塩、オリーブオイルは家にある前提。
                            なかったら買う。
                        </p>
                    </div>

                    <div className="bg-white rounded-xl border border-stone-200 p-6">
                        <div className="space-y-3">
                            {shoppingList.map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-3 cursor-pointer group"
                                    onClick={() => toggleItem(item)}
                                >
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                        checkedItems.has(item)
                                            ? 'bg-amber-500 border-amber-500'
                                            : 'border-stone-300 group-hover:border-amber-400'
                                    }`}>
                                        {checkedItems.has(item) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-stone-700 transition-all ${
                                        checkedItems.has(item) ? 'line-through text-stone-400' : ''
                                    }`}>
                                        {item}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <section className="border-t border-stone-200 pt-12">
                    <div className="prose prose-stone max-w-none">
                        <p className="text-stone-500 leading-relaxed">
                            料理は、作る前が一番めんどくさい。何を作るか考えて、材料を揃えて、段取りを組んで。
                            でも、一回流れができると案外すっと終わる。
                        </p>
                        <p className="text-stone-500 leading-relaxed mt-4">
                            明日、ちゃんと作る。
                        </p>
                    </div>
                </section>

                {/* References */}
                <section className="border-t border-stone-200 pt-8">
                    <h3 className="text-sm font-medium text-stone-400 mb-4">参考文献</h3>
                    <ul className="space-y-2 text-sm text-stone-500">
                        <li>J. Kenji López-Alt『The Food Lab: Better Home Cooking Through Science』W. W. Norton & Company, 2015</li>
                        <li>土井善晴『一汁一菜でよいという提案』グラフィック社, 2016</li>
                        <li>Harold McGee『On Food and Cooking』Scribner, 2004（マギー キッチンサイエンス）</li>
                    </ul>
                </section>

            </div>

            {/* Footer */}
            <div className="bg-white border-t border-stone-200 mt-16">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    <p className="text-stone-400 text-sm text-center">
                        岩崎内装の人が、たまに料理する記録
                    </p>
                </div>
            </div>
        </div>
    );
}
