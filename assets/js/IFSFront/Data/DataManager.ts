import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";
import {WAMP} from "../WebSocket/WAMP";
import {JComment} from "../Comment/JComment";

export class DataManager extends Colleague {
    private _wamp: WAMP;
    constructor(mediator: Mediator, wamp: WAMP) {
        super(mediator);
        this._wamp = wamp;
    }

    public async getFirstCommentPage(sourceId: string): Promise<JComment[]> {
        const rawComments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: sourceId});
        let comments: JComment[] = [];
        for (let rawComment of rawComments) {
            comments.push(new JComment(rawComment));
        }

        return comments;
    }
}