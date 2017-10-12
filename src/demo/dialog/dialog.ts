import { autoinject } from 'aurelia-framework';
import { BsDialogService } from '../../dialog-service';
import { CustomDialog } from './custom-dialog';

@autoinject
export class Dialog {
  dialogCounter = 1;

<<<<<<< HEAD
    constructor(private dialogService: BsDialogService) {
    }
=======
  constructor(private dialogService: DialogService) {
  }
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  async showAlert() {
    await this.dialogService.alert('Hello World!', 'This is dialog #' + this.dialogCounter++);
  }

  async showConfirm() {
    await this.dialogService.confirm('Confirm', 'Please choose wisely.');
  }

  async showCustom() {
    await CustomDialog.show(this.dialogService);
  }
}
