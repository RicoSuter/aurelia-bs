# bs-accordion

```html
<bs-accordion selected-item-id="item1">
    <bs-accordion-item header="Item 1" id="item1">
        My Content 1
    </bs-accordion-item>
    <bs-accordion-item header="Item 2" id="item2">
        My Content 2
    </bs-accordion-item>
    <bs-accordion-item header="Item 3" id="item3">
        My Content 3
    </bs-accordion-item>
</bs-accordion>
```

## Bindable properties

- **selectedItemId: string** Id of the selected item

## Bindable properties of bs-accordion-item

- id
- header
- selected

## Replacing the heather template of an accordion item

Instead of just binding a header text, the header of an accordion item can be replaced like in the following examples: 

```html
<bs-accordion-item id="item1">
    <template replace-part="header-template">
        <bs-accordion-item-header>
            <div style="float: left;"> <strong>Important</strong> Title</div>
            <div style="float:right;">
                <bs-button click.trigger="myEditTrigger()">
                    <i class="fa fa-pencil" aria-hidden="true"></i>  Edit
                </bs-button>
            </div>
        </bs-accordion-item-header>
    </template>
    My Content 1
</bs-accordion-item>
```

```html
<bs-accordion-item id="item1">
    <template replace-part="header-template">
        <p>Just some "whatever you feel like and looks good to you" HTML code without the look of the standard accordion item header!</p>
    </template>
    My Content 1
</bs-accordion-item>
```


