import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';
import { language } from './validation';

let translations = {
    'de': {
        'noItems': '<Keine>'
    },
    'en': {
        'noItems': '<None>'
    }
};

@containerless
@customElement('bs-label-collection')
export class LabelCollection {
    translations = (<any>translations)[language];

    @bindable
    label = '';

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    items: any[];

    @bindable
    displayPath: string | null = null;

    @bindable
    enabled = true;

    removeItem(item: any) {
        this.items = this.items.filter(i => i !== item);
    }

    protected getValue(item: any, path: string) {
        if (item) {
            let value = item;
            let pathArray = path.split('.');
            for (let prop of pathArray) {
                value = value[prop];
            }
            return value;
        }
        return null;
    }
}