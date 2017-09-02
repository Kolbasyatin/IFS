import {Application} from "./Application";
import {VKWidget} from "./Widgets/VKWidget";
import * as autobahn from "autobahn";

//
let application = new Application();
application.start();
//
let vk = new VKWidget();
vk.start();

let WS: WS = require("gos-ws");

let websocket = WS.connect("ws://127.0.0.1/stat");

websocket.on("socket/connect", function (session: ABSession) {
    console.log('Sucessfully Connected!');
    session.subscribe('acme/channel', (uri: string, payload: object) => {
        console.log(uri, payload);
    });

    // session.publish(topic, event, exclude, eligible);

    session.unsubscribe('acme/channel', () => {
        console.log('unsubscribed');
    });


});

websocket.on("socket/disconnect", function (error: autobahn.ICloseEventDetails) {
    console.log("Disconnected for " + error.reason + " with code " + error.code);
});


