import localStorage from 'assignment-3-final/utils/local-storage';
import { module, test } from 'qunit';

module('Unit | Utility | local-storage', function() {

  // TODO: Replace this with your real tests.
  test('it works', function(assert) {
    let result = localStorage();
    assert.ok(result);
  });
});
