import {User} from "../User/User";
import {DataManager} from "../Data/DataManager";
import {Track} from "./Track";
import {Room} from "../Room/Room";

export class TrackManager {

    private mainTrack: Track;


    constructor() {
        this.mainTrack = new Track($("#sound_name"))
    }

    public roomWasChanged(user: User): void {
        this.updateMainTrackName(user);
    }

    public onTrack(user: User, dataManager: DataManager): void {
        this.updateMainTrackName(user);
    }

    private updateMainTrackName(user: User): void {
        const currentRoom: Room = user.getCurrentRoom();
        if (currentRoom) {
            this.mainTrack.updateTrackName(currentRoom.getCurrentTrackName());
        }
    }

}