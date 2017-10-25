import {Mediator} from "../Mediator";
import {PlayButton} from "./PlayButton";
import {PauseButton} from "./PauseButton";
import {ControlReactionInterface} from "./ControlReactionInterface";
import {Switcher} from "./Switcher";
import {MuteButton} from "./MuteButton";
import {Slider} from "./Slider";
import {VolumeValue} from "./VolumeValue";
import {Colleague} from "../Colleague";

export class Control extends Colleague {

    private _playButton: PlayButton;
    private _pauseButton: PauseButton;
    private _muteButton: MuteButton;
    private _slider: Slider;
    private _switchers: Switcher[] = [];
    private _volumeValue: VolumeValue;

    constructor(mediator: Mediator) {
        super(mediator);
        this._playButton = new PlayButton($('#playsource'));
        this._pauseButton = new PauseButton($('#pausesource'));
        this._slider = new Slider($('#volmaster'));
        $("ul#playerlist>li>a").each((index, element) => {
            this._switchers.push(new Switcher($(element)));
        });
        this._muteButton = new MuteButton($('#mute'));
        this._volumeValue = new VolumeValue($('#volumevalue'));
        this.init();
    }

    private init(): void {
        this._playButton.addOnClickSubscriber(this.onPlayClick());
        this._pauseButton.addOnClickSubscriber(this.onPauseClick());
        this._muteButton.addOnClickSubscriber(this.onMuteClick());
        this._slider.addVolumeSubscriber(this.onVolumeChange());
        this._slider.start();
        for (const switcher of this._switchers) {
            switcher.addOnClickSubscriber(this.onSwitchRoomClick());
        }

    }

    public onPlayClick() {
        return (event: JQuery.Event) => {
            this._mediator.switchRoom();
        };

    }

    public onPauseClick() {
        return () => {
            this._mediator.switchDefaultRoom();
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
            if(!volume) {
                this._muteButton.onMute()
            } else {
                this._muteButton.onUnmute();
            }
            this._volumeValue.setValue(volume);
        }
    }

    public onSwitchRoomClick() {
        return (event: JQuery.Event) => {
            const link: object = event.target;
            const roomId: string = $(link).data('sourceid');
            this._mediator.switchRoom(roomId);
        };

    }

    public getReactionsSamples(): ControlReactionInterface[] {
        let elements: ControlReactionInterface[] = [];
        elements.push(this._playButton);
        elements.push(this._pauseButton);
        elements = elements.concat(this._switchers);

        return elements;
    }

}