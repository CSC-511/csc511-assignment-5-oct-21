import Component from '@glimmer/component';
import { localStorageUtil, LOCAL_STORAGE_KEY_CURRENT_USER, LOCAL_STORAGE_KEY_USERS}  from '../utils/local-storage';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SignInComponent extends Component {
    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
        this.localStorage.init();
        this.currentUser();
        this.signInBool = true;
    }

    @tracked userName;
    @tracked password;
    @tracked signInMessage = '';
    @tracked currentUserBool;
    @tracked signInBool;
    
    currentUser = function(){
        if(this.localStorage.isLoggedIn()){
            this.currentUserBool = true;
        }
        else
            this.currentUserBool = false;
    }

    get getUserName(){
        const currentUser = this.localStorage.getLoggedInMemeber();
        return currentUser.username;
    }

    updateUserName(event){
        this.userName = event.target.value;
    }

    updatePassword(event){
        this.password = event.target.value;
    }

    @action 
    signOut(){
        this.localStorage.signOut();
        this.currentUser();
    }

    @action 
    signIn(){
        if(this.localStorage.verifySignIn(this.userName, this.password)){
            this.localStorage.signIn(this.userName);
            this.currentUser();
            this.userName = '';
            this.password = '';
            this.signInMessage = '';
        }
        else{
            this.signInMessage='User Name or Password Is Incorrect';
            this.password = '';
        }
    }

    @action
    setSignInFalse(){
          this.signInBool = false;   
    }

    @action
    setSignInTrue(){
        this.signInBool = true;
    }
}
