import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render, rerender } from '@ember/test-helpers';
import { isClipboardSupported } from 'ember-cli-clipboard';
import ClipboardJS from 'clipboard';

module.skip('Integration | Helper | is-clipboard-supported', function (hooks) {
  setupRenderingTest(hooks);

  test('isClipboardSupported works same as ClipboardJS.isSupported', async function (assert) {
    let checkAction: string | undefined = undefined;

    // eslint-disable-next-line ember/template-no-let-reference
    await render(<template>{{isClipboardSupported checkAction}}</template>);

    for (const action of [undefined, 'cut', 'copy', 'not-a-action']) {
      checkAction = action;

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
});
