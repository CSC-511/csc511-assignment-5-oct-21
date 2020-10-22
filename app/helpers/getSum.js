import { helper } from '@ember/component/helper';


let getSum = ([costList]) => {

    var sum = 0;

  for(var i=0; i < costList.length; i++){
        sum = costList[i] + sum;
      
}

    return sum;

}

export default helper(getSum);
