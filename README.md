# ember-cli-clipboard

[![Build Status](https://travis-ci.org/jkusa/ember-cli-clipboard.svg?branch=master)](https://travis-ci.org/jkusa/ember-cli-clipboard)

A simple ember wrapper around [clipboard.js](http://zenorocha.github.io/clipboard.js/)

## Usage

```javascript

{{#copy-button
  clipboardText='text to be copied'
  success='success'
  error='error'
}}
  Click To Copy
{{/copy-button}}
```

### Properties

* `clipboardText` - string value that is sent to the clipboard on click

### Actions

The following clipboard.js custom events are sent as actions

* `success` sent on successful copy
* `error` sent on failed copy

More information about the clipboard.js events can be found [here](https://github.com/zenorocha/clipboard.js/#events)

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
