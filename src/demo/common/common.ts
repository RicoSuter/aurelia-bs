import { BsTextbox } from '../../textbox';
import { BsSearchbox } from '../../searchbox';

export class Common {
  textbox: BsTextbox;
  textarea: BsTextbox;
  searchbox: BsSearchbox;

  focusTextbox() {
    this.textbox.focus();
  }

  focusTextarea() {
    this.textarea.focus();
  }

  focusSearchbox() {
    this.searchbox.focus();
  }
}