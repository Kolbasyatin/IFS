import {Application} from "./Application";
import {VKWidget} from "./Widgets/VKWidget";
import * as autobahn from "autobahn";
import {Apperiance} from "./Apperiance/Apperiance";
//
let apperiance = new Apperiance();
apperiance.init();

//
let application = new Application();
application.start();
//
let vk = new VKWidget();
vk.start();
//
let WS: WS = require("gos-ws");
let websocket = WS.connect("ws://localhost/stat");

websocket.on("socket/connect", function (session: ABSession) {

    //PUB_SUB
    console.log('Sucessfully Connected!');
    session.subscribe('herald/', function (uri: string, payload: object) {
        console.log(uri, payload);
    });

    session.publish("herald/", "This is a message");

    // session.unsubscribe('herald/',function () {
    //     console.log('asdf');
    // });


    // RPC
    session.call("commentator/comment", {"term1": 2, "term2": 5}).then(
        function (result: any) {
            console.log("RPC Valid!", result);
        },
        function (error: any, desc: any) {
            console.log("RPC Error", error, desc);
        }
    );

});

websocket.on("socket/disconnect", function (error: autobahn.ICloseEventDetails) {
    console.log("Disconnected for " + error.reason + " with code " + error.code);
});


