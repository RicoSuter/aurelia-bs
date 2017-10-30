# bs-scroll

Inherits from [bs-resize-container](bs-resize-container.md)

```html
<bs-scroll>
    My Content
</bs-scroll>
```

## Bindable properties

**Appearance**

- **class:** The additional CSS class to apply to the component

**Inherited from [bs-resize-container](./bs-resize-container.md)**

- **offset: number** Sets the distance to the bottom of the window, used to calculate the components height relative to the window height
- **height (optional): number** When set, then the height is not automatically changed but fixed to the given height
- **minHeight: number** Sets the minimal height of the component
- **limitToContentHeight (default: false): boolean** When set, the component height will not be greater then the content height
