import {LayoutSample} from "./LayoutSample";
import {JComment} from "../Comment/JComment";

require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');


export class LeftCommentsLayout extends LayoutSample {
    private _cSBOptions: MCustomScrollbar.CustomScrollbarOptions = {
        theme: 'dark-thin',
        callbacks: {
            onTotalScroll: (): Promise<void> => this.showNextPage()
        }
    };
    private _$mCustomScrollContainer: JQuery;
    private _$commentContainer: JQuery;
    private _nextPageCallback: () => void;

    constructor($container: JQuery, nextPageCallback:() => void) {
        super($container);
        this._$mCustomScrollContainer = $container.mCustomScrollbar(this._cSBOptions);
        this._$commentContainer = this._$mCustomScrollContainer.find("#mCSB_1_container");
        this._nextPageCallback = nextPageCallback;
    }

    public publish(data: JQuery, direction:string = 'down'): void {
        if(direction === 'up') {
            this._$commentContainer.prepend(data);
        } else {
            this._$commentContainer.append(data);
        }
        this.commentContainerUpdate();
    }

    public hide(comments: JComment[]) {
        for (let comment of comments) {
            comment.hide();
            comment.getJHTML().detach();
        }
    }

    private commentContainerUpdate(): void {
        this._$mCustomScrollContainer.mCustomScrollbar('update');
    }

    // public hide(): void {
    //     console.log(this._$commentContainer.children());
    //     this._$commentContainer.children().hide({
    //         effect: 'slide',
    //         easing: 'easeInOutBack',
    //         duration: 300,
    //         complete: () => {}
    //     });
    // }

    private async showNextPage(): Promise<void> {
        if (this._nextPageCallback) {
            this._nextPageCallback();
        }
    }
}