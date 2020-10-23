import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | input-expenses', function(hooks) {
  setupRenderingTest(hooks);

  test('It renders', async function(assert) {
      await render(hbs`<InputExpenses />`);
      assert.equal(this.element.textContent.trim(), 'Add', 'Component (Input Expenses) renders as expected');
  })

  test('It updates input values correctly after add button is clicked', async function(assert){
      await render(hbs`<InputExpenses />`);

      await fillIn('[data-test-name-input]', 'Person');
      await fillIn('[data-test-event-input]', 'Shopping');
      await fillIn('[data-test-spent-input]', '123');
      await click('[data-test-add-button]');

      assert.equal(this.element.querySelector('[data-test-name-input]').textContent.trim(), '', 'Name input updated correctly');
      assert.equal(this.element.querySelector('[data-test-event-input]').textContent.trim(), '', 'Event input updated correctly');
      assert.equal(this.element.querySelector('[data-test-spent-input]').textContent.trim(), '', 'Spent input updated correctly');
  });

  test('Add button will be disabled to user according to input fields inputted and the number of spending events added', async function(assert){
      await render(hbs`<InputExpenses />`);

      await fillIn('[data-test-name-input]', 'Person');
      await fillIn('[data-test-event-input]', 'Shopping');
      await fillIn('[data-test-spent-input]', '');
      assert.equal(this.element.querySelector('button').hasAttribute('disabled'), true, 'Add button is disabled because all input fields are not inputed')

      await fillIn('[data-test-name-input]', 'Person');
      await fillIn('[data-test-event-input]', 'Shopping');
      await fillIn('[data-test-spent-input]', '123');
      assert.equal(this.element.querySelector('button').hasAttribute('disabled'), false, 'Add button is not disabled because all input fields are inputed')

      for(let i = 0; i < 10; i++){
        await fillIn('[data-test-name-input]', 'Person'+i);
        await fillIn('[data-test-event-input]', 'Shopping'+i);
        await fillIn('[data-test-spent-input]', i);
        await click('[data-test-add-button]');
      }
      await fillIn('[data-test-name-input]', 'Person');
      await fillIn('[data-test-event-input]', 'Shopping');
      await fillIn('[data-test-spent-input]', '123');
      assert.equal(this.element.querySelector('button').hasAttribute('disabled'), true, 'Add button is disabled because no more than 10 events can be added even though input fields are inputted');
  });
});
