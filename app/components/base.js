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
    @tracked clone=[];
    @tracked currentValue;
    @tracked currentUser;
    

    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
        this.currentUser = this.args.currentUser;
        this.refreshStoreArray();
    }
    refreshStoreArray(){
        let clone = this.currentUser.TestList;
        for(let i = 0; i < clone.length; i++){
            let _person = new Person();
            _person.name = clone[i].name;
            _person.purchase = clone[i].purchase;
            this.listOfPeople.pushObject(_person);
        }
    }


    addPerson() {
    let name = this.currentValue;
    let person = new Person();
    person.name = name;
    person.purchase = 0;
    this.addToArray(person);
           
    }

    addToArray(person){
        this.listOfPeople.pushObject(person);
        console.log(this.listOfPeople);
        this.currentValue = '';
        this.updateStorage();
    }

    deleteUsers(){
        this.listOfPeople.removeAt(0,this.listOfPeople.length);
        this.updateStorage();
    }

    changeValueName(event){
        this.currentValue = event.target.value;
    }

    updateStorage(){
        let updatedList = {TestList: this.listOfPeople};
        Object.assign(this.currentUser, updatedList);
        this.localStorage.editUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
    }
}