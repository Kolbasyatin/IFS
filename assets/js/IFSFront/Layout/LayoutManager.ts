import {LeftCommentsLayout} from "./LeftCommentsLayout";
import {Mediator} from "../Mediator";
import {Colleague} from "../Colleague";
import {JComment} from "../Comment/JComment";
import {User} from "../User/User";
import {VolumeIndicator} from "../Control/VolumeIndicator";
import {CommentButton} from "./CommentButton";
import {AuthButton} from "./AuthButton";
import 'jquery-tooltip';
import {Timer} from "./Time";
import {Room} from "../Room/Room";

export class LayoutManager extends Colleague {

    private _leftCommentLayout: LeftCommentsLayout;
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

    public roomWasChanged(user: User): void {
        this.updateLeftCommentLayout(user.getCurrentRoom());
        this.hasToShowCommentButton(user);
        // this.updateAnotherELement...
        // this.updateAnotherELement...
    }

    private updateLeftCommentLayout(room: Room): void {
        this.hideCurrentLayout();
        const comments: JComment[] = room.getAllComments();
        this.appendComments(comments, 'up');
        this.showComments(comments);
    }


    private hideCurrentLayout():void {
        this._leftCommentLayout.hide();
    }

    private appendComments(comments: JComment[], direction: string = 'down'): void {
        for (let comment of comments) {
            this._leftCommentLayout.publish(comment.getJHTML(), direction);
        }
    }

    private showComments(comments: JComment[]): void {
        const show = (comments: ShowInterface[]): void => {
            setTimeout(() => {
                let comment: ShowInterface | void = comments.pop();
                if (comment) {
                    comment.show(true);
                    show(comments)
                }
            }, 80);
        };

        show(Object.assign([],comments));
    }

    private hasToShowCommentButton(user: User) {
        this._commentButton.hideCommentButton();
        /**TODO: Грязный хак! возможно стоит ввести уровни доступа к элементам интерфейса */
        if (user.isCurrentRoomDefault() && !user.isNewsMaker()) {
            return;
        }
        this._commentButton.showCommentButton();
    }

    public onNewCommentsEvent(comments: JComment[]): void {
        this.appendComments(comments, 'up');
        this.showComments(comments);
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