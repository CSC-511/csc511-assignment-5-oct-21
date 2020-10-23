import { dollarFormatter } from 'csc511-assignment-4-october-7/helpers/dollar-formatter';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | dollar-formatter', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('Formats a number to USD currency format', function(assert) {
    assert.equal(dollarFormatter(-7), '-$7.00', 'formats negative amount correctly')
    assert.equal(dollarFormatter(7), '$7.00', 'formats positive amount correctly')
    assert.equal(dollarFormatter(12456890), '$12,456,890.00', 'formats positive large amount correctly');
    assert.equal(dollarFormatter('12456890'), '$12,456,890.00', 'formats string of numbers correctly');
    assert.equal(dollarFormatter(456.897), '$456.90', 'formats float/double correctly that rounds the cents up');
    assert.equal(dollarFormatter(456.892), '$456.89', 'formats float/double correctly that rounds the cents down');
  });
});
