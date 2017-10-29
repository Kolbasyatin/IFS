import {LeftCommentsLayout} from "./LeftCommentsLayout";
import {Mediator} from "../Mediator";
import {Colleague} from "../Colleague";
import {CommentJWrapper} from "../Comment/CommentJWrapper";
import {User} from "../User/User";

export class LayoutManager extends Colleague {
    private _containers: LayoutPublishInterface[] = [];
    private _leftCommentLayout: LayoutPublishInterface;


    constructor(mediator: Mediator) {
        super(mediator);
        this._leftCommentLayout =  new LeftCommentsLayout($("#comments"));
    }

    public updateLayoutWhenRoomChange(user: User): void {
        this.updateLeftCommentLayout(user);
        // this.updateAnotherELement...
        // this.updateAnotherELement...
        // this.updateAnotherELement...
    }

    private updateLeftCommentLayout(user: User): void {
        this.hideCurrentLayout();
        const rawComments = user.getRawCommentOfCurrentRoom();
        let comments: ShowInterface[] = [];
        for (let rawComment of rawComments) {
            const comment = new CommentJWrapper(rawComment);
            this._leftCommentLayout.publish(comment.getJHTML());
            comments.push(comment);
        }
        const show = (comments: ShowInterface[]): void => {
            setTimeout(() => {
                let comment: ShowInterface | void = comments.pop();
                if (comment) {
                    comment.show(true);
                    show(comments)
                }
            }, 80);
        };
        /** Clone comments before show */
        show(comments);
    }

    private hideCurrentLayout():void {
        this._leftCommentLayout.hide();
    }


}