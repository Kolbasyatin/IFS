import {JComment} from "../Comment/JComment";

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
    private _listeners: number;

    constructor(id: string, sourceUrl: string) {
        this._id = id;
        this._sourceUrl = sourceUrl;
        this._JContainer = $("<div />").attr('id', 'room_container'+this._id);
        this._listeners = 0;
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

    public addNewComment(jComment: JComment): void {
        this._JComments.unshift(jComment);
        this._JContainer.prepend(jComment.getJHTML());
    }

    public getJContainer(): JQuery {
        return this._JContainer;
    }

    public showAllComments(isEffect: boolean = false): void {
        let count: number = 0;
        (async () => {
            for (let comment of this._JComments) {
                if (comment.isHidden()) {
                    if (isEffect) {
                        await this.createPause(Math.max(85 - count * 2, 0));
                    }
                    comment.show(isEffect);
                    count++;
                }
            }
        })();
    }

    public async hideAllComments(): Promise<void> {
        let count: number = 0;
        for (let comment of this._JComments) {
            let pauseLength: number = Math.max(25 - count, 0);
            await this.createPause(pauseLength);
            comment.hide();
            count++;
        }
    }

    private createPause(time: number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time)
        });
    }

    public getLastComment(): JComment {
        return this._JComments[this._JComments.length - 1];
    }

    public setListeners(listeners: number): void {
        this._listeners = listeners;
    }

    public getLisneters(): number {
        return this._listeners;
    }

}