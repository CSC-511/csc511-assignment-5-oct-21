# assignment-3-final

This README outlines the details of collaborating on this Ember application.

This Application is a calculator that should emulate the basic function of the Splitwise App: Gather the number of participants, add a corresponding event to participants, and their contribution to that event. Once the participants and the events are allocated, a tally up button appears and shows how much money was spent that night, how much each person should contribute, who is owed money and who owes money.

The code stores the inputted people as an array of objects with the data of the event that they participated in, the amount they contributed, and the amount they owe. Every time the Add Person button is selected, all the information is stored in this array and rendered. Once the tally up button is clicked, the diviUp() function takes every object in the array and averages the contributions made by each person. The array is then sorted based by first the people that need money back, to people that owe money. 


The result of the tally up is rendered with colored bordered boxes: green for people who is owed money, and red for people who owes money. 



## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd assignment-3-final`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
