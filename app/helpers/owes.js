import { helper } from '@ember/component/helper';

function owes([purchase,nums]) {
    let res = [];

    nums.forEach(person => {
        if(parseFloat(person.purchase) < parseFloat(purchase))
            res.pushObject(person.name);
    });
    
    return res;
}

export default helper(owes);