import 'jquery-tooltip';
import 'jquery-easing';

export class Apperiance {
    public init(): void {
        $(document).tooltip({
            track: false
        });
    }

}