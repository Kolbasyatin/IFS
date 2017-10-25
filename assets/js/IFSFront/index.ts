// import {PlayButton} from "./Control/PlayButton";
//


import {Control} from "./Control/Control";
import {Mediator} from "./Mediator";
import {LayoutManager} from "./Layout/LayoutManager";

const mediator = new Mediator();
const control = new Control(mediator);
const layout = new LayoutManager(mediator);

mediator.setControl(control);
mediator.setLayout(layout);
