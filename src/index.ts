import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName('./dialog'),
    PLATFORM.moduleName('./grid/column'),
    PLATFORM.moduleName('./grid/grid'),
    PLATFORM.moduleName('./select-grid/select-grid'),
    PLATFORM.moduleName('./datepicker'),
    PLATFORM.moduleName('./dialog'),
    PLATFORM.moduleName('./scroll'),
    PLATFORM.moduleName('./checkbox'),
    PLATFORM.moduleName('./resize-container'),
    PLATFORM.moduleName('./textbox'),
    PLATFORM.moduleName('./searchbox'),
    PLATFORM.moduleName('./select'),
    PLATFORM.moduleName('./expander'),
    PLATFORM.moduleName('./fileupload'),
    PLATFORM.moduleName('./loader'),
    PLATFORM.moduleName('./navbar-header'),
    PLATFORM.moduleName('./button'),
    PLATFORM.moduleName('./label-collection'),
    PLATFORM.moduleName('./grid-filter'),
    PLATFORM.moduleName('./tabs/tabs'),
    PLATFORM.moduleName('./tabs/tab')
  ]);
}

export * from './resize-container';

export * from './dialogs/alert-dialog';
export * from './dialog-service';
export * from './dialog';

export * from './grid/column';
export * from './grid/grid';

export * from './select-grid/select-grid';

export * from './tabs/tab';
export * from './tabs/tabs';

export * from './button';
export * from './checkbox';
export * from './datepicker';
export * from './expander';
export * from './fileupload';
export * from './grid-filter';
export * from './label-collection';
export * from './loader';
export * from './navbar-header';
export * from './scroll';
export * from './searchbox';
export * from './select';
export * from './textbox';

export * from './events';
export * from './convert';
export * from './validation-component';
export * from './validation';
