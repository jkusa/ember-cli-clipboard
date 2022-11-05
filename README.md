# ember-cli-clipboard

[![Downloads](http://img.shields.io/npm/dm/ember-cli-clipboard.svg?style=flat-square)](https://npmjs.org/package/ember-cli-clipboard)
[![Build Status](https://github.com/jkusa/ember-cli-clipboard/actions/workflows/ci.yml/badge.svg)](https://github.com/jkusa/ember-cli-clipboard/actions?query=branch%3Amain)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-clipboard.svg)](http://emberobserver.com/addons/ember-cli-clipboard)

A simple ember wrapper around [clipboard.js](http://zenorocha.github.io/clipboard.js/) (no flash)

## Demo Page

http://jkusa.github.io/ember-cli-clipboard

## Usage

### CopyButton Component

```hbs
<!-- Set text directly -->
<CopyButton
  @text='text to be copied'
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Click To Copy
</CopyButton>

<!-- Get text from action that returns a string -->
<CopyButton
  @text={{this.getText}}
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Click To Copy
</CopyButton>

<!-- Get text from target element -->
<input
  id='url'
  type='text'
  value='https://github.com/jkusa/ember-cli-clipboard'
/>
<CopyButton
  @target='#url'
  @onSuccess={{this.onSuccess}}
  @onError={{this.onError}}
>
  Click To Copy
</CopyButton>
```

#### Arguments

- `text` - string value or action that returns a string to be copied
- `target` - selector string of element or action that returns an element from which to copy text
- `action` - string value of operation: `copy` or `cut` (default is copy)
- `container` - selector string or element object of containing element. "For use in Bootstrap Modals or with any other library that changes the focus you'll want to set the focused element as the container value".
- `delegateClickEvent` - clipboard.js defaults event listeners to the body in order to reduce memory footprint if there are hundreds of event listeners on a page. If you want to scope the event listener to the copy button, set this property to `false`
- `buttonType` - string value of the button's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes) (for Ember < `3.25.x`, see below)

Any HTML [button attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes) passed to the component will be "splatted" on the button element. The one exception to this is the `type` attribute due to this [issue](https://github.com/emberjs/ember.js/issues/18232) < Ember `3.25.x`.

#### Actions

The following clipboard.js custom events are sent as actions

- `onSuccess` sent on successful copy
- `onError` sent on failed copy

More information about the clipboard.js events can be found [here](https://github.com/zenorocha/clipboard.js/#events)

### Clipboard Element Modifier

Under the hood the `<CopyButton>` component is powered by a `{{clipboard}}` element modifier. This can be used directly as an alternative to the `<CopyButton>` component. It has the same argument contract as the `<CopyButton>` component except for the exclusion of the `buttonType` argument.

```hbs
<button
  class='button is-outline'
  type='button'
  {{clipboard text='text to be copied' onSuccess=this.onSuccess}}
>
  Click To Copy
</button>
```

### Template Helper

The helper `is-clipboard-supported` can be used to check if [clipboard.js](http://zenorocha.github.io/clipboard.js/) is supported or not.

```hbs
{{#if (is-clipboard-supported)}}
  <CopyButton @target='#url'>
    Click To Copy
  </CopyButton>
{{/if}}
```

## Test Helpers

Some browsers do not allow simulated clicks to fire `execCommand('copy')`. This makes testing difficult. To assist with integration testing, the following test helpers are available to test the wiring of the `success` and `error` action handlers.

### Acceptance Test Helpers

- `triggerCopySuccess(selector='.copy-btn')`
- `triggerCopyError(selector='.copy-btn')`

```js
// tests/acceptance/my-test.js

import {
  triggerCopyError,
  triggerCopySuccess,
} from 'ember-cli-clipboard/test-support';
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

- `triggerCopySuccess(selector='.copy-btn')`
- `triggerCopyError(selector='.copy-btn')`

Example:

```js
// tests/integration/components/my-test.js

// if using NEW ember testing api
import {
  triggerCopyError,
  triggerCopySuccess,
} from 'ember-cli-clipboard/test-support';

test('copy-button integration', async function (assert) {
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
      @text="text to be copied"
      @onSuccess={{this.onSuccess}}
      @onError={{this.onError}}
    >
      Click To Copy
    </CopyButton>
  `);

  //If using NEW ember testing api
  triggerCopyError('.my-copy-btn');
  triggerCopySuccess('.my-copy-btn');
});
```

## Browser Support

For browser support information, checkout the [clipboard.js](http://zenorocha.github.io/clipboard.js/) documentation:

https://github.com/zenorocha/clipboard.js/#browser-support

## Contributing

Contributions are welcomed. Please read the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE.md).
