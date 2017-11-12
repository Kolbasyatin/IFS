import {AbstractControlSample} from "./AbstractControlSample";
import 'jquery-slider';

export class VolumeSlider extends AbstractControlSample {
    private _startVolume: number = 0.6;
    private _sliderConfig: JQueryUI.SliderOptions = {
        min: 0,
        max: 1,
        value: this._startVolume,
        orientation: "horizontal",
        step: 0.05,
        range: "min",
        animate: true,
        slide: (e: Event, ui: JQueryUI.SliderOptions) => this.setVolume(ui.value),
        change: (event: Event, ui: JQueryUI.SliderUIParams) => this.setVolume(ui.value),
        create: (event: Event) => {this.setVolume($(event.target).slider('value'))}
    };

    private _rememberedVolume: number = this._startVolume;
    private _volumeSubscribers: ((volume?: number) => void) [] = [];

    constructor(container: JQuery) {
        super(container);
    }

    public start(): void {
        this._$container.slider(this._sliderConfig);
    }
    public muteToggle(): void {
        if(!this.isMuted()) {
            this._rememberedVolume = this.getCurrentVolume();
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

    private setVolume(volume?: number): void {
        for (const subscriber of this._volumeSubscribers) {
            subscriber(volume);
        }
    }
    public getCurrentVolume(): number {
        return this._$container.slider('value');
    }

    public onPlayStarted(): void {}
    public onPlayPaused(): void {}
    public onPlayStarting(): void {};


}