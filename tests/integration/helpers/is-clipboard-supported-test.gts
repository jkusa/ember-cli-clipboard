import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, rerender } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import ClipboardJS from 'clipboard';

import { isClipboardSupported } from '#src/index.ts';

class State {
  @tracked checkAction?: string | undefined = undefined;
}

module('Integration | Helper | is-clipboard-supported', function (hooks) {
  setupRenderingTest(hooks);

  test('isClipboardSupported works same as ClipboardJS.isSupported', async function (assert) {
    const state = new State();

    await render(
      <template>{{isClipboardSupported state.checkAction}}</template>,
    );

    for (const action of [undefined, 'cut', 'copy', 'not-a-action']) {
      state.checkAction = action;

      await rerender();

      assert.dom().hasText(
        // @ts-expect-error: just keeping test as they were
        `${ClipboardJS.isSupported(action)}`,
        `\`is-clipboard-supported\` returns the correct value when given \`${action}\` action param`,
      );
    }
  });

  test('isClipboardSupported when FastBoot is not present', async function (assert) {
    this.owner.register('service:fastboot', {}, { instantiate: false });

    await render(<template>{{isClipboardSupported}}</template>);

    assert
      .dom()
      .hasText(
        `${ClipboardJS.isSupported()}`,
        '`is-clipboard-supported` works when FastBoot is not present',
      );
  });

  test('isClipboardSupported returns false in a FastBoot environment', async function (assert) {
    this.owner.register(
      'service:fastboot',
      { isFastBoot: true },
      { instantiate: false },
    );

    await render(<template>{{isClipboardSupported}}</template>);

    assert
      .dom()
      .hasText(
        'false',
        '`is-clipboard-supported` returns `false` in a FastBoot environment',
      );
  });
});
