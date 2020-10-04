import { helper } from '@ember/component/helper';

export default helper(function checkOwed([checkThis]) {


  var output = [];

 
      if(checkThis > 0){
        output ='is owed'
      }

      else if(checkThis == 0){
        output ='has no dues'
      }

      else{    
        output ='has dues that comes to'
      }

    return output;
   
});