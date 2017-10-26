import {Room} from "../Room/Room";
import {Colleague} from "../Colleague";

export class User extends Colleague{

    private _currentRoom: Room;
    private _previousRoom: Room;

    private _$userInformer: JQuery = $("div#user-info");

    public isAuthenticated(): boolean {
        return this._$userInformer.data('is-authenticated') === true;
    }
    public isNewsMaker(): boolean {
        return this._$userInformer.data('is-newsmaker') === true;
    }

    public changeRoom(room: Room): void {
        this.doChangeRoom(room);
        this._mediator.roomWasChanged();
    }

    private doChangeRoom(room: Room): void {
        if(this._currentRoom) {
            this._previousRoom = this._currentRoom;
        }
        this._currentRoom = room;
    }
}