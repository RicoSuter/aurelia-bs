import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { BsSettings } from './settings';

let translations = {
  'de': {
    'noItems': '<Keine Auswahl>'
  },
  'en': {
    'noItems': '<No selection>'
  }
};

@containerless
@customElement('bs-label-collection')
<<<<<<< HEAD
export class BsLabelCollection {
    translations = (<any>translations)[BsSettings.language];
=======
export class LabelCollection {
  translations = (<any>translations)[BsSettings.language];
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  items: any[];

  @bindable
  displayPath: string | null = null;

  @bindable
  enabled = true;

  removeItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  protected getValue(item: any, path: string) {
    if (item) {
      let value = item;
      let pathArray = path.split('.');
      for (let prop of pathArray) {
        value = value[prop];
      }
      return value;
    }
    return null;
  }
}