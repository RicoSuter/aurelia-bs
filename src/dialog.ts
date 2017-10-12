import { bindable, inject, customElement, View } from 'aurelia-framework';
import { convert, BooleanConverter, StringConverter } from './convert';
import { BsDialogService } from './dialog-service';

@inject(BsDialogService)
@customElement('bs-dialog')
export class BsDialog {
  @bindable
  @convert(StringConverter)
  title = '';

  @bindable
  @convert(BooleanConverter)
  closeOnEscape = true; // TODO: Implement this

  @bindable
  @convert(BooleanConverter)
  showCloseButton = true;

  @bindable
  @convert(BooleanConverter)
  closeOnBackdrop = true;

  dialog: IDialogBase;

  constructor(private dialogService: BsDialogService) {
  }

  bind(_view: any, myView: View) {
    this.dialog = myView.bindingContext as IDialogBase;
  }

  checkDismissClick(event: MouseEvent) {
    let classAttribute = event.srcElement!.getAttribute('class');
    if (this.closeOnBackdrop &&
      this.dialogService.openedDialogs[this.dialogService.openedDialogs.length - 1] === this.dialog &&
      classAttribute && classAttribute.indexOf('modal fade in') !== -1) {

      event.stopPropagation();
      event.preventDefault();
      this.dialog.cancel();
    }
  }
}

@inject(Element)
export class DialogBase implements IDialogBase {
  constructor(public element: Element) {

  }

  viewModelUrl = 'n/a';

  static dispatchCloseEvent(dialog: IDialogBase) {
    let event = new CustomEvent('close', { detail: dialog });
    dialog.element.dispatchEvent(event);
  }

  close() {
    DialogBase.dispatchCloseEvent(this);
  }

  cancel() {
    this.close();
  }
}

export interface IDialogBase {
  element: Element;
  close(): void;
  cancel(): void;
}