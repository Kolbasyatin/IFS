import {CommentContainerInterface} from "./CommentContainerInterface";
import {JComment} from "./JComment";

export class CommentContainer implements CommentContainerInterface{

    private _allComments: JComment[] = [];
    private _newComments: JComment[] = [];
    private _oldComments: JComment[] = [];

    getComments(): JComment[] {

    }

    addComments(rawComments: CommentDataInterface[]): void {
    }
}