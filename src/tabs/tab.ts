import { customElement, bindable, observable } from 'aurelia-framework';

export let TabDefaults = {
    style: ''
};

@customElement('bs-tab')
export class BsTab {
    @bindable
    id: string = '';

    @observable
    active = false;

    @bindable
    style = TabDefaults.style;

    @bindable
    header: any = '';

    @bindable
    panel: boolean = true;

    @bindable
    visible: boolean = true;
}
