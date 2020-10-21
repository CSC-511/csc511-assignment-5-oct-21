import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageHelper} from '../helpers/local-storage'


export default class SignUpComponent extends Component {
    @tracked userNameInput
    @tracked passwordInput
    @tracked invalidUserName = false

    constructor(){
        super(...arguments)
        this.localStorage = localStorageHelper()

        // if(localStorage.getItem('keyNameArray') == null)
        //     localStorage.setItem('keyNameArray' , '')
        //const listOfAccounts = this.localStorage.get("keyNameArray")

        //console.log(listOfAccounts)
        //let invalidUserName = false
    }

    saveUserNameInput(event){
        this.userNameInput = event.target.value
        //console.log(this.userNameInput)

        this.invalidUserName = false
    }

    checkValidUserName(value){
        console.log(this.localStorage.checkIfUserExists(value))
        if(this.localStorage.checkIfUserExists(value))
            this.invalidUserName = true
        
        else
            this.invalidUserName = false
    }

    savePasswordInput(event){
        this.passwordInput = event.target.value
        //console.log(this.passwordInput)

    }

    submitCredentials(){
        if(this.userNameInput != null)
           this.checkValidUserName(this.userNameInput)

        this.localStorage.addKeyName(this.userNameInput)

        //clear inputs
        //this.userNameInput = ''
        this.passwordInput = ''

        //if(this.localStorage.checkIfUserExists(value)
    }
}