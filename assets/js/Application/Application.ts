import {Player} from "./Player/Player";
import {Listeners} from "./Listeners/Listeners";
import {CommentManager} from "./Comments/CommentManager";
import {ControlManagement} from "./Management/ControlManagement";
import {Timer} from "./Time/Timer";
import {Commentator} from "./Comments/Commentator";
import {User} from "./User/User";
import {WAMP} from "./WebSocket/WAMP";
import {RoomManager} from "./User/RoomManager";


export class Application {
    private _roomManager: RoomManager;
    private _player: Player;
    private _currentListeners: Listeners;
    private _commentManager: CommentManager;
    private _controlManagement: ControlManagement;
    private _timer: Timer;
    private _commentator: Commentator;
    private _user: User;
    private _wamp: WAMP;

    constructor(roomManager: RoomManager, user: User) {
        this._roomManager = roomManager;
        this._user = user;
        this._player = new Player();
        this._wamp = new WAMP();
        this._currentListeners = new Listeners($("#listeners"));
        this._commentManager = new CommentManager(this._user, $("#comments"), this._wamp);
        this._controlManagement = new ControlManagement(this._player, this._user, roomManager);
        this._commentator = new Commentator(this._user);
        this._timer = new Timer($("#curtime"));
    }

    public start(): void {
        this.firstInitializeApp();
        this.bindHandlers();
    }

    private firstInitializeApp(): void {
        this._timer.start();

        this._commentManager.showFirstCommentPage();
    }

    private bindHandlers(): void {
        this._player.addOnPlayingHandler(event => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            this._commentManager.showFirstCommentPage();
        });
        this._player.addOnPauseHandler(event => {
            this._commentator.toggleCommentButton(!event.jPlayer.status.paused);
            this._commentManager.showFirstCommentPage();
        });
        this._commentator.getCommentButton().on('click', () => {
            this._commentator.doComment(this._user.getCurrentRoomId());
        });
    }

    public updateListeners(data?: number): void {
        this._currentListeners.setListenersCount(data);
    }

}
