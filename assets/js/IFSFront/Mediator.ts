import {Control} from "./Control/Control";
import {LayoutManager} from "./Layout/LayoutManager";
import {Colleague} from "./Colleague";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {Room} from "./Room/Room";
import {WAMP} from "./WebSocket/WAMP";
import {Player} from "./Player/Player";
import {CommentForm} from "./Comment/CommentForm";
import {DataManager} from "./Data/DataManager";

export class Mediator {
    private _control: Control;
    private _layoutManager: LayoutManager;
    private _user: User;
    private _roomContainer: RoomContainer;
    private _wamp: WAMP;
    private _player: Player;
    private _commentForm: CommentForm;
    private _dataManager: DataManager;
    private _isStarted: boolean = false;

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
    public setDataManager(dataManager: DataManager) {
        this._dataManager = dataManager;
    }

    /** ================== */
    public fly(): void {
        this._layoutManager.onApplicationInit();
        this._wamp.connect();
    }

    //Starts on wamp connect
    public async startApplication(): Promise<void> {
        if (!this._isStarted) {
            this._isStarted = true;
            try {
                await this.roomInitData();
            } catch (error) {
                console.log(error);
            } finally {
                this.setStartedVolume();
                this.switchToDefaultRoom();
            }
        }

    }

    private async roomInitData(): Promise<void> {
        return this._dataManager.initFillRoomByData(this._roomContainer, this._user);
    }

    private setStartedVolume(): void {
        const volume = this._control.getCurrentVolume();
        this._layoutManager.changeVolumeIndicator(volume);
        this._player.setVolume(volume);
    }

    public switchToDefaultRoom(): void {
        const room: Room = this._roomContainer.getDefaultRoom();
        this._user.goToRoom(room);
    }

    /** Invoke User.goToRoom when room is changed **/
    public roomWasChanged(): void {
        this._layoutManager.roomWasChanged(this._user);
        this._player.play(this._user.getCurrentRoom());
    }

    public onNextPageComment(): void {
        (async () => {
            await this._dataManager.onNextPageComment(this._user, this._roomContainer);
            this._layoutManager.onNextPageEvent(this._user);
        })();

    }

    /** Invokes by Control Switch Room */
    public switchRoom(roomId: string): void {
        const room: Room = this._roomContainer.getRoomById(roomId);
        if (room.getId() !== this._user.getCurrentRoomId()) {
            this._user.goToRoom(room);
        }

    }

    public changeVolume(volume: number): void {
        this._player.setVolume(volume);
        this._layoutManager.changeVolumeIndicator(volume);
    }

    /** Invokes by WAMP on New comment event */
    public onNewComment(comments: CommentDataInterface[]): void {
        DataManager.addNewComments(comments, this._roomContainer, this._user);
        this._layoutManager.onNewCommentsEvent(this._user);
    }


    public onUpdateComment(comments: CommentDataInterface[]): void {
        console.log('Реализовать update комментария')
    }

    public onDeleteComment(commentId: number): void {
        console.log('Релазизовать удаление коммента');
    }

    public onListeners(listeners: ListenersDataInterface[]): void {
        this._dataManager.fillListeners(this._roomContainer, listeners);
        this._layoutManager.changeListeners(this._user);
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


    /** Ivokes in Control when change volume. Prevent error when slider is ready, but application is not */
    public isApplicationStarted(): boolean {
        return this._isStarted;
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