import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | calculator', function(hooks) {
  setupRenderingTest(hooks);

  test('Calculator Renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<Calculator></Calculator>`);
    assert.dom('ul').exists();
    
  });
});
