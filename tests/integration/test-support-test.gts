import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';

import { CopyButton } from '#src/index.ts';
import { triggerCopyError, triggerCopySuccess } from '#src/test-support.ts';

class State {
  @tracked success: () => void = () => {};
  @tracked error: () => void = () => {};
}

module('Integration | test-support helpers', function (hooks) {
  setupRenderingTest(hooks);

  test('test-helpers fire correct actions', async function (assert) {
    assert.expect(2);

    const state = new State();

    state.success = () =>
      assert.notOk(true, 'success action incorrectly fired');
    state.error = () =>
      assert.ok(
        true,
        'triggerError correctly fired `error` action for selector',
      );

    await render(
      <template>
        <CopyButton
          class="my-copy-btn"
          @text="text"
          @onSuccess={{state.success}}
          @onError={{state.error}}
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    triggerCopyError('.my-copy-btn');

    state.error = () => assert.notOk(true, 'error action incorrectly fired');
    state.success = () =>
      assert.ok(
        true,
        'triggerSuccess correctly fired `success` action for selector',
      );

    triggerCopySuccess();
  });
});
