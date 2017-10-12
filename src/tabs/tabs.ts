import { customElement, children, bindable, bindingMode, observable } from 'aurelia-framework';
import { BsTab } from './tab';

@customElement('bs-tabs')
<<<<<<< HEAD
export class BsTabs {
    @children('bs-tab')
    tabs: BsTab[] = [];

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    selectedTabId: string = '';

    @observable
    private internalTabs: BsTab[] = [];

    bind() {
        if (this.tabs.length > 0) {
            this.updateSelectedTab();
        } else {
            // TODO: Hack for Edge: Remove when https://github.com/aurelia/templating/issues/403 is solved
            setTimeout(() => {
                this.updateSelectedTab();
            });
        }
    }

    selectTab(tab: BsTab) {
        if (tab && this.internalTabs) {
            if (this.internalTabs.find(t => t === tab)) {
                this.internalTabs.forEach(t => t.active = t === tab);
                this.selectedTabId = tab.id;
            } else
                throw Error('Tab could not be found.');
        }
    }
=======
export class Tabs {
  @children('bs-tab')
  tabs: Tab[] = [];

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  selectedTabId: string = '';
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @observable
  private internalTabs: Tab[] = [];

  bind() {
    if (this.tabs.length > 0) {
      this.updateSelectedTab();
    } else {
      // TODO: Hack for Edge: Remove when https://github.com/aurelia/templating/issues/403 is solved
      setTimeout(() => {
        this.updateSelectedTab();
      });
    }
  }

  selectTab(tab: Tab) {
    if (tab && this.internalTabs) {
      if (this.internalTabs.find(t => t === tab)) {
        this.internalTabs.forEach(t => t.active = t === tab);
        this.selectedTabId = tab.id;
      } else
        throw Error('Tab could not be found.');
    }
  }

  tabsChanged() {
    this.internalTabs = this.tabs ? this.tabs : [];
    this.updateSelectedTab();
  }

  selectedTabIdChanged() {
    this.updateSelectedTab();
  }

  private updateSelectedTab() {
    if (this.selectedTabId) {
      let tabs = this.internalTabs.filter((t) => t.id === this.selectedTabId);
      if (tabs.length > 0) {
        this.selectTab(tabs[0]);
        return;
      }
    }

    if (this.internalTabs.length > 0) {
      let tab = this.internalTabs.filter(t => t.active)[0];
      this.selectTab(tab ? tab : this.internalTabs[0]);
    }
  }
}
