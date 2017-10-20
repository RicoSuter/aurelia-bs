import * as moment from 'moment';
import { autoinject } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { BsValidation } from '../../validation';
import { BsFileDescription } from '../../fileupload';

@autoinject
export class Validation {
  controller: ValidationController;

  firstName: string | null;
  dateOfBirth: moment.Moment | null = null;
  image: BsFileDescription | null;

  selection: string | undefined = undefined;
  selections: string[];

  constructor(private validation: BsValidation) {
    let rules = ValidationRules
      .ensure((v: Validation) => v.dateOfBirth)
      .required()
      .withMessage('Please pick a date of birth.')
      .then()
      .ensure((v: Validation) => v.dateOfBirth)
      .satisfies((m: any) => moment().isAfter(m))
      .withMessage('Please pick a date of birth in the past.')
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