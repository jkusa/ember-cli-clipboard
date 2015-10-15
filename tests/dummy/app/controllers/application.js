import Ember from 'ember';

export default Ember.Controller.extend({

  sendSuccessMessage(options) {
    Ember.get(this, 'flashMessages').success('Success! Text copied to clipboard.', options);
  },

  sendErrorMessage(options) {
    if(/iPhone|iPad/i.test(navigator.userAgent)) {
      options.message = 'iOS not supported :(';
      options.type = 'warn';
    }
    else if (/Mac/i.test(navigator.userAgent)) {
      options.message = 'Press ⌘-c to copy (Safari)';
      options.type = 'info';
    }
    else {
      options.message = 'Press Ctrl-c to copy';
      options.type = 'info';
    }
    Ember.get(this, 'flashMessages').add(options);
  },

  actions: {
    copyTargetSuccess() {
      this.sendSuccessMessage({copyTarget: true});
    },

    copyTargetError() {
      this.sendErrorMessage({copyTarget: true});
    },

    copyDirectSuccess() {
      this.sendSuccessMessage({copyDirect: true});
    },

    copyDirectError() {
      this.sendErrorMessage({copyDirect: true});
    },
  }
});
