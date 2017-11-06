import {Control} from "./Control/Control";
import {LayoutManager} from "./Layout/LayoutManager";
import {Colleague} from "./Colleague";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {Room} from "./Room/Room";
import {WAMP} from "./WebSocket/WAMP";
import {Player} from "./Player/Player";
import {CommentForm} from "./Comment/CommentForm";

export class Mediator {
    private _control: Control;
    private _layoutManager: LayoutManager;
    private _user: User;
    private _roomContainer: RoomContainer;
    private _wamp: WAMP;
    private _player: Player;
    private _commentForm: CommentForm;
    private _isStarted: boolean;

    public setControl(control: Colleague) {
        this._control = <Control>control;
    }
    public setLayout(layout: Colleague) {
        this._layoutManager = <LayoutManager>layout;
    }
    public setUser(user: User) {
        this._user = user;
    }
    public setRoomContainer(roomContainer: RoomContainer) {
        this._roomContainer = roomContainer;
    }
    public setWamp(wamp:WAMP): void {
        this._wamp = wamp;
    }
    public setPlayer(player: Player): void {
        this._player = player;
    }
    public setCommentForm(commentForm: CommentForm) {
        this._commentForm = commentForm;
    }

    /** ================== */
    public start(): void {
        this._layoutManager.startTimer();
        this._wamp.connect();
    }

    //Starts on wamp connect
    public async startApplication(): Promise<void> {
        this._isStarted = true;
        await this.fillRoomFirstPageComment();
        this.switchToDefaultRoom();
        this.setStartedVolume();
    }

    public switchToDefaultRoom(): void {
        const room: Room = this._roomContainer.getDefaultRoom();
        this._user.goToRoom(room);
    }
    /** Invokes by Control Switch Room */
    public switchRoom(roomId: string): void {
        const room: Room = this._roomContainer.getRoomById(roomId);
        if (room.getId() !== this._user.getCurrentRoomId()) {
            this._user.goToRoom(room);
        }

    }

    /** Invoke User when room is changed **/
    public roomWasChanged(room: Room): void {
        this._layoutManager.updateLayoutWhenRoomChange(this._user);
        this._player.play(room);

    }

    /** Invokes by Control (play button) */
    public resumePlay(): void {
        if (this._player.isPaused()) {
            this.switchRoom(this._user.getPreviousRoomId());
        }

    }

    public onNewComment(comments: CommentDataInterface[]): void {

        for (let comment of comments) {
            let room = this._roomContainer.getRoomById(comment.sourceId);
            room.addRawComment(comment);
        }
    }

    /** Fires when wamp disconnected */
    public stopApplication(): void {
        console.log('application stopped!');
    }

    /** TODO: Возмоно есть смысл выделить в отдельный функционал работы с данными */
    public async fillRoomFirstPageComment(): Promise<void> {
        const rooms: Room[] = this._roomContainer.getAllRooms();
        for (let room of rooms) {
            const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: room.getId()});
            room.addRawComments(comments);
        }

    }

    public changeVolume(volume: number): void {
            this._layoutManager.changeVolumeIndicator(volume);
            this._player.setVolume(volume);
    }

    public isApplicationStarted(): boolean {
        return this._isStarted;
    }

    private setStartedVolume(): void {
        this.changeVolume(this._control.getCurrentVolume());
    }

    /** Invokes by player onPlay event */
    public playStarting(): void {
        this._control.playStarting(this._user.getCurrentRoomId());
        //TODO: create loading
    }

    /** Invokes by player onPlaying event */
    public playStarted(): void {
        this._control.playStarted(this._user.getCurrentRoomId());
    }

    /** Invokes by player onPaused event */
    public playStopped(): void {
        this._control.playStopped(this._user.getPreviousRoomId());
    }

    /** Invokes by CommentButton on click */
    public commentButtonClicked(): void {
        if (this._user.isAuthenticated()) {
            this._commentForm.comment(this._user.getCurrentRoomId());
        } else {
            this._layoutManager.blinkAuthButton();
        }
    }

}