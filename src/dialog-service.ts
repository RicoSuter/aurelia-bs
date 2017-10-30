import { inject, Container, CompositionEngine, Controller, ViewSlot } from 'aurelia-framework';
import { IDialogBase } from './dialog';
import { BsAlertDialog, IDialogButton } from './dialogs/alert-dialog';
import { BsSettings } from './settings';
import { observable } from 'aurelia-binding';
import { PLATFORM } from 'aurelia-pal';

let translations = {
  'de': {
    'buttonYes': 'Ja',
    'buttonNo': 'Nein'
  },
  'en': {
    'buttonYes': 'Yes',
    'buttonNo': 'No'
  }
};

@inject(CompositionEngine, Container)
export class BsDialogService {
  constructor(
    private compositionEngine: CompositionEngine,
    private container: Container) {
  }

  @observable
  openedDialogs: IDialogBase[] = [];

  alert(title: string, message: string, buttons?: IDialogButton[]) {
    let options = {
      title: title,
      message: message,
      buttons: buttons ? buttons : [
        {
          name: 'ok',
          title: 'OK',
          isDefault: true
        }
      ]
    };

    return this.show<BsAlertDialog>(PLATFORM.moduleName('aurelia-bs/dialogs/alert-dialog'), options).catch(() => {
      return this.show<BsAlertDialog>('dialogs/alert-dialog', options);
    }).then(dlg => {
      return dlg.clickedButton;
    });
  }

  confirm(title: string, message: string) {
    return this.alert(title, message, [
      {
        name: 'no',
        title: translations[BsSettings.language].buttonNo,
        isDefault: false
      },
      {
        name: 'yes',
        title: translations[BsSettings.language].buttonYes,
        isDefault: true
      }
    ]).then(button => {
      return button && button.name === 'yes';
    });
  }

  show<TDialog extends IDialogBase>(viewModelUrl: string, model?: any, created?: (dialog: TDialog) => void): Promise<TDialog> {
    if (document.activeElement && (<any>document.activeElement).blur) {
      (<any>document.activeElement).blur();
    }

    let dialogDiv = document.createElement('div');
    let backdropDiv = document.createElement('div');
    backdropDiv.setAttribute('class', 'modal-backdrop fade in');

    document.body.appendChild(dialogDiv);
    document.body.appendChild(backdropDiv);

    let instruction = {
      model: model,
      viewModel: viewModelUrl,
      container: this.container,
      bindingContext: <any>null,
      viewResources: <any>null,
      viewSlot: new ViewSlot(dialogDiv, true)
    };

    return this.compositionEngine.compose(<any>instruction).then((controller: Controller) => {
      if (this.openedDialogs.length === 0) {
        document.body.classList.toggle('modal-open');
      }

      let view = controller.view;
      let dialog = view.bindingContext as TDialog;
      (<any>dialog).viewModelUrl = viewModelUrl;
      this.openedDialogs = this.openedDialogs.concat([dialog]);

      if (created)
        created(dialog);

      return new Promise<TDialog>((resolve) => {
        view.attached();
        dialog.element.addEventListener('close', (e: CustomEvent) => {
          if (e.detail === dialog) {
            this.openedDialogs = this.openedDialogs.filter(d => d !== e.detail);

            if (this.openedDialogs.length === 0)
              document.body.classList.toggle('modal-open');

            this.removeElement(dialogDiv);
            this.removeElement(backdropDiv);

            view.unbind();
            view.detached();
            view.removeNodes(); // TODO: Use correct destroy method

            resolve(<TDialog>dialog);
          }
        });
      });
    }).catch((e) => {
      this.removeElement(dialogDiv);
      this.removeElement(backdropDiv);
      throw e;
    });
  }

  private removeElement(element: HTMLElement) {
    if (element.remove) {
      element.remove();
    } else if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}
