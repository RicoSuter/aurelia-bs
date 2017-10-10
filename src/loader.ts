import { customElement, bindable, containerless, computedFrom } from 'aurelia-framework';
import { convert, BooleanConverter } from './convert';

@containerless
@customElement('bs-loader')
export class Loader {
  @bindable
  @convert(BooleanConverter)
  loading: boolean = false;

  @bindable
  isInline: boolean = false;

  @bindable
  text: string;

  @bindable
  showText: boolean = true;

  @bindable
  collapse: boolean = true;

  @bindable
  position: string = 'middle';

  constructor() {
    convert(BooleanConverter)(this, 'collapse');
    convert(BooleanConverter)(this, 'showText');
    convert(BooleanConverter)(this, 'isInline');
  }

  @computedFrom('text')
  get displayText(): string {
    return this.text || 'Loading...';
  }

  @computedFrom('loading', 'collapse')
  get inlineStyle(): string {
    if (this.loading) {
      return this.collapse ? 'display: inline-block;' : 'visibility: visible;';
    }
    return this.collapse ? 'display: none;' : 'visibility: hidden;';
  }

  @computedFrom('isInline')
  get overlayStyle(): string {
    return this.isInline ? 'position: relative; display: none;' : 'position: relative; display: block;';
  }

  @computedFrom('position')
  get loaderStyle(): string {
    const pos = this.position || 'middle';

    if (/[0-9]+/.test(pos)) {
      return `position: absolute; left: 50%; top: ${pos}; transform: translate(-50%, -50%);`;
    }

    switch (pos.toLowerCase()) {
      case 'top':
        return 'position: absolute; left: 50%; top: 25%; transform: translate(-50%, -50%);';
      case 'middle':
        return 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);';
      case 'bottom':
        return 'position: absolute; left: 50%; top: 75%; transform: translate(-50%, -50%);';
      default:
        console.warn(`${pos} is not supported, use 'top', 'middle' or 'bottom'`);
        return 'position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);';
    }
  }
}
