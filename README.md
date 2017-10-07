# aurelia-bs: Bootstrap UI components for Aurelia JS

[![npm](https://img.shields.io/npm/v/aurelia-bs.svg)](https://www.npmjs.com/package/aurelia-bs)

**This project is currently in development. It is not recommended to use it in production until version 1.x is released.**

This project provides Bootstrap UI (CSS framework) components for Aurelia JS. 

[Demo](https://rawgit.com/RSuter/aurelia-bs/master/demo/index.html)

## Installation

- Install `aurelia-bs` via NPM: `npm install aurelia-bs --save`
- Install `aurelia-validation` via NPM: `npm install aurelia-validation --save`
- Register both plugins in `boot.ts`

```
import { Aurelia, PLATFORM } from 'aurelia-framework';

...

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-bs'));
```

## Usage

- [Dialogs](docs/dialogs.md)
- [Validation](docs/validation.md)

### Components

- [bs-button](docs/components/bs-button.md)
- [bs-checkbox](docs/components/bs-checkbox.md)
- [bs-datepicker](docs/components/bs-datepicker.md)
- [bs-expander](docs/components/bs-expander.md)
- [bs-grid-filter](docs/components/bs-grid-filter.md)
- [bs-grid](docs/components/bs-grid.md)
- [bs-label-collection](docs/components/bs-label-collection.md)
- [bs-loader](docs/components/bs-loader.md)
- [bs-resize-container](docs/components/bs-resize-container.md)
- [bs-scroll](docs/components/bs-scroll.md)
- [bs-searchbox](docs/components/bs-searchbox.md)
- [bs-select-grid](docs/components/bs-select-grid.md)
- [bs-select](docs/components/bs-select.md)
- [bs-tabs](docs/components/bs-tabs.md)
- [bs-textbox](docs/components/bs-textbox.md)

## Development

### How to add a component

- Implement component
- Add component name to package.json in the path "aurelia.build.resources"
- Export view model class from "index.ts"
