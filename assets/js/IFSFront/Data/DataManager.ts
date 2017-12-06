import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";
import {WAMP} from "../WebSocket/WAMP";
import {JComment} from "../Comment/JComment";
import {RoomContainer} from "../Room/RoomContainer";
import {Room} from "../Room/Room";
import {User} from "../User/User";

export class DataManager extends Colleague {
    private _wamp: WAMP;
    constructor(mediator: Mediator, wamp: WAMP) {
        super(mediator);
        this._wamp = wamp;
    }

    public async initFillRoomByData(roomContainer: RoomContainer, user: User): Promise<void> {
        const rooms: Room[] = roomContainer.getAllRooms();
        for (let room of rooms) {
            await this.fillRoomByInitData(room, user);
        }
    }

    private async fillRoomByInitData(room: Room, user: User): Promise<void> {
        let json = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: room.getId()});
        const rawComments = JSON.parse(json);
        this.addOldComments(rawComments, room, user);
    }

    public addOldComments(comments: CommentDataInterface[], room: Room, user: User): void {
        for (let rawComment of comments) {
            room.addComment(new JComment(rawComment, user.getTemplateName()));
        }
    }

    public static addNewComments(comments: CommentDataInterface[], roomContainer: RoomContainer, user: User):  void {
        for (let rawComment of comments) {
            let roomId = rawComment.sourceId;
            let room = roomContainer.getRoomById(roomId);
            room.addNewComment(new JComment(rawComment, user.getTemplateName()));
        }
    }

    public async onNextPageComment(user: User, roomContainer: RoomContainer): Promise<void> {
        const currentSource = user.getCurrentRoomId();
        const lastCommentId = user.getCurrentRoom().getLastComment().getId();
        const json = await this._wamp.commentatorCall('getCommentsNewerThanId', {source: currentSource, lastCommentId: lastCommentId});
        const comments: CommentDataInterface[] = JSON.parse(json);
        let room = roomContainer.getRoomById(currentSource);
        this.addOldComments(comments, room, user);
    }



}