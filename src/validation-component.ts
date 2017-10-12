import { ValidationController, ValidateResult } from 'aurelia-validation';
import { computedFrom } from 'aurelia-binding';

export function createComponentId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return 'bs_' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export class BsValidateBindingBehavior {
  bind(binding: any) {
    let component = binding.target as ValidationComponent;
    let parent = binding.source.bindingContext;

    if (binding.sourceExpression.expression.object) {
      let parentPropertyName = binding.sourceExpression.expression.object.name;
      component.validatedObject = parent[parentPropertyName];
    } else
      component.validatedObject = parent;

    component.propertyName = binding.sourceExpression.expression.name;

    // TODO: Recursively search parents
    for (let propertyName in parent) {
      if (parent.hasOwnProperty(propertyName) && parent[propertyName] instanceof ValidationController) {
        component.controller = parent[propertyName];
        break;
      }
    }
  }

  unbind() {
  }
}

export class ValidationComponent {
  controller: ValidationController;
  propertyName: string;
  validatedObject: any;

  isBound = false;
  // isInitialized = false;
  // isTouched = false;
  // validateEventRegistered = false;

  bind() {
    this.isBound = true;
    // setTimeout(() => this.isInitialized = true);
  }

  protected valueChanged() {
    if (this.isBound && this.controller) {
      if (!this.propertyName || !this.validatedObject)
        throw new Error('The ValidationComponent is not initialized properly: The property name or validated object could not be retrieved.');

      this.controller.validate({ object: this.validatedObject, propertyName: this.propertyName });

      // if (this.isInitialized)
      //     this.isTouched = true;

      // if (!this.validateEventRegistered) {
      //     this.controller.addRenderer({ render: () => {
      //         if (this.validateEventRegistered)
      //             this.isTouched = true;
      //     } });
      //     this.validateEventRegistered = true;
      // }
    }
  }

  @computedFrom('controller.errors.length') // TODO: Also check content
  get errors(): ValidateResult[] {
    return this.controller ? this.controller.errors.filter(e => e.propertyName === this.propertyName) : [];
  }
}
