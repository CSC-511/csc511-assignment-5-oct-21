import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'
import {localStorageUtil, LOCAL_STORAGE_KEY_CURRENT_USER} from '../utils/local-storage'


export default class LoginComponent extends Component {
    @tracked userNameInput
    @tracked passwordInput
    @tracked isLoggedIn
    @tracked showSignOut = false
    @tracked userNameLoggedIn

    @tracked localStorageData 

    @tracked invalidCredentials = false

    constructor(){
        super(...arguments)
        this.localStorage = localStorageUtil()
        this.localStorage.init()

        this.localStorageData = this.localStorage.get(LOCAL_STORAGE_KEY_CURRENT_USER)
        this.isLoggedIn = this.localStorageData.isLoggedIn
        this.userNameLoggedIn = this.localStorageData.username
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
        let _userInfo
        if(this.localStorage.checkIfUserExists(this.userNameInput, this.passwordInput))
        {

            this.isLoggedIn = true
           

            this.localStorage.setCurrentUser(this.userNameInput)
            this.args.setIsLoggedIn(true)

            _userInfo = this.localStorage.get(LOCAL_STORAGE_KEY_CURRENT_USER)

            this.args.setNewNameList(_userInfo.nameList)
            

            //this.userNameLoggedIn = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER])
            //currentUser = this.localStorage.getCurrentUser()
            // console.log("user double check" , currentUser.username)
            // console.log("logged in user now" , currentUser)

            this.localStorage.setIsLoggedIn(this.userNameInput, true)
            
            this.userNameLoggedIn = this.userNameInput  
            this.userNameInput  = ''
            this.passwordInput = ''
            this.invalidCredentials = false

        }

        else 
        {
            //localStorage.setItem('isLoggedIn' , false)
            this.isLoggedIn = this.localStorageData.isLoggedIn
            this.args.setIsLoggedIn(false)
            this.invalidCredentials = true
        }

    }

    signOut(){
        // localStorage.setItem('isLoggedIn' , false)
        // // localStorage.setItem('userNameLoggedIn' , '')

        this.localStorage.setIsLoggedIn(this.userNameLoggedIn , false)
        localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, '')
        
        this.isLoggedIn = false
        this.userNameLoggedIn = ''
        this.args.setIsLoggedIn(false)
    }
}