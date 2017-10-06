import { customElement, inject, bindable, noView, processContent } from 'aurelia-framework';
import { Deferred } from './deferred';

@inject(Element)
@noView
@processContent(false)
@customElement('bs-column')
export class Column {
    /**
	 * The header to display above this column. This can be set by binding or by
	 * placing a <header> tag in the <column> content. If both are defined, the
	 * bound value is used.
	 */
    @bindable
    public header: string;

    /**
	 * CSS class for the column header. May be set by binding or as a 'class'
	 * attribute on the <header> tag. If both are defined, the bound value is
	 * used.
	 */
    @bindable
    public headerClass: string;

    /**
	 * Optional footer to display beneath the column. This can be set by binding
	 * or by placing a <footer> tag in the <column> content. If both are
	 * defined, the bound value is used.
	 */
    @bindable
    public footer: string;

    /**
	 * CSS class for the column footer. May be set by binding or as a 'class'
	 * attribute on the <footer> tag. If both are defined, the bound value is
	 * used.
	 */
    @bindable
    public footerClass: string;

    /**
	 * CSS class for all cells in this column.
	 */
    @bindable
    public cellClass: string;

    /**
	 * The row property or properties to show in this column. This field also
     * supports paths (e.g. 'account.name'). Multiple fields
	 * can be separated with spaces. If no fields are supplied, the column can't
	 * be searched or sorted, and by default will have an empty template.
	 */
    @bindable
    public field: string[];

    /**
	 * Indicates that the cells in this column are the row headers. If no column
	 * is marked as the row header, then the first column will be used as row
	 * header unless you explicitly mark it <code>row-header="false"</code>.
	 */
    @bindable
    public rowHeader: boolean;

    /**
	 * Set to false to exclude data in this column from searches.
	 */
    @bindable
    public searchable = true;

    /**
	 * Custom matcher to search data in this column for a search term. The
	 * matcher will be called for each row with the (raw) search term and the
	 * values of the row for each field in order. See Column.field.
	 */
    @bindable
    public matcher: (term: string, waardes: any[]) => boolean;

    @bindable
    defaultSortOrder: 'asc' | 'desc' = 'asc';

    /**
	 * Set to false to disable sorting for this column.
	 */
    @bindable
    public sortable = true;

    @bindable
    public width = 0;

    @bindable
    public sorter: (a: any, b: any) => number;

    /**
	 * The template used to render each cell in this column. By default each of
	 * this column's fields will be rendered this way:
	 *
	 *   <span field="[$field]">row[$field]</span>
	 *
	 * where `$field` is the rendered field.
	 *
	 * To override this template, define a template in the <column> contents.
	 * Within cell templates the active row is bound to `row` and the binding
	 * context within which the datagrid is placed is bound to `parent`.
	 */
    public cellTemplate: string;

    private bound = new Deferred<void>();

    constructor(public element: Element) {
        let header = this.element.querySelector('header');
        if (header) {
            this.header = header.innerHTML;
            this.headerClass = header.className;
            header.parentNode!.removeChild(header);
        }
        let footer = this.element.querySelector('footer');
        if (footer) {
            this.footer = footer.innerHTML;
            this.footerClass = footer.className;
            footer.parentNode!.removeChild(footer);
        }

        this.cellTemplate = this.element.innerHTML;
        this.element.innerHTML = '';
    }

    bind() {
        /* TODO: Workaround until aurelia/binding issue #347 is resolved. */
        if (typeof this.field === 'string') {
            this.field = (<any>this.field).split(' ');
        }
        if (typeof this.rowHeader === 'string') {
            this.rowHeader = (<any>this.rowHeader).toLowerCase() === 'true';
        }
        if (typeof this.searchable === 'string') {
            this.searchable = (<any>this.searchable).toLowerCase() === 'true';
        }
        if (typeof this.sortable === 'string') {
            this.sortable = (<any>this.sortable).toLowerCase() === 'true';
        }

        if (this.field && (!this.cellTemplate || !this.cellTemplate.trim())) {
            this.cellTemplate = '';
            this.field.forEach(field => {
                this.cellTemplate += `<span field="${field}">\${row.${field}}`;
            });
        }
        if (!this.field) {
            this.searchable = false;
            this.sortable = false;
        }

        if (!this.bound.isResolved()) {
            this.bound.resolve();
        }
    }

    propertyChanged() {
        if (this.bound.isResolved()) {
            this.element.dispatchEvent(new CustomEvent('update'));
        }
    }

    waitForBinding() {
        return this.bound.promise;
    }
}