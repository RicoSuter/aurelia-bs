import { BsAccordionItem } from './accordion-item';
import { customElement, children, bindable, bindingMode } from 'aurelia-framework';

@customElement('bs-accordion')
export class BsAccordion {
  @children('bs-accordion-item')
  items: BsAccordionItem[] = [];

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  selectedItemId: string = '';

  bind() {
    if (this.items.length > 0) {
      this.updateSelectedItem();
    } else {
      // TODO: Hack for Edge: Remove when https://github.com/aurelia/templating/issues/403 is solved
      setTimeout(() => {
        this.updateSelectedItem();
      });
    }
  }

  selectItem(item: BsAccordionItem) {
    if (this.items) {
      if (item) {
        if (this.items.find(t => t === item)) {
          this.items.forEach(t => t.selected = t === item);
          this.selectedItemId = item.id;
        } else
          throw Error('Item could not be found.');
      } else {
        this.items.forEach(t => t.selected = false);
      }
    }
  }

  itemsChanged() {
    let id = 0;
    this.items.forEach(item => {
      if (!item.id) {
        item.id = id.toString();
        id++;
      }
      item.itemSelectedCallback = () => { this.selectItem(item); };
    });
    this.updateSelectedItem();
  }

  selectedItemIdChanged() {
    this.updateSelectedItem();
  }

  private updateSelectedItem() {
    if (this.selectedItemId) {
      let item = this.items.filter((t) => t.id === this.selectedItemId);
      if (item.length > 0) {
        this.selectItem(item[0]);
        return;
      } else {
        this.items.forEach(t => t.selected = false);
      }
    } else {
      this.items.forEach(t => t.selected = false);
    }
  }
}
