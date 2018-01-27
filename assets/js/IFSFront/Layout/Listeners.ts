import {LayoutSample} from "./LayoutSample";
import * as Mustache from "mustache";
import {User} from "../User/User";

type ListenersData = {[listeners:string]: string}

export class Listeners extends LayoutSample{
    private _template: string = "{{{listeners}}}";
    private _listeners: number;
    private render(listeners: ListenersData): string {
        return Mustache.render(this._template, listeners);
    }

    public updateListeners(listeners: number): void {
        this.show(listeners);
        if(this.isListenersChange(listeners)) {
            this.fadeInHtml();
        }
    }

    public roomWasChanged(): void {
        this.fadeInHtml();
    }

    private show(listeners: number): void {
        this._listeners = listeners;
        const html = this.render(this.constructListenerData(listeners));
        this._$container.html(html);
    }
    public isListenersChange(listeners: number): boolean {
        return this._listeners !== listeners;

    }

    private constructListenerData(listeners: number): ListenersData {
        return {listeners: listeners ? String(listeners) : "&#8734"};
    }

    private fadeInHtml(): void {
        this._$container.hide();
        this._$container.fadeIn('ease');
    }


}