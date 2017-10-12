import { customElement, bindable, observable } from 'aurelia-framework';

export let TabDefaults = {
  style: ''
};

@customElement('bs-tab')
<<<<<<< HEAD
export class BsTab {
    @bindable
    id: string = '';
=======
export class Tab {
  @bindable
  id: string = '';
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

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
