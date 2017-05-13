import { isClipboardSupported } from 'dummy/helpers/is-clipboard-supported';
import { module, test } from 'qunit';
/* global Clipboard */

module('Unit | Helper | is clipboard supported');

test('isClipboardSupported works same as Clipboard.isSupported', function(assert) {
  assert.equal(isClipboardSupported(), Clipboard.isSupported());
  assert.equal(isClipboardSupported('copy'), Clipboard.isSupported('copy'));
  assert.equal(isClipboardSupported('cut'), Clipboard.isSupported('cut'));
});
