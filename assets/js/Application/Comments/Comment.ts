import {CommentDataInterface} from "./CommentDataInterface";
import * as Mustache from "mustache";

export class Comment {
    private _template: string = `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{dateTime}}</span>
        </div>`;
    // private _template: string = "<div class=\"comment\" id=\"commentid{{id}}\" >" +
    //     "<p>{{username}}</p>" +
    //     "<span>{{message}}</span>" +
    //     "<span class=\"datetime\">{{dateTime}}</span>" +
    //     "</div>";
    private _data: CommentDataInterface;
    private _$jComment: JQuery;

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
        if(!this._data) {
            throw new Error("There is no data to render");
        }
        return Mustache.render(this._template, this._data);
    }

    public show(): void {
        this._$jComment.fadeIn('easing');
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

}