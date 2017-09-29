import {Application} from "./Application";
import {VKWidget} from "./Widgets/VKWidget";
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



