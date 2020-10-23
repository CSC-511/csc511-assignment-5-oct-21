# csc511-assignment-4-october-7

This app is build onto assignment 4 (cost-break-down-calculator). Updated the app to use local storage from the users broswer. Sign In and Sign Up were two more added components. Users will need to create an account in order to use the calculator. Sign up will propt a different component where they can enter a user name, password and the same password for verification. If a user with the same username already exists then it will be prompted and the user will have to make a different username. All users spending events will be saved. If they refresh the page while logged in, the data will be saved. If the user logs out and logs back in at a later time, the data will still be saved. 

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone -b dansobolev --single-branch https://github.com/CSC-511/csc511-assignment-5-oct-21.git`
* `cd csc511-assignment-5-oct-21`
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
