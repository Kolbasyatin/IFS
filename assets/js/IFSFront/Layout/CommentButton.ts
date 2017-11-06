
import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";

export class CommentButton extends Colleague{
    private _$button: JQuery;

    constructor(mediator: Mediator) {
        super(mediator);
        this._$button = $("#comment_add");
        this.bindHandlers();
    }

    private bindHandlers(): void {
        this._$button.on('click', () => {
            this.clickedComment();
        })
    }

    private clickedComment(): void {
        this._mediator.commentButtonClicked();
    }

    public showCommentButton():void {
        if (this._$button.not(':visible')) {
            this._$button.fadeIn('easing')
        }
    }

    public hideCommentButton(): void {
        if (this._$button.is(':visible')) {
            this._$button.fadeOut('easing');
        }

    }
}