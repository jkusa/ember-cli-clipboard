import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import {
  triggerCopyError,
  triggerCopySuccess,
} from 'ember-cli-clipboard/test-support';

module('Integration | Component | integration test helpers', function (hooks) {
  setupRenderingTest(hooks);

  test('test-helpers fire correct actions', async function (assert) {
    assert.expect(2);

    this.setProperties({
      success: () => assert.notOk(true, 'success action incorrectly fired'),
      error: () =>
        assert.ok(
          true,
          'triggerError correctly fired `error` action for selector'
        ),
    });

    await render(hbs`
      <CopyButton
        class="my-copy-btn"
        @text="text"
        @onSuccess={{this.success}}
        @onError={{this.error}}
      >
        Click To Copy
      </CopyButton>
    `);

    triggerCopyError('.my-copy-btn');

    this.setProperties({
      error: () => assert.notOk(true, 'error action incorrectly fired'),
      success: () =>
        assert.ok(
          true,
          'triggerSuccess correctly fired `success` action for selector'
        ),
    });

    triggerCopySuccess();
  });
});
