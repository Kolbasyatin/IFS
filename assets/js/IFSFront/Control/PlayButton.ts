import {AbstractControlSample} from "./AbstractControlSample";

export class PlayButton extends AbstractControlSample  {
    public onPlay(): void {
        this._$container.addClass('ui-state-disabled')
    }

    public onPause(): void {
        this._$container.removeClass('ui-state-disabled');
    }
}