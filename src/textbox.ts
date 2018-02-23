import { customElement, bindable, containerless, bindingMode, observable, inject } from 'aurelia-framework';
import { BsValidationComponent, createComponentId } from './validation-component';
import { convert, BooleanConverter } from './convert';

export { BsValidateBindingBehavior } from './validation-component';

@containerless
@customElement('bs-textbox')
@inject(Element)
export class BsTextbox extends BsValidationComponent {
  id = createComponentId();

  constructor(private root: Element) {
    super();
  }

  @observable
  private element: HTMLInputElement;

  @bindable
  tabindex: number = 0;

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value = '';

  @bindable
  placeholder = '';

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  readonly = false;

  @bindable
  help: string | null = null;

  @bindable
  rows = 1;

  @bindable
  style = '';

  elementChanged() {
    if (this.element) {
      this.element.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 && this.enabled) {
          let event = new CustomEvent('enter-pressed');
          this.root.dispatchEvent(event);
        }
      });
    }
  }

  focus() {
    this.element.focus();
  }

  selectAll() {
    this.element.setSelectionRange(0, this.element.value.length);
  }
}