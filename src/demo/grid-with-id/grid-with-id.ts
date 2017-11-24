import * as moment from 'moment';
import { observable } from 'aurelia-framework';
import { BsGridDataRequest, BsGridDataResponse } from '../../index';

export class GridWithId {
  filter = '';
  currentCount = 0;

  @observable
  data: any[] = [];

  @observable
  selectedItemId: number | undefined = undefined;

  constructor() {
    for (let index = 0; index < 500; index++) {
      this.data.push({
        itemId: index + 1,
        date: moment('2016-08-01').add(this.getRandomValue(), 'days'),
        string: 'Lorem ' + this.getRandomValue(),
        boolean: this.getRandomValue() > 50,
      });
    }
  }

  selectedItemIdChanged() {
    if (this.selectedItemId) {
      alert('selected id changed to ' + this.selectedItemId);
    }
  }

  getRandomValue() {
    return Math.round(Math.random() * 100);
  }
}