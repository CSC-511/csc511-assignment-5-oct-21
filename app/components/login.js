import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageUtil} from '../utils/local-storage'


export default class LoginComponent extends Component {
    @tracked userNameInput
    @tracked passwordInput
    @tracked isLoggedIn
    @tracked showSignOut = false
    @tracked userNameLoggedIn

    constructor(){
        super(...arguments)
        this.localStorage = localStorageUtil()
        this.localStorage.init()
        
            // if(isLoggedIN === true)
            // this.activeMember = data[i]
        // if(localStorage.getItem('keyNameArray') == null)
        //     localStorage.setItem('keyNameArray' , '')

        // if(localStorage.getItem('isLoggedIn') == null)
        //     localStorage.setItem('isLoggedIn' , '')
        // else
        //     this.isLoggedIn = localStorage.getItem('isLoggedIn')
        
        // if(localStorage.getItem('userNameLoggedIn') == null)
        //     localStorage.setItem('userNameLoggedIn' , '')
        // else 
        //     this.userNameLoggedIn = localStorage.getItem('userNameLoggedIn')

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
        if(this.localStorage.checkIfUserExists(this.userNameInput, this.passwordInput))
        {
            let currentUser
            //localStorage.setItem('isLoggedIn' , true)
            this.isLoggedIn = true

            //this.localStorage.setIsLoggedIn(true)

            this.localStorage.setCurrentUser(this.userNameInput)

            //localStorage.setItem('userNameLoggedIn' , this.userNameInput)
            // currentUser = this.localStorage.setCurrentUser(this.userNameInput)
            //OBJECT NOT RETURNING RIGHT FROM SETCURRENTUSER IN LOCALSTORAGE UTIL
            console.log("what was returned" , this.localStorage.setCurrentUser(this.userNameInput))
           // this.userNameLoggedIn = currentUser.username
            console.log("Account that is currently logged in: " , this.userNameLoggedIn)
            this.localStorage.setIsLoggedIn(this.userNameInput, true)
            
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