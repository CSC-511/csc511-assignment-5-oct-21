import { helper } from '@ember/component/helper';

export function costBreakdownCalc(params) {
  let [rows, arrParticipants]=params;
  var totalExpense = 0;
  var numOfParticipants = arrParticipants.length;
  var eachPersonPay=0;
  var totalPersonPaid=0;
  var owedMoney=0;
  var aResult={};

  var sortedResult = [];

  for (var i=0;i<rows.length;i++){
    totalExpense += rows[i]['expense'];
  }
  eachPersonPay = Math.round((totalExpense/numOfParticipants + Number.EPSILON) * 100) / 100

  for (var k=0; k<numOfParticipants;k++){
    for(var j=0; j<rows.length; j++){
      if(rows[j]['paidBy']==arrParticipants[k])
        totalPersonPaid += rows[j]['expense'];
        owedMoney = totalPersonPaid - eachPersonPay;
    }
    aResult.name = arrParticipants[k];
    aResult.owedMoney = Math.round((owedMoney + Number.EPSILON) * 100) / 100;
    aResult.currOwedMoney = Math.round((owedMoney + Number.EPSILON) * 100) / 100;
    aResult.transaction = [];
    sortedResult.push(aResult);
  
    totalPersonPaid=0;
    owedMoney = 0;
    aResult={};
    sortedResult.sort((a,b) => parseFloat(a.owedMoney) - parseFloat(b.owedMoney));
    console.log(sortedResult);
  }

  //Two pointers
   var a = 0;
   var b = sortedResult.length-1;
   while(a<b){
      if(Math.abs(sortedResult[a].currOwedMoney) >= Math.abs(sortedResult[b].currOwedMoney)){
        sortedResult[a].currOwedMoney += sortedResult[b].currOwedMoney;
        sortedResult[a].transaction.push({id:sortedResult[b].name,credit:-sortedResult[b].currOwedMoney});
        sortedResult[b].transaction.push({id:sortedResult[a].name,credit:sortedResult[b].currOwedMoney});
        sortedResult[b].currOwedMoney = 0;
      }

      else{
        sortedResult[b].currOwedMoney -= Math.abs(sortedResult[a].currOwedMoney);
        sortedResult[a].transaction.push({id:sortedResult[b].name,credit:sortedResult[a].currOwedMoney});
        sortedResult[b].transaction.push({id:sortedResult[a].name,credit:Math.abs(sortedResult[a].currOwedMoney)});
        sortedResult[a].currOwedMoney = 0;
      }

      if(sortedResult[a].currOwedMoney == 0){
        a++;
      }
   
      if(sortedResult[b].currOwedMoney == 0){
       b--;
     }
    
   } //end while

   console.log(sortedResult);

  return sortedResult;
}

export default helper(costBreakdownCalc);


