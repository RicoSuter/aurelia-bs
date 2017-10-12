import { customElement, bindable, containerless } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-expander')
<<<<<<< HEAD
export class BsExpander {
    @bindable
    header = '[no header]';
=======
export class Expander {
  @bindable
  header = '[no header]';
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @bindable
  @convert(BooleanConverter)
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
