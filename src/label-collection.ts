import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { BsSettings } from './settings';
import { BsValidationComponent } from './validation-component';
import { computedFrom } from 'aurelia-binding';

let translations = {
  'de': {
    'noValue': '<Keine Auswahl>'
  },
  'en': {
    'noValue': '<No selection>'
  }
};

@containerless
@customElement('bs-label-collection')
export class BsLabelCollection extends BsValidationComponent {
  translations = translations[BsSettings.language];

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  values: any[];

  @bindable
  displayPath: string | null = null;

  @bindable
  enabled = true;

  @bindable
  orderBy: string;

  @bindable
  sortOrder: undefined | 'asc' | 'desc' = undefined;

  @computedFrom('values')
  get sortedValues() {
    if (this.orderBy) {
      return this.values.sort((a, b) => this.sort(a, b));
    }
    return this.values;
  }

  removeValue(value: any) {
    this.values = this.values.filter(i => i !== value);
  }

  itemsChanged() {
    super.valueChanged();
  }

  protected getValue(value: any, path: string) {
    if (value) {
      let pathArray = path.split('.');
      for (let prop of pathArray) {
        value = value[prop];
      }
      return value;
    }
    return null;
  }

  private sort(objA: any, objB: any) {
    let asc = this.sortOrder == 'asc';
    let a = this.getValue(objA, this.orderBy);
    let b = this.getValue(objB, this.orderBy);
    if (!a && !b)
      return 0;
    if (!a)
      return asc ? -1 : 1;
    if (!b)
      return asc ? 1 : -1;
    if (typeof a == 'number' && typeof (b) == 'number') {
      if (a > b)
        return asc ? 1 : -1;
      if (a < b)
        return asc ? -1 : 1;
      return 0;
    }
    if (a.toLowerCase() > b.toLowerCase())
      return asc ? 1 : -1;
    if (a.toLowerCase() < b.toLocaleLowerCase())
      return asc ? -1 : 1;
    return 0;
  }
}