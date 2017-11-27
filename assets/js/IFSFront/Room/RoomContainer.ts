import {Colleague} from "../Colleague";
import {Room} from "./Room";
import {Mediator} from "../Mediator";
import {JComment} from "../Comment/JComment";

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

    // public addCommentsToAppropriateRooms(comments: CommentDataInterface[], isCommentNew: boolean = false): JComment[] {
    //     let jComments = [];
    //     for (let comment of comments) {
    //         let room = this.getRoomById(comment.sourceId);
    //         let jComment = new JComment(comment);
    //         if(isCommentNew) {
    //             room.addNewComment(jComment);
    //         } else {
    //             room.addComment(jComment);
    //         }
    //         jComments.push(jComment);
    //     }
    //
    //    return jComments;
    // }

    public getDefaultRoom(): Room {
        return this.getRoomById('');
    }

    private tempRoomConstructor(): Room[] {
        let rooms = [];
        rooms.push(new Room('mds_voice', 'http://ice.planeset.ru:8000/mds_voice.mp3', 'squad'));
        rooms.push(new Room('mds_music', 'http://ice.planeset.ru:8000/mds.mp3', 'squad'));
        let defaultRoom = new Room('', '', 'newsMaker');
        defaultRoom.setRoomDefault();
        rooms.push(defaultRoom);

        return rooms;
    }

    public getAllRooms(): Room[] {
        return this._rooms;
    }



}