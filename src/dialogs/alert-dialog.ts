import { inject } from 'aurelia-framework';
import { DialogBase } from '../dialog';

export interface IDialogButton {
  name?: string;
  title: string;
  isDefault?: boolean;
}

@inject(Element)
export class BsAlertDialog extends DialogBase {
  title = '[no title]';
  message = '[no message]';
  buttons: IDialogButton[] = [];

  clickedButton: IDialogButton | null = null;

  activate(model: { title: string, message: string, buttons: IDialogButton[] }) {
    this.title = model.title;
    this.message = model.message;
    this.buttons = model.buttons;
  }

  buttonClicked(button: IDialogButton) {
    this.clickedButton = button;
    this.close();
  }
}
