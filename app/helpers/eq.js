import { helper } from '@ember/component/helper';

function eq(nums) {
    return parseInt(nums[0]) == nums[1];
}

export default helper(eq);