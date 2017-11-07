import {JComment} from "../Comment/JComment";
import {CommentContainer} from "../Comment/CommentContainer";

export class Room {
    public static readonly levels: {[index:string]: number} = {
        squad: 0,
        newsMaker: 1
    };
    private readonly _id: string;
    private _isRoomDefault: boolean = false;
    private _sourceUrl: string;
    private _JComments: JComment[] = [];
    private _newJComments: JComment[] = [];
    private _commentAccessLevel: number;
    private _commentContainer: CommentContainer;
    // private _commentsContainer: ScrollBarCommentContainer;
    // private _lastPage: boolean = false;
    // private _users: any; //Сюда закидывать пользователей авторизованных ?
    // private _song: any;
    // private _listeners: any;
    // private _playlist: any;
    //

    //TODO: Проработать внимательно уровни доступа.
    constructor(id: string, sourceUrl: string, commentAccessLevel: string = 'squad') {
        this._id = id;
        this._sourceUrl = sourceUrl;
        this._commentContainer = new CommentContainer();
        this._commentAccessLevel = Room.levels[commentAccessLevel];
        // this._commentsContainer = new ScrollBarCommentContainer();
    }

    public getId(): string {
        return this._id;
    }

    public addComment(jComment: JComment): void  {
        this._JComments.unshift(jComment);

    }

    public addNewComment(jComment: JComment): void {
        this._newJComments.push(jComment);
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
    //
    public getAllComments(): JComment[] {
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

}