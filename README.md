# ember-cli-clipboard

[![Downloads](http://img.shields.io/npm/dm/ember-cli-clipboard.svg?style=flat-square)](https://npmjs.org/package/ember-cli-clipboard)
[![Build Status](https://travis-ci.org/jkusa/ember-cli-clipboard.svg?branch=master)](https://travis-ci.org/jkusa/ember-cli-clipboard) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-clipboard.svg)](http://emberobserver.com/addons/ember-cli-clipboard)

A simple ember wrapper around [clipboard.js](http://zenorocha.github.io/clipboard.js/) (no flash)

## Demo Page

http://jkusa.github.io/ember-cli-clipboard

## Usage

### Angle Bracket Invocation

```hbs
<!-- Set text directly -->
<CopyButton
  @clipboardText="text to be copied"
  @success={{action "success"}}
  @error={{action "error"}}
>
  Click To Copy
</CopyButton>

<!-- Get text from action that returns a string -->
<CopyButton
  @clipboardText={{action "getClipboardText"}}
  @success={{action "success"}}
  @error={{action "error"}}
>
  Click To Copy
</CopyButton>

<!-- Get text from target element -->
<input id="url" type="text" value="https://github.com/jkusa/ember-cli-clipboard">
<CopyButton
  @clipboardTarget="#url"
  @success={{action "success"}}
  @error={{action "error"}}
>
  Click To Copy
</CopyButton>
```

### Classic Invocation

```hbs
{{#copy-button
  clipboardText="text to be copied"
  success=(action "success")
  error=(action "error")
}}
  Click To Copy
{{/copy-button}}
```

### Properties

- `clipboardText` - string value or action that returns a string to be copied
- `clipboardTarget` - selector string of element from which to copy text
- `clipboardAction` - string value of operation: `copy` or `cut` (default is copy)
- `delegateClickEvent` - clipboard.js defaults event listeners to the body in order to reduce memory footprint if there are hundreds of event listeners on a page. If you want to scope the event listener to the copy button, set this property to `false`
- `title` - string value of the button's [title attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)
- `buttonType` - string value of the button's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes)
- `disabled` - boolean value of the button's [disabled attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes)
- `aria-label` - string value of the button's [aria-label attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Actions

The following clipboard.js custom events are sent as actions

- `success` sent on successful copy
- `error` sent on failed copy

More information about the clipboard.js events can be found [here](https://github.com/zenorocha/clipboard.js/#events)

## Template Helper

The helper `is-clipboard-supported` can be used to check if [clipboard.js](http://zenorocha.github.io/clipboard.js/) is supported or not.

```hbs
{{#if (is-clipboard-supported)}}
  <CopyButton @clipboardTarget="#url">
    Click To Copy
  </CopyButton>
{{/if}}
```

## Test Helpers

Some browsers do not allow simulated clicks to fire `execCommand('copy')`. This makes testing difficult. To assist with integration testing, the following test helpers are available to test the wiring of the `success` and `error` action handlers.

### Acceptance Test Helpers

- `triggerCopySuccess(selector='.copy-btn')`
- `triggerCopyError(selector='.copy-btn')`

If you are using the **NEW Ember Testing API**, available in **ember-cli-qunit >= 4.2** and **ember-cli-mocha >= 0.15.0**, then you can simply import the test helpers where needed (for both acceptance and integration tests).

```js
// tests/acceptance/my-test.js

import {
  triggerCopyError,
  triggerCopySuccess
} from 'ember-cli-clipboard/test-support';
```

Otherwise, to use the helpers in acceptance tests you need to register them in the `/tests/helpers/start-app.js` file.

```js
// tests/helpers/start-app.js

import registerClipboardHelpers from '../helpers/ember-cli-clipboard';

registerClipboardHelpers();

export default function startApp(attrs) {

...

```

Example:

```js
// tests/acceptance/my-test.js

test('copy button message', function(assert) {
  assert.expect(3);

  visit('/');
  andThen(() => {
    assert.dom('.alert').doesNotExist('no alert message is initially present');
  });

  triggerCopySuccess();

  andThen(() => {
    assert
      .dom('.alert.alert-success')
      .exists('a success message is displayed when a copy is successful');
  });

  triggerCopyError();

  andThen(() => {
    assert
      .dom('.alert.alert-info')
      .exists('an error message is displayed when a copy is unsuccessful');
  });
});
```

### Integration Test Helpers

- New Testing API (**ember-cli-qunit >= 4.2** or **ember-cli-mocha >= 0.15.0**)

  - `triggerCopySuccess(selector='.copy-btn')`
  - `triggerCopyError(selector='.copy-btn')`

- Old Testing API
  - `triggerSuccess(context, selector='.copy-btn')`
  - `triggerError(context, selector='.copy-btn')`

Example:

```js
// tests/integration/components/my-test.js

// if using NEW ember testing api
import {
  triggerCopyError,
  triggerCopySuccess
} from 'ember-cli-clipboard/test-support';

// if using OLD ember testing api
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
    <CopyButton
      @classNames="my-copy-btn"
      @clipboardText="text to be copied"
      @success={{action "success"}}
      @error={{action "error"}}
    >
      Click To Copy
    </CopyButton>
  `);

  //If using NEW ember testing api
  triggerCopyError('.my-copy-btn');
  triggerCopySuccess('.my-copy-btn');

  //If using OLD ember testing api
  triggerError(this, '.my-copy-btn');
  triggerSuccess(this, '.my-copy-btn');
});

```

## Browser Support

For browser support information, checkout the [clipboard.js](http://zenorocha.github.io/clipboard.js/) documentation:

https://github.com/zenorocha/clipboard.js/#browser-support

## Contributing

Contributions are welcomed. Please read the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE.md).
