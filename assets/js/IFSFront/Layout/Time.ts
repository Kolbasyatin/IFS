import * as moment from "moment";
import {LayoutSample} from "./LayoutSample";

export class Timer extends LayoutSample{
    private _timeShift: number;
    constructor($container: JQuery, timeShift: number) {
        super($container);
        this._timeShift = timeShift;
    }

    public start(): void {
        this.showTime();
        setInterval((): void => {
            this.showTime();
        }, 1000);
    }

    private showTime(): void {
        let time: TimeDataInterface = this.getTime();
        let html: string = `${time.year} Year ${time.hour}:${time.minute}`;
        this._$container.html(html);
    }

    private getTime(): TimeDataInterface {
        let curtime = moment().locale('ru'),
            year: number = curtime.year() + this._timeShift,
            hour: number = curtime.hour(),
            minute: number = curtime.minute();
        return {
            year: year,
            hour: hour,
            minute: minute
        }
    }

}