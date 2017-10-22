import {User} from "./User";
import {Room} from "../Room/Room";

export class RoomManager {
    private _rooms: Room[];
    private _defaultRoomId: string = '';
    constructor(rooms: Room[]){
        this._rooms = rooms;
    }


    public changeRoom(user: User, roomId: string): void {
        const currentRoom: Room|void = this.getRoomById(roomId);
        if(currentRoom) {
            user.changeRoom(currentRoom);
        }
    }

    public getRoomById(id: string): Room|void {
        for (let room of this._rooms) {
            if (room.getId() === id) {
                return room;
            }
        }
    }

    public changeToDefaultRoom(user: User): void {
        const room: Room| void = this.getRoomById(this._defaultRoomId);
        if(room) {
            user.changeRoom(room);
        } else {
            throw Error;
        }
    }
}