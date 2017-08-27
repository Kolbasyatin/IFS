export class Commentator {
    private _$form: JQuery;
    private _$comm_button: JQuery;

    constructor() {
        this._$form = $("#dialog-form");
        this._$comm_button = $("#comm_add");
    }

    private showCommentButton():void {
        this._$comm_button.fadeIn('easing')
    }

    private hideCommentButton(): void {
        this._$comm_button.fadeOut('easing');
    }

    public isCommentButtonActive(status: boolean): void {
        status ? this.showCommentButton() : this.hideCommentButton();
    }
    public getCommentButton(): JQuery {
        return this._$comm_button;
    }
    public doComment(station: string): void {
        console.log(station);
    }

}
