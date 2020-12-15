import { helper } from '@ember/component/helper';

export function formatNumber(moneyVal) {
  moneyVal = moneyVal[0];
  moneyVal = Math.abs(moneyVal);
  var i = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
    }).format(moneyVal);
    return i;
}

export default helper(formatNumber);