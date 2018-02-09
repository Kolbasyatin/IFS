import {LayoutSample} from "./LayoutSample";
import * as Mustache from "mustache";

export class Track extends LayoutSample {
    private _template: string = "{{{.}}}";
    private _trackName: string = '';

    private render(trackName: string): string {

        return Mustache.render(this._template, trackName);
    }

    public updateTrackName(trackName: string): void {
        if (this.isTrackNameChanged(trackName)) {
            this._trackName = trackName;
            const showTrackName = trackName.replace(/\n/, "<br/><br/>");
            this.show(showTrackName);
            this.fadeInHtml();
        }
    }

    private show(trackName: string): void {
        const html = this.render(trackName);
        this._$container.html(html);
    }

    private isTrackNameChanged(trackName: string): boolean {
        return this._trackName !== trackName;
    }

    private fadeInHtml(): void {
        this._$container.hide();
        this._$container.fadeIn('ease');
    }

}