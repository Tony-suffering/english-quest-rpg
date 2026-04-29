export type BotCharacter = 'gondo' | 'yuki' | 'takeshi' | 'lisa' | 'kenji' | 'mina' | 'system';

export const CHARACTER_LABEL: Record<BotCharacter, string> = {
    gondo: '権藤',
    yuki: 'ユキ',
    takeshi: 'タケシ',
    lisa: 'リサ',
    kenji: '健二',
    mina: 'ミナ',
    system: '',
};

export type TimeRange = 'morning' | 'noon' | 'evening' | 'night' | 'late' | 'any';

export interface QuickReply {
    label: string;
    nextNodeId: string;
}

export interface BotNode {
    id: string;
    character: BotCharacter;
    lines: string[];
    quickReplies?: QuickReply[];
    conditions?: {
        timeRange?: TimeRange[];
        minDay?: number;
        flagsRequired?: string[];
        flagsForbidden?: string[];
    };
    setFlags?: string[];
    isEntry?: boolean;
}

export interface UserState {
    userId: string;
    startDate: string;
    lastActive: string;
    flags: string[];
    messageCount: number;
}
