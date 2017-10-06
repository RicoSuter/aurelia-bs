/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

import * as Promise from 'bluebird';

Promise.config({
    longStackTraces: false,
    warnings: false // note, run node with --trace-warnings to see full stack traces for warnings
});
(<any>window).Promise = Promise;

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .globalResources([
      PLATFORM.moduleName('dialog'),
      PLATFORM.moduleName('scroll'),
      PLATFORM.moduleName('checkbox'),
      PLATFORM.moduleName('resize-container'),
      PLATFORM.moduleName('textbox'),
      PLATFORM.moduleName('searchbox'),
      PLATFORM.moduleName('datepicker'),
      PLATFORM.moduleName('select'),
      PLATFORM.moduleName('expander'),
      PLATFORM.moduleName('fileupload'),
      PLATFORM.moduleName('loader'),
      PLATFORM.moduleName('navbar-header'),
      PLATFORM.moduleName('button'),
      PLATFORM.moduleName('label-collection'),
      PLATFORM.moduleName('grid-filter'),
      PLATFORM.moduleName('select-grid/select-grid'),
      PLATFORM.moduleName('grid/grid'),
      PLATFORM.moduleName('grid/column'),
      PLATFORM.moduleName('tabs/tabs'),
      PLATFORM.moduleName('tabs/tab')]);

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('demo/app/app')));
}
