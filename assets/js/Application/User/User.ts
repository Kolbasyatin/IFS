import {Room} from "../Room/Room";
import {Comment} from "../Comments/Comment";
import {ScrollBarCommentContainer} from "../Container/CommentContainer";

export class User {
    private _currentRoom: Room;
    private _previousRoom: Room;
    private _$userInformer: JQuery = $("div#user-info");
    public isAuthenticated(): boolean {
        return this._$userInformer.data('is-authenticated') === true;
    }
    public isNewsMaker(): boolean {
        return this._$userInformer.data('is-newsmaker') === true;
    }

    public getCurrentRoomComments(): Comment[] {
        return this._currentRoom.getComments();
    }

    public changeRoom(room: Room): void {
        if(this._currentRoom) {
            this._previousRoom = this._currentRoom;
        }
        this._currentRoom = room;
    }

    public getCurrentRoomId(): string {
        return this._currentRoom.getId();
    }

    public getCurrentCommentsContainer(): ScrollBarCommentContainer {
        return this._currentRoom.getCommentContainer();
    }

    public isLastPageCommentsInCurrentRoom(): boolean {
        return this._currentRoom.isLastCommentPage();
    }

    public setLastPageCommentsInCurrentRoom(): void {
        this._currentRoom.setLastCommentPage();
    }

    public getCurrentSourceUrl(): string {
        return this._currentRoom.getSourceUrl();
    }

    public getCurrentRoom(): Room {
        return this._currentRoom;
    }

    public getPreviousRoom(): Room {
        return this._previousRoom;
    }

}