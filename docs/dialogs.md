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

## Implement a custom dialog

TBD.
