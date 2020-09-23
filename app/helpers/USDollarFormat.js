import { helper } from "@ember/component/helper"

const USdollarFormat = value => 
    new Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD'
    }).format(value);

export default helper(USdollarFormat)