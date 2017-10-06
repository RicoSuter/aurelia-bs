import * as moment from 'moment';
import { autoinject } from "aurelia-framework";
import { DialogService } from '../../dialog-service';

@autoinject
export class Dialog {
    dialogCounter = 1;

    constructor(private dialogService: DialogService) {
    }

    showAlert() {
        this.dialogService.alert('Hello World!', 'This is dialog #' + this.dialogCounter++);
    }
}
