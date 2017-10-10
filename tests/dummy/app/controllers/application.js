import Controller from '@ember/controller';
import { get } from '@ember/object';

export default Controller.extend({
  sendSuccessMessage(options) {
    let action = options.action || 'copied';
    get(this, 'flashMessages').success(`Success! Text ${action} to clipboard.`, options);
  },

  sendErrorMessage(options) {
    let action    = options.action || 'copy',
        actionKey = action === 'cut' ? 'x' : 'c';

    if(/iPhone|iPad/i.test(navigator.userAgent)) {
      options.message = 'iOS not supported :(';
      options.type = 'warn';
    }
    else if (/Mac/i.test(navigator.userAgent)) {
      options.message = `Press ⌘-${actionKey} to ${action} (Safari)`;
      options.type = 'info';
    }
    else {
      options.message = `Press Ctrl-${actionKey} to ${action}`;
      options.type = 'info';
    }
    get(this, 'flashMessages').add(options);
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

    cutTargetSuccess() {
      this.sendSuccessMessage({cutTarget: true, action: 'cut'});
    },

    cutTargetError() {
      this.sendErrorMessage({cutTarget: true, action: 'cut'});
    }
  }
});
