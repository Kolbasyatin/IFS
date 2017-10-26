import {Control} from "./Control/Control";
import {LayoutManager} from "./Layout/LayoutManager";
import {Colleague} from "./Colleague";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {Room} from "./Room/Room";

export class Mediator {

    private _control: Control;
    private _layout: LayoutManager;
    private _user: User;
    private _roomContainer: RoomContainer;

    public setControl(control: Colleague) {
        this._control = <Control>control;
    }
    public setLayout(layout: Colleague) {
        this._layout = <LayoutManager>layout;
    }
    public setUser(user: User) {
        this._user = user;
    }
    public setRoomContainer(roomContainer: RoomContainer) {
        this._roomContainer = roomContainer;
    }

    /** ================== */
    public switchToDefaultRoom(): void {
        const room: Room = this._roomContainer.getDefaultRoom();
        this._user.changeRoom(room);
    }

    public switchRoom(roomId: string): void {
        const room: Room = this._roomContainer.getRoomById(roomId);
        this._user.changeRoom(room);
    }

    public roomWasChanged(): void {
        console.log('start application');
    }

    public startApplication(): void {
        this.switchToDefaultRoom();
    }
}