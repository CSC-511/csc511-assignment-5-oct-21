export const localStorageUtil = function(){
    var ls = {};

    
    ls.hasData = function (key) {
        return  !!localStorage[key] && !!localStorage[key];
    }

    ls.remove = function(key){
        localStorage.removeItem(key)
    }

    ls.findUser = (key, value) =>{  
        var appUsers = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < appUsers.length; i++){
            if(appUsers[i].Username == value.Username){
                return true;

            }
           
        }
        return false;
    }

    ls.addAcct = (key, value) =>{
        var appUsers = JSON.parse(localStorage.getItem(key)) || [];
        appUsers.push(value);
        localStorage.setItem(key, JSON.stringify(appUsers));
    }

    ls.deleteAcct = (key, value) =>{
        var appUsers = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < appUsers.length; i++){
            if(appUsers[i].Username == value.Username){
                appUsers.splice(i,1);
            }
        }
        localStorage.setItem(key, JSON.stringify(appUsers));
    }

    ls.getAcct = (key, value) =>{
        var appUsers = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < appUsers.length; i++){
            if(appUsers[i].Username == value.Username){
                return appUsers[i];
            }
        }
    }

    ls.getCurrentAppUser = (key) => {
        var appUsers = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < appUsers.length; i++){
            if(appUsers[i].isLoggedIn){
                return appUsers[i];
            }
        }
    }

    ls.changeAcct = function(key, value){
        var appUsers = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < appUsers.length; i++){
            if(appUsers[i].Username == value.Username){
                appUsers[i] = value;
            }
        }
        localStorage.setItem(key,JSON.stringify(appUsers));
    }
    

    return ls;
};

export const LOCAL_STORAGE_KEY_NAME = 'APP_NAME';
export const LOCAL_STORAGE_KEY_USERS =  'APP_USERS';