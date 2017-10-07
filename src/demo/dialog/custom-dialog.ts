import { DialogService, DialogBase } from '../../index';
import { inject, PLATFORM } from 'aurelia-framework';

@inject(Element, DialogService)
export class CustomDialog extends DialogBase {
    static async show(dialogService: DialogService) {
        await dialogService.show(PLATFORM.moduleName('demo/dialog/custom-dialog'));
    }

    constructor(element: Element, private dialogService: DialogService) {
        super(element);
    }

    async showAlert() {
        await this.dialogService.alert('Alert', 'A second dialog.');
    }
}