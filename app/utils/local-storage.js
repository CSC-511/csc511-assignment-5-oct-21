export const localStorageUtil = function(){
    var ls = {};


    ls.hasData = function (key) {
        return  !!localStorage[key] && !!localStorage[key];
    }
    
    ls.addNew = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        users.push(value);
        localStorage.setItem(key, JSON.stringify(users));
    }
    ls.editUser = function(key, value){
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                users[i] = value;
            }
        }
        localStorage.setItem(key,JSON.stringify(users));
    }


    ls.delete = function(key){
        localStorage.removeItem(key)
    }

    ls.userInStorage = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                return true;
            }
        }
        return false;
    }
    ls.grabUserInfo = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                return users[i];
            }
        }
    }

    ls.deleteUserInfo = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                users.splice(i,1);
            }
        }
        localStorage.setItem(key, JSON.stringify(users));
    }


    ls.grabCurrentUserInfo = (key) => {
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].isLogged){
                return users[i];
            }
        }
    }


    ls.addUserPrice = function(key, value){

    }


    return ls;
};

export const LOCAL_STORAGE_KEY_NAME = 'keyUserName';
export const LOCAL_STORAGE_KEY_USERS =  'keyPassword';