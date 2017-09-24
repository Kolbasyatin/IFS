import {CommentForm} from "./CommentForm";
import {User} from "../User/User";

export class Commentator {
    private _$form: CommentForm;
    private _$comm_button: JQuery;
    private _$auth: JQuery = $("ul.auth-ul li");

    constructor() {
        this._$form = new CommentForm();
        this._$comm_button = $("#comment_add");
    }

    private showCommentButton():void {
        this._$comm_button.fadeIn('easing')
    }

    private hideCommentButton(): void {
        this._$comm_button.fadeOut('easing');
    }

    public toggleCommentButton(status: boolean): void {
        status ? this.showCommentButton() : this.hideCommentButton();
    }
    public getCommentButton(): JQuery {
        return this._$comm_button;
    }
    public doComment(station: string, user: User): void {
        if (user.isAuthenticated()) {
            this._$form.comment(station);
        } else {
            console.log(this._$auth);
            this._$auth.toggleClass('li-hovered');
        }

    }

}
