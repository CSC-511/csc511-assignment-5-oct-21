import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { localStorageUtil, LOCAL_STORAGE_KEY_CURRENT_USER, LOCAL_STORAGE_KEY_USERS}  from '../utils/local-storage';

export default class SignUpComponent extends Component {
    constructor(){
        super(...arguments);
        this.localStorage = localStorageUtil();
    }

    @tracked signInBool = this.args.signInBool;
    @tracked userName;
    @tracked password;
    @tracked passwordVer;
    @tracked signUpMessage;

    updateUserName(event){
        this.userName = event.target.value;
    }

    updatePassword(event){
        this.password = event.target.value;
    }

    updatePasswordVer(event){
        this.passwordVer = event.target.value;
    }

    @action signUp(){
        if(this.password === this.passwordVer){
            let object = {username: this.userName, password: this.password, spendingEvents: []};
            if(this.localStorage.verifySignUp(this.userName)){
                this.password = '';
                this.passwordVer = '';
                this.signUpMessage='User Name already exists';   
            } 
            else{
                if(this.localStorage.signUp(object)){
                    this.password = '';
                    this.passwordVer = '';
                    this.signUpMessage='Account has been created';
                }
            }   
        }   
        else{
            this.password = '';
            this.passwordVer = '';
            this.signUpMessage = 'Your Passwords Do No Match'
        }
    }

    @action goBack(){
        this.args.setSignInTrue();
    }
}
