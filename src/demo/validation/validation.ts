import * as moment from 'moment';
import { autoinject } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { BsValidation } from '../../validation';
import { BsFileDescription } from '../../fileupload';

@autoinject
export class Validation {
  controller: ValidationController;

<<<<<<< HEAD
    firstName: string | null;
    dateOfBirth: moment.Moment | null = null;
    image: BsFileDescription | null;
=======
  firstName: string | null;
  dateOfBirth: moment.Moment | null = null;
  image: FileDescription | null;
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  selection: string | undefined = undefined;
  selections: string[];

  constructor(private validation: BsValidation) {
    let rules = ValidationRules
      .ensure((v: Validation) => v.dateOfBirth)
      .required()
      .withMessage('Please pick a date of birth.')
      .ensure((v: Validation) => v.firstName)
      .required()
      .withMessage('Please pick a first name.')
      .ensure((v: Validation) => v.image)
      .required()
      .withMessage('Please pick an image.');

    this.validation.registerObjectRules(this, rules);
    this.controller = validation.controller;
  }

  async submit() {
    let result = await this.validation.validate();
    if (result.valid) {
      alert('No errors!');
    }
  }
}