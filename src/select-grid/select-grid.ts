import { inject, children, customElement, bindable, bindingMode, PLATFORM } from 'aurelia-framework';

import { BsValidationComponent, createComponentId } from './../validation-component';
import { BsDialogService } from '../dialog-service';

import { BsSelectGridDialog } from './select-grid-dialog';
import { BsColumn } from '../grid/column';
import { convert, BooleanConverter } from '../convert';
import { BsGridDataRequest, BsGridDataResponse, BsGridDefaults } from '../grid/grid';
import { BsSettings } from '../settings';

let translations = {
  'de': {
    'select': '<Bitte wählen>'
  },
  'en': {
    'select': '<Please select>'
  }
};

@inject(BsDialogService)
@customElement('bs-select-grid')
export class BsSelectGrid extends BsValidationComponent {
  translations = (<any>translations)[BsSettings.language];

  id = createComponentId();
  controlElement: HTMLDivElement;

  @children('bs-column')
  columns: BsColumn[] = [];

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = null;

  @bindable
  items: any[] | null = null;

  @bindable
  displayPath: string | null = null;

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  required = false;

  @bindable
  loadData: (request: BsGridDataRequest) => Promise<BsGridDataResponse>;

  @bindable
  defaultSortColumn: string;

  @bindable
  defaultSortOrder: 'asc' | 'desc' = 'asc';

  @bindable
  itemHeight = BsGridDefaults.itemHeight;

  constructor(private dialogService: BsDialogService) {
    super();
  }

  async showPicker() {
    if (this.enabled) {
      await this.dialogService.show<BsSelectGridDialog>('bs-aurelia/select-grid/select-grid-dialog', this).catch(() => {
        return this.dialogService.show<BsSelectGridDialog>(PLATFORM.moduleName('select-grid/select-grid-dialog'), this);
      }).then((dialog) => {
        if (dialog.selectedItem !== undefined) {
          this.value = dialog.selectedItem;
        }
        this.controlElement.focus();
      });
    }
  }

  keyPressed(event: KeyboardEvent) {
    if (this.enabled) {
      if (event.which === 13) {
        this.showPicker();
      }
      event.preventDefault();
    }
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