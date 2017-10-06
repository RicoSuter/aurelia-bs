import { inject } from 'aurelia-framework';
import { computedFrom } from 'aurelia-binding';
import { ValidationController, ValidationControllerFactory, ControllerValidateResult } from 'aurelia-validation';

@inject(ValidationControllerFactory)
export class BsValidation {
    hasValidated = false;
    hasValidationErrors = false;
    controller: ValidationController;

    @computedFrom('hasValidated', 'hasValidationErrors')
    get canSubmit() {
        return !this.hasValidated || !this.hasValidationErrors;
    }

    constructor(private validationControllerFactory: ValidationControllerFactory) {
        this.controller = this.validationControllerFactory.create();
        this.controller.addObject(this);
        this.controller.addRenderer({
            render: (context: any) => {
                if (context.render.length > 0) {
                    this.hasValidated = true;
                }

                this.hasValidationErrors = this.controller.errors.length > 0;
            }
        });
    }

    validate(): Promise<ControllerValidateResult> {
        return this.controller.validate();
    }

    registerObjectRules(object: any, rules: any) {
        rules.on(object);
        this.controller.addObject(object);
    }
}