import { customElement, inject, bindable, children, Container, View, ViewCompiler, ViewResources, ViewSlot } from 'aurelia-framework';
import { computedFrom, bindingMode } from 'aurelia-binding';

import { BsColumn } from './column';
import { Deferred } from './deferred';
import { BsResizeContainer } from '../resize-container';
import { observable } from 'aurelia-binding';

export interface BsGridDataRequest {
  skip: number;
  take: number;

  sortColumn: BsColumn | undefined;
  sortOrder: 'asc' | 'desc';

  filter: string;
}

export interface BsGridDataResponse {
  items: any[] | undefined;
  filteredCount: number;
  totalCount: number;
}

export enum SelectionMode {
  none = <any>'none',
  single = <any>'single',
  multiple = <any>'multiple'
}

export let BsGridDefaults = {
  /** The offset to the bottom of the window used when autoResize is enabled. */
  offset: 75,

  /** The height of a row. */
  itemHeight: 36,

  /** The minimum height of the grid. */
  minHeight: 100,

  /** Hides the filtered count if no filter is set. */
  hideUnfilteredCounter: false,

  /** Hides the paging when there is only a single page. */
  hideSinglePaging: false,

  /** Activates Keyboard events of grid.**/
  useKeyEvents: false,
};

/**
 * The datagrid component can be used to display complex datasets. Specify the
 * columns to display using <column> tags.
 * Example:
 *
 *   <datagrid rows.bind="myDataset">
 *     <column field="name"></column>
 *     <column field="comments" sortable="false">
 *       ${row.comments | newlines}
 *     </column>
 *     <column field="customer reference"></column>
 *     <column field="deadline" searchable="false" sorter.bind="myDateSorter">
 *   </datagrid>
 *
 * See the @bindable properties on the Datagrid and Column classes for all
 * available configuration options.
 */
@inject(Container, Element, ViewCompiler, ViewResources)
@customElement('bs-grid')
export class BsGrid extends BsResizeContainer {

  /**
   * Defines the locale to use for sorting strings, defaults to browser default.
   */
  public static LOCALE: string;

  @bindable
  loadData: ((request: BsGridDataRequest) => Promise<BsGridDataResponse>) | undefined = undefined;

  @bindable
  comparer = (selectionValue: any, item: any) => {
    if (this.valuePath) {
      return selectionValue && item ?
        selectionValue === this.getValue(item, this.valuePath) : false;
    }

    return selectionValue && selectionValue.id && item && item.id ?
      selectionValue.id === item.id : selectionValue === item;
  }

  /** Enables the auto resizing of the grid and shows a scroll when needed. */
  @bindable
  autoResize = true;

  @bindable
  tabindex = 0;

  /** The offset to the bottom of the window used when autoResize is enabled. */
  @bindable
  offset = BsGridDefaults.offset;

  /** Resizes the grid not bigger than the rows height, only used when autoResize is enabled. */
  @bindable
  limitToContentHeight = false;

  /** The fixed height of the grid, only when autoResize is set. */
  @bindable
  height: number | null = null;

  /** The minimum height of the grid, only usable when autoResize is set. */
  @bindable
  minHeight = BsGridDefaults.minHeight;

  /** The height of a row; either use itemHeight or itemsPerPage. */
  @bindable
  itemHeight = BsGridDefaults.itemHeight;

  /** The number of items per page; either use itemHeight or itemsPerPage. */
  @bindable
  itemsPerPage = 0;

  @children('bs-column')
  columns: BsColumn[] = [];

  /** The data to display, given as rows of simple objects. */
  @bindable
  items: any[];

  /** Set to false to disable sorting in the entire datagrid. You can also disable sorting for individual columns: see Column.sortable. */
  @bindable
  sortable = true;

  /** Column to sort on when the grid is first rendered, identified by field. If not set the first sortable column will be used to sort. */
  @bindable
  defaultSortColumn: string;

  /** Order to sort in when the grid is first rendered (undefined uses the defaultSortOrder of the defaultSortColumn). */
  @bindable
  defaultSortOrder: undefined | 'asc' | 'desc' = undefined;

  /** Set to false to disable animation when first showing the datagrid. */
  @bindable
  animate = true;

  /** The total count of items. */
  @bindable
  totalCount = -1;

