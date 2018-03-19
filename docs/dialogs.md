# Dialogs

An aurelia-bs predefined dialog can be shown with this code:

```typescript
import { BsDialogService } from 'aurelia-bs';

@autoinject
export class DialogDemo {
    constructor(private dialogService: BsDialogService) {
    }

    async showAlert() {
        await this.dialogService.alert('Hello', 'World!');
    }
}
```

Methods of `BsDialogService`:

- **alert(title, text):** Shows a message box. 
- **confirm(title, text):** Shows a yes/no dialog.
- **show():** Shows a custom dialog

## Implement a custom dialog

1. Implement the view model and view for the custom dialog:

**custom-dialog.ts**

```typescript
import { inject, PLATFORM } from 'aurelia-framework';
import { BsDialogService, DialogBase } from 'aurelia-bs';

@inject(Element, BsDialogService)
export class CustomDialog extends DialogBase {
    message: string;

    static async show(dialogService: BsDialogService, options: { message: string }) {
        await dialogService.show(PLATFORM.moduleName('demo/dialog/custom-dialog'), options);
    }

    constructor(element: Element, private dialogService: BsDialogService) {
        super(element);
    }
    
    activate(options: { message: string }) {
        this.message = options.message;
    }
}
```

**custom-dialog.html**

```html
<template>
  <bs-dialog title.bind="title" dialog-class.bind="modal-dialog my-dialog-class">
    <div class="modal-body">
      <h1>My custom dialog</h1>
      <p>${message}</p>
    </div>
    <div class="modal-footer">
      <bs-button click.trigger="close()">
        Close
      </bs-button>
    </div>
  </bs-dialog>
</template>
```

Bindable Properties of `BsDialog`:
- **dialogClass:** Css class of the dialog (default = 'modal-dialog')

2. Show dialog in another view model:

```typescript
import { inject } from 'aurelia-framework';
import { BsDialogService } from 'aurelia-bs';
import { CustomDialog } from './custom-dialog'

@inject(BsDialogService)
export class MyViewModel {
    constructor(private dialogService: BsDialogService) {
    }
    
    showCustomDialog() {
        CustomDialog.show(this.dialogService, { message: 'This is a custom dialog.' });
    }
}
```

Sample in the demo application:

- [custom-dialog.ts](https://github.com/RSuter/aurelia-bs/blob/master/src/demo/dialog/custom-dialog.ts)
- [custom-dialog.html](https://github.com/RSuter/aurelia-bs/blob/master/src/demo/dialog/custom-dialog.html)

## Development

### Add a new dialog implementation to aurelia-bs

In order to make dialogs in aurelia-bs work in the NPM module and in the demo, you need to: 

- Add the dialog to `package.json` in the path `aurelia.build.resources`
- Manually add the dialog to `webpack.config.js` in the `entry.app` section (required for the demo app)
- Open a dialog in the following way (required for the demo app): 

```typescript
return this.dialogService.show<BsAlertDialog>('aurelia-bs/dialogs/alert-dialog', options).catch(() => {
  return this.dialogService.show<BsAlertDialog>('dialogs/alert-dialog', options);
}).then(dlg => {
  return dlg.clickedButton;
});
```

First load the `aurelia-bs` based dialog (used when distributed via NPM), if this fails, use the relative path (required for the demo app). 
