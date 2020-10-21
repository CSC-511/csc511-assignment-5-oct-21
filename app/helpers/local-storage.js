export const localStorageHelper = function () {
    var ls = {};

    let keyNameArray = []
    let isLoggedIn = false
    let userLoggedIn

    //ls.signUp = (key)

    ls.hasData = function (key) {
        return !!localStorage[key] && !!localStorage[key].length
        //return localStorage.getItem(key)
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
            //Object.assign(keyNameArray , _value)
            // _new.pop()
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

    ls.checkIfUserExists = (value) => {
        let _array = localStorage.getItem("keyNameArray")
        //console.log("the array" , _array)
        let _isInArray = _array.includes(value)

        return _isInArray
    }

    ls.setIsLoggedIn = (bool) => {
        isLoggedIn = bool
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