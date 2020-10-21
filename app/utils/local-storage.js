export const localStorageUtil = function(){
    var ls = {};

    
    ls.hasData = function (key) {
        return  !!localStorage[key] && !!localStorage[key];
    }

    ls.remove = function(key){
        localStorage.removeItem(key)
    }

    ls.userExists = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                return true;
            }
        }
        return false;
    }

    ls.addUser = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        //console.log(users);
        users.push(value);
        localStorage.setItem(key, JSON.stringify(users));
    }

    ls.deleteUser = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        //console.log(users);
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                users.splice(i,1);
            }
        }
        //users.push(value);
        localStorage.setItem(key, JSON.stringify(users));
    }

    ls.getUser = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                return users[i];
            }
        }
    }

    ls.getCurrentUser = (key) => {
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].isLoggedIn){
                return users[i];
            }
        }
    }

    ls.modifyUser = function(key, value){
        var users = JSON.parse(localStorage.getItem(key)) || [];
        //console.log(value);
        /*for(let i = 0; i < value.calcList.length; i++){
            console.log(JSON.stringify(value.calcList[i]));
        }*/
        //console.log(value);
        //console.log(JSON.stringify(value.calcList[0].purchase));
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                users[i] = value;
                //console.log(users);
            }
        }
        //console.log(JSON.stringify(users));
        localStorage.setItem(key,JSON.stringify(users));
    }

    ls.addSpendingEvent = function(key, value){
        
    }


    return ls;
};

export const LOCAL_STORAGE_KEY_NAME = 'UNIQUE_KEY_NAME';
export const LOCAL_STORAGE_KEY_USERS =  'UNIQUE_KEY_USERS';