  filteredCount = -1;
  currentIndex = 0;
  pageSize = 0;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = undefined;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  values: any[] = [];

  @bindable
  selectionMode = SelectionMode.none;

  @bindable
  enabled = true;

  @bindable
  filter: string = '';

  /** Sets the additional row CSS classes ('row' is available in the binding). */
  @bindable
  rowClass = '';

  /** Set to false to not automatically initialize data, a manual call to refresh() is required to initialize the data. */
  @bindable
  autoInit = true;

  /** Hides the filtered count if no filter is set. */
  @bindable
  hideUnfilteredCounter = BsGridDefaults.hideUnfilteredCounter;

  /** Hides the paging when there is only a single page. */
  @bindable
  hideSinglePaging = BsGridDefaults.hideSinglePaging;

  @bindable
  showFooter = false;

  @computedFrom('filteredCount', 'pageSize')
  get pageCount() {
    return Math.ceil((this.filteredCount > 0 ? this.filteredCount : 1) / this.pageSize);
  }

  @computedFrom('currentIndex', 'pageSize')
  get currentPage() {
    return this.getPageNumberForIndex(this.currentIndex);
  }

  @computedFrom('sortable', 'rows')
  get rowsSortable() {
    return this.sortable;
  }

  @computedFrom('currentPage', 'pageCount')
  get pages() {
    let pages = [];
    for (let i = this.currentPage - 3; i < this.currentPage + 3 + 1; i++) {
      if (i >= 0 && i < this.pageCount)
        pages.push(i);
    }
    return pages;
  }

  @observable
  private currentSortColumn: BsColumn | undefined;

  @observable
  private currentSortOrder: 'asc' | 'desc';

  /**
   * You can use this in your cell templates to reference the binding context
   * in which the datagrid is used.
   */
  @observable
  private parent: any;

  @observable
  actualItems: any[] | undefined;

  @observable
  displayedItems: any[] | undefined;

  @bindable
  valuePath: string | null = null;

  @bindable
  useKeyEvents: boolean = BsGridDefaults.useKeyEvents;

  private keydownCallback: any;

  private keyboardFocusTimeout: any;

  @observable
  private keyboardFocusIndex: number | undefined = undefined;

  private justSelectedIndex: number | undefined = undefined;

  private hideKeyboardFocus: boolean = false;

  constructor(private container: Container,
    element: Element,
    private viewCompiler: ViewCompiler,
    private viewResources: ViewResources) {
    super(element);
    this.keydownCallback = this.keydownHandler.bind(this);
  }

  bind(bindingContext: any) {
    this.isBound = true;
    this.parent = bindingContext;
  }

  attached() {
    /* TODO: Workaround until aurelia-binding issue #347 is resolved. */
    if (typeof this.animate === 'string')
      this.animate = (<any>this.animate).toLowerCase() === 'false' ? false : true;
    if (typeof this.sortable === 'string')
      this.sortable = (<any>this.sortable).toLowerCase() === 'false' ? false : true;

    this.isBound = true;
    this.pageSize = 0;
    this.body.viewSlot = new ViewSlot(this.bodyElement, true);
    this.header.viewSlot = new ViewSlot(this.headerElement, true);
    this.footer.viewSlot = new ViewSlot(this.headerElement, true);

    this.processColumns();
    this.refreshInternal();

    super.attached();

    this.containerHeightChanged();
    setTimeout(() => {
      this.processColumns();
      this.refreshInternal();
    });
    this.useKeyEventsChanged(this.useKeyEvents, false);
  }

  focus() {
    if (this.useKeyEvents) {
      if (this.element.children[0].tagName === 'div') {
        if (document.activeElement !== this.element.children[0]) {
          (<HTMLDivElement>this.element.children[0]).focus();
        }
      }
    }
  }

