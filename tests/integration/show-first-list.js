import {module , test} from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, fillIn, click} from '@ember/test-helpers'
import {hbs} from 'ember-cli-htmlbars'

module('Integration | Component | show-first-list' , function(hooks) { 
    setupRenderingTest(hooks)

    test('ShowFirstList Renders' , async function(assert) {
        await render(hbs`<ShowFirstList />`)

        assert.ok(this.element.querySelector('[data-test-main-display]'),'Renders Application Successfully')
    })

    test('Add new Person and see if it renders' , async function(assert) {
        await render(hbs `<MainDisplay/>`)

        await fillIn('#names','Jasper');
        await click('[add-new-record]')

        await render(hbs `<ShowFirstList />`);

        const firstElementInList = document.querySelector('ul#person li')

        assert.ok(firstElementInList.textContent.includes('Jasper') , 'Person with name Jasper Added to list and rendered')

    })

    

})