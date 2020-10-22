import { helper } from '@ember/component/helper';

function average([nums]) {
    let total = 0;
    nums.forEach(person => {
        if(!isNaN(parseInt(person.payment))){
            total+=parseInt(person.payment);
        }
    });
    return (total/nums.length).toFixed(2);
}

export default helper(average); 