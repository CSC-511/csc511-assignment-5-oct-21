import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {localStorageUtil, LOCAL_STORAGE_KEY_NAME, LOCAL_STORAGE_ID } from '../utils/local-storage-util';


export default class LogInComponent extends Component {
    @tracked LoginTrue = false;
    @tracked LoginFalse = true;
    @tracked currentPassword = '';
    @tracked currentAccountValue = '';
    @tracked currentPasswordValue = '';
    @tracked value = [];
    @tracked key = LOCAL_STORAGE_KEY_NAME;
    @tracked localData =[]; 
    @tracked indexID = 0;
    @tracked counter;
    @tracked retrievedData=[];
    @tracked currentAccount='';

constructor(){
        super(...arguments);
        this.localStorageData = localStorageUtil();
        console.log(this.key + LOCAL_STORAGE_ID);

        for(this.counter = 0; this.counter < localStorage.length ; this.counter++){ 
            this.localData = this.localStorageData.getData(this.key + this.counter);
            if (this.localData.loggedIn == true && !null){
                this.LoginTrue = this.localData.loggedIn;
                this.LoginFalse = this.localData.loggedOut;
                this.localStorageData.ID(this.counter)
                this.currentAccount = this.localData.account;
            }
        }
}   

        inputAccountValue(input){
            this.currentAccountValue  = input.target.value;   
        }

        inputPasswordValue(input){
            this.currentPasswordValue  = input.target.value;    
        }

        addAccount( accountName,accountPassword){

            if ( localStorage.length > 0){

                for(this.counter = 0; this.counter < localStorage.length ; this.counter++){ 
                    this.localData = JSON.parse(localStorage.getItem(this.key + this.counter,))

                    if (this.localData.account == accountName ){
                        alert("User Exists");
                        return;
                    }
                }
            }

            this.value = {
                account: accountName, 
                password: accountPassword, 
                time: new Date, 
                loggedIn: false,
                loggedOut: true,
                numDivide: 0,
            }

            this.localData = this.localStorageData.setData(this.key + this.indexID, this.value)
            this.localData = this.localStorageData.getData(this.key + this.indexID,)
            this.indexID++;
            }           
         
        loginAccount(accountName,accountPassword){
            
            for(this.counter = 0; this.counter < localStorage.length ; this.counter++){ 
                this.localData = JSON.parse(localStorage.getItem(this.key + this.counter,))

                    if (this.localData.account == accountName &&  this.localData.password == accountPassword){

                        this.value = {ID : this.counter, loggedIn: true, loggedOut: false}
                        this.localStorageData.ID(this.counter)
                        this.localStorageData.extendData(this.key + this.counter, this.value)
                        this.localData = this.localStorageData.getData(LOCAL_STORAGE_KEY_NAME + this.counter)
                        
                        this.LoginTrue = true;
                        this.LoginFalse = false;
                        this.currentAccount = this.localData.account;
         
                    }
                }
        }
        
        signOutAccount(){

            this.value = {ID : this.counter, loggedIn: false, loggedOut: true}
            this.localStorageData.extendData(this.key + LOCAL_STORAGE_ID, this.value)
            
            this.LoginTrue = false;
            this.LoginFalse = true;

        }
        deleteAccount(){
            this.localStorageData.removeData(this.key + LOCAL_STORAGE_ID)
            this.indexID--;
            this.LoginTrue = false;
            this.LoginFalse = true;

        }
        clearAndSignOut(){
            this.value = {
                eventList: "",
                nameList: "",
                owedList : "",    
                numDivide : 0,
                totalSpent : 0.00,
                totalOwed : 0.00,
                ID : this.counter,
                loggedIn: false,
                loggedOut: true,
            }
            this.localStorageData.extendData(this.key + LOCAL_STORAGE_ID, this.value)
            
            this.LoginTrue = false;
            this.LoginFalse = true;

        }
        logIn(){
            this.LoginTrue = this.localData.loggedIn;
            this.LoginFalse = this.localData.loggedOut;
        }
 
}

