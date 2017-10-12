import { observable, customElement, containerless, bindingMode } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';

import { BsTextbox } from './textbox';

@containerless
@customElement('bs-grid-filter')
<<<<<<< HEAD
export class BsGridFilter {
    filterBox: BsTextbox;
=======
export class GridFilter {
  filterBox: Textbox;
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

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
