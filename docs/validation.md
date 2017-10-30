# Validation

To enable validation, inject `BsValidation`, register some Aurelia rules and assign the created controller to a `controller` property:

```typescript
import * as moment from 'moment';

import { autoinject } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';

import { BsValidation } from 'aurelia-bs';

@autoinject
export class SampleView {
  controller: ValidationController;

  dateOfBirth: moment.Moment | null = null;

  constructor(private validation: BsValidation) {
    let rules = ValidationRules
      .ensure((vm: SampleView) => vm.dateOfBirth)
      .required()
      .withMessage('Please pick a date of birth.');

    this.validation.registerObjectRules(this, rules);
    this.controller = validation.controller;
  }

  ...
```

Then in the HTML, the binding needs the `bsValidate` behavior:

```html
<bs-datepicker value.bind="dateOfBirth & bsValidate">
</bs-datepicker>
```
