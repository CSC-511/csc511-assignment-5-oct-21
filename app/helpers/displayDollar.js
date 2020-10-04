
import { helper } from '@ember/component/helper';

export default helper(function displayDollar([Num]) {

  var displayNum;
  

    if(Num % 1 != 0){
      displayNum = "$" + Num

    }

    else{

      displayNum = "$" + Num + ".00";
    }
  
  return displayNum;
    
    

    });