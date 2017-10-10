import { helper } from '@ember/component/helper';

export const isClipboardSupported = window && window.Clipboard ? window.Clipboard.isSupported : () => false;
export default helper(isClipboardSupported);
