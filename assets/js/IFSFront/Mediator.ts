import {Control} from "./Control/Control";
import {LayoutManager} from "./Layout/LayoutManager";
import {Colleague} from "./Colleague";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {Room} from "./Room/Room";
import {WAMP} from "./WebSocket/WAMP";

export class Mediator {

    private _control: Control;
    private _layoutManager: LayoutManager;
    private _user: User;
    private _roomContainer: RoomContainer;
    private _wamp: WAMP;

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

    /** ================== */
    public start(): void {
        this._wamp.connect();
    }

    //Starts on wamp connect
    public async startApplication(): Promise<void> {
        await this.fillRoomFirstPageComment();
        this.switchToDefaultRoom();
    }

    public switchToDefaultRoom(): void {
        const room: Room = this._roomContainer.getDefaultRoom();
        this._user.goToRoom(room);
    }

    public switchRoom(roomId: string): void {
        const room: Room = this._roomContainer.getRoomById(roomId);
        this._user.goToRoom(room);
    }

    public onNewComment(comments: CommentDataInterface[]): void {

    }
    /** Fires in User when room is changed **/
    public roomWasChanged(): void {
        this._layoutManager.updateLayoutWhenRoomChange(this._user);
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


}