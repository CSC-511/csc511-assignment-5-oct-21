import { helper } from '@ember/component/helper';

export function colorCode(params/*, hash*/) {
  if(params > 0)
    return "text-success";
  else if (params < 0)
    return "text-danger";
  else
    return "";
};

export default helper(colorCode);