  useKeyEventsChanged(value: boolean, oldValue: boolean) {
    if (value) {
      window.addEventListener('keydown', this.keydownCallback, false);
    } else if (oldValue) {
      window.removeEventListener('keydown', this.keydownCallback);
    }
  }
  async keydownHandler(event: KeyboardEvent, forceKeyEvent: boolean = false) {
    if (forceKeyEvent || (this.elementOrChildIsActiveElement(this.element) && this.useKeyEvents)) {
      switch (event.keyCode) {
        case 33:
        case 37:
          await this.showPreviousPage();
          event.preventDefault();
          return;
        case 38:
          await this.focusOnPreviousItem();
          event.preventDefault();
          return;
        case 34:
        case 39:
          await this.showNextPage();
          event.preventDefault();
          return;
        case 40:
          await this.focusOnNextItem();
          event.preventDefault();
          return;
        case 36:
          await this.focusOnFirstItem();
          event.preventDefault();
          return;
        case 35:
          await this.focusOnLastItem();
          event.preventDefault();
          return;
        case 32:
          if (this.selectItemInFocus()) {
            event.preventDefault();
          }
          return;
        case 27:
          this.cancelKeyNavigation();
          event.preventDefault();
          return;
      }
    }
  }

  cancelKeyNavigation() {
    this.keyboardFocusIndex = undefined;
  }

  selectItemInFocus() {
    if (!this.hideKeyboardFocus && this.keyboardFocusIndex !== undefined && this.displayedItems) {
      this.selectRow(this.displayedItems[this.keyboardFocusIndex]);
      return true;
    }
    return false;
  }

  async focusOnPreviousItem() {
    if (this.justSelectedIndex !== undefined) {
      this.keyboardFocusIndex = this.justSelectedIndex;
    }

    if (this.keyboardFocusIndex === undefined) {
      this.keyboardFocusIndex = this.displayedItems ? this.displayedItems.length - 1 : 0;
    } else {
      if (this.keyboardFocusIndex > 0) {
        this.keyboardFocusIndex -= 1;
      } else {
        if (this.currentPage !== 0) {
          await this.showPage(this.currentPage - 1);
          this.keyboardFocusIndex = this.pageSize - 1;
        }
      }
    }
  }

  async focusOnNextItem() {
    if (this.justSelectedIndex !== undefined) {
      this.keyboardFocusIndex = this.justSelectedIndex;
    }

    if (this.keyboardFocusIndex === undefined) {
      this.keyboardFocusIndex = 0;
    } else {
      if (this.displayedItems && this.keyboardFocusIndex + 1 < this.displayedItems.length) {
        this.keyboardFocusIndex += 1;
      } else {
        if (this.currentPage < this.pageCount - 1) {
          await this.showPage(this.currentPage + 1);
          this.keyboardFocusIndex = 0;
        }
      }
    }
  }

  async showPreviousPage() {
    if (this.currentPage > 0) {
      await this.showPage(this.currentPage - 1);
    }

    this.keyboardFocusIndex = this.displayedItems ? this.displayedItems.length - 1 : 0;
  }

  async showNextPage() {
    if (this.currentPage < this.pageCount) {
      await this.showPage(this.currentPage + 1);
    }

    this.keyboardFocusIndex = 0;
  }

  async focusOnFirstItem() {
    if (this.currentPage !== 0) {
      await this.showPage(0);
    }

    this.keyboardFocusIndex = 0;
  }

  async focusOnLastItem() {
    if (this.currentPage !== this.pageCount - 1) {
      await this.showPage(this.pageCount - 1);
    }

    this.keyboardFocusIndex = this.displayedItems ? this.displayedItems.length - 1 : 0;
  }

  keyboardFocusIndexChanged() {
    this.hideKeyboardFocus = false;
    clearTimeout(this.keyboardFocusTimeout);

    this.justSelectedIndex = undefined;
    this.columns[0].propertyChanged();
    this.keyboardFocusTimeout = setTimeout(() => {
      this.hideKeyboardFocus = true;
      this.columns[0].propertyChanged();
    }, 5000);
  }

  detached() {
    if (this.useKeyEvents) {
      window.removeEventListener('keydown', this.keydownCallback, false);
    }

    if (this.body.viewSlot) {
      this.body.viewSlot.removeAll();
      this.body.viewSlot = null;
    }

    if (this.header.viewSlot) {
      this.header.viewSlot.removeAll();
      this.header.viewSlot = null;
    }

    if (this.footer.viewSlot) {
      this.footer.viewSlot.removeAll();
      this.footer.viewSlot = null;
    }

    super.detached();
  }

  unbind() {
    this.isBound = false;
  }

  loadDataChanged() {
    this.refreshInternal();
  }

