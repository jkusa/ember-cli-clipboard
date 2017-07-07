import Ember from 'ember';

export const isClipboardSupported = window && window.Clipboard ? window.Clipboard.isSupported : () => false;
export default Ember.Helper.helper(isClipboardSupported);
