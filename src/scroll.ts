import { customElement, inject, bindable } from 'aurelia-framework';
import { ResizeContainer } from './resize-container';

@inject(Element)
@customElement('bs-scroll')
export class Scroll extends ResizeContainer {
    @bindable
    offset = 20;

    @bindable
    limitToContentHeight = false;

    @bindable
    class = '';

    @bindable
    height: number | null = null;

    constructor(element: Element) {
        super(element);
    }

    protected getContainerHeight(child: HTMLElement) {
        return this.height ? parseInt(<any>this.height) : super.getContainerHeight(child);
    }
}
