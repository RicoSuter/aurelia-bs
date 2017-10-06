import { customElement, bindable, observable } from 'aurelia-framework';

@customElement('bs-tab')
export class Tab {
    @bindable
    id: string = '';

    @observable
    active = false;

    @bindable
    header: any = '';

    @bindable
    panel: boolean = true;

    @bindable
    visible: boolean = true;
}
