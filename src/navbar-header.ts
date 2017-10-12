import { customElement, bindable, containerless } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-navbar-header')
<<<<<<< HEAD
export class BsNavbarHeader {
    @bindable
    @convert(BooleanConverter)
    expanded = false;
=======
export class NavbarHeader {
  @bindable
  @convert(BooleanConverter)
  expanded = false;
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

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
