import {Comment} from "../Comments/Comment";

require('jquery-mousewheel');
require('malihu-custom-scrollbar-plugin');

//Сделать интерфейс на случай других контейнеров
export class ScrollBarCommentContainer {
    private _$commentsContainer: JQuery;
    private _$mCustomScroll: JQuery;
    private _callBack: () => void;
    private _cSBOptions: MCustomScrollbar.CustomScrollbarOptions = {
        theme: 'dark-thin',
        callbacks: {
            // onTotalScroll: (): Promise<void> => this.showNextPage()
            onTotalScroll: () => {
                this.nextPage()();
            }
        }
    };
    constructor() {
        this.initCustomScrollBar();
        this._$commentsContainer = this._$mCustomScroll.find("#mCSB_1_container");
    }

    public addOnNetxPageCallBack(callback: ()=>void): void {
        this._callBack = callback;
    }
    public nextPage() {
        return this._callBack;
    }

    private initCustomScrollBar(): void {
        this._$mCustomScroll = $('#comments').mCustomScrollbar(this._cSBOptions);
    }

    public update(): void {
        this._$mCustomScroll.mCustomScrollbar('update');
    }

    public appendComment(comment: Comment, direction?: string): void {
        const jComment: JQuery = comment.getJComment();
        this.appendCommentHtml(jComment, direction);
    }
    public appendCommentHtml(jComment: JQuery, direction?: string, ): void {
        if(!direction) {
            direction = 'down';
        }
        if ('up' === direction) {
            this._$commentsContainer.prepend(jComment);
        }
        if ('down' === direction) {
            this._$commentsContainer.append(jComment);
        }
    }

}