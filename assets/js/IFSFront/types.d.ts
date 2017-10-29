interface CommentDataInterface {
    id: number;
    sourceId: string;
    username: string;
    message: string;
    dateTime: number;
    type: string;
    timeToShow?: string;
}

interface LayoutPublishInterface {
    publish(data: JQuery): void;
    hide(): void;
}

interface ABSession {
    close: () => void;
    sessionid: string;
    wsuri: string;
    resolve: () => void;
    prefix: any;
    call: any;
    subscribe: (topicuri: string, callback: (uri: string, payload: object) => void) => void;
    unsubscribe: (topicuri: string, callback: () => void) => void;
    publish: (topic: string, event: any, exclude?: any, eligible?: any) => void;
    authreq: (appkey: string, extra: any) => any;
    authsign: (challenge: any, secret: string) => any;
    auth: (signature: string) => any;
}

interface WS {
    connect(url: string): WS;
    on(type: string, callback: (arg:any)=>void ): void;
    fire(event: any): void;
    off(type: string, listeners: any[]): void;
}

interface ShowInterface {
    show(applyEffect?: boolean): void;
}