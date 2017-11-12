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
//TODO: Надо рефакторить. Отрисовка комментариев не прозрачная. Нужен новый нормальный механизм.
export class LayoutManager extends Colleague {

    private _leftCommentLayout: LeftCommentsLayout;
    private _volumeIndicator: VolumeIndicator;
    private _commentButton: CommentButton;
    private _authButton: AuthButton;
    private _timer: Timer;

    constructor(mediator: Mediator) {
        super(mediator);
        this._leftCommentLayout =  new LeftCommentsLayout($("#comments"), this.nextPageCallBack());
        this._volumeIndicator = new VolumeIndicator($('#volume_indicator'));
        this._commentButton = new CommentButton(mediator);
        this._authButton = new AuthButton($('ul.auth-ul li'));
        this._timer = new Timer($('#curtime'), 1000);
        this.createEffects();
    }

    public roomWasChanged(user: User): void {
        this.refreshLeftCommentLayout(user);
        this.hasToShowCommentButton(user);
        // this.updateAnotherELement...
        // this.updateAnotherELement...
    }

    private refreshLeftCommentLayout(user: User): void {
        this.hideCurrentLayout(user);
        const currentComments: JComment[] = user.getCurrentRoom().getAllComments();
        this.appendAndShowJComments(currentComments);
    }

    public appendAndShowJComments(jComments: JComment[]): void {
        this.appendCommentsToLayout(jComments);
        this.showComments(jComments);
    }


    private hideCurrentLayout(user: User):void {
        const previousRoom: Room = user.getPreviousRoom();
        if (previousRoom) {
            const oldComments = previousRoom.getAllComments();
            this._leftCommentLayout.hide(oldComments);
        }
    }

    //TODO: По хорошему этот метод надо объединять с updateCommentLayout
    public onNewCommentsEvent(comments: JComment[]): void {
        this.appendCommentsToLayout(comments, 'up');
        this.showComments(comments);
    }

    private appendCommentsToLayout(comments: JComment[], direction: string = 'down'): void {
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
                    show(comments);
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

    public nextPageCallBack()  {
        return () => {
            this._mediator.onNextPageComment();
        }
    }
}