import {Player} from "./Player/Player";
import {Listeners} from "./Listeners/Listeners";
import {CommentManager} from "./Comments/CommentManager";
import {ControlManagement} from "./Management/ControlManagement";
import {Timer} from "./Time/Timer";
import {Commentator} from "./Comments/Commentator";
import {CommentDataInterface} from "./Comments/CommentDataInterface";
import {User} from "./User/User";
import {WAMP} from "./WebSocket/WAMP";


export class Application {
    private _player: Player;
    private _currentListeners: Listeners;
    private _commentManager: CommentManager;
    private _controlManagement: ControlManagement;
    private _timer: Timer;
    private _commentator: Commentator;
    private _user: User;
    private _wamp: WAMP;

    constructor() {
        this._user = new User();
        this._player = new Player();
        this._currentListeners = new Listeners($("#listeners"));
        this._commentManager = new CommentManager($("#comments"));
        this._controlManagement = new ControlManagement(this._player);
        this._commentator = new Commentator(this._user);
        this._wamp = new WAMP();
        this._timer = new Timer($("#curtime"));
    }

    public start(): void {
        this.firstInitializeApp();
        this.bindHandlers();
    }

    private firstInitializeApp(): void {
        this._timer.start();
        const comments = this._wamp.commentatorCall('comment', {"term1": 2, "term2": 5});
        console.log(comments);
        /** TODO: not properly works **/
    }

    private bindHandlers(): void {
        this._player.addOnPlayingHandler(event => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            /** TODO: refresh comment */
        });
        this._player.addOnPauseHandler(event => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            /** TODO: refresh comment */
        });
        this._commentator.getCommentButton().on('click', () => {
            let currentStation = this.getCurrentSourceId();
            this._commentator.doComment(currentStation);
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
