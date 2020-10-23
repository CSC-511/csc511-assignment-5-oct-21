import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageUtil, LOCAL_STORAGE_KEY_CURRENT_USER} from '../utils/local-storage'

export default class ShowFirstListComponent extends Component {
    @tracked newNameInput
    @tracked newEventInput
    @tracked newAmountInput
    @tracked isTallyUpClicked
    @tracked sumOfExpendages
    @tracked supposedIndividualContribution

    @tracked nameList = []
    
    constructor(){
        super(...arguments)
        this.nameList = this.args.nameList,
        this.isTallyUpClicked = this.args.isTallyUpClicked
        this.localStorage = localStorageUtil()

        this.localStorageData = this.localStorage.get(LOCAL_STORAGE_KEY_CURRENT_USER)
        
    }

    removeFromList(index){
        console.log("in show-first-list")
        this.isTallyUpClicked = false
        console.log("State of isTallyUp" , this.isTallyUpClicked)

        this.nameList.removeAt(index)

        this.localStorage.removeRecord(this.nameList)
    }

}