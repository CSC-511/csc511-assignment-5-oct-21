import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { localStorageUtil, LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

class Person{
    @tracked name;
    @tracked payment = 0;

    constructor(name, payment) {
        this.name = name;
        this.payment = payment;
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
    @tracked splitwiseList = [];
    @tracked currentVal;
    @tracked user;
    @tracked tempsplitwiseList = [];

    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
        this.user = this.args.user;
        this.map();
    }

    addPerson() {
        let name = this.currentVal;
        let person = new Person();
        person.name = name;
        person.payment = 0;
        this.addToArray(person);
        
    }

    addToArray(person){
        this.splitwiseList.pushObject(person);
        console.log(this.splitwiseList);
        this.currentVal = '';
        this.updateLocal();
    }

    removeArray(){
        this.splitwiseList.removeAt(0,this.splitwiseList.length);
        this.updateLocal();
    }

    changeValName(event){
        this.currentVal = event.target.value;
    }

    map(){
        let tempsplitwiseList = this.user.calcList;
        for(let i = 0; i < tempsplitwiseList.length; i++){
            let _person = new Person();
            _person.name = tempsplitwiseList[i].name;
            _person.payment = tempsplitwiseList[i].payment;
            this.splitwiseList.pushObject(_person);
        }
    }

    updateLocal(){
        let updatedList = {calcList: this.splitwiseList};
        Object.assign(this.user, updatedList);
        this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.user);
    }
}