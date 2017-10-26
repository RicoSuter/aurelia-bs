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

- defaultSortColumn: The initially sorted column
- defaultSortOrder (asc|desc): Defines the sort order of the initially sorted column (when undefined uses BsColumn.defaultSortOrder of the defaultSortColumn)
- sortable: Specifies whether the sorting in the grid can be changed by the user
- autoInit (default: true)

**Data retrieval**

Data can be loaded either with 'items' (in-memory data) or with 'loadData' (paged, filtered and sorted from server), choose wisely: 

- items (any[]): The items/rows of the data grid
- loadData: Function which returns data via promise (e.g. from HTTP call) or directly
- filter: The current filter
- comparer
- totalCount

**Response**

- value: any: The currently selected item
- values: any[]: The currently selected items
- selectionMode (none|single|multiple)

**Appearance**

- offset: number
- limitToContentHeight (default: false)
- height
- minHeight
- itemHeight
- rowClass
- hideUnfilteredCounter
- animate (untested)
- enabled
- showFooter

## Bindable properties of bs-column:

- header
- width
- field

**Manipulation**

- searchable
- matcher
- defaultSortOrder (asc|desc)
- sortable (default: true)
- sorter

**Appearance**

- footer
- rowHeader
- headerClass
- footerClass
- cellClass
