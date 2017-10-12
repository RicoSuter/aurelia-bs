import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { ValidationComponent, createComponentId } from './validation-component';
import { convert, BooleanConverter } from './convert';

export { BsValidateBindingBehavior } from './validation-component';

@containerless
@customElement('bs-checkbox')
<<<<<<< HEAD
export class BsCheckbox extends ValidationComponent {
    id = createComponentId();
=======
export class Checkbox extends ValidationComponent {
  id = createComponentId();
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value = false;

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  readonly = false;
}
