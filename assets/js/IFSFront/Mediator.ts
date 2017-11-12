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

    /** TODO: Возмоно есть смысл выделить в отдельный функционал работы с данными */
    public async fillRoomFirstPageComment(): Promise<void> {
        const rooms: Room[] = this._roomContainer.getAllRooms();
        for (let room of rooms) {
            const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: room.getId()});
            this._roomContainer.addCommentsToAppropriateRooms(comments);
        }
    }

    public async onNextPageComment(): Promise<void> {
        const currentSource = this._user.getCurrentRoomId();
        const lastCommentId = this._user.getCurrentRoom().getLastComment().getId();
        console.log(currentSource);
        console.log(lastCommentId);
        const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsNewerThanId', {source: currentSource, lastCommentId: lastCommentId});
        console.log(comments);
        const jComments = this._roomContainer.addCommentsToAppropriateRooms(comments);
        this._layoutManager.appendAndShowJComments(jComments);
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
        this._layoutManager.roomWasChanged(this._user);
        this._player.play(room);

    }

    /** Invokes by WAMP on New comment event */
    /** TODO: Однозначно отсюда вынести все это и переделать */
    public onNewComment(comments: CommentDataInterface[]): void {
        this.insertNewCommentsInRoom(comments);
        const currentRoom = this._user.getCurrentRoom();
        this._layoutManager.onNewCommentsEvent(currentRoom.getNewComments());
    }

    private insertNewCommentsInRoom(comments: CommentDataInterface[]): void {
        this._roomContainer.addCommentsToAppropriateRooms(comments, true);
    }

    public onUpdateComment(comments: CommentDataInterface[]): void {
        console.log('Реализовать update комментария')
    }

    public onDeleteComment(commentId: number): void {
        console.log('Релазизовать удаление коммента');
    }

    /** Invokes by Control (play button) */
    public resumePlay(): void {
        if (this._player.isPaused()) {
            this.switchRoom(this._user.getPreviousRoomId());
        }

    }

    /** Fires when wamp disconnected */
    public stopApplication(): void {
        console.log('application stopped!');
    }



    public changeVolume(volume: number): void {
            this._layoutManager.changeVolumeIndicator(volume);
            this._player.setVolume(volume);
    }

    /** Ivokes in Control when change volume. Prevent error when slider is ready, but application is not */
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