import { inject, children, customElement, bindable, bindingMode } from 'aurelia-framework';

import { ValidationComponent, createComponentId } from './../validation-component';
import { DialogService } from '../dialog-service';

import { SelectGridDialog } from './select-grid-dialog';
import { Column } from '../grid/column';
import { convert, BooleanConverter } from '../convert';
import { GridDataRequest, GridDataResponse, GridDefaults } from '../grid/grid';

@inject(DialogService)
@customElement('bs-select-grid')
export class SelectGrid extends ValidationComponent {
    id = createComponentId();
    controlElement: HTMLDivElement;

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

    @bindable
    @convert(BooleanConverter)
    required = false;

    @bindable
    loadData: (request: GridDataRequest) => Promise<GridDataResponse>;

    @bindable
    defaultSortColumn: string;

    @bindable
    defaultSortOrder: 'asc' | 'desc' = 'asc';

    @bindable
    itemHeight = GridDefaults.itemHeight;

    constructor(private dialogService: DialogService) {
        super();
    }

    async showPicker() {
        if (this.enabled) {
            let dialog = await this.dialogService.show<SelectGridDialog>('aurelia-bs/select-grid/select-grid-dialog', this);
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