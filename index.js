'use strict';

var path = require('path');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: require('./package').name,

  treeForVendor() {
    var Funnel = require('broccoli-funnel');
    var clipboardPath = path.join(path.dirname(require.resolve('clipboard')), '..');

    return new fastbootTransform(Funnel(this.treeGenerator(clipboardPath), {
      destDir: 'clipboard'
    }));
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/clipboard/dist/clipboard.js');
  }
};
