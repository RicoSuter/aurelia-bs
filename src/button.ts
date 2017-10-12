import { inject, customElement, bindable, containerless } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-button')
@inject(Element)
<<<<<<< HEAD
export class BsButton {
    @bindable
    placeholder = '';
=======
export class Button {
  @bindable
  placeholder = '';
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  primary = false;

  @bindable
  class = '';

  constructor(private element: Element) {
    // convert()(this, 'enabled');
  }

  onClick() {
    if (this.enabled) {
      let event = new CustomEvent('click');
      this.element.dispatchEvent(event);
    }
  }
}
