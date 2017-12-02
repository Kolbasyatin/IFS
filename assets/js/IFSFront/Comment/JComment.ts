import * as Mustache from "mustache";
import * as moment from "moment";
import 'jquery-easing';
import {User} from "../User/User";


export class JComment implements ShowInterface {

    private _templates: {[id: string]: string} = {
        admin: `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{timeToShow}}</span>
        <span>Admin!</span>
        </div>`,
        user: `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{timeToShow}}</span>
        </div>`
    };
    private _templateName: string = 'user';

    private _data: CommentDataInterface;
    private _$jHTML: JQuery;
    private _effectOptions: JQueryUI.EffectOptions = {
        effect: 'slide',
        easing: 'easeOutBounce',
        duration: 650,
        complete: () => {
        }
    };

    constructor(data: CommentDataInterface, templateName: string, effect?: JQueryUI.EffectOptions) {
        this._data = data;
        this._templateName = templateName;
        if (effect) {
            this._effectOptions = effect;
        }
        this._$jHTML = $(this.renderHtml(this._templateName));
    }

    private renderHtml(templateName: string): string {
        if (!this._data) {
            throw new Error("There is no data to render");
        }
        this._data.timeToShow = moment.unix(this._data.dateTime).locale('ru')./*add(settings.timeShift, 'year').*/format('lll');

        return Mustache.render(this._templates[templateName], this._data);
    }

    public getJHTML(): JQuery {
        return this._$jHTML;
    }

    public show(applyEffect: boolean = false): void {
        let effect = {};
        if (applyEffect) {
            effect = this._effectOptions;
        }
        this._$jHTML.show(effect);
    }

    public isShown(): boolean {
        return this._$jHTML.is(":visible");
    }

    public hide(): void {
        this._$jHTML.hide(this._effectOptions);
    }

    public getId(): number {
        return this._data.id;
    }

    public updateJComment(data: CommentDataInterface): void {
        if (this._data !== data) {
            this._data = data;
            let oldJComment: JQuery = this._$jHTML;
            let newJComment: JQuery = $(this.renderHtml(this._templateName));
            oldJComment.replaceWith(newJComment);
            this._$jHTML = newJComment;
        }
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
    public getRawData(): CommentDataInterface {
        return this._data;
    }

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


//Старые методы
// /** Update all comments in container */
// async updateComments(): Promise<void> {
//     const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: this._source.getCurrentSourceId()});
// this.refreshComments(comments);
// }
//
// private async showNextPage(): Promise<void> {
//     if(!this._source.isLastCommentPage()) {
//     const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsNewerThanId', {
//         source: this._source.getCurrentSourceId(),
//         lastCommentId: this.getLastComment().getCommentId()
//     });
//     if(!comments.length) {
//         this._source.setLastCommentPage();
//     }
//     this.addComments(comments);
// }
//
// }
//
//
//
// public refreshComments(comments: CommentDataInterface[]): void {
//
//     if (!this.isEmptyContainer()) {
//     this.removeAllComments();
// }
// this.addComments(comments);
//
// }
//
//
// private getFirstComment(): Comment {
//     return this._comments[0];
// }
//
// private getLastComment(): Comment {
//     return this._comments[this._comments.length - 1];
// }
//
//
// public addComments(commentsData: CommentDataInterface[], upDirection: boolean = false): void {
//     let comments:Comment[] = [];
// for (let data of commentsData) {
//     let comment: Comment = new Comment(data);
//     upDirection ? this.addCommentUp(comment): this.addCommentDown(comment);
//     comments.push(comment);
// }
// this.showComments(comments);
// }
//
// private showComments(comments: Comment[]): void {
//     const show = (comments: Comment[]): void => {
//         setTimeout(() => {
//             let comment: Comment|void = comments.pop();
//             if(comment) {
//                 comment.show();
//                 show(comments)
//             }
//         }, 80);
//     };
// /** Clone comments before show */
// show(comments);
// }
//
// /**
//  * Add comment up in list
//  * @param {Comment} comment
//  */
// public addCommentUp(comment: Comment): void {
//     this.addComment(comment, 'up');
// }
//
// /**
//  * Add comment down in list
//  * @param {Comment} comment
//  */
// public addCommentDown(comment: Comment): void {
//     this.addComment(comment, 'down');
// }
//
// /**
//  * Private method to add comment in list
//  * @param {Comment} comment
//  * @param {string} direction
//  */
// private addComment(comment: Comment, direction: string): void {
//     if (!this.isCommentExistInList(comment)) {
//     let jComment: JQuery = comment.getJComment();
//     this._comments.push(comment);
//     if ('up' === direction) {
//         this._$commentContainer.prepend(jComment);
//     }
//     if ('down' === direction) {
//         this._$commentContainer.append(jComment);
//     }
//     this.commentContainerUpdate();
// } else {
//     this.updateComment(comment.getData());
// }
// }
//
//
//
// /** перегрузить метод пустым если нужно будет без скролл плагина и чутка поменять конструктор */
// private commentContainerUpdate(): void {
//     this._$mCustomScrollContainer.mCustomScrollbar('update');
// }
//
// /**
//  * Is comment in list
//  * @param {Comment} comment
//  * @returns {boolean}
//  */
// private isCommentExistInList(comment: Comment): boolean {
//     let index: number = this._comments.indexOf(comment);
//     return index !== -1;
// }
//
// /**
//  * Remove comment
//  * @param {Comment} comment
//  * @return void
//  */
// public removeComment(comment: Comment): void {
//     comment.remove();
// let index: number = this._comments.indexOf(comment);
// if (index !== -1) {
//     this._comments.splice(index, 1);
// }
// this.commentContainerUpdate();
// }
//
// /**
//  * Remove add comments
//  * @return void
//  */
// public removeAllComments(): void {
//     while (this._comments.length) {
//     let comment = this._comments.pop();
//     if(comment) {
//         comment.remove();
//     }
//
// }
// }
//
// /**
//  * Get Comment by ID
//  * @param {number} id
//  * @return {Comment}
//  */
// public getCommentById(id: number): Comment|null {
//     for (let comment of this._comments) {
//         if (comment.getData().id === id) {
//             return comment;
//         }
//     }
//
//     return null;
// }
//
// /**
//  * Check is container is empty
//  * @return {boolean}
//  */
// public isEmptyContainer(): boolean {
//     return ! Boolean(this._comments.length);
// }
//
//
// public newComments(commentsData: CommentDataInterface[]) {
//     const currentSource = this._source.getCurrentSourceId();
//     let data: CommentDataInterface[] = commentsData.filter(data => data.sourceId === currentSource);
//     this.addComments(data, true)
// }
//
// /**
//  * Remove comment by ID
//  * @param {number} id
//  */
// public removeCommentById(id: number): void {
//     let comment: Comment|null = this.getCommentById(id);
// if (comment) {
//     this.removeComment(comment);
// }
// }
//
// /**
//  * Update exists comment
//  * @param {CommentDataInterface} data
//  */
// public updateComment(data: CommentDataInterface): void {
//     let id: number = data.id;
// let commentForUpdate: Comment|null = this.getCommentById(id);
//
// if (commentForUpdate) {
//     let updateResult: boolean = commentForUpdate.updateJComment(data);
//     if (updateResult) {
//         commentForUpdate.hide();
//         commentForUpdate.show();
//     }
// }
// }
//
