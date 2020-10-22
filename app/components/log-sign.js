import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { localStorageUtil, LOCAL_STORAGE_KEY_NAME,LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

export default class LogSign extends Component {
    @tracked currentValue;
    @tracked currentPassword;
    @tracked isLogged = false;
    @tracked currentUser;
    @tracked empty = false;
    @tracked noCombo = false;
    @tracked invUser = false;


    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();

        if(this.localStorage.hasData(LOCAL_STORAGE_KEY_USERS)){
            let curr = this.localStorage.grabCurrentUserInfo(LOCAL_STORAGE_KEY_USERS)
            if(curr){
                this.currentUser = curr;
                this.isLogged = this.currentUser.isLogged;
            }
        }
        else{
            this.localStorage.delete(LOCAL_STORAGE_KEY_NAME);
        }
    }

    login(){
        if(this.currentValue == "" || this.currentPassword == ""){
            this.empty = true;
            return;
        }
        const user = {
            Username: this.currentValue,
            Password: this.currentPassword,
            isLogged: true,
            TestList: []
        }

        if(this.localStorage.grabUserInfo(LOCAL_STORAGE_KEY_USERS,user).Password === this.currentPassword){
            this.currentUser = this.localStorage.grabUserInfo(LOCAL_STORAGE_KEY_USERS,user);
            let logged = {isLogged: true};
            Object.assign(this.currentUser, logged);
            this.localStorage.editUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
            this.isLogged = true;
        }
        else{
            this.noCombo = true;
        }

        this.currentValue = '';
        this.currentPassword = '';
    }

    signup(){
        if(this.currentValue == "" || this.currentPassword == ""){
            this.empty = true;
            return;
        }
        const user = {
            Username: this.currentValue,
            Password: this.currentPassword,
            isLogged: true,
            TestList: []
        }
        if(!this.localStorage.userInStorage(LOCAL_STORAGE_KEY_USERS,user)){
            this.localStorage.addNew(LOCAL_STORAGE_KEY_USERS,user);
            this.currentUser = user;
            this.isLogged = true;
        }
        else{
            this.empty = true;
        }

        this.currentValue = '';
        this.currentPassword = '';
    }
    logout(){
        this.isLogged = false;
        let logged = {isLogged: false};
        Object.assign(this.currentUser, logged);
        this.localStorage.editUser(LOCAL_STORAGE_KEY_USERS, this.currentUser);
    }

    delete(){
        this.localStorage.deleteUserInfo(LOCAL_STORAGE_KEY_USERS, this.currentUser);
        this.logout();
    }

    changeValue(event){
        this.currentValue = event.target.value.replace(/\s+/g, '');
    }
    changePassword(event){
        this.currentPassword = event.target.value.replace(/\s+/g, '');
    }
}