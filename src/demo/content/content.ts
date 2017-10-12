import * as moment from 'moment';
import { autoinject } from 'aurelia-framework';
import { BsDialogService } from '../../dialog-service';

@autoinject
export class Content {
    dialogCounter = 0;

    constructor(private dialogService: BsDialogService) {
    }

    showAlert() {
        this.dialogService.alert('Hello', 'World!' + this.dialogCounter++);
    }
}
