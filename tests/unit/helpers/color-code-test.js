import { colorCode } from 'csc511-assignment-4-october-7/helpers/color-code';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Helper | color-code', function(hooks) {
  setupTest(hooks);
  
  test('Returns a class for the app to display the ', function(assert) {
    assert.equal(colorCode(1), 'text-success', 'text is green for a postive amount');
    assert.equal(colorCode(-1), 'text-danger', 'text is red for a negative amount');
    assert.equal(colorCode(0), '', 'text is default for 0');
    assert.equal(colorCode('something'), '', 'shows white or default color because text is not int, float, or double');
  });
});
