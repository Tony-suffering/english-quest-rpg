/**
 * Silent Bartender -- weather-triggered regulars.
 *
 * Defines twelve anonymous regulars whose appearance odds rise under
 * specific weather. Each carries a subtle tonal shift from their usual
 * bearing. Pure data module; consumed via `forWeather()`.
 */

export type WeatherTrigger = 'rain' | 'snow' | 'wind' | 'cold' | 'humid' | 'heat' | 'clear-night' | 'moonlit';

export interface WeatherTriggeredRegular {
    id: string;
    weather: WeatherTrigger;
    customerName: string;
    arrivalDetail: string;
    tonalShift: string;
    orderHint?: string;
}

export const WEATHER_TRIGGERED: WeatherTriggeredRegular[] = [
    {
        id: 'wtr-umbrella-forgotten',
        weather: 'rain',
        customerName: "傘を忘れた男",
        arrivalDetail: "肩から袖口にかけて、線を引いたように濡れている。戸口で二度、髪を撫でつけてから入ってくる。",
        tonalShift: "いつもより早口ではない。雨の夜だけ、奥の席に座る。",
        orderHint: "燗を一本、湯呑みで。肴は頼まない。",
    },
    {
        id: 'wtr-drenched-young-man',
        weather: 'rain',
        customerName: "ずぶ濡れの若い男",
        arrivalDetail: "タオルを断り、そのまま腰を下ろす。足元に小さな水たまりができる。",
        tonalShift: "普段の軽口が消え、言葉の間が長くなる。",
        orderHint: "熱燗よりも、ぬるめの酒を好む夜。",
    },
    {
        id: 'wtr-snow-unbrushed-old-man',
        weather: 'snow',
        customerName: "雪を払わない老人",
        arrivalDetail: "肩の雪をそのままに、カウンターの端に座る。解けるに任せている。",
        tonalShift: "今夜は手を擦らない。寒がる素振りを見せない。",
        orderHint: "湯を一杯、酒の前に。",
    },
    {
        id: 'wtr-snow-silent-woman',
        weather: 'snow',
        customerName: "白い息の女",
        arrivalDetail: "マフラーを外さず、コートのまま椅子に深く腰掛ける。しばらく何も言わない。",
        tonalShift: "雪の夜だけ、こちらの目を見て注文する。",
        orderHint: "甘口の梅酒。氷は抜きで。",
    },
    {
        id: 'wtr-wind-coat-tight',
        weather: 'wind',
        customerName: "襟を合わせた男",
        arrivalDetail: "扉が風に押し戻され、二度目でようやく入ってくる。コートの襟をまだ握っている。",
        tonalShift: "風の夜は、早く帰る。一杯で立つ。",
        orderHint: "焼酎の水割り、濃いめ。",
    },
    {
        id: 'wtr-wind-hair-undone',
        weather: 'wind',
        customerName: "髪を直さない女",
        arrivalDetail: "乱れた髪のまま席につき、鏡を覗こうともしない。",
        tonalShift: "普段の丁寧な挨拶を、今夜は省く。",
    },
    {
        id: 'wtr-cold-hand-rubber',
        weather: 'cold',
        customerName: "手を擦り続ける男",
        arrivalDetail: "席についてからも、しばらく両手を合わせている。息を吹きかけることはない。",
        tonalShift: "冷え込む夜は、会話よりも沈黙を選ぶ。",
        orderHint: "卵酒、もしくは熱い出汁を先に。",
    },
    {
        id: 'wtr-cold-black-coat',
        weather: 'cold',
        customerName: "喪服の女",
        arrivalDetail: "黒のコートの下も黒。椅子に腰掛けるとき、袖口がかすかに震えている。",
        tonalShift: "今夜は料理の好みを訊かない。任せる、とだけ言う。",
        orderHint: "辛口を一合、温めずに。",
    },
    {
        id: 'wtr-humid-steam-old-man',
        weather: 'humid',
        customerName: "湯気を連れてきた老人",
        arrivalDetail: "額と首筋が湿り、扇子を畳んだまま机に置く。使う気配はない。",
        tonalShift: "湿った夜は、長居をしない。三十分で立つ。",
        orderHint: "冷酒より、むしろ番茶を所望する夜。",
    },
    {
        id: 'wtr-heat-loosened-tie',
        weather: 'heat',
        customerName: "ネクタイを緩めた男",
        arrivalDetail: "首元のボタンを二つ外し、上着を腕にかけて入ってくる。席につくと、しばらく天井を見上げる。",
        tonalShift: "暑い夜は、仕事の話を一切しない。",
        orderHint: "生ビール、小さめのグラスで二杯。",
    },
    {
        id: 'wtr-clear-night-solitary',
        weather: 'clear-night',
        customerName: "星を見て入る男",
        arrivalDetail: "戸を開ける前に、一度だけ空を仰ぐ。それから静かに入ってくる。",
        tonalShift: "澄んだ夜は、声がわずかに低くなる。",
        orderHint: "冷酒をぐい呑みで。塩を少し。",
    },
    {
        id: 'wtr-moonlit-old-woman',
        weather: 'moonlit',
        customerName: "月を背負った老婆",
        arrivalDetail: "暖簾の向こうに月が見える夜にだけ現れる。杖を戸口に立てかけてから腰を下ろす。",
        tonalShift: "月の晩は、亡くなった連れの話をする。短く、淡々と。",
        orderHint: "ぬる燗を一合。猪口は二つ頼む。",
    },
];

export function forWeather(weather: WeatherTrigger): WeatherTriggeredRegular[] {
    return WEATHER_TRIGGERED.filter((entry) => entry.weather === weather);
}
