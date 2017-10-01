import 'jquery-slider';
import {Player} from "../Player/Player";
import {Source} from "../Source";

export class ControlManagement {
    private _source: Source;
    private _player: Player;
    private _$links: JQuery;
    private _$playButton: JQuery;
    private _$pauseButton: JQuery;
    private _$volumeSlider: JQuery;
    private _$volumeValue: JQuery;
    private _lastVolume: number;
    private _$muteButton: JQuery;
    private _$loaderSign: JQuery;
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

    constructor(player: Player, source: Source) {
        this._source = source;
        this._player = player;
        this._$links = $("ul#playerlist>li");
        this._$playButton = $("#playsource");
        this._$pauseButton = $("#pausesource");
        this._$volumeValue = $("#volumevalue");
        this._$muteButton = $("#mute");
        this._$volumeSlider = $("#volmaster").slider(this._sliderConfig);
        this._$loaderSign = $("#loading-indicator");
        this.init();


    }

    private init(): void {
        this.bindHandlers();
        //Из за непонятного глюка (не работает event onpause когда вызывается через класс) приходится костыль делать для проверки кнопок паузы.
    }

    private bindHandlers(): void {

        this._player.addOnPlayHandler(() => {
            this.linkActive(this._source.getSourceUrl());

        });

        this._player.addOnPlayingHandler((event) => {
            this._$loaderSign.hide();
            this.pauseResumeButtonsStatus(event.jPlayer.status);
        });

        this._player.addOnPauseHandler((event) => {
            this.pauseResumeButtonsStatus(event.jPlayer.status);
        });

        this._$links.on('click', (event) => {
            event.preventDefault();
            let $link = $(event.target);
            this.play($link.data('src'), $link.data('sourceid'));
        });
        this._$pauseButton.on('click', (e) => {
            e.preventDefault();
            this._player.pause();
            if (this._source.getLastSourceUrl()) {
                this.linkPaused(this._source.getLastSourceUrl());
            }

        });
        this._$playButton.on('click', (e) => {
            e.preventDefault();
            this.play();
        });
        this._$muteButton.on('click', () => {
            this.mute();
        })
    }

    private play(sourceUrl?: string, sourceId?: string): void {
        this._$loaderSign.show();
        this._player.play(sourceUrl, sourceId);
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
            if (this._source.getLastSourceUrl()) {
                this._$playButton.removeClass('ui-state-disabled');
            }
        } else {
            this._$pauseButton.removeClass('ui-state-disabled');
            this._$playButton.addClass('ui-state-disabled');
        }
    }

    private linkActive(src: string): void {
        let $activeLink = this._$links.find(`[data-src='${src}']`);
        $.each($activeLink.parent().parent().children(), function (index, value) {
            $(value).removeClass("active");
        });
        $activeLink.parent().addClass("active");
    }

    private linkPaused(src: string): void {
        let $activeLink = this._$links.find(`[data-src='${src}']`);
        $.each($activeLink.parent().parent().children(), function (index, value) {
            $(value).removeClass("active");
            //TODO: create class Paused
        });
    }

}