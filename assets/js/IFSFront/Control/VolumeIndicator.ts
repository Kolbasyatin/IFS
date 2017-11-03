import {LayoutSample} from "../Layout/LayoutSample";

export class VolumeIndicator extends LayoutSample{

    constructor($container: JQuery) {
        super($container);
    }

    public setValue(value: number): void {
        let htmlValue: string = String(Math.round(value * 100));
        this._$container.html(`${htmlValue}%`);
    }

}