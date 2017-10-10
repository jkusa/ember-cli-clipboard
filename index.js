/* eslint-env node */
'use strict';

var path = require('path');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-clipboard',

  treeForVendor: function() {
    var Funnel = require('broccoli-funnel');
    var clipboardPath = path.join(path.dirname(require.resolve('clipboard')), '..');

    return new fastbootTransform(Funnel(this.treeGenerator(clipboardPath), {
      destDir: 'clipboard'
    }));
  },

  included: function included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/clipboard/dist/clipboard.js');
  }
};
