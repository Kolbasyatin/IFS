import 'jplayer';

export class Player {
    private _isReady: boolean;
    private _currentSourceId: string = '';
    private _lastSourceId: string;
    private _jPlayerConfig: object = {
        ready: () => {this._isReady = true},
        error: Player.handleError
    };
    private _jPlayer: JQuery;
    private _src: string;
    private _lastSrc: string;

    constructor() {
        this.jPlayerInit();
    }

    private jPlayerInit(): void {
        let $container: JQuery = $("#jp");
        if($container.length === 0) {
            throw new Error("There is no container with #jp id found");
        }
        this._jPlayer = $container.jPlayer(this._jPlayerConfig);
    }

    /**
     * Play|Resume stream
     * @param {string} source
     * @param {string} sourceId
     */
    public play(source?: string, sourceId?: string): void {
        if (!this.isPaused() && source === this._src) {
            return;
        }
        //resume
        if (!source && !sourceId) {
            source = this._lastSrc;
            sourceId = this._lastSourceId;
        }
        if (!source) {
            throw new Error('No source to play!');
        }
        if (!sourceId) {
            throw new Error('No sourceId to identification Radio source!')
        }
        this._src = source;
        this._currentSourceId = sourceId;
        this._jPlayer.jPlayer("setMedia", {mp3: source}).jPlayer("play");
    }
    //https://stackoverflow.com/questions/27258169/how-can-i-stop-and-resume-a-live-audio-stream-in-html5-instead-of-just-pausing-i
    public pause(): string {
        if (!this.isPaused()) {
            this._lastSrc = this._src;
            this._src = '';
            this._lastSourceId = this._currentSourceId;
            this._currentSourceId = '';
            this._jPlayer.jPlayer("pause");

            return this.getLastSrc();
        }
    }
    /**
     * Stop playing, empty source.
     */
    public stop(): void {
        this.pause();
    }

    /**
     * Return jPlayer audio player.
     * @return {JQuery}
     */
    private getAudio(): JQuery {
        return this._jPlayer;
    }

    /**
     * Get current source id that is playing now.
     * @return {string}
     */
    public getCurrentSourceId(): string {
        return this._currentSourceId;
    }

    /**
     * Get current stream source url.
     * @return {string}
     */
    public getCurrentSrc(): string {
        return this._src;
    }

    public getLastSrc(): string {
        return this._lastSrc;
    }

    public setVolume(volume: number): void {
        this._jPlayer.jPlayer("volume", volume);
    }

    private isPaused(): boolean {
        return this._jPlayer.data("jPlayer").status.paused;
    }
    /**
     * Handle error when player fail starts play
     * @param event
     */
    private static handleError(event: any): void {
        console.error(`Error jPlayer play source ${event.jPlayer.status.src}`)

    }

    public addOnPlayHandler(handler: (event: any) => void): void {
        this._jPlayer.on("jPlayer_play", handler);
    }
    public addOnPlayingHandler(handler: (event: any) => void): void {
        this._jPlayer.on("jPlayer_playing", handler);
    }
    public addOnPauseHandler(handler: (event: any) => void): void {
        this._jPlayer.on("jPlayer_pause", handler);
    }

//     this._player.getAudio().on($.jPlayer.event.play, () => {
//     this.linkActive(this._player.getCurrentSrc());
// });
// this._player.getAudio().on($.jPlayer.event.playing, (event) => {
//     this._$loaderSign.hide();
//     this.pauseResumeButtonsStatus(event.jPlayer.status);
// });
//
// this._player.getAudio().on($.jPlayer.event.pause, (event) => {
//     this.pauseResumeButtonsStatus(event.jPlayer.status);
// });


}