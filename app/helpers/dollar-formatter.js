import { helper } from '@ember/component/helper';

export function dollarFormatter(params/*, hash*/) {
  const formatConfig = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    // currencyDisplay: "symbol",
  };

  let formattedUSDollar = new Intl.NumberFormat("en-US", formatConfig).format(params);
  
  return formattedUSDollar;
};

export default helper(dollarFormatter);
