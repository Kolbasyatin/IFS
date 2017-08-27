import * as moment from "moment";
import {TimeData} from "./TimeDataInterface"

export class Timer {
    private _$container: JQuery;

    constructor($container: JQuery) {
        if(!$container.length) {
            throw new Error("There is no container for timer");
        }
        this._$container = $container;
    }

    public start(): void {
        this.showTime();
        setInterval((): void => {
            this.showTime();
        }, 1000);
    }

    private showTime(): void {
        let time: TimeData = Timer.getTime();
        let html: string = `${time.year} Year ${time.hour}:${time.minute}`;
        this._$container.html(html);
    }

    private static getTime(): TimeData {
        let curtime = moment().locale('ru'),
            year: number = curtime.year() + 1000,
            hour: number = curtime.hour(),
            minute: number = curtime.minute();
        return {
            year: year,
            hour: hour,
            minute: minute
        }
    }

}
