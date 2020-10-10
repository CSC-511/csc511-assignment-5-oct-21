import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'


export default class ShowSecondList extends Component {
    @tracked isTallyUpClicked
    @tracked nameList

    @tracked sumOfExpendages
    @tracked supposedIndividualContribution

    constructor(){
        super(...arguments)
        this.isTallyUpClicked = this.args.isTallyUpClicked,
        this.nameList = this.args.nameList
    }

    addAmounts(){
        this.isTallyUpClicked = true
        console.log("State of isTallyUp" , this.isTallyUpClicked)

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