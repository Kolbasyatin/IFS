import {Mediator} from "./Mediator";

export abstract class Colleague {
    protected _mediator: Mediator;

    constructor(mediator: Mediator) {
        this._mediator = mediator;
    }

}