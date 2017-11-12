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
        let webSocket = WS.connect("ws://localhost/stat");
        webSocket.on("socket/connect", session => this.onConnect(session));
        webSocket.on("socket/disconnect", error => this.onDisconnect(error));
    }

    private onConnect(session: ABSession): void {
        this._isConnected = true;
        this._session = session;
        this.bindSessionHandlers(session);
        this._mediator.startApplication();
    }

    //Стоит ли заводить отдельный топик под отдельный action с комментариями?
    private bindSessionHandlers(session: ABSession): void {
        session.subscribe('comment', (uri, payload: any) => {
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
        })
    }

    private onDisconnect(error: autobahn.ICloseEventDetails): void {
        this._isConnected = false;
        console.log(error);
        this._mediator.stopApplication();
    }

    public async commentatorCall(procedure: string, args: object = {}): Promise<CommentDataInterface[]> {
        // await this.waitForSession();
        let json;
        try {
            json = await this._session.call(`commentator/${procedure}`, args);
        }
        catch (err) {
            console.log(err);
        }

        return JSON.parse(json);
    }

    private waitForSession(): Promise<void> {
        return new Promise(resolve => {
            let interval = setInterval(() => {
                if (this._isConnected && this._session) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        })
    }

}


// public onNewCommentAttach(observer: OnNewCommentInterface) {
//     this._onNewCommentObservers.push(observer);
// }
//
// public onDeleteCommentAttach(observer: OnDeleteCommentInterface) {
//     this._onDeleteCommentObservers.push(observer);
// }
//
// public onUpdateCommentAttach(observer: OnUpdateCommentInterface) {
//     this._onUpdateCommentObservers.push(observer);
// }


// websocket.on("socket/connect", function (session: ABSession) {
//     //Let's do something
//     session.subscribe('herald/', function (uri: string, payload: object) {
//         console.log(uri, payload);
//     });
//     session.subscribe('source', function (uri: string, payload: object) {
//         console.log(uri, payload);
//     });
//     session.subscribe('comment', function (uri: string, payload: object) {
//         console.log(uri, payload);
//     });
//
//     session.publish("herald/", "This is a message");
//
//     // session.unsubscribe('herald/',function () {
//     //     console.log('asdf');
//     // });
//
//
//     // RPC
//     session.call("commentator/comment", {"term1": 2, "term2": 5}).then(
//         function (result: any) {
//             console.log("RPC Valid!", result);
//         },
//         function (error: any, desc: any) {
//             console.log("RPC Error", error, desc);
//         }
//     );
//
// });
//
// websocket.on("socket/disconnect", function (error: autobahn.ICloseEventDetails) {
//     console.log("Disconnected for " + error.reason + " with code " + error.code);
// });
