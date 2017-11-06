import {LayoutSample} from "./LayoutSample";

require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');


export class LeftCommentsLayout extends LayoutSample implements LayoutPublishInterface{
    private _cSBOptions: MCustomScrollbar.CustomScrollbarOptions = {
        theme: 'dark-thin',
        callbacks: {
            onTotalScroll: (): Promise<void> => this.showNextPage()
        }
    };
    private _$mCustomScrollContainer: JQuery;
    private _$commentContainer: JQuery;

    constructor($container: JQuery) {
        super($container);
        this._$mCustomScrollContainer = $container.mCustomScrollbar(this._cSBOptions);
        this._$commentContainer = this._$mCustomScrollContainer.find("#mCSB_1_container");
    }

    public publish(data: JQuery): void {
        this._$commentContainer.append(data);
        this.commentContainerUpdate();
    }


    private commentContainerUpdate(): void {
        this._$mCustomScrollContainer.mCustomScrollbar('update');
    }

    public hide(): void {
        this._$commentContainer.children().hide({
            effect: 'slide',
            easing: 'easeInOutBack',
            duration: 300,
            complete: () => {}
        });
    }

    private async showNextPage(): Promise<void> {
        console.log('show next page');
    }
}