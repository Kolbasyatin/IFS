import {Listeners} from "./Listeners";
import {ListenersAllChannel} from "./ListenersAllChannel";
import {User} from "../User/User";
import {Room} from "../Room/Room";
import {DataManager} from "../Data/DataManager";

export class ListenersManager {
    private _listeners: Listeners;
    private _allListeners: ListenersAllChannel;

    constructor() {
        this._listeners = new Listeners($("#listeners"));
        this._allListeners = new ListenersAllChannel($("#all_listeners"));
    }

    /** Invokes by LayoutManager */
    public roomWasChanged(user: User): void {
        this.updateMainListeners(user);
    }

    /** Invokes by LayoutManager */
    public onListeners(user: User, dataManager: DataManager): void {
        this.updateMainListeners(user);
        this._allListeners.show(dataManager.getTitleListenersData());

    }

    private updateMainListeners(user: User): void {
        const currentRoom: Room = user.getCurrentRoom();
        if (currentRoom) {
            this._listeners.updateListeners(currentRoom.getLisneters());
        }
    }


}