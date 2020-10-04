
import { helper } from '@ember/component/helper';

export default helper(function checkValue([Num]) {
  

    if(Num >= 0){

      return true;

    }
    else

      return false;
    
    

    });