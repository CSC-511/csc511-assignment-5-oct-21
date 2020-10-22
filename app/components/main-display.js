import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageUtil} from '../utils/local-storage'


export default class MainDisplayComponent extends Component {
    @tracked newNameInput
    @tracked newEventInput
    @tracked newAmountInput

    
    @tracked isTallyUpClicked
    @tracked sumOfExpendages
    @tracked supposedIndividualContribution

    @tracked nameList = this.args.activeMember || []

    //@tracked nameList = this.args.activeMember || []

    @tracked isLoggedIn
    @tracked userNameLoggedIn

    constructor(){
        super(...arguments)
        this.localStorage = localStorageUtil()

        let localStorageData

        if(this.userNameLoggedIn)
            localStorageData = this.localStorage.get(this.userNameLoggedIn)

        if(localStorage.getItem('keyNameArray') == null)
            localStorage.setItem('keyNameArray' , '')

        if(localStorage.getItem('isLoggedIn') == null)
            localStorage.setItem('isLoggedIn' , '')
        else
        {
            if(localStorage.getItem('isLoggedIn') == 'false')
                this.isLoggedIn = false
            
            if(localStorage.getItem('isLoggedIn') == 'true')
                this.isLoggedIn = true
        }
        
        if(localStorage.getItem('userNameLoggedIn') == null)
            localStorage.setItem('userNameLoggedIn' , '')
        else 
            this.userNameLoggedIn = localStorage.getItem('userNameLoggedIn')

        console.log("checking for data" , localStorage.getItem(this.userNameLoggedIn))
        
        if(this.userNameLoggedIn && localStorage.getItem(this.userNameLoggedIn))
        {
            
            this.nameList = this.localStorage.get(this.userNameLoggedIn)
            console.log("pre-existing data there for key, namelist:" , this.nameList)
            //console.log("check type" , typeof this.nameList)
        }

        console.log("In Main too!" , this.localStorage.getIsLoggedIn())
        //this.isLoggedIn = this.localStorage.getIsLoggedIn()
        console.log("in main username" , this.userNameLoggedIn)
        console.log("in main is loggedin" , this.isLoggedIn)

        //this.localStorage.extend("sampleKey" , ['asd'])
    }


    addToNameList(){

        let personInfo
        
        personInfo = {Name: this.newNameInput , Event: this.newEventInput , Amount: this.newAmountInput , AmountOwed:''}
        console.log("check type" , typeof this.nameList)
        console.log("what's here now" , this.nameList)
        // this.nameList.nameList.nameList.pushObject(personInfo)
        this.nameList.pushObject(personInfo)

        console.log("after push" , this.nameList)

        //console.log("what is on the list right now" , this.nameList)
        this.newNameInput = ''
        this.newEventInput = ''
        this.newAmountInput = ''
        // clearInputs()

        if(this.nameList.length > 10)
            this.nameList.length = 10
        
        this.isTallyUpClicked = false
        console.log("State of isTallyUp" , this.isTallyUpClicked)

        this.localStorage.extend(this.userNameLoggedIn, {
            nameList: this.nameList
        })
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