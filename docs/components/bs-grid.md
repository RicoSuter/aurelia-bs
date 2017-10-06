# bs-grid

```
<bs-grid rows.bind="data"
         filter.bind="filter"
         default-sort-column="string"
         class="basic"
         item-height.bind="40">
    <bs-column field="name" 
               header="The Name" 
               width="200">
        ${row.date.format('DD.MM.YYYY')}
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

## Bindable properties:

**Initialization**

- defaultSortColumn
- defaultSortOrder (asc|desc) (TODO: should be removed)
- sortable
- autoInit (default: true)

**Data retrieval**

Data can be loaded either with 'rows' (in-memory data) or with 'loadData' (paged, filtered and sorted from server), choose wisely: 

- rows: any[] (TODO: rename to 'items' to be consistent with select)
- loadData: Function which returns data via promise (e.g. from HTTP call) or directly
- filter
- comparer
- totalCount

**Response**

- selectedItem: any (TODO: rename to 'value' to be consistent with select)
- selectedItems: any[] (TODO: rename to 'values' to be consistent with select)
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
