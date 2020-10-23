import { helper } from '@ember/component/helper';

export function addBtnDisabled(params/*, hash*/) {
  let array = params[0];
  let name = params[1];
  let event = params[2];
  let spent = params[3];

  if(array.length < 10 && name && event && spent)
    return null;
  else
    return true;
};

export default helper(addBtnDisabled);
