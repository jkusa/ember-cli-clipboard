import { helper } from '@ember/component/helper';
import { isSupported } from 'clipboard';

export const isClipboardSupported = isSupported;
export default helper(isClipboardSupported);
