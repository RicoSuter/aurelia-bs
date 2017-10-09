import { autoinject } from 'aurelia-framework';
import { DialogService } from '../../dialog-service';
import { CustomDialog } from './custom-dialog';

@autoinject
export class Dialog {
    dialogCounter = 1;

    constructor(private dialogService: DialogService) {
    }

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
