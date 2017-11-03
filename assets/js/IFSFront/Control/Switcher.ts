import {AbstractControlSample} from "./AbstractControlSample";

export class Switcher extends AbstractControlSample {
    private _sourceId: string;
    private _currentClass: string = '';
    constructor(container: JQuery) {
        super(container);
        this._sourceId = container.data('sourceid');
    }
    public onPlayStarted(sourceId: string): void {
        this.changeOnPlayClass(sourceId, 'active');
    }

    public onPlayPaused(sourceId: string): void {
        console.log(sourceId);
        this.changeOnPlayClass(sourceId, 'paused');
    }

    public onPlayStarting(sourceId: string): void {
        this.changeOnPlayClass(sourceId, 'starting');
    }

    private changeOnPlayClass(sourceId: string, className: string) {
        if (this._sourceId === sourceId) {
            const element: JQuery = this._$container.parent('li');
            element.removeClass(this._currentClass);
            this._currentClass = className;
            element.addClass(this._currentClass);
        }
    }

}