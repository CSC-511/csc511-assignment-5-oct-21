import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';

export default class ResultComponent extends Component {
    @tracked listOfPeople = [];

    constructor(){
        super(...arguments);
        this.listOfPeople = this.args.listOfPeople;
    }
}
