import { tallyUpBtnDisabled } from 'csc511-assignment-4-october-7/helpers/tally-up-btn-disabled';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | tally-up-btn-disabled', function(hooks) {
  setupTest(hooks);

  test('Disabling the add button when conditions (lenght of an array must be GREATER than 1)', function(assert) {
    assert.equal(tallyUpBtnDisabled([[]]), true, 'will disable with 0 length array');
    assert.equal(tallyUpBtnDisabled([[1]]), true, 'will disable with 1 length array');
    assert.equal(tallyUpBtnDisabled([[1, 2]]), false, 'will not disable with 2 length array');
    assert.equal(tallyUpBtnDisabled([[1, 2, 3]]), false, 'will not disable with 3 length array');
  });
});
