import { customElement, bindable, containerless } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-navbar-header')
export class BsNavbarHeader {
  @bindable
  @convert(BooleanConverter)
  expanded = false;

  @bindable
  brand = '';

  elm: Element;

  attached() {
    this.elm.addEventListener('click', () => {
      this.toggle();
    }, true);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}
