import {Colleague} from "../Colleague";
import {Room} from "./Room";
import {Mediator} from "../Mediator";

export class RoomContainer extends Colleague{
    private _rooms: Room[] = [];
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
        return this.getRoomById('');
    }

    private tempRoomConstructor(): Room[] {
        let rooms = [];
        rooms.push(new Room('mds_voice', 'http://ice.planeset.ru:8000/mds_voice.mp3'));
        rooms.push(new Room('', ''));

        return rooms;
    }

    public getAllRooms(): Room[] {
        return this._rooms;
    }



}