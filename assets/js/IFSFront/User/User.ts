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

    public goToRoom(room: Room): void {
        this.doChangeRoom(room);
        this._mediator.roomWasChanged(room);
    }

    private doChangeRoom(room: Room): void {
        if(this._currentRoom) {
            this._previousRoom = this._currentRoom;
        }
        this._currentRoom = room;
    }

    public getRawCommentOfCurrentRoom(): CommentDataInterface[] {
        if(!this._currentRoom) {
            throw Error('There is no current room');
        }

        return this._currentRoom.getRawComments();
    }

    public getCurrentRoomId(): string {
        return this._currentRoom.getId();
    }

    public getPreviousRoomId(): string {
        return this._previousRoom.getId();
    }

}