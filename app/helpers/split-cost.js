import { helper } from '@ember/component/helper';

function average([nums]) {
    let total = 0;
    nums.forEach(person => {
        if(!isNaN(parseInt(person.purchase))){
            total+=parseInt(person.purchase);
        }
    });
    return (total/nums.length).toFixed(2);
}

export default helper(average);