import { BsDialogService, DialogBase } from '../../index';
import { inject, PLATFORM } from 'aurelia-framework';

@inject(Element, BsDialogService)
export class CustomDialog extends DialogBase {
    static async show(dialogService: BsDialogService) {
        await dialogService.show(PLATFORM.moduleName('demo/dialog/custom-dialog'));
    }

    constructor(element: Element, private dialogService: BsDialogService) {
        super(element);
    }

    async showAlert() {
        await this.dialogService.alert('Alert', 'A second dialog.');
    }
}