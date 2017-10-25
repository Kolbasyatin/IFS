import {LeftCommentsLayout} from "./LeftCommentsLayout";
import {Mediator} from "../Mediator";
import {Colleague} from "../Colleague";
import {CommentHTML} from "../Comment/CommentHTML";

export class LayoutManager extends Colleague {
    private _containers: LayoutPublishInterface[] = [];
    private _leftCommentLayout: LayoutPublishInterface;


    constructor(mediator: Mediator) {
        super(mediator);
        this._leftCommentLayout =  new LeftCommentsLayout($("#comments"));
    }

    public publish() {
        const comm = new CommentHTML({
            id: 1,
            sourceId: 'mds_voice',
            username: 'Zalex',
            message: 'This is a message',
            dateTime: 39284709238470293,
            type: 'comment'
        });
        const data = comm.getHTML();
        console.log(data);
        this._leftCommentLayout.publish(data);
    }
}