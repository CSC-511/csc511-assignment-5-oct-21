import {A as EmberArray} from '@ember/array';
export const localStorageUtil = function() {
  var ls = EmberArray([]);
  

  ls.hasData = function (key) {
    return !!localStorage[key] && !!localStorage[key].length;

  };
  ls.getData = function (key){

    if (!this.hasData(key)){
      return false;
    }
    
    var data = localStorage[key];

    try {
      return JSON.parse(data);
    }

    catch(exception){
      return data;
    }
  }
  
 ls.setData = function (key, value){
   
   try{
     localStorage.setItem(key, JSON.stringify(value))
   }
   catch(exception){
     localStorage.setItem(key,value)
   }
 }
  
  ls.extendData =  function(key, value){
    if (this.hasData(key)){
      
      var _value = this.getData(key);
      var object = Object.assign(_value, JSON.parse(JSON.stringify(value)))
      console.log(object) 
      this.setData(key, _value)
      }
    }

  ls.removeData = function (key){
        localStorage.removeItem(key)
      }

  ls.ID = function (value){
        LOCAL_STORAGE_ID = value
        console.log(LOCAL_STORAGE_ID) 
      }

  
  return ls;
  
}
export const LOCAL_STORAGE_KEY_NAME = 'UNIQUE_KEY_'
export var LOCAL_STORAGE_ID = ''

