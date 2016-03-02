/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-clipboard',

  included: function included(app) {
    this.app = app;
    this._super.included(app);

    if (process.env.EMBER_CLI_FASTBOOT) {
      return;
    }

    app.import(app.bowerDirectory + '/clipboard/dist/clipboard.js');
  }
};
