import {Control} from "./Control/Control";
import {Mediator} from "./Mediator";
import {LayoutManager} from "./Layout/LayoutManager";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {WAMP} from "./WebSocket/WAMP";
import {Player} from "./Player/Player";

const mediator = new Mediator();

const layout = new LayoutManager(mediator);
const control = new Control(mediator);
const user = new User(mediator);
const roomContainer = new RoomContainer(mediator);
const player = new Player(mediator);
const wamp = new WAMP(mediator);

mediator.setLayout(layout);
mediator.setControl(control);
mediator.setUser(user);
mediator.setRoomContainer(roomContainer);
mediator.setWamp(wamp);
mediator.setPlayer(player);

mediator.start();
