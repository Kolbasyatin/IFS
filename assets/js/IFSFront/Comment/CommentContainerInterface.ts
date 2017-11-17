import {JComment} from "./JComment";

export interface CommentContainerInterface {
    getComments(): JComment[];
    addComments(rawComments: CommentDataInterface[]): void;
}