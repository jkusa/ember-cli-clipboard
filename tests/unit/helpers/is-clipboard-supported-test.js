import { isClipboardSupported } from 'dummy/helpers/is-clipboard-supported';
import { module, test } from 'qunit';

const { ClipboardJS } = window;

module('Unit | Helper | is clipboard supported', function() {
  test('isClipboardSupported works same as ClipboardJS.isSupported', function(assert) {
    assert.equal(isClipboardSupported(), ClipboardJS.isSupported());
    assert.equal(isClipboardSupported('copy'), ClipboardJS.isSupported('copy'));
    assert.equal(isClipboardSupported('cut'), ClipboardJS.isSupported('cut'));
  });
});
