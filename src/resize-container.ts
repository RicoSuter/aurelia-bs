import { customElement, inject, bindable } from 'aurelia-framework';
import { observable } from 'aurelia-binding';

@inject(Element)
@customElement('bs-resize-container')
export class BsResizeContainer {
  /** Enables the resize container. */
  @bindable
  autoResize = true;

  @bindable
  offset = 20;

  @bindable
  minHeight = 0;

  @bindable
  limitToContentHeight = false;

  @observable
  containerHeight = 0;

  private containerObserver: MutationObserver;
  private onResizeCallback: any = () => { this.updateContainerHeight(true); };
  private currentStyleHeight: string = '';

  constructor(protected element: Element) {
  }

  attached() {
    window.addEventListener('resize', this.onResizeCallback);

    this.registerObserver();
    this.updateContainerHeight(false);

    setTimeout(() => this.updateContainerHeight(true));
  }

  detached() {
    window.removeEventListener('resize', this.onResizeCallback);
    if (this.containerObserver) {
      this.containerObserver.disconnect();
    }
  }

  protected updateContainerHeight(retrigger: boolean) {
    if (this.autoResize) {
      let child = this.getResizedChild();
      if (child) {
        this.containerHeight = this.getContainerHeight(child);
        let styleHeight = this.containerHeight + 'px';

        if (styleHeight !== this.currentStyleHeight) {
          this.currentStyleHeight = styleHeight;
          child.style.height = styleHeight;

          let event = new CustomEvent('changed');
          this.element.dispatchEvent(event);
        }
      }

      if (retrigger) {
        setTimeout(() => this.updateContainerHeight(false), 0);
      }
    }
  }

  protected getResizedChild() {
    return this.element.children[0] as HTMLElement;
  }

  protected getContainerHeight(child: HTMLElement) {
    let box = child.getBoundingClientRect();
    let maxHeight = window.innerHeight - box.top - this.offset;

    let innerChild = child.children[0] as HTMLElement;
    let innerChildHeight = this.getAbsoluteHeight(innerChild);

    if (this.limitToContentHeight && innerChildHeight < maxHeight) {
      maxHeight = innerChildHeight;
    }

    if (maxHeight < this.minHeight) {
      maxHeight = this.minHeight;
    }

    return maxHeight;
  }

  private registerObserver() {
    let config = { attributes: true, childList: true, characterData: true, subtree: true };
    this.containerObserver = new MutationObserver(() => {
      this.updateContainerHeight(true);
    });
    this.containerObserver.observe(document, config);
  }

  private getAbsoluteHeight(el: HTMLElement) {
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    let styles = window.getComputedStyle(el);
    let margin = parseFloat(styles['marginTop']!) +
      parseFloat(styles['marginBottom']!);

    return Math.ceil(el.clientHeight + margin);
  }
}
