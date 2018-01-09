import {LayoutSample} from "./LayoutSample";
import {Room} from "../Room/Room";
import {User} from "../User/User";

require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');


export class LeftComments extends LayoutSample {
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
        room.showAllComments(true);
    }

    private async onRoomLeave(room: Room): Promise<void> {
        await room.hideAllComments();
        this._$commentContainer.empty();
    }


    public onNewComment(user: User, isShowEffect: boolean = true): void {
        const currentRoom = user.getCurrentRoom();
        currentRoom.showAllComments(isShowEffect);
    }

    public onNextPageEvent(user: User): void {
        this.onNewComment(user, false);
        // setTimeout(() => {
        //     this._$container.mCustomScrollbar("scrollTo", "top");
        // }, 400);

    }


    private async showNextPage(): Promise<void> {
        if (this._nextPageCallback) {
            this._nextPageCallback();
        }
    }
}