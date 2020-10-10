import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'


export default class SaveInfo extends Component {
    @tracked newNameInput
    @tracked newEventInput
    @tracked newAmountInput

    saveNameInput(event){
        
        this.newNameInput = event.target.value
        
        console.log(this.newNameInput)
    }

    saveEventInput(event){
        this.newEventInput = event.target.value
    }

    saveAmountInput(event){
        this.newAmountInput = event.target.value
    }

    clearInputs(){
        this.newNameInput = ''
        this.newEventInput = ''
        this.newAmountInput = ''
    }
}

