import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";
import {WAMP} from "../WebSocket/WAMP";
import {JComment} from "../Comment/JComment";
import {RoomContainer} from "../Room/RoomContainer";
import {Room} from "../Room/Room";

export class DataManager extends Colleague {
    private _wamp: WAMP;
    constructor(mediator: Mediator, wamp: WAMP) {
        super(mediator);
        this._wamp = wamp;
    }

    public async initFillRoomByData(roomContainer: RoomContainer): Promise<void> {
        const rooms: Room[] = roomContainer.getAllRooms();
        for (let room of rooms) {
            await this.fillRoomByInitData(room);
        }
    }

    private async fillRoomByInitData(room: Room): Promise<void> {
        let json = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: room.getId()});
        const rawComments = JSON.parse(json);
        for (let rawComment of rawComments) {
            room.addComment(new JComment(rawComment));
        }
    }

}