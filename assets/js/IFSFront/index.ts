import {Control} from "./Control/Control";
import {Mediator} from "./Mediator";
import {LayoutManager} from "./Layout/LayoutManager";
import {User} from "./User/User";
import {RoomContainer} from "./Room/RoomContainer";
import {WAMP} from "./WebSocket/WAMP";
import {Player} from "./Player/Player";
import {CommentForm} from "./Comment/CommentForm";
import {DataManager} from "./Data/DataManager";

const mediator = new Mediator();

const roomContainer = new RoomContainer(mediator);
const layout = new LayoutManager(mediator);
const control = new Control(mediator);
const user = new User(mediator);
const player = new Player(mediator);
const commentForm = new CommentForm(mediator);
const wamp = new WAMP(mediator);
const dataManager = new DataManager(mediator, wamp, roomContainer);

mediator.setUser(user);
mediator.setRoomContainer(roomContainer);
mediator.setControl(control);
mediator.setLayout(layout);
mediator.setWamp(wamp);
mediator.setPlayer(player);
mediator.setCommentForm(commentForm);
mediator.setDataManager(dataManager);

mediator.fly();
