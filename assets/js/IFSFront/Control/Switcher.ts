import {AbstractControlSample} from "./AbstractControlSample";

export class Switcher extends AbstractControlSample {
    private _sourceId: string;
    private _currentClass: string = '';

    readonly ACTIVE_CLASS: string = 'active';
    readonly PAUSED_CLASS: string = 'paused';
    readonly STARTING_CLASS: string = 'starting';

    constructor(container: JQuery) {
        super(container);
        this._sourceId = container.data('sourceid');
    }
    public onPlayStarted(sourceId: string): void {
        this.changeOnPlayClass(sourceId, this.ACTIVE_CLASS);
    }

    public onPlayPaused(sourceId: string): void {
        this.changeOnPlayClass(sourceId, this.PAUSED_CLASS);
    }

    public onPlayStarting(sourceId: string): void {
        this.changeOnPlayClass(sourceId, this.STARTING_CLASS);
    }

    private changeOnPlayClass(sourceId: string, className: string) {
        if (this._sourceId === sourceId) {
            const element: JQuery = this._$container.parent('li');
            element.removeClass(this._currentClass);
            this._currentClass = className;
            element.addClass(this._currentClass);
            this.removeNeighborsClasses(element);
        }
    }

    private removeNeighborsClasses(element: JQuery): void {
        element.siblings().each((index, neighbor) => {
            for (let classToRemove of this.getAllClasses()) {
                $(neighbor).removeClass(classToRemove);
            }
        });
    }

    private getAllClasses(): string[] {
        return [
            this.ACTIVE_CLASS,
            this.PAUSED_CLASS,
            this.STARTING_CLASS
        ]
    }

}