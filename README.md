# ember-cli-clipboard

[![Build Status](https://travis-ci.org/jkusa/ember-cli-clipboard.svg?branch=master)](https://travis-ci.org/jkusa/ember-cli-clipboard) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-clipboard.svg)](http://emberobserver.com/addons/ember-cli-clipboard)

A simple ember wrapper around [clipboard.js](http://zenorocha.github.io/clipboard.js/) (no flash)

## Demo Page

http://jkusa.github.io/ember-cli-clipboard

## Usage

```javascript

<!-- Set text directly -->
{{#copy-button
  clipboardText='text to be copied'
  success='success'
  error='error'
}}
  Click To Copy
{{/copy-button}}

<!-- Get text from target element -->
<input id="url" type="text" value="https://github.com/jkusa/ember-cli-clipboard">
{{#copy-button
  clipboardTarget="#url"
  success='success'
  error='error'
}}
  Click To Copy
{{/copy-button}}
```

### Properties

* `clipboardText` - string value to be copied
* `clipboardTarget` - selector string of element from which to copy text
* `clipboardAction` - string value of operation: `copy` or `cut` (default is copy)

### Actions

The following clipboard.js custom events are sent as actions

* `success` sent on successful copy
* `error` sent on failed copy

More information about the clipboard.js events can be found [here](https://github.com/zenorocha/clipboard.js/#events)

### Browser Support

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
