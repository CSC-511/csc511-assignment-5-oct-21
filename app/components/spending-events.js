import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { localStorageUtil } from '../utils/local-storage';

export default class SpendingEventsComponent extends Component {
    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
    };

    @action removeExpense(index){
        this.localStorage.removeSpendingEvent(index);
        this.args.updateSpendingEvents();
    };

}
