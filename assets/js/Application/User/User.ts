export class User {
    private _$userInformer: JQuery = $("div#user-info");
    public isAuthenticated(): boolean {
        return this._$userInformer.data('is-authenticated') === true;
    }
}