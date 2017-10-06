import { inject, Container, CompositionEngine, Controller, ViewSlot } from 'aurelia-framework';
import { IDialogBase, Dialog } from './dialog';
import { AlertDialog, IDialogButton } from './dialogs/alert-dialog';

@inject(CompositionEngine, Container)
export class DialogService {
    constructor(
        private compositionEngine: CompositionEngine,
        private container: Container) {
    }

    alert(title: string, message: string, buttons?: IDialogButton[]) {
        return this.show<AlertDialog>('aurelia-bs/dialogs/alert-dialog', {
            title: title,
            message: message,
            buttons: buttons ? buttons : [
                {
                    name: 'ok',
                    title: 'OK',
                    isDefault: true
                }
            ]
        }).then(dlg => {
            return dlg.clickedButton;
        });
    }

    confirm(title: string, message: string) {
        return this.alert(title, message, [
            {
                name: 'no',
                title: 'Nein',
                isDefault: false
            },
            {
                name: 'yes',
                title: 'Ja',
                isDefault: true
            }
        ]).then(button => {
            return button && button.name === 'yes';
        });
    }

    show<TDialog extends IDialogBase>(viewUrl: string, model?: any, created?: (dialog: TDialog) => void): Promise<TDialog> {
        if ((<any>document.activeElement).blur)
            (<any>document.activeElement).blur();

        let dialogDiv = document.createElement('div');
        let backdropDiv = document.createElement('div');
        backdropDiv.setAttribute('class', 'modal-backdrop fade in');

        document.body.appendChild(dialogDiv);
        document.body.appendChild(backdropDiv);

        let instruction = {
            model: model,
            viewModel: viewUrl,
            container: this.container,
            bindingContext: <any>null,
            viewResources: <any>null,
            viewSlot: new ViewSlot(dialogDiv, true)
        };

        return this.compositionEngine.compose(<any>instruction).then((controller: Controller) => {
            if (Dialog.openedDialogs.length === 0)
                document.body.classList.toggle('modal-open');

            let view = controller.view;
            let dialog = view.bindingContext as TDialog;
            Dialog.openedDialogs.push(dialog);

            if (created)
                created(dialog);

            return new Promise<TDialog>((resolve) => {
                view.attached();
                dialog.element.addEventListener('close', (e: CustomEvent) => {
                    if (e.detail === dialog) {
                        Dialog.openedDialogs = Dialog.openedDialogs.filter(d => d !== e.detail);

                        if (Dialog.openedDialogs.length === 0)
                            document.body.classList.toggle('modal-open');

                        dialogDiv.remove();
                        backdropDiv.remove();

                        view.unbind();
                        view.detached();
                        view.removeNodes(); // TODO: Use correct destroy method

                        resolve(<TDialog>dialog);
                    }
                });
            });
        });
    }
}
