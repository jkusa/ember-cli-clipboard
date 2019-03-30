import { helper } from '@ember/component/helper';

export const isClipboardSupported =
  window && window.ClipboardJS ? window.ClipboardJS.isSupported : () => false;
export default helper(isClipboardSupported);
