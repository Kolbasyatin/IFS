import {Control} from "./Control/Control";
import {LayoutManager} from "./Layout/LayoutManager";
import {Colleague} from "./Colleague";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {Room} from "./Room/Room";
import {WAMP} from "./WebSocket/WAMP";
import {DataManager} from "./Data/DataManager";

export class Mediator {

    private _control: Control;
    private _layout: LayoutManager;
    private _user: User;
    private _roomContainer: RoomContainer;
    private _wamp: WAMP;
    private _dataManager: DataManager;

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
    public setWamp(wamp:WAMP): void {
        this._wamp = wamp;
    }

    public setDataManager(manager: DataManager): void {
        this._dataManager = manager;
    }


    /** ================== */

    public startApplication(): void {
        this.fillData();
        this.switchToDefaultRoom();
    }

    public switchToDefaultRoom(): void {
        const room: Room = this._roomContainer.getDefaultRoom();
        this._user.changeRoom(room);
    }

    public switchRoom(roomId: string): void {
        const room: Room = this._roomContainer.getRoomById(roomId);
        this._user.changeRoom(room);
    }

    public onNewComment(comments: CommentDataInterface[]): void {

    }

    // public getCommentsFromServer(sourceId: string): CommentDataInterface[] {
    //     return this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: sourceId});
    // }

    public roomWasChanged(): void {
        console.log('start application');
    }

    public stopApplication(): void {
        console.log('application stopped!');
    }

    public fillData(): void {
        const rooms: Room[] = this._roomContainer.getAllRooms();
        const comments: CommentDataInterface[] = (async () => {
            return await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: sourceId});
        })();
        console.log(comments);
        // for (let room of rooms) {
        //      await this._dataManager.fillCommentsRoom(room);
        // }
    }
}