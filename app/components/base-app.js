import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import { inject as service }from '@ember/service';
import {localStorageUtil,LS_KEY_USERNAME,LS_KEY_arrParticipants,LS_KEY_spendingEventList} from '../utils/local-storage'

export default class BaseAppComponent extends Component {
    @tracked arrParticipants=[];
    @tracked currentParticipant;
    @tracked currentSpendingEvent;
    @tracked currentPaidBy;
    @tracked currentExpense;
    @tracked userName = "";
    @service router;

    @tracked
    rows=[];

    constructor(){
        super(...arguments);
        this.userName = localStorageUtil().getLoggedInMember(LS_KEY_USERNAME);
        console.log(this.userName);
        const localParticipants = localStorageUtil().get(LS_KEY_arrParticipants);
        const localSpendingEventsList = localStorageUtil().get(LS_KEY_spendingEventList);
        if(localStorageUtil().hasData(LS_KEY_arrParticipants)){
            this.arrParticipants = localParticipants;
        }
        else{
            localStorageUtil().remove(LS_KEY_arrParticipants);
        }

        if(localStorageUtil().hasData(LS_KEY_spendingEventList)){
            this.rows = localSpendingEventsList;
        }
        else{
            localStorageUtil().remove(LS_KEY_spendingEventList);
        }
    }

    @action
    redirectToLoginPage(){
        this.router.transitionTo('/');
    }

    addToArrParticipants(){
        //console.log(this.currentParticipant);
        this.arrParticipants.addObject(this.currentParticipant);
        localStorageUtil().merge(LS_KEY_arrParticipants, this.arrParticipants);
        this.currentParticipant="";
    }

    addRowtoEventsTable(){
        // console.log(this.currentSpendingEvent);
        // console.log(this.currentPaidBy);
        // console.log(this.currentExpense);
        var mRow={};
        mRow.spendingEvent = this.currentSpendingEvent;
        mRow.paidBy = this.currentPaidBy;
        mRow.expense = parseFloat(this.currentExpense);
        this.rows.pushObject(mRow);
        localStorageUtil().merge (LS_KEY_spendingEventList, this.rows);
        this.currentSpendingEvent="";
        this.currentPaidBy="";
        this.currentExpense="";
    }

    removeRowFromEventsTable(){
        //console.log(this.rows[index]);
        var index = document.getElementById("btnRemoveEvent").value;
        this.rows.removeAt(index);
    }

    changeParticipant(event){
        this.currentParticipant = event.target.value;
    }

    changeSpendingEvent(event){
        this.currentSpendingEvent = event.target.value;
    }

    changeCurrentPaidBy(event){
        this.currentPaidBy = event.target.value;
    }

    changeCurrentExpense(event){
        this.currentExpense = event.target.value;
    }

    get participantsCanBeAdded(){
        return(this.arrParticipants.length ) < 10;
    }

    get spendingEventsCanBeAdded(){
        return (this.rows.length < 10) && (this.arrParticipants.length > 0);
    }

    get spendingEventMoreThanTen(){
        return (this.rows.length == 10) && (this.rows.length != 0);
    }

    get HasNoParticipant(){
        return this.arrParticipants.length == 0;
    }

    get numOfParticipants(){
        return this.arrParticipants.length;
    }

}
