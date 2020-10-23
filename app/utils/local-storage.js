//import { helper } from "@ember/component/helper"

export const localStorageUtil = function () {
    var ls = {};

    let keyNameArray = []
    let isLoggedIn = false
    let userLoggedIn

    //ls.signUp = (key)

    ls.hasData = function (key) {
        return !!localStorage[key] && !!localStorage[key].length
        //return localStorage.getItem(key)
    }

    ls.init = function(){
        if(!localStorage[LOCAL_STORAGE_KEY_CURRENT_USER])
            localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, '')

        if(!localStorage[LOCAL_STORAGE_KEY_ALL_USERS]){
            let array = [];
            let object = {username: 'Jasper', password: 'Vinny', isLoggedIn: false, nameList: []}
            array.push(object);
            localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(array));
        }
    }

    ls.get = function (key) {
        if(!this.hasData(key))
       {
           return false
       }

        var data = localStorage[key]
        try {
            return JSON.parse(data)
        }
        catch (e){
            return data
        }

        
    }
    ls.set = function (key, value){
        try{
            localStorage.setItem(key, JSON.stringify(value))
        }
        catch(e) {localStorage.setItem(key, value)}
    }

    ls.extend = function (key, value) {
         if(this.hasData(key)) {

            var _value = this.get(key);
            Object.assign(_value, JSON.parse(JSON.stringify(value)))
            this.set(key, _value)
        }
        else {
            this.set(key, value)
        }
    }

    ls.remove = function (key) {
        localStorage.removeItem(key)
    }

    ls.addKeyName = (value) => {
        console.log("The value" , value)
        console.log("before the push")
        keyNameArray.push(value)
        console.log("after")
        console.log("hereeeee" , keyNameArray)
        

        //let string = 'keyNameArray'
        //localStorage.getItem(string)
        //console.log('hasData' , ls.hasData(string))
        //console.log('hasData' , this.hasData("keyNameArray"))
        //if(localStorage.hasData('keyNameArray'))
        //{
        //ls.extend("keyNameArray", value)
        //}

        // if(this.hasData('keyNameArray')) {

        //     var _value = this.getItem('keyNameArray');
        //     Object.assign(_value, JSON.stringify(value))
        //     this.set('keyNameArray', _value)
        // }

        if(localStorage.getItem('keyNameArray'))
        {
            var _value = localStorage.getItem('keyNameArray')

            // _value.forEach(element => {
            //     _new.push(element)
            // })
            let _new = keyNameArray.concat(_value)
           
            localStorage.setItem('keyNameArray' , JSON.stringify(_new))

            // this.isLoggedIn = true
            // userLoggedIn = value

            // console.log(userLoggedIn)
            // this.setUserLoggedIn(value)

        }

        else
            localStorage.setItem('keyNameArray' , JSON.stringify(keyNameArray))
        //console.log('localStorage.getItem("keyNameArray"))' , localStorage.getItem("keyNameArray"))

        //this.set('keyNameArray' , JSON.stringify(keyNameArray))
    }

    // ls.setUserLoggedIn = (userName) => {
    //     console.log("in set user logged in" , userLoggedIn)
    //     this.userLoggedIn = userName
    // }

    ls.checkIfUserExists = (userNameVal , passwordVal) => {
        let _usersList = JSON.parse(localStorage[LOCAL_STORAGE_KEY_ALL_USERS])
        // console.log('_usersList.username' , _usersList[0].username)
        //console.log("the array" , _array)
        let credentialsFound = false
        let _userIsInArrayIndex = false
        let _pwInIsArrayIndex = false

        Object.keys(_usersList).forEach(index => {
            // console.log("in mapping" , _usersList[index].username)
            // console.log("check condition " , userNameVal == _usersList[index].username)
            if(userNameVal == _usersList[index].username)
                _userIsInArrayIndex = true
            
            
            // console.log("in mapping pw" ,passwordVal)
            // console.log("check condition 2" , passwordVal == _usersList[index].password)
            if(passwordVal == _usersList[index].password)
                _pwInIsArrayIndex = true
        })


        credentialsFound = _userIsInArrayIndex && _pwInIsArrayIndex
        console.log('credentialsFound' , credentialsFound)
        //if(credentialsFound)
            // console.log("Login Success!")
        //else
            // console.log("Login Fail :(")

        return credentialsFound
    }

    ls.signUp = function(userNameVal , passwordVal){
        let data = {username: userNameVal, password: passwordVal, isLoggedIn: false, nameList: []}
        console.log('the data' , data)
        let _list = JSON.parse(localStorage[LOCAL_STORAGE_KEY_ALL_USERS])
        console.log('parsed list before push' , _list)

        _list.push(data)
        console.log('parsed list after push' , _list)

        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(_list))
    }

    ls.setCurrentUser = function(userNameVal){
        let _usersList = JSON.parse(localStorage[LOCAL_STORAGE_KEY_ALL_USERS])
        Object.keys(_usersList).forEach(index => {
            // console.log("in mapping" , _usersList[index].username)
            // console.log("check condition " , userNameVal == _usersList[index].username)
            if(userNameVal == _usersList[index].username)
            {
                localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_usersList[index]) )
                console.log("Im sending this" , _usersList[index])
                //return _usersList[index]
            }
        })

        
    }

    ls.getCurrentUser = function(){
        let _currentUser = localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_USER)

        JSON.parse(_currentUser)
        console.log("what I'm sending as response" , _currentUser)
        return(_currentUser)
    }

    ls.setIsLoggedIn = (userName, boolValue) => {
        let _allUsersList = JSON.parse(localStorage[LOCAL_STORAGE_KEY_ALL_USERS])
        let _currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER])

        Object.keys(_allUsersList).forEach(index => {
            // console.log("in mapping" , _usersList[index].username)
            // console.log("check condition " , userNameVal == _usersList[index].username)
            if(userName == _allUsersList[index].username)
                _allUsersList[index].isLoggedIn = boolValue
                //localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_usersList[index]) )
            
        })

        _currentUser.isLoggedIn = boolValue

        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(_allUsersList) )
        localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_currentUser) )
    }

    ls.addNewRecord = function(nameList){
        let _currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER])
        let _allUsersList = JSON.parse(localStorage[LOCAL_STORAGE_KEY_ALL_USERS])

        Object.keys(_allUsersList).forEach(index => {
           
            if(_currentUser.username == _allUsersList[index].username)
                _allUsersList[index].nameList = nameList
                //localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_usersList[index]) )
            
        })

        _currentUser.nameList = nameList

        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(_allUsersList))
        localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_currentUser))
    }

    ls.removeRecord = function(nameList){
        let _currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER])
        let _allUsersList = JSON.parse(localStorage[LOCAL_STORAGE_KEY_ALL_USERS])

        Object.keys(_allUsersList).forEach(index => {
           
            if(_currentUser.username == _allUsersList[index].username)
                _allUsersList[index].nameList = nameList
                //localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_usersList[index]) )
            
        })

        _currentUser.nameList = nameList

        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_USERS, JSON.stringify(_allUsersList))
        localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(_currentUser))
    }

    ls.getIsLoggedIn = () => {
        return isLoggedIn
    }

    ls.setUserLoggedIn = (value) => {
        userLoggedIn = value
    }

    ls.getUserLoggedIn = () => {
        return userLoggedIn 
    }

    


    return ls
}

export const LOCAL_STORAGE_KEY_CURRENT_USER = 'UNIQUE_KEY_CURRENT_USER';
export const LOCAL_STORAGE_KEY_ALL_USERS = 'UNIQUE_KEY_ALL_USERS';