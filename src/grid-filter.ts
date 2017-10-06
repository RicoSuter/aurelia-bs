import { observable, customElement, containerless, bindingMode } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';

import { Textbox } from './textbox';

@containerless
@customElement('bs-grid-filter')
export class GridFilter {
    filterBox: Textbox;

    @observable
    showFilter = false;

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    filter = '';

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
