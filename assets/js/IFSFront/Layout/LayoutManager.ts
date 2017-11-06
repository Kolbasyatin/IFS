import {LeftCommentsLayout} from "./LeftCommentsLayout";
import {Mediator} from "../Mediator";
import {Colleague} from "../Colleague";
import {CommentJWrapper} from "../Comment/CommentJWrapper";
import {User} from "../User/User";
import {VolumeIndicator} from "../Control/VolumeIndicator";
import {CommentButton} from "./CommentButton";
import {AuthButton} from "./AuthButton";
import 'jquery-tooltip';
import {Timer} from "./Time";

export class LayoutManager extends Colleague {

    private _leftCommentLayout: LayoutPublishInterface;
    private _volumeIndicator: VolumeIndicator;
    private _commentButton: CommentButton;
    private _authButton: AuthButton;
    private _timer: Timer;

    constructor(mediator: Mediator) {
        super(mediator);
        this._leftCommentLayout =  new LeftCommentsLayout($("#comments"));
        this._volumeIndicator = new VolumeIndicator($('#volume_indicator'));
        this._commentButton = new CommentButton(mediator);
        this._authButton = new AuthButton($('ul.auth-ul li'));
        this._timer = new Timer($('#curtime'), 1000);
        this.createEffects();
    }

    public updateLayoutWhenRoomChange(user: User): void {
        this.updateLeftCommentLayout(user);
        this.updateCommentButton(user);
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

    private updateCommentButton(user: User) {
        this._commentButton.hideCommentButton();
        /**TODO: Грязный хак! возможно стоит ввести уровни доступа к элементам интерфейса */
        if (user.isCurrentRoomDefault() && !user.isNewsMaker()) {
            return;
        }
        this._commentButton.showCommentButton();
    }

    public changeVolumeIndicator(value: number): void {
        this._volumeIndicator.setValue(value);
    }

    public blinkAuthButton(): void {
        this._authButton.blink();
    }

    private createEffects(): void {
        $(document).tooltip({
            track: false
        });
    }

    public startTimer(): void {
        this._timer.start();
    }



}