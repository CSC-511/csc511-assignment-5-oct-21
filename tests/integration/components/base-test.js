import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { localStorageUtil, LOCAL_STORAGE_KEY_NAME,LOCAL_STORAGE_KEY_USERS } from '../utils/local-storage';

module('Integration | Component | base', function(hooks) {
  setupRenderingTest(hooks);
  let testUser = {
    Username: this.currentValue,
    Password: this.currentPassword,
    isLoggedIn: true,
    calcList: []
  }

  test('Renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<Base></Base>`);
    assert.dom('h1').exists();
    assert.dom('h1').hasText('Universal Cost Splitter');
    
  });

  test('Adds people to list', async function(assert) {
    let  ls = localStorageUtil();
    
    ls.addUser(LOCAL_STORAGE_KEY_USERS,testUser);
    await render(hbs`<Base></Base>`);
    await fillIn('#name','Test Value');
    //await fillIn('[add-person-input]','Test Value');
    await click('[add-person-button]');
    const item = document.querySelector('ul#people li');
    await pauseTest();
    //assert.equal(list.getElementByTagName('li').length, 1, 'element added correctly');
    //const listItems = list.getElementByTagName('li');
    //assert.equal(list.textContent,'Test Value');
    assert.ok(item.textContent.includes('Test Value'));
  });

  test('Adds 3 people to list', async function(assert) {

    await render(hbs`<Base></Base>`);
    for(let i = 0; i < 3; i++){
      await fillIn('#name','Test Value'+i);
      await click('[add-person-button]');
    }
    
    const list = document.querySelector('ul#people');
    assert.equal(3, list.getElementsByTagName('li').length, 'Expected 10 people in the list');
  });

  test('Clears all people from list', async function(assert) {

    await render(hbs`<Base></Base>`);
    for(let i = 0; i < 3; i++){
      await fillIn('#name','Test Value'+i);
      await click('[add-person-button]');
    }
    await click('[clear-person-button]');
    const list = document.querySelector('ul#people');
    assert.equal(0, list.getElementsByTagName('li').length, 'Expected 10 people in the list');
  });

  test('Removes single person from list', async function(assert) {

    await render(hbs`<Base></Base>`);
    for(let i = 0; i < 3; i++){
      await fillIn('#name','Test Value'+i);
      await click('[add-person-button]');
    }
    await click('[remove-person-button]');
    const list = document.querySelector('ul#people');
    assert.equal(2, list.getElementsByTagName('li').length, 'Expected 10 people in the list');
  });

  test('Doesn\'t add more than 10 people to list', async function(assert) {

    await render(hbs`<Base></Base>`);
    for(let i = 0; i < 11; i++){
      await fillIn('#name','Test Value'+i);
      await click('[add-person-button]');
    }
    
    const list = document.querySelector('ul#people');
    assert.equal(10, list.getElementsByTagName('li').length, 'Expected 10 people in the list');
  });

  test('Doesn\'t add duplicate people to list', async function(assert) {

    await render(hbs`<Base></Base>`);
    for(let i = 0; i < 2; i++){
      await fillIn('#name','Test Value');
      await click('[add-person-button]');
    }

    const list = document.querySelector('ul#people');
    assert.equal(1, list.getElementsByTagName('li').length, 'Expected to only have 1 element in the list');
  });

  this.localStorage.deleteUser(LOCAL_STORAGE_KEY_USERS, testUser);
});
