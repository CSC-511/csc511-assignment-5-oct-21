import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class SplitCalcComponent extends Component {
    
    @tracked eventList = [];
    @tracked nameList = [];
    @tracked owedList = [];    
    @tracked numDivide = 0;
    @tracked totalSpent = 0;
    @tracked totalOwed = 0;
    @tracked currentNameValue;
    @tracked currentEventValue;
    @tracked currentPriceValue;
    @tracked currentNameValue2;

    arr1 = [1,2,3,4,5]

    constructor(){
        super(...arguments);
        this.calculateMoney()
    }
    
    addToName(name){
        for(var i = 0; i < this.nameList.get('length'); i++){ 
            if (this.nameList[i][0] == name){
            alert("This name already exists.")
            return false;
            }
        }

        if (name === ''|| name === null ){

            alert("Empty input not allowed.");
            return false;
        }
        else{
            this.numDivide++;
            this.currentNameValue = '';
            this.nameList.pushObject([name, 0]);
            this.totalOwed = this.totalSpent/this.numDivide
            this.totalOwed = this.totalOwed.toFixed(2);

            console.log(this.nameList)
        }                          
    }
 
    async updateList(){
        
        setTimeout(() => {this.updateList();}, 1000);
        this.nameList = JSON.parse(JSON.stringify(this.nameList))
        this.owedList = JSON.parse(JSON.stringify(this.nameList))
        for(var i = 0; i < this.owedList.get('length'); i++){
            this.owedList[i][1] = this.owedList[i][1] - this.totalOwed;         
        }
    }

    async calculateMoney(){

        this.nameList = JSON.parse(JSON.stringify(this.nameList))
        this.owedList = JSON.parse(JSON.stringify(this.nameList))
        for(var i = 0; i < this.owedList.get('length'); i++){
            this.owedList[i][1] = this.owedList[i][1] - this.totalOwed;         
        }
        setTimeout(() => {this.updateList();}, 1000);
    }

    addToList(name, event, price){

        if (isNaN(price)){

            alert("This is not a valid input.");
        }
        
        else if(price <= 0){
            price = "0";
            this.eventList.pushObject([name, event, price]);

        }
        

        else{
            for(var i = 0; i < this.nameList.get('length'); i++){
                if (this.nameList[i][0] == name){
                    this.nameList[i][1] += +price;
                    this.totalSpent += +price;
                    this.eventList.pushObject([name, event, price]);
  
                    }
                }
                
            }
            this.totalOwed = this.totalSpent/this.numDivide
            this.totalOwed = this.totalOwed.toFixed(2);
            this.currentNameValue = '';
            this.currentEventValue = '';
            this.currentPriceValue = '';
            console.log(this.eventList)
    }


    deleteEventList(){
        this.eventList = [];
        for(var i = 0; i < this.nameList.get('length'); i++){
            this.nameList[i][1] = 0;            
            }
            this.totalSpent = 0;
            this.owedList = JSON.parse(JSON.stringify(this.nameList))
        }
  
    
    deleteEventListAtIndex(index){
        
        for(var i = 0; i < this.nameList.get('length'); i++){ 
            if (this.nameList[i][0] === this.eventList[index][0]){
            this.nameList[i][1] = this.nameList[i][1] - this.eventList[index][2]
            this.totalSpent = this.totalSpent - this.eventList[index][2]
            }
            }
        this.eventList.removeAt(index);
        this.totalOwed = this.totalSpent/this.numDivide
        this.totalOwed = this.totalOwed.toFixed(2);
        
            }


    deleteNameListAtIndex(index){
        for(var i = 0; i < this.eventList.get('length'); i++){ 
            if (this.eventList[i][0] === this.nameList[index][0])
                this.totalSpent = this.totalSpent - this.eventList[i][2]
                this.eventList.removeAt(i);
        }
                for(var k = 0; k < this.eventList.get('length'); k++){ 
                    if (this.eventList[k][0].includes(this.nameList[index][0]))
                        this.totalSpent = this.totalSpent - this.eventList[k][2]
                        this.eventList.removeAt(k);
        
                    }
                    for(var x = 0; x < this.eventList.get('length'); x++){ 
                        if (this.eventList[x][0] === this.nameList[index][0])
                            this.totalSpent = this.totalSpent - this.eventList[x][2]
                            this.eventList.removeAt(x);
                    }
            this.totalOwed = this.totalSpent/this.numDivide
            this.totalOwed = this.totalOwed.toFixed(2);
            this.numDivide--;
            this.nameList.removeAt(index);
                
                    }
    selectName(index){
        this.currentNameValue2 = this.nameList[index][0]
        
    }
                                                              
    inputNameValue(input){
        this.currentNameValue  = input.target.value;    
    }
    inputEventValue(input){
        this.currentEventValue  = input.target.value;   
    }
    inputPriceValue(input){
        this.currentPriceValue  = input.target.value;    
    }                
}
