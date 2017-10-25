import {Control} from "./Control/Control";
import {LayoutManager} from "./Layout/LayoutManager";
import {Colleague} from "./Colleague";

export class Mediator {

    private _control: Control;
    private _layout: LayoutManager;

    public setControl(control: Colleague) {
        this._control = <Control>control;
    }
    public setLayout(layout: Colleague) {
        this._layout = <LayoutManager>layout;
    }

    public switchRoom(roomId?: string): void {
        console.log(roomId);
        this._layout.publish();
    }

    public switchDefaultRoom(): void {

    }
}