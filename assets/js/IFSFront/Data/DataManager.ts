import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";
import {WAMP} from "../WebSocket/WAMP";
import {JComment} from "../Comment/JComment";
import {RoomContainer} from "../Room/RoomContainer";
import {Room} from "../Room/Room";
import {User} from "../User/User";

export class DataManager extends Colleague {
    private _wamp: WAMP;
    private _roomContainer: RoomContainer;

    constructor(mediator: Mediator, wamp: WAMP, roomContainer: RoomContainer) {
        super(mediator);
        this._wamp = wamp;
        this._roomContainer = roomContainer;
    }

    public async initFillRoomByData(user: User): Promise<void> {
        const rooms: Room[] = this._roomContainer.getAllRooms();
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

    public addNewComments(comments: CommentDataInterface[], user: User): void {
        for (let rawComment of comments) {
            let roomId = rawComment.sourceId;
            let room = this._roomContainer.getRoomById(roomId);
            room.addNewComment(new JComment(rawComment, user.getTemplateName()));
        }
    }

    public async onNextPageComment(user: User): Promise<void> {
        const currentSource = user.getCurrentRoomId();
        const lastCommentId = user.getCurrentRoom().getLastComment().getId();
        const json = await this._wamp.commentatorCall('getCommentsNewerThanId', {
            source: currentSource,
            lastCommentId: lastCommentId
        });
        const comments: CommentDataInterface[] = JSON.parse(json);
        let room = this._roomContainer.getRoomById(currentSource);
        this.addOldComments(comments, room, user);
    }

    public fillListeners(listeners: ListenersDataInterface[]) {
        for (const listener of listeners) {
            let room: Room = this._roomContainer.getRoomById(listener.id);
            if (room) {
                room.setListeners(listener.listeners);
                room.setSourceName(listener.name);
            }

        }
    }

    public getTitleListenersData(): ListenersDataInterface[] {
        let data: ListenersDataInterface[] = [];
        const rooms = this._roomContainer.getAllRooms();
        for (let room of rooms) {
            data.push(
                {
                    id: room.getId(),
                    listeners: room.getLisneters(),
                    name: room.getSourceName()
                }
            )
        }

        return data;
    }


}