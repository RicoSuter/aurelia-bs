import { inject } from 'aurelia-framework';
import { observable } from 'aurelia-binding';

import { DialogBase } from '../dialog';
import { Column } from '../grid/column';
import { Grid, GridDataRequest, GridDataResponse } from '../grid/grid';
import { Textbox } from '../textbox';
import { SelectGrid } from './select-grid';
import { BsSettings } from '../settings';

export interface IDialogButton {
  name?: string;
  title: string;
  isDefault?: boolean;
}

let translations = {
  'de': {
    'buttonCancel': 'Abbrechen',
    'buttonNoSelection': 'Keine Auswahl'
  },
  'en': {
    'buttonCancel': 'Cancel',
    'buttonNoSelection': 'No Selection'
  }
};

@inject(Element)
export class SelectGridDialog extends DialogBase {
  translations = (<any>translations)[BsSettings.language];

  @observable
  title: string;

  @observable
  filter = '';

  @observable
  items: any[] | null = [1, 2, 3];

  @observable
  required: boolean;

  @observable
  selectedItem: any | null | undefined = undefined;

  grid: Grid;
  filterBox: Textbox;
  columns: Column[];
  itemHeight: number;

  @observable
  loadData: (request: GridDataRequest) => Promise<GridDataResponse>;

  @observable
  defaultSortColumn: string;

  @observable
  defaultSortOrder: 'asc' | 'desc' = 'asc';

  activate(selectGrid: SelectGrid) {
    this.title = selectGrid.label;
    this.items = selectGrid.items;
    this.itemHeight = selectGrid.itemHeight;
    this.required = selectGrid.required;
    this.columns = selectGrid.columns;
    this.loadData = selectGrid.loadData;
    this.defaultSortColumn = selectGrid.defaultSortColumn;
    this.defaultSortOrder = selectGrid.defaultSortOrder;
  }

  attached() {
    this.grid.columns = this.columns;
    this.grid.itemHeight = this.itemHeight;
    this.grid.columnsChanged();
    this.filterBox.focus();
  }

  enterPressed() {
    if (this.grid.displayedRows && this.grid.displayedRows.length === 1) {
      this.selectedItem = this.grid.displayedRows[0];
      this.close();
    }
  }

  selectedItemChanged() {
    if (this.selectedItem) {
      this.close();
    }
  }

  none() {
    this.selectedItem = null;
    this.close();
  }

  cancel() {
    this.selectedItem = undefined;
    this.close();
  }
}
