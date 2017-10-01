import 'jquery-tooltip';

export class Apperiance {
    public init(): void {
        $(document).tooltip({
            track: false
        });
    }

}