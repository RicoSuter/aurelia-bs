# bs-grid

[Demo](https://rawgit.com/RSuter/aurelia-bs/master/demo/index.html#/grid)

```html
<bs-grid rows.bind="data"
         filter.bind="filter"
         default-sort-column="name"
         class="basic"
         item-height.bind="40">
    <bs-column field="name" 
               header="Name" 
               width="200">
        ${row.name}
    </bs-column>
    <bs-column field="dateOfBirth" 
               header="Date of Birth" 
               width="200">
        ${row.dateOfBirth.format('DD.MM.YYYY')}
    </bs-column>
</bs-grid>
```

## Methods

- refresh()
- getPageNumberForIndex(index)
- showItemAtIndex(index)
- showPage(pageNumber)

## Events

- selection-changed

## Bindable properties:

**Initialization**

- **defaultSortColumn** The initially sorted column
- **defaultSortOrder (undefined|asc|desc)** Defines the sort order of the initially sorted column (when undefined uses BsColumn.defaultSortOrder of the defaultSortColumn)
- **sortable** Specifies whether the sorting in the grid can be changed by the user
- **autoInit (default: true)**
- **useKeyEvents (default: false)** Activates keyboard events on grid if set to true. To show the row in focus by the keyboard navigation, you have to style the row class 'focus' in your css.

```css
.bs-grid tr.focus {
    background-color: rgba(65,137,199, 0.5);
}

.bs-grid tr.focus.selected {
    background-color: rgba(85, 124, 159, 0.5);
}
``` 

**Data retrieval**

Data can be loaded either with 'items' (in-memory data) or with 'loadData' (paged, filtered and sorted from server), choose wisely: 

- **items: any[]** The items/rows of the data grid
- **loadData** Function which returns data via promise (e.g. from HTTP call) or directly
- **filter** The current filter
- **comparer**
- **totalCount**

**Response**

- **value: any (two-way)** The currently selected item
- **values: any[] (two-way)** The currently selected items
- **selectionMode (none|single|multiple) (default: none)** Specifies the selection mode 
- **valuePath: string  (default: undefined)** Specifies the property name of the ID of the entity representing a row. This makes it possible to only bind id(s) to the value property for the selected row(s).

**Appearance**

- **itemHeight**
- **rowClass**
- **hideUnfilteredCounter**
- **animate (untested)**
- **enabled**
- **showFooter**

**Inherited from [bs-resize-container](./bs-resize-container.md)**

- **offset: number** Sets the distance to the bottom of the window, used to calculate the components height relative to the window height
- **height (optional): number** When set, then the height is not automatically changed but fixed to the given height
- **minHeight: number** Sets the minimal height of the component
- **limitToContentHeight (default: false): boolean** When set, the component height will not be greater then the content height

## Bindable properties of bs-column:

- **header**
- **width**
- **field**

**Manipulation**

- **searchable**
- **matcher**
- **defaultSortOrder (asc|desc)**
- **sortable (default: true)**
- **sorter**

**Appearance**

- **footer**
- **rowHeader**
- **headerClass**
- **footerClass**
- **cellClass**
