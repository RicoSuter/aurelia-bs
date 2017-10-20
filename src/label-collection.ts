import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { BsSettings } from './settings';

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
export class BsLabelCollection {
  translations = translations[BsSettings.language];

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  values: any[];

  @bindable
  displayPath: string | null = null;

  @bindable
  enabled = true;

  removeValue(value: any) {
    this.values = this.values.filter(i => i !== value);
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
}