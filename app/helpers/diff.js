import { helper } from '@ember/component/helper';

function diff(nums) {
    return (parseFloat(nums[0]) - nums[1]).toFixed(2);
}

export default helper(diff);