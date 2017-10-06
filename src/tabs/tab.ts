import { customElement, bindable } from 'aurelia-framework';

@customElement('bs-tab')
// @containerless
export class Tab {
    active = false;

    @bindable
    header: any = '';

    @bindable
    id: string = '';

    @bindable
    panel: boolean = true;
}
