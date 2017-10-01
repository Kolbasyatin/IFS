export class Source {
    private _currentSource: string = '';
    private _lastSourceId: string = '';
    private _sourceUrl: string = '';
    private _lastSourceUrl: string = '';


    public setCurrentSourceId(sourceId: string): void {
        this._currentSource = sourceId;
    }

    public getCurrentSourceId(): string {
        return this._currentSource;
    }

    public setLastSourceId(sourceId: string): void {
        this._lastSourceId =sourceId;
    }

    public getLastSourceId(): string {
        return this._lastSourceId;
    }

    public setSourceUrl(sourceUrl: string): void {
        this._sourceUrl = sourceUrl;
    }

    public getSourceUrl(): string {
        return this._sourceUrl;
    }

    public emptyCurrentSourceId(): void {
        this._currentSource = '';
    }

    public setLastSourceUrl(sourceUrl: string): void {
        this._lastSourceUrl = sourceUrl;
    }

    public getLastSourceUrl(): string {
        return this._lastSourceUrl;
    }

    public emptySourceUrl(): void {
        this._sourceUrl = '';
    }


}