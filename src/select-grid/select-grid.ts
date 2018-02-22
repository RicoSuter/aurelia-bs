import { inject, children, customElement, bindable, bindingMode } from 'aurelia-framework';

import { BsValidationComponent, createComponentId } from './../validation-component';
import { BsDialogService } from '../dialog-service';

import { BsSelectGridDialog } from './select-grid-dialog';
import { BsColumn } from '../grid/column';
import { convert, BooleanConverter } from '../convert';
import { BsGridDataRequest, BsGridDataResponse, BsGridDefaults, SelectionMode } from '../grid/grid';
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
  translations = translations[BsSettings.language];

  id = createComponentId();
  controlElement: HTMLDivElement;

  @children('bs-column')
  columns: BsColumn[] = [];

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  values: any[] | null = null;

  @bindable()
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

  @bindable
  selectionMode: SelectionMode = SelectionMode.single;

  constructor(private dialogService: BsDialogService) {
    super();
  }

  async showPicker() {
    if (this.enabled) {
      await this.dialogService.show<BsSelectGridDialog>('aurelia-bs/select-grid/select-grid-dialog', this).catch(() => {
        return this.dialogService.show<BsSelectGridDialog>('select-grid/select-grid-dialog', this);
      }).then((dialog: BsSelectGridDialog) => {
        if (this.selectionMode === SelectionMode.multiple) {
          this.values = dialog.values;
        } else if (dialog.value !== undefined) {
          this.value = dialog.value;
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