import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | final-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<FinalList />`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('Final List Displays only when the add button is pressed and there are 2 or more events to calculate', async function(assert) {
    this.set('testArray', [{name: 'person1', event: 'event1', spent: 1}]);
    await render(hbs`<FinalList @sharedArr={{this.testArray}} />`);

    let list = this.element.querySelector('[data-test-final-list]');
    let listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 0, 'Initially final list should not display any events until the tally up button is pressed with one event in the list');

    await click('[data-test-tally-up-btn]')
    list = this.element.querySelector('[data-test-final-list]');
    listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 0, 'List will not show any items even if the button is pressed if there is only one event to calculate');

    this.set('testArray', [{name: 'person1', event: 'event1', spent: 1}, {name: 'person2', event: 'event2', spent: 2}]);
    await render(hbs`<FinalList @sharedArr={{this.testArray}} />`);

    list = this.element.querySelector('[data-test-final-list]');
    listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 0, 'Initially final list should not display any events until the tally up button is pressed with two event in the list');

    await click('[data-test-tally-up-btn]')
    list = this.element.querySelector('[data-test-final-list]');
    listItems = list.getElementsByTagName('li')
    assert.equal(listItems.length, 2, 'List displays two items when the add button is pressed');

  });
});
