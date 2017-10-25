import {Mediator} from "../Mediator";
import {PlayButton} from "./PlayButton";
import {PauseButton} from "./PauseButton";
import {ControlReactionInterface} from "./ControlReactionInterface";
import {Switcher} from "./Switcher";
import {MuteButton} from "./MuteButton";
import {Slider} from "./Slider";

export class Control {
    private _mediator: Mediator;
    private _playButton: PlayButton;
    private _pauseButton: PauseButton;
    private _muteButton: MuteButton;
    private _slider: Slider;
    private _switchers: Switcher[] = [];

    constructor(mediator: Mediator) {
        this._mediator = mediator;
        this._playButton = new PlayButton($('#playsource'));
        this._pauseButton = new PauseButton($('#pausesource'));
        this._slider = new Slider($('#volmaster'));
        $("ul#playerlist>li>a").each((index, element) => {
            this._switchers.push(new Switcher($(element)));
        });
        this._muteButton = new MuteButton($('#mute'));

        this.init();
    }

    private init(): void {
        this._playButton.addOnClickSubscriber(this.onPlayClick());
        this._pauseButton.addOnClickSubscriber(this.onPauseClick());
        this._muteButton.addOnClickSubscriber(this.onMuteClick());
        for (const switcher of this._switchers) {
            switcher.addOnClickSubscriber(this.onSwitchRoomClick());
        }
        this._slider.addVolumeSubscriber(this.onVolumeChange());

    }

    public onSwitchRoomClick() {
        return () => {
            /*this._mediator.switchRoom()*/
            console.log('switched room to mediator');
            console.log(event);
        };

    }

    public onPlayClick() {
        return (event: JQuery.Event) => {
            console.log('play button');
            console.log(event);
            console.log(this);
        };

    }

    public onPauseClick() {
        return () => {
            console.log('pause button');
            console.log(event);
        };

    }

    public onMuteClick() {
        return () => {
            this.sliderMuteToggle();
        };
    }

    public sliderMuteToggle(): void {
        this._slider.muteToggle();
    }

    public onVolumeChange() {
        return (volume: number) => {
            console.log('volume change');
            console.log(volume);
            if(volume) {

            }
        }
    }


    public getReactionsSamples(): ControlReactionInterface[] {
        const elements: ControlReactionInterface[] = [];
        elements.push(this._playButton);
        return elements;
    }

}