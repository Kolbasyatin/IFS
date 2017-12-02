import {LayoutSample} from "./LayoutSample";
import {Room} from "../Room/Room";
import {User} from "../User/User";

require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');


export class LeftCommentsLayout extends LayoutSample {
    private _cSBOptions: MCustomScrollbar.CustomScrollbarOptions = {
        theme: 'dark-thin',
        callbacks: {
            onTotalScroll: (): Promise<void> => this.showNextPage()
        }
    };
    private _$mCustomScrollContainer: JQuery;
    private _$commentContainer: JQuery;
    private _nextPageCallback: () => void;

    constructor($container: JQuery, nextPageCallback: () => void) {
        super($container);
        this._$mCustomScrollContainer = $container.mCustomScrollbar(this._cSBOptions);
        this._$commentContainer = this._$mCustomScrollContainer.find("#mCSB_1_container");
        this._nextPageCallback = nextPageCallback;
    }

    public roomWasChanged(user: User): void {
        const currentRoom: Room = user.getCurrentRoom();
        const previousRoom: Room = user.getPreviousRoom();
        (async () => {
            if (previousRoom) {
                await this.onRoomLeave(previousRoom);
            }
            this.onRoomEnter(currentRoom);
        })();

    }

    private onRoomEnter(room: Room): void {
        const roomCommentContainer: JQuery = room.getJContainer();
        this._$commentContainer.append(roomCommentContainer);
        this.commentContainerUpdate();
        room.showAllComments();
    }

    private async onRoomLeave(room: Room): Promise<void> {
        await room.hideAllComments();
        this._$commentContainer.empty();
        this.commentContainerUpdate();
    }


    public onNewComment(user: User): void {
        this.commentContainerUpdate();
        const currentRoom = user.getCurrentRoom();
        currentRoom.showAllComments();
    }

    public onNextPageEvent(user: User): void {
        this.onNewComment(user);
    }


    private commentContainerUpdate(): void {
        this._$mCustomScrollContainer.mCustomScrollbar('update');
    }


    private async showNextPage(): Promise<void> {
        if (this._nextPageCallback) {
            this._nextPageCallback();
        }
    }
}