export interface ControlReactionInterface {
    onPlayStarting(sourceId?: string): void;
    onPlayStarted(sourceId?: string): void;
    onPlayPaused(sourceId?: string): void;
}