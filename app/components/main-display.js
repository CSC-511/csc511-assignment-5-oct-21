import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'

export default class BaseAssignment extends Component {
    @tracked newNameInput
    @tracked newEventInput
    @tracked newAmountInput


    @tracked nameList = [];

    @tracked spendingEvent = [];

    addToNameList(){

        let personInfo

        
        // this.newEventInput && this.newAmountInput
        //     ? (personInfo = {Name: this.newNameInput , Event: this.newEventInput , Amount: this.newAmountInput} 
        //     , this.nameList.pushObject(personInfo))
        //     : (personInfo = {Name: this.newNameInput , Event: '' , Amount: ''}
        //     , this.nameList.pushObject(personInfo))
        
        personInfo = {Name: this.newNameInput , Event: this.newEventInput , Amount: this.newAmountInput , AmountOwed:''}
        this.nameList.pushObject(personInfo)

        console.log(this.nameList)
        this.newNameInput = ''
        this.newEventInput = ''
        this.newAmountInput = ''

        if(this.nameList.length > 10)
            this.nameList.length = 10
    }

    saveNameInput(event){
        this.newNameInput = event.target.value
        console.log("newNameInput" , this.newNameInput)
    }
    saveEventInput(event){
        this.newEventInput = event.target.value
    }
    saveAmountInput(event){
        this.newAmountInput = event.target.value
    }

    removeFromList(index){
        this.nameList.removeAt(index)
    }

    
}

