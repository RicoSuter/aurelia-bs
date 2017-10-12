import { inject, customElement, bindable, containerless } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-button')
@inject(Element)
export class BsButton {
  @bindable
  placeholder = '';

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
