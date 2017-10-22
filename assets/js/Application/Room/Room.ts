import {Comment} from "../Comments/Comment";
import {ScrollBarCommentContainer} from "../Container/CommentContainer";

export class Room {
    private readonly _id: string;
    private _comments: Comment[] = [];
    private _commentsContainer: ScrollBarCommentContainer;
    private _lastPage: boolean = false;
    private _sourceUrl: string;
    private _users: any; //Сюда закидывать пользователей авторизованных ?
    private _song: any;
    private _listeners: any;
    private _playlist: any;

    constructor(id: string, sourceUrl: string) {
        this._id = id;
        this._commentsContainer = new ScrollBarCommentContainer();
        this._sourceUrl = sourceUrl;
    }

    public getComments(): Comment[] {
        return this._comments;
    }

    public getId(): string {
        return this._id;
    }

    public getCommentContainer(): ScrollBarCommentContainer {
        return this._commentsContainer;
    }

    public setLastCommentPage(): void {
        this._lastPage = true;
    }

    public isLastCommentPage(): boolean {
        return this._lastPage;
    }

    public getSourceUrl(): string {
        return this._sourceUrl;
    }

}