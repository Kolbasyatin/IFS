import {Control} from "./Control/Control";
import {Mediator} from "./Mediator";
import {LayoutManager} from "./Layout/LayoutManager";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";

const mediator = new Mediator();

const control = new Control(mediator);
const layout = new LayoutManager(mediator);
const user = new User(mediator);
const roomContainer = new RoomContainer(mediator);

mediator.setControl(control);
mediator.setLayout(layout);
mediator.setUser(user);
mediator.setRoomContainer(roomContainer);

mediator.startApplication();
