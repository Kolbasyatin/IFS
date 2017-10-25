import {ControlReactionInterface} from "./ControlReactionInterface";
import {OnClickedSubscriberInterface} from "./OnClickedSubscriberInterface";

export abstract class AbstractControlSample implements ControlReactionInterface, OnClickedSubscriberInterface {
    protected _$container: JQuery;
    protected _onClickSubscribers: ((event: JQuery.Event) => void) [] = [];

    constructor(container: JQuery) {
        this._$container = container;
        this.init();
    }

    protected init(): void {
        this._$container.on('click', (event) => {
            event.preventDefault();
            this.onClicked(event);
        });
    }

    private onClicked(event: JQuery.Event): void {
        for (const subscriber of this._onClickSubscribers) {
            subscriber(event);
        }
    }

    public addOnClickSubscriber(subscriber: (event?: JQuery.Event) => void) {
        this._onClickSubscribers.push(subscriber);
    }

    public abstract onPlay(): void;

    public abstract onPause(): void;

}