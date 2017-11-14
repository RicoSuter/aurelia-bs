import { customElement, bindable } from 'aurelia-framework';
import { convert, BooleanConverter } from '../convert';

@customElement('bs-accordion-item')
export class BsAccordionItem {
  @bindable
  id: string = '';

  @bindable
  header = '[no header]';

  @bindable
  headerClass = '';

  @bindable
  class = '';

  @bindable
  @convert(BooleanConverter)
  selected = false;

  itemSelectedCallback: () => void;

  selectedChanged(newValue: boolean) {
    if (newValue) {
      this.itemSelectedCallback();
    }
  }

  toggle() {
    this.selected = !this.selected;
  }
}
