import { helper } from '@ember/component/helper';

export function gt(params) {
  // var num1=params[0];
  // var num2=params[1];
  // if (typeof num1 !=='number') {num1=Number(num1);}
  // if (typeof num2 !=='number') {num2=Number(num2);}
  return params[0]>params[1];
}

export default helper(gt);