import { customElement, bindable, containerless, bindingMode, observable } from 'aurelia-framework';
import { ValidationComponent, createComponentId } from './validation-component';
import { convert, BooleanConverter } from './convert';

export { BsValidateBindingBehavior } from './validation-component';

@containerless
@customElement('bs-textbox')
export class Textbox extends ValidationComponent {
    id = createComponentId();

    constructor(private root: Element) {
        super();
    }

    @observable
    private element: HTMLInputElement;

    @bindable
    label = '';

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    value = '';

    @bindable
    placeholder = '';

    @bindable
    @convert(BooleanConverter)
    enabled = true;

    @bindable
    @convert(BooleanConverter)
    readonly = false;

    @bindable
    help: string | null = null;

    @bindable
    rows = 1;

    @bindable
    style = '';

    elementChanged() {
        if (this.element) {
            this.element.addEventListener('keyup', (event) => {
                if (event.keyCode === 13) {
                    let event = new CustomEvent('enter-pressed');
                    this.root.dispatchEvent(event);
                }
            });
        }
    }

    focus() {
        this.element.focus();
    }

    selectAll() {
        this.element.setSelectionRange(0, this.element.value.length);
    }
}