/**
 * Silent Bartender -- rival shops.
 *
 * Imagined izakayas in the neighborhood that customers mention.
 * Each has a personality, a relationship to Gondo's bar, and a
 * common reason a customer might be coming from there.
 */

export interface RivalShop {
    id: string;
    name: string;
    vibe: string;
    gondoRelationship: 'friendly' | 'competitive' | 'old-friend' | 'unknown';
    commonCustomerReason: string;
}

export const RIVAL_SHOPS: RivalShop[] = [
    {
        id: 'akichi',
        name: 'Akichi',
        vibe: '新しい若い店。クラフトビール8種。',
        gondoRelationship: 'friendly',
        commonCustomerReason: '若い連れが選んだ一軒目から流れてきた',
    },
    {
        id: 'morishita',
        name: 'Morishita',
        vibe: '30年目の老舗。店主は権藤と同世代。',
        gondoRelationship: 'old-friend',
        commonCustomerReason: 'Morishita が満席で、こっちに来た',
    },
    {
        id: 'ichigo',
        name: 'Ichigo',
        vibe: 'ワインバー。落ち着いた店内。客層は広告代理店',
        gondoRelationship: 'competitive',
        commonCustomerReason: 'ワインに飽きて、和酒が恋しくなった',
    },
    {
        id: 'tachimasu',
        name: 'Tachimasu',
        vibe: '立ち飲み、全品300円。サラリーマンの聖地',
        gondoRelationship: 'friendly',
        commonCustomerReason: '会計の最後に「座って飲みたい」と思った',
    },
    {
        id: 'hanare',
        name: 'Hanare',
        vibe: '予約のみ。コースのみ。店主は寡黙。',
        gondoRelationship: 'old-friend',
        commonCustomerReason: '食後に一杯だけ、普通の店で飲みたくなった',
    },
    {
        id: 'bar-no-name',
        name: '(unnamed bar)',
        vibe: '看板がない。常連しか入れない。',
        gondoRelationship: 'unknown',
        commonCustomerReason: '「あの店に入れない夜」、ここに来る',
    },
    {
        id: 'okonomi-daidai',
        name: 'Daidai',
        vibe: 'お好み焼き中心、鉄板と煙と笑い声',
        gondoRelationship: 'friendly',
        commonCustomerReason: '香りが服に染みついたまま、静かな店が欲しかった',
    },
    {
        id: 'yakitori-kou',
        name: 'Kou',
        vibe: '炭火の焼鳥。予約困難、夜中まで続く。',
        gondoRelationship: 'competitive',
        commonCustomerReason: '匂いを流すための最後の一杯',
    },
];

export function getRivalShop(id: string): RivalShop | undefined {
    return RIVAL_SHOPS.find(s => s.id === id);
}
