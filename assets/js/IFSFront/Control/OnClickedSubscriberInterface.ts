export interface OnClickedSubscriberInterface {
    addOnClickSubscriber(subscriber: (event?: JQuery.Event) => void): void;
}