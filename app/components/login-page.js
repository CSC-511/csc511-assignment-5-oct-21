import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { localStorageUtil,LOCAL_STORAGE_KEY_USERS, LOCAL_STORAGE_KEY_NAME } from '../utils/local-storage';

export default class LoginPageComponenet extends Component {
    @tracked user_name;
    @tracked pass_word;
    @tracked currAcct; //to keep track of current user
    @tracked isLoggedIn = false;
    
    constructor(){

        super(...arguments);
        this.localStorage = localStorageUtil();
        
        if(this.localStorage.hasData(LOCAL_STORAGE_KEY_USERS)){
            let app = this.localStorage.getCurrentAppUser(LOCAL_STORAGE_KEY_USERS);
            if(app){
                this.currAcct = app;
                this.isLoggedIn = this.currAcct.isLoggedIn;
            }
        }
        else{
            this.localStorage.remove(LOCAL_STORAGE_KEY_NAME);
        }
    }

    //Constructor End


    //USER Methods
   

    userLogin(){
        if(this.user_name == "" || this.pass_word == ""){
            console.log("No Input Found");
            alert("Input fields Cannot be Empty!");
            return;
        }

        //Each account has an object
        const acct = {
            userName:this.user_name,
            userPassword:this.pass_word,
            isLoggedIn: true,
            userObjList: {}
            // userListActivity: '',
            // userListAmt: '',
        }

        if(this.localStorage.getAcct(LOCAL_STORAGE_KEY_USERS, acct).userName === this.user_name && this.localStorage.getAcct(LOCAL_STORAGE_KEY_USERS, acct).userPassword === this.pass_word){
            this.currAcct  = this.localStorage.getAcct(LOCAL_STORAGE_KEY_USERS, acct);
            let logState = {isLoggedIn: true};
            Object.assign(this.currAcct, logState);
            this.localStorage.changeAcct(LOCAL_STORAGE_KEY_USERS, this.currAcct);
            this.isLoggedIn = true;
        }
        else if(!this.localStorage.findUser(LOCAL_STORAGE_KEY_USERS, acct)){
            alert("Account Does Not Exist in System");
            return;
        }
        else{
            console.log("Wrong Password Man");
            alert("Wrong Account Details, TRY AGAIN");
            
        }

        this.user_name = '';
        this.pass_word = '';
    }

     //Sign up 
    userSign_Up(){
        //Check to make sure input are not empty
        if(!this.user_name == "" || this.pass_word == ""){
            console.log("Input Fields Were Empty");
            alert("Input fields cannot be Empty!");
            return;
        }

        //Each account has an object
        const acct = {
            userName:this.user_name,
            userPassword:this.pass_word,
            isLoggedIn: true,
            userObjList: {}
            // userListActivity: '',
            // userListAmt: '',
        }

        //if account doesnt exist add account
        if(this.localStorage.findUser(LOCAL_STORAGE_KEY_USERS, acct)){
            this.localStorage.addAcct(LOCAL_STORAGE_KEY_USERS, acct);

            this.currAcct = acct;
            this.isLoggedIn = true;

        }

        this.user_name = '';
        this.pass_word = '';


    }

    //get current account user name
    getUsername(event){
        this.user_name  = event.target.value.replace(/\s+/g, '');
    }

    //get current account password
    getuserPassword(event){
        this.pass_word = event.target.value.replace(/\s+/g, '');
    }
 
    //allows user to log out of account
    logOut(){
        this.isLoggedIn = false;
        let logState = {isLoggedIn: false};
        Object.assign(this.currAcct, logState);
        this.localStorage.changeAcct(LOCAL_STORAGE_KEY_USERS, this.currAcct);
    }

    //Allows user to delete account from localstorage
    delAcct(){
        alert("Are you Sure");
        this.localStorage.deleteAcct(LOCAL_STORAGE_KEY_USERS, this.currAcct);
        this.logOut();
    }
}