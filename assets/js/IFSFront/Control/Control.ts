import {Mediator} from "../Mediator";
import {PlayButton} from "./PlayButton";
import {PauseButton} from "./PauseButton";
import {ControlReactionInterface} from "./ControlReactionInterface";
import {Switcher} from "./Switcher";
import {MuteButton} from "./MuteButton";
import {VolumeSlider} from "./VolumeSlider";
import {Colleague} from "../Colleague";

/** TODO: Отделить отображение управляющих клавиш в LayoutManager. Нарушаем единую ответственность. */
export class Control extends Colleague {

    private _playButton: PlayButton;
    private _pauseButton: PauseButton;
    private _muteButton: MuteButton;
    private _volumeSlider: VolumeSlider;
    private _switchers: Switcher[] = [];

    constructor(mediator: Mediator) {
        super(mediator);
        this._playButton = new PlayButton($('#playsource'));
        this._pauseButton = new PauseButton($('#pausesource'));
        this._volumeSlider = new VolumeSlider($('#volume_slider'));
        $("ul#playerlist>li>a").each((index, element) => {
            this._switchers.push(new Switcher($(element)));
        });
        this._muteButton = new MuteButton($('#mute'));
        this.init();
    }

    private init(): void {
        this._volumeSlider.start();
        for (const switcher of this._switchers) {
            switcher.addOnClickSubscriber(this.onSwitchRoomClick());
        }
        this._playButton.addOnClickSubscriber(this.onPlayClick());
        this._pauseButton.addOnClickSubscriber(this.onPauseClick());
        this._muteButton.addOnClickSubscriber(this.onMuteClick());
        this._volumeSlider.addVolumeSubscriber(this.onVolumeChange());


    }

    public onSwitchRoomClick() {
        return (event: JQuery.Event) => {
            const link: object = event.target;
            const roomId: string = $(link).data('sourceid');
            this._mediator.switchRoom(roomId);
        };

    }

    public onPlayClick() {
        return (event: JQuery.Event) => {
            this._mediator.resumePlay();
        };

    }

    public onPauseClick() {
        return () => {
            this._mediator.switchToDefaultRoom();
        };

    }

    public onMuteClick() {
        return () => {
            this.sliderMuteToggle();
        };
    }

    public sliderMuteToggle(): void {
        this._volumeSlider.muteToggle();
    }

    public onVolumeChange() {
        return (volume: number) => {
            if(!volume) {
                this._muteButton.onMute()
            } else {
                this._muteButton.onUnmute();
            }
            if (this._mediator.isApplicationStarted()) {
                this._mediator.changeVolume(volume);
            }

        }
    }



    public getReactionsSamples(): ControlReactionInterface[] {
        let elements: ControlReactionInterface[] = [];
        elements.push(this._playButton);
        elements.push(this._pauseButton);
        /** TODO: why error if switchers implemets interface? */
        elements = elements.concat(this._switchers);

        return elements;
    }

    public getCurrentVolume(): number {
        return this._volumeSlider.getCurrentVolume();
    }

    /** Three methods code is duplicated. need to be refactoring */
    public playStarting(sourceId: string): void {
        const elements: ControlReactionInterface[] = this.getReactionsSamples();
        for (let element of elements) {
            element.onPlayStarting(sourceId);
        }
    }

    public playStarted(sourceId: string): void {
        const elements: ControlReactionInterface[] = this.getReactionsSamples();
        for (let element of elements) {
            element.onPlayStarted(sourceId);
        }
    }

    public playStopped(sourceId: string): void {
        const elements: ControlReactionInterface[] = this.getReactionsSamples();
        for (let element of elements) {
            element.onPlayPaused(sourceId);
        }
    }

}