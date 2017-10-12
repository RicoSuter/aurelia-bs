import { customElement, bindable, containerless, bindingMode, inject } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

export { BsValidateBindingBehavior } from './validation-component';

@containerless
@inject(Element)
@customElement('bs-searchbox')
export class BsSearchbox {
    private inputElement: HTMLInputElement;

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
    button = 'Search';

    @bindable
    allowEmpty = false;

    constructor(private element: Element) {
    }

    attached() {
        this.inputElement.addEventListener('keyup', (event) => {
            if (event.keyCode === 13) {
                this.onClick();
            }
        });
    }

    focus() {
        this.inputElement.focus();
    }

    onClick() {
        if (this.enabled && (this.value || this.allowEmpty)) {
            let event = new CustomEvent('click');
            this.element.dispatchEvent(event);
        }
    }
}
