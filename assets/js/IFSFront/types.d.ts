interface CommentDataInterface {
    id: number;
    sourceId: string;
    username: string;
    message: string;
    dateTime: number;
    type: string;
    timeToShow?: string;
}

interface LayoutPublishInterface {
    publish(data: string): void;
}
