import {AbstractControlSample} from "./AbstractControlSample";

export class MuteButton extends AbstractControlSample {

    public onMute(): void {
        this._$container.removeClass('ui-icon-volume-on').addClass('ui-icon-volume-off');
    }

    public onUnmute(): void {
        this._$container.addClass('ui-icon-volume-on').removeClass('ui-icon-volume-off');
    }

    public onPlay(): void {}
    public onPause(): void {}

}