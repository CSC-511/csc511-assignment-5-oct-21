import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {set} from '@ember/object';
import { localStorageUtil, LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

export default class CalculatorComponent extends Component {
    @tracked splitwiseList = [];
    @tracked user;
    @tracked valToChange;

    constructor(){
        super(...arguments);
        this.user = this.args.user;
        this.localStorage = localStorageUtil();
        this.splitwiseList = this.args.splitwiseList;
    }

    removeArrayIndex(index){
        this.splitwiseList.removeAt(index);
        this.updateLocal();
    }

    updateLocal(){
        let updatedList = {calcList: this.splitwiseList};
        Object.assign(this.user, updatedList);
        this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.user);
    }

    changeVal(index, event){
        var valToChange = event.target.value;
        if(valToChange == ""){
            valToChange = 0;
        }
        this.splitwiseList = this.splitwiseList;
        set(this.splitwiseList[index], "payment", valToChange);
        this.splitwiseList = this.splitwiseList;
        this.updateLocal();
    }

}









