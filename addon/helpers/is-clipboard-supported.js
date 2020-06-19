import Helper from '@ember/component/helper';
import ClipboardJS from 'clipboard';
import { getOwner } from '@ember/application';

export default class IsClipboardSupportedHelper extends Helper {
  constructor() {
    super(...arguments);
    const service = getOwner(this).lookup('service:fastboot');
    this.isFastBoot = service ? service.isFastBoot : false;
  }

  compute([action]) {
    const { isFastBoot } = this;
    return isFastBoot ? false : ClipboardJS.isSupported(action);
  }
}
