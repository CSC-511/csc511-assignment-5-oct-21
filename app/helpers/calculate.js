import { helper } from '@ember/component/helper';

export default helper(function calculate([sumThis]) {

  var sum = 0;

 
    for(var i = 0; i < sumThis.get('length'); i++){
    
        sum += +sumThis[i][2];
       
    }

    if(sum % 1 != 0){
      sum = "$" + sum

    }

    else{

      sum = "$" + sum + ".00";
    }

    return "The total that was spent is : " + sum;
    
    
    
});