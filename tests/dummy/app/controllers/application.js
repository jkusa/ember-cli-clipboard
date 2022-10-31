import Controller from '@ember/controller';
import { action } from '@ember/object';
import { v1 as uuidv1 } from 'uuid';

export default class ApplicationController extends Controller {
  @action
  generateToken() {
    return uuidv1();
  }

  @action
  getTarget() {
    return document.querySelector('#url-text');
  }

  @action
  getSuccessMessage(type) {
    return {
      type: 'success',
      message: `Success! Text ${type} to clipboard.`,
    };
  }

  @action
  getErrorMessage(type) {
    const options = {};

    const actionKey = type === 'cut' ? 'x' : 'c';
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      options.message = 'iOS not supported :(';
      options.type = 'warn';
    } else if (/Mac/i.test(navigator.userAgent)) {
      options.message = `Press ⌘-${actionKey} to ${type} (Safari)`;
      options.type = 'info';
    } else {
      options.message = `Press Ctrl-${actionKey} to ${type}`;
      options.type = 'info';
    }
    return options;
  }
}
