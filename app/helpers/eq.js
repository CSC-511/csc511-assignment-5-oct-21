import { helper } from '@ember/component/helper';

export function eq(params) {
  //console.log(totalExpense);
  //console.log(numOfParticipants);
  return params[0]===params[1];
}

export default helper(eq);
