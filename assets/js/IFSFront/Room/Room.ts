export class Room {
    public static readonly levels: {[index:string]: number} = {
        squad: 0,
        newsMaker: 1
    };
    private readonly _id: string;
    private _isRoomDefault: boolean = false;
    private _sourceUrl: string;
    private _rawComments: CommentDataInterface[] = [];
    private _JComments: JQuery[];
    private _commentAccessLevel: number;
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
        this._commentAccessLevel = Room.levels[commentAccessLevel];
        // this._commentsContainer = new ScrollBarCommentContainer();
    }

    public getId(): string {
        return this._id;
    }

    public addRawComments(comments: CommentDataInterface[]): void {
        this._rawComments = this._rawComments.concat(comments);
    }
    public addRawComment(comment: CommentDataInterface): void  {
        this._rawComments.unshift(comment);
    }

    public getRawComments(): CommentDataInterface[] {
        return this._rawComments;
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
    // public getComments(): Comment[] {
    //     return this._comments;
    // }
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