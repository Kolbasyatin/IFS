import {Room} from "../Room/Room";
import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";
import {JComment} from "../Comment/JComment";

export class User extends Colleague{

    private _currentRoom: Room;
    private _previousRoom: Room;
    private _$userInformer: JQuery = $("div#user-info");

    constructor(mediator: Mediator) {
        super(mediator);
    }

    public isAuthenticated(): boolean {
        return this._$userInformer.data('is-authenticated') === true;
    }
    public isNewsMaker(): boolean {
        return this._$userInformer.data('is-newsmaker') === true;
    }

    public goToRoom(room: Room): void {
        this.changeRoom(room);
        this._mediator.roomWasChanged();
    }

    private changeRoom(room: Room): void {
        if(this._currentRoom) {
            this._previousRoom = this._currentRoom;
        }
        this._currentRoom = room;
    }

    public getCurrentRoomId(): string {
        return this._currentRoom.getId();
    }

    public getPreviousRoomId(): string {
        return this._previousRoom.getId();
    }

    public getPreviousRoom(): Room {
        return this._previousRoom;
    }

    public getCurrentRoom(): Room {
        return this._currentRoom;
    }

}