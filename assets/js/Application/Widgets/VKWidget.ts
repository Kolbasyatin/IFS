import $script = require("scriptjs");
declare let VK: any;


export class VKWidget {
    private _widgetUrl: string = 'http://vk.com/js/api/openapi.js?116';
    private _container:string = "vk_groups";
    private _config: object = {
        mode: 4,
        height: "400",
        width: "auto",
        color1: '4B6D95',
        color2: 'EFE0E0',
        color3: 'A8935E'
    };
    private _widgetId:number = 144631646;

    public start(): void {
        $script(this._widgetUrl, () => {
            VK.Widgets.Group(
                this._container,
                this._config,
                this._widgetId
            )
        })
    }
}
