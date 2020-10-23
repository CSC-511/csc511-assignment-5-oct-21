import { addBtnDisabled } from 'csc511-assignment-4-october-7/helpers/add-btn-disabled';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | add-btn-disabled', function(hooks) {
  setupTest(hooks);
  
  test('Disabling the add button when conditions (lenght of an array must be LESS than 10, and all input fields must be inputed) are met', function(assert) {

    assert.equal(addBtnDisabled([[], "something1", "something2", "something3"]), null, 'will not disable with 0 lenght array');
    assert.equal(addBtnDisabled([[1], "something1", "something2", "something3"]), null, 'will not disable with 1 lenght array');
    assert.equal(addBtnDisabled([[1, 2], "something1", "something2", "something3"]), null, 'will not disable with 2 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3], "something1", "something2", "something3"]), null, 'will not disable with 3 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4], "something1", "something2", "something3"]), null, 'will not disable with 4 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5], "something1", "something2", "something3"]), null, 'will not disable with 5 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6], "something1", "something2", "something3"]), null, 'will not disable with 6 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7], "something1", "something2", "something3"]), null, 'will not disable with 7 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8], "something1", "something2", "something3"]), null, 'will not disable with 8 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8, 9], "something1", "something2", "something3"]), null, 'will not disable with 9 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 2, 3]), null, 'will not disable with 9 lenght array and int data types for all inputs');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "something1", "something2", "something3"]), true, 'will disable with 10 lenght array');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8, 9], "", "", ""]), true, 'will disable with 1 length array and nothing in all input fields');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8, 9], "something1", "", ""]), true, 'will disable with 1 length array and nothing in 2 input fields');
    assert.equal(addBtnDisabled([[1, 2, 3, 4, 5, 6, 7, 8, 9], "something1", "something2", ""]), true, 'will disable with 1 length array and nothing in 1 input fields');
  });    



});
