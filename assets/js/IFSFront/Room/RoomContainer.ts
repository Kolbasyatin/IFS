import {Colleague} from "../Colleague";
import {Room} from "./Room";
import {Mediator} from "../Mediator";
import {JComment} from "../Comment/JComment";

export class RoomContainer extends Colleague{
    private _rooms: Room[] = [];
    readonly _defaultRoomName: string = '';
    constructor(mediator: Mediator) {
        super(mediator);
        this._rooms = this.tempRoomConstructor();
    }

    public getRoomById(roomId: string): Room {
        for (let room of this._rooms) {
            if (room && room.getId() === roomId) {
                return room;
            }
        }

        throw Error("There is no room Found");
    }

    public getDefaultRoom(): Room {
        return this.getRoomById(this._defaultRoomName);
    }

    private tempRoomConstructor(): Room[] {
        let rooms = [];
        rooms.push(new Room('mds_voice', 'http://ice.planeset.ru:8000/mds_voice.mp3', 'MДС-Голос'));
        rooms.push(new Room('mds_music', 'http://ice.planeset.ru:8000/mds.mp3','МДС-Музыка'));
        let defaultRoom = new Room(this._defaultRoomName, '', 'Шлюз');
        defaultRoom.setRoomDefault();
        rooms.push(defaultRoom);

        return rooms;
    }

    public getAllRooms(): Room[] {
        return this._rooms;
    }



}