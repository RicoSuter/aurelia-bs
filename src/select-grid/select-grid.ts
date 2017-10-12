import { inject, children, customElement, bindable, bindingMode, PLATFORM } from 'aurelia-framework';

import { ValidationComponent, createComponentId } from './../validation-component';
import { BsDialogService } from '../dialog-service';

import { BsSelectGridDialog } from './select-grid-dialog';
import { BsColumn } from '../grid/column';
import { convert, BooleanConverter } from '../convert';
<<<<<<< HEAD
import { BsGridDataRequest, BsGridDataResponse, GridDefaults } from '../grid/grid';
=======
import { GridDataRequest, GridDataResponse, GridDefaults } from '../grid/grid';
import { BsSettings } from '../settings';

let translations = {
  'de': {
    'select': '<Bitte wählen>'
  },
  'en': {
    'select': '<Please select>'
  }
};
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

@inject(BsDialogService)
@customElement('bs-select-grid')
<<<<<<< HEAD
export class BsSelectGrid extends ValidationComponent {
    id = createComponentId();
    controlElement: HTMLDivElement;

    @children('bs-column')
    columns: BsColumn[] = [];
=======
export class SelectGrid extends ValidationComponent {
  translations = (<any>translations)[BsSettings.language];

  id = createComponentId();
  controlElement: HTMLDivElement;
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @children('bs-column')
  columns: Column[] = [];

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

<<<<<<< HEAD
    @bindable
    loadData: (request: BsGridDataRequest) => Promise<BsGridDataResponse>;
=======
  @bindable
  @convert(BooleanConverter)
  required = false;
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  @bindable
  loadData: (request: GridDataRequest) => Promise<GridDataResponse>;

  @bindable
  defaultSortColumn: string;

  @bindable
  defaultSortOrder: 'asc' | 'desc' = 'asc';

<<<<<<< HEAD
    constructor(private dialogService: BsDialogService) {
        super();
    }

    async showPicker() {
        if (this.enabled) {
            let dialog = await this.dialogService.show<BsSelectGridDialog>(PLATFORM.moduleName('select-grid/select-grid-dialog'), this);
            if (dialog.selectedItem !== undefined) {
                this.value = dialog.selectedItem;
            }
            this.controlElement.focus();
        }
    }
=======
  @bindable
  itemHeight = GridDefaults.itemHeight;

  constructor(private dialogService: DialogService) {
    super();
  }
>>>>>>> 63959ed584db0b2387158b968b0f18b6e1876a38

  async showPicker() {
    if (this.enabled) {
      let dialog = await this.dialogService.show<SelectGridDialog>(PLATFORM.moduleName('select-grid/select-grid-dialog'), this);
      if (dialog.selectedItem !== undefined) {
        this.value = dialog.selectedItem;
      }
      this.controlElement.focus();
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