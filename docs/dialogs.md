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
- confirm(title, text): boolean: Shows a yes/no dialog.
- show<TDialog extends IDialogBase>(viewUrl: string, model?: any, created?: (dialog: TDialog) => void): Promise<TDialog>()
  

## Implement a custom dialog

TBD.
