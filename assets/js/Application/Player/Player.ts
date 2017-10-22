import 'jplayer';
import {Source} from "../Source";
import {User} from "../User/User";
import {Room} from "../Room/Room";

export class Player {
    /*private _source: Source;*/
    private _isReady: boolean;
    private _jPlayerConfig: object = {
        ready: () => this._isReady = true,
        error: Player.handleError
    };
    private _jPlayer: JQuery;

    constructor(/*source: Source*/) {
        /*this._source = source;*/
        this.jPlayerInit();

    }

    private jPlayerInit(): void {
        let $container: JQuery = $("#jp");
        if($container.length === 0) {
            throw new Error("There is no container with #jp id found");
        }
        this._jPlayer = $container.jPlayer(this._jPlayerConfig);
    }

    public play(room: Room): void {
        const sourceUrl: string = room.getSourceUrl();
        if(!sourceUrl) {
            this.pause();
        } else {
            this._jPlayer.jPlayer("setMedia", {mp3: sourceUrl}).jPlayer("play");
        }
        //alreadyPlaying?
        // if (!this.isPaused() && sourceUrl === this._source.getSourceUrl()) {
        //     return;
        // }

        //resume
        // if (!sourceUrl && !sourceId) {
        //     sourceUrl = this._source.getLastSourceUrl();
        //     sourceId = this._source.getLastSourceId();
        // }
        // if (!sourceUrl) {
        //     throw new Error('No source to play!');
        // }
        // if (!sourceId) {
        //     throw new Error('No sourceId to identification Radio source!')
        // }
        //SwitchChannel
        // this._source.setSourceUrl(sourceUrl);
        // this._source.setCurrentSourceId(sourceId);
    }
    //https://stackoverflow.com/questions/27258169/how-can-i-stop-and-resume-a-live-audio-stream-in-html5-instead-of-just-pausing-i
    /** return lastSrc */
    public pause(): void {
        if (!this.isPaused()) {
            this._jPlayer.jPlayer("pause");
        }
    }
    /**
     * Stop playing, empty source.
     */
    public stop(): void {
        this.pause();
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