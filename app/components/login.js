import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageHelper} from '../helpers/local-storage'


export default class LoginComponent extends Component {
    @tracked userNameInput
    @tracked passwordInput
    @tracked isLoggedIn
    @tracked showSignOut = false
    @tracked userNameLoggedIn

    constructor(){
        super(...arguments)
        this.localStorage = localStorageHelper()

        if(localStorage.getItem('keyNameArray') == null)
            localStorage.setItem('keyNameArray' , '')

        if(localStorage.getItem('isLoggedIn') == null)
            localStorage.setItem('isLoggedIn' , '')
        else
            this.isLoggedIn = localStorage.getItem('isLoggedIn')
        
        if(localStorage.getItem('userNameLoggedIn') == null)
            localStorage.setItem('userNameLoggedIn' , '')
        else 
            this.userNameLoggedIn = localStorage.getItem('userNameLoggedIn')

    }

    saveUserNameInput(event){
        this.userNameInput = event.target.value
        console.log(this.userNameInput)
    }

    savePasswordInput(event){
        this.passwordInput = event.target.value
        console.log(this.passwordInput)

    }

    checkCredentials(){
        if(this.localStorage.checkIfUserExists(this.userNameInput))
        {
            localStorage.setItem('isLoggedIn' , true)
            this.isLoggedIn = true

            this.localStorage.setIsLoggedIn(true)

            localStorage.setItem('userNameLoggedIn' , this.userNameInput)
            this.userNameLoggedIn = this.userNameInput  
            this.userNameInput  = ''
            this.passwordInput = ''

            // this.localStorage.setIsLoggedIn(true)
            // this.localStorage.setUserLoggedIn(this.userNameInput)

            // console.log("In Login js" , this.localStorage.getIsLoggedIn())
            // console.log("In Login js" , this.localStorage.getUserLoggedIn())
        }

        else 
        {
            localStorage.setItem('isLoggedIn' , false)
            this.isLoggedIn = false
        }


        // this.userNameInput = ''
        // this.passwordInput = ''
    }

    signOut(){
        localStorage.setItem('isLoggedIn' , false)
        localStorage.setItem('userNameLoggedIn' , '')

        this.localStorage.setIsLoggedIn(false)
        this.isLoggedIn = false
        this.userNameLoggedIn = ''
    }
}