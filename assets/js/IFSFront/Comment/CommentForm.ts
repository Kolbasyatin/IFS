import "jquery-dialog";
import {Colleague} from "../Colleague";

export class CommentForm extends Colleague {
    private _error: boolean = false;
    private _$dialog: JQuery = $("div#dialog-form");
    private _$form_container: JQuery = $("div#form");
    private _commentStation: string | null;
    private _dialogOptions: JQueryUI.DialogOptions = {
        autoOpen: false,
        maxHeight: 500,
        maxWidth: 450,
        minHeight: 500,
        minWidth: 300,
        width: $(window).width() >= 600 ? 450 : 300,
        modal: true,
        show: 'fadeIn',
        hide: 'fadeOut',
        position: {
            my: 'center',
            at: 'top+30%',
            of: window
        },
        open: () => this.onOpen(),
        close: () => this.onClose(),
        buttons: {
            "Сообщить всем!": () => this.sendForm(),
            "Отмена": () => this.closeDialog(),
        }
    };


    public initDialog(): void {
        this._$dialog.dialog(this._dialogOptions);
    }

    private sendForm(): void {
        if(!this._error) {
            let data: JQuery.PlainObject = this._$form_container.find('form').serializeArray();
            let post = $.post(this.generateRoute(), data);
            $.when(post)
                .done(result => {
                    if (result.error === false) {
                        this.generateCommentedEvent()
                    } else {
                        this.generateErrorCommentedEvent();
                    }
                })
                .fail(error => {
                    console.error(error);
                    this.generateCommentedEvent()
                })
                .always(() => this.closeDialog())
        }

    }
    private generateRoute(): string {
        let commentType = this._commentStation ? 'comment' : 'news';

        return Routing.generate('comment_new', {type: commentType, source_id: this._commentStation});
    }


    public comment(station: string) {
        this._commentStation = station;
        this.initDialog();
        this.openDialog();
    }

    private openDialog(): void {
        this._$dialog.dialog("open");
    }

    private closeDialog(): void {
        this._$dialog.dialog("close");
    }

    private onOpen(): void {
        let ajax: JQuery.jqXHR = $.get(this.generateRoute());
        $.when(ajax).then(
            data => {
                this.showContent(data)
            },
            error => {
                console.error(error);
                this._error = true;
                this.showContent('У нас что то сломалось.');
                setTimeout(() => {this.closeDialog()}, 4000)
            }
        );


    }

    private onClose(): void {
        this._$form_container.empty();
        this._commentStation = null;
        this._error = false;
    }

    private showContent(data: string): void {
        this._$form_container.append(data);
    }

    private generateCommentedEvent(): void {
        console.log("Генерим событие на фронте")
    }

    private generateErrorCommentedEvent(): void {
        console.log("Генерим событие ошибки");
    }

}

//
// function Form() {
//     AjaxStat.call(this);
//     var that = this;
//     this.writer = new PrepEffectWriterScrollBarTopWriter();
//     this.ajaxdata['action'] = 'addComment';
//     this.dialog = $("#dialog-form").dialog({ //Окно с диалогом, тут же аяксом получаем форму
//         autoOpen: false,
//         height: 500,
//         width: 450,
//         modal: true,
//         show: 'fadeIn',
//         hide: 'fadeOut',
//         open: function() {
//             that.write();
//         },
//         buttons: {
//             "Отправим комментарий": function(){ //Постим аяксом форму прям отседа.
//                 var $form = $("#form").find('form'), self = this;
//                 $.each($form.serializeArray(), function (i, field) {
//                     that.ajaxdata[field.name] = field.value;
//                 });
//                 that.clear();
//                 $.when(that.write()).then(function () {
//                         if (that.success) {
//                             that.success = false;
//                             $(self).dialog("close");
//                         }
//                     }
//                 );
//             },
//             "Отмена": function() {
//                 $(this).dialog( "close" );
//             }
//         },
//         close: function() {
//             that.comments.newcomments.refresh();
//             $("#form").empty();
//         }
//     });
//     this.points = [
//         {
//             form: {
//                 $point: that.dialog.find("#form")
//             }
//         }
//     ];
//
// }