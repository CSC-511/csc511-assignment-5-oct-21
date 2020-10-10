import { USdollarFormat } from '../../app/helpers/USDollarFormat'
import {module, test} from 'qunit';

module('Unit | Helper | USdollarFormat' , function(hooks) {
    test('Converts to US Dollar Format Successfully' , function(assert) {
        assert.equal(USdollarFormat(10) , '$10.00' , 'Shows Correct Currency Format ($10.00)')
    })
})

//../../app/helpers/USDollarFormat