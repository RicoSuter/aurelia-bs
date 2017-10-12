import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { BsValidationComponent, createComponentId } from './validation-component';
import { convert, BooleanConverter } from './convert';

export { BsValidateBindingBehavior } from './validation-component';

@containerless
@customElement('bs-checkbox')
export class BsCheckbox extends BsValidationComponent {
  id = createComponentId();

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
