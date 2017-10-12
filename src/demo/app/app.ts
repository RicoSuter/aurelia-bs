import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([{
      route: ['', 'common'],
      name: 'common',
      settings: { icon: 'education' },
      moduleId: PLATFORM.moduleName('../common/common'),
      nav: true,
      title: 'Common Controls'
    }, {
      route: 'content',
      name: 'content',
      settings: { icon: 'home' },
      moduleId: PLATFORM.moduleName('../content/content'),
      nav: true,
      title: 'Content Controls'
    }, {
      route: 'dialog',
      name: 'dialog',
      settings: { icon: 'education' },
      moduleId: PLATFORM.moduleName('../dialog/dialog'),
      nav: true,
      title: 'Dialogs'
    }, {
      route: 'validation',
      name: 'validation',
      settings: { icon: 'education' },
      moduleId: PLATFORM.moduleName('../validation/validation'),
      nav: true,
      title: 'Validation'
    }, {
      route: 'scroll',
      name: 'scroll',
      settings: { icon: 'education' },
      moduleId: PLATFORM.moduleName('../scroll/scroll'),
      nav: true,
      title: 'bs-scroll'
    }, {
      route: 'grid',
      name: 'grid',
      settings: { icon: 'education' },
      moduleId: PLATFORM.moduleName('../grid/grid'),
      nav: true,
      title: 'bs-grid'
    }]);

    this.router = router;
  }
}
