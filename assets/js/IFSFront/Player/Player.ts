import 'jplayer';
import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";
import {Room} from "../Room/Room";

export class Player extends Colleague{
    private _isReady: boolean;
    private _jPlayerConfig: object = {
        ready: () => this._isReady = true,
        error: Player.handleError
    };
    private _jPlayer: JQuery;

    constructor(mediator: Mediator) {
        super(mediator);
        let $container: JQuery = $("#jp");
        if($container.length === 0) {
            throw new Error("There is no container with #jp id found");
        }
        this._jPlayer = $container.jPlayer(this._jPlayerConfig);
        this.bindHandles();
    }

    private bindHandles(): void {
        this._jPlayer.on("jPlayer_play", () => this._mediator.playStarting());
        this._jPlayer.on("jPlayer_playing", () => this._mediator.playStarted());
        this._jPlayer.on("jPlayer_pause", () => this._mediator.playStopped());
    }

    private static handleError(event: any): void {
        console.log(event.type);
        console.error(`Error jPlayer play source ${event.jPlayer.status.src}`)
    }

    public play(room: Room): void {
        const sourceUrl: string = room.getSourceUrl();
        if (!sourceUrl) {
            this.pause();
            return;
        }
        if (this._isReady) {
            this._jPlayer.jPlayer("setMedia", {mp3: sourceUrl}).jPlayer("play");
        } else {
            throw Error('Some problem in player');
        }

    }

    public pause(): void {
        if (!this.isPaused()) {
            this._jPlayer.jPlayer("pause");
        }
    }

    public isPaused(): boolean {
        return this._jPlayer.data("jPlayer").status.paused;
    }

    public setVolume(volume: number): void {
        this._jPlayer.jPlayer("volume", volume);
    }
}