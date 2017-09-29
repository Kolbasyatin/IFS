import * as autobahn from "autobahn";
import {CommentDataInterface} from "../Comments/CommentDataInterface";

export class WAMP {
    private _isConnected: boolean;
    private _session: ABSession;
    constructor() {
        let WS: WS = require("gos-ws");
        let webSocket = WS.connect("ws://localhost/stat");
        webSocket.on("socket/connect", session => this.onConnect(session));
        webSocket.on("socket/disconnect", error => this.onDisconnect(error));
    }

    private onConnect(session: ABSession): void {
        this._isConnected = true;
        this._session = session;
    }

    private onDisconnect(error: autobahn.ICloseEventDetails): void {
        this._isConnected = false;
        console.log(`Disconnected! ${error}`);
    }

    public async commentatorCall(procedure: string, args: object = {}): Promise<CommentDataInterface[]> {
        await this.waitForSession();
        const json = await this._session.call(`commentator/${procedure}`, args);

        return JSON.parse(json);;


    }

    private waitForSession(): Promise<void> {
        return new Promise (resolve => {
            let interval = setInterval(() => {
                if(this._isConnected && this._session) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        })
    }

}





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
