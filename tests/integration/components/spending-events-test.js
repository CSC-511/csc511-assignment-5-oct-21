import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | spending-events', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SpendingEvents />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <SpendingEvents>
        template block text
      </SpendingEvents>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('Displays an array of spending events through a passed in array of spending events and removes an event', async function(assert){
    this.set('testArray', [{name: 'person1', event: 'event1', spent: 1}]);
    await render(hbs `<SpendingEvents @sharedArr={{this.testArray}}/>`);
    let list = this.element.querySelector('[data-test-spending-events-list]');
    let listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 1, 'Displays one item from the passed in array')
  
    this.set('testArray', [{name: 'person1', event: 'event1', spent: 1}, {name: 'person2', event: 'event2', spent: 2}]);
    await render(hbs `<SpendingEvents @sharedArr={{this.testArray}}/>`);
    list = this.element.querySelector('[data-test-spending-events-list]');
    listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 2, 'Displays two item from the passed in array')

    await click('#remove-1');
    list = this.element.querySelector('[data-test-spending-events-list]');
    listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 1, 'Displays one item after remove button was clicked')
  });
});
