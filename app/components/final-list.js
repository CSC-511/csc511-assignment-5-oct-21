import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FinalListComponent extends Component {
    constructor(){
        super(...arguments);
    }

    @tracked finalList = [];

    @action tallyUp(){
        let sharedExpenses = this.args.spendingEvents;
        this.finalList.clear();
        let totalPaid = 0;
        for(let i = 0; i < sharedExpenses.length; i++){
            totalPaid += parseFloat(sharedExpenses[i].spent);
        }

        totalPaid = totalPaid / sharedExpenses.length

        for(let i = 0; i < sharedExpenses.length; i++){
            let object = {
                name: sharedExpenses[i].name,
                owes: sharedExpenses[i].spent - totalPaid
            };

            this.finalList.pushObject(object);
        }
    }
}
