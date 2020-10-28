import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { localStorageUtil, LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';


export default class SplitwiseCalComponent extends Component {

    @tracked currAcct;
    @tracked currentName;
    @tracked activityName;
    @tracked entryAmt;
    
    //To get Total amount spent
    @tracked totalAmt;

    //Object
    @tracked myObj = {Names: this.nameList, Activity: this.activityList, Amount: this.amountList};

    //Arrays to hold inputs
    @tracked nameList = [];
    @tracked activityList = [];
    @tracked amountList = [];

    ////to store array length
    @tracked arrLen;

    // to store the return of the tally up, this holds the amount each person is to pay
    @tracked eachAmt;

    constructor(){
        super(...arguments);
        this.currAcct = this.args.currAcct;
        this.localStorage = localStorageUtil();

    }

    //tally up: divides the total from the number of people in the array.
    tallyUp(){
        this.eachAmt = this.totalAmt / this.arrLen;
        this.eachAmt = this.eachAmt.toFixed(2);
        var doc = document.getElementById("tallyUp-div");
        doc.classList.remove("hide");
    }

    //sets the inputed name
    changeNameValue(event){
        this.currentName = event.target.value;
    }

    //sets the inputed activity/ item
    updateActivity(event){
        this.activityName = event.target.value;
    }

    //sets Each persons amount
    setAmount(event){
        this.entryAmt = event.target.value;
    }

    //sets the inputed total number
    setTotal(event){
        this.totalAmt = event.target.value;
    }

    //Names Addition Function
    addToList(){        
        this.nameList.pushObject(this.currentName);
        this.currentName='';   
        console.log(this.myObj);

        this.localListUpdate();

    }

    //Activity addition function
    addToActivityList(){
        this.activityList.pushObject(this.activityName);
        this.activityName=''; 

    }

    //add Amount to array;
    addAmount(){
        this.amountList.pushObject(this.entryAmt); //adds the input to the amount array
        this.entryAmt = '';  //set the input field to ''

        this.getArrLen(this.amountList);  //gets the length of the array

    }
    

    //removes an item at a given index
    remove(index){
        this.nameList.removeAt(index); //removes name in array at that index
        this.activityList.removeAt(index); //removes name in array at that index
        this.amountList.removeAt(index); //removes name in array at that index
       
        this.getArrLen(this.nameList); //this passes the array to the function to get the length.

        //to refresh the tallyup when an item is removed from the list
        this.tallyUp();
        
    }

    //returns the Starting total for the party
    getAmount(){
        this.totalAmt = document.getElementById("totalA").value;
    }

    //Returns the length of any of the array passed to it
    getArrLen(arr){
        this.arrLen = arr.length;
    }

    localListUpdate(){
        let update = {'userObjList': this.myObj};
        Object.assign(this.currAcct, update)
        this.localStorage.changeAcct(LOCAL_STORAGE_KEY_USERS, this.currAcct);
            

    }
}

