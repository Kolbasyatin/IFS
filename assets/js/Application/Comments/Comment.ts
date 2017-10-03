import * as Mustache from "mustache";
import * as moment from "moment";
import settings from "../settings";

export class Comment {
    private _template: string = `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{timeToShow}}</span>
        </div>`;
    // private _template: string = "<div class=\"comment\" id=\"commentid{{id}}\" >" +
    //     "<p>{{username}}</p>" +
    //     "<span>{{message}}</span>" +
    //     "<span class=\"datetime\">{{dateTime}}</span>" +
    //     "</div>";
    private _data: CommentDataInterface;
    private _$jComment: JQuery;
    private _effectOptions: object = {
        effect: 'slide',
        easing: 'easeOutBounce',
        duration: 650
    };

    constructor(data: CommentDataInterface) {
        this._data = data;
        this._$jComment = $(this.renderHtml());
    }

    public updateJComment(data: CommentDataInterface): boolean {
        if (this._data !== data) {
            this._data = data;
            let oldJComment: JQuery = this._$jComment;
            let newJComment: JQuery = $(this.renderHtml());
            oldJComment.replaceWith(newJComment);
            this._$jComment = newJComment;

            return true;
        }

        return false;
    }

    private renderHtml(): string {
        if (!this._data) {
            throw new Error("There is no data to render");
        }
        this._data.timeToShow = moment.unix(this._data.dateTime).locale('ru').add(settings.timeShift, 'year').format('lll');
        return Mustache.render(this._template, this._data);
    }


    public hide(): void {
        this._$jComment.hide();
    }

    public getJComment(): JQuery {
        return this._$jComment;

    }

    public remove(): void {
        this._$jComment.fadeOut('easing').remove();
    }

    public getData(): CommentDataInterface {
        return this._data;
    }

    public getCommentId(): number {
        return this._data.id;
    }

    public show(): void {
        this._$jComment.show(this._effectOptions);
    }

}