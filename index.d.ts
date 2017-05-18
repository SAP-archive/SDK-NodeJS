declare module 'recastai' {
    export interface Message {
        chatId: string;
        content: string;
        conversationId: string;
        recastToken: string;
        senderId: string;
        type: string;
        addReply(replies: object[]): void;
        reply(replies?: object[]): Promise<any>;
    }
    export interface Intent {
        slug: string;
        confidence: number;
    }
    export interface Entities {
        [key: string]: object[];
    }
    export interface Response {
        entities: Entities;
        intents: Intent[];
        sentiment: string;
        type: string;
        act: string;
    }
    export interface Memory {
        [key: string]: object;
    }
    export interface Action {
        slug: string;
        done: boolean;
        reply: string;
    }
    export class Conversation {
        action: Action | null;
        conversationToken: string;
        entities: Entities;
        intents: Intent[];
        language: string;
        memory: Memory;
        nextActions: Action[];
        processing_language: string;
        replies: string[];
        sentiment: string;
        source: string;
        status: number;
        timestamp: string;
        uuid: string;
        version: string;
        all(name: string): object[] | null;
        get(name: string): object | null;
        getMemory(): Memory;
        getMemory(alias: string): object | undefined | null;
        isNegative(): boolean;
        isNeutral(): boolean;
        isPositive(): boolean;
        isVNegative(): boolean;
        isVPositive(): boolean;
        joinedReplies(sep?: string): string;
        nextAction(): string | null;
        reply(): string | null;
        resetConversation(): Promise<Memory>;
        resetMemory(alias: string): Promise<Memory>;
        setMemory(memory: Memory): Promise<Memory>;
    }
    export class Request {
        constructor(token: string, language: string);
        analyseText(text: string, option?: object): Promise<Response>;
        converseText(text: string, option?: object): Promise<Conversation>;
    }
    export class Connect {
        constructor(token: string, language: string);
        handleMessage<T>(req: any, res: any, onMessageReceived: (m: Message) => T): T;
    }
    export default class Client {
        static request: Request;
        static connect: Connect;
        constructor(token: string, language: string);
        request: Request;
        connect: Connect;
    }
}
