import {module , test} from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, fillIn, click} from '@ember/test-helpers'
import {hbs} from 'ember-cli-htmlbars'
// import {localStorageHelper} from '../../app/helpers/local-storage'

module('Integration | Component | main-display' , function(hooks) { 
    setupRenderingTest(hooks)

    test('MainDisplay Renders' , async function(assert) {
        await render(hbs`<MainDisplay />`)

        assert.ok(this.element.querySelector('[data-test-main-display]'),'Renders Application Successfully')
    })

    test('Name Input Field Check' , async function(assert) {

        //let localStorage = localStorageHelper();

        localStorage.setItem("isLoggedIn" ,"true")

        await render(hbs `<MainDisplay />`)

        
        await fillIn('#names','Jasper');
        //await fillIn('names-input','Jasper');

        //debugger;
        //await click('[add-new-record]')
        // const nameField = document.querySelector('#names')

        //assert.equal(names-input,'Jasper', 'Name input field updated correctly')

        assert.equal(this.element.querySelector('#names').value, 'Jasper' , 'Name input field updated correctly')
        // assert.ok(nameField.textContent.includes('Jasper') , 'Name Inputted to Field Correctly')
        

    })

    test('Name Input Field Remove Check' , async function(assert) {
        await render(hbs `<MainDisplay />`);

        await fillIn('[names-input]','Jasper');
        await fillIn('[names-input]','');

        assert.equal(this.element.querySelector('[names-input]').value, '' , 'Name input field removed correctly')
    })

    test('Event Input Field Check' , async function(assert) {
        await render(hbs `<MainDisplay />`)

        await fillIn('[event]','food');

        assert.equal(this.element.querySelector('[event]').value, 'food' , 'Event input field updated correctly')
    })
})