import {LeftCommentsLayout} from "./LeftCommentsLayout";
import {Mediator} from "../Mediator";
import {Colleague} from "../Colleague";
import {User} from "../User/User";
import {VolumeIndicator} from "../Control/VolumeIndicator";
import {CommentButton} from "./CommentButton";
import {AuthButton} from "./AuthButton";
import 'jquery-tooltip';
import {Timer} from "./Time";
import {Room} from "../Room/Room";
import {VKWidget} from "../Widgets/VKWidget";

export class LayoutManager extends Colleague {

    private _leftCommentLayout: LeftCommentsLayout;
    private _volumeIndicator: VolumeIndicator;
    private _commentButton: CommentButton;
    private _authButton: AuthButton;
    private _timer: Timer;
    private _widget: VKWidget;

    constructor(mediator: Mediator) {
        super(mediator);
        this._leftCommentLayout =  new LeftCommentsLayout($("#comments"), this.nextPageCallBack());
        this._volumeIndicator = new VolumeIndicator($('#volume_indicator'));
        this._commentButton = new CommentButton(mediator);
        this._authButton = new AuthButton($('ul.auth-ul li'));
        this._timer = new Timer($('#curtime'), 1000);
        this._widget = new VKWidget($("#widgets"));
        this.createEffects();
    }

    public onApplicationInit(): void {
        this._timer.start();
        this._widget.start();
    }
    /** Room Was Changed */
    public roomWasChanged(user: User): void {
        this._leftCommentLayout.roomWasChanged(user);
        this.hasToShowCommentButton(user);
    }

    public onNewCommentsEvent(user: User): void {
        this._leftCommentLayout.onNewComment(user);
    }

    public onNextPageEvent(user: User): void {
        this._leftCommentLayout.onNextPageEvent(user);
    }

    private hasToShowCommentButton(user: User) {
        this._commentButton.hideCommentButton();
        const currentRoom: Room = user.getCurrentRoom();
        /**TODO: Грязный хак! возможно стоит ввести уровни доступа к элементам интерфейса */
        if (currentRoom.isDefault() && !user.isNewsMaker()) {
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

    public nextPageCallBack()  {
        return () => {
            this._mediator.onNextPageComment();
        }
    }
}