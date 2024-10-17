# @aklkv/ember-cli-clipboard

A simple Ember wrapper around [clipboard.js](https://clipboardjs.com) for
copying or cutting text to the clipboard.

> **Note:** This is a maintained fork of
> [ember-cli-clipboard](https://github.com/jkusa/ember-cli-clipboard) by
> [@jkusa](https://github.com/jkusa), rebuilt as an Embroider v2 addon and
> published under the `@aklkv` scope. The original package is unmaintained.

## Compatibility

- Ember.js v5.8 or above
- Embroider or ember-auto-import v2

## Installation

```shell
pnpm add @aklkv/ember-cli-clipboard
```

## Usage

This addon exposes three public APIs plus a set of test helpers:

- [`<CopyButton>`](#copybutton-component) — a ready-made button component
- [`clipboard`](#clipboard-modifier) — the underlying element modifier
- [`isClipboardSupported`](#isclipboardsupported-helper) — a helper to detect support
- [test helpers](#test-helpers) — `triggerCopySuccess` / `triggerCopyError`

### `<CopyButton>` component

```gjs
import { CopyButton } from '@aklkv/ember-cli-clipboard';

<template>
  <CopyButton @text="text to copy" @onSuccess={{this.onSuccess}}>
    Copy
  </CopyButton>
</template>
```∫

`<CopyButton>` renders a `<button class="copy-btn" type="button">` and accepts
all of the modifier arguments below. Splattributes are supported, so you can add
your own `class`, `title`, etc.

| Argument              | Type                                    | Default  | Description                                                                                      |
| --------------------- | --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `@text`               | `string` or `(trigger) => string`       | none     | Text to copy. A function is evaluated on click. Takes precedence over `@target`.                |
| `@target`             | `string` or `(trigger) => Element`      | none     | CSS selector or function resolving the element to copy/cut from.                                |
| `@action`             | `'copy'` or `'cut'`                     | `'copy'` | Whether to copy or cut from the target.                                                         |
| `@delegateClickEvent` | `boolean`                               | `true`   | When `true`, the listener is delegated to `document.body`; set `false` to scope to the element. |
| `@container`          | `string` or `HTMLElement`               | none     | Container element (useful inside a `<dialog>` or other focus-trapping element).                 |
| `@onSuccess`          | `(event) => void`                       | none     | Called after a successful copy/cut.                                                             |
| `@onError`            | `(event) => void`                       | none     | Called when the copy/cut fails.                                                                 |

You must provide either `@text` or `@target`.

### `clipboard` modifier

Use the element modifier directly when you don't need the `<CopyButton>` wrapper:

```gjs
import { clipboard } from '@aklkv/ember-cli-clipboard';

<template>
  <button
    type="button"
    {{clipboard text="copied via the modifier" onSuccess=this.onSuccess}}
  >
    Copy
  </button>
</template>
```

The modifier accepts the same named arguments as the component (`text`,
`target`, `action`, `delegateClickEvent`, `container`, `onSuccess`, `onError`).

### `isClipboardSupported` helper

```gjs
import { isClipboardSupported } from '@aklkv/ember-cli-clipboard';

<template>
  {{#if (isClipboardSupported)}}
    Clipboard is supported 🎉
  {{else}}
    Clipboard is not supported 😔
  {{/if}}
</template>
```

Pass an optional action to check support for `copy` or `cut` specifically:

```hbs
{{#if (isClipboardSupported "cut")}}
  Cut is supported
{{/if}}
```

The helper returns `false` in a FastBoot environment.

### Test helpers

Fire a button's `@onSuccess` / `@onError` actions in tests without real
clipboard access:

```gjs
import { triggerCopySuccess, triggerCopyError } from '@aklkv/ember-cli-clipboard/test-support';

test('fires success/error actions', async function (assert) {
  await render(
    <template>
      <CopyButton class="my-btn" @text="text" @onSuccess={{this.onSuccess}} />
    </template>,
  );

  // fire the success action for a specific button
  triggerCopySuccess('.my-btn');

  // omit the selector to default to '.copy-btn'
  triggerCopyError();
});
```

| Helper                          | Description                                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| `triggerCopySuccess(selector?)` | Fires the `@onSuccess` action of the matching copy button.               |
| `triggerCopyError(selector?)`   | Fires the `@onError` action of the matching copy button.                 |

Both default to the `.copy-btn` selector rendered by `<CopyButton>` when no
selector is passed.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md). Original work
copyright the `ember-cli-clipboard` authors; fork modifications copyright aklkv.
