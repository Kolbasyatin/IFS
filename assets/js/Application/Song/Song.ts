import {SongInterface} from "./SongInterface";
import * as Mustache from "mustache";

export class Song {
    private _template: string = "{{songName}}";
    private _data: SongInterface;
    private _$currentSong: JQuery;

    constructor(container: JQuery) {
        this._$currentSong = container;
    }

    public setSong(song: SongInterface): void {
        this._data = song;
        let newHtml = this.renderHtml();
        if (this._$currentSong.html() !== newHtml) {
            this._$currentSong.hide();
            this._$currentSong.html(newHtml);
        }

    }

    public showCurrentSong(): void {
        this._$currentSong.fadeIn('easing');
    }

    public hideCurrentSong(): void {
        this._$currentSong.fadeOut('easing');
    }

    private renderHtml(): string {
        return Mustache.render(this._template, this._data);
    }

}