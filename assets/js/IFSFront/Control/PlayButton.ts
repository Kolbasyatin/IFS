import {AbstractControlSample} from "./AbstractControlSample";

export class PlayButton extends AbstractControlSample  {
    public onPlayStarted(): void {
        this._$container.addClass('ui-state-disabled')
    }

    public onPlayPaused(): void {
        this._$container.removeClass('ui-state-disabled');
    }


    public onPlayStarting(sourceId?: string): void {}
}