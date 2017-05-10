import Ember from 'ember';
/* global Clipboard */

export const isClipboardSupported = Clipboard.isSupported();
export default Ember.Helper.helper(() => isClipboardSupported);
