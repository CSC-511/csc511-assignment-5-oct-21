export const localStorageUtil = function(){
    var localStor = {};


    localStor.doesDataExist = function (key) {
        return  !!localStorage[key] && !!localStorage[key];
    }

    localStor.addUser = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        users.push(value);
        localStorage.setItem(key, JSON.stringify(users));
    }

    localStor.doesUserExist = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                return true;
            }
        }
        return false;
    }

    localStor.remove = function(key){
        localStorage.removeItem(key)
    }

    localStor.deleteUser = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                users.splice(i,1);
            }
        }
        localStorage.setItem(key, JSON.stringify(users));
    }

    localStor.getCurrentUser = (key) => {
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].loggedIn){
                return users[i];
            }
        }
    }

    localStor.getUser = (key, value) =>{
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                return users[i];
            }
        }
    }

    localStor.modifyUser = function(key, value){
        var users = JSON.parse(localStorage.getItem(key)) || [];
        for(let i = 0; i < users.length; i++){
            if(users[i].Username == value.Username){
                users[i] = value;
            }
        }
        localStorage.setItem(key,JSON.stringify(users));
    }

    localStor.addSpendingEvent = function(key, value){

    }


    return localStor;
};

export const LOCAL_STORAGE_KEY_NAME = 'UNIQUE_KEY_NAME';
export const LOCAL_STORAGE_KEY_USERS =  'UNIQUE_KEY_USERS'; 