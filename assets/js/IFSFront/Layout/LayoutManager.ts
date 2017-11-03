import {LeftCommentsLayout} from "./LeftCommentsLayout";
import {Mediator} from "../Mediator";
import {Colleague} from "../Colleague";
import {CommentJWrapper} from "../Comment/CommentJWrapper";
import {User} from "../User/User";
import {VolumeIndicator} from "../Control/VolumeIndicator";

export class LayoutManager extends Colleague {
    private _leftCommentLayout: LayoutPublishInterface;
    private _volumeIndicator: VolumeIndicator;

    constructor(mediator: Mediator) {
        super(mediator);
        this._leftCommentLayout =  new LeftCommentsLayout($("#comments"));
        this._volumeIndicator = new VolumeIndicator($('#volume_indicator'));
    }

    public updateLayoutWhenRoomChange(user: User): void {
        this.updateLeftCommentLayout(user);
        // this.updateAnotherELement...
        // this.updateAnotherELement...
        // this.updateAnotherELement...
    }

    private updateLeftCommentLayout(user: User): void {
        this.hideCurrentLayout();
        this.appendDataCommentsToLeftCommentLayout(user);
    }

    private hideCurrentLayout():void {
        this._leftCommentLayout.hide();
    }

    private appendDataCommentsToLeftCommentLayout(user: User): void {
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

        show(comments);
    }

    public changeVolumeIndicator(value: number): void {
        this._volumeIndicator.setValue(value);
    }



}