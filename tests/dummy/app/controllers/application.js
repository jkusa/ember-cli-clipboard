import Controller from '@ember/controller';
import uuidv1 from 'uuid/v1';

export default Controller.extend({
  actions: {
    generateToken() {
      return uuidv1();
    },

    getSuccessMessage(action) {
      return {
        type: 'success',
        message: `Success! Text ${action} to clipboard.`
      };
    },

    getErrorMessage(action) {
      const options = {};

      const actionKey = action === 'cut' ? 'x' : 'c';
      if (/iPhone|iPad/i.test(navigator.userAgent)) {
        options.message = 'iOS not supported :(';
        options.type = 'warn';
      } else if (/Mac/i.test(navigator.userAgent)) {
        options.message = `Press ⌘-${actionKey} to ${action} (Safari)`;
        options.type = 'info';
      } else {
        options.message = `Press Ctrl-${actionKey} to ${action}`;
        options.type = 'info';
      }
      return options;
    }
  }
});
