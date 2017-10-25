require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');


export class LeftCommentsLayout implements LayoutPublishInterface{
    private _cSBOptions: MCustomScrollbar.CustomScrollbarOptions = {
        theme: 'dark-thin',
        callbacks: {
            onTotalScroll: (): Promise<void> => this.showNextPage()
        }
    };
    private _$container: JQuery;
    private _$mCustomScrollContainer: JQuery;
    private _$commentContainer: JQuery;

    constructor($container: JQuery) {
        this._$container = $container;
        this._$mCustomScrollContainer = $container.mCustomScrollbar(this._cSBOptions);
        this._$commentContainer = this._$mCustomScrollContainer.find("#mCSB_1_container");
    }

    publish(data: string): void {
        this._$commentContainer.append(data);
        this.commentContainerUpdate();
    }

    private commentContainerUpdate(): void {
        this._$mCustomScrollContainer.mCustomScrollbar('update');
    }

    private async showNextPage(): Promise<void> {
        console.log('show next page');
    }
}