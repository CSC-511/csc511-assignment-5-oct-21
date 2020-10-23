import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageUtil, LOCAL_STORAGE_KEY_CURRENT_USER} from '../utils/local-storage'


export default class MainDisplayComponent extends Component {
    @tracked newNameInput
    @tracked newEventInput
    @tracked newAmountInput

    
    @tracked isTallyUpClicked
    @tracked sumOfExpendages
    @tracked supposedIndividualContribution

    @tracked nameList //= this.args.activeMember || []

    //@tracked nameList = this.args.activeMember || []

    @tracked isLoggedIn
    @tracked userNameLoggedIn

    @tracked localStorageData

    constructor(){
        super(...arguments)
        this.localStorage = localStorageUtil()

        this.localStorageData = this.localStorage.get(LOCAL_STORAGE_KEY_CURRENT_USER)
        this.isLoggedIn = this.localStorageData.isLoggedIn
        this.nameList = this.localStorageData.nameList
        //console.log("in main display, current user" , this.localStorageData)

    }

    changeLoginState = (boolValue) => {
        this.isLoggedIn = boolValue
        //console.log("CALLED SUCCESS FROM LOGIN")
    }

    changeNameList = (listOfLoggedInUser) => {
        this.nameList = listOfLoggedInUser
    }

    addToNameList(){

        let personInfo
        
        personInfo = {Name: this.newNameInput , Event: this.newEventInput , Amount: this.newAmountInput , AmountOwed:''}
        // console.log("check type" , typeof this.nameList)
        // console.log("what's here now" , this.nameList)
        // this.nameList.nameList.nameList.pushObject(personInfo)
        this.nameList.pushObject(personInfo)
        this.localStorage.addNewRecord(this.nameList)
        // console.log("after push" , this.nameList)

        //console.log("what is on the list right now" , this.nameList)
        this.newNameInput = ''
        this.newEventInput = ''
        this.newAmountInput = ''
        // clearInputs()

        if(this.nameList.length > 10)
            this.nameList.length = 10

        //this.localStorage.extend(LOCAL_STORAGE_KEY_CURRENT_USER, this.nameList)
        
        this.isTallyUpClicked = false
        //console.log("State of isTallyUp" , this.isTallyUpClicked)

        // this.localStorage.extend(this.userNameLoggedIn, {
        //     nameList: this.nameList
        // })
        
    }

    saveNameInput(event){
        this.newNameInput = event.target.value
    }
    saveEventInput(event){
        this.newEventInput = event.target.value
    }
    saveAmountInput(event){
        this.newAmountInput = event.target.value
    }

    setIsTallyUp(value) {
        this.isTallyUpClicked = value
    }
      

    // addAmounts(){
    //     this.isTallyUpClicked = true
    //     this.sumOfExpendages = 0
    //     let currentSelectedAmount;

    //     this.nameList.forEach(person => {
    //         if(person.Amount)
    //         {
    //             currentSelectedAmount = parseFloat(person.Amount)
    //             this.sumOfExpendages += currentSelectedAmount
    //         }
    //     })

    //     console.log('this.sumOfExpendages', this.sumOfExpendages)
    //     this.diviUp(this.sumOfExpendages)
    // }

    // diviUp(total){
    //     this.supposedIndividualContribution = total / this.nameList.length
        
    //     let result
        

    //     this.nameList.forEach(person => {
    //         if(!person.Amount)
    //             person.Amount = 0

    //         result = person.Amount - this.supposedIndividualContribution 

    //         person.AmountOwed = result
    //     })

    //     //takes each element of array and compares them, switching the places from people that need money back to people that owe money
    //     this.nameList.sort(this.sortArrayByAmount)
    // }

    // sortArrayByAmount(personA, personB){
    //     const A = personA.AmountOwed
    //     const B = personB.AmountOwed
      
    //     //Determines if position needs to be switched, 
    //     //if comparison = -1  personB comes before personA, 
    //     //if comparison = 1 personA comes before personB,
    //     //if comparison = 0 both people are equal, don't change their position.

    //     let comparison = 0;
    //     if (A > B) {
    //       comparison = 1;
    //     } else if (A < B) {
    //       comparison = -1;
    //     }

    //     //inverts array
    //     return comparison * -1;
    // }

}