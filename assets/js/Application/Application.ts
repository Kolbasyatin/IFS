import {Player} from "./Player/Player";
import {Listeners} from "./Listeners/Listeners";
import {CommentManager} from "./Comments/CommentManager";
import {ControlManagement} from "./Management/ControlManagement";
import {Timer} from "./Time/Timer";
import {Commentator} from "./Comments/Commentator";
import {User} from "./User/User";
import {WAMP} from "./WebSocket/WAMP";
import {Source} from "./Source";


export class Application {
    private _player: Player;
    private _currentListeners: Listeners;
    private _commentManager: CommentManager;
    private _controlManagement: ControlManagement;
    private _timer: Timer;
    private _commentator: Commentator;
    private _user: User;
    private _wamp: WAMP;
    private _source: Source;

    constructor() {
        this._source = new Source();
        this._user = new User();
        this._player = new Player(this._source);
        this._wamp = new WAMP();
        this._currentListeners = new Listeners($("#listeners"));
        this._commentManager = new CommentManager($("#comments"), this._wamp, this._source);
        this._controlManagement = new ControlManagement(this._player, this._source);
        this._commentator = new Commentator(this._user);
        this._timer = new Timer($("#curtime"));
    }

    public start(): void {
        this.firstInitializeApp();
        this.bindHandlers();
    }

    private firstInitializeApp(): void {
        this._timer.start();
        this._wamp.onNewCommentAttach(this._commentManager);
        this._wamp.onUpdateCommentAttach(this._commentManager);
        this._wamp.onDeleteCommentAttach(this._commentManager);
        this._commentManager.updateComments();
    }

    private bindHandlers(): void {
        this._player.addOnPlayingHandler(event => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            this._commentManager.updateComments();
        });
        this._player.addOnPauseHandler(event => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            this._commentManager.updateComments();
        });
        this._commentator.getCommentButton().on('click', () => {
            this._commentator.doComment(this._source.getCurrentSourceId());
        });
    }


    public updateListeners(data?: number): void {
        this._currentListeners.setListenersCount(data);
    }

    // public addComments(comments: CommentDataInterface[]): void {
    //     this._commentManager.addComments(comments);
    // }

}
