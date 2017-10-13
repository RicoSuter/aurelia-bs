import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

import { bindable, bindingMode, containerless, customElement } from 'aurelia-framework';
import * as $ from 'jquery';
import * as moment from 'moment';

import { BooleanConverter, convert } from './convert';
import { BsValidationComponent } from './validation-component';
import { BsSettings } from './settings';

let translations = {
  'de': {
    'noValue': '<Kein Datum>',
    'select': '<Bitte wählen>'
  },
  'en': {
    'noValue': '<No date>',
    'select': '<Please select>'
  }
};

@containerless
@customElement('bs-datepicker')
export class BsDatepicker extends BsValidationComponent {
  translations = translations[BsSettings.language];

  private element: HTMLElement;
  private updating = false;

  @bindable
  label = '';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: moment.Moment | null;

  @bindable
  @convert(BooleanConverter)
  enabled = true;

  @bindable
  @convert(BooleanConverter)
  readonly = false;

  @bindable
  help: string | null = null;

  @bindable
  required = false;

  focus() {
    this.element.focus();
  }

  bind() {
    super.bind();

    let element: any = $(this.element);
    element.datepicker({
      format: 'dd.mm.yyyy',
      language: 'de',
      clearBtn: true,
      orientation: 'auto',
      autoclose: true,
      todayHighlight: true
    });

    element.on('change', () => {
      if (!this.updating) {
        let date = element.datepicker('getDate');
        this.value = date ? this.getUtcMoment(date) : null;
      }
    });

    element.on('clearDate', () => {
      this.value = null;
    });

    if (this.value) {
      this.value = moment.utc(Date.UTC(this.value.year(), this.value.month(), this.value.date()));
    }

    this.updateUiValue();
  }

  protected valueChanged() {
    let newDate = arguments[0] ? arguments[0] as moment.Moment : undefined;
    let oldDate = arguments[1] ? arguments[1] as moment.Moment : undefined;
    if (newDate !== oldDate && (!newDate || !oldDate || oldDate.format('YYYY-MM-DD') !== newDate.format('YYYY-MM-DD'))) {
      this.convertToUtc();
      this.updateUiValue();
      super.valueChanged();
    }
  }

  private updateUiValue() {
    let element = $(this.element);
    this.updating = true;
    element.datepicker('update', this.value ? this.value.format('DD.MM.YYYY') : '');
    this.updating = false;
  }

  private convertToUtc() {
    if (this.value) {
      let date = moment.utc(Date.UTC(this.value.year(), this.value.month(), this.value.date()));
      if (!this.value.isUtc() || date.valueOf() !== this.value.valueOf()) {
        setTimeout(() => this.value = date);
      }
    }
  }

  private getUtcMoment(date: any) {
    return moment.utc(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}

/**
 * German translation for bootstrap-datepicker
 * Sam Zurcher <sam@orelias.ch>
 */
(function ($) {
  (<any>$.fn.datepicker).dates['de'] = {
    days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    daysShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
    daysMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    today: 'Heute',
    monthsTitle: 'Monate',
    clear: 'Löschen',
    weekStart: 1,
    format: 'dd.mm.yyyy'
  };
}($));