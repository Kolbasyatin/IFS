import {LayoutSample} from "./LayoutSample";
import * as Mustache from "mustache";

export class ListenersAllChannel extends LayoutSample{
    private _template: string = `
    {{#listeners}}
    {{name}}:{{listeners}}.
    {{/listeners}}
    `;

    private render(data: ListenersDataInterface[]): string {
        const renderData = {listeners: data};
        return Mustache.render(this._template, renderData);
    }

    public show(data: ListenersDataInterface[]): void {
        if (this.isDataChanged()) {
            const title: string = this.render(data);
            this._$container.prop('title', title);
        }

    }

    public isDataChanged(): boolean {
        /** TODO: Сделать сравнение или хрен бы с ним ? */
        return true;
    }

}