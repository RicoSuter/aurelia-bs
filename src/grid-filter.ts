import { observable, customElement, containerless, bindingMode } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';

import { BsTextbox } from './textbox';

@containerless
@customElement('bs-grid-filter')
export class BsGridFilter {
  filterBox: BsTextbox;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  filter = '';

  @bindable
  position: 'left' | 'right' = 'right';

  @observable
  showFilter = false;

  @bindable
  tabindex: number = 0;

  toggleFilter() {
    this.showFilter = !this.showFilter;
    if (this.showFilter) {
      setTimeout(() => {
        this.filterBox.focus();
        this.filterBox.selectAll();
      });
    }
  }
}
