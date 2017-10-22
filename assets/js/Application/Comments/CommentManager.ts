import {Comment} from "./Comment";
import {WAMP} from "../WebSocket/WAMP";
import {User} from "../User/User";
import {ScrollBarCommentContainer} from "../Container/CommentContainer";

export class CommentManager implements OnDeleteCommentInterface, OnNewCommentInterface, OnUpdateCommentInterface {

    private _user: User;
    private _wamp: WAMP;

    constructor(user: User, $container: JQuery, wamp: WAMP) {
        if (!$container.length) {
            throw new Error("There is no container for CommentManager")
        }
        this._user = user;
        this._wamp = wamp;
        this._wamp.onNewCommentAttach(this);
        this._wamp.onUpdateCommentAttach(this);
        this._wamp.onDeleteCommentAttach(this);
        /*this._user.getCurrentCommentsContainer().addOnNetxPageCallBack(() => this.showNextPage());*/
    }

    /** Update all comments in container */
    async showFirstCommentPage(): Promise<void> {
        const sourceId: string = this._user.getCurrentRoomId();
        const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsFirstPageBySource', {source: sourceId});
        this.refreshComments(comments);
    }

    public refreshComments(comments: CommentDataInterface[]): void {

        // if (!this.isEmptyContainer()) {
        //     this.removeAllComments();
        // }
        this.addComments(comments);

    }

    public isEmptyContainer(): boolean {
        let comments = this._user.getCurrentRoomComments();
        return !Boolean(comments.length);
    }

    public removeAllComments(): void {
        let comments: Comment[] = this._user.getCurrentRoomComments();
        while (comments.length) {
            let comment: Comment | void = comments.pop();
            if (comment) {
                comment.removeHtml();
            }
        }
    }

    public addComments(commentsData: CommentDataInterface[], upDirection: boolean = false): void {
        let comments: Comment[] = [];
        for (let data of commentsData) {
            let comment: Comment = new Comment(data);
            upDirection ? this.addCommentUp(comment) : this.addCommentDown(comment);
            comments.push(comment);
        }
        this.showCommentsHtml(comments);
    }

    private async showNextPage(): Promise<void> {
        if (!this._user.isLastPageCommentsInCurrentRoom()) {
            const comments: CommentDataInterface[] = await this._wamp.commentatorCall('getCommentsNewerThanId', {
                source: this._user.getCurrentRoomId(),
                lastCommentId: this.getLastComment().getCommentId()
            });
            if (!comments.length) {
                this._user.setLastPageCommentsInCurrentRoom();
            }
            this.addComments(comments);
        }

    }

    private getLastComment(): Comment {
        const comments: Comment[] = this._user.getCurrentRoomComments();

        return comments[comments.length - 1];
    }

    private showCommentsHtml(comments: Comment[]): void {
        const show = (comments: Comment[]): void => {
            setTimeout(() => {
                let comment: Comment | void = comments.pop();
                if (comment) {
                    comment.showHtml();
                    show(comments)
                }
            }, 80);
        };
        /** Clone comments before show */
        show(comments);
    }

    private appendComment(comment: Comment, direction: string): void {
        let comments: Comment[] = this._user.getCurrentRoomComments();
        const container: ScrollBarCommentContainer = this._user.getCurrentCommentsContainer();
        if (!CommentManager.isCommentExistsInList(comment, comments)) {
            comments.push(comment);
            container.appendComment(comment, direction);
            container.update();
        } else {
            this.updateComment(comment.getData());
        }
    }

    private static isCommentExistsInList(comment: Comment, commentList: Comment[]): boolean {
        let index: number = commentList.indexOf(comment);
        return index !== -1;
    }

    public addCommentUp(comment: Comment): void {
        this.appendComment(comment, 'up');
    }

    public addCommentDown(comment: Comment): void {
        this.appendComment(comment, 'down');
    }

    /** перезагрузить метод пустым если нужно будет без скролл плагина и чутка поменять конструктор ? */
    private commentContainerUpdate(): void {
        this._user.getCurrentCommentsContainer().update();
    }


    public removeComment(comment: Comment): void {
        let comments: Comment[] = this._user.getCurrentRoomComments();
        comment.removeHtml();
        let index: number = comments.indexOf(comment);
        if (index !== -1) {
            comments.splice(index, 1);
        }
        this.commentContainerUpdate();
    }

    public getCommentById(id: number): Comment | null {
        for (let comment of this._user.getCurrentRoomComments()) {
            if (comment.getData().id === id) {
                return comment;
            }
        }

        return null;
    }

    public newComments(commentsData: CommentDataInterface[]) {
        const currentSource = this._user.getCurrentRoomId();
        let data: CommentDataInterface[] = commentsData.filter(data => data.sourceId === currentSource);
        this.addComments(data, true)
    }

    public removeCommentById(id: number): void {
        let comment: Comment | null = this.getCommentById(id);
        if (comment) {
            this.removeComment(comment);
        }
    }

    public updateComment(data: CommentDataInterface): void {
        let id: number = data.id;
        let commentForUpdate: Comment | null = this.getCommentById(id);

        if (commentForUpdate) {
            let updateResult: boolean = commentForUpdate.updateJComment(data);
            if (updateResult) {
                commentForUpdate.refreshHtml()
            }
        }
    }

}