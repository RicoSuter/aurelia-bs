import { BsDialogService, DialogBase } from '../../index';
import { inject, PLATFORM } from 'aurelia-framework';

@inject(Element, BsDialogService)
export class CustomDialog extends DialogBase {
<<<<<<< HEAD
    static async show(dialogService: BsDialogService) {
        await dialogService.show(PLATFORM.moduleName('demo/dialog/custom-dialog'));
    }

    constructor(element: Element, private dialogService: BsDialogService) {
        super(element);
    }
=======
  static async show(dialogService: DialogService) {
    await dialogService.show(PLATFORM.moduleName('demo/dialog/custom-dialog'));
  }

  constructor(element: Element, private dialogService: DialogService) {
    super(element);
  }
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  async showAlert() {
    await this.dialogService.alert('Alert', 'A second dialog.');
  }
}