declare module 'recastai' {
    export interface Message {
        content: string;
        type: string;
        conversationId: string;
        recastToken: string;
        addReply: (replies: object[]) => void;
        reply: (replies?: object[]) => Promise<any>;
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
    export class Request {
        constructor(token: string, language: string);
        analyseText (text: string, option?: object): Promise<Response>;
    }
    interface WithBody {
        body: object;
    }
    export class Connect {
        constructor(token: string, language: string);
        handleMessage(req: any, res: any, onMessageReceived: (m: Message) => void): void;
    }
    export default class Client {
        static request: Request;
        static connect: Connect;
        constructor(token: string, language: string);
        request: Request;
        connect: Connect;
    }
}
