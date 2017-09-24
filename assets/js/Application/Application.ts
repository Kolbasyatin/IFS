import {Player} from "./Player/Player";
import {Listeners} from "./Listeners/Listeners";
import {CommentManager} from "./Comments/CommentManager";
import {ControlManagement} from "./Management/ControlManagement";
import {Timer} from "./Time/Timer";
import {Commentator} from "./Comments/Commentator";
import {CommentDataInterface} from "./Comments/CommentDataInterface";
import {User} from "./User/User";


export class Application {
    private _player: Player;
    private _currentListeners: Listeners;
    private _commentManager: CommentManager;
    private _controlManagement: ControlManagement;
    private _timer: Timer;
    private _commentator: Commentator;
    private _user: User;

    constructor() {
        this._player = new Player();
        this._currentListeners = new Listeners($("#listeners"));
        this._commentManager = new CommentManager($("#comments"));
        this._controlManagement = new ControlManagement(this._player);
        this._timer = new Timer($("#curtime"));
        this._commentator = new Commentator();
        this._user = new User();
    }

    public start(): void {
        this.firstInitializeApp();
        this.bindHandlers();
        // this._commentManager.addComments(commentData);
    }

    private firstInitializeApp(): void {
        this._timer.start();
        this.updateComments();
    }

    private bindHandlers(): void {
        this._player.addOnPlayingHandler((event) => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            /** TODO: refresh comment */
        });
        this._player.addOnPauseHandler((event) => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            /** TODO: refresh comment */
        });
        this._commentator.getCommentButton().on('click', (event) => {
            let currentStation = this.getCurrentSourceId();
            this._commentator.doComment(currentStation, this._user);
        });
    }

    private updateComments(): void {
        this._commentManager.addCommentsBySource(this._player.getCurrentSourceId());
    }

    public updateListeners(data?: number): void {
        this._currentListeners.setListenersCount(data);
    }

    public addComments(comments: CommentDataInterface[]): void {
        this._commentManager.addComments(comments);
    }

    private getCurrentSourceId(): string {
        return this._player.getCurrentSourceId();
    }

}
