import { helper } from '@ember/component/helper';

function totalCheck([numIn, argsFixed]) {
    let r;

        if(argsFixed == numIn){
          return r="$0 (Does not owe and is not owed)";
        }
        else if(argsFixed > numIn){
            r = argsFixed - numIn;
            r = r.toFixed(2); 
            return "$" + r + "(person owes the party $" + r + ")";
           
        }
        else if(argsFixed < numIn){
            r = numIn - argsFixed;
            r = r.toFixed(2);
            return "+$" + r + "(person is owed $" + r + " from the party)";
        }
}
export default helper(totalCheck);
