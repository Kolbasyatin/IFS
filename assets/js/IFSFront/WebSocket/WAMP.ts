import * as autobahn from "autobahn";
import {Colleague} from "../Colleague";
import {Mediator} from "../Mediator";

export class WAMP extends Colleague {

    private _isConnected: boolean;
    private _session: ABSession;

    constructor(mediator: Mediator) {
        super(mediator);
    }

    public connect(): void {
        let WS: WS = require("gos-ws");
        const location = window.location.hostname;
        let webSocket = WS.connect(`ws://${location}/stat`);
        webSocket.on("socket/connect", session => this.onConnect(session));
        webSocket.on("socket/disconnect", error => this.onDisconnect(error));
    }

    private onConnect(session: ABSession): void {
        this._isConnected = true;
        this._session = session;
        this.bindSessionHandlers(session);
        this._mediator.startApplication();
    }

    private bindSessionHandlers(session: ABSession): void {
        session
            .subscribe('comment', (uri, payload: any) => {
                switch (payload.action) {
                    case 'newComment':
                        const newComments: CommentDataInterface[] = JSON.parse(payload.data);
                        this._mediator.onNewComment(newComments);
                        break;
                    case 'updateComment':
                        const updatedComments: CommentDataInterface[] = JSON.parse(payload.data);
                        this._mediator.onUpdateComment(updatedComments);
                        break;
                    case 'deleteComment':
                        const deletedCommentId: number = JSON.parse(payload.data);
                        this._mediator.onDeleteComment(deletedCommentId);
                        break;
                }
            });

    }

    public async commentatorCall(procedure: string, args: object = {}): Promise<string> {
        return this._session.call(`commentator/${procedure}`, args);
    }

    private onDisconnect(error: autobahn.ICloseEventDetails): void {
        this._isConnected = false;
        console.log(error);
        this._mediator.stopApplication();
    }

}
