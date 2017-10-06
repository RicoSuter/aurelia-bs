import * as moment from 'moment';
import { autoinject } from "aurelia-framework";
import { DialogService } from '../../dialog-service';

@autoinject
export class Home {
    dialogCounter = 0;

    constructor(private dialogService: DialogService) {
    }

    showAlert() {
        this.dialogService.alert('Hello', 'World!' + this.dialogCounter++);
    }
}
