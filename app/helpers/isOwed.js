import { helper } from '@ember/component/helper';

function difference(nums) {
    return (parseFloat(nums[0]) - nums[1]).toFixed(2);
}

export default helper(difference); 