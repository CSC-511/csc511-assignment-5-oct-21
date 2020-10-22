import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { localStorageUtil, LOCAL_STORAGE_KEY_NAME,LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

export default class signInComponent extends Component {
    @tracked currententValue;
    @tracked currententPassword;
    @tracked user;
    @tracked loggedIn = false;
    @tracked invalidPassword = false;
    @tracked invalidUser = false;
    @tracked invalidInput = false;


    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();

        if(this.localStorage.doesDataExist(LOCAL_STORAGE_KEY_USERS)){
            let current = this.localStorage.getCurrentUser(LOCAL_STORAGE_KEY_USERS)
            if(current){
                this.user = current;
                this.loggedIn = this.user.loggedIn;
            }
        }
        else{
            this.localStorage.remove(LOCAL_STORAGE_KEY_NAME);
        }
    }
    
    signUp(){
        if(this.currententValue == "" || this.currententPassword == ""){
            this.invalidInput = true;
            return;
        }
        const user = {
            Username: this.currententValue,
            Password: this.currententPassword,
            loggedIn: true,
            calcList: []
        }
        if(!this.localStorage.doesUserExist(LOCAL_STORAGE_KEY_USERS,user)){
            this.localStorage.addUser(LOCAL_STORAGE_KEY_USERS,user);
            this.user = user;
            this.loggedIn = true;
        }
        else{
            this.invalidInput = true;
        }

        this.currententValue = '';
        this.currententPassword = '';
    }

    signIn(){
        if(this.currententValue == "" || this.currententPassword == ""){
            this.invalidInput = true;
            return;
        }
        const user = {
            Username: this.currententValue,
            Password: this.currententPassword,
            loggedIn: true,
            calcList: []
        }

        if(this.localStorage.getUser(LOCAL_STORAGE_KEY_USERS,user).Password === this.currententPassword){
            this.user = this.localStorage.getUser(LOCAL_STORAGE_KEY_USERS,user);
            let logged = {loggedIn: true};
            Object.assign(this.user, logged);
            this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.user);
            this.loggedIn = true;
        }
        else{
            this.invalidPassword = true;
        }

        this.currententValue = '';
        this.currententPassword = '';
    }


    logout(){
        this.loggedIn = false;
        let logged = {loggedIn: false};
        Object.assign(this.user, logged);
        this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.user);
    }

    deleteAccount(){
        this.localStorage.deleteUser(LOCAL_STORAGE_KEY_USERS, this.user);
        this.logout();
    }

    changeValue(event){
        this.currententValue = event.target.value.replace(/\s+/g, '');
    }
    changePassword(event){
        this.currententPassword = event.target.value.replace(/\s+/g, '');
    }
}