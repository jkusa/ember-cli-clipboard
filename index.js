/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-clipboard',

  included: function included(app) {
    this.app = app;
    this._super.included(app);

    app.import(app.bowerDirectory + '/clipboard/dist/clipboard.js');
  }
};
