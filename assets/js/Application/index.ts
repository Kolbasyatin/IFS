import {Application} from "./Application";
import {VKWidget} from "./Widgets/VKWidget";

//
let application = new Application();
application.start();
//
let vk = new VKWidget();
vk.start();

let WS: WS = require("gos-ws");

let websocket = WS.connect("ws://127.0.0.1/stat");
websocket.on("socket/connect", function (session) {
    console.log('Sucessfully Connected!');
});

websocket.on("socket/disconnect", function (error) {
    console.log("Disconnected for " + error.reason + " with code " + error.code);
});