  columnsChanged() {
    Promise.all(this.columns.map(c => c.waitForBinding())).then(() => this.processColumns());
  }

  itemsChanged() {
    this.refreshInternal();
  }

  filterChanged() {
    this.refreshInternal();
  }

  itemsPerPageChanged() {
    this.containerHeightChanged();
  }

  private timer: any;
  containerHeightChanged() {
    if (this.isBound && this.containerHeight > 0) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      let previousPageSize = this.pageSize;
      this.pageSize = this.itemsPerPage ? this.itemsPerPage : Math.floor((this.containerHeight - this.itemHeight) / this.itemHeight);

      if (previousPageSize !== this.pageSize) {
        if (this.displayedItems && this.displayedItems.length > this.pageSize)
          this.displayedItems = this.displayedItems.slice(0, this.pageSize);

        this.timer = setTimeout(() => {
          this.pageSize = this.itemsPerPage ? this.itemsPerPage : Math.floor((this.containerHeight - this.itemHeight) / this.itemHeight);
          if (this.body) {
            this.refreshInternal();
          }
        }, 100);
      }
    } else {
      this.pageSize = this.itemsPerPage;
    }
  }

  private dirty = false;
  private isBound = false;
  private refreshingGrid = false;

  getCurrentGridDataRequest() {
    return <BsGridDataRequest>{
      skip: this.pageSize * this.currentPage,
      take: this.pageSize,
      sortColumn: this.currentSortColumn,
      sortOrder: this.currentSortOrder,
      filter: this.filter
    };
  }

  async refresh() {
    this.autoInit = true;
    await this.refreshInternal();
  }

  private loadDataFromItems(request: BsGridDataRequest): Promise<BsGridDataResponse> {
    return Promise.resolve(<BsGridDataResponse>{
      items: this.actualItems ? this.actualItems.slice(request.skip, request.skip + request.take) : undefined,
      filteredCount: this.actualItems ? this.actualItems.length : -1,
      totalCount: this.items ? this.items.length : -1
    });
  }

  private async refreshInternal() {
    this.actualItems = this.items ? this.sortItems(this.filterItems(this.items)) : undefined;

    if (!this.autoInit || (!this.loadData && !this.items) || !this.isBound || this.pageSize === 0)
      return;

    if (!this.refreshingGrid) {
      this.refreshingGrid = true;
      let promise = this.items ?
        this.loadDataFromItems(this.getCurrentGridDataRequest()) :
        this.loadData!(this.getCurrentGridDataRequest());
      let result = (<any>promise.then) ? await promise : <any>promise;

      this.totalCount = result.totalCount;
      this.filteredCount = result.filteredCount;
      this.displayedItems = result.items;

      if (this.filteredCount !== -1 && this.currentIndex > this.filteredCount)
        this.currentIndex = 0;

      if (this.bodyElement) {
        if (this.body.scrollListener)
          this.bodyElement.removeEventListener('scroll', this.body.scrollListener);

        this.bodyElement.scrollTop = 0;
        this.bodyElement.classList.add('scrollable-bottom');
        this.body.scrollListener = () => this.onBodyScroll();
        this.bodyElement.addEventListener('scroll', this.body.scrollListener);
      }

      this.rendered = true;
      this.refreshingGrid = false;

      if (this.dirty) {
        this.dirty = false;
        await this.refreshInternal();
      }
    } else
      this.dirty = true;
  }

  getPageNumberForIndex(index: number) {
    return Math.floor(index / this.pageSize);
  }

  async showItemAtIndex(index: number) {
    let previousCurrentPage = this.currentPage;
    this.currentIndex = index;
    let currentPage = this.currentPage;
    if (previousCurrentPage !== currentPage) {
      await this.refreshInternal();
    }
  }

  async showPage(pageNumber: number) {
    if (pageNumber !== this.currentPage && pageNumber >= 0 && pageNumber < this.pageCount) {
      this.currentIndex = this.pageSize * pageNumber;
      this.keyboardFocusIndex = undefined;
      await this.refreshInternal();
      return true;
    }
    return false;
  }

  onColumnHeaderClick(column: BsColumn) {
    if (!column.sortable || !this.rowsSortable)
      return;

    if (column === this.currentSortColumn)
      this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    else {
      this.currentSortColumn = column;
      this.currentSortOrder = this.currentSortColumn.defaultSortOrder;
    }

    return this.refreshInternal();
  }

  // Local row filtering and sorting

  private filterItems(items: any[]) {
    let term = this.filter ? this.filter.toLowerCase().trim() : '';
    let terms = term.split(' ');

    return !term ? items : items.filter(row => {
      return terms.every(t => {
        return this.columns.some(column => {
          if (!column.searchable) {
            return false;
          }

          let values = column.field.map(veld => this.getObjectValueFromPath(veld, row));
          if (column.matcher) {
            return column.matcher.bind(this.parent)(t, values);
          }

          for (let i in values) {
            let value = String(values[i]);
            if (value.toLowerCase().indexOf(t) !== -1) {
              return true;
            }
          }

          return false;
        });
      });
    });
  }

  private sortItems(items: any[]) {
    let orderMultiplier = this.currentSortOrder === 'asc' ? 1 : -1;
    if (!items) {
      return undefined;
    }

    if (this.currentSortColumn && this.currentSortColumn.sorter) {
      return items.slice().sort((a: any, b: any) => {
        return this.currentSortColumn!.sorter(a, b) * orderMultiplier;
      });
    } else if (this.currentSortColumn) {
      let fields = this.currentSortColumn!.field;
      return items.slice().sort((aRow: any, bRow: any) => {
        let aValues = fields.map(field => this.getObjectValueFromPath(field, aRow));
        let bValues = fields.map(field => this.getObjectValueFromPath(field, bRow));
        return this.defaultCompare(aValues, bValues) * orderMultiplier;
      });
    } else
      return items;
  }

  private defaultCompare(aValues: any[], bValues: any[]) {
    for (let i in aValues) {
      if (aValues[i] === undefined && bValues[i] !== undefined)
        return -1;
      else if (bValues[i] === undefined && aValues[i] !== undefined)
        return 1;

      if (typeof aValues[i] === 'string') {
        let comp = aValues[i].localeCompare(bValues[i], BsGrid.LOCALE);
        if (comp !== 0)
          return comp;
      } else if (aValues[i] !== bValues[i])
        return aValues[i] < bValues[i] ? -1 : 1;
    }

    return 0;
  }

  private getObjectValueFromPath(field: string, obj: any) {
    let result: any = obj;
    let parts = field.split('.');
    for (let part of parts) {
      result = result ? result[part] : undefined;
    }
    return result;
  }

  // Rendering the data grid

  public rendered = false;

  public bodyElement: HTMLElement;
  private body = {
    scrollListener: <any>null,
    borderHeight: <any>null,
    viewSlot: <ViewSlot | null>null,
    viewAttached: new Deferred<void>()
  };

  public headerElement: HTMLElement;
  private header = {
    viewSlot: <ViewSlot | null>null,
  };

  public footerElement: HTMLElement;
  private footer = {
    viewSlot: <ViewSlot | null>null,
  };

  protected getResizedChild() {
    return this.element.children[0].children[1] as HTMLElement;
  }

  protected getContainerHeight(child: HTMLElement) {
    return this.height ? parseInt(<any>this.height) : super.getContainerHeight(child);
  }

  // TODO
  // @throttle(100)
  private onBodyScroll() {
    if (this.body.borderHeight === null) {
      this.body.borderHeight = 0;
      let styles = getComputedStyle(this.bodyElement);
      this.body.borderHeight += parseInt(styles.borderTopWidth!, 10);
      this.body.borderHeight += parseInt(styles.borderBottomWidth!, 10);
    }

    let scrollBottom = this.bodyElement.scrollHeight - this.bodyElement.offsetHeight + this.body.borderHeight;

    if (scrollBottom === 0) {
      this.bodyElement.classList.remove('scrollable-top');
      this.bodyElement.classList.remove('scrollable-bottom');
      return;
    }

    if (this.bodyElement.scrollTop === 0) {
      this.bodyElement.classList.remove('scrollable-top');
    } else {
      this.bodyElement.classList.add('scrollable-top');
    }
    if (this.bodyElement.scrollTop === scrollBottom) {
      this.bodyElement.classList.remove('scrollable-bottom');
    } else {
      this.bodyElement.classList.add('scrollable-bottom');
    }
  }

  private processColumnsCallback = () => this.processColumns();
  private processColumns() {
    let columns = this.columns;
    if (!columns || columns.length === 0) {
      columns = [];
      for (let i = 0; i < this.element.children.length; i++) {
        let e: any = this.element.children[i];
        if (e.au && e.au.controller && e.au.controller.viewModel) {
          columns.push(e.au.controller.viewModel);
        }
      }
    }

    if (columns) {
      if (columns.length > 0 &&
        columns[0].rowHeader !== false &&
        !columns.some(column => column.rowHeader)) {
        columns[0].rowHeader = true;
      }

      this.compileRowTemplate(columns);
      this.compileHeaderTemplate(columns);

      this.showFooter = columns.some(column => column.footer !== undefined && column.footer.trim().length > 0);
      if (this.showFooter) {
        this.compileFooterTemplate(columns);
      }

      columns.forEach(c => {
        c.element.removeEventListener('update', this.processColumnsCallback);
        c.element.addEventListener('update', this.processColumnsCallback);
      });

      if (columns.length > 0)
        this.initializeDefaultSortOrder();
    }
  }

  private initializeDefaultSortOrder() {
    if (!this.currentSortColumn) {
      if (this.defaultSortColumn)
        this.currentSortColumn = this.columns.find(column => column.field && column.field.indexOf(this.defaultSortColumn) !== -1);
      else
        this.currentSortColumn = this.columns.find(column => column.sortable);

      if (this.currentSortColumn) {
        this.currentSortOrder = this.defaultSortOrder ?
          this.defaultSortOrder :
          this.currentSortColumn.defaultSortOrder;
      }
    }
  }

  protected selectRow(row: any) {
    if (this.enabled) {
      if (this.selectionMode === SelectionMode.single) {
        let value = this.comparer(this.value, row) ? undefined : row;
        this.value = this.valuePath ? this.getValue(value, this.valuePath) : value;
        this.dispatchSelectionChangedEvent();
      } else if (this.selectionMode === SelectionMode.multiple) {
        let values = this.values && this.values.filter(a => this.comparer(a, row)).length > 0 ?
          this.values.filter(i => !this.comparer(i, row)) :
          (this.values ? this.values.slice().concat([row]) : [row]);

        this.values = this.valuePath ? values.map(v => this.getValue(v, this.valuePath!)) : values;
        this.value = this.values && this.values.length === 1 ? this.values[0] : undefined;

        this.dispatchSelectionChangedEvent();
      }
      if (this.useKeyEvents && this.displayedItems) {
        for (let index = 0; index < this.displayedItems.length; index++) {
          if (this.comparer(row, this.displayedItems[index])) {
            this.justSelectedIndex = index;
          }
        }
      }
    }
  }

  private dispatchSelectionChangedEvent() {
    setTimeout(() => {
      let event = new CustomEvent('selection-changed', {
        detail: {
          selectedItem: this.value,
          selectedItems: this.values,
        }
      });
      this.element.dispatchEvent(event);
    });
  }

  protected isSelected(selectedItem: any, selectedItems: any[], item: any) {
    return selectedItems && (this.comparer(selectedItem, item) || selectedItems.filter(a => this.comparer(a, item)).length > 0);
  }

  protected isInFocus(item: any) {
    if (this.useKeyEvents && !this.hideKeyboardFocus && this.keyboardFocusIndex !== undefined && this.displayedItems && this.displayedItems[this.keyboardFocusIndex]) {
      let value = this.valuePath ? this.getValue(this.displayedItems[this.keyboardFocusIndex], this.valuePath) : this.displayedItems[this.keyboardFocusIndex];
      return this.comparer(value, item);
    }
    return false;
  }

  protected getRowClasses(selectedItem: any, selectedItems: any[], item: any) {
    let rowClasses = '';
    if (this.isSelected(selectedItem, selectedItems, item)) {
      rowClasses += 'selected';
    }
    if (this.isInFocus(item)) {
      if (rowClasses) {
        rowClasses += ' ';
      }
      rowClasses += 'focus';
    }
    if (this.rowClass) {
      if (rowClasses) {
        rowClasses += ' ';
      }
      rowClasses += this.rowClass;
    }
    return rowClasses;
  }

  private compileRowTemplate(columns: BsColumn[]) {
    if (this.body.viewSlot) {
      let rowClass = this.element.getAttribute('row-class.bind');
      if (!rowClass) rowClass = this.element.getAttribute('row-class.one-way');
      if (!rowClass) rowClass = '\'rowClass\'';

      let row = document.createElement('tr');
      row.setAttribute('repeat.for', 'row of displayedItems');
      row.setAttribute('click.trigger', 'selectRow(row)');
      row.setAttribute('style.bind', `selectionMode !== 'none' ? (enabled ? 'cursor: pointer' : 'cursor: not-allowed') : ''`);
      row.setAttribute('class.bind', `getRowClasses(value, values, row)`);

      let view = this.columnsToView(columns, (column: BsColumn, index: number) => {
        const el = column.rowHeader ? 'th' : 'td';
        return `<${el} class.bind="columns[${index}].cellClass" style.bind="(columns[${index}].width ? 'width: ' + columns[${index}].width + 'px;' : '')">${column.cellTemplate}</${el}>`;
      }, row);

      attachView(view, this.body.viewSlot).then(() => {
        if (!this.body.viewAttached.isResolved()) {
          this.body.viewAttached.resolve();
        }
      });
    }
  }

  private compileHeaderTemplate(columns: BsColumn[]) {
    if (this.header.viewSlot) {
      let view = this.columnsToView(columns, (column: BsColumn, index: number) => {
        return `<th class="\${columns[${index}].headerClass} \${columns[${index}].sortable && rowsSortable ? 'sortable' : ''} \${columns[${index}].sortedOrder && rowsSortable ? 'sorted ' + columns[${index}].sortedOrder : ''}"
                    style.bind="(columns[${index}].width ? 'width: ' + columns[${index}].width + 'px;' : '') + (columns[${index}].sortable && rowsSortable ? 'cursor: pointer' : '')"
                    click.trigger="onColumnHeaderClick(columns[${index}])">
                    ${column.header || ''}
                    <span if.bind="columns[${index}].sortable && rowsSortable && currentSortColumn === columns[${index}] && currentSortOrder === 'asc'" aria-hidden="true">&#9650;</span>
                    <span if.bind="columns[${index}].sortable && rowsSortable && currentSortColumn === columns[${index}] && currentSortOrder === 'desc'" aria-hidden="true">&#9660;</span>
                </th>`;
      });

      attachView(view, this.header.viewSlot);
    }
  }

  private compileFooterTemplate(columns: BsColumn[]) {
    if (this.footer.viewSlot) {
      let view = this.columnsToView(columns, (column: BsColumn, index: number) => {
        return `<td class="\${columns[${index}].footerClass} \${columns[${index}].sortable && rowsSortable ? 'sortable' : ''} \${columns[${index}].sortedOrder && rowsSortable ? 'sorted ' + columns[${index}].sortedOrder : ''}">
                    ${column.footer || ''}
                </td>`;
      });

      attachView(view, this.footer.viewSlot);
    }
  }

  private columnsToView(columns: BsColumn[], templateMapper: (column: BsColumn, index: number) => string, row?: HTMLElement): View {
    if (!row) {
      row = document.createElement('tr');
    }
    row.innerHTML = columns.map((column, index) => templateMapper(column, index)).join('\n');

    let template = document.createDocumentFragment();
    template.appendChild(row);

    let view = this.viewCompiler.compile(template, this.viewResources).create(this.container);
    view.bind(this);

    return view;
  }

  private getValue(item: any, path: string) {
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

  private elementOrChildIsActiveElement(element: Element): boolean {
    if (document.activeElement === element) {
      return true;
    }

    for (let i = 0; i < element.children.length; i++) {
      if (this.elementOrChildIsActiveElement(element.children[i])) {
        return true;
      }
    }

    return false;
  }
}

export function attachView(view: View, viewSlot: ViewSlot): Promise<any> {
  let attachView = () => {
    viewSlot.add(view);
    viewSlot.attached();
  };
  viewSlot.detached();
  let removeResponse = viewSlot.removeAll();
  if (removeResponse instanceof Promise) {
    return removeResponse.then(attachView);
  }
  attachView();
  return Promise.resolve(null);
}