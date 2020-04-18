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
  @success={{this.onSuccess}}
  @error={{this.onError}}
>
  Click To Copy
</CopyButton>

<!-- Get text from action that returns a string -->
<CopyButton
  @clipboardText={{this.getClipboardText}}
  @success={{this.onSuccess}}
  @error={{this.onError}}
>
  Click To Copy
</CopyButton>

<!-- Get text from target element -->
<input id="url" type="text" value="https://github.com/jkusa/ember-cli-clipboard">
<CopyButton
  @clipboardTarget="#url"
  @success={{this.onSuccess}}
  @error={{this.onError}}
>
  Click To Copy
</CopyButton>
```

### Classic Invocation

```hbs
{{#copy-button
  clipboardText="text to be copied"
  success=(action "onSuccess")
  error=(action "onError")
}}
  Click To Copy
{{/copy-button}}
```

### Arguments

- `clipboardText` - string value or action that returns a string to be copied
- `clipboardTarget` - selector string of element from which to copy text
- `clipboardAction` - string value of operation: `copy` or `cut` (default is copy)
- `delegateClickEvent` - clipboard.js defaults event listeners to the body in order to reduce memory footprint if there are hundreds of event listeners on a page. If you want to scope the event listener to the copy button, set this property to `false`
- `buttonType` - string value of the button's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes)

Any HTML [button attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes) passed to the component will be "splatted" on the button element. The one exception to this is the `type` attribute due to this [issue](https://github.com/emberjs/ember.js/issues/18232). The following legacy arguments are still supported:

- `title` - string value of the button's [title attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title)
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
  triggerCopySuccess,
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

test('copy button message', async function (assert) {
  assert.expect(3);

  await visit('/');
  assert.dom('.alert').doesNotExist('no alert message is initially present');

  triggerCopySuccess();

  assert
    .dom('.alert.alert-success')
    .exists('a success message is displayed when a copy is successful');

  triggerCopyError();

  assert
    .dom('.alert.alert-info')
    .exists('an error message is displayed when a copy is unsuccessful');
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

test('copy-button integration', async function(assert) {
  assert.expect(2);

  this.set('onSuccess', () => {
    assert.ok(true, '`success` action handler correctly fired');
  });

  this.set('onError', () => {
    assert.ok(true, '`error` action handler correctly fired');
  });

  await render(hbs`
    <CopyButton
      class="my-copy-btn"
      @clipboardText="text to be copied"
      @success={{this.onSuccess}}
      @error={{this.onError}}
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
