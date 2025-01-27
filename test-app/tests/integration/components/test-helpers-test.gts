import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render, rerender } from '@ember/test-helpers';
import {
  triggerCopyError,
  triggerCopySuccess,
} from 'ember-cli-clipboard/test-support';
import { CopyButton } from 'ember-cli-clipboard';
import { tracked } from 'tracked-built-ins';

const context = tracked({
  success: () => {},
  error: () => {},
});

module('Integration | Component | integration test helpers', function (hooks) {
  setupRenderingTest(hooks);

  test('test-helpers fire correct actions', async function (assert) {
    assert.expect(2);

    context.success = () =>
      assert.notOk(true, 'success action incorrectly fired');
    context.error = () =>
      assert.ok(
        true,
        'triggerError correctly fired `error` action for selector',
      );

    await render(
      <template>
        <CopyButton
          class="my-copy-btn"
          @text="text"
          @onSuccess={{context.success}}
          @onError={{context.error}}
          data-test="copy-btn"
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    triggerCopyError('[data-test="copy-btn"]');

    context.success = () =>
      assert.ok(
        true,
        'triggerSuccess correctly fired `success` action for selector',
      );
    context.error = () => assert.notOk(true, 'error action incorrectly fired');

    await rerender();

    triggerCopySuccess('[data-test="copy-btn"]');
  });
});
