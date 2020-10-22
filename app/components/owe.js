import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';

export default class OweComponent extends Component {
    @tracked listOfPeople = [];

    constructor(){
        super(...arguments);
        this.listOfPeople = this.args.listOfPeople;
    }
}