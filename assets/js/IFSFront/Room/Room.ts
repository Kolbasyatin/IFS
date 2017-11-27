import {JComment} from "../Comment/JComment";
import {CommentContainer} from "../Comment/CommentContainer";
import {CommentContainerInterface} from "../Comment/CommentContainerInterface";

export class Room {
    public static readonly levels: {[index:string]: number} = {
        squad: 0,
        newsMaker: 1
    };
    private readonly _id: string;
    private _isRoomDefault: boolean = false;
    private _sourceUrl: string;
    private _JComments: JComment[] = [];
    private _JContainer: JQuery;
    // private _newJComments: JComment[] = [];
    // private _commentAccessLevel: number;
    // private _commentContainer: CommentContainer;
    private _commentsContainer: CommentContainerInterface;

    //TODO: Проработать внимательно уровни доступа.
    constructor(id: string, sourceUrl: string, commentAccessLevel: string = 'squad') {
        this._id = id;
        this._sourceUrl = sourceUrl;
        this._JContainer = $("<div />").attr('id', 'room_container'+this._id);
        // this._commentContainer = new CommentContainer();
        // this._commentAccessLevel = Room.levels[commentAccessLevel];
        // this._commentsContainer = new ScrollBarCommentContainer();
        this._commentsContainer = new CommentContainer();
    }

    public getId(): string {
        return this._id;
    }

    public getSourceUrl(): string {
        return this._sourceUrl;
    }

    public setRoomDefault(): void {
        this._isRoomDefault = true;
    }

    public isDefault(): boolean {
        return this._isRoomDefault;
    }

    public addComment(jComment: JComment): void  {
        this._JComments.push(jComment);
        this._JContainer.append(jComment.getJHTML());

    }

    public getJContainer(): JQuery {
        return this._JContainer;
    }


    public addNewComment(jComment: JComment): void {
        this._JComments.unshift(jComment);
        this._newJComments.unshift(jComment);
    }
    //
    public getAllJComments(): JComment[] {
        return this._JComments;
    }

    public getNewComments(): JComment[] {
        const comments = this._newJComments;
        this.resetNewComments();

        return comments;
    }

    private resetNewComments(): void {
        this._newJComments = [];
    }

    public getLastComment(): JComment {
        return this._JComments[this._JComments.length - 1];
    }

    public showAllComments(): void {
        for (let comment of this._JComments) {
            comment.show(true);
        }
    }

    public hideAllComments(): void {
        for (let comment of this._JComments) {
            comment.hide();
        }
    }


    //
    // public getId(): string {
    //     return this._id;
    // }
    //
    // public getCommentContainer(): ScrollBarCommentContainer {
    //     return this._commentsContainer;
    // }
    //
    // public setLastCommentPage(): void {
    //     this._lastPage = true;
    // }
    //
    // public isLastCommentPage(): boolean {
    //     return this._lastPage;
    // }
    //
    // public getSourceUrl(): string {
    //     return this._sourceUrl;
    // }
    // /** Update all comments in container */
    // async updateComments(): Promise<void> {
    //     const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: this._source.getCurrentSourceId()});
    //     this.refreshComments(comments);
    // }
    //
    // private async showNextPage(): Promise<void> {
    //     if(!this._source.isLastCommentPage()) {
    //         const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsNewerThanId', {
    //             source: this._source.getCurrentSourceId(),
    //             lastCommentId: this.getLastComment().getCommentId()
    //         });
    //         if(!comments.length) {
    //             this._source.setLastCommentPage();
    //         }
    //         this.addComments(comments);
    //     }
    //
    // }
    //
    //
    //
    // public refreshComments(comments: CommentDataInterface[]): void {
    //
    //     if (!this.isEmptyContainer()) {
    //         this.removeAllComments();
    //     }
    //     this.addComments(comments);
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
    //     for (let data of commentsData) {
    //         let comment: Comment = new Comment(data);
    //         upDirection ? this.addCommentUp(comment): this.addCommentDown(comment);
    //         comments.push(comment);
    //     }
    //     this.showComments(comments);
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
    //     /** Clone comments before show */
    //     show(comments);
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
    //         let jComment: JQuery = comment.getJComment();
    //         this._comments.push(comment);
    //         if ('up' === direction) {
    //             this._$commentContainer.prepend(jComment);
    //         }
    //         if ('down' === direction) {
    //             this._$commentContainer.append(jComment);
    //         }
    //         this.commentContainerUpdate();
    //     } else {
    //         this.updateComment(comment.getData());
    //     }
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
    //     let index: number = this._comments.indexOf(comment);
    //     if (index !== -1) {
    //         this._comments.splice(index, 1);
    //     }
    //     this.commentContainerUpdate();
    // }
    //
    // /**
    //  * Remove add comments
    //  * @return void
    //  */
    // public removeAllComments(): void {
    //     while (this._comments.length) {
    //         let comment = this._comments.pop();
    //         if(comment) {
    //             comment.remove();
    //         }
    //
    //     }
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
    //     if (comment) {
    //         this.removeComment(comment);
    //     }
    // }
    //
    // /**
    //  * Update exists comment
    //  * @param {CommentDataInterface} data
    //  */
    // public updateComment(data: CommentDataInterface): void {
    //     let id: number = data.id;
    //     let commentForUpdate: Comment|null = this.getCommentById(id);
    //
    //     if (commentForUpdate) {
    //         let updateResult: boolean = commentForUpdate.updateJComment(data);
    //         if (updateResult) {
    //             commentForUpdate.hide();
    //             commentForUpdate.show();
    //         }
    //     }
    // }
    //
    //

}