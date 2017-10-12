import { observable, customElement, containerless, bindingMode } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';

import { Textbox } from './textbox';

@containerless
@customElement('bs-grid-filter')
export class GridFilter {
  filterBox: Textbox;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  filter = '';

  @bindable
  position: 'left' | 'right' = 'right';

  @observable
  showFilter = false;

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
