import 'jquery-slider';
import {Player} from "../Player/Player";
import {User} from "../User/User";
import {RoomManager} from "../User/RoomManager";
import {Room} from "../Room/Room";

export class ControlManagement {
    private _roomManager: RoomManager;
    private _player: Player;
    private _$links: JQuery;
    private _$playButton: JQuery;
    private _$pauseButton: JQuery;
    private _$volumeSlider: JQuery;
    private _$volumeValue: JQuery;
    private _lastVolume: number;
    private _$muteButton: JQuery;
    private _$loaderSign: JQuery;
    private _user: User;
    private _sliderConfig: object = {
        min: 0,
        max: 1,
        value: 0.6,
        orientation: "horizontal",
        step: 0.05,
        range: "min",
        animate: true,
        //Странный глюк. Если не передать в конструктор для change, в дальнейшем на евент не вешается.
        //При срабатывании create не отдает value
        change: (e: any, ui: any) => this.setVolume(ui.value),
        create: () => this.setVolume(0.6),
        slide: (e: any, ui: any) => this.setVolume(ui.value)
        //disabled: true

    };

    constructor(player: Player, user: User, roomManager: RoomManager) {
        this._roomManager = roomManager;
        this._player = player;
        this._$links = $("ul#playerlist>li");
        this._$playButton = $("#playsource");
        this._$pauseButton = $("#pausesource");
        this._$volumeValue = $("#volumevalue");
        this._$muteButton = $("#mute");
        this._$volumeSlider = $("#volmaster").slider(this._sliderConfig);
        this._$loaderSign = $("#loading-indicator");
        this._user = user;
        this.init();


    }

    private init(): void {
        this.bindHandlers();
    }

    private bindHandlers(): void {

        this._$links.on('click', (event) => {
            event.preventDefault();
            const roomId: string = $(event.target).data('sourceid');
            if (!this.isTheSameRoom(roomId)) {
                this._roomManager.changeRoom(this._user, roomId);
                this.play();
            }

        });
        this._$pauseButton.on('click', (e) => {
            e.preventDefault();
            this._roomManager.changeToDefaultRoom(this._user);
            this.play();

        });
        this._$playButton.on('click', (e) => {
            e.preventDefault();
            if(this._user.getPreviousRoom()) {
                const previousRoom: Room = this._user.getPreviousRoom();
                this._user.changeRoom(previousRoom);
            }
            this.play();
        });

        this._$muteButton.on('click', () => {
            this.mute();
        });

        this._player.addOnPlayHandler(() => {
            this.linkActive();

        });

        this._player.addOnPlayingHandler((event) => {
            /*this._$loaderSign.hide();*/
            this.pauseResumeButtonsStatus(event.jPlayer.status);
        });

        this._player.addOnPauseHandler((event) => {
            this.pauseResumeButtonsStatus(event.jPlayer.status);
            this.linkPaused();
        });


    }

    private isTheSameRoom(roomId: string): boolean {
        return roomId === this._user.getCurrentRoomId()
    }

    private play(): void {
        // this._$loaderSign.show();
        this._player.play(this._user.getCurrentRoom());
    }

    private setVolume(volume: number): void {
        this._player.setVolume(volume);
        this._$volumeValue.empty().append(Math.round(volume * 100) + '%');
        volume ? this.muteButtonOn() : this.muteButtonOff();
    }

    private mute(): void {
        if (this._lastVolume) {
            this._$volumeSlider.slider('value', this._lastVolume);
            this._lastVolume = 0;
        } else {
            this._lastVolume = this._$volumeSlider.slider('value');
            this._$volumeSlider.slider("value", 0);
        }
    };

    private muteButtonOff(): void {
        if (this._$muteButton.length && this._$muteButton.hasClass('ui-icon-volume-on')) {
            this._$muteButton.removeClass('ui-icon-volume-on').addClass('ui-icon-volume-off');
        }

    };

    private muteButtonOn(): void {
        if (this._$muteButton.length && this._$muteButton.hasClass('ui-icon-volume-off')) {
            this._$muteButton.addClass('ui-icon-volume-on').removeClass('ui-icon-volume-off');
        }
    }

    private pauseResumeButtonsStatus(status: jPlayerStatus): void {
        let isPaused = status.paused;
        if (isPaused) {
            this._$pauseButton.addClass('ui-state-disabled');
            if (this._user.getPreviousRoom().getSourceUrl()) {
                this._$playButton.removeClass('ui-state-disabled');
            }
        } else {
            this._$pauseButton.removeClass('ui-state-disabled');
            this._$playButton.addClass('ui-state-disabled');
        }
    }

    private linkActive(): void {
        const room:Room = this._user.getCurrentRoom();
        let $activeLink = this._$links.find(`[data-src='${room.getSourceUrl()}']`);
        $.each($activeLink.parent().parent().children(), function (index, value) {
            $(value).removeClass("active");
        });
        $activeLink.parent().addClass("active");
    }

    private linkPaused(): void {
        const room:Room = this._user.getPreviousRoom();
        let $activeLink = this._$links.find(`[data-src='${room.getSourceUrl()}']`);
        $.each($activeLink.parent().parent().children(), function (index, value) {
            $(value).removeClass("active");
            //TODO: create class Paused
        });
    }

}