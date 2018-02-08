import {CommentForm} from "./CommentForm";
import {User} from "../User/User";

export class Commentator {
    private _$form: CommentForm;
    private _$comm_button: JQuery;
    private _$auth: JQuery = $("ul.auth-ul li");
    private _user: User;

    constructor(user: User) {
        this._$form = new CommentForm();
        this._$comm_button = $("#comment_add");
        this._user = user;
        this.init();
    }

    private init(): void {
        this.toggleCommentButton(false);
        this.bindHandlers()
    }
    private bindHandlers(): void {
        this._$auth.on('click', event => {
            $(event.target).addClass('loader');
        });
    }
    private showCommentButton():void {
        this._$comm_button.fadeIn('easing')
    }

    private hideCommentButton(): void {
        this._$comm_button.fadeOut('easing');
    }

    public toggleCommentButton(status: boolean): void {
        if(this._user.isNewsMaker()) {
            this._$comm_button.not(':visible') ? this.showCommentButton(): '';
            return;
        }
        status ? this.showCommentButton() : this.hideCommentButton();
    }
    public getCommentButton(): JQuery {
        return this._$comm_button;
    }
    public doComment(station: string): void {
        if (this._user.isAuthenticated()) {
            this._$form.comment(station);
        } else {
            this._$auth.toggleClass('li-hovered');
        }

    }

}
