import { customElement, bindable, containerless } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-expander')
export class Expander {
  @bindable
  header = '[no header]';

  @bindable
  @convert(BooleanConverter)
  expanded = false;

  toggle() {
    this.expanded = !this.expanded;
  }
}
