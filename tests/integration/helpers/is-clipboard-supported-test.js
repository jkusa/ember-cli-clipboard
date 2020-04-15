import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ClipboardJS from 'clipboard';

module('Integration | Helper | is-clipboard-supported', function (hooks) {
  setupRenderingTest(hooks);

  test('isClipboardSupported works same as ClipboardJS.isSupported', async function (assert) {
    await render(hbs`{{is-clipboard-supported this.action}}`);
    [undefined, 'cut', 'copy', 'not-a-action'].forEach((action) => {
      this.set('action', action);
      assert
        .dom()
        .hasText(
          `${ClipboardJS.isSupported(this.action)}`,
          `\`is-clipboard-supported\` returns the correct value when given \`${action}\` action param`
        );
    });
  });

  test('isClipboardSupported when FastBoot is not present', async function (assert) {
    this.owner.register('service:fastboot', null, { instantiate: false });
    await render(hbs`{{is-clipboard-supported}}`);
    assert
      .dom()
      .hasText(
        `${ClipboardJS.isSupported()}`,
        '`is-clipboard-supported` works when FastBoot is not present'
      );
  });
});
