import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'


export default class BaseAssignment extends Component {
    @tracked newNameInput
    @tracked newEventInput
    @tracked newAmountInput
    @tracked isTallyUpClicked
    @tracked sumOfExpendages
    @tracked supposedIndividualContribution

    @tracked nameList = []


    addToNameList(){

        let personInfo
        
        personInfo = {Name: this.newNameInput , Event: this.newEventInput , Amount: this.newAmountInput , AmountOwed:''}
        this.nameList.pushObject(personInfo)

        console.log(this.nameList)
        this.newNameInput = ''
        this.newEventInput = ''
        this.newAmountInput = ''

        if(this.nameList.length > 10)
            this.nameList.length = 10
        
        this.isTallyUpClicked = false
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
        this.isTallyUpClicked = false
    }

    addAmounts(){
        this.isTallyUpClicked = true
        this.sumOfExpendages = 0
        let currentSelectedAmount;

        this.nameList.forEach(person => {
            if(person.Amount)
            {
                currentSelectedAmount = parseFloat(person.Amount)
                this.sumOfExpendages += currentSelectedAmount
            }
        })

        console.log('this.sumOfExpendages', this.sumOfExpendages)
        this.diviUp(this.sumOfExpendages)
    }

    diviUp(total){
        this.supposedIndividualContribution = total / this.nameList.length
        
        let result
        

        this.nameList.forEach(person => {
            if(!person.Amount)
                person.Amount = 0

            result = person.Amount - this.supposedIndividualContribution 

            person.AmountOwed = result
        })

        //takes each element of array and compares them, switching the places from people that need money back to people that owe money
        this.nameList.sort(this.sortArrayByAmount)
    }

    sortArrayByAmount(personA, personB){
        const A = personA.AmountOwed
        const B = personB.AmountOwed
      
        //Determines if position needs to be switched, 
        //if comparison = -1  personB comes before personA, 
        //if comparison = 1 personA comes before personB,
        //if comparison = 0 both people are equal, don't change their position.

        let comparison = 0;
        if (A > B) {
          comparison = 1;
        } else if (A < B) {
          comparison = -1;
        }

        //inverts array
        return comparison * -1;
    }

}

//for next time: fix bug where inputting new info messes up tally up calc
//need css
//need 1 more helper, maybe to make a new array with the formatted display to show people who are owed money first, then people who owe money last