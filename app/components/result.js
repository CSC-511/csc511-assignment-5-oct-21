import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';

export default class ResultComponent extends Component {
    @tracked splitwiseList = [];
    
    constructor(){
        super(...arguments);
        this.splitwiseList = this.args.splitwiseList;
    }


}