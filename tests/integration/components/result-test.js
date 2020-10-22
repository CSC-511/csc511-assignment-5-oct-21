import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | result', function(hooks) {
  setupRenderingTest(hooks);

  test('Result Renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Result></Result>`);
    assert.dom('ul').exists();
  });

  test('Equal purchases check', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<Base></Base>`)
    for(let i = 0; i < 2; i++){
      await fillIn('#name','Test Value'+i);
      await click('[add-person-button]');
    }

    const item = document.querySelector('.result ul li');

    assert.ok(item.textContent.includes('This person owe\'s nothing'));
  });

  test('Unequal purchases check', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<Base></Base>`)
    for(let i = 0; i < 2; i++){
      await fillIn('#name','Test Value'+i);
      await click('[add-person-button]');
    }
    const item = document.querySelector('ul#people li');
  
    await fillIn(item.lastElementChild, 5);
    const res = document.querySelector('.result ul li');
    
    assert.ok(res.textContent.includes('Test Value0 is owed 2.50$ from Test Value1'));
  });
});
