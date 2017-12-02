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
    private _reactions: ControlReactionInterface[] = [];

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
        this.buildReactions();


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

    private buildReactions(): void {
        this._reactions.push(this._playButton);
        this._reactions.push(this._pauseButton);
        /** TODO: why error if switchers implemets interface? */
        this._reactions = this._reactions.concat(this._switchers);
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
    /** invokes from volumeSlider */
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

    public sliderMuteToggle(): void {
        this._volumeSlider.muteToggle();
    }

    public getCurrentVolume(): number {
        return this._volumeSlider.getCurrentVolume();
    }

    /** Three methods code is duplicated. need to be refactoring */
    public playStarting(sourceId: string): void {
        for (let element of this._reactions) {
            element.onPlayStarting(sourceId);
        }
    }

    public playStarted(sourceId: string): void {
        for (let element of this._reactions) {
            element.onPlayStarted(sourceId);
        }
    }

    public playStopped(sourceId: string): void {
        for (let element of this._reactions) {
            element.onPlayPaused(sourceId);
        }
    }

}