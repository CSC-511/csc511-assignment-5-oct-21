import Component from '@glimmer/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import { inject as service }from '@ember/service';
import {localStorageUtil,LS_KEY_USERNAME,LS_KEY_PASSWORD,LS_KEY_arrParticipants,LS_KEY_spendingEventList} from '../utils/local-storage'

export default class UserLoginComponent extends Component {

    @service router;
    @tracked username = "";
    @tracked password = "";
    // @action
    // redirectToHome(){
    //     this.router.transitionTo('home');
    // }

    addNewMember(){
        this.username=document.querySelector("input[name='username']").value;
        this.password=document.querySelector("input[name='password']").value;

        //check if username already created.
        var isMember = localStorageUtil().isMember(LS_KEY_USERNAME, this.username);
        if (isMember){
            alert("The username is already created. Please enter a unique name.")
        }
        else{
            localStorageUtil().remove(LS_KEY_spendingEventList);
            localStorageUtil().remove(LS_KEY_arrParticipants);
            localStorageUtil().set(LS_KEY_USERNAME, this.username);
            localStorageUtil().set(LS_KEY_PASSWORD, this.password);
            alert("You just created a new account. Please use it to login.")
        }
    }

    @action
    login(){
        this.username=document.querySelector("input[name='username']").value;
        this.password=document.querySelector("input[name='password']").value;
        //this.setUsernameAndPassword();
        var isUserNameMatch = localStorageUtil().isMember(LS_KEY_USERNAME, this.username);
        var isPasswordMatch = localStorageUtil().isMember(LS_KEY_PASSWORD, this.password);
        if (isUserNameMatch && isPasswordMatch){
            this.router.transitionTo('home');
        }
        else{
            alert("Incorrect username or password. Please enter again or sign up.");
        }
    }
}

