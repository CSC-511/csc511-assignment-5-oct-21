import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from "@ember/object";
import {localStorageUtil, LOCAL_STORAGE_KEY_NAME, LOCAL_STORAGE_ID } from '../utils/local-storage-util'

export default class SplitCalcComponent extends Component {
    
    @tracked eventList =[];
    @tracked nameList = [];
    @tracked owedList = [];    
    @tracked numDivide = 0;
    @tracked totalSpent = 0;
    @tracked totalOwed = 0;
    @tracked currentNameValue;
    @tracked currentEventValue;
    @tracked currentPriceValue;
    @tracked currentNameValue2;
    @tracked key =  LOCAL_STORAGE_KEY_NAME;
    @tracked indexID = LOCAL_STORAGE_ID;
    @tracked localData =[];

    constructor(){
        super(...arguments);
        this.calculateMoney()
        
        this.LocalStorageData = localStorageUtil();
        if (this.LocalStorageData.hasData(this.key + this.indexID)){
        this.localData = this.LocalStorageData.getData(this.key + this.indexID)

        if(this.localData.numDivide > 0){
            this.eventList = this.localData.eventList
            this.nameList = this.localData.nameList
            this.owedList = this.localData.owedList
            this.numDivide = this.localData.numDivide
            this.totalSpent = this.localData.totalSpent
            this.totalOwed = this.localData.totalOwed
            }
        }
    }

    updateLocalStorage(){

        this.dataValue = {
                eventList: this.eventList,
                nameList: this.nameList,
                owedList :this.owedList,    
                numDivide :this.numDivide,
                totalSpent :this.totalSpent,
                totalOwed :this.totalOwed,
            }

            this.LocalStorageData.extendData(this.key +  this.indexID, this.dataValue)
            this.localData = this.LocalStorageData.getData(this.key +  this.indexID)
    }
    
    @action
    addToName(name){
        for(var i = 0; i < this.nameList.get('length'); i++){ 
            if (this.nameList[i].participant == name){
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
            this.nameList.pushObject({participant: name, owed: 0});
            this.totalOwed = this.totalSpent/this.numDivide
            this.totalOwed = this.totalOwed.toFixed(2);
            
        }
        this.updateLocalStorage()
    }
 
    async updateList(){
        
        setTimeout(() => {this.updateList();}, 1000);
        this.nameList = JSON.parse(JSON.stringify(this.nameList))
        this.owedList = JSON.parse(JSON.stringify(this.nameList))
        for(var i = 0; i < this.owedList.get('length'); i++){
            this.owedList[i].owed = this.owedList[i].owed - this.totalOwed;         
        }
    }

    async calculateMoney(){

        this.nameList = JSON.parse(JSON.stringify(this.nameList))
        this.owedList = JSON.parse(JSON.stringify(this.nameList))
        for(var i = 0; i < this.owedList.get('length'); i++){
            this.owedList[i].owed = this.owedList[i].owed - this.totalOwed;         
        }
        setTimeout(() => {this.updateList();}, 1000);
    
    }

    @action 
    addToList(name, event, price){

        if (isNaN(price)){

            alert("This is not a valid input.");
        }
        
        else if(price <= 0){
            price = "0";
            this.eventList.pushObject({participant: name, nameEvent: event, priceEvent: price});

        }
        

        else{
            for(var i = 0; i < this.nameList.get('length'); i++){
                if (this.nameList[i].participant == name){
                    this.nameList[i].owed += +price;
                    this.totalSpent += +price;
                    this.eventList.pushObject({participant: name, nameEvent: event, priceEvent: price});
  
                    }
                }
                
            }
            this.totalOwed = this.totalSpent/this.numDivide
            this.totalOwed = this.totalOwed.toFixed(2);
            this.currentNameValue = '';
            this.currentEventValue = '';
            this.currentPriceValue = '';
            console.log(this.eventList)
        this.updateLocalStorage()

    }

    @action 
    deleteEventList(){
        this.eventList = [];
        for(var i = 0; i < this.nameList.get('length'); i++){
            this.nameList[i].owed = 0;            
            }
            this.totalSpent = 0;
            this.owedList = JSON.parse(JSON.stringify(this.nameList))
        this.updateLocalStorage()

        }
        
  
    @action 
    deleteEventListAtIndex(index){
        
        for(var i = 0; i < this.nameList.get('length'); i++){ 
            if (this.nameList[i].participant === this.eventList[index].participant){
            this.nameList[i].owed = this.nameList[i].owed - this.eventList[index].priceEvent
            this.totalSpent = this.totalSpent - this.eventList[index].priceEvent
            }
            }
        this.eventList.removeAt(index);
        this.totalOwed = this.totalSpent/this.numDivide
        this.totalOwed = this.totalOwed.toFixed(2);
        this.updateLocalStorage()

        
            }

    @action 
    deleteNameListAtIndex(index){
        for(var i = 0; i < this.eventList.get('length'); i++){ 
            if (this.eventList[i].participant === this.nameList[index].participant)
                this.totalSpent = this.totalSpent - this.eventList[i].priceEvent
                this.eventList.removeAt(i);
        }
                for(var k = 0; k < this.eventList.get('length'); k++){ 
                    if (this.eventList[k].participant.includes(this.nameList[index].participant))
                        this.totalSpent = this.totalSpent - this.eventList[k].priceEvent
                        this.eventList.removeAt(k);
        
                    }
                    for(var x = 0; x < this.eventList.get('length'); x++){ 
                        if (this.eventList[x].participant === this.nameList[index].participant)
                            this.totalSpent = this.totalSpent - this.eventList[x].priceEvent
                            this.eventList.removeAt(x);
                    }
            this.totalOwed = this.totalSpent/this.numDivide
            this.totalOwed = this.totalOwed.toFixed(2);
            this.numDivide--;
            this.nameList.removeAt(index);
        this.updateLocalStorage()                
    }

    @action
    selectName(index){
        this.currentNameValue2 = this.nameList[index].participant        
    }
    @action                                                          
    inputNameValue(input){
        this.currentNameValue  = input.target.value;    
    }
    @action 
    inputEventValue(input){
        this.currentEventValue  = input.target.value;   
    }
    @action 
    inputPriceValue(input){
        this.currentPriceValue  = input.target.value;    
    }
                
}
