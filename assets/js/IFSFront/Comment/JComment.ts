import * as Mustache from "mustache";
import * as moment from "moment";
import 'jquery-easing';

export class JComment implements ShowInterface {

    private _templates: {[id: string]: string} = {
        admin: `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{timeToShow}}</span>
        <span>Admin!</span>
        </div>`,
        user: `<div class="comment" id="commentid{{id}}" >
        <p>{{username}}</p>
        <span>{{message}}</span>
        <span class="datetime">{{timeToShow}}</span>
        </div>`
    };
    private _templateName: string = 'user';

    private _data: CommentDataInterface;
    private _$jHTML: JQuery;
    private _effectOptions: JQueryUI.EffectOptions = {
        effect: 'slide',
        easing: 'easeOutBounce',
        duration: 650,
        complete: () => {
        }
    };

    constructor(data: CommentDataInterface, templateName: string, effect?: JQueryUI.EffectOptions) {
        this._data = data;
        this._templateName = templateName;
        if (effect) {
            this._effectOptions = effect;
        }
        this._$jHTML = $(this.renderHtml(this._templateName));
    }

    private renderHtml(templateName: string): string {
        if (!this._data) {
            throw new Error("There is no data to render");
        }
        this._data.timeToShow = moment.unix(this._data.dateTime).locale('ru')./*add(settings.timeShift, 'year').*/format('lll');

        return Mustache.render(this._templates[templateName], this._data);
    }

    public getJHTML(): JQuery {
        return this._$jHTML;
    }

    public show(applyEffect: boolean = false): void {
        let effect = {};
        if (applyEffect) {
            effect = this._effectOptions;
        }
        this._$jHTML.show(effect);
    }

    public isShown(): boolean {
        return this._$jHTML.is(":visible");
    }

    public isHidden(): boolean {
        return !this.isShown();
    }

    public hide(): void {
        this._$jHTML.hide(this._effectOptions);
    }

    public getId(): number {
        return this._data.id;
    }

    public updateJComment(data: CommentDataInterface): void {
        if (this._data !== data) {
            this._data = data;
            let oldJComment: JQuery = this._$jHTML;
            let newJComment: JQuery = $(this.renderHtml(this._templateName));
            oldJComment.replaceWith(newJComment);
            this._$jHTML = newJComment;
        }
    }

    public getRawData(): CommentDataInterface {
        return this._data;
    }

}

