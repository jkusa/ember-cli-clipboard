# ember-cli-clipboard

[![Downloads](http://img.shields.io/npm/dm/ember-cli-clipboard.svg?style=flat-square)](https://npmjs.org/package/ember-cli-clipboard)
[![Build Status](https://travis-ci.org/jkusa/ember-cli-clipboard.svg?branch=master)](https://travis-ci.org/jkusa/ember-cli-clipboard) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-clipboard.svg)](http://emberobserver.com/addons/ember-cli-clipboard)

A simple ember wrapper around [clipboard.js](http://zenorocha.github.io/clipboard.js/) (no flash)

## Demo Page

http://jkusa.github.io/ember-cli-clipboard

## Usage

```hbs
<!-- Set text directly -->
{{#copy-button
  clipboardText='text to be copied'
  success=(action 'success')
  error=(action 'error')
}}
  Click To Copy
{{/copy-button}}

<!-- Get text from target element -->
<input id="url" type="text" value="https://github.com/jkusa/ember-cli-clipboard">
{{#copy-button
  clipboardTarget="#url"
  success=(action 'success')
  error=(action 'error')
}}
  Click To Copy
{{/copy-button}}
```

### Properties

* `clipboardText` - string value to be copied
* `clipboardTarget` - selector string of element from which to copy text
* `clipboardAction` - string value of operation: `copy` or `cut` (default is copy)
* `title` - string value of the button's [title attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)
* `buttonType` - string value of the button's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes)
* `disabled` - boolean value of the button's [disabled attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes)
* `aria-label` - string value of the button's [aria-label attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Actions

The following clipboard.js custom events are sent as actions

* `success` sent on successful copy
* `error` sent on failed copy

More information about the clipboard.js events can be found [here](https://github.com/zenorocha/clipboard.js/#events)

## Template Helper

The helper `is-clipboard-supported` can be used to check if [clipboard.js](http://zenorocha.github.io/clipboard.js/) is supported or not. 

```hbs
{{#if (is-clipboard-supported)}}
  {{#copy-button clipboardTarget="#url"}}  
    Click To Copy
  {{/copy-button}}
{{/if}}
```

## Test Helpers

Some browsers do not allow simulated clicks to fire `execCommand('copy')`. This makes testing difficult. To assist with integration testing, the following test helpers are available to test the wiring of the `success` and `error` action handlers.

### Integration Test Helpers

* `triggerSuccess(context, selector='.copy-btn')`
* `triggerError(context, selector='.copy-btn')`

Example:

```js
// tests/integration/components/my-test.js

...

import {
  triggerError,
  triggerSuccess
} from '../../helpers/ember-cli-clipboard';

...

test('copy-button integration', function(assert) {
  assert.expect(2);

  this.set('success', () => {
    assert.ok(true, '`success` action handler correctly fired');
  });

  this.set('error', () => {
    assert.ok(true, '`error` action handler correctly fired');
  });

  this.render(hbs`
    {{#copy-button
      classNames='my-copy-btn'
      clipboardText='text to copy'
      success=(action success)
      error=(action error)
    }}
      Click To Copy
    {{/copy-button}}
  `);

  triggerError(this, '.my-copy-btn');
  triggerSuccess(this, '.my-copy-btn');
});

```

### Acceptance Test Helpers

* `triggerCopySuccess(selector='.copy-btn')`
* `triggerCopyError(selector='.copy-btn')`

To use the helpers in acceptance tests you need to register them in the `/tests/helpers/start-app.js` file.

```js
// tests/helpers/start-app.js

...

import registerClipboardHelpers from '../helpers/ember-cli-clipboard';

registerClipboardHelpers();

export default function startApp(attrs) {

...

```

Example:

```js
// tests/acceptance/my-test.js

...

test('copy button message', function(assert) {
  assert.expect(3);

  visit('/');
  andThen(() => {
    assert.notOk(!!find('.alert').length,
      'no alert message is initially present');
  });

  triggerCopySuccess();

  andThen(() => {
    assert.ok(!!find('.alert.alert-success').length,
      'a success message is displayed when a copy is successful');
  });

  triggerCopyError();

  andThen(() => {
    assert.ok(!!find('.alert.alert-info').length,
      'an error message is displayed when a copy is unsuccessful');
  });
});
```

## Browser Support

For browser support information, checkout the [clipboard.js](http://zenorocha.github.io/clipboard.js/) documentation:

https://github.com/zenorocha/clipboard.js/#browser-support

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
