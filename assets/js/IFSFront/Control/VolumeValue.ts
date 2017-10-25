export class VolumeValue {
    private _$container: JQuery;

    constructor($container: JQuery) {
        this._$container = $container;
    }

    public setValue(value: number): void {
        let htmlValue: string = String(Math.round(value * 100));
        this._$container.html(`${htmlValue}%`);
        console.warn('Перенеси меня в нужное место!, я значение звука!');
    }

}