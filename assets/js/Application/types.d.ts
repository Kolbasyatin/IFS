declare module "*.json" {
    const value: any;
    export default value;
}

interface jPlayerStatus {
        src: string,
        media: object,
        paused: boolean,
        format: object,
        formatType: string,
        waitForPlay: boolean,
        waitForLoad: boolean,
        srcSet: boolean,
        video: boolean, // True if playing a video
        seekPercent: number,
        currentPercentRelative: number,
        currentPercentAbsolute: number,
        currentTime: number,
        duration: number,
        remaining: number,
        videoWidth: number, // Intrinsic width of the video in pixels.
        videoHeight: number, // Intrinsic height of the video in pixels.
        readyState: number,
        networkState: number,
        playbackRate: number, // Warning - Now both an option and a status property
        ended: number
}



interface WS {
        connect: (url: string) => WS;
        on: (type: string, callback: (arg:any)=>void ) => void;
        fire: (event: any) => void;
        off: (type: string, listeners: any[]) => void;
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

interface Router {
        generate: (name: string, opt_params?: object, absolute?: boolean) => string;
    // getInstance
    // 'setRoutes',
    // 'getRoutes',
    // 'setBaseUrl'
    // 'getBaseUrl'
    // 'generate',
    // 'setPrefix',
    // 'getRoute',
}

declare let Routing: Router;
