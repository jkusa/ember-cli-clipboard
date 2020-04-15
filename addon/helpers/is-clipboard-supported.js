import Helper from '@ember/component/helper';
import ClipboardJS from 'clipboard';
import { getOwner } from '@ember/application';

export default class IsClipboardSupportedHelper extends Helper {
  constructor() {
    super(...arguments);
    const service = getOwner(this).lookup('service:fastboot');
    this.isFastboot = service?.isFastBoot;
  }

  compute([action]) {
    const { isFastboot } = this;
    return isFastboot ? false : ClipboardJS.isSupported(action);
  }
}
