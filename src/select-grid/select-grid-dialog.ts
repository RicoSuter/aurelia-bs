import { inject } from 'aurelia-framework';
import { observable } from 'aurelia-binding';

import { DialogBase } from '../dialog';
import { BsColumn } from '../grid/column';
import { BsGrid, BsGridDataRequest, BsGridDataResponse } from '../grid/grid';
import { BsTextbox } from '../textbox';
import { BsSelectGrid } from './select-grid';

export interface IDialogButton {
    name?: string;
    title: string;
    isDefault?: boolean;
}

@inject(Element)
export class BsSelectGridDialog extends DialogBase {
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

    grid: BsGrid;
    filterBox: BsTextbox;
    columns: BsColumn[];
    itemHeight: number;

    @observable
    loadData: (request: BsGridDataRequest) => Promise<BsGridDataResponse>;

    @observable
    defaultSortColumn: string;

    @observable
    defaultSortOrder: 'asc' | 'desc' = 'asc';

    activate(selectGrid: BsSelectGrid) {
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
