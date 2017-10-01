import {CommentDataInterface} from "./CommentDataInterface";
import {Comment} from "./Comment";
import {WAMP} from "../WebSocket/WAMP";
import {Source} from "../Source";

require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');

export class CommentManager {
    private _cSBOptions: MCustomScrollbar.CustomScrollbarOptions = {
        theme: 'dark-thin',
        callbacks: {
            onTotalScroll: (): void => this.showNextPage()
        }
    };
    private _effectOptions: object = {
        effect: 'slide',
        easing: 'easeOutCirc',
        duration: 150
    };
    private _comments: Comment[] = [];
    private _$commentContainer: JQuery;
    private _$mCustomScrollContainer: JQuery;
    private _wamp: WAMP;
    private _source: Source;

    constructor($container: JQuery, wamp: WAMP, source: Source) {
        if(!$container.length) {
            throw new Error("There is no container for CommentManager")
        }
        this._$mCustomScrollContainer = $container.mCustomScrollbar(this._cSBOptions);
        this._$commentContainer = this._$mCustomScrollContainer.find("#mCSB_1_container");
        this._wamp = wamp;
        this._source = source;
    }

    /** Update all comments in container */
    async updateComments(): Promise<void> {
        const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: this._source.getCurrentSourceId()});
        this.refreshComments(comments);
    }

    /**
     * Update exists comment
     * @param {CommentDataInterface} data
     */
    public updateComment(data: CommentDataInterface): void {
        let id: number = data.id;
        let commentForUpdate: Comment|null = this.getCommentById(id);

        if (commentForUpdate) {
            let updateResult: boolean = commentForUpdate.updateJComment(data);
            if (updateResult) {
                commentForUpdate.hide();
                commentForUpdate.show();
            }
        }
    }


    public refreshComments(comments: CommentDataInterface[]): void {

        if (!this.isEmptyContainer()) {
            this.removeAllComments();
        }

        this.addComments(comments);
        console.log(comments);

    }

    private showNextPage(): void {
        console.log(this.getLastComment().getCommentId());
    }

    private getFirstComment(): Comment {
        return this._comments[0];
    }

    private getLastComment(): Comment {
        return this._comments[this._comments.length - 1];
    }

    /**
     * Add several comments from array of comments data
     * @param {CommentDataInterface[]} comments
     */
    public addComments(comments: CommentDataInterface[]): void {
        for (let data of comments) {
            let comment: Comment = new Comment(data);
            this.addCommentDown(comment);
        }
    }

    /**
     * Add comment up in list
     * @param {Comment} comment
     */
    public addCommentUp(comment: Comment): void {
        this.addComment(comment, 'up');
    }

    /**
     * Add comment down in list
     * @param {Comment} comment
     */
    public addCommentDown(comment: Comment): void {
        this.addComment(comment, 'down');
    }

    /**
     * Private method to add comment in list
     * @param {Comment} comment
     * @param {string} direction
     */
    private addComment(comment: Comment, direction: string): void {
        if (!this.isCommentExistInList(comment)) {
            let jComment = comment.getJComment();
            this._comments.push(comment);
            if ('up' === direction) {
                this._$commentContainer.prepend(jComment);
            }
            if ('down' === direction) {
                this._$commentContainer.append(jComment);
            }
            this.commentContainerUpdate();
        } else {
            this.updateComment(comment.getData());
        }
    }



    /** перегрузить метод пустым если нужно будет без скролл плагина и чутка поменять конструктор */
    private commentContainerUpdate(): void {
        this._$mCustomScrollContainer.mCustomScrollbar('update');
    }

    /**
     * Is comment in list
     * @param {Comment} comment
     * @returns {boolean}
     */
    private isCommentExistInList(comment: Comment): boolean {
        let index: number = this._comments.indexOf(comment);
        return index !== -1;
    }

    /**
     * Remove comment by ID
     * @param {number} id
     */
    public removeCommentById(id: number): void {
        let comment: Comment|null = this.getCommentById(id);
        if (comment) {
            this.removeComment(comment);
        }
    }

    /**
     * Remove comment
     * @param {Comment} comment
     * @return void
     */
    public removeComment(comment: Comment): void {
        comment.remove();
        let index: number = this._comments.indexOf(comment);
        if (index !== -1) {
            this._comments.splice(index, 1);
        }
        this.commentContainerUpdate();
    }

    /**
     * Remove add comments
     * @return void
     */
    public removeAllComments(): void {
        while (this._comments.length) {
            let comment = this._comments.pop();
            if(comment) {
                comment.remove();
            }

        }
    }

    /**
     * Get Comment by ID
     * @param {number} id
     * @return {Comment}
     */
    public getCommentById(id: number): Comment|null {
        for (let comment of this._comments) {
            if (comment.getData().id === id) {
                return comment;
            }
        }

        return null;
    }

    /**
     * Check is container is empty
     * @return {boolean}
     */
    public isEmptyContainer(): boolean {
        return ! Boolean(this._comments.length);
    }


}