import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { localStorageUtil } from '../utils/local-storage';

export default class InputExpensesComponent extends Component {
    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
        this.updateSharedExpenses();
    }

    @tracked sharedExpenses;
    @tracked name;
    @tracked event;
    @tracked spent;
    @tracked addSpendingEventMessage = '';

    updateName(event){
        this.name = event.target.value;
    }

    updateEvent(event){
        this.event = event.target.value;
    }

    updateSpent(event){
        this.spent = event.target.value;
    }

    @action updateSharedExpenses(){
        let currentLocalUser = this.localStorage.getLoggedInMemeber();
        this.sharedExpenses = currentLocalUser.spendingEvents;
    }

    @action addExpense(){
        let object = {
            name: this.name,
            event: this.event,
            spent: this.spent
        };
        
        this.localStorage.addSpendingEvent(object);
        this.updateSharedExpenses();

        
        this.name = '';
        this.event = '';
        this.spent = '';
    }
}
