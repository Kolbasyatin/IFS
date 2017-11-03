
import {User} from "../User/User";

export class CommentButton {
    private _$button: JQuery;

    constructor() {
        this._$button = $("#comment_add");
        this.bindHandlers();
    }

    private bindHandlers(): void {
        this._$button.on('click', () => {
            this.clickedComment();
        })
    }

    private clickedComment(): void {
        console.log('clicked Comment! Do comment!')
    }

    public toggleCommentButton(user: User, status: boolean): void {
        if(user.isNewsMaker()) {
            this._$button.not(':visible') ? this.showCommentButton(): '';
            return;
        }
        status ? this.showCommentButton() : this.hideCommentButton();
    }

    private showCommentButton():void {
        this._$button.fadeIn('easing')
    }

    private hideCommentButton(): void {
        this._$button.fadeOut('easing');
    }
}