import {LayoutSample} from "./LayoutSample";

export class AuthButton extends LayoutSample {
    constructor($container: JQuery) {
        super($container);
        this.bindHandlers();

    }
    private bindHandlers(): void {
        this._$container.on('click', (event) => {
            this.doAnimate($(event.target));
        })
    }

    private doAnimate(element: JQuery): void {
        element.addClass('loader');
    }
    public blink() {
        this._$container.toggleClass('li-hovered');
    }
}