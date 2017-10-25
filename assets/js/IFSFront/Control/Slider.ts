import {AbstractControlSample} from "./AbstractControlSample";
import 'jquery-slider';

export class Slider extends AbstractControlSample {
    private _startVolume: number = 0.6;
    private _sliderConfig: object = {
        min: 0,
        max: 1,
        value: this._startVolume,
        orientation: "horizontal",
        step: 0.05,
        range: "min",
        animate: true,
        //Странный глюк. Если не передать в конструктор для change, в дальнейшем на евент не вешается.
        //При срабатывании create не отдает value
        change: (e: any, ui: any) => this.setVolume(ui.value),
        create: () => this.setVolume(this._startVolume),
        slide: (e: any, ui: any) => this.setVolume(ui.value)

    };
    private _rememberedVolume: number = this._startVolume;
    private _volumeSubscribers: ((volume: number) => void) [] = [];


    constructor(container: JQuery) {
        super(container);
        this._$container.slider(this._sliderConfig);
    }

    public muteToggle(): void {
        if(!this.isMuted()) {
            this._rememberedVolume = this._$container.slider('value');
            this._$container.slider('value', 0);
        } else {
            this._$container.slider('value', this._rememberedVolume);
            this._rememberedVolume = 0;
        }
    }

    private isMuted(): boolean {
        return this._$container.slider('value') == 0;
    }

    public addVolumeSubscriber(subscriber: (volume: number) => void) {
        this._volumeSubscribers.push(subscriber);
    }

    private setVolume(volume: number): void {
        for (const subscriber of this._volumeSubscribers) {
            subscriber(volume);
        }
    }

    public onPlay(): void {}
    public onPause(): void {}

}