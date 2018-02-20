import * as moment from 'moment';
import { observable } from 'aurelia-framework';

export class SelectGrid {
    filter = '';
    currentCount = 0;
    data: any[] = [];

    @observable
    selectedItems: any[] = [];

    constructor() {
        for (let index = 0; index < 500; index++) {
            this.data.push({
                date: moment('2016-08-01').add(index, 'days'),
                string: 'Lorem ' + index,
                boolean: this.getRandomValue() > 50,
            });
        }
    }

    getRandomValue() {
        return Math.round(Math.random() * 100);
    }
}