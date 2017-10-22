import {Application} from "./Application";
import {VKWidget} from "./Widgets/VKWidget";
import {Apperiance} from "./Apperiance/Apperiance";
import {Room} from "./Room/Room";
import {User} from "./User/User";
import {RoomManager} from "./User/RoomManager";

//
let apperiance = new Apperiance();
apperiance.init();


// let vk = new VKWidget();
// vk.start();

//Заберем из сгенеренного специально фронта.
const roomsIds: [] = [
    {
        sourceId: '',
        sourceUrl: ''
    },
    {
        sourceId: 'mds_voice',
        sourceUrl: 'http://ice.planeset.ru:8000/mds_voice.mp3'
    },
    {
        sourceId: 'mds_music',
        sourceUrl: 'http://ice.planeset.ru:8000/mds.mp3'
    }
];

let rooms: Room[] = [];
for (let room of roomsIds) {
    rooms.push(new Room(room.sourceId, room.sourceUrl));
}
let user = new User();
user.changeRoom(rooms[0]);

let roomManager = new RoomManager(rooms);


let application = new Application(roomManager, user);
application.start();





