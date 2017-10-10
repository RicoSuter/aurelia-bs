import { customElement, bindable, containerless, bindingMode } from 'aurelia-framework';

import { ValidationComponent } from './validation-component';
import { convert, BooleanConverter } from './convert';
import { BsSettings } from './settings';

export interface FileDescription {
  name: string;
  data: string;
  type: string;
  size: number;
}

let translations = {
  'de': {
    noItemSelected: 'Keine Datei.'
  },
  'en': {
    noItemSelected: 'No File.'
  }
};

@containerless
@customElement('bs-fileupload')
export class FileUpload extends ValidationComponent {
  translations = (<any>translations)[BsSettings.language];

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) // TODO: Must be one-way-back
  value: string | null = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) // TODO: Must be one-way-back
  description: FileDescription | null = null;

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  readonly = false;

  @bindable
  accept: string | null = null;

  clear() {
    let self = <any>this;
    self.fileInput.type = 'text';
    self.fileInput.type = 'file';
    this.fileSelected(null);
  }

  select() {
    let self = <any>this;
    self.fileInput.click();
  }

  private fileSelected(file: File | null): void {
    if (file !== undefined && file !== null) {
      // TODO: Add is loading check

      let reader = new FileReader();
      reader.onload = () => {
        this.description = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: btoa(reader.result)
        };
        this.value = this.description.data;
      };
      reader.onerror = () => {
        this.description = null;
        this.value = null;
      };
      reader.readAsBinaryString(file);
    } else {
      this.description = null;
      this.value = null;
    }
  }
}
