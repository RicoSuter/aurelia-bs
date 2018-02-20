import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { computedFrom } from 'aurelia-binding';

import { BsValidationComponent } from './validation-component';
import { convert, BooleanConverter } from './convert';
export { BsValidateBindingBehavior } from './validation-component';
import { BsSettings } from './settings';

let translations = {
  'de': {
    'select': '<Bitte wählen>'
  },
  'en': {
    'select': '<Please select>'
  }
};

@containerless
@customElement('bs-select')
export class BsSelect extends BsValidationComponent {
  translations = translations[BsSettings.language];

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  values: any = null;

  @bindable
  items: any[] | null = null;

  @bindable
  valuePath: string | null = null;

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  readonly = false;

  @bindable
  help: string | null = null;

  @bindable
  @convert(BooleanConverter)
  required = false;

  @bindable
  displayPath: string | null = null;

  @bindable
  @convert(BooleanConverter)
  multiple = false;

  @bindable
  height: number | undefined = undefined;

  private select: HTMLSelectElement;
  private changing = false;

  attached() {
    this.updateSelection(false);
  }

  @computedFrom('multiple', 'required', 'value', 'items')
  get renderNullOption() {
    if (this.multiple)
      return false;

    if (this.valuePath)
      return !this.required || (this.items && this.items.filter(i => this.getValue(i, this.valuePath!) === this.value).length === 0);
    else
      return !this.required || (this.items && this.items.indexOf(this.value) === -1);
  }

  protected itemsChanged() {
    setTimeout(() => this.updateSelection(false));
  }

  protected valueChanged() {
    if (!this.changing) {
      this.values = this.value ? [this.value] : null;
    }

    super.valueChanged();
    this.updateSelection(true);
  }

  protected valuesChanged() {
    if (!this.changing) {
      this.value = this.values && this.values.length > 0 ? this.values[0] : null;
    }

    super.valueChanged();
    this.updateSelection(true);
  }

  protected updateSelection(repeat: boolean) {
    if (this.items && this.select) {
      this.changing = true;

      let values = this.values ? this.values : (this.value ? [this.value] : []);
      for (let i = 0; i < this.select.options.length; i++) {
        let option = this.select.options[i];
        if (option.value === 'null') {
          option.selected = values.length === 0;
        } else {
          let item = this.items[parseInt(option.value)];
          let value = this.valuePath ? this.getValue(item, this.valuePath) : item;
          option.selected = values.indexOf(value) !== -1;
        }
      }

      if (repeat) {
        setTimeout(() => {
          this.updateSelection(false);
        });
      }

      this.changing = false;
    }
  }

  public onChange() {
    if (!this.changing) {
      let selectedItems: any[] | null = [];
      for (let o of <any>this.select.options) {
        if (o.selected) {
          let option = o as HTMLOptionElement;
          if (option.value === 'null') {
            selectedItems = null;
            break;
          }

          let item = this.items![parseInt(option.value)];
          if (this.valuePath) {
            selectedItems.push(this.getValue(item, this.valuePath));
          } else {
            selectedItems.push(item);
          }
        }
      }

      this.changing = true;
      this.values = selectedItems;
      this.value = selectedItems != null && selectedItems.length > 0 ? selectedItems[0] : null;
      this.changing = false;
    }
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
