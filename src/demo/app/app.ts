import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([{
            route: ['', 'home'],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('../home/home'),
            nav: true,
            title: 'Home'
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
            route: 'grid',
            name: 'grid',
            settings: { icon: 'education' },
            moduleId: PLATFORM.moduleName('../grid/grid'),
            nav: true,
            title: 'Grid'
        }]);

        this.router = router;
    }
}
