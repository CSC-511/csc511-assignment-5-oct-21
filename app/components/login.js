import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { localStorageUtil, LOCAL_STORAGE_KEY_NAME,LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

export default class LoginComponent extends Component {
    @tracked currentValue;
    @tracked currentPassword;
    @tracked isLoggedIn = false;
    @tracked currentUser;
    @tracked passwordError = false;
    @tracked nullError = false;
    @tracked existsError = false;
    

    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();

        if(this.localStorage.hasData(LOCAL_STORAGE_KEY_USERS)){
            let curr = this.localStorage.getCurrentUser(LOCAL_STORAGE_KEY_USERS)
            if(curr){
                this.currentUser = curr;
                this.isLoggedIn = this.currentUser.isLoggedIn;
            }
        }
        else{
            this.localStorage.remove(LOCAL_STORAGE_KEY_NAME);
        }
    }

    login(){
        if(this.currentValue == "" || this.currentPassword == ""){
            this.nullError = true;
            return;
        }
        const user = {
            Username: this.currentValue,
            Password: this.currentPassword,
            isLoggedIn: true,
            calcList: []
        }
        if(!this.localStorage.userExists(LOCAL_STORAGE_KEY_USERS,user)){
            this.passwordError = true;
        }
        else if(this.localStorage.getUser(LOCAL_STORAGE_KEY_USERS,user).Password === this.currentPassword){
            this.currentUser = this.localStorage.getUser(LOCAL_STORAGE_KEY_USERS,user);
            let logged = {isLoggedIn: true};
            Object.assign(this.currentUser, logged);
            this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
            this.isLoggedIn = true;
        }
        else{
            this.passwordError = true;
        }
        
        this.currentValue = '';
        this.currentPassword = '';
    }

    signup(){
        this.clearErrors();
        if(this.currentValue == "" || this.currentPassword == ""){
            this.nullError = true;
            return;
        }
        const user = {
            Username: this.currentValue,
            Password: this.currentPassword,
            isLoggedIn: true,
            calcList: []
        }
        if(!this.localStorage.userExists(LOCAL_STORAGE_KEY_USERS,user)){
            this.localStorage.addUser(LOCAL_STORAGE_KEY_USERS,user);
            this.currentUser = user;
            this.isLoggedIn = true;
        }
        else{
            this.existsError = true;
        }
        
        this.currentValue = '';
        this.currentPassword = '';
    }
    logout(){
        this.clearErrors();
        this.isLoggedIn = false;
        let logged = {isLoggedIn: false};
        Object.assign(this.currentUser, logged);
        this.localStorage.modifyUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
    }

    delete(){
        this.clearErrors();
        this.localStorage.deleteUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
        this.logout();
    }

    changeValue(event){
        this.currentValue = event.target.value.replace(/\s+/g, '');
    }
    changePassword(event){
        this.currentPassword = event.target.value.replace(/\s+/g, '');
    }

    clearErrors(){
        this.passwordError = false;
        this.nullError = false;
        this.existsError = false;
    }
}
