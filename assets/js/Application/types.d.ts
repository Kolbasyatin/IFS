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
