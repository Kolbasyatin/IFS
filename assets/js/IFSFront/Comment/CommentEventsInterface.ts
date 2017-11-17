export interface CommentEventsInterface {
    onNewComment(jHTML:JQuery): void;
    onEditComment(jHTML:JQuery): void;
    onOldComment(jHTML:JQuery): void;
    onDeleteComment(jHTML:JQuery): void;
}