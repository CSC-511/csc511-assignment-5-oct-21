export const localStorageUtil = function() {
  var ls = {};

  //init the keys if there is nothing in local storage with such keys
  ls.init = function(){    
    if(!localStorage[LOCAL_STORAGE_KEY_CURRENT_USER])
      localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, null);

    
    if(!localStorage[LOCAL_STORAGE_KEY_USERS]){
      let array = [];
      let object = {username: 'admin', password: 'password123', spendingEvents: []};
      array.push(object);
      localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(array));
    }
  }

  //if there is no active user, return false, if there is return true
  ls.isLoggedIn = function() {
    var currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER]);
    if(currentUser == null){
      return false;
    }
    else{
      return true;
    }
  }
  ///return the information of the current user
  ls.getLoggedInMemeber = function (){
    const currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER]);
    return currentUser;
  }

  //will verify if the username and password matches
  ls.verifySignIn = function(username, password){
    const users = JSON.parse(localStorage[LOCAL_STORAGE_KEY_USERS]);
    let foundUserName = false;
    let passwordMatch = false;
    for(let i = 0; i < users.length; i ++){
      if (username == users[i].username){
        foundUserName = true;
        if(password == users[i].password)
          passwordMatch = true;
      }
    }
    return foundUserName && passwordMatch;
  }
  //verifies if there is any user with the same username, if so return true, else return false
  ls.verifySignUp = function(userName){
    const users = JSON.parse(localStorage[LOCAL_STORAGE_KEY_USERS]);
    let userNameExists = false;
    for(let i = 0; i < users.length; i ++){
      if (userName == users[i].username)
        userNameExists = true;
    }
    return userNameExists;
  }

  //sets the current user of the account being signed into and sends all information to the currentUser key for faster retrival
  ls.signIn = function (username){ 
    let users = JSON.parse(localStorage[LOCAL_STORAGE_KEY_USERS]);
    let index = -1

    for(let i = 0; i < users.length; i++){
      if(users[i].username == username)
        index = i;
    }

    if (index != -1){
      localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(users[index]));
    }
  }
  //set the currentUser to null
  ls.signOut = function (){
      localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, null);
  }
  //adds a new user to the user value to all users
  ls.signUp = function (object){
    try {
      let users = JSON.parse(localStorage[LOCAL_STORAGE_KEY_USERS]);
      users.pushObject(object)
      localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
      return true;
    } catch (error) {
      return false;
    }
  }

  //adds a new spending event to the current user and saves it to the according user profile in all users
  ls.addSpendingEvent = function (passedObject){
    let currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER]); //get current user
    let users = JSON.parse(localStorage[LOCAL_STORAGE_KEY_USERS]);              //get all users
    var index = -1;                                                                  

    let spendingEvents = currentUser.spendingEvents;
    spendingEvents.pushObject(passedObject)                 //push the new spending event

    //update current User
    currentUser.spendingEvents = spendingEvents;            //updates the spending events with the new event
    localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));  //currentUser is now updated

    //find index in all users of current user
    for(let i = 0; i < users.length; i++){
      if(users[i].username == currentUser.username)
        index = i;
    }

    //update spending events of current user in all users
    if(index != -1){
      users[index].spendingEvents = currentUser.spendingEvents;
      localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users)); 
    }
  }
  //removes a specific spending event from currentUser and the according user in all users gets updated
  ls.removeSpendingEvent = function(expenseIndex){
    let currentUser = JSON.parse(localStorage[LOCAL_STORAGE_KEY_CURRENT_USER]); //get current user
    let users = JSON.parse(localStorage[LOCAL_STORAGE_KEY_USERS]);              //get all users
    var index = -1; 

    let spendingEvents = currentUser.spendingEvents;
    spendingEvents.removeAt(expenseIndex);                  //remove the specific spending event
    currentUser.spendingEvents = spendingEvents;            //updates the spending events with the deleted event
    localStorage.setItem(LOCAL_STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));  //currentUser is now updated

    //find index in all users of current user
    for(let i = 0; i < users.length; i++){
      if(users[i].username == currentUser.username)
        index = i;
    }

    //update spending events of current user in all users
    if(index != -1){
      users[index].spendingEvents = currentUser.spendingEvents;
      localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users)); 
    }
  }
  return ls;
}

export const LOCAL_STORAGE_KEY_CURRENT_USER = 'UNIQUE_KEY_CURRENT_USER';
export const LOCAL_STORAGE_KEY_USERS = 'UNIQUE_KEY_USERS';
