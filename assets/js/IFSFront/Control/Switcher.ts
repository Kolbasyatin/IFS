import {AbstractControlSample} from "./AbstractControlSample";

export class Switcher extends AbstractControlSample {

    onPlay(): void {
        this._$container.addClass('active');
    }

    onPause(): void {
        this._$container.removeClass('active');
    }
}