// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-frames-a.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE FRAMES -- Day 1 (見本)。
 * frame に slots を代入すると original に完全一致する。verify-write-frames.cjs で検査。
 */

import type { EssayFrameDay } from './write-frames-types';

export const FRAMES_A: EssayFrameDay[] = [
    {
        day: 1,
        frames: [
            {
                role: 'open',
                frame: "There is much debate over whether X can be justified.",
                ja: "Xが正当化できるかについては大いに議論がある。",
                slots: { X: "the enormous sums spent on space exploration" },
                original: "There is much debate over whether the enormous sums spent on space exploration can be justified.",
            },
            {
                role: 'stance',
                frame: "While X is undeniably vast, I firmly believe that the long-term benefits far outweigh the costs, for three main reasons.",
                ja: "Xが莫大なのは否定できないが、長期的な利益が費用をはるかに上回ると固く信じる。理由は主に三つ。",
                slots: { X: "the expense" },
                original: "While the expense is undeniably vast, I firmly believe that the long-term benefits far outweigh the costs, for three main reasons.",
            },
            {
                role: 'reason',
                frame: "First, X plays a crucial role in driving Y.",
                ja: "第一に、XはYを推進するうえで重要な役割を果たす。",
                slots: { X: "space exploration", Y: "technological innovation" },
                original: "First, space exploration plays a crucial role in driving technological innovation.",
            },
            {
                role: 'why',
                frame: "The challenges of X force Y to develop solutions that later transform everyday life.",
                ja: "Xの困難さがYに、のちに日常を一変させる解決策の開発を迫る。",
                slots: { X: "operating in space", Y: "scientists" },
                original: "The challenges of operating in space force scientists to develop solutions that later transform everyday life.",
            },
            {
                role: 'example',
                frame: "A prime example of this is X we now rely on, which originated from Y.",
                ja: "その好例が、今や我々が頼るXであり、それはYから生まれた。",
                slots: { X: "the satellite navigation", Y: "space programs" },
                original: "A prime example of this is the satellite navigation we now rely on, which originated from space programs.",
            },
            {
                role: 'reason',
                frame: "Second, X is essential for the long-term survival of Y.",
                ja: "第二に、XはYの長期的な生存に不可欠だ。",
                slots: { X: "exploring space", Y: "humanity" },
                original: "Second, exploring space is essential for the long-term survival of humanity.",
            },
            {
                role: 'why',
                frame: "As X become increasingly strained, Y becomes vital.",
                ja: "Xがますます逼迫するにつれ、Yが重要になる。",
                slots: { X: "resources on Earth", Y: "locating new sources of materials and potential habitats" },
                original: "As resources on Earth become increasingly strained, locating new sources of materials and potential habitats becomes vital.",
            },
            {
                role: 'example',
                frame: "For instance, X could one day supply Y that are growing scarce on our planet.",
                ja: "たとえばXは、いつか地球上で希少になりつつあるYを供給しうる。",
                slots: { X: "asteroid mining", Y: "minerals" },
                original: "For instance, asteroid mining could one day supply minerals that are growing scarce on our planet.",
            },
            {
                role: 'reason',
                frame: "Finally, X inspires Y.",
                ja: "最後に、XはYを刺激する。",
                slots: { X: "space exploration", Y: "international cooperation and scientific ambition" },
                original: "Finally, space exploration inspires international cooperation and scientific ambition.",
            },
            {
                role: 'why',
                frame: "X require nations to pool their expertise rather than compete.",
                ja: "Xは各国に、競争ではなく専門知識の結集を求める。",
                slots: { X: "Massive projects" },
                original: "Massive projects require nations to pool their expertise rather than compete.",
            },
            {
                role: 'example',
                frame: "X demonstrates how former rivals can collaborate productively toward a shared goal.",
                ja: "Xは、かつての敵対者が共通の目標へ生産的に協力できることを示す。",
                slots: { X: "The International Space Station" },
                original: "The International Space Station demonstrates how former rivals can collaborate productively toward a shared goal.",
            },
            {
                role: 'close',
                frame: "In conclusion, although X is considerable, the benefits far outweigh the drawbacks.",
                ja: "結論として、Xは相当なものだが、利点が欠点をはるかに上回る。",
                slots: { X: "the financial burden of space exploration" },
                original: "In conclusion, although the financial burden of space exploration is considerable, the benefits far outweigh the drawbacks.",
            },
            {
                role: 'close',
                frame: "X, Y, and Z all confirm that this investment is thoroughly worthwhile.",
                ja: "XもYもZも、この投資が十分に価値あることを裏づける。",
                slots: { X: "The technological advances", Y: "the prospects for human survival", Z: "the fostering of global cooperation" },
                original: "The technological advances, the prospects for human survival, and the fostering of global cooperation all confirm that this investment is thoroughly worthwhile.",
            },
        ],
    },
];
