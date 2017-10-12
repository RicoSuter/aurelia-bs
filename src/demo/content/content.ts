import { autoinject } from 'aurelia-framework';
import { BsDialogService } from '../../dialog-service';

@autoinject
export class Content {
  dialogCounter = 0;

<<<<<<< HEAD
    constructor(private dialogService: BsDialogService) {
    }
=======
  constructor(private dialogService: DialogService) {
  }
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  showAlert() {
    this.dialogService.alert('Hello', 'World!' + this.dialogCounter++);
  }
}
