import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { localStorageUtil, LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

class Person{
    @tracked name;
    @tracked purchase = 0;

    constructor(name, purchase) {
        this.name = name;
        this.purchase = purchase;
    }

    toJSON() {
        const jsonObj = Object.assign({}, this);
        const proto = Object.getPrototypeOf(this);
        for (const key of Object.getOwnPropertyNames(proto)) {
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            const hasGetter = desc && typeof desc.get === 'function';
            if (hasGetter) {
                jsonObj[key] = this[key];
            }
        }
        return jsonObj;
    }
}

export default class BaseComponent extends Component {
    @tracked listOfPeople = [];
    @tracked currentValue;
    @tracked currentUser;
    @tracked tempListOfPeople = [];
    @tracked tooManyError = false;
    @tracked uniqueError = false;

    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
        this.currentUser = this.args.currentUser;
        this.mapStoredArray();
    }

    addPerson() {
        let name = this.currentValue;
        let unique = true;
        if(this.listOfPeople.length > 9){
            this.tooManyError = true;
            unique = false;
        }
        else if(this.listOfPeople.length > 0){
            this.listOfPeople.forEach(person => {
                if(person.name === name){
                    this.uniqueError = true;
                    unique = false;
                }
            });
        }
        if(unique){
            this.tooManyError = false;
            this.uniqueError = false;
            let person = new Person();
            person.name = name;
            person.purchase = 0;
            this.addToArray(person);
        }   
    }

    addToArray(person){
        this.listOfPeople.pushObject(person);
        console.log(this.listOfPeople);
        this.currentValue = '';
        this.updateLocal();
    }

    clearArray(){
        this.listOfPeople.removeAt(0,this.listOfPeople.length);
        this.tooManyError = false;
        this.updateLocal();
    }

    changeValueName(event){
        this.currentValue = event.target.value;
    }

    mapStoredArray(){
        let temparr = this.currentUser.calcList;
        for(let i = 0; i < temparr.length; i++){
            let _person = new Person();
            _person.name = temparr[i].name;
            _person.purchase = temparr[i].purchase;
            this.listOfPeople.pushObject(_person);
        }
    }

    updateLocal(){
        let updatedList = {calcList: this.listOfPeople};
        Object.assign(this.currentUser, updatedList);
        this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
    }
}
