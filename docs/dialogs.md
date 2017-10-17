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

## Implement a dialog in aurelia-bs

In order to make dialogs in aurelia-bs work in the NPM module and in the demo, you need to: 

- Add the dialog to `package.json` in the path `aurelia.build.resources`
- Manually add the dialog to `webpack.config.js` in the `entry.app` section (required for the demo app)
- Open a dialog in the following way (required for the demo app): 

```typescript
return this.show<BsAlertDialog>('aurelia-bs/dialogs/alert-dialog', options).catch(() => {
  return this.show<BsAlertDialog>('dialogs/alert-dialog', options);
}).then(dlg => {
  return dlg.clickedButton;
});
```

First load the `aurelia-bs` based dialog (used when distributed via NPM), if this fails, use the relative path (required for the demo app). 