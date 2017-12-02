import $script = require("scriptjs");
import {LayoutSample} from "../Layout/LayoutSample";

declare let VK: any;

export class VKWidget extends LayoutSample {
    private _widgetUrl: string = 'http://vk.com/js/api/openapi.js?116';
    private _config: object = {
        mode: 4,
        height: "400",
        width: "280",
        color1: '4B6D95',
        color2: 'EFE0E0',
        color3: 'A8935E'
    };
    private _widgetId: number = 144631646;
    private _widgetDiv: JQuery;

    constructor($container: JQuery) {
        super($container);
        this._widgetDiv = $("<div />").attr('id', 'vk_groups').css('display', 'none').width(280).height(400);
        this._$container.append(this._widgetDiv);

    }

    public start(): void {
        $script(this._widgetUrl, () => {
            VK.Widgets.Group(
                this._widgetDiv.attr('id'),
                this._config,
                this._widgetId
            )
        })
    }

    public show(): void {
        this._widgetDiv.show();
    }

    public hide(): void {
        this._widgetDiv.hide();
    }
}
