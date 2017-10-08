# Dialogs

TBD.

```
import { DialogService } from 'aurelia-bs';

@autoinject
export class DialogDemo {
    constructor(private dialogService: DialogService) {
    }

    async showAlert() {
        await this.dialogService.alert('Hello', 'World!');
    }
}
```

Methods of DialogService: 

- alert(title, text): Shows a message box. 
- confirm(title, text): Shows a yes/no dialog.
- show(): Shows a custom dialog
  

## Implement a custom dialog

TBD.
