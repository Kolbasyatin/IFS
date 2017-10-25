import * as Mustache from "mustache";
import * as moment from "moment";

export class CommentHTML {
    private _template: string;
    private _data: CommentDataInterface;
    // private _effectOptions: object = {
    //     effect: 'slide',
    //     easing: 'easeOutBounce',
    //     duration: 650
    // };

    constructor(data: CommentDataInterface, template?: string) {
        this._data = data;
        if(template) {
            this._template = template
        } else {
            this._template = `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{timeToShow}}</span>
        </div>`;
        }

        // this._$jHTML = $(this.renderHtml());
    }

    public getHTML(): string {
        return this.renderHtml();
    }






    public updateJComment(data: CommentDataInterface): void {
        // if (this._data !== data) {
        //     this._data = data;
        //     let oldJComment: JQuery = this._$jHTML;
        //     let newJComment: JQuery = $(this.renderHtml());
        //     oldJComment.replaceWith(newJComment);
        //     this._$jHTML = newJComment;
        //
        //     return true;
        // }
        //
        // return false;
    }

    private renderHtml(): string {
        if (!this._data) {
            throw new Error("There is no data to render");
        }
        this._data.timeToShow = moment.unix(this._data.dateTime).locale('ru')./*add(settings.timeShift, 'year').*/format('lll');
        return Mustache.render(this._template, this._data);
    }


    // public hideHtml(): void {
    //     this._$jHTML.hide();
    // }
    //
    // public getJComment(): JQuery {
    //     return this._$jHTML;
    //
    // }
    //
    // public removeHtml(): void {
    //     this._$jHTML.fadeOut('easing').remove();
    // }
    //
    // public getData(): CommentDataInterface {
    //     return this._data;
    // }
    //
    // public getCommentId(): number {
    //     return this._data.id;
    // }
    //
    // public showHtml(): void {
    //     this._$jHTML.show(this._effectOptions);
    // }
    //
    // public refreshHtml(): void {
    //     this.hideHtml();
    //     this.showHtml();
    // }

}