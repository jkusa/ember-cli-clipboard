/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cli-clipboard',

  treeForVendor: function() {
    var Funnel = require('broccoli-funnel');
    var clipboardPath = path.join(path.dirname(require.resolve('clipboard')), '..');

    return new Funnel(this.treeGenerator(clipboardPath), {
      destDir: 'clipboard'
    });
  },

  included: function included(app) {
    this._super.included.apply(this, arguments);

    if (process.env.EMBER_CLI_FASTBOOT) {
      return;
    }

    app.import('vendor/clipboard/dist/clipboard.js');
  }
};
