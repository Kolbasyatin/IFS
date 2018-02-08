import {ListenersDataInterface} from "./ListenersDataInterface"
import * as Mustache from "mustache";

export class Listeners {

    private _$listenersContainer: JQuery;

    private _template: string = "{{{listeners}}}";

    private _currentListenersCount: number = 0;

    constructor($container: JQuery) {
        this._$listenersContainer = $container;
    }

    public setListenersCount(count?: number) {
        if (count && this._currentListenersCount !== count) {
            this._currentListenersCount = count;
            this._$listenersContainer.hide();
            let listeners = {
                listeners: count ? String(count) : "&#8734;"
            };
            let newHtml = this.render(listeners);
            this._$listenersContainer.html(newHtml);
            this._$listenersContainer.fadeIn('easing');
        }
    }

    private render(listeners: ListenersDataInterface): string {

        return Mustache.render(this._template, listeners);
    }

}