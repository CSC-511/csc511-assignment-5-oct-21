import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {set} from '@ember/object';
import { localStorageUtil, LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

export default class CalculatorComponent extends Component {
    @tracked listOfPeople = [];
    @tracked currentUser;
    @tracked val;

    constructor(){
        super(...arguments);
        this.currentUser = this.args.currentUser;
        this.localStorage = localStorageUtil();
        this.listOfPeople = this.args.listOfPeople;
    }

    clearArrayIndex(index){
        this.listOfPeople.removeAt(index);
        this.updateLocal();
    }

    changeValue(index, event){
        var val = event.target.value;
        if(val == ""){
            val = 0;
        }
        this.listOfPeople = this.listOfPeople;
        set(this.listOfPeople[index], "purchase", val);
        this.listOfPeople = this.listOfPeople;
        this.updateLocal();
    }

    updateLocal(){
        let updatedList = {calcList: this.listOfPeople};
        Object.assign(this.currentUser, updatedList);
        this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
    }
}
