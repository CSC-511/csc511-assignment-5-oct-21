export const localStorageUtil=function(){
  var ls ={};
  ls.hasData = function(key){
    return !!localStorage[key] && localStorage[key] != null;
  }

  ls.set=function(key, value){
    try{
      localStorage.setItem(key,JSON.stringify(value));
    }
    catch(e){
      localStorage.setItem(key,value);
    }
  }

  ls.get = function(key){
    if(!this.hasData(key)){
      return false;
    }
    var data = localStorage[key];
    try{
      return JSON.parse(data);
    }
    catch(e){
      return data;
    }
  }

  ls.remove = function (key){
    localStorage.removeItem(key);
  }

  ls.isMember = function(key, inputVal){
    var localVal = localStorage.getItem(key);
    localVal= JSON.parse(localVal);
    //console.log("we got: "+localVal+inputVal);
    return localVal == inputVal;
  }

  ls.merge = function(key, value){
    if(this.hasData(key)){
      var _value = this.get(key);
      Object.assign(_value, JSON.parse(JSON.stringify(value)));
      this.set(key, _value);
    }
    else{
      this.set(key,value);
    }
  }

  ls.getLoggedInMember=function(key){
    return localStorage.getItem(key);
  }

  return ls;
}

export const LS_KEY_USERNAME = 'MYKEY_USERNAME'; 
export const LS_KEY_PASSWORD = 'MYKEY_PASSWORD'; 
export const LS_KEY_arrParticipants = 'MYKEY_arrParticipants'; 
export const LS_KEY_spendingEventList = 'MYKEY_spendingEventList'; 
