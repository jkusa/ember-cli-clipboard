import { isClipboardSupported } from 'dummy/helpers/is-clipboard-supported';
import { isSupported } from 'clipboard';
import { module, test } from 'qunit';


module('Unit | Helper | is clipboard supported', function() {
  test('isClipboardSupported works same as ClipboardJS.isSupported', function(assert) {
    assert.equal(isClipboardSupported(), isSupported());
    assert.equal(isClipboardSupported('copy'), isSupported('copy'));
    assert.equal(isClipboardSupported('cut'), isSupported('cut'));
  });
});
